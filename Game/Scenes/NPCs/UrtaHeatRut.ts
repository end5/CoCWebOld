﻿export class UrtaHeatRut extends NPCAwareContent {

	private urtaQuestDone(): boolean {
		return (Flags.list[FlagEnum.URTA_QUEST_STATUS] === 1);
	}

	//[Approach Sober Urta]
	internal function approachSoberUrtaHeatRutProc() {
		DisplayText().clear();
		urta.urtaSprite();
		DisplayText("As you walk over to the table where your foxy herm-lover sits, you think you see eyes following you, your presence attracting an unusual amount of attention. ");
		if (player.inHeat && player.inRut && player.torso.cocks.count > 0 && player.torso.vaginas.count > 0) DisplayText(" Males, females and herms alike stare at you with a mixture of puzzlement, longing and hostility, as if unsure whether they want to fight with you, fuck you senseless or be fucked senseless by you.");
		else if (player.inRut && player.torso.cocks.count > 0) DisplayText(" Males stare at you with a hint of challenge in their eyes, whilst females eye you attentively. Herms don't seem sure whether they want to fight you or fuck you.");
		//(Player in heat
		else if (player.inHeat && player.torso.vaginas.count > 0) DisplayText(" Males, and individuals who look like females at first, until you spot the telltale bulge of at least one cock in garments or hanging freely between their legs, stare at you with obvious desire as you go, more than a few erections starting to form in your wake.");
		DisplayText("  You ignore them all, concentrating on Urta.");

		DisplayText("\n\nAs you approach, ");

		if (urtaLove()) DisplayText(" she opens her arms to embrace you, and smiles.");
		else DisplayText(" she smiles when she sees you, but then gives the air a sniff and immediately seems to gain more color to the skin under her fur.  \"<i>Uh, I, I see.</i>\"  You sit down next to her, but even though she isn't even suggesting anything yet, you already find it hard to control yourself.");

		if (player.inRut && player.torso.cocks.count > 0) DisplayText("  Urta is right next to you, and she has already proven herself a good lay");
		else DisplayText("  You keep reminding yourself what Urta is packing between her legs and how much precious semen it can give, and can't help but want to try that now");

		DisplayText(".  Not to mention, with or without the monster between her legs, her body is sexy as hell.");

		DisplayText("\n\n\"<i>Well, you do help me with my own releases, so I suppose that's fair....");
		if (player.inHeat && player.torso.vaginas.count > 0) DisplayText("  You... smell good, so I at least hope you're not here to tease me.");
		DisplayText("</i>\"  She leans closer to you, and ");
		if (player.inRut && player.torso.cocks.count > 0) DisplayText("your eyes are quickly drawn to her full breasts as she whispers something to you. You're too hypnotized to care.");
		else DisplayText("you lose yourself in your imagination about having Urta take you raw and pump you full of sperm.  There's a faint voice you hear, and you realize it's Urta's as you snap back to reality.");
		DisplayText("  She coughs and repeats herself.  \"<i>Are you here because of your, um, condition? You'd prefer to blow off some steam with ");
		if (urtaLove()) DisplayText("your adorable, hot vixen");
		else DisplayText("someone you know and trust");
		DisplayText(", right?</i>\"");

		DisplayText("\n\nYou nod with a little too much enthusiasm.  She grabs you by the hand as she leaves a few gems on the table, careful not to touch any part of your that may be too sensitive at this point.");

		DisplayText("\n\nAs she leads you into the alleys and apparently, towards her home, your mind and eyes");
		if (player.inRut && player.torso.cocks.count > 0) DisplayText(" focus is on the hips of the fox-morph");
		else DisplayText(" focus on catching a glimpse of that amazing cock, and you keep imagining what she can do with it");
		DisplayText(".  Your aggressive hormonal state demands that you ");
		if (player.inRut && player.inHeat && player.torso.cocks.count > 0 && player.torso.vaginas.count > 0) DisplayText(" put a baby in her, then let her put a baby in you");
		else if (player.inRut && player.torso.cocks.count > 0) DisplayText(" put a baby in her so she can push it out of those beautiful hips");
		else DisplayText(" put that beautiful big cock into your needy [vagina]");
		//[If Urta's fertility quest wasnât done]
		if (!urtaQuestDone()) DisplayText(", even if something keeps reminding you that's impossible.");
		else DisplayText(".");

		DisplayText("\n\n\"<i>You know, [name] I'm glad to see you as always.  ");
		if (urtaLove()) DisplayText("  I'm really thankful you managed to control yourself and see me with this.  You know that if you need me, I'm always ready to help, love.</i>\"");
		else DisplayText("  I'm really flattered you thought of me when in such a state!</i>\"");

		DisplayText("\n\nSuddenly, the instincts get a bit too strong and the moment you enter a somewhat long, dark, separate alley, You put your arms around Urta and push your ");
		if (player.inRut && player.inHeat && player.torso.cocks.count > 0 && player.torso.vaginas.count > 0) DisplayText("mixed genitals");
		else if (player.inRut && player.torso.cocks.count > 0) DisplayText("[cock biggest]");
		else DisplayText("[vagina]");
		DisplayText(" against her backside.");

		DisplayText("\n\n\"<i>Um, you know, I'm horny, too, but at least wait 'til we get to my place...</i>\"");

		//Player in heat and rut:
		if (player.inRut && player.inHeat && player.torso.cocks.count > 0 && player.torso.vaginas.count > 0) {
			DisplayText("\n\nYou turn Urta around and see in her eyes a desire nearly as big as in yours.  You practically throw yourself at her, pushing her against the wall, mauling her big breasts, assaulting her lips and rubbing your thighs against her big, erect horse-dong, not really sure yet how the hell you'll satisfy all your body's desires at once.  Urta growls with desire, ripping her dress open and the two of you quickly toss your [armor] all over the place.");
			DisplayText("\n\nUrta looks like she's about to say something, but then she stops, confusion pushing aside horniness, if only for the moment.  \"<i>I... What are you going to use?  Your cock?  Your pussy?</i>\" she asks, panting with eagerness to begin.");
			//[Cock] [Pussy])
			
			if (player.cockThatFits(urta.urtaCapacity()) >= 0) MainScreen.addButton(0, "Cock", sateRutWithSoberUrta);
			else MainScreen.addButton(0, "Cock", sateRutWithSoberUrtaButHuegDicked);
			MainScreen.addButton(1, "Pussy", soberUrtaSatingPCHeat);
		}
		//Player in rut:
		else if (player.inRut && player.torso.cocks.count > 0) {
			DisplayText("\n\nYou roughly shove your fingers into her mouth as your hand moves lower, between her thighs. The naughty slut isn't even wearing proper underwear, and you quickly begin to molest her black pussy lips before slipping a finger inside.");
			if (player.torso.vaginas.count > 0) DisplayText("  Your " + Desc.Cock.describeMultiCockShort(player) + " and [vagina] are filling your clothes with mixed juices");
			else DisplayText("  Your [cock biggest] begins to seep precum into your clothes");
			DisplayText(", so you decide to dispose of them as you force Urta against a wall.");

			DisplayText("\n\n\"<i>Okay, fine. I had it coming,</i>\" Urta says, though she doesn't sound very unenthusiastic about the prospect of having sex in the alley and, from the stiffness of her cock and wetness of her pussy, her body looks even less opposed to it.");

			DisplayText("\n\nYou shed your [armor] as you approach the willing fox-morph with your cock in hand");
			if (player.torso.vaginas.count > 0) DisplayText(" and your pussy dripping and eager");
			DisplayText(".");
			
			if (player.cockThatFits(urta.urtaCapacity()) >= 0) MainScreen.addButton(0, "Next", sateRutWithSoberUrta);
			else MainScreen.addButton(0, "Next", sateRutWithSoberUrtaButHuegDicked);
		}
		//Player in heat:
		else {
			DisplayText("\n\nYou firmly grab Urta's breast and her cock through her clothes, pushing yourself against her and kissing the fox-morph hungrily.  You ask her to take you here and now, saying you can't wait anymore.");
			DisplayText("\n\n\"<i>All right... I know what it's like to have troubles controlling yourself. If you really want me to...</i>\"");
			DisplayText("\n\nYou dispose of your [armor], your [vagina] already wet and eager for her.  You pull the vixen into an embrace under the wall of the alley, and she starts to align her huge, pre-cum dripping cock with your opening.");
			
			MainScreen.addButton(0, "Next", soberUrtaSatingPCHeat);
		}
	}


	//[Approach Drunken Urta]
	internal function approachDrunkenUrta() {
		DisplayText().clear();
		urta.urtaSprite();
		DisplayText("As you walk over to the table where your foxy herm-lover sits, you think you see eyes following you, your presence attracting an unusual amount of attention.");
		//Player in heat and rut:
		if (player.inHeat && player.inRut && player.torso.cocks.count > 0 && player.torso.vaginas.count > 0) DisplayText("  Males, females and herms alike stare at you with a mixture of puzzlement, longing and hostility, as if unsure whether they want to fight with you, fuck you senseless or be fucked senseless by you.");
		else if (player.inRut && player.torso.cocks.count > 0) DisplayText("  Males stare at you with a hint of challenge in their eyes, whilst females eye you attentively. Herms don't seem sure whether they want to fight you or fuck you.");
		//Player in heat:
		else DisplayText("  Males, and individuals who look like females at first, until you spot the telltale bulge of at least one cock in garments or hanging freely between their legs, stare at you with obvious desire as you go, more than a few erections starting to form in your wake.");
		DisplayText("  You ignore them all, concentrating on Urta.");

		DisplayText("\n\nIn fact, she has already seen you first, and stands up at your approach, also doing her own part to lessen the distance.  Surprisingly, you're stopped in your tracks as the fox-morph pushes you against the bar, with just a small loss of her own balance as she does so.");

		DisplayText("\n\n\"<i>My, my. You do realize what you smell like, don't you?  Did you think I wouldn't notice?  Or are you here precisely because you wanted me to notice?</i>\"");

		DisplayText("\n\nSomehow, the hermaphrodite seems a bit more clingy and flirty than usual, and less subtle about her relationship with you.  As you take in a deeper breath, you realize why - she does reek of one of her favorite drinks... Do you take interest, or decide it may be better to visit when she's her usual and a bit more sober self?");

		//[Interested] [Not interested]
		
		MainScreen.addButton(1, "NotInterested", notInterestedInUburDrunkUrtaRuts);
		MainScreen.addButton(0, "Interested", interestedInUburDrunkurtaRuts);
	}


	//[=Not interested=]
	private notInterestedInUburDrunkUrtaRuts() {
		DisplayText().clear();
		urta.urtaSprite();
		DisplayText("You say it's her who seems to be different today, and gently push her away, before apologizing and making your leave.  ");
		if (player.torso.head.face.type === 2) DisplayText("Your nose does seem to pick up that Urta was and still is getting unusually aroused behind you.  ");
		if (player.inRut && player.torso.cocks.count > 0) DisplayText("[EachCock] twitches in protest at you leaving a willing lay behind.  ");
		//[Medium lust increase] 

		//[If the PC has a snake tongue]
		if (player.torso.head.face.tongue.type === TongueType.SNAKE) DisplayText("You instinctively taste the air, and Urta suddenly seems utterly delicious. ");
		//Rut: 
		if (player.inRut && player.torso.cocks.count > 0) DisplayText("Your " + Desc.Cock.describeMultiCockShort(player) + " hardens in your pants as you still force yourself to leave.");
		//[Medium lust increase]
		else DisplayText("Your condition does seem kind of protesting against leaving such a willing lay behind, but it isn't time to be indulging it.");

		dynStats("lust+", 5 + player.stats.lib / 20, "resist", false);
		//to Tel'Adre bar menu
		
		MainScreen.addButton(0, "Next", telAdre.barTelAdre);
	}

	//[=Interested=]
	private interestedInUburDrunkurtaRuts() {
		DisplayText().clear();
		urta.urtaSprite();
		DisplayText("You raise an eyebrow and ask Urta if she minds telling you the reason for such attention and what exactly it is that you smell like.");

		//Rut And Heat:
		if (player.inRut && player.inHeat && player.torso.cocks.count > 0 && player.torso.vaginas.count > 0) DisplayText("\n\n\"<i>Gods, sexy!  You smell like you walked in here to make babies - like you want to grab the girls and the herms and plough them full of cum, even as you let the guys and the herms stuff your greedy cunt full of baby juice and make you just as pregnant.  It's the best smell ever...</i>\"");
		//Rut:
		else if (player.inRut && player.torso.cocks.count > 0) DisplayText("\n\n\"<i>Well, let me put it like this: you smell like you walked in here to grab every girl here by the hips and breed them all for hours on end, until the whole lot of them's knocked up.</i>\"");

		else if (player.inHeat && player.torso.vaginas.count > 0) DisplayText("\n\n\"<i>Well, let me put it like this: You smell like you walked in here to tease and flirt with every man and herm in the place... stride into the middle of the floor like a queen, then pull off your clothes and bend over to let yourself be fucked and bred for hours until you were well and truly knocked up.</i>\"");

		//If player is in both heat and rut: 
		if (player.inRut && player.inHeat && player.torso.cocks.count > 0 && player.torso.vaginas.count > 0) {
			DisplayText(" Urta shudders with desire and, to your shock, she starts openly fondling her huge prick ");
			if (!urtaLove()) DisplayText("under her skirt");
			else DisplayText("through her quickly-soaked dress");
			DisplayText(".  \"<i>Fuuuck, but you smell so goood... Goddess, I don't know which part of you I want more!  Gimme some of that, sexy... please!</i>\" she begs you desperately.");
			DisplayText("\n\nDo you present her with your cock?  Your pussy?  Or do you just stand here and watch as she jacks herself off in the middle of the bar?");
			//[Cock] [Pussy] [Watch]
			
			MainScreen.addButton(0, "Cock", drunkUrtaIntroPartDuex, 1);
			MainScreen.addButton(1, "Vagina", drunkUrtaIntroPartDuex, 2);
			MainScreen.addButton(2, "Watch", watchDrunkRuturtaJerkoff);
		}
		else if (player.inRut && player.torso.cocks.count > 0) {
			drunkUrtaIntroPartDuex(1, false);
		}
		else {
			drunkUrtaIntroPartDuex(2, false);
		}
	}
	//(If in heat OR rut, or did not pick Watch)
	private drunkUrtaIntroPartDuex(chosenSex: number = 1, newl: boolean = true) {
		if (newl) DisplayText().clear();
		else DisplayText("\n\n");
		urta.urtaSprite();

		DisplayText("Suddenly, Urta's hand dashes to ");
		//[if players has balls]
		if (player.torso.balls.quantity > 0 && chosenSex === 1) DisplayText("your [balls], rolling them in her hand and squeezing a bit too roughly.");
		else if (player.torso.vaginas.count > 0) {
			DisplayText("your [clit], rubbing it until it's ");
			if (chosenSex === 1) DisplayText("the very same state [eachCock] seems to be in so often recently, ");
			DisplayText("erect and throbbing.");
		}
		else DisplayText("your [hips], stroking along them towards [eachCock] in an agonizing display of teasing.");

		DisplayText("\n\nThe fox herself shuts you up immediately by smashing her lips against yours and forcing her tongue inside your mouth.  You can't help but be excited by her aggressiveness");
		if (chosenSex === 1) DisplayText(", and [eachCock] already gets hard in your [armor].");
		else DisplayText(", and you feel the inside of your [armor] rapidly slickened by your [vagina]'s excitement.");

		DisplayText("\n\nYou're a bit surprised by the reaction, and while you're still putty in her hands, Urta pushes you onto the bar table with strength nigh-impossible for her frame.  You feel wood under your back.  Her tail unfolds and presents her already erect equine penis to you, ");
		//Player in both : 
		if (player.inRut && player.inHeat && player.torso.cocks.count > 0 && player.torso.vaginas.count > 0) DisplayText("and she proceeds to maul her breasts, pre-cum seeping copiously from her cock and her snatch drooling over her balls and onto the floor.");
		else if (chosenSex === 1) DisplayText("but she doesn't seem to mind it for the moment.  Rather, the fur between her thighs appears to be rapidly soaking.");
		else DisplayText("which she seems more than intent to push into you, although you do see a bit of female lubricant sliding down her balls.");

		DisplayText("\n\nShe starts to struggle to get you free of your [armor], continuing her assault verbally.  \"<i>Of course, if you actually planned to do this, you'd at least have the courtesy to wait 'til I'm out of here, so I'm sure you don't mind.</i>\"  She seems frustrated by the fact your clothes are less than willing to cooperate in this position.  She does admirably well for someone already intoxicated.  \"<i>Ugh, you better be ");
		if (chosenSex === 1) DisplayText("hard");
		else DisplayText("wet");
		DisplayText(" for me</i>\"  Moments later, as you feel your naked [butt] against the table, her eyes dart to your ");
		if (chosenSex === 1) DisplayText(Desc.Cock.describeMultiCockShort(player));
		else DisplayText("[vagina]");
		DisplayText(".  Her smile opens wider as Urta presents you with a sexy face that seems a mix of positively delighted and predatory.");

		//[If player is in Rut, OR is in Heat AND Rut AND chose "Cock":
		if (chosenSex === 1) DisplayText("\n\n\"<i>Well, I'm sure you don't mind if I take all your spunk and those few hours of fucking all for myself, instead,</i>\" she says as she brings one leg onto the table and the side of you as she sheds her dress, lubricant now drooling from the fox's female half, falling onto your [hips].");

		//[If player is in Heat, OR is in Heat AND Rut AND chose "Pussy":]
		else DisplayText("\n\n\"<i>I think you'll find that I'm more than stud enough for your greedy little twat...</i>\" she growls with lust, one hand stroking your [vagina], before she awkwardly hops up onto the table between your legs.");

		
		if (chosenSex === 1) {
			if (player.cockThatFits(urta.urtaCapacity()) >= 0) MainScreen.addButton(0, "Next", drunkUrtaRidesARutPCsCock);
			else MainScreen.addButton(0, "Next", sateRutWithDrunkUrtaWithHugeDick);
		}
		else MainScreen.addButton(0, "Next", drunkenUrtaFucksPCInHeat);
	}

	//[If player is in Heat AND Rut and chooses "Watch"]
	//[Watch Drunken Urta Jerk Off]
	private watchDrunkRuturtaJerkoff() {
		DisplayText().clear();
		urta.urtaSprite();
		DisplayText("You decide that you want to see the proud captain of Tel'adre's Watch reduced to a horny mess in the middle of the public, and so just take a few steps back and watch.");

		DisplayText("\n\nUrta's massive, equine phallus is so blatantly obvious that at last she ");
		if (!urtaLove()) DisplayText("pulls off her skirt");
		else DisplayText("roughly tears away her dress from the waist down");
		DisplayText(", exposing her flowing member and dripping gash to an appreciative audience.  Her head is flaring wide even as you watch, your scent too much for the lusty fox-morph now that her will has been eroded by copious amounts of booze.  Her tongue lolls freely from her mouth and she whimpers softly as she starts to stroke it with the ease of long practice, using both her hands to circle its three-inch girth and pulling up and down with her need.  Her apple-sized nuts and her D-cup tits alike jiggle and sway as she rocks back and forth on her heels with the motions of her pistoning arms.");

		DisplayText("\n\nYou surpress a giggle of amusement at the sight and begin to flaunt yourself, seeking to tease the poor herm - you have no doubts that she's secretly loving this.  After all, even though the whole bar seems to be staring right at her now, she's not even blushing.  Indeed, her posture changes; she starts holding herself firmer upright, more pride evident in her bearings, and from the way her cock just keeps rising up and up, a great puddle of herm pre-cum forming on the floor underneath her, it seems their attention is actually getting her off even more.");

		DisplayText("\n\nAs you slowly, languidly start to posture yourself for Urta's private delight, holding your clothes so they outline the hidden delights of your [chest], " + Desc.Cock.describeMultiCockShort(player) + " and [vagina], bending over to let her stare longingly at your [butt], the fox-herm whimpers and moans.  By this point, her cock is standing practically straight up, and she releases it with one hand.  This now-freed hand slips between her legs to tend to her neglected slit, the fingers dancing artfully with audible squelches as they probe and fiddle.  Her other hand maneuvers her cock so that it lies squarely between her ample, soft breasts, clumseily trying to alternate between stroking her cock, fiddling with her black nipples, and mashing her tits together to give herself a tit fuck.  She awkwardly thrusts and humps into her own cleavage, pre-cum pouring down her front, bending down to lap at the flared head of her mare-dick.");

		DisplayText("\n\nYou take a glance away from Urta and realize that the combination of your pheremones, her little show and your own efforts at teasing her have got the other customers very excited indeed.  Pairs and even trios are starting to make out all over, singletons are beginning to fiddle with themselves, and there's a couple of very interested-looking herms, all playing with their cocks, that are giving lustful looks your way and heading towards you with an inept attempt at stealth.  Things could get pretty wild if you keep teasing Urta; maybe you should knock it off?");
		//[Stop Teasing] [Keep Teasing]
		
		MainScreen.addButton(1, "StopTeasing", stopTeasingDatHornyFox);
		MainScreen.addButton(0, "KeepTeasing", keepTeasingDatHornyFawkes);
		//PCs with corruption 50+ will automatically choose Keep Teasing
	}

	//[=Stop Teasing=]
	private stopTeasingDatHornyFox() {
		DisplayText().clear();
		urta.urtaSprite();
		DisplayText("You decide there's no point taking things too far - besides, Urta seems just about ready to pop now, especially with how she's frantically suckling at her own cockhead.");

		DisplayText("\n\nAnd pop she does; pulling her head free from her cock with an audible popping sound, she throws it back with a howl more befitting a wolf than a fox as her swollen prick finally unloads its cargo, a fountain of foxy spooge spewing thick and slimy into the air and raining down all over her, plastering her from head to toe in her own jism, even as her cunt spasms and gushes fluid under her.  She cums and cums, drenching herself in herm-spunk until her legs give out and she falls flat onto her shapely rear, her cock giving one last ejaculate before it and she both fall limp onto the floor in the pool of cum.");

		DisplayText("\n\nSeeing her lying there so still makes you concerned and you quickly approach; you didn't want to kill her!  Thankfully, she's still breathing; she just passed out from the overload and from drinking too much.  Looking around you, you can see that an orgy is starting to break out around you, and you quickly make a break for it.  As you go, you can't help but wonder what in the world you were thinking...");
		dynStats("lust+", 20 + player.stats.lib / 5);
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//[=Keep Teasing=]
	private keepTeasingDatHornyFawkes() {
		DisplayText().clear();
		urta.urtaSprite();
		DisplayText("You smirk; things are just starting to get fun around here, why would you stop now?  You start to amp up your routine even more, flaunting your scents and your goods for all the bar's occupants, not just the drunken fox-herm feverishly jerking herself off in front of you.  You can't recall if you've ever danced before coming to Mareth, but you don't think you do too bad as you perform an amateur strip-dance for the audience around you, slowly peeling off your [armor] and sensuously discarding them, bending over to let Urta and any other cock-bearing character present in the bar get a good look at your [vagina], ");
		if (player.torso.balls.quantity > 0) DisplayText("lewdly cupping and fondling your [balls], ");
		DisplayText("slowly beginning to stroke and caress your " + Desc.Cock.describeMultiCockShort(player) + " for the benefit of those who bear vaginas.");

		DisplayText("\n\nAs you seductively twirl around to face Urta again, you notice with surprise that she has stopped playing with her parts; instead, both of her hands are fiercely gripping her cock, just above her sheathe.  Putting an exaggeratedly disappointed expression on your face, you saunter confidently over to Urta, teasing her about what the matter is; doesn't she want to cum?  Her balls - you pause to jiggle them playfully - are so full of cum; surely it's time to cut loose and let it all out?");

		DisplayText("\n\nAt that, her eyes suddenly open wide - a madwoman's light burning in their depths.  \"<i>Yes it is!</i>\" she barks, suddenly pulling her cock around so that its head faces directly at your startled visage and releasing her grip.  A virtual cascade of cum geysers forth, spraying all over you!  You gasp and splutter, great wads of salty goo jetting into your mouth, matting down your [hair], spraying jism all over your [chest], blinding you and leaving you to fall back, reeling from the sudden onslaught.  You fall to your hands and ");
		if (player.torso.hips.legs.isGoo() || player.torso.hips.legs.isNaga()) DisplayText("what passes for knees on your [legs]");
		else DisplayText("knees.");

		DisplayText("\n\nAs you splutter and choke, you hear footsteps approaching; finally managing to wipe your eyes clear, you look up to see that you are surrounded by an array of herms, a riotous orgy going on all around you.  You don't have the time to clearly recognize what they are, because your attention is immediately drawn to the myriad forms of cock, all pointing at you, all quivering with the urge to release the cum that the cleverly-teasing hands are coaxing forth...");

		DisplayText("\n\nAnd then you are blind again as cum sprays at you from all sides, a deluge of spooge that drenches your face, spurts onto your back, plasters your hair, gushes over your titsdescript, puddles on your ass.  You are being sprayed from all sides, laughs and triumphant cries and taunts ringing in your ears.  They don't let up until you are utterly plastered with cum; then and then alone does the torrent die down.  Coughing and hacking to get the salty fluid out of your mouth and nose, you slowly rise up, grab your [armor], and ");
		if (player.stats.cor < 50) DisplayText("run");
		else DisplayText("walk triumphantly");
		DisplayText(" from the racous orgy that is the Wet Bitch; truly an auspicious name.");

		//PC loses 1 hour, returns to TelâAdre, gains 15 lust, heat/rut unaffected//
		dynStats("lust+", 15 + player.stats.lib / 10);
		return { next: Scenes.camp.returnToCampUseOneHour };
	}


	//Sober Urta Variants 
	//Sober Urta has a 45% chance to end rut/heat, depending on which one she's sating, and a 5% chance to intensify it with no modifications to the PCs attributes.
	private soberUrtaSatingPCHeat() {
		//If she's Lover Urta, her vaginal capacity increases to cock area 66 (or at least it's what we planned).
		//Quote:[Sate Heat with Sober Urta]
		DisplayText().clear();
		urta.urtaSprite();

		DisplayText("As she presses your back against the wall, you spread your [legs] wide, allowing Urta easy access to your awaiting womanhood");
		//[If herm]:
		if (player.torso.cocks.count > 0) {
			DisplayText(" by shoving your " + Desc.Cock.describeMultiCockShort(player));
			if (player.torso.cocks.count > 0 && player.torso.balls.quantity > 0) DisplayText(" and [balls]");
			DisplayText(" out of the way");
		}
		else if (player.torso.balls.quantity > 0) DisplayText(" by shoving your [balls] out of the way");
		DisplayText(".  Slowly, you feel the wide flared head of her magnificent pillar of flesh press onto your opening, spreading your vaginal lips and making your [clit] harden in anticipation just as your [butt] shivers, awaiting the intrusion.  Slowly, Urta's giant member starts to enter you.");
		if (player.vaginalCapacity() >= 100) DisplayText("  Your hungry gash eagerly welcomes her, Urta easily sliding herself home.");
		else if (player.vaginalCapacity() > 60) DisplayText("  You feel it stretch you in the most pleasuring of ways, filling you with warm, throbbing flesh as she pushes it deeper and deeper.");
		else DisplayText("  You wince in pain at being stretched so much, but you grow wetter and wetter as Urta slowly pushes herself inside your depths, your [vagina] slowly getting wetter and warmer, accepting the intruder.  Pleasure starts to override pain and you let out a gasp.");
		Mod.Vagina.displayStretchVagina(player, 60, true, true, false);
		//virginity loss message, if appropriate//)

		DisplayText("\n\nYou moan in pleasure as Urta gets a foot or so of her erection inside you, and then keeps pushing.  Your insides, along with all their sensitive spots, are stimulated at once by the throbbing pillar of flesh that stretches you, and Urta finally has no more to give.  ");
		//[If Very Loose] 
		if (player.vaginalCapacity() >= 60) DisplayText("Urta's erection seems completely at home in your depths, completely embraced by the wet walls of your throbbing [vagina].");
		else DisplayText("You moan again, feeling Urta's member stretch, harden and throb, blood running through it.  You feel complete, and your heat is ignited further by the sensation of something so wonderful and big filling you.");

		DisplayText("\n\nUrta leans closer into your body, pressing her big breasts against your [fullChest] as she reaches down to stimulate your ");
		if (player.torso.cocks.count > 0) DisplayText("[cock biggest]");
		else {
			DisplayText("clitoris, ");
			if (player.torso.clit.length < 2.5) DisplayText("rubbing the hard, stimulated sensitive spot between her fingers");
			else DisplayText("running her fingers over your entire big clit before stroking it like she'd do with a cock");
		}
		DisplayText(", letting you have a few moments to get used to her mammoth member and accommodate it.");

		DisplayText("\n\n\"<i>Ready to get fucked, lover?</i>\"  She pushes your back against the wall before withdrawing her hips and her cock, and then pushes back in, making you yell from the stimulation.  She starts to pound you with long, deep strokes, her giant hermhood stretching you wide and making it hard to feel or think about anything else other than pleasure.  Urta licks your [nipples] as she continues to pound into you, and you feel a fast-approaching orgasm.  The sexy hermaphrodite vixen rams herself into you a few more times before you let yourself go and announce your ecstasy to the walls of the empty alley.");
		if (player.torso.cocks.count > 0) DisplayText(" Cum rushes out of [eachCock] and onto the soft fur of Urta's abdomen, then starts leaking out slowly in time with her thrusts.");
		DisplayText(" Your cunt clamps down tighter onto Urta as you orgasm,");
		if (player.torso.vaginas.get(0).wetness >= 4) DisplayText(" pussy juice shooting out around her member, coating Urta's fur and soaking her balls and the base of her cock.");
		else DisplayText(" love juices flowing liberally out of you, giving the skin of Urta's cock a visible shine and spreading onto her balls.");

		DisplayText("\n\nSqueezed by your hungry cunt, the fox hermaphrodite finds it impossible to retain control and grabs your [hips], lifting you and pressing you more firmly against the wall as she starts to pound the living heavens out of you, increasing the pace and ferocity of her thrusts.  Your [vagina] happily responds to the overstimulation by jumping onto the way to another orgasm, but Urta seems more visibly concerned with her own pleasure right now.");

		DisplayText("\n\nYou reach out to play with your [chest] and [nipples] while your other hand moves lower, starting to pleasure your ");
		if (player.torso.cocks.count > 0) DisplayText("[cock biggest]");
		else DisplayText("[clit]");
		DisplayText(".  Urta alternates between sensual moans and aggressive groans, her own thighs slightly soaked by her own secretions, but continues to pound you with her cock.  The two of you kiss passionately as she presses her breasts against your [chest], and you take the chance to move your hand and squeeze her own chest before moving an arm around her neck and pressing her stronger into the kiss.");

		if (!urtaLove()) DisplayText("\n\n\"<i>That feels so good!  Gonna cum!</i>\"");
		//[Lover Urta]
		else DisplayText("\n\n\"<i>Your pussy is absolutely the best, love!  I'm so close! I'll fill you up to the brim!</i>\"");

		DisplayText("\n\nYou moan loudly and beg Urta to blow her huge load inside you, sure that it will at least calm the heat down while setting off your own orgasm.  The two of you climax almost simultaneously, her huge member suddenly pumping a huge wave of fluid inside your [vagina] just as it starts to squeeze and clench, love juices ");
		if (player.torso.vaginas.get(0).wetness >= 4) DisplayText("shooting out all over the place");
		else DisplayText("running down her member and the crack of your [butt], coating the two of you in the proof of your passion");
		DisplayText(".");

		DisplayText("\n\nThe first two surges of Urta's seminal fluids stretch your insides with hot, sticky goo, your breeding state registering that it's getting what it needs and starting to work on squeezing out more.  The problem is, trying to get more out of Urta can be quite dangerous; wave after wave of semen flows out of her cock and into you, cum gushing out on the side of her cock as she thrusts, giving you a small paunch, then quite the belly as she continues to fill you up. The insemination triggers another orgasm in you, ");
		if (player.torso.cocks.count > 0) DisplayText("your own member responding alike to Urta's, shooting out semen, ");
		DisplayText("your [vagina] ");
		if (player.torso.vaginas.get(0).wetness >= 4) DisplayText("once again setting off to coat Urta in your juices.");
		else DisplayText("squeezing on her, trying to milk her of her seed.");

		DisplayText("\n\n\"<i>By Marae, [name]!  Fuck, you're squeezing me dry!</i>\"");

		DisplayText("\n\nAfter a while, her shots get smaller, starting to become similar to what a normal male would ejaculate with until, finally, she is only dribbling her seed out into you.  Urta sets your feet back onto the ground and starts to pull out.  You feel the skin at the base of her cock leave you, followed by her shaft, but your pussy suddenly clenches, apparently wanting to keep the intruder inside.");

		DisplayText("\n\n\"<i>What?  ");
		if (!urtaLove()) DisplayText("You're still not satisfied?</i>\"");
		else DisplayText("You want to keep going, darling?  I want to make you satisfied, so I'll spare all the time I can!</i>\"");

		DisplayText("\n\nYou slowly nod and express the desire to continue.  Urta pulls the rest of her member out of you with a loud squelch, her warm seed running down your [hips], your belly slightly receding.  She motions for you to turn away from her and you get the message, sticking your [butt] out.  The vixen grabs you by your [hips] and brings her semi-erect, but slowly hardening member back to the entrance of your hole.  With a thrust, her tip is once again inside your [vagina], and you push your hips back against her, devouring inch after inch of her member with your greedy breeding hole.");

		DisplayText("\n\nUrta groans as she rams the rest of her cock into you, filling you with her extraordinary, equine breeder once again.  Then, she begins to hump you from behind, smacking her groin against your [butt] as her member stretches you.");

		DisplayText("\n\nYou reach down to play with yourself, your [clit] ");
		if (player.torso.cocks.count > 0) DisplayText("and " + Desc.Cock.describeMultiCockShort(player) + " ");
		DisplayText("hardening again in response to the act.  Urta continues to slam into your backside, delivering a small smack to your [butt].");

		//Regular Urta]
		if (!urtaLove()) DisplayText("\n\n\"<i>Such a greedy slut!</i>\"");
		//[Lover Urta] 
		else DisplayText("\n\n\"<i>You want your sexy vixen to breed you that much?  You can't think about anything else but my cock plastering your ravenous cunt with my fun juice?  You'll get it, baby, rest assured!</i>\"");

		DisplayText("\n\nYou moan in ecstasy and anticipation as she picks up the pace, pumping in and out of your pussy.  You're pretty sure you've had another orgasm somewhere along the way, but your mind is absolutely focused on the crowning moment of the act.  It rapidly approaches.  Urta empties her balls into you, stretching you wide with hot, sticky white liquid.");

		DisplayText("\n\nThe vixen squeezes your [butt] as she drives herself fully home, and you feel her member paint the deepest of your insides with her precious seed as it pulses and twitches inside you, stretching you unimaginably wide and pleasuring the entirety of your womanhood at once while delivering its seed straight into your womb.  You yell in complete, all-encompassing rapture as ");
		//[Hermaphrodite]
		if (player.torso.cocks.count > 0) DisplayText("[eachCock] shoots its seed onto the floor of the alley, helplessly");
		else DisplayText("your [vagina] squeezes and tugs on her shooting member, leaking its own juices all over her member, the intensity of the orgasm shaking you right into your core");
		DisplayText(".");

		DisplayText("\n\nUrta lumps onto your back, completely spent, her member slowly softening as she pants against your neck. You never felt so full in your entire life, much of her previous load still trapped inside you, now in addition to her twenty inch member and another big delivery of warm herm-cum.  Slowly, she pulls out, and you feel the impossibly long way her semi-erect member has to undertake in order to leave your cum-coaxing channel.");

		DisplayText("\n\n\"<i>That felt amazing!  ");
		if (!urtaLove()) DisplayText("If only I had you by hand every time I need to blow a load.");
		else DisplayText("Your pussy is absolutely amazing, sweetheart: I hope I've helped you settle down?  Is your heat sated for the moment?");
		DisplayText("</i>\"");

		DisplayText("\n\nYou turn to Urta again as you slump against the wall, resting your [butt] on the floor.  You sigh contentedly and thank her for her help with your heat, as her cum flows copiously out of you.");

		DisplayText("\n\n\"<i>");
		//([Regular Urta]
		if (!urtaLove()) DisplayText("Sure thing, I'm here to help,</i>\" she responds with a wink.");
		else DisplayText("I'm here if you need me, love.  Whatever makes you happy.  You've helped me with my own problems so much already, so I owe you at least one.  Not to mention, making love to you feels absolutely amazing!</i>\"");

		//[If Urta is infertile]
		if (!urtaQuestDone()) {
			if (!urtaLove()) DisplayText("\n\n\"<i>We are safe.  No matter how much sticky goo I pump into you, you shouldn't get pregnant.</i>\"");
			else DisplayText("\n\n\She seems slightly sad, or at least not very pleased with herself as she explains her effective infertility once again.");
			DisplayText("  She grabs your hand and helps you stand up.");
		}
		//[If Urta's fertility quest is done]
		else {
			DisplayText("\n\n\"<i>Ahhh, [name], you might get pregnant!</i>\"  She kneels in front of you, kissing you on the forehead. \"<i>I don't think all the contraceptives in the world could stop that...</i>\"");
			if (Flags.list[FlagEnum.URTA_FERTILE] === 1) {
				player.knockUp(PregnancyType.URTA, PregnancyType.INCUBATION_URTA, 25);
				player.knockUp(PregnancyType.URTA, PregnancyType.INCUBATION_URTA, 25);
				player.knockUp(PregnancyType.URTA, PregnancyType.INCUBATION_URTA, 25);
			}
		}

		//([Regular Urta]"You probably should learn to control yourself well enough so that next time, we can get clean at my home, not to mention fucking in the middle of the street is just:"/[Lover Urta]â Baby, next time, at least wait until we get back home, okay? Not to mention, when you provoke me, you're completely irresistible, so try to be considerate: It was amazing, though. I love you.â She says, as she kisses you gently on the lips.)
		Flags.list[FlagEnum.URTA_COMFORTABLE_WITH_OWN_BODY]++
		urtaLove(1);
		DisplayText("\n\nSatisfied, the two of you part ways here, Urta apparently searching for something after waving at you when you leave. Your heat somewhat calmer now, you find yourself on your way back to camp, sticky jism running in a thin trail down your [legs] while your [vagina] desperately clenches to hold it all in.");
		//Usual one hour passes//
		player.orgasm();
		dynStats("lib", 1, "sen-", 2);
		dynStats("lust=", 0);
		dynStats("lust=", 0);
		dynStats("lust=", 0);
		Flags.list[FlagEnum.URTA_TIME_SINCE_LAST_CAME] += 6;

		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//Quote:[=Sate Rut with Sober Urta: Cock Too Big=]
	private sateRutWithSoberUrtaButHuegDicked() {
		DisplayText().clear();
		urta.urtaSprite();
		let x: number = player.torso.cocks.sort(Cock.LargestCockArea)[0];
		DisplayText("Urta observes your approaching " + Desc.Cock.describeCock(player, x) + " with a hungry, eager expression. Without taking her eyes off of it, she flips up her ");
		if (!urtaLove()) DisplayText("skirt");
		else DisplayText("dress");
		DisplayText(", her huge horse-cock whipping up to slap between her breasts, pre already dribbling down the tip.  However, as you get closer, her expression suddenly falls and her cock begins to sink.  \"<i>I'm sorry, but... that's just too big!</i>\" she protests.  \"<i>You smell absolutely gorgeous, and I'm willing to try with something a little bigger than usual, but that's... that's just frigging huge - there's no way I could fit that monster!</i>\" she declares. \"<i>Just because I have a stallion cock doesn't mean I have a mare's cunt!</i>\"");

		DisplayText("\n\nYou stare at your " + Desc.Cock.describeCock(player, x) + " in an uncomprehending fashion.  How are you going to find relief now?  You look up as Urta saunters over towards you in a seductive manner, erect cock jutting before her and a mischievous grin on her face.  \"<i>While I'll have to go and attend to this myself later, I can still give you a hand...</i>\" she purrs throatily.  She kneels before you, and you have to watch yourself to avoid having her twenty inches of cock slap your [leg].  Confidently, she reaches out to take hold of your " + Desc.Cock.describeCock(player, x) + ", first with one hand, and then the other.");

		DisplayText("\n\nHer touch is incredible; she applies just the right amount of pressure, her fingers moving to touch all of the spots that respond best to being touched as she moves her hands up and down.  She caresses and she tickles, she fondles and she strokes, all with an expertise that you can hardly believe.  Your breath catches in your throat and your heart hammers wildly in response to the intense pleasure she's bringing you.");

		DisplayText("\n\n\"<i>One advantage of having a chick with a dick of her own for a lover,</i>\" she comments, trying to sound nonchalant, but wearing the biggest, smuggest smirk you have ever seen on her face.  \"<i>She knows exactly what makes a handjob feel good...</i>\"");

		//Regular Urta path
		if (!urtaLove()) {
			DisplayText("\n\nUrta isn't idly boasting; you can't remember the last time a handjob felt so good, even when you were the one doing it.  It's not very long before you find yourself cumming explosively, ");
			if (player.cumQ() <= 50) DisplayText("spattering spooge onto Urta's face");
			else if (player.cumQ() <= 250) DisplayText("splashing her face and tits with your cum");
			else DisplayText("soaking the shocked fox-morph in your jism");
			DisplayText("; though you still feel the urge to breed fertile females, your lust is momentarily sated.  Urta wipes ");
			if (player.cumQ() >= 500) DisplayText("halfheartedly ");
			DisplayText("at the cum on her faces and gives you a friendly smile.  \"<i<There, that should feel better; I know what it's like to be all pent up with no release.</i>\"  She rises to her feet, still holding your cock, and gives it a squeeze.  \"<i>In the meantime, if you want to really cut loose, I suggest you go and find something to shrink this down.</i>\"");
			DisplayText("\n\nWith surprisingly vulpine shake of her body and a soft sigh, she turns and heads home at a swift pace, her erection bobbing up and down before her; evidently, she's intending to use some of her toys to find some release of her own. You re-dress and head back yourself, trying to make sense of your inhuman breeding rut.");
		}
		//Lover Urta Path/
		else {
			DisplayText("\n\n\"<i>Of course,</i>\" she adds. \"<i>There are far nicer things to play with than mere hands,</i>\" she teases, then she bows her head closer, jaws opening and long, drooling tongue descending to gently lick the head.  She carefully licks and suckles, getting the head nice and lubed, then bravely begins swallowing it, gulping it in as far as she can.  You can soon feel it jabbing against the back of her throat, and though she tries to go beyond, she can't; her gag reflex is too strong, making her choke and cough, drooling heavily down your shaft.");

			DisplayText("\n\nShe pulls her head free and gasps for breath, looking at you in admiration. \"<i>By Marae... how do you manage to do this for me, lover?</i>\" she asks, stunned.  But then, gamely, she returns her attention to your " + Desc.Cock.describeCock(player, x) + ", licking, suckling and mouthing at the head.  As she does this, she continues her restless assault with her hands upon the rest of your lengthy shaft with her skilled hands.  She shuffles closer, allowing you to rest yourself between her DD-cups.  \"<i>Can you feel how fast my heart is beating through your cock?  You turn me on so very much,</i>\" she purrs.");

			DisplayText("\n\nIt's no surprise that eventually you can't hold back anymore and release yourself into Urta's ready mouth.  ");
			if (player.cumQ() <= 50) DisplayText("She swallows it all without complaint, licking her lips clean of any stray droplets once you remove it from her mouth.");
			else if (player.cumQ() <= 250) DisplayText("Her cheeks bulge at the amount you pump into her, but she's able to swallow with an admirable amount of control, gasping for breath.");
			else DisplayText("Rivulets of cum burst from between her lips, but she stubbornly sucks and swallows as much as she can, her stomach starting to bulge from the sudden influx of spooge.  When you stop, she is drooling cum and gasping for breath, but she meets your eyes with pride, even as she gives a wet belch.");

			DisplayText("\n\n\"<i>Mmm... you taste nice, lover.  Still, I'd much rather feed this into the hole where it belongs, so why don't you try and shrink this monster down, huh?</i>\" she suggests.  Rising to her feet, with a surprisingly vulpine shake of her body and a soft sigh, she turns and heads home, her erection bobbing up and down before her; evidently, she's intending to use some of her toys to find some release of her own. You re-dress and head back yourself, trying to make sense of your inhuman breeding rut.");
		}
		dynStats("lib+", 1, "sen-", 2, "lust=", 0);
		Flags.list[FlagEnum.URTA_TIME_SINCE_LAST_CAME] += 1;
		return { next: Scenes.camp.returnToCampUseOneHour };
		///Player returns to Tel'Adre Menu, usual one hor passes//
	}

	//Quote:[=Sate Rut with Sober Urta=]
	private sateRutWithSoberUrta() {
		let x: number = player.torso.cocks.sort(Cock.LargestCockArea)[0];
		DisplayText().clear();
		urta.urtaSprite();
		DisplayText("Urta observes your approaching package with a hungry, eager expression. Without taking her eyes off of it, she flips up her skirt, her huge horse-cock whipping up to slap between her breasts, pre already dribbling down the tip.");

		DisplayText("\n\nThe sight makes you halt your advance.  Not out of disgust with Urta's body - how could you be, when you've had sex to her before now?  No, the problem is that you can't figure out how to approach her - those apple-sized balls of hers are in the way.");

		DisplayText("\n\nUrta looks at you, and then starts to push herself up off of the wall, obviously intending to turn herself around and present her rear to you for ease of access.  As the realization comes in, you suddenly move, pinning her back against the boards.  She looks at you, askance, and opens her mouth to speak, when you interrupt her by kissing her.  As your tongues tangle inside her mouth, you reach down and grab her balls.  They are too big to be palmed in one hand, and you jiggle them accidentally.  Urta moans and whimpers at the stimulation and for several long moments you stroke and caress her cum-swollen testicles, pre starting to pour from her flared cock-tip, smearing her beautiful big DD-cup breasts and your own [chest] alike.  You can feel her nipples rubbing against yours, sparks of electricity surging through you both at the contact.  Finally, though, you manage to awkwardly hoist up her balls, allowing your " + Desc.Cock.describeCock(player, x) + " access to her drooling black netherlips.");

		//(Regular: 
		if (!urtaLove()) DisplayText("\n\n\"<i>Yes - give it to me!</i>\"");
		else DisplayText("\n\n\"<i>Oh, yes!  It feels good when you're the one desperately wanting to stick it inside me, for a change.  I love to feel desired by you, you know.  Now give it to me!</i>\"");
		DisplayText(" she mumbles around your tongue, so caught in lust she doesn't care where you are.  Indeed, it seems your little fox-herm has something of an exhibitionist streak...");

		DisplayText("\n\nWell, you don't intend to keep the lady waiting any longer then you have to, and you slide it home, allowing her testicles to drop once you are safely inside.  The globular organs bounce atop your " + Desc.Cock.describeCock(player, x) + " and rock back and forth against your belly, jiggling with every movement the two of you make, Urta's cock sandwiched firmly between your bodies and held between her breasts.");

		DisplayText("\n\nUrta finally breaks the kiss and leers at you.  \"<i>Kinky " + Desc.Gender.mf(player, "boy", "girl") + "...</i>\" she teases you, \"<i>but I like that.</i>\"  She promptly starts to rock back and forth, seeking to simultaneously impale herself repeatedly upon your shaft and to grind her own huge cock between your bodies.");
		if (urtaLove()) DisplayText("  \"<i>You're the only one who has ever accepted every part of me,</i>\" she tells you, one hand brushing affectionately against your cheek.");

		DisplayText("\n\nYou simply moan back, your lust-addled mind only able to concentrate on the fact you are surrounded by her womanhood. You thrust back and forth, your " + Desc.Cock.describeCock(player, x) + " surging deep inside her and then wetly pulling out, only to slide back home.  You nip and kiss her prominent nipples, making the vixen churr in delight, and she kisses you back.  Her front is plastered with pre now, her cockhead bubbling fluids like a fountain, and you can't resist bending down and playing with her cockhead.  She yips and growls with pleasure as you molest her hermhood, your tongue playing around the tip, lapping the sweet pre as it flows forth.  She surprises you by craning down her neck and starting to lap at it herself, her long, broad tongue curling expertly around its wide-flared tip.  The two of you make a game out of it, seeing who can better lick and lap, occasionally running your tongues over each other's whilst doing so.");

		DisplayText("\n\nAll the while, Urta's happy cunt milks and squeezes you rhythmatically, even as you thrust yourself eagerly into her depths.");

		DisplayText("\n\nIt's no surprise that, of the two of you, it's Urta who loses control first.  Throwing her head back in a vulpine howl, she cums - her cunt grips you like a vice, even as her feminine juices spurt forth to splatter against your crotch.  Pressed against her like you are, her balls bouncing on your " + Desc.Cock.describeCock(player, x) + " and her cock sandwiched between your bodies, you can feel every inch as her swollen balls finally begin to contract, thick wads of herm-cream surging up her long, broad mare-prick, the bulges rippling past your bellies before, finally, they reach the tip and spray forth into the air.  The hot, salty spooge rains down in thick, gooey blobs all over both your faces.  Caught up in the moment, you lift your head back and try to catch some of it in your mouth, an action that Urta unthinkingly copies.");

		DisplayText("\n\nFinally, your own " + Desc.Cock.describeCock(player, x) + " reaches all it can take and explodes inside of Urta");
		if (player.torso.vaginas.count > 0) DisplayText(", trigging a mutual explosion from your [vagina]");
		DisplayText(".  The two of you gasp for breath, both obviously drained... but your hormones are boiling, and your " + Desc.Cock.describeCock(player, x) + " fails to soften fully inside her.  Within moments, you are hard again; as soon as you catch your breath, you are at it again.  You lose count of how many times you do it - maybe three or four? - but finally you are so spent that even your rut is sated that you've bred Urta well and good, for now, at least.");

		DisplayText("\n\nWhen at last you are finished, you and Urta are both a sight, drenched in sticky, slimy spunk.  Your clothes are okay, thankfully, but Urta's are a mess.  Neither one of you care, and you hold onto each other for a while still.  Finally, you pull yourself free of Urta's pussy with a wet slurping noise, allowing her now-flaccid cock to flop heavily through the air as it peels away from your bodies.  Urta looks you over and shakes her head in amused disbelief.");

		DisplayText("\n\n\"<i>What a mess... but, honestly, it was worth it.  Feeling better now?</i>\" she asks you.  When you nod your head slowly, she smiles and then starts to strip herself out of her cum-splattered clothes until she is casually naked before you.  She ");
		if (urtaLove()) DisplayText("blows you a kiss with a flirty wink of her eye and then ");
		DisplayText("scrubs off the worst of the cum plastered in her fur with the dry parts of her clothes.  She saunters playfully over to a garbage bin, throwing them inside.");
		if (urtaLove()) DisplayText("  Her hips deliberately sway in a mesmerizing fashion, tail flicking from side to side to give you a tantalizing grip of her still-dripping snatch and the now-flaccid prick underneath.");
		DisplayText("  You watch as she pries at a loose stone with her claws, removing it to reveal a small cubby, from which she withdraws a spare set of clothing.");

		//If fertility quest done:
		if (urtaQuestDone()) {
			DisplayText("\n\nYou ask Urta what she's going to do; you didn't have the chance to use a condom.");
			if (Flags.list[FlagEnum.URTA_FERTILE] === 1) DisplayText("\n\n\"<i>We'll just have to hope then, won't we, [name]?</i>\"");
			else DisplayText("\n\n\"<i>I'm not likely to get pregnant with all the birth control I'm on right now, even with all that cum in me.</i>\"\n\nFeeling relieved, you turn and head out into the streets of the city.");
			urta.knockUpUrtaChance();
			urta.knockUpUrtaChance();
			urta.knockUpUrtaChance();
		}
		else {
			DisplayText("\n\nShe saunters over you and waves a finger under your nose in playful mockery.  ");
			if (!urtaLove()) DisplayText("\"<i>And you had better learn to control yourself, " + Desc.Gender.mf(player, "mister", "missy") + ".");
			else DisplayText("\"<i>But you should learn to control yourself lover-" + Desc.Gender.mf(player, "boy", "girl") + ".");
			DisplayText("  I'd rather do something like this in the privacy of my home than in the middle of the street.</i>\"");
			DisplayText("\n\nYou smirk and tell her you'll make no promises.  She gives your [butt] a smack that echoes off of the walls, then saunters away.  Feeling relieved, you turn and head out into the streets of the city.");
		}
		Flags.list[FlagEnum.URTA_COMFORTABLE_WITH_OWN_BODY]++;
		urtaLove(1);
		//usual one hour passess, player is back in TelâAdre//
		//Knock up urta if appropriate.
		Flags.list[FlagEnum.TIMES_RUT_FUCKED_URTAS_CUNT]++;
		dynStats("lib+", 1, "sen-", 2, "lust=", 0);
		Flags.list[FlagEnum.URTA_TIME_SINCE_LAST_CAME] += 6;
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//Drunken Urta Variants 
	//Quote:Drunken Urta always affects heat/rut when penetration is involved (meaning she doesn't in her frottage scene and watch-her-masturbate scene), and has a 50% chance to either extinguish it or intensify it.
	//When penetration is involved, sex with Drunken Urta while in Heat/Rut increases both Toughness and Libido by 2 points and lowers Sensitivity by 4 points. Player often loses more than 1 hour and has to return to camp, rather than stay in TelâAdre. When getting penetrated, Urta's vaginal capacity is bumped up to 72.

	//Quote:[Drunken Urta Fucks Vagina]
	//This scene only plays if the character is in heat, or is in both heat and rut and chose "Pussy"
	private drunkenUrtaFucksPCInHeat() {
		DisplayText().clear();
		urta.urtaSprite();
		DisplayText("You simply smile at her, inhaling deeply through your nose; you can swear you can smell her herm-musk, wafting off of her as strongly as your own pheromones must be wafting off of you.  That wonderful, earthy, primordial scent, the odor of a healthy breeder ready and willing to mate... there's nothing like it.");
		//(Fertility Quest not done:
		if (!urtaQuestDone()) DisplayText("  You know that she can't give you babies... but, honestly, at this moment, you couldn't care less. Her wonderful stallion cock is there and ready and it's all for you.");
		else DisplayText("  You dimly recall that Urta could be virile, but she's right there, her huge mare-cock just dripping to plunge into your ripe [vagina] and knock you up.  You don't care anymore; you want her babies!");

		DisplayText("\n\nUrta's eyes glitter with emotion and she bends down to give you another kiss before roughly grabbing her ");
		if (!urtaLove()) DisplayText("skirt");
		else DisplayText("dress");
		DisplayText(" and hiking it up to expose her pre-spewing cock.  A steady trickle of feminine lubricant dribbles out of her gash, oozing over her apple-sized balls and dripping noisily onto the floor, but Urta couldn't care less; she's too fixated on plunging her maleness into your ready pussy to notice her feminine urges.");

		DisplayText("\n\nAwkwardly, reluctantly, the fox-morph backs away, her soft fingers with their claw-like nails trailing erotically down your body, playing with your [nipples] in a way that sends sparks of pleasure surging through your brain, until finally she has reached your crotch.  Sparing you a soft smirk, she bends her head down until her face is hovering right about your [vagina], dramatically sniffing the scent rising from your fertile breeding-hole before she sticks her muzzle into it");
		if (player.torso.cocks.count > 0) {
			DisplayText(", impatiently nudging aside your " + Desc.Cock.describeMultiCockShort(player));
			if (player.torso.balls.quantity > 0) DisplayText(" and your [balls]");
			DisplayText(" to get to the feminine orifice below");
		}
		DisplayText(". You cry out in joy as your [vagina] is filled, her soft fur brushing against your inner walls before she opens her mouth as wide as she can and sticks out her tongue. The long, broad, vulpine appendage slides out and up your depths, caressing the walls, lapping up your juices, ");
		if (player.torso.clit.length < 2.5) DisplayText("playing with your [clit]");
		else DisplayText("lapping around your huge pleasure-button, slurping it into her mouth where she suckles from it");
		DisplayText(", and making you thrash and scream until you think you're going to cum from the pussy-eating alone.  ");
		if (player.torso.vaginas.get(0).wetness >= 4) DisplayText("As if to emphasize this, your squelching, slurping pussy suddenly sprays fem-cum all over Urta's face, making her pull herself free with a shocked shake of her head.");
		else DisplayText("As if sensing your impending orgasm, Urta removes her head from your [vagina], giving you a cocky grin and shaking her head.");

		DisplayText("\n\nNow that you've been properly lubed up, Urta suddenly springs at you, literally vaulting atop you whilst at the same time thrusting her huge prick into your [vagina].");
		if (player.vaginalCapacity() < 60) DisplayText("  Urta's cock is long and thick enough to be something a stallion would be proud of, and far larger than should be comfortable. Its sheer girth and flared head snag against your opening, before the lust-crazed herm vixen roughly forces it through, impatiently feeding inch after inch of girthy herm-hood into your lower lips.  The sudden intrusion of something so long and broad stretches your poor pussy wide, but the shock and the pain merely turn into pleasure in your lust-enthralled mind.");
		else DisplayText("  Urta's mammoth cock fits you like a hand fits into a comfortable glove, and you howl in joy as it slides home, stretching you in all the right places, able to feel every bump and vein on its surface, the flared tip thrusting into the deepest part of you.");
		Mod.Vagina.displayStretchVagina(player, 60, true, true, false);

		DisplayText("\n\nLike an animal, Urta begins to rock back and forth, thrusting her cock wildly into you with brutal eagerness, slamming you with such force that the table creaks and groans in a manner that would be most alarming if you weren't too caught up in your own pleasure to care.  You throw your head back in ecstasy, getting brief glimpses of the situation in the bar around you.  It looks like the others are enjoying the show quite a lot in their own right - you see more than a few couples or threesomes starting to kiss, fondle each other, even beginning to have sex on their own.");

		DisplayText("\n\nUrta's usual shyness seems forgotten - as do her usual manners, for she pays no attention to your [clit] ");
		if (player.torso.cocks.count > 0) DisplayText("nor even your " + Desc.Cock.describeMultiCockShort(player));
		DisplayText(", despite usually trying to make it just as good for you.  She begins to thrust into you with even greater force than before.  You groan and whimper under her; partly from the pleasures of being taken so roughly, so triumphantly, and partly to goad her on, to make her feel even more aroused and alpha-male-like.");


		DisplayText("\n\nIt works.  Urta howls in triumph as her cock finally explodes insides you, flooding your interior with her hot, salty cum.  Your belly gurgles and bulges as she shoots spurt after spurt of spooge inside you, flooding your womb with her herm seed.  You cry out in ecastasy as your own juices pour forth, your [vagina] doing its best to milk as much cum from your vulpine lover as possible.  As your belly swells out into a small paunch, the last few jets of cum splashing into your womb, you wait for the exhausted Urta to pull out... and then you realize that Urta's cock isn't going soft.  You can feel it start to slacken, but it remains fundamentally erect, and after a few deep breathes, Urta begins to thrust into you once again, her erection rapidly stiffening and hardening within you until she is pounding at you again, just as fiercely before.  Again she spews her seed within you, but once more her erection fails to soften; though much of her cum is pinned up inside you by the sheer thickness of her cock and the widely flared head buried inside you, a copious amount still manages to leak and dribble out of you, dripping down between your [butt] and puddling onto the table.");

		DisplayText("\n\nAs you lay there on the table, bucking and thrashing with ecstasy as your lover fills you in the way only she can, the other bar-goers of the Wet Bitch breaking down into a chaotic orgy around you, all you can think of is to ask Urta for more.  And more is what she gives you; as you finally black out, your last sight is of your stomach, huge and swollen with Urta's cum, jiggling and sloshing above you.");

		Mod.Vagina.displayStretchVagina(player, 60, true, true, false);

		DisplayText("\n\n<b><u>A bit later...</u></b>");
		DisplayText("\nWhen you wake, you find yourself in unfamiliar surroundings - you're in a bed, you realize. That it's Urta's bed quickly becomes apparent when you see the fox-herm in question sitting on a cushioned seat beside you, holding a wet towel gingerly over her crotch.  \"<i>Um... hi,</i>\" she says, shyly.  \"<i>That was... well, I won't say I didn't enjoy it, but I don't think I'm going to be able to get it up for a week,</i>\" she tells you.  \"<i>Also, can we try and keep that kind of thing in private, in the future?  It looks bad when the Captain of the Guard not only starts a public orgy, but needs to get hosed down for several minutes to make her stop fucking somebody.</i>\"");

		DisplayText("\n\nMoving gingerly, wincing at your own tenderness, you tell her you'll try and do that in the future.");

		//If fertility quest is done: 
		if (urtaQuestDone()) {
			DisplayText("\n\nYou hesitantly ask her what the two of you are going to do now; you were in heat, and you know for a fact she didn't have a condom on.");
			if (Flags.list[FlagEnum.URTA_FERTILE] != 1) DisplayText("\n\nUrta smiles and informs you that she was taking things to prevent that, luckily.");
			else DisplayText("\n\nUrta smiles beatifically, \"<i>I know, isn't it wonderful?</i>\"");
		}

		DisplayText("\n\nUrta hands you your clothes and gives you a hand to dress yourself; there isn't anything erotic about it, as both of you are still too worn out to make sex feasible again just yet.  Once you are dressed, you start to show yourself out... before Urta suddenly grabs your shoulder and then kisses you.  \"<i>I never said I didn't like it,</i>\" she suddenly declares, to your bemusement, before gently pushing you out the door.");

		DisplayText("\n\nThe walk back to camp is quite painful, but you'll live.  That which doesn't kill you makes you stronger, and all that...");

		if (Flags.list[FlagEnum.URTA_FERTILE] === 1) {
			player.knockUp(PregnancyType.URTA, PregnancyType.INCUBATION_URTA, 25);
			player.knockUp(PregnancyType.URTA, PregnancyType.INCUBATION_URTA, 25);
			player.knockUp(PregnancyType.URTA, PregnancyType.INCUBATION_URTA, 25);
		}
		//player returns to camp and loses 4 hours//
		dynStats("lib", 2, "sen", -4, "lust=", 0);
		dynStats("lust=", 0);
		dynStats("lust=", 0);
		dynStats("lust=", 0);
		Flags.list[FlagEnum.URTA_TIME_SINCE_LAST_CAME] += 24;
		Flags.list[FlagEnum.URTA_COMFORTABLE_WITH_OWN_BODY]++
		urtaLove(1);
		return { next: Scenes.camp.returnToCampUseFourHours };
	}

	//[Sate Rut with Drunken Urta â Cock too big]
	private sateRutWithDrunkUrtaWithHugeDick() {
		DisplayText().clear();
		urta.urtaSprite();
		DisplayText("Urta climbs on top of you, pressing her wet slit against the head of your cock.  She does attempt to get it inside, but the pain of being stretched quickly makes her realize that even if she managed to, the fuck would be less than enjoyable and more than a little painful.  She groans and growls in frustration, pulling herself off you and pressing her apple-sized balls ");
		if (player.torso.balls.quantity > 0) DisplayText("against your own [balls]");
		else if (player.torso.vaginas.count > 0) DisplayText("against your [clit]");
		DisplayText("between your [hips]");
		DisplayText(".");

		DisplayText("\n\nSometimes, this thing can get so big it's essentially useless, you dumbass.  Hell, I'd know that, and I'm smaller than you are!");

		DisplayText("\n\nShe presses her still impressive hermhood against your own [cock biggest], using both of her hands to encircle your joined shafts and start jerking them off.");

		DisplayText("\n\n\"<i>I got all hot and bothered, too!  I was so ready to give you a good, long, awesome fuck, but you had to go and grow yourself a fucking monster!</i>\"");

		DisplayText("\n\nThe warmth of her cock and balls pressed against your own [cock biggest] as well as her skillful, if somewhat brutal handling of your members, pressed together, does give you quite the pleasure, but you realize it'd be infinitely better if Urta indeed put your throbbing penis in her wet, tightly squeezing pussy.");

		DisplayText("\n\n\"<i>Why the hell do you need such a big dick anyway?  Freakin' monsters need less than that to be satisfied!  You trying to ");
		if (player.torso.cocks.sort(Cock.LargestCockArea)[0].area < 150) DisplayText("compete with minotaurs or something?");
		else DisplayText("set a world record or something?");
		DisplayText("</i>\"\n\n");
		DisplayText("\n\nHer treatment of your [cock biggest], pressed against her own shaft, gets more rough, brutal and frantic, but you realize you're both on the edge of an orgasm and she's just trying to be done with it and blow off her own steam.  Your [cock biggest] starts leaking precum copiously as your shaft is covered in Urta's own secretions, and with a blush, you realize her wet pussy is leaking her juices over her balls and your body all the way down to your [asshole].");

		DisplayText("\n\nUrta starts whimpering and moaning softly as her shaft twitches with more and more intensity against your own, Urta's jerking hands moving faster and faster.  Unable to control yourself, you also grab your conjoined cocks, four hands now working on Urta's equine erection as well as your [cock biggest].");

		DisplayText("\n\n\"<i>F-fuck!  Gonna cum!</i>\"");

		DisplayText("\n\nYour orgasms are almost synchronized, the feeling of Urta's penis rapidly pulsing as it coats the tip of your own [cock biggest] with her semen enough to set off your own orgasm.  ");
		if (player.cumQ() <= 50) DisplayText("You cum all over your [chest] as Urta blows thick ropes of vixen-spunk all over your cock and upper body, a single shot landing on your lips.");
		else if (player.cumQ() <= 500) DisplayText("As Urta's shaft spasms and starts covering your [cock biggest] and [chest] in warm herm-jizz, you feel a surge of cum run through your cock, blowing strongly underneath Urta's aroused, warm body, with enough force to go up to your neck and even coat her large breasts in a few droplets of your semen.  Urta instinctively licks some of your spooge, but there's a lot of it and you feel yourself coated in your own cum as well as hers.");
		else DisplayText("The dam inside your [cock biggest] lets loose, shooting off spunk everywhere, even putting Urta's own impressive orgasm to shame.  You cum so much the fur of her lower body is covered with it, thick ropes of semen cover her breasts, your [chest] is practically drowned in thick white goo, and you give yourself quite the facial or two under her cock-milking hands.");

		DisplayText("\n\nUrta milks the last few drops from both of your cocks, looking half-satisfied, half-irritated on your cum-covered body.  She gets off you and you notice you attracted quite the audience.  Urta's hands reaches down to her dripping wet vagina, spreading it and pushing a finger inside.  You realize this must be the reason for her frustration; although she blew a load, this single time it was her female parts that were more turned on.");

		DisplayText("\n\n\"<i>Go and clean yourself.  And if you're gonna run around the place, smelling like you're so eager and ready to knock people up, at least make it so your stupid monster of a dick can fit inside someone!</i>\"");

		DisplayText("\n\nShe hops off the table with unusual grace and agility for someone after a few drinks and covered in cum, and walks to the table to pay her bill.  Contrary to her words, she appears to look somewhat sad and disappointed, both in you and herself.");

		DisplayText("\n\nRealizing there's no point in talking to her and just somewhat sated, you return to your camp.");
		//[+1 Libido, -1 Sensitivity; No effect on your rut]
		dynStats("lib", 1, "sen", -1, "lust=", 0);
		//player returns to TelâAdre and loses 1 hour
		Flags.list[FlagEnum.URTA_TIME_SINCE_LAST_CAME] += 1;
		Flags.list[FlagEnum.URTA_COMFORTABLE_WITH_OWN_BODY]++
		urtaLove(1);
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//Quote:[Drunken Urta Fucks Cock]
	private drunkUrtaRidesARutPCsCock() {
		DisplayText().clear();
		let x: number = player.torso.cocks.sort(Cock.LargestCockArea)[0];
		urta.urtaSprite();
		DisplayText("You decide not to fight the situation; truthfully, the promises given by the sight of the hot hermaphrodite vixen climbing on top of you ignite your lusts and sing to your rut in ways you don't think you'd be able to safely ignore.");

		DisplayText("\n\nUrta lifts her balls and presses your already hard cock against her black pussy lips, justifying your decision.  Slowly, you feel your tip sink into her, then the rest of your member, as she releases a soft moan.  She keeps pressing down, forcing your " + Desc.Cock.describeCock(player, x) + " inside her wet gash until you feel her butt pressed against your ");
		if (player.torso.balls.quantity > 0) DisplayText("[balls]");
		else DisplayText("[hips]");
		DisplayText(", and her own balls resting comfortably on your abdomen.  She grits her teeth as you feel her pussy slowly tighten around and massage your " + Desc.Cock.describeCock(player, x) + ", and you groan in response.  Urta starts to bounce up and down on your member, smacking her thighs and ass into your body, not minding her own giant equine member flopping around and occasionally smacking you over your chest.  She lets her tongue flick out into the air for a moment and moans in delight, before picking up the pace and starting to pump your cock in and out of her hungry passage furiously.");

		DisplayText("\n\nIn your crazy breeding state, you're not able to contain yourself for long against the vixen's passionate lovemaking, and you ");
		if (player.torso.balls.quantity > 0) DisplayText("feel your balls churning");
		else DisplayText("recognize the tingling sensation from your " + Desc.Cock.describeCock(player, x) + " to your spine");
		DisplayText(", a telltale sign that your penis is ready to unload the potent spunk inside the herm-nympho bouncing on top of you.  You try to announce this, but she doesn't slow down.  Moments later, ");
		//[Normal cum production]
		if (player.cumQ() <= 50) DisplayText("you unload your thick spunk into her pussy");
		else if (player.cumQ() <= 250) DisplayText("you erupt inside her, filling her with wave after wave of warm, thick semen");
		else DisplayText("you blow massive surges of spunk inside her continuously.  The fox's stomach expands, rivulets of semen running down onto the table as she continues her ride on top of you");
		DisplayText(".  As you discharge, the fox's pussy starts squeezing and contracting, and you recognize the hermaphrodite's own orgasm.  Thicker white liquid suddenly drips from the tip of her cock quite copiously and occasionally shoots out into the air.");

		DisplayText("\n\n\"<i>Ahhhh, that was a good warmup.  Now, we just need to keep squeezing it out of you until you feel fine.  Maybe after that, I'll feel sated myself, for once...</i>\"");

		DisplayText("\n\nYour " + Desc.Cock.describeCock(player, x) + " attempts to go soft inside of Urta, but the fox-woman's powerful inner muscles suddenly start rippling inside her, massaging your penis and forcing the rest of semen out of your urethra as she grinds her female parts against you.  Moments later, you're again fully erect, and Urta shakes her hips more and more energetically on top of you.  This time, she takes her own member in her hand and starts to rub it along the middle of its length, masturbating the male side of her hermhood while you're feeding yourself to her female parts.");

		DisplayText("\n\nUrta starts to slightly move her hips side to side, then up and down, alternating between movements and searching which ones seem to be more stimulating for which of you.  She continues to masturbate her now erect member, and allows you to run your hands over her body, squeezing her hips, ass, waist, and then breasts as she runs her other arm over your chest and nipples.");

		DisplayText("\n\n\"<i>Fuck, this feels so good.</i>\"");

		DisplayText("\n\nYou're inclined to agree, and the fox-box massaging the base and mid-length of your member assures that it will continue to feel that way.  ");
		if (player.hasKnot(x)) DisplayText("You slowly feel the blood flow to your erect penis, and the knot at the base of it seems to start to expand");
		else DisplayText("You don't mind staying like this for much, much longer, and the hermaphrodite on top of you seems to share that point of view");
		DisplayText(".  Summoning your slightly exhausted strength, you pull her hips down deeper into your own before starting to return the hermaphrodite's shakes and bounces with thrusts of your own.  It intensifies the sensations, making your lover yelp in surprise before smiling widely and releasing low, content moans and purrs from the depths of her throat.");

		DisplayText("\n\nShe continues to shake her hips and squeeze you without lifting her ass away from your body too much.  While you're able to last longer this time, it seems like fate that you will finally blow another load inside the vixen.  As she feels your ");
		if (player.hasKnot(x)) DisplayText("knot surge with more blood and your erection twitch, ensuring that you're completely trapped inside her until you're empty.");
		else DisplayText("tip expand as you're getting ready to blow another load.");
		DisplayText("  Urta moans on top of you, increasing the speed of her movements and running her hand up and down her own member faster and with more intense strokes.");

		//[Regular Urta]
		if (!urtaLove()) {
			DisplayText("\n\n<i>Now ain't I just the best fuck you ever had?</i>\"");
		}
		//[Lover Urta]
		else DisplayText("\n\n\"<i>Come on, lover, you know it'll feel better once you give me even more!</i>\"");
		DisplayText(" Urta masturbates furiously as your body and your " + Desc.Cock.describeCock(player, x) + " finally gives in to your rut and the vixen's intense lust.  The two of you come in complete sync this time, her wet, black pussy milking you with vice-like tightness and intense, rhythmic squeezing as she fires a huge rope of jizz onto the floor next to your table before painting your chest and abdomen with lesser white strings.");

		//[If large cum production]
		if (player.cumQ() >= 500 && player.cumQ() <= 1500) DisplayText("\n\nUrta seems positively full and stretched now, and your rut almost subsides for a moment, her stretched tummy imitating a pregnancy quite well.");
		else if (player.cumQ() > 1500) {
			DisplayText("\n\nUrta is stretched and completely full, so, holding your " + Desc.Cock.describeCock(player, x) + " in her hand for a moment, she lifts herself off your cock, presses on her abdomen and allows some of your spunk to drip out of her, coating the table, your thighs and your ");
			if (player.torso.balls.quantity > 0) DisplayText("[balls]");
			else if (player.torso.vaginas.count > 0 && player.torso.clit.length >= 3.5) DisplayText("cock-like clit");
			else if (player.torso.vaginas.count > 0) DisplayText("pussy lips");
			else DisplayText("inside of your thighs");
			DisplayText(" with your own thick white semen.  Then, she slides your softening erection back into herself again.");
		}

		DisplayText("\n\n\"<i>Good... so good!  Just a few more rounds, and we'll be done - don't go fucking soft on me!</i>\"");

		DisplayText("\n\nYour " + Desc.Cock.describeCock(player, x) + " feels sensitive and tender after the two past orgasms, but the horny nympho just forces it deep into her snatch, the sensitive head and shaft all the way down to your base again squeezed tighter as she starts to bounce up and down, trying to breathe life into your erection.  She kisses you furiously and passionately, exploring your mouth with her tongue as she keeps the stimulation on your groin, cooing, groaning and panting as if trying to breathe her own lust into you.");

		DisplayText("\n\n\"<i>Come on, come on, whatever it takes!  Squeeze those boobies, smack that ass, just get fucking hard!</i>\"");

		DisplayText("\n\nFollowing her plea, you give her breasts a rather rough squeeze, and you feel your " + Desc.Cock.describeCock(player, x) + " miraculously harden inside her once again.");
		if (player.torso.balls.quantity > 0) DisplayText("  Your [balls] don't seem to be completely empty yet");
		else DisplayText("  It doesn't appear to be the end of what your body can produce");
		DisplayText(", and your vulpine lover squeals with delight as she feels you harden inside her.  She smacks your [chest] with her huge, half-hard member.");

		DisplayText("\n\n\"<i>Care to give me a hand with that?  There's quite a lot of cream to squeeze out of this one, too.</i>\"");

		DisplayText("\n\nYour tired and lust-hazed mind sees no reason not to, and you grab her, so Urta's massive mare member starts to be pleasured by her own hand as well as yours.  Squealing in delight, the horny vixen returns to what seems to occupy her mind completely: bouncing fervently on top of you, with your " + Desc.Cock.describeCock(player, x) + " trapped in her wet snatch.");

		DisplayText("\n\nThe stimulation is intense, your now far more sensitive member completely at the mercy of her inner muscles.  Urta doesn't seem tired at all, instead being even more ferocious and eager to share another set of mind-blowing orgasms with you, ramming her own hips against your [hips] while the back of her tail occasionally teases");
		if (player.torso.vaginas.count <= 0 && player.torso.balls.quantity === 0) DisplayText(" the inside of your thighs");
		else if (player.torso.balls.quantity > 0) DisplayText(" your [balls]");
		else if (player.torso.vaginas.count > 0) DisplayText(" your [clit]");
		DisplayText(" when she's pressed entirely against you.  She smacks her own bottom and you run your other hand over her body as the two of you tug on and pull her massive erection towards your face and over your [chest], thick dollops of pre-cum and leftover semen dripping from her member over your body.  Urta licks her lips as she looks down on you with ");
		if (!urtaLove()) DisplayText("intense, unadultered lust");
		else DisplayText("possessiveness and a hungry, but somehow warm expression");
		DisplayText(".");

		DisplayText("\n\nI should make you do this every day!</i>\"");
		if (urtaLove()) DisplayText("  She suddenly seems a bit shy and surprised, before saying, \"<i>Make sure to remind me I said that later....</i>\"");

		DisplayText("\n\nWhile the increased lust and strong desire to breed you've received with your state make you able to keep going, you're way too drained and sensitive to actually keep responding to the vixen's wild movements with your own thrusts, although she seems intent to motivate you into doing so anyway.");

		DisplayText("\n\n\"<i>Come on, fuck me back!  ");
		if (!urtaLove()) DisplayText("Show me you're " + Desc.Gender.mf(player, "the man", "the breeder") + " here!");
		else DisplayText("You don't want to make me feel like I'm abusing you, do you?  I know you want this, so pound me!</i>\"");


		DisplayText("\n\nAfter a while, it becomes a torture to resist the stimulation and you try to bring your own orgasm faster by responding to Urta's movement, stretching your [hips] and pushing your " + Desc.Cock.describeCock(player, x) + " deeper into her pussy.  Although the two of you have trouble catching a common rhythm, she appears way more vitalized and enthusiastic about this than you are.");

		DisplayText("\n\nAfter a long time of slightly too rough of a ride, your " + Desc.Cock.describeCock(player, x) + " twitches inside the horny vixen again, and she almost howls in her own climax before yours is set off. Another shot of cum coats your [chest] as her hungry love-hole milks your member, forcing you to ejaculate for the third time, delivering even more semen into her insides.");
		if (player.cumQ() >= 500) DisplayText("  If the two of you were thinking rationally, you'd know quite well it could be quite dangerous to her innards to continue, but Urta seems intent on continuing this ordeal, or at least, that's how you feel when looking at her expression of bliss and ecstasy, eyes rolling to the back of her head and tongue dancing around in the air.");

		DisplayText("\n\nYou try to announce that you're done and that's about it, but the horny nymphomaniac that seems intent on keeping your rutting " + Desc.Cock.describeCock(player, x) + " all to herself feels differently.  She allows your member to slide out of her for a moment, but only to let out some of the spunk that's filling her and to stimulate you in a different way.  Urta moves down your body, stroking your [chest] and your [nipples] before lowering her face and arms to your [hips].  She licks your sensitive head for a while before delivering a couple of noisy, strong sucks to your " + Desc.Cock.describeCock(player, x) + ".  Afterwards, she licks your ");
		if (player.torso.balls.quantity > 0) DisplayText("[balls]");
		else if (player.torso.vaginas.count > 0) DisplayText("[vagina] and [clit]");
		else DisplayText("taint");
		DisplayText(" before finally running her tongue over your [asshole], and all the way up again, swallowing your member once again as she squeezes your [butt].  You alternate before moaning, groaning, and whimpering as blood seems to leave your head and entire body, surging into your " + Desc.Cock.describeCock(player, x) + " and making it hard to think or move, much less resist.");

		DisplayText("\n\n\"<i>We've already agreed that it's fine for me to take everything, so stop being so lazy!  I want to fuck more!  I'll keep fucking you until we break the table and dig a hole in the floor!");
		if (urtaLove()) DisplayText("  You can rest later!  I'll even give you a massage, so keep giving it to me!");
		DisplayText("</i>\"");

		DisplayText("\n\nOnce again, she moves her body on top of yours, dripping with her own semen and coating the place in your spunk in the process.");
		if (player.cumQ() <= 200) DisplayText("  The table already seems like it'll be stained white by Urta's efforts alone, and your own fluid doesn't help the situation.");
		else if (player.cumQ() < 1000) DisplayText("  The two of you are already fucking in a small pool of your mixed semen sauce, making naughty sounds heard all over the bar, and her vagina, dripping with your fluids, only makes the pool seem bigger.");
		else if (player.cumQ() >= 2000) DisplayText("  Your mixed sperm is covering the table and the floor, and woe to anyone who will have to clean this place up.  Despite the ridiculous amount of fluids around, she seems set on the idea that the two of you are barely mid-way through the act.");

		DisplayText("\n\nUrta slides your semi-erect phallus inside herself again as she steadies herself, her hand moving towards your [chest] for support.  \"<i>Come on, you can't knock up all the girls in the tavern with so little cum!");
		if (player.cumQ() >= 1000) DisplayText("  Well, maybe you can, but let's make some twins!");
		DisplayText("  Keep going!</i>\"");

		DisplayText("\n\nResponding to the idea of knocking people up as well as the sensation of Urta's warm, soft, very wet, dripping and very filled insides, your member struggles to get back to life, slowly hardening inside the hermaphrodite yet again.  You groan beneath her, the tiredness and tenderness of your body unwilling to put up with this, yet unable to summon the strength or even the desire to resist.  Urta just giggles in response, pleased at your body's reaction, before pulling the tip of her cock as close to your face as possible.");

		DisplayText("\n\n\"<i>Lick.  I've sucked yours, so it's only fair.  Let's keep spurting jizz all over the place, drown it in semen.  Wait... no, you should just pump it into me and keep as much inside as possible.</i>\"");

		//[If the PC is 4' 5'' feet tall or less] 
		if (player.tallness <= 53) DisplayText("\n\nYou don't even have to bend down to start licking and slurping at the tip of her dick.");
		else if (player.tallness <= 65) DisplayText("\n\nBy maneuvering your neck alone, you're easily able to press your lips against the tip of her erection.");
		//[If the PC is between 5' 6'' and 6' 5'' feet tall]
		else if (player.tallness <= 78) DisplayText("\n\nYou easily bend down to caress Urta's cock with your tongue, returning the pleasure.");
		//[If the PC is between 6' 6'' and 7' 9'' tall]
		else if (player.tallness <= 93) DisplayText("\n\nUrta has to bend backwards a bit and you have to stretch your back a bit painfully to access her erection, but you manage to start caressing her tip with your tongue.");
		else DisplayText("\n\nNo matter how hard you tried, you wouldn't be able to return the favor in this position.  Your body is just too tall.");

		DisplayText("\n\nUrta bounces wildly on top of you, her muscles squeezing and releasing, massaging your " + Desc.Cock.describeCock(player, x) + ".  Even coated through and through with your cum and stretched from the fucking, the muscles of her vaginal passage provide a tight, warm, exquisite sensation, and the dirtiness of the deed only seems to further turn you on - as do the dirty, jealous looks of females and some herms that are surrounding you, apparently hoping for a round with either you or Urta.  No, it might've been true before.  They're fully aware that the two of your seem exclusively focused on each other and that your mating will continue for a while if the hermaphrodite fox-morph has her way.");

		DisplayText("\n\n\"<i>Keep away, dumb sluts!  This one's mine!</i>\"  She grabs your face in her hands, stroking your cheeks and pulling you lower towards her erection, ");
		if (player.tallness <= 93) DisplayText("making you lick, kiss and suck on her flared, wide tip");
		else DisplayText("staring deep into your eyes as her erection smacks you against your [chest]");
		DisplayText(".");
		if (!urtaLove()) DisplayText("  She grins at your lack of resistance.");
		else DisplayText("  \"<i>You're mine, right?  Right now, you're mine and mine alone.  My wonderful virile breeder, all " + Desc.Gender.mf(player, "his", "her") + " seed just for me.</i>\"");

		DisplayText("\n\nThe surrounding feminine figures groan in surrender and frustration, but some start masturbating, only serving to make your member harden and twitch inside Urta's welcoming passage.  She seems to think it was her efforts that lead to this, and moans in delight.");

		DisplayText("\n\n\"<i>Yes!  Fuck, Marae, this is just superb!  We'll keep fucking like this until we're totally empty!");
		if (urtaLove()) DisplayText("  Just a few more loads, okay?  You don't mind, lover?  I'm practically addicted, so let me just fucking overdose!");
		DisplayText("</i>\"");

		DisplayText("\n\nYou pant and moan as your " + Desc.Cock.describeCock(player, x) + " moves through her passage and into her warm body, your tip aimed at her womb, now full of your sperm and fated to get more soon.  Your vulpine lover just keeps calling your name while bouncing on top of you, moaning, groaning, shouting in delight and howling in rapture, muting the sounds of sloshing and smacking from your joined genitals and the weaker moans from the surroundings.  Apparently the Wet Bitch has delved into a growing orgy of singles masturbating or searching for partners while couples or threesomes shred each other's clothes and start to fuck on the spot.");

		DisplayText("\n\nThe mare penis in front of your face suddenly twitches as it releases a thick rope of cum onto your tongue and lips, covering your face, shooting over your hair and your forehead and generally making you a mess.  Urta's cry of ecstasy seems stuck in her throat, but her twitching body, tightly hugging, pulsing insides, suddenly grip strongly on your shoulders and load after load of thick cream released in the general vicinity of your face seem like a good enough indication that she climaxed again.  You feel your own orgasm approaching and Urta seems completely intent on giving it to you, her tight breeding hole tugging on your rut-driven erection");
		if (player.torso.balls.quantity > 0) DisplayText(", your [balls] frantically gathering any cum that is left in them to prepare for another surge of shots into the hermaphrodite's eager nethers");
		DisplayText(".  You seem to slowly lose the sensations in most of your body.  The awareness of your surroundings slips away, as all your thoughts and feelings focus in your groin, struggling to keep up with the mad pace of breeding that Urta has kept so far.  It's hard to keep conscious as you feel another surge of ecstasy pass all over your body and focus on your " + Desc.Cock.describeCock(player, x) + ", shooting off yet again inside her coaxing hole.  You hear the sound of your name being called and the milking, squeezing sensations that you barely manage to associate with her ravenous, insatiable pussy.");

		DisplayText("\n\nThe sex-crazed fox keeps going, and your equally mad penis seems intent to keep erect inside her.");

		DisplayText("\n\nYour mind is incapable of tracking what happened later.  You were pretty tired and nearly empty, but you managed another orgasm or two with the hermaphrodite riding on your erection.  You can't really remember how many orgasms she had in the meantime, or what happened afterwards.  How did you leave the Wet Bitch and how did you end up with a somehow familiar roof over your head, with furs under your back and without the all-encompassing scents of sex and jizz in the air?");

		DisplayText("\n\n\"<i>[name], it appears we can't be trusted around each other if I've had a few drinks and you're in such a ready state.  It was enjoyable while it lasted, but... well, let's say the Wet Bitch may smell for a while, my reputation may be worse than it was in the past, and, ummm, I don't think my girly parts will be ready for more action in a while.  You feel fine, I hope?</i>\"");

		DisplayText("\n\nYou respond that you're a little sore and hurt, but at least now you've got a grip on your sex drive.  You explain, however, that you're not completely sure how your rut will ultimately react to this kind of sex marathon.");

		DisplayText("\n\n\"<i>I see.  I hope this brings you more than temporary relief.</i>\"");

		DisplayText("\n\nShe winces in pain, but seems in relatively high spirits.");

		DisplayText("\n\nI didn't know I could be so aggressive while using my female parts.  I guess I've made myself worthy of the name of my favorite tavern. I apologize for-</i>\"");

		DisplayText("\n\nYou stop Urta, saying you're just as much to blame as she is.  ");
		//If Corruption>35, or Exhibitionist
		if (player.stats.cor > 35 || Flags.list[FlagEnum.PC_FETISH] > 0) DisplayText("You tell her it was actually a great experience to have such passionate sex publicly.  She blushes at that suggestion.");

		//[If Urta is infertile]
		if (!urtaQuestDone()) {
			DisplayText("\n\n\"<i>Well, I guess it was nice, if painful afterwards, to be of use to someone who was so ready and willing to breed.");
			if (urtaLove()) DisplayText("  If only I could... uh, I guess I should just enjoy what I can.");
			DisplayText("</i>\"");
		}
		//[If Urta is fertile]
		else {
			DisplayText("\n\nYou realize that Urta went ahead and forced many orgasms out of you and inside herself without as much as a hint of protection.  Worried that neither of you was in a clear state of mind at the time, you ask her about this.");
			if (Flags.list[FlagEnum.URTA_FERTILE] != 1) DisplayText("\n\n\"<i>Don't worry love, I'm on enough contraceptives that we shouldn't have to worry,</i>\" Urta admits.");
			else DisplayText("\n\n\"<i>We did, didn't we?  It would be nice, wouldn't it?  If every time you got in a rutting mood you could just drill another baby into me...  I really wanted it, [name]!  I love you!</i>\"");
			DisplayText("\n\nYou nod and tell her you understand.");
			urta.knockUpUrtaChance();
			urta.knockUpUrtaChance();
			urta.knockUpUrtaChance();
		}
		DisplayText("\n\nShe ");
		if (!urtaLove()) DisplayText("winks at you as you get ready to leave.  I hope I'll get to play with you again soon.</i>\"");
		else {
			DisplayText("gives you a quick but loving kiss before getting up and starting to prepare to leave the house.  As you get ready to move, she mumbles something, and reaches, grabbing your arm, shyly.\n\n\"<i>[name], next time, umm: find me when I'm sober.  I'll get to see how it feels to be wanted by someone the way I usually crave you, okay?</i>\"");

			DisplayText("\n\nYou " + Desc.Gender.mf(player, "chuckle", "giggle") + " and she punches your shoulder playfully, but keeps her face from blushing more.  She seems pleased that she brought herself to that declaration.");
		}
		//[Both end here]
		DisplayText("\n\nSatisfied even if your body hurts all over and your " + Desc.Cock.describeCock(player, x) + " seems empty, dry, burning, and almost ruptured.  You leave the house with a small smile on your face, and a strong stench of sexual fluids following you back to the camp.");

		//player returns to camp and loses 4 hours//
		dynStats("lib", 2, "sen-", 10, "lust=", 0);
		player.orgasm();
		player.orgasm();
		player.orgasm();
		player.orgasm();
		player.orgasm();
		player.orgasm();
		Flags.list[FlagEnum.URTA_COMFORTABLE_WITH_OWN_BODY]++
		urtaLove(1);
		Flags.list[FlagEnum.TIMES_RUT_FUCKED_URTAS_CUNT]++;
		Flags.list[FlagEnum.URTA_TIME_SINCE_LAST_CAME] += 24;
		return { next: Scenes.camp.returnToCampUseFourHours };
	}


	/*
	End/intensify heat/rut message:
	Quote:Extinguish: As you walk away, you realize that your (heat/rut) has cooled; evidently, mating with Urta let you trick your body, so now it isn't crazed to breed. [Heat/Rut ends]
	
	Intensify: As you walk away, you groan as you realize that you feel hornier than ever. It looks like trying to trick your body by mating with (a sterile herm/a herm who uses contraceptives afterwards) wasn't a good idea - it's only made things worse. [Heat/Rut intensifies]
	
	*/

	//Drunken Urta Variants 
	//Quote:Drunken Urta always affects heat/rut when penetration is involved (meaning she doesn't in her frottage scene and watch-her-masturbate scene), and has a 50% chance to either extinguish it or intensify it.
	//When penetration is involved, sex with Drunken Urta while in Heat/Rut increases both Toughness and Libido by 2 points and lowers Sensitivity by 4 points. Player often loses more than 1 hour and has to return to camp, rather than stay in TelâAdre. When getting penetrated, Urta's vaginal capacity is bumped up to 72.
}
}