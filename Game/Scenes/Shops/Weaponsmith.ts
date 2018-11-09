import { Character } from "../../Character/Character";
import { NextScreenChoices, ScreenChoice, choiceWrap } from "../../ScreenDisplay";
import { CView } from "../../../Page/ContentView";
import { Weapon } from "../../Items/Weapons/Weapon";
import { WeaponLib } from "../../Items/Weapons/WeaponLib";
import { shops } from "../Shops";

const availableItems = WeaponLib.values()
    .filter((weapon) => weapon.value > 0);

export function weaponsmith(char: Character): NextScreenChoices {
    CView.clear();
    CView.text("Weaponsmith");

    for (const item of availableItems) {
        CView.text(item.desc.shortName + ": " + item.desc.longName + " - " + item.value + " gems\n");
    }

    return {
        choices:
            availableItems.map((weapon) => buyWeaponOption(char, weapon)),
        persistantChoices: [
            ["Leave", shops]
        ]
    };
}

function buyWeaponOption(char: Character, weapon: Weapon): ScreenChoice {
    if (char.inventory.gems >= weapon.value) {
        return [weapon.name, choiceWrap(confirmBuy, weapon)];
    }
    return [weapon.name, { tooltip: "You don't have enough gems to purchase this." }];
}

function confirmBuy(char: Character, weapon: Weapon): NextScreenChoices {
    CView.clear();
    CView.text("Do you wish to purchase " + weapon.displayName + "?");
    return { yes: choiceWrap(boughtWeapon, weapon), no: weaponsmith };
}

function boughtWeapon(char: Character, weapon: Weapon): NextScreenChoices {
    char.inventory.gems -= weapon.value;
    return weaponsmith(char);
}
