import ButtonElement, { ClickFunction } from './Elements/ButtonElement';
import ImageElement from './Elements/ImageElement';
import ParagraphElement from './Elements/ParagraphElement';
import StatsPanelObserver from './Elements/StatsPanelObserver';
import TextElement from './Elements/TextElement';
import { loadFromId } from '../Utilities/Html';

export enum TopButton {
    MainMenu,
    Data,
    Stats,
    PerkUp,
    Perks,
    Appearance
}

class ScreenInterface {
    private bottomButtons: ButtonElement[];
    private topButtons: ButtonElement[];
    private nameDisplay: TextElement;
    private statsPanel: StatsPanelObserver;
    private levelupIcon: ImageElement;
    private timeDayElement: TextElement;
    private timeHourElement: TextElement;

    public readonly NUM_TOP_BUTTONS = 6;
    public readonly NUM_BOT_BUTTONS = 10;
    public readonly NEXT_BUTTON_ID = 0;
    public readonly BACK_BUTTON_ID = this.NUM_BOT_BUTTONS - 1;
    public readonly YES_BUTTON_ID = 0;
    public readonly NO_BUTTON_ID = 1;

    public constructor() {
        this.bottomButtons = [];
        for (let index = 0; index < this.NUM_BOT_BUTTONS; index++) {
            const newButton = new ButtonElement();
            newButton.setHTMLElement(loadFromId("button" + index) as HTMLAnchorElement);
            this.bottomButtons.push(newButton);
        }

        this.topButtons = [];
        for (let index = 0; index < this.NUM_TOP_BUTTONS; index++) {
            const newButton = new ButtonElement();
            newButton.setHTMLElement(loadFromId("buttontop" + index) as HTMLAnchorElement);
            this.topButtons.push(newButton);
        }

        this.statsPanel = new StatsPanelObserver();
        this.statsPanel.setHTMLElement(loadFromId("statsPanel") as HTMLAnchorElement);
        this.nameDisplay = new ParagraphElement();
        this.nameDisplay.setHTMLElement(loadFromId("nameDisplay") as HTMLParagraphElement);

        this.levelupIcon = new ImageElement();
        this.levelupIcon.setHTMLElement(loadFromId("levelupIcon") as HTMLImageElement);
        this.timeDayElement = new ParagraphElement();
        this.timeDayElement.setHTMLElement(loadFromId("timeDay") as HTMLParagraphElement);
        this.timeHourElement = new ParagraphElement();
        this.timeHourElement.setHTMLElement(loadFromId("timeHour") as HTMLParagraphElement);
    }

    // Top Buttons
    public getTopButton(buttonNumber: TopButton): ButtonElement {
        if (buttonNumber >= 0 && buttonNumber < this.NUM_TOP_BUTTONS) {
            return this.topButtons[buttonNumber];
        }
    }

    public showTopButtons() {
        for (let buttonNumber: number = 0; buttonNumber < this.NUM_TOP_BUTTONS; buttonNumber++) {
            this.topButtons[buttonNumber].show();
        }
    }

    public hideTopButtons() {
        for (let buttonNumber: number = 0; buttonNumber < this.NUM_TOP_BUTTONS; buttonNumber++) {
            this.topButtons[buttonNumber].hide();
        }
    }

    // Stats
    public getStatsPanel(): StatsPanelObserver {
        return this.statsPanel;
    }

    public getLevelUpIcon(): ImageElement {
        return this.levelupIcon;
    }

    // Time
    public getTimeDayElement(): TextElement {
        return this.timeDayElement;
    }

    public getTimeHourElement(hour: number): TextElement {
        return this.timeHourElement;
    }

    // Bottom Buttons
    public getBottomButton(buttonNumber: number): ButtonElement {
        if (buttonNumber >= 0 && buttonNumber < this.NUM_BOT_BUTTONS) {
            return this.bottomButtons[buttonNumber];
        }
    }

    public showBottomButtons() {
        for (let buttonNumber: number = 0; buttonNumber < this.NUM_BOT_BUTTONS; buttonNumber++) {
            this.bottomButtons[buttonNumber].show();
        }
    }

    public hideBottomButtons() {
        for (let buttonNumber: number = 0; buttonNumber < this.NUM_BOT_BUTTONS; buttonNumber++) {
            this.bottomButtons[buttonNumber].hide();
        }
    }

    // Misc
    /**
     * Displays choices on the buttons on the bottom of the screen.
     * The textList should be the same size as the funcList.
     * The textList is displayed starting from the first button.
     * The textList will automatically create pages if its length is greater than the amount of buttons.
     * The fixedTextList should be the same size as fixedFuncList.
     * The fixedTextList is displayed starting from the last button minus the fixedTextList length.
     * The fixedTextList is displayed on every page and will not create new pages.
     * @param textList A list of text to appear on the buttons. If a string is empty or undefined, the button will be disabled.
     * @param funcList A list of ClickFunctions that will trigger when the buttons are clicked. If the ClickFunction is null or undefined, the button is disabled.
     * @param fixedTextList A list of text to appear on the buttons. If a string is empty or undefined, the button will be disabled.
     * @param fixedFuncList A list of ClickFunctions that will trigger when the buttons are clicked. If the ClickFunction is null or undefined, the button is disabled.
     */
    public displayChoices(textList: string[], funcList: ClickFunction[], fixedTextList?: string[], fixedFuncList?: ClickFunction[]) {
        const fixedCount = fixedTextList ? fixedTextList.length : 0;
        if (textList.length + fixedCount <= this.NUM_BOT_BUTTONS) {
            this.hideBottomButtons();
            for (let index = 0; index < textList.length; index++) {
                this.bottomButtons[index].modify(textList[index], funcList[index]);
                this.bottomButtons[index].show();
            }
            if (fixedCount > 0) {
                const startingIndex = this.NUM_BOT_BUTTONS - fixedCount;
                for (let botButtonIndex = startingIndex; botButtonIndex < this.NUM_BOT_BUTTONS; botButtonIndex++) {
                    const fixedIndex = botButtonIndex - startingIndex;
                    this.bottomButtons[botButtonIndex].modify(fixedTextList[fixedIndex], fixedFuncList[fixedIndex]);
                }
            }
        }
        else {
            this.displayPage(0, textList, funcList, fixedTextList, fixedFuncList);
        }
    }

    private displayPage(startingIndex: number, textList: string[], funcList: ClickFunction[], fixedTextList?: string[], fixedFuncList?: ClickFunction[]) {
        this.hideBottomButtons();
        const pageNavIndex = this.NUM_BOT_BUTTONS - 2;
        const prevButtonIndex = pageNavIndex;
        const nextButtonIndex = pageNavIndex + 1;
        const fixedCount = fixedTextList ? fixedTextList.length : 0;
        const startingFixedIndex = pageNavIndex - fixedCount;
        for (let index = 0; index < startingFixedIndex && index + startingIndex < textList.length; index++) {
            this.bottomButtons[index].modify(textList[index + startingIndex], funcList[index + startingIndex]);
            this.bottomButtons[index].show();
        }
        if (fixedCount > 0) {
            for (let botButtonIndex = startingFixedIndex; botButtonIndex < pageNavIndex; botButtonIndex++) {
                const fixedIndex = botButtonIndex - startingFixedIndex;
                this.bottomButtons[botButtonIndex].modify(fixedTextList[fixedIndex], fixedFuncList[fixedIndex]);
            }
        }

        const hasPrevPage = startingIndex - startingFixedIndex > 0 ? true : false;
        if (hasPrevPage) {
            this.bottomButtons[prevButtonIndex].modify("Prev", () => {
                this.displayPage(startingIndex - startingFixedIndex, textList, funcList);
            });
        }
        else {
            this.bottomButtons[prevButtonIndex].modify("Prev", undefined, true);
        }

        const hasNextPage = startingIndex + startingFixedIndex < textList.length ? true : false;
        if (hasNextPage) {
            this.bottomButtons[nextButtonIndex].modify("Next", () => {
                this.displayPage(startingIndex + startingFixedIndex, textList, funcList);
            });
        }
        else {
            this.bottomButtons[nextButtonIndex].modify("Next", undefined, true);
        }
    }

    public addBackButton(name: string, func: ClickFunction) {
        this.bottomButtons[this.BACK_BUTTON_ID].modify(name, func);
    }

    public doNext(func: ClickFunction) {
        this.hideBottomButtons();
        this.bottomButtons[this.NEXT_BUTTON_ID].modify("Next", func);
    }

    public doYesNo(yesFunc: ClickFunction, noFunc: ClickFunction) {
        this.hideBottomButtons();
        this.bottomButtons[this.YES_BUTTON_ID].modify("Yes", yesFunc);
        this.bottomButtons[this.NO_BUTTON_ID].modify("No", noFunc);
    }
}

const MainScreen: ScreenInterface = new ScreenInterface();
export default MainScreen;
