import BreastRow from '../Body/BreastRow';
import Creature from '../Body/Creature';
import Character from '../Character/Character';
import BreastDescriptor from '../Descriptors/BreastDescriptor';
import DisplayText from '../display/DisplayText';
import { PerkType } from '../Effects/PerkType';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../Game/Flags';
import Utils from '../Utilities/Utils';

export default class BreastModifier {
    public static growSmallestBreastRow(body: Creature, amount: number, rowsGrown: number, display: boolean) {
        let chest = body.upperBody.chest;
        if (chest.count() == 0)
            return;

        //Chance for "big tits" perked characters to grow larger!
        if (body.perks.has(PerkType.BigTits) && Utils.chance(33) && amount < 1)
            amount = 1;
        //Select smallest breast, grow it, move on
        while (rowsGrown > 0) {
            let growthAmount: number = amount;
            if (!Flags.list[FlagEnum.HYPER_HAPPY]) {
                let smallestBreastRating: number = chest.BreastRatingSmallest[0].breastRating;

                //Diminishing returns!
                if (body.perks.has(PerkType.BigTits)) {
                    growthAmount /= smallestBreastRating > 3 ? 1.3 : 1.5;
                    growthAmount /= smallestBreastRating > 7 ? 1.5 : 2;
                    growthAmount /= smallestBreastRating > 9 ? 1.5 : 2;
                    growthAmount /= smallestBreastRating > 12 ? 1.5 : 2;
                }
            }

            chest.BreastRatingSmallest[0].breastRating += growthAmount;
            rowsGrown--;
        }
    }

    public static growTopBreastRowDownwards(body: Creature, amount: number, rowsGrown: number, display: boolean) {
        let chest = body.upperBody.chest;
        if (chest.count() == 0)
            return;

        if (body.perks.has(PerkType.BigTits) && Utils.chance(33) && amount < 1)
            amount = 1;

        if (!Flags.list[FlagEnum.HYPER_HAPPY]) {
            let topBreastRow: number = chest.get(0).breastRating;

            //Diminishing returns!
            if (body.perks.has(PerkType.BigTits)) {
                amount /= topBreastRow > 3 ? 1.3 : 1.5;
                amount /= topBreastRow > 7 ? 1.5 : 2;
                amount /= topBreastRow > 9 ? 1.5 : 2;
                amount /= topBreastRow > 12 ? 1.5 : 2;
            }
        }

        let breastIndex: number = 0;
        //Start at top and keep growing down, back to top if hit bottom before done.
        while (rowsGrown > 0) {
            if (breastIndex + 1 > chest.count())
                breastIndex = 0;
            chest.get(breastIndex).breastRating += amount;
            breastIndex++;
            rowsGrown--;
        }

    }

    public static growTopBreastRow(body: Creature, amount: number, rowsGrown: number, display: boolean) {
        let chest = body.upperBody.chest;
        if (chest.count() == 0)
            return;

        if (body.perks.has(PerkType.BigTits) && Utils.chance(33) && amount < 1)
            amount = 1;

        if (!Flags.list[FlagEnum.HYPER_HAPPY]) {
            let topBreastRow: number = chest.get(0).breastRating;

            //Diminishing returns!
            if (body.perks.has(PerkType.BigTits)) {
                amount /= topBreastRow > 3 ? 1.3 : 1.5;
                amount /= topBreastRow > 7 ? 1.5 : 2;
                amount /= topBreastRow > 9 ? 1.5 : 2;
                amount /= topBreastRow > 12 ? 1.5 : 2;
            }
        }

        while (rowsGrown > 0) {
            rowsGrown--;
            chest.get(0).breastRating += amount;
        }
    }


    /**
     * Note: Only here as reference to the old function
     * GrowthType 1 = smallest grows - growSmallestBreastRow
     * GrowthType 2 = Top Row working downward - growTopBreastRowDownwards
     * GrowthType 3 = Only top row - growTopBreastRow
     * @param body
     * @param amount
     * @param rowsGrown
     * @param display
     * @param growthType
     */
    public static growTits(body: Creature, amount: number, rowsGrown: number, growthType: number): void {
    }


    public static shrinkTits(body: Creature, ignore_hyper_happy: boolean = false): void {
        if (Flags.list[FlagEnum.HYPER_HAPPY] && !ignore_hyper_happy) {
            return;
        }
        if (body.upperBody.chest.count() == 1) {
            let topRow: BreastRow = body.upperBody.chest.get(0);
            if (topRow.breastRating > 0) {
                //Shrink if bigger than N/A cups
                let superShrink: boolean = false;
                topRow.breastRating--;
                //Shrink again 50% chance
                if (topRow.breastRating >= 1 && Utils.rand(100 / 2) && !body.perks.has(PerkType.BigTits)) {
                    superShrink = true;
                    topRow.breastRating--;
                }
                if (topRow.breastRating < 0) topRow.breastRating = 0;
                //Talk about shrinkage
                if (!superShrink) DisplayText.text("\n\nYou feel a weight lifted from you, and realize your breasts have shrunk!  With a quick measure, you determine they're now " + BreastDescriptor.breastCup(topRow.breastRating) + "s.");
                if (superShrink) DisplayText.text("\n\nYou feel significantly lighter.  Looking down, you realize your breasts are much smaller!  With a quick measure, you determine they're now " + BreastDescriptor.breastCup(topRow.breastRating) + "s.");
            }
        }
        else if (body.upperBody.chest.count() > 1) {
            //multiple
            DisplayText.text("\n");
            //temp2 = amount changed
            //temp3 = counter
            let shrinkAmount: number = 0;
            let breastRowIndex: number = body.upperBody.chest.count();
            while (breastRowIndex > 0) {
                breastRowIndex--;
                if (body.upperBody.chest.get(breastRowIndex).breastRating > 0) {
                    body.upperBody.chest.get(breastRowIndex).breastRating--;
                    if (body.upperBody.chest.get(breastRowIndex).breastRating < 0) body.upperBody.chest.get(breastRowIndex).breastRating = 0;
                    shrinkAmount++;
                    DisplayText.text("\n");
                    if (breastRowIndex < body.upperBody.chest.count() - 1) DisplayText.text("...and y");
                    else DisplayText.text("Y");
                    DisplayText.text("our " + BreastDescriptor.describeBreastRow(body.upperBody.chest.get(breastRowIndex)) + " shrink, dropping to " + BreastDescriptor.breastCup(body.upperBody.chest.get(breastRowIndex).breastRating) + "s.");
                }
                if (body.upperBody.chest.get(breastRowIndex).breastRating < 0) body.upperBody.chest.get(breastRowIndex).breastRating = 0;
            }
            if (shrinkAmount == 2) DisplayText.text("\nYou feel so much lighter after the change.");
            if (shrinkAmount == 3) DisplayText.text("\nWithout the extra weight you feel particularly limber.");
            if (shrinkAmount >= 4) DisplayText.text("\nIt feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.");
        }
    }
    
    // TODO: Fix this function
    public static boostLactation(character: Character, boostAmt: number): number {
        if (!character.upperBody.chest.hasBreasts)
            return 0;
        let breasts: BreastRow;
        let changes: number = 0;
        let temp2: number = 0;
        //Prevent lactation decrease if lactating.
        if (boostAmt >= 0) {
            if (character.statusAffects.has(StatusAffectType.LactationReduction))
                character.statusAffects.get(StatusAffectType.LactationReduction).value1 = 0;
            if (character.statusAffects.has(StatusAffectType.LactationReduc0))
                character.statusAffects.remove(StatusAffectType.LactationReduc0);
            if (character.statusAffects.has(StatusAffectType.LactationReduc1))
                character.statusAffects.remove(StatusAffectType.LactationReduc1);
            if (character.statusAffects.has(StatusAffectType.LactationReduc2))
                character.statusAffects.remove(StatusAffectType.LactationReduc2);
            if (character.statusAffects.has(StatusAffectType.LactationReduc3))
                character.statusAffects.remove(StatusAffectType.LactationReduc3);
        }
        if (boostAmt > 0) {
            while (boostAmt > 0) {
                breasts = character.upperBody.chest.BreastRatingLargest[0];
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
                    breasts = character.upperBody.chest.LactationMultipierSmallest[0];
                    //trace(biggestLactation());
                    breasts.lactationMultiplier += boostAmt;
                    if (breasts.lactationMultiplier < 0)
                        breasts.lactationMultiplier = 0;
                    boostAmt = 0;
                }
                else {
                    boostAmt += .1;
                    breasts = character.upperBody.chest.LactationMultipierSmallest[0];
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
}