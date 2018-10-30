import { Character } from "../Character/Character";
import { NextScreenChoices, ClickFunction } from "../ScreenDisplay";

export function choiceWrap(func: (char: Character, ...args: any[]) => NextScreenChoices, ...args: any[]): ClickFunction {
    const wrapper = (character: Character, event?: Event): NextScreenChoices => {
        return func(character, args);
    };
    Object.defineProperty(wrapper, "name", { value: func.name });
    return wrapper;
}
