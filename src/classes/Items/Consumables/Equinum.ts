import Consumable from './Consumable';
import Cock, { CockType } from '../../Body/Cock';
import { Gender, SkinType } from '../../Body/Creature';
import { EyeType, FaceType } from '../../Body/Face';
import { EarType } from '../../Body/Head';
import { LowerBodyType, TailType } from '../../Body/LowerBody';
import { ArmType } from '../../Body/UpperBody';
import { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import CreatureChange from '../../display/CreatureChange';
import MainScreen from '../../display/MainScreen';
import StatusAffect from '../../Effects/StatusAffect';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import CockModifiers from '../../Modifiers/CockModifiers';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

export default class Equinum extends Consumable {
    public constructor() {
        super("Equinum", "Equinum", "a vial of Equinum", Equinum.DefaultValue, "This is a long flared vial with a small label that reads, \"<i>Equinum</i>\".  It is likely this potion is tied to horses in some way.");
    }

    public warning(player: Player) {
        if (player.skinType == SkinType.FUR && player.upperBody.head.face.faceType == FaceType.HORSE && player.lowerBody.tailType == TailType.HORSE && (player.lowerBody.type != LowerBodyType.HOOFED)) {
            //WARNINGS
            //Repeat warnings
            if (player.statusAffects.has("HorseWarning") && Utils.rand(3) == 0) {
                if (player.statusAffects.get("HorseWarning").value1 == 0) MainScreen.text("<b>\n\nYou feel a creeping chill down your back as your entire body shivers, as if rejecting something foreign.  Maybe you ought to cut back on the horse potions.</b>", false);
                if (player.statusAffects.get("HorseWarning").value1 > 0) MainScreen.text("<b>\n\nYou wonder how many more of these you can drink before you become a horse...</b>", false);
                player.statusAffects.get("HorseWarning").value1 = 1;
            }
            //First warning
            if (!player.statusAffects.has("HorseWarning")) {
                MainScreen.text("<b>\n\nWhile you drink the tasty potion, you realize how horse-like you already are, and wonder what else the potion could possibly change...</b>", false);
                player.statusAffects.add(new StatusAffect("HorseWarning", 0, 0, 0, 0));
            }
            //Bad End
            if (Utils.rand(4) == 0 && player.statusAffects.has("HorseWarning")) {
                //Must have been warned first...
                if (player.statusAffects.get("HorseWarning").value1 > 0) {
                    //If player has dicks check for horsedicks
                    if (player.lowerBody.cockSpot.count() > 0) {
                        //If player has horsedicks
                        if (player.lowerBody.cockSpot.countType(CockType.HORSE) > 0) {
                            MainScreen.text("\n\nSoon after you drink the Equinum, a burning sensation fills your chest. You have consumed too much of the potion, and the overdose starts to provoke dramatic changes in your body.  You collapse suddenly, twitching in pain as all the bones and muscles in your body break and reform. Eventually, you pass out from the strain you are put through.\n\nYou wake up after a few minutes. Once you get up on your legs, doubt fills your mind. You rush to a nearby pond and look down, nearly jumping when the reflection of a ", false);
                            if (player.gender == 0 || player.gender == 3) MainScreen.text("horse ", false);
                            if (player.gender == 1) MainScreen.text("stallion ", false);
                            if (player.gender == 2) MainScreen.text("mare ", false);
                            MainScreen.text(" with beautiful " + player.upperBody.head.hairColor + " " + player.skinDesc + " covering its body gazes back up at you.  That's you, and yet the doubt in your mind remains. Strange images fill your mind, and you feel as if you have not always been a horse, but some kind of funny fur-less creature standing on two legs. Your equine mind rapidly dismisses that doubt as a daydream however, and you trot away, oblivious to who you once were.\n\n", false);
                            MainScreen.text("<b>One year later...</b>\n\nAs you graze upon the small plants that coat the open plains of your home, you hear a noise on your right side. As you raise your head to check where the noise comes from, preparing to run from a potential predator, you see a strange creature. It stands on its two feet, its furless pink skin appearing beneath its clothes.  With a start, you realize you can identify the strange creatures gender.  ", false);
                            if (player.gender == 0 || player.gender == 1) MainScreen.text("He is clearly a male, but you are somewhat confused as you can see not one but three bulges where his manhood would be.\n\n", false);
                            if (player.gender == 2) MainScreen.text("She is clearly a female, as you can see her six breasts jiggle as she walks towards you, small stains appearing on her shirt where her nipples are.\n\n", false);
                            if (player.gender == 3) MainScreen.text("You are somewhat confused as you can see a bulge near her thighs but also huge boobs jiggling as she walks, and you can't say if she's a male or female.\n\n", false);
                            MainScreen.text("As soon as you lay eyes on the creature, a wave of nostalgia overtakes you. Somehow, looking at that creature makes you sad, as if you forgot something important.\n\n\"<i>How strange to see a horse here all alone,</i>\" the creature muses, \"<i>In any case, you're still the least bizarre creature I've met here.  Not to mention the only one that hasn't tried to rape me,</i>\" it says with a sigh.\n\nYou answer with an interrogative whinny.\n\n\"<i>Hey, I've got an idea. I'll take you back to the camp. I'll feed you and in return you can help me complete my quest. What do you say?</i>\"\n\nInstinctively, you utter a happy and approving whinny.\n\nYou failed in your quest, losing your focus and more importantly, losing yourself.  But, even so, you found a new meaning to your life, and have a new chance to succeed where you once failed.", false);
                            Game.gameOver();
                            return;
                        }
                    }
                    //If player has no cocks
                    else {
                        MainScreen.text("\n\nSoon after you drink the Equinum, a burning sensation fills your chest. You have consumed too much of the drink, and the overdose starts to provoke dramatic changes in your body.  You collapse suddenly, twitching in pain as all the bones and all the muscles in your body break and reform. Eventually, you pass out from the strain you are put through.\n\nYou wake up after a few minutes. Once you get up on your legs, doubt fills your mind. You rush to a nearby pond and look down, nearly jumping when the reflection of a ", false);
                        if (player.gender == 0 || player.gender == 3) MainScreen.text("horse ", false);
                        if (player.gender == 1) MainScreen.text("stallion ", false);
                        if (player.gender == 2) MainScreen.text("mare ", false);
                        MainScreen.text("with beautiful " + player.upperBody.head.hairColor + " " + player.skinDesc + " covering its body looks back at you.  That's you, and yet the doubt in your mind remains. Strange mental images fill your mind.  You feel as if you have not always been a horse, but some kind of funny fur-less creature standing on two legs. But your equine mind rapidly dismisses that doubt as a daydream, and you trot away, oblivious to who you once were.\n\n", false);
                        MainScreen.text("<b>One year after...</b>\n\nAs you graze small plants in the open plains that became your home, you hear a noise on your right side. As you raise your head to check where the noise comes from, preparing to run from a potential predator, you see a strange creature. It stands on two feet, its furless pink skin appearing beneath its clothes.  ", false);
                        if (player.gender == 0 || player.gender == 1) MainScreen.text("He is clearly a male, but you are somewhat confused as you can see not one but three bulges where his manhood would be.\n\n", false);
                        if (player.gender == 2) MainScreen.text("She is clearly a female, as you can see her six breasts jiggle as she walks towards you, small stains appearing on her shirt where her nipples are.\n\n", false);
                        if (player.gender == 3) MainScreen.text("You are somewhat confused as you can see a bulge near her thighs but also huge boobs jiggling as she walks, and you can't say if she's a male or female.\n\n", false);
                        MainScreen.text("As soon as you lay eyes on the creature, a wave of nostalgia overtakes you. Somehow, looking at that creature makes you sad, as if you forgot something important.\n\n\"<i>How strange to see a horse here all alone,</i>\" the creature muses, \"<i>In any case, you're still the least bizarre creature I've met here.  Not to mention the only one that hasn't tried to rape me,</i>\" it says with a sigh.\n\nYou answer with an interrogative whinny.\n\n\"<i>Hey, I've got an idea. I'll take you back to the camp. I'll feed you and in return you can help me to complete my quest. What do you say?</i>\"\n\nInstictively, you utter a happy and approving whinny.\n\nYou failed in your quest, losing you focus and more importantly, losing yourself.  But, even so, you found a new meaning to your life, and have a new chance to achieve what you once failed.", false);
                        Game.gameOver();
                        return;
                    }
                }
            }
        }
    }

    public use(player: Player) {
        player.slimeFeed();
        let cockSpot = player.lowerBody.cockSpot;
        let vaginaSpot = player.lowerBody.vaginaSpot;
        let chest = player.upperBody.chest;
        //Changes done
        let changes: number = 0;
        //Change limit
        let changeLimit: number = 1;
        //Chance to raise limit
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //Used for Utils.random chances
        //Set up output
        MainScreen.text("You down the potion, grimacing at the strong taste.", true);
        //CHANCE OF BAD END - 20% if face/tail/skin/cock are appropriate.
        //If hooved bad end doesn't appear till centaured
        this.warning(player);
        //Stat changes first
        //STRENGTH
        if (Utils.rand(2) == 0) {
            //Maxxed
            if (player.stats.str >= 60) {
                MainScreen.text("\n\nYou feel strong enough to single-handedly pull a fully-loaded wagon.", false);
            }
            //NOT MAXXED
            else {
                player.stats.str += 1;
                MainScreen.text("\n\nYour muscles clench and surge, making you feel as strong as a horse.", false);
                changes++;
            }
        }
        //TOUGHNESS
        if (Utils.rand(2) == 0) {
            //MAXXED ALREADY
            if (player.stats.tou >= 75) {
                MainScreen.text("\n\nYour body is as tough and solid as a ", false);
                if (player.gender == Gender.MALE || player.gender == Gender.HERM)
                    MainScreen.text("stallion's.", false);
                else
                    MainScreen.text("mare's.", false);
            }
            //NOT MAXXED
            else {
                player.stats.tou += 1.25;
                MainScreen.text("\n\nYour body suddenly feels tougher and more resilient.", false);
                changes++;
            }
        }
        //INTELLECT
        if (Utils.rand(3) == 0) {
            if (player.stats.int <= 5) {
                MainScreen.text("\n\nYou let out a throaty \"Neiiiigh\" as your animalistic instincts take over.", false);
            }
            if (player.stats.int < 10 && player.stats.int > 5) {
                player.stats.int += -1;
                MainScreen.text("\n\nYou smile vacantly as you drink the potion, knowing you're just a big dumb animal who loves to fuck.", false);
                changes++;
            }
            if (player.stats.int <= 20 && player.stats.int >= 10) {
                player.stats.int += -2;
                MainScreen.text("\n\nYou find yourself looking down at the empty bottle in your hand and realize you haven't thought ANYTHING since your first sip.", false);
                changes++;
            }
            if (player.stats.int <= 30 && player.stats.int > 20) {
                player.stats.int += -3;
                MainScreen.text("\n\nYou smile broadly as your cares seem to melt away.  A small part of you worries that you're getting dumber.", false);
                changes++;
            }
            if (player.stats.int <= 50 && player.stats.int > 30) {
                player.stats.int += -4;
                MainScreen.text("\n\nIt becomes harder to keep your mind focused as your intellect diminishes.", false);
                changes++;
            }
            if (player.stats.int > 50) {
                player.stats.int += -5;
                MainScreen.text("\n\nYour usually intelligent mind feels much more sluggish.", false);
                changes++;
            }
        }
        //-Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.upperBody.armType == ArmType.HARPY && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating.  The wing-like shape your arms once had is gone in a matter of moments, leaving " + player.skinDesc + " behind.", false);
            player.upperBody.armType = ArmType.HUMAN;
            changes++;
        }
        //-Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.upperBody.armType == ArmType.SPIDER && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away.  The glossy black coating is soon gone, leaving " + player.skinDesc + " behind.", false);
            player.upperBody.armType = ArmType.HUMAN;
            changes++;
        }
        //-Remove feathery hair (copy for equinum, canine peppers, Labova)
        if (changes < changeLimit && player.upperBody.head.hairType == 1 && Utils.rand(4) == 0) {
            //(long):
            if (player.upperBody.head.hairLength >= 6) MainScreen.text("\n\nA lock of your downy-soft feather-hair droops over your eye.  Before you can blow the offending down away, you realize the feather is collapsing in on itself.  It continues to curl inward until all that remains is a normal stUtils.Utils.rand of hair.  <b>Your hair is no longer feathery!</b>", false);
            //(short)
            else MainScreen.text("\n\nYou run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested.  While your hand is up there, it detects a change in the texture of your feathers.  They're completely disappearing, merging down into stUtils.Utils.rands of regular hair.  <b>Your hair is no longer feathery!</b>", false);
            changes++;
            player.upperBody.head.hairType = 0;
        }
        //
        //SEXUAL CHARACTERISTICS
        //
        //MALENESS.
        if ((player.gender == 1 || player.gender == 3) && Utils.rand(1.5) == 0 && changes < changeLimit) {
            //If cocks that aren't horsified!
            if ((cockSpot.countType(CockType.HORSE) + cockSpot.countType(CockType.DEMON)) < cockSpot.count()) {
                //Transform a cock and store it's index value to talk about it.
                //Single cock
                let selectedCock: Cock = cockSpot.get(0);
                if (cockSpot.count() == 1) {
                    let cockTF: boolean = false;
                    if (selectedCock.cockType == CockType.HUMAN) {
                        MainScreen.text("\n\nYour " + CockDescriptor.describeCock(player, selectedCock) + " begins to feel strange... you pull down your pants to take a look and see it darkening as you feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your cock's base, tightening and pulling your cock inside its depths.  A hot feeling envelops your member as it suddenly grows into a horse penis, dwarfing its old size.  The skin is mottled brown and black and feels more sensitive than normal.  Your hands are irresistibly drawn to it, and you jerk yourself off, splattering cum with intense force.", false);
                        selectedCock.cockType = CockType.HORSE;
                        CockModifiers.growCock(player, selectedCock, Utils.rand(4) + 4);
                        cockTF = true;
                        player.stats.lib += 5;
                        player.stats.sens += 4;
                        player.stats.lust += 35;
                    }
                    else if (selectedCock.cockType == CockType.DOG) {
                        MainScreen.text("\n\nYour " + CockDescriptor.nounCock(CockType.DOG) + " begins to feel odd... you pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + CockDescriptor.nounCock(CockType.DOG) + " as it flattens, flaring outwards.  Your cock pushes out of your sheath, inch after inch of animal-flesh growing beyond it's traditional size.  You notice your knot vanishing, the extra flesh pushing more horsecock out from your sheath.  Your hands are drawn to the strange new " + CockDescriptor.nounCock(CockType.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.", false);
                        selectedCock.cockType = CockType.HORSE;
                        CockModifiers.growCock(player, selectedCock, Utils.rand(4) + 4);
                        cockTF = true;
                        player.stats.lib += 5;
                        player.stats.sens += 4;
                        player.stats.lust += 35;
                    }
                    else if (selectedCock.cockType == CockType.TENTACLE) {
                        MainScreen.text("\n\nYour " + CockDescriptor.describeCock(player, selectedCock) + " begins to feel odd... you pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + CockDescriptor.describeCock(player, selectedCock) + " as it flattens, flaring outwards.  Your skin folds and bunches around the base, forming an animalistic sheath.  The slick inhuman texture you recently had fades, taking on a more leathery texture.  Your hands are drawn to the strange new " + CockDescriptor.nounCock(CockType.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.", false);
                        selectedCock.cockType = CockType.HORSE;
                        CockModifiers.growCock(player, selectedCock, Utils.rand(4) + 4);
                        cockTF = true;
                        player.stats.lib += 5;
                        player.stats.sens += 4;
                        player.stats.lust += 35;
                    }
                    else if (selectedCock.cockType != CockType.HORSE && selectedCock.cockType != CockType.DEMON) {
                        MainScreen.text("\n\nYour " + CockDescriptor.describeCock(player, selectedCock) + " begins to feel odd... you pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + CockDescriptor.describeCock(player, selectedCock) + " as it flattens, flaring outwards.  Your skin folds and bunches around the base, forming an animalistic sheath.  The slick inhuman texture you recently had fades, taking on a more leathery texture.  Your hands are drawn to the strange new " + CockDescriptor.nounCock(CockType.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.", false);
                        selectedCock.cockType = CockType.HORSE;
                        CockModifiers.growCock(player, selectedCock, Utils.rand(4) + 4);
                        cockTF = true;
                        player.stats.lib += 5;
                        player.stats.sens += 4;
                        player.stats.lust += 35;
                    }
                    if (cockTF)
                        MainScreen.text("  <b>Your penis has transformed into a horse's!</b>", false);
                }
                //MULTICOCK
                else {
                    player.stats.lib += 5;
                    player.stats.sens += 4;
                    player.stats.lust += 35;
                    // Find first non horse cock
                    for (let index = 0; index < cockSpot.count(); index++)
                        if (cockSpot.get(index).cockType != CockType.HORSE && cockSpot.get(index).cockType != CockType.DEMON) {
                            selectedCock = cockSpot.get(index);
                            break;
                        }

                    selectedCock.cockType = CockType.HORSE;

                    MainScreen.text("\n\nOne of your penises begins to feel strange.  You pull down your clothes to take a look and see the skin of your " + CockDescriptor.describeCock(player, selectedCock) + " darkening to a mottled brown and black pattern.", false);

                    //Already have a sheath
                    if (cockSpot.countType(CockType.HORSE) > 1 || cockSpot.countType(CockType.DOG) > 0)
                        MainScreen.text("  Your sheath tingles and begins growing larger as the cock's base shifts to lie inside it.", false);
                    else
                        MainScreen.text("  You feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your " + CockDescriptor.describeCock(player, selectedCock) + "'s root, tightening and pulling your " + CockDescriptor.describeCock(player, selectedCock) + " inside its depths.", false);
                    CockModifiers.growCock(player, selectedCock, Utils.rand(4) + 4);
                    MainScreen.text("  The shaft suddenly explodes with movement, growing longer and developing a thick flared head leaking steady stream of animal-cum.", false);
                    MainScreen.text("  <b>You now have a horse-cock.</b>", false);
                }
                //Make cock thicker if not thick already!
                if (selectedCock.cockThickness <= 2)
                    CockModifiers.thickenCock(selectedCock, 1);
                changes++;
            }
            //Players cocks are all horse-type - increase size!
            else {
                let growthAmount: number = 0;
                //single cock
                let selectedCock: Cock;
                if (cockSpot.count() == 1) {
                    selectedCock = cockSpot.get(0);
                    growthAmount = CockModifiers.growCock(player, selectedCock, Utils.rand(3) + 1);
                    player.stats.sens += 1;
                    player.stats.lust += 10;
                }
                //Multicock
                else {
                    //Grow smallest cock!
                    selectedCock = cockSpot.listSmallestCockArea[0];
                    growthAmount = CockModifiers.growCock(player, selectedCock, Utils.rand(4) + 1);
                    player.stats.sens += 1;
                    player.stats.lust += 10;
                }
                MainScreen.text("\n\n", false);
                if (growthAmount > 2) MainScreen.text("Your " + CockDescriptor.describeCock(player, selectedCock) + " tightens painfully, inches of taut horse-flesh pouring out from your sheath as it grows longer.  Thick animal-pre forms at the flared tip, drawn out from the pleasure of the change.", false);
                if (growthAmount > 1 && growthAmount <= 2) MainScreen.text("Aching pressure builds within your sheath, suddenly releasing as an inch or more of extra dick flesh spills out.  A dollop of pre beads on the head of your enlarged " + CockDescriptor.describeCock(player, selectedCock) + " from the pleasure of the growth.", false);
                if (growthAmount <= 1) MainScreen.text("A slight pressure builds and releases as your " + CockDescriptor.describeCock(player, selectedCock) + " pushes a bit further out of your sheath.", false);
                changes++;
            }
            //Chance of thickness + daydream
            if (Utils.rand(2) == 0 && changes < changeLimit && cockSpot.countType(CockType.HORSE) > 0) {
                let selectedCock: Cock = cockSpot.listThinnestCocks[0];
                CockModifiers.thickenCock(selectedCock, 0.5);
                MainScreen.text("\n\nYour " + CockDescriptor.nounCock(CockType.HORSE) + " thickens inside its sheath, growing larger and fatter as your veins thicken, becoming more noticeable.  It feels right", false);
                if (player.stats.cor + player.stats.lib < 50)
                    MainScreen.text(" to have such a splendid tool.  You idly daydream about cunts and pussies, your " + CockDescriptor.nounCock(CockType.HORSE) + " plowing them relentlessly, stuffing them pregnant with cum", false);
                if (player.stats.cor + player.stats.lib >= 50 && player.stats.cor + player.stats.lib < 80)
                    MainScreen.text(" to be this way... You breath the powerful animalistic scent and fantasize about fucking centaurs night and day until their bellies slosh with your cum", false);
                if (player.stats.cor + player.stats.lib >= 75 && player.stats.cor + player.stats.lib <= 125)
                    MainScreen.text(" to be a rutting stud.  You ache to find a mare or centaur to breed with.  Longing to spend your evenings plunging a " + CockDescriptor.nounCock(CockType.HORSE) + " deep into their musky passages, dumping load after load of your thick animal-cum into them.  You'd be happy just fucking horsecunts morning, noon, and night.  Maybe somewhere there is a farm needing a breeder..", false);
                if (player.stats.cor + player.stats.lib > 125)
                    MainScreen.text(" to whinny loudly like a rutting stallion.  Your " + CockDescriptor.nounCock(CockType.HORSE) + " is perfect for fucking centaurs and mares.  You imagine the feel of plowing an equine pussy deeply, bottoming out and unloading sticky jets of horse-jizz into its fertile womb.  Your hand strokes your horsecock of its own accord, musky pre dripping from the flared tip with each stroke.  Your mind wanders to the thought of you with a harem of pregnant centaurs.", false);
                MainScreen.text(".", false);
                if (player.stats.cor < 30) MainScreen.text("  You shudder in revulsion at the strange thoughts and vow to control yourself better.", false);
                if (player.stats.cor >= 30 && player.stats.cor < 60) MainScreen.text("  You wonder why you thought such odd things, but they have a certain appeal.", false);
                if (player.stats.cor >= 60 && player.stats.cor < 90) MainScreen.text("  You relish your twisted fantasies, hoping to dream of them again.", false);
                if (player.stats.cor >= 90) MainScreen.text("  You flush hotly and give a twisted smile, resolving to find a fitting subject to rape and relive your fantasies.", false);
                player.stats.lib += 0.5;
                player.stats.lust += 10;
            }
            //Chance of ball growth if not 3" yet
            if (Utils.rand(2) == 0 && changes < changeLimit && player.lowerBody.ballSize <= 3 && cockSpot.countType(CockType.HORSE) > 0) {
                if (player.lowerBody.balls == 0) {
                    player.lowerBody.balls = 2;
                    player.lowerBody.ballSize = 1;
                    MainScreen.text("\n\nA nauseating pressure forms just under the base of your maleness.  With agonizing pain the flesh bulges and distends, pushing out a rounded lump of flesh that you recognize as a testicle!  A moment later relief overwhelms you as the second drops into your newly formed sack.", false);
                    player.stats.lib += 2;
                    player.stats.lust += 5;
                }
                else {
                    player.lowerBody.ballSize++;
                    if (player.lowerBody.ballSize <= 2) MainScreen.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + BallsDescriptor.describeBalls(false, true, player) + " have grown larger than a human's.", false);
                    if (player.lowerBody.ballSize > 2) MainScreen.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + BallsDescriptor.describeSack(player) + ".  Walking becomes difficult as you discover your " + BallsDescriptor.describeBalls(false, true, player) + " have enlarged again.", false);
                    player.stats.lib += 1;
                    player.stats.lust += 3;
                }
                changes++;
            }
        }
        //FEMALE
        if (player.gender == Gender.FEMALE || player.gender == Gender.HERM) {
            //Single vag
            if (vaginaSpot.count() == 1) {
                if (vaginaSpot.get(0).vaginalLooseness <= VaginaLooseness.GAPING && changes < changeLimit && Utils.rand(2) == 0) {
                    MainScreen.text("\n\nYou grip your gut in pain as you feel your organs shift slightly.  When the pressure passes, you realize your " + VaginaDescriptor.describeVagina(player, vaginaSpot.get(0)) + " has grown larger, in depth AND size.", false);
                    vaginaSpot.get(0).vaginalLooseness++;
                    changes++;
                }
                if (vaginaSpot.get(0).vaginalWetness <= VaginaWetness.NORMAL && changes < changeLimit && Utils.rand(2) == 0) {
                    MainScreen.text("\n\nYour " + VaginaDescriptor.describeVagina(player, vaginaSpot.get(0)) + " moistens perceptably, giving off an animalistic scent.", false);
                    vaginaSpot.get(0).vaginalWetness++;
                    changes++;
                }
            }
            //Multicooch
            else {
                //determine least wet
                let leastWet = vaginaSpot.WetnessLeast[0];
                if (leastWet.vaginalWetness <= VaginaWetness.NORMAL && changes < changeLimit && Utils.rand(2) == 0) {
                    MainScreen.text("\n\nOne of your " + VaginaDescriptor.describeVagina(player, leastWet) + " moistens perceptably, giving off an animalistic scent.", false);
                    leastWet.vaginalWetness++;
                    changes++;
                }
                //determine smallest
                let smallest = vaginaSpot.LoosenessLeast[0];
                if (smallest.vaginalLooseness <= VaginaLooseness.GAPING && changes < changeLimit && Utils.rand(2) == 0) {
                    MainScreen.text("\n\nYou grip your gut in pain as you feel your organs shift slightly.  When the pressure passes, you realize one of your " + VaginaDescriptor.describeVagina(player, smallest) + " has grown larger, in depth AND size.", false);
                    smallest.vaginalLooseness++;
                    changes++;
                }
            }
            if (player.statusAffects.get("Heat").value2 < 30 && Utils.rand(2) == 0 && changes < changeLimit) {
                if (CreatureChange.goIntoHeat(player)) {
                    changes++;
                }
            }

            if (!Flags.list[FlagEnum.HYPER_HAPPY]) {
                if (Utils.rand(2) == 0 && changes < changeLimit) {
                    //Shrink B's!
                    //Single row
                    let selectedBreastRow = chest.get(0);
                    if (chest.count() == 1) {
                        let majorShrinkage: boolean = false;
                        //Shrink if bigger than B cups
                        if (selectedBreastRow.breastRating > 3) {
                            selectedBreastRow.breastRating--;
                            //Shrink again if huuuuge
                            if (selectedBreastRow.breastRating > 8) {
                                majorShrinkage = true;
                                selectedBreastRow.breastRating--;
                            }
                            //Talk about shrinkage
                            if (!majorShrinkage)
                                MainScreen.text("\n\nYou feel a weight lifted from you, and realize your " + BreastDescriptor.describeBreastRow(selectedBreastRow) + " have shrunk to a " + BreastDescriptor.breastCup(selectedBreastRow.breastRating) + ".", false);
                            else
                                MainScreen.text("\n\nYou feel significantly lighter.  Looking down, you realize your breasts are MUCH smaller, down to " + BreastDescriptor.breastCup(selectedBreastRow.breastRating) + "s.", false);
                            changes++;
                        }

                    }
                    //multiple
                    else {
                        let shrinkAmount: number = 0;
                        if (chest.BreastRatingLargest[0].breastRating > 3)
                            MainScreen.text("\n", false);
                        for (let index = 0; index < chest.count(); index++) {
                            if (chest.get(index).breastRating > 3) {
                                chest.get(index).breastRating--;
                                shrinkAmount++;
                                MainScreen.text("\n", false);
                                if (index < chest.count())
                                    MainScreen.text("...and y", false);
                                else
                                    MainScreen.text("Y", false);
                                MainScreen.text("our " + BreastDescriptor.describeBreastRow(chest.get(index)) + " shrink, dropping to " + BreastDescriptor.breastCup(chest.get(index).breastRating) + "s.", false);
                            }
                        }
                        if (shrinkAmount == 2) MainScreen.text("\nYou feel so much lighter after the change.", false);
                        if (shrinkAmount == 3) MainScreen.text("\nWithout the extra weight you feel particularly limber.", false);
                        if (shrinkAmount >= 4) MainScreen.text("\nIt feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.", false);
                        if (shrinkAmount > 0) changes++;
                    }
                }
            }
        }
        //NON - GENDER SPECIFIC CHANGES
        //Tail -> Ears -> Fur -> Face
        //Centaur if hooved
        if (changes < changeLimit && Utils.rand(6) == 0 && player.lowerBody.type == LowerBodyType.HOOFED) {
            changes++;
            MainScreen.text("\n\nImmense pain overtakes you as you feel your backbone snap.  The agony doesn't stop, blacking you out as your spine lengthens, growing with new flesh from your backside as the bones of your legs flex and twist.  Muscle groups shift and rearrange themselves as the change completes, the pain dying away as your consciousness returns.  <b>You now have the lower body of a centaur</b>.", false);
            if (player.gender > 0) {
                MainScreen.text("  After taking a moment to get used to your new body, you notice that your genitals now reside between the back legs on your centaur body.", false);
            }
            player.stats.spe += 3;
            player.lowerBody.type = LowerBodyType.CENTAUR;
        }
        //Remove odd eyes
        if (changes < changeLimit && Utils.rand(5) == 0 && player.upperBody.head.face.eyeType > EyeType.HUMAN) {
            if (player.upperBody.head.face.eyeType == EyeType.BLACK_EYES_SAND_TRAP) {
                MainScreen.text("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                MainScreen.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + LowerBodyDescriptor.describeFeet(player) + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.", false);
                if (player.upperBody.head.face.eyeType == EyeType.FOUR_SPIDER_EYES) MainScreen.text("  Your multiple, arachnid eyes are gone!</b>", false);
                MainScreen.text("  <b>You have normal, humanoid eyes again.</b>", false);
            }
            player.upperBody.head.face.eyeType = EyeType.HUMAN;
            changes++;
        }
        //HorseFace - Req's Fur && Ears
        if (player.upperBody.head.face.faceType != FaceType.HORSE && player.skinType == SkinType.FUR && changes < changeLimit &&
            Utils.rand(5) == 0 && player.upperBody.head.earType == EarType.HORSE) {
            if (player.upperBody.head.face.faceType == FaceType.DOG) MainScreen.text("\n\nMind-numbing pain shatters through you as you feel your facial bones rearranging.  You clutch at your face in agony as your skin crawls and shifts, your visage reshaping to replace your dog-like playeristics with those of a horse.  <b>You now have a horse's face.</b>", false);
            else MainScreen.text("\n\nMind-numbing pain shatters through you as you feel your facial bones breaking and shifting.  You clutch at yourself in agony as you feel your skin crawl and elongate under your fingers.  Eventually the pain subsides, leaving you with a face that seamlessly blends human and equine features.  <b>You have a very equine-looking face.</b>", false);
            changes++;
            player.upperBody.head.face.faceType = FaceType.HORSE;
        }
        //Fur - if has horsetail && ears and not at changelimit
        if (player.skinType != SkinType.FUR && changes < changeLimit &&
            Utils.rand(4) == 0 && player.lowerBody.tailType == TailType.HORSE) {
            if (player.skinType == SkinType.PLAIN) MainScreen.text("\n\nAn itchy feeling springs up over every inch of your skin.  As you scratch yourself madly, you feel fur grow out of your skin until <b>you have a fine coat of " + player.upperBody.head.hairColor + "-colored fur.</b>", false);
            if (player.skinType == SkinType.SCALES) {
                player.skinDesc = "fur";
                MainScreen.text("\n\nYour " + player.skinTone + " scales begin to itch insufferably.  You reflexively scratch yourself, setting off an avalanche of discarded scales.  The itching intensifies as you madly scratch and tear at yourself, revealing a coat of " + player.upperBody.head.hairColor + " " + player.skinDesc + ".  At last the itching stops as <b>you brush a few more loose scales from your new coat of fur.</b>", false);
            }
            changes++;
            player.skinType = SkinType.FUR;
            player.skinDesc = "fur";
        }
        //Ears - requires tail
        if (player.upperBody.head.earType != EarType.HORSE && player.lowerBody.tailType == TailType.HORSE && changes < changeLimit &&
            Utils.rand(3) == 0) {
            if (player.upperBody.head.earType == -1) MainScreen.text("\n\nTwo painful lumps sprout on the top of your head, forming into tear-drop shaped ears, covered with short fur.  ", false);
            if (player.upperBody.head.earType == EarType.HUMAN) MainScreen.text("\n\nYour ears tug painfully on your face as they begin shifting, moving upwards to the top of your head and transforming into a upright animalistic ears.  ", false);
            if (player.upperBody.head.earType == EarType.DOG) MainScreen.text("\n\nYour ears change shape, morphing into from their doglike shape into equine-like ears!  ", false);
            if (player.upperBody.head.earType > EarType.DOG) MainScreen.text("\n\nYour ears change shape, morphing into teardrop-shaped horse ears!  ", false);
            player.upperBody.head.earType = EarType.HORSE;
            player.upperBody.head.earValue = 0;
            MainScreen.text("<b>You now have horse ears.</b>", false);
            changes++;
        }
        //Tail - no-prereq
        if (player.lowerBody.tailType != TailType.HORSE && Utils.rand(2) == 0 && changes < changeLimit) {
            //no tail
            if (player.lowerBody.tailType == 0) {
                MainScreen.text("\n\nThere is a sudden tickling on your ass, and you notice you have sprouted a long shiny horsetail of the same " + player.upperBody.head.hairColor + " color as your hair.", false);
            }
            //if other animal tail
            if (player.lowerBody.tailType > TailType.HORSE && player.lowerBody.tailType <= TailType.COW) {
                MainScreen.text("\n\nPain lances up your " + ButtDescriptor.describeButthole(player) + " as your tail shifts and morphs disgustingly.  With one last wave of pain, it splits into hundreds of tiny filaments, transforming into a horsetail.", false);
            }
            //if bee/spider-butt.
            if ((player.lowerBody.tailType > TailType.COW && player.lowerBody.tailType < TailType.SHARK)) {
                MainScreen.text("\n\nYour insect-like abdomen bunches up as it begins shrinking, exoskeleton flaking off like a snake sheds its skin.  It bunches up until it is as small as a tennis ball, then explodes outwards, growing into an animalistic tail shape.  Moments later, it explodes into filaments of pain, dividing into hundreds of stUtils.Utils.rands and turning into a shiny horsetail.", false);
            }
            if (player.lowerBody.tailType >= TailType.SHARK) {
                MainScreen.text("\n\nPain lances up your " + ButtDescriptor.describeButthole(player) + " as your tail shifts and morphs disgustingly.  With one last wave of pain, it splits into hundreds of tiny filaments, transforming into a horsetail.", false);
            }
            MainScreen.text("  <b>You now have a horse-tail.</b>", false);
            player.lowerBody.tailType = TailType.HORSE;
            player.lowerBody.tailVenom = 0;
            player.lowerBody.tailRecharge = 0;
            changes++;
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        if (Utils.rand(3) == 0) MainScreen.text(player.modTone(60, 1), false);
        //FAILSAFE CHANGE
        if (changes == 0) {
            MainScreen.text("\n\nInhuman vitality spreads through your body, invigorating you!\n", false);
            CreatureChange.HPChange(player, 20);
            player.stats.lust += 3;
        }

    }
}