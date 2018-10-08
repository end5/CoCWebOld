import { Character } from "../../../Character/Character";
import { Womb } from "../Womb";
import { CView } from "../../../../Engine/Display/ContentView";
import { describeVagina, describeClit } from "../../../Descriptors/VaginaDescriptor";
import { IPregnancyEvent } from "../IPregnancyEvent";
import { Vagina, VaginaWetness } from "../../Vagina";
import { displayStretchVagina } from "../../../Modifiers/VaginaModifier";
import { Cock, CockType } from "../../Cock";
import { describeCocks, describeCocksLight, describeOneOfYourCocks } from "../../../Descriptors/CockDescriptor";
import { StatusEffectType } from "../../../Effects/StatusEffectType";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { BreastRow } from "../../BreastRow";
import { describeAllBreasts } from "../../../Descriptors/BreastDescriptor";
import { AnemoneFlags } from "../../../Scenes/NPCs/AnemoneScene";

export class AnemonePregEvent implements IPregnancyEvent {
    public incubationDisplay(player: Character, womb: Womb): void {
        if (womb.pregnancy.incubation === 240) {
            CView.text("\n<b>You feel something shifting and moving inside you.  You start to think you might be pregnant.</b>\n");
        }
        if (womb.pregnancy.incubation === 210) {
            CView.text("\n<b>The fluttering of sensation inside you is getting stronger and more frequent.  At times it even feels as if the inner lining of your womb is tingling.</b>\n");
            player.stats.lust += (5 + player.stats.lib / 20);

        }
        if (womb.pregnancy.incubation === 185) {
            CView.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  ");
            if (player.stats.cor < 40) CView.text("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.</b>");
            if (player.stats.cor >= 40 && player.stats.cor < 75) CView.text("Considering the possible fathers, you hope it isn't that big.</b>");
            if (player.stats.cor >= 75) CView.text("You think dreamily about the cocks that have recently been fucking you, and hope that your offspring inherit such a divine pleasure tool.</b>");
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;

            CView.text("\n");
        }
        if (womb.pregnancy.incubation === 154) {
            CView.text("\n<b>The sudden impact of a strong movement from inside your womb startles you.</b>\n");
        }
        if (womb.pregnancy.incubation === 120) {
            CView.text("\n<b>Your larger, squirming belly makes your pregnancy obvious for those around you");
            if (player.body.vaginas.length > 0) CView.text(" and keeps your " + describeVagina(player, player.body.vaginas.get(0)) + " aroused from the constant tingling in your womb");
            CView.text(".</b>\n");
            player.stats.lust += (10 + player.stats.lib / 20);

        }
        if (womb.pregnancy.incubation === 72) {
            CView.text("\n<b>Your belly is noticeably distended, ");
            if (player.stats.cor < 40) CView.text("and constantly shifts and wriggles.  What manner of beast are you bringing into the world?</b>");
            if (player.stats.cor >= 40 && player.stats.cor < 75) CView.text("and you wonder how much longer you have to wait.</b>");
            if (player.stats.cor >= 75) CView.text("and you're eager to give birth, so you can get impregnated again by corrupted or monstrous cum filling out your eager womb.</b>");
            CView.text("\n");
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += (5 + player.stats.lib / 20);

        }
        if (womb.pregnancy.incubation === 48) {
            CView.text("\n<b>You rub your hands over your bulging belly, lost in the sensations of motherhood.  ");
            if (player.stats.cor < 40) CView.text("Afterwards you feel somewhat disgusted with yourself, but horny.</b>\n");
            if (player.stats.cor >= 40 && player.stats.cor < 75) CView.text("You estimate you'll give birth in the next few days.  You hope the birth is as erotically charged as the pregnancy has been.</b>\n");
            if (player.stats.cor >= 75) CView.text("You find yourself daydreaming  about birthing cilia-covered worms, orgasming each time their thousands of stingers brush by your clit and fill it full of sensation-enhancing drugs.</b>\n");
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += (10 + player.stats.lib / 20);
        }
    }

    public canBirth(player: Character, womb: Womb): boolean {
        return womb.pregnancy.incubation === 1;
    }

    public birthScene(player: Character, womb: Womb): void {
        CView.text("\n");
        if (player.body.vaginas.length === 0) {
            CView.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ");
            player.body.vaginas.add(new Vagina());
        }
        CView.text("Your " + player.inventory.equipment.armor.displayName + " feels damp around the groin and you reach down to check the area.  The  " + describeVagina(player, player.body.vaginas.get(0)) + " you feel is dilated and slick with unusual wetness; your water must have broken!\n\n");

        CView.text("Hurriedly you strip off your gear and sit down with your back against a rock.  Focusing yourself, you attempt to prepare for labor; you try to remember your recent partners and worry about what kind of monstrous infant you might have to force out of your " + describeVagina(player, player.body.vaginas.get(0)) + ".  The first contraction comes and you push as hard as you can, to be rewarded with the feeling of something sliding out between your labia.  You attempt a few more pushes but nothing further seems forthcoming; curious, you look down at your crotch only to discover a blue stalk sticking proudly out of your vagina!\n\n");

        if (AnemoneFlags.ANEMONE_KID > 0) {
            CView.text("As you take in the sight, small nodules around the tip begin to form and lengthen, until the little anemone is capped by a mop of wriggling blue-green tentacles.  Horrified, you grasp it at the base and give it a sharp pull.  The pain makes you lock up and nearly takes away your consciousness as its sticky surface releases its grip on your labia and " + describeClit(player) + "!   It writhes and slips out of your pain-wracked hands, leaving them tingling.  As you lie there, stunned, it begins to inch back toward your " + describeVagina(player, player.body.vaginas.get(0)) + ".  Footfalls sound next to you, and a blue hand picks up the squirming, cilliated creature.  Kid A gives you a shy smile, then turns to her barrel.  A quick splash and a filled waterskin later, she heads toward the stream, toting your grub-like offspring.");
            displayStretchVagina(player, 20, true, true, false);
            CView.text("\n\nExhausted by the birth but with a burden lifted from your mind, you slip into a grateful doze.");
            womb.clear();
            return;
        }
        else if (player.body.cocks.filter(Cock.FilterType(CockType.ANEMONE)).length > 0 && player.stats.cor < 25 && AnemoneFlags.ANEMONE_KID === 0) {
            CView.text("As you take in the sight, small nodules around the tip begin to form and lengthen, until the little anemone is capped by a mop of wriggling blue-green tentacles.  Horrified, you grasp it at the base and give it a sharp pull.  The ensuing pain in your labia and " + describeClit(player) + " makes you lock up and nearly takes away your consciousness, and with " + describeCocks(player) + " in the way, you can't get any leverage on the pull at all!  The anemone detaches weakly, but writhes and slips out of your pain-wracked grip, leaving your hands tingling.  As you lie there, stunned, it begins to inch back toward your " + describeVagina(player, player.body.vaginas.get(0)) + ".  Searching about weakly with the feelers, it touches along your thigh and searches out the entrance of your pussy.  When the tentacled crown brushes past your lips a venomous heat stirs your crotch and fills you with energy; shocked into sense, you look at the absurd creature.  You raise your arm to slap at it, but something stays your hand.  As if sensing your hesitation, it stands upright and holds itself at attention for inspection.  It would be easy to knock it away... and yet, the unprepossessing little thing looks so proud that you can't quite bring yourself to do so.");
            CView.text("\n\nYou scoop the diminutive anemone up and look around for somewhere wet to put it.  The stream is too far, the lake doubly so; you'd never make it to either, as sick as you feel from yanking viciously on your clitoris.  Driven to last resorts, you lurch over to the water barrel in your camp and, wrenching the lid off, drop the blue stalk unceremoniously inside.  Exhausted by the shock and pain of the ordeal, you slump down beside the barrel and slip into a doze...");
            displayStretchVagina(player, 20, true, true, false);
            CView.text("\n");
            player.effects.add(StatusEffectType.CampAnemoneTrigger, 0, 0, 0, 0);
            womb.clear();
            return;
        }
        // [(if pc has 0-9 existing cocks)
        else if (player.body.cocks.length < 10) {
            CView.text("As you take in the sight, small nodules around the tip begin to form and lengthen, until the little anemone is capped by a mop of wriggling blue-green tentacles.  Horrified, you grasp it at the base and give it a sharp pull.  The pain makes you lock up and nearly takes away your consciousness as its sticky surface releases its grip on your labia and " + describeClit(player) + "!  The small anemone and you both lay there twitching, but it recovers its bearings first; through your haze of pain you watch it flexing its body, wedging the head under itself, and elevating the base.");
            displayStretchVagina(player, 20, true, true, false);

            CView.text("\n\nBeset by a panic, you watch as the strange thing sets butt-end down on your pubic mound and adheres");
            // [(if cocks)
            if (player.body.cocks.length > 0) CView.text(" below your " + describeCocksLight(player));
            CView.text(". A sharp pinch lances through the nerves in your groin and sends your hands to it reflexively.  This smaller pain, coupled with the adrenaline and dopamine that have finally chased the fog from your head, is enough to pull your thoughts into focus for another attempt to remove your strange, parasitic offspring.  You shift your grip and pull a few more times, but the thing doesn't budge.  The handling of it only serves to make the stalk thicken and become stiff; gradually you notice that you're feeling the sensation of your own pulling not from the skin at the point of attachment but from the stalk itself, and this realization is accompanied by the ring of tentacles opening and pulling back to reveal the crown of a penis!  <b>You have a new anemone-penis!</b>");
            // [(dick slot 1 exists)
            if (player.body.cocks.length > 0) CView.text("  The tentacles writhe around, rubbing against your " + describeCocksLight(player));
            // (doesn't exist)
            else CView.text("  The tentacles curl inwards, rubbing on the head of your new blue pecker");
            player.body.cocks.add(new Cock((4 + randInt(3)), 1.2));
            player.body.cocks.get(player.body.cocks.length - 1).type = CockType.ANEMONE;
            CView.text(" and you quickly become fully erect from the aphrodisiac they inject.  Over and over the tentacles caress " + describeOneOfYourCocks(player) + " sensually, leaving behind a tingling trail of vibrant pleasure");
            // [(if no dick1 and no balls)
            if (player.body.cocks.length === 1 && player.body.balls.count === 0) CView.text("; you feel a pressure build below the shaft, near your asshole");
            CView.text(".  As the venom and the rubbing work you to the edge of climax, your muscles clench and a ");
            if (player.cumQ() < 100) CView.text("glob");
            else if (player.cumQ() < 500) CView.text("squirt");
            else CView.text("spray");
            CView.text(" of semen shoots from your new penis and lands on your ");
            // [(if boobs)
            if (player.body.chest.sort(BreastRow.Largest)[0].rating >= 1) CView.text(describeAllBreasts(player) + " and ");
            CView.text("stomach");
            // [(dick1 exists)
            if (player.body.cocks.length > 1) CView.text(", followed in short order by white squirts from " + describeOneOfYourCocks(player) + " remaining");
            CView.text(".  Your " + describeVagina(player, player.body.vaginas.get(0)) + " quivers and pulses as well, adding ");
            if (player.body.vaginas.get(0).wetness < VaginaWetness.SLICK) CView.text("a trickle");
            else if (player.body.vaginas.get(0).wetness < VaginaWetness.SLAVERING) CView.text("a squirt");
            else CView.text("nearly a cupful of fluid");
            CView.text(" from your female orgasm to the puddle on the ground below your ass.\n\n");
            // (gain 1 nemo-dick, reduce lust to min)]
            player.orgasm();
            player.stats.lib += 2;
            player.stats.sens += 5;

        }
        // [(if PC has 10 existing cocks) && no kid
        else {
            CView.text("As you take in the sight, small nodules around the tip begin to form and lengthen, until the little anemone is capped by a mop of wriggling blue-green tentacles.  Horrified, you grasp it at the base and give it a sharp pull.  The ensuing pain in your labia and " + describeClit(player) + " makes you lock up and nearly takes away your consciousness, robbing your pull of force.  The anemone detaches weakly, but writhes and slips out of your pain-wracked grip, leaving your hands tingling.  As you lie there, stunned, it begins to inch back toward your " + describeVagina(player, player.body.vaginas.get(0)) + ".  Casting about with the feelers, it touches along your thigh and searches out the entrance of your pussy.  When the tentacled crown brushes past your lips a venomous heat stirs your crotch and fills you with energy; renewed, you slap at it, trying to knock the little creature away.  Several weak hits land on it, and, almost as if irritated, the tentacles seize on your labia and pull the stalk back toward your crotch and thence into your pussy.  Next you feel the thing shift and flatten itself against your insides, then a pinch on your vaginal walls where the little anemone presses on them.  This can't be good.");
            displayStretchVagina(player, 20, true, true, false);

            // OLD TXTCView.text("The anemone writhes and slips out of your pain-wracked grip, leaving your hands tingling.  As you lie there, stunned, it begins to inch back into your " + describeVagina(player, player.body.vaginas.get(0))+ ".  As the tentacled crown brushes past your lips a venomous heat fills your crotch - you feel the thing shift and flatten itself against your insides, then a pinch on your vaginal walls where the little anemone was pressing on them.  This can't be good.\n\n");

            CView.text("\n\nPush as you might, you can't get it to peek back out even the slightest bit.  What's worse, the heat isn't subsiding, as the tentacles are now lodged inside your pussy!  Prodding and pulling at your " + describeVagina(player, player.body.vaginas.get(0)) + " is only worsening the effect; " + describeOneOfYourCocks(player) + " and your clitoris harden as you attempt to retrieve your invader.  Your probes get weaker and weaker as your vagina spasms to each stroke of your insides; each time you touch the creature, the sensation is being transmitted right back to your nerves.  Eventually you push yourself to accidental orgasm; your " + describeVagina(player, player.body.vaginas.get(0)) + " quivers around your fingers and your " + describeCocksLight(player) + " does the best ejaculation it can manange with hardly any warmup time and no direct stimulation.  Even after the orgasm ends, the tentacles continue to torment your groin.  <b>You are VERY horny with this thing inside you... though you can't reach it, maybe there's a way to crowd it out?</b>\n\n");
            // (reduce lust to min, increased minimum lust by 30 until halfway through PC's next pregnancy)]
            player.orgasm();
            player.stats.lib += 2;
            player.stats.sens += 5;

            if (!player.effects.has(StatusEffectType.AnemoneArousal)) player.effects.add(StatusEffectType.AnemoneArousal, 0, 0, 0, 0);
        }
        womb.clear();
        CView.text("Exhausted by the 'birth' and the climax, you slip into a doze.\n");
    }
}
