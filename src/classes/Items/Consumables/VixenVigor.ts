import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class VixenVigor extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        MainScreen.clearText();
        if (!enhanced) MainScreen.text("You examine the berry a bit, rolling the orangish-red fruit in your hand for a moment before you decide to take the plunge and chow down.  It's tart and sweet at the same time, and the flavors seem to burst across your tongue with potent strength.  Juice runs from the corners of your lips as you finish the tasty snack.");
        else MainScreen.text("You pop the cap on the enhanced \"Vixen's Vigor\" and decide to take a swig of it.  Perhaps it will make you as cunning as the crude fox Lumi drew on the front?");
        let changes: number = 0;
        let changeLimit: number = 1;
        if (enhanced) changeLimit += 2;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        //Used for dick and boob TFs
        let counter: number = 0;

        if (player.faceType == FACE.FOX && player.tailType == TAIL.FOX && player.upperBody.head.earType == EARS.FOX && player.lowerBody == LOWER_BODY.FOX && player.skinType == SKIN.FUR && Utils.rand(3) == 0) {
            if (Flags.get(FlagEnum.FOX_BAD_END_WARNING) == 0) {
                MainScreen.text("\n\nYou get a massive headache and a craving to raid a henhouse.  Thankfully, both pass in seconds, but <b>maybe you should cut back on the vulpine items...</b>");
                Flags.get(FlagEnum.FOX_BAD_END_WARNING) = 1;
            }
            else {
                MainScreen.text("\n\nYou scarf down the ");
                if (enhanced) MainScreen.text("fluid ");
                else MainScreen.text("berries ");
                MainScreen.text("with an uncommonly voracious appetite, taking particular enjoyment in the succulent, tart flavor.  As you carefully suck the last drops of ochre juice from your fingers, you note that it tastes so much more vibrant than you remember.  Your train of thought is violently interrupted by the sound of bones snapping, and you cry out in pain, doubling over as a flaming heat boils through your ribs.");
                MainScreen.text("\n\nWrithing on the ground, you clutch your hand to your chest, looking on in horror through tear-streaked eyes as the bones in your fingers pop and fuse, rearranging themselves into a dainty paw covered in coarse black fur, fading to a ruddy orange further up.  You desperately try to call out to someone - anyone - for help, but all that comes out is a high-pitched, ear-splitting yap.");
                if (player.lowerBody.tailVenom > 1) MainScreen.text("  Your tails thrash around violently as they begin to fuse painfully back into one, the fur bristling back out with a flourish.");
                MainScreen.text("\n\nA sharp spark of pain jolts through your spinal column as the bones shift themselves around, the joints in your hips migrating forward.  You continue to howl in agony even as you feel your intelligence slipping away.  In a way, it's a blessing - as your thoughts grow muddied, the pain is dulled, until you are finally left staring blankly at the sky above, tilting your head curiously.");
                MainScreen.text("\n\nYou roll over and crawl free of the " + player.armorName + " covering you, pawing the ground for a few moments before a pang of hunger rumbles through your stomach.  Sniffing the wind, you bound off into the wilderness, following the telltale scent of a farm toward the certain bounty of a chicken coop.");
                getGame().gameOver();
                return;
            }
        }
        //[increase Intelligence, Libido and Sensitivity]
        if (changes < changeLimit && Utils.rand(3) == 0 && (player.stats.lib < 80 || player.stats.int < 80 || player.stats.sens < 80)) {
            MainScreen.text("\n\nYou close your eyes, smirking to yourself mischievously as you suddenly think of several new tricks to try on your opponents; you feel quite a bit more cunning.  The mental picture of them helpless before your cleverness makes you shudder a bit, and you lick your lips and stroke yourself as you feel your skin tingling from an involuntary arousal.");
            if (player.stats.int < 80) dynStats("int", 4);
            if (player.stats.lib < 80) dynStats("lib", 1);
            if (player.stats.sens < 80) dynStats("sen", 1);
            //gain small lust also
            dynStats("lus", 10);
            changes++;
        }
        //[decrease Strength] (to some floor) // I figured 15 was fair, but you're in a better position to judge that than I am.
        if (changes < changeLimit && Utils.rand(3) == 0 && player.str > 40) {
            MainScreen.text("\n\nYou can feel your muscles softening as they slowly relax, becoming a tad weaker than before.  Who needs physical strength when you can outwit your foes with trickery and mischief?  You tilt your head a bit, wondering where that thought came from.");
            dynStats("str", -1);
            if (player.str > 60) dynStats("str", -1);
            if (player.str > 80) dynStats("str", -1);
            if (player.str > 90) dynStats("str", -1);
            changes++;
        }
        //[decrease Toughness] (to some floor) // 20 or so was my thought here
        if (changes < changeLimit && Utils.rand(3) == 0 && player.tou > 30) {
            if (player.tou < 60) MainScreen.text("\n\nYou feel your skin becoming noticeably softer.  A gentle exploratory pinch on your arm confirms it - your supple skin isn't going to offer you much protection.");
            else MainScreen.text("\n\nYou feel your skin becoming noticeably softer.  A gentle exploratory pinch on your arm confirms it - your hide isn't quite as tough as it used to be.");
            dynStats("tou", -1);
            if (player.str > 60) dynStats("tou", -1);
            if (player.str > 80) dynStats("tou", -1);
            if (player.str > 90) dynStats("tou", -1);
            changes++;
        }

        //[Change Hair Color: Golden-blonde or Reddish-orange]
        if (player.hairColor != "golden-blonde" && player.hairColor != "reddish-orange" && player.hairColor != "silver" && player.hairColor != "white" && player.hairColor != "red" && player.hairColor != "black" && changes < changeLimit && Utils.rand(4) == 0) {
            let hairTemp: number = Utils.rand(10);
            if (hairTemp < 5) player.hairColor = "reddish-orange";
            else if (hairTemp < 7) player.hairColor = "red";
            else if (hairTemp < 8) player.hairColor = "golden-blonde";
            else if (hairTemp < 9) player.hairColor = "silver";
            else player.hairColor = "black";
            MainScreen.text("\n\nYour scalp begins to tingle, and you gently grasp a stUtils.Utils.rand of hair, pulling it out to check it.  Your hair has become " + player.hairColor + "!");
        }
        //[Adjust hips toward 10 � wide/curvy/flared]
        if (changes < changeLimit && Utils.rand(3) == 0 && player.lowerBody.hipRating != 10) {
            //from narrow to wide
            if (player.lowerBody.hipRating < 10) {
                MainScreen.text("\n\nYou stumble a bit as the bones in your pelvis rearrange themselves painfully.  Your waistline has widened into [hips]!");
                player.lowerBody.hipRating++;
                if (player.lowerBody.hipRating < 7) player.lowerBody.hipRating++;
            }
            //from wide to narrower
            else {
                MainScreen.text("\n\nYou stumble a bit as the bones in your pelvis rearrange themselves painfully.  Your waistline has narrowed, becoming [hips].");
                player.lowerBody.hipRating--;
                if (player.lowerBody.hipRating > 15) player.lowerBody.hipRating--;
            }
            changes++;
        }
        //[Remove tentacle hair]
        //required if the hair length change below is triggered
        if (changes < changeLimit && player.upperBody.head.hairType == 4 && Utils.rand(3) == 0) {
            //-insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
            MainScreen.text("\n\nEerie flames of the jewel migrate up your body to your head, where they cover your [hair].  Though they burned nowhere else in their lazy orbit, your head begins to heat up as they congregate.  Fearful, you raise your hands to it just as the temperature peaks, but as you touch your hair, the searing heat is suddenly gone - along with your tentacles!  <b>Your hair is normal again!</b>");
            player.upperBody.head.hairType = 0;
            changes++;
        }
        //[Adjust hair length toward range of 16-26 � very long to ass-length]
        if (player.upperBody.head.hairType != 4 && (player.hairLength > 26 || player.hairLength < 16) && changes < changeLimit && Utils.rand(4) == 0) {
            if (player.hairLength < 16) {
                player.hairLength += 1 + Utils.rand(4);
                MainScreen.text("\n\nYou experience a tingling sensation in your scalp.  Feeling a bit off-balance, you discover your hair has lengthened, becoming " + num2Text(Math.round(player.hairLength)) + " inches long.");
            }
            else {
                player.hairLength -= 1 + Utils.rand(4);
                MainScreen.text("\n\nYou experience a tingling sensation in your scalp.  Feeling a bit off-balance, you discover your hair has shed a bit of its length, becoming " + num2Text(Math.round(player.hairLength)) + " inches long.");
            }
            changes++;
        }
        if (changes < changeLimit && Utils.rand(10) == 0) {
            MainScreen.text("\n\nYou sigh as the exotic flavor washes through you, and unbidden, you begin to daydream.  Sprinting through the thicket, you can feel the corners of your muzzle curling up into a mischievous grin.  You smell the scent of demons, and not far away either.  With your belly full and throat watered, now is the perfect time for a little bit of trickery.   As the odor intensifies, you slow your playful gait and begin to creep a bit more carefully.");
            MainScreen.text("\n\nSuddenly, you are there, at a demonic camp, and you spy the forms of an incubus and a succubus, their bodies locked together at the hips and slowly undulating, even in sleep.  You carefully prance around their slumbering forms and find their supplies.  With the utmost care, you put your razor-sharp teeth to work, and slowly, meticulously rip through their packs - not with the intention of theft, but with mischief.  You make sure to leave small holes in the bottom of each, and after making sure your stealth remains unbroken, you urinate on their hooves.");
            MainScreen.text("\n\nThey don't even notice, so lost in the subconscious copulation as they are.  Satisfied at your petty tricks, you scurry off into the night, a red blur amidst the foliage.");
            changes++;
            fatigue(-10);
        }

        //dog cocks!
        if (changes < changeLimit && Utils.rand(3) == 0 && player.dogCocks() < player.lowerBody.cockSpot.count()) {
            let choices: Array = [];
            counter = player.lowerBody.cockSpot.count();
            while (counter > 0) {
                counter--;
                //Add non-dog locations to the array
                if (player.lowerBody.cockSpot.list[counter].cockType != CockType.DOG) choices[choices.length] = counter;
            }
            if (choices.length != 0) {
                let select: number = choices[Utils.rand(choices.length)];
                if (player.lowerBody.cockSpot.list[select].cockType == CockType.HUMAN) {
                    MainScreen.text("\n\nYour " + cockDescript(select) + " clenches painfully, becoming achingly, throbbingly erect.  A tightness seems to squeeze around the base, and you wince as you see your skin and flesh shifting forwards into a canine-looking sheath.  You shudder as the crown of your " + cockDescript(select) + " reshapes into a point, the sensations nearly too much for you.  You throw back your head as the transformation completes, your " + Appearance.cockNoun(CockType.DOG) + " much thicker than it ever was before.  <b>You now have a dog-cock.</b>", false);
                    player.lowerBody.cockSpot.list[select].cockThickness += .3;
                    dynStats("sen", 10, "lus", 5);
                }
                //Horse
                else if (player.lowerBody.cockSpot.list[select].cockType == CockType.HORSE) {
                    MainScreen.text("\n\nYour " + Appearance.cockNoun(CockType.HORSE) + " shrinks, the extra equine length seeming to shift into girth.  The flared tip vanishes into a more pointed form, a thick knotted bulge forming just above your sheath.  <b>You now have a dog-cock.</b>", false);
                    //Tweak length/thickness.
                    if (player.lowerBody.cockSpot.list[select].cockLength > 6) player.lowerBody.cockSpot.list[select].cockLength -= 2;
                    else player.lowerBody.cockSpot.list[select].cockLength -= .5;
                    player.lowerBody.cockSpot.list[select].cockThickness += .5;

                    dynStats("sen", 4, "lus", 5);
                }
                //Tentacular Tuesday!
                else if (player.lowerBody.cockSpot.list[select].cockType == CockType.TENTACLE) {
                    MainScreen.text("\n\nYour " + cockDescript(select) + " coils in on itself, reshaping and losing its plant-like coloration as thickens near the base, bulging out in a very canine-looking knot.  Your skin bunches painfully around the base, forming into a sheath.  <b>You now have a dog-cock.</b>", false);
                    dynStats("sen", 4, "lus", 10);
                }
                //Misc
                else {
                    MainScreen.text("\n\nYour " + cockDescript(select) + " trembles, reshaping itself into a shiny red doggie-dick with a fat knot at the base.  <b>You now have a dog-cock.</b>", false);
                    dynStats("sen", 4, "lus", 10);
                }
                player.lowerBody.cockSpot.list[select].cockType = CockType.DOG;
                player.lowerBody.cockSpot.list[select].knotMultiplier = 1.25;
                changes++;
            }

        }
        //Cum Multiplier Xform
        if (player.cumQ() < 5000 < 2 && Utils.rand(3) == 0 && changes < changeLimit && player.lowerBody.cockSpot.hasCock()) {
            temp = 2 + Utils.rand(4);
            //Lots of cum raises cum multiplier cap to 2 instead of 1.5
            if (player.perks.has("MessyOrgasms")) temp += Utils.rand(10);
            player.cumMultiplier += temp;
            //Flavor text
            if (player.lowerBody.balls == 0) MainScreen.text("\n\nYou feel a churning inside your gut as something inside you changes.", false);
            if (player.lowerBody.balls > 0) MainScreen.text("\n\nYou feel a churning in your " + ballsDescriptLight() + ".  It quickly settles, leaving them feeling somewhat more dense.", false);
            MainScreen.text("  A bit of milky pre dribbles from your " + multiCockDescriptLight() + ", pushed out by the change.", false);
            changes++;
        }
        if (changes < changeLimit && player.lowerBody.balls > 0 && player.lowerBody.ballSize > 4 && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYour [sack] gets lighter and lighter, the skin pulling tight around your shrinking balls until you can't help but check yourself.");
            if (player.lowerBody.ballSize > 10) player.lowerBody.ballSize -= 5;
            if (player.lowerBody.ballSize > 20) player.lowerBody.ballSize -= 4;
            if (player.lowerBody.ballSize > 30) player.lowerBody.ballSize -= 4;
            if (player.lowerBody.ballSize > 40) player.lowerBody.ballSize -= 4;
            if (player.lowerBody.ballSize > 50) player.lowerBody.ballSize -= 8;
            if (player.lowerBody.ballSize > 60) player.lowerBody.ballSize -= 8;
            if (player.lowerBody.ballSize <= 10) player.lowerBody.ballSize--;
            changes++;
            MainScreen.text("  You now have a [balls].");
        }
        //Sprouting more!
        if (changes < changeLimit && enhanced && player.bRows() < 4 && player.upperBody.chest.list[player.bRows() - 1].breastRating > 1) {
            MainScreen.text("\n\nYour belly rumbles unpleasantly for a second as the ");
            if (!enhanced) MainScreen.text("berry ");
            else MainScreen.text("drink ");
            MainScreen.text("settles deeper inside you.  A second later, the unpleasant gut-gurgle passes, and you let out a tiny burp of relief.  Before you finish taking a few breaths, there's an itching below your " + allChestDesc() + ".  You idly scratch at it, but gods be damned, it hurts!  You peel off part of your " + player.armorName + " to inspect the unwholesome itch, ");
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 8) MainScreen.text("it's difficult to see past the wall of tits obscuring your view.");
            else MainScreen.text("it's hard to get a good look at.");
            MainScreen.text("  A few gentle prods draw a pleasant gasp from your lips, and you realize that you didn't have an itch - you were growing new nipples!");
            MainScreen.text("\n\nA closer examination reveals your new nipples to be just like the ones above in size and shape");
            if (player.upperBody.chest.list[player.bRows() - 1].nipplesPerBreast > 1) MainScreen.text(", not to mention number");
            else if (player.upperBody.chest.hasFuckableNipples()) MainScreen.text(", not to mention penetrability");
            MainScreen.text(".  While you continue to explore your body's newest addition, a strange heat builds behind the new nubs. Soft, jiggly breastflesh begins to fill your cupped hands.  Radiant warmth spreads through you, eliciting a moan of pleasure from your lips as your new breasts catch up to the pair above.  They stop at " + player.breastCup(player.bRows() - 1) + "s.  <b>You have " + num2Text(player.bRows() + 1) + " rows of breasts!</b>");
            player.createBreastRow();
            player.upperBody.chest.list[player.bRows() - 1].breastRating = player.upperBody.chest.list[player.bRows() - 2].breastRating;
            player.upperBody.chest.list[player.bRows() - 1].nipplesPerBreast = player.upperBody.chest.list[player.bRows() - 2].nipplesPerBreast;
            if (player.upperBody.chest.hasFuckableNipples()) player.upperBody.chest.list[player.bRows() - 1].fuckable = true;
            player.upperBody.chest.list[player.bRows() - 1].lactationMultiplier = player.upperBody.chest.list[player.bRows() - 2].lactationMultiplier;
            dynStats("sen", 2, "lus", 30);
            changes++;
        }
        //Find out if tits are eligible for evening
        let tits: boolean = false;
        counter = player.bRows();
        while (counter > 1) {
            counter--;
            //If the row above is 1 size above, can be grown!
            if (player.upperBody.chest.list[counter].breastRating <= (player.upperBody.chest.list[counter - 1].breastRating - 1) && changes < changeLimit && Utils.rand(2) == 0) {
                if (tits) MainScreen.text("\n\nThey aren't the only pair to go through a change!  Another row of growing bosom goes through the process with its sisters, getting larger.");
                else {
                    let select2: number = Utils.rand(3);
                    if (select2 == 1) MainScreen.text("\n\nA faint warmth buzzes to the surface of your " + breastDescript(counter) + ", the fluttering tingles seeming to vibrate faster and faster just underneath your " + player.skin() + ".  Soon, the heat becomes uncomfortable, and that row of chest-flesh begins to feel tight, almost thrumming like a newly-stretched drum.  You " + nippleDescript(counter) + "s go rock hard, and though the discomforting feeling of being stretched fades, the pleasant, warm buzz remains.  It isn't until you cup your tingly tits that you realize they've grown larger, almost in envy of the pair above.");
                    else if (select2 == 2) MainScreen.text("\n\nA faintly muffled gurgle emanates from your " + breastDescript(counter) + " for a split-second, just before your flesh shudders and shakes, stretching your " + player.skinFurScales() + " outward with newly grown breast.  Idly, you cup your hands to your swelling bosom, and though it stops soon, you realize that your breasts have grown closer in size to the pair above.");
                    else {
                        MainScreen.text("\n\nAn uncomfortable stretching sensation spreads its way across the curves of your " + breastDescript(counter) + ", threads of heat tingling through your flesh.  It feels as though your heartbeat has been magnified tenfold within the expanding mounds, your " + player.skin() + " growing flushed with arousal and your " + nippleDescript(counter) + " filling with warmth.  As the tingling heat gradually fades, a few more inches worth of jiggling breast spill forth.  Cupping them experimentally, you confirm that they have indeed grown to be a bit more in line with the size of the pair above.")
                    }
                }
                //Bigger change!
                if (player.upperBody.chest.list[counter].breastRating <= (player.upperBody.chest.list[counter - 1].breastRating - 3))
                    player.upperBody.chest.list[counter].breastRating += 2 + Utils.rand(2);
                //Smallish change.
                else player.upperBody.chest.list[counter].breastRating++;
                MainScreen.text("  You do a quick measurement and determine that your " + num2Text2(counter + 1) + " row of breasts are now " + player.breastCup(counter) + "s.");

                if (!tits) {
                    tits = true;
                    changes++;
                }
                dynStats("sen", 2, "lus", 10);
            }
        }
        //HEAT!
        if (player.statusAffects.get("Heat").value2 < 30 && Utils.rand(6) == 0 && changes < changeLimit) {
            if (player.goIntoHeat(true)) {
                changes++;
            }
        }
        //[Grow Fur]
        //FOURTH
        if ((enhanced || player.lowerBody == LOWER_BODY.FOX) && player.skinType != SKIN.FUR && changes < changeLimit && Utils.rand(4) == 0) {
            //from scales
            if (player.skinType == SKIN.SCALES) MainScreen.text("\n\nYour skin shifts and every scale stands on end, sending you into a mild panic.  No matter how you tense, you can't seem to flatten them again.  The uncomfortable sensation continues for some minutes until, as one, every scale falls from your body and a fine coat of fur pushes out.  You briefly consider collecting them, but when you pick one up, it's already as dry and brittle as if it were hundreds of years old.  <b>Oh well; at least you won't need to sun yourself as much with your new fur.</b>");
            //from skin
            else MainScreen.text("\n\nYour skin itches all over, the sudden intensity and uniformity making you too paranoid to scratch.  As you hold still through an agony of tiny tingles and pinches, fine, luxuriant fur sprouts from every bare inch of your skin!  <b>You'll have to get used to being furry...</b>");
            player.skinType = SKIN.FUR;
            player.skinAdj = "";
            player.skinDesc = "fur";
            changes++;
        }
        //[Grow Fox Legs]
        //THIRD
        if ((enhanced || player.upperBody.head.earType == EARS.FOX) && player.lowerBody != LOWER_BODY.FOX && changes < changeLimit && Utils.rand(5) == 0) {
            //4 legs good, 2 legs better
            if (player.isTaur()) MainScreen.text("\n\nYou shiver as the strength drains from your back legs.  Shaken, you sit on your haunches, forelegs braced wide to stop you from tipping over;  their hooves scrape the dirt as your lower body shrinks, dragging them backward until you can feel the upper surfaces of your hindlegs with their undersides.  A wave of nausea and vertigo overtakes you, and you close your eyes to shut out the sensations.  When they reopen, what greets them are not four legs, but only two... and those roughly in the shape of your old hindleg, except for the furry toes where your hooves used to be.  <b>You now have fox legs!</b>");
            //n*ga please
            else if (player.isNaga()) MainScreen.text("\n\nYour scales split at the waistline and begin to peel, shedding like old snakeskin.  If that weren't curious enough, the flesh - not scales - underneath is pink and new, and the legs it covers crooked into the hocks and elongated feet of a field animal.  As the scaly coating falls and you step out of it, walking of necessity on your toes, a fine powder blows from the dry skin.  Within minutes, it crumbles completely and is taken by the ever-moving wind.  <b>Your legs are now those of a fox!</b>");
            //other digitigrade
            else if (player.lowerBody == LOWER_BODY.HOOFED || player.lowerBody == LOWER_BODY.DOG || player.lowerBody == LOWER_BODY.CAT || player.lowerBody == LOWER_BODY.BUNNY || player.lowerBody == LOWER_BODY.KANGAROO)
                MainScreen.text("\n\nYour legs twitch and quiver, forcing you to your seat.  As you watch, the ends shape themselves into furry, padded toes.  <b>You now have fox feet!</b>  Rather cute ones, actually.");
            //red drider bb gone
            else if (player.lowerBody == LOWER_BODY.DRIDER_LOWER_BODY) MainScreen.text("\n\nYour legs buckle under you and you fall, smashing your abdomen on the ground.  Though your control deserts and you cannot see behind you, still you feel the disgusting sensation of chitin loosening and sloughing off your body, and the dry breeze on your exposed nerves.  Reflexively, your legs cling together to protect as much of their now-sensitive surface as possible.  When you try to part them, you find you cannot.  Several minutes pass uncomforably until you can again bend your legs, and when you do, you find that all the legs of a side bend together - <b>in the shape of a fox's leg!</b>");
            //goo home and goo to bed
            else if (player.isGoo()) MainScreen.text("\n\nIt takes a while before you notice that your gooey mounds have something more defined in them.  As you crane your body and shift them around to look, you can just make out a semi-solid mass in the shape of a crooked, animalistic leg.  You don't think much of it until, a few minutes later, you step right out of your swishing gooey undercarriage and onto the new foot.  The goo covering it quickly dries up, as does the part you left behind, <b>revealing a pair of dog-like fox legs!</b>");
            //reg legs, not digitigrade
            else {
                MainScreen.text("\n\nYour hamstrings tense painfully and begin to pull, sending you onto your face.  As you writhe on the ground, you can feel your thighs shortening and your feet stretching");
                if (player.lowerBody == LOWER_BODY.BEE) MainScreen.text(", while a hideous cracking fills the air");
                MainScreen.text(".  When the spasms subside and you can once again stand, <b>you find that your legs have been changed to those of a fox!</b>");
            }
            player.lowerBody = LOWER_BODY.FOX;
            changes++;
        }
        //Grow Fox Ears]
        //SECOND
        if ((enhanced || player.tailType == TAIL.FOX) && player.upperBody.head.earType != EARS.FOX && changes < changeLimit && Utils.rand(4) == 0) {
            //from human/gob/liz ears
            if (player.upperBody.head.earType == EARS.HUMAN || player.upperBody.head.earType == EARS.ELFIN || player.upperBody.head.earType == EARS.LIZARD) {
                MainScreen.text("\n\nThe sides of your face painfully stretch as your ears elongate and begin to push past your hairline, toward the top of your head.  They elongate, becoming large vulpine triangles covered in bushy fur.  <b>You now have fox ears.</b>");
            }
            //from dog/cat/roo ears
            else {
                MainScreen.text("\n\nYour ears change, shifting from their current shape to become vulpine in nature.  <b>You now have fox ears.</b>");
            }
            player.upperBody.head.earType = EARS.FOX;
            changes++;
        }
        //[Grow Fox Tail](fairly common)
        //FIRST
        if (player.tailType != TAIL.FOX && changes < changeLimit && Utils.rand(4) == 0) {
            //from no tail
            if (player.tailType == TAIL.NONE) MainScreen.text("\n\nA pressure builds on your backside.  You feel under your [armor] and discover a strange nodule growing there that seems to be getting larger by the second.  With a sudden flourish of movement, it bursts out into a long and bushy tail that sways hypnotically, as if it had a mind of its own.  <b>You now have a fox's tail!</b>");
            //from another type of tail
            else MainScreen.text("\n\nPain lances through your lower back as your tail shifts violently.  With one final aberrant twitch, it fluffs out into a long, bushy fox tail that whips around in an almost hypnotic fashion.  <b>You now have a fox's tail!</b>");
            player.tailType = TAIL.FOX;
            player.lowerBody.tailVenom = 1;
            changes++;
        }
        //[Grow Fox Face]
        //LAST - muzzlygoodness
        //should work from any face, including other muzzles
        if (player.skinType == SKIN.FUR && player.faceType != FACE.FOX && changes < changeLimit && Utils.rand(5) == 0) {
            MainScreen.text("\n\nYour face pinches and you clap your hands to it.  Within seconds, your nose is poking through those hands, pushing them slightly to the side as new flesh and bone build and shift behind it, until it stops in a clearly defined, tapered, and familiar point you can see even without the aid of a mirror.  <b>Looks like you now have a fox's face.</b>");
            if (silly()) MainScreen.text("  And they called you crazy...");
            changes++;
            player.faceType = FACE.FOX;
        }
        if (player.tone > 40 && changes < changeLimit && Utils.rand(2) == 0) {
            MainScreen.text("\n\nMoving brings with it a little more jiggle than you're used to.  You don't seem to have gained weight, but your muscles seem less visible, and various parts of you are pleasantly softer.");
            player.tone -= 4;
        }
        //Nipples Turn Back:
        if (player.statusAffects.has("BlackNipples") && changes < changeLimit && Utils.rand(3) == 0) {
            MainScreen.text("\n\nSomething invisible brushes against your " + nippleDescript(0) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            changes++;
            player.statusAffects.remove("BlackNipples");
        }
        //Debugcunt
        if (changes < changeLimit && Utils.rand(3) == 0 && player.vaginaType() == 5 && player.lowerBody.vaginaSpot.hasVagina()) {
            MainScreen.text("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
            player.vaginaType(0);
            changes++;
        }
        if (changes == 0) {
            MainScreen.text("\n\nWell that didn't do much, but you do feel a little refreshed!");
            fatigue(-5);
        }
    }
}