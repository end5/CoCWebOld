﻿export default class WormMass extends Monster {


	override protected performCombatAction(): void {
		//Worms have different AI
		if (rand(2) == 0)
			special1();
		else special2();
	}


	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		MainScreen.text("Overcome by your " + (hpVictory ? "wounds" : "lust") + ", you sink to your knees as the colony of worms swarms all over your body...\n\n", true);
		game.infest1();
	}

	public eMaxHP(): number {
		return 40;
	}

	public WormMass() {
		trace("WormMass Constructor!");
		this.a = "the ";
		this.short = "worms";
		this.imageName = "worms";
		this.long = "Before you stands the horrid mass of worms. It has shifted itself and now takes the shape of a humanoid composed completely of the worms in the colony. Its vaguely human shape lumbers towards you in a clearly aggressive manner.";
		this.plural = true;
		initGenderless();
		this.pronoun1 = "they";
		this.pronoun2 = "them";
		this.pronoun3 = "their";
		this.createBreastRow(0, 0);
		this.lowerBody.butt.analLooseness = ButtLooseness.VIRGIN;
		this.lowerBody.butt.analWetness = ButtWetness.DRY;
		this.tallness = 1;
		this.lowerBody.hipRating = HipRating.SLENDER;
		this.lowerBody.butt.buttRating = ButtRating.BUTTLESS;
		this.skinTone = "white";
		initStrTouSpeInte(35, 5, 10, 1);
		initLibSensCor(90, 60, 90);
		this.weaponName = "worm";
		this.weaponVerb = "slap";
		this.armorName = "skin";
		this.lust = 30;
		this.lustVuln = 0;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 3;
		this.gems = 0;
		this.special1 = game.wormAttack;
		this.special2 = game.wormsEntice;
		this.drop = NO_DROP;
		checkMonster();
	}

}
