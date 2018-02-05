﻿import { TailType } from '../Body/Tail';
import Character from '../Character/Character';

export default class TailDescriptor {
    public static TailNameTable =
        [
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

    public static describeTail(character: Character): string {
        let description: string = "";

        if (character.torso.tails.count > 0) {
            const kitsuneTailCount = character.torso.tails.filter(Tail.Type(TailType.FOX)).length;
            if (kitsuneTailCount > 0) {
                if (kitsuneTailCount > 1) {
                    if (kitsuneTailCount === 2) description += "pair ";
                    else if (kitsuneTailCount === 3) description += "trio ";
                    else if (kitsuneTailCount === 4) description += "quartet ";
                    else if (kitsuneTailCount === 5) description += "quintet ";
                    else if (kitsuneTailCount > 5) description += "bundle ";

                    description += "of kitsune tails";
                }
                else description += "kitsune tail";
            }
            else {
                description += TailDescriptor.TailNameTable[character.torso.tails.get(0).type];
                description += " tail";
            }
        }
        return description;
    }

    public static describeOneTail(character: Character): string {
        let description: string = "";

        if (character.torso.tails.count > 0) {
            const kitsuneTailCount = character.torso.tails.filter(Tail.Type(TailType.FOX)).length;
            if (kitsuneTailCount === 1) {
                    description += "your kitsune tail";
            }
            else if (kitsuneTailCount > 1) {
                description += "one of your kitsune tails";
            }
            else {
                description += "your " + TailDescriptor.TailNameTable[character.torso.tails.get(0).type] + " tail";
            }
        }
        return description;
    }
}
