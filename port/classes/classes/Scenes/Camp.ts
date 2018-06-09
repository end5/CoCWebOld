﻿	export class Camp extends NPCAwareContent{

		protected function set timeQ(value: number):void
		{
			kGAMECLASS.timeQ = value;
		}

		private get campQ(): boolean
		{
			return kGAMECLASS.campQ;
		}
		private set campQ(value: boolean):void
		{
			kGAMECLASS.campQ = value;
		}

		protected function hasItemInStorage(itype:ItemType): boolean
		{
			return kGAMECLASS.inventory.hasItemInStorage(itype);
		}
/*
		protected function hasItemsInStorage(): boolean
		{
			return kGAMECLASS.inventory.hasItemsInStorage();
		}
		protected function hasItemsInRacks(armor: boolean = false): boolean
		{
			return kGAMECLASS.inventory.hasItemsInRacks(armor);
		}
*/

		public Camp(campInitialize:Function) {
			campInitialize(doCamp); //Pass the doCamp function up to CoC. This way doCamp is private but the CoC class itself can call it.
		}
		
/* Replaced with calls to playerMenu
		public campMenu():void {
			kGAMECLASS.eventParser(1);
		}
*/
		
		public returnToCamp(timeUsed: number):void {
			clearOutput();
			if (timeUsed == 1)
				outputText("An hour passes...\n");
			else outputText(Num2Text(timeUsed) + " hours pass...\n");
			if (!getGame().inCombat) spriteSelect(-1);
			hideMenus();
			timeQ = timeUsed;
			goNext(timeUsed, false);
		}
		
		public returnToCampUseOneHour():void { returnToCamp(1); } //Replacement for event number 13;
		
		public returnToCampUseTwoHours():void { returnToCamp(2); } //Replacement for event number 14;
		
		public returnToCampUseFourHours():void { returnToCamp(4); } //Replacement for event number 15;
		
		public returnToCampUseEightHours():void { returnToCamp(8); } //Replacement for event number 16;
		
//  SLEEP_WITH: number = 701;

private doCamp():void { //Only called by playerMenu
	//trace("Current fertility: " + player.totalFertility());
	mainView.showMenuButton( MainView.MENU_NEW_MAIN );
	if(player.findStatusAffect(StatusAffects.PostAkbalSubmission) >= 0) {
		player.removeStatusAffect(StatusAffects.PostAkbalSubmission);
		kGAMECLASS.forest.akbalScene.akbalSubmissionFollowup();
		return;
	}
	if(player.findStatusAffect(StatusAffects.PostAnemoneBeatdown) >= 0) {
		HPChange(Math.round(player.maxHP()/2),false);
		player.removeStatusAffect(StatusAffects.PostAnemoneBeatdown);
	}
	//make sure gameState is cleared if coming from combat or giacomo
	getGame().inCombat = false;
/* Can't happen - playerMenu will call dungeon appropriate menu instead of doCamp while inDungeon is true
	if (kGAMECLASS.inDungeon) {
		mainView.showMenuButton( MainView.MENU_DATA );
		mainView.showMenuButton( MainView.MENU_APPEARANCE );
		kGAMECLASS.playerMenu();
		return;
	}
*/
	//Clear out Izma's saved loot status
	flags[kFLAGS.BONUS_ITEM_AFTER_COMBAT_ID] = "";
	//History perk backup
	if (flags[kFLAGS.HISTORY_PERK_SELECTED] == 0) {
		flags[kFLAGS.HISTORY_PERK_SELECTED] = 2;
		hideMenus();
		getGame().charCreation.chooseHistory();
//		fixHistory();
		return;
	}
	if(!marbleScene.marbleFollower())
	{
		if(flags[kFLAGS.MARBLE_LEFT_OVER_CORRUPTION] == 1 && player.cor <= 40)
		{
			hideMenus();
			marblePurification.pureMarbleDecidesToBeLessOfABitch();
			return;
		}
	}
	if(marbleScene.marbleFollower())
	{
		//Cor < 50
		//No corrupt: Jojo, Amily, or Vapula
		//Purifying Murble
		if(player.cor < 50 && !campCorruptJojo() && !amilyScene.amilyCorrupt() && !vapulaSlave() 
			&& flags[kFLAGS.MARBLE_PURIFICATION_STAGE] == 0 && flags[kFLAGS.MARBLE_COUNTUP_TO_PURIFYING] >= 200
			&& player.findPerk(PerkLib.MarblesMilk) < 0)
		{
			hideMenus();
			marblePurification.BLUHBLUH();
			return;
		}
		if(flags[kFLAGS.MARBLE_PURIFICATION_STAGE] >= 5)
		{
			if(flags[kFLAGS.MARBLE_WARNED_ABOUT_CORRUPTION] == 0 && player.cor >= 50)
			{
				hideMenus();
				marblePurification.marbleWarnsPCAboutCorruption();
				return;
			}
			if(flags[kFLAGS.MARBLE_WARNED_ABOUT_CORRUPTION] == 1 && flags[kFLAGS.MARBLE_LEFT_OVER_CORRUPTION] == 0 && player.cor >= 60)
			{
				hideMenus();
				marblePurification.marbleLeavesThePCOverCorruption();
				return;
			}
		}
		if(flags[kFLAGS.MARBLE_RATHAZUL_COUNTER_1] == 1 && (time.hours == 6 || time.hours == 7))
		{
			hideMenus();
			marblePurification.rathazulsMurbelReport();
			return;
		}
		if(flags[kFLAGS.MARBLE_RATHAZUL_COUNTER_2] == 1)
		{
			hideMenus();
			marblePurification.claraShowsUpInCampBECAUSESHESACUNT();
			return;
		}
	}
	if(arianFollower() && flags[kFLAGS.ARIAN_MORNING] == 1) {
		hideMenus();
		arianScene.wakeUpAfterArianSleep();
		return;
	}
	if(arianFollower() && flags[kFLAGS.ARIAN_EGG_EVENT] >= 30) {
		hideMenus();
		arianScene.arianEggingEvent();
		return;
	}
	if(arianFollower() && flags[kFLAGS.ARIAN_EGG_COUNTER] >= 24 && flags[kFLAGS.ARIAN_VAGINA] > 0) {
		hideMenus();
		arianScene.arianLaysEggs();
		return;
	}
	if(flags[kFLAGS.JACK_FROST_PROGRESS] > 0) {
		hideMenus();
		kGAMECLASS.processJackFrostEvent();
		return;
	}
	if(player.hasKeyItem("Super Reducto") < 0 && milkSlave() && player.findStatusAffect(StatusAffects.CampRathazul) >= 0 && player.statusAffectv2(StatusAffects.MetRathazul) >= 4) {
		hideMenus();
		milkWaifu.ratducto();
		return;
	}
	if(kGAMECLASS.nieveHoliday() && model.time.hours == 6) {
		if(player.hasKeyItem("Nieve's Tear") >= 0 && flags[kFLAGS.NIEVE_STAGE] != 5)
		{
			kGAMECLASS.returnOfNieve();
			hideMenus();
			return;
		}
		else if(flags[kFLAGS.NIEVE_STAGE] == 0) {
			hideMenus();
			kGAMECLASS.snowLadyActive();
			return;
		}
		else if(flags[kFLAGS.NIEVE_STAGE] == 4) {
			hideMenus();
			kGAMECLASS.nieveComesToLife();
			return;
		}
	}
	if (kGAMECLASS.helScene.followerHel()) {
		if (helFollower.isHeliaBirthday() && flags[kFLAGS.HEL_FOLLOWER_LEVEL] >= 2 && flags[kFLAGS.HELIA_BIRTHDAY_OFFERED] == 0) {
			hideMenus();
			helFollower.heliasBirthday();
			return;
		}
		if (kGAMECLASS.helScene.pregnancy.isPregnant) {
			switch (kGAMECLASS.helScene.pregnancy.eventTriggered()) {
				case 2: hideMenus();
						helSpawnScene.bulgyCampNotice();
						return;
				case 3: hideMenus();
						helSpawnScene.heliaSwollenNotice();
						return;
				case 4: hideMenus();
						helSpawnScene.heliaGravidity();
						return;
				default:
						if (kGAMECLASS.helScene.pregnancy.incubation == 0 && (model.time.hours == 6 || model.time.hours == 7)) {
							hideMenus();
							helSpawnScene.heliaBirthtime();
							return;
						}
			}
		}
	}
	if(flags[kFLAGS.HELSPAWN_AGE] == 1 && flags[kFLAGS.HELSPAWN_GROWUP_COUNTER] == 7) {
		hideMenus();
		helSpawnScene.helSpawnGraduation();
		return;
	}
	if(model.time.hours >= 10 && model.time.hours <= 18 && (model.time.days % 20 == 0 || model.time.hours == 12) && flags[kFLAGS.HELSPAWN_DADDY] == 2 && helSpawnScene.helspawnFollower()) {
		hideMenus();
		helSpawnScene.maiVisitsHerKids();
		return;
	}
	if(model.time.hours == 6 && flags[kFLAGS.HELSPAWN_DADDY] == 1 && model.time.days % 30 == 0 && flags[kFLAGS.SPIDER_BRO_GIFT] == 0 && helSpawnScene.helspawnFollower())
	{
		hideMenus();
		helSpawnScene.spiderBrosGift();
		return;
	}
	if(model.time.hours >= 10 && model.time.hours <= 18 && (model.time.days % 15 == 0 || model.time.hours == 12) && helSpawnScene.helspawnFollower() && flags[kFLAGS.HAKON_AND_KIRI_VISIT] == 0) {
		hideMenus();
		helSpawnScene.hakonAndKiriComeVisit();
		return;
	}
	if(flags[kFLAGS.HELSPAWN_AGE] == 2 && flags[kFLAGS.HELSPAWN_DISCOVER_BOOZE] == 0 && (rand(10) == 0 || flags[kFLAGS.HELSPAWN_GROWUP_COUNTER] == 6)) {
		hideMenus();
		helSpawnScene.helspawnDiscoversBooze();
		return;
	}
	if(flags[kFLAGS.HELSPAWN_AGE] == 2 && flags[kFLAGS.HELSPAWN_WEAPON] == 0 && flags[kFLAGS.HELSPAWN_GROWUP_COUNTER] == 3 && model.time.hours >= 10 && model.time.hours <= 18) {
		hideMenus();
		helSpawnScene.helSpawnChoosesAFightingStyle();
		return;
	}
	if(flags[kFLAGS.HELSPAWN_AGE] == 2 && (model.time.hours == 6 || model.time.hours == 7) && flags[kFLAGS.HELSPAWN_GROWUP_COUNTER] == 7 && flags[kFLAGS.HELSPAWN_FUCK_INTERRUPTUS] == 1) {
		helSpawnScene.helspawnAllGrownUp();
		return;
	}
	if((sophieFollower() || bimboSophie()) && flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] == 1) {
		flags[kFLAGS.SOPHIE_DAUGHTER_MATURITY_COUNTER] = 0;
		sophieBimbo.sophieKidMaturation();
		hideMenus();
		return;
	}
	//Bimbo Sophie Move In Request!
	if (bimboSophie() && flags[kFLAGS.SOPHIE_BROACHED_SLEEP_WITH] == 0 && sophieScene.pregnancy.event >= 2)
	{
		hideMenus();
		sophieBimbo.sophieMoveInAttempt();
		return;
	}
	if(!kGAMECLASS.nieveHoliday() && model.time.hours == 6 && flags[kFLAGS.NIEVE_STAGE] > 0) {
		kGAMECLASS.nieveIsOver();
		return;
	}
	//Amily followup!
	if(flags[kFLAGS.PC_PENDING_PREGGERS] == 1) {
		kGAMECLASS.amilyScene.postBirthingEndChoices();
		flags[kFLAGS.PC_PENDING_PREGGERS] = 2;
		return;
	}
	if(timeQ > 0) {
		if(!campQ) {
			outputText("More time passes...\n", true);
			goNext(timeQ, false);
			return;
		}
		else {
			if (model.time.hours < 6 || model.time.hours > 20) {
				doSleep();
			}
			else {
				rest();
			}
			return;
		}
	}
	if(flags[kFLAGS.FUCK_FLOWER_KILLED] == 0 && flags[kFLAGS.CORRUPT_MARAE_FOLLOWUP_ENCOUNTER_STATE] > 0) {
		if(flags[kFLAGS.FUCK_FLOWER_LEVEL] == 0 && flags[kFLAGS.FUCK_FLOWER_GROWTH_COUNTER] >= 8) {
			holliScene.getASprout();
			hideMenus();
			return;
		}
		if(flags[kFLAGS.FUCK_FLOWER_LEVEL] == 1 && flags[kFLAGS.FUCK_FLOWER_GROWTH_COUNTER] >= 7) {
			holliScene.fuckPlantGrowsToLevel2();
			hideMenus();
			return;
		}
		if(flags[kFLAGS.FUCK_FLOWER_LEVEL] == 2 && flags[kFLAGS.FUCK_FLOWER_GROWTH_COUNTER] >= 25) {
			holliScene.flowerGrowsToP3();
			hideMenus();
			return;
		}
		//Level 4 growth
		if(flags[kFLAGS.FUCK_FLOWER_LEVEL] == 3 && flags[kFLAGS.FUCK_FLOWER_GROWTH_COUNTER] >= 40) {
			holliScene.treePhaseFourGo();
			hideMenus();
			return;
		}
	}
	//Jojo treeflips!
	if(flags[kFLAGS.FUCK_FLOWER_LEVEL] >= 4 && flags[kFLAGS.FUCK_FLOWER_KILLED] == 0 && player.findStatusAffect(StatusAffects.PureCampJojo) >= 0) {
		holliScene.JojoTransformAndRollOut();
		hideMenus();
		return;
	}
	//Amily flips out
	if(amilyScene.amilyFollower() && !amilyScene.amilyCorrupt() && flags[kFLAGS.FUCK_FLOWER_LEVEL] >= 4 && flags[kFLAGS.FUCK_FLOWER_KILLED] == 0) {
		holliScene.amilyHatesTreeFucking();
		hideMenus();
		return;
	}
	if(flags[kFLAGS.FUCK_FLOWER_KILLED] == 1 && flags[kFLAGS.AMILY_TREE_FLIPOUT] == 1 && !amilyScene.amilyFollower() && flags[kFLAGS.AMILY_VISITING_URTA] == 0) {
		holliScene.amilyComesBack();
		flags[kFLAGS.AMILY_TREE_FLIPOUT] = 2;
		hideMenus();
		return;
	}
	//Anemone birth followup!
	if(player.findStatusAffect(StatusAffects.CampAnemoneTrigger) >= 0) {
		player.removeStatusAffect(StatusAffects.CampAnemoneTrigger);
		anemoneScene.anemoneKidBirthPtII();
		hideMenus();
		return;
	}
	//Exgartuan clearing
	if(player.statusAffectv1(StatusAffects.Exgartuan) == 1 && (player.cockArea(0) < 100 || player.cocks.length == 0)) {
		exgartuanCampUpdate();
		return;
	}
	else if(player.statusAffectv1(StatusAffects.Exgartuan) == 2 && player.biggestTitSize() < 12) {
		exgartuanCampUpdate();
		return;
	}
	//Izzys tits asplode
	if(isabellaFollower() && flags[kFLAGS.ISABELLA_MILKED_YET] >= 10 && player.hasKeyItem("Breast Milker - Installed At Whitney's Farm") >= 0) {
		isabellaFollowerScene.milktasticLacticLactation();
		hideMenus();
		return;
	}
	//Marble meets follower izzy when moving in
	if(flags[kFLAGS.ISABELLA_MURBLE_BLEH] == 1 && isabellaFollower() && player.findStatusAffect(StatusAffects.CampMarble) >= 0) {
		isabellaFollowerScene.angryMurble();
		hideMenus();
		return;
	}
	//Cotton preg freakout
	if (player.pregnancyIncubation <= 280 && player.pregnancyType == PregnancyStore.PREGNANCY_COTTON &&
	   	flags[kFLAGS.COTTON_KNOCKED_UP_PC_AND_TALK_HAPPENED] == 0 && (model.time.hours == 6 || model.time.hours == 7)) {
		kGAMECLASS.telAdre.cotton.goTellCottonShesAMomDad();
		hideMenus();
		return;
	}
	//Bimbo Sophie finds ovi elixer in chest!
	if(bimboSophie() && hasItemInStorage(consumables.OVIELIX) && rand(5) == 0 && flags[kFLAGS.TIMES_SOPHIE_HAS_DRUNK_OVI_ELIXIR] == 0 && player.gender > 0) {
		sophieBimbo.sophieEggApocalypse();
		hideMenus();
		return;
	}
	//Amily + Urta freakout!
	if(!kGAMECLASS.urtaQuest.urtaBusy() && flags[kFLAGS.AMILY_VISITING_URTA] == 0 && rand(10) == 0 && flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00146] >= 0 && flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00147] == 0 && flags[kFLAGS.AMILY_NEED_TO_FREAK_ABOUT_URTA] == 1 && amilyScene.amilyFollower() && flags[kFLAGS.AMILY_FOLLOWER] == 1 && !amilyScene.pregnancy.isPregnant) {
		finter.amilyUrtaReaction();
		hideMenus();
		return;
	}
	//Find jojo's note!
	if(flags[kFLAGS.JOJO_FIXED_STATUS] == 1 && flags[kFLAGS.AMILY_BLOCK_COUNTDOWN_BECAUSE_CORRUPTED_JOJO] == 0) {
		finter.findJojosNote();
		hideMenus();
		return;
	}
	//Rathazul freaks out about jojo
	if(flags[kFLAGS.RATHAZUL_CORRUPT_JOJO_FREAKOUT] == 0 && rand(5) == 0 && player.findStatusAffect(StatusAffects.CampRathazul) >= 0 && campCorruptJojo()) {
		finter.rathazulFreaksOverJojo();
		hideMenus();
		return;
	}
	//Izma/Marble freakout - marble moves in
	if(flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00237] == 1) {
		izmaScene.newMarbleMeetsIzma();
		hideMenus();
		return;
	}
	//Izma/Amily freakout - Amily moves in
	if(flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00236] == 1) {
		izmaScene.newAmilyMeetsIzma();
		hideMenus();
		return;
	}
	//Amily/Marble Freakout
	if(flags[kFLAGS.AMILY_NOT_FREAKED_OUT] == 0 && player.findStatusAffect(StatusAffects.CampMarble) >= 0 && flags[kFLAGS.AMILY_FOLLOWER] == 1 && amilyScene.amilyFollower() && marbleScene.marbleAtCamp()) {
		finter.marbleVsAmilyFreakout();
		hideMenus();
		return;
	}
	//Amily and/or Jojo freakout about Vapula!!
	if(vapulaSlave() && (player.findStatusAffect(StatusAffects.PureCampJojo) >= 0 || (amilyScene.amilyFollower() && !amilyScene.amilyCorrupt()))) {
		//Jojo but not Amily
		if(player.findStatusAffect(StatusAffects.PureCampJojo) >= 0 && !(amilyScene.amilyFollower() && !amilyScene.amilyCorrupt()))
			vapula.mouseWaifuFreakout(false,true);
		//Amily but not Jojo
		else if((amilyScene.amilyFollower() && !amilyScene.amilyCorrupt())) vapula.mouseWaifuFreakout(true,false);
		//Both
		else vapula.mouseWaifuFreakout(true,true);
		hideMenus();
		return;
	}
	//Go through Helia's first time move in interactions if  you haven't yet.
	if(flags[kFLAGS.HEL_FOLLOWER_LEVEL] == 2 && kGAMECLASS.helScene.followerHel() && flags[kFLAGS.HEL_INTROS_LEVEL] == 0) {
		helFollower.helFollowersIntro();
		hideMenus();
		return;
	}
	//If you've gone through Hel's first time actions and Issy moves in without being okay with threesomes.
	if(flags[kFLAGS.HEL_INTROS_LEVEL] > 9000 && kGAMECLASS.helScene.followerHel() && isabellaFollower() && flags[kFLAGS.HEL_ISABELLA_THREESOME_ENABLED] == 0) {
		helFollower.angryHelAndIzzyCampHelHereFirst();
		hideMenus();
		return;		
	}
	//Reset.
	flags[kFLAGS.CAME_WORMS_AFTER_COMBAT] = 0;
	campQ = false;
	//Build explore menus
	var placesEvent:Function = (placesKnown() ? places : null);
	var followers:Function = null;
	var lovers:Function = null;
	var slaves:Function = null;
	var storage:Function = null;
	if (inventory.showStash()) storage = inventory.stash;
	//Clear stuff
	if(player.findStatusAffect(StatusAffects.SlimeCravingOutput) >= 0) player.removeStatusAffect(StatusAffects.SlimeCravingOutput);
	//Reset luststick display status (see event parser)
	flags[kFLAGS.PC_CURRENTLY_LUSTSTICK_AFFECTED] = 0;
	//Display Proper Buttons
	mainView.showMenuButton( MainView.MENU_APPEARANCE );
	mainView.showMenuButton( MainView.MENU_PERKS );
	mainView.showMenuButton( MainView.MENU_STATS );
	mainView.showMenuButton( MainView.MENU_DATA );
	showStats();
	//Change settings of new game buttons to go to main menu
	mainView.setMenuButton( MainView.MENU_NEW_MAIN, "Main Menu", kGAMECLASS.mainMenu );

	//clear up/down arrows
	hideUpDown();
	//Level junk
	if(player.XP >= (player.level) * 100 || player.perkPoints > 0) {
		if(player.XP < player.level * 100)
			mainView.setMenuButton( MainView.MENU_LEVEL, "Perk Up" );
		else
			mainView.setMenuButton( MainView.MENU_LEVEL, "Level Up" );
		mainView.showMenuButton( MainView.MENU_LEVEL );
		mainView.statsView.showLevelUp();
	}
	else {
		mainView.hideMenuButton( MainView.MENU_LEVEL );
		mainView.statsView.hideLevelUp();
	}
	//Build main menu
	var exploreEvent:Function = getGame().exploration.doExplore;
	var masturbate:Function = (player.lust > 30 ? getGame().masturbation.masturbateMenu : null);
	clearOutput();
	
	outputText(images.showImage("camping"), false);
	//Isabella upgrades camp level!


	if(isabellaFollower()) {
		outputText("Your campsite got a lot more comfortable once Isabella moved in.  Carpets cover up much of the barren ground, simple awnings tied to the rocks provide shade, and hand-made wooden furniture provides comfortable places to sit and sleep.", false);
		if(model.time.days >= 20) outputText("  You've even managed to carve some artwork into the rocks around the camp's perimeter.", false);
	}
	//Live in-ness
	else {
		if(model.time.days < 10) outputText("Your campsite is fairly simple at the moment.  Your tent and bedroll are set in front of the rocks that lead to the portal.  You have a small fire pit as well.", false);
		else if(model.time.days < 20) outputText("Your campsite is starting to get a very 'lived-in' look.  The fire-pit is well defined with some rocks you've arranged around it, and your bedroll and tent have been set up in the area most sheltered by rocks.", false);
		else outputText("Your new home is as comfy as a camp site can be.  The fire-pit and tent are both set up perfectly, and in good repair, and you've even managed to carve some artwork into the rocks around the camp's perimeter.", false);
	}
	if(flags[kFLAGS.CLARA_IMPRISONED] > 0) 
	{
		marblePurification.claraCampAddition();
	}
	//Nursery
	if(flags[kFLAGS.MARBLE_NURSERY_CONSTRUCTION] == 100 && player.findStatusAffect(StatusAffects.CampMarble) >= 0) {
		outputText("  Marble has built a fairly secure nursery amongst the rocks to house your ",false);
		if(flags[kFLAGS.MARBLE_KIDS] == 0) outputText("future children", false);
		else {
			outputText(num2Text(flags[kFLAGS.MARBLE_KIDS]) + " child", false);
			if(flags[kFLAGS.MARBLE_KIDS] > 1) outputText("ren", false);
		}
		outputText(".", false);
	}
	//HARPY ROOKERY
	if(flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] > 0) {
		//Rookery Descriptions (Short)
		//Small (1 mature daughter)
		if(flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] == 1) {
			outputText("  There's a smallish harpy nest that your daughter has built up with rocks piled high near the fringes of your camp.  It's kind of pathetic, but she seems proud of her accomplishment.");
		}
		//Medium (2-3 mature daughters)
		else if(flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] <= 3) {
			outputText("  There's a growing pile of stones built up at the fringes of your camp.  It's big enough to be considered a small hill by this point, dotted with a couple small harpy nests just barely big enough for two.");
		}
		//Big (4 mature daughters)
		else if(flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] <= 4) {
			outputText("  The harpy rookery at the edge of camp has gotten pretty big.  It's taller than most of the standing stones that surround the portal, and there's more nests than harpies at this point.  Every now and then you see the four of them managing a boulder they dragged in from somewhere to add to it.");
		}
		//Large (5-10 mature daughters)
		else if(flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] <= 10) {
			outputText("  The rookery has gotten quite large.  It stands nearly two stories tall at this point, dotted with nests and hollowed out places in the center.  It's surrounded by the many feathers the assembled harpies leave behind.");
		}
		//Giant (11-20 mature daughters)
		else if(flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] <= 20) {
			outputText("  A towering harpy rookery has risen up at the fringes of your camp, filled with all of your harpy brood.  It's at least three stories tall at this point, and it has actually begun to resemble a secure structure.  These harpies are always rebuilding and adding onto it.");
		}
		//Massive (31-50 mature daughters)
		else if(flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] <= 50) {
			outputText("  A massive harpy rookery towers over the edges of your camp.  It's almost entirely built out of stones that are fit seamlessly into each other, with many ledges and overhangs for nests.  There's a constant hum of activity over there day or night.");
		}
		//Immense (51+ Mature daughters)
		else {
			outputText("  An immense harpy rookery dominates the edge of your camp, towering over the rest of it.  Innumerable harpies flit around it, always working on it, assisted from below by the few sisters unlucky enough to be flightless.");
		}
	}
	//Traps
	if(player.findStatusAffect(StatusAffects.DefenseCanopy) >= 0) {
		outputText("  A thorny tree has sprouted near the center of the camp, growing a protective canopy of spiky vines around the portal and your camp.", false);
	}
	else outputText("  You have a number of traps surrounding your makeshift home, but they are fairly simple and may not do much to deter a demon.", false);
	outputText("  The portal shimmers in the background as it always does, looking menacing and reminding you of why you came.\n\n", false);

	//Ember's anti-minotaur crusade!
	if(flags[kFLAGS.EMBER_CURRENTLY_FREAKING_ABOUT_MINOCUM] == 1) {
		//Modified Camp Description
		outputText("Since Ember began " + emberMF("his","her") + " 'crusade' against the minotaur population, skulls have begun to pile up on either side of the entrance to " + emberScene.emberMF("his","her") + " den.  There're quite a lot of them.\n\n");
	}
	//Dat tree!
	if(flags[kFLAGS.FUCK_FLOWER_LEVEL] >= 4 && flags[kFLAGS.FUCK_FLOWER_KILLED] == 0) {
		outputText("On the outer edges, half-hidden behind a rock, is a large, very healthy tree.  It grew fairly fast, but seems to be fully developed now.  Holli, Marae's corrupt spawn, lives within.\n\n");
	}
	if(flags[kFLAGS.CLARA_IMPRISONED] > 0)
	{
		//claraCampAddition();
	}
	//BIMBO SOPHAH
	if(bimboSophie() && flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0) sophieBimbo.sophieCampLines();
	if(player.findStatusAffect(StatusAffects.CampMarble) >= 0) {
		temp = rand(5);
		outputText("A second bedroll rests next to yours; a large two-handed hammer sometimes rests against it, depending on whether or not its owner needs it at the time.  ", false);
		//Marble is out!
		if(flags[kFLAGS.MARBLE_PURIFICATION_STAGE] == 4) outputText("Marble isn’t here right now; she’s still off to see her family.");
		//requires at least 1 kid, time is just before sunset, this scene always happens at this time if the PC has at least one kid.
		else if(flags[kFLAGS.MARBLE_KIDS] >= 1 && (model.time.hours == 19 || model.time.hours == 20)) {
			outputText("Marble herself is currently in the nursery, putting your ");
			if(flags[kFLAGS.MARBLE_KIDS] == 1) outputText("child");
			else outputText("children");
			outputText(" to bed.");
		}
		//at 6-7 in the morning, scene always displays at this time
		else if(model.time.hours == 6 || model.time.hours == 7) outputText("Marble is off in an open area to the side of your camp right now.  She is practicing with her large hammer, going through her daily training.");
		//after nightfall, scene always displays at this time unless PC is wormed
		else if(model.time.hours >= 21 && player.findStatusAffect(StatusAffects.Infested) < 0) {
			outputText("Marble is hanging around her bedroll waiting for you to come to bed.  However, sometimes she lies down for a bit, and sometimes she paces next to it.");
			if(flags[kFLAGS.MARBLE_LUST] > 30) outputText("  She seems to be feeling antsy.");
		}
		else if(flags[kFLAGS.MARBLE_KIDS] > 0 && model.time.hours < 19 && model.time.hours > 7) {
			//requires at least 6 kids, and no other parental characters in camp
			if(rand(2) == 0 && flags[kFLAGS.MARBLE_KIDS] > 5) outputText("Marble is currently tending to your kids, but she looks a bit stressed out right now.  It looks like " + num2Text(flags[kFLAGS.MARBLE_KIDS]) + " might just be too many for her to handle on her own...");
			//requires at least 4 kids
			else if(rand(3) == 0 && flags[kFLAGS.MARBLE_KIDS] > 3) outputText("Marble herself is in the camp right now, telling a story about her travels around the world to her kids as they gather around her.  The children are completely enthralled by her words.  You can't help but smile.");
			//Requires 2 boys
			else if(rand(3) == 0 && flags[kFLAGS.MARBLE_BOYS] > 1)
			{
				outputText("Marble herself is currently refereeing a wrestling match between two of your sons.  It seems like it's a contest to see which one of them gets to go for a ride between her breasts in a game of <i>Bull Blasters</i>, while the loser has to sit on her shoulders.");
			}
			//requires at least 2 kids
			else if(rand(3) == 0 && flags[kFLAGS.MARBLE_KIDS] - flags[kFLAGS.MARBLE_BOYS] > 1) outputText("Marble herself is involved in a play fight with two of your kids brandishing small sticks.  It seems that the <i>mommy monster</i> is terrorising the camp and needs to be stopped by the <i>Mighty Moo and her sidekick Bovine Lass</i>.");
			else if(rand(3) == 0 && flags[kFLAGS.MARBLE_KIDS] > 1) outputText("Marble herself is out right now; she's taken her kids to go visit Whitney.  You're sure though that she'll be back within the hour, so you could just wait if you needed her.");
			else {
				//requires at least 1 kid
				if(rand(2) == 0) 
				{
					outputText("Marble herself is nursing ");
					if(flags[kFLAGS.MARBLE_KIDS] > 1) outputText("one of your cow-girl children");
					else outputText("your cow-girl child");
					outputText(" with a content look on her face.");
				}
				else 
				{
					outputText("Marble herself is watching your kid");
					if(flags[kFLAGS.MARBLE_KIDS] > 0) outputText("s");
					outputText(" playing around the camp right now.");
				}
			}
		}
		//(Choose one of these at random to display each hour)
		else if(temp == 0) outputText("Marble herself has gone off to Whitney's farm to get milked right now.  You're sure she'd be back in moments if you needed her.", false);
		else if(temp == 1) outputText("Marble herself has gone off to Whitney's farm to do some chores right now.  You're sure she'd be back in moments if you needed her.", false);
		else if(temp == 2) outputText("Marble herself isn't at the camp right now; she is probably off getting supplies, though she'll be back soon enough.  You're sure she'd be back in moments if you needed her.", false);
		else if(temp == 3) {
			outputText("Marble herself is resting on her bedroll right now.", false);
			
		}
		else if(temp == 4) {
			outputText("Marble herself is wandering around the camp right now.", false);
		}
		outputText("\n\n", false);	
	}
	//RATHAZUL
	//if rathazul has joined the camp
	if(player.findStatusAffect(StatusAffects.CampRathazul) >= 0) {
		if(flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] <= 1) {
			outputText("Tucked into a shaded corner of the rocks is a bevy of alchemical devices and equipment.  The alchemist Rathazul looks to be hard at work with his chemicals, working on who knows what.", false);
			if(flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] == 1) outputText("  Some kind of spider-silk-based equipment is hanging from a nearby rack.  <b>He's finished with the task you gave him!</b>", false);
			outputText("\n\n", false);
		}
		else outputText("Tucked into a shaded corner of the rocks is a bevy of alchemical devices and equipment.  The alchemist Rathazul looks to be hard at work on the silken equipment you've commissioned him to craft.\n\n", false);
	}
	//MOUSEBITCH
	if(amilyScene.amilyFollower() && flags[kFLAGS.AMILY_FOLLOWER] == 1) {
		if(flags[kFLAGS.FUCK_FLOWER_LEVEL] >= 4) outputText("Amily has relocated her grass bedding to the opposite side of the camp from the strange tree; every now and then, she gives it a suspicious glance, as if deciding whether to move even further.");
		else outputText("A surprisingly tidy nest of soft grasses and sweet-smelling herbs has been built close to your bedroll. A much-patched blanket draped neatly over the top is further proof that Amily sleeps here. She changes the bedding every few days, to ensure it stays as nice as possible.\n\n", false);
	}
	//Corrupt mousebitch!
	else if(amilyScene.amilyFollower() && flags[kFLAGS.AMILY_FOLLOWER] == 2 && flags[kFLAGS.FOLLOWER_AT_FARM_AMILY] == 0) {
		outputText("Sometimes you hear a faint moan from not too far away. No doubt the result of your slutty toy mouse playing with herself.\n\n", false);
	}
	//Amily out freaking Urta?
	else if(flags[kFLAGS.AMILY_VISITING_URTA] == 1 || flags[kFLAGS.AMILY_VISITING_URTA] == 2) {
		outputText("Amily's bed of grass and herbs lies empty, the mouse-woman still absent from her sojourn to meet your other lover.\n\n", false);
	}
	//JOJO
	//If Jojo is corrupted, add him to the masturbate menu.
	if(campCorruptJojo() && flags[kFLAGS.FOLLOWER_AT_FARM_JOJO] == 0) outputText("From time to time you can hear movement from around your camp, and you routinely find thick puddles of mouse semen.  You are sure Jojo is here if you ever need to sate yourself.\n\n", false);
	//Pure Jojo
	if(player.findStatusAffect(StatusAffects.PureCampJojo) >= 0) outputText("There is a small bedroll for Jojo near your own, though the mouse is probably hanging around the camp's perimeter.\n\n", false);
	//Izma
	if(izmaFollower() && flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 0) {
		outputText("Neatly laid near the base of your own is a worn bedroll belonging to Izma, your tigershark lover.  It's a snug fit for her toned body, though it has some noticeable cuts and tears in the fabric.  Close to her bed is her old trunk, almost as if she wants to have it at arms length if anyone tries to rob her in her sleep.  ", false);
		temp = rand(3);
		//Text 1} I
		if(temp == 0) outputText("Izma's lazily sitting on the trunk beside her bedroll, reading one of the many books from inside it.  She smiles happily when your eyes linger on her, and you know full well she's only half-interested in it.", false);
		//Text 2
		else if(temp == 1) outputText("You notice Izma isn't around right now.  She's probably gone off to the nearby stream to get some water.  Never mind, she comes around from behind a rock, still dripping wet.", false);
		//Text 3 
		else outputText("Izma is lying on her back near her bedroll.  You wonder at first just why she isn't using her bed, but as you look closer you notice all the water pooled beneath her and the few droplets running down her arm, evidence that she's just returned from the stream.", false);
		outputText("\n\n", false);
	}
	//►[Added Campsite Description]
	if(kGAMECLASS.desert.antsScene.phyllaWaifu()) {
		outputText("You see Phylla's anthill in the distance.  Every now and then you see");
		//If PC has children w/ Phylla:
		if(flags[kFLAGS.ANT_KIDS] > 0) outputText(" one of your many children exit the anthill to unload some dirt before continuing back down into the colony.  It makes you feel good knowing your offspring are so productive.");
		else outputText(" Phylla appear out of the anthill to unload some dirt.  She looks over to your campsite and gives you an excited wave before heading back into the colony.  It makes you feel good to know she's so close.");
		outputText("\n\n");
	}
	//Clear bee-status
	if(player.findStatusAffect(StatusAffects.ParalyzeVenom) >= 0) {
		dynStats("str", player.statusAffectv1(StatusAffects.ParalyzeVenom),"spe", player.statusAffectv2(StatusAffects.ParalyzeVenom));
		player.removeStatusAffect(StatusAffects.ParalyzeVenom);
		outputText("<b>You feel quicker and stronger as the paralyzation venom in your veins wears off.</b>\n\n", false);
	}
	//The uber horny
	if(player.lust >= 100) {
		if(player.findStatusAffect(StatusAffects.Dysfunction) >= 0) {
			outputText("<b>You are debilitatingly aroused, but your sexual organs are so numbed the only way to get off would be to find something tight to fuck or get fucked...</b>\n\n", false);
		}
		else if(flags[kFLAGS.UNABLE_TO_MASTURBATE_BECAUSE_CENTAUR] > 0 && player.isTaur()) {
			outputText("<b>You are delibitatingly aroused, but your sex organs are so difficult to reach that masturbation isn't at the forefront of your mind.</b>\n\n", false);
		}
		else {
			outputText("<b>You are debilitatingly aroused, and can think of doing nothing other than masturbating.</b>\n\n", false);
			exploreEvent = null;
			placesEvent = null;
			//This once disabled the ability to rest, sleep or wait, but ir hasn't done that for many many builds
		}
	}
	var baitText: string = "Masturbate";
	if(((player.findPerk(PerkLib.HistoryReligious) >= 0 && player.cor <= 66) || (player.findPerk(PerkLib.Enlightened) >= 0 && player.cor < 10)) && !(player.findStatusAffect(StatusAffects.Exgartuan) >= 0 && player.statusAffectv2(StatusAffects.Exgartuan) == 0)) baitText = "Meditate";
	//Initialize companions/followers
	if(model.time.hours > 4 && model.time.hours < 23) {
		if(followersCount() > 0) 
			followers = campFollowers;
		if(slavesCount() > 0) 
			slaves = campSlavesMenu;
		if(loversCount() > 0) 
			lovers = campLoversMenu;
	}
	var restEvent:Function = doWait;
	var restName: string = "Wait";
	//Set up rest stuff
	//Night
	if(model.time.hours < 6 || model.time.hours > 20) {
		outputText("It is dark out, made worse by the lack of stars in the sky.  A blood-red moon hangs in the sky, seeming to watch you, but providing little light.  It's far too dark to leave camp.\n", false);
		restName = "Sleep";
		restEvent = doSleep;
		exploreEvent = null;
		placesEvent = null;
	}
	//Day Time!
	else {
		outputText("It's light outside, a good time to explore and forage for supplies with which to fortify your camp.\n", false);
		if(player.fatigue > 40 || player.HP/player.maxHP() <= .9) {
			restName = "Rest";
			restEvent = rest;
		}
	}
	//Menu

	choices("Explore", exploreEvent, "Places", placesEvent, "Inventory", inventory.inventoryMenu, "Stash", storage, "Followers", followers,
		"Lovers", lovers, "Slaves",slaves, "", null, baitText, masturbate, restName, restEvent);
	//Lovers
	//Followers
	//Slaves
}

public hasCompanions(): boolean {
	return companionsCount() > 0;
}

public companionsCount(): number {
	return followersCount() + slavesCount() + loversCount();
}

public followersCount(): number {
	var counter: number = 0;
	if(emberScene.followerEmber()) counter++;
	if(flags[kFLAGS.VALARIA_AT_CAMP] == 1) counter++;
	if(player.findStatusAffect(StatusAffects.PureCampJojo) >= 0) counter++;
	if(player.findStatusAffect(StatusAffects.CampRathazul) >= 0) counter++;
	if(followerShouldra()) counter++;
	if(sophieFollower() && flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0) counter++;
	if(helspawnFollower()) counter++;
	return counter;
}

public slavesCount(): number {
	var counter: number = 0;
	if(latexGooFollower() && flags[kFLAGS.FOLLOWER_AT_FARM_LATEXY] == 0) counter++;
	if(vapulaSlave() && flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA] == 0) counter++;
	if(campCorruptJojo() && flags[kFLAGS.FOLLOWER_AT_FARM_JOJO] == 0) counter++;
	if(amilyScene.amilyFollower() && amilyScene.amilyCorrupt() && flags[kFLAGS.FOLLOWER_AT_FARM_AMILY] == 0) counter++;
	//Bimbo sophie
	if(bimboSophie() && flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0) counter++;
	if(ceraphIsFollower()) counter++;
	if(milkSlave() && flags[kFLAGS.FOLLOWER_AT_FARM_BATH_GIRL] == 0) counter++;
	return counter;
}

public loversCount(): number {
	var counter: number = 0;
	if(arianScene.arianFollower()) counter++;
	if(followerHel()) counter++;
	//Izma!
	if(flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] == 1 && flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 0) counter++;
	if(isabellaFollower() && flags[kFLAGS.FOLLOWER_AT_FARM_ISABELLA] == 0) counter++;
	if(player.findStatusAffect(StatusAffects.CampMarble) >= 0 && flags[kFLAGS.FOLLOWER_AT_FARM_MARBLE] == 0) counter++;
	if(amilyScene.amilyFollower() && !amilyScene.amilyCorrupt()) counter++;
	if(followerKiha()) counter++;
	if(flags[kFLAGS.NIEVE_STAGE] == 5) counter++;
	if(flags[kFLAGS.ANT_WAIFU] > 0) counter++;
	return counter;
}

public campLoversMenu():void {
	var isabellaButt:Function = null;
	var marbleEvent:Function = null;
	var izmaEvent:Function = null;
	var kihaButt:Function = null;
	var amilyEvent:Function = null;
	var hel:Function = null;
	var nieve:Function = null;
	clearOutput();
	if(flags[kFLAGS.NIEVE_STAGE] == 5) {
		kGAMECLASS.nieveCampDescs();
		outputText("\n\n");
		nieve = getGame().approachNieve;
	}
	if(kGAMECLASS.helScene.followerHel()) {
		if(flags[kFLAGS.HEL_FOLLOWER_LEVEL] == 2) {
			//Hel @ Camp: Follower Menu
			//(6-7) 
			if(model.time.hours <= 7) outputText("Hel is currently sitting at the edge of camp, surrounded by her scraps of armor, sword, and a few half-empty bottles of vodka.  By the way she's grunting and growling, it looks like she's getting ready to flip her shit and go running off into the plains in her berserker state.\n\n");
			//(8a-5p) 
			else if(model.time.hours <= 17) outputText("Hel's out of camp at the moment, adventuring on the plains.  You're sure she'd be on hand in moments if you needed her, though.\n\n");
			//5-7) 
			else if(model.time.hours <= 19) outputText("Hel's out visiting her family in Tel'Adre right now, though you're sure she's only moments away if you need her.\n\n");
			//(7+)
			else outputText("Hel is fussing around her hammock, checking her gear and sharpening her collection of blades.  Each time you glance her way, though, the salamander puts a little extra sway in her hips and her tail wags happily.\n\n");
		}
		else if(flags[kFLAGS.HEL_FOLLOWER_LEVEL] == 1) {
			if(flags[kFLAGS.HEL_HARPY_QUEEN_DEFEATED] == 1) {
				outputText("Hel has returned to camp, though for now she looks a bit bored.  Perhaps she is waiting on something.\n\n");
			}
			else {
				outputText("<b>You see the salamander Helia pacing around camp, anxiously awaiting your departure to the harpy roost. Seeing you looking her way, she perks up, obviously ready to get underway.</b>\n\n");
			}
		}
		hel = helFollower.heliaFollowerMenu;
	}
	//Kiha!
	if(followerKiha()) {
		//(6-7) 
		if(model.time.hours < 7) outputText("Kiha is sitting near the fire, her axe laying across her knees as she polishes it.[pg]");
		else if(model.time.hours < 19) outputText("Kiha's out right now, likely patrolling for demons to exterminate.  You're sure a loud call could get her attention.\n\n");
		else outputText("Kiha is utterly decimating a set of practice dummies she's set up out on the edge of camp.  All of them have crudely drawn horns. Most of them are on fire.\n\n");
		kihaButt = kihaScene.encounterKiha;
	}
	//Isabella
	if(isabellaFollower() && flags[kFLAGS.FOLLOWER_AT_FARM_ISABELLA] == 0) {
		isabellaButt = isabellaFollowerScene.callForFollowerIsabella;
		if(model.time.hours >= 21 || model.time.hours <= 5) outputText("Isabella is sound asleep in her bunk and quietly snoring.", false);
		else if(model.time.hours == 6) outputText("Isabella is busy eating some kind of grain-based snack for breakfast.  The curly-haired cow-girl gives you a smile when she sees you look her way.", false);
		else if(model.time.hours == 7) outputText("Isabella, the red-headed cow-girl, is busy with a needle and thread, fixing up some of her clothes.", false);
		else if(model.time.hours == 8) outputText("Isabella is busy cleaning up the camp, but when she notices you looking her way, she stretches up and arches her back, pressing eight bullet-hard nipples into the sheer silk top she prefers to wear.", false);
		else if(model.time.hours == 9) outputText("Isabella is out near the fringes of your campsite.  She has her massive shield in one hand and appears to be keeping a sharp eye out for intruders or demons.  When she sees you looking her way, she gives you a wave.", false);
		else if(model.time.hours == 10) outputText("The cow-girl warrioress, Isabella, is sitting down on a chair and counting out gems from a strange pouch.  She must have defeated someone or something recently.", false);
		else if(model.time.hours == 11) outputText("Isabella is sipping from a bottle labelled 'Lactaid' in a shaded corner.  When she sees you looking she blushes, though dark spots appear on her top and in her skirt's middle.", false);
		else if(model.time.hours == 12) outputText("Isabella is cooking a slab of meat over the fire.  From the smell that's wafting this way, you think it's beef.  Idly, you wonder if she realizes just how much like her chosen food animal she has become.", false);
		else if(model.time.hours == 13) {
			outputText("Isabella ", false);
			var izzyCreeps:Array = [];
			//Build array of choices for izzy to talk to
			if(player.findStatusAffect(StatusAffects.CampRathazul) >= 0)
				izzyCreeps[izzyCreeps.length] = 0;
			if(player.findStatusAffect(StatusAffects.PureCampJojo) >= 0)
				izzyCreeps[izzyCreeps.length] = 1;
			if(amilyScene.amilyFollower() && flags[kFLAGS.AMILY_FOLLOWER] == 1 && flags[kFLAGS.AMILY_BLOCK_COUNTDOWN_BECAUSE_CORRUPTED_JOJO] == 0)
				izzyCreeps[izzyCreeps.length] = 2;
			if(amilyScene.amilyFollower() && flags[kFLAGS.AMILY_FOLLOWER] == 2 && flags[kFLAGS.AMILY_BLOCK_COUNTDOWN_BECAUSE_CORRUPTED_JOJO] == 0 && flags[kFLAGS.FOLLOWER_AT_FARM_AMILY] == 0)
				izzyCreeps[izzyCreeps.length] = 3;
			if(flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] == 1 && flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 0)
				izzyCreeps[izzyCreeps.length] = 4;
			//Base choice - book
			izzyCreeps[izzyCreeps.length] = 5;
			//Select!
			var choice: number = rand(izzyCreeps.length);
				
			if(izzyCreeps[choice] == 0) outputText("is sitting down with Rathazul, chatting amiably about the weather.", false);
			else if(izzyCreeps[choice] == 1) outputText("is sitting down with Jojo, smiling knowingly as the mouse struggles to keep his eyes on her face.", false);
			else if(izzyCreeps[choice] == 2) outputText("is talking with Amily, sharing stories of the fights she's been in and the enemies she's faced down.  Amily seems interested but unimpressed.", false);
			else if(izzyCreeps[choice] == 3) outputText("is sitting down chatting with Amily, but the corrupt mousette is just staring at Isabella's boobs and masturbating.  The cow-girl is pretending not to notice.", false);
			else if(izzyCreeps[choice] == 4) outputText("is sitting down with Izma and recounting some stories, somewhat nervously.  Izma keeps flashing her teeth in a predatory smile.", false);
			else outputText("is sitting down and thumbing through a book.", false);
		}
		else if(model.time.hours == 14) outputText("Isabella is working a grindstone and sharpening her tools.  She even hones the bottom edge of her shield into a razor-sharp cutting edge.  The cow-girl is sweating heavily, but it only makes the diaphanous silk of her top cling more alluringly to her weighty chest.", false);
		else if(model.time.hours == 15) outputText("The warrior-woman, Isabella is busy constructing dummies of wood and straw, then destroying them with vicious blows from her shield.  Most of the time she finishes by decapitating them with the sharp, bottom edge of her weapon.  She flashes a smile your way when she sees you.", false);
		else if(model.time.hours == 16) outputText("Isabella is sitting down with a knife, the blade flashing in the sun as wood shavings fall to the ground.  Her hands move with mechanical, practiced rhythm as she carves a few hunks of shapeless old wood into tools or art.", false);
		else if(model.time.hours == 17) outputText("Isabella is sitting against one of the large rocks near the outskirts of your camp, staring across the wasteland while idly munching on what you assume to be a leg of lamb.  She seems lost in thought, though that doesn't stop her from throwing a wink and a goofy food-filled grin toward you.", false);
		else if(model.time.hours == 18) outputText("The dark-skinned cow-girl, Isabella, is sprawled out on a carpet and stretching.  She seems surprisingly flexible for someone with hooves and oddly-jointed lower legs.", false);
		else if(model.time.hours == 19) {
			//[(Izzy Milked Yet flag = -1)
			if(flags[kFLAGS.ISABELLA_MILKED_YET] == -1) outputText("Isabella has just returned from a late visit to Whitney's farm, bearing a few filled bottles and a small pouch of gems.", false);
			else outputText("Isabella was hidden behind a rock when you started looking for her, but as soon as you spot her in the darkness, she jumps, a guilty look flashing across her features.  She turns around and adjusts her top before looking back your way, her dusky skin even darker from a blush.  The cow-girl gives you a smile and walks back to her part of camp.  A patch of white decorates the ground where she was standing - is that milk?  Whatever it is, it's gone almost as fast as you see it, devoured by the parched, wasteland earth.", false);
		}
		else if(model.time.hours == 20) outputText("Your favorite chocolate-colored cowgirl, Isabella, is moving about, gathering all of her scattered belongings and replacing them in her personal chest.  She yawns more than once, indicating her readiness to hit the hay, but her occasional glance your way lets you know she wouldn't mind some company before bed.", false);
		else outputText("Isabella looks incredibly bored right now.", false);
		outputText("\n\n", false);		
	}
	//Izma
	if(flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00238] == 1 && flags[kFLAGS.FOLLOWER_AT_FARM_IZMA] == 0) {
		outputText("Neatly laid near the base of your own is a worn bedroll belonging to Izma, your tigershark lover. It's a snug fit for her toned body, though it has some noticeable cuts and tears in the fabric. Close to her bed is her old trunk, almost as if she wants to have it at arms length if anyone tries to rob her in her sleep.\n\n", false);
		izmaEvent = izmaScene.izmaFollowerMenu;
	}
	//MARBLE
	if(player.findStatusAffect(StatusAffects.CampMarble) >= 0 && flags[kFLAGS.FOLLOWER_AT_FARM_MARBLE] == 0) {
		temp = rand(5);
		outputText("A second bedroll rests next to yours; a large two handed hammer sometimes rests against it, depending on whether or not its owner needs it at the time.  ", false);
		//Normal Murbles
		if(flags[kFLAGS.MARBLE_PURIFICATION_STAGE] != 4)
		{
			//(Choose one of these at random to display each hour)
			if(temp == 0) outputText("Marble herself has gone off to Whitney's farm to get milked right now.", false);
			if(temp == 1) outputText("Marble herself has gone off to Whitney's farm to do some chores right now.", false);
			if(temp == 2) outputText("Marble herself isn't at the camp right now; she is probably off getting supplies, though she'll be back soon enough.", false);
			if(temp == 3) {
				outputText("Marble herself is resting on her bedroll right now.", false);
			}
			if(temp == 4) {
				outputText("Marble herself is wandering around the camp right now.", false);
			}
			if(temp < 3) outputText("  You're sure she'd be back in moments if you needed her.", false);
			marbleEvent = marbleScene.interactWithMarbleAtCamp;
		}
		//Out getting family
		else outputText("Marble is out in the wilderness right now, searching for a relative.");
		outputText("\n\n", false);
	}
	//AMILY
	if(amilyScene.amilyFollower() && flags[kFLAGS.AMILY_FOLLOWER] == 1 && flags[kFLAGS.AMILY_BLOCK_COUNTDOWN_BECAUSE_CORRUPTED_JOJO] == 0) {
		outputText("Amily is currently strolling around your camp, ", false);
		temp = rand(6);
		if(temp == 0) {
			outputText("dripping water and stark naked from a bath in the stream", false);
			if(player.findStatusAffect(StatusAffects.CampRathazul) >= 0) outputText(".  Rathazul glances over and immediately gets a nosebleed", false);
		}
		else if(temp == 1) outputText("slouching in the shade of some particularly prominent rocks, whittling twigs to create darts for her blowpipe", false);
		else if(temp == 2) outputText("dipping freshly-made darts into a jar of something that looks poisonous", false);
		else if(temp == 3) outputText("eating some of your supplies", false);
		else if(temp == 4) outputText("and she flops down on her nest to have a rest", false);
		else outputText("peeling the last strips of flesh off of an imp's skull and putting it on a particularly flat, sun-lit rock to bleach as a trophy", false);
		outputText(".\n\n", false);
		amilyEvent = amilyScene.amilyFollowerEncounter;
	}
	//Amily out freaking Urta?
	else if(flags[kFLAGS.AMILY_VISITING_URTA] == 1 || flags[kFLAGS.AMILY_VISITING_URTA] == 2) {
		outputText("Amily's bed of grass and herbs lies empty, the mouse-woman still absent from her sojourn to meet your other lover.\n\n", false);
	}
	if(arianScene.arianFollower()) outputText("Arian's tent is here, if you'd like to go inside.\n\n");
	//choices("Amily",amilyEvent,"Helia",hel,"Isabella",isabellaButt,"Izma",izmaEvent,"Kiha",kihaButt,"Marble",marbleEvent,"Nieve",nieve,"",0,"",0,"Back",1);	
	menu();
	if (amilyEvent != null) addButton(0, "Amily", amilyEvent);
	if (arianScene.arianFollower()) addButton(1, "Arian", arianScene.visitAriansHouse);
	if (hel != null) addButton(2, "Helia", hel);
	if (isabellaButt != null) addButton(3, "Isabella", isabellaButt);
	if (izmaEvent != null) addButton(4, "Izma", izmaEvent);
	addButton(5, "Kiha", kihaButt);
	if (marbleEvent != null) addButton(6, "Marble", marbleEvent);
	if (nieve != null) addButton(7, "Nieve", nieve);
	if (flags[kFLAGS.ANT_WAIFU] > 0) addButton(8,"Phylla", getGame().desert.antsScene.introductionToPhyllaFollower);
	addButton(9, "Back", playerMenu);
}

public campSlavesMenu():void {
	clearOutput();
	var vapula2:Function = null;
	var amilyEvent:Function = null;
	var ceraph:Function = null;
	var sophieEvent:Function = null;
	var jojoEvent:Function = null;
	var goo:Function = null;
	if(vapulaSlave() && flags[kFLAGS.FOLLOWER_AT_FARM_VAPULA] == 0) {
		vapula.vapulaSlaveFlavorText();
		outputText("\n\n");
		vapula2 = vapula.callSlaveVapula;
	}
	//Bimbo Sophie
	if(bimboSophie() && flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0) {
		sophieBimbo.sophieCampLines();
		sophieEvent = sophieBimbo.approachBimboSophieInCamp;
	}
	if(latexGooFollower() && flags[kFLAGS.FOLLOWER_AT_FARM_LATEXY] == 0) {
		outputText(flags[kFLAGS.GOO_NAME] + " lurks in a secluded section of rocks, only venturing out when called for or when she needs to gather water from the stream.\n\n");
		goo = latexGirl.approachLatexy;
	}
	if (ceraphIsFollower()) ceraph = ceraphFollowerScene.ceraphFollowerEncounter;
	//JOJO
	//If Jojo is corrupted, add him to the masturbate menu.
	if(campCorruptJojo() && flags[kFLAGS.FOLLOWER_AT_FARM_JOJO] == 0) {
		outputText("From time to time you can hear movement from around your camp, and you routinely find thick puddles of mouse semen.  You are sure Jojo is here if you ever need to sate yourself.\n\n", false);
		jojoEvent = jojoScene.corruptCampJojo;
	}
	//Modified Camp/Follower List Description:
	if(amilyScene.amilyFollower() && flags[kFLAGS.AMILY_FOLLOWER] == 2 && flags[kFLAGS.AMILY_BLOCK_COUNTDOWN_BECAUSE_CORRUPTED_JOJO] == 0 && flags[kFLAGS.FOLLOWER_AT_FARM_AMILY] == 0) {
		outputText("Sometimes you hear a faint moan from not too far away. No doubt the result of your slutty toy mouse playing with herself.\n\n", false);
		amilyEvent = amilyScene.amilyFollowerEncounter;
	}
	if(milkSlave() && flags[kFLAGS.FOLLOWER_AT_FARM_BATH_GIRL] == 0) {
		outputText("Your well-endowed, dark-skinned milk-girl is here.  She flicks hopeful eyes towards you whenever she thinks she has your attention.\n\n");
	}
	//choices("Amily",amilyEvent,"Ceraph",ceraph,"Jojo",jojoEvent,"Sophie",sophieEvent,"Vapula",vapula,"",0,"",0,"",0,flags[kFLAGS.GOO_NAME],goo,"Back",1);	
	menu();
	if (amilyEvent != null) addButton(0,"Amily", amilyEvent);
	if (ceraph != null) addButton(1,"Ceraph", ceraph);
	if (jojoEvent != null) addButton(2,"Jojo",jojoEvent);
	if (sophieEvent != null) addButton(3,"Sophie",sophieEvent);
	if (vapula2 != null) addButton(4,"Vapula",vapula2);
	if (milkSlave() && flags[kFLAGS.FOLLOWER_AT_FARM_BATH_GIRL] == 0) addButton(7,flags[kFLAGS.MILK_NAME],milkWaifu.milkyMenu);
	if (goo != null) addButton(8,flags[kFLAGS.GOO_NAME],goo);
	addButton(9, "Back", playerMenu);
}

public campFollowers():void {
	var rathazulEvent:Function = null;
	var jojoEvent:Function = null;
	var valeria2:Function = null;
	var shouldra:Function = null;
	var ember:Function = null;
	clearOutput();
	getGame().inCombat = false;
	//ADD MENU FLAGS/INDIVIDUAL FOLLOWER TEXTS
	menu();
	if(emberScene.followerEmber()) {
		emberScene.emberCampDesc();
		ember = emberScene.emberCampMenu;
	}
	if(followerShouldra()) {
		shouldra = shouldraFollower.shouldraFollowerScreen;
	}
	//Pure Jojo
	if(player.findStatusAffect(StatusAffects.PureCampJojo) >= 0) {
		outputText("There is a small bedroll for Jojo near your own, though the mouse is probably hanging around the camp's perimeter.\n\n", false);
		jojoEvent = jojoScene.jojoCamp;
	}
	//RATHAZUL
	//if rathazul has joined the camp
	if(player.findStatusAffect(StatusAffects.CampRathazul) >= 0) {
		rathazulEvent = kGAMECLASS.rathazul.returnToRathazulMenu;
		if(flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] <= 1) {
			outputText("Tucked into a shaded corner of the rocks is a bevy of alchemical devices and equipment.  The alchemist Rathazul looks to be hard at work with his chemicals, working on who knows what.", false);
			if(flags[kFLAGS.RATHAZUL_SILK_ARMOR_COUNTDOWN] == 1) outputText("  Some kind of spider-silk-based equipment is hanging from a nearby rack.  He's finished with the task you gave him!", false);
			outputText("\n\n", false);
		}
		else outputText("Tucked into a shaded corner of the rocks is a bevy of alchemical devices and equipment.  The alchemist Rathazul looks to be hard at work on the silken equipment you've commissioned him to craft.\n\n", false);
	}
	if(sophieFollower() && flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0) {
		if(rand(5) == 0) outputText("Sophie is sitting by herself, applying yet another layer of glittering lip gloss to her full lips.\n\n");
		else if(rand(4) == 0) outputText("Sophie is sitting in her nest, idly brushing out her feathers.  Occasionally, she looks up from her work to give you a sultry wink and a come-hither gaze.\n\n");
		else if(rand(3) == 0) outputText("Sophie is fussing around in her nest, straightening bits of straw and grass, trying to make it more comfortable.  After a few minutes, she flops down in the middle and reclines, apparently satisfied for the moment.\n\n");
		else if(rand(2) == 0 || flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] == 0) {
			if(flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00282] > 0) outputText("Your platinum-blonde harpy, Sophie, is currently reading a book - a marked change from her bimbo-era behavior.  Occasionally, though, she glances up from the page and gives you a lusty look.  Some things never change....\n\n");
			else outputText("Your pink harpy, Sophie, is currently reading a book.  She seems utterly absorbed in it, though you question how she obtained it.  Occasionally, though, she'll glance up from the pages to shoot you a lusty look.\n\n");
		}
		else {
			outputText("Sophie is sitting in her nest, ");
			if(flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] < 5) {
				outputText("across from your daughter");
				if(flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] > 1) outputText("s");
			}
			else outputText("surrounded by your daughters");
			outputText(", apparently trying to teach ");
			if(flags[kFLAGS.SOPHIE_ADULT_KID_COUNT] == 1) outputText("her");
			else outputText("them");
			outputText(" about hunting and gathering techniques.  Considering their unusual upbringing, it can't be as easy for them...\n\n");
		}
		addButton(5,"Sophie",sophieFollowerScene.followerSophieMainScreen);
	}
	if (flags[kFLAGS.VALARIA_AT_CAMP] == 1) valeria2 = valeria.valeriaFollower;
	addButton(0,"Ember",ember);
	if (helspawnFollower()) addButton(1, flags[kFLAGS.HELSPAWN_NAME], helSpawnScene.helspawnsMainMenu);
	addButton(2, "Jojo", jojoEvent);
	addButton(3, "Rathazul", rathazulEvent);
	addButton(4, "Shouldra", shouldra);
	//ABOVE: addButton(4,"Sophie",followerSophieMainScreen);
	addButton(6, "Valeria", valeria2);
	addButton(9, "Back", playerMenu);
}

private rest():void {
	campQ = true;
	if(timeQ == 0) {
		outputText("You lie down to rest for four hours.\n", true);
		timeQ = 4;
		//Marble withdrawl
		if(player.findStatusAffect(StatusAffects.MarbleWithdrawl) >= 0) {
			outputText("\nYour rest is very troubled, and you aren't able to settle down.  You get up feeling tired and unsatisfied, always thinking of Marble's milk.\n", false);
			HPChange(timeQ * 5, true);
			dynStats("tou", -.1, "int", -.1);
			//fatigue
			fatigue(-2*timeQ);
			if(player.findPerk(PerkLib.SpeedyRecovery) >= 0) fatigue(-1*timeQ);
		}
		//REGULAR HP/FATIGUE RECOVERY
		else {
			HPChange(timeQ * 10, true);
			//fatigue
			fatigue(-4*timeQ); 
			if(player.findPerk(PerkLib.SpeedyRecovery) >= 0) fatigue(-2*timeQ);
		}
	}
	else {
		if(timeQ != 1) outputText("You continue to rest for " + num2Text(timeQ) + " more hours.\n", true);
		else outputText("You continue to rest for another hour.\n", true);
	}
	goNext(timeQ,true);
}

private doWait():void {
	campQ = true;
	outputText("", true);
	if(timeQ == 0) {
		outputText("You wait four hours...\n", false);
		timeQ = 4;
		//Marble withdrawl
		if(player.findStatusAffect(StatusAffects.MarbleWithdrawl) >= 0) {
			outputText("\nYour time spent waiting is very troubled, and you aren't able to settle down.  You get up feeling tired and unsatisfied, always thinking of Marble's milk.\n", false);
			//fatigue
			fatigue(-1*timeQ); 
			if(player.findPerk(PerkLib.SpeedyRecovery) >= 0) fatigue(-0.5*timeQ);
		}
		//REGULAR HP/FATIGUE RECOVERY
		else {
			//fatigue
			fatigue(-2*timeQ); 	
			if(player.findPerk(PerkLib.SpeedyRecovery) >= 0) fatigue(-1*timeQ);
		}
	}
	else {
		if(timeQ != 1) outputText("You continue to wait for " + num2Text(timeQ) + " more hours.\n", false);
		else outputText("You continue to wait for another hour.\n", false);
	}
	goNext(timeQ,true);
}

public doSleep(clrScreen: boolean = true):void {
	if (kGAMECLASS.urta.pregnancy.incubation == 0 && kGAMECLASS.urta.pregnancy.type == PregnancyStore.PREGNANCY_PLAYER && model.time.hours >= 20 && model.time.hours < 2) {
		urtaPregs.preggoUrtaGivingBirth();
		return;
	}
	campQ = true;
	if(timeQ == 0) {
		if(model.time.hours == 21) timeQ = 9;
		if(model.time.hours == 22) timeQ = 8;
		if(model.time.hours >= 23) timeQ = 7;
		if(model.time.hours == 0) timeQ = 6;
		if(model.time.hours == 1) timeQ = 5;
		if(model.time.hours == 2) timeQ = 4;
		if(model.time.hours == 3) timeQ = 3;
		if(model.time.hours == 4) timeQ = 2;
		if(model.time.hours == 5) timeQ = 1;
		//Autosave stuff		
		if (player.slotName != "VOID" && player.autoSave && mainView.getButtonText( 0 ) != "Game Over") 
		{
			trace("Autosaving to slot: " + player.slotName);
			
			getGame().saves.saveGame(player.slotName);
		}
		//Clear screen
		if(clrScreen) outputText("", true);
		/******************************************************************/
		/*       ONE TIME SPECIAL EVENTS                                  */
		/******************************************************************/
		//HEL SLEEPIES!
		if(helFollower.helAffection() >= 70 && flags[kFLAGS.HEL_REDUCED_ENCOUNTER_RATE] == 0 && flags[kFLAGS.HEL_FOLLOWER_LEVEL] == 0) {
			getGame().heliaDiscovery();
			sleepRecovery(false);
			return;
		}
		//Shouldra xgartuan fight
		if(player.hasCock() && followerShouldra() && player.statusAffectv1(StatusAffects.Exgartuan) == 1) {
			if(flags[kFLAGS.SHOULDRA_EXGARTUDRAMA] == 0) {
				shouldraFollower.shouldraAndExgartumonFightGottaCatchEmAll();
				sleepRecovery(false);
				return;
			}
			else if(flags[kFLAGS.SHOULDRA_EXGARTUDRAMA] == 3) {
				shouldraFollower.exgartuMonAndShouldraShowdown();
				sleepRecovery(false);
				return;
			}
		}
		if(player.hasCock() && followerShouldra() && flags[kFLAGS.SHOULDRA_EXGARTUDRAMA] == -0.5) {
			shouldraFollower.keepShouldraPartIIExgartumonsUndeatH();
			sleepRecovery(false);
			return;
		}
		/******************************************************************/
		/*       SLEEP WITH SYSTEM GOOOO                                  */
		/******************************************************************/
		//Marble Sleepies
		if(marbleScene.marbleAtCamp() && player.findStatusAffect(StatusAffects.CampMarble) >= 0 && flags[kFLAGS.SLEEP_WITH] == "Marble" && flags[kFLAGS.FOLLOWER_AT_FARM_MARBLE] == 0) {
			if(marbleScene.marbleNightSleepFlavor()) {
				sleepRecovery(false);
				return;
			}
		}
		else if(flags[kFLAGS.SLEEP_WITH] == "Arian" && arianScene.arianFollower()) {
			arianScene.sleepWithArian();
			return;
		}
		else if(flags[kFLAGS.SLEEP_WITH] == "Sophie" && (bimboSophie() || sophieFollower()) && flags[kFLAGS.FOLLOWER_AT_FARM_SOPHIE] == 0) {
			//Night Time Snuggle Alerts!*
			//(1) 
			if(rand(4) == 0) {
				outputText("You curl up next to Sophie, planning to sleep for " + num2Text(timeQ) + " hour");
				if(timeQ > 1 ) outputText("s");
				outputText(".  She wraps her feathery arms around you and nestles her chin into your shoulder.  Her heavy breasts cushion flat against your back as she gives you a rather chaste peck on the cheek and drifts off towards dreamland...");
			}
			//(2) 
			else if(rand(3) == 0) {
				outputText("While you're getting ready for bed, you see that Sophie has already beaten you there.  She's sprawled out on her back with her arms outstretched, making little beckoning motions towards the valley of her cleavage.  You snuggle in against her, her pillowy breasts supporting your head and her familiar heartbeat drumming you to sleep for " + num2Text(timeQ) + " hour");
				if(timeQ > 1) outputText("s");
				outputText(".");
			}
			//(3)
			else if(rand(2) == 0) {
				outputText("As you lay down to sleep for " + num2Text(timeQ) + " hour");
				if(timeQ > 1) outputText("s");
				outputText(", you find the harpy-girl, Sophie, snuggling herself under her blankets with you.  She slips in between your arms and guides your hands to her enormous breasts, her backside already snug against your loins.  She whispers, \"<i>Something to think about for next morning...  Sweet dreams.</i>\" as she settles in for the night.");
			}
			//(4)
			else {
				outputText("Sophie climbs under the sheets with you when you go to sleep, planning on resting for " + num2Text(timeQ) + " hour");
				if(timeQ > 1) outputText("s");
				outputText(".  She sleeps next to you, just barely touching you.  You rub her shoulder affectionately before the two of you nod off.");
			}
			outputText("\n");
		}
		else {
			if(flags[kFLAGS.SLEEP_WITH] == "Helia" && kGAMECLASS.helScene.followerHel()) {
				outputText("You curl up next to Helia, planning to sleep for " + num2Text(timeQ) + " ");
			}
			//Normal sleep message
			else outputText("You curl up, planning to sleep for " + num2Text(timeQ) + " ", false);
			if(timeQ == 1) outputText("hour.\n", false);
			else outputText("hours.\n", false);
		}
		sleepRecovery(true);
	}
	else {
		if(timeQ != 1) outputText("You lie down to resume sleeping for the remaining " + num2Text(timeQ) + " hours.\n", true);
		else outputText("You lie down to resume sleeping for the remaining hour.\n", true);
	}
	goNext(timeQ, true);
}
//For shit that breaks normal sleep processing.
public sleepWrapper():void {
	if(model.time.hours == 16) timeQ = 14;
	if(model.time.hours == 17) timeQ = 13;
	if(model.time.hours == 18) timeQ = 12;
	if(model.time.hours == 19) timeQ = 11;
	if(model.time.hours == 20) timeQ = 10;
	if(model.time.hours == 21) timeQ = 9;
	if(model.time.hours == 22) timeQ = 8;
	if(model.time.hours >= 23) timeQ = 7;
	if(model.time.hours == 0) timeQ = 6;
	if(model.time.hours == 1) timeQ = 5;
	if(model.time.hours == 2) timeQ = 4;
	if(model.time.hours == 3) timeQ = 3;
	if(model.time.hours == 4) timeQ = 2;
	if(model.time.hours == 5) timeQ = 1;
	clearOutput();
	if(timeQ != 1) outputText("You lie down to resume sleeping for the remaining " + num2Text(timeQ) + " hours.\n", true);
	else outputText("You lie down to resume sleeping for the remaining hour.\n", true);
	sleepRecovery(true);
	goNext(timeQ, true);
}

public sleepRecovery(display: boolean = false):void {
	//Marble withdrawl
	if(player.findStatusAffect(StatusAffects.MarbleWithdrawl) >= 0) {
		if(display) outputText("\nYour sleep is very troubled, and you aren't able to settle down.  You get up feeling tired and unsatisfied, always thinking of Marble's milk.\n", false);
		HPChange(timeQ * 10, true);
		dynStats("tou", -.1, "int", -.1);
		//fatigue
		fatigue(-Math.floor(player.fatigue/2));
		if(player.findPerk(PerkLib.SpeedyRecovery) >= 0) fatigue(-Math.floor(player.fatigue/4));
	}
	//Mino withdrawal
	else if(flags[kFLAGS.MINOTAUR_CUM_ADDICTION_STATE] == 3) {
		if(display) outputText("\nYou spend much of the night tossing and turning, aching for a taste of minotaur cum.\n", false);
		HPChange(timeQ * 15, true);
		fatigue(-Math.floor(player.fatigue/2)); 
		if(player.findPerk(PerkLib.SpeedyRecovery) >= 0) fatigue(-Math.floor(player.fatigue/4));
	}
	//REGULAR HP/FATIGUE RECOVERY
	else {
		HPChange(timeQ * 20, display);
		//fatigue
		fatigue(-player.fatigue); 
	}
}

private dungeonFound(): boolean { //Returns true as soon as any known dungeon is found
	if (flags[kFLAGS.DISCOVERED_DUNGEON_2_ZETAZ] > 0) return true;
	if (player.findStatusAffect(StatusAffects.FoundFactory) >= 0) return true;
	if (flags[kFLAGS.DISCOVERED_WITCH_DUNGEON] > 0) return true;
	if (flags[kFLAGS.D3_DISCOVERED] > 0) return true;
	return false;
}

private farmFound(): boolean { //Returns true as soon as any known dungeon is found
	if (player.findStatusAffect(StatusAffects.MetWhitney) >= 0 && player.statusAffectv1(StatusAffects.MetWhitney) > 1) {
		if (flags[kFLAGS.FARM_DISABLED] == 0) return true;
		if (player.cor >= 70 && player.level >= 12 && getGame().farm.farmCorruption.corruptFollowers() >= 2 && flags[kFLAGS.FARM_CORRUPTION_DISABLED] == 0) return true;
	}
	if (flags[kFLAGS.FARM_CORRUPTION_STARTED]) return true;
	return false;
}

private placesKnown(): boolean { //Returns true as soon as any known place is found
	if (flags[kFLAGS.BAZAAR_ENTERED] > 0) return true;
	if (player.findStatusAffect(StatusAffects.BoatDiscovery) >= 0) return true;
	if (flags[kFLAGS.FOUND_CATHEDRAL] == 1) return true;
	if (dungeonFound()) return true;
	if (farmFound()) return true;
	if (flags[kFLAGS.OWCA_UNLOCKED] == 1) return true;
	if (player.findStatusAffect(StatusAffects.HairdresserMeeting) >= 0) return true;
	if (player.statusAffectv1(StatusAffects.TelAdre) >= 1) return true;
	if (flags[kFLAGS.AMILY_VILLAGE_ACCESSIBLE] > 0) return true;
	if (flags[kFLAGS.MET_MINERVA] >= 4) return true;
	return false;
}

//Places menu
private places():void { //Displays a menu for all known places
	if (flags[kFLAGS.PLACES_PAGE] != 0) {
		placesPage2();
		return;
	}
	menu();
	if (flags[kFLAGS.BAZAAR_ENTERED] > 0) addButton(0, "Bazaar", getGame().bazaar.enterTheBazaar);
	if (player.findStatusAffect(StatusAffects.BoatDiscovery) >= 0) addButton(1, "Boat", getGame().boat.boatExplore);
	if (flags[kFLAGS.FOUND_CATHEDRAL] == 1) {
		if (flags[kFLAGS.GAR_NAME] == 0)
			addButton(2, "Cathedral", getGame().gargoyle.gargoylesTheShowNowOnWBNetwork);
		else addButton(2, "Cathedral", getGame().gargoyle.returnToCathedral);
	}
	if (dungeonFound()) addButton(3, "Dungeons", dungeons);
	addButton(4, "Next", placesPage2);
	if (farmFound()) addButton(5, "Farm", getGame().farm.farmExploreEncounter);
	if (flags[kFLAGS.OWCA_UNLOCKED] == 1) addButton(6, "Owca", getGame().owca.gangbangVillageStuff);
	if (player.findStatusAffect(StatusAffects.HairdresserMeeting) >= 0) addButton(7, "Salon", getGame().mountain.salon.salonGreeting);
	if (player.statusAffectv1(StatusAffects.TelAdre) >= 1) addButton(8, "Tel'Adre", getGame().telAdre.telAdreMenu);
	addButton(9, "Back", playerMenu);
}

private placesPage2():void {
	menu();
	flags[kFLAGS.PLACES_PAGE] = 1;
	//turn on ruins
	if (flags[kFLAGS.AMILY_VILLAGE_ACCESSIBLE] > 0) addButton(0, "TownRuins", amilyScene.exploreVillageRuin);
	if (flags[kFLAGS.MET_MINERVA] >= 4) addButton(1, "Oasis Tower", getGame().highMountains.minervaScene.encounterMinerva);
	addButton(4, "Previous", placesToPage1);
	addButton(9, "Back", playerMenu);
}

private placesToPage1():void {
	flags[kFLAGS.PLACES_PAGE] = 0;
	places();
}

private dungeons():void {
	menu();
	//Turn on dungeons
	if (flags[kFLAGS.DISCOVERED_DUNGEON_2_ZETAZ] > 0) addButton(0, "Deep Cave", kGAMECLASS.enterZetazsLair);
	if (player.findStatusAffect(StatusAffects.FoundFactory) >= 0) addButton(1, "Factory", kGAMECLASS.enterFactory);
	if (flags[kFLAGS.DISCOVERED_WITCH_DUNGEON] > 0) addButton(2, "Desert Cave", kGAMECLASS.enterBoobsDungeon);
	if (flags[kFLAGS.D3_DISCOVERED] > 0) addButton(3, "Stronghold", kGAMECLASS.d3.enterD3);
	addButton(9, "Back", places);
}

private exgartuanCampUpdate():void {
	//Update Exgartuan stuff
	if(player.findStatusAffect(StatusAffects.Exgartuan) >= 0)
	{
		trace("EXGARTUAN V1: " + player.statusAffectv1(StatusAffects.Exgartuan) + " V2: " + player.statusAffectv2(StatusAffects.Exgartuan));
		//if too small dick, remove him
		if(player.statusAffectv1(StatusAffects.Exgartuan) == 1 && (player.cockArea(0) < 100 || player.cocks.length == 0))
		{
			outputText("", true);
			outputText("<b>You suddenly feel the urge to urinate, and stop over by some bushes.  It takes wayyyy longer than normal, and once you've finished, you realize you're alone with yourself for the first time in a long time.", false);
			if(player.hasCock()) outputText("  Perhaps you got too small for Exgartuan to handle?</b>\n", false);
			else outputText("  It looks like the demon didn't want to stick around without your manhood.</b>\n", false);
			player.removeStatusAffect(StatusAffects.Exgartuan);
		}
		//Tit removal
		else if(player.statusAffectv1(StatusAffects.Exgartuan) == 2 && player.biggestTitSize() < 12)
		{
			outputText("", true);
			outputText("<b>Black milk dribbles from your " + nippleDescript(0) + ".  It immediately dissipates into the air, leaving you feeling alone.  It looks like you became too small for Exgartuan!\n</b>", false);
			player.removeStatusAffect(StatusAffects.Exgartuan);
		}		
	}
	doNext(playerMenu);
}

/*
private fixHistory():void {
	outputText("<b>New history perks are available during creation.  Since this character was created before they were available, you may choose one now!</b>", true);
	flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00418] = 2;
	menu();
	doNext(10036);
}
*/
}
}
