/**
 * Created by aimozg on 06.01.14.
 */
package classes.Scenes.Areas
{
	import classes.*;
	import classes.GlobalFlags.FlagEnum;
	import classes.GlobalFlags.kGAMECLASS;
	import classes.Scenes.Areas.HighMountains.*;

	use namespace kGAMECLASS;

	public class HighMountains extends BaseContent
	{
		public let basiliskScene:BasiliskScene = new BasiliskScene();
		public let harpyScene:HarpyScene = new HarpyScene();
		public let minervaScene:MinervaScene = new MinervaScene();
		public let minotaurMobScene:MinotaurMobScene = new MinotaurMobScene();
		public let izumiScenes:IzumiScene = new IzumiScene();
		
		public function HighMountains()
		{
		}
		
		//Explore High Mountain
		public function exploreHighMountain():void
		{
			flags[FlagEnum.DISCOVERED_HIGH_MOUNTAIN]++;
			doNext(playerMenu);
			
			if (kGAMECLASS.d3.discoverD3() == true)
			{
				return;
			}
			
			let chooser:number = rand(4);
			//Boosts mino and hellhound rates!
			if (player.perks.has("PiercedFurrite") && rand(3) == 0) {
				chooser = 1;
			}
			//Helia monogamy fucks
			if (flags[FlagEnum.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 && flags[FlagEnum.HEL_RAPED_TODAY] == 0 && rand(10) == 0 && player.gender > 0 && !kGAMECLASS.helScene.followerHel()) {
				kGAMECLASS.helScene.helSexualAmbush();
				return;
			}
			//Gats xmas adventure!
			if (rand(5) == 0 && player.gender > 0 && isHolidays() && flags[FlagEnum.GATS_ANGEL_DISABLED] == 0 && flags[FlagEnum.GATS_ANGEL_GOOD_ENDED] == 0 && (flags[FlagEnum.GATS_ANGEL_QUEST_BEGAN] == 0 || player.hasKeyItem("North Star Key") >= 0)) {
				kGAMECLASS.gatsSpectacularRouter();
				return;
			}
			//Minerva
			if (flags[FlagEnum.DISCOVERED_HIGH_MOUNTAIN] % 8 == 0 && flags[FlagEnum.MET_MINERVA] < 4) {
				minervaScene.encounterMinerva();
				return;
			}
			//25% minotaur sons!
			if (flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00326] >= 3 && rand(4) == 0 && player.lowerBody.vaginaSpot.hasVagina()) {
				spriteSelect(44);
				minotaurMobScene.meetMinotaurSons();
				return;
			}
			//Harpy odds!
			if (player.hasItem(consumables.OVIELIX)) {
				if (player.hasItem(consumables.OVIELIX, 2)) {
					if (rand(4) == 0) {
						chickenHarpy();
						return;
					}
				}
				else {
					if (rand(10) == 0) {
						chickenHarpy();
						return;
					}
				}
			}
			//10% chance to mino encounter rate if addicted
			if (flags[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] > 0 && rand(10) == 0) {
				spriteSelect(44);
				//Cum addictus interruptus!  LOL HARRY POTTERFAG
				//Withdrawl auto-fuck!
				if (flags[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] == 3) {
					getGame().mountain.minotaurScene.minoAddictionFuck();
					return;
				}
				getGame().mountain.minotaurScene.getRapedByMinotaur(true);
				spriteSelect(44);
				return;
			}
			trace("Chooser goin for" + chooser);
			
			//Generic harpy
			if (chooser == 0) {
				Render.text("A harpy wings out of the sky and attacks!", true);
				startCombat(new Harpy());
				spriteSelect(26);
				return;
			}
			//Basilisk!
			if (chooser == 1) {
				basiliskScene.basiliskGreeting();
				return;
			}
			//Sophie
			if (chooser == 2) {
				if (flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00282] > 0 || flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00283] > 0 || kGAMECLASS.sophieFollowerScene.sophieFollower()) {
					Render.text("A harpy wings out of the sky and attacks!", true);
					startCombat(new Harpy());
					spriteSelect(26);
				}
				else {
					if (flags[FlagEnum.MET_SOPHIE_COUNTER] == 0) kGAMECLASS.sophieScene.meetSophie();
					else kGAMECLASS.sophieScene.meetSophieRepeat();
				}
			}
			if (chooser == 3) 
			{
				this.izumiScenes.encounter();
				return;
			}
		}
		//\"<i>Chicken Harpy</i>\" by Jay Gatsby and not Savin he didn't do ANYTHING
		//Initial Intro
		public function chickenHarpy():void
		{
			clearOutput();
			spriteSelect(90);
			if (flags[FlagEnum.TIMES_MET_CHICKEN_HARPY] == 0) {
				Render.text("Taking a stroll along the mountains, you come across a peculiar-looking harpy wandering around with a large wooden cart in tow.  She's far shorter and bustier than any regular harpy you've seen before, reaching barely 4' in height but managing to retain some semblance of their thick feminine asses.  In addition to the fluffy white feathers decorating her body, the bird-woman sports about three more combed back upon her forehead like a quiff, vividly red in color.");
				Render.text("\n\nHaving a long, hard think at the person you're currently making uncomfortable with your observational glare, you've come to a conclusion - she must be a chicken harpy!");
				Render.text("\n\nAs you take a look inside of the cart you immediately spot a large hoard of eggs stacked clumsily in a pile.  The curious collection of eggs come in many colors and sizes, protected by a sheet of strong canvas to keep it all together.");
				Render.text("\n\nThe chicken harpy - rather unnerved by the unflattering narration of her appearance you've accidentally shouted out loud - decides to break the ice by telling you about the cart currently holding your interest.");
				Render.text("\n\n\"<i>Heya traveller, I noticed you were interested in my eggs here - they're not for sale, but perhaps we can come to some sort of agreement?</i>\"");
				Render.text("\n\nYou put a hand to your chin and nod.  You are travelling, that's correct. The chicken harpy takes the gesture as a sign to continue.");
				Render.text("\n\n\"<i>Well you see, these eggs don't really grow from trees - in fact, I've gotta chug down at least two or three ovi elixirs to get a good haul with my body, y'know?  Since it's tough for a lil' gal like me to find a few, I like to trade an egg over for some elixirs to those willing to part with them.</i>\"");
				Render.text("\n\nSounds reasonable enough, you suppose.  Two or three elixirs for an egg? Doable for sure.");
				Render.text("\n\n\"<i>So whaddya say, do y'have any elixirs you can fork over?</i>\"");
			}
			else {
				//Repeat Intro
				Render.text("Taking a stroll along the mountains, you come across a familiar-looking shorty wandering around with a large wooden cart in tow.");
				Render.text("\n\nHaving a long, hard think at the person you're currently making uncomfortable with your observational glare, you've come to a conclusion - she must be the chicken harpy!");
				Render.text("\n\nYou run towards her as she waves a 'hello', stopping the cart to allow you to catch up.  Giving out her usual spiel about the eggs, she giggles and thrusts out a hand.");
				Render.text("\n\n\"<i>Hey sunshine, do y'have any elixirs you can give me today?</i>\"");
				//[Give Two][Give Three]	[No, I Must Now Return To My People]
			}
			flags[FlagEnum.TIMES_MET_CHICKEN_HARPY]++;
			//[Give Two][Give Three]		[Not Really, No]
			menu();
			if (player.hasItem(consumables.OVIELIX, 2)) addButton(0, "Give Two", giveTwoOviElix);
			if (player.hasItem(consumables.OVIELIX, 3)) addButton(1, "Give Three", giveThreeOviElix);
			addButton(4, "Leave", leaveChickenx);
		}

		//If Give Two
		public function giveTwoOviElix():void
		{
			clearOutput();
			spriteSelect(90);
			player.consumeItem(consumables.OVIELIX);
			player.consumeItem(consumables.OVIELIX);
			Render.text("You hand over two elixirs, the harpy more than happy to take them from you.  In return, she unties a corner of the sheet atop the cart, allowing you to take a look at her collection of eggs.");
			//[Black][Blue][Brown][Pink][Purple]
			menu();
			addButton(0, "Black", getHarpyEgg, consumables.BLACKEG);
			addButton(1, "Blue", getHarpyEgg, consumables.BLUEEGG);
			addButton(2, "Brown", getHarpyEgg, consumables.BROWNEG);
			addButton(3, "Pink", getHarpyEgg, consumables.PINKEGG);
			addButton(4, "Purple", getHarpyEgg, consumables.PURPLEG);
			addButton(5, "White", getHarpyEgg, consumables.WHITEEG);
		}

		//If Give Three
		public function giveThreeOviElix():void
		{
			clearOutput();
			spriteSelect(90);
			player.consumeItem(consumables.OVIELIX, 3);
			Render.text("You hand over three elixirs, the harpy ecstatic over the fact that you're willing to part with them.  In return, she unties a side of the sheet atop the cart, allowing you to take a look at a large collection of her eggs.");
			//[Black][Blue][Brown][Pink][Purple]
			menu();
			addButton(0, "Black", getHarpyEgg, consumables.L_BLKEG);
			addButton(1, "Blue", getHarpyEgg, consumables.L_BLUEG);
			addButton(2, "Brown", getHarpyEgg, consumables.L_BRNEG);
			addButton(3, "Pink", getHarpyEgg, consumables.L_PNKEG);
			addButton(4, "Purple", getHarpyEgg, consumables.L_PRPEG);
			addButton(5, "White", getHarpyEgg, consumables.L_WHTEG);
		}

		//All Text
		public function getHarpyEgg(itype:ItemType):void
		{
			clearOutput();
			spriteSelect(90);
			flags[FlagEnum.EGGS_BOUGHT]++;
			Render.text("You take " + itype.longName + ", and the harpy nods in regards to your decision.  Prepping her cart back up for the road, she gives you a final wave goodbye before heading back down through the mountains.\n\n");
			inventory.takeItem(itype, chickenHarpy);
		}

		//If No
		public function leaveChickenx():void
		{
			clearOutput();
			spriteSelect(90);
			Render.text("At the polite decline of her offer, the chicken harpy gives a warm smile before picking her cart back up and continuing along the path through the mountains.");
			Render.text("\n\nYou decide to take your own path, heading back to camp while you can.");
			doNext(camp.returnToCampUseOneHour);
		}
	}
}
