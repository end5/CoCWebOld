/**
 * Created by aimozg on 05.01.14.
 */
package classes.Scenes
{
	import classes.*;
	import classes.GlobalFlags.FlagEnum;
	import classes.GlobalFlags.kGAMECLASS;
	import classes.Scenes.Explore.ExploreDebug;
	import classes.Scenes.Explore.Giacomo;
	import classes.Scenes.Monsters.*;

	public class Exploration extends BaseContent
	{
		public let exploreDebug:ExploreDebug = new ExploreDebug();
		public let giacomo:Giacomo = new Giacomo();

		public Exploration()
		{
		}

		//const MET_OTTERGIRL: number = 777;
		//const HAS_SEEN_MINO_AND_COWGIRL: number = 892;
		//const EXPLORATION_PAGE: number = 1015;
		//const BOG_EXPLORED: number = 1016;
		public doExplore():void
		{
			if (player.explored == 0) {
				MainScreen.text("You tentatively step away from your campsite, alert and scanning the ground and sky for danger.  You walk for the better part of an hour, marking the rocks you pass for a return trip to your camp.  It worries you that the portal has an opening on this side, and it was totally unguarded...\n\n...Wait a second, why is your campsite in front of you? The portal's glow is clearly visible from inside the tall rock formation.   Looking carefully you see your footprints leaving the opposite side of your camp, then disappearing.  You look back the way you came and see your markings vanish before your eyes.  The implications boggle your mind as you do your best to mull over them.  Distance, direction, and geography seem to have little meaning here, yet your campsite remains exactly as you left it.  A few things click into place as you realize you found your way back just as you were mentally picturing the portal!  Perhaps memory influences travel here, just like time, distance, and speed would in the real world!\n\nThis won't help at all with finding new places, but at least you can get back to camp quickly.  You are determined to stay focused the next time you explore and learn how to traverse this gods-forsaken realm.", true);
				tryDiscover();
				return;
			} else if (player.explored == 1) {
				MainScreen.text("You walk for quite some time, roaming the hard-packed and pink-tinged earth of the demon-realm.  Rust-red rocks speckle the wasteland, as barren and lifeless as anywhere else you've been.  A cool breeze suddenly brushes against your face, as if gracing you with its presence.  You turn towards it and are confronted by the lush foliage of a very old looking forest.  You smile as the plants look fairly familiar and non-threatening.  Unbidden, you remember your decision to test the properties of this place, and think of your campsite as you walk forward.  Reality seems to shift and blur, making you dizzy, but after a few minutes you're back, and sure you'll be able to return to the forest with similar speed.\n\n<b>You have discovered the Forest!</b>", true);
				tryDiscover();
				player.exploredForest++;
				return;
			} else if (player.explored > 1) MainScreen.text("You can continue to search for new locations, or explore your previously discovered locations.", true);

			if (flags[FlagEnum.EXPLORATION_PAGE] == 2) {
				explorePageII();
				return;
			}
			menu();
			MainScreen.addButton(0, "Explore", tryDiscover);
			if (player.exploredDesert > 0) MainScreen.addButton(1, "Desert", kGAMECLASS.desert.exploreDesert);
			if (player.exploredForest > 0) MainScreen.addButton(2, "Forest", kGAMECLASS.forest.exploreForest);
			if (player.exploredLake > 0) MainScreen.addButton(3, "Lake", kGAMECLASS.lake.exploreLake);
			MainScreen.addButton(4, "Next", explorePageII);
			if (flags[FlagEnum.TIMES_EXPLORED_PLAINS] > 0) MainScreen.addButton(5, "Plains", kGAMECLASS.plains.explorePlains);
			if (flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00272] > 0) MainScreen.addButton(6, "Swamp", kGAMECLASS.swamp.exploreSwamp);
			if (player.statusAffects.has("ExploredDeepwoods")) MainScreen.addButton(7, "Deepwoods", kGAMECLASS.forest.exploreDeepwoods);
			if (player.exploredMountain > 0) MainScreen.addButton(8, "Mountain", kGAMECLASS.mountain.exploreMountain);
			MainScreen.addButton(9, "Back", playerMenu);
		}

		private explorePageII():void
		{
			flags[FlagEnum.EXPLORATION_PAGE] = 2;
			menu();
			if (flags[FlagEnum.DISCOVERED_HIGH_MOUNTAIN] > 0) MainScreen.addButton(0, "High Mountain", kGAMECLASS.highMountains.exploreHighMountain);
			if (flags[FlagEnum.BOG_EXPLORED] > 0) MainScreen.addButton(1, "Bog", kGAMECLASS.bog.exploreBog);
			MainScreen.addButton(4, "Previous", goBackToPageI);
			if (debug) MainScreen.addButton(8, "Debug", exploreDebug.doExploreDebug);
			MainScreen.addButton(9, "Back", playerMenu);
		}

		private goBackToPageI():void
		{
			flags[FlagEnum.EXPLORATION_PAGE] = 1;
			doExplore();
		}


		//Try to find a new location - called from doExplore once the first location is found
		public tryDiscover():void
		{

			// kGAMECLASS.goblinAssassinScene.goblinAssassinEncounter();
			// return;

			if (flags[FlagEnum.PC_PROMISED_HEL_MONOGAMY_FUCKS] == 1 && flags[FlagEnum.HEL_RAPED_TODAY] == 0 && rand(10) == 0 && player.gender > 0 && !kGAMECLASS.helFollower.followerHel()) {
				kGAMECLASS.helScene.helSexualAmbush();
				return;
			}
			if (player.explored > 1) {
				if (player.exploredLake == 0) {
					MainScreen.text("Your wanderings take you far and wide across the barren wasteland that surrounds the portal, until the smell of humidity and fresh water alerts you to the nearby lake.  With a few quick strides you find a lake so massive the distant shore cannot be seen.  Grass and a few sparse trees grow all around it.\n\n<b>You have discovered the Lake!</b>", true);
					player.exploredLake = 1;
					player.explored++;
					doNext(camp.returnToCampUseOneHour);
					return;
				}
				if (player.exploredLake >= 1 && rand(3) == 0 && player.exploredDesert == 0) {
					MainScreen.text("You stumble as the ground shifts a bit underneath you.  Groaning in frustration, you straighten up and discover the rough feeling of sand ", true);
					if (player.lowerBody == LOWER_BODY.HUMAN) MainScreen.text("inside your footwear, between your toes", false);
					if (player.lowerBody == LOWER_BODY.HOOFED) MainScreen.text("in your hooves", false);
					if (player.lowerBody == LOWER_BODY.DOG) MainScreen.text("in your paws", false);
					if (player.lowerBody == LOWER_BODY.NAGA) MainScreen.text("in your scales", false);
					MainScreen.text(".\n\n<b>You've discovered the Desert!</b>", false);
					player.exploredDesert = 1;
					player.explored++;
					doNext(camp.returnToCampUseOneHour);
					return;
				}
				if (player.exploredDesert >= 1 && rand(3) == 0 && player.exploredMountain == 0) {
					MainScreen.text("Thunder booms overhead, shaking you out of your thoughts.  High above, dark clouds encircle a distant mountain peak.  You get an ominous feeling in your gut as you gaze up at it.\n\n<b>You have discovered the mountain!</b>", true);
					player.explored++;
					player.exploredMountain = 1;
					doNext(camp.returnToCampUseOneHour);
					return;
				}
				if (player.exploredMountain >= 1 && rand(3) == 0 && flags[FlagEnum.TIMES_EXPLORED_PLAINS] == 0) {
					flags[FlagEnum.TIMES_EXPLORED_PLAINS] = 1;
					player.explored++;
					MainScreen.text("You find yourself standing in knee-high grass, surrounded by flat plains on all sides.  Though the mountain, forest, and lake are all visible from here, they seem quite distant.\n\n<b>You've discovered the plains!</b>", true);
					doNext(camp.returnToCampUseOneHour);
					return;
				}
				//EXPLOOOOOOORE
				if (flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00272] == 0 && flags[FlagEnum.TIMES_EXPLORED_PLAINS] > 0 && rand(3) == 0) {
					flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00272] = 1;
					player.explored++;
					MainScreen.text("", true);
					MainScreen.text("All things considered, you decide you wouldn't mind a change of scenery.  Gathering up your belongings, you begin a journey into the wasteland.  The journey begins in high spirits, and you whistle a little traveling tune to pass the time.  After an hour of wandering, however, your wanderlust begins to whittle away.  Another half-hour ticks by.  Fed up with the fruitless exploration, you're nearly about to head back to camp when a faint light flits across your vision.  Startled, you whirl about to take in three luminous will-o'-the-wisps, swirling around each other whimsically.  As you watch, the three ghostly lights begin to move off, and though the thought of a trap crosses your mind, you decide to follow.\n\n", false);
					MainScreen.text("Before long, you start to detect traces of change in the environment.  The most immediate difference is the increasingly sweltering heat.  A few minutes pass, then the will-o'-the-wisps plunge into the boundaries of a dark, murky, stagnant swamp; after a steadying breath you follow them into the bog.  Once within, however, the gaseous balls float off in different directions, causing you to lose track of them.  You sigh resignedly and retrace your steps, satisfied with your discovery.  Further exploration can wait.  For now, your camp is waiting.\n\n", false);
					MainScreen.text("<b>You've discovered the swamp!</b>", false);
					doNext(camp.returnToCampUseTwoHours);
					return;
				}
				//Used for chosing 'repeat' encounters.
				let choosey:number = rand(6);
				//2 (gargoyle) is never chosen once cathedral is discovered.
				if(choosey == 2 && flags[FlagEnum.FOUND_CATHEDRAL] == 1)
				{
					choosey = rand(5);
					if(choosey >= 2) choosey++;
				}
				//Chance of encountering Giacomo!
				if (choosey == 0) {
					player.explored++;
					giacomo.giacomoEncounter(); //eventParser(2015);
					return;
				}
				else if (choosey == 1) {
					player.explored++;
					kGAMECLASS.lumi.lumiEncounter();
					return;
				}
				else if (choosey == 2) {
					player.explored++;
					if (flags[FlagEnum.GAR_NAME] == 0) kGAMECLASS.gargoyle.gargoylesTheShowNowOnWBNetwork();
					else kGAMECLASS.gargoyle.returnToCathedral();
					return;
				}
				//Monster - 50/50 imp/gob split.
				else {
					player.explored++;
					let impGob:number = 5;
					//Imptacular Encounter
					if (rand(10) < impGob) {
						if (player.level >= 8 && rand(2) == 0) {
							kGAMECLASS.impScene.impLordEncounter();
							spriteSelect(29);
							return;
						}
						else {
							MainScreen.text("An imp wings out of the sky and attacks!", true);
							startCombat(new Imp());
							spriteSelect(29);
						}
						return;
					}
					//Encounter Gobbalin!
					else {
						//50% of the time, goblin assassin!
						if (player.level >= 10 && rand(2) == 0) {
							kGAMECLASS.goblinAssassinScene.goblinAssassinEncounter();
							return;
						}
						if (player.gender > 0) {
							MainScreen.text("A goblin saunters out of the bushes with a dangerous glint in her eyes.\n\nShe says, \"<i>Time to get fucked, " + player.mf("stud", "slut"), true);
							MainScreen.text(".</i>\"", false);
							startCombat(new Goblin());
							spriteSelect(24);
							return;
						}
						else {
							MainScreen.text("A goblin saunters out of the bushes with a dangerous glint in her eyes.\n\nShe says, \"<i>Time to get fuc-oh shit, you don't even have anything to play with!  This is for wasting my time!", true);
							MainScreen.text("</i>\"", false);
							startCombat(new Goblin());
							spriteSelect(24);
							return;
						}
					}

				}
				MainScreen.text("You wander around, fruitlessly searching for new places.", true);
			}
			player.explored++;
			doNext(camp.returnToCampUseOneHour);
		}


		public debugOptions():void
		{
			inventory.takeItem(consumables.W_FRUIT, playerMenu);
		}

		//Massive bodyparts scene
//[DESERT]
//[RANDOM SCENE IF CHARACTER HAS AT LEAST ONE COCK LARGER THAN THEIR HEIGHT,
//AND THE TOTAL COMBINED WIDTH OF ALL THEIR COCKS IS TWELVE INCHES OR GREATER]
		public bigJunkDesertScene():void
		{
			MainScreen.text("", true);
			let x:number = player.longestCock();
			//PARAGRAPH 1
			MainScreen.text("Walking along the sandy dunes of the desert you find yourself increasingly impeded by the bulk of your " + cockDescript(x) + " dragging along the sandscape behind you.  The incredibly hot surface of the desert causes your loins to sweat heavily and fills them with relentless heat.", false);

			if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("  As it drags along the dunes, the sensation forces you to imagine the rough textured tongue of a monstrous animal sliding along the head of your " + Appearance.cockNoun(player.lowerBody.cockSpot.list[x].cockType) + ".", false);
			else if (player.lowerBody.cockSpot.count() >= 2) MainScreen.text("  With all of your " + multiCockDescriptLight() + " dragging through the sands they begin feeling as if the rough textured tongues of " + num2Text(player.lowerBody.cockSpot.count()) + " different monstrous animals were slobbering over each one.", false);
			MainScreen.text("\n\n", false);

			//PARAGRAPH 2

			//FOR NON-CENTAURS]
			if (!player.isTaur()) {
				MainScreen.text("The impending erection can't seem to be stopped.  Your sexual frustration forces stiffness into your " + multiCockDescriptLight() + ", which forces your torso to the ground.  Normally your erection would merely raise itself skyward but your genitals have grown too large and heavy for your " + hipDescript() + " to hold them aloft.  Instead you feel your body forcibly pivoting at the hips until your torso is compelled to rest face down on top of your obscene " + multiCockDescriptLight() + ".", false);

				//IF CHARACTER HAS GIANT BREASTS ADD SENTENCE
				if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 35)  MainScreen.text("  Your " + kGAMECLASS.allBreastsDescript() + " hang lewdly off your torso to rest on the desert sands, seeming to bury the dunes on either side of you.  Their immense weight anchors your body, further preventing your torso from lifting itself up.  The burning heat of the desert teases your " + nippleDescript(0) + "s mercilessly as they grind in the sand.", false);
				//IF CHARACTER HAS A BALLS ADD SENTENCE
				if (player.lowerBody.balls > 0) MainScreen.text("  Your " + player.skinTone + sackDescript() + " rests beneath your raised " + buttDescript() + ".  The fiery warmth of the desert caresses it, causing your " + ballsDescriptLight() + " to pulse with the need to release their sperm through your " + multiCockDescriptLight() + ".", false);
				//IF CHARACTER HAS A VAGINA ADD SENTENCE
				if (player.lowerBody.vaginaSpot.count() >= 1) {
					MainScreen.text("  Your " + vaginaDescript() + " and " + clitDescript() + " are thoroughly squashed between the bulky flesh where your male genitals protrude from between your hips and the " + buttDescript() + " above.", false);
					//IF CHARACTER HAS A DROOLING PUSSY ADD SENTENCE
					if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS.DROOLING) MainScreen.text("  Juices stream from your womanhood and begin pooling on the hot sand beneath you.  Wisps of steam rise up into the air only to tease your genitals further.  ", false);
				}
			}
			//FOR CENTAURS
			else {
				MainScreen.text("The impending erection can't seem to be stopped.  Your sexual frustration forces stiffness into your " + multiCockDescriptLight() + ", which forces the barrel of your horse-like torso to the ground.  Normally your erection would merely hover above the ground in between your centaurian legs, but your genitals have grown too large and heavy for your " + hipDescript() + " to hold them aloft.  Instead, you feel your body being forcibly pulled down at your hindquarters until you rest atop your " + multiCockDescriptLight() + ".", false);
				//IF CHARACTER HAS GIANT BREASTS ADD SENTENCE
				if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 35)  MainScreen.text("  Your " + kGAMECLASS.allBreastsDescript() + " pull your human torso forward until it also is forced to rest facedown, just like your horse half.  Your tits rest, pinned on the desert sand to either side of you.  Their immense weight anchors you, further preventing any part of your equine body from lifting itself up.  The burning heat of the desert teases your " + nippleDescript(0) + "s incessantly.", false);
				//IF CHARACTER HAS A BALLS ADD SENTENCE
				if (player.lowerBody.balls > 0) MainScreen.text("  Your " + player.skinTone + sackDescript() + " rests beneath your raised " + buttDescript() + ".  The airy warmth of the desert teases it, causing your " + ballsDescriptLight() + " pulse with the need to release their sperm through your " + multiCockDescriptLight() + ".", false);
				//IF CHARACTER HAS A VAGINA ADD SENTENCE
				if (player.lowerBody.vaginaSpot.count() >= 1) {
					MainScreen.text("  Your " + vaginaDescript() + " and " + clitDescript() + " are thoroughly squashed between the bulky flesh where your male genitals protrude from between your hips and the " + buttDescript() + " above.", false);
					//IF CHARACTER HAS A DROOLING PUSSY ADD SENTENCE
					if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS.DROOLING) MainScreen.text("  The desert sun beats down on your body, its fiery heat inflaming the senses of your vaginal lips.  Juices stream from your womanhood and begin pooling on the hot sand beneath you.", false);
				}
			}
			MainScreen.text("\n\n", false);
			//PARAGRAPH 3
			MainScreen.text("You realize you are effectively trapped here by your own body.", false);
			//CORRUPTION BASED CHARACTER'S VIEW OF SITUATION
			if (player.stats.cor < 33) MainScreen.text("  Panic slips into your heart as you realize that if any dangerous predator were to find you in this state, you'd be completely defenseless.  You must find a way to regain your mobility immediately!", false);
			else if (player.stats.cor < 66) MainScreen.text("  You realize that if any dangerous predator were to find you in this state you'd be completely defenseless.  You must find a way to regain your mobility... yet there is a certain appeal to imagining how pleasurable it would be for a sexual predator to take advantage of your obscene body.", false);
			else MainScreen.text("  Your endowments have rendered you completely helpless should any predators find you.  Somewhere in your heart, you're exhilarated at the prospect.  The idea of being a helpless fucktoy for a wandering beast is unusually inviting to you.  Were it not for the thought that you might die of thirst in the desert, you'd be incredibly tempted to remain right where you are.", false);

			//SCENE END = IF CHARACTER HAS FULL WINGS ADD SENTENCE
			if (player.canFly()) MainScreen.text("  You extend your wings and flap as hard as you can, until at last you manage to lighten the bulk of your body somewhat - enough to allow yourself to drag your genitals across the hot sands and back to camp.  The ordeal takes nearly an hour.", false);
			//SCENE END IF CHARACTER HAS CENTAUR BODY
			else if (player.isTaur()) MainScreen.text("  You struggle and work your equine legs against the surface of the dune you are trapped on.  Your " + player.feet() + " have consistent trouble finding footing, the soft sand failing to provide enough leverage to lift your bulk.  You breath in deeply and lean from side to side, trying to find some easier vertical leverage.  Eventually, with a crude crawl, your legs manage to push the bulk of your body onto more solid ground.  With great difficulty, you spend the next hour shuffling your genitals across the sandscape and back to camp.", false);
			//SCENE END = FOR ALL OTHER CHARACTERS
			else MainScreen.text("  You struggle and push with your " + player.legs() + " as hard as you can, but it's no use.  You do the only thing you can and begin stroking your " + multiCockDescriptLight() + " with as much vigor as you can muster.  Eventually your body tenses and a light load of jizz erupts from your body, but the orgasm is truly mild compared to what you need.  You're simply too weary from struggling to give yourself the masturbation you truly need, but you continue to try.  Nearly an hour later " + sMultiCockDesc() + " softens enough to allow you to stand again, and you make your way back to camp, still dragging your genitals across the warm sand.", false);
			dynStats("lus", 25 + rand(player.stats.cor / 5), "resisted", false);
			fatigue(5);
			doNext(camp.returnToCampUseOneHour);
		}


	}
}
