﻿
export class Rathazul extends NPCAwareContent implements TimeAwareInterface {

	//const RATHAZUL_DEBIMBO_OFFERED: number = 744;

	//Rathazul the Alchemist
	//Encounter, random text for potential uses, choices.
	//After he has crafted 3 things for the player, option to move into camp.
	public Rathazul() {
		CoC.timeAwareClassAdd(this);
	}

	//Implementation of TimeAwareInterface
	public timeChange(): boolean {
		if (Flags.list[FlagEnum.RATHAZUL_SILK_ARMOR_COUNTDOWN] > 1) {
			Flags.list[FlagEnum.RATHAZUL_SILK_ARMOR_COUNTDOWN]--;
			if (Flags.list[FlagEnum.RATHAZUL_SILK_ARMOR_COUNTDOWN] < 1) Flags.list[FlagEnum.RATHAZUL_SILK_ARMOR_COUNTDOWN] = 1;
			if (Flags.list[FlagEnum.RATHAZUL_SILK_ARMOR_COUNTDOWN] > 300) Flags.list[FlagEnum.RATHAZUL_SILK_ARMOR_COUNTDOWN] = 24;
		}
		if (Flags.list[FlagEnum.RATHAZUL_CAMP_INTERACTION_COUNTDOWN] > 0) {
			Flags.list[FlagEnum.RATHAZUL_CAMP_INTERACTION_COUNTDOWN]--;
			if (Flags.list[FlagEnum.RATHAZUL_CAMP_INTERACTION_COUNTDOWN] < 0) Flags.list[FlagEnum.RATHAZUL_CAMP_INTERACTION_COUNTDOWN] = 0;
		}
		return false;
	}

	public timeChangeLarge(): boolean {
		return false;
	}
	//End of Interface Implementation

	public returnToRathazulMenu() {
		if (player.statusAffects.has(StatusAffectType.CampRathazul))
			campRathazul();
		else encounterRathazul();
	}

	public encounterRathazul() {
		DisplaySprite(49);

		if (Flags.list[FlagEnum.MARBLE_PURIFICATION_STAGE] === 2 && player.statusAffects.has(StatusAffectType.MetRathazul)) {
			marblePurification.visitRathazulToPurifyMarbleAfterLaBovaStopsWorkin();
			return;
		}
		let offered: boolean;
		//Rat is definitely not sexy!
		if (player.stats.lust > 30) player.stats.lust += -10;
		//Introduction
		if (player.statusAffects.has(StatusAffectType.MetRathazul)) {
			if (player.statusAffects.has(StatusAffectType.CampRathazul))
				DisplayText("You walk over to Rathazul's corner of the camp.  He seems as busy as usual, with his nose buried deep in some tome or alchemical creation, but he turns to face you as soon as you walk within a few paces of him.\n\n", true);
			else
				DisplayText("You spy the familiar sight of the alchemist Rathazul's camp along the lake.  The elderly rat seems to be oblivious to your presence as he scurries between his equipment, but you know him well enough to bet that he is entirely aware of your presence.\n\n", true);
		}
		else {
			DisplayText("You encounter a hunched figure working as you come around a large bush.  Clothed in tattered robes that obscure most his figure, you can nontheless see a rat-like muzzle protruding from the shadowy hood that conceals most of his form.  A simple glance behind him confirms your suspicions - this is some kind of rat-person.  He seems oblivious to your presence as he stirs a cauldron of viscous fluid with one hand; a neat stack of beakers and phials sit in the dirt to his left.  You see a smile break across his aged visage, and he says, \"<i>Come closer child.  I will not bite.</i>\"\n\nApprehensive of the dangers of this unknown land, you cautiously approach.\n\n\"<i>I am Rathazul the Alchemist.  Once I was famed for my miracle cures.  Now I idle by this lake, helpless to do anything but measure the increasing amounts of corruption that taint its waters,</i>\" he says as he pulls back his hood, revealing the entirety of his very bald and wrinkled head.\n\n", true);
			player.statusAffects.add(StatusAffectType.MetRathazul, 0, 0, 0, 0);
		}
		//Camp offer!
		if (player.statusAffects.get(StatusAffectType.MetRathazul).value2 >= 3 && player.statusAffects.get("$1").value3 != 1 && player.stats.cor < 75) {
			DisplayText("\"<i>You know, I think I might be able to do this worn-out world a lot more good from your camp than by wandering around this lake.  What do you say?</i>\" asks the rat.\n\n(Move Rathazul into your camp?)");
			doYesNo(rathazulMoveToCamp, rathazulMoveDecline);
			//Set rathazul flag that he has offered to move in (1 time offer)
			player.changeStatusValue(StatusAffects.MetRathazul, 3, 1);
			return;
		}
		offered = rathazulWorkOffer();
		if (!offered) {
			DisplayText("He sighs dejectedly, \"<i>I am not sure what I can do for you, youngling.  This world is fraught with unimaginable dangers, and you're just scratching the surface of them.</i>\"\n\nYou nod and move on, leaving the depressed alchemist to his sadness.");
			return { next: Scenes.camp.returnToCampUseOneHour };
		}
	}

	private rathazulMoveToCamp() {
		DisplayText().clear();
		DisplayText("Rathazul smiles happily back at you and begins packing up his equipment.  He mutters over his shoulder, \"<i>It will take me a while to get my equipment moved over, but you head on back and I'll see you within the hour.  Oh my, yes.</i>\"\n\nHe has the look of someone experiencing hope for the first time in a long time.");
		player.statusAffects.add(StatusAffectType.CampRathazul, 0, 0, 0, 0);
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	private rathazulMoveDecline() {
		DisplayText().clear();
		DisplayText("Rathazul wheezes out a sigh, and nods.\n\n\"<i>Perhaps I'll still be of some use out here after all,</i>\" he mutters as he packs up his camp and prepares to head to another spot along the lake.");
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	public campRathazul() {
		DisplaySprite(49);
		if (Flags.list[FlagEnum.MARBLE_PURIFICATION_STAGE] === 2 && player.statusAffects.has(StatusAffectType.MetRathazul)) {
			marblePurification.visitRathazulToPurifyMarbleAfterLaBovaStopsWorkin();
			return;
		}
		if (Flags.list[FlagEnum.RATHAZUL_SILK_ARMOR_COUNTDOWN] === 1 && Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00275] > 0) {
			collectRathazulArmor();
			return;
		}
		//Special rathazul/follower scenes scenes.
		if (randInt(6) === 0 && Flags.list[FlagEnum.RATHAZUL_CAMP_INTERACTION_COUNTDOWN] === 0) {
			Flags.list[FlagEnum.RATHAZUL_CAMP_INTERACTION_COUNTDOWN] = 3;
			//Pure jojo
			if (Flags.list[FlagEnum.JOJO_RATHAZUL_INTERACTION_COUNTER] === 0 && player.statusAffects.has(StatusAffectType.PureCampJojo) && Flags.list[FlagEnum.JOJO_DEAD_OR_GONE] === 0) {
				finter.jojoOffersRathazulMeditation();
				return;
			}
			if (Flags.list[FlagEnum.AMILY_MET_RATHAZUL] === 0 && Flags.list[FlagEnum.AMILY_FOLLOWER] === 1 && amilyScene.amilyFollower()) {
				finter.AmilyIntroducesSelfToRathazul();
				return;
			}
			if (Flags.list[FlagEnum.AMILY_MET_RATHAZUL] === 1 && Flags.list[FlagEnum.AMILY_FOLLOWER] === 1 && amilyScene.amilyFollower()) {
				finter.amilyIngredientDelivery();
				return;
			}
			if (Flags.list[FlagEnum.AMILY_MET_RATHAZUL] === 2 && Flags.list[FlagEnum.AMILY_FOLLOWER] === 1 && amilyScene.amilyFollower()) {
				finter.amilyAsksAboutRathazulsVillage();
				return;
			}
		}
		let offered: boolean;
		//Rat is definitely not sexy!
		if (player.stats.lust > 50) player.stats.lust += -1;
		if (player.stats.lust > 65) player.stats.lust += -5;
		if (player.stats.lust > 80) player.stats.lust += -5;
		if (player.stats.lust > 90) player.stats.lust += -5;
		//Introduction
		DisplayText("Rathazul looks up from his equipment and gives you an uncertain smile.\n\n\"<i>Oh, don't mind me,</i>\" he says, \"<i>I'm just running some tests here.  Was there something you needed, " + player.short + "?</i>\"\n\n", true);
		//player.statusAffects.set(new StatusAffect("metRathazul",0,0,0,0)));
		offered = rathazulWorkOffer();
		if (!offered) {
			DisplayText("He sighs dejectedly, \"<i>I don't think there is.  Why don't you leave me be for a time, and I will see if I can find something to aid you.</i>\"");
			if (player.statusAffects.has(StatusAffectType.CampRathazul))
				return { next: camp.campFollowers };
			else return { next: playerMenu };
		}

	}

	private rathazulWorkOffer(): boolean {
		DisplaySprite(49);
		let totalOffers: number = 0;
		let spoken: boolean = false;
		let showArmorMenu: boolean = false;
		let purify;
		let debimbo: number = 0;
		let reductos;
		let lethiciteDefense;
		let dyes;
		if (player.inventory.items.has(consumables.BLACKEG) || player.inventory.items.has(consumables.L_BLKEG)) {
			Flags.list[FlagEnum.PC_KNOWS_ABOUT_BLACK_EGGS] = 1;
			spoken = true;
			DisplayText("He eyes the onyx egg in your inventory and offers a little advice.  \"<i>Be careful with black eggs.  They can turn your skin to living latex or rubber.  The smaller ones are usually safer, but everyone reacts differently.  I'd get rid of them, if you want my opinion.</i>\"\n\n");
		}
		//Item crafting offer
		if (player.inventory.items.has(useables.GREENGL, 2)) {
			if (!player.statusAffects.has(StatusAffectType.RathazulArmor)) DisplayText("He pipes up with a bit of hope in his voice, \"<i>I can smell the essence of the tainted lake-slimes you've defeated, and if you'd let me, I could turn it into something a bit more useful to you.  You see, the slimes are filled with the tainted essence of the world-mother herself, and once the taint is burned away, the remaining substance remains very flexible but becomes nearly impossible to cut through.  With the gel of five defeated slimes I could craft you a durable suit of armor.</i>\"\n\n");
			else DisplayText("He pipes up with a bit of excitement in his voice, \"<i>With just five pieces of slime-gel I could make another suit of armor...</i>\"\n\n");
			spoken = true;
			if (player.inventory.items.has(useables.GREENGL, 5)) {
				showArmorMenu = true;
				totalOffers++;
			}
			else {
				DisplayText("You realize you're still a bit short of gel.\n\n");
			}
		}
		//Item crafting offer
		if (player.inventory.items.has(useables.B_CHITN)) {
			DisplayText("The elderly rat looks at you intently and offers, \"<i>I see you've gathered a piece of chitin from the giant bees of the forests.  If you bring me five pieces I could probably craft it into some tough armor.</i>\"\n\n");
			spoken = true;
			if (player.inventory.items.has(useables.B_CHITN, 5)) {
				showArmorMenu = true;
				totalOffers++;
			}
			else {
				DisplayText("(You need five pieces of chitin for Rathazul to make you the chitinous armor.)\n\n");
			}
		}
		let pCounter: number = 0;
		//Item purification offer
		if (player.inventory.items.has(consumables.INCUBID)) {
			purify = purifySomething;
			totalOffers++;
			pCounter++;
		}
		if (player.inventory.items.has(consumables.SUCMILK)) {
			purify = purifySomething;
			totalOffers++;
			pCounter++;
		}
		if (player.inventory.items.has(consumables.SDELITE)) {
			purify = purifySomething;
			totalOffers++;
			pCounter++;
		}
		if (player.inventory.items.has(consumables.LABOVA_)) {
			purify = purifySomething;
			totalOffers++;
			pCounter++;
		}
		//Single Offer
		if (pCounter === 1) {
			DisplayText("The rat mentions, \"<i>I see you have at least one tainted item on you... for 20 gems I could remove most of the taint, making it a good deal safer to use.  Of course, who knows what kind of freakish transformations it would cause...</i>\"\n\n");
			spoken = true;
			totalOffers++;
		}
		if (pCounter > 1) {
			DisplayText("The rat mentions, \"<i>I see you have a number of demonic items on your person.  For 20 gems I could attempt to remove the taint from one of them, rendering it a good deal safer for consumption.  Of course it would not remove most of the transformative properties of the item...</i>\"\n\n");
			spoken = true;
			totalOffers += 2;
		}
		//Offer dyes if offering something else.
		if (player.inventory.gems >= 50) {
			DisplayText("Rathazul offers, \"<i>Since you have enough gems to cover the cost of materials for my dyes as well, you could buy one of my dyes for your hair.  I will need 50 gems up-front.</i>\"\n\n");
			spoken = true;
			totalOffers++;
			dyes = buyDyes;
		}
		//Reducto
		if (player.statusAffects.has(StatusAffectType.CampRathazul) && player.statusAffects.get(StatusAffectType.MetRathazul).value2 >= 4) {
			DisplayText("The rat hurries over to his supplies and produces a container of paste, looking rather proud of himself, \"<i>Good news everyone!  I've developed a paste you could use to shrink down any, ah, oversized body parts.  The materials are expensive though, so I'll need ");
			if (Flags.list[FlagEnum.AMILY_MET_RATHAZUL] >= 2) DisplayText("50");
			else DisplayText("100");
			DisplayText(" gems for each jar of ointment you want.</i>\"\n\n");
			totalOffers++;
			spoken = true;
			reductos = buyReducto;
		}
		//SPOIDAH
		if (player.statusAffects.has(StatusAffectType.CampRathazul) && player.inventory.items.has(useables.T_SSILK) && Flags.list[FlagEnum.RATHAZUL_SILK_ARMOR_COUNTDOWN] + Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00275] === 0) {
			showArmorMenu = true;
			spoken = true;
			totalOffers++;
			DisplayText("\"<i>Oooh, is that some webbing from a giant spider or spider-morph?  Most excellent!  With a little bit of alchemical treatment, it is possible I could loosen the fibers enough to weave them into something truly magnificent - armor, or even a marvelous robe,</i>\" offers Rathazul.\n\n");
		}
		//Vines
		if (player.hasKeyItem("Marae's Lethicite") >= 0 && player.keyItemv2("Marae's Lethicite") < 3 && !player.statusAffects.has(StatusAffectType.DefenseCanopy) && player.statusAffects.has(StatusAffectType.CampRathazul)) {
			DisplayText("His eyes widen in something approaching shock when he sees the Lethicite crystal you took from Marae.  Rathazul stammers, \"<i>By the goddess... that's the largest piece of lethicite I've ever seen.  I don't know how you got it, but there is immense power in those crystals.  If you like, I know a way we could use its power to grow a canopy of thorny vines that would hide the camp and keep away imps.  Growing such a defense would use a third of that lethicite's power.</i>\"\n\n");
			totalOffers++;
			spoken = true;
			lethiciteDefense = growLethiciteDefense;
		}
		if (player.statusAffects.has(StatusAffectType.CampRathazul)) {
			if (Flags.list[FlagEnum.RATHAZUL_DEBIMBO_OFFERED] === 0 && (sophieBimbo.bimboSophie() || player.perks.has(PerkType.BimboBrains) || player.perks.has(PerkType.FutaFaculties))) {
				rathazulDebimboOffer();
				return true;
			}
			else if (Flags.list[FlagEnum.RATHAZUL_DEBIMBO_OFFERED] > 0) {
				DisplayText("You recall that Rathazul is willing to make something to cure bimbo liqueur for 250 gems and five Scholar's Teas.");
				if (player.inventory.items.has(consumables.SMART_T, 5) && player.inventory.gems >= 250) {
					totalOffers++;
					debimbo = 1;
				}
				else if (!player.inventory.items.has(consumables.SMART_T, 5)) DisplayText("  You should probably find some if you want that...");
				else DisplayText("  You need more gems to afford that, though.");
				DisplayText("\n\n");
			}
		}
		if (totalOffers === 0 && spoken) {
			return { next: Scenes.camp.returnToCampUseOneHour };
			return true;
		}
		if (totalOffers > 0) {
			DisplayText("Will you take him up on an offer or leave?");
			//In camp has no time passage if left.
			
			if (showArmorMenu) MainScreen.addButton(0, "Armor", rathazulArmorMenu);
			if (debimbo > 0) MainScreen.addButton(1, "Debimbo", makeADeBimboDraft);
			MainScreen.addButton(2, "Buy Dye", dyes);
			if (lethiciteDefense != null) MainScreen.addButton(3, "Lethicite", lethiciteDefense);
			MainScreen.addButton(4, "Purify", purify);
			if (reductos != null) MainScreen.addButton(8, "Reducto", reductos);
			if (player.statusAffects.has(StatusAffectType.CampRathazul))
				MainScreen.addButton(9, "Leave", camp.campFollowers);
			else
				MainScreen.addButton(9, "Leave", Scenes.camp.returnToCampUseOneHour);
			return true;
		}
		return false;
	}

	private purifySomething() {
		DisplaySprite(49);
		DisplayText().clear();
		DisplayText("Rathazul asks, \"<i>What would you like me to purify?</i>\"");
		
		//Item purification offer
		if (player.inventory.items.has(consumables.INCUBID)) {
			MainScreen.addButton(0, "Incubi Draft", rathazulPurifyIncubiDraft);
		}
		if (player.inventory.items.has(consumables.SUCMILK)) {
			MainScreen.addButton(1, "SuccubiMilk", rathazulPurifySuccubiMilk);
		}
		if (player.inventory.items.has(consumables.SDELITE)) {
			MainScreen.addButton(2, "S. Delight", rathazulPurifySuccubiDelight);
		}
		if (player.inventory.items.has(consumables.LABOVA_)) {
			MainScreen.addButton(3, "LaBova", rathazulPurifyLaBova);
		}
		MainScreen.addButton(4, "Back", rathazulWorkOffer);
	}


	private rathazulPurifyIncubiDraft() {
		DisplayText().clear();
		if (player.inventory.gems < 20) {
			DisplayText("Rathazul says, \"<i>You do not have enough gems for that service.</i>\"");
			return { next: returnToRathazulMenu };
			return;
		}
		if (!debug)
			player.destroyItems(consumables.INCUBID, 1);
		inventory.takeItem(consumables.P_DRAFT, returnToRathazulMenu);
		player.inventory.gems -= 20;
		statScreenRefresh();
		player.statusAffects.get(StatusAffectType.MetRathazul).value2 = 1;
	}


	private rathazulPurifySuccubiMilk() {
		DisplayText().clear();
		if (player.inventory.gems < 20) {
			DisplayText("Rathazul says, \"<i>You do not have enough gems for that service.</i>\"");
			return { next: returnToRathazulMenu };
			return;
		}
		if (!debug)
			player.destroyItems(consumables.SUCMILK, 1);
		inventory.takeItem(consumables.P_S_MLK, returnToRathazulMenu);
		player.inventory.gems -= 20;
		statScreenRefresh();
		player.statusAffects.get(StatusAffectType.MetRathazul).value2 = 1;
	}


	private rathazulPurifySuccubiDelight() {
		DisplayText().clear();
		if (player.inventory.gems < 20) {
			DisplayText("Rathazul says, \"<i>You do not have enough gems for that service.</i>\"");
			return { next: returnToRathazulMenu };
			return;
		}
		if (!debug)
			player.destroyItems(consumables.SDELITE, 1);
		inventory.takeItem(consumables.PSDELIT, returnToRathazulMenu);
		player.inventory.gems -= 20;
		statScreenRefresh();
		player.statusAffects.get(StatusAffectType.MetRathazul).value2 = 1;
	}


	private rathazulPurifyLaBova() {
		DisplayText().clear();
		if (player.inventory.gems < 20) {
			DisplayText("Rathazul says, \"<i>You do not have enough gems for that service.</i>\"");
			return { next: returnToRathazulMenu };
			return;
		}
		if (!debug)
			player.destroyItems(consumables.LABOVA_, 1);
		inventory.takeItem(consumables.P_LBOVA, returnToRathazulMenu);
		player.inventory.gems -= 20;
		statScreenRefresh();
		player.statusAffects.get(StatusAffectType.MetRathazul).value2 = 1;
	}

	private rathazulDebimboOffer() {
		DisplaySprite(49);
		DisplayText().clear();
		if (Flags.list[FlagEnum.RATHAZUL_DEBIMBO_OFFERED] === 0) {
			if (sophieBimbo.bimboSophie()) {
				DisplayText("Rathazul glances your way as you approach his lab, a thoughtful expression on his age-lined face.  \"<i>Tell me, [name], do you truly enjoy having that vacuous idiot around, lusting after you at all hours of the day?</i>\" he asks, shaking his head in frustration.  \"<i>She's clearly been subjected to the effects of Bimbo Liqueur, which as you can plainly see are quite indeed potent.  However, like most things in Mareth, it can be countered - at least partially.</i>\"  Rathazul folds his long, clawed fingers together, his tail lashing behind him as he thinks.  \"<i>Perhaps with a sufficient quantity of something called Scholar's Tea... I could counter the stupefying effects of the elixir... oh my, yes... hmm...</i>\"  Rathazul nods, stroking at the few long wisps of fur that hang from his chin.");
				DisplayText("\n\nYou await");
				if (User.settings.silly()) DisplayText(" getGoodPost()"); // C# await joke ;_; http://msdn.microsoft.com/en-gb/library/hh156528.aspx
				DisplayText(" further clarification, but the old rat just stands there, staring off into space.  Coughing politely, you reacquire his attention, causing him to jump.");
				DisplayText("\n\n\"<i>Oh?  Nmm, YES, bimbos, that's right!  As I was saying, five Scholar's Teas along with 250 gems for other reagents should give me all I need to create a bimbo-beating brew!  Oh my, the alliteration!  How absurd.</i>\"  Rathazul chuckles slowly, wiping a drop from his eye before he looks back at you fiercely, \"<i>It is a worthwhile goal - no creature should be subjected to a reduced intellect.  Let me know when you have acquired what is needed.</i>\"");
			}
			else {
				//Notification if the PC is the one bimbo'ed*
				DisplayText("\n\nRathazul glances your way as you approach his lab, a thoughtful expression on his age-lined face.  \"<i>Tell me [name], do you truly enjoy living your life under the debilitating effects of that cursed potion?  Even now the spark of intelligence has all but left from your eyes.  Do you even understand what I'm saying?</i>\"");
				DisplayText("\n\nYou twirl a lock of hair around your finger and giggle.  This silly old rat thinks you're like, dumb and stuff!  He just doesn't know how great it is to have a rocking body and a sex-drive that's always ready to suck and fuck.  It's so much fun!  You look back at the rat, realizing you haven't answered him yet, feeling a bit embarrassed as he sighs in disappointment.");
				DisplayText("\n\n\"<i>Child, please... bring me five Scholar's Teas and 250 gems for reagents, then I can fix you!  I can help you!  Just... get the tea!</i>\" the alchemist pleads, counting off to five on his clawed fingers for extra emphasis while shaking his gem pouch profusely.  You bite your lower lip— he seems really really mad about this or something.  Maybe you should like, get the tea?");
			}
			Flags.list[FlagEnum.RATHAZUL_DEBIMBO_OFFERED]++;
		}
		//Rath menu
		
		MainScreen.addButton(0, "Next", campRathazul);
	}

	//Creation Of The Draft:*
	private makeADeBimboDraft() {
		DisplayText().clear();
		DisplaySprite(49);
		DisplayText("Rathazul takes the teas and the gems into his wizened palms, shuffling the glittering jewels into a pouch and the teas into a large decanter.  He promptly sets the combined brews atop a flame and shuffles over to his workbench, where he picks up numerous pouches and vials of every color and description, adding them to the mix one after the other.  The mixture roils and bubbles atop the open flame like a monstrous, eerie thing, but quickly simmers down to a quiet boil.  Rathazul leaves it going for a while, stirring occasionally as he pulls out a smaller vial.  Once most of the excess liquid has evaporated, he pours the concoction into the glass container and corks it, holding it up to the light to check its coloration.");
		DisplayText("\n\n\"<i>That <b>should</b> do,</i>\" he mutters to himself.  Rathazul turns, carefully handing you the mixture.  \"<i>This should counter the mental-inhibiting effects of the Bimbo Liqueur, but I have no idea to what extent those who imbibe it will retain of their time spent as a bimbo...</i>\"\n\n");
		//Take items
		player.inventory.gems -= 250;
		player.inventory.items.consumeItem(consumables.SMART_T, 5);
		statScreenRefresh();
		player.addStatusValue(StatusAffects.MetRathazul, 2, 1);
		inventory.takeItem(consumables.DEBIMBO, returnToRathazulMenu);
	}


	public rathazulArmorMenu() {
		DisplaySprite(49);
		DisplayText().clear();
		let beeArmor: Function = (player.inventory.items.has(useables.B_CHITN, 5) ? craftCarapace : null);
		let gelArmor: Function = (player.inventory.items.has(useables.GREENGL, 5) ? craftOozeArmor : null);
		let silk;
		DisplayText("Which armor project would you like to pursue with Rathazul?");
		if (player.statusAffects.has(StatusAffectType.CampRathazul) && player.inventory.items.has(useables.T_SSILK) && Flags.list[FlagEnum.RATHAZUL_SILK_ARMOR_COUNTDOWN] + Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00275] === 0) {
			silk = craftSilkArmor;
		}
		MainScreen.simpleChoices(["BeeArmor", "GelArmor", "SpiderSilk", "", "Back"], [beeArmor, gelArmor, silk, null, returnToRathazulMenu]);
	}

	private craftSilkArmor() {
		DisplaySprite(49);
		DisplayText().clear();
		DisplayText("You hand the bundled webbing to Rathazul carefully, lest you damage the elderly mouse.  He gives you a bemused smile and snatches the stuff from your grasp while he mutters, \"<i>I'm not falling apart you know.</i>\"\n\n");
		//(Not enough webs: 
		if (!player.inventory.items.has(useables.T_SSILK, 5)) {
			DisplayText("The rat shakes his head and hands it back to you.  \"<i>This isn't enough for me to make anything with.  I'll need at least five bundles of this stuff total, so you'll need to find more,</i>\" he explains.\n\n");
			//(optional spider bonus: 
			if (player.torso.tailType === TailType.SPIDER_ABDOMEN) {
				DisplayText("You show him your spider-like abdomen in response, offering to produce more webbing for him.  Rathazul chuckles dryly, a sound that reminds you of hot wind rushing through a dead valley.  \"<i>Dear child, this would never do.  Silk this tough can only be produced by a true-born spider.  No matter how you change yourself, you'll always be a human at heart.</i>\"\n\n");
				DisplayText("The old rat shakes his head and adds, \"<i>Well, now that I think about it, the venom of a red widow might be able to transform you until you are a spider to the core, but I have absolutely no idea what that would do to you.  If you ever try such a dangerous, reckless idea, let me know.  I want to have my notebooks handy, for SCIENCE!</i>\"\n\n");
			}
			return { next: returnToRathazulMenu };
			return;
		}
		DisplayText("The rat limps over to his equipment, spider-silk in hand.  With efficient, practiced motions, he runs a few tests.  As he finishes, he sighs and explains, \"<i>This will be harder than I thought.  The webbing is highly resistant to most of my alchemic reagents.  To even begin to work with such material I will need a number of rare, expensive elements.  I would need 500 gems to even start such a project.</i>\"\n\n");
		DisplayText("You can't help but sigh when he names such a sizable figure.  Do you give him the 500 gems and spider-silk in order for him to create you a garment?");
		if (player.inventory.gems < 500) {
			DisplayText("  <b>Wait... you don't even have 500 gems.  Damn.</b>");
			return { next: returnToRathazulMenu };
			return;
		}
		//[Yes] [No]
		doYesNo(commissionSilkArmorForReal, declineSilkArmorCommish);
	}
	private commissionSilkArmorForReal() {
		DisplaySprite(49);
		DisplayText().clear();
		DisplayText("You sort 500 gems into a pouch and toss them to Rathazul, along with the rest of the webbing.  The wizened alchemist snaps the items out of the air with lightning-fast movements and goes to work immediately.  He bustles about with enormous energy, invigorated by the challenging task before him.  It seems Rathazul has completely forgotten about you, but as you turn to leave, he calls out, \"<i>What did you want me to make?  A mage's robe or some nigh-impenetrable armor?</i>\"\n\n");
		player.inventory.gems -= 500;
		statScreenRefresh();
		player.destroyItems(useables.T_SSILK, 5);
		
		MainScreen.addButton(0, "Armor", chooseArmorOrRobes, 1);
		MainScreen.addButton(1, "Robes", chooseArmorOrRobes, 2);
	}

	private declineSilkArmorCommish() {
		DisplaySprite(49);
		DisplayText().clear();
		DisplayText("You take the silk back from Rathazul and let him know that you can't spend 500 gems on a project like that right now.  He sighs, giving you a crestfallen look and a slight nod of his hooded muzzle.");
		return { next: returnToRathazulMenu };
	}

	public chooseArmorOrRobes(robeType: number) {
		DisplaySprite(49);
		DisplayText("Rathazul grunts in response and goes back to work.  You turn back to the center of your camp, wondering if the old rodent will actually deliver the wondrous item that he's promised you.", true);
		return { next: Scenes.camp.returnToCampUseOneHour };
		Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00275] = robeType;
		Flags.list[FlagEnum.RATHAZUL_SILK_ARMOR_COUNTDOWN] = 24;
		trace("274: " + Flags.list[FlagEnum.RATHAZUL_SILK_ARMOR_COUNTDOWN]);
	}
	private collectRathazulArmor() {
		DisplaySprite(49);
		DisplayText().clear();
		DisplayText("Rathazul beams and ejaculates, \"<i>Good news everyone!  Your ");
		if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00275] === 1) DisplayText("armor");
		else DisplayText("robe");
		DisplayText(" is finished!</i>\"\n\n");
		//Robe
		let itype: ItemType;
		if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00275] === 2) {
			DisplayText("Hanging from a small rack is a long, flowing robe.  It glitters brightly in the light, the pearl-white threads seeming to shimmer and shine with every ripple the breeze blows through the soft fabric.  You run your fingers over the silken garment, feeling the soft material give at your touch.  There's a hood with a golden border embroidered around the edge.  For now, it hangs limply down the back, but it would be easy to pull up in order to shield the wearer's eyes from harsh sunlight or rainy drizzle.  The sleeves match the cowl, circled with intricate threads laid out in arcane patterns.\n\n");

			DisplayText("Rathazul gingerly takes down the garment and hands it to you.  \"<i>Don't let the softness of the material fool you.  This robe is tougher than many armors, and the spider-silk's properties may even help you in your spell-casting as well.</i>\"\n\n");
			itype = armors.SS_ROBE;
		}
		//(Armor)
		else {
			DisplayText("A glittering white suit of armor sits atop a crude armor rack, reflecting the light that plays across its surface beautifully.  You definitely didn't expect anything like this!  It looks nearly identical to a set of light platemail, though instead of having a cold metal surface, the armor feels slightly spongy, with just a little bit of give in it.\n\n");

			DisplayText("While you marvel at the strange equipment, Rathazul explains, \"<i>When you said you wanted armor, I realized I could skip a few of the alchemical processes used to soften material.  The savings let me acquire a cheap metal set of armor to use as a base, and I molded half the armor around each piece, then removed it and created the outer, defensive layers with the rest of the webbing.  Unfortunately, I didn't have enough silk for a solid codpiece, but I did manage to make a you thin loincloth from the leftover scraps  - for modesty.</i>\"\n\n");
			itype = armors.SSARMOR;
		}
		//Reset counters
		Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00275] = 0;
		Flags.list[FlagEnum.RATHAZUL_SILK_ARMOR_COUNTDOWN] = 0;
		inventory.takeItem(itype, returnToRathazulMenu);
	}

	private craftOozeArmor() {
		DisplaySprite(49);
		player.destroyItems(useables.GREENGL, 5);
		DisplayText("Rathazul takes the green gel from you and drops it into an empty cauldron.  With speed well beyond what you'd expect from such an elderly creature, he nimbly unstops a number of vials and pours them into the cauldron.  He lets the mixture come to a boil, readying a simple humanoid-shaped mold from what you had thought was piles of junk material.  In no time at all, he has cast the boiling liquid into the mold, and after a few more minutes he cracks it open, revealing a suit of glistening armor.\n\n", true);
		player.addStatusValue(StatusAffects.MetRathazul, 2, 1);
		inventory.takeItem(armors.GELARMR, returnToRathazulMenu);
		if (!player.statusAffects.has(StatusAffectType.RathazulArmor)) player.statusAffects.add(StatusAffectType.RathazulArmor, 0, 0, 0, 0);
	}

	private buyDyes() {
		DisplaySprite(49);
		DisplayText().clear();
		DisplayText("Rathazul smiles and pulls forth several vials of colored fluids.  Which type of dye would you like?");
		DisplayText("\n\n<b>(-50 Gems)</b>");
		player.inventory.gems -= 50;
		statScreenRefresh();
		
		MainScreen.addButton(0, "Auburn", buyDye, consumables.AUBURND);
		MainScreen.addButton(1, "Black", buyDye, consumables.BLACK_D);
		MainScreen.addButton(2, "Blond", buyDye, consumables.BLOND_D);
		MainScreen.addButton(3, "Brown", buyDye, consumables.BROWN_D);
		MainScreen.addButton(4, "Red", buyDye, consumables.RED_DYE);
		MainScreen.addButton(5, "White", buyDye, consumables.WHITEDY);
		MainScreen.addButton(6, "Gray", buyDye, consumables.GRAYDYE);
		MainScreen.addButton(9, "Nevermind", buyDyeNevermind);
	}

	private buyDye(dye: ItemType) {
		DisplaySprite(49);
		DisplayText().clear();
		inventory.takeItem(dye, returnToRathazulMenu);
		statScreenRefresh();
		player.statusAffects.get(StatusAffectType.MetRathazul).value2 = 1;
	}

	private buyDyeNevermind() {
		DisplaySprite(49);
		DisplayText().clear();
		DisplayText("You change your mind about the dye, and Rathazul returns your gems.\n\n(<b>+50 Gems</b>)");
		player.inventory.gems += 50;
		statScreenRefresh();
		return { next: returnToRathazulMenu };
	}

	private buyReducto() {
		DisplaySprite(49);
		DisplayText().clear();
		let cost: number = (Flags.list[FlagEnum.AMILY_MET_RATHAZUL] >= 2 ? 50 : 100);
		if (player.inventory.gems >= cost) {
			DisplayText("Rathazul hands you the Reducto with a nod before returning to his work.\n\n");
			player.inventory.gems -= cost;
			inventory.takeItem(consumables.REDUCTO, returnToRathazulMenu);
			statScreenRefresh();
			player.statusAffects.get(StatusAffectType.MetRathazul).value2 = 1;
		}
		else {
			DisplayText("\"<i>I'm sorry, but you lack the gems I need to make the trade,</i>\" apologizes Rathazul.");
			return { next: returnToRathazulMenu };
		}
	}

	private growLethiciteDefense() {
		DisplaySprite(49);
		DisplayText().clear();
		DisplayText("Rathazul asks, \"<i>Are you absolutely sure?  Growing this thorn canopy as a defense will use one third of the crystal's power.</i>\"\n\n(Do you have Rathazul use the crystal to grow a defensive canopy?)");
		doYesNo(growLethiciteDefenseYesYesYes, growLethiciteDefenseGuessNot);
	}

	private growLethiciteDefenseYesYesYes() {
		DisplaySprite(49);
		DisplayText().clear();
		DisplayText("Rathazul nods and produces a mallet and chisel from his robes.  With surprisingly steady hands for one so old, he holds the chisel against the crystal and taps it, easily cracking off a large shard.  Rathazul gathers it into his hands before slamming it down into the dirt, until only the smallest tip of the crystal is visible.  He produces vials of various substances from his robe, as if by magic, and begins pouring them over the crystal.  In a few seconds, he finishes, and runs back towards his equipment.\n\n\"<i>You may want to take a step back,</i>\" he warns, but before you have a chance to do anything, a thick trunk covered in thorny vines erupts from the ground.  Thousands of vine-like branches split off the main trunk as it reaches thirty feet in the air, radiating away from the trunk and intertwining with their neighbors as they curve back towards the ground.  In the span of a few minutes, your camp gained a thorn tree and a thick mesh of barbed vines preventing access from above.");
		player.statusAffects.add(StatusAffectType.DefenseCanopy, 0, 0, 0, 0);
		player.statusAffects.get(StatusAffectType.MaraesLethicite).value2 = 1;
		return { next: playerMenu };
	}

	private growLethiciteDefenseGuessNot() {
		DisplaySprite(49);
		DisplayText().clear();
		DisplayText("Rathazul nods sagely, \"<i>That may be wise.  Perhaps there will be another use for this power.");
		return { next: returnToRathazulMenu };
	}

	public craftCarapace() {
		DisplaySprite(49);
		DisplayText("The rat takes the scales and works on his bench for an hour while you wait.  Once he has finished, Ratzhul is beaming with pride, \"<i>I think you'll be pleased. Go ahead and take a look.</i>\"\n\nHe hands you the armor.  ", true);
		DisplayText("The plates shine and shimmer like black steel.  He has used the yellow chitin to add accents and embroidery to the plates with a level of detail and craftsmanship rarely seen back home. A yellow fur neck lining has been fashioned from hairs found on the pieces.  The armor includes a breastplate, shoulder guards, full arm guards, and knee high boots.  You notice there are no pants.  As you turn to ask him where the pants are, you see him scratching his head and hastily rustling in drawers.  He mutters under his breath, \"<i>I'm sorry, I'm sorry, I got so focused on working on the pauldrons that I forgot to make any leg coverings!  Here, this should look good with it, and it won't restrict your movements.</i>\"  He hands you a silken loincloth");
		if (player.gender >= 2) DisplayText(" with stockings and garters");
		DisplayText(".  He still manages to look somewhat pleased with himself in spite of the blunder, even bragging a little bit, \"<i>Let me show you the different lengths of string I used.</i>\"\n\n");
		if (player.torso.cocks.count > 0 && player.torso.cocks.sort(Cock.LargestCockArea)[0].area >= 40) DisplayText("The silken material does little to hide the bulge of your groin, if anything it looks a little lewd.  Rathazul mumbles and looks away, shaking his head.\n\n");
		if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 8) DisplayText("Your " + Desc.Breast.describeBreastSize(character.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating) + " barely fit into the breastplate, leaving you displaying a large amount of jiggling cleavage.\n\n");
		player.destroyItems(useables.B_CHITN, 5);
		player.addStatusValue(StatusAffects.MetRathazul, 2, 1);
		inventory.takeItem(armors.BEEARMR, returnToRathazulMenu);
		return { next: Scenes.camp.returnToCampUseOneHour };
	}
}
}