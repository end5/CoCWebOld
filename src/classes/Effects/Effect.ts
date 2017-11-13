import EffectDescription from './EffectDescription';
import ValueContainer from '../Utilities/ValueContainer';

export default class Effect extends ValueContainer {
    public desc: EffectDescription;
    public constructor(key: string, effectDesc: EffectDescription, value1: number, value2: number, value3: number, value4: number) {
        super(key);
        this.desc = effectDesc;
    }
}