import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class Web extends CombatEffect {
    public onRemove(character: Character) {
        character.stats.spe += character.combat.effects.get(CombatEffectType.Web).value1;
    }
}
