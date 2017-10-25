import Consumable from './Consumable';
import { SkinType } from '../../Body/Creature';
import { FaceType } from '../../Body/Face';
import { EarType } from '../../Body/Head';
import { LowerBodyType, TailType } from '../../Body/LowerBody';
import { PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import Vagina from '../../Body/Vagina';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import GenderDescriptor from '../../Descriptors/GenderDescriptor';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import MainScreen from '../../display/MainScreen';
import Perk from '../../Effects/Perk';
import Player from '../../Player';
import RaceScore from '../../RaceScore';
import Utils from '../../Utilities/Utils';

export default class NeonPinkEgg extends Consumable {
    private pregnantChange: boolean
    public constructor(pregnantChange: boolean) {
        super("NPnkEgg", "NPnkEgg", "a neon pink egg", NeonPinkEgg.DefaultValue, "This is an oblong egg with an unnatural neon pink coloration.  It tingles in your hand with odd energies that make you feel as if you could jump straight into the sky.");
        this.pregnantChange = pregnantChange;
    }

    public use(player: Player) {
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //If this is a pregnancy change, only 1 change per proc.
        if (this.pregnantChange) changeLimit = 1;
        else MainScreen.text("", true);
        //If not pregnancy, mention eating it.
        if (!this.pregnantChange) MainScreen.text("You eat the neon pink egg, and to your delight it tastes sweet, like candy.  In seconds you've gobbled down the entire thing, and you lick your fingers clean before you realize you ate the shell � and it still tasted like candy.", false);
        //If pregnancy, warning!
        if (this.pregnantChange) {
            MainScreen.text("\n<b>Your egg-stuffed ", false);
            let hasEggFilledVagina: boolean = player.pregnancy.isPregnantWith(PregnancyType.BUNNY);
            if (hasEggFilledVagina) {
                MainScreen.text("womb ", false);
                if (player.pregnancy.isButtPregnantWith(PregnancyType.BUNNY))
                    MainScreen.text("and ", false);
            }

            if (player.pregnancy.isButtPregnantWith(PregnancyType.BUNNY)) MainScreen.text("backdoor ", false);
            if (player.pregnancy.isButtPregnantWith(PregnancyType.BUNNY) && hasEggFilledVagina) MainScreen.text("rumble", false);
            else MainScreen.text("rumbles", false);
            MainScreen.text(" oddly, and you have a hunch that something's about to change</b>.", false);
        }
        //STATS CHANGURYUUUUU
        //Boost speed (max 80!)
        if (changes < changeLimit && Utils.rand(3) == 0 && player.stats.spe < 80) {
            if (player.stats.spe < 30) MainScreen.text("\n\nTingles run through your muscles, and your next few movements seem unexpectedly fast.  The egg somehow made you faster!", false);
            else if (player.stats.spe < 50) MainScreen.text("\n\nYou feel tingles running through your body, and after a moment, it's clear that you're getting faster.", false);
            else if (player.stats.spe < 65) MainScreen.text("\n\nThe tight, ready feeling you've grown accustomed to seems to intensify, and you know in the back of your mind that you've become even faster.", false);
            else MainScreen.text("\n\nSomething changes in your physique, and you grunt, chopping an arm through the air experimentally.  You seem to move even faster than before, confirming your suspicions.", false);
            changes++;
            if (player.stats.spe < 35) player.stats.spe += 1;
            player.stats.spe += 1;
        }
        //Boost libido
        if (changes < changeLimit && Utils.rand(5) == 0) {
            changes++;
            player.stats.lib += 1;
            player.stats.lust += 5 + player.stats.lib / 7;
            if (player.stats.lib < 30) player.stats.lib += 1;
            if (player.stats.lib < 40) player.stats.lib += 1;
            if (player.stats.lib < 60) player.stats.lib += 1;
            //Lower ones are gender specific for some reason
            if (player.stats.lib < 60) {
                //(Cunts or assholes!
                if (!player.lowerBody.cockSpot.hasCock() || (player.gender == 3 && Utils.rand(2) == 0)) {
                    if (player.stats.lib < 30) {
                        MainScreen.text("\n\nYou squirm a little and find your eyes glancing down to your groin.  Strange thoughts jump to mind, wondering how it would feel to breed until you're swollen and pregnant.  ", false);
                        if (player.stats.cor < 25) MainScreen.text("You're repulsed by such shameful thoughts.", false);
                        else if (player.stats.cor < 60) MainScreen.text("You worry that this place is really getting to you.", false);
                        else if (player.stats.cor < 90) MainScreen.text("You pant a little and wonder where the nearest fertile male is.", false);
                        else MainScreen.text("You grunt and groan with desire and disappointment.  You should get bred soon!", false);
                    }
                    else MainScreen.text("\n\nYour mouth rolls open as you start to pant with desire.  Did it get hotter?  Your hand reaches down to your " + LowerBodyDescriptor.assholeOrPussy(player) + ", and you're struck by just how empty it feels.  The desire to be filled, not by a hand or a finger but by a virile male, rolls through you like a wave, steadily increasing your desire for sex.", false);
                }
                //WANGS!
                if (player.lowerBody.cockSpot.hasCock()) {
                    if (player.stats.lib < 30) {
                        MainScreen.text("\n\nYou squirm a little and find your eyes glancing down to your groin.  Strange thoughts jump to mind, wondering how it would feel to fuck a ", false);
                        if (Utils.rand(2) == 0) MainScreen.text("female hare until she's immobilized by all her eggs", false);
                        else MainScreen.text("herm rabbit until her sack is so swollen that she's forced to masturbate over and over again just to regain mobility", false);
                        MainScreen.text(". ", false);
                        if (player.stats.cor < 25) MainScreen.text("You're repulsed by such shameful thoughts.", false);
                        else if (player.stats.cor < 50) MainScreen.text("You worry that this place is really getting to you.", false);
                        else if (player.stats.cor < 75) MainScreen.text("You pant a little and wonder where the nearest fertile female is.", false);
                        else MainScreen.text("You grunt and groan with desire and disappointment.  Gods you need to fuck!", false);
                    }
                    else MainScreen.text("\n\nYour mouth rolls open as you start to pant with desire.  Did it get hotter?  Your hand reaches down to " + CockDescriptor.describeMultiCockSimpleOne(player) + ", and you groan from how tight and hard it feels.  The desire to squeeze it, not with your hand but with a tight pussy or puckered asshole, runs through you like a wave, steadily increasing your desire for sex.", false);
                }
            }
            //Libido over 60? FUCK YEAH!
            else if (player.stats.lib < 80) {
                MainScreen.text("\n\nYou fan your neck and start to pant as your " + player.skinTone + " skin begins to flush red with heat", false);
                if (player.skinType > SkinType.PLAIN) MainScreen.text(" through your " + player.skinDesc, false);
                MainScreen.text(".  ", false);
                if (player.gender == 1) MainScreen.text("Compression tightens down on " + CockDescriptor.describeMultiCockSimpleOne(player) + " as it strains against your " + player.inventory.armor.displayName + ".  You struggle to fight down your heightened libido, but it's hard � so very hard.", false);
                else if (player.gender == 0) MainScreen.text("Sexual hunger seems to gnaw at your " + ButtDescriptor.describeButthole(player) + ", demanding it be filled, but you try to resist your heightened libido.  It's so very, very hard.", false);
                else if (player.gender == 2) MainScreen.text("Moisture grows between your rapidly-engorging vulva, making you squish and squirm as you try to fight down your heightened libido, but it's hard � so very hard.", false);
                else MainScreen.text("Steamy moisture and tight compression war for your awareness in your groin as " + CockDescriptor.describeMultiCockSimpleOne(player) + " starts to strain against your " + player.inventory.armor.displayName + ".  Your vulva engorges with blood, growing slicker and wetter.  You try so hard to fight down your heightened libido, but it's so very, very hard.  The urge to breed lingers in your mind, threatening to rear its ugly head.", false);
            }
            //MEGALIBIDO
            else {
                MainScreen.text("\n\nDelicious, unquenchable desire rises higher and higher inside you, until you're having trouble tamping it down all the time.  A little, nagging voice questions why you would ever want to tamp it down.  It feels so good to give in and breed that you nearly cave to the delicious idea on the spot.  Life is beginning to look increasingly like constant fucking or masturbating in a lust-induced haze, and you're having a harder and harder time finding fault with it.  ", false);
                if (player.stats.cor < 33) MainScreen.text("You sigh, trying not to give in completely.", false);
                else if (player.stats.cor < 66) MainScreen.text("You pant and groan, not sure how long you'll even want to resist.", false);
                else {
                    MainScreen.text("You smile and wonder if you can ", false);
                    if (player.stats.lib < 100) MainScreen.text("get your libido even higher.", false);
                    else MainScreen.text("find someone to fuck right now.", false);
                }
            }
        }
        //BIG sensitivity gains to 60.
        if (player.stats.sens < 60 && changes < changeLimit && Utils.rand(3) == 0) {
            changes++;
            MainScreen.text("\n\n", false);
            //(low)
            if (Utils.rand(3) != 2) {
                MainScreen.text("The feeling of small breezes blowing over your " + player.skinDesc + " gets a little bit stronger.  How strange.  You pinch yourself and nearly jump when it hurts a tad more than you'd think. You've gotten more sensitive!", false);
                player.stats.sens += 5;
            }
            //(BIG boost 1/3 chance)
            else {
                player.stats.sens += 15;
                MainScreen.text("Every movement of your body seems to bring heightened waves of sensation that make you woozy.  Your " + player.inventory.armor.displayName + " rubs your " + BreastDescriptor.describeNipple(player, player.upperBody.chest.get(0)) + "s deliciously", false);
                if (player.upperBody.chest.hasFuckableNipples()) {
                    MainScreen.text(", sticking to the ", false);
                    if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier > 2) MainScreen.text("milk-leaking nipple-twats", false);
                    else MainScreen.text("slippery nipple-twats", false);
                }
                else if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier > 2) MainScreen.text(", sliding over the milk-leaking teats with ease", false);
                else MainScreen.text(" catching on each of the hard nubs repeatedly", false);
                MainScreen.text(".  Meanwhile, your crotch... your crotch is filled with such heavenly sensations from ", false);
                if (player.gender == 1) {
                    MainScreen.text(CockDescriptor.describeMultiCockSimpleOne(player) + " and your ", false);
                    if (player.lowerBody.balls > 0) MainScreen.text(BallsDescriptor.describeBalls(true, true, player), false);
                    else MainScreen.text(ButtDescriptor.describeButthole(player), false);
                }
                else if (player.gender == 2) MainScreen.text("your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " and " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)), false);
                else if (player.gender == 3) {
                    MainScreen.text(CockDescriptor.describeMultiCockSimpleOne(player) + ", ", false);
                    if (player.lowerBody.balls > 0) MainScreen.text(BallsDescriptor.describeBalls(true, true, player) + ", ", false);
                    MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ", and " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)), false);
                }
                //oh god genderless
                else MainScreen.text("you " + ButtDescriptor.describeButthole(player), false);
                MainScreen.text(" that you have to stay stock-still to keep yourself from falling down and masturbating on the spot.  Thankfully the orgy of tactile bliss fades after a minute, but you still feel way more sensitive than your previous norm.  This will take some getting used to!", false);
            }
        }
        //Makes girls very girl(90), guys somewhat girly (61).
        if (changes < changeLimit && Utils.rand(2) == 0) {
            let buffer: string = "";
            if (player.gender < 2) buffer += player.modFem(61, 4);
            else buffer += player.modFem(90, 4);
            if (buffer != "") {
                MainScreen.text(buffer, false);
                changes++;
            }
        }

        //De-wettification of cunt (down to 3?)!
        if (player.lowerBody.vaginaSpot.get(0).vaginalWetness > 3 && changes < changeLimit && Utils.rand(3) == 0) {
            //Just to be safe
            if (player.lowerBody.vaginaSpot.hasVagina()) {
                MainScreen.text("\n\nThe constant flow of fluids that sluice from your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " slow down, leaving you feeling a bit less like a sexual slip-'n-slide.", false);
                player.lowerBody.vaginaSpot.get(0).vaginalWetness--;
                changes++;
            }
        }
        //Fertility boost!
        if (changes < changeLimit && Utils.rand(4) == 0 && player.fertility < 50 && player.lowerBody.vaginaSpot.hasVagina()) {
            player.fertility += 2 + Utils.rand(5);
            changes++;
            MainScreen.text("\n\nYou feel strange.  Fertile... somehow.  You don't know how else to think of it, but you know your body is just aching to be pregnant and give birth.", false);
        }
        //-VAGs
        if (player.lowerBody.vaginaSpot.hasVagina() && !player.perks.has("BunnyEggs") && changes < changeLimit && Utils.rand(4) == 0 && RaceScore.bunnyScore(player) > 3) {
            MainScreen.text("\n\nDeep inside yourself there is a change.  It makes you feel a little woozy, but passes quickly.  Beyond that, you aren't sure exactly what just happened, but you are sure it originated from your womb.\n\n", false);
            MainScreen.text("(<b>Perk Gained: Bunny Eggs</b>)", false);
            player.perks.add(new Perk("BunnyEggs", 0, 0, 0, 0));
            changes++;
        }
        //Shrink Balls!
        if (player.lowerBody.balls > 0 && player.lowerBody.ballSize > 5 && Utils.rand(3) == 0 && changes < changeLimit) {
            if (player.lowerBody.ballSize < 10) {
                MainScreen.text("\n\nRelief washes through your groin as your " + BallsDescriptor.describeBalls(false, true, player, true) + " lose about an inch of their diameter.", false);
                player.lowerBody.ballSize--;
            }
            else if (player.lowerBody.ballSize < 25) {
                MainScreen.text("\n\nRelief washes through your groin as your " + BallsDescriptor.describeBalls(false, true, player, true) + " lose a few inches of their diameter.  Wow, it feels so much easier to move!", false);
                player.lowerBody.ballSize -= (2 + Utils.rand(3));
            }
            else {
                MainScreen.text("\n\nRelief washes through your groin as your " + BallsDescriptor.describeBalls(false, true, player, true) + " lose at least six inches of diameter.  Wow, it feels SOOOO much easier to move!", false);
                player.lowerBody.ballSize -= (6 + Utils.rand(3));
            }
            changes++;
        }
        //Get rid of extra balls
        if (player.lowerBody.balls > 2 && changes < changeLimit && Utils.rand(3) == 0) {
            changes++;
            MainScreen.text("\n\nThere's a tightening in your " + BallsDescriptor.describeSack(player) + " that only gets higher and higher until you're doubled over and wheezing.  When it passes, you reach down and discover that <b>two of your testicles are gone.</b>", false);
            player.lowerBody.balls -= 2;
        }
        //Boost cum production
        if ((player.lowerBody.balls > 0 || player.lowerBody.cockSpot.hasCock()) && player.cumQ() < 3000 && Utils.rand(3) == 0 && changeLimit > 1) {
            changes++;
            player.cumMultiplier += 3 + Utils.rand(7);
            if (player.cumQ() >= 250) player.stats.lust += 3;
            if (player.cumQ() >= 750) player.stats.lust += 4;
            if (player.cumQ() >= 2000) player.stats.lust += 5;
            //Balls
            if (player.lowerBody.balls > 0) {
                //(Small cum quantity) < 50
                if (player.cumQ() < 50) MainScreen.text("\n\nA twinge of discomfort runs through your " + BallsDescriptor.describeBalls(true, true, player) + ", but quickly vanishes.  You heft your orbs but they haven't changed in size � they just feel a little bit denser.", false);
                //(medium cum quantity) < 250
                else if (player.cumQ() < 250) {
                    MainScreen.text("\n\nA ripple of discomfort runs through your " + BallsDescriptor.describeBalls(true, true, player) + ", but it fades into a pleasant tingling.  You reach down to heft the orbs experimentally but they don't seem any larger.", false);
                    if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("  In the process, you brush " + CockDescriptor.describeMultiCockSimpleOne(player) + " and discover a bead of pre leaking at the tip.", false);
                }
                //(large cum quantity) < 750
                else if (player.cumQ() < 750) {
                    MainScreen.text("\n\nA strong contraction passes through your " + BallsDescriptor.describeSack(player) + ", almost painful in its intensity.  ", false);
                    if (player.lowerBody.cockSpot.hasCock()) MainScreen.text(CockDescriptor.describeMultiCockSimpleOne(player, true) + " leaks and dribbles pre-cum down your " + LowerBodyDescriptor.describeLegs(player) + " as your body's cum production kicks up even higher.", false);
                    else MainScreen.text("You wince, feeling pent up and yet unable to release.  You really wish you had a cock right about now.", false);
                }
                //(XL cum quantity) < 2000
                else if (player.cumQ() < 2000) {
                    MainScreen.text("\n\nAn orgasmic contraction wracks your " + BallsDescriptor.describeBalls(true, true, player) + ", shivering through the potent orbs and passing as quickly as it came.  ", false);
                    if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("A thick trail of slime leaks from " + CockDescriptor.describeMultiCockSimpleOne(player) + " down your " + LowerBodyDescriptor.describeLeg(player) + ", pooling below you.", false);
                    else MainScreen.text("You grunt, feeling terribly pent-up and needing to release.  Maybe you should get a penis to go with these balls...", false);
                    MainScreen.text("  It's quite obvious that your cum production has gone up again.", false);
                }
                //(XXL cum quantity)
                else {
                    MainScreen.text("\n\nA body-wrenching contraction thrums through your " + BallsDescriptor.describeBalls(true, true, player) + ", bringing with it the orgasmic feeling of your body kicking into cum-production overdrive.  ", false);
                    if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("pre-cum explodes from " + CockDescriptor.describeMultiCockSimpleOne(player) + ", running down your " + LowerBodyDescriptor.describeLeg(player) + " and splattering into puddles that would shame the orgasms of lesser " + GenderDescriptor.mf(player, "males", "persons") + ".  You rub yourself a few times, nearly starting to masturbate on the spot, but you control yourself and refrain for now.", false);
                    else MainScreen.text("You pant and groan but the pleasure just turns to pain.  You're so backed up � if only you had some way to vent all your seed!", false);
                }
            }
            //NO BALLZ (guaranteed cock tho)
            else {
                //(Small cum quantity) < 50
                if (player.cumQ() < 50) MainScreen.text("\n\nA twinge of discomfort runs through your body, but passes before you have any chance to figure out exactly what it did.", false);
                //(Medium cum quantity) < 250)
                else if (player.cumQ() < 250) MainScreen.text("\n\nA ripple of discomfort runs through your body, but it fades into a pleasant tingling that rushes down to " + CockDescriptor.describeMultiCockSimpleOne(player) + ".  You reach down to heft yourself experimentally and smile when you see pre-beading from your maleness.  Your cum production has increased!", false);
                //(large cum quantity) < 750
                else if (player.cumQ() < 750) MainScreen.text("\n\nA strong contraction passes through your body, almost painful in its intensity.  " + CockDescriptor.describeMultiCockSimpleOne(player, true) + " leaks and dribbles pre-cum down your " + LowerBodyDescriptor.describeLegs(player) + " as your body's cum production kicks up even higher!  Wow, it feels kind of... good.", false);
                //(XL cum quantity) < 2000
                else if (player.cumQ() < 2000) MainScreen.text("\n\nAn orgasmic contraction wracks your abdomen, shivering through your midsection and down towards your groin.  A thick trail of slime leaks from " + CockDescriptor.describeMultiCockSimpleOne(player) + "  and trails down your " + LowerBodyDescriptor.describeLeg(player) + ", pooling below you.  It's quite obvious that your body is producing even more cum now.", false);
                //(XXL cum quantity)
                else MainScreen.text("\n\nA body-wrenching contraction thrums through your gut, bringing with it the orgasmic feeling of your body kicking into cum-production overdrive.  pre-cum explodes from " + CockDescriptor.describeMultiCockSimpleOne(player) + ", running down your " + LowerBodyDescriptor.describeLegs(player) + " and splattering into puddles that would shame the orgasms of lesser " + GenderDescriptor.mf(player, "males", "persons") + ".  You rub yourself a few times, nearly starting to masturbate on the spot, but you control yourself and refrain for now.", false);
            }
        }
        //Bunny feet! - requirez earz
        if (player.lowerBody.type != LowerBodyType.BUNNY && changes < changeLimit && Utils.rand(5) == 0 && player.upperBody.head.earType == EarType.BUNNY) {
            //Taurs
            if (player.lowerBody.isTaur()) MainScreen.text("\n\nYour quadrupedal hind-quarters seizes, overbalancing your surprised front-end and causing you to stagger and fall to your side.  Pain lances throughout, contorting your body into a tightly clenched ball of pain while tendons melt and bones break, melt, and regrow.  When it finally stops, <b>you look down to behold your new pair of fur-covered rabbit feet</b>!", false);
            //Non-taurs
            else {
                MainScreen.text("\n\nNumbness envelops your " + LowerBodyDescriptor.describeLegs(player) + " as they pull tighter and tighter.  You overbalance and drop on your " + ButtDescriptor.describeButt(player), false);
                if (player.lowerBody.tailType > TailType.NONE) MainScreen.text(", nearly smashing your tail flat", false);
                else MainScreen.text(" hard enough to sting", false);
                MainScreen.text(" while the change works its way through you.  Once it finishes, <b>you discover that you now have fuzzy bunny feet and legs</b>!", false);
            }
            changes++;
            player.lowerBody.type = LowerBodyType.BUNNY;
        }
        //BUN FaceType!  REQUIREZ EARZ
        if (player.upperBody.head.earType == EarType.BUNNY && player.upperBody.head.face.faceType != FaceType.BUNNY && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\n", false);
            changes++;
            //Human(ish) face
            if (player.upperBody.head.face.faceType == FaceType.HUMAN || player.upperBody.head.face.faceType == FaceType.SHARK_TEETH) MainScreen.text("You catch your nose twitching on its own at the bottom of your vision, but as soon as you focus on it, it stops.  A moment later, some of your teeth tingle and brush past your lips, exposing a white pair of buckteeth!  <b>Your face has taken on some rabbit-like playeristics!</b>", false);
            //Crazy furry TF shit
            else MainScreen.text("You grunt as your " + FaceDescriptor.describeFace(player) + " twists and reforms.  Even your teeth ache as their positions are rearranged to match some new, undetermined order.  When the process finishes, <b>you're left with a perfectly human looking face, save for your constantly twitching nose and prominent buck-teeth.</b>", false);
            player.upperBody.head.face.faceType = FaceType.BUNNY;
        }
        //DAH BUNBUN EARZ - requires poofbutt!
        if (player.upperBody.head.earType != EarType.BUNNY && changes < changeLimit && Utils.rand(3) == 0 && player.lowerBody.tailType == TailType.BUNNY) {
            MainScreen.text("\n\nYour ears twitch and curl in on themselves, sliding around on the flesh of your head.  They grow warmer and warmer before they finally settle on the top of your head and unfurl into long, fluffy bunny-ears.  <b>You now have a pair of bunny ears.</b>", false);
            player.upperBody.head.earType = EarType.BUNNY;
            changes++;
        }
        //DAH BUNBUNTAILZ
        if (player.lowerBody.tailType != TailType.BUNNY && Utils.rand(2) == 0 && changes < changeLimit) {
            if (player.lowerBody.tailType > TailType.NONE) MainScreen.text("\n\nYour tail burns as it shrinks, pulling tighter and tighter to your backside until it's the barest hint of a stub.  At once, white, poofy fur explodes out from it.  <b>You've got a white bunny-tail!  It even twitches when you aren't thinking about it.</b>", false);
            else MainScreen.text("\n\nA burning pressure builds at your spine before dissipating in a rush of relief. You reach back and discover a small, fleshy tail that's rapidly growing long, poofy fur.  <b>You have a rabbit tail!</b>", false);
            player.lowerBody.tailType = TailType.BUNNY;
            changes++;
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        //Bunny Breeder Perk?
        //FAILSAAAAFE
        if (changes == 0) {
            if (player.stats.lib < 100) changes++;
            player.stats.lib += 1;
            player.stats.lust += 5 + player.stats.lib / 7;
            if (player.stats.lib < 30) player.stats.lib += 1;
            if (player.stats.lib < 40) player.stats.lib += 1;
            if (player.stats.lib < 60) player.stats.lib += 1;
            //Lower ones are gender specific for some reason
            if (player.stats.lib < 60) {
                //(Cunts or assholes!
                if (!player.lowerBody.cockSpot.hasCock() || (player.gender == 3 && Utils.rand(2) == 0)) {
                    if (player.stats.lib < 30) {
                        MainScreen.text("\n\nYou squirm a little and find your eyes glancing down to your groin.  Strange thoughts jump to mind, wondering how it would feel to breed until you're swollen and pregnant.  ", false);
                        if (player.stats.cor < 25) MainScreen.text("You're repulsed by such shameful thoughts.", false);
                        else if (player.stats.cor < 60) MainScreen.text("You worry that this place is really getting to you.", false);
                        else if (player.stats.cor < 90) MainScreen.text("You pant a little and wonder where the nearest fertile male is.", false);
                        else MainScreen.text("You grunt and groan with desire and disappointment.  You should get bred soon!", false);
                    }
                    else MainScreen.text("\n\nYour mouth rolls open as you start to pant with desire.  Did it get hotter?  Your hand reaches down to your " + LowerBodyDescriptor.assholeOrPussy(player) + ", and you're struck by just how empty it feels.  The desire to be filled, not by a hand or a finger but by a virile male, rolls through you like a wave, steadily increasing your desire for sex.", false);
                }
                //WANGS!
                if (player.lowerBody.cockSpot.hasCock()) {
                    if (player.stats.lib < 30) {
                        MainScreen.text("\n\nYou squirm a little and find your eyes glancing down to your groin.  Strange thoughts jump to mind, wondering how it would feel to fuck a ", false);
                        if (Utils.rand(2) == 0) MainScreen.text("female hare until she's immobilized by all her eggs", false);
                        else MainScreen.text("herm rabbit until her sack is so swollen that she's forced to masturbate over and over again just to regain mobility", false);
                        MainScreen.text(". ", false);
                        if (player.stats.cor < 25) MainScreen.text("You're repulsed by such shameful thoughts.", false);
                        else if (player.stats.cor < 50) MainScreen.text("You worry that this place is really getting to you.", false);
                        else if (player.stats.cor < 75) MainScreen.text("You pant a little and wonder where the nearest fertile female is.", false);
                        else MainScreen.text("You grunt and groan with desire and disappointment.  Gods you need to fuck!", false);
                    }
                    else MainScreen.text("\n\nYour mouth rolls open as you start to pant with desire.  Did it get hotter?  Your hand reaches down to " + CockDescriptor.describeMultiCockSimpleOne(player) + ", and you groan from how tight and hard it feels.  The desire to have it squeezed, not with your hand but with a tight pussy or puckered asshole, runs through you like a wave, steadily increasing your desire for sex.", false);
                }
            }
            //Libido over 60? FUCK YEAH!
            else if (player.stats.lib < 80) {
                MainScreen.text("\n\nYou fan your neck and start to pant as your " + player.skinTone + " skin begins to flush red with heat", false);
                if (player.skinType > SkinType.PLAIN) MainScreen.text(" through your " + player.skinDesc, false);
                MainScreen.text(".  ", false);
                if (player.gender == 1) MainScreen.text("Compression tightens down on " + CockDescriptor.describeMultiCockSimpleOne(player) + " as it strains against your " + player.inventory.armor.displayName + ".  You struggle to fight down your heightened libido, but it's hard � so very hard.", false);
                else if (player.gender == 0) MainScreen.text("Sexual hunger seems to gnaw at your " + ButtDescriptor.describeButthole(player) + ", demanding it be filled, but you try to resist your heightened libido.  It's so very, very hard.", false);
                else if (player.gender == 2) MainScreen.text("Moisture grows between your rapidly-engorging vulva, making you squish and squirm as you try to fight down your heightened libido, but it's hard � so very hard.", false);
                else MainScreen.text("Steamy moisture and tight compression war for your awareness in your groin as " + CockDescriptor.describeMultiCockSimpleOne(player) + " starts to strain against your " + player.inventory.armor.displayName + ".  Your vulva engorges with blood, growing slicker and wetter.  You try so hard to fight down your heightened libido, but it's so very, very hard.  The urge to breed lingers in your mind, threatening to rear its ugly head.", false);
            }
            //MEGALIBIDO
            else {
                MainScreen.text("\n\nDelicious, unquenchable desire rises higher and higher inside you, until you're having trouble tamping it down all the time.  A little, nagging voice questions why you would ever want to tamp it down.  It feels so good to give in and breed that you nearly cave to the delicious idea on the spot.  Life is beginning to look increasingly like constant fucking or masturbating in a lust-induced haze, and you're having a harder and harder time finding fault with it.  ", false);
                if (player.stats.cor < 33) MainScreen.text("You sigh, trying not to give in completely.", false);
                else if (player.stats.cor < 66) MainScreen.text("You pant and groan, not sure how long you'll even want to resist.", false);
                else {
                    MainScreen.text("You smile and wonder if you can ", false);
                    if (player.stats.lib < 100) MainScreen.text("get your libido even higher.", false);
                    else MainScreen.text("find someone to fuck right now.", false);
                }
            }
        }
    }
}