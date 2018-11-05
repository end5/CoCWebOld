import { Character } from "../Character/Character";
import { NextScreenChoices, choiceWrap } from "../ScreenDisplay";
import { CView } from "../../Page/ContentView";
import { passTime } from "../Menus/InGame/PlayerMenu";
import { InputTextElement } from "../../Engine/Display/Elements/InputTextElement";
import { Time } from "../Utilities/Time";

export function rest(char: Character): NextScreenChoices {
    CView.clear();
    CView.text("Rest for how long?");
    return {
        choices: [
            ['One hour', passTime(1)],
            ['Two hours', passTime(2)],
            ['Four hours', passTime(4)],
            ['Until Morning', passTime(24 + 7 - Time.hour)],
            ['Input', choiceWrap(inputTimePass)]
        ]
    };
}

function inputTimePass(char: Character, numberField?: InputTextElement): NextScreenChoices {
    if (!numberField) {
        numberField = new InputTextElement();
        CView.textElement.appendElement(numberField);
    }

    return { choices: [["OK", choiceWrap(inputTimePassCheck, numberField)]] };
}

function inputTimePassCheck(player: Character, numberField: InputTextElement): NextScreenChoices {
    if (numberField.text === "" && !isNaN(+numberField.text)) {
        CView.text("\n\n\n<b>You must input a number.</b>");
        return inputTimePass(player);
    }
    return passTime(+numberField.text)(player);
}
