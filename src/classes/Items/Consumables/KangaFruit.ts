import Consumable from './Consumable';
import { CockType } from '../../Body/Cock';
import { SkinType } from '../../Body/Creature';
import { EyeType, FaceType } from '../../Body/Face';
import { EarType } from '../../Body/Head';
import { LowerBodyType, TailType } from '../../Body/LowerBody';
import { ArmType } from '../../Body/UpperBody';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import MainScreen from '../../display/MainScreen';
import Perk from '../../Effects/Perk';
import Game from '../../Game/Game';
import Player from '../../Player';
import RaceScore from '../../RaceScore';
import Utils from '../../Utilities/Utils';
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
            super("MghtyVg", new ItemDesc("MghtyVg", "a mightily enhanced piece of kanga fruit", "A yellow, fibrous, tubular pod.  A split in the end reveals many lumpy, small seeds inside.  The smell of mild fermentation wafts from them.  It glows slightly from Lumi's enhancements."));
        else
            super("KangaFt", new ItemDesc("KangaFruit", "a piece of kanga fruit", "A yellow, fibrous, tubular pod.  A split in the end reveals many lumpy, small seeds inside.  The smell of mild fermentation wafts from them."));
        this.enhanced = enhanced;
    }

    public use(player: Player) {
        MainScreen.text("", true);
        MainScreen.text("You squeeze the pod around the middle, forcing the end open.  Scooping out a handful of the yeasty-smelling seeds, you shovel them in your mouth.  Blech!  Tastes like soggy burnt bread... and yet, you find yourself going for another handful...", false);
        //Used to track changes and the max
        let changes: number = 0;
        let changeLimit: number = 1;
        if (this.enhanced) changeLimit += 2;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //****************
        //General Effects:
        //****************
        //-Int less than 10
        if (player.stats.int < 10) {
            if (player.stats.int < 8 && RaceScore.kangaScore(player) >= 5) {
                MainScreen.text("\n\nWhile you gnaw on the fibrous fruit, your already vacant mind continues to empty, leaving nothing behind but the motion of your jaw as you slowly chew and swallow your favorite food.  Swallow.  Chew.  Swallow.  You don't even notice your posture worsening or your arms shortening.  Without a single thought, you start to hunch over but keep munching on the food in your paws as if were the most normal thing in the world.  Teeth sink into one of your fingers, leaving you to yelp in pain.  With the last of your senses, you look at your throbbing paw to notice you've run out of kanga fruit!", false);
                MainScreen.text("\n\nStill hungry and licking your lips in anticipation, you sniff in deep lungfuls of air.  There's more of that wonderful fruit nearby!  You bound off in search of it on your incredibly muscular legs, their shape becoming more and more feral with every hop.  Now guided completely by instinct, you find a few stalks that grow from the ground.  Your belly rumbles, reminding you of your hunger, as you begin to dig into the kanga fruits...", false);
                MainScreen.text("\n\nLosing more of what little remains of yourself, your body is now entirely that of a feral kangaroo and your mind has devolved to match it.  After you finish the handful of fruits you found, you move on in search for more of the tasty treats.  Though you pass by your camp later on, there's no memory, no recognition, just a slight feeling of comfort and familiarity.  There's no food here so you hop away.", false);
                //[GAME OVER]
                Game.gameOver();
                return;
            }
            MainScreen.text("\n\nWhile chewing, your mind becomes more and more tranquil.  You find it hard to even remember your mission, let alone your name.  <b>Maybe more kanga fruits will help?</b>", false);
        }
        //-Speed to 70
        if (player.stats.spe < 70 && Utils.rand(3) == 0) {
            //2 points up if below 40!
            if (player.stats.spe < 40) player.stats.spe += 1;
            player.stats.spe += 1;
            MainScreen.text("\n\nYour legs fill with energy as you eat the kanga fruit.  You feel like you could set a long-jump record!  You give a few experimental bounds, both standing and running, with your newfound vigor.  Your stride seems longer too; you even catch a bit of air as you push off with every powerful step.", false);
            changes++;
        }
        //-Int to 10
        if (player.stats.int > 2 && Utils.rand(3) == 0 && changes < changeLimit) {
            changes++;
            //Gain dumb (smart!)
            if (player.stats.int > 30) MainScreen.text("\n\nYou feel... antsy. You momentarily forget your other concerns as you look around you, trying to decide which direction you'd be most likely to find more food in.  You're about to set out on the search when your mind refocuses and you realize you already have some stored at camp.", false);
            //gain dumb (30-10 int):
            else if (player.stats.int > 10) MainScreen.text("\n\nYour mind wanders as you eat; you think of what it would be like to run forever, bounding across the wastes of Mareth in the simple joy of movement.  You bring the kanga fruit to your mouth one last time, only to realize there's nothing edible left on it.  The thought brings you back to yourself with a start.", false);
            //gain dumb (10-1 int):
            else MainScreen.text("\n\nYou lose track of everything as you eat, staring at the bugs crawling across the ground.  After a while you notice the dull taste of saliva in your mouth and realize you've been sitting there, chewing the same mouthful for five minutes.  You vacantly swallow and take another bite, then go back to staring at the ground.  Was there anything else to do today?", false);
            player.stats.int += -1;
        }
        //****************
        //Appearance Effects:
        //****************
        //-Hip widening funtimes
        if (changes < changeLimit && Utils.rand(4) == 0 && player.lowerBody.hipRating < 40) {
            MainScreen.text("\n\nYou weeble and wobble as your hipbones broaden noticeably, but somehow you don't fall down.  Actually, you feel a bit MORE stable on your new widened stance, if anything.", false);
            player.lowerBody.hipRating++;
            changes++;
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
        //****************
        //Sexual:
        //****************
        //-Shrink balls down to reasonable size (3?)
        if (player.lowerBody.ballSize >= 4 && changes < changeLimit && Utils.rand(2) == 0) {
            player.lowerBody.ballSize--;
            player.cumMultiplier++;
            MainScreen.text("\n\nYour " + BallsDescriptor.describeSack(player) + " pulls tight against your groin, vibrating slightly as it changes.  Once it finishes, you give your " +  BallsDescriptor.describeBallsShort(player) + " a gentle squeeze and discover they've shrunk.  Even with the reduced volume, they feel just as heavy.", false);
            changes++;
        }
        //-Shorten clits to reasonable size
        if (player.lowerBody.vaginaSpot.get(0).clitLength >= 4 && changes < changeLimit && Utils.rand(5) == 0) {
            MainScreen.text("\n\nPainful pricks work through your " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + ", all the way into its swollen clitoral sheath.  Gods, it feels afire with pain!  Agony runs up and down its length, and by the time the pain finally fades, the feminine organ has lost half its size.", false);
            player.lowerBody.vaginaSpot.get(0).clitLength /= 2;
            changes++;
        }
        //Find biggest dick!
        let biggestCock = player.lowerBody.cockSpot.listLargestCockArea[0];
        //-Shrink dicks down to 8\" max.
        if (player.lowerBody.cockSpot.hasCock()) {
            if (biggestCock.cockLength >= 16 && changes < changeLimit && Utils.rand(5) == 0) {
                MainScreen.text("\n\nA roiling inferno of heat blazes in your " + CockDescriptor.describeCock(player, biggestCock) + ", doubling you over in the dirt.  You rock back and forth while tears run unchecked down your cheeks.  Once the pain subsides and you're able to move again, you find the poor member has lost nearly half its size.", false);
                biggestCock.cockLength /= 2;
                biggestCock.cockThickness /= 1.5;
                if (biggestCock.cockThickness * 6 > biggestCock.cockLength) biggestCock.cockThickness -= .2;
                if (biggestCock.cockThickness * 8 > biggestCock.cockLength) biggestCock.cockThickness -= .2;
                if (biggestCock.cockThickness < .5) biggestCock.cockThickness = .5;
                changes++;
            }
            //COCK TF!
            if (player.lowerBody.cockSpot.countType(CockType.KANGAROO) < player.lowerBody.cockSpot.count() && (this.enhanced && Utils.rand(2) == 0) && changes < changeLimit) {
                MainScreen.text("\n\nYou feel a sharp pinch at the end of your penis and whip down your clothes to check.  Before your eyes, the tip of it collapses into a narrow point and the shaft begins to tighten behind it, assuming a conical shape before it retracts into ", false);
                if (player.lowerBody.cockSpot.hasSheath()) MainScreen.text("your sheath", false);
                else MainScreen.text("a sheath that forms at the base of it", false);
                MainScreen.text(".  <b>You now have a kangaroo-penis!</b>", false);
                //Find first non-roocock!
                for (let index: number = 0; index < player.lowerBody.cockSpot.count(); index++) {
                    if (player.lowerBody.cockSpot.get(index).cockType != CockType.KANGAROO) {
                        player.lowerBody.cockSpot.get(index).cockType = CockType.KANGAROO;
                        player.lowerBody.cockSpot.get(index).knotMultiplier = 1;
                        break;
                    }
                }
                changes++;
            }
        }
        //****************
        //Big Kanga Morphs
        //this.enhanced 1 ignores normal restrictions
        //****************
        //-Face (Req: Fur + Feet)
        if (player.upperBody.head.face.faceType != FaceType.KANGAROO && ((player.skinType == SkinType.FUR && player.lowerBody.type == LowerBodyType.KANGAROO) || this.enhanced) && changes < changeLimit && Utils.rand(4) == 0) {
            //gain roo face from human/naga/shark/bun:
            if (player.upperBody.head.face.faceType == FaceType.HUMAN || player.upperBody.head.face.faceType == FaceType.SNAKE_FANGS || player.upperBody.head.face.faceType == FaceType.SHARK_TEETH || player.upperBody.head.face.faceType == FaceType.BUNNY) MainScreen.text("\n\nThe base of your nose suddenly hurts, as though someone were pinching and pulling at it.  As you shut your eyes against the pain and bring your hands to your face, you can feel your nose and palate shifting and elongating.  This continues for about twenty seconds as you stand there, quaking.  When the pain subsides, you run your hands all over your face; what you feel is a long muzzle sticking out, whiskered at the end and with a cleft lip under a pair of flat nostrils.  You open your eyes and receive confirmation. <b>You now have a kangaroo face!  Crikey!</b>", false);
            //gain roo face from other snout:
            else MainScreen.text("\n\nYour nose tingles. As you focus your eyes toward the end of it, it twitches and shifts into a muzzle similar to a stretched-out rabbit's, complete with harelip and whiskers.  <b>You now have a kangaroo face!</b>", false);
            changes++;
            player.upperBody.head.face.faceType = FaceType.KANGAROO;
        }
        //-Fur (Req: Footsies)
        if (player.skinType != SkinType.FUR && (player.lowerBody.type == LowerBodyType.KANGAROO || this.enhanced) && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYour " + player.skinDesc + " itches terribly all over and you try cartoonishly to scratch everywhere at once.  As you pull your hands in, you notice " + player.upperBody.head.hairColor + " fur growing on the backs of them.  All over your body the scene is repeated, covering you in the stuff.  <b>You now have fur!</b>", false);
            changes++;
            player.skinType = SkinType.FUR;
            player.skinDesc = "fur";
        }
        //-Roo footsies (Req: Tail)
        if (player.lowerBody.type != LowerBodyType.KANGAROO && (this.enhanced || player.lowerBody.tailType == TailType.KANGAROO) && changes < changeLimit && Utils.rand(4) == 0) {
            //gain roo feet from centaur:
            if (player.lowerBody.type == LowerBodyType.CENTAUR) MainScreen.text("\n\nYour backlegs suddenly wobble and collapse, causing you to pitch over onto your side.  Try as you might, you can't get them to stop spasming so you can stand back up; you thrash your hooves wildly as a pins-and-needles sensation overtakes your lower body.  A dull throbbing along your spine makes you moan in agony; it's as though someone had set an entire bookshelf on your shoulders and your spine were being compressed far beyond its limit.  After a minute of pain, the pressure evaporates and you look down at your legs.  Not only are your backlegs gone, but your forelegs have taken on a dogleg shape, with extremely long feet bearing a prominent middle toe!  You set about rubbing the feeling back into your legs and trying to move the new feet.  <b>You now have kangaroo legs!</b>", false);
            //gain roo feet from naga:
            else if (player.lowerBody.type == LowerBodyType.NAGA) MainScreen.text("\n\nYour tail quivers, then shakes violently, planting you on your face.  As you try to bend around to look at it, you can just see the tip shrinking out of your field of vision from the corner of your eye.  The scaly skin below your waist tightens intolerably, then splits; you wriggle out of it, only to find yourself with a pair of long legs instead!  A bit of hair starts to grow in as you stand up unsteadily on your new, elongated feet.  <b>You now have kangaroo legs!</b>  Now, what are you going to do with a giant shed snakeskin?", false);
            //gain roo feet from slime:
            else if (player.lowerBody.type == LowerBodyType.GOO) MainScreen.text("\n\nYour mounds of goo shrink and part involuntarily, exposing your crotch.  Modesty overwhelms you and you try to pull them together, but the shrinkage is continuing faster than you can shift your gooey body around.  Before long you've run out of goo to move, and your lower body now ends in a pair of slippery digitigrade legs with long narrow feet.  They dry in the air and a bit of fur begins to sprout as you look for something to cover up with.  <b>You now have kangaroo legs!</b> You sigh.  Guess this means it's back to wearing underpants again.", false);
            //gain roo feet from human/bee/demon/paw/lizard:
            else MainScreen.text("\n\nYour feet begin to crack and shift as the metatarsal bones lengthen.  Your knees buckle from the pain of your bones rearranging themselves, and you fall over.  After fifteen seconds of what feels like your feet being racked, the sensation stops.  You look down at your legs; they've taken a roughly dog-leg shape, but they have extremely long feet with a prominent middle toe!  As you stand up you find that you're equally comfortable standing flat on your feet as you are on the balls of them!  <b>You now have kangaroo legs!</b>", false);
            player.lowerBody.type = LowerBodyType.KANGAROO;
            changes++;
        }
        //-Roo tail (Req: Ears)
        if (player.lowerBody.tailType != TailType.KANGAROO && changes < changeLimit && Utils.rand(4) == 0 && (!this.enhanced || player.upperBody.head.earType == EarType.KANGAROO)) {
            //gain roo tail:
            if (player.lowerBody.tailType == TailType.NONE) MainScreen.text("\n\nA painful pressure in your lower body causes you to stand straight and lock up.  At first you think it might be gas.  No... something is growing at the end of your tailbone.  As you hold stock still so as not to exacerbate the pain, something thick pushes out from the rear of your garments.  The pain subsides and you crane your neck around to look; a long, tapered tail is now attached to your butt and a thin coat of fur is already growing in!  <b>You now have a kangaroo tail!</b>", false);
            //gain roo tail from bee tail:
            else if (player.lowerBody.tailType == TailType.SPIDER_ABDOMEN || player.lowerBody.tailType == TailType.BEE_ABDOMEN) {
                MainScreen.text("\n\nYour chitinous backside shakes and cracks once you finish eating.  Peering at it as best you can, it appears as though the fuzz is falling out in clumps and the chitin is flaking off.  As convulsions begin to wrack your body and force you to collapse, the ", false);
                if (player.lowerBody.tailType == TailType.BEE_ABDOMEN) MainScreen.text("hollow stinger drops out of the end, taking the venom organ with it.", false);
                else MainScreen.text("spinnerets drop out of the end, taking the last of your webbing with it.", false);
                MainScreen.text("  By the time you're back to yourself, the insectile carapace has fallen off completely, leaving you with a long, thick, fleshy tail in place of your proud, insectile abdomen.  <b>You now have a kangaroo tail!</b>  You wipe the errant spittle from your mouth as you idly bob your new tail about.", false);
            }
            //gain roo tail from other tail:
            else {
                MainScreen.text("\n\nYour tail twitches as you eat.  It begins to feel fat and swollen, and you try to look at your own butt as best you can.  What you see matches what you feel as your tail thickens and stretches out into a long cone shape.  <b>You now have a kangaroo tail!</b>", false);
            }
            player.lowerBody.tailType = TailType.KANGAROO;
            changes++;
        }
        //-Roo ears
        if (player.upperBody.head.earType != EarType.KANGAROO && changes < changeLimit && Utils.rand(4) == 0) {
            //Bunbun ears get special texts!
            if (player.upperBody.head.earType == EarType.BUNNY) MainScreen.text("\n\nYour ears stiffen and shift to the sides!  You reach up and find them pointed outwards instead of up and down; they feel a bit wider now as well.  As you touch them, you can feel them swiveling in place in response to nearby sounds.  <b>You now have a pair of kangaroo ears!</b>", false);
            //Everybody else?  Yeah lazy.
            else MainScreen.text("\n\nYour ears twist painfully as though being yanked upwards and you clap your hands to your head.  Feeling them out, you discover them growing!  They stretch upwards, reaching past your fingertips, and then the tugging stops.  You cautiously feel along their lengths; they're long and stiff, but pointed outwards now, and they swivel around as you listen.  <b>You now have a pair of kangaroo ears!</b>", false);
            changes++;
            player.upperBody.head.earType = EarType.KANGAROO;
        }
        //UBEROOOO
        //kangaroo perk: - any liquid or food intake will accelerate a pregnancy, but it will not progress otherwise
        if (!player.perks.has("Diapause") && RaceScore.kangaScore(player) > 4 && Utils.rand(4) == 0 && changes < changeLimit && player.lowerBody.vaginaSpot.hasVagina()) {
            //Perk name and description:
            player.perks.add(new Perk("Diapause", 0, 0, 0, 0));
            MainScreen.text("\n\nYour womb rumbles as something inside it changes.\n<b>(You have gained the Diapause perk.  Pregnancies will not progress when fluid intake is scarce, and will progress much faster when it isn't.)", false);
            changes++;
            //trigger effect: Your body reacts to the influx of nutrition, accelerating your pregnancy. Your belly bulges outward slightly.
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        if (changes == 0) {
            MainScreen.text("\n\nIt did not seem to have any effects, but you do feel better rested.", false);
            player.stats.fatigue -= 40;
        }
    }
}