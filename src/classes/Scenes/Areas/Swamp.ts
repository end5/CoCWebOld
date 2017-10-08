/**
 * Created by aimozg on 06.01.14.
 */
export default class Swamp {
	public let corruptedDriderScene:CorruptedDriderScene = new CorruptedDriderScene();
	public let femaleSpiderMorphScene:FemaleSpiderMorphScene = new FemaleSpiderMorphScene();
	public let maleSpiderMorphScene:MaleSpiderMorphScene = new MaleSpiderMorphScene();
	public let rogar:Rogar = new Rogar();
	public exploreSwamp(): void {
		//Discover 'Bog' at after 25 explores of swamp
		if ((Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00272] >= 25) && Flags.list[FlagEnum.BOG_EXPLORED] == 0) {
			MainScreen.text("While exploring the swamps, you find yourself into a particularly dark, humid area of this already fetid biome.  You judge that you could find your way back here pretty easily in the future, if you wanted to.  With your newfound discovery fresh in your mind, you return to camp.\n\n(<b>Bog exploration location unlocked! (Page 2)</b>)", true);
			Flags.list[FlagEnum.BOG_EXPLORED]++;
			doNext(camp.returnToCampUseOneHour);
			return;
		}
		Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00272]++;
		/*  SPECIAL SCENE OVERWRITES */
		//KIHA X HEL THREESOME!
		if (!kGAMECLASS.kihaFollower.followerKiha() && player.stats.cor < 60 && Flags.list[FlagEnum.KIHA_AFFECTION_LEVEL] >= 1 && Flags.list[FlagEnum.HEL_FUCKBUDDY] > 0 && player.lowerBody.cockSpot.hasCock() && Flags.list[FlagEnum.KIHA_AND_HEL_WHOOPIE] == 0) {
			kGAMECLASS.kihaFollower.kihaXSalamander();
			return;
		}
		//Helia monogamy fucks
		if (Flags.list[FlagEnum.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 && Flags.list[FlagEnum.HEL_RAPED_TODAY] == 0 && rand(10) == 0 && player.gender > 0 && !kGAMECLASS.helFollower.followerHel()) {
			kGAMECLASS.helScene.helSexualAmbush();
			return;
		}
		if (Flags.list[FlagEnum.TOOK_EMBER_EGG] == 0 && Flags.list[FlagEnum.EGG_BROKEN] == 0 && Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00272] > 0 && (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00272] % 40 == 0)) {
			kGAMECLASS.emberScene.findEmbersEgg();
			return;
		}
		/*  STANDARD SCENE SELECTION  */
		let choices: Array = [];
		//Build the choice array
		//M & F spidermorphs
		choices[choices.length] = 0;
		choices[choices.length] = 1;
		//Drider
		choices[choices.length] = 2;
		//ROGAR
		if (Flags.list[FlagEnum.ROGAR_DISABLED] == 0 && Flags.list[FlagEnum.ROGAR_PHASE] < 3)
			choices[choices.length] = 3;
		//Kiha
		choices[choices.length] = 4;

		//Pick from the choices and pull the encounter.
		let choice: number = choices[rand(choices.length)];
		switch (choice) {
			case 0:
				femaleSpiderMorphScene.fSpiderMorphGreeting();
				break;
			case 1:
				maleSpiderMorphScene.greetMaleSpiderMorph();
				break;
			case 2:
				corruptedDriderScene.driderEncounter();
				break;
			case 3:
				rogar.encounterRogarSwamp();
				break;
			case 4:
				//Kiha follower gets to explore her territory!
				if (kGAMECLASS.kihaFollower.followerKiha()) kGAMECLASS.kihaScene.kihaExplore();
				else kGAMECLASS.kihaScene.encounterKiha();
				break;
			default:
				MainScreen.text("New explore code fucked up.  YOU BONED (TELL FEN)");
				doNext(playerMenu);
				break;
		}
	}
}
}
