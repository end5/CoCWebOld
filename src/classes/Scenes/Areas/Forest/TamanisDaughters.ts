export default class TamanisDaughters extends Goblin {
	private midRoundMadness(): void {
		let selector: number = rand(4);
		if (selector == 0) {
			MainScreen.text("A slender hand reaches inside your " + player.inventory.armor.displayName + " and gives your ", false);
			if (player.lowerBody.balls > 0) {
				if (rand(2) == 0) MainScreen.text(player.CockDescriptor.describeMultiCockShort(player), false);
				else MainScreen.text(player.BallsDescriptor.describeBalls(true, true, player), false);
			}
			else MainScreen.text(player.CockDescriptor.describeMultiCockShort(player), false);
			MainScreen.text(" a gentle squeeze.  You twist away but your breathing gets a little heavier.\n\n", false);
		}
		else if (selector == 1) {
			MainScreen.text("A girl latches onto your " + LowerBodyDescriptor.describeLegs(player) + " and begins caressing your body lovingly, humming happily.  You quickly shake her loose but the attention makes you blush a little more.\n\n", false);
		}
		else if (selector == 2) {
			MainScreen.text("One of your daughters launches onto your back and presses her hard, pierced nipples against your neck.  She whispers in your ear, \"<i>Twist my nipples dad!</i>\"\n\n", false);
			MainScreen.text("You reach back and throw her off, but her perverted taunts still leave you feeling a little hot under the collar.\n\n", false);
		}
		else MainScreen.text("A daughter lays down in front of you and starts jilling herself on the spot.  It's impossible to not glance down and see her or hear her pleasured moans.  You step away to remove the distraction but it definitely causes some discomfort in your " + player.inventory.armor.displayName + ".\n\n", false);
		game.dynStats("lus", 1 + player.stats.lib / 15 + rand(player.stats.cor / 30));
	}

	private tamaniShowsUp(): void {
		if (TamainsDaughtersScene.tamaniPresent) {
			if (rand(4) == 0) goblinDrugAttack(); //Tamani already there - chance of potion
		}
		else if (rand(6) == 0) {
			TamainsDaughtersScene.tamaniPresent = true;
			MainScreen.text("A high-pitched yet familiar voice calls out, \"<i><b>So this is where you skanks ran off to---wait a second.  Are you trying to poach Tamani's man!?</b></i>\"\n\n", false);
			MainScreen.text("You can see Tamani lurking around the rear of the goblin pack, visibly berating her daughters.  On one hand it sounds like she might help you, but knowing goblins, she'll probably forget about her anger and help them subdue you for more cum...\n\n", false);
			//(+5 mob strength)
			str += 5;
			//(+5 mob toughness)
			tou += 5;
			HP += 10;
			//(-20 mob lust)
			lust -= 20;
			//append combat desc
			long += " <b>Tamani lurks in the back of the crowd, curvier than her brood and watching with a mixture of amusement and irritation.  She runs a hand through her pink and black hair, waiting for an opportunity to get involved...</b>";
		}
	}

	override protected performCombatAction(): void {
		let select: number = 1;
		//mid-round madness!
		midRoundMadness();
		tamaniShowsUp();

		if (special1 != null) select++;
		if (special2 != null) select++;
		if (special3 != null) select++;
		switch (rand(select)) {
			case 0:
				statusAffects.add(new StatusAffect("Attacks", int(Flags.list[FlagEnum.TAMANI_NUMBER_OF_DAUGHTERS] / 20))), 0, 0, 0); //Tamani's Daughters get multiattacks!
				eAttack();
				break;
			case 1:
				special1();
				break;
			case 2:
				special2();
				break;
			default:
				special3();
				break;
		}
		combatRoundOver();
	}

	public defeated(hpVictory: boolean): void {
		game.forest.tamaniDaughtersScene.combatWinAgainstDaughters();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			MainScreen.text("\n\nYour foes seem visibly disgusted and leave, telling you to, \"<i>quit being so fucking gross...</i>\"");
			game.cleanupAfterCombat();
		} else {
			game.forest.tamaniDaughtersScene.loseToDaughters();
		}
	}

	public TamanisDaughters() {
		super(true);
		this.a = "the group of ";
		this.short = "Tamani's daughters";
		this.imageName = "tamanisdaughters";
		this.long = "A large grouping of goblin girls has gathered around you, surrounding you on all sides.  Most have varying shades of green skin, though a few have yellowish or light blue casts to their skin.  All are barely clothed, exposing as much of their flesh as possible in order to excite a potential mate.  Their hairstyles are as varied as their clothing and skin-tones, and the only things they seem to have in common are cute faces and curvy forms.  It looks like they want something from you.";
		this.plural = true;
		this.pronoun1 = "they";
		this.pronoun2 = "them";
		this.pronoun3 = "their";
		this.createVagina(false, VaginaWetness.DROOLING, VaginaLooseness.TIGHT);
		this.statusAffects.add(new StatusAffect("BonusVCapacity", 40, 0, 0, 0)));
		createBreastRow(Appearance.breastCupInverse("D"));
		this.lowerBody.butt.analLooseness = ButtLooseness.TIGHT;
		this.lowerBody.butt.analWetness = ButtWetness.DRY;
		this.statusAffects.add(new StatusAffect("BonusACapacity", 25, 0, 0, 0)));
		this.tallness = 40;
		this.lowerBody.hipRating = HipRating.AMPLE + 1;
		this.lowerBody.butt.buttRating = ButtRating.NOTICEABLE + 1;
		this.skinTone = "greenish gray";
		this.upperBody.head.hairColor = "pink";
		this.upperBody.head.hairLength = 16;
		initStrTouSpeInte(55, 30, 45, 50);
		initLibSensCor(70, 70, 50);
		this.weaponName = "fists";
		this.weaponVerb = "tiny punch";
		this.armorName = "leather straps";
		this.bonusHP = 50 + (int(Flags.list[FlagEnum.TAMANI_NUMBER_OF_DAUGHTERS] / 2) * 15);
		this.lust = 30;
		this.lustVuln = .65;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 8 + (Math.floor(Flags.list[FlagEnum.TAMANI_NUMBER_OF_DAUGHTERS] / 20));
		this.gems = rand(15) + 5;
		this.drop = new WeightedDrop().
			add(consumables.GOB_ALE, 5).
			addMany(1, consumables.L_DRAFT,
			consumables.PINKDYE,
			consumables.BLUEDYE,
			consumables.ORANGDY,
			consumables.PURPDYE);
		this.special1 = goblinDrugAttack;
		this.special2 = goblinTeaseAttack;
		checkMonster();
	}

}

