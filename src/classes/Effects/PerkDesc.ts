import EffectDescription from './EffectDescription';
import Perk from './Perk';
import Character from '../Character/Character';

export default class PerkDesc extends EffectDescription {
    constructor(key: string, name: string, desc: string, longDesc: string = null) {
        super(key, name, desc, longDesc);
    }

    public description(perk?: Perk, character?: Character): string {
        return super.description();
    }
}
