import KeyObject from "./KeyObject";

export default abstract class ValueContainer<T extends KeyObject> extends KeyObject {
    public readonly object: T;
    public value1: number;
    public value2: number;
    public value3: number;
    public value4: number;

    public constructor(keyObject: T, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        super(keyObject.objectKey);
        this.object = keyObject
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
    }

    public toString(): string {
        return "[" + this.objectKey + "," + this.value1 + "," + this.value2 + "," + this.value3 + "," + this.value4 + "]";
    }
}