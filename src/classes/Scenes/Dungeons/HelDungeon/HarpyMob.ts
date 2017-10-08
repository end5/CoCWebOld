export default class HarpyMob extends Monster {

	override protected performCombatAction(): void {
		game.harpyHordeAI();
	}

	public defeated(hpVictory: boolean): void {
		game.pcDefeatsHarpyHorde();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		game.pcLosesToHarpyHorde();
	}

	public HarpyMob() {
		this.a = "the ";
		this.short = "harpy horde";
		this.imageName = "harpymob";
		this.long = "You are surrounded by a wing of particularly large and muscular harpies, perhaps a dozen of them in total.  All of them are clad in simple brown shifts that give them good camouflage in the mountains, and are using their talon-like claws as weapons against you. While not a great threat to a champion of your ability individually, a whole brood of them together is... something else entirely.";
		this.plural = true;
		this.pronoun1 = "they";
		this.pronoun2 = "them";
		this.pronoun3 = "their";
		this.createVagina(false, VaginaWetness.SLAVERING, VaginaLooseness.GAPING_WIDE);
		createBreastRow(Appearance.breastCupInverse("B"));
		this.lowerBody.butt.analLooseness = ButtLooseness.STRETCHED;
		this.lowerBody.butt.analWetness = ButtWetness.SLIME_DROOLING;
		this.tallness = rand(8) + 70;
		this.lowerBody.hipRating = HipRating.CURVY + 2;
		this.lowerBody.butt.buttRating = ButtRating.LARGE;
		this.lowerBody = LowerBodyType.HARPY;
		this.skinTone = "red";
		this.skinType = SkinType.PLAIN;
		this.skinDesc = "feathers";
		this.upperBody.head.hairColor = "black";
		this.upperBody.head.hairLength = 15;
		initStrTouSpeInte(50, 50, 120, 40);
		initLibSensCor(60, 45, 50);
		this.weaponName = "claw";
		this.weaponVerb = "claw";
		this.weaponAttack = 10;
		this.armorName = "armor";
		this.armorDef = 20;
		this.bonusHP = 1000;
		this.lust = 20;
		this.lustVuln = .2;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 18;
		this.gems = rand(25) + 140;
		this.additionalXP = 50;
		this.tailType = TailType.HARPY;
		this.drop = NO_DROP;
		checkMonster();
	}

}
