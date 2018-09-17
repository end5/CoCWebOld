import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { BreastRow } from '../../Body/BreastRow';
import { SkinType } from '../../Body/Skin';
import { Character } from '../../Character/Character';
import { PlayerFlags } from '../../Character/Player/PlayerFlags';
import { Desc } from '../../Descriptors/Descriptors';
import { Mod } from '../../Modifiers/Modifiers';
import { User } from '../../User';
import { ItemDesc } from '../ItemDesc';

export enum EggType {
    Black,
    Blue,
    Brown,
    Pink,
    Purple,
    White
}

export class Eggs extends Consumable {
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

    public use(character: Character) {
        switch (this.eggType) {
            case EggType.Black:
                this.blackRubberEgg(character);
                break;
            case EggType.Blue:
                this.blueEgg(character);
                break;
            case EggType.Brown:
                this.brownEgg(character);
                break;
            case EggType.Pink:
                this.pinkEgg(character);
                break;
            case EggType.Purple:
                this.purpleEgg(character);
                break;
            default:
            case EggType.White:
                this.whiteEgg(character);
                break;
        }
    }

    // butt expansion
    private brownEgg(character: Character): void {
        DisplayText().clear();
        DisplayText("You devour the egg, momentarily sating your hunger.\n\n");
        if (!this.large) {
            DisplayText("You feel a bit of additional weight on your backside as your " + Desc.Butt.describeButt(character) + " gains a bit more padding.");
            character.torso.butt.rating++;
        }
        else {
            DisplayText("Your " + Desc.Butt.describeButt(character) + " wobbles, nearly throwing you off balance as it grows much bigger!");
            character.torso.butt.rating += 2 + randInt(3);
        }
        if (randInt(3) === 0) {
            if (this.large)
                DisplayText(Mod.Body.displayModThickness(character, 100, 8));
            else
                DisplayText(Mod.Body.displayModThickness(character, 95, 3));
        }
    }

    // hip expansion
    private purpleEgg(character: Character): void {
        DisplayText().clear();
        DisplayText("You devour the egg, momentarily sating your hunger.\n\n");
        if (!this.large || character.torso.hips.rating > 20) {
            DisplayText("You stumble as you feel your " + Desc.Hip.describeHips(character) + " widen, altering your gait slightly.");
            character.torso.hips.rating++;
        }
        else {
            DisplayText("You stagger wildly as your hips spread apart, widening by inches.  When the transformation finishes you feel as if you have to learn to walk all over again.");
            character.torso.hips.rating += 2 + randInt(2);
        }
        if (randInt(3) === 0) {
            if (this.large)
                DisplayText(Mod.Body.displayModThickness(character, 80, 8));
            else
                DisplayText(Mod.Body.displayModThickness(character, 80, 3));
        }
    }

    // Femminess
    private pinkEgg(character: Character): void {
        DisplayText().clear();
        DisplayText("You devour the egg, momentarily sating your hunger.\n\n");
        if (!this.large) {
            // Remove a dick
            if (character.torso.cocks.count > 0) {
                character.torso.cocks.remove(0);
                DisplayText("\n\n");
                character.updateGender();
            }
            // remove balls
            if (character.torso.balls.quantity > 0) {
                if (character.torso.balls.size > 15) {
                    character.torso.balls.size -= 8;
                    DisplayText("Your scrotum slowly shrinks, settling down at a MUCH smaller size.  <b>Your " + Desc.Balls.describeBalls(true, true, character) + " are much smaller.</b>\n\n");
                }
                else {
                    character.torso.balls.quantity = 0;
                    character.torso.balls.size = 1;
                    DisplayText("Your scrotum slowly shrinks, eventually disappearing entirely!  <b>You've lost your balls!</b>\n\n");
                }
            }
            // Fertility boost
            if (character.torso.vaginas.count > 0 && character.fertility < 40) {
                DisplayText("You feel a tingle deep inside your body, just above your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ", as if you were becoming more fertile.\n\n");
                character.fertility += 5;
            }
        }
        // LARGE
        else {
            // Remove a dick
            if (character.torso.cocks.count > 0) {
                Mod.Cock.displayKillCocks(character, -1);
                DisplayText("\n\n");
                character.updateGender();
            }
            if (character.torso.balls.quantity > 0) {
                character.torso.balls.quantity = 0;
                character.torso.balls.size = 1;
                DisplayText("Your scrotum slowly shrinks, eventually disappearing entirely!  <b>You've lost your balls!</b>\n\n");
            }
            // Fertility boost
            if (character.torso.vaginas.count > 0 && character.fertility < 70) {
                DisplayText("You feel a powerful tingle deep inside your body, just above your " + Desc.Vagina.describeVagina(character, character.torso.vaginas.get(0)) + ". Instinctively you know you have become more fertile.\n\n");
                character.fertility += 10;
            }
        }
        if (randInt(3) === 0) {
            if (this.large) DisplayText(Mod.Body.displayModFem(character, 100, 8));
            else DisplayText(Mod.Body.displayModFem(character, 95, 3));
        }
    }

    // Maleness
    private blueEgg(character: Character): void {
        let cockAmountLengthened: number = 0;
        let cockAmountThickened: number = 0;
        DisplayText().clear();
        DisplayText("You devour the egg, momentarily sating your hunger.");
        if (!this.large) {
            // Kill pussies!
            if (character.torso.vaginas.count > 0) {
                DisplayText("\n\nYour vagina clenches in pain, doubling you over.  You slip a hand down to check on it, only to feel the slit growing smaller and smaller until it disappears, taking your clit with it! <b> Your vagina is gone!</b>");
                character.torso.vaginas.remove(0);
                // -- Don't understand this
                // character.torso.vaginaSpot.get(0).clitLength = .5;
                character.updateGender();
            }
            // Dickz
            if (character.torso.cocks.count > 0) {
                // Multiz
                if (character.torso.cocks.count > 1) {
                    DisplayText("\n\nYour " + Desc.Cock.describeMultiCock(character) + " fill to full-size... and begin growing obscenely.");

                    for (const cock of character.torso.cocks) {
                        cockAmountLengthened += Mod.Cock.growCock(character, cock, randInt(3) + 2);
                        cockAmountThickened += Mod.Cock.thickenCock(cock, 1);
                    }
                    cockAmountLengthened /= character.torso.cocks.count;
                    cockAmountThickened /= character.torso.cocks.count;

                    Mod.Cock.displayLengthChange(character, cockAmountLengthened, character.torso.cocks.count);

                    // Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (character.torso.cocks.count === 1) DisplayText("\n\nYour " + Desc.Cock.describeMultiCockShort(character) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                        else DisplayText("\n\nYour " + Desc.Cock.describeMultiCockShort(character) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                    }
                    if (cockAmountThickened <= .5) {
                        if (character.torso.cocks.count > 1) DisplayText("\n\nYour " + Desc.Cock.describeMultiCockShort(character) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                        else DisplayText("\n\nYour " + Desc.Cock.describeMultiCockShort(character) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (character.torso.cocks.count === 1) DisplayText("\n\nYour " + Desc.Cock.describeMultiCockShort(character) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                        if (character.torso.cocks.count > 1) DisplayText("\n\nYour " + Desc.Cock.describeMultiCockShort(character) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                    }
                    character.stats.lib += 1;
                    character.stats.sens += 1;
                    character.stats.lust += 20;
                }
                // SINGLEZ
                if (character.torso.cocks.count === 1) {
                    DisplayText("\n\nYour " + Desc.Cock.describeMultiCockShort(character) + " fills to its normal size... and begins growing... ");
                    cockAmountThickened = Mod.Cock.thickenCock(character.torso.cocks.get(0), 1);
                    cockAmountLengthened = Mod.Cock.growCock(character, character.torso.cocks.get(0), randInt(3) + 2);
                    Mod.Cock.displayLengthChange(character, cockAmountLengthened, 1);
                    // Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (character.torso.cocks.count === 1) DisplayText("  Your " + Desc.Cock.describeMultiCockShort(character) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                        else DisplayText("  Your " + Desc.Cock.describeMultiCockShort(character) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                    }
                    if (cockAmountThickened <= .5) {
                        if (character.torso.cocks.count > 1) DisplayText("  Your " + Desc.Cock.describeMultiCockShort(character) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                        else DisplayText("  Your " + Desc.Cock.describeMultiCockShort(character) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (character.torso.cocks.count === 1) DisplayText("  Your " + Desc.Cock.describeMultiCockShort(character) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                        if (character.torso.cocks.count > 1) DisplayText("  Your " + Desc.Cock.describeMultiCockShort(character) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                    }
                    character.stats.lib += 1;
                    character.stats.sens += 1;
                    character.stats.lust += 20;
                }

            }
        }
        // LARGE
        else {
            // New lines if changes
            if (character.torso.chest.count > 1 || character.torso.butt.rating > 5 || character.torso.hips.rating > 5 || character.torso.vaginas.count > 0)
                DisplayText("\n\n");
            // Kill pussies!
            if (character.torso.vaginas.count > 0) {
                DisplayText("Your vagina clenches in pain, doubling you over.  You slip a hand down to check on it, only to feel the slit growing smaller and smaller until it disappears, taking your clit with it!\n\n");
                if (character.torso.chest.count > 1 || character.torso.butt.rating > 5 || character.torso.hips.rating > 5)
                    DisplayText("  ");
                character.torso.vaginas.remove(0);
                // -- Don't understand this
                // character.torso.vaginaSpot.get(0).clitLength = .5;
                character.updateGender();
            }
            // Kill extra boobages
            if (character.torso.chest.count > 1) {
                DisplayText("Your back relaxes as extra weight vanishes from your chest.  <b>Your lowest " + Desc.Breast.describeBreastRow(character.torso.chest.get(character.torso.chest.count - 1)) + " have vanished.</b>");
                if (character.torso.butt.rating > 5 || character.torso.hips.rating > 5) DisplayText("  ");
                // Remove lowest row.
                character.torso.chest.remove(character.torso.chest.count - 1);
            }
            // Ass/hips shrinkage!
            if (character.torso.butt.rating > 5) {
                DisplayText("Muscles firm and tone as you feel your " + Desc.Butt.describeButt(character) + " become smaller and tighter.");
                if (character.torso.hips.rating > 5) DisplayText("  ");
                character.torso.butt.rating -= 2;
            }
            if (character.torso.hips.rating > 5) {
                DisplayText("Feeling the sudden burning of lactic acid in your " + Desc.Hip.describeHips(character) + ", you realize they have slimmed down and firmed up some.");
                character.torso.hips.rating -= 2;
            }
            // Shrink tits!
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) {
                Mod.Breast.shrinkTits(character);
            }
            if (character.torso.cocks.count > 0) {
                // Multiz
                if (character.torso.cocks.count > 1) {
                    DisplayText("\n\nYour " + Desc.Cock.describeMultiCock(character) + " fill to full-size... and begin growing obscenely.  ");
                    for (const cock of character.torso.cocks) {
                        cockAmountLengthened += Mod.Cock.growCock(character, cock, randInt(3) + 5);
                        cockAmountThickened += Mod.Cock.thickenCock(cock, 1.5);
                    }
                    cockAmountLengthened /= character.torso.cocks.count;
                    cockAmountThickened /= character.torso.cocks.count;

                    Mod.Cock.displayLengthChange(character, cockAmountLengthened, character.torso.cocks.count);
                    // Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (character.torso.cocks.count === 1) DisplayText("\n\nYour " + Desc.Cock.describeMultiCockShort(character) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                        else DisplayText("\n\nYour " + Desc.Cock.describeMultiCockShort(character) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                    }
                    if (cockAmountThickened <= .5) {
                        if (character.torso.cocks.count > 1) DisplayText("\n\nYour " + Desc.Cock.describeMultiCockShort(character) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                        else DisplayText("\n\nYour " + Desc.Cock.describeMultiCockShort(character) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (character.torso.cocks.count === 1) DisplayText("\n\nYour " + Desc.Cock.describeMultiCockShort(character) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                        if (character.torso.cocks.count > 1) DisplayText("\n\nYour " + Desc.Cock.describeMultiCockShort(character) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                    }
                    character.stats.lib += 1;
                    character.stats.sens += 1;
                    character.stats.lust += 20;
                }
                // SINGLEZ
                if (character.torso.cocks.count === 1) {
                    DisplayText("\n\nYour " + Desc.Cock.describeMultiCockShort(character) + " fills to its normal size... and begins growing...");
                    cockAmountThickened = Mod.Cock.thickenCock(character.torso.cocks.get(0), 1.5);
                    cockAmountLengthened = Mod.Cock.growCock(character, character.torso.cocks.get(0), randInt(3) + 5);
                    Mod.Cock.displayLengthChange(character, cockAmountLengthened, 1);
                    // Display the degree of thickness change.
                    if (cockAmountThickened >= 1) {
                        if (character.torso.cocks.count === 1) DisplayText("  Your " + Desc.Cock.describeMultiCockShort(character) + " spreads rapidly, swelling an inch or more in girth, making it feel fat and floppy.");
                        else DisplayText("  Your " + Desc.Cock.describeMultiCockShort(character) + " spread rapidly, swelling as they grow an inch or more in girth, making them feel fat and floppy.");
                    }
                    if (cockAmountThickened <= .5) {
                        if (character.torso.cocks.count > 1) DisplayText("  Your " + Desc.Cock.describeMultiCockShort(character) + " feel swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. They are definitely thicker.");
                        else DisplayText("  Your " + Desc.Cock.describeMultiCockShort(character) + " feels swollen and heavy. With a firm, but gentle, squeeze, you confirm your suspicions. It is definitely thicker.");
                    }
                    if (cockAmountThickened > .5 && cockAmountLengthened < 1) {
                        if (character.torso.cocks.count === 1) DisplayText("  Your " + Desc.Cock.describeMultiCockShort(character) + " seems to swell up, feeling heavier. You look down and watch it growing fatter as it thickens.");
                        if (character.torso.cocks.count > 1) DisplayText("  Your " + Desc.Cock.describeMultiCockShort(character) + " seem to swell up, feeling heavier. You look down and watch them growing fatter as they thicken.");
                    }
                    character.stats.lib += 1;
                    character.stats.sens += 1;
                    character.stats.lust += 20;
                }

            }
        }
        if (randInt(3) === 0) {
            if (this.large) DisplayText(Mod.Body.displayModFem(character, 0, 8));
            else DisplayText(Mod.Body.displayModFem(character, 5, 3));
        }
    }

    // Nipplezzzzz
    private whiteEgg(character: Character): void {
        let gainedNippleCunts: boolean = false;
        DisplayText().clear();
        DisplayText("You devour the egg, momentarily sating your hunger.");
        if (!this.large) {
            // Grow nipples
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length < 3 && character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) {
                DisplayText("\n\nYour nipples engorge, prodding hard against the inside of your " + character.inventory.equipment.armor.displayName + ".  Abruptly you realize they've gotten almost a quarter inch longer.");
                character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length += .2;
                character.stats.lust += 15;
            }
        }
        // LARGE
        else {
            // Grow nipples
            if (character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length < 3 && character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) {
                DisplayText("\n\nYour nipples engorge, prodding hard against the inside of your " + character.inventory.equipment.armor.displayName + ".  Abruptly you realize they've grown more than an additional quarter-inch.");
                character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length += (randInt(2) + 3) / 10;
                character.stats.lust += 15;
            }
            // NIPPLECUNTZZZ
            // Set nipplecunts on every row.
            for (const breastRow of character.torso.chest) {
                if (!breastRow.nipples.fuckable && breastRow.nipples.length >= 2) {
                    breastRow.nipples.fuckable = true;
                    // Keep track of changes.
                    gainedNippleCunts = true;
                }
            }
            // Talk about if anything was changed.
            if (gainedNippleCunts)
                DisplayText("\n\nYour " + Desc.Breast.describeAllBreasts(character) + " tingle with warmth that slowly migrates to your nipples, filling them with warmth.  You pant and moan, rubbing them with your fingers.  A trickle of wetness suddenly coats your finger as it slips inside the nipple.  Shocked, you pull the finger free.  <b>You now have fuckable nipples!</b>");
        }
    }

    private blackRubberEgg(character: Character): void {
        DisplayText().clear();
        DisplayText("You devour the egg, momentarily sating your hunger.");
        // Small
        if (!this.large) {
            // Change skin to normal if not flawless!
            if ((character.skin.adj !== "smooth" && character.skin.adj !== "latex" && character.skin.adj !== "rubber") || character.skin.desc !== "skin") {
                DisplayText("\n\nYour " + character.skin.desc + " tingles delightfully as it ");
                if (character.skin.type === SkinType.PLAIN) DisplayText(" loses its blemishes, becoming flawless smooth skin.");
                if (character.skin.type === SkinType.FUR) DisplayText(" falls out in clumps, revealing smooth skin underneath.");
                if (character.skin.type === SkinType.SCALES) DisplayText(" begins dropping to the ground in a pile around you, revealing smooth skin underneath.");
                if (character.skin.type > SkinType.SCALES) DisplayText(" shifts and changes into flawless smooth skin.");
                character.skin.desc = "skin";
                character.skin.adj = "smooth";
                if (character.skin.tone === "rough gray") character.skin.tone = "gray";
                character.skin.type = SkinType.PLAIN;
            }
            // chance of hair change
            else {
                // If hair isn't rubbery/latex yet
                if (character.torso.neck.head.hair.color.indexOf("rubbery") === -1 && character.torso.neck.head.hair.color.indexOf("latex-textured") && character.torso.neck.head.hair.length !== 0) {
                    // if skin is already one...
                    if (character.skin.desc === "skin" && character.skin.adj === "rubber") {
                        DisplayText("\n\nYour scalp tingles and your " + Desc.Head.describeHair(character) + " thickens, the strands merging into ");
                        DisplayText(" thick rubbery hair.");
                        character.torso.neck.head.hair.color = "rubbery " + character.torso.neck.head.hair.color;
                        character.stats.cor += 2;
                    }
                    if (character.skin.desc === "skin" && character.skin.adj === "latex") {
                        DisplayText("\n\nYour scalp tingles and your " + Desc.Head.describeHair(character) + " thickens, the strands merging into ");
                        DisplayText(" shiny latex hair.");
                        character.torso.neck.head.hair.color = "latex-textured " + character.torso.neck.head.hair.color;
                        character.stats.cor += 2;
                    }
                }
            }
        }
        // Large
        else {
            // Change skin to latex if smooth.
            if (character.skin.desc === "skin" && character.skin.adj === "smooth") {
                DisplayText("\n\nYour already flawless smooth skin begins to tingle as it changes again.  It becomes shinier as its texture changes subtly.  You gasp as you touch yourself and realize your skin has become ");
                if (randInt(2) === 0) {
                    character.skin.desc = "skin";
                    character.skin.adj = "latex";
                    DisplayText("a layer of pure latex.  ");
                }
                else {
                    character.skin.desc = "skin";
                    character.skin.adj = "rubber";
                    DisplayText("a layer of sensitive rubber.  ");
                }
                (User.flags.get("Player") as PlayerFlags).PC_KNOWS_ABOUT_BLACK_EGGS = 1;
                if (character.stats.cor < 66) DisplayText("You feel like some kind of freak.");
                else DisplayText("You feel like some kind of sexy " + character.skin.desc + " love-doll.");
                character.stats.spe -= 3;
                character.stats.sens += 8;
                character.stats.lust += 10;
                character.stats.cor += 2;
            }
            // Change skin to normal if not flawless!
            if ((character.skin.adj !== "smooth" && character.skin.adj !== "latex" && character.skin.adj !== "rubber") || character.skin.desc !== "skin") {
                DisplayText("\n\nYour " + character.skin.desc + " tingles delightfully as it ");
                if (character.skin.type === SkinType.PLAIN) DisplayText(" loses its blemishes, becoming flawless smooth skin.");
                if (character.skin.type === SkinType.FUR) DisplayText(" falls out in clumps, revealing smooth skin underneath.");
                if (character.skin.type === SkinType.SCALES) DisplayText(" begins dropping to the ground in a pile around you, revealing smooth skin underneath.");
                if (character.skin.type > SkinType.SCALES) DisplayText(" shifts and changes into flawless smooth skin.");
                character.skin.desc = "skin";
                character.skin.adj = "smooth";
                if (character.skin.tone === "rough gray") character.skin.tone = "gray";
                character.skin.type = SkinType.PLAIN;
            }
            // chance of hair change
            else {
                // If hair isn't rubbery/latex yet
                if (character.torso.neck.head.hair.color.indexOf("rubbery") === -1 && character.torso.neck.head.hair.color.indexOf("latex-textured") && character.torso.neck.head.hair.length !== 0) {
                    // if skin is already one...
                    if (character.skin.adj === "rubber" && character.skin.desc === "skin") {
                        DisplayText("\n\nYour scalp tingles and your " + Desc.Head.describeHair(character) + " thickens, the strands merging into ");
                        DisplayText(" thick rubbery hair.");
                        character.torso.neck.head.hair.color = "rubbery " + character.torso.neck.head.hair.color;
                        character.stats.cor += 2;
                    }
                    if (character.skin.adj === "latex" && character.skin.desc === "skin") {
                        DisplayText("\n\nYour scalp tingles and your " + Desc.Head.describeHair(character) + " thickens, the strands merging into ");
                        DisplayText(" shiny latex hair.");
                        character.torso.neck.head.hair.color = "latex-textured " + character.torso.neck.head.hair.color;
                        character.stats.cor += 2;
                    }
                }
            }
        }
    }
}
