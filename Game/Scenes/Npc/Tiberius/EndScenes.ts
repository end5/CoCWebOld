import { EndScenes } from "../../../Combat/EndScenes";
import { DefeatType } from "../../../Combat/DefeatEvent";
import { Character } from "../../../Character/Character";
import { NextScreenChoices } from "../../../ScreenDisplay";
import { CView } from "../../../../Page/ContentView";
import { passTime } from "../../../Menus/InGame/PlayerMenu";

export class TiberiusEndScenes extends EndScenes {
    public defeatScene(howGoblinWon: DefeatType, enemy: Character): NextScreenChoices {
        CView.text("PLACEHOLDER - Tiberius Defeat Scene");
        return { next: passTime(4) };
    }

    public victoryScene(howGoblinWon: DefeatType, enemy: Character): NextScreenChoices {
        CView.text("PLACEHOLDER - Tiberius Win Scene");
        return { next: passTime(1) };
    }
}
