import Character from "./Character";

export default class CharCreation extends BaseContent {
		
	private customPlayerProfile:Function;
			
	public newGamePlus():void {
		flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] = player.XP;
		if (flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] == 0) flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] = 1;
		while (player.level > 1) {
			flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] += player.level * 100;
			player.level--;
		}
		flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS] = player.stats.gems;
		newGameGo();
	}
		
	public newGameGo():void {
		funcs = [];
		args = [];
		mainView.eventTestInput.x = -10207.5;
		mainView.eventTestInput.y = -1055.1;
		hideStats();
		hideUpDown();
		mainView.nameBox.visible = true;
		mainView.nameBox.width = 165;
		mainView.hideMenuButton( MainView.MENU_NEW_MAIN );
		mainView.hideMenuButton( MainView.MENU_DATA );
		mainView.hideMenuButton( MainView.MENU_LEVEL );
		mainView.hideMenuButton( MainView.MENU_PERKS );
		//Hide perk boxes
		mainView.aCb.visible = false;
		//If first PC, track status of EZ mode and other such nonsense.
		let silly:boolean = flags[FlagEnum.SILLY_MODE_ENABLE_FLAG];
		let easy:boolean = flags[FlagEnum.EASY_MODE_ENABLE_FLAG];
		let sprite:boolean = flags[FlagEnum.SHOW_SPRITES_FLAG];
		mainView.setButtonText(0, "Newgame"); // b1Text.text = "Newgame";
		//flags[FlagEnum.CUSTOM_PC_ENABLED] = 0;
			
		clearOutput();
		Render.text("You grew up in the small village of Ingnam, a remote village with rich traditions, buried deep in the wilds.  Every year for as long as you can remember, your village has chosen a champion to send to the cursed Demon Realm.  Legend has it that in years Ingnam has failed to produce a champion, chaos has reigned over the countryside.  Children disappear, crops wilt, and disease spreads like wildfire.  This year, <b>you</b> have been selected to be the champion.\n\nWhat is your name?");
		
		/*CODE FROM CMACLOAD HERE
		Multiple line case. A text field GeneralTextField, positioning a movieclip AskQuestions below it
		GeneralTextField.wordWrap = true;
		GeneralTextField.autoSize = true;
		GeneralTextField.htmlText = &quot;whatevevr.......&quot;;
		AskQuestions._x = GeneralTextField._x;
		AskQuestions._y = GeneralTextField._y + 3 + GeneralTextField._height;
		again replace _x, _y, _width with x, y, width*/
		//mainView.mainText.autoSize = true;
		
		//mainView.mainText.autoSize = TextFieldAutoSize.LEFT;
		menu();
		addButton(0, "OK", chooseName);
	//	simpleChoices("OK",10034,"",0,"",0,"",0,"",0);
		mainView.nameBox.x = mainView.mainText.x + 5;
		mainView.nameBox.y = mainView.mainText.y + 3 + mainView.mainText.textHeight;
		
		//OLD
		//mainView.nameBox.x = 510;
		//mainView.nameBox.y = 265;
		mainView.nameBox.text = "";
		
		//Reset autosave
		player.slotName = "VOID";
		player.autoSave = false;
		//RESET DUNGEOn
//No need, dungeonLoc = 0 does this:			kGAMECLASS.inDungeon = false;
		kGAMECLASS.dungeonLoc = 0;
		kGAMECLASS.inRoomedDungeon = false;
		kGAMECLASS.inRoomedDungeonResume = null;
		//Hold onto old data for NG+
		let oldPlayer:Player = player;
		//Reset all standard stats
		let player = new Player();
		model.player = player;
		player.str = 15;
		player.tou = 15;
		player.stats.spe = 15;
		player.stats.int = 15;
		player.stats.sens = 15;
		player.stats.lib = 15;
		player.stats.cor = 0;
		player.lust = 15;
			
		kGAMECLASS.notes = "No Notes Available.";
		player.XP = flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP];
		player.level = 1;
		player.HP = player.maxHP();
		player.stats.gems = flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS];
		player.skinType = SKIN.PLAIN;
		player.faceType = FACE.HUMAN;
		player.tailType = TAIL.NONE;
		player.tongueType = TONUGE.HUMAN;
		player.beardLength = 0;
		player.beardStyle = 0;
		player.skinDesc = "skin";
		player.cumMultiplier = 1;
		player.hoursSinceCum = 0;
		player.ass.analLooseness = ANAL_LOOSENESS.VIRGIN;
		player.ass.analWetness = ANAL_WETNESS.DRY;
		player.ass.fullness = 0;
		player.fatigue = 0;
		player.horns = 0;
		player.lowerBody.tailVenom = 0;
		player.lowerBody.tailRecharge = 0;
		player.upperBody.wingType = WING.NONE;
		player.upperBody.wingDesc = "non-existant";
		//Exploration
		player.explored = 0;
		player.exploredForest = 0;
		player.exploredDesert = 0;
		player.exploredMountain = 0;
		player.exploredLake = 0;
		//Inventory clear
		player.itemSlot1.unlocked = true;
		player.itemSlot1.emptySlot();
		player.itemSlot2.unlocked = true;
		player.itemSlot2.emptySlot();
		player.itemSlot3.unlocked = true;
		player.itemSlot3.emptySlot();
		player.itemSlot4.unlocked = false;
		player.itemSlot4.emptySlot();
		player.itemSlot5.unlocked = false;
		player.itemSlot5.emptySlot();
		//PIERCINGS
		player.nipplesPierced = 0;
		player.nipplesPShort = "";
		player.nipplesPLong = "";
		player.lipPierced = 0;
		player.lipPShort = "";
		player.lipPLong = "";
		player.tonguePierced = 0;
		player.tonguePShort = "";
		player.tonguePLong = "";
		player.eyebrowPierced = 0;
		player.eyebrowPShort = "";
		player.eyebrowPLong = "";
		player.earsPierced = 0;
		player.earsPShort = "";
		player.earsPLong = "";
		player.nosePierced = 0;
		player.nosePShort = "";
		player.nosePLong = "";
		//PLOTZ
		kGAMECLASS.monk = 0;
		kGAMECLASS.whitney = 0;
		kGAMECLASS.sand = 0;
	//Replaced by flag	kGAMECLASS.beeProgress = 0;
		kGAMECLASS.giacomo = 0;
		//Lets get this bitch started
		kGAMECLASS.inCombat = false;
		//NG+ Clothes reset
		if (flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS] != 0) 
		{
			//Clear Raphael's training variable so it does not effect
			//Weapon strength post-newgame.
			flags[FlagEnum.RAPHAEL_RAPIER_TRANING] = 0;
				
			if (!(oldPlayer.armor is GooArmor))
			{
				player.setArmor(oldPlayer.armor);
			}
			else
			{
				player.setArmor(armors.C_CLOTH);
			}
					
			player.setWeapon(oldPlayer.weapon);
		}
		//Clothes clear
		else {
			player.setArmor(armors.C_CLOTH);
			player.setWeapon(WeaponLib.FISTS);
		}
		//Clear plot storage array!
		flags = new DefaultDict();
		
		//Remember silly/sprite/etc
		if (sprite) flags[FlagEnum.SHOW_SPRITES_FLAG] = 1;
		if (easy) flags[FlagEnum.EASY_MODE_ENABLE_FLAG] = 1;
		if (silly) flags[FlagEnum.SILLY_MODE_ENABLE_FLAG] = 1;
		//Set that jojo debug doesn't need to run
		flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00102] = 1;
		flags[FlagEnum.UNKNOWN_FLAG_NUMBER_02999] = 3;
		//Time reset
		model.time.days = 0;
		model.time.hours = 0;
		//Clear cocks
		while (player.lowerBody.cockSpot.count() > 0) {
			player.lowerBody.cockSpot.remove(0, 1);
			trace("1 cock purged.");
		}
		//Clear vaginas
		while (player.lowerBody.vaginaSpot.count() > 0) {
			player.removeVagina(0, 1);
			trace("1 vagina purged.");
		}
		//Clear breasts
		player.breastRows = [];
			
		//Clear Statuses
		while (player.statusAffects.length > 0) {
			player.removeStatuses();
		}
		//Clear old camp slots
		inventory.clearStorage();
		inventory.clearGearStorage();
		//Initialize gearStorage
		inventory.initializeGearStorage();
	}
		
	private chooseName():void {
		if (kGAMECLASS.testingBlockExiting) {
			// We're running under the testing script.
			// Stuff a name in the box and go go go
			mainView.nameBox.text = "Derpy";
			return;
		}
		if (mainView.nameBox.text == "") {
			//If part of newgame+, don't fully wipe.
			if (player.XP > 0 && player.explored == 0) {
				flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] = player.XP;
				if (flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] == 0) flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] = 1;
				while (player.level > 1) {
					flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] += player.level * 100;
					player.level--;
				}
				flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS] = player.stats.gems;
			}
			newGameGo();
			Render.text("\n\n\n<b>You must select a name.</b>");
			return;
		}
		clearOutput();
		mainView.nameBox.visible = false;
		player.short = mainView.nameBox.text;
		customPlayerProfile = customName(mainView.nameBox.text);
		menu();
		if (customPlayerProfile != null) {
			Render.text("This name, like you, is special.  Do you live up to your name or continue on, assuming it to be coincidence?");
			addButton(0, "SpecialName", useCustomProfile);
			addButton(1, "Continue On", noCustomProfile);
		}
		else { //Proceed with normal character creation
			Render.text("\n\n\n\nAre you a man or a woman?");
			addButton(0, "Man", isAMan);
			addButton(1, "Woman", isAWoman);
		}
	}
		
	private useCustomProfile():void {
		clearOutput();
		if (specialName(mainView.nameBox.text) != null) {
			clearOutput();
			Render.text("Your name defines everything about you, and as such, it is time to wake...\n\n");
			flags[FlagEnum.HISTORY_PERK_SELECTED] = 1;
			completeCharacterCreation(); //Skip character creation, customPlayerProfile will be called in completeCharacterCreation
		}
		else {
			//After character creation the fact that customPlayerProfile is not null will activate a custom player setup 
			Render.text("There is something different about you, but first, what is your basic gender?  An individual such as you may later overcome this, of course...");
			Render.text("\n\n\n\nAre you a man or a woman?");
			menu();
			addButton(0, "Man", isAMan);
			addButton(1, "Woman", isAWoman);
		}
	}
		
	private noCustomProfile():void {
		clearOutput();
		customPlayerProfile = null;
		Render.text("Your name carries little significance beyond it being your name.  What is your gender?");
		menu();
		addButton(0, "Man", isAMan);
		addButton(1, "Woman", isAWoman);
	}
		
	//Determines if has character creation bonuses
	private customName(arg:string):{
		switch(arg) {
			case "Aria":	return customAria;
			case "Betram":	return customBetram;
			case "Charaun":	return customCharaun;
			case "Cody":	return customCody;
			case "Galatea":	return customGalatea;
			case "Gundam":	return customGundam;
			case "Hikari":	return customHikari;
			case "Katti":	return customKatti;
			case "Lucina":	return customLucina;
			case "Navorn":	return customNavorn;
			case "Rope":	return customRope;
			case "Sora":	return customSora;
			default:
		}
		return specialName(arg); //Must check against the special name list as well
	}
		
	//Does PC skip creation?
	private specialName(arg: string): Character {
		switch(arg) {
			case "Annetta":		return customAnnetta;
			case "Ceveo":		return customCeveo;
			case "Charlie":		return customCharlie;
			case "Isaac":		return customIsaac;
			case "Leah":		return customLeah;
			case "Lukaz":		return customLukaz;
			case "Mara":		return customMara;
			case "Mihari":		return customMihari;
			case "Mirvanna":	return customMirvanna;
			case "Nami":		return customNami;
			case "Nixi":		return customNixi;
			case "Prismere":	return customPrismere;
			case "Rann Rayla":	return customRannRayla;
			case "Sera":		return customSera;
			case "Siveen":		return customSiveen;
			case "TestChar":	return customTestChar;
			case "Tyriana":		return customTyriana;
			case "Vahdunbrii":	return customVahdunbrii;
			default:
		}
		return null;
	}
		
	private isAMan():void {
		player.str += 3;
		player.tou += 2;
			
		player.lowerBody.balls = 2;
		player.lowerBody.ballSize = 1;
		player.lowerBody.vaginaSpot.list[0].clitLength = 0;
		player.fertility = 5;
		player.hairLength = 1;
		player.tallness = 71;
		player.tone = 60;
			
		player.createBreastRow();
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.list[0].cockLength = 5.5;
		player.lowerBody.cockSpot.list[0].cockThickness = 1;
		player.lowerBody.cockSpot.list[0].cockType = CockType.HUMAN;
		player.lowerBody.cockSpot.list[0].knotMultiplier = 1;
		player.gender = GENDER.MALE;
		clearOutput();
		Render.text("You are a man.  Your upbringing has provided you an advantage in strength and toughness.\n\nWhat type of build do you have?");
		simpleChoices("Lean", buildLeanMale, "Average", buildAverageMale, "Thick", buildThickMale, "Girly", buildGirlyMale, "", null);
	}

	private isAWoman():void {
		player.stats.spe += 3;
		player.stats.int += 2;
			
		player.lowerBody.balls = 0;
		player.lowerBody.ballSize = 0;
		player.lowerBody.vaginaSpot.list[0].clitLength = 0.5;
		player.fertility = 10;
		player.hairLength = 10;
		player.tallness = 67;
		player.tone = 30;
			
		player.createBreastRow();
		player.createVagina();
		player.gender = GENDER.FEMALE;
		clearOutput();
		Render.text("You are a woman.  Your upbringing has provided you an advantage in speed and intellect.\n\nWhat type of build do you have?");
		simpleChoices("Slender", buildSlenderFemale, "Average", buildAverageFemale, "Curvy", buildCurvyFemale, "Tomboyish", buildTomboyishFemale, "", null);
	}

	private buildLeanMale():void {
		player.str -= 1;
		player.stats.spe += 1;
			
		player.femininity = 34;
		player.thickness = 30;
		player.tone += 5;
			
		player.upperBody.chest.list[0].breastRating = BREAST_CUP.FLAT;
		player.lowerBody.butt.buttRating = BUTT_RATING.TIGHT;
		player.lowerBody.hipRating = HIP_RATING.SLENDER;
		chooseComplexion();
	}

	private buildSlenderFemale():void {
		player.str -= 1;
		player.stats.spe += 1;
			
		player.femininity = 66;
		player.thickness = 30;
		player.tone += 5;
			
		player.upperBody.chest.list[0].breastRating = BREAST_CUP.B;
		player.lowerBody.butt.buttRating = BUTT_RATING.TIGHT;
		player.lowerBody.hipRating = HIP_RATING.AMPLE;
		chooseComplexion();
	}

	private buildAverageMale():void {
		player.femininity = 30;
		player.thickness = 50;
			
		player.upperBody.chest.list[0].breastRating = BREAST_CUP.FLAT;
		player.lowerBody.butt.buttRating = BUTT_RATING.AVERAGE;
		player.lowerBody.hipRating = HIP_RATING.AVERAGE;
		chooseComplexion();
	}

	private buildAverageFemale():void {
		player.femininity = 70;
		player.thickness = 50;
			
		player.upperBody.chest.list[0].breastRating = BREAST_CUP.C;
		player.lowerBody.butt.buttRating = BUTT_RATING.NOTICEABLE;
		player.lowerBody.hipRating = HIP_RATING.AMPLE;
		chooseComplexion();
	}

	private buildThickMale():void {
		player.stats.spe -= 4;
		player.str += 2;
		player.tou += 2;
			
		player.femininity = 29;
		player.thickness = 70;
		player.tone -= 5;
			
		player.upperBody.chest.list[0].breastRating = BREAST_CUP.FLAT;
		player.lowerBody.butt.buttRating = BUTT_RATING.NOTICEABLE;
		player.lowerBody.hipRating = HIP_RATING.AVERAGE;
		chooseComplexion();
	}

	private buildCurvyFemale():void {
		player.stats.spe -= 2;
		player.str += 1;
		player.tou += 1;
			
		player.femininity = 71;
		player.thickness = 70;
			
		player.upperBody.chest.list[0].breastRating = BREAST_CUP.D;
		player.lowerBody.butt.buttRating = BUTT_RATING.LARGE;
		player.lowerBody.hipRating = HIP_RATING.CURVY;
		chooseComplexion();
	}

	private buildGirlyMale():void {
		player.str -= 2;
		player.stats.spe += 2;
			
		player.femininity = 50;
		player.thickness = 50;
		player.tone = 26;
			
		player.upperBody.chest.list[0].breastRating = BREAST_CUP.A;
		player.lowerBody.butt.buttRating = BUTT_RATING.NOTICEABLE;
		player.lowerBody.hipRating = HIP_RATING.SLENDER;
		chooseComplexion();
	}

	private buildTomboyishFemale():void {
		player.str += 1;
		player.stats.spe -= 1;
			
		player.femininity = 56;
		player.thickness = 50;
		player.tone = 50;
			
		player.upperBody.chest.list[0].breastRating = BREAST_CUP.A;
		player.lowerBody.butt.buttRating = BUTT_RATING.TIGHT;
		player.lowerBody.hipRating = HIP_RATING.SLENDER;
		chooseComplexion();
	}

	private chooseComplexion():void {
		clearOutput();
		Render.text("What is your complexion?");
		menu();
		addButton(0, "Light", setComplexion, "light");
		addButton(1, "Olive", setComplexion, "olive");
		addButton(2, "Dark", setComplexion, "dark");
		addButton(3, "Ebony", setComplexion, "ebony");
	}

	private setComplexion(choice:string):void { //And choose hair
		player.skinTone = choice;
		clearOutput();
		Render.text("You selected a " + choice + " complexion.\n\nWhat color is your hair?");
		menu();
		addButton(0, "Blonde", setHair, "blonde");
		addButton(1, "Brown", setHair, "brown");
		addButton(2, "Black", setHair, "black");
		addButton(3, "Red", setHair, "red");
		addButton(4, "Gray", setHair, "gray");
		addButton(5, "White", setHair, "white");
		addButton(6, "Auburn", setHair, "auburn");
	}

	private setHair(choice:string):void {
		player.hairColor = choice;
		clearOutput();
		Render.text("You have " + hairDescript() + ".");
		chooseEndowment(false);
	}

	private chooseEndowment(clear:boolean):void {
		if (clear) clearOutput();
		Render.text("Every person is born with a gift.  What's yours?");
		menu();
		addButton(0, "Strength", confirmEndowmentStrength);
		addButton(1, "Toughness", confirmEndowmentThoughness);
		addButton(2, "Speed", confirmEndowmentSpeed);
		addButton(3, "Smarts", confirmEndowmentSmarts);
		addButton(4, "Libido", confirmEndowmentLibido);
		addButton(5, "Touch", confirmEndowmentTouch);
		if (player.lowerBody.cockSpot.hasCock()) {
			addButton(6, "Big Cock", confirmEndowmentBigCock);
			addButton(7, "Lots of Jizz", confirmEndowmentMessyOrgasms);
		}
		else {
			addButton(6, "Big Breasts", confirmEndowmentBigBreasts);
			addButton(7, "Big Clit", confirmEndowmentBigClit);
			addButton(8, "Fertile", confirmEndowmentFertile);
			addButton(9, "Wet Vagina", confirmEndowmentWetVagina);
		}
	}

	private confirmEndowmentStrength():void {
		clearOutput();
		Render.text("Are you stronger than normal? (+5 Strength)\n\nStrength increases your combat damage, and your ability to hold on to an enemy or pull yourself away.");
		menu();
		addButton(0, "Yes", setEndowmentStrength);
		addButton(1, "No", chooseEndowment, true);
	}

	private confirmEndowmentThoughness():void {
		clearOutput();
		Render.text("Are you unusually tough? (+5 Toughness)\n\nToughness gives you more HP and increases the chances an attack against you will fail to wound you.");
		menu();
		addButton(0, "Yes", setEndowmentToughness);
		addButton(1, "No", chooseEndowment, true);
	}

	private confirmEndowmentSpeed():void {
		clearOutput();
		Render.text("Are you very quick?  (+5 Speed)\n\nSpeed makes it easier to escape combat and grapples.  It also boosts your chances of evading an enemy attack and successfully catching up to enemies who try to run.");
		menu();
		addButton(0, "Yes", setEndowmentSpeed);
		addButton(1, "No", chooseEndowment, true);
	}

	private confirmEndowmentSmarts():void {
		clearOutput();
		Render.text("Are you a quick learner?  (+5 Intellect)\n\nIntellect can help you avoid dangerous monsters or work with machinery.  It will also boost the power of any spells you may learn in your travels.");
		menu();
		addButton(0, "Yes", setEndowmentSmarts);
		addButton(1, "No", chooseEndowment, true);
	}

	private confirmEndowmentLibido():void {
		clearOutput();
		Render.text("Do you have an unusually high sex-drive?  (+5 Libido)\n\nLibido affects how quickly your lust builds over time.  You may find a high libido to be more trouble than it's worth...");
		menu();
		addButton(0, "Yes", setEndowmentLibido);
		addButton(1, "No", chooseEndowment, true);
	}

	private confirmEndowmentTouch():void {
		clearOutput();
		Render.text("Is your skin unusually sensitive?  (+5 Sensitivity)\n\nSensitivity affects how easily touches and certain magics will raise your lust.  Very low sensitivity will make it difficult to orgasm.");
		menu();
		addButton(0, "Yes", setEndowmentTouch);
		addButton(1, "No", chooseEndowment, true);
	}

	private confirmEndowmentBigCock():void {
		clearOutput();
		Render.text("Do you have a big cock?  (+2\" Cock Length)\n\nA bigger cock will make it easier to get off any sexual partners, but only if they can take your size.");
		menu();
		addButton(0, "Yes", setEndowmentBigCock);
		addButton(1, "No", chooseEndowment, true);
	}

	private confirmEndowmentMessyOrgasms():void {
		clearOutput();
		Render.text("Are your orgasms particularly messy?  (+50% Cum Multiplier)\n\nA higher cum multiplier will cause your orgasms to be messier.");
		menu();
		addButton(0, "Yes", setEndowmentMessyOrgasms);
		addButton(1, "No", chooseEndowment, true);
	}

	private confirmEndowmentBigBreasts():void {
		clearOutput();
		Render.text("Are your breasts bigger than average? (DD cups)\n\nLarger breasts will allow you to lactate greater amounts, tit-fuck larger cocks, and generally be a sexy bitch.");
		menu();
		addButton(0, "Yes", setEndowmentBigBreasts);
		addButton(1, "No", chooseEndowment, true);
	}

	private confirmEndowmentBigClit():void {
		clearOutput();
		Render.text("Do you have a big clit?  (1\" Long)\n\nA large enough clit may eventually become as large as a cock.  It also makes you gain lust much faster during oral or manual stimulation.");
		menu();
		addButton(0, "Yes", setEndowmentBigClit);
		addButton(1, "No", chooseEndowment, true);
	}

	private confirmEndowmentFertile():void {
		clearOutput();
		Render.text("Is your family particularly fertile?  (+15% Fertility)\n\nA high fertility will cause you to become pregnant much more easily.  Pregnancy may result in: Strange children, larger bust, larger hips, a bigger ass, and other weirdness.");
		menu();
		addButton(0, "Yes", setEndowmentFertile);
		addButton(1, "No", chooseEndowment, true);
	}

	private confirmEndowmentWetVagina():void {
		clearOutput();
		Render.text("Does your pussy get particularly wet?  (+1 Vaginal Wetness)\n\nVaginal wetness will make it easier to take larger cocks, in turn helping you bring the well-endowed to orgasm quicker.");
		menu();
		addButton(0, "Yes", setEndowmentWetVagina);
		addButton(1, "No", chooseEndowment, true);
	}

	private setEndowmentStrength():void {
		player.str += 5;
		player.tone += 7;
		player.thickness += 3;
		//Add bonus +25% strength gain
		player.createPerk(PerkLib.Strong, 0.25, 0, 0, 0);
		chooseHistory();
	}
		
	private setEndowmentToughness():void {
		player.tou += 5;
		player.tone += 5;
		player.thickness += 5;
		player.createPerk(PerkLib.Tough, 0.25, 0, 0, 0);
		player.HP = kGAMECLASS.maxHP();
		chooseHistory();
	}
		
	private setEndowmentSpeed():void {
		player.stats.spe += 5;
		player.tone += 10;
		player.createPerk(PerkLib.Fast, 0.25, 0, 0, 0);
		chooseHistory();
	}
		
	private setEndowmentSmarts():void {
		player.stats.int += 5;
		player.thickness -= 5;
		player.createPerk(PerkLib.Smart, 0.25, 0, 0, 0);
		chooseHistory();
	}
		
	private setEndowmentLibido():void {
		player.stats.lib += 5;
		player.createPerk(PerkLib.Lusty, 0.25, 0, 0, 0);
		chooseHistory();
	}
		
	private setEndowmentTouch():void {
		player.stats.sens += 5;
		player.createPerk(PerkLib.Sensitive, 0.25, 0, 0, 0);
		chooseHistory();
	}
		
	private setEndowmentBigCock():void {
		player.femininity -= 5;
		player.lowerBody.cockSpot.list[0].cockLength = 8;
		player.lowerBody.cockSpot.list[0].cockThickness = 1.5;
		trace("Creation - cock modded to 8inches");
		player.createPerk(PerkLib.BigCock, 1.25, 0, 0, 0);
		chooseHistory();
	}
		
	private setEndowmentMessyOrgasms():void {
		player.femininity -= 2;
		player.cumMultiplier = 1.5;
		player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
		chooseHistory();
	}
		
	private setEndowmentBigBreasts():void {
		player.femininity += 5;
		player.upperBody.chest.list[0].breastRating += 2;
		player.createPerk(PerkLib.BigTits, 1.5, 0, 0, 0);
		chooseHistory();
	}
		
	private setEndowmentBigClit():void {
		player.femininity -= 5;
		player.lowerBody.vaginaSpot.list[0].clitLength = 1;
		player.createPerk(PerkLib.BigClit, 1.25, 0, 0, 0);
		chooseHistory();
	}
		
	private setEndowmentFertile():void {
		player.femininity += 5;
		player.fertility += 25;
		player.lowerBody.hipRating += 2;
		player.createPerk(PerkLib.Fertile, 1.5, 0, 0, 0);
		chooseHistory();
	}
		
	private setEndowmentWetVagina():void {
		player.femininity += 7;
		player.vaginas[0].vaginalWetness = VAGINA_WETNESS.WET;
		player.createPerk(PerkLib.WetPussy, 2, 0, 0, 0);
		chooseHistory();
	}
		
	public chooseHistory():void {
		clearOutput();
		if (flags[FlagEnum.HISTORY_PERK_SELECTED] != 0) { //This flag can only be non-zero if chooseHistory is called from camp.as
			Render.text("<b>New history perks are available during creation.  Since this character was created before they were available, you may choose one now!</b>\n\n");
		}
		Render.text("Before you became a champion, you had other plans for your life.  What were you doing before?");
		menu();
		addButton(0, "Alchemy", confirmHistory, PerkLib.HistoryAlchemist);
		addButton(1, "Fighting", confirmHistory, PerkLib.HistoryFighter);
		addButton(2, "Healing", confirmHistory, PerkLib.HistoryHealer);
		addButton(3, "Religion", confirmHistory, PerkLib.HistoryReligious);
		addButton(4, "Schooling", confirmHistory, PerkLib.HistoryScholar);
		addButton(5, "Slacking", confirmHistory, PerkLib.HistorySlacker);
		addButton(6, "Slutting", confirmHistory, PerkLib.HistorySlut);
		addButton(7, "Smithing", confirmHistory, PerkLib.HistorySmith);
		addButton(8, "Whoring", confirmHistory, PerkLib.HistoryWhore);
	}
		
	private confirmHistory(choice:PerkType):void {
		clearOutput();
		switch (choice) {
			case PerkLib.HistoryAlchemist:
				Render.text("You spent some time as an alchemist's assistant, and alchemical items always seem to be more reactive in your hands.  Is this your history?");
				break;
			case PerkLib.HistoryFighter:
				Render.text("You spent much of your time fighting other children, and you had plans to find work as a guard when you grew up.  You do 10% more damage with physical attacks.  Is this your history?");
				break;
			case PerkLib.HistoryHealer:
				Render.text("You often spent your free time with the village healer, learning how to tend to wounds.  Healing items and effects are 20% more effective.  Is this your history?");
				break;
			case PerkLib.HistoryReligious:
				Render.text("You spent a lot of time at the village temple, and learned how to meditate.  The 'masturbation' option is replaced with 'meditate' when corruption is at or below 66.  Is this your history?");
				break;
			case PerkLib.HistoryScholar:
				Render.text("You spent much of your time in school, and even begged the richest man in town, Mr. Savin, to let you read some of his books.  You are much better at focusing, and spellcasting uses 20% less fatigue.  Is this your history?");
				break;
			case PerkLib.HistorySlacker:
				Render.text("You spent a lot of time slacking, avoiding work, and otherwise making a nuisance of yourself.  Your efforts at slacking have made you quite adept at resting, and your fatigue comes back 20% faster.  Is this your history?");
				break;
			case PerkLib.HistorySlut:
				Render.text("You managed to spend most of your time having sex.  Quite simply, when it came to sex, you were the village bicycle - everyone got a ride.  Because of this, your body is a bit more resistant to penetrative stretching, and has a higher upper limit on what exactly can be inserted.  Is this your history?");
				break;
			case PerkLib.HistorySmith:
				Render.text("You managed to get an apprenticeship with the local blacksmith.  Because of your time spent at the blacksmith's side, you've learned how to fit armor for maximum protection.  Is this your history?");
				break;
			default:
				Render.text("You managed to find work as a whore.  Because of your time spent trading seduction for profit, you're more effective at teasing (+15% tease damage).  Is this your history?");
		}
		menu();
		addButton(0, "Yes", setHistory, choice);
		addButton(1, "No", chooseHistory);
	}

	private setHistory(choice:PerkType):void {
		player.createPerk(choice, 0, 0, 0, 0);
		if (choice == PerkLib.HistorySlut || choice == PerkLib.HistoryWhore) {
			if (player.lowerBody.vaginaSpot.hasVagina()) {
				player.vaginas[0].virgin = false;
				player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.LOOSE;
			}
			player.ass.analLooseness = 1;
		}
		if (flags[FlagEnum.HISTORY_PERK_SELECTED] == 0) {
			flags[FlagEnum.HISTORY_PERK_SELECTED] = 1;
			completeCharacterCreation();
		}
		else { //Special escape clause for very old saves that do not have a history perk. This is used to allow them the chance to select a perk at camp on load.
			flags[FlagEnum.HISTORY_PERK_SELECTED] = 1;
			playerMenu();
		}
			
	}
		
	private completeCharacterCreation():void {
		if (customPlayerProfile != null) {
			customPlayerProfile();
			doNext(arrival);
			return;
		}
		arrival();
	}
			
	private arrival():void {
		statScreenRefresh();
		model.time.hours = 11;
		clearOutput();
		Render.text("You are prepared for what is to come.  Most of the last year has been spent honing your body and mind to prepare for the challenges ahead.  You are the Champion of Ingnam.  The one who will journey to the demon realm and guarantee the safety of your friends and family, even though you'll never see them again.  You wipe away a tear as you enter the courtyard and see Elder Nomur waiting for you.  You are ready.\n\n");
		Render.text("The walk to the tainted cave is long and silent.  Elder Nomur does not speak.  There is nothing left to say.  The two of you journey in companionable silence.  Slowly the black rock of Mount Ilgast looms closer and closer, and the temperature of the air drops.   You shiver and glance at the Elder, noticing he doesn't betray any sign of the cold.  Despite his age of nearly 80, he maintains the vigor of a man half his age.  You're glad for his strength, as assisting him across this distance would be draining, and you must save your energy for the trials ahead.\n\n");
		Render.text("The entrance of the cave gapes open, sharp stalactites hanging over the entrance, giving it the appearance of a monstrous mouth.  Elder Nomur stops and nods to you, gesturing for you to proceed alone.\n\n");
		Render.text("The cave is unusually warm and damp, ");
		if (player.gender == GENDER.FEMALE)
			Render.text("and your body seems to feel the same way, flushing as you feel a warmth and dampness between your thighs. ");
		else Render.text("and your body reacts with a sense of growing warmth focusing in your groin, your manhood hardening for no apparent reason. ");
		Render.text("You were warned of this and press forward, ignoring your body's growing needs.  A glowing purple-pink portal swirls and flares with demonic light along the back wall.  Cringing, you press forward, keenly aware that your body seems to be anticipating coming in contact with the tainted magical construct.  Closing your eyes, you gather your resolve and leap forwards.  Vertigo overwhelms you and you black out...");
		showStats();
		dynStats("lus", 15);
		doNext(arrivalPartTwo);
	}
		
	private arrivalPartTwo():void {
		clearOutput();
		hideUpDown();
		dynStats("lus", 40, "cor", 2);
		model.time.hours = 18;
		Render.text("You wake with a splitting headache and a body full of burning desire.  A shadow darkens your view momentarily and your training kicks in.  You roll to the side across the bare ground and leap to your feet.  A surprised looking imp stands a few feet away, holding an empty vial.  He's completely naked, an improbably sized pulsing red cock hanging between his spindly legs.  You flush with desire as a wave of lust washes over you, your mind reeling as you fight ");
		if (player.gender == GENDER.FEMALE)
			Render.text("the urge to chase down his rod and impale yourself on it.\n\n");
		else
			Render.text("the urge to ram your cock down his throat.  The strangeness of the thought surprises you.\n\n");
		Render.text("The imp says, \"<i>I'm amazed you aren't already chasing down my cock, human.  The last Champion was an eager whore for me by the time she woke up.  This lust draft made sure of it.</i>\"");
		doNext(arrivalPartThree);
	}
		
	private arrivalPartThree():void {
		clearOutput();
		hideUpDown();
		dynStats("lus", -30);
		Render.text("The imp shakes the empty vial to emphasize his point.  You reel in shock at this revelation - you've just entered the demon realm and you've already been drugged!  You tremble with the aching need in your groin, but resist, righteous anger lending you strength.\n\nIn desperation you leap towards the imp, watching with glee as his cocky smile changes to an expression of sheer terror.  The smaller creature is no match for your brute strength as you pummel him mercilessly.  You pick up the diminutive demon and punt him into the air, frowning grimly as he spreads his wings and begins speeding into the distance.\n\n");
		Render.text("The imp says, \"<i>FOOL!  You could have had pleasure unending... but should we ever cross paths again you will regret humiliating me!  Remember the name Zetaz, as you'll soon face the wrath of my master!</i>\"\n\n");
		Render.text("Your pleasure at defeating the demon ebbs as you consider how you've already been defiled.  You swear to yourself you will find the demon responsible for doing this to you and the other Champions, and destroy him AND his pet imp.");
		doNext(arrivalPartFour);
	}
		
	private arrivalPartFour():void {
		clearOutput();
		hideUpDown();
		Render.text("You look around, surveying the hellish landscape as you plot your next move.  The portal is a few yards away, nestled between a formation of rocks.  It does not seem to exude the arousing influence it had on the other side.  The ground and sky are both tinted different shades of red, though the earth beneath your feet feels as normal as any other lifeless patch of dirt.   You settle on the idea of making a camp here and fortifying this side of the portal.  No demons will ravage your beloved hometown on your watch.\n\nIt does not take long to set up your tent and a few simple traps.  You'll need to explore and gather more supplies to fortify it any further.  Perhaps you will even manage to track down the demons who have been abducting the other champions!");
		doNext(playerMenu);
	}
		
	private customAnnetta():void {
		Render.text("You're a rather well-endowed hermaphrodite that sports a thick, dog-knotted cock, an unused pussy, and a nice, stretchy butt-hole.  You've also got horns and demonic high-heels on your feet.  It makes you wonder why you would ever get chosen to be champion!");
		//Specific Character	"Gender: Herm
		//Penis: 13 inch long 3 inch wide penis, dog shaped, 6.5 inch knot
		//Balls: Four 5 inch wide
		//Vagina: Tight, virgin, 0.5 inch clitoris
		player.createVagina();
		player.lowerBody.cockSpot.add(new Cock());
		player.createBreastRow();
		player.lowerBody.vaginaSpot.list[0].clitLength = 0.5;
		player.tallness = 67;
		player.femininity = 90;
		player.lowerBody.balls = 2;
		player.lowerBody.ballSize = 5;
		player.lowerBody.cockSpot.list[0].cockLength = 13;
		player.lowerBody.cockSpot.list[0].cockThickness = 3;
		player.lowerBody.cockSpot.list[0].knotMultiplier = 2.2;
		//Butt: Loose"	"Skin: Purple
		player.ass.analLooseness = 3;
		player.skinTone = "purple";
		//Hair: Back length orange
		player.hairLength = 30;
		player.hairColor = "orange";
		//Face: Elf ears, 4x demonic horns
		player.upperBody.head.earType = EARS.ELFIN;
		player.horns = 4;
		player.hornType = HORNS.DEMON;
		//Body: Plump, no muscle tone, wide thighs, badonkulous ass, demon tail, demonic high heels
		player.thickness = 75;
		player.tone = 0;
		player.lowerBody.hipRating = 17;
		player.lowerBody.butt.buttRating = 17;
		player.tailType = TAIL.DEMONIC;
		player.lowerBody = LOWER_BODY.DEMONIC_HIGH_HEELS;
		//Breasts: J-cups with 5 inch fuckable nipples, leaking milk
		player.upperBody.chest.list[0].breastRating = 28;
		player.upperBody.chest.BreastRatingLargest[0].nippleLength = 5;
		player.upperBody.chest.list[0].lactationMultiplier += 20;
			
		//Equipment: Starts with spiked fist
		player.setWeapon(weapons.S_GAUNT);
		//Perks: Fighter and Lotsa Jizz"	Annetta
		player.createPerk(PerkLib.HistoryFighter,0,0,0,0);
		player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
		player.cumMultiplier = 20;
		player.gender = 3;
	}
		
	private customAria():void {
		Render.text("It's really no surprise that you were sent through the portal to deal with the demons - you look enough like one as-is.  Your numerous fetish-inducing piercings, magical fox-tails, and bimbo-licious personality were all the motivation the elders needed to keep you from corrupting the village youth.");
		//2/26/2013 8:18:21	rdolave@gmail.com	Character Creation	"female DD breasts feminity 100 butt size 5 hip size 5 body thickness 10 clit I would like her nipples pierced with Ceraphs piercing
		//(on a side note how much do you think it would cost to add bell nipple,labia and clit piercings as well as an option for belly button piercings would like to see belly button piecings with a few different options as well.  Also would love to have handcuff ear piercings.)"	Would like the bimbo brain and bimbo body perks as well as the nine tail PerkLib.  demonic high heels, pink skin, obscenely long pink hair  would like her to be a kitsune with the nine tails.  pink fur.  starting equipment would like to be the succubus whip and nurse's outfit.  Also would like the xmas perk and all three Vday perks	Aria
		if(!player.lowerBody.vaginaSpot.hasVagina()) player.createVagina();
		if(player.femininity < 80) player.femininity = 80;
		player.createPerk(PerkLib.BimboBody, 0, 0, 0, 0);
		player.createPerk(PerkLib.BimboBrains, 0, 0, 0, 0);
		player.tailType = TAIL.FOX;
		player.lowerBody.tailVenom = 9;
		player.createPerk(PerkLib.EnlightenedNinetails, 0, 0, 0, 0);
		player.upperBody.chest.list[0].breastRating = 5;
		player.femininity = 100;
		player.lowerBody = LOWER_BODY.DEMONIC_HIGH_HEELS;
		player.skinTone = "pink";
		player.skinType = SKIN.FUR;
		player.skinDesc = "fur";
		player.hairColor = "pink";
		player.hairLength = 50;
		player.lowerBody.hipRating = 5;
		player.lowerBody.butt.buttRating = 5;
		player.thickness = 10;
		flags[FlagEnum.PC_FETISH] = 2;
		player.earsPierced = 1;
		player.earsPShort = "green gem-stone handcuffs";
		player.earsPLong = "Green gem-stone handcuffs";
		player.nipplesPierced = 1;
		player.nipplesPShort = "seamless black nipple-studs";
		player.nipplesPLong = "Seamless black nipple-studs";
		flags[FlagEnum.PC_FETISH] = 2;
		player.vaginas[0].clitPierced = 1;
		player.vaginas[0].clitPShort = "emerald clit-stud";
		player.vaginas[0].clitPLong = "Emerald clit-stud";
		player.vaginas[0].labiaPierced = 2;
		player.vaginas[0].labiaPShort = "ruby labia-rings";
		player.vaginas[0].labiaPLong = "Ruby labia-rings";
		player.createPerk(PerkLib.ElvenBounty,0,15,0,0);
		player.createPerk(PerkLib.PureAndLoving,0,0,0,0);
		player.createPerk(PerkLib.SensualLover,0,0,0,0);
		player.createPerk(PerkLib.OneTrackMind,0,0,0,0);
		player.setWeapon(weapons.SUCWHIP);
		player.setArmor(armors.NURSECL);
	}
		
	private customBetram():void {
		//Character Creation	
		//herm, canine cock - 8", virgin, tight, wet	
		//fox ears, tails, A cup breasts with normal nipples	Betram															
		player.upperBody.head.earType = EARS.FOX;
		player.tailType = TAIL.FOX;
		player.lowerBody.tailVenom = 1;
		if(player.upperBody.chest.BreastRatingLargest[0].breastRating > 1) player.upperBody.chest.list[0].breastRating = 1;
		if(!player.lowerBody.cockSpot.hasCock()) {
			player.lowerBody.cockSpot.add(new Cock());
			player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
			player.lowerBody.cockSpot.list[0].cockLength = 8;
			player.lowerBody.cockSpot.list[0].cockThickness = 1;
			player.lowerBody.cockSpot.list[0].knotMultiplier = 1.4;
		}
		if(!player.lowerBody.vaginaSpot.hasVagina()) {
			player.createVagina();
			player.vaginas[0].vaginalWetness = VAGINA_WETNESS.WET;
			player.lowerBody.vaginaSpot.list[0].clitLength = 0.25;
		}
		player.gender = 3;
		Render.text("You're quite the foxy herm, and as different as you were compared to the rest of Ingnam, it's no suprise you were sent through first.");
	}
		
	private customCeveo():void {
		//Male. 2 cock. 5.5 average thickness and 12 in with excessive thickness both pierced with silver rings. Balls, large, about the size of a billiard ball, four of them. All humanish, more details on the character.
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.balls = 4;
		player.lowerBody.ballSize = 3;
		player.lowerBody.cockSpot.list[0].cockThickness = 5.5;
		player.lowerBody.cockSpot.list[1].cockThickness = 5.5;
		player.lowerBody.cockSpot.list[0].cockLength = 12;
		player.lowerBody.cockSpot.list[1].cockLength = 12;
		player.lowerBody.cockSpot.list[0].pierced = 2;
		player.lowerBody.cockSpot.list[1].pierced = 2;
		player.lowerBody.cockSpot.list[0].pShortDesc = "silver cock-ring";
		player.lowerBody.cockSpot.list[1].pShortDesc = "silver cock-ring";
		player.lowerBody.cockSpot.list[0].pLongDesc = "Silver cock-ring";
		player.lowerBody.cockSpot.list[1].pLongDesc = "Silver cock-ring";
		//"Androgynous face, large brown eyes, long black hair down to about ass level, full lips, pirced with one silver ring ass itself is round and thick, chest is flat, only two nipples, about nickle sized pierced with silver studs, skin of a pale ghostly transparent complexion, rest of the body is not notably muscular or chubby in any definite way, feet seem to taper off into full transparency. Full body housed in the lewd Inquisitor Armor, wielding a Wizard Staff. Starting at level 5 with tank, regeneration, healing, smarts, channeling, mage and incorperability perks, a full knowledge of 
		player.gender = 1;
		player.tallness = 72;
		player.femininity = 50;
		player.hairLength = 35;
		player.hairColor = "black";
		player.lipPierced = 2;
		player.lipPShort = "silver lip-ring";
		player.lipPLong = "Silver lip-ring";
		player.lowerBody.butt.buttRating = 8;
		player.lowerBody.hipRating = 8;
		player.createBreastRow();
		player.nipplesPierced = 1;
		player.nipplesPShort = "silver studs";
		player.nipplesPLong = "Silver studs";
				
		player.skinTone = "ghostly pale";
		player.createPerk(PerkLib.Incorporeality, 0, 0, 0, 0);
		player.setArmor(armors.I_CORST);
		player.level = 5;
		player.setWeapon(weapons.W_STAFF);
	
		player.createPerk(PerkLib.Regeneration, 0, 0, 0, 0);
		player.createPerk(PerkLib.Smart, 0, 0, 0, 0);
		player.createPerk(PerkLib.Channeling, 0, 0, 0, 0);
		player.createPerk(PerkLib.Mage, 0, 0, 0, 0);
		player.createPerk(PerkLib.HistoryHealer, 0, 0, 0, 0);
		player.createPerk(PerkLib.Tank, 0, 0, 0, 0);
		player.statusAffects.add(new StatusAffect("KnowsArouse",0,0,0,0)));
		player.statusAffects.add(new StatusAffect("KnowsHeal",0,0,0,0)));
		player.statusAffects.add(new StatusAffect("KnowsMight",0,0,0,0)));
		player.statusAffects.add(new StatusAffect("KnowsCharge",0,0,0,0)));
		player.statusAffects.add(new StatusAffect("KnowsBlind",0,0,0,0)));
		player.statusAffects.add(new StatusAffect("KnowsWhitefire",0,0,0,0)));
		//magic, 50 Int, 50 tough, Speed 15, Str 10, 30 corruption, 30 libido, 10 sensitivity.
		player.stats.int = 50;
		player.tou = 50;
		player.stats.spe = 15;
		player.str = 10;
		player.stats.cor = 30;
		player.stats.lib = 30;
		player.stats.sens = 10;
		Render.text("As a wandering mage you had found your way into no small amount of trouble in the search for knowledge.  A strange tome here, a ritual there, most people found your pale form unsettling. They would be further troubled if they could see your feet!  Lets not even begin on the blood magic.  Yes, your interest in examining every aspect of magic has run you down a strange path, so when you wandered into Ingram and began to hear of the exile of the Champion, and the superstitions that surrounded it you were intrigued, as every little rumor and ritual often had a grain of truth.  You snuck into the cave prior to the ritual, where the old man supposedly led every Champion, and there you found a strange portal that emanated a certain degree of spacial transparency -  more than the portal's own.  Within it must have been a whole new world!  Throwing caution to the wind, your curiosities engulfing you, you dove in with nary a thought for the consequences.");
	}
		
	private customCharaun():void {
		Render.text("As a gifted fox with a juicy, thick knot, a wet cunt, and magical powers, you have no problems with being chosen as champion.");
		//Herm, Fox Cock: (27"l x 1.4"w, knot multiplier 3.6), No Balls, Cum Multiplier: 7,500, Vaginal Wetness: 5, Clit length: 0.5, Virgin, Fertility: 15	9-tailed "enlightened" kitsune( a pure-blooded kitsune with the "Enlightened Nine-tails" perk and magic specials) 
		if(!player.lowerBody.cockSpot.hasCock()) player.lowerBody.cockSpot.add(new Cock());
		if(!player.lowerBody.vaginaSpot.hasVagina()) player.createVagina();
		player.gender = 3;
		player.lowerBody.cockSpot.list[0].cockLength = 27;
		player.lowerBody.cockSpot.list[0].cockThickness = 1.4;
		player.lowerBody.cockSpot.list[0].knotMultiplier = 3.6;
		player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
		player.lowerBody.balls = 0;
		player.lowerBody.ballSize = 2;
		player.cumMultiplier = 7500;
		player.vaginas[0].vaginalWetness = VAGINA_WETNESS.SLAVERING;
		player.lowerBody.vaginaSpot.list[0].clitLength = 0.5;
		player.fertility = 15;
		player.tailType = TAIL.FOX;
		player.lowerBody.tailVenom = 9;
		player.createPerk(PerkLib.EnlightenedNinetails,0,0,0,0);
		//if possible with fur, Hair color: "midnight black", Skin/Fur color: "ashen grayish-blue",  Height: 65", Tone: 100, Thickness: 0, Hip rating: 6, Butt rating: 3,Feminimity: 50,  ( 4 rows of breasts (Descending from the top ones: D,C,B,A), nipple length: 0.1", Fuckable, 1 nipple per breast, Tongue type: demon
		player.hairColor = "midnight black";
		player.skinType = SKIN.FUR;
		player.skinDesc = "fur";
		player.skinTone = "ashen grayish-blue";
		player.tallness = 65;
		player.tone = 100;
		player.thickness = 0;
		player.lowerBody.hipRating = 6;
		player.lowerBody.butt.buttRating = 3;
		player.femininity = 50;
		player.createBreastRow();
		player.createBreastRow();
		player.createBreastRow();
		player.upperBody.chest.list[0].breastRating = 4;
		player.upperBody.chest.list[0].fuckable = true;
		player.upperBody.chest.list[1].breastRating = 3;
		player.upperBody.chest.list[1].fuckable = true;
		player.upperBody.chest.list[2].breastRating = 2;
		player.upperBody.chest.list[2].fuckable = true;
		player.upperBody.chest.list[3].breastRating = 1;
		player.upperBody.chest.list[3].fuckable = true;
		player.tongueType = TONUGE.DEMONIC;
		player.upperBody.chest.BreastRatingLargest[0].nippleLength = 0.1;
		//Starting with an Inscribed Spellblade and Bondage Straps.	Charaun
		player.setArmor(armors.BONSTRP);
		player.setWeapon(weapons.S_BLADE);
	}
		
	private customCharlie():void {
		Render.text("You're strong, smart, fast, and tough.  It also helps that you've got four dongs well beyond what others have lurking in their trousers.  With your wings, bow, weapon, and tough armor, you're a natural for protecting the town.");
		player.gender = 1;
		player.tou +=2;
		player.str += 3;
		player.fertility = 5;
		player.hairLength= 26;
		player.hairColor = "blond";
		player.skinTone = "light";
		player.upperBody.chest.BreastRatingLargest[0].nippleLength = 0.2;
		player.createBreastRow();
		player.upperBody.chest.list[0].breastRating = 0;
		player.lowerBody.balls = 2;
		player.lowerBody.ballSize = 3;
		player.tallness = 113;
		player.tone = 50;
		player.thickness = 50;
		player.femininity = 50;
		player.lowerBody.hipRating = 5;
		player.lowerBody.butt.buttRating = 5;
		player.teaseLevel = 1;
		//Large feathered wings (Any chance in heck I could get 'angel' as the race descriptor? Just asking. I'm fine if the answer is 'no')
		player.upperBody.wingType = WING.FEATHERED_LARGE;
		player.upperBody.wingDesc = "large, feathered";
			
		//While we're on the subject, would glowing eyes be possible? I'll take normal eyes if not.
		//Beautiful Sword
		player.setWeapon(weapons.B_SWORD);
		player.setArmor(armors.SSARMOR);
		//Beautiful Armor (Or just Spider Silk Armor)
		//Pure Pearl
		//Tallness 84 (8 feet 0 inches)
		player.tallness = 84;
		//Femininity 10
		player.femininity = 10;
		//Thickness 50
		player.thickness = 50;
		//Tone 90
		player.tone = 90;
		//Int 50 (if possible)
		player.stats.int = 50;
		//Str/Tou/Spd 25 (if possible)
		player.str = 25;
		player.tou = 25;
		player.stats.spe = 25;
		//Bow
		player.createKeyItem("Bow",0,0,0,0);
		//Bow skill 100 (Sorry Kelt, I can't hear your insults over my mad Robin Hood skillz)
		player.statusAffects.add(new StatusAffect("Kelt",100,0,0,0)));
		//Is it possible to get extra starting perks added? If so, I'd like History: Religious added to whatever is selected on creation. If not, please ignore this line.
		//Freckled skinAdj
		player.skinAdj = "freckled";
		//10 Perk Points (if possible, feel free to make it less if you feel it necessary)
		player.perkPoints = 10;
		//Male
		player.gender = 1;
		//Would it be possible to code a cock type that morphs into different cock types? (i.e. it loads a different cock type description each sex scene) If so, I'd like him to have a pair of them, one 24 inches long and 3 inches wide and the second 12-inches long and 2 inches wide. If not, I'll take a dragon and horse cock at 24/3 each as well as a dog and cat cock at 12/2 each.
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.list[0].cockLength = 24;
		player.lowerBody.cockSpot.list[0].cockThickness = 3;
		player.lowerBody.cockSpot.list[0].cockType = CockType.HORSE;
		player.lowerBody.cockSpot.list[1].cockLength = 24;
		player.lowerBody.cockSpot.list[1].cockThickness = 3;
		player.lowerBody.cockSpot.list[1].cockType = CockType.DRAGON;
		player.lowerBody.cockSpot.list[2].cockLength = 12;
		player.lowerBody.cockSpot.list[2].cockThickness = 2;
		player.lowerBody.cockSpot.list[2].cockType = CockType.DOG;
		player.lowerBody.cockSpot.list[3].cockLength = 12;
		player.lowerBody.cockSpot.list[3].cockThickness = 2;
		player.lowerBody.cockSpot.list[3].cockType = CockType.CAT;
	
		//A pair of 8-inch balls
		player.lowerBody.balls = 2;
		player.lowerBody.ballSize = 8;
		//A virility boost would be nice too if possible.
		player.cumMultiplier = 50;
	}
		
	private customCody():void {
		Render.text("Your orange and black tiger stripes make you cut a more imposing visage than normal, and with your great strength, armor, and claymore, you're a natural pick for champion.");
		//well to start off the name would be Cody
		//-Cat with (black and orange tiger fur if possible) if not just Orange fur
		player.hairColor = "black and orange";
		player.skinType = SKIN.FUR;
		player.skinDesc = "fur";
		//-Chainmail armor
		player.setArmor(armors.FULLCHN);
		//-Large Claymore (i understand 40 Strength is need so if he could start with that would be great if not hit the gyms)"
		player.str = 41;
		player.setWeapon(weapons.CLAYMOR);
	}
		
	private customGalatea():void {
		//"(Dangit Fenoxo!  Stop adding sexy must-have things to the game!  If it's not too late to update it I've added in that sexy new armor.  Thanks!)		
		//Other:
		if(!player.lowerBody.vaginaSpot.hasVagina()) {
			player.createVagina();
			if(player.lowerBody.vaginaSpot.list[0].clitLength == 0) player.lowerBody.vaginaSpot.list[0].clitLength = 0.25;
		}
		kGAMECLASS.genderCheck();
		//Hair length: Very long
		player.hairLength = 22;
		//Breast size: HH
		player.upperBody.chest.list[0].breastRating = 21;
		//Femininity/Beauty: Very high
		player.femininity = 90;
		// Height: 5'4
		player.tallness = 64;
	
		//Perks: Feeder, Strong Back, Strong Back 2
		player.statusAffects.add(new StatusAffect("Feeder",0,0,0,0)));
		player.createPerk(PerkLib.Feeder, 0, 0, 0, 0);
	
		player.createPerk(PerkLib.StrongBack, 0, 0, 0, 0);
		player.createPerk(PerkLib.StrongBack2, 0, 0, 0, 0);
	
		//Equipment: 
		//Weapon: Warhammer
		player.setWeapon(weapons.WARHAMR);
		//Armor: Lusty shit
		player.setArmor(armors.LMARMOR);
		//player.createPerk(PerkLib.SluttySeduction, 10 + flags[FlagEnum.BIKINI_ARMOR_BONUS], 0, 0, 0);
	
		//Stats: (if possible)
		//Strength: 90
		player.str = 90;
		//Fertility: 100
		player.fertility = 100;
		player.stats.cor = 25;
		//Inventory: Lactaid, GroPlus, BimboLq
		player.itemSlot1.setItemAndQty(consumables.LACTAID,5);
		player.itemSlot2.setItemAndQty(consumables.GROPLUS,5);
		player.itemSlot3.setItemAndQty(consumables.BIMBOLQ,1);
		player.itemSlot4.unlocked = true;
		player.itemSlot4.setItemAndQty(armors.BIMBOSK,1);
		player.itemSlot5.unlocked = true;
		Render.text("You've got large breasts prone to lactation.  You aren't sure WHY you got chosen as a champion, but with your considerable strength, you're sure you'll do a good job protecting Ingnam.");
	}
		
	private customGundam():void {
		Render.text("You're fabulously rich, thanks to a rather well-placed bet on who would be the champion.  Hopefully you can buy yourself out of any trouble you might get in.");
		player.stats.gems = 1500 + rand(1000);
		//for my custom character profile i want the name to be gundam all i want is to start out with around 1000-2500 gems like as a gift from the elder or something to help me out.
	}
		
	private customHikari():void {
		//Character Creation	If possible I would like a herm with a cat cock that is 10 inches by 4 inches. Anything else is up to you.	I would like a herm catmorph with two large d breasts and shoulder length hair. Also if possible I would like to start with some gel armor. Everything else is fair game.	Hikari
		Render.text("As a herm with a super-thick cat-cock, D-cup breasts, and out-of-this-world armor, you're a natural pick for champion.");
		if(!player.lowerBody.cockSpot.hasCock()) player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.list[0].cockType = CockType.CAT;
		player.lowerBody.cockSpot.list[0].cockLength = 10;
		player.lowerBody.cockSpot.list[0].cockThickness = 4;
		if(!player.lowerBody.vaginaSpot.hasVagina()) player.createVagina();
		player.upperBody.chest.list[0].breastRating = 4;
		player.hairLength = 10;
		player.setArmor(armors.GELARMR);
		player.gender = 3;
	}
		
	private customIsaac():void {
		Render.text("Born of a disgraced priestess, Isaac was raised alone until she was taken by illness.  He worked a number of odd jobs until he was eventually chosen as champion.");
		//- gift: fast
		player.stats.spe += 5;
		player.tone += 10;
		player.createPerk(PerkLib.Fast, 0.25, 0, 0, 0);
		//- history: religion 
		player.createPerk(PerkLib.HistoryReligious,0,0,0,0);
		//(and if possible)
		//- history: fighter
		player.createPerk(PerkLib.HistoryFighter,0,0,0,0);
		//- history: smith
		player.createPerk(PerkLib.HistorySmith,0,0,0,0);
		//in my ar, Issac was born to a disgraced priestess (she was raped by marauders) and raised by her alone until she died from an illness and was pretty much left to fend for and earn a living for himself (hence the fighter and smith background's too) until, years later he was chosen as 'champion'~
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		//sex - male
		player.gender = 1;
		player.lowerBody.balls = 2;
		//- a pair of apple sized balls each measuring three inches across
		player.lowerBody.ballSize = 3;
		//anatomy - twin dicks
		//the first, a vulpine dick (12 in. long, 2.8 in. thick with a knot roughly 4.5 in. at full size) with a Fertite jacob's ladder piercing
		//and the second, a barbed feline dick (10 in. long and 2.5 in thick) with an Emerald jacob's ladder
		//heh, ribbed for their pleasure ;d lol
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.list[0].cockLength = 12;
		player.lowerBody.cockSpot.list[0].cockThickness = 2.8;
		player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
		player.lowerBody.cockSpot.list[0].knotMultiplier = 1.8;
		player.lowerBody.cockSpot.list[1].cockLength = 10;
		player.lowerBody.cockSpot.list[1].cockThickness = 2.5;
		player.lowerBody.cockSpot.list[1].cockType = CockType.TENTACLE;
		player.lowerBody.cockSpot.list[0].pierced = 3;
		player.lowerBody.cockSpot.list[0].pShortDesc = "fertite cock-jacob's ladder";
		player.lowerBody.cockSpot.list[0].pLongDesc = "Fertite cock-jacob's ladder";
		player.createPerk(PerkLib.PiercedFertite,5,0,0,0);
		//- and one tight asshole
		player.ass.analLooseness = 0;
		//- kitsune
		//- moderately long white hair (9 inches)
		player.hairLength = 9;
		player.hairColor = "silver-white";
		//- human face
		//- fox ears 
		player.upperBody.head.earType = EARS.FOX;
		//- olive complexion
		player.skinTone = "olive";
		//- demon tongue (oral fetish ;d)
		player.tongueType = TONUGE.DEMONIC;
		//- 5 foot 9 inch tall
		player.tallness = 69;
		//- average build
		player.thickness = 50;
		//- body thickness of  around 50
		player.tone = 70;
		//- 'tone of about 70  
		//- two flat breasts each supporting one 0.2-inch nipple
		player.upperBody.chest.BreastRatingLargest[0].nippleLength = 0.2;
		player.createBreastRow();
		//- three fox tails
		player.tailType = TAIL.FOX;
		player.lowerBody.tailVenom = 3;
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		//equipment;
		//- katana (don't suppose you could rename the katana 'Zon'ith' could you? ~.^)
		//Items: Katana, Leather Armor
		player.setWeapon(weapons.KATANA);
		//- robes
		player.setArmor(armors.M_ROBES);
	}
		
	private customKatti():void {
		Render.text("You have big breasts with big, fuckable nipples on them, and no matter what, your vagina always seems to be there to keep you company.");
		//Gender: Female	
		if(!player.lowerBody.vaginaSpot.hasVagina()) {
			player.createVagina();
			kGAMECLASS.genderCheck();
		}
		//"Ears: Bunny
		player.upperBody.head.earType = EARS.BUNNY;
		//Tail: Bunny
		player.tailType = TAIL.RABBIT;
		//Face: Human
		//Breasts: H-cup with 4.5 inch fuckable nipples"
		player.upperBody.chest.list[0].breastRating = 19;
		player.upperBody.chest.BreastRatingLargest[0].nippleLength = 4.5;
		player.upperBody.chest.list[0].fuckable = true;
	}
		
	private customLeah():void {
		player.setArmor(armors.LEATHRA);
//		if(!player.perks.has("WizardsEndurance")) player.createPerk(PerkLib.WizardsEndurance,30,0,0,0);
		player.setWeapon(weapons.W_STAFF);
		player.itemSlot1.setItemAndQty(consumables.B__BOOK, 1);
		player.itemSlot2.setItemAndQty(consumables.W__BOOK, 2);
	
		player.createBreastRow();
		player.createVagina();
		player.upperBody.chest.list[0].breastRating = 4;
		player.lowerBody.vaginaSpot.list[0].clitLength = .5;
		player.fertility = 10;
		player.gender = 2;
		player.lowerBody.hipRating = 8;
		player.lowerBody.butt.buttRating = 8;
		player.str = 15;
		player.tou = 15;
		player.stats.spe = 18;
		player.stats.int = 17;
		player.stats.sens = 15;
		player.stats.lib = 15;
		player.stats.cor = 0;
		kGAMECLASS.notes = "No Notes Available.";
		player.HP = kGAMECLASS.maxHP();
		player.hairLength=13;
		player.skinType = SKIN.PLAIN;
		player.faceType = FACE.HUMAN;
		player.tailType = TAIL.NONE;
		player.tongueType = TONUGE.HUMAN;
		player.femininity = 85;
		player.beardLength = 0;
		player.beardStyle = 0;
		player.tone = 30;
		player.thickness = 50;
		player.skinDesc = "skin";
		player.skinTone = "olive";
		player.hairColor = "black";
		player.lowerBody.balls = 0;
		player.cumMultiplier = 1;
		player.lowerBody.ballSize = 0;
		player.hoursSinceCum = 0;
		player.lowerBody.vaginaSpot.list[0].clitLength = 0;
		player.ass.analLooseness = 0;
		player.ass.analWetness = 0;
		player.ass.fullness = 0;
		player.fertility = 5;
		player.fatigue = 0;
		player.horns = 0;
		player.tallness = 67;
		player.lowerBody.tailVenom = 0;
		player.lowerBody.tailRecharge = 0;
		player.upperBody.wingType = WING.NONE;
		player.upperBody.wingDesc = "non-existant";
		player.tone = 30;
		player.thickness = 65;
	}
		
	private customLucina():void {
		//428347355782040	Character Creation	Female,wetness=wet, Looseness=normal,not a virgin, Fertility high i guess i dont really care can be up to you.	for her face normal human, ears i want Elvin, no tails, just normal skin, body thickness i want to be slender, body tone kinda athletic but not too much, hair i want really long i think like a 30 on the codex number i think and her hair color light blonde, i want her to have normal D size breast with you can choose how you want them really though i dont think i really care, nipple size i dont care, her skin color a fair light light color but not too pale, for her starting equipment i want im not sure what i want her to wear but basically i want a Elvin archer with a bow. so maybe you can do something about the clothing. i just want a Elvin character in the game since theres goblins plus another archer besides kelt a female one add to that.	Lucina
		Render.text("You're a blond, fair-skinned lass with a well-made bow and the skills to use it.  You have D-cup breasts and a very moist cunt that's seen a little action.  You're fit and trim, but not too thin, nor too well-muscled.  All in all, you're a good fit for championing your village's cause.");
		if(!player.lowerBody.vaginaSpot.hasVagina()) player.createVagina();
		player.vaginas[0].vaginalWetness = VAGINA_WETNESS.SLICK;
		player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.LOOSE;
		player.vaginas[0].virgin = false;
		if(player.femininity < 80) player.femininity = 80;
		player.fertility = 40;
		player.upperBody.head.earType = EARS.ELFIN;
		player.thickness = 25;
		player.tone = 60;
		player.hairLength = 30;
		player.hairColor = "light blonde";
		player.upperBody.chest.list[0].breastRating = 4;
		player.skinTone = "light";
		//Bow skill 100 (Sorry Kelt, I can't hear your insults over my mad Robin Hood skillz)
		player.statusAffects.add(new StatusAffect("Kelt",100,0,0,0)));
		player.createKeyItem("Bow",0,0,0,0);
	}
		
	private customLukaz():void {
		//Specific Character	
		//Male. 11.5 inch dog dick, 4 balls, 2 inches in diameter.	
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.list[0].cockLength = 11.5;
		player.lowerBody.cockSpot.list[0].cockThickness = 2;
		player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
		player.lowerBody.cockSpot.list[0].knotMultiplier = 1.5;
		player.createBreastRow();
		player.upperBody.chest.list[0].breastRating = 0;
		player.gender = 1;
		player.tallness = 71;
		player.lowerBody.hipRating = 4;
		player.lowerBody.butt.buttRating = 4;
		player.femininity = 30;
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.balls = 4;
		player.cumMultiplier = 4;
		player.lowerBody.ballSize = 2;
		player.str = 18;
		player.tou = 17;
		player.stats.spe = 15;
		player.stats.int = 15;
		player.stats.sens = 15;
		player.stats.lib = 15;
		player.stats.cor = 0;
		kGAMECLASS.notes = "No Notes Available.";
		player.HP = kGAMECLASS.maxHP();
		player.hairLength = 1;
		player.skinType = SKIN.PLAIN;
		player.skinTone = "light";
		player.hairColor = "brown";
		player.faceType = FACE.HUMAN;
		player.tailType = TAIL.NONE;
		player.tongueType = TONUGE.HUMAN;
		player.femininity = 50;
		player.beardLength = 0;
		player.beardStyle = 0;
		player.thickness = 50;
		player.skinDesc = "skin";
		player.hoursSinceCum = 0;
		player.lowerBody.vaginaSpot.list[0].clitLength = 0;
		player.ass.analLooseness = 0;
		player.ass.analWetness = 0;
		player.ass.fullness = 0;
		player.fertility = 5;
		player.fatigue = 0;
		player.horns = 0;
		player.lowerBody.tailVenom = 0;
		player.lowerBody.tailRecharge = 0;
		player.upperBody.wingType = WING.NONE;
		player.upperBody.wingDesc = "non-existant";
		//"dog face, dog ears, draconic tail, blue fur.
		player.faceType = FACE.DOG;
		player.upperBody.head.earType = EARS.DOG;
		player.tailType = TAIL.DRACONIC;
		player.skinType = SKIN.FUR;
		player.hairColor = "blue";
		player.skinDesc = "fur";
		player.tone = 88;
		player.tongueType = TONUGE.DRACONIC;
		//gel plate armor, warhammer, 88 body tone, 1 breast row, flat manly breasts, 0.2 inch nipples, 1 on each breast, draconic tongue, short hair-blue, light skin."	Lukaz
		player.createPerk(PerkLib.HistoryFighter,0,0,0,0);
		player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
	}
		
	private customMara():void {
		//#226096893686530
		//For the custom PC Profile can you make a Bimbo Bunny girl (no bunny feet) (named Mara) dont really care about clothes i can get what i want pretty quickly and I change from time to time.
		Render.text("You're a bunny-girl with bimbo-tier curves, jiggly and soft, a curvy, wet girl with a bit of a flirty past.");
		player.gender = 2;
		player.stats.spe+=3;
		player.stats.int+=2;
		player.lowerBody.vaginaSpot.list[0].clitLength = .5;
		player.tone = 30;
		player.fertility = 10;
		player.hairLength= 15;
		player.createBreastRow();
		player.createVagina();
		player.tallness = 67;
		player.upperBody.chest.list[0].breastRating = 7;
		player.vaginas[0].vaginalWetness = VAGINA_WETNESS.SLICK;
		player.vaginas[0].virgin = false;
		player.tone = 20;
		player.lowerBody.hipRating = 12;
		player.lowerBody.butt.buttRating = 12;
		player.femininity = 100;
		player.thickness = 33;
		player.createPerk(PerkLib.HistorySlut, 0, 0, 0, 0);
		player.createPerk(PerkLib.BimboBody, 0, 0, 0, 0);
		player.createPerk(PerkLib.BimboBrains, 0, 0, 0, 0);
		player.createPerk(PerkLib.BigTits, 1.5, 0, 0, 0);
		player.upperBody.head.earType = EARS.BUNNY;
		player.tailType = TAIL.RABBIT;
		player.skinTone = "tan";
		player.hairColor = "platinum blonde";
		player.teaseLevel = 3;
	}
		
	private customMihari():void {
		//[Values will be listed as if taken from Minerva]
		//I'm kinda going under the assumption you are letting us go hog wild if not, take what's allowed and do what you wish out of what's below
		Render.text("The portal is not something you fear, not with your imposing armor and inscribed spellblade.  You're much faster and stronger than every champion that came before you, but will it be enough?");
		//Core Stats:
		player.str = 40;
		player.tou = 20;
		player.stats.spe = 100;
		player.stats.int = 80;
		player.stats.lib = 25;
		player.stats.sens = 15;
			
		//Body Values:
		//breastRows
		player.createBreastRow();
		//-breastRating: 5
		//-breasts: 2
		//-nipplesPerBreast: 1
		player.upperBody.chest.list[0].breastRating = 5;
		player.lowerBody.butt.buttRating = 2;
		player.createVagina();
		player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.TIGHT;
		player.vaginas[0].vaginalWetness = VAGINA_WETNESS.SLAVERING;
		player.vaginas[0].virgin = true;
		player.lowerBody.vaginaSpot.list[0].clitLength = 0.2;
		player.upperBody.head.earType = EARS.CAT;
		player.faceType = FACE.CAT;
		player.femininity = 100;
		player.fertility = 85;
		player.gender = 2;
		player.hairColor = "blonde";
		player.hairLength = 24;
		player.lowerBody.hipRating = 6;
		player.lowerBody = LOWER_BODY.CAT;
		player.upperBody.chest.BreastRatingLargest[0].nippleLength = 0.5;
		//perks:
		player.createPerk(PerkLib.Agility, 0, 0, 0, 0);
		player.createPerk(PerkLib.Evade, 0, 0, 0, 0);
		player.createPerk(PerkLib.Runner, 0, 0, 0, 0);
		player.createPerk(PerkLib.Fast, 0.25, 0, 0, 0);
		player.createPerk(PerkLib.Fertile, 1.5, 0, 0, 0);
		player.createPerk(PerkLib.Flexibility, 0, 0, 0, 0);
		player.createPerk(PerkLib.HistoryScholar, 0, 0, 0, 0);
	
		player.skinDesc = "fur";
		player.skinTone = "ashen";
		player.skinType = SKIN.FUR;
		player.tailType = TAIL.CAT;
		player.tallness = 55;
		player.teaseLevel = 4;
		player.thickness = 10;
		player.tone = 75;
		player.tongueType = TONUGE.HUMAN;
			
		//Posted everything above sorry if it wasn't supposed to go there.
		//starting equipment: black leather armor surrounded by voluminous robes
		//starting weapon: Spellblade if not gamebreaking otherwise spear is fine.
		player.setArmor(armors.LTHRROB);
		player.setWeapon(weapons.S_BLADE);
	}
		
	private customMirvanna():void {
		//Any equine or dragonny attributes accompanying it a big plus! As I'm a dragon-unicorn furry (Qilin~). Bonus points if you add a horn type for unicorn horn. 
		Render.text("You're an equine dragon-herm with a rather well-proportioned body.  Ingnam is certainly going to miss having you whoring yourself out around town.  You don't think they'll miss cleaning up all the messy sex, though.");
		player.gender = 3;
		player.stats.spe+=3;
		player.stats.int+=2;
		player.str += 3;
		player.lowerBody.vaginaSpot.list[0].clitLength = .5;
		player.fertility = 20;
		player.hairLength= 15;
		player.createBreastRow();
		player.createVagina();
		player.lowerBody.cockSpot.add(new Cock());
		player.tallness = 73;
		player.upperBody.chest.list[0].breastRating = 5;
		player.vaginas[0].vaginalWetness = VAGINA_WETNESS.SLICK;
		player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.LOOSE;
		player.vaginas[0].virgin = false;
		player.tone = 20;
		player.lowerBody.hipRating = 8;
		player.lowerBody.butt.buttRating = 8;
		player.femininity = 75;
		player.thickness = 33;
		player.hairColor = "platinum blonde";
		player.teaseLevel = 1;
		//Mirvanna;
		//Gender = Herm
		//Ears = Horse
		player.upperBody.head.earType = EARS.HORSE;
		//Horns = Dragon
		player.hornType = HORNS.DRACONIC_X4_12_INCH_LONG;
		player.horns = 12;
		//Face = Horse
		player.faceType = FACE.HORSE;
		//Skin type = Black Fur
		player.skinTone = "brown";
		player.skinType = SKIN.FUR;
		player.hairColor = "black";
		player.skinDesc = "fur";
		//Legs/Feet = Digigrade hooved 
		player.lowerBody = LOWER_BODY.HOOFED;
		//Wing type = Dragon
		player.upperBody.wingType = WING.DRACONIC_LARGE;
		player.upperBody.wingDesc = "large, draconic";
		//Tail type = Dragon
		player.tailType = TAIL.DRACONIC;
		//Cock type = Equine
		player.lowerBody.cockSpot.list[0].cockType = CockType.HORSE;
		player.lowerBody.cockSpot.list[0].cockLength = 14;
		player.lowerBody.cockSpot.list[0].cockThickness = 2.5;
		//Vulva Type = Equine
			
		//Beautiful Sword & Wizard Robe
		player.setWeapon(weapons.B_SWORD);
		player.setArmor(armors.W_ROBES);
		//Herm, lots of jizz.
		player.femininity -= 2;
		player.cumMultiplier = 5.5;
		player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
		player.createPerk(PerkLib.HistoryWhore,0,0,0,0);
	}
		
	private customNami():void {
		//Female with the sand-trap black pussy
		//Non-Virgin
		//Fertility- Normal Starting Value
		//Wetness- Above Average
		//Looseness- Normal Starting Value
		//Clit-size- Normal Value"
		player.createVagina();
		player.vaginas[0].vaginalWetness = VAGINA_WETNESS.SLICK;
		player.lowerBody.vaginaSpot.list[0].clitLength = 0.25;
		player.vaginas[0].type = 5;
		player.vaginas[0].virgin = false;
		player.ass.analLooseness = 1;
		//Face- Canine
		player.faceType = FACE.DOG;
		//Ears- Canine
		player.upperBody.head.earType = EARS.DOG;
		//Tail- Canine
		player.tailType = TAIL.DOG;
		//Lower body- Canine
		player.lowerBody = LOWER_BODY.DOG;
		//White Fur (if possible)
		player.skinType = SKIN.FUR;
		player.hairColor = "white";
		player.skinDesc = "fur";
		//Body Thickness/breastsize/- As if I had selected the ""Average"" body type from the start.
		player.createBreastRow();
		player.upperBody.chest.list[0].breastRating = 3;
		//Muscle Tone- A bit above average enough to trigger a mention of it in the desc.
		player.tone = 55;
		//Nipples-  As above on size but the black sand trap nipples.
		player.statusAffects.add(new StatusAffect("BlackNipples",0,0,0,0)));
		//Hair Length- Long
		player.hairLength = 16;
		//Hair Color- Black
		//Skin Color- Light
		player.skinTone = "light";
		//Starting Equipment: Wizard's Robe, Wizards Staff, and one White and one Black book in inventory.
		//equipArmor("inquisitor's corset",false);
		player.setArmor(armors.W_ROBES);
	
		player.setWeapon(weapons.W_STAFF);
		//Gift Perk- Smarts
		player.createPerk(PerkLib.Smart,0,0,0,0);
		//History- Schooling
		player.createPerk(PerkLib.HistoryScholar,0,0,0,0);
		player.itemSlot1.setItemAndQty(consumables.W__BOOK,1);
		player.itemSlot2.setItemAndQty(consumables.B__BOOK,1);
				
		player.gender = 2;
		player.tallness = 64;
		player.femininity = 75;
		player.lowerBody.butt.buttRating = 7;
		player.lowerBody.hipRating = 7;
		player.stats.int = 40;
		player.str = 20;
		player.stats.spe = 25;
		player.tou = 15;
			
		clearOutput();
		Render.text("Your exotic appearance caused you some trouble growing up, but you buried your nose in books until it came time to go through the portal.");
	}
		
	private customNavorn():void {
		Render.text("There's been something special about you since day one, whether it's your numerous sexual endowments or your supernatural abilities.  You're a natural pick for champion.");
		//Character Creation	"Herm same number and types of cocks from email sent earlier. 
		//Special abilities: Fire breath, fox fire?
		player.createPerk(PerkLib.Dragonfire,0,0,0,0);
		//equipment: Large claymore, and platemail
		//-Chainmail armor
		player.setArmor(armors.FULLPLT);
		//-Large Claymore (i understand 40 Strength is need so if he could start with that would be great if not hit the gyms)"
		player.setWeapon(weapons.CLAYMOR);
	
		player.str = 41;
		//femininity: 95
		player.femininity = 95;
		//(0 lust cum production: 10000)
		player.cumMultiplier += 500;
		//(base fertility 20 if possible?)
		player.fertility = 20;
		//Appearence: 7ft 9in tall covered in thick shining silver fur, has a vulpine head and ears, eight breast all the same size at DD, dragon like wings, tail, and legs. With a large mare like pussy, 6 dicks, two equine, two dragon, two vulpine, all 15in long and 3 in wide, and four nuts 5 in across
		player.tallness = 93;
		player.skinTone = "black";
		player.skinType = SKIN.FUR;
		player.skinDesc = "fur";
		player.hairColor = "silver";
		player.faceType = FACE.FOX;
		player.upperBody.head.earType = EARS.FOX;
		player.createBreastRow();
		player.createBreastRow();
		player.createBreastRow();
		player.upperBody.chest.list[0].breastRating = 5;
		player.upperBody.chest.list[0].nipplesPerBreast = 4;
		player.upperBody.chest.list[0].fuckable = true;
		player.upperBody.chest.list[1].breastRating = 5;
		player.upperBody.chest.list[1].nipplesPerBreast = 4;
		player.upperBody.chest.list[1].fuckable = true;
		player.upperBody.chest.list[2].breastRating = 5;
		player.upperBody.chest.list[2].nipplesPerBreast = 4;
		player.upperBody.chest.list[2].fuckable = true;
		player.upperBody.chest.list[3].breastRating = 5;
		player.upperBody.chest.list[3].nipplesPerBreast = 4;
		player.upperBody.chest.list[3].fuckable = true;
		if(!player.lowerBody.cockSpot.hasCock()) player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.list[0].cockType = CockType.HORSE;
		player.lowerBody.cockSpot.list[0].cockLength = 15;
		player.lowerBody.cockSpot.list[0].cockThickness = 3;
		player.lowerBody.cockSpot.list[1].cockType = CockType.HORSE;
		player.lowerBody.cockSpot.list[1].cockLength = 15;
		player.lowerBody.cockSpot.list[1].cockThickness = 3;
		player.lowerBody.cockSpot.list[2].cockType = CockType.DOG;
		player.lowerBody.cockSpot.list[2].cockLength = 15;
		player.lowerBody.cockSpot.list[2].cockThickness = 3;
		player.lowerBody.cockSpot.list[2].knotMultiplier = 2;
		player.lowerBody.cockSpot.list[3].cockType = CockType.DOG;
		player.lowerBody.cockSpot.list[3].cockLength = 15;
		player.lowerBody.cockSpot.list[3].cockThickness = 3;
		player.lowerBody.cockSpot.list[3].knotMultiplier = 2;
		player.lowerBody.cockSpot.list[4].cockType = CockType.DRAGON;
		player.lowerBody.cockSpot.list[4].cockLength = 15;
		player.lowerBody.cockSpot.list[4].cockThickness = 3;
		player.lowerBody.cockSpot.list[5].cockType = CockType.DRAGON;
		player.lowerBody.cockSpot.list[5].cockLength = 15;
		player.lowerBody.cockSpot.list[5].cockThickness = 3;
		player.lowerBody.balls = 4;
		player.lowerBody.ballSize = 5;
		//hair length: 15 in
		player.hairLength = 15;
		//hip size: 15/20
		player.lowerBody.hipRating = 15;
		//butt size: 15/20
		player.lowerBody.butt.buttRating = 15;
		//body thickness: 50/100
		player.thickness = 50;
		//Muscle: 75/100"
		player.tone = 75;
		//for wetness a squirter, looseness a 2 and capacity at 140.
		if(!player.lowerBody.vaginaSpot.hasVagina()) player.createVagina();
		player.vaginas[0].vaginalWetness = VAGINA_WETNESS.SLAVERING;
		player.statusAffects.add(new StatusAffect("BonusVCapacity",132,0,0,0)));
		//Virgin, high fertility like in the email I sent before.  dragon wings, nine fox tails,  dragon legs, eight DD breasts with four fuckable nipples each, dragon tongue, waist length hair, large dragon wings.
		player.upperBody.wingType = WING.DRACONIC_LARGE;
		player.upperBody.wingDesc = "large, draconic";
		player.tailType = TAIL.FOX;
		player.lowerBody.tailVenom = 9;
		player.lowerBody = LOWER_BODY.DRAGON;
		player.tongueType = TONUGE.DRACONIC;
		player.hairLength = 45;
		player.createPerk(PerkLib.EnlightenedNinetails,0,0,0,0);
		player.gender = 3;
	}
		
	private customNixi():void {
		//-Perks
		//fertility AND messy orgasm (hope that's not pushing it)
		player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
		player.createPerk(PerkLib.Fertile, 1.5, 0, 0, 0);
		//fighting history
		player.createPerk(PerkLib.HistoryFighter,0,0,0,0);
		//3 starting perk points
		player.perkPoints = 3;
		//some starting gems (just go ahead and surprise me on the amount)
		player.stats.gems = rand(800);
		//Specific Character
		//-Female... with a dog cock
		//11"" long, 2"" wide, 2.4"" knot
		//no balls
		//virgin pussy, 0.2"" clit
		//wetness 2
		//fertility 30 
		//virgin bum
		//anal wetness 1
		player.ass.analWetness = 2;
		player.gender = 3;
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.list[0].cockLength = 11;
		player.lowerBody.cockSpot.list[0].cockThickness = 2;
		player.lowerBody.cockSpot.list[0].knotMultiplier = 1.2;
		player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
		player.lowerBody.balls = 0;
		player.createBreastRow();
		player.createVagina();
		player.vaginas[0].vaginalWetness = VAGINA_WETNESS.WET;
		//1 pair DD's, 0.5"" nipples"
		player.upperBody.chest.list[0].breastRating = 5;
		player.upperBody.chest.BreastRatingLargest[0].nippleLength = 0.5;
		player.lowerBody.vaginaSpot.list[0].clitLength = .5;
		player.fertility = 30;
		player.lowerBody.hipRating = 6;
		player.lowerBody.butt.buttRating = 6;
		player.str = 15;
		player.tou = 15;
		player.stats.spe = 18;
		player.stats.int = 17;
		player.stats.sens = 15;
		player.stats.lib = 15;
		player.stats.cor = 0;
		kGAMECLASS.notes = "No Notes Available.";
		player.HP = kGAMECLASS.maxHP();
			
		player.skinType = SKIN.PLAIN;
		player.faceType = FACE.HUMAN;
		player.tailType = TAIL.NONE;
		player.tongueType = TONUGE.HUMAN;
		player.femininity = 85;
		player.beardLength = 0;
		player.beardStyle = 0;
		//75 muscle tone
		player.tone = 75;
		//25 thickness
		player.thickness = 25;
		player.skinDesc = "fur";
		player.skinType = SKIN.FUR;
		player.skinTone = "light";
		player.hairColor = "silver";
		player.hairLength=10;
		//shoulder length silver hair
	
		player.lowerBody.balls = 0;
		player.cumMultiplier = 1;
		player.lowerBody.ballSize = 0;
		player.hoursSinceCum = 0;
		player.lowerBody.vaginaSpot.list[0].clitLength = 0;
		player.ass.analLooseness = 0;
		player.ass.analWetness = 0;
		player.ass.fullness = 0;
		player.fertility = 5;
		player.fatigue = 0;
		player.horns = 0;
		player.tallness = 82;
		player.lowerBody.tailVenom = 0;
		player.lowerBody.tailRecharge = 0;
		player.upperBody.wingType = WING.NONE;
		player.upperBody.wingDesc = "non-existant";
		//6' 10"" german-shepherd morph, face ears hands feet tail, the whole nine yards
		player.faceType = FACE.DOG;
		player.lowerBody = LOWER_BODY.DOG;
		player.tailType = TAIL.DOG;
		player.upperBody.head.earType = EARS.DOG;
		////"	"I'm picturing a tall, feminine German-Shepherd morph, solid white and gorgeous. She has both sets of genitals, with no balls, and a large set of breasts. She wields a large claymore and is dressed in a full chain vest and pants. 
		//large claymore (and the strength to use it)
		player.setWeapon(weapons.CLAYMOR);
		player.str = 40;
		//full chain
		player.setArmor(armors.FULLCHN);
		Render.text("As a German-Shepherd morph, the rest of the village never really knew what to do with you... until they sent you through the portal to face whatever's on the other side...");
	}
		
	private customPrismere():void {
		//Specific Character	Female, virgin, high fertility, tight with standard wetness and clit.
		player.createVagina();
		player.lowerBody.vaginaSpot.list[0].clitLength = 0.25;
		player.fertility = 4;
		player.stats.spe += 20;
		Render.text("You're more of a scout than a fighter, but you still feel confident you can handle your responsibilities as champion.  After all, what's to worry about when you can outrun everything you encounter?  You have olive skin, deep red hair, and a demonic tail and wings to blend in with the locals.");
		//Perk is speed, she was a scout, and it'd be neat (if possible) to give her something akin to the Runner perk. She might not start out very strong or tough, but at least she's fast.
		player.createPerk(PerkLib.Fast, 0.25, 0, 0, 0);
		player.createPerk(PerkLib.Runner, 0, 0, 0, 0);
		//In the human world, Prismere began as a scout, helping patrol areas with portals to make sure demonspawn and corruption didn't reach the human homeland. She's gotten herself into a few tight spots because of it, but she's hard to keep pinned down. She has a fiance back in her village whom she fully intends to get back to, so her libido isn't especially high. 
		//As of the time the PC takes her on, she has some signs of demonic taint, so Corruption might start at 5 to 10 points."	"Breasts at E, height at 5'0, a curvy build with a more narrow waist and substantial hips and butt. Skin is olive, like a mocha, hair is long and wildly wavy, a deep red, and eyes are a stormy blue. Muscles are barely visible; what muscle she has is the lean build of a runner, not a fighter. Nipples aren't especially long, but more soft. 
		player.stats.cor = 5;
		player.createBreastRow();
		player.upperBody.chest.list[0].breastRating = 7;
		player.tallness = 60;
		player.lowerBody.hipRating = 8;
		player.lowerBody.butt.buttRating = 8;
		player.thickness = 25;
		player.tone = 40;
		player.skinTone = "olive";
		player.hairLength = 30;
		player.hairColor = "deep red";
		player.femininity = 90;
		//She has a demonic tail and small demonic wings thanks to some encounters early on with succubus milk (that stuff is delicious!) but is otherwise still human.
		player.upperBody.wingType = WING.BAT_LIKE_LARGE;
		player.upperBody.wingDesc = "large, bat-like";
		player.tailType = TAIL.DEMONIC;
		//I feel really weird talking about all this, so if there's anything you need to change or can't do, or if I totally misinterpreted this, just shoot me an email! jordie.wierenga@gmail.com . Thanks in advance... I'm a big fan. "	Prismere
	}
		
	private customRannRayla():void {
		//Specific Character	Virgin female.	Max femininity. Thin with a little muscle. Size C breasts. Long red hair. Light colored skin. 5'5" tall. 	Rann Rayla
		Render.text("You're a young, fiery redhead who\'s utterly feminine.  You've got C-cup breasts and long red hair.  Being a champion can\'t be that bad, right?");
		player.createVagina();
		player.lowerBody.vaginaSpot.list[0].clitLength = 0.25;
		player.createBreastRow();
		player.upperBody.chest.list[0].breastRating = 3;
		player.upperBody.chest.BreastRatingLargest[0].nippleLength = 0.5;
		player.hairLength = 22;
		player.hairColor = "red";
		player.skinTone = "light";
		player.skinDesc = "skin";
		player.skinType = SKIN.PLAIN;
		player.femininity = 100;
		player.thickness = 25;
		player.tone = 65;
		player.tallness = 65;
	}
		
	private customRope():void {
		//529315025394020	Character Creation	Neuter (no genitals) "50-50 masculine-feminine ratio. Shark teeth."	Rope
		Render.text("Despite outward appearances, you're actually something of a neuter, with shark-like teeth, an androgynous face, and a complete lack of genitalia.");
		if(player.lowerBody.cockSpot.hasCock()) player.lowerBody.cockSpot.remove(0,1);
		if(player.lowerBody.vaginaSpot.hasVagina()) player.removeVagina();
		player.gender = 0;
		player.femininity = 50;
		player.faceType = FACE.SHARK_TEETH;
	}
		
	private customSera():void {
		Render.text("You're something of a shemale - three rows of C-cup breasts matched with three, plump, juicy cocks.  Some decent sized balls, bat wings, and cat-like ears round out the package.");
		player.gender = 1;
		player.tou +=2;
		player.str += 3;
		player.fertility = 5;
		player.hairLength= 26;
		player.hairColor = "white";
		player.skinTone = "light";
		player.upperBody.chest.BreastRatingLargest[0].nippleLength = 0.2;
		player.createBreastRow();
		player.createBreastRow();
		player.createBreastRow();
		player.upperBody.chest.list[0].breastRating = 3;
		player.upperBody.chest.list[1].breastRating = 3;
		player.upperBody.chest.list[2].breastRating = 3;
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.list[0].cockLength = 8;
		player.lowerBody.cockSpot.list[0].cockThickness = 1.6;
		player.lowerBody.cockSpot.list[1].cockLength = 8;
		player.lowerBody.cockSpot.list[1].cockThickness = 1.6;
		player.lowerBody.cockSpot.list[2].cockLength = 8;
		player.lowerBody.cockSpot.list[2].cockThickness = 1.6;
		player.lowerBody.balls = 2;
		player.lowerBody.ballSize = 3;
		player.tallness = 113;
		player.tone = 50;
		player.thickness = 50;
		player.femininity = 50;
		player.lowerBody.hipRating = 5;
		player.lowerBody.butt.buttRating = 5;
		player.teaseLevel = 1;
		//Build: average
		//Complexion: light
		//9 foot 5 inches tall
		//Hair: very long white
		//Gift: Lotz of Jizz
		//History: Schooling
		player.cumMultiplier = 5.5;
	
		player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
		player.createPerk(PerkLib.HistoryScholar, 0, 0, 0, 0);
		//Apperance: Cat Ears, Large Bat Like Wings, 3 Rows of breasts (C cub, 0,2 nipples)
		player.upperBody.head.earType = EARS.CAT;
		player.upperBody.wingType = WING.BAT_LIKE_LARGE;
		player.upperBody.wingDesc = "large, bat-like";
		//Items: Katana, Leather Armor
		player.setWeapon(weapons.KATANA);
		player.setArmor(armors.URTALTA);
		//Key Item: Deluxe Dildo
		player.createKeyItem("Deluxe Dildo",0,0,0,0);
	}
		
	private customSiveen():void {
		//Female
		//Virgin
		player.gender = 2;
		player.createVagina();
		player.lowerBody.vaginaSpot.list[0].clitLength = 0.25;
		//has a self-repairing hymen in her cunt"	"Angel
		//(means feathered wings on her back)
		player.upperBody.wingType = WING.HARPY;
		//Halo (Flaming)
		//D-cups
		player.createBreastRow();
		player.upperBody.chest.list[0].breastRating = 4;
		//human skin
		//heart-shaped ass
		player.lowerBody.butt.buttRating = 9;
		player.lowerBody.hipRating = 6;
		//Ass-length white and black hair
		player.hairLength = 30;
		player.hairColor = "white and black";
		//heterochromia (one blue eye one red eye)
		//7"" nips
		player.upperBody.chest.BreastRatingLargest[0].nippleLength = 7;
		//waif thin body
		player.thickness = 0;
		//Fallen Angel gear (complete with flaming sword and light arrows)
		//dark skin tone
		player.skinTone = "dark";
		player.setWeapon(weapons.S_BLADE);
	
		//Elfin ears
		player.upperBody.head.earType = EARS.ELFIN;
		//tight asshole
		//human tongue
		//human face
		//no tail, fur, or scales"
		flags[FlagEnum.HISTORY_PERK_SELECTED] = 0;
		player.str = 25;
		player.tou = 25;
		player.stats.int = 25;
		player.stats.spe = 25;
		Render.text("You are a literal angel from beyond, and you take the place of a vilage's champion for your own reasons...");
	}
		
	private customSora():void {
		//Character Creation	Female,virgin	A kitsune with a snake-like tongue	Sora
		if(player.lowerBody.vaginaSpot.hasVagina()) player.vaginas[0].virgin = true;
		player.tongueType = TONUGE.SNAKE;
		player.upperBody.head.earType = EARS.FOX;
		player.tailType = TAIL.FOX;
		player.lowerBody.tailVenom = 2;
		player.stats.int = 30;
		if(player.findStatusAffect(StatusAffects.BonusVCapacity) < 0) player.statusAffects.add(new StatusAffect("BonusVCapacity",0,0,0,0)));
		else player.addStatusValue(StatusAffects.BonusVCapacity,1,5+rand(10));
		Render.text("As a Kitsune, you always got weird looks, but none could doubt your affinity for magic...");
	}
		
	private customTestChar():void {
		player.XP = 500000;
		player.level = 20;
		player.createBreastRow();
		player.createVagina();
		player.upperBody.chest.list[0].breastRating = 5;
		player.upperBody.chest.list[0].lactationMultiplier = 2;
		
		player.lowerBody.vaginaSpot.list[0].clitLength = 0.5;
		player.fertility = 50;
		player.gender = 2;
		player.lowerBody.hipRating = 6;
		player.lowerBody.butt.buttRating = 6;
		player.str = 100;
		player.tou = 100;
		player.stats.spe = 100;
		player.stats.int = 100;
		player.stats.sens = 100;
		player.stats.lib = 30;
		player.stats.cor = 71;
		kGAMECLASS.notes = "Cheater!";
		player.HP = kGAMECLASS.maxHP();
		player.hairLength = 10;
		player.skinType = SKIN.PLAIN;
		player.faceType = FACE.HUMAN;
		player.tailType = TAIL.FOX;
		player.lowerBody.tailVenom = 4;
		player.tongueType = TONUGE.HUMAN;
		player.femininity = 90;
		player.beardLength = 0;
		player.beardStyle = 0;
		player.tone = 0;
		player.thickness = 100;
		player.skinDesc = "skin";
		player.skinTone = "pale";
		player.hairColor = "black";
		player.lowerBody.balls = 2;
		player.cumMultiplier = 1;
		player.lowerBody.ballSize = 3;
		player.hoursSinceCum = 0;
		player.ass.analLooseness = 0;
		player.ass.analWetness = 0;
		player.ass.fullness = 0;
		player.fertility = 50;
		player.fatigue = 0;
		player.horns = 0;
		player.hornType = HORNS.NONE;
		player.tallness = 109;
		player.lowerBody.tailVenom = 0;
		player.lowerBody.tailRecharge = 0;
		player.upperBody.wingType = WING.DRACONIC_LARGE;
		player.upperBody.wingDesc = "non-existant";
		player.upperBody.head.earType = EARS.HUMAN;
		player.lowerBody = LOWER_BODY.HUMAN;
		player.armType = ARM.HUMAN;
		player.hairLength = 69.2;
		player.upperBody.head.hairType = 4;
		//Bow skill 100 (Sorry Kelt, I can't hear your insults over my mad Robin Hood skillz)
		player.statusAffects.add(new StatusAffect("Kelt",100,0,0,0)));
		player.createKeyItem("Bow", 0, 0, 0, 0);
			
		player.createKeyItem("Zetaz's Map", 0, 0, 0, 0);
			
		inventory.createStorage();
		inventory.createStorage();
		inventory.createStorage();
		inventory.createStorage();
		inventory.createStorage();
		inventory.createStorage();
		player.createKeyItem("Camp - Chest",0,0,0,0);
		player.createKeyItem("Equipment Rack - Weapons",0,0,0,0);
		flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00254] = 1;
		player.createKeyItem("Equipment Rack - Armor",0,0,0,0);
		flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00255] = 1;
		
		player.statusAffects.add(new StatusAffect("KnowsWhitefire", 0, 0, 0, 0)));
			
		player.createPerk(PerkLib.HistoryFighter, 		0, 0, 0, 0);
		player.createPerk(PerkLib.Acclimation, 			0, 0, 0, 0);
		player.createPerk(PerkLib.Berzerker, 			0, 0, 0, 0);
		player.createPerk(PerkLib.BrutalBlows, 			0, 0, 0, 0);
		player.createPerk(PerkLib.DoubleAttack, 		0, 0, 0, 0);
		player.createPerk(PerkLib.ImmovableObject, 		0, 0, 0, 0);
		player.createPerk(PerkLib.LightningStrikes, 	0, 0, 0, 0);
		player.createPerk(PerkLib.LungingAttacks, 		0, 0, 0, 0);
		player.createPerk(PerkLib.Precision, 			0, 0, 0, 0);
		player.createPerk(PerkLib.Regeneration, 		0, 0, 0, 0);
		player.createPerk(PerkLib.Regeneration2,		0, 0, 0, 0);
		player.createPerk(PerkLib.Resistance,			0, 0, 0, 0);
		player.createPerk(PerkLib.Resolute,				0, 0, 0, 0);
		player.createPerk(PerkLib.SpeedyRecovery,		0, 0, 0, 0);
		player.createPerk(PerkLib.Tactician,			0, 0, 0, 0);
		player.createPerk(PerkLib.Tank,					0, 0, 0, 0);
		player.createPerk(PerkLib.Tank2,				0, 0, 0, 0);
		player.createPerk(PerkLib.ThunderousStrikes,	0, 0, 0, 0);
		player.createPerk(PerkLib.WeaponMastery,		0, 0, 0, 0);
		player.createPerk(PerkLib.WellAdjusted,			0, 0, 0, 0);
			
		player.createPerk(PerkLib.SensualLover, 		0, 0, 0, 0);
		player.createPerk(PerkLib.SensualLover, 		0, 0, 0, 0);
			
		flags[FlagEnum.VALARIA_AT_CAMP] = 1;
			
		player.stats.gems += 30000;
		Render.text("You're something of a powerhouse, and you wager that between your odd mutations, power strong enough to threaten the village order, and talents, you're the natural choice to send through the portal.");
			
		player.itemSlot4.unlocked = true;
		player.itemSlot5.unlocked = true;
		player.itemSlot1.setItemAndQty(consumables.P_LBOVA, 5);
		player.itemSlot2.setItemAndQty(consumables.L_PNKEG, 1);
		player.itemSlot3.setItemAndQty(consumables.OVIELIX, 1);
		player.itemSlot4.setItemAndQty(consumables.REPTLUM, 1);
			
		player.statusAffects.add(new StatusAffect("TelAdre", 1, 0, 0, 0)));
		//player.statusAffects.add(new StatusAffect("MetWhitney", 2, 0, 0, 0)));
			
		// Izma
		flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00238] = 1;
			
		// Vapula
		flags[FlagEnum.VAPULA_FOLLOWER] = 1;
			
		// Amily
		flags[FlagEnum.AMILY_FOLLOWER] = 2;
			
		// Jojo
		kGAMECLASS.monk = 5;
			
		// Bimbo Sophie
		flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00282] = 1;
			
		// Isabella
		flags[FlagEnum.ISABELLA_FOLLOWER_ACCEPTED] = 1;
			
		// Latexy
		flags[FlagEnum.GOO_SLAVE_RECRUITED] = 1;
		flags[FlagEnum.GOO_NAME] = "Latexy";
		flags[FlagEnum.GOO_FLUID_AMOUNT] = 100;
		flags[FlagEnum.GOO_HAPPINESS] = 100;
		flags[FlagEnum.GOO_OBEDIENCE] = 100;
			
		// Ceraph
		flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00286] = 1;
			
		// Holli
		flags[FlagEnum.FUCK_FLOWER_LEVEL] = 4;
			
		// Milky
		flags[FlagEnum.MILK_NAME] = "Milky";
		flags[FlagEnum.MILK_SIZE] = 2;
			
		// Rubi Testing
		//flags[FlagEnum.RUBI_SUITCLOTHES] = 1;
		//flags[FlagEnum.RUBI_FETISH_CLOTHES] = 1;
		//flags[FlagEnum.RUBI_GREEN_ADVENTURER] = 1;
		//flags[FlagEnum.RUBI_TUBE_TOP] = 1;
		//flags[FlagEnum.RUBI_BODYSUIT] = 1;
		//flags[FlagEnum.RUBI_LONGDRESS] = 1;
		//flags[FlagEnum.RUBI_TIGHT_PANTS] = 1;
		//flags[FlagEnum.RUBI_NURSE_CLOTHES] = 1;
		//flags[FlagEnum.RUBI_SWIMWEAR] = 1;
		//flags[FlagEnum.RUBI_BIMBO_MINIDRESS] = 1;
		//flags[FlagEnum.RUBI_BONDAGE_STRAPS] = 1;
		//flags[FlagEnum.RUBI_INQUISITORS_CORSET] = 1;
		flags[FlagEnum.RUBI_AFFECTION] = 75;
		flags[FlagEnum.RUBI_INTRODUCED] = 1;
			
		// Bazaar
		flags[FlagEnum.BAZAAR_ENTERED] = 1;
	}
		
	private customTyriana():void {
		Render.text("Your many, posh tits, incredible fertility, and well-used cunt made you more popular than the village bicycle.  With your cat-like ears, paws, and tail, you certainly had a feline appeal.  It's time to see how you fare in the next chapter of your life.");
		//"Gender: Female
		player.gender = 2;
		//Vagina: Ridiculously loose, 3 inch clitoris, dripping constantly, fertile like a bunny on steroids and non-virgin
		player.createVagina();
		player.lowerBody.vaginaSpot.list[0].clitLength = 3;
		player.vaginas[0].vaginalWetness = VAGINA_WETNESS.DROOLING;
		player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.LEVEL_CLOWN_CAR;
		player.vaginas[0].virgin = false;
		player.fertility = 50;
		//Butt: Just as loose
		player.ass.analLooseness = 5;
		//"Skin: Tanned
		player.skinTone = "tan";
		//Hair: Ridiculously long red
		player.hairLength = 80;
		player.hairColor = "red";
		//Face: Gorgeous Feminine, long demonic tongue, cat ears
		player.femininity = 100;
		player.tongueType = TONUGE.DEMONIC;
		player.upperBody.head.earType = EARS.CAT;
		//Body: Very muscular, average weight, plump ass, above average thighs, cat tail and cat paws
		player.tone = 80;
		player.thickness = 50;
		player.lowerBody.butt.buttRating = 12;
		player.lowerBody.hipRating = 10;
		player.tailType = TAIL.CAT;
		player.lowerBody = LOWER_BODY.CAT;
		//Breasts: 2 E-cups on top, 2 DD-cups mid, 2 D-cups bottom, 3.5 inch nipples
		player.createBreastRow();
		player.createBreastRow();
		player.createBreastRow();
		player.tallness = 67;
		player.upperBody.chest.list[0].breastRating = 7;
		player.upperBody.chest.list[1].breastRating = 5;
		player.upperBody.chest.list[2].breastRating = 4;
		player.upperBody.chest.BreastRatingLargest[0].nippleLength = 3.5;
		//Perks: Slut and Fertile"	
			
		player.stats.spe+=3;
		player.stats.int+=2;
	
		player.createPerk(PerkLib.HistorySlut, 0, 0, 0, 0);
		player.createPerk(PerkLib.Fertile, 1.5, 0, 0, 0);
		player.teaseLevel = 3;
	}
		
	private customVahdunbrii():void {
		player.createBreastRow();
		player.createVagina();
		player.upperBody.chest.list[0].breastRating = 3;
		player.lowerBody.vaginaSpot.list[0].clitLength = .5;
		player.fertility = 10;
		player.gender = 2;
		player.lowerBody.hipRating = 6;
		player.lowerBody.butt.buttRating = 6;
		player.str = 15;
		player.tou = 15;
		player.stats.spe = 18;
		player.stats.int = 17;
		player.stats.sens = 15;
		player.stats.lib = 15;
		player.stats.cor = 0;
		kGAMECLASS.notes = "No Notes Available.";
		player.HP = kGAMECLASS.maxHP();
		player.hairLength = 10;
		player.skinType = SKIN.PLAIN;
		player.faceType = FACE.HUMAN;
		player.tailType = TAIL.NONE;
		player.tongueType = TONUGE.HUMAN;
		player.femininity = 70;
		player.beardLength = 0;
		player.beardStyle = 0;
		player.tone = 30;
		player.thickness = 50;
		player.skinDesc = "skin";
		player.skinTone = "light";
		player.hairColor = "brown";
		player.lowerBody.balls = 0;
		player.cumMultiplier = 1;
		player.lowerBody.ballSize = 0;
		player.hoursSinceCum = 0;
		player.lowerBody.vaginaSpot.list[0].clitLength = 0;
		player.ass.analLooseness = 0;
		player.ass.analWetness = 0;
		player.ass.fullness = 0;
		player.fertility = 5;
		player.fatigue = 0;
		player.horns = 0;
		player.tallness = 67;
		player.lowerBody.tailVenom = 0;
		player.lowerBody.tailRecharge = 0;
		player.upperBody.wingType = WING.NONE;
		player.upperBody.wingDesc = "non-existant";
		player.upperBody.head.earType = EARS.CAT;
		player.lowerBody = LOWER_BODY.CAT;
		player.tailType = TAIL.CAT;
		player.createPerk(PerkLib.Incorporeality,0,0,0,0);
		player.upperBody.wingType = WING.FEATHERED_LARGE;
		player.armType = ARM.HARPY;
		player.hornType = HORNS.DRACONIC_X2;
		player.horns = 4;
		player.faceType = FACE.SPIDER_FANGS;
		player.hairLength = 69.2;
		player.hairColor = "dark blue";
		player.upperBody.head.hairType = 2;
		player.skinAdj = "smooth";
		player.skinTone = "sanguine";
		player.tallness = 68;
		player.lowerBody.hipRating = 7;
		player.lowerBody.butt.buttRating = 6;
		player.thickness = 4;
		player.tone = 98;
		player.upperBody.chest.list[0].breastRating = 3;
		player.lowerBody.vaginaSpot.list[0].clitLength = 0.2;
		player.femininity = 85;
		//Beautiful Sword
		player.setWeapon(weapons.B_SWORD);
		player.setArmor(armors.SSARMOR);
		//Bow skill 100 (Sorry Kelt, I can't hear your insults over my mad Robin Hood skillz)
		player.statusAffects.add(new StatusAffect("Kelt",100,0,0,0)));
		player.createKeyItem("Bow",0,0,0,0);
		inventory.createStorage();
		inventory.createStorage();
		inventory.createStorage();
		inventory.createStorage();
		inventory.createStorage();
		inventory.createStorage();
		player.createKeyItem("Camp - Chest",0,0,0,0);
		player.createKeyItem("Equipment Rack - Weapons",0,0,0,0);
		flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00254] = 1;
		player.createKeyItem("Equipment Rack - Armor",0,0,0,0);
		flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00255] = 1;
		//(Flexibility), (Incorporeality), History: Religious, Dragonfire, Brood Mother, Magical Fertility, Wet Pussy, Tough, Strong, Fast, Smart, History: Scholar, History: Slacker, Strong Back, Strong Back 2: Stronger Harder
		player.createPerk(PerkLib.Flexibility, 0, 0, 0, 0);
		player.createPerk(PerkLib.HistoryReligious, 0, 0, 0, 0);
		player.createPerk(PerkLib.Dragonfire, 0, 0, 0, 0);
		player.createPerk(PerkLib.BroodMother, 0, 0, 0, 0);
		player.createPerk(PerkLib.Fertile, 1.5, 0, 0, 0);
		player.vaginas[0].vaginalWetness = VAGINA_WETNESS.WET;
		player.createPerk(PerkLib.WetPussy,2,0,0,0);
		player.createPerk(PerkLib.Tough, 0.25, 0, 0, 0);
		player.createPerk(PerkLib.Strong, 0.25, 0, 0, 0);
		player.createPerk(PerkLib.Fast, 0.25, 0, 0, 0);
		player.createPerk(PerkLib.Smart, 0.25, 0, 0, 0);
		player.createPerk(PerkLib.HistoryScholar, 0, 0, 0, 0);
		player.createPerk(PerkLib.StrongBack,0,0,0,0);
		player.itemSlot4.unlocked = true;
		player.itemSlot5.unlocked = true;
		player.createPerk(PerkLib.StrongBack2,0,0,0,0);
		player.createPerk(PerkLib.HistorySlacker,0,0,0,0);
		player.str += 4;
		player.tou += 4;
		player.stats.int += 2;
		player.stats.spe += 2;
		player.stats.gems += 300;
		Render.text("You're something of a powerhouse, and you wager that between your odd mutations, power strong enough to threaten the village order, and talents, you're the natural choice to send through the portal.");
	}
}
