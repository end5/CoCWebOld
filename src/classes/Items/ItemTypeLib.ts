import ItemType from "./ItemType";
import Library from "../Utilities/Library";

export default class ItemTypeLib extends Library<ItemType> {
    private _libraryShort: Library<ItemType>;
    public static NOTHING: ItemType = new ItemType("NOTHING!");

    public constructor() {
        super();
        this._libraryShort = new Library<ItemType>();
    }

    public getShort(shortName: string): ItemType {
        return this._libraryShort[shortName];
    }
}