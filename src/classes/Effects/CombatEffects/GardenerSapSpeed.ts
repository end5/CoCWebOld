import Character from '../../Character/Character';
import CombatEffect from '../CombatEffect';

export class GardenerSapSpeed extends CombatEffect {
    public onRemove(character: Character) {
        character.stats.spe += this.value1;
    }
}
