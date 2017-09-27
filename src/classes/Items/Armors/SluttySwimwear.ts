import ArmorWithPerk from "./ArmorWithPerk"
import Perk from "../../Effects/Perk";
import Game from "../../Game/Game";
import MainScreen from "../../display/MainScreen";
import CockDescriptor from "../../Descriptors/CockDescriptor";
import BallsDescriptor from "../../Descriptors/BallsDescriptor";
import Player from "../../Player";

export default class SluttySwimwear extends ArmorWithPerk {
    public constructor() {
        super("S.Swmwr", "S.Swmwr", "slutty swimwear", "a skimpy black bikini", 0, 6, "An impossibly skimpy black bikini. You feel dirty just looking at it... and a little aroused, actually.", "Light", new Perk("SluttySeduction", 6, 0, 0, 0), "", true);
    }

    public useText(player: Player): void { //Produces any text seen when equipping the armor normally
        player.stats.lust += 5;
        if (player.upperBody.chest.BreastRatingLargest[0].breastRating < 1)
            MainScreen.text("You feel rather stupid putting the top part on like this, but you're willing to bear with it. It could certainly be good for distracting.  ");
        else {
            MainScreen.text("The bikini top clings tightly to your bustline, sending a shiver of pleasure through your body. It serves to turn you on quite nicely.  ");
            player.stats.lust += 5;
        }
        if (!player.lowerBody.cockSpot.hasCock()) {
            MainScreen.text("The thong moves over your smooth groin, clinging onto your buttocks nicely.  ");
            if (player.lowerBody.balls > 0) {
                if (player.lowerBody.ballSize > 5)
                    MainScreen.text("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + BallsDescriptor.describeBalls(true, true, player) + " hang on the sides, exposed.  Maybe if you shrunk your male parts down a little...");
                else
                    MainScreen.text("However, your testicles do serve as an area of discomfort, stretching the material and bulging out the sides slightly.  ");
            }
        }
        else {
            if (player.lowerBody.cockSpot.count() == 1) {
                MainScreen.text("You grunt in discomfort, your " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + " flopping free from the thong's confines. The tight material rubbing against your dick does manage to turn you on slightly.  ");
            }
            else {
                MainScreen.text("You grunt in discomfort, your " + CockDescriptor.describeMultiCockShort(player) + " flopping free from the thong's confines. The tight material rubbing against your dicks does manage to turn you on slightly.  ");
            }
            player.stats.lust += 5;
            if (player.lowerBody.cockSpot.listLargestCockArea[0].cockArea() >= 20)
                MainScreen.text("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.listLargestCockArea[0]) + " has popped out of the top, completely exposed.  Maybe if you shrunk your male parts down a little...");
            //[If dick is 7+ inches OR balls are apple-sized]
            else if (player.lowerBody.ballSize > 5)
                MainScreen.text("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + BallsDescriptor.describeBalls(true, true, player) + " hang on the sides, exposed.  Maybe if you shrunk your male parts down a little...");
        }
        MainScreen.text("\n\n");
    }
}

