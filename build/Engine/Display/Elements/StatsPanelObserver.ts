import ScreenElement from './ScreenElement';
import StatPanelObserver from './StatPanelObserver';
import { loadFromId } from '../../Utilities/Html';

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
        this.statPanels[StatType.Strength].setHTMLElement(loadFromId("strengthPanel"));
        this.statPanels[StatType.Toughness].setHTMLElement(loadFromId("toughnessPanel"));
        this.statPanels[StatType.Speed].setHTMLElement(loadFromId("speedPanel"));
        this.statPanels[StatType.Intelligence].setHTMLElement(loadFromId("intelligencePanel"));
        this.statPanels[StatType.Libido].setHTMLElement(loadFromId("libidoPanel"));
        this.statPanels[StatType.Sensitivity].setHTMLElement(loadFromId("sensitivityPanel"));
        this.statPanels[StatType.Corruption].setHTMLElement(loadFromId("corruptionPanel"));
        this.statPanels[StatType.HP].setHTMLElement(loadFromId("hpPanel"));
        this.statPanels[StatType.Lust].setHTMLElement(loadFromId("lustPanel"));
        this.statPanels[StatType.Fatigue].setHTMLElement(loadFromId("fatiguePanel"));
        // this.statPanels[StatType.Fullness].setHTMLElement(loadFromId("fullnessPanel"));
        this.statPanels[StatType.Level].setHTMLElement(loadFromId("levelPanel"));
        this.statPanels[StatType.Xp].setHTMLElement(loadFromId("xpPanel"));
        this.statPanels[StatType.Gems].setHTMLElement(loadFromId("gemsPanel"));
    }

    public getStat(type: StatType): StatPanelObserver {
        return this.statPanels[type];
    }
}
