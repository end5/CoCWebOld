import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import { EarType } from '../../Body/Ears';
import { FaceType } from '../../Body/Face';
import Pregnancy, { IncubationTime, PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import SkinDescriptor from '../../Descriptors/SkinDescriptor';
import DisplayText from '../../display/DisplayText';
import StatusAffect from '../../Effects/StatusAffect';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Game from '../../Game/Game';
import Player from '../../Player/Player';
import MinotaurPreg from '../../Player/PregnancyEvents/MinotaurPreg';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class MouseCocoa extends Consumable {
    public constructor() {
        super(ConsumableName.MouseCocoa, new ItemDesc("MouseCo", "a handful of mouse cocoa", "A handful of rare aromatic beans with sharp creases in the middle, making them look like small mouse ears.  Allegedly very popular and plentiful before the mice-folk were wiped out."));
    }

    public use(player: Player) {
        DisplayText().clear();

        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(3) === 0) changeLimit++;
        if (Utils.rand(3) === 0) changeLimit++;

        // use:
        DisplayText("You pop several of the beans in your mouth and suck; they immediately reward you by giving up an oily, chocolatey flavor with a hint of bitterness.  For several minutes you ");
        if (!player.torso.hips.legs.isTaur()) DisplayText("sit and ");
        DisplayText("enjoy the taste.");

        // stat changes:
        // lose height + gain speed (42" height floor, no speed ceiling but no speed changes without height change)
        if (player.tallness >= 45 && changes < changeLimit && Utils.rand(3) === 0) {
            // not horse
            if (!player.torso.hips.legs.isTaur()) DisplayText("\n\nYou tap your [feet] idly against the rock you sit upon as you enjoy the treat; it takes several minutes before you realize you don't reach as far down as you did when you sat down!  In shock, you jerk upright and leap off, nearly falling forward as your body moves more responsively than before!  Experimentally, you move in place as you look down at your now-closer [feet]; the sensation of a more compact agility stays with you.");
            // horse
            else DisplayText("\n\nYou trot idly in place as you eat, moving quicker and quicker as you become increasingly bored; on one step, the ground sneaks up on you and you hit it sharply, expecting a few more inches before contact!  Looking down, you notice better resolution than before - you can make out the dirt a bit more clearly.  It looks like you just shed some height, but... you're feeling too jittery to care.  You just want to run around.");
            player.stats.spe += 1;
            player.tallness--;
            if (player.tallness > 60) player.tallness--;
            if (player.tallness > 70) player.tallness--;
            if (player.tallness > 80) player.tallness--;
            if (player.tallness > 90) player.tallness -= 2;
            if (player.tallness > 100) player.tallness -= 2;
            changes++;
        }
        // lose tough
        if (player.stats.tou > 50 && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nYou feel a bit less sturdy, both physically and mentally.  In fact, you'd prefer to have somewhere to hide for the time being, until your confidence returns.  The next few minutes are passed in a mousey funk - even afterward, you can't quite regain the same sense of invincibility you had before.");
            changes++;
            player.stats.tou += -1;
            if (player.stats.tou >= 75) player.stats.tou += -1;
            if (player.stats.tou >= 90) player.stats.tou += -1;
        }

        // SEXYYYYYYYYYYY
        // vag-anal capacity up for non-goo (available after PC < 5 ft; capacity ceiling reasonable but not horse-like or gooey)
        if (player.tallness < 60 && (player.analCapacity() < 100 || (player.vaginalCapacity() < 100 && player.torso.vaginas.count > 0)) && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nYour ");
            if (player.vaginalCapacity() < 100 && player.torso.vaginas.count > 0) DisplayText("[vagina]");
            else DisplayText("[asshole]");
            DisplayText(" itches, and you shyly try to scratch it, looking around to see if you're watched.  ");
            if (player.torso.hips.legs.isTaur()) DisplayText("Backing up to a likely rock, you rub your hindquarters against it, only to be surprised when you feel your hole part smoothly against the surface, wider than you're used to!");
            else DisplayText("Slipping a hand in your [armor], you rub vigorously; your hole opens more easily and your fingers poke in farther than you're used to!");
            DisplayText("  It feels unusual - not bad, really, but definitely weird.  You can see how it would come in handy, now that you're smaller than most prospective partners, but... shaking your head, you ");
            if (player.torso.hips.legs.isTaur()) DisplayText("back away from your erstwhile sedimentary lover");
            else DisplayText("pull your hand back out");
            DisplayText(".");
            // adds some lust
            player.stats.lust += player.stats.sens / 5;
            if (player.vaginalCapacity() < 100 && player.torso.vaginas.count > 0) {
                if (!player.statusAffects.has(StatusAffectType.BonusVCapacity))
                    player.statusAffects.set(StatusAffectType.BonusVCapacity, StatusAffectFactory.create(StatusAffectType.BonusVCapacity, 0, 0, 0, 0));
                player.statusAffects.get(StatusAffectType.BonusVCapacity).value1 = 5;
            }
            else {
                if (!player.statusAffects.has(StatusAffectType.BonusACapacity))
                    player.statusAffects.set(StatusAffectType.BonusACapacity, StatusAffectFactory.create(StatusAffectType.BonusACapacity, 0, 0, 0, 0));
                player.statusAffects.get(StatusAffectType.BonusACapacity).value1 = 5;
            }
            changes++;
        }
        // fem fertility up and heat (suppress if pregnant)
        // not already in heat (add heat and lust)
        if (player.statusAffects.get(StatusAffectType.Heat).value2 < 30 && Utils.rand(2) === 0 && changes < changeLimit) {
            const intensified: boolean = player.inHeat;
            if (player.goIntoHeat()) {
                if (intensified) {
                    DisplayText("\n\nYour womb feels achingly empty, and your temperature shoots up.  Try as you might, you can't stop fantasizing about being filled with semen, drenched inside and out with it, enough to make a baker's dozen offspring.  ");
                    // [(no mino cum in inventory)]
                    if (!player.inventory.items.has(ConsumableName.MinotaurCum)) {
                        DisplayText("<b>Your heat has intensified as much as your fertility has increased, which is a considerable amount!</b>");
                    }
                    else if (player.stats.lust < 100 || player.torso.hips.legs.isTaur()) DisplayText("You even pull out a bottle of minotaur jism and spend several minutes considering the feasibility of pouring it directly in your [vagina], but regain your senses as you're unsealing the cap, setting it aside.  <b>Still, your heat is more intense than ever and your increasingly-fertile body is practically begging for dick - it'll be hard to resist any that come near!</b>");
                    // (mino cum in inventory and non-horse, 100 lust)
                    else {
                        DisplayText("Desperately horny, you pull out your bottle of minotaur jism and break the seal in two shakes, then lie down with your hips elevated and upend it over your greedy vagina.  The gooey seed pours into you, and you orgasm fitfully, shaking and failing to hold the bottle in place as it coats your labia.  <b>As a hazy doze infiltrates your mind, you pray the pregnancy takes and dream of the sons you'll bear with your increasingly fertile body... you're going to go insane if you don't get a baby in you</b>.");
                        // (consumes item, increment addiction/output addict message, small chance of mino preg, reduce lust)]", false);
                        player.minoCumAddiction(5);
                        player.pregnancy.womb.knockUp(new Pregnancy(PregnancyType.MINOTAUR, IncubationTime.MINOTAUR), 175);
                        player.inventory.items.consumeItem(ConsumableName.MinotaurCum);
                    }
                }
                else {
                    DisplayText("\n\nYour insides feel... roomy.  Accomodating, even.  You could probably carry a whole litter of little [name]s right now.  Filled with a sudden flush of desire, you look around furtively for any fertile males.  With a shake of your head, you try to clear your thoughts, but daydreams of being stuffed with seed creep right back in - it looks like your body is intent on probing the limits of your new fertility.  <b>You're in heat, and pregnable in several senses of the word!</b>");

                    // Also make a permanent nudge.
                    player.fertility++;
                }
                changes++;
            }
        }

        // bodypart changes:
        // gain ears
        if (player.torso.neck.head.ears.type !== EarType.MOUSE && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nYour ears ");
            if (player.torso.neck.head.ears.type === EarType.HORSE || player.torso.neck.head.ears.type === EarType.COW || player.torso.neck.head.ears.type === EarType.DOG || player.torso.neck.head.ears.type === EarType.BUNNY || player.torso.neck.head.ears.type === EarType.KANGAROO) DisplayText("shrink suddenly");
            else DisplayText("pull away from your head");
            DisplayText(", like they're being pinched, and you can distinctly feel the auricles taking a rounded shape through the pain.  Reaching up to try and massage away their stings, <b>you're not terribly surprised when you find a pair of fuzzy mouse's ears poking through your " + HeadDescriptor.describeHair(player) + ".</b>");
            player.torso.neck.head.ears.type = EarType.MOUSE;
            changes++;
        }
        // gain tail
        // from no tail
        if (player.torso.neck.head.ears.type === EarType.MOUSE && !player.torso.tails.hasType(TailType.MOUSE) && changes < changeLimit && Utils.rand(4) === 0) {
            // from other tail
            if (player.torso.tails.count > 0) {
                DisplayText("\n\nYour tail clenches and itches simultaneously, leaving you wondering whether to cry out or try to scratch it.  The question is soon answered as the pain takes the forefront; looking backward is a horrible strain, but when you manage it, you can see your old appendage ");
                if (player.torso.tails.hasType(TailType.HORSE)) DisplayText("elongating");
                else DisplayText("compressing");
                DisplayText(" into a long, thin line.  With a shudder, it begins to shed until it's completely, starkly nude.  <b>Your new mouse tail looks a bit peaked.</b>");
            }
            else DisplayText("\n\nA small nub pokes from your backside, and you turn to look at it.  When you do, your neck aches as if whiplashed, and you groan as your spine shifts smoothly downward like a rope being pulled, growing new vertebra behind it and expanding the nub into a naked, thin, tapered shape.  <b>Rubbing at your sore neck, you stare at your new mouse tail.</b>");

            player.torso.tails.clear();
            player.torso.tails.add(new Tail(TailType.MOUSE));
            changes++;
        }
        // get teeth - from human, bunny, coonmask, or other humanoid teeth faces
        if (player.torso.neck.head.ears.type === EarType.MOUSE && (player.torso.neck.head.face.type === FaceType.HUMAN || player.torso.neck.head.face.type === FaceType.SHARK_TEETH || player.torso.neck.head.face.type === FaceType.BUNNY || player.torso.neck.head.face.type === FaceType.SPIDER_FANGS || player.torso.neck.head.face.type === FaceType.RACCOON_MASK) && Utils.rand(4) === 0 && changes < changeLimit) {
            DisplayText("\n\nYour teeth grind on their own, and you feel a strange, insistent pressure just under your nose.  As you open your mouth and run your tongue along them, you can feel ");
            if (player.torso.neck.head.face.type !== FaceType.HUMAN) DisplayText("the sharp teeth receding and ");
            DisplayText("your incisors lengthening.  It's not long before they're twice as long as their neighbors and the obvious growth stops, but the pressure doesn't go away completely.  <b>Well, you now have mouse incisors and your face aches a tiny bit - wonder if they're going to keep growing?</b>");
            player.torso.neck.head.face.type = FaceType.BUCKTEETH;
            changes++;
        }
        // get mouse muzzle from mouse teeth or other muzzle
        if (player.skin.type === SkinType.FUR &&
            player.torso.neck.head.face.type !== FaceType.MOUSE &&
            player.torso.neck.head.face.type !== FaceType.SHARK_TEETH &&
            player.torso.neck.head.face.type !== FaceType.BUNNY &&
            player.torso.neck.head.face.type !== FaceType.SPIDER_FANGS &&
            player.torso.neck.head.face.type !== FaceType.RACCOON_MASK &&
            Utils.rand(4) === 0 &&
            changes < changeLimit
        ) {
            DisplayText("\n\nA wave of light-headedness hits you, and you black out.  In your unconsciousness, you dream of chewing - food, wood, cloth, paper, leather, even metal... whatever you can fit in your mouth, even if it doesn't taste like anything much.  For several minutes you just chew and chew your way through a parade of ordinary objects, savoring the texture of each one against your teeth, until finally you awaken.  Your teeth work, feeling longer and more prominent than before, and you hunt up your reflection.  <b>Your face has shifted to resemble a mouse's, down to the whiskers!</b>");
            player.torso.neck.head.face.type = FaceType.MOUSE;
            changes++;
        }
        // get fur
        if ((player.skin.type !== SkinType.FUR || (player.skin.type === SkinType.FUR && (player.torso.neck.head.hair.color !== "brown" && player.torso.neck.head.hair.color !== "white"))) && changes < changeLimit && Utils.rand(4) === 0) {
            // from skinscales
            if (player.skin.type !== SkinType.FUR) {
                DisplayText("\n\nYour " + SkinDescriptor.skinFurScales(player) + " itch");
                if (player.skin.type > SkinType.PLAIN) DisplayText("es");
                DisplayText(" all over");
                if (player.torso.tails.count > 0) DisplayText(", except on your tail");
                DisplayText(".  Alarmed and suspicious, you tuck in your hands, trying to will yourself not to scratch, but it doesn't make much difference.  Tufts of ");
                if (Utils.rand(10) < 8) {
                    DisplayText("brown");
                    player.torso.neck.head.hair.color = "brown";
                }
                else {
                    DisplayText("white");
                    player.torso.neck.head.hair.color = "white";
                }
                DisplayText(" fur begin to force through your skin");
                if (player.skin.type === SkinType.SCALES) DisplayText(", pushing your scales out with little pinches");
                DisplayText(", resolving the problem for you.  <b>You now have fur.</b>");
            }
            // from other color fur
            else {
                DisplayText("\n\nYour fur stands on end, as if trying to leap from your body - which it does next.  You watch, dumb with shock, as your covering deserts you, but it's quickly replaced with another layer of ");
                if (Utils.rand(10) < 8) {
                    DisplayText("brown");
                    player.torso.neck.head.hair.color = "brown";
                }
                else {
                    DisplayText("white");
                    player.torso.neck.head.hair.color = "white";
                }
                DisplayText(" fuzz coming in behind it that soon grows to full-fledged fur.");
            }
            player.skin.adj = "";
            player.skin.desc = "fur";
            player.skin.type = SkinType.FUR;
            changes++;
        }
    }
}
