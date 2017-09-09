import Perk from "./Perk"
import KeyObject from "../Utilities/KeyObject";

export default class PerkDesc extends KeyObject {
    private _id: string;
    private _name: string;
    private _desc: string;
    private _longDesc: string;

    constructor(id: string, name: string, desc: string, longDesc: string = null) {
        super(id);
        this._id = id;
        this._name = name;
        this._desc = desc;
        this._longDesc = longDesc || this._desc;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }
    public desc(params: Perk = null): string {
        return this._desc;
    }

    public get longDesc(): string {
        return this._longDesc;
    }

    public toString(): string {
        return "\"" + this._id + "\"";
    }
}

