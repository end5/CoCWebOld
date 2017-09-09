import Appearance from "appearance";
import CockType from "CockTypeEnum";
import Utils from ";

public function sackDescript():string
{
	return Appearance.sackDescript(player);
}

public function cockClit(number: number = 0):string {
	if(player.lowerBody.cockSpot.hasCock() && number >= 0 && number < player.lowerBody.cockSpot.count()) return player.cockDescript(number);
	else return clitDescript();
}

public function chestDesc():string {
	return player.chestDesc();
}

public function tongueDescript():string {
	return Appearance.tongueDescription(player);
}
public function wingsDescript():string {
	return Appearance.wingsDescript(player);
}
public function tailDescript():string {
	return Appearance.tailDescript(player);
}
public function oneTailDescript():string {
	return Appearance.oneTailDescript(player);
}

public function ballsDescriptLight(forcedSize:boolean = true):string {
	return Appearance.ballsDescription(forcedSize, true, player);
}

public function ballDescript():string {
	return Appearance.ballsDescription(false, false, player);
}

public function ballsDescript():string {
	return Appearance.ballsDescription(false, true, player, true);
}
public function simpleBallsDescript():string {
	return Appearance.ballsDescription(false, true, player);
}

public function assholeDescript():string {
	return Appearance.assholeDescript(player);
}
		
public function hipDescript():string {
	return Appearance.hipDescription(player);
}
public function assDescript():string {
	return buttDescript();
}
public function buttDescript():string {
	return Appearance.buttDescription(player);
}

public function nippleDescript(rowNum:number):string {
	return Appearance.nippleDescription(player, rowNum);
}

public function hairDescript():string {
	return Appearance.hairDescription(player);
}

public function hairOrFur():string {
	return Appearance.hairOrFur(player);
}

public function clitDescript():string {
	return Appearance.clitDescription(player);
}

//Vaginas + Descript
public function vaginaDescript(vaginaNum:number = 0):string {
	return Appearance.vaginaDescript(player, vaginaNum);
}

//Allvagina descript
public function allVaginaDescript():string {
	if (player.lowerBody.vaginaSpot.count() == 1) return vaginaDescript(rand(player.lowerBody.vaginaSpot.count() - 1));
	if (player.lowerBody.vaginaSpot.count() > 1) return (vaginaDescript(rand(player.lowerBody.vaginaSpot.count() - 1)) + "s");
	
	CoC_Settings.error("ERROR: allVaginaDescript called with no vaginas.");
	return "ERROR: allVaginaDescript called with no vaginas.";
}

public function cockDescript(cockNum: number = 0):string 
{
	return player.cockDescript(cockNum);
}

public function allBreastsDescript():string {
	return Appearance.allBreastsDescript(player);
}
	
public function breastDescript(rowNum:number):string
{
	return player.breastDescript(rowNum);
}

public function num2Text(number: number):string {
	return Utils.num2Text(number);
}

public function num2Text2(number: number):string {
	return Utils.num2Text2(number);
}

public function Num2Text(number: number):string {
	return Utils.Num2Text(number);
}
