import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../display/DisplayText';
import BreastModifier from '../../Modifiers/BreastModifier';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class PurpleFruit extends Consumable {
    public constructor() {
        super(ConsumableName.PurpleFruit, new ItemDesc("PrFruit", "a purple fruit", "This sweet-smelling produce looks like an eggplant, but feels almost squishy, and rubbery to the touch. Holding it to your ear, you think you can hear some fluid sloshing around inside."));
    }

    public use(player: Player) {
        DisplayText.clear();
        DisplayText.text("You bite into the fruit Essrayle gave you with little hesitation.  It's amazingly sweet, with a texture that's rather gummy.  The juice is a candied grape syrup that fills your cheeks and flows down your throat with far more fluid than the size of the plant should allow.  You hastily devour the entire thing, unable to stop yourself once you've started.");
        DisplayText.text("\n\nA tingling warmth shifts to a roaring inferno in your veins, your heart-rate spiking abruptly.  The intensity of it almost makes your body feel molten!  But, as quickly as it came, the sensation fades into merely a pleasing warmth that settles in your chest.");
        if (player.upperBody.chest.averageNipplesPerBreast() < 4) {
            DisplayText.text("  At first you think nothing has changed, but a second look confirms that your breasts now sport the same quartet of cow-like nipples the bovine plant-girl bears.");
            if (player.upperBody.chest.BreastRatingLargest[0].nippleLength < 4)
                player.upperBody.chest.BreastRatingLargest[0].nippleLength = 4;
            for (let index: number = 0; index < player.upperBody.chest.count(); index++)
                player.upperBody.chest.get(index).nipplesPerBreast = 4;
        }
        // [Player gains quad nipples, milk production and libido way up]
        player.stats.lib += 5;
        BreastModifier.boostLactation(player, 3 * player.upperBody.chest.count());
    }
}