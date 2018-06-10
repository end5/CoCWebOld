/**
 * Created by aimozg on 18.01.14.
 */
export class AbstractSuccubus extends Monster {
	protected whipAttack(): void {
		if (statusAffects.has(StatusAffectType.WhipReady)) {
			//Blind dodge change
			if (statusAffects.has(StatusAffectType.Blind)) {
				DisplayText(capitalA + short + " swings her whip at you wildly, totally missing due to her blindness!!");
				combatRoundOver();
				return;
			}
			DisplayText("Grinning deviously, the succubus cracks her whip with expert skill, landing a painful blow on your ");
			let temp: number = randInt(6);
			//Whip yo ass!
			if (temp === 0) {
				DisplayText("ass (4)");
				player.takeDamage(4);
				game.dynStats("lus", 6 + int(player.stats.sens / 20));
			}
			//Whip yo tits!
			if (temp === 1) {
				if (player.torso.chest.count > 0 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating > 0) DisplayText(player.BreastDescriptor.describeAllBreasts(player) + " (9)");
				else DisplayText("chest (9)");
				player.takeDamage(9);
				game.dynStats("lus", 4 + int(player.stats.sens / 15));
			}
			//Whip yo groin
			if (temp === 2) {
				if (player.gender === Gender.NONE) {
					DisplayText("groin (5)");
					player.takeDamage(5);
				}
				if (player.gender === Gender.MALE) {
					DisplayText("groin, dealing painful damage to your " + player.CockDescriptor.describeMultiCockShort(player) + ", doubling you over in agony (" + int((player.stats.tou * 2 + 50) / 4) + ")");
					game.player.stats.lust += -15;
					player.takeDamage(int((player.maxHP()) / 4));
				}
				if (player.gender === Gender.FEMALE) {
					DisplayText("groin, making your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " sting with pain (-10)");
					player.takeDamage(10);
					game.player.stats.lust += -8;
				}
				if (player.gender === Gender.HERM) {
					DisplayText("groin, dealing painful damage to your " + player.CockDescriptor.describeMultiCockShort(player) + " and " + player.VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ", doubling you over in agony (" + int((player.stats.tou * 2 + 50) / 3) + ")");
					game.player.stats.lust += -20;
					player.takeDamage(int((player.maxHP()) / 3));
				}
			}
			//Whip yo legs
			if (temp === 3) {
				DisplayText("legs (7)");
				player.takeDamage(7);
			}
			//Whip yo arms
			if (temp === 4) {
				DisplayText("arms (8)");
				player.takeDamage(8);
			}
			//Whip yo neck
			if (temp === 5) {
				DisplayText("neck (24)");
				player.takeDamage(24);
			}
			DisplayText("!");
		}
		else {
			DisplayText("The succubus flicks her wrist, allowing a whip-like cord to slither out from the palm of her clawed hand.  She cracks the whip experimentally, cackling with glee.");
			statusAffects.add(StatusAffectType.WhipReady, 0, 0, 0, 0);
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
		DisplayText("The succubus dances forwards, cocking her elbow back for a vicious strike.");
		//avoid!
		if (player.stats.spe > spe && randInt(4) === 0 || (player.perks.has(PerkType.Evade) && randInt(4) === 0) || (player.perks.has(PerkType.Misdirection) && randInt(4) === 0 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit")) {
			DisplayText("  You start to sidestep and realize it's a feint.   Ducking low, you slide under her real attack... a kiss?!  ");
			if (player.stats.lust >= 70) DisplayText("  Maybe you shouldn't have bothered to move, it might have been fun.");
		}
		//get hit
		else {
			DisplayText("  You start to dodge to the side, but she shifts direction expertly and plants a wet kiss on your lips.  She spins and dodges away with a ballet dancer's grace, leaving you to wonder what just happened.  ");
			if (!player.statusAffects.has(StatusAffectType.KissOfDeath)) player.statusAffects.add(StatusAffectType.KissOfDeath, 0, 0, 0, 0);
		}
		combatRoundOver();
	}

	protected seduceAttack(): void {
		let temp: number;
		//determine which method of teasing you use
		temp = randInt(3);
		//Butt slap!
		if (temp === 0) {
			DisplayText(capitalA + short + " slaps her " + Appearance.buttDescriptionShort(this));
			if (buttRating >= 10) {
				DisplayText(", making it jiggle delightfully.");
				//85% success rate for the jiggly girls
				if (randInt(100) <= 95) {
					game.dynStats("lus", randInt(buttRating) + 10);
					DisplayText("\nThe display is quite arousing.");
				}
				else DisplayText("\nYou're unimpressed.\n\n");
			}
			else {
				DisplayText(".");
				//50%ish chance of success for the tight butted.
				if (randInt(100) <= (70 + buttRating * 2)) {
					game.dynStats("lus", randInt(buttRating) + 9);
					DisplayText("\nThe display is quite arousing.");
				}
				else DisplayText("\nYou're unimpressed.\n\n");
			}
		}
		//Jiggly-tits
		if (temp === 1 && breastRows[0].rating >= 2) {
			//randInt(rating) + breastRows*BreastperRow
			//Single breast row
			if (breastRows.length === 1) {
				//50+ breastsize% success rate
				DisplayText(capitalA + short + " caresses some of her ample chest-flesh before shaking it from side to side enticingly.");
				if (lust >= 50) DisplayText("  " + pronoun2 + " hard nipples seem to demand your attention.");
				if (randInt(100) <= (65 + upperBody.chest.sort(BreastRow.BreastRatingLargest)[0].rating())) {
					game.dynStats("lus", randInt(breastRows[0].rating) + breastRows.length + 10);
					DisplayText("\nThe display is quite arousing.");
				}
				else DisplayText("\nYou're unimpressed.\n\n");
			}
			if (breastRows.length > 1) {
				//50 + 10% per breastRow + breastSize%
				DisplayText(capitalA + short + " caresses " + pronoun2 + " some of her rows of ample chest-flesh before shaking it all from side to side enticingly.");
				if (lust >= 50) DisplayText(", your " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + "s painfully visible.");
				else DisplayText(".");
				if (randInt(100) <= (54 + (breastRows.length - 1) * 15 + breastRows[0].rating)) {
					game.dynStats("lus", randInt(breastRows[0].rating) + breastRows.length * breastRows[0].breasts + 5);
					DisplayText("\nThe display is quite arousing.");
				}
				else DisplayText("\nYou're unimpressed.\n\n");
			}
		}
		//Genetals flash!
		if (temp === 2) {
			DisplayText(capitalA + short + " reaches down and strokes her moist lips.  She sighs and licks her fingers clean, giving you a smoldering gaze.");
			//Success = 50% + 10% times each cock/vagina
			//randInt(vaginas*2 + cocks*2) + wetness and/or length/6
			if (randInt(101) <= (65 + vaginas.length * 10 + cocks.length * 10)) {
				game.dynStats("lus", randInt(vaginas.length * 2 + cocks.length * 2) + 13);
				DisplayText("\nThe display is quite arousing.");
			}
			else DisplayText("\nYou're unimpressed.\n\n");
		}
		combatRoundOver();
	}
}
