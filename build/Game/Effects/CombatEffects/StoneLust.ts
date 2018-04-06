import DisplayText from '../../../Engine/display/DisplayText';
import Character from '../../Character/Character';
import * as VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import CombatEffect from '../CombatEffect';

export class StoneLust extends CombatEffect {
    public update(character: Character) {
        character.stats.lust += 7 + character.stats.sens / 10;
        if (character.torso.vaginas.count > 0) {
            if (character.stats.lust < 40)
                DisplayText("You squirm as the smooth stone orb vibrates within you.");
            if (character.stats.lust >= 40 && character.stats.lust < 70)
                DisplayText("You involuntarily clench around the magical stone in your twat, in response to the constant erotic vibrations.");
            if (character.stats.lust >= 70 && character.stats.lust < 85)
                DisplayText("You stagger in surprise as a particularly pleasant burst of vibrations erupt from the smooth stone sphere in your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + ".");
            if (character.stats.lust >= 85)
                DisplayText("The magical orb inside of you is making it VERY difficult to keep your focus on combat, white-hot lust suffusing your body with each new motion.");
        }
        else {
            DisplayText("The orb continues vibrating in your ass, doing its best to arouse you.");
        }
        DisplayText("\n\n");
    }
}
