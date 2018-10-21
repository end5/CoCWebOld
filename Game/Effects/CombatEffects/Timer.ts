import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class Timer extends CombatEffect {
    public update(character: Character, enemy: Character) {
        const timerEffect = character.combat.effects.get(CombatEffectType.Timer)!;
        if (character.charType !== CharacterType.Player) {
            if (timerEffect.value1 <= 0)
                character.combat.effects.remove(CombatEffectType.Timer);
            timerEffect.value1 -= 1;
        }
    }
}
