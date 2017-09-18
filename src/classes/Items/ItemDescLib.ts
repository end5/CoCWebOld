import ItemDesc from "./ItemDesc";
import Library from "../Utilities/Library";

export default class ItemDescLib extends Library<ItemDesc> {
    private _libraryShort: Library<ItemDesc>;

    public constructor() {
        super();
        this._libraryShort = new Library<ItemDesc>();
    }

    public getShort(shortName: string): ItemDesc {
        return this._libraryShort[shortName];
    }
}