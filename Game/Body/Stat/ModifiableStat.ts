import { StatEffect } from "./StatEffect";
import { ISerializable } from "../../../Engine/Utilities/ISerializable";
import { Stat } from "./Stat";
import { Dictionary } from "../../../Engine/Utilities/Dictionary";
import { DictionarySerializer } from "../../../Engine/Utilities/DictionarySerializer";

export class ModifiableStat implements ISerializable<ModifiableStat> {
    private readonly base: Stat;
    public effects = new Dictionary<string, StatEffect>();

    public constructor(name: string) {
        this.base = new Stat(name);
    }

    public set value(num: number) { this.base.value += num; }
    public get value() {
        const calc = this.calculate();
        return this.base.value * calc.value.multi + calc.value.flat;
    }

    public set min(num: number) { this.base.min += num; }
    public get min() {
        const calc = this.calculate();
        return this.base.min * calc.min.multi + calc.min.flat;
    }

    public set max(num: number) { this.base.max += num; }
    public get max() {
        const calc = this.calculate();
        return this.base.max * calc.max.multi + calc.max.flat;
    }

    public calculate(): StatEffect {
        const calc = new StatEffect();
        for (const effect of this.effects) {
            if (effect.value && effect.value.flat) {
                // if (typeof effect.value.flat === 'function')
                //     calc.value.flat += effect.value.flat();
                // else if (typeof effect.value.flat === 'number')
                    calc.value.flat += effect.value.flat;
            }
            if (effect.value && effect.value.multi) {
                // if (typeof effect.value.multi === 'function')
                //     calc.value.multi += effect.value.multi();
                // else if (typeof effect.value.multi === 'number')
                    calc.value.multi += effect.value.multi;
            }
            if (effect.min && effect.min.flat) {
                // if (typeof effect.min.flat === 'function')
                //     calc.min.flat += effect.min.flat();
                // else if (typeof effect.min.flat === 'number')
                    calc.min.flat += effect.min.flat;
            }
            if (effect.min && effect.min.multi) {
                // if (typeof effect.min.multi === 'function')
                //     calc.min.multi += effect.min.multi();
                // else if (typeof effect.min.multi === 'number')
                    calc.min.multi += effect.min.multi;
            }
            if (effect.max && effect.max.flat) {
                // if (typeof effect.max.flat === 'function')
                //     calc.max.flat += effect.max.flat();
                // else if (typeof effect.max.flat === 'number')
                    calc.max.flat += effect.max.flat;
            }
            if (effect.max && effect.max.multi) {
                // if (typeof effect.max.multi === 'function')
                //     calc.max.multi += effect.max.multi();
                // else if (typeof effect.max.multi === 'number')
                    calc.max.multi += effect.max.multi;
            }
        }
        return calc;
    }

    public serialize(): object {
        return {
            base: this.base.serialize(),
            effects: DictionarySerializer.serialize(this.effects),
        };
    }

    public deserialize(saveObject: ModifiableStat): void {
        this.base.deserialize(saveObject.base);
        DictionarySerializer.deserialize(saveObject.effects, this.effects);
    }
}
