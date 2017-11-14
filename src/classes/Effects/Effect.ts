import EffectDescription from './EffectDescription';
import { SerializeInterface } from '../SerializeInterface';
import ValueContainer from '../Utilities/ValueContainer';

export default class Effect extends ValueContainer implements SerializeInterface {
    serialize(): string {
        let saveObject: object = {};
        saveObject["uniqueKey"] = this.uniqueKey;
        saveObject["value1"] = this.value1;
        saveObject["value2"] = this.value2;
        saveObject["value3"] = this.value3;
        saveObject["value4"] = this.value4;
        return JSON.stringify(saveObject);
    }
    deserialize(saveObject: object) {
        this.value1 = saveObject["value1"];
        this.value2 = saveObject["value2"];
        this.value3 = saveObject["value3"];
        this.value4 = saveObject["value4"];
    }

    public desc: EffectDescription;
    public constructor(key: string, effectDesc: EffectDescription, value1: number, value2: number, value3: number, value4: number) {
        super(key);
        this.desc = effectDesc;
    }
}