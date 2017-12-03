import ScreenElement from './ScreenElement';
import StatElement from './StatElement';
import HtmlUtils from '../../Utilities/HtmlUtils';

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

export default class StatsPanel extends ScreenElement {
    private readonly statPanels: StatElement[];
    public constructor(element: HTMLElement) {
        super(element);
        this.statPanels = [];
        this.statPanels.push(new StatElement(HtmlUtils.loadFromId("StrengthPanel")));
        this.statPanels.push(new StatElement(HtmlUtils.loadFromId("ToughnessPanel")));
        this.statPanels.push(new StatElement(HtmlUtils.loadFromId("SpeedPanel")));
        this.statPanels.push(new StatElement(HtmlUtils.loadFromId("IntelligencePanel")));
        this.statPanels.push(new StatElement(HtmlUtils.loadFromId("LibidoPanel")));
        this.statPanels.push(new StatElement(HtmlUtils.loadFromId("SensitivityPanel")));
        this.statPanels.push(new StatElement(HtmlUtils.loadFromId("CorruptionPanel")));
        this.statPanels.push(new StatElement(HtmlUtils.loadFromId("HPPanel")));
        this.statPanels.push(new StatElement(HtmlUtils.loadFromId("LustPanel")));
        this.statPanels.push(new StatElement(HtmlUtils.loadFromId("FatiguePanel")));
        this.statPanels.push(new StatElement(HtmlUtils.loadFromId("FullnessPanel")));
        this.statPanels.push(new StatElement(HtmlUtils.loadFromId("LevelPanel")));
        this.statPanels.push(new StatElement(HtmlUtils.loadFromId("XpPanel")));
        this.statPanels.push(new StatElement(HtmlUtils.loadFromId("GemsPanel")));
    }

    protected create(): HTMLElement {
        return null;
    }

    public getStat(type: StatType): StatElement {
        return this.statPanels[type];
    }
}