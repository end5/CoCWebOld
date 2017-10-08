/**
 * Created by aimozg on 18.01.14.
 */
export default class AbstractSuccubus extends Monster {
	protected whipAttack(): void {
		if (statusAffects.has("WhipReady")) {
			//Blind dodge change
			if (statusAffects.has("Blind")) {
				MainScreen.text(capitalA + short + " swings her whip at you wildly, totally missing due to her blindness!!", false);
				combatRoundOver();
				return;
			}
			MainScreen.text("Grinning deviously, the succubus cracks her whip with expert skill, landing a painful blow on your ", false);
			let temp: number = rand(6);
			//Whip yo ass!
			if (temp == 0) {
				MainScreen.text("ass (4)", false);
				player.takeDamage(4);
				game.dynStats("lus", 6 + int(player.stats.sens / 20));
			}
			//Whip yo tits!
			if (temp == 1) {
				if (player.upperBody.chest.count() > 0 && player.upperBody.chest.BreastRatingLargest[0].breastRating > 0) MainScreen.text(player.BreastDescriptor.describeAllBreasts(player) + " (9)", false);
				else MainScreen.text("chest (9)", false);
				player.takeDamage(9);
				game.dynStats("lus", 4 + int(player.stats.sens / 15));
			}
			//Whip yo groin
			if (temp == 2) {
				if (player.gender == 0) {
					MainScreen.text("groin (5)", false);
					player.takeDamage(5);
				}
				if (player.gender == 1) {
					MainScreen.text("groin, dealing painful damage to your " + player.CockDescriptor.describeMultiCockShort(player) + ", doubling you over in agony (" + int((player.stats.tou * 2 + 50) / 4) + ")", false);
					game.player.stats.lust += -15;
					player.takeDamage(int((player.maxHP()) / 4));
				}
				if (player.gender == 2) {
					MainScreen.text("groin, making your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " sting with pain (-10)", false);
					player.takeDamage(10);
					game.player.stats.lust += -8;
				}
				if (player.gender == 3) {
					MainScreen.text("groin, dealing painful damage to your " + player.CockDescriptor.describeMultiCockShort(player) + " and " + player.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ", doubling you over in agony (" + int((player.stats.tou * 2 + 50) / 3) + ")", false);
					game.player.stats.lust += -20;
					player.takeDamage(int((player.maxHP()) / 3));
				}
			}
			//Whip yo legs
			if (temp == 3) {
				MainScreen.text("legs (7)", false);
				player.takeDamage(7);
			}
			//Whip yo arms
			if (temp == 4) {
				MainScreen.text("arms (8)", false);
				player.takeDamage(8);
			}
			//Whip yo neck
			if (temp == 5) {
				MainScreen.text("neck (24)", false);
				player.takeDamage(24);
			}
			MainScreen.text("!", false);
		}
		else {
			MainScreen.text("The succubus flicks her wrist, allowing a whip-like cord to slither out from the palm of her clawed hand.  She cracks the whip experimentally, cackling with glee.", false);
			statusAffects.add(new StatusAffect("WhipReady", 0, 0, 0, 0)));
			str += 20;
			this.weaponName = "whip";
			this.weaponVerb = "brutal whip-crack";
		}
		combatRoundOver();
	}

	public AbstractSuccubus() {
	}

	protected kissAttack(): void {
		//[Kiss of Death Text]
		MainScreen.text("The succubus dances forwards, cocking her elbow back for a vicious strike.", false);
		//avoid!
		if (player.stats.spe > spe && rand(4) == 0 || (player.perks.has("Evade") && rand(4) == 0) || (player.perks.has("Misdirection") && rand(4) == 0 && player.inventory.armor.displayName == "red, high-society bodysuit")) {
			MainScreen.text("  You start to sidestep and realize it's a feint.   Ducking low, you slide under her real attack... a kiss?!  ", false);
			if (player.stats.lust >= 70) MainScreen.text("  Maybe you shouldn't have bothered to move, it might have been fun.", false);
		}
		//get hit
		else {
			MainScreen.text("  You start to dodge to the side, but she shifts direction expertly and plants a wet kiss on your lips.  She spins and dodges away with a ballet dancer's grace, leaving you to wonder what just happened.  ", false);
			if (!player.statusAffects.has("KissOfDeath")) player.statusAffects.add(new StatusAffect("KissOfDeath", 0, 0, 0, 0)));
		}
		combatRoundOver();
	}

	protected seduceAttack(): void {
		let temp: number;
		//determine which method of teasing you use
		temp = rand(3);
		//Butt slap!
		if (temp == 0) {
			MainScreen.text(capitalA + short + " slaps her " + Appearance.buttDescriptionShort(this), false);
			if (buttRating >= 10) {
				MainScreen.text(", making it jiggle delightfully.", false);
				//85% success rate for the jiggly girls
				if (rand(100) <= 95) {
					game.dynStats("lus", rand(buttRating) + 10);
					MainScreen.text("\nThe display is quite arousing.", false);
				}
				else MainScreen.text("\nYou're unimpressed.\n\n", false);
			}
			else {
				MainScreen.text(".", false);
				//50%ish chance of success for the tight butted.
				if (rand(100) <= (70 + buttRating * 2)) {
					game.dynStats("lus", rand(buttRating) + 9);
					MainScreen.text("\nThe display is quite arousing.", false);
				}
				else MainScreen.text("\nYou're unimpressed.\n\n", false);
			}
		}
		//Jiggly-tits
		if (temp == 1 && breastRows[0].breastRating >= 2) {
			//rand(breastRating) + breastRows*BreastperRow
			//Single breast row
			if (breastRows.length == 1) {
				//50+ breastsize% success rate
				MainScreen.text(capitalA + short + " caresses some of her ample chest-flesh before shaking it from side to side enticingly.", false);
				if (lust >= 50) MainScreen.text("  " + pronoun2 + " hard nipples seem to demand your attention.", false);
				if (rand(100) <= (65 + upperBody.chest.BreastRatingLargest[0].breastRating())) {
					game.dynStats("lus", rand(breastRows[0].breastRating) + breastRows.length + 10);
					MainScreen.text("\nThe display is quite arousing.", false);
				}
				else MainScreen.text("\nYou're unimpressed.\n\n", false);
			}
			if (breastRows.length > 1) {
				//50 + 10% per breastRow + breastSize%
				MainScreen.text(capitalA + short + " caresses " + pronoun2 + " some of her rows of ample chest-flesh before shaking it all from side to side enticingly.", false);
				if (lust >= 50) MainScreen.text(", your " + BreastDescriptor.describeNipple(0) + "s painfully visible.", false);
				else MainScreen.text(".", false);
				if (rand(100) <= (54 + (breastRows.length - 1) * 15 + breastRows[0].breastRating)) {
					game.dynStats("lus", rand(breastRows[0].breastRating) + breastRows.length * breastRows[0].breasts + 5);
					MainScreen.text("\nThe display is quite arousing.", false);
				}
				else MainScreen.text("\nYou're unimpressed.\n\n", false);
			}
		}
		//Genetals flash!
		if (temp == 2) {
			MainScreen.text(capitalA + short + " reaches down and strokes her moist lips.  She sighs and licks her fingers clean, giving you a smoldering gaze.", false);
			//Success = 50% + 10% times each cock/vagina
			//rand(vaginas*2 + cocks*2) + wetness and/or length/6
			if (rand(101) <= (65 + vaginas.length * 10 + cocks.length * 10)) {
				game.dynStats("lus", rand(vaginas.length * 2 + cocks.length * 2) + 13);
				MainScreen.text("\nThe display is quite arousing.", false);
			}
			else MainScreen.text("\nYou're unimpressed.\n\n", false);
		}
		combatRoundOver();
	}
}
