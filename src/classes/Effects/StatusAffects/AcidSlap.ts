import Character from '../../Character/Character';
import StatusAffect from '../StatusAffect';

export class AcidSlap extends StatusAffect {
    public update(character: Character): string {
        let slap: number = 3 + (character.stats.maxHP() * 0.02);
        return "<b>Your muscles twitch in agony as the acid keeps burning you. (" + slap + ")</b>\n\n";
    }
}
