import Consumable from './Consumable';
import { SkinType } from '../../Body/Creature';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import DisplayText from '../../display/DisplayText';
import Flags, { FlagEnum } from '../../Game/Flags';
import BodyModifier from '../../Modifiers/BodyModifier';
import BreastModifier from '../../Modifiers/BreastModifier';
import CockModifier from '../../Modifiers/CockModifier';
import Player from '../../Player/Player';
import Utils from '../../Utilities/Utils';
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
                    super("L.BlkEg", new ItemDesc("L.BlkEg", "a large rubbery black egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.  For all you know, it could turn you into rubber!"));
                    break;
                case EggType.Blue:
                    super("L.BluEg", new ItemDesc("L.BluEg", "a large blue and white mottled egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food."));
                    break;
                case EggType.Brown:
                    super("L.BrnEg", new ItemDesc("L.BrnEg", "a large brown and white mottled egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food."));
                    break;
                case EggType.Pink:
                    super("L.PnkEg", new ItemDesc("L.PnkEg", "a large pink and white mottled egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food."));
                    break;
                case EggType.Purple:
                    super("L.PrpEg", new ItemDesc("L.PrpEg", "a large purple and white mottled egg", "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food."));
                    break;
                default:
                case EggType.White:
                    super("L.WhtEg", new ItemDesc("L.WhtEg", "a large white egg", "This is an oblong egg, not much different from an ostrich egg in appearance.  Something tells you it's more than just food."));
                    break;
            }
        }
        else {
            switch (eggType) {
                case EggType.Black:
                    super("BlackEg", new ItemDesc("BlackEg", "a rubbery black egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
                case EggType.Blue:
                    super("BlueEgg", new ItemDesc("BlueEgg", "a blue and white mottled egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
                case EggType.Brown:
                    super("BrownEg", new ItemDesc("BrownEg", "a brown and white mottled egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
                case EggType.Pink:
                    super("PinkEgg", new ItemDesc("PinkEgg", "a pink and white mottled egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
                case EggType.Purple:
                    super("PurplEg", new ItemDesc("PurplEg", "a purple and white mottled egg", "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food."), Eggs.DefaultValue);
                    break;
                default:
                case EggType.White:
                    super("WhiteEg", new ItemDesc("WhiteEg", "a milky-white egg", "This is an oblong egg, not much different from a chicken egg in appearance.  Something tells you it's more than just food."), Eggs.DefaultValue);
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

    //butt expansion
    private brownEgg(player: Player): void {
        DisplayText.clear();
        DisplayText.text("You devour the egg, momentarily sating your hunger.\n\n");
        if (!this.large) {
            DisplayText.text("You feel a bit of additional weight on your backside as your " + ButtDescriptor.describeButt(player) + " gains a bit more padding.");
            player.lowerBody.butt.buttRating++;
        }
        else {
            DisplayText.text("Your " + ButtDescriptor.describeButt(player) + " wobbles, nearly throwing you off balance as it grows much bigger!");
            player.lowerBody.butt.buttRating += 2 + Utils.rand(3);
        }
        if (Utils.chance(33)) {
            if (this.large)
                DisplayText.text(BodyModifier.displayModThickness(player, 100, 8));
            else
                DisplayText.text(BodyModifier.displayModThickness(player, 95, 3));
        }
    }

    //hip expansion
    private purpleEgg(player: Player): void {
        DisplayText.clear();
        DisplayText.text("You devour the egg, momentarily sating your hunger.\n\n");
        if (!this.large || player.lowerBody.hipRating > 20) {
            DisplayText.text("You stumble as you feel your " + LowerBodyDescriptor.describeHips(player) + " widen, altering your gait slightly.");
            player.lowerBody.hipRating++;
        }
        else {
            DisplayText.text("You stagger wildly as your hips spread apart, widening by inches.  When the transformation finishes you feel as if you have to learn to walk all over again.");
            player.lowerBody.hipRating += 2 + Utils.rand(2);
        }
        if (Utils.chance(33)) {
            if (this.large)
                DisplayText.text(BodyModifier.displayModThickness(player, 80, 8));
            else
                DisplayText.text(BodyModifier.displayModThickness(player, 80, 3));
        }
    }

    //Femminess
    private pinkEgg(player: Player): void {
        DisplayText.clear();
        DisplayText.text("You devour the egg, momentarily sating your hunger.\n\n");
        if (!this.large) {
            //Remove a dick
            if (player.lowerBody.cockSpot.hasCock()) {
                player.lowerBody.cockSpot.remove(player, player.lowerBody.cockSpot.get(0));
                DisplayText.text("\n\n");
                player.updateGender();
            }
            //remove balls
            if (player.lowerBody.balls > 0) {
                if (player.lowerBody.ballSize > 15) {
                    player.lowerBody.ballSize -= 8;
                    DisplayText.text("Your scrotum slowly shrinks, settling down at a MUCH smaller size.  <b>Your " + BallsDescriptor.describeBalls(true, true, player) + " are much smaller.</b>\n\n");
                }
                else {
                    player.lowerBody.balls = 0;
                    player.lowerBody.ballSize = 1;
                    DisplayText.text("Your scrotum slowly shrinks, eventually disappearing entirely!  <b>You've lost your balls!</b>\n\n");
                }
            }
            //Fertility boost
            if (player.lowerBody.vaginaSpot.hasVagina() && player.fertility < 40) {
                DisplayText.text("You feel a tingle deep inside your body, just above your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ", as if you were becoming more fertile.\n\n");
                player.fertility += 5;
            }
        }
        //LARGE
        else {
            //Remove a dick
            if (player.lowerBody.cockSpot.hasCock()) {
                CockModifier.displayKillCocks(player, -1);
                DisplayText.text("\n\n");
                player.updateGender();
            }
            if (player.lowerBody.balls > 0) {
                player.lowerBody.balls = 0;
                player.lowerBody.ballSize = 1;
                DisplayText.text("Your scrotum slowly shrinks, eventually disappearing entirely!  <b>You've lost your balls!</b>\n\n");
            }
            //Fertility boost
            if (player.lowerBody.vaginaSpot.count() > 0 && player.fertility < 70) {
                DisplayText.text("You feel a powerful tingle deep inside your body, just above your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ". Instinctively you know you have become more fertile.\n\n");
                player.fertility += 10;
            }
        }
        if (Utils.rand(3) == 0) {
            if (this.large) DisplayText.text(player.modFem(100, 8));
            else DisplayText.text(player.modFem(95, 3));
        }
    }

    //Maleness
    private blueEgg(player: Player): void {
        let cockAmountLengthened: number = 0;
        let cockAmountThickened: number = 0;
        DisplayText.clear();
        DisplayText.text("You devour the egg, momentarily sating your hunger.");
        if (!this.large) {
            //Kill pussies!
            if (player.lowerBody.vaginaSpot.count() > 0) {
                DisplayText.text("\n\nYour vagina clenches in pain, doubling you over.  You slip a hand down to check on it, only to feel the slit growing smaller and smaller until it disappears, taking your clit with it! <b> Your vagina is gone!</b>");
                player.lowerBody.vaginaSpot.remove(player.lowerBody.vaginaSpot.get(0));
                // -- Don't understand this
                //player.lowerBody.vaginaSpot.get(0).clitLength = .5;
                player.updateGender();
            }
            //Dickz
            if (player.lowerBody.cockSpot.count() > 0) {
                //Multiz
                if (player.lowerBody.cockSpot.count() > 1) {
                    DisplayText.text("\n\nYour " + CockDescriptor.describeMultiCock(player) + " fill to full-size... and begin growing obscenely.");

                    for (let index = 0; index < player.lowerBody.cockSpot.count(); index++) {
                        cockAmountLengthened += CockModifier.growCock(player, player.lowerBody.cockSpot.get(index), Utils.rand(3) + 2);
                        cockAmountThickened += CockModifier.thickenCock(player.lowerBody.cockSpot.get(index), 1);
                    }
                    cockAmountLengthened /= player.lowerBody.cockSpot.count();
                    cockAmountThickened /= player.lowerBody.cockSpot.count();

                    CockModifier.displayLengthChange(player, cockAmountLengthened, player.lowerBody.cockSpot.count());

                    //Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (player.lowerBody.cockSpot.count() == 1) DisplayText.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                        else DisplayText.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                    }
                    if (cockAmountThickened <= .5) {
                        if (player.lowerBody.cockSpot.count() > 1) DisplayText.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                        else DisplayText.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (player.lowerBody.cockSpot.count() == 1) DisplayText.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                        if (player.lowerBody.cockSpot.count() > 1) DisplayText.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                    }
                    player.stats.lib += 1;
                    player.stats.sens += 1;
                    player.stats.lust += 20;
                }
                //SINGLEZ
                if (player.lowerBody.cockSpot.count() == 1) {
                    DisplayText.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " fills to its normal size... and begins growing... ");
                    cockAmountThickened = CockModifier.thickenCock(player.lowerBody.cockSpot.get(0), 1);
                    cockAmountLengthened = CockModifier.growCock(player, player.lowerBody.cockSpot.get(0), Utils.rand(3) + 2);
                    CockModifier.displayLengthChange(player, cockAmountLengthened, 1);
                    //Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (player.lowerBody.cockSpot.count() == 1) DisplayText.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                        else DisplayText.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                    }
                    if (cockAmountThickened <= .5) {
                        if (player.lowerBody.cockSpot.count() > 1) DisplayText.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                        else DisplayText.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (player.lowerBody.cockSpot.count() == 1) DisplayText.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                        if (player.lowerBody.cockSpot.count() > 1) DisplayText.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                    }
                    player.stats.lib += 1;
                    player.stats.sens += 1;
                    player.stats.lust += 20;
                }

            }
        }
        //LARGE
        else {
            //New lines if changes
            if (player.upperBody.chest.count() > 1 || player.lowerBody.butt.buttRating > 5 || player.lowerBody.hipRating > 5 || player.lowerBody.vaginaSpot.hasVagina())
                DisplayText.text("\n\n");
            //Kill pussies!
            if (player.lowerBody.vaginaSpot.count() > 0) {
                DisplayText.text("Your vagina clenches in pain, doubling you over.  You slip a hand down to check on it, only to feel the slit growing smaller and smaller until it disappears, taking your clit with it!\n\n");
                if (player.upperBody.chest.count() > 1 || player.lowerBody.butt.buttRating > 5 || player.lowerBody.hipRating > 5)
                    DisplayText.text("  ");
                player.lowerBody.vaginaSpot.remove(player.lowerBody.vaginaSpot.get(0));
                // -- Don't understand this
                //player.lowerBody.vaginaSpot.get(0).clitLength = .5;
                player.updateGender();
            }
            //Kill extra boobages
            if (player.upperBody.chest.count() > 1) {
                DisplayText.text("Your back relaxes as extra weight vanishes from your chest.  <b>Your lowest " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(player.upperBody.chest.count() - 1)) + " have vanished.</b>");
                if (player.lowerBody.butt.buttRating > 5 || player.lowerBody.hipRating > 5) DisplayText.text("  ");
                //Remove lowest row.
                player.upperBody.chest.remove(player.upperBody.chest.get(player.upperBody.chest.count() - 1));
            }
            //Ass/hips shrinkage!
            if (player.lowerBody.butt.buttRating > 5) {
                DisplayText.text("Muscles firm and tone as you feel your " + ButtDescriptor.describeButt(player) + " become smaller and tighter.");
                if (player.lowerBody.hipRating > 5) DisplayText.text("  ");
                player.lowerBody.butt.buttRating -= 2;
            }
            if (player.lowerBody.hipRating > 5) {
                DisplayText.text("Feeling the sudden burning of lactic acid in your " + LowerBodyDescriptor.describeHips(player) + ", you realize they have slimmed down and firmed up some.");
                player.lowerBody.hipRating -= 2;
            }
            //Shrink tits!
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 0) {
                BreastModifier.shrinkTits(player);
            }
            if (player.lowerBody.cockSpot.count() > 0) {
                //Multiz
                if (player.lowerBody.cockSpot.count() > 1) {
                    DisplayText.text("\n\nYour " + CockDescriptor.describeMultiCock(player) + " fill to full-size... and begin growing obscenely.  ");
                    for (let index = 0; index < player.lowerBody.cockSpot.count(); index++) {
                        cockAmountLengthened += CockModifier.growCock(player, player.lowerBody.cockSpot.get(index), Utils.rand(3) + 5);
                        cockAmountThickened += CockModifier.thickenCock(player.lowerBody.cockSpot.get(index), 1.5);
                    }
                    cockAmountLengthened /= player.lowerBody.cockSpot.count();
                    cockAmountThickened /= player.lowerBody.cockSpot.count();

                    CockModifier.displayLengthChange(player, cockAmountLengthened, player.lowerBody.cockSpot.count());
                    //Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (player.lowerBody.cockSpot.count() == 1) DisplayText.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                        else DisplayText.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                    }
                    if (cockAmountThickened <= .5) {
                        if (player.lowerBody.cockSpot.count() > 1) DisplayText.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                        else DisplayText.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (player.lowerBody.cockSpot.count() == 1) DisplayText.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                        if (player.lowerBody.cockSpot.count() > 1) DisplayText.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                    }
                    player.stats.lib += 1;
                    player.stats.sens += 1;
                    player.stats.lust += 20;
                }
                //SINGLEZ
                if (player.lowerBody.cockSpot.count() == 1) {
                    DisplayText.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " fills to its normal size... and begins growing...");
                    cockAmountThickened = CockModifier.thickenCock(player.lowerBody.cockSpot.get(0), 1.5);
                    cockAmountLengthened = CockModifier.growCock(player, player.lowerBody.cockSpot.get(0), Utils.rand(3) + 5);
                    CockModifier.displayLengthChange(player, cockAmountLengthened, 1);
                    //Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (player.lowerBody.cockSpot.count() == 1) DisplayText.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                        else DisplayText.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                    }
                    if (cockAmountThickened <= .5) {
                        if (player.lowerBody.cockSpot.count() > 1) DisplayText.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                        else DisplayText.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (player.lowerBody.cockSpot.count() == 1) DisplayText.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                        if (player.lowerBody.cockSpot.count() > 1) DisplayText.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                    }
                    player.stats.lib += 1;
                    player.stats.sens += 1;
                    player.stats.lust += 20;
                }

            }
        }
        if (Utils.rand(3) == 0) {
            if (this.large) DisplayText.text(player.modFem(0, 8));
            else DisplayText.text(player.modFem(5, 3));
        }
    }

    //Nipplezzzzz
    private whiteEgg(player: Player): void {
        let gainedNippleCunts: boolean = false;
        DisplayText.clear();
        DisplayText.text("You devour the egg, momentarily sating your hunger.");
        if (!this.large) {
            //Grow nipples
            if (player.upperBody.chest.BreastRatingLargest[0].nippleLength < 3 && player.upperBody.chest.BreastRatingLargest[0].breastRating > 0) {
                DisplayText.text("\n\nYour nipples engorge, prodding hard against the inside of your " + player.inventory.armorSlot.equipment.displayName + ".  Abruptly you realize they've gotten almost a quarter inch longer.");
                player.upperBody.chest.BreastRatingLargest[0].nippleLength += .2;
                player.stats.lust += 15;
            }
        }
        //LARGE
        else {
            //Grow nipples
            if (player.upperBody.chest.BreastRatingLargest[0].nippleLength < 3 && player.upperBody.chest.BreastRatingLargest[0].breastRating > 0) {
                DisplayText.text("\n\nYour nipples engorge, prodding hard against the inside of your " + player.inventory.armorSlot.equipment.displayName + ".  Abruptly you realize they've grown more than an additional quarter-inch.");
                player.upperBody.chest.BreastRatingLargest[0].nippleLength += (Utils.rand(2) + 3) / 10;
                player.stats.lust += 15;
            }
            //NIPPLECUNTZZZ
            //Set nipplecunts on every row.
            for (let index = 0; index < player.upperBody.chest.count(); index++) {
                if (!player.upperBody.chest.get(index).fuckable && player.upperBody.chest.get(index).nippleLength >= 2) {
                    player.upperBody.chest.get(index).fuckable = true;
                    //Keep track of changes.
                    gainedNippleCunts = true;
                }
            }
            //Talk about if anything was changed.
            if (gainedNippleCunts)
                DisplayText.text("\n\nYour " + BreastDescriptor.describeAllBreasts(player) + " tingle with warmth that slowly migrates to your nipples, filling them with warmth.  You pant and moan, rubbing them with your fingers.  A trickle of wetness suddenly coats your finger as it slips inside the nipple.  Shocked, you pull the finger free.  <b>You now have fuckable nipples!</b>");
        }
    }

    private blackRubberEgg(player: Player): void {
        DisplayText.clear();
        DisplayText.text("You devour the egg, momentarily sating your hunger.");
        //Small
        if (!this.large) {
            //Change skin to normal if not flawless!
            if ((player.skinAdj != "smooth" && player.skinAdj != "latex" && player.skinAdj != "rubber") || player.skinDesc != "skin") {
                DisplayText.text("\n\nYour " + player.skinDesc + " tingles delightfully as it ");
                if (player.skinType == SkinType.PLAIN) DisplayText.text(" loses its blemishes, becoming flawless smooth skin.");
                if (player.skinType == SkinType.FUR) DisplayText.text(" falls out in clumps, revealing smooth skin underneath.");
                if (player.skinType == SkinType.SCALES) DisplayText.text(" begins dropping to the ground in a pile around you, revealing smooth skin underneath.");
                if (player.skinType > SkinType.SCALES) DisplayText.text(" shifts and changes into flawless smooth skin.");
                player.skinDesc = "skin";
                player.skinAdj = "smooth";
                if (player.skinTone == "rough gray") player.skinTone = "gray";
                player.skinType = SkinType.PLAIN;
            }
            //chance of hair change
            else {
                //If hair isn't rubbery/latex yet
                if (player.upperBody.head.hairColor.indexOf("rubbery") == -1 && player.upperBody.head.hairColor.indexOf("latex-textured") && player.upperBody.head.hairLength != 0) {
                    //if skin is already one...
                    if (player.skinDesc == "skin" && player.skinAdj == "rubber") {
                        DisplayText.text("\n\nYour scalp tingles and your " + HeadDescriptor.describeHair(player) + " thickens, the stUtils.Utils.rands merging into ");
                        DisplayText.text(" thick rubbery hair.");
                        player.upperBody.head.hairColor = "rubbery " + player.upperBody.head.hairColor;
                        player.stats.cor += 2;
                    }
                    if (player.skinDesc == "skin" && player.skinAdj == "latex") {
                        DisplayText.text("\n\nYour scalp tingles and your " + HeadDescriptor.describeHair(player) + " thickens, the stUtils.Utils.rands merging into ");
                        DisplayText.text(" shiny latex hair.");
                        player.upperBody.head.hairColor = "latex-textured " + player.upperBody.head.hairColor;
                        player.stats.cor += 2;
                    }
                }
            }
        }
        //Large
        else {
            //Change skin to latex if smooth.
            if (player.skinDesc == "skin" && player.skinAdj == "smooth") {
                DisplayText.text("\n\nYour already flawless smooth skin begins to tingle as it changes again.  It becomes shinier as its texture changes subtly.  You gasp as you touch yourself and realize your skin has become ");
                if (Utils.rand(2) == 0) {
                    player.skinDesc = "skin";
                    player.skinAdj = "latex";
                    DisplayText.text("a layer of pure latex.  ");
                }
                else {
                    player.skinDesc = "skin";
                    player.skinAdj = "rubber";
                    DisplayText.text("a layer of sensitive rubber.  ");
                }
                Flags.list[FlagEnum.PC_KNOWS_ABOUT_BLACK_EGGS] = 1;
                if (player.stats.cor < 66) DisplayText.text("You feel like some kind of freak.");
                else DisplayText.text("You feel like some kind of sexy " + player.skinDesc + " love-doll.");
                player.stats.spe -= 3;
                player.stats.sens += 8;
                player.stats.lust += 10;
                player.stats.cor += 2;
            }
            //Change skin to normal if not flawless!
            if ((player.skinAdj != "smooth" && player.skinAdj != "latex" && player.skinAdj != "rubber") || player.skinDesc != "skin") {
                DisplayText.text("\n\nYour " + player.skinDesc + " tingles delightfully as it ");
                if (player.skinType == SkinType.PLAIN) DisplayText.text(" loses its blemishes, becoming flawless smooth skin.");
                if (player.skinType == SkinType.FUR) DisplayText.text(" falls out in clumps, revealing smooth skin underneath.");
                if (player.skinType == SkinType.SCALES) DisplayText.text(" begins dropping to the ground in a pile around you, revealing smooth skin underneath.");
                if (player.skinType > SkinType.SCALES) DisplayText.text(" shifts and changes into flawless smooth skin.");
                player.skinDesc = "skin";
                player.skinAdj = "smooth";
                if (player.skinTone == "rough gray") player.skinTone = "gray";
                player.skinType = SkinType.PLAIN;
            }
            //chance of hair change
            else {
                //If hair isn't rubbery/latex yet
                if (player.upperBody.head.hairColor.indexOf("rubbery") == -1 && player.upperBody.head.hairColor.indexOf("latex-textured") && player.upperBody.head.hairLength != 0) {
                    //if skin is already one...
                    if (player.skinAdj == "rubber" && player.skinDesc == "skin") {
                        DisplayText.text("\n\nYour scalp tingles and your " + HeadDescriptor.describeHair(player) + " thickens, the stUtils.Utils.rands merging into ");
                        DisplayText.text(" thick rubbery hair.");
                        player.upperBody.head.hairColor = "rubbery " + player.upperBody.head.hairColor;
                        player.stats.cor += 2;
                    }
                    if (player.skinAdj == "latex" && player.skinDesc == "skin") {
                        DisplayText.text("\n\nYour scalp tingles and your " + HeadDescriptor.describeHair(player) + " thickens, the stUtils.Utils.rands merging into ");
                        DisplayText.text(" shiny latex hair.");
                        player.upperBody.head.hairColor = "latex-textured " + player.upperBody.head.hairColor;
                        player.stats.cor += 2;
                    }
                }
            }
        }
    }

}
