import { Character } from "../../Character/Character";
import { NextScreenChoices, ScreenChoice, choiceWrap } from "../../ScreenDisplay";
import { CView } from "../../../Page/ContentView";
import { ConsumableLib } from "../../Items/Consumables/ConsumableLib";
import { Consumable } from "../../Items/Consumables/Consumable";
import { shops } from "../Shops";
import { ITimeAware } from "../../ITimeAware";
import { randInt } from "../../../Engine/Utilities/SMath";
import { Time } from "../../Utilities/Time";
import { TimeManager } from "../../TimeManager";

class ItemRotation implements ITimeAware {
    public timeChange(player: Character): boolean {
        if (Time.day % 2)
            rotateStock();
        return false;
    }
    public timeChangeLarge(player: Character): void | NextScreenChoices { }
    public serialize(): void | ITimeAware { }
    public deserialize(saveObject: ITimeAware): void { }
}

TimeManager.add(new ItemRotation());

let availableItems: Consumable[] = [];
const availableItemCount = 8;

function rotateStock() {
    availableItems = [];
    const items = ConsumableLib.values().filter((consumable) => consumable.value > 0);
    for (let index = 0; index < availableItemCount; index++) {
        availableItems.push(...items.splice(randInt(items.length), 1));
    }
}
rotateStock();

export function general(char: Character): NextScreenChoices {
    CView.clear();
    CView.text("General Shop\n");

    for (const item of availableItems) {
        CView.text(item.desc.shortName + ": " + item.desc.longName + " - " + item.value + " gems\n");
    }

    return {
        choices:
            availableItems.map((consumable) => buyConsumableOption(char, consumable)),
        persistantChoices: [
            ["Leave", shops]
        ]
    };
}

function buyConsumableOption(char: Character, consumable: Consumable): ScreenChoice {
    if (char.inventory.gems >= consumable.value) {
        return [consumable.name, choiceWrap(buyConsumable, consumable)];
    }
    return [consumable.name, { tooltip: "You don't have enough gems to purchase this." }];
}

function buyConsumable(char: Character, consumable: Consumable): NextScreenChoices {
    CView.text("You have bought" + consumable.desc.shortName);
    char.inventory.gems -= consumable.value;
    return { next: general };
}
