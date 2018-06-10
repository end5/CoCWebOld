
export class CumWitch extends Monster {

	override protected performCombatAction(): void {
		game.cumWitchAI();
	}

	public defeated(hpVictory: boolean): void {
		game.cumWitchDefeated();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		game.defeatedByCumWitch();
	}

	public CumWitch() {
		this.a = "the ";
		this.short = "Cum Witch";
		this.imageName = "cumwitch";
		this.long = "The Cum Witch is a moderately tall woman, almost six feet in height.  Her dark ebony skin is nearly as black as pitch, though it glitters with sweat from her recent sexual activities and the fight.  She has plump lips and long, smooth blonde hair, though much of it is hidden behind a pointed, wide-brimmed hat.  Her robes are even blacker than she is, but she wields an alabaster staff that fairly sizzles with magical might.  Of course, her garments don't do much to conceal her gigantic breasts.  Though there are only two, they're large enough to dwarf the four tits most sand witches are packing.";
		// this.plural = false;
		this.createCock(12, 2, CockType.HUMAN);
		this.balls = 0;
		this.ballSize = 0;
		this.cumMultiplier = 3;
		this.hoursSinceCum = 20;
		this.createVagina(false, VaginaWetness.WET, VaginaLooseness.LOOSE);
		this.statusAffects.add(StatusAffectType.BonusVCapacity, 20, 0, 0, 0);
		createBreastRow(Appearance.breastCupInverse("E"));
		this.torso.butt.looseness = ButtLooseness.TIGHT;
		this.torso.butt.wetness = ButtWetness.NORMAL;
		this.tallness = randInt(12) + 55;
		this.torso.hipRating = HipRating.CURVY;
		this.torso.butt.rating = ButtRating.LARGE;
		this.skin.tone = "black";
		this.torso.neck.head.hair.color = "sandy-blonde";
		this.torso.neck.head.hair.length = 15;
		this.baseStats.str = 35;
this.baseStats.tou = 35;
this.baseStats.spe = 35;
this.baseStats.int = 85;
		initLibSensCor(55, 40, 30);
		this.weaponName = "fists";
		this.weaponVerb = "punches";
		this.armorName = "robes";
		this.bonusHP = 100;
		this.lust = 30;
		this.lustVuln = .8;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 6;
		this.gems = randInt(15) + 5;
		this.drop = new WeightedDrop().addMany(1,
			consumables.TSCROLL,
			consumables.OVIELIX,
			consumables.LACTAID,
			consumables.LABOVA_,
			consumables.W__BOOK,
			consumables.B__BOOK,
			null);
		checkMonster();
	}

}

