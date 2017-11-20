import Cock, { CockType } from '../../../Body/Cock';
import Vagina, { VaginaWetness } from '../../../Body/Vagina';
import BreastDescriptor from '../../../Descriptors/BreastDescriptor';
import CockDescriptor from '../../../Descriptors/CockDescriptor';
import VaginaDescriptor from '../../../Descriptors/VaginaDescriptor';
import DisplayText from '../../../display/DisplayText';
import StatusAffectFactory from '../../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../../Game/Flags';
import VaginaModifier from '../../../Modifiers/VaginaModifier';
import Player from '../../../Player/Player';
import Utils from '../../../Utilities/Utils';
import IPregnancyEvent from '../IPregnancyEvent';

export default class AnemonePreg implements IPregnancyEvent {
    public incubationDisplay(player: Player, incubationTime: number) {
        if (incubationTime == 240) {
            DisplayText.newline();
            DisplayText.textBold("You feel something shifting and moving inside you.  You start to think you might be pregnant.");
            DisplayText.newline();
        }
        if (incubationTime == 210) {
            DisplayText.newline();
            DisplayText.textBold("The fluttering of sensation inside you is getting stronger and more frequent.  At times it even feels as if the inner lining of your womb is tingling.");
            DisplayText.newline();
            player.stats.lust += 5 + player.stats.lib / 20;
        }
        if (incubationTime == 185) {
            DisplayText.newline();
            DisplayText.textBold("The unmistakable bulge of pregnancy is visible in your tummy.  ");
            if (player.stats.cor < 40) DisplayText.textBold("You are distressed by your unwanted pregnancy, and your inability to force this thing out of you.");
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText.textBold("Considering the possible fathers, you hope it isn't that big.");
            if (player.stats.cor >= 75) DisplayText.textBold("You think dreamily about the cocks that have recently been fucking you, and hope that your offspring inherit such a divine pleasure tool.");
            player.stats.spe += -1;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 2;
            DisplayText.newline();
        }
        if (incubationTime == 154) {
            DisplayText.newline();
            DisplayText.textBold("The sudden impact of a strong movement from inside your womb startles you.");
            DisplayText.newline();            
        }
        if (incubationTime == 120) {
            DisplayText.newline();
            DisplayText.textBold("Your larger, squirming belly makes your pregnancy obvious for those around you");
            if (player.lowerBody.vaginaSpot.hasVagina()) DisplayText.text(" and keeps your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " aroused from the constant tingling in your womb.");
            DisplayText.newline();            
            player.stats.lust += 10 + player.stats.lib / 20;
        }
        if (incubationTime == 72) {
            DisplayText.newline();
            DisplayText.textBold("Your belly is noticeably distended, ");
            if (player.stats.cor < 40) DisplayText.textBold("and constantly shifts and wriggles.  What manner of beast are you bringing into the world?");
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText.textBold("and you wonder how much longer you have to wait.");
            if (player.stats.cor >= 75) DisplayText.textBold("and you're eager to give birth, so you can get impregnated again by corrupted or monstrous cum filling out your eager womb.");
            DisplayText.newline();
            player.stats.spe += -3;
            player.stats.lib += 1;
            player.stats.sens += 1;
            player.stats.lust += 5 + player.stats.lib / 20;
        }
        if (incubationTime == 48) {
            DisplayText.newline();
            DisplayText.textBold("You rub your hands over your bulging belly, lost in the sensations of motherhood.  ");
            if (player.stats.cor < 40) DisplayText.textBold("Afterwards you feel somewhat disgusted with yourself, but horny.");
            if (player.stats.cor >= 40 && player.stats.cor < 75) DisplayText.textBold("You estimate you'll give birth in the next few days.  You hope the birth is as erotically charged as the pregnancy has been.");
            if (player.stats.cor >= 75) DisplayText.textBold("You find yourself daydreaming  about birthing cilia-covered worms, orgasming each time their thousands of stingers brush by your clit and fill it full of sensation-enhancing drugs.");
            DisplayText.newline();            
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
        DisplayText.text("\n");
        if (player.lowerBody.vaginaSpot.count() == 0) {
            DisplayText.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ");
            player.lowerBody.vaginaSpot.add(new Vagina());
            player.updateGender();
        }
        DisplayText.text("Your " + player.inventory.armorSlot.equipment.displayName + " feels damp around the groin and you reach down to check the area.  The  " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " you feel is dilated and slick with unusual wetness; your water must have broken!");
        DisplayText.newline(2);        

        DisplayText.text("Hurriedly you strip off your gear and sit down with your back against a rock.  Focusing yourself, you attempt to prepare for labor; you try to remember your recent partners and worry about what kind of monstrous infant you might have to force out of your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".  The first contraction comes and you push as hard as you can, to be rewarded with the feeling of something sliding out between your labia.  You attempt a few more pushes but nothing further seems forthcoming; curious, you look down at your crotch only to discover a blue stalk sticking proudly out of your vagina!");
        DisplayText.newline(2);
        
        if (Flags.list[FlagEnum.ANEMONE_KID] > 0) {
            DisplayText.text("As you take in the sight, small nodules around the tip begin to form and lengthen, until the little anemone is capped by a mop of wriggling blue-green tentacles.  Horrified, you grasp it at the base and give it a sharp pull.  The pain makes you lock up and nearly takes away your consciousness as its sticky surface releases its grip on your labia and " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + "!   It writhes and slips out of your pain-wracked hands, leaving them tingling.  As you lie there, stunned, it begins to inch back toward your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".  Footfalls sound next to you, and a blue hand picks up the squirming, cilliated creature.  Kid A gives you a shy smile, then turns to her barrel.  A quick splash and a filled waterskin later, she heads toward the stream, toting your grub-like offspring.");
            VaginaModifier.displayStretchVagina(player, 20, true, true, false);
            DisplayText.newline(2);            
            DisplayText.text("Exhausted by the birth but with a burden lifted from your mind, you slip into a grateful doze.");
            return;
        }
        else if (player.lowerBody.cockSpot.countType(CockType.ANEMONE) > 0 && player.stats.cor < 25 && Flags.list[FlagEnum.ANEMONE_KID] == 0) {
            DisplayText.text("As you take in the sight, small nodules around the tip begin to form and lengthen, until the little anemone is capped by a mop of wriggling blue-green tentacles.  Horrified, you grasp it at the base and give it a sharp pull.  The ensuing pain in your labia and " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + " makes you lock up and nearly takes away your consciousness, and with " + CockDescriptor.describeMultiCock(player) + " in the way, you can't get any leverage on the pull at all!  The anemone detaches weakly, but writhes and slips out of your pain-wracked grip, leaving your hands tingling.  As you lie there, stunned, it begins to inch back toward your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".  Searching about weakly with the feelers, it touches along your thigh and searches out the entrance of your pussy.  When the tentacled crown brushes past your lips a venomous heat stirs your crotch and fills you with energy; shocked into sense, you look at the absurd creature.  You raise your arm to slap at it, but something stays your hand.  As if sensing your hesitation, it stands upright and holds itself at attention for inspection.  It would be easy to knock it away... and yet, the unprepossessing little thing looks so proud that you can't quite bring yourself to do so.");
            DisplayText.text("\n\nYou scoop the diminutive anemone up and look around for somewhere wet to put it.  The stream is too far, the lake doubly so; you'd never make it to either, as sick as you feel from yanking viciously on your clitoris.  Driven to last resorts, you lurch over to the water barrel in your camp and, wrenching the lid off, drop the blue stalk unceremoniously inside.  Exhausted by the shock and pain of the ordeal, you slump down beside the barrel and slip into a doze...");
            VaginaModifier.displayStretchVagina(player, 20, true, true, false);
            DisplayText.newline();
            player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.CampAnemoneTrigger, 0, 0, 0, 0));
            return;
        }
        //[(if pc has 0-9 existing cocks)
        else if (player.lowerBody.cockSpot.count() < 10) {
            DisplayText.text("As you take in the sight, small nodules around the tip begin to form and lengthen, until the little anemone is capped by a mop of wriggling blue-green tentacles.  Horrified, you grasp it at the base and give it a sharp pull.  The pain makes you lock up and nearly takes away your consciousness as its sticky surface releases its grip on your labia and " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + "!  The small anemone and you both lay there twitching, but it recovers its bearings first; through your haze of pain you watch it flexing its body, wedging the head under itself, and elevating the base.");
            VaginaModifier.displayStretchVagina(player, 20, true, true, false);
            
            DisplayText.newline(2);
            DisplayText.text("Beset by a panic, you watch as the strange thing sets butt-end down on your pubic mound and adheres");
            //[(if cocks)
            if (player.lowerBody.cockSpot.count() > 0) DisplayText.text(" below your " + CockDescriptor.describeMultiCockShort(player));
            DisplayText.text(". A sharp pinch lances through the nerves in your groin and sends your hands to it reflexively.  This smaller pain, coupled with the adrenaline and dopamine that have finally chased the fog from your head, is enough to pull your thoughts into focus for another attempt to remove your strange, parasitic offspring.  You shift your grip and pull a few more times, but the thing doesn't budge.  The handling of it only serves to make the stalk thicken and become stiff; gradually you notice that you're feeling the sensation of your own pulling not from the skin at the point of attachment but from the stalk itself, and this realization is accompanied by the ring of tentacles opening and pulling back to reveal the crown of a penis!");
            DisplayText.textBold("You have a new anemone-penis!");
            //[(dick slot 1 exists)
            if (player.lowerBody.cockSpot.count() > 0) DisplayText.text("  The tentacles writhe around, rubbing against your " + CockDescriptor.describeMultiCockShort(player));
            //(doesn't exist)
            else DisplayText.text("  The tentacles curl inwards, rubbing on the head of your new blue pecker");
            const newCock: Cock = new Cock(4 + Utils.rand(3), 1.2);
            player.lowerBody.cockSpot.add(newCock);
            newCock.cockType = CockType.ANEMONE;
            DisplayText.text(" and you quickly become fully erect from the aphrodisiac they inject.  Over and over the tentacles caress " + CockDescriptor.describeMultiCockSimpleOne(player) + " sensually, leaving behind a tingling trail of vibrant pleasure");
            //[(if no dick1 and no balls)
            if (player.lowerBody.cockSpot.count() == 1 && player.lowerBody.balls == 0) DisplayText.text("; you feel a pressure build below the shaft, near your asshole");
            DisplayText.text(".  As the venom and the rubbing work you to the edge of climax, your muscles clench and a ");
            if (player.cumQ() < 100) DisplayText.text("glob");
            else if (player.cumQ() < 500) DisplayText.text("squirt");
            else DisplayText.text("spray");
            DisplayText.text(" of semen shoots from your new penis and lands on your ");
            //[(if boobs)
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 1) DisplayText.text(BreastDescriptor.describeAllBreasts(player) + " and ");
            DisplayText.text("stomach");
            //[(dick1 exists)
            if (player.lowerBody.cockSpot.count() > 1) DisplayText.text(", followed in short order by white squirts from " + CockDescriptor.describeMultiCockSimpleOne(player) + " remaining");
            DisplayText.text(".  Your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " quivers and pulses as well, adding ");
            if (player.lowerBody.vaginaSpot.get(0).vaginalWetness < VaginaWetness.SLICK) DisplayText.text("a trickle");
            else if (player.lowerBody.vaginaSpot.get(0).vaginalWetness < VaginaWetness.SLAVERING) DisplayText.text("a squirt");
            else DisplayText.text("nearly a cupful of fluid");
            DisplayText.text(" from your female orgasm to the puddle on the ground below your ass.");
            DisplayText.newline(2);
            //(gain 1 nemo-dick, reduce lust to min)]
            player.updateGender();
            player.orgasm();
            player.stats.lib += 2;
            player.stats.sens += 5;
        }
        //[(if PC has 10 existing cocks) && no kid
        else {
            DisplayText.text("As you take in the sight, small nodules around the tip begin to form and lengthen, until the little anemone is capped by a mop of wriggling blue-green tentacles.  Horrified, you grasp it at the base and give it a sharp pull.  The ensuing pain in your labia and " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + " makes you lock up and nearly takes away your consciousness, robbing your pull of force.  The anemone detaches weakly, but writhes and slips out of your pain-wracked grip, leaving your hands tingling.  As you lie there, stunned, it begins to inch back toward your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ".  Casting about with the feelers, it touches along your thigh and searches out the entrance of your pussy.  When the tentacled crown brushes past your lips a venomous heat stirs your crotch and fills you with energy; renewed, you slap at it, trying to knock the little creature away.  Several weak hits land on it, and, almost as if irritated, the tentacles seize on your labia and pull the stalk back toward your crotch and thence into your pussy.  Next you feel the thing shift and flatten itself against your insides, then a pinch on your vaginal walls where the little anemone presses on them.  This can't be good.");
            VaginaModifier.displayStretchVagina(player, 20, true, true, false);
            
            //OLD TXToutputText("The anemone writhes and slips out of your pain-wracked grip, leaving your hands tingling.  As you lie there, stunned, it begins to inch back into your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0))+ ".  As the tentacled crown brushes past your lips a venomous heat fills your crotch - you feel the thing shift and flatten itself against your insides, then a pinch on your vaginal walls where the little anemone was pressing on them.  This can't be good.\n\n");

            DisplayText.newline(2);
            DisplayText.text("Push as you might, you can't get it to peek back out even the slightest bit.  What's worse, the heat isn't subsiding, as the tentacles are now lodged inside your pussy!  Prodding and pulling at your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " is only worsening the effect; " + CockDescriptor.describeMultiCockSimpleOne(player) + " and your clitoris harden as you attempt to retrieve your invader.  Your probes get weaker and weaker as your vagina spasms to each stroke of your insides; each time you touch the creature, the sensation is being transmitted right back to your nerves.  Eventually you push yourself to accidental orgasm; your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " quivers around your fingers and your " + CockDescriptor.describeMultiCockShort(player) + " does the best ejaculation it can manange with hardly any warmup time and no direct stimulation.  Even after the orgasm ends, the tentacles continue to torment your groin.  ");
            DisplayText.textBold("You are VERY horny with this thing inside you... though you can't reach it, maybe there's a way to crowd it out?");
            DisplayText.newline(2);            
            //(reduce lust to min, increased minimum lust by 30 until halfway through PC's next pregnancy)]
            player.orgasm();
            player.stats.lib += 2;
            player.stats.sens += 5;
            if (!player.statusAffects.has("AnemoneArousal"))
                player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.AnemoneArousal, 0, 0, 0, 0));
        }
        DisplayText.text("Exhausted by the 'birth' and the climax, you slip into a doze.");
        DisplayText.newline();        
    }
}