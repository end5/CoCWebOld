﻿export class Kaiju extends AbstractLakeContent {

	//const KAIJU_MEETINGS: number = 910;
	//const KAIJU_DISABLED: number = 911;
	//const KAIJU_TALK_CYCLE: number = 912;
	//const KAIJU_COCK: number = 913;
	//const KAIJU_BAD_END_COUNTER: number = 914;

	//First encounter
	//Boat
	public kaijuMeeting() {
		DisplayText().clear();
		if (Flags.list[FlagEnum.KAIJU_MEETINGS] === 0) {
			DisplayText("Your explorations take you to a small island you haven't seen before.  It appears to be a large, smooth rock hill jutting out of the water.  Do you explore it?");
			//[Yes/No]
			
			MainScreen.addButton(0, "Yes", meetDatKaijuYo);
			MainScreen.addButton(1, "No", noMeetingKaijus);
		}
		else {
			if (player.statusAffects.has(StatusAffectType.FactoryOverload) && !kaijuCock()) kaijuGrowsWangus();
			else if (Flags.list[FlagEnum.KAIJU_BAD_END_COUNTER] >= 5) kaijuBadEndToyBOOSH();
			else repeatKaijuEncounter();
		}
	}

	private kaijuCock(): boolean {
		return (Flags.list[FlagEnum.KAIJU_COCK] === 1);
	}

	//[If no]
	private noMeetingKaijus() {
		DisplayText().clear();
		DisplayText("You continue rowing on, away from the hilly island.");
		//[There is still a chance of finding the hill later]
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//[If yes]
	private meetDatKaijuYo() {
		DisplayText().clear();
		DisplaySprite(103);
		Flags.list[FlagEnum.KAIJU_MEETINGS] = 1;
		if (player.statusAffects.has(StatusAffectType.FactoryOverload)) Flags.list[FlagEnum.KAIJU_COCK] = 1;
		DisplayText("You step up onto the hill and slowly make your way to the top.  The rock seems to be unnaturally symmetrical, more like a large upside down oval.  Walking around, there seems to be little of interest to explore here.  You decide to head back for the boat when suddenly the island shifts and you are nearly knocked off your feet.  You look around, wondering if it was an earthquake or an attack when suddenly the island begins shaking violently.  You run for the boat, practically falling in as you almost lose your footing.  The island seems to be rising out of the water rapidly, until towering above you is a massive terrapin girl!  What you had mistaken for an island was really a large turtle shell!");

		DisplayText("\n\nShe takes in a tremendous gulp of air before stretching, arching her back as far her shell will let her while her green hands flutter near her monumental rack.  You take in the sight of the green giantess, from her wet yet curly red locks of hair, to her dark green, her almost black lips, her massive mammaries which she’s currently fondling quite lewdly, to the hard turtle shell, the front of which covers her belly yet supports her exposed breasts like some kind of perverse hard corset.  She pinches a pert nipple, cooing in pleasure before finally opening her eyes and taking notice of you.");

		DisplayText("\n\n\"<i>Oh my, a visitor?  Or just a sneaky voyeur?</i>\" she asks, cupping her breasts and laughing.  \"<i>What a little thing you are. Or maybe it's all this dreadful weight I've gained.  I was of a much smaller, petite stature before the demons began pumping all those yummy liquids into the lake.  I'm afraid I got a little gluttonous and gained a few pounds.  What do you think? Has little Venus gone overboard?</i>\"");

		DisplayText("\n\nWhatever weight she gained, it seemed to all go up.  Despite the green skin and turtle shell, she appears completely humanoid, save for her giant size and proportions.  She looks to be kneeling in the lake, making her exact height hard to estimate.  Though her breasts are a bit larger than proportional, the rest of her matches what would be fit and trim for a person for her rather extreme stature.  Beyond size it would seem the corrupt fluids poured into the lake have heightened her lust as well, judging by how she tugs and pulls on her shapely tits while staring ever intensely at you.  It appears she expects an answer.  What do you do?");
		//[Compliment/Flirt/Insult]
		

		MainScreen.addButton(0, "Compliment", complimentKaiju);
		if (player.gender > 0) MainScreen.addButton(1, "Flirt", flirtWithKaiju);
		MainScreen.addButton(2, "Insult", insultTheKaijuFirstMeeting);
	}

	//[If insult]
	private insultTheKaijuFirstMeeting() {
		DisplayText().clear();
		DisplaySprite(103);
		if (kaijuCock()) {
			//[If insult and Marae has been corrupted] 
			DisplayText("In perhaps not your brightest idea, you decide to make fun of the giant green girl in front of you, mocking her obvious insecurity over her figure.  The word 'fat' barely exits your mouth before her face goes red in anger and you realize your mistake.");
			DisplayText("\n\n\"<i>You are too rude,</i>\" she says in a huff.  \"<i>But I know how to fix you!</i>\" she begins to rise, standing to her full towering height.  Though much of her legs are still beneath the waves, her genitalia are in full display.  The lips of her feminine sex are moist, dripping with lake water and substantial moisture of their own.  They are surprisingly pink against the almost olive green of the rest of her.  But most shocking of all is that where a clit should be is instead a massive, gigantic green dong!");
			DisplayText("\n\n\"<i>How about you put that mean mouth of yours to some good,</i>\" she tells you as she roughly picks you up between two large fingers and brings you to her stiffening cock.");
			//[If player has learned the Whitefire spell]
			if (player.statusAffects.has(StatusAffectType.KnowsWhitefire) && (!player.perks.has(PerkType.BloodMage) && player.fatigue + kGAMECLASS.spellCost(30) > 100)) {
				DisplayText("\n\nSensing her desires, you try to quickly think of how to avoid pleasing the giant's large cock.  It occurs to you that you could use the spell whitefire to attack her.  Do you cast it?");
				//[Yes][No]
				
				MainScreen.addButton(0, "Yes", yesBurnDatClit);
				MainScreen.addButton(1, "No", corruptKaijuInsertion);
			}
			else {
				
				MainScreen.addButton(0, "Next", corruptKaijuInsertion);
			}
		}
		else {
			DisplayText("Perhaps not the smartest thing to do towards such a giant, you decide to mock her obvious insecurities over her body image.  The word 'fat' barely has time to leave your lips when in a rage she puffs up her lips and blows, sending you and your boat racing through the lake out of sight.  Sometime later the boat crashes back on shore, your hair and nerves a little windswept from the fast ride.");
			//[Giant turtle no longer encounter-able]
			Flags.list[FlagEnum.KAIJU_DISABLED] = 1;
			return { next: Scenes.camp.returnToCampUseOneHour };
		}
	}

	//[If yes]
	private yesBurnDatClit() {
		DisplayText().clear();
		DisplaySprite(103);
		fatigue(30, 1);
		DisplayText("You narrow your eyes, focusing your mind with deadly intent.  You snap your fingers and the green girl's finger is enveloped in a flash of white flames!  She drops you back into the boat as she cries out and plunges her hand into the lake water.  \"<i>Ow! That was so mean!</i>\" she says before placing her singed finger into her mouth and sucking on it.  It doesn't take too long before her natural reflex to pain becomes clouded by her unnatural lust and she begins sucking on her finger erotically, her other hand reaching for her cock and pussy.  She seems to have lost interest in you as she tries to bring herself to orgasm.  You take this opportunity to quietly sneak away.");
		//[Lust is increased and giant turtle girl is no longer encounter-able][End whitefire scene]
		player.stats.lust += 15;
		Flags.list[FlagEnum.KAIJU_DISABLED] = 1;
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//[If no] (Scene returns to regular blowjob/urethral insertion scene.)
	private corruptKaijuInsertion() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("She practically shoves your face into her dark green cock-head, your nose snug against the long slit.  It smells of the sexual corruption of the lake, of demonic jizz and tainted aphrodisiacs.  \"<i>Well go on,</i>\" she says, \"<i>lick it!</i>\"");

		DisplayText("\n\nThere's no fighting against a woman of this size.  You stick out your tongue and lick along the slit at the tip of her dick.  It tastes of sex and strangely of sweet watermelon.  She begins rubbing your face around her cock tip, rubbing you up against every inch of the head of her sex.  As she grinds your face into her cock she begins stroking her shaft with her other hand.  Before long her green rod is fully erect and throbbing, and a single giant bead of pre-cum bubbles up from the tip.  \"<i>Drinky drinky,</i>\" she mocks, placing your face well into the sticky liquid.  You try to hold your breath, but it seems your tormentor won't let up until you've made a show of drinking down her pre.  You begin gulping down the thick cream until your lungs nearly burst, and she takes you out for a breath.  You take in huge lungfuls of air before being shoved back into the sticky mess.  The process of drinking and then breathing repeats four more times before you've swallowed down that batch of pre.");

		DisplayText("\n\n\"<i>Mmm, you're good at this,</i>\" the green terrapin girl says, \"<i>my own little cum guzzler.  I feel a sudden urge coming on.  Thirsty?</i>\" she asks before shoving your head completely into the slit and letting you go, leaving you dangling off of her swollen member, head stuck within her wide cock head.  She begins pumping her shaft with both her hands, picking up the pace and going faster and faster until suddenly she erupts, and you go flying through the air, lodged within a truly tremendous glob of sperm.  You black out from the sudden vertigo.");

		DisplayText("\n\nYou come to almost an hour later, unsure of how you survived such an aerial trip.  Perhaps she snatched you out of the air?  You find yourself in your boat back on shore, hair matted down and sticky with cum.");

		//[Corruption increases slightly and giant turtle girl is no longer encounter-able]
		player.stats.lust += 50;
		player.stats.cor += 1;
		Flags.list[FlagEnum.KAIJU_DISABLED] = 1;
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//[If compliment]
	private complimentKaiju() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("You decide to compliment her figure, stating it is proportional and very pleasing.");

		DisplayText("\n\n\"<i>Aw, that's so sweet of you to say!</i>\" she says as a smile forms on her face.  \"<i>You're just so small and sweet I want to pick you up and give you a great big hug,</i>\" she continues as she reaches down to pick you up.");
		//[Let her/Stop it]
		
		MainScreen.addButton(0, "Let Her", letKaijuHaveWayWithYou);
		MainScreen.addButton(1, "Stop It", stopItPlease);
	}

	//[If stop it]
	private stopItPlease() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("You cry out and wave the inquisitive hand away.  You tell her that you mean no offense, but at such a size and strength disparity you are afraid of what a grip from such a woman could do accidentally.  She seems a bit saddened at that, but makes no further attempt to grab you.");
		//[Giant turtle girl is still encounter-able]
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//[If let her]
	private letKaijuHaveWayWithYou() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("You make no moves as the hand firmly but gently picks you up and brings you upwards towards her ample bosom.  She holds you tightly to a breast, nearly smothering you in tit flesh.  Her perky nipple seems massive up close as it practically bounces off your head when she begins grinding you up and down her gargantuan breast");
		//[only apply if player has dick]
		if (player.torso.cocks.count > 0) DisplayText(", [eachCock] stiffening in your [armor] from the stimulation as your whole body is used in what seems more and more like a massive boob job");
		DisplayText(".");
		if (player.torso.vaginas.count > 0) DisplayText("  Your [vagina] moistens from your body's growing arousal.");

		DisplayText("\n\n\"<i>Oh my, it seems someone is enjoying my special hug,</i>\" the giant beauty says noticing your rising arousal.  The lusty giant removes the lower half of your [armor] revealing your ");
		if (player.gender === Gender.HERM) DisplayText(Desc.Cock.describeMultiCockShort(player) + " and [vagina]");
		else if (player.gender === Gender.MALE) DisplayText(Desc.Cock.describeMultiCockShort(player));
		else if (player.gender === Gender.FEMALE) DisplayText("[vagina]");
		else DisplayText("bare groin");
		DisplayText(".  \"<i>Let's have some fun!</i>\"");

		//[if player has cock]
		if (player.torso.cocks.count > 0) {
			DisplayText("\n\nShe brings you up to her nipple, letting your throbbing cock");
			if (player.torso.cocks.count > 1) DisplayText("s");
			if (player.torso.balls.quantity > 0) DisplayText(" and [balls]");
			DisplayText(" rest on her perky pink naughty bit.  She coos in delight as her hand slowly rubs your private parts along her firm nipple.  She begins to bounce ever so slightly, which at her size means a verifiable mountain of boob begins smacking heavily against your lower body.  \"<i>Oh yes,</i>\" she says, moaning in ecstasy, \"<i>fuck my breast!</i>\"  You don't really seem to have a choice in the matter as she picks up the pace, almost violently slamming you against her smooth green skin and stiff pink nipple.  Despite the relatively soft flesh of her mammary, it is still hundreds of pounds of tit flesh.  As if unsatisfied with just smothering you in boob she takes one green pinkie finger and begins to spank you in a manner she probably believes to be quite soft but lands quite hard on your [butt].  A small number of spankings begin to leave your ass red and tingling, each strike pushing your " + Desc.Cock.describeMultiCockShort(player) + " further into soft breast and firm nipple.  \"<i>Please, cum on me!</i>\" she commands, and almost as if on cue your body obeys, jizz flying and coating her breast with as much sperm as your body can produce.");
			//[if PC has balls]
			if (player.torso.balls.quantity > 0) DisplayText("  Your [balls] begin to ache as you slowly empty your load onto green flesh.");
			player.orgasm();
		}
		//[if player has vagina]
		else if (player.torso.vaginas.count > 0) {
			DisplayText("\n\nShe spreads your legs open and slowly brings your pink netherlips into place, your [vagina] hovering right in front of her massive, cock-sized nipple!  With a squeal of delight, she pushes the tip of her nip into your pussy, her eyes almost rolling back in her head as she slowly, steadily shoves her nipple inch by inch into your stretched [vagina].");
			Mod.Vagina.displayStretchVagina(player, 14, true, true, false);
			DisplayText("  Something wet begins to leak out from the stiff, female member in your stuffed hole, and with a shock you realize she must be lactating!  The giantess's milk lubricates your passage, allowing her to ease more of her throbbing stiffness into you until finally her nipple bottoms out, your pussy lips kissing pink areola.  Your [vagina] clamps down on her, pinching her nipple and driving her deeper into what quickly turns into an ecstatic orgasm.  Her lactating tit suddenly erupts, pouring what must be gallons of corrupt milk into your womb, quickly distending your belly until you look pudgy, and then pregnant - with triplets!");

			DisplayText("\n\nHer nipple pops out, spurting milk all over you, soaking your skin in slick whiteness.  You hope it's good for your skin.");
			player.orgasm();

		}
		//[if player is genderless]
		else {
			DisplayText("\n\nThe giantess begins to moan as she rubs you around her nipple, firmly pressing your body into her breast.  She moves you over to her other breast, using your body to tease her other stiffening nipple.  \"<i>Would you mind licking it?  Please?</i>\" she asks, pressing your face to her nipple.  You open your mouth to stick out your tongue when suddenly she pushes it up against your mouth, quickly getting the first few inches of pink nipple past your lips.  Your mouth is stuffed with nipple flesh, your tongue pushed to the bottom of your mouth.  She slowly forces more of herself into your, her nipple sliding down into your throat.  Her moans grow louder when you suddenly feel liquid spurting down into your gut.  She has begun lactating, pumping you full of tainted turtle milk!  You quickly fill up as your stomach expands with gallons of white fluid, until you're gurgling with milk, the stuff leaking around the nipple in your mouth.  When you feel like you will soon burst she pops her nip out and coats you with her milk.");
			fatigue(-50);
		}
		//[All genders]
		DisplayText("\n\n\"<i>My, that was a mighty big hug.  I think I'll need another nap.  Come visit me again some time,</i>\" she says, slowly putting you down in your boat.  You slowly roll away as the jolly green giantess giggles and slowly wades off.");
		//[Giant turtle girl now encounter-able at Boat and Swamp, corruption increases slightly]
		player.stats.cor += 1;
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//[If flirt]
	private flirtWithKaiju() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("You decide to try and flirt up the giantess.  You tell her that her figure is perfect and statuesque, and that her curves are quite magnificent to behold.  It seems to work if her spreading look of pleasure is any indication.");
		DisplayText("\n\n\"<i>Well now, aren't you just too sweet?  You know I don't get too many admirers these days.  Everyone seems so... intimidated by me.  They leave me all alone and frustrated,</i>\" the curvy tortoise says as she slowly emerges fully from the water.\n\n");

		//[If Marae is corrupted]
		if (kaijuCock()) {
			DisplayText("You are surprised to see she has an enormous cock right where a clitoris would be.  It is already stiff and throbbing with arousal as corrupted lake water drips off it.  ");
			//[Regardless of Marae's corruption]
		}
		DisplayText("Her moist pussy is large and pink while a steady stream of feminine slime leaks from it, soaking her green thighs.  \"<i>It's so nice when a cute " + Desc.Gender.mf(player, "stud", "gal") + " takes an interest, don't you think?</i>\" she continues, gently picking you up in her tremendous hand.  Though you imagine it would be difficult for such large fingers to nimbly handle the clasps and straps of normal size clothing, she soon has you naked.  \"<i>Now, it may have been a while, but I know what flirting is for.  And you're just too cute to play 'hard to get,' with...</i>\"");

		DisplayText("\n\nShe begins to push you towards her gargantuan slit as she spreads her legs.  \"<i>Now don't worry about protection, no normal sperm can hope to break through the above average walls of my eggs.  So you just relax and enjoy the fuck,</i>\" she tells you before plopping you head first past the lips and into the slick, warm walls of her mammoth cunt.  You are given a moment to examine your surroundings.  At first there's a small rising fear of claustrophobia, but it quickly passes and you begin inhaling her scent and the warm fluids of her sex seep into your " + Desc.Skin.skinFurScales(player) + ".  Obviously her corrupt twat juices double as an aphrodisiac.  Beginning to feel lusty, you notice her vaginal muscles tightening around you, gently squeezing and releasing you as if you were receiving a full body massage.  It's actually rather pleasant in here, albeit strange.");
		//[Lust increases]
		player.stats.lust += 33;

		DisplayText("\n\nShe still has your [leg] held gently between two fingers, and she begins to steadily push you deeper and deeper inside her wet honeypot, coating you liberally in more of the lust inducing wetness.  \"<i>Oh that's it baby, slow and steady wins the race,</i>\" she moans, her voice sounding muffled from where you are.  Her vaginal walls continue their rhythmic massage of your body, relaxing your own muscles as the tension of your adventures seem to evaporate.");
		//[If PC has breasts]
		if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1) {
			DisplayText("  Your [fullChest] slide across the slick yet firm vaginal flesh of her surprisingly dexterous cunt, your [nipples] stiffening from the constant teasing massage.");
		}
		//[If PC has cock]
		if (player.torso.cocks.count > 0) {
			DisplayText("  [EachCock] ");
			if (player.torso.cocks.count > 1) DisplayText("are");
			else DisplayText("is");
			DisplayText(" throbbing from the sexual stimulants of her aphrodisiac moisture and the pressing walls of her cunt flesh, pre forming at your tip");
			if (player.torso.cocks.count > 1) DisplayText("s");
			DisplayText(".");
		}
		DisplayText("\n\nJust when you begin to think you can see her womb her hand drags you back down her slippery passage, before pushing you back up again.  Her fingers push you up and down, in and out of her trembling pussy, her wet and skillful muscles helping to speed you along as she steadily picks up her pace.  The closer she seems to get to climax, the more her pussy walls tremble and push, the more her juices gather, and the faster she sends you on your dizzying roller coaster ride through her female sex.");
		//[If PC's sensitivity is 50 or over]
		if (player.stats.sens < 50) {
			DisplayText("\n\nThe sensations of the giant's masterful cunt sends you into orgasm.");
			//[If PC has cock]
			if (player.torso.cocks.count > 0) DisplayText("  [EachCock] spasms as you release your load onto her pussy walls, making them just a bit more slick with your contribution.");
			if (player.torso.vaginas.count > 0) DisplayText("  Your own pussy releases its own feminine juices, soaking your thighs even further in wetness.");
			//[Lust decreases, end sensitivity scene]
			player.orgasm();
		}
		DisplayText("\n\nHer vaginal muscles clamp down on you tightly as she finally orgasms, the intense pressure and moistness sending you flying downwards and you slide out of her slick twat, slipping past her pink pussy lips and crashing into her waiting hand.");

		//[If Marae is corrupt]
		if (kaijuCock()) {
			DisplayText("\n\n\"<i>Oh my, that was GOOD!  But we're not done just yet dear,</i>\" the luscious green hermaphrodite proclaims as she gently places you on top of her large shaft.  \"<i>As much pent up lust as I have to work through, it'll take more than one orgasm to finish the job.  So... mind giving me a hand or two?</i>\" she asks, indicating she wishes for you to give her a hand job.  It might be best not to argue with a lustful giant.  Still slick from her vaginal juice, and horny as hell, you begin stroking her giant cock with your body, kneading with your hands and rubbing with your legs.");
			//[If vagina and/or cock is present]
			if (player.gender > 0) {
				DisplayText("\n\nYou grind your privates against her member, determined to get yourself off as well.");
				if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1) DisplayText("  You press your [chest] against her cock flesh as well, giving her penis as much a boob job as such a behemoth prick can be given.");
				if (player.lactationQ() >= 200) DisplayText("  Milk spurts and flows from your [nipples], making your breast slick and shiny and helping you slide more easily along the throbbing meat-pole.");
			}
			DisplayText("\n\n\"<i>By Marae you're good at this!</i>\" the moaning giantess says as her cock begins to bounce in anticipation.  It nearly bucks you off your precarious perch!  \"<i>I'm...I'm going to cum!</i>\" she shouts as you redouble your efforts.  In another moment she makes good her statement, as a titanic load squirts out.");
			if (player.gender > 0) {
				//[If PC has vagina and/or cock]
				DisplayText("  Undeterred, you continue grinding upon the spurting pole until you reach your own smaller, far less impressive orgasm, releasing your own ");
				if (player.torso.vaginas.count > 0) DisplayText("feminine juices");
				if (player.gender === Gender.HERM) DisplayText(" and ");
				if (player.torso.cocks.count > 0) DisplayText("thick cum");
				DisplayText(".  You look out upon the lake to see much of it has taken on a remarkably more milky white color.  Even for a giant that was a prodigious amount of cum she unleashed!");
				//[lust decreases, end corrupted herm scene]
				player.orgasm();
			}
		}
		DisplayText("\n\nThe giant's knees seem to give way beneath her and she falls on her shapely yet massive ass.  \"<i>Wow,</i>\" she says as she puts you back in the boat with your clothes.  Her green cheeks have surprisingly turned red from her exertions.  \"<i>That's much better than when I'm with myself.  Visit me again sometime, kay?</i>\" she asks.");

		DisplayText("\n\nYou wave goodbye to the giant green girl as you begin to row away.");
		//[Corruption increases, giant turtle girl now encounter-able at Boat and Swamp]
		player.stats.cor += 1;
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//Second/Repeatable encounter/s at Boat
	private repeatKaijuEncounter() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("As you row through the lake you encounter a familiar sight, a giant shell as big as an island.  As you row near it the terrapin giantess, Venus emerges from the corrupted waters.  One giant green hand plays with her titanic jugs as the other remains in the water playing with her unseen sex.  It takes several moments before she notices you.  \"<i>Oh my, it's you again, my favorite voyeur!  Did you come back for a little peek, or do you want to have some real fun?</i>\"");
		
		let drafts: number = 0;
		//[If PC has 15 incubus drafts (regular or pure) and Venus is not already a herm]
		if (player.itemCount(consumables.INCUBID) + player.itemCount(consumables.P_DRAFT) >= 10 && !kaijuCock()) {
			DisplayText("\n\nIt occurs to you that you have enough Incubi Drafts on you to even affect someone of the turtle girl’s great size.  Maybe you could give her a cock?");
			MainScreen.addButton(5, "Give Cock", yesTurnKaijuFuta);
		}
		//[Peek][Hug Boobs][Fuck][Urethra Fuck (only if Venus is a herm)][Talk][Leave]
		MainScreen.addButton(0, "Peek", peekAtSomePhatAssKaijuButt);
		MainScreen.addButton(1, "Hug Boobs", kaijuRepeatBoobHug);
		MainScreen.addButton(2, "Fuck", fuckThisGiantYouDumbCunt);
		if (kaijuCock()) MainScreen.addButton(3, "UrethraFuck", urethraFuckDatGiantCock);
		MainScreen.addButton(4, "Talk", talkToKaiju);
		MainScreen.addButton(9, "Leave", leaveRepeatKaiju);
	}
	//[If Hug Boobs]
	private kaijuRepeatBoobHug() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("You decide it would be fun to play with her titanic titties for a while.");
		DisplayText("\n\n\"<i>Oh, so you like my boobies huh?</i>\" she says as a smile forms on her face.  \"<i>I always wanted tits as big as mountains, so now that I got them why not have fun with them?  Let’s ‘hug’!</i>\" she continues as she reaches down to pick you up.");
		DisplayText("\n\nYou make no moves as the hand firmly but gently picks you up and brings you upwards towards her ample bosom.  She holds you tightly to a breast, nearly smothering you in tit flesh.  Her perky nipple seems massive up close as it practically bounces off your head as she begins grinding you up and down her gargantuan breast");
		//[only apply if player has dick]
		if (player.torso.cocks.count > 0) DisplayText(", [eachCock] stiffening in your [armor] from the stimulation as your whole body is used in what seems more and more like a massive boob job");
		DisplayText(".");
		if (player.torso.vaginas.count > 0) DisplayText("  Your [vagina] moistens from your body's growing arousal.");

		DisplayText("\n\n\"<i>Oh my, it seems someone is enjoying my special hug,</i>\" the giant beauty says noticing your rising arousal.  The lusty giant removes the lower half of your [armor] revealing your ");
		if (player.torso.cocks.count > 0) DisplayText(Desc.Cock.describeMultiCockShort(player));
		if (player.gender === Gender.HERM) DisplayText(" and ");
		if (player.torso.vaginas.count > 0) DisplayText("[vagina]");
		if (player.gender === Gender.NONE) DisplayText("bare groin");
		DisplayText(".  \"<i>Let's have some fun!</i>\"");

		//[if player has cock]
		if (player.torso.cocks.count > 0) {
			DisplayText("\n\nShe brings you up to her nipple, letting your throbbing erection");
			if (player.torso.cocks.count > 1) DisplayText("s");
			if (player.torso.balls.quantity > 0) DisplayText(" and [balls]");
			DisplayText(" rest on her perky pink naughty bit.  She coos in delight as her hand slowly rubs your private parts along her firm nipple.  She begins to bounce ever so slightly, which at her size means a verifiable mountain of boob begins smacking heavily against your lower body.  \"<i>Oh yes,</i>\" she says, moaning in ecstasy, \"<i>fuck my breast!</i>\"  You don't really seem to have a choice in the matter as she picks up the pace, almost violently slamming you against her smooth green skin and stiff pink nipple.  Despite the relatively soft flesh of her mammary, it is still hundreds of pounds of tit flesh.  As if unsatisfied with just smothering you in boob she takes one green pinkie finger and begins to spank you in a manner she probably believes to be quite soft but lands quite hard on your [butt].  A small number of spankings begin to leave your ass red and tingling, each strike pushing your " + Desc.Cock.describeMultiCockShort(player) + " further into her soft breast and firm nipple.  \"<i>Please, cum on me!</i>\" she commands, and almost as if on cue your body obeys, jizz flying and coating her breast with as much sperm as your body can produce.");
			if (player.torso.balls.quantity > 0) DisplayText("  Your [balls] begin to ache as you slowly empty your load onto green flesh.");
			player.orgasm();
		}
		//[if player has vagina]
		if (player.torso.vaginas.count > 0) {
			DisplayText("\n\nShe spreads your legs open and slowly brings your pink netherlips into place, your [vagina] hovering right in front of her massive, cock-sized nipple!  With a squeal of delight she pushes the tip of her nip into your pussy, her eyes almost rolling back in her head as she slowly, steadily shoves her nipple inch by inch into your stretched hole.");
			Mod.Vagina.displayStretchVagina(player, 14, true, true, false);
			DisplayText("  Something wet begins to leak out from the stiff female member in your stuffed hole, and with a shock you realize she must be lactating!  The giantess milk lubricates your passage, allowing her to ease more of her throbbing stiffness into you until finally her nipple bottoms out, your pussy lips kissing pink areola.  Your [vagina] clamps down on her, pinching her nipple and driving her deeper into what quickly turns into an ecstatic orgasm.  Her lactating tit suddenly erupts, pouring what must be gallons of corrupt milk into your womb, quickly distending your belly until you look pudgy, and then pregnant - with triplets!");
			DisplayText("\n\nHer nipple pops out, spurting milk all over you, soaking your skin in slick whiteness. You hope it's good for your skin.");
			player.orgasm();
		}
		//[if player is genderless]
		if (player.gender === Gender.NONE) {
			DisplayText("\n\nThe giantess begins to moan as she rubs you around her nipple, firmly pressing your body into her breast.  She moves you over to her other breast, using your body to tease her other stiffening nipple.  \"<i>Would you mind licking it?  Please?</i>\" she asks, pressing your face to her nipple.  You open your mouth to stick out your tongue when suddenly she pushes it up against your mouth, quickly getting the first few inches of pink nipple past your lips.  Your mouth is stuffed with nipple flesh, your tongue pushed to the bottom of your mouth.  She slowly forces more of herself into your, her nipple sliding down into your throat.  Her moans grow louder when you suddenly feel liquid spurting down into your gut.  She has begun lactating, pumping you full of tainted turtle milk!  You quickly fill up as your stomach expands with gallons of white fluid, until you're gurgling with milk, the stuff leaking around the nipple in your mouth.  When you feel like you will soon burst she pops her nip out and coats you with her milk.");
		}
		//[All genders]
		DisplayText("\n\n\"<i>My, that was a mighty big hug.  I think I'll need another nap. Come visit me again some time,</i>\" she says, slowly putting you down in your boat.  You slowly roll away as the jolly green giantess giggles and slowly wades off.");
		//[Giant turtle girl now encounter-able at Boat and Swamp, corruption increases slightly]
		Flags.list[FlagEnum.KAIJU_BAD_END_COUNTER]++;
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//[If Fuck] 
	private fuckThisGiantYouDumbCunt() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("You decide it’d be fun to fuck the giantess, even if at her size you’re really more of a living dildo than a rutting stud.  She seems pretty happy with the thought if her spreading look of pleasure is any indication.");
		DisplayText("\n\n\"<i>Well now, aren't you just the bravest little champion?  You know I don't get too many offers these days.  Everyone else seems so... intimidated by me.  They leave me all alone and frustrated,</i>\" the curvy tortoise says as she slowly emerges fully from the water.\n\n");

		if (kaijuCock()) {
			//[If Venus is herm]
			DisplayText("You are surprised to see she has an enormous cock right where a clitoris would be.  It is already stiff and throbbing with arousal as corrupted lake water drips off it.  ");
		}
		DisplayText("Her moist pussy is large and pink while a steady stream of feminine slime leaks from it, soaking her green thighs.  \"<i>But you aren’t intimidated by all this, are you?</i>\" she continues, gently picking you up in her tremendous hand.  Though you imagine it would be difficult for such large fingers to nimbly handle the clasps and straps of normal size clothing, she soon has you naked.  \"<i>Now let’s fuck!</i>\"");

		DisplayText("\n\nShe begins to push you towards her gargantuan slit as she spreads her legs.  \"<i>Now don't worry about protection, no normal sperm can hope to break through the above average walls of my eggs.  So you just relax and enjoy the fuck,</i>\" she tells you before plopping you head first past the lips and into the slick, warm walls of her mammoth cunt.  You are given a moment to examine your surroundings.  At first there's a small rising fear of claustrophobia, but it quickly passes and you begin inhaling her scent and the warm fluids of her sex seep into your " + Desc.Skin.skinFurScales(player) + ".  Obviously her corrupt twat juices double as an aphrodisiac.  Beginning to feel lusty, you notice her vaginal muscles tightening around you, gently squeezing and releasing you as if you were receiving a full body massage.  It's actually rather pleasant in here, albeit strange.");
		player.stats.lust += 33;

		DisplayText("\n\nShe still has your [leg] held gently between two fingers, and she begins to steadily push you deeper and deeper inside her wet honeypot, coating you liberally in more of the lust inducing wetness.  \"<i>Oh that's it baby, slow and steady wins the race,</i>\" she moans, her voice sounding muffled from where you are.  Her vaginal walls continue their rhythmic massage of your body, relaxing your own muscles as the tension of your adventures seem to evaporate.");
		//[If PC has breasts]
		if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1) {
			DisplayText("\n\nYour [chest] slide across the slick yet firm vaginal flesh of her surprisingly dexterous cunt, your [nipples] stiffening from the constant teasing massage.");
		}
		//[If PC has cock]
		if (player.torso.cocks.count > 0) {
			DisplayText("\n\nYour hard cock");
			if (player.torso.cocks.count > 1) DisplayText("s are");
			else DisplayText(" is");
			DisplayText(" throbbing from the sexual stimulants of her aphrodisiac moisture and the pressing walls of her cunt flesh, pre forming at your tip");
			if (player.torso.cocks.count > 1) DisplayText("s");
			DisplayText(".");
		}

		DisplayText("\n\nJust when you begin to think you can see her womb her hand drags you back down her slippery passage, before pushing you back up again.  Her fingers push you up and down, in and out of her trembling pussy, her wet and skillful muscles helping to speed you along as she steadily picks up her pace.  The closer she seems to get to climax, the more her pussy walls tremble and push, the more her juices gather, and the faster she sends you on your dizzying roller coaster ride through her female sex.");
		//[If PC's sensitivity is 50 or over]
		if (player.stats.sens >= 50) {
			DisplayText("\n\nThe sensations of the giant's masterful cunt sends you into orgasm.");
			if (player.torso.cocks.count > 0) DisplayText("  [EachCock] spasms as you release your load onto her pussy walls, making them just a bit more slick with your contribution.");
			if (player.torso.vaginas.count > 0) DisplayText("  Your own pussy releases its own feminine juices, soaking your thighs even further in wetness.");
			//[Lust decreases, end sensitivity scene]
			player.orgasm();

		}
		else {
			DisplayText("\n\nHer vaginal muscles clamp down on you tightly as she finally orgasms, the intense pressure and moistness sending you flying downwards and you slide out of her slick twat, slipping past her pink pussy lips and crashing into her waiting hand.");

			//[If Marae is corrupt]
			if (kaijuCock()) {
				DisplayText("\n\n\"<i>Oh my, that was GOOD!  But we're not done just yet dear,</i>\" the luscious green hermaphrodite proclaims as she gently places you on top of her large shaft.  \"<i>As much pent up lust as I have to work through, it'll take more than one orgasm to finish the job.  So... mind giving me a hand or two?</i>\" she asks, indicating she wishes for you to give her a hand job.  It might be best not to argue with a lustful giant.  Still slick from her vaginal juice and horny as hell, you begin stroking her giant cock with your body, kneading with your hands and rubbing with your legs.\n\n");
				//[If vagina and/or cock is present]
				if (player.gender > 0) {
					DisplayText("You grind your privates against her member, determined to get yourself off as well.  ");
				}
				//[If PC has boobs]
				if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1) DisplayText("You press your [fullChest] against her cock flesh as well, giving her penis as much a boob job as such a behemoth prick can be given.");
				if (player.lactationQ() >= 200) DisplayText("  Milk spurts and flows from your [nipples], making your breast slick and shiny and helping you slide more easily along the throbbing meat-pole.");

				DisplayText("\n\n\"<i>By Marae you're good at this!</i>\" the moaning giantess says as her cock begins to bounce in anticipation.  It nearly bucks you off your precarious perch!  \"<i>I'm...I'm going to cum!</i>\" she shouts as you redouble your efforts.  In another moment she makes good her statement, as a titanic load squirts out.");
				//[If PC has vagina and/or cock]
				if (player.gender > 0) {
					DisplayText("  Undeterred, you continue grinding upon the spurting pole until you reach your own smaller, far less impressive orgasm, releasing your own ");
					if (player.torso.vaginas.count > 0) DisplayText("feminine juices");
					if (player.gender === Gender.HERM) DisplayText(" and ");
					if (player.torso.cocks.count > 0) DisplayText("thick cum");
					DisplayText(".");
					player.orgasm();
				}
				DisplayText("  You look out upon the lake to see much of it has taken on a remarkably more milky white color. Even for a giant that was a prodigious amount of cum she unleashed!");
				//[lust decreases, end corrupted herm scene]
			}
		}
		DisplayText("\n\nThe giant's knees seem to give way beneath her and she falls on her shapely yet massive ass.  \"<i>Wow,</i>\" she says as she puts you back in the boat with your clothes.  Her green cheeks have surprisingly turned red from her exertions.  \"<i>That's much better than when I am with myself.  Visit me again sometime, kay?</i>\" she asks.");

		DisplayText("\n\nYou wave goodbye to the giant green girl as you begin to row away.");
		//[Corruption increases]
		Flags.list[FlagEnum.KAIJU_BAD_END_COUNTER]++;
		player.stats.cor += 1;
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//[If Urethra Fuck]
	private urethraFuckDatGiantCock() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("You look at her with an inquisitive stare.  You’re interested in that big green cock of hers, but how can you use such a giant tool?");

		DisplayText("\n\nVenus takes a moment to think about it before her lust-filled eyes light up with an obviously delightful and perverse idea.  \"<i>How about a little urethra play?  I’ve seen a minotaur stick a pinkie finger in his cock before, I think you’ll fit.</i>\"");

		DisplayText("\n\nWait, she wants you in her dick?  The hell kind of minotaur was she spying on?");

		DisplayText("\n\nBefore you can comment or protest or even question the logic of her plan she has already stripped you of your [armor] and positioned you in front of her crotch, face to face with her cum-slit.  A giant-sized glob of pre has already formed at the head of her dick, her thick cock apparently a bit of a leaky faucet.  \"<i>Geronimo!</i>\" she yells as she pushes you face first into her goo drizzling tip, your head sliding into her dick with surprising ease, though your shoulders seem to be a different manner.  She pushes and twists you about, gently adding pressure until you finally pop right in all the way to your waist.  It’s surprisingly slippery in her cock, lubed by sweat and precum, and you slide with some ease even further into her dick until you are in up to your ankles despite the tightness of her passage, keeping your arms pinned to your sides.  You wiggle your feet a bit outside her dick before the perverted giant uses them to pull you most of the way back out before shoving you in there once more.  From your vantage point you can almost see all the way into her balls, and to your horror you see a new giant glob of pre heading your way!  You try to shout or move about to get the green herm’s attention, but your voice is muffled and your body constrained by the tight cock flesh all around you.  You take a deep breath and hold it right before getting a face full of musky sweet precum, the scent in your nose reminding you of salty... watermelon?  You barely have time to register the scent before you are yanked out of her cock and can breathe again, her pre dripping off your face.");

		DisplayText("\n\n\"<i>Sorry about that, it only just occurred to me that might pose a problem.  But I have an even better idea, and this way I can see your cute face!</i>\" she says, blushing in delight at the view of your precum dripping face.");
		DisplayText("\n\n\"<i>Gods above [name] but you look like a whore!  By Marae you’re turning me on!</i>\"");

		DisplayText("\n\nShe quickly has you positioned in front of her cock once more, this time feet first so she can keep your head free.  You can see your legs slowly slide down into her green cock, her cum-slit swallowing you up to your [hips].  You can feel the walls of her cock head push in all around you, squeezing your [butt]");
		if (player.torso.cocks.count > 0) DisplayText(" and your " + Desc.Cock.describeMultiCockShort(player));
		DisplayText(".  \"<i>Wow, you look absolutely gorgeous in my cock!</i>\" the giantess says with glee, perverse desire in her eyes as she shoves you in further up to your [chest], her trembling, squeezing cock seeming to give you an almost relaxing massage.  You can barely believe it, but this unnatural giantess has as much control over her urethral walls as the most whorish succubus has over her cunt!  Only your arms and head are free of her cock as her unusual member starts squeezing and rippling all along your body.  It seems her dick wants to give you a happy ending.");

		DisplayText("\n\nJudging by the lustful cooing sounds, the jolly green girl is nearing her limit, her free hand snaking down to gently stroke her giant cock.  \"<i>Going to cum I’m going to cum going to cum!</i>\" she shouts as she reaches her own orgasm before you.  Suddenly her dick widens at the base as her cum shot heads your way!  With your body lodged tightly in the way, the corrupted turtle sperm has nowhere to go but in, your [asshole] suddenly filling up as your bowels are flooded with cum!");
		if (player.torso.cocks.count > 0) DisplayText("  So much jizz fills your ass it can’t help but to press in on your prostate, making [eachCock] stiffen with a seriously growing urge.");
		if (player.torso.vaginas.count > 0) DisplayText("  Your ass isn’t alone in the feeling of being flooded as your [vagina] and womb are packed with the hermaphrodite’s sperm.");
		DisplayText("  You manage to reach your own orgasmic climax right before the pressure finally pops you out of her cock like a cork from a wine bottle.  You black out somewhere above the lake.");
		DisplayText("\n\nYou wake up about an hour later, dressed and in your boat, already docked back at shore.  The green giant Venus must have caught you.");
		//[Corruption increases slightly, lust is decreased]
		Flags.list[FlagEnum.KAIJU_BAD_END_COUNTER]++;
		player.orgasm();
		player.stats.cor += 1;
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//[If Leave]
	private leaveRepeatKaiju() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("You politely decline any options and bid the green girl goodbye as you row away.");
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//[If Talk] 
	private talkToKaiju() {
		DisplayText().clear();
		DisplaySprite(103);
		Flags.list[FlagEnum.KAIJU_TALK_CYCLE]++;
		Flags.list[FlagEnum.KAIJU_BAD_END_COUNTER]--;
		DisplayText("\"<i>Oh?  You want to talk?</i>\" she says, a bit taken by surprise, \"<i>What about?</i>\"");
		//(One of the available lines of dialog plays.)
		if (Flags.list[FlagEnum.KAIJU_TALK_CYCLE] === 1) {
			//Dialog one: 
			DisplayText("\n\nYou ask her to talk about herself and who she is.");
			DisplayText("\n\n\"<i>Well, I'm not really sure what to say.  I was born the youngest of my family shortly after the demons first took over.  Mother was once a shaman of our tribe, a beauteous woman famed for her dances that could call down the rain or predict small pieces of the future.  I never knew my father but mother claimed he was a demon.  Though whether he really was or she was just insulting him for not sticking around and raising his child I do not know.  My elder half sisters all took the path of becoming priestesses and my big brother became a warrior.  Eventually he went off to fight the demons, and I never saw him again,</i>\" she says, a note of sadness creeping into her voice.");

			DisplayText("\n\n\"<i>I grew up happily in the swamp.  I'd play with the other girls my age and my sisters, and occasionally we would even go to the lake and play with the shark girls, though even then they were well into the corruption and they always teased us.  Once or twice an imp would try to rape me, having come down from the mountain or forest, but I just curled up into my shell like I was taught and couldn't be touched.  I took some fighting lessons from my brother after that, before he left.  I may be large and in charge now, but even when I was small I had a mean left hook!</i>\" Venus seems happy recounting this bit of her life story, a pleasant smile curling her lips for a moment as her eyes seem to glaze over warmly.  But it doesn't last long.");

			DisplayText("\n\n\"<i>Not much seemed to happen after that. Slowly my family and friends began to drift apart as the lands became more and more corrupt, and I was left mostly alone.  Shortly thereafter the corruption reached the lake and I slowly became addicted to whatever it is the demons began spewing into the water from pipes and hoses and I began to grow... and grow... and grow.  Now what few who are around seem terrified of me. Even the demons steer clear of someone my size.</i>\"");
			DisplayText("\n\nShe seems to grow silent and draws inward as she finishes her story.  She thanks you for listening before sending you on your way.");
		}
		//Dialog two: 
		else if (Flags.list[FlagEnum.KAIJU_TALK_CYCLE] === 2) {
			DisplayText("\n\nYou decide to ask her a very delicate question that has been bothering you for a while.  How did she become such a giant?");
			DisplayText("\n\n\"<i>I thought you would ask eventually,</i>\" the big green gal says, tapping a finger on her bottom lip for a few seconds as she considers what she'll say.  \"<i>Well, it all began well after the demons took over the land.  I've always tended to go back and forth between the lake and swamp ever since I can remember.  One day I was bathing in the lake all alone when it suddenly... changed.  I couldn't put my finger on it at the time, but the more I bathed the dirtier I felt. I soon left, deciding that I should stay away for a while... but I had such intense dreams that night, unlike any I ever had before.  I kept thinking of naked bodies rubbing up and down against my own body, of large cocks of every shape and description teasing my pussy or my plump rear, sliding between my cunt lips or my buttocks.  After that I just couldn't seem to help myself, I had to go back to the lake and take another dip, and another, and another.  As the waters became more corrupt and my dreams more intense I had to find the source of my pleasures.  So I began to explore every inch of the lake, until I finally came to a spot where the lake meets the mountains.</i>\"");

			DisplayText("\n\nHer body seems to quiver in delight as she continues on.  \"<i>I'm not sure why they want to taint the waters or what it is they use, but I found the spot where the corruption enters the lake and is the strongest.  I go there daily to absorb the warmth and delicious taint of those chemicals.  It increased my lust, and over time my size.</i>\"");
			//[If factory has been shut down and Marae was left uncorrupted]
			if (player.statusAffects.has(StatusAffectType.DungeonShutDown) && !player.statusAffects.has(StatusAffectType.FactoryOverload)) DisplayText("  But the flow of yummy fluids seems to have been stopped.");
			//[If the Factory was shut down and Marae corrupted]
			else if (kaijuCock()) DisplayText("  But the pouring of liquids has been stopped for some reason, but not before there was one final, huge burst of tainted fluids. It was so strong and changed me even further, making me grow this,</i>\" she says as she rises further out of the lake's waters, revealing a large green cock.");

			DisplayText("\n\nYou thank the giantess for her explanation as you row away.");
		}
		else if (Flags.list[FlagEnum.KAIJU_TALK_CYCLE] === 3) {
			//Dialog three: 
			DisplayText("\n\nYou decide to ask if there are any other turtle people.");
			DisplayText("\n\n\"<i>Oh yes, lots,</i>\" she says, \"<i>though we’re all scattered about and hard to find these days.  Actually there are two groups of us.  The freshwater turtles are a bit more reptilian, bald with no ears, and they have no nipples, though they still have boobs.  I admit I spend a lot of time swimming in the lake, but I’m a land turtle. Hair, ears, pert nipples to tug and play with...</i>\" she says, demonstrating just that as she pulls on one massive pink nub.  \"<i>The water turtles teased us all the time, saying we look more like goblins with shells than turtles, but I think they’re just jealous.</i>\"");
			DisplayText("\n\n\"<i>Turtle society is nice and simple.  The high priestess and her daughter priestesses are in charge of village life, the men are warriors or farmers, and we generally live unmolested.  Once we go in our shells no one can mess with us, at least until the demons came with their lust magic.  Can’t hide in a shell when you’re orgasming.</i>\"");
			DisplayText("\n\nShe sighs, the conversation seeming to be at an end.");
			Flags.list[FlagEnum.KAIJU_TALK_CYCLE] = 0;
		}
		return { next: Scenes.camp.returnToCampUseOneHour };
		if (player.stats.int < 50) player.stats.int += 1;
		if (player.stats.lib > 50) player.stats.lib += -1;
	}

	//[If Peek]
	private peekAtSomePhatAssKaijuButt() {
		DisplayText().clear();
		DisplaySprite(103);
		Flags.list[FlagEnum.KAIJU_BAD_END_COUNTER]++;
		DisplayText("\"<i>Oh you are a naughty one,</i>\" the green titan of a woman says as a seductive smile plays across her face.  \"<i>So you want to watch me bring myself to lewd orgasm after filthy lewd orgasm?  You're just in luck, I love nothing more than to have someone watch,</i>\" she explains, seemingly quite the exhibitionist. She lifts your boat up with one hand and takes you to a nearby grassy island.  After setting the boat down on shore she then leads you to a large hill so you'll have a perfect view as she lies down on her back, her massive shell almost flattening a whole field of small blue flowers.  \"<i>Now enjoy the show,</i>\" she says with a light laugh before her hands reach for her most intimate places, her left snaking down to her slavering cunt while her right begins pinching a pert milky nipple.");
		DisplayText("\n\nShe begins to probe at her loose fuck hole, her middle finger sliding past her pussy lips with ease");
		//[If Venus is pure/un-cocked]
		if (!kaijuCock()) DisplayText(" while her thumb begins to rub her clit");
		else DisplayText(" while her thumb begins rubbing up and down her slowly stiffening cock");
		DisplayText(".  Her other hand is busy holding her giant nipple between forefinger and thumb as she tugs with surprising fierceness at her tit.  She begins moaning and slowly panting as sweat begins to form on her body.  She quickly slips another finger into her gaping twat, and then another.  Her right hand flits about from boob to boob, pinching her nipples or kneading a tit as she fondles her gargantuan jugs.  She seems to be giving it her all as her speed increases along with her shameless depravity.  Soon she has four fingers stretching out her cunt, and then her thumb and knuckles follow suit as she begins to fist herself.  \"<i>Oh yes, oh by Marae yes!</i>\" she squeals, moaning in delirious bliss as her feminine fluids soak her massive hand.  \"<i>Please, look at me,</i>\" she says, turning her attention to you. You have no intention of looking away as her hand slips in and out of her soaking stretched cunt.");
		//[If Venus is pure]
		if (!kaijuCock()) DisplayText("\n\nHer other hand moves away from her breasts, moving down to stimulate her clitoris");
		//[if Venus is corrupt/herm]
		else DisplayText("\n\nHer other hand darts away from her breasts to her now throbbing cock, slowly stroking it and squeezing it tightly");
		DisplayText(".  She pumps her clenched fist furiously as deep into herself as she can reach, going faster and faster as she quickly reaches orgasm, her pussy juices squirting out around her fist, soaking her forearm in the feminine fluid.  She slowly pulls her hand out with an audible 'Plop' and brings both hands back to her breasts, massaging her giant sized fuck pillows until two thick steady streams of milk begin flowing out her nipples and down her breasts.");
		//[Lust is increased]
		dynStats("lus", 10 + player.stats.lib / 3);
		//[If Venus is corrupt/herm]
		if (kaijuCock()) {
			DisplayText("\n\nThough she appears to be ending the show, you know you can encourage her to go even further.  Do you egg her on?");
			//[Yes][No]
			
			MainScreen.addButton(0, "Yes", yesKaijuGimmePeepShowsMoar);
			MainScreen.addButton(1, "No", noKaijuPeepShows);
		}
		else {
			
			MainScreen.addButton(0, "Next", noKaijuPeepShows);
		}
	}

	//[If yes]
	private yesKaijuGimmePeepShowsMoar() {
		DisplayText().clear();
		DisplaySprite(103);
		Flags.list[FlagEnum.KAIJU_BAD_END_COUNTER]++;
		DisplayText("You make your appreciation of her exhibition known, indicating that you would like her to continue on.  Smiling at your suggestion, and more than willing to give an encore performance, she brings her hands down to her trembling cock, slowly tracing a finger up the length of her shaft before grabbing onto it with one hand while the other begins to rub the tip of the head with her palm.  Her hand, still slick with her own cunt juice, slides easily across her cock.  She begins to moan again, even more lewdly than last time.  Her hips begin to buck as she practically begins to fuck her hand.  Beads of precum begin to bubble up from her cock head, and she quickly wipes it on the palm of her free hand before bringing it towards her face to lick the mess off her palm, her body trembling from the sheer delight of drinking her own pre.  \"<i>Oh that's good!</i>\" she pants, bringing her hand back down to begin stroking her throbbing dick with both hands.  \"<i>Please, please watch me cum!</i>\" the giantess begs of you as she goes into high gear, giving her cock everything she's got left.  It isn't much longer before she erupts like a geyser, spraying hermy turtle girl cum high into the air, only for it to rain back down on the green girl.  Her hands begin to slide across her torso, gently massaging the sperm into her skin.");
		//[Increase lust further, end corrupt/herm scene]
		player.stats.lib += 1;
		player.stats.lust += 33;
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//[If no] (Skip corrupt/herm scene)
	private noKaijuPeepShows() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("\"<i>My goodness, it's so much better with a captivated audience!</i>\" she says, breathing heavily.  You thank her for the show as she places you back into your boat and giving it a push.  You row away, considering perhaps coming back for another show.");
		//[Libido is increased by 1]
		player.stats.lib += 1;
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//One off scenes
	//Scene for Newly Cocked Venus at Boat
	//[Triggered if the PC has already had sex with pure female Venus before finishing the Factory quest, and has since stopped the Factory and corrupted the lake and Marae]
	private kaijuGrowsWangus() {
		Flags.list[FlagEnum.KAIJU_COCK] = 1;
		DisplayText().clear();
		DisplaySprite(103);
		Flags.list[FlagEnum.KAIJU_BAD_END_COUNTER]++;
		DisplayText("While rowing across the lake you come across a familiar green face emerging from the tainted waters.  It's Venus, the gigantic turtle girl from before.  Spotting you with lust filled eyes she waves you over and begins speaking, \"<i>You wouldn't believe what happened to me!  It was the oddest thing, I was bathing at the spot where the fluid corruption first enters the lake when suddenly I heard a loud noise and then WHOOSH!  An incredible torrent of the tainted stuff poured into the lake.  I've never witnessed anything like it!</i>\"  You nod your head in understanding, explaining to the green girl about your recent activities at the demons’ factory.");

		DisplayText("\n\n\"<i>Wow, you did that?  I'm impressed,</i>\" she says, appraising you with her eyes, the usual lust in them replaced by a different kind of curiosity, even if only for a moment before once more going back to the haze of desire.  \"<i>Well, since you're the one responsible, maybe you would like to help me with something?</i>\" she asks as she slowly begins to rise from the lake, her flowing locks of red hair clinging wetly to her head and the back of her neck, with a few red curls coming down to cling around her large bountiful tits, her perky pink nipples stiff and hard from the cold water.  She continues to rise, drops of moisture sliding down the smooth green skin of her torso as her body ascends from the lake until she's up only to her waist, then up further so that her well trimmed pubic hair is on display, the red carpet clearly matching the curtains.  Then finally her sex emerges from the lake, dripping with water and sexual fluids, and you can clearly see that where once she had only the normal, albeit giant sized, sex of the female gender she now also has a lewd, throbbing dick above her vaginal opening, placed exactly where her pink clitoris once rested.  \"<i>What do you think?  Isn't it great?  I can't believe it just grew there.  It must have been all that excess corruption that was released.  And it's been making me so horny I can hardly walk straight!  Hey, want to help me give my brand new cock a test drive?</i>\" she eagerly asks you, her new member starting to bounce a little as she shivers with desire.");

		DisplayText("\n\nYou never expected your actions in the factory to have such a perverse effect.  Do you help get her off?");
		//[Yes][No][Mock]
		
		MainScreen.addButton(1, "No", dontGetFutaTurtlesOffToday);
		MainScreen.addButton(0, "Yes", helpNewFutaKaijuGetOff);
		MainScreen.addButton(2, "Mock", mockDatTurtleGirl);
	}

	//[If no]
	private dontGetFutaTurtlesOffToday() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("You shake your head no, politely responding that you do not want to get her off right now.  \"<i>Oh, okay. I understand,</i>\" the giantess states, looking somewhat crestfallen.  You row away, leaving her and her new addition to themselves for the time being.");
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//[If Mock] 
	private mockDatTurtleGirl() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("You laugh at the giant, asking her what kind of girl has a cock.  A rage overtakes her, her blue eyes suddenly glowing bright red as she grips you firmly in one massive hand, keeping your arms pinned to your sides so tightly you can't move.  \"<i>How dare you!</i>\" she tells you as two demonic horns creep up out of her red locks.  The factory's corruption has obviously given her more than a large male member.  \"<i>All you had to do was say no, you didn't have to be so rude about it! Maybe this will teach you a few manners,</i>\" she says, opening her hand to allow her new green cock to fall onto you before closing her hand again, firmly gripping you and her erect member.  All you can see is the green of her twitching cock flesh.  \"<i>I want to see if this thing is fully functional, so hang on tight!</i>\"");

		DisplayText("\n\nShe begins to move her hand back and forth, slowly sliding you against the bottom of her green shaft.  Though the mammoth penis resting on you is heavy and you are squeezed tightly against it, you are seemingly in no danger of being crushed as she strokes her massive herm meat-pole from top to bottom.  You can actually smell the salty pre forming at her tip.  ");
		//[If player has balls of grapefruit size or larger]
		if (player.torso.balls.quantity > 0 && player.torso.balls.size >= 6) DisplayText("Your [balls] rest on the hermaphrodite's hand, bouncing loudly with each thunderous stroke from the speed and force she is employing to get herself off.  ");
		//[end balls] [If player has cock]
		if (player.torso.cocks.count > 0) DisplayText("You can feel your [armor] getting tighter as [eachCock] begins to stiffen under your clothing from all the constant pressure of the cock squeezing down on your member.  ");
		//[If player has vagina]
		if (player.torso.vaginas.count > 0) DisplayText("You begin to feel a wetness between your legs as your cunt begins leaking as your arousal spikes from the intense rubbing the herm's penis is giving your whole body.  ");
		//[If genderless]
		if (player.gender === Gender.NONE) DisplayText("Your cheeks blush in arousal from all this heavy rubbing.  ");
		if (player.stats.cor < 33) DisplayText("You can't believe that you're being aroused by this.  Aren't you suppose to be a champion?");
		else if (player.stats.cor < 66) DisplayText("Wow, this is arousing you.  You wonder if you really are a champion.");
		else DisplayText("You just want to get off now.");

		DisplayText("\n\n\"<i>See?  You make such a good little cock toy,</i>\" the giantess coos as she begins to stroke faster and faster.  \"<i>You’re making my dick feel so good!</i>\"");

		DisplayText("\n\nCraning your neck you can see more pre bubbling forth from her cock tip, a strong smell of sex issuing forth.  Does her precum contain pheromones?  The thought is quickly shaken out of your head as you’re forced faster and tighter along her cock's massive length.  The warmth radiating out from her member forces the stiffness out of your muscles momentarily until they stiffen again, this time from the throes of orgasm");
		if (player.torso.cocks.count > 0) DisplayText(" as you cum in your [armor]");
		DisplayText(".  You can feel the spasming of the giant's cock as you feel the pressure from her shaft increase as a load of cum rushes through it, erupting out of her tip like a volcano with globs of white lava.  \"<i>Well, that's a hell of a load,</i>\" she says, seeming quite proud of herself.  She sets you back down in your boat and roughly shoves it out further into the lake.  \"<i>Learn some manners you meanie!</i>\" she calls out.");
		//[Lust is decreased, Venus is removed from the game]
		player.orgasm();
		player.stats.cor += 1;
		Flags.list[FlagEnum.KAIJU_DISABLED] = 1;
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//[If yes]
	private helpNewFutaKaijuGetOff() {
		DisplayText().clear();
		DisplaySprite(103);
		Flags.list[FlagEnum.KAIJU_BAD_END_COUNTER]++;
		DisplayText("You smile up at the green hermaphrodite, saying that you would love to help her test out her new fleshy member.  Venus claps her hands and squeals in glee, obviously happy at your decision and the anticipation of getting off with her maleness for the first time.  You follow her to a nearby island in the lake before putting your boat to shore and finding a nice, large patch of land for her to sit comfortably in, before finally stripping off your [armor].  She plops down on her round firm ass, spreads her legs, and picks you up gently in one hand.  \"<i>Thanks for this,</i>\" she says quietly before delicately placing you on top of her already throbbing dick, right at the base.  The dick is actually quite small when compared to the rest of the girl and you imagine that proportionally it would only be around seven inches on a normal sized person.  Still, it is far larger than any other dick you imagine this world has seen, the dark veins running up along it as wide as your forearms.");

		DisplayText("\n\nEnding your inspection and deciding to get down to work, you get down on your knees and begin rubbing your hands in gentle circles right at her cock's base.  Despite her enormous size Venus seems to be quite sensitive and it isn't long before she begins cooing in pleasure.  You start rubbing the green cock more roughly, kneading the dick flesh with your hands as you slowly start to move up the herm's shaft.  \"<i>Oh... I didn't know this would feel so good,</i>\" the giant moans, tugging on a tit with one hand as another snakes past you towards her wet gash, a finger probing into the depths of her cunt and leaving you to continue your work on her erect cock.  You massage the throbbing member with your hands, stroking and kneading it to the rhythm of the green girl’s moaning and cooing.  As you crawl further up her cock you get off your knees and lie on the twitching beast, freeing up your legs to better stroke her with your entire body.");
		//[If PC has cock]
		if (player.torso.cocks.count > 0) DisplayText("  [EachCock] quickly hardens now as it is rubbed up against the giant's massive shaft.");
		if (player.torso.vaginas.count > 0) DisplayText("  The warm heat that radiates off of the titanic member seems to seep into your nether region, making your [vagina] leak out moisture onto the massive prick.");
		DisplayText("  She squirms under your touch, falling on her back and wriggling almost uncontrollably.  You're quite surprised at the power you hold over such a behemoth.");

		DisplayText("\n\nYou finally reach the dark green head of her massive meat stick, treating it to your tender ministrations.  Pre-cum bubbles up from the tip, smelling potently of sex and arousal.  You're sure it contains pheromones and aphrodisiacs.");
		//[If either corruption is under 50 or libido is under 75]
		if (player.stats.cor < 50 && player.stats.lib < 75) DisplayText("  You knead the cock head with your hands, massaging it quickly and roughly as you grind up against it, rock back and forth on the giant member.  Some of the pre dribbles down and you begin to use it as sticky massage oil, working it into the cock flesh.  The cooing and lustful moaning coming from the giantess increases in intensity with your every movement.");
		else DisplayText("  You climb further up the head to the tip before leaning in to take a gulp of the creamy liquid.  It tastes salty yet sweet, and surprisingly very much like watermelon.  You take another sip, lapping it up on your tongue and swishing it in your mouth before sending it down your throat.  Relaxing warmth spreads through you, sending your arousal shooting up like an arrow.  You begin to massage and drink, settling into a steady yet intense back and forth motion, the moaning from the giantess increasing in volume with almost every move.");
		if (player.lactationQ() >= 200) DisplayText("  Milk begins to dribble from your [nipples], making the cock head slick and allowing you to wriggle your body against it more smoothly.");
		DisplayText("  \"<i>Oh by Marae!  I'm cumming!</i>\" she shouts before a thick load shoots out like a tidal wave, narrowly missing your face.  The massive white globs rise high beyond the tree tops before falling back to the earth as goopy rain.  She continues to cum undaunted, and you begin rubbing yourself vigorously against her cock head until you reach your own smaller orgasm.");

		DisplayText("\n\nEventually the torrent of white cream subsides, leaving you both soaked in hermy cock milk.  \"<i>Wow... just wow,</i>\" Venus says, seemingly pleased with her green dick.  \"<i>And to think I've been missing out on this!</i>\"");

		DisplayText("\n\nYou clean yourself up, get dressed, and wave goodbye before leaving the giantess, who's still blissed out from her intense orgasm.");
		//[Corruption increases slightly, lust is decreased]
		player.orgasm();
		player.stats.cor += 1;
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//[If Incubi Drafts]
	private incubiDraftsDatKaiju() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("You ask the big green slut if she’d be open to growing a new toy between her legs to play with.\n\nHer eyes go wide in surprise at the suggestion, a deep red blush spreading across her cheeks. \"<i>I admit, I have thought about it. Something long and hard to stroke, but I really don’t know,</i>\" she says, obviously excited yet embarrassed by the idea. \"<i>Would you really be okay with it?</i>\"");
		//[Yes][No]
		//[If No] (Return to menu)
		MainScreen.addButton(0, "Yes", yesTurnKaijuFuta);
		MainScreen.addButton(1, "No", repeatKaijuEncounter);
	}

	//[If Yes]
	private yesTurnKaijuFuta() {
		DisplayText().clear();
		DisplaySprite(103);
		Flags.list[FlagEnum.KAIJU_BAD_END_COUNTER] += 2;
		let counter: number = 10;
		while (counter > 0) {
			counter--;
			if (player.inventory.items.has(consumables.P_DRAFT)) player.inventory.items.consumeItem(consumables.P_DRAFT);
			else if (player.inventory.items.has(consumables.INCUBID)) player.inventory.items.consumeItem(consumables.INCUBID);
		}
		DisplayText("You wouldn’t have offered if you didn’t want to see a giant green futa-cock dangling between her legs.  Your declaration seems to have deepened her blush to almost beet red, but the lustful look in her eyes betrays her desire.");
		DisplayText("\n\nSince her hands are too large to fiddle with the small containers she has you stand on her bottom lip while she lies down, you pouring draft after draft into her open mouth.  By the time the tenth draft has been emptied the green girl can barely keep still, writhing in sexual pleasure and excitement.  She picks you up into one hand as she sits up spread legged, her other hand clasped to her pink nether regions, her palm rubbing furiously at her clit.  \"<i>Oh my goddess it feels too good!  I’m going to cum, I got to cum,</i>\" she cries out as her hand is pushed out away from her crotch by her expanding clitoris, the pink nub taking on a green color and a much more phallic shape.  As her clit-cock expands and changes she grabs it with her hand, getting in two good strokes before the change is complete and she ejaculates for the first time with her new green turtle herm cock!");
		DisplayText("\n\n\"<i>Oh gods above, is that what it’s like for men? I got to get me more of that!</i>\" she exclaims, looking at you expectantly.  \"<i>Well, giving me a cock was your idea, so you won’t mind helping me use it, right?</i>\"");
		DisplayText("\n\nYou look at her with a raised eyebrow.  Use how?");

		DisplayText("\n\n\"<i>Oh don’t look so concerned, I know it can’t fit in you.  Well, not without some major corrupt magic on my part and a crazy willingness on your part, but we could always discuss that later.  But how about a little urethra play?  I’ve seen a minotaur stick a pinkie finger in his cock before, I think you’ll fit.</i>\"");
		DisplayText("\n\nWait, she wants you in her dick? The hell kind of minotaur was she spying on?");
		DisplayText("\n\nBefore you can comment or protest or even question the logic of her plan she has already stripped you of your [armor] and positioned you in front of her crotch, face to face with her cum-slit.  A giant sized glob of pre has already formed at the head of her dick, her newly formed cock apparently a bit of a leaky faucet.  \"<i>Geronimo!</i>\" she yells as she pushes you face first into her goo drizzling tip, your head sliding into her dick with surprising ease, though your shoulders seem to be a different manner.  She pushes and twists you about, gently adding pressure until you finally pop right in all the way to your waist.  It’s surprisingly slippery in her cock, lubed by sweat and precum, and you slide with some ease even further into her dick until you are in up to your ankles despite the tightness of her passage, keeping your arms pinned to your sides.  You wiggle your feet a bit outside her dick before the perverted giant uses them to pull you most of the way back out before shoving you in there once more.  From your vantage point you can almost see all the way into her balls, and to your horror you see a new giant glob of pre heading your way!  You try to shout or move about to get the green herm’s attention, but your voice is muffled and your body constrained by the tight cock flesh all around you.  You take a deep breath and hold it right before getting a face full of musky sweet precum, the scent in your nose reminding you of salty...watermelon? You barely have time to register the scent before you are yanked out of her cock and can breathe again, her pre dripping off your face.");
		DisplayText("\n\n\"<i>Sorry about that, it only just occurred to me that might pose a problem.  But I have an even better idea, and this way I can see your cute face!</i>\" she says, blushing in delight at the view of your precum dripping face.  \"<i>Gods above [name] but you look like a whore!  By Marae you’re turning me on!</i>\"");

		DisplayText("\n\nShe quickly has you positioned in front of her cock once more, this time feet first so she can keep your head free.  You can see your legs slowly slide down into her green cock, her cum-slit swallowing you up to your [hips].  You can feel the walls of her cock head push in all around you, squeezing your [butt]");
		if (player.torso.cocks.count > 0) DisplayText(" and your " + Desc.Cock.describeMultiCockShort(player));
		DisplayText(".  \"<i>Wow, you look absolutely gorgeous in my cock!</i>\" the giantess says with glee, perverse desire in her eyes as she shoves you in further up to your [chest], her trembling, squeezing cock seeming to give you an almost relaxing massage.  You can barely believe it, but this unnatural giantess has as much control over her urethral walls as the most whorish succubus has over her cunt!  Only your arms and head are free of her cock as her unusual member starts squeezing and rippling all along your body.  It seems her new dick wants to give you a happy ending.");
		DisplayText("\n\nJudging by the lustful cooing sounds, the jolly green girl is nearing her limit, her free hand snaking down to gently stroke her giant cock.  \"<i>Going to cum I’m going to cum going to cum!</i>\" she shouts as she reaches her own orgasm before you.  Suddenly her dick widens at the base as her second cum shot heads your way!  With your body lodged tightly in the way, the corrupted turtle sperm has nowhere to go but in, your [butt] suddenly filling up as your bowels are flooded with cum!");
		//[If PC has a cock]
		if (player.torso.cocks.count > 0) DisplayText("  So much jizz fills your ass it can’t help but to press in on your prostate, making [eachCock] stiffen with a seriously growing urge.");
		//[If PC has a vagina]
		if (player.torso.vaginas.count > 0) DisplayText("  Your ass isn’t alone in the feeling of being flooded as your [vagina] and womb are packed with the hermaphrodite’s sperm.");
		DisplayText("\n\nYou manage to reach your own orgasmic climax right before the pressure finally pops you out of her cock like a cork from a wine bottle.  You black out somewhere above the lake.");

		DisplayText("\n\nYou wake up about an hour later, dressed and in your boat, already docked back at shore.  The green giant Venus is there, sitting nearby and gazing out over the lake before your movements attract her attention.  \"<i>Hey there voyeur,</i>\" she says happily, a lot calmer than she was with you in her cock, but still with the ever present haze of lust in her eyes.  \"<i>Look, I just wanted to thank you. Not a lot of people are cool with me, what with my size and perverse delights that’d probably make a succubus faint, don’t act like you don’t know.  But you’ve been pretty cool, even when I shove you into sex holes where whole people probably shouldn’t go.  And, you gave me a cock.  I wanted a dick even before I started soaking up corrupt fluids like a sponge, and now I have one thanks to you. So... thanks babe,</i>\" she finishes before wading back out into the lake.  What a strange, grateful girl.");
		Flags.list[FlagEnum.KAIJU_COCK] = 1;
		//[Corruption increases slightly, lust is decreased]
		player.orgasm();
		player.stats.cor += 1;
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//Improved Bad End
	//Venus' Sex Toy
	//[Triggers after doing something sexual with Venus a lot in a few days, but with a cooldown]
	private kaijuBadEndToyBOOSH() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("As you are rowing through the lake you once more stumble upon the jolly green giantess Venus, who seems to be in the throes of pleasure as she masturbates furiously in some shallow waters, rubbing her large ");
		//[if Venus is female]
		if (!kaijuCock()) DisplayText("clitoris");
		else DisplayText("cock");
		DisplayText(" with the palm of her hand as her pussy gushes corrupt cunt juice in waves.  Her other hand is tugging and pinching one of her nipples for all it is worth, milk spurting out of the giant pink nub as she moans to a degree to make a whore blush.  You can feel your own cheeks redden as you view the erotic display.  You have been pleasuring the giant girl a lot lately, maybe you spiked her already high libido to the breaking point?  Her panting gets heavier as she seems to near climax, a litany of dirty sex talk flowing from her lewd mouth as she rocks in pleasure, much of it incomprehensible but you could swear you heard her moan out your name.  Whatever she's imagining, she hasn't seemed to notice you yet as she finally reaches a loud and wet climax.");

		DisplayText("\n\nYou're unsure whether you should speak up or sneak away when one of her eyes opens lazily and she spots you sitting there red faced.  \"<i>Oh, has my sneaky voyeur come to play?</i>\" she asks with a sultry moan, using both hands to mash her mammoth mammaries together and lean towards you, posing provocatively.  \"<i>I was hoping you'd show up cutie,</i>\" she says when a sudden errant spurt of milk flies from one of her much abused tits to douse you and practically flood your boat with the delicious white liquid.  \"<i>Oh my,</i>\" she continues, raising a hand to stifle the laughter as she giggles at your suddenly milky white form.  She reaches to pick your boat up out of the water, her eyes glazing over in lust.  You get the bad feeling that she'll be far more insatiable today than she's been in the past, and for this hyper-sexed lusty giant that's saying something!");

		//[If PC has wings of any type]
		if (player.canFly()) {
			DisplayText("\n\nIt is not too late to fly to safety if you so choose.  Do you make a go of it?");
			//[Yes][No]
			
			//[If yes] Flapping your wings at max speed you beat a hasty retreat! [PC winds up back at camp]
			//[If no] (Scene continues as normal)
			MainScreen.addButton(0, "Yes", flyAwayFromBadEnd);
			MainScreen.addButton(1, "No", badEndPartTwo);
		}
		else {
			
			MainScreen.addButton(0, "Next", badEndPartTwo);
		}
	}

	private flyAwayFromBadEnd() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("Flapping your wings at max speed you beat a hasty retreat!");
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//[End wings]
	private badEndPartTwo() {
		DisplayText().clear();
		DisplaySprite(103);
		DisplayText("The horny giantess makes short work of your [armor] and soon the green gal has you mashed against her puckered lips, doing her best to give a passionate kiss despite the size barrier.  Pulling you up towards eye level, her voice growls with lust as she says, \"<i>By Marae you get me so hot and bothered.  We've just been fucking so much lately I can't get you out of my mind!  You naughty, wonderful, glorious, perverted " + Desc.Gender.mf(player, "boy", "girl") + "!  I just don't think I can stand it without you any longer!</i>\"  Without further comment she places you at the tip of one of her great big green milk machines, shoving your face into a pink colossal nipple.  \"<i>Drink up now.</i>\"  It's apparent she wants to feed you her corrupted milk, and there doesn't appear to be much of a choice in the matter now.  Her nipple is larger than even some of the more massive cocks you've seen in this land, yet you manage to get your mouth around the very tip of it and begin to suck mercilessly at the milky teat as you bring your hands up to stroke and pinch at the base of the overly sensitive large nub.  \"<i>Oh goddess!</i>\" the giant slut moans above you.");
		if (player.torso.neck.head.face.tongueType === TongueType.SNAKE) DisplayText("  Your snaky forked tongue begins lashing about, flicking at the nipple tip in your mouth while rubbing at the underside of it, urging the tender spot to give up a drop of the heavenly white liquid.");
		//[If PC has demonic/dragon tongue]
		else if (player.torso.neck.head.face.tongueType > TongueType.HUMAN) {
			DisplayText("  The long tongue in your mouth slowly crawls around the nipple tip clenched between your lips, wrapping around the milky nip and squeezing to urge a dollop of milk out.");

			DisplayText("\n\nThe pink tip refuses to give up a drop however as your tongue begins to stroke up and down what small length of nipple flesh you have managed to gather up in your mouth.  Un-sated, the tongue pulls at the tender nipple flesh, forcing more into your oral sex hole as your head is pushed up further onto the moaning girl's unwieldy pink nub.  With the aid of your determined tongue you manage to get a few more inches into you.  Before the nipple can slide down into your throat however, a wicked idea comes over you.  Unwrapping your cursed tongue from the lusty girl's nipple, you aim the tip of your oral muscle and jam it at the head of the milky member in your mouth, your tongue slowly working its way into the nipple, inch by inch, until all of it has bottomed out, the giantess giving a sudden scream of ecstasy.\n\nWith determined strength, you begin working more of the nipple into your mouth, finally bringing it to the entrance of your throat before sliding it down your gullet.  How often do you get to deep throat a nipple?  You begin humming, trying your best to get the nipple to vibrate in your mouth as your tongue undulates and wiggles in the green breast, the very tip of your tongue tasting the liquid gold of her milk.  Your hands at the base of her nipple begin kneading the milky teat firmly with spurred on fury, massaging the much abused areola until the green girl is panting in short lusty breaths.  \"<i>My goodness!</i>\" she moans, milk suddenly pushing at the tip of your tongue, trying to leak around it to get to your mouth.  \"<i>Pull it out pull it out pull it out I gotta release!</i>\" she screams, desperately needing to release the milk that's backed up, your demonic tongue acting as some kind of nipple plug.  With a smile, or as much a smile as your mouth is capable of wrapped around a milk engorged nipple, you withdraw your tongue from her teat, a rather swift process as the pressure of her milk forces your corrupted tongue backwards.\n\nRemembering you have the end of her teat deep within your throat, and not wanting to have your tongue shot down into your own belly, you begin to pull the nipple out as quickly as you can.  Luckily at the last few inches her milk manages to flow around your tongue, covering every taste bud in white calcium rich fluid, pouring out into your sorely taxed throat and coating it in white as the milk sloshes into your belly, gallons of the stuff filling you up till you look nine months pregnant with triplets.  You finally manage to disengage the nipple from your mouth, your tongue finally popping out as you are once again splashed head to toe in the creamy white of the green girl's milk.  Your tongue just hangs out of your mouth as your milk bath slowly dwindles down to a shower, then a drizzle, and a slight dribble before tapping off.");
		}
		//[Only if PC doesn't have a demon/dragon tongue] 
		if (player.torso.neck.head.face.tongueType <= TongueType.SNAKE) {
			DisplayText("\n\nYou suck at the prodigious nipple, teasing more and more of it into yourself until you're massaging much of its length with your throat.  The pink flesh stiffens from the green slut's pleasure as you service the slowly leaking teat, licking at the base while your hands massage the puffy areola.  The giantess squirms in delight as you work on the dribbling milk nozzle before she brings her other hand up to tease the nipple you aren't connected to.  \"<i>Oh, don't stop babe,</i>\" she tells you as you force out one large gushing 'drop' of milk from her mammoth mammary after another.  After you have your milky fill, you slowly draw the teat out from your throat until it plops out of your mouth with a popping sound.\n\nDeciding to tease the lusty girl further, you continue to flick your tongue over the gushing nip, letting the refreshing taste roll right off your tongue. You begin to pump at the nipple with both your hands, watching as the milk geyser continually shoots past your head to mix with the lake water below, making the area a cloudy white around the giant girl's knees.  You pump and lick in a rhythm, determined to empty her tit for all it’s worth.  The moaning turtle girl can barely stand as she sways from your administrations.  \"<i>So good!</i>\" she pants out, starting to use her thumb to rub your back in encouragement.  It takes a while, but eventually her titanic tit finally empties out.");
		}
		DisplayText("\n\n\"<i>Oh babe, you really know how to work a tit, don’t you?</i>\" the lusty giant says before moving you towards her crotch.  \"<i>It’s good you had all that milk to drink, I wouldn’t want you to get dehydrated during the next task at hand.</i>\"  It seems her heightened lusts haven’t been dimmed just yet!");

		//[If Venus is a herm]
		if (kaijuCock()) {
			DisplayText("\n\nYou find yourself face to face with her giant green dick, which is already leaking a copious amount of pre in her arousal.  \"<i>You know, growing up in the village I was expected to follow in my mother’s priestly footsteps, but I never really had the restraint for the work.  You know what they say about the high priestess’s daughter right?  But I did learn a bit about holy spell-work.  Well, with this corrupted body you’re going to see some decidedly unholy spell-work,</i>\" she says before stroking her cock with her free hand, the giant dong inflating to its full size as she begins to mutter strange and incoherent words under her breath.  Suddenly her bubbling pre takes on a decidedly pink color as some kind of magic takes effect, the bright pink pre-jizz dimly glowing before your eyes.");
			DisplayText("\n\n\"<i>Alright cupcake, drinky drinky,</i>\" she says, pushing your head deep into the bubbly goo.  She leaves you there to drink or drown, so drink you do, until your belly is fit to burst and your lungs are aching.  Then she gives you a chance to catch your breath before rubbing you on her cock tip, bathing you in the pink cum until your skin is shiny with it all over.  You suddenly feel a tingling all over your skin and in your belly, then slowly the tingling spreads as if your body is absorbing it into every part of yourself.");
			DisplayText("\n\n\"<i>Do you feel it working yet?  Can you guess what it did?  I’ll give you a hint,</i>\" the giantess says, a mad look of lust in her eyes as she gazes at your nude, helpless form.  It appears the turtle girl you know is gone, completely taken over by her libido.  She turns you around and you suddenly feel the giant head of her dick resting on your [butt].  Why is she rubbing your ass with her dick, she knows it won’t fit right?  It’s bigger and wider than your whole body!");
			DisplayText("\n\nAnd that’s when you feel the impossible.  Your asshole expands, gently giving ground to the leviathan at your backdoor as you feel your hips part and stretch away from each other.  Her magic pink cum has turned you into the most elastic fuck toy in the land!  Oh, this is just too wrong.");
			Mod.Butt.displayStretchButt(player, 500, true, true, false);
			DisplayText("\n\nSuddenly her entire cockhead enters your ass, stretching you out obscenely.  You orgasm instantly.  You might handle anal better than this under normal conditions, but then there’s nothing normal about taking something this huge.");
			if (player.torso.cocks.count > 0) DisplayText("  You prostate is pressed down like a button, and there’s just no letting up!");
			if (player.torso.vaginas.count > 0) DisplayText("  Even if your cunt is empty, there is no free space left there, your cunt walls forced together like glue.");

			DisplayText("\n\nDespite the impossible intruder stretching out every part of yourself into a cockhead shaped condom with waving arms and legs your skin doesn’t even feel tight yet.  Just how stretchy are you?  You begin to find out as the green girl’s hand goes down the full length of her cock, your bottom half going down every inch of the way as your middle stretches like a rubber band.  \"<i>Oh gods [name]!  You feel incredible!  You’re so tight!</i>\" Venus says, her lust fueled mind even forgetting about the spell she placed on you, all non-essential thoughts and memories pushed out by her fiery need to fuck.  \"<i>Fuck, fuck, fuck, fuckfuckfuckfuckfuck!</i>\" she continues, language becoming the next casualty as she pumps her dick faster and faster with her hand, using you as an all natural elastic onahole!  You’d be amazed at how painless the experience is if you could form coherent thoughts, but that big dick in you has driven out all rational thought, your mind more blissed and fucked out than even the sultry giant’s!");

			DisplayText("\n\n\"<i>Cum!  Cumcumcumcum!  Cumcum!  Cum!</i>\" shouts the giant herm, her words falling on your dim mind with a tugging familiarity.  You feel like you should be afraid for some reason... understanding suddenly crashes in on you as your body suddenly expands further, bloating out like some impossible cum balloon.  You can’t even see the ground for your cum stretched belly.  Sperm flows out of your mouth like a waterfall, her massive ejaculation finally finding a way out.");
			DisplayText("\n\nSome minutes pass before she finally takes you off her dick.  A veritable river of spunk flows out your back end as you shrink and snap back to your former size.  Well, almost your former size, you still look pregnant with minotaur triplets and your asshole is stretched beyond repair.");
		}
		DisplayText("\n\nWithout further comment the lusty turtle girl shoves you up her cunt, her vaginal walls crashing in on you as her cunt juice soaks you all the way through. \"<i>That’s right babe,</i>\" comes her muffled voice, \"<i>you hit all the right spots.</i>\"");

		DisplayText("\n\nYou’re drenched in the turtle girl’s love juices as she near instantly cums from pleasure, but you know it’s far from over as she keeps thrusting you up and down, in and out of her colossal cunt.  \"<i>Oh gods! So good!</i>\" she moans, her voice soft and muffled from your vantage point inside of her.  \"<i>I need more!  I need more in me!</i>\"  Well, considering you’re all the way in that’s going to be kind of hard, there’s nothing more to shove i... wait, what is that below you? Green foliage spreads out underneath you as she shoves a tree up her titanic twat!  Even for her impressive size you can tell this is almost too much for the giantess, as it stretches her cunt out.  But there’s something more, something almost hard to see in the dark, pink depths of her sex, but you manage to make out long, slithering tendrils sliding up from the tree towards you.  She’s fucking herself with a tentacle tree from a corrupted glade!  You’re not exactly in a position to walk away from the corrupted foliage as the tree’s long vine-cocks begin to climb up your legs with lustful intent.  Whether you want it or not, you’re about to get fucked inside this cunt.");

		DisplayText("\n\nThe first planty-cock hits your ass like a switch, spanking your [butt] till your cheeks are blushing red before the tip snuggles up to your puckered sphincter.  It wriggles wildly, working itself up in ecstatic anticipation, or at least the plant-like version of anticipation, drippy vine-pre-seed lubing up your hole before pushing forth with all its might, meeting only a little resistance before the pressure and fluid mixture eases it into your [butt].");
		Mod.Butt.displayStretchButt(player, 30, true, true, false);
		DisplayText("  Inches slide in at a time as it spasms inside of you, attempting to hit every sensitive spot your ass may have as it slowly tries to stretch you out.\n\n");

		//[If PC has a cock] 
		if (player.torso.cocks.count > 0) DisplayText("[EachCock] stiffens as the tree tendril pushes against your prostate, forcing a thick glob of pre up your shaft.  ");
		if (player.torso.vaginas.count > 0) DisplayText("As the first vine-cock works its way up your rectum a second has found its way up to your snatch!  The plant-like head rubs against your folds almost lovingly, tenderly, before the head starts to prod past your pink lips, butting up against your cunt as part of the shaft rears up to rub against your clit, sending shockwaves through your body, and the vine-cock chooses this moment to plunge into your [vagina].  Now you have two cocks ramming into your holes, pressing up against your walls as if to feel each other through you.  The plant dick in your pussy slides up and down through your folds, each thrust out going ever so slowly, only to ram back in at full speed, more inches sliding in every time until the head is bumping up against your cervix, leaky pre-seed slowly filling up your cunt to leak out between your thighs.  ");
		DisplayText("  The next sinuous cock threads itself between your legs, up your belly, past your chest to lightly poke at your lips.  You open your mouth to shout when the cock in your [asshole] hits a sensitive spot and the cock at your mouth slides right in, dripping seed into your mouth, your tongue suddenly awash in a salty, yet pleasantly sweet flavor.");
		if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1) DisplayText("  Another tendril snakes its way up your abdomen to nestle between your [chest], slicking your mounds with pre as it slides between your tits, giving itself a titty-fuck with your titties!");

		DisplayText("\n\nMore tentacles squirm up, wrapping around your limbs bondage fashion, while others rub and knead against you in a lewd massage, all while the giant’s pussy flesh wrings around you, soaking you and massaging you and the tentacles as the green girl screams like a whore in the throes of the best sex of her life.");
		if (player.torso.cocks.count > 0) DisplayText("  More tentacles arrive and begin to wrap around your " + Desc.Cock.describeMultiCockShort(player) + ", slowly jacking you off to the tempo set by the cocks in your ass and mouth, wracking you with further pleasure.");
		DisplayText("  All this intense pleasure is too much for you and you reach one of the hardest, messiest orgasms of your life, and by the way the green giant’s pussy clenches and soaks you even further in her fluids you know she has reached yet another climax as well, and yet she doesn’t stop thrusting that tree in and out of her abused turtle snatch, taking you for a further ride as you get pulled along with the corrupt foliage, attached by the tireless vines.");

		DisplayText("\n\nIt is many hours before the pressure and pleasure becomes too much for even the slutty giant, but rather than end it she merely ratchets her sexual perversion down a peg, taking the tree out of her soaked cunt for now, but still diddling herself off to smaller orgasms with you.  You’re helpless as she uses you as a living dildo, pushing you as far into her dripping cunt as you will go, smacking you repeatedly into her G-spot and bringing herself to orgasm after orgasm.  Her massaging walls and inquisitive fingers bring you to orgasm almost as much.  Even in the haze of her lust, she still cares enough to get you off.  But that doesn’t seem to stop her from pumping you into her pussy for hours, only taking you out to feed you more of her milk to keep you going.  Finally, her arms grow tired, and even her impossible libido wanes. Hopefully you’ll be able to leave her and head back to camp soon... or so you thought.\n\nWhether through magic or gods only know how, she seems to have formed a boulder into a smooth, wide, bulbous yet short (relatively speaking) vaginal plug, which she uses to plug up her hole with you still trapped inside.  It appears you’re to now call her vagina home, a live in sex toy only taken out to be fed milk and pleasure her in various ways.");
		player.orgasm();
		player.stats.lib += 5;
		player.stats.sens += 30;
		player.stats.cor += 4;
		Game.gameOver();
	}
}
}