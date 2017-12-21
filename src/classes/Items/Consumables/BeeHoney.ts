import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import Cock, { CockType } from '../../Body/Cock';
import { SkinType } from '../../Body/Creature';
import { AntennaeType, HornType } from '../../Body/Head';
import { LowerBodyType, TailType } from '../../Body/LowerBody';
import { PregnancyType } from '../../Body/Pregnancy/Pregnancy';
import { WingType } from '../../Body/UpperBody';
import BodyDescriptor from '../../Descriptors/BodyDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import DisplayText from '../../display/DisplayText';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../../Game/Flags';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export default class BeeHoney extends Consumable {
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

    public canUse(player: Player) {
        if (this.value == BeeHoney.SPECIAL_HONEY_VALUE && player.statusAffects.get(StatusAffectType.Exgartuan).value1 == 1) { //Exgartuan doesn't like the special honey
            DisplayText.text("You uncork the bottle only to hear Exgartuan suddenly speak up.  <i>“Hey kid, this beautiful cock here doesn’t need any of that special bee shit.  Cork that bottle up right now or I’m going to make it so that you can’t drink anything but me.”</i>  You give an exasperated sigh and put the cork back in the bottle.");
            return false;
        }
        return true;
    }

    private isPregnantWithFaerie(player: Player): boolean {
        return player.pregnancy.isPregnantWith(PregnancyType.FAERIE) || player.pregnancy.isButtPregnantWith(PregnancyType.FAERIE);
    }

    public use(player: Player): boolean {
        let pure: boolean = (this.value == BeeHoney.PURE_HONEY_VALUE);
        let special: boolean = (this.value == BeeHoney.SPECIAL_HONEY_VALUE);
        let changes: number = 0;
        let changeLimit: number = 1;
        let cockSpot = player.lowerBody.cockSpot;
        let chest = player.upperBody.chest;

        DisplayText.clear();
        player.slimeFeed();
        //Chances of boosting the change limit.
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (Utils.rand(2) == 0) changeLimit++;
        if (player.perks.has(PerkType.HistoryAlchemist)) changeLimit++;
        //Drink text
        if (special) {
            DisplayText.text("You uncork the bottle and pour the incredibly strong smelling concentrated honey down your throat.  Its taste is also mighty intense.  All at once you feel the effects of the substance start to course through your body.");
        }
        else { //Text for normal or pure
            DisplayText.text("Opening the crystal vial, you are greeted by a super-concentrated wave of sweet honey-scent.  It makes you feel lightheaded.  You giggle and lick the honey from your lips, having drank down the syrupy elixir without a thought.");
        }

        if ((pure || special) && this.isPregnantWithFaerie(player)) { //Pure or special honey can reduce the corruption of a phouka baby
            if (Flags.list[FlagEnum.PREGNANCY_CORRUPTION] > 1) { //Child is phouka, hates pure honey
                DisplayText.text("\n\nYou feel queasy and want to throw up.  There's a pain in your belly and you realize the baby you're carrying didn't like that at all.  Then again, maybe pure honey is good for it.");
            }
            else if (Flags.list[FlagEnum.PREGNANCY_CORRUPTION] < 1) { //Child is faerie, loves pure honey
                DisplayText.text("\n\nA warm sensation starts in your belly and runs all through your body.  It's almost as if you're feeling music and you guess your passenger enjoyed the meal.");
            }
            else { //Child is on the line, will become a faerie with this drink
                DisplayText.text("\n\nAt first you feel your baby struggle against the honey, then it seems to grow content and enjoy it.");
            }
            Flags.list[FlagEnum.PREGNANCY_CORRUPTION]--;
            if (pure)
                return; //No transformative effects for the player because the pure honey was absorbed by the baby - Special honey will keep on giving
        }
        //Corruption reduction
        if (changes < changeLimit && pure) { //Special honey will also reduce corruption, but uses different text and is handled separately
            DisplayText.text("\n\n");
            changes++;
            if (player.stats.cor > 80) DisplayText.text("Your head aches, as if thunder was echoing around your skull.  ");
            else if (player.stats.cor > 60) DisplayText.text("You feel a headache forming just behind your eyes.  In no time flat it reaches full strength.  ");
            else if (player.stats.cor > 40) DisplayText.text("A wave of stinging pain slices through your skull.  ");
            else if (player.stats.cor > 20) DisplayText.text("A prickling pain spreads throughout your skull.  ");
            else DisplayText.text("You feel a mildly unpleasant tingling inside your skull.  ");
            if (player.stats.cor > 0) DisplayText.text("It quickly passes, leaving you more clearheaded");
            player.stats.cor += -(1 + (player.stats.cor / 20))
            //Libido Reduction
            if (player.stats.cor > 0 && changes < changeLimit && Utils.chance(66) && player.stats.lib > 40) {
                DisplayText.text(" and settling your overcharged sex-drive a bit.");
                player.stats.lib -= 3;
                player.stats.lust -= 20;
                changes++;
            }
            else if (player.stats.cor > 0) DisplayText.text(".");
        }
        //bee item corollary:
        if (changes < changeLimit && player.upperBody.head.hairType == 4 && Utils.rand(2) == 0) {
            //-insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
            DisplayText.text("\n\nAs you down the sticky-sweet honey, your head begins to feel heavier.  Reaching up, you notice your tentacles becoming soft and somewhat fibrous.  Pulling one down reveals that it feels and smells like the honey you just ate; you watch as it dissolves into many thin stUtils.rands coated in the sugary syrup.  <b>Your hair is back to normal (well, once you wash the honey out)!</b>");
            player.upperBody.head.hairType = 0;
            changes++;
        }
        //(removes tentacle hair status, restarts hair growth if not prevented by reptile status)
        //Intelligence Boost
        if (changes < changeLimit && Utils.rand(2) == 0 && player.stats.int < 80) {
            player.stats.int += 0.1 * (80 - player.stats.int);
            DisplayText.text("\n\nYou spend a few moments analyzing the taste and texture of the honey's residue, feeling awfully smart.");
            changes++;
        }
        //Sexual Stuff
        //No idears
        //Appearance Stuff
        //Hair Color
        if (changes < changeLimit && (player.upperBody.head.hairColor != "shiny black" && player.upperBody.head.hairColor != "black and yellow") && player.upperBody.head.hairLength > 10 && Utils.chance(50)) {
            DisplayText.text("\n\nYou feel your scalp tingling, and you grab your hair in a panic, pulling a stUtils.rand forward.  ");
            if (Utils.rand(9) == 0) player.upperBody.head.hairColor = "black and yellow";
            else player.upperBody.head.hairColor = "shiny black";
            DisplayText.text("Your hair is now " + player.upperBody.head.hairColor + ", just like a bee-girl's!");
            changes++;
        }
        //Hair Length
        if (changes < changeLimit && player.upperBody.head.hairLength < 25 && Utils.rand(3) == 0) {
            DisplayText.text("\n\nFeeling a bit off-balance, you discover your hair has lengthened, ");
            player.upperBody.head.hairLength += Utils.rand(4) + 1;
            DisplayText.text("becoming " + HeadDescriptor.describeHair(player) + ".");
            changes++;
        }
        //-Remove extra breast rows
        if (changes < changeLimit && chest.count() > 2 && Utils.rand(3) == 0 && !Flags.list[FlagEnum.HYPER_HAPPY]) {
            changes++;
            let lastBreastRow = chest.get(chest.count() - 1);
            DisplayText.text("\n\nYou stumble back when your center of balance shifts, and though you adjust before you can fall over, you're left to watch in awe as your bottom-most " + BreastDescriptor.describeBreastRow(lastBreastRow) + " shrink down, disappearing completely into your ");
            if (chest.count() >= 3)
                DisplayText.text("abdomen");
            else
                DisplayText.text("chest");
            DisplayText.text(". The " + BreastDescriptor.describeNipple(player, lastBreastRow) + "s even fade until nothing but ");
            if (player.skinType == SkinType.FUR)
                DisplayText.text(player.upperBody.head.hairColor + " " + player.skinDesc);
            else
                DisplayText.text(player.skinTone + " " + player.skinDesc);
            DisplayText.text(" remains. <b>You've lost a row of breasts!</b>");
            player.stats.sens -= 5
            player.upperBody.chest.remove(lastBreastRow);
        }
        //Antennae
        if (changes < changeLimit && player.upperBody.head.antennae == AntennaeType.NONE && player.upperBody.head.horns == 0 && Utils.rand(3) == 0) {
            DisplayText.text("\n\nYour head itches momentarily as two floppy antennae sprout from your " + HeadDescriptor.describeHair(player) + ".");
            player.upperBody.head.antennae = AntennaeType.BEE;
            changes++;
        }
        //Horns
        if (changes < changeLimit && player.upperBody.head.horns > 0 && Utils.rand(3) == 0) {
            player.upperBody.head.horns = 0;
            player.upperBody.head.hornType = HornType.NONE;
            DisplayText.text("\n\nYour horns crumble, falling apart in large chunks until they flake away to nothing.");
            changes++;
        }
        //Bee Legs
        if (changes < changeLimit && player.lowerBody.type != LowerBodyType.BEE && player.lowerBody.type != LowerBodyType.CENTAUR && Utils.rand(4) == 0) {
            DisplayText.text("\n\nYour legs tremble with sudden unbearable pain, as if they're being ripped apart from the inside out and being stitched together again all at once.  You scream in agony as you hear bones snapping and cracking.  A moment later the pain fades and you are able to turn your gaze down to your beautiful new legs, covered in shining black chitin from the thigh down, and downy yellow fuzz along your upper thighs.");
            player.lowerBody.type = LowerBodyType.BEE;
            changes++;
        }
        //-Nipples reduction to 1 per tit.
        if (chest.averageNipplesPerBreast() > 1 && changes < changeLimit && Utils.rand(4) == 0) {
            DisplayText.text("\n\nA chill runs over your " + BreastDescriptor.describeAllBreasts(player) + " and vanishes.  You stick a hand under your " + player.inventory.armorSlot.equipment.displayName + " and discover that your extra nipples are missing!  You're down to just one per ");
            if (chest.BreastRatingLargest[0].breastRating < 1)
                DisplayText.text("'breast'.");
            else
                DisplayText.text("breast.");
            changes++;
            //Loop through and reset nipples
            for (let index: number = 0; index < chest.count(); index++) {
                chest.get(index).nipplesPerBreast = 1;
            }
        }
        //Gain oviposition!
        if (changes < changeLimit && !player.perks.has(PerkType.BeeOvipositor) && player.lowerBody.tailType == TailType.BEE_ABDOMEN && Utils.rand(2) == 0) {
            DisplayText.text("\n\nAn odd swelling starts in your insectile abdomen, somewhere along the underside.  Curling around, you reach back to your extended, bulbous bee part and run your fingers along the underside.  You gasp when you feel a tender, yielding slit near the stinger.  As you probe this new orifice, a shock of pleasure runs through you, and a tubular, black, semi-hard appendage drops out, pulsating as heavily as any sexual organ.  <b>The new organ is clearly an ovipositor!</b>  A few gentle prods confirm that it's just as sensitive; you can already feel your internals changing, adjusting to begin the production of unfertilized eggs.  You idly wonder what laying them with your new bee ovipositor will feel like...");
            DisplayText.text("\n\n(<b>Perk Gained:  Bee Ovipositor - Allows you to lay eggs in your foes!</b>)");
            player.perks.add(PerkFactory.create(PerkType.BeeOvipositor, 0, 0, 0, 0));
            changes++;
        }
        //Bee butt - 66% lower chance if already has a tail
        if (changes < changeLimit && player.lowerBody.tailType != TailType.BEE_ABDOMEN && (player.lowerBody.tailType == TailType.NONE || Utils.rand(1.5) == 0) && Utils.rand(4) == 0) {
            if (player.lowerBody.tailType > TailType.NONE) DisplayText.text("\n\nPainful swelling just above your " + ButtDescriptor.describeButt(player) + " doubles you over, and you hear the sound of your tail dropping off onto the ground!  Before you can consider the implications, the pain gets worse, and you feel your backside bulge outward sickeningly, cracking and popping as a rounded bee-like abdomen grows in place of your old tail.  It grows large enough to be impossible to hide, and with a note of finality, your stinger slides free with an audible 'snick'.");
            else DisplayText.text("\n\nPainful swelling just above your " + ButtDescriptor.describeButt(player) + " doubles you over.  It gets worse and worse as the swollen lump begins to protrude from your backside, swelling and rounding with a series of pops until you have a bulbous abdomen hanging just above your butt.  The whole thing is covered in a hard chitinous material, and large enough to be impossible to hide.  You sigh as your stinger slides into place with a 'snick', finishing the transformation.  <b>You have a bee's abdomen.</b>");
            player.lowerBody.tailType = TailType.BEE_ABDOMEN;
            player.lowerBody.tailVenom = 10;
            player.lowerBody.tailRecharge = 2;
            changes++;
        }
        //Venom Increase
        if (changes < changeLimit && player.lowerBody.tailType == TailType.BEE_ABDOMEN && player.lowerBody.tailRecharge < 15 && Utils.rand(2)) {
            if (player.lowerBody.tailRecharge < 5) player.lowerBody.tailRecharge += 1;
            if (player.lowerBody.tailRecharge < 10) player.lowerBody.tailRecharge += 1;
            if (player.lowerBody.tailRecharge < 15) player.lowerBody.tailRecharge += 1;
            player.lowerBody.tailVenom += 50;
            if (player.lowerBody.tailVenom > 100) player.lowerBody.tailVenom = 100;
            DisplayText.text("\n\nYour abdomen swells with vitality and a drop of venom escapes your stinger as it begins producing it in slightly larger quantities.");
            changes++;
        }
        //Wings
        //Grow bigger bee wings!
        if (changes < changeLimit && player.upperBody.wingType == WingType.BEE_LIKE_SMALL && Utils.rand(4)) {
            changes++;
            player.upperBody.wingType = WingType.BEE_LIKE_LARGE;
            player.upperBody.wingDesc = "large bee-like";
            DisplayText.text("\n\nYour wings tingle as they grow, filling out until they are large enough to lift you from the ground and allow you to fly!  <b>You now have large bee wings!</b>  You give a few experimental flaps and begin hovering in place, a giddy smile plastered on your face by the thrill of flight.");
        }

        //Grow new bee wings if player has none.
        if (changes < changeLimit && (player.upperBody.wingType == WingType.NONE || player.upperBody.wingType == WingType.SHARK_FIN) && Utils.rand(4)) {
            changes++;
            if (player.upperBody.wingType == WingType.SHARK_FIN) DisplayText.text("\n\nYou feel an itching on your large back-fin as something begins growing there.  You twist and contort yourself, trying to scratch and bring yourself relief, and failing miserably.  A sense of relief erupts from you as you feel something new grow out from your fin.  You hastily remove the top portion of your " + player.inventory.armorSlot.equipment.displayName + " and marvel as a pair of small bee-like wings sprout from your back, replacing the fin that once grew there.  Tenderly flexing your new muscles, you find you can flap them quite fast.  Unfortunately you can't seem to flap your little wings fast enough to fly, but they would certainly slow a fall.  A few quick modifications to your " + player.inventory.armorSlot.equipment.displayName + " later and you are ready to continue your journey with <b>your new bee wings</b>.");
            else DisplayText.text("\n\nYou feel an itching between your shoulder-blades as something begins growing there.  You twist and contort yourself, trying to scratch and bring yourself relief, and failing miserably.  A sense of relief erupts from you as you feel something new grow out from your body.  You hastily remove the top portion of your " + player.inventory.armorSlot.equipment.displayName + " and marvel as a pair of small bee-like wings sprout from your back.  Tenderly flexing your new muscles, you find you can flap them quite fast.  Unfortunately you can't seem to flap your little wings fast enough to fly, but they would certainly slow a fall.  A few quick modifications to your " + player.inventory.armorSlot.equipment.displayName + " later and you are ready to continue your journey with <b>your new bee wings</b>.");
            player.upperBody.wingType = WingType.BEE_LIKE_SMALL;
            player.upperBody.wingDesc = "small bee-like";
        }
        //Melt demon wings!
        if (changes < changeLimit && (player.upperBody.wingType == WingType.BAT_LIKE_TINY || player.upperBody.wingType == WingType.BAT_LIKE_LARGE)) {
            changes++;
            DisplayText.text("\n\nYour demonic wings ripple, jelly-like.  Worried, you crane back to look, and to your horror, they're melting away!  Runnels of amber honey trail down the wings' edges, building into a steady flow.  <b>In a moment, the only remnant of your wings is a puddle of honey in the dirt</b>.  Even that is gone in seconds, wicked into the dry soil.");
            player.upperBody.wingType = WingType.NONE;
            player.upperBody.wingDesc = "";
        }
        if (Utils.rand(4) == 0 && player.upperBody.gills && changes < changeLimit) {
            DisplayText.text("\n\nYour chest itches, and as you reach up to scratch it, you realize your gills have withdrawn into your skin.");
            player.upperBody.gills = false;
            changes++;
        }
        if (special) { //All the speical honey effects occur after any normal bee transformations (if the player wasn't a full bee morph)
            let selectedCock: Cock;
            if (!cockSpot.hasCock()) {
                DisplayText.text("\n\nYou double over in pain as the effects start to concentrate into your groin.  You need to get release, but what you’ve got just isn’t cutting it.  You fall to the ground and grab at your crotch, trying desperately to get the release you need.  Finally, it happens.  With a sudden burst of intense relief and sexual satisfaction, a new human looking penis bursts from your skin and sprays your seed all over the ground in front of you.  When you’re able to recover and take a look at your new possession.  <b>You now have an eight inch long human cock that is very sensitive to stimulation.</b>");
                selectedCock = new Cock();
                selectedCock.cockLength = Utils.rand(3) + 8;
                selectedCock.cockThickness = 2;
                cockSpot.add(selectedCock);
                player.stats.sens += 10;
            }
            else if (player.lowerBody.cockSpot.count() > 1) {
                let largestCock = cockSpot.listLargestCockArea[0];
                selectedCock = cockSpot.get(0);
                DisplayText.text("\n\nThe effects of the honey move towards your groin, and into your " + CockDescriptor.describeMultiCockShort(player) + ", causing them to stand at attention.  They quiver for a moment, and feel rather itchy.  Suddenly you are overwhelmed with pleasure as <b>your " + CockDescriptor.describeCock(player, largestCock) + " is absorbed into your " + CockDescriptor.describeCock(player, selectedCock) + "!</b>  You grab onto the merging cock and pump it with your hands as it increases in size and you cum in pleasure.  Your " + CockDescriptor.describeCock(player, selectedCock) + " seems a lot more sensative now...");
                selectedCock.cockLength += 5 * Math.sqrt(0.2 * largestCock.cockArea());
                selectedCock.cockThickness += Math.sqrt(0.2 * largestCock.cockArea());
                cockSpot.remove(player, largestCock);
                player.stats.sens += 5;
            }
            else if (player.lowerBody.cockSpot.get(0).cockArea() < 100) {
                selectedCock = cockSpot.get(0);
                DisplayText.text("\n\nYour " + CockDescriptor.describeCock(player, selectedCock) + " suddenly becomes rock hard and incredibly sensitive to the touch.  You pull away your " + player.inventory.armorSlot.equipment.displayName + ", and start to masturbate furiously as it rapidly swells in size.  When the change finally finishes, you realize that your " + CockDescriptor.describeCock(player, selectedCock) + " has both grown much longer and wider!  <b>");
                if (selectedCock.cockArea() <= 20)
                    DisplayText.text("It now swings as low as your knees!");
                else if (selectedCock.cockArea() <= 50)
                    DisplayText.text("While erect, your massive member fills the lower half of your vision.");
                else
                    DisplayText.text("Your member is now simply huge, you wonder what in the world could actually take your massive size now?");
                DisplayText.text("</b>");
                selectedCock.cockLength += Utils.rand(3) + 4; //4 to 6 inches in length
                selectedCock.cockThickness += 0.1 * Utils.rand(5) + 0.5; //0.5 to 1 inches in thickness
                player.stats.sens += 5;
            }
            else if (cockSpot.get(0).cockType != CockType.BEE && BodyDescriptor.describeRace(player) == "bee-morph") {
                selectedCock = cockSpot.get(0);
                DisplayText.text("\n\nYour huge member suddenly starts to hurt, especially the tip of the thing.  At the same time, you feel your length start to get incredibly sensitive and the base of your shaft starts to itch.  You tear off your " + player.inventory.armorSlot.equipment.displayName + " and watch in fascination as your " + CockDescriptor.describeCock(player, selectedCock) + " starts to change.  The shaft turns black, while becoming hard and smooth to the touch, while the base develops a mane of four inch long yellow bee hair.  As the transformation continues, your member grows even larger than before.  However, it is the tip that keeps your attention the most, as a much finer layer of short yellow hairs grow around it.  Its appearance isn’t the thing that you care about right now, it is the pain that is filling it.\n\n");
                DisplayText.text("It is entirely different from the usual feeling you get when you’re cock grows larger from imbibing transformative substances.  When the changes stop, the tip is shaped like a typical human mushroom cap covered in fine bee hair, but it feels nothing like what you’d expect a human dick to feel like.  Your whole length is incredibly sensitive, and touching it gives you incredible stimulation, but you’re sure that no matter how much you rub it, you aren’t going to cum by yourself.  You want cool honey covering it, you want tight walls surrounding it, you want to fertilize hundreds of eggs with it.  These desires are almost overwhelming, and it takes a lot of will not to just run off in search of the bee girl that gave you that special honey right now.  This isn’t good.\n\n");
                DisplayText.text("<b>You now have a bee cock!</b>");
                selectedCock.cockType = CockType.BEE;
                selectedCock.cockLength += 5;
                selectedCock.cockThickness += 1;
                player.stats.sens += 15;
            }
            else {
                selectedCock = cockSpot.get(0);
                DisplayText.text("\n\nThe effects of the honey don’t seem to focus on your groin this time, but you still feel your " + CockDescriptor.describeCock(player, selectedCock) + " grow slightly under your " + player.inventory.armorSlot.equipment.displayName + ".");
                selectedCock.cockLength += 0.1 * Utils.rand(10) + 1;
                selectedCock.cockThickness += 0.1 * Utils.rand(2) + 0.1;
                player.stats.sens += 3;
            }
            if (player.stats.cor >= 5) {
                DisplayText.text("\n\nYour mind feels surprisingly clear of the twisted thoughts that have plagued it as of late, but you find yourself feeling more and more aroused than usual.");
                let corLoss: number = Math.min(0.1 * player.stats.cor + 5, player.stats.cor);
                player.stats.cor -= corLoss;
                player.stats.lib += corLoss;
            }
            else {
                DisplayText.text("\n\nYou find your mind is drifting to the thought of using your member to fertilize hundreds and hundreds of eggs every day.  You shake your head, the bizarre fantasy catching you completely off guard.");
                player.stats.clearCor();
                player.stats.lib += 5;
            }
            if (player.femininity >= 60 || player.femininity <= 40) {
                DisplayText.text("\n\nYour face shifts in shape, becoming more androgynous.");
                if (player.femininity >= 60)
                    player.femininity -= 3;
                else player.femininity += 3;
            }
            player.stats.lust += 0.2 * player.stats.lib + 5;
        }
    }

}
