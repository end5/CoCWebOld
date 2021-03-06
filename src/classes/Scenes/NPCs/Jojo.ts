﻿export default class Jojo extends Monster {

	public defeated(hpVictory: boolean): void {
		game.jojoScene.defeatedJojo(hpVictory);
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		game.jojoScene.loseToJojo();
	}

	override protected performCombatAction(): void {
		if (game.monk > 1 && rand(2) == 0)
			selfCorruption(); //Shouldn't do any self corruption at monk one. Otherwise a 50/50 chance
		else eAttack();
	}

	private selfCorruption(): void {
		switch (game.monk) {
			case 2:
				MainScreen.text("Jojo looks lost in thought for a moment, and fails to attack.  ");
				lust += 4;
				break;
			case 3:
				MainScreen.text("Jojo blushes as he fights you, distracted by a stray thought.  You think you see a bulge in the loose cloth of his pants.  ");
				lust += 8;
				break;
			case 4:
				MainScreen.text("Jojo stumbles, shakes his head, and pulls one of his hands away from the stiff tent in his pants.  ");
				lust += 10;
				break;
			default:
				MainScreen.text("Jojo frantically jerks his " + cockDescriptShort(0) + ", stroking the " + cockDescriptShort(0) + " as it leaks pre-cum at the sight of you.  ");
				lust += 15;
		}

		if (lust >= 100) {
			doNext(game.endLustVictory);
			return;
		}
		else if (lust >= 85)
			MainScreen.text("The mouse is panting and softly whining, each movement seeming to make his bulge more pronounced.  You don't think he can hold out much longer.  ");
		else if (lust >= 70)
			MainScreen.text("The mouse is having trouble moving due to the rigid protrusion from his groin.  ");
		else if (lust >= 60)
			MainScreen.text("The mouse's eyes constantly dart over your most sexual parts, betraying his lust.  ");
		else if (lust > 50)
			MainScreen.text("The mouse's skin remains flushed with the beginnings of arousal.  ");
		doNext(game.playerMenu);
	}

	public Jojo() {
		trace("Jojo Constructor!");
		this.a = "";
		this.short = "Jojo";
		this.imageName = "jojo";
		this.long = "Jojo is an anthropomorphic mouse with immaculate white fur.  Though he stands only four feet tall, he is covered in lean muscle and moves with incredible speed.  He wears loose white clothes wrapped in prayer beads and tattered prayer papers.";
		// this.plural = false;
		this.createCock(7.5, 1.8);
		this.balls = 2;
		this.ballSize = 1;
		this.cumMultiplier = 1;
		this.hoursSinceCum = 1000;
		createBreastRow(0);
		this.lowerBody.butt.analLooseness = ButtLooseness.TIGHT;
		this.lowerBody.butt.analWetness = ButtWetness.NORMAL;
		this.tallness = 4 * 12;
		this.lowerBody.hipRating = HipRating.SLENDER;
		this.lowerBody.butt.buttRating = ButtRating.TIGHT;
		this.skinTone = "white";
		this.skinType = SkinType.FUR;
		this.skinDesc = "fur";
		this.upperBody.head.hairColor = "white";
		this.upperBody.head.hairLength = 2;
		initStrTouSpeInte(35, 40, 65, 55);
		initLibSensCor(15, 40, 0);
		this.weaponName = "paw";
		this.weaponVerb = "punch";
		this.armorName = "robes";
		this.lust = 15;
		this.lustVuln = .9;
		this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
		this.level = 4;
		this.gems = rand(5) + 2;
		this.special1 = selfCorruption;
		//Create jojo sex attributes
		//Variations based on jojo's corruption.
		if (game.monk == 3) {
			this.lust += 30;
			this.cocks[0].cockThickness += .2;
			this.cocks[0].cockLength += 1.5;
			if (player.gender == 1 || player.gender == 3) this.lowerBody.butt.analLooseness = 2;
		}
		if (game.monk == 4) {
			this.lust += 40;
			this.cocks[0].cockThickness += .5;
			this.cocks[0].cockLength += 3.5;
			if (player.gender == 1 || player.gender == 3) this.lowerBody.butt.analLooseness = 3;
		}
		if (game.monk == 5) {
			this.lust += 50;
			this.cocks[0].cockThickness += 1;
			this.cocks[0].cockLength += 5.5;
			this.str -= 20;
			this.tou += 30;
			this.HP += 60;
			if (player.gender == 1 || player.gender == 3) this.lowerBody.butt.analLooseness = 4;
			this.long = "Jojo is an anthropomorphic mouse with immaculate white fur.  Though he stands only four feet tall, he is covered in lean muscle and moves with incredible speed.  He's naked, with a large tainted throbbing member bouncing at attention.  A fuzzy sack with painfully large looking balls dangles between his legs.";
		}
		this.drop = NO_DROP;
		checkMonster();
	}

}

