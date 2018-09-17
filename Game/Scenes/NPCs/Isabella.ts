export class Isabella extends Character {

	//IZZY AI:

	//Isabella Combat texttttttsss
	public isabellaAttack() {
		//[Standard attack]
		DisplayText("Isabella snorts and lowers a shield a moment before she begins to charge towards you. Her hooves tear huge divots out of the ground as she closes the distance with surprising speed!  ");

		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText("Isabella blindly tries to charge at you, but misses completely.\n");
		}
		//Determine if dodged!
		else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("You duck aside at the last moment, relying entirely on your speed.\n");
		}
		//Determine if evaded
		else if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
			DisplayText("You easily evade her incredibly linear attack.\n");
		}
		//("Misdirection"
		else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("You easily misdirect her and step aside at the last moment.\n");
		}
		//Determine if cat'ed
		else if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("You throw yourself out of the way with cat-like agility at the last moment, avoiding her attack.\n");
		}
		else {
			let damage: number;
			damage = Math.round((weaponAttack + str + 20) - randInt(player.stats.tou + player.armorDef));
			if (damage < 0) {
				DisplayText("You brace yourself and catch her shield in both hands, dragging through the dirt as you slow her charge to a stop.  She gapes down, completely awestruck by the show of power.");
			}
			else {
				damage = player.takeDamage(damage);
				DisplayText("She's coming too fast to dodge, and you're forced to try to stop her.  It doesn't work.  Isabella's shield hits you hard enough to ring your ears and knock you onto your back with bruising force. (" + damage + ")\n");
			}
		}
		combatRoundOver();
	}

	public isabellaStun() {
		//[Stunning Impact]
		DisplayText("Isabella spins her shield back at you in a potent, steel-assisted backhand.  ");

		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText("Isabella blindly tries to charge at you, but misses completely.\n");
		}
		//Determine if dodged!
		else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("You duck aside at the last moment, relying entirely on your speed.\n");
		}
		//Determine if evaded
		else if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
			DisplayText("You easily evade her incredibly linear attack.\n");
		}
		//("Misdirection"
		else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("You easily misdirect her and step aside at the last moment.\n");
		}
		//Determine if cat'ed
		else if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("You bend backward with cat-like agility to avoid her attack.\n");
		}
		else {
			let damage: number = 0;
			damage = Math.round((weaponAttack + str) - randInt(player.stats.tou + player.armorDef));
			if (damage < 0) {
				DisplayText("You deflect her blow away, taking no damage.\n");
				damage = 0;
			}
			else if (player.perks.has(PerkType.Resolute) && player.stats.tou >= 75) {
				DisplayText("You resolutely ignore the blow thanks to your immense toughness.\n");
				damage = 0;
			}
			else {
				damage = player.takeDamage(damage);
				DisplayText("You try to avoid it, but her steely attack connects, rocking you back.  You stagger about while trying to get your bearings, but it's all you can do to stay on your feet.  <b>Isabella has stunned you!</b> (" + damage + ")\n");
				player.statusAffects.add(StatusAffectType.IsabellaStunned, 0, 0, 0, 0);
			}
		}
		combatRoundOver();
	}

	public isabellaThroatPunch() {
		DisplayText("Isabella punches out from behind her shield in a punch aimed right at your throat!  ");

		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText("Isabella blindly tries to charge at you, but misses completely.\n");
		}
		//Determine if dodged!
		else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("You duck aside at the last moment, relying entirely on your speed.\n");
		}
		//Determine if evaded
		else if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
			DisplayText("You easily evade her incredibly linear attack.\n");
		}
		//("Misdirection"
		else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("You easily misdirect her and step aside at the last moment.\n");
		}
		//Determine if cat'ed
		else if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("You bend backward with cat-like agility to avoid her attack.\n");
		}
		else {
			let damage: number;
			damage = Math.round(str - randInt(player.stats.tou + player.armorDef));
			if (damage <= 0) {
				DisplayText("You manage to block her with your own fists.\n");
			}
			else if (player.perks.has(PerkType.Resolute) && player.stats.tou >= 75) {
				DisplayText("You resolutely ignore the blow thanks to your immense toughness.\n");
			}
			else {
				damage = player.takeDamage(damage);
				DisplayText("You try your best to stop the onrushing fist, but it hits you square in the throat, nearly collapsing your windpipe entirely.  Gasping and sputtering, you try to breathe, and while it's difficult, you manage enough to prevent suffocation. <b>It will be impossible to focus to cast a spell in this state!</b> (" + damage + ")\n");
				player.statusAffects.add(StatusAffectType.ThroatPunch, 2, 0, 0, 0);
			}
		}
		combatRoundOver();
	}

	//[Milk Self-Heal]
	public drankMalkYaCunt() {
		DisplayText("Isabella pulls one of her breasts out of her low-cut shirt and begins to suckle at one of the many-tipped nipples. Her cheeks fill and hollow a few times while you watch with spellbound intensity.  She finishes and tucks the weighty orb away, blushing furiously.  The quick drink seems to have reinvigorated her, and watching it has definitely aroused you.");
		HP += 100;
		lust += 5;
		game.dynStats("lus", (10 + player.stats.lib / 20));
		combatRoundOver();
	}

	override protected performCombatAction() {
		//-If below 70% HP, 50% chance of milk drinking
		if (HPRatio() < .7 && randInt(3) === 0) drankMalkYaCunt();
		//if PC has spells and isn't silenced, 1/3 chance of silence.
		else if (player.hasSpells() && !player.statusAffects.has(StatusAffectType.ThroatPunch) && randInt(3) === 0) {
			isabellaThroatPunch();
		}
		//if PC isn't stunned, 1/4 chance of stun
		else if (!player.statusAffects.has(StatusAffectType.IsabellaStunned) && randInt(4) === 0) {
			isabellaStun();
		}
		else isabellaAttack();
	}

	public defeated(hpVictory: boolean) {
		game.isabellaScene.defeatIsabella();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		if (pcCameWorms) {
			DisplayText("\n\n\"<i>Ick,</i>\" Isabella tuts as she turns to leave...");
			game.return { next: Scenes.camp.returnToCampUseOneHour };
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
		this.statusAffects.add(StatusAffectType.BonusVCapacity, 45, 0, 0, 0));
		createBreastRow(Appearance.breastCupInverse("EE+"));
		this.torso.butt.looseness = ButtLooseness.VIRGIN;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.statusAffects.add(StatusAffectType.BonusACapacity, 38, 0, 0, 0));
		this.tallness = 7 * 12 + 6;
		this.torso.hips.rating = HipRating.CURVY + 2;
		this.torso.butt.rating = ButtRating.LARGE + 1;
		this.skin.tone = "dusky";
		this.torso.neck.head.hair.color = "red";
		this.torso.neck.head.hair.length = 13;
		this.baseStats.str = 70;
this.baseStats.tou = 98;
this.baseStats.spe = 75;
this.baseStats.int = 65;
		this.baseStats.lib = 65;
this.baseStats.sens = 25;
this.baseStats.cor = 40;
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
		this.gems = randInt(5) + 20;
		this.tailType = TailType.COW;
		this.tailRecharge = 0;
		this.drop = NO_DROP;
		checkMonster();
	}

}

