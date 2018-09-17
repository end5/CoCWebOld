export class SharkGirl extends Character {
	//Lust-based attacks:
	private sharkTease() {
		game.DisplaySprite(70);
		if (randInt(2) === 0) {
			DisplayText("You charge at the shark girl, prepared to strike again, but stop dead in your tracks when she bends over and wiggles her toned ass towards you. It distracts you long enough for her tail to swing out and smack you to the ground. She coos, \"<i>Aw... You really do like me!</i>\"");
			//(Small health damage, medium lust build).
			player.takeDamage(4 + randInt(4));
			game.dynStats("lus", (10 + (player.stats.lib / 20)));
		}
		else {
			DisplayText("You pull your " + player.weaponName + " back, getting a running start to land another attack. The Shark girl smirks and pulls up her bikini top, shaking her perky breasts in your direction. You stop abruptly, aroused by the sight just long enough for the shark girl to kick you across the face and knock you to the ground.  She teases, \"<i>Aw, don't worry baby, you're gonna get the full package in a moment!</i>\"");
			//(Small health damage, medium lust build)
			player.takeDamage(4 + randInt(4));
			game.dynStats("lus", (5 + (player.stats.lib / 10)));
		}
		combatRoundOver();
	}
	public defeated(hpVictory: boolean) {
		game.boat.sharkGirlScene.sharkWinChoices();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		if (pcCameWorms) {
			DisplayText("\n\nYour foe doesn't seem disgusted enough to leave...");
			return { next: game.endLustLoss };
		} else {
			game.boat.sharkGirlScene.sharkLossRape();
		}
	}

	public SharkGirl() {
		trace("SharkGirl Constructor!");
		this.a = "the ";
		this.short = "shark-girl";
		this.imageName = "sharkgirl";
		this.long = "The shark girl stands just over 5'5\", with grey skin shimmering from water droplets catching the sunlight and slender muscles built for swimming.  Her shoulder-length silver hair brushes past her pretty face and her eyes are a striking shade of red. She has rows of intimidating sharp teeth glinting in the light. A fish-like tail protrudes from her backside, wrapping around her toned legs at every opportunity. She's wearing a rather skimpy black bikini, strings done in such a way that they move around her fin; though the swimwear itself barely covers her perky breasts and tight snatch.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.DROOLING, VaginaLooseness.NORMAL);
		this.statusAffects.add(StatusAffectType.BonusVCapacity, 15, 0, 0, 0);
		createBreastRow(Appearance.breastCupInverse("D"));
		this.torso.butt.looseness = ButtLooseness.TIGHT;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.statusAffects.add(StatusAffectType.BonusACapacity, 40, 0, 0, 0);
		this.tallness = 5 * 12 + 5;
		this.torso.hipRating = HipRating.AMPLE + 2;
		this.torso.butt.rating = ButtRating.LARGE;
		this.skin.tone = "gray";
		this.torso.neck.head.hair.color = "silver";
		this.torso.neck.head.hair.length = 16;
		this.baseStats.str = 40;
this.baseStats.tou = 40;
this.baseStats.spe = 55;
this.baseStats.int = 42;
		this.baseStats.lib = 75;
this.baseStats.sens = 35;
this.baseStats.cor = 40;
		this.weaponName = "shark teeth";
		this.weaponVerb = "bite";
		this.weaponAttack = 3;
		this.armorName = "tough skin";
		this.armorDef = 5;
		this.bonusHP = 20;
		this.lust = 40;
		this.lustVuln = .9;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 4;
		this.gems = randInt(15) + 5;
		this.drop = new WeightedDrop().
			add(consumables.L_DRAFT, 3).
			add(armors.S_SWMWR, 1).
			add(consumables.SHARK_T, 5).
			add(null, 1);
		this.special1 = sharkTease;
		this.special2 = sharkTease;
		checkMonster();
	}

}
