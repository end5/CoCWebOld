/**
 * Created by aimozg on 06.01.14.
 */
	export class Bog extends BaseContent
	{
		public frogGirlScene:FrogGirlScene = new FrogGirlScene();
		public chameleonGirlScene:ChameleonGirlScene = new ChameleonGirlScene();
		public phoukaScene:PhoukaScene = new PhoukaScene();
		public Bog()
		{
		}
		public exploreBog():void
		{
			flags[kFLAGS.BOG_EXPLORED]++;
			//Helia monogamy fucks
			if (flags[kFLAGS.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 && flags[kFLAGS.HEL_RAPED_TODAY] == 0 && rand(10) == 0 && player.gender > 0 && !kGAMECLASS.helFollower.followerHel()) {
				kGAMECLASS.helScene.helSexualAmbush();
				return;
			}
			if ((isHalloween() && (date.fullYear > flags[kFLAGS.TREACLE_MINE_YEAR_DONE]) && flags[kFLAGS.BOG_EXPLORED] % 4 == 0) && (flags[kFLAGS.PHOUKA_LORE] > 0)) {
				phoukaScene.phoukaHalloween(); //Must have met them enough times to know what they're called, have some idea of their normal behaviour
				return;
			}
			if (player.buttPregnancyIncubation == 0 && rand(3) == 0) frogGirlScene.findTheFrogGirl();
            else if (rand(3) == 0) phoukaScene.phoukaEncounter();
			else if (rand(2) == 0) chameleonGirlScene.encounterChameleon();
			else {
				clearOutput();
				outputText("You wander around through the humid muck, but you don't run into anything interesting.");
				doNext(camp.returnToCampUseOneHour);
			}
		}
	}
}
