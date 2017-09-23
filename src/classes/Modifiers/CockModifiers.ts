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

    public static growCock(cock: Cock, lengthDelta: number, bigCock: boolean): number {
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

    public static increaseCock(body: Body, cockNum: number, lengthDelta: number): number {
        let bigCock: boolean = false;

        if (body.perks.has("BigCock"))
            bigCock = true;

        return CockModifiers.growCock(body.lowerBody.cockSpot.list[cockNum], lengthDelta, bigCock);
    }

    public static increaseEachCock(body: Body, lengthDelta: number): number {
        let totalGrowth: number = 0;

        for (let index: number = 0; index < body.lowerBody.cockSpot.count(); index++) {
            console.trace("increaseEachCock at: " + index);
            totalGrowth += CockModifiers.increaseCock(body, index, lengthDelta);
        }

        return totalGrowth;
    }


}