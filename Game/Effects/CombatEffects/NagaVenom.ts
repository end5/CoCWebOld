import { randInt } from '../../../Engine/Utilities/SMath';
import { Character } from '../../Character/Character';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';
import { PerkType } from '../PerkType';
import { CView } from '../../../Engine/Display/ContentView';

export class NagaVenom extends CombatEffect {
    public onRemove(character: Character) {
        character.stats.spe += character.combat.effects.get(CombatEffectType.NagaVenom).value1;
    }

    public update(character: Character) {
        character.combat.stats.loseHP(2, this.inflictedBy);
        CView.text("You wince in pain and try to collect yourself, the naga's venom still plaguing you.");
        CView.text("\n\n");
        if (character.perks.has(PerkType.Medicine) && randInt(100) <= 14) {
            character.stats.spe += character.combat.effects.get(CombatEffectType.NagaVenom).value1;
            character.combat.effects.remove(CombatEffectType.NagaVenom);
            CView.text("You manage to cleanse the naga venom from your system with your knowledge of medicine!");
            CView.text("\n\n");
        }
        else if (character.stats.spe > 3) {
            character.combat.effects.get(CombatEffectType.NagaVenom).value1 += 2;
            character.stats.spe -= 2;
        }
        else
            character.combat.stats.loseHP(5, this.inflictedBy);
    }
}
