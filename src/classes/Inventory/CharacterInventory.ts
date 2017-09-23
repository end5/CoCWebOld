import Inventory from "./Inventory";
import Item from "../Items/Item";
import Armor from "../Items/Armors/Armor";
import Weapon from "../Items/Weapons/Weapon";
import Game from "../Game/Game";

export default class CharacterInventory {
    public readonly items: Inventory<Item>;
    public weapon: Weapon;
    public armor: Armor;
    public armorDescMod: string;

    public constructor() {
        this.items = new Inventory<Item>();
        this.weapon = Game.libraries.weapons.get("Fists");
        this.armor = Game.libraries.armor.get("c.under");
        this.armorDescMod = "";
    }
}