import Armor from "../Armor"
import Player from "../../Player"

export default class FurLoincloth extends Armor
{
	public get description():string
	{
		return "A pair of loincloths to cover your crotch and " + player.buttDescript() + ".  Typically worn by people named 'Conan'."
	}

	public constructor()
	{
		super("FurLoin","FurLoin","revealing fur loincloths","a front and back set of loincloths",0,100,"A pair of loincloths to cover your crotch and butt.  Typically worn by people named 'Conan'.","Light");
	}
}
