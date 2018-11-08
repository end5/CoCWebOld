import { EndScenes } from "../../../Combat/EndScenes";
import { DefeatType } from "../../../Combat/DefeatEvent";
import { Character } from "../../../Character/Character";
import { NextScreenChoices } from "../../../ScreenDisplay";
import { CView } from "../../../../Page/ContentView";
import { passTime } from "../../../Menus/InGame/PlayerMenu";
import { Gender } from "../../../Body/GenderIdentity";

export class GoblinEndScenes extends EndScenes {
    public defeatScene(howGoblinWon: DefeatType, enemy: Character): NextScreenChoices {
        CView.text("PLACEHOLDER - Goblin Defeat Scene");
        return { next: passTime(4) };
    }

    public victoryScene(howGoblinWon: DefeatType, enemy: Character): NextScreenChoices {
        if (enemy.gender === Gender.NONE) {
            CView.text("You collapse in front of the goblin, too wounded to fight.  She giggles and takes out a tube of lipstick smearing it whorishly on your face.  You pass into unconsciousness immediately.  It must have been drugged.");
            return { next: passTime(1) };
        }
        else {
            CView.text("PLACEHOLDER - Goblin Win Scene");
            return { next: passTime(1) };
        }
    }
}
