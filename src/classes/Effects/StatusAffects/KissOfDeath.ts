import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';

export class KissOfDeath extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character): string {
        character.stats.lust += 5;
        character.combat.loseHP(15, null);
        return "Your lips burn with an unexpected flash of heat.  They sting and burn with unholy energies as a puff of ectoplasmic gas escapes your lips.  That puff must be a part of your soul!  It darts through the air to the succubus, who slurps it down like a delicious snack.  You feel feverishly hot and exhausted...\n\n";
    }
}
