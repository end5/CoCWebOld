import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';
import { StatusAffectType } from '../StatusAffectType';

export class ThroatPunch extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character): string {
        character.statusAffects.get(StatusAffectType.ThroatPunch).value1--;
        if (character.statusAffects.get(StatusAffectType.ThroatPunch).value1 >= 0)
            return "Thanks to Isabella's wind-pipe crushing hit, you're having trouble breathing and are <b>unable to cast spells as a consequence.</b>\n\n";
        else {
            character.statusAffects.remove(StatusAffectType.ThroatPunch);
            return "Your wind-pipe recovers from Isabella's brutal hit.  You'll be able to focus to cast spells again!\n\n";
        }
    }
}
