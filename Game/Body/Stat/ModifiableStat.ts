import { ListSerializer } from "../../../Engine/Utilities/ListSerializer";
import { IObserverList } from "../../Utilities/IObserverList";
import { StatEffect, StatEffectType } from "./StatEffect";
import { ISerializable } from "../../../Engine/Utilities/ISerializable";
import { Stat } from "./Stat";
import { ObservableList } from "../../Utilities/ObservableList";

class StatEffectListObeserver implements IObserverList<StatEffect> {
    public constructor(private stat: ModifiableStat) { }
    public onAdd(item: StatEffect): void { }
    public onRemove(index: number): void { }
    public onClear(): void { }
    public update(message: string): void {
        this.stat.recalculate();
    }
}

export class ModifiableStat implements ISerializable<ModifiableStat> {
    public readonly baseStat: Stat;
    public readonly modStat: Stat;
    public effects = new ObservableList<StatEffect>();

    public constructor(name: string) {
        this.baseStat = new Stat(name);
        this.modStat = new Stat(name);
        this.effects.attach(new StatEffectListObeserver(this));
        this.recalculate();
    }

    public get value() { return this.modStat.value; }
    public get min() { return this.modStat.min; }
    public get max() { return this.modStat.max; }

    public recalculate() {
        const calcEffects = {
            [StatEffectType.Base]: new StatEffect(StatEffectType.Base),
            [StatEffectType.Min]: new StatEffect(StatEffectType.Min),
            [StatEffectType.Max]: new StatEffect(StatEffectType.Max),
        };

        for (const effect of this.effects) {
            calcEffects[effect.type].flat += effect.flat;
            calcEffects[effect.type].multiplier += effect.multiplier;
        }

        this.modStat.value = this.baseStat.value * calcEffects[StatEffectType.Base].multiplier + calcEffects[StatEffectType.Base].flat;
        this.modStat.min = this.baseStat.min * calcEffects[StatEffectType.Min].multiplier + calcEffects[StatEffectType.Min].flat;
        this.modStat.max = this.baseStat.max * calcEffects[StatEffectType.Max].multiplier + calcEffects[StatEffectType.Max].flat;
    }

    public serialize(): object {
        return {
            baseStat: this.baseStat.serialize(),
            effects: ListSerializer.serialize(this.effects),
        };
    }

    public deserialize(saveObject: ModifiableStat): void {
        this.baseStat.deserialize(saveObject.baseStat);
        ListSerializer.deserialize(saveObject.effects, this.effects, StatEffect);
    }
}
