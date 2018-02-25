import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import { EarType } from '../../Body/Ears';
import { SkinType } from '../../Body/Skin';
import Tail, { TailType } from '../../Body/Tail';
import { VaginaType } from '../../Body/Vagina';
import Character from '../../Character/Character';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import SkinDescriptor from '../../Descriptors/SkinDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Game from '../../Game/Game';
import BodyModifier from '../../Modifiers/BodyModifier';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class FoxJewel extends Consumable {
    private mystic: boolean;

    public constructor(mystic: boolean) {
        if (mystic)
            super(ConsumableName.FoxJewelEnhanced, new ItemDesc("MystJwl", "a mystic jewel", "The flames within this jewel glow brighter than before, and have taken on a sinister purple hue.  It has been enhanced to increase its potency, allowing it to transform you more easily, but may have odd side-effects..."), 20);
        else
            super(ConsumableName.FoxJewel, new ItemDesc("Fox Jewel", "a fox jewel", "A shining teardrop-shaped jewel.  An eerie blue flame dances beneath the surface."));
        this.mystic = mystic;
    }

    public use(character: Character) {
        DisplayText().clear();
        let changes: number = 0;
        let changeLimit: number = 1;
        if (Utils.rand(2) === 0) changeLimit++;
        if (Utils.rand(3) === 0) changeLimit++;
        if (this.mystic) changeLimit += 2;
        if (character.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        if (this.mystic) DisplayText("You examine the jewel for a bit, rolling it around in your hand as you ponder its mysteries.  You hold it up to the light with fascinated curiosity, watching the eerie purple flame dancing within.  Without warning, the gem splits down the center, dissolving into nothing in your hand.  As the pale lavender flames swirl around you, the air is filled with a sickly sweet scent that drips with the bitter aroma of licorice, filling you with a dire warmth.");
        else DisplayText("You examine the jewel for a bit, rolling it around in your hand as you ponder its mysteries.  You hold it up to the light with fascinated curiosity, watching the eerie blue flame dancing within.  Without warning, the gem splits down the center, dissolving into nothing in your hand.  As the pale azure flames swirl around you, the air is filled with a sweet scent that drips with the aroma of wintergreen, sending chills down your spine.");

        // **********************
        // BASIC STATS
        // **********************
        // [increase Intelligence, Libido and Sensitivity]
        if (character.stats.int < 100 && changes < changeLimit && ((this.mystic && Utils.rand(2) === 0) || (!this.mystic && Utils.rand(4) === 0))) {
            DisplayText("\n\nYou close your eyes, smirking to yourself mischievously as you suddenly think of several new tricks to try on your opponents; you feel quite a bit more cunning.  The mental image of them helpless before your cleverness makes you shudder a bit, and you lick your lips and stroke yourself as you feel your skin tingling from an involuntary arousal.");
            // Raise INT, Lib, Sens. and +10 LUST
            character.stats.int += 2;
            character.stats.lib += 1;
            character.stats.sens += 2;
            character.stats.lust += 10;
            changes++;
        }
        // [decrease Strength toward 15]
        if (character.stats.str > 15 && changes < changeLimit && ((this.mystic && Utils.rand(2) === 0) || (!this.mystic && Utils.rand(3) === 0))) {
            DisplayText("\n\nYou can feel your muscles softening as they slowly relax, becoming a tad weaker than before.  Who needs physical strength when you can outwit your foes with trickery and mischief?  You tilt your head a bit, wondering where that thought came from.");
            character.stats.str += -1;
            if (character.stats.str > 70) character.stats.str += -1;
            if (character.stats.str > 50) character.stats.str += -1;
            if (character.stats.str > 30) character.stats.str += -1;
            changes++;
        }
        // [decrease Toughness toward 20]
        if (character.stats.tou > 20 && changes < changeLimit && ((this.mystic && Utils.rand(2) === 0) || (!this.mystic && Utils.rand(3) === 0))) {
            // from 66 or less toughness
            if (character.stats.tou <= 66) DisplayText("\n\nYou feel your " + SkinDescriptor.skinFurScales(character) + " becoming noticeably softer.  A gentle exploratory pinch on your arm confirms it - your " + SkinDescriptor.skinFurScales(character) + " won't offer you much protection.");
            // from 66 or greater toughness
            else DisplayText("\n\nYou feel your " + SkinDescriptor.skinFurScales(character) + " becoming noticeably softer.  A gentle exploratory pinch on your arm confirms it - your hide isn't quite as tough as it used to be.");
            character.stats.tou += -1;
            if (character.stats.tou > 66) character.stats.tou += -1;
            changes++;
        }
        if (this.mystic && changes < changeLimit && Utils.rand(2) === 0 && character.stats.cor < 100) {
            if (character.stats.cor < 33) DisplayText("\n\nA sense of dirtiness comes over you, like the magic of this gem is doing some perverse impropriety to you.");
            else if (character.stats.cor < 66) DisplayText("\n\nA tingling wave of sensation rolls through you, but you have no idea what exactly just changed.  It must not have been that important.");
            else DisplayText("\n\nThoughts of mischief roll across your consciousness, unbounded by your conscience or any concern for others.  You should really have some fun - who cares who it hurts, right?");
            character.stats.cor += 1;
        }

        // **********************
        // MEDIUM/SEXUAL CHANGES
        // **********************
        // [adjust Femininity toward 50]
        // from low to high
        // Your facial features soften as your body becomes more androgynous.
        // from high to low
        // Your facial features harden as your body becomes more androgynous.
        if (((this.mystic && Utils.rand(2) === 0) || (!this.mystic && Utils.rand(4) === 0)) && changes < changeLimit && character.femininity !== 50) {
            DisplayText(BodyModifier.displayModFem(character, 50, 2));
            changes++;
        }
        // [decrease muscle tone toward 40]
        if (character.tone >= 40 && changes < changeLimit && ((this.mystic && Utils.rand(2) === 0) || (!this.mystic && Utils.rand(4) === 0))) {
            DisplayText("\n\nMoving brings with it a little more jiggle than you're used to.  You don't seem to have gained weight, but your muscles seem less visible, and various parts of you are pleasantly softer.");
            character.tone -= 2 + Utils.rand(3);
            changes++;
        }

        // [Adjust hips toward 10 � wide/curvy/flared]
        // from narrow to wide
        if (character.torso.hips.rating < 10 && ((this.mystic && Utils.rand(2) === 0) || (!this.mystic && Utils.rand(3) === 0)) && changes < changeLimit) {
            character.torso.hips.rating++;
            if (character.torso.hips.rating < 7) character.torso.hips.rating++;
            if (character.torso.hips.rating < 4) character.torso.hips.rating++;
            DisplayText("\n\nYou stumble a bit as the bones in your pelvis rearrange themselves painfully.  Your hips have widened nicely!");
            changes++;
        }
        // from wide to narrower
        if (character.torso.hips.rating > 10 && ((this.mystic && Utils.rand(2) === 0) || (!this.mystic && Utils.rand(3) === 0)) && changes < changeLimit) {
            character.torso.hips.rating--;
            if (character.torso.hips.rating > 14) character.torso.hips.rating--;
            if (character.torso.hips.rating > 19) character.torso.hips.rating--;
            if (character.torso.hips.rating > 24) character.torso.hips.rating--;
            DisplayText("\n\nYou stumble a bit as the bones in your pelvis rearrange themselves painfully.  Your hips have narrowed.");
            changes++;
        }

        // [Adjust hair length toward range of 16-26 � very long to ass-length]
        if ((character.torso.neck.head.hair.length < 16 || character.torso.neck.head.hair.length > 26) && ((this.mystic && Utils.rand(2) === 0) || (!this.mystic && Utils.rand(3) === 0)) && changes < changeLimit) {
            // from short to long
            if (character.torso.neck.head.hair.length < 16) {
                character.torso.neck.head.hair.length += 3 + Utils.rand(3);
                DisplayText("\n\nYou experience a tingling sensation in your scalp.  Feeling a bit off-balance, you discover your hair has lengthened, becoming " + HeadDescriptor.describeHair(character) + ".");
            }
            // from long to short
            else {
                character.torso.neck.head.hair.length -= 3 + Utils.rand(3);
                DisplayText("\n\nYou experience a tingling sensation in your scalp.  Feeling a bit off-balance, you discover your hair has shed a bit of its length, becoming " + HeadDescriptor.describeHair(character) + ".");
            }
            changes++;
        }
        // [Increase Vaginal Capacity] - requires vagina, of course
        if (character.torso.vaginas.count > 0 && ((this.mystic && Utils.rand(2) === 0) || (!this.mystic && Utils.rand(3) === 0)) && character.statusAffects.get(StatusAffectType.BonusVCapacity).value1 < 200 && changes < changeLimit) {
            DisplayText("\n\nA gurgling sound issues from your abdomen, and you double over as a trembling ripple passes through your womb.  The flesh of your stomach roils as your internal organs begin to shift, and when the sensation finally passes, you are instinctively aware that your " + VaginaDescriptor.describeVagina(character, character.torso.vaginas.get(0)) + " is a bit deeper than it was before.");
            if (!character.statusAffects.has(StatusAffectType.BonusVCapacity)) {
                character.statusAffects.add(StatusAffectType.BonusVCapacity, 0, 0, 0, 0);
            }
            character.statusAffects.get(StatusAffectType.BonusVCapacity).value1 = 5 + Utils.rand(10);
            changes++;
        }
        // [Vag of Holding] - rare effect, only if PC has high vaginal looseness
        else if (character.torso.vaginas.count > 0 && ((this.mystic) || (!this.mystic && Utils.rand(5) === 0)) && character.statusAffects.get(StatusAffectType.BonusVCapacity).value1 >= 200 && character.statusAffects.get(StatusAffectType.BonusVCapacity).value1 < 8000 && changes < changeLimit) {
            DisplayText("\n\nYou clutch your stomach with both hands, dropping to the ground in pain as your internal organs begin to twist and shift violently inside you.  As you clench your eyes shut in agony, you are overcome with a sudden calm.  The pain in your abdomen subsides, and you feel at one with the unfathomable infinity of the universe, warmth radiating through you from the vast swirling cosmos contained within your womb.");
            if (Game.silly()) DisplayText("  <b>Your vagina has become a universe unto itself, capable of accepting colossal insertions beyond the scope of human comprehension!</b>");
            else DisplayText("  <b>Your vagina is now capable of accepting even the most ludicrously sized insertions with no ill effects.</b>");
            character.statusAffects.get(StatusAffectType.BonusVCapacity).value1 = 8000;
            changes++;
        }

        // **********************
        // BIG APPEARANCE CHANGES
        // **********************
        // [Grow Fox Tail]
        if (!character.torso.tails.reduce(Tail.HasType(TailType.FOX), false) && changes < changeLimit && ((this.mystic && Utils.rand(2) === 0) || (!this.mystic && Utils.rand(4) === 0))) {
            // if PC has no tail
            if (character.torso.tails.count >= 1) {
                DisplayText("\n\nA pressure builds on your backside.  You feel under your " + character.inventory.equipment.armor.displayName + " and discover a strange nodule growing there that seems to be getting larger by the second.  With a sudden flourish of movement, it bursts out into a long and bushy tail that sways hypnotically, as if it has a mind of its own.  <b>You now have a fox-tail.</b>");
            }
            // if PC has another type of tail
            else {
                DisplayText("\n\nPain lances through your lower back as your tail shifts and twitches violently.  With one final aberrant twitch, it fluffs out into a long, bushy fox tail that whips around in an almost hypnotic fashion.  <b>You now have a fox-tail.</b>");
            }
            const newTail = new Tail();
            newTail.type = TailType.FOX;
            character.torso.tails.add(newTail);
            changes++;
        }
        const foxTailCount = character.torso.tails.filter(Tail.FilterType(TailType.FOX)).length;
        if (!this.mystic && character.torso.neck.head.ears.type === EarType.FOX && foxTailCount === 8 && Utils.rand(3) === 0) {
            DisplayText("\n\nYou have the feeling that if you could grow a ninth tail you would be much more powerful, but you would need to find a way to enhance one of these gems or meditate with one to have a chance at unlocking your full potential.");
        }
        // [Grow Addtl. Fox Tail]
        // (rare effect, up to max of 8 tails, requires PC level and int*10 = number of tail to be added)
        else if (foxTailCount < 8 &&
            foxTailCount + 1 <= character.stats.level &&
            foxTailCount + 1 <= character.stats.int / 10 &&
            changes < changeLimit &&
            ((this.mystic && Utils.rand(2) === 0) || (!this.mystic && Utils.rand(3) === 0))
        ) {
            // if PC has 1 fox tail
            if (foxTailCount === 1) {
                DisplayText("\n\nA tingling pressure builds on your backside, and your bushy tail begins to glow with an eerie, ghostly light.  With a crackle of electrical energy, your tail splits into two!  <b>You now have a pair of fox-tails.</b>");
                // increment tail by 1
            }
            // else if PC has 2 or more fox tails
            else {
                DisplayText("\n\nA tingling pressure builds on your backside, and your bushy tails begin to glow with an eerie, ghostly light.  With a crackle of electrical energy, one of your tails splits in two, giving you " + Utils.numToCardinalText(foxTailCount + 1) + "!  <b>You now have a cluster of " + Utils.numToCardinalText(foxTailCount + 1) + " fox-tails.</b>");
                // increment tail by 1
            }
            const newTail = new Tail();
            newTail.type = TailType.FOX;
            character.torso.tails.add(newTail);
            changes++;
        }
        // [Grow 9th tail and gain Corrupted Nine-tails perk]
        else if (this.mystic && Utils.rand(4) === 0 &&
            changes < changeLimit &&
            foxTailCount === 8 &&
            character.stats.level >= 9 &&
            character.torso.neck.head.ears.type === EarType.FOX &&
            character.stats.int >= 90 &&
            !character.perks.has(PerkType.CorruptedNinetails) &&
            !character.perks.has(PerkType.EnlightenedNinetails)
        ) {
            DisplayText("Your bushy tails begin to glow with an eerie, ghostly light, and with a crackle of electrical energy, split into nine tails.  <b>You are now a nine-tails!  But something is wrong...  The cosmic power radiating from your body feels...  tainted somehow.  The corruption pouring off your body feels...  good.</b>");
            DisplayText("\n\nYou have the inexplicable urge to set fire to the world, just to watch it burn.  With your newfound power, it's a goal that is well within reach.");
            DisplayText("\n\n(Perk Gained: Corrupted Nine-tails - Grants two magical special attacks.)");
            character.perks.add(PerkType.CorruptedNinetails, 0, 0, 0, 0);
            character.stats.lib += 2;
            character.stats.lust += 10;
            character.stats.cor += 10;
            changes++;
        }

        // [Grow Fox Ears]
        if (character.torso.tails.reduce(Tail.HasType(TailType.FOX), false) && ((this.mystic && Utils.rand(2) === 0) || (!this.mystic && Utils.rand(4) === 0)) && character.torso.neck.head.ears.type !== EarType.FOX && changes < changeLimit) {
            // if PC has non-animal ears
            if (character.torso.neck.head.ears.type === EarType.HUMAN) DisplayText("\n\nThe sides of your face painfully stretch as your ears morph and begin to migrate up past your hairline, toward the top of your head.  They elongate, becoming large vulpine triangles covered in bushy fur.  You now have fox ears.");
            // if PC has animal ears
            else DisplayText("\n\nYour ears change shape, shifting from their current shape to become vulpine in nature.  You now have fox ears.");
            character.torso.neck.head.ears.type = EarType.FOX;
            changes++;
        }
        // [Change Hair Color: Golden-blonde, SIlver Blonde, White, Black, Red]
        if (((this.mystic && Utils.rand(2) === 0) || (!this.mystic && Utils.rand(4) === 0)) && changes < changeLimit && character.torso.neck.head.hair.color !== "golden blonde" && character.torso.neck.head.hair.color !== "silver blonde" && character.torso.neck.head.hair.color !== "white" && character.torso.neck.head.hair.color !== "black" && character.torso.neck.head.hair.color !== "red") {
            const hairTemp: number = Utils.rand(10);
            if (hairTemp === 0) character.torso.neck.head.hair.color = "golden blonde";
            else if (hairTemp === 1) character.torso.neck.head.hair.color = "silver blonde";
            else if (hairTemp <= 3) character.torso.neck.head.hair.color = "white";
            else if (hairTemp <= 6) character.torso.neck.head.hair.color = "black";
            else character.torso.neck.head.hair.color = "red";
            DisplayText("\n\nYour scalp begins to tingle, and you gently grasp a stUtils.Utils.rand, pulling it forward to check it.  Your hair has become the same " + character.torso.neck.head.hair.color + " as a kitsune's!");
            changes++;
        }
        // [Change Skin Type: remove fur or scales, change skin to Tan, Olive, or Light]
        if (character.skin.type === SkinType.FUR || character.skin.type === SkinType.SCALES && ((this.mystic) || (!this.mystic && Utils.rand(2) === 0))) {
            DisplayText("\n\nYou begin to tingle all over your " + SkinDescriptor.skin(character) + ", starting as a cool, pleasant sensation but gradually worsening until you are furiously itching all over.");
            if (character.skin.type === SkinType.FUR) DisplayText("  You stare in horror as you pull your fingers away holding a handful of " + character.torso.neck.head.hair.color + " fur!  Your fur sloughs off your body in thick clumps, falling away to reveal patches of bare, " + character.skin.tone + " skin.");
            else if (character.skin.type === SkinType.SCALES) DisplayText("  You stare in horror as you pull your fingers away holding a handful of dried up scales!  Your scales continue to flake and peel off your skin in thick patches, revealing the tender " + character.skin.tone + " skin underneath.");
            DisplayText("  Your skin slowly turns raw and red under your severe scratching, the tingling sensations raising goosebumps across your whole body.  Over time, the itching fades, and your flushed skin resolves into a natural-looking ");
            character.skin.type = SkinType.PLAIN;
            character.skin.adj = "";
            character.skin.desc = "skin";
            if (!this.mystic && character.skin.tone !== "tan" && character.skin.tone !== "olive" && character.skin.tone !== "light") {
                const skinTemp: number = Utils.rand(3);
                if (skinTemp === 0) character.skin.tone = "tan";
                else if (skinTemp === 1) character.skin.tone = "olive";
                else character.skin.tone = "light";
            }
            else if (this.mystic && character.skin.tone !== "dark" && character.skin.tone !== "ebony" && character.skin.tone !== "ashen" && character.skin.tone !== "sable" && character.skin.tone !== "milky white") {
                const skinT: number = Utils.rand(5);
                if (skinT === 0) character.skin.tone = "dark";
                else if (skinT === 1) character.skin.tone = "ebony";
                else if (skinT === 2) character.skin.tone = "ashen";
                else if (skinT === 3) character.skin.tone = "sable";
                else character.skin.tone = "milky white";
            }
            DisplayText(character.skin.tone + " complexion.");
            DisplayText("  <b>You now have " + SkinDescriptor.skin(character) + "!</b>");
            changes++;
        }
        // Change skin tone if not changed you!
        else if (this.mystic && character.skin.tone !== "dark" && character.skin.tone !== "ebony" && character.skin.tone !== "ashen" && character.skin.tone !== "sable" && character.skin.tone !== "milky white" && changes < changeLimit && ((this.mystic && Utils.rand(2) === 0) || (!this.mystic && Utils.rand(3) === 0))) {
            DisplayText("\n\nYou feel a crawling sensation on the surface of your skin, starting at the small of your back and spreading to your extremities, ultimately reaching your face.  Holding an arm up to your face, you discover that <b>you now have ");
            const mtoneTemp: number = Utils.rand(5);
            if (mtoneTemp === 0) character.skin.tone = "dark";
            else if (mtoneTemp === 1) character.skin.tone = "ebony";
            else if (mtoneTemp === 2) character.skin.tone = "ashen";
            else if (mtoneTemp === 3) character.skin.tone = "sable";
            else character.skin.tone = "milky white";
            DisplayText(SkinDescriptor.skin(character) + "!</b>");
            changes++;
        }
        // Change skin tone if not changed you!
        else if (!this.mystic && character.skin.tone !== "tan" && character.skin.tone !== "olive" && character.skin.tone !== "light" && changes < changeLimit && ((this.mystic && Utils.rand(2) === 0) || (!this.mystic && Utils.rand(3) === 0))) {
            DisplayText("\n\nYou feel a crawling sensation on the surface of your skin, starting at the small of your back and spreading to your extremities, ultimately reaching your face.  Holding an arm up to your face, you discover that <b>you now have ");
            const toneTemp: number = Utils.rand(3);
            if (toneTemp === 0) character.skin.tone = "tan";
            else if (toneTemp === 1) character.skin.tone = "olive";
            else character.skin.tone = "light";
            DisplayText(SkinDescriptor.skin(character) + "!</b>");
            changes++;
        }
        // [Change Skin Color: add "Tattoos"]
        // From Tan, Olive, or Light skin tones
        /*else if ((this.mystic && false && (character.skin.tone == "dark" || character.skin.tone == "ebony" || character.skin.tone == "ashen" || character.skin.tone == "sable" || character.skin.tone == "milky white")) || (!this.mystic && false && (character.skin.tone == "tan" || character.skin.tone == "olive" || character.skin.tone || "light")) && changes < changeLimit) {
            DisplayText("You feel a crawling sensation on the surface of your skin, starting at the small of your back and spreading to your extremities, ultimately reaching your face.  You are caught by surprise when you are suddenly assaulted by a blinding flash issuing from areas of your skin, and when the spots finally clear from your vision, an assortment of glowing tribal tattoos adorns your " + SkinDescriptor.skin(character) + ".  The glow gradually fades, but the distinctive ");
            if (this.mystic) DisplayText("angular");
            else DisplayText("curved");
            DisplayText(" markings remain, as if etched into your skin.");
            changes++;
            //9999 - pending tats system
        }*/
        // Nipples Turn Back:
        if (character.statusAffects.has(StatusAffectType.BlackNipples) && changes < changeLimit && Utils.rand(3) === 0) {
            DisplayText("\n\nSomething invisible brushes against your " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            changes++;
            character.statusAffects.remove(StatusAffectType.BlackNipples);
        }
        // Debugcunt
        if (changes < changeLimit && Utils.rand(3) === 0 && character.torso.vaginas.get(0).type !== VaginaType.HUMAN && character.torso.vaginas.count > 0) {
            DisplayText("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
            character.torso.vaginas.get(0).type = VaginaType.HUMAN;
            changes++;
        }
        if (changes === 0) {
            DisplayText("\n\nOdd.  You don't feel any different.");
        }
    }
}
