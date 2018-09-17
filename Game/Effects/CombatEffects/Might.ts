import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';

export class Might extends CombatEffect {
    public onRemove(character: Character) {
        character.stats.str += -this.value1;
        character.stats.tou += -this.value2;
    }
}
