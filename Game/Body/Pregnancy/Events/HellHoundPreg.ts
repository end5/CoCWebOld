import { Character } from "../../../Character/Character";
import { Womb } from "../Womb";
import { CView } from "../../../../Engine/Display/ContentView";
import { BreastRow } from "../../BreastRow";
import { boostLactation, growTopBreastRow } from "../../../Modifiers/BreastModifier";
import { IPregnancyEvent } from "../IPregnancyEvent";
import { Vagina, VaginaWetness } from "../../Vagina";
import { displayStretchVagina } from "../../../Modifiers/VaginaModifier";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { describeButt } from "../../../Descriptors/ButtDescriptor";

export class HellHoundPregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        if (womb.pregnancy.incubation === 290) {
            CView.text("\n<b>You realize your belly has gotten slightly larger.  Maybe you need to cut back on the strange food.</b>\n");
        }
        if (womb.pregnancy.incubation === 240) {
            CView.text("\n<b>Your belly is getting more noticably distended and squirming around.  You are probably pregnant.</b>\n");
        }
        if (womb.pregnancy.incubation === 216) {
            CView.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  It's feeling heavier by the moment.  ");
            if (player.stats.cor < 40) CView.text("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.</b>");
            if (player.stats.cor >= 40 && player.stats.cor < 75) CView.text("Considering the size of the creatures you've fucked, you hope it doesn't hurt when it comes out.</b>");
            if (player.stats.cor >= 75) CView.text("You think dreamily about the monstrous cocks that have recently been fucking you, and hope that your offspring inherit such a pleasure tool.</b>");
            CView.text("\n");
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;

        }
        if (womb.pregnancy.incubation === 180) {
            CView.text("\n<b>There is a strange heat within your belly, it makes you a little tired.</b>\n");
            player.stats.tou += -1;

        }
        if (womb.pregnancy.incubation === 120) {
            CView.text("\n<b>Your ever-growing belly makes your pregnancy obvious for those around you.  With each day you can feel the heat within you growing.</b>\n");
            player.stats.tou += -1;

        }
        if (womb.pregnancy.incubation === 72) {
            CView.text("\n<b>The heat within doesn't drain you as much as it used to, instead giving you an odd strength.</b>");
            CView.text("\n");
            player.stats.str += 1;
            player.stats.tou += 1;

        }
        if (womb.pregnancy.incubation === 48) {
            CView.text("\n<b>You can feel two large lumps pushing against your womb together ");
            if (player.stats.cor < 40) CView.text("making it difficult to function.</b>");
            if (player.stats.cor >= 40 && player.stats.cor < 75) CView.text("and you wonder how much longer you have to wait.</b>");
            if (player.stats.cor >= 75) CView.text("and you're eager to give birth, so you can get impregnated again by monstrous cocks unloading their corrupted seed directly into your eager womb.</b>");
            CView.text("\n");
            player.stats.spe += -2;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 4;

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
                CView.text("\n<b>You realize your breasts feel full, and occasionally lactate</b>.  It must be due to the pregnancy.\n");
                boostLactation(player, 1);
            }
            // Enlarge if too small for lactation
            if (player.body.chest.sort(BreastRow.Largest)[0].rating === 2 && player.body.chest.length > 1) {
                CView.text("\n<b>Your breasts have swollen to C-cups,</b> in light of your coming pregnancy.\n");
                growTopBreastRow(player, 1, 1, false);
            }
            // Enlarge if really small!
            if (player.body.chest.sort(BreastRow.Largest)[0].rating === 1 && player.body.chest.length > 1) {
                CView.text("\n<b>Your breasts have grown to B-cups,</b> likely due to the hormonal changes of your pregnancy.\n");
                growTopBreastRow(player, 1, 1, false);
            }
        }
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        CView.text("\nYou are suddenly awoken by the heat inside your womb suddenly flaring up rather intensely.  It gives you a sudden charge of energy and you feel a strong need to stand up.  You can feel the two heads moving inside of you and you know that a hellhound will soon be born.  Guided by your instincts, you spread your legs and squat down, but wonder how exactly you are going to pass a creature with two heads?\n\n");
        if (player.body.vaginas.length === 0) {
            CView.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  <b>You look down and behold a new vagina</b>.\n\n");
            player.body.vaginas.add(new Vagina());
        }
        CView.text("Hearing a hiss, you look down to see drops of water hitting the ground and instantly turning to steam.  There is unnatural heat filling you, it's hot enough to boil water; but thanks to the creature inside you, you're barely feeling a thing!  More energy fills you and you begin to push down on the child within in earnest.  The process is painful, but satisfying; you feel like you could push out a mountain with the energy you have right now.  Within a minute, you can feel the heads emerge.  The heads are quickly followed by the rest of the body and you catch your hellhound child in your hands and lift it up to look at it.\n\n");
        CView.text("You can see the distinctive dog heads are wrapped around each other and yipping softly; a hint of flame can sometimes be seen inside their mouths.  Its cute paws are waving in the air looking for purchase, but the rest of its body looks entirely human except for the double dicks, and it even has your skin color.  Its mouths are aching for nutrition, and you realize that your breasts are filled with what this pup needs and pull it to your chest.  Each head quickly finds a nipple and begins to suckle.  Having finished the birthing, you contentedly sit back down and bask in the feeling of giving milk to your child, or is it children?\n\n");
        CView.text("You sit there in a state of euphoria for some time.  It's not until the child in front of you starts to become uncomfortably hot and heavy, that you are brought back to reality.  You look down to see that the hellhound pup has grown to three times its original size and even sprouted the distinctive layer of tough black fur.  The beast is licking contentedly at your breasts instead of sucking.  It was the now-full flames in its mouth that had broken your reverie, but before you get a real grasp of what had happened, the hellhound pulls away from you and gives you a few quick happy barks before turning around and running off into the wilds, dropping down onto four legs just before disappearing from view.  You feel the unnatural strength you gained during the birth fade away, and you fall into a deep contented sleep.\n\n");
        boostLactation(player, .01);
        // Main Text here
        womb.clear();
        if (player.body.chest.reduce(BreastRow.AverageLactation, 0) > 0 && player.body.chest.reduce(BreastRow.AverageLactation, 0) < 5) {
            CView.text("Your breasts won't seem to stop dribbling milk, lactating more heavily than before.  ");
            boostLactation(player, .5);
        }
        displayStretchVagina(player, 60, true);
        if (player.body.vaginas.get(0)!.wetness === VaginaWetness.DRY) player.body.vaginas.get(0)!.wetness++;
        // if (player.gender === 1) player.gender = 3;
        // if (player.gender === 0) player.gender = 2;
        player.orgasm();
        player.stats.str += -1;
        player.stats.tou += -1;
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
        CView.text("\n");
    }
}
