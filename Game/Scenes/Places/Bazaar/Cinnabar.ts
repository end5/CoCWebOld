﻿package classes.Scenes.Places.Bazaar{
	import classes.GlobalFlags.FlagEnum;

//Cinnabar - Female rat-morph, size queen. Likes bizarre
//stuff and extreme pen, VERY STRETCHY, & Hammerspace 
//orifices. Personality keywords: Sexually adventurous, 
//eager to please, "dominant/power bottom", studious, 
//romantic

//USES PORTALS.

//Appearance
//Bust – D cups that she can enlarge for 'the big boys'.
//Eyes - crimson
//Lips - black
//Fur – rust red/'ruddy'
//Tail – Barely touches the ground, but is prehensile and capable of being lengthened at will.
public class Cinnabar extends BazaarAbstractContent {
	
//Appearnace
public cinnabarAppearance(output:boolean = true):Function {
	//Send back 0 for 'closed'.
	if(model.time.hours < 15 || model.time.hours > 20) return null;
	if(output) {
		//Not yet introduced
		if(flags[FlagEnum.CINNABAR_NUMBER_ENCOUNTERS] === 0) DisplayText("\n\nThere's a generously proportioned woman lurking near a tavern.  Looking closer, you can see she has a ruby-red dress over her ruddy fur, and as she turns you make out an unmistakable, rat-like muzzle.");
		//Appearance Repeat:
		else DisplayText("\n\nCinnabar is on the prowl, looking for well-endowed johns to lie with.");
	}
	return cinnabarGreeting;
}
//Approach 
private cinnabarGreeting():void {
	DisplayText().clear();
	DisplaySprite(91);
	//1st Time:
	if(flags[FlagEnum.CINNABAR_NUMBER_ENCOUNTERS] === 0) {
		flags[FlagEnum.CINNABAR_NUMBER_ENCOUNTERS]++;
		//(No cock) 
		if(player.torso.cocks.count <= 0) {
			DisplayText("You walk over towards the rat-morph, and as you near, she places her hands on her hips, sizing you up with her intense, blood-red eyes.  She licks her lips and sidles alongside you, caressing your body as she offers, \"<i>50 gems for an hour.  That's all it takes to have Cinnabar be your companion...</i>\"  Her voice trails off into a husky vibration as she awaits your response.\n\n");
			//[Buy an hour] [Leave]
			simpleChoices("Buy1Hour", cinnabarNonHugeDickings, "", null, "", null, "", null, "Leave", bazaar.enterTheBazaar);
		}
		//(Small Cock)
		else if(player.torso.cocks.sort(Cock.LargestCockArea)[0].area < 100) {
			DisplayText("You walk over towards the rat-morph, and as you near she places her hands on her hips, sizing you up with her intense, blood-red eyes.  She sidles up alongside you, caressing your body until she feels your bulge.  Her hand stops in place and licks her black, glossy lips,  giggling, \"<i>I see you've still got a little boy-cock, huh? Well, 50 gems will get you an hour of my time.  That's all it takes to have Cinnabar be your companion...</i>\"  The slutty rat-girl's voice trails off into a husky vibration while she awaits your response.");
			//[Buy an hour] [Leave]
			simpleChoices("Buy1Hour", cinnabarNonHugeDickings, "", null, "", null, "", null, "Leave", bazaar.enterTheBazaar);
		}
		//(Big enough Cock) 
		else {
			DisplayText("You walk over towards the rat-morph, and as you near she places her hands on her hips, sizing you up with her intense, blood-red eyes.  She sidles up alongside you, caressing your body and giving a happy hum as her fingers trace the huge, rounded bulk of your bulge. The slutty rat coos, \"<i>Such a big... hot fuck-stick you've got there.  You make me drip, " + Desc.Gender.mf(player, "stud","baby") + ".  Normally I'd charge some gems, but fuck it – I want ");
			//Multicocks if the PC has 2 big enough
			if(player.torso.cocks.count > 1 && player.torso.cocks.sort(Cock.LargestCockArea)[0].cockArea2() >= 75) DisplayText("those things");
			else DisplayText("that thing");
			DisplayText(" inside me... the name's Cinnabar, but I'd rather you plug me and call me whatever you want.</i>\"  Her voice trails off into a husky, barely heard vibration as she awaits your response.");
			//[Fuck] [Leave]
			if (player.torso.cocks.count > 2 && player.torso.cocks.sort(Cock.LargestCockArea)[0].cockArea2() >= 75)
				simpleChoices("Fuck Her", cinnabarGetsFUKKKKED, "Multi-Fuck", cinnabarMultiCockPortalFuckFest, "", null, "", null, "Leave", bazaar.enterTheBazaar);
			else simpleChoices("Fuck Her", cinnabarGetsFUKKKKED, "", null, "", null, "", null, "Leave", bazaar.enterTheBazaar);
		}
	}
	//Not first time
	else {
		//(No cock) 
		if(player.torso.cocks.count <= 0) {
			DisplayText("You walk over towards Cinnabar, and as you near, she places her hands on her hips, sizing you up with her intense, blood-red eyes.  She licks her lips and sidles alongside you, caressing your body as she offers, \"<i>50 gems for an hour.  That's all it takes to have a companion...</i>\"  Her voice trails off into a husky vibration as she awaits your response.\n\n");
			//[Buy an hour] [Leave]
			simpleChoices("Buy1Hour", cinnabarNonHugeDickings, "", null, "", null, "", null, "Leave", bazaar.enterTheBazaar);
		}
		//(Small Cock)
		else if(player.torso.cocks.sort(Cock.LargestCockArea)[0].area < 100) {
			DisplayText("You walk over towards Cinnabar, and as you near, she places her hands on her hips, sizing you up with her intense, blood-red eyes.  She sidles up alongside you, caressing your body until she feels your bulge.  Her hand stops in place and licks her black, glossy lips,  giggling, \"<i>I see you've still got a little boy, huh? Well, 50 gems will get you an hour of my time.  That's all it takes to have a VERY skilled companion...</i>\"  The slutty rat-girl's voice trails off into a husky vibration while she awaits your response.");
			//[Buy an hour] [Leave]
			simpleChoices("Buy1Hour", cinnabarNonHugeDickings, "", null, "", null, "", null, "Leave", bazaar.enterTheBazaar);
		}
		//(Big enough Cock) 
		else {
			DisplayText("You walk over towards the rat-morph, and as you near she places her hands on her hips, sizing you up with her intense, blood-red eyes.  She sidles up alongside you, caressing your body and giving a happy hum as her fingers trace the huge, rounded bulk of your bulge. The slutty rat coos, \"<i>Such a big... hot fuck-stick you've got there.  You make me drip, " + Desc.Gender.mf(player, "stud","baby") + ".  Normally I'd charge some gems, but fuck it – I want ");
			//Multicocks if the PC has 2 big enough && at least 3 total
			if(player.torso.cocks.count > 2 && player.torso.cocks.sort(Cock.LargestCockArea)[0].cockArea2() >= 75) DisplayText("those things");
			else DisplayText("that thing");
			DisplayText(" inside me... We could sit here and talk, but I'd rather you plug me and call me your slut.</i>\"  Her voice trails off into a husky, barely heard vibration as she awaits your response.");
			//[Fuck] [Leave]
			if(player.torso.cocks.count > 2 && player.torso.cocks.sort(Cock.LargestCockArea)[0].cockArea2() >= 75)
				simpleChoices("Fuck Her", cinnabarGetsFUKKKKED, "Multi-Fuck", cinnabarMultiCockPortalFuckFest, "", null, "", null, "Leave", bazaar.enterTheBazaar);
			else simpleChoices("Fuck Her", cinnabarGetsFUKKKKED, "", null, "", null, "", null, "Leave", bazaar.enterTheBazaar);
		}
	}
}


//[Buy an Hour]
private cinnabarNonHugeDickings():void {
	flags[FlagEnum.CINNABAR_HOUSE_VISITED]++;
	flags[FlagEnum.CINNABAR_NUMBER_TIMES_FUCKED]++;
	flags[FlagEnum.CINNABAR_FUCKED_CORRUPT_PREVIOUSLY] = 0;
	DisplayText().clear();
	DisplaySprite(91);
	//(Too poor)
	if(player.inventory.gems < 50) {
		DisplayText("\"<i>Ooooh... I'm sorry, but you don't have the gems to hire a companion, babe.   You should get some practice spreading your thighs and earn a REAL living,</i>\" Cinnabar teases.");
		return { next: bazaar.enterTheBazaar };
		return;
	}
	//(Enough cash)
	player.inventory.gems -= 50;
	statScreenRefresh();
	DisplayText("Once you give your assent, Cinnabar's paws dive into your " + player.inventory.equipment.armor.displayName + ", gliding over your " + player.skin.desc + " before re-emerging above your gem-pouch.  She deftly grabs her payment and snakes back through, tickling your belly with her soft, well-groomed fur.  You look at her, then yourself, then her again.  How the hell was she flexible enough to do that?  Cinnabar giggles and curls her tail around your " + Desc.Leg.describeLegs(player) + ", looping it like a long, flexible rope.  She hugs you and murmurs, \"<i>Where will my " + Desc.Gender.mf(player, "master","mistress") + " take " + Desc.Gender.mf(player, "his","her") + " slutty, fuck-hungry companion?</i>\"  Her tongue flicks your ear like a snake tasting its prey, and though her attitude sounds submissive and weak, your horny 'companion' is clearly hiding a fiery, aggressive streak.\n\n");
	
	DisplayText("Before you can make an answer, Cinnabar's hands are back inside your " + player.inventory.equipment.armor.displayName + ", tugging your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + " towards an unmarked wagon that's clearly her home.  You smirk and rub her between her legs, feeling the moistness of her sloppy cunt through her now-dampened dress.  Before she can tease you any more, you hook a finger up, pushing her dress into her hungry snatch.  It's easy to lead the giggling rat-whore like this, and when you reach the door she slides her tail into the lock, clicking it open with ease.\n\n");
	
	DisplayText("With surprising strength, she drags you inside, kicking the door shut.   She hurredly strips, struggling a little with the tight dress, and you take the cue to disrobe as well.  You get done first, just in time to notice she's stopped with the wet patch on her nose.  She's sniffing and tweaking a nipple, masturbating herself as if she's completely forgotten about you.  A crimson eye peeks through the upraised dress-slit, and you realize she's imploring you to take advantage.\n\n");
	
	DisplayText("You give the whore what she wants and pull the sodden dress from her, tweaking her nipple hard.  She moans and pulls you into her bed, which groans from the sudden onslaught of added weight.  As you lie atop her prone, exposed body, you realize the walls around her bed are plastered with dozens of spherical mirrors, all reflecting the nude flesh of your entwined bodies.  Your slut-for-an-hour grabs you by the hair and kisses you hard, her velvety-soft lips raping your mouth and burning with the heat of her lust.  She pulls you back and moans, \"<i>" + Desc.Gender.mf(player, "Master","Mistress") + " has chosen well.  Now please, pinch this slut's nipples while she puts on a show for you.</i>\"\n\n");
	
	DisplayText("Obligingly, you grab both her black, puffy nipples and twist them.  Her heart hammers in her chest, pumping hard enough for you to feel it beat through her abused, puffed-up teats.  She twists her body, writhing out from under you while somehow keeping her nipples in your fingers the entire time.  With an annoyed squeeze, you turn the tender nubs harder, smiling when they yield under the pressure and begin to corkscrew.  Cinnabar groans lustily, now on all fours, and smears her dripping gash against the wall behind her, her tits swaying lewdly in your grasp.\n\n");
	
	DisplayText("Cinnabar coos happily, in spite of the pain, and she begs, \"<i>Please " + Desc.Gender.mf(player, "master","mistress") + ", look at the mirrors.  Your slut is trying to be good, but she needs to be filled so badly.</i>\"  You turn to look, but hold on to her tortured tits, just in case.  Amazingly, a pair of the mirrors have changed.  They no longer reflect your own image back – they show her gaping, girlcum-dripping gash and twitching, black-skinned anus.  You can even smell her feral musk and feel the heat pouring from her horny genitalia hitting you in a wave.\n\n");
	
	DisplayText("Too shocked to keep your grip, you listen dumbly as Cinnabar groans, \"<i>" + Desc.Gender.mf(player, "Master","Mistress") + " is pleased?  This one knows how to use portals for their intended purpose.  Watch slut make more sexy portals.</i>\"  True to her words, many of the other mirrors change, showing both sets of nipples");
	if(player.torso.vaginas.count <= 0) DisplayText(" and your " + Desc.Butt.describeButthole(character.torso.butt));
	else DisplayText(", your " +             Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + ", and your " + Desc.Butt.describeButthole(character.torso.butt));
	DisplayText(" just inches away.  Without any prompting, you reach through to touch her arousal engorged lips, slipping fingertips through the needy gash and marveling at how large it feels.  You push forward, burying one, two, three, and finally four fingers inside her hungry nethers.\n\n");
	
	DisplayText("Cinnabar pants, \"<i>Ungh... more.  Stuff this whore's cunt,</i>\" all while she wiggles her backside against the mirror, clearly enjoying the attention.  You pull back to tease her, but the horny whore groans and reaches through another portal to ");
	if(player.torso.vaginas.count > 0) DisplayText("grab your " + Desc.Vagina.describeClit(player) + ", rolling it between her thumb-pads with a hair too much pressure");
	else DisplayText("slip two digits into your " + Desc.Butt.describeButthole(character.torso.butt) + ", pulling it apart far enough to cause you discomfort");
	DisplayText(".  She wants to be penetrated?  Fine.  You ball your fingers and push forward.  Amazingly, you push through a gossamer curtain of femcum and bury your whole hand inside her cunt with ease.  Her silky-smooth walls tremble and squeeze, caressing your hand like a long-lost lover.\n\n");
	
	DisplayText("Satisfied with your display of power, her fingers ");
	if(player.torso.vaginas.count > 0) DisplayText("release their squeeze");
	else DisplayText("release the butt-stretching pressure");
	DisplayText(" and settle to the business of sliding back and forth, caressing you from the inside out.");
	//Finger poke
	if(player.torso.vaginas.count > 0) Mod.Vagina.displayStretchVagina(player, 8,true,true,false);
	else Mod.Butt.displayStretchButt(player, 8,true,true,false);
	if(player.torso.cocks.count > 0 && player.torso.vaginas.count <= 0) DisplayText("  Unbidden, " + Desc.Cock.describeMultiCockSimpleOne(player) + " begins to harden, stiffening with every brush against your prostate.");
	else if(player.torso.vaginas.count > 0) DisplayText("  Femcum begins to soak the rat's practiced fingers, drenching her finger-pads with liquid lust.");
	DisplayText("  You rock back, slamming your " + Desc.Butt.describeButt(player) + " against the wall and moaning with need.  She's quite skilled, and ");
	if(player.torso.vaginas.count > 0) DisplayText("caresses your passage in ways that ");
	else DisplayText("works your body in ways that ");
	DisplayText("leave you panting like a bitch in heat.  She urges you on, practically begging, \"<i>Yes!  Stuff my hole!  Fist me, " + Desc.Gender.mf(player, "master","mistress") + "; stretch me with your hand until I'm too loose for a minotaur!  Please... please... fist my ass too.  Ruin my holes, " + Desc.Gender.mf(player, "master","mistress") + "!  Break fuck-toy's body!</i>\"\n\n");
	
	DisplayText("You shrug and pull yourself up by the fist in her cunt, eliciting an agonized moan from your whore while you plunge your other hand into her clenching, squeezing asshole.  Her knees dig deep into the cushions, now supporting her own weight as well as yours, but the quickening pace of Cinnabar's ");
	if(player.vaginalCapacity() < 30) DisplayText("fingers");
	else DisplayText("fingers - no, fist");
	DisplayText(" tells you just how much she likes it.  ");
	//CUNTZ
	if(player.torso.vaginas.count > 0) {
		DisplayText("She even works ");
		if(player.analCapacity() < 30) DisplayText("her fingers");
		else DisplayText("her fist");
		DisplayText(" into your asshole, leaning on you in the same way and locking your bodies together through the portals.  ");
	}
	if(player.torso.cocks.count > 0 && player.torso.vaginas.count <= 0) DisplayText("You gasp and moan when you feel her other hand wrap around your " + Desc.Cock.describeCock(player, player.torso.cocks.get(0)) + ", pulling and tugging on it until it starts to leak a trail of squeezed-out man-slime on the mattress.  ");
	DisplayText("Growing more and more aroused, hotter and hotter, you pick up the pace, pistoning your forearms in and out of Cinnabar's lewdly squelching holes.\n\n");
	
	DisplayText("She squeaks, the first rodent-like sound she's made all evening, and you take that as your cue to work her even more brutally, pounding her now-gaped holes with hard, fast strokes.  Each time it seems like she swallows more of your arm, and after a few particularly violent poundings, you've sunk inside the rat up to the elbow.  From where you're kneeling, you can see her belly, and it isn't distended in the slightest.  Just how much can she handle?\n\n");
	
	DisplayText("You press on, brutalizing her pussy and asshole simultaneously.  Each time you pull your fist back, the flesh is hanging limply around it, stretched so wide she barely notices it, but then you're back inside her, stuffing her with your bicep and rubbing her cervix.  Nearby, you spot a mirror that gives you the perfect view of her clit, and with one inspired movement, you lean low enough to give it a lick.  The smooth, hard flesh of her nub slides into your lips as you tongue at it, growing with Cinnabar's rapidly spiking passion.  She squeaks long and loud, dragging it into a moan while her violated pussy and gaped asshole pull tight around your arms, squeezing and milking them as if they were giant-sized cocks.\n\n");
	
	DisplayText("The rat's ");
	if(player.torso.vaginas.count > 0) {
		if(player.vaginalCapacity() < 30 && player.analCapacity() < 30) DisplayText("fingers");
		else if(player.vaginalCapacity() >= 30 && player.analCapacity() >= 30) DisplayText("fists");
		else DisplayText("fingers and fist");
	}
	else {
		if(player.analCapacity() < 30) DisplayText("fingers");
		else DisplayText("tightly-clenched fingers");
	}
	DisplayText(" plunge further inside you, violating you far more gently, but still hard enough to get you off.");
	if(player.torso.cocks.count > 0 && player.torso.vaginas.count <= 0) {
		DisplayText("  Her soft pads grip your " + Desc.Cock.describeCock(player, player.torso.cocks.get(0)) + " tightly while she  presses on your prostate, milking your cum from you with professional skill.  Rather than coming in its usual spurts, it drips in a long, liquid chain of white-goo that drops into a submissive puddle on the bed.");
		if(player.cumQ() >= 250) {
			DisplayText("  Not content with that, your body keeps going, thickening the stream into a torrent that soaks the sheets");
			if(player.cumQ() >= 1000) DisplayText(" and puddles on the floor");
			DisplayText(".");
		}
	}
	if(player.torso.vaginas.count > 0) {
		DisplayText("  She licks your " + Desc.Vagina.describeClit(player) + ", and your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + " convulses around the intruding digits, making you shiver and moan.  Not wanting to be left out, your " + Desc.Butt.describeButthole(character.torso.butt) + " clamps and puckers with it, wringing the rat's ");
		if(player.vaginalCapacity() < 30) DisplayText("fingers");
		else DisplayText("hand");
		DisplayText(" in its hungry embrace.");
	}
	//(No dick/cunt:
	if(player.gender === Gender.NONE) DisplayText("  Her soft pads rub your " + Desc.Butt.describeButthole(character.torso.butt) + " just right, setting off your climax with professional skill.  You grunt and squeeze, wringing her fingers inside your hungry hole as if you could milk cum from them.");
	DisplayText("  The orgasm is intense, and as you both succumb to exhaustion, two sets of limbs slip from abused orifices.  Cinnabar and you fall into each other, collapsing in a puddle of sexual juices and sweaty limbs.");
	if(player.torso.vaginas.get(0).wetness < 3) {}
	else if(player.torso.vaginas.get(0).wetness < 5) DisplayText("  Her arm seems quite soaked with your leavings.");
	else DisplayText("  Her arm and chest are left splattered from your explosive, squirting orgasm.");
	DisplayText("\n\n");
	
	DisplayText("Cinnabar rolls over to give you a kiss on the cheek once she's recovered.  Her voice is still rough from the volume of her pleasure-squeaks, but she manages to whisper, \"<i>That was nice for someone who didn't have a cock worth fucking.  Feel free to catch your breath, but I'm a working girl so don't take too long.  I've got to get the sheets cleaned");
	if(player.cumQ() >= 1000) DisplayText(" and the floor mopped");
	DisplayText(" before I can get my next customer.</i>\"\n\n");
	
	player.orgasm();
	player.stats.sens += -2;
	return { next: Scenes.camp.returnToCampUseOneHour };
}
	
//[FUCK] – tracks if last fuck was huger + corrupteded version
private cinnabarGetsFUKKKKED():void {
	flags[FlagEnum.CINNABAR_HOUSE_VISITED]++;
	flags[FlagEnum.CINNABAR_NUMBER_TIMES_FUCKED]++;
	flags[FlagEnum.CINNABAR_FUCKED_CORRUPT_PREVIOUSLY] = 0;
	DisplayText().clear();
	let x:number = player.torso.cocks.sort(Cock.LargestCockArea)[0];
	DisplaySprite(91);
	
	DisplayText("As soon as you give your assent, Cinnabar's hands are flying through your " + player.inventory.equipment.armor.displayName + " to clutch and grab at your " + Desc.Cock.describeCock(player, x) + ", squeezing the hefty member with her soft pads.  She coos happily, grinning wide enough to expose her teeth while your dick fills up in her palm, gradually spreading her fingers wide.  The turgid, burgeoning mass rubs against your " + player.inventory.equipment.armor.displayName + " near-painfully before she stops, and Cinnabar licks her lips appreciatively, knowing you're not even the whole way hard.\n\n");
	
	DisplayText("Though your " + Desc.Leg.describeLegs(player) + " have grown wobbly and your gear tight, you stand up, straight as a fencepost, and pull the slut's arms away from your kit.  Cinnabar grunts with displeasure, but you grab her dress and spin her into your arms, letting your bulge dig into her back while your hands cup the heavy swells of her breasts.  Her nipples are hard and ready, easily as large as the tips of your fingers, which you waste no time in securing around the swollen buds. The skank's displeased grunt morphs into a loud squeak, then trails off into a low, eager moan.\n\n");
	
	DisplayText("\"<i>Please, bend me over and fuck me; stuff that fat cock in my juicy cunt.  Stuff me, rut me, bang me here in front of everyone!");
	if(flags[FlagEnum.CINNABAR_FUCKED_CORRUPT_PREVIOUSLY] > 0) DisplayText("  Just be gentler than last time, okay " + Desc.Gender.mf(player, "stud","baby") + "?");
	DisplayText("</i>\"  Cinnabar cries, but the stares your little encounter has attracted warn you that continuing in the open would be a very bad idea.  You pinch on one of Cinnabar's hard nips and bite her to shush her incessant yammering, but all it does it make her squeak even louder.  You growl into her ear, telling the horny cunt that if she wants your dick inside her, she had better be a good pet and find you some privacy.\n\n");
	
	DisplayText("The eager rodent spins, pulling her nipples from your fingers and planting a heavy, wet kiss on your lips hard enough to rock you back ");
	if(player.stats.str >= 60 || player.tallness >= 72) DisplayText("a little");
	else DisplayText("on your heels");
	DisplayText(".  You sway, woozy from the passionate lip-lock, and then you're being dragged through the crowd up to a brightly-painted wagon.  The thick door is clearly locked, but the ingenuous rat's tail lifts in front of your nose, wiggling like a snake-charmer's viper.  It brushes your cheek before plunging into the vacant keyhole with the enthusiasm of a mating stallion.  An audible *click* reveals just how fine Cinnabar's tail-control is, but as you ponder that, you're dragged through the door by soft, insistent tugs.\n\n");
	
	DisplayText("Flexible, determined fingertips are buried deep into your crotch before the entry has closed behind.  Cinnabar's eyes fixate on the massive, tenting bulge between your " + Desc.Leg.describeLegs(player) + ", her soft finger-pads shaking while they try to set you free.  You appreciate her efforts, but she nearly got you into some trouble out there.  She needs to settle down, or at least be a little more mindful of your wishes.  You yank her arms away from your bouncing, newly-freed " + Desc.Cock.describeCock(player, x) + ", groaning from sensation while you wrestle to deny Cinnabar her desire.\n\n");
	
	DisplayText("The rat squirms and kicks, but you twist away from each vicious blow.  She growls, \"<i>You've got that fucking huge dick and you won't let me give it a hug?  Seriously, what are you, some cunt-shy freak?  I thought you'd be a good fuck, but if you're this scared of a woman's pussy, maybe I should go find a " + Desc.Gender.mf(player, "real man","horse-herm") + " to shack up with!</i>\"  She's got a mouth on her, but she needs to be taken down a peg.  You sweep her legs out from under her and push, slamming her into the bed hard enough to make her tits quake from the impact.\n\n");
	
	DisplayText("Cinnabar smiles and spreads her legs, lifting the hem of her dress while a finger tweaks her clit.  She coos, \"<i>Mmmmm, so dominant, but I'm not sure you know how to use that beast.  Your cock is bouncing, fucking rock hard, and I've got this wet, hot hole begging you plug it.  Yet you're standing there, watching me try to squirm out of this tight, sexy dress.</i>\"  To emphasize her point, she releases a zipper and begins to undulate, shedding the dress like a snake discards old skin.  You climb into bed after her, smiling when you see the hundreds of mirrors that hang from the walls around you.\n\n");
	
	DisplayText("The rodent follows your gaze and wraps her arms around your neck.  She whispers, \"<i>Does my big, hard " + Desc.Gender.mf(player, "stud","bitch") + " want to fuck now?</i>\"  You nod and rock forwards, pressing the turgid " + Desc.Cock.describeCockHead(x) + " of your " + Desc.Cock.describeCock(player, x) + " against her dripping cunny, but while her lips give somewhat, you can't quite breach her slippery gateway.  Cinnabar grunts from the aborted penetration and pulls back with a cat's grace and a contortionist's flexibility, uncoiling from beneath you in one, liquid motion.  She kisses your nose, pressing her curvacious bottom back against the wall while her tail loops over her shoulder to tussle your hair.\n\n");  
	
	DisplayText("\"<i>It's been a while since this horny slut has had a dick too big for her snatch, but we're going to make that fucker fit in me.  You're going to split me hard enough to make a ");
	if(x.area < 200) DisplayText("centaur mare wince");
	else DisplayText("a dragoness cry");
	DisplayText("!  Look at the mirrors; go on, look,</i>\" she instructs.\n\n");
	
	DisplayText("Sure enough, when you look at the mirrors you get a surprise.  There, in all its glory, is Cinnabar's dripping, wet snatch.  Her lips are a ruddy-red near her thighs, but the closer they get to her slit, the blacker they become.  You note her vulva and labia are slightly parted, perhaps by your previous attempt at penetration, and her shining, black love-tunnel seems to almost beckon for your attentions.  \"<i>Mmmm, look how wet I am for you, " + Desc.Gender.mf(player, "stud","slut") + "... I've been such a bad girl – look at my puny pussy.  Why doesn't " + Desc.Gender.mf(player, "master","mistress") + " punish it?</i>\" she asks, pressing back hard enough to make her genitals bulge around the mirror's rim.\n\n");
	
	DisplayText("You smile and ball your hand into a fist, ");
	if(player.stats.cor > 66) DisplayText("enjoying the raunchiness of the act");
	else if(player.stats.cor > 33) DisplayText("a little worried by how much you're enjoying this");
	else DisplayText("a little amazed that you would ever do such a thing");
	DisplayText(", then push it forwards, battering through the silky slit and into her canal.  Her juices let you slide right in, squirting and dribbling over her vulva like a fresh fruit you've just bitten into.  You lean over to lick at clear, slimy droplets, feeling your arm sink deeper inside the velvet vice with each taste you get.  It's gone in up to the elbow, and Cinnabar is squeaking happily, without a hint of discomfort.\n\n");
	
	DisplayText("Her tunnel squeezes tight, massaging your forearm as if it was some massive beast's member, but you pull back, extricating your limb along with an accompanying gush of girl-cum.  Cinnabar groans, \"<i>Ohhh baby, you were filling me up so good.  Look at what a mess I'm making for you!  Oooh, are you gonna fuck me now?  You got me stretched, but I don't know if I'm big enough... fuck it! Split me like a log, baby!</i>\"\n\n");
	
	DisplayText("As if you needed any encouragement!  She flips around to present her ass to you, her tail looping around your ");
	if(player.torso.balls.quantity > 0) DisplayText(Desc.Balls.describeSack(player) + " and ");
	DisplayText(Desc.Cock.describeCock(player, x) + " before pulling tight.  You ignore the onslaught of pressure and line your fat prick up with her inviting, fist-gaped hole.  It still doesn't look like it'll fit, but you press forwards anyway – she wanted it inside her and you've got way too much blood in your dick to do any logical thinking.\n\n");
	
	DisplayText("Your " + Desc.Cock.describeCockHead(x) + " hits those plush, juice-gushing lips and forces them wide.  She's tight, so goddamned tight, but you've only got the barest portion of your tip inside.  Cinnabar squeaks in pleasure and pain, rocking her ass up and down to try and loosen up her poor, abused entrance.\n\n");
	
	DisplayText("\"<i>Fucking cram that dick in there.  Can't you feel how hot I am?  Gods, it's so BIG... fuck me... just, fuck me!</i>\" she cries.\n\n");
	
	DisplayText("Throughout her prompting you continue the onslaught, firmly moving your " + Desc.Hip.describeHips(player) + " onward to push your " + Desc.Cock.describeCock(player, x) + " against the sloppy, cum-dripping hole.  Those black, puffy cunt-lips give one agonizing, convulsing tremble, and then they relax, stretched around the thickness of your shaft like a condom.  Her walls feel so much better on your fuck-stick than on your arm; the slippery walls contract involuntarily, the abused body's instincts trying their best to remove the intruder.\n\n");
	
	DisplayText("You slap her ass and watch it jiggle, grunting with pleasure when the ripples work their way from her reddened butt-cheek into her taut, brutalized cunt.  Cinnabar is watching you through one of her portals, mouth parted and eyes rolled partway back as she struggles to keep it together.  Somehow she manages to keep talking.  \"<i>Ungh... I can feel it stretching me... stretching me so good.  Fuck... my – ung – hips... oh gods look how wide my hips are!  You're gonna gape me so fucking good!  I'm gonna be your stretched out cock-sleeve, are you happy?  I'm gonna – ooooohhh... look like your broken, fucked-out brood-rat.</i>\"\n\n");
	
	DisplayText("It barely registers – you're too busy cramming inch after inch into the slowly-widening vice in front of you, enthralled by just how much cock-flesh her body can devour.  She's frothing at the mouth, screaming, squeaking, and pounding on the bed.  You push forward a little harder, tugging on the base of her tail for leverage as huge globs of rat-cum rain from the stretched-out snatch onto the sheets.   Another three inches sink into your new cock-sleeve, and she starts to whimper and squeak, reminding you of an old, worn-out chew-toy that your father's dog used to play with.");
	//HUger
	if(x.area >= 200) {
		if(player.stats.cor >= 75) return { next: fuckCinnabarHugerAndCorruptedEr };
		else return { next: cinnabarHuger };
	}
	else return { next: cinnabarHuge };
}
	
//(Huger and Corrupteder) (75+ corr)
private fuckCinnabarHugerAndCorruptedEr():void {
	flags[FlagEnum.CINNABAR_FUCKED_CORRUPT_PREVIOUSLY] = 1;
	let x:number = player.torso.cocks.sort(Cock.LargestCockArea)[0];

	DisplayText().clear();
	DisplaySprite(91);
	DisplayText("You're almost there, so close to your orgasm, but this needy skank's pussy has barely tasted the largeness of your member.  She's wearing out your endurance with her tightness, and if you're going to split her wide, you'll need to pick up the pace.  You grab her thighs, ignoring her tail as it thrashes about, and heave, yanking her dick-dilated cunt along your length with enough force to lift her knees from the mattress.   Cinnabar actually screams from the brutal penetration, her legs spasming nervelessly while her hips are split wide, your fleshy spear absolutely and completely distorting her frail form.");
	if(flags[FlagEnum.CINNABAR_FUCKED_CORRUPT_PREVIOUSLY] > 0) DisplayText("  You're doing it again – turning her into a cum-sleeve without a care for her pleasure, but you don't fucking care.  You're too horny and she's too sexy not to abuse.");
	DisplayText("\n\n");
	
	DisplayText("That one push sent nearly two feet of cock into the violated vermin, and you don't intend to stop until you've buried all " + numToCardinalText(int(player.torso.cocks.get(x).length/12)) + " turgid feet inside her.  Cinnabar feels so light in comparison to your " + Desc.Cock.describeCock(player, x) + ", barely dragging it down at all.  You get a wicked idea and lean back, letting your iron-hard member shift with you, pulling the rust-red rat completely off the bed and into the air.  With nothing to grab on to and no way to reach the ground, her entire weight is supported entirely by the friction of her over-burdened walls, and with how juicy this bitch is, she's already sliding down, accelerating her gravity-fed violation with her unintentionally well-lubricated fuck-hole.\n\n");
	
	DisplayText("\"<i>T-too fast... " + Desc.Gender.mf(player, "Master","Mistress") + ", too fast!  Please go slower... please... ungghhAAAHHH... Godda-ah-aH-AH-AMNIT!</i>\" she protests.\n\n");
	
	DisplayText("She probably should've thought of the repercussions before she dragged you into the sack.  Cinnabar's hips are spread impossibly wide, her legs reduced to useless, vestigial limbs that a cum-sleeve like her won't need, and they get farther apart the further she's impaled upon you.  Even her ass-cheeks have adjusted to her new position; they've spread so far apart that her clenching pucker will always be on display.  Maybe you can give it the same treatment once you've finished destroying her gaped twat.\n\n");
	
	DisplayText("The rat – no, cum-sleeve – gets even tighter, and as you watch, her breasts bulge and jiggle, shifted from the rock-hard post that's pushing through her body.  They look almost tiny in compared to the cylindrical, veiny bulge, like cum-filled bubbles hanging from a moaning furry condom.  Impatient, you snag her ankles and give a hard tug, adding your strength to gravity's inexorable pull.  Warm, pulsating cunt-flesh hugs your ");
	if(!player.torso.cocks.find(Cock.HasSheath)) DisplayText("crotch");
	else DisplayText("sheath");
	DisplayText(", squirting juices from the callous, cunt-piercing thrust.  The " + Desc.Cock.describeCockHead(x) + " of your " + Desc.Cock.describeCock(player, x) + " can be seen just below her neck");
	if(player.torso.cocks.get(x).length >= 60) DisplayText(", and only now do you realize that you're long enough that you should've gone the whole way through her.  Just what kinds of magics is she capable of!?");
	else DisplayText(", and only now do you realize you blew past her cervix long ago, the tight ring hugging your " + Desc.Cock.describeCock(player, x) + " in a clutching embrace.");
	DisplayText("\n\n");
	
	DisplayText("Cinnabar's head looks absurdly tiny, perched as it is above her bloated belly.  She moans, \"<i>F-fucking asshole!  You went t-too f-ah-ahhh-st...</i>\"  Her voice trails off as her eyes narrow.  Somehow, even with her broken body, she's managed to get it together enough to yell at you.\n\n");
	
	DisplayText("\"<i>Fuck you!  You can't wait to get inside and then you sit there smirking?  Fuck that.  If you won't fill me right, I'll make you!</i>\" screams the red rat.  Her already-crimson eyes glow with eldritch light and her hand lifts, radiating with the same unholy power.  Cinnabar's hand punches through one of the mirrors on the wall, disappearing for the tiniest fraction of a second before punching through the ring of your " + Desc.Butt.describeButthole(character.torso.butt) + ", HARD.  You scream, completely and utterly violated, just like Cinnabar.");
	Mod.Butt.displayStretchButt(player, 30,true,true,false);
	DisplayText("\n\n");
	
	DisplayText("She twists her fist inside you and reaches up to palm the tender lump of your prostate as she says, \"<i>Payback's a bitch.</i>\"  Her eyes flare, the magic exploding inside you, worming through your prostate and into your mind.  ");
	if(player.stats.int >= 50) DisplayText("You dimly register it as an arousal spell, but you were already on edge, and your poor prostate is practically wringing itself dry in an effort to cum.");
	else DisplayText("It's too much for your utterly encapsulated member and violated anus, and your poor prostate practically wrings itself dry as it tries to unload.");
	DisplayText("  A half-second later your " + Desc.Cock.describeCock(player, x) + " joins it, your internal muscles clenching and convulsing, heaving the jizz from your body in one huge, gooey blast.\n\n");
	
	DisplayText("Cinnabar pulls her dirty paw out and grins like a mouse with a chunk of cheese, massaging her distorting neck while you empty every ounce of cum from your " + Desc.Balls.describeBalls(true, true, player) + " into her over-stretched womb-filled body.  She squeaks, \"<i>No-ohhhh-ormally I LIKE being a mewling slut for " + Desc.Gender.mf(player, "studs","bitches") + " like you, but if you won't treat a cum-sleeve like me with respect, then I'm going to teach it to you.</i>\"  You nod dumbly, still locked in an climax that ");
	if(player.cumQ() < 250) DisplayText("makes your body churn well after you're empty.");
	else if(player.cumQ() < 500) DisplayText("causes her hugely-stretched lips to glaze white.");
	else if(player.cumQ() < 1000) DisplayText("causes her lips to glaze and her belly to bloat.");
	else if(player.cumQ() < 1500) DisplayText("makes her look pregnant and vents a puddle of syrupy-spooge on top of you.");
	else DisplayText("makes her look like a hugely-pregnant fuck-beast and dumps cum everywhere.");
	DisplayText("\n\n");
	
	DisplayText("The now-dominant, living onahole squeals with pleasure, yammering incessant, half-thought pleasure-words as she gets off.  \"<i>Fu-fu... cum... somuchcum... ohhh gods yes... stuff my broken cunt! More!  Gimme more!  I want to feel it – no, I want to bubble with it, be it.  I want to be so full of cum... YES! OoooooooooooooOOOO – sssqeeEAAAAAAAAAAAK!</i>\"\n\n");
	
	DisplayText("You collapse under her, still twitching weakly while her magic courses through your veins.  Somehow your " + Desc.Balls.describeBalls(true, true, player) + " are still twitching, but it's a painful, empty feeling, and you just want it to end.  You groan, nearly crying while your abused shaft is milked by orgasm-fueled rat-cunt contractions.  It makes you delirious and light-headed, and after a seeming eternity of torture, your brain shuts down, unable to cope with it anymore.\n\n");
	
	DisplayText("<b>Some time later...</b>\n");
	DisplayText("Cinnabar slaps you hard, stirring you from your unnatural slumber.  You look up at her, blinking dumbly for a moment.  Her lips press against yours, crushing them with the force of her passion.  The rodent's soft, padded hands continue hitting you, slapping your face, boxing your ears, and smacking lamely into your chest.  Yet throughout the beating she's tonguing your mouth, groaning into your lips and smearing herself over your still-huge cock.  At last the rat seems satisfied, and she pulls of you with a panting, confused-looking smirk on her face.\n\n");
	
	DisplayText("You sit up, completely and totally awake thanks to your abusive lover, who's just smirking at you.  \"<i>Goddamn you, you huge-cocked " + Desc.Gender.mf(player, "stud","fucker") + ".  I'm STILL sore, but Marae's tits, did you ever get me off!  Don't get the wrong impression, it hurt like a BITCH.  I pity the girls you meet who can't stretch themselves like I can.  I truly do.  If you try that shit with me again, I'll give you another lesson in empathy – I hope you don't forget this one.</i>\"\n\n");
		
	DisplayText("Cinnabar tosses your " + player.inventory.equipment.armor.displayName + " and you realize the nude rat doesn't show any signs of your tryst");
	if(player.cumQ() >= 500) DisplayText(", save for her pregnant belly and ");
	else DisplayText(", save for her ");
	DisplayText("huge, slightly parted pussy-lips.  Chances are she'll have those back to normal before long anyway.  You get dressed and turn to leave, but before you do a tail taps your shoulder, the length curling to squeeze your neck.  It stops you cold while the hooker's voice whispers, \"<i>Don't wait too long to come back.</i>\"\n\n");
	
	DisplayText("Once she lets you go, you leave, and you find yourself mulling over her statement about empathy for some time.");
	//(-2 corruption!)
	player.orgasm();
	player.stats.sens += 3;
player.stats.cor += -2;
	player.takeDamage(25);
	return { next: Scenes.camp.returnToCampUseOneHour };
}

//(HUGER)
private cinnabarHuger():void {
	flags[FlagEnum.CINNABAR_FUCKED_CORRUPT_PREVIOUSLY] = 0;
	let x:number = player.torso.cocks.sort(Cock.LargestCockArea)[0];

	DisplayText().clear();
	DisplaySprite(91);
	
	DisplayText("You're almost there, so close to your orgasm, but you've got so much more cock to bury inside this flexible, stretched-out pussy, and you're determined to bury every last inch of your improbably-large prick inside her before you blast your load.  At this rate, you'll be pushing in all day, so you decide to speed things up.  You grab her by the haunches, feeling your fingers sink into her silky fur, and you pull her back, flexing your biceps as you yank her down with all your might.  She slides down fast, taking a foot of cock in seconds, fast enough to make her belly bulge out in a distinctly dick-like manner.\n\n");
	
	DisplayText("The rest of you sinks in, plowing through her surprisingly spongy cervix to violate the very core of her womb.  It pushes out far enough that she looks like a ruddy cock-sleeve, with two bouncing tits hanging off your " + Desc.Cock.describeCockHead(x) + ".  Incredibly, Cinnabar doesn't seem to mind that her body is being stretched in impossible ways, distended completely beyond the limits of reason.  Instead, she starts murmering, \"<i>Oooh yeah, feel how fucking tight my womb is.  Can't you feel my cervix clamping down, squeezing tight like a cock-ring you couldn't get the whole way down?  ..hahahaha I'm broken aren't I?  Look at me, I'm your furry condom.  My pussy's completely broken... I'm so gaped I'll never walk right again, and I can - I can jerk you off through my belly and womb!</i>\"\n\n");
	
	DisplayText("True to her words, she starts squeezing you through her fur, massaging your " + Desc.Cock.describeCock(player, x) + " by dragging her stretchy puss along your length with her fingertips.  It's too much, her body is fucking perfect for your " + Desc.Cock.describeCock(player, x) + ", and you feel warmth building inside you.  Her tail twists around your ");
	if(player.torso.balls.quantity > 0) DisplayText(Desc.Balls.describeBalls(true, true, player));
	else DisplayText("base");
	DisplayText(" to prod at your " + Desc.Butt.describeButthole(character.torso.butt) + ", sliding in to push your prostate.  She hits it hard enough to make you pump cum with enough force to distort her already-ballooned body, and you go into an orgasmic frenzy, dragging your " + Desc.Cock.describeCock(player, x) + " back to her entrance before jamming in all ");
	if(player.torso.cocks.get(x).length < 24) DisplayText(numToCardinalText(Math.round(player.torso.cocks.get(x).length)) + " inches");
	else DisplayText(numToCardinalText(Math.round(player.torso.cocks.get(x).length/12)) + " feet");
	DisplayText(" all over again.");
	if(player.torso.cocks.get(x).length >= 60) DisplayText("  There's no way this should be possible, but it's happening and you couldn't be happier.");
	DisplayText("\n\n");
	
	DisplayText("Her body is squirming, writhing from the complete and total dick-domination.  You push her hands off your " + Desc.Cock.describeCock(player, x) + ", and jack yourself off while you cum inside her, watching with fascination as each blast bulges her belly before it vanishes inside her with a wet slosh.  Her huge, stretched lips leak like a sieve, splattering girlcum everywhere while your " + Desc.Balls.describeBalls(true, true, player) + " pack");
	if(player.torso.balls.quantity === 0) DisplayText("s");
	DisplayText(" her with goo, claiming her ruined body.  Cinnabar pants and screams in between pleasure-squeaks, \"<i>F-fuck... fuck your fuck-toy!  Stuff her cunt... YES!  S-slut is so fucked... Cum, " + Desc.Gender.mf(player, "master","mistress") + ", then toss slut aside l-l-like a discarded, broken toy.  YOU'VE RUINED ME " + Desc.Gender.mf(player, "MASTER","MISTRESS") + "!</i>\"\n\n");
	
	DisplayText("Those wonderful, perverse words milk your " + Desc.Balls.describeBalls(true, true, player) + " dry as effectively as her massively-gaped cunt and broken body, but you keep pumping until you're sore and completely emptied.  ");
	if(player.cumQ() >= 500) {
		DisplayText("The rat-girl has gained a nice ");
		if(player.cumQ() < 1000) DisplayText("spooge-paunch from all the cum.");
		else if(player.cumQ() < 1500) DisplayText("spooge-packed belly from all the cum.");
		else DisplayText("spooge-pregnancy from all the cum.  It swings underneath her, making her look ready to birth.");
		DisplayText("  ");
	}
	DisplayText("Cinnabar goes limp, but speared as she is, her near-unconscious body just hangs on you like a sock for your cock.  You shift position, and gently slide her off, shivering from how tightly her interior grips you as she's peeled off.\n\n");
	
	DisplayText("At last, your " + Desc.Cock.describeCockHead(x) + " pops from her pussy, showing just how completely you've worked over her body.  Her hips are stretched damn near a foot apart, and you can see deep enough inside her ");
	if(player.torso.cocks.get(x).length >= 60) DisplayText("that it should be sticking up past her head, yet somehow isn't.");
	else DisplayText("to know that she must be some kind of magical to take a fucking like that without damage.");
	DisplayText("  Starting from her abused cervix, Cinnabar's pussy slowly begins to change, narrowing until it closes off your view of her womb.  The whole canal draws closed in one long motion that squeezes fuck-juices all over the bed, and then you hear her hips pop back into place.\n\n");
	
	DisplayText("\"<i>What, you think I'd hunt down " + Desc.Gender.mf(player, "studs","breeders") + " like you to fuck if I couldn't handle a little stretching every now and again?  Oh don't look at me like that – I'm going to be sore for hours, but I fucking loved it.  Your cock... it's fucking special, and if you EVER want to feel another full-body fuck, come back and see me,</i>\" says Cinnabar as she smiles up at you from her bed.\n\n");
	
	DisplayText("You smile back and go get dressed; it's way past time you checked on your campsite.  As you open the door, you can hear Cinnabar humming happily and trying to clean all the mess from her sheets");
	if(player.cumQ() >= 1000) DisplayText(", the sloshing in her belly still quite audible");
	DisplayText(".");
	player.orgasm();
	player.stats.sens += -4;
	return { next: Scenes.camp.returnToCampUseOneHour };
}

//(HUGE)
private cinnabarHuge():void {
	flags[FlagEnum.CINNABAR_FUCKED_CORRUPT_PREVIOUSLY] = 0;
	let x:number = player.torso.cocks.sort(Cock.LargestCockArea)[0];

	DisplayText().clear();
	DisplaySprite(91);
	DisplayText("You're almost there, and though you can feel the burgeoning warmth growing underneath your " + Desc.Cock.describeCock(player, x) + ", you're determined to push the whole way inside her before you blow.  Cinnabar crams her muzzle through a particularly large mirror and locks onto your lips, ramming her tongue deeper into your throat, pushing harder with each inch of tightly-packed cock you shove inside her.  At last you bottom out, your " + Desc.Cock.describeCockHead(x) + " bumps the tight ring of her cervix while her tail pulls tight about your ");
	if(player.torso.balls.quantity > 0) DisplayText(Desc.Balls.describeBalls(true, true, player));
	else if(player.torso.cocks.find(Cock.HasSheath)) DisplayText("sheath");
	else DisplayText("base");
	DisplayText(".\n\n");
	
	DisplayText("The kiss is broken abruptly, the suddenly invigorated rat-girl's lips pressing close to your ear as she murmurs, \"<i>Oh yes... feel how tight my poor, abused cunt is... so very tight, clutching you like a swimsuit two sizes too small... Mmm, I can feel you twitching; are you going to cum in this slut's womb?  You've fucked me so hard, gaped me and ruined me... will you finish me off?  Do it " + Desc.Gender.mf(player, "stud","bitch") + ", fuck this horny slut's womb full, mark her as your bitch - no, your fucking property!</i>\"\n\n");
	
	DisplayText("Gods, she's so fucking perverse, and she's squeezing you so tight; fuck, even her tail is working you.  It twists around your ");
	if(player.torso.balls.quantity > 0) DisplayText(Desc.Balls.describeBalls(true, true, player));
	else if(player.torso.cocks.find(Cock.HasSheath)) DisplayText("sheath");
	else DisplayText("shaft");
	DisplayText(" to prod at your " + Desc.Butt.describeButthole(character.torso.butt) + ", sliding in to push your prostate, pressing on it hard enough to make you pump a jet of cum past the rat's relaxing cervix and into her womb.  You go into an orgasmic frenzy, utterly, completely dominating the size-queen with your massive, cum-bloated fuck-stick.  Her ass shakes and wobbles as you pull back roughly, dragging your cock through that over-tightened velvet cunt-sleeve, but before you can slip out, you push back in, fucking her hard enough to make a loud slap from your hips slamming into one another.\n\n");
	
	DisplayText("Her juices fall like rain, soaking the sheets, ");
	if(player.torso.balls.quantity > 0) DisplayText("your balls, ");
	DisplayText("your " + Desc.Leg.describeLegs(player) + ", and ");
	if(!player.torso.cocks.find(Cock.HasSheath)) DisplayText("the base of your twitching cock");
	else DisplayText("your twitching cock-sheath");
	DisplayText(".  You rub your hand over her belly, feeling your " + Desc.Cock.describeCockHead(x) + " through her distended, dick-dominated fur.  Each fiery, pumping load of cum boils underneath the rat's fur, bubbling between your fingers as it sloshes into her womb.  Cinnabar is thrashing, squeaking and crying, though it's quite clear her tears are tears of joy.  She gasps, \"<i>So big");
	if(player.cumQ() >= 1000) DisplayText(" and so much");
	DisplayText("... YES!  CLAIM ME!  I'm yours... your cock-addicted, stretched-out fucktoy!  More... more!</i>\"\n\n");
	
	DisplayText("You don't hold back, and you fuck her raw, jerking yourself off through her stretched hide until your ");
	if(player.torso.balls.quantity === 0) DisplayText("prostate has been squeezed dry.");
	else DisplayText(Desc.Balls.describeBalls(true, true, player) + " feel sore and empty, completely drained.");
	if(player.cumQ() > 500) {
		DisplayText("  The rat-girl has gained a nice, ");
		if(player.cumQ() < 1000) DisplayText("jiggling spooge-paunch from all the cum.");
		else if(player.cumQ() < 1500) DisplayText("spooge-packed belly from all the cum.");
		else DisplayText("spooge-pregnancy from all the cum.  It swings underneath her, making her look ready to birth.");
	}
	DisplayText("  Cinnabar slumps into her pussy-stained sheets, her silky fur turning into a cum-matted mess as she starts to slide into her pillows.  You grab hold of her haunches and slow her descent, sighing with bliss as you feel the abused fuck-tunnel tremble and squirm with involuntary pleasure-contractions.\n\n");
	
	DisplayText("The rat's black, brutalized lips pop off of your " + Desc.Cock.describeCockHead(x) + " at last, and you're given the first chance to observe your handiwork.  You can see deep inside her, all the way to her still-quivering, jism-leaking cervix.  Cinnabar grunts and sighs dreamily, and you watch in awe as all that damage, that brutal, hard fucking, begins to disappear.  Starting deep inside her, the walls begin to close up, moving like a wave towards her entrance.  The rippling, tightening motion reaches her lips, and they fold closed, returning to their original appearance, save for the thick coat of sperm and fuck-me-juice the rat's still leaking.\n\n");
	
	DisplayText("Cinnabar looks at you over her shoulder and says, \"<i>What, you think I'd be taking " + Desc.Gender.mf(player, "studs","breeders") + " like you if I couldn't really handle it?  Don't worry babe... I loved it.  You can come stretch me ANY time so long as you're hung like that!</i>\"  You smile – what a fuck – and go get dressed; it's past time you checked on your campsite.  As you depart, you can hear Cinnabar humming happily and trying to clean the sheets");
	if(player.cumQ() > 500) DisplayText(", the sloshing in her belly still quite audible");
	DisplayText(".");
	player.orgasm();
	player.stats.sens += -3;
	return { next: Scenes.camp.returnToCampUseOneHour };
}

//[Multi Cock Portals] – Requires 2 75+ cock area members and at least 3 total.
//Cinnabar gets the PC in and has them fuck the portals on the wall, 
//setting two mirrors on the bed before she sits on them and fellates one on the wall.
//surprise – at the end she moves the portal when you pull back and makes you cum in her
//and in your own ass.
private cinnabarMultiCockPortalFuckFest():void {
	flags[FlagEnum.CINNABAR_HOUSE_VISITED]++;
	flags[FlagEnum.CINNABAR_NUMBER_TIMES_FUCKED]++;
	flags[FlagEnum.CINNABAR_FUCKED_CORRUPT_PREVIOUSLY] = 0;
	DisplayText().clear();
	DisplaySprite(91);
	//x pussy, y butt, z face
	let x:number = player.torso.cocks.sort(Cock.LargestCockArea)[0];
	let y:number = player.biggestCockIndex2();
	let z:number = player.biggestCockIndex3();
	DisplayText("Cinnabar's hands fly through your " + player.inventory.equipment.armor.displayName + ", diving through your undergarments to squeeze " + Desc.Cock.describeMultiCockSimpleOne(player) + ".  ");
	if(player.stats.lust >= 70) DisplayText("She groans when she feels the full, turgid masses in her fingers, shivering as her padded finger-tips become slippery with your dripping pre-cum.");
	else DisplayText("She sighs blissfully when she feels the size and number of your half-hard members, squeezing them with gentle pressure until they start to expand, engulfing her hand.");
	DisplayText("  Your " + Desc.Leg.describeLegs(player) + " go wobbly from the delicate touches dancing through your " + Desc.Cock.describeMultiCockShort(player) + ", making it hard to stand.  Cinnabar slides ");
	if(player.tallness >= 72) DisplayText("under your arm");
	else DisplayText("up against you");
	DisplayText(", supporting you while she asks, \"<i>Do we need to get inside and get these taken care of, big " + Desc.Gender.mf(player, "boy","girl") + "?  Ohhh, that's just too bad.  I think I'll just play with you in the street until you're ready to pop, and then leave you like that until you go soft.  Then we can start over.</i>\"\n\n");
	
	DisplayText("Red, mirthful eyes watch your reaction, the cruel, toothy smile growing broader as she teases you.   You grunt and push back, pulling yourself up straight and inadvertently displaying the huge, many-pronged bulge");
	if(player.stats.lust >= 70) DisplayText(" you have");
	else DisplayText(" she's given you");
	DisplayText(".  She's teasing you, but it's clear she's no dominatrix.  No, she wants you to take charge, and if you're going to get off, you'll need to.  You hook your hand in between her cleavage, feeling the tight, silky embrace of her fur and the gentle, pounding beat of her heart.  It beats faster as soon as you start tugging her, dragging her towards the wagons.  ");
	if(flags[FlagEnum.CINNABAR_HOUSE_VISITED] === 0) DisplayText("She leans, guiding you towards her home even as she lets herself be led.");
	else DisplayText("She blushes hard, her thighs darkening from the fluid racing down them as you pull her towards her house.");
	DisplayText("\n\n");
	
	DisplayText("You pull her to the door, discovering the solid oak portal to be quite securely locked.  Cinnabar starts to slide around you, but before she can complete her first step, you push her against the door and reach under her dress, fingering her sloppy slit while you growl in her ear, \"<i>Unlock it, bitch.</i>\"\n\n");
	
	DisplayText("The rodent's long tail hovers before the lock, shaking uncontrollably while you diddle her poor pussy.  She grinds her plump ass against your groin, shivering each time your bulges press her dampening dress into the pucker of her backdoor.  You laugh in her ear, pulling the puffy, wet lips of her sex wide and penetrating her with your middle finger while you tease her about her inability to even open a door.  A soft click breaks the tension, and before the rat can squirm loose, you push her through the entry, step in, and slam it shut behind you.\n\n");
	
	DisplayText("Cinnabar has already started struggling out of her crimson mini-dress, but as soon as the wet patch hits her nose you see her entire demeanor change.  The material pulls tight to her nose, vacuumed by sudden inhalations.  The rat leans back against the wall, one hand diving to her muff while she grabs her dress and smears it over her face.  Her lewdness triggers a further hardening in your groin, reminding you that you're still crammed inside your " + player.inventory.equipment.armor.displayName + ".  You take it off as quickly as you can and toss it to the side.\n\n");
	
	DisplayText("Loud, horny snorts and squelching noises radiate from Cinnabar, and you reach over to yank her soaked dress from her head.  It slides off with ease, leaving strands of girl-cum to hang over the intervening distance for a few seconds before they collapse on her exposed fur.  She looks up at you, mouth gaping, panting with lust as she asks, \"<i>Can slut have more pussy smell?  Slut is so horny and her holes need plugged with cock for her little fuck-crazy mind to work.</i>\"\n\n");
	
	DisplayText("You slap her face with your " + Desc.Cock.describeCock(player, x) + ", smearing her pussy-juice across her cheek and mixing a bit of your pre-cum into it.  She groans and jumps onto her bed, but before you can close the distance she asks, \"<i>Can slut show " + Desc.Gender.mf(player, "master","mistress") + " her tricks?  She has so many sexy tricks to help " + Desc.Gender.mf(player, "master","mistress") + " fuck her needy, achy fuck-holes.</i>\"\n\n");
	
	DisplayText("She bounces her ample tits in her hands, pink tongue darting over supple lips.  Your eyes lock onto her chest, watching in awe as the rodent's largish orbs start to jiggle more and more with every bounce.  They heave and swell, turning her modest cleavage into a massive canyon, the bulging mammaries oozing over her too-small arms to drag her torso up on top of them.  It almost looks like she's lying down on a pair of soft bean-bag chairs.  Her ass actually hangs up in the air, wiggling to and fro to smear the mirrors lining the walls around the bed with fresh pussy-juice.\n\n");
	
	DisplayText("\"<i>Does " + Desc.Gender.mf(player, "master","mistress") + " like slut's first trick?  Ooooh, yes " + Desc.Gender.mf(player, "he","she") + " does! Look at those behemoths twitching!  Mmmm, I know you'll love this slut's next trick, " + Desc.Gender.mf(player, "master","mistress") + ",</i>\" she says, pointing towards a few dozen mirrors on the far wall.  You drag your tit-mesmerized eyes from her heaving breasts and follow her finger to the reflective circles.  They flicker once, and suddenly images and shapes replace the reflections, showing the slutty, sex-obsessed rat from a myriad of directions.  There's a huge concentration of portals at waist height, and you realize that they're all positioned for you to thread your " + Desc.Cock.describeMultiCockShort(player) + " through.\n\n");
	
	DisplayText("Cinnabar's puffy, drippy lips are pressed tight against the central aperture, bulging through just enough to drool girl-cum down the frame to the floor.  Just above are her puckered asshole and juice-matted ass-cheeks, practically winking at you.  Through another, you can see her panting, drooling tongue and lips.  Finally, all the other crotch-high mirrors are all arranged to point towards the skank's heaving, unnaturally-large fuck-bags.  Even as you watch, her spittle drops onto their curvy, jiggling surface, runnels of spit rolling towards the cushion while the rat works herself into a frenzy of need.\n\n");
	
	DisplayText("\"<i>D-does " + Desc.Gender.mf(player, "master","mistress") + " like?  Ohhhh, fuck this slut " + Desc.Gender.mf(player, "master","mistress") + "... shit, come fuck me!  That fucking breast enlargement spell makes my cunt ache and drool for a big, hard cock.  Plug me " + Desc.Gender.mf(player, "stud","baby") + ", you can fill me so good!  Do it!  FUCK ME NOW!</i>\" she screams, rocking and grinding into the portals, her tongue thrashing wildly while her lips arch into a needy 'o'.\n\n");
	
	DisplayText("Your " + Desc.Hip.describeHips(player) + " rock forwards of their own volition.  There's no way your " + Desc.Cock.describeMultiCockShort(player) + " can resist such a lewd, needy specimen, or the chance to fuck her in so many different ways simultaneously.  First, your " + Desc.Cock.describeCock(player, x) + " hits her swollen pussy, and as you batter your way inside the slippery entrance, her body rewards you with a gush of girl-cum that soaks your manhood and drips over your " + Desc.Cock.describeCock(player, y) + ".  A split-second later that second member is pressing at her anus, forcing through the clenched star in a violent, animalistic thrust.\n\n");
	
	DisplayText("Cinnabar moans, utterly and completely delighted, but you muffle those moans by spearing her throat on your " + Desc.Cock.describeCock(player, z) + ", filling her oral orifice completely.  You reach through a pair of portals at arm height to squeeze her spread ass-cheeks, holding tight while you push forwards to completely bury your three lucky members in furry fuck-sleeves.");
	if(player.torso.cocks.count === 4) DisplayText("  The extra dick dives into the pillowy mounds, smearing a streamer of pre-cum over the tit's surface before it slides into that warm, welcoming cleavage.");
	else if(player.torso.cocks.count > 4) DisplayText("  The extra dicks dive into the pillowy mounds, smearing streamers of pre-cum all over the tits' surfaces before they slide home into that warm, welcoming cleavage.");
	DisplayText("\n\n");
	
	DisplayText("The sensation is absolutely divine, but primal need takes over.  You begin to rock your " +  Desc.Hip.describeHips(player) + " in and out, triple-penetrating the whore");
	if(player.torso.cocks.count >= 4) DisplayText(" while you tit-fuck her swollen breasts");
	DisplayText(".  Slippery-soft warmth wreathes your " + Desc.Cock.describeCock(player, x) + ", the plush black love-tunnel contracting slightly to happily squeeze you every few seconds.  The darker, sinfully tight star of Cinnabar's anus glazes with your pre-cum, her ass-cheeks wobbling perfectly in your hands with each rhythmic penetration.");
	if(player.torso.cocks.count >= 4) {
		DisplayText("  Meanwhile, the soft, downy fur on the rat's chest is starting to mat against her skin, coated with the slick leavings from your " );
		if(player.torso.cocks.count === 4) DisplayText("extra dick");
		else DisplayText("remaining dicks");
		DisplayText(".");
	}
	DisplayText("  The " + Desc.Cock.describeCock(player, z) + " in her mouth feels so good it nearly makes you jump, the long pink tongue licking around it while a wet muzzle buries itself in your crotch.  Gods, it's too much!\n\n");
	
	DisplayText("You feel yourself cumming, that tell-tale warmth in your gut mixing with a few involuntary muscle-contractions that bounce your " + Desc.Cock.describeMultiCockShort(player) + " inside Cinnabar.  You turn your head to watch her, " + numToCardinalText(player.torso.cocks.count) + " penises pumping from holes in the wall to ravage her body completely and totally, her eyes rolled back in complete bliss.   Heat blooms in your " + Desc.Cock.describeMultiCockShort(player) + ", the pumping gouts of seed deep into all of the slut's holes simultaneously.  She screams into your " + Desc.Cock.describeCock(player, z) + ", vibrations making your orgasm that much stronger.  It drags on and on, the spit-roasted rat shaking while she's completely taken in every way");
	if(player.torso.cocks.count >= 4) DisplayText(", her tits shining white from all the spooge you dump on to them");
	DisplayText(".\n\n");
	
	//(Medium-high cum production)
	if(player.cumQ() >= 500 && player.cumQ() < 1000) {
		DisplayText("Cinnabar's belly gurgles, her gut and womb packing with enough spunk to make her belly wobble slightly while you empty inside her.  Semen froths on her lips while she works to swallow it all.  It just adds to her already-impressive paunch.");
		if(player.torso.cocks.count >= 4) DisplayText("  The rat's tits are completely white, spooge leaking off her nipples like some kind of thick, sticky milk.");
		DisplayText("  You finish filling her with cream and hold your place long enough to admire your work from across the room.\n\n");
	}
	//(High cum production)
	else if(player.cumQ() >= 1000) {
		DisplayText("Cinnabar's belly gurgles, the skin pulling tight from all the seed you're pumping into her womb, gut, and belly.  She looks positively pregnant, and she even begins to slosh from each fresh deposit that you leave inside her.  The rat's eyes look up at you through a portal.  They're lidded with a mix of lust and pleasure, but your gaze goes lower to watch spooge bubble from her nose while her overtaxed throat fails to keep up with your heavy spunk-streams.");
		if(player.cumQ() >= 1500) DisplayText("  Best of all, her bed is completely soaked in the stuff, and she wallows in it like a pig in mud, her cleavage absolutely drenched with cum.");
		DisplayText("\n\n");
	}
	
	DisplayText("The slut-rat gargles in irritation around your sensitive, cummed-out cock, clearly displeased that you're still inside her.  You step back from the wall, your " + Desc.Leg.describeLegs(player) + " giving out from the sensory overload of unsheathing your " + Desc.Cock.describeMultiCockShort(player) + " simultaneously to drop you flat on your " + Desc.Butt.describeButt(player) + ".  At the same time, Cinnabar starts coughing and groaning, clearly exhausted from the one-" + Desc.Gender.mf(player, "man","woman") + " gangbang.  You understand how that feels; just touching " + Desc.Cock.describeMultiCockSimpleOne(player) + " makes your head swoon.\n\n");
	
	DisplayText("An incessant licking reaches your ears, getting your attention.  You stand up, careful about your " + Desc.Cock.describeMultiCockShort(player) + " while you look towards the bed.  The portals are closed down, and Cinnabar is bent double, folded in half like a contortionist");
	if(player.cumQ() >= 1000) DisplayText(" while her huge, cum-filled belly bulges out to the sides");
	DisplayText(".  Her long, pink tongue is lashing over her swollen, black cunt-lips, hungrily cleaning the dirty twat and even licking at her asshole.  It's almost enough to get you hard again, but she eventually breaks from her auto-cunnilingus long enough to glance your way.\n\n");
	
	DisplayText("\"<i>You're still here?  Go on, I've got a lot of cleaning up to do before my next customer!</i>\" grunts Cinnabar before returning to her task.  You run your hand through your " + Desc.Head.describeHair(player) + ", exasperated, but quite satisfied.  You'll definitely have to visit her again sometime.\n\n");
	
	DisplayText("While you're getting dressed, the repeated slurps and moans pause enough for Cinnabar to say, \"<i>I didn't mean to be rude... those dicks... those wonderful, plump cocks... they're a gift.  Come back soon " + Desc.Gender.mf(player, "stud","baby") + ", your cream filling tastes gooood.</i>\"  She goes back to licking herself, and you can't help but have a huge grin as you walk out.");
	player.orgasm();
	player.stats.sens += -6;
	return { next: Scenes.camp.returnToCampUseOneHour };
}
}
}