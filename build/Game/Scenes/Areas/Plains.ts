/**
 * Created by aimozg on 06.01.14.
 */
export class Plains {
	public let bunnyGirl:BunnyGirl = new BunnyGirl();
	public let gnollScene:GnollScene = new GnollScene();
	public let gnollSpearThrowerScene:GnollSpearThrowerScene = new GnollSpearThrowerScene();
	public let satyrScene:SatyrScene = new SatyrScene();

	public explorePlains(): void {
		DisplayText().clear();
		Flags.list[FlagEnum.TIMES_EXPLORED_PLAINS]++;
		//Dem Kangasluts!  Force Sheila relationship phase!
		if (Flags.list[FlagEnum.SHEILA_DEMON] === 0 && Flags.list[FlagEnum.SHEILA_XP] === 3 && model.time.hours === 20 && Flags.list[FlagEnum.SHEILA_CLOCK] >= 0) {
			kGAMECLASS.sheilaScene.sheilaXPThreeSexyTime();
			return;
		}
		//Add some holiday cheer
		if (isHolidays() && date.fullYear > Flags.list[FlagEnum.CANDY_CANE_YEAR_MET] && randInt(5) === 0) {
			kGAMECLASS.candyCaneTrapDiscovery();
			return;
		}
		if (isHolidays() && date.fullYear > Flags.list[FlagEnum.POLAR_PETE_YEAR_MET] && randInt(4) === 0 && silly()) {
			kGAMECLASS.polarPete();
			Flags.list[FlagEnum.POLAR_PETE_YEAR_MET] = date.fullYear;
			return;
		}
		//Helia monogamy fucks
		if (Flags.list[FlagEnum.PC_PROMISED_HEL_MONOGAMY_FUCKS] === 1 && Flags.list[FlagEnum.HEL_RAPED_TODAY] === 0 && randInt(10) === 0 && player.gender > 0 && !kGAMECLASS.helScene.followerHel()) {
			kGAMECLASS.helScene.helSexualAmbush();
			return;
		}
		//Find Niamh
		if (Flags.list[FlagEnum.NIAMH_MOVED_OUT_COUNTER] === 1) {
			kGAMECLASS.telAdre.niamh.niamhPostTelAdreMoveOut();
			return;
		}
		//Find Owca
		if (player.level >= 8 && Flags.list[FlagEnum.TIMES_EXPLORED_PLAINS] % 25 === 0 && Flags.list[FlagEnum.OWCA_UNLOCKED] === 0) {
			kGAMECLASS.owca.gangbangVillageStuff();
			return;
		}
		//Bazaar!
		if (Flags.list[FlagEnum.TIMES_EXPLORED_PLAINS] % 10 === 0 && Flags.list[FlagEnum.BAZAAR_ENTERED] === 0) {
			kGAMECLASS.bazaar.findBazaar();
			return;
		}
		//Chance of threesomes!
		if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00256] != 0 && Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00257] != 0 && Flags.list[FlagEnum.HEL_FUCKBUDDY] === 1 && Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00260] === 0 && !kGAMECLASS.isabellaFollowerScene.isabellaFollower() && Flags.list[FlagEnum.TIMES_EXPLORED_PLAINS] % 21 === 0 && !(player.tallness > 78 && Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00258] === 0)) {
			//Hell/Izzy threesome intro
			if (Flags.list[FlagEnum.HEL_ISABELLA_THREESOME_ENABLED] === 0) {
				kGAMECLASS.helScene.salamanderXIsabellaPlainsIntro();
				return;
			}
			//Propah threesomes here!
			else if (Flags.list[FlagEnum.HEL_ISABELLA_THREESOME_ENABLED] === 1) {
				kGAMECLASS.helScene.isabellaXHelThreeSomePlainsStart();
				return;
			}
		}

		let choices: Array = [plainsLoot, plainsLoot,
			gnollSpearThrowerScene.gnoll2Encounter,
			gnollScene.gnollEncounter,
			bunnyGirl.bunnbunbunMeet, bunnyGirl.bunnbunbunMeet];

		if (Flags.list[FlagEnum.ISABELLA_PLAINS_DISABLED] === 0) {
			choices[choices.length] = kGAMECLASS.isabellaScene.isabellaGreeting;
			choices[choices.length] = kGAMECLASS.isabellaScene.isabellaGreeting;
		}
		if (!kGAMECLASS.helScene.followerHel()) {
			choices[choices.length] = kGAMECLASS.helScene.encounterAJerkInThePlains;
			choices[choices.length] = kGAMECLASS.helScene.encounterAJerkInThePlains;
		}
		choices[choices.length] = satyrScene.satyrEncounter;
		choices[choices.length] = satyrScene.satyrEncounter;
		if (Flags.list[FlagEnum.SHEILA_DISABLED] === 0 && Flags.list[FlagEnum.SHEILA_CLOCK] >= 0) { //Aparently Sheila was supposed to be disabled after certain events - now fixed
			choices[choices.length] = kGAMECLASS.sheilaScene.sheilaEncounterRouter;
			choices[choices.length] = kGAMECLASS.sheilaScene.sheilaEncounterRouter;
		}
		//Pick one
		choices[randInt(choices.length)]();
	}

	private plainsLoot(): void {
		if (randInt(2) === 0) { //OVI
			DisplayText("While exploring the plains you nearly trip over a discarded, hexagonal bottle.  ");
			inventory.takeItem(consumables.OVIELIX, Scenes.camp.returnToCampUseOneHour);
		}
		else { //FIND KANGAAA
			DisplayText("While exploring the plains you come across a strange-looking plant.  As you peer at it, you realize it has some fruit you can get at.  ");
			inventory.takeItem(consumables.KANGAFT, Scenes.camp.returnToCampUseOneHour);
		}
	}
}
}
