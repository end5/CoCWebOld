import { DisplayText } from '../../../Engine/display/DisplayText';
import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';
import { PerkType } from '../PerkType';

export class Poison extends CombatEffect {
    public update(character: Character) {
        if (character.perks.has(PerkType.Medicine) && randInt(100) <= 14) {
            character.combat.effects.remove(CombatEffectType.Poison);
            DisplayText("You manage to cleanse the poison from your system with your knowledge of medicine!");
        }
        else {
            character.combat.stats.loseHP(8 + randInt(character.stats.maxHP() / 20), null);
            DisplayText("The poison continues to work on your body, wracking you with pain!");
        }
        DisplayText("\n\n");
    }
}
