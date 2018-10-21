import { Character } from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import { CombatEffect } from '../CombatEffect';
import { CombatEffectType } from '../CombatEffectType';
import { CView } from '../../../Engine/Display/ContentView';

export class CoonWhip extends CombatEffect {
    public update(character: Character) {
        const coonWhipEffect = character.combat.effects.get(CombatEffectType.CoonWhip)!;
        if (character.charType !== CharacterType.Player) {
            if (coonWhipEffect.value2 <= 0) {

                // handled elsewhere
                // character.inventory.armorSlot.equipment.defense += coonWhipEffect.value1;

                character.combat.effects.remove(CombatEffectType.CoonWhip);
                CView.text("<b>Tail whip wears off!</b>");
            }
            else {
                coonWhipEffect.value2 -= 1;
                CView.text("<b>Tail whip is currently reducing your foe" + character.desc.plural ? "s'" : "'s" + " armor by " + coonWhipEffect.value1 + ".</b>");
            }
            CView.text("\n\n");
        }
    }
}
