import ArmorName from './ArmorName';
import ArmorWithPerk from './ArmorWithPerk';
import BreastRow from '../../Body/BreastRow';
import Cock from '../../Body/Cock';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Game from '../../Game/Game';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class SluttySwimwear extends ArmorWithPerk {
    public constructor() {
        super(ArmorName.SluttySwimwear, new ItemDesc("S.Swmwr", "a skimpy black bikini", "An impossibly skimpy black bikini. You feel dirty just looking at it... and a little aroused, actually."), "slutty swimwear", 0, 6, "Light", PerkFactory.create(PerkType.SluttySeduction, 6, 0, 0, 0), "", true);
    }

    public useText(player: Player): void {
        player.stats.lust += 5;
        if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating < 1)
            DisplayText("You feel rather stupid putting the top part on like this, but you're willing to bear with it. It could certainly be good for distracting.  ");
        else {
            DisplayText("The bikini top clings tightly to your bustline, sending a shiver of pleasure through your body. It serves to turn you on quite nicely.  ");
            player.stats.lust += 5;
        }
        if (player.torso.cocks.count <= 0) {
            DisplayText("The thong moves over your smooth groin, clinging onto your buttocks nicely.  ");
            if (player.torso.balls.quantity > 0) {
                if (player.torso.balls.size > 5)
                    DisplayText("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + BallsDescriptor.describeBalls(true, true, player) + " hang on the sides, exposed.  Maybe if you shrunk your male parts down a little...");
                else
                    DisplayText("However, your testicles do serve as an area of discomfort, stretching the material and bulging out the sides slightly.  ");
            }
        }
        else {
            if (player.torso.cocks.count === 1) {
                DisplayText("You grunt in discomfort, your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " flopping free from the thong's confines. The tight material rubbing against your dick does manage to turn you on slightly.  ");
            }
            else {
                DisplayText("You grunt in discomfort, your " + CockDescriptor.describeMultiCockShort(player) + " flopping free from the thong's confines. The tight material rubbing against your dicks does manage to turn you on slightly.  ");
            }
            player.stats.lust += 5;
            if (player.torso.cocks.sort(Cock.LargestCockArea)[0].area >= 20)
                DisplayText("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + CockDescriptor.describeCock(player, player.torso.cocks.sort(Cock.LargestCockArea)[0]) + " has popped out of the top, completely exposed.  Maybe if you shrunk your male parts down a little...");
            // If dick is 7+ inches OR balls are apple-sized]
            else if (player.torso.balls.size > 5)
                DisplayText("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + BallsDescriptor.describeBalls(true, true, player) + " hang on the sides, exposed.  Maybe if you shrunk your male parts down a little...");
        }
        DisplayText("\n\n");
    }
}
