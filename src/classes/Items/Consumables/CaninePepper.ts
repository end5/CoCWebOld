import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import BreastRow from '../../Body/BreastRow';
import Cock, { CockType } from '../../Body/Cock';
import { SkinType } from '../../Body/Creature';
import { EyeType, FaceType } from '../../Body/Face';
import { EarType } from '../../Body/Head';
import { LowerBodyType, TailType } from '../../Body/LowerBody';
import { ArmType } from '../../Body/UpperBody';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import StatusAffectFactory from '../../Effects/StatusAffectFactory';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Game from '../../Game/Game';
import BodyModifier from '../../Modifiers/BodyModifier';
import CockModifier from '../../Modifiers/CockModifier';
import StatModifier from '../../Modifiers/StatModifier';
import Player from '../../Player/Player';
import RaceScore from '../../RaceScore';
import Utils from '../../Utilities/Utils';
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
    //1-Oversized Pepper (+size, thickness)
    //2-Double Pepper (+grows second cock or changes two cocks to dogcocks)
    //3-Black Pepper (Dark Fur, +corruption/libido)
    //4-Knotty Pepper (+Knot + Cum Multiplier)
    //5-Bulbous Pepper (+ball size or fresh balls)
    private type: CaninePepperType;
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
        this.type = pepperType;
    }

    private eatPepperDesc(player: Player): number {
        let crit: number = 1;
        if (this.type == CaninePepperType.Normal) {
            if (Utils.rand(100) < 15) {
                crit = Utils.rand(20) / 10 + 2;
                DisplayText.text("The pepper tastes particularly potent, searingly hot and spicy.");
            }
            else DisplayText.text("The pepper is strangely spicy but very tasty.");
        }
        //Oversized pepper
        if (this.type == CaninePepperType.Oversized) {
            crit = Utils.rand(20) / 10 + 2;
            DisplayText.text("The pepper is so large and thick that you have to eat it in several large bites.  It is not as spicy as the normal ones, but is delicious and flavorful.");
        }
        //Double Pepper
        if (this.type == CaninePepperType.Double) {
            crit = Utils.rand(20) / 10 + 2;
            DisplayText.text("The double-pepper is strange, looking like it was formed when two peppers grew together near their bases.");
        }
        //Black Pepper
        if (this.type == CaninePepperType.Black) {
            crit = Utils.rand(20) / 10 + 2;
            DisplayText.text("This black pepper tastes sweet, but has a bit of a tangy aftertaste.");
        }
        //Knotty Pepper
        if (this.type == CaninePepperType.Knotty) {
            crit = Utils.rand(20) / 10 + 2;
            DisplayText.text("The pepper is a bit tough to eat due to the swollen bulge near the base, but you manage to cram it down and munch on it.  It's extra spicy!");
        }
        //Bulbous Pepper
        if (this.type == CaninePepperType.Bulbous) {
            crit = Utils.rand(20) / 10 + 2;
            DisplayText.text("You eat the pepper, even the two orb-like growths that have grown out from the base.  It's delicious!");
        }
        return crit;
    }

    private overdoseBadEnd(player: Player, crit: number) {
        if (this.type <= 0 && crit > 1 &&
            player.skinType == SkinType.FUR &&
            player.upperBody.head.face.faceType == FaceType.DOG &&
            player.upperBody.head.earType == EarType.DOG &&
            player.lowerBody.type == LowerBodyType.DOG &&
            player.lowerBody.tailType == TailType.DOG &&
            Utils.rand(2) == 0 &&
            player.statusAffects.has(StatusAffectType.DogWarning)) {
            if (Utils.rand(2) == 0) {
                DisplayText.text("\n\nAs you swallow the pepper, you note that the spicy hotness on your tongue seems to be spreading. Your entire body seems to tingle and burn, making you feel far warmer than normal, feverish even. Unable to stand it any longer you tear away your clothes, hoping to cool down a little. Sadly, this does nothing to aid you with your problem. On the bright side, the sudden feeling of vertigo you've developed is more than enough to take your mind off your temperature issues. You fall forward onto your hands and knees, well not really hands and knees to be honest. More like paws and knees. That can't be good, you think for a moment, before the sensation of your bones shifting into a quadrupedal configuration robs you of your concentration. After that, it is only a short time before your form is remade completely into that of a large dog, or perhaps a wolf. The distinction would mean little to you now, even if you were capable of comprehending it. ");
                if (player.perks.has(PerkType.MarblesMilk))
                    DisplayText.text("All you know is that there is a scent on the wind, it is time to hunt, and at the end of the day you need to come home for your milk.");
                else
                    DisplayText.text("All you know is that there is a scent on the wind, and it is time to hunt.");
            }
            else DisplayText.text("\n\nYou devour the sweet pepper, carefully licking your fingers for all the succulent juices of the fruit, and are about to go on your way when suddenly a tightness begins to build in your chest and stomach, horrid cramps working their way first through your chest, then slowly flowing out to your extremities, the feeling soon joined by horrible, blood-curdling cracks as your bones begin to reform, twisting and shifting, your mind exploding with pain. You fall to the ground, reaching one hand forward. No... A paw, you realize in horror, as you try to push yourself back up. You watch in horror, looking down your foreleg as thicker fur erupts from your skin, a " + player.upperBody.head.hairColor + " coat slowly creeping from your bare flesh to cover your body. Suddenly, you feel yourself slipping away, as if into a dream, your mind warping and twisting, your body finally settling into its new form. With one last crack of bone you let out a yelp, kicking free of the cloth that binds you, wresting yourself from its grasp and fleeing into the now setting sun, eager to find prey to dine on tonight.");
            Game.gameOver();
            return;
        }
    }

    private doublePepperTF(player: Player) {
        let cockSpot = player.lowerBody.cockSpot;
        //If already doubled up, GROWTH
        if (player.lowerBody.cockSpot.countType(CockType.DOG) >= 2) {
            this.type = 1;
        }
        //If player doesnt have 2 dogdicks
        else {
            //If player has NO dogdicks
            if (player.lowerBody.cockSpot.countType(CockType.DOG) == 0) {
                //Dickless - grow two dogpeckers
                if (player.lowerBody.cockSpot.count() == 0) {
                    player.lowerBody.cockSpot.add(new Cock(7 + Utils.rand(7), 1.5 + Utils.rand(10) / 10));
                    player.lowerBody.cockSpot.add(new Cock(7 + Utils.rand(7), 1.5 + Utils.rand(10) / 10));
                    DisplayText.text("\n\nA painful lump forms on your groin, nearly doubling you over as it presses against your " + player.inventory.armorSlot.equipment.displayName + ".  You rip open your gear and watch, horrified as the discolored skin splits apart, revealing a pair of red-tipped points.  A feeling of relief, and surprising lust grows as they push forward, glistening red and thickening.  The skin bunches up into an animal-like sheath, while a pair of fat bulges pop free.  You now have two nice thick dog-cocks, with decent sized knots.  Both pulse and dribble animal-pre, arousing you in spite of your attempts at self-control.");
                    player.lowerBody.cockSpot.get(0).knotMultiplier = 1.7;
                    player.lowerBody.cockSpot.get(0).cockType = CockType.DOG;
                    player.lowerBody.cockSpot.get(1).knotMultiplier = 1.7;
                    player.lowerBody.cockSpot.get(1).cockType = CockType.DOG;
                    player.stats.lust += 50;
                }
                //1 dick - grow 1 and convert 1
                else if (player.lowerBody.cockSpot.count() == 1) {
                    DisplayText.text("\n\nYour " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + " vibrates, the veins clearly visible as it reddens and distorts.  The head narrows into a pointed tip while a gradually widening bulge forms around the base.  Where it meets your crotch, the skin bunches up around it, forming a canine-like sheath.  ");
                    player.lowerBody.cockSpot.get(0).cockType = CockType.DOG;
                    player.lowerBody.cockSpot.get(0).knotMultiplier = 1.5;
                    DisplayText.text("You feel something slippery wiggling inside the new sheath, and another red point peeks out.  In spite of yourself, you start getting turned on by the change, and the new dick slowly slides free, eventually stopping once the thick knot pops free.  The pair of dog-dicks hang there, leaking pre-cum and arousing you far beyond normal.");
                    player.lowerBody.cockSpot.add(new Cock(7 + Utils.rand(7), 1.5 + Utils.rand(10) / 10));
                    player.lowerBody.cockSpot.get(1).knotMultiplier = 1.7;
                    player.lowerBody.cockSpot.get(1).cockType = CockType.DOG;
                    player.stats.lib += 2;
                    player.stats.lust += 50;
                }
                //2 dicks+ - convert first 2 to doggie-dom
                else {
                    DisplayText.text("\n\nYour crotch twitches, and you pull open your " + player.inventory.armorSlot.equipment.displayName + " to get a better look.  You watch in horror and arousal as your " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + " and " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(1)) + " both warp and twist, becoming red and pointed, growing thick bulges near the base.  When it stops you have two dog-cocks and an animal-like sheath.  The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed.");
                    player.lowerBody.cockSpot.get(0).cockType = CockType.DOG;
                    player.lowerBody.cockSpot.get(1).cockType = CockType.DOG;
                    player.lowerBody.cockSpot.get(0).knotMultiplier = 1.4;
                    player.lowerBody.cockSpot.get(1).knotMultiplier = 1.4;
                    player.stats.lib += 2;
                    player.stats.lust += 50;
                }
            }
            //If player has 1 dogdicks
            else {
                //if player has 1 total
                if (player.lowerBody.cockSpot.count() == 1) {
                    DisplayText.text("\n\nYou feel something slippery wiggling inside your sheath, and another red point peeks out.  In spite of yourself, you start getting turned on by the change, and the new dick slowly slides free, eventually stopping once the thick knot pops free.  The pair of dog-dicks hang there, leaking pre-cum and arousing you far beyond normal.");
                    player.lowerBody.cockSpot.add(new Cock(7 + Utils.rand(7), 1.5 + Utils.rand(10) / 10));
                    player.lowerBody.cockSpot.get(1).cockType = CockType.DOG;
                    player.lowerBody.cockSpot.get(1).knotMultiplier = 1.4;
                    player.stats.lib += 2;
                    player.stats.lust += 50;
                }
                //if player has more
                if (player.lowerBody.cockSpot.count() >= 1) {
                    //if first dick is already doggi'ed
                    if (player.lowerBody.cockSpot.get(0).cockType == CockType.DOG) {
                        DisplayText.text("\n\nYour crotch twitches, and you pull open your " + player.inventory.armorSlot.equipment.displayName + " to get a better look.  You watch in horror and arousal as your " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(1)) + " warps and twists, becoming red and pointed, just like other dog-dick, growing thick bulges near the base.  When it stops you have two dog-cocks and an animal-like sheath.  The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed.");
                        player.lowerBody.cockSpot.get(1).cockType = CockType.DOG;
                        player.lowerBody.cockSpot.get(1).knotMultiplier = 1.4;
                    }
                    //first dick is not dog
                    else {
                        DisplayText.text("\n\nYour crotch twitches, and you pull open your " + player.inventory.armorSlot.equipment.displayName + " to get a better look.  You watch in horror and arousal as your " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + " warps and twists, becoming red and pointed, just like other dog-dick, growing thick bulges near the base.  When it stops you have two dog-cocks and an animal-like sheath.  The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed.");
                        player.lowerBody.cockSpot.get(0).cockType = CockType.DOG;
                        player.lowerBody.cockSpot.get(0).knotMultiplier = 1.4;
                    }
                    player.stats.lib += 2;
                    player.stats.lust += 50;
                }
            }
        }
        player.updateGender();
    }

    private knottyPepperTF(player: Player, crit: number) {
        let cockSpot = player.lowerBody.cockSpot;
        //Cocks only!
        if (cockSpot.count() > 0) {
            //biggify knots
            if (cockSpot.hasCockType(CockType.DOG)) {
                let smallestKnottedDogCock: Cock = this.smallestKnottedDogCock(player);

                let knotGrowth: number = (Utils.rand(2) + 5) / 20 * crit;
                if (smallestKnottedDogCock.knotMultiplier >= 1.5) knotGrowth /= 2;
                if (smallestKnottedDogCock.knotMultiplier >= 1.75) knotGrowth /= 2;
                if (smallestKnottedDogCock.knotMultiplier >= 2) knotGrowth /= 5;
                smallestKnottedDogCock.knotMultiplier += (knotGrowth);

                DisplayText.text("\n\n");
                if (knotGrowth < .06)
                    DisplayText.text("Your " + CockDescriptor.nounCock(CockType.DOG) + " feels unusually tight in your sheath as your knot grows.");
                if (knotGrowth >= .06 && knotGrowth <= .12)
                    DisplayText.text("Your " + CockDescriptor.nounCock(CockType.DOG) + " pops free of your sheath, thickening nicely into a bigger knot.");
                if (knotGrowth > .12)
                    DisplayText.text("Your " + CockDescriptor.nounCock(CockType.DOG) + " surges free of your sheath, swelling thicker with each passing second.  Your knot bulges out at the base, growing far beyond normal.");
                player.stats.sens += 0.5;
                player.stats.lust += 5 * crit;
            }
            //Grow dogdick with big knot
            else {
                DisplayText.text("\n\nYour " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + " twitches, reshaping itself.  The crown tapers down to a point while the base begins swelling.  It isn't painful in the slightest, actually kind of pleasant.  Your dog-like knot slowly fills up like a balloon, eventually stopping when it's nearly twice as thick as the rest.  You touch and shiver with pleasure, oozing pre-cum.");
                cockSpot.get(0).cockType = CockType.DOG;
                cockSpot.get(0).knotMultiplier = 2.1;
            }
        }
        //You wasted knot pepper!
        else
            DisplayText.text("\n\nA slight wave of nausea passes through you.  It seems this pepper does not quite agree with your body.");
    }

    private bulbousPepperTF(player: Player) {
        if (player.lowerBody.balls <= 1) {
            DisplayText.text("\n\nA spike of pain doubles you up, nearly making you vomit.  You stay like that, nearly crying, as a palpable sense of relief suddenly washes over you.  You look down and realize you now have a small sack, complete with two relatively small balls.");
            player.lowerBody.balls = 2;
            player.lowerBody.ballSize = 1;
            player.stats.lib += 2;
            player.stats.lust -= 10;
        }
        else {
            //Makes your balls biggah!
            player.lowerBody.ballSize++;
            //They grow slower as they get bigger...
            if (player.lowerBody.ballSize > 10) player.lowerBody.ballSize -= .5;
            //Texts
            if (player.lowerBody.ballSize <= 2)
                DisplayText.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + BallsDescriptor.describeBalls(false, true, player) + " have grown larger than a human's.");
            if (player.lowerBody.ballSize > 2)
                DisplayText.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + BallsDescriptor.describeSack(player) + ".  Walking becomes difficult as you discover your " + BallsDescriptor.describeBalls(false, true, player) + " have enlarged again.");
            player.stats.lib += 1;
            player.stats.lust -= 3;
        }
    }

    private smallestKnottedDogCock(player: Player): Cock {
        let dogCockList: Cock[] = player.lowerBody.cockSpot.listCockType(CockType.DOG);
        let smallestKnottedDogCock: Cock = dogCockList[0];
        //Find smallest knot
        for (let index = 0; index < dogCockList.length; index++)
            if (smallestKnottedDogCock.knotMultiplier > dogCockList[index].knotMultiplier)
                smallestKnottedDogCock = dogCockList[index];
        return smallestKnottedDogCock;
    }

    public use(player: Player) {
        let crit: number = 1;
        let chest = player.upperBody.chest;
        let vaginaSpot = player.lowerBody.vaginaSpot;
        let cockSpot = player.lowerBody.cockSpot;
        //Set up changes and changeLimit
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        //Initial outputs & crit level
        DisplayText.clear();
        crit = this.eatPepperDesc(player);

        //OVERDOSE Bad End!
        this.overdoseBadEnd(player, crit);
        //WARNING, overdose VERY close!
        if (this.type <= 0 && player.skinType == SkinType.FUR && player.upperBody.head.face.faceType == FaceType.DOG && player.lowerBody.tailType == TailType.DOG && player.upperBody.head.earType == EarType.DOG && player.lowerBody.type == LowerBodyType.DOG && player.statusAffects.has(StatusAffectType.DogWarning) && Utils.rand(3) == 0) {
            DisplayText.text("<b>\n\nEating the pepper, you realize how dog-like you've become, and you wonder what else the peppers could change...</b>");
        }
        //WARNING, overdose is close!
        if (this.type <= 0 && player.skinType == SkinType.FUR && player.upperBody.head.face.faceType == FaceType.DOG && player.lowerBody.tailType == TailType.DOG && player.upperBody.head.earType == EarType.DOG && player.lowerBody.type == LowerBodyType.DOG && !player.statusAffects.has(StatusAffectType.DogWarning)) {
            player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.DogWarning, 0, 0, 0, 0));
            DisplayText.text("<b>\n\nEating the pepper, you realize how dog-like you've become, and you wonder what else the peppers could change...</b>");
        }
        if (this.type == 3) {
            player.stats.lib += 2 + Utils.rand(4);
            player.stats.lust += 5 + Utils.rand(5);
            player.stats.cor += 2 + Utils.rand(4);
            DisplayText.text("\n\nYou feel yourself relaxing as gentle warmth spreads through your body.  Honestly you don't think you'd mind running into a demon or monster right now, they'd make for good entertainment.");
            if (player.stats.cor < 50) DisplayText.text("  You shake your head, blushing hotly.  Where did that thought come from?");
        }
        if (player.stats.str < 50 && Utils.rand(3) == 0) {
            player.stats.str += crit;
            if (crit > 1) DisplayText.text("\n\nYour muscles ripple and grow, bulging outwards.");
            else DisplayText.text("\n\nYour muscles feel more toned.");
            changes++;
        }
        if (player.stats.spe < 30 && Utils.rand(3) == 0 && changes < changeLimit) {
            player.stats.spe += crit;
            if (crit > 1) DisplayText.text("\n\nYou find your muscles responding quicker, faster, and you feel an odd desire to go for a walk.");
            else DisplayText.text("\n\nYou feel quicker.");
            changes++;
        }
        if (player.stats.int > 30 && Utils.rand(3) == 0 && changes < changeLimit && this.type != 3) {
            crit += -1 * crit;
            DisplayText.text("\n\nYou feel ");
            if (crit > 1) DisplayText.text("MUCH ");
            DisplayText.text("dumber.");
            changes++;
        }
        //-Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.upperBody.armType == ArmType.HARPY && Utils.rand(4) == 0) {
            DisplayText.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating.  The wing-like shape your arms once had is gone in a matter of moments, leaving " + player.skinDesc + " behind.");
            player.upperBody.armType = ArmType.HUMAN;
            changes++;
        }
        //-Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.upperBody.armType == ArmType.SPIDER && Utils.rand(4) == 0) {
            DisplayText.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away.  The glossy black coating is soon gone, leaving " + player.skinDesc + " behind.");
            player.upperBody.armType = ArmType.HUMAN;
            changes++;
        }
        //-Remove feathery hair (copy for equinum, canine peppers, Labova)
        if (changes < changeLimit && player.upperBody.head.hairType == 1 && Utils.rand(4) == 0) {
            //(long):
            if (player.upperBody.head.hairLength >= 6) DisplayText.text("\n\nA lock of your downy-soft feather-hair droops over your eye.  Before you can blow the offending down away, you realize the feather is collapsing in on itself.  It continues to curl inward until all that remains is a normal stUtils.Utils.rand of hair.  <b>Your hair is no longer feathery!</b>");
            //(short)
            else DisplayText.text("\n\nYou run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested.  While your hand is up there, it detects a change in the texture of your feathers.  They're completely disappearing, merging down into stUtils.Utils.rands of regular hair.  <b>Your hair is no longer feathery!</b>");
            changes++;
            player.upperBody.head.hairType = 0;
        }
        //if(this.type != 2 && this.type != 4 && this.type != 5) DisplayText.text("\n");
        //Double Pepper!
        //Xforms/grows dicks to make you have two dogcocks
        if (this.type == CaninePepperType.Double) {
            this.doublePepperTF(player);
        }
        //Knotty knot pepper!
        if (this.type == CaninePepperType.Knotty) {
            this.knottyPepperTF(player, crit);
        }
        //GROW BALLS
        if (this.type == CaninePepperType.Bulbous) {
            this.bulbousPepperTF(player);
        }
        //Sexual Stuff Now
        //------------------
        //Man-Parts
        //3 Changes,
        //1. Cock Xform
        //2. Knot Size++
        //3. cumMultiplier++ (to max of 1.5)
        if (cockSpot.count() > 0) {
            //Grow knot on smallest knotted dog cock
            if (this.type != CaninePepperType.Knotty &&
                cockSpot.countType(CockType.DOG) > 0 &&
                ((changes < changeLimit && Utils.rand(1.4) == 0) || this.type == CaninePepperType.Oversized)) {

                let smallestKnottedDogCock: Cock = this.smallestKnottedDogCock(player);
                //Have smallest knotted cock selected.
                let growth: number = (Utils.rand(2) + 1) / 20 * crit;
                if (smallestKnottedDogCock.knotMultiplier >= 1.5) growth /= 2;
                if (smallestKnottedDogCock.knotMultiplier >= 1.75) growth /= 2;
                if (smallestKnottedDogCock.knotMultiplier >= 2) growth /= 5;
                smallestKnottedDogCock.knotMultiplier += (growth);
                if (growth < .06) DisplayText.text("\n\nYour " + CockDescriptor.describeCock(player, smallestKnottedDogCock) + " feels unusually tight in your sheath as your knot grows.");
                if (growth >= .06 && growth <= .12) DisplayText.text("\n\nYour " + CockDescriptor.describeCock(player, smallestKnottedDogCock) + " pops free of your sheath, thickening nicely into a bigger knot.");
                if (growth > .12) DisplayText.text("\n\nYour " + CockDescriptor.describeCock(player, smallestKnottedDogCock) + " surges free of your sheath, swelling thicker with each passing second.  Your knot bulges out at the base, growing far beyond normal.");
                player.stats.sens += 0.5;
                player.stats.lust += 5 * crit;
                changes++;
            }
            //Cock Xform if player has free cocks.
            if (cockSpot.countType(CockType.DOG) < cockSpot.count() &&
                ((changes < changeLimit && Utils.rand(1.6)) || this.type == CaninePepperType.Oversized) == 0) {
                //Select first not dog cock
                let firstNotDogCock: Cock = null;
                for (let index = 0; index < cockSpot.count(); index++)
                    if (cockSpot.get(index).cockType != CockType.DOG)
                        firstNotDogCock = cockSpot.get(index);

                //Talk about it
                //Hooooman
                if (firstNotDogCock.cockType == CockType.HUMAN) {
                    DisplayText.text("\n\nYour " + CockDescriptor.describeCock(player, firstNotDogCock) + " clenches painfully, becoming achingly, throbbingly erect.  A tightness seems to squeeze around the base, and you wince as you see your skin and flesh shifting forwards into a canine-looking sheath.  You shudder as the crown of your " + CockDescriptor.describeCock(player, firstNotDogCock) + " reshapes into a point, the sensations nearly too much for you.  You throw back your head as the transformation completes, your " + CockDescriptor.nounCock(firstNotDogCock.cockType) + " much thicker than it ever was before.  <b>You now have a dog-cock.</b>");
                    player.stats.sens += 10;
                    player.stats.lust += 5 * crit;
                }
                //Horse
                else if (firstNotDogCock.cockType == CockType.HORSE) {
                    DisplayText.text("\n\nYour " + CockDescriptor.nounCock(firstNotDogCock.cockType) + " shrinks, the extra equine length seeming to shift into girth.  The flared tip vanishes into a more pointed form, a thick knotted bulge forming just above your sheath.  <b>You now have a dog-cock.</b>");
                    //Tweak length/thickness.
                    if (firstNotDogCock.cockLength > 6)
                        firstNotDogCock.cockLength -= 2;
                    else
                        firstNotDogCock.cockLength -= .5;
                    firstNotDogCock.cockThickness += .5;

                    player.stats.sens += 4;
                    player.stats.lust += 5 * crit;
                }
                //Tentacular Tuesday!
                else if (firstNotDogCock.cockType == CockType.TENTACLE) {
                    DisplayText.text("\n\nYour " + CockDescriptor.describeCock(player, firstNotDogCock) + " coils in on itself, reshaping and losing its plant-like coloration as it thickens near the base, bulging out in a very canine-looking knot.  Your skin bunches painfully around the base, forming into a sheath.  <b>You now have a dog-cock.</b>");
                    player.stats.sens += 4;
                    player.stats.lust += 5 * crit;
                }
                //Demon
                else if (firstNotDogCock.cockType == CockType.DEMON) {
                    DisplayText.text("\n\nYour " + CockDescriptor.describeCock(player, firstNotDogCock) + " color shifts red for a moment and begins to swell at the base, but within moments it smooths out, retaining its distinctive demonic shape, only perhaps a bit thicker.");
                    player.stats.sens += 1;
                    player.stats.lust += 2 * crit;
                }
                //Misc
                else {
                    DisplayText.text("\n\nYour " + CockDescriptor.describeCock(player, firstNotDogCock) + " trembles, reshaping itself into a shiny red doggie-dick with a fat knot at the base.  <b>You now have a dog-cock.</b>");
                    player.stats.sens += 4;
                    player.stats.lust += 5 * crit;
                }
                //Xform it!
                if (firstNotDogCock.cockType != CockType.DEMON)
                    firstNotDogCock.cockType = CockType.DOG;
                firstNotDogCock.knotMultiplier = 1.1;
                CockModifier.thickenCock(firstNotDogCock, 2);

                changes++;

            }
            //Cum Multiplier Xform
            if (player.cumMultiplier < 2 && Utils.rand(2) == 0 && changes < changeLimit) {
                let cumMultiplierIncrease = 1.5;
                //Lots of cum raises cum multiplier cap to 2 instead of 1.5
                if (player.perks.has(PerkType.MessyOrgasms))
                    cumMultiplierIncrease = 2;
                if (cumMultiplierIncrease < player.cumMultiplier + .05 * crit) {
                    changes--;
                }
                else {
                    player.cumMultiplier += .05 * crit;
                    //Flavor text
                    if (player.lowerBody.balls == 0)
                        DisplayText.text("\n\nYou feel a churning inside your gut as something inside you changes.");
                    if (player.lowerBody.balls > 0)
                        DisplayText.text("\n\nYou feel a churning in your " + BallsDescriptor.describeBallsShort(player) + ".  It quickly settles, leaving them feeling somewhat more dense.");
                    if (crit > 1)
                        DisplayText.text("  A bit of milky pre dribbles from your " + CockDescriptor.describeMultiCockShort(player) + ", pushed out by the change.");
                }
                changes++;
            }
            //Oversized pepper
            if (this.type == CaninePepperType.Oversized) {
                let shortestCock: Cock = cockSpot.listShortestCocks[0];
                let cockGrowthAmount: number = CockModifier.growCock(player, shortestCock, Utils.rand(4) + 3);
                player.stats.sens += 1;
                player.stats.lust += 10;

                if (cockSpot.count() >= 1 && shortestCock.cockThickness <= 2)
                    CockModifier.thickenCock(shortestCock, 1);

                if (cockGrowthAmount > 2)
                    DisplayText.text("\n\nYour " + CockDescriptor.describeCock(player, shortestCock) + " tightens painfully, inches of bulging dick-flesh pouring out from your crotch as it grows longer.  Thick pre forms at the pointed tip, drawn out from the pleasure of the change.");
                if (cockGrowthAmount > 1 && cockGrowthAmount <= 2)
                    DisplayText.text("\n\nAching pressure builds within your crotch, suddenly releasing as an inch or more of extra dick-flesh spills out.  A dollop of pre beads on the head of your enlarged " + CockDescriptor.describeCock(player, shortestCock) + " from the pleasure of the growth.");
                if (cockGrowthAmount <= 1)
                    DisplayText.text("\n\nA slight pressure builds and releases as your " + CockDescriptor.describeCock(player, shortestCock) + " pushes a bit further out of your crotch.");
            }
        }
        //Female Stuff
        //Multiboobages
        if (chest.count() > 0) {
            //if bigger than A cup
            if (chest.get(0).breastRating > 0 && player.lowerBody.vaginaSpot.count() > 0) {
                //Doggies only get 3 rows of tits! FENOXO HAS SPOKEN
                if (chest.count() < 3 && Utils.rand(2) == 0 && changes < changeLimit) {
                    let newBreastRow = new BreastRow();
                    chest.add(newBreastRow);
                    //Breasts are too small to grow a new row, so they get bigger first
                    //But ONLY if player has a vagina (dont want dudes weirded out)
                    if (vaginaSpot.count() > 0 && chest.get(0).breastRating <= chest.count()) {
                        DisplayText.text("\n\nYour " + BreastDescriptor.describeBreastRow(chest.get(0)) + " feel constrained and painful against your top as they grow larger by the moment, finally stopping as they reach ");
                        chest.get(0).breastRating += 2;
                        DisplayText.text(BreastDescriptor.breastCup(chest.get(0).breastRating) + " size.  But it doesn't stop there, you feel a tightness beginning lower on your torso...");
                        changes++;
                    }
                    //Had 1 row to start
                    if (chest.count() == 2) {
                        //1 size below primary breast row!
                        newBreastRow.breastRating = chest.get(0).breastRating - 1;
                        if (chest.get(0).breastRating - 1 == 0)
                            DisplayText.text("\n\nA second set of breasts forms under your current pair, stopping while they are still fairly flat and masculine looking.");
                        else
                            DisplayText.text("\n\nA second set of breasts bulges forth under your current pair, stopping as they reach " + BreastDescriptor.breastCup(newBreastRow.breastRating) + "s.");
                        DisplayText.text("  A sensitive nub grows on the summit of each new tit, becoming a new nipple.");
                        player.stats.sens += 6;
                        player.stats.lust += 5;
                        changes++;
                    }
                    //Many breast Rows - requires larger primary tits...
                    if (chest.count() > 2 && chest.get(0).breastRating > chest.count()) {
                        player.stats.sens += 6;
                        player.stats.lust += 5;
                        //New row's size = the size of the row above -1
                        let rowAboveNewBreastRow: BreastRow = chest.get(chest.count() - 2);
                        newBreastRow.breastRating = rowAboveNewBreastRow.breastRating - 1;
                        //If second row are super small but primary row is huge it could go negative.
                        //This corrects that problem.
                        if (newBreastRow.breastRating < 0)
                            newBreastRow.breastRating = 0;
                        if (rowAboveNewBreastRow.breastRating < 0)
                            rowAboveNewBreastRow.breastRating = 0;
                        if (newBreastRow.breastRating == 0)
                            DisplayText.text("\n\nYour abdomen tingles and twitches as a new row of breasts sprouts below the others.  Your new breasts stay flat and masculine, not growing any larger.");
                        else
                            DisplayText.text("\n\nYour abdomen tingles and twitches as a new row of " + BreastDescriptor.breastCup(newBreastRow.breastRating) + " " + BreastDescriptor.describeBreastRow(newBreastRow) + " sprouts below your others.");
                        DisplayText.text("  A sensitive nub grows on the summit of each new tit, becoming a new nipple.");
                        changes++;
                    }
                    //Extra sensitive if crit
                    if (crit > 1) {
                        if (crit > 2) {
                            DisplayText.text("  You heft your new chest experimentally, exploring the new flesh with tender touches.  Your eyes nearly roll back in your head from the intense feelings.");
                            player.stats.sens += 6;
                            player.stats.lust += 15;
                        }
                        else {
                            DisplayText.text("  You touch your new nipples with a mixture of awe and desire, the experience arousing beyond measure.  You squeal in delight, nearly orgasming, but in time finding the willpower to stop yourself.");
                            player.stats.sens += 3;
                            player.stats.lust += 10;
                        }
                    }

                }
                //If already has max doggie breasts!
                else if (Utils.rand(2) == 0) {
                    //Check for size mismatches, and move closer to spec!
                    let chestCount: number = chest.count();
                    let uneven: boolean = false;
                    //Check each row, and if the row above or below it is
                    for (let index: number = chest.count() - 1; index > 0; index--) {
                        if (chest.get(index).breastRating + 1 < chest.get(index - 1).breastRating) {
                            if (!uneven) {
                                uneven = true;
                                DisplayText.text("\n");
                            }
                            DisplayText.text("\nYour ");
                            if (index == 0) DisplayText.text("first ");
                            if (index == 1) DisplayText.text("second ");
                            if (index == 2) DisplayText.text("third ");
                            if (index == 3) DisplayText.text("fourth ");
                            if (index == 4) DisplayText.text("fifth ");
                            if (index > 4) DisplayText.text("");
                            DisplayText.text("row of " + BreastDescriptor.describeBreastRow(chest.get(index)) + " grows larger, as if jealous of the jiggling flesh above.");
                            let growthDiff: number = chest.get(index - 1).breastRating - chest.get(index).breastRating - 1;
                            if (growthDiff > 5) growthDiff = 5;
                            if (growthDiff < 1) growthDiff = 1;
                            chest.get(index).breastRating += growthDiff;
                        }
                    }
                }
            }
        }
        //Grow tits if have NO breasts/nipples AT ALL
        else if (Utils.rand(2) == 0 && changes < changeLimit) {
            DisplayText.text("\n\nYour chest tingles uncomfortably as your center of balance shifts.  <b>You now have a pair of B-cup breasts.</b>");
            DisplayText.text("  A sensitive nub grows on the summit of each tit, becoming a new nipple.");

            let newBreastRow: BreastRow = new BreastRow();
            newBreastRow.breastRating = 2;
            newBreastRow.breasts = 2;
            chest.add(newBreastRow);

            player.stats.sens += 4;
            player.stats.lust += 6;
            changes++;
        }
        //Go into heat
        if (Utils.rand(2) == 0 && changes < changeLimit) {
            if (BodyModifier.displayGoIntoHeat(player)) {
                changes++;
            }
        }
        if (changes < changeLimit && RaceScore.dogScore(player) >= 3 && Utils.rand(4) == 0) {
            changes++;
            DisplayText.text("\n\n");
            DisplayText.text("Images and thoughts come unbidden to your mind, overwhelming your control as you rapidly lose yourself in them, daydreaming of... ");
            //cawk fantasies
            if (player.gender <= 1 || (player.gender == 3 && Utils.rand(2) == 0)) {
                DisplayText.text("bounding through the woods, hunting with your master.  Feeling the wind in your fur and the thrill of the hunt coursing through your veins intoxicates you.  You have your nose to the ground, tracking your quarry as you run, until a heavenly scent stops you in your tracks.");
                player.stats.lust += 5 + player.stats.lib / 20;
                //break1
                if (player.stats.cor < 33 || !cockSpot.hasCock())
                    DisplayText.text("\nYou shake your head to clear the unwanted fantasy from your mind, repulsed by it.");
                else {
                    DisplayText.text("  Heart pounding, your shaft pops free of its sheath on instinct, as you take off after the new scent.  Caught firmly in the grip of a female's heat, you ignore your master's cry as you disappear into the wild, " + CockDescriptor.nounCock(CockType.DOG) + " growing harder as you near your quarry.  You burst through a bush, spotting a white-furred female.  She drops, exposing her dripping fem-sex to you, the musky scent of her sex channeling straight through your nose and sliding into your " + CockDescriptor.nounCock(CockType.DOG) + ".");
                    player.stats.lust += 5 + player.stats.lib / 20;
                    //Break 2
                    if (player.stats.cor < 66)
                        DisplayText.text("\nYou blink a few times, the fantasy fading as you master yourself.  That daydream was so strange, yet so hot.");
                    else {
                        DisplayText.text("  Unable to wait any longer, you mount her, pressing your bulging knot against her vulva as she yips in pleasure. The heat of her sex is unreal, the tight passage gripping you like a vice as you jackhammer against her, biting her neck gently in spite of the violent pounding.");
                        player.stats.lust += 5 + player.stats.lib / 20;
                        //break3
                        if (player.stats.cor < 80) {
                            if (player.lowerBody.vaginaSpot.count() > 0)
                                DisplayText.text("\nYou reluctantly pry your hand from your aching " + VaginaDescriptor.describeVagina(player, vaginaSpot.get(0)) + " as you drag yourself out of your fantasy.");
                            else DisplayText.text("\nYou reluctantly pry your hand from your aching " + CockDescriptor.describeCock(player, player.lowerBody.cockSpot.get(0)) + " as you drag yourself out of your fantasy.");
                        }
                        else {
                            DisplayText.text("  At last your knot pops into her juicy snatch, splattering her groin with a smattering of her arousal.  The scents of your mating reach a peak as the velvet vice around your " + CockDescriptor.nounCock(CockType.DOG) + " quivers in the most indescribably pleasant way.  You clamp down on her hide as your whole body tenses, unleashing a torrent of cum into her sex.  Each blast is accompanied by a squeeze of her hot passage, milking you of the last of your spooge.  Your " + LowerBodyDescriptor.describeLegs(player) + " give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.");
                            player.stats.lust += 5 + player.stats.lib / 20;
                        }
                    }
                }
            }
            //Pure female fantasies
            else if (player.lowerBody.vaginaSpot.hasVagina()) {
                DisplayText.text("wagging your dripping " + VaginaDescriptor.describeVagina(player, vaginaSpot.get(0)) + " before a pack of horny wolves, watching their shiny red doggie-pricks practically jump out of their sheaths at your fertile scent.");
                player.stats.lust += 5 + player.stats.lib / 20;
                //BREAK 1
                if (player.stats.cor < 33) {
                    DisplayText.text("\nYou shake your head to clear the unwanted fantasy from your mind, repulsed by it.");
                }
                else {
                    DisplayText.text("  In moments they begin their advance, plunging their pointed beast-dicks into you, one after another.  You yip and howl with pleasure as each one takes his turn knotting you.");
                    player.stats.lust += 5 + player.stats.lib / 20;
                    //BREAK 2
                    if (player.stats.cor <= 66) {
                        DisplayText.text("\nYou blink a few times, the fantasy fading as you master yourself.  That daydream was so strange, yet so hot.");
                    }
                    else {
                        DisplayText.text("  The feeling of all that hot wolf-spooge spilling from your overfilled snatch and running down your thighs is heavenly, nearly making you orgasm on the spot.  You see the alpha of the pack is hard again, and his impressive member is throbbing with the need to breed you.");
                        player.stats.lust += 5 + player.stats.lib / 20;
                        //break3
                        if (player.stats.cor < 80) {
                            DisplayText.text("\nYou reluctantly pry your hand from your aching " + VaginaDescriptor.describeVagina(player, vaginaSpot.get(0)) + " as you drag yourself out of your fantasy.");
                        }
                        else {
                            DisplayText.text("  You growl with discomfort as he pushes into your abused wetness, stretching you tightly, every beat of his heart vibrating through your nethers.  With exquisite force, he buries his knot in you and begins filling you with his potent seed, impregnating you for sure. Your knees give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.");
                            player.stats.lust += 5 + player.stats.lib / 20;
                        }
                    }
                }
            }
            else {
                DisplayText.text("wagging your [asshole] before a pack of horny wolves, watching their shiny red doggie-pricks practically jump out of their sheaths at you after going so long without a female in the pack.");
                player.stats.lust += 5 + player.stats.lib / 20;
                //BREAK 1
                if (player.stats.cor < 33) {
                    DisplayText.text("\nYou shake your head to clear the unwanted fantasy from your mind, repulsed by it.");
                }
                else {
                    DisplayText.text("  In moments they begin their advance, plunging their pointed beast-dicks into you, one after another.  You yip and howl with pleasure as each one takes his turn knotting you.");
                    player.stats.lust += 5 + player.stats.lib / 20;
                    //BREAK 2
                    if (player.stats.cor <= 66) {
                        DisplayText.text("\nYou blink a few times, the fantasy fading as you master yourself.  That daydream was so strange, yet so hot.");
                    }
                    else {
                        DisplayText.text("  The feeling of all that hot wolf-spooge spilling from your overfilled ass and running down your thighs is heavenly, nearly making you orgasm on the spot.  You see the alpha of the pack is hard again, and his impressive member is throbbing with the need to spend his lust on you.");
                        player.stats.lust += 5 + player.stats.lib / 20;
                        //break3
                        if (player.stats.cor < 80) {
                            DisplayText.text("\nYou reluctantly pry your hand from your aching asshole as you drag yourself out of your fantasy.");
                        }
                        else {
                            DisplayText.text("  You growl with discomfort as he pushes into your abused, wet hole, stretching you tightly, every beat of his heart vibrating through your hindquarters.  With exquisite force, he buries his knot in you and begins filling you with his potent seed, impregnating you for sure. Your knees give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.");
                            player.stats.lust += 5 + player.stats.lib / 20;
                        }
                    }
                }
            }
        }
        //Remove odd eyes
        if (changes < changeLimit && Utils.rand(5) == 0 && player.upperBody.head.face.eyeType > EyeType.HUMAN) {
            if (player.upperBody.head.face.eyeType == EyeType.BLACK_EYES_SAND_TRAP) {
                DisplayText.text("\n\nYou feel a twinge in your eyes and you blink.  It feels like black cataracts have just fallen away from you, and you know without needing to see your reflection that your eyes have gone back to looking human.");
            }
            else {
                DisplayText.text("\n\nYou blink and stumble, a wave of vertigo threatening to pull your " + LowerBodyDescriptor.describeFeet(player) + " from under you.  As you steady and open your eyes, you realize something seems different.  Your vision is changed somehow.");
                if (player.upperBody.head.face.eyeType == EyeType.FOUR_SPIDER_EYES) DisplayText.text("  Your multiple, arachnid eyes are gone!</b>");
                DisplayText.text("  <b>You have normal, humanoid eyes again.</b>");
            }
            player.upperBody.head.face.eyeType = EyeType.HUMAN;
            changes++;
        }
        //Master Furry Appearance Order:
        //Tail -> Ears -> Paws -> Fur -> Face
        //Dog-face requires fur & paws  Should be last morph to take place
        if (Utils.rand(5) == 0 && changes < changeLimit &&
            player.upperBody.head.face.faceType != FaceType.DOG && player.skinType == SkinType.FUR &&
            player.lowerBody.type == LowerBodyType.DOG) {
            if (player.upperBody.head.face.faceType == FaceType.HORSE) DisplayText.text("\n\nYour face is wracked with pain.  You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something else.  <b>Your horse-like features rearrange to take on many canine aspects.</b>");
            else DisplayText.text("\n\nYour face is wracked with pain.  You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something... different.  You find a puddle to view your reflection...<b>your face is now a cross between human and canine features.</b>");
            player.upperBody.head.face.faceType = FaceType.DOG;
            changes++;
        }
        if (this.type == 3 && player.upperBody.head.hairColor != "midnight black") {
            if (player.skinType == SkinType.FUR) DisplayText.text("<b>\n\nYour fur and hair tingles, growing in thicker than ever as darkness begins to spread from the roots, turning it midnight black.</b>");
            else DisplayText.text("<b>\n\nYour " + player.skinDesc + " itches like crazy as fur grows out from it, coating your body.  It's incredibly dense and black as the middle of a moonless night.</b>");
            player.skinType = SkinType.FUR;
            player.skinAdj = "thick";
            player.skinDesc = "fur";
            player.upperBody.head.hairColor = "midnight black";
        }
        //Become furred - requires paws and tail
        if (Utils.rand(4) == 0 && changes < changeLimit &&
            player.lowerBody.type == LowerBodyType.DOG && player.lowerBody.tailType == TailType.DOG &&
            player.skinType != SkinType.FUR) {
            if (player.skinType == SkinType.PLAIN) DisplayText.text("\n\nYour skin itches intensely.  You gaze down as more and more hairs break forth from your skin, quickly transforming into a soft coat of fur.  <b>You are now covered in " + player.upperBody.head.hairColor + " fur from head to toe.</b>");
            if (player.skinType == SkinType.SCALES) DisplayText.text("\n\nYour scales itch incessantly.  You scratch, feeling them flake off to reveal a coat of " + player.upperBody.head.hairColor + " fur growing out from below!  <b>You are now covered in " + player.upperBody.head.hairColor + " fur from head to toe.</b>");
            player.skinType = SkinType.FUR;
            player.skinDesc = "fur";
            changes++;
        }
        //Change to paws - requires tail and ears
        if (Utils.rand(3) == 0 && player.lowerBody.type != LowerBodyType.DOG && player.lowerBody.tailType == TailType.DOG && player.upperBody.head.earType == EarType.DOG && changes < changeLimit) {
            //Feet -> paws
            if (player.lowerBody.type == LowerBodyType.HUMAN) DisplayText.text("\n\nYou scream in agony as you feel the bones in your feet break and begin to rearrange. <b>You now have paws</b>.");
            //Hooves -> Paws
            else if (player.lowerBody.type == LowerBodyType.HOOFED) DisplayText.text("\n\nYou feel your hooves suddenly splinter, growing into five unique digits.  Their flesh softens as your hooves reshape into furred paws.");
            else DisplayText.text("\n\nYour lower body is wracked by pain!  Once it passes, you discover that you're standing on fur-covered paws!  <b>You now have paws</b>.");
            player.lowerBody.type = LowerBodyType.DOG;
            changes++;
        }
        //Change to dog-ears!  Requires dog-tail
        if (Utils.rand(2) == 0 && player.upperBody.head.earType != EarType.DOG && player.lowerBody.tailType == TailType.DOG && changes < changeLimit) {
            if (player.upperBody.head.earType == -1) DisplayText.text("\n\nTwo painful nubs begin sprouting from your head, growing and opening into canine ears.  ");
            if (player.upperBody.head.earType == EarType.HUMAN) DisplayText.text("\n\nThe skin on the sides of your face stretches painfully as your ears migrate upwards, towards the top of your head.  They shift and elongate, becoming canine in nature.  ");
            if (player.upperBody.head.earType == EarType.HORSE) DisplayText.text("\n\nYour equine ears twist as they transform into canine versions.  ");
            if (player.upperBody.head.earType > EarType.DOG) DisplayText.text("\n\nYour ears transform, becoming more canine in appearance.  ");
            player.upperBody.head.earType = EarType.DOG;
            player.upperBody.head.earValue = 2;
            DisplayText.text("<b>You now have dog ears.</b>");
            changes++;
        }
        //Grow tail if not dog-tailed
        if (Utils.rand(3) == 0 && changes < changeLimit && player.lowerBody.tailType != TailType.DOG) {
            if (player.lowerBody.tailType == TailType.NONE) DisplayText.text("\n\nA pressure builds on your backside.  You feel under your clothes and discover an odd bump that seems to be growing larger by the moment.  In seconds it passes between your fingers, bursts out the back of your clothes, and grows most of the way to the ground.  A thick coat of fur springs up to cover your new tail.  ");
            if (player.lowerBody.tailType == TailType.HORSE) DisplayText.text("\n\nYou feel a tightness in your rump, matched by the tightness with which the stUtils.Utils.rands of your tail clump together.  In seconds they fuse into a single tail, rapidly sprouting thick fur.  ");
            if (player.lowerBody.tailType == TailType.DEMONIC) DisplayText.text("\n\nThe tip of your tail feels strange.  As you pull it around to check on it, the spaded tip disappears, quickly replaced by a thick coat of fur over the entire surface of your tail.  ");
            //Generic message for now
            if (player.lowerBody.tailType >= TailType.COW) DisplayText.text("\n\nYou feel your backside shift and change, flesh molding and displacing into a long puffy tail!  ");
            changes++;
            player.lowerBody.tailType = TailType.DOG;
            DisplayText.text("<b>You now have a dog-tail.</b>");
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            DisplayText.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            player.upperBody.gills = false;
            changes++;
        }
        if (player.skinType == SkinType.FUR && changes < changeLimit && Utils.rand(3) == 0) {
            DisplayText.text("\n\nYou become more... solid.  Sinewy.  A memory comes unbidden from your youth of a grizzled wolf you encountered while hunting, covered in scars, yet still moving with an easy grace.  You imagine that must have felt something like this.");
            player.stats.tou += 4;
            player.stats.sens -= 3;
            changes++;
        }
        //If no changes yay
        if (changes == 0) {
            DisplayText.text("\n\nInhuman vitality spreads through your body, invigorating you!\n");
            StatModifier.displayPlayerHPChange(player, 20);
            player.stats.lust += 3;
        }
    }
}