import EquipmentSlot from './EquipmentSlot';
import Character from '../Character/Character';
import EquipableItem from '../Items/EquipableItem';
import IObserverList from '../Utilities/IObserverList';
import SerializableList from '../Utilities/SerializableList';

export default class EquipmentListUpdater<T, U extends EquipableItem> implements IObserverList<T> {
    private character: Character;
    private piercingList: SerializableList<EquipmentSlot<U>>;
    public constructor(character: Character, piercingList: SerializableList<EquipmentSlot<U>>) {
        this.character = character;
        this.piercingList = piercingList;
    }

    public onAdd(item: T): void {
        this.piercingList.add(new EquipmentSlot<U>(this.character));
    }

    public onRemove(index: number): void {
        this.piercingList.remove(index);
    }

    public onClear(): void {
        this.piercingList.clear();
    }

    public update(message: string): void { }
}
