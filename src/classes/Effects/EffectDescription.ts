import KeyObject from "../Utilities/KeyObject";
import Effect from "./Effect";

export default class EffectDescription extends KeyObject {
    private _name: string;
    private _desc: string;
    private _longDesc: string;
    constructor(objectKey: string, name: string, desc: string, longDesc: string = null) {
        super(objectKey);
        this._name = name;
        this._desc = desc || this._name;
        this._longDesc = longDesc || this._desc;
    }

    public get name(): string {
        return this._name;
    }

    public desc(params: Effect<EffectDescription> = null): string {
        return this._desc;
    }

    public get longDesc(): string {
        return this._longDesc;
    }

    public toString(): string {
        return "\"" + this._name + "\"";
    }
}

