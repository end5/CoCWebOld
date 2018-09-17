import { DisplayText } from "../../../../Engine/display/DisplayText";
import { Character } from "../../../Character/Character";
import { Mod } from "../../../Modifiers/Modifiers";
import { Desc } from "../../../Descriptors/Descriptors";
import { Scenes } from "../../Scenes";
import { randInt } from "../../../../Engine/Utilities/SMath";
import { NextScreenChoices } from "../../../ScreenDisplay";
import { Time } from "../../../Utilities/Time";
import { ConsumableName } from "../../../Items/Consumables/ConsumableName";
import { Cock, CockType } from "../../../Body/Cock";
import { MonsterToPlayerTease } from "../../../Character/Player/CombatActions/MonsterToPlayerTease";
import { BreastRow } from "../../../Body/BreastRow";
import { Gender } from "../../../Body/GenderIdentity";
import { DisplaySprite } from "../../../../Engine/Display/DisplaySprite";
import { SpriteName } from "../../../../Engine/Display/Images/SpriteName";
import { CombatManager } from "../../../Combat/CombatManager";
import { Gnoll } from "./Gnoll";

/**
 * Created by aimozg on 03.01.14.
 */
// Gnoll Entrance
export function gnollEncounter(player: Character): NextScreenChoices {
    DisplaySprite(SpriteName.Gnoll_Club);
    DisplayText().clear();
    DisplayText("The sound of distant laughter comes across the plains, then seems to die off suddenly.  A moment later, a gnoll comes bounding from the nearest scrap of cover and barrels into you.  The monstrous thing giggles as it bounces back and forth before you, looking for an opening to exploit.");
    return CombatManager.beginBattle(player, [], [new Gnoll()]);
}

// Gnoll Rape
export function getRapedByGnoll(player: Character): NextScreenChoices {
    // Oh shit get anal raped.
    if (player.inventory.items.has(ConsumableName.SuccubisDelight)) {
        return yoDawgIHeardULiekGNollBallzzzdahdakjldh(player);
    }
    DisplayText().clear();
    DisplayText("The sound of the gnoll's mocking laughter grates in your ears as you collapse down on your knees before her.  She circles you with the last scrap of her wariness and then surges forward to knock you over, exposing your ");
    if (player.torso.cocks.count > 0) {
        DisplayText(Desc.Cock.describeMultiCockShort(player));
        if (player.torso.vaginas.count > 0) DisplayText(" and ");
    }
    if (player.torso.vaginas.count > 0) DisplayText(Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)));
    if (player.gender > 0) DisplayText(".  ");
    else DisplayText("flat, featureless groin.  ");
    //  (if cockTotal=0 AND vaginas=1)
    if (player.torso.cocks.count <= 0) {
        if (player.torso.vaginas.count > 0) {
            DisplayText("The gnoll looks a little disappointed at the void between your legs.  \"<i>Aw, I was hoping for something substantial,</i>\" she titters.  That doesn't stop her from hefting her engorged clit-dick and slapping its tip onto the entrance of your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + ".  With one jittery lurch forward, she shoves her clit up inside you, her pubic mound mashing up against your " + Desc.Vagina.describeClit(player) + ".");
            Mod.Vagina.displayStretchVagina(player, 9, true, true, false);
            DisplayText("\n\n");
        }
        // (if cockTotal=0 AND vaginas=0)
        else DisplayText("The gnoll actually stops laughing for a moment when she takes in your featureless crotch.  \"<i>Well.  That's a new one,</i>\" she mutters.  She then takes two bobbing steps up the length of your body and rudely shoves her thumb into your mouth.  Her other hand guides her giant clitoris in after it, and you are in no position to stop her.\n\n");
    }
    // (if cockTotal>0 AND
    if (player.torso.cocks.count > 0) {
        // thickestCock()>2")
        const thickestCock = player.torso.cocks.sort(Cock.ThickestCocks)[0];
        if (thickestCock.thickness > 2) {
            // (if cockTotal>1)
            if (player.torso.cocks.count > 1) DisplayText("The gnoll fishes into your " + Desc.Cock.describeMultiCockShort(player) + " and quickly snaps up the thickest one.  ");
            // (if cockTotal=1)
            else DisplayText("The gnoll's hands dart down to your crotch and grabs " + Desc.Cock.describeCock(player, player.torso.cocks.get(0)) + ".  ");
            DisplayText("\"<i>Yes, this will do nicely,</i>\" she says with relish, pumping your " + Desc.Cock.nounCock(thickestCock.type) + " until it plumps up, filling with blood.  She cantilevers her body over yours, knees bent sharply, and brings the tip of her massive clitoris up against the head of your dick.  The moment a dollop of pre forms at your urethra, her hips surge forward, sinking her giant clit down the length of your " + Desc.Cock.nounCock(thickestCock.type) + ".  ");
            DisplayText("You gasp at the feeling of her hot skin rippling down the interior of your dick, and all she can do is laugh as she plunges it deeper and deeper into you.\n\n");
        }
        // (if cockTotal>0 AND thickestCock()<2")
        else {
            // (if cockTotal>1)
            if (player.torso.cocks.count > 1) DisplayText("\"<i>This will have to do,</i>\" she says with the barest trace of disappointment as she grabs your thickest cock.  ");
            // (if cockTotal=1)
            else DisplayText("\"<i>This will have to do,</i>\" she says as she grabs your cock.  ");
            DisplayText("She runs her rough hand up and down its length until it begins to plump up.  She cantilevers her body over yours, knees bent sharply, and brings the tip of her massive clitoris up against the head of your dick.  The moment a dollop of pre forms at your urethra, her hips surge forward, sinking her giant clit down the length of your " + Desc.Cock.nounCock(thickestCock.type) + ".  ");
            DisplayText("You scream in pain as she forces her bizarre pseudo-penis down the length of your dick.  In horror, you watch as the bulge of her anatomy's invasion of yours slowly descends towards your ");
            if (player.torso.balls.quantity > 0) DisplayText("balls");
            else DisplayText("groin");
            DisplayText(".  All she can do is laugh as she plunges it deeper and deeper into you.\n\n");
            // (increase thickness of thickestCock())
            thickestCock.type += .25;
        }
    }
    DisplayText("In no time whatsoever she falls into an easy rhythm, pistoning her obscene girl-dick in and out of you.  At first, you can do little more than gurgle and squirm under the assault, but all too soon you feel the telltale signs of your own arousal building.  You find yourself moving in sympathy with her thrusts, at least as best you can given the circumstances.");
    // (if rating>C)
    if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 3) DisplayText("  Your " + Desc.Breast.describeAllBreasts(player) + " bounce up and down as the gnoll grinds her anatomy into yours, slick with sweat under the hot sun.  Your " + Desc.Breast.describeNipple(player, player.torso.chest.get(0)) + "s tighten and flush as your whole body submits to the rough fuck administered by the hyena girl.");
    // (if cockTotal>0)
    if (player.torso.cocks.count > 0) {
        DisplayText("  Your hips begin to buck as your orgasm builds, but the gnoll slams her hands down on your sides, pinning you to the hardscrabble ground.  \"<i>Best if you don't move too much, lover,</i>\" she laughs, even as she quickens her pace.  Immediately your ");
        if (player.torso.balls.quantity > 0) DisplayText(Desc.Balls.describeSack(player));
        else DisplayText("body");
        DisplayText(" seizes tighter and you can feel your cum churning inside you.\n\n");

        DisplayText("When you finally explode, the effect is strange but not uncomfortable.  You feel your hot seed surging up out of you, but then it seems to disappear just at the base of your dick.  Blearily you look down at your crotch and see that where your sensation ends is where the tip of her clitoris has penetrated.  You are pumping cum directly into her pseudo-penis.\n\n\"<i>That's it!</i>\" she giggles, bouncing up and down atop you.  \"<i>Give it to momma!  I'll suck the cum right out of you!</i>\"  Finally, just as your own orgasm is fading, the gnoll screams up at the empty sky, her giant clitoris lurching within the confines of your dick.\n\n");
    }
    // (if cockTotal<0)
    else {
        DisplayText("  You squirm in the dirt as your orgasm builds and the gnoll simply giggles.  Heat seems to flash across the length of your body, and then every muscle spasms and twitches all at once.  At the same time, the gnoll screams up at the empty sky, her giant clitoris lurching inside you.\n\n");
    }
    DisplayText("The hyena girl slumps against your body, but only for a moment.  Then she's suddenly up again, sliding her bizarre member out of you with an obscene slurp.  She leans down to pat your cheek and giggles, \"<i>Thanks, lover.</i>\"   Then she sprints off towards the horizon.");
    DisplayText("  A whimper bubbles up your throat and comes out as a half-giggle as you slump down unconscious.");
    player.orgasm();
    return { next: Scenes.camp.returnToCampUseOneHour };
}

export function defeatHyena(player: Character, monster: Character): NextScreenChoices {
    DisplayText().clear();
    let dickDownClit;
    // Gnoll Defeat (HP)
    if (monster.stats.HP < 1) DisplayText("The hyena girl collapses backwards onto the dusty ground, unable to continue the fight.");
    // Gnoll Defeat (Lust)
    else DisplayText("The hyena girl heaves a giant breath and takes a single step backwards.  Her club thumps to the ground and her hands fall to her shaft, stroking along its rough length.");

    // Do You Rape The Gnoll?
    if (player.stats.lust >= 33) {
        // (if cockTotal>0 AND vaginas=0)
        if (player.gender === Gender.MALE) {
            if (player.torso.cocks.find(Cock.CockThatFits(monster.vaginalCapacity()))) dickDownClit = dickDownGnollClit;
            DisplayText("  The gnoll is at your mercy.  What will you do with her?");
            // [DickDownClit] [DickInAss] [SuckHerClit] [Leave]
            return {
                choices: [
                    ["DickDownClit", dickDownClit],
                    ["DickInAss", dickInGnollAss],
                    ["SuckHerClit", suckGnollClit]
                ],
                persistantChoices: [["Leave", Scenes.camp.returnToCampUseOneHour]]
            };
        }
        // (if cockTotal>0 AND vaginas=1)
        else if (player.gender === Gender.HERM) {
            if (player.torso.cocks.find(Cock.CockThatFits(monster.vaginalCapacity()))) dickDownClit = dickDownGnollClit;
            DisplayText("  The gnoll is at your mercy.  What will you do with her?");
            // [DickDownClit] [DickInAss] [SuckHerClit] [TakeHerClit] [Leave]
            return {
                choices: [
                    ["DickDownClit", dickDownClit],
                    ["DickInAss", dickInGnollAss],
                    ["SuckHerClit", suckGnollClit],
                    ["TakeHerClit", takeGnollClit]
                ],
                persistantChoices: [["Leave", Scenes.camp.returnToCampUseOneHour]]
            };
        }
        // (if cockTotal=0 AND vaginas=1)
        else if (player.gender === Gender.FEMALE) {
            DisplayText("  The gnoll is at your mercy.  What will you do with her?");
            // [SuckHerClit] [TakeHerClit] [Leave]
            return {
                choices: [
                    ["SuckHerClit", suckGnollClit],
                    ["TakeHerClit", takeGnollClit],
                ],
                persistantChoices: [["Leave", Scenes.camp.returnToCampUseOneHour]]
            };
        }
        // (if cockTotal=0 AND vaginas=0)
        else {
            DisplayText("  The gnoll is at your mercy.  What will you do with her?");
            // [SuckHerClit] [Leave]
            return {
                choices: [
                    ["SuckHerClit", suckGnollClit],
                ],
                persistantChoices: [["Leave", Scenes.camp.returnToCampUseOneHour]]
            };
        }
    }
    else return { next: Scenes.camp.returnToCampUseOneHour };
}

// DickDownClit
function dickDownGnollClit(player: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText("This is not an opportunity you can pass up.  You roughly roll her onto her back and pull her long clit up to a vertical position.  She moans softly, and the rough skin beneath your fingers pulses as her arousal brings it harder and taller.  The end bloats larger, fuller, until finally it looks nearly wide enough.  You don't wait any further; you position the head of your dick against the end of hers and jam it inside.\n\n");
    DisplayText("Inch by inch, you sink your dick down into the warm tunnel of her monstrous clitoris.  The interior, you are happy to find, is not as rough as the exterior, and in fact is just slick enough to make your invasion possible.  After a few thrusts, you find it easiest to adopt a sort of reverse-cowgirl position, facing her feet as you roll your hips forward and shove more and more of your dick inside her.   Beneath you, the gnoll is clutching at the ground and making little submissive whimpers.\n\n");
    const longestCock = player.torso.cocks.sort(Cock.LongestCocks)[0];
    // (if torso.cocks.sort(Cock.LargestCockArea)[0].length>9)
    if (longestCock.length > 9) DisplayText("Finally you can feel your cockhead push free into a deeper, wetter place.  You look down at her strange anatomy, the entire length of her tube bulging thicker to accommodate your " + Desc.Cock.describeCock(player, longestCock) + ".  You've made it all the way to her vagina!\n\n");
    else DisplayText("Soon you feel the end of her clitoral tunnel butting up against your crotch.  You are as far in as you'll get.  You look down the length of her strange anatomy, the tube bulging thicker to accomodate your " + Desc.Cock.describeCock(player, longestCock) + ".  There are still inches between your cockhead and the end of her clit-dick.\n\n");

    DisplayText("Now you begin to roll your hips in a steady rhythm, running your dick up and down her long clitoral tunnel.  It's like the deepest, tightest cunt you've ever had, gripping every inch of you.");
    // (if balls>0)
    if (player.torso.balls.quantity > 0) DisplayText("  It doesn't take long before your " + Desc.Balls.describeBalls(true, true, player) + " begin twitching, pumping cum down the length of your encased cock.");
    DisplayText("  Your orgasm is quick and hard.  Your entire body seems to tremble under the hot sun and your thrusting doubles and then redoubles, stuffing your dick down hers like mad.\n\n");

    // (if cumQ()<25)
    if (player.cumQ() < 25) DisplayText("Your " + Desc.Cock.describeCock(player, longestCock) + " convulses, pumping down the length of her clitoris.  She squirms and howls beneath you, hissing for more.");
    // (if cumQ()>25 AND cumQ()<500)
    else if (player.cumQ() < 500) DisplayText("Your " + Desc.Cock.describeCock(player, longestCock) + " convulses, pumping cum into her.  Her clitoris bulges even more as the jism backs up.  The warm, wet, sticky insides swirl around your dick.");
    // (if cumQ()>500)
    else DisplayText("Your " + Desc.Cock.describeCock(player, longestCock) + " convulses, pouring cum into her.  Her clitoris bulges even more as the jism backs up, the skin pulling tight and shiny as the pressure builds.  Finally gouts of cum begin spurting back out the tip of her clitoris, splashing against your crotch.");
    DisplayText("  With a lusty groan, you pull out with a long, slippery sound, and leave the gnoll panting on the dusty ground.");
    player.orgasm();
    return { next: Scenes.camp.returnToCampUseOneHour };
}

// DickInAss
function dickInGnollAss(player: Character, monster: Character): NextScreenChoices {
    DisplayText().clear();
    const cocksThatFit = player.torso.cocks.filter(Cock.CocksThatFit(monster.analCapacity()));
    let x = cocksThatFit[0];
    if (!x) x = player.torso.cocks.get(0);
    const y = cocksThatFit[1];
    if (randInt(2) === 0) {
        DisplayText("The gnoll must be taught a lesson, but you're staying the hell away from her freaky anatomy.  You roughly roll her onto her belly and pull her lean ass up into the air.  You line up your " + Desc.Cock.describeCock(player, x) + " and ram it home into her tiny puckered entrance, eliciting a half-conscious gasp from the hyena girl.\n\n");
        // (if cockTotal>1)
        if (player.torso.cocks.count > 1 && x.area < monster.analCapacity() && y) {
            DisplayText("With a smirk, you pound away for a few minutes to get her loosened up.  Then you reach down and slap another " + Desc.Cock.nounCock(CockType.HUMAN) + " alongside the first.  With a grunt and a thrust, you shove both of them inside.");
            // (if cockTotal>2)
            if (player.torso.cocks.count > 2 && x.area + y.area < monster.analCapacity()) DisplayText("  A few thrusts more, and you slow again.  As you gather up your third cock, the gnoll whimpers quietly, fearing what she knows will come next.  You slowly push forward, sinking your rigid meat into her ass.  When all three are in, it's very slow going, but you don't let up.");
            // (if cockTotal>3)
            if (player.torso.cocks.count > 3 && player.torso.cocks.reduce(Cock.AverageCockArea, 0) < monster.analCapacity()) DisplayText("  From there it's some time before her anus is stretched wide enough for more.  By now you can feel your orgasm on the horizon, so you're less careful with your fourth " + Desc.Cock.describeCock(player, y) + ".  You slap it into the bundle of dicks and then ram it home.");
            // (if cockTotal>4)
            if (player.torso.cocks.count > 4 && player.torso.cocks.reduce(Cock.AverageCockArea, 0) < monster.analCapacity()) DisplayText("  And then the next.");
            // (if cockTotal>5)
            if (player.torso.cocks.count > 5 && player.torso.cocks.reduce(Cock.AverageCockArea, 0) < monster.analCapacity()) DisplayText("  And the next.");
            // (if cockTotal>6)
            if (player.torso.cocks.count > 6 && player.torso.cocks.reduce(Cock.AverageCockArea, 0) < monster.analCapacity()) DisplayText("  And the next, until all of your " + Desc.Cock.describeMultiCockShort(player) + " are inside her wide-spread ass.");
            DisplayText("\n\n");
        }

        DisplayText("\"<i>So how do you like it?</i>\" you grunt, \"<i>when a little too much is shoved up a hole that's a little too small?</i>\"  You pound away, hard and rough, until her cries turn into squeals and then into moans.  Finally, she simply passes out.  You slap your hips against her bony ass for a few more thrusts and cum, long and hard, into her rectum.\n\n");

        DisplayText("You let her slump to the ground, leaking your cum into the sun-caked ground, and head home.");
    }
    else {
        DisplayText("Your mind is made up; this gnoll needs to learn her place.  You eye her freakish pseudo-phallus for a moment, then shake your head, roughly grabbing her by the bony hips and flopping her onto her belly.  She lets out a little barking whine when you firmly smack her bony rear, lowering her chin to the ground and raising her hips submissively in recognition of your dominance.\n\n");

        DisplayText("You stroke your " + Desc.Cock.describeCock(player, x) + " eagerly, bringing yourself to full mast and squeezing out a few drops of pre to pool against her puckered anus, leaning over and adding a little bit of saliva for good measure.  Sliding your shaft between her flat ass cheeks, you make sure to get the tip nice and lubed up, then you drop her hips down and ram yourself home in one go.\n\n");

        DisplayText("The gnoll lets out a squeal that sounds halfway like a maniacal laugh, sliding forward in the dirt a little.  Your " + Desc.Cock.describeCock(player, x) + " throbs wonderfully, fully engulfed by the tight passage of the gnoll's anus");
        if (player.torso.cocks.count > 1) DisplayText(" while the remainder of your endowments slide along her bare buttocks");
        DisplayText(", and you begin to thrust forward and back, digging your fingers into her hips.\n\n");

        DisplayText("As the defeated gnoll resigns herself fully to her role as your willing cum dump, you decide to really take her for a ride, pulling yourself back until you are almost free of the tightness of her rectum, then dropping forward again until you impact her ass with your hips.  You pull yourself back and ram home again and again, feeling the gnoll's tight asshole loosen a little bit with each thrust.  The force with which you are pounding the poor savannah girl's rear has her odd endowments slapping up against her stomach with each thrust, and from the cackling moans issuing from her throat, you can only guess that she enjoys being dominated in some capacity.\n\n");

        DisplayText("Your hands slide further down her sides, and you bear down on her as you feel your climax building.  Increasing momentum, you piston into her ass with a desperate vigor, moaning your animalistic pleasure into her ear");
        if (player.cumQ() >= 500) DisplayText(" as your voluminous pre-cum turns her innards into a sloppy fuckhole");
        DisplayText(".\n\n");

        // (Low cumQ):
        if (player.cumQ() <= 250) {
            DisplayText("Pressing your fingertips into her sides, you let out a moan into the open air, spurting cum deep and hard into her warm rectum");
            if (player.torso.cocks.count > 1) {
                DisplayText(" while your other endowment");
                if (player.torso.cocks.count > 2) DisplayText("s soak");
                else DisplayText(" soaks");
                DisplayText(" her back and rear with a few sticky streams");
            }
            DisplayText(".  You pull out with an audible *schlick!*, and the gnoll slumps forward to the ground, panting a bit as she begins to shamelessly play with herself.\n\n");
        }
        // Med CumQ):
        else if (player.cumQ() <= 500) {
            DisplayText("Gripping her sides tightly, you let out a bellowing moan that echos through the grasslands, " + Desc.Cock.describeMultiCockSimpleOne(player) + " swelling noticeably as you pump thick ribbons of spunk into the gnoll's innards");
            if (player.torso.cocks.count > 1) DisplayText(", unleashing a torrent of semen that mats down the short fur on her back and rear as");
            DisplayText(".  The muscular ring of her anus bears down on your " + Desc.Cock.describeCock(player, x) + " as you pull out, making an audible *schlick!*, and the gnoll drops to the ground in exhaustion, shamelessly playing with herself in an effort to get off.\n\n");
        }
        // (High CumQ):
        else {
            DisplayText("You bear down on the limber hyena girl with all your force, groaning through clenched teeth as " + Desc.Cock.describeMultiCockSimpleOne(player) + " distends with the pressure of your virile load.  Her puckered anus stretches around the swell of your seed, and she lets out a shuddering, laughing moan as her belly begins to distend with your thick jism.  The involuntary spasms of her rectum milk your " + Desc.Cock.describeCock(player, x) + " for every drop, clenching your member tightly");
            if (player.torso.cocks.count > 1) {
                if (player.torso.cocks.count > 2) DisplayText(" while your remaining endowments soak her back thoroughly, covering her in a thick blanket of spunk");
                else DisplayText(" while your remaining endowment soaks her back thoroughly, covering her in a thick blanket of spunk");
            }
            DisplayText(".  Her anus makes an audible *schlick!* as you pull back, and the gnoll rolls off your member, cradling her gravid, cum-filled belly as she begins to shamelessly finger herself.\n\n");
        }
        DisplayText("Satisfied, you leave the gnoll to her pleasures, gather your " + player.inventory.equipment.armor.displayName + ", and head back to camp.");
    }
    player.orgasm();
    return { next: Scenes.camp.returnToCampUseOneHour };
}

// SuckHerClit
function suckGnollClit(player: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Since you first saw this strange anatomy, you knew it needed to be inside you.  You roughly roll her onto her back and pull her long clit up to a vertical position.  She moans softly, and the rough skin beneath your fingers pulses as her arousal brings it harder and taller.  The end bloats larger and fuller, until it might be too wide for your purposes.  Without losing any more time, you lean forward and stuff the clit's end into your mouth.\n\n");
    DisplayText("The gnoll yelps in surprise and then moans appreciatively as your mouth and tongue roam across her sensitive skin.  Her hips squirm against the hard-baked dirt, tentatively pushing her clit deeper into your mouth.\n\n");
    DisplayText("You're only too happy to oblige her, slowly and carefully swallowing the strange member down your throat.  Inch by inch you draw it deeper into yourself, eliciting increasing groans from the hyena girl.  Finally your nose buries itself in the rough, curly hair of her crotch, your chin rubbing up against the fake scrotum formed out of her distorted labia.\n\n");
    DisplayText("Her legs twitch around your ears as you continue to swallow, even though there is no more to go.  The muscles in your throat gently massage the length of the monstrous clitoris, which plumps even further as more blood rushes into it.  You can feel its tumescent bulk all down your throat and halfway into your chest.\n\n");
    DisplayText("The massive clit-dick then begins to flutter and twitch as the gnoll starts to cum.  Her feet stamp the ground to either side of you and she abruptly screams into the sky.  Her warbling cry then seems to collapse inward, and her entire body slumps to the ground, unconscious.\n\n");
    DisplayText("You leave her there on the sun-caked ground and head back to camp.");
    player.stats.lustNoResist = 100;
    return { next: Scenes.camp.returnToCampUseOneHour };
}

// TakeHerClit
function takeGnollClit(player: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText("You roughly roll her onto her back and pull her long clit up to a vertical position.  She moans softly, and the rough skin beneath your fingers pulses as her arousal brings it harder and taller.  The end bloats larger, fuller, until it might be too wide for your purposes.  You line up your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + " and lower yourself onto the long, narrow faux-cock.");
    Mod.Vagina.displayStretchVagina(player, 9, true, true, false);
    DisplayText("\n\n");
    DisplayText("It slithers up your love canal with alacrity, and you quickly find yourself sitting on the gnoll's haunches.  You pump your hips up and down, relishing the feel of the thin spike slipping around within you.  This was not, however, what her anatomy was designed to do, and you can feel her monstrous clitoris flagging within you, collapsing down and denying you your well-deserved fucking.\n\n");
    DisplayText("\"<i>Hey!</i>\" you shout, and reach forward to slap the gnoll across the face.  Abruptly the clit-dick hardens inside you, even as the girl's face registers little response.  With a smirk, you try it again.  A second hard slap brings the hyena's pseudocock ramrod straight up inside you, and you roll your hips atop her appreciatively.\n\n");
    DisplayText("Every few strokes, the fake dick starts to fail you and you reach forward to slap her again.  Pump pump slap.  Thrust thrust smack.  Grunt grunt slap.  By the time your body rises up to the quivering summit of orgasm, the gnoll's face is purple with bruises.  You scream your orgasm to the sky, bearing down hard on her hollow clitoris, and come hard enough that you see stars.\n\n");
    DisplayText("When you can get your feet under yourself again, you stand up, letting the now-shrunken clitoris fall out of your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + " with a wet plop.  You leave her there on the sun-caked ground and head back to camp.");
    player.orgasm();
    return { next: Scenes.camp.returnToCampUseOneHour };
}

function yoDawgIHeardULiekGNollBallzzzdahdakjldh(player: Character): NextScreenChoices {
    DisplayText().clear();
    player.inventory.items.consumeItem(ConsumableName.SuccubisDelight);
    // [either Gnoll loss, if the player has a succubi's dream in inventory]

    DisplayText("A rolling, harsh laughter surrounds you as you sink to ground, no longer strong enough to remain upright.  The gnoll's mocking bark fills the air as she disposes of your " + player.inventory.equipment.armor.displayName);
    if (player.inventory.equipment.weapon.displayname !== "fists") DisplayText(" and " + player.inventory.equipment.weapon.displayname);
    DisplayText(" with rough motions, the soft pads of her paw-like hands coarsely grasping your " + Desc.Hip.describeHips(player) + " as much to grope as to strip you.  As she knocks your belongings aside, a small, bulbous bottle rolls out of your pouches, the lurid white fluid sloshing inside like an alabaster stain against the dull browns and greens of the plains.  The hyena-girl pauses in her eagerness to taste the spoils of victory, regarding the stray vial doubtfully.  Her lips curl into a sneer that approaches a smile and she stoops down to retrieve the creamy flask.  Through the panting haze obscuring your vision, you can make out the murky whorls of curious thickness in the cum-colored elixir and you realize that the amazon has found your Succubi's Dream.\n\n");

    DisplayText("You try to protest the theft, but she casually snaps her leg into a kick that jerks your chin up and the ground rushes to meet the back of your head, white pain exploding before your eyes.  \"<i>All that you have and all that you are belongs to me,</i>\" the hyena-woman snarls.  \"<i>I will take what tribute I see fit.</i>\"  Laughing again, she flicks the cork from your potion and sniffs the concoction with renewed interest.  Her nostrils crinkle at the scent, but she locks her gaze to yours and, in an aggressive, unblinking gesture, throws her head back to swallow the curiously thick ivory fluid.  Discarding the empty glass, she licks her lips as if the refreshingly cool cream merely inflamed a different sort of thirst.\n\n");

    DisplayText("The amazon takes another step toward you before jerking back with a choking gasp.  Her stance drooping, knees clenched together, the hyena-girl wraps her hands between the inside of her trembling thighs.  The tattered loincloth hanging from her hips pokes outward, rising as it is gradually pushed aside by the monster beneath.  She flicks the rough leather aside with a spotted paw to expose the engorged onyx pillar throbbing between her legs.  Rising from a thin sheath, the 15 inch clit stands atop her molted pussy like a crown-less cock, bulging veins marring its obsidian-smooth surface as it pulses with the girl's quickening heartbeat.  She sways, seemingly weakened by the lascivious lust boiling inside her, bringing a deep purple hue to her cheeks as she flushes half with embarrassment and half with need.\n\n");

    DisplayText("\"<i>What... what have you poisoned me with?</i>\" she gasps, staggering to her knees.  Catching herself, the gnoll pulls her hands away from her crotch, revealing the effects of the Succubi's Dream.  A pair of huge, apple-sized testicles sway under her throbbing pussy lips, covered in a fine chocolate fuzz that glistens from the honey that leaks from her over-stimulated cunt.  The hyena's balls hang heavily from her groin, achingly filled with seed that she has no way of emptying.  \"<i>What is this?</i>\" she demands, her voice frantic with seething, unfamiliar urges.  \"<i>I don't... I can't...</i>\" She stumbles to all fours, her hips impotently bucking at the air, as her eyes cloud over, mouth hanging open in the primal need to mate.\n\n");
    // [NEXT]
    return { next: yoDawgHyenaBallz2 };
}

function yoDawgHyenaBallz2(player: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Using the distraction, you roll onto your belly, crawling towards your " + player.inventory.equipment.armor.displayName + ", hoping to use the distraction to make an escape.  Baring your " + Desc.Butt.describeButt(player) + ", however, proves to be a mistake, as the gnoll fixates on the wobbling orbs, lunging desperately.  She lands atop you, her paws pinning your head and shoulders to the ground as the warmth of her impatient shaft slides between your cheeks, her new scrotum slapping wetly against ");
    if (player.torso.balls.quantity > 0) DisplayText("your own " + Desc.Balls.describeBalls(true, true, player));
    else DisplayText("your sweat-slick thighs");
    DisplayText(".  The amazon wastes no time, guiding her monstrous clit to your " + Desc.Butt.describeButthole(player.torso.butt) + " with gasping pleasure, thrusting the barrel-like pseudo-cock deeply inside your nethers, drawing a cry of penetration from your lips.  The plush interior of your anus parts before her energized clitoris, her cunt flowing with warm lubrication so heavily that its deluge inundates your bowels like a flood of pre-cum.");
    Mod.Butt.displayStretchButt(player, 30, true, true, false);
    DisplayText("\n\n");

    DisplayText("Roughly, she bucks against your hips, pushing your face against the grass and dirt, moving with relentless speed as she fucks you with every ounce of strength in her well-toned body.  She snarls and cries out, even laughing with a mad desperation, as she plunges her rock-hard joy buzzer into your loins trying to achieve release.  Your struggles are useless against the rutting passion of the hyena-girl, who uses you like a beast in heat.  In mere minutes, her body seizes, muscles straining with the blissful throes of imminent orgasm and you whisper a prayer that she'll be done shortly.  Gnashing her teeth, she hooks both spotted paws around your shoulders and drives her jet-black member into the velvet folds of your clenching asshole, her sweltering cunny gushing with her girl-cum.\n\n");

    DisplayText("Her bucking pauses for a split-second and you can feel her fuzzy balls throbbing against your " + Desc.Butt.describeButt(player) + ", the stimulation of her fucking filling them with fresh loads, eager to spill into your violated hole.  But, without a passage to let loose the torrent of her sperm with, the gnoll's balls merely swell with unspent passion, lewdly quivering against");
    if (player.torso.balls.quantity > 0) DisplayText(" your distended sac, ballooning with the fatigued flood of the prostate-milking the girl is giving you");
    else DisplayText(" your sore loins, soaked with the slimy river of the girl's excitement");
    DisplayText(".  \"<i>N-no! I can't... quite... arg!</i>\" She trembles, unable to cum, before mindlessly starting anew, pistoning into your " + Desc.Butt.describeButthole(player.torso.butt) + " with renewed vigor.  \"<i>I just! Have to! Fucking! Cum!</i>\" she grunts from between clenched teeth as she slams into you, the waterfall of lubrication from her pussy soaking your " + Desc.Skin.skinFurScales(player) + " as she wetly slaps her hips into yours in her increasingly desperate assault.\n\n");

    DisplayText("Again and again, she rushes toward a release, and every time, her balls slosh with overflowing lust, unable to climax yet urging her to greater depravity until even words are too difficult to manage.  Your ravaged body aches under the endless rape.  It's all you can do to work your hands under your hips to masturbate in the blissful pauses while the gnoll's muscles clench in near orgasm, before she slams you back to the dirt for another round.  You lose track of time as your world narrows to the endlessly thrusting shaft of the hyena-girl's massive clitoris and the merciless weight of her ball-slapping, spunk-swollen pouch. Every time you climax, it fuels her mad frenzy until you silently beg your body to shut out the overwhelming sensations, to no avail.  Day fades into night and night into day as the amazon fucks your spasming, shuddering pucker without thought, or pity, or release.\n\n");
    // [NEXT]
    Time.hour = 7;
    Time.day++;
    return { next: yoDawgHyenaBallz3 };
}

function yoDawgHyenaBallz3(player: Character): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Finally, you feel the gnoll's clit slide out of your anus as the overly-endowed girl collapses at your side.  Broken utterly, she pants with depraved exhaustion, no strength left to continue pounding your body into the dirt.  Even now, she strokes her massive clit with one spotted paw as the other helplessly massages the basketball-sized testicles that audibly churn with gallons of the girl's jizz.  Finding a reserve of strength you didn't know you had, you rise tenderly and gather your belongings, creeping away before the hyena-girl can get her second wind.");
    // [24 hours pass, player asshole size increased, sensitivity significantly lowered, toughness lowered temporarily, fatigue maxed, remove one succubi's dream]
    player.orgasm();
    player.stats.lib += 2;
    player.stats.sens += -10;
    return { next: Scenes.camp.returnToCampUseOneHour };
}

/*
--------------------

Hyena Spot Long Description
A patch of what appears to be hyena fur, with a large black spot in its center.  There's no hide backing to the fur; there's no discernable reason the clump of fur stays together at all.

Hyena Spot Consume
You fumble with the patch of fur for a moment, then rub it across your skin.  It flakes and sheds as you go, until finally it dissolves away into nothing.  Beneath your skin it feels as if the hot sun has baked into your flesh.

Hyena Spot Effect #1
(if clitLength>0)
The spot's heat seems to focus on your crotch.  Your scalding clit seems to spill out of your vulva, lengthening at least half an inch.
(increase clitLength)

Hyena Spot Effect #2
(if hips.rating>0)
You cry out as your pelvis suddenly cave inward, crumpling narrower at the top of your legs to form " + Desc.Hip.describeHips(player)
(decrease hips.rating)

Hyena Spot Effect #3
(if buttRating>0)
You seem to bounce on your feet as you drop a few pounds in your rear.  With your new, light " + Desc.Butt.describeButt(player) + ", you feel like you can fly across the plains.
(decrease buttRating)

Hyena Spot Effect #4
Your muscles seem to quiver underneath your " + skinDescript() + ", growing leaner and quicker.
(increase Speed)

Hyena Spot Effect #5
(if skin =/= spotted fur)
The warmth rippling under your skin seems to erupt back outwards, pushing out a pelt of rough, tawny fur.  Black spots blossom across your shoulders and back.  You have hyena fur!
(set skin to hyena fur)

Hyena Spot Effect #6
(if Tone<90)
The warm swirls around inside your body, seeming to melt away fat deposits wherever they lie.  Your body takes on a much leaner, toned appearance.
(increase Tone)
*/
