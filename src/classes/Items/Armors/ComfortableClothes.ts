import Armor from './Armor';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default class ComfortableClothes extends Armor {
	public constructor() {
		super("C.Cloth", new ItemDesc("C.Cloth", "a set of comfortable clothes", "These loose fitting and comfortable clothes allow you to move freely while protecting you from the elements.  (DEF: +0) (Cost: 0)"), "comfortable clothes", 0, 0, "Light", true);
	}
		
	public supportsBulge(player: Player):boolean {
        return player.inventory.armorDescMod != "crotch-hugging clothes";
    }
}
