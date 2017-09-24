import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class SharkTooth extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        let changes: number = 0;
        let changeLimit: number = 2;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        if (type == 0) MainScreen.text("You have no idea why, but you decide to eat the pointed tooth. To your surprise, it's actually quite brittle, turning into a fishy-tasting dust. You figure it must just be a tablet made to look like a shark's tooth.", true);
        else if (type == 1) MainScreen.text("You have no idea why, but you decide to eat the pointed, glowing tooth. To your surprise, it's actually quite brittle, crumbling into a fishy-tasting dust. Maybe it's just a tablet made to look like a shark's tooth.", true);
        //STATS
        //Increase strength 1-2 points (Up to 50) (60 for tiger)
        if (((player.str < 60 && type == 1) || player.str < 50) && Utils.rand(3) == 0) {
            dynStats("str", 1 + Utils.rand(2));
            MainScreen.text("\n\nA painful ripple passes through the muscles of your body.  It takes you a few moments, but you quickly realize you're a little bit stronger now.", false);
            changes++;
        }
        //Increase Speed 1-3 points (Up to 75) (100 for tigers)
        if (((player.stats.spe < 100 && type == 1) || player.stats.spe < 75) && Utils.rand(3) == 0) {
            dynStats("spe", 1 + Utils.rand(3));
            changes++;
            MainScreen.text("\n\nShivering without warning, you nearly trip over yourself as you walk.  A few tries later you realize your muscles have become faster.", false);
        }
        //Reduce sensitivity 1-3 Points (Down to 25 points)
        if (player.stats.sens > 25 && Utils.rand(1.5) == 0 && changes < changeLimit) {
            dynStats("sen", (-1 - Utils.rand(3)));
            changes++;
            MainScreen.text("\n\nIt takes a while, but you eventually realize your body has become less sensitive.", false);
        }
        //Increase Libido 2-4 points (Up to 75 points) (100 for tigers)
        if (((player.stats.lib < 100 && type == 1) || player.stats.lib < 75) && Utils.rand(3) == 0 && changes < changeLimit) {
            dynStats("lib", (1 + Utils.rand(3)));
            changes++;
            MainScreen.text("\n\nA blush of red works its way across your skin as your sex drive kicks up a notch.", false);
        }
        //Decrease intellect 1-3 points (Down to 40 points)
        if (player.stats.int > 40 && Utils.rand(3) == 0 && changes < changeLimit) {
            dynStats("int", -(1 + Utils.rand(3)));
            changes++;
            MainScreen.text("\n\nYou shake your head and struggle to gather your thoughts, feeling a bit slow.", false);
        }
        //Smexual stuff!
        //-TIGGERSHARK ONLY: Grow a cunt (guaranteed if no gender)
        if (type == 1 && (player.gender == 0 || (!player.lowerBody.vaginaSpot.hasVagina() && changes < changeLimit && Utils.rand(3) == 0))) {
            changes++;
            //(balls)
            if (player.lowerBody.balls > 0) MainScreen.text("\n\nAn itch starts behind your " + ballsDescriptLight() + ", but before you can reach under to scratch it, the discomfort fades. A moment later a warm, wet feeling brushes your " + sackDescript() + ", and curious about the sensation, <b>you lift up your balls to reveal your new vagina.</b>", false);
            //(dick)
            else if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("\n\nAn itch starts on your groin, just below your " + multiCockDescriptLight() + ". You pull the manhood aside to give you a better view, and you're able to watch as <b>your skin splits to give you a new vagina, complete with a tiny clit.</b>", false);
            //(neither)
            else MainScreen.text("\n\nAn itch starts on your groin and fades before you can take action. Curious about the intermittent sensation, <b>you peek under your " + player.armorName + " to discover your bUtils.Utils.rand new vagina, complete with pussy lips and a tiny clit.</b>", false);
            player.createVagina();
            player.lowerBody.vaginaSpot.list[0].clitLength = .25;
            dynStats("sen", 10);
            player.genderCheck();
        }
        //WANG GROWTH - TIGGERSHARK ONLY
        if (type == 1 && (!player.lowerBody.cockSpot.hasCock()) && changes < changeLimit && Utils.rand(3) == 0) {
            //Genderless:
            if (!player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("\n\nYou feel a sudden stabbing pain in your featureless crotch and bend over, moaning in agony. Your hands clasp protectively over the surface - which is swelling in an alarming fashion under your fingers! Stripping off your clothes, you are presented with the shocking site of once-smooth flesh swelling and flowing like self-animate clay, resculpting itself into the form of male genitalia! When the pain dies down, you are the proud owner of a new human-shaped penis", false);
            //Female:
            else MainScreen.text("\n\nYou feel a sudden stabbing pain just above your " + vaginaDescript() + " and bend over, moaning in agony. Your hands clasp protectively over the surface - which is swelling in an alarming fashion under your fingers! Stripping off your clothes, you are presented with the shocking site of once-smooth flesh swelling and flowing like self-animate clay, resculpting itself into the form of male genitalia! When the pain dies down, you are the proud owner of not only a " + vaginaDescript() + ", but a new human-shaped penis", false);
            if (player.lowerBody.balls == 0) {
                MainScreen.text(" and a pair of balls", false);
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 2;
            }
            MainScreen.text("!", false);
            player.createCock(7, 1.4);
            dynStats("lib", 4, "sen", 5, "lus", 20);
            player.genderCheck();
            changes++;
        }
        //(Requires the player having two testicles)
        if (type == 1 && (player.lowerBody.balls == 0 || player.lowerBody.balls == 2) && player.lowerBody.cockSpot.hasCock() && changes < changeLimit && Utils.rand(3) == 0) {
            if (player.lowerBody.balls == 2) {
                MainScreen.text("\n\nYou gasp in shock as a sudden pain racks your abdomen. Within seconds, two more testes drop down into your " + sackDescript() + ", your skin stretching out to accommodate them. Once the pain clears, you examine <b>your new quartet of testes.</b>", false);
                player.lowerBody.balls = 4;
            }
            else if (player.lowerBody.balls == 0) {
                MainScreen.text("\n\nYou gasp in shock as a sudden pain racks your abdomen. Within seconds, two balls drop down into a new sack, your skin stretching out to accommodate them. Once the pain clears, you examine <b>your new pair of testes.</b>", false);
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 2;
            }
            dynStats("lib", 2, "sen", 3, "lus", 10);
            changes++;
        }
        //Transformations:
        //Mouth TF
        if (player.faceType != FACE.SHARK_TEETH && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\n", false);
            if (player.faceType > FACE.HUMAN && player.faceType < FACE.SHARK_TEETH) MainScreen.text("Your " + player.face() + " explodes with agony, reshaping into a more human-like visage.  ", false);
            player.faceType = FACE.SHARK_TEETH;
            MainScreen.text("You firmly grasp your mouth, an intense pain racking your oral cavity. Your gums shift around and the bones in your jaw reset. You blink a few times wondering what just happened. You move over to a puddle to catch sight of your reflection, and you are thoroughly surprised by what you see. A set of retractable shark fangs have grown in front of your normal teeth, and your face has elongated slightly to accommodate them!  They even scare you a little.\n(Gain: 'Bite' special attack)", false);
            changes++;
        }
        //Remove odd eyes
        if (changes < changeLimit && Utils.rand(5) == 0 && player.eyeType > EYES.HUMAN) {
            if (player.eyeType == EYES.BLACK_EYES_SAND_TRAP) {
                MainScreen.text("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                MainScreen.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + player.feet() + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.", false);
                if (player.eyeType == EYES.FOUR_SPIDER_EYES) MainScreen.text("  Your multiple, arachnid eyes are gone!</b>", false);
                MainScreen.text("  <b>You have normal, humanoid eyes again.</b>", false);
            }
            player.eyeType = EYES.HUMAN;
            changes++;
        }
        //Tail TF
        if (player.tailType != TAIL.SHARK && Utils.rand(3) == 0 && changes < changeLimit) {
            changes++;
            if (player.tailType == TAIL.NONE) MainScreen.text("\n\nJets of pain shoot down your spine, causing you to gasp in surprise and fall to your hands and knees. Feeling a bulging at the end of your back, you lower your " + player.armorName + " down just in time for a fully formed shark tail to burst through. You swish it around a few times, surprised by how flexible it is. After some modifications to your clothing, you're ready to go with your bUtils.Utils.rand new shark tail.", false);
            else MainScreen.text("\n\nJets of pain shoot down your spine into your tail.  You feel the tail bulging out until it explodes into a large and flexible shark-tail.  You swish it about experimentally, and find it quite easy to control.", false);
            player.tailType = TAIL.SHARK;
        }
        //Hair
        if (player.hairColor != "silver" && Utils.rand(4) == 0 && changes < changeLimit) {
            changes++;
            MainScreen.text("\n\nYou feel a tingling in your scalp and reach up to your head to investigate. To your surprise, your hair color has changed into a silvery color, just like that of a shark girl!", false);
            player.hairColor = "silver";
        }
        //Skin
        if (((player.skinTone != "rough gray" && player.skinTone != "orange and black striped") || player.skinType != SKIN.PLAIN) && Utils.rand(7) == 0 && changes < changeLimit) {
            MainScreen.text("\n\n", false);
            if (player.skinType == SKIN.FUR || player.skinType == SKIN.SCALES) MainScreen.text("Your " + player.skinDesc + " falls out, collecting on the floor and exposing your supple skin underneath.  ", false);
            else if (player.skinType == SKIN.GOO) MainScreen.text("Your gooey skin solidifies, thickening up as your body starts to solidy into a more normal form. ", false);
            else if (type == 0) MainScreen.text("Your skin itches and tingles becoming slightly rougher and turning gray.  ", false);
            if (type == 0) {
                MainScreen.text("You abruptly stop moving and gasp sharply as a shudder goes up your entire frame. Your skin begins to shift and morph, growing slightly thicker and changing into a shiny grey color. Your skin now feels oddly rough too, comparable to that of a marine mammal. You smile and run your hands across your new shark skin.", false);
                player.skinType = SKIN.PLAIN;
                player.skinDesc = "skin";
                player.skinTone = "rough gray";
                changes++;
            }
            else {
                MainScreen.text("Your skin begins to tingle and itch, before rapidly shifting to a shiny orange color, marked by Utils.random black stripes. You take a quick look in a nearby pool of water, to see your skin has morphed in appearance and texture to become more like a tigershark!", false);
                player.skinType = SKIN.PLAIN;
                player.skinDesc = "skin";
                player.skinTone = "orange and black striped";
                changes++;
            }
        }
        //FINZ R WINGS
        if (player.upperBody.wingType != WING.SHARK_FIN && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\n", false);
            if (player.upperBody.wingType > WING.NONE) MainScreen.text("Your wings fold into themselves, merging together with your back.  ", false);
            MainScreen.text("You groan and slump down in pain, almost instantly regretting eating the tooth. You start sweating profusely and panting loudly, feeling the space between your shoulder blades shifting about. You hastily remove your " + player.armorName + " just in time before a strange fin-like structure bursts from in-between your shoulders. You examine it carefully and make a few modifications to your " + player.armorName + " to accommodate your new fin.", false);
            player.upperBody.wingType = WING.SHARK_FIN;
            player.upperBody.wingDesc = "";
            changes++;
        }
        if (changes == 0) {
            MainScreen.text("\n\nNothing happened.  Weird.", false);
        }
    }
}