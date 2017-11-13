import Effect from './Effect';
import PerkDesc from './PerkDesc';
import { PerkType } from './PerkType';
import Game from '../Game/Game';

export default class Perk extends Effect {
    public readonly type: PerkType;
    public constructor(type: PerkType, desc: PerkDesc, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        super(type, desc, value1, value2, value3, value4);
        this.type = type;
    }
}