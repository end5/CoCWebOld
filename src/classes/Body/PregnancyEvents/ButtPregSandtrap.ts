import IPregnancyEvent from "./IPregnancyEvent";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";

export default class ButtPregSandtrap implements IPregnancyEvent {
    public incubationDisplay(player: Player) {
        if (player.buttPregnancyIncubation == 36) {
            //(Eggs take 2-3 days to lay)
            MainScreen.text("<b>\nYour bowels make a strange gurgling noise and shift uneasily.  You feel ");
            if (player.buttPregnancyType == PregnancyType.SANDTRAP_FERTILE) MainScreen.text(" bloated and full; the sensation isn't entirely unpleasant.");
            else {
                MainScreen.text("increasingly empty, as though some obstructions inside you were being broken down.");
                player.buttKnockUpForce(); //Clear Butt Pregnancy
            }
            MainScreen.text("</b>\n");
        }
        if (player.buttPregnancyIncubation == 20) {
            //end eggpreg here if unfertilized
            MainScreen.text("\nSomething oily drips from your sphincter, staining the ground.  You suppose you should feel worried about this, but the overriding emotion which simmers in your gut is one of sensual, yielding calm.  The pressure in your bowels which has been building over the last few days feels right somehow, and the fact that your back passage is dribbling lubricant makes you incredibly, perversely hot.  As you stand there and savor the wet, soothing sensation a fantasy pushes itself into your mind, one of being on your hands and knees and letting any number of beings use your ass, of being bred over and over by beautiful, irrepressible insect creatures.  With some effort you suppress these alien emotions and carry on, trying to ignore the oil which occasionally beads out of your " + ButtDescriptor.describeButthole(player) + " and stains your [armor].\n");
            player.stats.int += -.5;
            player.stats.lust += 500;
        }
    }

    public birth(player: Player) {
        desert.sandTrapScene.birfSandTarps();
        player.buttKnockUpForce(); //Clear Butt Pregnancy
        if (player.lowerBody.butt.buttRating < 17) {
            //Guaranteed increase up to level 10
            if (player.lowerBody.butt.buttRating < 13) {
                player.lowerBody.butt.buttRating++;
                MainScreen.text("\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.\n", false);
            }
            //Big butts only increase 50% of the time.
            else if (rand(2) == 0) {
                player.lowerBody.butt.buttRating++;
                MainScreen.text("\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.\n", false);
            }
        }
    }
}