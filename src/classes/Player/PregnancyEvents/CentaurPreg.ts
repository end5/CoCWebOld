import GenericPregnancyChanges from './GenericPregnancyChanges';
import IPregnancyEvent from '../../Body/Pregnancy/IPregnancyEvent';
import { VaginaWetness } from '../../Body/Vagina';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import DisplayText from '../../display/DisplayText';
import BreastModifier from '../../Modifiers/BreastModifier';
import VaginaModifier from '../../Modifiers/VaginaModifier';
import Utils from '../../Utilities/Utils';
import Player from '../Player';

export default class CentaurPreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime == 350) {
            DisplayText.text("\n<b>You realize your belly has gotten bigger. Maybe you should cut back on all the strange food.</b>\n");
        }
        if (incubationTime == 280) {
            DisplayText.text("\n<b>Your belly is getting more noticeably distended. You are probably pregnant.</b>\n");
        }
        if (incubationTime == 216) {
            DisplayText.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  Somehow, you don't feel worried. Only content.</b>\n");
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;
        }
        if (incubationTime == 180) {
            DisplayText.text("\n<b>The pregnancy is moving much faster than you expected. It's already as big as the belly of any pregnant woman back home.  However, a feeling of warm satisfaction fills you.</b>\n");
        }
        if (incubationTime == 120) {
            DisplayText.text("\n<b>Your belly is painfully distended and overswollen with the offspring of some huge beast, making it difficult to function.</b>\n");
            player.stats.spe += -1;
            player.stats.lib += .5;
            player.stats.sens += .5;
            player.stats.lust += 4;
        }
        if (incubationTime == 72) {
            DisplayText.text("\n<b>Your stomach is easily the size of a beach ball, and still growing ever further. Strangely, you don't feel hindered. In fact, you feel like running...</b>\n");
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;
        }
        if (incubationTime == 48) {
            DisplayText.text("\n<b>It seems impossible for your pregnant belly to grow any larger, but you are at your happiest yet, satisfied that somehow, you are fulfilling your role. It feels right to be pregnant, and you can't wait to get knocked up again afterwards.</b>\n");
        }
        if (incubationTime == 32 || incubationTime == 64 || incubationTime == 85 || incubationTime == 150) {
            GenericPregnancyChanges.lactationIncrease(player);
        }
    }

    public canBirth(player: Player, incubationTime: number): boolean {
        return incubationTime <= 0;
    }

    public birth(player: Player) {
        DisplayText.text("\nYou blink, feeling a sudden ache of need radiating from your massive stomach. You can't even get off the ground, it is so heavy... you simply lie on your side, panting with desire, as the convulsions start. New life moves beneath your stomach, ready to be born, and it is time to do your part.\n\n");
        //Main Text here
        BreastModifier.boostLactation(player, .01);
        DisplayText.text("Perhaps strangely, there is no pain, just a steady, rhythmic compulsion that directs you to breathe steadily and spread your legs as wide as possible. You hardly have to push at all, as the child - no, your child, begins pressing against the walls of your womb, searching for escape. It finds it, and begins the arduous task of squeezing through your cervix, making you gasp with barely concealed pleasure.  It doesn't even hurt; there's only a dull little whisper of happiness followed by a tide of satisfaction.\n\n");
        DisplayText.text("The head comes first, and your first thought is relief as you see the face of a small, elfin child.  She's slick with afterbirth and pushing her way free. But the greater part is to come.  She pulls her body free, easily twice as large as her human torso. Soft downy fur with long, spindly legs and a bristly tail... she is a centaur! You help as best as you can, proud of your achievement, but are too exhausted by the ordeal. Your newfound daughter does most of the work.\n\n");
        DisplayText.text("She cannot stand, at first, and stumbles over her own shaky legs in a cute, innocent way. She appears to be a six-year old girl, stuck on top of the body of a young foal, and your heart goes out to her involuntarily. She manages to stand at last, wobbling uncertainly, and moves immediately towards your prone form. Knowing her needs, you reveal a breast to her, and she nickers affectionately before latching on, drinking hungrily from your heavily lactating teat.\n\n");
        DisplayText.text("She drinks endlessly, and seems more alive and stronger with every gulp. Hours pass in quiet, motherly bliss as she drains your breastmilk first from one breast, then the other. Her little stomach bulges slightly, but she does not stop, and you do not want her to. Even with the strange, soothing effect of the pregnancy wearing off, you feel nothing but affection for this child.\n\n");
        DisplayText.text("By the time she is finished, the centaur girl is obviously stronger, able to stand and move about on her own. She explores her new body, jumping and prancing happily, while you lay back and watch, too exhausted to join her. Suddenly, though, her ears perk up, as she looks towards the horizon urgently. She hesitates just long enough to plant a sweet kiss on your cheek, then dashes off, smiling broadly. Exhausted, you are unable to follow... but that comforting sensation returns.  Somehow, you sense she will be all right.");
        if (player.upperBody.chest.averageLactation() > 0 && player.upperBody.chest.averageLactation() < 5) {
            DisplayText.text("  Your " + BreastDescriptor.describeAllBreasts(player) + " won't seem to stop dribbling milk, lactating more heavily than before.");
            BreastModifier.boostLactation(player, .5);
        }
        DisplayText.text("  ");
        VaginaModifier.displayStretchVagina(player, 100, true);
        if (player.lowerBody.vaginaSpot.get(0).vaginalWetness == VaginaWetness.DRY) player.lowerBody.vaginaSpot.get(0).vaginalWetness++;
        player.updateGender();
        player.orgasm();
        player.stats.str += -1;
        player.stats.tou += -4;
        player.stats.spe += 2;
        player.stats.lib += 1;
        player.stats.sens += .5;
        //Butt increase
        if (player.lowerBody.butt.buttRating < 14 && Utils.rand(2) == 0) {
            if (player.lowerBody.butt.buttRating < 10) {
                player.lowerBody.butt.buttRating++;
                DisplayText.text("\n\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.");
            }
            //Big butts grow slower!
            else if (player.lowerBody.butt.buttRating < 14 && Utils.rand(2) == 0) {
                player.lowerBody.butt.buttRating++;
                DisplayText.text("\n\nYou notice your " + ButtDescriptor.describeButt(player) + " feeling larger and plumper after the ordeal.");
            }
        }
        DisplayText.text("\n");
    }
}