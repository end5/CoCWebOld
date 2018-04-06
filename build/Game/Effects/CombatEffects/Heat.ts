import DisplayText from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import Character from '../../Character/Character';
import * as VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import CombatEffect from '../CombatEffect';

export class Heat extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.torso.vaginas.count > 0 && enemy.torso.cocks.count > 0) {
            character.stats.lust += (randInt(character.stats.lib / 5) + 3 + randInt(5));
            DisplayText("Your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " clenches with an instinctual desire to be touched and filled.  If you don't end this quickly you'll give in to your heat.");
            DisplayText("\n\n");
        }
    }
}
