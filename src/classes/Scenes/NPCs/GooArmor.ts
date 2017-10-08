export default class GooArmor extends GooGirl {

	override protected performCombatAction(): void {
		game.gooArmorAI();
	}

	public defeated(hpVictory: boolean): void {
		if (statusAffects.has("Spar")) game.valeria.pcWinsValeriaSpar();
		else game.beatUpGooArmor();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			MainScreen.text("\n\nThe armored goo sighs while you exhaust yourself...");
			doNext(game.endLustLoss);
		} else {
			if (statusAffects.has("Spar")) game.valeria.pcWinsValeriaSparDefeat();
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
		this.lowerBody.butt.analLooseness = ButtLooseness.STRETCHED;
		this.lowerBody.butt.analWetness = ButtWetness.SLIME_DROOLING;
		this.tallness = rand(8) + 70;
		this.lowerBody.hipRating = HipRating.AMPLE + 2;
		this.lowerBody.butt.buttRating = ButtRating.LARGE;
		this.skinTone = "blue";
		this.skinType = SkinType.GOO;
		//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SkinType.GOO];
		this.skinAdj = "goopey";
		this.upperBody.head.hairColor = "black";
		this.upperBody.head.hairLength = 15;
		this.hairType = HAIR.GOO;
		initStrTouSpeInte(60, 50, 50, 40);
		initLibSensCor(60, 35, 50);
		this.weaponName = "goo sword";
		this.weaponVerb = "slash";
		this.weaponAttack = 60;
		this.armorName = "armor";
		this.armorDef = 50;
		this.bonusHP = 500;
		this.lustVuln = .35;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 16;
		this.gems = rand(25) + 40;
		this.drop = NO_DROP;
		checkMonster();
	}

}

