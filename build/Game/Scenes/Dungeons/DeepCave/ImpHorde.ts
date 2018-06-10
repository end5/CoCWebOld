export class ImpHorde extends Monster {


	override protected performCombatAction(): void {
		game.impGangAI();
	}

	public defeated(hpVictory: boolean): void {
		game.impGangVICTORY();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			DisplayText("\n\nYour foes don't seem put off enough to leave...");
			return { next: game.endLustLoss };
		} else {
			game.loseToImpMob();
		}
	}

	public ImpHorde() {
		trace("ImpHorde Constructor!");
		this.a = "the ";
		this.short = "imp horde";
		this.imageName = "impmob";
		this.long = "Imps of all shapes and sizes fill the room around you, keeping you completely surrounded by their myriad forms.  You can see more than a few sporting disproportionate erections, and there's even some with exotic dog-dicks, horse-pricks, and the odd spiny cat-cock.  Escape is impossible, you'll have to fight or seduce your way out of this one!";
		this.plural = true;
		this.pronoun1 = "they";
		this.pronoun2 = "them";
		this.pronoun3 = "their";
		this.createCock(12, 2, CockType.DEMON);
		this.balls = 2;
		this.ballSize = 1;
		createBreastRow(0);
		this.torso.butt.looseness = ButtLooseness.TIGHT;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.statusAffects.add(StatusAffectType.BonusACapacity, 10, 0, 0, 0);
		this.tallness = 36;
		this.torso.hipRating = HipRating.SLENDER;
		this.torso.butt.rating = ButtRating.TIGHT;
		this.skin.tone = "red";
		this.torso.neck.head.hair.color = "black";
		this.torso.neck.head.hair.length = 1;
		this.baseStats.str = 20;
this.baseStats.tou = 10;
this.baseStats.spe = 25;
this.baseStats.int = 12;
		initLibSensCor(45, 45, 100);
		this.weaponName = "fists";
		this.weaponVerb = "punches";
		this.armorName = "skin";
		this.bonusHP = 450;
		this.lust = 10;
		this.lustVuln = .5;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 10;
		this.gems = 20 + randInt(25);
		this.drop = new WeightedDrop(armors.NURSECL, 1);
		this.wingType = WingType.IMP;
		this.wingDesc = "imp wings";
		checkMonster();
	}

}
