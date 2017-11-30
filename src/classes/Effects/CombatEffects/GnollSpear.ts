import Character from '../../Character/Character';
import CombatEffect from '../CombatEffect';

export class GnollSpear extends CombatEffect {
    public onRemove(character: Character) {
        character.stats.spe += this.value1;
    }
}
