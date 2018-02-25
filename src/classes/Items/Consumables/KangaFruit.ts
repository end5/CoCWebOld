import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import { ArmType } from '../../Body/Arms';
import Cock, { CockType } from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import { EyeType } from '../../Body/Eyes';
import { FaceType } from '../../Body/Face';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import Character from '../../Character/Character';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import LegDescriptor from '../../Descriptors/LegDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import Game from '../../Game/Game';
import RaceScore from '../../RaceScore';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

/*
 General Effects:
 -Speed to 70
 -Int to 10

 Appearance Effects:
 -Hip widening funtimes
 -Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
 -Remove feathery hair (copy for equinum, canine peppers, Labova)

 Sexual:
 -Shrink balls down to reasonable size (3?)
 -Shorten clits to reasonable size
 -Shrink dicks down to 8\" max.
 -Rut/heat

 Big Roo Tfs:
 -Roo ears
 -Roo tail
 -Roo footsies
 -Fur
 -Roo face*/

export default class KangaFruit extends Consumable {
    private enhanced: boolean;

    public constructor(enhanced: boolean) {
        if (enhanced)
            super(ConsumableName.KangaFruitEnhanced, new ItemDesc("MghtyVg", "a mightily enhanced piece of kanga fruit", "A yellow, fibrous, tubular pod.  A split in the end reveals many lumpy, small seeds inside.  The smell of mild fermentation wafts from them.  It glows slightly from Lumi's enhancements."));
        else
            super(ConsumableName.KangaFruit, new ItemDesc("KangaFruit", "a piece of kanga fruit", "A yellow, fibrous, tubular pod.  A split in the end reveals many lumpy, small seeds inside.  The smell of mild fermentation wafts from them."));
        this.enhanced = enhanced;
    }

    public use(character: Character) {
        DisplayText().clear();
        DisplayText("You squeeze the pod around the middle, forcing the end open.  Scooping out a handful of the yeasty-smelling seeds, you shovel them in your mouth.  Blech!  Tastes like soggy burnt bread... and yet, you find yourself going for another handful...");
        // Used to track changes and the max
        let changes: number = 0;
        let changeLimit: number = 1;
        if (this.enhanced) changeLimit += 2;
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(2) === 0) changeLimit++;
        if (character.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        // ****************
        // General Effects:
        // ****************
        // -Int less than 10
        if (character.stats.int < 10) {
            if (character.stats.int < 8 && RaceScore.kangaScore(character) >= 5) {
                DisplayText("\n\nWhile you gnaw on the fibrous fruit, your already vacant mind continues to empty, leaving nothing behind but the motion of your jaw as you slowly chew and swallow your favorite food.  Swallow.  Chew.  Swallow.  You don't even notice your posture worsening or your arms shortening.  Without a single thought, you start to hunch over but keep munching on the food in your paws as if were the most normal thing in the world.  Teeth sink into one of your fingers, leaving you to yelp in pain.  With the last of your senses, you look at your throbbing paw to notice you've run out of kanga fruit!");
                DisplayText("\n\nStill hungry and licking your lips in anticipation, you sniff in deep lungfuls of air.  There's more of that wonderful fruit nearby!  You bound off in search of it on your incredibly muscular legs, their shape becoming more and more feral with every hop.  Now guided completely by instinct, you find a few stalks that grow from the ground.  Your belly rumbles, reminding you of your hunger, as you begin to dig into the kanga fruits...");
                DisplayText("\n\nLosing more of what little remains of yourself, your body is now entirely that of a feral kangaroo and your mind has devolved to match it.  After you finish the handful of fruits you found, you move on in search for more of the tasty treats.  Though you pass by your camp later on, there's no memory, no recognition, just a slight feeling of comfort and familiarity.  There's no food here so you hop away.");
                // [GAME OVER]
                Game.gameOver();
                return;
            }
            DisplayText("\n\nWhile chewing, your mind becomes more and more tranquil.  You find it hard to even remember your mission, let alone your name.  <b>Maybe more kanga fruits will help?</b>");
        }
        // -Speed to 70
        if (character.stats.spe < 70 && Utils.rand(3) === 0) {
            // 2 points up if below 40!
            if (character.stats.spe < 40) character.stats.spe += 1;
            character.stats.spe += 1;
            DisplayText("\n\nYour legs fill with energy as you eat the kanga fruit.  You feel like you could set a long-jump record!  You give a few experimental bounds, both standing and running, with your newfound vigor.  Your stride seems longer too; you even catch a bit of air as you push off with every powerful step.");
            changes++;
        }
        // -Int to 10
        if (character.stats.int > 2 && Utils.rand(3) === 0 && changes < changeLimit) {
            changes++;
            // Gain dumb (smart!)
            if (character.stats.int > 30) DisplayText("\n\nYou feel... antsy. You momentarily forget your other concerns as you look around you, trying to decide which direction you'd be most likely to find more food in.  You're about to set out on the search when your mind refocuses and you realize you already have some stored at camp.");
            // gain dumb (30-10 int):
            else if (character.stats.int > 10) DisplayText("\n\nYour mind wanders as you eat; you think of what it would be like to run forever, bounding across the wastes of Mareth in the simple joy of movement.  You bring the kanga fruit to your mouth one last time, only to realize there's nothing edible left on it.  The thought brings you back to yourself with a start.");
            // gain dumb (10-1 int):
            else DisplayText("\n\nYou lose track of everything as you eat, staring at the bugs crawling across the ground.  After a while you notice the dull taste of saliva in your mouth and realize you've been sitting there, chewing the same mouthful for five minutes.  You vacantly swallow and take another bite, then go back to staring at the ground.  Was there anything else to do today?");
            character.stats.int += -1;
        }
        // ****************
        // Appearance Effects:
        // ****************
        // -Hip widening funtimes
        if (changes < changeLimit && Utils.rand(4) === 0 && character.torso.hips.rating < 40) {
            DisplayText("\n\nYou weeble and wobble as your hipbones broaden noticeably, but somehow you don't fall down.  Actually, you feel a bit MORE stable on your new widened stance, if anything.");
            character.torso.hips.rating++;
            changes++;
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
        // Remove odd eyes
        if (changes < changeLimit && Utils.rand(5) === 0 && character.torso.neck.head.face.eyes.type > EyeType.HUMAN) {
            if (character.torso.neck.head.face.eyes.type === EyeType.BLACK_EYES_SAND_TRAP) {
                DisplayText("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                DisplayText("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + LegDescriptor.describeFeet(character) + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.");
                if (character.torso.neck.head.face.eyes.type === EyeType.FOUR_SPIDER_EYES) DisplayText("  Your multiple, arachnid eyes are gone!</b>");
                DisplayText("  <b>You have normal, humanoid eyes again.</b>");
            }
            character.torso.neck.head.face.eyes.type = EyeType.HUMAN;
            changes++;
        }
        // ****************
        // Sexual:
        // ****************
        // -Shrink balls down to reasonable size (3?)
        if (character.torso.balls.size >= 4 && changes < changeLimit && Utils.rand(2) === 0) {
            character.torso.balls.size--;
            character.cumMultiplier++;
            DisplayText("\n\nYour " + BallsDescriptor.describeSack(character) + " pulls tight against your groin, vibrating slightly as it changes.  Once it finishes, you give your " + BallsDescriptor.describeBallsShort(character) + " a gentle squeeze and discover they've shrunk.  Even with the reduced volume, they feel just as heavy.");
            changes++;
        }
        // -Shorten clits to reasonable size
        if (character.torso.clit.length >= 4 && changes < changeLimit && Utils.rand(5) === 0) {
            DisplayText("\n\nPainful pricks work through your " + VaginaDescriptor.describeClit(character) + ", all the way into its swollen clitoral sheath.  Gods, it feels afire with pain!  Agony runs up and down its length, and by the time the pain finally fades, the feminine organ has lost half its size.");
            character.torso.clit.length /= 2;
            changes++;
        }
        // Find biggest dick!
        const biggestCock = character.torso.cocks.sort(Cock.LargestCockArea)[0];
        // -Shrink dicks down to 8\" max.
        if (character.torso.cocks.count > 0) {
            if (biggestCock.length >= 16 && changes < changeLimit && Utils.rand(5) === 0) {
                DisplayText("\n\nA roiling inferno of heat blazes in your " + CockDescriptor.describeCock(character, biggestCock) + ", doubling you over in the dirt.  You rock back and forth while tears run unchecked down your cheeks.  Once the pain subsides and you're able to move again, you find the poor member has lost nearly half its size.");
                biggestCock.length /= 2;
                biggestCock.thickness /= 1.5;
                if (biggestCock.thickness * 6 > biggestCock.length) biggestCock.thickness -= .2;
                if (biggestCock.thickness * 8 > biggestCock.length) biggestCock.thickness -= .2;
                if (biggestCock.thickness < .5) biggestCock.thickness = .5;
                changes++;
            }
            // COCK TF!
            if (character.torso.cocks.filter(Cock.FilterType(CockType.KANGAROO)).length < character.torso.cocks.count && (this.enhanced && Utils.rand(2) === 0) && changes < changeLimit) {
                DisplayText("\n\nYou feel a sharp pinch at the end of your penis and whip down your clothes to check.  Before your eyes, the tip of it collapses into a narrow point and the shaft begins to tighten behind it, assuming a conical shape before it retracts into ");
                if (character.torso.cocks.filter(Cock.HasSheath).length > 0) DisplayText("your sheath");
                else DisplayText("a sheath that forms at the base of it");
                DisplayText(".  <b>You now have a kangaroo-penis!</b>");
                // Find first non-roocock!
                for (let index: number = 0; index < character.torso.cocks.count; index++) {
                    if (character.torso.cocks.get(index).type !== CockType.KANGAROO) {
                        character.torso.cocks.get(index).type = CockType.KANGAROO;
                        character.torso.cocks.get(index).knotMultiplier = 1;
                        break;
                    }
                }
                changes++;
            }
        }
        // ****************
        // Big Kanga Morphs
        // this.enhanced 1 ignores normal restrictions
        // ****************
        // -Face (Req: Fur + Feet)
        if (character.torso.neck.head.face.type !== FaceType.KANGAROO && ((character.skin.type === SkinType.FUR && character.torso.hips.legs.type === LegType.KANGAROO) || this.enhanced) && changes < changeLimit && Utils.rand(4) === 0) {
            // gain roo face from human/naga/shark/bun:
            if (character.torso.neck.head.face.type === FaceType.HUMAN || character.torso.neck.head.face.type === FaceType.SNAKE_FANGS || character.torso.neck.head.face.type === FaceType.SHARK_TEETH || character.torso.neck.head.face.type === FaceType.BUNNY) DisplayText("\n\nThe base of your nose suddenly hurts, as though someone were pinching and pulling at it.  As you shut your eyes against the pain and bring your hands to your face, you can feel your nose and palate shifting and elongating.  This continues for about twenty seconds as you stand there, quaking.  When the pain subsides, you run your hands all over your face; what you feel is a long muzzle sticking out, whiskered at the end and with a cleft lip under a pair of flat nostrils.  You open your eyes and receive confirmation. <b>You now have a kangaroo face!  Crikey!</b>");
            // gain roo face from other snout:
            else DisplayText("\n\nYour nose tingles. As you focus your eyes toward the end of it, it twitches and shifts into a muzzle similar to a stretched-out rabbit's, complete with harelip and whiskers.  <b>You now have a kangaroo face!</b>");
            changes++;
            character.torso.neck.head.face.type = FaceType.KANGAROO;
        }
        // -Fur (Req: Footsies)
        if (character.skin.type !== SkinType.FUR && (character.torso.hips.legs.type === LegType.KANGAROO || this.enhanced) && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nYour " + character.skin.desc + " itches terribly all over and you try cartoonishly to scratch everywhere at once.  As you pull your hands in, you notice " + character.torso.neck.head.hair.color + " fur growing on the backs of them.  All over your body the scene is repeated, covering you in the stuff.  <b>You now have fur!</b>");
            changes++;
            character.skin.type = SkinType.FUR;
            character.skin.desc = "fur";
        }
        // -Roo footsies (Req: Tail)
        if (character.torso.hips.legs.type !== LegType.KANGAROO && (this.enhanced || character.torso.tails.reduce(Tail.HasType(TailType.KANGAROO), false)) && changes < changeLimit && Utils.rand(4) === 0) {
            // gain roo feet from centaur:
            if (character.torso.hips.legs.type === LegType.CENTAUR) DisplayText("\n\nYour backlegs suddenly wobble and collapse, causing you to pitch over onto your side.  Try as you might, you can't get them to stop spasming so you can stand back up; you thrash your hooves wildly as a pins-and-needles sensation overtakes your lower body.  A dull throbbing along your spine makes you moan in agony; it's as though someone had set an entire bookshelf on your shoulders and your spine were being compressed far beyond its limit.  After a minute of pain, the pressure evaporates and you look down at your legs.  Not only are your backlegs gone, but your forelegs have taken on a dogleg shape, with extremely long feet bearing a prominent middle toe!  You set about rubbing the feeling back into your legs and trying to move the new feet.  <b>You now have kangaroo legs!</b>");
            // gain roo feet from naga:
            else if (character.torso.hips.legs.type === LegType.NAGA) DisplayText("\n\nYour tail quivers, then shakes violently, planting you on your face.  As you try to bend around to look at it, you can just see the tip shrinking out of your field of vision from the corner of your eye.  The scaly skin below your waist tightens intolerably, then splits; you wriggle out of it, only to find yourself with a pair of long legs instead!  A bit of hair starts to grow in as you stand up unsteadily on your new, elongated feet.  <b>You now have kangaroo legs!</b>  Now, what are you going to do with a giant shed snakeskin?");
            // gain roo feet from slime:
            else if (character.torso.hips.legs.type === LegType.GOO) DisplayText("\n\nYour mounds of goo shrink and part involuntarily, exposing your crotch.  Modesty overwhelms you and you try to pull them together, but the shrinkage is continuing faster than you can shift your gooey body around.  Before long you've run out of goo to move, and your lower body now ends in a pair of slippery digitigrade legs with long narrow feet.  They dry in the air and a bit of fur begins to sprout as you look for something to cover up with.  <b>You now have kangaroo legs!</b> You sigh.  Guess this means it's back to wearing underpants again.");
            // gain roo feet from human/bee/demon/paw/lizard:
            else DisplayText("\n\nYour feet begin to crack and shift as the metatarsal bones lengthen.  Your knees buckle from the pain of your bones rearranging themselves, and you fall over.  After fifteen seconds of what feels like your feet being racked, the sensation stops.  You look down at your legs; they've taken a roughly dog-leg shape, but they have extremely long feet with a prominent middle toe!  As you stand up you find that you're equally comfortable standing flat on your feet as you are on the balls of them!  <b>You now have kangaroo legs!</b>");
            character.torso.hips.legs.type = LegType.KANGAROO;
            changes++;
        }
        // -Roo tail (Req: Ears)
        if (!character.torso.tails.reduce(Tail.HasType(TailType.KANGAROO), false) && changes < changeLimit && Utils.rand(4) === 0 && (!this.enhanced || character.torso.neck.head.ears.type === EarType.KANGAROO)) {
            // gain roo tail:
            if (character.torso.tails.count >= 1) DisplayText("\n\nA painful pressure in your lower body causes you to stand straight and lock up.  At first you think it might be gas.  No... something is growing at the end of your tailbone.  As you hold stock still so as not to exacerbate the pain, something thick pushes out from the rear of your garments.  The pain subsides and you crane your neck around to look; a long, tapered tail is now attached to your butt and a thin coat of fur is already growing in!  <b>You now have a kangaroo tail!</b>");
            // gain roo tail from bee tail:
            else if (character.torso.tails.reduce(Tail.HasType(TailType.SPIDER_ABDOMEN), false) || character.torso.tails.reduce(Tail.HasType(TailType.BEE_ABDOMEN), false)) {
                DisplayText("\n\nYour chitinous backside shakes and cracks once you finish eating.  Peering at it as best you can, it appears as though the fuzz is falling out in clumps and the chitin is flaking off.  As convulsions begin to wrack your body and force you to collapse, the ");
                if (character.torso.tails.reduce(Tail.HasType(TailType.BEE_ABDOMEN), false)) DisplayText("hollow stinger drops out of the end, taking the venom organ with it.");
                else DisplayText("spinnerets drop out of the end, taking the last of your webbing with it.");
                DisplayText("  By the time you're back to yourself, the insectile carapace has fallen off completely, leaving you with a long, thick, fleshy tail in place of your proud, insectile abdomen.  <b>You now have a kangaroo tail!</b>  You wipe the errant spittle from your mouth as you idly bob your new tail about.");
            }
            // gain roo tail from other tail:
            else {
                DisplayText("\n\nYour tail twitches as you eat.  It begins to feel fat and swollen, and you try to look at your own butt as best you can.  What you see matches what you feel as your tail thickens and stretches out into a long cone shape.  <b>You now have a kangaroo tail!</b>");
            }
            character.torso.tails.clear();
            const newTail = new Tail();
            newTail.type = TailType.KANGAROO;
            character.torso.tails.add(newTail);
            changes++;
        }
        // -Roo ears
        if (character.torso.neck.head.ears.type !== EarType.KANGAROO && changes < changeLimit && Utils.rand(4) === 0) {
            // Bunbun ears get special texts!
            if (character.torso.neck.head.ears.type === EarType.BUNNY) DisplayText("\n\nYour ears stiffen and shift to the sides!  You reach up and find them pointed outwards instead of up and down; they feel a bit wider now as well.  As you touch them, you can feel them swiveling in place in response to nearby sounds.  <b>You now have a pair of kangaroo ears!</b>");
            // Everybody else?  Yeah lazy.
            else DisplayText("\n\nYour ears twist painfully as though being yanked upwards and you clap your hands to your head.  Feeling them out, you discover them growing!  They stretch upwards, reaching past your fingertips, and then the tugging stops.  You cautiously feel along their lengths; they're long and stiff, but pointed outwards now, and they swivel around as you listen.  <b>You now have a pair of kangaroo ears!</b>");
            changes++;
            character.torso.neck.head.ears.type = EarType.KANGAROO;
        }
        // UBEROOOO
        // kangaroo perk: - any liquid or food intake will accelerate a pregnancy, but it will not progress otherwise
        if (!character.perks.has(PerkType.Diapause) && RaceScore.kangaScore(character) > 4 && Utils.rand(4) === 0 && changes < changeLimit && character.torso.vaginas.count > 0) {
            // Perk name and description:
            character.perks.add(PerkType.Diapause, 0, 0, 0, 0);
            DisplayText("\n\nYour womb rumbles as something inside it changes.\n<b>(You have gained the Diapause perk.  Pregnancies will not progress when fluid intake is scarce, and will progress much faster when it isn't.)");
            changes++;
            // trigger effect: Your body reacts to the influx of nutrition, accelerating your pregnancy. Your belly bulges outward slightly.
        }
        if (Utils.rand(4) === 0 && character.torso.neck.gills && changes < changeLimit) {
            DisplayText("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            character.torso.neck.gills = false;
            changes++;
        }
        if (changes === 0) {
            DisplayText("\n\nIt did not seem to have any effects, but you do feel better rested.");
            character.stats.fatigue -= 40;
        }
    }
}
