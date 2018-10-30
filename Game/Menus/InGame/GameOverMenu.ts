import { NextScreenChoices } from "../../ScreenDisplay";
import { Character } from "../../Character/Character";

export function gameOverMenu(player: Character): NextScreenChoices {
    return {
        next: undefined
    };
}
