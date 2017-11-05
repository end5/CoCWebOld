import Item from './Item';
import Character from '../Character/Character';

export default abstract class EquipableItem extends Item {
    /**
     * This item is being equipped by the character. Add any perks, etc. - This should only handle mechanics, not text output
     * @param character 
     */
    abstract equip(character: Character): void;

    /**
     * This item is being unequiped by the character. Remove any perks, etc. - This should only handle mechanics, not text output
     * @param character 
     */
    abstract unequip(character: Character): void;

    /**
     * Produces any text seen when equiping the item normally
     */
    abstract equipText(): void;

    /**
     * Produces any text seen when unequiping the item normally
     */
    abstract unequipText(): void;
}
