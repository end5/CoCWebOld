import PerkDescLib from '../Effects/PerkDescLib';
import StatusAffectDescLib from '../Effects/StatusAffectDescLib';
import ArmorLib from '../Items/Armors/ArmorLib';
import ConsumableLib from '../Items/Consumables/ConsumableLib';
import { ItemType } from '../Items/Item';
import MaterialLib from '../Items/MaterialLib';
import WeaponLib from '../Items/Weapons/WeaponLib';
import Library from '../Utilities/Library';

export default class Libraries {
    public readonly statusAffectDesc: StatusAffectDescLib;
    public readonly perkDesc: PerkDescLib;
    private readonly items: object;

    public constructor() {
        this.items = {};
        this.items[ItemType.Armor] = new ArmorLib();
        this.items[ItemType.Consumable] = new ConsumableLib();
        this.items[ItemType.KeyItem] = new ArmorLib();
        this.items[ItemType.Material] = new MaterialLib();
        this.items[ItemType.Weapon] = new WeaponLib();
        this.statusAffectDesc = new StatusAffectDescLib();
        this.perkDesc = new PerkDescLib();
    }

    public get armor(): ArmorLib {
        return this.items[ItemType.Weapon];
    }
    public get consumables(): ConsumableLib {
        return this.items[ItemType.Consumable];
    }
    public get keyItem(): WeaponLib {
        return this.items[ItemType.KeyItem];
    }
    public get materials(): MaterialLib {
        return this.items[ItemType.Material];
    }
    public get weapon(): WeaponLib {
        return this.items[ItemType.Weapon];
    }

    public lookupItem(itemKey: string, itemType: ItemType): any {
        return this.items[itemType].get(itemKey);
    }
}