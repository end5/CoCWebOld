﻿import BreastRow, { BreastCup } from '../../Body/BreastRow';
import { ButtLooseness, ButtRating, ButtWetness } from '../../Body/Butt';
import { SkinType } from '../../Body/Creature';
import { HipRating } from '../../Body/LowerBody';
import Vagina, { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import StatusAffect from '../../Effects/StatusAffect';
import Monster, { MonsterType } from '../../Monster';

export default class Amily extends Monster {

	override protected performCombatAction(): void {
		if (findStatusAffect(StatusAffects.Concentration) < 0 && rand(4) == 0) amilyConcentration();
		else if (rand(3) == 0) amilyDartGo();
		else if (rand(2) == 0) amilyDoubleAttack();
		else amilyAttack();
	}

	//COMBAT AMILY STUFF
	//(Has regular attack)
	public amilyAttack(): void {
		let dodged: number = 0;
		let damage: number;
		//return to combat menu when finished
		doNext(game.playerMenu);
		//Blind dodge change
		if (statusAffects.has("Blind") && rand(3) < 2) {
			MainScreen.text(capitalA + short + " completely misses you with a blind attack!\n", false);
			game.combatRoundOver();
			return;
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			dodged = 1;
		}
		//Determine if evaded
		if (player.perks.has("Evade") && rand(100) < 10) {
			dodged = 2;
		}
		//("Misdirection"
		if (player.perks.has("Misdirection") && rand(100) < 10 && player.inventory.armor.displayName == "red, high-society bodysuit") {
			dodged = 3;
		}
		//Determine if cat'ed
		if (player.perks.has("Flexibility") && rand(100) < 6) {
			dodged = 4;
		}
		//Determine damage - str modified by enemy toughness!
		damage = int((str + weaponAttack) - Math.random() * (player.stats.tou + player.armorDef));
		//Dodged
		if (dodged > 0) {
			MainScreen.text("Amily dashes at you and swipes her knife, but you quickly sidestep the blow.", false);
			//Add tags for miss/evade/flexibility/etc.
			switch (dodged) {
				case 1:
					MainScreen.text(" [Dodge]", false);
					break;
				case 2:
					MainScreen.text(" [Evade]", false);
					break;
				case 3:
					MainScreen.text(" [Misdirect]", false);
					break;
				case 4:
					MainScreen.text(" [Flexibility]", false);
					break;
				default:
					CoC_Settings.error();
					MainScreen.text(" <b>[ERROR]</b>", false);
					break;
			}
		}
		//Blocked
		else if (damage <= 0) {
			damage = 0;
			//Due to toughness or amor...
			if (rand(player.armorDef + player.stats.tou) < player.armorDef) MainScreen.text("Your " + player.inventory.armor.displayName + " absorb and deflect every " + weaponVerb + " from " + a + short + ".", false);
			else MainScreen.text("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.", false);
		}
		//Got hit!
		else {
			damage = player.takeDamage(damage);
			MainScreen.text("Amily dashes at you and swipes her knife, cutting you (" + damage + ").", false);
		}
		if (damage > 0) {
			if (lustVuln > 0 && player.inventory.armor.displayName == "barely-decent bondage straps") {
				if (!plural) MainScreen.text("\n" + capitalA + short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.", false);
				else MainScreen.text("\n" + capitalA + short + " brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.", false);
				lust += 10 * lustVuln;
			}
		}
		game.statScreenRefresh();
		MainScreen.text("\n", false);
		game.combatRoundOver();
	}

	//(Special Attacks)
	//-Double Attack: Same as a normal attack, but hits twice.
	public amilyDoubleAttack(): void {
		let dodged: number = 0;
		let damage: number = 0;
		//return to combat menu when finished
		doNext(game.playerMenu);
		//Blind dodge change
		if (statusAffects.has("Blind") && rand(3) < 2) {
			dodged++;
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			dodged++;
		}
		//Determine if evaded
		if (player.perks.has("Evade") && rand(100) < 10) {
			dodged++;
		}
		//("Misdirection"
		if (player.perks.has("Misdirection") && rand(100) < 10 && player.inventory.armor.displayName == "red, high-society bodysuit") {
			dodged++;
		}
		//Determine if cat'ed
		if (player.perks.has("Flexibility") && rand(100) < 6) {
			dodged++;
		}
		//Get hit!
		if (dodged < 2) {
			//Determine damage - str modified by enemy toughness!
			damage = int((str + weaponAttack) - Math.random() * (player.stats.tou + player.armorDef));
			//Double damage if no dodge.
			if (dodged == 0) damage *= 2;
			//Blocked?
			if (damage == 0) {
				MainScreen.text("Amily dashes at you and slashes at you twice in the time it would take most to throw a single blow, but she can't cut deep enough to wound you!", false);
			}
			//NOT BLOCKED!
			else {
				damage = player.takeDamage(damage);
				if (dodged > 0) MainScreen.text("Amily dashes at you and quickly slashes you twice; you manage to avoid the first blow, but the second one hits home, cutting you", false);
				else MainScreen.text("Amily dashes at you and slashes at you twice in the time it would take most to throw a single blow", false);
				MainScreen.text(" (" + damage + ")!", false);
			}
		}
		//Dodge all!
		else MainScreen.text("Amily dashes at you and quickly slashes you twice, but you quickly sidestep her first blow and jump back to avoid any follow-ups.", false);

		game.combatRoundOver();
	}

	//-Poison Dart: Deals speed and str damage to the PC. (Not constant)
	private amilyDartGo(): void {
		let dodged: number = 0;
		//Blind dodge change
		if (statusAffects.has("Blind") && rand(3) < 2) {
			MainScreen.text(capitalA + short + " completely misses you with a blind attack from her dartgun!\n", false);
			game.combatRoundOver();
			return;
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			dodged = 1;
		}
		//Determine if evaded
		if (player.perks.has("Evade") && rand(100) < 10) {
			dodged = 2;
		}
		//("Misdirection"
		if (player.perks.has("Misdirection") && rand(100) < 15 && player.inventory.armor.displayName == "red, high-society bodysuit") {
			dodged = 3;
		}
		//Determine if cat'ed
		if (player.perks.has("Flexibility") && rand(100) < 15) {
			dodged = 4;
		}
		//Dodged
		if (dodged > 0) {
			MainScreen.text("Amily dashes at you and swipes her knife rather slowly. You easily dodge the attack; but it was all a feint, her other hands tries to strike at you with a poisoned dart. Luckily you manage to avoid it.", false);
			//Add tags for miss/evade/flexibility/etc.
			switch (dodged) {
				case 1:
					MainScreen.text(" [Dodge]", false);
					break;
				case 2:
					MainScreen.text(" [Evade]", false);
					break;
				case 3:
					MainScreen.text(" [Misdirect]", false);
					break;
				case 4:
					MainScreen.text(" [Flexibility]", false);
					break;
				default:
					CoC_Settings.error("");
					MainScreen.text(" <b>[ERROR]</b>", false);
					break;
			}
		}
		//Else hit!
		else {
			MainScreen.text("Amily dashes at you and swipes her knife at you, surprisingly slowly.  You easily dodge the attack; but it was a feint - her other hand tries to strike at you with a poisoned dart. However, she only manages to scratch you, only causing your muscles to grow slightly numb.", false);
			//Set status
			if (!player.statusAffects.has("AmilyVenom")) player.statusAffects.add(new StatusAffect("AmilyVenom", 0, 0, 0, 0)));
			let poison: number = 2 + rand(5);
			while (poison > 0) {
				poison--;
				if (player.stats.str >= 2) {
					player.stats.str--;
					showStatDown("str");
					// strDown.visible = true;
					// strUp.visible = false;
					player.statusAffects.get("AmilyVenom").value1 = 1;
				}
				if (player.stats.spe >= 2) {
					player.stats.spe--;
					showStatDown("spe");
					// speDown.visible = true;
					// speUp.visible = false;
					player.statusAffects.get("AmilyVenom").value2 = 1;
				}
			}
			//If PC is reduced to 0 Speed and Strength, normal defeat by HP plays.
			if (player.stats.spe <= 2 && player.stats.str <= 2) {
				MainScreen.text("  You've become so weakened that you can't even make an attempt to defend yourself, and Amily rains blow after blow down upon your helpless form.", false);
				player.takeDamage(8999);
			}
		}
		game.combatRoundOver();
	}

	//Concentrate: always avoids the next attack. Can be disrupted by tease/seduce.
	private amilyConcentration(): void {
		MainScreen.text("Amily takes a deep breath and attempts to concentrate on your movements.", false);
		statusAffects.add(new StatusAffect("Concentration", 0, 0, 0, 0)));
		game.combatRoundOver();
	}

	//(if PC uses tease/seduce after this)
	//Deals big lust increase, despite her resistance.
	public teased(lustDelta: number): void {
		if (statusAffects.has("Concentration")) {
			MainScreen.text("Amily flushes hotly; her concentration only makes her pay more attention to your parts!", false);
			lustDelta += 25 + lustDelta;
			statusAffects.remove("Concentration");
			applyTease(lustDelta);
		} else {
			super.teased(lustDelta);
		}
	}

	public defeated(hpVictory: boolean): void {
		game.amilyScene.conquerThatMouseBitch();
	}

	public constructor() {
		super(MonsterType.Amily);
		this.a = "";
		this.short = "Amily";
		this.imageName = "amily";
		this.long = "You are currently fighting Amily. The mouse-morph is dressed in rags and glares at you in rage, knife in hand. She keeps herself close to the ground, ensuring she can quickly close the distance between you two or run away.";
		// this.plural = false;
		this.lowerBody.vaginaSpot.add(new Vagina(VaginaWetness.NORMAL, VaginaLooseness.NORMAL, false));
		this.statusAffects.add(new StatusAffect("BonusVCapacity", 48, 0, 0, 0));
		this.upperBody.chest.add(new BreastRow(BreastCup.C));
		this.lowerBody.butt.analLooseness = ButtLooseness.VIRGIN;
		this.lowerBody.butt.analWetness = ButtWetness.DRY;
		this.tallness = 4 * 12;
		this.lowerBody.hipRating = HipRating.AMPLE;
		this.lowerBody.butt.buttRating = ButtRating.TIGHT;
		this.skinTone = "tawny";
		this.skinType = SkinType.FUR;
		//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SkinType.FUR];
		this.upperBody.head.hairColor = "brown";
		this.upperBody.head.hairLength = 5;
		initStrTouSpeInte(30, 30, 85, 60);
		initLibSensCor(45, 45, 10);
		this.weaponName = "knife";
		this.weaponVerb = "slash";
		this.weaponAttack = 6;
		this.armorName = "rags";
		this.armorDef = 1;
		this.bonusHP = 20;
		this.lust = 20;
		this.lustVuln = .85;
		this.level = 4;
		this.gems = 2 + rand(5);
		this.drop = NO_DROP;
		checkMonster();
	}

}
