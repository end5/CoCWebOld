import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import { ArmType } from '../../Body/Arms';
import BreastRow from '../../Body/BreastRow';
import { EarType } from '../../Body/Ears';
import { EyeType } from '../../Body/Eyes';
import { FaceType } from '../../Body/Face';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import Character from '../../Character/Character';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import LegDescriptor from '../../Descriptors/LegDescriptor';
import SkinDescriptor from '../../Descriptors/SkinDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
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

    public use(character: Character) {
        DisplayText().clear();
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(2) === 0) changeLimit++;
        if (character.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        // Consuming Text
        if (this.sweet) DisplayText("You wad up the sweet, pink gossamer and eat it, finding it to be delicious and chewy, almost like gum.  Munching away, your mouth generates an enormous amount of spit until you're drooling all over yourself while you devour the sweet treat.");
        else if (!this.sweet) DisplayText("You wad up the sweet, black gossamer and eat it, finding it to be delicious and chewy, almost like licorice.  Munching away, your mouth generates an enormous amount of spit until you're drooling all over yourself while you devour the sweet treat.");

        // *************
        // Stat Changes
        // *************
        // (If speed<70, increases speed)
        if (character.stats.spe < 70 && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nYour reflexes feel much faster. Experimentally, you make a grab at a fly on a nearby rock and quickly snatch it out of the air.  A compulsion to stuff it in your mouth and eat it surfaces, but you resist the odd desire.  Why would you ever want to do something like that?");
            character.stats.spe += 1.5;
            changes++;
        }
        // (If speed>80, decreases speed down to minimum of 80)
        if (character.stats.spe > 80 && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nYou feel like resting high in the trees and waiting for your unsuspecting prey to wander below so you can take them without having to exert yourself.  What an odd thought!");
            character.stats.spe += -1.5;
            changes++;
        }
        // (increases sensitivity)
        if (changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nThe hairs on your arms and legs stand up straight for a few moments, detecting the airflow around you. Touch appears to be more receptive from now on.");
            character.stats.sens += 1;
            changes++;
        }
        // (Increase libido)
        if (changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nYou suddenly feel slightly needier, and your loins stir in quiet reminder that they could be seen to. The aftertaste hangs on your tongue and your teeth.  You wish there had been more.");
            character.stats.lib += 1;
            changes++;
        }
        // (increase toughness to 60)
        if (changes < changeLimit && Utils.rand(3) === 0 && character.stats.tou < 60) {
            DisplayText("\n\nStretching languidly, you realize you're feeling a little tougher than before, almost as if you had a full-body shell of armor protecting your internal organs.  How strange.  You probe at yourself, and while your " + SkinDescriptor.skinFurScales(character) + " doesn't feel much different, the underlying flesh does seem tougher.");
            character.stats.tou += 1;
            changes++;
        }
        // (decrease strength to 70)
        if (character.stats.str > 70 && Utils.rand(3) === 0) {
            DisplayText("\n\nLethargy rolls through you while you burp noisily.  You rub at your muscles and sigh, wondering why you need to be strong when you could just sew up a nice sticky web to catch your enemies.  ");
            if (RaceScore.spiderScore(character) < 4) DisplayText("Wait, you're not a spider, that doesn't make any sense!");
            else DisplayText("Well, maybe you should put your nice, heavy abdomen to work.");
            character.stats.str += -1;
            changes++;
        }
        // ****************
        // Sexual Changes
        // ****************
        // Increase venom recharge
        const spiderbutts = character.torso.tails.filter(Tail.FilterType(TailType.SPIDER_ABDOMEN));
        if (spiderbutts.length >= 1 && spiderbutts[0].recharge < 25 && changes < changeLimit) {
            changes++;
            DisplayText("\n\nThe spinnerets on your abdomen twitch and drip a little webbing.  The entirety of its heavy weight shifts slightly, and somehow you know you'll produce webs faster now.");
            spiderbutts[0].recharge += 5;
        }
        // (tightens vagina to 1, increases lust/libido)
        if (character.torso.vaginas.count > 0) {
            if (character.torso.vaginas.get(0).looseness > 1 && changes < changeLimit && Utils.rand(3) === 0) {
                DisplayText("\n\nWith a gasp, you feel your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " tightening, making you leak sticky girl-juice. After a few seconds, it stops, and you rub on your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " excitedly. You can't wait to try this out!");
                character.stats.lib += 2;
                character.stats.lust += 25;
                changes++;
                character.torso.vaginas.get(0).looseness--;
            }
        }
        // (tightens asshole to 1, increases lust)
        if (character.torso.butt.looseness > 1 && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nYou let out a small cry as your " + ButtDescriptor.describeButthole(character.torso.butt) + " shrinks, becoming smaller and tighter. When it's done, you feel much hornier and eager to stretch it out again.");
            character.stats.lib += 2;
            character.stats.lust += 25;
            changes++;
            character.torso.butt.looseness--;
        }
        // [Requires penises]
        // (Thickens all cocks to a ratio of 1\" thickness per 5.5\"
        if (character.torso.cocks.count > 0 && changes < changeLimit && Utils.rand(4) === 0) {
            // Use temp to see if any dicks can be thickened
            let cockGotThickened: boolean = false;
            for (let index: number = 0; index < character.torso.cocks.count; index++) {
                if (character.torso.cocks.get(index).thickness * 5.5 < character.torso.cocks.get(index).length) {
                    character.torso.cocks.get(index).thickness += .1;
                    cockGotThickened = true;
                }
            }
            // If something got thickened
            if (cockGotThickened) {
                DisplayText("\n\nYou can feel your " + CockDescriptor.describeMultiCockShort(character) + " filling out in your " + character.inventory.equipment.armor.displayName + ". Pulling ");
                if (character.torso.cocks.count === 1) DisplayText("it");
                else DisplayText("them");
                DisplayText(" out, you look closely.  ");
                if (character.torso.cocks.count === 1) DisplayText("It's");
                else DisplayText("They're");
                DisplayText(" definitely thicker.");
                changes++;
            }
        }
        // [Increase to Breast Size] - up to Large DD
        if (character.torso.chest.count > 0) {
            const smallestBreastRow = character.torso.chest.sort(BreastRow.BreastRatingSmallest)[0];
            if (smallestBreastRow.rating < 6 && changes < changeLimit && Utils.rand(4) === 0) {
                DisplayText("\n\nAfter eating it, your chest aches and tingles, and your hands reach up to scratch at it unthinkingly.  Silently, you hope that you aren't allergic to it.  Just as you start to scratch at your " + BreastDescriptor.describeBreastRow(smallestBreastRow) + ", your chest pushes out in slight but sudden growth.");
                smallestBreastRow.rating++;
                changes++;
            }
        }
        // [Increase to Ass Size] - to 11
        if (character.torso.butt.rating < 11 && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nYou look over your shoulder at your " + ButtDescriptor.describeButt(character) + " only to see it expand just slightly. You gape in confusion before looking back at the remaining silk in your hands. You finish it anyway. Dammit!");
            character.torso.butt.rating++;
            changes++;
        }
        // ***************
        // Appearance Changes
        // ***************
        // (Ears become pointed if not human)
        if (character.torso.neck.head.ears.type !== EarType.HUMAN && character.torso.neck.head.ears.type !== EarType.ELFIN && Utils.rand(4) === 0 && changes < changeLimit) {
            DisplayText("\n\nYour ears twitch once, twice, before starting to shake and tremble madly.  They migrate back towards where your ears USED to be, so long ago, finally settling down before twisting and stretching, changing to become <b>new, pointed elfin ears.</b>");
            character.torso.neck.head.ears.type = EarType.ELFIN;
            changes++;
        }
        // (Fur/Scales fall out)
        if (character.skin.type !== SkinType.PLAIN && (character.torso.neck.head.ears.type === EarType.HUMAN || character.torso.neck.head.ears.type === EarType.ELFIN) && Utils.rand(4) === 0 && changes < changeLimit) {
            DisplayText("\n\nA slowly-building itch spreads over your whole body, and as you idly scratch yourself, you find that your " + SkinDescriptor.skinFurScales(character) + " ");
            if (character.skin.type === SkinType.SCALES) DisplayText("are");
            else DisplayText("is");
            DisplayText(" falling to the ground, revealing flawless, almost pearly-white skin underneath.  <b>You now have pale white skin.</b>");
            character.skin.tone = "pale white";
            character.skin.adj = "";
            character.skin.type = SkinType.PLAIN;
            character.skin.desc = "skin";
            changes++;
        }
        // (Gain human face)
        if (character.skin.type === SkinType.PLAIN && (character.torso.neck.head.face.type !== FaceType.SPIDER_FANGS && character.torso.neck.head.face.type !== FaceType.HUMAN) && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nWracked by pain, your face slowly reforms into a perfect human shape.  Awed by the transformation, you run your fingers delicately over the new face, marvelling at the change.  <b>You have a human face again!</b>");
            character.torso.neck.head.face.type = FaceType.HUMAN;
            changes++;
        }
        // -Remove breast rows over 2.
        if (changes < changeLimit && character.torso.chest.count > 2 && Utils.rand(3) === 0 && !Flags.list[FlagEnum.HYPER_HAPPY]) {
            changes++;
            const bottomBreastRow: BreastRow = character.torso.chest.get(character.torso.chest.count - 1);
            DisplayText("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + BreastDescriptor.describeBreastRow(bottomBreastRow) + " shrink down, disappearing completely into your ");
            if (character.torso.chest.count >= 3) DisplayText("abdomen");
            else DisplayText("chest");
            DisplayText(". The " + BreastDescriptor.describeNipple(character, bottomBreastRow) + "s even fade until nothing but ");
            if (character.skin.type === SkinType.FUR) DisplayText(character.torso.neck.head.hair.color + " " + character.skin.desc);
            else DisplayText(character.skin.tone + " " + character.skin.desc);
            DisplayText(" remains. <b>You've lost a row of breasts!</b>");
            character.stats.sens += -5;
            character.torso.chest.remove(character.torso.chest.count - 1);
        }
        // -Nipples reduction to 1 per tit.
        if (character.torso.chest.reduce(BreastRow.AverageNipplesPerBreast, 0) > 1 && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nA chill runs over your " + BreastDescriptor.describeAllBreasts(character) + " and vanishes.  You stick a hand under your " + character.inventory.equipment.armor.displayName + " and discover that your extra nipples are missing!  You're down to just one per ");
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating < 1) DisplayText("'breast'.");
            else DisplayText("breast.");
            changes++;
            // Loop through and reset nipples
            for (let index: number = 0; index < character.torso.chest.count; index++) {
                character.torso.chest.get(index).nipples.count = 1;
            }
        }
        // Nipples Turn Black:
        if (!character.statusAffects.has(StatusAffectType.BlackNipples) && Utils.rand(6) === 0 && changes < changeLimit) {
            DisplayText("\n\nA tickling sensation plucks at your nipples and you cringe, trying not to giggle.  Looking down you are in time to see the last spot of flesh tone disappear from your [nipples].  They have turned an onyx black!");
            character.statusAffects.add(StatusAffectType.BlackNipples, 0, 0, 0, 0);
            changes++;
        }
        // eyes!
        if (character.skin.type === SkinType.PLAIN && character.torso.neck.head.face.type !== FaceType.SPIDER_FANGS && character.torso.neck.head.face.type !== FaceType.HUMAN && character.torso.neck.head.face.eyes.type === EyeType.HUMAN && Utils.rand(4) === 0 && changes < changeLimit) {
            character.torso.neck.head.face.eyes.type = EyeType.FOUR_SPIDER_EYES;
            changes++;
            DisplayText("\n\nYou suddenly get the strangest case of double vision.  Stumbling and blinking around, you clutch at your face, but you draw your hands back when you poke yourself in the eye.  Wait, those fingers were on your forehead!  You tentatively run your fingertips across your forehead, not quite believing what you felt.  <b>There's a pair of eyes on your forehead, positioned just above your normal ones!</b>  This will take some getting used to!");
            character.stats.int += 5;
        }
        // (Gain spider fangs)
        if (character.torso.neck.head.face.type === FaceType.HUMAN && character.skin.type === SkinType.PLAIN && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nTension builds within your upper gum, just above your canines.  You open your mouth and prod at the affected area, pricking your finger on the sharpening tooth.  It slides down while you're touching it, lengthening into a needle-like fang.  You check the other side and confirm your suspicions.  <b>You now have a pair of pointy spider-fangs, complete with their own venom!</b>");
            character.torso.neck.head.face.type = FaceType.SPIDER_FANGS;
            changes++;
        }
        // (Arms to carapace-covered arms)
        if (character.torso.arms.type !== ArmType.SPIDER && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\n");
            // (Bird pretext)
            if (character.torso.arms.type === ArmType.HARPY) DisplayText("The feathers covering your arms fall away, leaving them to return to a far more human appearance.  ");
            DisplayText("You watch, spellbound, while your forearms gradually become shiny.  The entire outer structure of your arms tingles while it divides into segments, turning the " + SkinDescriptor.skinFurScales(character) + " into a shiny black carapace.  You touch the onyx exoskeleton and discover to your delight that you can still feel through it as naturally as your own skin.");
            character.torso.arms.type = ArmType.SPIDER;
            changes++;
        }
        // (Centaurs -> Normal Human Legs) (copy from elsewhere)
        if (character.torso.hips.legs.isTaur() && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nYour quadrupedal hind-quarters seizes, overbalancing your surprised front-end and causing you to stagger and fall to your side.  Pain lances throughout, contorting your body into a tightly clenched ball of pain while tendons melt and bones break, melt, and regrow.  When it finally stops, <b>you look down to behold your new pair of human legs</b>!");
            character.torso.hips.legs.type = LegType.HUMAN;
            changes++;
        }
        // (Goo -> Normal Human Legs) (copy from elsewhere)
        if (character.torso.hips.legs.isGoo() && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nYour lower body rushes inward, molding into two leg-like shapes that gradually stiffen up.  In moments they solidify into normal-looking legs, complete with regular, human feet.  <b>You now have normal feet!</b>");
            character.torso.hips.legs.type = LegType.HUMAN;
            changes++;
        }
        // (Naga -> Normal Human Legs) (copy from elsewhere)
        if (character.torso.hips.legs.isNaga() && changes < changeLimit && Utils.rand(4) === 0) {
            DisplayText("\n\nYou collapse as your sinuous snake-tail tears in half, shifting into legs.  The pain is immense, particularly where your new feet are forming.  <b>You have human legs again.</b>");
            character.torso.hips.legs.type = LegType.HUMAN;
            changes++;
        }
        // Drider butt
        if (!this.sweet && !character.perks.has(PerkType.SpiderOvipositor) && character.torso.hips.legs.isDrider() && character.torso.tails.reduce(Tail.HasType(TailType.SPIDER_ABDOMEN), false) && changes < changeLimit && Utils.rand(3) === 0 && (character.torso.vaginas.count > 0 || Utils.rand(2) === 0)) {
            DisplayText("\n\nAn odd swelling sensation floods your spider half.  Curling your abdomen underneath you for a better look, you gasp in recognition at your new 'equipment'!  Your semi-violent run-ins with the swamp's population have left you <i>intimately</i> familiar with the new appendage.  <b>It's a drider ovipositor!</b>  A few light prods confirm that it's just as sensitive as any of your other sexual organs.  You idly wonder what laying eggs with this thing will feel like...");
            DisplayText("\n\n(<b>Perk Gained:  Spider Ovipositor - Allows you to lay eggs in your foes!</b>)");
            // V1 - Egg Count
            // V2 - Fertilized Count
            character.perks.add(PerkType.SpiderOvipositor, 0, 0, 0, 0);
            // Opens up drider ovipositor scenes from available mobs. The character begins producing unfertilized eggs in their arachnid abdomen. Egg buildup raises minimum lust and eventually lowers speed until the character has gotten rid of them.  This perk may only be used with the drider lower body, so your scenes should reflect that.
            // Any PC can get an Ovipositor perk, but it will be much rarer for characters without vaginas.
            // Eggs are unfertilized by default, but can be fertilized:
            // -female/herm characters can fertilize them by taking in semen; successfully passing a pregnancy check will convert one level ofunfertilized eggs to fertilized, even if the PC is already pregnant.
            // -male/herm characters will have a sex dream if they reach stage three of unfertilized eggs; this will represent their bee/drider parts drawing their own semen from their body to fertilize the eggs, and is accompanied by a nocturnal emission.
            // -unsexed characters cannot currently fertilize their eggs.
            // Even while unfertilized, eggs can be deposited inside NPCs - obviously, unfertilized eggs will never hatch and cannot lead to any egg-birth scenes that may be written later.
            changes++;
        }
        // (Normal Biped Legs -> Carapace-Clad Legs)
        if (((!this.sweet && character.torso.hips.legs.type !== LegType.DRIDER_LOWER_BODY && character.torso.hips.legs.type !== LegType.CHITINOUS_SPIDER_LEGS) ||
            (this.sweet && character.torso.hips.legs.type !== LegType.CHITINOUS_SPIDER_LEGS)) &&
            (!character.torso.hips.legs.isGoo() && !character.torso.hips.legs.isNaga() && !character.torso.hips.legs.isTaur()) &&
            changes < changeLimit &&
            Utils.rand(4) === 0
        ) {
            DisplayText("\n\nStarting at your " + LegDescriptor.describeFeet(character) + ", a tingle runs up your " + LegDescriptor.describeLegs(character) + ", not stopping until it reaches your thighs.  From the waist down, your strength completely deserts you, leaving you to fall hard on your " + ButtDescriptor.describeButt(character) + " in the dirt.  With nothing else to do, you look down, only to be mesmerized by the sight of black exoskeleton creeping up a perfectly human-looking calf.  It crests up your knee to envelop the joint in a many-faceted onyx coating.  Then, it resumes its slow upward crawl, not stopping until it has girded your thighs in glittery, midnight exoskeleton.  From a distance it would look almost like a black, thigh-high boot, but you know the truth.  <b>You now have human-like legs covered in a black, arachnid exoskeleton.</b>");
            character.torso.hips.legs.type = LegType.CHITINOUS_SPIDER_LEGS;
            changes++;
        }
        // (Tail becomes spider abdomen GRANT WEB ATTACK)
        if (!character.torso.tails.reduce(Tail.HasType(TailType.SPIDER_ABDOMEN), false) && (character.torso.hips.legs.type === LegType.CHITINOUS_SPIDER_LEGS || character.torso.hips.legs.type === LegType.DRIDER_LOWER_BODY) && character.torso.arms.type === ArmType.SPIDER && Utils.rand(4) === 0) {
            DisplayText("\n\n");
            // (Pre-existing tails)
            if (character.torso.tails.count > 0) DisplayText("Your tail shudders as heat races through it, twitching violently until it feels almost as if it's on fire.  You jump from the pain at your " + ButtDescriptor.describeButt(character) + " and grab at it with your hands.  It's huge... and you can feel it hardening under your touches, firming up until the whole tail has become rock-hard and spherical in shape.  The heat fades, leaving behind a gentle warmth, and you realize your tail has become a spider's abdomen!  With one experimental clench, you even discover that it can shoot webs from some of its spinnerets, both sticky and non-adhesive ones.  That may prove useful.  <b>You now have a spider's abdomen hanging from above your " + ButtDescriptor.describeButt(character) + "!</b>\n\n");
            // (No tail)
            else DisplayText("A burst of pain hits you just above your " + ButtDescriptor.describeButt(character) + ", coupled with a sensation of burning heat and pressure.  You can feel your " + SkinDescriptor.skinFurScales(character) + " tearing as something forces its way out of your body.  Reaching back, you grab at it with your hands.  It's huge... and you can feel it hardening under your touches, firming up until the whole tail has become rock-hard and spherical in shape.  The heat fades, leaving behind a gentle warmth, and you realize your tail has become a spider's abdomen!  With one experimental clench, you even discover that it can shoot webs from some of its spinnerets, both sticky and non-adhesive ones.  That may prove useful.  <b>You now have a spider's abdomen hanging from above your " + ButtDescriptor.describeButt(character) + "!</b>");
            character.torso.tails.clear();
            const newTail = new Tail(TailType.SPIDER_ABDOMEN);
            newTail.vemon = 5;
            newTail.recharge = 5;
            character.torso.tails.add(newTail);
            changes++;
        }
        // (Drider Item Only: Carapace-Clad Legs to Drider Legs)
        if (!this.sweet && character.torso.hips.legs.type === LegType.CHITINOUS_SPIDER_LEGS && Utils.rand(4) === 0 && character.torso.tails.reduce(Tail.HasType(TailType.SPIDER_ABDOMEN), false)) {
            DisplayText("\n\nJust like when your legs changed to those of a spider-morph, you find yourself suddenly paralyzed below the waist.  Your dark, reflective legs splay out and drop you flat on your back.   Before you can sit up, you feel tiny feelers of pain mixed with warmth and tingling running through them.  Terrified at the thought of all the horrible changes that could be wracking your body, you slowly sit up, expecting to find yourself turned into some incomprehensible monstrosity from the waist down.  As if to confirm your suspicions, the first thing you see is that your legs have transformed into eight long, spindly legs.  Instead of joining directly with your hips, they now connect with the spider-like body that has sprouted in place of where your legs would normally start.  Your abdomen has gotten even larger as well.  Once the strength returns to your new, eight-legged lower body, you struggle up onto your pointed 'feet', and wobble around, trying to get your balance.  As you experiment with your new form, you find you're even able to twist the spider half of your body down between your legs in an emulation of your old, bipedal stance.  That might prove useful should you ever want to engage in 'normal' sexual positions, particularly since your " + ButtDescriptor.describeButt(character) + " is still positioned just above the start of your arachnid half.  <b>You're now a drider.</b>");
            character.torso.hips.legs.type = LegType.DRIDER_LOWER_BODY;
            changes++;
        }
        if (Utils.rand(4) === 0 && character.torso.neck.gills && changes < changeLimit) {
            DisplayText("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            character.torso.neck.gills = false;
            changes++;
        }
        if (changes === 0) {
            DisplayText("\n\nThe sweet silk energizes you, leaving you feeling refreshed.");
            character.stats.fatigue -= 33;
        }
    }
}
