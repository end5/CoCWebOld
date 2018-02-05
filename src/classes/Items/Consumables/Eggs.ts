import Consumable from './Consumable';
import ConsumableName from './ConsumableName';
import BreastRow from '../../Body/BreastRow';
import { SkinType } from '../../Body/Skin';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import HipDescriptor from '../../Descriptors/HipDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import Flags, { FlagEnum } from '../../Game/Flags';
import BodyModifier from '../../Modifiers/BodyModifier';
import BreastModifier from '../../Modifiers/BreastModifier';
import CockModifier from '../../Modifiers/CockModifier';
import Player from '../../Player/Player';
import { Utils } from '../../Utilities/Utils';
import ItemDesc from '../ItemDesc';

export enum EggType {
    Black,
    Blue,
    Brown,
    Pink,
    Purple,
    White
}

export default class Eggs extends Consumable {
    private large: boolean;
    private eggType: EggType;

    public constructor(eggType: EggType, large: boolean) {
        if (large) {
            switch (eggType) {
                case EggType.Black:
                    super(ConsumableName.LargeEggBlack, new ItemDesc("L.BlkEg", "a large rubbery black egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.  For all you know, it could turn you into rubber!"));
                    break;
                case EggType.Blue:
                    super(ConsumableName.LargeEggBlue, new ItemDesc("L.BluEg", "a large blue and white mottled egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food."));
                    break;
                case EggType.Brown:
                    super(ConsumableName.LargeEggBrown, new ItemDesc("L.BrnEg", "a large brown and white mottled egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food."));
                    break;
                case EggType.Pink:
                    super(ConsumableName.LargeEggPink, new ItemDesc("L.PnkEg", "a large pink and white mottled egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food."));
                    break;
                case EggType.Purple:
                    super(ConsumableName.LargeEggPurple, new ItemDesc("L.PrpEg", "a large purple and white mottled egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food."));
                    break;
                default:
                case EggType.White:
                    super(ConsumableName.LargeEggWhite, new ItemDesc("L.WhtEg", "a large white egg", "This is an oblong egg, not much different from an ostrich egg in appearance.  Something tells you it's more than just food."));
                    break;
            }
        }
        else {
            switch (eggType) {
                case EggType.Black:
                    super(ConsumableName.EggBlack, new ItemDesc("BlackEg", "a rubbery black egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
                case EggType.Blue:
                    super(ConsumableName.EggBlue, new ItemDesc("BlueEgg", "a blue and white mottled egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
                case EggType.Brown:
                    super(ConsumableName.EggBrown, new ItemDesc("BrownEg", "a brown and white mottled egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
                case EggType.Pink:
                    super(ConsumableName.EggPink, new ItemDesc("PinkEgg", "a pink and white mottled egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
                case EggType.Purple:
                    super(ConsumableName.EggPurple, new ItemDesc("PurplEg", "a purple and white mottled egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
                default:
                case EggType.White:
                    super(ConsumableName.EggWhite, new ItemDesc("WhiteEg", "a milky-white egg", "This is an oblong egg, not much different from a chicken egg in appearance.  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
            }
        }
        this.eggType = eggType;
        this.large = large;
    }

    public use(player: Player) {
        switch (this.eggType) {
            case EggType.Black:
                this.blackRubberEgg(player);
                break;
            case EggType.Blue:
                this.blueEgg(player);
                break;
            case EggType.Brown:
                this.brownEgg(player);
                break;
            case EggType.Pink:
                this.pinkEgg(player);
                break;
            case EggType.Purple:
                this.purpleEgg(player);
                break;
            default:
            case EggType.White:
                this.whiteEgg(player);
                break;
        }
    }

    // butt expansion
    private brownEgg(player: Player): void {
        DisplayText().clear();
        DisplayText("You devour the egg, momentarily sating your hunger.\n\n");
        if (!this.large) {
            DisplayText("You feel a bit of additional weight on your backside as your " + ButtDescriptor.describeButt(player) + " gains a bit more padding.");
            player.torso.butt.rating++;
        }
        else {
            DisplayText("Your " + ButtDescriptor.describeButt(player) + " wobbles, nearly throwing you off balance as it grows much bigger!");
            player.torso.butt.rating += 2 + Utils.rand(3);
        }
        if (Utils.chance(33)) {
            if (this.large)
                DisplayText(BodyModifier.displayModThickness(player, 100, 8));
            else
                DisplayText(BodyModifier.displayModThickness(player, 95, 3));
        }
    }

    // hip expansion
    private purpleEgg(player: Player): void {
        DisplayText().clear();
        DisplayText("You devour the egg, momentarily sating your hunger.\n\n");
        if (!this.large || player.torso.hips.rating > 20) {
            DisplayText("You stumble as you feel your " + HipDescriptor.describeHips(player) + " widen, altering your gait slightly.");
            player.torso.hips.rating++;
        }
        else {
            DisplayText("You stagger wildly as your hips spread apart, widening by inches.  When the transformation finishes you feel as if you have to learn to walk all over again.");
            player.torso.hips.rating += 2 + Utils.rand(2);
        }
        if (Utils.chance(33)) {
            if (this.large)
                DisplayText(BodyModifier.displayModThickness(player, 80, 8));
            else
                DisplayText(BodyModifier.displayModThickness(player, 80, 3));
        }
    }

    // Femminess
    private pinkEgg(player: Player): void {
        DisplayText().clear();
        DisplayText("You devour the egg, momentarily sating your hunger.\n\n");
        if (!this.large) {
            // Remove a dick
            if (player.torso.cocks.count > 0) {
                player.torso.cocks.remove(0);
                DisplayText("\n\n");
                player.updateGender();
            }
            // remove balls
            if (player.torso.balls.quantity > 0) {
                if (player.torso.balls.size > 15) {
                    player.torso.balls.size -= 8;
                    DisplayText("Your scrotum slowly shrinks, settling down at a MUCH smaller size.  <b>Your " + BallsDescriptor.describeBalls(true, true, player) + " are much smaller.</b>\n\n");
                }
                else {
                    player.torso.balls.quantity = 0;
                    player.torso.balls.size = 1;
                    DisplayText("Your scrotum slowly shrinks, eventually disappearing entirely!  <b>You've lost your balls!</b>\n\n");
                }
            }
            // Fertility boost
            if (player.torso.vaginas.count > 0 && player.fertility < 40) {
                DisplayText("You feel a tingle deep inside your body, just above your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ", as if you were becoming more fertile.\n\n");
                player.fertility += 5;
            }
        }
        // LARGE
        else {
            // Remove a dick
            if (player.torso.cocks.count > 0) {
                CockModifier.displayKillCocks(player, -1);
                DisplayText("\n\n");
                player.updateGender();
            }
            if (player.torso.balls.quantity > 0) {
                player.torso.balls.quantity = 0;
                player.torso.balls.size = 1;
                DisplayText("Your scrotum slowly shrinks, eventually disappearing entirely!  <b>You've lost your balls!</b>\n\n");
            }
            // Fertility boost
            if (player.torso.vaginas.count > 0 && player.fertility < 70) {
                DisplayText("You feel a powerful tingle deep inside your body, just above your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ". Instinctively you know you have become more fertile.\n\n");
                player.fertility += 10;
            }
        }
        if (Utils.rand(3) === 0) {
            if (this.large) DisplayText(BodyModifier.displayModFem(player, 100, 8));
            else DisplayText(BodyModifier.displayModFem(player, 95, 3));
        }
    }

    // Maleness
    private blueEgg(player: Player): void {
        let cockAmountLengthened: number = 0;
        let cockAmountThickened: number = 0;
        DisplayText().clear();
        DisplayText("You devour the egg, momentarily sating your hunger.");
        if (!this.large) {
            // Kill pussies!
            if (player.torso.vaginas.count > 0) {
                DisplayText("\n\nYour vagina clenches in pain, doubling you over.  You slip a hand down to check on it, only to feel the slit growing smaller and smaller until it disappears, taking your clit with it! <b> Your vagina is gone!</b>");
                player.torso.vaginas.remove(0);
                // -- Don't understand this
                // player.torso.vaginaSpot.get(0).clitLength = .5;
                player.updateGender();
            }
            // Dickz
            if (player.torso.cocks.count > 0) {
                // Multiz
                if (player.torso.cocks.count > 1) {
                    DisplayText("\n\nYour " + CockDescriptor.describeMultiCock(player) + " fill to full-size... and begin growing obscenely.");

                    for (const cock of player.torso.cocks) {
                        cockAmountLengthened += CockModifier.growCock(player, cock, Utils.rand(3) + 2);
                        cockAmountThickened += CockModifier.thickenCock(cock, 1);
                    }
                    cockAmountLengthened /= player.torso.cocks.count;
                    cockAmountThickened /= player.torso.cocks.count;

                    CockModifier.displayLengthChange(player, cockAmountLengthened, player.torso.cocks.count);

                    // Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (player.torso.cocks.count === 1) DisplayText("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                        else DisplayText("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                    }
                    if (cockAmountThickened <= .5) {
                        if (player.torso.cocks.count > 1) DisplayText("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                        else DisplayText("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (player.torso.cocks.count === 1) DisplayText("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                        if (player.torso.cocks.count > 1) DisplayText("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                    }
                    player.stats.lib += 1;
                    player.stats.sens += 1;
                    player.stats.lust += 20;
                }
                // SINGLEZ
                if (player.torso.cocks.count === 1) {
                    DisplayText("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " fills to its normal size... and begins growing... ");
                    cockAmountThickened = CockModifier.thickenCock(player.torso.cocks.get(0), 1);
                    cockAmountLengthened = CockModifier.growCock(player, player.torso.cocks.get(0), Utils.rand(3) + 2);
                    CockModifier.displayLengthChange(player, cockAmountLengthened, 1);
                    // Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (player.torso.cocks.count === 1) DisplayText("  Your " + CockDescriptor.describeMultiCockShort(player) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                        else DisplayText("  Your " + CockDescriptor.describeMultiCockShort(player) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                    }
                    if (cockAmountThickened <= .5) {
                        if (player.torso.cocks.count > 1) DisplayText("  Your " + CockDescriptor.describeMultiCockShort(player) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                        else DisplayText("  Your " + CockDescriptor.describeMultiCockShort(player) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (player.torso.cocks.count === 1) DisplayText("  Your " + CockDescriptor.describeMultiCockShort(player) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                        if (player.torso.cocks.count > 1) DisplayText("  Your " + CockDescriptor.describeMultiCockShort(player) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                    }
                    player.stats.lib += 1;
                    player.stats.sens += 1;
                    player.stats.lust += 20;
                }

            }
        }
        // LARGE
        else {
            // New lines if changes
            if (player.torso.chest.count > 1 || player.torso.butt.rating > 5 || player.torso.hips.rating > 5 || player.torso.vaginas.count > 0)
                DisplayText("\n\n");
            // Kill pussies!
            if (player.torso.vaginas.count > 0) {
                DisplayText("Your vagina clenches in pain, doubling you over.  You slip a hand down to check on it, only to feel the slit growing smaller and smaller until it disappears, taking your clit with it!\n\n");
                if (player.torso.chest.count > 1 || player.torso.butt.rating > 5 || player.torso.hips.rating > 5)
                    DisplayText("  ");
                player.torso.vaginas.remove(0);
                // -- Don't understand this
                // player.torso.vaginaSpot.get(0).clitLength = .5;
                player.updateGender();
            }
            // Kill extra boobages
            if (player.torso.chest.count > 1) {
                DisplayText("Your back relaxes as extra weight vanishes from your chest.  <b>Your lowest " + BreastDescriptor.describeBreastRow(player.torso.chest.get(player.torso.chest.count - 1)) + " have vanished.</b>");
                if (player.torso.butt.rating > 5 || player.torso.hips.rating > 5) DisplayText("  ");
                // Remove lowest row.
                player.torso.chest.remove(player.torso.chest.count - 1);
            }
            // Ass/hips shrinkage!
            if (player.torso.butt.rating > 5) {
                DisplayText("Muscles firm and tone as you feel your " + ButtDescriptor.describeButt(player) + " become smaller and tighter.");
                if (player.torso.hips.rating > 5) DisplayText("  ");
                player.torso.butt.rating -= 2;
            }
            if (player.torso.hips.rating > 5) {
                DisplayText("Feeling the sudden burning of lactic acid in your " + HipDescriptor.describeHips(player) + ", you realize they have slimmed down and firmed up some.");
                player.torso.hips.rating -= 2;
            }
            // Shrink tits!
            if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) {
                BreastModifier.shrinkTits(player);
            }
            if (player.torso.cocks.count > 0) {
                // Multiz
                if (player.torso.cocks.count > 1) {
                    DisplayText("\n\nYour " + CockDescriptor.describeMultiCock(player) + " fill to full-size... and begin growing obscenely.  ");
                    for (const cock of player.torso.cocks) {
                        cockAmountLengthened += CockModifier.growCock(player, cock, Utils.rand(3) + 5);
                        cockAmountThickened += CockModifier.thickenCock(cock, 1.5);
                    }
                    cockAmountLengthened /= player.torso.cocks.count;
                    cockAmountThickened /= player.torso.cocks.count;

                    CockModifier.displayLengthChange(player, cockAmountLengthened, player.torso.cocks.count);
                    // Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (player.torso.cocks.count === 1) DisplayText("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                        else DisplayText("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                    }
                    if (cockAmountThickened <= .5) {
                        if (player.torso.cocks.count > 1) DisplayText("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                        else DisplayText("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (player.torso.cocks.count === 1) DisplayText("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                        if (player.torso.cocks.count > 1) DisplayText("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                    }
                    player.stats.lib += 1;
                    player.stats.sens += 1;
                    player.stats.lust += 20;
                }
                // SINGLEZ
                if (player.torso.cocks.count === 1) {
                    DisplayText("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " fills to its normal size... and begins growing...");
                    cockAmountThickened = CockModifier.thickenCock(player.torso.cocks.get(0), 1.5);
                    cockAmountLengthened = CockModifier.growCock(player, player.torso.cocks.get(0), Utils.rand(3) + 5);
                    CockModifier.displayLengthChange(player, cockAmountLengthened, 1);
                    // Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (player.torso.cocks.count === 1) DisplayText("  Your " + CockDescriptor.describeMultiCockShort(player) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                        else DisplayText("  Your " + CockDescriptor.describeMultiCockShort(player) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                    }
                    if (cockAmountThickened <= .5) {
                        if (player.torso.cocks.count > 1) DisplayText("  Your " + CockDescriptor.describeMultiCockShort(player) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                        else DisplayText("  Your " + CockDescriptor.describeMultiCockShort(player) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (player.torso.cocks.count === 1) DisplayText("  Your " + CockDescriptor.describeMultiCockShort(player) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                        if (player.torso.cocks.count > 1) DisplayText("  Your " + CockDescriptor.describeMultiCockShort(player) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                    }
                    player.stats.lib += 1;
                    player.stats.sens += 1;
                    player.stats.lust += 20;
                }

            }
        }
        if (Utils.rand(3) === 0) {
            if (this.large) DisplayText(BodyModifier.displayModFem(player, 0, 8));
            else DisplayText(BodyModifier.displayModFem(player, 5, 3));
        }
    }

    // Nipplezzzzz
    private whiteEgg(player: Player): void {
        let gainedNippleCunts: boolean = false;
        DisplayText().clear();
        DisplayText("You devour the egg, momentarily sating your hunger.");
        if (!this.large) {
            // Grow nipples
            if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length < 3 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) {
                DisplayText("\n\nYour nipples engorge, prodding hard against the inside of your " + player.inventory.equipment.armor.displayName + ".  Abruptly you realize they've gotten almost a quarter inch longer.");
                player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length += .2;
                player.stats.lust += 15;
            }
        }
        // LARGE
        else {
            // Grow nipples
            if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length < 3 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) {
                DisplayText("\n\nYour nipples engorge, prodding hard against the inside of your " + player.inventory.equipment.armor.displayName + ".  Abruptly you realize they've grown more than an additional quarter-inch.");
                player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length += (Utils.rand(2) + 3) / 10;
                player.stats.lust += 15;
            }
            // NIPPLECUNTZZZ
            // Set nipplecunts on every row.
            for (const breastRow of player.torso.chest) {
                if (!breastRow.nipples.fuckable && breastRow.nipples.length >= 2) {
                    breastRow.nipples.fuckable = true;
                    // Keep track of changes.
                    gainedNippleCunts = true;
                }
            }
            // Talk about if anything was changed.
            if (gainedNippleCunts)
                DisplayText("\n\nYour " + BreastDescriptor.describeAllBreasts(player) + " tingle with warmth that slowly migrates to your nipples, filling them with warmth.  You pant and moan, rubbing them with your fingers.  A trickle of wetness suddenly coats your finger as it slips inside the nipple.  Shocked, you pull the finger free.  <b>You now have fuckable nipples!</b>");
        }
    }

    private blackRubberEgg(player: Player): void {
        DisplayText().clear();
        DisplayText("You devour the egg, momentarily sating your hunger.");
        // Small
        if (!this.large) {
            // Change skin to normal if not flawless!
            if ((player.skin.adj !== "smooth" && player.skin.adj !== "latex" && player.skin.adj !== "rubber") || player.skin.desc !== "skin") {
                DisplayText("\n\nYour " + player.skin.desc + " tingles delightfully as it ");
                if (player.skin.type === SkinType.PLAIN) DisplayText(" loses its blemishes, becoming flawless smooth skin.");
                if (player.skin.type === SkinType.FUR) DisplayText(" falls out in clumps, revealing smooth skin underneath.");
                if (player.skin.type === SkinType.SCALES) DisplayText(" begins dropping to the ground in a pile around you, revealing smooth skin underneath.");
                if (player.skin.type > SkinType.SCALES) DisplayText(" shifts and changes into flawless smooth skin.");
                player.skin.desc = "skin";
                player.skin.adj = "smooth";
                if (player.skin.tone === "rough gray") player.skin.tone = "gray";
                player.skin.type = SkinType.PLAIN;
            }
            // chance of hair change
            else {
                // If hair isn't rubbery/latex yet
                if (player.torso.neck.head.hair.color.indexOf("rubbery") === -1 && player.torso.neck.head.hair.color.indexOf("latex-textured") && player.torso.neck.head.hair.length !== 0) {
                    // if skin is already one...
                    if (player.skin.desc === "skin" && player.skin.adj === "rubber") {
                        DisplayText("\n\nYour scalp tingles and your " + HeadDescriptor.describeHair(player) + " thickens, the stUtils.Utils.rands merging into ");
                        DisplayText(" thick rubbery hair.");
                        player.torso.neck.head.hair.color = "rubbery " + player.torso.neck.head.hair.color;
                        player.stats.cor += 2;
                    }
                    if (player.skin.desc === "skin" && player.skin.adj === "latex") {
                        DisplayText("\n\nYour scalp tingles and your " + HeadDescriptor.describeHair(player) + " thickens, the stUtils.Utils.rands merging into ");
                        DisplayText(" shiny latex hair.");
                        player.torso.neck.head.hair.color = "latex-textured " + player.torso.neck.head.hair.color;
                        player.stats.cor += 2;
                    }
                }
            }
        }
        // Large
        else {
            // Change skin to latex if smooth.
            if (player.skin.desc === "skin" && player.skin.adj === "smooth") {
                DisplayText("\n\nYour already flawless smooth skin begins to tingle as it changes again.  It becomes shinier as its texture changes subtly.  You gasp as you touch yourself and realize your skin has become ");
                if (Utils.rand(2) === 0) {
                    player.skin.desc = "skin";
                    player.skin.adj = "latex";
                    DisplayText("a layer of pure latex.  ");
                }
                else {
                    player.skin.desc = "skin";
                    player.skin.adj = "rubber";
                    DisplayText("a layer of sensitive rubber.  ");
                }
                Flags.list[FlagEnum.PC_KNOWS_ABOUT_BLACK_EGGS] = 1;
                if (player.stats.cor < 66) DisplayText("You feel like some kind of freak.");
                else DisplayText("You feel like some kind of sexy " + player.skin.desc + " love-doll.");
                player.stats.spe -= 3;
                player.stats.sens += 8;
                player.stats.lust += 10;
                player.stats.cor += 2;
            }
            // Change skin to normal if not flawless!
            if ((player.skin.adj !== "smooth" && player.skin.adj !== "latex" && player.skin.adj !== "rubber") || player.skin.desc !== "skin") {
                DisplayText("\n\nYour " + player.skin.desc + " tingles delightfully as it ");
                if (player.skin.type === SkinType.PLAIN) DisplayText(" loses its blemishes, becoming flawless smooth skin.");
                if (player.skin.type === SkinType.FUR) DisplayText(" falls out in clumps, revealing smooth skin underneath.");
                if (player.skin.type === SkinType.SCALES) DisplayText(" begins dropping to the ground in a pile around you, revealing smooth skin underneath.");
                if (player.skin.type > SkinType.SCALES) DisplayText(" shifts and changes into flawless smooth skin.");
                player.skin.desc = "skin";
                player.skin.adj = "smooth";
                if (player.skin.tone === "rough gray") player.skin.tone = "gray";
                player.skin.type = SkinType.PLAIN;
            }
            // chance of hair change
            else {
                // If hair isn't rubbery/latex yet
                if (player.torso.neck.head.hair.color.indexOf("rubbery") === -1 && player.torso.neck.head.hair.color.indexOf("latex-textured") && player.torso.neck.head.hair.length !== 0) {
                    // if skin is already one...
                    if (player.skin.adj === "rubber" && player.skin.desc === "skin") {
                        DisplayText("\n\nYour scalp tingles and your " + HeadDescriptor.describeHair(player) + " thickens, the stUtils.Utils.rands merging into ");
                        DisplayText(" thick rubbery hair.");
                        player.torso.neck.head.hair.color = "rubbery " + player.torso.neck.head.hair.color;
                        player.stats.cor += 2;
                    }
                    if (player.skin.adj === "latex" && player.skin.desc === "skin") {
                        DisplayText("\n\nYour scalp tingles and your " + HeadDescriptor.describeHair(player) + " thickens, the stUtils.Utils.rands merging into ");
                        DisplayText(" shiny latex hair.");
                        player.torso.neck.head.hair.color = "latex-textured " + player.torso.neck.head.hair.color;
                        player.stats.cor += 2;
                    }
                }
            }
        }
    }
}
