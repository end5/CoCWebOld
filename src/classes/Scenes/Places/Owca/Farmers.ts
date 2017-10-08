export default class Farmers extends Monster {

	override protected performCombatAction(): void {
		statusAffects.add(new StatusAffect("Attacks", 4, 0, 0, 0)));
		eAttack();
		combatRoundOver();
	}

	public defeated(hpVictory: boolean): void {
		game.owca.beatUpOwca();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		game.owca.loseToOwca();
	}

	public Farmers() {
		this.a = "the ";
		this.short = "farmers";
		this.imageName = "farmers";
		this.long = "This is a group of thirty angry villagers, almost all human-looking but for the tiny horn-like protrusions growing from their heads and the white fuzz that almost passes off as hair.  They are all armed with pitchforks or other crude farming tools they use in their everyday task.  Rebecc is staring from behind them with horrified eyes at the combat, paralyzed by the sudden turn of events.";
		this.plural = true;
		this.pronoun1 = "they";
		this.pronoun2 = "them";
		this.pronoun3 = "their";
		this.createCock(9, 2, CockType.HUMAN);
		this.balls = 2;
		this.ballSize = 1;
		this.cumMultiplier = 3;
		// this.hoursSinceCum = 0;
		this.createVagina(false, VaginaWetness.SLICK, VaginaLooseness.LOOSE);
		createBreastRow(Appearance.breastCupInverse("A"));
		this.lowerBody.butt.analLooseness = ButtLooseness.STRETCHED;
		this.lowerBody.butt.analWetness = ButtWetness.SLIME_DROOLING;
		this.tallness = rand(8) + 70;
		this.lowerBody.hipRating = HipRating.AMPLE + 2;
		this.lowerBody.butt.buttRating = ButtRating.LARGE;
		this.skinTone = "red";
		this.upperBody.head.hairColor = "black";
		this.upperBody.head.hairLength = 15;
		initStrTouSpeInte(40, 50, 99, 99);
		initLibSensCor(35, 35, 20);
		this.weaponName = "pitchforks";
		this.weaponVerb = "stab";
		this.armorName = "chitin";
		this.bonusHP = 500;
		this.lustVuln = 0;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 10;
		this.gems = rand(25) + 40;
		this.hornType = HornType.DEMON;
		this.horns = 2;
		this.tailType = TailType.DEMONIC;
		this.drop = NO_DROP;
		checkMonster();
	}

}
