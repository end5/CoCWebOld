/**
 * Created by aimozg on 06.01.14.
 */
export default class Bog {
	public let frogGirlScene:FrogGirlScene = new FrogGirlScene();
	public let chameleonGirlScene:ChameleonGirlScene = new ChameleonGirlScene();
	public let phoukaScene:PhoukaScene = new PhoukaScene();
	public Bog() {
	}
	public exploreBog(): void {
		Flags.list[FlagEnum.BOG_EXPLORED]++;
		//Helia monogamy fucks
		if (Flags.list[FlagEnum.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 && Flags.list[FlagEnum.HEL_RAPED_TODAY] == 0 && rand(10) == 0 && player.gender > 0 && !kGAMECLASS.helFollower.followerHel()) {
			kGAMECLASS.helScene.helSexualAmbush();
			return;
		}
		if ((isHalloween() && (date.fullYear > Flags.list[FlagEnum.TREACLE_MINE_YEAR_DONE]) && Flags.list[FlagEnum.BOG_EXPLORED] % 4 == 0) && (Flags.list[FlagEnum.PHOUKA_LORE] > 0)) {
			phoukaScene.phoukaHalloween(); //Must have met them enough times to know what they're called, have some idea of their normal behaviour
			return;
		}
		if (player.buttPregnancyIncubation == 0 && rand(3) == 0) frogGirlScene.findTheFrogGirl();
		else if (rand(3) == 0) phoukaScene.phoukaEncounter();
		else if (rand(2) == 0) chameleonGirlScene.encounterChameleon();
		else {
			MainScreen.clearText();
			MainScreen.text("You wander around through the humid muck, but you don't run into anything interesting.");
			doNext(camp.returnToCampUseOneHour);
		}
	}
}
}
