import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import { ArmType } from '../../Body/Arms';
import BreastRow from '../../Body/BreastRow';
import Cock, { CockType } from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import { EyeType } from '../../Body/Eyes';
import { FaceType } from '../../Body/Face';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import Character from '../../Character/Character';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import LegDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Game from '../../Game/Game';
import BodyModifier from '../../Modifiers/BodyModifier';
import CockModifier from '../../Modifiers/CockModifier';
import StatModifier from '../../Modifiers/StatModifier';
import RaceScore from '../../RaceScore';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export enum CaninePepperType {
    Normal,
    Oversized,
    Double,
    Black,
    Knotty,
    Bulbous
}

export default class CaninePepper extends Consumable {
    // 1-Oversized Pepper (+size, thickness)
    // 2-Double Pepper (+grows second cock or changes two cocks to dogcocks)
    // 3-Black Pepper (Dark Fur, +corruption/libido)
    // 4-Knotty Pepper (+Knot + Cum Multiplier)
    // 5-Bulbous Pepper (+ball size or fresh balls)
    private pepperType: CaninePepperType;
    public constructor(pepperType: CaninePepperType) {
        switch (pepperType) {
            default:
            case CaninePepperType.Normal:
                super(ConsumableName.CaninePepper, new ItemDesc("CanineP", "a Canine pepper", "The pepper is shiny and red, bulbous at the base but long and narrow at the tip.  It smells spicy."));
                break;
            case CaninePepperType.Oversized:
                super(ConsumableName.CaninePepperLarge, new ItemDesc("LargePp", "an overly large canine pepper", "This large canine pepper is much bigger than any normal peppers you've seen."), 10);
                break;
            case CaninePepperType.Double:
                super(ConsumableName.CaninePepperDouble, new ItemDesc("DblPepp", "a double canine pepper", "This canine pepper is actually two that have grown together due to some freak coincidence."), 10);
                break;
            case CaninePepperType.Black:
                super(ConsumableName.CaninePepperBlack, new ItemDesc("BlackPp", "a solid black canine pepper", "This solid black canine pepper is smooth and shiny, but something about it doesn't seem quite right..."), 10);
                break;
            case CaninePepperType.Knotty:
                super(ConsumableName.CaninePepperKnotty, new ItemDesc("KnottyP", "a knotty canine pepper", "This knotted pepper is very swollen, with a massive, distended knot near the base."), 10);
                break;
            case CaninePepperType.Bulbous:
                super(ConsumableName.CaninePepperBulbous, new ItemDesc("BulbyPp", "a bulbous pepper", "This bulbous pepper has a slightly different shape than the other canine peppers, with two large orb-like protrusions at the base."), 10);
                break;
        }
        this.pepperType = pepperType;
    }

    private eatPepperDesc(character: Character): number {
        let crit: number = 1;
        if (this.pepperType === CaninePepperType.Normal) {
            if (Utils.rand(100) < 15) {
                crit = Utils.rand(20) / 10 + 2;
                DisplayText("The pepper tastes particularly potent, searingly hot and spicy.");
            }
            else DisplayText("The pepper is strangely spicy but very tasty.");
        }
        // Oversized pepper
        if (this.pepperType === CaninePepperType.Oversized) {
            crit = Utils.rand(20) / 10 + 2;
            DisplayText("The pepper is so large and thick that you have to eat it in several large bites.  It is not as spicy as the normal ones, but is delicious and flavorful.");
        }
        // Double Pepper
        if (this.pepperType === CaninePepperType.Double) {
            crit = Utils.rand(20) / 10 + 2;
            DisplayText("The double-pepper is strange, looking like it was formed when two peppers grew together near their bases.");
        }
        // Black Pepper
        if (this.pepperType === CaninePepperType.Black) {
            crit = Utils.rand(20) / 10 + 2;
            DisplayText("This black pepper tastes sweet, but has a bit of a tangy aftertaste.");
        }
        // Knotty Pepper
        if (this.pepperType === CaninePepperType.Knotty) {
            crit = Utils.rand(20) / 10 + 2;
            DisplayText("The pepper is a bit tough to eat due to the swollen bulge near the base, but you manage to cram it down and munch on it.  It's extra spicy!");
        }
        // Bulbous Pepper
        if (this.pepperType === CaninePepperType.Bulbous) {
            crit = Utils.rand(20) / 10 + 2;
            DisplayText("You eat the pepper, even the two orb-like growths that have grown out from the base.  It's delicious!");
        }
        return crit;
    }

    private overdoseBadEnd(character: Character, crit: number) {
        if (this.pepperType <= 0 && crit > 1 &&
            character.skin.type === SkinType.FUR &&
            character.torso.neck.head.face.type === FaceType.DOG &&
            character.torso.neck.head.ears.type === EarType.DOG &&
            character.torso.hips.legs.type === LegType.DOG &&
            character.torso.tails.get(0).type === TailType.DOG &&
            Utils.rand(2) === 0 &&
            character.statusAffects.has(StatusAffectType.DogWarning)) {
            if (Utils.rand(2) === 0) {
                DisplayText("\n\nAs you swallow the pepper, you note that the spicy hotness on your tongue seems to be spreading. Your entire body seems to tingle and burn, making you feel far warmer than normal, feverish even. Unable to stand it any longer you tear away your clothes, hoping to cool down a little. Sadly, this does nothing to aid you with your problem. On the bright side, the sudden feeling of vertigo you've developed is more than enough to take your mind off your temperature issues. You fall forward onto your hands and knees, well not really hands and knees to be honest. More like paws and knees. That can't be good, you think for a moment, before the sensation of your bones shifting into a quadrupedal configuration robs you of your concentration. After that, it is only a short time before your form is remade completely into that of a large dog, or perhaps a wolf. The distinction would mean little to you now, even if you were capable of comprehending it. ");
                if (character.perks.has(PerkType.MarblesMilk))
                    DisplayText("All you know is that there is a scent on the wind, it is time to hunt, and at the end of the day you need to come home for your milk.");
                else
                    DisplayText("All you know is that there is a scent on the wind, and it is time to hunt.");
            }
            else DisplayText("\n\nYou devour the sweet pepper, carefully licking your fingers for all the succulent juices of the fruit, and are about to go on your way when suddenly a tightness begins to build in your chest and stomach, horrid cramps working their way first through your chest, then slowly flowing out to your extremities, the feeling soon joined by horrible, blood-curdling cracks as your bones begin to reform, twisting and shifting, your mind exploding with pain. You fall to the ground, reaching one hand forward. No... A paw, you realize in horror, as you try to push yourself back up. You watch in horror, looking down your foreleg as thicker fur erupts from your skin, a " + character.torso.neck.head.hair.color + " coat slowly creeping from your bare flesh to cover your body. Suddenly, you feel yourself slipping away, as if into a dream, your mind warping and twisting, your body finally settling into its new form. With one last crack of bone you let out a yelp, kicking free of the cloth that binds you, wresting yourself from its grasp and fleeing into the now setting sun, eager to find prey to dine on tonight.");
            Game.gameOver();
            return;
        }
    }

    private doublePepperTF(character: Character) {
        // If already doubled up, GROWTH
        if (character.torso.cocks.filterType(CockType.DOG).length >= 2) {
            this.pepperType = 1;
        }
        // If character doesnt have 2 dogdicks
        else {
            // If character has NO dogdicks
            if (character.torso.cocks.filterType(CockType.DOG).length === 0) {
                // Dickless - grow two dogpeckers
                if (character.torso.cocks.count === 0) {
                    character.torso.cocks.add(new Cock(7 + Utils.rand(7), 1.5 + Utils.rand(10) / 10));
                    character.torso.cocks.add(new Cock(7 + Utils.rand(7), 1.5 + Utils.rand(10) / 10));
                    DisplayText("\n\nA painful lump forms on your groin, nearly doubling you over as it presses against your " + character.inventory.equipment.armor.displayName + ".  You rip open your gear and watch, horrified as the discolored skin splits apart, revealing a pair of red-tipped points.  A feeling of relief, and surprising lust grows as they push forward, glistening red and thickening.  The skin bunches up into an animal-like sheath, while a pair of fat bulges pop free.  You now have two nice thick dog-cocks, with decent sized knots.  Both pulse and dribble animal-pre, arousing you in spite of your attempts at self-control.");
                    character.torso.cocks.get(0).knotMultiplier = 1.7;
                    character.torso.cocks.get(0).type = CockType.DOG;
                    character.torso.cocks.get(1).knotMultiplier = 1.7;
                    character.torso.cocks.get(1).type = CockType.DOG;
                    character.stats.lust += 50;
                }
                // 1 dick - grow 1 and convert 1
                else if (character.torso.cocks.count === 1) {
                    DisplayText("\n\nYour " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + " vibrates, the veins clearly visible as it reddens and distorts.  The head narrows into a pointed tip while a gradually widening bulge forms around the base.  Where it meets your crotch, the skin bunches up around it, forming a canine-like sheath.  ");
                    character.torso.cocks.get(0).type = CockType.DOG;
                    character.torso.cocks.get(0).knotMultiplier = 1.5;
                    DisplayText("You feel something slippery wiggling inside the new sheath, and another red point peeks out.  In spite of yourself, you start getting turned on by the change, and the new dick slowly slides free, eventually stopping once the thick knot pops free.  The pair of dog-dicks hang there, leaking pre-cum and arousing you far beyond normal.");
                    character.torso.cocks.add(new Cock(7 + Utils.rand(7), 1.5 + Utils.rand(10) / 10));
                    character.torso.cocks.get(1).knotMultiplier = 1.7;
                    character.torso.cocks.get(1).type = CockType.DOG;
                    character.stats.lib += 2;
                    character.stats.lust += 50;
                }
                // 2 dicks+ - convert first 2 to doggie-dom
                else {
                    DisplayText("\n\nYour crotch twitches, and you pull open your " + character.inventory.equipment.armor.displayName + " to get a better look.  You watch in horror and arousal as your " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + " and " + CockDescriptor.describeCock(character, character.torso.cocks.get(1)) + " both warp and twist, becoming red and pointed, growing thick bulges near the base.  When it stops you have two dog-cocks and an animal-like sheath.  The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed.");
                    character.torso.cocks.get(0).type = CockType.DOG;
                    character.torso.cocks.get(1).type = CockType.DOG;
                    character.torso.cocks.get(0).knotMultiplier = 1.4;
                    character.torso.cocks.get(1).knotMultiplier = 1.4;
                    character.stats.lib += 2;
                    character.stats.lust += 50;
                }
            }
            // If character has 1 dogdicks
            else {
                // if character has 1 total
                if (character.torso.cocks.count === 1) {
                    DisplayText("\n\nYou feel something slippery wiggling inside your sheath, and another red point peeks out.  In spite of yourself, you start getting turned on by the change, and the new dick slowly slides free, eventually stopping once the thick knot pops free.  The pair of dog-dicks hang there, leaking pre-cum and arousing you far beyond normal.");
                    character.torso.cocks.add(new Cock(7 + Utils.rand(7), 1.5 + Utils.rand(10) / 10));
                    character.torso.cocks.get(1).type = CockType.DOG;
                    character.torso.cocks.get(1).knotMultiplier = 1.4;
                    character.stats.lib += 2;
                    character.stats.lust += 50;
                }
                // if character has more
                if (character.torso.cocks.count >= 1) {
                    // if first dick is already doggi'ed
                    if (character.torso.cocks.get(0).type === CockType.DOG) {
                        DisplayText("\n\nYour crotch twitches, and you pull open your " + character.inventory.equipment.armor.displayName + " to get a better look.  You watch in horror and arousal as your " + CockDescriptor.describeCock(character, character.torso.cocks.get(1)) + " warps and twists, becoming red and pointed, just like other dog-dick, growing thick bulges near the base.  When it stops you have two dog-cocks and an animal-like sheath.  The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed.");
                        character.torso.cocks.get(1).type = CockType.DOG;
                        character.torso.cocks.get(1).knotMultiplier = 1.4;
                    }
                    // first dick is not dog
                    else {
                        DisplayText("\n\nYour crotch twitches, and you pull open your " + character.inventory.equipment.armor.displayName + " to get a better look.  You watch in horror and arousal as your " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + " warps and twists, becoming red and pointed, just like other dog-dick, growing thick bulges near the base.  When it stops you have two dog-cocks and an animal-like sheath.  The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed.");
                        character.torso.cocks.get(0).type = CockType.DOG;
                        character.torso.cocks.get(0).knotMultiplier = 1.4;
                    }
                    character.stats.lib += 2;
                    character.stats.lust += 50;
                }
            }
        }
        character.updateGender();
    }

    private knottyPepperTF(character: Character, crit: number) {
        const cocks = character.torso.cocks;
        // Cocks only!
        if (cocks.count > 0) {
            // biggify knots
            if (cocks.filterType(CockType.DOG).length > 0) {
                const smallestKnottedDogCock = character.torso.cocks.filterType(CockType.DOG).sort(Cock.SmallestKnot)[0];

                let knotGrowth: number = (Utils.rand(2) + 5) / 20 * crit;
                if (smallestKnottedDogCock.knotMultiplier >= 1.5) knotGrowth /= 2;
                if (smallestKnottedDogCock.knotMultiplier >= 1.75) knotGrowth /= 2;
                if (smallestKnottedDogCock.knotMultiplier >= 2) knotGrowth /= 5;
                smallestKnottedDogCock.knotMultiplier += (knotGrowth);

                DisplayText("\n\n");
                if (knotGrowth < .06)
                    DisplayText("Your " + CockDescriptor.nounCock(CockType.DOG) + " feels unusually tight in your sheath as your knot grows.");
                if (knotGrowth >= .06 && knotGrowth <= .12)
                    DisplayText("Your " + CockDescriptor.nounCock(CockType.DOG) + " pops free of your sheath, thickening nicely into a bigger knot.");
                if (knotGrowth > .12)
                    DisplayText("Your " + CockDescriptor.nounCock(CockType.DOG) + " surges free of your sheath, swelling thicker with each passing second.  Your knot bulges out at the base, growing far beyond normal.");
                character.stats.sens += 0.5;
                character.stats.lust += 5 * crit;
            }
            // Grow dogdick with big knot
            else {
                DisplayText("\n\nYour " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + " twitches, reshaping itself.  The crown tapers down to a point while the base begins swelling.  It isn't painful in the slightest, actually kind of pleasant.  Your dog-like knot slowly fills up like a balloon, eventually stopping when it's nearly twice as thick as the rest.  You touch and shiver with pleasure, oozing pre-cum.");
                cocks.get(0).type = CockType.DOG;
                cocks.get(0).knotMultiplier = 2.1;
            }
        }
        // You wasted knot pepper!
        else
            DisplayText("\n\nA slight wave of nausea passes through you.  It seems this pepper does not quite agree with your body.");
    }

    private bulbousPepperTF(character: Character) {
        if (character.torso.balls.quantity <= 1) {
            DisplayText("\n\nA spike of pain doubles you up, nearly making you vomit.  You stay like that, nearly crying, as a palpable sense of relief suddenly washes over you.  You look down and realize you now have a small sack, complete with two relatively small balls.");
            character.torso.balls.quantity = 2;
            character.torso.balls.size = 1;
            character.stats.lib += 2;
            character.stats.lust -= 10;
        }
        else {
            // Makes your balls biggah!
            character.torso.balls.size++;
            // They grow slower as they get bigger...
            if (character.torso.balls.size > 10) character.torso.balls.size -= .5;
            // Texts
            if (character.torso.balls.size <= 2)
                DisplayText("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + BallsDescriptor.describeBalls(false, true, character) + " have grown larger than a human's.");
            if (character.torso.balls.size > 2)
                DisplayText("\n\nA sudden onset of heat envelops your groin, focusing on your " + BallsDescriptor.describeSack(character) + ".  Walking becomes difficult as you discover your " + BallsDescriptor.describeBalls(false, true, character) + " have enlarged again.");
            character.stats.lib += 1;
            character.stats.lust -= 3;
        }
    }

    public use(character: Character) {
        let crit: number = 1;
        const chest = character.torso.chest;
        const vaginas = character.torso.vaginas;
        const cocks = character.torso.cocks;
        // Set up changes and changeLimit
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(2) === 0) changeLimit++;
        if (character.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        // Initial outputs & crit level
        DisplayText().clear();
        crit = this.eatPepperDesc(character);

        // OVERDOSE Bad End!
        this.overdoseBadEnd(character, crit);
        // WARNING, overdose VERY close!
        if (this.pepperType <= 0 && character.skin.type === SkinType.FUR && character.torso.neck.head.face.type === FaceType.DOG && character.torso.tails.filterType(TailType.DOG).length >= 1 && character.torso.neck.head.ears.type === EarType.DOG && character.torso.hips.legs.type === LegType.DOG && character.statusAffects.has(StatusAffectType.DogWarning) && Utils.rand(3) === 0) {
            DisplayText("<b>\n\nEating the pepper, you realize how dog-like you've become, and you wonder what else the peppers could change...</b>");
        }
        // WARNING, overdose is close!
        if (this.pepperType <= 0 && character.skin.type === SkinType.FUR && character.torso.neck.head.face.type === FaceType.DOG && character.torso.tails.filterType(TailType.DOG).length >= 1 && character.torso.neck.head.ears.type === EarType.DOG && character.torso.hips.legs.type === LegType.DOG && !character.statusAffects.has(StatusAffectType.DogWarning)) {
            character.statusAffects.set(StatusAffectType.DogWarning, StatusAffectFactory.create(StatusAffectType.DogWarning, 0, 0, 0, 0));
            DisplayText("<b>\n\nEating the pepper, you realize how dog-like you've become, and you wonder what else the peppers could change...</b>");
        }
        if (this.pepperType === 3) {
            character.stats.lib += 2 + Utils.rand(4);
            character.stats.lust += 5 + Utils.rand(5);
            character.stats.cor += 2 + Utils.rand(4);
            DisplayText("\n\nYou feel yourself relaxing as gentle warmth spreads through your body.  Honestly you don't think you'd mind running into a demon or monster right now, they'd make for good entertainment.");
            if (character.stats.cor < 50) DisplayText("  You shake your head, blushing hotly.  Where did that thought come from?");
        }
        if (character.stats.str < 50 && Utils.rand(3) === 0) {
            character.stats.str += crit;
            if (crit > 1) DisplayText("\n\nYour muscles ripple and grow, bulging outwards.");
            else DisplayText("\n\nYour muscles feel more toned.");
            changes++;
        }
        if (character.stats.spe < 30 && Utils.rand(3) === 0 && changes < changeLimit) {
            character.stats.spe += crit;
            if (crit > 1) DisplayText("\n\nYou find your muscles responding quicker, faster, and you feel an odd desire to go for a walk.");
            else DisplayText("\n\nYou feel quicker.");
            changes++;
        }
        if (character.stats.int > 30 && Utils.rand(3) === 0 && changes < changeLimit && this.pepperType !== 3) {
            crit += -1 * crit;
            DisplayText("\n\nYou feel ");
            if (crit > 1) DisplayText("MUCH ");
            DisplayText("dumber.");
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
        // -Remove feathery hair (copy for equinum, canine peppers, Labova)
        if (changes < changeLimit && character.torso.neck.head.hair.type === 1 && Utils.rand(4) === 0) {
            // (long):
            if (character.torso.neck.head.hair.length >= 6) DisplayText("\n\nA lock of your downy-soft feather-hair droops over your eye.  Before you can blow the offending down away, you realize the feather is collapsing in on itself.  It continues to curl inward until all that remains is a normal stUtils.Utils.rand of hair.  <b>Your hair is no longer feathery!</b>");
            // (short)
            else DisplayText("\n\nYou run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested.  While your hand is up there, it detects a change in the texture of your feathers.  They're completely disappearing, merging down into stUtils.Utils.rands of regular hair.  <b>Your hair is no longer feathery!</b>");
            changes++;
            character.torso.neck.head.hair.type = 0;
        }
        // if(this.type != 2 && this.type != 4 && this.type != 5) DisplayText("\n");
        // Double Pepper!
        // Xforms/grows dicks to make you have two dogcocks
        if (this.pepperType === CaninePepperType.Double) {
            this.doublePepperTF(character);
        }
        // Knotty knot pepper!
        if (this.pepperType === CaninePepperType.Knotty) {
            this.knottyPepperTF(character, crit);
        }
        // GROW BALLS
        if (this.pepperType === CaninePepperType.Bulbous) {
            this.bulbousPepperTF(character);
        }
        // Sexual Stuff Now
        // ------------------
        // Man-Parts
        // 3 Changes,
        // 1. Cock Xform
        // 2. Knot Size++
        // 3. cumMultiplier++ (to max of 1.5)
        if (cocks.count > 0) {
            // Grow knot on smallest knotted dog cock
            if (this.pepperType !== CaninePepperType.Knotty &&
                cocks.filterType(CockType.DOG).length > 0 &&
                ((changes < changeLimit && Utils.rand(1.4) === 0) || this.pepperType === CaninePepperType.Oversized)) {

                const smallestKnottedDogCock = character.torso.cocks.filterType(CockType.DOG).sort(Cock.SmallestKnot)[0];
                // Have smallest knotted cock selected.
                let growth: number = (Utils.rand(2) + 1) / 20 * crit;
                if (smallestKnottedDogCock.knotMultiplier >= 1.5) growth /= 2;
                if (smallestKnottedDogCock.knotMultiplier >= 1.75) growth /= 2;
                if (smallestKnottedDogCock.knotMultiplier >= 2) growth /= 5;
                smallestKnottedDogCock.knotMultiplier += (growth);
                if (growth < .06) DisplayText("\n\nYour " + CockDescriptor.describeCock(character, smallestKnottedDogCock) + " feels unusually tight in your sheath as your knot grows.");
                if (growth >= .06 && growth <= .12) DisplayText("\n\nYour " + CockDescriptor.describeCock(character, smallestKnottedDogCock) + " pops free of your sheath, thickening nicely into a bigger knot.");
                if (growth > .12) DisplayText("\n\nYour " + CockDescriptor.describeCock(character, smallestKnottedDogCock) + " surges free of your sheath, swelling thicker with each passing second.  Your knot bulges out at the base, growing far beyond normal.");
                character.stats.sens += 0.5;
                character.stats.lust += 5 * crit;
                changes++;
            }
            // Cock Xform if character has free cocks.
            if (cocks.filterType(CockType.DOG).length < cocks.count &&
                ((changes < changeLimit && Utils.rand(1.6)) || this.pepperType === CaninePepperType.Oversized) === 0) {
                // Select first not dog cock
                let firstNotDogCock: Cock = null;
                for (let index = 0; index < cocks.count; index++)
                    if (cocks.get(index).type !== CockType.DOG)
                        firstNotDogCock = cocks.get(index);

                // Talk about it
                // Hooooman
                if (firstNotDogCock.type === CockType.HUMAN) {
                    DisplayText("\n\nYour " + CockDescriptor.describeCock(character, firstNotDogCock) + " clenches painfully, becoming achingly, throbbingly erect.  A tightness seems to squeeze around the base, and you wince as you see your skin and flesh shifting forwards into a canine-looking sheath.  You shudder as the crown of your " + CockDescriptor.describeCock(character, firstNotDogCock) + " reshapes into a point, the sensations nearly too much for you.  You throw back your head as the transformation completes, your " + CockDescriptor.nounCock(firstNotDogCock.type) + " much thicker than it ever was before.  <b>You now have a dog-cock.</b>");
                    character.stats.sens += 10;
                    character.stats.lust += 5 * crit;
                }
                // Horse
                else if (firstNotDogCock.type === CockType.HORSE) {
                    DisplayText("\n\nYour " + CockDescriptor.nounCock(firstNotDogCock.type) + " shrinks, the extra equine length seeming to shift into girth.  The flared tip vanishes into a more pointed form, a thick knotted bulge forming just above your sheath.  <b>You now have a dog-cock.</b>");
                    // Tweak length/thickness.
                    if (firstNotDogCock.length > 6)
                        firstNotDogCock.length -= 2;
                    else
                        firstNotDogCock.length -= .5;
                    firstNotDogCock.thickness += .5;

                    character.stats.sens += 4;
                    character.stats.lust += 5 * crit;
                }
                // Tentacular Tuesday!
                else if (firstNotDogCock.type === CockType.TENTACLE) {
                    DisplayText("\n\nYour " + CockDescriptor.describeCock(character, firstNotDogCock) + " coils in on itself, reshaping and losing its plant-like coloration as it thickens near the base, bulging out in a very canine-looking knot.  Your skin bunches painfully around the base, forming into a sheath.  <b>You now have a dog-cock.</b>");
                    character.stats.sens += 4;
                    character.stats.lust += 5 * crit;
                }
                // Demon
                else if (firstNotDogCock.type === CockType.DEMON) {
                    DisplayText("\n\nYour " + CockDescriptor.describeCock(character, firstNotDogCock) + " color shifts red for a moment and begins to swell at the base, but within moments it smooths out, retaining its distinctive demonic shape, only perhaps a bit thicker.");
                    character.stats.sens += 1;
                    character.stats.lust += 2 * crit;
                }
                // Misc
                else {
                    DisplayText("\n\nYour " + CockDescriptor.describeCock(character, firstNotDogCock) + " trembles, reshaping itself into a shiny red doggie-dick with a fat knot at the base.  <b>You now have a dog-cock.</b>");
                    character.stats.sens += 4;
                    character.stats.lust += 5 * crit;
                }
                // Xform it!
                if (firstNotDogCock.type !== CockType.DEMON)
                    firstNotDogCock.type = CockType.DOG;
                firstNotDogCock.knotMultiplier = 1.1;
                CockModifier.thickenCock(firstNotDogCock, 2);

                changes++;

            }
            // Cum Multiplier Xform
            if (character.cumMultiplier < 2 && Utils.rand(2) === 0 && changes < changeLimit) {
                let cumMultiplierIncrease = 1.5;
                // Lots of cum raises cum multiplier cap to 2 instead of 1.5
                if (character.perks.has(PerkType.MessyOrgasms))
                    cumMultiplierIncrease = 2;
                if (cumMultiplierIncrease < character.cumMultiplier + .05 * crit) {
                    changes--;
                }
                else {
                    character.cumMultiplier += .05 * crit;
                    // Flavor text
                    if (character.torso.balls.quantity === 0)
                        DisplayText("\n\nYou feel a churning inside your gut as something inside you changes.");
                    if (character.torso.balls.quantity > 0)
                        DisplayText("\n\nYou feel a churning in your " + BallsDescriptor.describeBallsShort(character) + ".  It quickly settles, leaving them feeling somewhat more dense.");
                    if (crit > 1)
                        DisplayText("  A bit of milky pre dribbles from your " + CockDescriptor.describeMultiCockShort(character) + ", pushed out by the change.");
                }
                changes++;
            }
            // Oversized pepper
            if (this.pepperType === CaninePepperType.Oversized) {
                const shortestCock: Cock = cocks.sort(Cock.ShortestCocks)[0];
                const cockGrowthAmount: number = CockModifier.growCock(character, shortestCock, Utils.rand(4) + 3);
                character.stats.sens += 1;
                character.stats.lust += 10;

                if (cocks.count >= 1 && shortestCock.thickness <= 2)
                    CockModifier.thickenCock(shortestCock, 1);

                if (cockGrowthAmount > 2)
                    DisplayText("\n\nYour " + CockDescriptor.describeCock(character, shortestCock) + " tightens painfully, inches of bulging dick-flesh pouring out from your crotch as it grows longer.  Thick pre forms at the pointed tip, drawn out from the pleasure of the change.");
                if (cockGrowthAmount > 1 && cockGrowthAmount <= 2)
                    DisplayText("\n\nAching pressure builds within your crotch, suddenly releasing as an inch or more of extra dick-flesh spills out.  A dollop of pre beads on the head of your enlarged " + CockDescriptor.describeCock(character, shortestCock) + " from the pleasure of the growth.");
                if (cockGrowthAmount <= 1)
                    DisplayText("\n\nA slight pressure builds and releases as your " + CockDescriptor.describeCock(character, shortestCock) + " pushes a bit further out of your crotch.");
            }
        }
        // Female Stuff
        // Multiboobages
        if (chest.count > 0) {
            // if bigger than A cup
            if (chest.get(0).rating > 0 && character.torso.vaginas.count > 0) {
                // Doggies only get 3 rows of tits! FENOXO HAS SPOKEN
                if (chest.count < 3 && Utils.rand(2) === 0 && changes < changeLimit) {
                    const newBreastRow = new BreastRow();
                    chest.add(newBreastRow);
                    // Breasts are too small to grow a new row, so they get bigger first
                    // But ONLY if character has a vagina (dont want dudes weirded out)
                    if (vaginas.count > 0 && chest.get(0).rating <= chest.count) {
                        DisplayText("\n\nYour " + BreastDescriptor.describeBreastRow(chest.get(0)) + " feel constrained and painful against your top as they grow larger by the moment, finally stopping as they reach ");
                        chest.get(0).rating += 2;
                        DisplayText(BreastDescriptor.breastCup(chest.get(0).rating) + " size.  But it doesn't stop there, you feel a tightness beginning lower on your torso...");
                        changes++;
                    }
                    // Had 1 row to start
                    if (chest.count === 2) {
                        // 1 size below primary breast row!
                        newBreastRow.rating = chest.get(0).rating - 1;
                        if (chest.get(0).rating - 1 === 0)
                            DisplayText("\n\nA second set of breasts forms under your current pair, stopping while they are still fairly flat and masculine looking.");
                        else
                            DisplayText("\n\nA second set of breasts bulges forth under your current pair, stopping as they reach " + BreastDescriptor.breastCup(newBreastRow.rating) + "s.");
                        DisplayText("  A sensitive nub grows on the summit of each new tit, becoming a new nipple.");
                        character.stats.sens += 6;
                        character.stats.lust += 5;
                        changes++;
                    }
                    // Many breast Rows - requires larger primary tits...
                    if (chest.count > 2 && chest.get(0).rating > chest.count) {
                        character.stats.sens += 6;
                        character.stats.lust += 5;
                        // New row's size = the size of the row above -1
                        const rowAboveNewBreastRow: BreastRow = chest.get(chest.count - 2);
                        newBreastRow.rating = rowAboveNewBreastRow.rating - 1;
                        // If second row are super small but primary row is huge it could go negative.
                        // This corrects that problem.
                        if (newBreastRow.rating < 0)
                            newBreastRow.rating = 0;
                        if (rowAboveNewBreastRow.rating < 0)
                            rowAboveNewBreastRow.rating = 0;
                        if (newBreastRow.rating === 0)
                            DisplayText("\n\nYour abdomen tingles and twitches as a new row of breasts sprouts below the others.  Your new breasts stay flat and masculine, not growing any larger.");
                        else
                            DisplayText("\n\nYour abdomen tingles and twitches as a new row of " + BreastDescriptor.breastCup(newBreastRow.rating) + " " + BreastDescriptor.describeBreastRow(newBreastRow) + " sprouts below your others.");
                        DisplayText("  A sensitive nub grows on the summit of each new tit, becoming a new nipple.");
                        changes++;
                    }
                    // Extra sensitive if crit
                    if (crit > 1) {
                        if (crit > 2) {
                            DisplayText("  You heft your new chest experimentally, exploring the new flesh with tender touches.  Your eyes nearly roll back in your head from the intense feelings.");
                            character.stats.sens += 6;
                            character.stats.lust += 15;
                        }
                        else {
                            DisplayText("  You touch your new nipples with a mixture of awe and desire, the experience arousing beyond measure.  You squeal in delight, nearly orgasming, but in time finding the willpower to stop yourself.");
                            character.stats.sens += 3;
                            character.stats.lust += 10;
                        }
                    }

                }
                // If already has max doggie breasts!
                else if (Utils.rand(2) === 0) {
                    // Check for size mismatches, and move closer to spec!
                    const chestCount: number = chest.count;
                    let uneven: boolean = false;
                    // Check each row, and if the row above or below it is
                    for (let index: number = chest.count - 1; index > 0; index--) {
                        if (chest.get(index).rating + 1 < chest.get(index - 1).rating) {
                            if (!uneven) {
                                uneven = true;
                                DisplayText("\n");
                            }
                            DisplayText("\nYour ");
                            if (index === 0) DisplayText("first ");
                            if (index === 1) DisplayText("second ");
                            if (index === 2) DisplayText("third ");
                            if (index === 3) DisplayText("fourth ");
                            if (index === 4) DisplayText("fifth ");
                            if (index > 4) DisplayText("");
                            DisplayText("row of " + BreastDescriptor.describeBreastRow(chest.get(index)) + " grows larger, as if jealous of the jiggling flesh above.");
                            let growthDiff: number = chest.get(index - 1).rating - chest.get(index).rating - 1;
                            if (growthDiff > 5) growthDiff = 5;
                            if (growthDiff < 1) growthDiff = 1;
                            chest.get(index).rating += growthDiff;
                        }
                    }
                }
            }
        }
        // Grow tits if have NO breasts/nipples AT ALL
        else if (Utils.rand(2) === 0 && changes < changeLimit) {
            DisplayText("\n\nYour chest tingles uncomfortably as your center of balance shifts.  <b>You now have a pair of B-cup breasts.</b>");
            DisplayText("  A sensitive nub grows on the summit of each tit, becoming a new nipple.");

            const newBreastRow: BreastRow = new BreastRow();
            newBreastRow.rating = 2;
            chest.add(newBreastRow);

            character.stats.sens += 4;
            character.stats.lust += 6;
            changes++;
        }
        // Go into heat
        if (Utils.rand(2) === 0 && changes < changeLimit) {
            if (BodyModifier.displayGoIntoHeat(character)) {
                changes++;
            }
        }
        if (changes < changeLimit && RaceScore.dogScore(character) >= 3 && Utils.rand(4) === 0) {
            changes++;
            DisplayText("\n\n");
            DisplayText("Images and thoughts come unbidden to your mind, overwhelming your control as you rapidly lose yourself in them, daydreaming of... ");
            // cawk fantasies
            if (character.gender <= 1 || (character.gender === 3 && Utils.rand(2) === 0)) {
                DisplayText("bounding through the woods, hunting with your master.  Feeling the wind in your fur and the thrill of the hunt coursing through your veins intoxicates you.  You have your nose to the ground, tracking your quarry as you run, until a heavenly scent stops you in your tracks.");
                character.stats.lust += 5 + character.stats.lib / 20;
                // break1
                if (character.stats.cor < 33 || cocks.count === 0)
                    DisplayText("\nYou shake your head to clear the unwanted fantasy from your mind, repulsed by it.");
                else {
                    DisplayText("  Heart pounding, your shaft pops free of its sheath on instinct, as you take off after the new scent.  Caught firmly in the grip of a female's heat, you ignore your master's cry as you disappear into the wild, " + CockDescriptor.nounCock(CockType.DOG) + " growing harder as you near your quarry.  You burst through a bush, spotting a white-furred female.  She drops, exposing her dripping fem-sex to you, the musky scent of her sex channeling straight through your nose and sliding into your " + CockDescriptor.nounCock(CockType.DOG) + ".");
                    character.stats.lust += 5 + character.stats.lib / 20;
                    // Break 2
                    if (character.stats.cor < 66)
                        DisplayText("\nYou blink a few times, the fantasy fading as you master yourself.  That daydream was so strange, yet so hot.");
                    else {
                        DisplayText("  Unable to wait any longer, you mount her, pressing your bulging knot against her vulva as she yips in pleasure. The heat of her sex is unreal, the tight passage gripping you like a vice as you jackhammer against her, biting her neck gently in spite of the violent pounding.");
                        character.stats.lust += 5 + character.stats.lib / 20;
                        // break3
                        if (character.stats.cor < 80) {
                            if (character.torso.vaginas.count > 0)
                                DisplayText("\nYou reluctantly pry your hand from your aching " + VaginaDescriptor.describeVagina(character, vaginas.get(0)) + " as you drag yourself out of your fantasy.");
                            else DisplayText("\nYou reluctantly pry your hand from your aching " + CockDescriptor.describeCock(character, character.torso.cocks.get(0)) + " as you drag yourself out of your fantasy.");
                        }
                        else {
                            DisplayText("  At last your knot pops into her juicy snatch, splattering her groin with a smattering of her arousal.  The scents of your mating reach a peak as the velvet vice around your " + CockDescriptor.nounCock(CockType.DOG) + " quivers in the most indescribably pleasant way.  You clamp down on her hide as your whole body tenses, unleashing a torrent of cum into her sex.  Each blast is accompanied by a squeeze of her hot passage, milking you of the last of your spooge.  Your " + LegDescriptor.describeLegs(character) + " give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.");
                            character.stats.lust += 5 + character.stats.lib / 20;
                        }
                    }
                }
            }
            // Pure female fantasies
            else if (character.torso.vaginas.count > 0) {
                DisplayText("wagging your dripping " + VaginaDescriptor.describeVagina(character, vaginas.get(0)) + " before a pack of horny wolves, watching their shiny red doggie-pricks practically jump out of their sheaths at your fertile scent.");
                character.stats.lust += 5 + character.stats.lib / 20;
                // BREAK 1
                if (character.stats.cor < 33) {
                    DisplayText("\nYou shake your head to clear the unwanted fantasy from your mind, repulsed by it.");
                }
                else {
                    DisplayText("  In moments they begin their advance, plunging their pointed beast-dicks into you, one after another.  You yip and howl with pleasure as each one takes his turn knotting you.");
                    character.stats.lust += 5 + character.stats.lib / 20;
                    // BREAK 2
                    if (character.stats.cor <= 66) {
                        DisplayText("\nYou blink a few times, the fantasy fading as you master yourself.  That daydream was so strange, yet so hot.");
                    }
                    else {
                        DisplayText("  The feeling of all that hot wolf-spooge spilling from your overfilled snatch and running down your thighs is heavenly, nearly making you orgasm on the spot.  You see the alpha of the pack is hard again, and his impressive member is throbbing with the need to breed you.");
                        character.stats.lust += 5 + character.stats.lib / 20;
                        // break3
                        if (character.stats.cor < 80) {
                            DisplayText("\nYou reluctantly pry your hand from your aching " + VaginaDescriptor.describeVagina(character, vaginas.get(0)) + " as you drag yourself out of your fantasy.");
                        }
                        else {
                            DisplayText("  You growl with discomfort as he pushes into your abused wetness, stretching you tightly, every beat of his heart vibrating through your nethers.  With exquisite force, he buries his knot in you and begins filling you with his potent seed, impregnating you for sure. Your knees give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.");
                            character.stats.lust += 5 + character.stats.lib / 20;
                        }
                    }
                }
            }
            else {
                DisplayText("wagging your [asshole] before a pack of horny wolves, watching their shiny red doggie-pricks practically jump out of their sheaths at you after going so long without a female in the pack.");
                character.stats.lust += 5 + character.stats.lib / 20;
                // BREAK 1
                if (character.stats.cor < 33) {
                    DisplayText("\nYou shake your head to clear the unwanted fantasy from your mind, repulsed by it.");
                }
                else {
                    DisplayText("  In moments they begin their advance, plunging their pointed beast-dicks into you, one after another.  You yip and howl with pleasure as each one takes his turn knotting you.");
                    character.stats.lust += 5 + character.stats.lib / 20;
                    // BREAK 2
                    if (character.stats.cor <= 66) {
                        DisplayText("\nYou blink a few times, the fantasy fading as you master yourself.  That daydream was so strange, yet so hot.");
                    }
                    else {
                        DisplayText("  The feeling of all that hot wolf-spooge spilling from your overfilled ass and running down your thighs is heavenly, nearly making you orgasm on the spot.  You see the alpha of the pack is hard again, and his impressive member is throbbing with the need to spend his lust on you.");
                        character.stats.lust += 5 + character.stats.lib / 20;
                        // break3
                        if (character.stats.cor < 80) {
                            DisplayText("\nYou reluctantly pry your hand from your aching asshole as you drag yourself out of your fantasy.");
                        }
                        else {
                            DisplayText("  You growl with discomfort as he pushes into your abused, wet hole, stretching you tightly, every beat of his heart vibrating through your hindquarters.  With exquisite force, he buries his knot in you and begins filling you with his potent seed, impregnating you for sure. Your knees give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.");
                            character.stats.lust += 5 + character.stats.lib / 20;
                        }
                    }
                }
            }
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
        // Master Furry Appearance Order:
        // Tail -> Ears -> Paws -> Fur -> Face
        // Dog-face requires fur & paws  Should be last morph to take place
        if (Utils.rand(5) === 0 && changes < changeLimit &&
            character.torso.neck.head.face.type !== FaceType.DOG && character.skin.type === SkinType.FUR &&
            character.torso.hips.legs.type === LegType.DOG) {
            if (character.torso.neck.head.face.type === FaceType.HORSE) DisplayText("\n\nYour face is wracked with pain.  You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something else.  <b>Your horse-like features rearrange to take on many canine aspects.</b>");
            else DisplayText("\n\nYour face is wracked with pain.  You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something... different.  You find a puddle to view your reflection...<b>your face is now a cross between human and canine features.</b>");
            character.torso.neck.head.face.type = FaceType.DOG;
            changes++;
        }
        if (this.pepperType === 3 && character.torso.neck.head.hair.color !== "midnight black") {
            if (character.skin.type === SkinType.FUR) DisplayText("<b>\n\nYour fur and hair tingles, growing in thicker than ever as darkness begins to spread from the roots, turning it midnight black.</b>");
            else DisplayText("<b>\n\nYour " + character.skin.desc + " itches like crazy as fur grows out from it, coating your body.  It's incredibly dense and black as the middle of a moonless night.</b>");
            character.skin.type = SkinType.FUR;
            character.skin.adj = "thick";
            character.skin.desc = "fur";
            character.torso.neck.head.hair.color = "midnight black";
        }
        // Become furred - requires paws and tail
        if (Utils.rand(4) === 0 && changes < changeLimit &&
            character.torso.hips.legs.type === LegType.DOG && character.torso.tails.filterType(TailType.DOG).length >= 1 &&
            character.skin.type !== SkinType.FUR) {
            if (character.skin.type === SkinType.PLAIN) DisplayText("\n\nYour skin itches intensely.  You gaze down as more and more hairs break forth from your skin, quickly transforming into a soft coat of fur.  <b>You are now covered in " + character.torso.neck.head.hair.color + " fur from head to toe.</b>");
            if (character.skin.type === SkinType.SCALES) DisplayText("\n\nYour scales itch incessantly.  You scratch, feeling them flake off to reveal a coat of " + character.torso.neck.head.hair.color + " fur growing out from below!  <b>You are now covered in " + character.torso.neck.head.hair.color + " fur from head to toe.</b>");
            character.skin.type = SkinType.FUR;
            character.skin.desc = "fur";
            changes++;
        }
        // Change to paws - requires tail and ears
        if (Utils.rand(3) === 0 && character.torso.hips.legs.type !== LegType.DOG && character.torso.tails.filterType(TailType.DOG).length >= 1 && character.torso.neck.head.ears.type === EarType.DOG && changes < changeLimit) {
            // Feet -> paws
            if (character.torso.hips.legs.type === LegType.HUMAN) DisplayText("\n\nYou scream in agony as you feel the bones in your feet break and begin to rearrange. <b>You now have paws</b>.");
            // Hooves -> Paws
            else if (character.torso.hips.legs.type === LegType.HOOFED) DisplayText("\n\nYou feel your hooves suddenly splinter, growing into five unique digits.  Their flesh softens as your hooves reshape into furred paws.");
            else DisplayText("\n\nYour lower body is wracked by pain!  Once it passes, you discover that you're standing on fur-covered paws!  <b>You now have paws</b>.");
            character.torso.hips.legs.type = LegType.DOG;
            changes++;
        }
        // Change to dog-ears!  Requires dog-tail
        if (Utils.rand(2) === 0 && character.torso.neck.head.ears.type !== EarType.DOG && character.torso.tails.filterType(TailType.DOG).length >= 1 && changes < changeLimit) {
            if (character.torso.neck.head.ears.type === -1) DisplayText("\n\nTwo painful nubs begin sprouting from your head, growing and opening into canine ears.  ");
            if (character.torso.neck.head.ears.type === EarType.HUMAN) DisplayText("\n\nThe skin on the sides of your face stretches painfully as your ears migrate upwards, towards the top of your head.  They shift and elongate, becoming canine in nature.  ");
            if (character.torso.neck.head.ears.type === EarType.HORSE) DisplayText("\n\nYour equine ears twist as they transform into canine versions.  ");
            if (character.torso.neck.head.ears.type > EarType.DOG) DisplayText("\n\nYour ears transform, becoming more canine in appearance.  ");
            character.torso.neck.head.ears.type = EarType.DOG;
            character.torso.neck.head.ears.value = 2;
            DisplayText("<b>You now have dog ears.</b>");
            changes++;
        }
        // Grow tail if not dog-tailed
        if (Utils.rand(3) === 0 && changes < changeLimit && character.torso.tails.get(0).type !== TailType.DOG) {
            if (character.torso.tails.count === 0) DisplayText("\n\nA pressure builds on your backside.  You feel under your clothes and discover an odd bump that seems to be growing larger by the moment.  In seconds it passes between your fingers, bursts out the back of your clothes, and grows most of the way to the ground.  A thick coat of fur springs up to cover your new tail.  ");
            if (character.torso.tails.filterType(TailType.HORSE).length >= 1) DisplayText("\n\nYou feel a tightness in your rump, matched by the tightness with which the strands of your tail clump together.  In seconds they fuse into a single tail, rapidly sprouting thick fur.  ");
            if (character.torso.tails.filterType(TailType.DEMONIC).length >= 1) DisplayText("\n\nThe tip of your tail feels strange.  As you pull it around to check on it, the spaded tip disappears, quickly replaced by a thick coat of fur over the entire surface of your tail.  ");
            // Generic message for now
            if (character.torso.tails.filterType(TailType.COW).length >= 1) DisplayText("\n\nYou feel your backside shift and change, flesh molding and displacing into a long puffy tail!  ");
            changes++;
            character.torso.tails.clear();
            const newTail = new Tail();
            newTail.type = TailType.DOG;
            character.torso.tails.add(newTail);
            DisplayText("<b>You now have a dog-tail.</b>");
        }
        if (Utils.rand(4) === 0 && character.torso.neck.gills && changes < changeLimit) {
            DisplayText("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            character.torso.neck.gills = false;
            changes++;
        }
        if (character.skin.type === SkinType.FUR && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nYou become more... solid.  Sinewy.  A memory comes unbidden from your youth of a grizzled wolf you encountered while hunting, covered in scars, yet still moving with an easy grace.  You imagine that must have felt something like this.");
            character.stats.tou += 4;
            character.stats.sens -= 3;
            changes++;
        }
        // If no changes yay
        if (changes === 0) {
            DisplayText("\n\nInhuman vitality spreads through your body, invigorating you!\n");
            StatModifier.displayCharacterHPChange(character, 20);
            character.stats.lust += 3;
        }
    }
}
