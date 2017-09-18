import KeyObject from "../Utilities/KeyObject";

export default class ItemDesc extends KeyObject {
    public readonly shortName: string;  // Short name to be displayed on buttons
    public readonly longName: string;   // A full name of the item, to be described in text
    public readonly description: string;// Detailed description to use on tooltips
    public readonly value: number;      // Item base price

    public constructor(key: string, shortName: string = null, longName: string = null, value: number = 0, description: string = null) {
        super(key);
        this.shortName = shortName || key;
        this.longName = longName || this.shortName;
        this.description = description || this.longName;
        this.value = value;
    }
}
