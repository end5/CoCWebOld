import StatusAffect from './StatusAffect';
import StatusAffectDesc from './StatusAffectDesc';
import StatusAffectDescLib from './StatusAffectDescLib';
import { StatusAffectType } from './StatusAffectType';

interface StatusAffectConstructor {
    new(type: StatusAffectType,
        desc: StatusAffectDesc,
        value1: number,
        value2: number,
        value3: number,
        value4: number,
    ): StatusAffect;
}

export default class StatusAffectFactory {
    private static statusAffectDescLib: StatusAffectDescLib;

    public constructor() {
        if (!StatusAffectFactory.statusAffectDescLib)
            StatusAffectFactory.statusAffectDescLib = new StatusAffectDescLib();
    }

    public static create(type: StatusAffectType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0): StatusAffect {
        const desc = StatusAffectFactory.statusAffectDescLib.get(type);
        return new StatusAffect(type, desc, value1, value2, value3, value4);
    }

    public static copy(statusAffect: StatusAffect): StatusAffect {
        return StatusAffectFactory.create(statusAffect.type, statusAffect.value1, statusAffect.value2, statusAffect.value3, statusAffect.value4);
    }
}
