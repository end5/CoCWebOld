import { Character } from "../Character/Character";
import { NextScreenChoices } from "../ScreenDisplay";
import { townSquare } from "./TownSquare";

export function explore(char: Character): NextScreenChoices {
    return { next: townSquare };
}
