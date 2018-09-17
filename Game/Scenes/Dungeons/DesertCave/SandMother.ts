export class SandMother extends Character {

	public defeated(hpVictory: boolean) {
		game.defeatTheSandMother();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		game.loseToTheSandMother();
	}

	public SandMother() {
		this.a = "the ";
		this.short = "Sand Mother";
		this.imageName = "sandmother";
		this.long = "The Sand Mother is a towering woman of imposing stature and bust.  She wears a much silkier, regal-looking robe than her sisters, and it barely serves to contain her four milk-laden breasts, straining under their jiggling weight.  Dangling around her in a way that reminds you oddly of a halo, the Sand Mother's blonde-white hair fans around her, hanging long behind her.  The queen witch is brandishing a pearly white scepter rather threateningly, though from the way she holds it, it's clear she doesn't intend to use it as a physical weapon.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.WET, VaginaLooseness.LOOSE);
		this.statusAffects.add(StatusAffectType.BonusVCapacity, 70, 0, 0, 0);
		this.createBreastRow(Appearance.breastCupInverse("DD"));
		this.createBreastRow(Appearance.breastCupInverse("DD"));
		this.torso.butt.looseness = ButtLooseness.TIGHT;
		this.torso.butt.wetness = ButtWetness.NORMAL;
		this.statusAffects.add(StatusAffectType.BonusACapacity, 50, 0, 0, 0);
		this.tallness = 8 * 12 + 6;
		this.torso.hipRating = HipRating.CURVY;
		this.torso.butt.rating = ButtRating.LARGE;
		this.skin.tone = "bronzed";
		this.torso.neck.head.hair.color = "platinum-blonde";
		this.torso.neck.head.hair.length = 15;
		this.baseStats.str = 55;
this.baseStats.tou = 55;
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
		this.bonusHP = 130;
		this.lust = 20;
		this.lustVuln = .6;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 7;
		this.gems = randInt(15) + 55;
		this.createPerk(PerkLib.Resolute, 0, 0, 0, 0);
		this.createPerk(PerkLib.Focused, 0, 0, 0, 0);
		this.drop = NO_DROP;
		checkMonster();
	}

}
