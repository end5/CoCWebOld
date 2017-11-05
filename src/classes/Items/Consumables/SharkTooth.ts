import Consumable from './Consumable';
import Cock from '../../Body/Cock';
import { SkinType } from '../../Body/Creature';
import { EyeType, FaceType } from '../../Body/Face';
import { TailType } from '../../Body/LowerBody';
import { WingType } from '../../Body/UpperBody';
import Vagina from '../../Body/Vagina';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import FaceDescriptor from '../../Descriptors/FaceDescriptor';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import MainScreen from '../../display/MainScreen';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class SharkTooth extends Consumable {
    private enhanced: boolean;

    public constructor(enhanced: boolean) {
        if (!enhanced)
            super("Shark.T", new ItemDesc("Shark.T", "a sharp shark tooth", "A glinting white tooth, very sharp and intimidating."));
        else
            super("TSTooth", new ItemDesc("TSTooth", "a glowing tiger shark tooth", "This looks like a normal shark tooth, though with an odd purple glow."));
        this.enhanced = enhanced;
    }

    public use(player: Player) {
        let changes: number = 0;
        let changeLimit: number = 2;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        if (!this.enhanced)
            MainScreen.text("You have no idea why, but you decide to eat the pointed tooth. To your surprise, it's actually quite brittle, turning into a fishy-tasting dust. You figure it must just be a tablet made to look like a shark's tooth.", true);
        else
            MainScreen.text("You have no idea why, but you decide to eat the pointed, glowing tooth. To your surprise, it's actually quite brittle, crumbling into a fishy-tasting dust. Maybe it's just a tablet made to look like a shark's tooth.", true);
        //STATS
        //Increase strength 1-2 points (Up to 50) (60 for tiger)
        if (((player.stats.str < 60 && this.enhanced) || player.stats.str < 50) && Utils.rand(3) == 0) {
            player.stats.str += 1 + Utils.rand(2);
            MainScreen.text("\n\nA painful ripple passes through the muscles of your body.  It takes you a few moments, but you quickly realize you're a little bit stronger now.", false);
            changes++;
        }
        //Increase Speed 1-3 points (Up to 75) (100 for tigers)
        if (((player.stats.spe < 100 && this.enhanced) || player.stats.spe < 75) && Utils.rand(3) == 0) {
            player.stats.spe += 1 + Utils.rand(3);
            changes++;
            MainScreen.text("\n\nShivering without warning, you nearly trip over yourself as you walk.  A few tries later you realize your muscles have become faster.", false);
        }
        //Reduce sensitivity 1-3 Points (Down to 25 points)
        if (player.stats.sens > 25 && Utils.rand(1.5) == 0 && changes < changeLimit) {
            player.stats.sens += -1 - Utils.rand(3);
            changes++;
            MainScreen.text("\n\nIt takes a while, but you eventually realize your body has become less sensitive.", false);
        }
        //Increase Libido 2-4 points (Up to 75 points) (100 for tigers)
        if (((player.stats.lib < 100 && this.enhanced) || player.stats.lib < 75) && Utils.rand(3) == 0 && changes < changeLimit) {
            player.stats.lib += 1 + Utils.rand(3);
            changes++;
            MainScreen.text("\n\nA blush of red works its way across your skin as your sex drive kicks up a notch.", false);
        }
        //Decrease intellect 1-3 points (Down to 40 points)
        if (player.stats.int > 40 && Utils.rand(3) == 0 && changes < changeLimit) {
            player.stats.int += -1 - Utils.rand(3);
            changes++;
            MainScreen.text("\n\nYou shake your head and struggle to gather your thoughts, feeling a bit slow.", false);
        }
        //Smexual stuff!
        //-TIGGERSHARK ONLY: Grow a cunt (guaranteed if no gender)
        if (this.enhanced && (player.gender == 0 || (!player.lowerBody.vaginaSpot.hasVagina() && changes < changeLimit && Utils.rand(3) == 0))) {
            changes++;
            //(balls)
            if (player.lowerBody.balls > 0)
                MainScreen.text("\n\nAn itch starts behind your " + BallsDescriptor.describeBalls(true, true, player) + ", but before you can reach under to scratch it, the discomfort fades. A moment later a warm, wet feeling brushes your " + BallsDescriptor.describeSack(player) + ", and curious about the sensation, <b>you lift up your balls to reveal your new vagina.</b>", false);
            //(dick)
            else if (player.lowerBody.cockSpot.hasCock())
                MainScreen.text("\n\nAn itch starts on your groin, just below your " + CockDescriptor.describeMultiCockShort(player) + ". You pull the manhood aside to give you a better view, and you're able to watch as <b>your skin splits to give you a new vagina, complete with a tiny clit.</b>", false);
            //(neither)
            else MainScreen.text("\n\nAn itch starts on your groin and fades before you can take action. Curious about the intermittent sensation, <b>you peek under your " + player.inventory.armorSlot.equipment.displayName + " to discover your bUtils.Utils.rand new vagina, complete with pussy lips and a tiny clit.</b>", false);
            const newVagina: Vagina = new Vagina();
            newVagina.clitLength = .25;
            player.lowerBody.vaginaSpot.add(newVagina);
            player.stats.sens += 10;
            player.updateGender();
        }
        //WANG GROWTH - TIGGERSHARK ONLY
        if (this.enhanced && (!player.lowerBody.cockSpot.hasCock()) && changes < changeLimit && Utils.rand(3) == 0) {
            //Genderless:
            if (!player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("\n\nYou feel a sudden stabbing pain in your featureless crotch and bend over, moaning in agony. Your hands clasp protectively over the surface - which is swelling in an alarming fashion under your fingers! Stripping off your clothes, you are presented with the shocking site of once-smooth flesh swelling and flowing like self-animate clay, resculpting itself into the form of male genitalia! When the pain dies down, you are the proud owner of a new human-shaped penis", false);
            //Female:
            else MainScreen.text("\n\nYou feel a sudden stabbing pain just above your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " and bend over, moaning in agony. Your hands clasp protectively over the surface - which is swelling in an alarming fashion under your fingers! Stripping off your clothes, you are presented with the shocking site of once-smooth flesh swelling and flowing like self-animate clay, resculpting itself into the form of male genitalia! When the pain dies down, you are the proud owner of not only a " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ", but a new human-shaped penis", false);
            if (player.lowerBody.balls == 0) {
                MainScreen.text(" and a pair of balls", false);
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 2;
            }
            MainScreen.text("!", false);
            const newCock: Cock = new Cock(7, 1.4);
            player.lowerBody.cockSpot.add(newCock);
            player.stats.lib += 4;
            player.stats.sens += 5;
            player.stats.lust += 20;
            player.updateGender();
            changes++;
        }
        //(Requires the player having two testicles)
        if (this.enhanced && (player.lowerBody.balls == 0 || player.lowerBody.balls == 2) && player.lowerBody.cockSpot.hasCock() && changes < changeLimit && Utils.rand(3) == 0) {
            if (player.lowerBody.balls == 2) {
                MainScreen.text("\n\nYou gasp in shock as a sudden pain racks your abdomen. Within seconds, two more testes drop down into your " + BallsDescriptor.describeSack(player) + ", your skin stretching out to accommodate them. Once the pain clears, you examine <b>your new quartet of testes.</b>", false);
                player.lowerBody.balls = 4;
            }
            else if (player.lowerBody.balls == 0) {
                MainScreen.text("\n\nYou gasp in shock as a sudden pain racks your abdomen. Within seconds, two balls drop down into a new sack, your skin stretching out to accommodate them. Once the pain clears, you examine <b>your new pair of testes.</b>", false);
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 2;
            }
            player.stats.lib += 2;
            player.stats.sens += 3;
            player.stats.lust += 10;
            changes++;
        }
        //Transformations:
        //Mouth TF
        if (player.upperBody.head.face.faceType != FaceType.SHARK_TEETH && Utils.rand(3) == 0 && changes < changeLimit) {
            MainScreen.text("\n\n", false);
            if (player.upperBody.head.face.faceType > FaceType.HUMAN && player.upperBody.head.face.faceType < FaceType.SHARK_TEETH) MainScreen.text("Your " + FaceDescriptor.describeFace(player) + " explodes with agony, reshaping into a more human-like visage.  ", false);
            player.upperBody.head.face.faceType = FaceType.SHARK_TEETH;
            MainScreen.text("You firmly grasp your mouth, an intense pain racking your oral cavity. Your gums shift around and the bones in your jaw reset. You blink a few times wondering what just happened. You move over to a puddle to catch sight of your reflection, and you are thoroughly surprised by what you see. A set of retractable shark fangs have grown in front of your normal teeth, and your face has elongated slightly to accommodate them!  They even scare you a little.\n(Gain: 'Bite' special attack)", false);
            changes++;
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
        //Tail TF
        if (player.lowerBody.tailType != TailType.SHARK && Utils.rand(3) == 0 && changes < changeLimit) {
            changes++;
            if (player.lowerBody.tailType == TailType.NONE) MainScreen.text("\n\nJets of pain shoot down your spine, causing you to gasp in surprise and fall to your hands and knees. Feeling a bulging at the end of your back, you lower your " + player.inventory.armorSlot.equipment.displayName + " down just in time for a fully formed shark tail to burst through. You swish it around a few times, surprised by how flexible it is. After some modifications to your clothing, you're ready to go with your bUtils.Utils.rand new shark tail.", false);
            else MainScreen.text("\n\nJets of pain shoot down your spine into your tail.  You feel the tail bulging out until it explodes into a large and flexible shark-tail.  You swish it about experimentally, and find it quite easy to control.", false);
            player.lowerBody.tailType = TailType.SHARK;
        }
        //Hair
        if (player.upperBody.head.hairColor != "silver" && Utils.rand(4) == 0 && changes < changeLimit) {
            changes++;
            MainScreen.text("\n\nYou feel a tingling in your scalp and reach up to your head to investigate. To your surprise, your hair color has changed into a silvery color, just like that of a shark girl!", false);
            player.upperBody.head.hairColor = "silver";
        }
        //Skin
        if (((player.skinTone != "rough gray" && player.skinTone != "orange and black striped") || player.skinType != SkinType.PLAIN) && Utils.rand(7) == 0 && changes < changeLimit) {
            MainScreen.text("\n\n", false);
            if (player.skinType == SkinType.FUR || player.skinType == SkinType.SCALES) MainScreen.text("Your " + player.skinDesc + " falls out, collecting on the floor and exposing your supple skin underneath.  ", false);
            else if (player.skinType == SkinType.GOO) MainScreen.text("Your gooey skin solidifies, thickening up as your body starts to solidy into a more normal form. ", false);
            else if (!this.enhanced) MainScreen.text("Your skin itches and tingles becoming slightly rougher and turning gray.  ", false);
            if (!this.enhanced) {
                MainScreen.text("You abruptly stop moving and gasp sharply as a shudder goes up your entire frame. Your skin begins to shift and morph, growing slightly thicker and changing into a shiny grey color. Your skin now feels oddly rough too, comparable to that of a marine mammal. You smile and run your hands across your new shark skin.", false);
                player.skinType = SkinType.PLAIN;
                player.skinDesc = "skin";
                player.skinTone = "rough gray";
                changes++;
            }
            else {
                MainScreen.text("Your skin begins to tingle and itch, before rapidly shifting to a shiny orange color, marked by Utils.random black stripes. You take a quick look in a nearby pool of water, to see your skin has morphed in appearance and texture to become more like a tigershark!", false);
                player.skinType = SkinType.PLAIN;
                player.skinDesc = "skin";
                player.skinTone = "orange and black striped";
                changes++;
            }
        }
        //FINZ R WINGS
        if (player.upperBody.wingType != WingType.SHARK_FIN && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\n", false);
            if (player.upperBody.wingType > WingType.NONE) MainScreen.text("Your wings fold into themselves, merging together with your back.  ", false);
            MainScreen.text("You groan and slump down in pain, almost instantly regretting eating the tooth. You start sweating profusely and panting loudly, feeling the space between your shoulder blades shifting about. You hastily remove your " + player.inventory.armorSlot.equipment.displayName + " just in time before a strange fin-like structure bursts from in-between your shoulders. You examine it carefully and make a few modifications to your " + player.inventory.armorSlot.equipment.displayName + " to accommodate your new fin.", false);
            player.upperBody.wingType = WingType.SHARK_FIN;
            player.upperBody.wingDesc = "";
            changes++;
        }
        if (changes == 0) {
            MainScreen.text("\n\nNothing happened.  Weird.", false);
        }
    }
}