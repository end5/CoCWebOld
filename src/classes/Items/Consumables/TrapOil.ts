import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import BreastRow from '../../Body/BreastRow';
import Cock from '../../Body/Cock';
import { EyeType } from '../../Body/Eyes';
import { VaginaType } from '../../Body/Vagina';
import { WingType } from '../../Body/Wings';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import LegDescriptor from '../../Descriptors/LowerBodyDescriptor';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import BodyModifier from '../../Modifiers/BodyModifier';
import CockModifier from '../../Modifiers/CockModifier';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class TrapOil extends Consumable {
    public constructor() {
        super(ConsumableName.TrapOil, new ItemDesc("TrapOil", "a vial of trap oil", "A round, opaque glass vial filled with a clear, viscous fluid.  It has a symbol inscribed on it, a circle with a cross and arrow pointing out of it in opposite directions.  It looks and smells entirely innocuous."));
    }

    public use(player: Player) {
        DisplayText().clear();
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(3) === 0) changeLimit++;
        if (Utils.rand(3) === 0) changeLimit++;
        if (player.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        DisplayText("You pour some of the oil onto your hands and ");
        if (player.stats.cor < 30) DisplayText("hesitantly ");
        else if (player.stats.cor > 70) DisplayText("eagerly ");
        DisplayText("rub it into your arms and chest.  The substance is warm, coating and ever so slightly numbing; it quickly sinks into your skin, leaving you feeling smooth and sleek.");

        // Speed Increase:
        if (player.stats.spe < 100 && Utils.rand(3) === 0 && changes < changeLimit) {
            DisplayText("\n\nYou feel fleet and lighter on your toes; you sense you could dodge, dart or skip away from anything.");
            player.stats.spe += 1;
            changes++;
        }
        // Strength Loss:
        else if (player.stats.str > 40 && Utils.rand(3) === 0 && changes < changeLimit) {
            DisplayText("\n\nA sense of helplessness settles upon you as your limbs lose mass, leaving you feeling weaker and punier.");
            player.stats.str += -1;
            changes++;
        }
        // Sensitivity Increase:
        if (player.stats.sens < 70 && player.torso.cocks.count > 0 && Utils.rand(3) === 0 && changes < changeLimit) {
            DisplayText("\n\nA light breeze brushes over you and your skin tingles.  You have become more sensitive to physical sensation.");
            player.stats.sens += 5;
            changes++;
        }
        // Libido Increase:
        if (player.stats.lib < 70 && player.torso.vaginas.count > 0 && Utils.rand(3) === 0 && changes < changeLimit) {
            DisplayText("\n\nYou feel your blood quicken and rise, and a desire to... hunt builds within you.");
            player.stats.lib += 2;
            if (player.stats.lib < 30) player.stats.lib += 2;
            changes++;
        }
        // Body Mass Loss:
        if (player.thickness > 40 && Utils.rand(3) === 0 && changes < changeLimit) {
            DisplayText("\n\nYou feel an odd tightening sensation in your midriff, as if you were becoming narrower and lither.  You frown downwards, and then turn your arms around, examining them closely.  Is it just you or have you lost weight?");
            BodyModifier.displayModThickness(player, 40, 3);
            changes++;
        }

        // Thigh Loss: (towards �girly�)
        if (player.torso.hips.rating >= 10 && Utils.rand(4) === 0 && changes < changeLimit) {
            DisplayText("\n\nYou touch your thighs speculatively.  It's not just your imagination; you've lost a bit of weight around your waist.");
            player.torso.hips.rating--;
            if (player.torso.hips.rating > 15) player.torso.hips.rating -= 2 + Utils.rand(3);
            changes++;
        }
        // Thigh Gain: (towards �girly�)
        if (player.torso.hips.rating < 6 && Utils.rand(4) === 0 && changes < changeLimit) {
            DisplayText("\n\nYou touch your thighs speculatively.  You think you may have gained a little weight around your waist.");
            player.torso.hips.rating++;
            changes++;
        }
        if (player.torso.chest.count > 0) {
            // Breast Loss: (towards A cup)
            if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 1 && Utils.rand(4) === 0 && changes < changeLimit) {
                DisplayText("\n\nYou gasp as you feel a compressing sensation in your chest and around your [fullChest].  The feeling quickly fades however, leaving you feeling like you have lost a considerable amount of weight from your upper body.");
                let selectedBreastRow: BreastRow;
                for (let index: number = 0; index < player.torso.chest.count; index++) {
                    selectedBreastRow = player.torso.chest.get(index);
                    if (selectedBreastRow.rating > 70) selectedBreastRow.rating -= Utils.rand(3) + 15;
                    else if (selectedBreastRow.rating > 50) selectedBreastRow.rating -= Utils.rand(3) + 10;
                    else if (selectedBreastRow.rating > 30) selectedBreastRow.rating -= Utils.rand(3) + 7;
                    else if (selectedBreastRow.rating > 15) selectedBreastRow.rating -= Utils.rand(3) + 4;
                    else selectedBreastRow.rating -= 2 + Utils.rand(2);
                    if (selectedBreastRow.rating < 1) selectedBreastRow.rating = 1;
                }
                changes++;
            }
            // Breast Gain: (towards A cup)
            if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating < 1 || player.torso.chest.get(0).rating < 1 && Utils.rand(4) === 0 && changes < changeLimit) {
                DisplayText("\n\nYou feel a vague swelling sensation in your [fullChest], and you frown downwards.  You seem to have gained a little weight on your chest.  Not enough to stand out, but- you cup yourself carefully- certainly giving you the faintest suggestion of boobs.");
                for (let index: number = 0; index < player.torso.chest.count; index++)
                    if (player.torso.chest.get(index).rating < 1)
                        player.torso.chest.get(index).rating = 1;
                changes++;
            }
        }
        // Penis Reduction towards 3.5 Inches:
        if (player.torso.cocks.count > 0 && player.torso.cocks.sort(Cock.LongestCocks)[0].length >= 3.5 && player.torso.cocks.count > 0 && Utils.rand(2) === 0 && changes < changeLimit) {
            DisplayText("\n\nYou flinch and gasp as your " + CockDescriptor.describeMultiCockShort(player) + " suddenly become");
            if (player.torso.cocks.count === 1) DisplayText("s");
            DisplayText(" incredibly sensitive and retract into your body.  Anxiously you pull down your underclothes to examine your nether regions.  To your relief ");
            if (player.torso.cocks.count === 1) DisplayText("it is");
            else DisplayText("they are");
            DisplayText(" still present, and as you touch ");
            if (player.torso.cocks.count === 1) DisplayText("it");
            else DisplayText("them");
            DisplayText(", the sensitivity fades, however - a blush comes to your cheeks - ");
            if (player.torso.cocks.count === 1) DisplayText("it seems");
            else DisplayText("they seem");
            DisplayText(" to have become smaller.");
            let selectedCock: Cock;
            for (let index: number = 0; index < player.torso.cocks.count; index++) {
                selectedCock = player.torso.cocks.get(index);
                if (selectedCock.length >= 3.5) {
                    // Shrink said cock
                    if (selectedCock.length < 6 && selectedCock.length >= 2.9) {
                        selectedCock.length -= .5;
                        if (selectedCock.thickness * 6 > selectedCock.length) selectedCock.thickness -= .2;
                        if (selectedCock.thickness * 8 > selectedCock.length) selectedCock.thickness -= .2;
                        if (selectedCock.thickness < .5) selectedCock.thickness = .5;
                    }
                    selectedCock.length -= 0.5;
                    CockModifier.growCock(player, selectedCock, Math.round(selectedCock.length * 0.33) * -1);
                }
            }
            changes++;
        }
        // Testicle Reduction:
        if (player.torso.balls.quantity > 0 && player.torso.cocks.count > 0 && (player.torso.balls.size > 1 || !player.statusAffects.has(StatusAffectType.Uniball)) && Utils.rand(4) === 0 && changes < changeLimit) {
            DisplayText("\n\nYou feel a delicate tightening sensation around your [balls].  The sensation upon this most sensitive part of your anatomy isn't painful, but the feeling of your balls getting smaller is intense enough that you stifle anything more than a sharp intake of breath only with difficulty.");
            player.torso.balls.size--;
            if (player.torso.balls.size > 8) player.torso.balls.size--;
            if (player.torso.balls.size > 10) player.torso.balls.size--;
            if (player.torso.balls.size > 12) player.torso.balls.size--;
            if (player.torso.balls.size > 15) player.torso.balls.size--;
            if (player.torso.balls.size > 20) player.torso.balls.size--;
            // Testicle Reduction final:
            if (player.torso.balls.size < 1 && !player.statusAffects.has(StatusAffectType.Uniball)) {
                DisplayText("  You whimper as once again, your balls tighten and shrink.  Your eyes widen when you feel the gentle weight of your testicles pushing against the top of your [hips], and a few hesitant swings of your rear confirm what you can feel - you've tightened your balls up so much they no longer hang beneath your " + CockDescriptor.describeMultiCockShort(player) + ", but press perkily upwards.  Heat ringing your ears, you explore your new sack with a careful hand.  You are deeply grateful you apparently haven't reversed puberty, but you discover that though you still have " + Utils.numToCardinalText(player.torso.balls.quantity) + ", your balls now look and feel like one: one cute, tight little sissy parcel, its warm, insistent pressure upwards upon the joining of your thighs a never-ending reminder of it.");
                // [Note: Balls description should no longer say �swings heavily beneath�.  For simplicity's sake sex scenes should continue to assume two balls]
                player.torso.balls.size = 1;
                player.statusAffects.set(StatusAffectType.Uniball, StatusAffectFactory.create(StatusAffectType.Uniball, 0, 0, 0, 0));
            }
            else if (player.torso.balls.size < 1) player.torso.balls.size = 1;
            changes++;
        }
        // Anal Wetness Increase:
        if (player.torso.butt.wetness < 5 && Utils.rand(4) === 0 && changes < changeLimit) {
            if (player.torso.butt.wetness < 4) DisplayText("\n\nYour eyes widen in shock as you feel oily moisture bead out of your [asshole].  Your asshole has become wetter and more pliable.");
            // Anal Wetness Increase Final (always loose):
            else DisplayText("\n\nYou moan as clear, odorless oil dribbles out of your [asshole], this time in enough quantity to stain your [armor].  Your back passage feels incredibly sensitive, wet and accommodating.  Your ass is ready to be plowed by anything, and always will be.");
            player.torso.butt.wetness++;
            // buttChange(30,false,false,false);
            if (player.torso.butt.looseness < 3) player.torso.butt.looseness++;
            changes++;
            player.stats.sens += 2;
        }
        // Fertility Decrease:
        if (player.torso.vaginas.count > 0 && Utils.rand(4) === 0 && changes < changeLimit) {
            DisplayText("\n\nThe vague numbness in your skin sinks slowly downwards, and you put a hand on your lower stomach as the sensation centers itself there.  ");
            player.stats.sens += -2;
            // High fertility:
            if (player.fertility >= 30) DisplayText("It feels like your overcharged reproductive organs have simmered down a bit.");
            // Average fertility:
            else if (player.fertility >= 5) DisplayText("You feel like you have dried up a bit inside; you are left feeling oddly tranquil.");
            // [Low/No fertility:
            else {
                DisplayText("Although the numbness makes you feel serene, the trap oil has no effect upon your ");
                if (player.fertility > 0) DisplayText("mostly ");
                DisplayText("sterile system.");
                // [Low/No fertility + Trap/Corruption  >70:
                if (player.stats.cor > 70) DisplayText("  For some reason the fact that you cannot  as nature intended makes you feel helpless and submissive.  Perhaps the only way to be a useful creature now is to find a dominant, fertile being willing to plow you full of eggs? You shake the alien, yet oddly alluring thought away.");
            }
            player.fertility -= 1 + Utils.rand(3);
            if (player.fertility < 4) player.fertility = 4;
            changes++;
        }
        // Male Effects
        if (player.gender === 1) {
            // Femininity Increase Final (max femininity allowed increased by +10):
            if (Utils.rand(4) === 0 && changes < changeLimit) {
                if (player.femininity < 70 && player.femininity >= 60) {
                    DisplayText("\n\nYou laugh as you feel your features once again soften, before stopping abruptly.  Your laugh sounded more like a girly giggle than anything else.  Feeling slightly more sober, you touch the soft flesh of your face prospectively.  The trap oil has changed you profoundly, making your innate maleness... difficult to discern, to say the least.  You suspect you could make yourself look even more like a girl now if you wanted to.");
                    if (!player.perks.has(PerkType.Androgyny)) {
                        player.perks.set(PerkType.Androgyny, PerkFactory.create(PerkType.Androgyny, 0, 0, 0, 0));
                        DisplayText("\n\n(<b>Perk Gained: Androgyny</b>)");
                    }
                    player.femininity += 10;
                    if (player.femininity > 70) player.femininity = 70;
                    changes++;
                }
                // Femininity Increase:
                else {
                    DisplayText("\n\nYour face softens as your features become more feminine.");
                    player.femininity += 10;
                    changes++;
                }
            }
            // Muscle tone reduction:
            if (player.tone > 20 && Utils.rand(4) === 0 && changes < changeLimit) {
                DisplayText("\n\nYou sink a finger into your arm inquiringly.  You seem to have lost some of your muscle definition, leaving you looking softer.");
                player.tone -= 10;
                changes++;
            }
        }
        // Female Effects
        else if (player.gender === 2) {
            // Masculinity Increase:
            if (player.femininity > 30 && Utils.rand(4) === 0 && changes < changeLimit) {
                player.femininity -= 10;
                if (player.femininity < 30) {
                    player.femininity = 30;
                    // Masculinity Increase Final (max masculinity allowed increased by +10):
                    DisplayText("\n\nYou laugh as you feel your features once again soften, before stopping abruptly.  Your laugh sounded more like a boyish crow than anything else.  Feeling slightly more sober, you touch the defined lines of your face prospectively.  The trap oil has changed you profoundly, making your innate femaleness... difficult to discern, to say the least.  You suspect you could make yourself look even more like a boy now if you wanted to.");
                    if (!player.perks.has(PerkType.Androgyny)) {
                        player.perks.set(PerkType.Androgyny, PerkFactory.create(PerkType.Androgyny, 0, 0, 0, 0));
                        DisplayText("\n\n(<b>Perk Gained: Androgyny</b>)");
                    }
                }
                else {
                    DisplayText("\n\nYour face becomes more set and defined as your features turn more masculine.");
                }
                changes++;
            }
            // Muscle tone gain:
            if (player.tone < 80 && Utils.rand(4) === 0 && changes < changeLimit) {
                DisplayText("\n\nYou flex your arm in interest.  Although you have become thinner, your muscles seem to have become more defined.");
                player.tone += 10;
                changes++;
            }
        }
        // Nipples Turn Black:
        if (!player.statusAffects.has(StatusAffectType.BlackNipples) && Utils.rand(6) === 0 && changes < changeLimit) {
            DisplayText("\n\nA tickling sensation plucks at your nipples and you cringe, trying not to giggle.  Looking down you are in time to see the last spot of flesh tone disappear from your [nipples].  They have turned an onyx black!");
            player.statusAffects.set(StatusAffectType.BlackNipples, StatusAffectFactory.create(StatusAffectType.BlackNipples, 0, 0, 0, 0));
            changes++;
        }
        // Remove odd eyes
        if (player.torso.neck.head.face.eyes.type === EyeType.FOUR_SPIDER_EYES && Utils.rand(2) === 0 && changes < changeLimit) {
            DisplayText("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + LegDescriptor.describeFeet(player) + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.");
            if (player.torso.neck.head.face.eyes.type === EyeType.FOUR_SPIDER_EYES) DisplayText("  Your multiple, arachnid eyes are gone!</b>");
            DisplayText("  <b>You have normal, humanoid eyes again.</b>");
            player.torso.neck.head.face.eyes.type = EyeType.HUMAN;
            changes++;
        }
        // PC Trap Effects
        if (player.torso.neck.head.face.eyes.type !== EyeType.BLACK_EYES_SAND_TRAP && Utils.rand(4) === 0 && changes < changeLimit) {
            player.torso.neck.head.face.eyes.type = EyeType.BLACK_EYES_SAND_TRAP;
            // Eyes Turn Black:
            DisplayText("\n\nYou blink, and then blink again.  It feels like something is irritating your eyes.  Panic sets in as black suddenly blooms in the corner of your left eye and then your right, as if drops of ink were falling into them.  You calm yourself down with the thought that rubbing at your eyes will certainly make whatever is happening to them worse; through force of will you hold your hands behind your back and wait for the strange affliction to run its course.  The strange inky substance pools over your entire vision before slowly fading, thankfully taking the irritation with it.  As soon as it goes you stride quickly over to the stream and stare at your reflection.  <b>Your pupils, your irises, your entire eye has turned a liquid black</b>, leaving you looking vaguely like the many half insect creatures which inhabit these lands.  You find you are merely grateful the change apparently hasn't affected your vision.");
            changes++;
        }
        // Vagina Turns Black:
        if (player.torso.vaginas.count > 0 && player.torso.vaginas.get(0).type !== VaginaType.BLACK_SAND_TRAP && Utils.rand(4) === 0 && changes < changeLimit) {
            DisplayText("\n\nYour [vagina] feels... odd.  You undo your clothes and gingerly inspect your nether regions.  The tender pink color of your sex has disappeared, replaced with smooth, marble blackness starting at your lips and working inwards.");
            // (Wet:
            if (player.torso.vaginas.get(0).wetness >= 3) DisplayText("  Your natural lubrication makes it gleam invitingly.");
            // (Corruption <50:
            if (player.stats.cor < 50) DisplayText("  After a few cautious touches you decide it doesn't feel any different- it does certainly look odd, though.");
            else DisplayText("  After a few cautious touches you decide it doesn't feel any different - the sheer bizarreness of it is a big turn on though, and you feel it beginning to shine with anticipation at the thought of using it.");
            DisplayText("  <b>Your vagina is now ebony in color.</b>");
            player.stats.sens += 2;
            player.stats.lust += 10;
            player.torso.vaginas.get(0).type = VaginaType.BLACK_SAND_TRAP;
            changes++;
        }
        // Dragonfly Wings:
        if (player.torso.wings.type !== WingType.GIANT_DRAGONFLY && Utils.rand(4) === 0 && changes < changeLimit) {
            DisplayText("\n\nYou scream and fall to your knees as incredible pain snags at your shoulders, as if needle like hooks were being sunk into your flesh just below your shoulder blades.  After about five seconds of white hot, keening agony it is with almost sexual relief that something splits out of your upper back.  You clench the dirt as you slide what feel like giant leaves of paper into the open air.  Eventually the sensation passes and you groggily get to your feet.  You can barely believe what you can see by craning your neck behind you - <b>you've grown a set of four giant dragonfly wings</b>, thinner, longer and more pointed than the ones you've seen upon the forest bee girls, but no less diaphanous and beautiful.  You cautiously flex the new muscle groups in your shoulder blades and gasp as your new wings whirr and lift you several inches off the ground.  What fun this is going to be!");
            // Wings Fall Out: You feel a sharp pinching sensation in your shoulders and you cringe slightly.  Your former dragonfly wings make soft, papery sounds as they fall into the dirt behind you.
            changes++;
            player.torso.wings.type = WingType.GIANT_DRAGONFLY;
        }
        if (changes === 0) {
            DisplayText("\n\nWell... that didn't amount to much.");
            player.torso.wings.desc = "giant dragonfly";
        }
    }
}
