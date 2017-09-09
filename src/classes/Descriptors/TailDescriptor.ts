import Creature from "../Creature";
import { TailType } from "../Modules/LowerBodyModule";

export default class TailDescriptor {
    public static TailNameTable =
    [
        [TailType.NONE, "non-existant"],
        [TailType.HORSE, "horse"],
        [TailType.DOG, "dog"],
        [TailType.DEMONIC, "demonic"],
        [TailType.COW, "cow"],
        [TailType.SPIDER_ABDOMEN, "spider abdomen"],
        [TailType.BEE_ABDOMEN, "bee abdomen"],
        [TailType.SHARK, "shark"],
        [TailType.CAT, "cat"],
        [TailType.LIZARD, "lizard"],
        [TailType.BUNNY, "rabbit"],
        [TailType.HARPY, "harpy"],
        [TailType.KANGAROO, "kangaroo"],
        [TailType.FOX, "fox"],
        [TailType.DRACONIC, "draconic"],
        [TailType.RACCOON, "raccoon"],
        [TailType.MOUSE, "mouse"]
    ];

    public static tailDescript(creature: Creature): string {
        if (creature.lowerbody.tailType == TailType.NONE) {
            console.trace("WARNING: Creature has no tails to describe.");
            return "<b>!Creature has no tails to describe!</b>";
        }

        let description: string = "";

        if (creature.tailType == TailType.FOX && creature.tailVenom >= 1) {
            // Kitsune tails, we're using tailVenom to track tail count
            if (creature.tailVenom > 1) {
                if (creature.tailVenom == 2) description += "pair ";
                else if (creature.tailVenom == 3) description += "trio ";
                else if (creature.tailVenom == 4) description += "quartet ";
                else if (creature.tailVenom == 5) description += "quintet ";
                else if (creature.tailVenom > 5) description += "bundle ";

                description += "of kitsune tails";
            }
            else description += "kitsune tail";
        }
        else {
            description += TailDescriptor.TailNameTable[creature.tailType];
            description += " tail";
        }

        return description;
    }

    public static oneTailDescript(creature: Creature): string {
        if (creature.tailType == TailType.NONE) {
            console.trace("WARNING: Creature has no tails to describe.");
            return "<b>!Creature has no tails to describe!</b>";
        }

        let description: string = "";

        if (creature.tailType == TailType.FOX && creature.tailVenom >= 1) {
            if (creature.tailVenom == 1) {
                description += "your kitsune tail";
            }
            else {
                description += "one of your kitsune tails";
            }
        }
        else {
            description += "your " + TailDescriptor.TailNameTable[creature.tailType] + " tail";
        }

        return description;
    }

}