//CoC Creature.as
import KeyItem from "./KeyItem";
import Weapon from "./Items/Weapons/Weapon";
import Armor from "./Items/Armors/Armor";
import InventoryManager from "./Items/InventoryManager";

export default class Creature extends BodyModule {
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

    public inventoryManager: InventoryManager;

    public constructor() {
        super();
        this.keyItems = new ComponentList<KeyItem>();
        this.inventoryManager = new InventoryManager();
    }
}



