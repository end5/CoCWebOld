/**
 * Created by aimozg on 06.01.14.
 */
export class HighMountains {
	public let basiliskScene:BasiliskScene = new BasiliskScene();
	public let harpyScene:HarpyScene = new HarpyScene();
	public let minervaScene:MinervaScene = new MinervaScene();
	public let minotaurMobScene:MinotaurMobScene = new MinotaurMobScene();
	public let izumiScenes:IzumiScene = new IzumiScene();

	//Explore High Mountain
	public exploreHighMountain() {
		Flags.list[FlagEnum.DISCOVERED_HIGH_MOUNTAIN]++;
		return { next: playerMenu };

		if (kGAMECLASS.d3.discoverD3() === true) {
			return;
		}

		let chooser: number = randInt(4);
		//Boosts mino and hellhound rates!
		if (player.perks.has(PerkType.PiercedFurrite) && randInt(3) === 0) {
			chooser = 1;
		}
		//Helia monogamy fucks
		if (Flags.list[FlagEnum.PC_PROMISED_HEL_MONOGAMY_FUCKS] === 1 && Flags.list[FlagEnum.HEL_RAPED_TODAY] === 0 && randInt(10) === 0 && player.gender > 0 && !kGAMECLASS.helScene.followerHel()) {
			kGAMECLASS.helScene.helSexualAmbush();
			return;
		}
		//Gats xmas adventure!
		if (randInt(5) === 0 && player.gender > 0 && isHolidays() && Flags.list[FlagEnum.GATS_ANGEL_DISABLED] === 0 && Flags.list[FlagEnum.GATS_ANGEL_GOOD_ENDED] === 0 && (Flags.list[FlagEnum.GATS_ANGEL_QUEST_BEGAN] === 0 || player.hasKeyItem("North Star Key") >= 0)) {
			kGAMECLASS.gatsSpectacularRouter();
			return;
		}
		//Minerva
		if (Flags.list[FlagEnum.DISCOVERED_HIGH_MOUNTAIN] % 8 === 0 && Flags.list[FlagEnum.MET_MINERVA] < 4) {
			minervaScene.encounterMinerva();
			return;
		}
		//25% minotaur sons!
		if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00326] >= 3 && randInt(4) === 0 && player.torso.vaginas.count > 0) {
			DisplaySprite(44);
			minotaurMobScene.meetMinotaurSons();
			return;
		}
		//Harpy odds!
		if (player.inventory.items.has(consumables.OVIELIX)) {
			if (player.inventory.items.has(consumables.OVIELIX, 2)) {
				if (randInt(4) === 0) {
					chickenHarpy();
					return;
				}
			}
			else {
				if (randInt(10) === 0) {
					chickenHarpy();
					return;
				}
			}
		}
		//10% chance to mino encounter rate if addicted
		if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] > 0 && randInt(10) === 0) {
			DisplaySprite(44);
			//Cum addictus interruptus!  LOL HARRY POTTERFAG
			//Withdrawl auto-fuck!
			if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] === 3) {
				Game.mountain.minotaurScene.minoAddictionFuck();
				return;
			}
			Game.mountain.minotaurScene.getRapedByMinotaur(true);
			DisplaySprite(44);
			return;
		}
		trace("Chooser goin for" + chooser);

		//Generic harpy
		if (chooser === 0) {
			DisplayText("A harpy wings out of the sky and attacks!", true);
			startCombat(new Harpy());
			DisplaySprite(26);
			return;
		}
		//Basilisk!
		if (chooser === 1) {
			basiliskScene.basiliskGreeting();
			return;
		}
		//Sophie
		if (chooser === 2) {
			if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00282] > 0 || Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00283] > 0 || kGAMECLASS.sophieFollowerScene.sophieFollower()) {
				DisplayText("A harpy wings out of the sky and attacks!", true);
				startCombat(new Harpy());
				DisplaySprite(26);
			}
			else {
				if (Flags.list[FlagEnum.MET_SOPHIE_COUNTER] === 0) kGAMECLASS.sophieScene.meetSophie();
				else kGAMECLASS.sophieScene.meetSophieRepeat();
			}
		}
		if (chooser === 3) {
			this.izumiScenes.encounter();
			return;
		}
	}
	//\"<i>Chicken Harpy</i>\" by Jay Gatsby and not Savin he didn't do ANYTHING
	//Initial Intro
	public chickenHarpy() {
		DisplayText().clear();
		DisplaySprite(90);
		if (Flags.list[FlagEnum.TIMES_MET_CHICKEN_HARPY] === 0) {
			DisplayText("Taking a stroll along the mountains, you come across a peculiar-looking harpy wandering around with a large wooden cart in tow.  She's far shorter and bustier than any regular harpy you've seen before, reaching barely 4' in height but managing to retain some semblance of their thick feminine asses.  In addition to the fluffy white feathers decorating her body, the bird-woman sports about three more combed back upon her forehead like a quiff, vividly red in color.");
			DisplayText("\n\nHaving a long, hard think at the person you're currently making uncomfortable with your observational glare, you've come to a conclusion - she must be a chicken harpy!");
			DisplayText("\n\nAs you take a look inside of the cart you immediately spot a large hoard of eggs stacked clumsily in a pile.  The curious collection of eggs come in many colors and sizes, protected by a sheet of strong canvas to keep it all together.");
			DisplayText("\n\nThe chicken harpy - rather unnerved by the unflattering narration of her appearance you've accidentally shouted out loud - decides to break the ice by telling you about the cart currently holding your interest.");
			DisplayText("\n\n\"<i>Heya traveller, I noticed you were interested in my eggs here - they're not for sale, but perhaps we can come to some sort of agreement?</i>\"");
			DisplayText("\n\nYou put a hand to your chin and nod.  You are travelling, that's correct. The chicken harpy takes the gesture as a sign to continue.");
			DisplayText("\n\n\"<i>Well you see, these eggs don't really grow from trees - in fact, I've gotta chug down at least two or three ovi elixirs to get a good haul with my body, y'know?  Since it's tough for a lil' gal like me to find a few, I like to trade an egg over for some elixirs to those willing to part with them.</i>\"");
			DisplayText("\n\nSounds reasonable enough, you suppose.  Two or three elixirs for an egg? Doable for sure.");
			DisplayText("\n\n\"<i>So whaddya say, do y'have any elixirs you can fork over?</i>\"");
		}
		else {
			//Repeat Intro
			DisplayText("Taking a stroll along the mountains, you come across a familiar-looking shorty wandering around with a large wooden cart in tow.");
			DisplayText("\n\nHaving a long, hard think at the person you're currently making uncomfortable with your observational glare, you've come to a conclusion - she must be the chicken harpy!");
			DisplayText("\n\nYou run towards her as she waves a 'hello', stopping the cart to allow you to catch up.  Giving out her usual spiel about the eggs, she giggles and thrusts out a hand.");
			DisplayText("\n\n\"<i>Hey sunshine, do y'have any elixirs you can give me today?</i>\"");
			//[Give Two][Give Three]	[No, I Must Now Return To My People]
		}
		Flags.list[FlagEnum.TIMES_MET_CHICKEN_HARPY]++;
		//[Give Two][Give Three]		[Not Really, No]
		
		if (player.inventory.items.has(consumables.OVIELIX, 2)) MainScreen.addButton(0, "Give Two", giveTwoOviElix);
		if (player.inventory.items.has(consumables.OVIELIX, 3)) MainScreen.addButton(1, "Give Three", giveThreeOviElix);
		MainScreen.addButton(4, "Leave", leaveChickenx);
	}

	//If Give Two
	public giveTwoOviElix() {
		DisplayText().clear();
		DisplaySprite(90);
		player.inventory.items.consumeItem(consumables.OVIELIX);
		player.inventory.items.consumeItem(consumables.OVIELIX);
		DisplayText("You hand over two elixirs, the harpy more than happy to take them from you.  In return, she unties a corner of the sheet atop the cart, allowing you to take a look at her collection of eggs.");
		//[Black][Blue][Brown][Pink][Purple]
		
		MainScreen.addButton(0, "Black", getHarpyEgg, consumables.BLACKEG);
		MainScreen.addButton(1, "Blue", getHarpyEgg, consumables.BLUEEGG);
		MainScreen.addButton(2, "Brown", getHarpyEgg, consumables.BROWNEG);
		MainScreen.addButton(3, "Pink", getHarpyEgg, consumables.PINKEGG);
		MainScreen.addButton(4, "Purple", getHarpyEgg, consumables.PURPLEG);
		MainScreen.addButton(5, "White", getHarpyEgg, consumables.WHITEEG);
	}

	//If Give Three
	public giveThreeOviElix() {
		DisplayText().clear();
		DisplaySprite(90);
		player.inventory.items.consumeItem(consumables.OVIELIX, 3);
		DisplayText("You hand over three elixirs, the harpy ecstatic over the fact that you're willing to part with them.  In return, she unties a side of the sheet atop the cart, allowing you to take a look at a large collection of her eggs.");
		//[Black][Blue][Brown][Pink][Purple]
		
		MainScreen.addButton(0, "Black", getHarpyEgg, consumables.L_BLKEG);
		MainScreen.addButton(1, "Blue", getHarpyEgg, consumables.L_BLUEG);
		MainScreen.addButton(2, "Brown", getHarpyEgg, consumables.L_BRNEG);
		MainScreen.addButton(3, "Pink", getHarpyEgg, consumables.L_PNKEG);
		MainScreen.addButton(4, "Purple", getHarpyEgg, consumables.L_PRPEG);
		MainScreen.addButton(5, "White", getHarpyEgg, consumables.L_WHTEG);
	}

	//All Text
	public getHarpyEgg(itype: ItemType) {
		DisplayText().clear();
		DisplaySprite(90);
		Flags.list[FlagEnum.EGGS_BOUGHT]++;
		DisplayText("You take " + itype.longName + ", and the harpy nods in regards to your decision.  Prepping her cart back up for the road, she gives you a final wave goodbye before heading back down through the mountains.\n\n");
		inventory.takeItem(itype, chickenHarpy);
	}

	//If No
	public leaveChickenx() {
		DisplayText().clear();
		DisplaySprite(90);
		DisplayText("At the polite decline of her offer, the chicken harpy gives a warm smile before picking her cart back up and continuing along the path through the mountains.");
		DisplayText("\n\nYou decide to take your own path, heading back to camp while you can.");
		return { next: Scenes.camp.returnToCampUseOneHour };
	}
}
}
