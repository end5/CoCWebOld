import { EquipSlot } from './EquipSlot';
import { List } from '../../Engine/Utilities/List';
import { Character } from '../Character/Character';
import { EquipableItem } from '../Items/EquipableItem';

export class EquipSlotList<T extends EquipableItem> extends List<EquipSlot<T>> {
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
}
