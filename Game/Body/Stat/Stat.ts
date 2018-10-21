import { ISerializable } from "../../../Engine/Utilities/ISerializable";

export class Stat implements ISerializable<Stat> {
    public constructor(
        public name: string,
        private curValue = 0,
        public min = 0,
        public max = 0,
    ) { }

    public get value() { return this.curValue; }

    public set value(num: number) {
        this.curValue += num;
        if (this.curValue > this.max)
            this.curValue = this.max;

        if (this.curValue < this.min)
            this.curValue = this.min;
    }

    public serialize(): object {
        return {
            value: this.value,
            min: this.min,
            max: this.max,
            name: this.name,
        };
    }

    public deserialize(saveObject: Stat): void {
        this.curValue = saveObject.value;
        this.min = saveObject.min;
        this.max = saveObject.max;
        this.name = saveObject.name;
    }
}
