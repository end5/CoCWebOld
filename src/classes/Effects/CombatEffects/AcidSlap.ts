import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import CombatEffect from '../CombatEffect';

export class AcidSlap extends CombatEffect {
    public update(character: Character) {
        let slap: number = 3 + (character.stats.maxHP() * 0.02);
        character.combat.stats.loseHP(slap, this.inflictedBy);
        DisplayText.bold("Your muscles twitch in agony as the acid keeps burning you. (" + slap + ")");
        DisplayText.newParagraph();
    }
}
