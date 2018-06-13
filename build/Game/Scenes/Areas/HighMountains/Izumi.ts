export class Izumi extends Monster {
	// Set trace outout for this classes' content.
	private let combatDebug:boolean = true;

	public Izumi() {
		this.a = "";
		this.short = "Izumi";
		this.imageName = "izumi";
		this.long = "You're fighting the immense Oni, Izumi.  Standing around 9 feet tall and wielding little more than her fists, she is the picture of strength and power.  She is clad in a scandalous blue and white Kimono, the garment drawing your eyes to her humongous breasts, and her perfectly sculpted thighs.  A curious horn juts from her head, the texture of it almost lost amongst the rock lining the inside of the cave.\n\nA distinctly cocky grin is painted across her face, her undivided attention focused upon you.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.SLICK, VaginaLooseness.NORMAL);
		createBreastRow(Appearance.breastCupInverse("FF")); // The doc mentions her breasts would be around D/DD on a "normal human" so err, winging this shit
		this.torso.butt.looseness = ButtLooseness.TIGHT;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.tallness = 9 * 12 + 0;
		this.torso.hipRating = HipRating.AVERAGE;
		this.torso.butt.rating = ButtRating.TIGHT;
		this.skin.tone = "creamy-white";
		this.torso.neck.head.hair.color = "golden";
		this.torso.neck.head.hair.length = 25;
		this.baseStats.str = 90;
this.baseStats.tou = 90;
this.baseStats.spe = 90;
this.baseStats.int = 80;
		this.baseStats.lib = 30;
this.baseStats.sens = 25;
this.baseStats.cor = 15;
		this.weaponName = "fist";
		this.weaponVerb = "punch";
		this.armorName = "silken kimono";
		this.bonusHP = 660;
		this.lust = 10;
		this.lustVuln = 0.33;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 22;
		this.gems = 25 + randInt(25);
		this.additionalXP = 75;
		this.drop = NO_DROP;
		checkMonster();
	}

	// Override won/lost calls
	public defeated(hpVictory: boolean) {
		this.cleanup();
		game.highMountains.izumiScenes.touchThatFluffyHorn();
	}

	// Monster won, not player, gg for descriptive method names
	public won(hpVictory: boolean, pcCameWorms: boolean) {
		Flags.list[FlagEnum.IZUMI_TIMES_LOST_FIGHT]++;
		if (player.statusAffects.has(StatusAffectType.Titsmother)) {
			this.cleanup();
			game.highMountains.izumiScenes.deathBySnuSnuIMeanGiantOniTits();
			return;
		}
		else {
			this.cleanup();
			game.highMountains.izumiScenes.fuckedUpByAFuckhugeOni();
			return;
		}
	}

	// Override combat AI
	override protected performCombatAction() {
		// Handle chokeslam mechanics
		if (player.statusAffects.has(StatusAffectType.Chokeslam)) {
			if (combatDebug) trace("ChokeSlam Rounds to Damage: " + player.statusAffects.get(StatusAffectType.Chokeslam).value1);

			player.addStatusValue(StatusAffects.Chokeslam, 1, -1);

			if (player.statusAffects.get(StatusAffectType.Chokeslam).value1 <= 0) {
				chokeSlamDamage();
				cleanupChokeslam();
			}

			combatRoundOver();
			return;
		}

		// Handle groundpound
		if (player.statusAffects.has(StatusAffectType.Groundpound)) {
			player.addStatusValue(StatusAffects.Groundpound, 1, -1);

			if (player.statusAffects.get(StatusAffectType.Groundpound).value1 <= 0) {
				cleanupGroundpound();
			}
		}

		// Handle titsmother
		if (player.statusAffects.has(StatusAffectType.Titsmother)) {
			combatRoundOver();
			return;
		}

		// Titsmother toggle; gonna need to play with this, it should only be used once per fight
		if (this.HPRatio() <= 0.25) {
			if (this.findStatusAffect(StatusAffects.UsedTitsmother) <= -1) {
				trace("Could use titsmother...");
			}
		}

		if ((this.HPRatio() <= 0.25) && (this.findStatusAffect(StatusAffects.UsedTitsmother) <= -1)) {
			if (combatDebug) trace("Using Titsmother!");
			titSmother();
			this.statusAffects.add(StatusAffectType.UsedTitsmother, 0, 0, 0, 0);
			return;
		}
		else {
			let actions: Array = [straightJab, straightJab, straightJab, roundhouseKick, roundhouseKick, roundhouseKick, chokeSlam];

			if (player.findStatusAffect(StatusAffects.Groundpound) <= -1) {
				actions.push(groundPound);
				actions.push(groundPound);
			}

			actions[randInt(actions.length)]();
		}
	}

	// Remove any lingering effects from the player once combat is over
	public cleanup() {
		if (combatDebug) trace("Cleaning up lingering effects...");

		cleanupChokeslam();
		cleanupGroundpound();
		cleanupTitsmother();
	}

	// Quick punch at the player
	// Light damage
	public straightJab() {
		DisplayText("Quick as a flash, Izumi lashes out with her free hand, aiming for your head.");

		let damage: number = int((str + 175) - randInt(player.stats.tou) - player.armorDef);
		if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) {
			DisplayText("  You deftly dodge under the lightning-quick punch.");
		}
		else if (damage <= 0) {
			DisplayText("  You lash out and manage to deflect the blow before it can connect.");
		}
		else {
			DisplayText("  Her fist connects with your chin with a mighty crack, sending you sailing across the cave.  Izumi smirks at you as you");
			if (player.torso.hips.legs.isNaga()) DisplayText(" raise back up onto your [legs]");
			else DisplayText(" stand");
			DisplayText(" and dust yourself off.");

			damage = player.takeDamage(damage);
			DisplayText(" (" + damage + ")");
		}
		combatRoundOver();
	}

	// Roundhouse Kick
	// Milkd lust increase
	public roundhouseKick() {
		DisplayText("Izumi leaps backwards onto one foot, spinning around and unleashing a thundering roundhouse kick.  Luckily, you manage to duck just in time, avoiding what surely would have been a monstrously powerful blow.  Unfortunately, as Izumi’s leg scythes through the air over your head, you find your gaze naturally following the line of her thigh muscles until you’re staring directly up the fluttering folds of Izumi’s increasingly impractical kimono.\n\n");

		if (player.stats.cor >= 50 || player.stats.lib >= 50 || player.stats.sens >= 50) {
			DisplayText("You fall backwards and stagger away, already feeling a flush of warmth colouring your cheeks, trying to drag your mind back to the fight and away from... other things.");

			game.dynStats("lus", 10 + player.stats.lib / 10);
		}
		else {
			DisplayText("You furrow a brow at the Oni's ineffectual attack, not entirely sure if she was intending to hurt you or turn you on.  Her thighs did look rather tantalizing though...");

			game.dynStats("lus", 5 + player.stats.lib / 20);
		}

		combatRoundOver();
	}

	// Bind player for 3 turns. If the player doesn't break out in time, they take huge damage.
	// On escape, Izumi takes some damage
	public chokeSlam() {
		if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) {
			DisplayText("Izumi surges towards you, closing the distance between you within the blink of an eye. You narrowly avoid her crushing grip, twisting away from her grasp at the last moment.  The enormous Oni lets loose a deep, satisfied laugh.");
		}
		else {
			DisplayText("Izumi surges towards you, smashing aside your guard and seizing you by the throat in the blink of an eye.  Lifting you above her head, you can only struggle to breathe as the enormous Oni grins at you like some sort of prize.");
			player.statusAffects.add(StatusAffectType.Chokeslam, 3, 0, 0, 0);

			if (combatDebug) trace("Applied Chokeslam effect");
		}
		combatRoundOver();
	}

	// Struggle against izumi's chokeslam
	public chokeSlamStruggle() {
		DisplayText().clear();

		let brokeFree: boolean;

		if (randInt(player.stats.str) > this.str / 2) {
			brokeFree = true;
		}

		if (brokeFree) {
			if (combatDebug) trace("Escaped from Chokeslam grapple");

			chokeSlamEscape();
			combatRoundOver();
		}
		else {
			DisplayText("Izumi's grip around your throat continues to strangle the breath from your lungs as she holds you aloft.  Your fingers tighten in turn around the Oni's wrist, fighting against her");
			if (player.stats.str < 90) DisplayText(" immense");
			else DisplayText(" impressive");
			DisplayText(" strength, in an attempt to free yourself from her crushing embrace, without success.");

			player.takeDamage(75 + randInt(15));
			doAI();
		}
	}

	// OH HEY ITS A THING
	public chokeSlamWait() {
		DisplayText().clear();

		DisplayText("Your feet dangle uselessly in the air as Izumi holds you aloft.  Why bother resisting?  She's just so <i>strong</i>, her fingers wrapped so completely around your neck...");
		player.takeDamage(75 + randInt(15));

		if (Flags.list[FlagEnum.PC_FETISH] >= 2) {
			DisplayText(" and to be honest, the grip isn't an entirely unplesent experience, either.  If only Izumi would stop playing around and just <i>take you</i> already.");
			game.player.stats.lust += 5;
		}
		else {
			DisplayText(".");
		}
		doAI();
	}

	// Player fails to escape from the chokeslam, and after 3 rounds gets nailed to the fuckin floor
	public chokeSlamDamage() {
		DisplayText("With a grunt of effort, Izumi hauls you through the air, her iron-like grip around your throat providing the perfect anchor to propel you towards the ground.  Before you have a chance to react, the Oni drives you into the unforgiving stone lining the floor of the cave.\n\n");

		DisplayText("The hit is extreme enough to leave you dazed for a moment, splayed out across the floor.  When you rouse yourself back to full consciousness a few seconds later, the cave is still echoing with the sound of the impact, a testament to the strength of the Oni - and your resilience.");

		let damage: number = int((str + 225) - randInt(player.stats.tou) - player.armorDef);
		player.takeDamage(damage);

		DisplayText("(" + damage + ")");

		combatRoundOver();
	}

	// Player escapes from the chokeslam attack
	public chokeSlamEscape() {
		if (combatDebug) trace("Escaping from Chokeslam!");

		DisplayText("Scrabbling desperately against her wrist, you narrow your eyes at the Oni woman’s superior expression,");
		if (player.torso.hips.legs.isBiped()) DisplayText(" raise a [leg] and kick her roundly");
		else if (player.torso.hips.legs.isNaga()) DisplayText(" raise your tail and slap her solidly");
		else DisplayText(" and slap her square");
		DisplayText(" in the face.  Izumi drops you, staggering back in surprise.  “Ow!”  She actually yelps, covering her face with her hands.\n\n");

		DisplayText("You drop to the ground and roll away, expecting some form of retribution.  Izumi glares at you from behind her hand for a moment, then snickers.  Slowly, she drops back into her fighting stance and gestures for your bout to continue.");

		cleanupChokeslam();

		this.HP -= 50 + randInt(player.stats.str);

		combatRoundOver();
	}

	// Remove the effect post-combat
	public cleanupChokeslam() {
		if (player.statusAffects.has(StatusAffectType.Chokeslam)) {
			trace("Removing chokeslam");

			player.statusAffects.remove("Chokeslam");
		}
	}

	// Groundslam, does damage and slows the player if they don't dodge the hit
	public groundPound() {
		DisplayText("Izumi raises one mighty foot and slams it to the ground with a victorious yell.  The ground itself actually shakes below your feet, threatening to knock you off balance.\n\n");

		if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) // TODO: ensure this is correct
		{
			DisplayText("Leaping to the side, you manage to steady yourself against the wall, keeping your footing.");
		}
		else {
			DisplayText("The rumbling actually knocks you off your feet, sprawling on the ground and banging your head.  As the shaking subsides, you pull yourself upright, but you feel a little unsteady on your [feet] after the disorienting impact.");

			let spdReducedBy: number = int(player.stats.spe * 0.25);
			player.statusAffects.set(new StatusAffect("Groundpound", 3, spdReducedBy, 0, 0)));
			game.dynStats("spe-", spdReducedBy);

			if (combatDebug) trace("Applying Groundslam slow");
		}

		combatRoundOver();
	}

	// Remove the effect post-combat, fixup stats
	public cleanupGroundpound() {
		if (player.statusAffects.has(StatusAffectType.Groundpound)) {
			// Can't use dynStats to achieve this, as it can give back more speed than we originally took away due to perks
			player.stats.spe += player.statusAffects.get(StatusAffectType.Groundpound).value2;
			if (player.stats.spe > 100) player.stats.spe = 100;

			player.statusAffects.remove("Groundpound");

			trace("Removing Groundpound slow effect");
		}
	}

	// Binding attack, mild lust increase per turn until the player breaks out. Not TOO hard to break out, though.
	// Attack will be used ONCE, when Izumi reaches ~25% hp.
	public titSmother() {
		if (combatDebug) trace("Titsmother attack!");

		// Attack will ALWAYS hit, but be relatively easy to break out of
		DisplayText("With a sudden burst of speed, the Oni woman bullrushes you, slapping aside your hasty defence.  You brace yourself for a powerful impact, but rather than strike you she instead thrusts her arm straight past your head.  Bemused, you turn your head to follow her fist, just in time to see her crook her elbow and yank you back towards her - hard.  Pulled right off your [feet] by the sudden strike, you slam");
		if (player.hasMuzzle()) DisplayText(" muzzle-");
		else DisplayText(" face-");
		DisplayText("first into Izumi - specifically, into her chest.  Shocked by suddenly having your face rammed into the pillowy soft expanse of Izumi’s bust, you rear back only to be slammed straight back into the mountainous expanse by Izumi’s arm.");

		player.statusAffects.add(StatusAffectType.Titsmother, 0, 0, 0, 0);
		game.dynStats("lus", (player.stats.lib / 15) + 5 + randInt(5));
		combatRoundOver();
	}

	// Remove the effect post-combat
	public cleanupTitsmother() {
		if (player.statusAffects.has(StatusAffectType.Titsmother)) {
			player.statusAffects.remove("Titsmother");
			if (combatDebug) trace("Removing Titsmother");
		}
	}

	// Struggle handler for titsmother attack
	public titSmotherStruggle() {
		if (combatDebug) trace("Titsmother Struggle");

		let brokeFree: boolean;

		if (randInt(player.stats.str) > this.str / 4) {
			brokeFree = true;
		}

		if (brokeFree) {
			if (combatDebug) trace("Broke free of Titsmother!");

			titSmotherEscape();
			combatRoundOver();
		}
		else {
			if (randInt(2) === 0) {
				DisplayText().clear();
				DisplayText("“Hah!  Say goodnight, ‘cause I’m going to choke the fight right out of you!”  She cries exuberantly, forcibly mashing your face into her bosom.  It would appear that she is trying to throttle you, but only having one hand is making the task difficult.  You can breathe just fine, but having your face forced into the constantly jostling mass of tit-flesh before you is distracting to say the least.\n\n");
				DisplayText("You scrabble desperately against Izumi’s grip, trying not to think about where you’re placing your hands, or how soft and pliant the flesh beneath you is, or any number of other upsetting little details - but to no avail.  Izumi’s grip is incredibly strong.  You hang there for a moment, trying to get your breath back for another attempt as Izumi jostles and presses against you from all sides.");
			}
			else {
				DisplayText().clear();
				if (player.torso.cocks.count > 0) {
					DisplayText("Assaulted by the sensation of being pressed against such warm flesh, you can already feel [eachCock] starting to stiffen against your will.  Your hardening erection");
					if (player.torso.cocks.count > 1) DisplayText("s");
					DisplayText(" just makes things even more unbearable, as the harder");
					if (player.torso.cocks.count > 1) DisplayText(" they get");
					else DisplayText(" it gets");
					DisplayText(", the more insistently your");
					if (player.torso.cocks.count > 1) DisplayText(" erections throb");
					else DisplayText(" erection throbs");
					DisplayText(", pressed up against Izumi’s stomach muscles.  Her muscles ripple and undulate as she struggles to keep you in her grip, abs flexing, bumping, encircling your insistent erection");
					if (player.torso.cocks.count > 1) DisplayText("s");
					DisplayText(", stimulating you even further.  You realize in a flash of panic that if you don’t get out of this soon, you may actually... ");
				}
				else {
					DisplayText("Izumi’s bust encloses you on all sides, leaving you feeling like you’re trapped in some kind of breast sarcophagus.  The heat radiating from the soft flesh combines with the scent of whatever strange drug Izumi had been smoking, now hanging around her like some heady perfume.");
				}
			}

			game.dynStats("lus", player.stats.lib / 15 + 5 + randInt(5));
			doAI();
		}
	}

	// Player breaks free of tiSmother and applies damage to Izumi
	public titSmotherEscape() {
		if (combatDebug) trace("Escaping TitSmother!");
		DisplayText().clear();

		if (player.stats.str < 90) {
			DisplayText("Straining with all your might, you still can’t quite manage to break Izumi’s grip, but you do manage to somehow slide upwards through the valley of her bust.  Izumi’s face looms into view, the enormous woman gritting her teeth as she attempts to crush the fight out of you.  In an act of desperation, you rear back and then knife forwards in a brutal headbutt.\n\n");
			DisplayText("“Ack!”  Your forehead connects with her chin in a collision that probably hurts you as much as her, judging by the searing pain that lances through your forehead as she drops you to the floor. Meanwhile, Izumi staggers back, rubbing at her chin.  “Ow.  That hurt, kid!”  She says reproachfully.  The two of you take a moment to shake the cobwebs from your heads before dropping back into your combat stances, a little more wary this time around.\n\n");
		}
		else {
			DisplayText("Locking your arms against Izumi’s shoulders, you heave with all your might against the musclebound Oni girl’s choke hold.  You can feel her arm straining to hold you, struggling to resist, giving ground....");

			if (player.torso.hips.legs.isBiped()) {
				DisplayText("  As soon as you can, you hike up your legs and place your feet firmly on Izumi’s stomach, adding your leg muscles to the effort.");
			}

			DisplayText("  Izumi grits her teeth and growls as she pulls with all her might, trying to force your limbs to give way, but to no avail - with a final thrust, Izumi lets out a yelp as you knock her arm aside and leap away.  Izumi rolls her arm around a little, massaging her shoulder as she regards you, thoughtfully.  Then she reaches up and fans at her face with one hand, grinning that suggestive grin.\n\n");
		}

		DisplayText("“Oh my,” she purrs, lasciviously. “Aren’t you the impressive one?  Keep surprising me like that and I might just forget about this handicap...”");

		cleanupTitsmother();
		this.HP -= (15 + randInt(player.stats.str));
		combatRoundOver();
	}

	// Wait handler for titsmother attack
	public titSmotherWait() {
		DisplayText().clear();

		if (combatDebug) trace("Waiting during TitSmother");

		DisplayText("With your face crushed into the Oni's cleavage, you can't help but wonder; why bother resisting?  She's just so <i>strong</i>, and her breasts feel so lushious against your [face]...");

		game.dynStats("lus", player.stats.lib / 10 + 5 + randInt(5));

		if (Flags.list[FlagEnum.PC_FETISH] >= 2) {
			DisplayText(" and to be honest, her grip isn't an entirely unplesent experience, either.  If only Izumi would stop playing around and just <i>take you</i> already.");
			game.player.stats.lust += 5;
		}
		else {
			DisplayText(".");
		}
		doAI();
	}
}

