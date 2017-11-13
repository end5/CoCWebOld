import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';

export class DemonSeed extends StatusAffect {
    public update(character: Character): string {
        character.stats.lust += character.statusAffects.get("DemonSeed").value1 + Math.floor(character.stats.sens / 30) + Math.floor(character.stats.lib / 30) + Math.floor(character.stats.cor / 30);
        return "You feel something shift inside you, making you feel warm.  Finding the desire to fight this... hunk gets harder and harder.\n\n";
    }
}
