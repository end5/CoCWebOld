import { ArmorLib } from './Armors/ArmorLib';
import { ConsumableLib } from './Consumables/ConsumableLib';
import { Item } from './Item';
import { ItemType } from './ItemType';
import { MaterialLib } from './Materials/MaterialLib';
import { MiscLib } from './Misc/MiscLib';
import { WeaponLib } from './Weapons/WeaponLib';
import { ItemStack } from '../Inventory/ItemStack';

class ItemFactory {
    private armorLib: ArmorLib;
    private weaponLib: WeaponLib;
    private consumableLib: ConsumableLib;
    private materialLib: MaterialLib;
    private miscLib: MiscLib;

    public constructor() {
        this.armorLib = new ArmorLib();
        this.weaponLib = new WeaponLib();
        this.consumableLib = new ConsumableLib();
        this.materialLib = new MaterialLib();
        this.miscLib = new MiscLib();
    }

    public get(type: ItemType, name: string): Item {
        switch (type) {
            case ItemType.Armor: {
                if (this.armorLib.has(name)) {
                    return this.armorLib.get(name);
                }
            }
            case ItemType.Weapon: {
                if (this.weaponLib.has(name)) {
                    return this.weaponLib.get(name);
                }
            }
            case ItemType.Consumable: {
                if (this.consumableLib.has(name)) {
                    return this.consumableLib.get(name);
                }
            }
            case ItemType.Material: {
                if (this.materialLib.has(name)) {
                    return this.materialLib.get(name);
                }
            }
            case ItemType.Misc: {
                if (this.miscLib.has(name)) {
                    return this.miscLib.get(name);
                }
            }
        }
        console.error("Item " + name + " not found.");
        return null;
    }

    public create<T extends Item>(type: ItemType, name: string): ItemStack<T> {
        return new ItemStack(this.get(type, name), 1);
    }
}

const itemFactory = new ItemFactory();
export { itemFactory as ItemFactory };
