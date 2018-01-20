import EffectDescription from './EffectDescription';
import ISerializable from '../Utilities/ISerializable';
import ValueContainer from '../Utilities/ValueContainer';

export default class Effect extends ValueContainer implements ISerializable<Effect> {
    public readonly desc: EffectDescription;
    public constructor(effectDesc: EffectDescription, value1: number, value2: number, value3: number, value4: number) {
        super(value1, value2, value3, value4);
        this.desc = effectDesc;
    }
}
