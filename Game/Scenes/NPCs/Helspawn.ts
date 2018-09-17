export class Helspawn extends Character {

	public doAI() {
		let choices: Array = [];
		choices[choices.length] = helspawnTwinStrikes;
		//Bowmander only
		if (Flags.list[FlagEnum.HELSPAWN_WEAPON] === "bow") choices[choices.length] = calledShot;
		//Zerker ability
		if (weaponAttack < 50 || Flags.list[FlagEnum.HELSPAWN_WEAPON] === "scimitar") choices[choices.length] = helSpawnBerserk;	//Shield Bash (Shieldmander Only)
		if (Flags.list[FlagEnum.HELSPAWN_WEAPON] === "scimitar and shield") choices[choices.length] = helSpawnShieldBash;
		//Tease (Sluttymander Only)
		if (Flags.list[FlagEnum.HELSPAWN_PERSONALITY] >= 50) choices[choices.length] = sluttyMander;
		//Focus (Chastemander Only)
		//Self-healing & lust restoration
		if (Flags.list[FlagEnum.HELSPAWN_PERSONALITY] < 50) choices[choices.length] = helSpawnFocus;
		choices[randInt(choices.length)]();
		//Tail Whip
		if (randInt(4) === 0) tailWhipShitYo();
		combatRoundOver();
	}

	//Basic Attack - Twin Strike
	// Two light attacks
	private helspawnTwinStrikes() {
		//if Bowmander
		if (Flags.list[FlagEnum.HELSPAWN_WEAPON] === "bow") DisplayText(Flags.list[FlagEnum.HELSPAWN_NAME] + " leaps back out of your reach and nocks a pair of blunted arrows, drawing them back together and loosing them at once!\n");
		else DisplayText(Flags.list[FlagEnum.HELSPAWN_NAME] + " lunges at you, scimitar cleaving through the air toward your throat!\n");
		statusAffects.add(StatusAffectType.Attacks, 0, 0, 0, 0);
		eAttack();
	}

	//Called Shot (Bowmander Only)
	// Super-high chance of hitting. On hit, speed debuff
	private calledShot() {
		DisplayText(Flags.list[FlagEnum.HELSPAWN_NAME] + " draws back her bowstring, spending an extra second aiming before letting fly!");
		let damage: number = int((str + weaponAttack) - randInt(player.stats.tou) - player.armorDef);
		//standard dodge/miss text
		if (damage <= 0 || (randInt(2) === 0 && (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()))) DisplayText("\nYou avoid the hit!");
		else {
			DisplayText("\nOne of her arrows smacks right into your [leg], nearly bowling you over.  God DAMN that hurt! You're going to be limping for a while!");
			let affect: number = 20 + randInt(5);
			if (player.statusAffects.has(StatusAffectType.CalledShot)) {
				while (affect > 0 && player.stats.spe >= 2) {
					affect--;
					player.addStatusValue(StatusAffects.CalledShot, 1, 1);
					player.stats.spe--;
					showStatDown('spe');
					// speDown.visible = true;
					// speUp.visible = false;
				}
			}
			else {
				player.statusAffects.add(StatusAffectType.CalledShot, 0, 0, 0, 0);
				while (affect > 0 && player.stats.spe >= 2) {
					affect--;
					player.addStatusValue(StatusAffects.CalledShot, 1, 1);
					player.stats.spe--;
					showStatDown('spe');
					// speDown.visible = true;
					// speUp.visible = false;
				}
			}
			damage = player.takeDamage(damage);
			DisplayText(" (" + damage + ")");
		}
	}

	//Berzerkergang (Berzerkermander Only)
	//Gives Helspawn the benefit of the Berzerk special ability
	private helSpawnBerserk() {
		DisplayText(Flags.list[FlagEnum.HELSPAWN_NAME] + " lets out a savage warcry, throwing her head back in primal exaltation before charging back into the fray with utter bloodlust in her wild eyes!");
		this.weaponAttack = weaponAttack + 30;
		armorDef = 0;
	}

	//Shield Bash (Shieldmander Only)
	private helSpawnShieldBash() {
		DisplayText().clear();
		let damage: number = int((str) - randInt(player.stats.tou) - player.armorDef);
		// Stuns a bitch
		DisplayText(Flags.list[FlagEnum.HELSPAWN_NAME] + " lashes out with her shield, trying to knock you back!");
		//standard dodge/miss text
		if (damage <= 0 || combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) DisplayText("\nYou evade the strike.");
		else {
			DisplayText("\nHer shield catches you right in the face, sending you tumbling to the ground and leaving you open to attack!");
			damage = player.takeDamage(damage);
			if (randInt(2) === 0 && !player.statusAffects.has(StatusAffectType.Stunned)) {
				player.statusAffects.add(StatusAffectType.Stunned, 0, 0, 0, 0);
				DisplayText(" <b>The hit stuns you.</b>");
			}
			DisplayText(" (" + damage + ")");
		}
	}

	//Tail Whip
	private tailWhipShitYo() {
		// Light physical, armor piercing (fire, bitch). Random chance to get this on top of any other attack
		let damage: number = int((str) - randInt(player.stats.tou));
		DisplayText("\n" + Flags.list[FlagEnum.HELSPAWN_NAME] + " whips at you with her tail, trying to sear you with her brilliant flames!");
		//standard dodge/miss text
		if (damage <= 0 || combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) DisplayText("\nYou evade the strike.");
		else {
			DisplayText("\n" + Flags.list[FlagEnum.HELSPAWN_NAME] + "'s tail catches you as you try to dodge.  Your [armor] sizzles, and you leap back with a yelp as she gives you a light burning.");
			damage = player.takeDamage(damage);
			DisplayText(" (" + damage + ")");
		}
	}

	//Tease (Sluttymander Only)
	private sluttyMander() {
		// Medium Lust damage
		DisplayText(Flags.list[FlagEnum.HELSPAWN_NAME] + " jumps just out of reach before spinning around, planting her weapon in the ground as she turns her backside to you and gives her sizable ass a rhythmic shake, swaying her full hips hypnotically.");
		//if no effect:
		if (randInt(2) === 0) DisplayText("\nWhat the fuck is she trying to do?  You walk over and give her a sharp kick in the kiester, \"<i>Keep your head in the game, kiddo.  Pick up your weapon!</i>\"");
		else {
			DisplayText("\nDat ass.  You lean back, enjoying the show as the slutty little salamander slips right past your guard, practically grinding up against you until you can feel a fire boiling in your loins!");
			let lustDelta: number = player.lustVuln * (10 + player.stats.lib / 10);
			player.stats.lust += lustDelta;
			game.mainView.statsView.showStatUp('lust');
			// lustDown.visible = false;
			// lustUp.visible = true;
			lustDelta = Math.round(lustDelta * 10) / 10;
			DisplayText(" (" + lustDelta + ")");
		}
	}

	//Focus (Chastemander Only)
	//Self-healing & lust restoration
	private helSpawnFocus() {
		DisplayText("Seeing a momentary lull in the melee, " + Flags.list[FlagEnum.HELSPAWN_NAME] + " slips out of reach, stumbling back and clutching at the bruises forming all over her body.  \"<i>Come on, " + Flags.list[FlagEnum.HELSPAWN_NAME] + ", you can do this. Focus, focus,</i>\" she mutters, trying to catch her breath.  A moment later and she seems to have taken a second wind as she readies her weapon with a renewed vigor.");
		lust -= 30;
		if (lust < 0) lust = 0;
		addHP(eMaxHP() / 3.0);
	}

	public defeated(hpVictory: boolean) {
		game.helSpawnScene.beatUpYourDaughter();
	}


	public won(hpVictory: boolean, pcCameWorms: boolean) {
		game.helSpawnScene.loseSparringToDaughter();
	}

	public Helspawn() {
		let weapon: string = game.Flags.list[FlagEnum.HELSPAWN_WEAPON];
		this.a = "";
		this.short = game.Flags.list[FlagEnum.HELSPAWN_NAME];
		this.imageName = "hollispawn";
		this.long = game.Flags.list[FlagEnum.HELSPAWN_NAME] + " is a young salamander, appearing in her later teens.  Clad in " +
			(game.Flags.list[FlagEnum.HELSPAWN_PERSONALITY] >= 50 ?
				"a slutty scale bikini like her mother's, barely concealing anything" :
				"a short skirt, thigh-high boots, and a sky-blue blouse, in stark contrast to her mother’s sluttier attire") +
			", she stands about six feet in height, with a lengthy, fiery tail swishing menacingly behind her. She's packing a " +
			{
				'bow': "recurve bow, using blunted, soft-tipped arrows",
				'scimitar': "scimitar, just like her mom's, and holds it in the same berzerk stance Helia is wont to use",
				'scimitar and shield': "scimitar and shield, giving her a balanced fighting style"
			}[weapon] +
			".  Pacing around you, the well-built young warrior intently studies her mentor's defenses, readying for your next attack.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.NORMAL, VaginaLooseness.NORMAL);
		this.statusAffects.add(StatusAffectType.BonusVCapacity, 85, 0, 0, 0));
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
		this.baseStats.str = 50;
this.baseStats.tou = 50;
this.baseStats.spe = 65;
this.baseStats.int = 40;
		this.baseStats.lib = 35;
this.baseStats.sens = 55;
this.baseStats.cor = 20;
		this.weaponName = weapon;
		this.weaponVerb = {
			'bow': "blunted arrow",
			'scimitar': "slash",
			'scimitar and shield': "slash"
		}[weapon];
		this.weaponAttack = 20;
		this.armorName = "scales";
		this.armorDef = 12;
		this.armorPerk = "";
		this.armorValue = 50;
		this.bonusHP = 175;
		this.lust = 30;
		this.lustVuln = .55;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 12;
		this.gems = 10 + randInt(5);
		this.tailType = TailType.LIZARD;
		this.tailRecharge = 0;
		this.statusAffects.add(StatusAffectType.Keen, 0, 0, 0, 0));
		this.drop = NO_DROP;
		checkMonster();
	}

}

