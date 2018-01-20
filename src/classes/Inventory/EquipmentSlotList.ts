import EquipmentSlot from './EquipmentSlot';
import Character from '../Character/Character';
import EquipableItem from '../Items/EquipableItem';
import SerializableList from '../Utilities/SerializableList';

export default class EquipmentSlotList<T extends EquipableItem> extends SerializableList<EquipmentSlot<T>> {
    private character: Character;
    public constructor(character: Character) {
        super();
        this.character = character;
    }

    public remove(index: number) {
        if (index >= 0 && index < this.list.length)
            this.list[index].unequip();
        super.remove(index);
    }

    public clear() {
        for (const equipmentSlot of this.list) {
            equipmentSlot.unequip();
        }
        super.clear();
    }

    public serialize(): string {
        const saveObject: object = {};
        for (let index = 0; index < this.list.length; index++) {
            saveObject[index] = this.list[index].serialize();
        }
        return JSON.stringify(saveObject);
    }

    public deserialize(saveObject: object) {
        const newList = [];
        for (let index = 0; saveObject[index] !== undefined; index++) {
            const newEntry = new EquipmentSlot(this.character);
            newEntry.deserialize(saveObject[index]);
            newList[index] = newEntry;
        }
        this.list = newList;
    }
}
