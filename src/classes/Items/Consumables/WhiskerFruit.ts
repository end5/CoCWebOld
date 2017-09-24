import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class WhiskerFruit extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        let changes: number = 0;
        let changeLimit: number = 1;
        let temp2: number = 0;
        let temp3: number = 0;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        //Text go!
        MainScreen.text("", true);
        MainScreen.text("You take a bite of the fruit and gulp it down. It's thick and juicy and has an almost overpowering sweetness. Nevertheless, it is delicious and you certainly could use a meal.  You devour the fruit, stopping only when the hard, nubby pit is left; which you toss aside.", false);
        //Speed raises up to 75
        if (player.stats.spe < 75 && Utils.rand(3) == 0 && changes < changeLimit) {
            //low speed
            if (player.stats.spe <= 30) {
                MainScreen.text("\n\nYou feel... more balanced, sure of step. You're certain that you've become just a little bit faster.", false);
                dynStats("spe", 2);
            }
            //medium speed
            else if (player.stats.spe <= 60) {
                MainScreen.text("\n\nYou stumble as you shift position, surprised by how quickly you move. After a moment or two of disorientation, you adjust. You're certain that you can run faster now.", false);
                dynStats("spe", 1);
            }
            //high speed
            else {
                MainScreen.text("\n\nYou pause mid-step and crouch. Your leg muscles have cramped up like crazy. After a few moments, the pain passes and you feel like you could chase anything down.", false);
                dynStats("spe", .5);
            }
            changes++;
        }
        //Strength raises to 40
        if (player.str < 40 && Utils.rand(3) == 0 && changes < changeLimit) {
            if (Utils.rand(2) == 0) MainScreen.text("\n\nYour muscles feel taut, like a coiled spring, and a bit more on edge.", false);
            else MainScreen.text("\n\nYou arch your back as your muscles clench painfully.  The cramp passes swiftly, leaving you feeling like you've gotten a bit stronger.", false);
            dynStats("str", 1);
            changes++;
        }
        //Strength ALWAYS drops if over 60
        //Does not add to change total
        else if (player.str > 60 && Utils.rand(2) == 0) {
            MainScreen.text("\n\nShivers run from your head to your toes, leaving you feeling weak.  Looking yourself over, your muscles seemed to have lost some bulk.", false);
            dynStats("str", -2);
        }
        //Toughness drops if over 50
        //Does not add to change total
        if (player.tou > 50 && Utils.rand(2) == 0) {
            MainScreen.text("\n\nYour body seems to compress momentarily, becoming leaner and noticeably less tough.", false);
            dynStats("tou", -2);
        }
        //Intelliloss
        if (Utils.rand(4) == 0 && changes < changeLimit) {
            //low intelligence
            if (player.stats.int < 15) MainScreen.text("\n\nYou feel like something is slipping away from you but can't figure out exactly what's happening.  You scrunch up your " + player.face() + ", trying to understand the situation.  Before you can reach any kind of conclusion, something glitters in the distance, distracting your feeble mind long enough for you to forget the problem entirely.", false);
            //medium intelligence
            else if (player.stats.int < 50) {
                MainScreen.text("\n\nYour mind feels somewhat sluggish, and you wonder if you should just lie down ", false);
                if (Utils.rand(2) == 0) {
                    MainScreen.text("somewhere and ", false);
                    temp = Utils.rand(3);
                    if (temp == 0) MainScreen.text("toss a ball around or something", false);
                    else if (temp == 1) MainScreen.text("play with some yarn", false);
                    else if (temp == 2) MainScreen.text("take a nap and stop worrying", false);
                }
                else MainScreen.text("in the sun and let your troubles slip away", false);
                MainScreen.text(".", false);
            }
            //High intelligence
            else MainScreen.text("\n\nYou start to feel a bit dizzy, but the sensation quickly passes.  Thinking hard on it, you mentally brush away the fuzziness that seems to permeate your brain and determine that this fruit may have actually made you dumber.  It would be best not to eat too much of it.", false);
            dynStats("int", -1);
            changes++;
        }
        //Libido gain
        if (player.stats.lib < 80 && changes < changeLimit && Utils.rand(4) == 0) {
            //Cat dicked folks
            if (player.catCocks() > 0) {
                temp = player.findFirstCockType(CockType.CAT);
                MainScreen.text("\n\nYou feel your " + cockDescript(temp) + " growing hard, the barbs becoming more sensitive. You gently run your hands down them and imagine the feeling of raking the insides of a cunt as you pull.  The fantasy continues, and after ejaculating and hearing the female yowl with pleasure, you shake your head and try to drive off the image.  ", false);
                if (player.stats.cor < 33) MainScreen.text("You need to control yourself better.", false);
                else if (player.stats.cor < 66) MainScreen.text("You're not sure how you feel about the fantasy.", false);
                else MainScreen.text("You hope to find a willing partner to make this a reality.", false);
            }
            //Else –
            else {
                MainScreen.text("\n\nA rush of tingling warmth spreads through your body as it digests the fruit.  You can feel your blood pumping through your extremities, making them feel sensitive and surprisingly sensual.  It's going to be hard to resist getting ", false);
                if (player.lust > 60) MainScreen.text("even more ", false);
                MainScreen.text("turned on.", false);
            }
            dynStats("lib", 1, "sen", .25);
            changes++;
        }

        //Sexual changes would go here if I wasn't a tard.
        //Heat
        if (Utils.rand(4) == 0 && changes < changeLimit) {
            let intensified: boolean = player.inHeat;

            if (player.goIntoHeat(false)) {
                if (intensified) {
                    if (Utils.rand(2) == 0) MainScreen.text("\n\nThe itch inside your " + vaginaDescript(0) + " is growing stronger, and you desperately want to find a nice cock to massage the inside.", false);
                    else MainScreen.text("\n\nThe need inside your " + vaginaDescript(0) + " grows even stronger.  You desperately need to find a mate to 'scratch your itch' and fill your womb with kittens.  It's difficult NOT to think about a cock slipping inside your moist fuck-tunnel, and at this point you'll have a hard time resisting ANY male who approaches.", false);
                }
                else {
                    MainScreen.text("\n\nThe interior of your " + vaginaDescript(0) + " clenches tightly, squeezing with reflexive, aching need.  Your skin flushes hot ", false);
                    if (player.skinType == SKIN.FUR) MainScreen.text("underneath your fur ", false);
                    MainScreen.text("as images and fantasies ", false);
                    if (player.stats.cor < 50) MainScreen.text("assault ", false);
                    else MainScreen.text("fill ", false);
                    MainScreen.text(" your mind.  Lithe cat-boys with their perfect, spine-covered cocks line up behind you, and you bend over to present your needy pussy to them.  You tremble with the desire to feel the exotic texture of their soft barbs rubbing your inner walls, smearing your " + vaginaDescript(0) + " with their cum as you're impregnated.  Shivering, you recover from the fantasy and pull your fingers from your aroused sex.  <b>It would seem you've gone into heat!</b>", false);
                }
                changes++;
            }
        }

        //Shrink the boobalies down to A for men or C for girls.
        if (changes < changeLimit && Utils.rand(4) == 0 && !Flags.get(FlagEnum.HYPER_HAPPY)) {
            temp2 = 0;
            temp3 = 0;
            //Determine if shrinkage is required
            //and set temp2 to threshold
            if (!player.lowerBody.vaginaSpot.hasVagina() && player.upperBody.chest.BreastRatingLargest[0].breastRating > 2) temp2 = 2;
            else if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 4) temp2 = 4;
            //IT IS!
            if (temp2 > 0) {
                //temp3 stores how many rows are changed
                temp3 = 0;
                for (let k: number = 0; k < player.upperBody.chest.count(); k++) {
                    //If this row is over threshhold
                    if (player.upperBody.chest.list[k].breastRating > temp2) {
                        //Big change
                        if (player.upperBody.chest.list[k].breastRating > 10) {
                            player.upperBody.chest.list[k].breastRating -= 2 + Utils.rand(3);
                            if (temp3 == 0) MainScreen.text("\n\nThe " + breastDescript(0) + " on your chest wobble for a second, then tighten up, losing several cup-sizes in the process!", false);
                            else MainScreen.text("  The change moves down to your " + num2Text2(k + 1) + " row of " + breastDescript(0) + ". They shrink greatly, losing a couple cup-sizes.", false);
                        }
                        //Small change
                        else {
                            player.upperBody.chest.list[k].breastRating -= 1;
                            if (temp3 == 0) MainScreen.text("\n\nAll at once, your sense of gravity shifts.  Your back feels a sense of relief, and it takes you a moment to realize your " + breastDescript(k) + " have shrunk!", false);
                            else MainScreen.text("  Your " + num2Text2(k + 1) + " row of " + breastDescript(k) + " gives a tiny jiggle as it shrinks, losing some off its mass.", false);
                        }
                        //Increment changed rows
                        temp3++;
                    }
                }
            }
            //Count that tits were shrunk
            if (temp3 > 0) changes++;
        }
        //Cat dangly-doo.
        if (player.lowerBody.cockSpot.count() > 0 && player.catCocks() < player.lowerBody.cockSpot.count() &&
            changes < changeLimit && Utils.rand(4) == 0) {
            //loop through and find a non-cat wang.
            for (let i: number = 0; i < (player.lowerBody.cockSpot.count()) && player.lowerBody.cockSpot.list[i].cockType == CockType.CAT; i++) { }
            MainScreen.text("\n\nYour " + cockDescript(i) + " swells up with near-painful arousal and begins to transform.  It turns pink and begins to narrow until the tip is barely wide enough to accommodate your urethra.  Barbs begin to sprout from its flesh, if you can call the small, fleshy nubs barbs. They start out thick around the base of your " + Appearance.cockNoun(CockType.HUMAN) + " and shrink towards the tip. The smallest are barely visible. <b>Your new feline dong throbs powerfully</b> and spurts a few droplets of cum.  ", false);
            if (!player.lowerBody.cockSpot.hasSheath()) {
                MainScreen.text("Then, it begins to shrink and sucks itself inside your body.  Within a few moments, a fleshy sheath is formed.", false);
                if (player.lowerBody.balls > 0) MainScreen.text("  Thankfully, your balls appear untouched.", false);
            }
            else MainScreen.text("Then, it disappears back into your sheath.", false);
            player.lowerBody.cockSpot.list[i].cockType = CockType.CAT;
            player.lowerBody.cockSpot.list[i].knotMultiplier = 1;
            changes++;
        }
        //Cat penorz shrink
        if (player.catCocks() > 0 && Utils.rand(3) == 0 && changes < changeLimit && !Flags.get(FlagEnum.HYPER_HAPPY)) {
            //loop through and find a cat wang.
            temp = 0;
            for (let j: number = 0; j < (player.lowerBody.cockSpot.count()); j++) {
                if (player.lowerBody.cockSpot.list[j].cockType == CockType.CAT && player.lowerBody.cockSpot.list[j].cockLength > 6) {
                    temp = 1;
                    break;
                }
            }
            if (temp == 1) {
                //lose 33% size until under 10, then lose 2" at a time
                if (player.lowerBody.cockSpot.list[j].cockLength > 16) {
                    MainScreen.text("\n\nYour " + cockDescript(j) + " tingles, making your sheath feel a little less tight.  It dwindles in size, losing a full third of its length and a bit of girth before the change finally stops.", false);
                    player.lowerBody.cockSpot.list[j].cockLength *= .66;
                }
                else if (player.lowerBody.cockSpot.list[j].cockLength > 6) {
                    MainScreen.text("\n\nYour " + cockDescript(j) + " tingles and withdraws further into your sheath.  If you had to guess, you'd say you've lost about two inches of total length and perhaps some girth.", false);
                    player.lowerBody.cockSpot.list[j].cockLength -= 2;
                }
                if (player.lowerBody.cockSpot.list[j].cockLength / 5 < player.lowerBody.cockSpot.list[j].cockThickness && player.lowerBody.cockSpot.list[j].cockThickness > 1.25) player.lowerBody.cockSpot.list[j].cockThickness = player.lowerBody.cockSpot.list[j].cockLength / 6;
                //Check for any more!
                temp2 = 0;
                j++;
                for (j; j < player.lowerBody.cockSpot.count(); j++) {
                    //Found another cat wang!
                    if (player.lowerBody.cockSpot.list[j].cockType == CockType.CAT) {
                        //Long enough - change it
                        if (player.lowerBody.cockSpot.list[j].cockLength > 6) {
                            if (player.lowerBody.cockSpot.list[j].cockLength > 16)
                                player.lowerBody.cockSpot.list[j].cockLength *= .66;
                            else if (player.lowerBody.cockSpot.list[j].cockLength > 6)
                                player.lowerBody.cockSpot.list[j].cockLength -= 2;
                            //Thickness adjustments
                            if (player.lowerBody.cockSpot.list[j].cockLength / 5 < player.lowerBody.cockSpot.list[j].cockThickness && player.lowerBody.cockSpot.list[j].cockThickness > 1.25) player.lowerBody.cockSpot.list[j].cockThickness = player.lowerBody.cockSpot.list[j].cockLength / 6;
                            temp2 = 1;
                        }
                    }
                }
                //(big sensitivity boost)
                MainScreen.text("  Although the package is smaller, it feels even more sensitive – as if it retained all sensation of its larger size in its smaller form.", false);
                dynStats("sen", 5);
                //Make note of other dicks changing
                if (temp2 == 1) MainScreen.text("  Upon further inspection, all your " + Appearance.cockNoun(CockType.CAT) + "s have shrunk!", false);
                changes++;
            }
        }
        //Body type changes.  Teh rarest of the rare.
        //DA EARZ
        if (player.upperBody.head.earType != EARS.CAT && Utils.rand(5) == 0 && changes < changeLimit) {
            //human to cat:
            if (player.upperBody.head.earType == EARS.HUMAN) {
                if (Utils.rand(2) == 0) MainScreen.text("\n\nThe skin on the sides of your face stretches painfully as your ears migrate upwards, towards the top of your head. They shift and elongate a little, fur growing on them as they become feline in nature. <b>You now have cat ears.</b>", false);
                else MainScreen.text("\n\nYour ears begin to tingle. You reach up with one hand and gently rub them. They appear to be growing fur. Within a few moments, they've migrated up to the top of your head and increased in size. The tingling stops and you find yourself hearing noises in a whole new way. <b>You now have cat ears.</b>", false);
            }
            //non human to cat:
            else {
                if (Utils.rand(2) == 0) MainScreen.text("\n\nYour ears change shape, morphing into pointed, feline ears!  They swivel about reflexively as you adjust to them.  <b>You now have cat ears.</b>", false);
                else MainScreen.text("\n\nYour ears tingle and begin to change shape. Within a few moments, they've become long and feline.  Thanks to the new fuzzy organs, you find yourself able to hear things that eluded your notice up until now. <b>You now have cat ears.</b>", false);
            }
            player.upperBody.head.earType = EARS.CAT;
            changes++;
        }
        //DA TAIL (IF ALREADY HAZ URZ)
        if (player.tailType != TAIL.CAT && player.upperBody.head.earType == EARS.CAT && Utils.rand(5) == 0 && changes < changeLimit) {
            if (player.tailType == TAIL.NONE) {
                temp = Utils.rand(3);
                if (temp == 0) MainScreen.text("\n\nA pressure builds in your backside. You feel under your " + player.armorName + " and discover an odd bump that seems to be growing larger by the moment. In seconds it passes between your fingers, bursts out the back of your clothes and grows most of the way to the ground. A thick coat of fur springs up to cover your new tail. You instinctively keep adjusting it to improve your balance. <b>You now have a cat-tail.</b>", false);
                if (temp == 1) MainScreen.text("\n\nYou feel your backside shift and change, flesh molding and displacing into a long, flexible tail! <b>You now have a cat tail.</b>", false);
                if (temp == 2) MainScreen.text("\n\nYou feel an odd tingling in your spine and your tail bone starts to throb and then swell. Within a few moments it begins to grow, adding new bones to your spine. Before you know it, you have a tail. Just before you think it's over, the tail begins to sprout soft, glossy " + player.hairColor + " fur. <b>You now have a cat tail.</b>", false);
            }
            else MainScreen.text("\n\nYou pause and tilt your head... something feels different.  Ah, that's what it is; you turn around and look down at your tail as it starts to change shape, narrowing and sprouting glossy fur. <b>You now have a cat tail.</b>", false);
            player.tailType = TAIL.CAT;
            changes++;
        }
        //Da paws (if already haz ears & tail)
        if (player.tailType == TAIL.CAT && player.upperBody.head.earType == EARS.CAT &&
            Utils.rand(5) == 0 && changes < changeLimit &&
            player.lowerBody != LOWER_BODY.CAT) {
            //hoof to cat:
            if (player.lowerBody == LOWER_BODY.HOOFED || player.lowerBody == LOWER_BODY.CENTAUR) {
                MainScreen.text("\n\nYou feel your hooves suddenly splinter, growing into five unique digits. Their flesh softens as your hooves reshape into furred cat paws. <b>You now have cat paws.</b>", false);
                if (player.lowerBody == LOWER_BODY.CENTAUR) MainScreen.text("  You feel woozy and collapse on your side.  When you wake, you're no longer a centaur and your body has returned to a humanoid shape.", false);
            }
            //Goo to cat
            else if (player.lowerBody == LOWER_BODY.GOO) {
                MainScreen.text("\n\nYour lower body rushes inward, molding into two leg-like shapes that gradually stiffen up.  In moments they solidify into digitigrade legs, complete with soft, padded cat-paws.  <b>You now have cat-paws!</b>", false);
            }
            //non hoof to cat:
            else MainScreen.text("\n\nYou scream in agony as you feel the bones in your " + player.feet() + " break and begin to rearrange. When the pain fades, you feel surprisingly well-balanced. <b>You now have cat paws.</b>", false);
            player.lowerBody = LOWER_BODY.CAT;
            changes++;
        }
        //TURN INTO A FURRAH!  OH SHIT
        if (player.tailType == TAIL.CAT && player.upperBody.head.earType == EARS.CAT &&
            Utils.rand(5) == 0 && changes < changeLimit &&
            player.lowerBody == LOWER_BODY.CAT && player.skinType != SKIN.FUR) {
            MainScreen.text("\n\nYour " + player.skinDesc + " begins to tingle, then itch. You reach down to scratch your arm absent-mindedly and pull your fingers away to find stUtils.Utils.rands of " + player.hairColor + " fur. Wait, fur?  What just happened?! You spend a moment examining yourself and discover that <b>you are now covered in glossy, soft fur.</b>\n\n", false);
            player.skinType = SKIN.FUR;
            player.skinDesc = "fur";
            changes++;
        }
        //CAT-FACE!  FULL ON FURRY!  RAGE AWAY NEKOZ
        if (player.tailType == TAIL.CAT && player.upperBody.head.earType == EARS.CAT &&
            Utils.rand(5) == 0 && changes < changeLimit &&
            player.lowerBody == LOWER_BODY.CAT && player.skinType == SKIN.FUR &&
            player.faceType != FACE.CAT) {
            //Gain cat face, replace old face
            temp = Utils.rand(3);
            if (temp == 0) MainScreen.text("\n\nYour face is wracked with pain. You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something... different. You find a puddle to view your reflection and discover <b>your face is now a cross between human and feline features.</b>", false);
            else if (temp == 1) MainScreen.text("\n\nMind-numbing pain courses through you as you feel your facial bones rearranging.  You clutch at your face in agony as your skin crawls and shifts, your visage reshaping to replace your facial characteristics with those of a feline. <b>You now have an anthropomorphic cat-face.</b>", false);
            else MainScreen.text("\n\nYour face is wracked with pain. You throw back your head and scream in agony as you feel your cheekbones breaking and shifting, reforming into something else. <b>Your facial features rearrange to take on many feline aspects.</b>", false);
            player.faceType = FACE.CAT;
            changes++;
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            MainScreen.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.", false);
            player.upperBody.gills = false;
            changes++;
        }
        //FAILSAFE CHANGE
        if (changes == 0) {
            MainScreen.text("\n\nInhuman vitality spreads through your body, invigorating you!\n", false);
            HPChange(50, true);
            dynStats("lus", 3);
        }
        if (changes < changeLimit) {
            if (Utils.rand(2) == 0) MainScreen.text(player.modThickness(5, 2), false);
            if (Utils.rand(2) == 0) MainScreen.text(player.modTone(76, 2), false);
            if (player.gender < 2) if (Utils.rand(2) == 0) MainScreen.text(player.modFem(65, 1), false);
            else MainScreen.text(player.modFem(85, 2), false);
        }
    }
}