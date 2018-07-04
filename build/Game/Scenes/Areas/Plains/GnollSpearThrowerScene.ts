﻿/**
 * Created by aimozg on 03.01.14.
 */
export class GnollSpearThrowerScene {

	/*Content Guide: Just to help me make sure I got everything and to explain the layout, colored font is going to be used to identify when text should be used.  This will often be used in regards to specific characteristics, instead of the overall gender.  For example, a reference to a cuntboy's chest would be in Orange but a reference to her hips or groin would be red.
	 Black – Universal text
	 Blue – Text to be used on Male heroes
	 Red – Text to be used on Female heroes
	 Purple – Text to be used on Herm heroes
	 Orange – Text to be used on Neuter heroes
	 Green – Text to be used in special circumstances described in <>
	 UNDERLINED TEXT – These are selectable options
	 Bold Text – This text should appear as Bold in the game.
	 Italicized Text – This text should appear as Italicized in the game.
	 */

	//Female Gnoll.  First Page.
	public gnoll2Encounter() {
		DisplaySprite(54);
		DisplayText().clear();
		//<First Encounter>
		if (Flags.list[FlagEnum.HAVE_ENCOUNTERED_GNOLL_PLAINS] === 0) {
			Flags.list[FlagEnum.HAVE_ENCOUNTERED_GNOLL_PLAINS]++;
			DisplayText("Waves of long, dry grass spread before you in gentle, rolling hills.  Your mind begins to wander, staring at the featureless expanse as the waist-high grass rustles against your body.  It seems like there is nothing but peace to be found here below the expansive blue sky and the dry grass.\n\n");

			DisplayText("The only warning you have is when your ears catch the barest of whispers, giving you time to jump to the side, just as a long wooden javelin whistles through the air where your head would have been.  You whirl around to see a massive hyena woman standing a few yards away.  The tall, muscular woman ");
			//<If height is below 6'5\">
			if (player.tallness < 77) DisplayText("towers over you, ");
			//<If height is equal to or above 6'5\">
			else DisplayText("stands proudly before you, ");
			DisplayText("the tan of her spotted pelt gleaming golden in the sun.  Your roaming eyes register that the softer tan of her belly covers her large breasts and slides down below her loincloth.\n\n");

			DisplayText("A growl snaps your eyes up to the gnoll's face, seeing black lips pulled back from ivory fangs.  Dark, dominant eyes pierce you as the hyena slowly starts to circle you.  She sniffs at the air, getting your scent, before squaring off with you.  Powerful muscles ripple under her fur as she prepares to attack.  You have clearly trespassed on her lands and this feral lady intends to punish you for it.");
		}
		//<Subsequent Encounters> 
		else {
			DisplayText("You barely register the waves of long, dry grass that spread before you in gentle, rolling hills.  Your nerves grow taut as you stare at the featureless expanse as the waist-high grass rustles against your body, knowing you have strayed into Hyena territory.  It seems like there's nothing but peace to be found here, below the expansive blue sky and the dry grass, but you are all too aware that such things are deceptive.\n\n");

			DisplayText("You strain your ears to catch the smallest sounds.  Something seems off about the sound of the grass waves.  You whirl around to see a massive hyena woman rising out of the grass, holding a javelin in her spotted paw.  The tall, muscular lady ");
			//<If player height is below 6'5\"> 
			if (player.tallness < 77) DisplayText("towers over you, ");
			//<If player height is equal to or above 6'5\"> 
			else DisplayText("stands proudly before you, ");
			DisplayText("the tan of her spotted pelt gleaming golden in the sun.  Your roaming eyes register that the softer tan of her belly covers her large breasts and slides down below her loincloth.\n\n");

			DisplayText("A growl snaps your eyes up to the gnoll's face, seeing black lips pulled back from ivory fangs.  Dark, dominant eyes pierce you as the hyena slowly starts to circle you.  She sniffs at the air, getting your scent, before squaring off with you.  Powerful muscles ripple under her fur as she prepares to attack.  You have clearly trespassed on her lands and this feral lady intends to punish you for it.");
		}
		startCombat(new GnollSpearThrower());
	}


	//<Hyena Victorious – Anal> 
	public hyenaSpearLossAnal() {
		DisplaySprite(54);
		//Oh shit get anal raped.
		if (player.inventory.items.has(consumables.S_DREAM)) {
			kGAMECLASS.plains.gnollScene.yoDawgIHeardULiekGNollBallzzzdahdakjldh();
			return;
		}
		DisplayText().clear();
		DisplayText("The gnoll laughs, a sharp, barking sound of mocking, as you sink to ground, ");
		//<Physical Defeat> 
		if (player.stats.HP < 1) DisplayText("bruised and battered, unable to do more than lay prone before her.");
		//<Lust Defeat>
		else DisplayText("arousal coursing through your veins, unable to think clearly enough to stand.");
		DisplayText("  A jolt of fear passes through you as the hyena woman draws a long javelin from her back.  Her dark eyes glint gleefully as she plunges the javelin down, slamming it down into the ground in front of you.  You gasp with relief, glad for your life as she slams two more down, forming a rough pyramid in front of you.  ");
		if (player.weaponName != "fists") DisplayText("Before you can recover, she tosses your " + player.weaponName + " into the long grass.  She roughly pulls the " + player.inventory.equipment.armor.displayName + " from your body and it, too, is tossed into the high grass, leaving you naked before this amazon.");
		else DisplayText("She roughly pulls the " + player.inventory.equipment.armor.displayName + " from your body and it's tossed into the high grass, leaving you naked before this amazon.");
		DisplayText("\n\n");

		DisplayText("The warrior's spotted paws slide to her shapely waist, mocking laughter reaching your ears.  You find your eyes fixed on the paws that slide along the leather band holding her loincloth up.  With deft hands, the knot holding them parts, letting the rough leather swing out of the way.  You catch your breath as you finally gaze upon her.  A firm, black shaft, a good 15 inches long and 2 inches thick, stands before you.  What at first appeared to be a penis seems different in some way.  As your gaze slides along the dark shaft, you realize that the tip of the barrel-like member isn't that of a cock, but is instead the tight entrance of a massive clit.  You are shocked to realize that the flesh before you is a cunt unlike any you've seen on a creature before.  She lets you gaze in wonder for several moments as her powerful musk fills your mind.\n\n");

		DisplayText("Her mocking laughter penetrates your lust hazed mind as the gnoll grabs your " + Desc.Head.describeHair(player) + " and hauls you painfully up.  A shove sends you stumbling forward to the upright javelins.  A furred paw clamps like a vice around your wrists, pulling your hands up to the top of the pyramid.  Her spare hand expertly twines the leather thong of her loincloth around your wrists and the javelins, suddenly binding them tight to the now-sturdy pyramid.  In panic, you struggle against the bindings, but the lashings hold firm against your feeble efforts.\n\n");

		//<Paragraph for Nagas> 
		if (player.torso.hips.legs.isNaga()) {
			DisplayText("Panting from your struggles, you feel the tip of your tail pulled back and stretched out.  Bleary, you crane your head back just in time to see the gnoll pull out a black javelin and thrust it down at the tip of your tail.  The end explodes into a ball of goo, pinning your tail to the ground and holding you taut.  You thrash weakly, unable to get enough leverage to break the javelin's hold, leaving you exposed and vulnerable.\n\n");
		}
		//<Paragraph for Slimes> 
		else if (player.torso.hips.legs.isGoo()) {
			DisplayText("The dominant gnoll pulls away from you, stalking around the front of the tripod, her glittering eyes holding your gaze.  One spotted hand raises, holding a small leather bag.  She slowly turns the bag, letting a trickle of powder fall onto the dry ground.  The wind catches some of the dust, blowing it into your trapped form.  Immediately, your slimy skin sparks with jolts of mingled pain and pleasure.  The hyena stalks around your prison, her pointed teeth flashing in a smile as her husky voice fills the air. \"<i>I've been told that this powder, culled from plants in hidden savanna springs, has a curious effect on slimes.  If you try to escape, this powder will absorb into your body, wracking it with burning of two kinds.  Enough of this and you will never be able to separate pain and pleasure again.</i>\" The savanna warrior completes her circuit around you, closing the circle of powder on the ground.  With the power of this faint dust, you are certain that trying to cross the circle would drop you.  Seeing that realization, the hyena gives a sharp laugh, putting the bag away before she confidently stalks behind you.\n\n");
		}
		//<Paragraph for Non-Taurs>
		else if (!player.torso.hips.legs.isTaur()) {
			DisplayText("Panting from your struggles, you look down in time to see the gnoll twine a second leather strap around your ankle, tying it to the base of one of the javelins.  You attempt to keep her from securing your second ankle when a spotted paw reaches up, ");
			if (player.torso.balls.quantity > 0) DisplayText("clamping onto your " + Desc.Balls.describeSack(player) + " and squeezing until ");
			else if (player.torso.vaginas.count > 0) DisplayText("grabbing your " + Desc.Vagina.describeClit(player) + " until ");
			else DisplayText("plunging into your " + Desc.Butt.describeButthole(character.torso.butt) + " and pinching until ");
			DisplayText("you cry out and let her tie your second leg to the post.\n\n");
		}
		//TAURS!
		else {
			DisplayText("Panting from your struggles, you look down in time to see the amazon tie a length of leather cord around one hind ankle.  She stands up, tugging at the cord and demands that you lift your leg.  You refuse, preparing to deliver a devastating kick to her torso when she reaches one spotted paw forward, ");
			if (player.torso.balls.quantity > 0) DisplayText("clamping onto your " + Desc.Balls.describeSack(player) + " and squeezing until ");
			else if (player.torso.vaginas.count > 0) DisplayText("grabbing your " + Desc.Vagina.describeClit(player) + " until ");
			else DisplayText("plunging into your " + Desc.Butt.describeButthole(character.torso.butt) + " and pinching until ");
			DisplayText("you cry out and lift your leg.  She quickly ties the leg to the post, lifted off the ground, leaving you unable to kick or move easily.\n\n");
		}

		DisplayText("Sharp talons press against your back, leaving eight lines of sensation as they trace down your body and along your " + Desc.Hip.describeHips(player) + ".  You feel the heat of her breath just above your ear.  \"<i>The queens of the savanna demand submission.  You are only welcome in these lands so long as you pay tribute to us in the most primal of ways.</i>\"  ");
		//<For characters with non-naga tails>
		if (player.torso.tailType > TailType.NONE) DisplayText("One furred paw wraps around your tail before pulling up sharply, exposing your " + Desc.Butt.describeButthole(character.torso.butt) + " to the hot, savanna air.  Sharp fangs clamp onto the tail, holding it up to rob you of any remaining modesty.");
		//<For characters without tails>
		else DisplayText("One furred paw disappears before a single claw presses roughly against your " + Desc.Butt.describeButthole(character.torso.butt) + " until she hears your breath catch in your throat.");
		DisplayText("  A soft whimper escapes your lips when something hard and damp slides firmly along your rump.  You can hear lust-filled panting from the hyena as she grinds her massive clit against your trapped form, letting you feel the warmth of her body.\n\n");

		DisplayText("Clawed hands slide around your sides to roughly squeeze your " + Desc.Breast.describeChest(character) + ", using the painful hold to brace her body.  The hardened shaft vanishes as her hips pull back suddenly.  The barest touches against your entrance is all the warning you have before she shoves the two inch thick hyena meat roughly forward, stretching your poor hole wide around the sudden intruder.");
		Mod.Butt.displayStretchButt(player, 30, true, true, false);
		DisplayText("  The air fills with the sound of mocking laughter as the warrior forces herself deep into your passage.  Your ass is forced wide as your body tries desperately to cope with the sudden intrusion until her hips finally press against your " + Desc.Butt.describeButt(player) + ".\n\n");

		DisplayText("Coarse fur and a muscled form press against your trapped body.  Hot breath slides along your skin moments before dozens of sharp teeth clamp on the nape of your neck.  The gnoll's muzzle holds you still, sharp teeth almost breaking your skin.  Slowly, you feel her hips pull back, her shaft leaving behind a slick coating of her body's own lubrication.  Her hard cunt slides out of your passage until all but the barrel-like tip of her remains, leaving your body to feel suddenly empty.  You can feel her lips slide along you in a smirk as she notices how much your body has surrendered to her will before she violently slams forward, filling you suddenly with her womanhood.\n\n");

		DisplayText("The gnoll begins to piston into you rough and fast, losing herself in the breeding, unconcerned with your own comfort.");
		//<Heroes with Penises>
		if (player.torso.cocks.count > 0) DisplayText("  Each time the shaft slides into you, a jolt of urgent pleasure shoots through you as her thrusts slam against your prostate.");
		//<Others>
		else DisplayText("  Each lunge from the dominant hyena seems to be at a slightly different angle and strength, ensuring that your entrance is constantly stretched and pulled in new ways.");
		DisplayText("  Time loses meaning as your world narrows down to the endless thrusts of the warrior sending waves of pleasure flowing through you, building into a fog of bliss that fills your mind.  Her grunts echo in the grassland as her strange shaft fills you again and again, claiming your body as her property.\n\n");

		DisplayText("The sound of her powerful body slapping against your bound form echoes through the grassy hills.  The gnoll's muzzle finally vanishes from your neck, leaving behind a perfect imprint of her sharp teeth.  Her breath moans out along the sweat of your skin in time to the thrusting of her hips as she fills your now-willing body.  Clawed hands clamp tight around your waist, pulling your hips back in time with her powerful motions.\n\n");

		DisplayText("A warm weight starts to grow deep within your abused core.  A soft, needy whimpering fills the air and it takes some time before you realize it is being dragged from your mouth each time the thick shaft plows into you.  Suddenly, pleasure crashes through your body and mind as orgasm suddenly explodes within you.  ");
		//<Male> 
		if (player.torso.cocks.count > 0) DisplayText("Your cum spurts from your " + Desc.Cock.describeMultiCockShort(player) + ", spraying your seed over the dry ground, giving life to the savanna.");
		//<Females>
		else if (player.torso.vaginas.count > 0) DisplayText("Your own juices flow freely from your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + ", coating your thighs and dripping onto the dry grass below you.");
		DisplayText("  Muscles deep within you ripple, spasming around the strange intruder buried deep within you.  The hyena roars her pleasure, slamming deep into your " + Desc.Butt.describeButthole(character.torso.butt) + " as your body milks her hard cunt for the juices flowing from her.\n\n");

		DisplayText("With a grunt, the hyena pulls away from your trapped form, filling the air with the scent of the hyena musk that now drips from your abused hole.  With one deft motion of her paw, the bindings on your hands suddenly slip free, ");
		//<All non neuters> 
		if (player.gender > 0) DisplayText("letting you fall hard into the mess you made on the grass.");
		//<neuters>
		else DisplayText("letting you fall hard into the grass.");
		DisplayText("  As you slowly fade into unconsciousness from the orgasm, you see the hyena draw a finger along the tip of her cunt until the spotted fingers glisten with moisture.  Those fingers roughly rub the thick, potent fluid against your face, coating it with her scent and the knowledge of her victory.");
		//<For Slimes> 
		if (player.hips.legs.type === LegType.GOO) DisplayText("  Even as your eyes slide closed, you see the hyena kicking open the circle of dust.");
		DisplayText("  The last thing you hear before blackness overtakes you is the barking laugh of the hyena as she leaves her newest conquest to sleep in the fields of grass.");
		player.orgasm();
		player.stats.sens += 2;
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	public hyenaVictory() {
		DisplaySprite(54);
		DisplayText().clear();
		DisplayText("The gnoll draws one final javelin, the sharp point distinct as it points at you.  The javelin drops, sticking deep into the dry ground, as the amazon is too");
		if (monster.stats.HP <= 0) DisplayText(" dazed");
		else DisplayText(" aroused");
		DisplayText(" to fight further.  One spotted paw holds tight to the shaft while the tawny warrior slowly falls to her knees, the will to fight completely gone.  Her head bows to you in submission as you slowly approach the defeated hyena.");
		let vagoo;
		if (player.torso.vaginas.count > 0) vagoo = victoryRapeHyenaCunnilingus;
		let penor;
		if (player.torso.cocks.count > 0) penor = hyenaVictoryRapeFellatio;
		if (player.stats.lust >= 33 && player.gender > 0) {
			DisplayText("\n\nUsing the hyena to get off would be easy.  What do you do?");
			MainScreen.simpleChoices(["Get BJ", "Get Licked", "", "", "Leave"], [penor, vagoo, null, null, Scenes.camp.returnToCampUseOneHour]);
		}
		else return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//<Hyena Defeat - Fellatio>
	private hyenaVictoryRapeFellatio() {
		DisplaySprite(54);
		let x: number = player.cockThatFits(40);
		if (x < 0) x = 0;
		let y: number = player.cockThatFits2(40);
		if (player.torso.cocks.count > 1 && (y < 0 || y === x)) {
			y = 0;
			if (y === x) y = 1;
		}
		DisplayText().clear();
		DisplayText("Sensing the gnoll's will has broken, you impulsively order her to strip.  Tawny, spotted paws fall to the leather band around her waist, deftly untying the loincloth.  The material falls away from her groin, exposing a long, black shaft slipping free from a furred sheath.  You gaze in wonder, realizing that this hardening member is not a cock, but instead a long, thick clit.  The barrel-like tip of her pseudopenis is actually the entrance to her pussy.  You begin to understand why bondage and dominance are so ingrained in the culture of this savage race.\n\n");

		DisplayText("Dark brown eyes watch your hands as you slowly slip out of your " + player.inventory.equipment.armor.displayName + ".  The potent smell of hyena musk starts to fill the air as the dark shaft of the gnoll's pseudopenis slides from her sheath.  Eyes of brown fire fix on your now exposed " + Desc.Cock.describeMultiCockShort(player) + ".  Her pink tongue slides along her powerful teeth and dark lips, giving you pause, but her gaze is filled with nothing but lust and need.  Soft whines escape from her lips as she all but strains towards your " + Desc.Cock.describeCock(player, x) + ".  Her spotted paws slide up to her heavy breasts, squeezing the orbs as the now submissive amazon tries to tempt you.\n\n");

		DisplayText("With a start, you realize that she is actually begging your permission.  Several moments pass as you let the warrior wait, watching her shift and squirm in anticipation.  A slight movement rests your " + Desc.Cock.describeCock(player, x) + " on her warm nose, forcing the gnoll to breathe in your distinctive scent.  You can't hide your smile as you finally give her permission.  Instantly, the hyena's dark muzzle darts forward, burying her nose against the very base of your shaft, breathing deeply.  As she pulls back, that pink tongue darts out, feeling wet and velvety along your shaft until her dark lips press against your very tip.\n\n");

		DisplayText("The gnoll's head presses forward quickly as her black lips part, filling her muzzle with your length. ");
		//<Cock 0 is 7\" or greater>
		if (player.torso.cocks.get(x).length > 7) DisplayText("The tip of your member presses hard against the back of her mouth for a long moment until she swallows, letting your " + Desc.Cock.describeCock(player, x) + " slide into her tight throat.  ");
		DisplayText("With her warm nose pressing hard against your hips, the amazon begins to swallow rapidly, forcing the prison around your cock to ripple.  Her long tongue curls around your member, adding to the jolts of pleasure shooting through you.  Her tail starts to wag when she tastes your pre-cum ");
		if (player.torso.cocks.get(x).length > 7) DisplayText("in the back of her mouth ");
		DisplayText("as it starts to be pulled from your encased member.\n\n");

		//<One Cock> 
		if (player.torso.cocks.count === 1) DisplayText("Even as the most incredible sensations flow through you from the feel of her muzzle, you see one of her spotted hands drop from her pendulous breast to grip her own shaft.  Her second hand follows, sliding two furred fingers into the tip of her strange shaft as she starts to move up and down the dark flesh in time to the suckling of her muzzle.  Her dark brown eyes slowly slide closed in bliss as she pleasures herself while servicing the shaft buried deep within her maw.\n\n");
		//<Two Cocks>
		else if (player.torso.cocks.count === 2) {
			DisplayText("Even as the most incredible sensations flow through you from the feel of her muzzle, a spotted hand leaves one pendulous breast to wrap around your unattended " + Desc.Cock.describeCock(player, y) + ".  Her powerful grip feels like a vice as she begins to slide the paw along the length.  Moving in time to the rippling of her throat, the hand tries hard to match the flood of sensations radiating from her muzzle.");
			//<If character has Scrotum> 
			if (player.torso.balls.quantity > 0) DisplayText("  Her second paw finally cups your " + Desc.Balls.describeBalls(true, true, player) + ", squeezing and massaging to add to the powerful sensations.");
			DisplayText("\n\n");
		}
		//Three or More Cocks>
		if (player.torso.cocks.count > 2) {
			DisplayText("Even as the most incredible sensations flow through you from the feel of her muzzle, a spotted hand leaves one pendulous breast to wrap around your unattended " + Desc.Cock.describeCock(player, y) + ".  Soon, her second hand slides along ");
			if (player.torso.cocks.count === 3) DisplayText("your other ");
			else DisplayText("another ");
			DisplayText("free member.  Her powerful grips feel like a vice on the twin members as she begins to slide her paws along two of your shafts.  Moving in time to the rippling of her throat, the hands try hard to match the flood of sensations radiating from her muzzle.  Her own 'member' throbs, untouched, as she loses herself in trying to pleasure you.\n\n");
		}

		DisplayText("Waves of pleasure radiate through you from the amazon's incredible skill and stamina.  It becomes hard to focus on anything but the lust flowing through your body and it takes some time to realize that the whimpering noise filling the air is coming from your own mouth.  ");
		//<Cock 0 is 7\" or greater> 
		if (player.torso.cocks.get(x).length >= 7) DisplayText("The muzzle starts to pull away from your " + Desc.Cock.describeCock(player, x) + " until the tip finally slips from her throat, letting her gasp for breath.  ");
		DisplayText("The gnoll starts to growl, the deep sound vibrating through your very core.  The lips lock around your cock, starting to suckle hard and fast, pushing you over the edge.\n\n");

		//<Cock 0 is 7\" or greater>
		if (player.torso.cocks.get(x).length >= 7) {
			DisplayText("Orgasm crashes through your body and mind as time loses its meaning.  The gnoll's muzzle plunges forward once more, enveloping the pulsing shaft deep into her maw.  The powerful muscles of her throat ripple as she swallows, milking your " + Desc.Cock.describeCock(player, x) + " for each spurt of your potent seed.");
			//<Two Cocks> 
			if (player.torso.cocks.count === 2) DisplayText("  Your second " + Desc.Cock.describeCock(player, y) + " throbs in her hand, spraying her face and throat with thick ropes of cum.");
			//<Three or More Cocks>
			if (player.torso.cocks.count >= 3) DisplayText("  Your " + Desc.Cock.describeMultiCockShort(player) + " throb in her paws, coating her muzzle, neck, and breasts with thick ropes of cum.");
			DisplayText("  You feel your knees weaken as her muzzle works harder and faster, trying to drain you of every drop.  Her paws wrap around your waist and powerful arms lift you and lay you on the ground as that talented muzzle continues to milk you dry.\n\n");
		}
		//<Cock 0 is less than 7\"> 
		else {
			DisplayText("Orgasm crashes through your body and mind as time loses its meaning.  The gnolls's cheeks sink in as she starts to suck as hard as she can, increasing the glorious pressure on your trapped member.  The powerful muscles of her muzzle ripple as she swallows, milking your " + Desc.Cock.describeCock(player, x) + " as each spurt of your potent seed splashes across her tongue.");
			//<Two Cocks> 
			if (player.torso.cocks.count === 2) DisplayText("  Your " + Desc.Cock.describeCock(player, y) + " throbs in her hand, spraying her face and throat with thick ropes of cum.");
			//<Three or More Cocks>
			if (player.torso.cocks.count >= 3) DisplayText("  Your " + Desc.Cock.describeMultiCockShort(player) + " throb in her paws, coating her muzzle, neck, and breasts with thick ropes of cum.");
			DisplayText("  You feel your knees weaken as her muzzle works harder and faster, trying to drain you of every drop.  He paws wrap around your waist and powerful arms lift you and lay you on the ground as that talented muzzle continues to milk you dry.\n\n");
		}
		DisplayText("The world goes gray and fuzzy as your lose yourself in the afterglow of the powerful orgasm.  When you last sit up, dizzy, you find that the hyena has disappeared.  You find your " + player.inventory.equipment.armor.displayName + " neatly folded next to you, but absolutely coated in the juices of the departed amazon.  Next to this musky pile is a small bag containing her gift to you.");
		player.orgasm();
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	//<Hyena Defeat – Cunnilingus>
	private victoryRapeHyenaCunnilingus() {
		DisplaySprite(54);
		DisplayText().clear();
		DisplayText("Dark brown eyes watch your approach, already slightly glazed in lust.  Slowly, the tawny head bows before you, acknowledging you as dominant.  It amazes you that this powerful, feral woman who fought so hard would now be so meek, but part of you knows that this submission will not last forever.\n\n");

		DisplayText("It slowly dawns on you just how much power you have over this submissive warrior.  With a simple command, she stands with her head still bowed.  Unable to help yourself, you bring your right hand up to fondle one of the hyena's heavy breasts.  The large orbs are covered in soft fur with a black nipple poking through the cream colored pelt.  Impulsively, you lean forward, giving the already hard teat a lick.  The hyena moans softly into the savanna air as your tongue slides along her perky tit.\n\n");

		DisplayText("Pulling away from the beautiful gnoll, you decide to try another command.  Your heart pounds in your chest in anticipation as you order the hyena to drop her loincloth.  The leather garment falls away from her groin, exposing a 15 inch long and 2 inch thick shaft of dark flesh already slipping free from a furred sheath.  You gaze in wonder, realizing that this hardening member is not a cock, but instead a long, thick clit.  The barrel-like tip of her pseudopenis is actually her pussy.  You begin to understand why bondage and dominance are so ingrained in the culture of this savage race.\n\n");

		DisplayText("A heady musk fills the air from the warrior's arousal, leaving you feeling light headed.  The scent alone causes juices to flow in your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + ".  At another command, the hyena's deft paws slide along your form, roving about as they slowly remove your " + player.inventory.equipment.armor.displayName + ", letting your bare skin warm in the air.  The strong, tawny paws linger even after you stand nude in the soft breeze.\n\n");

		DisplayText("On impulse, you command the hyena to use that eager muzzle on you.  Instantly, her paws clutch you around the waist and lift, hefting you high into the air.  A girlish squeal escapes your lips as you find yourself dangling above the warrior.  The gnoll's powerful arms hold you steady as you squirm almost ten feet off the ground.  The amazon ignores all further commands as she lowers your vulnerable slit directly above her nose.\n\n");

		DisplayText("A wet, pink tongue slides along your intimate lips, sending a jolt of pleasure through your very core.  The long, broad tongue laps eagerly against the entrance of your pussy until you start to writhe in the air.  At the end of each stroke, the broad tongue starts to curl around your " + Desc.Vagina.describeClit(player) + ", eliciting a gasp of pleasure from your suspended form.  Time starts to lose meaning as the gnoll holds you there, tirelessly, as she works her velvet tongue sensuously against your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + ".\n\n");

		DisplayText("You are so lost in the building pleasure that when the licking suddenly stops, a howl of need is torn from your lips.  You start to squirm, desperate for the tongue to return, when you feel yourself spun rapidly around before the hyena's warm nose presses lightly against your slit.  Looking down the length of your body, you see the twinkle in the dark brown eyes.  Her long pink tongue lolls out the front of her muzzle.  The amazon's hot breath slides over your dripping slit.\n\n");

		DisplayText("The pressure against your entrance increases as the gnoll slowly lowers you further.  The sensation spikes as more of your weight presses your pussy against her nose.  Suddenly, her short, blunt muzzle slips into your passageway, stretching you wide.  The reason for the pivot becomes clear as her lolling tongue slides along your " + Desc.Vagina.describeClit(player) + ".  Juices from your tunnel immediately coat her tawny cheeks as she holds you there, impaled on her nose, while your body grows accustomed to the great thickness of her muzzle.");
		Mod.Vagina.displayStretchVagina(player, 8, true, true, false);
		DisplayText("\n\n");

		DisplayText("The gnoll lifts you off once more, before letting you plunge back down, once more forcing your cunt around her muzzle and her tongue to slide along your clit.  Your body is hefted and dropped as she fucks you with her muzzle.  The feeling is unbelievable, radiating through the very center of you where a warm weight starts to build.  Your eyes lose focus as your entire world narrows down to the feeling of the nose and tongue plunging deep into you again and again.  The intruder pulls out one last time before lips lock onto your " + Desc.Vagina.describeClit(player) + " and suckle hard.\n\n");

		DisplayText("That final action is too much for your abused body.  Pure ecstasy floods through your mind as your " + Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + " spasms wildly.  Your honey splashes out of you, the hyena trying to catch the juices on her tongue, though much splatters over her tawny throat and breasts.  Her deft tongue delves inside of you, twisting and heightening your orgasm.  The world fades to nothing but pleasure.\n\n");

		DisplayText("When you awake some time later, still heady with pleasure, you find your " + player.inventory.equipment.armor.displayName + " piled neatly next to you, along with what appears to be a thank you gift from the now-absent gnoll.  The memory of the amazon's incredible strength and lithe form brings a smile to your lips as you prepare to leave.");
		player.orgasm();
		return { next: Scenes.camp.returnToCampUseOneHour };
	}
}
}
