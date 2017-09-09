import NamedObject from "./Utilities/Component";

export default class StatusAffect extends NamedObject {
    public value1: number;
    public value2: number;
    public value3: number;
    public value4: number;

    public constructor(name: string, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        super(name);
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
    }

    public toString(): string {
        return "[" + this.name + "," + this.value1 + "," + this.value2 + "," + this.value3 + "," + this.value4 + "]";
    }
}
