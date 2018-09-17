import { EffectDescription } from './EffectDescription';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { ValueContainer } from '../Utilities/ValueContainer';

export class Effect<Type extends string, Desc extends EffectDescription> extends ValueContainer implements ISerializable<Effect<Type, Desc>> {
    // desc does not need to be serialized
    private effectType: Type;
    public readonly desc: Desc;
    public constructor(type?: Type, desc?: Desc, value1?: number, value2?: number, value3?: number, value4?: number) {
        super(value1, value2, value3, value4);
        this.effectType = type;
        this.desc = desc;
    }

    public get type(): Type {
        return this.effectType;
    }

    public serialize(): object | undefined {
        return Object.assign(
            {
                type: this.effectType,
            },
            super.serialize()
        );
    }

    public deserialize(saveObject: Effect<Type, Desc>) {
        this.effectType = saveObject.type;
        super.deserialize(saveObject);
    }
}
