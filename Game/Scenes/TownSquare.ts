import { NextScreenChoices } from "../ScreenDisplay";
import { CView } from "../../Engine/Display/ContentView";

export function townSquare(): NextScreenChoices {
    CView.clear();
    CView.text('This is the town square');
    return { choices: [['Town Square', townSquare]] };
}
