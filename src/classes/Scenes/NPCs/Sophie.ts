﻿/**
 * ...
 * @author Fake-Name
 */


export default class Sophie extends Harpy {
	//Combat Attacks
	//ON DICK'ED PCz
	//Kiss (Only used on males) - +10 lust on kiss.  25% chance
	//per round of increasing lust by 20.  Repeat kisses add
	//+20 lust.  Each kiss adds 2 hours to length of status
	//affect.
	private sophieKissAttack(): void {
		game.sophieBimbo.sophieSprite();
		MainScreen.text("Sophie bobs and weaves as she closes the distance between you in an instant.  ", false);
		//Blind dodge change
		if (statusAffects.has("Blind") && rand(3) < 2) {
			MainScreen.text(capitalA + short + " looks like she's trying to kiss you, but it's easy to avoid the blind harpy!\n", false);
			return;
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			MainScreen.text("Sophie changes direction in a flash, trying to slip inside your guard, but you manage to sidestep the incredibly fast harpy's attack.\n", false);
			return;
		}
		//Determine if evaded
		if (player.perks.has("Evade") && rand(100) < 10) {
			MainScreen.text("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.\n", false);
			return;
		}
		if (player.perks.has("Misdirection") && rand(100) < 10 && player.inventory.armor.displayName == "red, high-society bodysuit") {
			MainScreen.text("Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep " + a + short + "'s attack.\n", false);
			return;
		}
		//Determine if cat'ed
		if (player.perks.has("Flexibility") && rand(100) < 6) {
			MainScreen.text("With your incredible flexibility, you squeeze out of the way of " + a + short + "", false);
			MainScreen.text("'s attack.\n", false);
			return;
		}
		//YOU GOT HIT SON
		MainScreen.text("Before you can react, she gives you a chaste peck on the lips.  The harpy pulls back with a sultry smile, watching you expectantly.", false);

		//Already affected by it
		if (player.statusAffects.has("Luststick")) {
			MainScreen.text("  Blood rushes to " + player.CockDescriptor.describeMultiCockSimpleOne(player) + " as you grow so hard so fast that it hurts.  ", false);
			game.sophieScene.luststickApplication(2);
			game.dynStats("lus", (12 + player.stats.lib / 10));
			if (player.stats.lust < 70) MainScreen.text("The drugged lip-gloss is starting to get to you!\n", false);
			else if (player.stats.lust < 80) MainScreen.text("Her curvy thighs look so inviting.  You barely stop yourself before you climb in between them!\n", false);
			else if (player.stats.lust < 90) MainScreen.text("A trickle of pre-cum leaks from " + player.CockDescriptor.describeMultiCockSimpleOne(player) + ".  Sophie coos, \"<i>Why don't you give in and let mommy Sophie drain out all that juicy cum?</i>\"\n", false);
			else if (player.stats.lust < 100) MainScreen.text(player.CockDescriptor.describeMultiCockSimpleOne(player, true) + " twitches and bounces in time with your heartbeat, practically pulling you towards Sophie's gaping, pink-linked snatch.\n", false);
			else MainScreen.text("So horny.  You need to copulate - no, fuck - right NOW.  Your hand touches your " + player.CockDescriptor.describeCock(player, 0) + " and you swoon, pumping your hips lewdly as you submit.\n", false);
		}
		else {
			MainScreen.text("  Your whole body blushes as your lips tingle with some unnatural sensation.  Her lips were drugged!  Your whole body flushes as arousal begins to course through your veins.  ", false);
			game.sophieScene.luststickApplication(2);
			game.dynStats("lus", 8 + player.stats.lib / 10);
			if (player.stats.lust < 70) MainScreen.text("The drugged lip-gloss is starting to get to you!\n", false);
			else if (player.stats.lust < 80) MainScreen.text("Her curvy thighs look so inviting.  You barely stop yourself before you climb in between them!\n", false);
			else if (player.stats.lust < 90) MainScreen.text("A trickle of pre-cum leaks from " + player.CockDescriptor.describeMultiCockSimpleOne(player) + ".  Sophie coos, \"<i>Why don't you give in and let mommy Sophie drain out all that juicy cum?</i>\"\n", false);
			else if (player.stats.lust < 100) MainScreen.text(player.CockDescriptor.describeMultiCockSimpleOne(player, true) + " twitches and bounces in time with your heartbeat, practically pulling you towards Sophie's gaping, pink-linked snatch.\n", false);
			else MainScreen.text("So horny.  You need to copulate - no, fuck - right NOW.  Your hand touches your " + player.CockDescriptor.describeCock(player, 0) + " and you swoon, pumping your hips lewdly as you submit.\n", false);
		}
	}

	//Harpy-Boating (Only used on males)
	//Takes off and flies directly at PC, locking her hips 
	//around PC's torso and smothering the PC with breasts 
	//for a few moments.
	//Easily dodged with evade or flexibility.
	private sophieHarpyBoatsPC(): void {
		game.sophieBimbo.sophieSprite();
		MainScreen.text(capitalA + short + " flaps her wings and launches herself forwards with her talons up.  ", false);
		//Blind dodge change
		if (statusAffects.has("Blind") && rand(3) < 2) {
			MainScreen.text(capitalA + short + "'s talons are easy to avoid thanks to her blindness!\n", false);
			return;
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			MainScreen.text(a + short + "'s movements are incredibly fast but you manage to sidestep them.\n", false);
			return;
		}
		//Determine if evaded
		if (player.perks.has("Evade") && rand(100) < 60) {
			MainScreen.text("Using your skills at evading attacks, you determine " + a + short + " is aiming for your upper body and slide under the attack.\n", false);
			return;
		}
		if (player.perks.has("Misdirection") && rand(100) < 40 && player.inventory.armor.displayName == "red, high-society bodysuit") {
			MainScreen.text("Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep " + a + short + "'s attack.\n", false);
			return;
		}
		//Determine if cat'ed
		if (player.perks.has("Flexibility") && rand(100) < 40) {
			MainScreen.text("With your incredible flexibility, you squeeze out of the way of " + a + short + "", false);
			MainScreen.text("'s attack.\n", false);
			return;
		}
		//YOU GOT HIT SON
		MainScreen.text("She hits you hard, nearly bowling you over.  Thankfully, her talons passed to either side of your torso.  They lock together behind your back and your face is pulled tightly into Sophie's smotheringly large mounds!", false);
		if (rand(2) == 0) MainScreen.text("  She jiggles them around you pleasantly and coos, \"<i>Don't fight it baby.  Just let your body do what comes naturally.</i>\"\n", false);
		else MainScreen.text("  She runs her long fingernails through your hair as she whispers, \"<i>Why fight it?  I'll make you feel so good.  Just relax and play with momma Sophie's tits.</i>\"\n", false);
		game.dynStats("lus", (13 + player.stats.sens / 10));
	}

	//Compulsion (Male Only)
	private sophieCompulsionAttack(): void {
		game.sophieBimbo.sophieSprite();
		MainScreen.text("Sophie spreads her thick thighs and slips four fingers into her slippery sex.  She commands, \"<i>Touch yourself for me.  Be a good pet and masturbate for me.</i>\"  ", false);
		//Autosucceeds if player.stats.int < 40
		//autofails if player.stats.int > 80
		//Player fails:
		if (player.stats.int < 40 || (player.stats.int < 80 && rand(40) > (player.stats.int - 40))) {
			MainScreen.text("You moan out loud as your arms move of their own volition.  They reach inside your " + player.inventory.armor.displayName + " and stroke " + player.CockDescriptor.describeMultiCockSimpleOne(player) + ", caress the tip, and continue to fondle you a few moments.", false);
			MainScreen.text("Even after regaining control of your limbs, you're left far more turned on by the ordeal.", false);
			game.dynStats("lus", (15 + player.stats.cor / 20 + player.stats.lib / 20));
		}
		//Player resists
		else {
			MainScreen.text("You can feel her words carrying the force of a magical compulsion behind them, but you focus your willpower and overcome it.", false);
		}
	}

	//ON FEMALE PCz
	//Talons (Female Only)
	//High damage attack easily avoided by evade/flexibility.
	private talonsSophie(): void {
		game.sophieBimbo.sophieSprite();
		MainScreen.text("Sophie pulls her leg up, cocking her thigh dangerously.  Look out!  ", false);
		let damage: number = 0;
		//Blind dodge change
		if (statusAffects.has("Blind") && rand(3) < 2) {
			MainScreen.text(capitalA + short + "'s talons are easy to avoid thanks to her blindness!\n", false);
			return;
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			MainScreen.text(a + short + "'s tears through the air, but you manage to just barely dodge it.\n", false);
			return;
		}
		//Determine if evaded
		if (player.perks.has("Evade") && rand(100) < 60) {
			MainScreen.text("Using your skills at evading attacks, you watch " + a + short + " and deftly sidestep her brutal talons.\n", false);
			return;
		}
		if (player.perks.has("Misdirection") && rand(100) < 30 && player.inventory.armor.displayName == "red, high-society bodysuit") {
			MainScreen.text("Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep " + a + short + "'s attack.\n", false);
			return;
		}
		//Determine if cat'ed
		if (player.perks.has("Flexibility") && rand(100) < 40) {
			MainScreen.text("With your incredible flexibility, you squeeze out of the way of " + a + short + "", false);
			MainScreen.text("'s attack.\n", false);
			return;
		}
		MainScreen.text("Her leg lashes forwards, lightning-quick, and tears bloody gashes into your " + player.skinDesc + " with her razor-sharp talons! ", false);
		//Determine damage - str modified by enemy toughness!
		damage = int((str + weaponAttack) - Math.random() * (player.stats.tou) - player.armorDef);
		if (damage < 0) damage = 0;
		damage += 40;
		damage = player.takeDamage(damage);
		MainScreen.text("(" + damage + ")\n", false);

	}
	//Batter (Female Only)
	//Batters PC with wings – 4x attack impossible to dodge.*/
	private batterAttackSophie(): void {
		game.sophieBimbo.sophieSprite();
		let damage: number = 0;
		MainScreen.text("Sophie comes at you in a flurry of beating wings!  There's no way to dodge the flurry of strikes!\n", false);

		//Determine damage - str modified by enemy toughness!
		damage = int((str) - Math.random() * (player.stats.tou) - player.armorDef);
		if (damage < 0) damage = 0;
		damage = player.takeDamage(damage);
		MainScreen.text("Her left primary wing batters your head! (" + damage + ")\n", false);
		//Determine damage - str modified by enemy toughness!
		damage = int((str) - Math.random() * (player.stats.tou) - player.armorDef);
		if (damage < 0) damage = 0;
		damage = player.takeDamage(damage);
		MainScreen.text("Her right, wing-like arm slaps at your torso! (" + damage + ")\n", false);
		//Determine damage - str modified by enemy toughness!
		damage = int((str) - Math.random() * (player.stats.tou) - player.armorDef);
		if (damage < 0) damage = 0;
		damage = player.takeDamage(damage);
		MainScreen.text("Her other feathery arm punches at your shoulder! (" + damage + ")\n", false);
		//Determine damage - str modified by enemy toughness!
		damage = int((str) - Math.random() * (player.stats.tou) - player.armorDef);
		if (damage < 0) damage = 0;
		damage = player.takeDamage(damage);
		MainScreen.text("Her right wing slams into the other side of your head! (" + damage + ")\n", false);
	}

	override protected performCombatAction(): void {
		//Sophie has special AI in harpySophie.as
		game.sophieBimbo.sophieSprite();
		let select: number = 1;
		let rando: number = 1;
		//Update attacks for girls/neuters
		if (!player.lowerBody.cockSpot.hasCock() || statusAffects.has("BimboBrawl")) {
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
		if (player.lowerBody.cockSpot.hasCock() && findStatusAffect(StatusAffects.BimboBrawl) < 0) rando = 1 + rand(3);
		else rando = 1 + rand(2);
		if (rando == 1) special1();
		if (rando == 2) special2();
		if (rando == 3) special3();
		combatRoundOver();
	}

	public defeated(hpVictory: boolean): void {
		if (statusAffects.has("BimboBrawl"))
			game.sophieFollowerScene.beatUpDebimboSophie();
		else
			game.sophieScene.sophieLostCombat();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (statusAffects.has("BimboBrawl"))
			game.sophieFollowerScene.debimboSophieBeatsYouUp();
		else if (pcCameWorms) {
			MainScreen.text("\n\nYour foe seems disgusted by the display and leaves you to recover alone...");
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
		this.statusAffects.add(new StatusAffect("BonusVCapacity", 40, 0, 0, 0)));
		createBreastRow(Appearance.breastCupInverse("DD"));
		this.lowerBody.butt.analLooseness = ButtLooseness.TIGHT;
		this.lowerBody.butt.analWetness = ButtWetness.DRY;
		this.statusAffects.add(new StatusAffect("BonusACapacity", 10, 0, 0, 0)));
		this.tallness = 5 * 12 + 5;
		this.lowerBody.hipRating = HipRating.INHUMANLY_WIDE;
		this.lowerBody.butt.buttRating = ButtRating.EXPANSIVE;
		this.skinTone = "pink";
		this.skinType = SkinType.PLAIN;
		this.skinDesc = "feathers";
		this.upperBody.head.hairColor = "pink";
		this.upperBody.head.hairLength = 16;
		initStrTouSpeInte(55, 40, 110, 60);
		initLibSensCor(60, 50, 60);
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
		this.gems = 20 + rand(25);
		this.drop = new ChainedDrop().add(armors.W_ROBES, 1 / 10)
			.elseDrop(consumables.GLDSEED);
		this.wingType = WingType.HARPY;
		this.wingDesc = "large feathery";
		this.special1 = harpyUberCharge;
		this.special2 = harpyTease;
		checkMonster();
	}

}
