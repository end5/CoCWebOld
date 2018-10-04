import { ISerializable } from "../../../Engine/Utilities/ISerializable";

export class Stat implements ISerializable<Stat> {
    public constructor(
        public name,
        public value = 0,
        public min = 0,
        public max = 0,
    ) { }
    public serialize(): object {
        return {
            value: this.value,
            min: this.min,
            max: this.max,
            name: this.name,
        };
    }

    public deserialize(saveObject: Stat): void {
        this.value = saveObject.value;
        this.min = saveObject.min;
        this.max = saveObject.max;
        this.name = saveObject.name;
    }
}
