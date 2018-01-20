import Armor from './Armors/Armor';
import ArmorLib from './Armors/ArmorLib';
import ConsumableLib from './Consumables/ConsumableLib';
import ConsumableName from './Consumables/ConsumableName';
import Item from './Item';
import ItemDesc from './ItemDesc';
import ItemType from './ItemType';
import Material from './Materials/Material';
import MaterialLib from './Materials/MaterialLib';
import MaterialName from './Materials/MaterialName';
import MiscLib from './Misc/MiscLib';
import WeaponLib from './Weapons/WeaponLib';

export default class ItemFactory {
    private static armorLib: ArmorLib;
    private static weaponLib: WeaponLib;
    private static consumableLib: ConsumableLib;
    private static materialLib: MaterialLib;
    private static miscLib: MiscLib;

    public constructor() {
        if (!ItemFactory.armorLib)
            ItemFactory.armorLib = new ArmorLib();
        if (!ItemFactory.weaponLib)
            ItemFactory.weaponLib = new WeaponLib();
        if (!ItemFactory.consumableLib)
            ItemFactory.consumableLib = new ConsumableLib();
        if (!ItemFactory.materialLib)
            ItemFactory.materialLib = new MaterialLib();
        if (!ItemFactory.miscLib)
            ItemFactory.miscLib = new MiscLib();
    }

    public static create(type: ItemType, name: string): Item {
        switch (type) {
            case ItemType.Armor: {
                if (ItemFactory.armorLib.has(name)) {
                    return ItemFactory.armorLib.get(name);
                }
            }
            case ItemType.Weapon: {
                if (ItemFactory.weaponLib.has(name)) {
                    return ItemFactory.weaponLib.get(name);
                }
            }
            case ItemType.Consumable: {
                if (ItemFactory.consumableLib.has(name)) {
                    return ItemFactory.consumableLib.get(name);
                }
            }
            case ItemType.Material: {
                if (ItemFactory.materialLib.has(name)) {
                    return ItemFactory.materialLib.get(name);
                }
            }
            case ItemType.Misc: {
                if (ItemFactory.miscLib.has(name)) {
                    return ItemFactory.miscLib.get(name);
                }
            }
        }
        console.error("Item " + name + " not found.");
        return null;
    }
}
