import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import { PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import DisplayText from '../../display/DisplayText';
import { Utils } from '../../Utilities/Utils';
import Player from '../Player';

export default class ButtPregSandtrap implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime === 36) {
            // (Eggs take 2-3 days to lay)
            DisplayText("<b>\nYour bowels make a strange gurgling noise and shift uneasily.  You feel ").bold();
            if (player.pregnancy.buttWomb.isPregnantWith(PregnancyType.SANDTRAP_FERTILE))
                DisplayText(" bloated and full; the sensation isn't entirely unpleasant.").bold();
            else
                DisplayText("increasingly empty, as though some obstructions inside you were being broken down.").bold();
            DisplayText().newline();
        }
        if (incubationTime === 20) {
            // end eggpreg here if unfertilized
            DisplayText("\nSomething oily drips from your sphincter, staining the ground.  You suppose you should feel worried about this, but the overriding emotion which simmers in your gut is one of sensual, yielding calm.  The pressure in your bowels which has been building over the last few days feels right somehow, and the fact that your back passage is dribbling lubricant makes you incredibly, perversely hot.  As you stand there and savor the wet, soothing sensation a fantasy pushes itself into your mind, one of being on your hands and knees and letting any number of beings use your ass, of being bred over and over by beautiful, irrepressible insect creatures.  With some effort you suppress these alien emotions and carry on, trying to ignore the oil which occasionally beads out of your " + ButtDescriptor.describeButthole(player) + " and stains your [armor].\n");
            player.stats.int += -.5;
            player.stats.lust += 500;
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birthScene(player: Player) {
        desert.sandTrapScene.birfSandTarps();
        if (player.torso.butt.rating < 17) {
            // Guaranteed increase up to level 10
            if (player.torso.butt.rating < 13) {
                player.torso.butt.rating++;
                DisplayText("\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.\n");
            }
            // Big butts only increase 50% of the time.
            else if (Utils.rand(2) === 0) {
                player.torso.butt.rating++;
                DisplayText("\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.\n");
            }
        }
    }
}
