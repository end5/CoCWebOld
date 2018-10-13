import { ItemType } from "./ItemType";
import { Dictionary } from "../../Engine/Utilities/Dictionary";
import { Armor } from "./Armors/Armor";
import { ArmorLib } from "./Armors/ArmorLib";
import { WeaponLib } from "./Weapons/WeaponLib";
import { Weapon } from "./Weapons/Weapon";
import { Consumable } from "./Consumables/Consumable";
import { EquipableItem } from "./EquipableItem";
import { ConsumableLib } from "./Consumables/ConsumableLib";
import { MaterialLib } from "./Materials/MaterialLib";
import { Material } from "./Materials/Material";
import { MiscLib } from "./Misc/MiscLib";

export function getLibFromType(type: ItemType): Dictionary<Armor | Weapon | Consumable | Material | EquipableItem> {
    switch (type) {
        case ItemType.Armor: {
            return ArmorLib;
        }
        case ItemType.Weapon: {
            return WeaponLib;
        }
        case ItemType.Consumable: {
            return ConsumableLib;
        }
        case ItemType.Material: {
            return MaterialLib;
        }
        case ItemType.Misc: {
            return MiscLib;
        }
    }
    console.error("Item " + name + " not found.");
}

export function getTypeFromName(name: string): ItemType {
    if (ArmorLib.has(name)) return ItemType.Armor;
    if (WeaponLib.has(name)) return ItemType.Weapon;
    if (ConsumableLib.has(name)) return ItemType.Consumable;
    if (MaterialLib.has(name)) return ItemType.Material;
    if (MiscLib.has(name)) return ItemType.Misc;
}

export function getLibFromName(name: string): Dictionary<Armor | Weapon | Consumable | Material | EquipableItem> {
    if (ArmorLib.has(name)) return ArmorLib;
    if (WeaponLib.has(name)) return WeaponLib;
    if (ConsumableLib.has(name)) return ConsumableLib;
    if (MaterialLib.has(name)) return MaterialLib;
    if (MiscLib.has(name)) return MiscLib;
}

export function getItemFromName(name: string): Armor | Weapon | Consumable | Material | EquipableItem {
    return getLibFromName(name).get(name);
}
