import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { BreastRow } from '../../Body/BreastRow';
import { Cock, CockType } from '../../Body/Cock';
import { AntennaeType } from '../../Body/Head';
import { HornType } from '../../Body/Horns';
import { LegType } from '../../Body/Legs';
import { PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import { SkinType } from '../../Body/Skin';
import { Tail, TailType } from '../../Body/Tail';
import { WingType } from '../../Body/Wings';
import { Character } from '../../Character/Character';
import { Desc } from '../../Descriptors/Descriptors';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import { User } from '../../User';
import { ItemDesc } from '../ItemDesc';

export class BeeHoney extends Consumable {
    private static PURE_HONEY_VALUE: number = 40;
    private static SPECIAL_HONEY_VALUE: number = 20;

    public constructor(pure: boolean, special: boolean) {
        let honeyName: ConsumableName;
        let honeyLong: string;
        let honeyDesc: string;
        let honeyValue: number;
        if (special) {
            honeyName = ConsumableName.BeeHoneySpecial;
            honeyLong = "a bottle of special bee honey";
            honeyDesc = "A clear crystal bottle of a dark brown fluid that you got from the bee handmaiden.  It gives off a strong sweet smell even though the bottle is still corked.";
            honeyValue = BeeHoney.SPECIAL_HONEY_VALUE;
        }
        else {
            honeyName = (pure ? ConsumableName.BeeHoneyPure : ConsumableName.BeeHoney);
            honeyLong = (pure ? "a crystal vial filled with glittering honey" : "a small vial filled with giant-bee honey");
            honeyDesc = "This fine crystal vial is filled with a thick amber liquid that glitters " + (pure ? "" : "dully ") + "in the light.  You can smell a sweet scent, even though it is tightly corked.";
            honeyValue = (pure ? BeeHoney.PURE_HONEY_VALUE : BeeHoney.DefaultValue);
        }
        super(honeyName, new ItemDesc(honeyName, honeyLong, honeyDesc), honeyValue);
    }

    public canUse(character: Character) {
        if (this.value === BeeHoney.SPECIAL_HONEY_VALUE && character.statusAffects.get(StatusAffectType.Exgartuan).value1 === 1) { // Exgartuan doesn't like the special honey
            DisplayText("You uncork the bottle only to hear Exgartuan suddenly speak up.  <i>“Hey kid, this beautiful cock here doesn’t need any of that special bee shit.  Cork that bottle up right now or I’m going to make it so that you can’t drink anything but me.”</i>  You give an exasperated sigh and put the cork back in the bottle.");
            return false;
        }
        return true;
    }

    private isPregnantWithFaerie(character: Character): boolean {
        return (character.pregnancy.womb.isPregnant() && character.pregnancy.womb.pregnancy.type === PregnancyType.FAERIE) || (character.pregnancy.buttWomb.isPregnant() && character.pregnancy.buttWomb.pregnancy.type === PregnancyType.FAERIE);
    }

    public use(character: Character) {
        const pure: boolean = (this.value === BeeHoney.PURE_HONEY_VALUE);
        const special: boolean = (this.value === BeeHoney.SPECIAL_HONEY_VALUE);
        let changes: number = 0;
        let changeLimit: number = 1;
        const cocks = character.torso.cocks;
        const chest = character.torso.chest;

        DisplayText().clear();
        // character.slimeFeed();
        // Chances of boosting the change limit.
        if (randInt(2) === 0) changeLimit++;
        if (randInt(2) === 0) changeLimit++;
        if (randInt(2) === 0) changeLimit++;
        if (character.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        // Drink text
        if (special) {
            DisplayText("You uncork the bottle and pour the incredibly strong smelling concentrated honey down your throat.  Its taste is also mighty intense.  All at once you feel the effects of the substance start to course through your body.");
        }
        else { // Text for normal or pure
            DisplayText("Opening the crystal vial, you are greeted by a super-concentrated wave of sweet honey-scent.  It makes you feel lightheaded.  You giggle and lick the honey from your lips, having drank down the syrupy elixir without a thought.");
        }

        // if ((pure || special) && this.isPregnantWithFaerie(character)) { // Pure or special honey can reduce the corruption of a phouka baby
        //     if (Flags.list[FlagEnum.PREGNANCY_CORRUPTION] > 1) { // Child is phouka, hates pure honey
        //         DisplayText("\n\nYou feel queasy and want to throw up.  There's a pain in your belly and you realize the baby you're carrying didn't like that at all.  Then again, maybe pure honey is good for it.");
        //     }
        //     else if (Flags.list[FlagEnum.PREGNANCY_CORRUPTION] < 1) { // Child is faerie, loves pure honey
        //         DisplayText("\n\nA warm sensation starts in your belly and runs all through your body.  It's almost as if you're feeling music and you guess your passenger enjoyed the meal.");
        //     }
        //     else { // Child is on the line, will become a faerie with this drink
        //         DisplayText("\n\nAt first you feel your baby struggle against the honey, then it seems to grow content and enjoy it.");
        //     }
        //     Flags.list[FlagEnum.PREGNANCY_CORRUPTION]--;
        //     if (pure)
        //         return; // No transformative effects for the character because the pure honey was absorbed by the baby - Special honey will keep on giving
        // }
        // Corruption reduction
        if (changes < changeLimit && pure) { // Special honey will also reduce corruption, but uses different text and is handled separately
            DisplayText("\n\n");
            changes++;
            if (character.stats.cor > 80) DisplayText("Your head aches, as if thunder was echoing around your skull.  ");
            else if (character.stats.cor > 60) DisplayText("You feel a headache forming just behind your eyes.  In no time flat it reaches full strength.  ");
            else if (character.stats.cor > 40) DisplayText("A wave of stinging pain slices through your skull.  ");
            else if (character.stats.cor > 20) DisplayText("A prickling pain spreads throughout your skull.  ");
            else DisplayText("You feel a mildly unpleasant tingling inside your skull.  ");
            if (character.stats.cor > 0) DisplayText("It quickly passes, leaving you more clearheaded");
            character.stats.cor += -(1 + (character.stats.cor / 20));
            // Libido Reduction
            if (character.stats.cor > 0 && changes < changeLimit && randInt(3) === 0 && character.stats.lib > 40) {
                DisplayText(" and settling your overcharged sex-drive a bit.");
                character.stats.lib -= 3;
                character.stats.lust -= 20;
                changes++;
            }
            else if (character.stats.cor > 0) DisplayText(".");
        }
        // bee item corollary:
        if (changes < changeLimit && character.torso.neck.head.hair.type === 4 && randInt(2) === 0) {
            // -insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
            DisplayText("\n\nAs you down the sticky-sweet honey, your head begins to feel heavier.  Reaching up, you notice your tentacles becoming soft and somewhat fibrous.  Pulling one down reveals that it feels and smells like the honey you just ate; you watch as it dissolves into many thin stUtils.rand(s coated in the sugary syrup.  <b>Your hair is back to normal (well, once you wash the honey out)!</b>");
            character.torso.neck.head.hair.type = 0;
            changes++;
        }
        // (removes tentacle hair status, restarts hair growth if not prevented by reptile status)
        // Intelligence Boost
        if (changes < changeLimit && randInt(2) === 0 && character.stats.int < 80) {
            character.stats.int += 0.1 * (80 - character.stats.int);
            DisplayText("\n\nYou spend a few moments analyzing the taste and texture of the honey's residue, feeling awfully smart.");
            changes++;
        }
        // Sexual Stuff
        // No idears
        // Appearance Stuff
        // Hair Color
        if (changes < changeLimit && (character.torso.neck.head.hair.color !== "shiny black" && character.torso.neck.head.hair.color !== "black and yellow") && character.torso.neck.head.hair.length > 10 && randInt(2) === 0) {
            DisplayText("\n\nYou feel your scalp tingling, and you grab your hair in a panic, pulling a stUtils.rand( forward.  ");
            if (randInt(9) === 0) character.torso.neck.head.hair.color = "black and yellow";
            else character.torso.neck.head.hair.color = "shiny black";
            DisplayText("Your hair is now " + character.torso.neck.head.hair.color + ", just like a bee-girl's!");
            changes++;
        }
        // Hair Length
        if (changes < changeLimit && character.torso.neck.head.hair.length < 25 && randInt(3) === 0) {
            DisplayText("\n\nFeeling a bit off-balance, you discover your hair has lengthened, ");
            character.torso.neck.head.hair.length += randInt(4) + 1;
            DisplayText("becoming " + Desc.Head.describeHair(character) + ".");
            changes++;
        }
        // -Remove extra breast rows
        if (changes < changeLimit && chest.count > 2 && randInt(3) === 0 && !User.settings.hyperHappy) {
            changes++;
            const lastBreastRow = chest.get(chest.count - 1);
            DisplayText("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + Desc.Breast.describeBreastRow(lastBreastRow) + " shrink down, disappearing completely into your ");
            if (chest.count >= 3)
                DisplayText("abdomen");
            else
                DisplayText("chest");
            DisplayText(". The " + Desc.Breast.describeNipple(character, lastBreastRow) + "s even fade until nothing but ");
            if (character.skin.type === SkinType.FUR)
                DisplayText(character.torso.neck.head.hair.color + " " + character.skin.desc);
            else
                DisplayText(character.skin.tone + " " + character.skin.desc);
            DisplayText(" remains. <b>You've lost a row of breasts!</b>");
            character.stats.sens -= 5;
            character.torso.chest.remove(character.torso.chest.indexOf(lastBreastRow));
        }
        // Antennae
        if (changes < changeLimit && character.torso.neck.head.antennae === AntennaeType.NONE && character.torso.neck.head.horns.amount === 0 && randInt(3) === 0) {
            DisplayText("\n\nYour head itches momentarily as two floppy antennae sprout from your " + Desc.Head.describeHair(character) + ".");
            character.torso.neck.head.antennae = AntennaeType.BEE;
            changes++;
        }
        // Horns
        if (changes < changeLimit && character.torso.neck.head.horns.amount > 0 && randInt(3) === 0) {
            character.torso.neck.head.horns.amount = 0;
            character.torso.neck.head.horns.type = HornType.NONE;
            DisplayText("\n\nYour horns.amount crumble, falling apart in large chunks until they flake away to nothing.");
            changes++;
        }
        // Bee Legs
        if (changes < changeLimit && character.torso.hips.legs.type !== LegType.BEE && character.torso.hips.legs.type !== LegType.CENTAUR && randInt(4) === 0) {
            DisplayText("\n\nYour legs tremble with sudden unbearable pain, as if they're being ripped apart from the inside out and being stitched together again all at once.  You scream in agony as you hear bones snapping and cracking.  A moment later the pain fades and you are able to turn your gaze down to your beautiful new legs, covered in shining black chitin from the thigh down, and downy yellow fuzz along your upper thighs.");
            character.torso.hips.legs.type = LegType.BEE;
            changes++;
        }
        // -Nipples reduction to 1 per tit.
        if (chest.reduce(BreastRow.AverageNipplesPerBreast, 0) > 1 && changes < changeLimit && randInt(4) === 0) {
            DisplayText("\n\nA chill runs over your " + Desc.Breast.describeAllBreasts(character) + " and vanishes.  You stick a hand under your " + character.inventory.equipment.armor.displayName + " and discover that your extra nipples are missing!  You're down to just one per ");
            if (chest.sort(BreastRow.BreastRatingLargest)[0].rating < 1)
                DisplayText("'breast'.");
            else
                DisplayText("breast.");
            changes++;
            // Loop through and reset nipples
            for (const breastRow of chest) {
                breastRow.nipples.count = 1;
            }
        }
        // Gain oviposition!
        if (changes < changeLimit && !character.perks.has(PerkType.BeeOvipositor) && character.torso.tails.filter(Tail.FilterType(TailType.BEE_ABDOMEN)).length > 1 && randInt(2) === 0) {
            DisplayText("\n\nAn odd swelling starts in your insectile abdomen, somewhere along the underside.  Curling around, you reach back to your extended, bulbous bee part and run your fingers along the underside.  You gasp when you feel a tender, yielding slit near the stinger.  As you probe this new orifice, a shock of pleasure runs through you, and a tubular, black, semi-hard appendage drops out, pulsating as heavily as any sexual organ.  <b>The new organ is clearly an ovipositor!</b>  A few gentle prods confirm that it's just as sensitive; you can already feel your internals changing, adjusting to begin the production of unfertilized eggs.  You idly wonder what laying them with your new bee ovipositor will feel like...");
            DisplayText("\n\n(<b>Perk Gained:  Bee Ovipositor - Allows you to lay eggs in your foes!</b>)");
            character.perks.add(PerkType.BeeOvipositor, 0, 0, 0, 0);
            changes++;
        }
        // Bee butt - 66% lower chance if already has a tail
        if (changes < changeLimit && (character.torso.tails.count === 0 || randInt(1.5) === 0) && randInt(4) === 0) {
            if (character.torso.tails.count > 0) DisplayText("\n\nPainful swelling just above your " + Desc.Butt.describeButt(character) + " doubles you over, and you hear the sound of your tail dropping off onto the ground!  Before you can consider the implications, the pain gets worse, and you feel your backside bulge outward sickeningly, cracking and popping as a rounded bee-like abdomen grows in place of your old tail.  It grows large enough to be impossible to hide, and with a note of finality, your stinger slides free with an audible 'snick'.");
            else DisplayText("\n\nPainful swelling just above your " + Desc.Butt.describeButt(character) + " doubles you over.  It gets worse and worse as the swollen lump begins to protrude from your backside, swelling and rounding with a series of pops until you have a bulbous abdomen hanging just above your butt.  The whole thing is covered in a hard chitinous material, and large enough to be impossible to hide.  You sigh as your stinger slides into place with a 'snick', finishing the transformation.  <b>You have a bee's abdomen.</b>");
            character.torso.tails.clear();
            const newTail = new Tail();
            character.torso.tails.add(newTail);
            newTail.type = TailType.BEE_ABDOMEN;
            newTail.vemon = 10;
            newTail.recharge = 2;
            changes++;
        }
        // Venom Increase
        for (const beeButt of character.torso.tails.filter(Tail.FilterType(TailType.BEE_ABDOMEN))) {
            if (changes < changeLimit && beeButt.recharge < 15 && randInt(2)) {
                if (beeButt.recharge < 5) beeButt.recharge += 1;
                if (beeButt.recharge < 10) beeButt.recharge += 1;
                if (beeButt.recharge < 15) beeButt.recharge += 1;
                beeButt.vemon += 50;
                if (beeButt.vemon > 100) beeButt.vemon = 100;
                DisplayText("\n\nYour abdomen swells with vitality and a drop of venom escapes your stinger as it begins producing it in slightly larger quantities.");
                changes++;
            }
        }
        // Wings
        // Grow bigger bee wings!
        if (changes < changeLimit && character.torso.wings.type === WingType.BEE_LIKE_SMALL && randInt(4)) {
            changes++;
            character.torso.wings.type = WingType.BEE_LIKE_LARGE;
            character.torso.wings.desc = "large bee-like";
            DisplayText("\n\nYour wings tingle as they grow, filling out until they are large enough to lift you from the ground and allow you to fly!  <b>You now have large bee wings!</b>  You give a few experimental flaps and begin hovering in place, a giddy smile plastered on your face by the thrill of flight.");
        }

        // Grow new bee wings if character has none.
        if (changes < changeLimit && (character.torso.wings.type === WingType.NONE || character.torso.wings.type === WingType.SHARK_FIN) && randInt(4)) {
            changes++;
            if (character.torso.wings.type === WingType.SHARK_FIN) DisplayText("\n\nYou feel an itching on your large back-fin as something begins growing there.  You twist and contort yourself, trying to scratch and bring yourself relief, and failing miserably.  A sense of relief erupts from you as you feel something new grow out from your fin.  You hastily remove the top portion of your " + character.inventory.equipment.armor.displayName + " and marvel as a pair of small bee-like wings sprout from your back, replacing the fin that once grew there.  Tenderly flexing your new muscles, you find you can flap them quite fast.  Unfortunately you can't seem to flap your little wings fast enough to fly, but they would certainly slow a fall.  A few quick modifications to your " + character.inventory.equipment.armor.displayName + " later and you are ready to continue your journey with <b>your new bee wings</b>.");
            else DisplayText("\n\nYou feel an itching between your shoulder-blades as something begins growing there.  You twist and contort yourself, trying to scratch and bring yourself relief, and failing miserably.  A sense of relief erupts from you as you feel something new grow out from your body.  You hastily remove the top portion of your " + character.inventory.equipment.armor.displayName + " and marvel as a pair of small bee-like wings sprout from your back.  Tenderly flexing your new muscles, you find you can flap them quite fast.  Unfortunately you can't seem to flap your little wings fast enough to fly, but they would certainly slow a fall.  A few quick modifications to your " + character.inventory.equipment.armor.displayName + " later and you are ready to continue your journey with <b>your new bee wings</b>.");
            character.torso.wings.type = WingType.BEE_LIKE_SMALL;
            character.torso.wings.desc = "small bee-like";
        }
        // Melt demon wings!
        if (changes < changeLimit && (character.torso.wings.type === WingType.BAT_LIKE_TINY || character.torso.wings.type === WingType.BAT_LIKE_LARGE)) {
            changes++;
            DisplayText("\n\nYour demonic wings ripple, jelly-like.  Worried, you crane back to look, and to your horror, they're melting away!  Runnels of amber honey trail down the wings' edges, building into a steady flow.  <b>In a moment, the only remnant of your wings is a puddle of honey in the dirt</b>.  Even that is gone in seconds, wicked into the dry soil.");
            character.torso.wings.type = WingType.NONE;
            character.torso.wings.desc = "";
        }
        if (randInt(4) === 0 && character.torso.neck.gills && changes < changeLimit) {
            DisplayText("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            character.torso.neck.gills = false;
            changes++;
        }
        if (special) { // All the speical honey effects occur after any normal bee transformations (if the character wasn't a full bee morph)
            let selectedCock: Cock;
            if (cocks.count > 0) {
                DisplayText("\n\nYou double over in pain as the effects start to concentrate into your groin.  You need to get release, but what you’ve got just isn’t cutting it.  You fall to the ground and grab at your crotch, trying desperately to get the release you need.  Finally, it happens.  With a sudden burst of intense relief and sexual satisfaction, a new human looking penis bursts from your skin and sprays your seed all over the ground in front of you.  When you’re able to recover and take a look at your new possession.  <b>You now have an eight inch long human cock that is very sensitive to stimulation.</b>");
                selectedCock = new Cock();
                selectedCock.length = randInt(3) + 8;
                selectedCock.thickness = 2;
                cocks.add(selectedCock);
                character.stats.sens += 10;
            }
            else if (character.torso.cocks.count > 1) {
                const largestCock = cocks.sort(Cock.LargestCockArea)[0];
                selectedCock = cocks.get(0);
                DisplayText("\n\nThe effects of the honey move towards your groin, and into your " + Desc.Cock.describeMultiCockShort(character) + ", causing them to stand at attention.  They quiver for a moment, and feel rather itchy.  Suddenly you are overwhelmed with pleasure as <b>your " + Desc.Cock.describeCock(character, largestCock) + " is absorbed into your " + Desc.Cock.describeCock(character, selectedCock) + "!</b>  You grab onto the merging cock and pump it with your hands as it increases in size and you cum in pleasure.  Your " + Desc.Cock.describeCock(character, selectedCock) + " seems a lot more sensative now...");
                selectedCock.length += 5 * Math.sqrt(0.2 * largestCock.area);
                selectedCock.thickness += Math.sqrt(0.2 * largestCock.area);
                cocks.remove(cocks.indexOf(largestCock));
                character.stats.sens += 5;
            }
            else if (character.torso.cocks.get(0).area < 100) {
                selectedCock = cocks.get(0);
                DisplayText("\n\nYour " + Desc.Cock.describeCock(character, selectedCock) + " suddenly becomes rock hard and incredibly sensitive to the touch.  You pull away your " + character.inventory.equipment.armor.displayName + ", and start to masturbate furiously as it rapidly swells in size.  When the change finally finishes, you realize that your " + Desc.Cock.describeCock(character, selectedCock) + " has both grown much longer and wider!  <b>");
                if (selectedCock.area <= 20)
                    DisplayText("It now swings as low as your knees!");
                else if (selectedCock.area <= 50)
                    DisplayText("While erect, your massive member fills the lower half of your vision.");
                else
                    DisplayText("Your member is now simply huge, you wonder what in the world could actually take your massive size now?");
                DisplayText("</b>");
                selectedCock.length += randInt(3) + 4; // 4 to 6 inches in length
                selectedCock.thickness += 0.1 * randInt(5) + 0.5; // 0.5 to 1 inches in thickness
                character.stats.sens += 5;
            }
            else if (cocks.get(0).type !== CockType.BEE && Desc.Body.describeRace(character) === "bee-morph") {
                selectedCock = cocks.get(0);
                DisplayText("\n\nYour huge member suddenly starts to hurt, especially the tip of the thing.  At the same time, you feel your length start to get incredibly sensitive and the base of your shaft starts to itch.  You tear off your " + character.inventory.equipment.armor.displayName + " and watch in fascination as your " + Desc.Cock.describeCock(character, selectedCock) + " starts to change.  The shaft turns black, while becoming hard and smooth to the touch, while the base develops a mane of four inch long yellow bee hair.  As the transformation continues, your member grows even larger than before.  However, it is the tip that keeps your attention the most, as a much finer layer of short yellow hairs grow around it.  Its appearance isn’t the thing that you care about right now, it is the pain that is filling it.\n\n");
                DisplayText("It is entirely different from the usual feeling you get when you’re cock grows larger from imbibing transformative substances.  When the changes stop, the tip is shaped like a typical human mushroom cap covered in fine bee hair, but it feels nothing like what you’d expect a human dick to feel like.  Your whole length is incredibly sensitive, and touching it gives you incredible stimulation, but you’re sure that no matter how much you rub it, you aren’t going to cum by yourself.  You want cool honey covering it, you want tight walls surrounding it, you want to fertilize hundreds of eggs with it.  These desires are almost overwhelming, and it takes a lot of will not to just run off in search of the bee girl that gave you that special honey right now.  This isn’t good.\n\n");
                DisplayText("<b>You now have a bee cock!</b>");
                selectedCock.type = CockType.BEE;
                selectedCock.length += 5;
                selectedCock.thickness += 1;
                character.stats.sens += 15;
            }
            else {
                selectedCock = cocks.get(0);
                DisplayText("\n\nThe effects of the honey don’t seem to focus on your groin this time, but you still feel your " + Desc.Cock.describeCock(character, selectedCock) + " grow slightly under your " + character.inventory.equipment.armor.displayName + ".");
                selectedCock.length += 0.1 * randInt(10) + 1;
                selectedCock.thickness += 0.1 * randInt(2) + 0.1;
                character.stats.sens += 3;
            }
            if (character.stats.cor >= 5) {
                DisplayText("\n\nYour mind feels surprisingly clear of the twisted thoughts that have plagued it as of late, but you find yourself feeling more and more aroused than usual.");
                const corLoss: number = Math.min(0.1 * character.stats.cor + 5, character.stats.cor);
                character.stats.cor -= corLoss;
                character.stats.lib += corLoss;
            }
            else {
                DisplayText("\n\nYou find your mind is drifting to the thought of using your member to fertilize hundreds and hundreds of eggs every day.  You shake your head, the bizarre fantasy catching you completely off guard.");
                character.stats.clearCor();
                character.stats.lib += 5;
            }
            if (character.femininity >= 60 || character.femininity <= 40) {
                DisplayText("\n\nYour face shifts in shape, becoming more androgynous.");
                if (character.femininity >= 60)
                    character.femininity -= 3;
                else character.femininity += 3;
            }
            character.stats.lust += 0.2 * character.stats.lib + 5;
        }
    }
}
