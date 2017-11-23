import ArmorLib from './Armors/ArmorLib';
import ConsumableLib from './Consumables/ConsumableLib';
import Item, { ItemType } from './Item';
import ItemDesc from './ItemDesc';
import Material from './Material';
import MaterialLib from './MaterialLib';
import WeaponLib from './Weapons/WeaponLib';
import ConstructorLibrary from '../Utilities/ConstructorLibrary';

export default class ItemFactory {
    private static armorLib: ArmorLib;
    private static weaponLib: WeaponLib;
    private static consumableLib: ConsumableLib;
    private static materialLib: MaterialLib;

    public constructor() {
        if (!ItemFactory.armorLib)
            ItemFactory.armorLib = new ArmorLib();
        if (!ItemFactory.weaponLib)
            ItemFactory.weaponLib = new WeaponLib();
        if (!ItemFactory.consumableLib)
            ItemFactory.consumableLib = new ConsumableLib();
        if (!ItemFactory.materialLib)
            ItemFactory.materialLib = new MaterialLib();
    }

    public static create(type: ItemType, name: string): Item {
        switch(type) {
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
        }
        console.error("Item " + name + " not found in " + type);
        return null;
    }
}