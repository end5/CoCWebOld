export class GooArmor extends GooGirl {

	override protected performCombatAction() {
		game.gooArmorAI();
	}

	public defeated(hpVictory: boolean) {
		if (statusAffects.has(StatusAffectType.Spar)) game.valeria.pcWinsValeriaSpar();
		else game.beatUpGooArmor();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		if (pcCameWorms) {
			DisplayText("\n\nThe armored goo sighs while you exhaust yourself...");
			return { next: game.endLustLoss };
		} else {
			if (statusAffects.has(StatusAffectType.Spar)) game.valeria.pcWinsValeriaSparDefeat();
			else game.gooArmorBeatsUpPC();
		}
	}

	public GooArmor() {
		super(true);
		this.a = "a ";
		this.short = "Goo Armor";
		this.imageName = "gooarmor";
		this.long = "Before you stands a suit of plated mail armor filled with a bright blue goo, standing perhaps six feet off the ground.  She has a beautiful, feminine face, and her scowl as she stands before you is almost cute.  She has formed a mighty greatsword from her goo, and has assumed the stance of a well-trained warrior.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.SLAVERING, VaginaLooseness.GAPING_WIDE);
		createBreastRow(Appearance.breastCupInverse("C"));
		this.torso.butt.looseness = ButtLooseness.STRETCHED;
		this.torso.butt.wetness = ButtWetness.SLIME_DROOLING;
		this.tallness = randInt(8) + 70;
		this.torso.hips.rating = HipRating.AMPLE + 2;
		this.torso.butt.rating = ButtRating.LARGE;
		this.skin.tone = "blue";
		this.skin.type = SkinType.GOO;
		//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SkinType.GOO];
		this.skinAdj = "goopey";
		this.torso.neck.head.hair.color = "black";
		this.torso.neck.head.hair.length = 15;
		this.torso.neck.head.hair.type = HAIR.GOO;
		this.baseStats.str = 60;
this.baseStats.tou = 50;
this.baseStats.spe = 50;
this.baseStats.int = 40;
		this.baseStats.lib = 60;
this.baseStats.sens = 35;
this.baseStats.cor = 50;
		this.weaponName = "goo sword";
		this.weaponVerb = "slash";
		this.weaponAttack = 60;
		this.armorName = "armor";
		this.armorDef = 50;
		this.bonusHP = 500;
		this.lustVuln = .35;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 16;
		this.gems = randInt(25) + 40;
		this.drop = NO_DROP;
		checkMonster();
	}

}

