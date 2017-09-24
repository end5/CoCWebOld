import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class MouseCocoa extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        MainScreen.clearText();

        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;

        //use:
        MainScreen.text("You pop several of the beans in your mouth and suck; they immediately reward you by giving up an oily, chocolatey flavor with a hint of bitterness.  For several minutes you ");
        if (!player.isTaur()) MainScreen.text("sit and ");
        MainScreen.text("enjoy the taste.");

        //stat changes:
        //lose height + gain speed (42" height floor, no speed ceiling but no speed changes without height change)
        if (player.tallness >= 45 && changes < changeLimit && Utils.rand(3) == 0) {
            //not horse
            if (!player.isTaur()) MainScreen.text("\n\nYou tap your [feet] idly against the rock you sit upon as you enjoy the treat; it takes several minutes before you realize you don't reach as far down as you did when you sat down!  In shock, you jerk upright and leap off, nearly falling forward as your body moves more responsively than before!  Experimentally, you move in place as you look down at your now-closer [feet]; the sensation of a more compact agility stays with you.");
            //horse
            else MainScreen.text("\n\nYou trot idly in place as you eat, moving quicker and quicker as you become increasingly bored; on one step, the ground sneaks up on you and you hit it sharply, expecting a few more inches before contact!  Looking down, you notice better resolution than before - you can make out the dirt a bit more clearly.  It looks like you just shed some height, but... you're feeling too jittery to care.  You just want to run around.");
            dynStats("spe", 1);
            player.tallness--;
            if (player.tallness > 60) player.tallness--;
            if (player.tallness > 70) player.tallness--;
            if (player.tallness > 80) player.tallness--;
            if (player.tallness > 90) player.tallness -= 2;
            if (player.tallness > 100) player.tallness -= 2;
            changes++;
        }
        //lose tough
        if (player.tou > 50 && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYou feel a bit less sturdy, both physically and mentally.  In fact, you'd prefer to have somewhere to hide for the time being, until your confidence returns.  The next few minutes are passed in a mousey funk - even afterward, you can't quite regain the same sense of invincibility you had before.");
            changes++;
            dynStats("tou", -1);
            if (player.tou >= 75) dynStats("tou", -1);
            if (player.tou >= 90) dynStats("tou", -1);
        }

        //SEXYYYYYYYYYYY
        //vag-anal capacity up for non-goo (available after PC < 5 ft; capacity ceiling reasonable but not horse-like or gooey)
        if (player.tallness < 60 && (player.analCapacity() < 100 || (player.vaginalCapacity() < 100 && player.lowerBody.vaginaSpot.hasVagina())) && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYour ");
            if (player.vaginalCapacity() < 100 && player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("[vagina]");
            else MainScreen.text("[asshole]");
            MainScreen.text(" itches, and you shyly try to scratch it, looking around to see if you're watched.  ");
            if (player.isTaur()) MainScreen.text("Backing up to a likely rock, you rub your hindquarters against it, only to be surprised when you feel your hole part smoothly against the surface, wider than you're used to!");
            else MainScreen.text("Slipping a hand in your [armor], you rub vigorously; your hole opens more easily and your fingers poke in farther than you're used to!");
            MainScreen.text("  It feels unusual - not bad, really, but definitely weird.  You can see how it would come in handy, now that you're smaller than most prospective partners, but... shaking your head, you ");
            if (player.isTaur()) MainScreen.text("back away from your erstwhile sedimentary lover");
            else MainScreen.text("pull your hand back out");
            MainScreen.text(".");
            //adds some lust
            dynStats("lus", 10 + player.stats.sens / 5);
            if (player.vaginalCapacity() < 100 && player.lowerBody.vaginaSpot.hasVagina()) {
                if (player.findStatusAffect(StatusAffects.BonusVCapacity) < 0) player.statusAffects.add(new StatusAffect("BonusVCapacity", 0, 0, 0, 0)));
                player.statusAffects.get("BonusVCapacity").value1 = 5;
            }
            else {
                if (player.findStatusAffect(StatusAffects.BonusACapacity) < 0) player.statusAffects.add(new StatusAffect("BonusACapacity", 0, 0, 0, 0)));
                player.statusAffects.get("BonusACapacity").value1 = 5;
            }
            changes++;
        }
        //fem fertility up and heat (suppress if pregnant)
        //not already in heat (add heat and lust)
        if (player.statusAffects.get("Heat").value2 < 30 && Utils.rand(2) == 0 && changes < changeLimit) {
            let intensified: boolean = player.inHeat;
            if (player.goIntoHeat(false)) {
                if (intensified) {
                    MainScreen.text("\n\nYour womb feels achingly empty, and your temperature shoots up.  Try as you might, you can't stop fantasizing about being filled with semen, drenched inside and out with it, enough to make a baker's dozen offspring.  ");
                    //[(no mino cum in inventory)]
                    if (!player.hasItem(consumables.MINOCUM)) {
                        MainScreen.text("<b>Your heat has intensified as much as your fertility has increased, which is a considerable amount!</b>");
                    }
                    else if (player.lust < 100 || player.isTaur()) MainScreen.text("You even pull out a bottle of minotaur jism and spend several minutes considering the feasibility of pouring it directly in your [vagina], but regain your senses as you're unsealing the cap, setting it aside.  <b>Still, your heat is more intense than ever and your increasingly-fertile body is practically begging for dick - it'll be hard to resist any that come near!</b>");
                    //(mino cum in inventory and non-horse, 100 lust)
                    else {
                        MainScreen.text("Desperately horny, you pull out your bottle of minotaur jism and break the seal in two shakes, then lie down with your hips elevated and upend it over your greedy vagina.  The gooey seed pours into you, and you orgasm fitfully, shaking and failing to hold the bottle in place as it coats your labia.  <b>As a hazy doze infiltrates your mind, you pray the pregnancy takes and dream of the sons you'll bear with your increasingly fertile body... you're going to go insane if you don't get a baby in you</b>.");
                        //(consumes item, increment addiction/output addict message, small chance of mino preg, reduce lust)]", false);
                        player.minoCumAddiction(5);
                        player.knockUp(PregnancyType.MINOTAUR, PregnancyType.INCUBATION_MINOTAUR, 175);
                        player.consumeItem(consumables.MINOCUM);
                    }
                }
                else {
                    MainScreen.text("\n\nYour insides feel... roomy.  Accomodating, even.  You could probably carry a whole litter of little [name]s right now.  Filled with a sudden flush of desire, you look around furtively for any fertile males.  With a shake of your head, you try to clear your thoughts, but daydreams of being stuffed with seed creep right back in - it looks like your body is intent on probing the limits of your new fertility.  <b>You're in heat, and pregnable in several senses of the word!</b>", false);

                    // Also make a permanent nudge.
                    player.fertility++;
                }
                changes++;
            }
        }

        //bodypart changes:
        //gain ears
        if (player.upperBody.head.earType != EARS.MOUSE && changes < changeLimit && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYour ears ");
            if (player.upperBody.head.earType == EARS.HORSE || player.upperBody.head.earType == EARS.COW || player.upperBody.head.earType == EARS.DOG || player.upperBody.head.earType == EARS.BUNNY || player.upperBody.head.earType == EARS.KANGAROO) MainScreen.text("shrink suddenly");
            else MainScreen.text("pull away from your head");
            MainScreen.text(", like they're being pinched, and you can distinctly feel the auricles taking a rounded shape through the pain.  Reaching up to try and massage away their stings, <b>you're not terribly surprised when you find a pair of fuzzy mouse's ears poking through your " + hairDescript() + ".</b>");
            player.upperBody.head.earType = EARS.MOUSE;
            changes++;
        }
        //gain tail
        //from no tail
        if (player.upperBody.head.earType == EARS.MOUSE && player.tailType != TAIL.MOUSE && changes < changeLimit && Utils.rand(4) == 0) {
            //from other tail
            if (player.tailType > TAIL.NONE) {
                MainScreen.text("\n\nYour tail clenches and itches simultaneously, leaving you wondering whether to cry out or try to scratch it.  The question is soon answered as the pain takes the forefront; looking backward is a horrible strain, but when you manage it, you can see your old appendage ");
                if (player.tailType == TAIL.HORSE) MainScreen.text("elongating");
                else MainScreen.text("compressing");
                MainScreen.text(" into a long, thin line.  With a shudder, it begins to shed until it's completely, starkly nude.  <b>Your new mouse tail looks a bit peaked.</b>");
            }
            else MainScreen.text("\n\nA small nub pokes from your backside, and you turn to look at it.  When you do, your neck aches as if whiplashed, and you groan as your spine shifts smoothly downward like a rope being pulled, growing new vertebra behind it and expanding the nub into a naked, thin, tapered shape.  <b>Rubbing at your sore neck, you stare at your new mouse tail.</b>");
            player.tailType = TAIL.MOUSE;
            changes++;
        }
        //get teeth - from human, bunny, coonmask, or other humanoid teeth faces
        if (player.upperBody.head.earType == EARS.MOUSE && (player.faceType == FACE.HUMAN || player.faceType == FACE.SHARK_TEETH || player.faceType == FACE.BUNNY || player.faceType == FACE.SPIDER_FANGS || player.faceType == FACE.RACCOON_MASK) && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour teeth grind on their own, and you feel a strange, insistent pressure just under your nose.  As you open your mouth and run your tongue along them, you can feel ");
            if (player.faceType != FACE.HUMAN) MainScreen.text("the sharp teeth receding and ");
            MainScreen.text("your incisors lengthening.  It's not long before they're twice as long as their neighbors and the obvious growth stops, but the pressure doesn't go away completely.  <b>Well, you now have mouse incisors and your face aches a tiny bit - wonder if they're going to keep growing?</b>");
            player.faceType = FACE.BUCKTEETH;
            changes++;
        }
        //get mouse muzzle from mouse teeth or other muzzle
        if (player.skinType == SKIN.FUR && player.faceType != FACE.MOUSE && (player.faceType != FACE.HUMAN || player.faceType != FACE.SHARK_TEETH || player.faceType != FACE.BUNNY || player.faceType != FACE.SPIDER_FANGS || player.faceType != FACE.RACCOON_MASK) && Utils.rand(4) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nA wave of light-headedness hits you, and you black out.  In your unconsciousness, you dream of chewing - food, wood, cloth, paper, leather, even metal... whatever you can fit in your mouth, even if it doesn't taste like anything much.  For several minutes you just chew and chew your way through a parade of ordinary objects, savoring the texture of each one against your teeth, until finally you awaken.  Your teeth work, feeling longer and more prominent than before, and you hunt up your reflection.  <b>Your face has shifted to resemble a mouse's, down to the whiskers!</b>");
            player.faceType = FACE.MOUSE;
            changes++;
        }
        //get fur
        if ((player.skinType != SKIN.FUR || (player.skinType == SKIN.FUR && (player.hairColor != "brown" && player.hairColor != "white"))) && changes < changeLimit && Utils.rand(4) == 0) {
            //from skinscales
            if (player.skinType != SKIN.FUR) {
                MainScreen.text("\n\nYour " + player.skinFurScales() + " itch");
                if (player.skinType > SKIN.PLAIN) MainScreen.text("es");
                MainScreen.text(" all over");
                if (player.tailType > TAIL.NONE) MainScreen.text(", except on your tail");
                MainScreen.text(".  Alarmed and suspicious, you tuck in your hands, trying to will yourself not to scratch, but it doesn't make much difference.  Tufts of ");
                temp = Utils.rand(10);
                if (temp < 8) {
                    MainScreen.text("brown");
                    player.hairColor = "brown";
                }
                else {
                    MainScreen.text("white");
                    player.hairColor = "white";
                }
                MainScreen.text(" fur begin to force through your skin");
                if (player.skinType == SKIN.SCALES) MainScreen.text(", pushing your scales out with little pinches");
                MainScreen.text(", resolving the problem for you.  <b>You now have fur.</b>");
            }
            //from other color fur
            else {
                MainScreen.text("\n\nYour fur stands on end, as if trying to leap from your body - which it does next.  You watch, dumb with shock, as your covering deserts you, but it's quickly replaced with another layer of ");
                temp = Utils.rand(10);
                if (temp < 8) {
                    MainScreen.text("brown");
                    player.hairColor = "brown";
                }
                else {
                    MainScreen.text("white");
                    player.hairColor = "white";
                }
                MainScreen.text(" fuzz coming in behind it that soon grows to full-fledged fur.");
            }
            player.skinAdj = "";
            player.skinDesc = "fur";
            player.skinType = SKIN.FUR;
            changes++;
        }
    }
}