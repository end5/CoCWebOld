export class PhoenixPlatoon extends Character {

	override protected performCombatAction() {
		game.phoenixPlatoonAI();
	}

	public defeated(hpVictory: boolean) {
		game.phoenixPlatoonLosesToPC();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		game.phoenixPlatoonMurdersPC();
	}

	public PhoenixPlatoon() {
		this.a = "the ";
		this.short = "phoenix platoon";
		this.imageName = "phoenixmob";
		this.long = "You are faced with a platoon of heavy infantry, all armed to the teeth and protected by chain vests and shields. They look like a cross between salamander and harpy, humanoid save for crimson wings, scaled feet, and long fiery tails. They stand in a tight-knit shield wall, each phoenix protecting herself and the warrior next to her with their tower-shield. Their scimitars cut great swaths through the room as they slowly advance upon you.";
		this.plural = true;
		this.pronoun1 = "they";
		this.pronoun2 = "them";
		this.pronoun3 = "their";
		this.createCock();
		this.balls = 2;
		this.ballSize = 1;
		this.cumMultiplier = 3;
		this.createVagina(false, VaginaWetness.SLAVERING, VaginaLooseness.LOOSE);
		createBreastRow(Appearance.breastCupInverse("D"));
		this.torso.butt.looseness = ButtLooseness.STRETCHED;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.tallness = randInt(8) + 70;
		this.torso.hipRating = HipRating.AMPLE + 2;
		this.torso.butt.rating = ButtRating.LARGE;
		this.torso.hips.legs.type = LegType.LIZARD;
		this.skin.tone = "red";
		this.torso.neck.head.hair.color = "black";
		this.torso.neck.head.hair.length = 15;
		this.baseStats.str = 70;
this.baseStats.tou = 60;
this.baseStats.spe = 120;
this.baseStats.int = 40;
		this.baseStats.lib = 40;
this.baseStats.sens = 45;
this.baseStats.cor = 50;
		this.weaponName = "spears";
		this.weaponVerb = "stab";
		this.weaponAttack = 20;
		this.armorName = "armor";
		this.armorDef = 20;
		this.bonusHP = 1000;
		this.lust = 20;
		this.lustVuln = .15;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 20;
		this.gems = randInt(25) + 160;
		this.additionalXP = 50;
		this.hornType = HornType.DRACONIC_X2;
		this.horns = 2;
		this.tailType = TailType.HARPY;
		this.wingType = WingType.FEATHERED_LARGE;
		this.drop = NO_DROP;
		checkMonster();
	}

}
