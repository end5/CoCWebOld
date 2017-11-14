import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';

export class GnollSpear extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatEnd(character: Character) {
        character.stats.spe += this.value1;
    }

    public combatUpdate(character: Character): string {
        return "";
    }
}
