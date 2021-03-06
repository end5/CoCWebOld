export default class Isabella extends Monster {

	//IZZY AI:

	//Isabella Combat texttttttsss
	public isabellaAttack(): void {
		//[Standard attack]
		MainScreen.text("Isabella snorts and lowers a shield a moment before she begins to charge towards you. Her hooves tear huge divots out of the ground as she closes the distance with surprising speed!  ", false);

		//Blind dodge change
		if (statusAffects.has("Blind") && rand(3) < 2) {
			MainScreen.text("Isabella blindly tries to charge at you, but misses completely.\n", false);
		}
		//Determine if dodged!
		else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			MainScreen.text("You duck aside at the last moment, relying entirely on your speed.\n", false);
		}
		//Determine if evaded
		else if (player.perks.has("Evade") && rand(100) < 10) {
			MainScreen.text("You easily evade her incredibly linear attack.\n", false);
		}
		//("Misdirection"
		else if (player.perks.has("Misdirection") && rand(100) < 10 && player.inventory.armor.displayName == "red, high-society bodysuit") {
			MainScreen.text("You easily misdirect her and step aside at the last moment.\n", false);
		}
		//Determine if cat'ed
		else if (player.perks.has("Flexibility") && rand(100) < 6) {
			MainScreen.text("You throw yourself out of the way with cat-like agility at the last moment, avoiding her attack.\n", false);
		}
		else {
			let damage: number;
			damage = Math.round((weaponAttack + str + 20) - rand(player.stats.tou + player.armorDef));
			if (damage < 0) {
				MainScreen.text("You brace yourself and catch her shield in both hands, dragging through the dirt as you slow her charge to a stop.  She gapes down, completely awestruck by the show of power.", false);
			}
			else {
				damage = player.takeDamage(damage);
				MainScreen.text("She's coming too fast to dodge, and you're forced to try to stop her.  It doesn't work.  Isabella's shield hits you hard enough to ring your ears and knock you onto your back with bruising force. (" + damage + ")\n", false);
			}
		}
		combatRoundOver();
	}

	public isabellaStun(): void {
		//[Stunning Impact]
		MainScreen.text("Isabella spins her shield back at you in a potent, steel-assisted backhand.  ", false);

		//Blind dodge change
		if (statusAffects.has("Blind") && rand(3) < 2) {
			MainScreen.text("Isabella blindly tries to charge at you, but misses completely.\n", false);
		}
		//Determine if dodged!
		else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			MainScreen.text("You duck aside at the last moment, relying entirely on your speed.\n", false);
		}
		//Determine if evaded
		else if (player.perks.has("Evade") && rand(100) < 10) {
			MainScreen.text("You easily evade her incredibly linear attack.\n", false);
		}
		//("Misdirection"
		else if (player.perks.has("Misdirection") && rand(100) < 10 && player.inventory.armor.displayName == "red, high-society bodysuit") {
			MainScreen.text("You easily misdirect her and step aside at the last moment.\n", false);
		}
		//Determine if cat'ed
		else if (player.perks.has("Flexibility") && rand(100) < 6) {
			MainScreen.text("You bend backward with cat-like agility to avoid her attack.\n", false);
		}
		else {
			let damage: number = 0;
			damage = Math.round((weaponAttack + str) - rand(player.stats.tou + player.armorDef));
			if (damage < 0) {
				MainScreen.text("You deflect her blow away, taking no damage.\n", false);
				damage = 0;
			}
			else if (player.perks.has("Resolute") && player.stats.tou >= 75) {
				MainScreen.text("You resolutely ignore the blow thanks to your immense toughness.\n");
				damage = 0;
			}
			else {
				damage = player.takeDamage(damage);
				MainScreen.text("You try to avoid it, but her steely attack connects, rocking you back.  You stagger about while trying to get your bearings, but it's all you can do to stay on your feet.  <b>Isabella has stunned you!</b> (" + damage + ")\n", false);
				player.statusAffects.add(new StatusAffect("IsabellaStunned", 0, 0, 0, 0)));
			}
		}
		combatRoundOver();
	}

	public isabellaThroatPunch(): void {
		MainScreen.text("Isabella punches out from behind her shield in a punch aimed right at your throat!  ", false);

		//Blind dodge change
		if (statusAffects.has("Blind") && rand(3) < 2) {
			MainScreen.text("Isabella blindly tries to charge at you, but misses completely.\n", false);
		}
		//Determine if dodged!
		else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			MainScreen.text("You duck aside at the last moment, relying entirely on your speed.\n", false);
		}
		//Determine if evaded
		else if (player.perks.has("Evade") && rand(100) < 10) {
			MainScreen.text("You easily evade her incredibly linear attack.\n", false);
		}
		//("Misdirection"
		else if (player.perks.has("Misdirection") && rand(100) < 10 && player.inventory.armor.displayName == "red, high-society bodysuit") {
			MainScreen.text("You easily misdirect her and step aside at the last moment.\n", false);
		}
		//Determine if cat'ed
		else if (player.perks.has("Flexibility") && rand(100) < 6) {
			MainScreen.text("You bend backward with cat-like agility to avoid her attack.\n", false);
		}
		else {
			let damage: number;
			damage = Math.round(str - rand(player.stats.tou + player.armorDef));
			if (damage <= 0) {
				MainScreen.text("You manage to block her with your own fists.\n", false);
			}
			else if (player.perks.has("Resolute") && player.stats.tou >= 75) {
				MainScreen.text("You resolutely ignore the blow thanks to your immense toughness.\n");
			}
			else {
				damage = player.takeDamage(damage);
				MainScreen.text("You try your best to stop the onrushing fist, but it hits you square in the throat, nearly collapsing your windpipe entirely.  Gasping and sputtering, you try to breathe, and while it's difficult, you manage enough to prevent suffocation. <b>It will be impossible to focus to cast a spell in this state!</b> (" + damage + ")\n", false);
				player.statusAffects.add(new StatusAffect("ThroatPunch", 2, 0, 0, 0)));
			}
		}
		combatRoundOver();
	}

	//[Milk Self-Heal]
	public drankMalkYaCunt(): void {
		MainScreen.text("Isabella pulls one of her breasts out of her low-cut shirt and begins to suckle at one of the many-tipped nipples. Her cheeks fill and hollow a few times while you watch with spellbound intensity.  She finishes and tucks the weighty orb away, blushing furiously.  The quick drink seems to have reinvigorated her, and watching it has definitely aroused you.", false);
		HP += 100;
		lust += 5;
		game.dynStats("lus", (10 + player.stats.lib / 20));
		combatRoundOver();
	}

	override protected performCombatAction(): void {
		//-If below 70% HP, 50% chance of milk drinking
		if (HPRatio() < .7 && rand(3) == 0) drankMalkYaCunt();
		//if PC has spells and isn't silenced, 1/3 chance of silence.
		else if (player.hasSpells() && !player.statusAffects.has("ThroatPunch") && rand(3) == 0) {
			isabellaThroatPunch();
		}
		//if PC isn't stunned, 1/4 chance of stun
		else if (!player.statusAffects.has("IsabellaStunned") && rand(4) == 0) {
			isabellaStun();
		}
		else isabellaAttack();
	}

	public defeated(hpVictory: boolean): void {
		game.isabellaScene.defeatIsabella();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			MainScreen.text("\n\n\"<i>Ick,</i>\" Isabella tuts as she turns to leave...");
			game.cleanupAfterCombat();
		} else {
			game.isabellaScene.isabellaDefeats();
		}
	}

	public Isabella() {
		this.a = "";
		this.short = "Isabella";
		this.imageName = "isabella";
		this.long = "Isabella is a seven foot tall, red-headed tower of angry cow-girl.  She's snarling at you from behind her massive shield, stamping her hooves in irritation as she prepares to lay into you.  Her skin is dusky, nearly chocolate except for a few white spots spattered over her body.  She wears a tight silk shirt and a corset that barely supports her bountiful breasts, but it's hard to get a good look at them behind her giant shield.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.DROOLING, VaginaLooseness.GAPING);
		this.statusAffects.add(new StatusAffect("BonusVCapacity", 45, 0, 0, 0)));
		createBreastRow(Appearance.breastCupInverse("EE+"));
		this.lowerBody.butt.analLooseness = ButtLooseness.VIRGIN;
		this.lowerBody.butt.analWetness = ButtWetness.DRY;
		this.statusAffects.add(new StatusAffect("BonusACapacity", 38, 0, 0, 0)));
		this.tallness = 7 * 12 + 6;
		this.lowerBody.hipRating = HipRating.CURVY + 2;
		this.lowerBody.butt.buttRating = ButtRating.LARGE + 1;
		this.skinTone = "dusky";
		this.upperBody.head.hairColor = "red";
		this.upperBody.head.hairLength = 13;
		initStrTouSpeInte(70, 98, 75, 65);
		initLibSensCor(65, 25, 40);
		this.weaponName = "giant shield";
		this.weaponVerb = "smash";
		this.weaponAttack = 15;
		this.armorName = "giant shield";
		this.armorDef = 8;
		this.armorPerk = "";
		this.armorValue = 70;
		this.bonusHP = 700;
		this.lust = 30;
		this.lustVuln = .35;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 15;
		this.gems = rand(5) + 20;
		this.tailType = TailType.COW;
		this.tailRecharge = 0;
		this.drop = NO_DROP;
		checkMonster();
	}

}

