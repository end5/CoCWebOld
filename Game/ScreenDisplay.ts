import { StatType } from '../Engine/Display/Elements/StatsPanelObserver';
import { MainScreen } from '../Engine/Display/MainScreen';
import { Character } from './Character/Character';
import { CharDict } from './CharList';

export type ClickFunction = ((char: Character, event: Event) => NextScreenChoices);
export interface ClickObject {
    func: ClickFunction;
    tooltip: string;
}
export type ClickOption = ClickFunction | ClickObject | undefined;
export type ScreenChoice = [string, ClickOption];
export interface NextScreenChoices {
    yes?: ClickOption;
    no?: ClickOption;
    next?: ClickOption;
    choices?: ScreenChoice[];
    persistantChoices?: ScreenChoice[];
}

function updateStats() {
    if (CharDict.player) {
        MainScreen.getStatsPanel().getStat(StatType.Strength).setStat(CharDict.player.stats.str);
        MainScreen.getStatsPanel().getStat(StatType.Toughness).setStat(CharDict.player.stats.tou);
        MainScreen.getStatsPanel().getStat(StatType.Speed).setStat(CharDict.player.stats.spe);
        MainScreen.getStatsPanel().getStat(StatType.Intelligence).setStat(CharDict.player.stats.int);
        MainScreen.getStatsPanel().getStat(StatType.Libido).setStat(CharDict.player.stats.lib);
        MainScreen.getStatsPanel().getStat(StatType.Sensitivity).setStat(CharDict.player.stats.sens);
        MainScreen.getStatsPanel().getStat(StatType.Corruption).setStat(CharDict.player.stats.cor);
        MainScreen.getStatsPanel().getStat(StatType.HP).setStat(CharDict.player.stats.HP, CharDict.player.stats.maxHP());
        MainScreen.getStatsPanel().getStat(StatType.Lust).setStat(CharDict.player.stats.lust);
        MainScreen.getStatsPanel().getStat(StatType.Fatigue).setStat(CharDict.player.stats.fatigue);
        // MainScreen.getStatsPanel().getStat(StatType.Fullness).setStat(CharDict.player.stats.full);
        MainScreen.getStatsPanel().getStat(StatType.Level).setStat(CharDict.player.stats.level);
        MainScreen.getStatsPanel().getStat(StatType.Xp).setStat(CharDict.player.stats.XP);
        MainScreen.getStatsPanel().getStat(StatType.Gems).setStat(CharDict.player.inventory.gems);
    }
}

const previousScreens: string[] = [];
let nextScreens: string[] = [];

export function clickFuncWrapper(clickFunc: ClickOption): ((event: Event) => void) | undefined {
    if (clickFunc) {
        if (typeof clickFunc === "function") {
            nextScreens.push(clickFunc.name);
            return (event) => {
                previousScreens.push(clickFunc.name);
                nextScreens = [];
                displayNextScreenChoices(clickFunc(CharDict.player!, event));
            };
        }
        else if (typeof clickFunc === "object" && clickFunc.func) {
            nextScreens.push(clickFunc.func.name);
            return (event) => {
                if (clickFunc.func) {
                    previousScreens.push(clickFunc.func.name);
                    nextScreens = [];
                    displayNextScreenChoices(clickFunc.func.apply(clickFunc.func, [CharDict.player!, event]));
                }
            };
        }
    }
    return;
}

function displayChoices(choices: ScreenChoice[], persistantChoices?: ScreenChoice[]) {
    const fixedCount = persistantChoices ? persistantChoices.length : 0;
    if (choices.length + fixedCount <= MainScreen.NUM_BOT_BUTTONS) {
        MainScreen.hideBottomButtons();
        for (let index = 0; index < choices.length; index++) {
            if (Array.isArray(choices[index])) {
                MainScreen.getBottomButton(index)!.modify(choices[index][0], clickFuncWrapper(choices[index][1]));
                if (choices[index][0] === "")
                    MainScreen.getBottomButton(index)!.hide();
            }
        }
        if (persistantChoices && fixedCount > 0) {
            const startingIndex = MainScreen.NUM_BOT_BUTTONS - fixedCount;
            for (let botButtonIndex = startingIndex; botButtonIndex < MainScreen.NUM_BOT_BUTTONS; botButtonIndex++) {
                const fixedIndex = botButtonIndex - startingIndex;
                if (Array.isArray(persistantChoices[fixedIndex])) {
                    MainScreen.getBottomButton(botButtonIndex)!.modify(persistantChoices[fixedIndex][0], clickFuncWrapper(persistantChoices[fixedIndex][1]));
                    if (persistantChoices[fixedIndex][0] === "")
                        MainScreen.getBottomButton(botButtonIndex)!.hide();
                }
            }
        }
    }
    else {
        displayPage(0, choices, persistantChoices);
    }
}

function displayPage(startingIndex: number, choices: ScreenChoice[], persistantChoices?: ScreenChoice[]) {
    MainScreen.hideBottomButtons();
    const pageNavIndex = MainScreen.NUM_BOT_BUTTONS - 2;
    const prevButtonIndex = pageNavIndex;
    const nextButtonIndex = pageNavIndex + 1;
    const fixedCount = persistantChoices ? persistantChoices.length : 0;
    const startingFixedIndex = pageNavIndex - fixedCount;
    for (let index = 0; index < startingFixedIndex && index + startingIndex < choices.length; index++) {
        MainScreen.getBottomButton(index)!.modify(choices[index + startingIndex][0], clickFuncWrapper(choices[index + startingIndex][1]));
        if (choices[index][0] === "")
            MainScreen.getBottomButton(index)!.hide();
    }
    if (persistantChoices && fixedCount > 0) {
        for (let botButtonIndex = startingFixedIndex; botButtonIndex < pageNavIndex; botButtonIndex++) {
            const fixedIndex = botButtonIndex - startingFixedIndex;
            MainScreen.getBottomButton(botButtonIndex)!.modify(persistantChoices[fixedIndex][0], clickFuncWrapper(persistantChoices[fixedIndex][1]));
            if (persistantChoices[fixedIndex][0] === "")
                MainScreen.getBottomButton(botButtonIndex)!.hide();
        }
    }

    const hasPrevPage = startingIndex - startingFixedIndex > 0 ? true : false;
    if (hasPrevPage) {
        MainScreen.getBottomButton(prevButtonIndex)!.modify("Prev", () => {
            displayPage(startingIndex - startingFixedIndex, choices, persistantChoices);
        });
    }
    else {
        MainScreen.getBottomButton(prevButtonIndex)!.modify("Prev", undefined, true);
    }

    const hasNextPage = startingIndex + startingFixedIndex < choices.length ? true : false;
    if (hasNextPage) {
        MainScreen.getBottomButton(nextButtonIndex)!.modify("Next", () => {
            displayPage(startingIndex + startingFixedIndex, choices, persistantChoices);
        });
    }
    else {
        MainScreen.getBottomButton(nextButtonIndex)!.modify("Next", undefined, true);
    }
}

function doNext(func: ClickOption) {
    MainScreen.hideBottomButtons();
    MainScreen.getBottomButton(MainScreen.NEXT_BUTTON_ID)!.modify("Next", clickFuncWrapper(func));
}

function doYesNo(yesFunc: ClickOption, noFunc: ClickOption) {
    MainScreen.hideBottomButtons();
    MainScreen.getBottomButton(MainScreen.YES_BUTTON_ID)!.modify("Yes", clickFuncWrapper(yesFunc));
    MainScreen.getBottomButton(MainScreen.NO_BUTTON_ID)!.modify("No", clickFuncWrapper(noFunc));
}

export function displayNextScreenChoices(nextScreen: void | NextScreenChoices) {
    updateStats();
    if (nextScreen) {
        if (nextScreen.yes && nextScreen.no) {
            doYesNo(nextScreen.yes, nextScreen.no);
        }
        else if (nextScreen.next) {
            doNext(nextScreen.next);
        }
        else if (nextScreen.choices && nextScreen.choices.length > 0 || (nextScreen.persistantChoices && nextScreen.persistantChoices.length > 0)) {
            displayChoices(nextScreen.choices!, nextScreen.persistantChoices);
        }
    }
    else {
        alert("No Next Screen could be found");
        console.trace("No Next Screen found.");
        console.log("Prev Screens: " + previousScreens);
        console.log("Next Screens: " + nextScreens);
    }
}
