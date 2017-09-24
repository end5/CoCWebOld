import Consumable from "./Consumable";
import Player from "../../Player";
import MainScreen from "../../display/MainScreen";
import Utils from "../../Utilities/Utils";

export default class FoxJewel extends Consumable {
    public constructor() {
        super("Smart T", "Scholars T.", "a cup of scholar's tea", 0, "This powerful brew supposedly has mind-strengthening effects.");
    }

    public use(player: Player) {
        MainScreen.clearText();
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(3) == 0) changeLimit++;
        if (mystic) changeLimit += 2;
        if (player.perks.has("HistoryAlchemist")) changeLimit++;
        if (mystic) MainScreen.text("You examine the jewel for a bit, rolling it around in your hand as you ponder its mysteries.  You hold it up to the light with fascinated curiosity, watching the eerie purple flame dancing within.  Without warning, the gem splits down the center, dissolving into nothing in your hand.  As the pale lavender flames swirl around you, the air is filled with a sickly sweet scent that drips with the bitter aroma of licorice, filling you with a dire warmth.");
        else MainScreen.text("You examine the jewel for a bit, rolling it around in your hand as you ponder its mysteries.  You hold it up to the light with fascinated curiosity, watching the eerie blue flame dancing within.  Without warning, the gem splits down the center, dissolving into nothing in your hand.  As the pale azure flames swirl around you, the air is filled with a sweet scent that drips with the aroma of wintergreen, sending chills down your spine.");

        //**********************
        //BASIC STATS
        //**********************
        //[increase Intelligence, Libido and Sensitivity]
        if (player.stats.int < 100 && changes < changeLimit && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(4) == 0))) {
            MainScreen.text("\n\nYou close your eyes, smirking to yourself mischievously as you suddenly think of several new tricks to try on your opponents; you feel quite a bit more cunning.  The mental image of them helpless before your cleverness makes you shudder a bit, and you lick your lips and stroke yourself as you feel your skin tingling from an involuntary arousal.");
            //Raise INT, Lib, Sens. and +10 LUST
            dynStats("int", 2, "lib", 1, "sen", 2, "lus", 10);
            changes++;
        }
        //[decrease Strength toward 15]
        if (player.str > 15 && changes < changeLimit && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0))) {
            MainScreen.text("\n\nYou can feel your muscles softening as they slowly relax, becoming a tad weaker than before.  Who needs physical strength when you can outwit your foes with trickery and mischief?  You tilt your head a bit, wondering where that thought came from.");
            dynStats("str", -1);
            if (player.str > 70) dynStats("str", -1);
            if (player.str > 50) dynStats("str", -1);
            if (player.str > 30) dynStats("str", -1);
            changes++;
        }
        //[decrease Toughness toward 20]
        if (player.tou > 20 && changes < changeLimit && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0))) {
            //from 66 or less toughness
            if (player.tou <= 66) MainScreen.text("\n\nYou feel your " + player.skinFurScales() + " becoming noticeably softer.  A gentle exploratory pinch on your arm confirms it - your " + player.skinFurScales() + " won't offer you much protection.");
            //from 66 or greater toughness
            else MainScreen.text("\n\nYou feel your " + player.skinFurScales() + " becoming noticeably softer.  A gentle exploratory pinch on your arm confirms it - your hide isn't quite as tough as it used to be.");
            dynStats("tou", -1);
            if (player.tou > 66) dynStats("tou", -1);
            changes++;
        }
        if (mystic && changes < changeLimit && Utils.rand(2) == 0 && player.stats.cor < 100) {
            if (player.stats.cor < 33) MainScreen.text("\n\nA sense of dirtiness comes over you, like the magic of this gem is doing some perverse impropriety to you.");
            else if (player.stats.cor < 66) MainScreen.text("\n\nA tingling wave of sensation rolls through you, but you have no idea what exactly just changed.  It must not have been that important.");
            else MainScreen.text("\n\nThoughts of mischief roll across your consciousness, unbounded by your conscience or any concern for others.  You should really have some fun - who cares who it hurts, right?");
            dynStats("cor", 1);
        }


        //**********************
        //MEDIUM/SEXUAL CHANGES
        //**********************
        //[adjust Femininity toward 50]
        //from low to high
        //Your facial features soften as your body becomes more androgynous.
        //from high to low
        //Your facial features harden as your body becomes more androgynous.
        if (((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(4) == 0)) && changes < changeLimit && player.femininity != 50) {
            MainScreen.text(player.modFem(50, 2), false);
            changes++;
        }
        //[decrease muscle tone toward 40]
        if (player.tone >= 40 && changes < changeLimit && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(4) == 0))) {
            MainScreen.text("\n\nMoving brings with it a little more jiggle than you're used to.  You don't seem to have gained weight, but your muscles seem less visible, and various parts of you are pleasantly softer.");
            player.tone -= 2 + Utils.rand(3);
            changes++;
        }

        //[Adjust hips toward 10 – wide/curvy/flared]
        //from narrow to wide
        if (player.lowerBody.hipRating < 10 && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0)) && changes < changeLimit) {
            player.lowerBody.hipRating++;
            if (player.lowerBody.hipRating < 7) player.lowerBody.hipRating++;
            if (player.lowerBody.hipRating < 4) player.lowerBody.hipRating++;
            MainScreen.text("\n\nYou stumble a bit as the bones in your pelvis rearrange themselves painfully.  Your hips have widened nicely!");
            changes++;
        }
        //from wide to narrower
        if (player.lowerBody.hipRating > 10 && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0)) && changes < changeLimit) {
            player.lowerBody.hipRating--;
            if (player.lowerBody.hipRating > 14) player.lowerBody.hipRating--;
            if (player.lowerBody.hipRating > 19) player.lowerBody.hipRating--;
            if (player.lowerBody.hipRating > 24) player.lowerBody.hipRating--;
            MainScreen.text("\n\nYou stumble a bit as the bones in your pelvis rearrange themselves painfully.  Your hips have narrowed.");
            changes++;
        }

        //[Adjust hair length toward range of 16-26 – very long to ass-length]
        if ((player.hairLength < 16 || player.hairLength > 26) && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0)) && changes < changeLimit) {
            //from short to long
            if (player.hairLength < 16) {
                player.hairLength += 3 + Utils.rand(3);
                MainScreen.text("\n\nYou experience a tingling sensation in your scalp.  Feeling a bit off-balance, you discover your hair has lengthened, becoming " + hairDescript() + ".");
            }
            //from long to short
            else {
                player.hairLength -= 3 + Utils.rand(3);
                MainScreen.text("\n\nYou experience a tingling sensation in your scalp.  Feeling a bit off-balance, you discover your hair has shed a bit of its length, becoming " + hairDescript() + ".");
            }
            changes++;
        }
        //[Increase Vaginal Capacity] - requires vagina, of course
        if (player.lowerBody.vaginaSpot.hasVagina() && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0)) && player.statusAffects.get("BonusVCapacity").value1 < 200 && changes < changeLimit) {
            MainScreen.text("\n\nA gurgling sound issues from your abdomen, and you double over as a trembling ripple passes through your womb.  The flesh of your stomach roils as your internal organs begin to shift, and when the sensation finally passes, you are instinctively aware that your " + vaginaDescript(0) + " is a bit deeper than it was before.");
            if (player.findStatusAffect(StatusAffects.BonusVCapacity) < 0) {
                player.statusAffects.add(new StatusAffect("BonusVCapacity", 0, 0, 0, 0)));
            }
            player.statusAffects.get("BonusVCapacity").value1 = 5 + Utils.rand(10);
            changes++;
        }
        //[Vag of Holding] - rare effect, only if PC has high vaginal looseness
        else if (player.lowerBody.vaginaSpot.hasVagina() && ((mystic) || (!mystic && Utils.rand(5) == 0)) && player.statusAffects.get("BonusVCapacity").value1 >= 200 && player.statusAffects.get("BonusVCapacity").value1 < 8000 && changes < changeLimit) {
            MainScreen.text("\n\nYou clutch your stomach with both hands, dropping to the ground in pain as your internal organs begin to twist and shift violently inside you.  As you clench your eyes shut in agony, you are overcome with a sudden calm.  The pain in your abdomen subsides, and you feel at one with the unfathomable infinity of the universe, warmth radiating through you from the vast swirling cosmos contained within your womb.");
            if (silly()) MainScreen.text("  <b>Your vagina has become a universe unto itself, capable of accepting colossal insertions beyond the scope of human comprehension!</b>");
            else MainScreen.text("  <b>Your vagina is now capable of accepting even the most ludicrously sized insertions with no ill effects.</b>");
            player.changeStatusValue(StatusAffects.BonusVCapacity, 1, 8000);
            changes++;
        }


        //**********************
        //BIG APPEARANCE CHANGES
        //**********************
        //[Grow Fox Tail]
        if (player.tailType != TAIL.FOX && changes < changeLimit && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(4) == 0))) {
            //if PC has no tail
            if (player.tailType == TAIL.NONE) {
                MainScreen.text("\n\nA pressure builds on your backside.  You feel under your " + player.armorName + " and discover a strange nodule growing there that seems to be getting larger by the second.  With a sudden flourish of movement, it bursts out into a long and bushy tail that sways hypnotically, as if it has a mind of its own.  <b>You now have a fox-tail.</b>");
            }
            //if PC has another type of tail
            else if (player.tailType != TAIL.FOX) {
                MainScreen.text("\n\nPain lances through your lower back as your tail shifts and twitches violently.  With one final aberrant twitch, it fluffs out into a long, bushy fox tail that whips around in an almost hypnotic fashion.  <b>You now have a fox-tail.</b>");
            }
            player.tailType = TAIL.FOX;
            player.lowerBody.tailVenom = 1;
            changes++;
        }
        if (!mystic && player.upperBody.head.earType == EARS.FOX && player.tailType == TAIL.FOX && player.lowerBody.tailVenom == 8 && Utils.rand(3) == 0) {
            MainScreen.text("\n\nYou have the feeling that if you could grow a ninth tail you would be much more powerful, but you would need to find a way to enhance one of these gems or meditate with one to have a chance at unlocking your full potential.");
        }
        //[Grow Addtl. Fox Tail]
        //(rare effect, up to max of 8 tails, requires PC level and int*10 = number of tail to be added)
        else if (player.tailType == TAIL.FOX && player.lowerBody.tailVenom < 8 && player.lowerBody.tailVenom + 1 <= player.level && player.lowerBody.tailVenom + 1 <= player.stats.int / 10 && changes < changeLimit && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0))) {
            //if PC has 1 fox tail
            if (player.lowerBody.tailVenom == 1) {
                MainScreen.text("\n\nA tingling pressure builds on your backside, and your bushy tail begins to glow with an eerie, ghostly light.  With a crackle of electrical energy, your tail splits into two!  <b>You now have a pair of fox-tails.</b>");
                //increment tail by 1
            }
            //else if PC has 2 or more fox tails
            else {
                MainScreen.text("\n\nA tingling pressure builds on your backside, and your bushy tails begin to glow with an eerie, ghostly light.  With a crackle of electrical energy, one of your tails splits in two, giving you " + num2Text(player.lowerBody.tailVenom + 1) + "!  <b>You now have a cluster of " + num2Text(player.lowerBody.tailVenom + 1) + " fox-tails.</b>");
                //increment tail by 1
            }
            player.lowerBody.tailVenom++;
            changes++;
        }
        //[Grow 9th tail and gain Corrupted Nine-tails perk]
        else if (mystic && Utils.rand(4) == 0 && changes < changeLimit && player.tailType == TAIL.FOX && player.lowerBody.tailVenom == 8 && player.level >= 9 && player.upperBody.head.earType == EARS.FOX && player.stats.int >= 90 && !player.perks.has("CorruptedNinetails") && !player.perks.has("EnlightenedNinetails")) {
            MainScreen.text("Your bushy tails begin to glow with an eerie, ghostly light, and with a crackle of electrical energy, split into nine tails.  <b>You are now a nine-tails!  But something is wrong...  The cosmic power radiating from your body feels...  tainted somehow.  The corruption pouring off your body feels...  good.</b>");
            MainScreen.text("\n\nYou have the inexplicable urge to set fire to the world, just to watch it burn.  With your newfound power, it's a goal that is well within reach.");
            MainScreen.text("\n\n(Perk Gained: Corrupted Nine-tails - Grants two magical special attacks.)");
            player.createPerk(PerkLib.CorruptedNinetails, 0, 0, 0, 0);
            dynStats("lib", 2, "lus", 10, "cor", 10);
            player.lowerBody.tailVenom = 9;
            changes++;
        }

        //[Grow Fox Ears]
        if (player.tailType == TAIL.FOX && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(4) == 0)) && player.upperBody.head.earType != EARS.FOX && changes < changeLimit) {
            //if PC has non-animal ears
            if (player.upperBody.head.earType == EARS.HUMAN) MainScreen.text("\n\nThe sides of your face painfully stretch as your ears morph and begin to migrate up past your hairline, toward the top of your head.  They elongate, becoming large vulpine triangles covered in bushy fur.  You now have fox ears.");
            //if PC has animal ears
            else MainScreen.text("\n\nYour ears change shape, shifting from their current shape to become vulpine in nature.  You now have fox ears.");
            player.upperBody.head.earType = EARS.FOX;
            changes++;
        }
        //[Change Hair Color: Golden-blonde, SIlver Blonde, White, Black, Red]
        if (((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(4) == 0)) && changes < changeLimit && player.hairColor != "golden blonde" && player.hairColor != "silver blonde" && player.hairColor != "white" && player.hairColor != "black" && player.hairColor != "red") {
            let hairTemp: number = Utils.rand(10);
            if (hairTemp == 0) player.hairColor = "golden blonde";
            else if (hairTemp == 1) player.hairColor = "silver blonde";
            else if (hairTemp <= 3) player.hairColor = "white";
            else if (hairTemp <= 6) player.hairColor = "black";
            else player.hairColor = "red";
            MainScreen.text("\n\nYour scalp begins to tingle, and you gently grasp a stUtils.Utils.rand, pulling it forward to check it.  Your hair has become the same " + player.hairColor + " as a kitsune's!");
            changes++;
        }
        //[Change Skin Type: remove fur or scales, change skin to Tan, Olive, or Light]
        if (player.skinType == SKIN.FUR || player.skinType == SKIN.SCALES && ((mystic) || (!mystic && Utils.rand(2) == 0))) {
            MainScreen.text("\n\nYou begin to tingle all over your " + player.skin() + ", starting as a cool, pleasant sensation but gradually worsening until you are furiously itching all over.");
            if (player.skinType == SKIN.FUR) MainScreen.text("  You stare in horror as you pull your fingers away holding a handful of " + player.hairColor + " fur!  Your fur sloughs off your body in thick clumps, falling away to reveal patches of bare, " + player.skinTone + " skin.");
            else if (player.skinType == SKIN.SCALES) MainScreen.text("  You stare in horror as you pull your fingers away holding a handful of dried up scales!  Your scales continue to flake and peel off your skin in thick patches, revealing the tender " + player.skinTone + " skin underneath.");
            MainScreen.text("  Your skin slowly turns raw and red under your severe scratching, the tingling sensations raising goosebumps across your whole body.  Over time, the itching fades, and your flushed skin resolves into a natural-looking ");
            player.skinType = SKIN.PLAIN;
            player.skinAdj = "";
            player.skinDesc = "skin";
            if (!mystic && player.skinTone != "tan" && player.skinTone != "olive" && player.skinTone != "light") {
                let skinTemp: number = Utils.rand(3);
                if (skinTemp == 0) player.skinTone = "tan";
                else if (skinTemp == 1) player.skinTone = "olive";
                else player.skinTone = "light";
            }
            else if (mystic && player.skinTone != "dark" && player.skinTone != "ebony" && player.skinTone != "ashen" && player.skinTone != "sable" && player.skinTone != "milky white") {
                let skinT: number = Utils.rand(5);
                if (skinT == 0) player.skinTone = "dark";
                else if (skinT == 1) player.skinTone = "ebony";
                else if (skinT == 2) player.skinTone = "ashen";
                else if (skinT == 3) player.skinTone = "sable";
                else player.skinTone = "milky white";
            }
            MainScreen.text(player.skinTone + " complexion.");
            MainScreen.text("  <b>You now have " + player.skin() + "!</b>");
            changes++;
        }
        //Change skin tone if not changed you!
        else if (mystic && player.skinTone != "dark" && player.skinTone != "ebony" && player.skinTone != "ashen" && player.skinTone != "sable" && player.skinTone != "milky white" && changes < changeLimit && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0))) {
            MainScreen.text("\n\nYou feel a crawling sensation on the surface of your skin, starting at the small of your back and spreading to your extremities, ultimately reaching your face.  Holding an arm up to your face, you discover that <b>you now have ");
            let mtoneTemp: number = Utils.rand(5);
            if (mtoneTemp == 0) player.skinTone = "dark";
            else if (mtoneTemp == 1) player.skinTone = "ebony";
            else if (mtoneTemp == 2) player.skinTone = "ashen";
            else if (mtoneTemp == 3) player.skinTone = "sable";
            else player.skinTone = "milky white";
            MainScreen.text(player.skin() + "!</b>");
            changes++;
        }
        //Change skin tone if not changed you!
        else if (!mystic && player.skinTone != "tan" && player.skinTone != "olive" && player.skinTone != "light" && changes < changeLimit && ((mystic && Utils.rand(2) == 0) || (!mystic && Utils.rand(3) == 0))) {
            MainScreen.text("\n\nYou feel a crawling sensation on the surface of your skin, starting at the small of your back and spreading to your extremities, ultimately reaching your face.  Holding an arm up to your face, you discover that <b>you now have ");
            let toneTemp: number = Utils.rand(3);
            if (toneTemp == 0) player.skinTone = "tan";
            else if (toneTemp == 1) player.skinTone = "olive";
            else player.skinTone = "light";
            MainScreen.text(player.skin() + "!</b>");
            changes++;
        }
        //[Change Skin Color: add "Tattoos"]
        //From Tan, Olive, or Light skin tones
        else if ((mystic && 9999 == 0 && (player.skinTone == "dark" || player.skinTone == "ebony" || player.skinTone == "ashen" || player.skinTone == "sable" || player.skinTone == "milky white")) || (!mystic && 9999 == 0 && (player.skinTone == "tan" || player.skinTone == "olive" || player.skinTone || "light")) && changes < changeLimit) {
            MainScreen.text("You feel a crawling sensation on the surface of your skin, starting at the small of your back and spreading to your extremities, ultimately reaching your face.  You are caught by surprise when you are suddenly assaulted by a blinding flash issuing from areas of your skin, and when the spots finally clear from your vision, an assortment of glowing tribal tattoos adorns your " + player.skin() + ".  The glow gradually fades, but the distinctive ");
            if (mystic) MainScreen.text("angular");
            else MainScreen.text("curved");
            MainScreen.text(" markings remain, as if etched into your skin.");
            changes++;
            //9999 - pending tats system
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
            MainScreen.text("\n\nOdd.  You don't feel any different.");
        }
    }
}