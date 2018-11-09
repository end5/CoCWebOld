import { Character } from "../../Character/Character";
import { NextScreenChoices, ScreenChoice, choiceWrap } from "../../ScreenDisplay";
import { CView } from "../../../Page/ContentView";
import { ArmorLib } from "../../Items/Armors/ArmorLib";
import { shops } from "../Shops";
import { Armor } from "../../Items/Armors/Armor";

const availableItems = ArmorLib.values()
    .filter((weapon) => weapon.value > 0);

export function armorsmith(char: Character): NextScreenChoices {
    CView.clear();
    CView.text("Armorsmith\n");

    for (const item of availableItems) {
        CView.text(item.desc.shortName + ": " + item.desc.longName + " - " + item.value + " gems\n");
    }

    return {
        choices:
            availableItems.map((weapon) => buyArmorOption(char, weapon)),
        persistantChoices: [
            ["Leave", shops]
        ]
    };
}

function buyArmorOption(char: Character, armor: Armor): ScreenChoice {
    if (char.inventory.gems >= armor.value) {
        return [armor.name, choiceWrap(confirmBuy, armor)];
    }
    return [armor.name, { tooltip: "You don't have enough gems to purchase this." }];
}

function confirmBuy(char: Character, armor: Armor): NextScreenChoices {
    CView.clear();
    CView.text("Do you wish to purchase " + armor.displayName + "?");
    return { yes: choiceWrap(boughtArmor, armor), no: armorsmith };
}

function boughtArmor(char: Character, armor: Armor): NextScreenChoices {
    char.inventory.gems -= armor.value;
    return armorsmith(char);
}
