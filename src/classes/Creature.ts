import CreatureBody from "./Body/Body";
import ComponentList from "./Utilities/ComponentList";
import KeyItem from "./Items/KeyItem";
import CharacterInventory from "./Inventory/CharacterInventory";

export default class Creature extends CreatureBody {
    //Short refers to player name and monster name. BEST VARIABLE NAME EVA!
    //"a" refers to how the article "a" should appear in text. 
    private _short: string = "You";
    private _a: string = "a ";
    public get short(): string { return this._short; }
    public set short(value: string) { this._short = value; }
    public get a(): string { return this._a; }
    public set a(value: string) { this._a = value; }
    public get capitalA(): string {
        if (this._a.length == 0) return "";
        return this._a.charAt(0).toUpperCase() + this._a.substr(1);
    }

    public keyItems: ComponentList<KeyItem>;

    public inventory: CharacterInventory;

    public constructor() {
        super();
        this.keyItems = new ComponentList<KeyItem>();
        this.inventory = new CharacterInventory();
    }
}



