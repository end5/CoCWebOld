import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import Game from '../../Game/Game';
import Player from '../../Player/Player';
import EquipableItem from '../EquipableItem';
import { ItemType } from '../Item';
import ItemDesc from '../ItemDesc';

export type ArmorClass = "Light" | "Medium" | "Heavy" | "";

export default abstract class Armor extends EquipableItem {
    public readonly defense: number;
    public readonly armorClass: ArmorClass;
    public readonly displayName: string;
    private _supportsBulge: boolean;

    constructor(key: string, itemDesc: ItemDesc, displayname: string, defense: number, value?: number, armorClass: ArmorClass = "Light", supportsBulge: boolean = false) {
        super(key, ItemType.Armor, itemDesc, value);
        this.displayName = displayname;
        this.defense = defense;
        this.armorClass = armorClass;
        this._supportsBulge = supportsBulge;
    }

    public supportsBulge(character: Character): boolean { return this._supportsBulge && character.inventory.armorSlot.descMod == ""; }
    //For most clothes if the armorDescMod is set then it's Exgartuan's doing. The comfortable clothes are the exception, they override this function.

    public canUse(character: Character): boolean {
        return true;
    }

    public useText(character: Character): void {
        DisplayText.text("You equip " + this.desc.longName + ".  ");
    }

    public equip(character: Character) {
        this.onEquip(character);
    }

    /**
     * This item is being unequiped by the character. Remove any perks, etc. - This should only handle mechanics, not text output
     * @param character 
     */
    public unequip(character: Character) {
        while (character.perks.has(PerkType.BulgeArmor))
            character.perks.remove(PerkType.BulgeArmor); //TODO remove this Exgartuan hack
        if (character.inventory.armorSlot.descMod.length > 0)
            character.inventory.armorSlot.descMod = "";
        this.onUnequip(character);
    }

    /**
     * Called last in equip.
     * @param character 
     */
    abstract onEquip(character: Character);

    /**
     * Called last in unequip.
     * @param character 
     */
    abstract onUnequip(character: Character);
}

export class GenericArmor extends Armor {
    use(player: Player) { }
    
    equipText(): void { }
    unequipText(): void { }

    onEquip(character: Character) { }
    onUnequip(character: Character) { }
}