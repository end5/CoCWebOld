export class Zetaz extends Monster {


	public doAI() {
		game.zetazAI();
	}


	public defeated(hpVictory: boolean) {
		game.defeatZetaz();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		if (pcCameWorms) {
			DisplayText("\n\nYour foe doesn't seem put off enough to care...");
			return { next: game.endLustLoss };
		} else {
			game.loseToZetaz();
		}
	}

	public Zetaz() {
		this.a = "";
		this.short = "Zetaz";
		this.imageName = "zetaz";
		this.long = "Zetaz has gone from a pipsqueak to the biggest imp you've seen!  Though he has the familiar red skin, curving pointed horns, and wings you would expect to find on an imp, his feet now end in hooves, and his body is covered with thick layers of muscle.  If the dramatic change in appearance is any indication, he's had to toughen up nearly as much as yourself over the past " + (game.model.time.days < 60 ? "weeks" : "months") + ".  Zetaz still wears the trademark imp loincloth, though it bulges and shifts with his movements in a way that suggest a considerable flaccid size and large, full sack.  His shoulders are wrapped with studded leather and his wrists are covered with metallic bracers.  The imp has clearly invested in at least a little additional protection.  It does not look like he carries a weapon.";
		this.createCock(randInt(2) + 11, 2.5, CockType.DEMON);
		this.balls = 2;
		this.ballSize = 1;
		this.cumMultiplier = 3;
		this.hoursSinceCum = 20;
		createBreastRow(0);
		this.torso.butt.looseness = ButtLooseness.TIGHT;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.tallness = 4 * 12 + 1;
		this.torso.hipRating = HipRating.BOYISH;
		this.torso.butt.rating = ButtRating.TIGHT;
		this.torso.hips.legs.type = LegType.KANGAROO;
		this.skin.tone = "red";
		this.torso.neck.head.hair.color = "black";
		this.torso.neck.head.hair.length = 5;
		this.baseStats.str = 65;
this.baseStats.tou = 60;
this.baseStats.spe = 45;
this.baseStats.int = 52;
		this.baseStats.lib = 55;
this.baseStats.sens = 35;
this.baseStats.cor = 100;
		this.weaponName = "claws";
		this.weaponVerb = "claw-slash";
		this.armorName = "leathery skin";
		this.bonusHP = 350;
		this.lust = 40;
		this.lustVuln = .35;
		this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
		this.level = 12;
		this.gems = randInt(55) + 150;
		this.additionalXP = 100;
		this.drop = new WeightedDrop(consumables.BIMBOLQ, 1);
		this.wingType = WingType.IMP;
		this.wingDesc = "small";
		checkMonster();
	}

}
