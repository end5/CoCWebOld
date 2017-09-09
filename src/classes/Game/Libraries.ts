import Library from "../Utilities/Library";
import ItemTypeLib from "../Items/ItemTypeLib";
import ConsumableLib from "../Items/Consumable/ConsumableLib";
import UseableLib from "../Items/UseableLib";
import WeaponLib from "../Items/Weapons/WeaponLib";
import ArmorLib from "../Items/Armor/ArmorLib";
import PerkDescLib from "../Perks/PerkDescLib";

export default class Libraries {
    public items: ItemTypeLib;
    public weapons: WeaponLib;
    public armor: ArmorLib;
    public consumables: ConsumableLib;
    public useables: UseableLib;
    public perkDesc: PerkDescLib;

    public constructor() {
        this.items = new ItemTypeLib();
        this.weapons = new WeaponLib();
        this.armor = new ArmorLib();
        this.consumables = new ConsumableLib();
        this.useables = new UseableLib();
        this.perkDesc = new PerkDescLib();
    }
}