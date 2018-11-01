import { Character } from "../../Character/Character";
import { NextScreenChoices, ScreenChoice } from "../../ScreenDisplay";
import { CView } from "../../../Page/ContentView";
import { ConsumableLib } from "../../Items/Consumables/ConsumableLib";
import { Consumable } from "../../Items/Consumables/Consumable";
import { shops } from "../Shops";

export function general(char: Character): NextScreenChoices {
    CView.clear();
    CView.text("General Shop");

    return {
        choices:
            ConsumableLib.values()
                .filter((consumable) => consumable.value > 0)
                .map((consumable) => buyConsumableOption(char, consumable)),
        persistantChoices: [
            ["Back", shops]
        ]
    };
}

function buyConsumableOption(char: Character, consumable: Consumable): ScreenChoice {
    if (char.inventory.gems >= consumable.value) {
        return [consumable.name, function buyConsumable(charr: Character) {
            CView.text("You have bought" + consumable.desc.shortName);
            charr.inventory.gems -= consumable.value;
            return { next: general };
        }];
    }
    return [consumable.name, { tooltip: "You don't have enough gems to purchase this." }];
}
