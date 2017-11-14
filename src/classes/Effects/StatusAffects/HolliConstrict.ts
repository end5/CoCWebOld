import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';

export class HolliConstrict extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character): string {
        return "<b>You're tangled up in Holli's verdant limbs!  All you can do is try to struggle free...</b>\n\n";
    }
}
