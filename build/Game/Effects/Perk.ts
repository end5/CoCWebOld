import Effect from './Effect';
import EffectDescription from './EffectDescription';
import { PerkType } from './PerkType';
import Character from '../Character/Character';

export default class Perk extends Effect<PerkType, PerkDesc> { }

export class PerkDesc extends EffectDescription {
    constructor(key: string, name: string, desc: string, longDesc: string = null) {
        super(key, name, desc, longDesc);
    }

    public description(perk?: Perk, character?: Character): string {
        return super.description();
    }
}
