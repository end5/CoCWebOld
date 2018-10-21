import { ButtonElement } from './Elements/ButtonElement';
import { ImageElement } from './Elements/ImageElement';
import { ParagraphElement } from './Elements/ParagraphElement';
import { StatsPanelObserver } from './Elements/StatsPanelObserver';
import { loadFromId } from '../Utilities/Html';

export enum TopButton {
    MainMenu,
    Data,
    Stats,
    PerkUp,
    Perks,
    Appearance
}

class MainScreenFacade {
    private bottomButtons: ButtonElement[];
    private topButtons: ButtonElement[];
    private nameDisplay: ParagraphElement;
    private statsPanel: StatsPanelObserver;
    private levelupIcon: ImageElement;
    private timeDayElement: ParagraphElement;
    private timeHourElement: ParagraphElement;

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
        return this.topButtons[buttonNumber];
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
    public getTimeDayElement(): ParagraphElement {
        return this.timeDayElement;
    }

    public getTimeHourElement(): ParagraphElement {
        return this.timeHourElement;
    }

    public getBottomButton(buttonNumber: number): ButtonElement | undefined {
        if (buttonNumber < 0 && buttonNumber >= this.NUM_BOT_BUTTONS) return;
        return this.bottomButtons[buttonNumber];
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
}

export const MainScreen = new MainScreenFacade();
