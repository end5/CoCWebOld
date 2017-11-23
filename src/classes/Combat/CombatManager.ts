import CombatCleanup from './CombatCleanup';
import CombatDrops from './CombatDrops';
import CombatUtils from './CombatUtils';
import Character from '../Character/Character';
import { CharacterType } from '../Character/CharacterType';
import DisplayText from '../display/DisplayText';
import StatusAffect from '../Effects/StatusAffect';
import Item from '../Items/Item';
import ItemStack from '../Items/ItemStack';
import Player from '../Player/Player';

export enum CombatEndType {
    Special,
    HP,
    Lust,
    Escape
}

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

    public activePartyMember(): Character {
        return this.ableMembers[0];
    }

    public lostFight(combatEndType: CombatEndType, victor: Character) {
        this.defeatEvents.push(new DefeatEvent(victor, this.ableMembers[0], combatEndType));
    }

    public selectNextPartyMember() {
        if (this.ableMembers.length > 0)
            this.ableMembers.push(this.ableMembers.shift());
    }

    public resolveAttacker(attacker: Character) {
        for (let index: number = 0; index < this.ableMembers.length; index++) {
            const defender = this.ableMembers[index];
            if (defender.stats.HP < 1) {
                attacker.combat.end.claimsVictory(CombatEndType.HP, defender);
                this.defeatEvents.push(new DefeatEvent(attacker, defender, CombatEndType.HP));
            }
            else if (defender.stats.lust > 99) {
                attacker.combat.end.claimsVictory(CombatEndType.Lust, defender);
                this.defeatEvents.push(new DefeatEvent(attacker, defender, CombatEndType.Lust));
            }
            else if (attacker.combat.end.hasEscaped(defender)) {
                attacker.combat.end.claimsVictory(CombatEndType.Escape, defender);
                this.defeatEvents.push(new DefeatEvent(attacker, defender, CombatEndType.Escape));
            }
            else if (attacker.combat.end.hasDefeated(defender)) {
                attacker.combat.end.claimsVictory(CombatEndType.Special, defender);
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
    private allyParty: Character[];
    private enemyParty: Character[];
    private combatCleanUp: boolean;
    private specialEnding: SpecialEnding;
    public allyCombatParty: CombatParty;
    public enemyCombatParty: CombatParty;
    private allyPartyTurn: boolean;

    public constructor(player: Player, allyParty: Character[], enemyParty: Character[], specialEnding: SpecialEnding = null, combatCleanUp: boolean = true) {
        this.player = player;
        this.allyParty = allyParty;
        this.enemyParty = enemyParty;
        this.allyCombatParty = new CombatParty(allyParty.concat(player));
        this.enemyCombatParty = new CombatParty(enemyParty);

        this.combatCleanUp = combatCleanUp;
        this.specialEnding = specialEnding;

        this.allyPartyTurn = true;
    }

    public performCombatRound() {
        if (this.allyPartyTurn) {
            this.performAllyPartyTurn();
        }
        else {
            this.performEnemyPartyTurn();
        }
    }

    private performAllyPartyTurn() {
        const activeMember = this.allyCombatParty.activePartyMember();
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
        this.enemyCombatParty.resolveAttacker(activeMember);
        this.resolveEndTurn(activeMember);
    }

    private performEnemyPartyTurn() {
        const activeMember = this.enemyCombatParty.activePartyMember();
        //do ai
        activeMember;
        this.allyCombatParty.resolveAttacker(activeMember);
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
            this.statusAffectUpdate(character, this.allyCombatParty.ableMembers, this.enemyCombatParty.ableMembers);
            this.allyCombatParty.selectNextPartyMember();
        }
        else {
            this.statusAffectUpdate(character, this.enemyCombatParty.ableMembers, this.allyCombatParty.ableMembers);
            this.enemyCombatParty.selectNextPartyMember();
        }
        if (this.allyCombatParty.ableMembers.length == 0 || this.enemyCombatParty.ableMembers.length == 0) {
            if (!this.specialEnding) {
                this.displayDefeatEvents();
                if (this.combatCleanUp)
                    CombatCleanup.performCleanup(this.player, this.allyParty, this.enemyParty);
            }
            else {
                if (this.combatCleanUp)
                    CombatCleanup.performCleanup(this.player, this.allyParty, this.enemyParty);
                this.specialEnding(this.player, this.allyParty, this.enemyParty);
            }
        }
    }

    private displayDefeatEvents() {
        if (this.allyCombatParty.ableMembers.length == 0) {
            for (let index: number = 0; index < this.allyCombatParty.defeatEvents.length; index++) {
                let defeatEvent = this.allyCombatParty.defeatEvents[index];
                defeatEvent.victor.combat.end.victory(defeatEvent.how, defeatEvent.loser);
            }
        }
        else if (this.allyCombatParty.ableMembers.length == 0) {
            for (let index: number = 0; index < this.enemyCombatParty.defeatEvents.length; index++) {
                let defeatEvent = this.allyCombatParty.defeatEvents[index];
                defeatEvent.victor.combat.end.victory(defeatEvent.how, defeatEvent.loser);
                if (defeatEvent.how != CombatEndType.Escape)
                    CombatDrops.awardPlayer(this.player, defeatEvent.loser);
            }
        }
    }
}