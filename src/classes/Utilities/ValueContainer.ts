import { Utils } from './Utils';
import ISerializable from '../Utilities/ISerializable';

export default abstract class ValueContainer implements ISerializable<ValueContainer> {
    public value1: number;
    public value2: number;
    public value3: number;
    public value4: number;

    public constructor(value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
    }

    public toString(): string {
        return "[" + this.value1 + "," + this.value2 + "," + this.value3 + "," + this.value4 + "]";
    }

    public serialize(): string {
        return JSON.stringify({
            value1: this.value1,
            value2: this.value2,
            value3: this.value3,
            value4: this.value4
        });
    }

    public deserialize(saveObject: ValueContainer) {
        this.value1 = saveObject.value1;
        this.value2 = saveObject.value2;
        this.value3 = saveObject.value3;
        this.value4 = saveObject.value4;
    }
}
