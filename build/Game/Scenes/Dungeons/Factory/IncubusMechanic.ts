
export class IncubusMechanic extends Monster {

	public defeated(hpVictory: boolean): void {
		if (Flags.list[FlagEnum.D3_DISCOVERED] === 0) {
			defeatedInDungeon1(hpVictory);
		}
		else {
			defeatedInDungeon3(hpVictory);
		}
	}

	private defeatedInDungeon1(hpVictory: boolean): void {
		DisplayText().clear();
		if (hpVictory)
			DisplayText("You smile in satisfaction as the " + short + " collapses, unable to continue fighting.");
		else DisplayText("You smile in satisfaction as the " + short + " collapses, masturbating happily.");
		if (player.gender === Gender.NONE) {
			DisplayText("  Now would be the perfect opportunity to test his demonic tool...\n\nHow do you want to handle him?");
			game.simpleChoices("Anally", game.incubusVictoryRapeBackdoor, "Orally", game.incubusVictoryService, "", null, "", null, "Leave", game.cleanupAfterCombat);
		}
		else {
			game.player.stats.lust += 1;
			if (hpVictory) {
				DisplayText("  Now would be the perfect opportunity to put his tool to use...\n\nWhat do you do, rape him, service him, or let him take you anally?");
				game.simpleChoices("Rape", game.incubusVictoryRapeSex, "Service Him", game.incubusVictoryService, "Anal", game.incubusVictoryRapeBackdoor, "", null, "Nothing", game.cleanupAfterCombat);
			}
			else {
				DisplayText("  Now would be the perfect opportunity to put his tool to use...\n\nWhat do you do?");
				let titfuck: Function = null;
				if (player.torso.vaginas.count > 0 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 4 && player.inventory.equipment.armor.displayName === "lusty maiden's armor") {
					titfuck = game.createCallBackFunction2((player.armor as LustyMaidensArmor).lustyMaidenPaizuri, player, this);
				}
				game.simpleChoices("Rape", game.incubusVictoryRapeSex, "Service Him", game.incubusVictoryService, "Anal", game.incubusVictoryRapeBackdoor, "B.Titfuck", titfuck, "Nothing", game.cleanupAfterCombat);
			}
		}
	}

	private defeatedInDungeon3(hpVictory: boolean): void {
		game.d3.incubusMechanic.beatDaMechanic(hpVictory);
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (Flags.list[FlagEnum.D3_DISCOVERED] === 0) {
			wonInDungeon1(hpVictory, pcCameWorms);
		}
		else {
			wonInDungeon3(hpVictory, pcCameWorms);
		}
	}

	private wonInDungeon1(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			DisplayText("\n\nYour foe doesn't seem to care...");
			return { next: game.endLustLoss };
		} else {
			game.incubusLossRape();
		}
	}

	private wonInDungeon3(hpVictory: boolean, pcCameWorms: boolean): void {
		game.d3.incubusMechanic.mechanicFuckedYouUp(hpVictory, pcCameWorms);
	}

	private cockTripAttack(): void {
		if (statusAffects.has(StatusAffectType.Blind)) { //Blind dodge change
			DisplayText(capitalA + short + " suddenly grows it's dick to obscene lengths and tries to trip you with it.  Thankfully he's so blind he wasn't aiming anywhere near you!");
			game.combatRoundOver();
			return;
		}
		DisplayText("The incubus lunges forward in a clumsy attack that you start to side-step, only to feel something grip behind your " + game.ButtDescriptor.describeButt(player) + " and pull your " + LegDescriptor.describeLegs(player) + " out from under you.");
		if ((player.stats.spe - 30) > randInt(60)) {
			DisplayText("  You spin as you fall, twisting your " + LegDescriptor.describeLegs(player) + " free and springing back to your " + LowerBodyDescriptor.describeFeet(player) + " unharmed.");
		}
		else { //Fall down go boom
			DisplayText("  You land hard on your ass, momentarily stunned as the demonic cock-tentacle curls around your " + LegDescriptor.describeLegs(player) + ", smearing them with oozing demonic fluids.");
			if (player.stats.lust >= 80 || player.stats.cor >= 80) {
				DisplayText("  Moaning with desire, you lick your lips as you slide your well-lubricated " + LegDescriptor.describeLegs(player) + " free.  You gather a dollop of cum and lick it seductively, winking at the incubus and hoping to make him cave into his desire.");
				game.player.stats.lust += 13;
				player.stats.cor += 1;
			}
			else if (player.stats.lust >= 50 || player.stats.cor >= 50) {
				DisplayText("  Blushing at the scent and feel of cum on your " + LegDescriptor.describeLegs(player) + ", you twist and pull free.  You find yourself wondering what this demon's dick would taste like.");
				game.dynStats("lus", 8 + player.stats.cor / 20);
			}
			else {
				DisplayText("  Disgusted, you pull away from the purplish monstrosity, the act made easier by your well-slimed " + LegDescriptor.describeLegs(player) + ".");
				game.dynStats("lus", 5 + player.stats.cor / 20);
			}
			game.takeDamage(5);
		}
		DisplayText("\nThe incubus gives an overconfident smile as his cock retracts away from you, returning to its normal size.");
		game.combatRoundOver();
	}

	private spoogeAttack(): void {
		if (statusAffects.has(StatusAffectType.Blind)) { //Blind dodge change
			DisplayText(capitalA + short + " pumps and thrusts his hips lewdly before cumming with intense force in your direction!  Thankfully his aim was off due to the blindness currently affect him.");
			game.combatRoundOver();
			return;
		}
		DisplayText("Your demonic foe places his hands behind his head and lewdly pumps and thrusts his hips at you.  Your eyes open wide as a globule of cum erupts from the demon-prick and flies right at you.  ");
		DisplayText("You do your best to dodge, but some still lands on your ");
		switch (randInt(3)) {
			case 0: //Face
				DisplayText("face.  The gooey demon-seed oozes and slides over you with a mind of its own, forcing its way into your mouth and nose!  You can feel it moving around inside you, doing its best to prepare you for its master.");
				game.player.stats.lust += 3;
				if (!player.statusAffects.has(StatusAffectType.DemonSeed))
					player.statusAffects.add(StatusAffectType.DemonSeed, 5, 0, 0, 0);
					else player.statusAffects.get(StatusAffectType.DemonSeed).value1 = 7;
				player.slimeFeed();
				break;
			case 1: //Chest
				if (player.torso.chest.hasFuckableNipples()) {
					DisplayText(BreastDescriptor.describeAllBreasts(player) + ".  The gooey demon-seed oozes and slides over you with a mind of its own, forcing its way into your open nipples.  You can feel it moving around inside you, doing its best to prepare you for its master.");
					game.player.stats.lust += 3;
					if (!player.statusAffects.has(StatusAffectType.DemonSeed))
						player.statusAffects.add(StatusAffectType.DemonSeed, 5, 0, 0, 0);
						else player.statusAffects.get(StatusAffectType.DemonSeed).value1 = 8;
					player.slimeFeed();
				}
				else DisplayText(BreastDescriptor.describeAllBreasts(player) + ".  Thankfully it doesn't seem to have much effect.");
				break;
			default: //Crotch
				if (player.torso.vaginas.count > 0) {
					DisplayText("crotch.  The gooey demon-seed oozes and slides over you with a mind of its own, forcing its way past your " + player.inventory.equipment.armor.displayName + " and into your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + ".  You can feel it moving around inside you, doing its best to prepare you for its master.");
					game.player.stats.lust += 3;
					if (!player.statusAffects.has(StatusAffectType.DemonSeed))
						player.statusAffects.add(StatusAffectType.DemonSeed, 5, 0, 0, 0);
						else player.statusAffects.get(StatusAffectType.DemonSeed).value1 = 8;
					player.slimeFeed();
				}
				else DisplayText("crotch.  Thankfully, it doesn't seem to have much effect.");
		}
		game.combatRoundOver();
		lust -= 10;
		if (lust < 0) lust = 10;
	}

	public IncubusMechanic() {
		this.a = "the ";
		this.short = "incubus mechanic";
		this.imageName = "incubusmechanic";
		this.long = "The demon before you is clad only in cut-off denim overalls.  Covered in stains of oil and other strange fluids, they appear to be in pretty rough shape.  There is a large hole ripped in the crotch, allowing the demon's foot-long member to hang free.  His skin is light purple and perfect, contrasting with the slovenly appearance of his clothing.  His face is rugged and handsome, topped with a simple black ponytail and two large horns that sprout from his forehead like twisted tree-trunks.  He wears a narrow goatee on his chin that is kept skillfully braided.  A cocky smile always seems to grace his features, giving him an air of supreme confidence.";
		// this.plural = false;
		this.createCock(12, 1.75, CockType.DEMON);
		this.balls = 2;
		this.ballSize = 2;
		this.cumMultiplier = 3;
		// this.hoursSinceCum = 0;
		createBreastRow(0);
		this.torso.butt.looseness = ButtLooseness.STRETCHED;
		this.torso.butt.wetness = ButtWetness.SLIME_DROOLING;
		this.tallness = randInt(9) + 70;
		this.torso.hipRating = HipRating.AMPLE;
		this.torso.butt.rating = ButtRating.TIGHT;
		this.torso.hips.legs.type = LegType.DEMONIC_CLAWS;
		this.skin.tone = "light purple";
		this.torso.neck.head.hair.color = "black";
		this.torso.neck.head.hair.length = 12;
		this.baseStats.str = 65;
this.baseStats.tou = 40;
this.baseStats.spe = 45;
this.baseStats.int = 85;
		initLibSensCor(80, 70, 80);
		this.weaponName = "claws";
		this.weaponVerb = "claw";
		this.weaponAttack = 10;
		this.weaponPerk = "";
		this.weaponValue = 150;
		this.armorName = "demonic skin";
		this.armorDef = 10;
		this.bonusHP = 150;
		this.lust = 50;
		this.lustVuln = .5;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 8;
		this.gems = randInt(25) + 10;
		this.drop = new WeightedDrop(consumables.GROPLUS, 1);
		this.special1 = cockTripAttack;
		this.special2 = spoogeAttack;
		this.tailType = TailType.DEMONIC;
		this.wingType = WingType.BAT_LIKE_TINY;
		this.wingDesc = "tiny hidden";
		checkMonster();
	}
}
