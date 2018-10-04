import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { describeVagina } from '../../Descriptors/VaginaDescriptor';
import { CView } from '../../../Engine/Display/ContentView';

export class Heat extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.body.vaginas.length > 0 && enemy.body.cocks.length > 0) {
            character.stats.lust += (randInt(character.stats.lib / 5) + 3 + randInt(5));
            CView.text("Your " + describeVagina(character, character.body.vaginas.get(0)) + " clenches with an instinctual desire to be touched and filled.  If you don't end this quickly you'll give in to your heat.");
            CView.text("\n\n");
        }
    }
}
