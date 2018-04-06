import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import DisplayText from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import Cock from '../../Body/Cock';
import { EyeType } from '../../Body/Eyes';
import { FaceType } from '../../Body/Face';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import Vagina from '../../Body/Vagina';
import { WingType } from '../../Body/Wings';
import Character from '../../Character/Character';
import * as BallsDescriptor from '../../Descriptors/BallsDescriptor';
import * as CockDescriptor from '../../Descriptors/CockDescriptor';
import * as FaceDescriptor from '../../Descriptors/FaceDescriptor';
import * as LegDescriptor from '../../Descriptors/LegDescriptor';
import * as VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import { PerkType } from '../../Effects/PerkType';
import ItemDesc from '../ItemDesc';

export default class SharkTooth extends Consumable {
    private enhanced: boolean;

    public constructor(enhanced: boolean) {
        if (!enhanced)
            super(ConsumableName.SharkTooth, new ItemDesc("Shark.T", "a sharp shark tooth", "A glinting white tooth, very sharp and intimidating."));
        else
            super(ConsumableName.SharkToothEnhanced, new ItemDesc("TSTooth", "a glowing tiger shark tooth", "This looks like a normal shark tooth, though with an odd purple glow."));
        this.enhanced = enhanced;
    }

    public use(character: Character) {
        let changes: number = 0;
        let changeLimit: number = 2;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(2) === 0) changeLimit++;
        if (character.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        DisplayText().clear();
        if (!this.enhanced)
            DisplayText("You have no idea why, but you decide to eat the pointed tooth. To your surprise, it's actually quite brittle, turning into a fishy-tasting dust. You figure it must just be a tablet made to look like a shark's tooth.");
        else
            DisplayText("You have no idea why, but you decide to eat the pointed, glowing tooth. To your surprise, it's actually quite brittle, crumbling into a fishy-tasting dust. Maybe it's just a tablet made to look like a shark's tooth.");
        // STATS
        // Increase strength 1-2 points (Up to 50) (60 for tiger)
        if (((character.stats.str < 60 && this.enhanced) || character.stats.str < 50) && randInt(3) === 0) {
            character.stats.str += 1 + randInt(2);
            DisplayText("\n\nA painful ripple passes through the muscles of your body.  It takes you a few moments, but you quickly realize you're a little bit stronger now.");
            changes++;
        }
        // Increase Speed 1-3 points (Up to 75) (100 for tigers)
        if (((character.stats.spe < 100 && this.enhanced) || character.stats.spe < 75) && randInt(3) === 0) {
            character.stats.spe += 1 + randInt(3);
            changes++;
            DisplayText("\n\nShivering without warning, you nearly trip over yourself as you walk.  A few tries later you realize your muscles have become faster.");
        }
        // Reduce sensitivity 1-3 Points (Down to 25 points)
        if (character.stats.sens > 25 && randInt(1.5) === 0 && changes < changeLimit) {
            character.stats.sens += -1 - randInt(3);
            changes++;
            DisplayText("\n\nIt takes a while, but you eventually realize your body has become less sensitive.");
        }
        // Increase Libido 2-4 points (Up to 75 points) (100 for tigers)
        if (((character.stats.lib < 100 && this.enhanced) || character.stats.lib < 75) && randInt(3) === 0 && changes < changeLimit) {
            character.stats.lib += 1 + randInt(3);
            changes++;
            DisplayText("\n\nA blush of red works its way across your skin as your sex drive kicks up a notch.");
        }
        // Decrease intellect 1-3 points (Down to 40 points)
        if (character.stats.int > 40 && randInt(3) === 0 && changes < changeLimit) {
            character.stats.int += -1 - randInt(3);
            changes++;
            DisplayText("\n\nYou shake your head and struggle to gather your thoughts, feeling a bit slow.");
        }
        // Smexual stuff!
        // -TIGGERSHARK ONLY: Grow a cunt (guaranteed if no gender)
        if (this.enhanced && (character.gender === 0 || (character.torso.vaginas.count <= 0 && changes < changeLimit && randInt(3) === 0))) {
            changes++;
            // (balls)
            if (character.torso.balls.quantity > 0)
                DisplayText("\n\nAn itch starts behind your " + BallsDescriptor.describeBalls(true, true, character) + ", but before you can reach under to scratch it, the discomfort fades. A moment later a warm, wet feeling brushes your " + BallsDescriptor.describeSack(character) + ", and curious about the sensation, <b>you lift up your balls to reveal your new vagina.</b>");
            // (dick)
            else if (character.torso.cocks.count > 0)
                DisplayText("\n\nAn itch starts on your groin, just below your " + CockDescriptor.describeMultiCockShort(character) + ". You pull the manhood aside to give you a better view, and you're able to watch as <b>your skin splits to give you a new vagina, complete with a tiny clit.</b>");
            // (neither)
            else DisplayText("\n\nAn itch starts on your groin and fades before you can take action. Curious about the intermittent sensation, <b>you peek under your " + character.inventory.equipment.armor.displayName + " to discover your bUtils.Utils.rand( new vagina, complete with pussy lips and a tiny clit.</b>");
            const newVagina: Vagina = new Vagina();
            character.torso.vaginas.add(newVagina);
            character.stats.sens += 10;
            character.updateGender();
        }
        // WANG GROWTH - TIGGERSHARK ONLY
        if (this.enhanced && (character.torso.cocks.count <= 0) && changes < changeLimit && randInt(3) === 0) {
            // Genderless:
            if (character.torso.vaginas.count <= 0) DisplayText("\n\nYou feel a sudden stabbing pain in your featureless crotch and bend over, moaning in agony. Your hands clasp protectively over the surface - which is swelling in an alarming fashion under your fingers! Stripping off your clothes, you are presented with the shocking site of once-smooth flesh swelling and flowing like self-animate clay, resculpting itself into the form of male genitalia! When the pain dies down, you are the proud owner of a new human-shaped penis");
            // Female:
            else DisplayText("\n\nYou feel a sudden stabbing pain just above your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " and bend over, moaning in agony. Your hands clasp protectively over the surface - which is swelling in an alarming fashion under your fingers! Stripping off your clothes, you are presented with the shocking site of once-smooth flesh swelling and flowing like self-animate clay, resculpting itself into the form of male genitalia! When the pain dies down, you are the proud owner of not only a " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + ", but a new human-shaped penis");
            if (character.torso.balls.quantity === 0) {
                DisplayText(" and a pair of balls");
                character.torso.balls.quantity = 2;
                character.torso.balls.size = 2;
            }
            DisplayText("!");
            const newCock: Cock = new Cock(7, 1.4);
            character.torso.cocks.add(newCock);
            character.stats.lib += 4;
            character.stats.sens += 5;
            character.stats.lust += 20;
            character.updateGender();
            changes++;
        }
        // (Requires the character having two testicles)
        if (this.enhanced && (character.torso.balls.quantity === 0 || character.torso.balls.quantity === 2) && character.torso.cocks.count > 0 && changes < changeLimit && randInt(3) === 0) {
            if (character.torso.balls.quantity === 2) {
                DisplayText("\n\nYou gasp in shock as a sudden pain racks your abdomen. Within seconds, two more testes drop down into your " + BallsDescriptor.describeSack(character) + ", your skin stretching out to accommodate them. Once the pain clears, you examine <b>your new quartet of testes.</b>");
                character.torso.balls.quantity = 4;
            }
            else if (character.torso.balls.quantity === 0) {
                DisplayText("\n\nYou gasp in shock as a sudden pain racks your abdomen. Within seconds, two balls drop down into a new sack, your skin stretching out to accommodate them. Once the pain clears, you examine <b>your new pair of testes.</b>");
                character.torso.balls.quantity = 2;
                character.torso.balls.size = 2;
            }
            character.stats.lib += 2;
            character.stats.sens += 3;
            character.stats.lust += 10;
            changes++;
        }
        // Transformations:
        // Mouth TF
        if (character.torso.neck.head.face.type !== FaceType.SHARK_TEETH && randInt(3) === 0 && changes < changeLimit) {
            DisplayText("\n\n");
            if (character.torso.neck.head.face.type > FaceType.HUMAN && character.torso.neck.head.face.type < FaceType.SHARK_TEETH) DisplayText("Your " + FaceDescriptor.describeFace(character) + " explodes with agony, reshaping into a more human-like visage.  ");
            character.torso.neck.head.face.type = FaceType.SHARK_TEETH;
            DisplayText("You firmly grasp your mouth, an intense pain racking your oral cavity. Your gums shift around and the bones in your jaw reset. You blink a few times wondering what just happened. You move over to a puddle to catch sight of your reflection, and you are thoroughly surprised by what you see. A set of retractable shark fangs have grown in front of your normal teeth, and your face has elongated slightly to accommodate them!  They even scare you a little.\n(Gain: 'Bite' special attack)");
            changes++;
        }
        // Remove odd eyes
        if (changes < changeLimit && randInt(5) === 0 && character.torso.neck.head.face.eyes.type > EyeType.HUMAN) {
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
        // Tail TF
        if (character.torso.tails.reduce(Tail.HasType(TailType.SHARK), false) && randInt(3) === 0 && changes < changeLimit) {
            changes++;
            if (character.torso.tails.count >= 1) DisplayText("\n\nJets of pain shoot down your spine, causing you to gasp in surprise and fall to your hands and knees. Feeling a bulging at the end of your back, you lower your " + character.inventory.equipment.armor.displayName + " down just in time for a fully formed shark tail to burst through. You swish it around a few times, surprised by how flexible it is. After some modifications to your clothing, you're ready to go with your bUtils.Utils.rand( new shark tail.");
            else DisplayText("\n\nJets of pain shoot down your spine into your tail.  You feel the tail bulging out until it explodes into a large and flexible shark-tail.  You swish it about experimentally, and find it quite easy to control.");
            character.torso.tails.clear();
            character.torso.tails.add(new Tail(TailType.SHARK));
        }
        // Hair
        if (character.torso.neck.head.hair.color !== "silver" && randInt(4) === 0 && changes < changeLimit) {
            changes++;
            DisplayText("\n\nYou feel a tingling in your scalp and reach up to your head to investigate. To your surprise, your hair color has changed into a silvery color, just like that of a shark girl!");
            character.torso.neck.head.hair.color = "silver";
        }
        // Skin
        if (((character.skin.tone !== "rough gray" && character.skin.tone !== "orange and black striped") || character.skin.type !== SkinType.PLAIN) && randInt(7) === 0 && changes < changeLimit) {
            DisplayText("\n\n");
            if (character.skin.type === SkinType.FUR || character.skin.type === SkinType.SCALES) DisplayText("Your " + character.skin.desc + " falls out, collecting on the floor and exposing your supple skin underneath.  ");
            else if (character.skin.type === SkinType.GOO) DisplayText("Your gooey skin solidifies, thickening up as your body starts to solidy into a more normal form. ");
            else if (!this.enhanced) DisplayText("Your skin itches and tingles becoming slightly rougher and turning gray.  ");
            if (!this.enhanced) {
                DisplayText("You abruptly stop moving and gasp sharply as a shudder goes up your entire frame. Your skin begins to shift and morph, growing slightly thicker and changing into a shiny grey color. Your skin now feels oddly rough too, comparable to that of a marine mammal. You smile and run your hands across your new shark skin.");
                character.skin.type = SkinType.PLAIN;
                character.skin.desc = "skin";
                character.skin.tone = "rough gray";
                changes++;
            }
            else {
                DisplayText("Your skin begins to tingle and itch, before rapidly shifting to a shiny orange color, marked by Utils.random black stripes. You take a quick look in a nearby pool of water, to see your skin has morphed in appearance and texture to become more like a tigershark!");
                character.skin.type = SkinType.PLAIN;
                character.skin.desc = "skin";
                character.skin.tone = "orange and black striped";
                changes++;
            }
        }
        // FINZ R WINGS
        if (character.torso.wings.type !== WingType.SHARK_FIN && changes < changeLimit && randInt(3) === 0) {
            DisplayText("\n\n");
            if (character.torso.wings.type > WingType.NONE) DisplayText("Your wings fold into themselves, merging together with your back.  ");
            DisplayText("You groan and slump down in pain, almost instantly regretting eating the tooth. You start sweating profusely and panting loudly, feeling the space between your shoulder blades shifting about. You hastily remove your " + character.inventory.equipment.armor.displayName + " just in time before a strange fin-like structure bursts from in-between your shoulders. You examine it carefully and make a few modifications to your " + character.inventory.equipment.armor.displayName + " to accommodate your new fin.");
            character.torso.wings.type = WingType.SHARK_FIN;
            character.torso.wings.desc = "";
            changes++;
        }
        if (changes === 0) {
            DisplayText("\n\nNothing happened.  Weird.");
        }
    }
}
