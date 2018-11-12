import { Character } from "../Character/Character";
import { NextScreenChoices, ScreenChoice } from "../ScreenDisplay";
import { CView } from "../../Page/ContentView";
import { townSquare } from "./TownSquare";
import { Tiberius } from "./Npc/Tiberius/Tiberius";
import { PartyDict } from "../PartyDict";
import { CharDict } from "../CharDict";
import { Flags } from "../Flags";
import { FlagType } from "../FlagType";

export const TiberiusFlags = {
    Met: false,
    InParty: false
};

Flags.set(FlagType.Tiberius, TiberiusFlags);

export function tavern(char: Character): NextScreenChoices {
    CView.clear();
    CView.text("Inside the tavern.");
    if (!TiberiusFlags.InParty) {
        if (!TiberiusFlags.Met)
            CView.text("You see a wolf-man standing in the corner of the room.");
        else
            CView.text("You see Tiberius sitting on a chair by the fire.");
    }

    const choices: ScreenChoice[] = [];
    if (!TiberiusFlags.InParty)
        choices[0] = ["Tiberius", recruitTiberious];

    return {
        choices, persistantChoices: [["Back", townSquare]]
    };
}

function recruitTiberious(char: Character): NextScreenChoices {
    CView.clear();
    if (!TiberiusFlags.Met) {
        CView.text("Tiberius is the name.");
        TiberiusFlags.Met = true;
    }
    CView.text("I'll join you party for 100 gold.");

    return {
        choices: [
            ["Ok", recruitedTiberious],
            ["No", tavern],
        ]
    };
}

function recruitedTiberious(char: Character): NextScreenChoices {
    char.inventory.gems -= 100;
    const tiberius = new Tiberius();
    CharDict.add(tiberius);
    PartyDict.addToParty(char, tiberius);
    TiberiusFlags.InParty = true;
    return tavern(char);
}
