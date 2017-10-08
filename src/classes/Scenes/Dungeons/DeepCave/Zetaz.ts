export default class Zetaz extends Monster {


	public doAI(): void {
		game.zetazAI();
	}


	public defeated(hpVictory: boolean): void {
		game.defeatZetaz();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			MainScreen.text("\n\nYour foe doesn't seem put off enough to care...");
			doNext(game.endLustLoss);
		} else {
			game.loseToZetaz();
		}
	}

	public Zetaz() {
		this.a = "";
		this.short = "Zetaz";
		this.imageName = "zetaz";
		this.long = "Zetaz has gone from a pipsqueak to the biggest imp you've seen!  Though he has the familiar red skin, curving pointed horns, and wings you would expect to find on an imp, his feet now end in hooves, and his body is covered with thick layers of muscle.  If the dramatic change in appearance is any indication, he's had to toughen up nearly as much as yourself over the past " + (game.model.time.days < 60 ? "weeks" : "months") + ".  Zetaz still wears the trademark imp loincloth, though it bulges and shifts with his movements in a way that suggest a considerable flaccid size and large, full sack.  His shoulders are wrapped with studded leather and his wrists are covered with metallic bracers.  The imp has clearly invested in at least a little additional protection.  It does not look like he carries a weapon.";
		this.createCock(rand(2) + 11, 2.5, CockType.DEMON);
		this.balls = 2;
		this.ballSize = 1;
		this.cumMultiplier = 3;
		this.hoursSinceCum = 20;
		createBreastRow(0);
		this.lowerBody.butt.analLooseness = ButtLooseness.TIGHT;
		this.lowerBody.butt.analWetness = ButtWetness.DRY;
		this.tallness = 4 * 12 + 1;
		this.lowerBody.hipRating = HipRating.BOYISH;
		this.lowerBody.butt.buttRating = ButtRating.TIGHT;
		this.lowerBody = LowerBodyType.KANGAROO;
		this.skinTone = "red";
		this.upperBody.head.hairColor = "black";
		this.upperBody.head.hairLength = 5;
		initStrTouSpeInte(65, 60, 45, 52);
		initLibSensCor(55, 35, 100);
		this.weaponName = "claws";
		this.weaponVerb = "claw-slash";
		this.armorName = "leathery skin";
		this.bonusHP = 350;
		this.lust = 40;
		this.lustVuln = .35;
		this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
		this.level = 12;
		this.gems = rand(55) + 150;
		this.additionalXP = 100;
		this.drop = new WeightedDrop(consumables.BIMBOLQ, 1);
		this.wingType = WingType.IMP;
		this.wingDesc = "small";
		checkMonster();
	}

}
