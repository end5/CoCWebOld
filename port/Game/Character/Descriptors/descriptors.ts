import { Appearance } from '../classes/classes/Appearance';
import { CoC_Settings } from '../classes/classes/CoC_Settings';
import { kGAMECLASS } from '../classes/classes/GlobalFlags/kGAMECLASS';
import { Utils } from '../classes/classes/internals/Utils';
import { rand } from '../Engine/Utilities/SMath';

export function sackDescript(): string
{
	return Appearance.sackDescript(kGAMECLASS.player);
}

export function cockClit(number: number = 0): string {
	if(kGAMECLASS.player.hasCock() && number >= 0 && number < kGAMECLASS.player.cockTotal()) return kGAMECLASS.player.cockDescript(number);
	else return clitDescript();
}

export function chestDesc(): string {
	return kGAMECLASS.player.chestDesc();
}

export function tongueDescript(): string {
	return Appearance.tongueDescription(kGAMECLASS.player);
}
export function wingsDescript(): string {
	return Appearance.wingsDescript(kGAMECLASS.player);
}
export function tailDescript(): string {
	return Appearance.tailDescript(kGAMECLASS.player);
}
export function oneTailDescript(): string {
	return Appearance.oneTailDescript(kGAMECLASS.player);
}

export function ballsDescriptLight(forcedSize: boolean = true): string {
	return Appearance.ballsDescription(forcedSize, true, kGAMECLASS.player);
}

export function ballDescript(): string {
	return Appearance.ballsDescription(false, false, kGAMECLASS.player);
}

export function ballsDescript(): string {
	return Appearance.ballsDescription(false, true, kGAMECLASS.player, true);
}
export function simpleBallsDescript(): string {
	return Appearance.ballsDescription(false, true, kGAMECLASS.player);
}

export function assholeDescript(): string {
	return Appearance.assholeDescript(kGAMECLASS.player);
}
		
export function hipDescript(): string {
	return Appearance.hipDescription(kGAMECLASS.player);
}
export function assDescript(): string {
	return buttDescript();
}
export function buttDescript(): string {
	return Appearance.buttDescription(kGAMECLASS.player);
}

export function nippleDescript(rowNum: number): string {
	return Appearance.nippleDescription(kGAMECLASS.player, rowNum);
}

export function hairDescript(): string {
	return Appearance.hairDescription(kGAMECLASS.player);
}

export function hairOrFur(): string {
	return Appearance.hairOrFur(kGAMECLASS.player);
}

export function clitDescript(): string {
	return Appearance.clitDescription(kGAMECLASS.player);
}

//Vaginas + Descript
export function vaginaDescript(vaginaNum: number = 0): string {
	return Appearance.vaginaDescript(kGAMECLASS.player, vaginaNum);
}

//Allvagina descript
export function allVaginaDescript(): string {
	if (kGAMECLASS.player.vaginas.length == 1) return vaginaDescript(rand(kGAMECLASS.player.vaginas.length - 1));
	if (kGAMECLASS.player.vaginas.length > 1) return (vaginaDescript(rand(kGAMECLASS.player.vaginas.length - 1)) + "s");
	
	CoC_Settings.error("ERROR: allVaginaDescript called with no vaginas.");
	return "ERROR: allVaginaDescript called with no vaginas.";
}

export function cockDescript(cockNum: number = 0): string 
{
	return kGAMECLASS.player.cockDescript(cockNum);
}

export function allBreastsDescript(): string {
	return Appearance.allBreastsDescript(kGAMECLASS.player);
}
	
export function breastDescript(rowNum: number): string
{
	return kGAMECLASS.player.breastDescript(rowNum);
}

export function num2Text(number: number): string {
	return Utils.num2Text(number);
}

export function num2Text2(number: number): string {
	return Utils.num2Text2(number);
}

export function Num2Text(number: number): string {
	return Utils.Num2Text(number);
}
