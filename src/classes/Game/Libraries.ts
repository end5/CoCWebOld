import Library from "../Utilities/Library";
import ItemTypeLib from "../Items/ItemTypeLib";
import ConsumableLib from "../Items/Consumables/ConsumableLib";
import UseableLib from "../Items/UseableLib";
import WeaponLib from "../Items/Weapons/WeaponLib";
import ArmorLib from "../Items/Armors/ArmorLib";
import StatusAffectDescLib from "../Effects/StatusAffectDescLib";
import PerkDescLib from "../Effects/PerkDescLib";

export default class Libraries {
    public readonly items: ItemTypeLib;
    public readonly weapons: WeaponLib;
    public readonly armor: ArmorLib;
    public readonly consumables: ConsumableLib;
    public readonly useables: UseableLib;
    public readonly statusAffectDesc: StatusAffectDescLib;
    public readonly perkDesc: PerkDescLib;

    public constructor() {
        this.items = new ItemTypeLib();
        this.weapons = new WeaponLib();
        this.armor = new ArmorLib();
        this.consumables = new ConsumableLib();
        this.useables = new UseableLib();
        this.statusAffectDesc = new StatusAffectDescLib();
        this.perkDesc = new PerkDescLib();
    }
}