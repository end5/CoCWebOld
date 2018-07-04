package classes.Scenes.Places.Bazaar{
	import classes.GlobalFlags.FlagEnum;
	import classes.PregnancyType;

	public class Lilium extends BazaarAbstractContent{

	public Lilium()
	{
	}

//I dunno about the term 'satanic streetwalker', and it
//probably needs to increment your corruption if you're fucking
//a proper demon. -Z

//Notes: Requires just a penis, penis and long demonic tongue 
//or a vagina. There's a couple of small conditionals to stop 
//references to legs for nagas so it's ok for them, but it 
//doesn't really make sense for centaurs.

//Vars:
//267 Times Bought Smexin'

//#########AREA TEXT#########
public LiliumText(output:boolean = false):Function {
	if(output) {
		//Before paying:
		if(Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00267] === 0) DisplayText("\n\nYou can see a pale, scantily clad demon woman leaning casually against the wall of a building.");
		//After paying:
		else DisplayText("\n\nYou can see Lilium standing in her usual spot.");
	}
	if(model.time.hours >= 17) return approachLilium;
	return null;
}

private approachLilium():void {
	DisplayText().clear();
	DisplaySprite(93);
	let pay:Function = null;
	//#########FIRST TIME INTRODUCTION#########
	if(Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00267] === 0) {
		DisplayText("As you approach the demon woman, her gaze shifts to you, and she runs her eyes down your body, scrutinizing you.  You respond in kind, taking in her form.  Two nearly foot-long horns grow up and out of her forehead, one of which is adorned with a shiny, silver band.  Her dark hair spills across her bare shoulders in loose coils and her black lipstick and heavy eyeshadow contrast with the paleness of her skin.  A black underbust corset wraps around her waist, leaving her breasts exposed, and long black gloves adorn her arms up to the shoulder.  She also wears a crinoline skirt with an opening at the front which reveals her smooth bare legs, a tail which wraps around her thigh like a garter, and her crotch, which sports an average cock curiously clad in a lacy sock in spite of her otherwise brazen exposure.\n\n");

		DisplayText("Her assessment of you seems to be positive, as a smile crosses her face and she says, \"<i>You look like you've got more than a few gems to rub together; looking for a little fun?</i>\"\n\n");

		DisplayText("Of <i>course</i> that would be why she's standing there dressed like that.\n\n");

		DisplayText("\"<i>200 gems and I'm all yours,</i>\" she continues, sweeping her arms out wide for emphasis.\n\n");
	}
	//#########REPEAT INTRODUCTION#########
	else {
		DisplayText("Lilium stands before you.  Her two nearly foot-long horns grow up and out of her forehead, one of which is adorned with a shiny, silver band.  Her dark hair spills across her bare shoulders in loose coils and her black lipstick and heavy eyeshadow contrast with the paleness of her skin.  A black underbust corset wraps around her waist, leaving her breasts exposed and long black gloves cling to her arms up to her shoulders.  She also wears a crinoline skirt with an opening at the front which reveals her smooth bare legs, a tail which wraps around her thigh like a garter, and her crotch which sports her average cock curiously clad in her lacy cock sock in spite of her otherwise brazen exposure.\n\n");

		DisplayText("\"<i>Back again?  I thought I was finally rid of you!</i>\"  Lilium teases, but you can see the eager smile on her face.  \"<i>Is this visit business or pleasure?  I'm hoping both.</i>\"\n\n");
	}
	if(player.inventory.gems < 200) DisplayText("<b>You remember that you haven't got the 200 gems for her services right now.  Maybe next time.</b>");
	else pay = payForLilium;
	MainScreen.simpleChoices(["Pay", "", "", "", "Leave"], [pay, null, null, null, leaveLilium]);
}


private payForLilium():void {
	DisplayText().clear();
	DisplaySprite(93);
	//#########GENDERLESS SCENE######### REQUIRES unsexed (hah)
	if(player.gender === Gender.NONE) {
		DisplayText("You follow Lilium to a secluded spot. With a grin on her face she squats before you and helps you remove your " + player.inventory.equipment.armor.displayName + ".  The grin is quickly replaced by a look of surprise and confusion as she looks at your flat, featureless crotch.\n\n");

		DisplayText("She looks up at you and then back at your groin a few times before scratching her head and crossing her arms.  \"<i>Well,</i>\" she begins, breaking the awkward silence.  \"<i>That's not something you see every day.  Did you get in an accident or something?  I mean, I've seen people with missing parts before, but...</i>\"  The woman trails off as she lightly prods your bare mons with one gloved finger.  \"<i>Actually, you know what?  I really don't think I want to know what could have done this to you.</i>\" With that she stands back up, grabs one of your arms and drops the small pouch of gems containing your payment to her back in your hand.\n\n");

		DisplayText("\"<i>Look, I'm sorry, but I can't really do anything for you right now.  If your, uh, situation changes, come see me again.</i>\"  Lilium then walks off, leaving you alone and naked.\n\n");

		DisplayText("Bummer.");
		return { next: bazaar.enterTheBazaar };
		return;
	}
	//First time - Pay: 
	if(Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00267] === 0) {
		DisplayText("\"<i>Sounds good,</i>\" you answer while fishing for your gem stash.\n\n");
	
		DisplayText("\"<i>I'm Lilium, by the way,</i>\" she states, as you give the woman your name and your payment in return.\n\n");
	
		//(If player name is also Lilium)
		if(player.short === "Lilium") DisplayText("\"<i>No way!</i>\" she cries upon learning of your identical name.  \"<i>Well... I hope you're not going to ask me to scream your name during sex.  That might be a bit awkward.</i>\"\n\nHow do you want to have the whore?\n\n");
		
		DisplayText("What will you do with her?");
	}
	else {
		DisplayText("You toss the gems to the hooker and while she counts them, you wonder just what you want her to do this time.");
	}	
	Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00267]++;
	player.inventory.gems -= 200;
	statScreenRefresh();
	//Sex Menu here
	let buttFuck:Function = null;
	let nippleFuck:Function = null;
	let rideHer:Function = null;
	if(player.torso.cocks.count > 0 && player.torso.neck.head.face.tongue.type >= TongueType.DEMONIC) buttFuck = buttFuckTongueJeorb;
	if(player.torso.cocks.count > 0) nippleFuck = liliumNippleFuck;
	if(player.torso.vaginas.count > 0) rideHer = liliumDickRidah;
	simpleChoices("Buttfuck", buttFuck, "Ride Her", rideHer, "Nipple-Fuck", nippleFuck, "", null, "", null);
}

//- Leave:
private leaveLilium():void {
	DisplayText().clear();
	DisplaySprite(93);
	if(Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00267] === 0) DisplayText("\"<i>I'm deathly allergic to fun, unfortunately,</i>\" you reply before moving on to examine more of the bazaar.");
	else DisplayText("\"<i>Just passing through, and I thought I'd see how you were doing,</i>\" you reply, and leave Lilium alone at her post.");
	return { next: bazaar.enterTheBazaar };
}

//#########BUTTFUCK + TONGUEJOB SCENE######### REQUIRES PENIS AND LONG DEMONIC TONGUE
private buttFuckTongueJeorb():void {
	DisplayText().clear();
	DisplaySprite(93);
	let x:number = player.cockThatFits(40);
	if(x < 0) x = 0;
	DisplayText("The two of you find a secluded alley between two buildings.  Lilium removes her corset and skirt before moving to help you remove your " + player.inventory.equipment.armor.displayName + ".\n\n");
	
	DisplayText("Squatting before you, she traces a single gloved finger along the underside of your " + Desc.Cock.describeCock(player, x) + ", teasing it until it grows to its full " + Math.round(player.torso.cocks.get(x).length) + "-inch length.  Once your maleness has sprung to life, she turns around and bends over to brace herself against the wall before looking back over her shoulder at you mischievously and giving her hips a little wiggle.  Taking position behind her, you slide your " + Desc.Cock.describeCock(player, x) + " between her soft thighs.");
	//(If player cock length > 8 inches)
	if(player.torso.cocks.get(x).length > 8) DisplayText("  You can feel Lilium's smaller cock resting atop your " + Desc.Cock.describeCock(player, x) + ".");
	DisplayText("  With each thrust you can feel more and more feminine lube coating your shaft as you glide across Lilium's labia, her dick stiffening with arousal.\n\n");

	DisplayText("One last time, you slowly draw your " + Desc.Cock.describeCock(player, x) + " from between her thighs and let it flop against her lower back, your hands moving from Lilium's hips to her pearlescent ass cheeks.  Spreading her wide, you let your " + Desc.Cock.describeCock(player, x) + " gradually inch down the cleft between them until the head rests against her back entrance.  With an agonizing slowness you begin to push.  The faintest gasps escape Lilium's lips as her ass finally envelops the head of your cock, followed by a squeak of surprise as you suddenly drive the remaining length in; the force of your " + Desc.Hip.describeHips(player) + " meeting her ass pushes her entirely up against the wall.\n\n");
	
	DisplayText("Your lips part slightly as you let your tongue begin to extend.  It journeys around Lilium's trim waist and down across her taut tummy until it finds its target: her turgid penis.  Your long tongue wraps around her shaft tightly and as its tip meets her tip you can taste the pre-cum leaking through her perfumed cock sock.  You begin to massage the unholy herm's cock by flexing your tongue as you speed up your thrusts into her round ass.\n\n");
	
	DisplayText("You establish a rhythm of pleasuring Lilium from both sides; thrust in, flex tongue, pull out, release and soon she begins pushing her hips back in time to meet you on every thrust.");
	//(If player has breasts)
	if(player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1) {
		DisplayText("  A tingle emanates from your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + "s as your " + Desc.Breast.describeAllBreasts(player) + " slide across her sweat-slicked back with every thrust.");
		//(If player has a lot of milk)
		if(player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 1) DisplayText("  The stream of milk that leaves your breasts each time you press your body against Lilium's adds further lubrication between you.");
	}
	DisplayText("\n\n");
	
	DisplayText("The pace of Lilium's breathing quickens and soon she begins to shudder as her cock throbs within your tongue's grasp.  Jets of the satanic streetwalker's cum shoot out against the tip of the sock and she lets out a moan of contentment.  Her internal muscles clench down on your shaft as she ejaculates, causing a wave of goose bumps to cover your body which signals your own impending orgasm.  Your knees buckle and tongue loses its grip on her sock; the wet fabric flies off her cock with her next spurt, hitting the ground with a tiny 'plap'.  The tingling across your body focuses itself in on the base of your " + Desc.Cock.describeCock(player, x) + ", and you grab the root of Lilium's demonic tail for more leverage, pulling her roughly against you as you grunt loudly, the proof of your pleasure exploding into her bubble butt.  This final thrust forces an extra gout of cum from her cock, which then leaks down its tongue prison, giving you a last taste of her fluids.\n\n");

	DisplayText("Panting, Lilium grabs your hands and moves them around her waist, holding them against her stomach.  ");
	//(If naga body)
	if(player.torso.hips.legs.isNaga()) DisplayText("As you both stand there, reeling in the wake of your ecstasy, she leans back against you causing you to flop onto your " + Desc.Butt.describeButt(player) + " with the demon girl on top of you; you haven't the strength to remain standing.");
	//(else) 
	else DisplayText("As you both stand there, reeling in the wake of your ecstasy, she leans back against you causing you to flop onto your " + Desc.Butt.describeButt(player) + " with the demon girl on top of you; your wobbling legs have temporarily lost the strength to keep you both upright.");
	DisplayText("  Lilium lets out a laugh and soon you find yourself laughing with her.\n\n");
	
	DisplayText("After you both recover, you get up to don your " + player.inventory.equipment.armor.displayName + ", thanking Lilium and beginning the trip back to camp.  Maybe you'll take a bath too...");
	
	player.orgasm();
	player.stats.cor += 1;
	return { next: Scenes.camp.returnToCampUseOneHour };
}

//#########DICK RIDE SCENE######### REQUIRES VAGINA
private liliumDickRidah():void {
	DisplayText().clear();
	DisplaySprite(93);
	DisplayText("Lilium takes you to a secluded spot away from the Bazaar.  She removes her corset and skirt and slips the lacy cock sock off her cock and you eagerly remove your own " + player.inventory.equipment.armor.displayName + ".\n\n");

	DisplayText("You gently push Lilium down onto her back and straddle her waist.  As she looks up at you with a demure expression you move your hands to her pert breasts and begin a slow circular massage of her chest.  With each pass you ever so slightly lighten your grip and move your fingers closer to her nipples until finally you are lightly trailing your index fingers around their rosy tips.  You can see Lilium's eyes close as she enjoys your touch on her body.  Gently you slip just the very tip of one finger into each of her fuckable nips and the woman beneath you arches her back, seeking to force your fingers into her heaving breasts further.  With a grin you tear your fingers away from her breasts and Lilium's eyes snap open and a look of disappointment crosses her face.  Quickly you lean down and plant a kiss on her dark, pouting lips, letting your tongue slip between them just the slightest bit to taste her.\n\n");

	DisplayText("Slowly you begin moving down Lilium's body.  You leave a trail of kisses down her neck before running your tongue along her collar bone.  Further down you go, letting your lips gently slide down the center of the demon herm's chest until you reach her navel.  ");
	//(if player has long hair)
	if(player.torso.neck.head.hair.length >= 15) DisplayText("You can feel Lilium shudder slightly beneath you as your hair tickles her nipples.  ");
	DisplayText("First you begin to circle her navel with the tip of your tongue, following up with long licks beginning at the base of her belly and trailing up and into her belly button. Lilium's breathing begins to quicken and her hips start to dart back and forth beneath you as you continue to tongue her navel. As you become more conscious of the hardened cock poking into your own chest you draw your head back, leaving a long shiny strand of saliva that joins your mouth to her smooth tummy.\n\n");

	DisplayText("You draw yourself up and position yourself above Lilium's twitching cock.  Your fingers part the lips of your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + " which are slick with your own arousal.  ");
	//(If virgin/tight)
	if(player.vaginalCapacity() < 25) DisplayText("Gingerly you lower yourself down onto Lilium's cock, your breath tight in your chest as the head strains against your moist inner walls.  Each inch is easier than the last and soon you release a long slow exhale as your crotch meets hers and the pleasurable feeling of fullness washes over you.  ");
	//(if loose or produce lots of lube)
	else DisplayText("Without a second thought you plunge yourself down on Lilium's fuckrod, your " + Desc.Butt.describeButt(player) + " jiggling from the sudden impact.  ");
	DisplayText("You pull yourself up until only the head of the demon girl's dick remains within you, before sliding back down to let her fill you again.  Up and down you bounce on top of her, your speed and force increasing with every stroke.  You let out a contented half moan, half grunt each time your " + Desc.Hip.describeHips(player) + " collide with hers as her stiff cock stimulates your insides.  Lilium's own search for more pleasure brings her hands to her breasts and she begins to finger-fuck her nipples.  Before long she has two and then three fingers furiously plunging in and out of her gaping nipplecunts and you can see her eyes rolled back in her head as her mouth hangs open in testament to the excitement flowing through her body.");
	Mod.Vagina.displayStretchVagina(player, 14,true,true,false);
	DisplayText("\n\n");

	//(if player has breasts)
	if(player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1) {
		DisplayText("You turn your attention to your own " + Desc.Breast.describeAllBreasts(player) + " and how they bounce from the force of your vigorous fucking, supporting the weight of your " + Desc.Breast.describeBreastRow(player.torso.chest.get(0)) + " with your hands as you continue to ride Lilium's cock.");
		//(if demonic tongue)
		if(player.torso.neck.head.face.tongue.type === TongueType.DEMONIC) DisplayText("  Letting your demonic tongue extend out from between your lips, you wrap it around one " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + " and gently squeeze, sending an electric thrill that flows to your core and back out to the tips of your fingers.");
		//(else if no demonic tongue)
		else DisplayText("  You begin to squeeze your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + " between two fingers, sending an electric thrill that flows to your core and back out to the tips of your fingers.");
		//(if lactating a little)
		if(player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier >= 1 && player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier <= 2) DisplayText("  A small stream of milk leaks out and dribbles over your tongue, giving you a taste of your own fluids.");
		//(else if lactating a lot)
		else if(player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 2) DisplayText("  A powerful stream of milk fires out of your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + ", coating Lilium's flat stomach.");
		DisplayText("\n\n");
	}

	DisplayText("With several fingers still inside her nipples, Lilium bites her lip and forcefully pushes her breasts together as her hips begin bucking to meet your own " + Desc.Hip.describeHips(player) + ".  Seeing that her orgasm is near, you begin flexing your internal muscles in addition to pumping up and down on her cock.  With a sudden burst of movement that surprises you, Lilium tears her hands from her breasts and roughly grabs your " + Desc.Butt.describeButt(player) + ", her fingers digging into your buttcheeks as she attempts to hold you down tight upon her.  Her eyes bulge wide and she lets out a loud cry as you feel her pump load after load of demonic cum into you, flooding your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + ".  Lilium drops her arms to her sides with eyes half-lidded as she pants heavily.\n\n");

	DisplayText("Not finished with her yet, you draw yourself up off her wilting willy, clenching your lower muscles to keep as much of her cum inside you as possible as you flip yourself around and position your body above her face.  Lilium quickly catches on to what you're doing and you think you can see her gulp nervously as you lower your cum-stuffed pussy to her mouth.  Rolling your " + Desc.Hip.describeHips(player) + " back and forth you begin grinding your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + " into the demon woman's face as her tongue worms and tickles inside you, beginning its task of cleaning out the remnants of her ecstasy from your love hole.  While Lilium's tongue gently strokes your insides with lips occasionally sucking gently on your labia, you turn your attention to your clit.  ");
	//(if little clit)
	if(player.torso.clit.length < 2) DisplayText("With one finger you begin to knead your " + Desc.Vagina.describeClit(player) + ", which instantly increases the pleasure emanating from your lower body.");
	//(else if big clit)
	else DisplayText("Tenderly grasping it between your fingers you begin to rub your " + Desc.Vagina.describeClit(player) + " from base to tip, each stroke adding a wave of pleasure to that of the tongue treatment your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + " is receiving.");
	DisplayText("  The tingle of pleasure across your body begins to strengthen and you grind your crotch into your demon lover's face that little bit harder, trying to get yourself over the edge; suddenly you feel a burst of electricity inside you.  Your muscles all contract, your arms pull tight to your body and you collapse inwards, on top of Lilium as the pulses of pleasure shoot out across your body.  The tingles in your " + Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + ", your " + Desc.Vagina.describeClit(player) + ", your insides and out, through your arms and " + Desc.Leg.describeLegs(player) + ", reach a fever pitch and you let out a short, strained squeak through gritted teeth to voice your pleasure.\n\n");

	DisplayText("Exhausted, you flop to the side, leaving you lying supine beside Lilium.  You turn your head to look at her and she tilts her own head to meet your gaze.  You can see a similar look of contented exhaustion on her face, although you're fairly sure you lack the mix of cum and feminine lube and the smeared makeup.\n\n");

	DisplayText("After a moment of recovery time you get up to get dressed before starting your journey back to camp.  \"<i>Don't be a stranger, now,</i>\" calls the voice over your shoulder. A slight smile appears on your face.\n\n");

	player.orgasm();
	player.stats.cor += 1;
	//(imp preg check)
	player.knockUp(PregnancyType.IMP, PregnancyType.INCUBATION_IMP - 14, 61); //Lilium causes faster pregnancies
	return { next: Scenes.camp.returnToCampUseOneHour };
}

//#########NIPPLE FUCK SCENE######### REQUIRES PENIS
private liliumNippleFuck():void {
	let x:number = player.cockThatFits(40);
	if(x < 0) x = 0;
	
	DisplayText().clear();
	DisplaySprite(93);
	
	DisplayText("Lilium takes you to a secluded spot in the Bazaar for you to be able to enjoy each other's company. She kneels down before you and you strip out of your " + player.inventory.equipment.armor.displayName + ", baring your naked body before her.\n\n");

	DisplayText("Lilium begins to gently rub her palms against the side of your flacid cock.  As it begins to harden in her hands she leans in close, letting it grow stiff against her soft cheek.  You feel her wet tongue against the base of your " + Desc.Cock.describeCock(player, x) + " before it begins sliding along the underside of your cock as Lilium licks the length of your maleness right to the tip.  ");
	//(If cock is pierced)
	if(player.torso.cocks.get(x).pierced > 0) DisplayText("You can feel a slight bump as her tongue passes over each piercing and she gives the head of your cock a flick with the tip of her tongue as she reaches the end.  ");
	//(else)
	else DisplayText("As her tongue reaches the end of its journey she gives the head of your " + Desc.Cock.describeCock(player, x) + " a little flick with the tip of her tongue.  ");
	DisplayText("Taking one black tress in hand she draws it slowly across your glans, sending a shiver down your spine. Taking obvious delight in your reaction she starts brushing the lock of plush hair up and down your shaft.  You can see her bring her free hand up to her breast as she continues to tickle your " + Desc.Cock.describeCock(player, x) + " with the soft strands of hair.  At first she cups and massages the pale flesh slightly, before slipping a finger inside her rosy nipplecunt.  She bites down on her lip as she begins working the finger in and out.\n\n");

	DisplayText("Not content with just the teasing Lilium continues to give your " + Desc.Cock.describeCock(player, x) + ", you grab her shoulders and push her back against the wall, the shock of which causes her finger to come free of her nipple.  With one hand you line the head of your " + Desc.Cock.describeCock(player, x) + " up with the now dripping entrance to her breast and drive forward.  There is a slight resistance at first, but then Lilium coos as you overcome it and her breast envelops you.  Her boobs are sadly not large enough to take you to the hilt, but pumping part of your shaft in and out of her chest is pleasurable all the same. The soft flesh mound distorts as you fuck it, stretching out as you draw back and squishing together as you thrust in.  Lilium's eyes unfocus and she begins to pant louder and louder as you fuck her breast.\n\n");

	let doubleNipFuck:boolean = false;
	//(if multicock)
	if(player.torso.cocks.count >= 2) {
		doubleNipFuck = true;
		DisplayText("Thinking it unfair that just one of her breasts receives your attention, you grab another of your " + Desc.Cock.describeMultiCockShort(player) + " and unceremoniously jam it into Lilium's lonely nipple-cunt, causing her to let out a loud squeal from the extra penetration.  The extra purchase on Lilium's body from both your cocks now being inside her breasts causes the demon's body to rock back and forth vigorously with each of your thrusts.  You move yourself backwards slightly, pulling her with you away from the wall to avoid concussing her.  When you resume your thrusts you can hear her moans warble as her body rocks with yours.\n\n");
		doubleNipFuck = true;
	}
	//(else if demon/naga tail)
	else if(player.torso.tailType === TailType.DEMONIC || player.torso.hips.legs.isNaga()) {
		DisplayText("Thinking it unfair that just one of her breasts receives your attention, you draw your tail up and unceremoniously jam it into Lilium's lonely nipple-cunt, causing her to let out a loud squeal from the extra penetration.  The extra purchase on Lilium's body from both your cock and your tail now being inside her breasts causes the demon's body to rock back and forth vigorously with each of your thrusts.  You move yourself backwards slightly, pulling her with you away from the wall to avoid concussing her.  When you resume your thrusts you can hear her moans warble as her body rocks with yours.\n\n");
	}
	
	DisplayText("Giving up trying to steady herself, Lilium brings her hands to her own cock and begins to stroke and massage it in time with you.  The wet shlicks and pops of you fucking Lilium's dripping nipple");
	if(doubleNipFuck) DisplayText("s");
	DisplayText(" and the soft sound of her stroking her dick combine with your grunts and her moans to form a sexual chorus in this isolated part of the Bazaar.  Soon you feel the familiar pressure building in your loins and you speed up your thrusts; with one great, final effort you drive as far into Lilium's tit");
	if(doubleNipFuck) DisplayText("s");
	DisplayText(" as you can.  A wave of ecstasy washes over you from your head to ");
	if(player.torso.tailType > TailType.NONE) DisplayText("your tail");
	else DisplayText("your " + Desc.Leg.describeFeet(player));
	DisplayText(" as you cum");
	if(player.torso.cocks.count > 2) DisplayText(", your unused cocks drenching her with seed");
	DisplayText(".  The tightness of her ");
	if(doubleNipFuck) DisplayText("nipple-cunts around your twin cocks causes some of your cum to squirt back out of her nipples");
	else DisplayText("nipple-cunt around your cock causes some of your cum to squirt back out of her nipple");
	DisplayText(" each time you fire another load into her, the balance leaking down on Lilium's stomach and thighs.");
	if(player.cumQ() >= 700 && player.torso.cocks.count > 1) DisplayText("Rivers and rivers of cum pour out of your cocks, distending her nipple-holes as the backflow gushes from around the heads.");
	DisplayText("\n\n");

	DisplayText("The sensation of you pulling out of her fuck-able nipple");
	if(doubleNipFuck) DisplayText("s");
	DisplayText(" drives Lilium herself over the edge, causing jets of her own cum to explode out of her cock.  The outline of the spurt is visible in the end of the lacy sock for a moment; it bulges and drips obscenely as she fills it up, squeezing her cock and letting out a loud cry in pleasure.  As she kneels before you panting, cum dripping from her gaping nipple");
	if(doubleNipFuck) DisplayText("s");
	DisplayText(" and soaked sock, you brush a wayward strand of hair from her face.  Her eyes make their way up to meet yours and you give her a wink as you both smile lasciviously.\n\n");

	DisplayText("You get dressed again and begin to leave; as you look back over shoulder, Lilium - still seated and leaning against the wall - blows you a kiss.");
	player.orgasm();
	return { next: Scenes.camp.returnToCampUseOneHour };
}
}
}
