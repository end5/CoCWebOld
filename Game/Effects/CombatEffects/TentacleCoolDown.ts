import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class TentacleCoolDown extends CombatEffect {
    public update(character: Character, enemy: Character) {
        const tentacleCooldownEffect = character.combat.effects.get(CombatEffectType.TentacleCoolDown)!;
        if (character.charType !== CharacterType.Player) {
            tentacleCooldownEffect.value1 -= 1;
            if (tentacleCooldownEffect.value1 === 0) {
                character.combat.effects.remove(CombatEffectType.TentacleCoolDown);
            }
        }
    }
}
