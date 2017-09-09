import Creature from "../Creature";
import Utils from "../Utilities/Utils";
import Flags, { FlagEnum } from "../Game/Flags";
import BreastRowModule from "../Modules/BreastRowModule";

export default class BreastModifier {
    public growSmallestBreastRow(creature: Creature, amount: number, rowsGrown: number, display: boolean) {
        let chest = creature.upperBody.chest;
        if (chest.count() == 0)
            return;

        //Chance for "big tits" perked characters to grow larger!
        if (creature.perks.has("BigTits") && Utils.chance(33) && amount < 1)
            amount = 1;
        //Select smallest breast, grow it, move on
        while (rowsGrown > 0) {
            let growthAmount: number = amount;
            if (!Flags.get[FlagEnum.HYPER_HAPPY]) {
                let smallestBreastRating: number = chest.BreastRatingSmallest[0].breastRating;

                //Diminishing returns!
                if (creature.perks.has("BigTits")) {
                    growthAmount /= smallestBreastRating > 3 ? 1.3 : 1.5;
                    growthAmount /= smallestBreastRating > 7 ? 1.5 : 2;
                    growthAmount /= smallestBreastRating > 9 ? 1.5 : 2;
                    growthAmount /= smallestBreastRating > 12 ? 1.5 : 2;
                }
            }

            //Grow!
            console.trace("Growing breasts by ", growthAmount);
            chest.BreastRatingSmallest[0].breastRating += growthAmount;
            rowsGrown--;
        }
    }

    public growTopBreastRowDownwards(creature: Creature, amount: number, rowsGrown: number, display: boolean) {
        let chest = creature.upperBody.chest;
        if (chest.count() == 0)
            return;

        if (creature.perks.has("BigTits") && Utils.chance(33) && amount < 1)
            amount = 1;

        if (!Flags.get[FlagEnum.HYPER_HAPPY]) {
            let topBreastRow: number = chest.list[0].breastRating;

            //Diminishing returns!
            if (creature.perks.has("BigTits")) {
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
            chest.list[breastIndex].breastRating += amount;
            console.trace("Breasts increased by " + amount + " on row " + temp);
            breastIndex++;
            rowsGrown--;
        }

    }

    public growTopBreastRow(creature: Creature, amount: number, rowsGrown: number, display: boolean) {
        let chest = creature.upperBody.chest;
        if (chest.count() == 0)
            return;

        if (creature.perks.has("BigTits") && Utils.chance(33) && amount < 1)
            amount = 1;

        if (!Flags.get[FlagEnum.HYPER_HAPPY]) {
            let topBreastRow: number = chest.list[0].breastRating;

            //Diminishing returns!
            if (creature.perks.has("BigTits")) {
                amount /= topBreastRow > 3 ? 1.3 : 1.5;
                amount /= topBreastRow > 7 ? 1.5 : 2;
                amount /= topBreastRow > 9 ? 1.5 : 2;
                amount /= topBreastRow > 12 ? 1.5 : 2;
            }
        }

        while (rowsGrown > 0) {
            rowsGrown--;
            chest.list[0].breastRating += amount;
        }
    }


    /**
     * 
     * @param creature
     * @param amount
     * @param rowsGrown
     * @param display
     * @param growthType
     * GrowthType 1 = smallest grows
     * GrowthType 2 = Top Row working downward
     * GrowthType 3 = Only top row
     */
    public growTits(creature: Creature, amount: number, rowsGrown: number, growthType: number): void {
    }


    public shrinkTits(ignore_hyper_happy: boolean = false): void {
        if (Flags.get[FlagEnum.HYPER_HAPPY] && !ignore_hyper_happy) {
            return;
        }
        if (this.upperBody.chest.count() == 1) {
            if (this.upperBody.chest.list[0].breastRating > 0) {
                //Shrink if bigger than N/A cups
                let temp: number;
                temp = 1;
                this.upperBody.chest.list[0].breastRating--;
                //Shrink again 50% chance
                if (this.upperBody.chest.list[0].breastRating >= 1 && Utils.rand(100 / 2) && !this.perks.has("BigTits")) {
                    temp++;
                    this.upperBody.chest.list[0].breastRating--;
                }
                if (this.upperBody.chest.list[0].breastRating < 0) this.upperBody.chest.list[0].breastRating = 0;
                //Talk about shrinkage
                if (temp == 1) outputText("\n\nYou feel a weight lifted from you, and realize your breasts have shrunk!  With a quick measure, you determine they're now " + breastCup(0) + "s.", false);
                if (temp == 2) outputText("\n\nYou feel significantly lighter.  Looking down, you realize your breasts are much smaller!  With a quick measure, you determine they're now " + breastCup(0) + "s.", false);
            }
        }
        else if (this.upperBody.chest.count() > 1) {
            //multiple
            outputText("\n", false);
            //temp2 = amount changed
            //temp3 = counter
            let temp2: number = 0;
            let temp3: number = this.upperBody.chest.count();
            while (temp3 > 0) {
                temp3--;
                if (this.upperBody.chest.list[temp3].breastRating > 0) {
                    this.upperBody.chest.list[temp3].breastRating--;
                    if (this.upperBody.chest.list[temp3].breastRating < 0) this.upperBody.chest.list[temp3].breastRating = 0;
                    temp2++;
                    outputText("\n", false);
                    if (temp3 < this.upperBody.chest.count() - 1) outputText("...and y", false);
                    else outputText("Y", false);
                    outputText("our " + breastDescript(temp3) + " shrink, dropping to " + breastCup(temp3) + "s.", false);
                }
                if (this.upperBody.chest.list[temp3].breastRating < 0) this.upperBody.chest.list[temp3].breastRating = 0;
            }
            if (temp2 == 2) outputText("\nYou feel so much lighter after the change.", false);
            if (temp2 == 3) outputText("\nWithout the extra weight you feel particularly limber.", false);
            if (temp2 >= 4) outputText("\nIt feels as if the weight of the world has been lifted from your shoulders, or in this case, your chest.", false);
        }
    }

}