import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import { ArmType } from '../../Body/Arms';
import { EarType } from '../../Body/Ears';
import { EyeType } from '../../Body/Eyes';
import { FaceType } from '../../Body/Face';
import { AntennaeType } from '../../Body/Head';
import { SkinType } from '../../Body/Skin';
import { VaginaType } from '../../Body/Vagina';
import { WingType } from '../../Body/Wings';
import Character from '../../Character/Character';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import LegDescriptor from '../../Descriptors/LegDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import BodyModifier from '../../Modifiers/BodyModifier';
import CockModifier from '../../Modifiers/CockModifier';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class GoblinAle extends Consumable {
    public constructor() {
        super(ConsumableName.GoblinAle, new ItemDesc("Gob.Ale", "a flagon of potent goblin ale", "This sealed flagon of 'Goblin Ale' sloshes noisily with alcoholic brew.  Judging by the markings on the flagon, it's a VERY strong drink, and not to be trifled with."));
    }

    public use(character: Character) {
        character.slimeFeed();
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(3) === 0) changeLimit++;
        if (Utils.rand(4) === 0) changeLimit++;
        if (Utils.rand(5) === 0) changeLimit++;
        if (character.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        DisplayText().clear();
        DisplayText("You drink the ale, finding it to have a remarkably smooth yet potent taste.  You lick your lips and sneeze, feeling slightly tipsy.");
        character.stats.lust += 15;
        // Stronger
        if (character.stats.str > 50) {
            character.stats.str += -1;
            if (character.stats.str > 70) character.stats.str += -1;
            if (character.stats.str > 90) character.stats.str += -2;
            DisplayText("\n\nYou feel a little weaker, but maybe it's just the alcohol.");
        }
        // Less tough
        if (character.stats.tou > 50) {
            DisplayText("\n\nGiggling, you poke yourself, which only makes you giggle harder when you realize how much softer you feel.");
            character.stats.tou += -1;
            if (character.stats.tou > 70) character.stats.tou += -1;
            if (character.stats.tou > 90) character.stats.tou += -2;
        }
        // antianemone corollary:
        if (changes < changeLimit && character.torso.neck.head.hair.type === 4 && Utils.rand(2) === 0) {
            // -insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
            DisplayText("\n\nAs you down the potent ale, your head begins to feel heavier - and not just from the alcohol!  Reaching up, you notice your tentacles becoming soft and somewhat fibrous.  Pulling one down reveals that it feels smooth, silky, and fibrous; you watch as it dissolves into many thin, hair-like stUtils.Utils.rands.  <b>Your hair is now back to normal!</b>");
            character.torso.neck.head.hair.type = 0;
            changes++;
        }
        // Shrink
        if (Utils.rand(2) === 0 && character.tallness > 48) {
            changes++;
            DisplayText("\n\nThe world spins, and not just from the strength of the drink!  Your viewpoint is closer to the ground.  How fun!");
            character.tallness -= (1 + Utils.rand(5));
        }
        // Speed boost
        if (Utils.rand(3) === 0 && character.stats.spe < 50 && changes < changeLimit) {
            character.stats.spe += 1 + Utils.rand(2);
            DisplayText("\n\nYou feel like dancing, and stumble as your legs react more quickly than you'd think.  Is the alcohol slowing you down or are you really faster?  You take a step and nearly faceplant as you go off balance.  It's definitely both.");
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
        // SEXYTIEMS
        // Multidick killa!
        if (character.torso.cocks.count > 1 && Utils.rand(3) === 0 && changes < changeLimit) {
            DisplayText("\n\n");
            CockModifier.displayKillCocks(character, 1);
            changes++;
        }
        // Boost vaginal capacity without gaping
        if (changes < changeLimit && Utils.rand(3) === 0 && character.torso.vaginas.count > 0 && character.statusAffects.get(StatusAffectType.BonusVCapacity).value1 < 40) {
            if (!character.statusAffects.has(StatusAffectType.BonusVCapacity))
                character.statusAffects.add(StatusAffectType.BonusVCapacity, 0, 0, 0, 0);
            character.statusAffects.get(StatusAffectType.BonusVCapacity).value1 = 5;
            DisplayText("\n\nThere is a sudden... emptiness within your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + ".  Somehow you know you could accommodate even larger... insertions.");
            changes++;
        }
        // Boost fertility
        if (changes < changeLimit && Utils.rand(4) === 0 && character.fertility < 40 && character.torso.vaginas.count > 0) {
            character.fertility += 2 + Utils.rand(5);
            changes++;
            DisplayText("\n\nYou feel strange.  Fertile... somehow.  You don't know how else to think of it, but you're ready to be a mother.");
        }
        // Shrink primary dick to no longer than 12 inches
        else if (character.torso.cocks.count === 1 && Utils.rand(2) === 0 && changes < changeLimit && !Flags.list[FlagEnum.HYPER_HAPPY]) {
            if (character.torso.cocks.get(0).length > 12) {
                changes++;
                let temp3: number = 0;
                DisplayText("\n\n");
                // Shrink said cock
                if (character.torso.cocks.get(0).length < 6 && character.torso.cocks.get(0).length >= 2.9) {
                    character.torso.cocks.get(0).length -= .5;
                    temp3 -= .5;
                }
                temp3 += CockModifier.growCock(character, character.torso.cocks.get(0), (Utils.rand(3) + 1) * -1);
                CockModifier.displayLengthChange(character, temp3, 1);
            }
        }
        // GENERAL APPEARANCE STUFF BELOW
        // REMOVAL STUFF
        // Removes wings and antennaes!
        if ((character.torso.wings.type === WingType.BEE_LIKE_SMALL || character.torso.wings.type === WingType.BEE_LIKE_LARGE || character.torso.wings.type >= WingType.HARPY) && changes < changeLimit && Utils.rand(4) === 0) {
            if (character.torso.wings.type === WingType.SHARK_FIN) DisplayText("\n\nYour back tingles, feeling lighter.  Something lands behind you with a 'thump', and when you turn to look, you see your fin has fallen off.  This might be the best (and worst) booze you've ever had!  <b>You no longer have a fin!</b>");
            else DisplayText("\n\nYour shoulders tingle, feeling lighter.  Something lands behind you with a 'thump', and when you turn to look you see your wings have fallen off.  This might be the best (and worst) booze you've ever had!  <b>You no longer have wings!</b>");
            character.torso.wings.type = WingType.NONE;
            changes++;
        }
        // Removes wings and antennaes!
        if (character.torso.neck.head.antennae > AntennaeType.NONE && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nYour " + HeadDescriptor.describeHair(character) + " itches so you give it a scratch, only to have your antennae fall to the ground.  What a relief.  <b>You've lost your antennae!</b>");
            changes++;
            character.torso.neck.head.antennae = AntennaeType.NONE;
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
        // -Remove extra breast rows
        if (changes < changeLimit && character.torso.chest.count > 1 && Utils.rand(3) === 0) {
            changes++;
            const lastRow = character.torso.chest.get(character.torso.chest.count - 1);
            DisplayText("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + BreastDescriptor.describeBreastRow(lastRow) + " shrink down, disappearing completely into your ");
            if (character.torso.chest.count >= 3) DisplayText("abdomen");
            else DisplayText("chest");
            DisplayText(". The " + BreastDescriptor.describeNipple(character, lastRow) + "s even fade until nothing but ");
            if (character.skin.type === SkinType.FUR) DisplayText(character.torso.neck.head.hair.color + " " + character.skin.desc);
            else DisplayText(character.skin.tone + " " + character.skin.desc);
            DisplayText(" remains. <b>You've lost a row of breasts!</b>");
            character.stats.sens += -5;
            character.torso.chest.remove(character.torso.chest.count - 1);
        }
        // Skin/fur
        if (character.skin.type !== SkinType.PLAIN && changes < changeLimit && Utils.rand(4) === 0 && character.torso.neck.head.face.type === FaceType.HUMAN) {
            if (character.skin.type === SkinType.FUR) DisplayText("\n\nYour fur itches incessantly, so you start scratching it.  It starts coming off in big clumps before the whole mess begins sloughing off your body.  In seconds, your skin is nude.  <b>You've lost your fur!</b>");
            if (character.skin.type === SkinType.SCALES) DisplayText("\n\nYour scales itch incessantly, so you scratch at them.  They start falling off wholesale, leaving you standing in a pile of scales after only a few moments.  <b>You've lost your scales!</b>");
            if (character.skin.type > SkinType.SCALES) DisplayText("\n\nYour " + character.skin.desc + " itches incessantly, and as you scratch it shifts and changes, becoming normal human-like skin.  <b>Your skin is once again normal!</b>");
            character.skin.adj = "";
            character.skin.desc = "skin";
            character.skin.type = SkinType.PLAIN;
            changes++;
        }
        // skin.tone
        if (character.skin.tone !== "green" && character.skin.tone !== "grayish-blue" && character.skin.tone !== "dark green" && character.skin.tone !== "pale yellow" && changes < changeLimit && Utils.rand(2) === 0) {
            if (Utils.rand(10) !== 0) character.skin.tone = "dark green";
            else {
                if (Utils.rand(2) === 0) character.skin.tone = "pale yellow";
                else character.skin.tone = "grayish-blue";
            }
            changes++;
            DisplayText("\n\nWhoah, that was weird.  You just hallucinated that your ");
            if (character.skin.type === SkinType.FUR) DisplayText("skin");
            else DisplayText(character.skin.desc);
            DisplayText(" turned " + character.skin.tone + ".  No way!  It's staying, it really changed color!");
        }
        // Face!
        if (character.torso.neck.head.face.type !== FaceType.HUMAN && changes < changeLimit && Utils.rand(4) === 0 && character.torso.neck.head.ears.type === EarType.ELFIN) {
            changes++;
            character.torso.neck.head.face.type = FaceType.HUMAN;
            DisplayText("\n\nAnother violent sneeze escapes you.  It hurt!  You feel your nose and discover your face has changed back into a more normal look.  <b>You have a human looking face again!</b>");
        }
        // Ears!
        if (character.torso.neck.head.ears.type !== EarType.ELFIN && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nA weird tingling runs through your scalp as your " + HeadDescriptor.describeHair(character) + " shifts slightly.  You reach up to touch and bump <b>your new pointed elfin ears</b>.  You bet they look cute!");
            changes++;
            character.torso.neck.head.ears.type = EarType.ELFIN;
        }
        if (Utils.rand(4) === 0 && character.torso.neck.gills && changes < changeLimit) {
            DisplayText("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            character.torso.neck.gills = false;
            changes++;
        }
        // Nipples Turn Back:
        if (character.statusAffects.has(StatusAffectType.BlackNipples) && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nSomething invisible brushes against your " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            changes++;
            character.statusAffects.remove(StatusAffectType.BlackNipples);
        }
        // Debugcunt
        if (changes < changeLimit && Utils.rand(3) === 0 && character.torso.vaginas.count > 0 && character.torso.vaginas.get(0).type !== VaginaType.HUMAN) {
            DisplayText("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
            character.torso.vaginas.get(0).type = VaginaType.HUMAN;
            changes++;
        }
        if (changes < changeLimit && Utils.rand(4) === 0 && ((character.torso.butt.wetness > 0 && !character.perks.has(PerkType.MaraesGiftButtslut)) || character.torso.butt.wetness > 1)) {
            DisplayText("\n\nYou feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
            character.torso.butt.wetness--;
            if (character.torso.butt.looseness > 1) character.torso.butt.looseness--;
            changes++;
        }
        if (changes < changeLimit && Utils.rand(3) === 0) {
            if (Utils.rand(2) === 0) BodyModifier.displayModFem(character, 85, 3);
            if (Utils.rand(2) === 0) BodyModifier.displayModThickness(character, 20, 3);
            if (Utils.rand(2) === 0) BodyModifier.displayModTone(character, 15, 5);
        }
    }
}
