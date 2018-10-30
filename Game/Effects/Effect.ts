import { EffectDesc } from './EffectDescription';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { EffectValues, IEffectValues } from './EffectValues';

export abstract class Effect<Type extends string, Desc extends EffectDesc = EffectDesc> implements ISerializable<Effect<Type, Desc>> {
    // desc does not need to be serialized
    private effectType: Type;
    public readonly desc: EffectDesc;
    public values: EffectValues;
    protected reducedValues?: IEffectValues;
    public constructor(type: Type, desc: Desc, values?: IEffectValues) {
        this.effectType = type;
        this.desc = desc;
        this.values = new EffectValues(values);
        this.reducedValues = values;
    }

    public get type(): Type {
        return this.effectType;
    }

    public serialize(): object {
        return {
            type: this.effectType,
            reducedValues: this.reducedValues,
        };
    }

    public deserialize(saveObject: Effect<Type, Desc>) {
        this.effectType = saveObject.type;
        this.values = new EffectValues(saveObject.reducedValues);
        this.reducedValues = saveObject.reducedValues;
    }
}
