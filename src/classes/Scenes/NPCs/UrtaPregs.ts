﻿
export default class UrtaPregs extends NPCAwareContent {

	//const URTA_INCUBATION: number = 789;
	//const URTA_TIMES_BIRTHED: number = 790;
	//const URTA_TIMES_PC_BIRTHED: number = 791;
	//const URTA_KIDS_MALES: number = 792;
	//const URTA_KIDS_FEMALES: number = 793;
	//const URTA_KIDS_HERMS: number = 794;
	//const URTA_FIRSTBORN_GENDER: number = 795;
	//const URTA_FIRSTBORN_COCKTYPE: number = 796;
	//const URTA_LATESTBORN_GENDER: number = 797;
	//const URTA_LATESTBORN_COCKTYPE: number = 798;
	//const NEED_URTA_LETTER: number = 799;
	//const URTA_INCUBATION_CELEBRATION: number = 801;
	//const URTA_PREGNANT_DELIVERY_SCENE: number = 802;
	//const TIMES_MASSAGED_URTA_BELLY: number = 803;
	//const TIMES_URTA_BOOB_WORSHIPPED: number = 804;
	//const TIMES_NURSED_FROM_URTA: number = 805;
	//const URTA_LUNCH_PLAY: number = 806;
	//const LIANNA_HAVESTED_MALES: number = 807;
	//const LIANNA_HAVESTED_LADIES: number = 808;
	//const FIRST_TIME_AT_URTA_HOUSE: number = 809;
	//const NEW_BABY_ANNOUNCED: number = 810;
	//const DISCUSSED_LUBE_SPRAY: number = 811;
	/*FLAGS NEEDING DEFINED
	URTA_TIMES_BIRTHED
	URTA_TIMES_PC_BIRTHED
	URTA_KIDS_MALES
	URTA_KIDS_FEMALES
	URTA_KIDS_HERMS
	URTA_FIRSTBORN_GENDER
	URTA_FIRSTBORN_COCKTYPE
	URTA_LATESTBORN_GENDER
	URTA_LATESTBORN_COCKTYPE
	*/

	private get pregnancy(): PregnancyType { return kGAMECLASS.urta.pregnancy; }

	//Urta Pregnancy Stages
	//Urta takes 2 days to progress from one pregnancy stage to the next
	//In Bar Menu
	public urtaKids(): number {
		return Flags.list[FlagEnum.URTA_KIDS_MALES] + Flags.list[FlagEnum.URTA_KIDS_FEMALES] + Flags.list[FlagEnum.URTA_KIDS_HERMS];
	}

	private urtaSexMenu(): void {
		let spank: Function = null;
		if ((player.lowerBody.cockSpot.hasCock() && player.cockThatFits(urta.urtaCapacity()) >= 0) || player.hasKeyItem("Deluxe Dildo") >= 0) spank = urta.spankTheShitOutOfUrtaAndMakeHerCreamHerselfFromProstateStimulationAloneLikeTheHornyDrunkenSlutSheReallyIs;
		//NOT Drunk
		if (!urta.urtaDrunk()) {
			//Lover
			if (Flags.list[FlagEnum.URTA_PC_LOVE_COUNTER] == 1) {
				menu();
				MainScreen.addButton(0, "Her Place", urta.goBackToUrtasForLuvinz);
				if (Flags.list[FlagEnum.URTA_CUM_NO_CUM_DAYS] >= 5) MainScreen.addButton(1, "Suck Off", urta.slurpFawkesCocksForFunAndInflation);
				else MainScreen.addButton(1, "Suck Off", urta.blowUrtaUnderTheTableLuv);
				MainScreen.addButton(2, "Eat Out", urta.eatUrtaOutNomNomPussy);
			}
			//FRIEND
			else {
				menu();
				if (Flags.list[FlagEnum.URTA_CUM_NO_CUM_DAYS] >= 5) MainScreen.addButton(0, "Hidden BJ", urta.slurpFawkesCocksForFunAndInflation);
				else MainScreen.addButton(0, "Hidden BJ", urta.blowUrtaUnderTable);
				MainScreen.addButton(1, "Urta's Place", urta.goBackToUrtasForLuvinz);
				MainScreen.addButton(4, "Leave", telAdre.barTelAdre);
			}
		}
		//DRUNK
		else {
			//LOVER
			if (urtaLove()) {
				menu();
				MainScreen.addButton(0, "Jerkoff", urta.getAPublicFacialFromUrta);
				MainScreen.addButton(1, "Anal Ride", urta.takeUrtaInTheButtPublically);
				if (player.canOviposit()) MainScreen.addButton(2, "Lay Eggs", urta.giveTheFoxSomeEggs);
				MainScreen.addButton(3, "Spank Her", spank);
				if (Flags.list[FlagEnum.RAPHEAL_COUNTDOWN_TIMER] == -2 && RaphaelLikes() && Flags.list[FlagEnum.URTA_X_RAPHAEL_HAPPENED] == 0) {
					MainScreen.addButton(8, "3SomeSurprise", urta.urtaAndRaphaelSurprise);
				}
				MainScreen.addButton(9, "Leave", telAdre.barTelAdre);
			}
			//FRIEND
			else {
				menu();
				MainScreen.addButton(0, "Jerkoff", urta.getAPublicFacialFromUrta);
				MainScreen.addButton(1, "Anal Ride", urta.takeUrtaInTheButtPublically);
				if (player.canOviposit()) MainScreen.addButton(2, "Lay Eggs", urta.giveTheFoxSomeEggs);
				MainScreen.addButton(3, "Spank Her", spank);
				if (Flags.list[FlagEnum.RAPHEAL_COUNTDOWN_TIMER] == -2 && RaphaelLikes() && Flags.list[FlagEnum.URTA_X_RAPHAEL_HAPPENED] == 0) {
					MainScreen.addButton(8, "3SomeSurprise", urta.urtaAndRaphaelSurprise);
				}
				MainScreen.addButton(9, "Leave", telAdre.barTelAdre);
			}
		}
	}


	internal function urtaPregAppearance(): void {
		switch (pregnancy.event) {
			case 1:
			case 2: MainScreen.text("Urta is sitting at her usual table, looking more clear-eyed and sober than usual.  She looks extremely happy, tail wagging gently behind her, and she gives you a thrilled look when she sees you, smiling blissfully and patting her belly in a meaningful gesture.");
				break;
			case 3:
			case 4:
			case 5:
			case 6:
			case 7: MainScreen.text("Urta has moved from her usual table to a more private stall, apparently for the comfort of its padded seats.  Her bulging belly makes it obvious she's pregnant - and the wide grin that seems fixed to her face makes it obvious she's ecstatic about it.");
				break;
			case 8:
			case 9: MainScreen.text("Urta's pregnancy has caused her to outgrow the stall; she's moved herself to an entirely new position in a quiet, out of the way part of the bar.  Looking at the sheer size of her, she's doubtlessly going to pop any day now.");
			default:
		}
	}

	//In Urta Menu
	internal function urtaPreggoApproached(): void {
		MainScreen.clearText();
		menu();
		switch (pregnancy.event) {
			case 1: MainScreen.text("As you approach and take your usual seat, Urta chugs down a glass of something orange-colored and fizzy, which definitely doesn't smell like her usual taste in drinks.  She sees you looking at it and smiles, shrugging casually.  \"<i>Well, I can't drink alcohol while pregnant, can I, [name]?</i>\"  She then steals a kiss from you; she tastes sweet and a little tart - must be some sort of fruit-juice...");
				//Horny:
				if (Flags.list[FlagEnum.URTA_TIME_SINCE_LAST_CAME] == 0) {
					MainScreen.text("  Her cock audibly clonks against the table's underside, but she just grins at the sound, fully confident in who she is now.  \"<i>Wanna come back to my place, lover" + player.mf("-boy", "") + "?  They say sex is good for the baby - and really good for the mommy...</i>\"  She croons, teasingly rubbing your [legs] with her foot.");
					urtaSexMenu();
				}
				else {
					MainScreen.text("  The lack of cock-on-wood sounds or motion on Urta's part makes it clear she's not feeling amorous right this moment.  Breaking the kiss, she licks her glossy lips clean and looks at you with a good-natured smirk.  \"<i>Feeling up to talking for a little while?</i>\"");
					//Display Urta Sexings or Urta Talking as appropriate
					MainScreen.addButton(0, "Talk", urta.urtaDialogueMenu);
				}
				MainScreen.addButton(9, "Leave", telAdre.barTelAdre);
				break;
			case 2:
			case 3: if (rand(2) == 0) MainScreen.text("Urta's sitting side-saddled in her usual seat, dress bulging in a way that makes it clear she's at least half-erect already, a small paunch of a belly stretching out her dress.  She gives you a somewhat embarrassed smile when she sees you looking at it.  \"<i>I just feel horny all the time now,</i>\" she professes.  \"<i>I think it might be something to do with the hormones, though if you'd rather talk instead, I'd be happy to do that.</i>\"");
			//(ALT)
			else MainScreen.text("Urta's sitting side-saddle in her usual seat, belly subtly swollen and dress clearly tenting, more than a little moist at the tip of where her cock is obviously poking.  She gives you a dazzlingly eager smile when she sees notice it.  \"<i>Hey, lover.  Did you come to give this knocked-up, horny vixen some sugar?</i>\"  She pouts.  \"<i>Or just talk?  I think you know which I'd prefer...</i>\"  Her finger dances in little circles around the tent, causing it to widen with her growing flare.");
				//Display both Urta Sex Options and Urta Talk Options
				MainScreen.addButton(0, "Sex", urtaSexMenu);
				MainScreen.addButton(1, "Talk", urta.urtaDialogueMenu);
				MainScreen.addButton(9, "Leave", telAdre.barTelAdre);
				break;
			case 4: MainScreen.text("Urta's moved from her usual table to a private booth, luxuriating in the high-backed chairs and the cushions padding seat and back alike.  The reason for this is obvious; she's quite obviously pregnant now, with her belly visibly rounded and swollen, bulging out into her lap but not truly big enough to interfere with her movements yet.  She rubs her belly and gives you a proudly self-satisfied smirk.  \"<i>We did it, [name]; we're going to have a baby.  After all these years... it's so wonderful.</i>\"  She visibly pats the bump stretching her dress; she's big, but not so big as to need a change of clothes yet. ");
				if (Flags.list[FlagEnum.URTA_TIME_SINCE_LAST_CAME] == 0) MainScreen.text("\n\nHer dress stretches even more as her cock swells out of its sheath, precum already darkening the fabric.  \"<i>Wanna fuck, lover?  Because I sure do...</i>\" She licks her lips at the prospect.");
				//Not Horny:
				else MainScreen.text("\n\n\"<i>You're in luck; I'm not currently in the mood to throw you onto the table and fuck you 'til you can't walk... but give me a minute, and I could probably fix that.</i>\"  Urta says.  She smiles, as if trying to prove it's a joke, but there's a gleam in her eyes that suggests she really could do that if you let her...");
				//Pregnant Sex options should probably start displaying either here or in the next stage.
				MainScreen.addButton(0, "Sex", preggoUrtaSmexOrSomething);
				MainScreen.addButton(1, "Talk", urta.urtaDialogueMenu);
				MainScreen.addButton(9, "Leave", telAdre.barTelAdre);
				break;
			case 5:
				MainScreen.text("Urta's still in the private booth she's moved to, and for a good, reason, too - her pregnancy is so obvious you'd have to be blind to miss it, adding what easily has to be around ten inches to her waistline - and straight out, at that.  The black dress she wears is stretching to its limit around her distended belly, pulled tight across the spherical bulge.  She is tucking away eagerly into a glass of fizzy, sweet-smelling orange drink, a picked-clean plate resting before her.  She spots you and nods even as she continues to drink.");
				if (Flags.list[FlagEnum.URTA_TIME_SINCE_LAST_CAME] == 0) MainScreen.text("\n\nYour [foot] steps in something wet, and you realize Urta's dick is hanging out under the table and oozing precum all over the floor, her nipples blatantly displayed through her dress - you're half-surprised it hasn't split over them, yet.  Urta wordlessly puts the glass down and gives you a hooded stare, lust glazing in her eyes.  \"<i>Hey there, sexy... want to slip out the back with me?</i>\"  She purrs.");
				//Else: 
				else MainScreen.text("She places the glass down and licks her lips.  \"<i>Mmm... that stuff tastes a lot better than you think, especially when you're pregnant.  So, sexy, what brings you here?  Wanted to check up on us?</i>\"  She pats her belly with a smile.  \"<i>Or did you maybe want to talk?  ...Or perhaps <b>talk</b> a little?</i>\"  She grins wickedly.");
				MainScreen.addButton(0, "Sex", preggoUrtaSmexOrSomething);
				MainScreen.addButton(1, "Talk", urta.urtaDialogueMenu);
				MainScreen.addButton(9, "Leave", telAdre.barTelAdre);
				break;
			case 6:
				MainScreen.text("The pregnant fox's normal skimpy black dress has given up the ghost; her belly's just too big for her to squeeze into it without tearing it apart.  Instead, she's adopted a much more casual look; a knee-length pleated skirt and a midriff-baring t-shirt that has wispy strands of fishnet trailing under it and resting on the gray-furred expanse of her belly.  The shirt itself looks a little on the damp side where her nipples are; the milk must be coming in.  She rubs her stomach and smiles triumphantly at you.  \"<i>Look at me, lover; I'm really starting to get big now.  This just feels so wonderful; you don't know how long I've been dreaming about this happening to me.</i>\"");
				if (Flags.list[FlagEnum.URTA_TIME_SINCE_LAST_CAME] == 0) MainScreen.text("\n\nYou can hear the precum dripping into a slowly-growing puddle under the table, and she gives you her most wicked grin.  \"<i>Turns out my belly's not the only thing growing... care to help the mother of your child with her needs, [name]?</i>\"");
				//Not Horny: 
				else MainScreen.text("\n\nShe's got a few glasses of milk next to her, but when she sees you, her expression turns a trifle embarrassed.  \"<i>Hey, [name].  You just missed me tending to my hormones,</i>\" she admits, more than a little sheepishly while pointing at the half-dozen glasses.  Your eyes widen when you realize just what the \"milk\" is.  Urta smirks, a little cockiness showing as she asks, \"<i>So did you want to talk, or see if we can fill up a few more?</i>\"");
				MainScreen.addButton(0, "Sex", preggoUrtaSmexOrSomething);
				MainScreen.addButton(1, "Talk", urta.urtaDialogueMenu);
				MainScreen.addButton(9, "Leave", telAdre.barTelAdre);
				break;
			case 7:
				MainScreen.text("Urta's belly just keeps getting bigger and bigger; not that she seems to care. Indeed, she proudly flaunts her growing belly, and she's forever rubbing and stroking it.  You can see the occasional bulge or ripple as your child kicks in her womb, growing strong and healthy.  Damp spots have grown on her t-shirt from her budding milk supply, though Urta seems oblivious to it as of yet.  Her pleated skirt has risen high enough to fall back onto itself, leaving her groin totally immodest and undoubtedly aroused.");
				MainScreen.text("\n\nMore pre drips from her length, and she notices you with a start, \"<i>Oh, [name]!  I was just thinking of you!  I never knew pregnancy could make me feel so... sexual.  Being so full of life just seems to make my male half want to make even more, if you know what I mean.  Please, tell me you're here for a quickie?</i>\"  She fidgets.  \"<i>I guess we could talk too... if you want.</i>\"");
				MainScreen.addButton(0, "Sex", preggoUrtaSmexOrSomething);
				MainScreen.addButton(1, "Talk", urta.urtaDialogueMenu);
				MainScreen.addButton(9, "Leave", telAdre.barTelAdre);
				break;
			case 8:
				MainScreen.text("Urta's finally outgrown even her booth, her belly now looking like she swallowed a prize-winning watermelon whole.  She's taken to sitting in a shapeless, very well-stuffed couch in an out-of-the-way nook of the bar.  Her hands stroke her gut and her erect dick at more or less the same time, precum dripping noisily into a bucket positioned under her erection.  She sees you coming and her cock bounces eagerly, belching another spurt of precum into the bucket from a surge in arousal.");
				MainScreen.text("\n\n\"<i>Oh, [name]; thank goodness you're here, lover.  I - I <b>need</b> to fuck!  The baby's due any day now, but my hormones are driving me nuts.  Please, tell me you'll help me out, [name]?  I... I've always tried to respect you and your wishes, even when I was drunk off my rocker, but I swear, in this condition, I'm having a really hard time trying to stop myself from bending you over the table and spreading your gorgeous [butt] with my tool.  Right now I just want to fuck you until you're stuffed full of cum and rounder than I am.</i>\"  Urta's desperate expression and the nervous tremors that ripple through her cock suggest she really means what she's saying.");
				MainScreen.text("\n\nYou could take Urta back to her apartment and give her the release she's so desperately craving, or you could take advantage of her current state and tease her a bit.  This would, of course, encourage her to fill you up with her cock like she said she wanted to.  Or you could just leave her to get a hold of herself.");
				//[Sex] [Tease] [Leave]
				menu();
				MainScreen.addButton(0, "Sex", preggoUrtaSmexOrSomething);
				MainScreen.addButton(1, "Tease", urtaRaepsJoo);
				MainScreen.addButton(4, "Leave", leavePreggoUrta);
				//Sex triggers normal pregnant Urta sex options, Tease triggers unique PregUrtaRapefest sexscene, Leave is just Leave
				break;
			case 9:
				goVisitUrtaBirfs(true);
			default:
		}
	}

	//[=Leave=]
	private leavePreggoUrta(): void {
		MainScreen.clearText();
		MainScreen.text("You apologize to Urta, but you just really don't feel in the mood right now, and step away from her and start heading towards the door as quickly as politeness allows; if she really is as horny as she claims to be, you're not eager to give her too much temptation.  You pause at the door and look back; Urta looks a little hurt, but mostly resigned, and is clearly trying to calm herself down with breathing exercises.  Given the way one of the staff is approaching with a fresh bucket for her cock to drip into, you don't think it's working too well.");
		//PC leaves the Wet Bitch as per choosing to Leave ordinary Urta
		doNext(camp.returnToCampUseOneHour);
	}

	//Urta Gives Birth
	//Focus will be on a \"traditional\" birth, where PC is fetched to hospital by a runner to attend to Urta
	///Later on, can potentially write an option for more sex-based \"home birth\" that PCs can opt to do instead
	//☼☼
	//Hospital
	public preggoUrtaGivingBirth(): void {
		MainScreen.clearText();
		pregnancy.knockUpForce(); //Clear Pregnancy
		Flags.list[FlagEnum.URTA_PREGNANT_DELIVERY_SCENE] = 0;
		Flags.list[FlagEnum.NEW_BABY_ANNOUNCED] = 0;
		MainScreen.text("As you start getting ready to settle in for the night, you become aware of a commotion steadily approaching your position.  Readying yourself to fight, you approach the boundaries of your camp.  There, stamping his hoof irritably, is a centaur wearing a studded leather jerkin.  \"<i>[name]!  Are you [name]?</i>\"  He cries upon spotting you.");
		MainScreen.text("\n\nYou reply that you are, and ask who he is and what he wants.  \"<i>I'm a messenger from Tel'adre!  Captain Urta sent me to fetch you - she's in the hospital.</i>\"  He replies urgently.  \"<i>Please, you have to come with me - she's gone into labor; the baby is coming</i>!\"");
		//[Go] [Refuse]
		menu();
		MainScreen.addButton(0, "Go", goVisitUrtaBirfs);
		MainScreen.addButton(1, "Refuse", IAintGotTimeForUrtaBirfs);
	}

	//[=Refuse=]
	private IAintGotTimeForUrtaBirfs(): void {
		MainScreen.clearText();
		MainScreen.text("The centaur looks perplexed at your refusal.  \"<i>I - what?  Really?</i>\"");
		MainScreen.text("\n\nYou nod your head, explaining why you can't go.  The centaur's jaw works, but he says nothing, instead nodding his head and galloping off.  You promptly go and turn in for the night.");
		//set all appropriate birth variables here.
		Flags.list[FlagEnum.URTA_TIMES_BIRTHED]++;
		Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] = rand(3) + 1;
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] == 1) Flags.list[FlagEnum.URTA_KIDS_MALES]++;
		else if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] == 2) Flags.list[FlagEnum.URTA_KIDS_FEMALES]++;
		else Flags.list[FlagEnum.URTA_KIDS_HERMS]++;
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] == 3 || Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] == 1) {
			if (rand(2) == 0) Flags.list[FlagEnum.URTA_LATESTBORN_COCKTYPE] = 2;
			else Flags.list[FlagEnum.URTA_LATESTBORN_COCKTYPE] = 1;
		}
		//If firstborn, set as current.
		if (urtaKids() == 1) {
			Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] = Flags.list[FlagEnum.URTA_LATESTBORN_GENDER];
			Flags.list[FlagEnum.URTA_FIRSTBORN_COCKTYPE] = Flags.list[FlagEnum.URTA_LATESTBORN_COCKTYPE];
		}
		Flags.list[FlagEnum.NEED_URTA_LETTER] = 1;
		doNext(camp.returnToCampUseOneHour);
	}

	//Play new day begins text, plus the following:
	public getUrtaLetter(): void {
		MainScreen.text("\nYou discover a letter has arrived in the night.  Opening it up confirms it's from Urta... and she's not particularly happy with you after you failed to show up for the birth.  You do learn that you and she now have a ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] == 1) MainScreen.text("son");
		else if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] == 2) MainScreen.text("daughter");
		else MainScreen.text("hermaphrodite daughter");
		MainScreen.text(", though.\n");
		Flags.list[FlagEnum.NEED_URTA_LETTER] = 0;
	}


	//[=Go=]
	private goVisitUrtaBirfs(withUrta: boolean = false): void {
		MainScreen.clearText();
		pregnancy.knockUpForce(); //Clear Pregnancy
		Flags.list[FlagEnum.URTA_PREGNANT_DELIVERY_SCENE] = 0;
		Flags.list[FlagEnum.NEW_BABY_ANNOUNCED] = 0;
		if (!withUrta) MainScreen.text("The trip to the clinic where Urta is giving birth to your child is a blur; all that matters is getting there as fast as possible.  The centaur abandons you at the hospital doors, and you make your own way inside, approaching the counter inside.");

		//[1st time:
		if (Flags.list[FlagEnum.URTA_TIMES_BIRTHED] == 0) {
			MainScreen.text("\n\nA perky-looking young female mouse-morph, her nurse's outfit stretched a little tighter over her breasts than is considered professional, a small name tag with \"Splinter\" clipped onto one hem, looks up at you with a welcoming grin.  \"<i>Hello, " + player.mf("mister", "miss") + "; please state the nature of the problem.</i>\"  You explain your reason and her eyes widen with understanding.  \"<i>Ah, I see.  Please, follow me, [name]; I will take you to Urta's room.</i>\"  She promptly gets up out of her seat - allowing you to see a rather unladylike bulge at her crotch, though you have no idea if she's a herm or merely an effeminate male - and starts walking, with you following close behind.");
		}
		//Else:
		else {
			MainScreen.text("\n\nSplinter grins when she sees you.  \"<i>Back again, are we?  Here for Urta?  Wow, you two seem to really like popping them out - who'd of thought that the captain of the Watch wanted to be a baby-maker, huh?  Hmm... you know, I've been feeling a little broody myself...</i>\"  She laughs at your response.  \"<i>Just kidding; come on then, stud; Urta is this way.</i>\"  She sets off on the now-familiar route.");
		}
		MainScreen.text("\n\nAs soon as you enter Urta's room, you spot the vixen lying on her back in a bed, naked save for a gown.  You greet her and ogle her bulging belly.");

		MainScreen.text("\n\nShe sees where you're looking and manages to giggle.  \"<i>Yep, we're going to be holding our little one soon.</i>\"  She winces, belly visibly shaking as her muscles flex in a contraction.  \"<i>Very soon, I hope... though, to be honest, there's not really all that much pain.  It actually feels kinda good.</i>\"");

		MainScreen.text("\n\n\"<i>The doctor will be with you soon,</i>\"  Splinter bows and leaves, closing the door behind her.  You walk towards Urta and gently pat her belly, feeling the baby kicking inside, then smile at her.  As you do, you lean in to kiss her and hold her hand.");

		MainScreen.text("\n\nShe moans softly as she kisses you back, squeezing your hand, flexing it a little harder as her contractions wrack her.  She clearly wasn't kidding around when she said they actually felt kind of good; you can see her gown starting to tent out of the corner of your eye.");

		MainScreen.text("\n\nA soft knocking comes from the door.  Urta breaks her lip lock with you with a slightly embarrassed giggle.  \"<i>Come in, please.</i>\"  She calls out.  The door opens to reveal a turtle-man wearing a white coat.  He adjusts his purple necktie before saying, \"<i>Good Evening.  My name is Doctor Donatello, and I'll be overseeing your delivery today.</i>\"  He smiles.");

		//1st time:
		if (Flags.list[FlagEnum.URTA_TIMES_BIRTHED] == 0) {
			MainScreen.text("\n\nDonatello?  That's a strange name... Noticing your thoughtful look, the doctor quickly puts the pieces together.  \"<i>Weird name, no?  If you prefer you may just call me Dr. Don.</i>\"  He extends a hand and you quickly introduce yourself, accepting the handshake.  He moves away.");

			MainScreen.text("\n\n\"<i>He's a very good doctor, [name],</i>\" Urta interjects as if to reassure you.  \"<i>He handles a lot of Watch-related treatments... he, uh, sort of specialises in this particular predicament,</i>\" she grins sheepishly, patting her belly.");
		}
		//Else:
		else {
			MainScreen.text("\n\n\"<i>Hello again, [name].  I see you two have been busy.</i>\"  He glances knowingly at you and Urta.  All you can do is smile sheepishly and hug Urta.  The vixen looks a little embarrassed, but doesn't bother to hide her pride.");
		}
		MainScreen.text("\n\nDr. Don pulls a chair nearby and sits at the foot of the bed, putting on a pair of glasses and using his stethoscope to listen on Urta's belly.  \"<i>So, how are you doing today, Urta?  Are you feeling the contractions, yet?</i>\"");

		MainScreen.text("\n\n\"<i>Oh, yes.</i>\" Urta agrees.  \"<i>At least one every five to ten minutes or so.</i>\"  She explains.");

		MainScreen.text("\n\n\"<i>Yes, they'll be coming anytime now...</i>\"  He puts his stethoscope away and looks at the both of you, then smiles.  \"<i>Don't mind me, feel free to make out with your wife, it actually helps the process.  Plus it's always a delight seeing such a nice couple as the two of you expecting.</i>\"");

		MainScreen.text("\n\nUrta blushes with embarrassment, then promptly wraps her arms around your neck and pulls you into a kiss.  She happily makes out with you for several moments, then lets out a yelp as a distinctly unusual moisture floods her gown's crotch.  \"<i>Oh... I think my water just broke.</i>\"  She tells you and the doctor.");

		MainScreen.text("\n\nThe turtle doctor quickly gets into position helping Urta hold her legs up; he instructs the both of you on how to proceed and you do your best to support Urta throughout the ordeal.");

		MainScreen.text("\n\nRhythmically, Urta inhales and exhales, pushing when told to push and then pausing to gather her strength, huffing and moaning as her child rapidly slides around inside of her, moving inexorably to freedom via the gash under her balls.");
		MainScreen.text("\n\n\"<i>I can see the head!  Remember: push, breathe, push, breath, keep your pace.</i>\"   Urta moans loudly, though not exactly in a pained manner, holds onto her knees and visibly strains.  Her belly suddenly flattens and an infantile wail splits the air; the birth is complete.");
		let gender: number = rand(3) + 1;
		MainScreen.text("\n\nDr. Don makes quick work of the umbilical cord and wraps the baby in a towel.  \"<i>Congratulations, [name] and Urta!  You two have given birth to a healthy ");
		if (gender == 2) MainScreen.text("girl!");
		else if (gender == 1) MainScreen.text("boy!");
		else MainScreen.text("boy...?  Well... isn't that unusual, looks like you actually gave birth to a healthy herm!");
		MainScreen.text("</i>\"");


		//If Boy or Herm: FoxlingCockCheck
		if (gender == 1 || gender == 3) {
			if (rand(2) == 0) {
				MainScreen.text("\n\n\"<i>Well, now... ");
				if (gender == 3) MainScreen.text("s");
				MainScreen.text("he's a perfectly normal little fox,</i>\" the doctor notes, and you can catch a quick glimpse of a somewhat bigger than normal vulpine sheathe on your ");
				if (gender == 1) MainScreen.text("son");
				else MainScreen.text("daughter");
				MainScreen.text("'s groin from where you are.");
				Flags.list[FlagEnum.URTA_LATESTBORN_COCKTYPE] = 2;
			}
			//[Horse Dick:
			else {
				MainScreen.text("\n\n\"<i>...My, my; looks like ");
				if (gender == 3) MainScreen.text("s");
				MainScreen.text("he takes after ");
				if (gender == 3) MainScreen.text("her");
				else MainScreen.text("his");
				MainScreen.text(" mother,</i>\" the doctor comments.  Snatching a quick glance reveals the leathery sheath of an equine phallus swaying between the newborn's legs.  Although infantile, it already promises that ");
				if (gender == 1) MainScreen.text("he");
				else MainScreen.text("she");
				MainScreen.text(" is going to be quite a big ");
				if (gender == 1) MainScreen.text("boy when he grows up.");
				else MainScreen.text("girl when she grows up.");
				Flags.list[FlagEnum.URTA_LATESTBORN_COCKTYPE] = 1;
			}
		}

		MainScreen.text("\n\nHe hands you the baby, and you watch the small fox crying for a moment, before passing the baby to Urta, who's already busy taking off her gown to let the baby get to her breasts.  She almost snatches the baby from your hands in her eagerness, and puts ");
		if (gender >= 2) MainScreen.text("her");
		else MainScreen.text("him");
		MainScreen.text(" to the breast, watching with joyous awe as the little fox-morph roots for her black nipple and then latches on.  Tears begin to roll down her cheeks at the sight.  \"<i>Our ");
		if (gender >= 2) MainScreen.text("daughter");
		else MainScreen.text("son");
		MainScreen.text("... look, [name], ");
		//[she's]
		if (gender >= 2) MainScreen.text("she's");
		else MainScreen.text("he's");
		MainScreen.text(" really here; our beautiful, beautiful little baby...</i>\" She sobs, ");
		if (urtaKids() == 0) MainScreen.text("overwhelmed by the fact she's a mother at long last");
		else MainScreen.text("still as delighted as ever to have a new addition to your growing brood");
		MainScreen.text(".");

		MainScreen.text("\n\nYou embrace Urta and kiss her, overflowing with happiness at the little foxy angel that's nursing from ");
		//[her] 
		if (gender >= 2) MainScreen.text("her");
		else MainScreen.text("his");
		MainScreen.text(" mother's breast.  \"<i>Looks like my work here is done for now... I'll be back later to give a quick check-up on the baby, but from what I can see you have nothing to worry about.  Excuse me then.</i>\"  The doctor gets up and leaves the room, letting you have some privacy with the fox-herm.");

		//1st time:
		if (Flags.list[FlagEnum.URTA_TIMES_BIRTHED] == 0) {
			MainScreen.text("\n\nYou look at Urta questioningly, wondering what happens now.  Urta strokes her newborn and then shyly looks up at you.  \"<i>Would you mind staying with us?  Just for the night, please?</i>\"");
		}
		//else:
		else {
			MainScreen.text("\n\nYou look at Urta knowingly, already anticipating what comes next.  Urta gives you a coy grin, looking up at you from hooded eyes.  \"<i>Well, I hardly think you need me to tell you where the three of us go from here... if you have the time, that is?</i>\"");
		}
		//set all appropriate birth variables here.
		Flags.list[FlagEnum.URTA_TIMES_BIRTHED]++;
		Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] = gender;
		if (gender == 1) Flags.list[FlagEnum.URTA_KIDS_MALES]++;
		else if (gender == 2) Flags.list[FlagEnum.URTA_KIDS_FEMALES]++;
		else Flags.list[FlagEnum.URTA_KIDS_HERMS]++;
		//If firstborn, set as current.
		if (urtaKids() == 1) {
			Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] = Flags.list[FlagEnum.URTA_LATESTBORN_GENDER];
			Flags.list[FlagEnum.URTA_FIRSTBORN_COCKTYPE] = Flags.list[FlagEnum.URTA_LATESTBORN_COCKTYPE];
		}
		menu();
		MainScreen.addButton(0, "Stay", stayAfterUrtaBirf);
		MainScreen.addButton(1, "Go", goAfterUrtaBirf);
	}

	//[=No=]
	private goAfterUrtaBirf(): void {
		MainScreen.clearText();
		MainScreen.text("You apologize, but there are pressing matters you need to attend to today... but you'll make it up to her somehow, you promise.  Urta looks disappointed, but sighs sadly and nods her head.  \"<i>Of course.  You're still a busy adventurer and all that.  Well, don't worry; I'll make sure this little one gets home and settled in safely.</i>\"");
		model.time.hours++;
		doNext(playerMenu);
	}

	//=Yes=]
	private stayAfterUrtaBirf(): void {
		MainScreen.clearText();

		MainScreen.text("Of course, if that's what she wants, you'd be happy to oblige.  The vixen smiles at you thankfully.  \"<i>You won't regret it, [name]; I have an eventful day planned for us,</i>\" she finishes with a mischievous grin and a giggle of delight.");

		MainScreen.text("\n\nYou look at her knowingly, wondering what exactly would a <i>eventful day</i> entail.");

		MainScreen.text("\n\nUrta laughs happily.  \"<i>Oh, you know; a nice meal together, go shopping for some baby stuff, maybe a nice stroll, a little making out...</i>\"  She waves her hand airily as she trails off.");

		MainScreen.text("\n\nYou blink at her in surprise... you admit that with the suggestive way she said <i>eventful</i> you actually had another thing in mind...");

		MainScreen.text("\n\nAt this, the new mother gives you a wicked grin.  \"<i>Now, I never said sex was out of the question... does that give you second thoughts?</i>\"");
		MainScreen.text("\n\nOf course not!");
		//Next
		menu();
		MainScreen.addButton(0, "Next", wakeUpWithUrtaAfterStaying);
	}

	//(PC spends the day with Urta, so fast forward to PC waking up by Urta's side.)
	private wakeUpWithUrtaAfterStaying(): void {
		MainScreen.clearText();
		model.time.days++;
		model.time.hours = 6;
		statScreenRefresh();
		player.orgasm();
		camp.sleepRecovery(false);
		//PC Wakes with Urta
		MainScreen.text("As the morning sun shines on the blinds, you open your eyes.  Then you remember the events of the last day.  You spent the whole day with Urta, not having sex, just walking together and buying stuff for your newborn ");
		if (Flags.list[FlagEnum.URTA_KIDS_MALES] == 1) MainScreen.text("son");
		else MainScreen.text("daughter");
		MainScreen.text(", then you went home and spent the better part of the evening making out with Urta which, of course, led to hot vixen sex in her bedroom.  After that... you probably fell asleep on her bed, and considering the current state of affairs, she didn't mind it one bit.");

		MainScreen.text("\n\nYou hear a soft snore coming from beside you and turn your head to see Urta has wrapped herself around you as if you were a giant teddybear, cuddling eagerly into your warmth and nuzzling into the crook of your neck.  It's not entirely innocent, however; Urta's hermhood betrays her, as you can feel the unsheathed, half-stiff length of her morning wood resting on your belly.");

		//Low Corruption:
		if (player.stats.cor < 33) {
			MainScreen.text("\n\nYou gently begin prying Urta's arms from you, which accomplishes nothing; the fox-herm seems intent on constricting you with her wandering arms, hugging you tighter and tighter.  Seeing no other option you decide to reach for her shaft...");
		}
		else if (player.stats.cor < 66) MainScreen.text("\n\nShe's clinging to you a bit too tightly, and you decide to do a little mischief and reach for her shaft...");
		//{High Corruption:
		else MainScreen.text("\n\nThe fox-herm glued to you is kinda bothersome, so you smile mischievously and shamelessly reach for her semi-erect shaft...");

		MainScreen.text("\n\nYou hold the shaft ");
		if (player.stats.cor < 50) MainScreen.text("gently,");
		else MainScreen.text("tightly,");
		MainScreen.text(" earning a ");
		if (player.stats.cor < 50) MainScreen.text("whimpering moan");
		else MainScreen.text("gasping shudder");
		MainScreen.text(" from the vixen, then begin stroking her and pushing her to the side.  The fox grumbles and shudders, rolling over to the side.  \"<i>Mmm... [name], while that's nice, I don't really wanna have to do laundry right after getting up,</i>\"  she mumbles in a sleepy voice.");

		MainScreen.text("\n\nYou bid her good morning, but continue stroking her.  Your other hand sneaks its way to her thigh, stroking the furry limb.  She giggles and wags her tail under the sheets, gently brushing it against you. \"<i>Well, [name], since we're both up, could you pass me that bottle on the table beside you?</i>\"  She asks.  ");
		//1st time: 
		if (Flags.list[FlagEnum.URTA_TIMES_BIRTHED] == 1) MainScreen.text("You look at her questioningly; she's breast-feeding, so she shouldn't be drinking alcohol.  \"<i>Oh, don't worry; even I don't drink booze in the morning.  It's a little pick-me-up of my own invention; totally non-alcoholic.  It's mostly fruit juice with a few spices thrown in.</i>\"  Urta laughs.  ");
		MainScreen.text("  Your only reply is to reach behind her balls and gently insert a wandering finger into her pussy.");

		MainScreen.text("\n\nThe vixen squeals softly and wriggles, her netherlips clamping down onto your intruding digit.  \"<i>All right, all right, I'm up, I'm up!</i>\"  She laughs.  \"<i>if you're feeling as frisky as all that; at least let me have my morning drink.</i>\"  She protests, batting your wandering hands away.");

		MainScreen.text("\n\nSmiling mirthfully at her, you finally decide to do as she asks, fetching the nearby bottle (which somehow survived your lovemaking the night before) and passing it to her.  She takes it from you with a smile and opens it, chugging it down with swallow after swallow until it's empty.  She then puts the lid back on and wipes her lips daintily, gently putting it down on the floor beside the bed before giving you a mischievous smile.  \"<i>What?  Were you expecting me to belch and throw it against the wall?  I've got ");
		if (urtaKids() == 1) MainScreen.text("a child");
		else MainScreen.text("children");
		MainScreen.text(" to look after now; I can't be leaving broken glass around, now can I?</i>\"  She puts her hands behind her head and stretches, perhaps not so coincidentally thrusting out her naked breasts.  \"<i>Mmm... now I feel awake.  Come on, lover; you're clearly in the mood, and last night was wonderful... ready for round two, hmm?</i>\"  She croons, wriggling herself over to sit right next to you and leaning onto your shoulder.");

		MainScreen.text("\n\nYou stretch and give her a little peck on the lips, then promptly get off the bed in search for your [armor].  Urta watches you go with a disappointed look, \"<i>[name], you are an awful tease,</i>\" she scolds you.  Then she chuckles softly to herself, \"<i>though I guess the fact I'm such a horndog makes it easy, huh?</i>\"  she suggests, clearly enjoying the chance to ogle you as you find your clothes.");

		//{Exhibitionist:
		if (Flags.list[FlagEnum.PC_FETISH] > 0) MainScreen.text("\n\nYou can't resist making a show for Urta, as you fetch piece after piece of your [armor], then begin dressing yourself in a reverse-strip manner... putting on clothes teasingly is way harder, not to mention less pleasant, than taking them off, but somehow you manage.");
		else MainScreen.text("\n\nYou smile at Urta and begin dressing with your [armor].  You don't try to make a show of it... but it seems Urta doesn't mind.  Judging by her reactions it would appear she's enjoying it all the same.");

		MainScreen.text("\n\nUrta licks her lips, giving you a hungry look, but casually shuffles out of bed, letting her erection bob and wobble before her.  \"<i>I really ought to make you help me with this... but I guess I can be lenient; we've both got work to get to.</i>\"");

		MainScreen.text("\n\nA sudden shrill cry rings through the house, and Urta chuckles.  \"<i>Speaking of work; time to feed our ");
		if (urtaKids() == 1) MainScreen.text("new ");
		else MainScreen.text("newest ");
		MainScreen.text("little monster,</i>\" she notes, already walking off to the nursery, indifferent to any need for clothes.  After all, it's not like the baby will mind that she's not wearing pants while feeding ");
		if (urtaKids() == 1) MainScreen.text("him");
		else MainScreen.text("her");
		MainScreen.text(".");
		if (urtaKids() == 2) MainScreen.text("  The other kid is staying at Edryn's, so there's no risk of you two needing to answer... complicated questions.");
		if (urtaKids() > 2) MainScreen.text("  The other kids are staying at Edryn's, so there's no risk of you two needing to answer... complicated questions.");

		MainScreen.text("\n\nYou decide to follow her and check on the baby yourself.  Urta's standing over the crib by the time you arrive, humming a soft, comforting tune as the little fox kit suckles away at one of her breasts, gently rocking her precious infant in her arms as she does.  Despite the now-receding oversized dick between her legs, she looks the very picture of a doting mother.  She looks up and gives you a blissful smile when she hears you, then looks back down rapturously at her child as it continues to nurse from her.");

		MainScreen.text("\n\nYou walk up to Urta and loop an arm around her, pulling her towards you possessively, chest swelling with pride at this small family you've built in this world.  Urta lets out a quiet growl of contentment and blatantly snuggles up against you, happy to be in your arms even as she holds her child in her own arms.");

		MainScreen.text("\n\nUrta's breasts look awfully swollen... you'd guess she has way more milk than the baby will ever need.  Perhaps you could get a taste for yourself?");
		//[Drink] [Leave]
		menu();
		MainScreen.addButton(0, "Drink", drinkSomeUrtaPostBirthTitMilk);
		MainScreen.addButton(4, "Leave", noNeedForTitMilkTodayUrta);
	}

	//[=Leave=]
	private noNeedForTitMilkTodayUrta(): void {
		MainScreen.clearText();
		MainScreen.text("It's better if you don't.  You kiss Urta on the cheek and let her know you should really be going. \"<i>Sure you don't want to stick around for breakfast, lover?  It's no trouble to set an extra plate at the table,</i>\" Urta asks, even as she continues rocking the baby.  The idea is tempting but... you shake your head.  \"<i>All right, lover; be safe out there, and come back to us when you can.</i>\"  Urta says, cuddling her child a little more enthusiastically as you quietly see yourself out of the house.");
		//(Start day 1 hour later due to having to walk back to camp.)
		doNext(camp.returnToCampUseOneHour);
	}

	//[=Drink=]
	private drinkSomeUrtaPostBirthTitMilk(): void {
		MainScreen.clearText();
		MainScreen.text("You decide to ask if Urta wouldn't mind you getting breakfast before going.  Your hand wanders to caress her unoccupied breast.  She moans appreciatively and then giggles.  \"<i>Naughty [name]... but, I'm okay with that.  Just let me finish up with this little one first; I can't juggle the two of you at the same time.</i>\"");
		MainScreen.text("\n\nA few minutes later, the kit is done and gently burped over Urta's shoulder, the vixen carefully putting the cooing, babbling infant down in ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] == 1) MainScreen.text("his");
		else MainScreen.text("her");
		MainScreen.text(" crib.  \"<i>Now then... I believe someone else wanted a taste...?</i>\"  She croons as she sashays over towards you, swollen breasts arched out and waiting for your touch.  You lift Urta's breasts, testing their weight and yield, then lick your lips and begin licking around her nipple, teasing the little erect nub.  \"<i>Oh, yeah, that feels nice... but please, be gentle, they're sensitive.</i>\"  Urta moans to you.");

		MainScreen.text("\n\nYou take Urta's nipple into your mouth and begin gently suckling, careful to not let your teeth graze the sensitive flesh, it takes only a moment before you're rewarded with a slow, but steady, trickle of vixen milk.  She growls with pleasure, reaching around your neck to cuddle you closer to her body.  You close your eyes and just enjoy the closeness, as well as the nutritious milk.  All too soon the trickle begins waning, and you know Urta must not have much left... yet you don't stop your nursing... even when she actually runs out of milk.  \"<i>Mmm... that feels nice, [name], but we both know you're just teasing me now... and that mightn't be such a good idea, unless you want to try some of my other milk..</i>.\"");

		MainScreen.text("\n\nYou feel the tip of Urta's shaft jabbing you, and notice the tip seems to be gathering some pre.  Perhaps it is time to call it quits.  You let go of Urta's breast with some disappointment, smiling at her.  \"<i>Full now, [name]?</i>\"  She asks you.  When you reply that you are, she grins and then suddenly grabs you in a hug, putting your head over her shoulder.  \"<i>Time to get burped, then!</i>\"  She giggles, one hand rhythmically thumping into the small of your back.  You can't resist and eventually you let out a small burp, then step away, smiling sheepishly.");

		MainScreen.text("\n\nShe laughs and pats your cheek.  \"<i>Take care out there, [name]; we have ");
		if (urtaKids() == 1) MainScreen.text("a child");
		else MainScreen.text("children");
		MainScreen.text(" together... but that's a poor substitute if you don't ever come back.  Please, be careful with yourself, [name],</i>\" she tells you solemnly.  You kiss her goodbye, giving her shaft a teasing grope then step out of the room.");
		//Maybe lower Libido by -1?//
		player.stats.lib += -1;
		player.stats.lust += 10;
		doNext(camp.returnToCampUseOneHour);
	}

	//PC Pregnancy Stages
	//PC takes 3 days to progress from one pregnancy stage to the next
	public urtaPregooUpdates(): boolean {
		if (player.pregnancyIncubation == 504) {
			MainScreen.text("\n<b>You're feeling a bit nauseated.  Your mind floats to Urta and you wonder if maybe this means her seed took...</b>\n");
			return true;
		}
		else if (player.pregnancyIncubation == 432) {
			MainScreen.text("\n<b>You notice your belly has developed into a small bump.  Now you have zero doubts; you're pregnant with Urta's child.  You smile to yourself and decide to pay the vixen a visit.</b>");
			MainScreen.text("\n\nOnce you're past Tel'Adre's gates you ask around and finally spot Urta walking down a street.  She sees you approaching her and smiles, giving you a friendly wave.  \"<i>[name]!  What brings you here?</i>\"  You greet her with a short kiss, not able to contain your smile of happiness. \"<i>You're affectionate today; what's up?  Something good happen?</i>\"  Urta laughs, happy to see someone who is so happy to see her.");

			MainScreen.text("\n\nYou strike a small pose, sticking your belly, letting her connect the dots.  She giggles, points hesitantly at it, then lets out a cheer and hugs you tightly when you confirm that, yes, you are pregnant, and she's the father.  \"<i>Oh, [name], you make me so happy... what did I ever do to deserve you in my life?</i>\"  You hug her back, kissing her affectionately, which provokes a rather inappropriate reaction, considering your currently public location.  \"<i>Eh-heh... maybe we should move somewhere more private?</i>\"  Urta grins sheepishly.  \"<i>And I'll have to start getting myself some more external patrols; I can't just leave the mother of my child alone out there in the wilderness, now can I?</i>\"  She notes.");

			MainScreen.text("\n\nYou can't resist but ask if this means you'll be seeing her more frequently?  \"<i>Yes, it does... now, if you'll excuse me...</i>\"  the vixen replies, ducking into a nearby alley, her skirt blatantly tented by her erection.  You let her go handle her problem and go about your own business.\n");
			return true;
		}
		//3:
		else if (player.pregnancyIncubation == 360) {
			MainScreen.text("\n\"<i>[name]?  [name], are you here?  Oh, please tell me I haven't come out here all the way for nothing...</i>\"");
			MainScreen.text("\n\nYou go to the edge of the camp to greet Urta.  She smiles when she sees you, looking at your expanding belly with pride, and then holds up a woven-cane basket.  \"<i>I thought you might appreciate some fresh supplies - food, drinkables, medicine, that sort of thing - so I brought some along with me on my patrol today.</i>\" She explains.");
			MainScreen.text("\n\nYou thank her for the supplies, and tell her those will help you with your latest cravings.");
			//.. except for one.");
			//MainScreen.text("\n\nUrta looks at you with a puzzled expression.  \"<i>What craving is that?</i>\"  Then she develops a sly look.  \"<i>It wouldn't happen to be something that a certain lucky vixen might be able to provide, hmm?</i>\"  You circle her, examining her with a sly smile.  Urta grins in anticipation, her erection already starting to lift her skirt up.  \"<i>You know... they don't expect me back in Tel'Adre for some time yet; plenty of time for us to help your cravings...</i>\"");
			//MainScreen.text("\n\nDo you let Urta <i>help</i> you?");
			//menu();
			//addButton(0,"Yes",getUrtaHelpPreggoPC);
			//addButton(1,"No",noHelpForUrtaPreggoPC);
			//Flags.list[FlagEnum.EVENT_PARSER_ESCAPE] = 1;
			return true;
		}
		//4: 
		else if (player.pregnancyIncubation == 288) {
			MainScreen.text("\nYou sit down near your tent to get some rest.  You're getting pretty heavy... and lugging this little guy around is starting to affect your performance while adventuring.  You decide to sit back and enjoy the cool breeze on this sunny day, when you spot the visage of a familiar vixen in the distance.");

			MainScreen.text("\n\nUrta smiles at you and gives you a friendly wave as she walks up.  \"<i>Hi, lover; how's the baby?</i>\"  She asks, already looking at your swollen stomach.  You take a deep breath and begin telling Urta about the burdens you're facing. The vixen gives you a sympathetic expression as you complain, timidly advancing closer to you as you speak, then gently reaching out with one hand, stopping before she fully touches your belly, looking at you with an obvious nonverbal request for permission.  You simply smile and nod your head.");

			MainScreen.text("\n\nUrta smiles and eagerly starts patting and rubbing your belly, gleefully running her fingers over its taut skin, feeling every inch of the gravid swell.  \"<i>Have you felt it kick, yet?</i>\"  She asks, ");
			if (pregnancy.type != PregnancyType.PLAYER) MainScreen.text("sounding somewhat jealous that it's you carrying and not her.");
			else MainScreen.text("sounding a little smug as she caresses her own gravid tummy.");
			MainScreen.text("  You shake your head, but considering how far you are into the pregnancy, it shouldn't take long... if Urta keeps visiting, you're pretty sure it'll be kicking the next time she comes around.");

			MainScreen.text("\n\n\"<i>Well, then I'll have to keep coming to see you,</i>\" Urta laughs, rubbing your belly.  \"<i>Now, it can't be easy carrying this big heavy belly around, so why don't you lie down and I'll give you a nice backrub, hmm?</i>\"");
			//She shifts her arms to drape themselves flirtatiously around your neck, leaning in with a mischievous smile on her lips.  \"<i>Or I could take your mind off your belly altogether...</i>\"  She croons, then pecks you teasingly on the lips.");
			//[Sex][Massage]
			menu();
			//addButton(0,"Sex",getUrtaSexWhenPreggoz);
			MainScreen.addButton(0, "Massage", getAnUrtaMassageWhenPreggo);
			Flags.list[FlagEnum.EVENT_PARSER_ESCAPE] = 1;
			return true;
		}
		//5
		else if (player.pregnancyIncubation == 216) {
			MainScreen.text("\nYou fetch a waterskin to quench your thirst, then sit down on the outskirts of the camp to get some rest.  \"<i>Hey there, beautiful.</i>\"  A familiar voice echoes from behind you as Urta emerges from the wilderness.  She walks right up to you and reaches around to pat your distended belly.  \"<i>And how's the baby treating you, sexy?  You carry that bump well, you know?</i>\"");
			MainScreen.text("\n\nYou smile at her compliment and tell her that the baby's finally kicking now, asking her if she wants to feel it...");
			MainScreen.text("\n\nUrta squeals in glee and immediately glomps onto your bloated belly, rubbing her hands and her cheek excitedly across its " + player.skinFurScales() + " surface in hopes of feeling her child moving around inside you.  You groan at Urta's tight hug, she throws you slightly off-balance, but you manage to remain steady.  From inside you, you feel the baby shifting in your increasingly tight womb, and Urta looks up at you in shock, glee dancing in her eyes.  \"<i>I felt it!  It's moving in there!");
			if (urtaKids() == 0) MainScreen.text(" Oh, [name], we really are going to be parents...");
			MainScreen.text("</i>\" She babbles happily, tail wagging so enthusiastically you wonder if it's going to fall off.");

			MainScreen.text("\n\nYou pat her head and smile at her. She looks cute when she's all excited like that.  Urta flattens her ears, shuts her eyes and leans into the stroking of your hand, reminding you of the dogs back in the village.  \"<i>Mmm... it feels so good to be here, holding the two of you like this... there's nothing that makes me happier...</i>\" She mumbles.");

			MainScreen.text("\n\nConsidering her increasingly tightening hug, you jokingly tell her that if she keeps loving you like that, there won't be much of you for her to love later.  Urta lets out an \"eep!\" of shock and quickly lets go, doing so with such promptness she ends up falling on her butt.  She rubs it and laughs quietly at her own clumsiness.  \"<i>Sorry, [name]; you're just so huggable the way you are, you know?</i>\"");

			MainScreen.text("\n\nYou gently rub your protruding belly, then offer her a helping hand.  She accepts it, and then gives you a last gentle cuddle.  \"<i>All right, I better get back to scouting; don't do anything I wouldn't do, okay, lover?  Or anyone I wouldn't do, either.</i>\"  She laughs.  You give her a quick farewell kiss then send the happy vixen on her way.\n");
			return true;
		}
		//6:
		else if (player.pregnancyIncubation == 144) {
			MainScreen.text("\nYou sigh.  You hope this baby will be born soon, your back is starting to ache after carrying the little guy everywhere.  \"<i>Hello, lover... oh, why the long face?</i>\"  Urta asks.  You're not surprised that she's here, now.  You explain to her about how tired you've been feeling lately, since you got this big.  Urta pats your shoulder, looking sympathetic.  \"<i>Really, you should take a break, lover.  I'm on an extended patrol right now, so you and I could stay here and rest together for the day - I'll handle the foraging and defending and stuff for you.</i>\"  She offers.");
			menu();
			MainScreen.addButton(0, "Accept", acceptUrtaLevelSixPreggoHelps);
			MainScreen.addButton(1, "Decline", declineUrtaLevelSixPreggoHelps);
			Flags.list[FlagEnum.EVENT_PARSER_ESCAPE] = 1;
			return true;
		}
		else if (player.pregnancyIncubation == 72) {
			MainScreen.text("\nYou lay down on your tent to take a short nap, but when you're nearly dozing off, you spot a shadow on the outside of your tent.  Recognizing its vulpine form, you greet Urta as she approaches.");
			MainScreen.text("\n\n\"<i>Are you feeling okay, [name]?</i>\"  Urta suddenly blurts out with no preamble.  You nod your head, explaining that you're just tired, and you hope this baby will be out of you soon, you can't stand carrying it around anymore.  \"<i>Well, I don't think you'll have long to worry... I mean, have you taken a look at yourself recently, lover?  I don't mean to be rude, but you're huge!  You're going to pop any day now!</i>\"  She replies, staring anxiously at your midriff.");
			MainScreen.text("\n\nYeah... you're pretty big, you admit.  \"<i>You really should come to Tel'adre, you know, [name].  I don't know any doctors who'll make housecalls all the way out here, not in the state the world is in.</i>\"  Urta tells you, blatant worry in her eyes.");
			MainScreen.text("\n\nYou nod, considering her words.  But ultimately you don't think you need to go there right away. If you start feeling like you're going to go into labor, then you'll go to Tel'Adre.  Urta really doesn't look convinced, but sighs and nods.  \"<i>All right, [name], I know I can't make you change your mind.  Just... please try to be careful, all right?  You're at your most delicate state, you know?</i>\"  She doesn't give you time to answer, instead enveloping you in a gently possessive hug.  You hug her back and promise to be careful.");
			MainScreen.text("\n\n\"<i>Just you make sure you do - I can't lose the two of you, not now!</i>\"  Urta says - are those tears in her eyes?  She gives you one last squeeze, then lets go and runs off into the wilderness, probably more to avoid any potentially embarrassing outbursts than anything else.\n");
			return true;
		}
		return false;
	}

	//[=No=]
	private noHelpForUrtaPreggoPC(): void {
		MainScreen.clearText();
		MainScreen.text("You caress her cheek before saying a flat, \"<i>No</i>\".  Urta actually gives you puppy dogs eyes at that, then lets out a wounded-sounding huff.  \"<i>All right, [name]; I guess I better get back to work, then.  Now you take care of yourself; you've got a little one on board, now.</i>\"  She chastises you.");
		doNext(camp.returnToCampUseOneHour);
	}

	//[=Yes=]
	private getUrtaHelpPreggoPC(): void {
		MainScreen.clearText();
		MainScreen.text("Good, you hope this means she'll be having plenty of time, because you sure could use a fair share of vixen right now.  \"<i>As long as you want me, I'll be here.</i>\"  Urta laughs already starting to fiddle with the straps of her armor.  \"<i>Do you have any preferences for what we do?</i>\"");

		//(Display Urta sex menu.)
		urtaSexMenu();
	}

	//[=Sex=]
	private getUrtaSexWhenPreggoz(): void {
		MainScreen.clearText();
		MainScreen.text("Well... you could use a break from minding your passenger, so how does she plan to help you take your mind off your current predicament?  You ask with a knowing smile.");

		MainScreen.text("\n\n\"<i>Oh, I'm sure that we'll figure something out...</i>\"  Urta croons, skirt already lifting as her shaft erects itself.  \"<i>Now, let's find a nice comfortable spot and get you out of those clothes...</i>\"  She grins, already starting to lead you off to find a place to make love.");

		MainScreen.text("\n\nYou follow her eagerly, thinking on what you should have her do...");
		//(Display sex options)
		urtaSexMenu();
	}

	//[=Massage=]
	private getAnUrtaMassageWhenPreggo(): void {
		MainScreen.clearText();
		MainScreen.text("You tell her that a backrub sounds fine, but you'd rather not lie down.  It could hurt the baby.  \"<i>Right, sorry, what was I thinking?  Well, I think I can be flexible...</i>\"  Urta grins, cracking her fingers. \"<i>Now, let's just find somewhere comfortable to put you first...</i>\"");

		MainScreen.text("\n\nYou suggest that perhaps the bedroll in your tent might suffice... or she could just give you a backrub while you're sitting.  \"<i>Well, let's give you that backrub, then; otherwise we might end up forgetting about the massage,</i>\" Urta laughs, trying to joke at her libido.  \"<i>Right, now, let's see, how does this work...</i>\"  She trails off.  Despite her offer, it's pretty obvious she's not exactly a professional masseuse.  At times she's too rough, and you have to warn her she's hurting your back, while other times she tickles you and you end up laughing.  In the end it's not as relaxing as you would have liked, though she did nail some knots and you do feel at least a bit more relaxed now.");

		MainScreen.text("\n\n\"<i>Sorry, [name], I don't really have a lot of experience with this,</i>\" Urta apologizes, looking depressed at her apparent failure to help you.");

		//cor>50:
		if (player.stats.cor > 50) MainScreen.text("\n\nYou'll let it slide this time, but she really should practice this before trying it on you.");
		else MainScreen.text("\n\nYou tell her not to worry, some of it did feel good... though you'd appreciate if she got some practice next time she suggests giving you a massage.");

		MainScreen.text("\n\n\"<i>Well, if you moved to civilization with me, then maybe I could practice on you,</i>\" the herm vixen grumbles, but it's obviously half-hearted at best.  You jokingly tell her that you're much too young to start having back problems due to being manhandled by her foxy paws.");

		MainScreen.text("\n\n\"<i>I'll remember that when you're swollen up like a melon and begging me to ease your cramps,</i>\" Urta retorts, poking her tongue at you and then laughing at her own silliness.  She hugs you and nuzzles against your neck.  \"<i>Take care, lover; you two are too important to me to vanish into these wastelands.</i>\"  She gently scolds you.  You wave her goodbye.");
		doNext(camp.returnToCampUseOneHour);
	}

	//[=Decline=]
	private declineUrtaLevelSixPreggoHelps(): void {
		MainScreen.clearText();
		MainScreen.text("You thank Urta for the offer, but you'll have to decline.  You still have business to take care of, so you'll just rest for a while longer then be on your way.  Besides, it wouldn't look good for her to be absent for too long, she has a city to take care of.");

		MainScreen.text("\n\nUrta sighs and nods her head.  \"<i>You're right, [name].  Still... I really don't feel comfortable leaving you alone out here, not in your condition.</i>\"  You confidently tell Urta that you can handle yourself.  \"<i>Still...</i>\" Urta says, almost whining in her unease.  Then she shakes her head.  \"<i>All right, I'm sorry, but, really, can you blame me?</i>\"");

		MainScreen.text("\n\nYou shake your head and pat her in the back, assuring her, one more time, that you'll be safe... and so will the baby.  Urta still looks like she has her doubts, but stays silent, kissing you goodbye before vanishing into the wilderness.");
		doNext(camp.returnToCampUseOneHour);
	}

	//[=Accept=]
	private acceptUrtaLevelSixPreggoHelps(): void {
		MainScreen.clearText();
		MainScreen.text("You're feeling really tired right now, and besides, spending a whole day with Urta would be nice, so you gladly accept her offer.");

		MainScreen.text("\n\nUrta smiles and throws her arms around you in a loving embrace.  \"<i>All right, [name], now let's get you back to your tent to lie down; you're getting too big to be up and about at all hours of the day now...</i>\"");
		MainScreen.text("\n\nThere's no need for her to be so worried, you're feeling fine... but you go along with what she's planning anyway.  The day is quite a blissful one for you; you get to spend it doing nothing but lounging around and enjoying yourself while Urta waits on you hand and foot, cooks meals, does the laundry, and otherwise handles everything that needs to be done.  When night comes, she insistently parks her furry butt right in your bedroll alongside you and won't be budged, so you have little choice but to cuddle with her for the night.  The next morning, you wake to a cooked breakfast, with Urta hand-feeding you more than half of it before she kisses you, says her goodbyes, and heads off again.");
		camp.sleepRecovery(false);
		model.time.days++;
		model.time.hours = 6;
		doNext(camp.returnToCampUseOneHour);
	}

	//PC Gives Birth
	public PCGivesBirf(): void {
		MainScreen.text("\n");
		Flags.list[FlagEnum.URTA_PREGNANT_DELIVERY_SCENE] = 0;
		Flags.list[FlagEnum.NEW_BABY_ANNOUNCED] = 0;
		if (player.lowerBody.vaginaSpot.count() == 0) {
			MainScreen.text("You feel a terrible pressure in your groin... then an incredible pain accompanied by the rending of flesh.  You look down and behold a vagina.  ", false);
			player.createVagina();
			player.updateGender();
		}
		MainScreen.text("You double over in pain as you feel a rush of fluids escape your [pussy].  Looks like your water broke.  You recall promising Urta that you'd go to the hospital before actually going into labor, but right now there's nothing you can do.  It hurts and you know you won't make it there in time, so you rush to your tent and lay down on your bedroll, silently praying that Urta will swing by to assist you.");
		//1st Time:
		if (Flags.list[FlagEnum.URTA_TIMES_PC_BIRTHED] == 0) {
			MainScreen.text("\n\n\"<i>[name]?  Oh, I just knew this would happen!</i>\"  Urta cries as she suddenly emerges from the undergrowth, racing over to your side.  Well, it looks like her little stalking habit is going to pay off for the two of you... well, for the three of you, rather: you, her and the baby.");
		}
		else MainScreen.text("\n\n\"<i>You just have the worst sense of timing, don't you, [name]?  I swear, how you keep failing to recognize the signs beats me...</i>\"  Urta notes as she comes running out of the undergrowth, much to your appreciation.");

		MainScreen.text("\n\nYou smile at her as she rushes to your side, groaning as you struggle to even your breathing and remove your [armor].  \"<i>Don't worry, [name], I'm here for the both of you,</i>\" the distracted vixen tells you, even as she does her best to help you undress.");

		MainScreen.text("\n\nThankful for the help, you let yourself lie down on the bedroll, trying to relax a bit.  A small pang of pain shoots from your dilating birth canal, and Urta, noticing this, quickly grabs your hand.  \"<i>Just hold onto me; you're strong, you'll get through this,</i>\" she promises you.");

		MainScreen.text("\n\nYou push harder and harder, always careful to make sure you're breathing correctly, until with a final push and a groan Urta exclaims, \"<i> \"You're crowning, [name]!  That's it, just keep pushing - you're almost done!</i>\"");

		MainScreen.text("\n\nWith a last few moans and a high-pitched cry, it's over; you've given birth.  Finally free from your burden, you slump down on the bedroll, sweating and panting after your ordeal.  \"<i>You're so strong, [name]; you did a good job, such a good job... now, what do we have here...?</i>\"");

		//Gender check for infant
		let gender: number = rand(3) + 1;
		//Boy:
		if (gender == 1) {
			MainScreen.text("\n\nUrta smiles happily at you.  \"<i>Guess what?  It's a perfectly normal, healthy little boy.</i>\"  She says, proudly showing the crying baby to you.  He's got a little ");
			if (rand(2) == 0) {
				MainScreen.text("vulpine");
				Flags.list[FlagEnum.URTA_LATESTBORN_COCKTYPE] = 2;
			}
			else {
				MainScreen.text("equine");
				Flags.list[FlagEnum.URTA_LATESTBORN_COCKTYPE] = 1;
			}
			MainScreen.text(" sheath between his legs that looks like it's going to be bigger than normal when he grows up.");
			Flags.list[FlagEnum.URTA_KIDS_MALES]++;
			Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] = 1;
		}
		//Girl:
		else if (gender == 2) {
			MainScreen.text("\n\nUrta cries out in delight, grinning proudly.  \"<i>Oh, you're so beautiful... [name], it's a girl!  A perfect, wonderful, normal little female.</i>\"  She says, flaunting the newborn before you.");
			Flags.list[FlagEnum.URTA_KIDS_FEMALES]++;
			Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] = 2;
		}
		//Herm:
		else {
			MainScreen.text("\n\nUrta is silent for several nerve-wracking moments, a sad expression on her face.  She chokes back a sob and hugs the baby tightly to her breast.  \"<i>Oh, my little angel... mommy Urta will always love you.  I'm so sorry... [name]?  She takes after her daddy (and her other mommy).</i>\"  She shyly reveals that the baby you've given her is a herm.  She's got a little ");
			if (rand(2) == 0) {
				MainScreen.text("vulpine");
				Flags.list[FlagEnum.URTA_LATESTBORN_COCKTYPE] = 2;
			}
			else {
				MainScreen.text("equine");
				Flags.list[FlagEnum.URTA_LATESTBORN_COCKTYPE] = 1;
			}
			MainScreen.text(" sheath between her legs that looks like it's going to be bigger than normal when she grows up.");
			Flags.list[FlagEnum.URTA_KIDS_HERMS]++;
			Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] = 3;

		}
		MainScreen.text("\n\nYou give a tired smile at 'father' and child, then settle back to regain your strength.  Urta takes your hand in one of hers, holding the baby closely - indeed, she's almost reluctant to let you hold the fruit of your loins until you remind her that you want to cuddle the baby too.  Eventually, though, the infant drifts off to sleep and Urta gives you a nervous look.  \"<i>I'm sorry, [name], but I just can't leave ");
		if (gender >= 2) MainScreen.text("her");
		else MainScreen.text("him");
		MainScreen.text(" out here.  I know you wouldn't let anything bad happen to ");
		if (gender >= 2) MainScreen.text("her");
		else MainScreen.text("him");
		MainScreen.text(", but, well, you can't really take care of ");
		if (gender >= 2) MainScreen.text("her");
		else MainScreen.text("him");
		MainScreen.text(" properly in this wilderness, now can you?</i>\"");

		MainScreen.text("\n\nYou are eventually forced to admit that it would probably be better for the baby if ");
		if (gender >= 2) MainScreen.text("she");
		else MainScreen.text("he");
		MainScreen.text(" was brought up in Tel'adre.  Urta smiles thankfully and gives both of you one particularly eager cuddle.  \"<i>Thank you for understanding, [name].  ");
		//[She]
		if (gender >= 2) MainScreen.text("She");
		else MainScreen.text("He");
		MainScreen.text(" will be brought up safely, I promise.</i>\"  With that, she carefully bundles up the sleeping child and quietly vanishes into the wilderness, leaving you to take yourself off to bed for a proper rest.\n");

		//SET ALL PREGGOGOGOGOGOGO
		Flags.list[FlagEnum.URTA_TIMES_PC_BIRTHED]++;
		//If firstborn, set as current.
		if (urtaKids() == 1) {
			Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] = Flags.list[FlagEnum.URTA_LATESTBORN_GENDER];
			Flags.list[FlagEnum.URTA_FIRSTBORN_COCKTYPE] = Flags.list[FlagEnum.URTA_LATESTBORN_COCKTYPE];
		}
	}

	//Happy at the Wet Bitch
	//Probably happens only one time
	//Requires Urta and Nancy are both present at the Wet Bitch
	//Requires Urta is pregnant
	//Plays automatically on entering the Wet Bitch
	public urtaIsHappyAboutPregnancyAtTheBar(): void {
		MainScreen.clearText();
		Flags.list[FlagEnum.URTA_INCUBATION_CELEBRATION] = 1;
		MainScreen.text("As you enter Urta's favorite bar, you notice immediately that the mood seems to be more festive; a shy and happily embarrassed-looking Urta is surrounded at her table by well-wishers, all clutching mugs in hands.  Nancy spots you from her position behind the bar, where she's busy doling out drinks, and grins widely.  \"<i>Hey, everybody!  Here's the baby-daddy!</i>\"  She calls, and you are promptly surrounded by laughing, cheering, teasing people, who shake your hand, compliment you on your potency, slap your back or shoulder and teasingly invite you to try your studliness on them.  Somehow, amidst the confusion, you find yourself seated next to Urta, who smiles at you and pats your hand.");

		MainScreen.text("\n\n\"<i>Once they found out I was pregnant, Nancy insisted on throwing a little celebration for me.  It's kind of flattering, really... I just wish I could enjoy the free drinks.</i>\"  She says, sighing and licking her lips as the drider begins dishing out yet more drinks to the thirsty crowd of regulars.");

		MainScreen.text("\n\nYou spend a little time celebrating with your vulpine lover, then politely excuse yourself and leave.");
		doNext(camp.returnToCampUseOneHour);
	}

	//Pregnant Cop is still Cop
	//This scene plays automatically upon entering Tel'adre, ala the whole \"see Urta kick the shit out of a corrupt wolf\" scene
	//Fenoxo's choice if this is a once-off or repeat scene
	// Urta should probably be at least stage 5 pregnancy to trigger this
	public urtaIsAPregnantCopScene(): void {
		MainScreen.clearText();
		MainScreen.text("As you enter the main square and start looking around to decide where to go next, a commotion erupts across the square.  \"<i>Stop in the name of the law!</i>\"  Edryn's voice rings out as a young, raggedy-looking dog-morph erupts from the crowd, Edryn in hot pursuit.  Unfortunately for the centauress, the smaller biped is quicker, more nimble, and better suited for making his way through the crowd.");
		if (kGAMECLASS.telAdre.edryn.pregnancy.isPregnant) MainScreen.text("  Edryn's pregnant belly isn't helping her, either.");

		MainScreen.text("\n\nAs you contemplate whether or not to get involved, you realize that the thief's path is taking him right to a certain pregnant fox-morph, who watches him approach with a cool expression.  The moment he gets close enough, she pounces - in a startlingly quick display of bone-crunching violence, she has him face down on the cobblestones and body pinned.  As you meander over, she speaks up.");

		MainScreen.text("\n\n\"<i>Just because I look like I ate a silver-winning pig all by myself does not mean I am some kind of pushover.  I didn't lose track of my skills when I lost sight of my feet.  Now, I suggest for both our sakes you just give up; you don't want to be known as the crook who got whipped by a pregnant woman, now do you?</i>\" she casually proclaims.");

		MainScreen.text("\n\nEdryn promptly trots up and helps Urta get back on her feet, promptly cantering off with a very sheepish (and slightly squished) prisoner in tow.  Urta gives you a playful wink and then wanders off, leaving you right back where you started.");
		doNext(camp.returnToCampUseOneHour);
	}

	//Display Tel'adre menu options//

	//Special Delivery☼☼☼
	//Has a small-ish chance of playing when the PC enters Tel'Adre.
	//Must have Urta's Key.
	//Urta must be pregnant to trigger this scene.
	//Play this scene upon entering Tel'Adre.
	public urtaSpecialDeliveries(): void {
		MainScreen.clearText();

		MainScreen.text("As you enter through the gates, Edryn clops up to you, a small basket swinging from the crook of one arm");
		if (kGAMECLASS.telAdre.edryn.pregnancy.isPregnant) MainScreen.text(" and her pregnant belly jiggling from the motions");
		MainScreen.text(", a faint smile on her face.  \"<i>Hey there, [name]; can you do me a favor, please?  Urta's been getting deliveries to her place, but I got an unexpected call, so I'm too busy to take her groceries to her today - you're her " + player.mf("boyfriend", "girlfriend") + "; can you please take this for me?</i>\"  The centauress asks.");

		MainScreen.text("\n\nReasoning that it shouldn't take you too long, and Urta's likely to appreciate the action, you agree to do so and she hands it over with a rather knowing smile.  She then gallops off, ");
		if (kGAMECLASS.telAdre.edryn.pregnancy.isPregnant) MainScreen.text("as quickly as a pregnant mare can, anyway,");
		MainScreen.text(" leaving you to head on to Urta's house.");

		MainScreen.text("\n\nYou follow the familiar path to Urta's new house.  Along the way you wonder if she'll be there; usually she's out and only Lianna and the kids are in.  Once you arrive, you rap your knuckles on the door and wait.  Lianna opens the door.  \"<i>Hello [name], come in.</i>\"  She steps aside to let you in.");

		MainScreen.text("\n\nOnce inside you present the basket Edryn gave you.  \"<i>Thanks.  Urta is resting in her room, if you want to go see her.  Now if you'll excuse me, I need to put these away.</i>\"  She grabs the basket and heads off into the kitchen.  You decide that it can't hurt to check in on Urta and see how she's doing.");

		MainScreen.text("\n\nYou head upstairs and gently turn the knob of the door to her room.  The ");
		if (pregnancy.event >= 7) MainScreen.text("heavily ");
		MainScreen.text("pregnant vixen is snoring softly, laying on her side under the covers, forming a sizable bump in the soft, fluffy quilt that practically envelops her, almost invisible amidst the big plump cushions that serve to keep her comfortable as she sleeps. ");

		MainScreen.text("\n\nYou silently make your way inside, careful not to disturb the sleeping vixen, but you only make it a few steps in.  Urta's exposed ear suddenly flickers rapidly and she snorts, stirring reluctantly from amidst her cocoon of bedding and yawning loudly as she struggles to haul her gravid form upright.  \"<i>Nice try, lover, but there's no hiding from my ears... or my nose, either,</i>\" she grins at you.  \"<i>So, what brings you here?</i>\"");
		MainScreen.text("\n\nYou explain that you stopped by to make a delivery for Edryn and decided to check up on her.");
		MainScreen.text("\n\n\"<i>You did?  Well, aren't you thoughtful; we're both doing fine, as you can see from the size of me,</i>\" she giggles, patting her belly.  \"<i>I just got back from a patrol, you see; I'm feeling kind of tired, that's all.</i>\"  You approach her and sit beside her, stroking her belly.  She gives an appreciative noise, one hand gently placing itself on yours as she enjoys your strokes.  \"<i>Mmm... I think we both like you doing that,</i>\" she tells you.  You carry on with your rubbing for a while longer, until Urta yawns.  \"<i>Much as I'm happy to see you, lover, I really need my sleep,</i>\" she apologizes, and then snuggles her swollen form back down into her bedding, pulling the sheets up to her chin.");

		MainScreen.text("\n\nYou stroke her arm, and tell her to rest well.  You get up and close the door to Urta's room and head back to Tel'Adre's main street, saying a farewell to Lianna along the way.");
		Flags.list[FlagEnum.URTA_PREGNANT_DELIVERY_SCENE] = 1;
		//(Return to TA menu.)
		menu();
		MainScreen.addButton(0, "Next", telAdre.telAdreMenu);
	}

	//New Talk Topic: Her House
	//PC questions why Urta keeps her old apartment around.
	internal function talkToUrtaAboutHerHouse(): void {
		MainScreen.clearText();
		MainScreen.text("You've been wondering why Urta keeps her old apartment if she has a nicer and bigger house now.  It would be much better for her to put the lease money towards something more productive than keeping that apartment...");
		if (player.stats.cor < 50) MainScreen.text(" despite it having some emotional value to you.");

		MainScreen.text("\n\n\"<i>Do you really want to try to have sex with our little monster running around?</i>\"  Urta chuckles. \"<i>I know we grow faster than humans do, especially in my case, but I'd rather not have to explain the harpies and the beegirls just yet.  Besides, I can't think of a worse mood-killer than to be right in the middle of our stroke when a little voice ");
		if (urtaKids() > 1) MainScreen.text("or two ");
		MainScreen.text("pipes up asking what we're doing.</i>\"  She shakes her head with amused smirk.  \"<i>No, I'd rather keep the old place for our little love nest; we can have our fun there, then come home and be all respectable around the kids.</i>\"");

		MainScreen.text("\n\nYou question her about the expenses of maintaining that place, though.  Won't she have financial problems?");

		MainScreen.text("\n\nShe chuckles, \"<i>No, no, don't worry about that.  I'm the captain of the Watch, after all.  My paycheck is nothing to sneeze at.  Throw in my nest egg and the recent bonus to my pay, and... well, let's just say that money isn't on my list of immediate concerns.</i>\"  She then gives you a mock-offended look, \"<i>What?  Did you think I boozed my way from paycheck to paycheck before I met you?  My old place was a mess because, frankly, I didn't care enough to do anything more - it gave me privacy and a place to sleep, that was all I needed.  I didn't have someone in my life to make me believe my life really mattered back then... not like now.</i>\"  She concludes, giving you a soft smile.  \"<i>So, that answer your questions?</i>\"");

		MainScreen.text("\n\nYou think about it and nod, smiling at her and thanking her for the explanation.");

		MainScreen.text("\n\n\"<i>Now, since we've been talking about my apartment...</i>\"  Urta begins, rubbing one foot against yours, \"<i>how about we duck back there and give the bed a run?  For old time's sake?</i>\"  She smirks, even as her cock hits the table with an audible *THUNK*.");
		menu();
		MainScreen.addButton(0, "Yes", yesUrtaHouseSex);
		MainScreen.addButton(1, "No", noUrtaHouseSex);
	}

	//[=Yes=]
	private yesUrtaHouseSex(): void {
		MainScreen.clearText();
		MainScreen.text("You smile seductively at her and raise a brow.");

		MainScreen.text("\n\nUrta gives you a smile that promises she's going to enjoy this, fishing out the payment for her tab and passing it to you, stealing a kiss as she does.  She then gets up from her seat; unlike her old self, however, she doesn't make a mad dash for the back door. Instead, the newly self-confident herm actively struts her way out, letting her tent bulge before her and wiggling her hips in a feminine manner as she goes, making no secret of the fact she's waiting for you.");

		MainScreen.text("\n\nYou rush to pay the tab and exit out the back door, looking around to meet Urta.  Urta grins playfully from her position, leaning against the very wall where you first discovered her dual-gendered nature and took the first path to becoming lovers.  \"<i>Looks like somebody's as eager as I am,</i>\" she giggles, precum already staining her dress.  She then offers you her arm like a courtly gallant.  \"<i>Shall we go?</i>\"  You take her arm and follow her towards her apartment.");

		MainScreen.text("\n\nThe trip is difficult; Urta seems intent on making out at every turn.");
		if (player.stats.lib > 50) MainScreen.text("  Sometimes you almost give up on waiting to get to her apartment and instead strip and do her right then and there... but it wouldn't bode well for the Watch captain to get a fine for public indecency.");

		MainScreen.text("\n\nFishing out a key from her wallet, Urta unhooks herself from your arm to open the door and then saunters inside, flirtatiously flicking her tail at you as she goes.  You eagerly follow after her.");

		//(Rest of the scene is like default scene.)
		if (!urtaLove()) urta.goBackToUrtasForLuvinzII();
		else {
			MainScreen.text("\n\n");
			urta.urtaHomeLuvLuvinsMenu();
		}
	}
	//[=No=]
	private noUrtaHouseSex(): void {
		MainScreen.clearText();
		MainScreen.text("You smile at her and apologize, you're just not in the mood right now.");

		MainScreen.text("\n\nUrta pouts in disappointment.  \"<i>Fooey.</i>\"  She declares glumly.  \"<i>And here I was getting all worked up... you're such a tease.</i>\"  She heaves a sigh.  \"<i>All right, you go and do whatever... I'll just have to sit here and wait for this to go down.</i>\"");

		MainScreen.text("\n\nYou promise to help her with that some other time.  \"<i>All right, but I'll hold you to that, lover,</i>\"  Urta promises you.  You give the vixen a loving kiss and make your way out of the bar.");
		doNext(camp.returnToCampUseOneHour);
	}

	//New Talk Topic: Lianna
	//Must have visited Urta's House by yourself after getting the key.
	//Must have seen Lianna introduce herself properly to the PC.
	private talkAboutLiana(): void {
		MainScreen.clearText();
		MainScreen.text("You tell Urta that you need to talk with her about something.");
		MainScreen.text("\n\n\"<i>Yes, [name]?</i>\"  The politely puzzled prick-vixen responds.");

		//{Had sex with Lianna:
		if (Flags.list[FlagEnum.LIANNA_HAVESTED_LADIES] > 0 || Flags.list[FlagEnum.LIANNA_HAVESTED_MALES] > 0) {
			MainScreen.text("\n\nYou confess to Urta that you allowed yourself to be tempted into helping Lianna with some private experiments... experiments that required her taking samples of your sexual fluids.");
			MainScreen.text("\n\nUrta waves your concerns away.  \"<i>Don't worry about that, [name].  I had a chat with Lianna before you visited and she asked for permission before approaching for help on her tests.</i>\"  She smiles deviously at you.  \"<i>Unless... you're not going to her for anything other than helping her in said experiments, are you?</i>\"  You tell her that you aren't.  \"<i>Good... because if you cross the line, I might just have to punish you.</i>\"  She taps you on the nose.");
		}
		else {
			MainScreen.text("\n\nYou explain to Urta that the would-be alchemist living under her roof has told you that she wants to take \"samples\" of your sexual fluids for her experiments.");

			MainScreen.text("\n\nUrta smiles at hearing that.  \"<i>Go ahead then, I won't be mad if you help her.</i>\"  You ask why that is the case.  \"<i>I had a chat with her before you two met, and she's taken some interest in you, so I said it was okay if she asked for your help.</i>\"  She's taking the idea quite well, you note.  \"<i>Just remember that you're only <b>helping</b> with her experiments.  So unless you cross the boundaries on that one, I'm okay with it.</i>\"  She looks you over suspiciously.  \"<i>You're not thinking of taking this any further than that are you?</i>\"  Deciding it wouldn't be smart to give any answer other than no, you tell her that you aren't.  \"<i>Good.</i>\"  She nods assertively.");
		}
		MainScreen.text("\n\nYou ask Urta how exactly she found Lianna as a potential babysitter.  Come to think of it, where did she find her?");

		MainScreen.text("\n\n\"<i>I had a few of my subordinates distribute ads and scout for anyone interested.  With you living out of town and me being the Watch Captain and all, I really needed someone to live in-house.  Just in case anything happens.</i>\"  She nods, smiling triumphantly.  \"<i>I got a few contacts from people interested and set up some interviews, Lianna was the best of the bunch.</i>\"  Then she adds.  \"<i>Plus she was cute too.</i>\"  You can't resist noting that it figures that would play a role in this.  ");

		MainScreen.text("\n\nThen you ask if Urta's really so willing to trust her children's safety to Lianna.  Something about her doesn't feel right - those experiments she wants to do give you a sinister vibe...  \"<i>To be honest... sometimes I get the same vibe from her, lover.  But trust me, I checked her background twice over, and aside from a few mishaps, she's never produced anything that could harm another person, plus she was tutored by a renowned alchemist.  And while it may be hard for you to notice, it's clear to me that our child");
		if (urtaKids() > 1) MainScreen.text("ren have");
		else MainScreen.text(" has");
		MainScreen.text(" a special place in her heart.</i>\"");

		MainScreen.text("\n\nWhatever insecurities you may still have, Urta clearly trusts her.  You decide it's best to tell her that you'll try and trust Urta's judgment on this matter; dealing with people like Lianna is more her job than yours, after all.");

		MainScreen.text("\n\n\"<i>Thanks, lover.  I'm sure you'll see that I didn't choose her for the wrong reasons, plus I'll be keeping a close eye on her.</i>\"  She winks at you.  \"<i>Now if you'll excuse me, I think I'll go check up on her, see you later?</i>\"   Urta kisses you goodbye and leaves the bar. You watch her go, order yourself a drink for the road, and set off yourself.");

		//(Back to camp/TA)
		doNext(camp.returnToCampUseOneHour);
	}

	//Pregnant Urta Sex
	private preggoUrtaSmexOrSomething(): void {
		MainScreen.clearText();
		MainScreen.text("You let Urta know that you're for helping her vent some steam, if that's what she wants.");

		MainScreen.text("\n\nUrta grins lecherously, precum ");
		switch (pregnancy.event) {
			case 7: MainScreen.text("dripping wetly onto the floor");
				break;
			case 8:
			case 9: MainScreen.text("slopping into the filling bucket");
				break;
			default: MainScreen.text("staining her dress");
		}
		MainScreen.text(".  \"<i>Really?  Good, because I could use a little release... let's get back to my place, shall we?</i>\"  She starts to pull herself upright, prompting you to step in and lend her a hand.  She smiles and kisses you thankfully, letting you feel the swell of her belly and dick pressed against you as she does.  \"<i>So...lead on, lover</i>,\" she croons.");

		MainScreen.text("\n\nYou lead her through the familiar streets towards her apartment, eagerly waiting for her to open the door and step in.  Urta giggles as she fishes for her key.  \"<i>I think we both left quite a trail...</i>\"  She notes, even as the door swings open.  She then turns to you and hungrily kisses you, precum smearing itself wetly against your belly as she does.  Sloppily she lets you go, a hungry look in her eyes as she turns and saunters through the door, already pulling off her clothes as she goes.");

		MainScreen.text("\n\nYou waste no time, stripping off and throwing your [armor] into a pile on the couch and going after her.  When you open the door you're greeted with the sight of Urta, lazily reclining on a pillow, legs spread to give you a clear view of her throbbing shaft, balls and dripping pussy.  \"<i>So, sexy, what do you want to do with your horny pregnant vixen, hmm?</i>\"  She croons.");
		menu();
		MainScreen.addButton(0, "Massage Her", massagePregnantUrtasBelly);
		MainScreen.addButton(1, "Boob Worship", urtaBoobWorshipScene);
		MainScreen.addButton(2, "Nurse", nurseFromMommaUrtasBooBees);
		MainScreen.addButton(3, "Milk Her", milkPregnantUrta);
		MainScreen.addButton(4, "Cravings", urtaPregCravings);
	}

	//Belly Massage
	private massagePregnantUrtasBelly(): void {
		MainScreen.clearText();
		MainScreen.text("Looking over Urta's swollen form, you ask her if she'd like you to give her a belly rub.  The fox blinks, then smiles at the prospect, nodding her head happily.  You promptly ask if she has any oil that you can use; admittedly, it probably won't work so well on someone with a furry belly, but it can't hurt, right?");

		//1st Time:
		if (Flags.list[FlagEnum.TIMES_MASSAGED_URTA_BELLY] == 0) {
			MainScreen.text("\n\nUrta shakes her head, \"<i>No, [name], sorry... it's not something I normally have much interest in,</i>\" she sadly tells you.  You declare that there must be something you can use for the purpose you have in mind, and, with Urta's approval, start to poke around the house.  You find quite a few different kinds of dildoes and even some hyper-sized fleshlights, but no oil.  Eventually, however, you find a gallon-sized bucket of lube in one closet and promptly carry that over to your pregnant lover.");

			MainScreen.text("\n\nWhen she sees what you have, however, she blushes with embarrassment and snatches it away from you.  \"<i>Nuh-uh, no way!  I may use this on my dick, but there's no way I'm letting you rub me all over with it!</i>\"");
			MainScreen.text("\n\nYou ask her what the problem is.  It's just lube, all it'll do is make her slick for you.  \"<i>I don't care, I'm not letting you put that on me - it's embarrassing!</i>\"  She whines.  Now that you think about it... you decide to ask why Urta has a gallon of lube in her place.  Isn't that a bit excessive?  Plus you're seeing each other, so what does she need all that lube for anyway?");
			MainScreen.text("\n\n\"<i>H-hey, I do have a lot of cock to cover, you know,</i>\"  Urta points out, blushing.  \"<i>Besides... it's... ah... good for when you can't be here, too.</i>\"  You chuckle at Urta's reply, but agree to look for something else.  \"<i>Thank you,</i>\" she replies sheepishly.");
			MainScreen.text("\n\nYou decide to poke around her kitchen next; maybe you can find some cooking oil.  That's hardly a suitable substitute, and Urta's fur would likely get very sticky, but maybe... wait a moment.  You grab a can nearby and examine its label.  It reads <i>Whipped Cream</i>.  Curiosity gets the better of you and you decide to ask Urta about this.");

			MainScreen.text("\n\n\"<i>It's a kind of sugary semi-liquid - made from milk, I think - that's all slick and soft.  It's very sweet, and that can squirts it when you press the lid.  Try some.</i>\"  The gravid fox explains to you.");

			MainScreen.text("\n\nYou turn the lid against your hand and lightly press it.  A strand of puffy white cream squirts out of the can and into your hand.  You test its texture... it's soft and slick.  You lift your hand close to your face and take an experimental lick.  Sweet.  It tastes pretty good actually.  \"<i>It does, doesn't it?  I got some because I've always liked the taste, and I've been having some cravings for sweets recently.</i>\"  Urta replies.  This gives you an idea... you suggest that you could use this can of whipped cream as a substitute for oil.");

			MainScreen.text("\n\n\"<i>R-really?</i>\" She replies, and blushes at the thought.  \"<i>Well... I have heard it has some uses in the bedroom... O-okay, if you wanna try it...</i>\"");

			MainScreen.text("\n\nYou tell her to lie down and get comfortable.  She nods her head and does as you suggest, wiggling around amidst the blankets and then laying back, carefully cradling her swollen belly, erect prick wobbling before her.");
		}
		else {
			MainScreen.text("\n\n\"<i>Oil...?  Well, maybe... but I think I have a fresh supply of whipped cream...</i>\"  The vixen trails off with a mischievous smirk, her intentions blatant.  You promptly fetch the surprisingly multi-purpose sweet from Urta's little kitchen, returning to find her waiting for you to begin.");
		}
		MainScreen.text("\n\n\"<i>Before you start, lover, maybe you should grab me one of my condoms?  Otherwise, I won't be the only one covered in cream by the time this is over,</i>\" she says, trying to joke about it.  She has a point.  You run off to her bedroom to fetch an unused condom and hand it over to her.  Urta takes it and slowly rolls it with practiced expertise down her blunt cock, until the business end is sheathed in protective latex.");

		MainScreen.text("\n\nNow that this has been dealt with, you can finally get started.  You aim the lid at Urta's belly-button, squirting a huge helping of cream on her.  She yips softly, \"<i>That's cold!</i>\" and then giggles, \"<i>And it tickles!</i>\"");
		if (Flags.list[FlagEnum.TIMES_MASSAGED_URTA_BELLY] == 0) MainScreen.text("  She looks at you and her newly cream-adorned belly contemplatively.  \"<i>I never knew my sweet tooth would bring me to this...</i>\"");

		MainScreen.text("\n\nYou squish the big pile of cream with a hand and begin rubbing it over her belly, spreading it around until her belly is covered by a thin, white, slippery layer.  Urta moans softly, arching her shoulders as she enjoys your hands on the sensitive skin covered by her glossy fur.  \"<i>You're good with your hands, lover,</i>\" she flatters you.");

		MainScreen.text("\n\nSmiling mischievously, you reach for the can and squirt some cream over her sensitive black nipples.  The vixen giggles and wriggles in place, \"<i>It feels like clouds tickling over my nipples,</i>\" she laughs.  It's evidently pleasurable in other ways, too; you can see precum beginning to distend the head of her condom out of the corner of your eye.  You begin spreading the cream over her breasts, just like her belly.  \"<i>Hey, now, what are you doing?  This is supposed to be a <b>belly</b> rub, lover,</i>\" Urta playfully scolds you, tail wagging all the same.");

		MainScreen.text("\n\nYou throw her a fake apology and tell her you'll clean it all up.  Then, you proceed to let your ");
		if (player.upperBody.head.face.tongueType == TongueType.SNAKE) MainScreen.text("forked ");
		else if (player.upperBody.head.face.tongueType == TongueType.DEMONIC) MainScreen.text("demonic ");
		else if (player.upperBody.head.face.tongueType == TongueType.DRACONIC) MainScreen.text("draconic ");
		MainScreen.text("tongue hang and begin licking the cream off her breasts");
		if (player.upperBody.head.face.tongueType > TongueType.HUMAN) MainScreen.text(", a task that is made far easier due to your tongue's ability to stretch to a surprising length");
		MainScreen.text(".  You make sure to pay extra attention to her cream covered nubs.");

		MainScreen.text("\n\nUrta wiggles in pleasure at the stimulus, precum slowly bubbling into her condom, \"<i>[name], you're supposed to be rubbing me down, not eating me up!</i>\"  She laughs.  You quickly snatch the bottle in your hands and aim the lid at Urta's lips, covering them with cream.  Urta barely has time to react and by the time she gets over the shock, you're already laughing at her.  She looks like a rabid fox.");

		MainScreen.text("\n\nUrta stares at you flatly, then slowly declares, \"<i>If you don't get back to my belly rub, you're really going to see a rabid fox.</i>\"  She then deliberately licks her lips clean; the obvious enjoyment as she slurps up the sweet froth on her lips, and the bulging hardness of her blunted boner, make it quite clear that she's enjoying your playful side all the same.");

		MainScreen.text("\n\nHaving had your fun, you decide to work a little.  You begin by gently kneading Urta's belly, careful not to be too rough, lest you disturb Urta's plus one.  As much as this may feel like a misuse of the product, the whipped cream really helps you with your task.  It is a bit stickier than you'd like, but it works.  She moans loudly in obvious appreciation, tongue lolling out; she probably enjoys the contact anyway, but with the stretching caused by her distended womb, her sensitivity has increased, heightening her pleasure.  \"<i>Mmm... that feels nice...</i>\"  She looks towards her crotch as best she can.  \"<i>Uh... can you massage her, too?</i>\"  She asks, pointing with her eyes towards her horsecock and the obvious bubble of fluid stretching its latex coating.");

		MainScreen.text("\n\nYou are a bit confused about Urta's choice of words, is she asking you to massage her pussy?  Then again, she's looking at her shaft... or at least you think she is.  What do you do?");
		Flags.list[FlagEnum.TIMES_MASSAGED_URTA_BELLY]++;
		//[RubDick] [RubPussy]
		menu();
		MainScreen.addButton(0, "Rub Dick", rubUrtaDick);
		MainScreen.addButton(1, "Rub Pussy", rubUrtaPussy);

	}

	//[=RubDick=]
	private rubUrtaDick(): void {
		MainScreen.clearText();
		MainScreen.text("You decide that she probably means her shaft.  It's a bit weird that she'd refer to her male half as a \"her\" too, but you shrug it off and extend your hand to grab her shaft, gently teasing the cum-bubble on the tip of her flared crown.  She gives a lewd moan and thrusts her hips upwards, desperate for more stimulation.  \"<i>Oh, yeah, lover... you make that part feel good...</i>\"");

		MainScreen.text("\n\nYou slowly slide your hand along her spongy shaft, bumping your fingers against every raised vein, and stop only when you reach her bunched sheath, teasing it with soft feather-like touches.  She gasps and shudders, precum fountaining into the swelling latex bubble, with it already starting to overflow and droop down past the tip of her cock from the weight of the jizz inside of it.");

		MainScreen.text("\n\n\"<i>Lover... I...</i>\" She gasps, whimpering as her cock visibly throbs; you can feel the blood rushing through it when you place your fingers against it, seeing it quivering in anticipation of ejaculation...  You let go of her shaft and step back to watch the scene unfold.");
		urtaMassageClimax();
	}

	//[=RubPussy=]
	private rubUrtaPussy(): void {
		MainScreen.clearText();
		MainScreen.text("You decide that by \"her,\" she could only mean her pussy.  So you stretch your arm, as if reaching for her shaft, then find your way under her furry balls to her waiting slit, gently touching and massaging her labia, teasing her clit with little pinches, forcing her wetness out of her slavering honeypot.  She lets out a surprised yelp, then laughs, \"<i>Not actually what I wanted... ooh!  But I'm not complaining...</i>\"");

		MainScreen.text("\n\nYou ready two fingers and plunge them inside her depths, wriggling them around in search of her most sensitive and pleasurable spots.  She moans and bucks in her seat, as much as she can with her belly weighing her down like it is, clearly enjoying your ministrations.  Her horsecock twitches and pulses, despite your lack of attention, throbbing in a way that signals climax is imminent no matter what you're going to do... You give her clit a couple more appreciative pinches then step back to watch the scene unfold.");
		urtaMassageClimax();
	}

	//Both choices converge here
	private urtaMassageClimax(): void {
		MainScreen.text("\n\nWith a howl of pleasure, Urta thrusts her hips, her balls clenching tightly against her suddenly sopping-wet cunt as they explode their contents, the vein-like interior of her shaft visibly bulging as cum rockets up her length and explodes into her condom.  The latex visibly lifts from the surface of her cock's fully-widened crown with the force of her shot, a miniature fountain of spunk gurgling and spraying as it hits the impermeable barrier and is deflected, soon drowning the wedge from view with a growing flood of herm-seed.  The bubble-like tip of the condom stretches bigger and bigger, growing rounder and fuller as she gushes shot after shot of seed into it.  Eventually, it looks like an off-white basketball is wobbling around on the tip of her cock.  Urta's orgasm finally subsides, drawing an exhausted yet happy groan from the herm vixen.  Her dick gently falls limp onto the bed, bringing her condom down to rest on the sheets, soaked with her feminine fluids.");

		MainScreen.text("\n\nYou look at the molten puddle of pleasured fox that Urta's become and fetch the can of cream to spray some more on her, but find that nothing is coming out.  \"<i>D-don't worry... I'll have that replaced by the next time you come around.</i>\"  She pats her belly weakly and laughs quietly.  \"<i>I guess it's a really worthwhile investment to have... wonder if it makes good lube, too...</i>\"");

		MainScreen.text("\n\nAs you walk to a nearby trash bin to dispose of the empty can, you ask if she's thinking of replacing that bucket you found.");

		MainScreen.text("\n\n\"<i>...Why do you ask?</i>\"  Urta questions, yawning loudly.  \"<i>I mean... well, if you were here all the time, we'd probably need to double it, given we'd both be using it all the time...</i>\"  She mumbles; obviously, the pregnancy and the sexings are making her sleepy.  \"<i>I gotta try and rub you like that sometime... please get the door on your way out...</i>\"  She murmurs, rolling over onto her side and making herself as comfortable as she can.");

		MainScreen.text("\n\nYou are tempted to say something about the condom still hanging from her prick, full of fox-cum, or of her belly, still covered in a thin layer of cream, but it doesn't seem Urta is in any condition to do or say anything at the moment.");

		//Low Cor:
		if (player.stats.cor < 33) MainScreen.text("  You walk up to her and carefully remove her condom, tying it up with a knot to prevent any of her seed from escaping, then dispose of it.");
		//Medium Cor:
		else if (player.stats.cor < 66) MainScreen.text("Well, whatever, she's probably too sleepy to do anything about it either way.");
		//High Cor:
		else MainScreen.text("You walk up to her with a smirk and remove her condom, then pour down its contents over her belly, chuckling to yourself.  Now that's a great cream topping for your lovely fox-herm.");
		MainScreen.text("  You walk out of her house, taking care to lock the door on your way out.");
		player.stats.lust += 25;
		doNext(camp.returnToCampUseOneHour);
	}

	//Boob Worship
	//Requires preg stage 5 or above.
	//Dicked PCs get an extension to the scene.  Centaurs do NOT get the extension.
	private urtaBoobWorshipScene(): void {
		MainScreen.clearText();
		MainScreen.text("You gaze at Urta's breasts, heavy with their milky load, a few droplets already escaping her black nipples.  \"<i>Oh, you like these, do you?  You like a nice, big pair of foxy-boobs, huh?</i>\"  She jokes, jiggling them for your amusement, before wincing at their sensitivity.");

		MainScreen.text("\n\nYou can't help but note that Urta's breasts are pretty swollen.  Has she been milking herself lately?  Doesn't look like it.");

		//1st Time:
		if (Flags.list[FlagEnum.TIMES_URTA_BOOB_WORSHIPPED] == 0) {
			MainScreen.text("\n\n\"<i>Uh, well...</i>\"  Urta trails off, looking embarrassed.  \"<i>I try but, I'm... not very good, I guess.  They just get so swollen with milk that they become really sensitive and sore.</i>\"");

			MainScreen.text("\n\nYou suggest that perhaps you could help her.");

			MainScreen.text("\n\n\"<i>Are you sure you don't just want a free shot at my tits?</i>\"  Urta says, but she's smiling as she does so.  \"<i>All right, if it's you asking... please, will you help me?</i>\"  She asks.  You smile and nod at her.");
		}
		//Repeat:
		else {
			MainScreen.text("\n\n\"<i>Yeah, I've been trying to keep myself milked more often, but... I guess I just don't have your magic fingers.  Will you be a darling and help me?</i>\"  She asks, a somewhat mischievous grin on her black lips.");

			MainScreen.text("\n\nYou smile and nod.  Sounds like a plan!");
		}
		Flags.list[FlagEnum.TIMES_URTA_BOOB_WORSHIPPED]++;

		MainScreen.text("\n\nYou approach Urta, then take her breasts in your hands.  You roll the furry orbs around and weigh them... they are quite heavy, no wonder she's sore.  She moans in both pain and pleasure, but otherwise keeps silent, trusting you.  You smile at her reaction and gently grip her breasts, slowly massaging your way to her erect, black nipples.  You pinch them, lightly pulling and watching as a small jet of milk shoots out of her sensitive nubs.");

		MainScreen.text("\n\n\"<i>Oh!  Oh, mmm, that feels nice... please, keep doing that; it really feels good,</i>\" Urta says, eyes closed in order to fully concentrate on your fingers and what they are doing to her painfully swollen nipples.  Her cock rises, bobbing insistently on level with her swollen belly, but neither of you are paying attention to that right now.");

		MainScreen.text("\n\nSeeing her reaction, you decide to play some more with her nipples, twisting, pinching and pulling on them.  You smile with delight at each little rope of milk you manage to milk from her burdened breasts.  She moans lewdly, reaching up to catch some of the milk you're skillfully extracting, slicking it over her eagerly wagging fingers.");

		MainScreen.text("\n\nPlaytime is over, you think to yourself.  You grab her breasts, groping and massaging the orbs, pressing them together and rolling them in your palms.  Her nipples are held between your fingers, squirting and leaking milk, slickening both her breasts and your hands with their milky load.  \"<i>Mmm... so good, but, can I lay down now?</i>\"  Urta asks, eyes still closed.  \"<i>I think I'd enjoy this much more if I was lying down.</i>\"  You nod, noting it must be hard for her given the weight of her belly.  The naked fox eagerly settles herself down on her bed, positioning herself at the head of the bed so that it's supporting her still-upright torso and clearing an ample place for you.");

		MainScreen.text("\n\nYou follow after her, never stopping or even slowing down your massage.  \"<i>Oooh... lover, would you be a dear and fetch one of my condoms from the bedside table?  I'm going to bust a nut before this ends, I just know it, and I really would prefer that this place be easier to clean.</i>\"  The gravid herm asks, eyes still closed and groaning softly as she savors your hands and their twin sensations of causing sexual pleasure and physical release from soreness.");

		MainScreen.text("\n\nYou do as she asks, jumping to her bedside table and getting a condom.  You throw her the small package.  Surprisingly, she catches it without opening her eyes, easily fitting it across her mottled shaft, then smiling at you.  \"<i>Thank you, lover; you're so considerate... now, if you don't mind?</i>\"  She smirks and gestures at her breasts.");

		MainScreen.text("\n\nYou jump back at her, attacking her breasts with gusto.  She moans and squeals in surprised pleasure at the sudden ferocity, a hint of pain before she grows used to it.  You lean in and take one of her nipples into your mouth, biting it lightly");
		if (player.upperBody.head.face.faceType == FaceType.SHARK_TEETH || player.upperBody.head.face.faceType == FaceType.SNAKE_FANGS || player.upperBody.head.face.faceType == FaceType.SPIDER_FANGS) MainScreen.text(", always minding your sharp teeth");
		MainScreen.text(".  She yelps loudly, but makes no move to push you off, so she's obviously enjoying it.  You alternate between biting and pulling, never repeating the same motion twice.  \"<i>I- I'm gonna...!</i>\"  She gasps out, bucking and wriggling under you.  You smile wickedly and bite her nipple one last time, pulling and sucking on it.");

		MainScreen.text("\n\nUrta lets out a shriek of equal parts pleasure and pain, arching her back as her cock suddenly explodes, bloating the hastily-applied condom with jet after jet of pregnant herm cum, swelling it into a misshapen, basketball-sized bubble of fluid-filled latex before she finally empties the last of herself into it.  With a long, drawn-out sigh she sinks back down, panting for air.  Finally, she musters the energy to say, \"<i>Nice massage, lover, but whose enjoyment was that for?  Mine or yours?</i>\"  The post-orgasmic glow on her face suggests she doesn't really care that much what your answer is.");

		//Dicked PCs only:
		if (player.lowerBody.cockSpot.hasCock()) {
			MainScreen.text("\n\nYou step away from her breasts, displaying your erect package.  She smirks as she looks at it, then taps her lips thoughtfully.  \"<i>Well, I guess since you were nice enough to get me off...</i>\"  She laughs, then reaches out a hand to take hold of your [cock biggest] shaft.");

			MainScreen.text("\n\nYou place your hand over hers and pull it away, telling her you have other plans in mind.  \"<i>Oh?  Like what?</i>\"  She asks, sounding intrigued.  You point at her big breasts.  \"<i>A tit fuck?  Well, all right, if that's what you want,</i>\" she replies, sounding not bothered in the least by the idea.");

			MainScreen.text("\n\nYou stand close to her, throbbing shaft in hand.  Eagerly you press your [cock biggest] in-between her breasts.  She smiles at you, then gently wraps a hand around either breast, pulling them apart so she can truly fit your cock in the canyon of her cleavage, then wrapping them around so it is surrounded on all sides by warm, soft, jiggly, fluffy boobage.  \"<i>Do you like that, lover?</i>\"");

			MainScreen.text("\n\nYou moan in appreciation, even as you begin humping her breasts.  It's soft and warm, as well as moist from all the milk she spilled during your earlier massaging; it feels wonderful.  Your vulpine lover grins and eagerly humps you with her milky breasts; eventually, dissatisfied with how well she's doing with her tits alone, she leans her head forward and begins to lap, suckle, and gently kiss the tip of your shaft.");

			MainScreen.text("\n\nIf she keeps up with this it won't be long until you blow.  You warn Urta of this, but all she does is redouble her effort as she licks and kisses your [cockHead biggest].  \"<i>I think that after all the times I've asked you to suck me off, this is fair play,</i>\" Urta says, somewhat muffled around the cockhead in her mouth.  \"<i>Besides, I've got a sudden craving for something hot and salty...</i>\"  She promptly engulfs as much of your cock as she can reach in her warm, wet mouth, tongue stroking with the knack only a fox could have to coax you to your inevitable climax.");

			MainScreen.text("\n\nYou gasp and groan in pleasure as every nerve within you is set on fire, pleasure overtaking you like a wave.");

			//Low Cum Amount:
			if (player.cumQ() < 250) {
				MainScreen.text("\n\nYou spurt rope after rope of jism into Urta's eager mouth.  She's all too happy to suck you dry, smacking her lips and licking your [cock].  All too soon, though, you are done, and you collapse on your back, completely sated.");

				MainScreen.text("\n\n\"<i>Mmm, you taste so yummy,</i>\"  Urta says, licking her lips with every sign of unfeigned delight.");
			}
			//{Medium Cum Amount:}
			else if (player.cumQ() < 500) {
				MainScreen.text("\n\nYou loosen a veritable jet of cum into the back of the fox-herm's throat.  Surprisingly she doesn't gag nor cough, she just drinks it down with glee.  From your vantage point, you can see that she's enjoying this almost as much as you; she has a happy expression, eyes closed, as she savors the taste of you until the last drop has hit her tongue.");

				MainScreen.text("\n\nShe licks her lips, making sure that she hasn't missed a drop, then looks you right in the eyes with a loving smile.  \"<i>Ah, you really know how to give a girl what she wants - urp!</i>\"  She slaps a hand over her mouth and looks embarrassed.  \"<i>Beg pardon,</i>\" she pleads.");
			}
			//High Cum Amount:
			else {
				MainScreen.text("\n\nRope after rope of steaming hot jizz shoots its way down Urta's throat, heavily setting itself into her belly.  The fox-herm doesn't seem to mind this in the least, if anything she seems quite happy that you're pumping out all of your stinking sperm down her throat.  She never stops licking either, caressing and sucking on your tip to draw out every single last drop from you, not that she has to try.  By the time you're done, her belly looks even bigger than it was, and you worry if Urta's forgotten that she has to breathe; she's been diligently sucking and licking you down ever since your prodigious orgasm started.");

				MainScreen.text("\n\nShe gasps loudly, then coughs a little.  \"<i>Okay, that might have been biting off more than I can chew,</i>\" she gurgles, belly wobbling with each breath she takes.  She belches hugely.  \"<i>But damn if I don't feel full; you sure got a whole lot of love to share, don't you?</i>\"  She says, trying to make a joke out of it, no matter how weak.");
			}
			MainScreen.text("\n\nYou step away from her and stand on the side of her bed, stretching yourself and feeling fully sated after this wonderful titty-fuck.");
		}
		MainScreen.text("\n\nWith a bit of exertion, Urta manages to get the condom off of her dick without spilling the contents, tying it into its usual balloon shape and gently putting it on her bedside table.  \"<i>I must say, I feel a lot better now...  I definitely want to do that again - as long as I'm pregnant, I'm going to keep making milk, after all.  But, right now...</i>\" she yawns, cutting herself off, \"<i>...right now, I want to take a nap.</i>\"  She concludes.");

		MainScreen.text("\n\nYou kiss her goodbye");
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.text(", tasting a bit of yourself,");
		MainScreen.text(" and tell her you'll be back to check up on her later.  She gives you a sleepy smile and nods absently, already practically asleep.  You quickly find your [armor] and don them, leaving Urta to rest for a spell in her apartment.");
		doNext(camp.returnToCampUseOneHour);
	}

	//Nurse
	private nurseFromMommaUrtasBooBees(): void {
		MainScreen.clearText();
		MainScreen.text("You look at Urta's breasts, full of milk and dripping, and absentmindedly lick your lips. Urta follows your gaze and gives you a knowing smile.  \"<i>You know, no matter how much I milk myself, I always seem to fill up again right away... I wonder if that's part of Taoth's so-called parting gift,</i>\" she muses to herself.");

		//1st Time:
		if (Flags.list[FlagEnum.TIMES_NURSED_FROM_URTA] == 0) {
			MainScreen.text("\n\n\"<i>But, either way, aren't you a little too grown-up to be interested in that, hmm?</i>\"  She teases you.");
			MainScreen.text("\n\nYou just look at her with your best impression of puppy eyes.  She smirks and then heaves an exaggerated sigh.  \"<i>Oh, all right; it's all going to be wasted anyway if I just milk myself - if you really want to try fox-milk so badly, what harm can it do?</i>\"  The wagging of her tail shows she's actually interested all the same.");
			MainScreen.text("\n\nYou grin widely at her, motioning for her to get comfortable.");
		}
		//Repeat:
		else {
			MainScreen.text("\n\n\"<i>Are you thirsty again, lover?</i>\"  Urta croons in a flirtatious tone.  You nod emphatically, eager for another taste of the vixen's milk.");
			MainScreen.text("\n\n\"<i>Well, then, why not come and have a taste?</i>\"  She laughs.");
		}

		MainScreen.text("\n\nUrta gently lays herself down on the bed, shuffling over so that you have ample room to join her, then smiles and carefully lifts up her breasts in clear invitation to you.");

		MainScreen.text("\n\nYou waste no time, settling yourself beside her and grabbing the offered breasts.  You note that a few droplets seem to have escaped and formed a thin stream of white, which you promptly lick off with your ");
		if (player.upperBody.head.face.tongueType == TongueType.SNAKE) MainScreen.text("forked ");
		else if (player.upperBody.head.face.tongueType == TongueType.DEMONIC) MainScreen.text("demonic ");
		else if (player.upperBody.head.face.tongueType == TongueType.DRACONIC) MainScreen.text("draconic ");
		MainScreen.text("tongue.  Urta lets out a sigh of pleasure, yipping softly as your tongue tantalizes her over-sensitive black nipples.  Noticing that she seemed to enjoy the licking you keep doing so, slathering her soft mounds in a thin layer of saliva, alternating between breasts.");
		if (player.upperBody.head.face.tongueType > TongueType.HUMAN) MainScreen.text("  Every few licks you coil your tongue around one of her nipples and gently pull at it, milking a thin strand of white goodness straight on your tongue, much to the fox-herm's delight.");

		MainScreen.text("\n\nUrta shivers and moans, but then looks at you, \"<i>As nice as this may feel, it's not really getting them any emptier, you know,</i>\" she points out.");

		MainScreen.text("\n\nYou take the hint and decide to take one of her nipples into your mouth, suckling on the small nub of flesh lightly and sighing in pleasure as a small stream of milk begins flowing into your mouth.");

		MainScreen.text("\n\nUrta moans in ecstasy, then hugs your head, gently pulling you closer into her breast.  \"<i>My big baby,</i>\" she playfully calls you.");

		MainScreen.text("\n\nYou pay her teasing no mind, instead focusing on working her breast so you can get a bigger flow.  Her milk is warm and tasty, quite creamy and thicker than you're used to, but all that contributes to its exotic taste.  Each gulp fills you with a familiar warmth and the way she hugs your head close to her makes you feel comfy and relaxed.  Her milk has an undeniable sweetness to it, you note; this is far from what you expected, but quite pleasing all the same.  You mentally laugh to yourself, Urta is such a heavy drinker you half expected her milk to taste like booze, but it would seem she really is making an effort to stay away from alcohol, since she's pregnant and all...");

		MainScreen.text("\n\nUrta suddenly pushes your head away, \"<i>Sorry, lover, but I have two breasts; could you help the other one, too?</i>\"  She asks.  You nod and begin suckling on her other breast, massaging the nipple with your tongue and licking around it.");

		MainScreen.text("\n\nYou allow yourself to become lost in the task, and a short while later you feel something poking you.  Urta moans lewdly, but says nothing, instead leaving you to figure out that you are being poked by her erect and dripping mare-dick.  This presents an interesting opportunity, you think to yourself... should you give her shaft a few tugs or just ignore it?");

		Flags.list[FlagEnum.TIMES_NURSED_FROM_URTA]++;
		//[Stroke][Ignore]
		menu();
		MainScreen.addButton(0, "Stroke", titWorshipAndStroke);
		MainScreen.addButton(1, "Ignore", ignoreUrtaBonerWhenWorship);
	}

	//if Stroke:
	private titWorshipAndStroke(): void {
		MainScreen.clearText();
		MainScreen.text("You smile mischievously around Urta's breast and eagerly grab her shaft with a hand, careful not to hurt her, but roughly enough for her to feel what you just did.  Urta lets out a surprised groan.  \"<i>Lover?  What are you...?</i>\"  She moans again as your fingers shift on her distended dick.");

		MainScreen.text("\n\nYou begin stroking her shaft with all your might, teasing her sheath and pinching her flared tip.  She growls and moans, bucking her hips instinctively into your teasing hands.  \"<i>Y-you're gonna get very messy if... ah!</i>\"  She whimpers and twists at your latest teasing gesture.  Before you can contemplate stopping, she lets out a cry of ecstasy as her cock throbs, trembles and then erupts, gushing vixen-cum all over your [chest].  You smile to yourself, giving her cock a couple more strokes to make sure she's drained.");

		MainScreen.text("\n\n\"<i>Now look at you... but that was still kind of fun.</i>\"  Urta says, swishing her tail gently across the bed.  \"<i>Of course, seeing as how you didn't want a little cum cocktail, maybe you should finish drinking your milk, hmm?</i>\"");

		MainScreen.text("\n\nYou blink at her, then get back to the task at hand, redoubling your efforts at draining her of her milk.");
		finishTitWorshipWivUrta();
	}
	//Else:
	private ignoreUrtaBonerWhenWorship(): void {
		MainScreen.clearText();
		MainScreen.text("You have other things to worry about right now, but you're glad she seems to be enjoying your ministrations.");
		finishTitWorshipWivUrta();
	}

	private finishTitWorshipWivUrta(): void {
		MainScreen.text("\n\nWith one last suckle you unlatch from her breast and lick your lips.  Urta wriggles herself on the bed, then stretches her arms out, smiling up at you.  \"<i>Mmm, yeah, that feels much better; thank you for the help, lover.  Now, I'm feeling peckish; care to join me for a snack?</i>\"");
		MainScreen.text("\n\nYou shake your head, pointing out you've just had a meal of your own.  You pat your belly for effect.");

		MainScreen.text("\n\nUrta smiles and promptly gives your belly a playful poke.  \"<i>So you have... well, all right.  Still, if you ever want to drop by my place for a bite to eat... or a drop to drink... please, don't be a stranger,</i>\" she laughs.  \"<i>Though you may need to wait for the baby to be done if it's milk you're wanting,</i>\" she playfully chastises you.");

		MainScreen.text("\n\nYou'll keep that in mind.  Having said that, you kiss her goodbye and find your [armor], then excuse yourself.");
		player.stats.lust += 20;
		fatigue(40);
		doNext(camp.returnToCampUseOneHour);
	}

	//Milk 
	private milkPregnantUrta(): void {
		MainScreen.clearText();
		MainScreen.text("You tell her that you feel like playing with her toys.  Urta smiles and nods.  \"<i>Sure, though I prefer a more... personal touch... myself.  They're in that cupboard over there,</i>\" she finishes, pointing it out.");

		MainScreen.text("\n\nYou go to where she was pointing and search through the cupboard, looking for something fun.  Eventually you find a pair of breast pumps and a similar-looking long tube attached to a machine...  Perhaps it's a cock pump?  You give Urta a snide smirk and ask her what those are for.");

		MainScreen.text("\n\n\"<i>The cock milker was... well, it was basically an attempt to try and experience something like fucking a pussy on a regular basis,</i>\" Urta admits with a bashful look.  \"<i>The milkers were thrown in as a bonus and... well, I found they actually feel pretty nice on the nipples.</i>\"  She then looks at herself, fondling her dripping nipples and dick.  \"<i>I suppose I could probably use a bit of milking with both of them...</i>\"");

		MainScreen.text("\n\nSmiling, you heft both toys out of the cupboard and bring them to Urta.  You sit down beside her and lay the toys down, then rub her belly.  She moans, making the vulpine equivalent of a purring noise, and smiles dopily.  \"<i>That feels so nice, [name],</i>\"  You move your hand lower towards her cock, stroking it gently.  It leaks dollops of pre.  She giggles and twitches, but otherwise says nothing, watching you work with every sign of enjoyment.  Finally you release her cock and reach for her breasts, fondling them, twisting her nipples and watching as a small rope of milk shoots out.  She moans loudly, then looks somewhat sheepish.");

		MainScreen.text("\n\nThis gives you an idea.  You ask Urta how she'd like a little bit of roleplay.  \"<i>Roleplay...?  Can't say I'm a natural actor, but it might be fun,</i>\" she replies, tail slowly wagging.");

		MainScreen.text("\n\nGreat, in that case you'll be the farmer and she can be your sexy cow needing to be milked.  She looks a little uncertain at that, then shrugs nonchalantly.  \"<i>Okay... what do I do?</i>\"  You explain to her that she basically just has to go along with what you say... and act like a cow.");

		MainScreen.text("\n\nThe vixen gives you a very puzzled look, but swishes her tail and lets out a loud, \"<i>Moo!  Like that?</i>\" she asks.  You nod.");

		MainScreen.text("\n\nYou touch her breasts, massaging them slowly.  She moos and swishes her tail, clearly having caught on that she's not supposed to be speaking.  You lean over her and take one of her black nipples into your mouth, sucking lightly.  A loud moan erupts from your throat and she arches her back as she enjoys the feel of your lips.  Once you've tasted a bit of her milk, you smile at her, wipe your mouth and ask her who's a good cow.  Swishing her tail, she points at herself with one finger and moos, a smirk on her lips.");

		MainScreen.text("\n\nDoes this foxy little cow of yours wants to get milked?   She moos loudly and nods her head, playfully nuzzling her head against you.  You begin by attaching her breast pumps, pressing the pump a couple times to draw her nipples in, a small spurt of milk spilling into the glass of the pumps.  Urta voices a moaning moo, tail swishing happily and cock dribbling precum down its long shaft at the stimulus.  Beating yourself up for forgetting such an obvious detail, you ask if Urta has any glass bottles you can use.  \"Moo?\"  She asks, still in character, then points at a cupboard.");

		MainScreen.text("\n\nYou fetch a small bottle and attach it to the breast pump outlet, then pat Urta's head, telling her that now she won't have to worry about her milk spilling.  She flicks her ears and moos, leaning into the patting.");

		MainScreen.text("\n\nYou then take the cock pump and begin the process of attaching it to her throbbing equine-prick.  It's a tight fit... in fact you don't think you'll be able to fit it.  Urta moos plaintively, though there's a certain silly grin that shows she's enjoying the suction, at least.  You ask if she's gotten bigger ever since buying that toy.  An angry moo and a fierce shake of her head are her response, the herm vixen looking quite offended at the idea.");

		MainScreen.text("\n\nWell, you'll just have to make do.  You stroke her shaft a few times, milking more pre-cum and smearing it all over her cock... then onto the toy.  Finally you take the toy and press it over Urta's flared head, pushing it in until it finally pops inside.  She moos, moans, and thrusts madly as you do, finally letting out a blatant sigh of relief as the flared tip squeezes through the lips of the toy into its sucking maw.");

		MainScreen.text("\n\nYou begin pressing the pump to help you ease her whole shaft inside, draining pre out of her and into the tube, then into the small rubber hose attached.  A wicked idea crosses your mind, and you take the hose and push it into her pussy.  \"<i>Moo!</i>\"  Urta starts, giving you a shocked look.  Then her eyes shift into a flirtatious, knowing smoulder and she grins wickedly.  \"<i>Mooo...</i>\"  She says in what is obviously a flirtatious tone, nuzzling against you for emphasis.");

		MainScreen.text("\n\nYou begin pumping the toys, milking her breasts and cock out of their load.  Urta moos and moans, instinctively thrusting her hips as if her cock-pump was a pussy trying to milk her hyper-sized dick, visibly fighting to keep from playing with her breasts and to stay \"in character\".");

		//if PC has a cock:  
		if (player.lowerBody.cockSpot.hasCock()) {
			MainScreen.text("\n\nFeeling horny and left out, you take one of Urta's hands and put it on your [cock biggest], smiling at her.  Almost instinctively it closes around your shaft and begins to rub up and down, the experienced herm almost effortlessly knowing just how much pressure and friction to apply to make you really enjoy her touch.");
		}
		MainScreen.text("\n\nYou stop your ministrations to take out the nearly full bottle of milk from her breast pumps.  ");
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("Urta promptly stops stroking your dick, though whether it's because she wants to be helpful or because she's annoyed you've stopped is anyone's guess.  ");
		MainScreen.text("You pat her head and tell her to be a good girl while you go fetch another bottle.  Once you return, you re-attach the bottle and take the hose out of her pussy, telling her that she's had enough milk in her lower lips... now it's time for her upper lips.  She lets out a baffled moo, but the smirk playing around her lips shows she knows what you're talking about.  You shove the hose into her mouth and tell her to drink up!");

		MainScreen.text("\n\nShe gives you a muffled moo but happily closes her lips around it, already starting to suck in anticipation of her salty liquid treat.");

		MainScreen.text("\n\nYou resume your pumping.  Ecstatic moos and groans promptly result.  \"<i>Mooo!  Oh, [name], I-I'm so close!</i>\" she whimpers around the hose, then moos again.");

		//If PC has a dick and is not a centaur:
		if (player.lowerBody.cockSpot.hasCock() && !player.lowerBody.isTaur() && player.cockThatFits(urta.urtaCapacity())) {
			MainScreen.text("\n\nYou jump on the bed, spreading her legs and aligning your [cock biggest] with her slick labia.  You ask if she knows what's next.  \"<i>MooOoo!</i>\" she replies, nodding her head fiercely even as she continues to thrust.  You hand her the pumps and grab her hips, then sink yourself into her folds with one fell swoop.  \"<i>MOOO!</i>\" she cries, making one final thrust and then exploding into orgasm, cum fountaining from her pump-embraced dick.");
			MainScreen.text("\n\nHer vaginal walls contract and grip your shaft, milking you to your own orgasm.  Jet after jet of cum spills into her.  She moos and moans and pants, eagerly accepting your deposits of cum into her bulging, overstuffed womb, though most of it just spills back out.");
		}
		MainScreen.text("\n\nUrta gurgles as she drinks her own cum, the bottle almost completely filled with milk as Urta's inflamed nipples continue depositing their payload.  \"<i>Moooo...</i>\" Urta moans, making a few last weak thrusts before collapsing bonelessly onto the bed, the last of her jizz being sucked away into the pump.");

		//if PC has a dick and ain't a centaur:
		if (player.lowerBody.cockSpot.hasCock() && !player.lowerBody.isTaur() && player.cockThatFits(urta.urtaCapacity())) {
			MainScreen.text("\n\nYou pump into her a few more times, finishing off; then you  pull yourself out of her, dropping her hips on the mattress and panting.  \"<i>Are you supposed to be the farmer or the bull?</i>\" Urta chuckles softly, patting her swollen belly.");
			player.orgasm();
			player.stats.sens += -1;
		}
		MainScreen.text("\n\n\"<i>I can't say that would have ever been something I'd come up with...</i>\"  Urta notes.  \"<i>But it was actually kind of fun.</i>\"  You smile at her happily.  Maybe next time you should come up with something a bit more hardcore for your roleplay.");

		MainScreen.text("\n\nUrta looks intently at you as you say this.  \"<i>Now, I know that look, and that look means you're up to something... should I be excited, scared or both of whatever you have cooking up in that brain of yours?</i>\"  She asks sarcastically, though her eyes twinkle in a way that suggests she's not really that adverse to it.  Then she yawns loudly.  \"<i>Wow, I feel really tired now... I guess you better head off; I'm going to take a nap while I'm here,</i>\" she murmurs.");
		player.stats.lust += 20;
		menu();
		MainScreen.addButton(0, "Go", goHomeHorsecock);
		MainScreen.addButton(1, "Stay", stayForHorseDickings);

	}

	//[=Go=]
	private goHomeHorsecock(): void {
		MainScreen.clearText();
		MainScreen.text("You nod at Urta and gather your clothes, redressing in an instant.  Before going you ask if Urta needs anything.  She smiles and shakes her head, a soft smile on her face.  You bid her a good rest and leave her apartment.");
		doNext(camp.returnToCampUseOneHour);
	}

	//[=Stay=]
	private stayForHorseDickings(): void {
		MainScreen.clearText();
		MainScreen.text("You yawn yourself, and suggest that maybe Urta would like some company.  You're kinda sleepy yourself.  She smirks and reclines on the bed, \"<i>Help yourself, lover - there's plenty of me to cuddle,</i>\" she giggles softly as she pats her swollen belly.");

		MainScreen.text("\n\nYou hop onto the bed with her, putting the bottle full of her fluids away.  \"<i>I'm not sure what I'm going to do with that, but I'll think of something,</i>\" she notes.  You hug the fox-herm, patting her belly softly, then settle yourself in a comfy position.  She cuddles you against herself, placing one hand gently on her belly and your head against her breasts, then sighs and closes her eyes, allowing herself to drift off to sleep.");

		MainScreen.text("\n\nYou let yourself drift into a restful slumber, warmed by both your lover and your unborn baby...");

		MainScreen.text("\n\n<b>One hour later...</b>");
		MainScreen.text("\nYou yawn and stretch yourself, popping your joints.  Looks like Urta is not in the bed anymore, so you decide to call her.");

		MainScreen.text("\n\nYou wait for a little while but get no response.  That's when you notice the note she must've left you.");

		MainScreen.text("\n\n'Sorry for not being there with you when you woke up - you're so adorable when you're asleep, do you know that?  But I had to go and run some errands, meaning I had to leave you.  I'll see you when next you drift my way, but please lock the place up before you go - help yourself if you want a bite to eat or something to drink before you leave, though.'");

		MainScreen.text("\n\nShrugging, you find your clothes and redress yourself.  Once you're ready, you leave the apartment, remembering to lock the door as per Urta's request.");

		//(Consume 1 extra hour if you go this route.)
		doNext(camp.returnToCampUseTwoHours);
		fatigue(-50);
	}

	//Cravings
	//PC needs a dick to actually do something.
	//Not centaur compatible.
	private urtaPregCravings(): void {
		MainScreen.clearText();
		MainScreen.text("You decide to ask Urta if she has any particular cravings right now.  The pregnant fox visibly thinks about, then surreptitiously eyes your crotch.");
		//noDick:
		if (!player.lowerBody.cockSpot.hasCock()) {
			MainScreen.text("\n\n\"<i>No, I'm fine, really,</i>\" she replies with a shake of her head.");
			MainScreen.text("\n\nPerhaps you should think about doing something else then?  Or maybe you should ask again when you have something else to offer her.  She seemed a bit saddened that you didn't have a dick.");

			menu();
			MainScreen.addButton(0, "Next", preggoUrtaSmexOrSomething);
			return;
		}
		//Dick:
		MainScreen.text("\n\n\"<i>Hmm... well, there is something I want... but I'm not sure what it is.  Something salty, I think...</i>\"  She notes.");

		MainScreen.text("\n\nSalty?  You ask if you can help her understand exactly what it is she wants, smiling knowingly at her.");
		MainScreen.text("\n\nWith a smirk, the pregnant vixen declares, \"<i>Maybe... if you'll lie down on my bed here?</i>\"  She swishes her tail in a mischievous fashion as she speaks.");

		MainScreen.text("\n\nYou hop onto her bed and lie down, like she asked.");

		MainScreen.text("\n\nHumming playfully, Urta straddles you, rubbing her swollen form teasingly across your body as she delicately licks your cheek.  \"<i>Hmm... no, that's not it...</i>\"  She slowly drags herself lower down, then starts to lap at your nipples");
		if (player.lactationQ() >= 200) MainScreen.text(", which automatically causes milk to trickle forth");
		MainScreen.text(".  \"<i>Nope, not it either...");
		if (player.lactationQ() >= 200) MainScreen.text(" sweet, though.");
		MainScreen.text("</i>\"  Down she goes, licking her way slowly over your belly.  \"<i>Getting warmer...</i>\"  Finally, she reaches your crotch... where, naturally, your [cock] is standing erect.  \"<i>Now what have we here...?</i>\"  Urta croons, hovering over the shaft and indulgently sniffing at the aroma.  \"<i>Mmm... that smells good...</i>\"  She bends in and gives your prick a long, wet, sloppy lick, right from your ");
		if (player.lowerBody.balls > 0) MainScreen.text("[balls]");
		else MainScreen.text("base");
		MainScreen.text(" to the tip.  You can't resist moaning as her vulpine tongue laps at your sensitive [cock biggest].");

		MainScreen.text("\n\n\"<i>Mmm... baby-daddy likes that, does " + player.mf("he", "she") + "?</i>\"  Urta giggles, giving you another long lick for emphasis.  You moan and buck against her tongue, trying to work your way inside that foxy muzzle.  She licks and laps, but keeps positioning herself so you can't enter her mouth, no matter how much you try. She looks mischievously at you as she slurps up the precum drooling from your [cockHead biggest], then she rears her head back and looks you in the eye.  \"<i>You taste... yummy!</i>\"  She grins, then opens her mouth and hungrily engulfs your cock, practically inhaling it in her sudden eagerness to swallow, tongue eagerly slurping and slathering your shaft as she gulps it down.");

		MainScreen.text("\n\nYou grasp at the sheets as you feel Urta suddenly engulf your [cock biggest], humping involuntarily in pleasure and bumping her chin");
		if (player.lowerBody.balls > 0) MainScreen.text(" with your [balls]");
		MainScreen.text(".  You smile apologetically down at her and ask her if she's found out what she's been craving yet.  \"<i>What do you think?</i>\"  She mumbles sarcastically, a playful twinkle in her eye, then starts noisily slurping and sucking, tongue frenziedly lapping at your intruding dick and her eyes rolling shut in obvious enjoyment as she gulps down the precum she's eagerly coaxing from you.");

		MainScreen.text("\n\nYou moan and try your best not to just grab onto her head and face-fuck her.  ");
		if (player.lowerBody.cockSpot.count() > 2) MainScreen.text("The rest of your " + CockDescriptor.describeMultiCockShort(player) + " are as erect as your [cock biggest] dribbling pre along their lengths as they slap Urta during her frenzied bobs.  ");
		MainScreen.text("You tell Urta that you're getting close; if she keeps up with this you won't last much longer.");

		MainScreen.text("\n\nIf she hears you, Urta isn't put off - instead, she redoubles her efforts, gurgling and moaning as she deepthroats your cock as best she can");
		if (player.lowerBody.balls > 0 || player.lowerBody.vaginaSpot.hasVagina()) {
			MainScreen.text(", a hand playing expertly with ");
			if (player.lowerBody.balls > 0) {
				MainScreen.text("your balls");
				if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" and another with ");
			}
			if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("your pussy");
		}
		MainScreen.text(".  She suddenly pops free, licking her lips.  \"<i>Come on, lover.  I thought you offered to help me with my craving?  And yet you won't give me any of that salty load of yours?  So hungry... gimme!</i>\"  She pleads, looking up at you with hopeful eyes even as she continues to stroke your shaft.");
		menu();
		MainScreen.addButton(0, "Pop Load", getBlownByPregnantUrta);
		MainScreen.addButton(1, "Hold Out", holdOnYouAintGettingYerCumYetYouNaughtyFox);
	}

	//[=Blow=]
	private getBlownByPregnantUrta(): void {
		MainScreen.clearText();
		MainScreen.text("If she wants it so bad, she can have it, you think to yourself, bucking against her hand as you finally feel ");
		if (player.lowerBody.balls > 0) MainScreen.text("your balls churn and ");
		MainScreen.text("cum travelling down your urethra, expanding your shaft with the force of their passage, and finally jetting out of your [cockHead biggest] to arch gracefully through the air and splatter against Urta's face.");

		MainScreen.text("\n\nUrta blinks in shock, but then closes her eyes, opens her mouth and sticks out her tongue, gladly letting you spray her down and simply hoping you'll at least try to aim for her mouth.  Not that you could even if you wanted to, her grip on your [cock biggest] hasn't slacked in the least.");
		if (player.lowerBody.cockSpot.count() > 1) {
			MainScreen.text("  Even if it did, you wouldn't be able to do anything about your other cock");
			if (player.lowerBody.cockSpot.count() > 2) MainScreen.text("s as they join");
			else MainScreen.text(" as it joins");
			MainScreen.text(" in on the onslaught.");
		}

		MainScreen.text("\n\nUnflinchingly Urta allows you to spray her, occasionally blindly weaving her head around in an effort to catch some of the jetting spunk.");

		//(Low Cum Amount)
		if (player.cumQ() < 250) {
			MainScreen.text("  Soon, all too soon, you're spent.  Urta is left with strands of cum covering her naked body, only a few having made it inside her open maw.  You pant as you slump down, satisfied with the outcome.");
			MainScreen.text("\n\nUrta smacks her lips and looks delicately at her body, shaking her head softly.  \"<i>I think you need to work on your aim, lover,</i>\" she teases you.  \"<i>Still, I'll always be happy to help you practice.</i>\"");
		}
		//(Medium Cum Amount)
		else if (player.cumQ() < 1000) {
			MainScreen.text("  You blow your load into the air, like a perverted fountain, spraying the grey vixen with your white shower of semen.  She gladly takes it all, not flinching and looking quite pleased with the results, which only serves to drive you to push a few extra strands out as you finish painting her upper body white.  Finally done, you slump on the bed, enjoying the afterglow while your vulpine lover licks her lips of the stray strands of cum you've dumped on her willing body, not that it helps much considering the amount.");
			MainScreen.text("\n\n\"<i>Quite an effort, lover.</i>\"  She notes, delicately wiping her eyes free of spunk before smoothing the sticky seed over her belly and opening them to look at you.  \"<i>I would have preferred to get a proper taste, though.</i>\"  She playfully remonstrates you.");
		}
		//(High Cum Amount)
		else {
			MainScreen.text("\n\nYour explosion is akin to a geyser of spunk, erupting and spattering against the fox-herm's body as it arches through the air like a perverted rain of jism.  Urta seems all too pleased with her impromptu semen shower, and you're pleased to give it all to her.  By the time she is completely drenched and the sheets are completely matted with the cum that's missed her open muzzle, you're only half empty, and you continue bombarding her body with spunk.");
			MainScreen.text("\n\n\"<i>Just how much cum do you make?!</i>\"  Urta splutters, even as she continues to snap and gulp at the jism flying through the air, keeping her eyes closed and ears flattened against her steadily-whitening skull.  Your only reply is to groan and keep cumming all over her.");

			MainScreen.text("\n\nBy the time you're done, she looks like she took a dive in a pool of cum.  Her fur is completely matted in your jism, dripping onto the soaked bedsheets as her hair clings to her eyes, completely drenched.  You'd feel bad for the mess if you weren't feeling so good, and you can't help but laugh lightly at Urta's predicament.");
			MainScreen.text("\n\nUrta makes a futile effort at wiping her eyes clean, then looks at you, the green glittering amidst the off-white expanse of your efforts.  \"<i>Well... maybe it was better I didn't swallow all that.</i>\"  She admits, then grins, \"<i>still, I hear this is good for stretch marks and fur conditioning.</i>\"");
		}
		MainScreen.text("\n\nYou're too tired to do much, except close your eyes and let the afterglow set in and slowly take you to dreamland.  The last thing you feel is one slimy fox-herm cuddling up to you, carefully positioning her overstuffed belly against you.");
		player.orgasm();
		player.stats.sens += 2;
		menu();
		MainScreen.addButton(0, "Next", weirdUrtaCravingsConclusion);
	}

	//[=Hold On=]
	private holdOnYouAintGettingYerCumYetYouNaughtyFox(): void {
		MainScreen.clearText();
		MainScreen.text("You're not going to give in so easily.  If she wants it she'd best work hard for it.  You smile at her mischievously, even as you hump against her grip.");
		MainScreen.text("\n\n\"<i>Hmm... you need a little more encouragement, I see...</i>\"  Urta notes, then lowers her head and starts to slowly, teasingly, swallow her way down your shaft, noisily gulping and lapping up inch after inch of it, trying to make sure you blow your load down her throat.");
		MainScreen.text("\n\nThis is too much for you, and with a throaty moan you blow your load deeply inside her throat and straight into her stomach.");
		if (player.lowerBody.cockSpot.count() > 1) {
			MainScreen.text("  Your other cock");
			if (player.lowerBody.cockSpot.count() > 2) MainScreen.text("s bulging ominously as they too prepare to deposit their loads on the willing fox-herm.");
			else MainScreen.text(" bulging ominously as it too prepares to deposit its load on the willing fox-herm.");
		}
		MainScreen.text("  Urta eagerly gulps and slurps, doing her best to swallow every drop.");

		//(Low Cum Amount)
		if (player.cumQ() < 250) {
			MainScreen.text("\n\nYou feed her all you can, ");
			if (player.lowerBody.cockSpot.count() > 1) {
				MainScreen.text("even splashing some cum over her face as your other cock");
				if (player.lowerBody.cockSpot.count() == 2) MainScreen.text(" convulses");
				else MainScreen.text("s convulse");
				MainScreen.text(" in orgasm, ");
			}
			MainScreen.text("but ultimately you reach your limit and can do nothing but slump as she continues sucking on your [cock biggest] like a straw, hungry for your male milk.");

			MainScreen.text("\n\nOnce convinced you're not going to give her any more, she looks a little sad, letting go of your cock with a wet popping sound and smacking her lips.  \"<i>Yummy, just like I thought; that really hit the spot.</i>\"  She tells you.");
		}
		//(Medium Cum Amount)
		else if (player.cumQ() < 1000) {
			MainScreen.text("\n\nYou fill her with your liquid pleasure, stretching her throat with your [cock biggest] as your jism flows through your cumvein and out into her stomach.  ");
			if (player.lowerBody.cockSpot.count() > 1) {
				MainScreen.text("Your other cock");
				if (player.lowerBody.cockSpot.count() == 2) MainScreen.text(" contributes");
				else MainScreen.text("s contribute");
				MainScreen.text(" by making a complete mess of her as ");
				if (player.lowerBody.cockSpot.count() > 2) MainScreen.text("they randomly spatter");
				else MainScreen.text("it randomly spatters");
				MainScreen.text(" her with cum, not that she seems to mind.");
			}
			MainScreen.text("  You lay down and relax, letting the cock-hungry fox-herm suck you dry as you continue pumping your male milk.  By the time she's done her belly looks a little larger, and you know that some of that bloating is not entirely due to the baby.  You smile happily at the vixen hungrily slurping on your [cock biggest] despite there being nothing more for her to drink.");

			MainScreen.text("\n\nUrta lets go of your prick and burps quietly, then giggles with embarrassment.  \"<i>You sure know how to fix me up, lover.</i>\"");
		}
		//(High Cum Amount)
		else {
			MainScreen.text("\n\nYou cum jets into her stomach with such force that you even feel Urta recoil at your sudden eruption of jism.  Yet she bravely clings to your cock, suckling and drinking it down.  Your prodigious load easily fills her mouth far faster than she can hope to drink it down, some of your jism escaping through the sides of her mouth, yet she refuses to give and adopts a new technique.  Instead of sucking, she just keeps her throat open and lets you douse her stomach with your hot spunk.");
			MainScreen.text("\n\nThat's probably what works best, since you've barely scratched the surface of the endless ocean that is your liquid lust.  You sit back and relax, watching enraptured as her belly visibly inflates with your load.");
			if (player.lowerBody.cockSpot.count() > 1) {
				MainScreen.text("  Your other cock");
				if (player.lowerBody.cockSpot.count() > 2) MainScreen.text("s shoot their loads");
				else MainScreen.text(" shoots its load");
				MainScreen.text(" erratically, some of it splattering against Urta's face, but most of it winds up making a complete mess of the room.");
			}

			MainScreen.text("\n\nUrta struggles gamely, trying to breathe through her nose, but the load is clearly overwhelming her.  She grabs the base of your dick");
			if (player.hasKnot(player.biggestCockIndex())) MainScreen.text(", just above your knot,");
			MainScreen.text(" with both hands, trying to pinch it shut long enough to inhale a couple of deep breaths, then goes back to trying to drink every last drop; she must really have a hankering for what you're packing.");

			MainScreen.text("\n\nYou're quite happy to give her all of it, and continue pumping your man-milk into her hungry maw.");
			MainScreen.text("\n\nBy the time you're finally done, Urta can barely bring herself to swallow another drop.  When she finally extracts herself from your [cock biggest] you groan and manage to shoot one last rope of cum, hitting her across one eye.");

			MainScreen.text("\n\nShe shakes her head to flip it off, then drums on her distended belly with her fingers.  \"<i>I don't think I'm going to need any more food today...</i>\"  She gurgles, hiccups once, and then belches like a thunderclap for emphasis, filling the air with the scent of spunk.");
		}
		MainScreen.text("\n\nYou smile innocently at her, breathing a sigh of relief at having ");
		if (player.lowerBody.balls > 0) MainScreen.text("your balls");
		else MainScreen.text("yourself");
		MainScreen.text(" drained of your cum.");

		MainScreen.text("\n\n\"<i>I've heard of funny cravings from some of the ladies on the force, but that's one of the odder ones.  You really taste quite nice, [name].</i>\"   Urta notes, and then yawns loudly, patting her bulging");
		if (player.cumQ() >= 500) MainScreen.text(", audibly gurgling");
		MainScreen.text(" belly, clearly feeling tired even though she wasn't the one being pleasured this time.");

		MainScreen.text("\n\nYou suddenly find yourself growing extremely drowsy after your recent climax, so you roll to give Urta enough room to lay down beside you.  You smile and pat the open spot beside you in hopes that Urta will join you for a quick nap.  Urta wastes no time in settling herself comfortably beside you, closing her eyes and drifting quietly off to sleep.");
		player.orgasm();
		player.stats.sens += -2;
		menu();
		MainScreen.addButton(0, "Next", weirdUrtaCravingsConclusion);
	}

	//Both Options link here.
	private weirdUrtaCravingsConclusion(): void {
		MainScreen.clearText();
		MainScreen.text("You have the distinct feeling that someone is groping you and something is wiggling inside your mouth... actually it feels like someone is lapping you inside your mouth.  You open your eyes to gaze at Urta's green eyes, as she continues kissing you.  She holds your [face] with both hands, closing her eyes as she deepens the kiss, then slowly lets go, opening her eyes and smiling.  \"<i>Morning, lover; sleep well?</i>\"  She laughs.");

		MainScreen.text("\n\nYou nod, then notice that she's ");
		if (player.cumQ() < 1000) MainScreen.text("completely clean.");
		else MainScreen.text("lacking the extra bit of paunch you gave her earlier.");
		MainScreen.text("  You gaze at her questioningly.  \"<i>I woke up before you and went and... shall we say cleaned myself up a little,</i>\" she replies, flicking her ears in the direction of the shower.");

		MainScreen.text("\n\nYou smile at her then draw her into another kiss, planting your lips to hers and invading her mouth with your ");
		if (player.upperBody.head.face.tongueType == TongueType.SNAKE) MainScreen.text("forked ");
		else if (player.upperBody.head.face.tongueType == TongueType.DEMONIC) MainScreen.text("demonic ");
		else if (player.upperBody.head.face.tongueType == TongueType.DRACONIC) MainScreen.text("draconic ");
		MainScreen.text("tongue.  She yips in surprise, then moans as she eagerly sinks into your embrace, kissing you back with equal passion.  She suddenly breaks it, looking apologetic.  \"<i>Sorry, [name], but if we keep that up, I'll be wanting another round, and I have things to do.</i>\"  She pats your face apologetically and shifts herself, somewhat clumsily, out of the bed, gathering her clothes and starting to dress herself.");
		MainScreen.text("\n\nTaking that as your cue, you do likewise, and the two of you go your separate ways after locking the apartment up behind you.");
		player.stats.lib += -.5;
		doNext(camp.returnToCampUseTwoHours);
	}

	//RapeFest
	//The result of teasing her during the 7th stage of her preggo.
	//Not centaur compatible, if someone wants to pursue that, be my guest!
	private urtaRaepsJoo(): void {
		MainScreen.clearText();
		MainScreen.text("You look at Urta and tell her you are just going to get something at the bar.  She swallows hard and nods, licking her lips in anticipation due to your lack of blatant refusal.  You get up and do your best to sway your [butt] in the sexiest way you can manage, glancing back to look at Urta, a smile on your lips.  The pregnant herm is watching you go with blatant hunger, precum dripping audibly from her fat, equine dong into the already-sloshing bucket hovering beneath it.  She twitches with nervous energy, as if seriously considering - and defying - the idea of throwing you down and taking you right here and now.");

		MainScreen.text("\n\nOnce at the bar, you ask the bartender to mix you something good to dull the pain; if things go the way you think they'll go, you'll be needing it.  The bar attendant nods and, with a sympathetic look, gives you a tall mug full of something light blue in color, with a sweet herbal smell.  You take your drink and sit with Urta, slowly sipping it.  \"<i>So... are you going to help me?</i>\"  Urta pleads, looking at you with her eyes as wide and innocent as she can make them, a strong contrast to her blatantly horny demeanor.");

		MainScreen.text("\n\nYou finish your drink then tease her, by saying she'll have to catch you first.  Having said that you promptly get up and bolt towards the privacy of one of the back rooms.  \"<i>What?!  Why, you - you come back here, tease!  Ooof!</i>\"  Urta barks from behind you - she doesn't sound amused.  There's some very loud profanities echoing from your back, and then the noise of a half-full bucket being kicked over, which makes her swear even worse.  Still, she's clearly managed to get to her feet, get past the puddle of slippery spunk, and is now in hot pursuit of you.");

		MainScreen.text("\n\nYou find an empty room and hurl yourself in, locking the bolt in hopes that this will slow Urta down enough that you can at least strip.  Loud bangs echo from the door, visibly shuddering as Urta smashes both fists against it.  \"<i>You little tease!  You're not slipping out and leaving me like this, not after giving me false hope!  Oh, when I catch you...!</i>\"  She stops thumping at the door with her hands and instead shoulder-rams it; evidently, the fox is a lot stronger than she looks, because she knocks it clean off its hinges!  She blockades the doorway, head lowered, mouth hanging open, drooling in frustrated lust and reminding you uncomfortably of a rabid dog, thighs slick with feminine pre-sex lubricants and cock jutting before her like a spear.");

		MainScreen.text("\n\nYou swallow audibly, still trying to remove the top of your [armor].  \"<i>Now it's my turn to play, lover...</i>\" Urta chides, then strips down herself - the skirt comes off effortlessly, having been held on by a loose side fastener, and she easily shucks the shirt up and over her head, standing before you in all her naked, fluffy, pregnant, erect glory.  With a yip of glee she suddenly charges at you, knocking you firmly to the ground and rolling you around so that you are laying on your front, more or less, with your ass up in the air.  You start getting suspicions of what the pregnant herm has in mind when you feel her wide-tipped cock rubbing against your [butt], smearing wet precum in a slimy stain across your bottoms.");

		MainScreen.text("\n\nYou tell her to get a hold of herself, she's never going to get anything done like this.  If she wants to do anything, first of all, she could at least let you strip.  Urta growls as she tightens her grip on your upper arms, pressing her breasts and bulging belly into your back.  \"<i>And let you have another chance to try and run out on me?  No way!</i>\"  She suddenly nips the back of your neck, not hard enough to actually hurt you, but definitely hard enough for you to realize what she just did.  \"<i>'Sides, all I need is to get these underthings of yours off...</i>\"");

		MainScreen.text("\n\nBefore you can protest, she attacks the lower half of your clothes, practically ripping it apart in her desire to expose your hindquarters.  You can feel her tearing off your underwear with her teeth, and definitely hear her growling and shaking it madly in her mouth like a dog with a rat before she spits it away with disdain.  \"<i>Oooh... yeah.</i>\"  She croons, running her nimble, supple fingers over each curving cheek of your [butt].  \"<i>You got such a sexy ass.</i>\"  She informs you, rubbing her belly up over the swell of your ass into the small of your back so she can then position the flared tip of her equine dick against your [asshole].  She rubs and thrusts against you, crudely lubing you up with the copious amounts of herm precum flowing from her she-cock.  Finally deeming you satisfactorily wet, she positions the tip of her dick so that it's pressing insistently against your back passage...");

		MainScreen.text("\n\n\"<i>Are you ready for this, baby-daddy?</i>\"  She moans lewdly in your ears.  Then, with what you're certain is a wicked grin, she answers herself.  \"<i>Doesn't matter, because I sure am!</i>\"  With that, she promptly jams her swollen phallus right in, forcing herself in to the balls in one single fierce thrust!");
		player.buttChange(60, true, true, false);

		MainScreen.text("\n\nYou scream in both pleasure and pain as Urta's cock is lodged deep into your ass.  Good thing you took that drink earlier.  You're rocked back and forth as the fox-herm doesn't even bother waiting for you to be ready before she starts properly fucking you.  Groaning and moaning, awkward with the weight of her distended midriff, Urta thrusts in and out of you, eagerly humping your ass as if trying to start burying you into the floor with her dick.  \"<i>Oh... so good, so hot!  Gonna...!</i>\"  She cries out as she cums; looking like she <i>really</i> needed that release if she's popping her load this early on.  You groan as you feel a rush of liquid flow into your backside, Urta having just climaxed from fucking you. The hot liquid gurgles into your bowels, stuffing them full of her now-virile herm seed, your belly growing a little pudgy as she finally finishes with an ecstatic groan.");

		MainScreen.text("\n\nThe pregnant vixen sighs in relief, snuggling up against you.  \"<i>That really hit the spot, lover... but, you know what?  I think I'm still super horny...</i>\"  She tells you in a sing-song tone.  She didn't have to tell you that, considering her dick is still firmly lodged inside your ass and you can feel it hard and firm, throbbing with need.  You try to move forward so she'll pull herself out of you, but Urta's hands quickly grab at your hips, blocking your escape.  \"<i>Uh-uh-uh, lover.  You're at least partly responsible for this, so you're going to help me...</i>\"  She blows teasingly across your ear, then starts to fuck your ass again; no longer consumed by hormones like her first time, her strokes now are slow and languid, drawn out long and gentle with each almost teasing stroke back and push inside, her hands draping themselves over your neck to play with your [nipples], her swollen belly resting against your back for support.");

		MainScreen.text("\n\nYou can feel pleasure build up inside you as she pumps you.  ");
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("Every time her swollen tip rubs against your prostate you feel droplets of pre escape your dilating cum-hole.  ");
		if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("Each slap of her balls against your [vagina] sends electric waves of pleasure that expand throughout your body.  ");
		MainScreen.text("You moan audibly, making it pretty clear you're getting off from this kind of treatment.  \"<i>See?  I knew you'd enjoy this too, now that I'm not so tense...</i>\"  She draws out the last word as she makes a particularly deep thrust inside of you.  \"<i>Mmm...  I can feel your sexy ass squeezing my dick; you're enjoying this, really, aren't you?</i>\"");

		MainScreen.text("\n\nShe suddenly giggles, and you realize you can feel something strange - a light, fluttering sensation, emanating from the bulging belly pressed against your back.  \"<i>It's kicking - I wonder if it can feel how much mommy is enjoying doing this to its daddy?</i>\"  She laughs.  \"<i>Isn't this just a weird, kinky sort of situation?  Here I am, a pregnant woman, fucking the father of my baby with a great big horse-cock of my own!  Does that turn you on, lover?  Because I don't know if it turns me on or weirds me out,</i>\" she confesses.");

		MainScreen.text("\n\nYour only reply is to moan and squeeze her cock with your ass.");
		if (player.lowerBody.cockSpot.count() > 0) {
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("  [EachCock] tenses in unison");
			else MainScreen.text("  [EachCock] throbs, tensing in preparation");
			//(Low Cum Amount)
			if (player.cumQ() < 250) MainScreen.text(" and you unload on the floor, spilling rope after rope of cum, forming a small puddle where you stand.  An undeniable testament to your enjoyment of the kinkiness of the act, however small.");
			//(Medium Cum Amount)
			else if (player.cumQ() < 1000) MainScreen.text(" and you deliver your payload right there on the floor.  Jet after jet splash against it, and you have no choice but to continue moaning and spilling your cum as Urta remains firmly lodged in your depths, no longer able to move now that you're squeezing her shaft so deliciously tight.  By the time you're done, the puddle you've formed is big enough that you can see your own face on the reflection, enraptured in pleasure and enjoyment of Urta's equine meatstick.");
			//(High Cum Amount)
			else {
				MainScreen.text(" and you let your prodigious load escape the confines of your ");
				if (player.lowerBody.balls > 0) MainScreen.text("churning balls");
				else MainScreen.text("being");
				MainScreen.text(", splashing against the floor with such force that you form veritable streams of enjoyment in the rapidly expanding lake of perversion.  The pleasure of the kinky act, aided by your earlier drink, ensures you feel nothing but ultimate happiness for this brief moment.  By the time you've spilled the last drop, the lake has reached Urta's knees, and you pity the poor soul in charge of cleaning the back rooms.");
			}
		}
		if (player.lowerBody.vaginaSpot.hasVagina()) {
			MainScreen.text("\n\nYour pussy grips at nothing, ");
			if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 4) MainScreen.text("squirting");
			else MainScreen.text("leaking");
			MainScreen.text(" juices that paint Urta's balls, which are resting flush against your [vagina].  The spilled juice slides down Urta's balls");
			if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 4) MainScreen.text(" to join your previous discharge on");
			else MainScreen.text(" and down towards");
			MainScreen.text(" the floor, where it gathers in a ");
			MainScreen.text("puddle of its own.");
		}
		//Genderless:
		if (player.gender == 0) {
			MainScreen.text("\n\nYou squeeze, massage and grip at Urta's intruding dong.  Groaning in what you can only call an assgasm as your ");
			if (player.lowerBody.butt.analLooseness < 3) MainScreen.text("tight");
			else MainScreen.text("loose");
			MainScreen.text(" anal muscles milk Urta's shaft much like a pussy would.");
			if (player.lowerBody.butt.analWetness > 0) MainScreen.text(" It even secretes its own wetness to slide lovingly down the fox-herm's balls and drip on the floor, an undeniable proof of your enjoyment.");
		}
		MainScreen.text("\n\nMoaning and growling, Urta continues to plunge in and out of your ass, squeezing you as tightly against herself as she can.  \"<i>Oh, you're loving this, aren't you?  Well, let's just see how long you can keep it up for!</i>\"  She proclaims, and begins to hump you harder and faster, the scents of your climax goading her to renewed heights of vigor.");

		MainScreen.text("\n\nUnable to remain awake after your explosive orgasm, you lay down on the ");
		let puddle: number = 0;
		if (player.lowerBody.vaginaSpot.hasVagina()) {
			if (player.lowerBody.vaginaSpot.get(0).vaginalWetness >= 4) puddle += 2;
			else puddle++;
		}
		if (player.lowerBody.cockSpot.hasCock()) {
			if (player.cumQ() < 250) puddle++;
			else if (player.cumQ() < 1000) puddle += 2;
			else puddle += 3;
		}
		if (puddle > 0) {
			if (puddle == 1) MainScreen.text("small");
			else if (puddle == 2) MainScreen.text("reasonable");
			else MainScreen.text("enormous");
			MainScreen.text(" puddle of cum you created");
		}
		else MainScreen.text("floor");
		MainScreen.text(" and close your eyes, letting sleep take you over even as the fox behind you drools on your back and continues to pound your ass raw.");

		MainScreen.text("\n\nYou come to your senses and notice the amazing softness of the pillow you're laying on.  It feels so good you can't help but dig your head in and rub your cheek against it.  \"<i>You like that, do you?</i>\"  A familiar voice says, sounding rather amused.");
		player.orgasm();
		player.stats.sens += 3;
		menu();
		MainScreen.addButton(0, "Next", partTwoOfUrtaBoning);
	}

	private partTwoOfUrtaBoning(): void {
		MainScreen.clearText();
		MainScreen.text("You open your eyes and gaze at the smiling face of Urta.  \"<i>Good morning, lover.  Sleep well?</i>\"  She playfully teases you.  You smile at her, stretching yourself and finally becoming aware of the rest of your body.  You wince in pain as your abused ass screams a protest at your motions, a strange weight emanating from your midriff.  Your belly is visibly rounded out, filled with what you imagine is the result of many loads from your foxy lover.  Urta gives your belly a gentle rub and seems to seriously study your bulging gut and hers.  \"<i>I think mine is still bigger,</i>\" she says, with a slightly embarrassed giggle.");

		if (player.lowerBody.cockSpot.count() > 1) {
			MainScreen.text("\n\n[EachCock] is fully erect, painfully pointing at Urta's opening.");
			if (!player.lowerBody.isTaur()) MainScreen.text("  So close that you can almost feel its heat against your [cockHead].");
			MainScreen.text("  \"<i>Oh, don't feel embarrassed; I know what it's like to wake up with morning wood,</i>\" she jests, clearly unphased by your erect state.");
		}
		if (player.lowerBody.vaginaSpot.hasVagina()) {
			MainScreen.text("\n\nYour [vagina], still moist after your session, quivers in envy at the delicious pounding your [ass] was treated to mere moments ago.  A little awkwardly, given her belly, Urta reaches down to gently stroke your pussy with practiced ease, smirking confidently at your reaction.  \"<i>Maybe I should do this hole sometime soon, hmm?</i>\" she jokes.");
		}

		MainScreen.text("\n\nShe looks into your eyes, concern on her features.  \"<i>[name]... I... I'm sorry for what I did to you.  I was just so pent up and crazed with hormones; you really helped me out a lot, and it really, really felt good, but I still should have been gentler with you.  Are you feeling okay?</i>\"");

		//(Low Anal Looseness)
		if (player.analCapacity() < 40) MainScreen.text("\n\nYou complain that your ass is hurting a lot; you were definitely not made to handle the pounding she gave you earlier and you have no doubt you're going to be sore for a few days, at least.");
		else if (player.analCapacity() < 60) MainScreen.text("\n\nYou let her know that while you're no stranger to anal, you'll still be feeling the results of this little tryst of yours for a few days.  She really went to town on your ass.");
		else MainScreen.text("\n\nYou're pretty loose, but still, your ass is aching.  You can't see for yourself, but you wouldn't doubt if she had fucked you raw, because it certainly feels like she did.");

		MainScreen.text("\n\n\"<i>Oh dear...</i>\"  she cuddles you back against her breast.  \"<i>I'm so sorry, lover...</i>\"  she suddenly smirks at you wickedly.  \"<i>Want me to kiss it better?</i>\"  She asks in a stage whisper.  You raise your brow in curiosity at the offer, wondering how exactly she intends to kiss it better.  She doesn't answer - not verbally, anyway.  Instead, she purses her lips and sticks out her tongue with lewd, wet, slurping noises as she licks the air in front of you before putting it back in her mouth.  Realization dawns on you, as you figure out just how exactly she intends to make you feel better.  She's offering you a rimjob.");

		menu();
		MainScreen.addButton(0, "Accept", acceptUrtaRimJobbies);
		MainScreen.addButton(1, "Decline", declineARimJob);
	}

	//[=Decline=]
	private declineARimJob(): void {
		MainScreen.clearText();
		MainScreen.text("You tell her that you appreciate the offer, but you're going to sit this one out.  Though she tries to hide it, she looks relieved at your refusal; she probably isn't really comfortable with that level of kinkiness.  Instead, she eagerly captures your lips with hers, murmuring into your mouth as she devours your kiss, tongue sliding between your lips to caress your own tongue.");
		//Both choices converge here.
		MainScreen.text("\n\nIt takes a little work, but eventually the pair of you manage to get yourselves looking decent, though you've little doubt you still smell fairly strongly of sex.  Urta smiles, cuddles up against you and kisses you, then yawns.  \"<i>Well, I'm not pent up any more, but now I'm tired.  This baby could come any day now, so I need my sleep - I'm going home to take a nap, [name].  Take care of yourself, all right?</i>\" she tells you.");
		MainScreen.text("\n\nYou kiss her goodbye and step out.");
		doNext(camp.returnToCampUseOneHour);
	}

	//[=Accept=]
	private acceptUrtaRimJobbies(): void {
		MainScreen.clearText();
		MainScreen.text("Well... she is responsible for your state, and her broad vulpine tongue must feel amazing on your sensitive ass... so you nod in acceptance of her offer.  \"<i>All right then... you do know you're the only person I'd ever do this for, right?</i>\" Urta comments.  \"<i>Now, roll around and present yourself to me; you can't expect a pregnant lady to do a lot of bending, now can you?</i>\"  She smirks.");

		//Not Centaur:
		if (!player.lowerBody.isTaur()) {
			MainScreen.text("\n\nYou roll on all fours and stick out your [ass].  Urta kneels somewhat awkwardly behind you, then firmly grips the cheeks of your ass with her fingers.  She inhales as if to calm herself, then gently slides one finger into the still-loose and stretched ring of your anal muscles.  You wince in pain at the sudden intrusion, shaking a bit.");
		}
		//Centaur:
		else {
			MainScreen.text("\n\nYou stand up and face your back to her, letting her look at your [ass].  With a grunt of effort, Urta hauls herself upright and then positions herself behind your horsey-ass, squeezing and kneading the muscles of your flanks with her skilled fingers. She inhales as if to calm herself, then gently slides one finger into the still-loose and stretched ring of your anal muscles.  You wince in pain at the sudden intrusion, shaking a bit.");
		}
		MainScreen.text("\n\n\"<i>Right...</i>\"  With that, she leans in and gently begins to run the tip of her warm, wet tongue around your back passage, gently applying saliva to the soreness.  It still hurts a bit, but the feel of Urta's wet tongue on your ass does help you get over the pain, though the kinkiness of the act does not go unnoticed.");
		if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("  Especially not if your " + CockDescriptor.describeMultiCockShort(player) + " have anything to say about it, throbbing at the mere feeling of Urta's wet tongue.");
		else if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("  Especially not if your [cock] has anything to say about it, throbbing at the mere feeling of Urta's wet tongue.");
		else if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("  Especially not if your [pussy] has any say in the matter, winking at Urta, hoping for a licking of its own.");
		MainScreen.text("  She slowly begins deepening the pseudo-kiss, pressing more and more of her wet tongue against you until she is taking slow, languid licks up and down the lengths of the chasm, slathering your burning skin with her cooling goo.");

		MainScreen.text("\n\nYou shake your ass at Urta's face, moaning in relief as her wet tongue laps away all the soreness in your ass.  All too soon though, she stops.  \"<i>Okay, somebody might be enjoying this a little too much... besides, you're not dripping any more.  I think that's as better as I can kiss it.</i>\"  Urta announces.  With a hand on your ass for support, she straightens fully up with a groan.  \"<i>I guess I'm lucky you at least keep yourself so clean there... I can even taste myself on you,</i>\" and she punctuates that remark with a flirty slap on one asscheek.  \"<i>So, feeling better now?</i>\"");

		MainScreen.text("\n\nYou nod, though you're feeling a bit disappointed your fun was cut short.  \"<i>That's good.  All right, time we got dressed, I think,</i>\" she notes.");

		//Both choices converge here.
		MainScreen.text("\n\nIt takes a little work, but eventually the pair of you manage to get yourselves looking decent, though you've little doubt you still smell fairly strongly of sex.  Urta smiles, cuddles up against you and kisses you, then yawns.  \"<i>Well, I'm not pent up any more, but now I'm tired.  This baby could come any day now, so I need my sleep - I'm going home to take a nap, [name].  Take care of yourself, all right?</i>\" she tells you.");
		MainScreen.text("\n\nYou kiss her goodbye and step out.");
		dynStats("lus", player.stats.sens / 10, "resisted", false);
		doNext(camp.returnToCampUseOneHour);
	}


	//(Urta's) Children Option - Required to visit her house
	//This option is disabled after choosing it for the first time.
	//It exists as an unlocker for Urta's new Home.  You will get the Key to the place.
	//Appears as a Talk topic
	internal function visitKidsFirstTime(): void {
		MainScreen.clearText();
		MainScreen.text("You ask Urta if she can take you to see your child");
		if (urtaKids() > 1) MainScreen.text("ren");
		MainScreen.text(".");

		MainScreen.text("\n\n\"<i>You want to see ");
		if (urtaKids() == 1) MainScreen.text("our child");
		else MainScreen.text("our babies");
		MainScreen.text("?</i>\"  Urta asks, tail wagging excitedly at the thought.  \"<i>Why, of course, [name] - " + urtaKidsText("he'll", "she'll", "they'll") + " be so happy to see " + urtaKidsText("his", "her", "their") + " " + player.mf("father", "other-mother") + "!  Come on, let's get going!</i>\"  She insists, immediately getting up from her seat");
		if (Flags.list[FlagEnum.URTA_TIME_SINCE_LAST_CAME] == 0) MainScreen.text(", erection already diminishing as she forgets about her horniness in her parental pride");
		MainScreen.text(".  You waste no time in following her; indeed, she seems liable to leave you behind in her excitement to go and see her offspring.");

		MainScreen.text("\n\nYou notice that Urta is not leading you via the normal route, and ask her why the change.  \"<i>Didn't I mention?</i>\"  She questions, then looks apologetic.  \"<i>Sorry, it must have slipped my mind.  I figured since we're going be raising a family of our own, we'd need a better place than my old apartment.  I want our children to have plenty of room to play in.</i>\"");

		MainScreen.text("\n\nAfter a few further steps, she feels the need to interject, \"<i>But I still have my old apartment, too.  Just in case we're in need of some privacy.  Can't have the kids interrupting us, can we?</i>\"  She asks, giving you a flirtatious wink; motherhood seems to have brought a new boldness to the herm vixen!");

		MainScreen.text("\n\nUrta's new home is a decent sized, cozy looking cottage, in one of the better-looking districts of Tel'Adre.  There are no empty houses here, and all of the houses, while clearly touched by the realities of being built in a desert in the middle of a drought, are well-kept, clean and tidy.  As you get closer, you admire the step-up from Urta's rather ratty-looking old apartment; it's actually quite big, especially compared to where she was living before, and you can vaguely see a courtyard out the back.");

		MainScreen.text("\n\n\"<i>Lianna!  I'm home!</i>\"  Urta calls as the two of you approach the door.  The door swings open and the buxom but conservatively dressed figure of a black-haired, female skunk-morph steps into view.");

		MainScreen.text("\n\n\"<i>Welcome home, ma'am.</i>\" she politely says, then turns to look you over.  \"<i>" + player.mf("Sir", "Ma'am") + "?</i>\"  You quickly say your name, extending your hand for a handshake.  The skunkette... Lianna, grabs your hand give you a firm shake.  \"<i>I've heard a lot about you, [name].  It's a pleasure to finally meet you in person.</i>\"  Her eyes keep roaming your body.  Urta coughs.  Realizing she was blocking the doorway, Lianna quickly moves away to let you enter.  \"<i>Sorry...</i>\"");

		MainScreen.text("\n\n\"<i>[name], this is Lianna.</i>\"  The skunkette lifts a hand.  \"<i>I hired her as a live-in to keep an eye on our kids, since none of us can be here for them all the time.</i>\" Urta explains.");

		MainScreen.text("\n\n\"<i>I should be going, but before that, [name]?</i>\"  You turn to look at her, wondering what she wants.  \"<i>I would appreciate if you came to talk to me sometime later, I have some things I'd like to discuss with you.</i>\"  The she-skunk says, before heading into a room (presumably hers).");

		MainScreen.text("\n\nYou step inside and take a look around, examining the entrance of Urta's new home.  From this point, the perception you get is that Urta's house is quite roomy, if a little bland; the colors adorning the walls and ceiling are plain and neutral, and there's not overmuch in the way of furniture; you have a feeling Urta focused on just buying what was needed for the house and left her old stuff back at her apartment.  Still, there's enough knickknacks and signs of life around to give it a comfy, cozy feel.");

		MainScreen.text("\n\nLooking around, you can easily see a living room, a kitchen and several rooms, at least one of which you figure must be a nursery for your ");
		if (urtaKids() == 1) MainScreen.text("child");
		else MainScreen.text("children");
		MainScreen.text(".  One door leads out to the back courtyard, while another looks like it closes off stairs leading down to a basement.");

		MainScreen.text("\n\n\"<i>So, what do you think of it, [name]?  I thought it was quite a bargain, especially considering the price I paid for it... I'm just glad the Council gave me that bonus to my pay as a reward, or I'm not sure I could have afforded it.</i>\"  She notes, clearly hoping you'll approve of the new house.");

		MainScreen.text("\n\nIt's a bit lacking in decoration, but otherwise, it's very impressive, and definitely cozy.  It must've cost a fortune, even if Urta says she's got a bargain.  You tell her the house is very nice, you certainly approve, but you have to ask... just how much exactly did this place cost?  The vixen looks around, then sidles over to you and quietly whispers the amount into your ear.  You nearly jump out of your [armor].  That was the bargain price?");

		MainScreen.text("\n\n\"<i>Yep.</i>\"  She replies casually.  You wonder just how rich Urta really is...  \"<i>Now, come on, more to see upstairs.</i>\"  She smiles, tugging your arm insistently as she strives to lead you up the stairs, eventually making you go along.  First, she shows you an empty room, \"<i>I haven't decided what we'll do with this one yet; could be a study, maybe?  But this... ah, this here is my room,</i>\" she notes, proudly opening the door to a room dominated by a comfortable bed - and with subtle signs of multiple drains across the floor.  \"<i>And it'll be your room, too, as soon as you finish moving in,</i>\" she notes happily.");

		MainScreen.text("\n\nYou have half a mind to ask what are the drains for... but you have a feeling you already know.  Regardless, you take Urta's hand and tell her you have to have a serious talk with her.  \"<i>I should hope so,</i>\"  she replies, trying to sound light-hearted. You explain that you just can't move in with her right now.  Urta looks poleaxed, \"<i>What?  W-why not?  We're having a family together, why wouldn't you want to be with us?</i>\" she asks, confused and upset.  You invite her to take a seat on the bed with you.  You explain in detail just why you can't move in now.  At this, she sighs and nods her head.  \"<i>I can understand your duty and all, and I respect it, I just personally find it baffling why you have to pursue it by living out in the middle of nowhere.  But I understand...  Still, remember that my house is yours, whenever you want to make it that way.</i>\" she tells you, then steals a quick kiss.");

		MainScreen.text("\n\nYou kiss her back, quickly turning the kiss more passionate.  With a pleased moan, she wraps you in her arms, pulling you close as she hungrily kisses you; you have a feeling that no matter how often you do this, she'll never be any less surprised by it - or eager to bask in it.  You break the kiss, panting and more than a little aroused, something that does not go unnoticed by the vixen.  \"<i>You little tease... you look like you'd like to give my new bed a try, don't you?</i>\" she giggles, and pinches your cheek.  \"<i>Sorry, I have things to do now... here; make sure you don't lose this - it's your copy of the key to the locks on this house.</i>\" she says, handing you a small iron key.");

		MainScreen.text("\n\nYou pocket the key and go about your business.");

		MainScreen.text("\n\n<b>You got the Key item: Urta's Key (Used at the 'Homes' menu in Tel'Adre.)</b>");
		//Description:  Spare key to Urta's house.  It is adorned with a small fox crest.
		player.createKeyItem("Spare Key to Urta's House", 0, 0, 0, 0);
		doNext(camp.returnToCampUseOneHour);
	}

	//Kid Interactions
	//Word of Fenoxo on important matters: 
	//Urta's kids age at a fairly \"normal\" fast rate, so they are toddlers/tweens when it comes to relating to their ages (aka about 4-7 years old)

	//After Urta starts having kids of her own, she gets given a new, bigger house in which they live and are cared for by nannies when she's not in. However, she still keeps her old messy apartment as a private retreat, and comes here for sexing the PC.
	//Male and herm kids are natural hypers, so will be bigger than normal even at their age.  
	//Male and herms also have a 50/50 chance of having either a vulpine or equine dick. 
	private pickKidSceneHere(): void {
		MainScreen.clearText();
		//ANNOUNCE BEHBIES
		//Once per pregnancy?
		if ((pregnancy.type == PregnancyType.PLAYER || (player.pregnancyIncubation < 300 && player.pregnancyType == PregnancyType.URTA)) && Flags.list[FlagEnum.NEW_BABY_ANNOUNCED] == 0) {
			newBabyComing();
		}
		//Only possible between 12-14 hours.
		//Lianna can cook, its hard to make a mess when you have someone who knows what they're doing around. Then again Lianna is a mad scientist, so...
		else if (model.time.hours >= 12 && model.time.hours <= 14) {
			hugAttackScene();
		}
		//Take the kids for a walk - Special thanks to Belin
		//Randomly picked when selecting Kids option in Urta's house.
		else if (rand(2) == 0) takeTheKidsForWalk();
		//Bathtime
		//Randomly picked by selecting the Kids option in Urta's House.
		//So far this is the ONLY option to use that button, so...
		else bathtime();
	}

	//New Baby Coming
	//Requires Urta be pregnant or PC be pregnant with UrtaKid
	private newBabyComing(): void {
		MainScreen.clearText();
		MainScreen.text("You announce to your ");
		if (urtaKids() == 1) MainScreen.text("child");
		else MainScreen.text(num2Text(urtaKids()) + " kids");
		MainScreen.text(" that you and Urta have something important to tell them.");

		//If UrtaKids <8:
		if (urtaKids() < 8) {
			MainScreen.text("\n\nAs ");
			if (urtaKids() == 1) {
				if (Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] >= 2) MainScreen.text("she");
				else MainScreen.text("he");
				MainScreen.text(" approaches");
			}
			else MainScreen.text("they gather");
			MainScreen.text(" and curiously look");
			if (urtaKids() == 1) MainScreen.text("s");
			MainScreen.text(" at you, Urta gives ");
			if (urtaKids() > 1) MainScreen.text("them");
			else if (Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] >= 2) MainScreen.text("her");
			else MainScreen.text("him");
			MainScreen.text(" a loving smile.");

			//Both Preg:
			if (pregnancy.type == PregnancyType.PLAYER && player.pregnancyType == PregnancyType.URTA) {
				MainScreen.text("\n\n\"<i>Your mommies are both going to give you a little brother or a little sister soon,</i>\" Urta says, giving you a comforting hug whilst still managing to pat your belly, even as she gently drums her fingers on her own.");
			}
			//One person preg:
			else if (pregnancy.type == PregnancyType.PLAYER || (player.pregnancyType == PregnancyType.URTA)) {
				MainScreen.text("\n\n\"<i>You're going to have a little brother or sister soon!</i>\" she says, beaming with delight as she pats ");
				if (pregnancy.type == PregnancyType.PLAYER) MainScreen.text("her");
				else MainScreen.text("your");
				MainScreen.text(" belly.");
			}
			MainScreen.text("\n\nYour child");
			if (urtaKids() > 1) MainScreen.text("ren are");
			else MainScreen.text(" is");
			MainScreen.text(" silent for a moment, digesting this information.  Then ");
			if (urtaKids() == 1) MainScreen.text("a small fluffy bundle is");
			else MainScreen.text("several small fluffy bundles are");
			MainScreen.text(" doing ");
			if (urtaKids() == 1) MainScreen.text("its");
			else MainScreen.text("their");
			MainScreen.text(" best to hug you both; ");
			if (urtaKids() > 1) MainScreen.text("they");
			else if (Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] >= 2) MainScreen.text("she");
			else MainScreen.text("he");
			if (urtaKids() == 1) MainScreen.text(" is");
			else MainScreen.text(" are");
			MainScreen.text(" clearly delighted at the prospect.  You and Urta smile at each other over ");
			if (urtaKids() > 1) MainScreen.text("their");
			else if (Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] >= 2) MainScreen.text("her");
			else MainScreen.text("his");
			MainScreen.text(" head");
			if (urtaKids() > 1) MainScreen.text("s");
			MainScreen.text(", then return the embrace, pleased that ");
			if (urtaKids() > 1) MainScreen.text("they");
			else if (Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] >= 2) MainScreen.text("she");
			else MainScreen.text("he");
			if (urtaKids() == 1) MainScreen.text(" is");
			else MainScreen.text(" are");
			MainScreen.text(" excited at the prospect.");
		}
		//If UrtaKids =>8:
		else {
			MainScreen.text("\n\nYour brood let out a chorus of amused giggles, while the biggest of their number sighs and folds their arms, shaking their head at you.  \"<i>We're going to get another brother or sister, aren't we?</i>\" they ask.");
			MainScreen.text("\n\n\"<i>Uh, yes, that's right,</i>\" Urta replies, looking kind of sheepish.  More laughs from your kids, even as the spokesfox sighs again.  \"<i>When will you two learn?  There's a little thing called a condom - you should try using it.  After all, we know you have them,</i>\" they declare, showing what is unmistakably one of Urta's personal brand.");
			MainScreen.text("\n\nUrta all but blushes crimson in embarrassment.  \"<i>Give that here - you're too young to be playing with those!</i>\" she commands, lunging at the young fox-morph... who promptly skips away with a laugh, then runs for it, their siblings laughing as Urta gives quick chase, leaving you shaking your head at the strange family you've put together.");
		}
		Flags.list[FlagEnum.NEW_BABY_ANNOUNCED] = 1;
		doNext(camp.returnToCampUseOneHour);
	}

	//Hug Attack - (Special thanks to DeceivedTadpole)
	//Auto-plays if the PC goes to Urta's house at the appropriate time
	//Only possible between 12-14 hours.
	//Lianna can cook, its hard to make a mess when you have someone who knows what they're doing around. Then again Lianna is a mad scientist, so...

	private hugAttackScene(): void {
		MainScreen.clearText();
		MainScreen.text("Before you can exchange any further pleasantries the sound of running padded feet fills the house.  Lianna simply looks at the approaching foxling");
		if (urtaKids() > 1) MainScreen.text("s");
		MainScreen.text(" from the safety of the kitchen, leaving you to handle the incoming charge.  It takes a bit of effort to keep from losing your balance as your brood tackles you, hugging you in affection.  \"<i>All right, all right, let your " + player.mf("father", "other-mother") + " go, or do you not want to play?</i>\" Urta says, smirking with amusement as she closes the front door.  With a groan and a bit of prying the little fox");
		if (urtaKids() > 1) MainScreen.text("es do");
		else MainScreen.text(" does");
		MainScreen.text(" eventually clamor" + urtaKidsText("s", "s", "") + " off of you, but not before taking your hands in " + urtaKidsText("his", "her", "their") + " own.  ");
		if (urtaKids() > 1) MainScreen.text("They");
		else if (Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] >= 2) MainScreen.text("She");
		else MainScreen.text("He");
		MainScreen.text(" insistently pull");
		if (urtaKids() == 1) MainScreen.text("s");
		MainScreen.text(" you towards the backyard, while your lover chuckles at your predicament.");

		MainScreen.text("\n\nAfter a bit of a wrestling, some games, and an incident with a scraped knee everyone has moved into the family room, leaving you surrounded by smiling faces.  \"<i>Did you enjoy your play date [name]?</i>\" says Urta, prompting while Lianna bandages your kid's knee.  A little worn out yourself, your only answer is a slight nod.  Having been here for the better part of an hour, it's about time you hit the old dusty trail.  \"<i>Why don't you stay a little longer, lover?  We were just about to have lunch, why don't you join us?</i>\"  Urta asks, an inviting smile on her face.");
		menu();
		MainScreen.addButton(0, "Yes", stayToPlay);
		MainScreen.addButton(1, "No", noPlayTimeForKids);
	}

	//[=No=]
	private noPlayTimeForKids(): void {
		MainScreen.clearText();
		MainScreen.text("You shake your head, telling your family that you're sorry but you have to go.  \"<i>Really?  All right... but, you should at least hang around long enough to take some on the go.</i>\"  Urta insists.  You tell her you'll be fine, but you'll definitely stop by to eat with them sometime.  Urta gives a melodramatic sigh and rolls her eyes, then nods and smiles.  \"<i>All right... just make sure you do.</i>\"  She tells you, then gives you a quick hug and a kiss.  \"<i>We worry about you out there; come home safe to us.</i>\"  She says, then lets you go.");
		MainScreen.text("\n\nYou give your lover a kiss, and wave goodbye as you step out.");
		//(Back to camp)
		doNext(camp.returnToCampUseOneHour);
	}

	//[=Yes=]
	private stayToPlay(): void {
		MainScreen.clearText();
		MainScreen.text("You nod your head in acceptance.  Urta smiles in delight.  \"<i>Take a seat, please, make yourself comfortable - I'll go and get it,</i>\" she says happily, tail wagging as she saunters off to the kitchen.");

		//1st time:
		if (Flags.list[FlagEnum.URTA_LUNCH_PLAY] == 0) {
			Flags.list[FlagEnum.URTA_LUNCH_PLAY]++;
			MainScreen.text("\n\nLianna steps over to your side.  \"<i>I take it you've never eaten Urta's cooking?</i>\"  She asks.  You look at her in confusion at first, but shake your head, confirming that you really haven't.");
			MainScreen.text("\n\nLianna nods.  \"<i>Here, you can keep this.</i>\"  She hands you a small vial.  The label says: \"<i>For extreme stomach pain.</i>\"  ...Urta's cooking can't be this bad can it?  You ask Lianna what she's implying with this.");
			MainScreen.text("\n\n\"<i>I did what I could, [name].  But there are things not even Marae can fix.</i>\"  She casually replies, walking off into the kitchen.");

			MainScreen.text("\n\nYou seat yourself, dreading what's to come.  Urta approaches, hauling a sizable plate.  \"<i>Here we are,</i>\" she says, with a slightly strained cheerfulness in her voice.  As she puts it down on the table, you have to admit it doesn't look... well, as bad as Lianna was making you think.  A little overdone here and there, but hardly poisonous.");
			MainScreen.text("\n\nYou take an experimental bite, chewing it carefully.  Hmm... it's not that bad...  This is the last thought that crosses your mind before your vision fades to black and you collapse.  You can faintly hear Urta worriedly yelling, while both her and Lianna try to get you back up.  Moments later you feel a soothing cool liquid being pressed to your lips and you drink it down.");

			MainScreen.text("\n\nStrength returns to your limbs and you find yourself capable of standing up once more.  You look around; Lianna is holding the medicine she passed you earlier and Urta looks to be on the verge of tears.  \"<i>I'm sorry!</i>\"  She wails, fiercely hugging you to her breasts.  \"<i>I- I just wanted to make something special, something to impress you, I don't know what I did wrong, I don't normally have problems cooking!</i>\"  She says, bursting into tears of shame and grief.  Lianna just stares knowingly at both of you, as if saying \"<i>told you</i>\".");

			MainScreen.text("\n\nYou hug her back and insist that you are fine now... you think.  You then worriedly ask if this is what she's been feeding your child");
			if (urtaKids() > 1) MainScreen.text("ren");
			MainScreen.text("?  \"<i>No, of course not!</i>\"  She says, heartbreak and outrage warring in her tone.  \"<i>Lianna normally does the cooking, though... oh, [name], I'm so sorry!</i>\"  She sobs.  Lianna coughs and both you and Urta look at her.  \"<i>Sorry to interrupt, but the food is getting cold.</i>\"  Urta stares at her blankly, then nods.  \"<i>Please go and fetch it, Lianna,</i>\" she says, a little coldly.");
			MainScreen.text("\n\nCompared to Urta's cooking, Lianna's is heavenly.  This is far from what you expected from the strange skunk alchemist.  It seems that despite her mostly crazy ideas regarding alchemy, she at least follows good cooking practices.  You can't hide the smile that comes over your face as you eat gleefully.");

			MainScreen.text("\n\nUrta gives a quiet, dismissive huff; she's quite obviously jealous of how much better her nanny's cooking is than hers.");

			MainScreen.text("\n\nYou finish eating and get up to take your dish to kitchen, when Lianna stops you from doing so.  \"<i>I got this,</i>\"  She states, taking your dish from your hands and proceeding to do the same for everyone else.  You thank Urta for the invitation, kissing her before telling her you should be going.  \"<i>Thank you, lover.</i>\"");
			//Token 1 HP damage? Due to failed cooking?
			fatigue(-10);
			player.takeDamage(10);
			//Recover some fatigue due to excellent food, by Lianna.
			doNext(camp.returnToCampUseOneHour);
		}
		//Repeat:
		else {
			MainScreen.text("\n\nYou wave Lianna over.  She steps over and before you can say anything she hands you another vial of medicine.  You thank her.  \"<i>You're welcome,</i>\"  She simply states before disappearing into the kitchen.");
			MainScreen.text("\n\nYou seat yourself and pop the cork, downing the medicine in one go.  Urta shyly arrives with her dish, \"<i>Okay, I think I've figured out what went wrong last time; please try a bite of this,</i>\"  she pleads.  Despite her words, you notice it's just a single, small plate of food that she's giving you this time.");

			MainScreen.text("\n\nOnce again you take an experimental bite, chewing it carefully.  It's not so bad, but the moment it hits your stomach, you feel a burning sensation, like the fires of a thousand infernos. You grimace and Urta sighs dejectedly.  \"<i>Another failure... all right, Lianna, bring out the real lunch,</i>\" she sulkingly instructs.  You try to cheer Urta up, telling her that someday she might make it... maybe.  \"<i>You really think so?</i>\" she asks hesitantly, hope in her tone.  You nod your head... though you wonder if you should really encourage her...");
			MainScreen.text("\n\nOnce again, Lianna's cooking is heavenly.  It's a wonder someone who comes up with such crazy experiments can even cook, let alone something so good.  You find yourself smiling as you eat.  Urta watches your every mouthful, clearly envious and angry with herself at not being able to cook like the hired help.");
			MainScreen.text("\n\nAfter you're done, Lianna begins collecting the dishes.  Satisfied with your newly filled belly, you kiss Urta and head towards Tel'Adre's streets.  Urta gives you an embarrassed smile and pats your back, then lets you go.");
			//Token 1 HP damage? Due to failed cooking?
			fatigue(-10);
			player.takeDamage(10);
			//Recover some fatigue due to excellent food, by Lianna.
			doNext(camp.returnToCampUseOneHour);
		}
	}

	//Bathtime
	//Randomly picked by selecting the Kids option in Urta's House.
	//So far this is the ONLY option to use that button, so...
	private bathtime(): void {
		MainScreen.clearText();
		MainScreen.text("You tell Lianna you just wanted to check in on your ");
		if (urtaKids() > 1) MainScreen.text("kids");
		else if (Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] >= 2) MainScreen.text("daughter");
		else MainScreen.text("son");
		MainScreen.text(".  \"<i>Sure, but they need a bath, maybe you'd like to help me bathe them?</i>\"");
		//[Yes] [No]
		menu();
		MainScreen.addButton(0, "Yes", giveTheKidsABath);
		MainScreen.addButton(1, "No", noBathTiemPlease);
	}
	//[=No=]
	private noBathTiemPlease(): void {
		MainScreen.clearText();
		MainScreen.text("\"<i>I see, in that case excuse me,</i>\"  She says with a blank expression.  Looks like you don't have any business here for now, so you decide to leave.");
		//(Back to TA/Camp)
		menu();
		MainScreen.addButton(0, "Next", telAdre.telAdreMenu);
	}
	private urtaKidsText(male: string = "", female: string = "", plural: string = ""): string {
		if (urtaKids() == 1) {
			if (Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] == 1) return male;
			else return female;
		}
		else return plural;
	}
	//[=Yes=]
	private giveTheKidsABath(): void {
		MainScreen.clearText();
		MainScreen.text("\"<i>Right, come with me.</i>\"  She leads you to the bathroom.  Urta spared no expense in making this place as luxuriant as possible - you could easily fit the core of your campsite in here.  A huge marble bathtub, sunken into the floor itself, dominates the room, big enough that two or three centaurs could easily fit into it.  Shiny brass taps stand ready to fill the sizable bath, which is already gently steaming from a brimming load of hot water already prepared.");

		MainScreen.text("\n\nLianna points to a stack of bottles and lotions.  \"<i>The shampoo and soaps are over there, I trust you know what to do with those?</i>\"  You tell the skunkette that you do.  \"<i>Very well, I'll go get ");
		if (urtaKids() == 1) {
			if (Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] == 1) MainScreen.text("your son");
			else MainScreen.text("your daughter");
		}
		else MainScreen.text("the kids");
		MainScreen.text(".</i>\"  You contemplate what to do, then remove your outer layer of clothes, carefully placing them on a shelf in case they get splashed.  Now you just need to wait for Lianna to return.");

		MainScreen.text("\n\nLianna enters the bathroom followed by your ");
		if (urtaKids() == 1) {
			if (Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] == 1) MainScreen.text("son");
			else MainScreen.text("daughter");
		}
		else if (urtaKids() < 8) MainScreen.text("kids");
		else MainScreen.text("army of kids");
		MainScreen.text(".  \"<i>All right, ");
		if (urtaKids() > 1) MainScreen.text("everyone ");
		MainScreen.text("strip up and hop in.</i>\"  ");
		if (urtaKids() == 1) {
			if (Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] == 1) MainScreen.text("He");
			else MainScreen.text("She");
		}
		else MainScreen.text("They");
		MainScreen.text(" mutter" + urtaKidsText("s", "s", "") + " rebelliously, but then perk" + urtaKidsText("s", "s", "") + " up at the sight of you.  Immediately " + urtaKidsText("he", "she", "they") + " start" + urtaKidsText("s", "s", "") + " pulling off " + urtaKidsText("his", "her", "their") + " clothes and then, naked as the day " + urtaKidsText("he was", "she was", "they were") + " born, swarm" + urtaKidsText("s", "s", "") + " you, hugging you tightly.  You dole out comforting pats and playful strokes, then instruct " + urtaKidsText("him", "her", "them") + " to get into the tub.  Mournful eyes look at you, but, seeing you won't be swayed, " + urtaKidsText("he leaps", "she leaps", "they leap") + " with a splash into the bathtub.  Once in the water, " + urtaKidsText("he", "she", "they") + " start" + urtaKidsText("s", "s", "") + " to enjoy " + urtaKidsText("himself", "herself", "themselves") + ", merrily kicking and splashing about in what is, for " + urtaKidsText("him", "her", "them") + ", a decent-sized pool.  This gives you an opportunity to note the sex of your little rugrat" + urtaKidsText("", "", "s") + ".");

		//If any UrtaKids=Male:
		if (Flags.list[FlagEnum.URTA_KIDS_MALES] > 0) {
			MainScreen.text("\n\nYou have " + num2Text(Flags.list[FlagEnum.URTA_KIDS_MALES]) + " vulpine son");
			if (Flags.list[FlagEnum.URTA_KIDS_MALES] > 1) MainScreen.text("s");
			MainScreen.text(".");
			if (Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] == 1) {
				MainScreen.text("  Your firstborn is ");
				if (Flags.list[FlagEnum.URTA_KIDS_MALES] == 1) MainScreen.text("the only one,");
				else MainScreen.text("among them,");
				MainScreen.text(" sporting a");
				if (Flags.list[FlagEnum.URTA_FIRSTBORN_COCKTYPE] == 2) MainScreen.text(" vulpine penis");
				else MainScreen.text("n equine phallus, similar to what Urta has");
				MainScreen.text(".");
			}
			if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] == 1 && urtaKids() > 1) {
				MainScreen.text("  Your newest is ");
				if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] == 1) MainScreen.text("also ");
				MainScreen.text("a boy, with a");
				if (Flags.list[FlagEnum.URTA_LATESTBORN_COCKTYPE] == 2) MainScreen.text(" vulpine penis");
				else MainScreen.text("n equine phallus, just like his mom's");
				MainScreen.text(".");
			}
			MainScreen.text("  You have a feeling ");
			if (Flags.list[FlagEnum.URTA_KIDS_MALES] > 1) MainScreen.text("they're");
			else MainScreen.text("he's");
			MainScreen.text(" going to be quite developed when ");
			if (Flags.list[FlagEnum.URTA_KIDS_MALES] > 1) MainScreen.text("they hit");
			else MainScreen.text("he hits");
			MainScreen.text(" puberty, if not as big as Urta.  Urta is quite proud of ");
			if (Flags.list[FlagEnum.URTA_KIDS_MALES] > 1) MainScreen.text("them");
			else MainScreen.text("him");
			MainScreen.text(", and often boasts that ");
			if (Flags.list[FlagEnum.URTA_KIDS_MALES] > 1) MainScreen.text("they");
			else MainScreen.text("he");
			MainScreen.text(" will grow up to be ");
			if (Flags.list[FlagEnum.URTA_KIDS_MALES] > 1) MainScreen.text("strong fighters like she is.");
			else MainScreen.text("a strong fighter like she is.");
		}
		//If any UrtaKids=Herm:
		if (Flags.list[FlagEnum.URTA_KIDS_HERMS] > 0) {
			MainScreen.text("\n\nYou have " + num2Text(Flags.list[FlagEnum.URTA_KIDS_HERMS]) + " vulpine, hermaphroditic daughter");
			if (Flags.list[FlagEnum.URTA_KIDS_HERMS] > 1) MainScreen.text("s");
			MainScreen.text(".");
			if (Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] == 3) {
				MainScreen.text("  Your firstborn is a hermaphrodite, sporting a");
				if (Flags.list[FlagEnum.URTA_FIRSTBORN_COCKTYPE] == 2) MainScreen.text(" vulpine penis");
				else MainScreen.text("n equine phallus, a peculiarity she inherited from her mother");
				MainScreen.text(".");
			}
			if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] == 3 && urtaKids() > 1) {
				MainScreen.text("  Your latest addition is ");
				if (Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] == 3) MainScreen.text("also ");
				MainScreen.text("a herm, with a");
				if (Flags.list[FlagEnum.URTA_LATESTBORN_COCKTYPE] == 2) MainScreen.text(" vulpine penis");
				else MainScreen.text("n equine phallus.  No doubt such a characteristic was passed from her mother");
				MainScreen.text(".");
			}
			MainScreen.text("  You have a feeling ");
			if (Flags.list[FlagEnum.URTA_KIDS_HERMS] > 1) MainScreen.text("they're");
			else MainScreen.text("she's");
			MainScreen.text(" going to be quite developed when ");
			if (Flags.list[FlagEnum.URTA_KIDS_HERMS] > 1) MainScreen.text("they hit");
			else MainScreen.text("she hits");
			MainScreen.text(" puberty, if maybe not quite as big as Urta.  Urta particularly dotes on ");
			if (Flags.list[FlagEnum.URTA_KIDS_HERMS] > 1) MainScreen.text("them");
			else MainScreen.text("her");
			MainScreen.text(", maybe because she remembers how much her parents hated her for being a herm.");
		}
		//If any UrtaKids=Female:
		if (Flags.list[FlagEnum.URTA_KIDS_FEMALES] > 0) {
			MainScreen.text("\n\nYou have " + num2Text(Flags.list[FlagEnum.URTA_KIDS_FEMALES]) + " vulpine daughter");
			if (Flags.list[FlagEnum.URTA_KIDS_FEMALES] > 1) MainScreen.text("s");
			MainScreen.text(".");
			if (Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] == 2) {
				MainScreen.text("  Your firstborn is a girl.");
			}
			if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] == 2 && urtaKids() > 1) {
				MainScreen.text("  Your latest addition is ");
				if (Flags.list[FlagEnum.URTA_FIRSTBORN_GENDER] == 2) MainScreen.text("also ");
				MainScreen.text("a girl.");
			}
			MainScreen.text("  Urta loves to play with ");
			if (Flags.list[FlagEnum.URTA_KIDS_FEMALES] > 1) MainScreen.text("them");
			else MainScreen.text("her");
			MainScreen.text(", and swears ");
			if (Flags.list[FlagEnum.URTA_KIDS_FEMALES] > 1) MainScreen.text("they will");
			else MainScreen.text("she will");
			MainScreen.text(" be quite the heartbreaker");
			if (Flags.list[FlagEnum.URTA_KIDS_FEMALES] > 1) MainScreen.text("s");
			MainScreen.text(" when ");
			if (Flags.list[FlagEnum.URTA_KIDS_FEMALES] > 1) MainScreen.text("they grow");
			else MainScreen.text("she grows");
			MainScreen.text(" up.");
		}

		MainScreen.text("\n\nLianna busies herself by collecting the discarded clothing.  \"<i>I'll go pick up fresh clothes, you go ahead and get started, [name].</i>\"  You nod to her, and then, taking up the nearest bottle of shampoo, you start approaching the bathtub.  A splash of water promptly slaps you wetly across the face, and you shake it dry.  A scolding subdues your rambunctious offspring, and no further splashes greet you until you are kneeling besides the tub.  You reach for the ");
		if (urtaKids() > 1) MainScreen.text("nearest ");
		MainScreen.text("furry little form of your child and gently tug them over to you.  ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("She");
		else MainScreen.text("He");
		MainScreen.text(" kicks and splashes with ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("her");
		else MainScreen.text("his");
		MainScreen.text(" little legs, but smiles up at you, clearly willing to cooperate, giving you no problem as you spurt a generous dollop of the soapy goo into ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("her");
		else MainScreen.text("his");
		MainScreen.text(" hair and start to massage it... now, just how do you shampoo somebody covered from head to toe in fur...?");

		MainScreen.text("\n\nLuckily Lianna arrives, carrying the folded clothes and naked... very naked.  She sits beside you and gently asks, \"<i>How's it going?  " + urtaKidsText("He", "She", "They") + " didn't try to splash you, did " + urtaKidsText("he", "she", "they") + "?</i>\"  Just as she finishes posing the question, your ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("daughter");
		else MainScreen.text("son");
		MainScreen.text(" flicks ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("her");
		else MainScreen.text("his");
		MainScreen.text(" tail, splashing Lianna with water.  The skunkette, however, fails to display any reaction at this.");

		MainScreen.text("\n\nYou apologize for that, noting that " + urtaKidsText("he", "she", "they") + " got you the same way earlier.  You then flick your ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("daughter");
		else MainScreen.text("son");
		MainScreen.text("'s ear and tell ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("her");
		else MainScreen.text("him");
		MainScreen.text(" to apologize to Lianna for that.  \"<i>It's all right, [name].  " + urtaKidsText("He's just a kid", "She's just a kid", "They're just kids") + ", you can't expect to bathe kids and not get wet.</i>\"  You think you have a pretty clear idea of why Urta picked Lianna to care for the children.  Casually, you ask if Lianna's got any younger siblings; she seems like she's got a lot of practice at this.  She shakes her head, \"<i>This is the first time I got a job where kids are involved.  Either way, it's a lot easier than taking care of minotaurs.</i>\"  You can't help but wonder if she really did somehow take care of minotaurs at one point, or if this is just some colloquial expression.");

		MainScreen.text("\n\n\"<i>Here, let me help you.</i>\"  She squeezes a handful of shampoo on her hands and begins scrubbing your ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("daughter");
		else MainScreen.text("son");
		MainScreen.text("'s chest, tickling ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("her");
		else MainScreen.text("him");
		MainScreen.text(" sides as she does so.  The little fox giggles and squirms, clearly finding the actions quite ticklish, and you have to hold on a little harder to keep ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("her");
		else MainScreen.text("him");
		MainScreen.text(" from escaping.  \"<i>Now all you have to do is rinse off.</i>\"  She grabs a small bucket nearby, scooping up some water.  \"<i>Close your eyes, dear.</i>\"  Your child does as Lianna instructs; this is evidently a familiar enough routine that ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("she");
		else MainScreen.text("he");
		MainScreen.text(" has no intention of winding up with soap in ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("her");
		else MainScreen.text("his");
		MainScreen.text(" eyes.  Lianna turns the bucket, letting the water cascade over ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("her");
		else MainScreen.text("his");
		MainScreen.text(" head.  Your little fox squeals and then shakes wildly to fling the water off of ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("her");
		else MainScreen.text("his");
		MainScreen.text(" head, kicking up a cascade of water as ");

		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("she");
		else MainScreen.text("he");
		MainScreen.text(" does so");
		if (urtaKids() > 2) {
			MainScreen.text(", to the delight of ");
			if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("her");
			else MainScreen.text("his");
			MainScreen.text(" siblings, who are safely watching from the other side of the bath");
		}
		MainScreen.text(".");

		MainScreen.text("\n\nYou can't help but comment that it looks like ");
		if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("her");
		else MainScreen.text("his");
		MainScreen.text(" hair is done, shaking some of the water out of your own face.");

		//1 child only:
		if (urtaKids() == 1) {
			MainScreen.text("\n\n\"<i>Good, now it's time to do ");
			if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("her");
			else MainScreen.text("his");
			MainScreen.text(" tail.  Get out of the tub.</i>\"  The skunkette instructs.  The young fox nods and scrabbles at the side of the bath, hauling ");
			if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("her");
			else MainScreen.text("him");
			MainScreen.text("self up and out so Lianna can start tending to ");
			if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("her");
			else MainScreen.text("his");
			MainScreen.text(" tail.  You promptly make yourself useful and start scrubbing as well...");
		}
		else {
			MainScreen.text("\n\n\"<i>Good, now who's next?</i>\"  \"<i>Me!</i>\"  ");
			if (urtaKids() > 2) MainScreen.text("One of your other children");
			else MainScreen.text("Your other child");
			MainScreen.text(" pipes up.  You let go of the ");
			if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("girl");
			else MainScreen.text("boy");
			MainScreen.text(" you're currently holding so ");
			if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("she");
			else MainScreen.text("he");
			MainScreen.text(" can swim away, allowing the new volunteer to take ");
			if (Flags.list[FlagEnum.URTA_LATESTBORN_GENDER] >= 2) MainScreen.text("her");
			else MainScreen.text("his");
			MainScreen.text(" place.  You promptly make yourself useful and start scrubbing as well...");
		}
		MainScreen.text("\n\nYou sigh appreciatively at the hot water surrounding you; baths aren't this pleasant back at camp, you admit to your partner.  \"<i>I take it you don't have a tub this big or this luxurious?</i>\" she asks.  No, you don't; you have a cold stream that flows nearby and that's it.  You're just grateful it's relatively clean and deep, you add.  \"<i>Want me to wash your back?</i>\" she asks.");

		MainScreen.text("\n\nYou ask if she does this for Urta, as well.  \"<i>Yes, when we bathe together.</i>\"\n\nSo, Lianna and Urta do this as well...  It's not just something she's doing for you?  \"<i>No.  Why would you ask that?</i>\"  She looks at you in confusion as she scrubs her tail.");
		MainScreen.text("\n\nJust curious, you reply.  You wonder whether or not you should take her up on her offer...");
		//[Yes] [No]
		menu();
		MainScreen.addButton(1, "No", noBathPleaseUrtaLian);
		MainScreen.addButton(0, "Yes", getABackWashFromLianna);
	}

	//[=No=]
	private noBathPleaseUrtaLian(): void {
		MainScreen.clearText();
		MainScreen.text("You politely refuse her invitation.  \"<i>Okay, but can you wash mine then?</i>\" she asks.  You give the idea a moment's thought and then agree; it's a harmless offer, right?  \"<i>Thanks,</i>\" she replies, getting out of the tub and sitting on a small wooden bench nearby.  \"<i>Use the flower extract shampoo, please.</i>\"  You nod your head in understanding as you climb out after her, taking up the indicated shampoo and approaching her before asking how much you should use.  \"<i>Plenty,</i>\" is her reply.");

		MainScreen.text("\n\nWith a shrug, you promptly squeeze a sizable mass of liquid soap over her shoulders, put the bottle down, and then start to massage it into the soft, luxuriant black and white fur that covers her body.  You ask her how you're doing.  \"<i>Pretty good, but scrub my upper back a bit more.</i>\"  You begin caressing and squeezing her shoulders, trying your best to rub out any knots or tension she can feel, asking her to speak up about what she wants you to do.  \"<i>Just finish up with my lower back and I'm good.</i>\"  You confirm you understand, then roll your hands down into the small of her back, hovering above her ass but never straying down that far, as she gives no sign she wants you to go that low.  Finally, you declare you're done.  She gets up and stretches herself, her tail waving lazily as she does so, then she turns to look at you.  \"<i>You sure you don't want me to scrub your back?</i>\"");

		MainScreen.text("\n\nYou tell her that you're sure; besides, it's probably time you got going anyway.  \"<i>All right then.</i>\"  She goes to the shower to rinse off.  Seeing no point in waiting after what you were just doing, you follow after her.  Once rinsed and dressed, you politely say your goodbyes to the skunkette and head off.");
		fatigue(-25);
		doNext(camp.returnToCampUseTwoHours);
	}

	//[=Yes=]
	private getABackWashFromLianna(): void {
		MainScreen.clearText();
		MainScreen.text("You tell Lianna that if she is willing, you wouldn't object to her washing your back.");
		MainScreen.text("\n\nShe pulls a small wooden bench out of the tub.  \"<i>Take a seat.</i>\"  You climb out of the bath and take your seat as indicated, ready for her to begin.  \"<i>Any preference?</i>\"  You can't resist asking if she's talking about soaps or sexual positions, seeing if you can ruffle the skunkette's tail with your teasing.  \"<i>Soaps.</i>\"   She replies nonchalantly.");

		MainScreen.text("\n\nYou tell her what you want and make yourself comfortable, indicating she should start.  She begins by slowly running her hand on your back, lathering it with a layer of soap, then begins massaging the soap in, pressing and massaging the knots out of your back.  You murmur appreciatively at the skunkette's careful ministrations; she's surprisingly good at this.  She moves closer to knead your shoulders and you feel something poke your back.  \"<i>Sorry, they get in the way sometimes,</i>\"  Lianna apologize, moving away so her nipples don't touch your back anymore.  It hardly felt unpleasant, but you decide to be polite and let her get on with it.");

		MainScreen.text("\n\nShe continues with her scrubbing, but eventually her nipples poke your back again.  She sighs.  \"<i>Sometimes I hate these...</i>\"  She remarks.  You ask her why she feels that way.  \"<i>Before I had the chemical incident that grew these, I had an easy time manipulating my potions and ingredients.  But now I find myself bumping on my equipment which leads to even more chemical incidents.  They're quite bothersome and unwieldy, I would have them reduced if I could figure out the formula that caused this.  Sure, they do feel good, but it's just way too much trouble.</i>\"  She takes a deep breath.  \"<i>Sorry for the rant, do you mind if my breasts touch your back?  I can't give you a proper backrub otherwise.</i>\"  You tell her that you don't mind; she should feel free to go ahead.");

		MainScreen.text("\n\nLianna returns to her scrubbing and massaging, no longer self-conscious about letting her breasts rub against your back.  You groan appreciatively; not only is Lianna quite skilled at easing your tension, but you can feel her soft, pillowy breasts rubbing all over your " + player.skinFurScales() + ", the perky nipples stirring up not-unwelcome feelings in your loins.  \"<i>Ok, all done here.</i>\"  She pats you on the back.  You get up and stretch, listening to your joints cracking, and thank her for her efforts.  \"<i>You're welcome, now it's your turn,</i>\" she declares, taking a seat on the bench herself.  \"<i>Use the floral shampoo, please.</i>\"");

		MainScreen.text("\n\nYou nod your head in understanding as you take the indicated shampoo before asking how much you should use.  \"<i>Plenty,</i>\" is her reply.");

		MainScreen.text("\n\nWith a shrug, you promptly squeeze a sizable mass of liquid soap over her shoulders, put the bottle down, and then start to massage it into the soft, luxuriant black and white fur that covers her body.  You ask her how you're doing.  \"<i>Pretty good, but scrub my upper back a bit more.</i>\"  You begin caressing and squeezing her shoulders, trying your best to rub out any knots or tension she can feel, asking her to speak up about what she wants you to do.  \"<i>Just finish up with my lower back and I'm good.</i>\"  You confirm you understand, then roll your hands down into the small of her back, hovering above her ass but never straying down that far, as she gives no sign she wants you to go that low.  Finally, you declare you're done.  She gets up and stretches herself, her tail waving lazily as she does so, then she turns to look at you.  \"<i>Thanks, that was great.</i>\"");

		MainScreen.text("\n\nYou tell her it was the least you could do after she was so diligent at doing your back.");

		MainScreen.text("\n\n\"<i>If you'll excuse me, I gotta go rinse off,</i>\" She says moving towards the shower.  Seeing no point in waiting after what you were just doing, you follow after her.  Once rinsed and dressed, you politely say your goodbyes to the skunkette and head off.");
		fatigue(-30);
		dynStats("lus", player.stats.sens / 10);
		doNext(camp.returnToCampUseOneHour);
	}

	//Take the kids for a walk - Special thanks to Belin
	//Randomly picked when selecting Kids option in Urta's house.
	private takeTheKidsForWalk(): void {
		MainScreen.clearText();
		MainScreen.text("\"<i>You'd like to see " + urtaKidsText("him", "her", "them") + "?  Sure, but first I need to get " + urtaKidsText("him", "her", "them") + " ready.</i>\"   You ask her where she plans on taking " + urtaKidsText("him", "her", "them") + ".");

		MainScreen.text("\n\n\"<i>I'm just taking " + urtaKidsText("him", "her", "them") + " for a walk.  Kids need fresh air sometimes, too,</i>\"  Lianna states matter-of-factly, exiting the kitchen and heading off to the backyard.");

		MainScreen.text("\n\nYou suggest that you could take " + urtaKidsText("him", "her", "them") + " for a walk instead.  \"<i>You sure?  " + urtaKidsText("A kid", "A kid", "Kids") + " can be a handful sometimes... though yours usually behave" + urtaKidsText("s", "s", "") + ".</i>\"  You insist you'd like to do so; " + urtaKidsText("he", "she", "they") + " might enjoy having you along anyway.  \"<i>Fine, I'll just get " + urtaKidsText("him", "her", "them") + " ready and you can be on your way.</i>\"");

		MainScreen.text("\n\nMaking sure your child");
		if (urtaKids() > 1) MainScreen.text("ren");
		MainScreen.text(" are suitably dressed for a traipse around a desert city, you usher your kit");
		if (urtaKids() > 1) MainScreen.text("s");
		MainScreen.text(" out the door and into the street.  \"<i>Can " + urtaKidsText("I", "I", "we") + " get some ice cream?!</i>\"");
		if (urtaKids() > 1) MainScreen.text("  \"<i>Yeah, can we " + player.mf("daddy", "mommy") + "?!</i>\"");
		MainScreen.text("  Your child");
		if (urtaKids() > 1) MainScreen.text("ren plead");
		else MainScreen.text(" pleads");
		MainScreen.text(".  Well, the vendors down at the market would make for a suitably far destination, which should give Lianna plenty of time for herself, and you yourself wouldn't mind some ice cream either at that, so it's decided.  \"<i>Yay! You're the best " + player.mf("dad", "mom") + " ever!</i>\" ");
		if (urtaKids() > 1) MainScreen.text("a chorus of excited cheers sounds out.");
		else MainScreen.text("an excited cheer sounds out.");
		MainScreen.text("  It's hard not to want to live up to that title with such ");
		if (urtaKids() == 1) MainScreen.text("a happy face");
		else MainScreen.text("happy faces");
		MainScreen.text(" staring up at you.");

		MainScreen.text("\n\nYou take a meandering path to the markets, making sure you keep a vigilant eye on your curious offspring lest " + urtaKidsText("he", "she", "they") + " run off and get " + urtaKidsText("him", "her", "them") + "sel" + urtaKidsText("f", "f", "ves") + " into too much trouble.  Some of the denizens who recognize you, if only as Urta's mate, give you their regards.");

		MainScreen.text("\n\nEventually you make it to the market; it's not bustling at this time of day which makes it easier to keep an eye on your offspring as ");
		if (urtaKids() > 1) MainScreen.text("they fan out and curiously inspect");
		else MainScreen.text(urtaKidsText("he", "she", "") + " runs off to curiously inspect");
		MainScreen.text(" various produce, clothing and trinket stalls.  " + urtaKidsText("He knows", "She knows", "They know") + " what " + urtaKidsText("he is", "she is", "they are") + " here for, however and " + urtaKidsText("doesn't", "doesn't", "don't") + " give you much of a chance to browse before a furred paw takes your hand and drags you off in the direction of the ice cream shop tucked away in a sheltered and cool part of the bazaar.  Once you're inside, you take a look around as your child");
		if (urtaKids() > 1) MainScreen.text("ren");
		MainScreen.text(" run");
		if (urtaKids() == 1) MainScreen.text("s");
		MainScreen.text(" up and press");
		if (urtaKids() == 1) MainScreen.text("es");
		MainScreen.text(" " + urtaKidsText("his face", "her face", "their faces") + " against the frosty glass of the counter, almost drooling in anticipation.  This shop must have some magical element to it to keep their frozen treats cold in the middle of the desert.  There's some credence to this as the shops owner leans over the counter to greet you.");

		MainScreen.text("\n\nHe's a tall, lanky wolf-morph, fur a dusty white and eyes of a clear light blue and he's wearing a robe with various snowflakes embroidered on it.  \"<i>I'd recognize that fur anywhere! This must be Urta's lot?</i>\"  He asks you and you reply in the affirmative.  \"<i>Well now consider this on the house, it's the least I can do after all the good Captain has done for us!</i>\"  What a spot of luck!  You and your child");
		if (urtaKids() > 1) MainScreen.text("ren");
		MainScreen.text(" pick out flavours while the shopkeeper scoops them up onto wafer cones.  Once he's done, you thank the wolf and leave the shop followed by your ");
		if (urtaKids() > 10) MainScreen.text("army of ");
		MainScreen.text("child");
		if (urtaKids() > 1) MainScreen.text("ren");
		MainScreen.text(".");

		MainScreen.text("\n\nYour child");
		if (urtaKids() > 1) MainScreen.text("ren");
		MainScreen.text(" don't bother waiting or savouring their ice cream and neither do you, it's damned hot walking around this desert.  There's less cause for mischief too, " + urtaKidsText("his", "her", "their") + " face");
		if (urtaKids() == 1) MainScreen.text("buried in cone");
		else MainScreen.text("s buried in their cones");
		MainScreen.text(" along with your own, greedily licking up melting droplets.  There's just a bit of cone left as you return to Urta's house, and you quickly polish that off, upon entering.  \"<i>Oh, hey.  You're back.</i>\"  Lianna greets you in her usual inexpressive fashion.");

		MainScreen.text("\n\n\"<i>How did it go?</i>\"");

		MainScreen.text("\n\nWithout a hitch, you reply.  The " + num2Text(urtaKids() + 1) + " of you stopped for some ice cream along the way.  \"<i>Good, now off you go.  Bathtime.</i>\"  She states, ushering your little fox");
		if (urtaKids() > 1) MainScreen.text("es");
		MainScreen.text(" towards the bathroom.  There is a " + urtaKidsText("shrill protest", "shrill protest", "chorus of shrill protests") + ", but " + urtaKidsText("he", "she", "they") + " clearly understand");
		if (urtaKids() == 1) MainScreen.text("s");
		MainScreen.text(" that Lianna is not one to be trifled with and so " + urtaKidsText("he", "she", "they") + " march");
		if (urtaKids() == 1) MainScreen.text("s");
		MainScreen.text(" off to the bathroom.  You can't help but note how good Lianna is at making kids do what she says.");

		MainScreen.text("\n\nGiven that the skunk is heading up to the bath herself, you decide to show yourself out and quietly leave.");
		fatigue(10);
		doNext(camp.returnToCampUseOneHour);
	}


	//Lianna/Urta's House
	//Only if the PC's got the key.
	//To get the Key, you must talk to Urta about Children first.
	public visitTheHouse(): void {
		MainScreen.clearText();
		MainScreen.text("You easily follow the streets to Urta's new home, and are soon standing in front of the door.  Fishing out the key, you unlock the door and then show yourself inside.  Inside, Urta's house is quite roomy, if a little bland; the colors are plain and neutral, and there's not over-much in the way of furniture; you have a feeling Urta focused on just buying what was needed for the house and left her old stuff back at her apartment.  Still, there's enough knickknacks and signs of life around to give it a comfy, cozy feel.");
		MainScreen.text("\n\nLooking around, you can easily see a living room, a kitchen and several rooms, at least one of which you figure must be a nursery for your child");
		if (urtaKids() > 1) MainScreen.text("ren");
		MainScreen.text(".  One door leads out to the back courtyard, while another looks like it closes off stairs leading down to a basement.");

		/*{if (Urta is pregnant at stage 5 or above) && (random chance):
		if(Flags.list[FlagEnum.URTA_INCUBATION] >= 192 && rand(2) == 0) {
			MainScreen.text("\n\nThe house is completely silent.  Shrugging you decide to poke into the kitchen to see if you can find any sign of anyone.  On the counter you see a small note, so you decide to read it.");
			MainScreen.text("\n\n<i>Urta, I'm taking the kid");
			if(urtaKids() > 1) MainScreen.text("s");
			MainScreen.text(" for a walk.  Be back soon!  - Lianna");
			MainScreen.text("\n\nPS: There's food in the pantry, in case you're feeling hungry when you wake up.</i>\n\nLooks like Urta is the only one in.  Should you go take a look?");
			//9999
		}
		[=No=]
		You decide its best to let her rest in peace for now.  So you quietly leave the house, making sure to lock the door on the way out, and go about your business.
		(Back to camp/TA as appropriate.)
		[=Yes=]
		(Play the interaction)
		(Back to camp/TA as appropriate.)
		}*/
		MainScreen.text("\n\nYou hear the sound of running water coming from the kitchen, moments later the sound stops and Lianna steps out of the kitchen.");

		//1st time only:
		if (Flags.list[FlagEnum.FIRST_TIME_AT_URTA_HOUSE] == 0) {
			Flags.list[FlagEnum.FIRST_TIME_AT_URTA_HOUSE]++;
			MainScreen.text("\n\nNow that you have the chance, you study Urta's new live-in sitter.  Lianna is a healthy looking young anthro, a skunk-morph covered in sleek, shiny black fur, with white adorning her swishing, fluffy-looking tail.  Her hair is pure black with streaks of white, tied out of the way into a short ponytail, and her green eyes glitter behind round, silver-rimmed glasses that perch atop her nose.  She wears a conservative short-sleeved blouse, and pants that, while slightly baggy, still manage to show off her nice legs.  They're certainly tight enough that you can tell she's all girl; no hidden surprises here.  She goes without shoes, exposing her paw-like feet.  She has a very nicely rounded, generous handful of an ass, and womanly hips; up top, she is no less stacked, with what are easily E-cup breasts making her even bustier than her employer is, for all that she tries to tone them down with her style of dress.");
			MainScreen.text("\n\n\"<i>Hi, [name] was it?</i>\"  She dries her hands with a towel, before discarding it atop the kitchen counter then extends a delicate hand towards you.  You warmly shake her hand and confirm that she remembered your name.");
			MainScreen.text("\n\n\"<i>It's nice finally getting to know you properly.  But I suppose a better introduction is in order...</i>\"  She adjusts her glasses, clears her throat and straightens her blouse.  \"<i>I'm Lianna, Urta's live-in nanny.  I also cook and clean, since she's so busy, and I'm studying alchemy.  My goal is to someday open my own shop and further my research.</i>\"  That's quite an impressive speech, you note.");
			MainScreen.text("\n\n\"<i>Now about that thing I wanted to talk to you about, [name]...</i>\"");

			//If PC is still human:
			if (player.race() == "human") MainScreen.text("\n\n\"<i>I can't help but notice that you're a human.</i>\"  You are indeed - it is how you were born, you note.");
			else MainScreen.text("\n\nShe twitches her nose.  \"<i>You smell like a human, but you aren't a human...?</i>\"  You figure it can't hurt and explain you were human before coming to Mareth, but gave up your humanity with the magical items that abound in this land.  She nods her head in realisation.");

			MainScreen.text("\n\nYou ask her what business she has with you.");

			MainScreen.text("\n\n\"<i>I'm doing some research on humans, would you mind helping me sometime?</i>\"  What does she have in mind?  \"<i>I was hoping you could provide me some samples for me to research your genetic makeup.</i>\"  ...Which would entail...?");

			MainScreen.text("\n\nShe averts her eyes for a moment, rubbing her chin in thought.  Finally she shrugs and looks at you straight in the eyes.  \"<i>I need some samples of human semen and ovum,</i>\"  She says bluntly.");

			MainScreen.text("\n\n...It always seems to come back to sex, you note.  Well, you're not saying anything definite, but you'll consider the idea, you tell her.");

			MainScreen.text("\n\n\"<i>Thank you... I won't force you to do anything, and I don't mean to impose, but I would greatly appreciate your help with my research.</i>\"  She smiles.");

			MainScreen.text("\n\nShe adjusts her glasses once more.  \"<i>So... what's your business?</i>\"");
		}
		//Repeatable:
		else {
			MainScreen.text("\n\n\"Hey, [name].</i>\"  Lianna greets you as she exits the kitchen, finishing drying up her hands and tossing the towel onto the kitchen counter.  You greet the sexy skunkette as she appears.");

			MainScreen.text("\n\n\"<i>So... what's your business today?</i>\"");
		}
		//[Appearance] [Talk] [Sex] [Get DSSpray] [Kids]
		menu();
		MainScreen.addButton(0, "Appearance", liannasAppearance);
		MainScreen.addButton(1, "Talk", talkToLiana);
		MainScreen.addButton(2, "Sex", sexWithLianna);
		MainScreen.addButton(4, "Kids", pickKidSceneHere);

		MainScreen.addButton(9, "Back", telAdre.telAdreMenu);
	}

	//Lianna
	//Appearance
	private liannasAppearance(): void {
		MainScreen.clearText();
		MainScreen.text("Lianna is a healthy looking young anthro, a skunk-morph covered in sleek, shiny black fur, with white adorning her swishing, fluffy-looking tail.  Her hair is pure black with streaks of white, tied out of the way into a short ponytail, and her green eyes glitter behind round, silver-rimmed glasses that perch atop her nose.  She wears a conservative short-sleeved blouse, and pants that, while slightly baggy, still manage to show off her nice legs.  They're certainly tight enough that you can tell she's all girl; no hidden surprises here.  She goes without shoes, exposing her paw-like feet.  She has a very nicely rounded, generous handful of an ass, and womanly hips; up top, she is no less stacked, with what are easily E-cup breasts making her even bustier than her employer is; despite all that, she tries to tone them down with her style of dress.");
		//(Display Options)
		menu();
		MainScreen.addButton(9, "Back", visitTheHouse);
	}

	private talkToLiana(output: boolean = true): void {
		if (output) {
			MainScreen.clearText();
			MainScreen.text("You tell her you'd like to talk her.  She adjusts her glasses.  \"<i>Oh?  What about?</i>\"");
		}
		menu();
		MainScreen.addButton(0, "Her Job", talkToLianaAboutHerJob);
		MainScreen.addButton(1, "HerResearch", talkToLianaAboutHerResearch);
		if (Flags.list[FlagEnum.LIANNA_HAVESTED_MALES] + Flags.list[FlagEnum.LIANNA_HAVESTED_LADIES] > 0) MainScreen.addButton(2, "Her Spray", talkAboutLiannasLubeSpray);
		if (Flags.list[FlagEnum.DISCUSSED_LUBE_SPRAY] > 0) MainScreen.addButton(3, "Side Effect", lubeSpraySideEffects);
		MainScreen.addButton(9, "Back", visitTheHouse);
	}

	//Her Job
	private talkToLianaAboutHerJob(): void {
		MainScreen.clearText();
		MainScreen.text("You ask her about her jobs, both for Urta and what she intends to do afterwards.");
		MainScreen.text("\n\nShe takes a deep breath.  \"<i>Well, working for Urta was a godsend, really.  I have a place to live, food, the job is relatively easy, and I can continue to study alchemy in my room.  Plus Urta is nice, she treats me well.</i>\"  You note that she seems genuine, and indicate for her to continue.");
		MainScreen.text("\n\n\"<i>Now about the future... I've always been fascinated by alchemy.  I believe I have a talent, and so this is what I want to do.  Just that.</i>\"  She shrugs. You spare a moment to wonder why so many people in this world seem fascinated by magical and chemical weirdness, even despite what the demons are doing with that very thing, but consider it's not important to ask any further.");
		MainScreen.text("\n\n\"<i>Something else?</i>\"");
		//(Display Options)
		talkToLiana(false);
	}

	//Her Research
	private talkToLianaAboutHerResearch(): void {
		MainScreen.clearText();
		MainScreen.text("You ask her why she's so eager to get samples from you, a human.  What sort of research is she doing that she needs human samples?");
		MainScreen.text("\n\nHer eyes light up; obviously this is a subject of interest for her.  \"<i>I suppose the main reason I'm conducting this research is curiosity.  I guess I thought about it while looking at your kids.  I mean... we usually get hybrids when we mate with other species, but couplings with a human?  They always result in the children being the father or mother's species.  I want to know: why is that?  Why don't we get human-fox hybrids?</i>\"  She adjusts her glasses.");
		MainScreen.text("\n\n\"<i>And this is not just about you either, this is the case with every human that mates with one of us Marethians.  Usually the human parent only passes on a few genes, like hair color, or eye color, but actual species?  That will be the Marethian parent's species, always.</i>\"");
		MainScreen.text("\n\nShe giggles, \"<i>I should have you know that my mother was also a human.  My father said she stumbled upon his house years ago, before we moved to Tel'Adre.  He says I have the same eyes my mother had.</i>\"  She smiles sadly.  \"<i>I want to know why I'm not half-human, and instead I'm 100% skunk; for that end, I need samples from human semen and ovum.</i>\"");
		MainScreen.text("\n\nYou ask if she was close to her mother, then, to make her wonder so much about her race.");
		MainScreen.text("\n\nShe shakes her head.  \"<i>My mother passed away when I was just a little girl.  Apparently she caught a foreign illness and didn't make it.</i>\"  You offer her an apology, ");
		if (player.stats.cor >= 50) MainScreen.text("however half-heartedly it may be, ");
		MainScreen.text("and ask if that's what pushed her to studying humans and Marethians.");

		MainScreen.text("\n\nShe shrugs.  \"<i>I guess, though what I have is genuine curiosity.  Maybe someday one of your kids will ask why they don't look like " + player.mf("daddy", "mommy") + ".  Wouldn't you want to have an answer to that question?</i>\"  She smiles.");
		MainScreen.text("\n\nNodding your head absently at the thought, you ask if her efforts have borne any fruit yet.");

		//If PC sexed:
		if (player.gender != 0) {
			MainScreen.text("\n\nShe sighs.  \"<i>So far, nothing.  Though your help does take at least one step closer to finding out why that is so.  I hope I can count on your continued support?</i>\"");
			MainScreen.text("\n\nYou tell her that you'll try your best.");
		}
		//Else:
		else {
			MainScreen.text("\n\nShe shrugs.  \"<i>Sadly, I don't have any samples to work with, which is why I asked for your help.  So if you feel like helping me, just tell me.  And don't worry, I'll help extract your samples.  I'd like to think I'm pretty skilled at... extracting... samples.</i>\"  She smiles confidently.");
			MainScreen.text("\n\nYou're still thinking it over, but you'll be sure to think it over, you tell her.");
		}
		MainScreen.text("\n\n\"<i>Thanks.  Now, is there something else?</i>\"");
		//(Display options)
		talkToLiana(false);

	}
	//Her Lube Spray
	//Must've had sex with her at least once
	private talkAboutLiannasLubeSpray(): void {
		MainScreen.clearText();
		Flags.list[FlagEnum.DISCUSSED_LUBE_SPRAY] = 1;
		MainScreen.text("You ask why it is that she produces a lubricating liquid rather than a noxious one, like you would expect of a skunk.");

		MainScreen.text("\n\nShe averts her eyes in embarrassment, red visible under the white fur on her cheeks.  \"<i>Well, I had a few problems regarding my spray...</i>\"  She stops talking.  You verbally nudge her, asking her to continue the story.");
		MainScreen.text("\n\n\"<i>Oh?  Sorry.</i>\"  She clears her throat and adjusts her eyes.  \"<i>I had a lot of trouble controlling my spraying reflexes, which wound up leaving me in very embarrassing situations.  So I tried to control my reflexes with the aid of alchemy, and while it worked for the most part, it wound up completely neutralizing my odor inducing hormones.  So all I was left with is this slick looking liquid.</i>\"  She reaches inside her pants, behind her butt and removes a pair of slick-looking digits, displaying the viscous liquid for you.  \"<i>It works great as lube, and I'm not too sad about losing my smelly spray either.  It's not like I'll ever need it.</i>\"  She shrugs.  \"<i>I've tried analysing my spray, and came to the conclusion that if distilled, it may have some magical properties... probably a side-effect of me messing with my body, but it's only effective if you have a very high concentration of it.</i>\"");

		MainScreen.text("\n\nShe's been experimenting on her body?  Doesn't that seem kind of reckless, you ask her.");

		MainScreen.text("\n\nShe shrugs.  \"<i>Maybe, but it's not like I have anyone else to test my experiments on.  I do suffer from some side-effects due to my experiments, but it's all good... I think.</i>\"");

		MainScreen.text("\n\nThat still seems a bit foolish, but you decide it's not your place to lecture.");

		MainScreen.text("\n\nFinished with her explanation, she adjusts her glasses and asks, \"<i>Something else?</i>\"");

		//(Display options)
		talkToLiana(false);
	}

	//Side Effects
	//Must have talked about her Lube Spray
	private lubeSpraySideEffects(): void {
		MainScreen.clearText();
		MainScreen.text("So, if she's experimented on herself in the past, that must have gone wrong for her at least once or twice in the past, you comment.");
		MainScreen.text("\n\nShe nods.  \"<i>Yep, it sure did.</i>\"  She rubs her chin in thought.");

		MainScreen.text("\n\n\"<i>One time my tail wound up turning into a tentacle monster... couldn't control it, but it wasn't that bad.</i>\"  You keep your mouth shut, your mind already picturing what she's going to say next.  \"<i>Got me off once or twice...</i>\"  That was predictable, you note to yourself.");

		MainScreen.text("\n\n\"<i>There was that time when my clit grew so big that I could lick myself without bending over... it was enjoyable for a while.</i>\"  You wonder how she managed to shrink it back down.");
		MainScreen.text("\n\n\"<i>There was that time when I my boobs started vibrating... kinda awkward with my cup size.</i>\"  That would have been a sight to see, but you keep that to myself.");

		MainScreen.text("\n\n\"<i>Once, I think I grew balls; they were so full of cum and I needed to cum so bad... however I hadn't grown a dick, so there was no way to release the steam, you know?  I blacked out that day... when I came to I didn't have balls anymore.</i>\"  She was lucky that effect was only temporary, you note.");

		MainScreen.text("\n\n\"<i>There was one time when I grew a second pair of arms.  That would've been helpful if they didn't have a mind of their own... and weren't obsessed with my vibrating breasts.</i>\"  Your mind immediately loses itself in images of that particular event, which you promptly force down with ");
		if (player.stats.cor < 33) MainScreen.text("mild");
		else if (player.stats.cor < 66) MainScreen.text("some");
		else MainScreen.text("great");
		MainScreen.text(" reluctance.");

		MainScreen.text("\n\nShe thinks for a while longer.  \"<i>I guess those are the most interesting temporary ones... I did wind up with a few permanent ones though.</i>\"  ...Okay, you can't stay quiet any more; you ask her what those were.");

		MainScreen.text("\n\n\"<i>Well... there's my lube spray, but you already know about that one.</i>\" You agree, and openly wonder if her other changes are similarly sex-focused... then again, in this world?  They're pretty much guaranteed to be.");

		MainScreen.text("\n\n\"<i>My sphincter... I can dilate my sphincter to literally fit anything in my ass.  But that isn't too useful I suppose.</i>\"  Well, not if she doesn't enjoy being anally penetrated, you note.");

		MainScreen.text("\n\n\"<i>Every 15 days I start producing milk.  Kinda annoying since I have to milk myself.</i>\"  Better than having to milk herself every day, at least.");

		MainScreen.text("\n\n\"<i>If I drink alcohol my tongue swells so big I can lick my butt without moving my body at all.</i>\" ...You're not certain if you hope she has or hasn't told Urta about that - you don't know if Urta could resist the temptations.");

		MainScreen.text("\n\n\"<i>Would you believe me if I told you I used to be only an A-Cup, and my butt was nearly flat?  One of the more annoying side-effects.  I had to basically learn to walk again, and these constantly weigh me down.</i>\"  She hefts her breasts in her palms.  \"<i>Lost my whole wardrobe too.</i>\"  Well, there's an obvious transformation, you note.");

		MainScreen.text("\n\n\"<i>Then there's the hyper-sensitive nose one.  My sense of smell is even better than a canine's... though it can be problematic when I'm near an aroused male.</i>\"  She rubs her nose.  \"<i>Smelling better also means I'm that much better at breathing in all those pheromones.</i>\"  That would definitely be problematic; she's lucky she's in the city and not out in the wilderness.");

		MainScreen.text("\n\n\"<i>Finally, I might have developed telepathic powers... maybe.</i>\"  ...Okay, now she's just trying to pull your chain.  \"<i>What did you say?  Something about a chain?</i>\"  ...You have to be fucking kidding.");

		MainScreen.text("\n\n\"<i>I guess that's it... I was also seeing if I could develop the ability to photosynthesize.  Would help save money since I wouldn't need to eat... but all it did was make me grow leaves out of my ears.  So it's still an ongoing project.</i>\"");

		MainScreen.text("\n\n...You find yourself wondering if Lianna here is really all together in the head.");

		MainScreen.text("\n\n\"<i>By the way.  Can I ask you a favor?</i>\"  What is it, you reply.  \"<i>If you see a singing grasshopper out there in the city, would you catch it for me?  I was testing some concoctions, but it got away...</i>\"");
		MainScreen.text("\n\nYou stare at her, then slowly nod your head.");
		MainScreen.text("\n\n\"<i>Thanks.  Anything else?</i>\"");
		talkToLiana(false);
	}

	//Get DSSpray
	//Must have talked about her Lube Spray
	//Can only get one per day, unless debug mode is active.
	//You ask the budding alchemist if she would be willing to distill some of her spray for you.
	//{If you already got one today and debug is off:
	//\"Sorry, [name].  I'm afraid I've ran out of spray for the day.  So you'll just have to come back tomorrow if you want more.\"

	//You apologize for forgetting, and tell her that you'll do that.
	//(Display options)
	//}

	//\"Sure, though I will need a heavily concentrated amount of it if you intend to get any effect other than lubing stuff out.\" 
	//You agree you're interested in it besides as a general source of lubricant, and thank her for her generosity.
	//\"All right, I'll go get some for you, wait here.\"  She opens a closet and pulls out a strange contraption, then makes her way to the bathroom, closing and locking the door.
	//You wait patiently... and wait... and wait some more.  You wonder just what she's doing in there; it's been nearly an hour already!
	//Lianna emerges from the bathroom, holding a vial filled with a small amount of a clear liquid and the equipment you saw earlier.  \"Here you go.\"  She hands you the vial.
	//You thank her, carefully accepting the vial of lubricant from her and stowing it away safely.
	//(Item get message)
	//(Display Options/Back to Camp or TA)
	//Using DSSpray
	//Random chance of:

	//Increasing anal wetness (Rare)
	//Increasing vaginal wetness (Must have vagina)
	//Increasing Lactation (Must already be lactating)
	//Increasing Cum production (Must have balls)
	//Nothing
	//Description: A highly concentrated spray juice Lianna distilled for you, it may have some transforming properties.
	/*
	Use:
	You inhale the strong, musky scent of the fluid, then grit your teeth and toss it back in a single gulp.  It's got an oily kind of taste, but there's barely a mouthful of it and it slides down your belly quick and easy, leaving a slight queasiness in your guts as the aftereffect.
	
	A strange dampness starts around your [anus], you remove your lower garments and observe.  You clutch your [ass] as it starts drooling its own natural lubricant.  Almost as if in sympathy, your mouth starts feeling wet, and you find yourself hard-pressed to keep from drooling as your saliva glands kick into overdrive, making your mouth far wetter and slicker.
	
	{If PC has a dick:
	Your [multiCock] begin dripping clear looking pre on the floor, despite none of them being fully erect.
	}
	{If PC has a vagina:
	You feel a trickle of wetness running down your [legs] and look down to see that your [pussy] is unbelievably wet, constantly leaking juices that pool on the floor.
	}
	{If PC is lactating:
	A strange wetness begins forming on the tips of your [nipples] and you quickly strip off your top and watch in amazement as beads of moisture form on the tips of your nipples, dripping down on the floor and running down your [breasts].  The color is off-white, the strange wetness must be leaking along with your milk.
	}
	
	Almost as suddenly as the effects started, they all dissipate.  Though you're visibly wet after the events that transpired.
	
	{if Nothing happens:
	Aside from the effects you suffered through earlier, you don't notice any other changes to your body.
	}
	{If Increasing anal wetness (Rare):
	You realize your ass still feels moist and clench your butt, you squeak with surprise as {some/even more} juices are squeezed out of your [asshole].  {<b>Your anus is now permanently wet, ensuring it will always be lubed. </b> / <b>Your anus is even wetter, ensuring even better lubrication</b>}
	}
	{If Increasing vaginal wetness (Must have vagina)
	You notice your vagina is still dripping, and realize that it's not getting any drier.  <b>Your vaginal wetness has been increased.</b>
	}
	{If Increasing Lactation (Must already be lactating)
	Your [breasts] tingle softly, and when you massage them you gasp as a small jet of milk sprays forward, somehow you know that <b>your milk production has increased.</b>
	}
	{If Increasing Cum production (Must have balls)
	Somehow your [balls] feels heavier than before, though they don't look any bigger.  You reach down to weigh them and moan in pleasure as a sudden pressure erupts from then and you shoot a small rope of cum on the floor.  Looks like your <b>cum production has been augmented</b> somehow.
	}*/

	//Sex
	//Will expand with more options in the future.
	//Possible Urta threesome in the future?
	private sexWithLianna(): void {
		MainScreen.clearText();
		MainScreen.text("\"<i>So you want to help me with my experiments?  Great!</i>\"  She takes your hand and basically drags you into her room.  You allow her to lead you, wondering what she has in mind.");

		MainScreen.text("\n\nLianna wastes no time; she opens the closet, nearly tearing the door off its hinges and jumping in.  A short while later she comes out with a white coat covering her... and that's all the covering she's wearing.  You can clearly see her breasts, nipples only partially hidden beneath the open coat, her bottom completely exposed, letting you gaze at her pink tight pussy as she walks with a practiced gait that just screams of sensuality.  Each step sways her full hips, and her swaying is only augmented by the similarly swaying tail behind her, luxurious fur combed down to perfection.");
		if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("  Your lower garments suddenly feel much tighter.");

		MainScreen.text("\n\n\"<i>Why are you still dressed?</i>\"  She asks, genuinely wondering what's taking you so long.  You quickly hasten to remove your [armor], exposing your naked form to the eager skunk.");
		if (player.gender == 0) {
			//PC is genderless
			//{Offer gender injection to make them grow either: 
			//a 4-inch by 0.5-inch dick and 1-inch balls.
			//a virgin vagina (wetness = 0) and A-Cup breasts (if flat).
			//20% chance of turning PC into a herm with a 7-inch by 1-inch dick, 2-inch full balls, virgin vagina (Wetness = 2) and C-cup breasts (if smaller).)
			MainScreen.text("\n\nYou look down at the floor as you point out that you're kind of lacking in the equipment to provide any sort of donation for Lianna.");
			MainScreen.text("\n\n\"<i>That's no problem; I have another experiment that'll fix that problem.</i>\"  Lianna replies brightly.  \"<i>This mixture of mine is guaranteed to turn you from neuter to gendered, without corruption... the only problem is that it's a little unstable.  By which I mean there's no way of predicting what gender you'll become,</i>\" she hastens to add.");
			menu();
			MainScreen.addButton(0, "Accept", acceptARandomGenderFromASkunk);
			MainScreen.addButton(1, "Decline", refuseGenderlessInjection);
			return;
		}


		//If herm:
		if (player.gender == 3) MainScreen.text("\n\n\"<i>A herm, huh?  That's interesting.  I'll be sure to note that in my experiments.</i>\"  She crosses her arms.  \"<i>So which part will you be using to help me?</i>\"");
		//(Display sex options)
		menu();
		if (player.lowerBody.vaginaSpot.hasVagina()) {
			if (player.pregnancyIncubation == 0) MainScreen.addButton(0, "HarvestGirly", getEggsHarvested);
			else MainScreen.text("\n\n<b>She's not willing to have sex with you until your womb is unfilled.</b>");
		}
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.addButton(1, "HarvestManly", liannaHandjobbies);
		MainScreen.addButton(4, "Back", visitTheHouse);
	}

	//[=Refuse=]
	private refuseGenderlessInjection(): void {
		MainScreen.clearText();
		MainScreen.text("Lianna's face falls at your refusal, but she sighs.  \"<i>All right, I can understand; I mean, you must have your reasons.  Still, if ever you get a gender, remember that I'd be happy to use some of your seed, please.</i>\"");
		MainScreen.text("\n\nYou promise to keep that in mind, not necessarily meaning that, and then quietly redress and leave; there's no point to your being here, you can see.");
		doNext(camp.returnToCampUseOneHour);
	}
	//[=Accept=]
	private acceptARandomGenderFromASkunk(): void {
		MainScreen.clearText();
		MainScreen.text("You decide that it's worthwhile to go along and indicate that you'll let Lianna experiment on you with her \"genderiser\".");
		MainScreen.text("\n\n\"<i>Most excellent.</i>\"  She ducks into her closet and rummages through it, then returns with a strange pointed vial and a notebook.  \"<i>Okay, now I need you to bend over.");
		//{if Centaur: 
		if (player.lowerBody.isTaur()) MainScreen.text("  Or at least hold on to something, this might sting a little and I don't need you kicking down anything in here.");
		MainScreen.text("</i>\"");

		MainScreen.text("\n\nCautiously, you do as the alchemist says.  She walk behind you and grips your [butt].  Instinctively, you tense up.  Then she runs a finger through your crack, analysing the yield of your [asshole].  A shiver runs up your spine as she does so.");

		//If Tight:  
		if (player.lowerBody.butt.analLooseness <= 2) MainScreen.text("\n\n\"<i>Going to need some lube for this...</i>\" she remarks.");
		else MainScreen.text("\n\n\"<i>Pretty loose, I think I could just stick it in, but I'll apply some lube to make this as comfortable as possible.</i>\"");
		MainScreen.text("  You really should be more surprised, but, sadly, this is kind of predictable; you were more hoping than anything that this would be an oral delivery, or at least an injection.");

		MainScreen.text("\n\nYou can't see very well from your position, but you see Lianna hunch over you, using your ass for support and sticking one hand behind her.  Her face scrunches for a moment and you hear the sound of something wet being squished out. Moments later, a warm, wet hand touches your butt crack.  You fight the urge to tense up; best to get this over with.");

		MainScreen.text("\n\nSlowly the skunk alchemist works her slick fingers on your little rosebud, stretching it out and lubing its insides.  First she inserts a finger, wiggling it around; then two, slowly pulling you apart; then three, massaging your opening.  This goes on until she can comfortably move her three digits inside you.  A lewd moan escapes you despite your efforts to restrain it.  \"<i>I think you're ready.</i>\"");

		MainScreen.text("\n\nYou nod your head, prepared for whatever kinky way of administering her \"potion\" she has in mind.  \"<i>Just relax.</i>\"  She says, pressing the tip against your stretched butthole.  You inhale, anticipating the penetration.  \"<i>Almost forgot, I need to lube this thing up too.</i>\"  She hunches over once more, reaching behind her.  There is a sharp intake of breath, and you feel her grip on your butt tighten, if only slightly. You force yourself to loosen up, trembling slightly and involuntarily.  \"<i>All right, all set now.</i>\"  She presses the tip of the vial against your [asshole] and without giving you time to have second thoughts, she pushes it in.  Despite your efforts to mentally prepare yourself, it's still a physical shock to you when it comes in.  She makes sure to insert the small vial as far up your ass as possible, before removing her fingers and letting your natural reactions handle things.");

		MainScreen.text("\n\nYour ass ripples and clenches around the small, smooth, slick intruder, natural instinct compelling you to expel the intruder.  However, the design of it, combined with its slickness, means that despite your efforts, it just slides deeper and deeper inside of your [asshole] with every flex of your inner muscles.  Eventually it slips deep enough inside you that you can't even feel it anymore.");

		MainScreen.text("\n\nLianna, smiles and nods her head approvingly.  \"<i>Just wait for the effects to kick in now.</i>\"  You moan as you do so - it's not some sort of bottle, then, it's some kind of suppository.");

		if (rand(10) <= 3) {
			//if PC becomes male:
			//(Discomfortable feeling, mild reaction)
			MainScreen.text("\n\nA nagging, burning, unpleasant feel begins blooming inside your blank, featureless crotch.  You whimper and moan, wriggling as you try to find some relief from the pain - it feels like there's something poking into your groin from the inside.");
			MainScreen.text("\n\nA bump forms on your otherwise flat groin. Slowly it enlarges into a mound, then a protrusion.  You feel a certain tightness inside it, and can't help but groan.  Moments later the skin visibly rips as a four inch meat pole bursts out of your groin, throbbing and leaking pre.  It looks fairly human too.");
			if (player.lowerBody.balls == 0) {
				MainScreen.text("\n\nYou feel strange as a pair of lumps form at the base of your newly acquired dick; these lumps quickly grow to sag, forming an excess of skin.  Moments later you groan as a pair of weighty nuts fills your new ballsack, instantly filling it up with some cum.  It's not much to look at, being only 1 inch in diameter, but it certainly seems productive.  Small dollops of pre escape your new cock in agreement.");
				player.lowerBody.balls = 2;
				player.lowerBody.ballSize = 1;
			}
			player.lowerBody.cockSpot.add(new Cock());
			player.lowerBody.cockSpot.get(0).cockLength = 4;
			player.lowerBody.cockSpot.get(0).cockThickness = 0.75;

			MainScreen.text("\n\nYou sigh in relief, examining your new endowments; well, that wasn't as bad as it could have been.");
			MainScreen.text("\n\n\"<i>Excellent!  The reactions were exactly as I expected.  I would have you help me right now, but it's better if you get some rest first.  So return here when you're feeling rested and I'll extract whatever you have inside those balls of yours.</i>\"");
			MainScreen.text("\n\nYou nod your head, carefully get dressed, and then show yourself out.");
		}
		//if PC becomes Female:
		else if (rand(10) <= 8) {
			MainScreen.text("\n\nAn itch, not unpleasant but quite noticeable, begins plaguing you from the blank space where your loins should be.  Instinctively, you try to scratch at it.");
			MainScreen.text("\n\nNo matter how much you scratch, the itch only gets worse and you redouble your efforts in response.  This goes on for a few moments until you suddenly feel your fingers dig in, shuddering in pleasure as a throaty moan escapes your mouth.  You feel wetness, and at first you're worried it might be blood, but glancing at your fingers, you only spot a transparent slickness; vaginal juices.  You gasp as the final stages of your transformation settle in, groaning in discomfort as your wet gash begins swelling into a soft mound and a small nub, your clit, grows in, partially covered by its hood.");
			if (player.upperBody.chest.BreastRatingLargest[0].breastRating < 1) {
				MainScreen.text("\n\nThe same itchy feeling that previously assaulted your groin returns, but this time on your chest.  It's not too uncomfortable this time, and your flat chest begins swelling into a perky, A-Cup bust.");
				if (player.upperBody.chest.BreastRatingLargest[0].nippleLength < .5) {
					MainScreen.text("  Your nipples erect into small half-inch nubs, complementing the transformation.");
					player.upperBody.chest.BreastRatingLargest[0].nippleLength = .5;
				}
				player.upperBody.chest.get(0).breastRating = 1;
			}
			player.createVagina();
			player.lowerBody.vaginaSpot.get(0).clitLength = 0.25;
			MainScreen.text("\n\nYou sigh in relief, examining your new endowments; well, that wasn't as bad as it could have been.");
			MainScreen.text("\n\n\"<i>Excellent!  The reactions were exactly as I expected.  I would have you help me right now, but it's better if you get some rest first.  So return here when you're feeling rested and I'll see about breaking into that cute little pussy of yours.</i>\"");
			MainScreen.text("\n\nYou nod your head, carefully get dressed, and then show yourself out.");
		}
		//if PC becomes Herm:
		else {
			MainScreen.text("\n\nYou moan lewdly as a warmth spreads between your legs, pleasure spiked with pain, itching under your skin, making you wriggle and squirm to try and find some kind of release.  The sensation just keeps building and building, feeling like it's driving you mad!");
			MainScreen.text("\n\nYou feel like your groin is on fire and you eagerly knead the flesh there, trying your best to quench the flames, but it's useless.  The more you stroke it, the more it burns.  A scream of pained pleasure forces itself out of your mouth as a lump forms under your hands, erupting into a searing hot, four inch erection.  You quickly stroke yourself, trying to put out the flames that torment your sensitive new organ, but all you manage to do is make it harder... and the harder it gets, the bigger it grows.  It's not until your cock grows another inch that you finally cum, finally dousing the flames and Lianna in ropy spunk.");
			MainScreen.text("\n\nYou sigh in relief, glad that your torment is over.  But before you get too comfortable, the feeling of something boiling makes itself known between your legs, and you set forth to stroke the flesh anew.  For a moment you're worried that you might actually be melting; the flesh there grows softer the more you knead and stroke it.  Suddenly there is wetness, a cascade of juices exploding from within, wetting your hands and Lianna's carpet, as the flesh there grows plump, wet and slick.  The heat concentrates on a small point, that quickly forms into a nub; your clit.");
			MainScreen.text("\n\nWeak after these violent transformations, you don't even process that you've grown both sets of genders; instead you walk over to Lianna's bed and plop down there.");
			player.createVagina();
			player.lowerBody.vaginaSpot.get(0).clitLength = 0.25;
			player.lowerBody.cockSpot.add(new Cock());
			player.lowerBody.cockSpot.get(0).cockLength = 5;
			player.lowerBody.cockSpot.get(0).cockThickness = 1;

			if (player.upperBody.chest.BreastRatingLargest[0].breastRating < 3) {
				MainScreen.text("\n\nYour chest itches.  It's not too uncomfortable, and even if it was, you're much too tired to scratch or knead at it anyway.  Your [chest] begin");
				if (player.upperBody.chest.BreastRatingLargest[0].breastRating < 1) MainScreen.text("s");
				MainScreen.text(" swelling into a soft C-Cup.");
				if (player.upperBody.chest.BreastRatingLargest[0].nippleLength < 0.5) {
					MainScreen.text("  Your nipples erect into small, half-inch nubs, complementing the transformation.");
					player.upperBody.chest.BreastRatingLargest[0].nippleLength = 0.5;
				}
				MainScreen.text("  You watch the soft mounds in your chest, unable to do anything but pant.");
				player.upperBody.chest.get(0).breastRating = 3;
			}
			if (player.lowerBody.balls == 0) {
				MainScreen.text("\n\nYou feel strange as a pair of lumps form at the base of your newly acquired dick.  These lumps quickly grow to sag, forming an excess of skin.  Moments later you groan as a pair of weighty nuts fills your new ballsack, instantly filling it up with some cum.  It's only 2 inches in diameter.  At first you don't think much of it, but a sudden feeling of discomfort makes itself known as your balls grow fuller and fuller.  Despite not being huge, your balls seem as productive as a minotaur's.  Soon enough you run out of space in your churning, full sack, and begin climaxing in a spontaneous orgasm, adding to the mess you made of Lianna and her carpet.");
				player.lowerBody.balls = 2;
				player.lowerBody.ballSize = 2;
			}
			MainScreen.text("\n\nThe skunk alchemist doesn't seem bothered about the mess in the least, she just continues to take notes, gazing at you every time something new seems to come up.  \"<i>That was certainly unexpected.  Such a strong reaction was not in my plans, but it seems to have gotten the job done, either way.</i>\"  She notes with amusement as she continues taking notes.");

			MainScreen.text("\n\nSo, she never intended for her experiment to produce hermaphrodites, you ask.  She just shakes her head, not even bothering to answer you verbally or stop her writing.  You sigh; typical mad scientist types.");

			MainScreen.text("\n\nFinally putting her notebook away, she looks down at your prone form.  \"<i>Can you walk?</i>\"  You reply that you aren't sure; you feel a little weak.  \"<i>If you're too weakened to walk you are welcome to use my bed; we can conduct a few more experiments regarding your reaction to my potion after you've had some rest.</i>\"  You firmly insist you're not that weak - besides, even if you were, you have no interest in helping with any more experiments right now.");
			MainScreen.text("\n\n\"<i>Very well.  Don't worry about the mess, I'll clean it all up.  It's just too bad I didn't have anything to catch all this discharge with.  Those samples are all contaminated now, so I'll still need your help collecting more.</i>\"  You ignore her and focus on hauling yourself out of bed and getting decent to go out in public.");
			MainScreen.text("\n\nShe swipes one of the ropes of cum sticking to her body and pops it into her mouth.  \"<i>Tasty.  I wonder if that was an effect of the potion or if you naturally taste good.  Something to test for sometime...</i>\"  By this point you've already gotten dressed, and you promptly leave as quickly as you can.  \"<i>See ya!</i>\"  You hear her yell after you, as you hurriedly make your way out.");
		}
		player.updateGender();
		doNext(camp.returnToCampUseOneHour);
	}

	//Dildo-syringe
	//Needs vag.
	private getEggsHarvested(): void {
		MainScreen.clearText();
		MainScreen.text("\"<i>All right, let's get this show on the road.</i>\"  She ducks out into her closet once more, and comes out carrying what looks like a dildo and a lollipop.  \"<i>So, let me explain.  It's pretty simple really.</i>\"  She takes the dildo in her hand.  \"<i>This is a special dildo I had custom-made for this experiment, It will pleasure you at the same time it lets me harvest your pussy juice and hopefully one of your ovum.  All you have to do is sit back and relax.  Any questions?</i>\"");
		MainScreen.text("\n\nWell, there is one you have and can't resist asking; what's with the lollipop?  \"<i>That's for me.  It helps me concentrate.  I might give you one later though, if you're a good girl.</i>\"");

		MainScreen.text("\n\nTucking that away, you tell the skunk that you're ready to begin.");
		MainScreen.text("\n\n\"<i>Ok, lay down on the bed and relax.</i>\"  Nodding your head in understanding, you follow the simple instruction and make yourself comfortable.");

		MainScreen.text("\n\nLianna takes the lollipop, removes its wrapping and shoves the candy in her mouth.  Sucking in its sugary goodness, she takes the dildo in her hands and aligns it with her ass.  You watch with ");
		//1st time:
		if (Flags.list[FlagEnum.LIANNA_HAVESTED_LADIES] == 0) {
			MainScreen.text("confusion, wondering what she's playing at");
			Flags.list[FlagEnum.LIANNA_HAVESTED_LADIES]++;
		}
		else MainScreen.text("remembrance, knowing what's coming next");
		MainScreen.text(".  She unceremoniously begins shoving it inside without even a hint of pleasure or discomfort; the dildo slides in without resistance, spreading her buttcheeks apart and penetrating her with a wet squelch.  You watch the display, not sure whether or not you should find this kinky.");

		MainScreen.text("\n\nThe skunk alchemist pumps the toy a few times, before removing it and looking it over.  You can see now that it's been lathered in a layer of lubricant.  Well, that's not one of the oddest things you've seen in this world.  \"<i>Ok, get ready.  It's your turn now.</i>\"  You slowly nod your head; too late to back out now even if you want to...");

		MainScreen.text("\n\nShe looks your [vagina] over, touching and massaging your labia, testing it.  You shiver unconsciously as the sensations spark across your nerves.");
		if (player.vaginalCapacity() >= 50) MainScreen.text("  \"<i>Hmm, I might not have had to lube it up after all...</i>\"  The skunkette remarks.");
		MainScreen.text("  She aligns the tip of the dildo with you and without saying a word she begins pushing in.  Instinctively you moan and try to spread yourself as wide as possible.");

		MainScreen.text("\n\nThe slick, slippery mock-phallus glides into your cunt easily, the texture similar to jelly in its soft, squishy pliancy.  Deeper and deeper it slides without any effort, thanks to the slickness of Lianna's personal lube");
		if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness >= 4) MainScreen.text("; your loose pussy doesn't hurt, either");
		MainScreen.text(".  Finally, you can feel it stop inside of you, the tip pushing against your cervix, which is what has brought it to a halt.");

		MainScreen.text("\n\nLianna takes her time, examining your vagina and moving the dildo mere inches at a time, as if adjusting it.  You can't help but note that this isn't that pleasurable; it's not painful, just... well, more boring than anything.  \"<i>Good enough,</i>\"  She declares, then presses a switch on the dildo.  You moan as the dildo suddenly inflates inside of you, swelling and surging until you can feel it pressing insistently into every little nook and cranny inside of you, sealing your honeypot firmly shut as it sucks up your juices like a thirsty sponge.  \"<i>Just a sec.</i>\"  The skunk says, ducking out into her closet once more.");

		MainScreen.text("\n\nShe comes out holding a small hose attached to a pump and a glass bottle; the hose, she attaches to the base of your dildo; the bottle, she places carefully out of reach and plugs the other end of the hose on the open lid.  \"<i>All set.</i>\"  She takes a small remote in her hand.  \"<i>Begin extraction, now.</i>\"  You moan again as the dildo suddenly comes alive inside of you, pleasure beginning to wash through you as it ripples and vibrates, throbbing inside of your clenching walls, massaging your stretched interior so that every single inch of skin is being pleasured at once by its moving surface.  You hiss, groan, and arch your back as you bask in this; now things are finally getting pleasant.");

		MainScreen.text("\n\nLianna watches you with a blank expression, rolling her lollipop in her mouth and taking notes in a notebook.  Things continue to intensify inside your loins, leaving you moaning like a whore; this dildo of hers seems to know exactly how to modify its vibrations to bring you the most pleasure, especially with every surface inside of you being touched at once.");

		MainScreen.text("\n\nYou look to the side to say something to Lianna, but she seems to be missing.  It's not until you feel a small bump on your [clit] that you look down and spot her crouched between your legs, gently poking your pleasure buzzer with the tip of her lollipop's plastic shaft.  You moan and thrust your hips forward instinctively, dimly noticing when she stops and casting her a baffled look.");

		MainScreen.text("\n\nShe takes the, now consumed, lollipop in her hand and discards its half-bit plastic shaft.  Then she leans in and begins licking your [clit], kissing it and sucking on it, much like that lollipop.  That's the last your body can take; the familiar flame of climax consumes you and you cry out as you cum, feminine fluids surging from deep inside you to splatter against the plug of Lianna's dildo.");

		MainScreen.text("\n\nHowever, by the time you have finished, there doesn't seem to be any fluid anywhere");
		if (player.lowerBody.cockSpot.hasCock()) {
			MainScreen.text(" except for the ");
			if (player.cumQ() < 50) MainScreen.text("small");
			else if (player.cumQ() < 250) MainScreen.text("normal");
			else if (player.cumQ() < 1000) MainScreen.text("sizable");
			else MainScreen.text("huge");
			MainScreen.text(" splatters of cum from your neglected penis");
		}
		MainScreen.text("; the dildo has absorbed it all.  You can feel it clenching tighter, shrinking down so that it no longer fills you up so perfectly, leaving you panting in release as Lianna gently frees it from inside you.");

		MainScreen.text("\n\nAs you lay there to savor the afterglow, the skunk suddenly sticks something hard and sweet in your mouth - it's a lollipop, just like the one she was using.  \"<i>You were very helpful and cooperative, so you deserve a lollipop.  Enjoy yourself and feel free to use my bed.  Now I have to go store and test your juices.</i>\"  She shakes the bottle, now filled with your juices, at you and enters her bathroom; a click indicating she's locked herself in.");
		MainScreen.text("\n\nYou sigh and shake your head.  When the strength comes back to your limbs, you redress yourself and leave; what a strange woman.  Still, this lollipop is quite nice - ooh!  Your favorite flavor, too!");
		player.orgasm();
		doNext(camp.returnToCampUseOneHour);
	}

	//Handjob
	//Needs cock.
	private liannaHandjobbies(): void {
		MainScreen.clearText();
		Flags.list[FlagEnum.LIANNA_HAVESTED_MALES]++;
		MainScreen.text("\"<i>All right, let's get this show on the road.</i>\"  She ducks out into her closet once more, and comes out carrying what looks like a condom and a lollipop.  \"<i>Here's how this works.  You put on this condom and I milk your seed out of you.  Simple, yes?</i>\"");

		MainScreen.text("\n\nIt certainly seems that way, you have to admit.  You then ask just how she intends to milk you.  She doesn't bother answering you, instead she just unwraps the lollipop and puts it in her mouth, sucking on it and staring blankly at you.  Looking at her eat her lollipop fills your head with ideas; mainly those involving the skunkette's lips wrapped around [oneCock].  You're about to suggest something when she suddenly interrupts you.  \"<i>You know what?  I haven't really thought this through...  I think using a machine would be ideal, but I didn't have anything prepared beforehand, so I guess I'll have to do it myself, with my own hands.</i>\"  She gazes at your [cock biggest].");
		if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("  \"<i>However I think milking just one is good enough.</i>\"");
		MainScreen.text("  She motions to the bed.");

		MainScreen.text("\n\nWell, now, that certainly sounds enjoyable.  You follow her lead and make yourself comfortable.");

		//If more than one dick:
		if (player.lowerBody.cockSpot.count() > 1) {
			MainScreen.text("\n\n\"<i>I need to get something first.</i>\"  She ducks out into her closet once more, rummaging through it until she emerges with a box full of cock-rings.  Okay, this doesn't look so inviting...");
			MainScreen.text("\n\nShe ducks close to you and analyses your " + CockDescriptor.describeMultiCockShort(player) + ".  \"<i>I think this one should do.</i>\"  She says, caressing your [cock biggest].  You murmur appreciatively at the stimulus, but you don't forget what's coming next even as your traitorous flesh erects itself for her.  She fishes for a cock-ring and attaches it to your other dick");
			if (player.lowerBody.cockSpot.count() > 2) MainScreen.text("s");
			MainScreen.text(", effectively binding them at their base.  You groan hollowly at this; though this certainly will mean less mess, you're not so sure you're going to enjoy the sensation of trying to cum through the " + num2Text(player.lowerBody.cockSpot.count() - 1) + " cocks that have been blocked up.  Satisfied with her work, she looks at your [cock biggest].");
		}
		MainScreen.text("\n\nFirst Lianna reaches behind herself and you see her brows furrow slightly.  Moments later, you hear a wet splash and she moves her hands back to her front, rubbing the slick lube all over them.  Having done that, she begins massaging your cock, lathering it with plenty of lube.  You shiver at her reactions, cock throbbing with pleasure and the coolness of her natural lube further stimulating your sensitive skin.  She reaches back to gather another handful of lube and apply it to your cock, ensuring that you're as slick as you'll get.  \"<i>This should be good enough.</i>\"  You nod your head; if this is the foreplay, then let's see what the real thing is!");
		MainScreen.text("\n\nNext she takes the condom in her hand and removes the wrapping.  You restrain yourself from twitching too much, waiting for her to begin.  Lianna, however, just looks at the condom as if trying to puzzle it out.  You're about to say something when she says, \"<i>I guess that really is the best way of doing it.</i>\"  The skunkette discards her lollipop, throwing the shaft in a nearby trash, and puts the condom between her lips.  You watch her curiously, wondering what's going through her strange excuse for a mind.");

		MainScreen.text("\n\nLianna takes your [cock biggest] in both her hands and proceeds to take it inside her mouth, shoving as much of your shaft down her throat as she can.  You moan appreciatively as she swallows you, feeling something soft and slick inside her mouth stretching itself expertly across your cock.  She pulls away to reveal the slick condom, perfectly placed on your shaft.  You don't know where she learned to do it that way, or why, but you're not arguing with the results.  She makes a few more adjustments to ensure nothing will leak.  \"<i>Good, now I'd say you're ready.</i>\"");

		MainScreen.text("\n\nShe reaches back for more lube and spreads it across your shaft, but this time she makes more of an effort to grip you, wrapping your shaft in her soft fingers.  You murmur appreciatively, your dick already starting to throb in pleasure at her stimulus.  One hand busies itself by pumping you in a languid rhythm, ");
		if (player.lowerBody.balls > 0) MainScreen.text("occasionally stopping to caress your [balls], ");
		MainScreen.text("while the other massages your [cockHead biggest], rolling the steadily growing bubble of pre around as she kneads it.");

		MainScreen.text("\n\nYou moan lewdly at her actions; you wonder just how much experience she has at doing this if she's already getting you this wet and ready - you can see the bubble of precum-inflated latex at the very tip of your dick growing slowly bigger by the second, pleasure coursing through you as her hands continue their deft dance across your tingly skin..");

		MainScreen.text("\n\nYou groan when she releases you, and look down wondering what's up.  Lianna looks at the bubble of pre that's formed on the [cockHead biggest] of your condom-clad [cock biggest].  She leans forward and licks it experimentally, shuffling the pre gathered within and tickling your [cockHead biggest].  You voice your appreciation for the act with a mewl of delight.  She licks it again and again, until finally she takes your cock into her mouth, pushing forwards, until you feel yourself going down her throat.  A gasp wrenches itself from your throat and you can't resist your instincts; you start to thrust your hips, striving to drive yourself deeper into her eager mouth.");

		MainScreen.text("\n\nHer hands grasp your [hips] for support, and she bobs on your shaft, deepthroating you.  You shudder and buck, feeling her throat expertly wringing your already-oversensitive shaft through its latex coating, the warm wet depths slurping around you and pushing you to your limit.  She twists her head in order to take you even deeper and you feel yourself snap.  You cry out and make one last thrust into her mouth as you empty yourself into her.");

		//{Normal or lower Cum:
		if (player.cumQ() < 1000) MainScreen.text("\n\nYour cock spurts its creamy seed down into the waiting latex cocoon in the depths of her throat, neatly splashing into it and ready to be removed.");

		//High Cum:
		else if (player.cumQ() < 4000) MainScreen.text("\n\nGush after gush of seed floods from your unnaturally productive [balls], swelling the condom inside of Lianna's mouth like a balloon with your cascade of fluids, her belly slowly rounding as it swells wider and wider inside of her, distending her flesh into a noticable paunch before finally you spurt your last spurt.");

		//Very High Cum:
		else MainScreen.text("\n\nLianna may have bitten off more than she could chew; yet her expression doesn't change, even as your inhuman cascade of jism surges into her like a tightly focused tidal wave of cum, her belly almost instantly starting to swell as the condom starts bloating under the influx of fluid.  You wonder for a moment if the condom is going to end up being pushed off of your dick and wind up stuck in her stomach, or else just burst inside of her, but you can't stop until you've poured out everything you have to give...");

		MainScreen.text("\n\nThe skunkette looks up at you with a blank expression, then begins extracting herself from your cock.  There is a squelching sound as a ");
		if (player.cumQ() < 1000) { }
		else if (player.cumQ() < 2000) MainScreen.text("big");
		else if (player.cumQ() < 3000) MainScreen.text("huge");
		else MainScreen.text("giant");
		MainScreen.text(" bubble of cum begins emerging from her lips, slick with drool.  It amazes you that she would be able to do this without even so much as blinking her eyes, let alone just stare at you like this was the most common thing in the world.  Once she's finally done extracting your cum-bubble from her throat, she coughs a few times, adjusts her hair and begins stroking your cock anew, milking those last few drops off your shaft.  You heave for breath, then look at her with amazement; she really does have some surprising skills.");

		MainScreen.text("\n\nShe wipes her mouth with a hand and proceeds to remove your condom, careful not to damage it and not to let even a single drop of jism escape.  She ties a knot at the end of the condom and weights the semen contained within.");

		//Low Cum Amount:
		if (player.cumQ() < 250) MainScreen.text("\n\n\"<i>I suppose this will be sufficient for now,</i>\" she declares.");
		//Medium Cum Amount:
		else if (player.cumQ() < 1000) MainScreen.text("\n\n\"<i>Quite a bit, not bad,</i>\" she says, nodding in approval.");
		//Large Cum Amount:
		else MainScreen.text("\n\n\"<i>This will hold me for a while,</i>\" she says, smiling and nodding in approval.");

		MainScreen.text("\n\nShe massages her throat a bit, then gets up and looks at you.  \"<i>Here.</i>\"  She grabs a lollipop from a pocket within her lab coat and hands it to you. You accept it with a little reluctance, still not sure what she's thinking.  \"<i>For your contribution to my research.  Now feel free to rest on my bed as long as you need, I have to go process all this semen while it's still fresh.  See you later, and thank you.</i>\"  She turns on her heels and walks towards her bathroom, closing the door and locking it in place.");

		MainScreen.text("\n\nYou sigh and shake your head.  When the strength comes back to your limbs, you redress yourself and leave; what a strange woman.  Still, this lollipop is quite nice - ooh!  Your favorite flavor, too!");
		player.orgasm();
		doNext(camp.returnToCampUseOneHour);
	}
}
}
