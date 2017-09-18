import KeyObject from "../Utilities/KeyObject";
import EffectDescription from "./EffectDescription";

export default abstract class Effect<T extends EffectDescription> extends KeyObject {
    private effectDesc: T;
    public value1: number;
    public value2: number;
    public value3: number;
    public value4: number;

    public constructor(effectDesc: T, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        super(effectDesc.objectKey);
        this.effectDesc = effectDesc;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
    }

    public toString(): string {
        return "[" + this.objectKey + "," + this.value1 + "," + this.value2 + "," + this.value3 + "," + this.value4 + "]";
    }
}