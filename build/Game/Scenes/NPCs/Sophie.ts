/**
 * ...
 * @author Fake-Name
 */


export class Sophie extends Harpy {
	//Combat Attacks
	//ON DICK'ED PCz
	//Kiss (Only used on males) - +10 lust on kiss.  25% chance
	//per round of increasing lust by 20.  Repeat kisses add
	//+20 lust.  Each kiss adds 2 hours to length of status
	//affect.
	private sophieKissAttack(): void {
		game.sophieBimbo.sophieSprite();
		DisplayText("Sophie bobs and weaves as she closes the distance between you in an instant.  ");
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText(capitalA + short + " looks like she's trying to kiss you, but it's easy to avoid the blind harpy!\n");
			return;
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("Sophie changes direction in a flash, trying to slip inside your guard, but you manage to sidestep the incredibly fast harpy's attack.\n");
			return;
		}
		//Determine if evaded
		if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
			DisplayText("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.\n");
			return;
		}
		if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep " + a + short + "'s attack.\n");
			return;
		}
		//Determine if cat'ed
		if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("With your incredible flexibility, you squeeze out of the way of " + a + short + "");
			DisplayText("'s attack.\n");
			return;
		}
		//YOU GOT HIT SON
		DisplayText("Before you can react, she gives you a chaste peck on the lips.  The harpy pulls back with a sultry smile, watching you expectantly.");

		//Already affected by it
		if (player.statusAffects.has(StatusAffectType.Luststick)) {
			DisplayText("  Blood rushes to " + player.CockDescriptor.describeMultiCockSimpleOne(player) + " as you grow so hard so fast that it hurts.  ");
			game.sophieScene.luststickApplication(2);
			game.dynStats("lus", (12 + player.stats.lib / 10));
			if (player.stats.lust < 70) DisplayText("The drugged lip-gloss is starting to get to you!\n");
			else if (player.stats.lust < 80) DisplayText("Her curvy thighs look so inviting.  You barely stop yourself before you climb in between them!\n");
			else if (player.stats.lust < 90) DisplayText("A trickle of pre-cum leaks from " + player.CockDescriptor.describeMultiCockSimpleOne(player) + ".  Sophie coos, \"<i>Why don't you give in and let mommy Sophie drain out all that juicy cum?</i>\"\n");
			else if (player.stats.lust < 100) DisplayText(player.CockDescriptor.describeMultiCockSimpleOne(player, true) + " twitches and bounces in time with your heartbeat, practically pulling you towards Sophie's gaping, pink-linked snatch.\n");
			else DisplayText("So horny.  You need to copulate - no, fuck - right NOW.  Your hand touches your " + player.CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and you swoon, pumping your hips lewdly as you submit.\n");
		}
		else {
			DisplayText("  Your whole body blushes as your lips tingle with some unnatural sensation.  Her lips were drugged!  Your whole body flushes as arousal begins to course through your veins.  ");
			game.sophieScene.luststickApplication(2);
			game.dynStats("lus", 8 + player.stats.lib / 10);
			if (player.stats.lust < 70) DisplayText("The drugged lip-gloss is starting to get to you!\n");
			else if (player.stats.lust < 80) DisplayText("Her curvy thighs look so inviting.  You barely stop yourself before you climb in between them!\n");
			else if (player.stats.lust < 90) DisplayText("A trickle of pre-cum leaks from " + player.CockDescriptor.describeMultiCockSimpleOne(player) + ".  Sophie coos, \"<i>Why don't you give in and let mommy Sophie drain out all that juicy cum?</i>\"\n");
			else if (player.stats.lust < 100) DisplayText(player.CockDescriptor.describeMultiCockSimpleOne(player, true) + " twitches and bounces in time with your heartbeat, practically pulling you towards Sophie's gaping, pink-linked snatch.\n");
			else DisplayText("So horny.  You need to copulate - no, fuck - right NOW.  Your hand touches your " + player.CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " and you swoon, pumping your hips lewdly as you submit.\n");
		}
	}

	//Harpy-Boating (Only used on males)
	//Takes off and flies directly at PC, locking her hips 
	//around PC's torso and smothering the PC with breasts 
	//for a few moments.
	//Easily dodged with evade or flexibility.
	private sophieHarpyBoatsPC(): void {
		game.sophieBimbo.sophieSprite();
		DisplayText(capitalA + short + " flaps her wings and launches herself forwards with her talons up.  ");
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText(capitalA + short + "'s talons are easy to avoid thanks to her blindness!\n");
			return;
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText(a + short + "'s movements are incredibly fast but you manage to sidestep them.\n");
			return;
		}
		//Determine if evaded
		if (player.perks.has(PerkType.Evade) && randInt(100) < 60) {
			DisplayText("Using your skills at evading attacks, you determine " + a + short + " is aiming for your upper body and slide under the attack.\n");
			return;
		}
		if (player.perks.has(PerkType.Misdirection) && randInt(100) < 40 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep " + a + short + "'s attack.\n");
			return;
		}
		//Determine if cat'ed
		if (player.perks.has(PerkType.Flexibility) && randInt(100) < 40) {
			DisplayText("With your incredible flexibility, you squeeze out of the way of " + a + short + "");
			DisplayText("'s attack.\n");
			return;
		}
		//YOU GOT HIT SON
		DisplayText("She hits you hard, nearly bowling you over.  Thankfully, her talons passed to either side of your torso.  They lock together behind your back and your face is pulled tightly into Sophie's smotheringly large mounds!");
		if (randInt(2) === 0) DisplayText("  She jiggles them around you pleasantly and coos, \"<i>Don't fight it baby.  Just let your body do what comes naturally.</i>\"\n");
		else DisplayText("  She runs her long fingernails through your hair as she whispers, \"<i>Why fight it?  I'll make you feel so good.  Just relax and play with momma Sophie's tits.</i>\"\n");
		game.dynStats("lus", (13 + player.stats.sens / 10));
	}

	//Compulsion (Male Only)
	private sophieCompulsionAttack(): void {
		game.sophieBimbo.sophieSprite();
		DisplayText("Sophie spreads her thick thighs and slips four fingers into her slippery sex.  She commands, \"<i>Touch yourself for me.  Be a good pet and masturbate for me.</i>\"  ");
		//Autosucceeds if player.stats.int < 40
		//autofails if player.stats.int > 80
		//Player fails:
		if (player.stats.int < 40 || (player.stats.int < 80 && randInt(40) > (player.stats.int - 40))) {
			DisplayText("You moan out loud as your arms move of their own volition.  They reach inside your " + player.inventory.equipment.armor.displayName + " and stroke " + player.CockDescriptor.describeMultiCockSimpleOne(player) + ", caress the tip, and continue to fondle you a few moments.");
			DisplayText("Even after regaining control of your limbs, you're left far more turned on by the ordeal.");
			game.dynStats("lus", (15 + player.stats.cor / 20 + player.stats.lib / 20));
		}
		//Player resists
		else {
			DisplayText("You can feel her words carrying the force of a magical compulsion behind them, but you focus your willpower and overcome it.");
		}
	}

	//ON FEMALE PCz
	//Talons (Female Only)
	//High damage attack easily avoided by evade/flexibility.
	private talonsSophie(): void {
		game.sophieBimbo.sophieSprite();
		DisplayText("Sophie pulls her leg up, cocking her thigh dangerously.  Look out!  ");
		let damage: number = 0;
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText(capitalA + short + "'s talons are easy to avoid thanks to her blindness!\n");
			return;
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText(a + short + "'s tears through the air, but you manage to just barely dodge it.\n");
			return;
		}
		//Determine if evaded
		if (player.perks.has(PerkType.Evade) && randInt(100) < 60) {
			DisplayText("Using your skills at evading attacks, you watch " + a + short + " and deftly sidestep her brutal talons.\n");
			return;
		}
		if (player.perks.has(PerkType.Misdirection) && randInt(100) < 30 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep " + a + short + "'s attack.\n");
			return;
		}
		//Determine if cat'ed
		if (player.perks.has(PerkType.Flexibility) && randInt(100) < 40) {
			DisplayText("With your incredible flexibility, you squeeze out of the way of " + a + short + "");
			DisplayText("'s attack.\n");
			return;
		}
		DisplayText("Her leg lashes forwards, lightning-quick, and tears bloody gashes into your " + player.skinDesc + " with her razor-sharp talons! ");
		//Determine damage - str modified by enemy toughness!
		damage = int((str + weaponAttack) - Math.random() * (player.stats.tou) - player.armorDef);
		if (damage < 0) damage = 0;
		damage += 40;
		damage = player.takeDamage(damage);
		DisplayText("(" + damage + ")\n");

	}
	//Batter (Female Only)
	//Batters PC with wings – 4x attack impossible to dodge.*/
	private batterAttackSophie(): void {
		game.sophieBimbo.sophieSprite();
		let damage: number = 0;
		DisplayText("Sophie comes at you in a flurry of beating wings!  There's no way to dodge the flurry of strikes!\n");

		//Determine damage - str modified by enemy toughness!
		damage = int((str) - Math.random() * (player.stats.tou) - player.armorDef);
		if (damage < 0) damage = 0;
		damage = player.takeDamage(damage);
		DisplayText("Her left primary wing batters your head! (" + damage + ")\n");
		//Determine damage - str modified by enemy toughness!
		damage = int((str) - Math.random() * (player.stats.tou) - player.armorDef);
		if (damage < 0) damage = 0;
		damage = player.takeDamage(damage);
		DisplayText("Her right, wing-like arm slaps at your torso! (" + damage + ")\n");
		//Determine damage - str modified by enemy toughness!
		damage = int((str) - Math.random() * (player.stats.tou) - player.armorDef);
		if (damage < 0) damage = 0;
		damage = player.takeDamage(damage);
		DisplayText("Her other feathery arm punches at your shoulder! (" + damage + ")\n");
		//Determine damage - str modified by enemy toughness!
		damage = int((str) - Math.random() * (player.stats.tou) - player.armorDef);
		if (damage < 0) damage = 0;
		damage = player.takeDamage(damage);
		DisplayText("Her right wing slams into the other side of your head! (" + damage + ")\n");
	}

	override protected performCombatAction(): void {
		//Sophie has special AI in harpySophie.as
		game.sophieBimbo.sophieSprite();
		let select: number = 1;
		let rando: number = 1;
		//Update attacks for girls/neuters
		if (player.torso.cocks.count <= 0 || statusAffects.has(StatusAffectType.BimboBrawl)) {
			//Talons
			special1 = talonsSophie;
			//Batter
			special2 = batterAttackSophie;
			//Clear
			special3 = null;
		}
		//Dicks ahoy
		else {
			//kiss
			special1 = sophieKissAttack;
			//harpy-boating
			special2 = sophieHarpyBoatsPC;
			//compulsion
			special3 = sophieCompulsionAttack;
		}
		if (player.torso.cocks.count > 0 && findStatusAffect(StatusAffects.BimboBrawl) < 0) rando = 1 + randInt(3);
		else rando = 1 + randInt(2);
		if (rando === 1) special1();
		if (rando === 2) special2();
		if (rando === 3) special3();
		combatRoundOver();
	}

	public defeated(hpVictory: boolean): void {
		if (statusAffects.has(StatusAffectType.BimboBrawl))
			game.sophieFollowerScene.beatUpDebimboSophie();
		else
			game.sophieScene.sophieLostCombat();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (statusAffects.has(StatusAffectType.BimboBrawl))
			game.sophieFollowerScene.debimboSophieBeatsYouUp();
		else if (pcCameWorms) {
			DisplayText("\n\nYour foe seems disgusted by the display and leaves you to recover alone...");
			game.cleanupAfterCombat();
		} else {
			game.sophieScene.sophieWonCombat();
		}
	}

	public Sophie() {
		super(true);
		trace("Sophie Constructor!");

		this.a = "";
		this.short = "Sophie";
		this.imageName = "sophie";
		this.long = "Sophie is approximately the size of a normal human woman, not counting the large feathery wings that sprout from her back.  Her face is gorgeous, with large rounded eyes and glimmering amber lip-gloss painted on her lush, kissable lips.  In spite of her beauty, it's clear from the barely discernible laugh lines around her mouth that she's been around long to enough to have quite a few children.  Her feathers are light pink, though the downy plumage that comprises her 'hair' is brighter than the rest.  She moves with practiced grace despite the large, jiggling breasts that hang from her chest.  Judging from her confident movements, she's an experienced fighter.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.DROOLING, VaginaLooseness.GAPING_WIDE);
		this.statusAffects.add(StatusAffectType.BonusVCapacity, 40, 0, 0, 0));
		createBreastRow(Appearance.breastCupInverse("DD"));
		this.torso.butt.looseness = ButtLooseness.TIGHT;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.statusAffects.add(StatusAffectType.BonusACapacity, 10, 0, 0, 0));
		this.tallness = 5 * 12 + 5;
		this.torso.hips.rating = HipRating.INHUMANLY_WIDE;
		this.torso.butt.rating = ButtRating.EXPANSIVE;
		this.skin.tone = "pink";
		this.skin.type = SkinType.PLAIN;
		this.skinDesc = "feathers";
		this.torso.neck.head.hair.color = "pink";
		this.torso.neck.head.hair.length = 16;
		this.baseStats.str = 55;
this.baseStats.tou = 40;
this.baseStats.spe = 110;
this.baseStats.int = 60;
		this.baseStats.lib = 60;
this.baseStats.sens = 50;
this.baseStats.cor = 60;
		this.weaponName = "talons";
		this.weaponVerb = "slashing talons";
		this.weaponAttack = 20;
		this.armorName = "feathers";
		this.armorDef = 5;
		this.bonusHP = 250;
		this.lust = 10;
		this.lustVuln = .3;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 11;
		this.gems = 20 + randInt(25);
		this.drop = new ChainedDrop().add(armors.W_ROBES, 1 / 10)
			.elseDrop(consumables.GLDSEED);
		this.wingType = WingType.HARPY;
		this.wingDesc = "large feathery";
		this.special1 = harpyUberCharge;
		this.special2 = harpyTease;
		checkMonster();
	}

}
