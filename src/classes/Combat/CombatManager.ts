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

    public constructor(party: Character[]) {
        this.allMembers = party;
        this.ableMembers = party.slice();
    }

    public readyPartyMember(): Character {
        return this.ableMembers[0];
    }

    public lostFight(combatEndType: CombatEndType, victor: Character) {
        this.defeatEvents.push(new DefeatEvent(victor, this.ableMembers[0], combatEndType));
    }

    public readyNextPartyMember() {
        if (this.ableMembers.length > 0)
            this.ableMembers.push(this.ableMembers.shift());
    }

    public resolveAttacker(attacker: Character) {
        for (let index: number = 0; index < this.ableMembers.length; index++) {
            const defender = this.ableMembers[index];
            if (defender.stats.HP < 1) {
                attacker.combat.claimsVictory(CombatEndType.HP, defender);
                this.defeatEvents.push(new DefeatEvent(attacker, defender, CombatEndType.HP));
            }
            else if (defender.stats.lust > 99) {
                attacker.combat.claimsVictory(CombatEndType.Lust, defender);
                this.defeatEvents.push(new DefeatEvent(attacker, defender, CombatEndType.Lust));
            }
            else if (attacker.combat.hasDefeated(defender)) {
                attacker.combat.claimsVictory(CombatEndType.Special, defender);
                this.defeatEvents.push(new DefeatEvent(attacker, defender, CombatEndType.Special));
            }
        }
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
    private combatCleanUp: boolean;
    private specialEnding: SpecialEnding;
    public playerCombatParty: CombatParty;
    public monsterCombatParty: CombatParty;

    public constructor(player: Player, playerParty: Character[], monsterParty: Character[], specialEnding: SpecialEnding = null, combatCleanUp: boolean = true) {
        this.player = player;
        this.playerParty = playerParty;
        this.monsterParty = monsterParty;
        this.playerCombatParty = new CombatParty(playerParty.concat(player));
        this.monsterCombatParty = new CombatParty(monsterParty);

        this.combatCleanUp = combatCleanUp;
        this.specialEnding = specialEnding;
    }

    public performCombatRound() {
        const player = this.playerCombatParty.readyPartyMember();
        const enemy = this.monsterCombatParty.readyPartyMember();
        if (this.playerCombatParty.ableMembers.length > 0 && this.monsterCombatParty.ableMembers.length > 0) {
            if (player.charType == CharacterType.Player) {
                // player pick action
                CombatMenu.display(this.player);
            }
            else {
                //do ai
                player;
            }
            this.monsterCombatParty.resolveAttacker(player);
        }

        if (this.playerCombatParty.ableMembers.length > 0 && this.monsterCombatParty.ableMembers.length > 0) {
            //do ai
            enemy;
            this.playerCombatParty.resolveAttacker(enemy);
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

    private resolveCombatRound() {
        this.playerCombatParty.readyNextPartyMember();
        this.monsterCombatParty.readyNextPartyMember();
        CombatUpdate.combatStatusAffectsUpdate(this.playerCombatParty.ableMembers, this.monsterCombatParty.ableMembers);
        if (this.playerCombatParty.ableMembers.length == 0 || this.monsterCombatParty.ableMembers.length == 0) {
            if (!this.specialEnding) {
                this.displayDefeatEvents();
                if (this.combatCleanUp)
                    CombatEnd.combatCleanup(this.player, this.playerParty, this.monsterParty);
            }
            else {
                if (this.combatCleanUp)
                    CombatEnd.combatCleanup(this.player, this.playerParty, this.monsterParty);
                this.specialEnding(this.player, this.playerParty, this.monsterParty);
            }
        }
    }

    private displayDefeatEvents() {
        if (this.playerCombatParty.ableMembers.length == 0) {
            // do player party lose
            for (let index: number = 0; index < this.playerCombatParty.defeatEvents.length; index++) {
                let defeatEvent = this.playerCombatParty.defeatEvents[index];
                defeatEvent.victor.combat.victory(defeatEvent.how, defeatEvent.loser);
            }
            for (let index: number = 0; index < this.playerCombatParty.defeatEvents.length; index++) {
                let defeatEvent = this.playerCombatParty.defeatEvents[index];
                defeatEvent.victor.combat.victory(defeatEvent.how, defeatEvent.loser);
            }
        }
        else if (this.playerCombatParty.ableMembers.length == 0) {
            // do monster party lose
            for (let index: number = 0; index < this.monsterCombatParty.defeatEvents.length; index++) {
                let defeatEvent = this.playerCombatParty.defeatEvents[index];
                defeatEvent.victor.combat.victory(defeatEvent.how, defeatEvent.loser);
                CombatDrops.awardPlayer(this.player, defeatEvent.loser);
            }
        }
    }
}