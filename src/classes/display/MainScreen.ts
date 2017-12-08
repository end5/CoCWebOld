﻿import ButtonElement, { ClickFunction } from './Elements/ButtonElement';
import ImageElement from './Elements/ImageElement';
import StatsPanel from './Elements/StatsPanel';
import TextElement from './Elements/TextElement';
import MainDisplay from './MainDisplay';
import Game from '../Game/Game';
import Player from '../Player/Player';
import HtmlUtils from '../Utilities/HtmlUtils';

export enum TopButton {
    MainMenu,
    Data,
    Stats,
    PerkUp,
    Perks,
    Appearance
}

export default class MainScreen {
    public static readonly screen: MainDisplay = new MainDisplay();
    private static bottomButtons: ButtonElement[];
    private static topButtons: ButtonElement[];
    private static nameDisplay: TextElement;
    private static statsPanel: StatsPanel;
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
            MainScreen.bottomButtons.push(new ButtonElement(<HTMLAnchorElement>HtmlUtils.loadFromId("button" + index)));
        }

        MainScreen.topButtons = [];
        for (let index = 0; index < MainScreen.NUM_TOP_BUTTONS; index++) {
            MainScreen.topButtons.push(new ButtonElement(<HTMLAnchorElement>HtmlUtils.loadFromId("buttontop" + index)));
        }

        MainScreen.statsPanel = new StatsPanel(<HTMLAnchorElement>HtmlUtils.loadFromId("statsPanel"));
        MainScreen.nameDisplay = new TextElement(<HTMLParagraphElement>HtmlUtils.loadFromId("nameDisplay"));

        MainScreen.levelupIcon = new ImageElement(<HTMLImageElement>HtmlUtils.loadFromId("levelupIcon"));
        MainScreen.timeDayElement = new TextElement(<HTMLParagraphElement>HtmlUtils.loadFromId("timeDay"));
        MainScreen.timeHourElement = new TextElement(<HTMLParagraphElement>HtmlUtils.loadFromId("timeHour"));
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
    public static getStatsPanel(): StatsPanel {
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
    public static displayChoices(textList: string[], funcList: ClickFunction[]) {
        if (textList.length <= MainScreen.NUM_BOT_BUTTONS) {
            MainScreen.hideBottomButtons();
            for (let index = 0; index < textList.length; index++) {
                MainScreen.bottomButtons[index].modify(textList[index], funcList[index]);
                MainScreen.bottomButtons[index].show();
            }
        }
        else {
            MainScreen.displayPage(0, textList, funcList);
        }
    }

    private static displayPage(startingIndex: number, textList: string[], funcList: ClickFunction[]) {
        MainScreen.hideBottomButtons();
        for (let index = 0; index < MainScreen.NUM_BOT_BUTTONS - 2; index++) {
            MainScreen.bottomButtons[index].modify(textList[index + startingIndex], funcList[index + startingIndex]);
            MainScreen.bottomButtons[index].show();
        }

        const hasPrevPage = startingIndex - MainScreen.NUM_BOT_BUTTONS - 2 > 0 ? true : false;
        if (hasPrevPage) {
            MainScreen.bottomButtons[MainScreen.NUM_BOT_BUTTONS - 2].modify("Prev", function () {
                MainScreen.displayPage(startingIndex - MainScreen.NUM_BOT_BUTTONS - 2, textList, funcList);
            });
        }
        else {
            MainScreen.bottomButtons[MainScreen.NUM_BOT_BUTTONS - 2].modify("Prev", null, true);
        }

        const hasNextPage = startingIndex + MainScreen.NUM_BOT_BUTTONS - 2 < textList.length ? true : false;
        if (hasNextPage) {
            MainScreen.bottomButtons[MainScreen.NUM_BOT_BUTTONS - 1].modify("Next", function () {
                MainScreen.displayPage(startingIndex + MainScreen.NUM_BOT_BUTTONS - 2, textList, funcList);
            });
        }
        else {
            MainScreen.bottomButtons[MainScreen.NUM_BOT_BUTTONS - 1].modify("Next", null, true);
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