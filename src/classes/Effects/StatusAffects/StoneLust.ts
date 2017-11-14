import Character from '../../Character/Character';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import StatusAffect from '../StatusAffect';

export class StoneLust extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character): string {
        if (character.lowerBody.vaginaSpot.count() > 0) {
            if (character.stats.lust < 40) return "You squirm as the smooth stone orb vibrates within you.\n\n";
            if (character.stats.lust >= 40 && character.stats.lust < 70) return "You involuntarily clench around the magical stone in your twat, in response to the constant erotic vibrations.\n\n";
            if (character.stats.lust >= 70 && character.stats.lust < 85) return "You stagger in surprise as a particularly pleasant burst of vibrations erupt from the smooth stone sphere in your " + VaginaDescriptor.describeVagina(character, character.lowerBody.vaginaSpot.get(0)) + ".\n\n";
            if (character.stats.lust >= 85) return "The magical orb inside of you is making it VERY difficult to keep your focus on combat, white-hot lust suffusing your body with each new motion.\n\n";
        }
        else {
            return "The orb continues vibrating in your ass, doing its best to arouse you.\n\n";
        }
        character.stats.lust += 7 + character.stats.sens / 10;
    }
}
