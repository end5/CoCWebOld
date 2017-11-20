import DisplayText from './DisplayText';
import Game from '../Game/Game';
import Player from '../Player/Player';
import HtmlUtils from '../Utilities/HtmlUtils';

export enum StatType {
    Strength,
    Toughness,
    Speed,
    Intelligence,
    Libido,
    Sensitivity,
    Corruption,
    HP,
    Lust,
    Fatigue,
    Fullness,
    Level,
    Xp,
    Gems
}

class StatPanel {
    private statPanelElement: HTMLElement;
    private statBarElement: HTMLElement;
    private statCurrentElement: HTMLElement;
    private statMaxElement: HTMLElement;
    private statMax: number;
    private statCurrent: number;

    public constructor(statPanelName: string) {
        this.statPanelElement = HtmlUtils.loadFromId(statPanelName);
        this.statBarElement = HtmlUtils.loadFromClassName("statsBar", this.statPanelElement);
        this.statCurrentElement = HtmlUtils.loadFromClassName("statsCurrent", this.statPanelElement);
        this.statMaxElement = HtmlUtils.loadFromClassName("statsMax", this.statPanelElement);
        this.statCurrent = 0;
        this.statMax = 100;
    }

    public setStat(statCurrent: number, statMax: number = -1) {
        this.statCurrent = statCurrent;
        this.statCurrentElement.innerHTML = statCurrent.toString();
        if (this.statBarElement) {
            if (statMax >= 0) {
                this.statMax = statMax;
                this.statMaxElement.innerHTML = statMax.toString();
            }
            if (this.statMax <= 0 || this.statCurrent <= 0)
                this.statBarElement.style.width = "0%";
            else
                this.statBarElement.style.width = (this.statCurrent / this.statMax * 100).toString() + "%";
        }
    }
}

export enum TopButton {
    MainMenu,
    Data,
    Stats,
    PerkUp,
    Perks,
    Appearance
}

export interface ClickFunction {
    (player: Player): void;

}

export default class MainScreen {
    private static mainTextDisplay: HTMLElement;
    private static bottomButtons: HTMLElement[];
    private static topButtons: HTMLElement[];
    private static nameDisplay: HTMLElement;
    private static statsPanel: HTMLElement;
    private static statsPanels: StatPanel[];
    private static levelupIcon: HTMLElement;
    private static timeDayPanel: HTMLElement;
    private static timeHourPanel: HTMLElement;
    private static topButtonFuncs: EventListener[];
    private static bottomButtonFuncs: EventListener[];

    public constructor() {
        MainScreen.mainTextDisplay = HtmlUtils.loadFromId("mainTextDisplay");

        MainScreen.bottomButtons = [];
        for (let index = 0; index < 10; index++) {
            MainScreen.bottomButtons.push(HtmlUtils.loadFromId("button" + index));
        }
        MainScreen.bottomButtonFuncs = [];
        MainScreen.bottomButtonFuncs.length = 10;

        MainScreen.topButtons = [];
        for (let index = 0; index < 6; index++) {
            MainScreen.topButtons.push(HtmlUtils.loadFromId("buttontop" + index));
        }
        MainScreen.topButtonFuncs = [];
        MainScreen.topButtonFuncs.length = 6;

        MainScreen.statsPanel = HtmlUtils.loadFromId("statsPanel");
        MainScreen.nameDisplay = HtmlUtils.loadFromId("nameDisplay");
        MainScreen.statsPanels.push(new StatPanel("StrengthPanel"));
        MainScreen.statsPanels.push(new StatPanel("ToughnessPanel"));
        MainScreen.statsPanels.push(new StatPanel("SpeedPanel"));
        MainScreen.statsPanels.push(new StatPanel("IntelligencePanel"));
        MainScreen.statsPanels.push(new StatPanel("LibidoPanel"));
        MainScreen.statsPanels.push(new StatPanel("SensitivityPanel"));
        MainScreen.statsPanels.push(new StatPanel("CorruptionPanel"));
        MainScreen.statsPanels.push(new StatPanel("HPPanel"));
        MainScreen.statsPanels.push(new StatPanel("LustPanel"));
        MainScreen.statsPanels.push(new StatPanel("FatiguePanel"));
        MainScreen.statsPanels.push(new StatPanel("FullnessPanel"));
        MainScreen.statsPanels.push(new StatPanel("LevelPanel"));
        MainScreen.statsPanels.push(new StatPanel("XpPanel"));
        MainScreen.statsPanels.push(new StatPanel("GemsPanel"));

        MainScreen.levelupIcon = HtmlUtils.loadFromId("levelupIcon");
        MainScreen.timeDayPanel = HtmlUtils.loadFromId("timeDay");
        MainScreen.timeHourPanel = HtmlUtils.loadFromId("timeHour");

        DisplayText.register(MainScreen.mainTextDisplay);

    }

    // Top Buttons
    public static showTopButton(buttonNumber: TopButton) {
        if (buttonNumber >= 0 && buttonNumber < 6) {
            HtmlUtils.showElement(MainScreen.topButtons[buttonNumber]);
        }
    }

    public static hideTopButton(buttonNumber: TopButton) {
        if (buttonNumber >= 0 && buttonNumber < 6) {
            HtmlUtils.hideElement(MainScreen.topButtons[buttonNumber]);
        }
    }

    public static showTopButtons() {
        for (let buttonNumber: number = 0; buttonNumber < 6; buttonNumber++) {
            HtmlUtils.showElement(MainScreen.topButtons[buttonNumber]);
        }
    }

    public static hideTopButtons() {
        for (let buttonNumber: number = 0; buttonNumber < 6; buttonNumber++) {
            HtmlUtils.hideElement(MainScreen.topButtons[buttonNumber]);
        }
    }

    public static setTopButton(buttonNumber: TopButton, text: string, func: ClickFunction, disabled: boolean = false) {
        if (buttonNumber >= 0 && buttonNumber < 6) {
            let button = MainScreen.topButtons[buttonNumber];
            HtmlUtils.showElement(button);
            button.textContent = text;
            button.removeEventListener('click', MainScreen.topButtonFuncs[buttonNumber]);
            MainScreen.topButtonFuncs[buttonNumber] = function (evnt: Event) {
                func(Game.player);
            };
            button.addEventListener('click', MainScreen.topButtonFuncs[buttonNumber]);
        }
    }

    // Stat Panel
    public static hideStatsPanel() {
        HtmlUtils.hideElement(this.statsPanel);
    }

    public static showStatsPanel() {
        HtmlUtils.showElement(this.statsPanel);
    }

    public static setStat(statType: StatType, statCurrent: number, statMax: number = -1) {
        MainScreen.statsPanels[statType].setStat(statCurrent, statMax);
    }

    public static updateStats(player: Player) {

    }

    public static showLevelUpIcon() {
        MainScreen.levelupIcon.style.visibility = "visible";
    }

    public static hideLevelUpIcon() {
        MainScreen.levelupIcon.style.visibility = "hidden";
    }

    public static setTimeDay(day: number) {
        MainScreen.timeDayPanel.innerText = day.toString();
    }

    public static setTimeHour(hour: number) {
        MainScreen.timeHourPanel.innerText = hour.toString();
    }

    // Bottom buttons
    public static showButton(buttonNumber: number) {
        if (buttonNumber >= 0 && buttonNumber < 10) {
            HtmlUtils.showElement(MainScreen.bottomButtons[buttonNumber]);
        }
    }

    public static showButtons() {
        for (let buttonNumber: number = 0; buttonNumber < 10; buttonNumber++) {
            HtmlUtils.showElement(MainScreen.bottomButtons[buttonNumber]);
        }
    }

    public static hideButton(buttonNumber: number) {
        if (buttonNumber >= 0 && buttonNumber < 10) {
            HtmlUtils.hideElement(MainScreen.bottomButtons[buttonNumber]);
        }
    }

    public static hideButtons() {
        for (let buttonNumber: number = 0; buttonNumber < 10; buttonNumber++) {
            HtmlUtils.hideElement(MainScreen.bottomButtons[buttonNumber]);
        }
    }

    public static addButton(buttonNumber: number, text: string, func: ClickFunction, disabled: boolean = false) {
        if (buttonNumber >= 0 && buttonNumber < 10) {
            let button = MainScreen.bottomButtons[buttonNumber];
            HtmlUtils.showElement(button);
            button.textContent = text;
            button.removeEventListener('click', MainScreen.bottomButtonFuncs[buttonNumber]);
            MainScreen.bottomButtonFuncs[buttonNumber] = func;
            button.addEventListener('click', MainScreen.bottomButtonFuncs[buttonNumber]);
        }
    }

    public static displayChoices(text: string[], func: ClickFunction[]) {
        for (let index = 0; index < text.length; index++) {
            MainScreen.addButton(index, text[index], func[index]);
        }
    }

    public static addBackButton(name: string, func: ClickFunction) {
        MainScreen.addButton(9, name, func);
    }

    public static doNext(func: ClickFunction) {
        MainScreen.hideButtons();
        MainScreen.addButton(0, "Next", func);
    }

    public static doYesNo(yesFunc: ClickFunction, noFunc: ClickFunction) {
        MainScreen.hideButtons();
        MainScreen.addButton(0, "Yes", yesFunc);
        MainScreen.addButton(1, "No", noFunc);
    }
}