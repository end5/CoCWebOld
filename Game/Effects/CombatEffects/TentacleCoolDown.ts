import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class TentacleCoolDown extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType !== CharacterType.Player) {
            character.combat.effects.get(CombatEffectType.TentacleCoolDown).value1 -= 1;
            if (character.combat.effects.get(CombatEffectType.TentacleCoolDown).value1 === 0) {
                character.combat.effects.remove(CombatEffectType.TentacleCoolDown);
            }
        }
    }
}
