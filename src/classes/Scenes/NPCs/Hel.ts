
export default class Hel extends Monster {

	private helAttack(): void {
		let damage: number;
		//return to combat menu when finished
		doNext(game.playerMenu);
		//Blind dodge change
		if (statusAffects.has("Blind") && rand(3) < 1) {
			MainScreen.text(capitalA + short + " completely misses you with a blind attack!\n", false);
		}
		//Determine if dodged!
		else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			MainScreen.text("You nimbly dodge the salamander's massive sword thrust!", false);
		}
		//Determine if evaded
		else if (player.perks.has("Evade") && rand(100) < 10) {
			MainScreen.text("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.\n", false);
		}
		//("Misdirection"
		else if (player.perks.has("Misdirection") && rand(100) < 10 && player.inventory.armor.displayName == "red, high-society bodysuit") {
			MainScreen.text("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' attacks.\n", false);
		}
		//Determine if cat'ed
		else if (player.perks.has("Flexibility") && rand(100) < 6) {
			MainScreen.text("With your incredible flexibility, you squeeze out of the way of " + a + short + "", false);
		}
		//Determine damage - str modified by enemy toughness!
		else {
			damage = int((str + weaponAttack) - rand(player.stats.tou / 2) - player.armorDef / 2);
			if (damage > 0) damage = player.takeDamage(damage);
			//No damage
			if (damage <= 0) {
				damage = 0;
				//Due to toughness or amor...
				if (rand(player.armorDef + player.stats.tou) < player.armorDef) MainScreen.text("You absorb and deflect every " + weaponVerb + " with your " + player.inventory.armor.displayName + ".", false);
				else MainScreen.text("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.", false);
			}
			//Take Damage
			else MainScreen.text("The salamander lunges at you, sword swinging in a high, savage arc.  You attempt to duck her attack, but she suddenly spins about mid-swing, bringing the sword around on a completely different path.  It bites deep into your flesh, sending you stumbling back. (" + damage + ")", false);
			if (damage > 0) {
				if (lustVuln > 0 && player.inventory.armor.displayName == "barely-decent bondage straps") {
					MainScreen.text("\n" + capitalA + short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.", false);
					lust += 5 * lustVuln;
				}
			}
		}

		statScreenRefresh();
		MainScreen.text("\n", false);
		combatRoundOver();
	}

	//Attack 2 – Tail Slap (Hit)
	//low dodge chance, lower damage
	private helAttack2(): void {
		let damage: number;
		//return to combat menu when finished
		doNext(game.playerMenu);
		//Blind dodge change
		if (statusAffects.has("Blind") && rand(3) < 1) {
			MainScreen.text(capitalA + short + " completely misses you with a blind attack!\n", false);
			return;
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 83) {
			MainScreen.text("The salamander rushes at you, knocking aside your defensive feint and trying to close the distance between you.  She lashes out at your feet with her tail, and you're only just able to dodge the surprise attack.", false);
			return;
		}
		//Determine if evaded
		if (player.perks.has("Evade") && rand(100) < 5) {
			MainScreen.text("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s tail-swipe.\n", false);
			return;
		}
		//("Misdirection"
		if (player.perks.has("Misdirection") && rand(100) < 5 && player.inventory.armor.displayName == "red, high-society bodysuit") {
			MainScreen.text("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' tail-swipe.\n", false);
			return;
		}
		//Determine if cat'ed
		if (player.perks.has("Flexibility") && rand(100) < 3) {
			MainScreen.text("With your incredible flexibility, you squeeze out of the way of a tail-swipe!", false);
			return;
		}
		//Determine damage - str modified by enemy toughness!
		damage = int((str) - rand(player.stats.tou) - player.armorDef);
		if (damage > 0) damage = player.takeDamage(damage);
		//No damage
		if (damage <= 0) {
			damage = 0;
			//Due to toughness or amor...
			if (rand(player.armorDef + player.stats.tou) < player.armorDef) MainScreen.text("The salamander's tail-swipe harmlessly deflects off your armor!", false);
			else MainScreen.text("The salamander's tail-swipe hits you but fails to move or damage you.", false);
		}
		//Take Damage
		else MainScreen.text("The salamander rushes at you, knocking aside your defensive feint and sliding in past your guard.  She lashes out at your feet with her tail, and you can feel the heated wake of the fiery appendage on your ensuing fall toward the now-smouldering grass. (" + damage + ")", false);
		if (damage > 0) {
			if (lustVuln > 0 && player.inventory.armor.displayName == "barely-decent bondage straps") {
				MainScreen.text("\n" + capitalA + short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.", false);
				lust += 5 * lustVuln;
			}
		}
		statScreenRefresh();
		MainScreen.text("\n", false);
		combatRoundOver();
	}

	private helCleavage(): void {
		//FAIL
		if ((player.perks.has("Flexibility") && rand(100) < 6) || (player.perks.has("Evade") && rand(100) < 10) || (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80)) {
			MainScreen.text("To your surprise, the salamander suddenly pulls up her top, letting her hefty breasts hang free in the air; her small, bright pink nipples quickly harden from either arousal or temperature.  Before you can take your eyes off her impressive rack, she jumps at you.  One of her scaled arms reaches around your waist, and the other toward your head, but you roll away from her grip and push her bodily away.  She staggers a moment, but then quickly yanks the jangling bikini top back down with a glare.\n", false);
		}
		//Attack 3 – Lust – Cleavage (Failure)
		else {
			MainScreen.text("To your surprise, the salamander suddenly yanks up her top, letting her hefty breasts hang free in the air; her small, bright pink nipples quickly harden from either arousal or temperature.  Before you can take your eyes off her impressive rack, she jumps at you.  One of her scaled arms encircles your waist, and the other forcefully shoves your face into her cleavage.  She jiggles her tits around your face for a moment before you're able to break free, though you can feel a distinct heat rising in your loins.  As quickly as they were revealed, the breasts are concealed again and your opponent is ready for more combat!", false);
			let lust: number = 20 + rand(10) + player.stats.sens / 10 + rand(player.stats.lib / 20);
			game.dynStats("lus", lust);
			//Apply resistance
			lust *= game.lustPercent() / 100;
			//Clean up
			lust = Math.round(lust * 10) / 10;
			MainScreen.text(" (+" + lust + " lust)\n", false);
		}
		combatRoundOver();
	}
	override protected performCombatAction(): void {
		trace("Hel Perform Combat Action Called");
		let select: number = rand(3);
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

	public defeated(hpVictory: boolean): void {
		if (statusAffects.has("Sparring")) game.helFollower.PCBeatsUpSalamanderSparring();
		else game.helScene.beatUpHel();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			MainScreen.text("\n\nHelia waits it out in stoic silence...");
			doNext(game.endLustLoss);
		} else {
			if (statusAffects.has("Sparring")) game.helFollower.loseToSparringHeliaLikeAButtRapedChump();
			else game.helScene.loseToSalamander();
		}
	}

	public Hel() {
		if (game.Flags.list[FlagEnum.HEL_TALKED_ABOUT_HER] == 1) {
			this.a = "";
			this.short = "Hel";
		} else {
			this.a = "the ";
			this.short = "salamander";
		}
		this.imageName = "hel";
		this.long = "You are fighting a (literally) smoking hot salamander – a seven foot tall woman with crimson scales covering her legs, back, and forearms, with a tail swishing menacingly behind her, ablaze with a red-hot fire.  Her red hair whips wildly around her slender shoulders, occasionally flitting over her hefty E-cup breasts, only just concealed within a scale-covered bikini top.  Bright red eyes focus on you from an almost-human face as she circles you, ready to close in for the kill.  Her brutal, curved sword is raised to her side, feinting at you between genuine attacks.";
		createVagina(true, VaginaWetness.NORMAL, VaginaLooseness.NORMAL);
		statusAffects.add(new StatusAffect("BonusVCapacity", 85, 0, 0, 0)));
		createBreastRow(Appearance.breastCupInverse("E+"));
		this.lowerBody.butt.analLooseness = ButtLooseness.VIRGIN;
		this.lowerBody.butt.analWetness = ButtWetness.DRY;
		this.statusAffects.add(new StatusAffect("BonusACapacity", 85, 0, 0, 0)));
		this.tallness = 90;
		this.lowerBody.hipRating = HipRating.CURVY + 2;
		this.lowerBody.butt.buttRating = ButtRating.LARGE + 1;
		this.skinTone = "dusky";
		this.upperBody.head.hairColor = "red";
		this.upperBody.head.hairLength = 13;
		initStrTouSpeInte(80, 70, 75, 60);
		initLibSensCor(65, 25, 30);
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
		this.gems = 10 + rand(5);
		this.drop = new ChainedDrop().
			add(armors.CHBIKNI, 1 / 20).
			add(consumables.REPTLUM, 0.7);
		this.tailType = TailType.LIZARD;
		this.tailRecharge = 0;
		this.statusAffects.add(new StatusAffect("Keen", 0, 0, 0, 0)));
		checkMonster();
	}

}

