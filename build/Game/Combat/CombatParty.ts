import DefeatEvent, { DefeatType } from './DefeatEvent';
import PartyEndScenes from './PartyEndScenes';
import Character from '../Character/Character';

export default class CombatParty {
    public readonly allMembers: Character[];
    public ableMembers: Character[];
    public defeatLog: DefeatEvent[];
    public readonly partyEndScenes: PartyEndScenes;

    public constructor(party: Character[], partyEndScenes?: PartyEndScenes) {
        this.allMembers = party;
        this.ableMembers = party.slice();
        this.defeatLog = [];
    }

    public activePartyMember(): Character {
        return this.ableMembers[0];
    }

    public lostFight(combatEndType: DefeatType, victor: Character) {
        this.defeatLog.push(new DefeatEvent(victor, this.ableMembers[0], combatEndType));
    }

    public selectNextPartyMember() {
        if (this.ableMembers.length > 0)
            this.ableMembers.push(this.ableMembers.shift());
    }

    public resolveAttacker(attacker: Character) {
        for (const defender of this.ableMembers) {
            if (defender.stats.HP < 1) {
                attacker.combat.endScenes.claimsVictory(DefeatType.HP, defender);
                this.defeatLog.push(new DefeatEvent(attacker, defender, DefeatType.HP));
            }
            else if (defender.stats.lust > 99) {
                attacker.combat.endScenes.claimsVictory(DefeatType.Lust, defender);
                this.defeatLog.push(new DefeatEvent(attacker, defender, DefeatType.Lust));
            }
            else if (attacker.combat.endScenes.hasEscaped(defender)) {
                attacker.combat.endScenes.claimsVictory(DefeatType.Escape, defender);
                this.defeatLog.push(new DefeatEvent(attacker, defender, DefeatType.Escape));
            }
            else if (attacker.combat.endScenes.hasDefeated(defender)) {
                attacker.combat.endScenes.claimsVictory(DefeatType.Special, defender);
                this.defeatLog.push(new DefeatEvent(attacker, defender, DefeatType.Special));
            }
        }
    }
}
