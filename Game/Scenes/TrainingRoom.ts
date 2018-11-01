import { FlagType } from "../FlagType";
import { Flags } from "../Flags";
import { Character } from "../Character/Character";
import { NextScreenChoices } from "../ScreenDisplay";
import { CView } from "../../Page/ContentView";
import { townSquare } from "./TownSquare";

export const TrainingRoomFlags = {
    BowSkill: 0,
};

Flags.set(FlagType.TrainingRoom, TrainingRoomFlags);

export function trainingRoom(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("This is the training room.");
    return {
        choices: [
            ["Train Strength", trainStrength],
            ["Back", townSquare]
        ]
    };
}

function trainStrength(player: Character): NextScreenChoices {
    CView.clear();
    CView.text("You train your Strength.");
    player.stats.str++;
    return { next: trainingRoom };
}
