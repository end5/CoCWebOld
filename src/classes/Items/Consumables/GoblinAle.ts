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
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import LegDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import BodyModifier from '../../Modifiers/BodyModifier';
import CockModifier from '../../Modifiers/CockModifier';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class GoblinAle extends Consumable {
    public constructor() {
        super(ConsumableName.GoblinAle, new ItemDesc("Gob.Ale", "a flagon of potent goblin ale", "This sealed flagon of 'Goblin Ale' sloshes noisily with alcoholic brew.  Judging by the markings on the flagon, it's a VERY strong drink, and not to be trifled with."));
    }

    public use(player: Player) {
        player.slimeFeed();
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(3) === 0) changeLimit++;
        if (Utils.rand(4) === 0) changeLimit++;
        if (Utils.rand(5) === 0) changeLimit++;
        if (player.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        DisplayText().clear();
        DisplayText("You drink the ale, finding it to have a remarkably smooth yet potent taste.  You lick your lips and sneeze, feeling slightly tipsy.");
        player.stats.lust += 15;
        // Stronger
        if (player.stats.str > 50) {
            player.stats.str += -1;
            if (player.stats.str > 70) player.stats.str += -1;
            if (player.stats.str > 90) player.stats.str += -2;
            DisplayText("\n\nYou feel a little weaker, but maybe it's just the alcohol.");
        }
        // Less tough
        if (player.stats.tou > 50) {
            DisplayText("\n\nGiggling, you poke yourself, which only makes you giggle harder when you realize how much softer you feel.");
            player.stats.tou += -1;
            if (player.stats.tou > 70) player.stats.tou += -1;
            if (player.stats.tou > 90) player.stats.tou += -2;
        }
        // antianemone corollary:
        if (changes < changeLimit && player.torso.neck.head.hair.type === 4 && Utils.rand(2) === 0) {
            // -insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
            DisplayText("\n\nAs you down the potent ale, your head begins to feel heavier - and not just from the alcohol!  Reaching up, you notice your tentacles becoming soft and somewhat fibrous.  Pulling one down reveals that it feels smooth, silky, and fibrous; you watch as it dissolves into many thin, hair-like stUtils.Utils.rands.  <b>Your hair is now back to normal!</b>");
            player.torso.neck.head.hair.type = 0;
            changes++;
        }
        // Shrink
        if (Utils.rand(2) === 0 && player.tallness > 48) {
            changes++;
            DisplayText("\n\nThe world spins, and not just from the strength of the drink!  Your viewpoint is closer to the ground.  How fun!");
            player.tallness -= (1 + Utils.rand(5));
        }
        // Speed boost
        if (Utils.rand(3) === 0 && player.stats.spe < 50 && changes < changeLimit) {
            player.stats.spe += 1 + Utils.rand(2);
            DisplayText("\n\nYou feel like dancing, and stumble as your legs react more quickly than you'd think.  Is the alcohol slowing you down or are you really faster?  You take a step and nearly faceplant as you go off balance.  It's definitely both.");
            changes++;
        }
        // -Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.torso.arms.type === ArmType.HARPY && Utils.rand(4) === 0) {
            DisplayText("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating.  The wing-like shape your arms once had is gone in a matter of moments, leaving " + player.skin.desc + " behind.");
            player.torso.arms.type = ArmType.HUMAN;
            changes++;
        }
        // -Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.torso.arms.type === ArmType.SPIDER && Utils.rand(4) === 0) {
            DisplayText("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away.  The glossy black coating is soon gone, leaving " + player.skin.desc + " behind.");
            player.torso.arms.type = ArmType.HUMAN;
            changes++;
        }
        // SEXYTIEMS
        // Multidick killa!
        if (player.torso.cocks.count > 1 && Utils.rand(3) === 0 && changes < changeLimit) {
            DisplayText("\n\n");
            CockModifier.displayKillCocks(player, 1);
            changes++;
        }
        // Boost vaginal capacity without gaping
        if (changes < changeLimit && Utils.rand(3) === 0 && player.torso.vaginas.count > 0 && player.statusAffects.get(StatusAffectType.BonusVCapacity).value1 < 40) {
            if (!player.statusAffects.has(StatusAffectType.BonusVCapacity))
                player.statusAffects.set(StatusAffectType.BonusVCapacity, StatusAffectFactory.create(StatusAffectType.BonusVCapacity, 0, 0, 0, 0));
            player.statusAffects.get(StatusAffectType.BonusVCapacity).value1 = 5;
            DisplayText("\n\nThere is a sudden... emptiness within your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ".  Somehow you know you could accommodate even larger... insertions.");
            changes++;
        }
        // Boost fertility
        if (changes < changeLimit && Utils.rand(4) === 0 && player.fertility < 40 && player.torso.vaginas.count > 0) {
            player.fertility += 2 + Utils.rand(5);
            changes++;
            DisplayText("\n\nYou feel strange.  Fertile... somehow.  You don't know how else to think of it, but you're ready to be a mother.");
        }
        // Shrink primary dick to no longer than 12 inches
        else if (player.torso.cocks.count === 1 && Utils.rand(2) === 0 && changes < changeLimit && !Flags.list[FlagEnum.HYPER_HAPPY]) {
            if (player.torso.cocks.get(0).length > 12) {
                changes++;
                let temp3: number = 0;
                DisplayText("\n\n");
                // Shrink said cock
                if (player.torso.cocks.get(0).length < 6 && player.torso.cocks.get(0).length >= 2.9) {
                    player.torso.cocks.get(0).length -= .5;
                    temp3 -= .5;
                }
                temp3 += CockModifier.growCock(player, player.torso.cocks.get(0), (Utils.rand(3) + 1) * -1);
                CockModifier.displayLengthChange(player, temp3, 1);
            }
        }
        // GENERAL APPEARANCE STUFF BELOW
        // REMOVAL STUFF
        // Removes wings and antennaes!
        if ((player.torso.wings.type === WingType.BEE_LIKE_SMALL || player.torso.wings.type === WingType.BEE_LIKE_LARGE || player.torso.wings.type >= WingType.HARPY) && changes < changeLimit && Utils.rand(4) === 0) {
            if (player.torso.wings.type === WingType.SHARK_FIN) DisplayText("\n\nYour back tingles, feeling lighter.  Something lands behind you with a 'thump', and when you turn to look, you see your fin has fallen off.  This might be the best (and worst) booze you've ever had!  <b>You no longer have a fin!</b>");
            else DisplayText("\n\nYour shoulders tingle, feeling lighter.  Something lands behind you with a 'thump', and when you turn to look you see your wings have fallen off.  This might be the best (and worst) booze you've ever had!  <b>You no longer have wings!</b>");
            player.torso.wings.type = WingType.NONE;
            changes++;
        }
        // Removes wings and antennaes!
        if (player.torso.neck.head.antennae > AntennaeType.NONE && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nYour " + HeadDescriptor.describeHair(player) + " itches so you give it a scratch, only to have your antennae fall to the ground.  What a relief.  <b>You've lost your antennae!</b>");
            changes++;
            player.torso.neck.head.antennae = AntennaeType.NONE;
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
        // -Remove extra breast rows
        if (changes < changeLimit && player.torso.chest.count > 1 && Utils.rand(3) === 0) {
            changes++;
            const lastRow = player.torso.chest.get(player.torso.chest.count - 1);
            DisplayText("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + BreastDescriptor.describeBreastRow(lastRow) + " shrink down, disappearing completely into your ");
            if (player.torso.chest.count >= 3) DisplayText("abdomen");
            else DisplayText("chest");
            DisplayText(". The " + BreastDescriptor.describeNipple(player, lastRow) + "s even fade until nothing but ");
            if (player.skin.type === SkinType.FUR) DisplayText(player.torso.neck.head.hair.color + " " + player.skin.desc);
            else DisplayText(player.skin.tone + " " + player.skin.desc);
            DisplayText(" remains. <b>You've lost a row of breasts!</b>");
            player.stats.sens += -5;
            player.torso.chest.remove(player.torso.chest.count - 1);
        }
        // Skin/fur
        if (player.skin.type !== SkinType.PLAIN && changes < changeLimit && Utils.rand(4) === 0 && player.torso.neck.head.face.type === FaceType.HUMAN) {
            if (player.skin.type === SkinType.FUR) DisplayText("\n\nYour fur itches incessantly, so you start scratching it.  It starts coming off in big clumps before the whole mess begins sloughing off your body.  In seconds, your skin is nude.  <b>You've lost your fur!</b>");
            if (player.skin.type === SkinType.SCALES) DisplayText("\n\nYour scales itch incessantly, so you scratch at them.  They start falling off wholesale, leaving you standing in a pile of scales after only a few moments.  <b>You've lost your scales!</b>");
            if (player.skin.type > SkinType.SCALES) DisplayText("\n\nYour " + player.skin.desc + " itches incessantly, and as you scratch it shifts and changes, becoming normal human-like skin.  <b>Your skin is once again normal!</b>");
            player.skin.adj = "";
            player.skin.desc = "skin";
            player.skin.type = SkinType.PLAIN;
            changes++;
        }
        // skin.tone
        if (player.skin.tone !== "green" && player.skin.tone !== "grayish-blue" && player.skin.tone !== "dark green" && player.skin.tone !== "pale yellow" && changes < changeLimit && Utils.rand(2) === 0) {
            if (Utils.rand(10) !== 0) player.skin.tone = "dark green";
            else {
                if (Utils.rand(2) === 0) player.skin.tone = "pale yellow";
                else player.skin.tone = "grayish-blue";
            }
            changes++;
            DisplayText("\n\nWhoah, that was weird.  You just hallucinated that your ");
            if (player.skin.type === SkinType.FUR) DisplayText("skin");
            else DisplayText(player.skin.desc);
            DisplayText(" turned " + player.skin.tone + ".  No way!  It's staying, it really changed color!");
        }
        // Face!
        if (player.torso.neck.head.face.type !== FaceType.HUMAN && changes < changeLimit && Utils.rand(4) === 0 && player.torso.neck.head.ears.type === EarType.ELFIN) {
            changes++;
            player.torso.neck.head.face.type = FaceType.HUMAN;
            DisplayText("\n\nAnother violent sneeze escapes you.  It hurt!  You feel your nose and discover your face has changed back into a more normal look.  <b>You have a human looking face again!</b>");
        }
        // Ears!
        if (player.torso.neck.head.ears.type !== EarType.ELFIN && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nA weird tingling runs through your scalp as your " + HeadDescriptor.describeHair(player) + " shifts slightly.  You reach up to touch and bump <b>your new pointed elfin ears</b>.  You bet they look cute!");
            changes++;
            player.torso.neck.head.ears.type = EarType.ELFIN;
        }
        if (Utils.rand(4) === 0 && player.torso.neck.gills && changes < changeLimit) {
            DisplayText("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            player.torso.neck.gills = false;
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
        if (changes < changeLimit && Utils.rand(4) === 0 && ((player.torso.butt.wetness > 0 && !player.perks.has(PerkType.MaraesGiftButtslut)) || player.torso.butt.wetness > 1)) {
            DisplayText("\n\nYou feel a tightening up in your colon and your [asshole] sucks into itself.  You feel sharp pain at first but that thankfully fades.  Your ass seems to have dried and tightened up.");
            player.torso.butt.wetness--;
            if (player.torso.butt.looseness > 1) player.torso.butt.looseness--;
            changes++;
        }
        if (changes < changeLimit && Utils.rand(3) === 0) {
            if (Utils.rand(2) === 0) BodyModifier.displayModFem(player, 85, 3);
            if (Utils.rand(2) === 0) BodyModifier.displayModThickness(player, 20, 3);
            if (Utils.rand(2) === 0) BodyModifier.displayModTone(player, 15, 5);
        }
    }
}
