import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';

export class UBERWEB extends StatusAffect {
    public removeOnCombatEnd(): boolean {
        return true;
    }

    public combatUpdate(character: Character): string {
        return "<b>You're pinned under a pile of webbing!  You should probably struggle out of it and get back in the fight!</b>\n\n";
    }
}
