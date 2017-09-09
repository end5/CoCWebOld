import NamedObject from "../Utilities/Component";

export default class ItemType extends NamedObject {
    protected _shortName: string;
    protected _longName: string;
    protected _description: string;
    protected _value: number;

    public static Nothing: ItemType = null;

    public constructor(id: string, shortName: string = null, longName: string = null, value: number = 0, description: string = null) {
        super(id);
        this._shortName = shortName || id;
        this._longName = longName || this.shortName;
        this._description = description || this.longName;
        this._value = value;
    }

	/**
		* Short name to be displayed on buttons
		*/
    public get shortName(): string {
        return this._shortName;
    }

	/**
		* A full name of the item, to be described in text
		*/
    public get longName(): string {
        return this._longName;
    }

	/**
		* Item base price
		*/
    public get value(): number {
        return this._value;
    }

	/**
		* Detailed description to use on tooltips
		*/
    public get description(): string {
        return this._description;
    }

    public toString(): string {
        return "\"" + this.name + "\"";
    }
}
