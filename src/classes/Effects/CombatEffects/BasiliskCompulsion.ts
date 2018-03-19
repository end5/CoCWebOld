import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import CombatEffect from '../CombatEffect';

export class BasiliskCompulsion extends CombatEffect {
    public update(character: Character) {
        // Basilisk.basiliskSpeed(character, 15);
        // Continuing effect text:
        DisplayText("You still feel the spell of those grey eyes, making your movements slow and difficult, the remembered words tempting you to look into its eyes again. You need to finish this fight as fast as your heavy limbs will allow.").bold();
        DisplayText("\n\n");
    }
}
