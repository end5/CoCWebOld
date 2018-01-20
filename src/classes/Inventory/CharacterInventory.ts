import EquipmentInventory from './EquipmentInventory';
import EquipmentSlot from './EquipmentSlot';
import Inventory from './Inventory';
import Character from '../Character/Character';
import Armor from '../Items/Armors/Armor';
import Item from '../Items/Item';
import Weapon from '../Items/Weapons/Weapon';
import ISerializable from '../Utilities/ISerializable';

export default class CharacterInventory implements ISerializable<CharacterInventory> {
    public readonly items: Inventory<Item>;
    public readonly equipment: EquipmentInventory;
    public gems: number;

    public constructor(character: Character) {
        this.items = new Inventory<Item>();
        this.equipment = new EquipmentInventory(character);
        this.gems = 0;
    }

    public serialize(): string {
        return JSON.stringify({
            gems: this.gems,
            items: this.items.serialize(),
            equipment: this.equipment.serialize()
        });
    }

    public deserialize(saveObject: CharacterInventory) {
        this.gems = saveObject.gems;
        this.items.deserialize(saveObject.items);
        this.equipment.deserialize(saveObject.equipment);
    }
}
