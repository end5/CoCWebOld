import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';

export class Web extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatEnd(character: Character) {
        character.stats.spe += character.statusAffects.get("Web").value1;
    }

    public combatUpdate(character: Character): string {
        return "";
    }
}
