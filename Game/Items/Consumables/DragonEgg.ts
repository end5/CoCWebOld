import { Consumable } from './Consumable';
import { ConsumableName } from './ConsumableName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { Character } from '../../Character/Character';
import { PerkType } from '../../Effects/PerkType';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import { ItemDesc } from '../ItemDesc';

export class DragonEgg extends Consumable {
    public constructor() {
        super(ConsumableName.DragonEgg, new ItemDesc("DrgnEgg", "an unfertilized dragon egg", "A large, solid egg, easily the size of your clenched fist.  Its shell color is reddish-white, with blue splotches."));
    }

    public use(character: Character) {
        DisplayText().clear();
        // Effect:
        // Boosts the special effect of Dragonbreath by 20% for 1 use. ie: if Tainted's breath weapon has a 80% chance to stun on hit, +20% equals 100% chance to stun.
        DisplayText("You crack the shell easily and swallow the large yolk and the copious amounts of albumen - the yolk is blue, while the rest is crimson-tinted.  It tastes like... well, it tastes mostly of spiced mint, you think.");
        if (character.perks.has(PerkType.Dragonfire)) {
            if (character.statusAffects.has(StatusAffectType.DragonBreathCooldown)) character.statusAffects.remove(StatusAffectType.DragonBreathCooldown);
            else if (!character.statusAffects.has(StatusAffectType.DragonBreathBoost))
                character.statusAffects.add(StatusAffectType.DragonBreathBoost, 0, 0, 0, 0);
            // (if PC has breath weapon)
            DisplayText("\n\nA sudden surge of energy fills your being and you feel like you could blast anything to atoms with a single breath, like the mighty dragons of legends.");
        }
        character.stats.fatigue -= 20;
    }
}
