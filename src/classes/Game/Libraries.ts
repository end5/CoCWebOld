import Library from "../Utilities/Library";
import ConsumableLib from "../Items/Consumables/ConsumableLib";
import WeaponLib from "../Items/Weapons/WeaponLib";
import ArmorLib from "../Items/Armors/ArmorLib";
import StatusAffectDescLib from "../Effects/StatusAffectDescLib";
import PerkDescLib from "../Effects/PerkDescLib";
import MaterialLib from "../Items/MaterialLib";

export default class Libraries {
    public readonly weapons: WeaponLib;
    public readonly armor: ArmorLib;
    public readonly consumables: ConsumableLib;
    public readonly materials: MaterialLib;
    public readonly statusAffectDesc: StatusAffectDescLib;
    public readonly perkDesc: PerkDescLib;

    public constructor() {
        this.weapons = new WeaponLib();
        this.armor = new ArmorLib();
        this.consumables = new ConsumableLib();
        this.materials = new MaterialLib();
        this.statusAffectDesc = new StatusAffectDescLib();
        this.perkDesc = new PerkDescLib();
    }
}