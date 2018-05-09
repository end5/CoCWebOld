import { Character } from '../../Character/Character';
import { CombatManager } from '../../Combat/CombatManager';
import { CombatEffect } from '../CombatEffect';

export class Disarmed extends CombatEffect {
    public onAdd(character: Character) {
        if (character.inventory.equipment.weapon !== character.inventory.equipment.defaultWeaponSlot.item) {
            CombatManager.itemsOnFloor.add(character.inventory.equipment.weapon);
            character.inventory.equipment.weapon.unequip();
        }
    }
}
