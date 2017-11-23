import Armor from './Armor';
import Character from '../../Character/Character';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class ComfortableClothes extends Armor {
    public constructor() {
        super("C.Cloth", new ItemDesc("C.Cloth", "a set of comfortable clothes", "These loose fitting and comfortable clothes allow you to move freely while protecting you from the elements."), "comfortable clothes", 0, 0, "Light", true);
    }
    
    use(player: Player) { }
    
    public supportsBulge(player: Player): boolean {
        return player.inventory.armorSlot.descMod != "crotch-hugging clothes";
    }
    
    equipText(): void { }
    unequipText(): void { }
    
    onEquip(character: Character) { }
    onUnequip(character: Character) { }
}
