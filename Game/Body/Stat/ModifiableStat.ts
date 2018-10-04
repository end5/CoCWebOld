import { ListSerializer } from "../../../Engine/Utilities/ListSerializer";
import { IObserverList } from "../../Utilities/IObserverList";
import { StatEffect, StatValueModifier } from "./StatEffect";
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
    private readonly calcEffect: StatEffect = {
        name: '',
        value: new StatValueModifier(),
        min: new StatValueModifier(),
        max: new StatValueModifier(),
    };
    public effects = new ObservableList<StatEffect>();

    public constructor(name: string) {
        this.base = new Stat(name);
        this.effects.attach(new StatEffectListObeserver(this));
        this.update();
    }

    public get value() { return this.base.value * this.calcEffect.value.multiplier + this.calcEffect.value.flat; }
    public set value(num: number) { this.base.value += num; }

    public get min() { return this.base.min * this.calcEffect.min.multiplier + this.calcEffect.min.flat; }
    public set min(num: number) { this.base.min += num; }

    public get max() { return this.base.max * this.calcEffect.max.multiplier + this.calcEffect.max.flat; }
    public set max(num: number) { this.base.max += num; }

    public update() {
        for (const type of ['value', 'min', 'max']) {
            this.calcEffect[type].flat = 0;
            this.calcEffect[type].multiplier = 1;
        }

        for (const effect of this.effects) {
            for (const type of ['value', 'min', 'max']) {
                this.calcEffect[type].flat += effect[type].flat;
                this.calcEffect[type].multiplier += effect[type].multiplier;
            }
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
        ListSerializer.deserialize(saveObject.effects, this.effects);
    }
}
