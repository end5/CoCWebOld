import BreastDescriptor from '../../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../../Descriptors/VaginaDescriptor';
import DisplayText from '../../../display/DisplayText';
import ButtModifier from '../../../Modifiers/ButtModifier';
import Player from '../../../Player/Player';
import Utils from '../../../Utilities/Utils';
import { CockType } from '../../Cock';
import IPregnancyEvent from '../IPregnancyEvent';

export default class BeeButtPregnancy implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime == 36) {
            DisplayText.text("<b>\nYou feel bloated, your bowels shifting uncomfortably from time to time.</b>\n");
        }
        if (incubationTime == 20) {
            DisplayText.text("<b>\nA honey-scented fluid drips from your rectum.</b>  At first it worries you, but as the smell fills the air around you, you realize anything with such a beautiful scent must be good.  ");
            if (player.lowerBody.cockSpot.count() > 0) DisplayText.text("The aroma seems to permeate your very being, slowly congregating in your ");
            if (player.lowerBody.cockSpot.count() == 1) {
                const firstCock = player.lowerBody.cockSpot.get(0);
                DisplayText.text(CockDescriptor.describeCock(player, firstCock));
                if (player.lowerBody.cockSpot.countType(CockType.HORSE) == 1) DisplayText.text(", each inhalation making it bigger, harder, and firmer.  You suck in huge lungfuls of air, until your " + CockDescriptor.describeCock(player, firstCock) + " is twitching and dripping, the flare swollen and purple.  ");
                if (player.lowerBody.cockSpot.countType(CockType.DOG) == 1) DisplayText.text(", each inhalation making it thicker, harder, and firmer.  You suck in huge lungfuls of air, desperate for more, until your " + CockDescriptor.describeCock(player, firstCock) + " is twitching and dripping, its knot swollen to the max.  ");
                if (player.lowerBody.cockSpot.countType(CockType.HUMAN) == 1) DisplayText.text(", each inhalation making it bigger, harder, and firmer.  You suck in huge lungfuls of air, until your " + CockDescriptor.describeCock(player, firstCock) + " is twitching and dripping, the head swollen and purple.  ");
                //FAILSAFE FOR NEW COCKS
                if (player.lowerBody.cockSpot.countType(CockType.HUMAN) == 0 && player.lowerBody.cockSpot.countType(CockType.DOG) == 0 && player.lowerBody.cockSpot.countType(CockType.HORSE) == 0) DisplayText.text(", each inhalation making it bigger, harder, and firmer.  You suck in huge lungfuls of air until your " + CockDescriptor.describeCock(player, firstCock) + " is twitching and dripping.  ");
            }
            if (player.lowerBody.cockSpot.count() > 1) DisplayText.text("groin.  Your " + CockDescriptor.describeMultiCockShort(player) + " fill and grow with every lungful of the stuff you breathe in.  You suck in great lungfuls of the tainted air, desperate for more, your cocks twitching and dripping with need.  ");
            DisplayText.text("You smile knowing you couldn't stop from masturbating if you wanted to.\n");
            player.stats.int += -.5;
            player.stats.lust += 500;
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
        DisplayText.text("\n");
        DisplayText.text("There is a sudden gush of honey-colored fluids from your ass.  Before panic can set in, a wonderful scent overtakes you, making everything ok.  ");
        if (player.lowerBody.cockSpot.count() > 0) DisplayText.text("The muzzy feeling that fills your head seems to seep downwards, making your equipment hard and tight.  ");
        if (player.lowerBody.vaginaSpot.count() > 0) DisplayText.text("Your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " becomes engorged and sensitive.  ");
        DisplayText.text("Your hand darts down to the amber, scooping up a handful of the sticky stuff.  You wonder what your hand is doing as it brings it up to your mouth, which instinctively opens.  You shudder in revulsion as you swallow the sweet-tasting stuff, your mind briefly wondering why it would do that.  The stuff seems to radiate warmth, quickly pushing those nagging thoughts away as you scoop up more.\n\n");
        DisplayText.text("A sudden slip from below surprises you; a white sphere escapes from your anus along with another squirt of honey.  Your drugged brain tries to understand what's happening, but it gives up, your hands idly slathering honey over your loins.  The next orb pops out moments later, forcing a startled moan from your mouth.  That felt GOOD.  You begin masturbating to the thought of laying more eggs... yes, that's what those are.  You nearly cum as egg number three squeezes out.  ");
        if (player.upperBody.chest.averageLactation() >= 1 && player.upperBody.chest.BreastRatingLargest[0].breastRating > 2) DisplayText.text("Seeking even greater sensation, your hands gather the honey and massage it into your " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + ", slowly working up to your nipples.  Milk immediately begins pouring out from the attention, flooding your chest with warmth.  ");
        DisplayText.text("Each egg seems to come out closer on the heels of the one before, and each time your conscious mind loses more of its ability to do anything but masturbate and wallow in honey.\n\n");
        DisplayText.text("Some time later, your mind begins to return, brought to wakefulness by an incredibly loud buzzing...  You sit up and see a pile of dozens of eggs resting in a puddle of sticky honey.  Most are empty, but a few have hundreds of honey-bees emptying from them, joining the massive swarms above you.  ");
        if (player.stats.cor < 35) DisplayText.text("You are disgusted, but glad you were not stung during the ordeal.  You stagger away and find a brook to wash out your mouth with.");
        if (player.stats.cor >= 35 && player.stats.cor < 65) DisplayText.text("You are amazed you could lay so many eggs, and while the act was strange there was something definitely arousing about it.");
        if (player.stats.cor >= 65 && player.stats.cor < 90) DisplayText.text("You stretch languidly, noting that most of the drugged honey is gone.  Maybe you can find the Bee again and remember to bottle it next time.");
        if (player.stats.cor >= 90) DisplayText.text("You lick your lips, savoring the honeyed residue on them as you admire your thousands of children.  If only every night could be like this...\n");
        player.orgasm();
        player.stats.int += 1;
        player.stats.lib += 4;
        player.stats.sens += 3;
        if (ButtModifier.displayStretchButt(player, 20, true))
            DisplayText.text("\n");
        if (player.lowerBody.butt.buttRating < 17) {
            //Guaranteed increase up to level 10
            if (player.lowerBody.butt.buttRating < 13) {
                player.lowerBody.butt.buttRating++;
                DisplayText.text("\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.");
            }
            //Big butts only increase 50% of the time.
            else if (Utils.rand(2) == 0) {
                player.lowerBody.butt.buttRating++;
                DisplayText.text("\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.");
            }
        }
        DisplayText.text("\n");
    }
}