import CombatDrops from './CombatDrops';
import CombatEnd, { CombatEndEventFunction, CombatEndType } from './CombatEnd';
import CombatUpdate from './CombatUpdate';
import Character from '../Character/Character';
import { CharacterType } from '../Character/CharacterType';
import MainScreen from '../display/MainScreen';
import CombatMenu from '../display/Menus/CombatMenu';
import Item from '../Items/Item';
import ItemStack from '../Items/ItemStack';
import Player from '../Player';

class DefeatEvent {
    public readonly victor: Character;
    public readonly loser: Character;
    public readonly how: CombatEndType;
    public constructor(victor: Character, loser: Character, how: CombatEndType) {
        this.victor = victor;
        this.loser = loser;
        this.how = how;
    }
}

class CombatParty {
    public readonly allMembers: Character[];
    public ableMembers: Character[];
    public defeatEvents: DefeatEvent[];
    private defeatedMember: boolean;

    public constructor(party: Character[]) {
        this.allMembers = party;
        this.ableMembers = party.slice();
    }

    public lostFight(combatEndType: CombatEndType, victor: Character) {
        this.defeatedMember = true;
        this.defeatEvents.push(new DefeatEvent(victor, this.ableMembers[0], combatEndType));
    }

    public updateMembers() {
        if (this.defeatedMember)
            this.ableMembers.shift();
        else
            this.ableMembers.push(this.ableMembers.shift());
    }
}

/**
 * Special endings must perform all cleanup.
 */
export interface SpecialEnding {
    (player: Player, playerParty: Character[], monsterParty: Character[]);

}

export default class CombatManager {
    private player: Player;
    private playerParty: Character[];
    private monsterParty: Character[];
    private specialEnding: SpecialEnding;
    public playerCombatParty: CombatParty;
    public monsterCombatParty: CombatParty;

    public constructor(player: Player, playerParty: Character[], monsterParty: Character[], specialEnding: SpecialEnding = null) {
        this.player = player;
        this.playerParty = playerParty;
        this.monsterParty = monsterParty;
        this.playerCombatParty = new CombatParty(playerParty.concat(player));
        this.monsterCombatParty = new CombatParty(monsterParty);
    }

    public performCombatRound() {
        if (this.playerCombatParty.ableMembers.length > 0 && this.monsterCombatParty.ableMembers.length > 0) {
            if (this.playerCombatParty.ableMembers[0].charType == CharacterType.Player) {
                // player pick action
                CombatMenu.display(this.player);
            }
            else {
                //do ai
                this.playerCombatParty.ableMembers[0];
            }
            this.resolveCombatAction(this.playerCombatParty, this.monsterCombatParty);
            this.playerCombatParty.updateMembers();
        }

        if (this.playerCombatParty.ableMembers.length > 0 && this.monsterCombatParty.ableMembers.length > 0) {
            this.monsterCombatParty.ableMembers[0];
            this.resolveCombatAction(this.monsterCombatParty, this.playerCombatParty);
            this.monsterCombatParty.updateMembers();
        }
        this.resolveCombatRound();
    }

    /*private resolvePlayerRound() {
        
        if (monster.statusAffects.has("Level")) {
            if (<SandTrap>monster.trapLevel() <= 1) {
                this.playerCombatParty.lostFight(CombatEndType.Special, desert.sandTrapScene.sandtrapmentLoss);
            }
        }
        else if (monster.charType == CharacterType.Basilisk && player.stats.spe <= 1) {
            this.playerCombatParty.lostFight(CombatEndType.Special, basilisk.scene.lost);
        }
        
    }*/

    private resolveCombatAction(attackingParty: CombatParty ,defendingParty: CombatParty) {
        const attacker: Character = attackingParty.ableMembers[0];
        const defender: Character = defendingParty.ableMembers[0];
        if (defender.stats.HP < 1) {
            attacker.combat.claimsVictory(CombatEndType.HP, defender);
            defendingParty.lostFight(CombatEndType.HP, attacker);
        }
        else if (defender.stats.lust > 99) {
            attacker.combat.claimsVictory(CombatEndType.Lust, defender);
            defendingParty.lostFight(CombatEndType.Lust, attacker);
        }
        else if (attacker.combat.hasDefeated(defender)) {
            attacker.combat.claimsVictory(CombatEndType.Special, defender);
            defendingParty.lostFight(CombatEndType.Special, attacker);           
        }
    }

    private resolveCombatRound() {
        CombatUpdate.combatStatusAffectsUpdate(this.playerCombatParty.ableMembers, this.monsterCombatParty.ableMembers);
        if (this.playerCombatParty.ableMembers.length == 0 || this.monsterCombatParty.ableMembers.length == 0) {
            if (!this.specialEnding) {
                this.displayDefeatEvents();
                CombatEnd.combatCleanup(this.player, this.playerParty, this.monsterParty);
            }
            else
                this.specialEnding(this.player, this.playerParty, this.monsterParty);
        }
    }

    private displayDefeatEvents() {
        if (this.playerCombatParty.ableMembers.length == 0) {
            // do player party lose
            for (let index: number = 0; index < this.playerCombatParty.defeatEvents.length; index++) {
                let defeatEvent = this.playerCombatParty.defeatEvents[index];
                defeatEvent.victor.combat.defeated(defeatEvent.how, defeatEvent.loser);
            }
            for (let index: number = 0; index < this.playerCombatParty.defeatEvents.length; index++) {
                let defeatEvent = this.playerCombatParty.defeatEvents[index];
                defeatEvent.victor.combat.defeated(defeatEvent.how, defeatEvent.loser);
            }
        }
        else if (this.playerCombatParty.ableMembers.length == 0) {
            // do monster party lose
            for (let index: number = 0; index < this.monsterCombatParty.defeatEvents.length; index++) {
                let defeatEvent = this.playerCombatParty.defeatEvents[index];
                defeatEvent.victor.combat.defeated(defeatEvent.how, defeatEvent.loser);
                CombatDrops.awardPlayer(this.player, defeatEvent.loser);
            }
        }
    }
}