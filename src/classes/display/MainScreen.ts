import ButtonElement, { ClickFunction } from './Elements/ButtonElement';
import ImageElement from './Elements/ImageElement';
import ParagraphElement from './Elements/ParagraphElement';
import StatsPanelObserver from './Elements/StatsPanelObserver';
import TextElement from './Elements/TextElement';
import Game from '../Game/Game';
import Player from '../Player/Player';
import { Utils } from '../Utilities/Utils';

export enum TopButton {
    MainMenu,
    Data,
    Stats,
    PerkUp,
    Perks,
    Appearance
}

export default class MainScreen {
    private static bottomButtons: ButtonElement[];
    private static topButtons: ButtonElement[];
    private static nameDisplay: TextElement;
    private static statsPanel: StatsPanelObserver;
    private static levelupIcon: ImageElement;
    private static timeDayElement: TextElement;
    private static timeHourElement: TextElement;

    public static readonly NUM_TOP_BUTTONS = 6;
    public static readonly NUM_BOT_BUTTONS = 10;
    public static readonly NEXT_BUTTON_ID = 0;
    public static readonly BACK_BUTTON_ID = MainScreen.NUM_BOT_BUTTONS - 1;
    public static readonly YES_BUTTON_ID = 0;
    public static readonly NO_BUTTON_ID = 1;

    public constructor() {
        MainScreen.bottomButtons = [];
        for (let index = 0; index < MainScreen.NUM_BOT_BUTTONS; index++) {
            const newButton = new ButtonElement();
            newButton.setHTMLElement(Utils.loadFromId("button" + index) as HTMLAnchorElement);
            MainScreen.bottomButtons.push(newButton);
        }

        MainScreen.topButtons = [];
        for (let index = 0; index < MainScreen.NUM_TOP_BUTTONS; index++) {
            const newButton = new ButtonElement();
            newButton.setHTMLElement(Utils.loadFromId("buttontop" + index) as HTMLAnchorElement);
            MainScreen.topButtons.push(newButton);
        }

        MainScreen.statsPanel = new StatsPanelObserver();
        MainScreen.statsPanel.setHTMLElement(Utils.loadFromId("statsPanel") as HTMLAnchorElement);
        MainScreen.nameDisplay = new ParagraphElement();
        MainScreen.nameDisplay.setHTMLElement(Utils.loadFromId("nameDisplay") as HTMLParagraphElement);

        MainScreen.levelupIcon = new ImageElement();
        MainScreen.levelupIcon.setHTMLElement(Utils.loadFromId("levelupIcon") as HTMLImageElement);
        MainScreen.timeDayElement = new ParagraphElement();
        MainScreen.timeDayElement.setHTMLElement(Utils.loadFromId("timeDay") as HTMLParagraphElement);
        MainScreen.timeHourElement = new ParagraphElement();
        MainScreen.timeHourElement.setHTMLElement(Utils.loadFromId("timeHour") as HTMLParagraphElement);
    }

    // Top Buttons
    public static getTopButton(buttonNumber: TopButton): ButtonElement {
        if (buttonNumber >= 0 && buttonNumber < MainScreen.NUM_TOP_BUTTONS) {
            return MainScreen.topButtons[buttonNumber];
        }
    }

    public static showTopButtons() {
        for (let buttonNumber: number = 0; buttonNumber < MainScreen.NUM_TOP_BUTTONS; buttonNumber++) {
            MainScreen.topButtons[buttonNumber].show();
        }
    }

    public static hideTopButtons() {
        for (let buttonNumber: number = 0; buttonNumber < MainScreen.NUM_TOP_BUTTONS; buttonNumber++) {
            MainScreen.topButtons[buttonNumber].hide();
        }
    }

    // Stats
    public static getStatsPanel(): StatsPanelObserver {
        return MainScreen.statsPanel;
    }

    public static getLevelUpIcon(): ImageElement {
        return MainScreen.levelupIcon;
    }

    // Time
    public static getTimeDayElement(): TextElement {
        return MainScreen.timeDayElement;
    }

    public static getTimeHourElement(hour: number): TextElement {
        return MainScreen.timeHourElement;
    }

    // Bottom Buttons
    public static getBottomButton(buttonNumber: number): ButtonElement {
        if (buttonNumber >= 0 && buttonNumber < MainScreen.NUM_BOT_BUTTONS) {
            return MainScreen.bottomButtons[buttonNumber];
        }
    }

    public static showBottomButtons() {
        for (let buttonNumber: number = 0; buttonNumber < MainScreen.NUM_BOT_BUTTONS; buttonNumber++) {
            MainScreen.bottomButtons[buttonNumber].show();
        }
    }

    public static hideBottomButtons() {
        for (let buttonNumber: number = 0; buttonNumber < MainScreen.NUM_BOT_BUTTONS; buttonNumber++) {
            MainScreen.bottomButtons[buttonNumber].hide();
        }
    }

    // Misc
    public static displayChoices(textList: string[], funcList: ClickFunction[], fixedTextList?: string[], fixedFuncList?: ClickFunction[]) {
        const fixedCount = fixedTextList ? fixedTextList.length : 0;
        if (textList.length + fixedCount <= MainScreen.NUM_BOT_BUTTONS) {
            MainScreen.hideBottomButtons();
            for (let index = 0; index < textList.length; index++) {
                MainScreen.bottomButtons[index].modify(textList[index], funcList[index]);
                MainScreen.bottomButtons[index].show();
            }
            if (fixedCount > 0) {
                const startingIndex = MainScreen.NUM_BOT_BUTTONS - fixedCount;
                for (let botButtonIndex = startingIndex; botButtonIndex < MainScreen.NUM_BOT_BUTTONS; botButtonIndex++) {
                    const fixedIndex = botButtonIndex - startingIndex;
                    MainScreen.bottomButtons[botButtonIndex].modify(fixedTextList[fixedIndex], fixedFuncList[fixedIndex]);
                }
            }
        }
        else {
            MainScreen.displayPage(0, textList, funcList, fixedTextList, fixedFuncList);
        }
    }

    private static displayPage(startingIndex: number, textList: string[], funcList: ClickFunction[], fixedTextList?: string[], fixedFuncList?: ClickFunction[]) {
        MainScreen.hideBottomButtons();
        const pageNavIndex = MainScreen.NUM_BOT_BUTTONS - 2;
        const prevButtonIndex = pageNavIndex;
        const nextButtonIndex = pageNavIndex + 1;
        const fixedCount = fixedTextList ? fixedTextList.length : 0;
        const startingFixedIndex = pageNavIndex - fixedCount;
        for (let index = 0; index < startingFixedIndex && index + startingIndex < textList.length; index++) {
            MainScreen.bottomButtons[index].modify(textList[index + startingIndex], funcList[index + startingIndex]);
            MainScreen.bottomButtons[index].show();
        }
        if (fixedCount > 0) {
            for (let botButtonIndex = startingFixedIndex; botButtonIndex < pageNavIndex; botButtonIndex++) {
                const fixedIndex = botButtonIndex - startingFixedIndex;
                MainScreen.bottomButtons[botButtonIndex].modify(fixedTextList[fixedIndex], fixedFuncList[fixedIndex]);
            }
        }

        const hasPrevPage = startingIndex - startingFixedIndex > 0 ? true : false;
        if (hasPrevPage) {
            MainScreen.bottomButtons[prevButtonIndex].modify("Prev", () => {
                MainScreen.displayPage(startingIndex - startingFixedIndex, textList, funcList);
            });
        }
        else {
            MainScreen.bottomButtons[prevButtonIndex].modify("Prev", undefined, true);
        }

        const hasNextPage = startingIndex + startingFixedIndex < textList.length ? true : false;
        if (hasNextPage) {
            MainScreen.bottomButtons[nextButtonIndex].modify("Next", () => {
                MainScreen.displayPage(startingIndex + startingFixedIndex, textList, funcList);
            });
        }
        else {
            MainScreen.bottomButtons[nextButtonIndex].modify("Next", undefined, true);
        }
    }

    public static addBackButton(name: string, func: ClickFunction) {
        MainScreen.bottomButtons[MainScreen.BACK_BUTTON_ID].modify(name, func);
    }

    public static doNext(func: ClickFunction) {
        MainScreen.hideBottomButtons();
        MainScreen.bottomButtons[MainScreen.NEXT_BUTTON_ID].modify("Next", func);
    }

    public static doYesNo(yesFunc: ClickFunction, noFunc: ClickFunction) {
        MainScreen.hideBottomButtons();
        MainScreen.bottomButtons[MainScreen.YES_BUTTON_ID].modify("Yes", yesFunc);
        MainScreen.bottomButtons[MainScreen.NO_BUTTON_ID].modify("No", noFunc);
    }
}
