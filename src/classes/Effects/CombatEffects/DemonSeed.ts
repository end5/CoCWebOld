import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import CombatEffect from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class DemonSeed extends CombatEffect {
    public update(character: Character) {
        character.stats.lust += character.combat.effects.get(CombatEffectType.DemonSeed).value1 + Math.floor(character.stats.sens / 30) + Math.floor(character.stats.lib / 30) + Math.floor(character.stats.cor / 30);
        DisplayText.text("You feel something shift inside you, making you feel warm.  Finding the desire to fight this... hunk gets harder and harder.");
    }
}
