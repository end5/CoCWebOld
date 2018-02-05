import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import { ArmType } from '../../Body/Arms';
import BreastRow from '../../Body/BreastRow';
import { EarType } from '../../Body/Ears';
import { EyeType } from '../../Body/Eyes';
import { FaceType } from '../../Body/Face';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import Vagina, { VaginaType } from '../../Body/Vagina';
import { WingType } from '../../Body/Wings';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import FaceDescriptor from '../../Descriptors/FaceDescriptor';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import LegDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import BodyModifier from '../../Modifiers/BodyModifier';
import BreastModifier from '../../Modifiers/BreastModifier';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class GoldenSeed extends Consumable {
    private enhanced: boolean;

    // 'type' refers to the variety of seed.
    // 0 == standard.
    // 1 == enhanced - increase change limit and no pre-reqs for TF
    public constructor(enhanced: boolean) {
        if (!enhanced)
            super(ConsumableName.GoldenSeed, new ItemDesc("GoldenSeed", "a golden seed", "This seed looks and smells absolutely delicious.  Though it has an unusual color, the harpies prize these nuts as delicious treats.  Eating one might induce some physical transformations."));
        else
            super(ConsumableName.GoldenSeedEnhanced, new ItemDesc("MagSeed", "a magically-enhanced golden seed", "This seed glows with power.  It's been enhanced by Lumi to unlock its full potential, allowing it to transform you more easily."));
        this.enhanced = enhanced;
    }

    public use(player: Player) {
        let changes: number = 0;
        let changeLimit: number = 1;
        if (this.enhanced) changeLimit += 2;
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(2) === 0) changeLimit++;
        if (player.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        // Generic eating text:
        DisplayText().clear();
        DisplayText("You pop the nut into your mouth, chewing the delicious treat and swallowing it quickly.  No wonder harpies love these things so much!");
        // ****************
        // Stats:
        // ****************
        // -Speed increase to 100.
        if (player.stats.spe < 100 && Utils.rand(3) === 0) {
            changes++;
            if (player.stats.spe >= 75) DisplayText("\n\nA familiar chill runs down your spine. Your muscles feel like well oiled machinery, ready to snap into action with lightning speed.");
            else DisplayText("\n\nA chill runs through your spine, leaving you feeling like your reflexes are quicker and your body faster.");
            // Speed gains diminish as it rises.
            if (player.stats.spe < 40) player.stats.spe += .5;
            if (player.stats.spe < 75) player.stats.spe += .5;
            player.stats.spe += .5;
        }
        // -Toughness decrease to 50
        if (player.stats.tou > 50 && Utils.rand(3) === 0 && changes < changeLimit) {
            changes++;
            if (Utils.rand(2) === 0) DisplayText("\n\nA nice, slow warmth rolls from your gut out to your limbs, flowing through them before dissipating entirely. As it leaves, you note that your body feels softer and less resilient.");
            else DisplayText("\n\nYou feel somewhat lighter, but consequently more fragile.  Perhaps your bones have changed to be more harpy-like in structure?");
            player.stats.tou += -1;
        }
        // antianemone corollary:
        if (changes < changeLimit && player.torso.neck.head.hair.type === 4 && Utils.rand(2) === 0) {
            // -insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
            DisplayText("\n\nAs you down the seed, your head begins to feel heavier.  Reaching up, you notice your tentacles becoming soft and somewhat fibrous.  Pulling one down reveals that it feels soft and fluffy, almost feathery; you watch as it dissolves into many thin, feathery stUtils.Utils.rands.  <b>Your hair is now like that of a harpy!</b>");
            player.torso.neck.head.hair.type = 1;
            changes++;
        }
        // -Strength increase to 70
        if (player.stats.str < 70 && Utils.rand(3) === 0 && changes < changeLimit) {
            changes++;
            // (low str)
            if (player.stats.str < 40) DisplayText("\n\nShivering, you feel a feverish sensation that reminds you of the last time you got sick. Thankfully, it passes swiftly, leaving slightly enhanced strength in its wake.");
            // (hi str � 50+)
            else DisplayText("\n\nHeat builds in your muscles, their already-potent mass shifting slightly as they gain even more strength.");
            // Faster until 40 str.
            if (player.stats.str < 40) player.stats.str += .5;
            player.stats.str += .5;
        }
        // -Libido increase to 90
        if ((player.stats.lib < 90 || Utils.rand(3) === 0) && Utils.rand(3) === 0 && changes < changeLimit) {
            changes++;
            if (player.stats.lib < 90) player.stats.lib += 1;
            // (sub 40 lib)
            if (player.stats.lib < 40) {
                DisplayText("\n\nA passing flush colors your " + FaceDescriptor.describeFace(player) + " for a second as you daydream about sex. You blink it away, realizing the item seems to have affected your libido.");
                if (player.torso.vaginas.count > 0) DisplayText(" The moistness of your " +  VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " seems to agree.");
                else if (player.torso.cocks.count > 0) DisplayText(" The hardness of " + CockDescriptor.describeMultiCockSimpleOne(player) + " seems to agree.");
                player.stats.lust += 5;
            }
            // (sub 75 lib)
            else if (player.stats.lib < 75) DisplayText("\n\nHeat, blessed heat, works through you from head to groin, leaving you to shudder and fantasize about the sex you could be having right now.\n\n");
            // (hi lib)
            else if (player.stats.lib < 90) DisplayText("\n\nSexual need courses through you, flushing your skin with a reddish hue while you pant and daydream of the wondrous sex you should be having right now.\n\n");
            // (90+)
            else DisplayText("\n\nYou groan, something about the seed rubbing your libido in just the right way to make you horny. Panting heavily, you sigh and fantasize about the sex you could be having.\n\n");
            // (fork to fantasy)
            if (player.stats.lib >= 40) {
                player.stats.lust += player.stats.lib / 5 + 10;
                // (herm � either or!)
                // Cocks!
                if (player.torso.cocks.count > 0 && (player.gender !== 3 || Utils.rand(2) === 0)) {
                    // (male 1)
                    if (Utils.rand(2) === 0) {
                        DisplayText("In your fantasy you're winging through the sky, " + CockDescriptor.describeMultiCockSimpleOne(player) + " already hard and drizzling with male moisture while you circle an attractive harpy's nest. Her plumage is as blue as the sky, her eyes the shining teal of the sea, and legs splayed in a way that shows you how ready she is to be bred. You fold your wings and dive, wind whipping through your " + HeadDescriptor.describeHair(player) + " as she grows larger and larger. With a hard, body-slapping impact you land on top of her, plunging your hard, ready maleness into her hungry box. ");
                        if (player.torso.cocks.count > 1) {
                            DisplayText("The extra penis");
                            if (player.torso.cocks.count > 2) DisplayText("es rub ");
                            else DisplayText("rubs ");
                            DisplayText("the skin over her taut, empty belly, drooling your need atop her.  ");
                            DisplayText("You jolt from the vision unexpectedly, finding your " + CockDescriptor.describeMultiCockSimpleOne(player) + " is as hard as it was in the dream. The inside of your " + player.inventory.equipment.armor.displayName + " is quite messy from all the pre-cum you've drooled. Perhaps you can find a harpy nearby to lie with.");
                        }
                    }
                    // (male 2)
                    else {
                        DisplayText("In your fantasy you're lying back in the nest your harem built for you, stroking your dick and watching the sexy bird-girl spread her thighs to deposit another egg onto the pile. The lewd moans do nothing to sate your need, and you beckon for another submissive harpy to approach. She does, her thick thighs swaying to show her understanding of your needs. The bird-woman crawls into your lap, sinking down atop your shaft to snuggle it with her molten heat. She begins kissing you, smearing your mouth with her drugged lipstick until you release the first of many loads. You sigh, riding the bliss, secure in the knowledge that this 'wife' won't let up until she's gravid with another egg. Then it'll be her sister-wife's turn. The tightness of " + CockDescriptor.describeMultiCockSimpleOne(player) + " inside your " + player.inventory.equipment.armor.displayName + " rouses you from the dream, reminding you that you're just standing there, leaking your need into your gear.");
                    }
                }
                // Cunts!
                else if (player.torso.vaginas.count > 0) {
                    // (female 1)
                    if (Utils.rand(2) === 0) {
                        DisplayText("In your fantasy you're a happy harpy mother, your womb stretched by the sizable egg it contains. The surging hormones in your body arouse you again, and you turn to the father of your children, planting a wet kiss on his slobbering, lipstick-gilt cock. The poor adventurer writhes, hips pumping futilely in the air. He's been much more agreeable since you started keeping his cock coated with your kisses. You mount the needy boy, fantasizing about that first time when you found him near the portal, in the ruins of your old camp. The feeling of your stiff nipples ");
                        if (player.torso.chest.filter(BreastRow.FuckableNipples).length > 0) DisplayText("and pussy leaking over ");
                        else if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 1.5) DisplayText("dripping milk inside ");
                        else DisplayText("rubbing inside ");
                        DisplayText("your " + player.inventory.equipment.armor.displayName + " shocks you from the dream, leaving you with nothing but the moistness of your loins for company. Maybe next year you'll find the mate of your dreams?");
                    }
                    // (female 2)
                    else {
                        DisplayText("In your fantasy you're sprawled on your back, thick thighs splayed wide while you're taken by a virile male. The poor stud was wandering the desert all alone, following some map, but soon you had his bright red rod sliding between your butt-cheeks, the pointed tip releasing runnels of submission to lubricate your loins. You let him mount your pussy before you grabbed him with your powerful thighs and took off. He panicked at first, but the extra blood flow just made him bigger. He soon forgot his fear and focused on the primal needs of all males � mating with a gorgeous harpy. You look back at him and wink, feeling his knot build inside you. Your aching, tender " + BreastDescriptor.describeNipple(player, player.torso.chest.get(0)) + "s pull you out of the fantasy as they rub inside your " + player.inventory.equipment.armor.displayName + ". Maybe once your quest is over you'll be able to find a shy, fertile male to mold into the perfect cum-pump.");
                    }
                }
            }
        }
        // ****************
        //   Sexual:
        // ****************
        // -Grow a cunt (guaranteed if no gender)
        if (player.gender === 0 || (player.torso.vaginas.count <= 0 && changes < changeLimit && Utils.rand(3) === 0)) {
            changes++;
            // (balls)
            if (player.torso.balls.quantity > 0) DisplayText("\n\nAn itch starts behind your " + BallsDescriptor.describeBallsShort(player) + ", but before you can reach under to scratch it, the discomfort fades. A moment later a warm, wet feeling brushes your " + BallsDescriptor.describeSack(player) + ", and curious about the sensation, <b>you lift up your balls to reveal your new vagina.</b>");
            // (dick)
            else if (player.torso.cocks.count > 0) DisplayText("\n\nAn itch starts on your groin, just below your " + CockDescriptor.describeMultiCockShort(player) + ". You pull your manhood aside to give you a better view, and you're able to watch as <b>your skin splits to give you a new vagina, complete with a tiny clit.</b>");
            // (neither)
            else DisplayText("\n\nAn itch starts on your groin and fades before you can take action. Curious about the intermittent sensation, <b>you peek under your " + player.inventory.equipment.armor.displayName + " to discover your bUtils.Utils.rand new vagina, complete with pussy lips and a tiny clit.</b>");
            player.torso.clit.length = 0.25;
            const newVagina = new Vagina();
            player.torso.vaginas.add(newVagina);
            player.stats.sens += 10;
            player.updateGender();
        }
        // -Remove extra breast rows
        if (changes < changeLimit && player.torso.chest.count > 1 && Utils.rand(3) === 0 && !Flags.list[FlagEnum.HYPER_HAPPY]) {
            changes++;
            const bottomBreastRow = player.torso.chest.get(player.torso.chest.count - 1);
            DisplayText("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + BreastDescriptor.describeBreastRow(bottomBreastRow) + " shrink down, disappearing completely into your ");
            if (player.torso.chest.count >= 3) DisplayText("abdomen");
            else DisplayText("chest");
            DisplayText(". The " + BreastDescriptor.describeNipple(player, bottomBreastRow) + "s even fade until nothing but ");
            if (player.skin.type === SkinType.FUR) DisplayText(player.torso.neck.head.hair.color + " " + player.skin.desc);
            else DisplayText(player.skin.tone + " " + player.skin.desc);
            DisplayText(" remains. <b>You've lost a row of breasts!</b>");
            player.stats.sens += -5;
            player.torso.chest.remove(player.torso.chest.count - 1);
        }
        // -Shrink tits if above DDs.
        // Cannot happen at same time as row removal
        else if (changes < changeLimit && player.torso.chest.count === 1 && Utils.rand(3) === 0 && player.torso.chest.get(0).rating >= 7 && !Flags.list[FlagEnum.HYPER_HAPPY]) {
            changes++;
            // (Use standard breast shrinking mechanism if breasts are under 'h')
            if (player.torso.chest.get(0).rating < 19) {
                BreastModifier.shrinkTits(player);
            }
            // (H+)
            else {
                player.torso.chest.get(0).rating -= (4 + Utils.rand(4));
                DisplayText("\n\nYour chest pinches tight, wobbling dangerously for a second before the huge swell of your bust begins to shrink into itself. The weighty mounds jiggle slightly as they shed cup sizes like old, discarded coats, not stopping until they're " + BreastDescriptor.breastCup(player.torso.chest.get(0).rating) + "s.");
            }
        }
        // -Grow tits to a B-cup if below.
        if (changes < changeLimit && player.torso.chest.get(0).rating < 2 && Utils.rand(3) === 0) {
            changes++;
            DisplayText("\n\nYour chest starts to tingle, the " + player.skin.desc + " warming under your " + player.inventory.equipment.armor.displayName + ". Reaching inside to feel the tender flesh, you're quite surprised when it puffs into your fingers, growing larger and larger until it settles into a pair of B-cup breasts.");
            if (player.torso.chest.get(0).rating < 1) DisplayText("  <b>You have breasts now!</b>");
            player.torso.chest.get(0).rating = 2;
        }
        // ****************
        // General Appearance:
        // ****************
        // -Femininity to 85
        if (player.femininity < 85 && changes < changeLimit && Utils.rand(3) === 0) {
            changes++;
            DisplayText(BodyModifier.displayModFem(player, 85, 3 + Utils.rand(5)));
        }
        // -Skin color change � tan, olive, dark, light
        if ((player.skin.tone !== "tan" && player.skin.tone !== "olive" && player.skin.tone !== "dark" && player.skin.tone !== "light") && changes < changeLimit && Utils.rand(5) === 0) {
            changes++;
            DisplayText("\n\nIt takes a while for you to notice, but <b>");
            if (player.skin.type === SkinType.FUR) DisplayText("the skin under your " + player.torso.neck.head.hair.color + " " + player.skin.desc);
            else DisplayText("your " + player.skin.desc);
            DisplayText(" has changed to become ");
            const randomNumber = Utils.rand(4);
            if (randomNumber === 0) player.skin.tone = "tan";
            else if (randomNumber === 1) player.skin.tone = "olive";
            else if (randomNumber === 2) player.skin.tone = "dark";
            else if (randomNumber === 3) player.skin.tone = "light";
            DisplayText(player.skin.tone + " colored.</b>");
        }
        // -Grow hips out if narrow.
        if (player.torso.hips.rating < 10 && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nYour gait shifts slightly to accommodate your widening " + LegDescriptor.describeHips(player) + ". The change is subtle, but they're definitely broader.");
            player.torso.hips.rating++;
            changes++;
        }
        // -Narrow hips if crazy wide
        if (player.torso.hips.rating >= 15 && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nYour gait shifts inward, your " + LegDescriptor.describeHips(player) + " narrowing significantly. They remain quite thick, but they're not as absurdly wide as before.");
            player.torso.hips.rating--;
            changes++;
        }
        // -Big booty
        if (player.torso.butt.rating < 8 && changes < changeLimit && Utils.rand(3) === 0) {
            player.torso.butt.rating++;
            changes++;
            DisplayText("\n\nA slight jiggle works through your rear, but instead of stopping it starts again. You can actually feel your " + player.inventory.equipment.armor.displayName + " being filled out by the growing cheeks. When it stops, you find yourself the proud owner of a " + ButtDescriptor.describeButt(player) + ".");
        }
        // -Narrow booty if crazy huge.
        if (player.torso.butt.rating >= 14 && changes < changeLimit && Utils.rand(4) === 0) {
            changes++;
            player.torso.butt.rating--;
            DisplayText("\n\nA feeling of tightness starts in your " + ButtDescriptor.describeButt(player) + ", increasing gradually. The sensation grows and grows, but as it does your center of balance shifts. You reach back to feel yourself, and sure enough your massive booty is shrinking into a more manageable size.");
        }
        // -Body thickness to 25ish
        if (player.thickness > 25 && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText(BodyModifier.displayModThickness(player, 25, 3 + Utils.rand(4)));
            changes++;
        }
        // Remove odd eyes
        if (changes < changeLimit && Utils.rand(5) === 0 && player.torso.neck.head.face.eyes.type > EyeType.HUMAN) {
            if (player.torso.neck.head.face.eyes.type === EyeType.BLACK_EYES_SAND_TRAP) {
                DisplayText("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                DisplayText("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + LegDescriptor.describeFeet(player) + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.");
                if (player.torso.neck.head.face.eyes.type === EyeType.FOUR_SPIDER_EYES) DisplayText("  Your multiple, arachnid eyes are gone!</b>");
                DisplayText("  <b>You have normal, humanoid eyes again.</b>");
            }
            player.torso.neck.head.face.eyes.type = EyeType.HUMAN;
            changes++;
        }
        // ****************
        // Harpy Appearance:
        // ****************
        // -Harpy legs
        if (player.torso.hips.legs.type !== LegType.HARPY && changes < changeLimit && (this.enhanced || player.torso.tails.hasType(TailType.HARPY)) && Utils.rand(4) === 0) {
            // (biped/taur)
            if (!player.torso.hips.legs.isGoo()) DisplayText("\n\nYour " + LegDescriptor.describeLegs(player) + " creak ominously a split-second before they go weak and drop you on the ground. They go completely limp, twisting and reshaping before your eyes in ways that make you wince. Your lower body eventually stops, but the form it's settled on is quite thick in the thighs. Even your " + LegDescriptor.describeFeet(player) + " have changed.  ");
            // goo
            else DisplayText("\n\nYour gooey undercarriage loses some of its viscosity, dumping you into the puddle that was once your legs. As you watch, the fluid pulls together into a pair of distinctly leg-like shapes, solidifying into a distinctly un-gooey form. You've even regained a pair of feet!  ");
            player.torso.hips.legs.type = LegType.HARPY;
            changes++;
            // (cont)
            DisplayText("While humanoid in shape, they have two large, taloned toes on the front and a single claw protruding from the heel. The entire ensemble is coated in " + player.torso.neck.head.hair.color + " feathers from ankle to hip, reminding you of the bird-women of the mountains. <b>You now have harpy legs!</b>");
        }
        // -Feathery Tail
        if (!player.torso.tails.hasType(TailType.HARPY) && changes < changeLimit && (this.enhanced || player.torso.wings.type === WingType.FEATHERED_LARGE) && Utils.rand(4) === 0) {
            // (tail)
            if (player.torso.tails.count > 0) DisplayText("\n\nYour tail shortens, folding into the crack of your " + ButtDescriptor.describeButt(player) + " before it disappears. A moment later, a fan of feathers erupts in its place, fluffing up and down instinctively every time the breeze shifts. <b>You have a feathery harpy tail!</b>");
            // (no tail)
            else DisplayText("\n\nA tingling tickles the base of your spine, making you squirm in place. A moment later, it fades, but a fan of feathers erupts from your " + player.skin.desc + " in its place. The new tail fluffs up and down instinctively with every shift of the breeze. <b>You have a feathery harpy tail!</b>");
            player.torso.tails.clear();
            const newTail = new Tail();
            newTail.type = TailType.HARPY;
            player.torso.tails.add(newTail);
            changes++;
        }
        // -Propah Wings
        if (player.torso.wings.type === WingType.NONE && changes < changeLimit && (this.enhanced || player.torso.arms.type === ArmType.HARPY) && Utils.rand(4) === 0) {
            DisplayText("\n\nPain lances through your back, the muscles knotting oddly and pressing up to bulge your " + player.skin.desc + ". It hurts, oh gods does it hurt, but you can't get a good angle to feel at the source of your agony. A loud crack splits the air, and then your body is forcing a pair of narrow limbs through a gap in your " + player.inventory.equipment.armor.displayName + ". Blood pumps through the new appendages, easing the pain as they fill out and grow. Tentatively, you find yourself flexing muscles you didn't know you had, and <b>you're able to curve the new growths far enough around to behold your bUtils.Utils.rand new, " + player.torso.neck.head.hair.color + " wings.</b>");
            player.torso.wings.type = WingType.FEATHERED_LARGE;
            player.torso.wings.desc = "large, feathered";
            changes++;
        }
        // -Remove old wings
        if (player.torso.wings.type !== WingType.FEATHERED_LARGE && player.torso.wings.type > WingType.NONE && changes < changeLimit && Utils.rand(4) === 0) {
            if (player.torso.wings.type !== WingType.SHARK_FIN) DisplayText("\n\nSensation fades from your " + player.torso.wings.desc + " wings slowly but surely, leaving them dried out husks that break off to fall on the ground. Your back closes up to conceal the loss, as smooth and unbroken as the day you entered the portal.");
            else DisplayText("\n\nSensation fades from your large fin slowly but surely, leaving it a dried out husk that breaks off to fall on the ground. Your back closes up to conceal the loss, as smooth and unbroken as the day you entered the portal.");
            player.torso.wings.type = WingType.NONE;
            player.torso.wings.desc = "non-existant";
            changes++;
        }
        // -Feathery Arms
        if (player.torso.arms.type !== ArmType.HARPY && changes < changeLimit && (this.enhanced || player.torso.neck.head.hair.type === 1) && Utils.rand(4) === 0) {
            DisplayText("\n\nYou smile impishly as you lick the last bits of the nut from your teeth, but when you go to wipe your mouth, instead of the usual texture of your " + player.skin.desc + " on your lips, you feel feathers! You look on in horror while more of the avian plumage sprouts from your " + player.skin.desc + ", covering your forearms until <b>your arms look vaguely like wings</b>. Your hands remain unchanged thankfully. It'd be impossible to be a champion without hands! The feathery limbs might help you maneuver if you were to fly, but there's no way they'd support you alone.");
            changes++;
            player.torso.arms.type = ArmType.HARPY;
        }
        // -Feathery Hair
        if (player.torso.neck.head.hair.type !== 1 && changes < changeLimit && (this.enhanced || player.torso.neck.head.face.type === FaceType.HUMAN) && Utils.rand(4) === 0) {
            DisplayText("\n\nA tingling starts in your scalp, getting worse and worse until you're itching like mad, the feathery stUtils.Utils.rands of your hair tickling your fingertips while you scratch like a dog itching a flea. When you pull back your hand, you're treated to the sight of downy fluff trailing from your fingernails. A realization dawns on you - you have feathers for hair, just like a harpy!");
            player.torso.neck.head.hair.type = 1;
            changes++;
        }
        // -Human face
        if (player.torso.neck.head.face.type !== FaceType.HUMAN && changes < changeLimit && (this.enhanced || (player.torso.neck.head.ears.type === EarType.HUMAN || player.torso.neck.head.ears.type === EarType.ELFIN)) && Utils.rand(4) === 0) {
            DisplayText("\n\nSudden agony sweeps over your " + FaceDescriptor.describeFace(player) + ", your visage turning hideous as bones twist and your jawline shifts. The pain slowly vanishes, leaving you weeping into your fingers. When you pull your hands away you realize you've been left with a completely normal, human face.");
            player.torso.neck.head.face.type = FaceType.HUMAN;
            changes++;
        }
        // -Gain human ears (keep elf ears)
        if ((player.torso.neck.head.ears.type !== EarType.HUMAN && player.torso.neck.head.ears.type !== EarType.ELFIN) && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nOuch, your head aches! It feels like your ears are being yanked out of your head, and when you reach up to hold your aching noggin, you find they've vanished! Swooning and wobbling with little sense of balance, you nearly fall a half-dozen times before <b>a pair of normal, human ears sprout from the sides of your head.</b> You had almost forgotten what human ears felt like!");
            player.torso.neck.head.ears.type = EarType.HUMAN;
            changes++;
        }
        if (Utils.rand(4) === 0 && player.torso.neck.gills && changes < changeLimit) {
            DisplayText("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            player.torso.neck.gills = false;
            changes++;
        }
        // SPECIAL:
        // Harpy Womb � All eggs are automatically upgraded to large, requires legs + tail to be harpy.
        if (!player.perks.has(PerkType.HarpyWomb) && player.torso.hips.legs.type === LegType.HARPY && player.torso.tails.hasType(TailType.HARPY) && Utils.rand(4) === 0 && changes < changeLimit) {
            player.perks.add(PerkType.HarpyWomb, 0, 0, 0, 0);
            DisplayText("\n\nThere's a rumbling in your womb, signifying that some strange change has taken place in your most feminine area. No doubt something in it has changed to be more like a harpy. (<b>You've gained the Harpy Womb perk! All the eggs you lay will always be large so long as you have harpy legs and a harpy tail.</b>)");
            changes++;
        }
        if (changes < changeLimit && Utils.rand(4) === 0 && ((player.torso.butt.wetness > 0 && !player.perks.has(PerkType.MaraesGiftButtslut)) || player.torso.butt.wetness > 1)) {
            DisplayText("\n\nYou feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
            player.torso.butt.wetness--;
            if (player.torso.butt.looseness > 1) player.torso.butt.looseness--;
            changes++;
        }
        // Nipples Turn Back:
        if (player.statusAffects.has(StatusAffectType.BlackNipples) && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nSomething invisible brushes against your " + BreastDescriptor.describeNipple(player, player.torso.chest.get(0)) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            changes++;
            player.statusAffects.remove(StatusAffectType.BlackNipples);
        }
        // Debugcunt
        if (changes < changeLimit && Utils.rand(3) === 0 && player.torso.vaginas.count > 0 && player.torso.vaginas.get(0).type !== VaginaType.HUMAN) {
            DisplayText("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
            player.torso.vaginas.get(0).type = VaginaType.HUMAN;
            changes++;
        }
        if (changes === 0) DisplayText("\n\nAside from being a tasty treat, it doesn't seem to do anything to you this time.");
    }
}
