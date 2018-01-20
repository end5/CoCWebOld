import EquipmentListUpdater from './EquipmentListUpdater';
import EquipmentSlot from './EquipmentSlot';
import EquipmentSlotList from './EquipmentSlotList';
import Character from '../Character/Character';
import EquipableItem from '../Items/EquipableItem';
import IObservableList from '../Utilities/IObservableList';
import List from '../Utilities/list';

export default class ListObserverEquipmentList<T, U extends EquipableItem> extends EquipmentSlotList<U> {
    private observer: EquipmentListUpdater<T, U>;

    public constructor(character: Character, list: IObservableList<T> & List<T>) {
        super(character);
        this.observer = new EquipmentListUpdater(character, this);
        list.attach(this.observer);

        for (let index = 0; index < list.count; index++) {
            this.add(new EquipmentSlot(character));
        }
    }
}
