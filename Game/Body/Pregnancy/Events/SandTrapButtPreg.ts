import { CView } from "../../../../Engine/Display/ContentView";
import { Character } from "../../../Character/Character";
import { ButtWomb } from "../ButtWomb";
import { PregnancyType } from "../Pregnancy";
import { describeButthole, describeButt } from "../../../Descriptors/ButtDescriptor";
import { IPregnancyEvent } from "../IPregnancyEvent";
import { randInt } from "../../../../Engine/Utilities/SMath";

export class SandTrapButtPregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, buttWomb: ButtWomb): void {
        if (buttWomb.pregnancy.incubation === 36) {
            // (Eggs take 2-3 days to lay)
            CView.text("<b>\nYour bowels make a strange gurgling noise and shift uneasily.  You feel ");
            if (buttWomb.pregnancy.type === PregnancyType.SANDTRAP_FERTILE) CView.text(" bloated and full; the sensation isn't entirely unpleasant.");
            else {
                CView.text("increasingly empty, as though some obstructions inside you were being broken down.");
                buttWomb.clear();
            }
            CView.text("</b>\n");
        }
        if (buttWomb.pregnancy.incubation === 20) {
            // end eggpreg here if unfertilized
            CView.text("\nSomething oily drips from your sphincter, staining the ground.  You suppose you should feel worried about this, but the overriding emotion which simmers in your gut is one of sensual, yielding calm.  The pressure in your bowels which has been building over the last few days feels right somehow, and the fact that your back passage is dribbling lubricant makes you incredibly, perversely hot.  As you stand there and savor the wet, soothing sensation a fantasy pushes itself into your mind, one of being on your hands and knees and letting any number of beings use your ass, of being bred over and over by beautiful, irrepressible insect creatures.  With some effort you suppress these alien emotions and carry on, trying to ignore the oil which occasionally beads out of your " + describeButthole(player.body.butt) + " and stains your [armor].\n");
            player.stats.int += -.5;
            player.stats.lust += 500;
        }
    }

    public canBirth(player: Character, buttWomb: ButtWomb): boolean {
        return buttWomb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, buttWomb: ButtWomb): void {
        birfSandTarps(player);
        buttWomb.clear();
        if (player.body.butt.rating < 17) {
            // Guaranteed increase up to level 10
            if (player.body.butt.rating < 13) {
                player.body.butt.rating++;
                CView.text("\nYou notice your " + describeButt(player) + " feeling larger and plumper after the ordeal.\n");
            }
            // Big butts only increase 50% of the time.
            else if (randInt(2) === 0) {
                player.body.butt.rating++;
                CView.text("\nYou notice your " + describeButt(player) + " feeling larger and plumper after the ordeal.\n");
            }
        }
    }
}
