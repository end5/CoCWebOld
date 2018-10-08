import { Character } from "../../../Character/Character";
import { CView } from "../../../../Engine/Display/ContentView";
import { BreastRow } from "../../BreastRow";
import { boostLactation, growTopBreastRow } from "../../../Modifiers/BreastModifier";
import { Womb } from "../Womb";
import { IPregnancyEvent } from "../IPregnancyEvent";
import { Vagina, VaginaWetness } from "../../Vagina";
import { describeAllBreasts } from "../../../Descriptors/BreastDescriptor";
import { displayStretchVagina } from "../../../Modifiers/VaginaModifier";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { describeButt } from "../../../Descriptors/ButtDescriptor";

export class CentaurPregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        if (womb.pregnancy.incubation === 350) {
            CView.text("\n<b>You realize your belly has gotten bigger. Maybe you should cut back on all the strange food.</b>\n");
        }
        if (womb.pregnancy.incubation === 280) {
            CView.text("\n<b>Your belly is getting more noticeably distended. You are probably pregnant.</b>\n");
        }
        if (womb.pregnancy.incubation === 216) {
            CView.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  Somehow, you don't feel worried. Only content.</b>\n");
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;

        }
        if (womb.pregnancy.incubation === 180) {
            CView.text("\n<b>The pregnancy is moving much faster than you expected. It's already as big as the belly of any pregnant woman back home.  However, a feeling of warm satisfaction fills you.</b>\n");
        }
        if (womb.pregnancy.incubation === 120) {
            CView.text("\n<b>Your belly is painfully distended and overswollen with the offspring of some huge beast, making it difficult to function.</b>\n");
            player.stats.spe += -1;
            player.stats.lib += .5;
            player.stats.sens += .5;
            player.stats.lust += 4;

        }
        if (womb.pregnancy.incubation === 72) {
            CView.text("\n<b>Your stomach is easily the size of a beach ball, and still growing ever further. Strangely, you don't feel hindered. In fact, you feel like running...</b>\n");
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;

        }
        if (womb.pregnancy.incubation === 48) {
            CView.text("\n<b>It seems impossible for your pregnant belly to grow any larger, but you are at your happiest yet, satisfied that somehow, you are fulfilling your role. It feels right to be pregnant, and you can't wait to get knocked up again afterwards.</b>\n");
        }
        if (womb.pregnancy.incubation === 32 || womb.pregnancy.incubation === 64 || womb.pregnancy.incubation === 85 || womb.pregnancy.incubation === 150) {
            // Increase lactation!
            if (player.body.chest.sort(BreastRow.Largest)[0].rating >= 3 && player.body.chest.length > 1 && player.body.chest.sort(BreastRow.LactationMost)[0].lactationMultiplier >= 1 && player.body.chest.sort(BreastRow.LactationMost)[0].lactationMultiplier < 2) {
                CView.text("\nYour breasts feel swollen with all the extra milk they're accumulating.  You wonder just what kind of creature they're getting ready to feed.\n");
                boostLactation(player, .5);
            }
            if (player.body.chest.sort(BreastRow.Largest)[0].rating >= 3 && player.body.chest.length > 1 && player.body.chest.sort(BreastRow.LactationMost)[0].lactationMultiplier > 0 && player.body.chest.sort(BreastRow.LactationMost)[0].lactationMultiplier < 1) {
                CView.text("\nDrops of breastmilk escape your nipples as your body prepares for the coming birth.\n");
                boostLactation(player, .5);
            }
            // Lactate if large && not lactating
            if (player.body.chest.sort(BreastRow.Largest)[0].rating >= 3 && player.body.chest.length > 1 && player.body.chest.sort(BreastRow.LactationMost)[0].lactationMultiplier === 0) {
                CView.text("<b>\nYou realize your breasts feel full, and occasionally lactate</b>.  It must be due to the pregnancy.\n");
                boostLactation(player, 1);
            }
            // Enlarge if too small for lactation
            if (player.body.chest.sort(BreastRow.Largest)[0].rating === 2 && player.body.chest.length > 1) {
                CView.text("<b>\nYour breasts have swollen to C-cups,</b> in light of your coming pregnancy.\n");
                growTopBreastRow(player, 1, 1, false);
            }
            // Enlarge if really small!
            if (player.body.chest.sort(BreastRow.Largest)[0].rating === 1 && player.body.chest.length > 1) {
                CView.text("<b>\nYour breasts have grown to B-cups,</b> likely due to the hormonal changes of your pregnancy.\n");
                growTopBreastRow(player, 1, 1, false);
            }
        }
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        CView.text("\nYou blink, feeling a sudden ache of need radiating from your massive stomach. You can't even get off the ground, it is so heavy... you simply lie on your side, panting with desire, as the convulsions start. New life moves beneath your stomach, ready to be born, and it is time to do your part.\n\n");
        if (player.body.vaginas.length === 0) {
            CView.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  <b>You look down and behold a new vagina</b>.  ");
            player.body.vaginas.add(new Vagina());
        }
        // Main Text here
        boostLactation(player, .01);
        CView.text("Perhaps strangely, there is no pain, just a steady, rhythmic compulsion that directs you to breathe steadily and spread your legs as wide as possible. You hardly have to push at all, as the child - no, your child, begins pressing against the walls of your womb, searching for escape. It finds it, and begins the arduous task of squeezing through your cervix, making you gasp with barely concealed pleasure.  It doesn't even hurt; there's only a dull little whisper of happiness followed by a tide of satisfaction.\n\n");
        CView.text("The head comes first, and your first thought is relief as you see the face of a small, elfin child.  She's slick with afterbirth and pushing her way free. But the greater part is to come.  She pulls her body free, easily twice as large as her human torso. Soft downy fur with long, spindly legs and a bristly tail... she is a centaur! You help as best as you can, proud of your achievement, but are too exhausted by the ordeal. Your newfound daughter does most of the work.\n\n");
        CView.text("She cannot stand, at first, and stumbles over her own shaky legs in a cute, innocent way. She appears to be a six-year old girl, stuck on top of the body of a young foal, and your heart goes out to her involuntarily. She manages to stand at last, wobbling uncertainly, and moves immediately towards your prone form. Knowing her needs, you reveal a breast to her, and she nickers affectionately before latching on, drinking hungrily from your heavily lactating teat.\n\n");
        CView.text("She drinks endlessly, and seems more alive and stronger with every gulp. Hours pass in quiet, motherly bliss as she drains your breastmilk first from one breast, then the other. Her little stomach bulges slightly, but she does not stop, and you do not want her to. Even with the strange, soothing effect of the pregnancy wearing off, you feel nothing but affection for this child.\n\n");
        CView.text("By the time she is finished, the centaur girl is obviously stronger, able to stand and move about on her own. She explores her new body, jumping and prancing happily, while you lay back and watch, too exhausted to join her. Suddenly, though, her ears perk up, as she looks towards the horizon urgently. She hesitates just long enough to plant a sweet kiss on your cheek, then dashes off, smiling broadly. Exhausted, you are unable to follow... but that comforting sensation returns.  Somehow, you sense she will be all right.");
        womb.clear();
        if (player.body.chest.reduce(BreastRow.AverageLactation, 0) > 0 && player.body.chest.reduce(BreastRow.AverageLactation, 0) < 5) {
            CView.text("  Your " + describeAllBreasts(player) + " won't seem to stop dribbling milk, lactating more heavily than before.");
            boostLactation(player, .5);
        }
        CView.text("  ");
        displayStretchVagina(player, 100, true);
        if (player.body.vaginas.get(0).wetness === VaginaWetness.DRY) player.body.vaginas.get(0).wetness++;
        // if (player.gender === 1) player.gender = 3;
        // if (player.gender === 0) player.gender = 2;
        player.orgasm();
        player.stats.str += -1;
        player.stats.tou += -4;
        player.stats.spe += 2;
        player.stats.lib += 1;
        player.stats.sens += .5;

        // Butt increase
        if (player.body.butt.rating < 14 && randInt(2) === 0) {
            if (player.body.butt.rating < 10) {
                player.body.butt.rating++;
                CView.text("\n\nYou notice your " + describeButt(player) + " feeling larger and plumper after the ordeal.");
            }
            // Big butts grow slower!
            else if (player.body.butt.rating < 14 && randInt(2) === 0) {
                player.body.butt.rating++;
                CView.text("\n\nYou notice your " + describeButt(player) + " feeling larger and plumper after the ordeal.");
            }
        }
        womb.clear();
        CView.text("\n");
    }
}
