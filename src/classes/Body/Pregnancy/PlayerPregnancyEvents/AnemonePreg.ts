import Cock, { CockType } from '../../Body/Cock';
import Vagina, { VaginaWetness } from '../../Body/Vagina';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import CreatureChange from '../../display/CreatureChange';
import MainScreen from '../../display/MainScreen';
import StatusAffect from '../../Effects/StatusAffect';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';
import IPregnancyEvent from '../IPregnancyEvent';

export default class AnemonePreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime == 240) {
            MainScreen.text("\n<b>You feel something shifting and moving inside you.  You start to think you might be pregnant.</b>\n", false);
        }
        if (incubationTime == 210) {
            MainScreen.text("\n<b>The fluttering of sensation inside you is getting stronger and more frequent.  At times it even feels as if the inner lining of your womb is tingling.</b>\n", false);
            player.stats.lust += 5 + player.stats.lib / 20;
        }
        if (incubationTime == 185) {
            MainScreen.text("\n<b>The unmistakable bulge of pregnancy is visible in your tummy.  ", false);
            if (player.stats.cor < 40) MainScreen.text("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.</b>", false);
            if (player.stats.cor >= 40 && player.stats.cor < 75) MainScreen.text("Considering the possible fathers, you hope it isn't that big.</b>", false);
            if (player.stats.cor >= 75) MainScreen.text("You think dreamily about the cocks that have recently been fucking you, and hope that your offspring inherit such a divine pleasure tool.</b>", false);
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;
            MainScreen.text("\n", false);
        }
        if (incubationTime == 154) {
            MainScreen.text("\n<b>The sudden impact of a strong movement from inside your womb startles you.</b>\n", false);
        }
        if (incubationTime == 120) {
            MainScreen.text("\n<b>Your larger, squirming belly makes your pregnancy obvious for those around you", false);
            if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" and keeps your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " aroused from the constant tingling in your womb", false);
            MainScreen.text(".</b>\n", false);
            player.stats.lust += 10 + player.stats.lib / 20;
        }
        if (incubationTime == 72) {
            MainScreen.text("\n<b>Your belly is noticeably distended, ", false);
            if (player.stats.cor < 40) MainScreen.text("and constantly shifts and wriggles.  What manner of beast are you bringing into the world?</b>", false);
            if (player.stats.cor >= 40 && player.stats.cor < 75) MainScreen.text("and you wonder how much longer you have to wait.</b>", false);
            if (player.stats.cor >= 75) MainScreen.text("and you're eager to give birth, so you can get impregnated again by corrupted or monstrous cum filling out your eager womb.</b>", false);
            MainScreen.text("\n", false);
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 5 + player.stats.lib / 20;
        }
        if (incubationTime == 48) {
            MainScreen.text("\n<b>You rub your hands over your bulging belly, lost in the sensations of motherhood.  ", false);
            if (player.stats.cor < 40) MainScreen.text("Afterwards you feel somewhat disgusted with yourself, but horny.</b>\n", false);
            if (player.stats.cor >= 40 && player.stats.cor < 75) MainScreen.text("You estimate you'll give birth in the next few days.  You hope the birth is as erotically charged as the pregnancy has been.</b>\n", false);
            if (player.stats.cor >= 75) MainScreen.text("You find yourself daydreaming  about birthing cilia-covered worms, orgasming each time their thousands of stingers brush by your clit and fill it full of sensation-enhancing drugs.</b>\n", false);
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 10 + player.stats.lib / 20;
        }
    }

    public canBirth(player: Player, incubationTime: number) {
        return incubationTime <= 0;
    }

    public birth(player: Player): boolean {
        MainScreen.text("\n", false);
        if (player.lowerBody.vaginaSpot.count() == 0) {
            MainScreen.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ", false);
            player.lowerBody.vaginaSpot.add(new Vagina());
            player.updateGender();
        }
        MainScreen.text("Your " + player.inventory.armor.displayName + " feels damp around the groin and you reach down to check the area.  The  " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " you feel is dilated and slick with unusual wetness; your water must have broken!\n\n", false);

        MainScreen.text("Hurriedly you strip off your gear and sit down with your back against a rock.  Focusing yourself, you attempt to prepare for labor; you try to remember your recent partners and worry about what kind of monstrous infant you might have to force out of your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".  The first contraction comes and you push as hard as you can, to be rewarded with the feeling of something sliding out between your labia.  You attempt a few more pushes but nothing further seems forthcoming; curious, you look down at your crotch only to discover a blue stalk sticking proudly out of your vagina!\n\n", false);

        if (Flags.list[FlagEnum.ANEMONE_KID] > 0) {
            MainScreen.text("As you take in the sight, small nodules around the tip begin to form and lengthen, until the little anemone is capped by a mop of wriggling blue-green tentacles.  Horrified, you grasp it at the base and give it a sharp pull.  The pain makes you lock up and nearly takes away your consciousness as its sticky surface releases its grip on your labia and " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + "!   It writhes and slips out of your pain-wracked hands, leaving them tingling.  As you lie there, stunned, it begins to inch back toward your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".  Footfalls sound next to you, and a blue hand picks up the squirming, cilliated creature.  Kid A gives you a shy smile, then turns to her barrel.  A quick splash and a filled waterskin later, she heads toward the stream, toting your grub-like offspring.");
            CreatureChange.stretchVagina(player, 20, true, true, false);
            MainScreen.text("\n\nExhausted by the birth but with a burden lifted from your mind, you slip into a grateful doze.");
            return;
        }
        else if (player.lowerBody.cockSpot.countType(CockType.ANEMONE) > 0 && player.stats.cor < 25 && Flags.list[FlagEnum.ANEMONE_KID] == 0) {
            MainScreen.text("As you take in the sight, small nodules around the tip begin to form and lengthen, until the little anemone is capped by a mop of wriggling blue-green tentacles.  Horrified, you grasp it at the base and give it a sharp pull.  The ensuing pain in your labia and " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + " makes you lock up and nearly takes away your consciousness, and with " + CockDescriptor.describeMultiCock(player) + " in the way, you can't get any leverage on the pull at all!  The anemone detaches weakly, but writhes and slips out of your pain-wracked grip, leaving your hands tingling.  As you lie there, stunned, it begins to inch back toward your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".  Searching about weakly with the feelers, it touches along your thigh and searches out the entrance of your pussy.  When the tentacled crown brushes past your lips a venomous heat stirs your crotch and fills you with energy; shocked into sense, you look at the absurd creature.  You raise your arm to slap at it, but something stays your hand.  As if sensing your hesitation, it stands upright and holds itself at attention for inspection.  It would be easy to knock it away... and yet, the unprepossessing little thing looks so proud that you can't quite bring yourself to do so.");
            MainScreen.text("\n\nYou scoop the diminutive anemone up and look around for somewhere wet to put it.  The stream is too far, the lake doubly so; you'd never make it to either, as sick as you feel from yanking viciously on your clitoris.  Driven to last resorts, you lurch over to the water barrel in your camp and, wrenching the lid off, drop the blue stalk unceremoniously inside.  Exhausted by the shock and pain of the ordeal, you slump down beside the barrel and slip into a doze...");
            CreatureChange.stretchVagina(player, 20, true, true, false);
            MainScreen.text("\n");
            player.statusAffects.add(new StatusAffect("CampAnemoneTrigger", 0, 0, 0, 0));
            return;
        }
        //[(if pc has 0-9 existing cocks)
        else if (player.lowerBody.cockSpot.count() < 10) {
            MainScreen.text("As you take in the sight, small nodules around the tip begin to form and lengthen, until the little anemone is capped by a mop of wriggling blue-green tentacles.  Horrified, you grasp it at the base and give it a sharp pull.  The pain makes you lock up and nearly takes away your consciousness as its sticky surface releases its grip on your labia and " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + "!  The small anemone and you both lay there twitching, but it recovers its bearings first; through your haze of pain you watch it flexing its body, wedging the head under itself, and elevating the base.", false);
            CreatureChange.stretchVagina(player, 20, true, true, false);

            MainScreen.text("\n\nBeset by a panic, you watch as the strange thing sets butt-end down on your pubic mound and adheres", false);
            //[(if cocks)
            if (player.lowerBody.cockSpot.count() > 0) MainScreen.text(" below your " + CockDescriptor.describeMultiCockShort(player), false);
            MainScreen.text(". A sharp pinch lances through the nerves in your groin and sends your hands to it reflexively.  This smaller pain, coupled with the adrenaline and dopamine that have finally chased the fog from your head, is enough to pull your thoughts into focus for another attempt to remove your strange, parasitic offspring.  You shift your grip and pull a few more times, but the thing doesn't budge.  The handling of it only serves to make the stalk thicken and become stiff; gradually you notice that you're feeling the sensation of your own pulling not from the skin at the point of attachment but from the stalk itself, and this realization is accompanied by the ring of tentacles opening and pulling back to reveal the crown of a penis!  <b>You have a new anemone-penis!</b>", false);
            //[(dick slot 1 exists)
            if (player.lowerBody.cockSpot.count() > 0) MainScreen.text("  The tentacles writhe around, rubbing against your " + CockDescriptor.describeMultiCockShort(player), false);
            //(doesn't exist)
            else MainScreen.text("  The tentacles curl inwards, rubbing on the head of your new blue pecker", false);
            const newCock: Cock = new Cock(4 + Utils.rand(3), 1.2);
            player.lowerBody.cockSpot.add(newCock);
            newCock.cockType = CockType.ANEMONE;
            MainScreen.text(" and you quickly become fully erect from the aphrodisiac they inject.  Over and over the tentacles caress " + CockDescriptor.describeMultiCockSimpleOne(player) + " sensually, leaving behind a tingling trail of vibrant pleasure", false);
            //[(if no dick1 and no balls)
            if (player.lowerBody.cockSpot.count() == 1 && player.lowerBody.balls == 0) MainScreen.text("; you feel a pressure build below the shaft, near your asshole", false);
            MainScreen.text(".  As the venom and the rubbing work you to the edge of climax, your muscles clench and a ", false);
            if (player.cumQ() < 100) MainScreen.text("glob", false);
            else if (player.cumQ() < 500) MainScreen.text("squirt", false);
            else MainScreen.text("spray", false);
            MainScreen.text(" of semen shoots from your new penis and lands on your ", false);
            //[(if boobs)
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 1) MainScreen.text(BreastDescriptor.describeAllBreasts(player) + " and ", false);
            MainScreen.text("stomach", false);
            //[(dick1 exists)
            if (player.lowerBody.cockSpot.count() > 1) MainScreen.text(", followed in short order by white squirts from " + CockDescriptor.describeMultiCockSimpleOne(player) + " remaining", false);
            MainScreen.text(".  Your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " quivers and pulses as well, adding ", false);
            if (player.lowerBody.vaginaSpot.get(0).vaginalWetness < VaginaWetness.SLICK) MainScreen.text("a trickle", false);
            else if (player.lowerBody.vaginaSpot.get(0).vaginalWetness < VaginaWetness.SLAVERING) MainScreen.text("a squirt", false);
            else MainScreen.text("nearly a cupful of fluid", false);
            MainScreen.text(" from your female orgasm to the puddle on the ground below your ass.\n\n", false);
            //(gain 1 nemo-dick, reduce lust to min)]
            player.updateGender();
            player.orgasm();
            player.stats.lib += 2;
            player.stats.sens += 5;
        }
        //[(if PC has 10 existing cocks) && no kid
        else {
            MainScreen.text("As you take in the sight, small nodules around the tip begin to form and lengthen, until the little anemone is capped by a mop of wriggling blue-green tentacles.  Horrified, you grasp it at the base and give it a sharp pull.  The ensuing pain in your labia and " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + " makes you lock up and nearly takes away your consciousness, robbing your pull of force.  The anemone detaches weakly, but writhes and slips out of your pain-wracked grip, leaving your hands tingling.  As you lie there, stunned, it begins to inch back toward your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".  Casting about with the feelers, it touches along your thigh and searches out the entrance of your pussy.  When the tentacled crown brushes past your lips a venomous heat stirs your crotch and fills you with energy; renewed, you slap at it, trying to knock the little creature away.  Several weak hits land on it, and, almost as if irritated, the tentacles seize on your labia and pull the stalk back toward your crotch and thence into your pussy.  Next you feel the thing shift and flatten itself against your insides, then a pinch on your vaginal walls where the little anemone presses on them.  This can't be good.");
            CreatureChange.stretchVagina(player, 20, true, true, false);

            //OLD TXToutputText("The anemone writhes and slips out of your pain-wracked grip, leaving your hands tingling.  As you lie there, stunned, it begins to inch back into your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0))+ ".  As the tentacled crown brushes past your lips a venomous heat fills your crotch - you feel the thing shift and flatten itself against your insides, then a pinch on your vaginal walls where the little anemone was pressing on them.  This can't be good.\n\n", false);

            MainScreen.text("\n\nPush as you might, you can't get it to peek back out even the slightest bit.  What's worse, the heat isn't subsiding, as the tentacles are now lodged inside your pussy!  Prodding and pulling at your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " is only worsening the effect; " + CockDescriptor.describeMultiCockSimpleOne(player) + " and your clitoris harden as you attempt to retrieve your invader.  Your probes get weaker and weaker as your vagina spasms to each stroke of your insides; each time you touch the creature, the sensation is being transmitted right back to your nerves.  Eventually you push yourself to accidental orgasm; your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " quivers around your fingers and your " + CockDescriptor.describeMultiCockShort(player) + " does the best ejaculation it can manange with hardly any warmup time and no direct stimulation.  Even after the orgasm ends, the tentacles continue to torment your groin.  <b>You are VERY horny with this thing inside you... though you can't reach it, maybe there's a way to crowd it out?</b>\n\n", false);
            //(reduce lust to min, increased minimum lust by 30 until halfway through PC's next pregnancy)]
            player.orgasm();
            player.stats.lib += 2;
            player.stats.sens += 5;
            if (!player.statusAffects.has("AnemoneArousal"))
                player.statusAffects.add(new StatusAffect("AnemoneArousal", 0, 0, 0, 0));
        }
        MainScreen.text("Exhausted by the 'birth' and the climax, you slip into a doze.\n", false);
    }
}