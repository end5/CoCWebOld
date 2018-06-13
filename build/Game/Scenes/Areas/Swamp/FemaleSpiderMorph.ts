/**
 * ...
 * @author ...
 */
export class FemaleSpiderMorph extends AbstractSpiderMorph {


	public defeated(hpVictory: boolean) {
		game.swamp.femaleSpiderMorphScene.defeatASpiderBitch();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		if (pcCameWorms) {
			DisplayText("\n\nThe spider flashes a predatory grin while she waits it out...");
			return { next: game.endLustLoss };
		} else {
			game.swamp.femaleSpiderMorphScene.loseToFemaleSpiderMorph();
		}
	}

	public FemaleSpiderMorph() {
		this.a = "the ";
		this.short = "female spider-morph";
		this.imageName = "femalespidermorph";
		this.long = "The female spider-morph is completely nude, save for her thigh-high stockings and forearm-length gloves, which upon closer inspection, appear to be actually be part of her body - her exoskeleton.  Her exposed skin is pale as the full moon, save for the dusky skin of her nipples and the black-skinned delta of her sex.  Her breasts and ass are both full and well-rounded, and just above her ass-cheeks there's a bulbous spider-abdomen.  The spider-girl is currently eyeing you with a strange expression and her fangs bared.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.DROOLING, VaginaLooseness.LOOSE);
		this.statusAffects.add(StatusAffectType.BonusVCapacity, 40, 0, 0, 0);
		createBreastRow(Appearance.breastCupInverse("E+"));
		this.torso.butt.looseness = ButtLooseness.VIRGIN;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.statusAffects.add(StatusAffectType.BonusACapacity, 30, 0, 0, 0);
		this.tallness = 7 * 12 + 6;
		this.torso.hipRating = HipRating.CURVY + 2;
		this.torso.butt.rating = ButtRating.LARGE + 1;
		this.torso.hips.legs.type = LegType.CHITINOUS_SPIDER_LEGS;
		this.skin.tone = "dusky";
		this.torso.neck.head.hair.color = "red";
		this.torso.neck.head.hair.length = 13;
		this.baseStats.str = 60;
this.baseStats.tou = 50;
this.baseStats.spe = 99;
this.baseStats.int = 99;
		this.baseStats.lib = 35;
this.baseStats.sens = 35;
this.baseStats.cor = 20;
		this.weaponName = "dagger";
		this.weaponVerb = "stab";
		this.weaponAttack = 15;
		this.armorName = "exoskeleton";
		this.armorDef = 14;
		this.armorPerk = "";
		this.armorValue = 50;
		this.bonusHP = 200;
		this.lust = 20;
		this.lustVuln = .6;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 13;
		this.gems = randInt(10) + 10;
		this.drop = new WeightedDrop().add(consumables.S_GOSSR, 5)
			.add(useables.T_SSILK, 1)
			.add(null, 4);
		this.tailType = TailType.SPIDER_ABDOMEN;
		checkMonster();
	}

}
