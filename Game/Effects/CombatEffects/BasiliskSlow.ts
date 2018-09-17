import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';

export class BasiliskSlow extends CombatEffect {
    public onRemove(character: Character) {
        character.stats.spe += this.value1;
    }
}
