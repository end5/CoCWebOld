import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { describeVagina } from '../../Descriptors/VaginaDescriptor';
import { CView } from '../../../Engine/Display/ContentView';

export class StoneLust extends CombatEffect {
    public update(character: Character) {
        character.stats.lust += 7 + character.stats.sens / 10;
        if (character.body.vaginas.length > 0) {
            if (character.stats.lust < 40)
                CView.text("You squirm as the smooth stone orb vibrates within you.");
            if (character.stats.lust >= 40 && character.stats.lust < 70)
                CView.text("You involuntarily clench around the magical stone in your twat, in response to the constant erotic vibrations.");
            if (character.stats.lust >= 70 && character.stats.lust < 85)
                CView.text("You stagger in surprise as a particularly pleasant burst of vibrations erupt from the smooth stone sphere in your " + describeVagina(character, character.body.vaginas.get(0)) + ".");
            if (character.stats.lust >= 85)
                CView.text("The magical orb inside of you is making it VERY difficult to keep your focus on combat, white-hot lust suffusing your body with each new motion.");
        }
        else {
            CView.text("The orb continues vibrating in your ass, doing its best to arouse you.");
        }
        CView.text("\n\n");
    }
}
