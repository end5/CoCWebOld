export default class BeeGirl extends Monster {

	public defeated(hpVictory: boolean): void {
		MainScreen.clearText();
		if (player.gender > 0) {
			if (hpVictory) {
				MainScreen.text("You smile in satisfaction as the " + short + " collapses, unable to continue fighting.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully, and you see an easy way to relieve it..\n\nWhat do you do to her?");
			}
			else {
				MainScreen.text("You smile in satisfaction as the " + short + " spreads her legs and starts frigging her honey-soaked cunt.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully, and you see an easy way to relieve it..\n\nWhat do you do to her?");
			}
			player.stats.lust = 98;
			game.player.stats.lust += 1;
			let dildoRape: Function = (player.hasKeyItem("Deluxe Dildo") >= 0 ? game.forest.beeGirlScene.beeGirlsGetsDildoed : null);
			let milkAndHoney: Function = (player.statusAffects.has("Feeder") ? game.forest.beeGirlScene.milkAndHoneyAreKindaFunny : null);
			game.simpleChoices("Rape", game.forest.beeGirlScene.rapeTheBeeGirl, "Dildo Rape", dildoRape, "", null, "B. Feed", milkAndHoney, "Leave", leaveAfterDefeating);
		}
		else if (player.statusAffects.has("Feeder")) { //Genderless can still breastfeed
			if (hpVictory) {
				MainScreen.text("You smile in satisfaction as the " + short + " collapses, unable to continue fighting.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully.\n\nWhat do you do?");
			}
			else {
				MainScreen.text("You smile in satisfaction as the " + short + " spreads her legs and starts frigging her honey-soaked cunt.  The sweet scent oozing from between her legs is too much to bear, arousing you painfully.\n\nWhat do you do?");
			}
			game.simpleChoices("B. Feed", game.forest.beeGirlScene.milkAndHoneyAreKindaFunny, "", null, "", null, "", null, "Leave", leaveAfterDefeating);
		}
		else {
			game.finishCombat();
		}
	}

	private leaveAfterDefeating(): void {
		if (HP < 1) {
			Flags.list[FlagEnum.BEE_GIRL_COMBAT_WINS_WITHOUT_RAPE]++; //This only happens if you beat her up and then don't rape her
		}
		else {
			Flags.list[FlagEnum.BEE_GIRL_COMBAT_WINS_WITH_RAPE]++; //All wins by lust count towards the desire option, even when you leave
		}
		game.cleanupAfterCombat();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			MainScreen.text("\n\nThe bee-girl goes white and backs away with a disgusted look on her face.\n\n");
			game.cleanupAfterCombat();
		}
		else {
			game.forest.beeGirlScene.beeRapesYou();
		}
	}

	private beeStingAttack(): void {
		//Blind dodge change
		if (statusAffects.has("Blind")) {
			MainScreen.text(capitalA + short + " completely misses you with a blind sting!!");
			combatRoundOver();
			return;
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			if (player.stats.spe - spe < 8) MainScreen.text("You narrowly avoid " + a + short + "'s stinger!");
			if (player.stats.spe - spe >= 8 && player.stats.spe - spe < 20) MainScreen.text("You dodge " + a + short + "'s stinger with superior quickness!");
			if (player.stats.spe - spe >= 20) MainScreen.text("You deftly avoid " + a + short + "'s slow attempts to sting you.");
			combatRoundOver();
			return;
		}
		//determine if avoided with armor.
		if (player.armorDef >= 10 && rand(4) > 0) {
			MainScreen.text("Despite her best efforts, " + a + short + "'s sting attack can't penetrate your armor.");
			combatRoundOver();
			return;
		}
		//Sting successful!  Paralize or lust?
		//Lust 50% of the time
		if (rand(2) == 0) {
			MainScreen.text("Searing pain lances through you as " + a + short + " manages to sting you!  You stagger back a step and nearly trip, flushing hotly.  ");
			MainScreen.text("Oh no!  You've been injected with some kind of aphrodisiac.  You've got to keep focused, you can't think about... fucking... ");
			if (player.gender == 1) MainScreen.text("or dripping honey-slicked cunts beckoning you. ");
			if (player.gender == 2) MainScreen.text("planting your aching sex over her face while you lick her sweet honeypot. ");
			if (player.gender == 3) MainScreen.text("or cocks, tits, and puffy nipples. ");
			game.player.stats.lust += 25;
			if (player.stats.lust > 60) {
				MainScreen.text(" You shake your head and struggle to stay focused,");
				if (player.gender == 1 || player.gender == 3) MainScreen.text(" but it's difficult with the sensitive bulge in your groin.");
				if (player.gender == 2) MainScreen.text(" but can't ignore the soaking wetness in your groin.");
				if (player.stats.sens > 50) MainScreen.text("  The sensitive nubs of your nipples rub tightly under your " + player.inventory.armor.displayName + ".");
			}
			else MainScreen.text(" You shake your head and clear the thoughts from your head, focusing on the task at hand.");
			if (!player.statusAffects.has("lustvenom")) player.statusAffects.add(new StatusAffect("lustvenom", 0, 0, 0, 0)));
		}
		//Paralise the other 50%!
		else {
			MainScreen.text("Searing pain lances through you as " + a + short + " manages to sting you!  You stagger back a step and nearly trip, finding it hard to move yourself.");
			let paralyzeIndex: number = player.findStatusAffect(StatusAffects.ParalyzeVenom);
			if (paralyzeIndex >= 0) {
				player.statusAffect(paralyzeIndex).value1 += 2.9; //v1 - strenght penalty, v2 speed penalty
				player.statusAffect(paralyzeIndex).value2 += 2.9;
				game.player.stats.str += -3;
				player.stats.spe += -3;
				MainScreen.text("  It's getting much harder to move, you're not sure how many more stings like that you can take!");
			}
			else {
				player.statusAffects.add(new StatusAffect("ParalyzeVenom", 2, 2, 0, 0)));
				game.player.stats.str += -2;
				player.stats.spe += -2;
				MainScreen.text("  You've fallen prey to paralyzation venom!  Better end this quick!");
			}
		}
		if (player.stats.lust >= 100)
			doNext(game.endLustLoss);
		else doNext(game.playerMenu);
	}

	public BeeGirl() {
		super();
		this.a = "a ";
		this.short = "bee-girl";
		this.imageName = "beegirl";
		this.long = "A bee-girl buzzes around you, filling the air with intoxicatingly sweet scents and a buzz that gets inside your head.  She has a humanoid face with small antennae, black chitin on her arms and legs that looks like shiny gloves and boots, sizable breasts, and a swollen abdomen tipped with a gleaming stinger.";
		this.createVagina(false, VaginaWetness.SLAVERING, VaginaLooseness.GAPING);
		createBreastRow(Appearance.breastCupInverse("DD"));
		this.lowerBody.butt.analLooseness = ButtLooseness.STRETCHED;
		this.lowerBody.butt.analWetness = ButtWetness.NORMAL;
		this.tallness = rand(14) + 59;
		this.lowerBody.hipRating = HipRating.CURVY + 3;
		this.lowerBody.butt.buttRating = ButtRating.EXPANSIVE;
		this.lowerBody = LowerBodyType.BEE;
		this.skinTone = "yellow";
		this.upperBody.head.hairColor = randomChoice("black", "black and yellow");
		this.upperBody.head.hairLength = 6;
		initStrTouSpeInte(30, 30, 30, 20);
		initLibSensCor(60, 55, 0);
		this.weaponName = "chitin-plated fist";
		this.weaponVerb = "armored punch";
		this.armorName = "chitin";
		this.armorDef = 9;
		this.lust = 20 + rand(40);
		this.lustVuln = 0.9;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 4;
		this.gems = rand(15) + 1;
		this.drop = new WeightedDrop().add(consumables.BEEHONY, 4).addMany(1, consumables.OVIELIX, consumables.W__BOOK, useables.B_CHITN, null);
		this.antennae = AntennaeType.BEE;
		this.wingType = WingType.BEE_LIKE_SMALL;
		this.tailType = TailType.BEE_ABDOMEN;
		this.tailVenom = 100;
		this.special1 = beeStingAttack;
		checkMonster();
	}

}


