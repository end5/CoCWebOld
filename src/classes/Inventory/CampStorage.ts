import WeaponRack from "./WeaponRack";
import ArmorRack from "./ArmorRack";
import CampChest from "./CampChest";

export default class CampStorage {
    public readonly chest: CampChest;
    public readonly armorRack: ArmorRack;
    public readonly weaponRack: WeaponRack;

    public constructor() {
        this.chest = new CampChest();
        this.armorRack = new ArmorRack();
        this.weaponRack = new WeaponRack();
    }
}