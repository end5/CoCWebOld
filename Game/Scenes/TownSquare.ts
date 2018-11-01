import { NextScreenChoices } from "../ScreenDisplay";
import { CView } from "../../Page/ContentView";
import { explore } from "./Explore";
import { shops } from "./Shops";
import { rest } from "./Rest";
import { trainingRoom } from "./TrainingRoom";

export function townSquare(): NextScreenChoices {
    CView.clear();
    CView.text('This is the town square');
    return {
        choices: [
            ['Explore', explore],
            ['Shops', shops],
            ['Training', trainingRoom],
            ['Rest', rest]
        ]
    };
}
