import DisplayText from './DisplayText';
import ButtonElement, { ClickFunction } from './Elements/ButtonElement';
import ImageElement from './Elements/ImageElement';
import StatsPanel from './Elements/StatsPanel';
import TextElement from './Elements/TextElement';
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

var NUM_TOP_BUTTONS = 6;
var NUM_BOT_BUTTONS = 10;
var NEXT_BUTTON_ID = 0;
var BACK_BUTTON_ID = 9;
var YES_BUTTON_ID = 0;
var NO_BUTTON_ID = 1;

export default class MainScreen {
    private static mainTextDisplay: TextElement;
    private static bottomButtons: ButtonElement[];
    private static topButtons: ButtonElement[];
    private static nameDisplay: TextElement;
    private static statsPanel: StatsPanel;
    private static levelupIcon: ImageElement;
    private static timeDayElement: TextElement;
    private static timeHourElement: TextElement;

    public constructor() {
        MainScreen.mainTextDisplay = new TextElement(HtmlUtils.loadFromId("mainTextDisplay"));

        MainScreen.bottomButtons = [];
        for (let index = 0; index < NUM_BOT_BUTTONS; index++) {
            MainScreen.bottomButtons.push(new ButtonElement(HtmlUtils.loadFromId("button" + index)));
        }

        MainScreen.topButtons = [];
        for (let index = 0; index < NUM_TOP_BUTTONS; index++) {
            MainScreen.topButtons.push(new ButtonElement(HtmlUtils.loadFromId("buttontop" + index)));
        }

        MainScreen.statsPanel = new StatsPanel(HtmlUtils.loadFromId("statsPanel"));
        MainScreen.nameDisplay = new TextElement(HtmlUtils.loadFromId("nameDisplay"));

        MainScreen.levelupIcon = new ImageElement(HtmlUtils.loadFromId("levelupIcon"));
        MainScreen.timeDayElement = new TextElement(HtmlUtils.loadFromId("timeDay"));
        MainScreen.timeHourElement = new TextElement(HtmlUtils.loadFromId("timeHour"));

        DisplayText.register(MainScreen.mainTextDisplay);
    }


    // Top Buttons
    public static getTopButton(buttonNumber: TopButton): ButtonElement {
        if (buttonNumber >= 0 && buttonNumber < NUM_TOP_BUTTONS) {
            return MainScreen.topButtons[buttonNumber];
        }
    }

    public static showTopButtons() {
        for (let buttonNumber: number = 0; buttonNumber < NUM_TOP_BUTTONS; buttonNumber++) {
            MainScreen.topButtons[buttonNumber].show();
        }
    }

    public static hideTopButtons() {
        for (let buttonNumber: number = 0; buttonNumber < NUM_TOP_BUTTONS; buttonNumber++) {
            MainScreen.topButtons[buttonNumber].hide();
        }
    }


    public static getStatsPanel(): StatsPanel {
        return MainScreen.statsPanel;
    }

    public static getLevelUpIcon(): ImageElement {
        return MainScreen.levelupIcon;
    }

    public static getTimeDayElement(): TextElement {
        return MainScreen.timeDayElement;
    }

    public static getTimeHourElement(hour: number): TextElement {
        return MainScreen.timeHourElement;
    }


    // Bottom Buttons
    public static getBottomButton(buttonNumber: number): ButtonElement {
        if (buttonNumber >= 0 && buttonNumber < NUM_BOT_BUTTONS) {
            return MainScreen.bottomButtons[buttonNumber];
        }
    }

    public static showBottomButtons() {
        for (let buttonNumber: number = 0; buttonNumber < NUM_BOT_BUTTONS; buttonNumber++) {
            MainScreen.bottomButtons[buttonNumber].show();
        }
    }

    public static hideBottomButtons() {
        for (let buttonNumber: number = 0; buttonNumber < NUM_BOT_BUTTONS; buttonNumber++) {
            MainScreen.bottomButtons[buttonNumber].hide();
        }
    }

    public static displayChoices(text: string[], func: ClickFunction[]) {
        for (let index = 0; index < text.length; index++) {
            MainScreen.bottomButtons[index].modify(text[index], func[index]);
        }
    }

    public static addBackButton(name: string, func: ClickFunction) {
        MainScreen.bottomButtons[BACK_BUTTON_ID].modify(name, func);
    }

    public static doNext(func: ClickFunction) {
        MainScreen.hideBottomButtons();
        MainScreen.bottomButtons[NEXT_BUTTON_ID].modify("Next", func);
    }

    public static doYesNo(yesFunc: ClickFunction, noFunc: ClickFunction) {
        MainScreen.hideBottomButtons();
        MainScreen.bottomButtons[YES_BUTTON_ID].modify("Yes", yesFunc);
        MainScreen.bottomButtons[NO_BUTTON_ID].modify("No", noFunc);
    }
}