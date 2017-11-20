import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';
import { StatusAffectType } from '../StatusAffectType';

export class DemonSeed extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character): string {
        character.stats.lust += character.statusAffects.get(StatusAffectType.DemonSeed).value1 + Math.floor(character.stats.sens / 30) + Math.floor(character.stats.lib / 30) + Math.floor(character.stats.cor / 30);
        return "You feel something shift inside you, making you feel warm.  Finding the desire to fight this... hunk gets harder and harder.\n\n";
    }
}
