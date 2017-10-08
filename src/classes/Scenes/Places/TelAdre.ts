﻿package classes.Scenes.Places {
	import classes.*;
	import classes.GlobalFlags.FlagEnum;
	import classes.GlobalFlags.kGAMECLASS;
	import classes.Scenes.Places.TelAdre.*;

	/**
 * The lovely town of Tel Adre
 * @author:
 */
	public class TelAdre extends BaseContent
	{
		public let auntNancy:AuntNancy = new AuntNancy();
		public let bakeryScene:BakeryScene = new BakeryScene();
		public let brooke:Brooke = new Brooke();
		public let cotton:Cotton = new Cotton();
		public let dominika:Dominika = new Dominika();
		public let edryn:Edryn = new Edryn();
		public let frosty:Frosty = new Frosty();
		public let heckel:Heckel = new Heckel();
		public let ifris:Ifris = new Ifris();
		public let jasun:Jasun = new Jasun();
		public let katherine:Katherine = new Katherine();
		public let katherineEmployment:KatherineEmployment = new KatherineEmployment();
		public let katherineThreesome:KatherineThreesome = new KatherineThreesome();
		public let library:Library = new Library();
		public let loppe:Loppe = new Loppe();
		public let lottie:Lottie = new Lottie();
		public let maddie:Maddie = new Maddie();
		public let niamh:Niamh = new Niamh();
		public let rubi:Rubi = new Rubi();
		public let scylla:Scylla = new Scylla();
		public let sexMachine:SexMachine = new SexMachine();
		public let umasShop:UmasShop = new UmasShop();

		public TelAdre()
		{
			
		}

//const YVONNE_FUCK_COUNTER: number = 437;

/**
 * 3 variables that define bonuses for piercing.
 */
//{region PiercingVariables

//0) **Clit (+2 sens)
//1) **Dick (+2 lib) adds the word 'pierced' sometimes to the description
//2) **Ears
//3) **Eyebrow (-.5 def)
//4) **Lip (-.5 def)
//5) **Nipples (+1 sens, +1 lib)
//6) **Nose (+.5 attack)
//7) **Tongue (+1 sens)
//8) **Vulva (+1 sens)
public let piercingLoc:number = 0;

//1. Amethyst (+1 int, +1 lib)
//2. Diamond (+2 int, -1 cor)
//3. Gold (+1 int, +1 sens)
//4. Emerald (+1 spe)
//5. Jade (+1 spe, -.5 tou)
//6. Onyx (+1 tou, -1 spe)
//7. Ruby (+1 lib, +1 sens)
//8. Steel (+2 str, -2 int)
public let piercingMat:number = 0;

//1. Stud
//2. Ring (Called prince albert on dick)
//3. Jacobs Ladder (dick only)
//4. Hoop (ears/nipples/clit)
//5. Chain (nipples only)
public let piercingType:number = 0;
//}endregion

public discoverTelAdre():void {
	MainScreen.text("", true);
	if(!player.statusAffects.has("TelAdre")) {
		MainScreen.text("The merciless desert sands grind uncomfortably under your " + LowerBodyDescriptor.describeFeet(player) + " as you walk the dunes, searching the trackless sands to uncover their mysteries.  All of a sudden, you can see the outline of a small city in the distance, ringed in sandstone walls.  Strangely it wasn't there a few moments before.  It's probably just a mirage brought on by the heat.  Then again, you don't have any specific direction you're heading, what could it hurt to go that way?", false);
		MainScreen.text("\n\nDo you investigate the city in the distance?", false);
	}
	else {
		MainScreen.text("While out prowling the desert dunes you manage to spy the desert city of Tel'Adre again.  You could hike over to it again, but some part of you fears being rejected for being 'impure' once again.  Do you try?", false);
	}
	doYesNo(encounterTelAdre,camp.returnToCampUseOneHour);
}

//player chose to approach the city in the distance
private encounterTelAdre():void {
	MainScreen.text("", true);
	if(!player.statusAffects.has("TelAdre")) {
		MainScreen.text("You slog through the shifting sands for a long time, not really seeming to get that close.  Just when you're about to give up, you crest a large dune and come upon the walls of the city you saw before.  It's definitely NOT a mirage.  There are sandstone walls at least fifty feet tall ringing the entire settlement, and the only entrance you can see is a huge gate with thick wooden doors.  The entrance appears to be guarded by a female gray fox who's more busy sipping on something from a bottle than watching the desert.\n\n", false);
		MainScreen.text("As if detecting your thoughts, she drops the bottle and pulls out a halberd much longer than she is tall.\n\n", false);
		MainScreen.text("\"<i>Hold it!</i>\" barks the fox, her dark gray fur bristling in suspicion at your sudden appearance, \"<i>What's your business in the city of Tel'Adre?</i>\"\n\n", false);
		MainScreen.text("You shrug and explain that you know nothing about this town, and just found it while exploring the desert.  The girl stares at you skeptically for a moment and then blows a shrill whistle.  She orders, \"<i>No sudden moves.</i>\"\n\n", false);
		MainScreen.text("Deciding you've nothing to lose by complying, you stand there, awaiting whatever reinforcements this cute vulpine-girl has summoned.  Within the minute, a relatively large-chested centauress emerges from a smaller door cut into the gate, holding a massive bow with an arrow already nocked.\n\n", false);
		MainScreen.text("\"<i>What's the problem, Urta?  A demon make it through the barrier?</i>\" asks the imposing horse-woman.\n\nUrta the fox shakes her head, replying, \"<i>I don't think so, Edryn.  " + player.mf("He's","She's") + " something else.  We should use the crystal and see if " + player.mf("he","she") + "'s fit to be allowed entry to Tel'Adre.</i>\"\n\n", false);
		MainScreen.text("You watch the big centaur cautiously as she pulls out a pendant, and approaches you.  \"<i>Hold still,</i>\" she says, \"<i>this will do you no harm.</i>\"\n\n", false);
		MainScreen.text("She places one hand on your shoulder and holds the crystal in the other.  Her eyes close, but her brow knits as she focuses on something.  ", false);
		telAdreCrystal();
	}
	else {
		MainScreen.text("Once again you find the gray fox, Urta, guarding the gates.  She nods at you and whistles for her companion, Edryn once again.  The centauress advances cautiously, and you submit herself to her inspection as she once again produces her magical amulet.  ", false);
		telAdreCrystal();
	}
}

//Alignment crystal goooooo
private telAdreCrystal():void {
	if(!player.statusAffects.has("TelAdre")) player.statusAffects.add(new StatusAffect("TelAdre",0,0,0,0)));
	//-70+ corruption, or possessed by exgartuan
	if(player.statusAffects.has("Exgartuan") || player.stats.cor >= 70) {
		MainScreen.text("The crystal pendant begins to vibrate in the air, swirling around and glowing dangerously black.  Edryn snatches her hand back and says, \"<i>I'm sorry, but you're too far gone to step foot into our city.  If by some miracle you can shake the corruption within you, return to us.</i>\"\n\n", false);
		MainScreen.text("You shrug and step back.  You could probably defeat these two, but you know you'd have no hope against however many friends they had beyond the walls.  You turn around and leave, a bit disgruntled at their hospitality.  After walking partway down the dune you spare a glance over your shoulder and discover the city has vanished!  Surprised, you dash back up the dune, flinging sand everywhere, but when you crest the apex, the city is gone.", false);
		doNext(camp.returnToCampUseOneHour);
		return;
	}
	//-50+ corruption or corrupted Jojo
	else if(player.stats.cor >= 50 || kGAMECLASS.monk >= 5) {
		MainScreen.text("The crystal pendant shimmers, vibrating in place and glowing a purple hue.  Edryn steps back, watching you warily, \"<i>You've been deeply touched by corruption.  You balance on a razor's edge between falling completely and returning to sanity.  You may enter, but we will watch you closely.</i>\"\n\n", false);
	}
	//-25+ corruption or corrupted Marae
	else if(player.stats.cor >= 25 || player.statusAffects.has("FactoryOverload")) {
		MainScreen.text("The crystal pendant twirls in place, glowing a dull red.  Edryn takes a small step back and murmers, \"<i>You've seen the darkness of this land first hand, but its hold on you is not deep.  You'll find sanctuary here.  The demons cannot find this place yet, and we promise you safe passage within the walls.</i>\"\n\n", false);
	}
	//-Low corruption/pure characters
	else {
		MainScreen.text("The crystal shines a pale white light.  Edryn steps back and smiles broadly at you and says, \"<i>You've yet to be ruined by the demonic taint that suffuses the land of Mareth.  Come, you may enter our city walls and find safety here, though only so long as the covenant's white magic protects us from the demons' lapdogs.</i>\"\n\n", false);
	}
	MainScreen.text("The vixen Urta gestures towards the smaller door and asks, \"<i>Would you like a tour of Tel'Adre, newcomer?</i>\"\n\n", false);
	MainScreen.text("You remember your etiquette and nod, thankful to have a quick introduction to such a new place.  Urta leaves Edryn to watch the gate and leads you inside.  You do notice her gait is a bit odd, and her fluffy fox-tail seems to be permanently wrapped around her right leg.  The door closes behind you easily as you step into the city of Tel'Adre...", false);
	doNext(telAdreTour);
}

private telAdreTour():void {
	player.changeStatusValue(StatusAffects.TelAdre,1,1);
	MainScreen.text("", true);
	kGAMECLASS.urta.urtaSprite();
	MainScreen.text("Urta leads you into the streets of Tel'Adre, giving you a brief run-down of her and her city, \"<i>You see, about two decades back, the demons were chewing their way through every settlement and civilization in Mareth.  The covenant, a group of powerful magic-users, realized direct confrontation was doomed to fail.  They hid us in the desert with their magic, and the demons can't corrupt what they can't find.  So we're safe, for now.</i>\"\n\n", false);
	MainScreen.text("The two of you find yourselves in the center of a busy intersection.  Urta explains that this is the main square of the city, and that, although the city is large, a goodly portion of it remains empty.  Much of the population left to assist other settlements in resisting the demons and was lost.  She brushes a lock of stray hair from her eye and guides you down the road, making sure to point out her favorite pub - \"The Wet Bitch\".  You ", false);
	if(player.stats.cor < 25) MainScreen.text("blush", false);
	else MainScreen.text("chuckle", false);
	MainScreen.text(" at the rather suggestive name as Urta turns around and says, \"<i>With how things are, we've all gotten a lot more comfortable with our sexuality.  I hope it doesn't bother you.</i>\"\n\n", false);
	MainScreen.text("A bit further on, you're shown a piercing parlor, apparently another favorite of Urta's.  A cute human girl with cat-like ears peeks out the front and gives you both a friendly wave.  It's so strange to see so many people together in one place, doing things OTHER than fucking.  The whole thing makes you miss your hometown more than ever.  Tears come to your eyes unbidden, and you wipe them away, glad to at least have this one reminder of normalcy.  Urta politely pretends not to notice, though the tail she keeps wrapped around her leg twitches as she wraps up the tour.\n\n", false);
	MainScreen.text("She gives you a friendly punch on the shoulder and says, \"<i>Okay, gotta go!  Be good and stay out of trouble, alright?</i>\"\n\n", false);
	MainScreen.text("Before you can answer, she's taken off back down the street, probably stopping off at 'The Wet Bitch' for a drink.  Strange, her departure was rather sudden...", false);
	doNext(telAdreMenu);
}

public telAdreMenu():void {
	if(Flags.list[FlagEnum.VALENTINES_EVENT_YEAR] < date.fullYear && player.lowerBody.balls > 0 && player.lowerBody.cockSpot.hasCock() && Flags.list[FlagEnum.NUMBER_OF_TIMES_MET_SCYLLA] >= 4 && Flags.list[FlagEnum.TIMES_MET_SCYLLA_IN_ADDICTION_GROUP] > 0 && isValentine()) {
		kGAMECLASS.crazyVDayShenanigansByVenithil();
		return;
	}
	if(!kGAMECLASS.urtaQuest.urtaBusy() && Flags.list[FlagEnum.PC_SEEN_URTA_BADASS_FIGHT] == 0 && rand(15) == 0 && model.time.hours > 15) {
		urtaIsABadass();
		return;
	}
	if (!kGAMECLASS.urtaQuest.urtaBusy() && kGAMECLASS.urta.pregnancy.event > 5 && rand(30) == 0) {
		kGAMECLASS.urtaPregs.urtaIsAPregnantCopScene();
	   return;
	}
	switch (Flags.list[FlagEnum.KATHERINE_UNLOCKED]) {
		case -1:
		case  0: //Still potentially recruitable
			if (Flags.list[FlagEnum.KATHERINE_RANDOM_RECRUITMENT_DISABLED] == 0 && player.stats.gems > 34 && rand(25) == 0) {
				if (Flags.list[FlagEnum.KATHERINE_UNLOCKED] == 0)
					katherine.ambushByVagrantKittyKats()
				else katherine.repeatAmbushKatherineRecruitMent();
				return;
			}
		case  1: //In alley behind Oswald's
		case  2: //You are training her
		case  3: //You and Urta are training her
			break;
		case  4: //Employed
			if (!katherine.isAt(Katherine.KLOC_KATHS_APT) && Flags.list[FlagEnum.KATHERINE_TRAINING] >= 100) {
				katherineEmployment.katherineGetsEmployed();
				return;
			}
		default: //Has given you a spare key to her apartment
			if (model.time.hours < 10 && rand(12) == 0) { //If employed or housed she can sometimes be encountered while on duty
				katherine.katherineOnDuty();
				return;
			}
	}
	if(Flags.list[FlagEnum.ARIAN_PARK] == 0 && player.level >= 4 && rand(10) == 0 && Flags.list[FlagEnum.NOT_HELPED_ARIAN_TODAY] == 0) {
		kGAMECLASS.arianScene.meetArian();
		return;
	}
	//Display Tel'adre menu options//
	//Special Delivery☼☼☼
	//Has a small-ish chance of playing when the PC enters Tel'Adre.
	//Must have Urta's Key.
	//Urta must be pregnant to trigger this scene.
	//Play this scene upon entering Tel'Adre.
	if (kGAMECLASS.urta.pregnancy.event > 2 && rand(4) == 0 && Flags.list[FlagEnum.URTA_PREGNANT_DELIVERY_SCENE] == 0 && player.hasKeyItem("Spare Key to Urta's House") >= 0) {
		kGAMECLASS.urtaPregs.urtaSpecialDeliveries();
		return;
	}
	if(Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00242] == -1) {
		maddie.runAwayMaddieFollowup();
		return;
	}
	spriteSelect( -1);
	MainScreen.text("Tel'Adre is a massive city, though most of its inhabitants tend to hang around the front few city blocks.  It seems the fall of Mareth did not leave the city of Tel'Adre totally unscathed.  A massive tower rises up in the center of the city, shimmering oddly.  From what you overhear in the streets, the covenant's magic-users slave away in that tower, working to keep the city veiled from outside dangers.  There does not seem to be a way to get into the unused portions of the city, but you'll keep your eyes open.\n\n", true);
	MainScreen.text("A sign depicting a hermaphroditic centaur covered in piercings hangs in front of one of the sandstone buildings, and bright pink lettering declares it to be the 'Piercing Studio'.  You glance over and see the wooden facade of Urta's favorite bar, 'The Wet Bitch'.  How strange that those would be what she talks about during a tour.  In any event you can also spot some kind of wolf-man banging away on an anvil in a blacksmith's stand, and a foppishly-dressed dog-man with large floppy ears seems to be running some kind of pawnshop in his stand.  Steam boils from the top of a dome-shaped structure near the far end of the street, and simple lettering painted on the dome proclaims it to be a bakery.  Perhaps those shops will be interesting as well.", false);
	if (Flags.list[FlagEnum.RAPHEAL_COUNTDOWN_TIMER] == -2 && !kGAMECLASS.raphael.RaphaelLikes()) {
		MainScreen.text("\n\nYou remember Raphael's offer about the Orphanage, but you might want to see about shaping yourself more to his tastes first.  He is a picky fox, after all, and you doubt he would take well to seeing you in your current state.");
	}
	telAdreMenuShow();
}

public telAdreMenuShow():void { //Just displays the normal Tel'Adre menu options, no special events, no description. Useful if a special event has already played
	let homes:boolean = false;
	if (Flags.list[FlagEnum.RAPHEAL_COUNTDOWN_TIMER] == -2 && kGAMECLASS.raphael.RaphaelLikes())
		homes = true;
	else if (player.hasKeyItem("Spare Key to Urta's House") >= 0)
		homes = true;
	else if (Flags.list[FlagEnum.KATHERINE_UNLOCKED] >= 5)
		homes = true;
	else if (Flags.list[FlagEnum.ARIAN_PARK] >= 4 && !kGAMECLASS.arianScene.arianFollower())
		homes = true;
	menu();
	MainScreen.addButton(0, "Shops", armorShops);
	MainScreen.addButton(1, "Bakery", bakeryScene.bakeryuuuuuu);
	MainScreen.addButton(2, "Bar", enterBarTelAdre);
	MainScreen.addButton(3, "Gym", gymDesc);
	if (homes) MainScreen.addButton(4, "Homes", houses);
	if (Flags.list[FlagEnum.ARIAN_PARK] > 0 && Flags.list[FlagEnum.ARIAN_PARK] < 4) MainScreen.addButton(5, "Park", kGAMECLASS.arianScene.visitThePark);
	MainScreen.addButton(6, "Pawn", oswaldPawn);
	MainScreen.addButton(7, "Tower", library.visitZeMagesTower);
	MainScreen.addButton(8, "Weapons", weaponShop);
	MainScreen.addButton(9, "Leave", camp.returnToCampUseOneHour);
}

private armorShops():void {
	menu();
	MainScreen.addButton(0,"Blacksmith",armorShop);
	MainScreen.addButton(1,"Piercing",piercingStudio);
	MainScreen.addButton(2, "Tailor", tailorShoppe);

	if (Flags.list[FlagEnum.LOPPE_PC_MET_UMA] == 1)
	{
		MainScreen.addButton(3, "Clinic", umasShop.enterClinic);
	}

	MainScreen.addButton(4,"Back",telAdreMenu);
}

public houses():void {
	MainScreen.clearText();
	MainScreen.text("Whose home will you visit?");
	let orphanage:Function = null;
	if(Flags.list[FlagEnum.RAPHEAL_COUNTDOWN_TIMER] == -2) {
		if(kGAMECLASS.raphael.RaphaelLikes())
		{
			orphanage = kGAMECLASS.raphael.orphanageIntro;
		}
		else {
			MainScreen.text("\n\nYou remember Raphael's offer about the Orphanage, but you might want to see about shaping yourself more to his tastes first.  He is a picky fox, after all, and you doubt he would take well to seeing you in your current state.");
		}
	}
	menu();
	if(Flags.list[FlagEnum.ARIAN_PARK] >= 4 && !kGAMECLASS.arianScene.arianFollower()) MainScreen.addButton(0,"Arian's",kGAMECLASS.arianScene.visitAriansHouse);
	MainScreen.addButton(1,"Orphanage",orphanage);
	if (kGAMECLASS.urtaPregs.urtaKids() > 0 && player.hasKeyItem("Spare Key to Urta's House") >= 0)
		MainScreen.addButton(2, "Urta's House", (katherine.isAt(Katherine.KLOC_URTAS_HOME) ? katherine.katherineAtUrtas : kGAMECLASS.urtaPregs.visitTheHouse));
	if (Flags.list[FlagEnum.KATHERINE_UNLOCKED] >= 5) MainScreen.addButton(3, "Kath's Apt", katherine.visitAtHome);
	MainScreen.addButton(9,"Back",telAdreMenu);
}

private piercingStudio():void {
	spriteSelect(63);
	let about:Function = null;
	if(!player.statusAffects.has("Yara")) about = aboutYara;
	MainScreen.text("", true);
	MainScreen.text("The interior of the piercing studio is earthy, leaving the stone floors and walls uncovered, though the windows are covered with woven blankets, sewn from multicolored threads.  There are a number of cushy chairs facing a wall of mirrors, along with a shelf covered in needles, piercings, and strong alcohols.  A brunette prowls about the place, tidying it up during a lull in business.  You dully notice that unlike everyone else in this town, she's mostly human.  Perhaps she came through a portal as well?  She approaches you, and you see a cat tail waving behind her, and a pair of fuzzy feline ears, both covered in piercings, perched atop her head.  Clearly she's been here long enough to pick up some of the local flavor.\n\n", false);
	MainScreen.text("She introduces herself, \"<i>Hello there " + player.mf("sir","cutie") + ", my name is Yara.  Would you like to get a piercing?</i>\"", false);
	if (!Flags.list[FlagEnum.LOW_STANDARDS_FOR_ALL])
		simpleChoices("Pierce", pierceMenu, "Remove", piercingRemove, "About Her", about, "", null, "Leave", telAdreMenu);
	else
	{

		MainScreen.text("\n\n(Low Standard mode!)\nAlternatively, she might be open to a quick fuck if you ask.");
		choices("Pierce", pierceMenu,
		        "Remove", piercingRemove,
		        "", null,
		        "AsFemale", createCallBackFunction(letsDoYaraSex,true),
		        "AsMale", createCallBackFunction(letsDoYaraSex,false),
		        "About Her", about,
		        "", null,
		        "", null,
		        "", null,
		        "Leave", telAdreMenu);
	}
}
private aboutYara():void {
	spriteSelect(63);
	player.statusAffects.add(new StatusAffect("Yara",0,0,0,0)));
	MainScreen.text("You introduce yourself and ask Yara about her past, noting that ", true);
	if(player.humanScore() <= 2) MainScreen.text("you were once a human too.", false);
	else MainScreen.text("you haven't seen many other humans about.", false);
	MainScreen.text("\n\nShe blushes a little when she answers, her tail curling about her protectively, \"<i>My home city was built around a portal, and the Baron that ruled it insisted that we send a sacrifice through every year.  We were raised believing that if we didn't sacrifice SOMEONE, the gods would become angry and bring our city to ruin.  Of course the whole thing was a sham, but the families of those sacrificed get compensation.  My father tried to whore me out first, but when that didn't work, the bastard had me drugged and sacrificed.  I woke up next to a lake, ate some weird fruit when I got hungry, and I... well, I changed.  Thankfully I found my way here before I ran into any demons, or who knows what would have happened to me!  Tel'Adre has been good to me, and I'm sure it'll be good to you.  Now, how about getting a piercing?</i>\"", false);
	player.stats.int += 2;
player.stats.lust += -5;
player.stats.cor += -1;
	doNext(piercingStudio);
}
private pierceMenu():void {
	spriteSelect(63);
	hideUpDown();
	let clit:Function = null;
	if(player.lowerBody.vaginaSpot.hasVagina())
	{
		if(player.lowerBody.vaginaSpot.get(0).clitPierced == 0)
		clit = clitPierce;
	}
	let dick:Function = null;
	if(player.lowerBody.cockSpot.count() > 0)
	{
		if(player.lowerBody.cockSpot.get(0).pierced == 0)
			dick = dickPierce;
	}
	let ears:Function = null;
	if(player.earsPierced == 0)
		ears = earPierce;
	let eyebrow:Function = null;
	if(player.eyebrowPierced == 0)
		eyebrow = eyebrowPierce;
	let lip:Function = null;
	if(player.lipPierced == 0)
		lip = lipPierce;
	let nipples:Function = null;
	if(player.nipplesPierced == 0)
		nipples = nipplePierce;
	let nose:Function = null;
	if(player.nosePierced == 0)
		nose = nosePierce;
	let tongue:Function = null;
	if(player.tonguePierced == 0)
		tongue = tonguePierce;
	let vulva:Function = null;
	if(player.lowerBody.vaginaSpot.hasVagina())
	{
		if(player.lowerBody.vaginaSpot.get(0).labiaPierced == 0) vulva = vulvaPierce;
	}
	MainScreen.text("Yara asks, \"<i>Ok then, what would you like pierced " + player.mf("sir","cutie") + "?  Just keep in mind my piercings are special - they're permanent and CAN'T be removed.</i>\"", true);
	if(clit != null || dick != null || ears != null || eyebrow != null || lip != null || nipples != null || nose != null || tongue != null || vulva != null)
		choices("Clit",clit,"Dick",dick,"Ears",ears,"Eyebrow",eyebrow,"Lip",lip,"Nipples",nipples,"Nose",nose,"Tongue",tongue,"Labia",vulva,"Back",piercingStudio);
	else
	{
		MainScreen.text("\n\nYou give yourself a quick once-over and realize there's nowhere left for her to pierce you.  Oh well.", false);
		doNext(piercingStudio);
	}
}

private dickPierce():void {
	spriteSelect(63);
	if(player.lowerBody.cockSpot.count() > 0) MainScreen.text("\"<i>Ok, this is gonna hurt a LOT, but I've heard good things about it.  What kind of piercing do you want done?</i>\" Yara asks.", true);
	else {
		MainScreen.text("You realize you don't have a dick to pierce.  Whoops!  Better pick something else...", true);
		doNext(pierceMenu);
		return;
	}
	simpleChoices("Stud", chooseStud, "Ring", chooseRing, "Ladder", chooseLadder, "Back", pierceMenu, "Nevermind", piercingStudio);
	piercingLoc = 1;
}

private clitPierce():void {
	spriteSelect(63);
	if(player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("\"<i>Ohhh, that's going to be suckably cute!</i>\" exclaims Yara, blushing more than a little. \"<i>What kind of piercing would you like?</i>", true);
	else {
		MainScreen.text("You realize you don't have a clit to pierce.  Whoops!  Better pick something else...", true);
		doNext(pierceMenu);
		return;
	}
	piercingLoc = 0;
	simpleChoices("Stud", chooseStud, "Ring", chooseRing, "", null, "Back", pierceMenu, "Nevermind", piercingStudio);
}

private earPierce():void {
	spriteSelect(63);
	piercingLoc = 2;
	MainScreen.text("\"<i>Okay, just let me get my supplies and we can get started.  What kind of jewelry do you want in them?</i>\" asks Yara.", true);
	simpleChoices("Stud", chooseStud, "Ring", chooseRing, "Hoop", chooseHoop, "Back", pierceMenu, "Nevermind", piercingStudio);
}

private eyebrowPierce():void {
	spriteSelect(63);
	piercingLoc = 3;
	MainScreen.text("\"<i>Ah, that's a good look!  What do you want there?</i>\" asks Yara.", true);
	simpleChoices("Stud", chooseStud, "Ring", chooseRing, "", null, "Back", pierceMenu, "Nevermind", piercingStudio);
}

private lipPierce():void {
	spriteSelect(63);
	piercingLoc = 4;
	MainScreen.text("\"<i>Oh my, that'll be HAWT!  What kind of jewelry do you want there?</i>\" asks Yara.", true);
	simpleChoices("Stud", chooseStud, "Ring", chooseRing, "", null, "Back", pierceMenu, "Nevermind", piercingStudio);
}

private nipplePierce():void {
	spriteSelect(63);
	piercingLoc = 5;
	MainScreen.text("\"<i>Yeah, sure I can do those!  What kind of jewelry do you want there?  I'm partial to nipple-chains myself,</i>\" admits Yara, blushing bright red.", true);
	simpleChoices("Studs", chooseStud, "Rings", chooseRing, "Chain", chooseChain, "Back", pierceMenu, "Nevermind", piercingStudio);
}

private nosePierce():void {
	spriteSelect(63);
	piercingLoc = 6;
	MainScreen.text("Yara wrinkles her nose in distaste, \"<i>Really?  Well ok, what do you want there?</i>\"", true);
	simpleChoices("Stud", chooseStud, "Ring", chooseRing, "", null, "Back", pierceMenu, "Nevermind", piercingStudio);
}

private tonguePierce():void {
	spriteSelect(63);
	piercingLoc = 7;
	MainScreen.text("Yara happily purrs, \"<i>Oh my, I bet that'll be fun!  I'm afraid I can only put a stud there though, ok?</i>\"", true);
	simpleChoices("Ok", chooseStud, "", null, "", null, "Back", pierceMenu, "Nevermind", piercingStudio);
}
private vulvaPierce():void {
	spriteSelect(63);
	piercingLoc = 8;
	if(player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("Yara explains, \"<i>This is gonna hurt a lot, but I think you'll love how it feels after.  I know I do!  Now what kind of jewelry do you want down-town?</i>\"", true);
	else {
		MainScreen.text("You realize you don't have a pussy to pierce.  Whoops!  Better pick something else...", true);
		doNext(pierceMenu);
		return;
	}
	simpleChoices("Stud", chooseStud, "Ring", chooseRing, "", null, "Back", pierceMenu, "Nevermind", piercingStudio);
}
private chooseStud():void {
	piercingType = 1;
	chooseMaterials();
}
private chooseRing():void {
	piercingType = 2;
	chooseMaterials();
}
private chooseLadder():void {
	piercingType = 3;
	chooseMaterials();
}
private chooseHoop():void {
	piercingType = 4;
	chooseMaterials();
}
private chooseChain():void {
	piercingType = 5;
	chooseMaterials();
}

private chooseMaterials():void {
	spriteSelect(63);
	MainScreen.text("Yara gathers up her materials and says, \"<i>Ok, now what type of material do you want it made from?  Don't worry about price, none of these are that rare, so the piercing will only be 100 gems.  Though I do have some rarer materials; you'll need 1,000 gems to spend if you want to check them out.</i>\"", true);
	if(player.stats.gems < 100) {
		MainScreen.text("\n\nYou realize you don't have enough gems to get a piercing.", false);
		doNext(piercingStudio);
		return;
	}
	let rare:Function = null;
	if(player.stats.gems >= 1000) rare = chooseAdvancedMaterials;
	choices("Amethyst",chooseAmethyst,"Diamond",chooseDiamond,"Gold",chooseGold,"Emerald",chooseEmerald,"Jade",chooseJade,"Onyx",chooseOnyx,"Ruby",chooseRuby,"Steel",chooseSteel,"Rare Menu",rare,"Nevermind",piercingStudio);
}
private chooseAmethyst():void {
	piercingMat = 1;
	areYouSure();
}
private chooseDiamond():void {
	piercingMat = 2;
	areYouSure();
}
private chooseGold():void {
	piercingMat = 3;
	areYouSure();
}
private chooseEmerald():void {
	piercingMat = 4;
	areYouSure();
}
private chooseJade():void {
	piercingMat = 5;
	areYouSure();
}
private chooseOnyx():void {
	piercingMat = 6;
	areYouSure();
}
private chooseRuby(): void {
	piercingMat = 7;
	areYouSure();
}
private chooseSteel():void {
	piercingMat = 8;
	areYouSure();
}
private chooseLethite():void {
	piercingMat = 9;
	areYouSure();
}
private chooseFertite():void {
	piercingMat = 10;
	areYouSure();
}
private chooseFurrite():void {
	piercingMat = 11;
	areYouSure();
}
private chooseCrimstone():void {
	piercingMat = 12;
	areYouSure();
}

private areYouSure():void {
	spriteSelect(63);
	MainScreen.text("Yara says, \"<i>Ok, last chance to back out, are you sure you want to go ahead with this?  Remember, once I put it in, it's permanent.</i>\"", true);
	doYesNo(normalPierceAssemble,piercingStudio);
}
	//9. Lethite (Demon Lure)
	//10. Fertite (Fertility Booster)
	//11. Furrite (Attracts Furries)
	//12. Crimstone - + min lust
private chooseAdvancedMaterials():void {
	spriteSelect(63);
	MainScreen.text("Yara goes back into the back and comes out with a gilded tray full of exotic materials.  She hands you a brochure and asks, \"<i>Ok, now what am I going to be working with?</i>\"", true);
	MainScreen.text("\n\nThere's a number of materials listed here:", false);
	MainScreen.text("\n1. Lethite - Fake lethicite.  While beautiful, it's known to attract demons.", false);
	MainScreen.text("\n2. Fertite - A green gem sometimes fished up from the bottom of Mareth's great lake, it is said to enhance the fertility of both genders.", false);
	MainScreen.text("\n3. Furrite - This beautiful purple gem is actually crystalized from materials used in hunting lures.  It is said to enhance the wearer's appeal to beast-people.", false);
	MainScreen.text("\n4. Crimstone - Crimstone is said to be formed from volcanic fires, and to keep the fires of one's desires burning brightly.", false);
	MainScreen.text("\n\n<b>DISCLAIMER</b>: Yara's Piercing Studio is not responsible if the piercee's body absorbs any residual magic of these stones, and is not required to resolve any issues if the effects persist beyond removal.</b>", false);
	simpleChoices("Lethite",chooseLethite,"Fertite",chooseFertite,"Furrite",chooseFurrite,"Crimstone",chooseCrimstone,"Back",chooseMaterials);
}

private normalPierceAssemble():void {
	spriteSelect(63);
	MainScreen.text("Yara makes you comfortable and has you look away while she uses her piercing tools.  It hurts, but she's skilled and before you know it, your piercing is done!", true);
	//1. Amethyst (+1 int, +1 lib)
	//2. Diamond (+2 int, -1 cor)
	//3. Gold (+1 int, +1 sens)
	//4. Emerald (+1 spe)
	//5. Jade (+1 spe, -.5 tou)
	//6. Onyx (+1 tou, -1 spe)
	//7. Ruby (+1 lib, +1 sens)
	//8. Steel (+2 str, -2 int)
	//9. Lethite (Demon Lure)
	//10. Fertite (Fertility Booster)
	//11. Furrite (Attracts Furries)
	//12. Crimsonite (+Min Lust)
	//13.
	//let piercingMat:number = 0;
	let shortP:string = "";
	let longP:string = "";
	player.stats.gems -= 100;
	if(piercingMat > 8) player.stats.gems -= 900;
	statScreenRefresh();
	//set up material description
	switch(piercingMat) {
		case 1:
			shortP += "amethyst ";
			player.stats.int += 1;
player.stats.lib += 1;
			longP += "Amethyst ";
			break;
		case 2:
			shortP += "diamond ";
			player.stats.int += 2;
player.stats.cor += -1;
			longP += "Diamond ";
			break;
		case 3:
			shortP += "gold ";
			player.stats.int += 1;
player.stats.sens += 1;
			longP += "Gold ";
			break;
		case 4:
			shortP += "emerald ";
			player.stats.spe += 1;
			longP += "Emerald ";
			break;
		case 5:
			shortP += "jade ";
			player.stats.tou += -.5;
player.stats.int += 1;
player.stats.cor += -1;
			longP += "Jade ";
			break;
		case 6:
			shortP += "onyx ";
			player.stats.tou += 1;
player.stats.spe += -1;
			longP += "Onyx ";
			break;
		case 7:
			shortP += "ruby ";
			player.stats.lib += 1;
player.stats.sens += 1;
			longP += "Ruby ";
			break;
		case 8:
			shortP += "steel ";
			dynStats("str", 2,"int", -2);
			longP += "Steel ";
			break;
		case 9:
			shortP += "lethite ";
			if(!player.perks.has("PiercedLethite")) player.createPerk(PerkLib.PiercedLethite,0,0,0,0);
			longP += "Lethite ";
			break;
		case 10:
			shortP += "fertite ";
			if(!player.perks.has("PiercedFertite")) player.createPerk(PerkLib.PiercedFertite,5,0,0,0);
			else player.addPerkValue(PerkLib.PiercedFertite,1,5);
			longP += "Fertite ";
			break;
		case 11:
			shortP += "furrite ";
			if(!player.perks.has("PiercedFurrite")) player.createPerk(PerkLib.PiercedFurrite,0,0,0,0);
			longP += "Furrite ";
			break;
		case 12:
			shortP += "crimstone ";
			if(!player.perks.has("PiercedCrimstone")) player.createPerk(PerkLib.PiercedCrimstone,5,0,0,0);
			else player.addPerkValue(PerkLib.PiercedCrimstone,1,5);
			longP += "Crimstone ";
			break;
	}
	switch(piercingLoc) {
		/*
		0) **Clit (+2 sens)
		1) **Dick (+2 lib) adds the word 'pierced' sometimes to the description
		2) **Ears
		3) **Eyebrow (-.5 def)
		4) **Lip (-.5 def)
		5) **Nipples (+1 sens, +1 lib)
		6) **Nose (+.5 attack)
		7) **Tongue (+1 sens)
		8) **Vulva (+1 sens)*/
		//let piercingLoc:number = 0;
		case 0:
			shortP += "clit-";
			longP += "clit-";
			player.stats.sens += 2;
			break;
		case 1:
			if(piercingType == 3) break;
			shortP += "cock-";
			longP += "cock-";
			player.stats.lib += 2;
			break;
		case 2:
			shortP += "ear";
			longP += "ear";
			break;
		case 3:
			player.stats.tou += -.5;
			shortP += "eyebrow-";
			longP += "eyebrow-";
			break;
		case 4:
			player.stats.tou += -.5;
			shortP += "lip-";
			longP += "lip-";
			break;
		case 5:
			player.stats.lib += 1;
player.stats.sens += 1;
			shortP += "nipple-";
			longP += "nipple-";
			break;
		case 6:
			player.stats.str += .5;
			shortP += "nose-";
			longP += "nose-";
			break;
		case 7:
			player.stats.sens += 1;
			shortP += "tongue-";
			longP += "tongue-";
			break;
		case 8:
			player.stats.sens += 1;
			shortP += "labia-";
			longP += "labia-";
			break
	}
	switch(piercingType) {
		//studs
		case 1:
			//multiples
			if(piercingLoc == 2 || piercingLoc == 5 || piercingLoc == 8) {
				shortP += "studs";
				longP += "studs";
			}
			else {
				shortP += "stud";
				longP += "stud";
			}
			break;
		//2. Ring (Called prince albert on dick)
		case 2:
			//multiples
			if(piercingLoc == 2 || piercingLoc == 5 || piercingLoc == 8) {
				shortP += "rings";
				longP += "rings";
			}
			else {
				shortP += "ring";
				longP += "ring";
			}
			break;
		//3. Jacobs Ladder (dick only)
		case 3:
			shortP += "jacob's ladder";
			longP += "jacob's ladder";
			break;
		//4. Hoop (ears/nipples/clit)
		case 4:
			//multiples
			if(piercingLoc == 2 || piercingLoc == 5 || piercingLoc == 8) {
				shortP += "hoops";
				longP += "hoops";
			}
			else {
				shortP += "hoop";
				longP += "hoop";
			}
			break;
		//5. Chain (nipples only)
		case 5:
			shortP += "chain";
			longP += "chain";
			break;
	}
	//Actually assign values to their real storage locations
	switch(piercingLoc) {
		/*
		0) **Clit (+2 sens)
		1) **Dick (+2 lib) adds the word 'pierced' sometimes to the description
		2) **Ears
		3) **Eyebrow (-.5 def)
		4) **Lip (-.5 def)
		5) **Nipples (+1 sens, +1 lib)
		6) **Nose (+.5 attack)
		7) **Tongue (+1 sens)
		8) **Vulva (+1 sens)*/
		//let piercingLoc:number = 0;
		case 0:
			player.lowerBody.vaginaSpot.get(0).clitPierced = piercingType;
			player.lowerBody.vaginaSpot.get(0).clitPShort = shortP;
			player.lowerBody.vaginaSpot.get(0).clitPLong = longP;
			break;
		case 1:
			player.lowerBody.cockSpot.get(0).pierced = piercingType;
			player.lowerBody.cockSpot.get(0).pShortDesc = shortP;
			player.lowerBody.cockSpot.get(0).pLongDesc = longP;
			break;
		case 2:
			player.earsPierced = piercingType;
			player.earsPShort = shortP;
			player.earsPLong = longP;
			break;
		case 3:
			player.eyebrowPierced = piercingType;
			player.eyebrowPShort = shortP;
			player.eyebrowPLong = longP;
			break;
		case 4:
			player.lipPierced = piercingType;
			player.lipPShort = shortP;
			player.lipPLong = longP;
			break;
		case 5:
			player.nipplesPierced = piercingType;
			player.nipplesPShort = shortP;
			player.nipplesPLong = longP;
			break;
		case 6:
			player.nosePierced = piercingType;
			player.nosePShort = shortP;
			player.nosePLong = longP;
			break;
		case 7:
			player.tonguePierced = piercingType;
			player.tonguePShort = shortP;
			player.tonguePLong = longP;
			break;
		case 8:
			player.lowerBody.vaginaSpot.get(0).labiaPierced = piercingType;
			player.lowerBody.vaginaSpot.get(0).labiaPShort = shortP;
			player.lowerBody.vaginaSpot.get(0).labiaPLong = longP;
			break;
	}
	//Girls
	if(piercingLoc == 8 || piercingLoc == 0) {
		yaraSex();
		return;
	}
	//Dudes
	else if(piercingLoc == 1 && (player.cockThatFits(36) >= 0 || Flags.list[FlagEnum.HYPER_HAPPY])) {
		yaraSex(false);
		return;
	}
	//Piercing shop main menu
	doNext(piercingStudio);
}


private piercingRemove():void {
	spriteSelect(63);
	hideUpDown();
	let clit:Function = null;
	if(player.lowerBody.vaginaSpot.hasVagina()) {
		if(player.lowerBody.vaginaSpot.get(0).clitPierced > 0) clit = removeClitPierce;
	}
	let dick:Function = null;
	if(player.lowerBody.cockSpot.count() > 0) {
		if(player.lowerBody.cockSpot.get(0).pierced > 0) dick = removeCockPierce;
	}
	let ears:Function = null;
	if(player.earsPierced > 0) ears = removeEarsPierce;
	let eyebrow:Function = null;
	if(player.eyebrowPierced > 0) eyebrow = removeEyebrowPierce;
	let lip:Function = null;
	if(player.lipPierced > 0) lip = removeLipPierce;
	let nipples:Function = null;
	if(player.nipplesPierced > 0) nipples = removeNipplesPierce;
	let nose:Function = null;
	if(player.nosePierced > 0) nose = removeNosePierce;
	let tongue:Function = null;
	if(player.tonguePierced > 0) tongue = removeTonguePierce;
	let vulva:Function = null;
	if(player.lowerBody.vaginaSpot.hasVagina()) {
		if(player.lowerBody.vaginaSpot.get(0).labiaPierced > 0) vulva = removeVulvaPierce;
	}
	if(clit == null && dick == null && ears == null && eyebrow == null && lip == null && nipples == null && nose == null && tongue == null && vulva == null) {
		MainScreen.text("Yara giggles, \"<i>You don't have any piercings, silly!</i>\"", true);
		doNext(piercingStudio);
		return;
	}
	MainScreen.text("\"<i>Really?</i>\" asks Yara, \"<i>I told you those piercings are permanent!  Well, I suppose they CAN be removed, but you're gonna hurt like hell afterwards.  If you really want me to, I can remove something, but it'll cost you 100 gems for the painkillers and labor.</i>\"", true);
	if(player.stats.gems < 100) {
		MainScreen.text("\n\n<b>You do not have enough gems.</b>", false);
		doNext(piercingStudio);
		return;
	}
	if(player.stats.tou <= 5.5) {
		MainScreen.text("Yara looks you up and down before refusing you outright, \"<i>You don't look so good " + player.short + ".  I don't think your body could handle it right now.</i>\"", true);
		doNext(piercingStudio);
		return;
	}
	choices("Clit",clit,"Dick",dick,"Ears",ears,"Eyebrow",eyebrow,"Lip",lip,"Nipples",nipples,"Nose",nose,"Tongue",tongue,"Labia",vulva,"Back",piercingStudio);
}

private removeClitPierce():void {
	spriteSelect(63);
	MainScreen.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.lowerBody.vaginaSpot.get(0).clitPierced = 0;
	player.lowerBody.vaginaSpot.get(0).clitPShort = "";
	player.lowerBody.vaginaSpot.get(0).clitPLong = "";
	player.stats.tou += -5;
	player.stats.gems -= 100;
	statScreenRefresh();
	doNext(piercingStudio);
}

private removeCockPierce():void {
	spriteSelect(63);
	MainScreen.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.lowerBody.cockSpot.get(0).pierced = 0;
	player.lowerBody.cockSpot.get(0).pShortDesc = "";
	player.lowerBody.cockSpot.get(0).pLongDesc = "";
	player.stats.tou += -5;
	player.stats.gems -= 100;
	statScreenRefresh();
	doNext(piercingStudio);
}

private removeEarsPierce():void {
	spriteSelect(63);
	MainScreen.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.earsPierced = 0;
	player.earsPShort = "";
	player.earsPLong = "";
	player.stats.tou += -5;
	player.stats.gems -= 100;
	statScreenRefresh();
	doNext(piercingStudio);
}

private removeEyebrowPierce():void {
	spriteSelect(63);
	MainScreen.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.eyebrowPierced = 0;
	player.eyebrowPShort = "";
	player.eyebrowPLong = "";
	player.stats.tou += -5;
	player.stats.gems -= 100;
	statScreenRefresh();
	doNext(piercingStudio);
}

private removeLipPierce():void {
	spriteSelect(63);
	MainScreen.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.lipPierced = 0;
	player.lipPShort = "";
	player.lipPLong = "";
	player.stats.tou += -5;
	player.stats.gems -= 100;
	statScreenRefresh();
	doNext(piercingStudio);
}

private removeNipplesPierce():void {
	spriteSelect(63);
	MainScreen.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.nipplesPierced = 0;
	player.nipplesPShort = "";
	player.nipplesPLong = "";
	player.stats.tou += -5;
	player.stats.gems -= 100;
	statScreenRefresh();
	doNext(piercingStudio);
}

private removeNosePierce():void {
	spriteSelect(63);
	MainScreen.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.nosePierced = 0;
	player.nosePShort = "";
	player.nosePLong = "";
	player.stats.tou += -5;
	player.stats.gems -= 100;
	statScreenRefresh();
	doNext(piercingStudio);
}

private removeTonguePierce():void {
	spriteSelect(63);
	MainScreen.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.tonguePierced = 0;
	player.tonguePShort = "";
	player.tonguePLong = "";
	player.stats.tou += -5;
	player.stats.gems -= 100;
	statScreenRefresh();
	doNext(piercingStudio);
}

private removeVulvaPierce():void {
	spriteSelect(63);
	MainScreen.text("Yara gives you something to drink and you swiftly black out.  You awake about an hour later, sore and weak, though thankfully not bleeding.", true);
	player.lowerBody.vaginaSpot.get(0).labiaPierced = 0;
	player.lowerBody.vaginaSpot.get(0).labiaPShort = "";
	player.lowerBody.vaginaSpot.get(0).labiaPLong = "";
	player.stats.tou += -5;
	player.stats.gems -= 100;
	statScreenRefresh();
	doNext(piercingStudio);
}

public oswaldPawn():void {
	spriteSelect(47);
	MainScreen.text("", true);
	if(!player.statusAffects.has("Oswald")) {
		MainScreen.text("Upon closer inspection, you realize the pawnbroker appears to be some kind of golden retriever.  He doesn't look entirely comfortable and he slouches, but he manages to smile the entire time.  His appearance is otherwise immaculate, including his classy suit-jacket and tie, though he doesn't appear to be wearing any pants.  Surprisingly, his man-bits are retracted.  ", false);
		if(player.stats.cor < 75) MainScreen.text("Who would've thought that seeing someone NOT aroused would ever shock you?", false);
		else MainScreen.text("What a shame, but maybe you can give him a reason to stand up straight?", false);
		MainScreen.text("  His stand is a disheveled mess, in stark contrast to its well-groomed owner.  He doesn't appear to be selling anything at all right now.\n\n", false);
		MainScreen.text("The dog introduces himself as Oswald and gives his pitch, \"<i>Do you have anything you'd be interested in selling?  The name's Oswald, and I'm the best trader in Tel'Adre.</i>\"\n\n", false);
		MainScreen.text("(You can sell an item here, but Oswald will not let you buy them back, so be sure of your sales.)", false);
		player.statusAffects.add(new StatusAffect("Oswald",0,0,0,0)));
	}
	else {
		MainScreen.text("You see Oswald fiddling with a top hat as you approach his stand again.  He looks up and smiles, padding up to you and rubbing his furry hands together.  He asks, \"<i>Have any merchandise for me " + player.mf("sir","dear") + "?</i>\"\n\n", false);
		MainScreen.text("(You can sell an item here, but Oswald will not let you buy them back, so be sure of your sales.)", false);
	}
	if(player.hasKeyItem("Carrot") < 0 && Flags.list[FlagEnum.NIEVE_STAGE] == 3)
	{
		MainScreen.text("\n\nIn passing, you mention that you're looking for a carrot.\n\nOswald's tophat tips precariously as his ears perk up, and he gladly announces, \"<i>I happen to have come across one recently - something of a rarity in these dark times, you see.  I could let it go for 500 gems, if you're interested.</i>\"");
		if (player.stats.gems < 500) {
			MainScreen.text("\n\n<b>You can't afford that!</b>");
			oswaldPawnMenu(); //eventParser(1065);
		}
		else {
			menu();
			MainScreen.addButton(0, "Sell", oswaldPawnMenu);
			MainScreen.addButton(1, "BuyCarrot", buyCarrotFromOswald);
		}
	}
	else oswaldPawnMenu(); //eventParser(1065);
}

private buyCarrotFromOswald():void {
	player.stats.gems -= 500;
	statScreenRefresh();
	player.createKeyItem("Carrot",0,0,0,0);
	MainScreen.clearText();
	MainScreen.text("Gems change hands in a flash, and you're now the proud owner of a bright orange carrot!\n\n(<b>Acquired Key Item: Carrot</b>)");
	menu();
	MainScreen.addButton(0,"Next",oswaldPawn);
}

private oswaldPawnMenu():void { //Moved here from Inventory.as
	spriteSelect(47);
	MainScreen.text("\n\n<b><u>Oswald's Estimates</u></b>");
	menu();
	let totalItems: number = 0;
	for (let slot: number = 0; slot < 5; slot++) {
		if (player.itemSlots[slot].quantity > 0 && player.itemSlots[slot].itype.value >= 1) {
			MainScreen.text("\n" + int(player.itemSlots[slot].itype.value / 2) + " gems for " + player.itemSlots[slot].itype.longName + ".");
			MainScreen.addButton(slot, (player.itemSlots[slot].itype.shortName + " x" + player.itemSlots[slot].quantity), oswaldPawnSell, slot);
			totalItems += player.itemSlots[slot].quantity;
		}
	}
	if (totalItems > 1) MainScreen.addButton(7, "Sell All", oswaldPawnSellAll);
	switch (Flags.list[FlagEnum.KATHERINE_UNLOCKED]) {
		case 1:
		case 2: MainScreen.addButton(5, "Kath's Alley", katherine.visitKatherine); break;
		case 3: MainScreen.addButton(5, "Safehouse", katherineEmployment.katherineTrainingWithUrta); break;
		case 4: MainScreen.addButton(5, "Kath's Alley", katherineEmployment.postTrainingAlleyDescription); //Appears until Kath gives you her housekeys
		default:
	}
	MainScreen.addButton(9, "Back", telAdreMenu);
}

private oswaldPawnSell(slot: number):void { //Moved here from Inventory.as
	spriteSelect(47);
	let itemValue: number = int(player.itemSlots[slot].itype.value / 2);
	MainScreen.clearText();
	if (itemValue == 0)
		MainScreen.text("You hand over " + player.itemSlots[slot].itype.longName + " to Oswald.  He shrugs and says, “<i>Well ok, it isn't worth anything, but I'll take it.</i>”");
	else MainScreen.text("You hand over " + player.itemSlots[slot].itype.longName + " to Oswald.  He nervously pulls out " + num2Text(itemValue) + " gems and drops them into your waiting hand.");
	player.itemSlots[slot].removeOneItem();
	player.stats.gems += itemValue;
	statScreenRefresh();
	doNext(oswaldPawn);
}

private oswaldPawnSellAll():void {
	spriteSelect(47);
	let itemValue: number = 0;
	MainScreen.clearText();
	for (let slot: number = 0; slot < 5; slot++) {
		if (player.itemSlots[slot].quantity > 0 && player.itemSlots[slot].itype.value >= 1) {
			itemValue += player.itemSlots[slot].quantity * int(player.itemSlots[slot].itype.value / 2);
			player.itemSlots[slot].quantity = 0;
		}
	}
	MainScreen.text("You lay out all the items you're carrying on the counter in front of Oswald.  He examines them all and nods.  Nervously, he pulls out " + num2Text(itemValue) + " gems and drops them into your waiting hand.");
	player.stats.gems += itemValue;
	statScreenRefresh();
	doNext(oswaldPawn);
}

private anotherButton(button: number, nam:string, func:Function, arg:* = -9000): number {
	if (button > 8) return 9;
	MainScreen.addButton(button, nam, func, arg);
	button++;
	return button;
}
private enterBarTelAdre():void {
	if(isThanksgiving()) kGAMECLASS.pigSlutRoastingGreet();
	else barTelAdre();
}

public barTelAdre():void {
	// Dominka & Edryn both persist their sprites if you back out of doing anything with them -- I
	// I guess this is good a place as any to catch-all the sprite, because I don't think theres ever a case you get a sprite from just entering the bar?
	spriteSelect( -1);

	hideUpDown();
	let button: number = 0;
	MainScreen.clearText();
	if(Flags.list[FlagEnum.LOPPE_DISABLED] == 0 && Flags.list[FlagEnum.LOPPE_MET] == 0 && rand(10) == 0) {
		loppe.loppeFirstMeeting();
		return;
	}
	MainScreen.text("The interior of The Wet Bitch is far different than the mental picture its name implied.  It looks like a normal tavern, complete with a large central hearth, numerous tables and chairs, and a polished dark wood bar.  The patrons all seem to be dressed and interacting like normal people, that is if normal people were mostly centaurs and dog-morphs of various sub-species.  The atmosphere is warm and friendly, and ");
	if (player.humanScore() <= 3) MainScreen.text("despite your altered appearance, ");
	MainScreen.text("you hardly get any odd stares.  There are a number of rooms towards the back, as well as a stairway leading up to an upper level.");
	
	scylla.scyllaBarSelectAction(); //Done before anything else so that other NPCs can check scylla.action to see what she's doing
		//Thanks to this function and edryn.edrynHeliaThreesomePossible() the bar menu will always display the same possible options until the game time advances.
		//So it's safe to return to this menu, Helia or Urta can't suddenly disappear or appear just from leaving and re-entering the bar.

	menu();
	//AMILY!
	if(Flags.list[FlagEnum.AMILY_VISITING_URTA] == 1) {
		button = anotherButton(button,"Ask4Amily",kGAMECLASS.followerInteractions.askAboutAmily);
	}
	//DOMINIKA
	if(model.time.hours > 17 && model.time.hours < 20 && Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00150] != -1) {
		button = anotherButton(button,"Dominika",dominika.fellatrixBarApproach);
	}
	//EDRYN!
	if (edryn.pregnancy.type != PregnancyType.TAOTH) { //Edryn is unavailable while pregnant with Taoth
		if (edryn.edrynBar()) {
			if (edryn.pregnancy.isPregnant) {
				if (Flags.list[FlagEnum.EDRYN_PREGNANT_AND_NOT_TOLD_PC_YET] == 0) {
					Flags.list[FlagEnum.EDRYN_PREGNANT_AND_NOT_TOLD_PC_YET] = 1;
					if (Flags.list[FlagEnum.EDRYN_NUMBER_OF_KIDS] == 0) { //Edryn panic appearance! (First time mom)
						MainScreen.text("\n\nEdryn smiles when she sees you and beckons you towards her.  Fear and some kind of frantic need are painted across her face, imploring you to come immediately.  Whatever the problem is, it doesn't look like it can wait.", false);
						doNext(edryn.findOutEdrynIsPregnant);
						return;
					}
					else { //Edryn re-preggers appearance!
						MainScreen.text("\n\nEdryn smiles at you and yells, \"<i>Guess what " + player.short + "?  I'm pregnant again!</i>\"  There are some hoots and catcalls but things quickly die down.  You wonder if her scent will be as potent as before?", false);				
					}
				}
				else { //Mid-pregnancy appearance
					MainScreen.text("\n\nEdryn is seated at her usual table, and chowing down with wild abandon.  A stack of plates is piled up next to her.  Clearly she has been doing her best to feed her unborn child.  She notices you and waves, blushing heavily.", false);
				}
			}
			//Edryn just had a kid and hasn't talked about it!
			else if (Flags.list[FlagEnum.EDRYN_NEEDS_TO_TALK_ABOUT_KID] == 1) {
				MainScreen.text("\n\nEdryn the centaur isn't pregnant anymore!  She waves excitedly at you, beckoning you over to see her.  It looks like she's already given birth to your child!", false);
			}
			//Appearance changes if has had kids
			else if(Flags.list[FlagEnum.EDRYN_NUMBER_OF_KIDS] > 0) {
				MainScreen.text("\n\nEdryn is seated at her usual place, picking at a plate of greens and sipping a mug of the local mead.  She looks bored until she sees you.  Her expression brightens immediately, and Edryn fiddles with her hair and changes her posture slightly.  You aren't sure if she means to, but her cleavage is prominently displayed in an enticing manner.", false);
			}
			else if(player.statusAffects.get("Edryn").value1 < 3) {
				MainScreen.text("\n\nEdryn, the centauress you met at the gate, is here, sitting down at her table alone and sipping on a glass of wine.  You suppose you could go talk to her a bit.", false);
			}
			else MainScreen.text("\n\nEdryn the centauress is here, sipping wine at a table by herself.  She looks up and spots you, her eyes lighting up with happiness.  She gives you a wink and asks if you'll join her.", false);
			button = anotherButton(button,"Edryn",edryn.edrynBarTalk);
		}
	}
	if (Flags.list[FlagEnum.KATHERINE_LOCATION] == Katherine.KLOC_BAR) {
		if (Flags.list[FlagEnum.KATHERINE_UNLOCKED] == 4) { 
			katherine.barFirstEncounter();
			return;
		}
		if (Flags.list[FlagEnum.KATHERINE_URTA_AFFECTION] == 31 && kGAMECLASS.urta.urtaAtBar() && !kGAMECLASS.urta.urtaDrunk() && Flags.list[FlagEnum.URTA_ANGRY_AT_PC_COUNTDOWN] == 0) {
			katherine.barKathUrtaLoveAnnounce();
			return;
		}
		katherine.barDescription();
		button = anotherButton(button, "Katherine", katherine.barApproach);
    }
	//trace("HEL FOLLOWER LEVEL: " + Flags.list[FlagEnum.HEL_FOLLOWER_LEVEL] + " HEL FUCKBUDDY: " + Flags.list[FlagEnum.HEL_FUCKBUDDY] + " HARPY QUEEN DEFEATED: " + Flags.list[FlagEnum.HEL_HARPY_QUEEN_DEFEATED]);
	//trace("REDUCED ENCOUNTER RATE (DISPLINED): " + Flags.list[FlagEnum.HEL_REDUCED_ENCOUNTER_RATE]);
	//HELIA
//	if(player.gender > 0 && model.time.hours >= 14 && rand(2) == 0 && model.time.hours < 20 && (Flags.list[FlagEnum.HEL_FUCKBUDDY] != 0 || kGAMECLASS.helFollower.followerHel()) && !(Flags.list[FlagEnum.HEL_FOLLOWER_LEVEL] == 1 && Flags.list[FlagEnum.HEL_HARPY_QUEEN_DEFEATED]== 0)) {
	if (edryn.edrynHeliaThreesomePossible()) {
		edryn.helAppearance();
		button = anotherButton(button,"Helia",edryn.approachHelAtZeBitch);
	}
	//NANCY
	if (auntNancy.auntNancy(false)) {
		auntNancy.auntNancy(true);
		if(Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00263] > 0) button = anotherButton(button,"Nancy",auntNancy.interactWithAuntNancy);
		else button = anotherButton(button,"Barkeep",auntNancy.interactWithAuntNancy);
	}
	else MainScreen.text("\n\nIt doesn't look like there's a bartender working at the moment.", false);

	//NIAMH
	if (model.time.hours >= 8 && model.time.hours <= 16 && Flags.list[FlagEnum.NIAMH_STATUS] == 0) {
		niamh.telAdreNiamh();
		if (Flags.list[FlagEnum.MET_NIAMH] == 0) button = anotherButton(button,"Beer Cat",niamh.approachNiamh);
		else button = anotherButton(button,"Niamh",niamh.approachNiamh);
	}
	//ROGAR #1
	if(Flags.list[FlagEnum.ROGAR_PHASE] == 3 && Flags.list[FlagEnum.ROGAR_DISABLED] == 0 && Flags.list[FlagEnum.ROGAR_FUCKED_TODAY] == 0) {
		button = anotherButton(button,"HoodedFig",kGAMECLASS.swamp.rogar.rogarThirdPhase);
		//Wet Bitch screen text when Ro'gar phase = 3:
		MainScreen.text("\n\nYou notice a cloaked figure at the bar, though you're quite unable to discern anything else as its back is turned to you.", false);
	}
	//ROGAR #2
	else if(Flags.list[FlagEnum.ROGAR_PHASE] >= 4 && Flags.list[FlagEnum.ROGAR_DISABLED] == 0 && Flags.list[FlagEnum.ROGAR_FUCKED_TODAY] == 0) {
		button = anotherButton(button,"Rogar",kGAMECLASS.swamp.rogar.rogarPhaseFour);
		//Wet Bitch bar text when Ro'gar phase = 4:
		MainScreen.text("\n\nRo'gar is here with his back turned to the door, wearing his usual obscuring cloak.", false);
	}
	
	switch (scylla.action) { //Scylla - requires dungeon shut down
		case Scylla.SCYLLA_ACTION_FIRST_TALK:
			MainScreen.text("\n\nThere is one nun sitting in a corner booth who catches your eye.  She sits straight-backed against the dark, wood chair, her thin waist accentuating the supple curve of her breasts. She's dressed in a black robe that looks a few sizes too small for her hips and wears a black and white cloth over her head.");
			button = anotherButton(button, "Nun", scylla.talkToScylla);
			break;
		case Scylla.SCYLLA_ACTION_ROUND_TWO:
			scylla.scyllaRoundII();
			return;
		case Scylla.SCYLLA_ACTION_ROUND_THREE:
			scylla.scyllaRoundThreeCUM();
			return;
		case Scylla.SCYLLA_ACTION_ROUND_FOUR:
			scylla.scyllaRoundIVGo();
			return;
		case Scylla.SCYLLA_ACTION_MEET_CATS:
			MainScreen.text("\n\nIt looks like Scylla is here but getting ready to leave.  You could check and see what the misguided nun is up to.");
			button = anotherButton(button, "Scylla", scylla.Scylla6);
			break;
		case Scylla.SCYLLA_ACTION_ADICTS_ANON:
			MainScreen.text("\n\nYou see Scylla's white and black nun's habit poking above the heads of the other patrons.  The tall woman seems unaware of her effect on those around her, but it's clear by the way people are crowding she's acquired a reputation by now.  You're not sure what she's doing, but you could push your way through to find out.");
			button = anotherButton(button, "Scylla", scylla.scyllaAdictsAnonV);
			break;
		case Scylla.SCYLLA_ACTION_FLYING_SOLO:
			MainScreen.text("\n\nIt looks like Scylla is milling around here this morning, praying as she keeps an eye out for someone to 'help'.");
			button = anotherButton(button, "Scylla", scylla.scyllasFlyingSolo);
			break;
		default:
	}
	//Nun cat stuff!
	if (katherine.needIntroductionFromScylla()) {
		katherine.catMorphIntr();
		button = anotherButton(button,"ScyllaCats",katherine.katherineGreeting);
	}
	//URTA
	if (kGAMECLASS.urta.urtaAtBar()) {
		//Scylla & The Furries Foursome
		if (scylla.action == Scylla.SCYLLA_ACTION_FURRY_FOURSOME)
		{
			trace("SCYLLA ACTION: " + scylla.action);
			MainScreen.text("\n\nScylla’s spot in the bar is noticeably empty. She’s usually around at this time of day, isn’t she? Urta grabs your attention with a whistle and points to a back room with an accompanying wink. Oh... that makes sense. Surely the nun won’t mind a little help with her feeding...");
			button = anotherButton(button,"Back Room",scylla.openTheDoorToFoursomeWivScyllaAndFurries);
		}
		//Urta X Scylla threesome
		if (scylla.action == Scylla.SCYLLA_ACTION_FUCKING_URTA) {
			if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00143] == 0)
				MainScreen.text("\n\n<b>Though Urta would normally be here getting sloshed, her usual spot is completely vacant.  You ask around but all you get are shrugs and giggles.  Something isn't quite right here.  You see an empty bottle of one of her favorite brands of whiskey still rolling on her table, so she can't have been gone long.  Maybe she had guard business, or had to head to the back rooms for something?</b>");
			else
				MainScreen.text("\n\nUrta's usual place is vacant, though her table still holds a half-drank mug of something potent and alcoholic.  If it's anything like the last time this happened, she's snuck into a back room with Scylla to relieve some pressure.  It might not hurt to join in...");
			Flags.list[FlagEnum.URTA_TIME_SINCE_LAST_CAME] = 4;
			button = anotherButton(button, "Back Room", kGAMECLASS.urta.scyllaAndUrtaSittingInATree);
		}
		else if (kGAMECLASS.urta.urtaBarDescript()) {
			if (auntNancy.auntNancy(false) && Flags.list[FlagEnum.URTA_INCUBATION_CELEBRATION] == 0 && kGAMECLASS.urta.pregnancy.type == PregnancyType.PLAYER) {
				kGAMECLASS.urtaPregs.urtaIsHappyAboutPregnancyAtTheBar();
				return;
			}
			button = anotherButton(button,"Urta",kGAMECLASS.urta.urtaBarApproach);
		}
	}
	//VALA
	if(kGAMECLASS.purifiedFaerieBitchBar()) button = anotherButton(button,"Vala",kGAMECLASS.chooseValaInBar);

	MainScreen.addButton(9,"Leave",telAdreMenu);
}

/*
private oldbarTelAdre():void {
	hideUpDown();
	let edryn2:number = 0;
	let urta2:Function = null;
	let misc1:Function = null;
	let misc1Name:string = "";
	MainScreen.text("", true);
	if(Flags.list[FlagEnum.LOPPE_DISABLED] == 0 && Flags.list[FlagEnum.LOPPE_MET] == 0 && rand(10) == 0) {
		loppe.loppeFirstMeeting();
		return;
	}
	MainScreen.text("The interior of The Wet Bitch is far different than the mental picture its name implied.  It looks like a normal tavern, complete with a large central hearth, numerous tables and chairs, and a polished dark wood bar.  The patrons all seem to be dressed and interacting like normal people, that is if normal people were mostly centaurs and dog-morphs of various sub-species.  The atmosphere is warm and friendly, and ", false);
	if(player.humanScore() <= 3) MainScreen.text("despite your altered appearance, ", false);
	MainScreen.text("you hardly get any odd stares.  There are a number of rooms towards the back, as well as a stairway leading up to an upper level.", false);
	//Hours of operation decrease after birth
	if(!kGAMECLASS.urtaQuest.urtaBusy()) {
		if(edryn.edrynBar()) {
			//Edryn panic appearance!
			if(Flags.list[FlagEnum.EDRYN_PREGNAT_AND_NOT_TOLD_PC_YET] == 0 && Flags.list[FlagEnum.EDRYN_PREGNANCY_INCUBATION] > 0 && Flags.list[FlagEnum.EDRYN_NUMBER_OF_KIDS] == 0) {
				MainScreen.text("\n\nEdryn smiles when she sees you and beckons you towards her.  Fear and some kind of frantic need are painted across her face, imploring you to come immediately.  Whatever the problem is, it doesn't look like it can wait.", false);
				doNext(edryn.findOutEdrynIsPregnant);
				Flags.list[FlagEnum.EDRYN_PREGNAT_AND_NOT_TOLD_PC_YET]++;
				return;
			}
			//Edryn re-preggers appearance!
			if(Flags.list[FlagEnum.EDRYN_PREGNAT_AND_NOT_TOLD_PC_YET] == 0 && Flags.list[FlagEnum.EDRYN_NUMBER_OF_KIDS] > 0) {
				Flags.list[FlagEnum.EDRYN_PREGNAT_AND_NOT_TOLD_PC_YET]++;
				MainScreen.text("\n\nEdryn smiles at you and yells, \"<i>Guess what " + player.short + "?  I'm pregnant again!</i>\"  There are some hoots and catcalls but things quickly die down.  You wonder if her scent will be as potent as before?", false);
			}
			//Edryn just had a kid and hasn't talked about it!
			else if(Flags.list[FlagEnum.EDRYN_NEEDS_TO_TALK_ABOUT_KID] == 1) {
				MainScreen.text("\n\nEdryn the centaur isn't pregnant anymore!  She waves excitedly at you, beckoning you over to see her.  It looks like she's already given birth to your child!", false);
			}
			//Mid-pregnancy appearance
			else if(Flags.list[FlagEnum.EDRYN_PREGNANCY_INCUBATION] > 0) {
				MainScreen.text("\n\nEdryn is seated at her usual table, and chowing down with wild abandon.  A stack of plates is piled up next to her.  Clearly she has been doing her best to feed her unborn child.  She notices you and waves, blushing heavily.", false);
			}
			//Appearance changes if has had kids
			else if(Flags.list[FlagEnum.EDRYN_NUMBER_OF_KIDS] > 0) {
				MainScreen.text("\n\nEdryn is seated at her usual place, picking at a plate of greens and sipping a mug of the local mead.  She looks bored until she sees you.  Her expression brightens immediately, and Edryn fiddles with her hair and changes her posture slightly.  You aren't sure if she means to, but her cleavage is prominently displayed in an enticing manner.", false);
			}
			else if(player.statusAffects.get("Edryn").value1 < 3) {
				MainScreen.text("\n\nEdryn, the centauress you met at the gate, is here, sitting down at her table alone and sipping on a glass of wine.  You suppose you could go talk to her a bit.", false);
			}
			else MainScreen.text("\n\nEdryn the centauress is here, sipping wine at a table by herself.  She looks up and spots you, her eyes lighting up with happiness.  She gives you a wink and asks if you'll join her.", false);
			if(edryn2 == 0) edryn2 = 2257;
		}
	}
	//Nun cat stuff!
	if((model.time.hours > 8 || model.time.hours < 18) && player.hasKeyItem("Silver Kitty-Bell") >= 0) {
		misc1Name = "ScyllaCats";
		misc1 = katherine.katherineGreeting;
		katherine.catMorphIntr();
	}
	//Scylla - requires dungeon shut down
	if(player.lowerBody.cockSpot.count() > 0 && player.statusAffects.has("DungeonShutDown")) {
		//Scylla repeat
		//big dick!
		if(player.longestCockLength() >= 12) {
			if(Flags.list[FlagEnum.NUMBER_OF_TIMES_MET_SCYLLA] == 0) {
				MainScreen.text("\n\nThere is one nun sitting in a corner booth who catches your eye.  She sits straight-backed against the dark, wood chair, her thin waist accentuating the supple curve of her breasts. She's dressed in a black robe that looks a few sizes too small for her hips and wears a black and white cloth over her head.", false);
				misc1 = scylla.talkToScylla;
				misc1Name = "Nun";
			}
			else if(Flags.list[FlagEnum.NUMBER_OF_TIMES_MET_SCYLLA] == 1 && rand(5) == 0) {
				MainScreen.text("", true);
				scylla.scyllaRoundII();
				return;
			}
			else if(Flags.list[FlagEnum.NUMBER_OF_TIMES_MET_SCYLLA] == 2 && rand(5) == 0) {
				MainScreen.text("", true);
				scylla.scyllaRoundThreeCUM();
				return;
			}
			//Round 4 goes here
			else if(Flags.list[FlagEnum.NUMBER_OF_TIMES_MET_SCYLLA] == 3 && rand(5) == 0) {
				scylla.scyllaRoundIVGo();
				return;
			}
			//Round 6 - catscratch!
			else if(Flags.list[FlagEnum.NUMBER_OF_TIMES_MET_SCYLLA] == 5 && rand(5) == 0) {
				MainScreen.text("\n\nIt looks like Scylla is here but getting ready to leave.  You could check and see what the misguided nun is up to.", false);
				misc1Name = "Scylla";
				misc1 = scylla.Scylla6;
			}
			//Round 5 - repeatable!
			else if(Flags.list[FlagEnum.NUMBER_OF_TIMES_MET_SCYLLA] >= 4 && (model.time.hours == 18 || model.time.hours == 19)) {
				MainScreen.text("\n\nYou see Scylla's white and black nun's habit poking above the heads of the other patrons. The tall woman seems unaware of her effect on those around her, but it's clear by the way people are crowding she's acquired a reputation by now. You're not sure what she's doing, but you could push your way through to find out.", false);
				misc1Name = "Scylla";
				misc1 = scylla.scyllaAdictsAnonV;
			}
			//Round 2.5 Repeatable
			else if(Flags.list[FlagEnum.NUMBER_OF_TIMES_MET_SCYLLA] >= 2 && Flags.list[FlagEnum.FED_SCYLLA_TODAY] == 0 && model.time.hours >= 7 && model.time.hours <= 11) {
				MainScreen.text("\n\nIt looks like Scylla is milling around here this morning, praying as she keeps an eye out for someone to 'help'.");
				misc1Name = "Scylla";
				misc1 = scylla.scyllasFlyingSolo;
			}
		}
	}
	if(model.time.hours >= 8 && model.time.hours <= 16 && (misc1 == null || (rand(2) == 0 && misc1 != scylla.Scylla6)) && Flags.list[FlagEnum.NIAMH_STATUS] == 0) {
		niamh.telAdreNiamh();
		if(Flags.list[FlagEnum.MET_NIAMH] == 0) misc1Name = "Beer Cat";
		else misc1Name = "Niamh";
		misc1 = niamh.approachNiamh;
	}
	let hel:Function = null;
	if(player.gender > 0 && model.time.hours >= 14 && rand(2) == 0 && model.time.hours < 20 && Flags.list[FlagEnum.HEL_FUCKBUDDY] == 1 && (!kGAMECLASS.helFollower.followerHel() || Flags.list[FlagEnum.HEL_HARPY_QUEEN_DEFEATED] == 1)) {
		edryn.helAppearance();
		hel = edryn.approachHelAtZeBitch;
	}
	//Everyone's favorite Vala!
	let vala:number = 0;
	//Backroom urta
	let backroom:* = 0;
	let backroomT:string = "Backrooms";
	if(kGAMECLASS.purifiedFaerieBitchBar()) vala = 2621;
	if(!kGAMECLASS.urtaQuest.urtaBusy() && Flags.list[FlagEnum.AMILY_VISITING_URTA] != 1 && model.time.hours < 15) {
		//Scylla + Urta sitting in a tree
		// SOME COMFORT     FUCKED URTA      NOT PISSED      DRUNK TIME    SCYLLA TO LV4    RANDOM CHANCE  HAS THIS HAPPENED BEFORE? SCYLLA REQS ->
		if(Flags.list[FlagEnum.URTA_TIME_SINCE_LAST_CAME] == 0 && Flags.list[FlagEnum.URTA_COMFORTABLE_WITH_OWN_BODY] > 2 && Flags.list[FlagEnum.TIMES_FUCKED_URTA] > 0 && Flags.list[FlagEnum.URTA_ANGRY_AT_PC_COUNTDOWN] < 1 && (kGAMECLASS.urta.urtaDrunk() || Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00143] > 0) && Flags.list[FlagEnum.NUMBER_OF_TIMES_MET_SCYLLA] >= 3 && rand(3) == 0 && (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00143] == 0 || (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00147] == 0 && Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00145] > 0)) && ((Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00143] > 0 && !kGAMECLASS.urta.urtaDrunk()) || player.lowerBody.balls > 0) && player.lowerBody.cockSpot.count() > 0 && misc1Name != "Scylla") {
			if(Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00143] > 0) {
				MainScreen.text("\n\nUrta's usual place is vacant, though her table still holds a half-drank glass of water.  If it's anything like the last time this happened, she's snuck into a back room with Scylla to relieve some pressure.  It might not hurt to join in...", false);
			}
			else {
				if(Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00143] == 0) {
					MainScreen.text("\n\n<b>Though Urta would normally be here getting sloshed, her usual spot is completely vacant.  You ask around but all you get are shrugs and giggles.  Something isn't quite right here.  You see an empty bottle of one of her favorite brands of whiskey still rolling on her table, so she can't have been gone long.  Maybe she had guard business, or had to head to the back rooms for something?</b>", false);
				}
				else {
					MainScreen.text("\n\nUrta's usual place is vacant, though her table still holds a half-drank mug of something potent and alcoholic.  If it's anything like the last time this happened, she's snuck into a back room with Scylla to relieve some pressure.  It might not hurt to join in...", false);
				}
			}
			Flags.list[FlagEnum.URTA_TIME_SINCE_LAST_CAME] = 4;
			if(misc1Name == "Scylla") misc1 = null;
			urta2 = null;
			backroom = kGAMECLASS.urta.scyllaAndUrtaSittingInATree;
			Flags.list[FlagEnum.URTA_TIME_SINCE_LAST_CAME] = 4;
		}
		else if(kGAMECLASS.urta.urtaBarDescript()) {
			if(Flags.list[FlagEnum.URTA_INCUBATION_CELEBRATION] == 0 && Flags.list[FlagEnum.URTA_INCUBATION] > 0) {
				kGAMECLASS.urtaPregs.urtaIsHappyAboutPregnancyAtTheBar();
				return;
			}
			urta2 = kGAMECLASS.urta.urtaBarApproach;
		}
		else urta2 = null;
	}
	//Ask about Amily!
	if(Flags.list[FlagEnum.AMILY_VISITING_URTA] == 1) {
		backroom = 3187;
		backroomT = "Ask4Amily";
	}
	let dominika2:number = 0;
	if(model.time.hours > 17 && model.time.hours < 20 && Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00150] != -1) {
		dominika2 = 2739;
		dominika.fellatrixBarAppearance();
	}

	let nancy:Function = null;
	let nancyText:string = "Barkeep";
	if(auntNancy.auntNancy(false)) {
		auntNancy.auntNancy(true);
		if(Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00263] > 0) nancyText = "Nancy";
		nancy = auntNancy.interactWithAuntNancy;
	}
	else MainScreen.text("\n\nIt doesn't look like there's a bartender working at the moment.", false);

	let rogarB:Function = null;
	let rogarT:string = "HoodedFig";
	if(Flags.list[FlagEnum.ROGAR_PHASE] == 3 && Flags.list[FlagEnum.ROGAR_DISABLED] == 0 && Flags.list[FlagEnum.ROGAR_FUCKED_TODAY] == 0) {
		rogarB = kGAMECLASS.swamp.rogar.rogarThirdPhase;
		//Wet Bitch screen text when Ro'gar phase = 3:
		MainScreen.text("\n\nYou notice a cloaked figure at the bar, though you're quite unable to discern anything else as its back is turned to you.", false);
	}
	else if(Flags.list[FlagEnum.ROGAR_PHASE] >= 4 && Flags.list[FlagEnum.ROGAR_DISABLED] == 0 && Flags.list[FlagEnum.ROGAR_FUCKED_TODAY] == 0) {
		rogarB = kGAMECLASS.swamp.rogar.rogarPhaseFour;
		rogarT = "Rogar";
		//Wet Bitch bar text when Ro'gar phase = 4:
		MainScreen.text("\n\nRo'gar is here with his back turned to the door, wearing his usual obscuring cloak.", false);
	}
	let kath:number = 0;
	choices("Dominika",dominika2,"Edryn",edryn2,"Hel",hel,misc1Name,misc1,nancyText,nancy,rogarT,rogarB,"Urta",urta2,"Vala",vala,"Backroom",backroom,"Leave",telAdreMenu);
}
*/

public tailorShoppe():void {
	MainScreen.text("", true);
	spriteSelect(61);
	MainScreen.text("The inside of the tailor's shop is far cleaner than anything else you've seen in the city.  The walls are painted muted gray, and the floor is carpeted with a sprawling, royal blue rug.  After glancing around, you realize WHY the walls and floor are so muted – the quiet backdrop makes the merchandise look even more amazing.  There are racks and racks of clothing, but much of it is plain comfortable clothing, and not worth spending much time investigating.  A high-pitched voice pipes up, \"<i>Can I help you?</i>\"\n\n", false);
	if(!player.statusAffects.has("Victoria")) {
		MainScreen.text("You turn around, ", false);
		if(player.tallness > 60) MainScreen.text("looking for the source, eventually looking down and at a short but busty Corgi dog-girl.  ", false);
		else MainScreen.text("coming face to face with a busty Corgi dog-girl.  ", false);
		MainScreen.text("She's clearly the tailor judging by her stylish, low-cut clothing and poofy hat.  A monocle perches on her nose, giving her a rather distinguished appearance.  The fashionable wench arches her back, showing off what she's got as she introduces herself, \"<i>Ello love, welcome to my shop.  My name's Victoria, though if you like, you can call me Vicky.  You'll find my clothing to be a cut above the rubbish sold elsewhere.</i>\"", false);
		//Flag as meeting her
		player.statusAffects.add(new StatusAffect("Victoria",0,0,0,0)));
	}
	else {
		MainScreen.text("You turn around to look ", false);
		if(player.tallness > 60) MainScreen.text("down ", false);
		MainScreen.text("at Victoria the Corgi Tailor.  As usual, she's dressed in a stylish low-cut dress and sporting her feathery hat.", false);
	}
	MainScreen.text("\n\n(What do you want to buy?)", false);
	choices(armors.CLSSYCL.shortName, createCallBackFunction(buyClothes,armors.CLSSYCL),
			armors.RBBRCLT.shortName, createCallBackFunction(buyClothes,armors.RBBRCLT),
			armors.ADVCLTH.shortName, createCallBackFunction(buyClothes,armors.ADVCLTH),
			armors.TUBETOP.shortName, createCallBackFunction(buyClothes,armors.TUBETOP),
			armors.OVERALL.shortName, createCallBackFunction(buyClothes,armors.OVERALL),
			armors.B_DRESS.shortName, createCallBackFunction(buyClothes,armors.B_DRESS),
			armors.T_BSUIT.shortName, createCallBackFunction(buyClothes,armors.T_BSUIT),
			armors.M_ROBES.shortName, createCallBackFunction(buyClothes,armors.M_ROBES),
			armors.LTHRPNT.shortName, createCallBackFunction(buyClothes,armors.LTHRPNT),
			"Leave",telAdreMenu);
}


private buyClothes(itype:ItemType):void {
	MainScreen.text("", true);
	spriteSelect(61);
	MainScreen.text("Victoria nods and pulls a measuring tape off her shoulder.  She moves around you with practiced ease, taking measurements from every conceivable angle.  Thanks to her small stature, it's quite easy for her to take your inseam measurement, though Vicky manages to ", false);
	if(player.lowerBody.cockSpot.biggestCocks[0].cockArea() > 30 || player.lowerBody.cockSpot.count() > 1) MainScreen.text("fondle your bulging package", false);
	else if(player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("rub against your outer lips", false);
	else MainScreen.text("slip a finger along your crotch", false);
	MainScreen.text(" more than a few times.  You could swear you catch her licking her lips when she stands up, but she quickly turns away, saying, \"<i>I've got one in the back that should fit perfectly!  Be right with you!</i>\"\n\n", false);
	MainScreen.text("She disappears in the back for a few moments, then returns with " + itype.longName + " that looks as if it were tailor-made for you.\n\n", false);
	MainScreen.text("\"<i>" + itype.value + " gems and it can be yours,</i>\" she says.  ", false);
	if(player.stats.gems < itype.value) {
		MainScreen.text("You count out your gems and realize it's beyond your price range.", false);
		//Goto shop main menu
		doNext(tailorShoppe);
		return;
	}
	//Go to debit/update function or back to shop window
	if (player.lowerBody.cockSpot.hasCock() && player.stats.lust >= 33)
		simpleChoices("Yes", curry(debitClothes, itype), "No", tailorShoppe, "", null, "", null, "Flirt", curry(flirtWithVictoria, itype));
	else doYesNo(curry(debitClothes,itype), tailorShoppe);
}

private debitClothes(itype:ItemType):void {
	spriteSelect(61);
	player.stats.gems -= itype.value;
	statScreenRefresh();
	inventory.takeItem(itype, tailorShoppe);
}

public armorShop():void {
	MainScreen.text("", true);
	spriteSelect(64);
	MainScreen.text("The interior of the armory is blisteringly hot, filled with intense heat from the massive forge dominating the far side of the shop.  The bellows are blowing hard as a tall german-shepherd woman works the forge.  Incredibly, she's wearing nothing aside from a ragged leather apron.  It bulges from the front, barely containing her obscene proportions as it protects them from the heat of her forge.  She pulls a piece of metal from the forge and strikes it a few times with a hammer bigger than your head, then tosses it in a bucket filled with water, steam boiling out of it from the hot metal.  At last, the sweating forgemistress notices you and turns around, her breasts jiggling wildly.\n\n", true);
	//MainScreen.text("\"<i>Vat can Yvonne make for you?  Ze platemail?  Or someting a bit lighter?</i>\" she asks you.", false);
	MainScreen.text("\"<i>What can I make for you?  Platemail?  Or something that breathes a little easier?</i>\" Yvonne asks, fanning herself.");

	let egg:Function =null;
	if(player.hasKeyItem("Dragon Eggshell") >= 0) {
		MainScreen.text("\n\nThough the pieces on display have their arguable attractions, none of them really interest you.  Yvonne taps her foot impatiently.  \"<i>Well, I could make you something to order... if you have any decent materials, cutie.  200 gems.</i>\"");
		if(player.stats.gems < 200) {
			MainScreen.text("\n\nYou can't afford that!");
		}
		else egg = kGAMECLASS.emberScene.getSomeStuff;
	}
	choices(armors.CHBIKNI.shortName, createCallBackFunction(armorBuy, armors.CHBIKNI),
			armors.FULLCHN.shortName, createCallBackFunction(armorBuy, armors.FULLCHN),
			armors.FULLPLT.shortName, createCallBackFunction(armorBuy, armors.FULLPLT),
			armors.INDECST.shortName, createCallBackFunction(armorBuy, armors.INDECST),
			armors.LTHRROB.shortName, createCallBackFunction(armorBuy, armors.LTHRROB),
			armors.SCALEML.shortName, createCallBackFunction(armorBuy, armors.SCALEML),
			"", null, "Eggshell", egg, "Flirt", yvonneFlirt, "Leave", telAdreMenu);
}

public weaponShop():void {
	MainScreen.text("", true);
	spriteSelect(80);
	MainScreen.text("The high pitched ring of a steel hammer slamming into hot metal assaults your ears as you walk up to the stand.  Sparks are flying with every blow the stand's owner strikes on his current work.  The metal is glowing red hot, and the hammer falls with the relentless, practiced precision of an experienced blacksmith's guiding hand.  Thick gray and white fur ruffles as the blacksmith stands up, revealing the details of his form to you.  He's one of the dog-people that inhabits this city, though his fur and ears remind you of a dog one of your friends had growing up called a husky.  The blacksmith is anything but husky.  He's fairly short, but lean and whip-cord tough.  His right arm is far more thickly muscled than his left thanks to his trade, and he walks with a self-assured gait that can only come with age and experience.\n\n", false);

	MainScreen.text("His piercing blue eyes meet yours as he notices you, and he barks, \"<i>Buy something or fuck off.</i>\"\n\nWhat do you buy?", false);

	choices(consumables.W_STICK.shortName, createCallBackFunction(weaponBuy, consumables.W_STICK),
			weapons.CLAYMOR.shortName, createCallBackFunction(weaponBuy, weapons.CLAYMOR),
			weapons.WARHAMR.shortName, createCallBackFunction(weaponBuy, weapons.WARHAMR),
			weapons.KATANA.shortName, createCallBackFunction(weaponBuy, weapons.KATANA),
			weapons.SPEAR.shortName, createCallBackFunction(weaponBuy, weapons.SPEAR),
			weapons.WHIP.shortName, createCallBackFunction(weaponBuy, weapons.WHIP),
			weapons.W_STAFF.shortName, createCallBackFunction(weaponBuy, weapons.W_STAFF),
			weapons.S_GAUNT.shortName, createCallBackFunction(weaponBuy, weapons.S_GAUNT),
			"", null, "Leave", telAdreMenu);
}
private weaponBuy(itype:ItemType):void {
	MainScreen.text("", true);
	spriteSelect(80);
	MainScreen.text("The gruff metal-working husky gives you a slight nod and slams the weapon down on the edge of his stand.  He grunts, \"<i>That'll be " + itype.value + " gems.</i>\"", false);
	if(player.stats.gems < itype.value) {
		MainScreen.text("\n\nYou count out your gems and realize it's beyond your price range.", false);
		//Goto shop main menu
		doNext(weaponShop);
		return;
	}
	else MainScreen.text("\n\nDo you buy it?\n\n", false);
	//Go to debit/update function or back to shop window
	doYesNo(curry(debitWeapon,itype), weaponShop);
}
private debitWeapon(itype:ItemType):void {
	spriteSelect(80);
	player.stats.gems -= itype.value;
	statScreenRefresh();
	inventory.takeItem(itype, weaponShop);
}
private armorBuy(itype:ItemType):void {
	spriteSelect(64);
	MainScreen.text("", true);
	MainScreen.text("Yvonne gives you a serious look, then nods.  She pulls the armor off a rack and makes a few adjustments, banging away with her massive hammer to ensure a perfect fit.  The entire time, she's oblivious to the movements of her massive breasts, accidentally exposing her impressive nipples multiple times.\n\n", false);
	MainScreen.text("She finishes and turns to you, smiling broadly, \"<i>Now, that will be " + itype.value + " gems, unless you want to change your mind?</i>\"", false);
	if(player.stats.gems < itype.value) {
		MainScreen.text("\n\nYou count out your gems and realize it's beyond your price range.", false);
		//Goto shop main menu
		doNext(armorShop);
		return;
	}
	else MainScreen.text("\n\nDo you buy it?", false);
	//Go to debit/update function or back to shop window
	doYesNo(curry(debitArmor,itype),armorShop);
}

private debitArmor(itype:ItemType):void {
	spriteSelect(64);
	MainScreen.text("", true);
	player.stats.gems -= itype.value;
	statScreenRefresh();
	inventory.takeItem(itype, armorShop);
}

private urtaIsABadass():void {
	Flags.list[FlagEnum.PC_SEEN_URTA_BADASS_FIGHT] = 1;
	MainScreen.text("", true);
	MainScreen.text("There's a commotion in the streets of Tel'Adre.  A dense crowd of onlookers has formed around the center of the street, massed together so tightly that you're unable to see much, aside from the backs the other onlookers' heads.  The sound of blows impacting on flesh can be heard over the crowd's murmuring, alerting you of the fight at the gathering's core.", false);
	simpleChoices("Investigate", watchUrtaBeABadass, "Who cares?", telAdreMenu, "", null, "", null, "", null);
}

//[Invetigate]
private watchUrtaBeABadass():void {
	MainScreen.text("", true);
	kGAMECLASS.urta.urtaSprite();
	MainScreen.text("You shoulder past the bulky centaurs, ignore the rough fur of the nearby wolves and hounds as it brushes against you, and press your way through to the center of the crowd.  Eventually the throng parts, revealing the embattled combatants.  A snarling wolf, nearly eight feet tall, towers over Urta.  The comparatively diminutive fox-woman is girded in light leather armor and dripping with sweat.  The larger wolf-man is staggering about, and his dark brown fur is matted with blood.\n\n", false);

	MainScreen.text("The bigger canid charges, snarling, with his claws extended.  Urta sidesteps and pivots, her momentum carrying her foot around in a vicious kick.  Her foot hits the side of the beast's knee hard enough to buckle it, and the wolf goes down on his knees with an anguished cry.  Urta slips under his arm and twists, turning his slump into a fall.  A cloud of dust rises from the heavy thud of the beast's body as it slams into the cobblestone street.\n\n", false);

	MainScreen.text("Now that it's immobile, you get can get a better look at the defeated combatant, and you're ", false);
	if(player.statusAffects.has("Infested")) MainScreen.text("aroused", false);
	else if(player.stats.cor < 50) MainScreen.text("horrified", false);
	else MainScreen.text("confused", false);
	MainScreen.text(" by what you see.  A pair of thick, demonic horns curve back over the beast's head, piercing through the bottoms of its wolf-like ears.  Its entire body is covered in rippling muscle, leaving you in no doubt of its strength.  Even with a broken knee, the wolf-man is clearly aroused: protruding from a bloated sheath, his massive dog-dick is fully erect, solid black in color, with an engorged knot.  Small white worms crawl over the surface of his penis, wriggling out of the tip and crawling down the length, leaving trails of slime behind them.\n\n", false);

	MainScreen.text("Urta kneels down onto the corrupted wolf's throat, cutting off its air as it foams and struggles under her.  With grim determination, she holds the weakening, demonically-tainted wolf underneath her, leaning all of her body-weight into her knee to keep it down.  It struggles for what seems like ages, but eventually the tainted wolf's eyes roll closed.  Urta nods and rises, watching closely as the beast's breathing resumes.\n\n", false);

	MainScreen.text("She barks, \"<i>Get this one outside the walls before he wakes.  I won't have this corrupted filth in our city, and make sure you get the wards updated.  If he manages to find his way back, you sorry excuses for guards will be going out with him.</i>\"\n\n", false);
	MainScreen.text("A few dog-morphs in similar armor to Urta approach and lash ropes around the wolf's legs.  They hand a line to a centaur, and together the party begins dragging the unconscious body away.  With the action over, the crowd begins dispersing.  More than a few males nod to Urta respectfully.  She keeps her expression neutral and excuses herself to resume her rounds, wiping her hands off on her armor-studded skirt as she leaves.", false);
	doNext(telAdreMenu);
}

public gymDesc():void {
	//PREGGO ALERT!
	if (Flags.list[FlagEnum.PC_IS_A_GOOD_COTTON_DAD] + Flags.list[FlagEnum.PC_IS_A_DEADBEAT_COTTON_DAD] == 0 && cotton.pregnancy.isPregnant) {
		cotton.cottonPregnantAlert();
		return;
	}

	MainScreen.text("", true);
	MainScreen.text("Even though Ingnam, your hometown, was a large, prosperous village, you never saw a gym before coming to Tel'Adre.  The structure itself has numerous architectural differences from the surrounding buildings: short, waist-high walls, an arched ceiling supported by simple columns, and a sand-covered floor.  Perhaps the only 'normal' rooms inside are the changing stands and bathrooms, which ", false);
	if(player.stats.cor < 35) MainScreen.text("thankfully ", false);
	else if(Flags.list[FlagEnum.PC_FETISH] > 0 || player.stats.cor > 80) MainScreen.text("unfortunately ", false);
	MainScreen.text("have full sized walls to protect their users' privacy.  A breeze blows by, revealing that the open-air design provides great ventilation.  You note a wall of weights of different sizes and shapes, perfect for building muscle and bulking up.  There are also jogging tracks and even a full-sized, grass-covered track out back for centaurs to run on.  Though some of the equipment seems a bit esoteric in nature, you're sure you can make use of most of this stuff.\n\n", false);

	MainScreen.text("Though the gym sees heavy use by the city guard and various citizens, it's not too busy at present.", false);
	//(Add possible character descripts here)
	//(An extraordinarily well-muscled centaur male is by the weights, lifting some huge dumbbells and sweating like crazy.  In true centaur fashion, he's not wearing any clothes, but then again, male centaurs don't have much that regular clothes would hide.)
	//(There's a lizan girl jogging laps on one of the tracks.  She's quite thin, but her muscles have a lean definition to them.  She's wearing a one-piece, spandex leotard that hugs her tight ass and pert, b-cup breasts nicely.)
	MainScreen.text("  There's a centauress in a tank-top just inside the doorway with huge, rounded melons and perky nipples, but she merely coughs to get you to look up and says, \"<i>", false);
	if(Flags.list[FlagEnum.LIFETIME_GYM_MEMBER] == 0) MainScreen.text("10 gems an hour to use the facilities here, or 500 for a life-time membership.</i>\"  She has her hands on her hips, and it looks you'll have to pay ten gems to actually get to use any of this stuff.", false);
	else MainScreen.text("Oh, welcome back " + player.short + ".  Have a nice workout!</i>\"", false);

	if(player.stats.gems < 10 && Flags.list[FlagEnum.LIFETIME_GYM_MEMBER] == 0) {
		MainScreen.text("\n\n<b>You reach into your pockets for the fee and come up empty.  It looks like you don't have enough money to use the equipment or meet anyone.  Damn!</b>", false);
		//(back to tel'adre streets)
		doNext(telAdreMenu);
		return;
	}
	lottie.lottieAppearance();
	if(Flags.list[FlagEnum.LOPPE_MET] > 0 && Flags.list[FlagEnum.LOPPE_DISABLED] == 0) {
		MainScreen.text("\n\nYou spot Loppe the laquine wandering around, towel slung over her shoulder.  When she sees you, she smiles and waves to you and you wave back.");
	}
	if(model.time.hours > 9 && model.time.hours < 14) heckel.heckelAppearance();
	gymMenu();
}

private gymMenu():void {

	let membership:Function =null;
	let cotton2:Function =null;
	let cottonB:string = "Horsegirl";
	let hyena:Function =null;
	let hyenaB:string = "Hyena";
	let ifris2:Function =null;
	let ifrisB:string = "Girl";
	let lottie2:Function = lottie.lottieAppearance(false);
	let lottieB:string = "Pig-Lady";
	let loppe2:Function =null;
	if(Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00281] > 0)
		lottieB = "Lottie";
	if(ifris.ifrisIntro())
		ifris2 = ifris.approachIfris;
	if(Flags.list[FlagEnum.MET_IFRIS] > 0)
		ifrisB = "Ifris";
	if(model.time.hours > 9 && model.time.hours <= 15) {
		hyena = heckel.greetHeckel;
		if(Flags.list[FlagEnum.MET_HECKEL] > 0)
			hyenaB = "Heckel";
	}
	if(Flags.list[FlagEnum.LIFETIME_GYM_MEMBER] == 0 && player.stats.gems >= 500)
		membership = buyGymLifeTimeMembership;
	if(Flags.list[FlagEnum.PC_IS_A_DEADBEAT_COTTON_DAD] == 0) {
		if(cotton.cottonsIntro())
			cotton2 = cotton.cottonGreeting;
	}
	if(Flags.list[FlagEnum.COTTON_MET_FUCKED] > 0)
		cottonB = "Cotton";
	if(Flags.list[FlagEnum.LOPPE_MET] > 0 && Flags.list[FlagEnum.LOPPE_DISABLED] == 0)
		loppe2 = loppe.loppeGenericMeetings;

	choices("ChangeRoom",jasun.changingRoom,
			cottonB,cotton2,
			hyenaB,hyena,
			ifrisB,ifris2,
			"Jog",goJogging,
			"LiftWeights",weightLifting,
			"Life Member",membership,
			lottieB,lottie2,
			"Loppe",loppe2,
			"Leave",telAdreMenu);
}

private buyGymLifeTimeMembership():void {
	MainScreen.text("", true);
	//[Buy LifeTime Membership]
	MainScreen.text("You fish into your pouches and pull out 500 gems, dumping them into the centaur's hands.  Her eyes widen as she turns and trots towards a counter in the back.  She leans over as she counts, giving you a generous view down her low-cut top at the cleavage she barely bothers to conceal.", false);
	if(player.lowerBody.cockSpot.hasCock()) {
		MainScreen.text("  It brings a flush to your face that has nothing to do with exercise.  Maybe you'll be able to con her into some alone time later?", false);
		dynStats("lus", (10+player.stats.lib/10));
	}
	Flags.list[FlagEnum.LIFETIME_GYM_MEMBER] = 1;
	player.stats.gems -= 500;
	statScreenRefresh();
	//[Bring up gym menu]
	gymMenu();
}

private weightLifting():void {
	MainScreen.text("", true);
	//Too tired?  Fuck off.
	if(player.fatigue > 75) {
		MainScreen.text("<b>There's no way you could exercise right now - you're exhausted!</b>  ", false);
		if(Flags.list[FlagEnum.LIFETIME_GYM_MEMBER] == 0) MainScreen.text("It'd be better to save your money and come back after you've rested.", false);
		doNext(telAdreMenu);
		return;
	}
	//Deduct gems if not a full member.
	if(Flags.list[FlagEnum.LIFETIME_GYM_MEMBER] == 0) {
		player.stats.gems -= 10;
		statScreenRefresh();
	}
	//[Lift Weights] +25 fatigue!
	fatigue(25);
	//TEXTS!
	MainScreen.text("You walk up to the weights and begin your workout.  ", false);
	//(< 25 str)
	if(player.stats.str < 25) MainScreen.text("You have to start out on the smaller weights to the left side of the rack due to your strength, but even so, you manage to work up a good burn and a modest sweat.", false);
	//(< 40 str)
	else if(player.stats.str < 40) MainScreen.text("You heft a few of the weights and select some of the ones just to the left of the middle.  It doesn't take you long to work up a sweat, but you push on through a variety of exercises that leave your body feeling sore and exhausted.", false);
	//(< 60 str)
	else if(player.stats.str < 60) MainScreen.text("You smile when you grip a few of the heavier weights on the rack and start to do some lifts.  With a start, you realize you're probably stronger now than Ingnam's master blacksmith, Ben.  Wow!  This realization fuels you to push yourself even harder, and you spend nearly an hour doing various strength-building exercises with the weights.", false);
	//(<80 str)
	else if(player.stats.str < 80) MainScreen.text("You confidently grab the heaviest dumbbells in the place and heft them.  It doesn't take long for you to work up a lather of sweat and feel the burn thrumming through your slowly tiring form.  The workout takes about an hour, but you feel you made some good progress today.", false);
	//(<90)
	else if(player.stats.str < 90) MainScreen.text("You grab the heaviest weights they have and launch into an exercise routine that leaves you panting from exertion.  Setting the weights aside, you flex and marvel at yourself – you could probably arm wrestle a minotaur or two and come out victorious!", false);
	//(else)
	else MainScreen.text("This place barely has anything left to challenge you, but you take the heaviest weights you can get your mitts on and get to it.  By the time an hour has passed, you've worked up a good sweat, but without heavier weights you probably won't get any stronger.", false);
	//Stat changes HERE!
	if(player.stats.str < 90) player.stats.str += .5;
	if(player.stats.tou < 40) player.stats.tou += .3;
	//Body changes here
	//Muscleness boost!
	MainScreen.text(player.modTone(85,5+rand(5)), false);
	MainScreen.text("\n\nDo you want to hit the showers before you head back to camp?", false);
	if(Flags.list[FlagEnum.BROOKE_MET] == 1) {
		menu();
		MainScreen.addButton(0,"\"Showers\"",sexMachine.exploreShowers);
		MainScreen.addButton(1,"Showers",brooke.repeatChooseShower);
		MainScreen.addButton(4,"Leave",camp.returnToCampUseOneHour);
	}
	else doYesNo(sexMachine.exploreShowers,camp.returnToCampUseOneHour);
}

private goJogging():void {
	MainScreen.text("", true);
	//Too tired?  Fuck off.
	if(player.fatigue > 70) {
		MainScreen.text("<b>There's no way you could exercise right now - you're exhausted!</b>  ", false);
		if(Flags.list[FlagEnum.LIFETIME_GYM_MEMBER] == 0) MainScreen.text("It'd be better to save your money and come back after you've rested.", false);
		doNext(telAdreMenu);
		return;
	}
	//Deduct gems if not a full member.
	if(Flags.list[FlagEnum.LIFETIME_GYM_MEMBER] == 0) {
		player.stats.gems -= 10;
		statScreenRefresh();
	}
	//[Jogging] +30 fatigue!
	fatigue(30);
	//Text!
	MainScreen.text("You hit the jogging track, ", false);
	//(<25 tou)
	if(player.stats.tou < 25) MainScreen.text("but you get so winded you have to stop after a few minutes.  Determined to improve, you force yourself to stay at a fast walk until you can run again.", false);
	//(<40 tou)
	else if(player.stats.tou < 40) MainScreen.text("but your performance isn't that great.  You nearly stop jogging a few times but manage to push through until you're completely exhausted.", false);
	//(<60 tou)
	else if(player.stats.tou < 60) MainScreen.text("and you do quite well.  You jog around for nearly an hour, working up a healthy lather of sweat.  Even your " + LowerBodyDescriptor.describeLegs(player) + " tingle and burn with exhaustion.", false);
	//(<80 tou)
	else if(player.stats.tou < 80) MainScreen.text("and it doesn't faze you in the slightest.  You run lap after lap at a decent clip, working yourself until you're soaked with sweat and fairly tired.", false);
	//(<90 tou)
	else if(player.stats.tou < 90) MainScreen.text("and you have a terrific time.  You can keep yourself just below your sprinting speed for the entire time, though you work up a huge amount of sweat in the process.", false);
	//else)
	else MainScreen.text("and it barely challenges you.  You run at a sprint half the time and still don't feel like you're improving in the slightest.  Still, you do manage to burn a lot of calories.", false);
	//Stat changes HERE!
	if(player.stats.spe < 40) player.stats.spe += .3;
	if(player.stats.tou < 90) player.stats.tou += .5;

	//If butt is over 15 guaranteed reduction
	if(player.lowerBody.butt.buttRating >= 15) {
		MainScreen.text("\n\nAll that running must have done some good, because your " + ButtDescriptor.describeButt(player) + " feels a little less bouncy.", false);
		player.lowerBody.butt.buttRating--;
	}
	else {
		if(player.lowerBody.butt.buttRating >= 10 && rand(3) == 0) {
			MainScreen.text("\n\nThe jogging really helped trim up your " + ButtDescriptor.describeButt(player) + ".", false);
			player.lowerBody.butt.buttRating--;
		}
		else if(player.lowerBody.butt.buttRating >= 5 && rand(3) == 0) {
			MainScreen.text("\n\nYour " + ButtDescriptor.describeButt(player) + " seems to have gotten a little bit more compact from the work out.", false);
			player.lowerBody.butt.buttRating--;
		}
		else if(player.lowerBody.butt.buttRating > 1 && rand(4) == 0) {
			MainScreen.text("\n\nYour " + ButtDescriptor.describeButt(player) + " seems to have gotten a little bit more compact from the work out.", false);
			player.lowerBody.butt.buttRating--;
		}
	}//If hips is over 15 guaranteed reduction
	if(player.lowerBody.hipRating >= 15) {
		MainScreen.text("\n\nIt feels like your " + LowerBodyDescriptor.describeHips(player) + " have shed some pounds and narrowed.", false);
		player.lowerBody.hipRating--;
	}
	else {
		if(player.lowerBody.hipRating >= 10 && rand(3) == 0) {
			MainScreen.text("\n\nIt feels like your " + LowerBodyDescriptor.describeHips(player) + " have shed some pounds and narrowed.", false);
			player.lowerBody.hipRating--;
		}
		else if(player.lowerBody.hipRating >= 5 && rand(3) == 0) {
			MainScreen.text("\n\nIt feels like your " + LowerBodyDescriptor.describeHips(player) + " have shed some pounds and narrowed.", false);
			player.lowerBody.hipRating--;
		}
		else if(player.lowerBody.hipRating > 1 && rand(4) == 0) {
			MainScreen.text("\n\nIt feels like your " + LowerBodyDescriptor.describeHips(player) + " have shed some pounds and narrowed.", false);
			player.lowerBody.hipRating--;
		}
	}

	//Thickness decrease!
	MainScreen.text(player.modThickness(1,5+rand(2)), false);
	//Muscleness boost!
	MainScreen.text(player.modTone(100,2+rand(4)), false);
	MainScreen.text("\n\nDo you want to hit the showers before you head back to camp?", false);
	if(Flags.list[FlagEnum.BROOKE_MET] == 1) {
		menu();
		MainScreen.addButton(0,"\"Showers\"",sexMachine.exploreShowers);
		MainScreen.addButton(1,"Showers",brooke.repeatChooseShower);
		MainScreen.addButton(4,"Leave",camp.returnToCampUseOneHour);
	}
	else doYesNo(sexMachine.exploreShowers, camp.returnToCampUseOneHour);
}

private yaraSex(girl:boolean = true):void {
	spriteSelect(63);
	MainScreen.text("", true);
	MainScreen.text("Yara makes you comfortable and has you look away while she uses her piercing tools.  It hurts, but she's skilled. Before you know it, your piercing is done!  You move to rise, retaining a bit of modesty", false);
	if(Flags.list[FlagEnum.PC_FETISH] > 0) MainScreen.text(" despite the guilty thrill", false);
	MainScreen.text(".  \"<i>Hold it,</i>\" Yara commands softly, pressing her hand against your " + chestDesc() + " and pushing you back in your chair.  \"<i>Do you think I'll let you get away without some... field testing?</i>\"\n\n", false);

	MainScreen.text("She seems intent on getting some loving - would you like to turn her down, or will you let nature run its course?", false);
	//[not at all] [yeah baby]
	if (girl)
		simpleChoices("Turn down", piercingStudio, "Oh yeah!", createCallBackFunction(letsDoYaraSex, true), "", null, "", null, "", null);
	else simpleChoices("Turn down", piercingStudio, "Oh yeah!", createCallBackFunction(letsDoYaraSex, false), "", null, "", null, "", null);
}

private letsDoYaraSex(girl:boolean = true):void {
	spriteSelect(63);
	MainScreen.text("", true);
	let x:number = player.cockThatFits(36);
	if (Flags.list[FlagEnum.HYPER_HAPPY])
	{
		x = player.cockThatFits(50000);
	}
	else if ((x == -1) && !girl)  // No cock that fits
	{
		if (player.lowerBody.vaginaSpot.hasVagina()) // But the PC has a vagoo! Swap over to female mode"
		{
			MainScreen.text("\"<i>Oh dear, cutie. There is no way I could take that huge cock of yours!</i>\" she says, looking rather crestfallen at your enormous member. \"<i>Oh well</i>\", she sighs. \"<i>I guess I'll just have to explore your feminine side instead</i>\"\n");
			girl = true;

		}
		else
		{
			MainScreen.text("\"<i>I'm sorry, cutie. There is no way I could take that huge cock of yours!</i>\" she says, looking rather crestfallen at your enormous member. Maybe come back after you've shrunk it down to a reasonable size?");
			return;
		}
	}
	MainScreen.text("Her eyes widen as you begin to ", false);
	if(player.stats.lust < 50) MainScreen.text("protest", false);
	else MainScreen.text("speak", false);
	MainScreen.text(", neatly silencing you with the lust-filled fires simmering in her eyes.  \"<i>Call it quality testing,</i>\" she purrs.  Her free hand runs up and down your inner thigh, the ticklish teasing nearly making your head spin.  Licking her lips in anticipation, Yara wiggles out of her clothes and clambers onto the chair, kneeling on the armrests.  Due to her awkward posture, you find your gaze drifting to her wide-spread legs.  Nestled there, twinkling with a radiant luster, is a golden ring, looped through her already-throbbing clit.  A blush darkens her cheeks as she notices your stare, but she seems almost empowered by it.\n\n", false);

	MainScreen.text("Yara's free hand slides down her belly - past the stud in her navel - down to her box.  Using two fingers, she spreads her lips apart, giving you a great view of both her glistening button-piercing and the fleshy recesses past it.  She bites her bottom lip gently", false);
	if(!girl && player.lowerBody.cockSpot.hasCock()) MainScreen.text(" as your " + CockDescriptor.describeCock(player, x) + " rises to attention, her eyes fixed upon the stiffened tool.  You resist the urge to grab her thin-yet-girlish hips and power into her right then and there, curious enough to allow her teasing.", false);
	else MainScreen.text(" as a growing puddle of love stains the cushioned chair.  It takes most of your power to not drag her down and force her face into your box.", false);
	MainScreen.text("\n\n", false);

	MainScreen.text("She leans forward, planting you with a wet and lingering kiss.  She moves lower, kissing ", false);
	if(player.upperBody.chest.BreastRatingLargest[0].breastRating < 1) MainScreen.text("your chest", false);
	else MainScreen.text("your nipples, one at a time", false);
	MainScreen.text(" and smooching your belly.  Even with her racially characteristic flexibility, however, she's not able to get any lower from that angle.  \"<i>Hold this, dear,</i>\" she says somewhat snarkily, pivoting around and resting her ass against your " + chestDesc() + ".  In this new posture, Yara can easily have her way with your junk, and by the way her wagging tail keeps bopping you in the face you can tell she's excited.\n\n", false);

	MainScreen.text("Not content with simple penetration, it seems, the cat girl gets to work.", false);
	if(player.lowerBody.balls > 0) MainScreen.text("  Her dexterous fingertips brush against your " + BallsDescriptor.describeBalls(true, true, player) + ", light and fluttery strokes that send shivers coursing through you.  The near-lack of contact is at least as titillating as the less-subtle Marethians you've come across.", false);
	MainScreen.text("  She scoots forward a bit, dragging her soaking cunt down your chest in an effort to reach your crotch.\n\n", false);

	//male
	if(!girl && player.lowerBody.cockSpot.hasCock()) {
		MainScreen.text("Yara's pursed lips touch down upon your cockhead, her head tilting from side to side as she vexingly and repeatedly kisses your " + CockDescriptor.describeCock(player, x) + ".  However, she abruptly pauses, glancing sidelong at you expectantly.  When you don't immediately respond, she huffs a sigh - onto your dick - and raises her hips level with your nose.  After momentarily getting lost in the bouncing of her tight-yet-jiggly cheeks, you get the message, leaning forward and giving her puffy sex a long and lingering lick.  You're rewarded with a low-pitched and very satisfied groan.  Though you go in for another taste, the shining ring looped through her joy-buzzer attracts your oral attention like a magnet.  Gently as a newborn kitten, your teeth close down on the clit-embedded trinket.  Yara goes absolutely stiff as you begin to softly tug the piercing around, neatly paralyzed by the sensitivity.  Indistinguishable mewling tumbles from her mouth as she attempts to attune herself to your yanking antics.  Her lithe frame spasms in ecstasy, forcing you to release your grip on her, lest something unfortunate happen to her undercarriage.\n\n", false);

		MainScreen.text("As soon as you release her from the mind-numbing grasp, she whips her hips forward - spattering your " + player.inventory.armor.displayName + " with her downpour of girlcum in the process - and leaning back, hastily lining herself up with your " + CockDescriptor.describeCock(player, x) + ".  Only hesitating for a second to leak a bit of lubricant onto your eager shaft, she plummets downwards, not stopping until her ass slams against your pelvis.\n\n", false);

		MainScreen.text("Yara takes total control, her death-grip on the armrests giving her full coital maneuverability.  Despite the easy entry, you can't believe how well her sopping-wet folds squeeze against you.  For a long while the only sounds heard are the slapping of her cheeks and the studded-up cat girl's halting pants of pleasure.  \"<i>I wanna say... your new piercing... works like a charm,</i>\" she mutters between throaty groans.\n\n", false);

		MainScreen.text("Before you're even allowed to respond, Yara's pace quickens, her finish line in sight.  More than eager to help spur her on, your hands wrap around her slender waist.  She purrs in appreciation of your assistance.  It's not long before, with a victorious and primal scream, she throws all her weight downwards, splattering the mixture of pre-cum and femspunk and actually stinging you a bit with the force of her descent.\n\n", false);

		MainScreen.text("The powerful motion is all the motivation your body needs.  Before either of you can even consider the ramifications of an internal ejaculation, your bodies seize up, caught in the familiar grasp of orgasmic bliss.  ", false);

		//([cum quantity time, normal L/M/H/S quantities {IT'S A MARVEL REFERENCE} <no new paragraph>]
		//light and medium
		if(player.cumQ() < 500) MainScreen.text("Yara's entire frame spasms as your load paints her private passage with snowy-white seed.  The cat girl writhes happily, arching her spine so far back your eyes nearly meet.\n\nYara dismounts your dick and hops to the ground in one fluid movement.", false);
		//heavy
		else if(player.cumQ() <= 1500) MainScreen.text("Yara's belly visibly plumps with the quantity of cum you pour into her, the extra weight bending her over to rest heavily against your " + LowerBodyDescriptor.describeLeg(player) + ".  She purrs happily, patting her distended gut even while the tremors of her own orgasm run through her.\n\nYara lifts herself off you, pressing a hand against her tummy as she somewhat ungracefully steps off the chair.", false);
		//special (super-big)
		else MainScreen.text("Her low-pitched ecstatic moans swiftly escalate to piercing shrieks as her taut belly quickly balloons to roughly beach ball-sized in moments.  With a huge effort, she manages to haul herself off your semen-pumping staff, falling back against you.  Sighing contentedly, Yara nestles herself into your " + chestDesc() + ", getting comfortable despite the seed drizzling from her overstuffed nethers.  You just sit there for a few minutes, waiting patiently as your ejaculatory rampage ceases.\n\nYara makes a noble attempt to rise that is ultimately thwarted by her huge fluid-filled belly.  Casting a sidelong sheepish grin at you, she giggles nervously.  \"<i>Mind helping me out here, friend?</i>\" she says after a moment's hesitation.  With your assistance, she rises and stands on wobbling feet.  She tries her best to compose herself with your cum still streaming down her thighs, the flow only intensifying as she impatiently presses against the bloated belly.", false);

		MainScreen.text("\n\n\"<i>Works like a charm,</i>\" she concludes as you both redress", false);
		if(player.cumQ() > 1500) MainScreen.text(", Yara trying her best to fit her clothes over the bump in her midsection", false);
		MainScreen.text(".  \"<i>Come back whenever, okay?  I'm sure we can arrange another... appointment!</i>\"", false);
		//ZA ENDO
	}
	//female
	else {
		MainScreen.text("A duo of errant forefingers run along the perimeter of your feminine fortress, your signal to prepare for a siege.  Yara reaches down off the side of your seat, pushing on a lever that sends the back of the chair down to about a 30º angle.  She grasps for the armrests of the chair next, promptly lifting her body up and going into what looks like a forward somersault.  Before you can complement the feat, her legs fly up either side of your head.   The only things to have made contact were her nimble feet, gently stroking their way up from your belly, past your chest, off of your shoulders and soaring beyond the back of the chair.  The feline acrobat calls for you to lay your hands open at the sides of the chair, an order you fulfill with due haste.  She wastes no time in seizing your upper arms, causing her body to slide forward off of you.  You return the favor by clasping onto her as well in the same manner, stopping her descent.\n\n", false);

		MainScreen.text("Trying to parse out the scene at play here is a fool's errand.  Yara must have done this before as your two sprawled out bodies have stopped in just the right fashion to make both of your fleshy orifices in plain view of one another's faces.  Air escapes your pursed lips as the \"<i>quality testing</i>\" commences on your " +             VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + ", your kitty comrade going in tongue first towards your silken fringes.  ", false);
		if(player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 3) MainScreen.text("She may as well be licking a melting popsicle with how wet your snatch is.", false);
		else MainScreen.text("Your relatively dry perimeter makes for an easy target.", false);
		MainScreen.text("  Not to be outdone, your ambitious tongue moves in as if it has everything to prove, mirroring your partner's efforts. Both of your lapping endeavors are periodically interrupted by moaning or slight gasps, your grasps on one another only growing more tense.\n\n", false);

		MainScreen.text("Yara looks up - down in her case - at your " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + ", your feminine fragrance riling her up as if it were catnip. Your work on her box is interrupted as your pleasure buzzer gets the oral shebang of a lifetime, eliciting a knowing laugh from deep within your teammate's throat.  Yara's lucky you redouble your clamp on her arms rather than sending the poor woman sliding to the ground as your body writhes in satisfaction.  But this is war, and you'll be damned if you're weak enough to go straight for the crown jewel as she has. No, you go to town, redefining what it means to eat out a pussy.  Your laborious toil is rewarded as the kitten's assault on your button eases up.  Her hold begins to waver, however, forcing you to yank your prey towards you.  The movement pierces through her contentment, her armlock strengthening as the air fills with the sound of a duo of muffled moans.\n\n", false);

		MainScreen.text("Judging by the contortionist's wobbly embrace, you decide it's the perfect time to go in for the kill.  Yara stands no chance as you pounce for her pierced clit, your tongue lodging itself between the loop and her love-button.  It takes all of her willpower to maintain the offensive on your nub nexus while standing firm in her grasp on your arms.  Your oral tugging and teasing proves to be the victor, however, marked by the femspunk making its way right onto your face.  The cocktail combined with the orgasmic-enhanced last ditch effort by Yara on your nether regions triggers your own satisfying outburst.  The chain reaction ends in both your couplings faltering, sending the feline sliding headfirst for the floor.\n\n", false);

		MainScreen.text("Her head stops short, though.  Through your gasping relief, you managed to lock onto her legs.  \"<i>Nice... nice catch,</i>\" is about all Yara manages to share before resuming her purring contentment upside down, limp arms spread across the floor.  After a minute or so, the two of you regain some sort of composure, but the spectacular gymnast from before can only bare to slink around on the ground as she reorients herself.  The most you need to do is fix the back of your chair, lifting it to a more comfortable height.  \"<i>Can you spare one more helping hand here, friend?</i>\" Yara requests, now having at least managed to at least sit up straight.  The two of you exchange a knowing glance as you lift the metal-worker back to her feet.", false);
	}
	player.orgasm();
	doNext(piercingStudio);
}


//[Flirt]
private yvonneFlirt():void {
	spriteSelect(64);
	MainScreen.clearText();
	MainScreen.text("You step closer, glancing from her bulging, barely contained tits to her pouting lips and expressive, violet eyes.  A shock of sweat-matted auburn hair obscures part of her face, but the tall, buxom blacksmith nervously brushes it aside as she watches.  Once you're close enough to touch, you quietly and sincerely proclaim, \"<i>You're the most beautiful piece of craftsmanship in this entire store.</i>\"");
	MainScreen.text("\n\nYvonne steps back, and you swear you can see a blush blooming through her fur, a fiery glow of embarrassment that spreads to the upper curve of her immense mammaries.  She folds her arms over her apron, unintentionally smushing those gigantic tits closer together and deepening her cleavage into a canyon. An immense sigh causes the plush plateau to sway pendulously as Yvonne answers, \"<i>");
	dynStats("lus", (10 + player.stats.lib / 10));
	
	// Brain no want to work out the boolean logic shit here, broken out to ensure it will work as intended.
	if (player.lowerBody.cockSpot.count() == 0)
	{
		MainScreen.text("Sorry, but you don't look like you'd be much fun.");
		MainScreen.text("</i>\"");
		doNext(armorShop);
		return;
	}
	else if (player.tallness > 65 && !Flags.list[FlagEnum.LOW_STANDARDS_FOR_ALL])
	{
		MainScreen.text("Sorry, but you don't look like you'd be much fun.");
		MainScreen.text("</i>\"");
		doNext(armorShop);
		return;
	}
	else if (player.cockThatFits(75) == -1 && !Flags.list[FlagEnum.LOW_STANDARDS_FOR_ALL])
	{
		MainScreen.text("Sorry, but you don't look like you'd be much fun.");
		MainScreen.text("</i>\"");
		doNext(armorShop);
		return;
	}
	
	if(Flags.list[FlagEnum.YVONNE_FUCK_COUNTER] == 0) MainScreen.text("Well, I could use a quick fuck.  If you meant what you said, go change the sign to say 'out' please.");
	else MainScreen.text("You want to go again, huh?  I do love working up a sweat...");
	MainScreen.text("</i>\"");
	//[Fuck] [Nevermind]
	simpleChoices("Fuck Her", fuckYvonneInZeBlacksmith, "Nevermind", backOutOfYvonneFuck, "", null, "", null, "", null);
}
//[Nevermind]
private backOutOfYvonneFuck():void {
	spriteSelect(64);
	MainScreen.clearText();
	MainScreen.text("You politely decline, not wanting to interrupt her work.  Yvonne sighs and begins to pump the bellows, muttering, \"<i>Then you'd better be buying something!</i>\"");
	doNext(armorShop);
}
//[Fuck]
private fuckYvonneInZeBlacksmith():void {
	spriteSelect(64);
	MainScreen.clearText();
	//X = cock that fits!
	let x:number = player.cockThatFits(75);
	if(x < 0) x = 0;
	//Used for the new cock stuff
	let y:number = x + 1;
	MainScreen.text("You walk over to the door and find a sign hanging in front of the window.  The side facing indoors has 'out' on it.  There's also a 'closed' sign hanging to the side of the doorframe.  You take the simple wood plaque in hand and flip it over - can't have anybody walking in on your sexual hijinks, can you?");
	MainScreen.text("\n\nA fuzzy, calloused hand grabs you by the scuff of the neck, lifts you off the ground and pushes you against the wall, slamming you into it forcefully enough that some weapons hanging nearby rattle dangerously.  A hot puff of breath hits your cheek, Yvonne's wet, canine nose bumping against your ear as she pants in your face.  She closes, and you feel her bare, sweat-soaked breasts sliding up and down your back, holding you up as firmly as her iron grip.  Yvonne's long, smooth tongue licks you from collarbone to chin, lapping up the sweat that's already starting to bead, the heat of the simmering forge-fires and your companion's well-warmed, powerful frame long since getting to you.");
	MainScreen.text("\n\nA distinctly feminine scent wafts up to your nostrils, intermingled with the blacksmith's own pungent body-odor, strong enough to make your head swim.  Yvonne's free hand begins removing your [armor], the blacksmith's confident motions suggesting she's had plenty of experience at this.  The aroma of the super-stacked bitch's estrus increases to the point where it nearly overpowers her salty sweat-smell, her nipples pressing hard into your back.  [EachCock] grows hard from the forceful attention, pinned between the wall and your belly.  Finished with your gear, Yvonne nips your neck and says, \"<i>Nice package, ");
	if(player.cockArea(x) < 20) MainScreen.text("runt");
	else if(player.cockArea(x) < 40) MainScreen.text(player.mf("boy","girl"));
	else if(player.cockArea(x) < 60) MainScreen.text("big " + player.mf("boy","girl"));
	else MainScreen.text(player.mf("stud","breeder"));
	MainScreen.text(".</i>\"");
	MainScreen.text("\n\nThe forge-mistress abruptly releases you and steps away, the supporting cushion of her breasts no longer there to help balance you.  After a moment of confused stumbling, you catch yourself and turn around, curious as to just what the buxom bitch is doing.");
	MainScreen.text("\n\nYvonne is on the ground on all fours.  Her tail is sticking nearly straight up, waving back and forth excitedly as she presents her curvy rump to you.  Surprisingly, her ass is much less muscular than her upper body, with a pair of pillowy buttcheeks that nearly conceal her soaked cunny from view.  You aren't sure if it's lubricant from her arousal, or sweat from working the forge all day, but Yvonne's thighs are absolutely drenched with moisture; a veritable slip n' slide of wetness that beckons you to bury your bone in the canine's feminine entrance.  She glances back over her shoulder, a submissive glint in her eyes as she begs, \"<i>Come on, be my alpha.  This bitch needs a hot, wet fuck.  Do it!</i>\"  What an odd dichotomy - one moment she's throwing you around, the next, begging to be mounted.  For all her power, it seems Yvonne still wants to be taken as a meek bitch.");
	MainScreen.text("\n\nYou sidle up to the larger woman and begin aligning [oneCock] with her mammoth buns, the sweltering, pheromone-laced stink pouring from her body making it difficult not to fall on top of her and rut.  Her huge tits are squished against the floor, squeezing out obscenely to either side of the blacksmith's lithe, muscular torso.  When you push inside, her slick wet cunt squeezes your [cock " + y + "] powerfully but affectionately.  Her potent vaginal muscles work your [cock " + y + "] over, tightly embracing your turgid dickflesh as you begin to fuck her properly, plowing her sweat and love-juice soaked folds even while you struggle to reach up for her incredible breasts.");
	MainScreen.text("\n\nYou get a handhold on the soft chest-flesh and begin to massage at what you can find, releasing appreciative moans from your partner.  Unfortunately, her furiously-wagging tail bludgeons you across the nose over and over, and you're forced to block it with one arm so that you can ream her snatch unimpeded by the woman's canine instincts.  She growls, but doesn't stop you.  You can see the muscles in her arms quivering, shaking, struggling to maintain her posture in spite of the overwhelming pleasure your [cock " + y + "] is inflicting upon her poor womanhood.");
	MainScreen.text("\n\nA shiver runs through the dog-morph's entire body, culminating in a cock-wringing contraction that ripples through her cunt, milking you with her slippery twat.  It works, and you lean over her prostrate form as you bottom out inside her, her sweat-matted fur smearing your face with her scent as you cum.  ");
	if(player.hasKnot(x)) MainScreen.text("Your knot fills, locking you inside her, securely blocking any escape for the jizz you're now filling her depths with.  Yvonne sighs dreamily, \"<i>Just right...</i>\" while spunk slides into her birth canal to infiltrate her womb.[if (cumQuantity > 500) \"  The pearly goop spatters into her womb with egg-inseminating force, filling her beyond her wildest expectations.\"][if (cumQuantity > 1000) \"  The blacksmith cries out in pain and pleasure, her belly rounding with your liquid, taking on a more pregnant, stuffed-silly look.\"][if (cumQuantity > 2000) \"  Thanks to your knot, not a single drop escapes, and soon Yvonne's belly is as fat as her tits, cum-bloated in the extreme, a sloshing auburn tub packed with ivory sperm.\"]");
	else MainScreen.text("Your jizz bubbles out to fill her depths, the spunk surging through her as it moves towards her womb.  Yvone sighs dreamily, \"<i>Ahhhh...</i>\" while you empty your [balls] inside her unprotected womanhood.[if (cumQuantity > 500) \"  The pearly goop spatters into her uterus with egg-inseminating force, filling the bitch beyond her wildest expectations.\"][if (cumQuantity > 1000)   The blacksmith cries out in pain and pleasure, her belly rounding with your liquid, looking positively pregnant.  Her twat begins to dribble sperm, creampied beyond belief.][if (cumQuantity > 2000) \"  Unfortunately, as your virility makes itself known, Yvonne's body hits its limit, and jets of ivory spooge squirt from all sides of her cunny, dribbling into a pearly puddle on the floor.\"]");
	//still no new pg
	MainScreen.text("  With a thoroughly cream-stuffed twat beneath you, you ");
	if(player.hasKnot(x)) MainScreen.text("pop");
	else MainScreen.text("pull");
	MainScreen.text(" out, accompanied by a exhalation of female pleasure.");
	MainScreen.text("\n\nYvonne staggers up on her footpaws, groaning the whole time, a trail of white dribbling on the floor behind her.  Her tail wags happily, and she grabs you, pulling you into her sweaty bosom as she affectionately squeezes your [butt].  You aren't released until you feel dizzy, half-suffocated by her preponderance of breast-tissues and potent pheromones.");
	MainScreen.text("\n\nYvonne tosses you your gear, and you dress in a daze.  Before you've completely finished, she's pushing you out into the street, covered in sex-stink and stumbling over your own [feet].  She calls out after you, \"<i>Thanks babe, I gotta mop this mess up!</i>\"");
	player.orgasm();
	player.stats.sens += -1;
	Flags.list[FlagEnum.YVONNE_FUCK_COUNTER]++;
	doNext(camp.returnToCampUseOneHour);
}

//*Typical buy text goes here. Options are now Yes/No/Flirt*
//[Flirt]
private flirtWithVictoria(itype:ItemType):void {
	MainScreen.clearText();
	let x:number = player.cockThatFits(70);
	if(x < 0) x = player.smallestCockIndex();
	MainScreen.text("You take the clothes from her and give them a look over.  Setting them on the counter, you tell her that they're quite nice, but if she's interested you might have something that could fit her quite nicely as well in the back.");

	if(x < 0) {
		MainScreen.text("\n\nVictoria smirks and answers, \"<i>I measured your inseam, and what you're packing in there won't fit anywhere in a girl like me.  Maybe some other time, " + player.mf("studmuffin","sweet thing") + ".  Did you actually want to buy something?</i>\"\n\nDo you still want to buy something?");
		doYesNo(curry(debitClothes,itype),tailorShoppe);
		return;
	}
	MainScreen.text("\n\nIt takes her a moment to realize just what it is you're suggesting before her face splits into a wide grin.  <i>\"That right?  Well now, you can't say things like that without backin' 'em up, can you?\"</i>  she says with a low chuckle, pressing her curvy body into you.  <i>\"What do you say I close the shop up quick, and you can show me just 'ow nicely you can fit, mm?\"</i>");

	MainScreen.text("\n\nGiving your [butt] a squeeze, she hops off to turn the shop's open sign around and locks the door before closing all of the curtains.  Turning back to you, she pushes her ample cleavage up into ");
	if(player.tallness >= 65)
		MainScreen.text("your stomach.");
	else if(player.tallness >= 55)
		MainScreen.text("your chest.");
	else
		MainScreen.text("your face.");
	MainScreen.text("  <i>\"Now then,  let's see what you've got!\"</i>  With practiced ease she works the bottom of your [armor] off, revealing [eachCock].  <i>\"Well, well. Looks like I was right about you from the start,\"</i> she says, licking her lips again.  <i>\"Just a taste first, I think...\"</i> Sticking her tongue out once more, she gives your rapidly stiffening dick a long, slow lick from the base up to the tip.  She closes her mouth just around your " + CockDescriptor.describeCock(player, x) + ", giving it a few rapid licks before pulling off with a pop.");

	MainScreen.text("\n\n<i>\"Oh yes,  I think you'll do rather nicely.  In fact, I think I'm going to give you a special treat.\"</i>  Smirking up at you, the busty dog-girl unbuttons her top just beneath her ample chest.  Before you can puzzle out what it is she's doing, she takes your [cock] and stuffs it into the hole and up through her cleavage");
	if(player.lowerBody.cockSpot.get(x).cockLength >= 5)
		MainScreen.text(" until the tip is poking out the top");
	MainScreen.text(".");
	if(player.lowerBody.cockSpot.get(x).cockThickness > 3)
		MainScreen.text("  Her face scrunches up uncomfortably for a moment, your girth straining the seams of her shirt.  With a series of loud pops, her buttons all go flying in different directions, letting her ample, creamy flesh bounce free with a bountiful jiggle.  <i>\"Bloody hell, that was my favorite top...\"</i> she whines for a moment before squeezing her chest back together with her hands.");
	else MainScreen.text("  She presses her arms inward to increase the pressure on your cock even further, and gives you another wide smile.  <i>\"Ready for this, love?\"</i>");

	MainScreen.text("\n\nShe begins to slowly move her disproportionately massive chest up and down your cock, ");
	if(player.lowerBody.cockSpot.get(x).cockLength > 5)
		MainScreen.text("making sure to give the " + player.cockHead(x) + " a quick suck every time it breaches her mounds.");
	else
		MainScreen.text("pressing her mouth down into her ample cleavage so as to give your hidden tip a quick lick every time it draws near.");

	MainScreen.text("\n\n<i>\"Hvvng fnn?\"</i>  she asks, pausing her pillowy assault to lick over the end of your pecker once again.  You can only moan in response from the wonderful wet, squishy feeling washing over your sensitive organ.  <i>\"That's what I thought,\"</i> she says, releasing you with a wet pop.");

	MainScreen.text("\n\nVicky continues her marshmallowy assault for what feels like hours, slowing down every time you give even the slightest indication that you're about to cum.  <i>\"You might hate me for this now, love, but trust me.  It'll feel so much better once you finally do cum.\"</i>  She may be right, but it's agony to get so close to orgasm only to back away, and then draw close once more.  She's practically driving you crazy with lust with her tantalizingly slow tit-fuck.  As you feel your cum nearly boiling away in your [balls], only to have her back away once again, something inside of you snaps.");

	MainScreen.text("\n\nYou wrench your dick free of the confines of her pillowy mounds, and grab her around her plush middle.  She gives a surprised yelp as you nearly throw her against the counter and lift her butt up into the air.  <i>\"Ooooh, someone's excited!\"</i>  she nearly cheers, looking over her shoulder and wagging her plush rear up at you as her tail swishes back and forth, showing that she's nearly as consumed with lust as you are.  Flipping her long skirt up over her back, you violently pull her panties aside before you force your " + CockDescriptor.describeCock(player, x) + " deep within her gushing folds.");

	MainScreen.text("\n\nShe squeals in surprise and pleasure as she's penetrated, thrusting her ample hips back at you as you begin to pound into her.  Her ass jiggles violently with every thrust, sending ripples through her creamy flesh.  You grip her around her soft middle as you slam against her hips, barely noticing every squeak she makes as her thick thighs are pounded into the side of the counter.  <i>\"Ah!  Oh, Marae, that feels incredible!\"</i>  she nearly screams as her monocle finally loses its grip on her face and goes flying, thankfully landing safely on a pile of scrap cloth.  If you were more sound of mind, you'd probably have dreaded the cost of repairing the broken eyepiece.");

	MainScreen.text("\n\nSomehow, miraculously, you're able to hold back long enough to work your hands up her soft body and grip onto her enormous tits, mashing them in your hands as you find her rock-hard nipples.  She seems to be enjoying the rough treatment - quite a bit in fact - as the moment you give her hard nubs a quick tweak you feel her already rather tight pussy clamp down on your cock HARD.  It becomes nearly impossible to move as she cums explosively, screaming incoherently as she sprays your lower body with her liquid pleasure.");

	MainScreen.text("\n\nThe sudden resistance is all it takes to finally bring you over the edge, as with a loud roar of your own, you bury yourself deep inside of her still tightly clutching cunt and release.  [if (cumNormal = true) It would seem that what she said earlier was correct.  Your pent-up need surges up through your dick, firing your fertile seed straight into her unprotected womb.  She lets out a submissive whimper as your spurting dick triggers aftershocks within her exhausted body.  At last, her body relaxes, freeing your softening dick.][if (cumMedium = true) Thick, sticky, ropes of your cream fire deep within her grasping pussy, attempting to extinguish the fire you lit within her with your frantic rutting.  She whimpers beneath you as your ejaculation sends another wave of pleasure through her body, which clamps down even harder onto you than before.  Thankfully, it's not long before she releases you once again, going limp on the counter and breathing raggedly.][if (cumHigh = true) Your urethra distends as it funnels your thick, potent seed into the tightly gripping walls of Victoria's pussy.  She clenches down as the white torrent sends her into yet another orgasm, shuddering beneath you as her already thick stomach begins to distend with its load.  Her pussy continues to milk your dick of its load even as she rides the high of her last orgasm, her body desperate to draw out more of your thick cream.  Finally she releases you, your softening dick forced back out with a thick stream of your jizz, which begins to pool out onto the floor.][if (cumVeryHigh = true) You feel your dick swell as it nearly explodes within her, pouring thick streams of your seed deep into her fertile womb.  She lets out another loud squeal as her body clenches down into yet another orgasm, gripping your dick tighter than you ever thought possible as it tries to milk you for all you have.  Her plush stomach visibly distends with its contents as you dump your load within her, lifting her small body up from the surface of the counter somewhat.  Thankfully, her body soon relaxes, releasing your softening prick, which is followed by a thick, white fountain of jizz that soaks your legs and pools out onto the floor.]");
	if(silly()) MainScreen.text("[if (cumExtreme = true) You groan loudly as your cock pours gallon after gallon of jizz deep into her spasming pussy.  She screams as another powerful orgasm wracks her body, triggered by the enormous amount of jizz you're shooting into her.  Her belly audibly sloshes with each of her movements as it continues to expand from the enormous amount of fluid you're pumping into her.  She attempts to clutch down on you as tightly as she can, trying to retain your enormous load; but the moment she releases even a little bit, she shoots forward from the enormous pressure of jizz within her, flopping down face-first onto some clothes on the other side of the counter.  Your thick cream continues to shoot up from between her limp legs, almost like a fountain, before gravity pulls it back down and it splatters all over the interior of the store.]");
	else MainScreen.text("[if (cumExtreme = true) You groan loudly as your cock pours gallon after gallon of jizz deep into her spasming pussy.  She screams as another powerful orgasm wracks her body, triggered by the enormous amount of jizz you're shooting into her.  Her belly audibly sloshes with each of her movements as it continues to expand from the enormous amount of fluid you're pumping into her.  Thick streams of your seed shoot out all around your dick as she continues to squeeze down on you, trying to keep as much of it inside her massively pregnant-looking belly as possible before she finally releases, squirting your dick back out of her with a pop, followed by a veritable geyser of white. Your entire lower body is painted white as it gushes out, soaking into your clothes and covering the floor as she visibly deflates.]");

	MainScreen.text("\n\nFinally, your strength gives out and you fall backwards onto the floor, exhausted.  A few seconds later, Vicky slips backward off of the counter and lands on top of you.  Like you, she's completely unable to move, however unlike you it's more because she is completely insensate.  Her eyes have rolled back into her head and her tongue hangs out as she occasionally mutters something incoherent.");

	MainScreen.text("\n\nA few seconds later your body finally gives out completely and you pass out.  You wake up about an hour later, still on the floor with Vicky on the ground near you, leaning up against the counter with her legs splayed, cum still dripping from her used pussy.  <i>\"I uh... s'pose you wanna leave now?\"</i>  She asks, still sounding a bit loopy.  She climbs unsteadily to her feet, and walks, a bit bowlegged to the door, unlocking it before slumping back down the wall.  <i>\"Do come back for a visit, love!\"</i>  You pull your pants back up and crawl back out into the street.  Climbing back to your feet, you notice a few passersby chuckling at you before you close the door.  Before you leave, you think you can make out Victoria muttering, <i>\"Gonna have to clean this place up...\"</i>");

	player.orgasm();
	player.stats.sens += -1;
	doNext(camp.returnToCampUseOneHour);
}
}
}
