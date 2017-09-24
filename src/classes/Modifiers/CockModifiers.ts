import Body from "../Body/Body";
import CockSpot from "../Body/CockSpot";
import Cock, { CockType } from "../Body/Cock";

export default class CockModifiers {
    public static killCocks(body: Body, deadCock: number): number {
        let cocks: CockSpot = body.lowerBody.cockSpot;
        //Count removal for text bits
        let removed: number = 0;
        //Holds cock index
        let storedCock: number = 0;
        //Less than 0 = PURGE ALL
        if (deadCock < 0) {
            deadCock = cocks.count();
        }
        //Double loop - outermost counts down cocks to remove, innermost counts down
        while (deadCock > 0 && cocks.count() > 0) {
            //Find shortest cock and prune it
            cocks.remove(cocks.smallestCocks[0]);
            removed++;
            deadCock--;
        }
        if (cocks.count() == 0 && body.lowerBody.balls > 0) {
            body.lowerBody.balls = 0;
            body.lowerBody.ballSize = 1;
        }
        return removed;
    }

    public static growEachCock(body: Body, lengthDelta: number): number {
        let totalGrowth: number = 0;

        for (let index: number = 0; index < body.lowerBody.cockSpot.count(); index++) {
            console.trace("increaseEachCock at: " + index);
            totalGrowth += CockModifiers.growCock(body, body.lowerBody.cockSpot.list[index], lengthDelta);
        }

        return totalGrowth;
    }

    /**
     * Increases size of cock. Returnshow much the cock has grown length wise.
     * @param cock
     * @param lengthDelta
     * @param bigCock
     */
    public static growCock(body: Body, cock: Cock, lengthDelta: number): number {
        let bigCock: boolean = false;

        if (body.perks.has("BigCock"))
            bigCock = true;

        if (lengthDelta == 0) {
            console.trace("Whoops! growCock called with 0, aborting...");
            return lengthDelta;
        }

        let threshhold: number = 0;
        console.trace("growcock starting at:" + lengthDelta);

        if (lengthDelta > 0) { // growing
            console.trace("and growing...");
            threshhold = 24;
            // BigCock Perk increases incoming change by 50% and adds 12 to the length before diminishing returns set in
            if (bigCock) {
                console.trace("growCock found BigCock Perk");
                lengthDelta *= 1.5;
                threshhold += 12;
            }
            // Not a human cock? Multiple the length before dimishing returns set in by 3
            if (cock.cockType != CockType.HUMAN)
                threshhold *= 2;
            // Modify growth for cock socks
            if (cock.sock == "scarlet") {
                console.trace("growCock found Scarlet sock");
                lengthDelta *= 1.5;
            }
            else if (cock.sock == "cobalt") {
                console.trace("growCock found Cobalt sock");
                lengthDelta *= .5;
            }
            // Do diminishing returns
            if (cock.cockLength > threshhold)
                lengthDelta /= 4;
            else if (cock.cockLength > threshhold / 2)
                lengthDelta /= 2;
        }
        else {
            console.trace("and shrinking...");

            threshhold = 0;
            // BigCock Perk doubles the incoming change value and adds 12 to the length before diminishing returns set in
            if (bigCock) {
                console.trace("growCock found BigCock Perk");
                lengthDelta *= 0.5;
                threshhold += 12;
            }
            // Not a human cock? Add 12 to the length before dimishing returns set in
            if (cock.cockType != CockType.HUMAN)
                threshhold += 12;
            // Modify growth for cock socks
            if (cock.sock == "scarlet") {
                console.trace("growCock found Scarlet sock");
                lengthDelta *= 0.5;
            }
            else if (cock.sock == "cobalt") {
                console.trace("growCock found Cobalt sock");
                lengthDelta *= 1.5;
            }
            // Do diminishing returns
            if (cock.cockLength > threshhold)
                lengthDelta /= 3;
            else if (cock.cockLength > threshhold / 2)
                lengthDelta /= 2;
        }

        console.trace("then changing by: " + lengthDelta);

        cock.cockLength += lengthDelta;

        if (cock.cockLength < 1)
            cock.cockLength = 1;

        if (cock.cockThickness > cock.cockLength * .33)
            cock.cockThickness = cock.cockLength * .33;

        return lengthDelta;
    }

    public thickenCock(cock: Cock, increase: number): number {
        let amountGrown: number = 0;
        let temp: number = 0;
        if (increase > 0) {
            while (increase > 0) {
                if (increase < 1)
                    temp = increase;
                else
                    temp = 1;
                //Cut thickness growth for huge dicked
                if (cock.cockThickness > 1 && cock.cockLength < 12) {
                    temp /= 4;
                }
                if (cock.cockThickness > 1.5 && cock.cockLength < 18)
                    temp /= 5;
                if (cock.cockThickness > 2 && cock.cockLength < 24)
                    temp /= 5;
                if (cock.cockThickness > 3 && cock.cockLength < 30)
                    temp /= 5;
                //proportional thickness diminishing returns.
                if (cock.cockThickness > cock.cockLength * .15)
                    temp /= 3;
                if (cock.cockThickness > cock.cockLength * .20)
                    temp /= 3;
                if (cock.cockThickness > cock.cockLength * .30)
                    temp /= 5;
                //massive thickness limiters
                if (cock.cockThickness > 4)
                    temp /= 2;
                if (cock.cockThickness > 5)
                    temp /= 2;
                if (cock.cockThickness > 6)
                    temp /= 2;
                if (cock.cockThickness > 7)
                    temp /= 2;
                //Start adding up bonus length
                amountGrown += temp;
                cock.cockThickness += temp;
                temp = 0;
                increase--;
            }
            increase = 0;
        }
        else if (increase < 0) {
            while (increase < 0) {
                temp = -1;
                //Cut length growth for huge dicked
                if (cock.cockThickness <= 1)
                    temp /= 2;
                if (cock.cockThickness < 2 && cock.cockLength < 10)
                    temp /= 2;
                //Cut again for massively dicked
                if (cock.cockThickness < 3 && cock.cockLength < 18)
                    temp /= 2;
                if (cock.cockThickness < 4 && cock.cockLength < 24)
                    temp /= 2;
                //MINIMUM Thickness of OF .5!
                if (cock.cockThickness <= .5)
                    temp = 0;
                //Start adding up bonus length
                amountGrown += temp;
                cock.cockThickness += temp;
                temp = 0;
                increase++;
            }
        }
        console.trace("thickenCock called and thickened by: " + amountGrown);
        return amountGrown;
    }
}