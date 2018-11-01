import { Character } from "../Character/Character";
import { NextScreenChoices } from "../ScreenDisplay";
import { CView } from "../../Page/ContentView";
import { weaponsmith } from "./Shops/Weaponsmith";
import { general } from "./Shops/General";
import { armorsmith } from "./Shops/Armorsmith";
import { townSquare } from "./TownSquare";

export function shops(char: Character): NextScreenChoices {
    CView.clear();
    CView.text("You are on the shopping street.");
    return {
        choices: [
            ["Weaponsmith", weaponsmith],
            ["Armorsmith", armorsmith],
            ["General", general],
            ["Back", townSquare]
        ]
    };
}
