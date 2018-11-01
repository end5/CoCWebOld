import { EquipmentInventory, IEquipmentInventory } from './EquipmentInventory';
import { Inventory, IInventory } from './Inventory';
import { KeyItemDict } from './KeyItemDict';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { Character } from '../Character/Character';
import { Item } from '../Items/Item';
import { KeyItem, IKeyItem } from '../Items/KeyItem';
import { Weapon } from '../Items/Weapons/Weapon';
import { Armor } from '../Items/Armors/Armor';
import { StatWithEffects, IStatWithEffects } from '../Body/Stat/StatWithEffects';
import { IDictionary } from '../../Engine/Utilities/Dictionary';

export interface ICharInv {
    items: IInventory;
    equipment: IEquipmentInventory;
    keyItems: IDictionary<IKeyItem>;
    gems: IStatWithEffects;
}

export class CharacterInventory implements ISerializable<ICharInv> {
    public readonly items: Inventory<Item>;
    public readonly equipment: EquipmentInventory;
    public gemsStat: StatWithEffects;
    public readonly keyItems: KeyItemDict;

    public constructor(character: Character, defaultWeapon: Weapon, defaultArmor: Armor) {
        this.items = new Inventory<Item>();
        this.equipment = new EquipmentInventory(character, defaultWeapon, defaultArmor);
        this.gemsStat = new StatWithEffects();
        this.keyItems = new KeyItemDict();
    }

    public get gems() { return this.gemsStat.value; }
    public set gems(num: number) { this.gemsStat.value = num; }

    public serialize(): ICharInv {
        return {
            gems: this.gemsStat.serialize(),
            items: this.items.serialize(),
            equipment: this.equipment.serialize(),
            keyItems: this.keyItems.serialize()
        };
    }

    public deserialize(saveObject: ICharInv) {
        this.gemsStat.deserialize(saveObject.gems);
        this.items.deserialize(saveObject.items);
        this.equipment.deserialize(saveObject.equipment);
        this.keyItems.deserialize(saveObject.keyItems, KeyItem);
    }
}
