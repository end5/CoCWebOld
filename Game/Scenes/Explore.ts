import { Character } from "../Character/Character";
import { NextScreenChoices } from "../ScreenDisplay";
import { CView } from "../../Page/ContentView";
import { CombatManager } from "../Combat/CombatManager";
import { Goblin } from "./Npc/Goblin";

export function explore(char: Character): NextScreenChoices {
    CView.clear();
    CView.text("You encountered a goblin!");
    return CombatManager.beginBattle(char, new Goblin());
}
