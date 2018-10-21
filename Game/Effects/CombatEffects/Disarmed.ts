import { Character } from '../../Character/Character';
import { CombatManager } from '../../Combat/CombatManager';
import { CombatEffect } from '../CombatEffect';

export class Disarmed extends CombatEffect {
    public onAdd(character: Character) {
        if (character.inventory.equipment.weapon !== character.inventory.equipment.defaultWeaponSlot.item) {
            const droppedWeapon = character.inventory.equipment.equippedWeaponSlot.unequip();
            if (droppedWeapon)
                CombatManager.itemsOnFloor.add(droppedWeapon);
        }
    }
}
