﻿/**
 * Created by aimozg on 04.01.14.
 */

export default class EmberScene extends NPCAwareContent implements TimeAwareInterface {

	//import flash.media.Video;

	//Tainted Ember
	//Link: Tainted Ember
	//Variable and Flag Listing
	// EMBER_AFFECTION: number = 523; //: Pretty obvious
	// EMBER_HATCHED: number = 524; //: is ember hatched? 1 = true
	// EMBER_GENDER: number = 525; // 1 for male, 2 for female, 3 for herm. This also controls the egg's shell color.
	// EMBER_TYPE: number = 526; //numerical value; Ember is supposed to have many forms, this will control which one is born. (This is important for when Ember has hybrid forms.)
	// EMBER_COR: number = 527; //Controls Ember's current corruption levels, only default/dragon-girl Ember uses this. (Default starting value = 50)
	// EMBER_HAIR: number = 528; //0 for no hair, 1 for hair, 2 for mane.
	// EMBER_MILK: number = 529; //0 for no lactation, 1 for lactating.
	// EMBER_OVIPOSITION: number = 530; //0 for no egg laying, 1 for egg laying.
	// EMBER_ROUNDFACE: number = 531; //0 for anthro Ember, 1 for dragon-girl Ember. (You might want to control this with the Type flag since only default Embers use this variable.)
	// EMBER_EGG_FLUID_COUNT: number = 532; //This controls when it's time to hatch. Every item use and every time you use the egg as a masturbation aid, this will be incremented. Threshold for birthing is 5, but the birthing process can only be triggered when using as a masturbatory aid. This is done to allow players the chance to modify Ember before actually hatching.
	//BreathType: Controls which breath weapon the PC will have via TFing. Every Ember has its unique breath weapon to pass on.
	//EmberQuestTrigger: Controls whether the PC can still visit the lost dragon city. 0 can visit and 1 can't, special text will be displayed. (Future Expansion)
	//BreathCooldown: How many hours you need to wait to be able to use the breath weapon again.
	// EMBER_STAT: number = 533; //All Embers have a hidden stat, Corrupt has Ego, Pure has Confidence, Tainted has Affection, and hybrids vary. There is a need to track this, but only 1 special stat for every Ember.
	// EMBER_INTERNAL_DICK: number = 534; //Dragon-girl Ember can have either a internal sheath to keep " + emberMF("his","her") + " dick in or have it be more human-like. 0 = internal, 1 = external.
	//EmberKidsCount: How many children you've had with Ember, this will be important later.
	//BooleanEmberKidMale: If you've had a male child with Ember, having a herm sets both flags to 1 (true).
	//BooleanEmberKidFemale: If you've had a female child with Ember, having a herm sets both flags to 1 (true).
	// TIMES_EQUIPPED_EMBER_SHIELD: number = 535;
	// TOOK_EMBER_EGG: number = 536; //PC Take ember's egg home?
	// EGG_BROKEN: number = 537; //PC Smash!? ember's egg?
	// TIMES_FOUND_EMBERS_EGG: number =538; //Times stumbled into ze egg.
	// EMBER_JACKED_ON: number = 539; //Has the PC masturbated on the egg yet?  Needed to hatcH!
	// EMBER_OVI_BITCHED_YET: number = 540; //Used to trigger emberBitchesAboutPCBeingFullOfEggs()
	// EMBER_LUST_BITCHING_COUNTER: number = 541;
	// EMBER_CURRENTLY_FREAKING_ABOUT_MINOCUM: number = 542; // Used to trigger minotaurJizzFreakout()
	// DRANK_EMBER_BLOOD_TODAY: number = 543; //Cooldown for ember TFs

	// EMBER_PUSSY_FUCK_COUNT: number = 544;
	// TIMES_BUTTFUCKED_EMBER: number = 545;

	// EMBER_INCUBATION: number = 553;
	// EMBER_CHILDREN_MALES: number = 554;
	// EMBER_CHILDREN_FEMALES: number = 555;
	// EMBER_CHILDREN_HERMS: number = 556;
	// EMBER_EGGS: number = 557;
	// EMBER_BITCHES_ABOUT_PREGNANT_PC: number = 558;
	// EMBER_TALKS_TO_PC_ABOUT_PC_MOTHERING_DRAGONS: number = 559;
	// EMBER_PREGNANT_TALK: number = 560;

	// TIMES_EMBER_LUSTY_FUCKED: number = 824;

	public let pregnancy:PregnancyType;

	public EmberScene() {
		pregnancy = new PregnancyType(FlagEnum.EMBER_PREGNANCY_TYPE, FlagEnum.EMBER_INCUBATION, 0, 0);
		pregnancy.addPregnancyEventSet(PregnancyType.PLAYER, 330, 270, 200, 180, 100, 75, 48, 15);
		//Event: 0 (= not pregnant),  1,   2,   3,   4,   5,  6,  7,  8 (< 15)
		CoC.timeAwareClassAdd(this);
	}

	//Implementation of TimeAwareInterface
	public timeChange(): boolean {
		let needNext: boolean = false;
		pregnancy.pregnancyAdvance();
		trace("\nEmber time change: Time is " + model.time.hours + ", incubation: " + pregnancy.incubation + ", event: " + pregnancy.event);
		if (pregnancy.isPregnant) {
			if (emberPregUpdate()) needNext = true;
			if (pregnancy.incubation == 0) {
				emberGivesBirth();
				pregnancy.knockUpForce(); //Clear Pregnancy
				needNext = true;
			}
		}
		//Ember fuck cooldown
		if (player.statusAffects.get("EmberFuckCooldown").value1 > 0) {
			player.addStatusValue(StatusAffects.EmberFuckCooldown, 1, -1);
			if (player.statusAffects.get("EmberFuckCooldown").value1 < 1) player.statusAffects.remove("EmberFuckCooldown");
		}
		//Ember napping
		if (player.statusAffects.has("EmberNapping")) {
			player.addStatusValue(StatusAffects.EmberNapping, 1, -1);
			if (player.statusAffects.get("EmberNapping").value1 <= 0) player.statusAffects.remove("EmberNapping");
		}
		if (followerEmber() && !player.statusAffects.has("EmberNapping")) {
			//Mino cum freakout - PC partly addicted!
			if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] == 1 && !player.perks.has("MinotaurCumAddict") && Flags.list[FlagEnum.EMBER_CURRENTLY_FREAKING_ABOUT_MINOCUM] == 0) {
				minotaurJizzFreakout();
				needNext = true;
			}
			//Ember is freaking out about addiction, but PC no longer addicted!
			else if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] == 0 && Flags.list[FlagEnum.EMBER_CURRENTLY_FREAKING_ABOUT_MINOCUM] == 1) {
				emberGetOverFreakingOutAboutMinoJizz();
				needNext = true;
			}
			//At max lust, count up - if ten hours lusty, ember yells at ya!
			if (player.stats.lust >= 100 && player.gender > 0) {
				Flags.list[FlagEnum.EMBER_LUST_BITCHING_COUNTER]++;
				if (Flags.list[FlagEnum.EMBER_LUST_BITCHING_COUNTER] >= 10) {
					emberBitchesAtYouAboutLustiness();
					needNext = true;
				}
			}
			//Reset lust counter if not max lust'ed
			else Flags.list[FlagEnum.EMBER_LUST_BITCHING_COUNTER] = 0;
		}
		if (model.time.hours > 23) {
			if (!player.isPregnant()) Flags.list[FlagEnum.EMBER_BITCHES_ABOUT_PREGNANT_PC] = 0;
			Flags.list[FlagEnum.DRANK_EMBER_BLOOD_TODAY] = 0;
		}
		return needNext;
	}

	public timeChangeLarge(): boolean {
		if (!player.statusAffects.has("EmberNapping") && followerEmber() && !player.statusAffects.has("EmberFuckCooldown")) {
			//Ember get's a whiff of fuckscent and knocks up PC!
			if (player.lowerBody.vaginaSpot.hasVagina() && player.inHeat && player.pregnancyIncubation == 0 && rand(10) == 0 && (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3)) {
				emberRapesYourHeatness();
				return true;
			}
			else if (player.lowerBody.cockSpot.hasCock() && player.inRut && !pregnancy.isPregnant && rand(10) == 0 && Flags.list[FlagEnum.EMBER_GENDER] >= 2) {
				emberRapesYourHeatness();
				return true;
			}
		}
		return false;
	}
	//End of Interface Implementation

	public emberAffection(changes: number = 0): number {
		Flags.list[FlagEnum.EMBER_AFFECTION] += changes;
		if (Flags.list[FlagEnum.EMBER_AFFECTION] > 100) Flags.list[FlagEnum.EMBER_AFFECTION] = 100;
		else if (Flags.list[FlagEnum.EMBER_AFFECTION] < 0) Flags.list[FlagEnum.EMBER_AFFECTION] = 0;
		return Flags.list[FlagEnum.EMBER_AFFECTION];
	}

	private emberCorruption(changes: number = 0): number {
		Flags.list[FlagEnum.EMBER_COR] += changes;
		if (Flags.list[FlagEnum.EMBER_COR] > 100) Flags.list[FlagEnum.EMBER_COR] = 100;
		else if (Flags.list[FlagEnum.EMBER_COR] < 0) Flags.list[FlagEnum.EMBER_COR] = 0;
		return Flags.list[FlagEnum.EMBER_COR];
	}

	public followerEmber(): boolean {
		return Flags.list[FlagEnum.EMBER_HATCHED] > 0;

	}

	public emberMF(man: string, woman: string): string {
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1) return man;
		else return woman;
	}

	private emberVaginalCapacity(): number {
		return 60;
	}

	private emberAnalCapacity(): number {
		return 60;
	}

	private emberHasCock(): boolean {
		return (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3);
	}

	public emberChildren(): number {
		return (Flags.list[FlagEnum.EMBER_CHILDREN_MALES] + Flags.list[FlagEnum.EMBER_CHILDREN_FEMALES] + Flags.list[FlagEnum.EMBER_CHILDREN_HERMS]);
	}

	private emberInternalDick(): boolean {
		return (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] > 0);
	}

	//Approaching Ember (Z)
	public emberCampMenu(): void {
		MainScreen.clearText();
		MainScreen.text(images.showImage("ember-visit-at-camp"));
		//Low Affection:
		if (emberAffection() <= 25) MainScreen.text("Ember sighs as you approach, and doesn't even look you in the eye before speaking.  \"<i>What do you want?</i>\"");
		//Moderate Affection:
		else if (emberAffection() <= 75) MainScreen.text("Ember fidgets as " + emberMF("his", "her") + " tail starts to sway from side to side, " + emberMF("he", "she") + " looks at you and asks, \"<i>What is it?</i>\"");
		else MainScreen.text("Ember's eyes light up as you close in on " + emberMF("him", "her") + ", and " + emberMF("he", "she") + " smiles nervously.  \"<i>Y-Yes?</i>\"");
		//OPTIONS HERE
		//[APPEARANCE]
		/*Talk (always available)
		 Egg (get a dragon egg, available if she has a pussy and received Ovi Elixir before hatching) (unlimited times/day)
		 Milk (get dragon milk, available if " + emberMF("he","she") + " has received Lactaid before hatching.) (unlimited times/day)
		 Blood (get dragon blood, always available) (1 time/day)
		 Sex (have sex, always available)
		 Spar (fight Ember)*/
		let egg: Function = null;
		let milk: Function = null;
		if (Flags.list[FlagEnum.EMBER_OVIPOSITION] > 0 && Flags.list[FlagEnum.EMBER_GENDER] >= 2 && !pregnancy.isPregnant) egg = emberIsAnEggFactory;
		if (Flags.list[FlagEnum.EMBER_MILK] > 0) milk = getMilkFromEmber;
		choices("Appearance", embersAppearance, "Talk", talkToEmber, "DrinkBlood", bloodForTheBloodGod, "Drink Milk", milk, "Get Egg", egg,
			"Sex", emberSexMenu, "Spar", decideToSparEmbra, "", null, "", null, "Back", camp.campFollowers);
	}

	//Approach for sex - initial output when selecting [Sex] menu (Z)
	private emberSexMenu(output: boolean = true): void {
		if (output) {
			MainScreen.clearText();
			MainScreen.text("You ogle Ember, checking out the nuances of " + emberMF("his", "her") + " body.");
			//(Low Affection)
			if (emberAffection() <= 25) MainScreen.text("\n\n\"<i>Why are you looking at me like that?</i>\" " + emberMF("he", "she") + " says, flatly.");
			//(Medium Affection)
			else if (emberAffection() < 75) MainScreen.text("\n\n\"<i>What is it?  Is something wrong with my body?</i>\" Ember asks, checking " + emberMF("him", "her") + "self.");
			//(High Affection)
			else MainScreen.text("\n\n\"<i>D-don't stare at me like that!</i>\" Ember protests, biting " + emberMF("his", "her") + " lip.");
			MainScreen.text("\n\nYou smile at Ember, admiring the shape of the dragon, and casually mention as much.");

			//Low Affection)
			if (emberAffection() <= 25) MainScreen.text("\n\n\"<i>Flattery won't get you any points with me!</i>\" Ember declares.");
			//(Medium Affection)
			else if (emberAffection() < 75) MainScreen.text("\n\n\"<i>I don't buy it... you're up to something; I can tell,</i>\" Ember replies.");
			//(High Affection)
			else MainScreen.text("\n\n\"<i>Well, stop it!  You're making me...</i>\"  Ember never finishes " + emberMF("his", "her") + " sentence, flustered with a mixture of arousal and embarrassment.");

			MainScreen.text("  ");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) {
				MainScreen.text(emberMF("His", "Her") + " cock ");
				if (Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 1 || Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text("is poking out of " + emberMF("his", "her") + " slit");
				else MainScreen.text("is starting to swell with blood");
				MainScreen.text(".  ");
			}
			if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("You can see tiny rivulets of moisture starting to run down Ember's inner thighs as they rub together, barely hiding her precious treasure from your hungry eyes.  ");
			MainScreen.text("Well, " + emberMF("he", "she") + " is a sexy beast; you ask what naturally comes to mind.");

			//(Lo-rider Affection)
			if (emberAffection() <= 25) MainScreen.text("\n\n\"<i>T-this is just a reflex! It has nothing to do with you!</i>\"  You chuckle at Ember's failed attempt to justify " + emberMF("his", "her") + " growing arousal.");
			//(Medium Affection)
			else if (emberAffection() < 75) MainScreen.text("\n\n\"<i>I... I think I can help you with something, if you want.</i>\"");
			//(High Affection)
			else MainScreen.text("\n\n\"<i>Depends... what do you have in mind?</i>\"");
		}

		let catchAnal_: Function = null;
		let pitchAnal: Function = null;
		let blowEmber: Function = null;
		let getBlown: Function = null;
		let eatOut: Function = null;
		let getEatenOut: Function = null;
		let penetrateHer: Function = null;
		let getPenetrated: Function = null;
		//Display Options:[Catch Anal][Pitch Anal][Blow Ember][Get Blown][Eat Ember Out][Get Eaten Out][Penetrate Her][Get Penetrated][Leave]
		//Scenes that require Ember to have a dick
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) {
			blowEmber = suckEmberCock;
			catchAnal_ = catchAnal;
			if (player.stats.lust >= 33 && player.lowerBody.vaginaSpot.hasVagina()) {
				getPenetrated = getPenetratedByEmberLastSexSceneWoooo;
			}
		}
		//scenes that require Ember to have a cunt
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) {
			eatOut = slurpDraggieCunnies;
			if (player.lowerBody.cockSpot.hasCock() && player.stats.lust >= 33) penetrateHer = penetrateEmbrah;
		}
		if (player.lowerBody.vaginaSpot.hasVagina() && player.stats.lust >= 33) getEatenOut = getEatenOutByEmbra;
		if (player.lowerBody.cockSpot.hasCock() && player.stats.lust >= 33) {
			getBlown = stickDickInKnifeDrawer;
			pitchAnal = stickItInEmbersButt;
		}
		//choices("Catch Anal",catchAnal,"Pitch Anal",pitchAnal,"Blow Ember",blowEmber,"Get Blown",getBlown,"Eat Her Out",eatOut,"Get Eaten Out",getEatenOut,"Penetrate Her",penetrateHer,"Get Penetrated",getPenetrated,"",0,"Leave",emberCampMenu);
		menu();

		MainScreen.addButton(0, "Catch Anal", catchAnal_);
		MainScreen.addButton(1, "Pitch Anal", pitchAnal);
		MainScreen.addButton(2, "Blow Ember", blowEmber);
		MainScreen.addButton(3, "Get Blown", getBlown);
		MainScreen.addButton(4, "Eat Her Out", eatOut);
		MainScreen.addButton(5, "Get Eaten Out", getEatenOut);
		MainScreen.addButton(6, "Penetrate Her", penetrateHer);
		MainScreen.addButton(7, "Get Penetrated", getPenetrated);
		if (emberAffection() >= 95 && player.lowerBody.cockSpot.hasCock() && player.cockThatFits(emberVaginalCapacity()) >= 0 && (player.inventory.items.has(consumables.L_DRAFT) || player.stats.lib >= 50 || player.minLust() >= 40))
			MainScreen.addButton(8, "LustyFuck", highAffectionEmberLustFuck);
		MainScreen.addButton(9, "Leave", emberCampMenu);

	}

	//Finding the Egg (Z)
	//Triggers randomly on exploration in Swamp
	public findEmbersEgg(): void {
		MainScreen.clearText();
		if (Flags.list[FlagEnum.TIMES_FOUND_EMBERS_EGG] == 0) {
			MainScreen.text("You spot a cave entrance partially hidden behind mossy vegetation and decide to investigate.");
			MainScreen.text("\n\nThe cave floor is very damp, and the moss growing along the ground makes it extra slippery.  Unfortunately, squint as you might to see the inside, the almost tractionless ground causes you to lose your balance and you fall back towards the wall.  You try a grab for the solid rock face to steady yourself, but your hands meet only air; the wall dissolves in front of your eyes and you hit the ground with a yelp and a loud thud.");
			MainScreen.text("\n\nFortunately, you don't seem to be injured, but your curiosity is piqued... was the wall some kind of illusion?  You look ahead and see tiny glowing mushrooms lighting what is obviously a deliberately crafted path.  Since the rest of the cave is too dark, you decide to continue along this path.");
			MainScreen.text("\n\nYou press on until you come to a rather large and well lit chamber.  The walls appear to have been carved, not cut, and a small shrine sits in the center to house what looks like a large egg...  A small, tattered book sits beside it; perhaps it might contain the answer?  You open to the first page and begin reading.");
			MainScreen.text("\n\n\"<i>Dear reader; what stands in front of you is an egg containing my child - our last hope.  This room was safeguarded with a powerful ward, designed to repel any race of Mareth save our own, and any creature attempting to breach this room but failing would have been cursed.</i>\"");
			MainScreen.text("\n\n\"<i>Only a fellow dragon could have made it past the ward, and even among dragons, not all would have been able to see through the illusion.  For that, you have our compliments.</i>\"");
			MainScreen.text("\n\nYour eyes widen in surprise; dragons!?  They exist in this world?  Immediately your mind travels back to childhood tales of mighty knights slaying fierce dragons...  If this \"<i>dragon</i>\" is anything like the ones in the stories, it would be very bad to allow it to hatch... On the other hand, the journal claims it is a \"<i>last hope</i>\".");
			MainScreen.text("\n\n\"<i>We were obliterated.  Some strange magic started turning our young and unborn into deformed, distorted little monsters we called Kobolds; they were weak, and in our pride we underestimated them.\n\nThey have the ability to quickly multiply their numbers, and while we could easily dispatch a few, we were no match for an army of them.\n\nOurs is a small group that managed to escape...  This egg, our child, is the last healthy dragon baby to be born after the incident.  We left our child here, protected from the evils outside, as our last desperate attempt to ensure our species's survival.\n\nFollowing this letter are all the notes on how my child was encased in this egg and how you may free her... or him.  Please take care of my child; our fate lies in your hands.</i>\"");
			MainScreen.text("\n\nTrue to the letter, you see various notes on how the egg was created and how it may be hatched. You will need to perform a small ritual in order to awaken it from its magical stasis, as well as to 'share your essence' to make it hatch. The research notes state that by absorbing your essence, the life inside the egg will hatch into a suitable mate...");
			MainScreen.text("\n\nStill, should you even consider taking this egg with you?");
		}
		else {
			//Finding the Egg - repeat (Z)
			MainScreen.text("You spot a familiar cave partially hidden behind the mossy vegetation and decide to confirm your suspicion.");
			MainScreen.text("\n\nTrue enough, after a short trek through familiar tunnels you find yourself once again standing before the alleged 'dragon egg'.");
		}
		Flags.list[FlagEnum.TIMES_FOUND_EMBERS_EGG]++;
		simpleChoices("Take It", takeEmbersEggHomeInADoggieBag, "Destroy It", destroyBabyEmberYouMonster, "", null, "", null, "Leave", leaveEmbersAssOutToDry);
	}

	//[=Leave=] (Z)
	private leaveEmbersAssOutToDry(): void {
		MainScreen.clearText();
		MainScreen.text("You can't decide what to do right now, so you leave the egg where it is and return to your camp.");
		//(You can restart this quest by randomly encountering this chamber again. It continues to reappear until you either Destroy or Take the egg.)
		doNext(camp.returnToCampUseOneHour);
	}

	//[=Destroy it=] (Z)
	private destroyBabyEmberYouMonster(): void {
		MainScreen.clearText();
		MainScreen.text("Raising your [weapon], you rain down blow after blow upon the egg.  The shell is freakishly tough, taking a lot of punishment before it shatters apart to spill a wave of egg white onto your " + LowerBodyDescriptor.describeFeet(player) + "; a great pulpy mass of weirdly bluish-red yolk remains in the broken shell.");
		MainScreen.text("\n\nYou have sealed the fate of an entire species... you feel guilty, but this was for the best.  There was no way of knowing what this dragon could do once it hatched.");
		MainScreen.text("\n\nWith nothing else in the cave, you prepare to leave, but find yourself stopped by a sudden thought.  The egg yolk, though raw, looks strangely appetizing...");
		Flags.list[FlagEnum.EGG_BROKEN] = 1;
		//[Eat][Leave]
		simpleChoices("Eat It", eatEmbersYolkLikeAnEvenBiggerDick, "", null, "", null, "", null, "Leave", camp.returnToCampUseOneHour);
	}

	//[=Eat=]
	private eatEmbersYolkLikeAnEvenBiggerDick(): void {
		MainScreen.clearText();
		MainScreen.text("Unsure of where the impulse comes from, but uncaring, you crouch over the ruined shell of your 'kill' and begin messily scooping handfuls of yolk into your mouth.");
		MainScreen.text("\n\nThe taste is incredible; a tinge of bitterness, but rich and velvety, sliding down your throat like the most savory of delicacies.  Each scoop you eat fills you with energy and power, you can almost feel yourself growing stronger.");
		MainScreen.text("\n\nBefore you realize it, you have eaten as much of it as is possible to eat and the empty halves of the egg lie before you - as you watch, the leftover albumen wicks into the porous shell, disappearing completely.  You pick up the shell, looking at the underside, but not a drop of fluid seeps out.  Interesting...");
		MainScreen.text("\n\nFeeling sated, you get up and prepare to return to your camp, but on a whim, you take the shell with you as a souvenir.");
		MainScreen.text("\n\n(<b>Gained Key Item: Dragon Eggshell</b>)");
		player.createKeyItem("Dragon Eggshell", 0, 0, 0, 0);
		//(+5-10 to strength, toughness, and speed.)
		//(+20 Corruption)
		//(also slimefeed!)
		dynStats("str", 5 + rand(5), "tou", 5 + rand(5), "int", 5 + rand(5), "cor", 20);
		player.slimeFeed();
		doNext(camp.returnToCampUseOneHour);
	}


	//[Yes]
	public getSomeStuff(): void {
		MainScreen.clearText();
		MainScreen.text("Your mouth tightens in consternation, and you pull out the shell of the so-called 'dragon egg', passing it over and asking if she can use it.");
		MainScreen.text("\n\n\"<i>What is this?  An egg?  Eggs aren't much good for armor, cutie, no matter how big.  One good blow and POW!</i>\"  To demonstrate, she raises her hand, then strikes the shell with the blade of her palm - and pulls it away, smarting.  \"<i>My gods!  It's so hard!  Ok... maybe we can do this.</i>\"");
		MainScreen.text("\n\nShe turns the cracked shell over in her hands, then puts it into the fire and whacks at it with a pair of tongs, attempting to bend and break it.  \"<i>Ist not softening.  Tch, cannot make armor if I cannot shape it.  Vell, it iz nice und curved, ja?  It vill make a decent small-shield to deflect blows, if I sand ze edges down und fit some straps.</i>\"");
		MainScreen.text("\n\nYou tell the armorsmith that a shield will be fine, and she sets to work smoothing the edges.  After nearly an hour of idle browsing through armor you don't really care about, she attracts your attention.  \"<i>It's done, cutie.  Payment up front.</i>\"");
		MainScreen.text("\n\nHanding over the gems, you take the white shell back from her; true to her word, she's rounded it into a proper shield and fitted adjustable straps to the back.  Its hardness is indisputable, but you can only wonder if its liquid absorption properties are still intact.  Worth a test, right?");
		//this is where the Dragonshell Shield lives, git you one!
		player.stats.gems -= 200;
		statScreenRefresh();
		player.removeKeyItem("Dragon Eggshell");
		inventory.takeItem(weapons.DRGNSHL, telAdre.armorShop);
	}

	//Suggested Reward:
	//Dragonshell Shield: a 'weapon' that cannot be disarmed and has 0 attack, but boosts defense.  Has a chance to stun when attacking and has a high chance to block the effects of any 'fluid' attack (Such as Minotaur Cum, Potions, Sticky Web, Valeria Silence Goo, etc.) due to the shell's innate fluid absorption abilities.
	//sells for 100G
	//Block Effect Description: (Z)
	//You raise your shield and block the onrushing liquid.  The porous shell quickly absorbs the fluid, wicking it away to who-knows-where and rendering the attack completely useless.

	//[=Take=] (Z)
	private takeEmbersEggHomeInADoggieBag(): void {
		MainScreen.clearText();
		MainScreen.text("You decide to take the egg, figuring that perhaps this dragon could aid you in your quest.");
		//(If player is shorter than 7 feet)
		if (player.tallness < 84) MainScreen.text("  Lifting it isn't as much of a problem as you thought; it's surprisingly light.  It is, however, very big and very awkward to carry.");
		else MainScreen.text("  Between the egg's surprising lightness, and your own size and wide arms, you can easily carry the egg.");
		MainScreen.text("\n\nYou make it back to the strange corridor entrance... but when you attempt to cross over into the cave's opening, you feel the egg bump into something.  Alarmed, you quickly scan its surface.");
		MainScreen.text("\n\nThankfully, it seems to be intact; you put the egg down and try to roll it gently past the open cave mouth.  It bumps something again, something invisible. Then you recall the books' mention of some sort of ward protecting the egg; when you try to touch and feel the invisible ward however, your hand goes right through.  In fact you can cross this 'ward' easily, as if it weren't even there...  However, if you attempt to carry the egg, there is a solid barrier preventing it from passing through.");
		MainScreen.text("\n\nVexed, you decide to look around the egg chamber for another way out.");

		//(if PC has >= 50 int)
		if (player.stats.int >= 50) {
			MainScreen.text("\n\nYou feel electricity run down your spine as you pass by a far wall in the back of the cave; inspecting the wall, you quickly locate an odd rock.  When you pick it up, you realize it has some sort of inscription drawn all over the underside; figuring it's probably the source of the ward, you fling the rock at the far wall, shattering it into many pieces.");
			MainScreen.text("\n\nYou feel a small pulse of energy run through the chamber and into the corridor.  Running towards the entrance; you discover that you can easily remove the egg.  It begins to glow softly as you remove it from the cave; at first you take it for a trick of the light, but remember there isn't any in this damned dark swamp!");
		}
		//(else if PC has >= 90 str)
		else if (player.stats.str >= 90) {
			MainScreen.text("\n\nou look around over and over and over... but no matter how much you look, you don't see anything at all that could even resemble some kind of magic rune, or activation button, or anything that could disable the ward.  You groan in frustration.");
			MainScreen.text("\n\nWell, if there is no way out all you have to do is make one, right?  Using your immense strength, you break off a sturdy-looking stalagmite and begin striking the walls in hopes of breaking through or disabling the barrier.");
			MainScreen.text("\n\nIt takes a lot longer than you originally anticipated, but sure enough, soon you feel a small pulse of energy run through the chamber and into the corridor.  Running towards the entrance; you discover that you can easily remove the egg.  It begins to glow softly as you remove it from the cave; at first you take it for a trick of the light, but remember there isn't any in this damned dark swamp!");
		}
		else {
			MainScreen.text("\n\nYou look around over and over and over... but no matter how much you look you don't see anything at all that could even resemble some kind of magic rune, or activation button, or anything that could disable the ward.  You groan in frustration.");
			MainScreen.text("\n\nIt looks like you will have to leave the egg for now until you're better versed in magical methods... or strong enough to knock down a mountain!  You roll it back down the corridor into its shrine to prevent its being seen from the cave entrance.");
			//Same as taking the Leave option. Must find the egg again to take it.
			doNext(camp.returnToCampUseOneHour);
			return;
		}
		MainScreen.text("\n\n(<b>You have now begun the Mysterious Egg quest.  The Mysterious Egg is added to the <i>Items</i> at the Camp.</b>)");
		//set flags
		player.createKeyItem("Dragon Egg", 0, 0, 0, 0);
		Flags.list[FlagEnum.TOOK_EMBER_EGG] = 1;
		Flags.list[FlagEnum.EMBER_COR] = 50;
		doNext(camp.returnToCampUseOneHour);
	}


	//Modified Camp Description (Z)
	public emberCampDesc(): void {
		//Iz Ember an egg?
		if (Flags.list[FlagEnum.EMBER_HATCHED] == 0) MainScreen.text("\nThat mysterious egg that you brought back to the camp is sitting in the crude nest you made.\n");
		//NOT AN EGG! HAHA!
		else {
			let choice: number = rand(3);
			if (choice == 0) MainScreen.text("Ember is lying in front of " + emberMF("his", "her") + " excavated den, watching the camp and resting.  Every once in a while " + emberMF("his", "her") + " eyes dart in your direction, before " + emberMF("he", "she") + " quickly looks away.\n\n");
			else if (choice == 1) MainScreen.text("Ember doesn't seem to be around " + emberMF("his", "her") + " excavated den... it doesn't take long before Ember lands in front of it and then takes off again, apparently occupied with darting around in the sky for fun.\n\n");
			else MainScreen.text("Ember appears to be fighting to stay awake; sometimes " + emberMF("he", "she") + " falls into a doze, but quickly snaps back to consciousness.\n\n");
		}
	}

	//Followers Descriptor (Z)
	private emberFollowerDesc(): void {
		MainScreen.text("The mysterious egg you found in the cave sits in the grass nest you assembled for it; it is three feet tall and nearly two feet in circumference.  The nest itself isn't very pretty, but at least it's sturdy enough to keep the egg from rolling around.\n\n");
	}

	//How Ember should hatch
	//General Hatching Rules
	//Can only be hatched by using in masturbation.
	//Must use in masturbation or use items on egg at least five times before it can be hatched.
	//This means that even if 5 items are used on the egg, it won't hatch until the PC masturbates on it at least once.
	//Egg starts at 50 Corruption.

	//Items that change traits
	//Lactaid sets EmberMilk to 1.
	//Ovielixir sets EmberOviposition to 1.
	//Hair Ext. Serum increments EmberHair from 0 to 1, then to 2.
	//Blood is always presented as an option, PC will share their own blood with the egg setting EmberMonstergirl to 1. (Makes Ember more human looking.)

	//How to decide Ember's sex
	//Incubi's Draft, changes Egg's sex to male if its herm or has no sex, herm if it was female.
	//Succubi's Milk, changes Egg's sex to female if its herm or has no sex, herm if it was male.
	//If the PC uses the Sexless Egg in masturbation, sex is set to opposite PC's sex for male/female PCs and the same sex for herm PCs.

	//Egg's shell color changes based on sex:
	//White: Unsexed (initial color).
	//Blue:  Male
	//Pink:  Female
	//Purple: Herm

	//Modifying the Egg's Corruption
	//If PC uses the egg in masturbation, modify Egg's Corruption by +5 if the PC has Corruption >= 50, or -5 if the PC has <50 Corruption.

	//Normal Incubi's Draft, modify Corruption by +10
	//Normal Succubi's Milk, modify Corruption by +10

	//Purified Succubi's Milk, modify Corruption by -10
	//Purified Incubi's Draft, modify Corruption by -10

	//Enhanced Succubi's Milk, modify Corruption by +15
	//Enhanced Incubi's Draft, modify Corruption by +15

	//How to decide which Ember should hatch.

	//For now only Tainted Ember has been written so there's no need to track, but later more types of Ember may be hatched.
	//if Egg's Corruption is:
	//0-25	= Pure Ember is Born
	//26-74	= Tainted Ember is Born
	//75-100	= Corrupted Ember is Born

	//if EmberType has been altered, forget corruption. Hybrid forms have no corruption variants.

	//General Egg Interaction (Z)
	public emberEggInteraction(): void {
		MainScreen.clearText();
		MainScreen.text("You approach the egg you found in that illusion-concealed cave. Though the light continues to pulse with its heartbeat overtones, it still just sits there, doing nothing.");
		//(If the egg Corruption level is 0-25, aka \"<i>Pure</i>\")
		if (Flags.list[FlagEnum.EMBER_COR] <= 25) {
			MainScreen.text("  As you observe the egg, it glows with soft, metered pulses and you're overcome with a sense of calm and peace.  Watching them, you feel serene, as if untouched by this world's taint.");
		}
		//(else If the egg Corruption level is 26-74, aka \"<i>Tainted</i>\")
		else if (Flags.list[FlagEnum.EMBER_COR] <= 75) {
			MainScreen.text("  As you observe the egg, it glows with bright, gaudy pulses and you're overcome with a sense of arrogance and strength.  You feel somehow as if you could do anything, as if you were superior to everything, and no one could dare say otherwise.");
		}
		//(If the egg Corruption level is 75-100, aka \"<i>Corrupt</i>\")
		else {
			MainScreen.text("  As you observe the egg you realize what you had taken for its pulses are actually just its normal color; the egg is actually 'glowing' with a black light!  As you stare, mesmerized, you begin to consider the pleasing contrast that would result if you covered it in your ");
			if (player.gender == 0) MainScreen.text("cum, if you had any... ");
			else {
				if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("white ");
				else MainScreen.text("glistening girl-");
				MainScreen.text("cum... ");
			}
			MainScreen.text(" You stop yourself and shake your head.  Where did that thought come from?");
			dynStats("lus", 10 + player.stats.cor / 10);
		}
		//(If player has lust >= 33)
		if (player.stats.lust >= 33 && (Flags.list[FlagEnum.EMBER_EGG_FLUID_COUNT] < 5 || Flags.list[FlagEnum.EMBER_JACKED_ON] == 0)) {
			MainScreen.text("\n\nYou stare at the egg's rhythmic pulsations.  As you do, though, you realize the pattern of the pulses is starting to change.  It's becoming erratic, as if the egg were excited.  For some reason, you suddenly feel aroused, and the egg looks strangely inviting...");
			MainScreen.text("\n\nYou reach out and have the distinct impression of breathing... no, not breathing... panting.  It feels like the egg is panting, eager for something, and you find its eagerness infectious.  Placing a hand on the shell, you lean in and press your cheek to the surface, listening; the egg feels warm and throbs as it pulses... almost like a lover's chest just before you consummate your feelings for each other.  You have the strangest urge to do just that with this mysterious egg...");
			//(additionally to above, if the egg is about to hatch)
			if (Flags.list[FlagEnum.EMBER_EGG_FLUID_COUNT] == 4) {
				MainScreen.text("\n\nA feeling of exasperation fills you as well, as if you were almost finished achieving something, but lacked the last step necessary to complete it.");
			}
			//Do you give in to the urge?
			//[Yes][No]
			//[= Yes =]
			doYesNo(masturbateOntoAnEgg, dontEggFap);
			//(Use the appropriate Egg Masturbation scene.)
			return;
		}
		//(If player meets no other requirements)
		else {
			MainScreen.text("\n\nYou stare at the egg's pulsations as the rhythm shifts slightly.  You feel a tinge of excitement, a distant expectation not your own.  Though curious about what could be inside, you decide nothing more can be done for now.");
		}
		let fap: Function = null;
		if (player.stats.lust >= 33) fap = masturbateOntoAnEgg;
		let draft: Function = null;
		if (player.inventory.items.has(consumables.INCUBID)) draft = createCallBackFunction(useIncubusDraftOnEmber, false);
		let pDraft: Function = null;
		if (player.inventory.items.has(consumables.P_DRAFT)) pDraft = createCallBackFunction(useIncubusDraftOnEmber, true);
		let milk: Function = null;
		if (player.inventory.items.has(consumables.SUCMILK)) milk = createCallBackFunction(useSuccubiMilkOnEmber, false);
		let pMilk: Function = null;
		if (player.inventory.items.has(consumables.P_S_MLK)) pMilk = createCallBackFunction(useSuccubiMilkOnEmber, true);
		let hair: Function = null;
		if (player.inventory.items.has(consumables.EXTSERM)) hair = hairExtensionSerum;
		let ovi: Function = null;
		if (player.inventory.items.has(consumables.OVIELIX)) ovi = useOviElixerOnEmber;
		let lactaid: Function = null;
		if (player.inventory.items.has(consumables.LACTAID)) lactaid = useLactaidOnEmber;
		let hatch: Function = null;
		if (Flags.list[FlagEnum.EMBER_EGG_FLUID_COUNT] >= 5 && Flags.list[FlagEnum.EMBER_JACKED_ON] > 0 && Flags.list[FlagEnum.EMBER_GENDER] > 0) {
			hatch = hatchZeMuzzles;
			MainScreen.text("\n\n<b>The egg is ready to be hatched - if you're just as ready.</b>");
		}
		if (hatch != null) choices("Hatch", hatch, "Blood", giveEmberBludSausages, "IncubiDraft", draft, "Pure Draft", pDraft, "Succubi Milk", milk, "Pure Milk", pMilk, "Hair Serum", hair, "Ovi Elixir", ovi, "Lactaid", lactaid, "Back", leaveWithoutUsingAnEmberItem);
		else if (fap != null) choices("Masturbate", fap, "Blood", giveEmberBludSausages, "IncubiDraft", draft, "Pure Draft", pDraft, "Succubi Milk", milk, "Pure Milk", pMilk, "Hair Serum", hair, "Ovi Elixir", ovi, "Lactaid", lactaid, "Back", leaveWithoutUsingAnEmberItem);
		else choices("Hatch", hatch, "Blood", giveEmberBludSausages, "IncubiDraft", draft, "Pure Draft", pDraft, "Succubi Milk", milk, "Pure Milk", pMilk, "Hair Serum", hair, "Ovi Elixir", ovi, "Lactaid", lactaid, "Back", leaveWithoutUsingAnEmberItem);
	}

	//[= No =]
	private dontEggFap(): void {
		MainScreen.clearText();
		MainScreen.text("Shaking your head, confused and startled by these strange impulses, you step away for a moment. Once away from the egg, its pattern of pulsations returns to normal and you feel the urges disappear.");
		//If PC picks No and qualifies for item use, display the text below.
		//(If player has an item that is valid for application)
		let fap: Function = null;
		if (player.stats.lust >= 33) fap = masturbateOntoAnEgg;
		let draft: Function = null;
		if (player.inventory.items.has(consumables.INCUBID)) draft = createCallBackFunction(useIncubusDraftOnEmber, false);
		let pDraft: Function = null;
		if (player.inventory.items.has(consumables.P_DRAFT)) pDraft = createCallBackFunction(useIncubusDraftOnEmber, true);
		let milk: Function = null;
		if (player.inventory.items.has(consumables.SUCMILK)) milk = createCallBackFunction(useSuccubiMilkOnEmber, false);
		let pMilk: Function = null;
		if (player.inventory.items.has(consumables.P_S_MLK)) pMilk = createCallBackFunction(useSuccubiMilkOnEmber, true);
		let hair: Function = null;
		if (player.inventory.items.has(consumables.EXTSERM)) hair = hairExtensionSerum;
		let ovi: Function = null;
		if (player.inventory.items.has(consumables.OVIELIX)) ovi = useOviElixerOnEmber;
		let lactaid: Function = null;
		if (player.inventory.items.has(consumables.LACTAID)) lactaid = useLactaidOnEmber;
		let hatch: Function = null;
		if (Flags.list[FlagEnum.EMBER_EGG_FLUID_COUNT] >= 5 && Flags.list[FlagEnum.EMBER_JACKED_ON] > 0 && Flags.list[FlagEnum.EMBER_GENDER] > 0) hatch = hatchZeMuzzles;

		MainScreen.text("  The egg's rhythm suddenly changes; as if it were excited by something - something that you have brought near it.");
		MainScreen.text("\n\nYou start fishing through your pockets, holding up the various items you have; it doesn't react to some, while others make its flashes quicken.  These you set aside.  When you've finished testing the contents of your pouches, you look at the items the egg has selected.  As you rest your hand on the egg and consider your choices, it begins to excite once more, alarming you.  You pull away and it calms down... the egg considers <b>you</b> an item as well, apparently!");
		if (hatch != null) MainScreen.text("\n\n<b>The egg is ready to be hatched - if you're just as ready.</b>");

		if (hatch != null) choices("Hatch", hatch, "Blood", giveEmberBludSausages, "IncubiDraft", draft, "Pure Draft", pDraft, "Succubi Milk", milk, "Pure Milk", pMilk, "Hair Serum", hair, "Ovi Elixir", ovi, "Lactaid", lactaid, "Back", leaveWithoutUsingAnEmberItem);
		else if (fap != null) choices("Masturbate", fap, "Blood", giveEmberBludSausages, "IncubiDraft", draft, "Pure Draft", pDraft, "Succubi Milk", milk, "Pure Milk", pMilk, "Hair Serum", hair, "Ovi Elixir", ovi, "Lactaid", lactaid, "Back", leaveWithoutUsingAnEmberItem);
		else choices("Hatch", hatch, "Blood", giveEmberBludSausages, "IncubiDraft", draft, "Pure Draft", pDraft, "Succubi Milk", milk, "Pure Milk", pMilk, "Hair Serum", hair, "Ovi Elixir", ovi, "Lactaid", lactaid, "Back", leaveWithoutUsingAnEmberItem);
	}

	//Leave Without Using Item (Z)
	private leaveWithoutUsingAnEmberItem(): void {
		MainScreen.clearText();
		MainScreen.text("You shake your head; it would probably be best not to tamper with it. Returning the items to your pockets, you leave the egg alone.  As you put them away, the egg's glow slows down dramatically, almost as if it were feeling... disappointment?");
		doNext(inventory.inventoryMenu);
	}

	//Incubus Draft/Purified Incubus Draft (Z)
	private useIncubusDraftOnEmber(purified: boolean = false): void {
		MainScreen.clearText();
		if (purified) {
			player.inventory.items.consumeItem(consumables.P_DRAFT);
			Flags.list[FlagEnum.EMBER_COR] -= 10;
			if (Flags.list[FlagEnum.EMBER_COR] < 0) Flags.list[FlagEnum.EMBER_COR] = 0;
		}
		else {
			player.inventory.items.consumeItem(consumables.INCUBID);
			Flags.list[FlagEnum.EMBER_COR] += 10;
			if (Flags.list[FlagEnum.EMBER_COR] > 100) Flags.list[FlagEnum.EMBER_COR] = 100;
		}
		MainScreen.text("Uncorking the vial, you drizzle the slimy off-white fluid onto the pointed cone of the egg.  It oozes slowly across the surface, then seeps through the shell, leaving not a drop of moisture.");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3 || Flags.list[FlagEnum.EMBER_GENDER] == 0) {
			MainScreen.text("  The egg's shell slowly changes to a soft, pastel blue.");
			Flags.list[FlagEnum.EMBER_GENDER] = 1;
		}
		else if (Flags.list[FlagEnum.EMBER_GENDER] == 2) {
			MainScreen.text("   The egg's shell slowly changes to a lavender hue.");
			Flags.list[FlagEnum.EMBER_GENDER] = 3;
		}
		Flags.list[FlagEnum.EMBER_EGG_FLUID_COUNT]++;
		doNext(playerMenu);
	}

	//Succubi Milk/Purified Succubi Milk (Z)
	private useSuccubiMilkOnEmber(purified: boolean = false): void {
		MainScreen.clearText();
		if (purified) {
			player.inventory.items.consumeItem(consumables.P_S_MLK);
			Flags.list[FlagEnum.EMBER_COR] -= 10;
			if (Flags.list[FlagEnum.EMBER_COR] < 0) Flags.list[FlagEnum.EMBER_COR] = 0;
		}
		else {
			player.inventory.items.consumeItem(consumables.SUCMILK);
			Flags.list[FlagEnum.EMBER_COR] += 10;
			if (Flags.list[FlagEnum.EMBER_COR] > 100) Flags.list[FlagEnum.EMBER_COR] = 100;
		}
		MainScreen.text("Popping the cap off of the milk bottle, you pour the contents onto the egg - the porous shell soaks up the milk as fast as you dump it, spilling not a drop.");
		//(If Unsexed or Herm:
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3 || Flags.list[FlagEnum.EMBER_GENDER] == 0) {
			MainScreen.text("  The egg's shell slowly changes to a muted pink color.");
			Flags.list[FlagEnum.EMBER_GENDER] = 2;
		}
		//If Male:
		else if (Flags.list[FlagEnum.EMBER_GENDER] == 1) {
			MainScreen.text("  The egg's shell slowly changes to a lavender hue.");
			Flags.list[FlagEnum.EMBER_GENDER] = 3;
		}
		Flags.list[FlagEnum.EMBER_EGG_FLUID_COUNT]++;
		doNext(playerMenu);
	}

	//Ovi Elixir (Z)
	private useOviElixerOnEmber(): void {
		MainScreen.clearText();
		player.inventory.items.consumeItem(consumables.OVIELIX);
		//max uses 1
		MainScreen.text("Uncorking the crystalline bottle, you pour the strange green liquid inside onto the egg, briefly wondering what on earth it could want with this stuff, before catching your fallacy.  It's an egg, right?  It can't want things...  The fluid spills all over the shell, coating it, and then seeps inside, leaving the egg's previously pale surface marked with small green splotches.");
		Flags.list[FlagEnum.EMBER_OVIPOSITION] = 1;
		Flags.list[FlagEnum.EMBER_EGG_FLUID_COUNT]++;
		doNext(playerMenu);
	}

	//Lactaid (Z)
	private useLactaidOnEmber(): void {
		MainScreen.clearText();
		player.inventory.items.consumeItem(consumables.LACTAID);
		//max uses 1
		MainScreen.text("Feeling a little bemused, you pour the creamy fluid onto the egg.  It is absorbed through the shell, and a spiderwork of creamy yellow vein-like markings suddenly forms on the shell's surface.");
		Flags.list[FlagEnum.EMBER_MILK] = 1;
		Flags.list[FlagEnum.EMBER_EGG_FLUID_COUNT]++;
		doNext(playerMenu);
	}

	//Hair Extension Serum (Z)
	private hairExtensionSerum(): void {
		MainScreen.clearText();
		player.inventory.items.consumeItem(consumables.EXTSERM);
		//max uses 2
		MainScreen.text("Wondering at your motivations, you pour the goblin gunk onto the egg.  Most rolls harmlessly off of the shell, leaving you annoyed at the waste... until you see ");
		if (Flags.list[FlagEnum.EMBER_HAIR] == 0) {
			MainScreen.text("a narrow tiger-stripe pattern suddenly develop");
			Flags.list[FlagEnum.EMBER_HAIR] = 1;
		}
		else {
			MainScreen.text("the tiger-stripes multiply");
			Flags.list[FlagEnum.EMBER_HAIR] = 2;
		}
		MainScreen.text(" on the egg.");
		Flags.list[FlagEnum.EMBER_EGG_FLUID_COUNT]++;
		doNext(playerMenu);
	}

	//Your Blood (Z)
	private giveEmberBludSausages(): void {
		MainScreen.clearText();
		//max uses 2
		MainScreen.text("Examining your hand and the egg's reaction to it, you wonder if this is what the book meant by \"<i>sharing your essence</i>\".  Could be worth trying.  Wincing in pain as you bite the skin on your thumb, you smear the bloody digit along the surface of the egg, marking its exterior in crimson.  Shortly thereafter the blood is absorbed, leaving only a stain.  You wait expectantly for something else to happen");
		//[(0 prior),
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) {
			MainScreen.text(" but the egg just glows its excitement, as if it wanted still more.");
			Flags.list[FlagEnum.EMBER_INTERNAL_DICK] = 1;
		}
		else {
			MainScreen.text(", but nothing does.  How disappointing.");
			Flags.list[FlagEnum.EMBER_INTERNAL_DICK] = 0;
		}
		player.takeDamage(1);
		Flags.list[FlagEnum.EMBER_ROUNDFACE] = 1;
		//(Token HP Loss, can't drop below 1 HP.)
		player.takeDamage(10);
		Flags.list[FlagEnum.EMBER_EGG_FLUID_COUNT]++;
		doNext(playerMenu);
	}

	//Masturbate Onto the Egg (Z)
	//Genderless Version (Z)
	private masturbateOntoAnEgg(): void {
		MainScreen.clearText();
		if (player.gender == 0) {
			MainScreen.text("The light pulses decrease in speed as you disrobe and expose your bare crotch, leaving you disappointed after summoning your perversity to bring you this far.  You feel as if you've let it down somehow...  This is confusing!  You decide to go away and deal with this fickle egg another time.");
			doNext(camp.returnToCampUseOneHour);
			return;
		}
		//Nothing changes. PC can go do something else, lose no time.
		//Male Version (Z)
		if (player.gender == 1) {
			MainScreen.text("The light of the egg pulses rapidly, throwing strange illumination and shadow over your form as you hastily peel off your [armor], too far gone to recognize the absurdity.  Your heart is racing so fast with excitement, lust, anticipation... it actually matches the tempo of the pulses from the egg, when you care to notice.");
			MainScreen.text("\n\nGrabbing your [cock] in your hands, you stand in front of the egg, ");
			if (player.lowerBody.cockSpot.count() <= 2) MainScreen.text("pumping vigorously.");
			else MainScreen.text("wrangling all your shafts together into one awkward bouquet of male organs and furiously stroking and squeezing them as best you can manage");
			MainScreen.text(".  The egg's pulsations lure you on, coaxing you to squeeze, pull, thrust, and massage " + CockDescriptor.describeMultiCockSimpleOne(player) + " as best you can.  Harder and faster you go, feeling the churning ache from deep inside you.  Finally, with a cry of release, you unleash a ");
			if (player.cumQ() < 100) MainScreen.text("trickle");
			else if (player.cumQ() <= 500) MainScreen.text("stream");
			else if (player.cumQ() <= 1000) MainScreen.text("gout");
			else MainScreen.text("wave");
			MainScreen.text(" of cum onto the egg.");
			MainScreen.text("\n\nPanting, you stare at what you have unleashed.  Before your eyes, the pulsations come with incredible rapidity as your sexual fluid literally seeps into the egg's shell.  Then, when every drop has been drunk, the light resumes its normal rhythm.");
			//(If the egg has no sex)
			if (Flags.list[FlagEnum.EMBER_GENDER] == 0) {
				MainScreen.text("\n\nThe egg's shell changes color, from white to muted pink.");
				Flags.list[FlagEnum.EMBER_GENDER] = 2;
			}
			MainScreen.text("\n\nYou look at the egg's surface in amazement and examine it for any trace of cum; when you touch the shell, you feel a strange feeling emanate from the egg; a feeling of satisfaction and fulfillment.  Whatever life-force exists inside that egg may have been strengthened by your... contribution.  You can't help but wonder what the creature inside is.");
		}
		//Female Version (Z)
		else if (player.gender == 2) {
			MainScreen.text("The light of the egg pulses rapidly, throwing strange illumination and shadow over your form as you hastily peel off your [armor], too far gone to recognize the absurdity.  Your heart is racing so fast with excitement, lust, anticipation... it actually matches the tempo of the pulses from the egg, when you care to notice.");
			MainScreen.text("\n\nUnthinkingly, you walk up the egg; your [vagina] burns to be used.  Wrapping your arms around it and squatting down, you begin to rub your crotch against its warm, hard surface.  The texture is unlike anything you've used before, and you moan with pleasure as your juices begin to flow, slicking the eggshell.  Harder you press against it, grinding into the unyielding surface, up and down, faster and faster.  The sensation of the shell scraping against your needy netherlips only fills you with excitement; this is like no toy you've ever used before.  Briefly you think that may be because it's no toy at all, but the thought evaporates as you make your next stroke.  Harder and faster you buck and writhe, screaming your excitement and delight until, finally, your [vagina] spasms and a ");
			if (player.lowerBody.vaginaSpot.get(0).vaginalWetness <= 3) MainScreen.text("few drops");
			else if (player.lowerBody.vaginaSpot.get(0).vaginalWetness < 5) MainScreen.text("squirt");
			else MainScreen.text("torrent");
			MainScreen.text(" of girlcum jumps from your pussy onto the egg.");
			MainScreen.text("\n\nReleasing its surface and panting with the exertion, you step back, your legs wobbly for a few moments.  You stare at what you have unleashed.  Before your eyes, the pulsations come with incredible rapidity as your sexual fluid literally seeps into the egg's shell.  Then, when every drop has been drunk, the light resumes its normal rhythm.");
			//(If the egg has no sex)
			if (Flags.list[FlagEnum.EMBER_GENDER] == 0) {
				Flags.list[FlagEnum.EMBER_GENDER] = 1;
				MainScreen.text("\n\nYou stare in curiosity as the egg's shell changes color, from white to pale blue.");
			}
			MainScreen.text("\n\nYou look at the egg's surface in amazement and examine it for any trace of cum; when you touch the shell, you feel a strange feeling emanate from the egg; a feeling of satisfaction and fulfillment.  Whatever life-force exists inside that egg may have been strengthened by your... contribution.  You can't help but wonder what the creature inside is.");
		}
		else {
			//Herm Version (Z)
			MainScreen.text("The light of the egg pulses rapidly, throwing strange illumination and shadow over your form as you hastily peel off your [armor], too far gone to recognize the absurdity.  Your heart is racing so fast with excitement, lust, anticipation... it actually matches the tempo of the pulses from the egg, when you care to notice.");
			MainScreen.text("\n\nTormented by the need in both your " + CockDescriptor.describeMultiCockShort(player) + " and your [vagina], you awkwardly straddle the egg's upper surface, allowing you to grind your netherlips against its shell and stroke [eachCock] at the same time.  It is an awkward, herky-jerky act, struggling to avoid falling off... but the sensation so makes up for it.  Your [vagina] slides and grinds against the egg's hard, unyielding shell as your hand tugs and pulls ");
			if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("your [cock]");
			else MainScreen.text("as many of your cocks as you can manage to grab without falling off");
			MainScreen.text(".  Finally, relentlessly, inexorably, you cum, spraying your semen into the air to spatter back onto the egg, mixing with the girlish juices from your netherlips to soak into the egg's surface, leaving it slick with your mixed sexual fluids.");
			MainScreen.text("\n\nIt's no wonder that you finally lose your battle and slip off, landing hard on your back.  You lay there, gasping for air, and are only just starting to breathe normally again when you see what is happening to the egg.  Before your eyes, the pulsations come with incredible rapidity as your sexual fluid literally seeps into the egg's shell.  Then, when every drop has been drunk, the light resumes its normal rhythm.");
			//(If the egg has no sex)
			if (Flags.list[FlagEnum.EMBER_GENDER] == 0) {
				Flags.list[FlagEnum.EMBER_GENDER] = 3;
				MainScreen.text("\n\nYou stare as the egg's shell changes color, from white to lavender.");
			}
			MainScreen.text("\n\nYou look at the egg's surface in amazement and examine it for any trace of cum; when you touch the shell, you feel a strange feeling emanate from the egg; a feeling of satisfaction and fulfillment.  Whatever life-force exists inside that egg may have been strengthened by your... contribution.  You can't help but wonder what the creature inside is.");
		}
		//(If egg has been fed at least once but not enough)
		if (Flags.list[FlagEnum.EMBER_EGG_FLUID_COUNT] < 5) {
			MainScreen.text("\n\nYou note the egg emanates a feeling of greater satisfaction than before, but still not enough. Maybe it will hatch if you feed it more?");
		}
		player.orgasm();
		player.stats.sens += -1;
		//MAKE SURE EMBER HAS BEEN JACKED ON FLAG IS SET TO TRUE
		Flags.list[FlagEnum.EMBER_JACKED_ON] = 1;
		//INCREMENT EMBER FEEDINZ
		Flags.list[FlagEnum.EMBER_EGG_FLUID_COUNT]++;
		doNext(camp.returnToCampUseOneHour);
	}

	//HATCH DAT BITCH
	private hatchZeMuzzles(): void {
		MainScreen.clearText();
		MainScreen.text("Resting bonelessly on the ground and re-examining the motivations that led up to cumming on the strange egg, you are startled when it shines brilliantly.  Then just as suddenly, it goes dark.  Unnerved, you creep over to your erstwhile sextoy to examine it.  As you lean in, a very slight trembling manifests itself in the egg.  Cracking, breaking noises fill the air as tiny fractures begin to show across the egg's surface.  Warned just in time by them, you turn your face away and cover your head as the shell erupts into a cloud of tiny fragments!  As you huddle against the storm of eggshell shards, you hear a loud roar.");
		MainScreen.text("\n\nLifting your head, you find the egg gone; in its place is an unfamiliar figure wrapped in thin wisps of ");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 0) MainScreen.text("white ");
		else if (Flags.list[FlagEnum.EMBER_GENDER] == 1) MainScreen.text("blue ");
		else if (Flags.list[FlagEnum.EMBER_GENDER] == 2) MainScreen.text("pink ");
		else MainScreen.text("purple ");
		MainScreen.text("dust.");
		//FURRAH
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) {
			//Male Anthro (Z)
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1) {
				MainScreen.text("\n\nIt's huge, standing 7 feet tall at the very least.  Its build is lean and slender, with powerful arms and legs that end in reptilian claws, complete with splay-toed feet capped by menacing talons.");
				MainScreen.text("\n\nLeathery reptilian wings grow from its back, and the creature reveals their impressive span as it tests and stretches them.  The wings are comprised of taut, thin membranes; scaly flesh stretched between prominent bone struts.  A reptilian muzzle replete with sharp teeth fit for a predator graces the world, and a large ebony horn curves around and forward from either temple.");
				MainScreen.text("\n\nA long tongue, long as a whip, slips out from within its jaws to lick its clawed hands and then vanishes back into its mouth with lightning speed.  Prideful, fierce eyes stare at you, with slit pupils and burning orange irises that glitter and shine even in the darkness.");
				MainScreen.text("\n\nThe creature is covered from head to toe in prominent, shield-shaped scales.  Its dorsal scales are silver and reflect light, while its underbelly is a golden color, giving it a regal appearance.");
				//(If Ember lactates)
				if (Flags.list[FlagEnum.EMBER_MILK] > 0) MainScreen.text("\n\nYour eyes set upon its chest, where perky, dribbling nipples jut from the breasts resting there.  You size the creature as roughly an F-cup.");
				//(Otherwise)
				else MainScreen.text("\n\nYour eyes set upon its chest, where perky nipples jut from between small, aureate ventral scales.");
				//[(libido check)
				if (player.stats.lib >= 50) MainScreen.text("\n\nUnthinkingly, your eyes wander next to");
				else MainScreen.text("\n\nSurreptitiously, you sneak a peek at");
				MainScreen.text(" the monster's crotch; there, a deceptively small slit in the flesh suddenly disgorges a 16-inch penis unlike anything you've ever seen before, bearing a rounded, elongated head and a series of ridges that give it an almost segmented look.  A pair of apple-sized balls drop into place under it.  He is most definitely male");
				if (Flags.list[FlagEnum.EMBER_MILK] > 0) MainScreen.text(", drooling nipples notwithstanding");
				MainScreen.text(".");
			}
			//Female Anthro (Z)
			else if (Flags.list[FlagEnum.EMBER_GENDER] == 2) {
				MainScreen.text("\n\nIt's huge, standing 7 feet tall at the very least.  Its build is lean and slender, with powerful arms and legs that end in reptilian claws, complete with splay-toed feet capped by menacing talons.");
				MainScreen.text("\n\nLeathery reptilian wings grow from its back, and the creature reveals their impressive span as it tests and stretches them.  The wings are comprised of taut, thin membranes; scaly flesh stretched between prominent bone struts.  A reptilian muzzle replete with sharp teeth fit for a predator graces the world, and a large ebony horn curves around and forward from either temple.");
				MainScreen.text("\n\nA long tongue, long as a whip, slips out from within its jaws to lick its clawed hands and then vanishes back into its mouth with lightning speed.  Prideful, fierce eyes stare at you, with slit pupils and burning orange irises that glitter and shine even in the darkness.");
				MainScreen.text("\n\nThe creature is covered from head to toe in prominent, shield-shaped scales.  Its dorsal scales are silver and reflect light, while its underbelly is a golden color, giving it a regal appearance.");
				MainScreen.text("\n\nYour eyes set upon its chest, where perky nipples jut from the breasts resting there.  You size the creature as roughly an F-cup.");
				//[(libido check)
				if (player.stats.lib >= 50) MainScreen.text("\n\nUnthinkingly, your eyes wander to");
				else MainScreen.text("\n\nSurreptitiously, you sneak a peek at");
				MainScreen.text(" the monster's crotch; there, you see that the fine scales actually separate to reveal a slick-looking pussy.  She's clearly a female, with no noteworthy 'additions' that you can see.");
			}
			//Herm Anthro (Z)
			else {
				MainScreen.text("\n\nIt's huge, standing 7 feet tall at the very least.  Its build is lean and slender, with powerful arms and legs that end in reptilian claws, complete with splay-toed feet capped by menacing talons.");
				MainScreen.text("\n\nLeathery reptilian wings grow from its back, and the creature reveals their impressive span as it tests and stretches them.  The wings are comprised of taut, thin membranes; scaly flesh stretched between prominent bone struts.  A reptilian muzzle replete with sharp teeth fit for a predator graces the world, and a large ebony horn curves around and forward from either temple.");
				MainScreen.text("\n\nA long tongue, long as a whip, slips out from within its jaws to lick its clawed hands and then vanishes back into its mouth with lightning speed.  Prideful, fierce eyes stare at you, with slit pupils and burning orange irises that glitter and shine even in the darkness.");
				MainScreen.text("\n\nThe creature is covered from head to toe in prominent, shield-shaped scales.  Its dorsal scales are silver and reflect light, while its underbelly is a golden color, giving it a regal appearance.");
				MainScreen.text("\n\nYour eyes set upon its chest, where perky nipples jut from the breasts resting there.  You size the creature as roughly an F-cup.");
				if (player.stats.lib >= 50) MainScreen.text("\n\nUnthinkingly, your eyes wander to ");
				else MainScreen.text("\n\nSurreptitiously, you sneak a peek at ");
				MainScreen.text("the monster's crotch; there, you see the scales part in two places.  The lower opening is unmistakably a pussy; but from the slit just above it suddenly distends a 16-inch penis unlike anything you've ever seen before, bearing a rounded, elongated head and a series of ridges that give it an almost segmented look.  Beneath it, a pair of apple-sized balls fall into place heavily, leaving you no doubt that she is a hermaphrodite.");
			}
		}
		//Boring version
		else {
			//Male Monstergirl (Z)
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1) {
				MainScreen.text("\n\nYour first impression is of a humanoid figure, but a closer look reveals some very non-human traits.  While parts of it are covered in olive-hued skin, the rest glints with silvery, reptilian scales.  It stands taller than any human, easily over 7 feet, and even from here you can see huge draconic wings, a pair of long, ebony-black horns, and a lashing, scaled tail.  Reptilian eyes literally glow a fiery orange as they stare warily at you.");
				MainScreen.text("\n\nThe figure is masculine in appearance, with the features of a strong, defined musculature.  There is a certain androgyny in his build");
				if (Flags.list[FlagEnum.EMBER_MILK] > 0 || Flags.list[FlagEnum.EMBER_HAIR] > 0) MainScreen.text(", complete with ");
				if (Flags.list[FlagEnum.EMBER_MILK] > 0) {
					MainScreen.text("huge breasts, easily F-cups");
					if (Flags.list[FlagEnum.EMBER_HAIR] > 0) MainScreen.text(" and ");
				}
				if (Flags.list[FlagEnum.EMBER_HAIR] > 0) MainScreen.text("long, feminine locks of hair");
				MainScreen.text(", but his maleness is undeniable.  Especially when you spot ");
				if (Flags.list[FlagEnum.EMBER_INTERNAL_DICK] > 0) MainScreen.text("the slit in his pelvis that disgorges a foot and a half-long inhuman penis");
				else MainScreen.text("a foot and a half long human penis that sways between his legs");
				MainScreen.text(", completed by apple-size nuts held inside a fleshy sack.");
			}
			//Female Monstergirl (Z)
			else if (Flags.list[FlagEnum.EMBER_GENDER] == 2) {
				MainScreen.text("\n\nYour first impression is of a humanoid figure, but a closer look reveals some very non-human traits.  While parts of it are covered in olive-hued skin, the rest glints with silvery, reptilian scales.  It stands taller than any human, easily over 7 feet, and even from here you can see huge draconic wings, a pair of long, ebony-black horns, and a lashing reptilian tail. Reptilian eyes literally glow a fiery orange as they stare warily at you.");
				MainScreen.text("\n\nThe figure is feminine in appearance, with graceful, well-toned curves.  Her form is delightful, giving her a silhouette that any woman back in Ingnam would kill for; huge, soft breasts adorn her chest.  Down below you see a taut belly, a handful of rounded butt, and feminine thighs that draw your attention with every move... and in-between those wonderful thighs you see an inviting, human-looking slit; some moisture has gathered, giving it a slick look that just begs for attention.");
			}
			//Herm Monstergirl (Z)
			else {
				MainScreen.text("\n\nYour first impression is of a humanoid figure, but a closer look reveals some very non-human traits.  While parts of it are covered in olive-hued skin, the rest glints with silvery, reptilian scales.  It stands taller than any human, easily over 7 feet, and even from here you can see huge draconic wings, a pair of long, ebony-black horns, and a lashing reptilian tail. Reptilian eyes literally glow a fiery orange as they stare warily at you.");
				MainScreen.text("\n\nThe figure seems feminine at first glance; beautifully feminine features, a delightfully curvaceous build, and huge breasts atop her chest.  However, looking between her legs reveals a very unladylike extra feature; dangling over a vaginal slit, she has a ");
				if (Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 0) MainScreen.text("huge, human prick");
				else MainScreen.text("huge inhuman cock hanging from some kind of internal sheath");
				MainScreen.text(" and apple-size nuts held inside a fleshy sack slung under - the ensemble hangs nearly level with her knees.  She... or he? is obviously a hermaphrodite.");
			}
		}
		//Aftermath (Z)
		doNext(meetEmberAftermath);
	}

	//Aftermath (Z)
	private meetEmberAftermath(): void {
		MainScreen.clearText();
		MainScreen.text("You can only stand there and stare at this strange creature, supposedly a dragon, for what feels like hours.");
		MainScreen.text("\n\nIt's the first to break the silence, frowning at you.  \"<i>Who are you?  Where am I?</i>\" it inquires, growling.");
		MainScreen.text("\n\nCurious, it speaks your language... might as well consider the ice broken.  You introduce yourself, telling the creature that you helped it hatch from the egg.");
		MainScreen.text("\n\nIt relaxes a bit.  \"<i>E-Egg?  Oh, yes.  That.  Since you say you helped me, I guess I should introduce myself...</i>\  You wait patiently, but all the creature really does is stare down at the ground, apparently struggling to recall its name.  \"<i>The Last Ember of Hope; that's what my mind tells me.  I assume your kind, like the others, will have trouble with a name longer than one word, so I shall allow you to address me as \'Ember\'.  As you can see, I am...</i>\" it pauses, spreading its arms and wings in a showy flourish.  \"<i>... The last of the great dragons!</i>\"  It waves you off and starts walking away.  \"<i>Now, let's see what sort of place I'll be calling my own... </i>\"");
		MainScreen.text("\n\nYou watch the newly hatched dragon, poking its nose into everything that catches its eye, and sigh softly as it starts to burrow into a small elevation in the cracked ground.  Going to be a difficult one, it seems.  Still, it doesn't seem to be some kind of sex-crazed monster like the other weird natives you've met thus far.  Maybe the two of you can help each other?");
		MainScreen.text("\n\n(<b>Ember has been gained as a follower!</b>)");
		Flags.list[FlagEnum.EMBER_HATCHED] = 1;
		player.removeKeyItem("Dragon Egg");
		doNext(camp.returnToCampUseOneHour);
	}

	//Appearance (shows Ember's appearance, always available)
	private embersAppearance(): void {
		MainScreen.clearText();
		MainScreen.text(images.showImage("ember-examine-appearance"));
		//Anthro Ember's Appearance (Z)
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) {
			MainScreen.text("Ember is a 7' 3\" tall humanoid dragon, with supple, long limbs and a build that is toned and athletic, with powerful underlying muscles.  " + emberMF("He", "She") + " looks strong and imposing, but ");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1) MainScreen.text(" not overly muscled.");
			else MainScreen.text(" feminine.");

			//(Male)
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1) {
				MainScreen.text("\n\nEmber's body is the perfect picture of a healthy male.  Not underweight or overweight, but with just the perfect amount of fat that, excepting the");
				if (Flags.list[FlagEnum.EMBER_MILK] > 0) MainScreen.text(" dribbling breasts,");
				MainScreen.text(" snout, wings, and horns, gives him the silhouette of a prince from your village's stories: dashing and handsome.");
			}
			//(Female/Herm)
			else {
				MainScreen.text("\n\nEmber's body is a curvy thing, not rough like you'd expect from a reptilian creature, but rounded and almost soft-looking, with a taut belly and a perfect hourglass figure, giving " + emberMF("him", "her") + " the silhouette of an amazon from your village's histories: beautiful but powerful.  Excepting the wings and horns, of course.");
			}
			MainScreen.text("\n\nThe dragon scorns clothing and exposes " + emberMF("him", "her") + "self to both you and the elements with equal indifference, claiming " + emberMF("his", "her") + " scales are all the covering " + emberMF("he", "she") + " needs... and yet when you admire " + emberMF("his", "her") + " body, " + emberMF("he", "she") + " is quick to hide it from your wandering gaze.");
			MainScreen.text("\n\n" + emberMF("His", "Her") + " head is reptilian, with sharp teeth fit for a predator and strong ridges on the underside of the jaw.  At the sides of " + emberMF("his", "her") + " head are strange, fin-like growths concealing small holes; you presume these to be the dragon equivalent of ears.  Atop " + emberMF("his", "her") + " head sit a pair of ebony horns that curve backwards elegantly; despite being as tough as steel, their shape is not fit for use in combat, instead it is simply aesthetical, giving Ember a majestic look.  A long tongue occasionally slips out, to lick at " + emberMF("his", "her") + " jaws and teeth.  Prideful, fierce eyes, with slit pupils and burning orange irises, glitter even in the darkness.");
			//(if Ember has any hair)
			if (Flags.list[FlagEnum.EMBER_HAIR] == 1) {
				if (Flags.list[FlagEnum.EMBER_GENDER] == 1) MainScreen.text("  Short ");
				else MainScreen.text("  Shoulder-length ");
				MainScreen.text("steel-gray hair sprouts from " + emberMF("his", "her") + " head.  You'd think that a dragon with hair would look weird, but it actually compliments Ember's looks very well.");
			}
			//(if Ember has a level 2 mane)
			else if (Flags.list[FlagEnum.EMBER_HAIR] == 2) {
				MainScreen.text("  Tracing " + emberMF("his", "her") + " spine, a mane of hair grows; starting at the base of " + emberMF("his", "her") + " neck and continuing down " + emberMF("his", "her") + " tail, ending on the tip of " + emberMF("his", "her") + " tail in a small tuft.  It is the same color as the hair on " + emberMF("his", "her") + " head, but shorter and denser; it grows in a thick vertical strip, maybe two inches wide.  It reminds you vaguely of a horse's mane.");
			}
			MainScreen.text("\n\n" + emberMF("His", "Her") + " back supports a pair of strong, scaly dragon wings, covered in membranous leathery scales.  The muscles are held taut, as though ready to extend and take to the skies at any notice.");

			//(Male)
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1) MainScreen.text("\n\nHis hips are normal-looking, not demanding any kind of extra attention.  His butt is taut and firm, lending itself well to balance.");
			//(Female/Herm)
			else MainScreen.text("\n\nHer girly hips are as eye-catching as the shapely handful that graces her posterior, giving Ember a graceful strut.  That same delightful butt of hers just begs to be touched, soft enough to jiggle only slightly and yet firm enough to not trouble the dragon's balance.");

			MainScreen.text("\n\nA long, scaly, flexible tail lashes behind " + emberMF("him", "her") + ", its final third adorned with small bumps that can extend into vicious-looking spikes.  " + emberMF("His", "Her") + " legs appear humanoid until the feet, where they end in powerful, taloned reptilian claws meant for gripping at the ground.");

			MainScreen.text("\n\nEmber is covered from head to toe in shield-shaped scales.  " + emberMF("His", "Her") + " dorsal scales are silver and reflect the light well, while " + emberMF("His", "Her") + " underbelly is a rich golden color that stands in stark contrast.  These metallic-colored scales are large and prominent on Ember's back and the exterior of " + emberMF("his", "her") + " limbs, but, on " + emberMF("his", "her") + " face, the interior of " + emberMF("his", "her") + " limbs and the front of " + emberMF("his", "her") + " body, they are very small and fine, giving them a smooth and silken texture.");

			MainScreen.text("  The ");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text("little ");
			MainScreen.text("exposed flesh of Ember's body is a light shade of pink; but flushes when " + emberMF("he", "she") + "'s aroused, drawing your eyes towards " + emberMF("his", "her") + " most sexual parts.");

			switch (pregnancy.event) {
				case 2: MainScreen.text("  At the moment there's a slight pudgyness to her golden belly.");
					break;
				case 3: MainScreen.text("  Her golden belly is a little larger and firmer than usual.");
					break;
				case 4:
				case 5: MainScreen.text("  Her golden belly has grown quite a bit.  Ember often rests her hand on it, especially when she sees you looking at it.");
					break;
				case 6: MainScreen.text("  Her large pregnant belly has forced Ember to change her posture.  It looks like she has a big golden bullseye painted on her stomach.  Ember looks tired but happy.");
					break;
				case 7: MainScreen.text("  Her swollen belly is as large as that of any pregnant woman you can remember from Ingnam and you " + (Flags.list[FlagEnum.EMBER_OVIPOSITION] > 0 ? "can easily make out the egg's outline under her golden skin" : "occasionally see movement as the baby shifts in Ember's womb") + ".");
					break;
				case 8:
				case 9: MainScreen.text("  Ember's golden belly is stretched taut by the large " + (Flags.list[FlagEnum.EMBER_OVIPOSITION] > 0 ? "egg" : "baby") + " in her womb.  You're sure she'll give birth very soon, there just isn't room for the " + (Flags.list[FlagEnum.EMBER_OVIPOSITION] > 0 ? "egg" : "baby") + " to grow any larger.");
					break;
				default:
			}

			//(Ember breast check)
			MainScreen.text("\n\nSituated upon " + emberMF("his", "her") + " chest are a pair of ");
			if (Flags.list[FlagEnum.EMBER_MILK] > 0 || Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("F-cup soft, pillowy breasts");
			else MainScreen.text("flat manly pecs");
			MainScreen.text(" covered in fine scales excepting " + emberMF("his", "her") + " areolas; 0.5 inch nipples protrude from the center of the ");
			if (Flags.list[FlagEnum.EMBER_MILK] > 0 || Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("generous mounds");
			else MainScreen.text("masculine pectorals");
			MainScreen.text(".");

			//(If Ember has a penis)
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) {
				MainScreen.text("\n\nHanging from " + emberMF("his", "her") + " crotch, where it emerges from a slit leading to the interior of " + emberMF("his", "her") + "r pelvic cavity, is a 16 inch-long, two-inch wide penis with a shape unlike any other that you've seen so far in this realm.");
				MainScreen.text("\n\nThe head is rounded and elongated, while the shaft has a series of ridges, evenly spaced and so prominent as to give it an almost segmented appearance. When fully extended; a pair of apple-sized testicles drops out of " + emberMF("his", "her") + " genital slit.");
			}
			//(If Ember has a vagina)
			if (Flags.list[FlagEnum.EMBER_GENDER] == 2 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("\n\nThe scales in-between Ember's legs are particularly smooth and fine, and part just enough to reveal the insides of her slick pussy; soft, inviting and moist.");

			MainScreen.text("\n\nAt first Ember puffs " + emberMF("his", "her") + " chest in pride at your obvious appreciation of " + emberMF("his", "her") + " form, letting you examine " + emberMF("him", "her") + " as closely as you want, but after a minute " + emberMF("he", "she") + " starts blushing in both arousal and embarrassment, eventually covering " + emberMF("him", "her") + "self and blurting out, \"<i>That's enough looking!</i>\"");
			MainScreen.text("\n\n" + emberMF("His", "Her") + " reaction to your staring is kind of cute, actually.  " + emberMF("His", "Her") + " swaying tail and small fidgets let you know that " + emberMF("he", "she") + " actually might've been enjoying " + emberMF("him", "her") + "self a bit too much...");
		}
		//Dragon-girl Appearance (By Radar) (Z)
		else {
			//Credit him with additional scenes.
			MainScreen.text("Ember is a 7' 3</i>\" tall ");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1) MainScreen.text("male");
			else if (Flags.list[FlagEnum.EMBER_GENDER] == 2) MainScreen.text("female");
			else MainScreen.text("hermaphrodite");
			MainScreen.text(" dragon-" + emberMF("boy", "girl") + ", with slender limbs and a thin frame; " + emberMF("he", "she") + " refuses to wear any kind of clothing and exposes " + emberMF("him", "her") + "self naturally to the world.  " + emberMF("He", "She") + " sports a rather human looking face, but with several key differences.  Where a normal set of human eyes would be located, instead a pair of orange, reptilian eyes stares back at you, filled with immeasurable pride and ferocity.");
			MainScreen.text("\n\nOn the sides of " + emberMF("his", "her") + " face, you spot an exotic pattern of dragon scales that are intertwined with " + emberMF("his", "her") + " olive, human like skin, which branch down " + emberMF("his", "her") + " neck and shoulders before merging with " + emberMF("his", "her") + " predominantly scaled body.  Like the dragons from your village lore, Ember sports a pair of ebony, draconic horns that emerge from " + emberMF("his", "her") + " temples, boldly curved backwards past " + emberMF("his", "her") + " scalp.  While you aren't certain of their rigidity, they look like they could deflect most overhead attacks.  Drawn to " + emberMF("his", "her") + " jaw, you zero in on an attractive pair of pink, human lips.  The calm appearance of " + emberMF("his", "her") + " mouth almost makes you forget the many sharp teeth that Ember sports, which could easily rend flesh from a body if Ember put " + emberMF("his", "her") + " mind to it.");
			MainScreen.text("\n\nThe shiny, silver hair that coiffures the dragon's head compliments " + emberMF("his", "her") + " facial features well and ");
			//Short:
			if (Flags.list[FlagEnum.EMBER_HAIR] < 1) MainScreen.text("is quite short, giving " + emberMF("him", "her") + " that definitive " + emberMF("masculine", "tomboy") + " look.");
			else MainScreen.text("drops down to " + emberMF("his", "her") + " shoulders, giving " + emberMF("him", "her") + " the look of the " + emberMF("handsome", "beautiful") + " warriors from your village legends.");

			MainScreen.text("\n\n" + emberMF("His", "Her") + " chest is also human in appearance and houses a pair of ");
			if (Flags.list[FlagEnum.EMBER_MILK] > 0 || Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("F-cup breasts that support 0.5 inch nipples and hang heavily; you idly wonder if " + emberMF("he", "she") + "'ll develop lower back problems as she spends more time in Mareth");
			else MainScreen.text("manly pectorals with 0.5 inch nipples");
			MainScreen.text(".  Just below " + emberMF("his", "her") + " collarbone, in the middle of " + emberMF("his", "her") + " chest, you see what looks like a small, golden, heart-shaped scale; adorning the chest like a birthmark of some sort.");

			MainScreen.text("\n\nAs you stare down at Ember's stomach, you note that the human-looking layer of flesh ends and the scaly dragon skin begins.  Still humanoid in shape, you can make out the " + emberMF("masculine", "feminine") + " features of Ember's belly and lower torso well enough.");

			MainScreen.text("\n\nThis layer of scaling extends to " + emberMF("his", "her") + " back as well, albeit without any patches of human skin.  A fine stripe of white mane adorns Ember's spine and catches your eye.  The leathery wings that jut out of Ember's back around them only add to the fierce appearance of " + emberMF("his", "her") + " body, and look like they could easily propel their owner into the air.");

			MainScreen.text("\n\nEmber has, in most respects, a rather human-looking pelvis.");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) {
				if (Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 0) MainScreen.text("  " + emberMF("He", "She") + " sports a flaccid penis and a pair of apple-sized balls that sit dangerously exposed to the elements, let alone to naked blades or a heavy blow.  Yet " + emberMF("he", "she") + " doesn't seem concerned about that in the least, almost daring anyone to focus on them.  While " + emberMF("he", "she") + " isn't aroused right now, Ember's penis can reach a length of approximately 16 inches, and it looks to be about 2 inches thick.");

				else MainScreen.text("  " + emberMF("He", "She") + " sports what looks like a protective slit of some sort, protecting " + emberMF("his", "her") + " dick from the elements as well as stray blows.  You can't see it right now; but you remember it to be about 16 inches long and 2 inches thick.");
			}
			//Ember has a pussy:
			if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("  The inviting lips of a human-looking pussy purse between her legs; some moisture seems to have gathered on her labia, giving it a slick look that just begs for attention.");

			MainScreen.text("\n\nEmber's legs themselves are somewhat human-like in appearance, but they're covered in the thick protective scales that don most of " + emberMF("his", "her") + " extremities.  Only the feet look like anything but normal human anatomy; the clawed feet of a predator decorate " + emberMF("him", "her") + " instead, capped with talons meant for gripping at the ground... or at prey.");
			MainScreen.text("\n\nHaving drawn the dragon's attention with your examination of " + emberMF("his", "her") + " body, Ember darts a reptilian tongue out from " + emberMF("his", "her") + " lips, as if to entice you.");
		}
		doNext(emberCampMenu);
	}

	//Talk
	private talkToEmber(): void {
		//Checks for special scenes go here!
		//If the PC fulfills one of the requirements for the Special Scenes, they occur the moment the player picks the talk option.
		if (player.isPregnant()) { //Extra check might protect against inappropriate Ember complaints
			if (Flags.list[FlagEnum.EMBER_OVI_BITCHED_YET] == 0 && player.pregnancyType == PregnancyType.OVIELIXIR_EGGS) {
				emberBitchesAboutPCBeingFullOfEggs();
				doNext(camp.returnToCampUseOneHour);
				return;
			}
			if (player.pregnancyIncubation < 200 && player.pregnancyType != PregnancyType.EMBER && Flags.list[FlagEnum.EMBER_BITCHES_ABOUT_PREGNANT_PC] == 0) {
				manEmberBitchesAboutPCPregnancy();
				doNext(camp.returnToCampUseOneHour);
				return;
			}
			if (player.pregnancyType == PregnancyType.EMBER && player.pregnancyType < 300 && Flags.list[FlagEnum.EMBER_TALKS_TO_PC_ABOUT_PC_MOTHERING_DRAGONS] == 0) {
				emberTalksToPCAboutPCDragoNPregnancy();
				doNext(camp.returnToCampUseOneHour);
				return;
			}
		}
		if (Flags.list[FlagEnum.EMBER_PREGNANT_TALK] == 0 && pregnancy.event > 1) {
			emberIsPregnantFirstTimeTalkScene();
			doNext(camp.returnToCampUseOneHour);
		}
		MainScreen.clearText();
		MainScreen.text("What will you talk about?");
		//Else you can pick one of three topics:
		//Talk about Dragons
		//Talk about Exploring
		//Talk about Yourself
		simpleChoices("Dragons", talkToEmberAboutDragonzzz, "Exploring", discussExplorationWithEmber, "Yourself", talkToEmberAboutYourself, "", null, "Back", emberCampMenu);
	}

	//Talk about Dragons (Z)
	private talkToEmberAboutDragonzzz(): void {
		MainScreen.clearText();
		MainScreen.text("You ask Ember to tell you more about " + emberMF("his", "her") + " species.");
		let choice: number = rand(5);
		if (choice == 0) {
			MainScreen.text("\n\nEmber crosses " + emberMF("his", "her") + " arms.  \"<i>Dragons are powerful and proud!  You would never see a dragon back away from a challenge; instead, we relish in competition.</i>\"  Ember continues talking about how dragons like to challenge each other.  Although interesting at first, you get bored soon, so you excuse yourself and leave.  Ember seems not to notice, and looks pleased to have had the chance to extoll the virtues of " + emberMF("his", "her") + " species.");
			//(+Affection)
			emberAffection(2 + rand(3));
		}
		else if (choice == 1) {
			MainScreen.text("\n\nEmber thinks for a moment before saying.  \"<i>Well, let's talk about dragon anatomy.</i>\"  Ember begins explaining about the finer points of how a dragon works...  \"<i>And if we're immobilized we can still use a powerful breath attack.  Normally dragons can only use one element, but I can use three!</i>\" Ember says, proudly puffing out " + emberMF("his", "her") + " chest.  You thank Ember for the explanation, then leave.");
			//(+Affection)
			emberAffection(2 + rand(3));
		}
		else if (choice == 2) {
			MainScreen.text("\n\nEmber decides to talk about dragon mating rituals.  \"<i>Dragons prove themselves to each other by showing off their strength... it isn't necessarily limited to just physical strength.  Usually it's done in competition.  A good mate has to be proud, brave, wise and strong.  So, as you can see, it's pretty certain you wouldn't find a dragon mating a non-dragon.</i>\"");
			MainScreen.text("\n\nEmber stops talking, " + emberMF("his", "her") + " face turns serious for a moment; " + emberMF("he", "she") + " looks deep in thought.  \"<i>Dragons wouldn't mate a non-dragon... in fact, dragons wouldn't even find non-dragons attractive...</i>\"  You think you hear " + emberMF("him", "her") + " mumble.  \"<i>Dammit, then why do I feel this way...</i>\"");
			MainScreen.text("\n\nYou ask " + emberMF("him", "her") + " to speak up.  Ember blurts out, \"<i>Nothing!  Lesson's over...</i>\" before withdrawing into " + emberMF("his", "her") + " den.");
			//(+Affection)
			emberAffection(5);
		}
		else if (choice == 3) {
			MainScreen.text("\n\nEmber elaborates on dragon courtship.  \"<i>There's a rare flower, called Drake's Heart.  It's very beautiful, and the perfume, especially for dragons, is exquisite.  Usually, dragons give this flower to the ones they intend to court.</i>\"");
			MainScreen.text("\n\nThe flower an utter mystery to you, you curiously ask Ember what this \"<i>Drake's Heart</i>\" looks like, and where it grows... or used to grow.");
			//Low affection:
			if (emberAffection() <= 25) MainScreen.text("\n\nSnorting, Ember cracks an amused smile as " + emberMF("he", "she") + " chuckles. \"<i>What, does the 'Champion' think " + player.mf("him", "her") + "self worthy of courting me?  That's a good one!</i>\"  " + emberMF("He", "She") + " giggles openly to make " + emberMF("his", "her") + " lack of interest in you known... yet, it seems rather forced.");
			else if (emberAffection() <= 75) MainScreen.text("\n\nYou swear you can see the dragon daydreaming at your words, but it doesn't last.  \"<i>Look, I don't mind some curiosity, but don't try and get fresh with me!</i>\"  " + emberMF("His", "Her") + " demeanor suggests annoyance, but just maybe it's a tough front, and " + emberMF("he", "she") + "'s really waiting for you to show some affection and attention.");
			//High affection:
			else MainScreen.text("\n\nThe dragon makes no effort to hide " + emberMF("his", "her") + " embarrassed reaction as " + emberMF("he", "she") + " reads a little too much into your inquiry.  \"<i>Um.. I-ho... well...</i>\" Ember stammers out.  \"<i>Look, I have other things to do.</i>\"");
			MainScreen.text("\n\nWondering at the dragon's thoughts, you agree to call the conversation done, and politely thank " + emberMF("him", "her") + " for " + emberMF("his", "her") + " time.");
			emberAffection(5);
		}
		else {
			MainScreen.text("\n\nEmber begins talking about dragon habits, and the cave mouth framing " + emberMF("him", "her") + " makes you wonder why dragons dig such dens.  Ember shrugs.  \"<i>It's convenient.  The stone is tough and can resist all forms of hazard, plus I'll always know I can keep my stuff safe inside.</i>\"  " + emberMF("he", "she") + " stares at " + emberMF("his", "her") + " den in deep thought.");
			MainScreen.text("\n\n\"<i>It's kinda small though... I might need a bigger one if...</i>\"  Ember stops abruptly");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 1) MainScreen.text(", a blush creeping onto " + emberMF("his", "her") + " cheeks");
			MainScreen.text(".");
			MainScreen.text("\n\nYou ask if " + emberMF("he", "she") + "'s all right.  \"<i>Huh?  Yes, I'm fine!  Anyways, lesson's over.</i>\"  Ember hurriedly goes back inside " + emberMF("his", "her") + " den.");
			emberAffection(5);
		}
		doNext(camp.returnToCampUseOneHour);
	}

	//Exploration (Z)
	private discussExplorationWithEmber(): void {
		MainScreen.clearText();
		let choice: number = rand(4);
		let subChoice: number = 0;
		MainScreen.text("You ask Ember for news of anything interesting " + emberMF("he", "she") + " has seen during " + emberMF("his", "her") + " aerial explorations of Mareth.");
		MainScreen.text("\n\nEmber nods " + emberMF("his", "her") + " head and scratches " + emberMF("his", "her") + " chin thoughtfully.  \"<i>Let me think...</i>\"");

		if (choice == 0) {
			subChoice = rand(6);
			MainScreen.text("\n\n\"<i>In my travels, I found a mountain range.  I flew around it for a good while... it felt so... familiar, you know?  While I was there, I saw ");
			if (subChoice == 0) MainScreen.text("imps. Only a few imps, and they seemed very nervous. I'm guessing that whatever naturally lives there is something that they really don't want to get involved with.");
			else if (subChoice == 1) MainScreen.text("two goblins in the foothills, arguing with each other. One was saying that the other shouldn't go up into the hills, as apparently the minotaurs that live there are too much for an untrained girl like her to take without being split open. The second goblin just laughed at her, called her a 'wimp' and told her that she's going to get herself 'some juicy bull-cock and tasty mino-spooge'. Ugh, disgusting little creatures.");
			else if (subChoice == 2) MainScreen.text("a pair of muscle-bound bull-men beating on each other with their bare fists. They spent over an hour smashing each other into a bloody pulp, and then the winner promptly started fucking the loser up the ass.  I had seen more than enough by that point, so I left.");
			else if (subChoice == 3) MainScreen.text("this... creature... that looked kind of like a human woman, but with a big dick where her clit should be.  She was walking around stark naked, 'cept for a bunch of piercings, and leading this bull-man along like a pet by a chain attached to a ring anchored into his cockhead.");
			else if (subChoice == 4) MainScreen.text("a couple of goblins sharpening scissors on some rocks outside of a cave with a door on it. Weird. Wonder what they could be doing in there?");
			else if (!player.statusAffects.has("WormsOff") && rand(2) == 0) MainScreen.text("a horrible swarm of slimy white worms, clumped together into a mockery of a human form and squelching along.  It managed to latch onto this two-headed dog-creature and... ugh!  The worms started forcing their way into both of its cocks!  I've never seen anything so disgusting!");
			else if (subChoice == 5) MainScreen.text("this two-headed dog-morph loping around; it spotted an imp, dropped to all fours, then gave chase. Managed to catch the ugly little demon, whereupon it ass-raped it, then ate it.");
		}
		else if (choice == 1) {
			subChoice = rand(5);
			MainScreen.text("\n\n\"<i>In my travels, I found a forest; I must confess I stayed out of the deepest parts, but there was plenty of game to be found.  Deer, boar, rabbits, quail, and a host of other things too... not all of it nice. Let's see, there was ");
			if (subChoice == 0) MainScreen.text("a whole tribe of imps, just lounging around in a glade, jerking themselves off or squabbling over food.  Nasty little things, but easily dispatched.");
			else if (subChoice == 1) MainScreen.text("a  goblin with a huge pregnant belly, laughing to herself and swilling down that ale they brew, slopping it all over herself.  Little hedonists.");
			else if (subChoice == 2) MainScreen.text("this strange bee-woman creature... she made this, this music that started messing with my head.  I spat a tongue of flames at her and she flew away in fright, luckily.");
			//(If player has impregnated Tamani)
			else if (subChoice == 3 && Flags.list[FlagEnum.TAMANI_NUMBER_OF_DAUGHTERS] > 0) {
				MainScreen.text("that green-skinned baby-making whore, Tamani.  She was letting some of her daughters suckle from her and grinning ear to ear as she named the 'prize catch' she got to father them, exhorting them to hunt him down.");
				if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("  You should have more pride than to let some brainless cunt like that have her way with you!");
			}
			//(If player has not yet impregnated Tamani)
			else if (subChoice == 3 && !kGAMECLASS.forest.tamaniScene.pregnancy.isPregnant) MainScreen.text("one goblin being teased by a bunch of pregnant goblins for not being pregnant yet.  She just spat back that she wanted a 'better catch' to be her baby-maker than a mere imp and wandered off.");
			//(If Jojo isn't in the camp & not corrupt)
			else if (rand(2) == 0 && monk <= 1 && !player.statusAffects.has("PureCampJojo")) MainScreen.text("this mouse-morph monk, sitting in a glade and meditating. A goblin tried to proposition him; he just gave her a lecture and sent her running away in tears.  When an imp tried to attack him, he crushed its skull with a staff he had.  Not bad moves for such a weedy little thing...");
			else MainScreen.text("one glade I touched down in to catch myself a nice brace of plump coneys, when all of a sudden this... this thing made out of flailing vines and fruit attacks me.  It went up in a puff of smoke once I torched it, of course.");
		}
		else if (choice == 2) {
			subChoice = rand(2);
			MainScreen.text("\n\n\"<i>In my travels, I found a lake... big and wide and full of fish, but something about the place made me uncomfortable.  The water smelled funny, and the fish had a nasty aftertaste.  Not a lot to see there, but I did find ");
			if (subChoice == 0) {
				MainScreen.text("a pair of shark-women - well, one was a woman, the other had breasts but also had a cock");
				if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" like me");
				MainScreen.text(". They were on the beach, fucking each other's brains out.");
			}
			else {
				//(If Whitney's Farm is not yet in the Places menu)
				if (rand(3) == 0 && player.statusAffects.get("MetWhitney").value1 <= 1) MainScreen.text(" a big farm on the shoreline.  I saw some sort of cow-woman tending to fields of peppers, and a dog-woman herding cattle. They looked pretty fat and tasty, too... What?  I meant the cattle, stupid!  And I wouldn't have taken them - it's no fun snatching up livestock.  I prefer to chase down a deer or a wild auroch or something like that.");
				//(if Fetish Cult is encounterable)
				else if (rand(3) == 0 && player.statusAffects.has("FetishOn")) MainScreen.text("a pair of humans, arguing about sex.  They both wanted it, but the guy said he wanted to do the 'naughty schoolboy and female teacher' routine, while the girl wanted to do the 'noblewoman and love-servant' routine.  Weird; their clothes kept changing back and forth as they argued.");
				//(If Beautiful Sword has not been acquired)
				else if (rand(3) == 0 && !player.statusAffects.has("TookBlessedSword") && !player.statusAffects.has("BSwordBroken")) MainScreen.text("a sword jammed into a tree.  Weird; what kind of idiot would stick a weapon there like that?  And what kind of weakling wouldn't be able to take it out?");
				else if (rand(3) == 0 && !player.statusAffects.has("CampRathazul")) MainScreen.text("a smelly rat-man moping around while some weird equipment bubbled and boiled.  I think maybe he was an alchemist.");
				else MainScreen.text("a great blob of green goo, sliding along and minding its own business.  I could swear it looked up at me once, and grew a penis... that can't be right, though.");
			}
		}
		else if (choice == 3) {
			subChoice = rand(4);
			MainScreen.text("\n\n\"<i>In my travels, I found a desert.  I hate deserts.  The thermals are nice, but it's far too dry and hot.  Mostly, it's just wasteland too.  Still, I saw something interesting; ");
			if (subChoice == 0) MainScreen.text("a woman with four big breasts, squeezing milk out of her tits and into the sand.  I didn't know breasts could hold that much milk!");
			else if (subChoice == 1) MainScreen.text("a whole tribe of demons, lounging around an oasis.  Would have been too much bother to kick the crap out of them, so I left them alone - well, alright, I did buzz them to make them scatter like scared sheep for fun.");
			//(if player hasn't solved Marcus & Lucia's argument)
			else if (rand(2) == 0 && !player.statusAffects.has("WandererDemon") && !player.statusAffects.has("WandererHuman")) MainScreen.text("a human with balls so big he had to carry them in a wheelbarrow, trundling through the wasteland with a succubus.  They were arguing about whether or not he should become an incubus.");
			else {
				MainScreen.text("this strange creature, like a woman with a snake's tail for legs, slithering through the sand.  ");
				if (player.lowerBody.isNaga()) MainScreen.text("She looked a lot like you.");
				else MainScreen.text("I've never seen anything like her before.");
			}
		}
		MainScreen.text("</i>\"");
		doNext(camp.returnToCampUseOneHour);
	}

	//Talk about Yourself (Z)
	private talkToEmberAboutYourself(): void {
		MainScreen.clearText();
		let points: number = 0;
		MainScreen.text("You ask Ember what " + emberMF("he", "she") + " thinks about you.");
		//(Low Affection)
		if (emberAffection() <= 25) {
			MainScreen.text("\n\n\"<i>You're a waste of time,</i>\" Ember says nonchalantly.  " + emberMF("He", "She") + " walks past you and then flies off.");
			doNext(camp.returnToCampUseOneHour);
			return;
		}
		//There's a points system here, that can range from 0 to 8, this is used to check Ember's final answer after " + emberMF("he","she") + "'s done examining the PC.
		//(Medium/High Affection)
		MainScreen.text("\n\nEmber puts a hand on " + emberMF("his", "her") + " chin and looks you over carefully.  " + emberMF("He", "She") + " closes up on you and grips your arms, checking your muscles.");
		//(If PC Str < 50)
		if (player.stats.str < 50) MainScreen.text("  \"<i>You could use more training; you look pretty weak...</i>\" Ember says, critically.");
		//(If PC Str < 90)
		else if (player.stats.str < 90) {
			MainScreen.text("  \"<i>You're well on your way to being as strong as a dragon, but there's still room for improvement.</i>\" Ember says, pleased.");
			//(+1 point)
			points++;
		}
		//(If PC Str >= 90)
		else {
			MainScreen.text("  \"<i>With muscles like these, you could easily lift anything you wanted... even me...</i>\" Ember trails off dreamily, almost purring.  \"<i>N-Not that I'd want you to carry me in your arms or anything...</i>\"");
			//(+2 points)
			points += 2;
		}
		MainScreen.text("\n\nNext, Ember pokes at your chest and your ribs.  ");
		//(If PC Tou < 50)
		if (player.stats.tou < 50) MainScreen.text("\"<i>I don't know how you could hope to survive out there.  You look like the wind could blow you away.</i>\"");
		//(If PC Tou < 90)
		else if (player.stats.tou < 90) {
			MainScreen.text("\"<i>Not bad; some more training and you could be as tough as me!</i>\" Ember says, pleased.");
			//(+1 point)
			points++;
		}
		//(If PC Tou >= 90)
		else {
			MainScreen.text("\"<i>Your body's as tough as rock, you should show off more frequently...  N-Not that I'd want you to go naked!  You should always wear something to protect yourself,</i>\" " + emberMF("he", "she") + " quickly adds.");
			//(+1 Affection)
			emberAffection(1);
			//(+2 points)
			points += 2;
		}
		MainScreen.text("\n\nThen the dragon looks directly into your eyes.  ");
		//(If PC Int < 50)
		if (player.stats.int < 50) MainScreen.text("\"<i>You're still very naive... anyone or anything could trick you at any time...</i>\"  Ember frowns.");
		//(If PC Int < 90)
		else if (player.stats.int < 90) {
			MainScreen.text("\"<i>I see wisdom in your eyes, but you could always use more lessons.</i>\"");
			//(+1 point)
			points++;
		}
		//(If PC Int >= 90)
		else {
			MainScreen.text("Ember's eyes widen.  \"<i>I see great wisdom in your eyes...</i>\"  Ember's face grows more absent by the minute as " + emberMF("he", "she") + " looks at you in deep thought, until the trance breaks.  " + emberMF("He", "She") + " blows at your face, brushing a claw on your forehead.  \"<i>Y-You had something in your face... I wasn't staring into your steely eyes.</i>\"");
			//(+2 points)
			points += 2;
		}
		MainScreen.text("\n\nEmber walks away, back turned to you.  Then suddenly " + emberMF("he", "she") + " says \"<i>Think fast!</i>\" and flicks " + emberMF("his", "her") + " tail, flinging a pebble at you.  ");

		//(If PC Spd < 50)
		if (player.stats.spe < 50) MainScreen.text("You try to block the pebble, but you're not quick enough.  It hits your belly, not hard enough to hurt.  \"<i>You need to work on your reactions; anything could surprise you out there and you'd be helpless.</i>\"");
		//(If PC Spd < 90)
		else if (player.stats.spe < 90) {
			MainScreen.text("You successfully deflect the pebble.  \"<i>Not bad!  Next time try to catch it,</i>\"  Ember says, pleased.");
			//(+1 point)
			points++;
		}
		//(If PC Spd >= 90)
		else {
			MainScreen.text("You easily catch the pebble and throw it back at Ember, surprising " + emberMF("him", "her") + ".  \"<i>With reflexes like these, you could even...</i>\" Ember mumbles.  \"<i>D-Don't even think about it!</i>\" " + emberMF("he", "she") + " snaps.");
			//(+2 points
			points += 2;
		}
		MainScreen.text("\n\nSatisfied, Ember turns to take another look at you.");
		//(If PC has high dragon or lizard score)
		if (player.nagaScore() >= 3 || RaceScore.lizardScore(player) >= 3 || player.dragonScore() >= 3) {
			MainScreen.text("  Ember's eyes linger on your form.  After a moment of awkward silence, you clear your throat.  " + emberMF("he", "she") + " blinks and says hurriedly.  \"<i>Sorry... I was just admiring you-</i>\" Realizing what " + emberMF("he", "she") + " was about to say,and quickly blurts out.  \"<i>I mean the weather! Yes, nice day today isn't it?</i>\"  You're not convinced, but let it slide. Ember recomposes and clears " + emberMF("his", "her") + " throat before saying.");
			//(+1 Affection)
			points++;
		}
		MainScreen.text("\n\n\"<i>All right, here's what I think about you.</i>\"  ");
		if (points < 2) {
			MainScreen.text("\"<i>This is not good at all; it's a miracle you even managed to survive in this world thus far.  With the things I've seen roaming the land...</i>\" Ember trails off, concerned.  \"<i>You should stay in the camp; I'll help you train.</i>\"  You don't much like the assessment.");
		}
		//(else if points < 6)
		else if (points < 6) {
			MainScreen.text("\"<i>You're doing fine, but make sure you don't slack off, and keep training.</i>\"  You thank Ember for sharing " + emberMF("his", "her") + " thoughts.");
		}
		//(else)
		else {
			MainScreen.text("\"<i>You're quite a catch... if you strolled down the street you'd have dragons fawning all over you...</i>\"  Realizing what " + emberMF("he", "she") + " just said, Ember coughs furiously.  \"<i>I-I mean... lesser dragons might fawn all over you.  You don't meet my standards!</i>\"");
			emberAffection(5);
		}
		doNext(camp.returnToCampUseOneHour);
	}


	//Ember Interactions: Special Events (edited, but pending modifications -Z)
	//Most of these scenes occur if you pick the option "Talk" while meeting the conditions, unless otherwise noted.
	//Scene appears when selecting [Talk]
	//This scene only appears if Ember is male or herm and PC is pregnant and showing (ie: pregnancy has progressed as much as stage 2, at least.)
	//PC must be pregnant with something besides Ember's child/egg to get this scene.
	//Occurs once per pregnancy.
	//To be implimented once preggers is set up.
	private manEmberBitchesAboutPCPregnancy(): void {
		MainScreen.clearText();
		Flags.list[FlagEnum.EMBER_BITCHES_ABOUT_PREGNANT_PC] = 1;
		//(Low Affection)
		if (emberAffection() <= 25) MainScreen.text("The two of you talk about nothing in particular.  It's light, airy and pointless.  When you finish up, though, you realize something odd; Ember was doing " + emberMF("his", "her") + " best all throughout the conversation to avoid looking at your pregnant belly - almost as if " + emberMF("he", "she") + " were upset by it?");
		//(Moderate Affection)
		else if (emberAffection() < 75) MainScreen.text("Ember stares coldly at your gravid midriff as icebreaker after icebreaker from you falls flat.  You ask what's wrong.  \"<i>Nothing.  Nothing is wrong,</i>\" Ember states, flatly.");
		//(High Affection)
		else MainScreen.text("The expression Ember gives you is very cold.  \"<i>What is the meaning of this!?</i>\" " + emberMF("he", "she") + " says, motioning towards your bloated belly.  \"<i>You're supposed to help <b>me</b> breed more dragons; not slut around with trash!</i>\"  Ember blows out an indignant puff of smoke and walks away.");
	}

	//Scene appears when selecting [Talk]
	//This scene only appears if the PC is pregnant with Ember's child.
	//Occurs only once.
	//To be implimented once preggers is set up.
	private emberTalksToPCAboutPCDragoNPregnancy(): void {
		MainScreen.clearText();
		Flags.list[FlagEnum.EMBER_TALKS_TO_PC_ABOUT_PC_MOTHERING_DRAGONS] = 1;
		MainScreen.text("You notice Ember's eyes are fixated on your swollen belly, and cautiously ask what " + emberMF("he", "she") + "'s looking at.");
		MainScreen.text("\n\n\"<i>I hope this is only the first of many...</i>\" Ember mumbles, before realizing you asked a question.  \"<i>Huh?  What?</i>\"");
		MainScreen.text("\n\nCurious, you press " + emberMF("him", "her") + " on what " + emberMF("he", "she") + " means by that - about this being the first of many.");
		MainScreen.text("\n\n\"<i>That- I didn't say anything like that!  I just asked how you were feeling!</i>\" Ember steals a glance at your belly.");
		MainScreen.text("\n\nYou tell " + emberMF("him", "her") + " that you're feeling fine... though you must admit, this baby is getting kind of heavy.  You're certain, though, that " + emberMF("he", "she") + " said something else; grinning, you teasingly ask what it was.");
		MainScreen.text("\n\nEmber's shyness reaches a head, and " + emberMF("he", "she") + " finally caves.  \"<i>Fine!  So what if I liked having sex and impregnating you?  And what does it matter that I want to do it again?  Big deal!</i>\"  Ember averts " + emberMF("his", "her") + " gaze and crosses " + emberMF("his", "her") + " arms.");
		MainScreen.text("\n\nYou ");
		if (player.stats.lib < 40) MainScreen.text("start at this revelation, then ");
		MainScreen.text("give " + emberMF("him", "her") + " a sultry smile and seat yourself in " + emberMF("his", "her") + " lap.  Ember tries to hide any kind of reaction, but " + emberMF("his", "her") + " hardening prick tells you what " + emberMF("he", "she") + "'s really thinking.  " + emberMF("He", "She") + " bites " + emberMF("his", "her") + " lower lip and finally gets up.  \"<i>Oh, look at the time; I have to go!</i>\"  Ember slides from under you and dashes away in an attempt to further conceal " + emberMF("his", "her") + " arousal.");
		MainScreen.text("\n\nYou watch " + emberMF("him", "her") + " go with a smile; " + emberMF("he", "she") + "'s so fun to tease... you place a hand on your stomach for balance and strain yourself upright.");
	}

	//Scene appears when selecting [Talk]
	//This scene only appears if Ember is pregnant.
	//Occurs once during Ember's first pregnancy.
	private emberIsPregnantFirstTimeTalkScene(): void {
		MainScreen.clearText();
		Flags.list[FlagEnum.EMBER_PREGNANT_TALK] = 1;
		MainScreen.text("You can't help but stare at Ember's swollen belly; it's still so hard to take in that you have actually fathered a child with a creature of legend.  Especially given that there are times when it's hard to be entirely certain that Ember genuinely likes you.");
		MainScreen.text("\n\nEmber catches you staring");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 1) MainScreen.text(" and blushes");
		MainScreen.text(", one of her hands rubbing her belly lovingly and tenderly.  \"<i>W-what is it?  Why are you looking at me like that?  Something wrong?</i>\"");

		MainScreen.text("\n\nYou merely give her a faint smile and tell her that she's beautiful when pregnant.");
		if (player.stats.cor >= 66) MainScreen.text("  You almost choke on those cheesy words; still, she'll never put out for you if you don't butter her up.");
		MainScreen.text("\n\n\"<i>You... I... do you really think so?</i>\" Ember asks, lowering her guard.");
		MainScreen.text("\n\nYou nod and assure her that she looks wonderful; she has a truly radiant glow, a maternal beauty that is unique and all her own.  You contemplate telling her that her scales have grown so shiny with her pregnancy, but you aren't sure if she'd take that as a compliment or not.");
		if (player.stats.cor >= 66) MainScreen.text("  Is she seriously buying this nonsense?  Your smile would be miles wide if you let your lip curl even a bit, so you keep a straight face with due dilligence.");
		MainScreen.text("\n\nEmber can't hide her happiness at your compliments, as she rubs her belly a bit faster, but as if suddenly snapping out of a trance; she looks up to you with a confident stare and says, \"<i>Of course I'm beautiful!  Why else would you throw yourself into my arms and finally do the deed?</i>\"");
		MainScreen.text("\n\nThat's not how you remember the conception, and you wryly point out the events being quite the opposite.  You just can't resist poking her buttons, sometimes.");
		MainScreen.text("\n\n\"<i>Well... I wouldn't have done that if you hadn't kept teasing me!</i>\" Ember blurts out.");
		MainScreen.text("\n\nYou?  Teasing her?  You don't remember that, you tell her, adopting an exaggerated expression of contemplation.");
		MainScreen.text("\n\n\"<i>Erm... we... you cheated!  I don't know how, but you did!</i>\"  Ember finally turns on her heels, walking away.");
		MainScreen.text("\n\nYou give chase and catch her, apologising for teasing her and telling her to calm down; it's not good for her to get so upset in her current state.  She's just <i>adorable</i> when she's off-balance and flustered.");
		if (player.stats.cor < 30) MainScreen.text("  Given her attitude and nature, you know how lucky you are to have someone like her want to be your mate.");

		MainScreen.text("\n\nEmber's smile broadens as you speak, and once you're done she gives your back a pat.  \"<i>Good!  Don't forget that this is your baby.</i>\"  Then she turns and walks back to her den for a quick nap.");
	}

	//Scene appears when selecting [Talk]
	//This scene only appears if the PC is pregnant with eggs due to using Ovi Elixir/Oviposition.
	//It doesn't matter if Ember doesn't have the parts, imagination is there for a reason.
	//Yup, you guessed it, only once.
	private emberBitchesAboutPCBeingFullOfEggs(): void {
		MainScreen.clearText();
		MainScreen.text("As you try and think of a topic to talk about, you realize Ember is staring at your egg-swollen stomach - not with anger or disdain, but with interest.  With a smirk, you place one hand on your belly and ask if " + emberMF("he", "she") + " finds you interesting to look at like this.");
		MainScreen.text("\n\n\"<i>Huh?  I wasn't staring!  Who would find a bunch of your unfertilized eggs interesting?</i>\" Ember blurts out, averting her gaze.");
		MainScreen.text("\n\nYou quirk an eyebrow; who said anything about unfertilized eggs?");
		MainScreen.text("\n\n\"<i>Erk... I... I need to go take a bath!  This idea is so gross I need to wash myself of it!</i>\"  Ember quickly runs past you.");
		MainScreen.text("\n\nYou watch " + emberMF("him", "her") + " go and shake your head, wondering what that was about.");
		Flags.list[FlagEnum.EMBER_OVI_BITCHED_YET] = 1;
	}

	//Occurs if PC spends too much time at 100 Lust.
	//counter triggered when PC starts an hour in camp at 100 Lust, output when reaching 10 counters
	public emberBitchesAtYouAboutLustiness(): void {
		MainScreen.text("\nYou strive to keep your mind focused, but... your libido is screaming at you, ");
		if (player.lowerBody.cockSpot.hasCock()) {
			MainScreen.text("your " + num2Text(player.lowerBody.cockSpot.count()) + " stiff as iron");
			if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" and ");
		}
		if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " slick and wet with moisture, ready to fuck");
		MainScreen.text(".  You want sex so bad it almost hurts...");
		MainScreen.text("\n\n\"<i>What's the problem?  Too horny to think straight?</i>\" Ember teases.");
		MainScreen.text("\n\nYou gamely try to insist that nothing's wrong, but have to eventually confess that you are feeling a bit... pent up.");
		//(Low Affection)
		if (emberAffection() <= 25) MainScreen.text("\n\n\"<i>Well, you should do something about it... it's not like I can help you with that anyway.</i>\"");
		//(Medium Affection)
		else if (emberAffection() < 75) MainScreen.text("\n\n\"<i>Well... I might be persuaded to help you with that, if you ask nicely.</i>\"");
		else MainScreen.text("\n\nEmber plants a kiss on your cheek.  \"<i>I could help you with... I-I mean, I suppose I could help you if you get on your knees and ask...</i>\"  Judging by " + emberMF("his", "her") + " averted gaze and husky voice, you doubt the request would need to be quite so formal.");
		MainScreen.text("\n");
		Flags.list[FlagEnum.EMBER_LUST_BITCHING_COUNTER] = 0;
	}

	//This scene only appears if the player is suffering from Minotaur Cum addiction, and only before PC develops addicted perk.
	//Output automatically when PC enters camp while conditions are met
	//This should reduce the chance of meeting minotaurs.
	public minotaurJizzFreakout(): void {
		MainScreen.text("\nYou try to hold a conversation with Ember, but it's hard for you to concentrate; you keep thinking about the delicious, soul-burning taste of hot, salty minotaur cum, straight from the bull-man's cock.  Inevitably, Ember asks you what the matter is and, salivating, you paint the picture for her.");
		MainScreen.text("\n\nEmber suddenly throws back " + emberMF("his", "her") + " head with a terrible roar of fury that rattles the very rocks underfoot.  \"<i>I'll kill them!  I'll bash their brains out - I'll rip off their stinking hairy hides!  I'll gorge myself on their flesh and pick my teeth with their horns!  Nobody will poison you like that - nobody!</i>\"");
		MainScreen.text("\n\nBefore you can do anything, the livid dragon spreads " + emberMF("his", "her") + " wings.  \"<i>When I return I will watch you carefully, to see that you beat this... addiction.</i>\" " + emberMF("He", "She") + " flies away, heading in the direction of the mountains.  You've never seen " + emberMF("him", "her") + " so mad before...");
		if (followerKiha()) MainScreen.text("\n\nKiha saunters up and smirks.  \"<i>I thought I had a temper.</i>\"");
		Flags.list[FlagEnum.EMBER_CURRENTLY_FREAKING_ABOUT_MINOCUM] = 1;
		MainScreen.text("\n");
	}

	//Scene
	//This plays automatically when the PC gets over " + emberMF("his","her") + " temporary addiction to minotaur cum
	//Normal note for PC getting over mino cum addiction plays first
	public emberGetOverFreakingOutAboutMinoJizz(): void {
		Flags.list[FlagEnum.EMBER_CURRENTLY_FREAKING_ABOUT_MINOCUM] = 0;
		MainScreen.text("\nYou should probably let Ember know that you are no longer plagued by thoughts of minotaurs... if only to prevent ecological collapse.  Fortunately enough, you find " + emberMF("him", "her") + " landing in front of " + emberMF("his", "her") + " den just then.  " + emberMF("he", "she") + " throws another minotaur's skull on the smallest pile, then turns to face you.  \"<i>What's got you so cheerful?</i>\" " + emberMF("he", "she") + " asks.");

		MainScreen.text("\n\nWhen you explain that you feel like you're over your addiction, " + emberMF("his", "her") + " face lights up.  " + emberMF("he", "she") + " gives a roar of delight and then suddenly envelops you in a crushing embrace - only to realize what " + emberMF("he", "she") + " is doing and shortly release you, looking obviously embarrassed.");
		MainScreen.text("\n\n\"<i>Th-that's great to hear.  Nobody should have to put up with something so undignified as an actual craving for sexual fluids, particularly from beasts like that.</i>\"");

		MainScreen.text("\n\nYou point out that this means " + emberMF("he", "she") + " no longer has to hunt down minotaurs, for your sake. Which furthermore means, you note, that she can stop leaving cow skulls and hooves and other rubbish all over the camp.");

		MainScreen.text("\n\n" + emberMF("He", "She") + " promptly lets out a thunderous belch, heavy and wet and vulgar, filling the air with the stink of blood and beef.  The dragon then looks idly at the 'trophy piles' " + emberMF("he", "she") + "'s built up.");
		//(Low Affection)
		if (emberAffection() <= 25) {
			MainScreen.text("\n\n\"<i>Stupid.  As if I was doing it for you.</i>\"  Ember looks at you and quickly adds.  \"<i>You're not worth the time if you take pleasure from sampling bulls' dicks.</i>\"  " + emberMF("He", "She") + " turns away in a dismissive motion.  \"<i>Don't get any ideas; this doesn't mean we're friends or anything.  I just really hate those dumb cows.</i>\"");
			MainScreen.text("\n\nWhether " + emberMF("he", "she") + " was hunting them to help you or " + emberMF("he", "she") + " just felt like beef for the last few days, the fact remains that she helped tamp down the, ah, temptation they presented.");
		}
		//(Medium Affection)
		else if (emberAffection() < 75) {
			MainScreen.text("\n\n\"<i>Finally... I was getting tired of eating roasted beef all the time.</i>\"  Ember looks at you and quickly adds.  \"<i>You should be grateful that I used a bit of my valuable time to help you!</i>\"");
			MainScreen.text("\n\nYou tell her that you do appreciate " + emberMF("his", "her") + " intent, and you're sorry " + emberMF("he", "she") + " had to put " + emberMF("his", "her") + " stomach through so much abuse on your behalf.");
			MainScreen.text("\n\n\"<i>Good.  Now, you, if you're so sorry, you can start by cooking me something to get the taste off my mouth.</i>\"  Ember crosses " + emberMF("his", "her") + " arms, waiting for you.");
			MainScreen.text("\n\nNoting the chronic indigestion " + emberMF("he", "she") + " has been plagued with since starting this little crusade, you'd have thought the last thing " + emberMF("he", "she") + "'d want for a while is more food.  After all, the reason " + emberMF("he", "she") + "'s got such a bad case of wind is because " + emberMF("he", "she") + " keeps eating too much.");
			MainScreen.text("\n\n\"<i>Then get me a tea or something!</i>\"  Ember replies indignantly.");
			MainScreen.text("\n\nLife is fucking weird.");
		}
		//(High Affection)
		else {
			MainScreen.text("\n\nEmber sighs and turns to look at you.  \"<i>I hope you'll stay away from those stupid bulls from now on.  Next time you have a craving");
			//(Male/HermEmber:
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(", especially for sucking cock,");
			MainScreen.text(" you should come to me instead; I'll help you.</i>\"  Then as if realising what " + emberMF("he", "she") + "'s just implied, Ember looks away; and hurriedly adds, \"<i>But not the way you're thinking...</i>\"");
			MainScreen.text("\n\nYou simply lift an eyebrow and ask how else " + emberMF("he", "she") + " intends to help.");
			MainScreen.text("\n\n\"<i>J-just forget it!</i>\"  " + emberMF("He", "She") + " turns to walk away, stopping briefly to stifle another burp and hold " + emberMF("his", "her") + " belly.  You call out to the dragon that eating minotaurs, bones and all, really can't be good for " + emberMF("his", "her") + " stomach; in fact, given the near-constant bellyaching and belching " + emberMF("he", "she") + "'s suffered through, maybe it's " + emberMF("him", "her") + " that needs the help?  Some medicine, or at least a bellyrub?");
			MainScreen.text("\n\n\"<i>B-bellyrub?  What do I look like!?  A pet!?</i>\" Ember yells, rubbing " + emberMF("his", "her") + " belly " + emberMF("him", "her") + "self.");
		}
		MainScreen.text("\n\nYou sigh softly, shake your head and walk away.  You're not certain you would have chosen the way that Ember 'helped' you get over your addiction, but you can't deny that " + emberMF("he", "she") + " really did mean to help, and in its way, it did.\n");
	}

	//Get Blood - the dragon TF vehicle(Z)
	//Can only be picked once per day.
	//Player may drink a small bit or drink more.
	//Drinking only a bit will boost 3 of the PC's status randomly (Strength, Toughness, Intelligence, Speed), a random amount between 1-5.
	//Drinking more blood, will in addition to the status boost, TF the player into a dragon, gaining the respective skills that come attached to each part.
	//PCs that are dragony enough might be bestowed with Tainted Ember's signature breath weapon.
	private bloodForTheBloodGod(): void {
		MainScreen.clearText();
		MainScreen.text("You ask Ember if " + emberMF("he", "she") + " would be willing to give you a taste of " + emberMF("his", "her") + " blood, desirous of the power that lies within it.");
		//(If Ember hasn't recovered from the last time " + emberMF("he","she") + " shared her blood)
		if (Flags.list[FlagEnum.DRANK_EMBER_BLOOD_TODAY] == 1 && !debug) {
			MainScreen.text("\n\n\"<i>Sorry, but I'm still recovering from last time, so no blood for you,</i>\" Ember states matter-of-factly.");
			doNext(playerMenu);
			return;
		}
		//(Low Affection)
		if (emberAffection() <= 25) {
			MainScreen.text("\n\n\"<i>What!?  Why should I hurt myself for you?!</i>\"  Ember indignantly blows a small ring of flames at you and walks away.");
			doNext(playerMenu);
			return;
		}
		//(Medium Affection)
		else if (emberAffection() < 75) {
			MainScreen.text("\n\n\"<i>Hmm... fine!  If anything, I might rub off on you.  You could stand to be a bit more majestic!</i>\"  Ember makes a cut on " + emberMF("his", "her") + " palm with a claw, and presents to you the bleeding hand.");
			MainScreen.text("\n\nYou reach out and take it in yours");
			if (player.stats.cor < 50) MainScreen.text(", expressing your gratitude; gently, you kiss " + emberMF("his", "her") + " fingers, then the cut, letting its cool, iron-tinted tang roll across your lips and tongue.  You carefully lick, trying to avoid causing pain as you drink that which " + emberMF("he", "she") + " has so generously offered you.");
			else MainScreen.text(", quickly drawing it to your mouth and forming a seal around the cut with your lips, anxious to let not a drop escape.");
			MainScreen.text("\n\nEmber winces as you start to lick " + emberMF("his", "her") + " wound, but quickly recovers composure.  You dart your eyes up to look at " + emberMF("his", "her") + " face momentarily; " + emberMF("he", "she") + "'s a bit flustered and it's clear that your licking is bringing " + emberMF("him", "her") + " at least some relief from the pain of " + emberMF("his", "her") + " injury.");

			MainScreen.text("\n\nAs you drink, you feel a rush of energy course throughout your body; you feel lofty, powerful, and erudite.  Who knows what will happen if you keep drinking...");
			//[Continue][Stop]
			simpleChoices("Continue", drinkDeeplyOfDagronBlud, "Stop", noMoDagronBlud, "", null, "", null, "", null);
		}
		//(High Affection)
		else {
			MainScreen.text("\n\n\"<i>I think you've been nice enough to deserve a small favor... but I expect you to make it worth my while.  Come and get it.</i>\"");
			MainScreen.text("\n\nEmber bites " + emberMF("his", "her") + " tongue with a wicked, dagger-like fang and extends it a few inches past " + emberMF("his", "her") + " lips, smearing bluish blood on them and inviting you with open arms and a small kiss.");
			MainScreen.text("\n\nIt would be rude to keep " + emberMF("him", "her") + " waiting; you slide over, letting " + emberMF("him", "her") + " enfold you in " + emberMF("his", "her") + " embrace and drawing the bloody tongue into your mouth.");
			MainScreen.text("\n\nEmber kisses you back; " + emberMF("his", "her") + " bleeding tongue stroking yours lovingly.");
			MainScreen.text("\n\nAs you drink, you feel a rush of energy course throughout your body; you feel lofty, powerful, and erudite.  Who knows what will happen if you keep drinking?");
			//[Continue][Stop]
			simpleChoices("Continue", drinkDeeplyOfDagronBlud, "Stop", noMoDagronBlud, "", null, "", null, "", null);
		}
		//Flag as drinking her blood today!
		Flags.list[FlagEnum.DRANK_EMBER_BLOOD_TODAY] = 1;
		//Medium/high get stat boosts!
		let stat: number = rand(4);
		if (stat == 0) player.stats.str += 1;
		else if (stat == 1) player.stats.tou += 1;
		else if (stat == 2) player.stats.spe += 1;
		else player.stats.int += 1;
	}

	//[=Stop=]
	private noMoDagronBlud(): void {
		MainScreen.clearText();
		if (emberAffection() < 75) {
			MainScreen.text("You decide to stop for now and pull away.  Ember licks " + emberMF("his", "her") + " own wound " + emberMF("him", "her") + "self and you thank " + emberMF("him", "her") + " for sharing.");
			MainScreen.text("\n\n\"<i>D-Don't mention it...</i>\"");
		}
		else {
			MainScreen.text("You decide to stop for now and pull away.  Ember licks " + emberMF("his", "her") + " lips, draws " + emberMF("his", "her") + " tongue back into " + emberMF("his", "her") + " mouth and purrs with delight.  When " + emberMF("he", "she") + " realizes what " + emberMF("he", "she") + "'s doing, though, " + emberMF("he", "she") + " sobers.  \"<i>D-Don't get any strange ideas...</i>\"");
			MainScreen.text("\n\nYou gently ask what " + emberMF("he", "she") + " means by \"<i>strange ideas</i>\".");
			MainScreen.text("\n\n\"<i>The ones you're getting!</i>\" Ember blurts out, before spinning on " + emberMF("his", "her") + " heels and leaving you alone. You watch " + emberMF("him", "her") + " go and smile.");
		}
		doNext(camp.returnToCampUseOneHour);
	}

	private drinkDeeplyOfDagronBlud(): void {
		MainScreen.clearText();
		if (emberAffection() < 75) {
			MainScreen.text("You decide to continue drinking Ember's blood; intent on acquiring all the power it can bring out from within you.");
			//check for TFs and output appropriate text from below
			emberTFs();
			MainScreen.text("\n\n\"<i>Ugh... you drank too much... I feel woozy,</i>\" the dragon gripes.");
			MainScreen.text("\n\nYou offer " + emberMF("him", "her") + " a helping hand.  Ember, surprisingly, accepts your help.  \"<i>Thanks.  I guess no more work for today... I need some food and a nap.</i>\"");
		}
		else {
			MainScreen.text("\n\nYou decide to continue drinking Ember's blood; intent on acquiring all the power it can bring out from within you.");
			//output tf from below
			emberTFs();
			MainScreen.text("\n\nAs you break the kiss; Ember leans over, supporting " + emberMF("him", "her") + "self on your shoulders.  \"<i>Ugh... I guess we overdid it... I feel woozy.</i>\"");
			MainScreen.text("\n\nYou quickly offer " + emberMF("him", "her") + " a helping hand, inquiring if " + emberMF("he", "she") + " is all right.  Ember accepts your help, using your hand to balance " + emberMF("him", "her") + "self.  \"<i>I-I'll be fine... just, no more sharing for the day...</i>\"");
		}
		doNext(camp.returnToCampUseOneHour);
	}

	//TF messages (Z)
	private emberTFs(): void {
		let changes: number = 0;
		let changeLimit: number = 2;
		//Gain Dragon Dick
		if (changes < changeLimit && player.dragonCocks() < player.lowerBody.cockSpot.count() && rand(3) == 0) {
			temp = 0;
			let choices: Array = [];
			let select: number;
			temp = player.lowerBody.cockSpot.count();
			//Build an array of all the locations for TF'able cocks.
			while (temp > 0) {
				temp--;
				if (player.lowerBody.cockSpot.get(temp).cockType != CockType.DRAGON) choices[choices.length] = temp;
			}
			//Randomly choose one of those locations
			select = choices[rand(choices.length)];
			MainScreen.text("\n\nYour " + CockDescriptor.describeCock(player, select) + " tingles as pins and needles sweep across it.  You pull open your [armor] to watch as it changes; the tip elongates and tapers, like a spear; a series of ridges form along the shaft, giving it an almost segmented look, and a prominent knot swells at its base.  You can't resist stroking it, until it begins dripping pre; ");
			if (player.stats.sens >= 50) MainScreen.text("however, it's not until you press on your new, sensitive knot that you manage to blow your load and enjoy the last few spasms of pleasure as it finally finishes changing.");
			else MainScreen.text("but you sternly rein in your hands and tuck them into your armpits as the arousing changes run their course.");
			MainScreen.text("  <b>You now have a dragon penis.</b>");
			//lose lust if sens>=50, gain lust if else
			player.stats.sens += 10;
			player.stats.lust += 10;
			changes++;
			//Apply the TF
			player.lowerBody.cockSpot.get(select).cockType = CockType.DRAGON;
			player.lowerBody.cockSpot.get(select).knotMultiplier = 1.3;
		}
		//Gain Dragon Head
		if (changes < changeLimit && rand(3) == 0 && player.upperBody.head.face.faceType != FaceType.DRAGON && Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) {
			MainScreen.text("\n\nYou scream as your face is suddenly twisted; your facial bones begin rearranging themselves under your skin, restructuring into a long, narrow muzzle.  Spikes of agony rip through your jaws as your teeth are brutally forced from your gums, giving you new rows of fangs - long, narrow and sharp.  Your jawline begins to sprout strange growths; small spikes grow along the underside of your muzzle, giving you an increasingly inhuman visage.\n\nFinally, the pain dies down, and you look for a convenient puddle to examine your changed appearance.\n\nYour head has turned into a reptilian muzzle, with small barbs on the underside of the jaw.  <b>You now have a dragon's face.</b>");
			player.upperBody.head.face.faceType = FaceType.DRAGON;
			changes++;
		}
		//-Existing horns become draconic, max of 4, max length of 1'
		if (player.upperBody.head.hornType != HornType.DRACONIC_X4_12_INCH_LONG && changes < changeLimit && rand(5) == 0) {
			//No dragon horns yet.
			if (player.upperBody.head.hornType != HornType.DRACONIC_X2 && player.upperBody.head.hornType != HornType.DRACONIC_X4_12_INCH_LONG) {
				//Already have horns
				if (player.upperBody.head.horns > 0) {
					//High quantity demon horns
					if (player.upperBody.head.hornType == HornType.DEMON && player.upperBody.head.horns > 4) {
						MainScreen.text("\n\nYour horns condense, twisting around each other and merging into larger, pointed protrusions.  By the time they finish you have four draconic-looking horns, each about twelve inches long.", false);
						player.upperBody.head.horns = 12;
						player.upperBody.head.hornType = HornType.DRACONIC_X4_12_INCH_LONG;
					}
					else {
						MainScreen.text("\n\nYou feel your horns changing and warping, and reach back to touch them.  They have a slight curve and a gradual taper.  They must look something like the horns the dragons in your village's legends always had.", false);
						player.upperBody.head.hornType = HornType.DRACONIC_X2;
						if (player.upperBody.head.horns > 13) {
							MainScreen.text("  The change seems to have shrunken the horns, they're about a foot long now.", false);
							player.upperBody.head.horns = 12;
						}

					}
					changes++;
				}
				//No horns
				else {
					//-If no horns, grow a pair
					MainScreen.text("\n\nWith painful pressure, the skin on the sides of your forehead splits around two tiny nub-like horns.  They're angled back in such a way as to resemble those you saw on the dragons in your village's legends.  A few inches of horn sprout from your head before stopping.  <b>You have about four inches of dragon-like horn.</b>", false);
					player.upperBody.head.horns = 4;
					player.upperBody.head.hornType = HornType.DRACONIC_X2;

					changes++;
				}
			}
			//ALREADY DRAGON
			else {
				if (player.upperBody.head.hornType == HornType.DRACONIC_X2) {
					if (player.upperBody.head.horns < 12) {
						if (rand(2) == 0) {
							MainScreen.text("\n\nYou get a headache as an inch of fresh horn escapes from your pounding skull.", false);
							player.upperBody.head.horns += 1;
						}
						else {
							MainScreen.text("\n\nYour head aches as your horns grow a few inches longer.  They get even thicker about the base, giving you a menacing appearance.", false);
							player.upperBody.head.horns += 2 + rand(4);
						}
						if (player.upperBody.head.horns >= 12) MainScreen.text("  <b>Your horns settle down quickly, as if they're reached their full size.</b>", false);
						changes++;
					}
					//maxxed out, new row
					else {
						//--Next horn growth adds second row and brings length up to 12\"
						MainScreen.text("\n\nA second row of horns erupts under the first, and though they are narrower, they grow nearly as long as your first row before they stop.  A sense of finality settles over you.  <b>You have as many horns as a lizan can grow.</b>", false);
						player.upperBody.head.hornType = HornType.DRACONIC_X4_12_INCH_LONG;
						changes++;
					}
				}
			}
		}
		//Gain Dragon Ears
		if (changes < changeLimit && rand(3) == 0 && player.upperBody.head.earType != EarType.DRAGON) {
			player.upperBody.head.earType = EarType.DRAGON;
			MainScreen.text("\n\nA prickling sensation suddenly fills your ears; unpleasant, but hardly painful.  It grows and grows until you can't stand it any more, and reach up to scratch at them.  To your surprise, you find them melting away like overheated candles.  You panic as they fade into nothingness, leaving you momentarily deaf and dazed, stumbling around in confusion.  Then, all of a sudden, hearing returns to you.  Gratefully investigating, you find you now have a pair of reptilian ear-holes, one on either side of your head.  A sudden pain strikes your temples, and you feel bony spikes bursting through the sides of your head, three on either side, which are quickly sheathed in folds of skin to resemble fins.  With a little patience, you begin to adjust these fins just like ears to aid your hearing.\n\n<b>You now have dragon ears!</b>");
			changes++;
		}
		//Gain Dragon Tongue
		if (changes < changeLimit && rand(3) == 0 && player.upperBody.head.face.tongueType != TongueType.DRACONIC) {
			MainScreen.text("\n\nYour tongue suddenly falls out of your mouth and begins undulating as it grows longer.  For a moment it swings wildly, completely out of control; but then settles down and you find you can control it at will, almost like a limb.  You're able to stretch it to nearly 4 feet and retract it back into your mouth to the point it looks like a normal human tongue.  <b>You now have a draconic tongue.</b>");
			player.upperBody.head.face.tongueType = TongueType.DRACONIC;
			changes++;
			//Note: This type of tongue should be eligible for all things you can do with demon tongue... Dunno if it's best attaching a boolean just to change the description or creating a whole new tongue type.
		}
		//(Pending Tongue Masturbation Variants; if we ever get around to doing that.)
		//Gain Dragon Scales
		if (player.skinType != SkinType.SCALES && changes < changeLimit && rand(3) == 0) {
			MainScreen.text("\n\nPrickling discomfort suddenly erupts all over your body, like every last inch of your skin has suddenly developed pins and needles.  You scratch yourself, hoping for relief; and when you look at your hands you notice small fragments of your " + player.skinFurScales() + " hanging from your fingers.  Nevertheless you continue to scratch yourself, and when you're finally done, you look yourself over. New shield-like scales have grown to replace your peeled off " + player.skinFurScales() + ".  They are smooth and look nearly as tough as iron. <b>Your body is now covered in shield-shaped dragon scales.</b>");
			player.skinType = SkinType.SCALES;
			player.skinAdj = "";
			player.skinDesc = "scales";
			//def bonus of scales
		}
		//Gain Dragon Legs
		if (player.lowerBody != LowerBodyType.DRAGON && changes < changeLimit && rand(3) == 0) {
			//(if drider)
			if (player.lowerBody == LowerBodyType.DRIDER_LOWER_BODY)
				MainScreen.text("\n\nA disquieting feeling ripples through your arachnid abdomen, and you find yourself losing control of your body from the waist down.  Your spidery legs flail madly as your abdomen visibly swells, chitin cracking ominously as the pressure builds up inside of you... and then explodes!  You wipe the gore from your face in disgust, wondering why you feel no pain.  Rolling over, you see that, caked with spider-slime, you now have a new pair of legs, human-like save for the scales and the bestial paws that serve as feet.  <b>You now have dragon feet.</b>");
			//(If naga)
			else if (player.lowerBody.isNaga()) {
				MainScreen.text("\n\nYou fall on your face to the ground, hissing and screeching in pain - it feels like someone has grabbed the tip of your tail, pulled it viciously straight, and is now splitting it up the middle with a knife!  Paralyzed from the waist down, you claw desperately at the earth to try and alleviate the pain, and can only think to thank your lucky stars when it fades away.  Looking down where your tail was, though the scales remain, you realize you've become a biped again, your new feet sporting bestial claws on their toes.  <b>You now have dragon feet.</b>");
			}
			//(If Goo)
			else if (player.lowerBody.isGoo()) {
				MainScreen.text("\n\nA strange tingling sensation fills you, and you watch as your gooey blob of a body begins to ripple and shudder; you try to make it stop, but you can't control it.  Before your eyes, it shapes itself into the appearance of legs, the colored slime growing denser and thicker, the surface membrane texturing itself to look like scales.  Before you've quite realized what's happened, the slime has set like water freezing, leaving you with humanoid legs once again, though tipped with claws and very reptilian in appearance.  <b>You now have dragon feet.</b>");
			}
			//(If hoofed legs)
			else if (player.lowerBody == LowerBodyType.HOOFED) {
				MainScreen.text("\n\nYou bellow in pain as your legs break and reform and your hooves seem to suddenly explode, the bones within twisting themselves into monstrous three-toed appendages, more like those of some terrible lizard-thing than anything else. <b>You now have dragon feet.</b>");
			}
			//(if centaur)
			else if (player.lowerBody.isTaur()) {
				MainScreen.text("\n\nYou cry out as spasms of pain suddenly rip through your quadrupedal body, bringing you crashing onto the ground.  Words cannot define the agony as muscles and bones twist and shift and collapse violently.  When it's all over, you stagger upright, finding yourself standing on two legs again.  Though covered in scales and with the paws of some monster lizard instead of feet, they otherwise look like your old human legs.  <b>You now have dragon feet.</b>");
			}
			//(If non-hoofed legs)
			else {
				MainScreen.text("\n\nYou scream in agony as you feel the bones in your feet suddenly break and restructure themselves, toes fusing together, bone swelling out of the merged masses of flesh.  When the pain is over, you realize that you still stand atop human-looking legs, but your feet have become like those of some bipedal reptilian killer, with powerful claws meant for gripping the ground. <b>You now have dragon feet.</b>");
			}
			player.lowerBody = LowerBodyType.DRAGON;
			changes++;
		}
		//Gain Dragon Tail
		if (player.lowerBody.tailType != TailType.DRACONIC && changes < changeLimit && rand(3) == 0) {
			//(If no tail)
			if (player.lowerBody.tailType == TailType.NONE) MainScreen.text("\n\nA sudden dull, throbbing pain in your " + ButtDescriptor.describeButt(player) + " forces your hands to it; you can feel an ominous lump over your tail bone, swelling bigger and bigger with every heartbeat.  All of a sudden, it seems to explode, jutting out and around until it hovers near your ankles, the skin under your flesh hard and scaly.  <b>You now have a dragon tail flicking at your back, flexible as a whip.</b>");
			//(If tail)
			else MainScreen.text("\n\nAn icy sensation fills your behind as your tail suddenly goes curiously numb.  Twisting your head around, you watch as it melts and transforms into a reptilian appendage, long and flexible, its tip adorned with wicked spikes.  <b>You now have a dragon tail.</b>");
			player.lowerBody.tailType = TailType.DRACONIC;
			changes++
		}
		/*
		 //9999 - prolly not gonna do this!
		 Tail Slam Attack Effects:
		 Deals ⅓ normal damage, but pierces 30 defense (stacks with perks) and has a (strength / 2) chance of stunning the opponent that turn.
		 Note: Dunno how much defense critters usually have, but this is meant as a surprise attack of sorts, so it pierces a good amount of it.
		 Tail Slam Attack Description:
		 You spin around quickly, whipping your tail spikes at [enemy].

		 Hit: Your tail slams against it/" + emberMF("him","her") + " with brutal force, the spikes on the tip extending to puncture flesh.
		 Miss: Unfortunately, you lose your sense of depth as you whirl, and the tip swings harmlessly through the air in front of your target.
		 */
		//Grow Dragon Wings
		if (player.upperBody.wingType != WingType.DRACONIC_LARGE && changes < changeLimit && rand(3) == 0) {
			if (player.upperBody.wingType == WingType.NONE) {
				MainScreen.text("\n\nYou double over as waves of pain suddenly fill your shoulderblades; your back feels like it's swelling, flesh and muscles ballooning.  A sudden sound of tearing brings with it relief and you straighten up.  Upon your back now sit small, leathery wings, not unlike a bat's. <b>You now have small dragon wings.  They're not big enough to fly with, but they look adorable.</b>");
				player.upperBody.wingType = WingType.DRACONIC_SMALL;
				player.upperBody.wingDesc = "small, draconic";
			}
			//(If Small Dragon Wings Present)
			else if (player.upperBody.wingType == WingType.DRACONIC_SMALL) {
				MainScreen.text("\n\nA not-unpleasant tingling sensation fills your wings, almost but not quite drowning out the odd, tickly feeling as they swell larger and stronger.  You spread them wide - they stretch further than your arms do - and beat them experimentally, the powerful thrusts sending gusts of wind, and almost lifting you off your feet.  <b>You now have fully-grown dragon wings, capable of winging you through the air elegantly!</b>");
				player.upperBody.wingType = WingType.DRACONIC_LARGE;
				player.upperBody.wingDesc = "large, draconic";
			}
			else if (player.upperBody.wingType == WingType.SHARK_FIN) {
				MainScreen.text("\n\nA sensation of numbness suddenly fills your fin.  When it does away, it feels... different.  Looking back, you realize that it has been replaced by new, small wings, ones that you can only describe as draconic.  <b>Your shark-like fin has changed into dragon wings.</b>");
				player.upperBody.wingType = WingType.DRACONIC_SMALL;
				player.upperBody.wingDesc = "small, draconic";
			}
			//(If other wings present)
			else {
				MainScreen.text("\n\nA sensation of numbness suddenly fills your wings.  When it dies away, they feel... different.  Looking back, you realize that they have been replaced by new, small wings, ones that you can only describe as draconic.  <b>Your wings have changed into dragon wings.</b>");
				player.upperBody.wingType = WingType.DRACONIC_SMALL;
				player.upperBody.wingDesc = "small, draconic";
			}
			changes++;
		}
		//Get Dragon Breath (Tainted version)
		//Can only be obtained if you are considered a dragon-morph, once you do get it though, it won't just go away even if you aren't a dragon-morph anymore.

		if (player.dragonScore() >= 4 && changes < changeLimit && !player.perks.has("Dragonfire")) {
			MainScreen.text("\n\nYou feel something awakening within you... then a sudden sensation of choking grabs hold of your throat, sending you to your knees as you clutch and gasp for breath.  It feels like there's something trapped inside your windpipe, clawing and crawling its way up.  You retch and splutter and then, with a feeling of almost painful relief, you expel a bellowing roar from deep inside of yourself... with enough force that clods of dirt and shattered gravel are sent flying all around.  You look at the small crater you have literally blasted into the landscape with a mixture of awe and surprise.");
			MainScreen.text("\n\nIt seems Ember's dragon blood has awaked some kind of power within you... your throat and chest feel very sore, however; you doubt you can force out more than one such blast before resting.\n\n(<b>Gained Perk: Dragonfire!</b>)");
			player.perks.add(new Perk("Dragonfire", 0, 0, 0, 0));
			if (emberAffection() >= 75) MainScreen.text("\n\nEmber immediately dives back in to soothe your battered throat and mouth with another kiss.");
			changes++;
		}
		if (player.dragonScore() >= 4 && rand(3) == 0 && player.gender > 0) {
			MainScreen.text("\n\nA sudden swell of lust races through your ");
			if (player.lowerBody.cockSpot.hasCock()) {
				MainScreen.text(CockDescriptor.describeCock(player, 0));
				if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" and ");
			}
			if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)));
			MainScreen.text(", making you wish Ember hadn't run you off.  All you can think about now is fucking " + emberMF("his", "her") + "; ");
			if (player.lowerBody.cockSpot.hasCock() && Flags.list[FlagEnum.EMBER_GENDER] >= 2) {
				MainScreen.text("filling her womb with your seed and fertilizing her eggs");
				if (player.lowerBody.vaginaSpot.hasVagina() && Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" even while ");
			}
			if (player.lowerBody.vaginaSpot.hasVagina() && (Flags.list[FlagEnum.EMBER_GENDER] == 3 || Flags.list[FlagEnum.EMBER_GENDER] == 1)) MainScreen.text("taking that hard, spurting cock inside your own " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)));
			MainScreen.text("... too late, you realize that <b>Ember's blood has sent your draconic body into ");
			if (player.lowerBody.cockSpot.hasCock() && Flags.list[FlagEnum.EMBER_GENDER] >= 2) {
				MainScreen.text("rut");

				player.goIntoRut(false);
				changes++;
			}
			else {
				MainScreen.text("heat");

				player.goIntoHeat(false);
				changes++;
			}
			MainScreen.text("</b>.");
		}
	}

	//Get Egg (Ovilixer Ember) (Z)
	//Spying or watching Ember lay, increases lust by a small amount, while helping Ember lay, increases lust by a moderate amount.
	//Player always gets the egg.
	private emberIsAnEggFactory(): void {
		MainScreen.clearText();
		MainScreen.text("You ask Ember if she would be willing to lay an egg for you.");
		//(Low Affection)
		if (emberAffection() <= 25) {
			MainScreen.text("\n\nEmber's eyes darken.  \"<i>How dare you!  Asking me to do something... so... so embarrassing!</i>\"");
			MainScreen.text("\n\nYou apologize, but you really could use one of those blank eggs she lays on your mission... Besides, she needs to lay them and get rid of them anyway, right?  Being blocked up and just letting them multiply inside her belly can't be pleasant.");
			MainScreen.text("\n\nEmber puffs out a ring of smoke.  \"<i>Even if I have no use for it; it's still a very personal part of me!</i>\" However, she rubs her chin in thought... perhaps weighing whether she should give you the egg or not.  Finally she concedes.  \"<i>Fine!  But you'd better not do anything strange with it!</i>\"");
			MainScreen.text("\n\nYou assure her that you have nothing weird planned.  A part of you wonders just what you could do with it besides eat it ");
			if (player.stats.cor >= 40) MainScreen.text("or sell it for quick cash ");
			MainScreen.text("anyway, but you don't tell her that.");
			MainScreen.text("\n\n\"<i>Ok, wait here then.</i>\"  Ember ducks off through a few bushes, intent on getting some privacy.");
			MainScreen.text("\n\nUnable to resist the temptation, you decide to sneak after her and see how she will coax herself into laying before her body would usually make her pass her unfertilized egg.  You carefully move through the wastes, watching the ground closely to avoid any noises that might give you away.");
			MainScreen.text("\n\nEmber is sitting on a rock, legs open");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) {
				MainScreen.text(" and her ");
				if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] > 0) MainScreen.text("dragon-dick jutting from its slit,");
				else MainScreen.text("veiny, bulbous penis fully");
				MainScreen.text(" erect");
			}
			MainScreen.text(".  One of her hands gently teases her clit, as another traces her outer labia; she bites her lips, trying to stifle her moans of pleasure, but it's useless... every touch brings a sigh.");
			MainScreen.text("\n\nHer pace quickens, her moans grow more intense, and you think you can see what looks like the shell of a egg beginning to peek through her netherlips.  Sure enough, Ember holds her pussy open with a hand and cups the egg in the other.  She groans at the effort of pushing, and slowly the egg comes; once the largest part has passed, the egg rapidly slips out of her and plops into her hand.");
			MainScreen.text("\n\nShe pants, looking at the slick egg for a bit before licking it clean of her juices, then lays down, clearly intent on waiting until she's cooled down a bit");
			//[(if Ember has a dick)
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" and her throbbing cock is soft enough to hide");
			MainScreen.text(" before she presents the egg to you.");
			MainScreen.text("\n\nYou decide to return to where you were supposed to wait for Ember, in the hopes of being able to hide how turned on you are yourself after watching Ember's little show.");
			MainScreen.text("\n\nA few minutes later Ember appears, holding the egg; luckily, you've managed to resume your original position and obscure your arousal.");
			MainScreen.text("\n\n\"<i>Here's your egg.</i>\"  Ember holds out the egg for you, averting her eyes.  With a smile, you take it from her hands and thank her for her generosity.");
			MainScreen.text("\n\nEmber mumbles quietly, \"<i>Next time, fertilize it for me will you?</i>\"  You start at that; did she really just say it aloud?  But, knowing her temper, you decide against asking.  ");
			//git a dragon egg, small libido-based lust damage
			dynStats("lus", 10 + player.stats.lib / 10);
			inventory.takeItem(consumables.DRGNEGG, camp.returnToCampUseOneHour);
		}
		//(Medium Affection)
		else if (emberAffection() < 75) {
			MainScreen.text("\n\nEmber gasps");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 1) MainScreen.text(" and her cheeks grow red with embarrassment");
			MainScreen.text(".  \"<i>T-This...</i>\"  She can't quite bring herself to finish the sentence and settles for just looking at the ground.");
			MainScreen.text("\nYou apologize, but assure her that it really would be helpful if she could provide you with just one of her barren eggs.");
			MainScreen.text("\n\nEmber seems to cringe when you say 'barren eggs' but she remains still.  Finally, after what feels like an eternity of awkward silence, Ember sighs.  \"<i>Fine... I'll lay one egg for you.  Do you... err... want to...</i>\"  You quirk your head and ask her to repeat that; you didn't catch it.");
			MainScreen.text("\n\nEmber bites her lips and says once more, a bit louder this time, \"<i>Would you like to watch?</i>\"");
			MainScreen.text("\n\nYou blink at the offer, then give her your most winning smile.  You could agree, or just smooth-talk your way out of it.");
			//[Watch][Fob Off]
			simpleChoices("Watch", watchMediumAffectionEmberEggLay, "Don't Watch", dontWatchEmberLayEgg, "", null, "", null, "", null);
		}
		//(High Affection)
		else {
			MainScreen.text("\n\nDespite Ember's growing embarrassment, she smirks and looks you over.  \"<i>F-Fine... but I expect you to help with it.</i>\"");
			MainScreen.text("\n\nYou ask her what she has in mind.");
			MainScreen.text("\n\n\"<i>Don't be silly!  You know what I mean...</i>\"  Ember's face looks as pinched as a snake's; some moisture runs down her thighs");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(", and her cock points you accusingly");
			MainScreen.text(".");
			MainScreen.text("\n\nShe leads you to a secluded spot and sits down on a nearby stump, then exhales and gathers herself, slowly spreading her legs to give you access to her most intimate parts.  \"<i>L-Look...</i>\" Ember insists, spreading her netherlips apart giving you a perfect view of her pink, moist, fuckhole.  \"<i>L-Like what you see?</i>\"");
			MainScreen.text("\n\nYou tell her that you do, though you can't resist commenting that she's moving a little faster than usual.  Ember looks at you through half-lidded eyes.  \"<i>And you're not moving fast enough.</i>\"  With a grin at her unusual good humor, you approach her and take up station between her thighs.  You ask if she wants your hands or your tongue to 'help' her this time.");
			MainScreen.text("\n\n\"<i>J-just get started... before I change my mind about this...</i>\"");
			MainScreen.text("\n\nWell, no point leaving her hanging around.  You let your tongue roll out");
			if (player.upperBody.head.face.tongueType > TongueType.HUMAN) MainScreen.text(" and out... and out...");
			MainScreen.text(" and then lean forward to give her a great, wet, sloppy lick, straight up the center of her pussy");
			//(E.Herm:
			if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" not stopping until you have slurped your way to the very tip of her cock");
			MainScreen.text(", savoring the unmistakable taste of her intimate juices.");
			MainScreen.text("\n\nEmber gasps and moans, leaning back to voice her pleasure to the skies; her legs quiver and her claws dig into the wood; her wings spread, beating gently to help her balance herself.  \"<i>D-don't stop...</i>\" she pleads.");
			MainScreen.text("\n\nYou don't intend to, and continue to lick, playing your tongue as deeply into her depths as possible, ");
			if (player.upperBody.head.face.tongueType > TongueType.HUMAN) MainScreen.text("which is quite far indeed, ");
			MainScreen.text("caressing and stroking and playing all the tricks you can possibly think of to orally pleasure your draconic lover.  From the amount of juices beginning to seep onto your lapping tongue");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" and dribbling down her painfully stiff dick");
			MainScreen.text(", you think you're doing rather well.");
			MainScreen.text("\n\nWhen your nose bumps into her little button of pleasure Ember nearly jumps; she closes her thighs around your head, smothering you on her dripping vagina.");
			if (player.upperBody.head.face.tongueType > TongueType.HUMAN) MainScreen.text("  Right at this time, you feel something round and smooth on the tip of your tongue, gently spreading Ember's walls.  Realizing that this can only be her egg, you start trying to worm your long, sinuous tongue between it and her innermost walls, hoping to coax it out of her.");
			MainScreen.text("\n\n\"<i>It's coming!  Ah!  I'm coming!!</i>\" Ember screams, shaking with barely contained pleasure.  A flood of juices threaten to drown you, as Ember's legs hold you snug.");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("  Her cock throbs and pumps out long streams of cum to paint the ground around you two; marking it as your special place.");
			if (player.upperBody.head.face.tongueType > TongueType.HUMAN) MainScreen.text("\n\nYou can really feel her egg now, and do your best to wrap it tightly in coils of inhuman tongue.  Gently you pull and slide and wriggle it until it plops wetly out of its mother into your waiting hands; your tongue is strong and flexible, but you don't quite trust it to hold your prize aloft on its own.");
			else MainScreen.text("\n\nYou can feel the shell of Ember's egg pressing against your tongue, and you abandon your licking to start probing gently with your fingers.  Under your careful guidance, the egg slips freely from Ember's body into your grasp.");

			MainScreen.text("\n\nEmber's legs finally relax enough to let you escape... but her body slowly leans over in your direction, until she finally gives and collapses on top of you. Luckily you manage to move the egg out of the way, saving it from the pile of pleasured dragon before both of you crash into a sprawled pile on the ground.  You shake your head and smile at Ember, teasing her about how easily she just melts into a pile of mush from a little pleasure.");
			MainScreen.text("\n\nThis earns you a glare.  Ember quickly scampers up onto her feet and brushes the dirt from her scales.  \"<i>Maybe I should stop laying eggs for you then,</i>\" she remarks disdainfully.");
			MainScreen.text("\n\nYou tease her that there's no way she could give up such a convenient excuse to have you eat her out with no expectation of having to return the favor, poking your tongue out for emphasis.");
			MainScreen.text("\n\nEmber sighs, realising she's fighting a losing battle.  \"<i>At least I know what to expect when I'm finally laying a fertilized one.</i>\"  Moments after her comment, her face lights with awareness and embarrassment.  \"<i>I... I mean...</i>\"");
			MainScreen.text("\n\nYou just smile and tell her you understand exactly what she meant.  One quick kiss and you head back to the camp proper, leaving one adorably flustered dragon behind you.  ");
			//git a dragon egg, small libido-based lust damage
			dynStats("lus", 10 + player.stats.lib / 10);
			inventory.takeItem(consumables.DRGNEGG, camp.returnToCampUseOneHour);
		}
	}

	//[Fob Off]
	private dontWatchEmberLayEgg(): void {
		MainScreen.clearText();
		MainScreen.text("You take her hand and tell her that you wouldn't dream of intruding on her privacy, but ask her to think of you if she needs the inspiration.  She looks away shyly, and the barest hint of a smile breaks on her face.  Seems like she's already following your instructions.");
		MainScreen.text("\n\nShe sashays off, with a sheen of moisture between her thighs, and you seat yourself on a rock to await the result.  Over thirty minutes later, the panting dragon reappears and hands you an egg, still sticky.");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(".. it even drips with some kind of off-white fluid.");
		MainScreen.text("  \"<i>H-here's your egg.  Use it while it's fresh, okay?</i>\"  Her eyes glaze over a bit at the suggestion, and she giggles.  ");
		//git a dragon egg, no Ember affection change
		inventory.takeItem(consumables.DRGNEGG, camp.returnToCampUseOneHour);
	}

	//[Watch]
	private watchMediumAffectionEmberEggLay(): void {
		MainScreen.clearText();
		MainScreen.text("Ember fails to hide her arousal when you accept.  \"<i>Okay, then follow me.</i>\"  The two of you move into a secluded spot.  Once she is certain nobody is around to spy, Ember turns to face you");
		//(if Ember has a cock:
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(", cock poking straight out");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] > 0) MainScreen.text(" of its hiding place");
		MainScreen.text(".  \"<i>Okay... but you're only allowed to watch!  If you do anything weird, I swear I'll smack you!</i>\"");
		MainScreen.text("\n\nYou promise her that you won't do anything");
		if (player.stats.lib >= 50) MainScreen.text(" she doesn't ask you to, beaming a salacious grin");
		MainScreen.text(".");
		MainScreen.text("\n\nEmber sits down atop a rock nearby and spreads her legs, giving you a perfect view of her moist slit, dripping with excitement at the act she's about to perform.  Her hands start massaging, slowly tracing the outer labia, evoking soft moans from her with each caress.  With one hand, she slowly spreads her netherlips apart; moisture leaks copiously, giving her pussy and fingers alike a shiny, slick look.");
		MainScreen.text("\n\nOnce she's fully exposed, you gaze inside her pink vulva as it blooms like a flower; a flower that contracts with each moan of pleasure emanating from Ember, as if inviting you to caress it.");
		MainScreen.text("\n\nYour earlier promise to behave yourself gets increasingly harder to keep as Ember's show turns you on more and more");
		if (player.gender > 0) {
			MainScreen.text("; ");
			if (player.lowerBody.cockSpot.hasCock()) {
				MainScreen.text("the bulge inside your [armor]");
				if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" and ");
			}
			if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("wetness gathering in your own pussy");
			MainScreen.text(" more than indicate");
			if (!player.lowerBody.cockSpot.hasCock() || !player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("s");
			MainScreen.text(" your desire to break your promise.");
		}
		MainScreen.text("\n\nOne of Ember's clawed fingers slowly penetrates her depths, sinking in all the way to the knuckle and drawing a long throaty moan from her.  She sets upon a steady pace; humming with each thrust inside.  Soon, you realize her pumps are becoming shallower and more erratic, until she removes her finger; the egg's outer shell is visible, coming out of her folds.");
		MainScreen.text("\n\nThe pleasure of the act combined with that of exhibiting herself to you in such a vulnerable position nearly disables her, and she groans; feeling too good to simply stop, but too weak to continue. \"<i>[name]!  F-Finish me off!</i>\" she gasps in the throes of passion.");
		MainScreen.text("\n\nHoping she won't change her mind about this afterwards, you step forward and begin to stroke and trace your fingers gently across her netherlips, tickling her clit");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" and caressing her throbbing cock");
		MainScreen.text(".");
		MainScreen.text("\n\nWith a deep moan, Ember shakes and orgasms.");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("  Ropes of jism spew out of her cock, arching into the air to hit the ground nearby.");
		MainScreen.text("  The egg plugs her wet pleasure hole, preventing any liquid from escaping, until finally with a wet, squelching pop,it flies out of her pussy and into your waiting hands; releasing a flood of juices.");
		MainScreen.text("\n\nWith a final sigh of relief, Ember collapses, sliding off the rock and onto the dry ground beneath.");
		MainScreen.text("\n\nYou appraise the egg briefly, then return your attention to the source.  You can hardly believe that your repressed dragon would actually do something like this; looking at her, sprawling there in the grass with her legs splayed");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" and her cock hanging out");
		MainScreen.text(", it's hard to see her as the same angrily defensive ice queen from before.");
		MainScreen.text("\n\nSlowly Ember sits up, licking her lips and panting airily.  \"<i>Phew... I made it...</i>\"");
		MainScreen.text("\n\nYou can't resist telling her that she most certainly did, holding her newly laid egg up to admire, then gallantly offering your hand to help her get back up to her feet.  Ember accepts and slowly balances herself, but then, as she holds you wet hand, the memory of how the whole ordeal ended hits her.");
		MainScreen.text("\n\n\"<i>Y... y-you... you touched me... my... you touched...</i>\"");
		MainScreen.text("\n\nYes, you did, because she asked and she seemed to need your help, as you point out.  Ember doesn't bother coming up with something to say, she just unfurls her wings and jumps into the air with a gust of wind.");
		MainScreen.text("\n\nYou shake your head and sigh softly.  ");
		//git an egg, moderate lib-based lust damage, Ember affection up
		inventory.takeItem(consumables.DRGNEGG, camp.returnToCampUseOneHour);
		emberAffection(5);
	}

	//Get Milk
	private getMilkFromEmber(): void {
		MainScreen.clearText();
		MainScreen.text(images.showImage("ember-drink-her-milk"));
		MainScreen.text("You think for a few moments, then find your gaze drawn to Ember's round, firm");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text(", scaly");
		MainScreen.text(" breasts, " + emberMF("his", "her") + " perky nipples bare as always and enticing you.  With a repressed smile, you ask if " + emberMF("he", "she") + "'ll let you suckle " + emberMF("his", "her") + " milk.");
		//Summary:
		//Usable only through Follower menu
		//Restore Health and Fatigue
		//May cause/intensify heat/rut if PC is a dragon-morph
		//Restores the use of the PC's Dragonbreath weapon


		//(Low Affection)
		if (emberAffection() <= 25) {
			MainScreen.text("\n\n\"<i>What!?  Why should I let you do that!?  Aren't you a bit too old to be suckling from a teat?</i>\"");
			MainScreen.text("\n\nYou tell " + emberMF("him", "her") + " the honest truth; you're thirsty and " + emberMF("he", "she") + " looks absolutely delicious.  Besides, doesn't " + emberMF("he", "she") + " feel even the slightest bit pent up?  Aren't " + emberMF("his", "her") + " breasts simply aching with how full and heavy they are from all the weighty milk sloshing around inside them?  You're offering to help drain them and make " + emberMF("him", "her") + " feel better...");
			MainScreen.text("\n\nEmber's face clouds at your comments.  \"<i>They do feel full sometimes... but these are not meant for you!</i>\"  " + emberMF("His", "Her") + " hands cover " + emberMF("his", "her") + " breasts protectively.");
			MainScreen.text("\n\nYou ask who they are meant for, then - " + emberMF("he", "she") + " can't drink from them " + emberMF("him", "her") + "self and ");
			//noEmberkids:
			if (Flags.list[FlagEnum.EMBER_EGGS] == 0 && emberChildren() == 0) MainScreen.text(emberMF("he", "she") + " has no offspring to feed them with");
			//(1+ EmberEggs:
			else if (Flags.list[FlagEnum.EMBER_EGGS] > 0) MainScreen.text(emberMF("his", "her") + " children haven't hatched yet");
			else MainScreen.text(emberMF("his", "her") + " children don't drink nearly enough to properly empty " + emberMF("him", "her") + "), so is " + emberMF("he", "she") + " just going to suffer with " + emberMF("his", "her") + " breasts so full and aching?");
			MainScreen.text("\n\nEmber's eyes sink, deep in thought; finally, with a sigh, " + emberMF("he", "she") + " concedes.  \"<i>Fine.  But if you do anything weird I swear I'll hit you!</i>\"");
			MainScreen.text("\n\nYou promise to behave yourself, and tell " + emberMF("his", "her") + " to get comfortable so that you can nurse together.");
			MainScreen.text("\n\nEmber reclines on a pile of leaves inside her den, back against the wall, then gently drops " + emberMF("his", "her") + " arms to " + emberMF("his", "her") + " side.  " + emberMF("His", "Her") + " distraction deepens as " + emberMF("he", "she") + " says, \"<i>Let's get this over with, then...</i>\"");
			MainScreen.text("\n\nYou approach and seat yourself in " + emberMF("his", "her") + " lap, gently reaching up to stroke " + emberMF("his", "her") + " bountiful, milk-filled breasts.");
			MainScreen.text("\n\nEmber flinches at the initial contact but remains calm as you continue to touch and caress " + emberMF("his", "her") + " bosom, feeling the weight and the smoothness of the ");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text("scales");
			else MainScreen.text("skin");
			MainScreen.text(".  " + emberMF("He", "She") + " lets out a cute gasp of pleasure, eyes darting furiously around to look at anything but you. You beam a smile and " + emberMF("he", "she") + " turns her head away in embarrassment.  \"<i>T-They're not getting any emptier like this, y'know!?</i>\"");
			MainScreen.text("\n\nYour ministrations continue unperturbed until " + emberMF("his", "her") + " nipples perk up and begin to weep the first drops of milk; then, seeing " + emberMF("he", "she") + " is ready, you gently close your lips around " + emberMF("his", "her") + " first nipple.  You savor the flavor as it hits your tongue; it's cool and refreshing, crisp and sweet and with a taste you can't quite place... this must be Ember's personal spice.  It's so different from anything else.  It tastes more sweetish, and you pull harder.");
			MainScreen.text("\n\n\"<i>Ah!  This feels nice... don't you dare stop.</i>\"");
			MainScreen.text("\n\nYou need no further encouragement to bury your face fully into " + emberMF("his", "her") + " bosom and start suckling in earnest.  Though you can relish the temperature contrast between the two of you with " + emberMF("his", "her") + " flesh being pleasantly cooler than yours, your focus is on the milk.");
			//(If Ember is male/herm)
			if (Flags.list[FlagEnum.EMBER_GENDER] != 2) {
				MainScreen.text("\n\nYou feel something poking your ");
				if (!player.lowerBody.isTaur()) MainScreen.text("belly");
				else MainScreen.text("back");
				MainScreen.text(" and look down at Ember's engorging shaft.  Smiling around Ember's nipple, you start to gently stroke and squeeze the partially-erect draconic dick " + emberMF("he", "she") + "'s presenting.  If " + emberMF("he", "she") + "'s enjoying this so much, well, why not make it all the more fun for " + emberMF("him", "her") + "?");
			}
			//(else)
			else {
				MainScreen.text("\n\nEmber hums and moans as you continue to suckle; one of her hands slowly snakes its way under you to touch her soft netherlips.  In a moment of boldness, you reach down to push her hand away and stroke her moist folds yourself.  Ember doesn't protest, she just settles down and lets you continue your caresses on the new target.");
			}
			MainScreen.text("\n\nSuddenly, as realization dawns, Ember gets up, knocking you flat on your back. \"<i>W-what do you think you're doing!?  I didn't say you could touch me!</i>\"");
			MainScreen.text("\n\nYou apologize, but point out that it looked like " + emberMF("he", "she") + " was enjoying the contact as much as you were enjoying her milk.");
			MainScreen.text("\n\nEmber flushes with embarrassment.  \"<i>I-I... That's it!  No more milk for you!</i>\" " + emberMF("he", "she") + " declares, hauling you upright and shooing you out of her den.");
			MainScreen.text("\n\nYou shake your head with good temper.  Still, you got your fill of her milk, and you feel refreshed and renewed, new vitality flowing through your veins.");
			//(PC's D.Breath timer = not ready: Your throat feels soothed as the scratching and soreness die down; you feel like you could shout to the mountaintops!)
			if (player.statusAffects.has("DragonBreathCooldown")) {
				player.statusAffects.remove("DragonBreathCooldown");
				MainScreen.text("  Your throat feels soothed as the scratching and soreness die down; you feel like you could shout to the mountaintops!");
			}
			//(no new PG, PC has dragon-morph status and is opposite Ember's sex:
			if (rand(2) == 0 && player.dragonScore() >= 4 && player.gender > 0 && (player.gender != Flags.list[FlagEnum.EMBER_GENDER] || (player.gender == 3 && Flags.list[FlagEnum.EMBER_GENDER] == 3))) {
				MainScreen.text("  Though, a sudden swell of lust races through your ");
				if (player.lowerBody.cockSpot.hasCock()) {
					MainScreen.text(CockDescriptor.describeCock(player, 0));
					if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" and ");
				}
				if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)));
				MainScreen.text(", making you wish Ember hadn't run you off.  All you can think about now is fucking " + emberMF("his", "her") + "; ");
				if (player.lowerBody.cockSpot.hasCock() && Flags.list[FlagEnum.EMBER_GENDER] >= 2) {
					MainScreen.text("filling her womb with your seed and fertilizing her eggs");
					if (player.lowerBody.vaginaSpot.hasVagina() && Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" even while ");
				}
				if (player.lowerBody.vaginaSpot.hasVagina() && (Flags.list[FlagEnum.EMBER_GENDER] == 3 || Flags.list[FlagEnum.EMBER_GENDER] == 1)) MainScreen.text("taking that hard, spurting cock inside your own " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)));
				MainScreen.text("... too late, you realize that <b>Ember's milk has sent your draconic body into ");
				if (player.lowerBody.cockSpot.hasCock() && Flags.list[FlagEnum.EMBER_GENDER] >= 2) {
					MainScreen.text("rut");

					player.goIntoRut(false);
				}
				else {
					MainScreen.text("heat");

					player.goIntoHeat(false);
				}
				MainScreen.text("!</b>");
			}
		}
		//(Medium Affection)
		else if (emberAffection() < 75) {
			MainScreen.text("\n\n\"<i>Okay.  I guess I can give you a treat... but no funny ideas!</i>\"  That said, Ember walks into " + emberMF("his", "her") + " den to settle on a pile of soft leaves against the cave wall.");
			MainScreen.text("\n\nYou promise to behave yourself, and seat yourself in " + emberMF("his", "her") + " lap, reaching up to stroke " + emberMF("his", "her") + " bountiful, milk-filled breasts.");
			MainScreen.text("\n\nEmber's eyes widen as " + emberMF("he", "she") + " gasps in pleasure at your initial contact.  \"<i>N-Not so fast!  At least give me a warning before you start.  They're sensitive...</i>\"");
			MainScreen.text("\n\nYou apologize... though now that you know " + emberMF("he", "she") + " likes this, you can't resist teasing " + emberMF("him", "her") + " by massaging " + emberMF("his", "her") + " breasts and twiddling " + emberMF("his", "her") + " nipples in the most arousing manner you can.");
			MainScreen.text("\n\nEmber purrs for most of the treatment, and every time your fingers brush against " + emberMF("his", "her") + " nipples she gasps in pleasure.  \"<i>What are you doing?  Ah!  Are you going to get started or not?  If you keep this up...</i>\"");
			//(if Ember has a dick)
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) {
				MainScreen.text("\n\nYou feel a poke; looking down, you spot Ember's shaft, poking at you.  When you look up again, " + emberMF("his", "her") + " face goes completely tight with embarrassment.  \"<i>This is your fault!</i>\" Ember declares dryly, trying to hide the fact that " + emberMF("he", "she") + "'s enjoying this a bit too much.");
			}
			else {
				MainScreen.text("\n\nEmber groans and squirms, and you feel a bit of wetness underneath you.  Reaching down, you feel the moisture that's gathered from her obvious enjoyment of your ministrations.  You look up at her and her face goes tightens with embarrassment.  \"<i>This is your fault!</i>\" Ember declares dryly, trying to hide the fact that she's enjoying this a bit too much.");
			}
			MainScreen.text("\n\nYou smile and tell her that you'll take full responsibility.  Deciding you've had enough foreplay for now and seeing that milk has started to seep from " + emberMF("his", "her") + " flush, aroused nipples, you forego any further conversation by leaning in and capturing the nearest one in your mouth.");
			MainScreen.text("\n\nEmber's rumbling purr as you finally get started on your task vibrates your chosen breast; the yielding ");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 1) MainScreen.text("flesh");
			else MainScreen.text("scales");
			MainScreen.text(" sloshing with their ever-full load.  It appears that the more you drink, the more milk Ember will produce; you don't have time to ponder such things at the moment, though, as the tasty flow of sweet, refreshing dragon milk spilling into your mouth to settle on your hungry belly is all that you can worry about at the moment.");
			MainScreen.text("\n\nAt one point Ember's arms encircle you, wrapping you in a soft embrace so very unlike " + emberMF("his", "her") + " brash personality.  You almost lose yourself in Ember's soft mounds, and from the looks of things; Ember seems to be similarly absorbed in nursing you with " + emberMF("his", "her") + " breast milk.  You happily give yourself over to " + emberMF("his", "her") + " desires, burying your " + HeadDescriptor.describeFace(player) + " in the pleasant coolness of " + emberMF("his", "her") + " bosom and glutting yourself.");
			MainScreen.text("\n\nFinally, however, your appetite dwindles; you have stuffed yourself with as much as you can bear and so you stop suckling, letting " + emberMF("his", "her") + " nipple pop out between your lips to continue dribbling milk down your face and chest, cuddling into the blissed-out dragon while you have the excuse.");
			MainScreen.text("\n\nEmber stops " + emberMF("his", "her") + " humming and sighs; part in relief and part in disappointment.  \"<i>Done?  Have you had enough?</i>\"");
			MainScreen.text("\n\nYou admit to " + emberMF("him", "her") + " that you are full, and thank " + emberMF("him", "her") + " for sharing the generous bounty of delicious milk.");
			MainScreen.text("\n\nEmber can't hide the faintest of smiles that graces " + emberMF("his", "her") + " scaly face.  You yelp softly as you feel a sharp prick against your belly; when you feel it again, you jump out of Ember's lap to reveal the clawed finger prodding you.  \"<i>Payback for teasing me earlier.  And don't think I'll be feeding you my milk everytime you ask,</i>\" " + emberMF("he", "she") + " finishes, with a small puff of smoke.");
			MainScreen.text("\n\nYou can't resist pointing out that " + emberMF("he", "she") + " certainly seemed eager to let you drink your fill, and you didn't hear any complaining over " + emberMF("his", "her") + " purring.  Before " + emberMF("he", "she") + " can rebut that, you turn and leave the dragon in " + emberMF("his", "her") + " den.");
			MainScreen.text("\n\nThe drink you got did you plenty of good; you feel refreshed and renewed, new vitality flowing through your veins.");
			if (player.statusAffects.has("DragonBreathCooldown")) {
				player.statusAffects.remove("DragonBreathCooldown");
				MainScreen.text("  Your throat feels soothed as the scratching and soreness die down; you feel like you could shout to the mountaintops!");
			}
			//(no new PG, PC has dragon-morph status and is opposite Ember's sex:
			if (rand(2) == 0 && player.dragonScore() >= 4 && player.gender > 0 && (player.gender != Flags.list[FlagEnum.EMBER_GENDER] || (player.gender == 3 && Flags.list[FlagEnum.EMBER_GENDER] == 3))) {
				MainScreen.text("  Though, a sudden swell of lust races through your ");
				if (player.lowerBody.cockSpot.hasCock()) {
					MainScreen.text(CockDescriptor.describeCock(player, 0));
					if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" and ");
				}
				if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)));
				MainScreen.text(", making you wish Ember hadn't run you off.  All you can think about now is fucking " + emberMF("his", "her") + "; ");
				if (player.lowerBody.cockSpot.hasCock() && Flags.list[FlagEnum.EMBER_GENDER] >= 2) {
					MainScreen.text("filling her womb with your seed and fertilizing her eggs");
					if (player.lowerBody.vaginaSpot.hasVagina() && Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" even while ");
				}
				if (player.lowerBody.vaginaSpot.hasVagina() && (Flags.list[FlagEnum.EMBER_GENDER] == 3 || Flags.list[FlagEnum.EMBER_GENDER] == 1)) MainScreen.text("taking that hard, spurting cock inside your own " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)));
				MainScreen.text("... too late, you realize that <b>Ember's milk has sent your draconic body into ");
				if (player.lowerBody.cockSpot.hasCock() && Flags.list[FlagEnum.EMBER_GENDER] >= 2) {
					MainScreen.text("rut");

					player.goIntoRut(false);
				}
				else {
					MainScreen.text("heat");

					player.goIntoHeat(false);
				}
				MainScreen.text("!</b>");
			}
		}
		//(High Affection)
		else {
			MainScreen.text("\n\nEmber's tail waggles at your request even as she forces a frown, and you swear you can see ");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) {
				MainScreen.text("the faintest hint of " + emberMF("his", "her") + " cock ");
				if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] > 0) MainScreen.text("emerging");
				else MainScreen.text("hardening");
			}
			else MainScreen.text("small beads of moisture gathering on her honeypot");
			MainScreen.text(".  \"<i>Ok... I suppose I could use some help draining myself, but no funny moves!</i>\"");
			MainScreen.text("\n\nYou promise that you won't try anything... so long as " + emberMF("he", "she") + " promises to do the same.");
			MainScreen.text("\n\nEmber's frown deepens.  \"<i>Don't be silly!  I would never do that!</i>\" Ember finds a nice spot by the den's wall and plops down on a pile of leaves; then " + emberMF("he", "she") + " opens " + emberMF("his", "her") + " arms invitingly and says, \"<i>Come on then, let's get this over with.</i>\"");
			MainScreen.text("\n\nWith a wide smile on your face, you approach and seat yourself, noting " + emberMF("his", "her") + " nipples are already starting to dribble milk.  You wonder if you should play with " + emberMF("him", "her") + " first or just start suckling...");

			MainScreen.text("\n\nYou don't need to wonder for long; a not-so-innocent caress on your [butt] is all the direction you could want.  You grin wickedly and start to squeeze " + emberMF("his", "her") + " impressive bosom, telling " + emberMF("him", "her") + " that " + emberMF("he", "she") + " must be so proud to be so big and round, and yet so firm, without the slightest hint of sagging or flab in " + emberMF("his", "her") + " breasts.");
			MainScreen.text("\n\nEmber blows a puff of smoke in confidence.  \"<i>Of course I'm proud.  Bet you don't see girls with breasts as perfect as mine.</i>\"");
			MainScreen.text("\n\nYou admit you don't, then lean in to kiss " + emberMF("his", "her") + " seeping nipple, sucking the teat in between your lips and expertly rolling and sliding it between them, tickling its tip and savoring the hints of " + emberMF("his", "her") + " sweet, cool, naturally-spiced milk.");
			MainScreen.text("\n\nBut your focus is on playing with your dragon right now, rather than straightforward drinking, and so one hands creeps purposefully towards ");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) {
				MainScreen.text(emberMF("his", "her") + " erecting dragon-prick, gently stroking its");
				if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] > 0) MainScreen.text(" strangely ridged, almost scaly");
				MainScreen.text(" surface");
			}
			else MainScreen.text("her gently-dripping cunt, sliding in between the lips to stroke the wet interior");
			MainScreen.text(".");

			MainScreen.text("\n\nEmber's grip on your [butt] tightens sharply.  \"<i>What are you - ah! doing?</i>\"");
			MainScreen.text("\n\nWith an innocent look, you start to suckle in earnest, even as your hand continues to ");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("stroke " + emberMF("his", "her") + " shaft");
			else MainScreen.text("probe gently into her slick depths");
			MainScreen.text(".  Ember squirms and moans, humming softly, while you suckle and tease, delighting as much in the pleasure you are giving as in the delicious milk cascading down your thirsty throat.");

			MainScreen.text("\n\n\"<i>S-so this is how it is, huh?</i>\"  Ember suddenly pulls your head up and delivers a kiss straight to your lips, forcing " + emberMF("his", "her") + " tongue inside your mouth to lap up " + emberMF("his", "her") + " own milk.  When " + emberMF("he", "she") + "'s sure " + emberMF("he", "she") + "'s got everything; Ember drops you again.");

			MainScreen.text("\n\n\"<i>If you're not going to behave, then no more milk for you.</i>\"  The dragon smiles triumphantly.");
			MainScreen.text("\n\nRepositioning yourself where " + emberMF("he", "she") + " dropped you for greater comfort, you smile and adopt your most innocent expression, then go back to your drinking.");
			MainScreen.text("\n\nThis time, you focus on simply drinking from Ember's bountiful breast and the wonderful taste of " + emberMF("his", "her") + " milk.  You don't think you could ever get tired of this... the milk is sweet, refreshing and just a tad spicy.  You can't help but compare how like " + emberMF("him", "her") + " it is.");

			MainScreen.text("\n\nThe soft purrs that accompany each suckle and the soft caresses on your body, bringing you ever closer to these two motherlodes of Ember-flavoured treasure, only serve to enhance the whole experience.");

			MainScreen.text("\n\nEventually, your swallows of the rich, freely-flowing, creamy dragon-milk cease as your stomach fills up.");
			if (player.statusAffects.has("DragonBreathCooldown")) {
				player.statusAffects.remove("DragonBreathCooldown");
				MainScreen.text("  Your throat feels soothed as the scratching and soreness die down; you feel like you could shout to the mountaintops!");
			}
			MainScreen.text("  You tell your dragon that you're finished.  You're up and turning to leave when a looping tail around your waist stops you.");

			MainScreen.text("\n\n\"<i>You're not going anywhere just yet.  You still have one other breast to empty.</i>\"  Ember smiles, despite " + emberMF("his", "her") + " mockingly stern face.");

			if (player.stats.cor < 50) {
				MainScreen.text("\n\nYou look at " + emberMF("him", "her") + " and, despite the faint protests from your stomach, reason that you can't disappoint the dragon-" + emberMF("boy", "girl") + ".  Besides, you know what " + emberMF("his", "her") + " temper is like... you resettle and begin suckling at " + emberMF("his", "her") + " other breast.");

				MainScreen.text("\n\n\"<i>Ah!  That's good...</i>\"  Ember embraces you in a tight hug, bringing you as close to " + emberMF("him", "her") + " as possible.  You smile around your nipple and enjoy the sensation, languidly suckling from " + emberMF("him", "her") + " less out of an honest thirst for the milk and more to prolong your excuse to be so close to your strangely fuzzy dragon.");
				MainScreen.text("\n\nBy the time you're done Ember has melted into a purring pile, content with simply letting you sit on " + emberMF("his", "her") + " lap.  \"<i>Don't think that just because it felt good, I'm going to let you do this whenever you feel like.</i>\"");
				MainScreen.text("\n\nYou tell " + emberMF("him", "her") + " you wouldn't dream of thinking that, sneaking an opportunity to kiss " + emberMF("him", "her") + " while " + emberMF("his", "her") + " guard is so lax.  Even as you do, your stomach begins to gripe, trying and failing to digest the slow-to-process milk before it begins to turn.  You're going to be sick later, that's for sure...");
				if (player.stats.tou > 40) player.stats.tou += -1;
			}
			//(corrupt jerk)
			else {
				MainScreen.text("\n\nOh, of all the... your stomach gurgles in protest as you contemplate drinking twice what you expected.  Not particularly warming to the idea of throwing up as the undigested milk begins to curdle in your gut, you only assume the motions of lowering yourself into Ember's lap again and taking the nipple into your mouth.");
				MainScreen.text("\n\nThe milk begins to flow immediately, and you pop the teat out again, to exclamations from your lover.  \"<i>Hey, what did I just say?</i>\" the dragon demands.  \"<i>Finish your drink!</i>\"  Instead, you begin pulling and kneading the breast, pointing the nipple at the ground and milking the dragon for all " + emberMF("he", "she") + "'s worth.  \"<i>Y-you're wasting it!  Stop it!</i>\"  Despite the protest, Ember moans breathily, just as taken with the work of your hands as " + emberMF("he", "she") + " was by your mouth.");
				MainScreen.text("\n\n\"<i>Now, now,</i>\" you admonish.  \"<i>I couldn't possibly drink all of your bounty; I'm just thinking about the pressure.</i>\"  Dexterously, you twitch at and tweak the little nub, squirting out the milk into a puddle under Ember's butt.");
				MainScreen.text("\n\n\"<i>D-don't think I'm okay with you spilling my milk like this,</i>\" " + emberMF("he", "she") + " retorts, a tear coming to " + emberMF("his", "her") + " eye at one particularly strong yank.  \"<i>I just... don't want to feel all lopsided and awkward!  It would make me fly funny...</i>\"");
				MainScreen.text("\n\nYeah, yeah.  You finish draining the second breast and then lift it, planting a kiss on the sensitized nipple.");
			}
			//merge wuss and jerk forks
			MainScreen.text("\n\nEmber gets so flustered that " + emberMF("he", "she") + " just stares at you in stunned silence, wearing a goofy smile.  \"<i>Wha... you know, there's no point in saying anything.  I know you'll just sneak another opportunity like this in the future... doesn't mean I won't make you pay for this when I catch you later.</i>\"");
			MainScreen.text("\n\nYou whisper into her ear that you're looking forward to it, and gently raise yourself from " + emberMF("his", "her") + " lap to leave.");
			//(no new PG, PC has dragon-morph status and is opposite Ember's sex:
			if (rand(2) == 0 && player.dragonScore() >= 4 && player.gender > 0 && (player.gender != Flags.list[FlagEnum.EMBER_GENDER] || (player.gender == 3 && Flags.list[FlagEnum.EMBER_GENDER] == 3))) {
				MainScreen.text("  Though, a sudden swell of lust races through your ");
				if (player.lowerBody.cockSpot.hasCock()) {
					MainScreen.text(CockDescriptor.describeCock(player, 0));
					if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" and ");
				}
				if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)));
				MainScreen.text(", making you wish Ember hadn't run you off.  All you can think about now is fucking " + emberMF("his", "her") + "; ");
				if (player.lowerBody.cockSpot.hasCock() && Flags.list[FlagEnum.EMBER_GENDER] >= 2) {
					MainScreen.text("filling her womb with your seed and fertilizing her eggs");
					if (player.lowerBody.vaginaSpot.hasVagina() && Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" even while ");
				}
				if (player.lowerBody.vaginaSpot.hasVagina() && (Flags.list[FlagEnum.EMBER_GENDER] == 3 || Flags.list[FlagEnum.EMBER_GENDER] == 1)) MainScreen.text("taking that hard, spurting cock inside your own " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)));
				MainScreen.text("... too late, you realize that <b>Ember's milk has sent your draconic body into ");
				if (player.lowerBody.cockSpot.hasCock() && Flags.list[FlagEnum.EMBER_GENDER] >= 2) {
					MainScreen.text("rut");

					player.goIntoRut(false);
				}
				else {
					MainScreen.text("heat");

					player.goIntoHeat(false);
				}
				MainScreen.text("!</b>");
			}
		}
		emberAffection(1);
		doNext(camp.returnToCampUseOneHour);
		//reset Dragonbreath counter to ready, increase lust slightly if low or med affection, add heat/rut if high dragon-score, damage toughness slightly if high affection and low PC corruption
		if (emberAffection() < 75) player.stats.lust += 20;
		fatigue(-50);
		HPChange(player.maxHP() * .33, false);
	}

	//Sparring text outputs (Z) (FENCODED TO HERE)
	//PC shouldn't get gems for this fight, XP shouldn't be a problem with the new level scaled encounter system.
	//Winning gets you affection.
	private decideToSparEmbra(): void {
		MainScreen.clearText();
		MainScreen.text("You feel like you could use some practice; just to be ready for whatever you stumble upon when adventuring, and ask Ember how " + emberMF("he", "she") + "'d feel about sparring with you.");
		//(Low Affection)
		if (emberAffection() <= 25) {
			MainScreen.text("\n\n\"<i>Ha!  You have to be joking.  We both know you'll end up hurting yourself.</i>\"");
			MainScreen.text("\n\nIntent on proving " + emberMF("him", "her") + " wrong, you brandish your [weapon].");
			MainScreen.text("\n\n\"<i>Well, if you're so set on being knocked about...</i>\"  Ember leads you to an isolated clearing on the outskirts of the camp and assumes a battle pose.");
		}
		//(Medium Affection)
		else if (emberAffection() < 75) {
			MainScreen.text("\n\n\"<i>Are you sure?  I should have you know that I won't be holding back at all!</i>\" Ember warns you, assuming " + emberMF("his", "her") + " battle stance.");
			MainScreen.text("\n\nThat's exactly what you're expecting of " + emberMF("him", "her") + ".  You need to get strong, and " + emberMF("he", "she") + "'s the best sparring partner you could hope for.");
			MainScreen.text("\n\nEmber smiles at you.  \"<i>Ha!  Flattery won't earn you any mercy!  So get ready!</i>\"");
		}
		//(High Affection)
		else {
			MainScreen.text("\n\n\"<i>Well... don't expect me to go easy on you!  We dragons are very competitive!  And I don't mind beating you up, even if you are my friend!</i>\" Ember warns you, dropping into " + emberMF("his", "her") + " battle stance.");
			MainScreen.text("\n\nYou grin at " + emberMF("him", "her") + " and tell " + emberMF("him", "her") + " to bring it on - you're too psyched up to be caught off guard by the dragon openly calling you a friend.");
		}
		startCombat(new Ember());
	}

	public beatEmberSpar(): void {
		MainScreen.clearText();
		if (emberAffection() <= 25) {
			MainScreen.text("Ember lies on " + emberMF("his", "her") + " back, while you stand over the defeated dragon triumphantly.  You extend a helping hand, intent on pulling " + emberMF("him", "her") + " up, but " + emberMF("he", "she") + " bats it away, flinching in shame at " + emberMF("his", "her") + " defeat.");
			MainScreen.text("\n\n\"<i>I don't need your help you... you... cheater!</i>\"");
			MainScreen.text("\n\nCome again?  You won this fight fair and square.  It's " + emberMF("his", "her") + " own fault for underestimating you.");
			MainScreen.text("\n\n\"<i>Yeah, fine!  Maybe I was wrong, but you still cheated!  You attacked me while I was distracted!  That's cheating!</i>\"  Ember doesn't even give you time to answer before getting up and taking wing. \"<i>You won't get so lucky next time!</i>\" " + emberMF("he", "she") + " calls down to you.");
			MainScreen.text("\n\nYou sigh in disappointment; you're not sure why you expected Ember to be less of a sore loser, but you did.  On the bright side, maybe " + emberMF("he", "she") + "'ll keep that attitude in check from now on...");
			MainScreen.text("\n\n\"<i>Argh!  I'll win next time!</i>\" comes the yell from the distance.");
			MainScreen.text("\n\nMaybe not.");
			//(+Affection)
			emberAffection(10);
		}
		//Medium affection
		else if (emberAffection() < 75) {
			MainScreen.text("Ember lies on " + emberMF("his", "her") + " back, while you stand over the defeated dragon triumphantly.  You extend a helping hand, intent on helping " + emberMF("him", "her") + " up; " + emberMF("he", "she") + " takes it.");
			MainScreen.text("\n\n\"<i>You won this time... but you just got lucky!  Don't think you'll beat me next time!</i>\"");
			MainScreen.text("\n\nYou'd certainly hope " + emberMF("he", "she") + "'d put up a better fight the next time... or was " + emberMF("he", "she") + " taking it easy on you just now?");
			MainScreen.text("\n\nEmber glares at you.  \"<i>Are you mocking me?  I never hold back!  Ever!</i>\"");
			MainScreen.text("\n\nYou smile and strike a pose.  If that's the case, you're certainly getting better.");
			MainScreen.text("\n\nEmber snorts a small puff of smoke.  \"<i>Yeah, fine... I still say you got lucky!  If I hadn't been distracted it would be me helping you up!</i>\"");
			MainScreen.text("\n\n" + emberMF("He", "She") + " puffs again and turns on " + emberMF("his", "her") + " heels, walking away; although " + emberMF("he", "she") + " looks mad, the slight bounce to " + emberMF("his", "her") + " step lets you know that " + emberMF("he", "she") + " actually enjoyed your little sparring session.");
			//(+ Affection)
			emberAffection(8);
		}
		//High affection
		else {
			MainScreen.text("Ember lies on " + emberMF("his", "her") + " back, while you stand over the defeated dragon triumphantly.  You extend a helping hand, intent on helping " + emberMF("him", "her") + " up; " + emberMF("he", "she") + " gladly accepts your help.");
			MainScreen.text("\n\n\"<i>Okay... I guess you have some skill, after all,</i>\" Ember admits.  \"<i>Next time I'm beating you up, it's a promise!</i>\"  You smile, knowing just how much pride the dragon had to swallow, and tell " + emberMF("him", "her") + " that you'll see what happens when it happens.");
			MainScreen.text("\n\n\"<i>Okay, let's go back then,</i>\" Ember says, pulling you close and walking back to the camp with you.");
			emberAffection(5);
		}
		cleanupAfterCombat();
	}

	public loseToEmberSpar(): void {
		MainScreen.clearText();
		//Low affection
		if (emberAffection() <= 25) {
			MainScreen.text("Panting, you drop your fighting stance and sit on the floor, lifting a hand and saying you've had enough.");
			MainScreen.text("\n\n\"<i>Ha!  Like I said, you ended up getting yourself hurt.</i>\"");
			MainScreen.text("\n\nYeah, you might have lost this time, but you quietly promise to win, in the future.");
			MainScreen.text("\n\n\"<i>I'll be waiting.</i>\"  Ember turns on " + emberMF("his", "her") + " heels and walks back to " + emberMF("his", "her") + " den.  You decide to head back as well and rest for a while.");
			//(PC automatically rests and gets some HP back)
			emberAffection(-10);
		}
		//(Lose)
		else if (emberAffection() < 75) {
			MainScreen.text("Panting, you drop your fighting stance and sit on the floor, lifting a hand and saying you've had enough.");
			MainScreen.text("\n\n\"<i>I warned you.  I fought you with all I had, so it's no surprise that you lost!</i>\" Ember boasts proudly, extending a helping hand to you.");
			MainScreen.text("\n\nYou confess your defeat, but smile defiantly and promise next time will be different.");
			MainScreen.text("\n\nEmber smiles at you.  \"<i>Ha!  Alright, I'll make you train so you'll be able to keep your promise next time!</i>\"  The dragon turns on " + emberMF("his", "her") + " heels, and walks away, elated with " + emberMF("his", "her") + " victory.");
			emberAffection(-5);
		}
		//High Affection
		else {
			MainScreen.text("Panting, you drop your fighting stance and sit on the floor, lifting a hand and saying you've had enough.");
			MainScreen.text("\n\nEmber rushes to offer you a helping hand, concern written all over " + emberMF("his", "her") + " face.  \"<i>Are you okay?  Maybe I should've held back a little...</i>\"");
			MainScreen.text("\n\nYou shake your head fiercely; you need to get strong, and far better to lose at the hand of a friend than to some lust-mad demonic monster.");
			MainScreen.text("\n\nEmber sighs.  \"<i>Okay then... I'll be up for a rematch whenever you want.  Now let's get you back.</i>\" Ember picks you up bodily and walks with you back to the camp.");

			emberAffection(-5);
		}
		cleanupAfterCombat();
		HPChange(player.maxHP() * .33, false);
	}

	//[Catch Anal] - a dragon coq up the date (Z)
	private catchAnal(): void {
		MainScreen.clearText();
		MainScreen.text(images.showImage("ember-fucks-your-ass"));
		MainScreen.text("You contemplate Ember's somewhat dominant streak in bed and ask if " + emberMF("he", "she") + " feels in the mood to ride your ass.");
		//(Low affection)
		if (emberAffection() <= 25) {
			MainScreen.text("\n\n\"<i>What!?  That is just gross!  Not to mention, it'd never fit!</i>\"  Ember doesn't bother waiting for your reply, shooing you out of " + emberMF("his", "her") + " den.");
			doNext(camp.returnToCampUseOneHour);
			return;
		}
		//(Moderate affection)
		if (emberAffection() < 75) {
			MainScreen.text("\n\n\"<i>If that's what you really have in mind.  Maybe, just maybe... I can do that for you...</i>\" Ember replies, as " + emberMF("his", "her") + " cock peeks out");
			if (Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 1 || Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text(" of its hiding place");
			MainScreen.text(", growing slowly but steadily.");
			MainScreen.text("\n\nYou smile at " + emberMF("him", "her") + ".");
		}
		//(High affection)
		else {
			MainScreen.text("\n\nEmber swallows audibly, " + emberMF("his", "her") + " cock getting even harder at the idea.  \"<i>Alright... but I'm only doing this for you.  I take no enjoyment in this.</i>\"  Even as " + emberMF("he", "she") + " replies, the dragon's cock begins throbbing visibly.");
			MainScreen.text("\n\nYou tell " + emberMF("him", "her") + " that you understand perfectly, letting " + emberMF("him", "her") + " get away with the obvious lie.");
		}
		MainScreen.text("\n\nEmber leads you a short distance away from camp, to a small clearing next to a dried river.  " + emberMF("He", "She") + " selects a relatively lush-looking patch of grass and gestures at it.  Eagerly, you disrobe, casually throwing your [armor] aside as you present Ember with an enticing view of your " + ButtDescriptor.describeButt(player) + ",");
		//PC has balls:
		if (player.lowerBody.balls > 0) {
			MainScreen.text(" testicles swaying lightly as you arch your backside up at " + emberMF("him", "her"));
			if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" while... ");
			else MainScreen.text(".");
		}
		if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" your " + VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + " drips with every passing moment.");

		MainScreen.text("\n\nEmber greedily drinks in every last inch of your naked body, " + emberMF("his", "her") + " long tongue sliding out, already oozing with drool, before noisily being slurped back up.  \"<i>Keep in mind, I'm only doing this because you asked; I feel no pleasure from it,</i>\" " + emberMF("he", "she") + " states, despite " + emberMF("his", "her") + " raging erection.  Finally done waiting, " + emberMF("he", "she") + " sashays towards you, tail waving gently behind " + emberMF("him", "her") + ", cock bobbing up and down as " + emberMF("he", "she") + " approaches.");

		MainScreen.text("\n\nEmber stops right behind you, gently rubbing the ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] > 0) MainScreen.text("segmented");
		else MainScreen.text("smooth");
		MainScreen.text(" length of " + emberMF("his", "her") + " prick between your " + ButtDescriptor.describeButt(player) + " cheeks, letting you feel the refreshing coolness of " + emberMF("his", "her") + " pre dripping from the tip.  \"<i>This... isn't going to work,</i>\" " + emberMF("he", "she") + " growls.");

		MainScreen.text("\n\n" + emberMF("His", "Her") + " hands take hold of your butt, squeezing it slowly and firmly, caressing and massaging it with greedy anticipation.  From where you are you can't see what " + emberMF("he", "she") + "'s doing, but you can certainly hear it.  Soft, wet slurps and smacks emanate from behind you, and you realize the dragon must be licking " + emberMF("his", "her") + " own cock until it's soaked with gooey dragon-drool.");

		MainScreen.text("\n\nYou certainly didn't expect that " + emberMF("he", "she") + " would take to lubing " + emberMF("his", "her") + " penis up so... intimately.  Your arousal floods throughout your veins and fills you with giddiness at the thought of being penetrated by " + emberMF("his", "her") + " saliva-coated cock and swallowing it into your depths.");

		MainScreen.text("\n\n\"<i>I guess I can work with it now,</i>\" Ember croons, after slurping the long tongue back into " + emberMF("his", "her") + " ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0) MainScreen.text("mouth");
		else MainScreen.text("maw");
		MainScreen.text(" and sliding " + emberMF("his", "her") + " cock meaningfully against your pucker.  \"<i>You sure you want this?  Last chance to back out.</i>\"  As if you're going to turn away now, so close to filling that hunger for a nice, hot cock in your ass.  Rearing your rump up, you show " + emberMF("him", "her") + " that you're ready if " + emberMF("he", "she") + " is.");

		MainScreen.text("\n\n" + emberMF("He", "She") + " growls hungrily, and wastes no more time.  Fingers digging deeply into your [butt], " + emberMF("he", "she") + " forces the glans of " + emberMF("his", "her") + " shaft through your [asshole] and begins pushing past the opening ");
		//(PC has a virgin/tight asshole:)
		if (player.lowerBody.butt.analLooseness == 0 || player.analCapacity() < 25) MainScreen.text(", leaving both of you wincing as the sensitive head of " + emberMF("his", "her") + " cock struggles to make room for its insertion.  \"<i>I can't believe you really want me to put it here... you're so tight it almost hurts,</i>\" " + emberMF("he", "she") + " whimpers.");
		//(PC has a loose asshole:)
		if (player.analCapacity() < 50) {
			MainScreen.text(", causing you to gasp as " + emberMF("his", "her") + " ");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 1) MainScreen.text("draconic ");
			MainScreen.text("dick slips inside of you; stretching you and making you wince a bit in pain as " + emberMF("his", "her") + " spit rubs off along the interior of your anus.  \"<i>It feels pretty snug... good thing I prepared for this,</i>\" " + emberMF("he", "she") + " remarks with a gasp of pleasure.");
		}
		//(PC has a gaping asshole:)
		else {
			MainScreen.text("; the looseness of your " + ButtDescriptor.describeButthole(player) + " gives " + emberMF("him", "her") + " no resistance whatsoever as " + emberMF("he", "she") + " glides in without trouble.  \"<i>Huh... that was easier than I expected,</i>\" " + emberMF("he", "she") + " remarks in surprise.  \"<i>What have you been getting yourself into?</i>\"");
		}
		player.buttChange(32, true, true, false);

		MainScreen.text("\n\nEmber settles for a slow rhythm, pumping with slow strokes; gently guiding " + emberMF("his", "her") + " ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 1) MainScreen.text("draconic ");
		MainScreen.text("prick in and out, reaching for your deepest recesses to rub on the right spots.");

		MainScreen.text("\n\nYou gasp and moan as Ember works into you, feeling " + emberMF("him", "her") + " extending " + emberMF("his", "her") + " prick to its full length and using that as a way to push " + emberMF("himself", "herself") + " ever deeper into your bowels.");
		//(PC has prick:
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("  You can feel the dragon's member rubbing against your prostate, making " + CockDescriptor.describeMultiCockSimpleOne(player) + " jump to painful erectness, bubble pre-cum, and drool it down the shaft to pool on the ground.");
		//(PC has cunt:
		if (player.lowerBody.vaginaSpot.hasVagina()) {
			MainScreen.text("  The stimulus is starting to make you wet as well, your [vagina] drooling feminine lubricant ");
			if (player.lowerBody.balls > 0) MainScreen.text("over your [balls]");
			MainScreen.text(" to puddle underneath you");
			if (player.lowerBody.cockSpot.hasCock()) MainScreen.text(", mingling with your pre to form an ever-growing pool of mixed sexual fluids.");
		}

		MainScreen.text("\n\n\"<i>Oh!  I'm going to start moving now...</i>\" Ember says, beginning to pick up the pace and gently rock you with " + emberMF("his", "her") + " increasingly faster thrusts.  Fuck, wasn't " + emberMF("he", "she") + " already?  You groan, long and hollow, deep in your throat, savoring the deep probes.  You try to enjoy yourself, to fully immerse yourself in the sensations, but find yourself dissatisfied.  The dragon just can't seem to pick up a proper tempo, and you beg " + emberMF("him", "her") + " to speed things up, to start really giving it to you... you're not made of glass, and you won't break.");
		MainScreen.text("\n\nEmber furrows " + emberMF("his", "her") + " brows.  \"<i>You want it?  Okay, I'll give it to you...</i>\"  " + emberMF("He", "She") + " growls - or perhaps purrs?  Finally, you're going to get what you want; you can feel it as Ember rears " + emberMF("his", "her") + " hips in preparation for " + emberMF("his", "her") + " brutal assault on you, and true to " + emberMF("his", "her") + " word, the dragon finally begins pistoning into you, slapping against your butt in a lewd sonata of raw pleasure and ferocious sex.");
		//(if PC has balls:
		if (player.lowerBody.balls > 0) MainScreen.text("  " + emberMF("His", "Her") + " own balls swing into yours, and every time they connect a shrill wave of pleasure flows through you.");

		MainScreen.text("\n\nYou cry out throatily, savoring the sensation of your dragon pounding into you hard and fast.  Ember leans over you, hugging you from behind as " + emberMF("his", "her") + " hips continue to move with a mind of their own; " + emberMF("his", "her") + " tongue hangs and " + emberMF("he", "she") + " pants hotly against your ear.  \"<i>Ugh... so good.  I can't believe how this feels. Ah!... I never expected... Hah!... something like this.  C-come on [name], shake that ass for me.  Show me just how good this feels for you!</i>\"  Ember seems to be losing " + emberMF("him", "her") + "self in the sensation of your [butt].");

		MainScreen.text("\n\nYou thrust and grind your rear against Ember's cock, squeezing as best you can with your anal muscles, teasing and wringing... but, still it's not quite right.  You can't keep a smile from your voice as you playfully warn Ember that maybe you'll have to take charge and show " + emberMF("him", "her") + " just how to do you properly.");

		MainScreen.text("\n\n\"<i>Yes!!  Show me everything!  I want to see everything, feel everything, know everything about you!</i>\" Ember cries out in response.");

		MainScreen.text("\n\nOkay then; ");
		if (silly()) MainScreen.text("ASSUMING DIRECT CONTROL.");
		else MainScreen.text("time to take control.");
		MainScreen.text("  Bunching your muscles, you push up off the ground and against " + emberMF("him", "her") + ", trying to knock the dragon over onto " + emberMF("his", "her") + " back.  As lost in pleasure as " + emberMF("he", "she") + " is, Ember doesn't even try to fight back, going down with a heavy <i>thud</i>.  \"<i>Ah!  Going to take my little dragon for a ride?</i>\" " + emberMF("he", "she") + " gasps at you, too excited to care that " + emberMF("he", "she") + " isn't the one in charge anymore.");

		MainScreen.text("\n\nWith a smirk you swivel in Ember's lap, shuddering in delight at the sensations of Ember's dick sliding round inside your depths, until you are face to face with the bucking, writhing dragon.  You reach out and pinch " + emberMF("his", "her") + " nipples, trailing your fingers enticingly down " + emberMF("his", "her") + " ");
		if (pregnancy.event > 3) {
			if (Flags.list[FlagEnum.EMBER_OVIPOSITION] == 0) MainScreen.text("swollen ");
			else MainScreen.text("egg-laden ");
		}
		MainScreen.text("belly, and start to rise and sink, pistoning your ass up and down. You have total control over the sex, and you intend to use that.");

		MainScreen.text("\n\n\"<i>How does it feel?  Having my cock deep inside you?  I hope I'm good for you... ah!</i>\" " + emberMF("he", "she") + " gasps.");

		MainScreen.text("\n\n\"<i>I don't know; how does it feel to be along for the ride?</i>\" you cheekily remark.");

		MainScreen.text("\n\n\"<i>Hah!  Best... ride... ever... ah!</i>\"  Ember grunts lewdly, doing " + emberMF("his", "her") + " best to piston " + emberMF("his", "her") + " prick into your greedy ass when you're the one pinning " + emberMF("him", "her") + " down.");

		MainScreen.text("\n\nYou grin down at the thrashing dragon and with slow, deliberate motions, you lift yourself up to the point where " + emberMF("his", "her") + " cock almost pops free... and then, painfully slowly, you grind your hips down " + emberMF("his", "her") + " thighs until you have swallowed every last one of " + emberMF("his", "her") + " sixteen inches.  You repeat this again, and then again, wondering with cruel innocence how long it will take before " + emberMF("he", "she") + " pops " + emberMF("his", "her") + " cork and blows a nice load of dragon-spunk into your belly.");

		MainScreen.text("\n\n\"<i>[name]!  I'm going to cum!  Ah!  Inside this beautiful, wonderful ass of yours!  Oh!  Kiss me!  I want to feel all of you as I take you!</i>\" " + emberMF("he", "she") + " howls at you, too swept up in the emotion to care about " + emberMF("his", "her") + " image.");

		MainScreen.text("\n\nYou bend down and kiss " + emberMF("him", "her") + " as deeply as you can, flicking your tongue against " + emberMF("his", "her") + " lips and inviting " + emberMF("him", "her") + " to put " + emberMF("his", "her") + " own tongue to use.  And all the while, you continue to flex your internal muscles, massaging " + emberMF("him", "her") + " until " + emberMF("he", "she") + " has no choice but to release...");

		MainScreen.text("\n\nYou can see that perfect moment when Ember finally pops; " + emberMF("his", "her") + " eyes roll back and " + emberMF("he", "she") + " purrs in joy, sending little vibrations along your throat.  " + emberMF("His", "Her") + " cock twitches once, twice and then finally distends as it unleashes all of Ember's pent-up seed inside your bowels.  You can even feel " + emberMF("his", "her") + " balls shrinking with each gob of cum " + emberMF("he", "she") + " pumps into you, flooding you with " + emberMF("his", "her") + " enjoyment.");

		MainScreen.text("\n\nYou moan and heave at the feeling of dragon spooge surging into you, swelling your belly with Ember's rich, virile load.  The sensation is incredible, and you can't help but orgasm in turn");
		if (player.gender > 0) MainScreen.text(", ");
		if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("your cunt gushing feminine lubricant to glaze Ember's belly");
		if (player.lowerBody.vaginaSpot.hasVagina() && player.lowerBody.cockSpot.hasCock()) MainScreen.text(" and ");
		if (player.lowerBody.cockSpot.hasCock()) {
			MainScreen.text("your cock ");
			if (player.cumQ() < 250) MainScreen.text("spurting gouts of cum onto Ember's upper torso");
			else if (player.cumQ() < 1000) MainScreen.text("raining spunk across the supine dragon");
			else MainScreen.text("cascading your man-cream across your blissed-out lover until " + emberMF("he", "she") + " is completely glazed in a sperm coating");
		}
		MainScreen.text(".");

		MainScreen.text("\n\nEmber hugs you close, enjoying the afterglow");
		if (player.gender > 0) MainScreen.text(" and rubbing the results of your own orgasm against you");
		MainScreen.text(".  You sink readily into the dragon's embrace, rubbing against " + emberMF("him", "her") + ", feeling sleepy and blissful after a good, hard fuck.  Sadly, this moment of respite doesn't last long; you feel a certain discomfort as Ember's body heats up.  Looking up, you see " + emberMF("his", "her") + " eyes are wide open.  Before you can ask " + emberMF("him", "her") + " what's wrong, " + emberMF("he", "she") + " knocks you off with a start.");

		MainScreen.text("\n\n\"<i>You... y-you... you pervert!  H-how dare you make me say those... those... embarrassing things... and... and... you kissed me!  Just like that!  You pulled my tongue out of my mouth and into yours...  Ugh... Just thinking about it...</i>\"  Contrary to what Ember might be saying, you actually see " + emberMF("his", "her") + " half-erect cock getting harder as the dragon starts turning " + emberMF("him", "her") + "self back on!");

		MainScreen.text("\n\nYou smile languidly; from what you recall, " + emberMF("he", "she") + " was enjoying it.  Your hand slips between your [legs] to gently swipe up a handful of the draconic seed dripping out of your newly-filled asshole, which you hold out to " + emberMF("him", "her") + ".  You certainly didn't fill your belly by yourself.");

		MainScreen.text("\n\nEmber makes the best face of disgust " + emberMF("he", "she") + " can manage.  \"<i>Argh!  I need a bath!  Now!</i>\"  And with a quick spin, " + emberMF("he", "she") + " dashes off to find a stream.  You watch " + emberMF("him", "her") + " go and smile bitterly; you've grown used to how the dragon behaves and you know " + emberMF("he", "she") + " really did enjoy " + emberMF("him", "her") + "self, but the act might be getting a bit tiresome.  Grabbing a handful of dried grass, you wipe the worst smears of sexual fluids from your body, redress yourself, and head lazily back to the camp.");
		//(+Affection, minus lust, reset hours since cum, slimefeed)
		emberAffection(6);
		player.orgasm();
		player.stats.sens += 3;
		player.slimeFeed();
		doNext(camp.returnToCampUseOneHour);
	}

	//[Blow Ember] - your shipment of dragon dildoes has arrived
	private suckEmberCock(): void {
		MainScreen.clearText();
		MainScreen.text(images.showImage("ember-give-her-a-blowjob"));
		MainScreen.text("You stare at Ember's crotch, imagining the taste of draconic cum on your tongue.  The thought makes you lick your lips in eagerness, and you ask if Ember would enjoy having you suck on " + emberMF("his", "her") + " cock.");

		//(Low Affection)
		if (emberAffection() <= 25) MainScreen.text("\n\n\"<i>Huh... I guess I could do something like that.</i>\"\n\nYou note that, despite the lack of verbal enthusiasm, Ember's shaft is already starting to poke out of " + emberMF("his", "her") + " groin, but keep it to yourself.");
		//(Medium Affection)
		else if (emberAffection() < 75) MainScreen.text("\n\n\"<i>I suppose I would like that... don't think I accept you just because I'm okay with it though!</i>\"\n\nYou bite back a smile and insist you understand; " + emberMF("he", "she") + "'s just using you for release, that's all.  Wondering at the look of mingled hurt and gratitude in " + emberMF("his", "her") + " eyes, you ask the inscrutable dragon to lead the way.");
		//(High Affection)
		else MainScreen.text("\n\nEven before Ember replies, " + emberMF("his", "her") + " cock throbs in anticipation.  \"<i>Sure!  I'd love... I mean... I'm okay with this,</i>\" Ember says, trying to hide " + emberMF("his", "her") + " excitement, despite " + emberMF("his", "her") + " whole body conspiring against " + emberMF("him", "her") + ".");

		MainScreen.text("\n\nYou follow your draconic lover, waiting to see where " + emberMF("he", "she") + " will take you, which turns out to be a simple, dried-up clearing, dominated by a large, lichen-carpeted stump in its center.  Ember releases your hand and heads to the stump, seating " + emberMF("him", "her") + "self on it as imperiously as any " + emberMF("emperor", "empress") + " on " + emberMF("his", "her") + " throne.");

		MainScreen.text("\n\n" + emberMF("He", "She") + " spreads " + emberMF("his", "her") + " legs wide, revealing ");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1) {
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 1) MainScreen.text("his single genital slit");
			else MainScreen.text("his genitals");
		}
		else {
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 1) MainScreen.text("her twin genital slits");
			else MainScreen.text("her genitals");
		}
		MainScreen.text(", " + emberMF("his", "her") + " ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 1) MainScreen.text("draconic ");
		MainScreen.text("prick already hard and throbbing.  The dragon taps a clawed finger idly on the stump, awaiting your attention.");

		MainScreen.text("\n\nYou swiftly strip off your [armor], lest they be dirtied by what you are about to do, approach, and kneel before " + emberMF("him", "her") + ", reaching out to gently grasp the erect shaft of " + emberMF("his", "her") + " cock.  The lewdness of what you're about to do makes a perverse thrill run through you.");
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("  [EachCock] hardens, spearing aimlessly into the ground in your arousal.");
		if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("  Your [vagina] starts to seep with feminine juices, your [clit] hardening in anticipation as your excitement dribbles down onto the thirsty ground.");

		MainScreen.text("\n\n\"<i>J-just get started with it,</i>\" Ember stammers, opening " + emberMF("his", "her") + " legs wider and breathing heavily.");

		MainScreen.text("\n\nYou smile affectionately up at your lover and reach out to stroke the shaft");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 1) {
			MainScreen.text(" that is even now springing forth from " + emberMF("his", "her") + " ");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("first ");
			MainScreen.text("genital slit");
		}
		MainScreen.text(".  Up and up it rises, until all 16 inches of ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 1) MainScreen.text("dragon ");
		MainScreen.text("dick are proudly lancing towards your face, pre-cum gently bubbling from the tip and flowing down its length as you massage and lubricate it for ease of swallowing.  You cast a coy look at the dragon, who is shivering from your ministrations, but stoically refuses to show how much you are affecting " + emberMF("him", "her") + ".  Not willing to play any more if " + emberMF("he", "she") + " isn't willing to cooperate, you open your mouth and start to swallow " + emberMF("his", "her") + " cock.");

		MainScreen.text("\n\nYou take the first three or four inches inside with ease, pausing to run your tongue across the glans and the urethra, savoring the taste of draconic pre-cum; rich and thick and tangy, cool and surprisingly refreshing.  You enjoy the taste for a few long seconds, then press on, swallowing inch after inch.");

		MainScreen.text("\n\n\"<i>Rrr... S-stop teasing me and just do this,</i>\" Ember goads you.");

		MainScreen.text("\n\nEnthused by " + emberMF("his", "her") + " obvious enjoyment, you continue, swallowing as much as you can.  At around the six-inch mark, though, you find yourself forced to a halt; Ember's cock is jabbing against the back of your throat and triggering your gag reflex.  You try to calm yourself and breathe deeply, seeing that at least half " + emberMF("his", "her") + " length is still outside your mouth.");

		MainScreen.text("\n\n\"<i>D-don't force yourself.  Don't want you choking on my dick,</i>\" Ember pants, starting to lose " + emberMF("his", "her") + " cool as the pleasure escalates.");

		MainScreen.text("\n\n" + emberMF("His", "Her") + " words merely spark an ember of pride in your heart; you won't be beaten, not by this dick!  There are monster cocks out there much larger than your little dragon's, after all.  Inhaling as much as you can fit in your lungs, you thrust your head forward, straining to pierce your closing throat until, at last, it pops wetly through into your gullet.  With the head of the shaft already inside your throat, it's easier to continue sliding it in.  Inch by inch you push forward, feeling it stretching out your neck and plunging down, down inside you.  Finally, you find your nose pressed gently into Ember's ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text("scaly");
		else MainScreen.text("soft-skinned");
		MainScreen.text(" lower belly");
		if (pregnancy.event > 3) MainScreen.text(", though the gravid orb resists you");
		MainScreen.text(", and discover a surge of pride in you that you got all sixteen inches of it down.");

		MainScreen.text("\n\nLooking up to see Ember's reaction, what greets your straining eyes is a slack-jawed, panting dragon, and " + emberMF("he", "she") + "'s looking straight at you.  \"<i>You don't know how sexy you look like this...</i>\"");

		MainScreen.text("\n\nYou weakly grin around " + emberMF("his", "her") + " jaw-stretcher of a cock and start to bob your head back and forth as much as you can.  You can feel " + emberMF("his", "her") + " tip jabbing into what feels like your belly and you try to clench your throat around the inhumanly-long tool, sucking madly on the part still inside your actual mouth.");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3 && (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] > 0)) {
			MainScreen.text("  Struck by perverse inspiration, you manage to wriggle your tongue under the base of " + emberMF("his", "her") + " cock and thrust it into " + emberMF("his", "her") + " genital slit.  You guide it as deep into the strangely pussy-like orifice as you can, tickling and caressing.");
			//(DemonTongue:
			if (player.upperBody.head.face.tongueType > TongueType.HUMAN) MainScreen.text("  Your inhuman length slithers deeper and deeper inside, and you realize you can feel two rounded objects; " + emberMF("his", "her") + " balls! You're actually touching the testicles that are normally locked away inside " + emberMF("his", "her") + " body, except when " + emberMF("he", "she") + " reaches " + emberMF("his", "her") + " most aroused states...");
		}

		MainScreen.text("\n\n\"<i>Ah!  M-more... touch me more...</i>\" Ember pleads, surrendering to pleasure at your hands.");
		MainScreen.text("\n\nYou bob and swallow, slurping on " + emberMF("his", "her") + " cock and massaging it");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(", your tongue wriggling around in " + emberMF("his", "her") + " slit");
		MainScreen.text(", all for the purpose of having " + emberMF("him", "her") + " deliver that creamy dragon spunk directly into your hungry belly.  You do what you can, but you're not certain how else you can please " + emberMF("him", "her") + " with " + emberMF("his", "her") + " entire length buried in your throat.  You look up at the dragon with a pleading expression, silently begging " + emberMF("him", "her") + " to take an active hand in matters, or else " + emberMF("he", "she") + "'ll never get off!");
		MainScreen.text("\n\nEmber murmurs with delight and eagerness.  \"<i>If you keep looking at me like that... I don't think I can... mmm... hold back.</i>\"  True to " + emberMF("his", "her") + " words, you actually feel " + emberMF("his", "her") + " dick twitch within your hungry maw.  You give your most pleading look; not caring if " + emberMF("he", "she") + " has to fuck your throat to get off, you just need " + emberMF("him", "her") + " to cum inside you before you pass out!");

		MainScreen.text("\n\nFinally, Ember's hands move to your cheeks, rubbing along them as " + emberMF("he", "she") + " feels every contour, every little curve on your face, and declares, \"<i>Can't hold back!</i>\"  " + emberMF("He", "She") + " takes hold of your head and begins forcing you up and down " + emberMF("his", "her") + " length.  You go limp and allow " + emberMF("him", "her") + " to use you like a living onahole, feeling the dragon piston you back and forth across the cock, struggling to constrict your throat to a properly pussy-like tightness.");

		MainScreen.text("\n\n" + emberMF("He", "She") + " thrusts with ever-increasing force, bucking and groaning loudly as " + emberMF("his", "her") + " tongue lolls down across " + emberMF("his", "her") + " chest.  \"<i>Oh!  Oh!  Gonna... gonna...!</i>\"  " + emberMF("He", "She") + " lets out a full-throated bellow and discharges an explosive gout of cum into you.  With " + emberMF("his", "her") + " cock buried fully into you, you have no choice but to swallow - or, more accurately, let " + emberMF("him", "her") + " discharge stream after stream of jizz directly into your belly.");

		MainScreen.text("\n\nGushes of spooge flow into your midriff, which you can feel growing heavier and heavier with the accumulation, your skin stretching into a pregnancy-mocking bulge.  Suddenly Ember pulls you away from " + emberMF("him", "her") + ", giving you a mouthful of cum; you do your best to swallow, but can't help but let some of it escape.  Not that it would matter much anyway, because shortly after Ember extracts " + emberMF("his", "her") + " spewing member from your mouth and paints your face with the last few jets of jism.");

		MainScreen.text("\n\nYou simply kneel there and take it, too full and out of breath to do anything about the cum-bath you're getting.  Finally, though, the dragon's overstimulated dick belches its last few blasts of frothy spunk, which land on your face as Ember slumps into " + emberMF("his", "her") + " seat, panting with exhaustion.  You heave and gasp for air, cum escaping your mouth, sighing in relief as you finally fill your lungs, then cradle your gurgling, sloshing belly, a grimace of discomfort crossing your face at the pressure before you expel a spunk-scented belch.  That feels better.");

		MainScreen.text("\n\nYour relief is short-lived, because Ember takes your head in " + emberMF("his", "her") + " hands and delivers a passionate kiss to your lips, tasting " + emberMF("him", "her") + "self and you as " + emberMF("he", "she") + " licks the stray gobs of cum that remain.  " + emberMF("He", "She") + " releases you with a wet smack, strands of saliva linking your mouth to " + emberMF("his", "hers") + ", while " + emberMF("he", "she") + " begins licking your face clean of the mess " + emberMF("he", "she") + " made earlier.");

		MainScreen.text("\n\nYou close your eyes and submit to the dragon's gentle ministrations, savoring the close contact as " + emberMF("his", "her") + " cool tongue glides across your " + player.skinFurScales() + ".  Ember takes " + emberMF("his", "her") + " time, making sure you're absolutely spotless.  Once you've been cleaned and licked to " + emberMF("his", "her") + " satisfaction, " + emberMF("he", "she") + " finally settles down; getting off the stump to lay on the floor and pull you atop " + emberMF("him", "her") + "; hugging you close.");

		MainScreen.text("\n\nYou don't quite know why " + emberMF("he", "she") + " feels like cuddling you after just feeding you " + emberMF("his", "her") + " cum, but you aren't too inclined to complain.  Still, eventually you realize time is slipping away and so gently try to wriggle out of " + emberMF("his", "her") + " embrace, playfully telling " + emberMF("him", "her") + " that as much as you like being close to " + emberMF("him", "her") + ", you have other things to do.");

		MainScreen.text("\n\nEmber opens " + emberMF("his", "her") + " eyes wide open, and roughly pushes you to the side and off " + emberMF("him", "her") + ".  \"<i>W-what did you make me do... my cum... the kiss...  you... you made me lick my own cum off your face!</i>\"");

		MainScreen.text("\n\nYou point out that " + emberMF("he", "she") + " kissed you, not the other way around.  You certainly didn't make " + emberMF("him", "her") + " lick you.  Besides, why should you be the only one who gets to enjoy how " + emberMF("he", "she") + " tastes?");

		MainScreen.text("\n\n\"<i>I need a bath!</i>\" " + emberMF("he", "she") + " declares hurriedly and dashes off.  You watch the dragon go, ");
		if (player.stats.cor < 80) MainScreen.text("amused");
		else MainScreen.text("increasingly leery of " + emberMF("his", "her") + " batty behavior");
		MainScreen.text(", then pick yourself up to head back to the camp.");
		//(+Affection, lust, reset hours since cum, slimefeed)
		player.slimeFeed();
		emberAffection(6);
		dynStats("lus", 10 + player.stats.lib / 10);
		doNext(camp.returnToCampUseOneHour);
	}

	//Get Blown - put your dick in the knife drawer, it'll be fun! (Z, with reservation)
	private stickDickInKnifeDrawer(): void {
		MainScreen.clearText();
		MainScreen.text(images.showImage("ember-gives-you-a-blowjob"));
		MainScreen.text("Trying to appear confident and a little aloof, you suggest that maybe Ember would be willing to put " + emberMF("his", "her") + " kinky tongue to work on your cock.");

		//(Low Affection)
		if (emberAffection() <= 25) {
			MainScreen.text("\n\n\"<i>Ah.  And... what makes you think I would ever consider that?</i>\"  Ember huffs indignantly and walks away.");
			doNext(camp.returnToCampUseOneHour);
			return;
		}
		//(Medium Affection)
		else if (emberAffection() < 75) {
			MainScreen.text("\n\n\"<i>No way!  Doing something like that is below me; think of something else!</i>\"  Ember crosses " + emberMF("his", "her") + " arms, awaiting your reply.</i>\"");
			//Sex menu hooooo
			emberSexMenu(false);
			return;
		}
		//(High Affection)
		else {
			MainScreen.text("\n\nEmber looks at your crotch, then back at you; " + emberMF("his", "her") + " eyes glitter conspiratorially. \"<i>Ok... but only this once!</i>\"");
		}
		MainScreen.text("\n\nRealising " + emberMF("he", "she") + " is looking at you to lead, you indicate " + emberMF("he", "she") + " should follow you and start heading for the outskirts of camp.  Once you trust you are a safe distance away, you ");
		if (!player.lowerBody.isNaga()) MainScreen.text("seat yourself on a conveniently lichen-covered boulder.");
		else MainScreen.text("coil up on your serpentine tail) and start peeling off the clothes on your lower half, exposing [eachCock] to the air and awaiting Ember's response.");

		MainScreen.text("\n\nEmber's eyes glow when " + emberMF("his", "her") + " gaze sets on your dick");
		if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
		MainScreen.text(".");
		let x: number = player.biggestCockIndex();
		let y: number = x + 1;
		if (player.lowerBody.cockSpot.count() > 1) {
			MainScreen.text("  " + emberMF("He", "She") + " selects the biggest cock and gives it a gentle stroke,");
		}
		else MainScreen.text("  " + emberMF("He", "She") + " takes your [cock " + y + "] in hand and begins gently stroking it,");
		MainScreen.text(" sniffing your musk with obvious delight.");

		//(if Ember chose a dragon cock)
		if (player.lowerBody.cockSpot.get(x).cockType == CockType.DRAGON) MainScreen.text("\n\n\"<i>Such a magnificent, beautiful cock... it feels powerful... and familiar.</i>\"");
		else MainScreen.text("\n\n\"<i>T-this isn't something that I know how to work... but I suppose I could try it... for you.</i>\"");

		MainScreen.text("\n\nYou shiver at the sensations of " + emberMF("his", "her") + " hands on your cock");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text(", the scales on " + emberMF("his", "her") + " palms producing an indescribable feeling as they slide across your sensitive flesh,");
		MainScreen.text(" and unthinkingly blurt out your understanding.");

		MainScreen.text("\n\nSatisfied at that, Ember extends " + emberMF("his", "her") + " tongue, slowly wrapping it around your " + CockDescriptor.describeCock(player, x) + ", an act that makes you shiver as the inhumanly long, prehensile appendage twines around your member like a slick-skinned snake.  " + emberMF("He", "She") + " coils it around your shaft expertly, gripping you into a makeshift cock-sleeve.");

		MainScreen.text("\n\nLooking down at Ember, you see the dragon wreathed in happiness; " + emberMF("he", "she") + "'s so focused on " + emberMF("his", "her") + " task that " + emberMF("he", "she") + " doesn't even notice you staring.  Using " + emberMF("his", "her") + " coiled tongue " + emberMF("he", "she") + " begins jerking you off; the sensation is familiar and yet so alien... it only takes a few strokes before your " + CockDescriptor.describeCock(player, x) + " is glistening with Ember's saliva, and in a particularly pleasurable tug, you moan.  A bead of pre escapes your " + player.cockHead(x) + " and slowly slides down your shaft, until it makes contact with Ember's tongue.");

		MainScreen.text("\n\nThe moment " + emberMF("he", "she") + " tastes you, " + emberMF("his", "her") + " eyes seem to glow.  In a whip-like motion, Ember pulls " + emberMF("his", "her") + " tongue back into " + emberMF("his", "her") + " awaiting mouth, engulfing your " + CockDescriptor.describeCock(player, x) + ".  You gasp as the cool, slick flesh surrounds you, heedless of the sharp teeth whose hard surfaces you can occasionally feel grazing you.  You trust your dragon too much to believe " + emberMF("he", "she") + " would hurt you.");

		MainScreen.text("\n\nEmber sucks you hard, slurping around your shaft with " + emberMF("his", "her") + " prehensile tongue and cooing with pleasure.");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("  " + emberMF("His", "Her") + " shaft is already hard as rock, and sometimes you can feel it poke your " + LowerBodyDescriptor.describeFeet(player) + ", smearing small beads of Ember's barely contained pleasure on your " + player.skinFurScales() + ".");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("  Looking behind her, you see a small pool of her feminine juices has formed; pheromones fly through the air and hit you like a wave, spurring you on, making you feed Ember more of your delicious pre.");

		MainScreen.text("\n\nIn a swift move, Ember sucks you as hard as " + emberMF("he", "she") + " can and releases you with a resounding lip-smack.  You cry out, unsure of what's going on, wordlessly looking towards the dragon and pleading with " + emberMF("him", "her") + " to finish you off; you were just starting to get into things!");

		MainScreen.text("\n\n\"<i>Don't worry, [name].  I have no intention of letting you put away this delicious, juicy cock of yours.  I just want to enjoy it to the fullest,</i>\" Ember says dreamily, nuzzling your sensitive member with a lusty grin.");

		MainScreen.text("\n\nYou watch with a smile at once aroused and amused, and can't resist stroking " + emberMF("him", "her") + " gently on " + emberMF("his", "her") + " ");
		if (Flags.list[FlagEnum.EMBER_HAIR] == 0 && Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text("scaly pate");
		else MainScreen.text("hair");
		MainScreen.text(", telling " + emberMF("him", "her") + " that " + emberMF("he", "she") + " certainly has your attention and you're looking forward to finding out what " + emberMF("he", "she") + " has in mind.");

		MainScreen.text("\n\nEmber flicks " + emberMF("his", "her") + " tongue against your ");
		if (player.lowerBody.balls > 0) MainScreen.text("balls");
		else if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)));
		else MainScreen.text("[cock " + y + "]");
		MainScreen.text(" and begins licking you from base to tip in slow, almost torturous, strokes.  \"<i>Mmm.  So tasty...</i>\"  Sparks of pleasure surge up your body from the dragon's ministrations, and you find yourself biting back words because you're not sure if you want " + emberMF("him", "her") + " to go faster or to keep at it like this.");

		MainScreen.text("\n\nBy now you're leaking like a spring, and Ember greedily laps up every little drop.  \"<i>Feed me, [name].  I'm sooo thirsty...</i>\" Ember teases you, giving your leaking tip the softest of kisses.  You buck forward, eager to be re-engulfed in the dragon's tantalizing mouth, promising to feed " + emberMF("him", "her") + " everything you have if only " + emberMF("he", "she") + "'ll keep doing that!  Ember smiles at your promise, and obliges by sucking you back in like a popsicle.");

		MainScreen.text("\n\nClawed hands grab at your waist for support as " + emberMF("he", "she") + " finally begins bobbing " + emberMF("his", "her") + " head with abandon, intent on milking you of every single drop you're worth.  Your own hands unthinkingly latch onto " + emberMF("his", "her") + " horns, using them to help pin " + emberMF("his", "her") + " head in place, thrusting your cock obligingly into Ember's jaws as " + emberMF("his", "her") + " lips and long, prehensile tongue send ecstasy coursing through you from their efforts to wring you of your seed.");

		MainScreen.text("\n\nYou don't have long to wait, and with a wordless cry, you unleash yourself into Ember's thirsty mouth.  As the first jet hits Ember's tongue, " + emberMF("he", "she") + " cries out in bliss and buries your erupting [cock " + y + "] as far into " + emberMF("him", "her") + "self as far as " + emberMF("he", "she") + " can.");

		//(Low Cum Amount)
		if (player.cumQ() < 250) {
			MainScreen.text("\n\nEmber sucks every single drop of cum out of you, taking you for everything you're worth, drinking it like a thirsty person in the desert.  Even when you feel you've given " + emberMF("him", "her") + " all you can, Ember inserts ");
			if (!player.lowerBody.isTaur()) MainScreen.text("a finger");
			else MainScreen.text("the thumb of her wing");
			MainScreen.text(" into your ass to tickle your prostate, drawing a few last drops out of you.");
		}
		//(Medium Cum Amount)
		else if (player.cumQ() < 1000) {
			MainScreen.text("\n\nEmber drinks all you have to offer with a smile.  Once you've given all you can, Ember lets go of you, licking " + emberMF("his", "her") + " lips as if " + emberMF("he", "she") + "'d just been fed a treat.  " + emberMF("His", "Her") + " belly is visibly bulging by the time you have finished.");
		}
		//(High Cum Amount)
		else {
			MainScreen.text("\n\nEmber insists on drinking every single drop, even though " + emberMF("he", "she") + " can barely contain the amazing amount of cum you're pumping into " + emberMF("his", "her") + " eager ");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0) MainScreen.text("mouth");
			else MainScreen.text("maw");
			MainScreen.text(".  For a moment you get the impression " + emberMF("he", "she") + "'s drowning on your cum and try to pull away, but Ember won't have it; " + emberMF("he", "she") + " coaxes you back into position with careful encouragement from " + emberMF("his", "her") + " sharp teeth and continues drinking.  By the time you're done, " + emberMF("he", "she") + " looks almost pregnant from how distended " + emberMF("his", "her") + " cum-filled stomach is.");
		}

		MainScreen.text("\n\nWith a happy sigh, Ember hugs your midriff and buries " + emberMF("his", "her") + " head in your belly, licking " + emberMF("his", "her") + " lips happily.  You sink blissfully into the embrace, savoring the sensations of afterglow.  Lazily, you stroke Ember's head in a sign of affection.  Sadly you don't get to enjoy this for long, " + emberMF("he", "she") + " suddenly snaps and backs away from you, landing on " + emberMF("his", "her") + " ass.  \"<i>W-what do you think you're doing!?  Wait a moment... did... did you just make me drink all of your cum!?</i>\"");

		MainScreen.text("\n\nYou cast " + emberMF("him", "her") + " an idle look, gently pointing out you didn't make " + emberMF("him", "her") + " drink it.  The thought does cross your mind that it was swallow or let it splatter all over " + emberMF("his", "her") + " face, but you decide to keep that to yourself.");

		MainScreen.text("\n\n\"<i>I-I would never do something like that!</i>\" Ember protests.  \"<i>Never!  I wouldn't be caught dead drinking your tas... I mean, terrible cum!  I can't believe you did that to me!  I need to wash my mouth off!</i>\"   " + emberMF("He", "She") + " gets up and dashes away towards the nearest stream.");

		MainScreen.text("\n\nYou watch " + emberMF("him", "her") + " go");
		if (player.stats.cor < 75) MainScreen.text(" and chuckle; you know " + emberMF("he", "she") + " loves you, really.");
		else MainScreen.text(", folding your arms; " + emberMF("his", "her") + " dementia is getting worse...");

		//lose lust, reset hours since cum
		player.orgasm();
		player.stats.sens += -1;
		doNext(camp.returnToCampUseOneHour);
	}


	//Pitch Anal - horses are terrible people, so no centaurs unless rewritten (Z)
	private stickItInEmbersButt(): void {
		MainScreen.clearText();
		MainScreen.text(images.showImage("ember-fuck-her-in-her-buttz"));
		MainScreen.text("Your eyes are drawn to Ember's butt like iron filings to a magnet.  Haunted by the temptation to see " + emberMF("him", "her") + " bent over and offering " + emberMF("his", "her") + " ass to your hungry touch, you ask if Ember would be willing to be the catcher in a bout of anal sex.");

		//(Low Affection)
		if (emberAffection() <= 25) {
			MainScreen.text("\n\n" + emberMF("His", "Her") + " eyes widen.  \"<i>Never!  N-E-V-E-R!  Not even over my dead body!</i>\" Ember exclaims.  The dragon unfurls " + emberMF("his", "her") + " wings and lifts off, beating the air furiously.");
			doNext(camp.returnToCampUseOneHour);
			return;
		}
		//(Medium Affection)
		else if (emberAffection() < 75) {
			MainScreen.text("\n\n\"<i>Ewww!  How can you ask something like that of me!?  Think of something else.</i>\"  Ember's protest is emphasized by a small puff of smoke that escapes " + emberMF("his", "her") + " nostrils, though you can't help but notice " + emberMF("his", "her") + " nipples getting hard...");
			//TO ZE SEX MENU
			emberSexMenu(false);
			return;
		}
		//(High Affection)
		else {
			MainScreen.text("\n\n\"<i>I would, b-but it would never fit... and... and... well, it just won't fit!</i>\" Ember's eyes lock onto your crotch; ");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) {
				MainScreen.text(emberMF("his", "her") + " stiffening cock");
				if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" and ");
			}
			if (Flags.list[FlagEnum.EMBER_GENDER] == 2) MainScreen.text("her ");
			if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("dripping pussy");
			MainScreen.text(" make it obvious that the idea is at least partially arousing.");
		}
		//(first time and corr < 40)
		if (Flags.list[FlagEnum.TIMES_BUTTFUCKED_EMBER] == 0) MainScreen.text("\n\nYou ask if " + emberMF("he", "she") + "'s really so certain that it won't fit; you're eager to give it a try if " + emberMF("he", "she") + " is, but you won't push if " + emberMF("he", "she") + "'s really that scared of the idea...");
		else MainScreen.text("\n\nYou ask how " + emberMF("he", "she") + " can be so certain... could it be " + emberMF("he", "she") + "'s scared? Because if " + emberMF("he", "she") + " is, you won't push the issue...");
		Flags.list[FlagEnum.TIMES_BUTTFUCKED_EMBER]++;

		MainScreen.text("\n\nAt the mention of the word 'scared', Ember stares at you with renewed fire in " + emberMF("his", "her") + " eyes.  \"<i>Scared!?  I'm not scared of anything!  Bring it on!</i>\" " + emberMF("he", "she") + " proudly declares, grabbing your hand and leading you away towards a small clearing nearby.  \"<i>Strip!</i>\" Ember demands, hurriedly.");

		MainScreen.text("\n\nYou quickly hasten to obey, undressing yourself and exposing [eachCock] ");
		if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("and [vagina] ");
		MainScreen.text("to the dragon.  Once you're fully undressed, you turn to look at Ember, to see " + emberMF("him", "her") + " openly masturbating; " + emberMF("he", "she") + " pants as " + emberMF("he", "she") + " strokes " + emberMF("his", "her") + " ");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("cock ");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("and ");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("pussy ");
		MainScreen.text("with a hand, while " + emberMF("he", "she") + " suckles on the fingers of the other.");

		let x: number = player.cockThatFits(emberAnalCapacity());
		if (x < 0) x = player.smallestCockIndex();

		MainScreen.text("\n\nOnce " + emberMF("he", "she") + " sees you're fully stripped, " + emberMF("he", "she") + " walks over to you and pushes you on the grassy ground with a growl of lust.  The slick digits of one hand find themselves wrapped around your erect " + CockDescriptor.describeCock(player, x) + ", while the others press into Ember's tight pucker, slowly stretching it to accommodate you.");

		//First Time
		if (Flags.list[FlagEnum.TIMES_BUTTFUCKED_EMBER] == 1) {
			MainScreen.text("\n\nThe dragon moans softly and growls with more than a hint of nervousness tinged pain; " + emberMF("he", "she") + " is giving up " + emberMF("his", "her") + " black cherry to you, after all, so " + emberMF("he", "she") + " has all the tightness and fear of a virgin.  You promise the dragon that you'll be slow and gentle.");
			MainScreen.text("\n\nEmber shoots you a nervous glare, before demanding, \"<i>You won't do anything!  Just sit there and let me handle this!</i>\"  Not keen on starting an argument, you decide to do as " + emberMF("he", "she") + " says.");
			MainScreen.text("\n\n\"<i>I can't believe I have to do this... to do something some humiliating... so weird...</i>\"  With a sigh, you tell Ember that's enough; " + emberMF("he", "she") + " doesn't have to do anything " + emberMF("he", "she") + " doesn't want to, you didn't mean to tease " + emberMF("him", "her") + " about being scared.  Ember interrupts you with a clawed finger.  \"<i>Just be quiet.  I... I want to do this... no one tells me what to do!  So if I'm doing this... it's because I want to!</i>\"");
			MainScreen.text("\n\nYou smile reassuringly at " + emberMF("him", "her") + ", as " + emberMF("he", "she") + " says that, and decide to let Ember prepare " + emberMF("him", "her") + "self in peace.");
			MainScreen.text("\n\nOnce " + emberMF("he", "she") + " feels ready, the dragon extracts " + emberMF("his", "her") + " fingers from the puckered rose, now blooming, and turns to you.");
		}
		//(else)
		else {
			MainScreen.text("\n\nThe dragon moans softly and growls, stretching " + emberMF("him", "her") + "self once more to take you.  You consider saying something, but remembering Ember's words from the first time, you figure that if " + emberMF("he", "she") + "'s doing this, then it's because " + emberMF("he", "she") + " wants to... so you just give " + emberMF("him", "her") + " a reassuring smile.");
			MainScreen.text("\n\nTaking notice of your smile, Ember stops " + emberMF("his", "her") + " preparations.  \"<i>W-what are you smiling about?</i>\"");
			MainScreen.text("\n\n" + emberMF("He", "She") + " looks cute, getting ready just like for " + emberMF("his", "her") + " first time.  Ember turns away as the memory returns.  After a few moments of silence, " + emberMF("he", "she") + " moans once more as " + emberMF("he", "she") + " resumes working " + emberMF("his", "her") + " fingers on " + emberMF("his", "her") + " ass.");
			MainScreen.text("\n\nOnce " + emberMF("he", "she") + " feels " + emberMF("he", "she") + "'s ready, " + emberMF("he", "she") + " extracts " + emberMF("his", "her") + " fingers from " + emberMF("his", "her") + " puckered rose, now blooming, and turns to you.");
		}
		MainScreen.text("\n\n\"<i>Listen up.  You only do what I tell you.  I want to be in complete control of this.  If you try or do anything that makes me hurt later, I swear I'll smack you.  Understood?</i>\"");
		MainScreen.text("\n\nYou ");
		if (player.stats.cor < 50) MainScreen.text("promise the dragon you understand, and insist you wouldn't dream of doing otherwise; you want this to be good for " + emberMF("him", "her") + ", not to cause " + emberMF("him", "her") + " pain.");
		else MainScreen.text("nod.");

		MainScreen.text("\n\n\"<i>Umm... okay then.</i>\"  Stepping over you, the dragon lifts " + emberMF("his", "her") + " tail and aligns you with the puckered hole.  Slowly, Ember rubs " + emberMF("his", "her") + " ass against you, stimulating you to produce a single drop of pre to ease your way in.  " + emberMF("He", "She") + " doesn't have to wait long, and with a deep breath, " + emberMF("he", "she") + " finally lets gravity run its course and your " + CockDescriptor.describeCock(player, x) + " plunges into " + emberMF("his", "her") + " tight depths.");
		MainScreen.text("\n\nYou moan softly as Ember's back passage opens up and swallows you.  Just like the rest of " + emberMF("him", "her") + ", it's cooler than it would be for a human, but not so cold as to be unpleasant. It's a kind of peppery, refreshing chill that makes you shudder with delight. You squeeze Ember's ass, gripping tightly and pulling " + emberMF("him", "her") + " fully down your length, struggling to keep from pushing the dragon faster than " + emberMF("he", "she") + " is comfortable with.");
		MainScreen.text("\n\n\"<i>H-hey!  Ah!  I didn't tell you to pull me down!</i>\" Ember protests.");
		MainScreen.text("\n\nYou tell the dragon you're sorry, but you can't help it; " + emberMF("his", "her") + " ass is just so full and round, so deliciously cool and tight - it's utterly irresistible.  You thrust into " + emberMF("his", "her") + " ass for emphasis, roughly squeezing " + emberMF("his", "her") + " luscious ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text("scaly ");
		MainScreen.text("cheeks and rubbing the base of " + emberMF("his", "her") + " long, flexible tail to try and convey just how wild " + emberMF("his", "her") + " ass is driving you.");

		MainScreen.text("\n\n\"<i>Ow!  Okay, okay!  Just stop and give me a moment to adjust at least,</i>\" Ember replies");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text(", panting with lust");
		else MainScreen.text(", a blush adorning " + emberMF("his", "her") + " face");
		MainScreen.text(".  You force yourself to remain still, giving the horny dragon a chance to recover from your " + CockDescriptor.describeCock(player, x) + " impaling " + emberMF("his", "her") + " back passage, savoring the feeling of " + emberMF("his", "her") + " cool muscles squeezing and rippling around your shaft.");

		MainScreen.text("\n\nAfter a few minutes, Ember finally starts to move, stroking you with " + emberMF("his", "her") + " inner muscles.  ");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("Droplets of pre slide along " + emberMF("his", "her") + " own shaft and down " + emberMF("his", "her") + " balls to gather at your belly.  ");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("Her slick pussy drips rhythmically, wetting your lower body with slick dragon juice.  ");
		MainScreen.text(emberMF("His", "Her") + " lusty moans each time " + emberMF("he", "she") + " comes down on your " + CockDescriptor.describeCock(player, x) + " send a thrill up your spine, and the deep purring emanating from " + emberMF("his", "her") + " chest is audible enough to give you an idea of how much Ember is enjoying this, despite " + emberMF("his", "her") + " initial reluctance.");
		MainScreen.text("\n\nIt's not the purring, or the tight innards, or the soft moans that finally make you lose control and give in to your basest instincts, it is Ember's face... a look of pure bliss, lust and love " + emberMF("he", "she") + " shoots your way.  It hits you right in the core of your being.  Your hands fly from Ember's ass to wrap around " + emberMF("his", "her") + " chest, your fingers beginning to stroke, caress, and gently roll " + emberMF("his", "her") + " nipples, striving to drive the dragon even wilder with lust as you furiously piston your hips into " + emberMF("his", "her") + " inviting ass.");

		MainScreen.text("\n\nThe surprise over your sudden movement is enough to knock Ember on " + emberMF("his", "her") + " back; as " + emberMF("he", "she") + " falls " + emberMF("he", "she") + " drags you with " + emberMF("him", "her") + ", reversing your roles; now it is you who is on top, driving yourself powerfully inside " + emberMF("his", "her") + " inviting bowels.  Each time your hips slam against " + emberMF("his", "her") + " butt, " + emberMF("he", "she") + " squirms in pleasure; each time a loud slap resounds on the clearing, Ember moans.  \"<i>I... ah! didn't... Oh! tell you... Mmm! to start moving!</i>\"");

		MainScreen.text("\n\nYou ask if " + emberMF("he", "she") + " really wants you to stop now, making one last forceful thrust and then slowly, languidly drawing yourself out for emphasis.  You give " + emberMF("his", "her") + " rump a playful spank; you'd thought that both of you were almost done.  Still, if " + emberMF("he", "she") + " really wants to stop now...");

		MainScreen.text("\n\n\"<i>No!  Don't you dare stop!  Pound my ass raw!  Ah!  I need you!</i>\"");

		MainScreen.text("\n\nYou thought that's what " + emberMF("he", "she") + " would say, and you proceed to give it to " + emberMF("him", "her") + " with everything you have.  You can feel that oh-so-familiar, oh-so-wonderful tightness coiling in ");
		if (player.lowerBody.balls > 0) MainScreen.text("your [balls]");
		else MainScreen.text("the base of your spine");
		MainScreen.text(", and you groan to Ember that you're going to cum, soon.");

		MainScreen.text("\n\n\"<i>Yes!  Cum with me!  Fill me with your hot white seed!  Mark me as yours!</i>\" Ember screams in bliss.");

		MainScreen.text("\n\nWell, if that's what " + emberMF("he", "she") + " wants... with a gasp and a cry, you give in to the feeling, letting the waves of pleasure roll through you and send your cum cascading forth into Ember's waiting bowels.  Your orgasm triggers " + emberMF("his", "her") + " own and with a roar " + emberMF("he", "she") + " cums");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(", jet upon jet of spunk arcing over " + emberMF("his", "her") + " head to paint the ground below");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("; a veritable gush of juices spews forth from her forgotten love-hole to splash against your lower body and over herself");
		MainScreen.text(".  The force of " + emberMF("his", "her") + " orgasm makes the dragon clench " + emberMF("his", "her") + " ass, sending waves of renewed pleasure through you.");

		//(Low Cum Amount)
		if (player.cumQ() < 250) MainScreen.text("\n\nAll too soon you're spent, but even so you came far more than usual, leaving Ember with a slick, squelching, cum filled rosebud.");
		//(Medium Cum Amount)
		else if (player.cumQ() < 1000) MainScreen.text("\n\nYour orgasm lasts far longer than usual, filling Ember's tight little hole to the brim, even to the point of slightly distending " + emberMF("his", "her") + " belly.");
		//(High Cum Amount)
		else MainScreen.text("\n\nYour thunderous orgasm threatens to rip Ember's tender little hole apart as you spew jets of cum with such force that you manage to rock " + emberMF("him", "her") + " back and forth.  Ember doesn't look filled, nor even overfilled; " + emberMF("he", "she") + " looks like a pregnant mother waiting to give birth anytime now.  As tight as " + emberMF("he", "she") + " is, " + emberMF("he", "she") + " still doesn't manage to hold all your cum in, and the backflow escapes " + emberMF("his", "her") + " ass with tremendous force, to plaster on your lower body and Ember's legs.");

		MainScreen.text("\n\nSpent, Ember collapses in a blissed-out heap of fulfillment and satisfaction.  You're not much better yourself and fall over " + emberMF("him", "her") + " with an \"<i>omph</i>\".  Ember pants for a while, before guiding your head up with " + emberMF("his", "her") + " hands and delivering a kiss straight to your lips.  Surprised, but pleased, you sink into the kiss, stroking " + emberMF("his", "her") + " cheek for emphasis and letting the contentment roll over the pair of you. Once you break the kiss Ember smiles at you and closes " + emberMF("his", "her") + " eyes to nap for a bit.");

		MainScreen.text("\n\nYou smile at the sleeping dragon and gently extract yourself from " + emberMF("him", "her") + "; then walk off to the nearest stream to wash yourself.  After you are cleaned, you return to where you left Ember.  You're met with a surprise when you see " + emberMF("him", "her") + " hugging " + emberMF("his", "her") + " knees and rocking slowly, and... is " + emberMF("he", "she") + " humming?  Slowly you approach and " + emberMF("he", "she") + " looks at you with a smile, but after realizing just who you are, " + emberMF("he", "she") + " gasps and " + emberMF("his", "her") + " face turns into a frown.");

		MainScreen.text("\n\n\"<i>[name]!!  You... after I told you... you still...  Dammit, I'm going to be sore for days... it's all your fault!</i>\"");

		MainScreen.text("\n\nYou confess that you are partially to blame for it, but point out Ember wanted this just as much as you did, if not more.");

		MainScreen.text("\n\nEmber snorts a puff of smoke.  \"<i>Oh yeah!?  So you're not going to even take responsibility?  Fine!</i>\"");
		MainScreen.text("\n\nYou point out you're not saying that, just that Ember also has responsibility here.");
		MainScreen.text("\n\n\"<i>I don't need to hear any more!</i>\"  Ember gets up and pushes you with " + emberMF("his", "her") + " tail, hefting a pile of folded clothes.  In fact... that pile is quite familiar... actually... that's your [armor].");
		MainScreen.text("\n\n\"<i>And I even picked these up for you... Well, you can do it yourself!</i>\"  Ember begins tossing your clothes around in random directions, you ");
		if (player.stats.str < 70) {
			MainScreen.text("desperately try to grab any of the flying pieces, but Ember keeps you pinned with " + emberMF("his", "her") + " tail");
			MainScreen.text(".");

			MainScreen.text("\n\n\"<i>That ought to teach you!</i>\" " + emberMF("he", "she") + " declares with a confident puff of smoke, turning on " + emberMF("his", "her") + " heels and walking away... rather awkwardly at that.  You feel like you should point out that the results of your earlier activities are still dripping out of " + emberMF("his", "her") + " ass as " + emberMF("he", "she") + " heads back to the camp, but figure you'll stay quiet lest you aggravate the matter.  Plus, it's payback for tossing your clothes.");
			MainScreen.text("\n\nYou sigh, wondering why Ember has to be so temperamental, and start gathering your clothes to return to camp with them. It takes a minute or two, but " + emberMF("he", "she") + " didn't really put any effort into scattering them, and you know it could have been worse.");
		}
		//(else str >=80)
		else {
			MainScreen.text("grab " + emberMF("his", "her") + " tail, pulling the dragon off " + emberMF("his", "her") + " feet and throwing " + emberMF("him", "her") + " to the ground as you roll over... and causing " + emberMF("him", "her") + " to drop them everywhere as " + emberMF("he", "she") + " falls.");
			MainScreen.text("\n\nEmber yelps, thrashing and struggling back to " + emberMF("his", "her") + " feet.  A gobbet of white drops to the ground from between " + emberMF("his", "her") + " cheeks, forced out by the tumble, and the dragon freezes in place.  You smile wryly.  ");
			/*OLD
			 \"<i>Asshole!  Bite me!</i>\" " + emberMF("he","she") + " shrieks, turning hurriedly toward the stream.");
			 MainScreen.text("\n\nWhat a " + emberMF("bastard","bitch") + ".");*/
			//New
			MainScreen.text("\"<i>What do you think you're doing!?</i>\" Ember yells at you, obviously mad at your little stunt, one hand reaching behind to prevent any more cum from spilling.");
			MainScreen.text("\n\nYou tell " + emberMF("him", "her") + " that you don't feel in the mood to play " + emberMF("his", "her") + " little game today; " + emberMF("he", "she") + " really needs to work on that temper of " + emberMF("his", "her") + ", or one day " + emberMF("he", "she") + " might bite off something more than even " + emberMF("he", "she") + " can chew.");

			MainScreen.text("\n\nEmber growls at you, and for a moment you think " + emberMF("he", "she") + "'s going to yell at you, but to your surprise " + emberMF("he", "she") + " averts " + emberMF("his", "her") + " gaze and utter a barely audible. \"<i>Sorry...</i>\"");

			MainScreen.text("\n\nYou sigh softly and nod your head; it's not much, but with as proud as " + emberMF("he", "she") + " is, that's quite an admission. You tell " + emberMF("him", "her") + " it's alright, but " + emberMF("he", "she") + " still shouldn't get so upset when " + emberMF("he", "she") + " enjoyed it as much as you did.");

			MainScreen.text("\n\nEmber shudders as you finish talking and blows a puff of smoke, then turns around and hurries away to the nearest stream. You just watch " + emberMF("him", "her") + " go, plugging " + emberMF("his", "her") + " used rosebud with a finger, you make note of " + emberMF("his", "her") + " awkward stride, somehow... " + emberMF("he", "she") + " didn't seem that angry as " + emberMF("he", "she") + " left...");
		}
		player.orgasm();
		player.stats.sens += -2;
		doNext(camp.returnToCampUseOneHour);
	}

	//Eat Ember Out - b-baka! (Z)
	private slurpDraggieCunnies(): void {
		MainScreen.clearText();
		MainScreen.text(images.showImage("ember-eat-out-her-vagoo"));
		MainScreen.text("You contemplate the possibilities, and then offer to get down on your knees before the dragon and pleasure her orally.  You would love to have a taste of some dragon juice.");

		//(Low Affection)
		if (emberAffection() <= 25) {
			MainScreen.text("\n\n\"<i>I suppose I could enjoy that... barely,</i>\" Ember replies, trying to hide her obvious excitement.  \"<i>But don't think you'll be getting any points ");
			if (!silly()) MainScreen.text("with me");
			else MainScreen.text("on my affection meter");
			MainScreen.text(" just because you're offering to do this,</i>\" the dragon hastily adds.");
		}
		//(Medium Affection)
		else if (emberAffection() < 75) {
			MainScreen.text("\n\nEmber's claws move to tease at her netherlips, as she imagines you kneeling in front of her, pleasuring her.  \"<i>F-fine, if you really want to do that...</i>\" Ember replies, trying to sound casual despite her moistening honeypot");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" and slowly hardening shaft");
			MainScreen.text(".");
		}
		//(High Affection)
		else {
			MainScreen.text("\n\nThe mere suggestion of what you're offering is enough to make Ember nearly juice herself with anticipation.  Ember quickly covers her nethers, trying to hide her dripping love hole");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" and shaft");
			MainScreen.text(".  \"<i>Ok... I suppose I would like that,</i>\" Ember replies, trying to calm herself down, lest she seem too excited by the idea.");
		}

		MainScreen.text("\n\nEmber takes your hand in hers and leads you away to a secluded spot beyond the bushes; once she's sure you're both alone, Ember leans back against a nearby tree for support, and opens her legs to give you access to her blooming, moist flower.");

		MainScreen.text("\n\n\"<i>A-alright... I'm ready,</i>\" Ember says, tail swinging like a pendulum behind her as she awaits your next move.");

		MainScreen.text("\n\nYou settle in between her legs, and bend in to reach her folds.  From here, you are in a great position to gently swish your tongue up the length of her slit, starting from way back between her legs and then trailing gently forward to caress her joy-buzzer, pushing up between her lips to tickle the interior of her womanhood.");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("  With Ember's cock jutting out above your head, you can't resist sliding your tongue along the underside of her shaft, just for an extra teasing motion.");

		MainScreen.text("\n\nEmber gasps in pleasure and her legs buckle for a moment, though she quickly recovers by digging her claws into the tree bark.  \"<i>Y-you could have at least warned me you were going to start!</i>\" Ember says, ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0) MainScreen.text("blushing all the while and ");
		MainScreen.text("panting from the stimulation.");

		MainScreen.text("\n\nYou look up at her as best you can around her heaving bosom and give her an innocent smile, then turn right back to the task at tongue.  This bitch is yours now.  You slide across her folds, caressing her with all the oral skill you can muster; her juices are starting to flow now, allowing you to catch them and savor them with each lick.");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("  You think droplets of pre are starting to slide down her girl-cock and drip onto your head... but that's part and parcel of loving a herm, so you pay it no attention.");

		MainScreen.text("\n\nEmber's enjoyment is very apparent, as each time you even breathe over her little pleasure bud, Ember bucks against you; her vaginal walls contract in hopes of gripping your tongue and pulling it deeper inside her, but your saliva combined with the ever-flowing dragon juice keeps it slick enough that Ember doesn't have a chance in heaven of holding your tongue back.  \"<i>Hmm... Ah!  A little more to the left...</i>\" Ember directs you.");

		MainScreen.text("\n\nYour tongue bends with all of the ");
		if (player.upperBody.head.face.tongueType > TongueType.HUMAN) MainScreen.text("inhuman ");
		MainScreen.text("flexibility you can muster, wriggling into the dragon's depths and trying to caress and stroke every last one of her most intimate places.  At one point in your exploration of Ember's quivering depths, you discover a special spot, and every time you make contact with that little spongy spot Ember rewards you with a buck and renewed gush of fluids.");

		MainScreen.text("\n\n\"<i>Ah!  If you keep doing this I'm going to- Oh!</i>\" Ember gasps, tongue lolling out as she loses herself in the pleasurable sensations you're oh-so-responsible for.  You continue to wriggle and undulate your tongue, stroking that special point with as much care as you can manage");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(", heedless of the steady rain of pre dribbling into your " + HeadDescriptor.describeHair(player) + ".  You're confident she'll crack soon...");

		MainScreen.text("\n\nEmber suddenly grabs your head and pushes you away, stumbling on shaky legs as she turns to brace herself against the tree, her tail missing your head by a couple inches.  \"<i>G-give me a moment to catch my breath... if you keep that up I'll... I'll...</i>\"  Ember doesn't finish her thought and just stays there, with her tail aloft, giving you a wonderful vision of her sopping wet pussy, just begging for another lick.");

		MainScreen.text("\n\nYou can't resist.  Even as Ember's tail flicks back and forth overhead, you sneak up behind her, reaching up with your hands to caress her shapely handful of asscheeks even as you plunge your tongue straight into her honey-dripping flower.");

		MainScreen.text("\n\nEmber's throaty moan devolves into a roar of intense pleasure as her tail loops around your neck, not constricting nor choking you, just helping the dragon stabilize herself as she is rocked by her intense orgasm and rewards you with a bountiful helping of sweet dragon juice.");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("  Her throbbing shaft, not intending to be left out of the fun, records the event by marking the tree bark with white dragon spooge.");

		MainScreen.text("\n\nSlowly Ember crumbles, her legs no longer able to hold her up; her claws dig long scratching marks on the tree as she falls to her knees and the tail around your neck slithers sensually, massaging you.  Finally with a gasp and sigh, Ember falls on her back, gazing up at you through half-lidded eyes; you gasp in surprise as the tail suddenly grips your neck and pulls you down for a upside-down kiss.  Ember doesn't seem to mind tasting herself as she licks around inside your mouth and then your face.");

		MainScreen.text("\n\nYou wait until she takes her tongue out of your mouth and smile at her, then stroke her cheek and ask if it was good for her.  \"<i>The best...</i>\" Ember whispers airily.  You smile and bend down to kiss her again; there's a risk she'll give you a nip for presumption, but you favor the odds she'll let you get away with it.");

		MainScreen.text("\n\nAt first Ember leans into the kiss, exploring your mouth yet again... but at one point her eyes go wide and she quickly breaks the kiss, scrambling to her feet and glaring at you.  \"<i>W-who said you c-could kiss me!?");
		if (silly()) MainScreen.text("  My meter's not that full!");
		MainScreen.text("</i>\"");

		MainScreen.text("\n\nYou ask if she's the only one who gets to initiate the kiss.  Realization dawns on the dragon's face when she recalls the earlier kiss.  \"<i>That... that was... you!  You tricked me!  H-how could you do that?  I'm leaving!</i>\" Ember blurts out, rushing off.");

		MainScreen.text("\n\nYou watch her go and smile, licking your lips to savor the last few drops of her nectar.  She really should learn to relax; it would make things much more enjoyable all around.  Idly rubbing your own ");
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("stiffened shaft");
		if (player.gender == 3) MainScreen.text(" and ");
		if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("moist cunt");
		if (player.gender == 0) MainScreen.text("empty crotch");
		MainScreen.text(" in sympathy, you head back to camp.");

		//Moderate lust gain and slimefeed, ala blowing Urta or drinking Lover Urta's fluids at Tel'Adre*/
		player.slimeFeed();
		emberAffection(6);
		dynStats("lus", 10 + player.stats.lib / 10);
		doNext(camp.returnToCampUseOneHour);
	}

	//Get Eaten Out - actually halfway likeable
	private getEatenOutByEmbra(): void {
		MainScreen.clearText();
		MainScreen.text(images.showImage("ember-eats-your-vagoo-out"));
		MainScreen.text("You think about Ember's long tongue and the many advantages it must have, when you suddenly get an idea of what you'd like to do. You ask Ember if " + emberMF("he", "she") + "'d be willing to put that tongue of " + emberMF("his", "hers") + " to use and eat you out.");
		//(Low Affection)
		if (emberAffection() <= 25) {
			MainScreen.text("\n\n\"<i>No way!  I have no idea what's been there!  Plus, that is just gross!</i>\"  Ember spins on " + emberMF("his", "her") + " heels and walks away.");
			//End scene
			doNext(camp.returnToCampUseOneHour);
			return;
		}
		//(Medium Affection)
		else if (emberAffection() < 75) {
			MainScreen.text("\n\n\"<i>I'd rather not.  Why don't you think of something that would make both of us feel good?</i>\" Ember suggests, surprisingly calm.");
			//Display other Ember sex options
			emberSexMenu(false);
			return;
		}
		//(High Affection)
		else MainScreen.text("\n\n\"<i>I guess I could do that... if you asked nicely...</i>\" Ember replies, although " + emberMF("his", "her") + " body language suggests " + emberMF("he", "she") + "'s quite eager to get a taste of you.");

		MainScreen.text("\n\nYou decide to play along and politely ask if " + emberMF("he", "she") + " will pleasure your womanly flower with " + emberMF("his", "her") + " long, nimble, draconic tongue, giving " + emberMF("him", "her") + " a smouldering look and a flirtatious wriggle of your [hips].  Ember swallows nervously as " + emberMF("he", "she") + " looks at your teasing form.  \"<i>Since you asked so nicely... okay then... come with me.</i>\"  " + emberMF("He", "She") + " grabs one of your hands and drags you away hurriedly to a more private setting.");
		MainScreen.text("\n\nOnce Ember is satisfied you won't be spied on, " + emberMF("he", "she") + " turns to look at you, drinking in your body, appraising you with a mixture of reverence and desire.  Ember opens " + emberMF("his", "her") + " mouth to say something, but words fail the dragon and " + emberMF("he", "she") + " ends up just breathing airily.  Closing the distance between the two of you, Ember kneels before you and begins undoing your [armor], peeling the lower parts off your body with shaky hands.");
		MainScreen.text("\n\nYou watch " + emberMF("him", "her") + ", visibly shivering with excitement, and spare the dragon a predatory grin, thinking to yourself that this is certainly not how the tales of dragons and maidens went back in the village.  Confidently, you strut towards a tree and position yourself before it, leaning back against it for support");
		if (!player.lowerBody.isNaga()) MainScreen.text(" with your [legs] spread wide");
		MainScreen.text(", displaying your [vagina].  You tell Ember that " + emberMF("he", "she") + "'ll need to make the next move from here, smiling as you do so.");

		MainScreen.text("\n\nThe dragon crawls towards you and gently brings " + emberMF("his", "her") + " nose closer to your moistening snatch, catching a whiff of your feminine scent");
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.text(", as well as the musk emanating from your drooling cock");
		MainScreen.text(".  Ember's eyes close as " + emberMF("he", "she") + " savors your scent, committing it to memory and licking " + emberMF("his", "her") + " lips in preparation for the task ahead.");

		MainScreen.text("\n\nFinally deciding to get about " + emberMF("his", "her") + " task, the dragon licks your moist slit from top to bottom, stopping briefly to kiss your [clit].  \"<i>So good...</i>\" you hear Ember whisper, before " + emberMF("he", "she") + " suddenly plunges " + emberMF("his", "her") + " tongue inside your warm depths, exploring every nook and cranny, much to your pleasure.");

		MainScreen.text("\n\nYou shudder and moan, feeling your juices dribble from your womanhood onto the dragon's tongue");
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.text(", and pre-cum beginning to bubble out of " + CockDescriptor.describeMultiCockSimpleOne(player));
		MainScreen.text(".  You wriggle in delight, praising Ember's skill with " + emberMF("his", "her") + " tongue and begging " + emberMF("him", "her") + " to keep going.");

		MainScreen.text("\n\nEmber presses on, nudging your pleasure button with " + emberMF("his", "her") + " nose and wrapping your [vagina] with " + emberMF("his", "her") + " ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text("maw");
		else MainScreen.text("mouth");
		MainScreen.text(", kissing your contracting box as if it were a long-lost lover, pushing " + emberMF("his", "her") + " tongue ever deeper inside you, as if intent on reaching your womb.");

		MainScreen.text("\n\nYou howl and cry, writhing as your dragon busily devours your womanhood, and find yourself sliding to the ground so you can wrap your [legs] around Ember's neck and pull " + emberMF("his", "her") + " face right up against your cunt.  Desirous as you are to feel the dragon fill you with that long, squirmy wet tongue of " + emberMF("his", "hers") + ", you command " + emberMF("him", "her") + " to lick deeper.");

		MainScreen.text("\n\nThere is no protest, only compliance as Ember's tongue begins batting against your cervix, demanding entrance into your innermost sanctuary.  You try to hold out, but it's a losing battle; Ember's tongue is like a wonderfully long, thin cock, prehensile and with its own natural lube to boot.  You cry out as orgasm rocks you, ");
		if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 4) MainScreen.text("spattering");
		else MainScreen.text("drenching");
		MainScreen.text(" Ember's face with your feminine honey");
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.text(" even as " + CockDescriptor.describeMultiCockSimpleOne(player) + " belches cum all over the preoccupied dragon");
		MainScreen.text(".");

		MainScreen.text("\n\nYour juices flow into Ember's waiting mouth, guided by the dragon's tongue, and " + emberMF("he", "she") + " is only too happy to drink, trying " + emberMF("his", "her") + " best not to waste even a single drop.");
		if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 4) MainScreen.text("  However, your squirting spatters make this an impossible task.  Ember doesn't seem to care, even as " + emberMF("his", "her") + " face is completely covered in femcum.");

		MainScreen.text("\n\nFinally, with a few last groans and hollow moans, you slump down, completely spent.  Your [legs] release Ember's neck as your muscles are overwhelmed by the glorious numbness that comes of being very well fucked.  Weakly, you compliment Ember on " + emberMF("his", "her") + " skills at eating pussy.");

		MainScreen.text("\n\nEmber licks " + emberMF("his", "her") + " own face as best as " + emberMF("he", "she") + " can, making sure " + emberMF("he", "she") + "'s completely clean.  Your compliment brings a soft glow of pride to Ember's eyes and " + emberMF("he", "she") + " shoots you an embarrassed look.  \"<i>Umm... thanks, I guess.  Just don't get used to it!</i>\" " + emberMF("he", "she") + " adds in a renewed burst of defiance, before turning to leave.");

		MainScreen.text("\n\nYou idly tell " + emberMF("him", "her") + " that you certainly hope not to get used to it; it wouldn't be fun any more if you did.  Ember turns around to snort a puff of smoke in your direction indignantly before continuing on " + emberMF("his", "her") + " way.");

		MainScreen.text("\n\nYou smile, hating to see " + emberMF("him", "her") + " go, but so loving to watch " + emberMF("him", "her") + " leave.  Shaking off your pleasurable fantasies, you manage to pull yourself back upright, redress yourself, and return to camp.");
		//minus some fukkin' lust, reset hours since cum
		player.orgasm();
		doNext(camp.returnToCampUseOneHour);
	}

	//Penetrate Her - seems not to accommodate centaurs, more's the pity (Z)
	private penetrateEmbrah(): void {
		MainScreen.clearText();
		MainScreen.text(images.showImage("ember-fuck-her-in-the-vagoo-with-your-penor"));
		//Besides emptying the PC's lust, this scene is also capable of increasing Cum output, I'll leave the decision of how much and how far the threshold should go to you Fen.
		//Don't know if you should make this increase libido. Probably not unless one of Ember's scenes is able to reduce it as well
		MainScreen.text("Your eyes are drawn to the dragon's crotch, and you ask if she has any feminine itches she'd like scratched.");

		//(Low Affection)
		if (emberAffection() <= 25) {
			MainScreen.text("\n\n\"<i>By you?  Ha!  Funny joke!</i>\"  Ember laughs forcibly as she walks away.");
			doNext(camp.returnToCampUseOneHour);
			return;
		}
		//(Medium Affection)
		else if (emberAffection() < 75) {
			MainScreen.text("\n\n\"<i>I might... what's it to you?</i>\"  She turns away, as if to give you the cold shoulder - but continues looking at you expectantly.  You gracefully offer to help, if Ember is in the mood for a little carnal relief.  She averts her gaze, and shakes her head.  \"<i>N-no... such a thing...!</i>\"  Looks like the chink in her scaly armor isn't that wide yet, even if... well, even if it is that wide, and drooling moisture.  Metaphorically, of course.");
		}
		//(High Affection)
		else {
			MainScreen.text("\n\nYou can see Ember's vagina moisten");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 3) {
				if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 1) MainScreen.text(" and her cock peek out of its protective slit");
				else MainScreen.text(" and her cock begin hardening");
			}
			MainScreen.text(" in anticipation.  \"<i>Yeah... maybe... why do you ask?</i>\"");
		}
		//(First Time)
		if (Flags.list[FlagEnum.EMBER_PUSSY_FUCK_COUNT] == 0) {
			MainScreen.text("\n\nEmber's tail slips into her hands, and she twists it nervously.  \"<i>I can't... I mean, I've never... and you...</i>\"  Ember seems at a loss for words; could she have been holding onto her virginity?");
			MainScreen.text("\n\nJudging by her reaction, it's clear you're spot on.  \"<i>S-so what if I am!?</i>\"  You sigh.  Some nervousness is to be expected if that's the case, but Ember's temperament only makes things harder... looking at her, it's clear she wants this, judging by the behavior of her nethers.");
			MainScreen.text("\n\nYou take Ember's hand in yours and promise her that you will be gentle; that she has nothing to fear.  Sure, it might hurt a bit at first, but after you get started it will be great.  Ember looks deeply into your eyes.  \"<i>You promise?</i>\"  You assure her again.  \"<i>O-ok then... I guess I can give you my... maidenhead.</i>\"");
			MainScreen.text("\n\nSadly, it doesn't take long for her deranged temperament to take over.  \"<i>B-but I'm not doing this because you're special... or sexy... and I haven't dreamed about this!  Not even once!</i>\"  You roll your eyes as Ember goes on.");
			if (player.stats.cor > 75) MainScreen.text("  As if bitches like her could qualify as maidens in any but the most literal sense.");
			MainScreen.text("\n\n\"<i>I hope you understand the honor you're being given.  To take my maidenhead... you're lucky you happened to be near when I was in the mood.</i>\"  This side of Ember is ");
			if (player.stats.cor <= 75) MainScreen.text("cute... but very troublesome");
			else MainScreen.text("irritating as hell");
			MainScreen.text(".  You wonder if you should tease her; it's quite obvious by her rather lengthy monologue that the idea of doing this with you has crossed her mind more than once... but since it's her first time you figure you'll just give her a break.  You tell her you understand and that you're honored, then wait patiently for her next move.");
		}
		MainScreen.text("\n\nEmber scratches the back of her neck in thought, although you're pretty sure she's already made her decision.  \"<i>Okay then... I suppose you'll have to do...</i>\"");

		MainScreen.text("\n\nYou smile at her, waiting for her initiative. \"<i>Ok, then. Let's not waste any more time!</i>\"  Ember grabs your hand and leads you away.");

		MainScreen.text("\n\nWhen you arrive at your destination you realize you're in a small clearing; there doesn't appear to be any creature nearby and the only sound you hear is the faint splashing of a nearby stream.  Ember turns to you and quickly looks you over.  \"<i>C'mon, why are you still dressed!?  I thought you wanted to have sex; don't make me wait!</i>\" Ember demands impatiently.");

		MainScreen.text("\n\nYou ");
		if (player.stats.cor < 50) MainScreen.text("hasten to undress yourself for the impatient dragoness, quickly pulling");
		else MainScreen.text("languidly denude yourself, making sure to exaggerate every movement as you pull");
		MainScreen.text(" off your [armor] until you are standing naked before her, letting her see what you have to offer in terms of phallic delights.");

		let x: number;
		let y: number;
		//If the PC is too big
		if (player.cockThatFits(emberVaginalCapacity()) == -1) {
			MainScreen.text("\n\nEmber looks at your " + CockDescriptor.describeMultiCockShort(player) + ", then touches her pussy in thought.  Finally, she growls in exasperation.  \"<i>");
			if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("It doesn't ");
			else MainScreen.text("None of them ");
			MainScreen.text("fit!</i>\"");

			MainScreen.text("\n\nYou ask if she's certain that it's too big. Shouldn't you at least try?");

			MainScreen.text("\n\n\"<i>I know my body better than anyone else... and if you put ");
			if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("that... that... monster inside me,");
			else MainScreen.text("any of those... those... monsters inside me,");
			MainScreen.text(" you'll tear me apart!</i>\"  Ember finishes by exhaling a puff of smoke in frustration... clearly she wants this as much as you.");

			MainScreen.text("\"<i>Find some way to shrink ");
			if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("that");
			else MainScreen.text("those");
			MainScreen.text(" and then come back!</i>\"  Ember turns on her heels and walks away, moodier than usual.");
			doNext(camp.returnToCampUseOneHour);
			return;
		}
		//(else if PC has multiple fit cocks){
		//as usual take the biggest one that fits, unless...
		//If the PC has a fit dragon cock, always take that one!
		x = player.cockThatFits(emberVaginalCapacity());
		if (x < 0) x = player.smallestCockIndex();
		if (player.cockThatFits(emberVaginalCapacity()) >= 0 && player.cockThatFits2(emberVaginalCapacity()) >= 0) {
			MainScreen.text("\n\n\"<i>You have quite a selection, but I only need one... this one!</i>\" Ember says, taking your " + CockDescriptor.describeCock(player, x) + " in her hand and stroking it into a full erection.");
		}
		//(if PC has a dragon cock)
		if (player.lowerBody.cockSpot.get(x).cockType == CockType.DRAGON) {
			MainScreen.text("\n\n\"<i>What a wonderful tool you have... I guess this might just be good enough to make me orgasm,</i>\" Ember remarks, admiring your dick.");
			MainScreen.text("\n\nYou can't resist smiling and noting that Ember always seems to like that one best.  Perhaps because of the familiarity.");
			MainScreen.text("\n\n\"<i>Actually I'd be fine with anything you... no wait, I mean...  Of course!  It's only right for a dragon to like a dragon's cock!</i>\"  Ember replies.");
		}
		else {
			MainScreen.text("\n\nEmber takes your " + CockDescriptor.describeCock(player, x) + " in her hand and begins gently stroking you to full mast.  \"<i>I hope you know how to use this,</i>\" Ember remarks.");
			MainScreen.text("\n\nYou assure her that you know exactly what you're doing. ");
		}
		MainScreen.text("\n\nDeciding it's better for the dragon to psyche herself up first, you wait patiently; it doesn't look like it will be long before she makes the first move.  Ember's hands roam all over your " + CockDescriptor.describeCock(player, x) + " and you think you can almost hear a faint purring emanating from her chest.  Slowly one of her hands reaches down to massage her moistened netherlips.  Ember gasps in pleasure as she continues masturbating both of you in a daze, until she suddenly snaps out of her trance.");

		MainScreen.text("\n\n\"<i>That's enough!  What do you think you're doing?  Getting lost in foreplay... you're here to have sex with me, right!?  So, lay down and get ready for me already!</i>\" Ember demands.  You ");
		MainScreen.text("smile and, with a flamboyant grace, ");
		MainScreen.text("gently lay yourself down, spreading your limbs and making it clear you're ready for whatever she has in mind.");

		MainScreen.text("\n\nEmber can't resist licking " + emberMF("his", "her") + " lips as she straddles you, aligning your " + CockDescriptor.describeCock(player, x) + " with her dripping pussy; then finally, with a sigh, letting gravity help your erect shaft inside her inviting depths.  You grit your teeth as her walls close around your prick, the firm muscles inside hungrily swallowing your length and starting to instinctively ripple and surge around it, beginning to milk you.  Your own instincts in turn compel you to buck and thrust, striving to bury yourself further into Ember's eager depths.");

		//(First time)
		if (Flags.list[FlagEnum.EMBER_PUSSY_FUCK_COUNT] == 0) {
			MainScreen.text("\n\nEmber hisses in pain as you tear her hymen apart; scolding yourself for your carelessness, you stop and begin to withdraw.  Ember opens " + emberMF("his", "her") + " mouth, as if to protest, but to your surprise all that comes out of her is a moan of pleasure.  Startled, you immediately switch directions, thrusting back into her depths; once again Ember hisses, but this time, in pleasure rather than pain.  You quickly realize that Ember is as ready for this as she'll ever be, and so you continue to pump yourself into her, losing yourself in the act.");
		}
		MainScreen.text("\n\nEmber gasps and moans as you hilt yourself within her.  \"<i>H-hey!  I'm supposed to be in control here!</i>\" the dragon protests, despite her enjoyment of your initiative.");
		MainScreen.text("\n\nYou are too caught up in your thrusting to reply for a moment, but manage to snatch back enough of your wits to tell her that if she wants to be in control, she'll need to act like the one in control.  You then resume plunging your hips up into hers, sheathing and unsheathing your " + CockDescriptor.describeCock(player, x) + " with each powerful, anxious thrust.");

		MainScreen.text("\n\nEmber growls and pins you under her by your shoulders, then begins moving her hips up and down");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) {
			MainScreen.text("; her ");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] > 0) MainScreen.text("draconic");
			else MainScreen.text("humanoid");
			MainScreen.text(" prick slaps wetly against your belly with each thrust, smearing pre on you as the engorged tool bounces back and forth");
		}
		MainScreen.text(".");

		MainScreen.text("\n\nShe moans with each insertion and purrs with each retraction, panting visibly from the pleasure you're inflicting on her sex-addled mind.  \"<i>T-there.  I'm in charge now, so you have to do what I say,</i>\" Ember states, before leaning down to kiss you on the lips.  You moan throatily into her mouth and kiss her back; you can't move your hands to try and embrace or caress her, so instead you hungrily grind your body against hers, rubbing your chest against her pillowy breasts and writhing back and forth, even as you continue thrusting into her ravenous dragon-cunt.");

		MainScreen.text("\n\n\"<i>S-stop thrusting!  If you keep doing this, I'm- Ah!</i>\"  Ember gasps as a particularly strong push rubs right on her special spot, rewarding you with a sudden rush of fluids that only help you increase your pace");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("; her own erect cock spurts a small jet of pre");
		MainScreen.text(".");

		MainScreen.text("\n\nYou can feel her inner walls squeezing and massaging your inflamed cock, their cool, wet surfaces a wonderful contrast against your own blood-boiled organ.  You feel like a mindless animal; only the imminent prospect of release matters, driving you to buck and thrash and writhe, spearing yourself into the dragon seated atop you over and over again.  Almost there...");

		MainScreen.text("\n\nOverwhelmed by the pleasure, Ember sits atop you and stops moving, going limp and panting in exertion, \"<i>C-can't move my hips anymore...</i>\"");

		if (player.stats.cor >= 80) MainScreen.text("\n\nNoisy, weak, and now helpless too... you wonder if you shouldn't have adopted a kitten instead of a dragon, for the peace and quiet.");
		else MainScreen.text("\n\nYou can't accept that - you <b>won't</b> accept that!");
		MainScreen.text("  With a surge of lust-inflamed strength, you thrust yourself forward, knocking the unprepared Ember over.  You roll her over so that you are on top and spread her legs, draping them casually around your hips and then resume thrusting with ever-increasing force.  Like some sex-starved animal you thrust and rut, pounding the now-helpless dragon raw in pursuit of the tantalizing imminent release that haunts you.");

		MainScreen.text("\n\n\"<i>Ah!  Don't stop!  F-fuck me!  Deeper!  Ha-harder!</i>\" Ember pleads, not caring that you seem to be taking charge.  You eagerly obey, fucking her with everything you have - but your orgasm is here, and, with a cry, you release yourself into her waiting depths.  Ember screams in delight as you fill her up.");

		//(Low Cum Amount)
		if (player.cumQ() < 250) MainScreen.text("\n\nHer throbbing pussy milks you dry, seemingly sucking the jism out of you like a thirsty mouth slurping a drink through a straw.");

		//(Medium Cum Amount)
		else if (player.cumQ() < 1000) MainScreen.text("\n\nHer vaginal walls work in tandem with your powerful throbs to bring your spunk deep into her womb, filling her until you've been drained dry and she's sporting a small pot-belly.");

		//(Large Cum Amount)
		else MainScreen.text("\n\nDespite her contractions helping milk your cock of all its virile sperm, you really feel like there's no need.  Your powerful jets of cum fill her almost instantly and force thick gobs straight through her cervix and into her waiting womb, filling her to capacity and beyond.  The backflow spurts out of her stretched pussy and into your crotch as you finish up, leaving her with a sizeable belly.");

		MainScreen.text("\n\nYou groan deep and low in your throat in satisfaction.  Taking the dragon's legs in your hands, you pull yourself free of her, letting your cum ");
		if (player.cumQ() < 250) MainScreen.text("dribble");
		else if (player.cumQ() < 1000) MainScreen.text("flow");
		else MainScreen.text("gush");
		MainScreen.text(" from her used cunt and you sit on the ground, while Ember remains limp on the ground, panting. Still suffering from the afterglow of your recent orgasm, you dimly realize that Ember herself doesn't seem to have cum yet; the only fluids dripping from her pussy are yours");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(", and her cock, while engorged and swollen, hasn't poured forth yet");
		MainScreen.text(".");

		MainScreen.text("\n\nYou meet Ember's gaze through half-lidded eyes.  Slowly she rolls over and gets up on all fours, lifting her tail to give you a perfect sight of her cum-painted, dripping, used cunny.  \"<i>Ha... haha... that's all you've got?  C-couldn't even make me... cum...</i>\" Ember teases you, swaying her hips side to side enticingly.");

		//[(corr >= 60)
		if (player.stats.cor >= 66) {
			MainScreen.text("\n\n\"<i>Nor you, me,</i>\" you say, folding your arms.  \"<i>You were the one in charge, so the failure is all yours... luckily, my stamina was enough to finish, even though you became useless halfway through.</i>\"  Picking up your gear, you leave the dragon behind you; she hurls breathless insults at you, but you only answer with a negligent wave.");
			//end scene, reset hours since cum, Ember preg check, minus some fuckin Ember affection
			player.orgasm();
			player.stats.sens += -2;
			emberAffection(-5);
			doNext(camp.returnToCampUseOneHour);
			Flags.list[FlagEnum.EMBER_PUSSY_FUCK_COUNT]++;
			return;
		}
		//else
		MainScreen.text("\n\nShe has a point... furthermore, you can't resist the golden opportunity before you, as the sight manages to stir a brief flush of second life into your loins.  You pounce on the startled dragon, pulling her tail out of the way and roughly grabbing at her generous mounds, before thrusting yourself once more into her cum-slickened pussy.  You begin to pound her, slowly and deliberately, draping her tail carelessly over your shoulder and doing your best to lean over her as you do her doggy-style.");

		MainScreen.text("\n\nEmber roars as your sudden penetration drives her over the edge; her wet dragon juices spill all over your crotch, mixing with the fruits of your recent deposit");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("; her cock jumps and unloads on the ground below, marking this as the spot of your lovemaking");
		MainScreen.text(".  Her pussy grabs at you like a vice, constricting you with such pressure that you have trouble moving, even though her cunt is well-lubed from your mixed fluids.");

		MainScreen.text("\n\nUnable to move, you push yourself as deep into her as you can, and her quivering fuck-hole is only too happy to accept a few extra inches, sucking your shaft deep inside her and holding it there as her muscles massage you in ways you didn't think possible.  Ember looks back at you, with a lusty gaze of deep pleasure as she works to bring you to your second orgasm.  You groan and gasp as you find yourself releasing yourself into her depths again, dredging up reserves you didn't even know you had.");

		//(Low Cum Amount)
		if (player.cumQ() < 250) MainScreen.text("\n\nYou work overtime to push the last of your seed past her cervix to settle into her belly, and don't stop until she has developed a bit of a bulge.");

		//(Medium Cum Amount)
		else if (player.cumQ() < 1000) MainScreen.text("\n\nYour addition to her womb inflates her until she's sporting a pregnant-looking belly; with all the cum you've just given her, she might as well be.");
		//(High Cum Amount)
		else {
			MainScreen.text("\n\nBy the time your overworked ");
			if (player.lowerBody.balls == 0) MainScreen.text("prick is ");
			else MainScreen.text("[balls] are ");
			MainScreen.text("finished, Ember doesn't only look more than a few months pregnant; she looks absolutely huge, like her water could break at any moment!");
		}
		MainScreen.text("\n\nPanting, you slump onto Ember's back, your strength as drained and spent as your cock.  You ask if she's satisfied.");

		MainScreen.text("\n\n\"<i>Yes... let's go again...</i>\" she responds tiredly, before slumping down for a quick nap.  Beyond satisfied yourself, you settle on top of her with a sigh and a groan, repositioning yourself for greater comfort as you join her in sleep.");

		player.orgasm();
		player.stats.lib += .5;
		player.stats.sens += -2;
		doNext(penetrateEmbrahPartII);
	}

	//PART II!
	private penetrateEmbrahPartII(): void {
		MainScreen.clearText();
		MainScreen.text("You wake up to find Ember's face hovering over you with a smile; once she realizes you're awake, she quickly averts her gaze.");
		MainScreen.text("\n\n\"<i>Oh, good!  You finally woke up!  Now, let's hear your excuse for your lack of self-control; I'm going to be sore down there for a while, thanks to you!</i>\" Ember scolds you, snorting a small puff of smoke.");
		MainScreen.text("\n\nYou yawn sleepily and comment that you were merely doing what she wanted; after all, she wanted you to make her cum, and you did.");

		MainScreen.text("\n\n\"<i>Well... yeah... but that doesn't mean you had to be so rough!  Besides that, you took me twice! Twice!  And in a very humiliating pose, no less!</i>\" she adds with another puff of smoke.");

		MainScreen.text("\n\nYou laugh as you recall the finale to your encounter; you didn't hear her complain when you mounted her from behind, and she's the one who picked the position... <i>and</i> from what you recall she seemed to enjoy being on all fours that second time.  Here you thought she was a strong, dominant dragon...");

		MainScreen.text("\n\n\"<i>You... y-you...</i>\" Ember growls at you lowly.  \"<i>You made me...  Bah!</i>\"  Ember gives up on trying to say anything back and darts away before you can say anything else.  Somehow you get the idea that she wasn't all that upset about being reminded; and the brief glance you got of her moist pussy as she turned to leave you only confirms your suspicion.");
		MainScreen.text("\n\nYou smile to yourself and start re-dressing, wincing at a deep aching sensation in [balls]; Ember gave you quite a workout.");

		//(if PC gained increased cum output)
		if (player.cumQ() < 1000) {
			MainScreen.text("\n\nYou wouldn't be surprised if you'll make even more cum than before when you're fully recovered.");
			player.cumMultiplier += 1 + rand(3);
		}
		//(else if already at Ember-given ceiling)
		else MainScreen.text("\n\nStill, you don't think you could produce any more cum than you already do...");

		MainScreen.text("\n\nYour decency restored, you return to camp.");
		Flags.list[FlagEnum.EMBER_PUSSY_FUCK_COUNT]++;
		doNext(camp.returnToCampUseTwoHours);
	}

	//Get Penetrated - also horse-proof, sorry folks! (Z)
	private getPenetratedByEmberLastSexSceneWoooo(): void {
		MainScreen.clearText();
		MainScreen.text(images.showImage("ember-sticks-her-penor-in-your-vagoo"));
		MainScreen.text("Your eyes are drawn to the 16 inches of cool, throbbing ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] > 0) MainScreen.text("dragon");
		else MainScreen.text("human");
		MainScreen.text(" dick between Ember's legs, and you lick your lips hungrily.  Your " + VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " throbs eagerly as you tell Ember you have certain itches you need to scratch... is Ember enough of a " + emberMF("man", "herm") + " to scratch them for you?");

		//(Low Affection)
		if (emberAffection() <= 25) {
			MainScreen.text("\n\n\"<i>Ha!  I'm much more than you can handle!  Talk to me when you have something that can take even half of me.</i>\"  Ember mocks you, as " + emberMF("he", "she") + " walks away.");
			doNext(camp.returnToCampUseOneHour);
			return;
		}
		//(Medium Affection)
		else if (emberAffection() < 75) {
			MainScreen.text("\n\n\"<i>Are you questioning my dragonhood!?  I'll have you know no cock in this world is a match for mine!</i>\" Ember boasts proudly.");
		}
		//(High Affection)
		else {
			MainScreen.text("Ember's cock jumps ");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0 && Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 0) MainScreen.text("to attention");
			else MainScreen.text("out of its protective slit");
			MainScreen.text(" at the mere mention of what you expect " + emberMF("him", "her") + " to do.  \"<i>I'm more than enough to handle two... no... three of you!  And if you want proof all you have to do is ask!</i>\" Ember boasts proudly.");
		}
		MainScreen.text("\n\n\"<i>Well then,</i>\" you coo, one hand perched flirtatiously on your hips, batting your eyes at your draconic lover.  \"<i>If you're so ready to take me and fuck me raw... why don't you prove it?</i>\"");

		MainScreen.text("\n\n\"<i>Fine, come here!</i>\"  Ember grasps your arm and leads you away towards the wastes and beyond.  Once you arrive at a small clearing on the outskirts of your camp, Ember turns to look at you. \"<i>W-why are you still dressed?</i>\" Ember asks, crossing " + emberMF("his", "her") + " arms and tapping " + emberMF("his", "her") + " foot impatiently.");

		MainScreen.text("\n\nYou strip down until you are unabashedly naked, drinking in the look of stunned rapturous lust that Ember is giving you.  Playing your fingers gently across your upper arms, you pout and ask if " + emberMF("he", "she") + "'s going to keep you waiting, enjoying your emotional control over the horny dragon.");

		MainScreen.text("\n\nEmber flinches, " + emberMF("his", "her") + " trance broken.  \"<i>I... umm... fine!  Come here!</i>\"  Ember steps toward you.  You open your arms, ready to wrap " + emberMF("him", "her") + " in a hug, but instead find yourself swept off of your feet.  The dragon grins wickedly at you before suddenly plunging into a ferocious kiss, " + emberMF("his", "her") + " long tongue worming its way around ");
		if (player.upperBody.head.face.tongueType == TongueType.HUMAN) MainScreen.text("yours ");
		else MainScreen.text("your own inhumanly sinuous muscle ");
		MainScreen.text("and slithering almost into your throat.  " + emberMF("He", "She") + " kisses you madly, even as " + emberMF("he", "she") + " sinks to " + emberMF("his", "her") + " knees and gently lays you out on the ground, clearly ready to start the sexing.");
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("  As if " + emberMF("his", "her") + " hands caressing your cock weren't evidence of that.");

		MainScreen.text("\n\nEmber begins by gently probing your [vagina] with " + emberMF("his", "her") + " tip, savoring the heat emanating from your oozing cock-sleeve.  \"<i>Ready for this?</i>\" Ember asks, trembling in barely contained anticipation.  You groan throatily and try to wrap your [legs] around " + emberMF("his", "her") + " hips in hopes of pulling " + emberMF("him", "her") + " into connection with you.  Catching the hint, Ember begins " + emberMF("his", "her") + " slow plunge into your depths.");

		MainScreen.text("\n\nYou gasp and then moan in pleasure as Ember's ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] > 0) MainScreen.text("draconic ");
		else MainScreen.text("human-like ");
		MainScreen.text("cock begins making its way past your labia.");

		//(if Ember has a dragon cock)
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] > 0) {
			MainScreen.text("\n\nFirst comes the tapered spear-like head of Ember's penis; it slowly stretches you, sliding into you without resistance.  Then comes " + emberMF("his", "her") + " ridged shaft; each ridge driven inside feels like a milestone being conquered.  ");
			player.cuntChange(32, true, false, true);
			MainScreen.text("Finally you arrive at the base of " + emberMF("his", "her") + " cock where a bulbous knot sits; thankfully it hasn't inflated yet, but still, you can't help but groan as you are stretched even more by its entrance.");
		}
		//else
		else {
			MainScreen.text("\n\nEmber's member drives itself inside you, tamping down your heat with its surprisingly cool flesh.");
			player.cuntChange(32, true, true, false);
			MainScreen.text("  It's not as if it isn't still warm... but its lower temperature feels relieving and exciting all the same.");
		}
		MainScreen.text("\n\n\"<i>I-it's in!</i>\" Ember remarks happily as " + emberMF("his", "her") + " hips make contact with yours.  \"<i>I'm going to start moving now.</i>\"  You nod your permission.");

		//(if Ember has a dragon cock)
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] > 0) {
			MainScreen.text("\n\nThe way back as Ember slowly pulls " + emberMF("his", "her") + " cock out of your dripping pussy is as pleasurable as " + emberMF("his", "her") + " entrance was.  First the knot tugs at your insides, drawing a sigh of relief as it slips out of your stretched netherlips.  Then come the oh-so-delicious ridges, tugging and massing your passage with small ripples of pleasure that rock you to your core.  Finally comes the tip... the stubborn tip that tugs at your pussy lips, refusing to leave its warm confines, pulling at your labia until Ember decides to plunge back.");
		}
		else {
			MainScreen.text("\n\nYou almost feel like moaning in agony as Ember's flesh leaves your love-hole empty, to grow back into its unbearable heat... and then cry out in joy as Ember begins to thrust back inside you, once again quenching the flames of your lust.");
		}
		MainScreen.text("\n\nYou delight in Ember's motions; insecure " + emberMF("he", "she") + " may be when it comes to showing feelings, but get " + emberMF("him", "her") + " into the actual act of lovemaking and " + emberMF("he", "she") + " really starts to show what " + emberMF("he", "she") + "'s made of!  You wrap Ember tighter in your [legs] and begin to buck and thrust, repeatedly impaling yourself on " + emberMF("his", "her") + " delicious manhood, savoring the feeling of being stretched and filled, scraping your [clit] up and down " + emberMF("his", "her") + " cock in order to heighten the sensations of your lovemaking.");

		MainScreen.text("\n\nEmber leans over you, panting, " + emberMF("his", "her") + " hot breath mere inches from your " + HeadDescriptor.describeFace(player) + ", gazing at you through half-lidded, lust-addled eyes.  \"<i>You feel so good... so hot... so sexy...</i>\" Ember says mid-pant.  You pant right back, reaching up and wrapping your arms around " + emberMF("his", "her") + " neck, staring back at " + emberMF("him", "her") + " with the same expression and telling " + emberMF("him", "her") + " you think " + emberMF("he", "she") + " feels just as good.");

		MainScreen.text("\n\nEmber thrusts deeply into you and gasps; pre shoots out of " + emberMF("his", "her") + " cock into your well lubed tunnel and " + emberMF("he", "she") + " stops moving.  \"<i>I-I'm getting close...</i>\" Ember warns, trembling in pleasure as your walls constrict and grab at " + emberMF("his", "her") + " shaft, eager for the friction that sets your nerves alight with pleasure.");

		MainScreen.text("\n\nYou snarl back softly through your teeth; you're not ready yet!  Well, if " + emberMF("he", "she") + "'s close, then " + emberMF("he", "she") + " needs to go faster, so you can cum too!  You wrap your arms and [legs] jealously around " + emberMF("him", "her") + ", pistoning back and forth with all the speed and force you can muster, using every muscle you can control in your [vagina] to milk and squeeze your draconic lover... yes, yes, just a little more... Ember groans at your sudden movements, faltering and crashing atop you limply as the overwhelming pleasure saps " + emberMF("him", "her") + " of all " + emberMF("his", "her") + " strength.");

		MainScreen.text("\n\nFrustrated, horny, and almost there, you roll " + emberMF("him", "her") + " over onto " + emberMF("his", "her") + " back and continue to buck... yes, yes, here it is!  You cry out in ecstasy as the waves of pleasure rock and surge through your body; orgasm hits you like a tidal wave, cascading through your nerves and driving you into welcome, blissful release.");
		if (player.lowerBody.cockSpot.hasCock()) {
			MainScreen.text("  Your cock explodes, belching cum to ");
			if (player.cumQ() < 250) MainScreen.text("spatter");
			else if (player.cumQ() < 1000) MainScreen.text("drench");
			else if (player.cumQ() < 2000) MainScreen.text("completely cover");
			else MainScreen.text("utterly soak");
			MainScreen.text(" your draconic partner.");
		}
		MainScreen.text("\n\nYour orgasm triggers Ember's own, and you feel " + emberMF("his", "her") + " cock throb and grow even harder.  With a roar, Ember blows " + emberMF("his", "her") + " load deep into your convulsing [vagina], making sure to paint every nook and cranny inside you with white, refreshing dragon-spunk.  You can't help but sigh in relief as you feel Ember's seed trail its way inside you, into your waiting womb; the feeling is so intense it feels as if you were set ablaze and " + emberMF("he", "she") + " just poured a bucket of water, mercifully putting out the flames.  With a groan, Ember rolls you over on your side and pulls out, letting a cascade of white dragon-jism leak from your used and abused [vagina].");

		MainScreen.text("\n\nYou sigh softly in pleasure and relief, basking in the wonderful afterglow of a nice fuck with a nice lover.  Unthinkingly, you cuddle up to the dragon, trying to entrap " + emberMF("him", "her") + " so you can hold " + emberMF("him", "her") + " close and savor this feeling of bliss together.  Absently, one of your hands drifts down to your pussy, feeling the dragon-jism leaking from it and starting to play with it.  Like a child with water you dabble your fingers in the thick, frothy, strong-smelling spunk, smearing it around with carefree abandon, painting the inside of your thighs and streaking it up your belly.");

		MainScreen.text("\n\nYour actions are not unnoticed by the dragon laying beside you; Ember swallows dryly and begins panting anew, and soon enough you feel something poking at your thighs.  Looking down, you see Ember is sporting a brand new erection.  \"<i>I-I can't help it if you do things like this in front of me...</i>\" Ember says in excuse.");

		MainScreen.text("\n\nYou merely smile hungrily.  Well, if " + emberMF("he", "she") + "'s so eager for a second round, you're not going to disappoint " + emberMF("him", "her") + ".  You gently take hold of " + emberMF("his", "her") + " penis and slowly guide it back between your netherlips, playfully telling Ember you'll go slower and easier on " + emberMF("him", "her") + " this time.");

		MainScreen.text("\n\nEmber hisses in pleasure; " + emberMF("his", "her") + " still-sensitive shaft barely makes its way inside you before it throbs and explodes in a second orgasm, filling you up with an extra barrage of dragon-seed.  You can't help but giggle at Ember's unexpected climax. \"<i>C-careful!  I'm still sensitive!</i>\" Ember gasps, as " + emberMF("he", "she") + " slowly pulls out of you again.  You give " + emberMF("him", "her") + " an expression so innocent that butter wouldn't melt in your mouth, and then gently reinsert " + emberMF("him", "her") + " again.  " + emberMF("He", "She") + "'s still flaccid by this point, but you're confident that will soon change.");

		MainScreen.text("\n\nEmber groans as " + emberMF("he", "she") + " grows hard once more, sensitive and throbbing as " + emberMF("his", "her") + " shaft slowly fills you with its increasing girth.  You begin to buck your hips back and forth; you wonder how many orgasms you can coax from your helpless draconic lover...  \"<i>C-cumming!!</i>\" Ember roars as " + emberMF("he", "she") + " shoots a few more jets inside you.");

		MainScreen.text("\n\n\"<i>I-I can't keep doing this... you're going to dry me out...</i>\" Ember says, panting in exhaustion, although from " + emberMF("his", "her") + " expression you'd have a hard time believing " + emberMF("he", "she") + " isn't enjoying it.  You give " + emberMF("him", "her") + " an exaggerated pout and tell " + emberMF("him", "her") + " you're not quite done yet.  Surely, just one or two more...?");
		//[(has History: Slut or Whore)
		if (player.perks.has("HistoryWhore") || player.perks.has("HistorySlut")) MainScreen.text("  Using the skills you've honed, you make the muscles in your vagina ripple and wrinkle, teasing the cock caught inside you in a way few women can.");
		MainScreen.text("  Mmm... you can feel your own second orgasm coming in hot.  Maybe after another 4 or 5, you'll let the dragon go...");

		MainScreen.text("\n\nEventually, exhausted, belly stuffed with dragon-spunk to the point you look ready to birth a pair of dragon toddlers, and feeling incredibly well-sated, you lay on Ember's chest, cuddling your limp, utterly drained lover.  The dragon is fast asleep, having passed out from exhaustion, and you amuse yourself by listening to " + emberMF("his", "her") + " heart beating as " + emberMF("he", "she") + " inhales and exhales softly in " + emberMF("his", "her") + " sleep.  To be honest, you could use a nap too, and you pass out atop " + emberMF("him", "her") + ".");
		player.orgasm();
		player.stats.sens += -2;
		if (player.stats.lib > 50) player.stats.lib += -3;
		player.slimeFeed();
		doNext(getPenetratedByEmberLastSexSceneWooooPartII);
	}

	//Part II
	private getPenetratedByEmberLastSexSceneWooooPartII(): void {
		MainScreen.clearText();
		MainScreen.text("You manage to wake up before your sleeping draconic lover; it seems at some point in " + emberMF("his", "her") + " sleep Ember saw it fit to wrap you tightly in " + emberMF("his", "her") + " arms, tail and even legs.  You snuggle deeper into the dragon's embrace and enjoy it; " + emberMF("he", "she") + "'s usually too emotionally cowardly to treat you like this.  Unfortunately the embrace doesn't last long... Ember soon wakes up, yawning groggily and slowly disentangling " + emberMF("him", "her") + "self in order to stretch.  The dragon's face lights in pain and " + emberMF("he", "she") + " quickly moves " + emberMF("his", "her") + " hand to hold " + emberMF("his", "her") + " crotch.");
		MainScreen.text("\n\n\"<i>Ow...</i>\"  Ember looks at you accusingly.  \"<i>I feel sore all over... especially down here...</i>\" Ember says, massaging " + emberMF("his", "her") + " ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 1) MainScreen.text("protective slit");
		else MainScreen.text("limp cock and balls");
		MainScreen.text(".  \"<i>You used me like a fucktoy!</i>\"");

		MainScreen.text("\n\nYou admit, yes, you did... but is " + emberMF("he", "she") + " really going to sit here and tell you that " + emberMF("he", "she") + " didn't love being used?  Besides, who was it who said ");
		if (emberAffection() < 75) MainScreen.text(emberMF("his", "her") + " cock was unlike anything else in this world?");
		else MainScreen.text(emberMF("he", "she") + " could handle two or even three of you at the same time?");
		MainScreen.text("  You expected more resistance if that was the case.");

		MainScreen.text("\n\n\"<i>Yeah, fine!  But you didn't have to make me cum so much!  I think I almost got dehydrated!</i>\"");

		MainScreen.text("\n\nYou heave a great sigh in exaggerated pity.  Well, you're sure " + emberMF("he", "she") + " will be full and ready to go in no time, you tell " + emberMF("him", "her") + ".  You get up, stifle a wince - your body is going to be paying for your extravagance, but you don't need Ember to know that - and try to make the task of heading over and picking up your clothes as erotic as possible.  When you look back, you smirk at the sight of your success; Ember's trembling, trying to contain another hard-on.  Gently, you ask if maybe " + emberMF("he", "she") + " wants to have round... hmm, what would it be?  Round twelve?");

		MainScreen.text("\n\nEmber's eyes widen in terror.  \"<i>What!?  No!  Not again!</i>\" Ember screams, getting up and wasting no time in bolting away, setting into a unsteady flight as soon as " + emberMF("he", "she") + "'s gotten far enough.  You wait until " + emberMF("he", "she") + "'s gone, and then burst out laughing.  Totally worth it... even if you are, as the saying goes, going to be sleeping on the couch for a week as a result.");
		//slimefeed, preg check, reduce lust, reset hours since cum, drain massive libido
		doNext(camp.returnToCampUseOneHour);
	}


	//Breeding Setup
	//Note: I don't know if it's possible to go into rut as well as heat... But impregnating or being impregnated by Ember should clear the heat/rut status. For simplicity's sake, having either of those stats qualifies you for the scenes, either male or female variant, granted you have the required parts.

	//This scene only appears if PC and Ember have matching parts (ie: M/F, M/H, F/H, H/H)
	//This scene leads right into Breeding Ember or Bred by Ember, pick the one that fits appropriately.
	//Occurs the next time the PC is in the camp after they go into heat/rut, if they're still in heat then. It's possible to get impregnated by something else in the meantime...
	//If the PC waits/rests, trigger this anyways.
	//Ember must not be pregnant if you're going to breed her and the PC must not be pregnant to be bred.

	/* ONE OF THESE SHOULD BE TRUE
	 //Female Breeding Scene:
	 //PC not pregnant, Ember has dick, PC is in heat.
	 //Male scene
	 //PC has dick, ember not pregnant, PC is in rut*/
	public emberRapesYourHeatness(): void {
		MainScreen.text("\nA pair of scaly, clawed hands suddenly grab your [hips] and you feel Ember take a big whiff of your scent. \"<i>So good... you smell so good, y'know [name]?</i>\"");

		MainScreen.text("\n\nYou don't even start at " + emberMF("his", "her") + " actions; all you can think of is the deep need burning in your crotch, ");
		if (player.lowerBody.vaginaSpot.hasVagina() && player.inHeat && (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3))
			MainScreen.text("your [vagina] aching to be filled and your womb put to its proper purpose");
		else MainScreen.text("[eachCock] burning to be seeding ripe, ready wombs");
		MainScreen.text(".");

		MainScreen.text("\n\nEmber responds by ");
		if (player.lowerBody.vaginaSpot.hasVagina() && player.inHeat && (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3))
			MainScreen.text("humping against you, smearing your thigh with dragon pre.");
		else MainScreen.text("tightly pressing her drooling, puffy netherlips on your thighs.");
		MainScreen.text("  \"<i>I need you, [name].  I need you so badly... can you see how badly I need you?</i>\" Ember asks, panting in barely contained lust.  \"<i>I want to fuck you so badly... Let's make a baby now!</i>\"");
		dynStats("lus", 10 + player.stats.lib / 10);
		MainScreen.text("\n\nWhat do you say?");
		//[Accept] [Deny]
		simpleChoices("Accept", timeToPuffTheMagicDragon, "Deny", fuckOffEmberIWantANap, "", null, "", null, "", null);
	}

	//[=Deny=]
	private fuckOffEmberIWantANap(): void {
		MainScreen.clearText();
		dynStats("lus", 10 + player.stats.lib / 10);
		MainScreen.text("Oh, your ");
		if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("[vagina]");
		if (player.gender == 3) MainScreen.text(" and ");
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("[eachCock]");
		MainScreen.text(" so yearn");
		if (player.gender == 1 || player.gender == 2) MainScreen.text("s");
		MainScreen.text(" to take Ember up on " + emberMF("his", "her") + " offer! ...But you are better than this; you are not some mindless animal, a slave to your lusts.  You fight down the arousal gnawing at you and tell Ember you don't want to fuck " + emberMF("him", "her") + ".");
		MainScreen.text("\n\nEmber whimpers at your words.  \"<i>C-can't you see what you're doing to me? C'mon [name], just a quick romp!</i>\" Ember pleads.");
		MainScreen.text("\n\nYou tell " + emberMF("him", "her") + " that you're sorry, but you don't want to have children - at least, not yet.  And if you have sex in your state, that's what will happen.");
		MainScreen.text("\n\nEmber growls, spins you around and steals a kiss right out of your mouth.  \"<i>I hate you... you... you sexy beast!</i>\"  Having said that " + emberMF("he", "she") + " unfurls her wings and flies off into the sky, barely managing to fly straight due to " + emberMF("his", "her") + " ");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("protruding prick");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" and ");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("creaming wet vagina");
		MainScreen.text(".  No doubt " + emberMF("he", "she") + "'s off to take care of " + emberMF("his", "her") + " needs by " + emberMF("him", "her") + "self.  You doubt " + emberMF("he", "she") + "'s going to be happy once " + emberMF("his", "her") + " head is clear... still, " + emberMF("he", "she") + "'ll get over it.");
		emberAffection(-10);
		//Set some cooldown so this doesn't proc all the goddamn time!
		player.statusAffects.add(new StatusAffect("EmberFuckCooldown", 12, 0, 0, 0)));
		doNext(playerMenu);
	}

	//[=Accept=]
	private timeToPuffTheMagicDragon(): void {
		MainScreen.clearText();
		MainScreen.text("Dazed and befuddled, you sniff Ember right back.  Mmm... " + emberMF("He", "She") + " smells delicious too, you tell " + emberMF("him", "her") + ".");
		MainScreen.text("\n\n\"<i>I know, rrrrriggghhht?</i>\" Ember purrs in your ear, stealing a teasing lick. \"<i>Oh by Marae, take off your [armor] and let's do it!  I don't care if we're in the middle of the camp!</i>\"");

		MainScreen.text("\n\nYou barely manage to resist " + emberMF("his", "her") + " insinuations, instead forcing yourself to stagger over to your tent for privacy's sake.  It's harder than you'd think, not just because of the raging fire in your loins, but because Ember is insistently clinging to you, doing " + emberMF("his", "her") + " damndest to remove your [armor].  You can appreciate " + emberMF("his", "her") + " enthusiasm, but all " + emberMF("he", "she") + "'s doing is getting in the way!");

		MainScreen.text("\n\nSomehow you manage to avoid " + emberMF("his", "her") + " clinging claws and strip off to your undergarments, which Ember promptly bites into, nearly ripping them off your [legs].  Ember flops down on your bedroll, chewing on your undies.  " + emberMF("He", "She") + " spreads her legs invitingly and spits out your - now soaked - underpants.  \"<i>Let's do it on your bed!  It smells so much like you...  Did I say how good you smell?  C'mon, [name]; fuck me dammit!</i>\"");
		MainScreen.text("\n\nYou can't take it anymore and throw yourself at " + emberMF("him", "her") + "; " + emberMF("he", "she") + " wants you so bad?  Well, you want " + emberMF("him", "her") + " just as bad; let's see what " + emberMF("he", "she") + "'ll do with you!");
		//(if PC and Ember are herms AND not pregnant){
		if (player.pregnancyIncubation == 0 && !pregnancy.isPregnant && Flags.list[FlagEnum.EMBER_GENDER] == 3 && player.gender == 3) {
			MainScreen.text("\n\n(Who should bear the kids?)");
			//[Ember] [You]
			simpleChoices("Ember", breedEmberPregnantAsIfThereWasAnyOtherKindOfBreeding, "You", getKnockedUpByEmbrahBroBaby, "", null, "", null, "", null);
		}
		//[Play appropriate breeding scene.]
		//Female Breeding Scene:
		//PC not pregnant, Ember has dick, PC is in heat.
		else if (player.pregnancyIncubation == 0 && (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) && player.inHeat) {
			getKnockedUpByEmbrahBroBaby();
		}
		//Male scene
		//PC has dick, ember not pregnant, PC is in rut
		else {
			breedEmberPregnantAsIfThereWasAnyOtherKindOfBreeding();
		}
	}

	//Bred by Ember
	//Only available to Medium/High Affection Ember.
	//Only occurs if the PC has a pussy and is in heat; Ember must have a dick; both must not be pregnant.
	//In case Ember and the PC are herms, both being able to impregnate and be impregnated. One of the scenes will be randomly choosen.
	//Ember never fails to impregnate the PC or be impregnated - unless the player is on contraceptives.
	private getKnockedUpByEmbrahBroBaby(): void {
		MainScreen.clearText();
		MainScreen.text("Ember grabs you and rolls you around, pinning you under " + emberMF("his", "her") + " weight, whilst kissing you.  You allow the dragon to press you into the ground, rubbing your hands across ");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 && Flags.list[FlagEnum.EMBER_MILK] == 0) MainScreen.text("his flat, muscular chest");
		else MainScreen.text(emberMF("his", "her") + " soft, squeezable boobs");
		MainScreen.text(" and savoring the kiss.  Emboldened, you poke your tongue into " + emberMF("his", "her") + " mouth, to see how " + emberMF("he", "she") + " will react.");

		MainScreen.text("\n\nEmber shows no resistance, pushing " + emberMF("his", "her") + " chest out into your hands and using " + emberMF("his", "her") + " own tongue to draw yours in, while simultaneously probing your mouth.  With a wet <b>smack</b> Ember breaks the kiss.  \"<i>Don't worry about anything... I'll make sure to make this enjoyable for both of us, and by the end, you'll be full of ");
		if (Flags.list[FlagEnum.EMBER_OVIPOSITION] == 0) MainScreen.text("little dragons");
		else MainScreen.text("dragon eggs");
		MainScreen.text(", my beautiful.</i>\"  Ember resumes " + emberMF("his", "her") + " kissing; " + emberMF("his", "her") + " own hands roaming all over your body, as if mapping you out through touch, looking for the best places to touch and tease.");

		MainScreen.text("\n\nYou try to hold your own against your overly affectionate draconic lover, stroking " + emberMF("his", "her") + " scaly limbs and trying to discover where " + emberMF("his", "her") + " erogenous zones are so that you can show " + emberMF("him", "her") + " what it's like to be ready to beg and plead for sex.  You can feel the heat burning in your loins, a wet, ready fire in your [vagina]; you're ready to be bred, to have your gut filled with Ember's seed until your womb is jam-packed with ");
		if (Flags.list[FlagEnum.EMBER_OVIPOSITION] == 0) MainScreen.text("dragonlings");
		else MainScreen.text("dragon eggs");
		MainScreen.text(".  You want to breed!");

		//(if PC has a dick)
		if (player.lowerBody.cockSpot.hasCock()) {
			MainScreen.text("\n\nOne of Ember's roaming hands find your erect [cock biggest] and begins stroking, not caring that you're smearing " + emberMF("his", "her") + " body with pre.  While Ember's other hand settles on stroking your thighs, coaxing you to open your legs before aligning " + emberMF("his", "her") + " rock hard shaft with your waiting [vagina].");
		}
		else {
			MainScreen.text("\n\nEmber's roaming hands settle on your thighs, coaxing you to open your legs before aligning " + emberMF("his", "her") + " rock hard shaft with your waiting [vagina].");
		}
		MainScreen.text("  You groan throatily, your need burning through you, and start trying to grind yourself against Ember's shaft.  " + emberMF("He", "She") + " pins you down, though, making it impossible for you to actually do anything more than rub " + emberMF("his", "her") + " glans against your needy netherlips.");

		MainScreen.text("\n\nFortunately, the dragon " + emberMF("himself", "herself") + " seems just as turned on and ready as you are.  \"<i>You're so hot I can feel your flesh burning against mine.  I-I can't hold back!</i>\" " + emberMF("he", "she") + " growls deep in " + emberMF("his", "her") + " throat.");

		MainScreen.text("\n\nEmber first thrust is awkward, missing its target and instead grinding against your netherlips; you almost curse the dragon's lousy aim, but fortunately " + emberMF("his", "her") + " second thrust hits true and you sigh in relief as you feel Ember's tapered shaft settle inside your contracting walls, pulsing, massaging your insides as much you work to massage " + emberMF("his", "her") + " own shaft.  You exchange moans of pleasure between kisses, Ember's rumbling purr massages your [chest] as " + emberMF("he", "she") + " grinds " + emberMF("his", "her") + " whole body against you.  Briefly, you open your eyes to gaze into " + emberMF("his", "hers") + "; you almost cum at the sight. Ember's eyes are set aglow with lust, burning with a primal, instinctual need...");
		player.cuntChange(20, true, true, false);

		//(if Ember has a vagina)
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("\n\nYour bedroll is growing slick underneath you as lubricant drools from the herm dragon's neglected cunt, her tail thrashing around madly before sliding into the wet orifice to help goad her on in her goal to breed you.  ");
		else MainScreen.text("\n\n");
		MainScreen.text("You growl throatily, feeling that same need burning inside you. You clutch and claw against the dragon, fingers grasping deeply into " + emberMF("his", "her") + " scaly limbs as you drag, scrape, and thrust yourself against " + emberMF("him", "her"));
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.text(", your neglected [cock] drooling pre-cum that is being smeared all across your belly and " + emberMF("his", "hers") + " with every move you make");
		MainScreen.text(".  Gods, you can feel " + emberMF("him", "her") + " filling you...");

		MainScreen.text("\n\nEmber huffs and growls with each thrust, until with a roar " + emberMF("he", "she") + " clutches your hips, penetrating you as far as " + emberMF("he", "she") + " can, then blowing " + emberMF("his", "her") + " load deep into your womb.  \"<i>Aah! T-take it all!</i>\" Ember groans.");

		MainScreen.text("\n\nIt's not as if you have much of a choice, but you're happy to receive it, letting the dragon's cool, refreshing spunk surge into your burning cunt, deluging into your aching, <i>needing</i> womb. You groan with hollow joy; it feels so good... but it's not enough, you want more, and you tell the dragon that " + emberMF("he", "she") + " isn't done with you yet.");

		MainScreen.text("\n\n\"<i>Of course not...</i>\" Ember grins.  \"<i>Just give me a few... phew... minutes to recover.</i>\"");

		MainScreen.text("\n\nYou find yourself snarling in frustration, displaying your teeth - a few minutes isn't good enough!  You need more, and you need it now!  With a sudden thrust of motion you slam into the dragon, striving to push " + emberMF("him", "her") + " over so you can mount " + emberMF("him", "her") + " instead.");

		MainScreen.text("\n\nStartled and caught off-guard, you are soon straddling the bewildered dragon.  With a lustful sneer you tell " + emberMF("him", "her") + " that you want " + emberMF("him", "her") + " now, not in a few minutes, and start to buck and thrust your hips to make it clear you're getting what you want, even if it means taking Ember along for the ride instead.");

		MainScreen.text("\n\n\"<i>Ah! Taking charge, are you?  Oh!  Okay, but... Ah!... only this time.</i>\"  Ember lays back, thrusting lightly to meet your own bucks into " + emberMF("his", "her") + " dick, panting and moaning as the sound of wet slapping fills the tent.");

		MainScreen.text("\n\nYou don't dignify that with a response, instead savoring the sensation of feeling " + emberMF("his", "her") + " long, thick cock in your needy cunt, squeezing and clenching with all the instinctual knowledge and practice this world has given you.  Mmm... the segment-like ridges stroke your inner walls in the most delicious ways...  You moan throatily, needily, riding the dragon with fervor of a " + player.mf("herm", "woman") + " possessed; you want to get pregnant... you <b>have</b> to get pregnant!");

		MainScreen.text("\n\nDriven by the most primal of instincts, you start trying to coax Ember into doing you harder; doesn't " + emberMF("he", "she") + " want to be a father?  Doesn't " + emberMF("he", "she") + " want you to bear " + emberMF("his", "her") + " offspring?  Or would " + emberMF("he", "she") + " rather you go out into the wilderness and risk letting some degenerate monster take advantage of your ripe, ready womb instead?  See you wandering around camp with your belly distended with a litter of imps or a bestial minotaur's calf instead of a new dragon, Ember's own blood-child?");

		MainScreen.text("\n\nYour words seem to have the desired effect; because shortly after you're done Ember lifts you off along with " + emberMF("him", "her") + " into " + emberMF("his", "her") + " arms.  " + emberMF("He", "She") + " looks deeply into your eyes with renewed fire.  \"<i>Never,</i>\" Ember says, kissing you deeply and beginning to pump into you with abandon.  This is what you were waiting for.  Finally!");

		MainScreen.text("\n\nEmber's brutal thrusts rock you to the core, sending rippling waves of pleasure through you.  " + emberMF("He", "She") + " kisses you passionately, slurping and suckling on your tongue, savoring your taste.  You gasp and shudder, thrusting back just as brutally, striving to grapple and suckle the dragon's inhumanly long and nimble tongue so that you can savor " + emberMF("his", "her") + " taste as well.");

		//(if Ember has a pussy)
		if (Flags.list[FlagEnum.EMBER_GENDER] == 2) MainScreen.text("\n\nYou hear the wet splattering of femcum on your wet bedroll; Ember's orgasm ressurging with renewed vigor.  ");
		else MainScreen.text("\n\n");
		MainScreen.text("A fresh batch of dragon cum blasts its way into your overfilled insides, splattering about inside your tent; and to your surprise Ember continues thrusting into you without ever slowing down.  Even as you moan into the kiss, a third orgasm blasts its way into you, inflating your belly with fertile dragon seed.");

		MainScreen.text("\n\nYou are so close now... so close!  Your hands unthinkingly reach out for Ember's, seeking to entwine your fingers with those of the " + emberMF("male", "herm") + " that you know is about to father your child.  You break the kiss, throwing your head back to moan towards the sky as you finally achieve orgasm.");

		//(if PC has a dick)
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("\n\nYou cum into your chests and bellies, glueing you to the dragon with your thick spunk.  ");
		else MainScreen.text("\n\n");
		MainScreen.text("Your contracting walls milk the dragon's sensitive cock, trying to coax even more seed out of your panting dragon lover.  \"<i>I-it's time,</i>\" Ember mutters, crashing into your wet bedroll and thrusting deep inside you.");

		MainScreen.text("\n\nYou gasp as you feel pressure build in your ravaged vulva, and realize it's Ember's knot!  It's swelling!  The knot is filling you so deliciously, you can't help but release another wave of fluids until Ember plugs you closed, tying the two of you together.");

		MainScreen.text("\n\nYou can feel it.  Ember continues to fill you with a slower but steady trickles of seed.  You briefly wonder how the dragon can hold so much cum inside " + emberMF("him", "her") + ", but ultimately you decide that doesn't matter and relax on top of the spent dragon, enjoying your closeness while it lasts.");

		MainScreen.text("\n\nEmber sighs, rubbing your back with a hand while hugging you close with the other.");

		MainScreen.text("\n\n\"<i>Don't you just assume this makes us official mates,</i>\" Ember murmurs into your ear.  You lift your head to look into " + emberMF("his", "her") + " ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 1) MainScreen.text("blushing ");
		MainScreen.text("face.  \"<i>But if you must know, I do love you.</i>\"   With a final sigh Ember sets down on your bedroll for a quick nap.");

		MainScreen.text("\n\nFeeling " + emberMF("his", "her") + " knot still swollen and anchoring you together, you sigh softly and settle down with the dragon to recover, figuring you'll be free in about an hour's time.  In the meantime, you're content to just cuddle " + emberMF("him", "her") + " close, one hand going to your cum-inflated belly.  You'd almost swear you can feel the draconic virility cream at work, the cool fluid of life drowning your burning need to breed and already beginning to brew what will be a new ");
		if (Flags.list[FlagEnum.EMBER_OVIPOSITION] == 0) MainScreen.text("baby dragon");
		else MainScreen.text("dragon egg");
		MainScreen.text(".  Yawning, you curl up to the dragon for a quick nap of your own.");
		player.orgasm();
		player.stats.sens += -2;
		//Preg shit goez hurdur
		player.knockUp(PregnancyType.EMBER, PregnancyType.INCUBATION_EMBER, 0); //Will always impregnate unless contraceptives are in use
		player.statusAffects.add(new StatusAffect("EmberFuckCooldown", 36, 0, 0, 0)));
		doNext(createCallBackFunction(emberBreedingAfterMathWatchOutForRadioactiveFallout, false));
	}

	//Breeding Ember
	private breedEmberPregnantAsIfThereWasAnyOtherKindOfBreeding(): void {
		MainScreen.clearText();
		//Silently steal her virginity.
		Flags.list[FlagEnum.EMBER_PUSSY_FUCK_COUNT]++;
		let x: number = player.cockThatFits(emberVaginalCapacity());
		if (x < 0) x = player.smallestCockIndex();
		MainScreen.text("Ember catches you and rolls you around, pinning you to the ground under her.  She smiles at you seductively and reaches down to stroke your " + CockDescriptor.describeCock(player, x) + ".");
		if (player.lowerBody.balls > 0) MainScreen.text("  She then reaches down lower to rub at your cum filled orbs.");
		if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("  The tip of her tail gently teases your slick [vagina] with tiny strokes.");
		MainScreen.text("  You shudder and instinctively thrust towards her, letting her feel your needy cock, full and aching to father young.");

		MainScreen.text("\n\n\"<i>You're so sexy...  You have no idea,</i>\" Ember purrs dreamily.  With a soft smile, you tell her that she's quite sexy herself - maybe not the smartest thing to say, but all that comes to mind with your brain befuddled by your surging hormones, bewitched by the delicious smells that are rolling off of her now that she's so close, so ripe, so ready...");

		MainScreen.text("\n\nEmber jumps off you momentarily to inhale your musk, stroking you until a bead of pre forms on your " + player.cockHead(x) + ".  Ember's eyes grow wide, as if she had spotted a pearl; and she wastes no time in extending her tongue to lick the bead away.  \"<i>Hmm, delicious...  You're ready, and so am I!</i>\"");

		MainScreen.text("\n\nAiming your cock upwards; Ember straddles you and lowers herself on your pulsing " + CockDescriptor.describeCock(player, x) + ", hissing in pleasure as your hot flesh finally makes contact with her drooling fuckhole");
		if (emberHasCock()) MainScreen.text(", her own cock springing up and throbbing with the electric contact.");
		else MainScreen.text(".");

		MainScreen.text("\n\nYou hiss back to her at the sensations that fill you with such pleasure, your yearning breeding rod finally slotted into a ripe, ready breeding hole, her deliciously cool inner walls enveloping your burning hot flesh.");

		MainScreen.text("\n\nYou take hold of her shoulders, feeling the scales and the steely muscles underneath, and start to thrust yourself into her, bucking and pistoning your hips, driving yourself into that cool, wet hole, giving yourself over to the need to impregnate her.");

		MainScreen.text("\n\n\"<i>Ah!  Yes!  M-my breasts!  Uh!  Please!</i>\" Ember begs, holding your shoulders for support; her glazed eyes looking deep into yours, overpowered by her need to breed with you.  You dimly manage to latch onto her plea and begin to caress and grope the great, heavy bosom of your draconic lover, feeling the ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text("scale-covered ");
		MainScreen.text("orbs gently squish ");
		if (Flags.list[FlagEnum.EMBER_MILK] > 0) MainScreen.text("and leak milk ");
		MainScreen.text("under your grasp.");

		MainScreen.text("\n\nEmber moans, pushing her chest out into your hands, allowing you to twiddle her nipples (and isn't that an odd thing?  A reptilian girl-thing with breasts and nipples? A part of your mind dimly notes), but ");
		if (Flags.list[FlagEnum.EMBER_MILK] > 0) MainScreen.text("the slowly trickling rivulets of milk along with ");
		MainScreen.text("Ember's pleased moans are enough to make you push away such thoughts, you're glad she has those!");

		MainScreen.text("\n\nYou hungrily kiss her ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text("draconic ");
		else MainScreen.text("oh-so-human ");
		MainScreen.text("face, nipping lightly at her lip, rolling your tongue over hers and savoring her inhuman tastes; Ember answers in kind with a kiss of her own, purring and moaning into your mouth.  Her vibrating breasts massage your hands as you knead, lift, and then roll them about.");

		//(if Ember has a dick)
		if (emberHasCock()) {
			MainScreen.text("\n\nYou feel something poke your [chest] and look down to see Ember's painfully erect ");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 || Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 1) MainScreen.text("dragon ");
			MainScreen.text("prick.  With a mischievous curl of your lips, you pull Ember deeper into your kiss and grab her cock, stroking it vigorously.");
		}

		MainScreen.text("\n\nEmber squeals into your kiss - a girly squeal you didn't think possible for the usually brash dragon.  Her pussy contracts and pulls at your throbbing member; ");
		if (emberHasCock()) MainScreen.text("her cock spurts a few jets of cum onto your [chest]; ");
		MainScreen.text("her eyes roll to the back of her head.  With a muffled roar she finally caves, a veritable wave of dragon juices crashing into your lower body and pooling on your bedroll, filling the whole tent with the delicious smell of sex and pheromones.");

		//(If Ember has a dick)
		if (emberHasCock()) MainScreen.text("  Ember's cock wets the side of the tent with continuous jets of cum, only adding to the already overpowering smell of sex as she empties herself on top of you.");

		MainScreen.text("\n\nEmber breaks the kiss and pants, looking at you with a mixture of love, satisfaction and desire. You look back at her with need, drenched in sexual fluids, the air heavy with musk.  It's not enough yet, and you still haven't cum.  You need to cum!");

		MainScreen.text("\n\nUnthinkingly, instinctively, you give Ember a bite on the side of her neck - not deep enough to draw blood (especially given her armor-like scales) - but a sign of dominance, even as you continue to buck and thrust into her, yearning for the release, the act of fertilization.");

		MainScreen.text("\n\nEmber's tongue lolls out as she exposes her neck to you, an act of submission you wouldn't normally see.  Still, it doesn't last long.  Seeing Ember's face completely overtaken by bliss, you can't resist kissing her again, sucking her tongue back into your mouth to taste her once more.  Once more, you feel her walls contract; ");
		if (emberHasCock()) MainScreen.text("her spent cock throb; ");
		MainScreen.text("her eyes shut tight in pleasure as she reaches her second orgasm.  You muffle her groan of pleasure with one of your own.  A second wave of dragon fluids joins the first in wetting your lower body, along with your bedroll.");
		if (emberHasCock()) MainScreen.text("  Little gobs of cum spill from her cock to slide down her shaft and gather on your belly button.");
		MainScreen.text("  Her tail coils around you, helping her stay in position as she melts on top of you like putty.");

		MainScreen.text("\n\n\"<i>I-I can't keep going like this,</i>\" Ember whispers, slumping atop you, all strength drained from her limbs.");

		MainScreen.text("\n\nBut you're so close... just a little more...  You promise her it will be over soon, even as you continue to thrust, desperate to grab the release that's hovering just barely out of your reach.");

		MainScreen.text("\n\n\"<i>Okay, I'll try,</i>\" Ember replies tiredly, but all she manages to do is bounce atop you a few more times before slumping and nearly falling off.  You are too driven to let this stop you; you roll her onto the bedroll and take your place atop her, continuing to thrust with mindless instinct.");

		MainScreen.text("\n\nEmber doesn't even protest, she just moans and wraps as much of herself around you as she can, holding onto you like her life depended on it.");

		MainScreen.text("\n\nThen, finally, you feel yourself drive over the edge and release all your pent up cum; ");
		if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("your neglected cunt splashing fluid down your [legs] and ");
		MainScreen.text("your " + CockDescriptor.describeCock(player, x) + " gushing into the dragon's ready womb.");

		MainScreen.text("\n\nEmber growls and purrs as she feels your hot seed drive itself into her womb, looking for her fertile eggs to impregnate.  Her pussy lips clamp down on your shaft, holding it in place with a watertight seal to prevent any of your seed from spilling as her walls work to milk you.");

		//(Low Cum Amount)
		if (player.cumQ() < 250) MainScreen.text("  Though you usually don't cum that much, Ember's contracting walls literally suck the cum out of you; forcing you to give up more than you usually would... something you're quite glad to do!");
		//(Medium Cum Amount)
		else if (player.cumQ() < 1000) MainScreen.text("  Your generous helping of cum works its way towards her awaiting womb.  In fact, due to the delicious massage your shaft is receiving from Ember's contracting, almost sucking vaginal walls, you find yourself pumping out even more cum that you would usually have, quickly filling her to the brim and beyond.  It's not until Ember's belly is slightly distended that you stop.");
		//(High Cum Amount)
		else MainScreen.text("  You dump a huge load of jism into Ember's awaiting belly, but her contracting walls seem to milk you for ever more!  Ember is filled to the brim, her belly already slightly distended, but you still continue to fill her with your seed.  Ember's tightly sealed pussy lips means the cum has nowhere to go, so instead it gathers in her womb, distending her belly until she looks at least a few months pregnant; and by the look of pleasure on Ember's panting face, you don't think she minds it.");

		MainScreen.text("\n\nWith a gasp and a sigh of utter relief, you slump into Ember's arms, collapsing onto her ");
		if (emberHasCock()) MainScreen.text("cum-slick ");
		MainScreen.text("belly and laying there to regain your strength, ");
		if (emberHasCock()) MainScreen.text("dismissive of the spent cock lying sandwiched between you as you start ");
		MainScreen.text("feeling the heat in her gut that marks the beginning of a child.");

		MainScreen.text("\n\nEmber purrs and pulls you into another kiss, holding you close with her tail, legs and arms; intent on keeping you right where you are.  Well, it's not like you could go anywhere else with her pussy effectively keeping your " + CockDescriptor.describeCock(player, x) + " hostage inside its depths.");

		MainScreen.text("\n\nBreaking the kiss, she whispers into your ears, \"<i>Don't just assume this makes us official mates.</i>\"  Then with a quick peck on your cheek she adds, \"<i>But I do love you.</i>\"  Then she slumps down on your bedroll for a quick nap.");

		MainScreen.text("\n\nFiguring you'll still have some time before Ember's constricting nether lips feel like letting you go, you snuggle close to her for a quick nap of your own...");

		//knock dat phat bitch up.
		pregnancy.knockUp(PregnancyType.PLAYER, PregnancyType.INCUBATION_EMBER);
		player.statusAffects.add(new StatusAffect("EmberFuckCooldown", 36, 0, 0, 0)));
		player.statusAffects.remove("Rut");
		player.orgasm();
		player.stats.sens += -2;
		doNext(createCallBackFunction(emberBreedingAfterMathWatchOutForRadioactiveFallout, true));
	}

	//Bred/Breeding Aftermath
	private emberBreedingAfterMathWatchOutForRadioactiveFallout(emberPregged: boolean = true): void {
		MainScreen.clearText();
		let x: number = player.cockThatFits(emberVaginalCapacity());
		if (x < 0) x = player.smallestCockIndex();
		MainScreen.text("You wake up, feeling replenished after your exhausting mating session with your draconic lover, and stretch the last few kinks out.  As you do, you realize you're in still in your tent, which is perfectly clean, with no trace of the copious sexual fluids that you and Ember were splattering everywhere before you took your impromptu nap.");

		MainScreen.text("\n\nLooking around for the dragon, you spot " + emberMF("him", "her") + " seated in a cross-legged position halfway in and out of the tent's door.  Was " + emberMF("he", "she") + " guarding you while you slept?");

		MainScreen.text("\n\nEmber takes a happy glance in your direction, when " + emberMF("he", "she") + " notices you're awake.  \"<i>So you finally woke up, huh?  Good, I was getting tired of sitting here...</i>\"");

		MainScreen.text("\n\nYou thank " + emberMF("him", "her") + " for cleaning the place up, and tell " + emberMF("him", "her") + " that you appreciate it.  " + emberMF("He", "She") + "'s actually quite good at doing that kind of thing.");

		MainScreen.text("\n\nEmber's cheeks ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text(" are probably blushing under " + emberMF("his", "her") + " scales.");
		else MainScreen.text("blush.");
		MainScreen.text("  \"<i>You're welcome, but this is the only time I'll clean up after you!  I'm not your personal maid!</i>\"");

		MainScreen.text("\n\nYou wonder if you should point out that it's only fair Ember cleaned it, seeing as how " + emberMF("he", "she") + " made the bulk of the mess, but decide to simply thank " + emberMF("him", "her") + " for " + emberMF("his", "her") + " generosity.  Absently, your hand goes to ");
		if (!emberPregged) MainScreen.text("touch your belly");
		else MainScreen.text("point at Ember's belly");
		MainScreen.text(", and you ask the dragon if " + emberMF("he", "she") + " thinks it \"<i>took</i>\".");

		MainScreen.text("\n\nEmber puffs " + emberMF("his", "her") + " chest and proudly boasts, \"<i>Of course it did!  We're both very virile!  And after all the cum you ");
		if (emberPregged) MainScreen.text("pumped into me...");
		else MainScreen.text("had me pump into you...");
		MainScreen.text("</i>\" Ember trails off, and you can see " + emberMF("his", "her") + " hand move to " + emberMF("his", "her") + " crotch to caress " + emberMF("his", "her") + " ");
		if (emberPregged) MainScreen.text("slit");
		else MainScreen.text("cock");
		MainScreen.text(", as if remembering the intense sex session you two just had.");

		MainScreen.text("\n\nYou can't resist pointing out that " + emberMF("he", "she") + " wore out first; you were the one who had to make " + emberMF("him", "her") + " keep on going...  So doesn't that make you more virile than " + emberMF("him", "her") + "?");
		MainScreen.text("\n\nEmber's ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 1) MainScreen.text("blush");
		else MainScreen.text("discomfort");
		MainScreen.text(" deepens, and " + emberMF("he", "she") + " frowns at you.  \"<i>A-are you questioning my virility!?  Well, if you want, I can go again, right now!</i>\"");

		MainScreen.text("\n\nYou stifle a laugh and tell " + emberMF("him", "her") + " that's not necessary.  Still, you do want to know if " + emberMF("he", "she") + " thinks the two of you are going to have a baby now.");

		MainScreen.text("\n\nEmber blows an indignant puff of smoke.  \"<i>Yes, like I said.  I'm pretty sure it took...  I mean...  We were tied, and when dragons are tied, we are sure to get pregnant.</i>\"");

		MainScreen.text("\n\nYou nod in understanding, and then innocently comment that if it didn't take, well, maybe you'll need to try that again.");

		MainScreen.text("\n\nEmber ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 1) MainScreen.text("blushes");
		else MainScreen.text("frowns");
		MainScreen.text(" once more.  \"<i>D-don't get ahead of yourself!</i>\" " + emberMF("he", "she") + " yells indignantly, then gets up and rushes away.  You watch and give a smile; " + emberMF("he", "she") + " is champing at the bit to make children with you, but can't bring " + emberMF("himself", "herself") + " to confess how " + emberMF("he", "she") + " really feels.  Still, you're quite certain your efforts took.");
		//(if PC now pregnant:
		if (!emberPregged) MainScreen.text("  You touch your belly with a smirk.  Very certain they took indeed...");
		doNext(playerMenu);
	}

	private emberPregUpdate(): boolean {
		//trace("EMBER PREG: " + Flags.list[FlagEnum.EMBER_INCUBATION] + "EMBER AFF: " + emberAffection());
		switch (pregnancy.eventTriggered()) {
			case 1: //
				MainScreen.text("\nEmber's belly seems to be swelling; it looks like your seed took after all.  The dragon makes no obvious sign that she's noticed the weight she's putting on, and you don't think it would be wise to draw attention to it, even if it is \"<i>only</i>\" a pregnancy bulge.\n");
				return true;
			case 2: if (Flags.list[FlagEnum.EMBER_OVIPOSITION] > 0) {
				MainScreen.text("\nEmber's belly grows ever bigger, making her pregnancy noticeable.  She looks very sexy knocked up like that...  You shake your stray thoughts away.\n");
			}
			else {
				MainScreen.text("\nEmber's belly grows ever bigger, making her pregnancy noticeable.  Her swollen midriff suits her well; to be honest she looks pretty sexy like that.\n");
			}
				dynStats("lus", (5 + player.stats.lib / 20));
				return true;
			case 4: MainScreen.text("\nEmber's belly has grown quite a bit.  Anyone can tell she's pregnant with a single glance.  ");
				if (Flags.list[FlagEnum.EMBER_OVIPOSITION] > 0) {
					MainScreen.text("Ember notices you looking.  \"<i>W-what? Never seen a pregnant woman before?</i>\" she asks indignantly, although she can't hide her smile as you continue to look.\n");
				}
				else {
					MainScreen.text("Ember catches you looking" + (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 1 ? " and blushes" : "") + ".  \"<i>W-what is it?</i>\"  You reply merely that she carries a baby bump very well; she looks good pregnant.  \"<i>Oh, uh...  Thanks I guess?</i>\" she replies, looking away and flicking her tongue out nervously.\n");
				}
				return true;
			case 5: if (Flags.list[FlagEnum.EMBER_OVIPOSITION] > 0) {
				MainScreen.text("\nYou hear Ember groan, then sit down.  You rush to her side, asking if she's all right.  \"<i>Yes, I'm fine. Just a bit tired.</i>\"  She reassures you; then takes your hand and presses it against her belly.  You feel something hard and slightly round inside.  \"<i>Can you feel it?  This egg is already much larger than the others.  Proof that your seed took.</i>\" she says, smiling.  You smile back, then excuse yourself.\n");
			}
			else {
				MainScreen.text("\nEmber is sitting down with a smile, rubbing her belly; you approach and ask if she's feeling well.\n\n\"<i>Yes, both of us are.  I can already feel our baby starting to move.  Do you want to feel it too?</i>\"  You respond that you do, and gently approach her, reaching out to stroke her gravid stomach, feeling the " + (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 ? "scales" : "skin") + " already stretched taut over her burgeoning womb.\n\nYou feel what seems to be a small kick under your hand.  A faint hint of paternal pride fills you, and you can't resist rubbing the spot where the baby kicked.  Ember sighs and lets you rub her belly to your heart's content.  Unfortunately duty calls, so you bid Ember farewell and return to your duties.\n");
			}
				return true;
			case 6: if (Flags.list[FlagEnum.EMBER_OVIPOSITION] > 0) {
				MainScreen.text("\nEmber just doesn't seem to stop growing.  You approach her and lay a hand on her belly, feeling the ever growing egg inside.  \"<i>This is going to be a pain to pass,</i>\" she says, dreading the task ahead.  \"<i>This is your fault... so I expect you to be here to help me.</i>\" Ember says.  \"<i>Now I need something to eat, I'm hungry.</i>\" Ember says, walking away to feed herself.\n");
			}
			else {
				MainScreen.text("\nEmber's been getting as moody as her belly is big lately.  She constantly growls at anyone and anything that may approach her, even harmless bugs.  You decide to watch your step around her - pregnant women were scary enough back in Ingnam, and they didn't have razor-sharp teeth or the ability to breathe fire.\n\n\"<i>Something wrong!?</i>\" Ember questions you, glaring at you.  Your point proven, you tell her it's nothing, you were merely thinking of your former home.\n\n\"<i>Well if you have enough time to be reminiscing your past, how about you get over here and give me a hand instead!?  You're responsible for this, after all.</i>\"\n\nYou hasten to help her with whatever minor tasks she thinks she needs you for, until she promptly dismisses you.\n");
			}
				return true;
			case 7: if (Flags.list[FlagEnum.EMBER_OVIPOSITION] > 0) {
				MainScreen.text("\nEmber looks very tired; you're surprised she's been so active thus far with such a heavy belly.  You approach her, asking her if she needs anything.  \"<i>Yes... Umm, could you...</i>\" she replies, blushing.  \"<i>Could you rub my belly?  It would help me relax,</i>\" Ember asks.\n\nYou smile and begin rubbing her belly; while doing so you can feel the egg's hard shell stretching Ember.  Ember gives a sigh of relief and begins purring. \"<i>Ah, this feels great,</i>\" she says, happily.  You continue rubbing her belly, until she closes her eyes and begins snoring lightly.  Upon realizing Ember fell asleep you stop and walk away.  Ember must've been really tired...\n");
			}
			else {
				MainScreen.text("\nEmber's been much less active nowadays, and a single look at her heavily pregnant belly lets you know why.  She is huge!  You're surprised she can even move about with a belly as big as that.  Upon closer inspection you're pretty sure you can see it squirm as the little dragonling explores its limited territory.\n\n\"<i>Hey, [name]. Fetch me some water will you?</i>\"\n\nYou decide to be generous and fetch it for her - you wouldn't be surprised if she's too heavy to get to the stream by herself.  You promptly return with a full skin and present it to her so that she can slake her thirst.\n\nEmber swipes the skin off your hands and chugs it down unceremoniously, sighing in relief once she's done.  \"<i>Ahhh, that hit the spot, thanks.</i>\"  You check to see if there's anything else she needs, but when she confirms she's fine, you nod your head, sneak a quick caress of her swollen stomach, then leave her alone.\n");
			}
				return true;
			case 8: if (Flags.list[FlagEnum.EMBER_OVIPOSITION] > 0) {
				MainScreen.text("\n\nHer breasts look bloated, and you think you can see a drop of milk leaking from one of her perky nubs.  \"<i>Help me drain these,</i>\" she says, lifting her milky jugs and letting them fall.\n\nYou ask her if she'll have enough for the baby.  \"<i>Of course I will, it won't need any milk.  At least not until it hatches.  It'll take some time until then, and my breasts feel so uncomfortable.  So don't question me, just drink it!</i>\" she demands" + (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0 ? ", a blush forming on her cheeks at her request" : "") + ".\n\nYou nod and lay down beside her, gently taking one of her nubs inside your mouth; then you begin suckling.  \"<i>Ooooh, yes...  Keep going...  This feels so good,</i>\" she moans in equal parts pleasure and relief.\n\nYou're happy to oblige, and begin drinking without stopping.  Ember's nutritious milk fills you.  ");
				if (Flags.list[FlagEnum.EMBER_MILK] > 0) {
					MainScreen.text("Her breasts have always been full, but this time there's an incredible amount coming out.  She must've been really uncomfortable, and each suckle earns you a jet of milk and a moan of relief from Ember.  You keep at it for a long time; until you've drained one of Ember's ripe tits.\n\nThen you move to the other, intent on doing the same, however you feel very full already; you don't think you'll manage to empty this one.  Ember's moans of pleasure and relief push you on. You keep drinking regardless, and before you realize it, her other breast has been drained.\n\n\"<i>Ahhh, that feels much better.  I guess you're not too bad at making this feel good.</i>\" she admits" + (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0 ? ", blushing softly" : "") + ". You stifle a burp and smile, then return to your duties.\n");
				}
				else {
					MainScreen.text("Soon, you've exhausted one of ther breasts, then you move to the other intent on doing the same; however all too soon she's drained and you're left wanting more.\n\n\"<i>Ahhh, that feels much better.  Good job,</i>\" she comments.  You smile back, then return to your duties.\n");
				}
			}
			else {
				MainScreen.text("\nYou decide to check up on Ember and see how she's been doing.  Once you're close enough she looks at you with tired eyes; clearly she hasn't been getting much sleep lately.  \"<i>[name], perfect timing!  I need you to help me drain my breasts, they're so heavy they hurt.</i>\"\n\nYou look at her breasts; they're so swollen they're at least a cup-size bigger than usual, maybe as much as two.  You can readily believe that she's in pain from carrying so much, and agree to help her out, then ask if she has any particular preferences.\n\n\"<i>Just take care of it... NOW!</i>\" Ember growls.\n\nWith a long-suffering sigh, you seat yourself down beside her, gently lift up one of her milk-bloated breasts, close your lips softly around the nipple, and start to suckle.  At once your efforts are rewarded with a long, strong gush of sweet, cool dragon-milk.  Ember sighs in relief and reaches out to hold your head against her breast.\n\nYou suckle gently, wondering how well Ember will take to nursing a real baby, but simply enjoying being so close to her.  You drink and drink, alternating between breasts, until finally you've vented the worst of the pressure, at the cost of visibly distending your own stomach with the amount of milk you've drunk.  You settle back on your [ass] and stifle a belch, looking at Ember and wondering what she thinks of your efforts to help.\n\nEmber yawns.  \"<i>Good... I feel much better, now I think I need a nap.</i>\"\n\nYou sigh softly, watch as she falls over on her side, belly visibly jiggling as she disturbs the unborn dragon in her womb, and is soon fast asleep.  You clamber back upright and leave her to get some rest; you've a feeling it won't be too long before she gives birth.\n");
			}
				fatigue(-25);
				return true;
			default:
		}
		return false; //If there's no update then return false so needNext is not set to true
	}


	public emberGivesBirth(): void {
		//Ember Gives Live Birth
		if (Flags.list[FlagEnum.EMBER_OVIPOSITION] == 0) {
			MainScreen.text("\nA roar interrupts your daily routine and you quickly run to check its source.  You see Ember doubling over and sitting inside her den, her face twisted in pain. She suddenly looks up at you.");
			MainScreen.text("\n\n\"<i>Great, you're here.  It's time!  The baby is coming.</i>\"");
			MainScreen.text("\n\nInstinctively, you try to grab her hand, reassuring her that you're here for her and you will do your best to help her.  Ember screams as another contraction hits her and she grips your hand so powerfully you feel like she's about to crush it.  You grimace in pain, but do your best to squeeze back just as hard - if only to keep her from breaking your hand.");
			MainScreen.text("\n\n\"<i>D-don't just hold my hand... do something, anything!  This hurts!</i>\" Ember yells at you in obvious pain.");
			MainScreen.text("\n\nWrenching your hand free of Ember's grasp, you take up a position squatting before her.  You can practically see her steely abdominal muscles rippling under her ");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text("scales");
			else MainScreen.text("skin");
			MainScreen.text(" as her womb works to expel its long-time occupant.  You place a hand on either side of the distended orb and begin to massage it, trying to help soothe the strained, aching muscles.  Your eyes go from her stomach to her crotch; her vagina is opened wide as the infant inside her begins making its way into the world.");
			if (emberHasCock()) {
				if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0 && Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 0) MainScreen.text("  Her human-like cock dangles heavily in front of her pussy, partially erect from the muscular spasms.");
				else MainScreen.text("  Her draconic cock has been pushed from its internal sheathe by the pressure, but it's too painful for her to be erect.");
			}

			MainScreen.text("\n\nMind racing, you bend your head in close and stick out your tongue, sliding it back in and out of your mouth to get it nice and wet before delivering a long, sloppy lick to her inner walls.  You can taste her, and the strange salty-blood taste of amniotic fluid mingles with her natural lubricants.  It's an unusual taste but not unbearable, and you begin to lick with greater fervor and purpose.  Your intention is to try and drown the pain of her contractions with pleasurable stimulus.  It's a crazy idea, but it makes sense in a place like Mareth.");
			MainScreen.text("\n\n\"<i>Ah!  Y-yes, don't stop.  Keep doing whatever you're doing.</i>\"  It would seem your theory was correct.  Ember's legs wrap around you, locking you in position; her tail moves to caress you, slowly coiling around your waist; her hands rub her belly, attempting to coax her unborn child out of her.");

			MainScreen.text("\n\n\"<i>I can feel it... moving... [name]... get a towel ready, it's coming!</i>\"  Ember roars in pain as the bulge inside her belly makes its way down.  You try to quickly scramble up from your position and run to grab a towel, but Ember has you in a death-grip and won't let you go, forcing you to point out you can't get a towel while you're as tangled as you are.");

			MainScreen.text("\n\n\"<i>It hurts! Do something [name]!</i>\" Ember yells, oblivious to your current state.");

			MainScreen.text("\n\nYou struggle and wrestle, but put the thought out of your mind; you can see the ");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0) MainScreen.text("head crowning");
			else MainScreen.text("tip of the muzzle jutting out");
			MainScreen.text(", and you know you won't have time.  Instead, you gently reach into Ember's pussy, giving her a hand stretching and positioning yourself to catch your baby.  With a rock-rattling roar, Ember's final push sends her offspring out of her overstretched snatch and into your hands; a veritable fountain of juices follows suit, painting your hands, arm and face in leftover amniotic fluid.");

			MainScreen.text("\n\nHer strength depleted, Ember collapses into a panting heap and you're finally free to move.  You wrap your arms around your wriggling offspring, listening to it wail in protest, just like a human infant.  You look down at the fruit of your union and smile; it looks just like its mother, a");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text("n anthro dragon");
			else MainScreen.text(" hybrid of human and dragon");
			MainScreen.text(".  It's a beautiful strong, healthy little ");
			let roll: number = rand(100);
			if (roll < 40) MainScreen.text("boy");
			else if (roll < 80) MainScreen.text("girl");
			else MainScreen.text("herm");
			MainScreen.text(".");

			MainScreen.text("\n\nYou cradle ");
			if (roll < 40) MainScreen.text("him");
			else MainScreen.text("her");
			MainScreen.text(" in your arms, uncaring of the stains as the fluid drenching its little body soaks into your [armor], gently soothing ");
			if (roll < 40) MainScreen.text("him");
			else MainScreen.text("her");
			MainScreen.text(".  Then, seeing Ember is recovering from her recent exertions, you grin proudly at her and gently hold your ");
			if (roll < 40) MainScreen.text("son");
			else MainScreen.text("daughter");
			MainScreen.text(" out for her to take.");

			MainScreen.text("\n\nEmber gazes at the newborn with a look of profound happiness.  \"<i>It's so beautiful...  Let me hold it, [name]...  Let me hold both of you...</i>\"");

			MainScreen.text("\n\nNot one to miss the opportunity, you pass the newborn into ");
			if (roll < 40) MainScreen.text("his");
			else MainScreen.text("her");
			MainScreen.text(" mother's loving arms and kneel beside her, embracing her in her moment of emotional openness.  Ember brings the baby to her chest, letting it take one of her nipples into its small toothless mouth and begin suckling Ember's nutritious milk.  While the baby is busy with her breast, Ember decides to busy herself with you, and pulls you into a loving kiss.");

			MainScreen.text("\n\nYou stroke her cheek back, sinking eagerly into her kiss, opening your mouth and allowing her tongue to probe teasingly into yours, brushing against your own tongue and then twining gently about it, like an amorous serpent.  Ember breaks the kiss with a sigh, tiredness overtaking " + emberMF("him", "her") + ".  She leans in to give you one final peck in cheek and lays down in the soft leaves that litter her den.  \"<i>Sorry... I need to sleep now...</i>\"");

			MainScreen.text("\n\nYou calmly help her down, aiding her in tucking the newborn infant safely beside her.  It continues to suckle, then sleepily detaches itself, yawns, and curls up, ready to join its mother in sleep.");
			if (emberChildren() > 1) MainScreen.text("  Your other draconic offspring quietly peek into the lair, having vacated the place when Ember went into labor.  They smile at the sight of their new sibling, gently slipping in to curl up beside the mother and new child.");
			MainScreen.text("  With a contented expression on your face, you leave Ember and your ");
			if (emberChildren() <= 1) MainScreen.text("new child");
			else MainScreen.text("newly expanded draconic brood");
			MainScreen.text(" to get some rest, leaving the den.\n");
			if (roll < 40) Flags.list[FlagEnum.EMBER_CHILDREN_MALES]++;
			else if (roll < 80) Flags.list[FlagEnum.EMBER_CHILDREN_FEMALES]++;
			else Flags.list[FlagEnum.EMBER_CHILDREN_HERMS]++;
		}
		//Ember Lays Egg
		else {
			//Ignore all the effects of Dragon Milk.
			MainScreen.text("\nA roar interrupts your daily routine and you quickly run to check its source.  You see Ember doubling over and sitting inside her den, her face twisted in pain. She suddenly looks up at you.");

			MainScreen.text("\n\n\"<i>Great, you're here.  It's time!  I'm going to lay the egg.</i>\"");

			MainScreen.text("\n\nInstinctively, you try to grab her hand, reassuring her that you're here for her and you will do your best to help her.  Ember screams as another contraction hits her and she grips your hand so powerfully you feel like she's about to crush it.  You grimace in pain, but do your best to squeeze back just as hard - if only to keep her from breaking your hand.");

			MainScreen.text("\n\n\"<i>D-don't just hold my hand... do something, anything!  This hurts!</i>\" Ember yells at you in obvious pain.");

			MainScreen.text("\n\nWrenching your hand free of Ember's grasp, you take up a position squatting before her.  You can practically see her steely abdominal muscles rippling under her ");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text("scales");
			else MainScreen.text("skin");
			MainScreen.text(" as her womb works to expel its long-time occupant.  You place a hand on either side of the distended orb and begin to massage it, trying to help soothe the strained, aching muscles.  Your eyes go from her stomach to her crotch; her vagina is opened wide as the globular egg inside her begins dropping its way into the world.");
			if (emberHasCock()) {
				if (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0 && Flags.list[FlagEnum.EMBER_INTERNAL_DICK] == 0) MainScreen.text("  Her human cock dangles heavily in front of her pussy, partially erect from the muscular spasms.");
				else MainScreen.text("  Her draconic cock has been pushed from its internal sheathe by the pressure, but it's too painful for her to be erect.");
			}
			MainScreen.text("\n\nMind racing, you bend your head in close and stick out your tongue, sliding it back in and out of your mouth to get it nice and wet before delivering a long, sloppy lick to her inner walls.  You can taste her, and the strange salty-blood taste of amniotic fluid mingles with her natural lubricants.  It's an unusual taste but not unbearable, and you begin to lick with greater fervor and purpose.  Your intention is to try and drown the pain of her contractions with pleasurable stimulus.  It's a crazy idea, but it makes sense in a place like Mareth.");

			MainScreen.text("\n\n\"<i>Ah!  Y-yes, don't stop.  Keep doing whatever you're doing.</i>\"  It would seem your theory was correct.  Ember's legs wrap around you, locking you in position; her tail moves to caress you, slowly coiling around your waist; her hands rub her belly, attempting to coax the burdensome egg out of her.");

			MainScreen.text("\n\n\"<i>I can feel it... moving... [name]... get a towel ready, it's coming!</i>\" Ember roars in pain as the bulge inside her belly makes its way down.  You try to quickly scramble up from your position, and run to grab a towel, but Ember has you in a death-grip and won't let you go, forcing you to point out you can't get a towel while you're as tangled as you are.");

			MainScreen.text("\n\n\"<i>It hurts! Do something [name]!</i>\" Ember yells, oblivious to your current state.");

			MainScreen.text("\n\nYou struggle and wrestle, but put the thought out of your mind; you can see the rounded shell of the egg poking out of Ember's netherlips, and you know you won't have time.  Instead, you gently reach into Ember's pussy, giving her a hand stretching and positioning yourself to catch your baby.  With a rock-rattling roar, Ember's final push sends the egg out of her overstretched snatch and into your hands; a veritable fountain of juices follows suit, painting your hands, arm and face in leftover amniotic fluid.");

			MainScreen.text("\n\nYou can't pay any attention to the deluge of fluids that has just splattered all over you, though; you're trying to cradle the egg without dropping it.  It's huge, far bigger than any other egg you've ever seen, and easily comparable in weight to a good-sized toddler.  No wonder Ember was sluggish with this rattling in her belly.  Finally, though, you feel you have comfortably taken hold of it and you stand up, cradling the hard-shelled egg from which, eventually, your offspring will hatch.");

			MainScreen.text("\n\nEmber pants, tired from her recent ordeal; and when she's had a moment to recover she gazes at you.  Her eyes open wide in admiration of the egg she just laid.  \"<i>It's beautiful,</i>\" Ember says lovingly.  You nod your agreement and place it gently in a nook at a sheltered side of the den");
			if (Flags.list[FlagEnum.EMBER_EGGS] > 0) {
				MainScreen.text(", along with the ");
				if (Flags.list[FlagEnum.EMBER_EGGS] == 1) MainScreen.text("other");
				else MainScreen.text(num2Text(Flags.list[FlagEnum.EMBER_EGGS]) + " others");
			}
			MainScreen.text(", before telling her that she's beautiful too, and your daughters will certainly hatch and grow up to be just as gorgeous as she.");

			MainScreen.text("\n\nEmber just smiles at you and hooks her tail around your waist, pulling you towards her.  \"<i>Come here.</i>\"  You don't resist and allow her to pull you into her embrace, snuggling up against her.  Ember strokes your head, gently rubbing the back of your neck as she pulls you closer against her.  \"<i>You know, there's something else you have to do for me.</i>\"");
			MainScreen.text("\n\nYou ask her what that is.  Ember takes one of her swollen breasts in her hand, gently squeezing a droplet of milk from her perky nipples.  \"<i>These need to be drained,</i>\" she says, looking at you expectantly.");

			MainScreen.text("\n\nYou give her a knowing look and a smile, then nuzzle up to her and start to suckle.  \"<i>Hmm... there's no need to rush, they aren't going anywhere,</i>\" Ember says, sighing in pleasure and relief.  Her arms encircle you, holding you close, and her tail loops around your midriff, gently guiding your body to lay atop hers.");

			MainScreen.text("\n\nYou allow her to do as she wishes, being sure not to press on her midriff too much; after all, she did just give birth.  You nuzzle affectionately against your dragon lover, glad to take advantage of her willingness to be open with you.  Usually Ember would say something in denial and sprint away.  It's quite a relief actually, spending time like this, especially in a world like Mareth.");

			MainScreen.text("\n\nYou continue drinking, draining Ember's bloated breasts, the cool nutritious milk helps you relax for a spell and forget about your troubles.  Your ordeals are forgotten for the moments you find yourself drifting off, guided into the land of dreams by Ember's soft purring - or is it snoring?  You can't tell, and it doesn't matter right now...");
			MainScreen.text("\n\nYou wake up a short while later.  Ember's breasts are completely drained of their milk, and your belly is bulging a bit from the amount you've drank.  Ember sleeps softly under you.  Gently you extract yourself from Ember's embrace - a difficult task, considering Ember's tail is intent on holding you like a boa constrictor.  Eventually though, you manage to withdraw yourself from its insistent grip and slowly sneak out of the den.\n");
			Flags.list[FlagEnum.EMBER_EGGS]++;
		}
		player.statusAffects.add(new StatusAffect("EmberNapping", 12, 0, 0, 0)));
	}


	public giveBirthToEmberKids(): void {
		let roll: number = rand(100);
		MainScreen.text("\n");
		//PC Gives Live Birth
		if (Flags.list[FlagEnum.EMBER_OVIPOSITION] == 0) {
			//40% chance of boy, 40% chance of girl and 20% chance of both
			//(If the PC has no pussy)
			if (!player.lowerBody.vaginaSpot.hasVagina()) {
				MainScreen.text("A terribly painful ripping feeling comes from your crotch. Reaching down to touch the tender spot you feel a spike of pleasure and moistness.  <b>You've grown a vagina!</b>\n\n");
				player.createVagina();
			}
			MainScreen.text("You find yourself doubling over - well, as far as you can given your hugely gravid stomach, letting out a hollow cry of pain.  You can feel the muscles in your midriff starting to squeeze and ripple in a fashion you just know signifies the onset of labor.  You cry out for Ember to come and attend you.  Ember rushes towards you in a blur, stopping mere inches from you, panting.  \"<i>What is it?  Is it time!?  Are you in labor!?</i>\" " + emberMF("he", "she") + " asks in a hurry.  You nod and tell " + emberMF("him", "her") + " that you are.");

			MainScreen.text("\n\nEmber wastes no time, " + emberMF("he", "she") + " hefts you into " + emberMF("his", "her") + " arms and takes you to " + emberMF("his", "her") + " den, gently setting you down on the soft leaves; then " + emberMF("he", "she") + " starts undressing you, stripping your [armor] as quickly as " + emberMF("he", "she") + " can.  \"<i>Okay, Okay...  What do you need?  W-what should I do!?  Do you need anything!?  How are you feeling!?</i>\" Ember asks in panic, the excitement of what's about to happen too much to bear for the dragon" + emberMF("-boy", "-girl") + ".");
			MainScreen.text("\n\nYou grit out between your teeth that you are feeling very sore, and what you want is for " + emberMF("him", "her") + " to help you somewhere comfortable so you can get this slithering snake of a baby out of your guts - preferably before he or she kicks his-her way out straight through your belly rather than coming down the birth canal!");
			MainScreen.text("\n\n\"<i>Okay!  Right!</i>\" Ember hurries off to fetch a bunch of clean cloths, then spreads them all over the leafy grass of " + emberMF("his", "her") + " den.  " + emberMF("He", "She") + " carefully helps you onto them and spreads your legs, kneeling between them.  \"<i>I'm going to try something... tell me how you're feeling.</i>\"");

			MainScreen.text("\n\nEmber lowers " + emberMF("his", "her") + " head towards your quivering vagina, ");
			if (player.lowerBody.balls > 0) MainScreen.text("slowly pushing your [balls]");
			else if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("slowly pushing your " + CockDescriptor.describeMultiCockShort(player));
			if (player.lowerBody.balls > 0 || player.lowerBody.cockSpot.hasCock()) MainScreen.text(" out of " + emberMF("his", "her") + " way, ");
			MainScreen.text("then " + emberMF("he", "she") + " blows softly on your contracting love-hole, slowly extending " + emberMF("his", "her") + " tongue to penetrate you.");

			MainScreen.text("\n\nYou moan in equal parts pleasure and pain, telling " + emberMF("him", "her") + " that " + emberMF("his", "her") + " treatment feels good and is soothing.  \"<i>Please, keep going,</i>\" you plead.  You ask if " + emberMF("he", "she") + " can try to massage your stomach as well, to help relax the tension in your muscles.");

			MainScreen.text("\n\nEmber complies, digging deeper into your searing hot canal.  One of " + emberMF("his", "her") + " clawed hands gently reaches out to touch the slithering bulge within your belly, massaging you as best as " + emberMF("he", "she") + " can.  Slowly but steadily, the baby dragon within you starts making its way down your birth canal, stretching you out as it seeks freedom.");
			player.cuntChange(80, true, true, false);

			MainScreen.text("\n\nYou strain with all your might, drawing on wells of inner strength you weren't even sure you had, hovering ");
			if (player.perks.has("Masochist")) MainScreen.text("deliciously ");
			MainScreen.text("on the boundary between pleasure and pain.  You aren't sure how much more you can take.");

			MainScreen.text("\n\nEmber suddenly withdraws " + emberMF("his", "her") + " tongue and screams in joy, \"<i>I can see it! Push [name]!  You're almost done!</i>\"");

			MainScreen.text("\n\nWith one last hollow groan, you push as hard as you can, desperate to have your child in your arms and, more importantly, out of your womb.  There is a sudden sensation as though you are being turned inside out, and then a wonderfully, blissfully numb sensation.  You slump down, drained and exhausted, hearing the cry of your newborn baby as if from far away.");

			MainScreen.text("\n\n\"<i>...you... alright?...</i>\" You faintly hear Ember asking you.  You look into " + emberMF("his", "her") + " eyes and manage to nod weakly.  Ember's worried face turns to one of relief, " + emberMF("he", "she") + " calmly tends to the wailing dragonling while waiting for you to rest for a little while, licking it over to clean it from the fluids that came with and on your baby.");

			MainScreen.text("\n\nYou close your eyes, exhausted and happy to see your child. Before you realize it, you've passed out.  When you awaken, you find yourself lying in your bedroll, Ember hovering protectively over you. You ask where the baby is.");
			MainScreen.text("\n\nEmber calmly smiles at you and points to your [chest].  You follow " + emberMF("his", "her") + " finger to see the little dragon nursing from your " + BreastDescriptor.describeNipple(0) + ". \"<i>Sorry.  ");

			if (roll < 40) MainScreen.text("He");
			else MainScreen.text("She");
			MainScreen.text(" was getting hungry and I didn't know what to do,</i>\" Ember explains.");
			if (Flags.list[FlagEnum.EMBER_MILK] > 0) {
				MainScreen.text("  \"<i>I tried to feed ");
				if (roll < 40) MainScreen.text("him");
				else MainScreen.text("her");
				MainScreen.text(" myself, but ");
				if (roll < 40) MainScreen.text("he");
				else MainScreen.text("she");
				MainScreen.text(" wanted yours...</i>\"");
			}

			MainScreen.text("\n\nYou sigh softly, stroking your newborn's head even as it industriously sucks away at your " + BreastDescriptor.describeNipple(0) + ".  Speaking of which, you ask Ember what you've had - a boy?  A girl?  Both?");

			MainScreen.text("\n\nEmber sighs and smiles at you. \"<i>It's a beautiful, healthy, little ");
			if (roll < 40) MainScreen.text("boy");
			else if (roll < 80) MainScreen.text("girl");
			else MainScreen.text("herm");
			MainScreen.text(".</i>\"");

			MainScreen.text("\n\nYou smile at " + emberMF("him", "her") + " and your beautiful new baby, who suddenly stops suckling, screws up ");
			if (roll < 40) MainScreen.text("his");
			else MainScreen.text("her");
			MainScreen.text(" face and starts to cry softly.  You gently help ");
			if (roll < 40) MainScreen.text("him");
			else MainScreen.text("her");
			MainScreen.text(" up onto your shoulder and gently pat ");
			if (roll < 40) MainScreen.text("him");
			else MainScreen.text("her");
			MainScreen.text(" on the back between ");
			if (roll < 40) MainScreen.text("his");
			else MainScreen.text("her");
			MainScreen.text(" little wings, eliciting a burp that clearly leaves ");
			if (roll < 40) MainScreen.text("him");
			else MainScreen.text("her");
			MainScreen.text(" feeling better.  ");
			if (roll < 40) MainScreen.text("He");
			else MainScreen.text("She");
			MainScreen.text(" coos, giggles and nuzzles into your neck, clearly happy to be here in the real world at last.");

			MainScreen.text("\n\n\"<i>I'll tend to the little one, you can just rest for a while longer,</i>\" Ember offers, taking the cute little dragon up in " + emberMF("his", "her") + " arms.  You sigh and nod your head gratefully, then lay back down to get some more rest.\n");
			if (roll < 40) Flags.list[FlagEnum.EMBER_CHILDREN_MALES]++;
			else if (roll < 80) Flags.list[FlagEnum.EMBER_CHILDREN_FEMALES]++;
			else Flags.list[FlagEnum.EMBER_CHILDREN_HERMS]++;
		}
		//PC Lays Egg
		else {
			//(If the PC has no pussy)
			if (!player.lowerBody.vaginaSpot.hasVagina()) {
				MainScreen.text("A terribly painful ripping feeling comes from your crotch. Reaching down to touch the tender spot you feel a spike of pleasure and moistness.  <b>You've grown a vagina!</b>\n\n");
				player.createVagina();
			}
			MainScreen.text("You find yourself doubling over - well, as far as you can given your hugely gravid stomach, letting out a hollow cry of pain.  You can feel the muscles in your midriff starting to squeeze and ripple in a fashion you just know signifies the onset of labor.  You cry out for Ember to come and attend you.  Ember rushes towards you in a blur, stopping mere inches from you, panting.  \"<i>What is it? Is it time!? Are you ready to lay!?</i>\" " + emberMF("he", "she") + " asks in a hurry.  You nod and tell " + emberMF("him", "her") + " that you are.");

			MainScreen.text("\n\nEmber wastes no time - " + emberMF("he", "she") + " hefts you into " + emberMF("his", "her") + " arms and takes you to " + emberMF("his", "her") + " den, gently setting you down on the soft leaves.  Then " + emberMF("he", "she") + " starts undressing you, stripping your [armor] as quickly as " + emberMF("he", "she") + " can.  \"<i>Okay, Okay...  What do you need?  W-what should I do!?  Do you need anything!?  How are you feeling!?</i>\" Ember asks in panic, the excitement of what's about to happen too much to bear for the dragon" + emberMF("-boy", "-girl") + ".");

			MainScreen.text("\n\nYou grit out between your teeth that you are feeling very sore, and what you want is for " + emberMF("him", "her") + " to help you somewhere comfortable so you can get this huge damn egg out of you.");

			MainScreen.text("\n\n\"<i>Okay! Right!</i>\" Ember hurries off to fetch a bunch of clean cloths; then spreads them all over the leafy grass of " + emberMF("his", "her") + " den.  Carefully, " + emberMF("he", "she") + " helps you on them and spreads your [legs], kneeling between them.  \"<i>I'm going to try something...  Tell me how you're feeling.</i>\"");

			MainScreen.text("\n\nEmber lowers " + emberMF("his", "her") + " head towards your quivering [vagina], ");
			if (player.lowerBody.balls > 0) MainScreen.text("slowly pushing your [balls]");
			else if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("slowly pushing your " + CockDescriptor.describeMultiCockShort(player));
			if (player.lowerBody.balls > 0 || player.lowerBody.cockSpot.hasCock()) MainScreen.text(" out of " + emberMF("his", "her") + " way, ");
			MainScreen.text("then " + emberMF("he", "she") + " blows softly on your contracting love-hole, slowly extending " + emberMF("his", "her") + " tongue to penetrate you.");

			MainScreen.text("\n\nYou moan in equal parts pleasure and pain, telling " + emberMF("him", "her") + " that " + emberMF("his", "her") + " treatment feels good and is soothing. \"<i>Please, keep going,</i>\" you plead.  You ask if " + emberMF("he", "she") + " can try to massage your stomach as well, to help relax the tension in your muscles.");

			MainScreen.text("\n\nEmber complies, digging deeper into your searing hot canal; one of " + emberMF("his", "her") + " clawed hands, gently reach out to the protruding bulge within your belly, massaging you as best as " + emberMF("he", "she") + " can.  Slowly but steadily, the draconic egg within you starts making its way down your birth canal, stretching you out as it seeks freedom.");

			MainScreen.text("\n\nYou strain with all your might, drawing on wells of inner strength you weren't even sure you had, hovering ");
			if (player.perks.has("Masochist")) MainScreen.text("deliciously ");
			MainScreen.text("on the boundary between pleasure and pain.  You aren't sure how much more you can take.");

			MainScreen.text("\n\nEmber suddenly withdraws " + emberMF("his", "her") + " tongue and screams in joy, \"<i>I can see it! Push [name]!  You're almost done!</i>\"");

			MainScreen.text("\n\nWith one last hollow groan, you push as hard as you can, desperate to be free of the burdensome egg.  There is a sudden sensation as though you are being turned inside out, and then a wonderfully, blissfully numb sensation.  You slump down, drained and exhausted.");
			player.cuntChange(80, true, true, false);

			MainScreen.text("\n\n\"<i>...you... all right?...</i>\" You faintly hear Ember asking you.  You look into " + emberMF("his", "her") + " eyes and manage to nod weakly.  Ember's worried face turns to one of relief, " + emberMF("he", "she") + " calmly tends to the egg while waiting for you to rest for a little while, licking it over to clean it from the fluids that came with and on the egg.");

			MainScreen.text("\n\nYou watch " + emberMF("him", "her") + " as " + emberMF("he", "she") + " tends to it, and faintly ask who'll be responsible for keeping it safe until it hatches.  \"<i>Don't worry about that, [name].  I'll care for the egg.  For now, just rest,</i>\" Ember replies, leaning down to give you a little peck on the forehead.");

			MainScreen.text("\n\nYou nod wearily, lie back and close your eyes, letting yourself drift off into slumber to escape the weariness of your worn, ravaged body.");

			MainScreen.text("\n\nYou're not certain how long you were sleeping for when you finally regain consciousness.  You wake, though, to the most wonderful sensations emanating from your " + BreastDescriptor.describeNipple(0) + ", and the feel of soft hands caressing and squeezing your [chest].  You open your eyes and find Ember leaning over you, greedily nursing " + emberMF("himself", "herself") + " from your milk.  You can't resist asking what " + emberMF("he", "she") + "'s doing.");

			MainScreen.text("\n\nEmber ");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0) MainScreen.text("blushes and ");
			MainScreen.text("withdraws, licking " + emberMF("his", "her") + " lips of a stray droplet of milk.  \"<i>Sorry, it's just that you looked so full, and all that milk would've been wasted...  So, I thought I could help myself, not that I've been wanting to drink your milk or anything like that.</i>\"");

			MainScreen.text("\n\nYou tell " + emberMF("him", "her") + " that it's only polite to ask first.  Still, you're happy to let " + emberMF("him", "her") + " drink " + emberMF("his", "her") + " fill.  It does make your breasts feel so much better.  Ember slowly makes " + emberMF("his", "her") + " way back to your awaiting nipples to resume " + emberMF("his", "her") + " drinking.");

			MainScreen.text("\n\nYou lay back and enjoy it, waiting for " + emberMF("him", "her") + " to drink " + emberMF("his", "her") + " fill.  When " + emberMF("he", "she") + " is finally done, Ember gives you a small peck on the cheek and says, \"<i>Thanks for the milk.  You should rest a while longer, and I'm sorry I woke you up.</i>\"");

			MainScreen.text("\n\nYou tell " + emberMF("him", "her") + " that it's fine.  Then, you give " + emberMF("him", "her") + " a wry grin and tell " + emberMF("him", "her") + " it's probably good practice for when the egg");
			if (Flags.list[FlagEnum.EMBER_EGGS] > 0) MainScreen.text("s hatch");
			else MainScreen.text(" hatches");
			MainScreen.text(", anyway.  The dragon ");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0) MainScreen.text("blushes and then ");
			MainScreen.text("scurries away, even as you pull yourself upright and get ready to go about your business.\n");
			Flags.list[FlagEnum.EMBER_EGGS]++;
		}
		player.statusAffects.add(new StatusAffect("EmberNapping", 5, 0, 0, 0)));
		player.updateGender();
	}

	//Requirements (Either)
	//1 Lust Draft,
	//Libido >= 50,
	//Min Lust >= 40.
	//
	//Don't meet the reqs? No LustFuck for you!
	//Not centaur compatible as is the case will all Ember material, centaurs awkward bodies require that the entirety of the content be re-written and I'm not doing that - LD.

	//Note: This scene is meant for Tainted Ember after you've been through the lost dragon city dungeon. While we do not have the dungeon and post-quest Ember, this scene may be accessed from regular Ember's pool of scenes if her affection is High.

	private highAffectionEmberLustFuck(): void {
		MainScreen.clearText();
		let x: number = player.cockThatFits(emberVaginalCapacity());
		if (x < 0) x = player.smallestCockIndex();
		MainScreen.text("You strip your [armor] and watch Ember as " + emberMF("he", "she") + " appraises your naked body.  You can see " + emberMF("his", "her"));
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) {
			MainScreen.text(" dragon cock ");
			if (emberInternalDick()) MainScreen.text("poking out of " + emberMF("his", "her") + " protective slit");
			else MainScreen.text("growing erect");
		}
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" and");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text(" her pussy beginning to drip in excitement");
		MainScreen.text(".");

		MainScreen.text("\n\n\"<i>Mmm... now that's a view and a half; just look at you... what a gorgeous " + player.mf("man", "girl") + ", with such ");
		if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("a wonderful " + CockDescriptor.describeCock(player, 0));
		else MainScreen.text(" wonderful cocks");
		MainScreen.text("... and you're all mine, here and now,</i>\" " + emberMF("he", "she") + " croons appreciatively, giving you a lewd wink and flick of " + emberMF("his", "her") + " tongue.  \"<i>Still, while I'm enjoying the view, don't keep a " + emberMF("guy", "girl") + " in suspense; what do you have planned?</i>\" " + emberMF("he", "she") + " asks, tail flicking from side to side in an amused manner.");

		MainScreen.text("\n\nYou tell " + emberMF("him", "her") + " you were thinking of giving your dragon mate a proper fucking.  Maybe the two of you could use that book " + emberMF("he", "she") + " picked up from the library.");

		MainScreen.text("\n\n" + emberMF("He", "She") + " stares at you, clearly dumbstruck.  If it was possible for a dragon to blush, " + emberMF("he'd", "she'd") + " be blushing, but the ");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("stiffness of " + emberMF("his", "her") + " cock");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" and ");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("the slickness of her pussy");
		MainScreen.text(", combined with " + emberMF("his", "her") + " general body language, makes it quite clear " + emberMF("he", "she") + " likes what you're saying.  Spinning on " + emberMF("his", "her") + " heel, " + emberMF("he", "she") + " walks away, waggling that ass of " + emberMF("his", "hers") + " as " + emberMF("he", "she") + " goes for your appreciation.  As quickly as possible without actually running, " + emberMF("he", "she") + " returns with the book in question and holds it up.  \"<i>So... what poses do you have in mind?</i>\" " + emberMF("he", "she") + " trills, anxious to hear what's on your mind.");

		//1st time:
		if (Flags.list[FlagEnum.TIMES_EMBER_LUSTY_FUCKED] == 0) {
			MainScreen.text("\n\nYou smile and take the offered book, flipping through a few pages and showing the ones that you like the most to Ember.");
			MainScreen.text("\n\n\"<i>Little more specific, please, my mate; I can see that you favor those, but you still haven't told me which one we're doing,</i>\" " + emberMF("he", "she") + " says, playfully rolling her eyes at your silliness.");
			MainScreen.text("\"<i>All of them,</i>\" you state.");

			MainScreen.text("\n\nAn incredulous stare greets you.  Eventually, Ember manages to pick " + emberMF("his", "her") + " jaw off the ground.  \"<i>A-all of them!?</i>\" " + emberMF("he", "she") + " blurts.  You simply nod.");

			MainScreen.text("\n\n\"<i>Well, I'm all for it, but are you <b>sure</b> you have what it takes to perform all of these, one after the other, hmm?</i>\" Ember says, rolling " + emberMF("his", "her") + " eyes in good-natured exasperation.");

			//if PC has Libido or Min Lust requirements fulfilled:
			if (player.stats.lib >= 50 || player.minLust() >= 40) {
				MainScreen.text("\n\nYou're pretty confident in your libido, the real question is if " + emberMF("he", "she") + "'ll have what it takes.");
			}
			else {
				MainScreen.text("\n\nEven if you can't, stamina won't be a problem.  You casually rummage through your pouches and fetch a vial of Lust Draft, displaying it to the dragon.");
				player.inventory.items.consumeItem(consumables.L_DRAFT);
			}
		}
		else {
			MainScreen.text("\n\n\"<i>I'm guessing somebody wants to try and handle all of the poses in one session again, hmm?</i>\" " + emberMF("he", "she") + " laughs, looking quite pleased at the prospect.");

			MainScreen.text("\n\nYou nod");
			if (player.stats.lib < 50 && player.minLust() < 40) {
				MainScreen.text(", grabbing a vial of Lust Draft from your pouches");
				player.inventory.items.consumeItem(consumables.L_DRAFT);
			}
			MainScreen.text(".");
		}
		Flags.list[FlagEnum.TIMES_EMBER_LUSTY_FUCKED]++;

		MainScreen.text("\n\n\"<i>Well, it's a dragon's duty to sate each and every need " + emberMF("his", "her") + " mate may have... Not that I'm not going to be enjoying every minute of it,</i>\" " + emberMF("he", "she") + " croons, long tongue slithering into the air in a lewd slurping gesture.  " + emberMF("He", "She") + " turns and starts walking towards " + emberMF("his", "her") + " den, the tip of " + emberMF("his", "her") + " long, prehensile tail running its sensitive underside teasingly under your chin, slowly sliding off of you as " + emberMF("he", "she") + " walks away and disappears into the opening.");

		MainScreen.text("\n\nYou follow after " + emberMF("his", "her") + ", feeling yourself get even harder at what you're about to do.");

		MainScreen.text("\n\nEmber has already made " + emberMF("him", "her") + "self comfortable, laying flat on " + emberMF("his", "her") + " back, " + emberMF("his", "her") + " wings outspread amidst the leaves for stability, " + emberMF("his", "her") + " legs lifted up in front of " + emberMF("him", "her") + " with hands wrapped around the curled crooks of " + emberMF("his", "her") + " knees to hold them out of the way.");

		//If Ember is male:
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1) {
			MainScreen.text("\n\n\"<i>I... um... well, the postures you've shown me are kind of meant more for a female dragon in the receiving position, but since I'm a boy you'll kind of have to... er... use what I do have,</i>\" he looks away in shame, though whether it's due to what he's trying to say or at the fact he lacks the parts that the poses are for is hard to say.  He swivels one arm to use his hand to spread apart his ass-cheeks, letting you get a clear look at his anus; the invitation is obvious.");
			MainScreen.text("\n\nYou lean over beside the embarrassed dragon and put a hand over his shoulder, then promise him to make him feel good and that you'll be gentle.");
			MainScreen.text("\n\nEmber looks embarrassed as he can get without blushing, then smiles happily and stares up at you with a doting smile.  His tongue slicks out to lick your cheek in an affectionate gesture.");
			MainScreen.text("\n\nYou get yourself in position and align your shaft with the dragon's puckered hole.  You hump a few times experimentally; each time your " + player.cockHead(x) + " bumps against his tight ass and threatens to push past his sphincter, the dragon gasps.  You would be worried if his gaze wasn't so lusty and expectant.");
			MainScreen.text("\n\n\"<i>P-please, stop teasing; go on.  Oh, I want you inside me so badly...</i>\" he tells you in a stage-whisper, his voice husky with want.");
			MainScreen.text("\n\nYou look into his eyes and smile, slowly pressing into his tight boy-pussy and spreading his cheeks with your girth.  Ember moans, arches his back and growls with delight, ass already clenching eagerly around your invading " + CockDescriptor.describeCock(player, x) + ".  A few more humps and you feel yourself go as far inside his ass as possible.");
			MainScreen.text("\n\n\"<i>Oh... oh, Marae, I feel so full, so stuffed with my mate's cock... it feels great,</i>\" he moans, though you're well aware of the tinge of pain in his voice, the grimace of discomfort on his face.");
			MainScreen.text("\n\nConsidering what he has ahead of himself, you hope he won't be too sore by the time you're done.");
		}
		else if (player.lowerBody.cockSpot.count() == 1) {
			MainScreen.text("\n\n\"<i>Alright, my mate; I hope you'll find my body as pleasing as I'll find yours - use me until we're both as sated as we can be,</i>\" she says, giggling and giving you a girlish pout at her words.");

			MainScreen.text("\n\nThat's exactly what you intend to do.  You run a hand over her ass, gently fingering her wet pussy with your thumb.  She lets out a humming noise of appreciation, shivering gently, but stays quiet and still, brushing your [leg] with her long, smooth tail.");

			MainScreen.text("\n\nYou remove your thumb and show it to her.  It is dripping wet, much like her love-hole.  A small droplet falls from your thumb to hit her on her clit, causing the wet lake held within her nethers to finally flood with her arousal, leaking all over the grass inside her den.");

			MainScreen.text("\n\n\"<i>Ohhh... what's keeping you, my mate?  I'm ready - no, I'm more than ready, I want your cock in me and filling me full of seed, and I want it NOW!</i>\" she snaps... then bursts out laughing at her own melodramatics.  \"<i>But, seriously, pretty please let me have it now?</i>\" she coos.");

			MainScreen.text("\n\nYou chuckle at her reaction and align yourself with her entrance, then begin pushing yourself in.  You moan, her depths are so hot... even though her body temperature is usually slightly lower than yours.  She must've been really turned on.  She moans ecstatically, and her legs quiver as she fights the urge to wrap them around you and squeeze you tightly between them, trapping you into sliding your cock into her to the very hilt.");
			MainScreen.text("\n\nYou slide inch after inch inside her pussy with deliberate slowness, trying to savor every second of the journey down her depths.  It's not until you cannot go any further that you stop.");

			MainScreen.text("\n\nYour ");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text("she-dragon");
			else MainScreen.text("dragon-girl");
			MainScreen.text(" moans throatily and gives you a rapturous look.  \"<i>I love you, [name]... gods, I love you so much, and I'm so happy I can finally say that to your face,</i>\" she tells you.");

			MainScreen.text("\n\nYou're happy to finally hear that from her too.  But as much as you appreciate the feelings, you have more pressing matters to attend to.");
		}
		//else if Ember has a pussy and the PC more than one cock:
		else {
			MainScreen.text("\n\nEmber's eyes are fixated on [eachCock], and she swallows softly.  Embarrassed, she says, \"<i>P-perhaps you'd like to use ");
			if (player.lowerBody.cockSpot.count() == 2) MainScreen.text("both");
			else MainScreen.text("two");
			MainScreen.text(" of those?  I-I know it's not exactly part of the pose and all, but...</i>\"");

			MainScreen.text("\n\nYou blink your eyes.  Is she implying what you think she is?");

			MainScreen.text("\n\n\"<i>Do you think I'm implying I would like to be doubly stuffed with my mate's wonderful dicks?</i>\"  Ember giggles.  \"<i>Well, then the answer is yes...  Oh, won't you please?</i>\"  She coos, batting her eyelids at you in an effort to entice you.");

			MainScreen.text("\n\nIt is kind of funny, seeing the dragon's attempt at giving you pleading eyes... but also undeniably cute.  How could you refuse such a request!");

			MainScreen.text("\n\nYou lean over, giving her a quick peck on her lips and then look down at her wet pussy.  Slowly you run a hand over her ass, pressing a teasing finger into her opening.  She croons and swishes her tail appreciatively at the attention.  A thin stream of juice runs down her succulent netherlips and down her crack, over her ass.  You finger her a little more and pull out to probe her little pucker.  At this she makes a quiet little noise, wriggling at the pressure, but otherwise doesn't complain.");

			MainScreen.text("\n\nYour slick fingers push inside her without trouble, despite her involuntary attempts at resisting.  Slowly you finger her ass, making sure she's nice and slick for your shafts.  A lewd moan crawls up from the depths of her throat, the dampness of her cunt as it dribbles lubricants down her crack");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(", not to mention the stiffness of her dick");
			MainScreen.text(", making it obvious she's ready.  \"<i>Oh, my mate... Please, fill me now!  Quit teasing me and just shove your cocks up your dragon's ready holes, jam them in as far as they can fit!</i>\" she pleads, but unable to meet your eyes in her embarrassment at her dirty talk.");

			MainScreen.text("\n\nYou have the urge to do just that, but you'd also like to savor it.  You align your shafts with her ready holes and begin pushing in.  It's a strange, but pleasant, feeling.  Her ass tries to reject the intruding advances of your " + CockDescriptor.describeCock(player, x) + ", while her pussy seems intent on pulling your other " + CockDescriptor.describeCock(player, x) + " in.  It only takes a couple insistent humps before you pierce the barrier formed by her sphincter and penetrate her ass.");
			MainScreen.text("\n\nEmber cries out, her whole body quivering in delight, both holes squeezing and clenching as they try to suck you inside");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(", cock dribbling precum onto her belly");
			MainScreen.text(".");

			MainScreen.text("\n\nThe feeling of having ");
			if (player.lowerBody.cockSpot.count() == 2) MainScreen.text("both ");
			else MainScreen.text("two of ");
			MainScreen.text("your cocks enveloped in slick tightness and warmth is almost enough to make you fill her up with your seed right then and there, but somehow you manage to hold on.");

			MainScreen.text("\n\nYour ");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text("she-dragon");
			else MainScreen.text("dragon-girl");
			MainScreen.text(" moans throatily and gives you a rapturous look.  \"<i>I love you, [name]... gods, I love you so much, and I'm so happy I can finally say that to your face,</i>\" she tells you.  Then she starts looking less in love and more in lust.  \"<i>But I also just love these cocks; these two wonderful breeding rods - come on, mate!  Breed your horny dragon!</i>\" she commands lustfully.");
		}

		MainScreen.text("\n\nYou take Ember's legs and support them over your shoulders.  This allows you to hug around them and slide your hips even closer to " + emberMF("him", "her") + ".  Eyes glittering with wanton lust, unabashed in " + emberMF("his", "her") + " naked desire for you, the dragon braces " + emberMF("him", "her") + "self against the leafy bedding of " + emberMF("his", "her") + " den and waits for you to begin, fingers rustling through the leaves and grass.");

		MainScreen.text("\n\nYou begin humping away, slowly at first, but quickly speeding your tempo until the cave is flooded with the noise of your crotch slapping against " + emberMF("his butt", "her soft folds") + ".  Ember groans and gasps, thrusting " + emberMF("his", "her") + " ass back against you, " + emberMF("his ass", "her cunt"));
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2 && player.lowerBody.cockSpot.count() > 1) MainScreen.text(" and ass");
		MainScreen.text(" rippling and squeezing your intruding member");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2 && player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
		MainScreen.text(".");

		MainScreen.text("\n\nHearing your dragon mate's moans of approval you redouble your efforts at pistoning into " + emberMF("him", "her") + ", giving that tight ");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("vagina");
		else MainScreen.text("ass");
		MainScreen.text(" of " + emberMF("his", "hers") + " the pounding it deserves.");

		MainScreen.text("\n\n\"<i>C-come on... cum into me, please!  Fill me with your seed!</i>\" Ember gasps, pleading with you.");

		MainScreen.text("\n\nYou penetrate " + emberMF("him", "her") + " once, twice and finally hilt as much of your " + CockDescriptor.describeCock(player, x) + " as you can inside " + emberMF("his", "her"));
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) {
			MainScreen.text(" slick pussy");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text(" and tight ass");
		}
		else MainScreen.text(" tight ass");
		MainScreen.text(" and blow your load.");

		MainScreen.text("\n\nEmber howls exultantly as your steaming load gushes inside of " + emberMF("him", "her") + ".  " + emberMF("His", "Her") + " ");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) {
			MainScreen.text("cunt shudders, splashing femcum all over your intruding shaft");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(", and her ");
			else MainScreen.text(", ");
		}
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3 || Flags.list[FlagEnum.EMBER_GENDER] == 1) {
			MainScreen.text("cock erupts, spraying draconic cum up into the air to rain back down upon " + emberMF("his", "her") + " body, spattering " + emberMF("him", "her") + " in " + emberMF("his", "her") + " own juices and ");
		}
		MainScreen.text("leaving " + emberMF("him", "her") + " gasping for breath as the climax ebbs away.");

		MainScreen.text("\n\nThe two of you pant in unison, it takes only a few moments of getting your breath back before you pull out of " + emberMF("his", "her") + " hole");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2 && player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
		MainScreen.text(", letting a satisfying stream of white mat the leaves below.  You smile at Ember, shaft");
		if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
		MainScreen.text(" still flagging above " + emberMF("him", "her") + ".");

		MainScreen.text("\n\n\"<i>Still not satisfied?</i>\" " + emberMF("he", "she") + " croons, tenderly brushing your cheek.  Then " + emberMF("his", "her") + " lips curl into a wicked, fang-baring grin.  \"<i>Good.  Neither am I.  Time for round two...</i>\"  " + emberMF("He", "She") + " wriggles about under you, repositioning " + emberMF("him", "her") + "self so that " + emberMF("he", "she") + " is on " + emberMF("his", "her") + " hands and knees, tail curled back out of the way and looking over " + emberMF("his", "her") + " shoulder under " + emberMF("his", "her") + " wing at you.  \"<i>Well?  What are you waiting for, an engraved invitation?</i>\" " + emberMF("he", "she") + " teases you.  A shake of the hips makes it quite clear " + emberMF("he", "she") + " is expecting you to take " + emberMF("him", "her") + " from behind, now.");

		MainScreen.text("\n\nYou caress " + emberMF("his", "her") + " tail, as " + emberMF("he", "she") + " wraps it lovingly around you, and then unceremoniously drive yourself back into " + emberMF("his", "her") + " still loose ");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1) MainScreen.text("ass");
		else if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("pussy");
		else MainScreen.text("holes");
		MainScreen.text(" with a squelch.  It feels so good... taking " + emberMF("him", "her") + " one time after the other.");

		MainScreen.text("\n\n\"<i>Ughhh... lean over, grab hold of me around the belly,</i>\" the dragon instructs you, groaning in desire at being filled so.  You do as " + emberMF("he", "she") + " tells you, squeezing with all your strength.  \"<i>Not that tight, dummy!</i>\" " + emberMF("he", "she") + " snaps back, tail lightly slapping against your forehead in chastisement.  You utter an apology and loosen your grip.  \"<i>Oh, yeah, that's much better... now, hump away, or I'm going to start humping you myself,</i>\" " + emberMF("he", "she") + " says, " + emberMF("his", "her") + " smirk blatant in " + emberMF("his", "her") + " voice.");

		MainScreen.text("\n\nYou start at a steady rhythm.  Ember moans below you, " + emberMF("his", "her") + " chest vibrating with " + emberMF("his", "her") + " rumbling purr.  " + emberMF("He", "She") + " moves in tandem with your own thrusts, helping you drive in and out of " + emberMF("his", "her") + " ");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1) MainScreen.text("ass");
		else if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("pussy");
		else MainScreen.text("holes");
		MainScreen.text(".  The wet squelching of your hips slapping against each other resounds in the den, much to your enjoyment.  \"<i>Mmm, so good... but, can't you go any harder?  Come on, my mate; I'm a dragon, not some powderpuff princess type - this is one " + emberMF("guy", "princess") + " who can most definitely take it,</i>\" " + emberMF("he", "she") + " growls to you in " + emberMF("his", "her") + " pleasure, moaning lewdly and clenching you with each stroke inside of " + emberMF("him", "her") + ".");

		MainScreen.text("\n\nYou do as " + emberMF("he", "she") + " suggests and begin driving yourself in and out of " + emberMF("him", "her") + " with more intensity.  \"<i>Harder!  Give it to me harder!</i>\" " + emberMF("he", "she") + " snaps.  You redouble your efforts, huffing with each hip-shaking thrust into your dragon mate.  \"<i>Ah!  Just like that.  Show me that you own me, just like I own you.  Ugh!  Show me what a powerful champion you are.  Hmm!  So powerful that you can bend over a dragon like me and fuck me silly.  [name], I love you so much...</i>\" " + emberMF("he", "she") + " trails off into a rumbling purr.  Enflamed by " + emberMF("his", "her") + " encouraging words you grip " + emberMF("him", "her") + " with all your might and thrust into " + emberMF("him", "her") + ".  You'd be worried about hurting " + emberMF("him", "her") + " if it weren't for " + emberMF("his", "her") + " lewd moans at your roughness as " + emberMF("he", "she") + " does " + emberMF("his", "her") + " best to push back against you.");

		MainScreen.text("\n\nYou feel something pop inside you, and you lean over the moaning dragon below, biting " + emberMF("his", "her") + " back as you ejaculate inside once more.  Spurt after spurt of cum jets inside " + emberMF("his", "her") + " willing hole");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 1 && player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
		MainScreen.text(".  The dragon lets out an exultant cry as " + emberMF("his", "her") + " cum-slimed ");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1) MainScreen.text("ass squeezes");
		else if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("pussy squeezes");
		else MainScreen.text("holes squeeze");
		MainScreen.text(" you, milking your ");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1) MainScreen.text("shaft as his cock spurts dragon-seed onto the leaves below him, filling the air with the scent of spunk and matting them into a steaming morass.");
		//{twin shafts} as {her cunt spasms wetly, drenching your lap with fresh femcum} {and/or} {[her] cock spurts dragon-seed onto the leaves below {her}, filling the air with the scent of spunk and matting them into a steaming morass}
		else {
			if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("shaft as her cunt spasms wetly, drenching your lap with fresh femcum");
			else MainScreen.text("twin shafts as her cunt spasms wetly, drenching your lap with fresh femcum");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" and her cock spurts dragon seed onto the leaves below her, filling the air with the scent of spunk and matting them into a steaming morass");
			MainScreen.text(".");
		}
		MainScreen.text("  Groaning and moaning like a whore, the dragon's wings beat, sending  cool air wafting over your overheating bodies before " + emberMF("he", "she") + " slumps onto the ground, barely able to hold " + emberMF("him", "her") + "self upright.  \"<i>...So good...</i>\"  Ember pants.  \"<i>I... uh... are you sure you want... round three?</i>\" " + emberMF("he", "she") + " asks, sounding a little tired as " + emberMF("he", "she") + " does, obviously not sure if you'll manage it.");

		//if PC has libido/lust:
		if (player.stats.lib >= 50 || player.minLust() >= 40) {
			MainScreen.text("\n\nYou're not quite satisfied yet.  You look down at [oneCock], watching it throb, still as hard as when you first started fucking Ember.  \"<i>You-you're not sated yet?</i>\" Ember asks in awe, ");
			if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("her cunt starting to drip");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" and ");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(emberMF("his", "her") + " cock growing hard again");
			MainScreen.text(" at the sight, equally impressed and aroused by your prodigious appetite for sex.  You did say you were going to give " + emberMF("him", "her") + " the fucking " + emberMF("he", "she") + " deserves.  Ember smiles tenderly at hearing that, then growls throatily as " + emberMF("he", "she") + " stares at you with both parts adoration and lust.  \"<i>Well, in that case...</i>\"");
		}
		//Else:
		else {
			MainScreen.text("\n\nWell, you don't feel like " + emberMF("he", "she") + "'s gotten the fucking " + emberMF("he", "she") + " deserves just yet.  Besides, you did come prepared.  You take hold of your vial.  Ember smiles tenderly at you.  \"<i>You don't have to go to such lengths for me, you know?  Still, I'm glad you like fucking me so much.</i>\"  You smile back and pop the cork, downing the draft in one big chug.  Ember watches in amazement as [eachCock] goes back into a raging erection.  As the dragon watches, ");
			if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("her cunt starts to drip with moisture");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" and ");
			if (Flags.list[FlagEnum.EMBER_GENDER] == 3 || Flags.list[FlagEnum.EMBER_GENDER] == 1) MainScreen.text(emberMF("his", "her") + " cock begins to grow erect again");
			MainScreen.text(", amazement giving way to arousal.  " + emberMF("He", "She") + " licks " + emberMF("his", "her") + " lips with " + emberMF("his", "her") + " inhuman tongue, clearly eager to begin again.");
		}

		MainScreen.text("\n\nEmber crawls over towards you, gripping the base of your shaft");
		if (player.lowerBody.cockSpot.count() > 1 && Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("s");
		MainScreen.text(" tenderly yet firmly, stroking you slowly.  \"<i>I can't believe how hot I get when I see you sporting ");
		if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("this");
		else MainScreen.text("these");
		MainScreen.text(".  It's just so... intoxicating... your scent, the way you look at me, everything really.</i>\"  You pat Ember's head");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 1 || Flags.list[FlagEnum.EMBER_HAIR] > 0) {
			MainScreen.text(", ruffling " + emberMF("his ", "her "));
			if (Flags.list[FlagEnum.EMBER_HAIR] >= 2) MainScreen.text("mane");
			else MainScreen.text("hair");
		}
		MainScreen.text(".  " + emberMF("He", "She") + " leans against your hand, hugging your midriff and letting your shaft");
		if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
		MainScreen.text(" brush against " + emberMF("his", "her") + " cheek.");

		MainScreen.text("\n\nThe dragon smiles at you, and then Ember opens " + emberMF("his", "her") + " mouth, letting " + emberMF("his", "her") + " inhuman tongue slither out and out.  With lovingly lavish strokes it slides up and down your [cock biggest]'s length, cleaning it of your ");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 0) MainScreen.text("mingled ");
		MainScreen.text("fluids before sinuously coiling around it like a snake, surrounding you in cool, slick, velvet.  Insistently it begins to slide back into " + emberMF("his", "her") + " mouth, taking your cock along for the ride until the dragon closes " + emberMF("his", "her") + " mouth, enveloping your shaft in the process, and starts to suckle eagerly, " + emberMF("his", "her") + " tongue caressing and squeezing inside as " + emberMF("he", "she") + " does so.");

		MainScreen.text("\n\n You moan as the dragon begins sucking you off.  It's hard to believe how into you " + emberMF("he", "she") + " is now... previously " + emberMF("he", "she") + " didn't seem to like blowing you, but now?  " + emberMF("He", "She") + " does it with such eagerness, you can't help but reward " + emberMF("his", "her") + " with a few spurts of pre.");

		MainScreen.text("\n\nEmber slurps and sucks loudly and lewdly, her tongue continuing its dance around your dick, but then it uncoils and " + emberMF("he", "she") + " pulls off with a wet pop, her fingers gently stroking the sensitive flesh, blowing a ticklish breeze over it with " + emberMF("his", "her") + " lips.");

		MainScreen.text("\n\n\"<i>Do you like it?  When I blow you?</i>\" " + emberMF("he", "she") + " looks up at you expectantly.  It's hard not to like it when " + emberMF("he", "she") + " does such a fine job.  At this " + emberMF("he", "she") + " smiles.  \"<i>I'm glad you like it.  I really like your taste, you know?</i>\"  Ember gets up and walks towards the far wall of the den, sticking " + emberMF("his", "her") + " ass out and swaying " + emberMF("his", "her") + " tail enticingly.  " + emberMF("He", "She") + " looks back lovingly at you and blows you a ring of smoke, blowing a straight line through its center shortly after.  \"<i>I'm ready...</i>\" " + emberMF("he", "she") + " whispers.");

		MainScreen.text("\n\nYou advance on " + emberMF("him", "her") + ", roughly gripping " + emberMF("his", "her") + " butt and spreading " + emberMF("his", "her") + " cheeks, as you plunge yourself back into " + emberMF("his", "her") + " ");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1) MainScreen.text("depths");
		else MainScreen.text("nethers");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2 && player.lowerBody.cockSpot.count() > 1) MainScreen.text(" and depths");
		MainScreen.text(".  \"<i>Ahn.  D-deeper...</i>\"  You hook your arm under " + emberMF("his", "her") + " knee and pull " + emberMF("his", "her") + " leg up, nearly throwing the dragon off balance.  \"<i>Ah!  D-do you like it when I let you take charge?  Ugh- oh!  Well, I think maybe I kind of like letting you be in charge, too...</i>\"  You barely pay attention to " + emberMF("his", "her") + " teasing remarks, instead focusing on exploring " + emberMF("his", "her") + " cummy ");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1) MainScreen.text("ass");
		else if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("pussy");
		else MainScreen.text("love-holes");
		MainScreen.text(".  \"<i>Uhn... yes...  take me again.</i>\"  " + emberMF("He", "She") + " lets " + emberMF("his", "her") + " tongue loll out as " + emberMF("he", "she") + " pants in pleasure.");

		MainScreen.text("\n\nMoans fit to make a whore blush spill from Ember's throat as " + emberMF("he", "she") + " eagerly grinds and thrusts against you.  " + emberMF("His", "Her") + " inner walls grip and squeeze around ");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2 && player.lowerBody.cockSpot.count() > 1) MainScreen.text("both of your dicks");
		else MainScreen.text("your dick");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text(", moisture drenching the cock buried in her cunt as it slobbers greedily across your burning flesh.");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("  " + emberMF("His", "Her") + " cock throbs and pulsates, ripples of arousal giving way to cumvein-bulging jets that shoot from " + emberMF("his", "her") + " prick to splatter wetly against the wall.");
		MainScreen.text("  Wobbling unsteadily, the dragon becomes increasingly dependent on you to hold " + emberMF("him", "her") + " upright - a climax is coming, and it looks like it's going to be big...");

		MainScreen.text("\n\nYou release " + emberMF("his", "her") + " leg and grab " + emberMF("him", "her") + " by " + emberMF("his", "her") + " midriff, pulling " + emberMF("him", "her") + " against you and letting " + emberMF("him", "her") + " literally fall into your arms, penetrating your dragon mate deeper than ever.  With a thunderous roar that rattles off of the walls of " + emberMF("his", "her") + " den, Ember cums, ");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) {
			MainScreen.text(emberMF("his", "her") + " cock fountaining seed across the wall, practically whitewashing it in steaming hot dragon-spunk");
		}
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text(" and ");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("her cunt gushing female ejaculate, almost soaking you with the cascade of feminine fluids and puddling wetly against your [feet]");
		MainScreen.text(".");

		MainScreen.text("\n\nEmber's orgasm forces your own.  You spew wave after wave of liquid love into " + emberMF("his", "her") + " used ");


		if (Flags.list[FlagEnum.EMBER_GENDER] == 1) MainScreen.text("ass");
		else if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("pussy");
		else MainScreen.text("love-holes");
		MainScreen.text(", feeling the excess slide out around your cock");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2 && player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
		MainScreen.text(".  \"<i>Ahh... more seed from my lover...</i>\" " + emberMF("he", "she") + " whispers, nearly passing out from the pleasure.  You feel yourself grow dizzy with pleasure and tumble onto the soft grass covering the den's floor, bringing Ember along.  Your dick");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2 && player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
		MainScreen.text(" slide");
		if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("s");
		MainScreen.text(" out of " + emberMF("his", "her") + " with a wet slurp, allowing your deposit to leak its way under your prone forms.");

		MainScreen.text("\n\nYou both take a few moments to catch your breath, before Ember rolls over to look at you.  " + emberMF("He", "She") + " extends a clawed hand to lightly brush your cheek.  \"<i>[name]... you really know how to make a dragon feel loved...</i>\"  You return the gesture, telling " + emberMF("him", "her") + " it's easy when a dragon seems to love you just as much.  Ember smiles adoringly at you.  \"<i>Hey, can I ask you something, [name]?</i>\"  You indicate that it's okay.  \"<i>I want to be with you... hold you for a little while... is it okay if we do that?</i>\"");
		player.orgasm();
		player.stats.sens += -5;
		//[Yes] [No]
		menu();
		MainScreen.addButton(0, "Yes", stayWithEmberAfterLustFuck);
		MainScreen.addButton(1, "No", noStayingForCuddlesPostLustFuck);
	}

	//[=No=]
	//Less time used (Only 1 hour.)
	//Fatigue stays gained, whereupon it's lost if PC stays and rests? (Sure!)
	private noStayingForCuddlesPostLustFuck(): void {
		MainScreen.clearText();
		MainScreen.text("You tell Ember that you can't stay, you have to get going now.  " + emberMF("He", "She") + " looks a bit disappointed, but forces " + emberMF("him", "her") + "self to smile all the same.  \"<i>I understand, you have other things to do... just know that I'll always be here for you, for better or worse.</i>\"  You ");
		//50 or less Corruption:
		if (player.stats.cor < 50) MainScreen.text("thank her for being so understanding");
		else MainScreen.text("grunt an acknowledgement");
		MainScreen.text(" and then gather your things before heading off to wash yourself down.");
		doNext(camp.returnToCampUseOneHour);
	}

	//[=Yes=]
	private stayWithEmberAfterLustFuck(): void {
		MainScreen.clearText();
		let x: number = player.cockThatFits(emberVaginalCapacity());
		if (x < 0) x = player.smallestCockIndex();
		MainScreen.text("With a smile, you tell " + emberMF("him", "her") + " that you'd be happy to.  \"<i>Great, come here...</i>\" " + emberMF("he", "she") + " croons, scooting over towards you.  You open your arms and allow the dragon to snuggle up against you, folding your arms comfortably under " + emberMF("his", "her") + " wings.");

		//If Ember is male:
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1) {
			MainScreen.text("\n\nAs you embrace each other, you feel something stirring against your " + player.skinFurScales() + ".  Breaking up the hug to look downwards you spot Ember's draconic member, erect once more.  \"<i>I... well... you can't expect me to keep it down when I'm holding my naked mate now, can you?</i>\" he states, quite flustered at his reaction.  [OneCock] growing erect, brushing against his, serves as your answer.");

			MainScreen.text("\n\nEmber trembles at the contact, electrical waves of pleasure coursing through his body as your members touch.  \"<i>T-That felt good!</i>\" he exclaims, humping slightly to rub your shafts together once more.  \"<i>Yes...  [name], how about we rub one off together this time?  I like how naughty this feels; besides my ass is still pretty sore and I can't hold you if you take me from behind...</i>\"");

			MainScreen.text("\n\nYou can't see any reason not to, and tell him so.");
			menu();
			MainScreen.addButton(0, "Next", frottingWithEmber);
		}
		//else if Ember is female:
		else if (Flags.list[FlagEnum.EMBER_GENDER] == 2) {
			MainScreen.text("\n\nEmber hugs you tightly, pressing you against her bosom.  You enjoy the feel of the dragon's ");
			if (Flags.list[FlagEnum.EMBER_MILK] > 0) MainScreen.text("milk-filled ");
			MainScreen.text("breasts against you, soft, smooth, and slightly cooler than you are.  You just enjoy each other for awhile, until you feel your shaft stir once more.  Ember's nostrils flare for a moment and she smiles knowingly at you.  \"<i>Haven't had enough of me yet?</i>\"  You turn the question back on her, asking if she's saying she's had enough of you.  \"<i>I can safely say that I can never have enough of you... I'm soaking wet already.</i>\"  The dragon");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0) MainScreen.text("-girl");
			MainScreen.text(" takes your hand and presses it against her wet quim.  Your fingers instinctively move, sliding themselves over and slightly into the damp netherlips.  \"<i>Ooh... that feels nice... but know what would feel even better?</i>\" she asks teasingly as she strokes your side.  Playfully, you ask her what that might be.");

			MainScreen.text("\n\nEmber reaches down, gripping the base of your [cock biggest].  \"<i>This.</i>\"  You can't resist teasing Ember that she's quite a horny girl, now.  \"<i>Only when I'm with you.</i>\"  She giggles.  \"<i>Truth is I've always been like that.  I guess deep down I always knew you were my true mate, I just... well... I guess I let pride get in the way.  Sorry for being such a handful for so long...</i>\"  You place a kiss on the dragon's lips; Ember is evidently quite grateful for the excuse to shut up, because she eagerly kisses you back.");

			MainScreen.text("\n\nShe breaks the kiss and lightly strokes your shaft, smiling at you.  Then she aligns the tip of your " + CockDescriptor.describeCock(player, x) + " with her pussy.");
			menu();
			MainScreen.addButton(0, "Next", penetrateWithEmber);
		}
		else {  //if Ember is herm:
			MainScreen.text("\n\nAs you embrace each other, you feel something stirring against your " + player.skinFurScales() + ".  Breaking up the hug to look downwards you spot Ember's draconic member, erect once more.  \"<i>I... well... you can't expect me to keep it down when I'm holding my naked mate now, can you?</i>\"  She states, quite flustered at her reaction.  Your own [cock biggest] growing erect, brushing against hers, serves as your answer.");
			MainScreen.text("\n\nEmber trembles at the contact, electrical waves of pleasure coursing through her body as your members touch.  \"<i>T-That felt good!</i>\" she exclaims humping slightly to rub your shafts together once more.  \"<i>This feels so good I'm getting even wetter down there,</i>\"  The herm dragon");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0) MainScreen.text("-girl");
			MainScreen.text(" states, idly rubbing your cocks together.  One of your hands slips down between the two of you, sliding over the ridged surface of the herm dragon's cock before pressing itself against her well-used quim; sure enough, it's already drooling eagerly at the prospect of being filled again.");

			MainScreen.text("\n\n\"<i>Hmm... [name], my mate?  Feel like trying something different?  Or if you aren't, can you at least put that cock inside me once more?  I want you...</i>\"  Ember licks her lips in anticipation.");

			//[Frotting] [Penetrate]
			menu();
			MainScreen.addButton(0, "Frotting", frottingWithFrottingEmberHerm);
			MainScreen.addButton(1, "Penetrate", penetrateEmberHerm);
		}
	}

	//[=Frotting=]
	private frottingWithFrottingEmberHerm(): void {
		MainScreen.clearText();
		MainScreen.text("You think the matter over, and then slowly rub your [cock biggest] against Ember's to answer her question.  The dragon-herm gasps, then smiles lewdly at you.");
		frottingWithEmber(false);
	}

	//[=Penetrate=]
	private penetrateEmberHerm(): void {
		MainScreen.clearText();
		MainScreen.text("You decide you'd rather use her once more, so you finger her pussy once more.  \"<i>Ooh... go ahead, I belong to you, my mate,</i>\" she says, opening her legs slightly to give you better access.  You slide yourself around to properly position yourself at her entrance, and then hold yourself there, ready to begin.");
		penetrateWithEmber(false);
	}

	//Frotting:
	private frottingWithEmber(clear: boolean = true): void {
		let x: number = player.biggestCockIndex();
		if (clear) MainScreen.clearText();
		else MainScreen.text("\n\n");
		MainScreen.text("Ember thrusts against your shaft; the ridges of " + emberMF("his", "her") + " dick stimulate your " + CockDescriptor.describeCock(player, x) + " and you moan at the feeling.  \"<i>Come on, [name].  Are you going to make me do all the work?</i>\" " + emberMF("he", "she") + " teases you.  You slowly stroke your shaft against " + emberMF("his", "hers") + ", asking just what " + emberMF("he", "she") + " has in mind; wasn't " + emberMF("he", "she") + " planning on taking a breather?");

		MainScreen.text("\n\n\"<i>I'm always ready to pleasure my mate... besides, I can still hug you while we hump each other,</i>\" Ember says, grabbing you into a hug and pulling you tightly against " + emberMF("his", "her") + "self, mashing your shafts together.");

		//if PC and Ember are male:
		if (player.gender == 1 && Flags.list[FlagEnum.EMBER_GENDER] == 1) MainScreen.text("\n\n\"<i>Sometimes I wonder what other dragons would say... I'm supposed to breed and birth a new generation of dragons into Mareth.  Yet here am I fooling around with a guy...</i>\" he smirks at you.  \"<i>But heck if I care, I love you too much to let this bother me anymore... besides maybe if we try real hard you can still get me pregnant?  Or maybe you'd prefer I got you pregnant?</i>\"  You roll your eyes and kiss him, though it fails to wipe the smirk from his face.");

		MainScreen.text("\n\nHaving your shaft pressed so tightly between the two of you stimulates your sensitive member enough that you can't help but drool pre on both your bellies.  Ember is much ahead of you, however.  " + emberMF("His", "Her") + " cock dribbles slickness, lubing your bellies up and easing the contact between your shafts, making it even easier to hump against " + emberMF("his", "her") + ".");

		MainScreen.text("\n\n\"<i>Hmm... yeah... use my shaft to get yourself off.  And get me off too, you sexy beast, you.</i>\"  The dragon");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0) MainScreen.text(emberMF("-boy", "-girl"));
		MainScreen.text("'s overly long tongue sticks out as pleasure overrides " + emberMF("his", "her") + " senses.  You groan as you slide your cock against Ember's, the thought occurring to you that this is going to be pretty messy when the inevitable comes, but you are too overwhelmed to actually say so.");

		MainScreen.text("\n\nAs if reading your mind, Ember says, \"<i>Just enjoy yourself and don't worry about any mess.  I'll clean everything up later.  Ah!  Besides, it's a dragon's duty to clean after their mate.</i>\"  Plus a dragon's pleasure to enjoy making the mess, you suggest.");

		MainScreen.text("\n\nEmber doesn't bother wasting time with idle chatter anymore, " + emberMF("he", "she") + " embraces you tightly against " + emberMF("him", "her") + "self and begins truly thrusting against your slickened belly, not caring that " + emberMF("his", "her") + " pre seems to be pooling between the two of you.");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("  Her moist dragon pussy is not helping the mess in the least.  You can smell her femcum pooling along with her pre.");

		MainScreen.text("\n\nYou match the dragon thrust for thrust and hump for hump, mewling softly; it's not like fucking a hole, but it's certainly not without its charms.  You can feel that wonderful pressure building inside you for the fourth time, and gasp to Ember that climax is close.  \"<i>Don't hold anything back...</i>\" " + emberMF("he", "she") + " whispers, kissing you deeply.");

		MainScreen.text("\n\nWith a moan and a gasp, you do as " + emberMF("he", "she") + " says, letting the pleasure wash over you and spilling seed over the dragon's belly, twitching as the sparks fly through your nerves.  Ember breaks the kiss and roars as " + emberMF("his", "her") + " own shaft joins yours in making a mess of both your bellies.  Sighing with relief as the last of it ebbs out of you, instinctively you snuggle against the slimy form of your draconic lover, holding " + emberMF("his", "her") + " closer as the last of your orgasm seeps out of you and smears you both in semen.");

		MainScreen.text("\n\nEmber breaks the hug and scoots back, sitting against the den's wall.  You keep watching " + emberMF("him", "her") + " as " + emberMF("his", "she") + " scoops some of your cum from " + emberMF("his", "her") + " own body and uses it to stroke " + emberMF("him", "her") + "self into another, weaker, climax.  A couple of weak ropes of jism spurt from " + emberMF("his", "her") + " tapered tip to fall weakly on the ground before " + emberMF("him", "her") + ".");
		if (Flags.list[FlagEnum.EMBER_GENDER] >= 2) MainScreen.text("  Her other hand frigs her pussy as she comes down from her orgasm, gushing female juices and leaking some of the cum you've pumped into her earlier.");

		MainScreen.text("\n\nThe dragon");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0) MainScreen.text(emberMF("-boy", "-girl"));
		MainScreen.text(" uses what strength " + emberMF("he", "she") + " still has to crawl over to you and slide back between your arms.  \"<i>Sorry, just had to get that last bit out of my system.</i>\"  " + emberMF("He", "She") + " yawns lowdly.  \"<i>[name]?  How about a quick nap?</i>\"  " + emberMF("He", "She") + " asks not even bothering to hear your reply before exhaustion gets " + emberMF("his", "her") + " and " + emberMF("he", "she") + " falls asleep, snoring lightly.  You smile at " + emberMF("him", "her") + " and stroke " + emberMF("his", "her"));
		if (Flags.list[FlagEnum.EMBER_HAIR] == 0 && Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text(" head");
		else if (Flags.list[FlagEnum.EMBER_HAIR] == 2) MainScreen.text(" mane");
		else MainScreen.text(" hair");
		MainScreen.text(" before allowing yourself to also fall asleep.");
		player.orgasm();
		//doNext(14);
		menu();
		MainScreen.addButton(0, "Next", emberJizzbangbangEnding);
	}

	//Penetrate:
	private penetrateWithEmber(clear: boolean = true): void {
		if (clear) MainScreen.clearText();
		else MainScreen.text("\n\n");
		let x: number = player.cockThatFits(emberVaginalCapacity());
		if (x < 0) x = player.smallestCockIndex();
		MainScreen.text("\"<i>Go on.</i>\"  She moves her arms around you and into a hug.  \"<i>Enter me.</i>\"  With no further prelude needed, you slide yourself into the damp interior of her cunt, the organ eagerly accepting you back for the fourth time.");

		MainScreen.text("\n\nEmber embraces you tightly, caressing your sides with her clawed hand, always careful not to hurt you.  \"<i>This feels so right... but do try to be gentle, I'm still a bit sore from earlier,</i>\" she croons, kissing your cheek.  You gently play with her breasts");
		if (Flags.list[FlagEnum.EMBER_MILK] > 0) MainScreen.text(", milk seeping across your fingers,");
		MainScreen.text(" and promise you will, sliding slowly in until you have hilted yourself yet again.");

		MainScreen.text("\n\nThe dragon");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0) MainScreen.text("-girl");
		MainScreen.text(" moans at your ministrations");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) {
			MainScreen.text(", her draconic prick pressing tightly against you as it leaks a steady stream of pre, matting ");
			if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 1) MainScreen.text("your [chest], ");
			MainScreen.text("your belly");
			if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 1) MainScreen.text(",");
			MainScreen.text(" and Ember's own.");
		}
		MainScreen.text("  \"<i>Do you like playing with my body?</i>\"  Ember asks, gazing at you through half-lidded eyes.  You give her a playful smirk and run your fingers expertly over her nipples, making her moan and mewl at the stimulation and saying more than mere words could on the matter.");

		MainScreen.text("\n\n\"<i>I'm happy you enjoy my body... but did you know I enjoy yours too?  And I enjoy it a... lot...</i>\"  She whispers into your ear, licking around it with her elongated tongue.  Her roaming hands find ");

		if (player.lowerBody.tailType > TailType.NONE) MainScreen.text("the base of your tail, tugging lightly on it and stroking it for a moment, then her hands move on to ");
		MainScreen.text("your [butt], grabbing the ");
		MainScreen.text("cheeks.  You wriggle appreciatively under her grip, making it clear she's not half bad at this herself.  The she-dragon giggles at your compliment, coiling her tail around your [legs].  \"<i>I haven't even started playing with you properly yet, my mate, and you're already excited...</i>\"  She clicks her tongue in mock reproval.  \"<i>You're such a pervert aren't you, [name]?  Lucky for us, you are <b>my</b> pervert, and I enjoy being played with a lot... so go ahead and toy with my body as much as you want.  I'll make sure to return the favor,</i>\" she purrs lovingly, sliding her hands back up your back, ");
		if (player.upperBody.wingType > WingType.NONE) MainScreen.text("stopping momentarily to stroke along your " + player.upperBody.wingDesc + " wings before continuing up and ");
		MainScreen.text("stopping at the back of your head.");

		MainScreen.text("\n\nSlowly she guides you towards one of her erect nipples.  \"<i>");
		if (Flags.list[FlagEnum.EMBER_MILK] > 0) MainScreen.text("Drink my milk, I've been saving it up specially for you,");
		else MainScreen.text("I may not have any milk in my breasts right now, but maybe if you keep suckling I'll be able to make you some,");
		MainScreen.text("</i>\" Ember teases you.  You smile at her and accept the nipple, rolling it between your lips and exerting gentle, teasing pressure with your teeth.");
		if (Flags.list[FlagEnum.EMBER_MILK] > 0) MainScreen.text("  You savor the resultant gush of sweet dragon's milk as it squirts obediently down your throat.");

		MainScreen.text("\n\n\"<i>Hmm... that feels nice.  Just... don't forget what's the priority here.</i>\"  She bucks against your cock, still firmly lodged inside her.");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("  A small dollop of pre escapes Ember's dragon-dick at the pleasure of the movement.");
		MainScreen.text("  \"<i>And don't forget about my other breast either.</i>\"  She takes your hand in her own and guide it to her other mound, helping you knead it.");

		MainScreen.text("\n\nYou squeeze her tit as she clearly wants you to, caressing the firm-yet-soft flesh.  As you do so, you suckle teasingly at her other nipple, ");
		if (Flags.list[FlagEnum.EMBER_MILK] > 0) MainScreen.text("allowing milk to spill into your mouth and gulp down sweet load after load, ");
		MainScreen.text("listening to her moan softly in pleasure from your actions, feeling her netherlips rippling around your " + CockDescriptor.describeCock(player, x) + ".  Your nursing is suddenly interrupted when you're pulled off Ember's breasts and into a deep kiss.  The dragon-girl shoves her tongue inside your mouth, exploring it in detail");
		if (Flags.list[FlagEnum.EMBER_MILK] > 0) MainScreen.text(", not even caring that she's tasting her own milk as you finish gulping it down");
		MainScreen.text(".  You kiss her back as eagerly as you can until lack of air forces you to break the kiss and catch your breath.");

		MainScreen.text("\n\n\"<i>I love you so much, [name].  Cum for me...</i>\" she nuzzles you.  You couldn't resist her even if you wanted to, your over-sensitive dick spasming as you empty yourself for the third time into her well-used pussy.  Your climax triggers Ember's own, the dragon");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] > 0) MainScreen.text("-girl");
		MainScreen.text(" roaring towards the ceiling, then turning to look at you as her pussy constricts and milks you for all you're worth.  Already spent from your past three orgasms, you just sit back and enjoy yourself being milked by her strong vaginal muscles one last time.");
		if (player.cumQ() < 250) MainScreen.text("\n\nA mere trickle is all that leaves you, having already exhausted your supply from the last two climaxes");
		else if (player.cumQ() < 500) MainScreen.text("\n\nAlthough already well-milked by this point, your load is still big enough to compare to a normal climax, adding a few more good-sized jets to the cock-cream already stretching her belly into a slight paunch");
		else MainScreen.text("\n\nWith your prodigious output, whilst your load is vastly smaller than normal, it's still much bigger than any normal man's first time, leaving Ember moaning as her already swollen belly gains another couple of inches, looking well and truly \"ready to pop any day now\"-pregnant");
		MainScreen.text(".");
		if (Flags.list[FlagEnum.EMBER_GENDER] == 3) MainScreen.text("  Her draconic cock throbs all the way through your orgasm, shooting blanks a few times before spurting a couple ropes of pre onto her belly.");

		MainScreen.text("\n\nThe two of you collapse into each other's arms.  You move to pull out, but Ember stops you by holding your hips in place.  \"<i>Leave it inside... that's where it belongs.</i>\"  She smiles at you, panting a bit.  Too tired and happy to argue, you simply nod your head, rest against her, and allow sleep to claim you. You're dimly aware of Ember doing the same thing before you fade.");
		player.orgasm();
		//doNext(14);
		menu();
		MainScreen.addButton(0, "Next", emberJizzbangbangEnding);
	}

	//Frotting and Penetrate connect here.
	private emberJizzbangbangEnding(): void {
		MainScreen.clearText();
		MainScreen.text("You moan as consciousness returns, dimly aware of something wet and cool wrapped around your dick, something firm and muscular wrapped around and squeezing you in the most pleasant of ways.  You open your eyes and sit up, allowing you to see Ember kneeling before you, mouth wrapped eagerly around your cock.");

		MainScreen.text("\n\n" + emberMF("He", "She") + " looks up and smiles as well as " + emberMF("he", "she") + " can around your cock.  Inside " + emberMF("his", "her") + " mouth you can feel " + emberMF("his", "her") + " tongue wrapping tightly around you, like a snake, then " + emberMF("he", "she") + " sucks sharply, slurping on your dick like a fancy treat.  Any thoughts you might have had about speaking to " + emberMF("him", "her") + " are lost as you gasp and spasm, firing a last sizable spurt of cum into the dragon's sucking mouth.  Ember is surprised at first, but quickly takes you in as far as " + emberMF("he", "she") + " can and lets you shoot straight into " + emberMF("his", "her") + " throat.  " + emberMF("His", "Her") + " tongue laps around your shaft, tasting you before " + emberMF("he", "she") + " pulls off slowly, letting some of your seed gather in " + emberMF("his", "her") + " mouth.  You moan when " + emberMF("he", "she") + " moves away, letting the cold wind bat against your sensitive shaft.  " + emberMF("He", "She") + " opens her ");
		if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text("maw");
		else MainScreen.text("mouth");
		MainScreen.text(", letting you see the whiteness on " + emberMF("his", "her") + " tongue, before tipping " + emberMF("his", "her") + " head back and gulping it down, licking " + emberMF("his", "her") + " lips and moaning as if " + emberMF("he", "she") + " was tasting a fine wine.  \"<i>Thanks for the snack, my mate.</i>\" " + emberMF("He", "She") + " croons at you, a teasing expression on " + emberMF("his", "her") + " face.");

		MainScreen.text("\n\n" + emberMF("He", "She") + " really does enjoy " + emberMF("his", "her") + " sessions with you, doesn't " + emberMF("he", "she") + "?  \"<i>What do you think?</i>\"  " + emberMF("He", "She") + " grins.  \"<i>Still, I can see I picked quite a virile mate.  To be able to cum after all the sex we had previously?  You really are something else, my mate...</i>\"  " + emberMF("He", "She") + " licks " + emberMF("his", "her") + " lips and gets up.");

		//if Ember has a dick (male/herm):
		if (Flags.list[FlagEnum.EMBER_GENDER] == 1 || Flags.list[FlagEnum.EMBER_GENDER] == 3) {
			MainScreen.text("\n\n\"<i>I doubt I'd be able to even get an erection after the last session.</i>\"  Then what's that bobbing between " + emberMF("his", "her") + " legs, you note sarcastically, pointing at the erection Ember is most definitely sporting of " + emberMF("his", "her") + " own accord.");

			MainScreen.text("\n\n\"<i>Umm... okay, maybe I can still get hard, but I surely can't cum anymore.</i>\"  You look at the dragon and tap your fingers, waiting for the sheepish ");
			if (Flags.list[FlagEnum.EMBER_ROUNDFACE] == 0) MainScreen.text("anthro");
			else MainScreen.text("monster-" + emberMF("boy", "girl"));
			MainScreen.text(" to come clean.  \"<i>Cut me some slack... I'm not made of stone, you know.  I was just giving my mate a blowjob, you can't seriously expect me not to react to that...</i>\"  " + emberMF("He", "She") + " crosses " + emberMF("his", "her") + " arms and blows a puff of smoke as " + emberMF("he", "she") + " looks away, obviously flustered.");

			MainScreen.text("\n\nYou can't help but laugh; Ember's attitude may have perked up, but " + emberMF("he's", "she's") + " just as easy to tease as ever.  " + emberMF("He", "She") + " blows another puff of smoke at you.  \"<i>You're lucky I love you or I swear I would make you regret teasing me.</i>\"");
		}
		MainScreen.text("\n\nYou note that your lover is still plastered in the liquid leavings of your recent lovemaking, and point that out to the dragon.");

		MainScreen.text("\n\n\"<i>Oh, don't worry about all of this, I'll get cleaned up later.  As for you, my mate, I suppose it's time you got going, huh?</i>\"  You note that " + emberMF("he", "she") + "'s right, and start picking yourself up off of Ember's bed.  \"<i>I'll help you.</i>\"");

		MainScreen.text("\n\nEmber steps outside to gather your clothes, dusting them off before bringing them for you.  The dragon is earnest in " + emberMF("his", "her") + " efforts and you find yourself dressed quite quickly, though " + emberMF("he", "she") + "'s not so professional as to resist the option to steal a few gropes in the process.  \"<i>There you go.</i>\"");

		MainScreen.text("\n\nYour dragon mate leans in to give you a quick peck on the lips.  \"<i>We should do this again sometime... I really enjoyed myself.</i>\"  " + emberMF("He", "She") + " smiles awkwardly.  \"<i>Now I gotta get cleaned!</i>\"  " + emberMF("He", "She") + " doesn't wait for your reply and dashes off beyond the bushes towards the nearest stream.");

		MainScreen.text("\n\nYou head off yourself, ready to resume the rest of your day.");
		//2 hours pass, PC's fatigue is healed some, Libido is reduced.
		fatigue(-20);
		player.stats.lib += -1;
		doNext(camp.returnToCampUseTwoHours);
	}
}
}
