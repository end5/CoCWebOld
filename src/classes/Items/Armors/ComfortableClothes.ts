import ItemType from "../../ItemType"
import Armor from "../Armor"
import Player from "../../Player"

export default class ComfortableClothes extends Armor {
		
	public constructor() {
		super("C.Cloth", "C.Cloth", "comfortable clothes", "a set of comfortable clothes", 0, 0, "These loose fitting and comfortable clothes allow you to move freely while protecting you from the elements.  (DEF: +0) (Cost: 0)", "Light", true);
	}
		
	public get supportsBulge():boolean {
        return this.player.modArmorName != "crotch-hugging clothes";
    }
}
