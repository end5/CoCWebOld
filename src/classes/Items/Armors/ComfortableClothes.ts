import Armor from './Armor';
import ArmorName from './ArmorName';
import Character from '../../Character/Character';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class ComfortableClothes extends Armor {
    public constructor() {
        super(ArmorName.ComfortClothes, new ItemDesc("C.Cloth", "a set of comfortable clothes", "These loose fitting and comfortable clothes allow you to move freely while protecting you from the elements."), "comfortable clothes", 0, 0, "Light", true);
    }
    
    public use(player: Player) { }
    
    public supportsBulge(player: Player): boolean {
        return player.inventory.armorSlot.descMod != "crotch-hugging clothes";
    }
    
    public equipText(): void { }
    public unequipText(): void { }
    
    public onEquip(character: Character) { }
    public onUnequip(character: Character) { }
}
