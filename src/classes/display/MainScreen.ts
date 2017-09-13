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
        this.statPanelElement = document.getElementById(statPanelName);
        if (this.statPanelElement.getElementsByClassName("statsBar").length != 0)
            this.statBarElement = <HTMLElement>this.statPanelElement.getElementsByClassName("statsBar")[0];
        if (this.statPanelElement.getElementsByClassName("statsCurrent").length != 0)
            this.statCurrentElement = <HTMLElement>this.statPanelElement.getElementsByClassName("statsCurrent")[0];
        if (this.statPanelElement.getElementsByClassName("statsMax").length != 0)
            this.statMaxElement = <HTMLElement>this.statPanelElement.getElementsByClassName("statsMax")[0];
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

export default class MainScreen {
    private static mainTextDisplay: HTMLElement;
    private static bottomButtons: HTMLElement[];
    private static topButtons: HTMLElement[];
    private static nameDisplay: HTMLElement;
    private static statsPanels: StatPanel[];
    private static levelupIcon: HTMLElement;
    private static timeDayPanel: HTMLElement;
    private static timeHourPanel: HTMLElement;

    public constructor() {
        MainScreen.mainTextDisplay = document.getElementById("mainTextDisplay");
        if (!MainScreen.mainTextDisplay)
            throw new Error("Could not find main text display on page");
        MainScreen.bottomButtons = [];
        for (let index = 0; index < 10; index++) {
            MainScreen.bottomButtons.push(document.getElementById("button" + index));
            if (!MainScreen.bottomButtons[index])
                throw new Error("Could not find button" + index + " on page");
        }
        MainScreen.topButtons = [];
        for (let index = 0; index < 10; index++) {
            MainScreen.topButtons.push(document.getElementById("buttontop" + index));
            if (!MainScreen.topButtons[index])
                throw new Error("Could not find buttontop" + index + " on page");
        }

        MainScreen.nameDisplay = document.getElementById("nameDisplay");
        if (!MainScreen.nameDisplay)
            throw new Error("Could not find time day panel on page");
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
        for (let index = 0; index < 14; index++) {
            if (!MainScreen.statsPanels[index])
                throw new Error("Could not find panel " + index + " on page");
        }


        MainScreen.levelupIcon = document.getElementById("levelupIcon");
        if (!MainScreen.levelupIcon)
            throw new Error("Could not find level up icon on page");
        MainScreen.timeDayPanel = document.getElementById("timeDay");
        if (!MainScreen.timeDayPanel)
            throw new Error("Could not find time day panel on page");
        MainScreen.timeHourPanel = document.getElementById("timeHour");
        if (!MainScreen.timeHourPanel)
            throw new Error("Could not find time hour panel on page");

    }

    public static setStat(statType: StatType, statCurrent: number, statMax: number = -1) {
        MainScreen.statsPanels[statType].setStat(statCurrent, statMax);
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

    public static text(text: string, purgeText: boolean = false, parseAsMarkdown: boolean = false) {
        if (purgeText) {
            MainScreen.clearText();
        }

        text = this.parser.recursiveParser(text, parseAsMarkdown);

        //OUTPUT!
        if (purgeText) {
            MainScreen.mainTextDisplay.innerText = text;
        }
        else {
            MainScreen.mainTextDisplay.innerText += text;
        }
    }

    public static clearText() {
        MainScreen.mainTextDisplay.innerText = "";
    }

    public static showButton(buttonNumber: number) {
        if (buttonNumber >= 0 && buttonNumber < 10) {
            MainScreen.bottomButtons[buttonNumber].style.visibility = "visible";
        }
    }

    public static showButtons() {
        for (let buttonNumber: number = 0; buttonNumber < 10; buttonNumber++) {
            MainScreen.bottomButtons[buttonNumber].style.visibility = "visible";
        }
    }

    public static hideButton(buttonNumber: number) {
        if (buttonNumber >= 0 && buttonNumber < 10) {
            MainScreen.bottomButtons[buttonNumber].style.visibility = "hidden";
        }
    }

    public static hideButtons() {
        for (let buttonNumber: number = 0; buttonNumber < 10; buttonNumber++) {
            MainScreen.bottomButtons[buttonNumber].style.visibility = "hidden";
        }
    }

    public static addButton(buttonNumber: number, text: string, func: () => void, disabled: boolean = false) {
        if (buttonNumber >= 0 && buttonNumber < 10) {
            let button = MainScreen.bottomButtons[buttonNumber];
            if (button.style.visibility != "visible")
                button.style.visibility = "visible";
            button.textContent = text;
            button.addEventListener('click', func);
        }
    }

    public static displayChoices(text: string[], func: (() => void)[]) {
        for (let index = 0; index < text.length; index++) {
            MainScreen.addButton(index, text[index], func[index]);
        }
    }
}