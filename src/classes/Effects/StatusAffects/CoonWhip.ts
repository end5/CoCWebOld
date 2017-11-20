import Character from '../../Character/Character';
import { CharacterType } from '../../Character/CharacterType';
import StatusAffect from '../StatusAffect';
import { StatusAffectType } from '../StatusAffectType';

export class CoonWhip extends StatusAffect {
    public combatUpdate(character: Character, enemy: Character): string {
        if (character.charType == CharacterType.Player) {
        }
        else {
            if (character.statusAffects.get(StatusAffectType.CoonWhip).value2 <= 0) {

                // handled elsewhere
                //character.inventory.armorSlot.equipment.defense += character.statusAffects.get(StatusAffectType.CoonWhip).value1;

                character.statusAffects.remove(StatusAffectType.CoonWhip);
                return "<b>Tail whip wears off!</b>\n\n";
            }
            else {
                character.statusAffects.get(StatusAffectType.CoonWhip).value2 -= 1;
                return "<b>Tail whip is currently reducing your foe" + character.desc.plural ? "s'" : "'s" + " armor by " + character.statusAffects.get(StatusAffectType.CoonWhip).value1 + ".</b>\n\n";
            }
        }
    }
}
