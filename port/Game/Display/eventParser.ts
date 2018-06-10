//Used to jump the fuck out of pregnancy scenarios for menus.
//const EVENT_PARSER_ESCAPE: number = 800;
//const PHYLLA_GEMS_HUNTED_TODAY: number = 893;

export function playerMenu():void {
	if (!inCombat) spriteSelect(-1);
	mainView.setMenuButton(MainView.MENU_NEW_MAIN, "New Game", charCreation.newGameGo);
	mainView.nameBox.visible = false;
	if (gameState == 1 || gameState == 2) {
		combatMenu();
		return;
	}
	//Clear restriction on item overlaps if not in combat
	plotFight = false;
	if (inDungeon) {
		dungeonMenu();
		return;
	}
	else if (inRoomedDungeon) {
		if (inRoomedDungeonResume != null) inRoomedDungeonResume();
		return;
	}
	flags[kFLAGS.PLAYER_PREGGO_WITH_WORMS] = 0;
	doCamp();
}


export function gameOver(clear: boolean = false):void { //Leaves text on screen unless clear is set to true
	if (testingBlockExiting) {
		doNext(camp.returnToCampUseOneHour); //Prevent ChaosMonkah instances from getting stuck
	}
	else {
		if (clear) clearOutput();
		outputText("\n\n<b>GAME OVER</b>");
		menu();
		addButton(0, "Game Over", gameOverMenuOverride);
		addButton(3, "NewGamePlus", charCreation.newGamePlus);
		if (flags[kFLAGS.EASY_MODE_ENABLE_FLAG] == 1 || debug) addButton(4, "Debug Cheat", playerMenu);
		gameOverMenuOverride();
		
	}
	inCombat = false;
	dungeonLoc = 0; //Replaces inDungeon = false;
}

function gameOverMenuOverride():void { //Game over event; override whatever the fuck has been done to the UI up to this point to force display of the data and new game buttons
	mainView.showMenuButton(MainView.MENU_NEW_MAIN);
	mainView.showMenuButton(MainView.MENU_DATA);
	mainView.hideMenuButton(MainView.MENU_APPEARANCE);
	mainView.hideMenuButton(MainView.MENU_LEVEL);
	mainView.hideMenuButton(MainView.MENU_PERKS);
}


export function getCurrentStackTrace(): string		// Fuck, stack-traces only work in the debug player.
{
	var tempError:Error = new Error();
	var stackTrace: string = tempError.getStackTrace();
	return stackTrace;
}

export function errorPrint(details: any = null):void
{
	rawOutputText("<b>Congratulations, you've found a bug!</b>", true);
	rawOutputText("\nError: Unknown event!");
	rawOutputText("\n\nPlease report that you had an issue with code: \"" + details + "\" ");
	rawOutputText("\nGame version: \"" + ver + "\" (<b>THIS IS IMPORTANT! Please be sure you include it!</b>) ");

	var sTrace: string = getCurrentStackTrace();

	if (sTrace)	// Fuck, stack-traces only work in the debug player.
		rawOutputText("and stack-trace: \n <pre>" + sTrace + "</pre>\n"); 	
	rawOutputText("to fake-name on the forums or better yet, file a bug report on github: ");
	rawOutputText("\nhttps://github.com/herp-a-derp/Corruption-of-Champions");

	rawOutputText("\nPlease try to include the details of what you were doing when you encountered this bug ");
	if (sTrace)
		rawOutputText(" (including the above stack trace copy&pasted into the details),");
	rawOutputText(" to make tracking the issue down easier. Thanks!");

	doNext(camp.returnToCampUseOneHour);
}

//Argument is time passed.  Pass to event parser if nothing happens.
// The time argument is never actually used atm, everything is done with timeQ instead...
export function goNext(time: number, needNext: boolean): boolean  {
	//Update system time
	//date = new Date();
	//trace ("MONTH: " + date.month + " DATE: " + date.date + " MINUTES: " + date.minutes);
	//outputText("", true);
	if (timeAwareLargeLastEntry >= 0) { //Finish calling timeChangeLarge before advancing the hour again
		for (; timeAwareLargeLastEntry < _timeAwareClassList.length; timeAwareLargeLastEntry++) {
			if (_timeAwareClassList[timeAwareLargeLastEntry].timeChangeLarge()) return true;
		}
		timeAwareLargeLastEntry = -1;
	}
	while (timeQ > 0) {
		timeQ--;
		model.time.hours++;
		genderCheck();
		regeneration(false);
		//Inform all time aware classes that a new hour has arrived
		for (var tac: number = 0; tac < _timeAwareClassList.length; tac++) if (_timeAwareClassList[tac].timeChange()) needNext = true;
		if (model.time.hours > 23) {
			model.time.hours = 0;
			model.time.days++;
		}
		else if (model.time.hours == 21) {
			outputText("\nThe sky darkens as a starless night falls.  The blood-red moon slowly rises up over the horizon.\n");
			needNext = true;
		}
		else if (model.time.hours == 6) {
			outputText("\nThe sky begins to grow brighter as the moon descends over distant mountains, casting a few last ominous shadows before they burn away in the light.\n");
			needNext = true;
		}
		//BIG EVENTS GO IN HERE
		//BIG EVENTS GO IN HERE
		//BIG EVENTS GO IN HERE
		//BIG EVENTS GO IN HERE

		/* Inform all time aware classes that it's time for large events to trigger. Note that timeChangeLarge could be called multiple times in a single tick
		   of the clock, so any updates should happen in timeChange and any timeChangeLarge events need to make sure they cannot repeat within the same hour.
		   In effect these are the same rules the existing code acted under. */
		for (timeAwareLargeLastEntry = 0; timeAwareLargeLastEntry < _timeAwareClassList.length; timeAwareLargeLastEntry++) {
			if (_timeAwareClassList[timeAwareLargeLastEntry].timeChangeLarge()) return true;
		}
		timeAwareLargeLastEntry = -1; //If this var is -1 then this function has called timeChangeLarge for all entries in the _timeAwareClassList

		//IMP GANGBAAAAANGA
		//The more imps you create, the more often you get gangraped.
		temp = player.statusAffectv1(StatusAffects.BirthedImps) * 2;
		if (temp > 7) temp = 7;
		if (player.findPerk(PerkLib.PiercedLethite) >= 0) temp += 4;
		if (player.inHeat) temp += 2;
		if (vapula.vapulaSlave()) temp += 7;
		if (model.time.hours == 2) {
			if (model.time.days % 30 == 0 && flags[kFLAGS.ANEMONE_KID] > 0 && player.hasCock() && flags[kFLAGS.ANEMONE_WATCH] > 0 && flags[kFLAGS.TAMANI_NUMBER_OF_DAUGHTERS] >= 40) {
				anemoneScene.goblinNightAnemone();
				needNext = true;
			}
			else if (temp > rand(100) && player.findStatusAffect(StatusAffects.DefenseCanopy) < 0) {
				if (player.gender > 0 && (player.findStatusAffect(StatusAffects.JojoNightWatch) < 0 || player.findStatusAffect(StatusAffects.PureCampJojo) < 0) && (flags[kFLAGS.HEL_GUARDING] == 0 || !helFollower.followerHel()) && flags[kFLAGS.ANEMONE_WATCH] == 0 && (flags[kFLAGS.HOLLI_DEFENSE_ON] == 0 || flags[kFLAGS.FUCK_FLOWER_KILLED] > 0) && (flags[kFLAGS.KIHA_CAMP_WATCH] == 0 || !kihaFollower.followerKiha())) {
					impScene.impGangabangaEXPLOSIONS();
					doNext(playerMenu);
					return true;
				}
				else if (flags[kFLAGS.KIHA_CAMP_WATCH] > 0 && kihaFollower.followerKiha()) {
					outputText("\n<b>You find charred imp carcasses all around the camp once you wake.  It looks like Kiha repelled a swarm of the little bastards.</b>\n");
					needNext = true;
				}
				else if (flags[kFLAGS.HEL_GUARDING] > 0 && helFollower.followerHel()) {
					outputText("\n<b>Helia informs you over a mug of beer that she whupped some major imp asshole last night.  She wiggles her tail for emphasis.</b>\n");
					needNext = true;
				}
				else if (player.gender > 0 && player.findStatusAffect(StatusAffects.JojoNightWatch) >= 0 && player.findStatusAffect(StatusAffects.PureCampJojo) >= 0) {
					outputText("\n<b>Jojo informs you that he dispatched a crowd of imps as they tried to sneak into camp in the night.</b>\n");
					needNext = true;
				}
				else if (flags[kFLAGS.HOLLI_DEFENSE_ON] > 0) {
					outputText("\n<b>During the night, you hear distant screeches of surprise, followed by orgasmic moans.  It seems some imps found their way into Holli's canopy...</b>\n");
					needNext = true;
				}
				else if (flags[kFLAGS.ANEMONE_WATCH] > 0) {
					outputText("\n<b>Your sleep is momentarily disturbed by the sound of tiny clawed feet skittering away in all directions.  When you sit up, you can make out Kid A holding a struggling, concussed imp in a headlock and wearing a famished expression.  You catch her eye and she sheepishly retreats to a more urbane distance before beginning her noisy meal.</b>\n");
					needNext = true;
				}
			}
			//wormgasms
			else if (flags[kFLAGS.EVER_INFESTED] == 1 && rand(100) <= 4 && player.hasCock() && player.findStatusAffect(StatusAffects.Infested) < 0) {
				if (player.hasCock() && (player.findStatusAffect(StatusAffects.JojoNightWatch) < 0 || player.findStatusAffect(StatusAffects.PureCampJojo) < 0) && (flags[kFLAGS.HEL_GUARDING] == 0 || !helFollower.followerHel()) && flags[kFLAGS.ANEMONE_WATCH] == 0) {
					nightTimeInfestation();
					return true;
				}
				else if (flags[kFLAGS.HEL_GUARDING] > 0 && helFollower.followerHel()) {
					outputText("\n<b>Helia informs you over a mug of beer that she stomped a horde of gross worms into paste.  She shudders after at the memory.</b>\n");
					needNext = true;
				}
				else if (player.gender > 0 && player.findStatusAffect(StatusAffects.JojoNightWatch) >= 0 && player.findStatusAffect(StatusAffects.PureCampJojo) >= 0) {
					outputText("\n<b>Jojo informs you that he dispatched a horde of tiny, white worms as they tried to sneak into camp in the night.</b>\n");
					needNext = true;
				}
				else if (flags[kFLAGS.ANEMONE_WATCH] > 0) {
					outputText("\n<b>Kid A seems fairly well fed in the morning, and you note a trail of slime leading off in the direction of the lake.</b>\n"); // Yeah, blah blah travel weirdness. Quickfix so it seems logically correct.
					needNext = true;
				}
			}
		}
		//No diapause?  Normal!
		if (player.findPerk(PerkLib.Diapause) < 0) {
			if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
			if (flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
				flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
				return true;
			}
			//DOUBLE PREGGERS SPEED
			if (player.findPerk(PerkLib.MaraesGiftFertility) >= 0) {
				if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
			}
			//DOUBLE PREGGERS SPEED
			if (player.findPerk(PerkLib.MagicalFertility) >= 0) {
				if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
			}
			if (flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
				flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
				return true;
			}
			if (player.findPerk(PerkLib.FerasBoonBreedingBitch) >= 0) {
				if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
			}
			if (player.findPerk(PerkLib.FerasBoonWideOpen) >= 0 || player.findPerk(PerkLib.FerasBoonMilkingTwat) >= 0) {
				if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
			}
			if (flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
				flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
				return true;
			}
			//DOUBLE PREGGERS SPEED
			if (player.findPerk(PerkLib.BroodMother) >= 0) {
				if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
			}
			if (flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
				flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
				return true;
			}
		}
		//Diapause!
		else if (flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00228] > 0 && (player.pregnancyIncubation > 0 || player.buttPregnancyIncubation > 0)) {
			if (flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00229] == 1) {
				flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00229] = 0;
				outputText("\n\nYour body reacts to the influx of nutrition, accelerating your pregnancy. Your belly bulges outward slightly.", false);
				needNext = true;
			}
			if (flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
				flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
				return true;
			}
			flags[kFLAGS.UNKNOWN_FLAG_NUMBER_00228]--;
			if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
			if (flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
				flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
				return true;
			}
			if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
			if (flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
				flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
				return true;
			}
			if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
			if (flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
				flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
				return true;
			}
			//DOUBLE PREGGERS SPEED
			if (player.findPerk(PerkLib.MaraesGiftFertility) >= 0) {
				if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
			}
			//DOUBLE PREGGERS SPEED
			if (player.findPerk(PerkLib.MagicalFertility) >= 0) {
				if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
			}
			if (flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
				flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
				return true;
			}
			if (player.findPerk(PerkLib.FerasBoonBreedingBitch) >= 0) {
				if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
			}
			if (player.findPerk(PerkLib.FerasBoonWideOpen) >= 0 || player.findPerk(PerkLib.FerasBoonMilkingTwat) >= 0) {
				if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
			}
			if (flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
				flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
				return true;
			}
			//DOUBLE PREGGERS SPEED
			if (player.findPerk(PerkLib.BroodMother) >= 0) {
				if (player.pregnancyAdvance()) needNext = true; //Make sure pregnancy texts aren't hidden
			}
			if (flags[kFLAGS.EVENT_PARSER_ESCAPE] == 1) {
				flags[kFLAGS.EVENT_PARSER_ESCAPE] = 0;
				return true;
			}
		}
		//Egg loot!
		if(player.findStatusAffect(StatusAffects.LootEgg) >= 0) {
			trace("EGG LOOT HAS");
			//default
			var itype:ItemType =
					[
						[consumables.BROWNEG,consumables.PURPLEG,consumables.BLUEEGG,consumables.PINKEGG,consumables.WHITEEG,consumables.BLACKEG],
						[consumables.L_BRNEG,consumables.L_PRPEG,consumables.L_BLUEG,consumables.L_PNKEG,consumables.L_WHTEG,consumables.L_BLKEG]]
							[player.statusAffect(player.findStatusAffect(StatusAffects.Eggs)).value2 || 0][player.statusAffect(player.findStatusAffect(StatusAffects.Eggs)).value1 || 0] ||
							consumables.BROWNEG;
			player.removeStatusAffect(StatusAffects.LootEgg);
			player.removeStatusAffect(StatusAffects.Eggs);
			trace("TAKEY NAU");
			inventory.takeItem(itype, playerMenu);
			return true;
		}
		// Benoit preggers update
		if (flags[kFLAGS.FEMOIT_EGGS] > 0) flags[kFLAGS.FEMOIT_INCUBATION]--; // We're not capping it, we're going to use negative values to figure out diff events
	}
	
	// Hanging the Uma massage update here, I think it should work...
	telAdre.umasShop.updateBonusDuration(time);
	if (player.findStatusAffect(StatusAffects.UmasMassage) >= 0)
	{
		trace("Uma's massage bonus time remaining: " + player.statusAffectv3(StatusAffects.UmasMassage));
	}
	
	highMountains.izumiScenes.updateSmokeDuration(time);
	if (player.findStatusAffect(StatusAffects.IzumisPipeSmoke) >= 0)
	{
		trace("Izumis pipe smoke time remaining: " + player.statusAffectv1(StatusAffects.IzumisPipeSmoke));
	}
	
	//Drop axe if too short!
	if (player.tallness < 78 && player.weapon == weapons.L__AXE) {
		outputText("<b>\nThis axe is too large for someone of your stature to use, though you can keep it in your inventory until you are big enough.</b>\n");
		inventory.takeItem(player.setWeapon(WeaponLib.FISTS), playerMenu);
		return true;
	}
	if (player.weapon == weapons.L_HAMMR && player.tallness < 60) {
		outputText("<b>\nYou've become too short to use this hammer anymore.  You can still keep it in your inventory, but you'll need to be taller to effectively wield it.</b>\n");
		inventory.takeItem(player.setWeapon(WeaponLib.FISTS), playerMenu);
		return true;
	}		
	if (player.weapon == weapons.CLAYMOR && player.str < 40) {
		outputText("\n<b>You aren't strong enough to handle the weight of your weapon any longer, and you're forced to stop using it.</b>\n");
		inventory.takeItem(player.setWeapon(WeaponLib.FISTS), playerMenu);
		return true;
	}
	if (player.weapon == weapons.WARHAMR && player.str < 80) {
		outputText("\n<b>You aren't strong enough to handle the weight of your weapon any longer!</b>\n");
		inventory.takeItem(player.setWeapon(WeaponLib.FISTS), playerMenu);
		return true;
	}
	//Drop beautiful sword if corrupted!
	if (player.weaponPerk == "holySword" && player.cor >= 35) {
		outputText("<b>\nThe <u>" + player.weaponName + "</u> grows hot in your hand, until you are forced to drop it.  Whatever power inhabits this blade appears to be unhappy with you.  Touching it gingerly, you realize it is no longer hot, but as soon as you go to grab the hilt, it nearly burns you.\n\nYou realize you won't be able to use it right now, but you could probably keep it in your inventory.</b>\n\n");
		inventory.takeItem(player.setWeapon(WeaponLib.FISTS), playerMenu);
		return true;
	}
	//Unequip Lusty maiden armor
	if (player.armorName == "lusty maiden's armor") {
		//Removal due to no longer fitting:
		//Grew Cock or Balls
		if (player.hasCock() || player.balls > 0) {
			outputText("\nYou fidget uncomfortably in the g-string of your lewd bikini - there simply isn't enough room for your ");
			if (player.hasCock()) outputText("maleness");
			else outputText("bulgy balls");
			outputText(" within the imprisoning leather, and it actually hurts to wear it.  <b>You'll have to find some other form of protection!</b>\n\n");
			inventory.takeItem(player.setArmor(ArmorLib.COMFORTABLE_UNDERCLOTHES), playerMenu);
			return true;
		}
		//Lost pussy
		else if (!player.hasVagina()) {
			outputText("\nYou fidget uncomfortably as the crease in the gusset of your lewd bikini digs into your sensitive, featureless loins.  There's simply no way you can continue to wear this outfit in comfort - it was expressly designed to press in on the female mons, and without a vagina, <b>you simply can't wear this exotic armor.</b>\n\n");
			inventory.takeItem(player.setArmor(ArmorLib.COMFORTABLE_UNDERCLOTHES), playerMenu);
			return true;
		}
		//Tits gone or too small
		else if (player.biggestTitSize() < 4) {
			outputText("\nThe fine chain that makes up your lewd bikini-top is dangling slack against your flattened chest.  Every movement and step sends it jangling noisily, slapping up against your [nipples], uncomfortably cold after being separated from your " + player.skinFurScales() + " for so long.  <b>There's no two ways about it - you'll need to find something else to wear.</b>\n\n");
			inventory.takeItem(player.setArmor(ArmorLib.COMFORTABLE_UNDERCLOTHES), playerMenu);
			return true;
		}
	}
	// update cock type as dog/fox depending on whether the player resembles one more than the other.
	// Previously used to be computed directly in cockNoun, but refactoring prevents access to the Player class when in cockNoun now.
	if (player.totalCocks() != 0)
	{
		var counter: number = player.totalCocks() - 1;
		while (counter >= 0)
		{
			if (player.cocks[counter].cockType == CockTypesEnum.DOG || player.cocks[counter].cockType == CockTypesEnum.FOX)
			{
				if (player.dogScore() >= player.foxScore())
					player.cocks[counter].cockType = CockTypesEnum.DOG;
				else
					player.cocks[counter].cockType = CockTypesEnum.FOX;
			}
			counter--;
			// trace("IMA LOOPIN", counter);
		}
		
	}	
	statScreenRefresh();
	if (needNext) {
		doNext(playerMenu);
		return true;
	}
	playerMenu();
	return false;
}

export function cheatTime(time: number):void {
	while(time > 0) {
		time--;
		model.time.hours++;
		if(model.time.hours > 23) {
			model.time.days++;
			model.time.hours = 0;
		}
	}
	statScreenRefresh();
}

export function growHair(amount: number = .1): boolean {
	//Grow hair!
	temp = player.hairLength;
	player.hairLength += amount;
	if(player.hairLength > 0 && temp == 0) {
		outputText("\n<b>You are no longer bald.  You now have " + hairDescript() + " coating your head.\n</b>", false);
		return true;
	}
	else if(player.hairLength >= 1 && temp < 1) {
		outputText("\n<b>Your hair's growth has reached a new threshhold, giving you " + hairDescript() + ".\n</b>", false);
		return true;
	}
	else if(player.hairLength >= 3 && temp < 3) {
		outputText("\n<b>Your hair's growth has reached a new threshhold, giving you " + hairDescript() + ".\n</b>", false);
		return true;
	}
	else if(player.hairLength >= 6 && temp < 6) {
		outputText("\n<b>Your hair's growth has reached a new threshhold, giving you " + hairDescript() + ".\n</b>", false);
		return true;
	}
	else if(player.hairLength >= 10 && temp < 10) {
		outputText("\n<b>Your hair's growth has reached a new threshhold, giving you " + hairDescript() + ".\n</b>", false);
		return true;
	}
	else if(player.hairLength >= 16 && temp < 16) {
		outputText("\n<b>Your hair's growth has reached a new threshhold, giving you " + hairDescript() + ".\n</b>", false);
		return true;
	}
	else if(player.hairLength >= 26 && temp < 26) {
		outputText("\n<b>Your hair's growth has reached a new threshhold, giving you " + hairDescript() + ".\n</b>", false);
		return true;
	}
	else if(player.hairLength >= 40 && temp < 40) {
		outputText("\n<b>Your hair's growth has reached a new threshhold, giving you " + hairDescript() + ".\n</b>", false);
		return true;
	}
	else if(player.hairLength >= 40 && player.hairLength >= player.tallness && temp < player.tallness) {
		outputText("\n<b>Your hair's growth has reached a new threshhold, giving you " + hairDescript() + ".\n</b>", false);
		return true;
	}
	return false;
}
