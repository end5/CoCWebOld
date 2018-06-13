export class MaleSpiderMorph extends AbstractSpiderMorph {


	public defeated(hpVictory: boolean) {
		game.swamp.maleSpiderMorphScene.defeatSpiderBoy();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		if (pcCameWorms) {
			DisplayText("\n\nThe spider flashes a predatory grin while she waits it out...");
			return { next: game.endLustLoss };
		} else {
			game.swamp.maleSpiderMorphScene.loseToMaleSpiderMorph();
		}
	}

	public MaleSpiderMorph() {
		this.a = "the ";
		this.short = "male spider-morph";
		this.imageName = "malespidermorph";
		this.long = "The male spider-morph is completely nude, save for his thigh-high stockings and forearm-length gloves, which upon closer inspection, appear to be actually be part of his body - his exoskeleton.  His exposed skin is pale as the full moon, save for the dusk of his nipples and a patch of jet-black that spreads out over his groin, glossing the male's foreskinned cock and dangling sack in glistening ebon.  His ass is small but well-rounded, with a weighty spider-abdomen hanging from just above.  The spider-man is currently eyeing you with a strange expression and his fangs bared.";
		// this.plural = false;
		this.createCock(6, 2);
		this.balls = 2;
		this.ballSize = 2;
		createBreastRow(0);
		this.torso.butt.looseness = ButtLooseness.TIGHT;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.statusAffects.add(StatusAffectType.BonusACapacity, 40, 0, 0, 0);
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
		this.armorValue = 70;
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
		this.tailRecharge = 0;
		checkMonster();
	}

}
