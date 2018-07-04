export class HarpyMob extends Character {

	override protected performCombatAction() {
		game.harpyHordeAI();
	}

	public defeated(hpVictory: boolean) {
		game.pcDefeatsHarpyHorde();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
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
		this.torso.butt.looseness = ButtLooseness.STRETCHED;
		this.torso.butt.wetness = ButtWetness.SLIME_DROOLING;
		this.tallness = randInt(8) + 70;
		this.torso.hipRating = HipRating.CURVY + 2;
		this.torso.butt.rating = ButtRating.LARGE;
		this.torso.hips.legs.type = LegType.HARPY;
		this.skin.tone = "red";
		this.skin.type = SkinType.PLAIN;
		this.skinDesc = "feathers";
		this.torso.neck.head.hair.color = "black";
		this.torso.neck.head.hair.length = 15;
		this.baseStats.str = 50;
this.baseStats.tou = 50;
this.baseStats.spe = 120;
this.baseStats.int = 40;
		this.baseStats.lib = 60;
this.baseStats.sens = 45;
this.baseStats.cor = 50;
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
		this.gems = randInt(25) + 140;
		this.additionalXP = 50;
		this.tailType = TailType.HARPY;
		this.drop = NO_DROP;
		checkMonster();
	}

}
