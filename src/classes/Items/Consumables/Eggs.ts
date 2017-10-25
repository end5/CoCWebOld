import Consumable from './Consumable';
import { SkinType } from '../../Body/Creature';
import BallsDescriptor from '../../Descriptors/BallsDescriptor';
import BreastDescriptor from '../../Descriptors/BreastDescriptor';
import ButtDescriptor from '../../Descriptors/ButtDescriptor';
import CockDescriptor from '../../Descriptors/CockDescriptor';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import LowerBodyDescriptor from '../../Descriptors/LowerBodyDescriptor';
import VaginaDescriptor from '../../Descriptors/VaginaDescriptor';
import CreatureChange from '../../display/CreatureChange';
import MainScreen from '../../display/MainScreen';
import Flags, { FlagEnum } from '../../Game/Flags';
import BreastModifier from '../../Modifiers/BreastModifiers';
import CockModifier from '../../Modifiers/CockModifier';
import Player from '../../Player';
import Utils from '../../Utilities/Utils';

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
                    super("L.BlkEg", "L.BlkEg", "a large rubbery black egg", Eggs.DefaultValue, "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.  For all you know, it could turn you into rubber!");
                    break;
                case EggType.Blue:
                    super("L.BluEg", "L.BluEg", "a large blue and white mottled egg", Eggs.DefaultValue, "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.");
                    break;
                case EggType.Brown:
                    super("L.BrnEg", "L.BrnEg", "a large brown and white mottled egg", Eggs.DefaultValue, "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.");
                    break;
                case EggType.Pink:
                    super("L.PnkEg", "L.PnkEg", "a large pink and white mottled egg", Eggs.DefaultValue, "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.");
                    break;
                case EggType.Purple:
                    super("L.PrpEg", "L.PrpEg", "a large purple and white mottled egg", Eggs.DefaultValue, "This is an oblong egg, not much different from an ostrich egg in appearance (save for the color).  Something tells you it's more than just food.");
                    break;
                default:
                case EggType.White:
                    super("L.WhtEg", "L.WhtEg", "a large white egg", Eggs.DefaultValue, "This is an oblong egg, not much different from an ostrich egg in appearance.  Something tells you it's more than just food.");
                    break;
            }
        }
        else {
            switch (eggType) {
                case EggType.Black:
                    super("BlackEg", "BlackEg", "a rubbery black egg", Eggs.DefaultValue, "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food.");
                    break;
                case EggType.Blue:
                    super("BlueEgg", "BlueEgg", "a blue and white mottled egg", Eggs.DefaultValue, "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food.");
                    break;
                case EggType.Brown:
                    super("BrownEg", "BrownEg", "a brown and white mottled egg", Eggs.DefaultValue, "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food.");
                    break;
                case EggType.Pink:
                    super("PinkEgg", "PinkEgg", "a pink and white mottled egg", Eggs.DefaultValue, "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food.");
                    break;
                case EggType.Purple:
                    super("PurplEg", "PurplEg", "a purple and white mottled egg", Eggs.DefaultValue, "This is an oblong egg, not much different from a chicken egg in appearance (save for the color).  Something tells you it's more than just food.");
                    break;
                default:
                case EggType.White:
                    super("WhiteEg", "WhiteEg", "a milky-white egg", Eggs.DefaultValue, "This is an oblong egg, not much different from a chicken egg in appearance.  Something tells you it's more than just food.");
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
        MainScreen.text("You devour the egg, momentarily sating your hunger.\n\n", true);
        if (!this.large) {
            MainScreen.text("You feel a bit of additional weight on your backside as your " + ButtDescriptor.describeButt(player) + " gains a bit more padding.", true);
            player.lowerBody.butt.buttRating++;
        }
        else {
            MainScreen.text("Your " + ButtDescriptor.describeButt(player) + " wobbles, nearly throwing you off balance as it grows much bigger!", true);
            player.lowerBody.butt.buttRating += 2 + Utils.rand(3);
        }
        if (Utils.chance(33)) {
            if (this.large)
                MainScreen.text(player.modThickness(100, 8), false);
            else
                MainScreen.text(player.modThickness(95, 3), false);
        }
    }

    //hip expansion
    private purpleEgg(player: Player): void {
        MainScreen.text("You devour the egg, momentarily sating your hunger.\n\n", true);
        if (!this.large || player.lowerBody.hipRating > 20) {
            MainScreen.text("You stumble as you feel your " + LowerBodyDescriptor.describeHips(player) + " widen, altering your gait slightly.", false);
            player.lowerBody.hipRating++;
        }
        else {
            MainScreen.text("You stagger wildly as your hips spread apart, widening by inches.  When the transformation finishes you feel as if you have to learn to walk all over again.", false);
            player.lowerBody.hipRating += 2 + Utils.rand(2);
        }
        if (Utils.chance(33)) {
            if (this.large)
                MainScreen.text(player.modThickness(80, 8), false);
            else
                MainScreen.text(player.modThickness(80, 3), false);
        }
    }

    //Femminess
    private pinkEgg(player: Player): void {
        MainScreen.text("You devour the egg, momentarily sating your hunger.\n\n", true);
        if (!this.large) {
            //Remove a dick
            if (player.lowerBody.cockSpot.hasCock()) {
                player.lowerBody.cockSpot.remove(player, player.lowerBody.cockSpot.get(0));
                MainScreen.text("\n\n", false);
                player.updateGender();
            }
            //remove balls
            if (player.lowerBody.balls > 0) {
                if (player.lowerBody.ballSize > 15) {
                    player.lowerBody.ballSize -= 8;
                    MainScreen.text("Your scrotum slowly shrinks, settling down at a MUCH smaller size.  <b>Your " + BallsDescriptor.describeBalls(true, true, player) + " are much smaller.</b>\n\n", false);
                }
                else {
                    player.lowerBody.balls = 0;
                    player.lowerBody.ballSize = 1;
                    MainScreen.text("Your scrotum slowly shrinks, eventually disappearing entirely!  <b>You've lost your balls!</b>\n\n", false);
                }
            }
            //Fertility boost
            if (player.lowerBody.vaginaSpot.hasVagina() && player.fertility < 40) {
                MainScreen.text("You feel a tingle deep inside your body, just above your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ", as if you were becoming more fertile.\n\n", false);
                player.fertility += 5;
            }
        }
        //LARGE
        else {
            //Remove a dick
            if (player.lowerBody.cockSpot.hasCock()) {
                CockModifier.killCocks(player, -1);
                MainScreen.text("\n\n", false);
                player.updateGender();
            }
            if (player.lowerBody.balls > 0) {
                player.lowerBody.balls = 0;
                player.lowerBody.ballSize = 1;
                MainScreen.text("Your scrotum slowly shrinks, eventually disappearing entirely!  <b>You've lost your balls!</b>\n\n", false);
            }
            //Fertility boost
            if (player.lowerBody.vaginaSpot.count() > 0 && player.fertility < 70) {
                MainScreen.text("You feel a powerful tingle deep inside your body, just above your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ". Instinctively you know you have become more fertile.\n\n", false);
                player.fertility += 10;
            }
        }
        if (Utils.rand(3) == 0) {
            if (this.large) MainScreen.text(player.modFem(100, 8), false);
            else MainScreen.text(player.modFem(95, 3), false);
        }
    }

    //Maleness
    private blueEgg(player: Player): void {
        let cockAmountLengthened: number = 0;
        let cockAmountThickened: number = 0;
        MainScreen.text("You devour the egg, momentarily sating your hunger.", true);
        if (!this.large) {
            //Kill pussies!
            if (player.lowerBody.vaginaSpot.count() > 0) {
                MainScreen.text("\n\nYour vagina clenches in pain, doubling you over.  You slip a hand down to check on it, only to feel the slit growing smaller and smaller until it disappears, taking your clit with it! <b> Your vagina is gone!</b>", false);
                player.lowerBody.vaginaSpot.remove(player.lowerBody.vaginaSpot.get(0));
                // -- Don't understand this
                //player.lowerBody.vaginaSpot.get(0).clitLength = .5;
                player.updateGender();
            }
            //Dickz
            if (player.lowerBody.cockSpot.count() > 0) {
                //Multiz
                if (player.lowerBody.cockSpot.count() > 1) {
                    MainScreen.text("\n\nYour " + CockDescriptor.describeMultiCock(player) + " fill to full-size... and begin growing obscenely.", false);

                    for (let index = 0; index < player.lowerBody.cockSpot.count(); index++) {
                        cockAmountLengthened += CockModifier.growCock(player, player.lowerBody.cockSpot.get(index), Utils.rand(3) + 2);
                        cockAmountThickened += CockModifier.thickenCock(player.lowerBody.cockSpot.get(index), 1);
                    }
                    cockAmountLengthened /= player.lowerBody.cockSpot.count();
                    cockAmountThickened /= player.lowerBody.cockSpot.count();

                    CreatureChange.lengthChange(player, cockAmountLengthened, player.lowerBody.cockSpot.count());

                    //Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.", false);
                        else MainScreen.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.", false);
                    }
                    if (cockAmountThickened <= .5) {
                        if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.", false);
                        else MainScreen.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.", false);
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.", false);
                        if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.", false);
                    }
                    player.stats.lib += 1;
                    player.stats.sens += 1;
                    player.stats.lust += 20;
                }
                //SINGLEZ
                if (player.lowerBody.cockSpot.count() == 1) {
                    MainScreen.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " fills to its normal size... and begins growing... ", false);
                    cockAmountThickened = CockModifier.thickenCock(player.lowerBody.cockSpot.get(0), 1);
                    cockAmountLengthened = CockModifier.growCock(player, player.lowerBody.cockSpot.get(0), Utils.rand(3) + 2);
                    CreatureChange.lengthChange(player, cockAmountLengthened, 1);
                    //Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.", false);
                        else MainScreen.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.", false);
                    }
                    if (cockAmountThickened <= .5) {
                        if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.", false);
                        else MainScreen.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.", false);
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.", false);
                        if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.", false);
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
                MainScreen.text("\n\n", false);
            //Kill pussies!
            if (player.lowerBody.vaginaSpot.count() > 0) {
                MainScreen.text("Your vagina clenches in pain, doubling you over.  You slip a hand down to check on it, only to feel the slit growing smaller and smaller until it disappears, taking your clit with it!\n\n", false);
                if (player.upperBody.chest.count() > 1 || player.lowerBody.butt.buttRating > 5 || player.lowerBody.hipRating > 5)
                    MainScreen.text("  ", false);
                player.lowerBody.vaginaSpot.remove(player.lowerBody.vaginaSpot.get(0));
                // -- Don't understand this
                //player.lowerBody.vaginaSpot.get(0).clitLength = .5;
                player.updateGender();
            }
            //Kill extra boobages
            if (player.upperBody.chest.count() > 1) {
                MainScreen.text("Your back relaxes as extra weight vanishes from your chest.  <b>Your lowest " + BreastDescriptor.describeBreastRow(player.upperBody.chest.get(player.upperBody.chest.count() - 1)) + " have vanished.</b>", false);
                if (player.lowerBody.butt.buttRating > 5 || player.lowerBody.hipRating > 5) MainScreen.text("  ", false);
                //Remove lowest row.
                player.upperBody.chest.remove(player.upperBody.chest.get(player.upperBody.chest.count() - 1));
            }
            //Ass/hips shrinkage!
            if (player.lowerBody.butt.buttRating > 5) {
                MainScreen.text("Muscles firm and tone as you feel your " + ButtDescriptor.describeButt(player) + " become smaller and tighter.", false);
                if (player.lowerBody.hipRating > 5) MainScreen.text("  ", false);
                player.lowerBody.butt.buttRating -= 2;
            }
            if (player.lowerBody.hipRating > 5) {
                MainScreen.text("Feeling the sudden burning of lactic acid in your " + LowerBodyDescriptor.describeHips(player) + ", you realize they have slimmed down and firmed up some.", false);
                player.lowerBody.hipRating -= 2;
            }
            //Shrink tits!
            if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 0) {
                BreastModifier.shrinkTits(player);
            }
            if (player.lowerBody.cockSpot.count() > 0) {
                //Multiz
                if (player.lowerBody.cockSpot.count() > 1) {
                    MainScreen.text("\n\nYour " + CockDescriptor.describeMultiCock(player) + " fill to full-size... and begin growing obscenely.  ", false);
                    for (let index = 0; index < player.lowerBody.cockSpot.count(); index++) {
                        cockAmountLengthened += CockModifier.growCock(player, player.lowerBody.cockSpot.get(index), Utils.rand(3) + 5);
                        cockAmountThickened += CockModifier.thickenCock(player.lowerBody.cockSpot.get(index), 1.5);
                    }
                    cockAmountLengthened /= player.lowerBody.cockSpot.count();
                    cockAmountThickened /= player.lowerBody.cockSpot.count();

                    CreatureChange.lengthChange(player, cockAmountLengthened, player.lowerBody.cockSpot.count());
                    //Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.", false);
                        else MainScreen.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.", false);
                    }
                    if (cockAmountThickened <= .5) {
                        if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.", false);
                        else MainScreen.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.", false);
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.", false);
                        if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.", false);
                    }
                    player.stats.lib += 1;
                    player.stats.sens += 1;
                    player.stats.lust += 20;
                }
                //SINGLEZ
                if (player.lowerBody.cockSpot.count() == 1) {
                    MainScreen.text("\n\nYour " + CockDescriptor.describeMultiCockShort(player) + " fills to its normal size... and begins growing...", false);
                    cockAmountThickened = CockModifier.thickenCock(player.lowerBody.cockSpot.get(0), 1.5);
                    cockAmountLengthened = CockModifier.growCock(player, player.lowerBody.cockSpot.get(0), Utils.rand(3) + 5);
                    CreatureChange.lengthChange(player, cockAmountLengthened, 1);
                    //Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.", false);
                        else MainScreen.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.", false);
                    }
                    if (cockAmountThickened <= .5) {
                        if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.", false);
                        else MainScreen.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.", false);
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.", false);
                        if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("  Your " + CockDescriptor.describeMultiCockShort(player) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.", false);
                    }
                    player.stats.lib += 1;
                    player.stats.sens += 1;
                    player.stats.lust += 20;
                }

            }
        }
        if (Utils.rand(3) == 0) {
            if (this.large) MainScreen.text(player.modFem(0, 8), false);
            else MainScreen.text(player.modFem(5, 3), false);
        }
    }

    //Nipplezzzzz
    private whiteEgg(player: Player): void {
        let gainedNippleCunts: boolean = false;
        MainScreen.text("You devour the egg, momentarily sating your hunger.", true);
        if (!this.large) {
            //Grow nipples
            if (player.upperBody.chest.BreastRatingLargest[0].nippleLength < 3 && player.upperBody.chest.BreastRatingLargest[0].breastRating > 0) {
                MainScreen.text("\n\nYour nipples engorge, prodding hard against the inside of your " + player.inventory.armor.displayName + ".  Abruptly you realize they've gotten almost a quarter inch longer.", false);
                player.upperBody.chest.BreastRatingLargest[0].nippleLength += .2;
                player.stats.lust += 15;
            }
        }
        //LARGE
        else {
            //Grow nipples
            if (player.upperBody.chest.BreastRatingLargest[0].nippleLength < 3 && player.upperBody.chest.BreastRatingLargest[0].breastRating > 0) {
                MainScreen.text("\n\nYour nipples engorge, prodding hard against the inside of your " + player.inventory.armor.displayName + ".  Abruptly you realize they've grown more than an additional quarter-inch.", false);
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
                MainScreen.text("\n\nYour " + BreastDescriptor.describeAllBreasts(player) + " tingle with warmth that slowly migrates to your nipples, filling them with warmth.  You pant and moan, rubbing them with your fingers.  A trickle of wetness suddenly coats your finger as it slips inside the nipple.  Shocked, you pull the finger free.  <b>You now have fuckable nipples!</b>", false);
        }
    }

    private blackRubberEgg(player: Player): void {
        MainScreen.text("You devour the egg, momentarily sating your hunger.", true);
        //Small
        if (!this.large) {
            //Change skin to normal if not flawless!
            if ((player.skinAdj != "smooth" && player.skinAdj != "latex" && player.skinAdj != "rubber") || player.skinDesc != "skin") {
                MainScreen.text("\n\nYour " + player.skinDesc + " tingles delightfully as it ", false);
                if (player.skinType == SkinType.PLAIN) MainScreen.text(" loses its blemishes, becoming flawless smooth skin.", false);
                if (player.skinType == SkinType.FUR) MainScreen.text(" falls out in clumps, revealing smooth skin underneath.", false);
                if (player.skinType == SkinType.SCALES) MainScreen.text(" begins dropping to the ground in a pile around you, revealing smooth skin underneath.", false);
                if (player.skinType > SkinType.SCALES) MainScreen.text(" shifts and changes into flawless smooth skin.", false);
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
                        MainScreen.text("\n\nYour scalp tingles and your " + HeadDescriptor.describeHair(player) + " thickens, the stUtils.Utils.rands merging into ", false);
                        MainScreen.text(" thick rubbery hair.", false);
                        player.upperBody.head.hairColor = "rubbery " + player.upperBody.head.hairColor;
                        player.stats.cor += 2;
                    }
                    if (player.skinDesc == "skin" && player.skinAdj == "latex") {
                        MainScreen.text("\n\nYour scalp tingles and your " + HeadDescriptor.describeHair(player) + " thickens, the stUtils.Utils.rands merging into ", false);
                        MainScreen.text(" shiny latex hair.", false);
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
                MainScreen.text("\n\nYour already flawless smooth skin begins to tingle as it changes again.  It becomes shinier as its texture changes subtly.  You gasp as you touch yourself and realize your skin has become ", false);
                if (Utils.rand(2) == 0) {
                    player.skinDesc = "skin";
                    player.skinAdj = "latex";
                    MainScreen.text("a layer of pure latex.  ", false);
                }
                else {
                    player.skinDesc = "skin";
                    player.skinAdj = "rubber";
                    MainScreen.text("a layer of sensitive rubber.  ", false);
                }
                Flags.list[FlagEnum.PC_KNOWS_ABOUT_BLACK_EGGS] = 1;
                if (player.stats.cor < 66) MainScreen.text("You feel like some kind of freak.", false);
                else MainScreen.text("You feel like some kind of sexy " + player.skinDesc + " love-doll.", false);
                player.stats.spe -= 3;
                player.stats.sens += 8;
                player.stats.lust += 10;
                player.stats.cor += 2;
            }
            //Change skin to normal if not flawless!
            if ((player.skinAdj != "smooth" && player.skinAdj != "latex" && player.skinAdj != "rubber") || player.skinDesc != "skin") {
                MainScreen.text("\n\nYour " + player.skinDesc + " tingles delightfully as it ", false);
                if (player.skinType == SkinType.PLAIN) MainScreen.text(" loses its blemishes, becoming flawless smooth skin.", false);
                if (player.skinType == SkinType.FUR) MainScreen.text(" falls out in clumps, revealing smooth skin underneath.", false);
                if (player.skinType == SkinType.SCALES) MainScreen.text(" begins dropping to the ground in a pile around you, revealing smooth skin underneath.", false);
                if (player.skinType > SkinType.SCALES) MainScreen.text(" shifts and changes into flawless smooth skin.", false);
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
                        MainScreen.text("\n\nYour scalp tingles and your " + HeadDescriptor.describeHair(player) + " thickens, the stUtils.Utils.rands merging into ", false);
                        MainScreen.text(" thick rubbery hair.", false);
                        player.upperBody.head.hairColor = "rubbery " + player.upperBody.head.hairColor;
                        player.stats.cor += 2;
                    }
                    if (player.skinAdj == "latex" && player.skinDesc == "skin") {
                        MainScreen.text("\n\nYour scalp tingles and your " + HeadDescriptor.describeHair(player) + " thickens, the stUtils.Utils.rands merging into ", false);
                        MainScreen.text(" shiny latex hair.", false);
                        player.upperBody.head.hairColor = "latex-textured " + player.upperBody.head.hairColor;
                        player.stats.cor += 2;
                    }
                }
            }
        }
    }

}
