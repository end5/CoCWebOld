import { ScreenElement } from './ScreenElement';
import { StatPanelObserver } from './StatPanelObserver';
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

export class StatsPanelObserver extends ScreenElement<HTMLElement> {
    private statPanels: StatPanelObserver[] = [];
    public constructor() {
        super(loadFromId("statsPanel"));
        this.setStatPanels();
    }

    public setHTMLElement(element: HTMLElement) {
        super.setHTMLElement(element);
        this.setStatPanels();
    }

    private setStatPanels() {
        this.statPanels = [];
        this.statPanels[StatType.Strength] = new StatPanelObserver(loadFromId("strengthPanel"));
        this.statPanels[StatType.Toughness] = new StatPanelObserver(loadFromId("toughnessPanel"));
        this.statPanels[StatType.Speed] = new StatPanelObserver(loadFromId("speedPanel"));
        this.statPanels[StatType.Intelligence] = new StatPanelObserver(loadFromId("intelligencePanel"));
        this.statPanels[StatType.Libido] = new StatPanelObserver(loadFromId("libidoPanel"));
        this.statPanels[StatType.Sensitivity] = new StatPanelObserver(loadFromId("sensitivityPanel"));
        this.statPanels[StatType.Corruption] = new StatPanelObserver(loadFromId("corruptionPanel"));
        this.statPanels[StatType.HP] = new StatPanelObserver(loadFromId("hpPanel"));
        this.statPanels[StatType.Lust] = new StatPanelObserver(loadFromId("lustPanel"));
        this.statPanels[StatType.Fatigue] = new StatPanelObserver(loadFromId("fatiguePanel"));
        // this.statPanels[StatType.Fullness] = new StatPanelObserver(loadFromId("fullnessPanel"));
        this.statPanels[StatType.Level] = new StatPanelObserver(loadFromId("levelPanel"));
        this.statPanels[StatType.Xp] = new StatPanelObserver(loadFromId("xpPanel"));
        this.statPanels[StatType.Gems] = new StatPanelObserver(loadFromId("gemsPanel"));
    }

    public getStat(type: StatType): StatPanelObserver {
        return this.statPanels[type];
    }
}
