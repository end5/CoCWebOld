import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt, randomChoice } from '../../../Engine/Utilities/SMath';
import { BreastRow } from '../../Body/BreastRow';
import { Cock, CockType } from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import { FaceType } from '../../Body/Face';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import { Tail, TailType } from '../../Body/Tail';
import { VaginaType } from '../../Body/Vagina';
import { Character } from '../../Character/Character';
import { PlayerFlags } from '../../Character/Player/PlayerFlags';
import { Desc } from '../../Descriptors/Descriptors';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import { Menus } from '../../Menus/Menus';
import { Mod } from '../../Modifiers/Modifiers';
import { User } from '../../User';
import { numToCardinalText, numToOrdinalText } from '../../Utilities/NumToText';
import { ItemDesc } from '../ItemDesc';

export class FoxBerry extends Consumable {
    private enhanced: boolean;
    public constructor(enhanced: boolean) {
        if (!enhanced)
            super(ConsumableName.FoxBerry, new ItemDesc("Fox Berry", "a fox berry", "This large orange berry is heavy in your hands.  It may have gotten its name from its bright orange coloration.  You're certain it is no mere fruit."));
        else
            super(ConsumableName.FoxBerryEnhanced, new ItemDesc("VixVigr", "a bottle labelled \"Vixen's Vigor\"", "This small medicine bottle contains something called \"Vixen's Vigor\", supposedly distilled from common fox-berries.  It is supposed to be a great deal more potent, and a small warning label warns of \"extra boobs\", whatever that means."), 30);
        this.enhanced = enhanced;
    }

    public use(character: Character) {
        DisplayText().clear();
        if (!this.enhanced) DisplayText("You examine the berry a bit, rolling the orangish-red fruit in your hand for a moment before you decide to take the plunge and chow down.  It's tart and sweet at the same time, and the flavors seem to burst across your tongue with potent strength.  Juice runs from the corners of your lips as you finish the tasty snack.");
        else DisplayText("You pop the cap on the enhanced \"Vixen's Vigor\" and decide to take a swig of it.  Perhaps it will make you as cunning as the crude fox Lumi drew on the front?");
        let changes: number = 0;
        let changeLimit: number = 1;
        if (this.enhanced) changeLimit += 2;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(2) === 0) changeLimit++;

        if (character.torso.neck.head.face.type === FaceType.FOX &&
            character.torso.tails.reduce(Tail.HasType(TailType.FOX), false) &&
            character.torso.neck.head.ears.type === EarType.FOX &&
            character.torso.hips.legs.type === LegType.FOX &&
            character.skin.type === SkinType.FUR && randInt(3) === 0
        ) {
            if ((User.flags.get("Player") as PlayerFlags).FOX_BAD_END_WARNING === 0) {
                DisplayText("\n\nYou get a massive headache and a craving to raid a henhouse.  Thankfully, both pass in seconds, but <b>maybe you should cut back on the vulpine items...</b>");
                (User.flags.get("Player") as PlayerFlags).FOX_BAD_END_WARNING = 1;
            }
            else {
                DisplayText("\n\nYou scarf down the ");
                if (this.enhanced) DisplayText("fluid ");
                else DisplayText("berries ");
                DisplayText("with an uncommonly voracious appetite, taking particular enjoyment in the succulent, tart flavor.  As you carefully suck the last drops of ochre juice from your fingers, you note that it tastes so much more vibrant than you remember.  Your train of thought is violently interrupted by the sound of bones snapping, and you cry out in pain, doubling over as a flaming heat boils through your ribs.");
                DisplayText("\n\nWrithing on the ground, you clutch your hand to your chest, looking on in horror through tear-streaked eyes as the bones in your fingers pop and fuse, rearranging themselves into a dainty paw covered in coarse black fur, fading to a ruddy orange further up.  You desperately try to call out to someone - anyone - for help, but all that comes out is a high-pitched, ear-splitting yap.");
                if (character.torso.tails.filter(Tail.FilterType(TailType.FOX))[0].vemon > 1) DisplayText("  Your tails thrash around violently as they begin to fuse painfully back into one, the fur bristling back out with a flourish.");
                DisplayText("\n\nA sharp spark of pain jolts through your spinal column as the bones shift themselves around, the joints in your hips migrating forward.  You continue to howl in agony even as you feel your intelligence slipping away.  In a way, it's a blessing - as your thoughts grow muddied, the pain is dulled, until you are finally left staring blankly at the sky above, tilting your head curiously.");
                DisplayText("\n\nYou roll over and crawl free of the " + character.inventory.equipment.armor.displayName + " covering you, pawing the ground for a few moments before a pang of hunger rumbles through your stomach.  Sniffing the wind, you bound off into the wilderness, following the telltale scent of a farm toward the certain bounty of a chicken coop.");
                return { next: Menus.GameOver };
            }
        }
        // [increase Intelligence, Libido and Sensitivity]
        if (changes < changeLimit && randInt(3) === 0 && (character.stats.lib < 80 || character.stats.int < 80 || character.stats.sens < 80)) {
            DisplayText("\n\nYou close your eyes, smirking to yourself mischievously as you suddenly think of several new tricks to try on your opponents; you feel quite a bit more cunning.  The mental picture of them helpless before your cleverness makes you shudder a bit, and you lick your lips and stroke yourself as you feel your skin tingling from an involuntary arousal.");
            if (character.stats.int < 80) character.stats.int += 4;
            if (character.stats.lib < 80) character.stats.lib += 1;
            if (character.stats.sens < 80) character.stats.sens += 1;
            // gain small lust also
            character.stats.lust += 10;
            changes++;
        }
        // [decrease Strength] (to some floor) // I figured 15 was fair, but you're in a better position to judge that than I am.
        if (changes < changeLimit && randInt(3) === 0 && character.stats.str > 40) {
            DisplayText("\n\nYou can feel your muscles softening as they slowly relax, becoming a tad weaker than before.  Who needs physical strength when you can outwit your foes with trickery and mischief?  You tilt your head a bit, wondering where that thought came from.");
            character.stats.str += -1;
            if (character.stats.str > 60) character.stats.str += -1;
            if (character.stats.str > 80) character.stats.str += -1;
            if (character.stats.str > 90) character.stats.str += -1;
            changes++;
        }
        // [decrease Toughness] (to some floor) // 20 or so was my thought here
        if (changes < changeLimit && randInt(3) === 0 && character.stats.tou > 30) {
            if (character.stats.tou < 60) DisplayText("\n\nYou feel your skin becoming noticeably softer.  A gentle exploratory pinch on your arm confirms it - your supple skin isn't going to offer you much protection.");
            else DisplayText("\n\nYou feel your skin becoming noticeably softer.  A gentle exploratory pinch on your arm confirms it - your hide isn't quite as tough as it used to be.");
            character.stats.tou += -1;
            if (character.stats.str > 60) character.stats.tou += -1;
            if (character.stats.str > 80) character.stats.tou += -1;
            if (character.stats.str > 90) character.stats.tou += -1;
            changes++;
        }

        // [Change Hair Color: Golden-blonde or Reddish-orange]
        if (character.torso.neck.head.hair.color !== "golden-blonde" && character.torso.neck.head.hair.color !== "reddish-orange" && character.torso.neck.head.hair.color !== "silver" && character.torso.neck.head.hair.color !== "white" && character.torso.neck.head.hair.color !== "red" && character.torso.neck.head.hair.color !== "black" && changes < changeLimit && randInt(4) === 0) {
            const hairTemp: number = randInt(10);
            if (hairTemp < 5) character.torso.neck.head.hair.color = "reddish-orange";
            else if (hairTemp < 7) character.torso.neck.head.hair.color = "red";
            else if (hairTemp < 8) character.torso.neck.head.hair.color = "golden-blonde";
            else if (hairTemp < 9) character.torso.neck.head.hair.color = "silver";
            else character.torso.neck.head.hair.color = "black";
            DisplayText("\n\nYour scalp begins to tingle, and you gently grasp a strand( of hair, pulling it out to check it.  Your hair has become " + character.torso.neck.head.hair.color + "!");
        }
        // [Adjust hips toward 10 � wide/curvy/flared]
        if (changes < changeLimit && randInt(3) === 0 && character.torso.hips.rating !== 10) {
            // from narrow to wide
            if (character.torso.hips.rating < 10) {
                DisplayText("\n\nYou stumble a bit as the bones in your pelvis rearrange themselves painfully.  Your waistline has widened into [hips]!");
                character.torso.hips.rating++;
                if (character.torso.hips.rating < 7) character.torso.hips.rating++;
            }
            // from wide to narrower
            else {
                DisplayText("\n\nYou stumble a bit as the bones in your pelvis rearrange themselves painfully.  Your waistline has narrowed, becoming [hips].");
                character.torso.hips.rating--;
                if (character.torso.hips.rating > 15) character.torso.hips.rating--;
            }
            changes++;
        }
        // [Remove tentacle hair]
        // required if the hair length change below is triggered
        if (changes < changeLimit && character.torso.neck.head.hair.type === 4 && randInt(3) === 0) {
            // -insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
            DisplayText("\n\nEerie flames of the jewel migrate up your body to your head, where they cover your [hair].  Though they burned nowhere else in their lazy orbit, your head begins to heat up as they congregate.  Fearful, you raise your hands to it just as the temperature peaks, but as you touch your hair, the searing heat is suddenly gone - along with your tentacles!  <b>Your hair is normal again!</b>");
            character.torso.neck.head.hair.type = 0;
            changes++;
        }
        // [Adjust hair length toward range of 16-26 � very long to ass-length]
        if (character.torso.neck.head.hair.type !== 4 && (character.torso.neck.head.hair.length > 26 || character.torso.neck.head.hair.length < 16) && changes < changeLimit && randInt(4) === 0) {
            if (character.torso.neck.head.hair.length < 16) {
                character.torso.neck.head.hair.length += 1 + randInt(4);
                DisplayText("\n\nYou experience a tingling sensation in your scalp.  Feeling a bit off-balance, you discover your hair has lengthened, becoming " + numToCardinalText(Math.round(character.torso.neck.head.hair.length)) + " inches long.");
            }
            else {
                character.torso.neck.head.hair.length -= 1 + randInt(4);
                DisplayText("\n\nYou experience a tingling sensation in your scalp.  Feeling a bit off-balance, you discover your hair has shed a bit of its length, becoming " + numToCardinalText(Math.round(character.torso.neck.head.hair.length)) + " inches long.");
            }
            changes++;
        }
        if (changes < changeLimit && randInt(10) === 0) {
            DisplayText("\n\nYou sigh as the exotic flavor washes through you, and unbidden, you begin to daydream.  Sprinting through the thicket, you can feel the corners of your muzzle curling up into a mischievous grin.  You smell the scent of demons, and not far away either.  With your belly full and throat watered, now is the perfect time for a little bit of trickery.   As the odor intensifies, you slow your playful gait and begin to creep a bit more carefully.");
            DisplayText("\n\nSuddenly, you are there, at a demonic camp, and you spy the forms of an incubus and a succubus, their bodies locked together at the hips and slowly undulating, even in sleep.  You carefully prance around their slumbering forms and find their supplies.  With the utmost care, you put your razor-sharp teeth to work, and slowly, meticulously rip through their packs - not with the intention of theft, but with mischief.  You make sure to leave small holes in the bottom of each, and after making sure your stealth remains unbroken, you urinate on their hooves.");
            DisplayText("\n\nThey don't even notice, so lost in the subconscious copulation as they are.  Satisfied at your petty tricks, you scurry off into the night, a red blur amidst the foliage.");
            changes++;
            character.stats.fatigue -= 10;
        }

        // dog cocks!
        if (changes < changeLimit && randInt(3) === 0 && character.torso.cocks.filter(Cock.FilterType(CockType.DOG)).length < character.torso.cocks.count) {
            const cockChoices = character.torso.cocks.filter(Cock.FilterType(CockType.DOG));
            if (cockChoices.length !== 0) {
                const selectedCock = randomChoice(cockChoices);
                if (selectedCock.type === CockType.HUMAN) {
                    DisplayText("\n\nYour " + Desc.Cock.describeCock(character, selectedCock) + " clenches painfully, becoming achingly, throbbingly erect.  A tightness seems to squeeze around the base, and you wince as you see your skin and flesh shifting forwards into a canine-looking sheath.  You shudder as the crown of your " + Desc.Cock.describeCock(character, selectedCock) + " reshapes into a point, the sensations nearly too much for you.  You throw back your head as the transformation completes, your " + Desc.Cock.nounCock(CockType.DOG) + " much thicker than it ever was before.  <b>You now have a dog-cock.</b>");
                    selectedCock.thickness += .3;
                    character.stats.sens += 10;
                    character.stats.lust += 5;
                }
                // Horse
                else if (selectedCock.type === CockType.HORSE) {
                    DisplayText("\n\nYour " + Desc.Cock.nounCock(CockType.HORSE) + " shrinks, the extra equine length seeming to shift into girth.  The flared tip vanishes into a more pointed form, a thick knotted bulge forming just above your sheath.  <b>You now have a dog-cock.</b>");
                    // Tweak length/thickness.
                    if (selectedCock.length > 6) selectedCock.length -= 2;
                    else selectedCock.length -= .5;
                    selectedCock.thickness += .5;

                    character.stats.sens += 4;
                    character.stats.lust += 5;
                }
                // Tentacular Tuesday!
                else if (selectedCock.type === CockType.TENTACLE) {
                    DisplayText("\n\nYour " + Desc.Cock.describeCock(character, selectedCock) + " coils in on itself, reshaping and losing its plant-like coloration as thickens near the base, bulging out in a very canine-looking knot.  Your skin bunches painfully around the base, forming into a sheath.  <b>You now have a dog-cock.</b>");
                    character.stats.sens += 4;
                    character.stats.lust += 10;
                }
                // Misc
                else {
                    DisplayText("\n\nYour " + Desc.Cock.describeCock(character, selectedCock) + " trembles, reshaping itself into a shiny red doggie-dick with a fat knot at the base.  <b>You now have a dog-cock.</b>");
                    character.stats.sens += 4;
                    character.stats.lust += 10;
                }
                selectedCock.type = CockType.DOG;
                selectedCock.knotMultiplier = 1.25;
                changes++;
            }

        }
        // Cum Multiplier Xform
        if (character.cumQ() < 5000 && randInt(3) === 0 && changes < changeLimit && character.torso.cocks.count > 0) {
            let cumMultiplierChange: number = 2 + randInt(4);
            // Lots of cum raises cum multiplier cap to 2 instead of 1.5
            if (character.perks.has(PerkType.MessyOrgasms)) cumMultiplierChange += randInt(10);
            character.cumMultiplier += cumMultiplierChange;
            // Flavor text
            if (character.torso.balls.quantity === 0) DisplayText("\n\nYou feel a churning inside your gut as something inside you changes.");
            if (character.torso.balls.quantity > 0) DisplayText("\n\nYou feel a churning in your " + Desc.Balls.describeBalls(true, true, character) + ".  It quickly settles, leaving them feeling somewhat more dense.");
            DisplayText("  A bit of milky pre dribbles from your " + Desc.Cock.describeMultiCockShort(character) + ", pushed out by the change.");
            changes++;
        }
        if (changes < changeLimit && character.torso.balls.quantity > 0 && character.torso.balls.size > 4 && randInt(3) === 0) {
            DisplayText("\n\nYour [sack] gets lighter and lighter, the skin pulling tight around your shrinking balls until you can't help but check yourself.");
            if (character.torso.balls.size > 10) character.torso.balls.size -= 5;
            if (character.torso.balls.size > 20) character.torso.balls.size -= 4;
            if (character.torso.balls.size > 30) character.torso.balls.size -= 4;
            if (character.torso.balls.size > 40) character.torso.balls.size -= 4;
            if (character.torso.balls.size > 50) character.torso.balls.size -= 8;
            if (character.torso.balls.size > 60) character.torso.balls.size -= 8;
            if (character.torso.balls.size <= 10) character.torso.balls.size--;
            changes++;
            DisplayText("  You now have a [balls].");
        }
        // Sprouting more!
        if (changes < changeLimit && this.enhanced && character.torso.chest.count < 4 && character.torso.chest.get(character.torso.chest.count - 1).rating > 1) {
            const bottomBreastRow = character.torso.chest.get(character.torso.chest.count - 1);
            DisplayText("\n\nYour belly rumbles unpleasantly for a second as the ");
            if (!this.enhanced) DisplayText("berry ");
            else DisplayText("drink ");
            DisplayText("settles deeper inside you.  A second later, the unpleasant gut-gurgle passes, and you let out a tiny burp of relief.  Before you finish taking a few breaths, there's an itching below your " + Desc.Breast.describeAllBreasts(character) + ".  You idly scratch at it, but gods be damned, it hurts!  You peel off part of your " + character.inventory.equipment.armor.displayName + " to inspect the unwholesome itch, ");
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 8) DisplayText("it's difficult to see past the wall of tits obscuring your view.");
            else DisplayText("it's hard to get a good look at.");
            DisplayText("  A few gentle prods draw a pleasant gasp from your lips, and you realize that you didn't have an itch - you were growing new nipples!");
            DisplayText("\n\nA closer examination reveals your new nipples to be just like the ones above in size and shape");
            if (bottomBreastRow.nipples.count > 1) DisplayText(", not to mention number");
            else if (bottomBreastRow.nipples.fuckable) DisplayText(", not to mention penetrability");
            DisplayText(".  While you continue to explore your body's newest addition, a strange heat builds behind the new nubs. Soft, jiggly breastflesh begins to fill your cupped hands.  Radiant warmth spreads through you, eliciting a moan of pleasure from your lips as your new breasts catch up to the pair above.  They stop at " + Desc.Breast.breastCup(bottomBreastRow.rating) + "s.  <b>You have " + numToCardinalText(character.torso.chest.count + 1) + " rows of breasts!</b>");
            const newBreastRow = new BreastRow();
            newBreastRow.rating = bottomBreastRow.rating;
            newBreastRow.lactationMultiplier = bottomBreastRow.lactationMultiplier;
            newBreastRow.nipples.count = bottomBreastRow.nipples.count;
            newBreastRow.nipples.fuckable = bottomBreastRow.nipples.fuckable;
            newBreastRow.nipples.length = bottomBreastRow.nipples.length;
            character.torso.chest.add(newBreastRow);
            character.stats.sens += 2;
            character.stats.lust += 30;
            changes++;
        }
        if (character.torso.chest.count > 1) {
            let tits: boolean = false;
            let currentRow: BreastRow;
            let rowAboveCurrentRow: BreastRow;
            let chance: number;
            for (let indexReverseChestCompare: number = character.torso.chest.count - 1; indexReverseChestCompare > 1; indexReverseChestCompare--) {
                currentRow = character.torso.chest.get(indexReverseChestCompare);
                rowAboveCurrentRow = character.torso.chest.get(indexReverseChestCompare - 1);
                if (currentRow.rating <= rowAboveCurrentRow.rating - 1 && changes < changeLimit && randInt(2) === 0) {
                    if (tits)
                        DisplayText("\n\nThey aren't the only pair to go through a change!  Another row of growing bosom goes through the process with its sisters, getting larger.");
                    else {
                        chance = randInt(3);
                        if (chance === 1)
                            DisplayText("\n\nA faint warmth buzzes to the surface of your " + Desc.Breast.describeBreastRow(currentRow) + ", the fluttering tingles seeming to vibrate faster and faster just underneath your " + Desc.Skin.skin(character) + ".  Soon, the heat becomes uncomfortable, and that row of chest-flesh begins to feel tight, almost thrumming like a newly-stretched drum.  You " + Desc.Breast.describeNipple(character, currentRow) + "s go rock hard, and though the discomforting feeling of being stretched fades, the pleasant, warm buzz remains.  It isn't until you cup your tingly tits that you realize they've grown larger, almost in envy of the pair above.");
                        else if (chance === 2)
                            DisplayText("\n\nA faintly muffled gurgle emanates from your " + Desc.Breast.describeBreastRow(currentRow) + " for a split-second, just before your flesh shudders and shakes, stretching your " + Desc.Skin.skinFurScales(character) + " outward with newly grown breast.  Idly, you cup your hands to your swelling bosom, and though it stops soon, you realize that your breasts have grown closer in size to the pair above.");
                        else {
                            DisplayText("\n\nAn uncomfortable stretching sensation spreads its way across the curves of your " + Desc.Breast.describeBreastRow(currentRow) + ", threads of heat tingling through your flesh.  It feels as though your heartbeat has been magnified tenfold within the expanding mounds, your " + Desc.Skin.skin(character) + " growing flushed with arousal and your " + Desc.Breast.describeNipple(character, currentRow) + " filling with warmth.  As the tingling heat gradually fades, a few more inches worth of jiggling breast spill forth.  Cupping them experimentally, you confirm that they have indeed grown to be a bit more in line with the size of the pair above.");
                        }
                    }
                    // Bigger change!
                    if (currentRow.rating <= rowAboveCurrentRow.rating - 3)
                        currentRow.rating += 2 + randInt(2);
                    // Smallish change.
                    else currentRow.rating++;
                    DisplayText("  You do a quick measurement and determine that your " + numToOrdinalText(indexReverseChestCompare + 1) + " row of breasts are now " + Desc.Breast.breastCup(currentRow.rating) + "s.");

                    if (!tits) {
                        tits = true;
                        changes++;
                    }
                    character.stats.sens += 2;
                    character.stats.lust += 10;
                }
            }
        }
        // HEAT!
        if (character.statusAffects.get(StatusAffectType.Heat).value2 < 30 && randInt(6) === 0 && changes < changeLimit) {
            if (Mod.Body.displayGoIntoHeat(character)) {
                changes++;
            }
        }
        // [Grow Fur]
        // FOURTH
        if ((this.enhanced || character.torso.hips.legs.type === LegType.FOX) && character.skin.type !== SkinType.FUR && changes < changeLimit && randInt(4) === 0) {
            // from scales
            if (character.skin.type === SkinType.SCALES) DisplayText("\n\nYour skin shifts and every scale stands on end, sending you into a mild panic.  No matter how you tense, you can't seem to flatten them again.  The uncomfortable sensation continues for some minutes until, as one, every scale falls from your body and a fine coat of fur pushes out.  You briefly consider collecting them, but when you pick one up, it's already as dry and brittle as if it were hundreds of years old.  <b>Oh well; at least you won't need to sun yourself as much with your new fur.</b>");
            // from skin
            else DisplayText("\n\nYour skin itches all over, the sudden intensity and uniformity making you too paranoid to scratch.  As you hold still through an agony of tiny tingles and pinches, fine, luxuriant fur sprouts from every bare inch of your skin!  <b>You'll have to get used to being furry...</b>");
            character.skin.type = SkinType.FUR;
            character.skin.adj = "";
            character.skin.desc = "fur";
            changes++;
        }
        // [Grow Fox Legs]
        // THIRD
        if ((this.enhanced || character.torso.neck.head.ears.type === EarType.FOX) && character.torso.hips.legs.type !== LegType.FOX && changes < changeLimit && randInt(5) === 0) {
            // 4 legs good, 2 legs better
            if (character.torso.hips.legs.isTaur()) DisplayText("\n\nYou shiver as the strength drains from your back legs.  Shaken, you sit on your haunches, forelegs braced wide to stop you from tipping over;  their hooves scrape the dirt as your lower body shrinks, dragging them backward until you can feel the upper surfaces of your hindlegs with their undersides.  A wave of nausea and vertigo overtakes you, and you close your eyes to shut out the sensations.  When they reopen, what greets them are not four legs, but only two... and those roughly in the shape of your old hindleg, except for the furry toes where your hooves used to be.  <b>You now have fox legs!</b>");
            // n*ga please
            else if (character.torso.hips.legs.isNaga()) DisplayText("\n\nYour scales split at the waistline and begin to peel, shedding like old snakeskin.  If that weren't curious enough, the flesh - not scales - underneath is pink and new, and the legs it covers crooked into the hocks and elongated feet of a field animal.  As the scaly coating falls and you step out of it, walking of necessity on your toes, a fine powder blows from the dry skin.  Within minutes, it crumbles completely and is taken by the ever-moving wind.  <b>Your legs are now those of a fox!</b>");
            // other digitigrade
            else if (character.torso.hips.legs.type === LegType.HOOFED || character.torso.hips.legs.type === LegType.DOG || character.torso.hips.legs.type === LegType.CAT || character.torso.hips.legs.type === LegType.BUNNY || character.torso.hips.legs.type === LegType.KANGAROO)
                DisplayText("\n\nYour legs twitch and quiver, forcing you to your seat.  As you watch, the ends shape themselves into furry, padded toes.  <b>You now have fox feet!</b>  Rather cute ones, actually.");
            // red drider bb gone
            else if (character.torso.hips.legs.type === LegType.DRIDER_LOWER_BODY) DisplayText("\n\nYour legs buckle under you and you fall, smashing your abdomen on the ground.  Though your control deserts and you cannot see behind you, still you feel the disgusting sensation of chitin loosening and sloughing off your body, and the dry breeze on your exposed nerves.  Reflexively, your legs cling together to protect as much of their now-sensitive surface as possible.  When you try to part them, you find you cannot.  Several minutes pass uncomforably until you can again bend your legs, and when you do, you find that all the legs of a side bend together - <b>in the shape of a fox's leg!</b>");
            // goo home and goo to bed
            else if (character.torso.hips.legs.isGoo()) DisplayText("\n\nIt takes a while before you notice that your gooey mounds have something more defined in them.  As you crane your body and shift them around to look, you can just make out a semi-solid mass in the shape of a crooked, animalistic leg.  You don't think much of it until, a few minutes later, you step right out of your swishing gooey undercarriage and onto the new foot.  The goo covering it quickly dries up, as does the part you left behind, <b>revealing a pair of dog-like fox legs!</b>");
            // reg legs, not digitigrade
            else {
                DisplayText("\n\nYour hamstrings tense painfully and begin to pull, sending you onto your face.  As you writhe on the ground, you can feel your thighs shortening and your feet stretching");
                if (character.torso.hips.legs.type === LegType.BEE) DisplayText(", while a hideous cracking fills the air");
                DisplayText(".  When the spasms subside and you can once again stand, <b>you find that your legs have been changed to those of a fox!</b>");
            }
            character.torso.hips.legs.type = LegType.FOX;
            changes++;
        }
        // Grow Fox Ears]
        // SECOND
        if ((this.enhanced || character.torso.tails.reduce(Tail.HasType(TailType.FOX), false)) && character.torso.neck.head.ears.type !== EarType.FOX && changes < changeLimit && randInt(4) === 0) {
            // from human/gob/liz ears
            if (character.torso.neck.head.ears.type === EarType.HUMAN || character.torso.neck.head.ears.type === EarType.ELFIN || character.torso.neck.head.ears.type === EarType.LIZARD) {
                DisplayText("\n\nThe sides of your face painfully stretch as your ears elongate and begin to push past your hairline, toward the top of your head.  They elongate, becoming large vulpine triangles covered in bushy fur.  <b>You now have fox ears.</b>");
            }
            // from dog/cat/roo ears
            else {
                DisplayText("\n\nYour ears change, shifting from their current shape to become vulpine in nature.  <b>You now have fox ears.</b>");
            }
            character.torso.neck.head.ears.type = EarType.FOX;
            changes++;
        }
        // [Grow Fox Tail](fairly common)
        // FIRST
        if (!character.torso.tails.reduce(Tail.HasType(TailType.FOX), false) && changes < changeLimit && randInt(4) === 0) {
            // from no tail
            if (character.torso.tails.count === 0) DisplayText("\n\nA pressure builds on your backside.  You feel under your [armor] and discover a strange nodule growing there that seems to be getting larger by the second.  With a sudden flourish of movement, it bursts out into a long and bushy tail that sways hypnotically, as if it had a mind of its own.  <b>You now have a fox's tail!</b>");
            // from another type of tail
            else DisplayText("\n\nPain lances through your lower back as your tail shifts violently.  With one final aberrant twitch, it fluffs out into a long, bushy fox tail that whips around in an almost hypnotic fashion.  <b>You now have a fox's tail!</b>");
            const newTail = new Tail();
            newTail.type = TailType.FOX;
            newTail.vemon = 1;
            character.torso.tails.add(newTail);
            changes++;
        }
        // [Grow Fox Face]
        // LAST - muzzlygoodness
        // should work from any face, including other muzzles
        if (character.skin.type === SkinType.FUR && character.torso.neck.head.face.type !== FaceType.FOX && changes < changeLimit && randInt(5) === 0) {
            DisplayText("\n\nYour face pinches and you clap your hands to it.  Within seconds, your nose is poking through those hands, pushing them slightly to the side as new flesh and bone build and shift behind it, until it stops in a clearly defined, tapered, and familiar point you can see even without the aid of a mirror.  <b>Looks like you now have a fox's face.</b>");
            if (User.settings.silly()) DisplayText("  And they called you crazy...");
            changes++;
            character.torso.neck.head.face.type = FaceType.FOX;
        }
        if (character.tone > 40 && changes < changeLimit && randInt(2) === 0) {
            DisplayText("\n\nMoving brings with it a little more jiggle than you're used to.  You don't seem to have gained weight, but your muscles seem less visible, and various parts of you are pleasantly softer.");
            character.tone -= 4;
        }
        // Nipples Turn Back:
        if (character.statusAffects.has(StatusAffectType.BlackNipples) && changes < changeLimit && randInt(3) === 0) {
            DisplayText("\n\nSomething invisible brushes against your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + ", making you twitch.  Undoing your clothes, you take a look at your chest and find that your nipples have turned back to their natural flesh colour.");
            changes++;
            character.statusAffects.remove(StatusAffectType.BlackNipples);
        }
        // Debugcunt
        if (changes < changeLimit && randInt(3) === 0 && character.torso.vaginas.count > 0 && character.torso.vaginas.get(0).type !== VaginaType.HUMAN) {
            DisplayText("\n\nSomething invisible brushes against your sex, making you twinge.  Undoing your clothes, you take a look at your vagina and find that it has turned back to its natural flesh colour.");
            character.torso.vaginas.get(0).type = VaginaType.HUMAN;
            changes++;
        }
        if (changes === 0) {
            DisplayText("\n\nWell that didn't do much, but you do feel a little refreshed!");
            character.stats.fatigue -= 5;
        }

    }
}
