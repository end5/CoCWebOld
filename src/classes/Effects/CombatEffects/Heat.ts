import Character from '../../Character/Character';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import Utils from '../../Utilities/Utils';
import CombatEffect from '../CombatEffect';

export class Heat extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.lowerBody.vaginaSpot.count() > 0 && enemy.lowerBody.cockSpot.count() > 0) {
            character.stats.lust += (Utils.rand(character.stats.lib / 5) + 3 + Utils.rand(5));
            DisplayText.text("Your " + VaginaDescriptor.describeVagina(character, character.lowerBody.vaginaSpot.get(0)) + " clenches with an instinctual desire to be touched and filled.  If you don't end this quickly you'll give in to your heat.");
            DisplayText.newParagraph();            
        }
    }
}
