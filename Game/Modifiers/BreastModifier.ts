import { DisplayText } from '../../Engine/display/DisplayText';
import { randInt } from '../../Engine/Utilities/SMath';
import { BreastRow } from '../Body/BreastRow';
import { Character } from '../Character/Character';
import { PerkType } from '../Effects/PerkType';
import { StatusEffectType } from '../Effects/StatusEffectType';
import { User } from '../User';
import { breastCup, describeBreastRow } from '../Descriptors/BreastDescriptor';

export function growSmallestBreastRow(character: Character, amount: number, rowsGrown: number, display: boolean) {
    const chest = character.body.chest;
    if (chest.length === 0)
        return;

    // Chance for "big tits" perked characters to grow larger!
    if (character.perks.has(PerkType.BigTits) && randInt(3) === 0 && amount < 1)
        amount = 1;
    // Select smallest breast, grow it, move on
    while (rowsGrown > 0) {
        let growthAmount: number = amount;
        const smallestBreastRow = chest.sort(BreastRow.Smallest)[0];
        if (!User.settings.hyperHappy) {
            // Diminishing returns!
            if (character.perks.has(PerkType.BigTits)) {
                growthAmount /= smallestBreastRow.rating > 3 ? 1.3 : 1.5;
                growthAmount /= smallestBreastRow.rating > 7 ? 1.5 : 2;
                growthAmount /= smallestBreastRow.rating > 9 ? 1.5 : 2;
                growthAmount /= smallestBreastRow.rating > 12 ? 1.5 : 2;
            }
        }
        smallestBreastRow.rating += growthAmount;
        rowsGrown--;
    }
}

export function growTopBreastRowDownwards(character: Character, amount: number, rowsGrown: number, display: boolean) {
    const chest = character.body.chest;
    if (chest.length === 0)
        return;

    if (character.perks.has(PerkType.BigTits) && randInt(3) === 0 && amount < 1)
        amount = 1;

    if (!User.settings.hyperHappy) {
        const topBreastRow: number = chest.get(0).rating;

        // Diminishing returns!
        if (character.perks.has(PerkType.BigTits)) {
            amount /= topBreastRow > 3 ? 1.3 : 1.5;
            amount /= topBreastRow > 7 ? 1.5 : 2;
            amount /= topBreastRow > 9 ? 1.5 : 2;
            amount /= topBreastRow > 12 ? 1.5 : 2;
        }
    }

    let breastIndex: number = 0;
    // Start at top and keep growing down, back to top if hit bottom before done.
    while (rowsGrown > 0) {
        if (breastIndex + 1 > chest.length)
            breastIndex = 0;
        chest.get(breastIndex).rating += amount;
        breastIndex++;
        rowsGrown--;
    }
}

export function growTopBreastRow(character: Character, amount: number, rowsGrown: number, display: boolean) {
    const chest = character.body.chest;
    if (chest.length === 0)
        return;

    if (character.perks.has(PerkType.BigTits) && randInt(3) === 0 && amount < 1)
        amount = 1;

    if (!User.settings.hyperHappy) {
        const topBreastRow: number = chest.get(0).rating;

        // Diminishing returns!
        if (character.perks.has(PerkType.BigTits)) {
            amount /= topBreastRow > 3 ? 1.3 : 1.5;
            amount /= topBreastRow > 7 ? 1.5 : 2;
            amount /= topBreastRow > 9 ? 1.5 : 2;
            amount /= topBreastRow > 12 ? 1.5 : 2;
        }
    }

    while (rowsGrown > 0) {
        rowsGrown--;
        chest.get(0).rating += amount;
    }
}

/**
 * Note: Only here as reference to the old function
 * GrowthType 1 = smallest grows - growSmallestBreastRow
 * GrowthType 2 = Top Row working downward - growTopBreastRowDownwards
 * GrowthType 3 = Only top row - growTopBreastRow
 * @param character
 * @param amount
 * @param rowsGrown
 * @param display
 * @param growthType
 */
export function growTits(character: Character, amount: number, rowsGrown: number, growthType: number): void {
}

export function shrinkTits(character: Character, ignoreHyperHappy: boolean = false): void {
    if (User.settings.hyperHappy && !ignoreHyperHappy) {
        return;
    }
    if (character.body.chest.length === 1) {
        const topRow: BreastRow = character.body.chest.get(0);
        if (topRow.rating > 0) {
            // Shrink if bigger than N/A cups
            let superShrink: boolean = false;
            topRow.rating--;
            // Shrink again 50% chance
            if (topRow.rating >= 1 && randInt(100 / 2) && !character.perks.has(PerkType.BigTits)) {
                superShrink = true;
                topRow.rating--;
            }
            if (topRow.rating < 0) topRow.rating = 0;
            // Talk about shrinkage
            if (!superShrink) DisplayText("\n\nYou feel a weight lifted from you, and realize your breasts have shrunk!  With a quick measure, you determine they're now " + breastCup(topRow.rating) + "s.");
            if (superShrink) DisplayText("\n\nYou feel significantly lighter.  Looking down, you realize your breasts are much smaller!  With a quick measure, you determine they're now " + breastCup(topRow.rating) + "s.");
        }
    }
    else if (character.body.chest.length > 1) {
        // multiple
        DisplayText("\n");
        // temp2 = amount changed
        // temp3 = counter
        let shrinkAmount: number = 0;
        let breastRowIndex: number = character.body.chest.length;
        while (breastRowIndex > 0) {
            breastRowIndex--;
            if (character.body.chest.get(breastRowIndex).rating > 0) {
                character.body.chest.get(breastRowIndex).rating--;
                if (character.body.chest.get(breastRowIndex).rating < 0) character.body.chest.get(breastRowIndex).rating = 0;
                shrinkAmount++;
                DisplayText("\n");
                if (breastRowIndex < character.body.chest.length - 1) DisplayText("...and y");
                else DisplayText("Y");
                DisplayText("our " + describeBreastRow(character.body.chest.get(breastRowIndex)) + " shrink, dropping to " + breastCup(character.body.chest.get(breastRowIndex).rating) + "s.");
            }
            if (character.body.chest.get(breastRowIndex).rating < 0) character.body.chest.get(breastRowIndex).rating = 0;
        }
        if (shrinkAmount === 2) DisplayText("\nYou feel so much lighter after the change.");
        if (shrinkAmount === 3) DisplayText("\nWithout the extra weight you feel particularly limber.");
        if (shrinkAmount >= 4) DisplayText("\nIt feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.");
    }
}

// TODO: Fix this function
export function boostLactation(character: Character, boostAmt: number): number {
    if (character.body.chest.length <= 0)
        return 0;
    let breasts: BreastRow;
    let changes: number = 0;
    let temp2: number = 0;
    // Prevent lactation decrease if lactating.
    if (boostAmt >= 0) {
        if (character.effects.has(StatusEffectType.LactationReduction))
            character.effects.get(StatusEffectType.LactationReduction).value1 = 0;
        if (character.effects.has(StatusEffectType.LactationReduc0))
            character.effects.remove(StatusEffectType.LactationReduc0);
        if (character.effects.has(StatusEffectType.LactationReduc1))
            character.effects.remove(StatusEffectType.LactationReduc1);
        if (character.effects.has(StatusEffectType.LactationReduc2))
            character.effects.remove(StatusEffectType.LactationReduc2);
        if (character.effects.has(StatusEffectType.LactationReduc3))
            character.effects.remove(StatusEffectType.LactationReduc3);
    }
    if (boostAmt > 0) {
        while (boostAmt > 0) {
            breasts = character.body.chest.sort(BreastRow.Largest)[0];
            boostAmt -= .1;
            temp2 = .1;
            if (breasts.lactationMultiplier > 1.5)
                temp2 /= 2;
            if (breasts.lactationMultiplier > 2.5)
                temp2 /= 2;
            if (breasts.lactationMultiplier > 3)
                temp2 /= 2;
            changes += temp2;
            breasts.lactationMultiplier += temp2;
        }
    }
    else {
        while (boostAmt < 0) {
            if (boostAmt > -.1) {
                breasts = character.body.chest.sort(BreastRow.LactationLeast)[0];
                // trace(biggestLactation());
                breasts.lactationMultiplier += boostAmt;
                if (breasts.lactationMultiplier < 0)
                    breasts.lactationMultiplier = 0;
                boostAmt = 0;
            }
            else {
                boostAmt += .1;
                breasts = character.body.chest.sort(BreastRow.LactationLeast)[0];
                temp2 = boostAmt;
                changes += temp2;
                breasts.lactationMultiplier += temp2;
                if (breasts.lactationMultiplier < 0)
                    breasts.lactationMultiplier = 0;
            }
        }
    }
    return changes;
}
