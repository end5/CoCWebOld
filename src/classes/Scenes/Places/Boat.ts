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
		public function Boat()
		{
		}
		public function discoverBoat():void {
			player.statusAffects.add(new StatusAffect("BoatDiscovery",0,0,0,0)));
			Render.text("You journey around the lake, seeking demons to fight", true);
			if(player.stats.cor > 60) Render.text(" or fuck", false);
			Render.text(".  The air is fresh, and the grass is cool and soft under your feet.   Soft waves lap against the muddy sand of the lake-shore, as if radiating outward from the lake.   You pass around a few bushes carefully, being wary of hidden 'surprises', and come upon a small dock.  The dock is crafted from old growth trees lashed together with some crude rope.  Judging by the appearance of the rope, it is very old and has not been seen to in quite some time.  Tied to the dock is a small rowboat, only about seven feet long and three feet wide.   The boat appears in much better condition than the dock, and appears to be brand new.\n\n", false);
			Render.text("<b>You have discovered the lake boat!</b>\n(You may return and use the boat to explore the lake's interior by using the 'places' menu.)", false);
			doNext(camp.returnToCampUseOneHour);
		}
		public function boatExplore():void
		{
			//Helia monogamy fucks
			if (flags[FlagEnum.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 && flags[FlagEnum.HEL_RAPED_TODAY] == 0 && rand(10) == 0 && player.gender > 0 && !kGAMECLASS.helScene.followerHel()) {
				kGAMECLASS.helScene.helSexualAmbush();
				return;
			}
			Render.text("You reach the dock without any incident and board the small rowboat.  The water is calm and placid, perfect for rowing.  ", true);
			if (player.statusAffects.has("FactoryOverload")) {
				Render.text("The water appears somewhat muddy and has a faint pungent odor.  ", false);
				if (player.stats.int > 40) Render.text("You realize what it smells like – sex.  ", false);
			}
			//3% chance of finding lost daughters
			if (rand(100) <= 3 && flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00412] > 0 && kGAMECLASS.izmaScene.izmaFollower()) {
				kGAMECLASS.izmaScene.findLostIzmaKids();
				return;
			}
			Render.text("You set out, wondering if you'll find any strange islands or creatures in the lake.\n\n", false);
			//20% chance if not done with marae of meeting her.
			if (rand(10) <= 2 && player.findStatusAffect(StatusAffects.MaraeComplete) < 0 && player.findStatusAffect(StatusAffects.MetCorruptMarae) < 0) {
				marae.encounterMarae();
				return;
			}
			//10% chance of corrupt Marae followups
			if ((debug || rand(10) == 0) && flags[FlagEnum.CORRUPT_MARAE_FOLLOWUP_ENCOUNTER_STATE] == 0 && player.statusAffects.has("MetCorruptMarae") && player.gender > 0) {
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
					Render.text("You row for nearly an hour, until your arms practically burn with exhaustion from all the rowing.", false);
					doNext(camp.returnToCampUseOneHour);
					return;
				case 1:
					Render.text("You give up on finding anything interesting, and decide to go check up on your camp.", false);
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
