import ListObserverEquipmentList from './ListObserverEquipmentList';
import Cock from '../Body/Cock';
import CockSock from '../Items/Misc/CockSock';
import CockSockName from '../Items/Misc/CockSockName';

export default class CockSockList extends ListObserverEquipmentList<Cock, CockSock> {
    public hasCockSock(name: CockSockName): boolean {
        for (const cocksock of this.list) {
            if (cocksock.isEquipped() && cocksock.item.name === name) {
                return true;
            }
        }
        return false;
    }

    public indexOfCockSock(name: CockSockName): number {
        for (let index = 0; index < this.list.length; index++) {
            if (this.list[index].isEquipped() && this.list[index].item.name === name) {
                return index;
            }
        }
        return -1;
    }
}
