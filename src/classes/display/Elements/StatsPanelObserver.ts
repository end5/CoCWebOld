import ScreenElement from './ScreenElement';
import StatPanelObserver from './StatPanelObserver';
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

export default class StatsPanelObserver extends ScreenElement {
    private statPanels: StatPanelObserver[];
    public setHTMLElement(element: HTMLElement) {
        this.statPanels = [];
        for (let index = 0; index < 14; index++)
            this.statPanels.push(new StatPanelObserver());
        this.statPanels[StatType.Strength].setHTMLElement(HtmlUtils.loadFromId("StrengthPanel"));
        this.statPanels[StatType.Toughness].setHTMLElement(HtmlUtils.loadFromId("ToughnessPanel"));
        this.statPanels[StatType.Speed].setHTMLElement(HtmlUtils.loadFromId("SpeedPanel"));
        this.statPanels[StatType.Intelligence].setHTMLElement(HtmlUtils.loadFromId("IntelligencePanel"));
        this.statPanels[StatType.Libido].setHTMLElement(HtmlUtils.loadFromId("LibidoPanel"));
        this.statPanels[StatType.Sensitivity].setHTMLElement(HtmlUtils.loadFromId("SensitivityPanel"));
        this.statPanels[StatType.Corruption].setHTMLElement(HtmlUtils.loadFromId("CorruptionPanel"));
        this.statPanels[StatType.HP].setHTMLElement(HtmlUtils.loadFromId("HPPanel"));
        this.statPanels[StatType.Lust].setHTMLElement(HtmlUtils.loadFromId("LustPanel"));
        this.statPanels[StatType.Fatigue].setHTMLElement(HtmlUtils.loadFromId("FatiguePanel"));
        this.statPanels[StatType.Fullness].setHTMLElement(HtmlUtils.loadFromId("FullnessPanel"));
        this.statPanels[StatType.Level].setHTMLElement(HtmlUtils.loadFromId("LevelPanel"));
        this.statPanels[StatType.Xp].setHTMLElement(HtmlUtils.loadFromId("XpPanel"));
        this.statPanels[StatType.Gems].setHTMLElement(HtmlUtils.loadFromId("GemsPanel"));
    }

    public getStat(type: StatType): StatPanelObserver {
        return this.statPanels[type];
    }
}