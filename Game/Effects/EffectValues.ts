import { IStatEffect, StatEffect, IStatModifier, StatModifier } from "../Body/Stat/StatEffect";

export interface IEffectValues {
    duration?: number;
    attack?: IStatEffect;
    weapon?: IStatEffect;
    spell?: IStatEffect;
    spellCost?: IStatModifier;
    defense?: IStatEffect;
    teaseChance?: number;
    teaseDamage?: number;
    str?: IStatEffect;
    tou?: IStatEffect;
    spe?: IStatEffect;
    int?: IStatEffect;
    lib?: IStatEffect;
    sens?: IStatEffect;
    cor?: IStatEffect;
    fatigue?: IStatEffect;
    hp?: IStatEffect;
    lust?: IStatEffect;
    femininity?: IStatEffect;
    fertility?: IStatEffect;
    cumQuantity?: IStatEffect;
    other?: { [x: string]: any };
}

export class EffectValues implements IEffectValues {
    public duration = 0;
    public readonly attack: StatEffect;
    public readonly weapon: StatEffect;
    public readonly spell: StatEffect;
    public readonly spellCost: StatModifier;
    public readonly defense: StatEffect;
    public teaseChance = 0;
    public teaseDamage = 0;
    public readonly str: StatEffect;
    public readonly tou: StatEffect;
    public readonly spe: StatEffect;
    public readonly int: StatEffect;
    public readonly lib: StatEffect;
    public readonly sens: StatEffect;
    public readonly cor: StatEffect;
    public readonly fatigue: StatEffect;
    public readonly hp: StatEffect;
    public readonly lust: StatEffect;
    public readonly femininity: StatEffect;
    public readonly fertility: StatEffect;
    public readonly cumQuantity: StatEffect;
    public other?: { [x: string]: any };

    public constructor(values?: IEffectValues) {
        this.attack = values && values.attack ? new StatEffect(values.attack) : new StatEffect();
        this.weapon = values && values.weapon ? new StatEffect(values.weapon) : new StatEffect();
        this.spell = values && values.spell ? new StatEffect(values.spell) : new StatEffect();
        this.spellCost = values && values.spellCost ? new StatModifier(values.spellCost) : new StatModifier();
        this.defense = values && values.defense ? new StatEffect(values.defense) : new StatEffect();
        this.str = values && values.str ? new StatEffect(values.str) : new StatEffect();
        this.tou = values && values.tou ? new StatEffect(values.tou) : new StatEffect();
        this.spe = values && values.spe ? new StatEffect(values.spe) : new StatEffect();
        this.int = values && values.int ? new StatEffect(values.int) : new StatEffect();
        this.lib = values && values.lib ? new StatEffect(values.lib) : new StatEffect();
        this.sens = values && values.sens ? new StatEffect(values.sens) : new StatEffect();
        this.cor = values && values.cor ? new StatEffect(values.cor) : new StatEffect();
        this.fatigue = values && values.fatigue ? new StatEffect(values.fatigue) : new StatEffect();
        this.hp = values && values.hp ? new StatEffect(values.hp) : new StatEffect();
        this.lust = values && values.lust ? new StatEffect(values.lust) : new StatEffect();
        this.femininity = values && values.femininity ? new StatEffect(values.femininity) : new StatEffect();
        this.fertility = values && values.fertility ? new StatEffect(values.fertility) : new StatEffect();
        this.cumQuantity = values && values.cumQuantity ? new StatEffect(values.cumQuantity) : new StatEffect();
    }
}
