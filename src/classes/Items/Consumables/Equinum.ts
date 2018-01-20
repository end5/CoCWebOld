import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import { ArmType } from '../../Body/Arms';
import BreastRow from '../../Body/BreastRow';
import Cock, { CockType } from '../../Body/Cock';
import { Gender } from '../../Body/Creature';
import { EarType } from '../../Body/Ears';
import { EyeType } from '../../Body/Eyes';
import { FaceType } from '../../Body/Face';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import Vagina, { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import Character from '../../Character/Character';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import BodyModifier from '../../Modifiers/BodyModifier';
import CockModifier from '../../Modifiers/CockModifier';
import StatModifier from '../../Modifiers/StatModifier';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class Equinum extends Consumable {
    public constructor() {
        super(ConsumableName.Equinum, new ItemDesc("Equinum", "a vial of Equinum", "This is a long flared vial with a small label that reads, \"<i>Equinum</i>\".  It is likely this potion is tied to horses in some way."));
    }

    public warning(character: Character) {
        if (character.skin.type === SkinType.FUR && character.torso.neck.head.face.type === FaceType.HORSE && character.torso.tails.filterType(TailType.HORSE).length >= 1 && (character.torso.hips.legs.type !== LegType.HOOFED)) {
            // WARNINGS
            // Repeat warnings
            if (character.statusAffects.has(StatusAffectType.HorseWarning) && Utils.rand(3) === 0) {
                if (character.statusAffects.get(StatusAffectType.HorseWarning).value1 === 0) DisplayText("<b>\n\nYou feel a creeping chill down your back as your entire body shivers, as if rejecting something foreign.  Maybe you ought to cut back on the horse potions.</b>");
                if (character.statusAffects.get(StatusAffectType.HorseWarning).value1 > 0) DisplayText("<b>\n\nYou wonder how many more of these you can drink before you become a horse...</b>");
                character.statusAffects.get(StatusAffectType.HorseWarning).value1 = 1;
            }
            // First warning
            if (!character.statusAffects.has(StatusAffectType.HorseWarning)) {
                DisplayText("<b>\n\nWhile you drink the tasty potion, you realize how horse-like you already are, and wonder what else the potion could possibly change...</b>");
                character.statusAffects.set(StatusAffectType.HorseWarning, StatusAffectFactory.create(StatusAffectType.HorseWarning, 0, 0, 0, 0));
            }
            // Bad End
            if (Utils.rand(4) === 0 && character.statusAffects.has(StatusAffectType.HorseWarning)) {
                // Must have been warned first...
                if (character.statusAffects.get(StatusAffectType.HorseWarning).value1 > 0) {
                    // If player has dicks check for horsedicks
                    if (character.torso.cocks.count > 0) {
                        // If player has horsedicks
                        if (character.torso.cocks.filterType(CockType.HORSE).length > 0) {
                            DisplayText("\n\nSoon after you drink the Equinum, a burning sensation fills your chest. You have consumed too much of the potion, and the overdose starts to provoke dramatic changes in your body.  You collapse suddenly, twitching in pain as all the bones and muscles in your body break and reform. Eventually, you pass out from the strain you are put through.\n\nYou wake up after a few minutes. Once you get up on your legs, doubt fills your mind. You rush to a nearby pond and look down, nearly jumping when the reflection of a ");
                            if (character.gender === 0 || character.gender === 3) DisplayText("horse ");
                            if (character.gender === 1) DisplayText("stallion ");
                            if (character.gender === 2) DisplayText("mare ");
                            DisplayText(" with beautiful " + character.torso.neck.head.hair.color + " " + character.skin.desc + " covering its body gazes back up at you.  That's you, and yet the doubt in your mind remains. Strange images fill your mind, and you feel as if you have not always been a horse, but some kind of funny fur-less creature standing on two legs. Your equine mind rapidly dismisses that doubt as a daydream however, and you trot away, oblivious to who you once were.\n\n");
                            DisplayText("<b>One year later...</b>\n\nAs you graze upon the small plants that coat the open plains of your home, you hear a noise on your right side. As you raise your head to check where the noise comes from, preparing to run from a potential predator, you see a strange creature. It stands on its two feet, its furless pink skin appearing beneath its clothes.  With a start, you realize you can identify the strange creatures gender.  ");
                            if (character.gender === 0 || character.gender === 1) DisplayText("He is clearly a male, but you are somewhat confused as you can see not one but three bulges where his manhood would be.\n\n");
                            if (character.gender === 2) DisplayText("She is clearly a female, as you can see her six breasts jiggle as she walks towards you, small stains appearing on her shirt where her nipples are.\n\n");
                            if (character.gender === 3) DisplayText("You are somewhat confused as you can see a bulge near her thighs but also huge boobs jiggling as she walks, and you can't say if she's a male or female.\n\n");
                            DisplayText("As soon as you lay eyes on the creature, a wave of nostalgia overtakes you. Somehow, looking at that creature makes you sad, as if you forgot something important.\n\n\"<i>How strange to see a horse here all alone,</i>\" the creature muses, \"<i>In any case, you're still the least bizarre creature I've met here.  Not to mention the only one that hasn't tried to rape me,</i>\" it says with a sigh.\n\nYou answer with an interrogative whinny.\n\n\"<i>Hey, I've got an idea. I'll take you back to the camp. I'll feed you and in return you can help me complete my quest. What do you say?</i>\"\n\nInstinctively, you utter a happy and approving whinny.\n\nYou failed in your quest, losing your focus and more importantly, losing yourself.  But, even so, you found a new meaning to your life, and have a new chance to succeed where you once failed.");
                            Game.gameOver();
                            return;
                        }
                    }
                    // If player has no cocks
                    else {
                        DisplayText("\n\nSoon after you drink the Equinum, a burning sensation fills your chest. You have consumed too much of the drink, and the overdose starts to provoke dramatic changes in your body.  You collapse suddenly, twitching in pain as all the bones and all the muscles in your body break and reform. Eventually, you pass out from the strain you are put through.\n\nYou wake up after a few minutes. Once you get up on your legs, doubt fills your mind. You rush to a nearby pond and look down, nearly jumping when the reflection of a ");
                        if (character.gender === 0 || character.gender === 3) DisplayText("horse ");
                        if (character.gender === 1) DisplayText("stallion ");
                        if (character.gender === 2) DisplayText("mare ");
                        DisplayText("with beautiful " + character.torso.neck.head.hair.color + " " + character.skin.desc + " covering its body looks back at you.  That's you, and yet the doubt in your mind remains. Strange mental images fill your mind.  You feel as if you have not always been a horse, but some kind of funny fur-less creature standing on two legs. But your equine mind rapidly dismisses that doubt as a daydream, and you trot away, oblivious to who you once were.\n\n");
                        DisplayText("<b>One year after...</b>\n\nAs you graze small plants in the open plains that became your home, you hear a noise on your right side. As you raise your head to check where the noise comes from, preparing to run from a potential predator, you see a strange creature. It stands on two feet, its furless pink skin appearing beneath its clothes.  ");
                        if (character.gender === 0 || character.gender === 1) DisplayText("He is clearly a male, but you are somewhat confused as you can see not one but three bulges where his manhood would be.\n\n");
                        if (character.gender === 2) DisplayText("She is clearly a female, as you can see her six breasts jiggle as she walks towards you, small stains appearing on her shirt where her nipples are.\n\n");
                        if (character.gender === 3) DisplayText("You are somewhat confused as you can see a bulge near her thighs but also huge boobs jiggling as she walks, and you can't say if she's a male or female.\n\n");
                        DisplayText("As soon as you lay eyes on the creature, a wave of nostalgia overtakes you. Somehow, looking at that creature makes you sad, as if you forgot something important.\n\n\"<i>How strange to see a horse here all alone,</i>\" the creature muses, \"<i>In any case, you're still the least bizarre creature I've met here.  Not to mention the only one that hasn't tried to rape me,</i>\" it says with a sigh.\n\nYou answer with an interrogative whinny.\n\n\"<i>Hey, I've got an idea. I'll take you back to the camp. I'll feed you and in return you can help me to complete my quest. What do you say?</i>\"\n\nInstictively, you utter a happy and approving whinny.\n\nYou failed in your quest, losing you focus and more importantly, losing yourself.  But, even so, you found a new meaning to your life, and have a new chance to achieve what you once failed.");
                        Game.gameOver();
                        return;
                    }
                }
            }
        }
    }

    public use(character: Character) {
        character.slimeFeed();
        const cocks = character.torso.cocks;
        const vaginas = character.torso.vaginas;
        const chest = character.torso.chest;
        // Changes done
        let changes: number = 0;
        // Change limit
        let changeLimit: number = 1;
        // Chance to raise limit
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(3) === 0) changeLimit++;
        if (character.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        // Used for Utils.random chances
        // Set up output
        DisplayText().clear();
        DisplayText("You down the potion, grimacing at the strong taste.");
        // CHANCE OF BAD END - 20% if face/tail/skin/cock are appropriate.
        // If hooved bad end doesn't appear till centaured
        this.warning(character);
        // Stat changes first
        // STRENGTH
        if (Utils.rand(2) === 0) {
            // Maxxed
            if (character.stats.str >= 60) {
                DisplayText("\n\nYou feel strong enough to single-handedly pull a fully-loaded wagon.");
            }
            // NOT MAXXED
            else {
                character.stats.str += 1;
                DisplayText("\n\nYour muscles clench and surge, making you feel as strong as a horse.");
                changes++;
            }
        }
        // TOUGHNESS
        if (Utils.rand(2) === 0) {
            // MAXXED ALREADY
            if (character.stats.tou >= 75) {
                DisplayText("\n\nYour body is as tough and solid as a ");
                if (character.gender === Gender.MALE || character.gender === Gender.HERM)
                    DisplayText("stallion's.");
                else
                    DisplayText("mare's.");
            }
            // NOT MAXXED
            else {
                character.stats.tou += 1.25;
                DisplayText("\n\nYour body suddenly feels tougher and more resilient.");
                changes++;
            }
        }
        // INTELLECT
        if (Utils.rand(3) === 0) {
            if (character.stats.int <= 5) {
                DisplayText("\n\nYou let out a throaty \"Neiiiigh\" as your animalistic instincts take over.");
            }
            if (character.stats.int < 10 && character.stats.int > 5) {
                character.stats.int += -1;
                DisplayText("\n\nYou smile vacantly as you drink the potion, knowing you're just a big dumb animal who loves to fuck.");
                changes++;
            }
            if (character.stats.int <= 20 && character.stats.int >= 10) {
                character.stats.int += -2;
                DisplayText("\n\nYou find yourself looking down at the empty bottle in your hand and realize you haven't thought ANYTHING since your first sip.");
                changes++;
            }
            if (character.stats.int <= 30 && character.stats.int > 20) {
                character.stats.int += -3;
                DisplayText("\n\nYou smile broadly as your cares seem to melt away.  A small part of you worries that you're getting dumber.");
                changes++;
            }
            if (character.stats.int <= 50 && character.stats.int > 30) {
                character.stats.int += -4;
                DisplayText("\n\nIt becomes harder to keep your mind focused as your intellect diminishes.");
                changes++;
            }
            if (character.stats.int > 50) {
                character.stats.int += -5;
                DisplayText("\n\nYour usually intelligent mind feels much more sluggish.");
                changes++;
            }
        }
        // -Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && character.torso.arms.type === ArmType.HARPY && Utils.rand(4) === 0) {
            DisplayText("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating.  The wing-like shape your arms once had is gone in a matter of moments, leaving " + character.skin.desc + " behind.");
            character.torso.arms.type = ArmType.HUMAN;
            changes++;
        }
        // -Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && character.torso.arms.type === ArmType.SPIDER && Utils.rand(4) === 0) {
            DisplayText("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away.  The glossy black coating is soon gone, leaving " + character.skin.desc + " behind.");
            character.torso.arms.type = ArmType.HUMAN;
            changes++;
        }
        // -Remove feathery hair (copy for equinum, canine peppers, Labova)
        if (changes < changeLimit && character.torso.neck.head.hair.type === 1 && Utils.rand(4) === 0) {
            // (long):
            if (character.torso.neck.head.hair.length >= 6) DisplayText("\n\nA lock of your downy-soft feather-hair droops over your eye.  Before you can blow the offending down away, you realize the feather is collapsing in on itself.  It continues to curl inward until all that remains is a normal stUtils.Utils.rand of hair.  <b>Your hair is no longer feathery!</b>");
            // (short)
            else DisplayText("\n\nYou run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested.  While your hand is up there, it detects a change in the texture of your feathers.  They're completely disappearing, merging down into stUtils.Utils.rands of regular hair.  <b>Your hair is no longer feathery!</b>");
            changes++;
            character.torso.neck.head.hair.type = 0;
        }
        //
        // SEXUAL CHARACTERISTICS
        //
        // MALENESS.
        if ((character.gender === 1 || character.gender === 3) && Utils.rand(1.5) === 0 && changes < changeLimit) {
            // If cocks that aren't horsified!
            if ((cocks.filterType(CockType.HORSE).length + cocks.filterType(CockType.DEMON).length) < cocks.count) {
                // Transform a cock and store it's index value to talk about it.
                // Single cock
                let selectedCock: Cock = cocks.get(0);
                if (cocks.count === 1) {
                    let cockTF: boolean = false;
                    if (selectedCock.type === CockType.HUMAN) {
                        DisplayText("\n\nYour " + CockDescriptor.describeCock(character, selectedCock) + " begins to feel strange... you pull down your pants to take a look and see it darkening as you feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your cock's base, tightening and pulling your cock inside its depths.  A hot feeling envelops your member as it suddenly grows into a horse penis, dwarfing its old size.  The skin is mottled brown and black and feels more sensitive than normal.  Your hands are irresistibly drawn to it, and you jerk yourself off, splattering cum with intense force.");
                        selectedCock.type = CockType.HORSE;
                        CockModifier.growCock(character, selectedCock, Utils.rand(4) + 4);
                        cockTF = true;
                        character.stats.lib += 5;
                        character.stats.sens += 4;
                        character.stats.lust += 35;
                    }
                    else if (selectedCock.type === CockType.DOG) {
                        DisplayText("\n\nYour " + CockDescriptor.nounCock(CockType.DOG) + " begins to feel odd... you pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + CockDescriptor.nounCock(CockType.DOG) + " as it flattens, flaring outwards.  Your cock pushes out of your sheath, inch after inch of animal-flesh growing beyond it's traditional size.  You notice your knot vanishing, the extra flesh pushing more horsecock out from your sheath.  Your hands are drawn to the strange new " + CockDescriptor.nounCock(CockType.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.");
                        selectedCock.type = CockType.HORSE;
                        CockModifier.growCock(character, selectedCock, Utils.rand(4) + 4);
                        cockTF = true;
                        character.stats.lib += 5;
                        character.stats.sens += 4;
                        character.stats.lust += 35;
                    }
                    else if (selectedCock.type === CockType.TENTACLE) {
                        DisplayText("\n\nYour " + CockDescriptor.describeCock(character, selectedCock) + " begins to feel odd... you pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + CockDescriptor.describeCock(character, selectedCock) + " as it flattens, flaring outwards.  Your skin folds and bunches around the base, forming an animalistic sheath.  The slick inhuman texture you recently had fades, taking on a more leathery texture.  Your hands are drawn to the strange new " + CockDescriptor.nounCock(CockType.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.");
                        selectedCock.type = CockType.HORSE;
                        CockModifier.growCock(character, selectedCock, Utils.rand(4) + 4);
                        cockTF = true;
                        character.stats.lib += 5;
                        character.stats.sens += 4;
                        character.stats.lust += 35;
                    }
                    else if (selectedCock.type !== CockType.HORSE && selectedCock.type !== CockType.DEMON) {
                        DisplayText("\n\nYour " + CockDescriptor.describeCock(character, selectedCock) + " begins to feel odd... you pull down your clothes to take a look and see it darkening.  You feel a growing tightness in the tip of your " + CockDescriptor.describeCock(character, selectedCock) + " as it flattens, flaring outwards.  Your skin folds and bunches around the base, forming an animalistic sheath.  The slick inhuman texture you recently had fades, taking on a more leathery texture.  Your hands are drawn to the strange new " + CockDescriptor.nounCock(CockType.HORSE) + ", and you jerk yourself off, splattering thick ropes of cum with intense force.");
                        selectedCock.type = CockType.HORSE;
                        CockModifier.growCock(character, selectedCock, Utils.rand(4) + 4);
                        cockTF = true;
                        character.stats.lib += 5;
                        character.stats.sens += 4;
                        character.stats.lust += 35;
                    }
                    if (cockTF)
                        DisplayText("  <b>Your penis has transformed into a horse's!</b>");
                }
                // MULTICOCK
                else {
                    character.stats.lib += 5;
                    character.stats.sens += 4;
                    character.stats.lust += 35;
                    // Find first non horse cock
                    for (let index = 0; index < cocks.count; index++)
                        if (cocks.get(index).type !== CockType.HORSE && cocks.get(index).type !== CockType.DEMON) {
                            selectedCock = cocks.get(index);
                            break;
                        }

                    selectedCock.type = CockType.HORSE;

                    DisplayText("\n\nOne of your penises begins to feel strange.  You pull down your clothes to take a look and see the skin of your " + CockDescriptor.describeCock(character, selectedCock) + " darkening to a mottled brown and black pattern.");

                    // Already have a sheath
                    if (cocks.filterType(CockType.HORSE).length > 1 || cocks.filterType(CockType.DOG).length > 0)
                        DisplayText("  Your sheath tingles and begins growing larger as the cock's base shifts to lie inside it.");
                    else
                        DisplayText("  You feel a tightness near the base where your skin seems to be bunching up.  A sheath begins forming around your " + CockDescriptor.describeCock(character, selectedCock) + "'s root, tightening and pulling your " + CockDescriptor.describeCock(character, selectedCock) + " inside its depths.");
                    CockModifier.growCock(character, selectedCock, Utils.rand(4) + 4);
                    DisplayText("  The shaft suddenly explodes with movement, growing longer and developing a thick flared head leaking steady stream of animal-cum.");
                    DisplayText("  <b>You now have a horse-cock.</b>");
                }
                // Make cock thicker if not thick already!
                if (selectedCock.thickness <= 2)
                    CockModifier.thickenCock(selectedCock, 1);
                changes++;
            }
            // Characters cocks are all horse-type - increase size!
            else {
                let growthAmount: number = 0;
                // single cock
                let selectedCock: Cock;
                if (cocks.count === 1) {
                    selectedCock = cocks.get(0);
                    growthAmount = CockModifier.growCock(character, selectedCock, Utils.rand(3) + 1);
                    character.stats.sens += 1;
                    character.stats.lust += 10;
                }
                // Multicock
                else {
                    // Grow smallest cock!
                    selectedCock = cocks.sort(Cock.SmallestCockArea)[0];
                    growthAmount = CockModifier.growCock(character, selectedCock, Utils.rand(4) + 1);
                    character.stats.sens += 1;
                    character.stats.lust += 10;
                }
                DisplayText("\n\n");
                if (growthAmount > 2) DisplayText("Your " + CockDescriptor.describeCock(character, selectedCock) + " tightens painfully, inches of taut horse-flesh pouring out from your sheath as it grows longer.  Thick animal-pre forms at the flared tip, drawn out from the pleasure of the change.");
                if (growthAmount > 1 && growthAmount <= 2) DisplayText("Aching pressure builds within your sheath, suddenly releasing as an inch or more of extra dick flesh spills out.  A dollop of pre beads on the head of your enlarged " + CockDescriptor.describeCock(character, selectedCock) + " from the pleasure of the growth.");
                if (growthAmount <= 1) DisplayText("A slight pressure builds and releases as your " + CockDescriptor.describeCock(character, selectedCock) + " pushes a bit further out of your sheath.");
                changes++;
            }
            // Chance of thickness + daydream
            if (Utils.rand(2) === 0 && changes < changeLimit && cocks.filterType(CockType.HORSE).length > 0) {
                const selectedCock: Cock = cocks.sort(Cock.ThinnestCocks)[0];
                CockModifier.thickenCock(selectedCock, 0.5);
                DisplayText("\n\nYour " + CockDescriptor.nounCock(CockType.HORSE) + " thickens inside its sheath, growing larger and fatter as your veins thicken, becoming more noticeable.  It feels right");
                if (character.stats.cor + character.stats.lib < 50)
                    DisplayText(" to have such a splendid tool.  You idly daydream about cunts and pussies, your " + CockDescriptor.nounCock(CockType.HORSE) + " plowing them relentlessly, stuffing them pregnant with cum");
                if (character.stats.cor + character.stats.lib >= 50 && character.stats.cor + character.stats.lib < 80)
                    DisplayText(" to be this way... You breath the powerful animalistic scent and fantasize about fucking centaurs night and day until their bellies slosh with your cum");
                if (character.stats.cor + character.stats.lib >= 75 && character.stats.cor + character.stats.lib <= 125)
                    DisplayText(" to be a rutting stud.  You ache to find a mare or centaur to breed with.  Longing to spend your evenings plunging a " + CockDescriptor.nounCock(CockType.HORSE) + " deep into their musky passages, dumping load after load of your thick animal-cum into them.  You'd be happy just fucking horsecunts morning, noon, and night.  Maybe somewhere there is a farm needing a breeder..");
                if (character.stats.cor + character.stats.lib > 125)
                    DisplayText(" to whinny loudly like a rutting stallion.  Your " + CockDescriptor.nounCock(CockType.HORSE) + " is perfect for fucking centaurs and mares.  You imagine the feel of plowing an equine pussy deeply, bottoming out and unloading sticky jets of horse-jizz into its fertile womb.  Your hand strokes your horsecock of its own accord, musky pre dripping from the flared tip with each stroke.  Your mind wanders to the thought of you with a harem of pregnant centaurs.");
                DisplayText(".");
                if (character.stats.cor < 30) DisplayText("  You shudder in revulsion at the strange thoughts and vow to control yourself better.");
                if (character.stats.cor >= 30 && character.stats.cor < 60) DisplayText("  You wonder why you thought such odd things, but they have a certain appeal.");
                if (character.stats.cor >= 60 && character.stats.cor < 90) DisplayText("  You relish your twisted fantasies, hoping to dream of them again.");
                if (character.stats.cor >= 90) DisplayText("  You flush hotly and give a twisted smile, resolving to find a fitting subject to rape and relive your fantasies.");
                character.stats.lib += 0.5;
                character.stats.lust += 10;
            }
            // Chance of ball growth if not 3" yet
            if (Utils.rand(2) === 0 && changes < changeLimit && character.torso.balls.size <= 3 && cocks.filterType(CockType.HORSE).length > 0) {
                if (character.torso.balls.quantity === 0) {
                    character.torso.balls.quantity = 2;
                    character.torso.balls.size = 1;
                    DisplayText("\n\nA nauseating pressure forms just under the base of your maleness.  With agonizing pain the flesh bulges and distends, pushing out a rounded lump of flesh that you recognize as a testicle!  A moment later relief overwhelms you as the second drops into your newly formed sack.");
                    character.stats.lib += 2;
                    character.stats.lust += 5;
                }
                else {
                    character.torso.balls.size++;
                    if (character.torso.balls.size <= 2) DisplayText("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + BallsDescriptor.describeBalls(false, true, character) + " have grown larger than a human's.");
                    if (character.torso.balls.size > 2) DisplayText("\n\nA sudden onset of heat envelops your groin, focusing on your " + BallsDescriptor.describeSack(character) + ".  Walking becomes difficult as you discover your " + BallsDescriptor.describeBalls(false, true, character) + " have enlarged again.");
                    character.stats.lib += 1;
                    character.stats.lust += 3;
                }
                changes++;
            }
        }
        // FEMALE
        if (character.gender === Gender.FEMALE || character.gender === Gender.HERM) {
            // Single vag
            if (vaginas.count === 1) {
                if (vaginas.get(0).looseness <= VaginaLooseness.GAPING && changes < changeLimit && Utils.rand(2) === 0) {
                    DisplayText("\n\nYou grip your gut in pain as you feel your organs shift slightly.  When the pressure passes, you realize your " + VaginaDescriptor.describeVagina(character, vaginas.get(0)) + " has grown larger, in depth AND size.");
                    vaginas.get(0).looseness++;
                    changes++;
                }
                if (vaginas.get(0).wetness <= VaginaWetness.NORMAL && changes < changeLimit && Utils.rand(2) === 0) {
                    DisplayText("\n\nYour " + VaginaDescriptor.describeVagina(character, vaginas.get(0)) + " moistens perceptably, giving off an animalistic scent.");
                    vaginas.get(0).wetness++;
                    changes++;
                }
            }
            // Multicooch
            else {
                // determine least wet
                const leastWet = vaginas.sort(Vagina.WetnessLeast)[0];
                if (leastWet.wetness <= VaginaWetness.NORMAL && changes < changeLimit && Utils.rand(2) === 0) {
                    DisplayText("\n\nOne of your " + VaginaDescriptor.describeVagina(character, leastWet) + " moistens perceptably, giving off an animalistic scent.");
                    leastWet.wetness++;
                    changes++;
                }
                // determine smallest
                const smallest = vaginas.sort(Vagina.LoosenessLeast)[0];
                if (smallest.looseness <= VaginaLooseness.GAPING && changes < changeLimit && Utils.rand(2) === 0) {
                    DisplayText("\n\nYou grip your gut in pain as you feel your organs shift slightly.  When the pressure passes, you realize one of your " + VaginaDescriptor.describeVagina(character, smallest) + " has grown larger, in depth AND size.");
                    smallest.looseness++;
                    changes++;
                }
            }
            if (character.statusAffects.get(StatusAffectType.Heat).value2 < 30 && Utils.rand(2) === 0 && changes < changeLimit) {
                if (BodyModifier.displayGoIntoHeat(character)) {
                    changes++;
                }
            }

            if (!Flags.list[FlagEnum.HYPER_HAPPY]) {
                if (Utils.rand(2) === 0 && changes < changeLimit) {
                    // Shrink B's!
                    // Single row
                    const selectedBreastRow = chest.get(0);
                    if (chest.count === 1) {
                        let majorShrinkage: boolean = false;
                        // Shrink if bigger than B cups
                        if (selectedBreastRow.rating > 3) {
                            selectedBreastRow.rating--;
                            // Shrink again if huuuuge
                            if (selectedBreastRow.rating > 8) {
                                majorShrinkage = true;
                                selectedBreastRow.rating--;
                            }
                            // Talk about shrinkage
                            if (!majorShrinkage)
                                DisplayText("\n\nYou feel a weight lifted from you, and realize your " + BreastDescriptor.describeBreastRow(selectedBreastRow) + " have shrunk to a " + BreastDescriptor.breastCup(selectedBreastRow.rating) + ".");
                            else
                                DisplayText("\n\nYou feel significantly lighter.  Looking down, you realize your breasts are MUCH smaller, down to " + BreastDescriptor.breastCup(selectedBreastRow.rating) + "s.");
                            changes++;
                        }

                    }
                    // multiple
                    else {
                        let shrinkAmount: number = 0;
                        if (chest.sort(BreastRow.BreastRatingLargest)[0].rating > 3)
                            DisplayText("\n");
                        for (let index = 0; index < chest.count; index++) {
                            if (chest.get(index).rating > 3) {
                                chest.get(index).rating--;
                                shrinkAmount++;
                                DisplayText("\n");
                                if (index < chest.count)
                                    DisplayText("...and y");
                                else
                                    DisplayText("Y");
                                DisplayText("our " + BreastDescriptor.describeBreastRow(chest.get(index)) + " shrink, dropping to " + BreastDescriptor.breastCup(chest.get(index).rating) + "s.");
                            }
                        }
                        if (shrinkAmount === 2) DisplayText("\nYou feel so much lighter after the change.");
                        if (shrinkAmount === 3) DisplayText("\nWithout the extra weight you feel particularly limber.");
                        if (shrinkAmount >= 4) DisplayText("\nIt feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.");
                        if (shrinkAmount > 0) changes++;
                    }
                }
            }
        }
        // NON - GENDER SPECIFIC CHANGES
        // Tail -> Ears -> Fur -> Face
        // Centaur if hooved
        if (changes < changeLimit && Utils.rand(6) === 0 && character.torso.hips.legs.type === LegType.HOOFED) {
            changes++;
            DisplayText("\n\nImmense pain overtakes you as you feel your backbone snap.  The agony doesn't stop, blacking you out as your spine lengthens, growing with new flesh from your backside as the bones of your legs flex and twist.  Muscle groups shift and rearrange themselves as the change completes, the pain dying away as your consciousness returns.  <b>You now have the lower body of a centaur</b>.");
            if (character.gender > 0) {
                DisplayText("  After taking a moment to get used to your new body, you notice that your genitals now reside between the back legs on your centaur body.");
            }
            character.stats.spe += 3;
            character.torso.hips.legs.type = LegType.CENTAUR;
        }
        // Remove odd eyes
        if (changes < changeLimit && Utils.rand(5) === 0 && character.torso.neck.head.face.eyes.type > EyeType.HUMAN) {
            if (character.torso.neck.head.face.eyes.type === EyeType.BLACK_EYES_SAND_TRAP) {
                DisplayText("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                DisplayText("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + LowerBodyDescriptor.describeFeet(character) + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.");
                if (character.torso.neck.head.face.eyes.type === EyeType.FOUR_SPIDER_EYES) DisplayText("  Your multiple, arachnid eyes are gone!</b>");
                DisplayText("  <b>You have normal, humanoid eyes again.</b>");
            }
            character.torso.neck.head.face.eyes.type = EyeType.HUMAN;
            changes++;
        }
        // HorseFace - Req's Fur && Ears
        if (character.torso.neck.head.face.type !== FaceType.HORSE && character.skin.type === SkinType.FUR && changes < changeLimit &&
            Utils.rand(5) === 0 && character.torso.neck.head.ears.type === EarType.HORSE) {
            if (character.torso.neck.head.face.type === FaceType.DOG) DisplayText("\n\nMind-numbing pain shatters through you as you feel your facial bones rearranging.  You clutch at your face in agony as your skin crawls and shifts, your visage reshaping to replace your dog-like playeristics with those of a horse.  <b>You now have a horse's face.</b>");
            else DisplayText("\n\nMind-numbing pain shatters through you as you feel your facial bones breaking and shifting.  You clutch at yourself in agony as you feel your skin crawl and elongate under your fingers.  Eventually the pain subsides, leaving you with a face that seamlessly blends human and equine features.  <b>You have a very equine-looking face.</b>");
            changes++;
            character.torso.neck.head.face.type = FaceType.HORSE;
        }
        // Fur - if has horsetail && ears and not at changelimit
        if (character.skin.type !== SkinType.FUR && changes < changeLimit &&
            Utils.rand(4) === 0 && character.torso.tails.filterType(TailType.HORSE).length >= 1) {
            if (character.skin.type === SkinType.PLAIN) DisplayText("\n\nAn itchy feeling springs up over every inch of your skin.  As you scratch yourself madly, you feel fur grow out of your skin until <b>you have a fine coat of " + character.torso.neck.head.hair.color + "-colored fur.</b>");
            if (character.skin.type === SkinType.SCALES) {
                character.skin.desc = "fur";
                DisplayText("\n\nYour " + character.skin.tone + " scales begin to itch insufferably.  You reflexively scratch yourself, setting off an avalanche of discarded scales.  The itching intensifies as you madly scratch and tear at yourself, revealing a coat of " + character.torso.neck.head.hair.color + " " + character.skin.desc + ".  At last the itching stops as <b>you brush a few more loose scales from your new coat of fur.</b>");
            }
            changes++;
            character.skin.type = SkinType.FUR;
            character.skin.desc = "fur";
        }
        // Ears - requires tail
        if (character.torso.neck.head.ears.type !== EarType.HORSE && character.torso.tails.filterType(TailType.HORSE).length >= 1 && changes < changeLimit &&
            Utils.rand(3) === 0) {
            if (character.torso.neck.head.ears.type === -1) DisplayText("\n\nTwo painful lumps sprout on the top of your head, forming into tear-drop shaped ears, covered with short fur.  ");
            if (character.torso.neck.head.ears.type === EarType.HUMAN) DisplayText("\n\nYour ears tug painfully on your face as they begin shifting, moving upwards to the top of your head and transforming into a upright animalistic ears.  ");
            if (character.torso.neck.head.ears.type === EarType.DOG) DisplayText("\n\nYour ears change shape, morphing into from their doglike shape into equine-like ears!  ");
            if (character.torso.neck.head.ears.type > EarType.DOG) DisplayText("\n\nYour ears change shape, morphing into teardrop-shaped horse ears!  ");
            character.torso.neck.head.ears.type = EarType.HORSE;
            character.torso.neck.head.ears.value = 0;
            DisplayText("<b>You now have horse ears.</b>");
            changes++;
        }
        // Tail - no-prereq
        if (character.torso.tails.filterType(TailType.HORSE).length < 0 && Utils.rand(2) === 0 && changes < changeLimit) {
            // no tail
            if (character.torso.tails.count === 0) {
                DisplayText("\n\nThere is a sudden tickling on your ass, and you notice you have sprouted a long shiny horsetail of the same " + character.torso.neck.head.hair.color + " color as your hair.");

                const firstTail = character.torso.tails.get(0);
                // if other animal tail
                if (firstTail.type > TailType.HORSE && firstTail.type <= TailType.COW) {
                    DisplayText("\n\nPain lances up your " + ButtDescriptor.describeButthole(character) + " as your tail shifts and morphs disgustingly.  With one last wave of pain, it splits into hundreds of tiny filaments, transforming into a horsetail.");
                }
                // if bee/spider-butt.
                if ((firstTail.type > TailType.COW && firstTail.type < TailType.SHARK)) {
                    DisplayText("\n\nYour insect-like abdomen bunches up as it begins shrinking, exoskeleton flaking off like a snake sheds its skin.  It bunches up until it is as small as a tennis ball, then explodes outwards, growing into an animalistic tail shape.  Moments later, it explodes into filaments of pain, dividing into hundreds of stUtils.Utils.rands and turning into a shiny horsetail.");
                }
                if (firstTail.type >= TailType.SHARK) {
                    DisplayText("\n\nPain lances up your " + ButtDescriptor.describeButthole(character) + " as your tail shifts and morphs disgustingly.  With one last wave of pain, it splits into hundreds of tiny filaments, transforming into a horsetail.");
                }
            }
            DisplayText("  <b>You now have a horse-tail.</b>");
            character.torso.tails.clear();
            const newTail = new Tail();
            newTail.type = TailType.HORSE;
            newTail.vemon = 0;
            newTail.recharge = 0;
            character.torso.tails.add(newTail);
            changes++;
        }
        if (Utils.rand(4) === 0 && character.torso.neck.gills && changes < changeLimit) {
            DisplayText("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            character.torso.neck.gills = false;
            changes++;
        }
        if (Utils.rand(3) === 0) DisplayText(BodyModifier.displayModTone(character, 60, 1));
        // FAILSAFE CHANGE
        if (changes === 0) {
            DisplayText("\n\nInhuman vitality spreads through your body, invigorating you!\n");
            StatModifier.displayCharacterHPChange(character, 20);
            character.stats.lust += 3;
        }
    }
}
