export class Satyr extends Monster {
	//Attacks (Z)
	private satyrAttack(): void {
		DisplayText("The satyr swings at you with one knuckled fist.  ");
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 1) {
			DisplayText(capitalA + short + " completely misses you with a blind punch!\n");
		}
		//Evade: 
		else if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) {
			DisplayText("He snarls as you duck his blow and it swishes harmlessly through the air.");
		}
		else {
			let damage: number = int((str + weaponAttack) - randInt(player.stats.tou));
			if (damage > 0) {
				damage = player.takeDamage(damage);
				DisplayText("It feels like you just got hit with a wooden club! (" + damage + ")");
			}
			else DisplayText("You successfully block it.");
		}
		combatRoundOver();
	}

	private satyrBate(): void {
		DisplayText("He glares at you, panting while his tongue hangs out and begins to masturbate.  You can nearly see his lewd thoughts reflected in his eyes, as beads of pre form on his massive cock and begin sliding down the erect shaft.");
		//(small Libido based Lust increase, and increase lust)
		game.dynStats("lus", (player.stats.lib / 5) + 4);
		lust += 5;
		combatRoundOver();
	}

	internal function satyrCharge(): void {
		DisplayText("Lowering his horns, the satyr digs his hooves on the ground and begins snorting; he's obviously up to something.  ");
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 1) {
			DisplayText(capitalA + short + " completely misses you due to blindness!\n");
		}
		else if (combatMiss()) {
			DisplayText("He charges at you with a loud bleat, but you nimbly dodge and strike a vicious blow with your [weapon] in return that sends him crashing into the ground, hollering in pain. (5)");
			HP -= 5;
		}
		else if (combatEvade()) {
			DisplayText("He charges at you with a loud bleat, but using your evasive skills, you nimbly dodge and strike a vicious blow with your [weapon] in return that sends him crashing into the ground, hollering in pain. (5)");
			HP -= 5;
		}
		else if (combatFlexibility()) {
			DisplayText("He charges at you with a loud bleat, but using your flexibility, you nimbly dodge and strike a vicious blow with your [weapon] in return that sends him crashing into the ground, hollering in pain. (5)");
			HP -= 5;
		}
		else if (combatMisdirect()) {
			DisplayText("He charges at you with a loud bleat, but using your misdirecting skills, you nimbly dodge and strike a vicious blow with your [weapon] in return that sends him crashing into the ground, hollering in pain. (5)");
			HP -= 5;
		}
		else {
			let damage: number = int((str + weaponAttack) - randInt(player.stats.tou));
			if (damage > 0) {
				damage = player.takeDamage(damage);
				DisplayText("He charges at you with a loud bleat, catching you off-guard and sending you flying into the ground.");
				if (!player.perks.has(PerkType.Resolute)) {
					DisplayText("  The pain of the impact is so big you feel completely dazed, almost seeing stars.");
					player.statusAffects.add(StatusAffectType.Stunned, 0, 0, 0, 0);
				}
				//stun PC + hp damage if hit, hp damage dependent on str if miss
				DisplayText(" (" + damage + ")");
			}
			else DisplayText("He charges at you, but you successfully deflect it at the last second.");
		}
		combatRoundOver();
	}

	private bottleChug(): void {
		DisplayText("He whips a bottle of wine seemingly from nowhere and begins chugging it down, then lets out a bellowing belch towards you.  The smell is so horrible you cover your nose in disgust, yet you feel hot as you inhale some of the fetid scent.");
		//(damage PC lust very slightly and raise the satyr's lust.)
		game.dynStats("lus", (player.stats.lib / 5));
		lust += 5;
		combatRoundOver();
	}

	//5:(Only executed at high lust) 
	private highLustChugRape(): void {
		DisplayText("Panting with barely-contained lust, the Satyr charges at you and tries to ram you into the ground.  ");
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 1) {
			DisplayText(capitalA + short + " completely misses you due to blindness!\n");
		}
		else if (combatMiss() || combatFlexibility() || combatMisdirect() || combatEvade()) {
			DisplayText("As he charges you, you grab him by the horns and spin around, sending him away.");
		}
		else {
			DisplayText("You fall with a <b>THUD</b> and the Satyr doesn't even bother to undress you before he begins rubbing his massive cock on your body until he comes, soiling your [armor] and " + player.skinFurScales() + " with slimy, hot cum.  As it rubs into your body, you shiver with unwanted arousal.");
			//large-ish sensitivity based lust increase if hit.)(This also relieves him of some of his lust, though not completely.)
			lust -= 50;
			game.dynStats("lus", (player.stats.sens / 5 + 20));
		}
		combatRoundOver();
	}

	override protected performCombatAction(): void {
		if (lust >= 75 && randInt(2) === 0) highLustChugRape();
		else if (lust < 75 && randInt(2) === 0) {
			if (randInt(2) === 0) satyrBate();
			else bottleChug();
		}
		else if (findStatusAffect(StatusAffects.Charged) < 0) satyrCharge();
		else {
			satyrAttack();
			statusAffects.remove("Charged");
		}
	}

	public defeated(hpVictory: boolean): void {
		game.plains.satyrScene.defeatASatyr();
	}


	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			DisplayText("\n\nThe satyr laughs heartily at your eagerness...");
			return { next: game.endLustLoss };
		} else {
			game.plains.satyrScene.loseToSatyr();
		}
	}

	public Satyr() {
		this.a = "a ";
		this.short = "satyr";
		this.imageName = "satyr";
		this.long = "From the waist up, your opponent is perfectly human, save his curling, goat-like horns and his pointed, elven ears.  His muscular chest is bare and glistening with sweat, while his coarsely rugged, masculine features are contorted into an expression of savage lust.  Looking at his waist, you notice he has a bit of a potbelly, no doubt the fruits of heavy drinking, judging by the almost overwhelming smell of booze and sex that emanates from him.  Further down you see his legs are the coarse, bristly-furred legs of a bipedal goat, cloven hooves pawing the ground impatiently, sizable manhood swaying freely in the breeze.";
		// this.plural = false;
		this.createCock(randInt(13) + 14, 1.5 + randInt(20) / 2, CockType.HUMAN);
		this.balls = 2;
		this.ballSize = 2 + randInt(13);
		this.cumMultiplier = 1.5;
		this.hoursSinceCum = this.ballSize * 10;
		createBreastRow(0);
		this.torso.butt.looseness = ButtLooseness.STRETCHED;
		this.torso.butt.wetness = ButtWetness.NORMAL;
		this.statusAffects.add(StatusAffectType.BonusACapacity, 20, 0, 0, 0);
		this.tallness = randInt(37) + 64;
		this.torso.hipRating = HipRating.AVERAGE;
		this.torso.butt.rating = ButtRating.AVERAGE + 1;
		this.torso.hips.legs.type = LegType.HOOFED;
		this.skin.tone = "tan";
		this.torso.neck.head.hair.color = randomChoice("black", "brown");
		this.torso.neck.head.hair.length = 3 + randInt(20);
		this.faceType = FaceType.COW_MINOTAUR;
		this.baseStats.str = 75;
this.baseStats.tou = 70;
this.baseStats.spe = 110;
this.baseStats.int = 70;
		initLibSensCor(60, 35, 45);
		this.weaponName = "fist";
		this.weaponVerb = "punch";
		this.armorName = "thick fur";
		this.bonusHP = 300;
		this.lust = 20;
		this.lustVuln = 0.30;
		this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
		this.level = 14;
		this.gems = randInt(25) + 25;
		this.drop = new ChainedDrop().add(consumables.INCUBID, 1 / 2);
		this.tailType = TailType.COW;
		checkMonster();
	}

}
