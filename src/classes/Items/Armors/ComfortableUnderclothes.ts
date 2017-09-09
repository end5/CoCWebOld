import ItemType from "../../ItemType"
import Armor from "../Armor"
import Player from "../../Player"

export default class ComfortableUnderclothes extends Armor {
		
	public constructor() {
		super("c.under", "c.under", "comfortable underclothes", "comfortable underclothes", 0, 0, "comfortable underclothes", "");
	}
		
	public playerRemove():Armor {
		return null; //Player never picks up their underclothes
	}

}
