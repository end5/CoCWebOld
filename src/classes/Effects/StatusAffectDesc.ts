import EffectDescription from './EffectDescription';
import { StatusAffectType } from './StatusAffectType';

export default class StatusAffectDesc extends EffectDescription {
    constructor(type: StatusAffectType, name: string, desc: string, longDesc: string = null, invis: boolean = false, permanent: boolean = false) {
        super(type, name, desc, longDesc);
    }
}