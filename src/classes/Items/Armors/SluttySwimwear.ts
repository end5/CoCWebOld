import ItemType from "../../ItemType"
import Armor from "../Armor"
import FlagEnum from "../../GlobalFlags/FlagEnum"
import ArmorLib from "../ArmorLib"
import ArmorWithPerk from "./ArmorWithPerk"

export default class SluttySwimwear extends ArmorWithPerk {
		
	public constructor() {
		super("S.Swmwr", "S.Swmwr", "slutty swimwear", "a skimpy black bikini", 0, 6, "An impossibly skimpy black bikini. You feel dirty just looking at it... and a little aroused, actually.", "Light", PerkLib.SluttySeduction, 6, 0, 0, 0, "", true);
	}
		
	public useText():void { //Produces any text seen when equipping the armor normally
		game.dynStats("lus", 5);
		if (player.upperBody.chest.BreastRatingLargest[0].breastRating < 1) 
			MainScreen.text("You feel rather stupid putting the top part on like this, but you're willing to bear with it. It could certainly be good for distracting.  ");
		else {
			MainScreen.text("The bikini top clings tightly to your bustline, sending a shiver of pleasure through your body. It serves to turn you on quite nicely.  ");
			game.dynStats("lus", 5);
		}
		if (player.totalCocks() == 0) {
			MainScreen.text("The thong moves over your smooth groin, clinging onto your buttocks nicely.  ");
			if (player.lowerBody.balls > 0) {
				if (player.lowerBody.ballSize > 5) MainScreen.text("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + player.ballsDescriptLight() + " hang on the sides, exposed.  Maybe if you shrunk your male parts down a little...");
				else MainScreen.text("However, your testicles do serve as an area of discomfort, stretching the material and bulging out the sides slightly.  ");
			}
		}
		else {
			if (player.totalCocks() == 1) {
				MainScreen.text("You grunt in discomfort, your " + player.cockDescript(0) + " flopping free from the thong's confines. The tight material rubbing against your dick does manage to turn you on slightly.  ");
			}
			else {
				MainScreen.text("You grunt in discomfort, your " + player.multiCockDescriptLight() + " flopping free from the thong's confines. The tight material rubbing against your dicks does manage to turn you on slightly.  ");
			}
			game.dynStats("lus", 5);
			if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 20) MainScreen.text("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + player.cockDescript(player.biggestCockIndex()) + " has popped out of the top, completely exposed.  Maybe if you shrunk your male parts down a little...");
			//[If dick is 7+ inches OR balls are apple-sized]
			else if (player.lowerBody.ballSize > 5) MainScreen.text("You do your best to put the thong on, and while the material is very stretchy, it simply can't even begin to cover everything, and your " + player.ballsDescriptLight() + " hang on the sides, exposed.  Maybe if you shrunk your male parts down a little...");
		}
		MainScreen.text("\n\n");
	}
}

