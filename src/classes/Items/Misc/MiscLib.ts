import CockSock from './CockSock';
import CockSockName from './CockSockName';
import Dictionary from '../../Utilities/Dictionary';
import EquipableItem from '../EquipableItem';

export default class MiscLib extends Dictionary<EquipableItem> {
    public constructor() {
        super();
        this.set(CockSockName.Alabaster, new CockSock(CockSockName.Alabaster));
        this.set(CockSockName.Cobalt, new CockSock(CockSockName.Cobalt));
        this.set(CockSockName.Cockring, new CockSock(CockSockName.Cockring));
        this.set(CockSockName.Gilded, new CockSock(CockSockName.Gilded));
        this.set(CockSockName.Purple, new CockSock(CockSockName.Purple));
        this.set(CockSockName.Scarlet, new CockSock(CockSockName.Scarlet));
        this.set(CockSockName.Viridian, new CockSock(CockSockName.Viridian));
        this.set(CockSockName.Wool, new CockSock(CockSockName.Wool));
    }
}
