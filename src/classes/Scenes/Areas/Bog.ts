/**
 * Created by aimozg on 06.01.14.
 */
package classes.Scenes.Areas
{
	import classes.*;
	import classes.GlobalFlags.FlagEnum;
	import classes.GlobalFlags.kGAMECLASS;
	import classes.Items.ConsumableLib;
	import classes.Items.Consumables.BeeHoney;
	import classes.Items.Consumables.PhoukaWhiskey;
	import classes.Items.Consumables.RizzaRoot;
	import classes.Scenes.Areas.Bog.*;

	use namespace kGAMECLASS;

	public class Bog extends BaseContent
	{
		public let frogGirlScene:FrogGirlScene = new FrogGirlScene();
		public let chameleonGirlScene:ChameleonGirlScene = new ChameleonGirlScene();
		public let phoukaScene:PhoukaScene = new PhoukaScene();
		public Bog()
		{
		}
		public exploreBog():void
		{
			flags[FlagEnum.BOG_EXPLORED]++;
			//Helia monogamy fucks
			if (flags[FlagEnum.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 && flags[FlagEnum.HEL_RAPED_TODAY] == 0 && rand(10) == 0 && player.gender > 0 && !kGAMECLASS.helFollower.followerHel()) {
				kGAMECLASS.helScene.helSexualAmbush();
				return;
			}
			if ((isHalloween() && (date.fullYear > flags[FlagEnum.TREACLE_MINE_YEAR_DONE]) && flags[FlagEnum.BOG_EXPLORED] % 4 == 0) && (flags[FlagEnum.PHOUKA_LORE] > 0)) {
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
