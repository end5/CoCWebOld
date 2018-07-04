
export class Hel extends Character {

	private helAttack() {
		let damage: number;
		//return to combat menu when finished
		return { next: game.playerMenu };
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 1) {
			DisplayText(capitalA + short + " completely misses you with a blind attack!\n");
		}
		//Determine if dodged!
		else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("You nimbly dodge the salamander's massive sword thrust!");
		}
		//Determine if evaded
		else if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
			DisplayText("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.\n");
		}
		//("Misdirection"
		else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' attacks.\n");
		}
		//Determine if cat'ed
		else if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("With your incredible flexibility, you squeeze out of the way of " + a + short + "");
		}
		//Determine damage - str modified by enemy toughness!
		else {
			damage = int((str + weaponAttack) - randInt(player.stats.tou / 2) - player.armorDef / 2);
			if (damage > 0) damage = player.takeDamage(damage);
			//No damage
			if (damage <= 0) {
				damage = 0;
				//Due to toughness or amor...
				if (randInt(player.armorDef + player.stats.tou) < player.armorDef) DisplayText("You absorb and deflect every " + weaponVerb + " with your " + player.inventory.equipment.armor.displayName + ".");
				else DisplayText("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.");
			}
			//Take Damage
			else DisplayText("The salamander lunges at you, sword swinging in a high, savage arc.  You attempt to duck her attack, but she suddenly spins about mid-swing, bringing the sword around on a completely different path.  It bites deep into your flesh, sending you stumbling back. (" + damage + ")");
			if (damage > 0) {
				if (lustVuln > 0 && player.inventory.equipment.armor.displayName === "barely-decent bondage straps") {
					DisplayText("\n" + capitalA + short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.");
					lust += 5 * lustVuln;
				}
			}
		}

		statScreenRefresh();
		DisplayText("\n");
		combatRoundOver();
	}

	//Attack 2 – Tail Slap (Hit)
	//low dodge chance, lower damage
	private helAttack2() {
		let damage: number;
		//return to combat menu when finished
		return { next: game.playerMenu };
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 1) {
			DisplayText(capitalA + short + " completely misses you with a blind attack!\n");
			return;
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 83) {
			DisplayText("The salamander rushes at you, knocking aside your defensive feint and trying to close the distance between you.  She lashes out at your feet with her tail, and you're only just able to dodge the surprise attack.");
			return;
		}
		//Determine if evaded
		if (player.perks.has(PerkType.Evade) && randInt(100) < 5) {
			DisplayText("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s tail-swipe.\n");
			return;
		}
		//("Misdirection"
		if (player.perks.has(PerkType.Misdirection) && randInt(100) < 5 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' tail-swipe.\n");
			return;
		}
		//Determine if cat'ed
		if (player.perks.has(PerkType.Flexibility) && randInt(100) < 3) {
			DisplayText("With your incredible flexibility, you squeeze out of the way of a tail-swipe!");
			return;
		}
		//Determine damage - str modified by enemy toughness!
		damage = int((str) - randInt(player.stats.tou) - player.armorDef);
		if (damage > 0) damage = player.takeDamage(damage);
		//No damage
		if (damage <= 0) {
			damage = 0;
			//Due to toughness or amor...
			if (randInt(player.armorDef + player.stats.tou) < player.armorDef) DisplayText("The salamander's tail-swipe harmlessly deflects off your armor!");
			else DisplayText("The salamander's tail-swipe hits you but fails to move or damage you.");
		}
		//Take Damage
		else DisplayText("The salamander rushes at you, knocking aside your defensive feint and sliding in past your guard.  She lashes out at your feet with her tail, and you can feel the heated wake of the fiery appendage on your ensuing fall toward the now-smouldering grass. (" + damage + ")");
		if (damage > 0) {
			if (lustVuln > 0 && player.inventory.equipment.armor.displayName === "barely-decent bondage straps") {
				DisplayText("\n" + capitalA + short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.");
				lust += 5 * lustVuln;
			}
		}
		statScreenRefresh();
		DisplayText("\n");
		combatRoundOver();
	}

	private helCleavage() {
		//FAIL
		if ((player.perks.has(PerkType.Flexibility) && randInt(100) < 6) || (player.perks.has(PerkType.Evade) && randInt(100) < 10) || (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80)) {
			DisplayText("To your surprise, the salamander suddenly pulls up her top, letting her hefty breasts hang free in the air; her small, bright pink nipples quickly harden from either arousal or temperature.  Before you can take your eyes off her impressive rack, she jumps at you.  One of her scaled arms reaches around your waist, and the other toward your head, but you roll away from her grip and push her bodily away.  She staggers a moment, but then quickly yanks the jangling bikini top back down with a glare.\n");
		}
		//Attack 3 – Lust – Cleavage (Failure)
		else {
			DisplayText("To your surprise, the salamander suddenly yanks up her top, letting her hefty breasts hang free in the air; her small, bright pink nipples quickly harden from either arousal or temperature.  Before you can take your eyes off her impressive rack, she jumps at you.  One of her scaled arms encircles your waist, and the other forcefully shoves your face into her cleavage.  She jiggles her tits around your face for a moment before you're able to break free, though you can feel a distinct heat rising in your loins.  As quickly as they were revealed, the breasts are concealed again and your opponent is ready for more combat!");
			let lust: number = 20 + randInt(10) + player.stats.sens / 10 + randInt(player.stats.lib / 20);
			game.dynStats("lus", lust);
			//Apply resistance
			lust *= game.lustPercent() / 100;
			//Clean up
			lust = Math.round(lust * 10) / 10;
			DisplayText(" (+" + lust + " lust)\n");
		}
		combatRoundOver();
	}
	override protected performCombatAction() {
		trace("Hel Perform Combat Action Called");
		let select: number = randInt(3);
		trace("Selected: " + select);
		switch (select) {
			case 0:
				helAttack();
				break;
			case 1:
				helAttack2();
				break;
			default:
				helCleavage();
				break;
		}
	}

	public defeated(hpVictory: boolean) {
		if (statusAffects.has(StatusAffectType.Sparring)) game.helFollower.PCBeatsUpSalamanderSparring();
		else game.helScene.beatUpHel();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		if (pcCameWorms) {
			DisplayText("\n\nHelia waits it out in stoic silence...");
			return { next: game.endLustLoss };
		} else {
			if (statusAffects.has(StatusAffectType.Sparring)) game.helFollower.loseToSparringHeliaLikeAButtRapedChump();
			else game.helScene.loseToSalamander();
		}
	}

	public Hel() {
		if (game.Flags.list[FlagEnum.HEL_TALKED_ABOUT_HER] === 1) {
			this.a = "";
			this.short = "Hel";
		} else {
			this.a = "the ";
			this.short = "salamander";
		}
		this.imageName = "hel";
		this.long = "You are fighting a (literally) smoking hot salamander – a seven foot tall woman with crimson scales covering her legs, back, and forearms, with a tail swishing menacingly behind her, ablaze with a red-hot fire.  Her red hair whips wildly around her slender shoulders, occasionally flitting over her hefty E-cup breasts, only just concealed within a scale-covered bikini top.  Bright red eyes focus on you from an almost-human face as she circles you, ready to close in for the kill.  Her brutal, curved sword is raised to her side, feinting at you between genuine attacks.";
		createVagina(true, VaginaWetness.NORMAL, VaginaLooseness.NORMAL);
		statusAffects.add(StatusAffectType.BonusVCapacity, 85, 0, 0, 0);
		createBreastRow(Appearance.breastCupInverse("E+"));
		this.torso.butt.looseness = ButtLooseness.VIRGIN;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.statusAffects.add(StatusAffectType.BonusACapacity, 85, 0, 0, 0));
		this.tallness = 90;
		this.torso.hips.rating = HipRating.CURVY + 2;
		this.torso.butt.rating = ButtRating.LARGE + 1;
		this.skin.tone = "dusky";
		this.torso.neck.head.hair.color = "red";
		this.torso.neck.head.hair.length = 13;
		this.baseStats.str = 80;
this.baseStats.tou = 70;
this.baseStats.spe = 75;
this.baseStats.int = 60;
		this.baseStats.lib = 65;
this.baseStats.sens = 25;
this.baseStats.cor = 30;
		this.weaponName = "sword";
		this.weaponVerb = "slashing blade";
		this.weaponAttack = 20;
		this.armorName = "scales";
		this.armorDef = 14;
		this.armorPerk = "";
		this.armorValue = 50;
		this.bonusHP = 275;
		this.lust = 30;
		this.lustVuln = .35;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 16;
		this.gems = 10 + randInt(5);
		this.drop = new ChainedDrop().
			add(armors.CHBIKNI, 1 / 20).
			add(consumables.REPTLUM, 0.7);
		this.tailType = TailType.LIZARD;
		this.tailRecharge = 0;
		this.statusAffects.add(StatusAffectType.Keen, 0, 0, 0, 0));
		checkMonster();
	}

}

