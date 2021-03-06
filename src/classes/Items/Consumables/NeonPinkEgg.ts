import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import BreastRow from '../../Body/BreastRow';
import { EarType } from '../../Body/Ears';
import { FaceType } from '../../Body/Face';
import { LegType } from '../../Body/Legs';
import { PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import Character from '../../Character/Character';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BodyDescriptor from '../../Descriptors/BodyDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import FaceDescriptor from '../../Descriptors/FaceDescriptor';
import GenderDescriptor from '../../Descriptors/GenderDescriptor';
import LegDescriptor from '../../Descriptors/LegDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import BodyModifier from '../../Modifiers/BodyModifier';
import RaceScore from '../../RaceScore';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class NeonPinkEgg extends Consumable {
    public constructor(pregnantChange: boolean) {
        if (pregnantChange)
            super(ConsumableName.NeonPinkEggPreg, new ItemDesc("NPnkEggPreg", "a neon pink egg", "This is an oblong egg with an unnatural neon pink coloration.  It tingles in your hand with odd energies that make you feel as if you could jump straight into the sky."));
        else
            super(ConsumableName.NeonPinkEgg, new ItemDesc("NPnkEgg", "a neon pink egg", "This is an oblong egg with an unnatural neon pink coloration.  It tingles in your hand with odd energies that make you feel as if you could jump straight into the sky."));
    }

    public use(character: Character) {
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(2) === 0) changeLimit++;
        if (character.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        // If this is a pregnancy change, only 1 change per proc.
        if (this.name === ConsumableName.NeonPinkEggPreg) changeLimit = 1;
        else DisplayText().clear();
        // If not pregnancy, mention eating it.
        if (this.name !== ConsumableName.NeonPinkEggPreg) DisplayText("You eat the neon pink egg, and to your delight it tastes sweet, like candy.  In seconds you've gobbled down the entire thing, and you lick your fingers clean before you realize you ate the shell - and it still tasted like candy.");
        // If pregnancy, warning!
        if (this.name === ConsumableName.NeonPinkEggPreg) {
            DisplayText("\n<b>Your egg-stuffed ");
            const hasEggFilledVagina = character.pregnancy.womb.isPregnantWith(PregnancyType.BUNNY);
            const hasEggFilledButt = character.pregnancy.buttWomb.isPregnantWith(PregnancyType.BUNNY);
            if (hasEggFilledVagina) {
                DisplayText("womb ");
                if (hasEggFilledButt)
                    DisplayText("and ");
            }

            if (hasEggFilledButt) DisplayText("backdoor ");
            if (hasEggFilledButt && hasEggFilledVagina) DisplayText("rumble");
            else DisplayText("rumbles");
            DisplayText(" oddly, and you have a hunch that something's about to change</b>.");
        }
        // STATS CHANGURYUUUUU
        // Boost speed (max 80!)
        if (changes < changeLimit && Utils.rand(3) === 0 && character.stats.spe < 80) {
            if (character.stats.spe < 30) DisplayText("\n\nTingles run through your muscles, and your next few movements seem unexpectedly fast.  The egg somehow made you faster!");
            else if (character.stats.spe < 50) DisplayText("\n\nYou feel tingles running through your body, and after a moment, it's clear that you're getting faster.");
            else if (character.stats.spe < 65) DisplayText("\n\nThe tight, ready feeling you've grown accustomed to seems to intensify, and you know in the back of your mind that you've become even faster.");
            else DisplayText("\n\nSomething changes in your physique, and you grunt, chopping an arm through the air experimentally.  You seem to move even faster than before, confirming your suspicions.");
            changes++;
            if (character.stats.spe < 35) character.stats.spe += 1;
            character.stats.spe += 1;
        }
        // Boost libido
        if (changes < changeLimit && Utils.rand(5) === 0) {
            changes++;
            character.stats.lib += 1;
            character.stats.lust += 5 + character.stats.lib / 7;
            if (character.stats.lib < 30) character.stats.lib += 1;
            if (character.stats.lib < 40) character.stats.lib += 1;
            if (character.stats.lib < 60) character.stats.lib += 1;
            // Lower ones are gender specific for some reason
            if (character.stats.lib < 60) {
                // (Cunts or assholes!
                if (character.torso.cocks.count <= 0 || (character.gender === 3 && Utils.rand(2) === 0)) {
                    if (character.stats.lib < 30) {
                        DisplayText("\n\nYou squirm a little and find your eyes glancing down to your groin.  Strange thoughts jump to mind, wondering how it would feel to breed until you're swollen and pregnant.  ");
                        if (character.stats.cor < 25) DisplayText("You're repulsed by such shameful thoughts.");
                        else if (character.stats.cor < 60) DisplayText("You worry that this place is really getting to you.");
                        else if (character.stats.cor < 90) DisplayText("You pant a little and wonder where the nearest fertile male is.");
                        else DisplayText("You grunt and groan with desire and disappointment.  You should get bred soon!");
                    }
                    else DisplayText("\n\nYour mouth rolls open as you start to pant with desire.  Did it get hotter?  Your hand reaches down to your " + BodyDescriptor.assholeOrPussy(character) + ", and you're struck by just how empty it feels.  The desire to be filled, not by a hand or a finger but by a virile male, rolls through you like a wave, steadily increasing your desire for sex.");
                }
                // WANGS!
                if (character.torso.cocks.count > 0) {
                    if (character.stats.lib < 30) {
                        DisplayText("\n\nYou squirm a little and find your eyes glancing down to your groin.  Strange thoughts jump to mind, wondering how it would feel to fuck a ");
                        if (Utils.rand(2) === 0) DisplayText("female hare until she's immobilized by all her eggs");
                        else DisplayText("herm rabbit until her sack is so swollen that she's forced to masturbate over and over again just to regain mobility");
                        DisplayText(". ");
                        if (character.stats.cor < 25) DisplayText("You're repulsed by such shameful thoughts.");
                        else if (character.stats.cor < 50) DisplayText("You worry that this place is really getting to you.");
                        else if (character.stats.cor < 75) DisplayText("You pant a little and wonder where the nearest fertile female is.");
                        else DisplayText("You grunt and groan with desire and disappointment.  Gods you need to fuck!");
                    }
                    else DisplayText("\n\nYour mouth rolls open as you start to pant with desire.  Did it get hotter?  Your hand reaches down to " + CockDescriptor.describeMultiCockSimpleOne(character) + ", and you groan from how tight and hard it feels.  The desire to squeeze it, not with your hand but with a tight pussy or puckered asshole, runs through you like a wave, steadily increasing your desire for sex.");
                }
            }
            // Libido over 60? FUCK YEAH!
            else if (character.stats.lib < 80) {
                DisplayText("\n\nYou fan your neck and start to pant as your " + character.skin.tone + " skin begins to flush red with heat");
                if (character.skin.type > SkinType.PLAIN) DisplayText(" through your " + character.skin.desc);
                DisplayText(".  ");
                if (character.gender === 1) DisplayText("Compression tightens down on " + CockDescriptor.describeMultiCockSimpleOne(character) + " as it strains against your " + character.inventory.equipment.armor.displayName + ".  You struggle to fight down your heightened libido, but it's hard - so very hard.");
                else if (character.gender === 0) DisplayText("Sexual hunger seems to gnaw at your " + ButtDescriptor.describeButthole(character.torso.butt) + ", demanding it be filled, but you try to resist your heightened libido.  It's so very, very hard.");
                else if (character.gender === 2) DisplayText("Moisture grows between your rapidly-engorging vulva, making you squish and squirm as you try to fight down your heightened libido, but it's hard - so very hard.");
                else DisplayText("Steamy moisture and tight compression war for your awareness in your groin as " + CockDescriptor.describeMultiCockSimpleOne(character) + " starts to strain against your " + character.inventory.equipment.armor.displayName + ".  Your vulva engorges with blood, growing slicker and wetter.  You try so hard to fight down your heightened libido, but it's so very, very hard.  The urge to breed lingers in your mind, threatening to rear its ugly head.");
            }
            // MEGALIBIDO
            else {
                DisplayText("\n\nDelicious, unquenchable desire rises higher and higher inside you, until you're having trouble tamping it down all the time.  A little, nagging voice questions why you would ever want to tamp it down.  It feels so good to give in and breed that you nearly cave to the delicious idea on the spot.  Life is beginning to look increasingly like constant fucking or masturbating in a lust-induced haze, and you're having a harder and harder time finding fault with it.  ");
                if (character.stats.cor < 33) DisplayText("You sigh, trying not to give in completely.");
                else if (character.stats.cor < 66) DisplayText("You pant and groan, not sure how long you'll even want to resist.");
                else {
                    DisplayText("You smile and wonder if you can ");
                    if (character.stats.lib < 100) DisplayText("get your libido even higher.");
                    else DisplayText("find someone to fuck right now.");
                }
            }
        }
        // BIG sensitivity gains to 60.
        if (character.stats.sens < 60 && changes < changeLimit && Utils.rand(3) === 0) {
            changes++;
            DisplayText("\n\n");
            // (low)
            if (Utils.rand(3) !== 2) {
                DisplayText("The feeling of small breezes blowing over your " + character.skin.desc + " gets a little bit stronger.  How strange.  You pinch yourself and nearly jump when it hurts a tad more than you'd think. You've gotten more sensitive!");
                character.stats.sens += 5;
            }
            // (BIG boost 1/3 chance)
            else {
                character.stats.sens += 15;
                DisplayText("Every movement of your body seems to bring heightened waves of sensation that make you woozy.  Your " + character.inventory.equipment.armor.displayName + " rubs your " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + "s deliciously");
                if (character.torso.chest.filter(BreastRow.FuckableNipples).length > 0) {
                    DisplayText(", sticking to the ");
                    if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 2) DisplayText("milk-leaking nipple-twats");
                    else DisplayText("slippery nipple-twats");
                }
                else if (character.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 2) DisplayText(", sliding over the milk-leaking teats with ease");
                else DisplayText(" catching on each of the hard nubs repeatedly");
                DisplayText(".  Meanwhile, your crotch... your crotch is filled with such heavenly sensations from ");
                if (character.gender === 1) {
                    DisplayText(CockDescriptor.describeMultiCockSimpleOne(character) + " and your ");
                    if (character.torso.balls.quantity > 0) DisplayText(BallsDescriptor.describeBalls(true, true, character));
                    else DisplayText(ButtDescriptor.describeButthole(character.torso.butt));
                }
                else if (character.gender === 2) DisplayText("your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " and " + VaginaDescriptor.describeClit(character));
                else if (character.gender === 3) {
                    DisplayText(CockDescriptor.describeMultiCockSimpleOne(character) + ", ");
                    if (character.torso.balls.quantity > 0) DisplayText(BallsDescriptor.describeBalls(true, true, character) + ", ");
                    DisplayText(VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + ", and " + VaginaDescriptor.describeClit(character));
                }
                // oh god genderless
                else DisplayText("you " + ButtDescriptor.describeButthole(character.torso.butt));
                DisplayText(" that you have to stay stock-still to keep yourself from falling down and masturbating on the spot.  Thankfully the orgy of tactile bliss fades after a minute, but you still feel way more sensitive than your previous norm.  This will take some getting used to!");
            }
        }
        // Makes girls very girl(90), guys somewhat girly (61).
        if (changes < changeLimit && Utils.rand(2) === 0) {
            let buffer: string = "";
            if (character.gender < 2) buffer += BodyModifier.displayModFem(character, 61, 4);
            else buffer += BodyModifier.displayModFem(character, 90, 4);
            if (buffer !== "") {
                DisplayText(buffer);
                changes++;
            }
        }

        // De-wettification of cunt (down to 3?)!
        if (character.torso.vaginas.get(0).wetness > 3 && changes < changeLimit && Utils.rand(3) === 0) {
            // Just to be safe
            if (character.torso.vaginas.count > 0) {
                DisplayText("\n\nThe constant flow of fluids that sluice from your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " slow down, leaving you feeling a bit less like a sexual slip-'n-slide.");
                character.torso.vaginas.get(0).wetness--;
                changes++;
            }
        }
        // Fertility boost!
        if (changes < changeLimit && Utils.rand(4) === 0 && character.fertility < 50 && character.torso.vaginas.count > 0) {
            character.fertility += 2 + Utils.rand(5);
            changes++;
            DisplayText("\n\nYou feel strange.  Fertile... somehow.  You don't know how else to think of it, but you know your body is just aching to be pregnant and give birth.");
        }
        // -VAGs
        if (character.torso.vaginas.count > 0 && !character.perks.has(PerkType.BunnyEggs) && changes < changeLimit && Utils.rand(4) === 0 && RaceScore.bunnyScore(character) > 3) {
            DisplayText("\n\nDeep inside yourself there is a change.  It makes you feel a little woozy, but passes quickly.  Beyond that, you aren't sure exactly what just happened, but you are sure it originated from your womb.\n\n");
            DisplayText("(<b>Perk Gained: Bunny Eggs</b>)");
            character.perks.add(PerkType.BunnyEggs, 0, 0, 0, 0);
            changes++;
        }
        // Shrink Balls!
        if (character.torso.balls.quantity > 0 && character.torso.balls.size > 5 && Utils.rand(3) === 0 && changes < changeLimit) {
            if (character.torso.balls.size < 10) {
                DisplayText("\n\nRelief washes through your groin as your " + BallsDescriptor.describeBalls(false, true, character, true) + " lose about an inch of their diameter.");
                character.torso.balls.size--;
            }
            else if (character.torso.balls.size < 25) {
                DisplayText("\n\nRelief washes through your groin as your " + BallsDescriptor.describeBalls(false, true, character, true) + " lose a few inches of their diameter.  Wow, it feels so much easier to move!");
                character.torso.balls.size -= (2 + Utils.rand(3));
            }
            else {
                DisplayText("\n\nRelief washes through your groin as your " + BallsDescriptor.describeBalls(false, true, character, true) + " lose at least six inches of diameter.  Wow, it feels SOOOO much easier to move!");
                character.torso.balls.size -= (6 + Utils.rand(3));
            }
            changes++;
        }
        // Get rid of extra balls
        if (character.torso.balls.quantity > 2 && changes < changeLimit && Utils.rand(3) === 0) {
            changes++;
            DisplayText("\n\nThere's a tightening in your " + BallsDescriptor.describeSack(character) + " that only gets higher and higher until you're doubled over and wheezing.  When it passes, you reach down and discover that <b>two of your testicles are gone.</b>");
            character.torso.balls.quantity -= 2;
        }
        // Boost cum production
        if ((character.torso.balls.quantity > 0 || character.torso.cocks.count > 0) && character.cumQ() < 3000 && Utils.rand(3) === 0 && changeLimit > 1) {
            changes++;
            character.cumMultiplier += 3 + Utils.rand(7);
            if (character.cumQ() >= 250) character.stats.lust += 3;
            if (character.cumQ() >= 750) character.stats.lust += 4;
            if (character.cumQ() >= 2000) character.stats.lust += 5;
            // Balls
            if (character.torso.balls.quantity > 0) {
                // (Small cum quantity) < 50
                if (character.cumQ() < 50) DisplayText("\n\nA twinge of discomfort runs through your " + BallsDescriptor.describeBalls(true, true, character) + ", but quickly vanishes.  You heft your orbs but they haven't changed in size - they just feel a little bit denser.");
                // (medium cum quantity) < 250
                else if (character.cumQ() < 250) {
                    DisplayText("\n\nA ripple of discomfort runs through your " + BallsDescriptor.describeBalls(true, true, character) + ", but it fades into a pleasant tingling.  You reach down to heft the orbs experimentally but they don't seem any larger.");
                    if (character.torso.cocks.count > 0) DisplayText("  In the process, you brush " + CockDescriptor.describeMultiCockSimpleOne(character) + " and discover a bead of pre leaking at the tip.");
                }
                // (large cum quantity) < 750
                else if (character.cumQ() < 750) {
                    DisplayText("\n\nA strong contraction passes through your " + BallsDescriptor.describeSack(character) + ", almost painful in its intensity.  ");
                    if (character.torso.cocks.count > 0) DisplayText(CockDescriptor.describeMultiCockSimpleOne(character, true) + " leaks and dribbles pre-cum down your " + LegDescriptor.describeLegs(character) + " as your body's cum production kicks up even higher.");
                    else DisplayText("You wince, feeling pent up and yet unable to release.  You really wish you had a cock right about now.");
                }
                // (XL cum quantity) < 2000
                else if (character.cumQ() < 2000) {
                    DisplayText("\n\nAn orgasmic contraction wracks your " + BallsDescriptor.describeBalls(true, true, character) + ", shivering through the potent orbs and passing as quickly as it came.  ");
                    if (character.torso.cocks.count > 0) DisplayText("A thick trail of slime leaks from " + CockDescriptor.describeMultiCockSimpleOne(character) + " down your " + LegDescriptor.describeLeg(character) + ", pooling below you.");
                    else DisplayText("You grunt, feeling terribly pent-up and needing to release.  Maybe you should get a penis to go with these balls...");
                    DisplayText("  It's quite obvious that your cum production has gone up again.");
                }
                // (XXL cum quantity)
                else {
                    DisplayText("\n\nA body-wrenching contraction thrums through your " + BallsDescriptor.describeBalls(true, true, character) + ", bringing with it the orgasmic feeling of your body kicking into cum-production overdrive.  ");
                    if (character.torso.cocks.count > 0) DisplayText("pre-cum explodes from " + CockDescriptor.describeMultiCockSimpleOne(character) + ", running down your " + LegDescriptor.describeLeg(character) + " and splattering into puddles that would shame the orgasms of lesser " + GenderDescriptor.mf(character, "males", "persons") + ".  You rub yourself a few times, nearly starting to masturbate on the spot, but you control yourself and refrain for now.");
                    else DisplayText("You pant and groan but the pleasure just turns to pain.  You're so backed up - if only you had some way to vent all your seed!");
                }
            }
            // NO BALLZ (guaranteed cock tho)
            else {
                // (Small cum quantity) < 50
                if (character.cumQ() < 50) DisplayText("\n\nA twinge of discomfort runs through your body, but passes before you have any chance to figure out exactly what it did.");
                // (Medium cum quantity) < 250)
                else if (character.cumQ() < 250) DisplayText("\n\nA ripple of discomfort runs through your body, but it fades into a pleasant tingling that rushes down to " + CockDescriptor.describeMultiCockSimpleOne(character) + ".  You reach down to heft yourself experimentally and smile when you see pre-beading from your maleness.  Your cum production has increased!");
                // (large cum quantity) < 750
                else if (character.cumQ() < 750) DisplayText("\n\nA strong contraction passes through your body, almost painful in its intensity.  " + CockDescriptor.describeMultiCockSimpleOne(character, true) + " leaks and dribbles pre-cum down your " + LegDescriptor.describeLegs(character) + " as your body's cum production kicks up even higher!  Wow, it feels kind of... good.");
                // (XL cum quantity) < 2000
                else if (character.cumQ() < 2000) DisplayText("\n\nAn orgasmic contraction wracks your abdomen, shivering through your midsection and down towards your groin.  A thick trail of slime leaks from " + CockDescriptor.describeMultiCockSimpleOne(character) + "  and trails down your " + LegDescriptor.describeLeg(character) + ", pooling below you.  It's quite obvious that your body is producing even more cum now.");
                // (XXL cum quantity)
                else DisplayText("\n\nA body-wrenching contraction thrums through your gut, bringing with it the orgasmic feeling of your body kicking into cum-production overdrive.  pre-cum explodes from " + CockDescriptor.describeMultiCockSimpleOne(character) + ", running down your " + LegDescriptor.describeLegs(character) + " and splattering into puddles that would shame the orgasms of lesser " + GenderDescriptor.mf(character, "males", "persons") + ".  You rub yourself a few times, nearly starting to masturbate on the spot, but you control yourself and refrain for now.");
            }
        }
        // Bunny feet! - requirez earz
        if (character.torso.hips.legs.type !== LegType.BUNNY && changes < changeLimit && Utils.rand(5) === 0 && character.torso.neck.head.ears.type === EarType.BUNNY) {
            // Taurs
            if (character.torso.hips.legs.isTaur()) DisplayText("\n\nYour quadrupedal hind-quarters seizes, overbalancing your surprised front-end and causing you to stagger and fall to your side.  Pain lances throughout, contorting your body into a tightly clenched ball of pain while tendons melt and bones break, melt, and regrow.  When it finally stops, <b>you look down to behold your new pair of fur-covered rabbit feet</b>!");
            // Non-taurs
            else {
                DisplayText("\n\nNumbness envelops your " + LegDescriptor.describeLegs(character) + " as they pull tighter and tighter.  You overbalance and drop on your " + ButtDescriptor.describeButt(character));
                if (character.torso.tails.count > 0) DisplayText(", nearly smashing your tail flat");
                else DisplayText(" hard enough to sting");
                DisplayText(" while the change works its way through you.  Once it finishes, <b>you discover that you now have fuzzy bunny feet and legs</b>!");
            }
            changes++;
            character.torso.hips.legs.type = LegType.BUNNY;
        }
        // BUN FaceType!  REQUIREZ EARZ
        if (character.torso.neck.head.ears.type === EarType.BUNNY && character.torso.neck.head.face.type !== FaceType.BUNNY && Utils.rand(3) === 0 && changes < changeLimit) {
            DisplayText("\n\n");
            changes++;
            // Human(ish) face
            if (character.torso.neck.head.face.type === FaceType.HUMAN || character.torso.neck.head.face.type === FaceType.SHARK_TEETH) DisplayText("You catch your nose twitching on its own at the bottom of your vision, but as soon as you focus on it, it stops.  A moment later, some of your teeth tingle and brush past your lips, exposing a white pair of buckteeth!  <b>Your face has taken on some rabbit-like characteristics!</b>");
            // Crazy furry TF shit
            else DisplayText("You grunt as your " + FaceDescriptor.describeFace(character) + " twists and reforms.  Even your teeth ache as their positions are rearranged to match some new, undetermined order.  When the process finishes, <b>you're left with a perfectly human looking face, save for your constantly twitching nose and prominent buck-teeth.</b>");
            character.torso.neck.head.face.type = FaceType.BUNNY;
        }
        // DAH BUNBUN EARZ - requires poofbutt!
        if (character.torso.neck.head.ears.type !== EarType.BUNNY && changes < changeLimit && Utils.rand(3) === 0 && character.torso.tails.reduce(Tail.HasType(TailType.BUNNY), false)) {
            DisplayText("\n\nYour ears twitch and curl in on themselves, sliding around on the flesh of your head.  They grow warmer and warmer before they finally settle on the top of your head and unfurl into long, fluffy bunny-ears.  <b>You now have a pair of bunny ears.</b>");
            character.torso.neck.head.ears.type = EarType.BUNNY;
            changes++;
        }
        // DAH BUNBUNTAILZ
        if (!character.torso.tails.reduce(Tail.HasType(TailType.BUNNY), false) && Utils.rand(2) === 0 && changes < changeLimit) {
            if (character.torso.tails.count > 0) DisplayText("\n\nYour tail burns as it shrinks, pulling tighter and tighter to your backside until it's the barest hint of a stub.  At once, white, poofy fur explodes out from it.  <b>You've got a white bunny-tail!  It even twitches when you aren't thinking about it.</b>");
            else DisplayText("\n\nA burning pressure builds at your spine before dissipating in a rush of relief. You reach back and discover a small, fleshy tail that's rapidly growing long, poofy fur.  <b>You have a rabbit tail!</b>");
            character.torso.tails.clear();
            character.torso.tails.add(new Tail(TailType.BUNNY));
            changes++;
        }
        if (Utils.rand(4) === 0 && character.torso.neck.gills && changes < changeLimit) {
            DisplayText("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            character.torso.neck.gills = false;
            changes++;
        }
        // Bunny Breeder Perk?
        // FAILSAAAAFE
        if (changes === 0) {
            if (character.stats.lib < 100) changes++;
            character.stats.lib += 1;
            character.stats.lust += 5 + character.stats.lib / 7;
            if (character.stats.lib < 30) character.stats.lib += 1;
            if (character.stats.lib < 40) character.stats.lib += 1;
            if (character.stats.lib < 60) character.stats.lib += 1;
            // Lower ones are gender specific for some reason
            if (character.stats.lib < 60) {
                // (Cunts or assholes!
                if (character.torso.cocks.count <= 0 || (character.gender === 3 && Utils.rand(2) === 0)) {
                    if (character.stats.lib < 30) {
                        DisplayText("\n\nYou squirm a little and find your eyes glancing down to your groin.  Strange thoughts jump to mind, wondering how it would feel to breed until you're swollen and pregnant.  ");
                        if (character.stats.cor < 25) DisplayText("You're repulsed by such shameful thoughts.");
                        else if (character.stats.cor < 60) DisplayText("You worry that this place is really getting to you.");
                        else if (character.stats.cor < 90) DisplayText("You pant a little and wonder where the nearest fertile male is.");
                        else DisplayText("You grunt and groan with desire and disappointment.  You should get bred soon!");
                    }
                    else DisplayText("\n\nYour mouth rolls open as you start to pant with desire.  Did it get hotter?  Your hand reaches down to your " + LegDescriptor.assholeOrPussy(character) + ", and you're struck by just how empty it feels.  The desire to be filled, not by a hand or a finger but by a virile male, rolls through you like a wave, steadily increasing your desire for sex.");
                }
                // WANGS!
                if (character.torso.cocks.count > 0) {
                    if (character.stats.lib < 30) {
                        DisplayText("\n\nYou squirm a little and find your eyes glancing down to your groin.  Strange thoughts jump to mind, wondering how it would feel to fuck a ");
                        if (Utils.rand(2) === 0) DisplayText("female hare until she's immobilized by all her eggs");
                        else DisplayText("herm rabbit until her sack is so swollen that she's forced to masturbate over and over again just to regain mobility");
                        DisplayText(". ");
                        if (character.stats.cor < 25) DisplayText("You're repulsed by such shameful thoughts.");
                        else if (character.stats.cor < 50) DisplayText("You worry that this place is really getting to you.");
                        else if (character.stats.cor < 75) DisplayText("You pant a little and wonder where the nearest fertile female is.");
                        else DisplayText("You grunt and groan with desire and disappointment.  Gods you need to fuck!");
                    }
                    else DisplayText("\n\nYour mouth rolls open as you start to pant with desire.  Did it get hotter?  Your hand reaches down to " + CockDescriptor.describeMultiCockSimpleOne(character) + ", and you groan from how tight and hard it feels.  The desire to have it squeezed, not with your hand but with a tight pussy or puckered asshole, runs through you like a wave, steadily increasing your desire for sex.");
                }
            }
            // Libido over 60? FUCK YEAH!
            else if (character.stats.lib < 80) {
                DisplayText("\n\nYou fan your neck and start to pant as your " + character.skin.tone + " skin begins to flush red with heat");
                if (character.skin.type > SkinType.PLAIN) DisplayText(" through your " + character.skin.desc);
                DisplayText(".  ");
                if (character.gender === 1) DisplayText("Compression tightens down on " + CockDescriptor.describeMultiCockSimpleOne(character) + " as it strains against your " + character.inventory.equipment.armor.displayName + ".  You struggle to fight down your heightened libido, but it's hard - so very hard.");
                else if (character.gender === 0) DisplayText("Sexual hunger seems to gnaw at your " + ButtDescriptor.describeButthole(character.torso.butt) + ", demanding it be filled, but you try to resist your heightened libido.  It's so very, very hard.");
                else if (character.gender === 2) DisplayText("Moisture grows between your rapidly-engorging vulva, making you squish and squirm as you try to fight down your heightened libido, but it's hard - so very hard.");
                else DisplayText("Steamy moisture and tight compression war for your awareness in your groin as " + CockDescriptor.describeMultiCockSimpleOne(character) + " starts to strain against your " + character.inventory.equipment.armor.displayName + ".  Your vulva engorges with blood, growing slicker and wetter.  You try so hard to fight down your heightened libido, but it's so very, very hard.  The urge to breed lingers in your mind, threatening to rear its ugly head.");
            }
            // MEGALIBIDO
            else {
                DisplayText("\n\nDelicious, unquenchable desire rises higher and higher inside you, until you're having trouble tamping it down all the time.  A little, nagging voice questions why you would ever want to tamp it down.  It feels so good to give in and breed that you nearly cave to the delicious idea on the spot.  Life is beginning to look increasingly like constant fucking or masturbating in a lust-induced haze, and you're having a harder and harder time finding fault with it.  ");
                if (character.stats.cor < 33) DisplayText("You sigh, trying not to give in completely.");
                else if (character.stats.cor < 66) DisplayText("You pant and groan, not sure how long you'll even want to resist.");
                else {
                    DisplayText("You smile and wonder if you can ");
                    if (character.stats.lib < 100) DisplayText("get your libido even higher.");
                    else DisplayText("find someone to fuck right now.");
                }
            }
        }
    }
}
