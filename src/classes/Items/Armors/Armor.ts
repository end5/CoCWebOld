import ArmorName from './ArmorName';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import { PerkType } from '../../Effects/PerkType';
import EquipableItem from '../EquipableItem';
import ItemDesc from '../ItemDesc';
import ItemType from '../ItemType';

export type ArmorClass = "Light" | "Medium" | "Heavy" | "";

export default class Armor extends EquipableItem {
    public readonly defense: number;
    public readonly armorClass: ArmorClass;
    public readonly displayName: string;
    private readonly canBulge: boolean;

    constructor(name: ArmorName, desc: ItemDesc, displayname: string, defense: number, value?: number, armorClass: ArmorClass = "Light", supportsBulge: boolean = false) {
        super(name, ItemType.Armor, desc, value);
        this.displayName = displayname;
        this.defense = defense;
        this.armorClass = armorClass;
        this.canBulge = supportsBulge;
    }

    public supportsBulge(character: Character): boolean { return this.canBulge && character.inventory.equipment.armorDescMod == ""; }
    // For most clothes if the armorDescMod is set then it's Exgartuan's doing. The comfortable clothes are the exception, they override this function.

    public canUse(character: Character): boolean {
        return true;
    }

    public useText(character: Character): void {
        DisplayText("You equip " + this.desc.longName + ".  ");
    }

    public describe(): string {
        return super.describe() + " (DEF: +" + this.defense + ")";
    }

    public use(character: Character) { }

    public equipText(): void { }
    public unequipText(): void { }
    public onEquip(character: Character) { }

    /**
     * This item is being unequiped by the character. Remove any perks, etc. - This should only handle mechanics, not text output
     * @param character
     */
    public onUnequip(character: Character) {
        while (character.perks.has(PerkType.BulgeArmor))
            character.perks.remove(PerkType.BulgeArmor); // TODO remove this Exgartuan hack
        if (character.inventory.equipment.armorDescMod.length > 0)
            character.inventory.equipment.armorDescMod = "";
    }
}
