import Character from '../../Character/Character';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import CombatEffect from '../CombatEffect';

export class StoneLust extends CombatEffect {
    public update(character: Character) {
        character.stats.lust += 7 + character.stats.sens / 10;
        if (character.lowerBody.vaginaSpot.count() > 0) {
            if (character.stats.lust < 40)
                DisplayText.text("You squirm as the smooth stone orb vibrates within you.");
            if (character.stats.lust >= 40 && character.stats.lust < 70)
                DisplayText.text("You involuntarily clench around the magical stone in your twat, in response to the constant erotic vibrations.");
            if (character.stats.lust >= 70 && character.stats.lust < 85)
                DisplayText.text("You stagger in surprise as a particularly pleasant burst of vibrations erupt from the smooth stone sphere in your " + VaginaDescriptor.describeVagina(character, character.lowerBody.vaginaSpot.get(0)) + ".");
            if (character.stats.lust >= 85)
                DisplayText.text("The magical orb inside of you is making it VERY difficult to keep your focus on combat, white-hot lust suffusing your body with each new motion.");
        }
        else {
            DisplayText.text("The orb continues vibrating in your ass, doing its best to arouse you.");
        }
        DisplayText.newParagraph();        
    }
}
