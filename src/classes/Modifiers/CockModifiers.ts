import Creature from "../Creature";
import CockSpot from "../Modules/CockModule";

export default class CockModifiers {
    public static killCocks(creature: Creature, deadCock: number): number {
        let cocks: CockSpot = creature.lowerBody.cockSpot;
        //Count removal for text bits
        let removed: number = 0;
        let temp: number;
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
        if (cocks.count() == 0 && creature.lowerBody.balls > 0) {
            creature.lowerBody.balls = 0;
            creature.lowerBody.ballSize = 1;
        }
        return removed;
    }

    public increaseCock(cockNum: number, lengthDelta: number): number {
        bigCock: boolean = false;

        if (this.perks.has("BigCock"))
            bigCock = true;

        return cocks[cockNum].growCock(lengthDelta, bigCock);
    }

    public increaseEachCock(lengthDelta: number): number {
        totalGrowth: number = 0;

        for (i:number = 0; i < cocks.count(); i++) {
            console.trace("increaseEachCock at: " + i);
            totalGrowth += increaseCock(i as Number, lengthDelta);
        }

        return totalGrowth;
    }


}