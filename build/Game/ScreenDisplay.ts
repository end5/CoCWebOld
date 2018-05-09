import { User } from './User';
import { StatType } from '../Engine/Display/Elements/StatsPanelObserver';
import { MainScreen } from '../Engine/Display/MainScreen';

export type ClickFunction = (activeCharacter?: any, event?: Event) => NextScreenChoices;
export interface NextScreenChoices {
    yes?: ClickFunction;
    no?: ClickFunction;
    next?: ClickFunction;
    choices?: [string[], ClickFunction[]];
    persistantChoices?: [string[], ClickFunction[]];
}

function updateStats() {
    if (User.char) {
        MainScreen.getStatsPanel().getStat(StatType.Strength).setStat(User.char.stats.str);
        MainScreen.getStatsPanel().getStat(StatType.Toughness).setStat(User.char.stats.tou);
        MainScreen.getStatsPanel().getStat(StatType.Speed).setStat(User.char.stats.spe);
        MainScreen.getStatsPanel().getStat(StatType.Intelligence).setStat(User.char.stats.int);
        MainScreen.getStatsPanel().getStat(StatType.Libido).setStat(User.char.stats.lib);
        MainScreen.getStatsPanel().getStat(StatType.Sensitivity).setStat(User.char.stats.sens);
        MainScreen.getStatsPanel().getStat(StatType.Corruption).setStat(User.char.stats.cor);
        MainScreen.getStatsPanel().getStat(StatType.HP).setStat(User.char.stats.HP, User.char.stats.maxHP());
        MainScreen.getStatsPanel().getStat(StatType.Lust).setStat(User.char.stats.lust);
        MainScreen.getStatsPanel().getStat(StatType.Fatigue).setStat(User.char.stats.fatigue);
        // MainScreen.getStatsPanel().getStat(StatType.Fullness).setStat(User.char.stats.full);
        MainScreen.getStatsPanel().getStat(StatType.Level).setStat(User.char.stats.level);
        MainScreen.getStatsPanel().getStat(StatType.Xp).setStat(User.char.stats.XP);
        MainScreen.getStatsPanel().getStat(StatType.Gems).setStat(User.char.inventory.gems);
    }
}

let lastScreen: ClickFunction;

export function clickFuncWrapper(clickFunc: ClickFunction): (event: Event) => void {
    if (clickFunc)
        return (event) => {
            lastScreen = clickFunc;
            displayNextScreenChoices(clickFunc(User.char, event));
        };
    else return undefined;
}

function displayChoices(textList: string[], funcList: ClickFunction[], fixedTextList?: string[], fixedFuncList?: ClickFunction[]) {
    const fixedCount = fixedTextList ? fixedTextList.length : 0;
    if (textList.length + fixedCount <= MainScreen.NUM_BOT_BUTTONS) {
        MainScreen.hideBottomButtons();
        for (let index = 0; index < textList.length; index++) {
            MainScreen.getBottomButton(index).modify(textList[index], clickFuncWrapper(funcList[index]));
            if (textList[index] === "")
                MainScreen.getBottomButton(index).hide();
        }
        if (fixedCount > 0) {
            const startingIndex = MainScreen.NUM_BOT_BUTTONS - fixedCount;
            for (let botButtonIndex = startingIndex; botButtonIndex < MainScreen.NUM_BOT_BUTTONS; botButtonIndex++) {
                const fixedIndex = botButtonIndex - startingIndex;
                MainScreen.getBottomButton(botButtonIndex).modify(fixedTextList[fixedIndex], clickFuncWrapper(fixedFuncList[fixedIndex]));
                if (fixedTextList[fixedIndex] === "")
                    MainScreen.getBottomButton(botButtonIndex).hide();
            }
        }
    }
    else {
        displayPage(0, textList, funcList, fixedTextList, fixedFuncList);
    }
}

function displayPage(startingIndex: number, textList: string[], funcList: ClickFunction[], fixedTextList?: string[], fixedFuncList?: ClickFunction[]) {
    MainScreen.hideBottomButtons();
    const pageNavIndex = MainScreen.NUM_BOT_BUTTONS - 2;
    const prevButtonIndex = pageNavIndex;
    const nextButtonIndex = pageNavIndex + 1;
    const fixedCount = fixedTextList ? fixedTextList.length : 0;
    const startingFixedIndex = pageNavIndex - fixedCount;
    for (let index = 0; index < startingFixedIndex && index + startingIndex < textList.length; index++) {
        MainScreen.getBottomButton(index).modify(textList[index + startingIndex], clickFuncWrapper(funcList[index + startingIndex]));
        if (textList[index] === "")
            MainScreen.getBottomButton(index).hide();
    }
    if (fixedCount > 0) {
        for (let botButtonIndex = startingFixedIndex; botButtonIndex < pageNavIndex; botButtonIndex++) {
            const fixedIndex = botButtonIndex - startingFixedIndex;
            MainScreen.getBottomButton(botButtonIndex).modify(fixedTextList[fixedIndex], clickFuncWrapper(fixedFuncList[fixedIndex]));
            if (fixedTextList[fixedIndex] === "")
                MainScreen.getBottomButton(botButtonIndex).hide();
        }
    }

    const hasPrevPage = startingIndex - startingFixedIndex > 0 ? true : false;
    if (hasPrevPage) {
        MainScreen.getBottomButton(prevButtonIndex).modify("Prev", () => {
            displayPage(startingIndex - startingFixedIndex, textList, funcList);
        });
    }
    else {
        MainScreen.getBottomButton(prevButtonIndex).modify("Prev", undefined, true);
    }

    const hasNextPage = startingIndex + startingFixedIndex < textList.length ? true : false;
    if (hasNextPage) {
        MainScreen.getBottomButton(nextButtonIndex).modify("Next", () => {
            displayPage(startingIndex + startingFixedIndex, textList, funcList);
        });
    }
    else {
        MainScreen.getBottomButton(nextButtonIndex).modify("Next", undefined, true);
    }
}

function doNext(func: ClickFunction) {
    MainScreen.hideBottomButtons();
    MainScreen.getBottomButton(MainScreen.NEXT_BUTTON_ID).modify("Next", clickFuncWrapper(func));
}

function doYesNo(yesFunc: ClickFunction, noFunc: ClickFunction) {
    MainScreen.hideBottomButtons();
    MainScreen.getBottomButton(MainScreen.YES_BUTTON_ID).modify("Yes", clickFuncWrapper(yesFunc));
    MainScreen.getBottomButton(MainScreen.NO_BUTTON_ID).modify("No", clickFuncWrapper(noFunc));
}

export function displayNextScreenChoices(nextScene: NextScreenChoices) {
    updateStats();
    if (nextScene || queue.length > 0) {
        if (nextScene.yes && nextScene.no) {
            doYesNo(nextScene.yes, nextScene.no);
        }
        else if (nextScene.next) {
            doNext(nextScene.next);
        }
        else if (nextScene.choices.length === 2) {
            if (nextScene.persistantChoices && nextScene.persistantChoices.length === 2)
                displayChoices(nextScene.choices[0], nextScene.choices[1], nextScene.persistantChoices[0], nextScene.persistantChoices[1]);
            else
                displayChoices(nextScene.choices[0], nextScene.choices[1]);
        }
    }
    else {
        alert("No Next Scene could be found");
        console.trace("No Next Scene found.");
        console.log("Last Scene: " + lastScreen);
    }
}

const queue: ClickFunction[] = [];

export function queueScreen(screen: ClickFunction) {
    queue.push(screen);
}

export function displayScreenQueue(): void {
    if (queue.length > 0) {
        queue.shift()(User.char);
    }
}
