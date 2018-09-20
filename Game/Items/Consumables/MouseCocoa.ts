import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { EarType } from '../../Body/Ears';
import { FaceType } from '../../Body/Face';
import { IncubationTime, Pregnancy, PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import { SkinType } from '../../Body/Skin';
import { Tail, TailType } from '../../Body/Tail';
import { Character } from '../../Character/Character';
import { StatusEffectType } from '../../Effects/StatusEffectType';
import { ItemDesc } from '../ItemDesc';
import { describeHair } from '../../Descriptors/HairDescriptor';
import { skinFurScales } from '../../Descriptors/SkinDescriptor';

export class MouseCocoa extends Consumable {
    public constructor() {
        super(ConsumableName.MouseCocoa, new ItemDesc("MouseCo", "a handful of mouse cocoa", "A handful of rare aromatic beans with sharp creases in the middle, making them look like small mouse ears.  Allegedly very popular and plentiful before the mice-folk were wiped out."));
    }

    public use(character: Character) {
        DisplayText().clear();

        let changes: number = 0;
        let changeLimit: number = 1;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;
        if (randInt(3) === 0) changeLimit++;

        // use:
        DisplayText("You pop several of the beans in your mouth and suck; they immediately reward you by giving up an oily, chocolatey flavor with a hint of bitterness.  For several minutes you ");
        if (!character.body.legs.isTaur()) DisplayText("sit and ");
        DisplayText("enjoy the taste.");

        // stat changes:
        // lose height + gain speed (42" height floor, no speed ceiling but no speed changes without height change)
        if (character.body.tallness >= 45 && changes < changeLimit && randInt(3) === 0) {
            // not horse
            if (!character.body.legs.isTaur()) DisplayText("\n\nYou tap your [feet] idly against the rock you sit upon as you enjoy the treat; it takes several minutes before you realize you don't reach as far down as you did when you sat down!  In shock, you jerk upright and leap off, nearly falling forward as your body moves more responsively than before!  Experimentally, you move in place as you look down at your now-closer [feet]; the sensation of a more compact agility stays with you.");
            // horse
            else DisplayText("\n\nYou trot idly in place as you eat, moving quicker and quicker as you become increasingly bored; on one step, the ground sneaks up on you and you hit it sharply, expecting a few more inches before contact!  Looking down, you notice better resolution than before - you can make out the dirt a bit more clearly.  It looks like you just shed some height, but... you're feeling too jittery to care.  You just want to run around.");
            character.stats.spe += 1;
            character.body.tallness--;
            if (character.body.tallness > 60) character.body.tallness--;
            if (character.body.tallness > 70) character.body.tallness--;
            if (character.body.tallness > 80) character.body.tallness--;
            if (character.body.tallness > 90) character.body.tallness -= 2;
            if (character.body.tallness > 100) character.body.tallness -= 2;
            changes++;
        }
        // lose tough
        if (character.stats.tou > 50 && changes < changeLimit && randInt(3) === 0) {
            DisplayText("\n\nYou feel a bit less sturdy, both physically and mentally.  In fact, you'd prefer to have somewhere to hide for the time being, until your confidence returns.  The next few minutes are passed in a mousey funk - even afterward, you can't quite regain the same sense of invincibility you had before.");
            changes++;
            character.stats.tou += -1;
            if (character.stats.tou >= 75) character.stats.tou += -1;
            if (character.stats.tou >= 90) character.stats.tou += -1;
        }

        // SEXYYYYYYYYYYY
        // vag-anal capacity up for non-goo (available after PC < 5 ft; capacity ceiling reasonable but not horse-like or gooey)
        if (character.body.tallness < 60 && (character.analCapacity() < 100 || (character.vaginalCapacity() < 100 && character.body.vaginas.length > 0)) && changes < changeLimit && randInt(3) === 0) {
            DisplayText("\n\nYour ");
            if (character.vaginalCapacity() < 100 && character.body.vaginas.length > 0) DisplayText("[vagina]");
            else DisplayText("[asshole]");
            DisplayText(" itches, and you shyly try to scratch it, looking around to see if you're watched.  ");
            if (character.body.legs.isTaur()) DisplayText("Backing up to a likely rock, you rub your hindquarters against it, only to be surprised when you feel your hole part smoothly against the surface, wider than you're used to!");
            else DisplayText("Slipping a hand in your [armor], you rub vigorously; your hole opens more easily and your fingers poke in farther than you're used to!");
            DisplayText("  It feels unusual - not bad, really, but definitely weird.  You can see how it would come in handy, now that you're smaller than most prospective partners, but... shaking your head, you ");
            if (character.body.legs.isTaur()) DisplayText("back away from your erstwhile sedimentary lover");
            else DisplayText("pull your hand back out");
            DisplayText(".");
            // adds some lust
            character.stats.lust += character.stats.sens / 5;
            if (character.vaginalCapacity() < 100 && character.body.vaginas.length > 0) {
                if (!character.effects.has(StatusEffectType.BonusVCapacity))
                    character.effects.add(StatusEffectType.BonusVCapacity, 0, 0, 0, 0);
                character.effects.get(StatusEffectType.BonusVCapacity).value1 = 5;
            }
            else {
                if (!character.effects.has(StatusEffectType.BonusACapacity))
                    character.effects.add(StatusEffectType.BonusACapacity, 0, 0, 0, 0);
                character.effects.get(StatusEffectType.BonusACapacity).value1 = 5;
            }
            changes++;
        }
        // fem fertility up and heat (suppress if pregnant)
        // not already in heat (add heat and lust)
        if (character.effects.get(StatusEffectType.Heat).value2 < 30 && randInt(2) === 0 && changes < changeLimit) {
            const intensified: boolean = character.effects.has(StatusEffectType.Heat);
            if (character.effects.add(StatusEffectType.Heat)) {
            // if (character.goIntoHeat()) {
                if (intensified) {
                    DisplayText("\n\nYour womb feels achingly empty, and your temperature shoots up.  Try as you might, you can't stop fantasizing about being filled with semen, drenched inside and out with it, enough to make a baker's dozen offspring.  ");
                    // [(no mino cum in inventory)]
                    if (!character.inventory.items.has(ConsumableName.MinotaurCum)) {
                        DisplayText("<b>Your heat has intensified as much as your fertility has increased, which is a considerable amount!</b>");
                    }
                    else if (character.stats.lust < 100 || character.body.legs.isTaur()) DisplayText("You even pull out a bottle of minotaur jism and spend several minutes considering the feasibility of pouring it directly in your [vagina], but regain your senses as you're unsealing the cap, setting it aside.  <b>Still, your heat is more intense than ever and your increasingly-fertile body is practically begging for dick - it'll be hard to resist any that come near!</b>");
                    // (mino cum in inventory and non-horse, 100 lust)
                    else {
                        DisplayText("Desperately horny, you pull out your bottle of minotaur jism and break the seal in two shakes, then lie down with your hips elevated and upend it over your greedy vagina.  The gooey seed pours into you, and you orgasm fitfully, shaking and failing to hold the bottle in place as it coats your labia.  <b>As a hazy doze infiltrates your mind, you pray the pregnancy takes and dream of the sons you'll bear with your increasingly fertile body... you're going to go insane if you don't get a baby in you</b>.");
                        // (consumes item, increment addiction/output addict message, small chance of mino preg, reduce lust)]", false);
                        // character.minoCumAddiction(5);
                        character.pregnancy.womb.knockUp(new Pregnancy(PregnancyType.MINOTAUR, IncubationTime.MINOTAUR), 175);
                        character.inventory.items.consumeItem(ConsumableName.MinotaurCum);
                    }
                }
                else {
                    DisplayText("\n\nYour insides feel... roomy.  Accomodating, even.  You could probably carry a whole litter of little [name]s right now.  Filled with a sudden flush of desire, you look around furtively for any fertile males.  With a shake of your head, you try to clear your thoughts, but daydreams of being stuffed with seed creep right back in - it looks like your body is intent on probing the limits of your new fertility.  <b>You're in heat, and pregnable in several senses of the word!</b>");

                    // Also make a permanent nudge.
                    character.body.fertility++;
                }
                changes++;
            }
        }

        // bodypart changes:
        // gain ears
        if (character.body.ears.type !== EarType.MOUSE && changes < changeLimit && randInt(4) === 0) {
            DisplayText("\n\nYour ears ");
            if (character.body.ears.type === EarType.HORSE || character.body.ears.type === EarType.COW || character.body.ears.type === EarType.DOG || character.body.ears.type === EarType.BUNNY || character.body.ears.type === EarType.KANGAROO) DisplayText("shrink suddenly");
            else DisplayText("pull away from your head");
            DisplayText(", like they're being pinched, and you can distinctly feel the auricles taking a rounded shape through the pain.  Reaching up to try and massage away their stings, <b>you're not terribly surprised when you find a pair of fuzzy mouse's ears poking through your " + describeHair(character) + ".</b>");
            character.body.ears.type = EarType.MOUSE;
            changes++;
        }
        // gain tail
        // from no tail
        if (character.body.ears.type === EarType.MOUSE && !character.body.tails.reduce(Tail.HasType(TailType.MOUSE), false) && changes < changeLimit && randInt(4) === 0) {
            // from other tail
            if (character.body.tails.length > 0) {
                DisplayText("\n\nYour tail clenches and itches simultaneously, leaving you wondering whether to cry out or try to scratch it.  The question is soon answered as the pain takes the forefront; looking backward is a horrible strain, but when you manage it, you can see your old appendage ");
                if (character.body.tails.reduce(Tail.HasType(TailType.HORSE), false)) DisplayText("elongating");
                else DisplayText("compressing");
                DisplayText(" into a long, thin line.  With a shudder, it begins to shed until it's completely, starkly nude.  <b>Your new mouse tail looks a bit peaked.</b>");
            }
            else DisplayText("\n\nA small nub pokes from your backside, and you turn to look at it.  When you do, your neck aches as if whiplashed, and you groan as your spine shifts smoothly downward like a rope being pulled, growing new vertebra behind it and expanding the nub into a naked, thin, tapered shape.  <b>Rubbing at your sore neck, you stare at your new mouse tail.</b>");

            character.body.tails.clear();
            character.body.tails.add(new Tail(TailType.MOUSE));
            changes++;
        }
        // get teeth - from human, bunny, coonmask, or other humanoid teeth faces
        if (character.body.ears.type === EarType.MOUSE && (character.body.face.type === FaceType.HUMAN || character.body.face.type === FaceType.SHARK_TEETH || character.body.face.type === FaceType.BUNNY || character.body.face.type === FaceType.SPIDER_FANGS || character.body.face.type === FaceType.RACCOON_MASK) && randInt(4) === 0 && changes < changeLimit) {
            DisplayText("\n\nYour teeth grind on their own, and you feel a strange, insistent pressure just under your nose.  As you open your mouth and run your tongue along them, you can feel ");
            if (character.body.face.type !== FaceType.HUMAN) DisplayText("the sharp teeth receding and ");
            DisplayText("your incisors lengthening.  It's not long before they're twice as long as their neighbors and the obvious growth stops, but the pressure doesn't go away completely.  <b>Well, you now have mouse incisors and your face aches a tiny bit - wonder if they're going to keep growing?</b>");
            character.body.face.type = FaceType.BUCKTEETH;
            changes++;
        }
        // get mouse muzzle from mouse teeth or other muzzle
        if (character.body.skin.type === SkinType.FUR &&
            character.body.face.type !== FaceType.MOUSE &&
            character.body.face.type !== FaceType.SHARK_TEETH &&
            character.body.face.type !== FaceType.BUNNY &&
            character.body.face.type !== FaceType.SPIDER_FANGS &&
            character.body.face.type !== FaceType.RACCOON_MASK &&
            randInt(4) === 0 &&
            changes < changeLimit
        ) {
            DisplayText("\n\nA wave of light-headedness hits you, and you black out.  In your unconsciousness, you dream of chewing - food, wood, cloth, paper, leather, even metal... whatever you can fit in your mouth, even if it doesn't taste like anything much.  For several minutes you just chew and chew your way through a parade of ordinary objects, savoring the texture of each one against your teeth, until finally you awaken.  Your teeth work, feeling longer and more prominent than before, and you hunt up your reflection.  <b>Your face has shifted to resemble a mouse's, down to the whiskers!</b>");
            character.body.face.type = FaceType.MOUSE;
            changes++;
        }
        // get fur
        if ((character.body.skin.type !== SkinType.FUR || (character.body.skin.type === SkinType.FUR && (character.body.hair.color !== "brown" && character.body.hair.color !== "white"))) && changes < changeLimit && randInt(4) === 0) {
            // from skinscales
            if (character.body.skin.type !== SkinType.FUR) {
                DisplayText("\n\nYour " + skinFurScales(character) + " itch");
                if (character.body.skin.type > SkinType.PLAIN) DisplayText("es");
                DisplayText(" all over");
                if (character.body.tails.length > 0) DisplayText(", except on your tail");
                DisplayText(".  Alarmed and suspicious, you tuck in your hands, trying to will yourself not to scratch, but it doesn't make much difference.  Tufts of ");
                if (randInt(10) < 8) {
                    DisplayText("brown");
                    character.body.hair.color = "brown";
                }
                else {
                    DisplayText("white");
                    character.body.hair.color = "white";
                }
                DisplayText(" fur begin to force through your skin");
                if (character.body.skin.type === SkinType.SCALES) DisplayText(", pushing your scales out with little pinches");
                DisplayText(", resolving the problem for you.  <b>You now have fur.</b>");
            }
            // from other color fur
            else {
                DisplayText("\n\nYour fur stands on end, as if trying to leap from your body - which it does next.  You watch, dumb with shock, as your covering deserts you, but it's quickly replaced with another layer of ");
                if (randInt(10) < 8) {
                    DisplayText("brown");
                    character.body.hair.color = "brown";
                }
                else {
                    DisplayText("white");
                    character.body.hair.color = "white";
                }
                DisplayText(" fuzz coming in behind it that soon grows to full-fledged fur.");
            }
            character.body.skin.adj = "";
            character.body.skin.desc = "fur";
            character.body.skin.type = SkinType.FUR;
            changes++;
        }
    }
}