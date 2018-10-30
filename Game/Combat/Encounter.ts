import { performActionAI } from './CombatAI';
import { combatCleanup } from './CombatCleanup';
import { CombatParty } from './CombatParty';
import { combatRegeneration } from './CombatUtils';
import { DefeatType } from './DefeatEvent';
import { Character } from '../Character/Character';
import { NextScreenChoices, ScreenChoice } from '../ScreenDisplay';
import { awardPlayer } from './CombatDrops';
import { CharDict } from '../CharList';
import { InGameMenus } from '../Menus/InGame/InGameMenus';
import { choiceWrap } from '../Utilities/Partial';

export class Encounter {
    private mainCharacter: Character;
    private allyList: Character[];
    private enemyList: Character[];
    public allyParty: CombatParty;
    public enemyParty: CombatParty;
    private allyPartyTurn: boolean;
    public performTurnEnd?: (() => NextScreenChoices);

    public constructor(mainCharacter: Character, allyParty: Character[], enemyParty: Character[]) {
        this.mainCharacter = mainCharacter;
        this.allyList = allyParty;
        this.enemyList = enemyParty;
        this.allyParty = new CombatParty(allyParty.concat(mainCharacter));
        this.enemyParty = new CombatParty(enemyParty);

        this.allyPartyTurn = true;
    }

    public performRound(): NextScreenChoices {
        if (this.performTurnEnd)
            return this.performTurnEnd();
        if (this.allyPartyTurn) {
            return this.performAllyPartyTurn();
        }
        else {
            return this.performEnemyPartyTurn();
        }
    }

    private performAllyPartyTurn(): NextScreenChoices {
        const activeMember = this.allyParty.activePartyMember();
        this.performTurnEnd = () => {
            const encounter = this;
            encounter.performTurnEnd = undefined;
            encounter.enemyParty.resolveAttacker(activeMember);
            encounter.resolveEndTurn(activeMember);
            return encounter.endCombatOrNextRound();
        };
        if (!activeMember) {
            return { next: InGameMenus.Player };
        }
        else if (activeMember.uuid === CharDict.player!.uuid) {
            return { next: choiceWrap(InGameMenus.Combat, this.mainCharacter) };
        }
        else {
            return performActionAI(activeMember);
        }
    }

    private performEnemyPartyTurn(): NextScreenChoices {
        const activeMember = this.enemyParty.activePartyMember();
        this.performTurnEnd = () => {
            const encounter = this;
            encounter.performTurnEnd = undefined;
            encounter.allyParty.resolveAttacker(activeMember);
            encounter.resolveEndTurn(activeMember);
            return encounter.endCombatOrNextRound();
        };
        if (!activeMember) {
            return { next: InGameMenus.Player };
        }
        else return performActionAI(activeMember);
    }

    private combatEffectUpdate(selectedChar: Character, enemyParty: Character[]): void {
        const enemyChar: Character = enemyParty[0];

        if (selectedChar.combat.effects.keys.length > 0)
            for (const combatEffect of selectedChar.combat.effects) {
                combatEffect.update(selectedChar, enemyChar);
            }

        combatRegeneration(selectedChar);
    }

    private resolveEndTurn(character: Character): void {
        if (this.allyPartyTurn) {
            this.combatEffectUpdate(character, this.enemyParty.ableMembers);
            this.allyParty.selectNextPartyMember();
        }
        else {
            this.combatEffectUpdate(character, this.allyParty.ableMembers);
            this.enemyParty.selectNextPartyMember();
        }
        this.allyPartyTurn = !this.allyPartyTurn;
    }

    private endCombatOrNextRound(): NextScreenChoices {
        if (this.allyParty.ableMembers.length === 0 || this.enemyParty.ableMembers.length === 0) {
            combatCleanup(this.mainCharacter, this.allyList, this.enemyList);
            return this.displayDefeatEvent();
        }
        return this.performRound();
    }

    private displayDefeatEvent(): NextScreenChoices {
        if (this.allyParty.ableMembers.length === 0) {
            if (this.enemyParty.partyEndScenes) {
                return this.enemyParty.partyEndScenes.victory(this.allyParty, this.enemyParty);
            }
            else {
                if (this.allyParty.allMembers.length > 1) {
                    // Whoever defeated the player, that is the scene that is displayed
                    for (const defeatEvent of this.enemyParty.defeatLog) {
                        if (defeatEvent.loser.uuid === CharDict.player!.uuid) {
                            return defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser);
                        }
                    }
                    /*
                    // If multiple enemies survive, random scene
                    let defeatEvent = Utils.randomChoice(this.allyParty.defeatLog);
                    defeatEvent.victor.combat.end.victory(defeatEvent.how, defeatEvent.loser);
                    */
                }
                else {
                    const defeatEvent = this.allyParty.defeatLog[0];
                    return defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser);
                }
            }
        }
        else if (this.enemyParty.ableMembers.length === 0) {
            if (this.allyParty.partyEndScenes) {
                return this.allyParty.partyEndScenes.victory(this.enemyParty, this.allyParty);
            }
            else {
                if (this.enemyParty.allMembers.length > 1) {
                    // If multiple enemies lose, player picks one for end scene
                    const choices: ScreenChoice[] = [];
                    for (const defeatEvent of this.enemyParty.defeatLog) {
                        if (defeatEvent.how !== DefeatType.Escape) {
                            choices.push([
                                defeatEvent.loser.desc.name,
                                () => defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser)
                            ]);
                        }
                    }
                    // Should be replaced with separate menu
                    return { choices };
                }
                else {
                    const defeatEvent = this.enemyParty.defeatLog[0];
                    if (defeatEvent.how !== DefeatType.Escape) {
                        this.performTurnEnd = () => {
                            return awardPlayer(this.mainCharacter, defeatEvent.loser);
                        };
                    }
                    return defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser);
                }
            }
        }
        throw new Error('Both parties have able members');
    }
}
