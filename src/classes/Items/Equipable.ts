//No longer used - equipping Weapons and Armor is now handled by the inventoryMenu

/**
	* Superclass for items that could be equipped by player (armor, weapon, talisman, piercing, ...).
	* Subclasses should override "equip" and "unequip" methods. Optionally, they could override "equipEffect" and
	* "unequipEffect" methods that perform additional effects on player. By default, they do nothing.
	* Overridden "equip" and "unequip" should call "equipped" and "unequipped" if equipped/unequipped succesfully.
	*/
export default class Equipable extends Consumable {

	/**
		* Called on attempt to equip item.
		* @param output Print "equipping" scene to output
		*/
    public canUse(player: Player, output: boolean): boolean {
        return true;
    }

	/**
		* Called after item succesfully equipped. By default, does nothing. Should add perks/effects/etc.
		*/
    public equipEffect(player: Player, output: boolean): void {

    }

	/**
		* Called after item succesfully unequipped. By default, does nothing. Should remove perks/effects/etc.
		*/
    public unequipEffect(player: Player, output: boolean): void {

    }

    protected equipped(player: Player, output: boolean): void {
        equipEffect(player, output);
    }

    protected unequipped(player: Player, output: boolean): void {
        unequipEffect(player, output);
    }

    protected equip(player: Player, returnOldItem: boolean, output: boolean): void {
    }

	/**
		* @param returnToInventory true if that item should be placed in player's inventory
		* @param output true if the unequip function should print to the screen
		*/
    public unequip(player: Player, returnToInventory: boolean, output: boolean = false): void {
    }

    public doEffect(player: Player, output: boolean): void {
        if (game.debug && !(this is GooArmor)){
            if (output) {
                clearOutput();
                Render.text("You cannot equip anything in debug mode.  Please restart the game in normal mode to equip items.");
            }
            return;
        }
        equip(player, true, output);
    }

    public Equipable(id: string, shortName: string = null, longName: string = null, value: number = 0, description: string = null) {
        super(id, shortName, longName, value, description);
    }

    protected unequipReturnItem(player: Player, output: boolean): ItemType {
        return this;
    }
}

