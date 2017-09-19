import KeyObject from "../Utilities/KeyObject";

export default class EffectDescription extends KeyObject {
    public readonly name: string;
    public readonly desc: string;
    public readonly longDesc: string;
    constructor(objectKey: string, name: string, desc: string, longDesc: string = null) {
        super(objectKey);
        this.name = name;
        this.desc = desc || this.name;
        this.longDesc = longDesc || this.desc;
    }
}

