import { Character } from "../Character/Character";
import { NextScreenChoices, choiceWrap } from "../ScreenDisplay";
import { CView } from "../../Page/ContentView";
import { timePass } from "../Menus/InGame/PlayerMenu";
import { InputTextElement } from "../../Engine/Display/Elements/InputTextElement";

export function rest(char: Character): NextScreenChoices {
    CView.clear();
    CView.text("Rest for how long?");
    return {
        choices: [
            ['One hour', timePass(1)],
            ['Two hours', timePass(1)],
            ['Four hours', timePass(1)],
            ['Until night', timePass(1)],
            ['Input', choiceWrap(inputTimePass, char)]
        ]
    };
}

function inputTimePass(char: Character, numberField?: InputTextElement): NextScreenChoices {
    if (!numberField) {
        numberField = new InputTextElement();
        CView.textElement.appendElement(numberField);
    }

    return { choices: [["OK", choiceWrap(inputTimePassCheck, char, numberField)]] };
}

function inputTimePassCheck(player: Character, numberField: InputTextElement): NextScreenChoices {
    if (numberField.text === "" && !isNaN(+numberField.text)) {
        CView.clear();
        CView.text("\n\n\n<b>You must input a number.</b>");
        return inputTimePass(player);
    }
    return { next: timePass(+numberField.text) };
}
