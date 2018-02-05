import Armor from './Armor';
import ArmorName from './ArmorName';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class ComfortableClothes extends Armor {
    public constructor() {
        super(ArmorName.ComfortClothes, new ItemDesc("C.Cloth", "a set of comfortable clothes", "These loose fitting and comfortable clothes allow you to move freely while protecting you from the elements."), "comfortable clothes", 0, 0, "Light", true);
    }

    public supportsBulge(player: Player): boolean {
        return player.inventory.equipment.armorDescMod !== "crotch-hugging clothes";
    }
}
