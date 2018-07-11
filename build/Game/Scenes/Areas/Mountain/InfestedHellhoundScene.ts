import { DisplayText } from "../../../../Engine/display/DisplayText";
import { DisplaySprite } from "../../../../Engine/Display/DisplaySprite";
import { NextScreenChoices } from "../../../ScreenDisplay";
import { Character } from "../../../Character/Character";
import { Desc } from "../../../Descriptors/Descriptors";
import { LegType } from "../../../Body/Legs";
import { StatusAffectType } from "../../../Effects/StatusAffectType";
import { Scenes } from "../../Scenes";
import { Cock } from "../../../Body/Cock";
import { SpriteName } from "../../../../Engine/Display/Images/SpriteName";
import { InfestedHellhound } from "./InfestedHellhound";
import { CombatManager } from "../../../Combat/CombatManager";
import { Mod } from "../../../Modifiers/Modifiers";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { Pregnancy, PregnancyType } from "../../../Body/Pregnancy/Pregnancy";

/**
 * Created by aimozg on 04.01.14.
 */
// [INTRO – 50% chance split with regular hellhound if worms
// turned on and over level 2]
export function infestedHellhoundEncounter(player: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText("A low snarl vibrates through your body, ");
    if (player.torso.hips.legs.type === LegType.GOO) DisplayText("making your jello-like body jiggle");
    else DisplayText("rattling your teeth");
    DisplayText(".  Peeking fearfully over your shoulder, you see the black-furred form of a hell-hound emerging from behind a rock.  Its eyes narrow as its gaze locks onto your " + Desc.Body.assholeOrPussy(player) + ", a pair of black, shiny dog-cocks emerge underneath him, dangling freely.  His balls look bloated and distended, the skin around them crawling and wriggling.  A few worms drip from its over-sized peckers, crawling on the ground under the infested beast.\n\n");
    DisplayText("Somehow you know this thing isn't going to let you just walk away.");
    DisplaySprite(SpriteName.Hellhound);
    return CombatManager.beginBattle(player, [], [new InfestedHellhound()]);
}

export function infestedHellhoundLossRape(player: Character, monster: Character): NextScreenChoices {
    DisplayText().clear();
    // [BOTH INFESTED]
    if (player.torso.cocks.count > 0 && player.statusAffects.has(StatusAffectType.Infested)) {
        // (LUST)
        if (player.stats.lust > 99) {
            DisplayText("No amount of shame from the act of submitting to such a beast can overpower the furnace of lust raging in your loins.  ");
            if (player.stats.cor < 33) DisplayText("In spite of your revulsion ");
            else if (player.stats.cor < 66) DisplayText("In spite of your better sense ");
            else DisplayText("With a perverse sense of anticipation ");
            DisplayText("you remove your " + player.inventory.equipment.armor.displayName + " and roll onto your back, exposing your vulnerable groin to the beast.\n\n");
        }
        // (HP)
        else DisplayText("Too wounded to stand, you drop down to all fours in order to keep yourself off the ground.   Too late you realize your mistake – the snarling beast is behind you and its razor-sharp teeth easily sink into your " + player.inventory.equipment.armor.displayName + " before tearing away the offending armor, exposing your " + Desc.Butt.describeButt(player) + " and " + Desc.Cock.describeMultiCockShort(player) + ".  A cold mountain breeze blows across your now-exposed " + player.skin.desc + ", reminding you just how utterly vulnerable you are to the alien lusts of this symbiotic monstrosity. With a brutal lunge it knocks you off your " + Desc.Leg.describeFeet(player) + " and onto your back.\n\n");

        DisplayText("The beast takes a sniff at your groin, then backs away, looking confused.  You glance down and realize just how hard you've become.  A few of your worms are hanging from the " + Desc.Cock.describeCockHead(player.torso.cocks.get(0)) + " of your " + Desc.Cock.describeCock(player, player.torso.cocks.get(0)) + ", starting to flow out in a steady stream.  It feels better than it has any right to.   A shadow falls across you as the hellhound moves over you, its imposing twin members hard and pulsating above you.  Hot splatters of jism drip onto your chest as the beast's worms begin escaping, forcing thick globules of dog-semen out along with them.\n\n");

        DisplayText("Overcome by the worms, both you and the beast begin orgasming, without external stimulation of any kind.  Worms and cum mix together on top of you, slowly building into a large mound that covers the better part of your torso.  Exhausted and drained, you both squirt weakly, emptying the last of your smallest worms into the pile.   Your eyes close as the beast lies down with you, and together the two of you lose consciousness as your newly birthed worm colony squirms away.");
        player.orgasm();
        player.stats.lib += 1;
        player.stats.sens += 1;
        player.stats.cor += 1;
        player.cumMultiplier += .5;
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    // [PLAYER'S COCKS ARE BIG ENOUGH TO BE INFECTED]
    else if (!player.statusAffects.has(StatusAffectType.Infested) && player.torso.cocks.sort(Cock.LargestCockArea)[0].area >= 40 && player.torso.cocks.count > 0) {
        // (LUST)
        if (player.stats.lust > 99) {
            DisplayText("No amount of shame from the act of submitting to such a beast can overpower the furnace of lust raging in your loins.  ");
            if (player.stats.cor < 33) DisplayText("In spite of your revulsion ");
            else if (player.stats.cor < 66) DisplayText("In spite of your better sense ");
            else DisplayText("With a perverse sense of anticipation ");
            DisplayText("you remove your " + player.inventory.equipment.armor.displayName + " and roll onto your back, exposing your vulnerable groin to the beast.\n\n");
        }
        // (HP)
        else {
            DisplayText("Too wounded to stand, you drop down to all fours in order to keep yourself off the ground.   Too late you realize your mistake – the snarling beast is behind you and its razor-shark teeth easily sink into your " + player.inventory.equipment.armor.displayName + " before tearing it off, exposing your " + Desc.Butt.describeButt(player) + " and " + Desc.Cock.describeMultiCockShort(player) + ".  A cold mountain breeze blows across your now exposed " + player.skin.desc + ", reminding you just how utterly vulnerable you are to the alien lusts of this symbiotic monstrosity.  With a brutal lunge it knocks you off your " + Desc.Leg.describeFeet(player) + " and onto your back.\n\n");
        }
        if (player.torso.cocks.count > 1) {
            DisplayText("The infested hound repositions itself, blocking out the sun with its dark fur, leaving you with only the pale flames surrounding its fuzzy sack to look at.   The warm wetness of its smooth tongue starts sliding over ");
            DisplayText("each of your " + Desc.Cock.describeMultiCockShort(player) + ".  It feels good, better than it has any right to.  ");
            DisplayText("Every single one of your " + Desc.Cock.describeMultiCockShort(player) + " hardens under the stimulation, happy to be so well-treated.\n\n");

            DisplayText("Stopping its licking, the beast begins to shuffle forwards, pre-cum coated worms plopping out of its double-dicks onto your belly.  They crawl lamely around as the beast works to line itself up, though you're unsure what it could possibly be aiming for.  Your questions are answered as the slightly pointed tips of its twin members press forwards, bumping against the crowns of your own cocks.   It pushes forward with an intense sort of care, slowly forcing itself into your urethras, dribbling painfully hot cum directly into your cock-passages.\n\n");

            DisplayText("Gods, it's shoving its infected cocks up your urethras!  It's trying to infect you with those worms!  The dog-demon keeps pushing further and further, sliding deep inside you, the outline of its members easily visible through the skin of your " + Desc.Cock.describeMultiCockShort(player) + ".  It starts feeling good, the wriggling parasite-infested dicks begin sliding in and out, fucking your urethras in earnest and depositing their wormy cargo deep inside you.\n\n");

            DisplayText("Your ");
            if (player.torso.balls.quantity > 0) DisplayText(Desc.Balls.describeBalls(true, true, player) + " shiver as hot doggie-cum and wiggling worms are pumped directly into them.  ");
            else DisplayText("body feels uncomfortably full as hot doggie-cum and wriggling worms are pumped directly into your prostate.  ");
            DisplayText("Despite the strange freakishness of the situation, you find yourself getting off on having so many wriggling forms stuffed inside you.  The thickness of a large obstruction working its way down your urethra prevents your orgasm from taking you anywhere, but you feel the pleasure and pressure all the same.  Your body clenches and writhes under the beast, a helpless slave to the unholy pleasures being forced upon you.\n\n");

            DisplayText("The demonic dog backs away with what looks like a grin on its face after filling you with worms and boiling spooge, your urethras stretched and dripping with white squirming goop.  Pushed beyond your endurance, you start blacking out, your last thought a lamentation on how you'll be a carrier for these parasites, just like this demon-dog.");
        }
        else {
            DisplayText("The infested hound repositions itself, blocking out the sun with its dark fur, leaving you with only the pale flames surrounding its fuzzy sack to look at.   The warm wetness of its smooth tongue starts sliding over ");
            DisplayText("your " + Desc.Cock.describeMultiCockShort(player) + ".  It feels good, better than it has any right to.  ");
            DisplayText("Your " + Desc.Cock.describeMultiCockShort(player) + " hardens under the stimulation, happy to be so well-treated.\n\n");

            DisplayText("Stopping its licking, the beast begins to shuffle forwards, pre-cum coated worms plopping out of its double-dicks onto your belly.  They crawl lamely around as the beast works to line itself up, though you're unsure what it could possibly be aiming for.  Your questions are answered as the slightly pointed tip of one of its twin-members presses forward, bumping against your " + Desc.Cock.describeCockHead(player.torso.cocks.get(0)) + ".   It pushes forward with an intense sort of care, slowly forcing itself into your urethra, dribbling painfully hot cum directly into your cock-passage and dripping the stuff all over your groin.\n\n");

            DisplayText("Gods, it's shoving its infected cock up your urethra!  It's trying to infect you with those worms!  The dog-demon keeps pushing further and further, sliding deep inside you, the outline of its member easily visible through the skin of your " + Desc.Cock.describeMultiCockShort(player) + ".  It starts feeling good, the wriggling parasite-infested dick begins sliding in and out, fucking your urethra in earnest and depositing its wormy cargo deep inside you.\n\n");

            DisplayText("Your ");
            if (player.torso.balls.quantity > 0) DisplayText(Desc.Balls.describeBalls(true, true, player) + " shiver as hot doggie-cum and wiggling worms are pumped directly into them.");
            else DisplayText("body feels uncomfortably full as hot doggie-cum and wriggling worms are pumped directly into your prostate.");
            DisplayText("Despite the strange freakishness of the situation, you find yourself getting off on having so many moving forms stuffed inside you.  The thickness of a large obstruction working its way down your urethra prevents your orgasm from taking you anywhere, but you feel the pleasure and pressure all the same.  Your body clenches and writhes under the beast, a helpless slave to the unholy pleasures being forced upon you as the dog-demon's exposed member drops a huge worm into the wet puddle on your crotch.  You're horrified when you realize that a similar worm must be making its way inside you now.\n\n");

            DisplayText("The demonic dog backs away with what looks like a grin on its face after filling you with worms and boiling spooge, your urethra stretched and dripping with white squirming goop.  Pushed beyond your endurance, you start blacking out, your last thought a lamentation on how you'll be a carrier for these parasites, just like this demon-dog.");
        }
        // (+infested)
        player.statusAffects.add(StatusAffectType.Infested, 0, 0, 0, 0);
        player.orgasm();
        player.stats.lib += 1;
        player.stats.sens += 1;
        player.stats.cor += 1;
        player.cumMultiplier += .2;
        if (Flags.list[FlagEnum.EVER_INFESTED] === 0) {
            Flags.list[FlagEnum.EVER_INFESTED] = 1;
            if (player.stats.cor < 25) player.stats.cor = 25;
        }
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    // [HAS PUSSY AND NO DICK BIG ENOUGH TO BE INFECTED]
    else if (player.torso.vaginas.count > 0 && player.torso.cocks.sort(Cock.LargestCockArea)[0].area < 40 && player.torso.hips.legs.type !== LegType.NAGA) {
        // (LUST)
        if (player.stats.lust > 99) {
            DisplayText("No amount of shame from the act of submitting to such a beast can overpower the furnace of lust raging in your loins.  ");
            if (player.stats.cor < 33) DisplayText("In spite of your revulsion ");
            else if (player.stats.cor < 66) DisplayText("In spite of your better sense ");
            else DisplayText("With a perverse sense of anticipation ");
            DisplayText("you remove your " + player.inventory.equipment.armor.displayName + " and drop to all fours, mimicking what you think a dog would do.\n\n");
        }
        // (HP)
        else {
            DisplayText("Too wounded to stand, you drop down to all fours in order to keep yourself off the ground.   Too late you realize your mistake – the snarling beast is behind you and its razor-shark teeth easily sink into your " + player.inventory.equipment.armor.displayName + " before tearing it off, exposing your " + Desc.Butt.describeButt(player) + " and " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + ".  A cold mountain breeze blows across your now exposed " + player.skin.desc + ", reminding you just how utterly exposed you are to the alien lusts of this symbiotic monstrosity.\n\n");
        }
        DisplayText("The hell-hound rises up, looking nearly humanoid in shape for a moment before it drops down, planting its paws on your shoulders.  ");

        if (player.stats.cor < 66) DisplayText("You beg, \"<i>Please, no, no!  I don't want them... in me!</i>\"\n\n");
        else DisplayText("You start to beg it not to put them inside you, but your protests drop off when you realize how good they could feel squirming inside you.\n\n");

        DisplayText("The demon-dog tries to double-penetrate you all at once, but it isn't lined up properly, and all it manages to do is bump against your taint and drag its main member across your labia.   You gasp in pain, momentarily thankful not to be impaled by such bestial implements, but knowing all too well the brief reprieve will be over all too soon.   As if it can read your thoughts, the beast on top of you repositions itself and slams forward, this time managing to line its two dog-dicks up to your holes correctly.  The pair of them feel far larger than they looked, filling you with a painful suddenness that brings tears to your eyes.\n\n");
        DisplayText("Incredible heat radiates from the pair of rods inside you, making your whole body break out in a cold sweat in an attempt to deal with the situation.  You're rocked back and forth as the beast begins fucking you in earnest, slamming its fur-covered hips against your " + Desc.Butt.describeButt(player) + " with animalistic intensity.  Thankfully, the fucking isn't that painful, but the small mercy is ruined by the hot fluid you can feel starting to pour into you.\n\n");

        DisplayText("Oh gods no, you can feel something squirming inside you!  It's dripping worms into your intestines and pussy!   Its hot spittle drips onto your back as it ruts hard and fast, spurting and dripping a small portion of its wormy cargo inside you.  They're wriggling and squirming around, rubbing you in such an obscene way, bringing you closer and closer to orgasm in spite of the budding horror gnawing at your gut.   The beast on your back seems oblivious to it all, pushing more roughly into your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + " and " + Desc.Butt.describeButthole(player.torso.butt) + " with every stroke until with a burst of pressure, he manages to bottom out both of his throbbing, black fuck-sticks at once.\n\n");

        DisplayText("It's so wrong... but so hot.  He's filling you with them!  The fucking hell-mutt is cumming and plugging both your holes full of his parasitic cargo!  Gods, you're filled with wriggling worms, squirming and writhing against your tender cunt-walls and rectum.   You're getting fuller and fuller, and the spooge they're swimming in is so fucking hot it practically burns you.  You cum hard, clamping down on the invading members, and squealing with a mix of pain and pleasure, driven beyond rational thought by the absurdity and pleasure of the situation.\n\n");

        DisplayText("Unable to support yourself any longer, you collapse, your hips held up by the pair of demonic black dog-dicks lodged in your orifices.  They keep cumming and cumming, until your body takes a slow slide off to the ground.  Your eyes drift closed, lulled to sleep by the squirming warmth plugging both your holes.  ");
        Mod.Vagina.displayStretchVagina(player, monster.torso.cocks.get(0).area, true);
        DisplayText("  ");
        Mod.Butt.displayStretchButt(player, monster.torso.cocks.get(0).area, true);
        // (Status applied – worm plugged) –
        // random chance of big lust boost as worms evacuate
        // your body.  When worms leave they take with them up
        // to 5 fertility, to a minimum of 10.
        if (player.statusAffects.has(StatusAffectType.WormPlugged))
            player.statusAffects.get(StatusAffectType.WormPlugged).value1 = 1 + randInt(5);
        else
            player.statusAffects.add(StatusAffectType.WormPlugged, 1 + randInt(5));
        player.pregnancy.womb.knockUp(new Pregnancy(PregnancyType.WORM_STUFFED, 100 + player.statusAffects.get(StatusAffectType.WormPlugged).value1), 1, true); // Will be cleared when the WormPlugged effect ends
        player.orgasm();
        player.stats.lib += 1;
        player.stats.cor += 1;
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    // [GENDERLESS OR MALE WITH DICK TOO SMALL]
    else {
        // (LUST)
        if (player.stats.lust > 99) {
            DisplayText("No amount of shame from the act of submitting to such a beast can overpower the furnace of lust raging in your loins.  ");
            if (player.stats.cor < 33) DisplayText("In spite of your revulsion ");
            else if (player.stats.cor < 66) DisplayText("In spite of your better sense ");
            else DisplayText("With a perverse sense of anticipation ");
            DisplayText("you remove your " + player.inventory.equipment.armor.displayName + " and drop to your elbows, mimicking what you think a dog would do.\n\n");
        }
        // (HP)
        else {
            DisplayText("Too wounded to stand, you drop down to on your elbows in order to keep yourself off the ground.   Too late you realize your mistake – the snarling beast is behind you and its razor-shark teeth easily sink into your " + player.inventory.equipment.armor.displayName + " before tearing it off, exposing your " + Desc.Butt.describeButt(player) + ".  A cold mountain breeze blows across your now exposed " + player.skin.desc + ", reminding you just how utterly exposed you are to the alien lusts of this symbiotic monstrosity.\n\n");
        }
        DisplayText("The hell-hound rises up, looking nearly humanoid in shape for a moment before it drops down, planting its paws on your shoulders.  ");
        if (player.stats.cor < 80) DisplayText("You beg, \"<i>Please, no, no!  I don't want it... in me!</i>\"\n\n");
        else DisplayText("You start to beg it not to put it inside you, but your protests drop off when you realize how good they could feel squirming inside you.\n\n");

        DisplayText("The demon-dog tries to penetrate you all at once, but it isn't lined up properly, and all it manages to do is bump against your taint and rub its other dick on your back.   You gasp in pain, momentarily thankful not to be impaled by such a bestial implement, but knowing all too well the brief reprieve will be over all too soon.   As if it can read your thoughts, the demon-hound repositions itself and slams forward, this time managing to line its dog-dicks up with your " + Desc.Butt.describeButthole(player.torso.butt) + " correctly.  It feels far larger than it looked, filling you with a painful suddenness that brings tears to your eyes.\n\n");
        DisplayText("Incredible heat radiates from the thick black rod inside you, making your whole body break out in a cold sweat in an attempt to deal with the situation.  You're rocked back and forth as the beast begins fucking you in earnest, slamming its fur-covered hips against your " + Desc.Butt.describeButt(player) + " with animalistic intensity.  Thankfully, the fucking isn't that painful, but the small mercy is ruined by the hot fluid you can feel starting to pour into your " + Desc.Butt.describeButthole(player.torso.butt) + " and onto your back.\n\n");

        DisplayText("Oh gods no, you can feel something squirming inside you!  It's dripping worms into your intestines!   Its hot spittle and doggie-cum drips onto your back as it ruts hard and fast, spurting and dripping a small portion of its wormy cargo inside you.  They're wriggling and squirming around, rubbing you in such an obscene way, bringing you closer and closer to orgasm in spite of the budding horror gnawing at your gut.   The beast on your back seems oblivious to it all, pushing more roughly into your " + Desc.Butt.describeButthole(player.torso.butt) + " with every stroke until with a burst of pressure, he manages to bottom out his throbbing, black fuck-stick.\n\n");

        DisplayText("It's so wrong... but so hot.  He's filling you with them!  The fucking hell-mutt is cumming and plugging your hole full of his parasitic cargo while he paints your back with even more of them!  Gods, you're filled with wriggling worms, squirming and writhing against your rectum.   You're getting fuller and fuller, and the spooge they're swimming in is so fucking hot it practically burns you.  You cum hard, clamping down on the invading member, and squealing with a mix of pain and pleasure, driven beyond rational thought by the absurdity and pleasure of the situation.\n\n");

        DisplayText("Unable to support yourself any longer, you collapse, your hips held up by the demonic black dog-dick lodged in your orifice.  They keep cumming and cumming, until your body takes a slow slide off to the ground.  Your eyes drift closed, lulled to sleep by the squirming warmth plugging your " + Desc.Butt.describeButthole(player.torso.butt) + " and coating your back.");
        DisplayText("  ");
        Mod.Butt.displayStretchButt(player, monster.torso.cocks.get(0).area, true);
        player.orgasm();
        player.stats.lib += 1;
        player.stats.cor += 1;
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
}
