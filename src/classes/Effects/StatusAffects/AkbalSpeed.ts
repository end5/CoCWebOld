import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';

export class AkbalSpeed extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatEnd(character: Character) {
        character.stats.spe += this.value1 * -1;
    }

    public combatUpdate(character: Character): string {
        return "";
    }
}
