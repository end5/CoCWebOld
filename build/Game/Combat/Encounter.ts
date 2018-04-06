import CombatCleanup from './CombatCleanup';
import CombatDrops from './CombatDrops';
import CombatParty from './CombatParty';
import { combatRegeneration } from './CombatUtils';
import { DefeatType } from './DefeatEvent';
import MainScreen from '../../Engine/Display/MainScreen';
import Character from '../Character/Character';
import { CharacterType } from '../Character/CharacterType';
import Menus from '../Menus/Menus';

export default class Encounter {
    private mainCharacter: Character;
    private allyList: Character[];
    private enemyList: Character[];
    public allyParty: CombatParty;
    public enemyParty: CombatParty;
    private allyPartyTurn: boolean;

    public constructor(mainCharacter: Character, allyParty: Character[], enemyParty: Character[]) {
        this.mainCharacter = mainCharacter;
        this.allyList = allyParty;
        this.enemyList = enemyParty;
        this.allyParty = new CombatParty(allyParty.concat(mainCharacter));
        this.enemyParty = new CombatParty(enemyParty);

        this.allyPartyTurn = true;
    }

    public performRound() {
        if (this.allyPartyTurn) {
            this.performAllyPartyTurn();
        }
        else {
            this.performEnemyPartyTurn();
        }
    }

    private performAllyPartyTurn() {
        const activeMember = this.allyParty.activePartyMember();
        // Should be:
        // activeMember == User.char
        if (activeMember.charType === CharacterType.Player) {
            // player pick action
            Menus.Combat(this.mainCharacter);
        }
        else {
            // do ai
            // activeMember;
        }
        this.enemyParty.resolveAttacker(activeMember);
        this.resolveEndTurn(activeMember);
    }

    private performEnemyPartyTurn() {
        const activeMember = this.enemyParty.activePartyMember();
        // do ai
        // activeMember;
        this.allyParty.resolveAttacker(activeMember);
        this.resolveEndTurn(activeMember);
    }

    /*private resolvePlayerRound() {
        if (monster.statusAffects.has(StatusAffectType.Level)) {
            if (<SandTrap>monster.trapLevel() <= 1) {
                this.playerCombatParty.lostFight(CombatEndType.Special, desert.sandTrapScene.sandtrapmentLoss);
            }
        }
        else if (monster.charType == CharacterType.Basilisk && player.stats.spe <= 1) {
            this.playerCombatParty.lostFight(CombatEndType.Special, basilisk.scene.lost);
        }
    }*/

    private combatEffectUpdate(selectedChar: Character, allyParty: Character[], enemyParty: Character[]): void {
        const allyChar: Character = allyParty[0];
        const enemyChar: Character = enemyParty[0];

        for (const combatEffect of selectedChar.combat.effects) {
            combatEffect.update(selectedChar, enemyChar);
        }

        combatRegeneration(selectedChar);
    }

    private resolveEndTurn(character: Character) {
        if (this.allyPartyTurn) {
            this.combatEffectUpdate(character, this.allyParty.ableMembers, this.enemyParty.ableMembers);
            this.allyParty.selectNextPartyMember();
        }
        else {
            this.combatEffectUpdate(character, this.enemyParty.ableMembers, this.allyParty.ableMembers);
            this.enemyParty.selectNextPartyMember();
        }
        if (this.allyParty.ableMembers.length === 0 || this.enemyParty.ableMembers.length === 0) {
            CombatCleanup.performCleanup(this.mainCharacter, this.allyList, this.enemyList);
            this.displayDefeatEvent();
        }
    }

    private displayDefeatEvent() {
        if (this.allyParty.ableMembers.length === 0) {
            if (this.enemyParty.partyEndScenes) {
                this.enemyParty.partyEndScenes.victory(this.allyParty, this.enemyParty);
            }
            else {
                if (this.allyParty.allMembers.length > 1) {
                    // Whoever defeated the player, that is the scene that is displayed
                    for (const defeatEvent of this.enemyParty.defeatLog) {
                        if (defeatEvent.loser.charType === CharacterType.Player) {
                            defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser);
                        }
                    }
                    /*
                    // If multiple enemies survive, random scene
                    let defeatEvent = Utils.randomChoice(this.allyParty.defeatLog);
                    defeatEvent.victor.combat.end.victory(defeatEvent.how, defeatEvent.loser);
                    */
                }
                else {
                    const defeatEvent = this.enemyParty.defeatLog[0];
                    defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser);
                }
            }
        }
        else if (this.enemyParty.ableMembers.length === 0) {
            if (this.allyParty.partyEndScenes) {
                this.allyParty.partyEndScenes.victory(this.enemyParty, this.allyParty);
            }
            else {
                if (this.enemyParty.allMembers.length > 1) {
                    // If multiple enemies lose, player picks one for end scene
                    const nameList = [];
                    const sceneList = [];
                    for (const defeatEvent of this.enemyParty.defeatLog) {
                        if (defeatEvent.how !== DefeatType.Escape) {
                            nameList.push(defeatEvent.loser);
                            sceneList.push(() => {
                                defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser);
                            });
                        }
                    }
                    // Should be replaced with separate menu
                    MainScreen.displayChoices(nameList, sceneList);
                }
                else {
                    const defeatEvent = this.enemyParty.defeatLog[0];
                    defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser);
                    if (defeatEvent.how !== DefeatType.Escape)
                        CombatDrops.awardPlayer(this.mainCharacter, defeatEvent.loser);
                }
            }
        }
    }
}
