export class Farmers extends Monster {

	override protected performCombatAction() {
		statusAffects.add(StatusAffectType.Attacks, 4, 0, 0, 0);
		eAttack();
		combatRoundOver();
	}

	public defeated(hpVictory: boolean) {
		game.owca.beatUpOwca();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
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
		this.torso.butt.looseness = ButtLooseness.STRETCHED;
		this.torso.butt.wetness = ButtWetness.SLIME_DROOLING;
		this.tallness = randInt(8) + 70;
		this.torso.hipRating = HipRating.AMPLE + 2;
		this.torso.butt.rating = ButtRating.LARGE;
		this.skin.tone = "red";
		this.torso.neck.head.hair.color = "black";
		this.torso.neck.head.hair.length = 15;
		this.baseStats.str = 40;
this.baseStats.tou = 50;
this.baseStats.spe = 99;
this.baseStats.int = 99;
		this.baseStats.lib = 35;
this.baseStats.sens = 35;
this.baseStats.cor = 20;
		this.weaponName = "pitchforks";
		this.weaponVerb = "stab";
		this.armorName = "chitin";
		this.bonusHP = 500;
		this.lustVuln = 0;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 10;
		this.gems = randInt(25) + 40;
		this.hornType = HornType.DEMON;
		this.horns = 2;
		this.tailType = TailType.DEMONIC;
		this.drop = NO_DROP;
		checkMonster();
	}

}
