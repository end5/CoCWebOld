import Effect from './Effect';
import StatusAffectDesc from './StatusAffectDesc';
import { StatusAffectType } from './StatusAffectType';

export default class StatusAffect extends Effect {
    public readonly type: StatusAffectType;
    public constructor(
        type: StatusAffectType,
        desc: StatusAffectDesc,
        value1: number = 0,
        value2: number = 0,
        value3: number = 0,
        value4: number = 0
    ) {
        super(type, desc, value1, value2, value3, value4);
        this.type = type;
    }
}
