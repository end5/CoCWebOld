import { EquipmentInventory } from './EquipmentInventory';
import { Inventory } from './Inventory';
import { KeyItemDict } from './KeyItemDict';
import { DictionarySerializer } from '../../Engine/Utilities/DictionarySerializer';
import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { Character } from '../Character/Character';
import { Item } from '../Items/Item';
import { KeyItem } from '../Items/KeyItem';

export class CharacterInventory implements ISerializable<CharacterInventory> {
    public readonly items: Inventory<Item>;
    public readonly equipment: EquipmentInventory;
    public gems: number;
    public readonly keyItems: KeyItemDict;

    public constructor(character: Character) {
        this.items = new Inventory<Item>();
        this.equipment = new EquipmentInventory(character);
        this.gems = 0;
        this.keyItems = new KeyItemDict();
    }

    public serialize(): string {
        return JSON.stringify({
            gems: this.gems,
            items: this.items.serialize(),
            equipment: this.equipment.serialize(),
            keyItems: DictionarySerializer.serialize(this.keyItems)
        });
    }

    public deserialize(saveObject: CharacterInventory) {
        this.gems = saveObject.gems;
        this.items.deserialize(saveObject.items);
        this.equipment.deserialize(saveObject.equipment);
        DictionarySerializer.deserialize(saveObject.keyItems, this.keyItems, KeyItem);
    }
}
