import Character from '../../Character/Character';
import CombatEffect from '../CombatEffect';

export class ParalyzeVenom extends CombatEffect {
    public onRemove(character: Character) {
        character.stats.str += this.value1;
        character.stats.spe += this.value2;
    }
}
