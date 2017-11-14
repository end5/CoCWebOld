import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';

export class ParalyzeVenom extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatEnd(character: Character) {
        character.stats.str += this.value1;
        character.stats.spe += this.value2;
}

    public combatUpdate(character: Character): string {
        return "";
    }
}
