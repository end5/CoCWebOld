export class SandWitchMob extends Character {

	override protected performCombatAction() {
		game.sandWitchMobAI();
	}

	public defeated(hpVictory: boolean) {
		game.yoYouBeatUpSomeSandWitchesYOUMONSTER();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		game.loseToSammitchMob();
	}

	public SandWitchMob() {
		this.a = "the ";
		this.short = "sand witches";
		this.imageName = "sandwitchmob";
		this.long = "You are surrounded by a veritable tribe of sand witches.  Like the ones that roam the sands, they have simple robes, blond hair, and four big breasts that push at the concealing cloth immodestly.  Glowering at you hatefully, the pack of female spellcasters readies itself to drag you down with sheer numbers.";
		this.plural = true;
		this.pronoun1 = "they";
		this.pronoun2 = "them";
		this.pronoun3 = "their";
		this.createVagina(false, VaginaWetness.WET, VaginaLooseness.LOOSE);
		this.createBreastRow(Appearance.breastCupInverse("DD"));
		this.createBreastRow(Appearance.breastCupInverse("DD"));
		this.torso.butt.looseness = ButtLooseness.TIGHT;
		this.torso.butt.wetness = ButtWetness.NORMAL;
		this.tallness = randInt(12) + 55;
		this.torso.hipRating = HipRating.CURVY;
		this.torso.butt.rating = ButtRating.LARGE;
		this.skin.tone = "bronzed";
		this.torso.neck.head.hair.color = "sandy-blonde";
		this.torso.neck.head.hair.length = 15;
		this.baseStats.str = 25;
this.baseStats.tou = 25;
this.baseStats.spe = 35;
this.baseStats.int = 45;
		this.baseStats.lib = 55;
this.baseStats.sens = 40;
this.baseStats.cor = 30;
		this.weaponName = "fists";
		this.weaponVerb = "punches";
		this.weaponAttack = 0;
		this.weaponPerk = "";
		this.weaponValue = 150;
		this.armorName = "robes";
		this.armorDef = 1;
		this.armorPerk = "";
		this.armorValue = 5;
		this.bonusHP = 80;
		this.lust = 30;
		this.lustVuln = .5;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 4;
		this.gems = randInt(15) + 5;
		this.drop = NO_DROP;
		checkMonster();

	}

}

