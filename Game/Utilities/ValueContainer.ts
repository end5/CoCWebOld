import { ISerializable } from '../../Engine/Utilities/ISerializable';

export abstract class ValueContainer implements ISerializable<ValueContainer> {
    public constructor(
        public value1: number = 0,
        public value2: number = 0,
        public value3: number = 0,
        public value4: number = 0
    ) {
    }

    public toString(): string {
        return "[" + this.value1 + "," + this.value2 + "," + this.value3 + "," + this.value4 + "]";
    }

    public serialize(): object | undefined {
        return {
            value1: this.value1,
            value2: this.value2,
            value3: this.value3,
            value4: this.value4
        };
    }

    public deserialize(saveObject: ValueContainer) {
        this.value1 = saveObject.value1;
        this.value2 = saveObject.value2;
        this.value3 = saveObject.value3;
        this.value4 = saveObject.value4;
    }
}
