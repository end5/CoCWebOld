﻿private static const DUNGEON_FACTORY_FOYER: number				= 9;
private static const DUNGEON_FACTORY_PUMP_ROOM: number			= 1;
private static const DUNGEON_FACTORY_BREAK_ROOM: number			= 2;
private static const DUNGEON_FACTORY_FURNACE_ROOM: number		= 3;
private static const DUNGEON_FACTORY_REPAIR_CLOSET: number		= 4;
private static const DUNGEON_FACTORY_MAIN_CHAMBER: number		= 5;
private static const DUNGEON_FACTORY_FOREMANS_OFFICE: number	= 6;
private static const DUNGEON_FACTORY_PUMP_CONTROL: number		= 7;
private static const DUNGEON_FACTORY_STORE_ROOM: number			= 8;

public get inDungeon():boolean { return dungeonLoc != 0; }

private dungeonMenu():void {
/*	//Dungeon Choices!
	let choice1:* = 0;
	let text1:string = "";
	let choice2:* = 0;
	let text2:string = "";
	let choice3:* = 0;
	let text3:string = "";
	let choice4:* = 0;
	let text4:string = "";
	let choice5:* = 0;
	let text5:string = "";
	let choice6:* = 0;
	let text6:string = "";
	let choice7:* = 0;
	let text7:string = "";
	let choice8:* = 0;
	let text8:string = "";
	//Always have choices for items or masturbation. 
	let itemMenu:Function = inventory.inventoryMenu;
	let masturbateMenu:number = 10;
*/		
	//Display Proper Buttons
	mainView.showMenuButton(MainView.MENU_APPEARANCE);
	mainView.showMenuButton(MainView.MENU_PERKS);
	mainView.hideMenuButton(MainView.MENU_DATA);
	
	//clear up/down arrows
	hideUpDown();
	//Level junk
	if (player.XP >= (player.level) * 100) {
		mainView.showMenuButton( MainView.MENU_LEVEL );
		mainView.statsView.showLevelUp();
	}
	menu();
	//Entry Room
	if(dungeonLoc == DUNGEON_FACTORY_FOYER) {
		MainScreen.text("<b><u>The Factory Foyer</u></b>\nThe door swings shut behind you with an ominous 'creeeeeaaaaaaak' followed by a loud 'SLAM'.  Glancing around, you find yourself in some kind of stylish foyer, complete with works of art and a receptionist's desk.  Looking closer at the paintings on the wall quickly reveals their tainted and demonic nature: One appears at first to be a painting of a beautiful smiling woman, except you notice dripping tentacles coiling around the hem of her dress.  Behind the receptionist's desk, the second painting is even less discreet, openly depicting a number of imps gang-raping a vaguely familiar-looking woman.  Luckily, whatever demon is employed as the receptionist is away at the moment.  Behind the desk on the northern wall stands a secure-looking iron door.  On the eastern wall is a simple wooden door, though the color of the wood itself is far darker and redder than any of the hard woods from your homeland.  Behind you to the south is the rusty iron entry door.", true);
//		choice1 = 11001;
//		text1 = "North";
//		choice2 = 11002;
//		text2 = "East";
//		choice7 = leaveFactory;
//		text7 = "South";
		MainScreen.addButton(0, "North", openFactoryDoor);
		MainScreen.addButton(1, "East", dungeonEnterRoom, DUNGEON_FACTORY_BREAK_ROOM);
		MainScreen.addButton(6, "South", leaveFactory);
	}
	//Pump Room
	if(dungeonLoc == DUNGEON_FACTORY_PUMP_ROOM) {
		if(player.findStatusAffect(StatusAffects.DungeonShutDown) < 0) {
			MainScreen.text("<u><b>Pump Room</b></u>\nAs you step through the iron door, a cacophony of thrumming mechanical noise assaults your ears.  Coppery pipes arch overhead, riveted into spiked iron brackets that hang from the ceiling in twisted pairs.  The constant thrum-thrum-thrum of concealed pumps and mechanisms makes it difficult to hear anything, but you swear you can make out the faint sounds of sexual pleasure emanating from the northwest side of the room.  Investigating further, you spot a door along the west wall of the room that appears to be the source of the licentious sounds.  The vibrations of all the machinery are strongest along the east walls, indicating the possible site of this hellish place's power-plant. There is a door on the east wall and a door on the north.  To the south is a solid iron door that leads back to the lobby.", true);
		}
		else MainScreen.text("<u><b>Pump Room</b></u>\nAs you step through the iron door, silence is the only noise you hear.  Coppery pipes arch overhead, riveted into spiked iron brackets that hang from the ceiling in twisted pairs.  The near-complete silence of the place unnerves you, but allows you to make out the faint sounds of sexual pleasure emanating from northwest side of the room.  Investigating further, you spot a door along the west wall of the room that appears to be the source of the licentious sounds.  There are two other doors, one along the east wall and one on the north.  To the south is a solid iron door that leads back to the lobby.", true);
//		choice1 = 11004;
//		text1 = "North";
//		choice2 = 11003;
//		text2 = "East";
//		choice7 = 11000;
//		text7 = "South";
//		choice6 = 11005;
//		text6 = "West";
		MainScreen.addButton(0, "North", dungeonEnterRoom, DUNGEON_FACTORY_REPAIR_CLOSET);
		MainScreen.addButton(1, "East", dungeonEnterRoom, DUNGEON_FACTORY_FURNACE_ROOM);
		MainScreen.addButton(5, "West", dungeonEnterRoom, DUNGEON_FACTORY_MAIN_CHAMBER);
		MainScreen.addButton(6, "South", dungeonEnterRoom, DUNGEON_FACTORY_FOYER);
	}
	//Break Room
	if(dungeonLoc == DUNGEON_FACTORY_BREAK_ROOM) {
		spriteSelect(96);
		MainScreen.text("Stepping through the dark red doorway, you wander into an expansive break room. Tables surrounded by crude wooden chairs fill most of the floor space. Along the far eastern wall sits a small counter, complete with a strange ebony sculpture of a busty woman with 'Mrs. Coffee' printed on the side. Below the sculpture is a pot of steaming hot coffee, giving off an invigoratingly rich smell.", true);
		//Hooks for succubi encounter
		//(if succubus gone/defeated)
		if (player.statusAffects.has("FactorySuccubusDefeated")) {
//			choice7 = 0;
//			text6 = "West";
			if (player.hasKeyItem("Iron Key") < 0) {
				MainScreen.text("  It seems your opponent dropped a small iron key as she fled.", false);
//				choice3 = takeIronKey;
//				text3 = "Iron Key";
				MainScreen.addButton(2, "Iron Key", takeIronKey);
			}
//			choice6 = 11000;
//			text5 = "Coffee";
//			choice5 = drinkCoffee;
			MainScreen.addButton(4, "Coffee", drinkCoffee);
			MainScreen.addButton(5, "West", dungeonEnterRoom, DUNGEON_FACTORY_FOYER);
		}
		else {
			spriteSelect(55);
			MainScreen.text("\n\nStanding next to the coffeemaker is a blue-skinned woman holding a mug of coffee.  As she takes a sip, oblivious to your presence, you see the mug has '#1 Dad' written on it.  Dressed in a tiny vest, short skirt, and sheer stockings, she looks every bit an air-headed secretarial ditz.  Her two horns are little more than nubs, mostly covered by her flowing blond hair, and if it wasn't for her blue skin and the tip of a spaded tail peeking out from under her skirt, you'd never know what she was.\n\n", false);			
			// demon bad end available
			if(player.demonScore() >= 4 && player.stats.cor > 75) {
				MainScreen.text("The busty succubus turns, her barely contained breasts jiggling obscenely as she notices you, \"<i>Oh, like hi there ", false);
				if(player.gender == 1) MainScreen.text("stud", false);
				else MainScreen.text("sexy", false);
				MainScreen.text("!</i>\"  She stops, sniffing the air, a curious expression on her face as she slowly circles you, her heals clicking loudly on the floor.  A knowing grin blooms across her face as understanding hits her.\n\n", false); 
				MainScreen.text("She exclaims, \"<i>Omigawsh!  You're the champion!  Your, like, soul is still there and everything!  But, you're like, completely corrupt an' stuff!  Ya know what'd be fun?  I could fuck you 'til you cum so hard your soul melts out an' you turn into a demon.  Wouldn't that be great?</i>\"\n\n", false);
				MainScreen.text("The secretarial demoness pulls out a file and fiddles with her nails, murmuring, \"<i>I guess if you don't wanna, we could just hook you up in the factory.  What's it gonna be?</i>\"", false);
//				text1 = "Fight";
//				choice1 = succubusCombatStart;
//				text2 = "Go Demon";
//				choice2 = demonBadEnd;
//				text3 = "Hook Up";
//				choice3 = succubusBadEnd;
//				masturbateMenu = 0;
//				itemMenu = null;
				MainScreen.addButton(0, "Fight", succubusCombatStart);
				MainScreen.addButton(1, "Go Demon", demonBadEnd);
				MainScreen.addButton(2, "Hook Up", succubusBadEnd);
				return; //This prevents the masturbate and item menus showing
			}
			//Not recognized
			else if(player.humanScore() <= 3) {
				MainScreen.text("The busty succubus turns, her barely contained breasts jiggling obscenely as she notices you, \"<i>Oh, like hi there ", false);
				if(player.gender == 1) MainScreen.text("stud", false);
				else MainScreen.text("sexy", false);
				MainScreen.text("!  You haven't seen a confused human about calling itself a champion have you?</i>\"\n\nShe shakes her more-than-ample bosom from side to side as she licks her lips and offers, \"<i>If you do, be sure and bring them back here ok?  We've got their spot all ready for them, but that little prick Zetaz fucked up the pickup.  Tell you what – if you bring me the 'champion' I'll ", false);
				if(player.totalCocks() > 0) MainScreen.text("give you the blowjob of a lifetime", false);
				else if(player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("lick your honeypot 'til you soak my face", false);
				else MainScreen.text("give you a new addition and show you how to use it", false);
				MainScreen.text(".</i>\"\n\nThe succubus turns away from you and makes a show of tweaking her make-up, ignoring you for the moment.", false);
//				text1 = "Fight";
//				choice1 = succubusCombatStart;
//				text2 = "It's Me!";
//				choice2 = secretarialSuccubusInsult;
//				text3 = "Leave";
//				choice3 = 11000;
//				masturbateMenu = 0;
//				itemMenu = null;
				MainScreen.addButton(0, "Fight", succubusCombatStart);
				MainScreen.addButton(1, "It's Me!", secretarialSuccubusInsult);
				MainScreen.addButton(2, "Leave", dungeonEnterRoom, DUNGEON_FACTORY_FOYER);
				return; //This prevents the masturbate and item menus showing
			}
			else {
				MainScreen.text("The busty succubus turns, her barely contained breasts jiggling obscenely as she notices you, \"<i>Oh, like hi there ", false);
				if(player.gender == 1) MainScreen.text("stud", false);
				else MainScreen.text("sexy", false);
				MainScreen.text("!  What's a cute little morsel like you doing by yourself out here?</i>\"", false);
//				text1 = "Fight";
//				choice1 = succubusCombatStart;
//				text2 = "Talk";
//				choice2 = succubusTalkOne;
//				text3 = "Run";
//				choice3 = 11000;
//				masturbateMenu = 0;
//				itemMenu = null;
				MainScreen.addButton(0, "Fight", succubusCombatStart);
				MainScreen.addButton(1, "Talk", succubusTalkOne);
				MainScreen.addButton(2, "Run", dungeonEnterRoom, DUNGEON_FACTORY_FOYER);
				return; //This prevents the masturbate and item menus showing
			}
		}
	}
	//Furnace Room
	if(dungeonLoc == DUNGEON_FACTORY_FURNACE_ROOM) {
		if(player.findStatusAffect(StatusAffects.DungeonShutDown) < 0) {
			MainScreen.text("<b><u>Furnace Room</u></b>\nThe air inside this room is hot enough to coat your " + player.skinTone + " " + player.skinDesc + " in a fine sheen of sweat.  The eastern side of the chamber is more machine than wall, a solid mass of iron piping covered in small metal blast-doors through which fuel is to be fed.  A small transparent plate is riveted into the wall, allowing you to see some kind of pink crystalline fuel being burned by purple-white fire.  The few visible controls and gauges don't seem to be linked into anything important, and the machinery looks far too durable to damage with what you have.  The only exit is a heavy iron door on the west wall.  ", true);
		}
		else {
			MainScreen.text("<b><u>Furnace Room</u></b>\nDespite the machinery being shut down, the air in this room is still hot enough to coat your " + player.skinTone + " " + player.skinDesc + " in a fine sheen of sweat.  The eastern side of the chamber is more machine than wall, a solid mass of iron piping covered in small metal blast-doors through which fuel is to be fed.  A small transparent plate is riveted into the wall, allowing you to see some the ashes of a previous fuel source.  The few visible controls and gauges don't seem to be linked into anything important, and the machinery looks far too durable to damage with what you have.  The only exit is a heavy iron door on the west wall.  ", true);			
		}

		// If the players found D3, hide him entirely to avoid two-places-at-once syndrome.
		if (player.statusAffects.has("FactoryIncubusDefeated") || flags[FlagEnum.D3_DISCOVERED] == 1) {
//			text6 = "West";
//			choice6 = 11001;
			MainScreen.addButton(5, "West", openFactoryDoor);
		}
		//Incubus is ALLLLIVE
		else {
			spriteSelect(30);
			if(player.statusAffects.has("IncubusBribed")) {
				MainScreen.text("\n\nThe incubus mechanic is here, thumbing through a hentai comic and laughing to himself at the absurdity of it.  That doesn't stop him from stroking his half-hard member the whole time...", false);
//				choice2 = startIncubusFight;
//				text2 = "Fight";
//				text6 = "West";
//				choice6 = 11001;
				MainScreen.addButton(1, "Fight", startIncubusFight);
				MainScreen.addButton(5, "West", openFactoryDoor);
			}
			else {
				MainScreen.text("\n\nA demonic mechanic lounges against the hot machinery, unperturbed by the high temperatures of the room.  He wears cut-off denim overalls, stained with grease in a few places.  They don't seem to be in good repair, and have a fair-sized hole at his groin, where a floppy foot-long member hangs free.  His skin is light purple and unblemished, as you would expect from a sexual demon.  He has a rugged handsome face and black hair tied back in a simple ponytail.  Two large curving horns protrude from his forehead, curving back along his skull and giving him a dangerous appearance.  A narrow goatee grows from his chin, about 3 inches long and braided skillfully.  He looks up and smiles, amused at your appearance.", false);
//				choice1 = startIncubusFight;
//				text1 = "Fight";
//				text2 = "Talk";
//				choice2 = talkToIncubus;				
				MainScreen.addButton(0, "Fight", startIncubusFight);
				MainScreen.addButton(1, "Talk", talkToIncubus);
			}
		}
	}
	//Repair Closet
	if(dungeonLoc == DUNGEON_FACTORY_REPAIR_CLOSET) {
		MainScreen.text("<b><u>Repair Closet</u></b>\nAs you carefully slip inside the room, you note with some relief that it seems to be an empty storage closet. The room is tiny, barely 6' by 8' and almost entirely empty.  The one piece of furniture inside the closet is a simple wooden cabinet, placed against the far wall.  ", true);
		if (player.statusAffects.has("BuiltMilker"))
			MainScreen.text("The shelves are empty.  ", false);
		else {
			MainScreen.text("The shelves of the cabinet hold various pieces of pump machinery, probably used to repair complete machines further into the factory.  ", false);
			if (player.stats.int >= 40) {
				MainScreen.text("You realize there are enough pieces here to put together a breast-milking pump or a cock-milker.  ", false);
				if (player.hasKeyItem("Cock Milker") >= 0)
					MainScreen.text("\nYou already have a cock milker.\n", false);
				else {
//					choice4 = takeCockMilker;
//					text4 = "C. Milker";
					MainScreen.addButton(3, "C. Milker", takeCockMilker);
				}
				if (player.hasKeyItem("Breast Milker") >= 0)
					MainScreen.text("\nYou already have a breast milker.\n", false);
				else {
//					choice3 = takeBreastMilker;
//					text3 = "B. Milker";
					MainScreen.addButton(2, "B. Milker", takeBreastMilker);
				}
			}
		}
//		text7 = "South";
//		choice7 = 11001;
		MainScreen.text("The only exit is back to the south.", false);
		MainScreen.addButton(6, "South", openFactoryDoor);
	}
	//Main Chamber
	if(dungeonLoc == DUNGEON_FACTORY_MAIN_CHAMBER) {
		//Dungeon still operational
		if(player.findStatusAffect(StatusAffects.DungeonShutDown) < 0) {
			MainScreen.text("<b><u>Main Chamber</u></b>\nThis cavernous chamber is filled with a cacophony of sexual moans.  Rows of harnesses are spaced evenly throughout this room, nearly all of them filled with delirious-looking humans.  Each is over-endowed with huge breasts and a penis of elephantine proportions.  The source of their delirium hangs down from the ceiling - groups of hoses that end with needles buried deep into the poor 'girls' flesh, pumping them full of demonic chemicals.  Constant sucking and slurping noises emanate from nipple and cock pumps as they keep the victims in a state of near-constant orgasm.  ", true);
			if(player.stats.cor < 50) MainScreen.text("You wish you could free them, but it would take the better part of a day to get them all free.  It'd be better to find the control room and shut down the infernal machinery.  ", false);
			else MainScreen.text("You wish you had some machinery like this for yourself.  It looks so fun!  Still, you suppose you should find the control panel to shut this down and free these people.  ", false);
			MainScreen.text("There is a doorway to the east marked with an 'exit' sign above it.  Along the southern wall is a stairwell that leads up to some kind of foreman's office.  Perhaps the controls are in there?", false);
		}
		//Dungeon shut down.
		else {
			MainScreen.text("The chamber is significantly emptier since you've shut down this factory.  Roughly half the girls appear to have left.  The rest seem to be pre-occupied by fucking each other in a massive orgy.  A few enterprising ladies have found leather outfits and appear to be helping to manually administer the chemical cocktails to those engaged in rampant sexual exploits.  It seems some of them preferred a life of near-constant orgasm to their freedom.  There is a door to the east marked as 'EXIT', and a stairwell along the south wall that leads to an overseer's office.", true);
			MainScreen.text("\n\nOne of the leather-clad ladies steps over and offers, 'Would you like a dose?  You look like you need to relieve some tension...", false);
//			choice3 = relieveTension;
//			text3 = "Tension";
			MainScreen.addButton(2, "Tension", relieveTension);
		}
//		text2 = "East";
//		choice2 = 11001;
//		text7 = "South(Up)";
//		choice7 = 11006;
		MainScreen.addButton(1, "East", openFactoryDoor);
		MainScreen.addButton(6, "South(Up)", dungeonEnterRoom, DUNGEON_FACTORY_FOREMANS_OFFICE);
	}
	//Foreman's Office
	if(dungeonLoc == DUNGEON_FACTORY_FOREMANS_OFFICE) {
		MainScreen.text("<b><u>Foreman's Office</u></b>\nThis office provides an excellent view of the 'factory floor' through a glass wall along the north side.  Towards the south side of the room is a simple desk with an even simpler chair behind it.  The desk's surface is clear of any paperwork, and only has a small inkwell and quill on top of it.  There are a few statues of women and men posted at the corners of the room.  All are nude and appear to be trapped in mid-orgasm.  You wonder if they're statues or perhaps some kind of perverted petrified art.  The north has a glass door leading back to the factory.  There are two other doors, both made of very solid looking metal.  One is on the east wall and another is on the south, behind the desk.  The one behind the desk is marked 'Premium Storage' (though it appears to be locked).", true);
		if(player.findStatusAffect(StatusAffects.FactoryOmnibusDefeated) < 0) {
			spriteSelect(16);
			MainScreen.text("\n\nA nearly nude demonic woman is standing behind the desk, appraising you.  She is gorgeous in the classical sense, with a curvy hourglass figure that radiates pure sexuality untamed by any desire for proper appearance.  Shiny black lip-gloss encapsulates her bubbly lips, while dark eyeshadow highlights her bright red eyes.  The closest thing she has to clothing is a narrow band of fabric that wraps around her significant chest, doing little to hide the pointed nubs of her erect nipples.  Her crotch is totally uncovered, revealing the hairless lips of her glistening womanhood.\n\n", false);
			MainScreen.text("She paces around the edge of the desk, licking her lips and speaking, \"<i>So you've made it all the way here have you, 'champion'?  Too bad you've wasted your time.  Have you figured it out yet?  Have you discovered why you were sent here with no weapons or blessed items?  Have you found out why there are more humans here than anywhere else in this realm?  I'll tell you why.  You weren't a champion.  You were a sacrificial cow, meant to be added to our herd.  You just got lucky enough to get free.</i>\"\n\n", false);
			MainScreen.text("A part of you wants to deny her, to scream that she is wrong.  But it makes too much sense to be a lie... and the evidence is right behind you, on the factory floor.  All those women must be the previous champions, kept alive and cumming for years in order to feed these insatiable demons.  The demoness watches your reaction with something approaching sexual bliss, as if the monstrous betrayal of it all is turning her on.\n\n", false);
			MainScreen.text("\"<i>Yes,</i>\" she coos, \"<i>you belong here.  The question is do you accept your fate, or do you fight it?</i>\"", false);
//			choice1 = omnibusStartCombat;
//			text1 = "Fight";   
//			choice2 = omnibusAcceptOffer;
//			text2 = "Accept";
			MainScreen.addButton(0, "Fight", omnibusStartCombat);
			MainScreen.addButton(1, "Accept", omnibusAcceptOffer);
		}
		else {
//			choice1 = 11005;
//			text1 = "North(Down)";
//			choice2 = 11007;
//			text2 = "East";
//			choice7 = 11008;
//			text7 = "South";
			MainScreen.addButton(1, "East", dungeonEnterRoom, DUNGEON_FACTORY_PUMP_CONTROL);
			MainScreen.addButton(5, "North(Down)", dungeonEnterRoom, DUNGEON_FACTORY_MAIN_CHAMBER);
			MainScreen.addButton(6, "South", openPumpRoom);
			if (player.hasKeyItem("Supervisor's Key") < 0) {
//				choice3 = takeSupervisorsKey;
//				text3 = "Desk";
				MainScreen.addButton(2, "Desk", takeSupervisorsKey);
			}
		}
	}
	//Pump controll room...
	if(dungeonLoc == DUNGEON_FACTORY_PUMP_CONTROL) {
		//PUMP CONTROL ROOM
		MainScreen.text("<b><u>Pump Control Room</u></b>\n", true);
		if (player.findStatusAffect(StatusAffects.DungeonShutDown) < 0) {
			MainScreen.text("This room is little more than a closet in reality.  There is a simple set of mechanical controls on a finely crafted terminal against the far wall.  You spend a moment looking over them, and realize you have three options to deal with this place.\n\n", true);
			MainScreen.text("-You could close the storage vent valves and overload the fluid storage systems.  The storage tanks along the back portion of the building would rupture, releasing thousands of gallons of tainted fluids into the surrounding area, but the facility's systems would suffer catastrophic failures and shut down forever.\n", false);
			//(Consequences - lake goddess becomes tainted!)
			MainScreen.text("-You could perform a system shutdown and then smash the controls.  It'd let the girls go and keep the factory shut down in the short term.  However most of the equipment would be undamaged and the place could be re-opened without too much work on the demons' part.\n", false);
			//(Consequences - If Marcus is a demon he takes over running the factory forever.  If not, nothing bad happens)
			MainScreen.text("-You could leave the equipment to continue running.  After all, the girls downstairs did seem to be enjoying themselves...\n", false);
			//(Consequences - Marcus takes over if demonic choice taken, if not he shuts down the equipment & things continue as per #3).
//			text4 = "Valves";
//			choice4 = factoryOverload;
//			text5 = "Shutdown";
//			choice5 = factoryShutdown;
			MainScreen.addButton(3, "Valves", factoryOverload);
			MainScreen.addButton(4, "Shutdown", factoryShutdown);
		}
		else {
			MainScreen.text("This room is little more than a closet in reality.  There is a simple set of mechanical controls on the a finely crafted terminal against the far wall.  The controls are now inoperable, due to the damage your actions have caused.", false);
		}
//		choice6 = 11006;
//		text6 = "West";
		MainScreen.addButton(5, "West", dungeonEnterRoom, DUNGEON_FACTORY_FOREMANS_OFFICE);
	}
	//Premium Products
	if(dungeonLoc == DUNGEON_FACTORY_STORE_ROOM) {
		MainScreen.text("<b><u>Premium Products</u></b>\nThis store room is filled with a few opened crates, meant to store the various substances in the factory.  It looks as if the current overseer has allowed supplies to run low, as there is not much to be gleaned from this meager stash.\n\n", true);
//		text1 = "North";
//		choice1 = 11006;
		MainScreen.addButton(0, "North", dungeonEnterRoom, DUNGEON_FACTORY_FOREMANS_OFFICE);
		if (player.statusAffects.has("TakenLactaid")) {
			if (player.statusAffects.get("TakenLactaid").value1 > 0) {
				MainScreen.text("There is a crate with " + num2Text(player.statusAffects.get("TakenLactaid").value1) + " bottles of something called 'Lactaid' inside.\n\n", false);
//				text3 = "Lactaid";
//				choice3 = storageTakeLactaid;
				MainScreen.addButton(2, "Lactaid", storageTakeLactaid);
			}
		}
		else {
			MainScreen.text("There is a crate with five bottles of something called 'Lactaid' inside.\n\n", false);
//			text3 = "Lactaid";
//			choice3 = storageTakeLactaid;
			MainScreen.addButton(2, "Lactaid", storageTakeLactaid);
		}
		if (player.statusAffects.has("TakenGroPlus")) {
			if (player.statusAffects.get("TakenGroPlus").value1 > 0) {
				MainScreen.text("There is a crate with " + num2Text(player.statusAffects.get("TakenGroPlus").value1) + " bottles of something called 'Gro+' inside.\n\n", false);
//				text4 = "GroPlus";
//				choice4 = storageTakeGroPlus;
				MainScreen.addButton(3, "GroPlus", storageTakeGroPlus);
			}
		}
		else {
			MainScreen.text("There is a crate with five bottles of something called 'Gro+' inside.\n\n", false);
//			text4 = "GroPlus";
//			choice4 = storageTakeGroPlus;
			MainScreen.addButton(3, "GroPlus", storageTakeGroPlus);
		}
	}
	//DUNGEON 2 START: ROOM 10
	if(dungeonLoc == DUNGEON_CAVE_ENTRANCE) {
		MainScreen.text("<b><u>The Cave Entrance</u></b>\n", true);
		MainScreen.text("The entrance to this cave is far bigger than the cave itself.  It looks to be a totally natural formation.  Outside, to the south, is a veritable jungle of plant-life.  There are massive trees, vines, and ferns everywhere.  The cave grows narrower the further north you go, until it's little more than a claustrophobic tunnel burrowing deep into the earth.", false);
		
//		choice1 = 11067;
//		text1 = "North";
//		choice6 = leaveZetazsLair;
//		text6 = "Leave";
		MainScreen.addButton(0, "North", dungeonEnterRoom, DUNGEON_CAVE_TUNNEL);
		MainScreen.addButton(5, "Leave", leaveZetazsLair);
		//Zetaz gone?  Alchemist shits!
		if (flags[FlagEnum.DEFEATED_ZETAZ] > 0) {
			if (flags[FlagEnum.ZETAZ_LAIR_DEMON_VENDOR_PRESENT] == 0) {
				MainScreen.text("\n\nThere's a demon lazing around outside the cave entrance.  Judging by his size and apparent gender, he must be an incubus.  You try to stay hidden for now, but all he's doing is throwing darts at a dartboard he's set up across the way from himself.  What kind of demon sits around playing darts?");
//				text1 = "Investigate";
//				choice1 = theSeanShopOffer;
				MainScreen.addButton(0, "Investigate", theSeanShopOffer);
			}
			else if (flags[FlagEnum.ZETAZ_LAIR_DEMON_VENDOR_PRESENT] > 0) {
				MainScreen.text("\n\nThe incubus known as Sean has set up a small stall around the cave entrance, and is busy tending to his shelves and wares.  He's dressed in an incredibly modest, three-piece suit, and nods to you as you approach, \"<i>Let me know if you want to buy anything.  I haven't done much with the cave, so feel free to poke around if you missed anything on your first pass.  I barely use the first room.</i>\"");
//				text3 = "Shop";
//				choice3 = incubusShop;
				MainScreen.addButton(2, "Shop", incubusShop);
			}
		}
	}
	//D2: Tunnel
	if(dungeonLoc == DUNGEON_CAVE_TUNNEL) {
		MainScreen.text("<b><u>Cave Tunnel</u></b>\n", true);
		MainScreen.text("This cave tunnel slants downwards to the north, and upwards to the south.  You can see sunlight and feel a fresh breeze from the latter direction, though the walls and air around you are damp with moisture.  You realize that the floor of this cave is fairly smooth and even, as if some attempt had been made to level it out.  You can see a bricked up wall along the north end of the tunnel.  It has a crudely fashioned wooden door in the center of it.", false);
//		text7 = "South";
//		choice7 = 11066;
//		text1 = "North";
//		choice1 = 11068;
		MainScreen.addButton(0, "North", dungeonEnterRoom, DUNGEON_CAVE_GATHERING_HALL);
		MainScreen.addButton(6, "South", dungeonEnterRoom, DUNGEON_CAVE_ENTRANCE);
	}
	//D2: [GATHERING HALL]
	if(dungeonLoc == DUNGEON_CAVE_GATHERING_HALL) {
		MainScreen.text("<b><u>Gathering Hall</u></b>\n", true);
		MainScreen.text("This room is clearly some kind of dining or gathering hall.  The chamber's shape has been hewn from the surrounding stone, and judging by the visible tool-marks, it wasn't done with a great deal of care.  Two long wooden tables fill out the room.  They're surprisingly well made, though it appears that part of their legs were hacked off with axes to lower their overall height.  You can't help but wonder where they were stolen from.  The tables haven't been cleaned in ages, as evidenced by their many stains and a number of half-rotten bones that still rest on their battered surfaces.  Two rows of crudely crafted chairs flank their better-made brethren, made to accommodate very short beings.", false);
		//[Imp Mob Fight]
		if(flags[FlagEnum.ZETAZ_IMP_HORDE_DEFEATED] == 0) {
			MainScreen.text("\n\nThe place is swarming with two dozen imps, and none of them look happy to see you.  A number of them take flight while the rest form a ring around you, trapping you!  It looks like you'll have to fight your way out!", false);
//			text1 = "FIGHT!";
//			choice1 = impHordeStartCombat;
			MainScreen.addButton(0, "FIGHT!", impHordeStartCombat);
		}
		else {
//			text1 = "North";
//			choice1 = enterZetazsRoomFromTheSouth;
//			text2 = "East";
//			choice2 = 11070;
//			text6 = "West";
//			choice6 = 11069;
//			text7 = "South";
//			choice7 = 11067;
			MainScreen.addButton(0, "North", enterZetazsRoomFromTheSouth);
			MainScreen.addButton(1, "East", dungeonEnterRoom, DUNGEON_CAVE_TORTURE_ROOM);
			MainScreen.addButton(5, "West", dungeonEnterRoom, DUNGEON_CAVE_FUNGUS_CAVERN);
			MainScreen.addButton(6, "South", dungeonEnterRoom, DUNGEON_CAVE_TUNNEL);
		}
	}
	if(dungeonLoc == DUNGEON_CAVE_FUNGUS_CAVERN) {
		MainScreen.text("<b><u>Fungus Cavern</u></b>\n", true);
		if(flags[FlagEnum.ZETAZ_FUNGUS_ROOM_DEFEATED] == 0) {
			MainScreen.text("This cavern is huge!  Though you can see the edge of a large stalactite to the west, the rest of the cave disappears into darkness beyond twenty or thirty feet away.  The floor is covered in spongy, leaf-shaped fungus.  They're huge, shiny, and purple, and they cover the cavern floor for as far as the illumination will reach.  A strange, sweet smell hangs in the cavern's humid air, probably coming from the copious fungal flora.  At the edge of your vision you can see a humanoid skeleton propped up against a stalagmite.  There's a rapier laying a few feet in front of it, and it still looks as good as new.  What do you do?", false);
			//[Get It] [Fly-Get It]
//			text2 = "East";
//			choice2 = 11068;
//			text3 = "Get Sword";
//			choice3 = getSwordAndGetTrapped;
			MainScreen.addButton(2, "Get Sword", getSwordAndGetTrapped);
			if(player.canFly()) {
//				text4 = "Fly to Sword";
//				choice4 = flyToSwordAndGetTrapped;
				MainScreen.addButton(3, "Fly to Sword", flyToSwordAndGetTrapped);
			}
		}
		//Fungus creature dealt with!
		else {
//			text2 = "East";
//			choice2 = 11068;
			MainScreen.text("This cavern is huge!  Though you can see the edge of a large stalactite to the west, the rest of the cave disappears into darkness beyond twenty or thirty feet away.  The floor is covered in spongy, leaf-shaped fungus.  They're huge, shiny, and purple, and they cover the cavern floor for as far as the illumination will reach.  The familiar, sweet smell of them hangs in the cavern's humid air, but you're fairly certain they won't trouble you again.", false);
		}
		MainScreen.addButton(1, "East", dungeonEnterRoom, DUNGEON_CAVE_GATHERING_HALL);
	}
	//Vala's bitch room
	if(dungeonLoc == DUNGEON_CAVE_TORTURE_ROOM) {
		MainScreen.text("<b><u>Filthy Torture Room</u></b>\n", true);
		MainScreen.text("You step into a dank room, outfitted somewhere between a prison cell and a torture chamber. The ceiling of the sulfur-lined room is hung with an inventive variety of shackles, chains, and devices whose intent are not clear to you. Against the north wall, there appears to be an alchemy lab, laden with a dizzying collection of vials, flasks, and beakers. Against the south, there is a long, sinister-looking wooden rack bearing a sequence of progressively larger and thicker devices, carved to resemble monstrous cocks.  ", false);
		//Vala here?
		if(flags[FlagEnum.FREED_VALA] == 0) {
			spriteSelect(85);
			//Not yet defeated zetaz
			if(flags[FlagEnum.DEFEATED_ZETAZ] == 0) {
				//Intro:
				MainScreen.text("", true);
				MainScreen.text("In the far corner, there is a small woman, her back to you, hanging limply by manacles that keep her suspended in a half-kneel. Rich purple hair hangs in long, clumped strands that sparkle occasionally with a pink glitter. Above her, there is a tarnished bronze nameplate that you think reads 'Vala,' but it's impossible to tell for sure under all the imp graffiti. She does not seem to be conscious.\n\n", false);
				
				MainScreen.text("It isn't until you get closer that you notice the large, dragon-fly wings attached to her back and the ephemeral glow of sunlight faintly radiating from her pale skin. If the girl wasn't almost 4' tall, you'd swear she was a fairy, like the ones you've met in the forest. If the cum-clogged drain in the center of the room is any indication, the imps must be using her for their perverted desires. You begin to get an appreciation for what she's endured when you get near enough to see the small, black marks staining her luminance. On her right shoulder blade, the imps have tattooed \"pussy\" and on the left, \"ass.\" All along her back, the imps have tattooed two columns of hash marks, from her shoulders all the way down her ribs, over her ass, down her legs, and even onto the soles of her feet.\n\n", false);
				
				MainScreen.text("You step around her and are startled to see that while the fey girl is whip-thin, her breasts are disproportionately huge. They'd be at least a DD-cup on a normal human, but for her height and body type, they're practically as large as her head. They jiggle at her slow, uneven breathing, tiny drops of milk bubbling at her nipples with every heartbeat. If she weren't chained to the ceiling, you suspect she wouldn't even be able to stand under her own power. Her eyes are open, but she's staring blankly ahead, unaware of the world around her, pupils constricted to pinpricks amid the ocean of her dulled pink irises. Like this, she's no threat to anybody. You suppose you could let her go, though it's unclear if she's self-aware enough to even move. Alternately, you could blow off a little steam.", false);
				//[Free] [Use] [Leave]
//				text3 = "Free";
//				choice3 = freeValazLooseCoochie;
				MainScreen.addButton(2, "Free", freeValazLooseCoochie);
				if (player.gender > 0) {
//					text4 = "Use";
//					choice4 = useVala;
					MainScreen.addButton(3, "Use", useVala);
				}
				if (player.lust >= 33 && shouldraFollower.followerShouldra()) {
//					text5 = "ShouldraVala";
//					choice5 = shouldraFollower.shouldraMeetsCorruptVala;
					MainScreen.addButton(4, "ShouldraVala", shouldraFollower.shouldraMeetsCorruptVala);
				}
			}
			//Zetaz defeated 
			else {
				MainScreen.text("In the far corner, there is a small woman, her back to you, hanging limply by manacles that keep her suspended in a half-kneel. Rich purple hair hangs in long, clumped strands that sparkle occasionally with a pink glitter. Above her, there is a tarnished bronze nameplate that you think reads 'Vala,' but it's impossible to tell for sure under all the imp graffiti. She does not seem to be conscious.\n\n", false);
				//Option to investigate her
				//leftValaAlone()
//				text3 = "Faerie";
//				choice3 = leftValaAlone;
				MainScreen.addButton(2, "Faerie", leftValaAlone);
			}
		}
		//Not here
		else MainScreen.text("In the far corner, there are a set of empty manacles, originally set up to contain Vala, who you've long since freed.", false);
		//Movements
//		text1 = "North";
//		choice1 = 11071;
//		text6 = "West";
//		choice6 = 11068;
		MainScreen.addButton(0, "North", dungeonEnterRoom, DUNGEON_CAVE_SECRET_TUNNEL);
		MainScreen.addButton(5, "West", dungeonEnterRoom, DUNGEON_CAVE_GATHERING_HALL);
	}
	//Backdoor Banditos!
	if(dungeonLoc == DUNGEON_CAVE_SECRET_TUNNEL) {
		MainScreen.text("<b><u>Secret Tunnel</u></b>\n", true);
		MainScreen.text("This passage is the least livable area that you've seen out of the entire cave.  The walls and floor are little more than dirt and rocks, and explosions of dust burst from the ceiling with each tentative movement you make.  For a moment, a wave of claustrophobia threatens to rob you of your nerve, but you blink the pervasive particles from your eyes and focus on why you're here.  ", false);
		//If zetaz not yet defeated
		if(flags[FlagEnum.DEFEATED_ZETAZ] == 0) MainScreen.text("You're going to find Zetaz and pay him back for drugging you on your first day here.  ", false);
		MainScreen.text("A crude door on the southern edge of the tunnel leads back to the imp's sleeping chambers, but the tunnel continues away, curving sharply to the west where a far more lavish door marks the far side of the subterranean passage.", false);
	
		if (flags[FlagEnum.ZETAZ_LAIR_TOOK_BONDAGE_STRAPS] == 0) {
			MainScreen.text("\n\nA pair of fetishy, discarded straps lies on the floor, half obscured by dust.  It looks like something a goblin would wear.  Sexy!");
//			text3 = "B.Straps";
//			choice3 = takeBondageStraps; //2638;
			MainScreen.addButton(2, "B.Straps", takeBondageStraps);
		}
		//(Item: sexy bondage straps/a set of sexy bondage straps/B.Straps? - Seduce ability?)
		//(Possible effect: +lust every round in combat if afflicted with Ceraph's bondage!)
//		text6 = "West";
//		choice6 = 11072;
//		text7 = "South";
//		choice7 = 11070;
		MainScreen.addButton(5, "West", dungeonEnterRoom, DUNGEON_CAVE_ZETAZ_CHAMBER);
		MainScreen.addButton(6, "South", dungeonEnterRoom, DUNGEON_CAVE_TORTURE_ROOM);
	}
	//Zetaz' Lair!
	if(dungeonLoc == DUNGEON_CAVE_ZETAZ_CHAMBER) {
		MainScreen.text("<b><u>Zetaz's Chambers</u></b>\n", true);
		MainScreen.text("You've stepped into the most lavish room in the entire cave system, and marvel at the difference between this magnificent abode and your own crudely constructed campsite.  The stone walls are covered in stolen tapestries that each look to have been liberated from a unique source.  Judging by the variety of depictions and art styles in this one room, you've barely met a fraction of the races that once inhabited the lands of Mareth.  A pair of bright, smokeless lanterns hang from each wall, lit from within by obviously magical spheres of luminescence.  Various pieces of stolen furniture decorate the room, surrounding a four-post bed decorated with masterfully done carvings of various carnal acts.", false);
		if(flags[FlagEnum.ZETAZ_DOOR_UNLOCKED] == 0) {
			MainScreen.text("  <b>There's a bolt holding a door to the south closed, but you give it a gentle tug and it comes unlocked.</b>", false);
			flags[FlagEnum.ZETAZ_DOOR_UNLOCKED] = 1;
		}
		MainScreen.text("\n\n", false);
		
		if(flags[FlagEnum.DEFEATED_ZETAZ] == 0) {
			MainScreen.text("A familiar imp is looking at you with a bewildered expression painted across his face.  You recognize his face immediately – this is Zetaz!  Oddly, he seems to have grown much larger in the time since your previous meeting.  He's over four feet tall and much more solidly built!\n\n", false);
			MainScreen.text("Zetaz whines, \"<i>Seriously?  You show up here!?  First you make me lose my job, and now you beat up my friends and track dirt in my bedroom!?  I've had enough!</i>\"", false);
			startCombat(new Zetaz(), true);
			return;
		}
		else {
//			text7 = "South";
//			choice7 = 11068;
//			text2 = "East";
//			choice2 = 11071;
			MainScreen.addButton(1, "East", dungeonEnterRoom, DUNGEON_CAVE_SECRET_TUNNEL);
			MainScreen.addButton(6, "South", dungeonEnterRoom, DUNGEON_CAVE_GATHERING_HALL);
		}
	}
	//HELIA DUNGEONNNNNOOOO 1
	if(dungeonLoc == DUNGEON_HEL_GUARD_HALL) {
		//ROOM 1: Guard Hall
		MainScreen.text("<b><u>Guard Hall</u></b>\n", true);
		//Room Description:
		MainScreen.text("You stand in what might have been a guard room once upon a time.  Now it is a ruined, ransacked mess.  It seems not to have been used in years, and the table, chairs, and spears lined up against the wall have all rotted away to almost nothing.");
		//[If Armor has not been taken/fought with: 
		if(flags[FlagEnum.WON_GOO_ARMOR_FIGHT] + flags[FlagEnum.LOST_GOO_ARMOR_FIGHT] == 0) {
			MainScreen.text("  However, a suit of half-plate armor has been left up against the eastern wall, hanging loosely on a rack; it seems to be in usable shape.");
//			text4 = "Armor";
//			choice4 = takeGooArmor;
			MainScreen.addButton(3, "Armor", takeGooArmor);
		}
		MainScreen.text("  You see a pair of heavy iron doors leading northward, though they seem so rusty and heavy that opening them is sure to alert anyone nearby, and a small trapdoor leading down.");
		//(Display Options: [North Door] [Trapdoor] [Armor])
//		text1 = "North Door";
//		choice1 = 11086;
//		text3 = "Trapdoor";
//		choice3 = 11085;
		MainScreen.addButton(0, "North Door", dungeonEnterRoom, DUNGEON_HEL_STAIR_WELL);
		MainScreen.addButton(2, "Trapdoor", dungeonEnterRoom, DUNGEON_HEL_WINE_CELLAR);
	}
	if(dungeonLoc == DUNGEON_HEL_WINE_CELLAR) {
		MainScreen.text("<b><u>Wine Cellar</u></b>\n", true);
		//(Accessed from the Trapdoor button)
		MainScreen.text("You've dropped down into a small underground hidey-hole, with ");
		if(player.tallness < 60) MainScreen.text("just enough room to stand up in");
		else MainScreen.text("a ceiling so low you have to crouch");
		MainScreen.text(".  To your surprise, nothing horrifying jumps out and tries to rape you.  You see a few horns of mead slung up in a wine rack - they smell a bit pungent, but alcohol improves with age they say...");
		if (flags[FlagEnum.HEL_DUNGEON_MEAD_LOOTED] < 5) {
			MainScreen.text(" (There are " + (5 - flags[FlagEnum.HEL_DUNGEON_MEAD_LOOTED]) + "x God's Mead horns here to take.)\n\n");
//			text4 = "God'sMead";
//			choice4 = takeGodsMead;
			MainScreen.addButton(3, "God'sMead", takeGodsMead);
		}
		//Display Options: [GodsMead] [Climb Up]
//		text3 = "Climb Up";
//		choice3 = 11084;
		MainScreen.addButton(2, "Climb Up", dungeonEnterRoom, DUNGEON_HEL_GUARD_HALL);
	}
	if(dungeonLoc == DUNGEON_HEL_STAIR_WELL) {
		MainScreen.clearText();
		//Room 3: Stair Well
		MainScreen.text("<b><u>Stair Well</u></b>\n", true);
		//(Upon clicking in:)
		if (flags[FlagEnum.HEL_HARPIES_DEFEATED] == 0) {
			MainScreen.text("You open the heavy double doors and cringe as a loud \"<i>SCREECH!</i>\" echoes out and up the next room - a wide open stairwell, it seems, with minimal cover.  The perfect place for a harpy to fight... Oh, shit!");
			MainScreen.text("\n\nYou ready your [weapon] as a wing of harpies looks up from eating at a small table in the center of the stone stairwell, all staring at you with wide, astonished eyes.  Another few harpies peer down from above, poking their heads down the stairs to get a look at the intruder.  Almost in unison, they jump to their feet and bare their claws.");
			MainScreen.text("\n\nIt's a fight!");
			startCombat(new HarpyMob());
			return;
		}
		else {
			if (flags[FlagEnum.HEL_HARPY_QUEEN_DEFEATED] == 0) {
				MainScreen.text("There's a pile of drugged, unconscious harpies you've already defeated on the floor, as well as Kiri, the only one that didn't attack you.  You recall that she knows Hel and is here to help the both of you.");
				//(Display Options: [Talk] [Sex] [Valeria](If Encountered) [Go Upstairs] [Go Downstairs])
//				let valeria:Function = null;
//				if (player.armorName == "goo armor") valeria = talkToValeria;
//				text6 = "South Door";
//				choice6 = 11084;
//				text4 = "Talk";
//				choice4 = talkToKiri;
//				text1 = "Sex";
//				choice1 = kiriSexIntro;
//				text5 = "Valeria";
//				choice5 = valeria;
//				text3 = "Go Upstairs";
//				choice3 = 11088;
//				text8 = "Go Downstairs";
//				choice8 = 11087;
				MainScreen.addButton(0, "Sex", kiriSexIntro);
				MainScreen.addButton(3, "Talk", talkToKiri);
				if (player.armorName == "goo armor") MainScreen.addButton(4, "Valeria", talkToValeria);
			}
			else {
				MainScreen.text("There's a pile of drugged, unconscious harpies you've already defeated on the floor.  Kiri appears to have left.");
//				text6 = "South Door";
//				choice6 = 11084;
//				text3 = "Go Upstairs";
//				choice3 = 11088;
//				text8 = "Go Downstairs";
//				choice8 = 11087;
			}
			MainScreen.addButton(2, "Go Upstairs", dungeonEnterRoom, DUNGEON_HEL_MEZZANINE);
			MainScreen.addButton(5, "South Door", dungeonEnterRoom, DUNGEON_HEL_GUARD_HALL);
			MainScreen.addButton(7, "Go Downstairs", dungeonEnterRoom, DUNGEON_HEL_DUNGEON);
		}
	}
	if(dungeonLoc == DUNGEON_HEL_DUNGEON) {
		MainScreen.clearText();
		MainScreen.text("<b><u>Dungeon</u></b>\n", true);
		//(Intro -- Before Fight)
		if(flags[FlagEnum.HEL_BRIGID_DEFEATED] == 0) {
			MainScreen.text("You make your way downstairs into a small, smoky stone room.  A thick smell of steam and burnt meat hangs over the room, making you cough as you descend the stairs.  As you make your way into the tower's little dungeon, you quickly notice the salamander chained to a table.  He's a great big man, nearly eight feet tall and covered in scars.  He has short, spiky red hair, the same color as his tail and limb scales, and a black eyepatch covers his left socket.  He looks like hell, emaciated and exhausted, covered in thick cum-stains from being used an untold number of times by the harpies of the tower.");
			MainScreen.text("\n\nBeside him, though, is the tallest harpy you've ever seen.  A foot over most of her sisters, she stands stark naked save for a red-hot iron poker in her hand and a heavy iron shield in the other.  Her pink hair is shaved down to a mohawk, and her face is covered with a dozen iron studs and rings.");
			MainScreen.text("\n\n\"<i>'Bout time you made it down here, you " + player.mf("bastard","bitch") + ".  Mama Brigid's been waiting a loooong time for someone to try and break out one of her toys.</i>\"  She pats the hefty keyring on the underside of her shield and leers at you.");
			MainScreen.text("\n\nYou ready your [weapon] and prepare to take the keys from her!");
			startCombat(new Brigid());
			return;
		}
		else {
			MainScreen.text("You're standing in a small dungeon room, nearly gagging on the smells of burnt meat and smoke.  A number of nasty torture devices hang on the walls, and a table sits in the middle of the room, ");
			if (flags[FlagEnum.HEL_PC_TALKED_WITH_HAKON] == 0) {
				MainScreen.text("on which the salamander prisoner lies");
//				text4 = "Prisoner";
				MainScreen.addButton(3, "Prisoner", helDungeonPrisonerTalk);
			}
			else {
				MainScreen.text("on which Hakon lies");
//				text4 = "Hakon";
				MainScreen.addButton(3, "Hakon", helDungeonPrisonerTalk);
			}
			MainScreen.text(".");
			if (player.hasKeyItem("Harpy Key A") >= 0 && player.hasKeyItem("Harpy Key B") >= 0) MainScreen.text("\n\n<b>You have the keys to release the prisoner, but you may want to make sure you have everything from this place that you want before you make your escape.  You doubt you'll be able to return in the future.</b>");
			//(Display Options: [Go Upstairs](Back to Stairwell & Kiri) [Prisoner] [Torture Gear]
//			text3 = "Upstairs";
//			choice3 = 11086;
			
//			choice4 = helDungeonPrisonerTalk;
//			text5 = "Torture Gear";
//			choice5 = tortureGear;
			MainScreen.addButton(2, "Upstairs", dungeonEnterRoom, DUNGEON_HEL_STAIR_WELL);
			MainScreen.addButton(4, "Torture Gear", tortureGear);
		}
	}
	if(dungeonLoc == DUNGEON_HEL_MEZZANINE) {
		MainScreen.clearText();
		MainScreen.text("<b><u>Mezzanine</u></b>\n", true);
		//(Intro; Before Battle)
		if(flags[FlagEnum.HEL_PHOENIXES_DEFEATED] == 0) {
			MainScreen.text("You ascend the heavy stone steps, circling the tower's walls as you ascend.  You are stopped perhaps half-way to the second main floor on a small terrace level with a wide open view overlooking the vale beneath the high mountains.  As you step onto the mezzanine, you watch with a scowl as a number of tall, muscular hermaphrodites step out from the shadows.  Each is clad in heavy chainmail and wields a scimitar and a blood-red shield, but is otherwise nude, revealing their reptilian pricks and slick pussies.  The soldiers standing before you look like harpies, but they have scaled, humanoid legs, long, fiery tails and their wings are the darkest crimson.  These are phoenixes - the dread half-breed warriors you and Hel are here to stop!");
			startCombat(new PhoenixPlatoon());
			return;
		}
		else {
			MainScreen.text("You're standing in the Mezzanine of the tower, a small terrace with a magnificent view of the High Mountains and the valleys below.  There are stairs leading up and down from here, as well as a pile of defeated phoenixes that don't look like they'll be recovering for a bit.");
			//(Display Options: [Go Upstairs] [Go Downstairs] [Phoenixes])
//			text8 = "Downstairs";
//			choice8 = 11086;
//			text3 = "Upstairs";
//			choice3 = 11089;
//			text4 = "Phoenixes";
//			choice4 = checkOutDemBirdBitches;
			//(Go Downstairs returns you to the Stairwell; Go Up takes you to the throne room)
			MainScreen.addButton(2, "Upstairs", dungeonEnterRoom, DUNGEON_HEL_THRONE_ROOM);
			MainScreen.addButton(3, "Phoenixes", checkOutDemBirdBitches);
			MainScreen.addButton(7, "Downstairs", dungeonEnterRoom, DUNGEON_HEL_STAIR_WELL);
		}
	}
	if(dungeonLoc == DUNGEON_HEL_THRONE_ROOM) {
		MainScreen.clearText();
		MainScreen.text("<b><u>Throne Room</u></b>\n");
		//Throne Room Descript (Before Combat!)
		if(flags[FlagEnum.HEL_HARPY_QUEEN_DEFEATED] == 0) {
			MainScreen.text("Ascending the stairs, you are stopped by a pair of heavy double doors.  They're covered with rotting, chipped purple paint and laurels that look years old.  The sharp, screeching sounds of metal on metal ring out in the next room - the sounds of a fight!  You kick the door open, and charge into what must be some kind of throne room; a large carpet dominates your view, leading up to a towering throne surrounded by pillows and cushions, currently vacant.");

			MainScreen.text("\n\nIn the center of the throne room stand Helia the Salamander and a harpy that could only be described as a broodmother.  She isn't particularly tall or menacing looking, but her hips are truly inhuman, thrice as wide as she is at the least, and her pillowy ass seems canyon-like in her nudity, the type of butt you could lose yourself in forever.  The harpy matron, wielding a staff, is currently locked in a fierce battle against Hel's red-hot scimitar.");

			MainScreen.text("\n\nSeeing you in the corner of her eye, Hel spins out of the contest and comes to stand beside you, blade raised toward the harpy broodmother.");

			MainScreen.text("\n\n\"<i>[name]!</i>\" she says, giving you a teasing slap on the ass with her tail.  \"<i>Took your sweet time, didn't you? Here I was starting to think I'd get this bitch all to myself!</i>\"");

			MainScreen.text("\n\nYou give Hel a reassuring nod and start to circle toward the Harpy Queen, taking the left flank while Hel heads right.  The queen looks from one of you to the other, a ball of white-hot magic fire conjured in her hand.");

			MainScreen.text("\n\n\"<i>You fools!</i>\" the queen hisses, backing away from you as best she can.  \"<i>You know not what you do!  My children... Their sole purpose was for the good of Mareth! You have ruined everything! Now the demons will have us all.</i>\"");

			MainScreen.text("\n\nYou ignore her, focusing on getting into position for a quick take-down with the help of your salamander lover.  However, before you can back the Harpy Queen into a corner, you hear an explosive BOOM from above.  You look up in time to see a hole erupt in the tower's ceiling, and a great brood of harpies pour in, dozens of them at the least.");

			MainScreen.text("\n\n\"<i>Oh well, fuck me!</i>\" Hel screams, dodging a hail of blows as the harpies swarm the throne room.  You can only just hear the broodmother laughing, bidding her children onwards over the sound of screeching and beating wings.");
			MainScreen.text("\n\n\"<i>FUCK! [name]!</i>\" Hel yells, cleaving a harpy in two with her scimitar, \"<i>Take a piece of the action; get the queen.  I've got these bitches!</i>\"");

			MainScreen.text("\n\nBefore you can say a word, Hel grabs a pair of harpies and, using them like human battering rams, dives into the swirling maelstrom of talons and claws.  You turn, [weapon] raised, to face down the queen.");

			MainScreen.text("\n\nShe now sits upon her throne, her staff laid across her bird-like legs.  \"<i>Idiot,</i>\" she sneers, just loud enough to be heard over the din of battle.  \"<i>You've doomed us all.  So many of my daughters dead or beaten or fled... No, I will not allow you to go unpunished, even if it means my life.</i>\"");
			MainScreen.text("\n\nShe stands, grabbing her great whitewood staff.  A ball of magical whitefire forms in her hand, ready to sear you alive.");
			startCombat(new HarpyQueen());
			return;
		}
		else {
			//Room Description:
			MainScreen.text("You stand in the harpy throne room - a long, circular room dominated by a high throne surrounded by cushions and drapes.  A single long carpet flows from the heavy double doors to the throne, reminding you of a castle's great hall in days gone by.  A number of harpies cower in the shadows, afraid to oppose you further now that their mighty leader is defeated.");
			//[if PC hasn't executed the queen: 
			if (flags[FlagEnum.HARPY_QUEEN_EXECUTED] == 0) {
//				text5 = "Harpy Queen";
//				choice5 = harpyQueenAdvantage;
				MainScreen.text("  The Harpy Queen slumps in her throne, insensate.");
				MainScreen.addButton(3, "Helia", HeliaThroneRoom);
				MainScreen.addButton(4, "Harpy Queen", harpyQueenAdvantage);
			}
			else if (flags[FlagEnum.TOOK_QUEEN_STAFF] == 0) MainScreen.addButton(4, "Take Staff", takeQueensStaff);
			//(Display Options: [Helia] [Harpy Queen] [Go Downstairs])
//			text8 = "Downstairs";
//			choice8 = 11088;
			MainScreen.addButton(7, "Downstairs", dungeonEnterRoom, DUNGEON_HEL_MEZZANINE);
//			if (flags[FlagEnum.HARPY_QUEEN_EXECUTED] == 0) {
//				text4 = "Helia";
//				choice4 = HeliaThroneRoom;
//				MainScreen.addButton(3, "Helia", HeliaThroneRoom);
//			}
//			if(flags[FlagEnum.HARPY_QUEEN_EXECUTED] == 1 && flags[FlagEnum.TOOK_QUEEN_STAFF] == 0) {
//				text5 = "Take Staff";
//				choice5 = takeQueensStaff;
//				MainScreen.addButton(4, "Take Staff", takeQueensStaff);
//			}
		}
	}
	if(dungeonLoc == DUNGEON_WITCH_ENTRANCE_GATEWAY) {
		MainScreen.clearText();
		MainScreen.text("<b><u>Strange Gateway in the Sands</u></b>\n");
		if(flags[FlagEnum.SANURA_DISABLED] > 0) {
			MainScreen.text("Just ahead, in one of the larger dunes, is a square stone doorway, built into the side of a large, sparkling mountain of sand.  You never would have noticed it if the sun hadn't been at the perfect angle to trace a rectangular shadow down the side of the incline.  As you approach, you notice a familiar obsidian orb embedded into the side of it.  It's obviously the mechanism to open it.");
//			text1 = "North";
//			choice1 = openZeDoorToParadize;
//			text5 = "Leave";
//			choice5 = leaveBoobsDungeon;
			MainScreen.addButton(0, "North", openZeDoorToParadize);
		}
		else if (flags[FlagEnum.MET_SANURA] == 0) {
			flags[FlagEnum.MET_SANURA] = 1;
			MainScreen.text("Just ahead, in one of the larger dunes, is a square stone doorway, built into the side of a large, sparkling mountain of sand.  You never would have noticed it if the sun hadn't been at the perfect angle to trace a rectangular shadow down the side of the incline.  As you approach, you notice a smooth obsidian orb embedded into the side of it.  Perhaps that's the mechanism to open it?");
			MainScreen.text("\n\nSuddenly, a huge shadow looms over you, and the sound of beating wings echo from on high. You spin around in time to see a huge creature leap from the dune tops and slam into the ground a few feet away.  At first glance, the creature looks like a tall, tanned woman with flowing black hair, adorned in a great wealth of gold and jewels.  A moment later, though, you're able to take in the full view of her form: from the waist down, her shapely human form morphs into the lower body of a great, golden-haired lion, padding on a quartet of powerful legs ending in sharp claws.  From her leonine sides grow a pair of massive wings, easily over a dozen feet across, which quickly furl up against her body.  She's a sphinx!");
			MainScreen.text("\n\nThe sphinx-girl pads over towards you, her arms crossed under her small, palmable breasts. Chestnut-colored eyes examine you, looking you over from your [hair] to your [feet], a playful grin playing across her feminine features.  \"<i>O-ho!  What's this we have here?  A poor, lost " + player.race() + " wandering the desert; or are you something more?  Indeed, I should think so, with your [weapon] so eager for battle, and your [armor] that looks to have seen a thousand blows.  My, my.  Could it be you've come to brave my Mistress's lair?  Ah, if so... you must answer my riddles three, lest I keep from you the key!</i>\" she says, a little tune springing into her voice as she stalks towards you.");
			MainScreen.text("\n\n\"<i>We could even make it interesting...  If you can't guess my riddles, you must surrender your body to my pleasure.  If you win, your pleasure shall be my wish.</i>\"");
			if (flags[FlagEnum.DISCOVERED_WITCH_DUNGEON] == 0) {
				MainScreen.text("\n\n(<b>You've discovered a new dungeon, available in the places menu in the future!  Make sure you save before delving too deeply...</b>)");
				flags[FlagEnum.DISCOVERED_WITCH_DUNGEON] = 1;
			}
			//(Display Options: [Riddle Game] [Fight] [Leave])
//			text3 = "Riddle Game";
//			choice3 = riddleGameGo;
//			text4 = "Uh, FIGHT!";
//			choice4 = fuckItAttack;
//			text5 = "Leave";
//			choice5 = leaveBoobsDungeon;
			MainScreen.addButton(2, "Riddle Game", riddleGameGo);
			MainScreen.addButton(3, "Uh, FIGHT!", fuckItAttack);
		}
		else {
			if (flags[FlagEnum.TIMES_SUBMITTED_TO_SANURA] + flags[FlagEnum.TIMES_WINFUCKED_SANURA] > 0) {
				MainScreen.text("You approach Sanura the sphinx as she pads around the great stone doorframe.  A playful grin spreads across her thin lips as you approach.  \"<i>O-ho!  Back again, I see.  Mmm, it's been so dull since last you <i>came</i>.  There's no one more fun to play out here in the wastes.  So... care to try your hand at my game once more?");
				if (flags[FlagEnum.BEATEN_SANURA_COUNT] > 0) MainScreen.text("  Or would you rather skip the formalities?  We both know who's got the sharper wit, I should think.");
				MainScreen.text("</i>\"");
			}
			else {
				MainScreen.text("The sphinx, Sanura, is padding around the stone doorframe.  Occasionally she beats her leonine wings or gives a mighty yawn, obviously bored by a present lack of stimulation.  Seeing you standing about, however, Sanura gives you a sultry come-hither look and a seductive wink.  You're not sure if she wants to tempt your mind or your body.");
			}
//			text3 = "Riddle Game";
//			choice3 = riddleGameGo;
			MainScreen.addButton(2, "Riddle Game", riddleGameGo);
			if (flags[FlagEnum.BEATEN_SANURA_COUNT] > 0) {
//				text1 = "North";
//				choice1 = openZeDoorToParadize;
//				text4 = "Fuck";
//				choice4 = fuckDatSphinx;
				MainScreen.addButton(0, "North", openZeDoorToParadize);
				MainScreen.addButton(3, "Fuck", fuckDatSphinx);
			}
//			text5 = "Leave";
//			choice5 = leaveBoobsDungeon;
		}
		MainScreen.addButton(4, "Leave", leaveBoobsDungeon);
	}
	if(dungeonLoc == DUNGEON_WITCH_CAVERNOUS_COMMONS) {
		MainScreen.clearText();
		MainScreen.text("<b><u>Cavernous Commons</u></b>\n");
		MainScreen.text("Dancing lights swirl around the roof of the cavern, twirling around each other in patterns too intricate to follow.  Whatever they are, they're clearly magical, and they lend this place an otherworldly ambience unmatched by anything you've seen.  This huge room reminds you of your village commons in a way - it's clearly a communal area.  There's a water-pump in the northwest corner and a blazing purple bonfire in the center of the chamber, heating the cool underground air.  The ground is dirt, rather than sand, and hard-packed as any road.  Various chairs and benches are set up for witches to relax in.  ");
		if (flags[FlagEnum.SANDWITCH_MOB_DEFEATED] == 0) {
			MainScreen.text("Worst of all, a huge assortment of spellcasters is assembling into a mob, obviously hostile.");
			startCombat(new SandWitchMob(), true);
			return;
		}
		else MainScreen.text("The women you defeated before have returned to their tasks, casting wary glances your way from time to time but no longer threatening.");
		MainScreen.text("  Cave tunnels lead in to the east and west into more underground chambers.  A path leads south towards the exit.");
		if (flags[FlagEnum.SANDWITCH_THRONE_UNLOCKED] == 0) {
			MainScreen.text("\n\nA huge stone doorway blocks the path north.  You cannot see a way to open it.");
		
		}
		else {
			MainScreen.text("\n\nAn open doorway opens up to the north.  You can faintly see some kind of altar beyond it.");
//			text1 = "North";
//			choice1 = 11147;
			MainScreen.addButton(0, "North", dungeonEnterRoom, DUNGEON_WITCH_SACRIFICIAL_ALTAR);
		}
//		text7 = "South";
//		choice7 = 11133;
//		text2 = "East";
//		choice2 = 11141;
//		text6 = "West";
//		choice6 = 11135;
		MainScreen.addButton(1, "East", dungeonEnterRoom, DUNGEON_WITCH_EAST_WARRENS_MAIN);
		MainScreen.addButton(5, "West", dungeonEnterRoom, DUNGEON_WITCH_WEST_WARRENS_MAIN);
		MainScreen.addButton(6, "South", dungeonEnterRoom, DUNGEON_WITCH_ENTRANCE_GATEWAY);
	}
	if(dungeonLoc == DUNGEON_WITCH_WEST_WARRENS_MAIN) {
		MainScreen.clearText();
		MainScreen.text("<b><u>West Warrens Main Hall</u></b>\n");
		MainScreen.text("The supernatural illumination so prevalent to the east is present here as well, though in smaller quantity and vastly diminished brightness.  Swirls of bluish-white hue slide along the ceiling in slow, measured motions, a stark contrast to the jubilant dancing of the preceding cavern.  The ceiling is almost twelve feet high in places, with the sides of the east-west passage dipping down the lowest.  The floor is sandstone here, as you would expect in a desert cave, though it is liberally obfuscated with an array of woven rugs.  Sand Witches march by on errands, only pausing to give you disinterested glances.  Most of them bear the signs of pregnancy or have young girls in tow.  Whatever the case, there doesn't seem to be any fight in these women.  Along the north and south walls are small, door-sized openings, draped with heavy curtains that easily muffle any noise.  To the west, the tunnel bores on unimpeded.  However, to the east the cave opens up into a much, much larger chamber.");
//		text1 = "North";
//		choice1 = 11136;
//		text7 = "South";
//		choice7 = 11137;
//		text2 = "East";
//		choice2 = 11134;
//		text6 = "West";
//		choice6 = 11138;
		MainScreen.addButton(0, "North", dungeonEnterRoom, DUNGEON_WITCH_CHILDRENS_PLAYROOM);
		MainScreen.addButton(1, "East", dungeonEnterRoom, DUNGEON_WITCH_CAVERNOUS_COMMONS);
		MainScreen.addButton(5, "West", dungeonEnterRoom, DUNGEON_WITCH_WEST_WARRENS_WEST);
		MainScreen.addButton(6, "South", dungeonEnterRoom, DUNGEON_WITCH_PREGNANT_LUST_ROOM);
	}
	if(dungeonLoc == DUNGEON_WITCH_CHILDRENS_PLAYROOM) {
		MainScreen.clearText();
		MainScreen.text("<b><u>West Warrens Eastern Portion North Side (Children's Play Room)</u></b>\n");
		MainScreen.text("Behind the thick curtain is the last thing you would expect to see.  There's nearly a dozen children and three busty, pregnant sand witches watching them.  Toys have been scattered everywhere by the young blonde children.  Their wardens were busy knitting when you intruded, but they glare at you balefully and make shooing gestures.  Unless you had planned to rob children of their toys and beat up pregnant women, there's nothing to be had here.");
//		text7 = "South";
//		choice7 = 11135;
		MainScreen.addButton(6, "South", dungeonEnterRoom, DUNGEON_WITCH_WEST_WARRENS_MAIN);
	}
	if(dungeonLoc == DUNGEON_WITCH_PREGNANT_LUST_ROOM) {
		MainScreen.clearText();
		MainScreen.text("<b><u>West Warrens Eastern Portion South Side (Lust Room)</u></b>\n");
		MainScreen.text("This room is surprisingly large - big enough to hold the " + num2Text(rand(6) + 5) + " heavily pregnant women inside plus perhaps a dozen more.  Like the outer tunnel, this room is lit by magic, though its contents are equally mundane, if a great deal more... interesting.  There's female sex-toys of every variety on almost every surface.  They sit in piles on the floor, they hang from the walls, and there are even some mounted on the wall, to be fucked in place.  Many such toys have multiple shafts and come in shapes from standard to canine to obscenely equine.  All of the witches are presently engaged in coitus with each other or their 'marital aids', but once you enter, they glance at you with hungry, lust-filled eyes.");
		if (silly()) MainScreen.text("  Clearly, if you wanted to, you could put some extra meat in a sand witch.");
//		text1 = "North";
//		choice1 = 11135;
		MainScreen.addButton(1, "North", dungeonEnterRoom, DUNGEON_WITCH_WEST_WARRENS_MAIN);
		if (player.lowerBody.cockSpot.hasCock() && player.lust >= 33) {
//			text3 = "FuckWitches";
//			choice3 = knockUpSomeDoubleStuffedSandWitches;
			MainScreen.addButton(2, "FuckWitches", knockUpSomeDoubleStuffedSandWitches);
		}
	}
	if(dungeonLoc == DUNGEON_WITCH_WEST_WARRENS_WEST) {
		MainScreen.clearText();
		MainScreen.text("<b><u>West Warrens Main Hall (Western Portion)</u></b>\n");
		MainScreen.text("The smooth tunnel comes to an end here, blocked by the omnipresent sandstone.  The sapphire light plays beautifully across the rough-hewn stone as you watch, but you don't take the time to give it much thought.  To the east, the arching hallway leads back towards a large common area of a cave.  Along the north and south walls are door-sized openings, blocked with rugs of fine make and thick fabric.  They don't leave enough of a gap for any light or sound to bleed into the hall.  You'll have to take a peek if you want to see what's going on.");
		if (flags[FlagEnum.ESSRAYLE_ESCAPED_DUNGEON] == 0 && flags[FlagEnum.MET_ESSY] > 0) {
			flags[FlagEnum.ESSY_MET_IN_DUNGEON] = 1;
			if(flags[FlagEnum.TOLD_MOTHER_TO_RELEASE_ESSY] > 0) {
				MainScreen.text("\n\n<b>Your attention is immediately drawn to Essrayle...</b>");
				MainScreen.addButton(0, "Next", forest.essrayle.essyWitchVictory);
				flags[FlagEnum.ESSRAYLE_ESCAPED_DUNGEON] = 1;
				return;
			}
			MainScreen.text("\n\nQuite an unusual sight awaits you in this chamber.  Sitting in an oversized pot is what looks to be the overly busty, plant girl you encountered earlier, Essrayle.  She's changed quite a bit since you last saw her, however.  While her inhumanly smooth, elfin face seems to be unchanged, the rest of her verdant body seems to have been warped into a hyper-sexual parody of a fertility idol, with features that echo the nomadic sand witch tribe.");
//			text3 = "Essrayle";
//			choice3 = forest.essrayle.approachTrappedEssy;
			MainScreen.addButton(2, "Essrayle", forest.essrayle.approachTrappedEssy);
		}
//		text1 = "North";
//		choice1 = 11139;
//		text7 = "South";
//		choice7 = 11140;
//		text2 = "East";
//		choice2 = 11135;
		MainScreen.addButton(0, "North", dungeonEnterRoom, DUNGEON_WITCH_NURSERY);
		MainScreen.addButton(1, "East", dungeonEnterRoom, DUNGEON_WITCH_WEST_WARRENS_MAIN);
		MainScreen.addButton(6, "South", dungeonEnterRoom, DUNGEON_WITCH_PHARMACY);
	}
	if(dungeonLoc == DUNGEON_WITCH_NURSERY) {
		MainScreen.clearText();
		MainScreen.text("<b><u>West Warrens Western Portion North Side (Nursery)</u></b>\n");
		MainScreen.text("As soon as you clear the curtain, you realize there's nothing of interest to you here.  The room is lit with rose pink globes, and the furniture in the room is filled with sleeping mothers, nursing infants, or older children taking naps.  The room is packed with bodies, and while it smells strongly of femininity, there's nothing worth looking into present here.");
//		text7 = "South";
//		choice7 = 11138;
		MainScreen.addButton(6, "South", dungeonEnterRoom, DUNGEON_WITCH_WEST_WARRENS_WEST);
	}
	if(dungeonLoc == DUNGEON_WITCH_PHARMACY) {
		MainScreen.clearText();
		MainScreen.text("<b><u>West Warrens Western Portion South Side (Pharmacy)</u></b>\n");
		MainScreen.text("This room is so tiny it can barely get away with being called that.  If anything, it's more of a small, cozy nook.  There isn't anyone else here, though the room is illuminated by the same omnipresent magics found elsewhere in this little cave of wonders.  Standing silent vigil on the southern wall, a large chest looms over you, stretching most of the way to the ceiling.  It is completely, almost impossibly neat, with every drawer fully and completely closed.  Spurred on by this strangeness, you pop a few of them open.  One drawer has pink pills, another brown.  Searching drawer by drawer until you discover that every single compartment houses the same dual medicines.  You glance about the room and spy a faded parchment on the wall.  It reads \"<i>Tnangerp rof knip, nerrab rof nworb.</i>\"  There is an opening in the wall to the north.");
		if (flags[FlagEnum.SANDWITCH_THRONE_UNLOCKED] == 0) {
			MainScreen.text("\n\nThere is also a lever on the floor.  Looking closely at it, it appears that it connects with machinery that leads to the east...");
//			text2 = "Pull Lever";
//			choice2 = pullLever;
			MainScreen.addButton(1, "Pull Lever", pullLever);
		}
//		text3 = "Brown Pill";
//		choice3 = takeBarrenPills;
//		text4 = "Pink Pill";
//		choice4 = takeFertilePills;
//		text1 = "North";
//		choice1 = 11138;
		MainScreen.addButton(0, "North", dungeonEnterRoom, DUNGEON_WITCH_WEST_WARRENS_WEST);
		MainScreen.addButton(2, "Brown Pill", takeBarrenPills);
		MainScreen.addButton(3, "Pink Pill", takeFertilePills);
	}
	if(dungeonLoc == DUNGEON_WITCH_EAST_WARRENS_MAIN) {
		MainScreen.clearText();
		MainScreen.text("<b><u>Eastern Warrens Main Hall (Western Portion)</u></b>\n");
		MainScreen.text("This smooth, sandstone tunnel proceeds in a perfectly straight line from east to west, as if aligned to some titanic, invisible compass buried below the floor.  Flickering white plumes of illumination undulate through the air along the arched ceiling, trailing streamers of pearl incandescence that light the entire chamber with ghostly brightness.  You are at the entrance to the eastern warrens - the commons are still clearly visible to the west, and the pathway to the east goes on a-ways.  Hand woven tapestries adorn the walls, telling the history of this enclave in pictographic form, from its inception to present day.  Further east, you can see a few empty places, ready to be covered with more cloth, once the next chapter of history is ready to be told.  To the north, there is a small opening in the wall, blocked off by plain white curtains.");
//		text1 = "North";
//		choice1 = 11142;
		//text7 = "South";
		//choice7 = 11137;
//		text2 = "East";
//		choice2 = 11144;
//		text6 = "West";
//		choice6 = 11134;
		MainScreen.addButton(0, "North", dungeonEnterRoom, DUNGEON_WITCH_SLEEPING_CHAMBER);
		MainScreen.addButton(1, "East", dungeonEnterRoom, DUNGEON_WITCH_EAST_WARRENS_EAST);
		MainScreen.addButton(5, "West", dungeonEnterRoom, DUNGEON_WITCH_CAVERNOUS_COMMONS);
	}
	if(dungeonLoc == DUNGEON_WITCH_SLEEPING_CHAMBER) {
		MainScreen.clearText();
		MainScreen.text("<b><u>Eastern Warrens West Portion North Side (Sleeping Chamber)</u></b>\n");
		MainScreen.text("Inside this expansive but cosy chamber are a few dozen beds, arranged in neat patterns marred only by a few cots that dare to be positioned adjacent to one another.  Clearly this is the tribe's primary sleeping area.  The floor is obscured by heavy, hand-woven rugs that ruffle oh so softly against your [feet].  Instead of the usual ghostly lights you've grown to expect, the interior of this dwelling is lit by glass-paneled constructs resembling lanterns.  There is no fuel or wick of course, only flicking phantasmal illumination trapped as if it were a flame.  Shutters allow the lanterns to be dimmed, but as you are alone in here for now, there's no reason to make it harder to see.  There is a door to the east and a curtained off opening to the south.");
//		text2 = "East";
//		choice2 = 11143;
//		text7 = "South";
//		choice7 = 11141;
		MainScreen.addButton(1, "East", dungeonEnterRoom, DUNGEON_WITCH_BATH_ROOM);
		MainScreen.addButton(6, "South", dungeonEnterRoom, DUNGEON_WITCH_EAST_WARRENS_MAIN);
	}
	if(dungeonLoc == DUNGEON_WITCH_BATH_ROOM) {
		MainScreen.clearText();
		MainScreen.text("<b><u>Eastern Warrens East Portion North Side (Bath Room)</u></b>\n");
		MainScreen.text("As soon as you step in, you can smell a sweet, dairy-like scent in the air, but as your eyes adjust to the dimmer lighting, you realize you've stumbled into the sand witches' bathroom!  Fluffy towels hang from the wall, ready for use.  There's one giant tub in the center of the room, recessed deep into the floor.  It has a number of seats carved into the side with a small, open hole in the bottom.  Hanging from the ceiling, a long chain dangles down, topped with a plug.");
		flags[FlagEnum.MET_MILK_SLAVE] = 1;
		if(flags[FlagEnum.MILK_NAME] is Number) {
			MainScreen.text("  There are no faucets or water sources that you can see, but your unasked questions are answered when a heavy, liquid sloshing sound emanates from the corner.  The source of the noise reveals itself to be a tit-encumbered, black-skinned human girl.  She drags her milk-swollen mammaries up to the edge of the tub and asks in a breathy, excited voice, \"<i>Bath time?</i>\"  Whoever she was, the witches seem to have broken her utterly - she's interested in nothing but being milked or lounging in her corner.  The way out lies west.");
//			text3 = "Bath Time";
//			choice3 = milkBathsAhoy;
			MainScreen.addButton(2, "Bath Time", milkBathsAhoy);
		}
//		text6 = "West";
//		choice6 = 11142;
		MainScreen.addButton(5, "West", dungeonEnterRoom, DUNGEON_WITCH_SLEEPING_CHAMBER);
	}
	if(dungeonLoc == DUNGEON_WITCH_EAST_WARRENS_EAST) {
		MainScreen.clearText();
		MainScreen.text("<b><u>Eastern Warrens Main Hall (Eastern Portion)</u></b>\n");
		MainScreen.text("Coming to an end here, the eastern warrens' main hall ends in little more than a bare, flat stone wall.  The area is well illuminated by the familiar magical lights, giving you a good view of the historical tapestries and blank spaces yet to be filled in.  You can't help but wonder if the Witches will simply stop recording their history once this area is full, or if they will expand in order to give themselves more room.  Looking over the events depicted here, it's clear that this enclave is one of the oldest, roughly two decades old.  There are pictures of a blond haired woman in fluttering, golden robes leaving a town of demons behind and journeying towards the desert.  Could that be how the sand witches began?  You shake your head and look over the rest of the room.  There's a curtained off doorway to the south, and of course, the tunnel leads back to the west.");
		//text1 = "North";
		//choice1 = 11136;
//		text7 = "South";
//		choice7 = 11145;
		//text2 = "East";
		//choice2 = 11142;
//		text6 = "West";
//		choice6 = 11141;
		MainScreen.addButton(5, "West", dungeonEnterRoom, DUNGEON_WITCH_EAST_WARRENS_MAIN);
		MainScreen.addButton(6, "South", dungeonEnterRoom, DUNGEON_WITCH_CUM_WITCH_BEDROOM);
	}
	if(dungeonLoc == DUNGEON_WITCH_CUM_WITCH_BEDROOM) {
		MainScreen.clearText();
		MainScreen.text("<b><u>Eastern Warrens East Portion South Side (Cum Witch's Bedroom)</u></b>\n");
		MainScreen.text("As soon as you brush back the curtain, you're assaulted by a pungent, salty smell.  It almost reminds you of tepid ocean water... or cum.  Regardless, you force your way in and take a look around.  This area has all the furnishings of a small domicile and comes complete with a solid oak bed and mattress.  The mattress and sheets seem to be cared for with immaculate precision, perhaps magically aided.  There is a simple dresser here, and though it looks to have been fashioned by crude tools, the wood looks sturdy and serviceable.  All of the drawers are closed, of course.  A few books sit on a nearby table, but it's obvious they're written in a language beyond your comprehension.  Whoever wrote them either did so in a different tongue or a magical language that would take years to decipher.  A thick curtain walls this chamber off from the eastern warrens' main hall, to the north.  To the west, there is a thinner, gauzy sheet hanging from an opening in the rock - likely leading to a similar room.");
//		text1 = "North";
//		choice1 = 11144;
//		text6 = "West";
//		choice6 = 11146;
		MainScreen.addButton(0, "North", dungeonEnterRoom, DUNGEON_WITCH_EAST_WARRENS_EAST);
		MainScreen.addButton(5, "West", dungeonEnterRoom, DUNGEON_WITCH_CUM_WITCH_OFFICE);
	}
	if(dungeonLoc == DUNGEON_WITCH_CUM_WITCH_OFFICE) {
		MainScreen.clearText();
		MainScreen.text("<b><u>Eastern Warrens West Portion South Side (Cum Witch's Office)</u></b>\n");
		if (flags[FlagEnum.SAND_WITCHES_FRIENDLY] > 0) {
			//{SAND WITCHES NOW FRIENDLY}
			MainScreen.text("The cum witch is here, pounding away at one of her sister's cunts, like usual.  She seems to CONSTANTLY excrete her jism into her partner's many cunt-folds, but as her passion and speed rises, the flow thickens, eventually filling the poor milk-witch's wombs entirely.  They go at it like animals for a few seconds more, then separate after a climactic orgasm that leaves a puddle of spooge inches deep on part of the uneven floor.  The cum-witch moves her insensate sister to rest on a nearby bench before putting on her hat and robes.  She winks at you and offers, \"<i>Well, I hope you enjoyed the show, interloper.  Did you come here for some of my gift, or something else?</i>\"");
			//{VOLUNTEER FOR SERVICE: BAD-END, BLESSING: +CUM PRODUCTION}
			if (flags[FlagEnum.BEEN_BLESSED_BY_CUM_WITCH] == 0) {
//				text3 = "Blessing";
//				choice3 = friendlyCumWitchBlessing;
				MainScreen.addButton(2, "Blessing", friendlyCumWitchBlessing);
			}
		}
		else {
			//{CUM WITCH UNDEFEATED}
			if (flags[FlagEnum.CUM_WITCH_DEFEATED] == 0) {
				MainScreen.text("The curtain pulls to the side easily, and as soon as you enter, you're greeted by the sound of flesh slapping on flesh from somewhere to your left.  Briefly, you note a number of desks as you turn towards the sexual audio, but what really catches your eyes are the two girls locked in coitus.  One, a normal-looking sand witch, is bent over a bench and taking quite the fucking.  Milk drips in huge beads from her four fat teats while fresh rivulets of cum run down past the dried-cum on her thighs.  Above her is something else entirely, a taller woman with a single pair of obscenely large breasts.  She's so dark skinned that at first you have difficulty picking out her features in the dim lighting.  Glittering sweat runs down her form, dripping from her pendulous breasts as she throws back her head and moans, \"<i>Gonna... just... take it!  Take my gift!</i>\"");
				MainScreen.text("\n\nBeneath the ebony woman, you see the sand witch begin to quiver and moan, thick gouts of semen back-flooding from her packed cunny as her belly rounds with delicious fecundity.  Her muscles lock, then twitch feebly for a few seconds before she slides off into the new-born cum-puddle, slipping along the floor in an insensate pile of orgasmic bliss.  You're so enraptured by the sight, that you don't even try to hide when the ebony futanari turns to face you, putting on a pointed, wide-brimmed hat and black robe.  For the slightest second you see a pair of orange-sized balls and one thick, cum-lubed member, but those quickly disappear into the voluminous robes.");
				MainScreen.text("\n\n\"<i>Well now, surely you aren't one of the witches here to receive my seed,</i>\" the odd witch muses, \"<i>I'm afraid you must be an interloper then.  Pity, ");
				if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("but then, maybe you can come to serve us as a mother.  Our tribe is not wasteful.");
				else if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("but perhaps, once you have been disabused of your notions of freedom, you could serve as my loyal cum-pump.  It does get so tiring inseminating all these girls alone.");
				else MainScreen.text("but then, perhaps you could be made to serve in other ways.");
				MainScreen.text("</i>\"");
				
				MainScreen.text("\n\nThe soot-skinned futanari delicately opens one of her palms and murmurs an unintelligible word. Before your eyes, flickers of light flash into existence and align themselves vertically, slowly sliding together like pieces of a flawless crystal jigsaw puzzle.  The glimmering phantasmal luminance slowly fades as all the pieces come together, leaving a flawless ivory staff in the woman's hand.  She slams the base into the ground, sending ripples of magical force through the many pools of cum scattered around the room.  <b>It looks like you'll have to fight her!</b>");
				//{START CUM WITCH FIGHT}
				startCombat(new CumWitch());
				return;
			}
			//{CUM WITCH BEATEN}
			else {
				MainScreen.text("This room is absolutely, unequivocally inundated with the scent of spunk.  Sure, you note there's a few grates built into the floor to drain off most of it, but it hasn't stopped a number of huge puddles from building up all over this room, likely the result of the two semi-conscious women in this room.  One, a recently-bred sand witch got the fucking of her life from the other, a cum witch.  Both are front-down in jizz, their abused bodies quivering and weak.  The cum witch had tried to fight you, but she was no match for your superior technique.");
				//Lust:
				if (player.lust >= 33) {
					MainScreen.text("\n\nYou could probably pull the cum witch up and sate yourself on her, if you wanted.  She doesn't seem in any shape to resist.");
					//lust win menu.
//					text3 = "Sex";
//					choice3 = cumWitchDefeated;
					MainScreen.addButton(2, "Sex", cumWitchDefeated);
				}
			}
		}
//		text2 = "East";
//		choice2 = 11145;
		MainScreen.addButton(1, "East", dungeonEnterRoom, DUNGEON_WITCH_CUM_WITCH_BEDROOM);
	}
	if(dungeonLoc == DUNGEON_WITCH_SACRIFICIAL_ALTAR) {
		MainScreen.clearText();
		MainScreen.text("<b><u>Sacrificial Altar</u></b>\n");
		MainScreen.text("This chamber clearly holds some kind of important significance to the witch coven.  The floor and walls are covered in shining white, reflective tiles, and a large number of carved jugs ring the outer edge of the room.  The entire place smells faintly of milk.  Sniffing, you close in on the source of the aroma.  It's emanating from what looks like a golden well, positioned dead-center before you.  The various containers also smell faintly of the alabaster treat, and oddly, you can't catch even a single whiff of spoilage; it all smells fresh.  There must be some magic at work.  Peeping over the edge of the well, you can barely make out what seems like a sea of milk stored below: white-capped ivory waves sloshing around in a chamber so large you can't see the walls of it.  It must be preserved through magic.\n\nThere is a doorway to the south and one on the north wall.");
//		text1 = "North";
//		choice1 = 11148;
//		text7 = "South";
//		choice7 = 11134;
		MainScreen.addButton(0, "North", dungeonEnterRoom, DUNGEON_WITCH_THRONE_ROOM);
		MainScreen.addButton(6, "South", dungeonEnterRoom, DUNGEON_WITCH_CAVERNOUS_COMMONS);
	}
	if(dungeonLoc == DUNGEON_WITCH_THRONE_ROOM) {
		MainScreen.clearText();
		MainScreen.text("<b><u>Sand Mother's Throne</u></b>\n");
		MainScreen.text("This chamber is lit by swirling vortexes of magical colors, each hue dancing around another in coordinated motions.  The walls are made of hewn sandstone inlaid with ivory engravings that appear to depict what must be flowing milk.  Ahead there is a huge, white throne, also made from ivory.  It is a magnificent piece of craftsmanship.  Clearly, you have found the leader's throne room.  There is a robed figure atop it.");
//		text3 = "Approach";
//		choice3 = sandMotherStuffGOA;
//		text7 = "South";
//		choice7 = 11147;
		MainScreen.addButton(2, "Approach", sandMotherStuffGOA);
		MainScreen.addButton(6, "South", dungeonEnterRoom, DUNGEON_WITCH_SACRIFICIAL_ALTAR);
	}
	MainScreen.addButton(8, "Items", inventory.inventoryMenu);
	MainScreen.addButton(9, "Masturbate", masturbation.masturbateMenu);
	//Display menu
//	choices(text1,choice1,text2,choice2,text3,choice3,text4,choice4,text5,choice5,text6,choice6,text7,choice7,text8,choice8,"Items",itemMenu,"Masturbate",masturbateMenu);
}

public enterFactory():void {
	MainScreen.clearText();
	if (player.statusAffects.has("FactoryOverload")) {
		MainScreen.text("Rounding a bend in the mountainous foothills, you stumble upon a large, rusted and eerily silent iron structure with a number of tall gray smokestacks.  A bevy of green-tinged copper pipes stem from the rear of the building, climbing up the steep mountainside toward a jagged hole in its face.  Most of these are cracked open along their seams and both the pipes and mountainside are glazed with pink tinted runoff.\n\nThere are no windows to the hellish factory, with only a single iron door adorning the front wall.\n\nDo you enter the factory or leave?");
	}
	else if (player.statusAffects.has("DungeonShutDown")) {
		MainScreen.text("Rounding a bend in the mountainous foothills, you stumble upon a large, rusted and eerily silent iron structure with a number of tall gray smokestacks.  A bevy of green-tinged copper pipes stem from the rear of the building, climbing up the steep mountainside and disappearing into a hole in its face.\n\nThere are no windows to the hellish factory, with only a single iron door adorning the front wall.\n\nDo you enter the factory or leave?");
	}
	else {
		MainScreen.text("Rounding a bend in the mountainous foothills, you stumble upon a large and rusted iron structure belching cloying pink smoke from its tall smokestacks.  A bevy of green-tinged copper pipes stem from the rear of the building, climbing up the steep mountainside and disappearing into a hole in its face.  It must be some kind of demonic factory, though you've no idea what they could be pumping out.  High atop the roof, you spy a huge water tower fed by smaller pipes that run down the building's side and off in the direction of the lake.\n\nThere are no windows to the hellish factory, with only a single iron door adorning the front wall.  If you go inside there will undoubtedly be many demons to fight and little chance to escape. Death or worse awaits should you fall into their hands.\n\nDo you enter the factory or leave?");
		if (player.findStatusAffect(StatusAffects.FoundFactory) < 0) {
			MainScreen.text("\n\n<b>The factory is now accessable from the 'Dungeons' submenu inside 'Places' menu.</b>");
			player.statusAffects.add(new StatusAffect("FoundFactory", 0, 0, 0, 0)));
		}
	}
	simpleChoices("Enter", actuallyEnterFactory, "", null, "", null, "", null, "Leave", camp.returnToCampUseOneHour);
}

private dungeonEnterRoom(room: number):void {
	dungeonLoc = room;
	playerMenu();
}

private actuallyEnterFactory():void {
//	inDungeon = true;
	dungeonLoc = DUNGEON_FACTORY_FOYER;
	playerMenu();
}

public leaveFactory():void {
//	inDungeon = false;
	dungeonLoc = 0;
	MainScreen.clearText();
	MainScreen.text("You slip out the door and disappear, heading back towards your camp, leaving the hellish factory behind.");
	doNext(camp.returnToCampUseOneHour);
}

public factoryShutdown():void {
	MainScreen.clearText();
	MainScreen.text("You resolve to shut down the factory, then destroy the controls.  You spend a few moments making sure you aren't about to do something disastrous.  A few deep breaths calm your nerves, letting you focus on pressing the correct buttons.  The constant thrumming of the machinery slowly dies down, closely followed by a chorus of disappointed moans.  You step over to the window and watch as the captives come out of their drug induced sex-comas.  A great deal of them gather up and leave, though you are unsure what their destination is.  A few seem to be gathering back around the equipment, and puzzling out how to operate it.  Maybe they liked being here..."); 
	doNext(playerMenu);
	player.statusAffects.add(new StatusAffect("DungeonShutDown", 0, 0, 0, 0)));
}

public factoryOverload():void {
	MainScreen.clearText();
	MainScreen.text("You resolve to shut down the factory by overloading the storage tanks, rendering much of the equipment inoperable and difficult to repair.  With a quick twist of a knob, you override the pressure vents for the storage tanks.  Within minutes, you hear the sounds of popping rivets and straining pumps.  You look out over the factory floor and watch as many of the pipes fracture, dripping seed over the moaning captives.  Smoke rises from pumps as they short out and overheat.  The entire building shudders as a massive blast echoes from somewhere to the west.  A high pitched whine fills the building as the last motors shriek and die.  The captives slowly start to come to as the flood of drugs and artificial pleasure come to a stop.  Many break down and cry, others begin unhooking themselves and exploring their surroundings.  You watch with interest as many of them rally together and make for an exit.   The remaining survivors begin scavenging parts from the machinery and puzzling out how to use it.  Perhaps they liked it here.");
	doNext(playerMenu);
	player.statusAffects.add(new StatusAffect("DungeonShutDown", 0, 0, 0, 0)));
	player.statusAffects.add(new StatusAffect("FactoryOverload", 0, 0, 0, 0)));
}

private relieveTension():void {
	MainScreen.clearText();
	//First time...
	if (player.findStatusAffect(StatusAffects.TensionReleased) < 0) {
		MainScreen.text("You nod and step forwards, allowing her to hook up a modified harness and inject you with the demonic concoction.  In no time heat boils through your veins, pooling on your chest and crotch.  ");
		if (player.upperBody.chest.BreastRatingLargest[0].breastRating < 10) {
			player.growTits(1, (2 + rand(3)), true, 1);
			MainScreen.text("  ");
		}
		MainScreen.text("You glance over to the pile of glistening entwined bodies as they writhe in pleasure, and find yourself drawn in to the mass.  You spend the next four hours suckling tainted breast milk, fucking gaping pussies, and doing your damnedest to milk as much cum from the dick-girls around you.  Eventually the drugs work their way out of your system, leaving you to recover on the floor.  Cum, milk, and sweat drip from your nude form as you try to clean up and get dressed.");
		player.orgasm();
		dynStats("int", -2, "lib", 4, "cor", 4);
		player.slimeFeed();
		player.statusAffects.add(new StatusAffect("TensionReleased", 0, 0, 0, 0)));
	}
	//Second/third times...
	else {
		//[[2nd time]] 
		if (player.statusAffects.get("TensionReleased").value1 == 0) {
			MainScreen.text("You eagerly put on the modified harness and let them inject you with more of those body-altering chemicals.  As they fill you with artificial lust and desire, you cry out and beg for more.  They oblige you and give you a larger dose than the first time.  ");
			//Grow dick!
			if (player.lowerBody.cockSpot.count() > 0) {
				player.lengthChange(player.increaseCock(0, 5), player.lowerBody.cockSpot.count());
				if (player.averageCockLength() >= 9 && player.averageCockThickness() < 2) {
					MainScreen.text("You feel yourself gain in thickness as well, to match your new length.  ");
					temp = player.lowerBody.cockSpot.count();
					while(temp > 0) {
						temp--;
						if(player.lowerBody.cockSpot.list[temp].cockThickness < 2) player.lowerBody.cockSpot.list[temp].cockThickness++;
					}
				}
				else if(player.averageCockLength() >= 15 && player.averageCockThickness() < 3) {
					MainScreen.text("You feel yourself gain in thickness as well, to match your new length.  ");
					temp = player.lowerBody.cockSpot.count();
					while (temp > 0) {
						temp--;
						if (player.lowerBody.cockSpot.list[temp].cockThickness < 3) player.lowerBody.cockSpot.list[temp].cockThickness++;
					}
				}
			}
			//Grow chest
			//(If player has 0 bewbs)
			if (player.upperBody.chest.count() == 0) {
				player.createBreastRow();
				MainScreen.text("Your chest tingles, revealing a pair of pink nipples on your new mammory glands.  ");
			}
			player.growTits(1, (2 + rand(3)), true, 1);
			MainScreen.text("  ");
			MainScreen.text("Your " + nippleDescript(0) + "s ");
			if (player.lowerBody.cockSpot.count() > 0) MainScreen.text("and " + player.multiCockDescript());
			MainScreen.text(" become rock hard, leaking fluids constantly.  ");
			//MALE
			if (player.lowerBody.cockSpot.count() > 0 && player.lowerBody.vaginaSpot.count() == 0) MainScreen.text("Glancing over into the sea of sex, you find yourself drawn to the nearest pussy, as if it was the only thing in the world to matter.  You lose track of the time as you fuck hard dozens of gaping cunts, each of them overflowing with cum from all the participants in this infernal orgy.  ");
			//FEMALE
			if (player.lowerBody.vaginaSpot.count() > 0 && player.lowerBody.cockSpot.count() == 0) {
				MainScreen.text("As you enter the sex-crazed crowd, you notice several \"girls\" with demonic cocks bloated by the use of drugs, getting drawn to you by the scent of your dripping wet " + vaginaDescript(0) + ". Sitting on the floor, you spread your legs wide, facing the nearest one with an inviting lewd moan, while you hungrily grab another cum-covered cock, (one that just finished filling up an obscenely wide gaping vagina), to suck it.  You are soon penetrated and fucked hard and deep, one huge infernal dick after another, as they all cum into you in turn. ");
				player.cuntChange(150, true);
			}
			//HERM
			if (player.lowerBody.vaginaSpot.count() > 0 && player.lowerBody.cockSpot.count() > 0) MainScreen.text("You feel your " + player.multiCockDescript() + " getting milked by many wet holes, though you are too busy sucking cocks and moaning in ecstasy to notice who they belong to.  ");
			MainScreen.text("The next eight hours are lost to your desires as you cum over and over, feeling mind-shattering pleasure.  You recover a while on the floor, soaked with a mixture of milk, cum, and pussy-juice.  Getting dressed is a bit troublesome with the recent changes, but you manage to squeeze back into your " + player.armorName + ".  You walk away while still feeling horny, and the moaning of the girls behind you doesn't help.  Maybe you could stay for another round...");
			player.orgasm();
			dynStats("int", -2, "lib", 4, "cor", 4);
			player.statusAffects.add(new StatusAffect("TensionReleased", 0, 0, 0, 0)));
			player.statusAffects.get("TensionReleased").value1 = 1;
			player.slimeFeed();
		}
		//Third time
		else {
			MainScreen.text("Desperate for more of the demon-drugs, you slide into the now-familiar harness and let the needles sink into your skin.   Panting in lust, you beg for them to increase the dosage again.   Desire burns through your veins as the cocktail surges through them");
			if (player.lowerBody.cockSpot.count() > 0) {
				MainScreen.text(", filling your " + player.multiCockDescriptLight());
				MainScreen.text(" with sensation");
				if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("s");
				MainScreen.text(" as ", false);
				if (player.lowerBody.cockSpot.count() > 1)
					MainScreen.text("they");
				else MainScreen.text("it", false);
				MainScreen.text(" grow", false);
				if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("s");
				MainScreen.text(" massive and engorged.  ");
			}
			else MainScreen.text(".  ");
			MainScreen.text("Your " + nippleDescript(0) + "s throb, becoming hard, puffy, and starting to dribble milk.  ");
			if (player.lowerBody.vaginaSpot.count() > 0) MainScreen.text("Your pussy is instantaneously soaked, filling the air with the scent of sex.  ");
			MainScreen.text("The desire for more of the drugs battles with your need to fuck and be fucked, until a small functioning part of your brain realizes it'll be easier to get sex than to get more of the drug.  You pull free and throw yourself into the mass of sweaty bodies, losing yourself in the salty tang of sweat and sex, pleasing nipples, clits, and cocks with your hands, and giving and receiving as much pleasure as you can.  You're in heaven.  Vaguely you realize time is passing, but it is a secondary concern next to the idea of having another groin-soaking orgasm.   You fuck and suck until you pass out from delirium.\n\n");
			//GAME OVERZZ
			MainScreen.text("In time you wake, your body aching both from the exertion and a desire for more.  On one hand you had a mission here, but why fight and struggle with danger and loneliness when you could be high on sex and cumming near-constantly?  You cuddle up to an exhausted girl and decide to wait for the drug-mistresses to give you another turn in the pile.  One of them turns, as if noticing your train of thought, and wheels over a breast-pump.  She hooks it up to your still-leaking nipples and you moo with happiness.  She grins, promising another dose to you if you are a good cow for her.");
			gameOver();
			return;
		}
	}
	doNext(playerMenu);
}

public factoryFinisher():void {
	MainScreen.clearText();
	MainScreen.text("You crack your sleep-fuzzed eyes, blinking at the sudden light as you try to get your bearings and remember where you are.  A nearby voice is moaning like a bitch in heat, or a drunk slut.  You giggle a bit at the thought as you work at focusing your eyes.  You feel warm and happy, particularly in your chest and groin.  The cobwebs of sleep clear from your mind with agonizing slowness, but you find it hard to worry about with how warm and wonderful you feel.  It's almost like hot wet mouths are latched onto your crotch and breasts, licking and sucking in perfect rhythm.  ", false);
	if(player.lowerBody.cockSpot.count() == 0 || player.upperBody.chest.BreastRatingLargest[0].breastRating <= 1) {
		MainScreen.text("A small inner voice pipes up to remind you that you don't have ", false);
		if(player.lowerBody.cockSpot.count() == 0) {
			MainScreen.text("anything in your groin to suck on", false);
			if(player.upperBody.chest.BreastRatingLargest[0].breastRating <= 1) MainScreen.text(" or ", false);
		}
		if(player.upperBody.chest.BreastRatingLargest[0].breastRating <= 1) MainScreen.text("any adornments on your chest", false);
		MainScreen.text(".  That voice trails off as that feeling of perfect pleasure and rightness sweeps it away with the last remnants of sleep.\n\n", false);
	}
	else MainScreen.text("A small inner voice tries to warn you of something, only to be swept away in the feelings of perfect pleasure and rightness that wash away the last remnants of your sleep.\n\n", false);
	MainScreen.text("You realize that the moaning voice is your own, and find that the thought just turns you on more.\n\n", false);
	MainScreen.text("'<i>You're such a horny slut!</i>' echoes a voice in your head.  You want to nod and smile, but are prevented by something.  You realize you're strapped into some kind of chair and harness so securely that you can't even move.  Tiny soothing fingers massage your temples, rubbing away the fears that moments ago threatened to interrupt your pleasure.  You can see a ", false);
	if(player.totalBreasts() == 2) MainScreen.text("pair of ", false);
	else MainScreen.text("multitude of ", false);
	MainScreen.text(" clear hoses coming away from your cow-like chest udders.  ", false);
	if(player.biggestLactation() <= 1.5) MainScreen.text("Creamy white milk is flowing in a steady stream up the tubes and away from you.  ", false);
	else MainScreen.text("The hoses bulge obscenely as they struggle to keep up with the torrents of creamy-white milk you're producing.  ", false);  
	MainScreen.text("Even more wanton moans erupt from your disobedient lips now that you know what's going on.  You're not just a horny slut.  You're a horny cow-slut who's getting off on having her tits pumped.  The massage you're getting feels so good once you realize that.\n\n", false); 
	MainScreen.text("A snap echoes through the pumping room, nearly drowned out by the moans of the other milk-sluts around you.  You look around as you realize the band to restrain your head has been unlatched.  You take advantage of your newfound freedom and look around.  Rows and rows of other girls are there, just like you.  Almost all of them have bigger tits and fuller milk-tubes.  In addition, they all have enormous members that would drag on the floor were it not for the gigantic tubes encapsulating each and every one.  ", false);
	MainScreen.text("The girl next to you squirms and cums, wriggling inside her harness as waves of sticky goop are pumped down her cock-tube into a floor-socket.  She just keeps going and going, making you wonder how she can make so much of the stuff.  As the sight excites you, the pleasure in your own crotch redoubles.  Looking down thanks to your newfound freedom, you see your own giant encapsulated member; though not as large as your neighbor's, it still looks and feels wonderful.\n\n", false); 
	MainScreen.text("The lining of the tube squeezes and massages your trapped prick expertly, even as those hands continue to work on your mind.  Some part of you suspects that your thoughts are being manipulated, but the carnal pleasure you are experiencing is so amazing that you have no intention of resisting. If being a cumslut for your sexy demonic masters is what it takes, so be it. Cramming a massive demon-cock in your throat, getting a few others up your holes to keep you pregnant all the time, and being their busty hermaphrodite breeding tool would be your joy and privilege.  ", false);
	if(player.statusAffects.has("CampMarble")) {
		MainScreen.text("As if reading your thoughts, the hands stop massaging, and their owner snaps their fingers. You see Marble step in front of you, wearing an odd set of pink panties with a dick-like protrusion sticking out the front of them.  At the command of the figure behind you, she presents the panty-cock to you.  Happy to be of service, you spread your jaws and engulf as much of the great penis-like thing as you can, while the figure behind you moves around and takes Marble in the ass.  You continue to suck on the pink flesh until you feel it pour some kind of unholy load into your stomach.  Gurgling in pleasure, you start cumming yourself, all the while appeasing your demonic masters by servicing your once lover.\n\n", false);
	}
	else MainScreen.text("As if reading your thoughts, the hands stop massaging, and their owner comes in front of you, presenting you with a meaty, throbbing cock.  Happy to be of service, you spread your jaws and engulf as much of the great penis as you can, until you feel it pouring his unholy load into your stomach.  Gurgling in pleasure, you start cumming yourself, all the while attending to one or more of your demonic masters.\n\n", false);
	
	
	MainScreen.text("<b>This kind of treatment continues for a few days, until sucking, fucking and getting fucked is the only thing you desire. As your mind is now broken, injections are no longer necessary to keep you in a perfect pleasure state. After a month, they even untie you, since you are now their complete cum-puppet, eager only to please and obey.</b>", false);
	//The style on this part wasn't up to par with the rest, so I rewrote some of it, while keeping the meaning
	gameOver();
}

private succubusTalkOne():void {
	spriteSelect(55);
	MainScreen.clearText();
	MainScreen.text("\"<i>I suppose I really should thank you for coming down all by your lonesome.  The boss is gonna be sooo happy we found you.  Just think, in an hour or two we can get you strapped in and working with the others,</i>\"  says the secretarial succubus as she saunters over, still sipping her coffee, \"<i>You're so cute!  I tell you what, if you agree to come with me, I'll, like, make sure the experience is pleasurable.</i>\"\n\n");
	MainScreen.text("She runs a stocking covered foot up your leg and thigh, almost to your groin.  Giggling, the succubus pulls it away and asks, \"<i>So are you ready and willing?</i>\"");
	simpleChoices("For what?", succubusTalkTwo, "Yes", succubusBadEnd, "No", succubusRefuseOffer, "", null, "", null);
}

private succubusTalkTwo():void {
	spriteSelect(55);
	MainScreen.clearText();
	MainScreen.text("The succubus looks at you with a bemused expression, \"<i>You haven't figured it out yet?  Really?  What do you think we make at this factory, bubble-gum?</i>\" she asks with a cruel smile, \"<i>We take human and once-human champions like you, pump you full of aphrodisiacs, body-altering drugs, and corrupting agents, and then milk you of your tainted fluids continually for the rest of your life!  And don't even start to ask why, I'll tell you – there are still pockets of purity out there that repel cute demons like me.  So the best way to deal with those is just to release a river of drug-filled sex-juice at them.  By the time the area dries off, the locals welcome us with open arms... and spread legs.</i>\"");
	simpleChoices("Sick!", succubusRefuseOffer, "Sounds Fun", succubusBadEnd, "", null, "", null, "", null);
}

private succubusCombatStart():void {
	spriteSelect(55);
	player.statusAffects.add(new StatusAffect("FactorySuccubusDefeated", 0, 0, 0, 0)));
	startCombat(new SecretarialSuccubus(), true); //Won't matter if you lose
}

private succubusRefuseOffer():void {
	spriteSelect(55);
	MainScreen.clearText();
	MainScreen.text("She frowns, \"<i>I was secretly hoping you would say that... I'm going to make you beg me to hook you into the machines.  Just wait.</i>\"");
	doNext(succubusCombatStart);
}

public secretarialSuccubusInsult():void {
	MainScreen.clearText();
	MainScreen.text("You laugh mockingly at the stupid demon, roaring, \"<i>I'm the bloody champion you vapid cunt!</i>\"\n\nShe whirls, her beautiful face marred by rage.  It looks like you have a fight on your hands...");
	//(START FIGHT – Succubus Defense -10)
	succubusCombatStart();
	monster.armorDef -= 10;
}

private succubusBadEnd():void {
	spriteSelect(55);
	MainScreen.clearText();
	MainScreen.text("The blue skinned seductress steps forward and wraps her arms around you, pulling your head down and crushing it into her heavenly breasts as she speaks, \"<i>My my, aren't you the kinky little play-toy.  Let's get you hooked up.</i>\"\n\n");
	MainScreen.text("She catches you off-guard, lifting your feet off the ground.  You realize she has somehow grown taller.  You stretch to see what's going on, but have no leverage to pry your face from the smooth globes of flesh that smother you.   Vaguely, the click-clack of heels reaches you through the walls of flesh.  You're being moved deeper into the facility.   A creaky door opens, allowing you to hear the loud humming of machinery, mixed with what sounds like desperate sexual moans.\n\n");
	MainScreen.text("Abruptly you are pulled free from the succubus' fleshy prison and bodily thrown into padded restraints.  Blinded by the sudden onslaught of light, you blink away tears as restraints are placed securely around your wrists.  Warm lips press against your own as a foreign tongue penetrates your lips, mouth-raping you.  It tastes of sweet exotic spices, like nothing you've ever had before.   Helpless to do anything but return the kiss, you respond, sliding your tongue along the slippery sweetness of your captor's.  You risk opening your eyes and see your inhuman captor to be enjoying the kiss every bit as much as you.");
	doNext(succubusBadEndPartTwo);
}

private succubusBadEndPartTwo():void {
	spriteSelect(55);
	MainScreen.clearText();
	MainScreen.text("In no time flat your blood begins to burn hot with the fires of unnatural lust.  "); //Arousal
	if (player.biggestLactation() < 1) { //Tits – regular
		MainScreen.text("Your " + nippleDescript(0) + "s begin prodding painfully against your " + player.armorName + ", every touch serving to make them harder and more erect.  ");
	}
	else if (player.biggestLactation() < 3) { //Tits – lactating
		MainScreen.text("Your " + nippleDescript(0) + "s get painfully hard as you feel milk begin backing up inside your " + allBreastsDescript() + ".   The succubus glances down mischieviously as her hands begin to grope you through your " + player.armorName + ", squeezing out a few drops of milk.  ");
	}
	else { //Tits – megalactating
		MainScreen.text("Your " + nippleDescript(0) + "s get painfully hard as milk begins drooling down your over-productive chest, making your " + player.armorName + " slide across your leaky milk-spouts in an agonizingly pleasurable way.  "); 
	}
	if (player.lowerBody.cockSpot.count() == 1) { //Cock – single
		if (player.cockArea(0) < 30) {
			MainScreen.text("Swooning from sudden blood loss, you struggle to maintain the kiss as your body takes your " + cockDescript(0) + " to full hardness in seconds.  ");
		}
		else if (player.cockArea(0) < 100) { //Cock – single big
			MainScreen.text("Nearly blacking out, you struggle to stay awake as your body shifts your blood to your disproportionate " + Appearance.cockNoun(CockType.HUMAN) + ".  ");
		}
		else MainScreen.text("As you struggle not to lose consciousness, you realize your over-aroused body had pumped most of your blood to your over-sized " + Appearance.cockNoun(CockType.HUMAN) + ", which now droops to the floor, pulsing hotly.  "); //Cock -megahuge
	}
	//DO MULTIZ
	if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("The feeling of light-headedness nearly robs you of consciousness as your " + player.multiCockDescript() + " fill with blood, pulsating with arousal as they reach full size.  ");
	if (player.lowerBody.vaginaSpot.count() > 0) { //Vagooooz
		if (player.lowerBody.vaginaSpot.list[0].clitLength >= 4.5) { //'uge clit
			MainScreen.text("Popping from between your thighs, your " + clitDescript() + " responds to the sheer hotness of the situation by making itself known.   You squeeze your legs tightly together, hungry for additional sensation.  ");
		}
		else if (player.lowerBody.vaginaSpot.list[0].clitLength > 1) { //big clit
			MainScreen.text("A wave of pleasure erupts from between your legs as your " + clitDescript() + " pops free.    You squeeze your legs tightly together, hungry for the additional sensations.  ");
		}
		else if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS.SLICK) { //slick
			MainScreen.text("Squishing wetly, your bottoms become soggy with the flood of fluids leaking from your " + vaginaDescript(0) + ".   Your legs spread apart on their own, begging for any kind of intrusion.  ");
		}
		else MainScreen.text("Groaning softly, you feel yourself getting wetter and wetter with arousal.  You wish your sticky bottoms were off so you could let something into your " + vaginaDescript(0) + ".  "); //normal
	}
	MainScreen.text("\n\n"); //New PG
	MainScreen.text("No longer caring about modesty, etiquette, or even your own safety, you squirm against your bindings, lewdly putting on a display for your captor as you suck her tongue as if your life depended on it.   She breaks the kiss with a smile, \"<i>I told you I'd make sure it was pleasurable.  Now you sit tight while I get you hooked up, and we'll have you cumming what's left of your brains out in no time,</i>\" she promises.\n\n");
	MainScreen.text("The succubus pushes a button on the wall, and a number of strange looking suction tubes and hoses drop down from above you.   Moving with practiced efficiency, she hooks a ");
	if (player.upperBody.chest.count() == 1)
		MainScreen.text("pair of");
	else MainScreen.text("number of");
	MainScreen.text(" hoses to your breasts, ");
	if (player.lowerBody.cockSpot.count() == 0) {
		if (player.lowerBody.vaginaSpot.count() > 0)
			MainScreen.text("and a vacuum pump to your clit.  ");
		else {
			MainScreen.text("and another vacuum pump to your bare groin.  In seconds a wet fleshy growth erupts.  You have grown a cock!  ");
			player.lowerBody.cockSpot.add(new Cock());
		}
	}
	else if (player.lowerBody.vaginaSpot.count() > 0)
		MainScreen.text("a vacuum pump to your clit, and a pump many times bigger than your " + cockDescript(0) + " to it.  ");
	else MainScreen.text("and a pump many times bigger than your " + cockDescript(0) + " to it.  ");
	MainScreen.text("At first there is only a gentle suction, you assume in order to keep them in place.  Unfinished, your captor places something large and hollow against your backdoor");
	if (player.lowerBody.vaginaSpot.count() == 0)
		MainScreen.text(".");
	else MainScreen.text(" and an ever larger dildo against your " + vaginaDescript(0) + ".  It seems to pulse and wiggle with a life of its own, rubbing the bumps of its lumpy head against your lips.");
	MainScreen.text("  You swoon as you hear the solid click of a button being pushed, and all at once all devices attached to you leap to life.");
	doNext(succubusBadEndPartThree);
}

private succubusBadEndPartThree():void {
	spriteSelect(55);
	MainScreen.clearText();
	MainScreen.text("The beautiful seductress that bound you giggles and says, \"<i>Oh it only gets better baby,</i>\" as she pushes another button.  You see a number of needles lower from the equipment above.  Two pause at chest height.  Faded parchment labels on the tubes mark them as \"Gro+\".  You spot the same markings on at least some of the hoses gathering around your groin.  A few are marked with different labels, but you cannot make out the demonic script.  As one, the hoses rear back, then plunge forward, burying themselves into your supple flesh and injecting their drugged payload into your body.  It hurts at first, but the drugs fog your mind, blocking the pain with pulsing waves of desire.   You begin cumming as your body erupts with artificial pleasure.\n\n"); 
	//Nipples
	MainScreen.text("The suction pulls squirt after squirt of milk from your breasts as your " + allBreastsDescript() + " start to grow, swelling heavier as they enlarge to produce more milk.  You squeal with delight as your nipples turn black, tainted by corruptive chemicals that are slowly dripped into you.  ");
	//Dick  
	if (player.lowerBody.cockSpot.count() > 0) {
		MainScreen.text("The vacuum-pump on your cock noisily sucks down all your spoo, ");
		//High cum variant
		if (player.cumQ() > 300)
			MainScreen.text("struggling with the amount you put off.  Grinning, the succubus reaches over and flips a lever.  You feel the suction increase as the machine is turned up to accommodate your altered physique.  ");
		//else
		else MainScreen.text("the suction and drugs make it so easy to just keep cumming and cumming.  ");
		//either or:
		MainScreen.text("Dimly, you feel a needle lodged in your taint, pumping your prostate full of something.  Your " + cockDescript(0) + " begins growing mid-orgasm, the skin turning a deep purple even as small nodule-like bumps form all over it, rapidly becoming a bloated parody of its demonic counterparts.  ");
	}
	//Puss Orgasmz
	if (player.lowerBody.vaginaSpot.count() > 0) MainScreen.text("Clenching tightly, your " + vaginaDescript(0) + " squeezes tightly on its intruder as its repeatedly violated by the machines.  ");
	//End
	MainScreen.text("\n\nThe world around you disappears, leaving you alone with the drug-enhanced sensations assaulting your body.  In truth, you don't want it to end.  You find yourself wishing it would never end, and no doubt the equipment you're hooked in to will see to that.\n\n");
	if (player.statusAffects.get("$1").value3 == 1) {
		MainScreen.text("Later on, you are briefly pulled out of your reverie by a familiar warm fluid flowing down your throat.  You come to your senses and see Marble looking down at you with an odd expression on her face.  ");
		MainScreen.text("She seems to be in a state of bliss. Looking down, you see that she is wearing some kind of pair of pink panties.  Marble gasps and the surface of the panties ripples; it's a living thing!\n\nYou look around and realize you aren't alone.  ");
	}
	else if (player.statusAffects.has("CampMarble")) {
		MainScreen.text("You are given a brief moment of clarity as you see Marble standing in front of you.  ");
		MainScreen.text("She seems to be in a state of bliss. Looking down, you see that she is wearing some kind of pair of pink panties.  Marble gasps and the surface of the panties ripples; it's a living thing!\n\nYou look around and realize you aren't alone.  ");
	}
	else MainScreen.text("Later on, in a moment of clarity, you look around and realize you aren't alone.  ");		
	MainScreen.text("In rows alongside you are a large number of other captives, every single one endowed with freakishly sized breasts, and nearly all gifted with throbbing demonic dicks.  Some small analytical part of you notes that the farther down the line they are, the older and larger they have become.   You look down and see your own massive tits, shiny tainted nipples still pumping out streams of milk.  The huge throbbing demon-cock between your legs begins to get hard as the machines crank back up, filling you full of happy horniness.");
	if (player.statusAffects.get("$1").value3 == 1 || player.statusAffects.has("CampMarble")) MainScreen.text("  With Marble here too, you'll be around for a long time.");
	gameOver();
}

public succubusLossRape():void {
	spriteSelect(55);
	MainScreen.clearText();
	if(player.lowerBody.cockSpot.count() > 0) {
		if(player.lust > 99) MainScreen.text("Driven half mad with lust, you drop to your knees. Your fingers fly over your body as you pry off every last piece of your " + player.armorName + ", displaying just how hard your alluring opponent has gotten you.  The succubus saunters over, every sinuous step radiating the inhuman sexuality that pours off her skin like heat from a bonfire.\n\n", false);
		else MainScreen.text("Exhausted, you collapse before the succubus.  She effortlessly slices away your " + player.armorName + ", peeling your possessions away with practiced ease.  In moments you are stark naked and wholly exposed to your captor.  In spite of yourself, your body begins to respond to her sultry aura, displaying the hardness of your desire and shame immediately.\n\n", false);
		MainScreen.text("\"<i>Awww, did I get you all <b>HOT</b> and bothered?</i>\" She croons, poising a stocking clad foot above you as her high-heels seem to fade away.  Warm silk begins to press against your groin as slender toes curl around the head of your throbbing maleness, your foe having her way with your desire-saturated form.  You mewl pitifully at the sensation, your hips twitching involuntarily against her demonic sole. The slippery surface of her foot squeezes as she expertly strokes you with her foot, delighting in her complete dominance over your easily controlled member.\n\n", false);  
		//balls or pussy play
		if(player.lowerBody.balls > 0) {
			//[[balls]]
			if(player.lowerBody.ballSize < 6) MainScreen.text("Your sultry captor leans low over you, her luscious tits wobbling enticingly as she reaches down and caresses your " + ballsDescriptLight() + " with soft touches.  Almost immediately you feel them clench with boiling heat, growing heavy and churning with a load big enough to satisfy a thirsty succubus.", false); 
			//[[huge balls]]
			else MainScreen.text("Your sultry captor leans low, marveling at the size of your " + ballsDescriptLight() + " as she reaches down to caress them.  Her tits swing lewdly above you, bouncing in hypnotic motions. Her hands work gently, taking each one of your " + ballsDescriptLight() + " and hefting it gently.  Almost immediately you feel them fill with an unnatural heat that spreads everywhere her slender fingers touch.  They begin to feel full and heavy, practically sloshing as the pent up need inside you is channeled into liquid form.  \"So ripe... and full,\" she whispers to herself as she caresses them, her silken foot still sliding all over your " + cockDescript(0) + ", pumping stroke after stroke of pleasure into your lust-weakened form.", false);
		}
		else {
			//[[no balls no pussy]]
			if(player.lowerBody.vaginaSpot.count() == 0) MainScreen.text("Your sultry captor leans low over you, her luscious tits wobbling enticingly as she reaches down and caresses the skin between your " + cockDescript(0) + " and " + assholeDescript() + " with a slender finger.  Almost immediately you feel your groin clench with the boiling heat of a growing orgasm, thick cum churning out from your prostate as your body readies a load large enough to satisfy a thirsty succubus.", false);
			//[[no balls + pussy]]
			else MainScreen.text("Your sultry captor leans low over you, her luscious tits wobbling enticingly as she reaches down and caresses the slick skin of your slit with a single digit.  Other fingers circle your " + clitDescript() + ", teasing it from between the folds as it grows hard, peeking out from the hood and turning cherry-red.  Almost immediately you feel your groin clench with the boiling heat of a growing orgasm, thick cum churning in your prostate as your body readies a load large enough to satisfy a thirsty succubus.", false);
		}
		MainScreen.text("\n\n", false);
		//[[Cum]]
		MainScreen.text("The succubus licks her lips in anticipation as she curls her silk-clad toes tighter around you, making you bulge and twitch in obscene pleasure.  With a naughty smile, she caresses your ass with her bulbous demonic tail.  Before you can react, it plunges inside you, easily slipping through your " + assholeDescript() + " and pressing tightly against your prostate.  The suddenness pushes you over the edge, but she immediately wraps her fingers around you, pinching tightly, bottling your cum inside you.  You cry out in pain and surprise as your entire thick load is trapped inside you.  After nearly a full minute, your groin aches with the discomfort of it all.\n\n", false);
		//More cum paragraph.  HAHA! TINY BABY CUM! 
		MainScreen.text("She wastes no time, and caresses you again.  You instantly feel another surge of heat and desire as a fresh load of cum brews behind your first strangled orgasm.  You need to cum so bad, her foot still stroking and squeezing you full of perverted desire.  She slaps your ", false);
		if(player.lowerBody.balls > 0) MainScreen.text("balls", false);
		else MainScreen.text("ass", false);
		MainScreen.text(" as she releases your " + cockDescript(0) + ", shouting, \"<i>CUM!  Feed me!</i>\"  You are all too happy to oblige.  ", false);
		//[[normal volume]]
		if(player.cumQ() < 50) MainScreen.text("Freed at last, your body clenches tightly as it squirts the first jet of cum from your " + cockDescript(0) + ".  She smears her foot over the head, catching the cum and using it to lubricate her silken foot as it massages your member with merciless strokes, alternatively catching your spooge and milking more from your obedient maleness.  Your orgasm lasts many times longer than normal as your dual loads feed her demonic hunger.", false); 
		//[[big volume]]
		if(player.cumQ() >= 50 && player.cumQ() < 400) MainScreen.text("Freed at last, your body clenches tightly as it spurts a big glob of cum onto her waiting sole, soaking the bottom of her foot with slippery male-milk.  She smears her cum-covered foot over every inch of your " + cockDescript(0) + ", making each successive spurt bigger and messier than the last. Somehow she manages to catch more and more of your jizm over her foot, bathing you in cummy silkiness.  You groan helplessly as she milks more and more of from you till her foot is dripping steadily, your own groin and belly soaked with the stuff.  You give a few final exhausted squirts as she languidly rubs it into you.", false);
		//[[huge volume]]
		if(player.cumQ() > 400) MainScreen.text("Freed at last, your body clenches powerfully as a massive eruption of cum launches from your " + cockDescript(0) + " onto her waiting foot.  The succubus looks on incredulously as her entire foot is soaked with your sticky whiteness, forgetting to move as the second wave of cum drenches her to the ankle and rains down over your stomach.  She giggles and moves it back to your cock, massaging your slick spooge into your cock with her foot, wringing an even bigger explosion of cum from your tortured body.  Flopping back, she gets her other foot in on the action, milking you between her feet as you soak yourself completely with bigger and bigger eruptions until at last your orgasm begins to wane.  She slides forwards, rubbing against you and smearing the mess over herself with a blissful expression.", false);
		MainScreen.text("\n\n\"<i>Good boy,</i>\" she croons, mopping the cum up as it seems to wick into her stockings, \"<i>You'll do well once we get you on the line.</i>\"  You don't have time to ponder the significance of that as you lose consciousness.", false);
		//ONWARD TO BAD-END-IA!
		player.orgasm();
		doNext(factoryFinisher);
	}
	else {
		if(player.lust > 99) {
			MainScreen.text("Driven half mad with lust, you shake yourself free from the trappings of your " + player.armorName + ", first revealing your " + allBreastsDescript() + ", then " + hipDescript() + " and finally your ", false);
			if(player.lowerBody.vaginaSpot.count() > 0) MainScreen.text(vaginaDescript(0) + " as the last pieces fall away.\n\n", false);
			else MainScreen.text("bare groin as the last pieces fall away.\n\n", false);
		}
		//(HP loss)
		else MainScreen.text("You realize you're wobbling unsteadily, either from a blow to the head or blood loss, you can't be sure which.  In a display of sublime defiance, you manage to stay on your feet.  Though your tenacity does little good as your lightning-fast foe effortlessly undresses you, easily avoiding your clumsy and pain-addled movements.\n\n", false);  
		//START ZE RAPE
		MainScreen.text("The succubus steps away from you, withdrawing a tiny vial from a pocket in her vest.  She uncaps it with practiced ease, her outfit shifting into latex parody of a nurse's uniform as she attaches a small needle, completing the assembly of her injector.  \"<i>Like, don't worry about a thing hun, this will only hurt for a second,</i>\" she coos as she prances forwards, easily sinking the entire needle into your shoulder.\n\n\"<i>W-what did you do to me?</i>\" you manage to stammer.\n\n", false);
		MainScreen.text("She merely smiles and slips a delicately manicured finger under a rapidly disappearing skirt.  You ignore her crude display of wanton sexuality for the moment and try to focus on figuring out what the drugs did you, and what her needy slit smells like.  No, that wasn't it... you wanted to taste her nipples!  You shake your head and try to focus, but fail completely as the succubus lifts her sticky latex skirt, exposing her dripping snatch to you.  Your eyes lock on to the wondrous slut's fuckhole as her fingers tease you with glimpses between her folds every few seconds while she continues pleasuring herself.  With a flash of intuition, you realize what you were trying to think about:  finding something hard to penetrate that perfect hole with.  That little hungry snatch deserves to be filled with something throbbing and hard...\n\n", false);
		MainScreen.text("\"<i>OoooooOOOOH!  ...you're feeling it now are-AH AH YES-you dear?  Mmmmm yes, I bet this pussy is all you can think about.  I wonder if you can feel it-aaahhhhhhmmmm-yet?  This is always, like, the best part...</i>\" gasps out the succubus as she pleasures herself.  You wonder what she could be talking about as ", false);
		if(player.lowerBody.vaginaSpot.count() > 0) MainScreen.text("your " + clitDescript() + " parts your folds, growing harder.", false);
		else MainScreen.text("a fleshy growth erupts from your pale flesh, growing harder.", false);
		MainScreen.text("  In seconds you're playing with it, tugging the sensitive button as it fills up with more and more blood, growing bigger and harder than ever before.  Your legs give out as you begin stroking it with feverish intensity, barely registering as it grows to nearly eighteen inches in length, not noticing the increasingly veiny surface or different texture at the tip.  You force yourself to stop as a sudden truth asserts itself upon your consciousness - you need to shove your clit-like cock into a pussy.  You need to cum inside that hungry slut's blue spunk-receptacle.\n\n", false);
		MainScreen.text("You stand on shaky legs and lunge forwards, impaling the slutty nurse on your new tool with a violent animalistic passion.  Fucking her roughly, you lick her nipples to finally get the taste you've ached for.  Girl-cum squirts from the sloppy fuck-hole of the latex-nurse underneath you as you fuck her like a desperate animal.  She squeals with pleasure, splitting her legs wide apart to encourage your new maleness.  Your eyes roll back from the drug-enhanced pleasure of her dripping cunt as a male orgasm rocks your mind.  Mixed fluids splatter your pistoning hips as you do what you were always meant to do - feed and pleasure succubi.  Somehow your tool remains rigid and your hips continue plunging your new cum-spigot deeper and deeper into your mistress as the next orgasm begins to build inside your drug-addled mind, even as you black out.", false);
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.list[0].cockLength = 16;
		player.lowerBody.cockSpot.list[0].cockThickness = 1.5;
		//[[[[To bad end!]]]
		player.orgasm();
		doNext(factoryFinisher);
	}
}

public succubusVictoryRape():void {
	spriteSelect(55);
	MainScreen.clearText();
	player.slimeFeed();
	//MALE
	if(player.lowerBody.cockSpot.count() > 0 && (player.gender != 3 || rand(2))) {
		//(LUSTY) 
		if(monster.lust > 99) MainScreen.text("Panting hotly, the succubus staggers towards you, her eyes fixated on the bulge in your crotch.  Dark viscous liquid drips from her dusky folds as her hips undulate hypnotically.  Blue fingers smear the corrupted lubricants over the smooth outer folds of her sex as she lies back enticingly, giving up on anything but bedding you.  In moments your " + player.armorName + " are on the floor and you approach your prize.\n\n", false); 
		//(HP) 
		else MainScreen.text("The succubus collapses on the floor, groaning in pain.  Most of her clothes have been destroyed by the combat and her blue skin is marked with deep purple bruises and bloody lacerations.  You undress, straddling your conquest and gazing down on her helpless, curvaceous form.  She looks up at you and forces a smile, licking the blood from a cracked lip and beginning to masturbate for you.\n\n", false);
		//START ZE RAEP CANNONZ
		MainScreen.text("While pondering the best way to take your horny prize, her complexion begins to change, the marks of combat disappearing from her toned body.  The demonic horns crowning her perfect visage begin withdrawing into her head, and her hair ", false);
		if(player.hairLength > monster.hairLength) MainScreen.text("lengthens", false);
		else MainScreen.text("shortens", false);
		MainScreen.text(", shifting to " + player.hairColor + ".  The bone structures of her cheeks, nose, and face shift ever so slightly, and you suddenly realize you are looking down at a slutty version of yourself!  You aren't sure if it's the growing pool of succubus fluid below you or how hot your female twin is, but your " + cockDescript(0) + " is as hard as a rock.\n\n", false);
		MainScreen.text("Well, you DID decide to rape her, and now you know that you ARE smoking hot.  You shrug and shove your fem-double's legs apart, exposing her glistening fuck-target.  You bend down and bite her nipple as you position yourself at her entrance, allowing her to grasp your " + cockDescript(0) + " and coat it with her slick dark fluids.  It tingles as the tainted cunt-juices wick up into your dick like the oil from a lantern back home. At first it burns painfully, as if badly sunburned, but you adjust to the discomfort and marvel as your skin turns blackish-purple. Midnight-colored nodules sprout along the upper and lower portions of your " + cockDescript(0) + ", perfectly shaped to tease clits.  Just under its head, a ring of larger growths emerge, somewhat pointy, but flexible, rubbery and incredibly sensitive.  Your " + cockDescript(0) + " gets harder and harder as it grows slightly beyond its normal size.  It tugs your groin forwards, practically leaping towards its demonic mate on its own volition.  You cave in and press forwards, parting her folds and submerging your crown in corruptive bliss.\n\n", false); 
		//((TOO BIG))
		if(player.cockArea(0) > monster.vaginalCapacity()) {
			MainScreen.text("But the pleasure is short-lived, as even her altered physiology can't accommodate your massive tool. With a grunt of frustration you yank your hungry demonic cock away from your goal.  She smiles knowingly and massages her breasts, releasing streams of the same black fluid from her tumescent nipples. It coats the valley of her pornstar-sized breasts, allowing the fluid to flow down and pool in her tight little belly button.\n\n", false);
			MainScreen.text("\"<i>This will, like, be even better anyways stud!</i>\" coos a higher pitched you, smashing her tits together wetly for emphasis.  Viscous strings of lubricants form a mesmerizing lattice between her mountainous tits as she puts on a show for you.  Entirely of its own accord, your " + cockDescript(0) + " drags you into her web of corruption, plopping itself firmly into the river of desire that fountains from the peaks on either side. With a steady rhythm, you rock your " + hipDescript() + " back and forwards, plunging into her delicious fuckpillows without abandon. With an inhuman strength, she pushes them together, forcing them to completely encircle your over-sized pole with a tight ring of corruption-dripping tit-flesh.\n\n", false);
			player.lowerBody.cockSpot.list[0].cockType = CockType.DEMON;
			//[normal]
			if(player.cumQ() < 50) MainScreen.text("Droplets of pre begin to escape your cock-slit every time your sensitive nodules pass between your fem-clone's wondrous pleasure-tits.  You fuck harder, no longer caring if it's your choice or your cock's, mashing your purplish head against her lips with every stroke.  The flash-fire of an orgasm sweeps over you, over-engorging the nodules all over your cock and doubling their size.  Your hips resort to tiny rocking motions as you rub your cock-slit into your fem-self's open mouth, blasting thick ropes of tainted black cum into her mouth. Though you quickly empty of cum and collapse onto her, your " + hipDescript() + " continue to fuck like a machine.  All you can do is hang on to your meat and try to stay conscious as your demonic prick feasts on your double.\n\n", false); 
			//[high]
			if(player.cumQ() >= 50 && player.cumQ() < 500) {
				MainScreen.text("A steady stream of pre begins to escape your cock-slit, drooling over your double's face and tits as you pound away at her bouncing ring of titflesh.  Every new bump and nodule seems as sensitive as your entire maleness used to be.  Every thrust into the dark wet prison only makes your pre-cum drool faster and your " + cockDescript(0) + "'s new adornments grow fuller and even more tender.  In a flash, the fire of orgasm overwhelms your body's new taint-saturated cock.  Like a kinky 'wave', each nodule from the base to the pointy ring at your crown grows larger as your muscles clench.  ", false);
				if(player.lowerBody.balls > 0) MainScreen.text("Your " + ballsDescriptLight() + " practically glow with relief as they begin contracting.  Their entire surface is covered with black veins that radiate from your demonic prick, sharing the corruption with your sperm factories.  ", false);  
				MainScreen.text("You throw back your head as the first wave of release pours from your tip, splattering your female clone with inky black cum!  The color startles you for a moment before the next blast moves down your shaft, visibly distending your urethra until it bursts free to coat her hair.  Your hips keep moving of their own accord, massaging the crown-ring with tits during each thrust forwards and accompanying cumshot.  By the fourth load, your double is opening her soaked lips wide and guzzling it down.  By the sixth she's sputtering and coughing as the black sex juice sloughs off her.  By the ninth she's managed to clamp her lips over your cock-tip, and her throat bulges ludicrously with the effort of taking each load.  Thankfully, your orgasm finally winds down.  As the last few globs of inky jism escape from you, you realize your hips are still moving, plunging your massive possessed tool into its new favorite place.  Sighing, you hang onto your endowment and try to stay conscious in spite of your exhaustion and the overwhelming feelings coming from your groin.\n\n", false);
			}
			//[ultrahigh]
			if(player.cumQ() >= 500) {
				MainScreen.text("A river of pre-cum begins pouring from your cock-tip's slit, soaking your slutty double's face and tits as it mixes with the corruptive fluids already smeared about.  The alien bumps and nodules upon your " + cockDescript(0) + " flex and twitch at every pass through the fuck-able foe's soft tits, slowly growing as they absorb more of your slut-self's taint.  The tight squeeze around your newly retextured " + cockDescript(0) + " overwhelms any sense of control you may have had as your arousal-soaked groin takes over completely.  You begin pounding the tit-pussy as if your life depended on it, jack-hammering  your " + cockDescript(0) + " forward and back hard enough to make the mountains of breast ripple and shake like jello during an earthquake.  The ring of pointed nodules around your crown continues to swell and grow with every pass through the inky passage, soaking up more and more of the corruption until they are each nearly two inches long.  Overwhelmed by the pleasure, your eyes roll back and a mighty orgasm comes to boil in your groin.  ", false);
				if(player.lowerBody.balls > 0) MainScreen.text("Your " + ballsDescript() + " twitch and shake, the veiny surface of your sack darkening as the corruption begins to fill them.  ", false);
				MainScreen.text("\n\nLike a perverted version of the wave, the nodules along your length fill with blood, doubling in size along your length as a massive bulge of cum rushes out your urethra.  Black cream drizzles from the tiny growths as the first blast of cum passes into your dick's crown moments before erupting like a volcano.  One second the sexy female version of you is moaning like a whore and licking her lips. The next she is sputtering and gasping as a half-gallon of inky black cum soaks her from head to tits.  Heedless of her discomfort, your legs keep sawing your " + cockDescript(0) + " deeper into this perfect titfuck as more thick bulges of tainted spunk begin to stretch your urethra on their way out.  You babble incoherently as your cock's tip plants itself against her open lips, blasting even more spunk directly into her waiting gullet.  Her cheeks bulge comically as the stuff drips from her nose, but somehow she manages to swallow the bulk of it, her hands vigorously milking your " + cockDescript(0) + " with her fuck-bags.  By the time the third jet of cum erupts, she's unhinged her jaw and somehow taken the head into her mouth, giving unfettered access to pump her belly full of your black jism.  You groan with uncontrollable pleasure as her belly fills with spunk.  Her eyes roll back as the next blasts expand her belly further, at first making her look slightly pregnant and then gradually stretching her belly until she looks like she could have minotaur twins.  You lose count of how much cum you put into her, but eventually she can take no more and your cock is pushed free by the pressure, splattering her face again.  Far from finished, you blast cum over her face as you realize she's lost consciousness; her eyes are totally rolled back and her tongue lolls from her mouth like that of a sleeping bitch.  Eventually your orgasm winds down, but not before leaving her in a 4 inch deep puddle of spunk, looking like more like a blue balloon full of dark water than woman.\n\n", false); 
			}
			MainScreen.text("Still, your possessed maleness is far from finished as it continues to slide along her belly and between her still-dripping tits, and before long you feel another orgasm building.  You hang on for dear life, hoping just to stay conscious through the ordeal...\n\n\nHours later you pull away, sated.  For now.", false);
		}
		//((IT FITS))
		else {
			MainScreen.text("You plunge in to her velvety depths and feel her rippling cunt-muscles contract tightly around you for a perfect fit.  She gasps as each cock-distorting nodule bounces her two-inch clitty, making your mirror image moan like a bitch in heat.  The corrupted fluids dripping from her snatch squelch loudly, making your groin burn with pleasure.  ", false);
			if(player.lowerBody.balls > 0) MainScreen.text("Looking down, you even see the veins on your sack darkening to solid black as the corruption begins tainting your sperm-factories.  ", false);
			MainScreen.text("You pull back, letting the ring of pointed fleshy barbs spring free before plunging them back in. The pleasure makes you swoon, nearly forcing you to orgasm on the spot.  ", false);
			if(player.upperBody.chest.BreastRatingLargest[0].breastRating > 0) MainScreen.text("Your female double reaches down to pinch your nipple, spurring you on, \"<i>Please, could you like, cum for me?</i>\"", false);
			//New PG
			MainScreen.text("\n\n", false);
			player.lowerBody.cockSpot.list[0].cockType = CockType.DEMON;
			MainScreen.text("The succubus bucks her hips weakly, still clearly defeated, but egging on your orgasm as dark fluids squelch free from her quim.  \"<i>Please... can't you see how hot you're making me?  I've made your cock perfect, so please make me cum!</i>\" she begs as she quivers with delight.  ", false);  
			MainScreen.text("You pause to think about it, not noticing that your groin is pounding away with furious energy, splattering cum and pre over her thighs as your new cock's instincts take control from your waist down.  Gasping with sudden pleasure, you feel a flash of heat pass through your tainted meatstick as an orgasm builds.", false);
			//New PG
			MainScreen.text("Each of the new bumps and rounded spines of your " + cockDescript(0) + " flood with blood, doubling in size as orgasm overtakes you.  ", false);
			MainScreen.text("Your hips bury your entire length inside her, acting on their own as your " + cockDescript(0) + " clenches, pouring more and more spunk inside her", false);
			if(player.lowerBody.balls > 0) MainScreen.text(" as your balls empty their load queue", false);
			MainScreen.text(".  ", false);
			//Big cum
			if(player.cumQ() >= 50 && player.cumQ() < 400) MainScreen.text("You inhale as black cum spatters from her entrance, her belly distending slightly as you empty what feels like a gallon inside her.  ", false);
			//((Ginormohuge)) 
			if(player.cumQ() >= 400) MainScreen.text("Gasping in pleasure and surprise, you marvel as her belly visibly expands with each eruption of your dark load.  At first it looks like a tiny belly, but by the time the orgasm finishes, your girlish double looks like a woman in her ninth month of pregnancy – with twins.", false);
			MainScreen.text("\n\nYou pant with exertion and pull back, only to have your " + cockDescript(0) + " plunge right back in. Beginning another rough fucking session, your hips force-fuck her beyond your control.  Exhausted, you lean over her, figuring you may as well enjoy your double's wondrous breasts until your demonic cock has finally sated itself.  You just hope you don't black out from the waves of pleasure each of your new nubs radiates.\n\n\nHours later you pull away, sated.  For now.", false); 
		}
		MainScreen.text("\n\nThe succubus licks her fingers clean, looking totally recovered.  In the blink of an eye, she dashes out the door, disappearing.", false);
		player.orgasm();
		dynStats("cor", 5);
		cleanupAfterCombat();
	}
	//FEMSAUCE
	else {
		if(monster.HP < 1) MainScreen.text("Your foe staggers and falls hard on her ass, utterly defeated.  Her bruises and lacerations slowly fade and heal, regenerating with the aid of her demonic powers.  You easily tear through her clothes, leaving only the damaged stockings that gird her legs. It doesn't take much to force her down on her back and straddle her as you disrobe, ready to take your pleasure.\n\n", false);
		else MainScreen.text("Your foe drops to her knees, stuffing three digits into her greedy snatch as arousal overcomes her desire to subdue you.  With great care, you approach your insensible enemy and tear off her clothes, leaving her wearing only the remains of her stockings as you force her down on her back.  As if possessing a will of their own, her legs lewdly spread as you disrobe.\n\n", false);
		MainScreen.text("Her budding clit rises from between her folds, hardening like a tiny three inch dick.\n\n", false);
		if(player.biggestLactation() > 1) {
			MainScreen.text("<b>You could scissor with her, or maybe force-feed her some of the milk you've backed up.  Which will it be?</b>", false);
			simpleChoices("Scissor", dungeonSuccubusForceScissor, "ForceFeed", dungeonSuccubusForceFeed, "", null, "", null, "", null);
		}
		//No choices if not lactating...
		else {
			dungeonSuccubusForceScissor();
		}
	}
}

public dungeonSuccubusForceScissor():void {
	spriteSelect(55);
	MainScreen.clearText();
	MainScreen.text("You shiver with anticipation as you hook your leg under her thick thighs, lining up your " + vaginaDescript(0) + " as you press forwards.  The anticipation builds as your matched honeypots grow ever closer.  Making contact, your folds part as her purplish-red clit slips betwixt your nether-lips, vibrating slightly in tune with the succubus' heartbeats.  You gasp, feeling your own " + clitDescript() + " erecting and rubbing against her smooth mound.\n\n", false);
	if(player.lowerBody.vaginaSpot.list[0].clitLength >= 3) MainScreen.text("You groan with wanton desire as your " + clitDescript() + " continues to grow and grow until reaching full size and slipping inside the defeated slut's sloppy pleasure-hole.  ", false);
	MainScreen.text("It takes only a few seconds to get the succubus' juices really flowing, the sounds of your grinding hips dissolving into a cacophony of liquid squelches.  The gooey corrupt fem-cum tingles, spreading warmth through every patch of skin it touches.  Your locked hips writhe and twist with her's, eliciting pants and squeals from the both of you.  In no time flat, you find yourself cumming and feel your " + vaginaDescript(0) + "'s muscles clench hungrily with an unquenchable desire to be filled.  The succubus shivers in pleasure, probably feeding off your orgasm.  You back off, fingering your " + vaginaDescript(0) + " languidly and denying her a full meal.  Pouting, the succubus dips her fingers back in, determined to cum.", false);
	MainScreen.text("\n\nYou turn away with a bemused sigh.  When you glance back, she has vanished!", false);
	player.orgasm();
	dynStats("cor", 1);
	cleanupAfterCombat();
}

public dungeonSuccubusForceFeed():void {
	spriteSelect(55);
	MainScreen.clearText();
	MainScreen.text("You chuckle as you decide to release some of the pent up pressure in your " + allBreastsDescript() + ".  Laying down over your conquest, you grasp her wrists and pin them to the floor as you shove your tits in her face", false);
	if(player.upperBody.chest.BreastRatingLargest[0].breastRating > 6) MainScreen.text(", nearly smothering the succubus with the swell of tit-flesh", false);
	MainScreen.text(".  You jiggle back and forth, lining up a " + nippleDescript(0) + " with the demon's parted lips.  You press your weight down threateningly, making it clear you could suffocate her with a boob.\n\n", false);  
	MainScreen.text("\"<i>Drink up bitch, these tits are full!</i>\" you command.\n\n", false);
	MainScreen.text("The succubus tentatively takes a " + nippleDescript(0) + " into her mouth, sighing at the tangy taste of your sweat-drenched skin.  Her lips gently suckle, wrapping around the perky hardening nub as it fills with arousal and milk.  You feel something let go inside your " + breastDescript(0) + " and the succubus smiles, now working to free more of your trapped cream.\n\n", false);
	if(player.biggestLactation() < 2) MainScreen.text("Her flexible tongue easily curls around one of your " + nippleDescript(0) + "'s, letting her pull and tug on it as she increases the suction from her lips.  Your body rewards her efforts with a faster flow of milk that she sucks down as if she were starving.\n\n", false); 
	if(player.biggestLactation() >= 2 && player.biggestLactation() < 3) {
		MainScreen.text("Her flexible tongue wraps around your milk-engorged nipple, pulling it tightly as she increases the suction of her lips.  Your body wastes no time rewarding her and she begins gulping down a steady supply of your breastmilk with a pleased expression on her face. You muse to yourself that perhaps succubi are masochists as breast-milk runs freely from your un-milked ", false);
		if(player.totalBreasts() > 2) MainScreen.text("tits.\n\n", false);
		else MainScreen.text("tit.\n\n", false);
	}
	if(player.biggestLactation() >= 3 && player.biggestLactation() < 4) {
		MainScreen.text("Her flexible tongue wraps around a milk-swollen nipple, immediately squeezing out a jet of thick breast-milk.  The tongue squeezes and tugs while the succubus ramps up the suction between her thick bee-stung lips.  Your body rewards her with fountains of milk, forcing her to visibly gulp and struggle to keep up with the heavy flow.  Milk runs freely down the " + player.skinDesc + " on your chest, pooling around the succubus' groin and your own as the unattended nipple", false);
		if(player.totalBreasts() > 2) MainScreen.text("s", false);
		MainScreen.text(" can't help but dribble in sympathy.\n\n", false);
	}
	if(player.biggestLactation() >= 4) {
		MainScreen.text("Her flexible tongue wraps around a milk-bloated nipple, immediately releasing a massive spray of cream that pours into her gullet, nearly choking her.  You stifle a giggle and pull her closer.  Thankfully, her determined tongue manages to stay in place and start tugging your nipple about, releasing even more of your over-large milk production.  She struggles, her throat and cheeks bulging from your explosive output of milk, until it overwhelms her and begin to pour out of her nose.  More milk pours from your unoccupied nipple", false);
		if(player.totalBreasts() > 2) MainScreen.text("s", false);
		MainScreen.text(" in sympathy, drenching your " + player.skinDesc + " with creamy goodness until it puddles on your captive demon.\n\n", false);
	}
	if(player.upperBody.chest.countNipples() == 2) MainScreen.text("As your first nipple drains, you move her to your other breast, being sure to motivate her cunt by grinding it with your " + player.foot() + ".  She squeals and sucks harder, emptying the last of your milk with a cute burp.  ", false);
	if(player.upperBody.chest.countNipples() > 2 && player.upperBody.chest.countNipples() < 6) MainScreen.text("As your first " + nippleDescript(0) + " drains, you forcibly move her to the next, unleashing a fresh batch of milk for her to feast upon.  Eventually, it too dries up, so you migrate her onwards to your next " + nippleDescript(0) + ".  After she drains each of your " + num2Text(player.upperBody.chest.countNipples()) + ", you smile happily at your now emptied breasts.  ", false);
	if(player.upperBody.chest.countNipples() >= 6) MainScreen.text("As your first " + nippleDescript(0) + " drains, you force her over to the next, unleashing even more milk for her to feast upon.  In time, that " + nippleDescript(0) + " also empties and you rotate her on to the next.  The cycle repeats seemingly endlessly as you work her from nipple to nipple, relieving the insistent pressure of your breasts and slowly filling her with your milk.  ", false);
	if(player.averageLactation() * player.totalBreasts() < 6) MainScreen.text("Her belly bulges slightly from all the breast-milk she's consumed.\n\n", false);
	else MainScreen.text("The succubus looks bloated and pregnant from all the milk you've forced into her.  She sloshes and moans incoherently from the strain of it all.\n\n", false);
	MainScreen.text("Despite the relief your " + allBreastsDescript() + " now feel, your " + vaginaDescript(0), false);
	if(player.lowerBody.cockSpot.count() > 0) MainScreen.text(" and " + player.multiCockDescriptLight() + " feel hungrier than ever.  ", false);
	else MainScreen.text(" feels hungrier than ever.  ", false);
	MainScreen.text("You shove your crotch into your milk-dazed foe's white-stained visage, grinding your " + vaginaDescript(0) + " into her mouth until you cum all over her", false);
	if(player.lowerBody.cockSpot.count() == 0) {
		temp = rand(3);
		if(player.vaginas[0].vaginalWetness >= VAGINA_WETNESS.SLAVERING) MainScreen.text(", soaking her with girl-cum.", false);
		else {
			if(player.vaginas[0].vaginalWetness <= VAGINA_WETNESS.WET) MainScreen.text(", slicking her face with girlish cum.", false);
			else MainScreen.text(", drenching her with a deluge of girlcum.", false);
		}
	}
	else MainScreen.text(", and unloading a wave of hot spunk into her hair.", false);
	MainScreen.text("\n\nYou push her over, noting that her freed fingers immediately bury themselves in her demonic snatch, loudly squelching as she tends to her own arousal.  Her perfect visage is a mess, coated with musky girlcum", false);
	if(player.lowerBody.cockSpot.count() > 0) MainScreen.text(" and a thick layer of spunk", false);
	MainScreen.text(".", false);
	MainScreen.text("\n\nYou turn away with a bemused sigh.  When you glance back, she has vanished!", false);
	dynStats("lus", -50);
	cleanupAfterCombat();
}

private drinkCoffee():void {
	spriteSelect(96);
	MainScreen.clearText();
	MainScreen.text("You take a sip of the rich creamy coffee and suddenly feel refreshed. As you replace the coffeepot, the busty coffee-maker comes to life, grabbing her thick dusky nipples and squeezing out a trickle of scaldingly hot liquid. You can see her eyes roll up into her head from what you assume to be pleasure as she automatically refills the missing coffee, mouth open with ecstasy.  Her movements gradually slow as she quivers almost imperceptibly. A contented smile graces her features as immobility overtakes her, freezing her back in place.  You wonder if 'Mrs. Coffee' was created, or is a victim of this place's dark master.");
	dynStats("lus", 1);
	HPChange(35, false);
	doNext(playerMenu);
}

private takeIronKey():void {
	MainScreen.clearText();
	MainScreen.text("You take the <b>Iron Key</b> to keep with your other important items.");
	player.createKeyItem("Iron Key", 0, 0, 0, 0);
	doNext(playerMenu);
}

private openFactoryDoor():void {
	if (player.hasKeyItem("Iron Key") < 0) {
		MainScreen.clearText();
		MainScreen.text("The door is locked with a key that is not in your possession.");
	}
	else dungeonLoc = 1;
	dungeonEnterRoom(dungeonLoc);
}

private takeCockMilker():void {
	MainScreen.clearText();
	MainScreen.text("You puzzle out how to build a fully functional cock-milker from the spare parts here and assemble it.\n\nYou gained a <b>Cock Milker</b>!");
	MainScreen.text("\n\nYou'll need a little help to use it though.");
	player.createKeyItem("Cock Milker", 0, 0, 0, 0);
	player.statusAffects.add(new StatusAffect("BuiltMilker", 0, 0, 0, 0)));
	doNext(playerMenu);
}

private takeBreastMilker():void {
	MainScreen.clearText();
	MainScreen.text("You puzzle out how to build a fully functional breast-milker from the spare parts here and assemble it.\n\nYou gained a <b>Breast Milker</b>!");
	MainScreen.text("\n\nYou'll need a little help to use it though.");
	player.createKeyItem("Breast Milker", 0, 0, 0, 0);
	player.statusAffects.add(new StatusAffect("BuiltMilker", 0, 0, 0, 0)));
	doNext(playerMenu);
}

private talkToIncubus():void {
	spriteSelect(30);
	MainScreen.clearText();
	if (player.hasKeyItem("Hentai Comic") >= 0) {
		MainScreen.text("The incubus speaks to you with a calm, deep voice, \"<i>And so the insect, heedless of its path, stumbled directly into the spider's web.  Tiny insect... wait, what is that book you're carrying?  Is that hentai?  It IS!  Let me offer you a deal – I'm not really hungry or interested in fighting. So if you hand over the comic, I'll happily ignore your presence here. Though, I guess you could also just submit. Then I could put you to work and still get the comic.</i>\"");
simpleChoices("Fight", startIncubusFight, "Trade", tradeComic, "Submit", submitToIncubus, "", null, "", null);
	}
	else {
		MainScreen.text("The incubus speaks to you with a calm, deep voice, \"<i>And so the insect, unaware of its path, stumbles directly into the spider's web.  Tiny insect, you have little to offer me, but everything to offer our facility.  Why don't you come along quietly?</i>\"");
		simpleChoices("Fight", startIncubusFight, "Submit", submitToIncubus, "", null, "", null, "", null);
	}
}

private startIncubusFight():void {
	spriteSelect(30);
	player.statusAffects.add(new StatusAffect("FactoryIncubusDefeated", 0, 0, 0, 0))); //Won't matter if you lose
	startCombat(new IncubusMechanic(), true);
}

private submitToIncubus():void {
	spriteSelect(30);
	MainScreen.text("\"<i>It is good to see the insect accept its fate as the spider closes in,</i>\" intones the strange demonic mechanic as he takes you by the arm and leads you deeper into the facility.  ");
	if(player.statusAffects.has("DungeonShutDown")) {
		MainScreen.text("\n\nYou enter the main milking chamber, and the incubus gives a start when he realizes what has happened.  With a grunt of rage he throws you through the doorways back into his chamber.  The demon stalks after you, taking up a fighting stance.");
		doNext(startIncubusFight);
		return;
	}
	MainScreen.text("You are brought into a room full of moaning humans, lined up in machines along the walls. You can see they're apparently sorted by age, as the victims' hair turns more and more grey and silver as you look down the line toward the far wall. All of them are hermaphrodites, the older individuals seeming to have larger breasts and genitals than the younger ones.  Most have a number of syringes embedded into their bodies, pumping them full of tainted chemical aphrodisiacs and demonic mutagens.  Clear cups and tubes are attached to leaky nipples, pulling steady streams of milk from the insensible captives as they pant and moan like drug-addicted sluts.  Similar tubes cradle their enhanced man-hoods, rhythmically squeezing cum from their constantly orgasming bodies.  Hoses suck away the jizz and milk, pumping it to places unknown.  Despite yourself, you are beginning to be majorly turned on, realizing that you'll probably become another milk-dripping pleasure-addict in a few minutes.\n\n");
	MainScreen.text("\"<i>Time to serve your purpose, insect,</i>\" says the incubus, gesturing towards an empty harness. You stand immobile, either from fear or lust, until the incubus shoves you into the machine.  It automatically straps you down, leather pieces crisscrossing over your body and holding you in place.  You see something move at the edge of your vision, but due to the harness you can't turn your head to see it.  Something sharp pinches your neck and you fade to blackness....");
	doNext(factoryFinisher);
}

private tradeComic():void {
	spriteSelect(30);
	MainScreen.clearText();
	MainScreen.text("You hand over the Hentai Comic tentatively to the male sex demon.  As soon as he has it in his grubby mitts he sits down and starts thumbing through the pages, toying with his half-hard member the entire time.  He must really like porn.");
	player.removeKeyItem("Hentai Comic");
	player.statusAffects.add(new StatusAffect("IncubusBribed", 0, 0, 0, 0)));
	doNext(playerMenu);
}
		
public incubusLossRape():void {
	player.slimeFeed();
	MainScreen.text("", true);
	//Nipplefuck city
	if(player.upperBody.chest.hasFuckableNipples() && player.lust >= 100) {
		MainScreen.text("Molten arousal pumps through your veins, burning away your reason with an unquenchable desire to mate.  You drop your top, exposing your " + allBreastsDescript() + " to your foe in a submissive display. Lowering your eyes, you hope you can tempt him to plug your " + nippleDescript(0) + " with his demonic prick.  You roughly squeeze each sensitive tit, trailing your fingers down the sensitive breast-flesh towards your rapidly dampening fuck-holes.\n\n", false);
		MainScreen.text("Your eyes relax as pure sensation overwhelms your already over-excited body.  Your fingers find your nipple-holes, locking around them while tugging and squeezing, stretching them tight with pleasure and pain.  You cast a seductive glance to the incubus' groin, noting that he's been taken in by your wanton display.  He takes a step, his cock rippling and twisting as it shifts and changes before your eyes. It divides it half, splitting into two full-sized pricks.", false);
		if(player.upperBody.chest.countNipples() > 2) MainScreen.text("  Each of those divides again, splitting into four prehensile penises.", false);
		if(player.upperBody.chest.countNipples() > 4) MainScreen.text("  They continue dividing until his wriggling mass is sufficient to penetrate every single nipple and then some.", false); 
		MainScreen.text("\n\n", false);
		MainScreen.text("A pleading moan escapes your lips and your captor obliges you, the cocks wriggling forward under their own power and sliding into your slippery " + nippleDescript(0) + "s with ease.  Each member is perfectly sized to stimulate you without over-stretching your tender breast-flesh.  You barely stifle a giggle, drunk on enough pleasure to shatter a lesser mind.  Your giggling is rudely interrupted by something hard and slick forcing itself between your lips.  You smile and slurp on it like a pacifier, swallowing droplets of pre-cum as his tentacle-like pricks fuck your breasts hard and fast, ", false);
		if(player.biggestLactation() > 1) MainScreen.text("splattering milk and pre everywhere.\n\n", false);
		else MainScreen.text("splattering your tits with escaped sexual fluids.\n\n", false);
		MainScreen.text("The demon tenses, pulling your head forwards and burying your nose against his belly.  The dick in your mouth slides down your throat, hanging just above your belly as it begins to fill your gut with bursts of demonic warmth.  Black cum erupts from your nipples as his orgasm overwhelms their meager storage capacity, soaking your tits in his corruptive essence as the pleasure finally breaks your mind.  Your eyes roll back into your head as you begin cumming... and cumming... and cumming. The orgasm drags on and on as more and more cum pours into your body.  Like a passenger in a car you see what's happening but have no control.  Your body is used and abused for hours before you finally drift off to sleep.", false);
		player.orgasm();
		dynStats("cor", 20);
		if (player.findStatusAffect(StatusAffects.DungeonShutDown) < 0)
			doNext(factoryFinisher);
		else cleanupAfterCombat();
		return;
	}
	//Tentacle gangbang
	else {
		if(player.lust > 99) MainScreen.text("Molten arousal pumps through your veins, burning away your reason with an unquenchable desire to mate. You drop your top, exposing your " + allBreastsDescript() + " to your foe in a submissive display, ", false);
		else MainScreen.text("You lower your top, exposing your nubile form to your foe in a submissive display, ", false);
		MainScreen.text("lowering your eyes and fixating on his now-rigid demonic member.  Right before your eyes, it begins splitting and dividing into thinner prehensile penises that squirm about in the air, each one reminding you of a snake on the prowl.  ", false);
		if(player.stats.cor < 80) MainScreen.text("In a disgusting display", false);
		else MainScreen.text("As you grope yourself noisily with your hand into your undergarments, a salacious smile on your lips", false);
		MainScreen.text(", you watch as his pricks pulse and thicken out until their masses are as wide as his original dick.\n\n", false);
		if(player.stats.cor >= 80) MainScreen.text("As you realize their size and number, you open your eyes wide and smile broadly, reflexively spreading your legs wide, practically begging him to fuck you.  ", false);
		MainScreen.text("In a flash, each fat tentacle-cock whips out and surrounds your body in slick demon-flesh.  The tentacles constrict, working in pairs to take off every piece of your " + player.armorName + ".  ", false);
		if(player.upperBody.chest.BreastRatingLargest[0].breastRating >= 2) MainScreen.text("They make sure to rub each of your breasts, spending a few seconds smearing slick pre-cum into your " + nippleDescript(0) + ".  ", false);
		MainScreen.text("A pair of them slides into your undergarments, pressing against your needy crotch and teasing your " + assholeDescript() + " with more slick demonic cum.  ", false);
		if(player.stats.cor < 80) MainScreen.text("You wriggle and whine,", false);
		else MainScreen.text("You grab the thick tentacle-cock working on your cunt with both hands, as you can barely grab it with one. Then,  while letting out moans fit for a bitch in heat, which you are, you begin", false);
		if(player.lowerBody.vaginaSpot.count() > 0) MainScreen.text("squeezing your legs around them and grinding your " + clitDescript() + " against the oddly textured demon-cock.", false);
		else {
			if(player.lowerBody.balls > 0) MainScreen.text("grinding down against the ribbed and textured demonic cock as it slides between your " + ballsDescriptLight() + ".", false);
			else if(player.lowerBody.cockSpot.count() > 0) MainScreen.text("squeezing your legs around the thick demonic flesh as a steady dribble of pre-cum drips from your " + cockDescript(0) + ".", false);
			if(player.gender == 0) MainScreen.text("grinding suggestively on your captor's rods, barely noticing as the last of your " + player.armorName + " falls away.", false);
		}
		MainScreen.text("\n\n", false);
		//FUCKKKING
		//Female paragraph
		if(player.lowerBody.vaginaSpot.count() > 0 && (player.lowerBody.cockSpot.count() == 0 || rand(2))) {
			MainScreen.text("The incubus at last decides to tend to your over-aroused body and pulls you off the ground with his tentacles, suspending you in mid-air.  ", false);
			if(player.stats.cor < 80) MainScreen.text("You feel your " + player.legs() + " lifted and pulled tight as countless demonic cocks encircle your body, binding and constraining you further.  You whimper as a demonic tentacle probes your back door while a thicker one lines itself up just below your " + clitDescript() + ".  ", false);
			else MainScreen.text("As he lifts you, you spread your legs, showing him your cunt which is dripping wet from anticipation, and grabbing your ass to give him a perfect view of your " + assholeDescript() + ".  You then beg him, between lecherous moans, to use his three biggest tentacles, as you want to have the most sensations.  With a sadistic smile, he lines up two tentacle cocks about as big as your arm over your " + vaginaDescript(0) + " and your " + assholeDescript() + ".  ", false);
			MainScreen.text("You then giggle and try to wiggle your " + hipDescript() + " forward, begging for him to take you and quench the fire burning in your " + vaginaDescript(0) + ".  The incubus obliges, pressing forth with both drooling members and simultaneously plugging your front and back doors.  ", false);
			if(player.stats.cor < 80) MainScreen.text("You gasp from pleasure and surprise, ", false);
			else MainScreen.text("You open your mouth wide, as the enormous tentacle-cocks force their way in, dripping demonic pre-cum all over. Quickly, it acts as additional lubricant, and the pain largely subsides.  You find that these massive demonic cocks' size is perfect to stimulate, in an incredibly pleasurable way, all sides of your cunt at once, and to stretch your ass just a bit over your preferred size.  As the incubus starts moving his appendages in rhythm, you're lost in heavenly pleasure, eyes closed, letting out deafening moans of lust, your legs and arms dangling without any thought for dignity.  You are deeply ", false);
			MainScreen.text("enjoying the knobbed texture of his shafts as you're double-penetrated by a single demon. The incubus smirks as another cock-tentacle wraps itself up around your neck like a shiny student collar and plugs your noisy little mouth.  You groan into his member as you're ", false); 
			if(player.stats.cor < 80) MainScreen.text("squeezed and caressed by the writhing tentacle-pricks in and around your body, lost in the pleasure and taste of demonic pre-cum.\n\n", false);
			else MainScreen.text("getting roughly fucked by the two tentacle-cocks at the same time.  Taking the tentacle-cock in your mouth with both hands, you eagerly swallow every bit of demonic pre-cum, then suckle on the huge cock-slit. \n\n", false);	
			
			//FemCum
			if(player.lowerBody.vaginaSpot.list[0].clitLength > 3) MainScreen.text("You nearly cum on the spot when the cock fucking your pussy loops its length around your " + clitDescript() + ", the cum-slickened coils driving you mad with pleasure as they coil, slide, and jerk around your clit as if it was a cock.  ", false);
			else MainScreen.text("You nearly cum on the spot when the cock fucking your pussy curves up to rub its textured nodules against your " + clitDescript() + ".  ", false);
			player.cuntChange(player.vaginalCapacity()*.8, true);
			if(player.stats.cor >= 80) MainScreen.text("You cum more times than you are able to count, each time causing a tightening of your fuckholes, which increases the rubbing against the demonic nodules and sends another wave of pleasure to your dazed brain.  You begin to drool freely, reveling in this most unholy mating.  ", false);
			MainScreen.text("The prick in your mouth surges forward, sliding deep into your throat.  The coils around your neck tighten in response, choking your neck into a tight cock-sleeve as you feel bulges of cum moving along its length.  In moments you feel your belly starting to grow full, sloshing with cum as you become desperate to breathe.  The tentacles lodged in your " + assholeDescript() + " and " + vaginaDescript(0) + " react in similar fashion, stretching you wide as they begin pumping your body full of vast quantities of spunk.  A few free tentacles begin spurting gobs of the white stuff onto your " + player.skinDesc + ", soaking you in the stuff as you black out from a combination of oxygen deprivation and pleasure.", false);
			player.orgasm();
			dynStats("cor", 25);
			player.buttChange(monster.cockArea(0), true);
			if (player.findStatusAffect(StatusAffects.DungeonShutDown) < 0)
				doNext(factoryFinisher);
			else cleanupAfterCombat();
			return;
		}
		//Male/Genderless
		else {
			MainScreen.text("The incubus at last decides to tend to your over-aroused body and pulls you off the ground with his tentacles, suspending you in mid-air.  You feel your " + player.legs() + " lifted and pulled tight as countless demonic cocks encircle your body, binding and constraining you further.  You whimper as a demonic tentacle probes your back door, slathering your " + assholeDescript() + " with a nubby cock-head as it slowly presses forward and fills you with incredible tainted warmth.  Each nub and ridge that grinds past your sphincter bumps against the organs in your backdoor and fills you with pleasure that only increases as more of the demonic pre-cum is wicked into your body.  The gasp you started fades into a soft croon of pleasure before being muffled entirely by another thick prick.  The shaft belonging to the dick in your mouth curls around your neck like the collar a pet or submissive slut would wear.", false);
			if(player.lowerBody.cockSpot.count() > 0) MainScreen.text("  As your body's orifices fill with more and more dripping demonic dick-flesh, your " + cockDescript(0) + " becomes painfully hard.  Another tentacle wastes no time in wrapping itself tightly around the base like a cock-ring.  The rest of the demon's prehensile tool slides along your shaft, curling around to squeeze and jerk you off.", false);
			if(player.lowerBody.balls > 0) MainScreen.text("  You groan around the dick plugging your throat as another tentacle-like appendage wraps around your " + sackDescript() + ", pulling your " + ballsDescriptLight() + " down and gently squeezing them.", false);
			MainScreen.text("\n\n", false);
			//Genderless Orgasm
			if(player.gender == 0) MainScreen.text("The tainted cum mixed with the sensation of fullness provide you with pleasures beyond what your genderless body could accomplish on its own.  You writhe as the demon face-fucks you with one tendril while another continues to bury itself ever-deeper into your abused " + assholeDescript() + ".  ", false);
			if(player.lowerBody.cockSpot.count() > 0) MainScreen.text("The cock-tentacle around your " + cockDescript(0) + "  increases the pace of its stimulation as it begins to spurt hot wet cum over you, giving it lubrication as it jacks you off while staying tight around your base to prevent you from an orgasming.  ", false);
			MainScreen.text("You feel cum pulse through the tentacles encircling you as the incubus loses control of his tentacles.  Cum pumps into your belly, suffusing you with drug-like warmth as the tentacle around your neck pulls tight enough to squeeze the cock inside your throat.  You squirm and gasp for oxygen as spooge begins unloading into and around your body to the point where you aren't sure where your body begins and the demonic-spunk ends.  You twitch in what you assume is orgasm as you fight to breathe; all the while more cum is squeezed into your stuffed belly and ruined anus. The tentacle in your ass backs out slowly, having filled every inch of your intestines with cum, until it pops free with a splatter.", false);
			MainScreen.text("\n\n", false);
			if(player.lowerBody.cockSpot.count() > 0) {
				MainScreen.text("Being so thoroughly used and stimulated pushes you over the edge of orgasm, and your ", false);
				if(player.lowerBody.balls > 0) MainScreen.text("balls", false);
				else MainScreen.text("prostate", false);
				MainScreen.text(" unloads with enough force to squeeze past the constrictor clutching at your groin.\n\n", false);  
				//Small cum
				if(player.cumQ() < 50) MainScreen.text("You groan and orgasm with enough force to splatter a few ropes of cum into the sea of demon-spunk that soaks you from head to toe.  ", false);
				//Big cum
				if(player.cumQ() >= 50 && player.cumQ() < 400) MainScreen.text("Your orgasm goes off like a shotgun blast, splattering the incubus with a huge wad of cum.  It's but the first of many, and though each load of jizz is of comparable size, the force behind them diminishes until the last few blasts drip down your body and soak your " + player.legs() + " and " + player.feet() + ".  ", false);
				//Huge cum
				if(player.cumQ() >= 400) MainScreen.text("Your orgasm goes off like a volcano, visibly distending your " + cockDescript(0) + " as a huge wave of cum erupts from your groin, painting the incubus and floor with your spoo.  You cry from the sheer pleasure as the next wave builds and erupts, nearly as large as the last.  The demon-cock controlling your prick aims this blast up, forcing you to soak your " + hairDescript() + " and face with slick goo. The orgasming drags on and on while you slowly turn blue from oxygen deprivation. Before long, both you and the incubus are buried under a wave of white.  ", false);
			}
			MainScreen.text("The feeling is so intense that your " + hipDescript() + " twitch and move of their own volition while your eyes roll back in pleasure.\n\n", false);
			MainScreen.text("You black out just as you feel the cock-tentacle in your throat retracting. You dully feel your body drop to the ground, your pregnant-looking belly sloshing with demon jizz.", false);
			player.buttChange(monster.cockArea(0), true);
			player.orgasm();
			dynStats("cor", 25);
			if (player.findStatusAffect(StatusAffects.DungeonShutDown) < 0)
				doNext(factoryFinisher);
			else cleanupAfterCombat();
		}
	}
}

public incubusVictoryRapeBackdoor():void {
	MainScreen.text("Every day you've spent in this corrupted landscape has made you stronger and hornier, the evidence of which now kneels at your feet.\n\n", true);
	MainScreen.text("The fight over, your eyes begin to wander. You find you cannot resist staring at the huge swinging cock exposed by the incubus' crotchless overalls. The sight ignites desire that has been building within you ever since you arrived in this corrupted land. With an unnatural hunger, you knock the defeated incubus onto his back. He closes his eyes and groans, lost in his own world of lust and pain and unable to resist as you wantonly straddle him. His tool is hot in your hand as you tease it and his cock begins to grow slick with pre-cum. You lick your lips at the sight of his now glistening member, but not for hunger of food or drink. It is another kind of hunger that longs for satisfaction, a hole that needs to be filled. Eagerly, you position his swollen glans against your " + assholeDescript() + " and begin to ease yourself down over the massive tool. You start slowly, but the pleasure it's giving feels so good you ram the rest of the incubus' cock deep into your " + assholeDescript() + ".  ", false);
	MainScreen.text("His eyes flash open as if you'd just sent a jolt of electricity through him and he regains his senses, becoming hyper-aware of what you're doing. The incubus instinctively moves to control your " + hipDescript() + " and " + buttDescript() + " as they grind against him, guiding his cock towards pleasurable areas up your " + assholeDescript() + " that you would never have guessed were there a short while ago.\n\n", false);
	MainScreen.text("All too soon, he grunts and shivers as loads of his hot cum begin to squirt into you. He may be cumming, but you're not done yet; each squirt of seed only fans the flames of lust within you, making your increasingly wet and noisy thrusts even harder. Enjoying the ride and still nowhere near satisfied, you start sliding up and down on his slick pole even faster than before. He halfheartedly tries to push you off as you continue draining him of his seed, your lust seemingly unquenchable. But you cannot be stopped; his efforts only add to your pleasure as he struggles and unloads underneath you. With your belly beginning to swell with the cum you're relentlessly drawing from the incubus, you don't know how much longer either of you will last. Each movement of his tool inside you heightens the fire inside you until, with an unholy roar, the pleasure peaks and wave after wave of shuddering orgasm crashes over you. Each one hits hotter and harder than the last until finally, your senses are overcome and you lose consciousness entirely.\n\n", false);
	MainScreen.text("You awaken moments later beside a sleeping, limp, and drained incubus. You have definitely come out on top from the encounter. Though you feel stretched, sticky and a little sore, for the moment at least the burning desire to fill your " + assholeDescript() + " is satisfied.", false);
	player.buttChange(monster.cockArea(0), true);
	player.slimeFeed();
	player.orgasm();
	dynStats("cor", 2);
	cleanupAfterCombat();
}

public incubusVictoryRapeSex():void {
	MainScreen.text("", true);
	//RAPE THE DEMON -
	//(BUTTRAPE - Requires Penis)
	if(player.lowerBody.cockSpot.count() > 0) {
		MainScreen.text("With a few deft motions, you shift your " + player.armorName + " to expose your ", false);
		if(player.gender == 3) {
			if(player.lowerBody.balls > 0) MainScreen.text(player.multiCockDescriptLight() + ", " + ballsDescriptLight() + ", and " + vaginaDescript(0), false);
			else MainScreen.text(player.multiCockDescriptLight() + " and " + vaginaDescript(0), false);
		}
		else {
			if(player.lowerBody.balls > 0) MainScreen.text(player.multiCockDescriptLight() + " and " + ballsDescriptLight(), false);
			else MainScreen.text(player.multiCockDescriptLight(), false);
		}
		MainScreen.text(".  Having resolved to take the demon's backdoor, you approach his weakened form with brimming confidence.  He looks up, clearly hoping your plan is to squat on his throbbing member.  You dispel his misguided notion when you grab him by the horns and shove his face against the floor. He struggles weakly until you press down harder, making it clear he is to stay in position - on his knees with his head down and his ass in the air.  Circling your prey, you inspect his flawless body and carefully note that the hole at his crotch actually exposes a fair portion of his very supple and surprisingly feminine-looking backside.\n\n", false);
		MainScreen.text("You don't waste any time, gripping your " + cockDescript(0) + " in one hand and ", false);
		if(player.lowerBody.cockSpot.list[0].cockType == CockType.HORSE) MainScreen.text("pressing your thick flare ", false);
		if(player.lowerBody.cockSpot.list[0].cockType == CockType.DOG) MainScreen.text("pressing your pointed tip ", false);
		if(player.lowerBody.cockSpot.list[0].cockType == CockType.HUMAN || player.lowerBody.cockSpot.list[0].cockType.Index > 2) MainScreen.text("pressing your head ", false);
		MainScreen.text("between the incubus' cheeks towards his inhumanly smooth rear-passage.  You gasp in delight at the tight ribbed texture of his asshole as you slide ", false);
		if(player.lowerBody.cockSpot.list[0].cockLength > 10) MainScreen.text("deep inside ", false);
		else MainScreen.text("inside ", false);
		MainScreen.text(".  The demon underneath you grunts in an attempt to sound displeased, but it's plain to see the pre-cum he's dripping all over the floor.  What a slut!  You slap his ass and begin roughly butt-fucking him, panting with each plunge into the depths of his ridged passage, gradually increasing your tempo until your " + hipDescript() + " fill the room with loud slapping noises.", false);
		if(player.lowerBody.balls > 0) MainScreen.text("  Your " + ballsDescriptLight() + " swing freely, smacking into the demon's own and making both of you squeal and dribble more pre-cum.", false);
		MainScreen.text("\n\n", false);
		//(CUM)  
		if(player.lowerBody.balls > 0) MainScreen.text("You feel your " + ballsDescriptLight() + " draw up tight against your body.  ", false);
		MainScreen.text("Warm heat begins to build inside your groin, pooling under the base of your " + cockDescript(0) + ".  You realize you're about to paint this demon's gut with white, the thought only turning you on more.  ", false);
		if(player.cumQ() > 200) MainScreen.text("You groan as you feel your urethra being stretched by the sheer volume of fluid beginning to shoot through it.  ", false);
		MainScreen.text("You throw back your head and cum, slapping the incubus' ass with one hand while you grip and squeeze the jiggling flesh of his other cheek.  ", false);
		if(player.cumQ() < 50) MainScreen.text("A few thick spurts later and y", false);
		if(player.cumQ() >= 50 && player.cumQ() < 400) MainScreen.text("Thick jets of cum pump into the demon's plump backside, soon building up a wave of pressure that pushes back against you.  Y", false);
		if(player.cumQ() >= 400) MainScreen.text("A massive cock-distending bulge of cum works through your shaft, splashing into the demon's rectum in an explosive burst of pleasure. Unfortunately for your victim, it is only the first of many such cum-blasts. In no time flat, jism is spurting from his overfilled rectum while his belly looks a few months pregnant. You feel weak from discharging so much fluid, and y", false);
		MainScreen.text("ou fall back, the fluid of your orgasm dripping from your " + cockDescript(0) + " and the gaping asshole of your latest conquest.\n\nYou turn to gather your " + player.armorName + ", and when you look back the demon is gone, leaving only a small puddle of male fluids in his wake.", false);
		player.orgasm();
		cleanupAfterCombat();
		return;
	}
	//(VAGINAL - Requires Vagina)
	else {
		player.slimeFeed();
		MainScreen.text("With a few deft motions, you shift your " + player.armorName + " to expose your ", false);
		//Herm
		if(player.gender == 3) {
			if(player.lowerBody.balls > 0) MainScreen.text(player.multiCockDescriptLight() + ", " + ballsDescriptLight() + ", and " + vaginaDescript(0), false);
			else if(player.lowerBody.balls > 0) MainScreen.text(player.multiCockDescriptLight() + " and " + vaginaDescript(0), false);
		}
		else {
			MainScreen.text(vaginaDescript(0), false);
		}
		MainScreen.text(".  Striding forwards with hunger in your eyes, you give your left hand free access to your groin and slip your fingers between the moist folds of your " + vaginaDescript(0) + ".  As you undulate into the incubus' personal space, a swift thrust of your " + hipDescript() + " buries your fingers up to the knuckles and knocks the demon onto his well-muscled back.\n\n", false); 
		MainScreen.text("He looks up at you with a practiced eye, adjusting his demon-tool's size to better fill your " + vaginaDescript(0) + ".  ", false);
		//(set cocksize = to 80% vaginalCapacity).
		
		MainScreen.text("Thankful for the gesture, you sink down onto him, letting the nubs of his crown stimulate your lips and the underside of your " + clitDescript() + ".  ", false);
		if(player.vaginas[0].vaginalWetness >= VAGINA_WETNESS.SLICK) MainScreen.text("In no time flat your drooling fluids soak him in slippery wetness.  ", false);
		if(player.vaginas[0].vaginalWetness < VAGINA_WETNESS.SLICK && player.vaginas[0].vaginalWetness != VAGINA_WETNESS.DRY) MainScreen.text("Before long, you've lubricated a fair portion of his tool with wetness.  ", false);
		if(player.vaginas[0].vaginalWetness == VAGINA_WETNESS.DRY) MainScreen.text("Despite your usual light lubrication, you manage to moisten the top-half of his tool with wetness.  ", false);
		MainScreen.text("Relaxing the muscles in your " + player.legs() + ", you let a few inches of his length slip inside you, every nub and nodule of his corrupted prick filling the walls of your love-canal with inhuman pleasures that make your knees weak.  A particularly delightful bump brushes your " + clitDescript() + ", causing your " + player.legs() + " to finally give out. The incubus' nubbly cock plunges entirely inside you.\n\n", false);
		MainScreen.text("You gasp and moan like a cheap whore, disgusted by yourself and yet so turned on by the total loss of self-control.  The incubus is leering up at you, having regained some of his lost confidence.  Despite the lust, desire and pleasure burning through the hot pole buried in your abdomen, you work up enough rage to grip his neck with your left hand and practically choke him out.  You work your hips quickly as you feel his pre start to drip into your canal, spreading tingling warmth in the deepest parts of your passage and into your cervix.  You tighten your grip as you forcibly take your pleasure, barking in displeasure at the demon, \"<i>Don't look like you're enjoying this too much bitch, or I'll take it out of your hide.</i>\"  Satisfied at the renewed look of fear in his eyes, you return to using his magnificent tool as a masturbation aid.\n\n", false);
		MainScreen.text("Unable to contain your body's desires due to either the demon's aura or his wonderful penis, you slam your " + vaginaDescript(0) + " onto his member with impunity, twitching and squeezing involuntarily.  His tainted pre-cum begins seeping deep inside your uterus and you cry out with orgasmic intensity.  Your entire body clenches down, even the hand clamped on the incubus' windpipe. You feel his demon-cock swell up inside you in response to his stress, stretching your cunt taut.  His skin darkens from the lack of oxygen as he begins cumming HARD inside you.  Your womb immediately fills with his demon-seed, leaving ribbons of spunk to drip from your tightly-stretched cunt.  You sigh in delight as your muscles slowly stop quivering.  With a pleasured gasp, you rise off the distended demon-prick, and realize that you've choked your foe into unconsciousness. Still, you did let him cum, so maybe he won't mind too much when he wakes.  Feeling sensual and sated, you redress and prepare to explore the rest of the factory. ", false);
		player.cuntChange(player.vaginalCapacity()*.8, true);
		player.orgasm();
		dynStats("cor", 2);
		cleanupAfterCombat();
		return;
	}
}

//Service the incubus after winning (WHY DO THIS?  BECAUSE ITS HOT!)
public incubusVictoryService():void {
	player.slimeFeed();
	MainScreen.text("", true);
	MainScreen.text("You lick your lips, moistening them as you decide that the demon will provide your next 'snack'.  Touching the defeated incubus' soft skin, you grab him by the wrists and yank him to his clawed feet. Leaning him back against the wall as he sways unsteadily, you tenderly slide down his body and take the measure of his monstrous meat with your hands. The smooth skin and tiny bumps slide between each finger as his manhood firms and twitches in response.  You glance up and grab his baseball size nuts, caressing the smooth hairless sack that contains them, watching the demon-man sigh and relax with equal parts desire and relief.\n\n", false);
	MainScreen.text("You lean forwards, opening your mouth ", false);
	if(player.hairLength > 10) MainScreen.text("and brushing a strand of " + player.hairColor + " out of the way ", false);
	MainScreen.text("as his shiny purplish monster-cock fills your view. You kiss the tip, swirling your tongue around the nubbly ridge that surrounds the crown.  After a few moments of your tongue's focused attention, you are rewarded with a dollop of slightly sweet pre-cum.  You pause momentarily to smile at your victim before you wrap your hand around as much of him as you can hold and start to jack him off, slowly cramming more and more of his length inside your mouth.  Your free hand continues to fondle his balls, occasionally sliding a finger along the inside of his thigh.\n\n", false); 
	MainScreen.text("You feel his balls begin to grow. Perhaps he can sense your thirst for cum, or maybe he just wants to enjoy it - but you are sure he is going to finish spectacularly. They stop swelling just as they reach the size of grapefruits, tingling and pulsing spectacularly in your hand.  You stroke him faster, letting you guzzle his pre as it pours into your greedy mouth.  A coo of delight escapes from your tightly-stretched lips as you savor his tasty fluids.\n\n", false);
	MainScreen.text("The incubus' hips begin humping your face, stuffing a few more inches of his length into your throat and forcing you to struggle against gagging.  His cock swells wider and nearly unhinges your jaw as you feel a gooey warmth wash your throat, flooding your gullet with demon-seed.  Still impaled on his nubby member, your body is rocked back and forth by the strength of his orgasm, the motions making your belly slosh with an increasingly large load.  You moan at the warmth of his corruption seeping through your body as his orgasm diminishes. Yanking back hard, you let his dick slip free of your mouth as the last spurt of cum blasts your face.\n\n", false); 
	MainScreen.text("You push the exhausted demon down and idly collect the cum from your face with your fingers, slowly licking each clean.  Feeling rather sensual and sated, you decide to resume exploring the factory.\n\nAfter redressing you turn about, and see the demon is gone, leaving only a small pool of cum in his wake.", false);
	cleanupAfterCombat();
	return;
}

private omnibusStartCombat():void {
	spriteSelect(16);
	MainScreen.clearText();
	MainScreen.text("You strike a combat pose and prepare your " + player.weaponName + ".  She smiles and saunters around the desk, letting something bulbous and fleshy drop free from between her nether-lips.  You watch in shock as it hardens into a dick, growing right from where her clit should be.\n\nShe taunts, \"<i>Like what you see cow?  I'll be sure to visit you in the pens.</i>'\"");
	player.statusAffects.add(new StatusAffect("FactoryOmnibusDefeated", 0, 0, 0, 0))); //This won't matter if you lose to her
	startCombat(new OmnibusOverseer(), true);
}

private omnibusAcceptOffer():void {
	spriteSelect(16);
	MainScreen.clearText();
	MainScreen.text("She smiles, sauntering closer.  Your eyes widen in shock as her vulva are spread apart by something inside her.   A slick and growing cock emerges, sprouting from where her clit should be located.  She's a hermaphrodite.  You don't have time to contemplate the implications, as the demoness used your temporary distraction to sink a needle into your neck.  You sigh and black out almost instantaneously, letting her catch you with her strong arms and soft bosom.");
	doNext(factoryFinisher);
}

public omnibusVictoryEvent():void {
	MainScreen.clearText();
	if (monster.lust > 99) {
		MainScreen.text("The omnibus trembles where she stands, her proud demonic dick twitching and pulsating as her desires totally overwhelm her.  The tainted nodules covering the purplish hermaphrodite's member ripple and swell from the base towards the tip, culminating with an explosive eruption of sticky, white demon-seed.  She moans with shame and pleasure, pumping larger and larger volumes of cum onto her office's floor.  She drops to her knees, too exhausted and ashamed by her premature orgasm to continue fighting.\n\n");
		MainScreen.text("\"<i>Ooooh no.  You can't tell the other demons I got off so easily!  I'll never live it down,</i>\" she cries, \"<i>You've beaten me, please if you let me go and promise not to tell the other demons I'll use my magic to give you a gift!  My magic is powerful, I can do nearly ANYTHING with it when the subject desires the changes.</i>\"\n\n");
	}
	else {
		MainScreen.text("The omnibus trembles and drops to her knees, utterly defeated.\n\n");
		MainScreen.text("\"<i>Please, if you'll let me go I could use my magics to give you nearly anything you want!  Just please don't tell the other demons what happened here, I'd never live it down,</i>\" she begs.\n\n");
	}
	MainScreen.text("What do you do?  You could use her boon increase the size of your endowments or maybe regain some of your lost humanity!  Or you could play it safe and turn down her offer.  Although then you'd have to decide to let her go or kill her.");
	menu();
	MainScreen.addButton(0, "GrowBreasts", omnibusVictoryGrowBreasts);
	MainScreen.addButton(1, "Grow Dick", omnibusVictoryGrowDick);
	MainScreen.addButton(2, "Normal-Face", omnibusVictoryNormalFace);
	MainScreen.addButton(3, "Normal-Chest", omnibusVictoryNormalChest);
	MainScreen.addButton(4, "Normal-Groin", omnibusVictoryNormalGroin);
	MainScreen.addButton(5, "Normal-Legs", omnibusVictoryNormalLegs);
	MainScreen.addButton(8, "No (Let go)", omnibusVictoryLetGo);
	MainScreen.addButton(9, "No (Kill Her)", omnibusVictoryKillHer);
}

private omnibusVictoryGrowBreasts():void {
	spriteSelect(16);
	MainScreen.clearText();
	//Grow if none
	if (player.upperBody.chest.count() == 0) {
		MainScreen.text("<b>Your chest swells out, forming rounded C-cup globes, capped with tiny erect nipples!</b>");
		player.createBreastRow();
		player.upperBody.chest.list[0].breastRating = 3;
		player.upperBody.chest.BreastRatingLargest[0].nippleLength = .25;			
	}
	//Singular row - cup size + 3.  Nipple size to 1" if smaller.
	else if (player.upperBody.chest.count() <= 1) {
		MainScreen.text("Your " + allBreastsDescript() + " tingle pleasantly as the magic takes effect.  You watch with fascination as they begin to swell up, like sponges exposed to water.  The top of your " + player.armorName + " is pulled tight by change, until your chest seems ready to burst free.  <b>You've gained 3 cup sizes!</b>  ");
		player.upperBody.chest.list[0].breastRating += 3;
		if (player.upperBody.chest.BreastRatingLargest[0].nippleLength < .75) {
			player.upperBody.chest.BreastRatingLargest[0].nippleLength += .5;
			MainScreen.text("Your " + nippleDescript(0) + "s grow hard and sensitive, becoming much more noticeable inside your " + player.armorName + ".  It appears your nipples have grown larger to match.");
		}
	}
	//Multiple Rows...
	else {
		//Top row + 3, all other rows brought up to par.
		MainScreen.text("Your top " + breastDescript(0) + " tingle pleasantly as the magic takes effect.  You watch with fascination as they begin to swell up, like sponges exposed to water.  The top of your " + player.armorName + " is pulled tight by change, until your chest seems ready to burst free.  <b>You've gained 4 cup sizes!</b>  ");
		player.upperBody.chest.list[0].breastRating += 4;
		MainScreen.text("The next row of " + breastDescript(1) + " jiggle and tingle with even more pleasure than the first.  They pulsate for a few seconds, shrinking and growing rapidly until they settle at a size just below your top " + breastDescript(0) + ".  ");
		player.upperBody.chest.list[1].breastRating = player.upperBody.chest.list[0].breastRating - 1;
		if (player.upperBody.chest.count() >= 3) {
			MainScreen.text("Your third group of " + breastDescript(2) + " seem to follow their sister's example, tingling briefly before settling at a size just below the breasts above.  ", false);
			player.upperBody.chest.list[2].breastRating = player.upperBody.chest.list[1].breastRating - 1;
		}
		if (player.upperBody.chest.count() >= 4) {
			MainScreen.text("Your remaining " + breastDescript(3) + " feel so wonderful that you just can't resist cupping and squeezing them as they reshape to fit in perfectly with the rest of your breasts.  ");
			player.upperBody.chest.list[3].breastRating = player.upperBody.chest.list[2].breastRating - 1;
			if (player.upperBody.chest.count() == 5) player.upperBody.chest.list[4].breastRating = player.upperBody.chest.list[3].breastRating - 1;
		}
		if (player.upperBody.chest.BreastRatingLargest[0].nippleLength < .75) {
			player.upperBody.chest.BreastRatingLargest[0].nippleLength += .5;
			MainScreen.text("Your " + nippleDescript(0) + "s grow hard and sensitive, becoming much more noticable inside your " + player.armorName + ".  It appears your nipples are have grown larger to match.");
		}
	}
	MainScreen.text("\n\n");
	omnibusVictoryPostBoon();
}

private omnibusVictoryGrowDick():void {
	spriteSelect(16);
	MainScreen.clearText();
	//No dick?  Grow one!
	if (player.lowerBody.cockSpot.count() == 0) {
		MainScreen.text("A sudden pressure builds in your groin.  You look down in wonder, more than a little turned on by the prospect of growing your own penis.  Your skin ripples and bulges outwards, the sensation turning from pressure to feelings of intense warmth.  The bump distends, turning purple near the tip as it reaches three inches in size.  You touch it and cry out with pleasure, watching it leap forwards another inch in response.  Your tiny dick's crown becomes more and more defined as it grows larger, until you have what looks like a normal six inch dick.  You sigh with happiness and desire at your new addition.  Before you can enjoy it, another wave of heat washes through you, making your new addition respond.  It grows painfully hard as it crests eight inches in length.  ");
		if (player.stats.cor < 80)
			MainScreen.text("In horror you watch the skin turn a shiny-dark purple.  Tiny wriggling nodules begin to erupt from the purplish skin, making your cock look more like a crazed sex-toy than a proper penis.  You pant and nearly cum as it lengthens one last time, peaking at ten inches long.  One last ring of nodules forms around the edge of your demon-dick's crown, pulsating darkly with each beat of your horrified heart.");
		else MainScreen.text("Curious, you watch the skin turn a shiny-dark purple.  Tiny wriggling nodules begin to erupt from the purplish skin, making your penis look more like those amazing cocks you saw on demons!  You pant and moan in happiness as it lengthens one last time, peaking at ten inches long.  The excitement of possessing such a magnificent pleasure tool makes you cum.  As one last ring of nodules forms around the edge of your new demon-dick's crown, you notice to your surprise that the liquid you ejaculated is pitch black!  But as your new cock pulsates darkly with each beat of your heart, the only thing you have on your mind is to try it out as soon as possible...");
		player.lowerBody.cockSpot.add(new Cock());
		player.lowerBody.cockSpot.list[0].cockType = CockType.DEMON;
		player.lowerBody.cockSpot.list[0].cockLength = 10;
		player.lowerBody.cockSpot.list[0].cockThickness = 2;
		genderCheck();
	}
	if (player.lowerBody.cockSpot.count() == 1) {
		if (player.demonCocks() < 1) {
			MainScreen.text("You smile, watching your " + cockDescript(0) + " grow longer.  Inches of newfound dick-flesh erupt from your crotch in response to omnibus' dark magics.  Before you can play with your transformed tool, a wave of burning desire passes through you.  ");
			if (player.stats.cor < 80) MainScreen.text("You watch in horror as the skin of your " + cockDescript(0) + " turns shiny and purplish-black.  ");
			else MainScreen.text("Curious, you watch the skin of your " + cockDescript(0) + " turn a shiny-dark purple.  ");
			player.lowerBody.cockSpot.list[0].cockLength += 3 + rand(5);
			player.lowerBody.cockSpot.list[0].thickenCock(2);
			player.lowerBody.cockSpot.list[0].cockType = CockType.DEMON;
			if (player.stats.cor < 50)
				MainScreen.text("Corrupt nodules begin to spring up over its entire length.  <b>Your penis is transforming into a " + cockDescript(0) + "!<\b>  The new nubs wriggle about as they sprout over every inch of surface, save for the head.  Unable to do anything but groan with forced pleasure and horror, you can only watch.  One last batch of nodules forms in a ring around the crown of your " + cockDescript(0) + ", seemingly completing its transformation, until you notice, almost throwing up, that your testicles are also getting covered in black veins under your powerless eyes!  ");
			else MainScreen.text("As you watch expectantly, tiny wriggling nodules begin to erupt from the purplish skin, like those magnificent cocks you saw on demons!  <b>Your penis is transforming into a " + cockDescript(0) + "!<\b>  You pant and moan in happiness as it lengthens one last time.  As you stroke all of its amazing length with both hands, the excitement of possessing such a beautiful pleasure tool makes you cum.  As one last ring of nodules forms around the edge of your " + cockDescript(0) + "'s crown, you notice that the squirts getting out of your cock-slit are not completely white and gradually become darker, the last drops being pitch-black! Your new " + cockDescript(0) + " pulsates darkly with each beat of your heart, but the thick, throbbing veins that are finishing to cover your testicles do not contain blood, but a black liquid which apparently has perverted them. You ponder what its purpose might be, but then you decide, as you stroke the huge, dark, bumpy shaft, that if this feels as good as this looks, it doesn't really matter.  ");
		}
		else {
			MainScreen.text("Your " + cockDescript(0) + " leaps forwards, taking to the dark magic with ease.  Inch after inch of new length erupts from your groin as your " + cockDescript(0) + " gets longer and thicker.  It pulsates, as if promising dark pleasure as it settles into its new enhanced size.");
			player.lowerBody.cockSpot.list[0].cockLength += 6 + rand(10);
			player.lowerBody.cockSpot.list[0].thickenCock(3);				
		}
	}
	if (player.lowerBody.cockSpot.count() > 1) {
		let temp: number = player.lowerBody.cockSpot.count();
		//Already has demoncocks
		if (player.demonCocks() == player.lowerBody.cockSpot.count()) {
			MainScreen.text("Your " + player.multiCockDescriptLight() + " leap forwards, taking to the dark magic with ease.  Inch after inch of new length erupts from your groin as your " + player.multiCockDescriptLight() + " get longer and thicker.  They pulsate, as if promising dark pleasure as they settle into their new enhanced size.");
			while (temp > 0) {
				temp--;
				player.lowerBody.cockSpot.list[temp].cockLength += 6 + rand(10);
				player.lowerBody.cockSpot.list[temp].thickenCock(3);	
			}
		}
		//Not yet full of demoncocks...
		else {
			MainScreen.text("You smile, watching your " + player.multiCockDescriptLight() + " grow longer.  Inches of newfound dick-flesh erupt from your crotch in response to omnibus' dark magics.  Before you can play with your transformed pleasure tools, a wave of burning desire passes through you.  You watch");
			if (player.stats.cor < 80)
				MainScreen.text(" in horror");
			else MainScreen.text(" curiously");
			MainScreen.text(" as the skin of your " + player.multiCockDescriptLight() + " turns shiny and purplish-black.  Corrupt nodules begin to spring up over the entire length of each dick.  ");
			while (temp > 0) {
				temp--;
				player.lowerBody.cockSpot.list[temp].cockLength += 3 + rand(5);
				player.lowerBody.cockSpot.list[temp].thickenCock(2);
				player.lowerBody.cockSpot.list[temp].cockType = CockType.DEMON;
			}
			if (player.stats.cor < 50)
				MainScreen.text("<b>Your dicks are transforming into " + player.multiCockDescriptLight() + "!</b>  The new nubs wriggle about as they sprout over every inch of surface, save for the heads.  Unable to do anything but groan with forced pleasure and horror, you can only watch.  One last batch of nodules forms in a ring around the crowns of your " + player.multiCockDescriptLight() + ", seemingly completing its transformation, until you notice, almost throwing up, that your testicles are also getting covered in black veins under your powerless eyes!  ");
			else MainScreen.text("<b>Your dicks are transforming into " + player.multiCockDescriptLight() + "!</b>  The new nubs wriggle about as they sprout over every inch of surface, save for the heads.  You pant and moan in happiness as they lengthen one last time.  As you stroke all of their amazing length with both hands, the excitement of possessing such a magnificent pleasure tool makes you cum. You lick your fingers eagerly, tasting your new cum, while a last ring of nodules forms around the crowns of your beautiful " + player.multiCockDescriptLight() + ".   Your new " + player.multiCockDescriptLight() + " pulsate darkly with each beat of your heart, but the thick, throbbing veins that are finishing to cover your testicles do not contain blood, but a black liquid which apparently has perverted them. You ponder what its purpose might be, but then you decide, as you stroke a huge, dark, bumpy shaft, that if they feel as good as they look, it doesn't really matter.  ");
		}
	}
	omnibusVictoryPostBoon();
}

private omnibusVictoryNormalFace():void {
	spriteSelect(16);
	MainScreen.clearText();
	let changed:boolean = false;
	if (player.horns > 0 || player.antennae > ANTENNAE.NONE) {
		MainScreen.text("Your forehead itches intensely.  You cannot help but stratch madly at it.  ");
		if (player.horns > 0) {
			MainScreen.text("Your horns fall off, landing on the floor with a heavy thud.  ");
			player.horns = 0;
			player.hornType = HORNS.NONE;
		}
		if (player.antennae > ANTENNAE.NONE) {
			MainScreen.text("Antennae pop free, and float lightly down towards the floor.  ");
			player.antennae = ANTENNAE.NONE;
		}
		changed = true;
	}
	//EARS
	if (player.upperBody.head.earType != EARS.HUMAN) {
		MainScreen.text("Pain erupts from both sides of your head as your ears reform and move, returning to look like your old human ears!  ");
		player.upperBody.head.earType = EARS.HUMAN;
		changed = true;
	}
	//Face
	if (player.faceType != FACE.HUMAN) {
		MainScreen.text("Your facial structure rearranges itself into a normal human visage, exactly like yours was before you came to this horrid place.");
		player.faceType = FACE.HUMAN;
		changed = true;
	}
	//Nothing changed
	if (!changed) MainScreen.text("You tingle briefly but feel no obvious change.  Your face was already fairly human.");
	omnibusVictoryPostBoon();
}

private omnibusVictoryNormalChest():void {
	spriteSelect(16);
	MainScreen.clearText();
	let changed:boolean = false;
	if (player.upperBody.chest.count() > 1) {
		player.removeBreastRow(1, player.upperBody.chest.count() - 1);
		MainScreen.text("Your chest tingles and begins to feel lighter.  You hastily pull open your " + player.armorName + " and realize you only have " + allBreastsDescript() + " now!  ");
		changed = true;
	}
	//Size!
	if(player.upperBody.chest.list[0].breastRating > 7) {
		MainScreen.text("The weighty flesh that constantly hangs from your chest gets lighter and lighter, vanishing rapidly.  ");
		player.upperBody.chest.list[0].breastRating = 3 + rand(5);
		MainScreen.text("You now have " + allBreastsDescript() + ".  ");
		changed = true;
	}
	//Fix nips
	if (player.upperBody.chest.BreastRatingLargest[0].nippleLength > 1) {
		MainScreen.text("Your nipples shrink down to a more normal size.  ");
		player.upperBody.chest.BreastRatingLargest[0].nippleLength = .75;
		changed = true;
	}
	if (player.upperBody.chest.hasFuckableNipples()) {
		MainScreen.text("The vagina-like openings in your nipples close, sealing themselves shut.  ");
		player.upperBody.chest.list[0].fuckable = false;
		changed = true;
	}
	//Normal chest, normal skin
	if (player.skinType != SKIN.PLAIN) {
		MainScreen.text("The skin on your body itches intensely as it sheds its " + player.skinDesc + ", revealing " + player.skinTone + " skin.  ");
		player.skinDesc = "skin";
		player.skinType = SKIN.PLAIN;
		changed = true;
	}
	//Nothing changed
	if (!changed) MainScreen.text("You tingle briefly but feel no obvious change.  Your chest is already fairly human.");
	omnibusVictoryPostBoon();
}

private omnibusVictoryNormalGroin():void {
	spriteSelect(16);
	//Temp used to track changes
	let changed:boolean = false;
	MainScreen.clearText();
	MainScreen.text("You feel a strange shivering sensation pass through you.  ");
	//Remove multiple.
	if (player.lowerBody.cockSpot.count() > 1) {
		MainScreen.text("Your " + player.multiCockDescriptLight() + " shiver and retract back towards your body.  When the process finishes you are left with only your " + cockDescript(0) + ".  ");
		player.lowerBody.cockSpot.remove(1, player.lowerBody.cockSpot.count() - 1);
		genderCheck();
		changed = true;
	}
	//Super long nerf
	if (player.lowerBody.cockSpot.hasCock()) {
		if (player.lowerBody.cockSpot.list[0].cockLength > 12) {
			MainScreen.text("A tingling sensation worms through your " + cockDescript(0) + " as it shrinks down to a more modest eleven inches.  ");
			player.lowerBody.cockSpot.list[0].cockLength = 11;
			changed = true;
		}
		//Super thick nerf
		if (player.lowerBody.cockSpot.list[0].cockThickness > 2) {
			MainScreen.text("Your " + cockDescript(0) + "'s obscene thickness withers down to roughly two inches of girth.  ");
			player.lowerBody.cockSpot.list[0].cockThickness = 2;
			changed = true;
		}
		//Humanitize
		//If demon cocked....
		if (player.lowerBody.cockSpot.list[0].cockType == CockType.DEMON) {
			MainScreen.text("Your " + cockDescript(0) + " tingles as the bumps begin to fade.  After a moment the flesh darkens, and every single nodule reappears.  <b>Your corrupt penis resisted the magic!</b>  ");
			changed = true;
		}
		else if (player.lowerBody.cockSpot.list[0].cockType != CockType.HUMAN) {
			MainScreen.text("The inhuman appearance of your " + cockDescript(0) + " shifts, the flesh rearranging itself into a more human configuration.  After a few seconds you have a very normal looking penis.  ");
			player.lowerBody.cockSpot.list[0].cockType = CockType.HUMAN;
			changed = true;
		}
	}
	//Balls shrink
	if (player.lowerBody.ballSize > 5) {
		MainScreen.text("The " + ballsDescriptLight() + " that constantly pull so heavily on your groin tingle and shrink down to a more managable size.  ");
		player.lowerBody.ballSize = 2 + rand(3);
		changed = true;
	}
	if (changed) MainScreen.text("\n\n");
	//Vajajay
	if (player.lowerBody.vaginaSpot.count() > 0) {
		if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS.SLICK) {
			MainScreen.text("The constant fluids leaking from your " + vaginaDescript(0) + " slow down, then stop.  ");
			player.vaginas[0].vaginalWetness = VAGINA_WETNESS.WET;
			changed = true;
		}		
	}
	//Nothing changed
	if (!changed) MainScreen.text("You tingle briefly but feel no obvious change.  Your crotch isn't really in need of becoming more human.");
	omnibusVictoryPostBoon();
}

private omnibusVictoryNormalLegs():void {
	spriteSelect(16);
	MainScreen.clearText();
	if (player.lowerBody == LOWER_BODY.HUMAN)
		MainScreen.text("You feel as if you should slap yourself for stupidy.  Your legs are already normal!  You flush hotly as the corrupt magics wash over you, changing nothing.");
	else MainScreen.text("You collapse as your " + player.legs() + " are unable to support you.  The sounds of bones breaking and reshaping fills the room, but oddly you feel no pain, only mild arousal.  You blink your eyes and sigh, and when you look down again <b>you have normal human legs</b>!");
	player.lowerBody = LOWER_BODY.HUMAN;
	if (player.tailType > TAIL.NONE) {
		MainScreen.text("  A moment later, your feel something detach from above your backside.  <b>You no longer have a tail!</b>");
		player.tailType = TAIL.NONE;
		player.lowerBody.tailVenom = 0;
		player.lowerBody.tailRecharge = 5;
	}
	omnibusVictoryPostBoon();
}

private omnibusVictoryPostBoon():void {
	MainScreen.text("\n\nThe omnibus disappeared while you were examining the changes.  You guess you did get what you wanted.  You blush and smile, still feeling very horny.  You decide to use the privacy of the office to relieve the tension you've been building up since you arrived.\n\nYou masturbate quickly and efficiently, eager to calm down and resume your exploration.  In no time at all an orgasm crashes through your body.  Stretching and standing up, you find yourself still aroused.\n\nYou slap your forehead as realization washes over you - <b>the demoness' magic is keeping you from ever being totally satisfied!</b>\n(Perk Gained - Omnibus' Gift - Minimum lust has been increased!)");
	player.createPerk(PerkLib.OmnibusGift, 0, 0, 0, 0);
	player.orgasm();
	dynStats("cor", 2);
	cleanupAfterCombat();
}

private omnibusVictoryLetGo():void {
	spriteSelect(16);
	MainScreen.clearText();
	MainScreen.text("You refuse to fall for her ploy, and decide not to take her up on her offer.  However, being that she is so thoroughly defeated, you allow her to escape, promising her far worse should she ever oppose you in the future.\n\n\"<i>Thank you, merciful hero!</i>\" she says and she sprints out the door.  Wings unfurl from her back and she takes flight, disappearing out a skylight above the main factory floor.");
	cleanupAfterCombat();
}

private omnibusVictoryKillHer():void {
	spriteSelect(16);
	MainScreen.clearText();
	MainScreen.text("You step forwards and grab her by the head.  With an abrupt twist you snap her neck, ending at least one small part of the demonic threat.");
	flags[FlagEnum.D1_OMNIBUS_KILLED] = 1;
	cleanupAfterCombat();
}

public omnibusLossRape():void {
	spriteSelect(16);
	MainScreen.clearText();
	if(player.HP < 1) MainScreen.text("You stagger into the desk, clutching tightly just to stay upright.  ", false);
	else MainScreen.text("Forgetting about the fight, you lean on the desk and slide your free hand under your " + player.armorName + ", seeking any pleasure you can get.  ", false);
	MainScreen.text("Sensing victory, the demoness sidles up next to you and pushes you into a chair.  Incapable of resisting, all you can do is watch as she opens your " + player.armorName+ " for easier access.  She steps back and admires her handiwork as she gives you a thorough looking over.\n\n", false);  
	MainScreen.text("\"<i>I have just the thing for a ", false);
	if(player.gender <= 1) MainScreen.text("man", false);
	else MainScreen.text("woman", false);
	MainScreen.text(" such as you.  I've been crossbreeding the parasites that developed in the deep jungle, trying to create the PERFECT slave-maker.  You get to be my first test subject,</i>\" she says.\n\n", false);
	MainScreen.text(" She sees the look of fear creeping into your eyes and pats you comfortingly, \"<i>Awww don't worry. It'll feel REALLY good.  If anything you should feel honored to be assisting an Omnibus in her experiments.</i>\"\n\n", false);
	MainScreen.text(" She opens one of the desk drawers, and searches briefly before her eyes light up with recognition.  \"<i>Here we are,</i>\" she says as she pulls something free...", false);
	doNext(omnibusLossRape2);
}

public omnibusLossRape2():void {
	spriteSelect(16);
	MainScreen.clearText();
	//(Multi dicks)
	if(player.lowerBody.cockSpot.count() > 1) {
		MainScreen.text("In her hand is a mass of shining green material.  She turns to face you, bringing it closer and letting you see the lights shift and change on its luminescent surface.\n\n", false);
		MainScreen.text("\"<i>For someone as... different as you, we will have to try this creature.  I've bred it from a mixture of plant-tentacles, dazzle-weed, and what we've taken to calling pussy plants,</i>\" she mentions, her hands working to open the mass on the table.  The interior surface is a mass of slimy undulating protrusions that wriggle feverishly as they are exposed to the air.  She gathers up the thing in her arms while continuing to speak to you, \"<i>You see, my plant will encapsulate your members tightly, wrapping them in sticky wetness.  Its fluids are a perfect blend of aphrodisiacs, lubricants, and will-sapping narcotics.  You'll love it.</i>\"\n\n", false);
		MainScreen.text("You make a desperate attempt to escape her chair, but your body fails to do much more than squirm in place.  She drops the creature squarely into your crotch and hops up onto her desk to watch.  Thousands of tiny wet nodules immediately begin massaging your " + player.multiCockDescriptLight(), false);
		if(player.lowerBody.balls > 0) MainScreen.text(" and " + ballsDescript(), false);
		MainScreen.text(".  You groan as the pleasure washes over you like a wave.  Your squirming stops as your hips begin twitching into the air, as if begging for even more stimulation.  It's not fair how good this feels... you can't help it, it's just too hard to fight.\n\n", false);
		MainScreen.text("You watch with detached fascination as each of your " + player.multiCockDescript() + " is wrapped tightly in shiny green material.  The shape of each penis is still clearly defined under the pulsating green stuff, though you can see it shifting and rippling over your lengths as it pleasures you.  It almost looks like some kind of kinky bondage-toy.  Aware of your attentions, the green stuff squeezes you tightly and begins flashing beautiful bioluminescent color patterns across its surface that scatter your thoughts as you watch.  You blink a few times as the green mass rolls more of itself out, curling over your ", false);
		if(player.lowerBody.balls > 0) {
			MainScreen.text("balls", false);
			if(player.lowerBody.vaginaSpot.count() > 0) MainScreen.text(" and " + vaginaDescript(0), false);
		}
		else if(player.lowerBody.vaginaSpot.count() > 0) MainScreen.text(vaginaDescript(0), false);
		else MainScreen.text("taint", false);
		MainScreen.text(", sliding up your abdomen, and oozing down over your hips.  As it spreads the colors fill more and more of your head, clearing away your thoughts of resistance.\n\n", false);
		MainScreen.text("A soothing female voice talks to you from somewhere, \"<i>Did I mention it's specifically tuned to ensnare the conscious mind with it's pretty colors?  I must have forgot.  Well, I see you've discovered it on your own.  The colors are just so perfect for opening your mind to me, aren't they?  They just chase away your thoughts and let my words slip deep into your subconscious.  I bet it feels nice to just focus on the colors and let my pet tease your cocks, doesn't it?</i>\"\n\n", false);
		MainScreen.text("You nod without any awareness of the act.\n\nThe voice laughs and continues while the creature reaches around your " + hipDescript() + " and slides a feeler between your cheeks, completing the tight loop around your groin, \"<i>That's good.  You want to let the creature cover as much of you as it wants.  Being sex-food for a symbiotic plant is arousing beyond measure.</i>\"  You feel the creature licking at your " + assholeDescript() + " until it relaxes, and then slides something inside.  A warm wetness spreads through your bowels as something begins caressing your prostate from inside you.\n\n", false);
		MainScreen.text("Overloaded with pleasure, you feel your " + player.multiCockDescriptLight() + " pulse and cum, creating translucent green cum balloons the size of ", false);
		if(player.cumQ() < 50) MainScreen.text("apples ", false);
		if(player.cumQ() >= 50 && player.cumQ() < 300) MainScreen.text("cantaloupes ", false);
		if(player.cumQ() >= 300) MainScreen.text("watermelons ", false);
		MainScreen.text("at the end of each of your dicks.  The creature's flashing intensifies while your hips quake uncontrollably, pumping the last of your load feeds into the wonderful plant.  The light-show grows brighter, totally emptying any remaining stray thoughts and leaving you feeling wonderfully open.\n\n", false);
		MainScreen.text("\"<i>Being used for your cum is great,</i>\" says the voice and you agree, it is great.\n\n", false);
		MainScreen.text("\"<i>Your greatest fetish is allowing demonic creatures to feed on your cum,</i>\" she says, and it feels so right.  Your cum is meant for demons and plants to feast on.  Just the thought makes you want to orgasm again.\n\n", false);
		MainScreen.text("\"<i>Since you provide food-source, that must make you livestock.  You like being livestock.  Livestock don't have to think.  Livestock follow orders.  Best of all, as livestock you can live your favorite fetish of being milked of all your cum, every hour of every day,</i>\" the voice says, filling your mind with new thoughts.  Of course it's right, you can just let a demon or tentacle plant milk you and do all the hard stuff, like thinking.  All you have to do is cum.  The thought makes you shiver as the plant-suit absorbs the encapsulated bubbles of jizz.  The dazzling lights grow even brighter as it takes in the nutrients.\n\n", false);
		MainScreen.text("*FLASH* \"<i>You want to cum for the plant.</i>\"\n\n", false);
		MainScreen.text("Tendrils of plant crawl up your belly, coating you in slime as they massage every inch of you.\n\n", false);
		MainScreen.text("*FLASH* \"<i>You need to cum for the plant.</i>\"\n\n", false);
		if(player.upperBody.chest.count() == 1) MainScreen.text("They reach the lower curve of your breasts.\n\n", false);
		if(player.upperBody.chest.count() > 1) MainScreen.text("They slide over your lowest pair of breasts, encapsulating them in wriggling tightness.\n\n", false);
		MainScreen.text("*FLASH* \"<i>You love cumming for anything and anyone.</i>\"\n\n", false);
		if(player.upperBody.chest.count() == 3) MainScreen.text("Your middle breasts tingle with absolute pleasure as they too become engulfed in tightness.\n\n", false);
		if(player.upperBody.chest.count() == 2) MainScreen.text("You groan as the plant grows up the summit of your top breasts, coating the bottom half of your aureola.\n\n", false);
		if(player.upperBody.chest.count() == 1) MainScreen.text("Your " + nippleDescript(0) + "s become hard as steel as the wave of slick pleasure washes over them.\n\n", false);  
		MainScreen.text("*FLASH* \"<i>You love being told to orgasm.</i>\"\n\n", false);
		if(player.upperBody.chest.count() == 1) MainScreen.text("The wriggling mass slides up the top-most parts of your breasts, narrowing into two tiny tendrils that loop around your neck.\n\n", false);
		if(player.upperBody.chest.count() >= 2) MainScreen.text("The wriggling mass climbs your top pair of breasts with ease, wrapping your diamond-hard nipples in slime and sensation.  It continues climbing upward, narrowing into two bands that loop around the back of your neck.\n\n", false);
		MainScreen.text("*FLASH* \"<i>To orgasm is to obey.  You love to orgasm.  You love to obey.  You love to obey my voice more than any other.  Obeying my voice gave you these orgasms.  Since you love to obey me, you must be my pet.</i>\"\n\n", false);
		MainScreen.text("Your mistress' OTHER pet wraps around your neck, forming a choker comprised of shifting green colors.  You smile as you realize it is done - you've become one of her pet cattle.  Your body is wrapped in an emerald sea of shifting pleasure, just like your mistress wanted.  If it weren't for the obvious bulges of your " + player.multiCockDescriptLight() + ", you'd look to be wearing an extraordinarily revealing one piece swim-suit.  The constant teasing at your crotch continues, and you stay rock-hard, even though you just came.  The idea of being milked to feed your new clothing just turns you on so much that you bet you're leaking constant streams of pre-cum for your new green master.\n\n", false);
		MainScreen.text("The flashing subsides, and your new thoughts rush into the void.  You immediately begin masturbating your encapsulated members as you seek to obey.  To orgasm is to obey.  To obey is to orgasm.  You discover that you can feel every touch through the skin of your 'clothing'.  You increase the tempo, knowing that your orgasm will be feeding the creature that now lives on you, fulfilling your deepest darkest desires.  You cum again, just as hard as before, inflating " + num2Text(player.lowerBody.cockSpot.count()) + " shiny green balloons with the proof of your obedience.\n\n", false);
		
		if(player.statusAffects.has("CampMarble")) {
			MainScreen.text("Suddenly, a loud scream is heard down on the factory floor. You and your mistress turn to see Marble dashing up the stairs to the foremen's office.  Your mistress looks over at her and says with some amusement, \"<i>Oh ho!  So another cow has come to join in the fun.</i>\"\n\n\"<i>Sweetie! What has she done to you?</i>\" Marble exclaims, \"<i>What has she put on you?!</i>\"\n\n\"<i>Oh, so you knew this girl?</i>\" your mistress asks you, \"<i>It's a Lacta Bovine from the looks of it, so it seems this time I'll be adding a real cow to the pens.</i>\"  Marble turns to your mistress and brandishes her hammer, but the horror from the thought of your mistress being hurt causes you to spring forward and grab Marble.  The brief distraction gives your mistress a chance to sink a syringe into Marble's shoulder, and within moments she slumps onto the ground unconscious.\"\n\n", false);
			MainScreen.text("Your mistress turns back to you and smiles.\n\n\"<i>Well, she should make a fine replacement for you in the pens,</i>\" she says before tapping her chin thoughtfully and looking back at you, \"<i>Really is convenient that I don't have to worry about my new pet dying on me now, hun.</i>\"  Then she pushes you back into the chair and says \"<i>But first...\"\n\n", false);
			
		}
		else MainScreen.text("Your mistress looks down with approval and speaks, \"<i>Very good.  ", false);
		MainScreen.text("I want you to stay here and cum 'til morning.  My pet needs lots of nutrition to recharge, and I have plans for new ways to teach you to obey tomorrow.</i>\"\n\n", false);
		MainScreen.text("Happy to have such a wonderful task, you spend the next day being bathed in drugged aphrodisiacs, cumming over and over and over.  Every morning the creature flashes you into obedience while the voice teaches you more and more about how to think.  After a week you're the perfect pet.  By the end of your first month of servitude, any memories of your past life are gone.  You spend the rest of your days feeding your mistress and her pet, and helping her refine and breed her pets in order to teach others the way.", false);
		gameOver();
		return;
	}
	//Dick version
	if(player.lowerBody.cockSpot.count() == 1) {
		MainScreen.text("In her hand is a squirming purplish mass.  It has a smooth outer surface, spotted with dark shades of iridescent purple. The opposite side is comprised of a smooth mucusy membrane covered with wriggling pink cilia.\n\n", false);
		MainScreen.text("She leans over you with a predatory smile, \"<i>This little guy is my favorite.  I've even given him a bit of 'field testing'.</i>\"  She gestures towards a small dripping orifice, explaining, \"<i>You see, once I put this on you, it'll open up niiice and wide.  It'll suck your nice little cock into its mouth and starting squeezing and massaging you with each of its tiny tentacles until you can't help but release all your ", false);
		if(player.stats.cor < 33) MainScreen.text("sweet ", false);
		if(player.stats.cor >= 66) MainScreen.text("tainted ", false);
		MainScreen.text("sexual energies deep into its gullet.  And that's just the start!</i>\"  Her hands let go of the squirming mass, dropping it squarely into your lap.\n\n", false);
		if(player.averageCockLength() < 15) MainScreen.text("With one swift motion, the beast engulfs your " + cockDescript(0) + " in its slimy maw.  ", false);
		else MainScreen.text("Distending obscenely, the beast starts engulfing your " + cockDescript(0) + " in its slimy maw, progressing along its entire length until you can no longer see your pleasure tool.  ", false);		
		MainScreen.text("The slimy tentacles waste no time, massaging you with mechanical precision.  You groan in helpless pleasure, growing to painful hardness within the squirming confines of the creature.  Three protrusions sprout from the creature's core, dripping with slime of their own, and covered on the inside with the same wriggling protrusions that now massage your trapped member.  Two curl around your " + hipDescript() + ", while the last one", false);
		if(player.lowerBody.balls > 0) MainScreen.text(" smothers your balls, entrapping them in sticky sensation as it continues across your taint between your butt-cheeks.  ", false);
		else MainScreen.text(" journeys over your taint before travelling between your butt-cheeks.  ", false);
		MainScreen.text("The three tendrils join together in the back, forming a seemless tiny purple triangle.  It really rides up high, tickling your " + assholeDescript() + " with constant teasing.  You're wearing an organic purple thong!\n\n", false);
		MainScreen.text("You try to endure, but the humiliation is too much for you to take.  The pleasure and shame push you past your limit.  You let out a squeal of mixed agony and delight as the proof of your pleasure boils out into the creature.  You pant and twitch, helpless to resist the strength of your orgasm as your jism fills the creature, distorting it visibly around your member.  Sighing, you relax as the assault winds down, the squirming tentacles relaxing noticeably as they work to digest their 'meal'.\n\n", false);
		MainScreen.text("\"<i>Enjoy yourself?  The best part is about to start,</i>\" she says with an evil glint in her eye.  You sit bolt upright as your living thong squirms and shifts, pressing something rigid against the ring of your " + assholeDescript() + ".  You reach down, trying to pull the creature off, but its outer covering is surprisingly hard, and seals almost perfectly against your " + player.skinDesc + ".  You look up with terror in your eyes, a pleading look painted across your face.\n\n", false);
		MainScreen.text("She cocks her head to the side with an inquisitive look and asks, \"<i>So it's found your back door I take it?</i>\"  You nod sheepishly, squealing as the rigid growth pushes through your sphincter, violating you completely.  She continues with a nonchalant tone, though her eyes seem to be drinking in the scene, \"<i>That thing you feel drilling into your ass?  It's a carefully evolved injection appendage.  Don't worry, once it settles in it won't move much.  It's just going to get nice and cozy with your prostate and a few major blood vessels.  Then it's going to reward you for cumming!</i>\"\n\n", false);
		MainScreen.text("You feel it burrow a little deeper, and then curve up.  It presses against something inside of you in a way that makes your " + cockDescript(0) + " twitch uncontrollably.  You're sure that if it weren't for the greedy tentacle-panties around your dick you would've seen a huge dollop of pre-cum squeeze out.  Filled with angst and worry as to what is to come, you ask, \"<i>Ummm, h-h-how is it going to reward me?</i>\"\n\n", false);
		MainScreen.text("She winks, petting the mottled surface of your purple-cock-prison as you feel a sensation of warm wetness in your backside.  At the same time you nearly jump as you feel a painful pinch in your prostate.  The demoness licks her lips and answers, \"<i>Well, it rewards you in two ways pet.  One:  It empties a specially designed cocktail of drugs directly into your bowels, where they'll be absorbed slowly into the body.</i>\"  As if on cue a gentle warmth spreads through your torso, radiating out into your limbs, and settling like calming mist in your head.  You relax utterly, enjoying the feeling in spite of your worries.\n\n", false);
		MainScreen.text("She coos, petting your still-hard member and the creature around it.  Miraculously you can feel both the touch of her silky fingers and the constant pleasurable squirming of the panties themselves.  You twitch your " + cockDescript(0) + " against her hand, giggling happily.\n\n", false);
		MainScreen.text("\"<i>That's right, it's a good reward isn't it?</i>\" she asks as she continues to fondle you, \"<i>those drugs are making you docile and extraordinarily suggestible.  For instance – every time I talk you can feel my hands caressing and fondling your member", false);
		if(player.lowerBody.balls > 0) MainScreen.text(" and teasing your balls", false);
		MainScreen.text(".  You see?  I'm not even touching you anymore and you're still twitching.  My my, what an obedient slave you're going to be.</i>\"\n\n", false);
		MainScreen.text("You pant and groan while she talks to you, still feeling the combined efforts of the panty-creature and your master's wonderful hands, \"<i>And I haven't even told you about the second part of your reward.  If you want me to tell you, you'll need to admit out loud what we both already know – that you're my obedient slave-toy.  Say it toy.</i>\"\n\n", false);
		MainScreen.text("\"<i>I-I-I'm your obedia—ahhh-nt s-s-lave toy,</i>\" you moan.  As soon as the words leave your mouth, you know it's true, but that settles in the back of your mind.  You're eager to know how the creature and your mistress will reward you for being such an obedient-toy.  And of course, to get her talking again so you can feel those smooth fingertips caress you once more.\n\n", false);
		MainScreen.text("\"<i>You really are my good toy already, aren't you?</i>\" she muses, \"<i>You just love pleasing, me don't you toy?</i>\"  You nod feverishly, eliciting a happy laugh from your mistress as she lectures you, \"<i>The second part of your reward is an injection of its venom directly into your prostate.  You may not have noticed with the constant teasing your cock is enduring, but by now your prostate should have doubled in size.  If I ever separate you and your training-suit, you'll notice you're producing so much pre-cum that it's dribbling out ALL the time.  Your orgasms won't get much bigger, but you'll find yourself pouring out pre as you get more and more turned on.  After all, my baby here needs to feed.</i>\"\n\n", false);
		MainScreen.text("Your mistress pats your obscene purple panties tenderly and whispers in your ear, \"<i>Be a good toy and cum for mistress.</i>\"  You smile broadly as your hips piston in the air, as if fucking an imaginary twat.  Cum boils out from your ", false);
		if(player.lowerBody.balls > 0) MainScreen.text(ballsDescriptLight() + " and ", false);
		MainScreen.text(" over-sized prostate, filling the chamber around your cock with thick blasts of seed.  You smile happily as the tentacle-chamber distorts to hold your load, bulging out into a more spherical appearance.  You slump down as your orgasm finishes and you begin to feel even more 'reward' fill your now greedy-hole.\n\n", false);
		if(player.statusAffects.has("CampMarble")) {
			MainScreen.text("Suddenly, a loud scream is heard down on the factory floor. You and your mistress turn to see Marble dashing up the stairs to the foremen's office.  Your mistress looks over at her and says with some amusement, \"<i>Oh ho!  So another cow has come to join in the fun.</i>\"\n\n\"<i>Sweetie! What has she done to you?</i>\" Marble exclaims, \"<i>What has she put on you?!</i>\"\n\n\"<i>Oh, so you knew this girl?</i>\" your mistress asks you, \"<i>It's a Lacta Bovine from the looks of it, so it seems this time I'll be adding a real cow to the pens.</i>\"  Marble turns to your mistress and brandishes her hammer, but the horror from the thought of your mistress being hurt causes you to spring forward and grab Marble.  The brief distraction gives your mistress a chance to sink a syringe into Marble's shoulder, and within moments she slumps onto the ground unconscious.\"\n\n", false);
			MainScreen.text("Your mistress turns back to you and smiles.\n\n\"<i>Well, she should make a fine replacement for you in the pens,</i>\" she says before tapping her chin thoughtfully and looking back at you, \"<i>Really is convenient that I don't have to worry about my new pet dying on me now, hun.</i>\"  Then she pushes you back into the chair and says \"<i>But first...</i>\"\n\n", false);
		}
		MainScreen.text("Your mistress pats your head and whispers commands in your ear while the now-sated slave-making creature devours your cum, turning it into more 'reward'.  You don't pay attention to her words, what's important is serving mistress and cumming for your panty-toy as often as possible.  You don't need to worry, she will tell you what to think.  She's just so perfect and amazing, you don't know why anyone would want to harm her or her wonderful creations.  'Gods it feels good to obey' is the last thought your mind ever thinks for itself.\n\n", false);
		MainScreen.text("In the days to come, you spend your time being teased by your new mistress until you feel as if you'll burst, then being brought to sudden explosive orgasms that fill your panty-prison to capacity.  After every session you black out, but each time you mind less and less.  You wanted to be here, having these wonderful orgasms and obeying your beautiful mistress.\n\n", false);
		MainScreen.text("After a month she starts letting you live without your favorite panties.  You beg her to put them back on you, but she often makes you crawl around the factory, pooling pre-cum everywhere from your swollen prick as you beg her to be put back into the pleasure-panties.  Sometimes, if you're lucky, she'll fuck you, or send you out to catch another adventurer.  There is nothing you love more than cumming into your tentacle-panties while another one of your mistress' creations teaches a slut how to embrace her true nature.", false);
		gameOver();
		return;
	}
	//(Female) 
	if(player.lowerBody.vaginaSpot.count() == 1 || player.gender == 0) {
		MainScreen.text("In her hand is a seamless pair of panties.  Their surface reflects light perfectly, as if its bright pink surface were coated in slippery oil or made from latex.  ", false);
		if(player.gender == 0) {
			MainScreen.text("The demoness smiles with wicked intent and yanks the bottoms of your " + player.armorName + " the rest of the way off.  Your lack of genetalia does not faze her, and she responds by swiftly pulling out a needle and injecting your groin.  In seconds your crotch splits open, revealing a fresh virgin vagina.  Licking her perfect lips with anticipation, she inverts the panties and holds them up for you to see.\n\n", false);
			player.createVagina();
		}
		else MainScreen.text("The demoness smiles with wicked intent and yanks your " + player.armorName + "'s bottom the rest of the way off.  She leans close, smiling and inhaling the scent of your sex, savoring it like a aroma of a fine wine.  Licking her perfect lips with anticipation, she inverts the panties and holds them up for you to see.\n\n", false);
		MainScreen.text("They aren't panties at all, but instead some living creature.  The entire inside surface of the living garment is covered with fleshy pink nodules that wriggle constantly, practically dripping with a pungent lubricant that smells not unlike your own juices.  Horrifyingly, there is a large lump of flesh towards the front.  Its surface is ribbed and pulses, constantly swelling and shrinking.  It's clearly designed to enter the passage of anyone who wears it.  Worse yet is a smaller narrower protrusion on the backside.  This... creature... will certainly do its best to plug both your holes.\n\n", false);
		MainScreen.text("Your captor pulls it back and leans closer, letting the scent of her own fragrant puss fill the air.  It smells tangy and sweet and makes you ", false);
		if(player.vaginas[0].vaginalWetness <= VAGINA_WETNESS.WET) MainScreen.text("wet ", false);
		else if(player.vaginas[0].vaginalWetness <= VAGINA_WETNESS.DROOLING) MainScreen.text("drip on the chair ", false);
		else MainScreen.text("soak the chair ", false);
		MainScreen.text("from the heady taste that clings to your nostrils.  She speaks with confidence, \"<i>You needn't worry my dear.  I call this little creature my slut-panties.  You see, when you wear them they will stimulate every part of you.  They'll suck on your clit while the two large mounds grow inside you, filling you with wriggling pleasure.  Their slime is a wonderful lubricant and a mild aphrodisiac.  Between the constant touches and its secretions, you'll be horny and on the edge of orgasm in no time.</i>\"\n\n", false);
		MainScreen.text("You shake your head in desperate denial and start to cry as you realize she intends to keep you locked in some kind of hellish pleasure-prison.  The panties slide up your legs with ease, and with a swift movement, the demon lifts your ass up and slips them into position with a wet 'SQUELCH'.  You moan as it goes to work, wrapping your " + clitDescript() + " in slippery tightness.  The two 'lumps' you observed elongate, the ridged surfaces making your " + vaginaDescript(0) + " quiver and dance with pleasure.  In mere seconds you're panting hotly and ready to cum.  Your crying devolves into heated moans of pleasure and longing.\n\n", false);
		MainScreen.text("Bright red eyes fill your vision as the beautiful visage comes closer.  She whispers hotly in your ear, \"<i>I bet it feels good doesn't it?  Do you feel wet and horny?  I bet you'd love to throw yourself on my cock and get off right now.</i>\"\n\n", false);
		MainScreen.text("You blink away the tears and nod frantically; you're so close!  But every time you feel an orgasm start to build the creature eases up just enough to keep you away from your orgasm.\n\n", false);
		MainScreen.text("\"<i>You see, these panties are attuned to our kind.  I've worked hard to breed a pair that could be taught to only provide release when a demon cums in or on them.  Fortunately for you, the nodules will actually open to allow a demon's dick in either passage.  And just for our succubi friends, they can grow a protrusion from the front, and transmit the sensations to you,</i>\" she says as she demonstrates by bringing her throbbing purplish prick close to your pink-enclosed groin.  The surface of the panties splits with a line down the front, reshaping to reveal your pink-covered camel-toe.\n\n", false);  
		MainScreen.text("She asks, \"<i>I won't be a rapist my dear.  This cock will only enter you if you desire the pleasure it can bring you.  You could say no and just enjoy being on the edge until your will finally crumbles.</i>\"\n\n", false);
		if(player.statusAffects.has("CampMarble")) {
			MainScreen.text("Suddenly, a loud scream is heard down on the factory floor. You and your mistress turn to see Marble dashing up the stairs to the foremen's office.  Your mistress looks over at her and says with some amusement, \"<i>Oh ho!  So another cow has come to join in the fun.</i>\"\n\n\"<i>Sweetie! What has she done to you?</i>\" Marble exclaims, \"<i>What has she put on you?!</i>\"\n\n\"<i>Oh, so you knew this girl?</i>\" your mistress asks you, \"<i>It's a Lacta Bovine from the looks of it, so it seems this time I'll be adding a real cow to the pens.</i>\"  Marble turns to your mistress and brandishes her hammer, but the horror from the thought of your mistress being hurt causes you to spring forward and grab Marble.  The brief distraction gives your mistress a chance to sink a syringe into Marble's shoulder, and within moments she slumps onto the ground unconscious.\"\n\n", false);
			MainScreen.text("Your mistress turns back to you and smiles.\n\n\"<i>Well, she should make a fine replacement for you in the pens,</i>\" she says before tapping her chin thoughtfully and looking back at you, \"<i>Really is convenient that I don't have to worry about my new pet dying on me now, hun.</i>\"  Then she pushes you back into the chair and says \"<i>But first, didn't you want something from me?</i>\"\n\n", false);
			
		}
		MainScreen.text("It takes less than a second for you to moan out, \"<i>Taaaaake meeeee!</i>\"\n\n", false);
		MainScreen.text("She smiles and lifts you up from the chair with her strong arms, and sits down on the desk.  She lowers your symbiote-covered lips onto her demon dick and coos with delight as you slide down her length, taking the entire thing in your greedy depths.  If anything, the creature inside you makes sex even better - you feel a combination of her nub-covered cock fucking you and the ridges of the panty-creature as it continues to stimulate you.  It drives you mad with pleasure, and you begin bouncing yourself up and down, spearing your " + vaginaDescript(0) + " with the demon's pole.\n\n", false);
		MainScreen.text("She giggles and reaches down.  Too aroused to care, you just keep fucking her and moaning in delight.  Her hands come up and begin to massage and rub your " + allBreastsDescript() + " taking special care to tweak and tug on your nipples.  They become as hard as ", false);
		if(player.upperBody.chest.BreastRatingLargest[0].nippleLength < .5) MainScreen.text("erasers ", false);
		else if(player.upperBody.chest.BreastRatingLargest[0].nippleLength < 3) MainScreen.text("bullets ", false);
		else MainScreen.text("tiny cocks ", false);
		MainScreen.text("in moments", false);
		if(player.biggestLactation() > 2) MainScreen.text(" and start to drip with milk", false);
		MainScreen.text(".  You sigh with disappointment when her hands drop away.  You were so close to orgasm.  She reaches back up and places something wet and warm on ", false);
		if(player.upperBody.chest.count() <= 1) MainScreen.text("your " + nippleDescript(0), false);
		if(player.upperBody.chest.count() > 1) MainScreen.text("your top " + nippleDescript(0), false);
		MainScreen.text(".  You look down and see two star-shaped creatures made of glistening pink (just like your panties!) attached to your " + nippleDescript(0) + "s.  They pulse and ripple as they constantly massage and suck.  ", false);
		if(player.biggestLactation() > 1) MainScreen.text("Your milk erupts, spraying out from a tiny hole in the center of the star.  In response the creature increases the force of its sucking action, making you fountain milk constantly.  ", false);
		if(player.upperBody.chest.count() > 1) MainScreen.text("While you continue to fuck that meat pole and watch the creatures squirming on your nipples, more are affixed to each of your remaining " + nippleDescript(0) + "s, until every single one is covered with its own tiny pleasure-creature.\n\n", false);
		MainScreen.text("A flood of hot demonic spunk unloads into your aching " + vaginaDescript(0) + ", filling you with warmth.  The panty-plug in your backside seems to erupt as well, dumping a flood of undiluted aphrodisiacs into your body.  You squeal and cum, your eyes rolling back with pleasure as you sink down on the quivering member of your captor.  You twitch and moan, orgasming for far longer than the dick inside of you.  The pleasure goes on for minute after minute.  Your " + nippleDescript(0) + "s each radiate satisfaction and pleasure as they manage to provide you with miniature orgasms of their own.  You moan, feeling relief at last and losing yourself in the wave of satisfaction that fills your body.\n\n", false);
		MainScreen.text("You blink a few times, and sit up, finding yourself back in the chair.  Your pink panty-creature has closed back up, trapping the demon's cum inside you.  The corrupted seed is so potent you can actually feel it tainting your body further as it spreads into your core.  You stretch languidly as you try to recover from the best orgasm of your life.  Perhaps you can escape?  No, you can't leave, the panties are already massaging your aching cunt and toying with your still-hard " + clitDescript() + ".  You squirm as it affects you, ramping your body's desires back up to the max.  Maybe if you take a load in the front AND back at the same time it'll sate the creature long enough for you to escape....\n\n", false);
		MainScreen.text("You set off into the factory, looking for the Omnibus and an Incubus to help.\n\n", false);
		MainScreen.text("<b>One month later:</b>\nYou lick the demonic jism from your lips and stretch, happy your mistress provided you with your fifth orgasm of the morning.  Normally she only lets her favorite slut get her off three or four times before lunch.  You squirm as your panties go to work, taking you back to that wonderful plateau of pleasure that only your masters and mistresses can bring you down from.  Thinking back, this really is the best way for things to end.  You thank your mistress and ask if you can see if any of the imps want to knock you up again.  She smiles condescendingly and nods, making your cunt squeeze with happiness.  Imps have such great cum!", false);
		gameOver();
		return;
	}
}
//[Turn Demon]
public demonBadEnd():void {
	MainScreen.text("", true);
	MainScreen.text("Advancing slowly, the succubus gives you a hungry look.  She extends a hand, allowing her fingers to lengthen into razor-sharp claws.  With a single expert slash, she cuts away everything holding together your " + player.armorName + ".  They fall into a discarded pile, already forgotten as your ", false);
	//[genderless]
	if(player.gender == 0) {
		MainScreen.text("entire body blushes read before the sexy seductress.  She looks at you, frowning as she murmers, \"<i>Now this just won't do.  You look more like a " + player.boyGirl() + " to me, so why don't I make the plumbing match the exterior?</i>\"\n\n", false);  
		MainScreen.text("Her palm caresses your crotch, stoking the warmth inside you until it blazes white-hot with new sensation.  Your skin ripples and parts, ", false);
		if(player.upperBody.chest.BreastRatingLargest[0].breastRating <= 1) {
			MainScreen.text("pushed apart the thick flesh of a powerful demonic member, complete with two swollen balls.", false);
			player.gender = 1;
			player.lowerBody.cockSpot.add(new Cock());
			player.lowerBody.cockSpot.list[0].cockLength = 10;
			player.lowerBody.cockSpot.list[0].cockThickness = 2;
			player.lowerBody.cockSpot.list[0].cockType = CockType.DEMON;
			player.lowerBody.balls = 2;
			player.lowerBody.ballSize = 3;
		}
		else {
			MainScreen.text("gushing with fluids as it shapes itself into a hungry demonic cunt.", false);  
			player.gender = 2;
			player.createVagina();
			player.vaginas[0].vaginalWetness = VAGINA_WETNESS.SLICK;
		}
		MainScreen.text("\n\n\"<i>Much better,</i>\" the demon coos, licking her lips as your ", false);
	}
	//[male]
	if(player.gender == 1) {
		//Multispoooooo
		if(player.lowerBody.cockSpot.count() > 1) {
			MainScreen.text(player.multiCockDescriptLight() + " pulsate, straining for just a touch of the succubus' hand.  She paces around you, giggling and toying with you as your " + player.multiCockDescript() + " seem to follow her, twitching and thickening any time she takes a step closer.\n\n", false);
			MainScreen.text("She reaches out, cupping the underside of a shaft, slowly stroking your most sensitive places while she stops the bimbo-like voice and teases, \"<i>Awww, so hard and ready.  It looks to me like you're already a slave to your desires.  You're twitching and dripping, just from the soft touches of your enemy's fingers.  Are you truly so in need of release as to willingly offer it to me?  No, don't answer, your " + cockDescript(0) + " already has.</i>\"\n\n", false);
			MainScreen.text("You glance down, seeing just how hard her words have made you.  You squirm your " + hipDescript() + "s pathetically, trying to hump her hand and increase the stimulation.  The succubus immediately releases you and draws back, shedding her secretary's clothes like a snake sheds its skin.  Now clad only in a tight leather corset and thigh-high stockings with garters, the succubus tosses you onto a table, surprising you with her raw strength.  Seemingly from nowhere, she produces a whip, winding it tightly around ", false);
			if(player.lowerBody.balls > 0) MainScreen.text("your " + ballsDescriptLight() + " and ", false);
			MainScreen.text("the bases of your " + player.multiCockDescriptLight() + ".\n\n", false);
			MainScreen.text("\"<i>There, that'll make sure you feel every squeeze and caress of my velvet walls, and keep you from getting off until you're ready,</i>\" says the succubus as she climbs the table and straddles your eager form.\n\n", false);
			MainScreen.text("She lifts herself up with her shapely legs and spreads her thighs, proudly revealing her puffy pierced folds.  They drip with demonic nectar as she wiggles over you, spattering you with demon-honey.  Slowly, nearly imperceptibly, she swivels the lewd opening closer and closer, and your cocks, as if possessed, angle themselves upward towards the juicy target.  The grinning succubus looks over her shoulder and asks, \"<i>Ready are we? Ok, I won't keep you waiting.</i>\"\n\n", false);
			MainScreen.text("Marvelous heat and wetness sweeps over you in a fluid motion, wrapping your " + cockDescript(0) + " tightly.  You sigh happily, already lost in the feeling of having a succubus' tight walls wriggling around you.  Were you not already so corrupt, you would probably be coming already, but as it is, you can lie there and enjoy it, reveling in the sensations your unholy lover is spreading through your body.  You shiver, finally approaching your climax, but as it nears you find yourself denied by the whip binding your " + player.multiCockDescriptLight() + ".  It isn't just the physical tightness either – something else about it keeps your release buried deep, inaccessible.\n\n", false);
			MainScreen.text("\"<i>Have you hit it yet?</i>\" the succubus asks as she rocks on top of you, \"<i>I've placed a block inside you.  Don't worry, it's temporary, it'll only stop you from orgasming for a few days...</i>\"\n\n", false);
			MainScreen.text("You moan pitifully, begging for her to remove it and allow you to cum.\n\n", false);
			MainScreen.text("\"<i>Oh I can't remove it,</i>\" she says, \"<i>The only way you'll be rid of it with any sort of certainty is to melt through it with something stronger.  Something, like, I don't know, the focused remains of your soul and humanity.  Now you think on that while I melt away any doubts you might have.</i>\"\n\n", false);
			MainScreen.text("She resumes fucking you, driving you insane with need, all the while fiddling with her clit and pulling up a nipple to lick.  It feels so good, but you NEED to cum.  She fucks you like that for hours, until the table collapses under the pair of you and dumps you both on the floor. More than anything you crave release, and over time you cave in further and further to the need.  In time, you can feel the block weakening, melting, and eroding.  Your life has been distilled down into this one moment, this one desire, this need for release.  The block shatters, melting away under the force of your need.\n\n", false);
			MainScreen.text("A look of shock and pleasure spreads over the succubus's face as you release into her hot snatch, cumming with a force unlike anything you've felt before.  Her walls squeeze and caress in time with your orgasm, milking you of every drop.  Your body clenches and squeezes, shuddering as the orgasm continues for far longer than normal.  Though you don't feel like you're pushing out as much fluid as normal, somehow it feels even better, like a slow drip of pleasure and release.  When at last your " + cockDescript(0) + " empties, you feel drained and strangely energized at the same time, and your entire torso is spattered with rapidly hardening pink crystals.\n\n", false);
			MainScreen.text("The slutty succubus stands up, her puffy vulva coated in a shining pink fluid.  Did that just come out of you?  She grunts, her eyes glowing for a moment as the pink goop disappears into her skin, vanishing entirely.\n\n", false);
			MainScreen.text("\"<i>Ahhhhh,</i>\" she sighs, \"<i>nothing like fresh Lethicite.  Mmmm, yours was potent!</i>\"\n\n", false);
			MainScreen.text("You stand up, dissatisfied at the sudden lack of sensation you're forced to endure.  The gloating demoness looks rather pleased with herself, and brimming with newfound power.  You resolve to ", false);
			if(player.findStatusAffect(StatusAffects.MaraesLethicite) < 0) MainScreen.text("gather some yourself at the next opportunity...", false);
			else MainScreen.text("devour Marae's as soon as you get a chance.", false);
			MainScreen.text("You greedily gather up the lethicite splattered on your body and devour it, turning it into raw demonic power.  You really do need to get more of this... but first you know a certain demoness you intend to wrap around your ", false);
			if(player.demonCocks() > 0) MainScreen.text("growing", false);
			else MainScreen.text("new", false);
			MainScreen.text(" demon-cock for a few more orgasms.", false);
		}
		//SINGLEZ NITE
		else {
			MainScreen.text(player.multiCockDescriptLight() + " pulsates, straining for just a touch of the succubus' hand.  She paces around you, giggling and toying with you as your " + player.multiCockDescript() + " seems to follow her, twitching and thickening anytime she takes a step closer.\n\n", false);
			MainScreen.text("She reaches out, cupping the underside of the shaft, slowly stroking your most sensitive places while she stops the bimbo-like voice and teases, \"<i>Awww, so hard and ready.  It looks to me like you're already a slave to your desires.  You're twitching and dripping, just from the soft touches of your enemy's fingers.  Are you truly so in need of release as to willingly offer it to me?  No, don't answer, your " + cockDescript(0) + " already has.</i>\"\n\n", false);
			MainScreen.text("You glance down, seeing just how hard her words have made you.  You squirm your " + hipDescript() + "s pathetically, trying to hump her hand and increase the stimulation.  The succubus immediately releases you and draws back, shedding her secretary's clothes like a snake sheds its skin.  Now clad only in a tight leather corset and thigh-high stockings with garters, the succubus tosses you onto a table, surprising you with her raw strength.  Seemingly from nowhere, she produces a whip, winding it tightly around ", false);
			if(player.lowerBody.balls > 0) MainScreen.text("your " + ballsDescriptLight() + " and ", false);
			MainScreen.text("the base of your " + cockDescript(0) + ".\n\n", false);
			MainScreen.text("\"<i>There, that'll make sure you feel every squeeze and caress of my velvet walls, and keep you from getting off until you're ready,</i>\" says the succubus as she climbs the table and straddles your eager form.\n\n", false);
			MainScreen.text("She lifts herself up with her shapely legs and spreads her thighs, proudly revealing her puffy pierced folds.  They drip with demonic nectar as she wiggles over you, spattering you with demon-honey.  Slowly, nearly imperceptibly, she swivels the lewd opening closer and closer, and your cock, as if possessed, angles itself upwards towards the juicy target.  The grinning succubus looks over her shoulder and asks, \"<i>Ready are we? Ok, I won't keep you waiting.</i>\"\n\n", false);
			MainScreen.text("Marvelous heat and wetness sweeps over you in a fluid motion, wrapping your " + cockDescript(0) + " tightly.  You sigh happily, already lost in the feeling of having a succubus' tight walls wriggling around you.  Were you not already so corrupt, you would probably be coming already, but as it is, you can lie there and enjoy it, reveling in the sensations your unholy lover is spreading through your body.  You shiver, finally approaching your climax, but as it nears you find yourself denied by the whip binding your " + cockDescript(0) + ".  It isn't just the physical tightness either – something else about it keeps your release buried deep, inaccessible.\n\n", false);
			MainScreen.text("\"<i>Have you hit it yet?</i>\" the succubus asks as she rocks on top of you, \"<i>I've placed a block inside you.  Don't worry, it's temporary, it'll only stop you from orgasming for a few days...</i>\"\n\n", false);
			MainScreen.text("You moan pitifully, begging for her to remove it and allow you to cum.\n\n", false);
			MainScreen.text("\"<i>Oh I can't remove it,</i>\" she says, \"<i>The only way you'll be rid of it with any sort of certainty is to melt through it with something stronger.  Something, like, I don't know, the focused remains of your soul and humanity.  Now you think on that while I melt away any doubts you might have.</i>\"\n\n", false);
			MainScreen.text("She resumes fucking you, driving you insane with need, all the while fiddling with her clit and pulling up a nipple to lick.  It feels so good, but you NEED to cum.  She fucks you like that for hours, until the table collapses under the pair of you and dumps you both on the floor. More than anything you crave release, and over time you cave in further and further to the need.  In time, you can feel the block weakening, melting, and eroding.  Your life has been distilled down into this one moment, this one desire, this need for release.  The block shatters, melting away under the force of your need.\n\n", false);
			MainScreen.text("A look of shock and pleasure spreads over the succubus's face as you release into her hot snatch, cumming with a force unlike anything you've felt before.  Her walls squeeze and caress in time with your orgasm, milking you of every drop.  Your body clenches and squeezes, shuddering as the orgasm continues for far longer than normal.  Though you don't feel like you're pushing out as much fluid as normal, somehow it feels even better, like a slow drip of pleasure and release.  When at last your " + cockDescript(0) + " empties, you feel drained and strangely energized at the same time.\n\n", false);
			MainScreen.text("The slutty succubus stands up, her puffy vulva coated in a shining pink fluid.  Did that just come out of you?  She grunts, her eyes glowing for a moment as the pink goop disappears into her skin, vanishing entirely.\n\n", false);
			MainScreen.text("\"<i>Ahhhhh,</i>\" she sighs, \"<i>nothing like fresh Lethicite.  Mmmm your's was potent!</i>\"\n\n", false);
			MainScreen.text("You stand up, dissatisfied at the sudden lack of sensation you're forced to endure.  The gloating demoness looks rather pleased with herself, and brimming with newfound power.  You resolve to ", false);
			if(player.findStatusAffect(StatusAffects.MaraesLethicite) < 0) MainScreen.text("gather some yourself at the next opportunity...", false);
			else MainScreen.text("devour Marae's as soon as you get a chance.", false);
			MainScreen.text("  But first you know a certain demoness you intend to wrap around your ", false);
			if(player.demonCocks() > 0) MainScreen.text("growing", false);
			else MainScreen.text("new", false);
			MainScreen.text(" demon-cock for a few more orgasms.", false);
		}
	}
	//[female]
	else if(player.gender == 2) {
		MainScreen.text(vaginaDescript(0) + " grows wet and ready, practically juicing itself as the demoness' hand caresses your inner thigh.  She teases, \"<i>Oh my! You're so wet and ready and I haven't even touched your moist little cum-receptacle.  You're a slut aren't you?  Who else would be so turned on by the idea of cumming until all your humanity drips out?</i>\"\n\n", false);
		MainScreen.text("The words make you blush hard, shaming you and stoking the growing fire between your " + player.legs() + ".  You know two things for certain: she's right and you're more turned on that ever.  You don't resist as the demoness easily lifts you up, setting you down on a table with your " + player.legs() + " spread.  \"<i>There,</i>\" she comments, \"<i>now your juicy snatch is on display, just like you've always wanted.</i>\"\n\n", false);
		MainScreen.text("She effortlessly swings her lissomelegs onto the table as she pulls herself up, mounting you as a man might.  You can feel waves of heat rolling off her sex, bathing your own slit in her warmth.  ", false);
		if(player.lowerBody.vaginaSpot.list[0].clitLength >= 2) MainScreen.text("Your " + clitDescript() + " pushes free, nuzzling against her hairless cunt and slipping inside, as if drawn in by its desire.  She openly moans, and begins rocking on top of you.  You gasp in delight as she rides your " + clitDescript() + ", fucking and grinding against it.  ", false);
		else MainScreen.text("She lowers herself down, rubbing smooth hairless netherlips over you, smearing you with her fragrant demon-honey.  You feel her clit grinding on your own, drawing out gasps of delight from both of your mouths as she relentlessly scissors against you.  ", false);
		MainScreen.text("In no time flat you feel your climax building.  Your " + vaginaDescript(0) + " quivers and grows wetter in anticipation.  Tugging on your aching " + nippleDescript(0) + "s and aching for release, you squirm under your demonic mistress, smashing your " + vaginaDescript(0) + " against her in a lewd attempt to find your orgasm.  It does not happen, and you moan in disappointment as the pleasure continues to build, oblivious to your desire for orgasm.\n\n", false);
		MainScreen.text("\"<i>Have you hit it yet?</i>\" the succubus asks as she rocks on top of you, \"<i>I've placed a block inside you.  Don't worry, it's temporary, it'll only stop you from orgasming for a few days...</i>\"\n\n", false);
		MainScreen.text("You moan pitifully, begging for her to remove it and allow you to cum.\n\n", false);
		MainScreen.text("\"<i>Oh I can't remove it,</i>\" she says, \"<i>The only way you'll be rid of it with any sort of certainty is to melt through it with something stronger.  Something, like, oh I don't know, the focused remains of your soul and humanity.  Now you think on that while I grind away any remaining doubts you might have.</i>\"\n\n", false);
		MainScreen.text("The beautiful succubus on top of you picks up the pace, grinding harder against your " + vaginaDescript(0) + " and " + clitDescript() + ", pushing you beyond anything you've ever felt before.  She leans down over you, licking her lips to reveal an inhumanly long tongue.  It snakes down, curving around you " + allBreastsDescript() + " before it arches up to flick a " + nippleDescript(0) + ".  ", false);
		if(player.upperBody.chest.hasFuckableNipples() && player.upperBody.chest.BreastRatingLargest[0].breastRating > 2) MainScreen.text("You gasp as the tongue slides inside each of your breasts, violating them in turn thanks to your strange anatomy.\n\n", false);
		else MainScreen.text("You gasp as it curls around each of your " + nippleDescript(0) + "s in turn, tugging them lewdly.\n\n", false);  
	 	MainScreen.text("She fucks you like that for hours, until the table collapses under the pair of you and dumps you both on the floor. More than anything you find yourself craving release, and over time you cave in further and further to the need.  You start to feel the block weakening, melting, and eroding.  Your life has been distilled down into this one moment, this one desire, and this need for release.  The block shatters, melting away under the force of your need as you explosively orgasm.\n\n", false); 
		MainScreen.text("Sparkling pink fluid splatters between the two of you as you cum, squirting hard", false);
		if(player.vaginas[0].vaginalWetness < VAGINA_WETNESS.SLAVERING) MainScreen.text(" for the first time", false);
		MainScreen.text(".  The succubus throws back her head and lets loose a moan of ecstasy, her entire body shivering with your own as both of your heads fill with fireworks of pleasure.  Nervelessly, she rolls off of you, her tail contracting hard around your leg while the two of you share the moment.\n\n", false);
		MainScreen.text("The succubus interrupts your delight by recovering far faster than you, rolling up to a standing position and watching something between your legs.  You prop yourself up on your elbows to see what the fuss is about.  Between your legs something curious is happening – a trickle of pinkish fluid is still escaping your nethers, rolling towards a rapidly expanding pool, along with every other drop of the pink goop.  Before your very eyes the pool grows until every drop of pink fluid has collected together, and it grows upwards, solidifying into a sparkling crystalline shape.\n\n", false);
		MainScreen.text("Before you can react, she grasps the newly-formed lethicite and noisily begins eating it, her eyes glowing with newfound power.  Watching her makes you more than a little jealous and angry with yourself.  You should've taken the lethicite and gained its power!  No use fretting about it, you can still fuck this succubus for a few hours before you go out in search of your own victims...\n\n", false);
	}
	//[HERM ENDING]
	else {
		//Buh.  Zombie fen need brains.
		MainScreen.text(player.multiCockDescript() + " and " + vaginaDescript(0) + " grow wet and ready, both starting to leak fluids as the succubus' hand traces your inner thigh.  She teases, \"<i>Oh my! You're so wet and ready and I haven't even touched your moist little cum-receptacle.  And that throbbing cock!  How obscene!  You're a slut aren't you?  Who else would be so turned on by the idea of cumming until your humanity is splattered between my legs?</i>\"\n\n", false);
		MainScreen.text("The words make you blush hard, shaming you and stoking the growing fire between your legs.  You know two things for certain: she's right and you're more turned on that ever.  You don't resist as the demoness easily lifts you up, setting you down on a table with your legs spread.  \"<i>There,</i>\" she comments, \"<i>now all of your fun-parts are on display.  Maybe I should call in an incubus and a few imps to watch.  I bet you'd like that wouldn't you?</i>\"\n\n", false);
		MainScreen.text("She effortlessly swings her lissomelegs onto the table as she pulls herself up, mounting you in a single swift motion.  You can feel waves of heat rolling off her sex, bathing your " + cockDescript(0) + " in her warmth.  ", false);
		if(player.lowerBody.vaginaSpot.list[0].clitLength >= 2) MainScreen.text("Your " + clitDescript() + " pushes free, nuzzling against her tight asshole and slipping inside, as if drawn in by its desire.  She openly moans, and begins rocking on top of you.  You gasp in delight as she rides your " + clitDescript() + ", fucking her ass and grinding against it.", false);
		else MainScreen.text("She lowers herself down, rubbing smooth hairless netherlips over your crotch and vulva, smearing you with her fragrant demon-honey.  You feel her clit grinding on your belly, drawing out gasps of delight from both of your mouths as she relentlessly works her body against your own.", false);
		MainScreen.text("\n\nMarvelous heat and wetness wraps your " + cockDescript(0) + " tightly.  You sigh happily, already lost in the feeling of having a succubus' tight walls wriggling around you.  Were you not already so corrupt, you would probably be cumming already, but as it is, you can lie there and enjoy it, reveling in the sensations your unholy lover is spreading through your body.  You shiver, finally approaching your climax, but as it nears you find yourself denied by something deep inside you, pushing away your release and hiding it somewhere inaccessible.\n\n", false);
		MainScreen.text("\"<i>Have you hit it yet?</i>\" the succubus asks as she rocks on top of you, \"<i>I've placed a block inside you.  Don't worry, it's temporary, it'll only stop you from orgasming for a few days...</i>\"\n\n", false);
		MainScreen.text("You moan pitifully, begging for her to remove it and allow you to cum.\n\n", false);
		MainScreen.text("\"<i>Oh I can't remove it,</i>\" she says, \"<i>The only way you'll be rid of it with any sort of certainty is to melt through it with something stronger.  Something, like, I don't know, the focused remains of your soul and humanity.  Now you think on that while I melt away any doubts you might have.</i>\"\n\n", false);
		MainScreen.text("She resumes fucking you, driving you insane with need, all the while fiddling with her clit and pulling up a nipple to lick.  It feels so good, but you NEED to cum.  She fucks you like that for hours, until the table collapses under the pair of you and dumps you both on the floor. More than anything you crave release, and over time you cave in further and further to the need.  Eventually, you can feel the block weakening, melting, and eroding.  Your life has been distilled down into this one moment, this one desire, this need for release.  The block shatters, melting away under the force of your need.\n\n", false);
		MainScreen.text("A look of shock and pleasure spreads over the succubus' face as you release into her hot snatch, cumming with a force unlike anything you've felt before.  Her walls squeeze and caress in time with your orgasm, milking you of every drop.  Your body clenches and squeezes, shuddering as the orgasm continues for far longer than normal.  Though you don't feel like you're pushing out as much fluid as normal, somehow it feels even better, like a slow drip of pleasure and release.  When at last your " + cockDescript(0) + " empties, you feel drained and strangely energized at the same time.\n\n", false);
		MainScreen.text("The slutty succubus stands up, her puffy vulva coated in a shining pink fluid.  Did that just come out of you?  She grunts, her eyes glowing for a moment as the pink goop disappears into her skin, vanishing entirely.\n\n", false);
		MainScreen.text("\"<i>Ahhhhh,</i>\" she sighs, \"<i>nothing like fresh Lethicite.  Mmmm, your's was soooo potent!</i>\"\n\n", false);
		MainScreen.text("You stand up, dissatisfied at the sudden lack of sensation you're forced to endure.  The gloating demoness looks rather pleased with herself, and brimming with her new-found power.  You resolve to ", false);
		if(player.findStatusAffect(StatusAffects.MaraesLethicite) < 0) MainScreen.text("gather some yourself at the next opportunity...", false);
		else MainScreen.text("devour Marae's as soon as you get a chance.", false);
		MainScreen.text("  But first you know a certain demoness you intend to wrap around your ", false);
		if(player.demonCocks() > 0) MainScreen.text("growing", false);
		else MainScreen.text("new", false);
		MainScreen.text(" demon-cock for a few more orgasms.", false);
		MainScreen.text("  Before you get into that, you spy a small piece of pink crystal on the floor between your legs.  You snatch it and devour it before the succubus has a chance and eat it, turning part of your soul into new-found demonic strength before you return to a long night of sex...", false);
	}
	player.orgasm();
	dynStats("str", 2,"tou", 2, "spe", 2, "int", 2, "lib", 2, "sen", 2, "cor", 100);
	doNext(demonBadEnd2);
}
//epilogues
public demonBadEnd2():void {
	MainScreen.text("", true);
	if(player.gender == 1) MainScreen.text("As a demon, you rapidly moved up the ranks, eventually taking command of the factory and its inhabitants.  The previous commander was reduced to a willing cock-sleeve, ever-eager to obey your slightest order.  By the time the next year has come around, you've managed to earn the coveted honor of collecting the next champion.", false);
	else if(player.gender == 2) MainScreen.text("Now a full-fledged demon, you leave the factory, setting off on your own.  Over the next year you capture many foolish mortals, and even convince more than a few of them to give up their souls.  With your rapid gain in power, it's easy to rise in the demonic ranks, and in no time flat your power far exceeds that of the succubus that 'turned' you.  You live in luxury, surrounded by a harem of slaves, waiting in your camp for the next victim to step through...", false);
	else MainScreen.text("As a demon, you rapidly moved up the ranks, eventually taking command of the factory and its inhabitants.  The previous commander was reduced to a willing cock-sleeve, ever-eager to obey your slightest order.  By the time the next year has come around, you've managed to earn the coveted honor of collecting the next champion. It should be quite satisfying...", false);
	gameOver();
}

public takeSupervisorsKey():void {
	MainScreen.clearText();
	MainScreen.text("You search the desk and find a silver key labelled 'Supervisor'.\n\n(Supervisor's Key acquired!)");
	player.createKeyItem("Supervisor's Key", 0, 0, 0, 0);
	doNext(playerMenu);
}

public openPumpRoom():void {
	if (player.hasKeyItem("Supervisor's Key") < 0) {
		MainScreen.clearText();
		MainScreen.text("The door is locked with a key that is not in your possession.");
	}
	else dungeonLoc = DUNGEON_FACTORY_STORE_ROOM;
	dungeonEnterRoom(dungeonLoc);
}

public storageTakeLactaid():void {
	if (player.statusAffects.has("TakenLactaid"))
		player.statusAffects.get("TakenLactaid").value1 = -1;
	else player.statusAffects.add(new StatusAffect("TakenLactaid", 4, 0, 0, 0)));
	inventory.takeItem(consumables.LACTAID, playerMenu);
}

public storageTakeGroPlus():void {
	if (player.statusAffects.has("TakenGroPlus"))
		player.statusAffects.get("TakenGroPlus").value1 = -1;
	else player.statusAffects.add(new StatusAffect("TakenGroPlus", 4, 0, 0, 0)));
	inventory.takeItem(consumables.GROPLUS, playerMenu);
}
