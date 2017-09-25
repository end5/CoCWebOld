import { TailType } from "../Body/LowerBodyModule";
import CreatureBody from "../Body/Body";

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

    public static describeTail(body: CreatureBody): string {
        if (body.lowerBody.tailType == TailType.NONE) {
            console.trace("WARNING: Creature has no tails to describe.");
            return "<b>!Creature has no tails to describe!</b>";
        }

        let description: string = "";

        if (body.lowerBody.tailType == TailType.FOX && body.lowerBody.tailVenom >= 1) {
            // Kitsune tails, we're using tailVenom to track tail count
            if (body.lowerBody.tailVenom > 1) {
                if (body.lowerBody.tailVenom == 2) description += "pair ";
                else if (body.lowerBody.tailVenom == 3) description += "trio ";
                else if (body.lowerBody.tailVenom == 4) description += "quartet ";
                else if (body.lowerBody.tailVenom == 5) description += "quintet ";
                else if (body.lowerBody.tailVenom > 5) description += "bundle ";

                description += "of kitsune tails";
            }
            else description += "kitsune tail";
        }
        else {
            description += TailDescriptor.TailNameTable[body.lowerBody.tailType];
            description += " tail";
        }

        return description;
    }

    public static describeOneTail(body: CreatureBody): string {
        if (body.lowerBody.tailType == TailType.NONE) {
            console.trace("WARNING: Creature has no tails to describe.");
            return "<b>!Creature has no tails to describe!</b>";
        }

        let description: string = "";

        if (body.lowerBody.tailType == TailType.FOX && body.lowerBody.tailVenom >= 1) {
            if (body.lowerBody.tailVenom == 1) {
                description += "your kitsune tail";
            }
            else {
                description += "one of your kitsune tails";
            }
        }
        else {
            description += "your " + TailDescriptor.TailNameTable[body.lowerBody.tailType] + " tail";
        }

        return description;
    }

}