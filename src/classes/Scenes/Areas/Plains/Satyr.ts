export default class Satyr extends Monster {
	//Attacks (Z)
	private satyrAttack(): void {
		MainScreen.text("The satyr swings at you with one knuckled fist.  ");
		//Blind dodge change
		if (statusAffects.has("Blind") && rand(3) < 1) {
			MainScreen.text(capitalA + short + " completely misses you with a blind punch!\n", false);
		}
		//Evade: 
		else if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) {
			MainScreen.text("He snarls as you duck his blow and it swishes harmlessly through the air.");
		}
		else {
			let damage: number = int((str + weaponAttack) - rand(player.stats.tou));
			if (damage > 0) {
				damage = player.takeDamage(damage);
				MainScreen.text("It feels like you just got hit with a wooden club! (" + damage + ")");
			}
			else MainScreen.text("You successfully block it.");
		}
		combatRoundOver();
	}

	private satyrBate(): void {
		MainScreen.text("He glares at you, panting while his tongue hangs out and begins to masturbate.  You can nearly see his lewd thoughts reflected in his eyes, as beads of pre form on his massive cock and begin sliding down the erect shaft.");
		//(small Libido based Lust increase, and increase lust)
		game.dynStats("lus", (player.stats.lib / 5) + 4);
		lust += 5;
		combatRoundOver();
	}

	internal function satyrCharge(): void {
		MainScreen.text("Lowering his horns, the satyr digs his hooves on the ground and begins snorting; he's obviously up to something.  ");
		if (statusAffects.has("Blind") && rand(3) < 1) {
			MainScreen.text(capitalA + short + " completely misses you due to blindness!\n", false);
		}
		else if (combatMiss()) {
			MainScreen.text("He charges at you with a loud bleat, but you nimbly dodge and strike a vicious blow with your [weapon] in return that sends him crashing into the ground, hollering in pain. (5)");
			HP -= 5;
		}
		else if (combatEvade()) {
			MainScreen.text("He charges at you with a loud bleat, but using your evasive skills, you nimbly dodge and strike a vicious blow with your [weapon] in return that sends him crashing into the ground, hollering in pain. (5)");
			HP -= 5;
		}
		else if (combatFlexibility()) {
			MainScreen.text("He charges at you with a loud bleat, but using your flexibility, you nimbly dodge and strike a vicious blow with your [weapon] in return that sends him crashing into the ground, hollering in pain. (5)");
			HP -= 5;
		}
		else if (combatMisdirect()) {
			MainScreen.text("He charges at you with a loud bleat, but using your misdirecting skills, you nimbly dodge and strike a vicious blow with your [weapon] in return that sends him crashing into the ground, hollering in pain. (5)");
			HP -= 5;
		}
		else {
			let damage: number = int((str + weaponAttack) - rand(player.stats.tou));
			if (damage > 0) {
				damage = player.takeDamage(damage);
				MainScreen.text("He charges at you with a loud bleat, catching you off-guard and sending you flying into the ground.");
				if (!player.perks.has("Resolute")) {
					MainScreen.text("  The pain of the impact is so big you feel completely dazed, almost seeing stars.");
					player.statusAffects.add(new StatusAffect("Stunned", 0, 0, 0, 0)));
				}
				//stun PC + hp damage if hit, hp damage dependent on str if miss
				MainScreen.text(" (" + damage + ")");
			}
			else MainScreen.text("He charges at you, but you successfully deflect it at the last second.");
		}
		combatRoundOver();
	}

	private bottleChug(): void {
		MainScreen.text("He whips a bottle of wine seemingly from nowhere and begins chugging it down, then lets out a bellowing belch towards you.  The smell is so horrible you cover your nose in disgust, yet you feel hot as you inhale some of the fetid scent.");
		//(damage PC lust very slightly and raise the satyr's lust.)
		game.dynStats("lus", (player.stats.lib / 5));
		lust += 5;
		combatRoundOver();
	}

	//5:(Only executed at high lust) 
	private highLustChugRape(): void {
		MainScreen.text("Panting with barely-contained lust, the Satyr charges at you and tries to ram you into the ground.  ");
		if (statusAffects.has("Blind") && rand(3) < 1) {
			MainScreen.text(capitalA + short + " completely misses you due to blindness!\n", false);
		}
		else if (combatMiss() || combatFlexibility() || combatMisdirect() || combatEvade()) {
			MainScreen.text("As he charges you, you grab him by the horns and spin around, sending him away.");
		}
		else {
			MainScreen.text("You fall with a <b>THUD</b> and the Satyr doesn't even bother to undress you before he begins rubbing his massive cock on your body until he comes, soiling your [armor] and " + player.skinFurScales() + " with slimy, hot cum.  As it rubs into your body, you shiver with unwanted arousal.");
			//large-ish sensitivity based lust increase if hit.)(This also relieves him of some of his lust, though not completely.)
			lust -= 50;
			game.dynStats("lus", (player.stats.sens / 5 + 20));
		}
		combatRoundOver();
	}

	override protected performCombatAction(): void {
		if (lust >= 75 && rand(2) == 0) highLustChugRape();
		else if (lust < 75 && rand(2) == 0) {
			if (rand(2) == 0) satyrBate();
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
			MainScreen.text("\n\nThe satyr laughs heartily at your eagerness...");
			doNext(game.endLustLoss);
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
		this.createCock(rand(13) + 14, 1.5 + rand(20) / 2, CockType.HUMAN);
		this.balls = 2;
		this.ballSize = 2 + rand(13);
		this.cumMultiplier = 1.5;
		this.hoursSinceCum = this.ballSize * 10;
		createBreastRow(0);
		this.lowerBody.butt.analLooseness = ButtLooseness.STRETCHED;
		this.lowerBody.butt.analWetness = ButtWetness.NORMAL;
		this.statusAffects.add(new StatusAffect("BonusACapacity", 20, 0, 0, 0)));
		this.tallness = rand(37) + 64;
		this.lowerBody.hipRating = HipRating.AVERAGE;
		this.lowerBody.butt.buttRating = ButtRating.AVERAGE + 1;
		this.lowerBody = LowerBodyType.HOOFED;
		this.skinTone = "tan";
		this.upperBody.head.hairColor = randomChoice("black", "brown");
		this.upperBody.head.hairLength = 3 + rand(20);
		this.faceType = FaceType.COW_MINOTAUR;
		initStrTouSpeInte(75, 70, 110, 70);
		initLibSensCor(60, 35, 45);
		this.weaponName = "fist";
		this.weaponVerb = "punch";
		this.armorName = "thick fur";
		this.bonusHP = 300;
		this.lust = 20;
		this.lustVuln = 0.30;
		this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
		this.level = 14;
		this.gems = rand(25) + 25;
		this.drop = new ChainedDrop().add(consumables.INCUBID, 1 / 2);
		this.tailType = TailType.COW;
		checkMonster();
	}

}
