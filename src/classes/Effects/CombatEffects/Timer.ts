import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import CombatEffect from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';

export class Timer extends CombatEffect {
    public update(character: Character, enemy: Character) {
        if (character.charType !== CharacterType.Player) {
            if (character.combat.effects.get(CombatEffectType.Timer).value1 <= 0)
                character.combat.effects.remove(CombatEffectType.Timer);
            character.combat.effects.get(CombatEffectType.Timer).value1 -= 1;
        }
    }
}
