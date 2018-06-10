export class HarpyQueen extends Monster {

	override protected performCombatAction(): void {
		game.harpyQueenAI();
	}

	public defeated(hpVictory: boolean): void {
		game.harpyQueenDefeatedByPC();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		game.harpyQueenBeatsUpPCBadEnd();
	}

	public HarpyQueen() {
		this.a = "the ";
		this.short = "Harpy Queen";
		this.imageName = "harpyqueen";
		this.long = "You face the Harpy Queen, a broodmother of epic proportions - literally.  Her hips are amazingly wide, thrice her own width at the least, and the rest of her body is lushly voluptuous, with plush, soft thighs and a tremendous butt.  Her wide wings beat occasionally, sending ripples through her jiggly body.  She wields a towering whitewood staff in one hand, using the other to cast eldritch spells.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.SLAVERING, VaginaLooseness.LOOSE);
		createBreastRow(Appearance.breastCupInverse("D"));
		this.torso.butt.looseness = ButtLooseness.STRETCHED;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.tallness = randInt(8) + 70;
		this.torso.hipRating = HipRating.AMPLE + 2;
		this.torso.butt.rating = ButtRating.LARGE;
		this.torso.hips.legs.type = LegType.HARPY;
		this.skin.tone = "red";
		this.skin.type = SkinType.PLAIN;
		this.skinDesc = "feathers";
		this.torso.neck.head.hair.color = "black";
		this.torso.neck.head.hair.length = 15;
		this.baseStats.str = 70;
this.baseStats.tou = 60;
this.baseStats.spe = 120;
this.baseStats.int = 40;
		initLibSensCor(40, 45, 50);
		this.weaponName = "eldritch staff";
		this.weaponVerb = "thwack";
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
		this.tailType = TailType.HARPY;
		this.wingType = WingType.FEATHERED_LARGE;
		this.drop = NO_DROP;
		checkMonster();
	}

}
