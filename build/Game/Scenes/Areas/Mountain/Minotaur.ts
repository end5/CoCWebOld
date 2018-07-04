/**
 * ...
 * @author Fake-Name
 */


export class Minotaur extends Character {
	public let hasAxe:boolean;


	public defeated(hpVictory: boolean) {
		if (statusAffects.has(StatusAffectType.PhyllaFight)) {
			statusAffects.remove("PhyllaFight");
			DisplayText("You defeat a minotaur!  ", true);
			game.desert.antsScene.phyllaBeatAMino();
		} else {
			game.mountain.minotaurScene.minoVictoryRapeChoices();
		}
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		if (statusAffects.has(StatusAffectType.PhyllaFight)) {
			statusAffects.remove("PhyllaFight");
			game.desert.antsScene.phyllaPCLostToMino();
		} else if (pcCameWorms) {
			DisplayText("\n\nThe minotaur picks you up and forcibly tosses you from his cave, grunting in displeasure.");
			game.return { next: Scenes.camp.returnToCampUseOneHour };
		} else
			game.mountain.minotaurScene.getRapedByMinotaur();
	}

	public get long(): string {
		return "An angry-looking minotaur looms over you.  Covered in shaggy " + hair.color + " fur, the beast is an imposing sight.  Wearing little but an obviously distended loincloth, he is clearly already plotting his method of punishment.  Like most minotaurs he has hooves, a cow-like tail and face, prominent horns, and impressive musculature. " +
			(ballSize > 4 ? ("  Barely visible below the tattered shreds of loincloth are " + Appearance.ballsDescription(true, true, this) + ", swollen with the minotaur's long pent-up need.") : "") +
			(hasAxe ? "<b>This minotaur seems to have found a deadly looking axe somewhere!</b>" : "");
	}

	public Minotaur(axe: boolean = false) {
		//Most times they dont have an axe
		hasAxe = axe || randInt(3) === 0;
		let furColor: string = randomChoice("black", "brown");

		trace("Minotaur Constructor!");
		trace(game.flags);
		this.a = "the ";
		this.short = "minotaur";
		this.imageName = "minotaur";
		this.long = "";
		// this.plural = false;
		this.createCock(randInt(13) + 24, 2 + randInt(3), CockType.HORSE);
		this.balls = 2;
		this.ballSize = 2 + randInt(13);
		this.cumMultiplier = 1.5;
		this.hoursSinceCum = this.ballSize * 10;
		createBreastRow(0);
		this.torso.butt.looseness = ButtLooseness.STRETCHED;
		this.torso.butt.wetness = ButtWetness.NORMAL;
		this.statusAffects.add(StatusAffectType.BonusACapacity, 30, 0, 0, 0);
		this.tallness = randInt(37) + 84;
		this.torso.hipRating = HipRating.AVERAGE;
		this.torso.butt.rating = ButtRating.AVERAGE;
		this.torso.hips.legs.type = LegType.HOOFED;
		this.skin.tone = furColor;
		this.skin.type = SkinType.FUR;
		this.skinDesc = "shaggy fur";
		this.torso.neck.head.hair.color = furColor;
		this.torso.neck.head.hair.length = 3;
		initStrTouSpeInte(hasAxe ? 75 : 50, 60, 30, 20);
		initLibSensCor(40 + this.ballSize * 2, 15 + this.ballSize * 2, 35);
		this.faceType = FaceType.COW_MINOTAUR;
		this.weaponName = hasAxe ? "axe" : "fist";
		this.weaponVerb = hasAxe ? "cleave" : "punch";
		this.armorName = "thick fur";
		this.bonusHP = 20 + randInt(this.ballSize * 2);
		this.lust = this.ballSize * 3;
		this.lustVuln = hasAxe ? 0.84 : 0.87;
		this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
		this.level = hasAxe ? 6 : 5;
		this.gems = randInt(5) + 5;
		if (hasAxe) {
			this.drop = new WeightedDrop(consumables.MINOBLO, 1);
		} else {
			this.drop = new ChainedDrop().add(consumables.MINOCUM, 1 / 5)
				.add(consumables.MINOBLO, 1 / 2)
				.elseDrop(null);
		}
		this.special1 = game.mountain.minotaurScene.minoPheromones;
		this.tailType = TailType.COW;
		checkMonster();
	}

}

