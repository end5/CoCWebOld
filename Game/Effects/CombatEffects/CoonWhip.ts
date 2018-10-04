import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';
import { CView } from '../../../Engine/Display/ContentView';

export class CoonWhip extends CombatEffect {
    public update(character: Character) {
        if (character.charType !== CharacterType.Player) {
            if (character.combat.effects.get(CombatEffectType.CoonWhip).value2 <= 0) {

                // handled elsewhere
                // character.inventory.armorSlot.equipment.defense += character.combat.effects.get(CombatEffectType.CoonWhip).value1;

                character.combat.effects.remove(CombatEffectType.CoonWhip);
                CView.text("<b>Tail whip wears off!</b>");
            }
            else {
                character.combat.effects.get(CombatEffectType.CoonWhip).value2 -= 1;
                CView.text("<b>Tail whip is currently reducing your foe" + character.desc.plural ? "s'" : "'s" + " armor by " + character.combat.effects.get(CombatEffectType.CoonWhip).value1 + ".</b>");
            }
            CView.text("\n\n");
        }
    }
}
