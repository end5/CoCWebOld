import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';

export class UBERWEB extends StatusAffect {
    public update(character: Character): string {
        return "<b>You're pinned under a pile of webbing!  You should probably struggle out of it and get back in the fight!</b>\n\n";
    }
}
