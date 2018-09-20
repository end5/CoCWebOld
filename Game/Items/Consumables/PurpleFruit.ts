import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { BreastRow } from '../../Body/BreastRow';
import { Character } from '../../Character/Character';
import { Mod } from '../../Modifiers/Modifiers';
import { ItemDesc } from '../ItemDesc';

export class PurpleFruit extends Consumable {
    public constructor() {
        super(ConsumableName.PurpleFruit, new ItemDesc("PrFruit", "a purple fruit", "This sweet-smelling produce looks like an eggplant, but feels almost squishy, and rubbery to the touch. Holding it to your ear, you think you can hear some fluid sloshing around inside."));
    }

    public use(character: Character) {
        DisplayText().clear();
        DisplayText("You bite into the fruit Essrayle gave you with little hesitation.  It's amazingly sweet, with a texture that's rather gummy.  The juice is a candied grape syrup that fills your cheeks and flows down your throat with far more fluid than the size of the plant should allow.  You hastily devour the entire thing, unable to stop yourself once you've started.");
        DisplayText("\n\nA tingling warmth shifts to a roaring inferno in your veins, your heart-rate spiking abruptly.  The intensity of it almost makes your body feel molten!  But, as quickly as it came, the sensation fades into merely a pleasing warmth that settles in your chest.");
        if (character.body.chest.reduce(BreastRow.AverageNipplesPerBreast, 0) < 4) {
            DisplayText("  At first you think nothing has changed, but a second look confirms that your breasts now sport the same quartet of cow-like nipples the bovine plant-girl bears.");
            if (character.body.chest.sort(BreastRow.Largest)[0].nipples.length < 4)
                character.body.chest.sort(BreastRow.Largest)[0].nipples.length = 4;
            for (let index: number = 0; index < character.body.chest.length; index++)
                character.body.chest.get(index).nipples.count = 4;
        }
        // [Character gains quad nipples, milk production and libido way up]
        character.stats.lib += 5;
        Mod.Breast.boostLactation(character, 3 * character.body.chest.length);
    }
}