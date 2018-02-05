import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import { ArmType } from '../../Body/Arms';
import BreastRow from '../../Body/BreastRow';
import Cock from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import { EyeType } from '../../Body/Eyes';
import { FaceType } from '../../Body/Face';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import LegDescriptor from '../../Descriptors/LowerBodyDescriptor';
import SkinDescriptor from '../../Descriptors/SkinDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player/Player';
import RaceScore from '../../RaceScore';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class SweetGossamer extends Consumable {
    private sweet: boolean;
    public constructor(sweet: boolean) {
        if (!sweet)
            super(ConsumableName.BlackGossamer, new ItemDesc("B.Gossr", "a bundle of black, gossamer webbing", "These strands of gooey black gossamer seem quite unlike the normal silk that driders produce.  It smells sweet and is clearly edible, but who knows what it might do to you?"));
        else
            super(ConsumableName.SweetGossamer, new ItemDesc("S.Gossr", "a bundle of pink, gossamer webbing", "These strands of gooey pink gossamer seem quite unlike the normal silk that spider-morphs produce.  It smells sweet and is clearly edible, but who knows what it might do to you?"));
        this.sweet = sweet;
    }

    public use(player: Player) {
        DisplayText().clear();
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(2) === 0) changeLimit++;
        if (player.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        // Consuming Text
        if (this.sweet) DisplayText("You wad up the sweet, pink gossamer and eat it, finding it to be delicious and chewy, almost like gum.  Munching away, your mouth generates an enormous amount of spit until you're drooling all over yourself while you devour the sweet treat.");
        else if (!this.sweet) DisplayText("You wad up the sweet, black gossamer and eat it, finding it to be delicious and chewy, almost like licorice.  Munching away, your mouth generates an enormous amount of spit until you're drooling all over yourself while you devour the sweet treat.");

        // *************
        // Stat Changes
        // *************
        // (If speed<70, increases speed)
        if (player.stats.spe < 70 && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nYour reflexes feel much faster. Experimentally, you make a grab at a fly on a nearby rock and quickly snatch it out of the air.  A compulsion to stuff it in your mouth and eat it surfaces, but you resist the odd desire.  Why would you ever want to do something like that?");
            player.stats.spe += 1.5;
            changes++;
        }
        // (If speed>80, decreases speed down to minimum of 80)
        if (player.stats.spe > 80 && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nYou feel like resting high in the trees and waiting for your unsuspecting prey to wander below so you can take them without having to exert yourself.  What an odd thought!");
            player.stats.spe += -1.5;
            changes++;
        }
        // (increases sensitivity)
        if (changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nThe hairs on your arms and legs stand up straight for a few moments, detecting the airflow around you. Touch appears to be more receptive from now on.");
            player.stats.sens += 1;
            changes++;
        }
        // (Increase libido)
        if (changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nYou suddenly feel slightly needier, and your loins stir in quiet reminder that they could be seen to. The aftertaste hangs on your tongue and your teeth.  You wish there had been more.");
            player.stats.lib += 1;
            changes++;
        }
        // (increase toughness to 60)
        if (changes < changeLimit && Utils.rand(3) === 0 && player.stats.tou < 60) {
            DisplayText("\n\nStretching languidly, you realize you're feeling a little tougher than before, almost as if you had a full-body shell of armor protecting your internal organs.  How strange.  You probe at yourself, and while your " + SkinDescriptor.skinFurScales(player) + " doesn't feel much different, the underlying flesh does seem tougher.");
            player.stats.tou += 1;
            changes++;
        }
        // (decrease strength to 70)
        if (player.stats.str > 70 && Utils.rand(3) === 0) {
            DisplayText("\n\nLethargy rolls through you while you burp noisily.  You rub at your muscles and sigh, wondering why you need to be strong when you could just sew up a nice sticky web to catch your enemies.  ");
            if (RaceScore.spiderScore(player) < 4) DisplayText("Wait, you're not a spider, that doesn't make any sense!");
            else DisplayText("Well, maybe you should put your nice, heavy abdomen to work.");
            player.stats.str += -1;
            changes++;
        }
        // ****************
        // Sexual Changes
        // ****************
        // Increase venom recharge
        const spiderbutts = player.torso.tails.filterType(TailType.SPIDER_ABDOMEN);
        if (spiderbutts.length >= 1 && spiderbutts[0].recharge < 25 && changes < changeLimit) {
            changes++;
            DisplayText("\n\nThe spinnerets on your abdomen twitch and drip a little webbing.  The entirety of its heavy weight shifts slightly, and somehow you know you'll produce webs faster now.");
            spiderbutts[0].recharge += 5;
        }
        // (tightens vagina to 1, increases lust/libido)
        if (player.torso.vaginas.count > 0) {
            if (player.torso.vaginas.get(0).looseness > 1 && changes < changeLimit && Utils.rand(3) === 0) {
                DisplayText("\n\nWith a gasp, you feel your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " tightening, making you leak sticky girl-juice. After a few seconds, it stops, and you rub on your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " excitedly. You can't wait to try this out!");
                player.stats.lib += 2;
                player.stats.lust += 25;
                changes++;
                player.torso.vaginas.get(0).looseness--;
            }
        }
        // (tightens asshole to 1, increases lust)
        if (player.torso.butt.looseness > 1 && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nYou let out a small cry as your " + ButtDescriptor.describeButthole(player) + " shrinks, becoming smaller and tighter. When it's done, you feel much hornier and eager to stretch it out again.");
            player.stats.lib += 2;
            player.stats.lust += 25;
            changes++;
            player.torso.butt.looseness--;
        }
        // [Requires penises]
        // (Thickens all cocks to a ratio of 1\" thickness per 5.5\"
        if (player.torso.cocks.count > 0 && changes < changeLimit && Utils.rand(4) === 0) {
            // Use temp to see if any dicks can be thickened
            let cockGotThickened: boolean = false;
            for (let index: number = 0; index < player.torso.cocks.count; index++) {
                if (player.torso.cocks.get(index).thickness * 5.5 < player.torso.cocks.get(index).length) {
                    player.torso.cocks.get(index).thickness += .1;
                    cockGotThickened = true;
                }
            }
            // If something got thickened
            if (cockGotThickened) {
                DisplayText("\n\nYou can feel your " + CockDescriptor.describeMultiCockShort(player) + " filling out in your " + player.inventory.equipment.armor.displayName + ". Pulling ");
                if (player.torso.cocks.count === 1) DisplayText("it");
                else DisplayText("them");
                DisplayText(" out, you look closely.  ");
                if (player.torso.cocks.count === 1) DisplayText("It's");
                else DisplayText("They're");
                DisplayText(" definitely thicker.");
                changes++;
            }
        }
        // [Increase to Breast Size] - up to Large DD
        if (player.torso.chest.count > 0) {
            const smallestBreastRow = player.torso.chest.sort(BreastRow.BreastRatingSmallest)[0];
            if (smallestBreastRow.rating < 6 && changes < changeLimit && Utils.rand(4) === 0) {
                DisplayText("\n\nAfter eating it, your chest aches and tingles, and your hands reach up to scratch at it unthinkingly.  Silently, you hope that you aren't allergic to it.  Just as you start to scratch at your " + BreastDescriptor.describeBreastRow(smallestBreastRow) + ", your chest pushes out in slight but sudden growth.");
                smallestBreastRow.rating++;
                changes++;
            }
        }
        // [Increase to Ass Size] - to 11
        if (player.torso.butt.rating < 11 && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nYou look over your shoulder at your " + ButtDescriptor.describeButt(player) + " only to see it expand just slightly. You gape in confusion before looking back at the remaining silk in your hands. You finish it anyway. Dammit!");
            player.torso.butt.rating++;
            changes++;
        }
        // ***************
        // Appearance Changes
        // ***************
        // (Ears become pointed if not human)
        if (player.torso.neck.head.ears.type !== EarType.HUMAN && player.torso.neck.head.ears.type !== EarType.ELFIN && Utils.rand(4) === 0 && changes < changeLimit) {
            DisplayText("\n\nYour ears twitch once, twice, before starting to shake and tremble madly.  They migrate back towards where your ears USED to be, so long ago, finally settling down before twisting and stretching, changing to become <b>new, pointed elfin ears.</b>");
            player.torso.neck.head.ears.type = EarType.ELFIN;
            changes++;
        }
        // (Fur/Scales fall out)
        if (player.skin.type !== SkinType.PLAIN && (player.torso.neck.head.ears.type === EarType.HUMAN || player.torso.neck.head.ears.type === EarType.ELFIN) && Utils.rand(4) === 0 && changes < changeLimit) {
            DisplayText("\n\nA slowly-building itch spreads over your whole body, and as you idly scratch yourself, you find that your " + SkinDescriptor.skinFurScales(player) + " ");
            if (player.skin.type === SkinType.SCALES) DisplayText("are");
            else DisplayText("is");
            DisplayText(" falling to the ground, revealing flawless, almost pearly-white skin underneath.  <b>You now have pale white skin.</b>");
            player.skin.tone = "pale white";
            player.skin.adj = "";
            player.skin.type = SkinType.PLAIN;
            player.skin.desc = "skin";
            changes++;
        }
        // (Gain human face)
        if (player.skin.type === SkinType.PLAIN && (player.torso.neck.head.face.type !== FaceType.SPIDER_FANGS && player.torso.neck.head.face.type !== FaceType.HUMAN) && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nWracked by pain, your face slowly reforms into a perfect human shape.  Awed by the transformation, you run your fingers delicately over the new face, marvelling at the change.  <b>You have a human face again!</b>");
            player.torso.neck.head.face.type = FaceType.HUMAN;
            changes++;
        }
        // -Remove breast rows over 2.
        if (changes < changeLimit && player.torso.chest.count > 2 && Utils.rand(3) === 0 && !Flags.list[FlagEnum.HYPER_HAPPY]) {
            changes++;
            const bottomBreastRow: BreastRow = player.torso.chest.get(player.torso.chest.count - 1);
            DisplayText("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + BreastDescriptor.describeBreastRow(bottomBreastRow) + " shrink down, disappearing completely into your ");
            if (player.torso.chest.count >= 3) DisplayText("abdomen");
            else DisplayText("chest");
            DisplayText(". The " + BreastDescriptor.describeNipple(player, bottomBreastRow) + "s even fade until nothing but ");
            if (player.skin.type === SkinType.FUR) DisplayText(player.torso.neck.head.hair.color + " " + player.skin.desc);
            else DisplayText(player.skin.tone + " " + player.skin.desc);
            DisplayText(" remains. <b>You've lost a row of breasts!</b>");
            player.stats.sens += -5;
            player.torso.chest.remove(player.torso.chest.count - 1);
        }
        // -Nipples reduction to 1 per tit.
        if (player.torso.chest.reduce(BreastRow.AverageNipplesPerBreast, 0) > 1 && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nA chill runs over your " + BreastDescriptor.describeAllBreasts(player) + " and vanishes.  You stick a hand under your " + player.inventory.equipment.armor.displayName + " and discover that your extra nipples are missing!  You're down to just one per ");
            if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating < 1) DisplayText("'breast'.");
            else DisplayText("breast.");
            changes++;
            // Loop through and reset nipples
            for (let index: number = 0; index < player.torso.chest.count; index++) {
                player.torso.chest.get(index).nipples.count = 1;
            }
        }
        // Nipples Turn Black:
        if (!player.statusAffects.has(StatusAffectType.BlackNipples) && Utils.rand(6) === 0 && changes < changeLimit) {
            DisplayText("\n\nA tickling sensation plucks at your nipples and you cringe, trying not to giggle.  Looking down you are in time to see the last spot of flesh tone disappear from your [nipples].  They have turned an onyx black!");
            player.statusAffects.add(StatusAffectType.BlackNipples, 0, 0, 0, 0);
            changes++;
        }
        // eyes!
        if (player.skin.type === SkinType.PLAIN && player.torso.neck.head.face.type !== FaceType.SPIDER_FANGS && player.torso.neck.head.face.type !== FaceType.HUMAN && player.torso.neck.head.face.eyes.type === EyeType.HUMAN && Utils.rand(4) === 0 && changes < changeLimit) {
            player.torso.neck.head.face.eyes.type = EyeType.FOUR_SPIDER_EYES;
            changes++;
            DisplayText("\n\nYou suddenly get the strangest case of double vision.  Stumbling and blinking around, you clutch at your face, but you draw your hands back when you poke yourself in the eye.  Wait, those fingers were on your forehead!  You tentatively run your fingertips across your forehead, not quite believing what you felt.  <b>There's a pair of eyes on your forehead, positioned just above your normal ones!</b>  This will take some getting used to!");
            player.stats.int += 5;
        }
        // (Gain spider fangs)
        if (player.torso.neck.head.face.type === FaceType.HUMAN && player.skin.type === SkinType.PLAIN && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nTension builds within your upper gum, just above your canines.  You open your mouth and prod at the affected area, pricking your finger on the sharpening tooth.  It slides down while you're touching it, lengthening into a needle-like fang.  You check the other side and confirm your suspicions.  <b>You now have a pair of pointy spider-fangs, complete with their own venom!</b>");
            player.torso.neck.head.face.type = FaceType.SPIDER_FANGS;
            changes++;
        }
        // (Arms to carapace-covered arms)
        if (player.torso.arms.type !== ArmType.SPIDER && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\n");
            // (Bird pretext)
            if (player.torso.arms.type === ArmType.HARPY) DisplayText("The feathers covering your arms fall away, leaving them to return to a far more human appearance.  ");
            DisplayText("You watch, spellbound, while your forearms gradually become shiny.  The entire outer structure of your arms tingles while it divides into segments, turning the " + SkinDescriptor.skinFurScales(player) + " into a shiny black carapace.  You touch the onyx exoskeleton and discover to your delight that you can still feel through it as naturally as your own skin.");
            player.torso.arms.type = ArmType.SPIDER;
            changes++;
        }
        // (Centaurs -> Normal Human Legs) (copy from elsewhere)
        if (player.torso.hips.legs.isTaur() && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nYour quadrupedal hind-quarters seizes, overbalancing your surprised front-end and causing you to stagger and fall to your side.  Pain lances throughout, contorting your body into a tightly clenched ball of pain while tendons melt and bones break, melt, and regrow.  When it finally stops, <b>you look down to behold your new pair of human legs</b>!");
            player.torso.hips.legs.type = LegType.HUMAN;
            changes++;
        }
        // (Goo -> Normal Human Legs) (copy from elsewhere)
        if (player.torso.hips.legs.isGoo() && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nYour lower body rushes inward, molding into two leg-like shapes that gradually stiffen up.  In moments they solidify into normal-looking legs, complete with regular, human feet.  <b>You now have normal feet!</b>");
            player.torso.hips.legs.type = LegType.HUMAN;
            changes++;
        }
        // (Naga -> Normal Human Legs) (copy from elsewhere)
        if (player.torso.hips.legs.isNaga() && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nYou collapse as your sinuous snake-tail tears in half, shifting into legs.  The pain is immense, particularly where your new feet are forming.  <b>You have human legs again.</b>");
            player.torso.hips.legs.type = LegType.HUMAN;
            changes++;
        }
        // Drider butt
        if (!this.sweet && !player.perks.has(PerkType.SpiderOvipositor) && player.torso.hips.legs.isDrider() && player.torso.tails.hasType(TailType.SPIDER_ABDOMEN) && changes < changeLimit && Utils.rand(3) === 0 && (player.torso.vaginas.count > 0 || Utils.rand(2) === 0)) {
            DisplayText("\n\nAn odd swelling sensation floods your spider half.  Curling your abdomen underneath you for a better look, you gasp in recognition at your new 'equipment'!  Your semi-violent run-ins with the swamp's population have left you <i>intimately</i> familiar with the new appendage.  <b>It's a drider ovipositor!</b>  A few light prods confirm that it's just as sensitive as any of your other sexual organs.  You idly wonder what laying eggs with this thing will feel like...");
            DisplayText("\n\n(<b>Perk Gained:  Spider Ovipositor - Allows you to lay eggs in your foes!</b>)");
            // V1 - Egg Count
            // V2 - Fertilized Count
            player.perks.add(PerkType.SpiderOvipositor, 0, 0, 0, 0);
            // Opens up drider ovipositor scenes from available mobs. The player begins producing unfertilized eggs in their arachnid abdomen. Egg buildup raises minimum lust and eventually lowers speed until the player has gotten rid of them.  This perk may only be used with the drider lower body, so your scenes should reflect that.
            // Any PC can get an Ovipositor perk, but it will be much rarer for players without vaginas.
            // Eggs are unfertilized by default, but can be fertilized:
            // -female/herm players can fertilize them by taking in semen; successfully passing a pregnancy check will convert one level ofunfertilized eggs to fertilized, even if the PC is already pregnant.
            // -male/herm players will have a sex dream if they reach stage three of unfertilized eggs; this will represent their bee/drider parts drawing their own semen from their body to fertilize the eggs, and is accompanied by a nocturnal emission.
            // -unsexed players cannot currently fertilize their eggs.
            // Even while unfertilized, eggs can be deposited inside NPCs - obviously, unfertilized eggs will never hatch and cannot lead to any egg-birth scenes that may be written later.
            changes++;
        }
        // (Normal Biped Legs -> Carapace-Clad Legs)
        if (((!this.sweet && player.torso.hips.legs.type !== LegType.DRIDER_LOWER_BODY && player.torso.hips.legs.type !== LegType.CHITINOUS_SPIDER_LEGS) ||
            (this.sweet && player.torso.hips.legs.type !== LegType.CHITINOUS_SPIDER_LEGS)) &&
            (!player.torso.hips.legs.isGoo() && !player.torso.hips.legs.isNaga() && !player.torso.hips.legs.isTaur() &&
            changes < changeLimit &&
            Utils.rand(4) === 0
        ) {
            DisplayText("\n\nStarting at your " + LegDescriptor.describeFeet(player) + ", a tingle runs up your " + LegDescriptor.describeLegs(player) + ", not stopping until it reaches your thighs.  From the waist down, your strength completely deserts you, leaving you to fall hard on your " + ButtDescriptor.describeButt(player) + " in the dirt.  With nothing else to do, you look down, only to be mesmerized by the sight of black exoskeleton creeping up a perfectly human-looking calf.  It crests up your knee to envelop the joint in a many-faceted onyx coating.  Then, it resumes its slow upward crawl, not stopping until it has girded your thighs in glittery, midnight exoskeleton.  From a distance it would look almost like a black, thigh-high boot, but you know the truth.  <b>You now have human-like legs covered in a black, arachnid exoskeleton.</b>");
            player.torso.hips.legs.type = LegType.CHITINOUS_SPIDER_LEGS;
            changes++;
        }
        // (Tail becomes spider abdomen GRANT WEB ATTACK)
        if (!player.torso.tails.hasType(TailType.SPIDER_ABDOMEN) && (player.torso.hips.legs.type === LegType.CHITINOUS_SPIDER_LEGS || player.torso.hips.legs.type === LegType.DRIDER_LOWER_BODY) && player.torso.arms.type === ArmType.SPIDER && Utils.rand(4) === 0) {
            DisplayText("\n\n");
            // (Pre-existing tails)
            if (player.torso.tails.count > 0) DisplayText("Your tail shudders as heat races through it, twitching violently until it feels almost as if it's on fire.  You jump from the pain at your " + ButtDescriptor.describeButt(player) + " and grab at it with your hands.  It's huge... and you can feel it hardening under your touches, firming up until the whole tail has become rock-hard and spherical in shape.  The heat fades, leaving behind a gentle warmth, and you realize your tail has become a spider's abdomen!  With one experimental clench, you even discover that it can shoot webs from some of its spinnerets, both sticky and non-adhesive ones.  That may prove useful.  <b>You now have a spider's abdomen hanging from above your " + ButtDescriptor.describeButt(player) + "!</b>\n\n");
            // (No tail)
            else DisplayText("A burst of pain hits you just above your " + ButtDescriptor.describeButt(player) + ", coupled with a sensation of burning heat and pressure.  You can feel your " + SkinDescriptor.skinFurScales(player) + " tearing as something forces its way out of your body.  Reaching back, you grab at it with your hands.  It's huge... and you can feel it hardening under your touches, firming up until the whole tail has become rock-hard and spherical in shape.  The heat fades, leaving behind a gentle warmth, and you realize your tail has become a spider's abdomen!  With one experimental clench, you even discover that it can shoot webs from some of its spinnerets, both sticky and non-adhesive ones.  That may prove useful.  <b>You now have a spider's abdomen hanging from above your " + ButtDescriptor.describeButt(player) + "!</b>");
            player.torso.tails.clear();
            const newTail = new Tail(TailType.SPIDER_ABDOMEN);
            newTail.vemon = 5;
            newTail.recharge = 5;
            player.torso.tails.add(newTail);
            changes++;
        }
        // (Drider Item Only: Carapace-Clad Legs to Drider Legs)
        if (!this.sweet && player.torso.hips.legs.type === LegType.CHITINOUS_SPIDER_LEGS && Utils.rand(4) === 0 && player.torso.tails.hasType(TailType.SPIDER_ABDOMEN)) {
            DisplayText("\n\nJust like when your legs changed to those of a spider-morph, you find yourself suddenly paralyzed below the waist.  Your dark, reflective legs splay out and drop you flat on your back.   Before you can sit up, you feel tiny feelers of pain mixed with warmth and tingling running through them.  Terrified at the thought of all the horrible changes that could be wracking your body, you slowly sit up, expecting to find yourself turned into some incomprehensible monstrosity from the waist down.  As if to confirm your suspicions, the first thing you see is that your legs have transformed into eight long, spindly legs.  Instead of joining directly with your hips, they now connect with the spider-like body that has sprouted in place of where your legs would normally start.  Your abdomen has gotten even larger as well.  Once the strength returns to your new, eight-legged lower body, you struggle up onto your pointed 'feet', and wobble around, trying to get your balance.  As you experiment with your new form, you find you're even able to twist the spider half of your body down between your legs in an emulation of your old, bipedal stance.  That might prove useful should you ever want to engage in 'normal' sexual positions, particularly since your " + ButtDescriptor.describeButt(player) + " is still positioned just above the start of your arachnid half.  <b>You're now a drider.</b>");
            player.torso.hips.legs.type = LegType.DRIDER_LOWER_BODY;
            changes++;
        }
        if (Utils.rand(4) === 0 && player.torso.neck.gills && changes < changeLimit) {
            DisplayText("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            player.torso.neck.gills = false;
            changes++;
        }
        if (changes === 0) {
            DisplayText("\n\nThe sweet silk energizes you, leaving you feeling refreshed.");
            player.stats.fatigue -= 33;
        }
    }
}
