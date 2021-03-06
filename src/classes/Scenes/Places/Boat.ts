/**
 * Created by aimozg on 06.01.14.
 */
package classes.Scenes.Places
{
	import classes.*;
	import classes.GlobalFlags.FlagEnum;
	import classes.GlobalFlags.kGAMECLASS;
	import classes.Scenes.Areas.Lake.*;
	import classes.Scenes.Places.Boat.*;

	public class Boat extends AbstractLakeContent
	{
		public let sharkGirlScene:SharkGirlScene = new SharkGirlScene();
		public let marae:Marae = new Marae();
		public Boat()
		{
		}
		public discoverBoat():void {
			player.statusAffects.add(new StatusAffect("BoatDiscovery",0,0,0,0)));
			MainScreen.text("You journey around the lake, seeking demons to fight", true);
			if(player.stats.cor > 60) MainScreen.text(" or fuck", false);
			MainScreen.text(".  The air is fresh, and the grass is cool and soft under your feet.   Soft waves lap against the muddy sand of the lake-shore, as if radiating outward from the lake.   You pass around a few bushes carefully, being wary of hidden 'surprises', and come upon a small dock.  The dock is crafted from old growth trees lashed together with some crude rope.  Judging by the appearance of the rope, it is very old and has not been seen to in quite some time.  Tied to the dock is a small rowboat, only about seven feet long and three feet wide.   The boat appears in much better condition than the dock, and appears to be brand new.\n\n", false);
			MainScreen.text("<b>You have discovered the lake boat!</b>\n(You may return and use the boat to explore the lake's interior by using the 'places' menu.)", false);
			doNext(camp.returnToCampUseOneHour);
		}
		public boatExplore():void
		{
			//Helia monogamy fucks
			if (Flags.list[FlagEnum.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 && Flags.list[FlagEnum.HEL_RAPED_TODAY] == 0 && rand(10) == 0 && player.gender > 0 && !kGAMECLASS.helScene.followerHel()) {
				kGAMECLASS.helScene.helSexualAmbush();
				return;
			}
			MainScreen.text("You reach the dock without any incident and board the small rowboat.  The water is calm and placid, perfect for rowing.  ", true);
			if (player.statusAffects.has("FactoryOverload")) {
				MainScreen.text("The water appears somewhat muddy and has a faint pungent odor.  ", false);
				if (player.stats.int > 40) MainScreen.text("You realize what it smells like – sex.  ", false);
			}
			//3% chance of finding lost daughters
			if (rand(100) <= 3 && Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00412] > 0 && kGAMECLASS.izmaScene.izmaFollower()) {
				kGAMECLASS.izmaScene.findLostIzmaKids();
				return;
			}
			MainScreen.text("You set out, wondering if you'll find any strange islands or creatures in the lake.\n\n", false);
			//20% chance if not done with marae of meeting her.
			if (rand(10) <= 2 && !player.statusAffects.has("MaraeComplete") && !player.statusAffects.has("MetCorruptMarae")) {
				marae.encounterMarae();
				return;
			}
			//10% chance of corrupt Marae followups
			if ((debug || rand(10) == 0) && Flags.list[FlagEnum.CORRUPT_MARAE_FOLLOWUP_ENCOUNTER_STATE] == 0 && player.statusAffects.has("MetCorruptMarae") && player.gender > 0) {
				marae.level2MaraeEncounter();
				return;
			}
			//BUILD LIST OF CHOICES
			let choice:Array = [0, 1, 2, 3];
			if (player.statusAffects.has("DungeonShutDown") && player.level > 2)
				choice[choice.length] = 4;
			choice[choice.length] = 5;
			//MAKE YOUR CHOICE
			let selector:number = choice[rand(choice.length)];
			//RUN CHOSEN EVENT
			switch (selector) {
				case 0:
					MainScreen.text("You row for nearly an hour, until your arms practically burn with exhaustion from all the rowing.", false);
					doNext(camp.returnToCampUseOneHour);
					return;
				case 1:
					MainScreen.text("You give up on finding anything interesting, and decide to go check up on your camp.", false);
					doNext(camp.returnToCampUseOneHour);
					return;
				case 2:
					sharkGirlScene.sharkGirlEncounter(1);
					return;
				case 3:
					sharkGirlScene.sharkGirlEncounter(1);
					return;
				case 4:
					lake.fetishZealotScene.zealotBoat();
					return;
				case 5:
					kGAMECLASS.anemoneScene.mortalAnemoneeeeee();
					return;
			}

		}
	}
}
