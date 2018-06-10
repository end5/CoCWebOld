import { CoC_Settings } from './CoC_Settings';
import { PerkClass } from './PerkClass';

/**
 * Created by aimozg on 26.01.14.
 */
export class PerkType {
    private static PERK_LIBRARY: Dictionary = new Dictionary();

    public static lookupPerk(id: string): PerkType {
        return this.PERK_LIBRARY[id];
    }

    public static getPerkLibrary(): Dictionary {
        return this.PERK_LIBRARY;
    }

    private _id: string;
    private _name: string;
    private _desc: string;
    private _longDesc: string;

    /**
     * Unique perk id, should be kept in future game versions
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Perk short name, could be changed in future game versions
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Short description used in perk listing
     */
    public desc(params: PerkClass = null): string {
        return this._desc;
    }

    /**
     * Long description used when offering perk at levelup
     */
    public get longDesc(): string {
        return this._longDesc;
    }

    public constructor(id: string, name: string, desc: string, longDesc: string = null) {
        this._id = id;
        this._name = name;
        this._desc = desc;
        this._longDesc = longDesc || this._desc;
        if (PerkType.PERK_LIBRARY[id] != null) {
            CoC_Settings.error("Duplicate perk id " + id + ", old perk is " + (PerkType.PERK_LIBRARY[id] as PerkType)._name);
        }
        PerkType.PERK_LIBRARY[id] = this;
    }


    public toString(): string {
        return "\"" + this._id + "\"";
    }
}
