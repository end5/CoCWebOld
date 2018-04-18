import StatusAffect from './StatusAffect';
import StatusAffectDescLib from './StatusAffectDescLib';
import { StatusAffectType } from './StatusAffectType';

class StatusAffectFactory {
    private statusAffectDescLib: StatusAffectDescLib;

    public constructor() {
        if (!this.statusAffectDescLib)
            this.statusAffectDescLib = new StatusAffectDescLib();
    }

    public create(type: StatusAffectType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0): StatusAffect {
        const desc = this.statusAffectDescLib.get(type);
        return new StatusAffect(type, desc, value1, value2, value3, value4);
    }

    public copy(statusAffect: StatusAffect): StatusAffect {
        return this.create(statusAffect.type, statusAffect.value1, statusAffect.value2, statusAffect.value3, statusAffect.value4);
    }
}

const statusAffectFactory = new StatusAffectFactory();
export default statusAffectFactory as StatusAffectFactory;
