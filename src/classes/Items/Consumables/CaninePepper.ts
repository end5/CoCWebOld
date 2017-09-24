import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

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
    public constructor(pepperType: CaninePepperType) {
        switch (pepperType) {
            case CaninePepperType.Normal:
                super("CanineP", "CanineP", "a Canine pepper", 0, "The pepper is shiny and red, bulbous at the base but long and narrow at the tip.  It smells spicy.");
                break;
            case CaninePepperType.Oversized:
                super("LargePp", "LargePp", "an overly large canine pepper", 10, "This large canine pepper is much bigger than any normal peppers you've seen.");
                break;
            case CaninePepperType.Double:
                super("DblPepp", "DblPepp", "a double canine pepper", 10, "This canine pepper is actually two that have grown together due to some freak coincidence.");
                break;
            case CaninePepperType.Black:
                super("BlackPp", "BlackPp", "a solid black canine pepper", 10, "This solid black canine pepper is smooth and shiny, but something about it doesn't seem quite right...");
                break;
            case CaninePepperType.Knotty:
                super("KnottyP", "KnottyP", "a knotty canine pepper", 10, "This knotted pepper is very swollen, with a massive, distended knot near the base.");
            case CaninePepperType.Bulbous:
                super("BulbyPp", "BulbyPp", "a bulbous pepper", 10, "This bulbous pepper has a slightly different shape than the other canine peppers, with two large orb-like protrusions at the base.");
                break;
            default:
                super("CanineP", "CanineP", "a Canine pepper", 0, "The pepper is shiny and red, bulbous at the base but long and narrow at the tip.  It smells spicy.");
        }
    }

    public use(player: Player) {
        let temp2: number = 0;
        let temp3: number = 0;
        let crit: number = 1;
        //Set up changes and changeLimit
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //Initial outputs & crit level
        MainScreen.text("", true);
        if (type == 0) {
            if (Utils.rand(100) < 15) {
                crit = int(Math.Utils.random() * 20) / 10 + 2;
                MainScreen.text("The pepper tastes particularly potent, searingly hot and spicy.", false);
            }
            else MainScreen.text("The pepper is strangely spicy but very tasty.", false);
        }
        //Oversized pepper
        if (type == 1) {
            crit = int(Math.Utils.random() * 20) / 10 + 2;
            MainScreen.text("The pepper is so large and thick that you have to eat it in several large bites.  It is not as spicy as the normal ones, but is delicious and flavorful.", false);
        }
        //Double Pepper
        if (type == 2) {
            crit = int(Math.Utils.random() * 20) / 10 + 2;
            MainScreen.text("The double-pepper is strange, looking like it was formed when two peppers grew together near their bases.", false);
        }
        //Black Pepper
        if (type == 3) {
            crit = int(Math.Utils.random() * 20) / 10 + 2;
            MainScreen.text("This black pepper tastes sweet, but has a bit of a tangy aftertaste.", false);
        }
        //Knotty Pepper
        if (type == 4) {
            crit = int(Math.Utils.random() * 20) / 10 + 2;
            MainScreen.text("The pepper is a bit tough to eat due to the swollen bulge near the base, but you manage to cram it down and munch on it.  It's extra spicy!", false);
        }
        //Bulbous Pepper
        if (type == 5) {
            crit = int(Math.Utils.random() * 20) / 10 + 2;
            MainScreen.text("You eat the pepper, even the two orb-like growths that have grown out from the base.  It's delicious!", false);
        }
        //OVERDOSE Bad End!
        if (type <= 0 && crit > 1 && player.skinType == SKIN.FUR && player.faceType == FACE.DOG && player.upperBody.head.earType == EARS.DOG && player.lowerBody == LOWER_BODY.DOG && player.tailType == TAIL.DOG && Utils.rand(2) == 0 && player.statusAffects.has("DogWarning")) {
            temp = Utils.rand(2);
            if (temp == 0) {
                MainScreen.text("\n\nAs you swallow the pepper, you note that the spicy hotness on your tongue seems to be spreading. Your entire body seems to tingle and burn, making you feel far warmer than normal, feverish even. Unable to stand it any longer you tear away your clothes, hoping to cool down a little. Sadly, this does nothing to aid you with your problem. On the bright side, the sudden feeling of vertigo you've developed is more than enough to take your mind off your temperature issues. You fall forward onto your hands and knees, well not really hands and knees to be honest. More like paws and knees. That can't be good, you think for a moment, before the sensation of your bones shifting into a quadrupedal configuration robs you of your concentration. After that, it is only a short time before your form is remade completely into that of a large dog, or perhaps a wolf. The distinction would mean little to you now, even if you were capable of comprehending it. ", false);
                if (player.perks.has("MarblesMilk")) MainScreen.text("All you know is that there is a scent on the wind, it is time to hunt, and at the end of the day you need to come home for your milk.", false);
                else MainScreen.text("All you know is that there is a scent on the wind, and it is time to hunt.", false);
            }
            if (temp == 1) MainScreen.text("\n\nYou devour the sweet pepper, carefully licking your fingers for all the succulent juices of the fruit, and are about to go on your way when suddenly a tightness begins to build in your chest and stomach, horrid cramps working their way first through your chest, then slowly flowing out to your extremities, the feeling soon joined by horrible, blood-curdling cracks as your bones begin to reform, twisting and shifting, your mind exploding with pain. You fall to the ground, reaching one hand forward. No... A paw, you realize in horror, as you try to push yourself back up. You watch in horror, looking down your foreleg as thicker fur erupts from your skin, a " + player.hairColor + " coat slowly creeping from your bare flesh to cover your body. Suddenly, you feel yourself slipping away, as if into a dream, your mind warping and twisting, your body finally settling into its new form. With one last crack of bone you let out a yelp, kicking free of the cloth that binds you, wresting yourself from its grasp and fleeing into the now setting sun, eager to find prey to dine on tonight.", false);
            getGame().gameOver();
            return;
        }
        //WARNING, overdose VERY close!
        if (type <= 0 && player.skinType == SKIN.FUR && player.faceType == FACE.DOG && player.tailType == TAIL.DOG && player.upperBody.head.earType == EARS.DOG && player.lowerBody == LOWER_BODY.DOG && player.statusAffects.has("DogWarning") && Utils.rand(3) == 0) {
            MainScreen.text("<b>\n\nEating the pepper, you realize how dog-like you've become, and you wonder what else the peppers could change...</b>", false);
        }
        //WARNING, overdose is close!
        if (type <= 0 && player.skinType == SKIN.FUR && player.faceType == FACE.DOG && player.tailType == TAIL.DOG && player.upperBody.head.earType == EARS.DOG && player.lowerBody == LOWER_BODY.DOG && player.findStatusAffect(StatusAffects.DogWarning) < 0) {
            player.statusAffects.add(new StatusAffect("DogWarning", 0, 0, 0, 0)));
            MainScreen.text("<b>\n\nEating the pepper, you realize how dog-like you've become, and you wonder what else the peppers could change...</b>", false);
        }
        if (type == 3) {
            dynStats("lib", 2 + Utils.rand(4), "lus", 5 + Utils.rand(5), "cor", 2 + Utils.rand(4));
            MainScreen.text("\n\nYou feel yourself relaxing as gentle warmth spreads through your body.  Honestly you don't think you'd mind running into a demon or monster right now, they'd make for good entertainment.", false);
            if (player.stats.cor < 50) MainScreen.text("  You shake your head, blushing hotly.  Where did that thought come from?", false);
        }
        if (player.str < 50 && Utils.rand(3) == 0) {
            dynStats("str", (crit));
            if (crit > 1) MainScreen.text("\n\nYour muscles ripple and grow, bulging outwards.", false);
            else MainScreen.text("\n\nYour muscles feel more toned.", false);
            changes++;
        }
        if (player.stats.spe < 30 && Utils.rand(3) == 0 && changes < changeLimit) {
            dynStats("spe", (crit));
            if (crit > 1) MainScreen.text("\n\nYou find your muscles responding quicker, faster, and you feel an odd desire to go for a walk.", false);
            else MainScreen.text("\n\nYou feel quicker.", false);
            changes++;
        }
        if (player.stats.int > 30 && Utils.rand(3) == 0 && changes < changeLimit && type != 3) {
            dynStats("int", (-1 * crit));
            MainScreen.text("\n\nYou feel ", false);
            if (crit > 1) MainScreen.text("MUCH ", false);
            MainScreen.text("dumber.", false);
            changes++;
        }
        //-Remove feather-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.armType == ARM.HARPY && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your feathery arms are shedding their feathery coating.  The wing-like shape your arms once had is gone in a matter of moments, leaving " + player.skinDesc + " behind.", false);
            player.armType = ARM.HUMAN;
            changes++;
        }
        //-Remove chitin-arms (copy this for goblin ale, mino blood, equinum, canine pepps, demon items)
        if (changes < changeLimit && player.armType == ARM.SPIDER && Utils.rand(4) == 0) {
            MainScreen.text("\n\nYou scratch at your biceps absentmindedly, but no matter how much you scratch, it isn't getting rid of the itch.  Glancing down in irritation, you discover that your arms' chitinous covering is flaking away.  The glossy black coating is soon gone, leaving " + player.skinDesc + " behind.", false);
            player.armType = ARM.HUMAN;
            changes++;
        }
        //-Remove feathery hair (copy for equinum, canine peppers, Labova)
        if (changes < changeLimit && player.upperBody.head.hairType == 1 && Utils.rand(4) == 0) {
            //(long):
            if (player.hairLength >= 6) MainScreen.text("\n\nA lock of your downy-soft feather-hair droops over your eye.  Before you can blow the offending down away, you realize the feather is collapsing in on itself.  It continues to curl inward until all that remains is a normal stUtils.Utils.rand of hair.  <b>Your hair is no longer feathery!</b>", false);
            //(short)
            else MainScreen.text("\n\nYou run your fingers through your downy-soft feather-hair while you await the effects of the item you just ingested.  While your hand is up there, it detects a change in the texture of your feathers.  They're completely disappearing, merging down into stUtils.Utils.rands of regular hair.  <b>Your hair is no longer feathery!</b>", false);
            changes++;
            player.upperBody.head.hairType = 0;
        }
        //if(type != 2 && type != 4 && type != 5) MainScreen.text("\n", false);
        //Double Pepper!
        //Xforms/grows dicks to make you have two dogcocks
        if (type == 2) {
            //If already doubled up, GROWTH
            if (player.dogCocks() >= 2) {
                type = 1;
            }
            //If player doesnt have 2 dogdicks
            else {
                //If player has NO dogdicks
                if (player.dogCocks() == 0) {
                    //Dickless - grow two dogpeckers
                    if (player.lowerBody.cockSpot.count() == 0) {
                        player.createCock(7 + Utils.rand(7), 1.5 + Utils.rand(10) / 10);
                        player.createCock(7 + Utils.rand(7), 1.5 + Utils.rand(10) / 10);
                        MainScreen.text("\n\nA painful lump forms on your groin, nearly doubling you over as it presses against your " + player.armorName + ".  You rip open your gear and watch, horrified as the discolored skin splits apart, revealing a pair of red-tipped points.  A feeling of relief, and surprising lust grows as they push forward, glistening red and thickening.  The skin bunches up into an animal-like sheath, while a pair of fat bulges pop free.  You now have two nice thick dog-cocks, with decent sized knots.  Both pulse and dribble animal-pre, arousing you in spite of your attempts at self-control.", false);
                        player.lowerBody.cockSpot.list[0].knotMultiplier = 1.7;
                        player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
                        player.lowerBody.cockSpot.list[1].knotMultiplier = 1.7;
                        player.lowerBody.cockSpot.list[1].cockType = CockType.DOG;
                        dynStats("lus", 50);
                    }
                    //1 dick - grow 1 and convert 1
                    else if (player.lowerBody.cockSpot.count() == 1) {
                        MainScreen.text("\n\nYour " + cockDescript(0) + " vibrates, the veins clearly visible as it reddens and distorts.  The head narrows into a pointed tip while a gradually widening bulge forms around the base.  Where it meets your crotch, the skin bunches up around it, forming a canine-like sheath.  ", false);
                        player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
                        player.lowerBody.cockSpot.list[0].knotMultiplier = 1.5;
                        MainScreen.text("You feel something slippery wiggling inside the new sheath, and another red point peeks out.  In spite of yourself, you start getting turned on by the change, and the new dick slowly slides free, eventually stopping once the thick knot pops free.  The pair of dog-dicks hang there, leaking pre-cum and arousing you far beyond normal.", false);
                        player.createCock(7 + Utils.rand(7), 1.5 + Utils.rand(10) / 10);
                        player.lowerBody.cockSpot.list[1].knotMultiplier = 1.7;
                        player.lowerBody.cockSpot.list[1].cockType = CockType.DOG;
                        dynStats("lib", 2, "lus", 50);
                    }
                    //2 dicks+ - convert first 2 to doggie-dom
                    else {
                        MainScreen.text("\n\nYour crotch twitches, and you pull open your " + player.armorName + " to get a better look.  You watch in horror and arousal as your " + cockDescript(0) + " and " + cockDescript(1) + " both warp and twist, becoming red and pointed, growing thick bulges near the base.  When it stops you have two dog-cocks and an animal-like sheath.  The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed.", false);
                        player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
                        player.lowerBody.cockSpot.list[1].cockType = CockType.DOG;
                        player.lowerBody.cockSpot.list[0].knotMultiplier = 1.4;
                        player.lowerBody.cockSpot.list[0].knotMultiplier = 1.4;
                        dynStats("lib", 2, "lus", 50);
                    }
                }
                //If player has 1 dogdicks
                else {
                    //if player has 1 total
                    if (player.lowerBody.cockSpot.count() == 1) {
                        MainScreen.text("\n\nYou feel something slippery wiggling inside your sheath, and another red point peeks out.  In spite of yourself, you start getting turned on by the change, and the new dick slowly slides free, eventually stopping once the thick knot pops free.  The pair of dog-dicks hang there, leaking pre-cum and arousing you far beyond normal.", false);
                        player.createCock(7 + Utils.rand(7), 1.5 + Utils.rand(10) / 10);
                        player.lowerBody.cockSpot.list[1].cockType = CockType.DOG;
                        player.lowerBody.cockSpot.list[1].knotMultiplier = 1.4;
                        dynStats("lib", 2, "lus", 50);
                    }
                    //if player has more
                    if (player.lowerBody.cockSpot.count() >= 1) {
                        //if first dick is already doggi'ed
                        if (player.lowerBody.cockSpot.list[0].cockType == CockType.DOG) {
                            MainScreen.text("\n\nYour crotch twitches, and you pull open your " + player.armorName + " to get a better look.  You watch in horror and arousal as your " + cockDescript(1) + " warps and twists, becoming red and pointed, just like other dog-dick, growing thick bulges near the base.  When it stops you have two dog-cocks and an animal-like sheath.  The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed.", false);
                            player.lowerBody.cockSpot.list[1].cockType = CockType.DOG;
                            player.lowerBody.cockSpot.list[1].knotMultiplier = 1.4;
                        }
                        //first dick is not dog
                        else {
                            MainScreen.text("\n\nYour crotch twitches, and you pull open your " + player.armorName + " to get a better look.  You watch in horror and arousal as your " + cockDescript(0) + " warps and twists, becoming red and pointed, just like other dog-dick, growing thick bulges near the base.  When it stops you have two dog-cocks and an animal-like sheath.  The whole episode turns you on far more than it should, leaving you dripping animal pre and ready to breed.", false);
                            player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
                            player.lowerBody.cockSpot.list[0].knotMultiplier = 1.4;
                        }
                        dynStats("lib", 2, "lus", 50);
                    }
                }
            }
            player.genderCheck();
        }
        //Knotty knot pepper!
        if (type == 4) {
            //Cocks only!
            if (player.lowerBody.cockSpot.count() > 0) {
                //biggify knots
                if (player.dogCocks() > 0) {
                    temp = 0;
                    //set temp2 to first dogdick for initialization
                    while (temp < player.lowerBody.cockSpot.count()) {
                        if (player.lowerBody.cockSpot.list[temp].cockType == CockType.DOG) {
                            temp2 = temp;
                            break;
                        }
                        else temp++;
                    }
                    //Reset temp for nex tcheck
                    temp = player.lowerBody.cockSpot.count();
                    //Find smallest knot
                    while (temp > 0) {
                        temp--;
                        if (player.lowerBody.cockSpot.list[temp].cockType == CockType.DOG && player.lowerBody.cockSpot.list[temp].knotMultiplier < player.lowerBody.cockSpot.list[temp2].knotMultiplier) temp2 = temp;
                    }
                    //Have smallest knotted cock selected.
                    temp3 = (Utils.rand(2) + 5) / 20 * crit;
                    if (player.lowerBody.cockSpot.list[temp2].knotMultiplier >= 1.5) temp3 /= 2;
                    if (player.lowerBody.cockSpot.list[temp2].knotMultiplier >= 1.75) temp3 /= 2;
                    if (player.lowerBody.cockSpot.list[temp2].knotMultiplier >= 2) temp3 /= 5;
                    player.lowerBody.cockSpot.list[temp2].knotMultiplier += (temp3);
                    MainScreen.text("\n\n", false);
                    if (temp3 < .06) MainScreen.text("Your " + Appearance.cockNoun(CockType.DOG) + " feels unusually tight in your sheath as your knot grows.", false);
                    if (temp3 >= .06 && temp3 <= .12) MainScreen.text("Your " + Appearance.cockNoun(CockType.DOG) + " pops free of your sheath, thickening nicely into a bigger knot.", false);
                    if (temp3 > .12) MainScreen.text("Your " + Appearance.cockNoun(CockType.DOG) + " surges free of your sheath, swelling thicker with each passing second.  Your knot bulges out at the base, growing far beyond normal.", false);
                    dynStats("sen", .5, "lus", 5 * crit);
                }
                //Grow dogdick with big knot
                else {
                    MainScreen.text("\n\nYour " + cockDescript(0) + " twitches, reshaping itself.  The crown tapers down to a point while the base begins swelling.  It isn't painful in the slightest, actually kind of pleasant.  Your dog-like knot slowly fills up like a balloon, eventually stopping when it's nearly twice as thick as the rest.  You touch and shiver with pleasure, oozing pre-cum.", false);
                    player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
                    player.lowerBody.cockSpot.list[0].knotMultiplier = 2.1;
                }
            }
            //You wasted knot pepper!
            else MainScreen.text("\n\nA slight wave of nausea passes through you.  It seems this pepper does not quite agree with your body.", false);
        }
        //GROW BALLS
        if (type == 5) {
            if (player.lowerBody.balls <= 1) {
                MainScreen.text("\n\nA spike of pain doubles you up, nearly making you vomit.  You stay like that, nearly crying, as a palpable sense of relief suddenly washes over you.  You look down and realize you now have a small sack, complete with two relatively small balls.", false);
                player.lowerBody.balls = 2;
                player.lowerBody.ballSize = 1;
                dynStats("lib", 2, "lus", -10);
            }
            else {
                //Makes your balls biggah!
                player.lowerBody.ballSize++;
                //They grow slower as they get bigger...
                if (player.lowerBody.ballSize > 10) player.lowerBody.ballSize -= .5;
                //Texts
                if (player.lowerBody.ballSize <= 2) MainScreen.text("\n\nA flash of warmth passes through you and a sudden weight develops in your groin.  You pause to examine the changes and your roving fingers discover your " + simpleBallsDescript() + " have grown larger than a human's.", false);
                if (player.lowerBody.ballSize > 2) MainScreen.text("\n\nA sudden onset of heat envelops your groin, focusing on your " + sackDescript() + ".  Walking becomes difficult as you discover your " + simpleBallsDescript() + " have enlarged again.", false);
                dynStats("lib", 1, "lus", 3);
            }
        }
        //Sexual Stuff Now
        //------------------
        //Man-Parts
        //3 Changes,
        //1. Cock Xform
        //2. Knot Size++
        //3. cumMultiplier++ (to max of 1.5)
        if (player.lowerBody.cockSpot.count() > 0) {
            //Grow knot on smallest knotted dog cock
            if (type != 4 && player.dogCocks() > 0 && ((changes < changeLimit && Utils.rand(1.4) == 0) || type == 1)) {
                temp = 0;
                //set temp2 to first dogdick for initialization
                while (temp < player.lowerBody.cockSpot.count()) {
                    if (player.lowerBody.cockSpot.list[temp].cockType == CockType.DOG) {
                        temp2 = temp;
                        break;
                    }
                    else temp++;
                }
                //Reset temp for nex tcheck
                temp = player.lowerBody.cockSpot.count();
                //Find smallest knot
                while (temp > 0) {
                    temp--;
                    if (player.lowerBody.cockSpot.list[temp].cockType == CockType.DOG && player.lowerBody.cockSpot.list[temp].knotMultiplier < player.lowerBody.cockSpot.list[temp2].knotMultiplier) temp2 = temp;
                }
                //Have smallest knotted cock selected.
                temp3 = (Utils.rand(2) + 1) / 20 * crit;
                if (player.lowerBody.cockSpot.list[temp2].knotMultiplier >= 1.5) temp3 /= 2;
                if (player.lowerBody.cockSpot.list[temp2].knotMultiplier >= 1.75) temp3 /= 2;
                if (player.lowerBody.cockSpot.list[temp2].knotMultiplier >= 2) temp3 /= 5;
                player.lowerBody.cockSpot.list[temp2].knotMultiplier += (temp3);
                if (temp3 < .06) MainScreen.text("\n\nYour " + cockDescript(temp2) + " feels unusually tight in your sheath as your knot grows.", false);
                if (temp3 >= .06 && temp3 <= .12) MainScreen.text("\n\nYour " + cockDescript(temp2) + " pops free of your sheath, thickening nicely into a bigger knot.", false);
                if (temp3 > .12) MainScreen.text("\n\nYour " + cockDescript(temp2) + " surges free of your sheath, swelling thicker with each passing second.  Your knot bulges out at the base, growing far beyond normal.", false);
                dynStats("sen", .5, "lus", 5 * crit);
                changes++;
            }
            //Cock Xform if player has free cocks.
            if (player.dogCocks() < player.lowerBody.cockSpot.count() && ((changes < changeLimit && Utils.rand(1.6)) || type == 1) == 0) {
                //Select first human cock
                temp = player.lowerBody.cockSpot.count();
                temp2 = 0;
                while (temp > 0 && temp2 == 0) {
                    temp--;
                    //Store cock index if not a dogCock and exit loop.
                    if (player.lowerBody.cockSpot.list[temp].cockType != CockType.DOG) {
                        temp3 = temp;
                        //kicking out of tah loop!
                        temp2 = 1000;
                    }
                }
                //Talk about it
                //Hooooman
                if (player.lowerBody.cockSpot.list[temp3].cockType == CockType.HUMAN) {
                    MainScreen.text("\n\nYour " + cockDescript(temp3) + " clenches painfully, becoming achingly, throbbingly erect.  A tightness seems to squeeze around the base, and you wince as you see your skin and flesh shifting forwards into a canine-looking sheath.  You shudder as the crown of your " + cockDescript(temp3) + " reshapes into a point, the sensations nearly too much for you.  You throw back your head as the transformation completes, your " + Appearance.cockNoun(CockType.DOG) + " much thicker than it ever was before.  <b>You now have a dog-cock.</b>", false);
                    dynStats("sen", 10, "lus", 5 * crit);
                }
                //Horse
                if (player.lowerBody.cockSpot.list[temp3].cockType == CockType.HORSE) {
                    MainScreen.text("\n\nYour " + Appearance.cockNoun(CockType.HORSE) + " shrinks, the extra equine length seeming to shift into girth.  The flared tip vanishes into a more pointed form, a thick knotted bulge forming just above your sheath.  <b>You now have a dog-cock.</b>", false);
                    //Tweak length/thickness.
                    if (player.lowerBody.cockSpot.list[temp3].cockLength > 6) player.lowerBody.cockSpot.list[temp3].cockLength -= 2;
                    else player.lowerBody.cockSpot.list[temp3].cockLength -= .5;
                    player.lowerBody.cockSpot.list[temp3].cockThickness += .5;

                    dynStats("sen", 4, "lus", 5 * crit);
                }
                //Tentacular Tuesday!
                if (player.lowerBody.cockSpot.list[temp3].cockType == CockType.TENTACLE) {
                    MainScreen.text("\n\nYour " + cockDescript(temp3) + " coils in on itself, reshaping and losing its plant-like coloration as it thickens near the base, bulging out in a very canine-looking knot.  Your skin bunches painfully around the base, forming into a sheath.  <b>You now have a dog-cock.</b>", false);
                    dynStats("sen", 4, "lus", 5 * crit);
                }
                //Misc
                if (player.lowerBody.cockSpot.list[temp3].cockType.Index > 4) {
                    MainScreen.text("\n\nYour " + cockDescript(temp3) + " trembles, reshaping itself into a shiny red doggie-dick with a fat knot at the base.  <b>You now have a dog-cock.</b>", false);
                    dynStats("sen", 4, "lus", 5 * crit);
                }
                temp = 0;
                //Demon
                if (player.lowerBody.cockSpot.list[temp3].cockType == CockType.DEMON) {
                    MainScreen.text("\n\nYour " + cockDescript(temp3) + " color shifts red for a moment and begins to swell at the base, but within moments it smooths out, retaining its distinctive demonic shape, only perhaps a bit thicker.", false);
                    dynStats("sen", 1, "lus", 2 * crit);
                    temp = 1;
                }
                //Xform it!
                player.lowerBody.cockSpot.list[temp3].cockType = CockType.DOG;
                player.lowerBody.cockSpot.list[temp3].knotMultiplier = 1.1;
                player.lowerBody.cockSpot.list[temp3].thickenCock(2);
                if (temp == 1) {
                    player.lowerBody.cockSpot.list[temp3].cockType = CockType.DEMON;
                }
                changes++;

            }
            //Cum Multiplier Xform
            if (player.cumMultiplier < 2 && Utils.rand(2) == 0 && changes < changeLimit) {
                temp = 1.5;
                //Lots of cum raises cum multiplier cap to 2 instead of 1.5
                if (player.perks.has("MessyOrgasms")) temp = 2;
                if (temp < player.cumMultiplier + .05 * crit) {
                    changes--;
                }
                else {
                    player.cumMultiplier += .05 * crit;
                    //Flavor text
                    if (player.lowerBody.balls == 0) MainScreen.text("\n\nYou feel a churning inside your gut as something inside you changes.", false);
                    if (player.lowerBody.balls > 0) MainScreen.text("\n\nYou feel a churning in your " + ballsDescriptLight() + ".  It quickly settles, leaving them feeling somewhat more dense.", false);
                    if (crit > 1) MainScreen.text("  A bit of milky pre dribbles from your " + multiCockDescriptLight() + ", pushed out by the change.", false);
                }
                changes++;
            }
            //Oversized pepper
            if (type == 1) {
                //GET LONGER
                //single cock
                if (player.lowerBody.cockSpot.count() == 1) {
                    temp2 = player.increaseCock(0, Utils.rand(4) + 3);
                    temp = 0;
                    dynStats("sen", 1, "lus", 10);
                }
                //Multicock
                else {
                    //Find smallest cock
                    //Temp2 = smallness size
                    //temp = current smallest
                    temp3 = player.lowerBody.cockSpot.count();
                    temp = 0;
                    while (temp3 > 0) {
                        temp3--;
                        //If current cock is smaller than saved, switch values.
                        if (player.lowerBody.cockSpot.list[temp].cockLength > player.lowerBody.cockSpot.list[temp3].cockLength) {
                            temp2 = player.lowerBody.cockSpot.list[temp3].cockLength;
                            temp = temp3;
                        }
                    }
                    //Grow smallest cock!
                    //temp2 changes to growth amount
                    temp2 = player.increaseCock(temp, Utils.rand(4) + 3);
                    dynStats("sen", 1, "lus", 10);
                    if (player.lowerBody.cockSpot.list[temp].cockThickness <= 2) player.lowerBody.cockSpot.list[temp].thickenCock(1);
                }
                if (temp2 > 2) MainScreen.text("\n\nYour " + cockDescript(temp) + " tightens painfully, inches of bulging dick-flesh pouring out from your crotch as it grows longer.  Thick pre forms at the pointed tip, drawn out from the pleasure of the change.", false);
                if (temp2 > 1 && temp2 <= 2) MainScreen.text("\n\nAching pressure builds within your crotch, suddenly releasing as an inch or more of extra dick-flesh spills out.  A dollop of pre beads on the head of your enlarged " + cockDescript(temp) + " from the pleasure of the growth.", false);
                if (temp2 <= 1) MainScreen.text("\n\nA slight pressure builds and releases as your " + cockDescript(temp) + " pushes a bit further out of your crotch.", false);
            }
        }
        //Female Stuff
        //Multiboobages
        if (player.upperBody.chest.count() > 0) {
            //if bigger than A cup
            if (player.upperBody.chest.list[0].breastRating > 0 && player.lowerBody.vaginaSpot.count() > 0) {
                //Doggies only get 3 rows of tits! FENOXO HAS SPOKEN
                if (player.upperBody.chest.count() < 3 && Utils.rand(2) == 0 && changes < changeLimit) {
                    player.createBreastRow();
                    //Store temp to the index of the newest row
                    temp = player.upperBody.chest.count() - 1;
                    //Breasts are too small to grow a new row, so they get bigger first
                    //But ONLY if player has a vagina (dont want dudes weirded out)
                    if (player.lowerBody.vaginaSpot.count() > 0 && player.upperBody.chest.list[0].breastRating <= player.upperBody.chest.count()) {
                        MainScreen.text("\n\nYour " + breastDescript(0) + " feel constrained and painful against your top as they grow larger by the moment, finally stopping as they reach ", false);
                        player.upperBody.chest.list[0].breastRating += 2;
                        MainScreen.text(player.breastCup(0) + " size.  But it doesn't stop there, you feel a tightness beginning lower on your torso...", false);
                        changes++;
                    }
                    //Had 1 row to start
                    if (player.upperBody.chest.count() == 2) {
                        //1 size below primary breast row!
                        player.upperBody.chest.list[temp].breastRating = player.upperBody.chest.list[0].breastRating - 1;
                        if (player.upperBody.chest.list[0].breastRating - 1 == 0) MainScreen.text("\n\nA second set of breasts forms under your current pair, stopping while they are still fairly flat and masculine looking.", false);
                        else MainScreen.text("\n\nA second set of breasts bulges forth under your current pair, stopping as they reach " + player.breastCup(temp) + "s.", false);
                        MainScreen.text("  A sensitive nub grows on the summit of each new tit, becoming a new nipple.", false);
                        dynStats("sen", 6, "lus", 5);
                        changes++;
                    }
                    //Many breast Rows - requires larger primary tits...
                    if (player.upperBody.chest.count() > 2 && player.upperBody.chest.list[0].breastRating > player.upperBody.chest.count()) {
                        dynStats("sen", 6, "lus", 5);
                        //New row's size = the size of the row above -1
                        player.upperBody.chest.list[temp].breastRating = player.upperBody.chest.list[temp - 1].breastRating - 1;
                        //If second row are super small but primary row is huge it could go negative.
                        //This corrects that problem.
                        if (player.upperBody.chest.list[temp].breastRating < 0) player.upperBody.chest.list[temp].breastRating = 0;
                        if (player.upperBody.chest.list[temp - 1].breastRating < 0) player.upperBody.chest.list[temp - 1].breastRating = 0;
                        if (player.upperBody.chest.list[temp].breastRating == 0) MainScreen.text("\n\nYour abdomen tingles and twitches as a new row of breasts sprouts below the others.  Your new breasts stay flat and masculine, not growing any larger.", false);
                        else MainScreen.text("\n\nYour abdomen tingles and twitches as a new row of " + player.breastCup(temp) + " " + breastDescript(temp) + " sprouts below your others.", false);
                        MainScreen.text("  A sensitive nub grows on the summit of each new tit, becoming a new nipple.", false);
                        changes++;
                    }
                    //Extra sensitive if crit
                    if (crit > 1) {
                        if (crit > 2) {
                            MainScreen.text("  You heft your new chest experimentally, exploring the new flesh with tender touches.  Your eyes nearly roll back in your head from the intense feelings.", false);
                            dynStats("sen", 6, "lus", 15, "cor", 0)
                        }
                        else {
                            MainScreen.text("  You touch your new nipples with a mixture of awe and desire, the experience arousing beyond measure.  You squeal in delight, nearly orgasming, but in time finding the willpower to stop yourself.", false);
                            dynStats("sen", 3, "lus", 10);
                        }
                    }

                }
                //If already has max doggie breasts!
                else if (Utils.rand(2) == 0) {
                    //Check for size mismatches, and move closer to spec!
                    temp = player.upperBody.chest.count();
                    temp2 = 0;
                    let evened: boolean = false;
                    //Check each row, and if the row above or below it is
                    while (temp > 1 && temp2 == 0) {
                        temp--;
                        //Gimme a sec
                        if (player.upperBody.chest.list[temp].breastRating + 1 < player.upperBody.chest.list[temp - 1].breastRating) {
                            if (!evened) {
                                evened = true;
                                MainScreen.text("\n", false);
                            }
                            MainScreen.text("\nYour ", false);
                            if (temp == 0) MainScreen.text("first ", false);
                            if (temp == 1) MainScreen.text("second ", false);
                            if (temp == 2) MainScreen.text("third ", false);
                            if (temp == 3) MainScreen.text("fourth ", false);
                            if (temp == 4) MainScreen.text("fifth ", false);
                            if (temp > 4) MainScreen.text("", false);
                            MainScreen.text("row of " + breastDescript(temp) + " grows larger, as if jealous of the jiggling flesh above.", false);
                            temp2 = (player.upperBody.chest.list[temp - 1].breastRating) - player.upperBody.chest.list[temp].breastRating - 1;
                            if (temp2 > 5) temp2 = 5;
                            if (temp2 < 1) temp2 = 1;
                            player.upperBody.chest.list[temp].breastRating += temp2;
                        }
                    }
                }
            }
        }
        //Grow tits if have NO breasts/nipples AT ALL
        else if (Utils.rand(2) == 0 && changes < changeLimit) {
            MainScreen.text("\n\nYour chest tingles uncomfortably as your center of balance shifts.  <b>You now have a pair of B-cup breasts.</b>", false);
            MainScreen.text("  A sensitive nub grows on the summit of each tit, becoming a new nipple.", false);
            player.createBreastRow();
            player.upperBody.chest.list[0].breastRating = 2;
            player.upperBody.chest.list[0].breasts = 2;
            dynStats("sen", 4, "lus", 6);
            changes++;
        }
        //Go into heat
        if (Utils.rand(2) == 0 && changes < changeLimit) {
            if (player.goIntoHeat(true)) {
                changes++;
            }
        }
        if (changes < changeLimit && player.dogScore() >= 3 && Utils.rand(4) == 0) {
            changes++;
            MainScreen.text("\n\n", false);
            MainScreen.text("Images and thoughts come unbidden to your mind, overwhelming your control as you rapidly lose yourself in them, daydreaming of... ", false);
            //cawk fantasies
            if (player.gender <= 1 || (player.gender == 3 && Utils.rand(2) == 0)) {
                MainScreen.text("bounding through the woods, hunting with your master.  Feeling the wind in your fur and the thrill of the hunt coursing through your veins intoxicates you.  You have your nose to the ground, tracking your quarry as you run, until a heavenly scent stops you in your tracks.", false);
                dynStats("lus", 5 + player.stats.lib / 20);
                //break1
                if (player.stats.cor < 33 || !player.lowerBody.cockSpot.hasCock()) MainScreen.text("\nYou shake your head to clear the unwanted fantasy from your mind, repulsed by it.", false);
                else {
                    MainScreen.text("  Heart pounding, your shaft pops free of its sheath on instinct, as you take off after the new scent.  Caught firmly in the grip of a female's heat, you ignore your master's cry as you disappear into the wild, " + Appearance.cockNoun(CockType.DOG) + " growing harder as you near your quarry.  You burst through a bush, spotting a white-furred female.  She drops, exposing her dripping fem-sex to you, the musky scent of her sex channeling straight through your nose and sliding into your " + Appearance.cockNoun(CockType.DOG) + ".", false);
                    dynStats("lus", 5 + player.stats.lib / 20);
                    //Break 2
                    if (player.stats.cor < 66) MainScreen.text("\nYou blink a few times, the fantasy fading as you master yourself.  That daydream was so strange, yet so hot.", false);
                    else {
                        MainScreen.text("  Unable to wait any longer, you mount her, pressing your bulging knot against her vulva as she yips in pleasure. The heat of her sex is unreal, the tight passage gripping you like a vice as you jackhammer against her, biting her neck gently in spite of the violent pounding.", false);
                        dynStats("lus", 5 + player.stats.lib / 20);
                        //break3
                        if (player.stats.cor < 80) {
                            if (player.lowerBody.vaginaSpot.count() > 0) MainScreen.text("\nYou reluctantly pry your hand from your aching " + vaginaDescript(0) + " as you drag yourself out of your fantasy.", false);
                            else MainScreen.text("\nYou reluctantly pry your hand from your aching " + cockDescript(0) + " as you drag yourself out of your fantasy.", false);
                        }
                        else {
                            MainScreen.text("  At last your knot pops into her juicy snatch, splattering her groin with a smattering of her arousal.  The scents of your mating reach a peak as the velvet vice around your " + Appearance.cockNoun(CockType.DOG) + " quivers in the most indescribably pleasant way.  You clamp down on her hide as your whole body tenses, unleashing a torrent of cum into her sex.  Each blast is accompanied by a squeeze of her hot passage, milking you of the last of your spooge.  Your " + player.legs() + " give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.", false);
                            dynStats("lus", 5 + player.stats.lib / 20);
                        }
                    }
                }
            }
            //Pure female fantasies
            else if (player.lowerBody.vaginaSpot.hasVagina()) {
                MainScreen.text("wagging your dripping " + vaginaDescript(0) + " before a pack of horny wolves, watching their shiny red doggie-pricks practically jump out of their sheaths at your fertile scent.", false);
                dynStats("lus", 5 + player.stats.lib / 20);
                //BREAK 1
                if (player.stats.cor < 33) {
                    MainScreen.text("\nYou shake your head to clear the unwanted fantasy from your mind, repulsed by it.", false);
                }
                else {
                    MainScreen.text("  In moments they begin their advance, plunging their pointed beast-dicks into you, one after another.  You yip and howl with pleasure as each one takes his turn knotting you.", false);
                    dynStats("lus", 5 + player.stats.lib / 20);
                    //BREAK 2
                    if (player.stats.cor <= 66) {
                        MainScreen.text("\nYou blink a few times, the fantasy fading as you master yourself.  That daydream was so strange, yet so hot.", false);
                    }
                    else {
                        MainScreen.text("  The feeling of all that hot wolf-spooge spilling from your overfilled snatch and running down your thighs is heavenly, nearly making you orgasm on the spot.  You see the alpha of the pack is hard again, and his impressive member is throbbing with the need to breed you.", false);
                        dynStats("lus", 5 + player.stats.lib / 20);
                        //break3
                        if (player.stats.cor < 80) {
                            MainScreen.text("\nYou reluctantly pry your hand from your aching " + vaginaDescript(0) + " as you drag yourself out of your fantasy.", false);
                        }
                        else {
                            MainScreen.text("  You growl with discomfort as he pushes into your abused wetness, stretching you tightly, every beat of his heart vibrating through your nethers.  With exquisite force, he buries his knot in you and begins filling you with his potent seed, impregnating you for sure. Your knees give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.", false);
                            dynStats("lus", 5 + player.stats.lib / 20);
                        }
                    }
                }
            }
            else {
                MainScreen.text("wagging your [asshole] before a pack of horny wolves, watching their shiny red doggie-pricks practically jump out of their sheaths at you after going so long without a female in the pack.");
                dynStats("lus", 5 + player.stats.lib / 20);
                //BREAK 1
                if (player.stats.cor < 33) {
                    MainScreen.text("\nYou shake your head to clear the unwanted fantasy from your mind, repulsed by it.", false);
                }
                else {
                    MainScreen.text("  In moments they begin their advance, plunging their pointed beast-dicks into you, one after another.  You yip and howl with pleasure as each one takes his turn knotting you.", false);
                    dynStats("lus", 5 + player.stats.lib / 20);
                    //BREAK 2
                    if (player.stats.cor <= 66) {
                        MainScreen.text("\nYou blink a few times, the fantasy fading as you master yourself.  That daydream was so strange, yet so hot.", false);
                    }
                    else {
                        MainScreen.text("  The feeling of all that hot wolf-spooge spilling from your overfilled ass and running down your thighs is heavenly, nearly making you orgasm on the spot.  You see the alpha of the pack is hard again, and his impressive member is throbbing with the need to spend his lust on you.", false);
                        dynStats("lus", 5 + player.stats.lib / 20);
                        //break3
                        if (player.stats.cor < 80) {
                            MainScreen.text("\nYou reluctantly pry your hand from your aching asshole as you drag yourself out of your fantasy.", false);
                        }
                        else {
                            MainScreen.text("  You growl with discomfort as he pushes into your abused, wet hole, stretching you tightly, every beat of his heart vibrating through your hindquarters.  With exquisite force, he buries his knot in you and begins filling you with his potent seed, impregnating you for sure. Your knees give out as your fantasy nearly brings you to orgasm, the sudden impact with the ground jarring you from your daydream.", false);
                            dynStats("lus", 5 + player.stats.lib / 20);
                        }
                    }
                }
            }
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
        //Master Furry Appearance Order:
        //Tail -> Ears -> Paws -> Fur -> Face
        //Dog-face requires fur & paws  Should be last morph to take place
        if (Utils.rand(5) == 0 && changes < changeLimit &&
            player.faceType != FACE.DOG && player.skinType == SKIN.FUR &&
            player.lowerBody == LOWER_BODY.DOG) {
            if (player.faceType == FACE.HORSE) MainScreen.text("\n\nYour face is wracked with pain.  You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something else.  <b>Your horse-like features rearrange to take on many canine aspects.</b>", false);
            else MainScreen.text("\n\nYour face is wracked with pain.  You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something... different.  You find a puddle to view your reflection...<b>your face is now a cross between human and canine features.</b>", false);
            player.faceType = FACE.DOG;
            changes++;
        }
        if (type == 3 && player.hairColor != "midnight black") {
            if (player.skinType == SKIN.FUR) MainScreen.text("<b>\n\nYour fur and hair tingles, growing in thicker than ever as darkness begins to spread from the roots, turning it midnight black.</b>", false);
            else MainScreen.text("<b>\n\nYour " + player.skinDesc + " itches like crazy as fur grows out from it, coating your body.  It's incredibly dense and black as the middle of a moonless night.</b>", false);
            player.skinType = SKIN.FUR;
            player.skinAdj = "thick";
            player.skinDesc = "fur";
            player.hairColor = "midnight black";
        }
        //Become furred - requires paws and tail
        if (Utils.rand(4) == 0 && changes < changeLimit &&
            player.lowerBody == LOWER_BODY.DOG && player.tailType == TAIL.DOG &&
            player.skinType != SKIN.FUR) {
            if (player.skinType == SKIN.PLAIN) MainScreen.text("\n\nYour skin itches intensely.  You gaze down as more and more hairs break forth from your skin, quickly transforming into a soft coat of fur.  <b>You are now covered in " + player.hairColor + " fur from head to toe.</b>", false);
            if (player.skinType == SKIN.SCALES) MainScreen.text("\n\nYour scales itch incessantly.  You scratch, feeling them flake off to reveal a coat of " + player.hairColor + " fur growing out from below!  <b>You are now covered in " + player.hairColor + " fur from head to toe.</b>", false);
            player.skinType = SKIN.FUR;
            player.skinDesc = "fur";
            changes++;
        }
        //Change to paws - requires tail and ears
        if (Utils.rand(3) == 0 && player.lowerBody != LOWER_BODY.DOG && player.tailType == TAIL.DOG && player.upperBody.head.earType == EARS.DOG && changes < changeLimit) {
            //Feet -> paws
            if (player.lowerBody == LOWER_BODY.HUMAN) MainScreen.text("\n\nYou scream in agony as you feel the bones in your feet break and begin to rearrange. <b>You now have paws</b>.", false);
            //Hooves -> Paws
            else if (player.lowerBody == LOWER_BODY.HOOFED) MainScreen.text("\n\nYou feel your hooves suddenly splinter, growing into five unique digits.  Their flesh softens as your hooves reshape into furred paws.", false);
            else MainScreen.text("\n\nYour lower body is wracked by pain!  Once it passes, you discover that you're standing on fur-covered paws!  <b>You now have paws</b>.", false);
            player.lowerBody = LOWER_BODY.DOG;
            changes++;
        }
        //Change to dog-ears!  Requires dog-tail
        if (Utils.rand(2) == 0 && player.upperBody.head.earType != EARS.DOG && player.tailType == TAIL.DOG && changes < changeLimit) {
            if (player.upperBody.head.earType == -1) MainScreen.text("\n\nTwo painful nubs begin sprouting from your head, growing and opening into canine ears.  ", false);
            if (player.upperBody.head.earType == EARS.HUMAN) MainScreen.text("\n\nThe skin on the sides of your face stretches painfully as your ears migrate upwards, towards the top of your head.  They shift and elongate, becoming canine in nature.  ", false);
            if (player.upperBody.head.earType == EARS.HORSE) MainScreen.text("\n\nYour equine ears twist as they transform into canine versions.  ", false);
            if (player.upperBody.head.earType > EARS.DOG) MainScreen.text("\n\nYour ears transform, becoming more canine in appearance.  ", false);
            player.upperBody.head.earType = EARS.DOG;
            player.earValue = 2;
            MainScreen.text("<b>You now have dog ears.</b>", false);
            changes++;
        }
        //Grow tail if not dog-tailed
        if (Utils.rand(3) == 0 && changes < changeLimit && player.tailType != TAIL.DOG) {
            if (player.tailType == TAIL.NONE) MainScreen.text("\n\nA pressure builds on your backside.  You feel under your clothes and discover an odd bump that seems to be growing larger by the moment.  In seconds it passes between your fingers, bursts out the back of your clothes, and grows most of the way to the ground.  A thick coat of fur springs up to cover your new tail.  ", false);
            if (player.tailType == TAIL.HORSE) MainScreen.text("\n\nYou feel a tightness in your rump, matched by the tightness with which the stUtils.Utils.rands of your tail clump together.  In seconds they fuse into a single tail, rapidly sprouting thick fur.  ", false);
            if (player.tailType == TAIL.DEMONIC) MainScreen.text("\n\nThe tip of your tail feels strange.  As you pull it around to check on it, the spaded tip disappears, quickly replaced by a thick coat of fur over the entire surface of your tail.  ", false);
            //Generic message for now
            if (player.tailType >= TAIL.COW) MainScreen.text("\n\nYou feel your backside shift and change, flesh molding and displacing into a long puffy tail!  ", false);
            changes++;
            player.tailType = TAIL.DOG;
            MainScreen.text("<b>You now have a dog-tail.</b>", false);
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        if (player.skinType == SKIN.FUR && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYou become more... solid.  Sinewy.  A memory comes unbidden from your youth of a grizzled wolf you encountered while hunting, covered in scars, yet still moving with an easy grace.  You imagine that must have felt something like this.", false);
            dynStats("tou", 4, "sen", -3);
            changes++;
        }
        //If no changes yay
        if (changes == 0) {
            MainScreen.text("\n\nInhuman vitality spreads through your body, invigorating you!\n", false);
            HPChange(20, true);
            dynStats("lus", 3);
        }

    }
}