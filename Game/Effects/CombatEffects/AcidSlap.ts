import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { CView } from '../../../Engine/Display/ContentView';

export class AcidSlap extends CombatEffect {
    public update(character: Character) {
        const slap: number = 3 + (character.stats.maxHP() * 0.02);
        character.combat.stats.loseHP(slap, this.inflictedBy);
        CView.text("<b>Your muscles twitch in agony as the acid keeps burning you. (" + slap + ")</b>\n\n");
    }
}
