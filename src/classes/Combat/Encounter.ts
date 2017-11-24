import CombatCleanup from './CombatCleanup';
import CombatDrops from './CombatDrops';
import CombatUtils from './CombatUtils';
import { DefeatType } from './DefeatEvent';
import Party from './Party';
import Character from '../Character/Character';
import { CharacterType } from '../Character/CharacterType';
import MainScreen from '../display/MainScreen';
import StatusAffect from '../Effects/StatusAffect';
import Player from '../Player/Player';
import Utils from '../Utilities/Utils';

export default class Encounter {
    private player: Player;
    private allyList: Character[];
    private enemyList: Character[];
    private combatCleanUp: boolean;
    public allyParty: Party;
    public enemyParty: Party;
    private allyPartyTurn: boolean;

    public constructor(player: Player, allyParty: Character[], enemyParty: Character[], combatCleanUp: boolean = true) {
        this.player = player;
        this.allyList = allyParty;
        this.enemyList = enemyParty;
        this.allyParty = new Party(allyParty.concat(player));
        this.enemyParty = new Party(enemyParty);

        this.combatCleanUp = combatCleanUp;

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
        // activeMember == Game.player
        if (activeMember.charType == CharacterType.Player) {
            // player pick action
            CombatMenu.display(this.player);
        }
        else {
            //do ai
            activeMember;
        }
        this.enemyParty.resolveAttacker(activeMember);
        this.resolveEndTurn(activeMember);
    }

    private performEnemyPartyTurn() {
        const activeMember = this.enemyParty.activePartyMember();
        //do ai
        activeMember;
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

    private statusAffectUpdate(selectedChar: Character, allyParty: Character[], enemyParty: Character[]): void {
        const allyChar: Character = allyParty[0];
        const enemyChar: Character = enemyParty[0];

        allyChar.statusAffects.iterate((statusAffect: StatusAffect) => {
            statusAffect.combatUpdate(selectedChar, enemyChar);
        });

        CombatUtils.combatRegeneration(selectedChar);
    }


    private resolveEndTurn(character: Character) {
        if (this.allyPartyTurn) {
            this.statusAffectUpdate(character, this.allyParty.ableMembers, this.enemyParty.ableMembers);
            this.allyParty.selectNextPartyMember();
        }
        else {
            this.statusAffectUpdate(character, this.enemyParty.ableMembers, this.allyParty.ableMembers);
            this.enemyParty.selectNextPartyMember();
        }
        if (this.allyParty.ableMembers.length == 0 || this.enemyParty.ableMembers.length == 0) {
            this.displayDefeatEvent();
            if (this.combatCleanUp)
                CombatCleanup.performCleanup(this.player, this.allyList, this.enemyList);
        }
    }

    private displayDefeatEvent() {
        if (this.allyParty.ableMembers.length == 0) {
            if (this.enemyParty.partyEndScenes) {
                this.enemyParty.partyEndScenes.victory(this.allyParty, this.enemyParty);
            }
            else {
                if (this.allyParty.allMembers.length > 1) {
                    // Whoever defeated the player, that is the scene that is displayed
                    for (let index: number = 0; index < this.enemyParty.defeatLog.length; index++) {
                        let defeatEvent = this.allyParty.defeatLog[index];
                        if (defeatEvent.loser.charType == CharacterType.Player) {
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
                    let defeatEvent = this.enemyParty.defeatLog[0];
                    defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser);
                }
            }
        }
        else if (this.enemyParty.ableMembers.length == 0) {
            if (this.allyParty.partyEndScenes) {
                this.allyParty.partyEndScenes.victory(this.enemyParty, this.allyParty);
            }
            else {
                if (this.enemyParty.allMembers.length > 1) {
                    // If multiple enemies lose, player picks one for end scene
                    let nameList = [];
                    let sceneList = [];
                    for (let index: number = 0; index < this.enemyParty.defeatLog.length; index++) {
                        let defeatEvent = this.enemyParty.defeatLog[index];
                        if (defeatEvent.how != DefeatType.Escape) {
                            nameList.push(defeatEvent.loser);
                            sceneList.push(function () {
                                defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser);
                            });
                        }
                    }
                    // Should be replaced with separate menu
                    MainScreen.displayChoices(nameList, sceneList);
                }
                else {
                    let defeatEvent = this.enemyParty.defeatLog[0];
                    defeatEvent.victor.combat.endScenes.victory(defeatEvent.how, defeatEvent.loser);
                    if (defeatEvent.how != DefeatType.Escape)
                        CombatDrops.awardPlayer(this.player, defeatEvent.loser);
                }
            }
        }
    }
}