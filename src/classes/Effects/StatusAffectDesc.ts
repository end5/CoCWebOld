import EffectDescription from './EffectDescription';

export default class StatusAffectDesc extends EffectDescription {
    constructor(key: string, name: string, desc: string, longDesc: string = null, invis: boolean = false, permanent: boolean = false) {
        super(key, name, desc, longDesc);
    }
}