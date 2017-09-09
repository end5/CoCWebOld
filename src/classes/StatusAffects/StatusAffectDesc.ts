import KeyObject from "../Utilities/KeyObject";
import StatusAffect from "./StatusAffect";

export default class StatusAffectDesc extends KeyObject {
    private _name: string;
    private _desc: string;
    private _longDesc: string;

    private _invisible: boolean;
    private _permanent: boolean;

    constructor(key: string, name: string, desc: string, longDesc: string = null, invis: boolean = false, permanent: boolean = false) {
        super(key);
        this._name = name;
        this._desc = desc || this._name;
        this._longDesc = longDesc || this._desc;
        this._invisible = invis;
        this._permanent = permanent;
    }

    public get name(): string {
        return this._name;
    }
    public desc(params: StatusAffect = null): string {
        return this._desc;
    }

    public get longDesc(): string {
        return this._longDesc;
    }

    public get invisible() {
        return this._invisible;
    }

    public get permanent() {
        return this._permanent;
    }

    public toString(): string {
        return "\"" + this._name + "\"";
    }

}