import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import CombatEffect from '../CombatEffect';
import CombatEffectFactory from '../CombatEffectFactory';

export class UBERWEB extends CombatEffect {
    public update(character: Character) {
        DisplayText("You're pinned under a pile of webbing!  You should probably struggle out of it and get back in the fight!").bold();
        DisplayText("\n\n");
    }
}
