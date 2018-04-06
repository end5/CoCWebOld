import DisplayText from '../../../Engine/display/DisplayText';
import Character from '../../Character/Character';
import CombatEffect from '../CombatEffect';

export class AcidSlap extends CombatEffect {
    public update(character: Character) {
        const slap: number = 3 + (character.stats.maxHP() * 0.02);
        character.combat.stats.loseHP(slap, this.inflictedBy);
        DisplayText("Your muscles twitch in agony as the acid keeps burning you. (" + slap + ")").bold();
        DisplayText("\n\n");
    }
}
