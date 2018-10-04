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
        this.stat.update();
    }
}

export class ModifiableStat implements ISerializable<ModifiableStat> {
    private readonly base: Stat;
    private readonly calcEffects = {
        [StatEffectType.Value]: new StatEffect(StatEffectType.Value),
        [StatEffectType.Min]: new StatEffect(StatEffectType.Min),
        [StatEffectType.Max]: new StatEffect(StatEffectType.Max),
    };
    public effects = new ObservableList<StatEffect>();

    public constructor(name: string) {
        this.base = new Stat(name);
        this.effects.attach(new StatEffectListObeserver(this));
        this.update();
    }

    public get value() { return this.base.value * this.calcEffects[StatEffectType.Value].multiplier + this.calcEffects[StatEffectType.Value].flat; }
    public set value(num: number) { this.base.value += num; }

    public get min() { return this.base.min * this.calcEffects[StatEffectType.Min].multiplier + this.calcEffects[StatEffectType.Min].flat; }
    public set min(num: number) { this.base.min += num; }

    public get max() { return this.base.max * this.calcEffects[StatEffectType.Max].multiplier + this.calcEffects[StatEffectType.Max].flat; }
    public set max(num: number) { this.base.max += num; }

    public update() {
        for (const type of [StatEffectType.Value, StatEffectType.Min, StatEffectType.Max]) {
            this.calcEffects[type].flat = 0;
            this.calcEffects[type].multiplier = 1;
        }

        for (const effect of this.effects) {
            this.calcEffects[effect.type].flat += effect.flat;
            this.calcEffects[effect.type].multiplier += effect.multiplier;
        }
    }

    public serialize(): object {
        return {
            base: this.base.serialize(),
            effects: ListSerializer.serialize(this.effects),
        };
    }

    public deserialize(saveObject: ModifiableStat): void {
        this.base.deserialize(saveObject.base);
        ListSerializer.deserialize(saveObject.effects, this.effects, StatEffect);
    }
}
