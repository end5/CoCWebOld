import Item from './Item';
import Character from '../Character/Character';
import EquipmentSlot from '../Inventory/EquipmentSlot';

export default abstract class EquipableItem extends Item {
    protected slot: EquipmentSlot;
    /**
     * This item is being equipped by the character. Add any perks, etc. - This should only handle mechanics, not text output
     * @param slot
     */
    public abstract onEquip(character: Character): void;

    public equip(slot: EquipmentSlot): void {
        this.slot = slot;
        slot.equip(this);
    }

    /**
     * This item is being unequiped by the character. Remove any perks, etc. - This should only handle mechanics, not text output
     * @param character
     */
    public abstract onUnequip(character: Character): void;

    public unequip(): void {
        this.slot.unequip();
        this.slot = null;
    }

    /**
     * Produces any text seen when equiping the item normally
     */
    public abstract equipText(): void;

    /**
     * Produces any text seen when unequiping the item normally
     */
    public abstract unequipText(): void;
}
