import ScreenElement from './ScreenElement';
import StatPanelObserver from './StatPanelObserver';
import { Utils } from '../../Utilities/Utils';

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
        this.statPanels[StatType.Strength].setHTMLElement(Utils.loadFromId("StrengthPanel"));
        this.statPanels[StatType.Toughness].setHTMLElement(Utils.loadFromId("ToughnessPanel"));
        this.statPanels[StatType.Speed].setHTMLElement(Utils.loadFromId("SpeedPanel"));
        this.statPanels[StatType.Intelligence].setHTMLElement(Utils.loadFromId("IntelligencePanel"));
        this.statPanels[StatType.Libido].setHTMLElement(Utils.loadFromId("LibidoPanel"));
        this.statPanels[StatType.Sensitivity].setHTMLElement(Utils.loadFromId("SensitivityPanel"));
        this.statPanels[StatType.Corruption].setHTMLElement(Utils.loadFromId("CorruptionPanel"));
        this.statPanels[StatType.HP].setHTMLElement(Utils.loadFromId("HPPanel"));
        this.statPanels[StatType.Lust].setHTMLElement(Utils.loadFromId("LustPanel"));
        this.statPanels[StatType.Fatigue].setHTMLElement(Utils.loadFromId("FatiguePanel"));
        this.statPanels[StatType.Fullness].setHTMLElement(Utils.loadFromId("FullnessPanel"));
        this.statPanels[StatType.Level].setHTMLElement(Utils.loadFromId("LevelPanel"));
        this.statPanels[StatType.Xp].setHTMLElement(Utils.loadFromId("XpPanel"));
        this.statPanels[StatType.Gems].setHTMLElement(Utils.loadFromId("GemsPanel"));
    }

    public getStat(type: StatType): StatPanelObserver {
        return this.statPanels[type];
    }
}
