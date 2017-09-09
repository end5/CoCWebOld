import ItemType from "../../ItemType"
import Armor from "../Armor"

export default class LeatherArmorSegments extends Armor {
		
	public constructor() {
		super("UrtaLta", "UrtaLta", "leather armor segments", "leather armor segments", 5, 76, null, "Light", true);
	}
	public removeText():void {
		Render.text("You have your old set of " + game.armors.LEATHRA.longName + " left over.  ");
	}
		
	public playerRemove():Armor {
		super.playerRemove();
		return game.armors.LEATHRA;
	}
}

