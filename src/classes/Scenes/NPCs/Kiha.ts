export default class Kiha extends Monster {
	private kihaTimeWaster(): void {
		game.spriteSelect(72);
		MainScreen.text("She supports the axe on a shoulder, cracking her neck and arching her back to stretch herself, giving you an unintended show.  ", false);
		game.player.stats.lust += 5;
		combatRoundOver();
	}

	//This could be silly mode worthy! Should Expand? oh ok
	private sillyModeKihaAttack(): void {
		game.spriteSelect(72);
		MainScreen.text("Before you can stop to think, the dragon-woman steps back - throwing her axe into the air before she starts sprinting towards you. In seconds she's reached a hair's distance between her lithe form and your own, her fist recoiling and time seemingly stopping to allow you to note the powerful energy seeping from her arms.  ", false);
		//Miss:
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			MainScreen.text("You take the opportunity to walk away, watching the slow-motion attack unravel before you; the fire bursts from her knuckle in the shape of a bird in flight, wings unfurled.  ", false);
			if (rand(2) == 0) MainScreen.text("You only owned an XJasun back home, so you don't really understand the reference.", false);
			else MainScreen.text("You stifle a laugh as your memories turn to many an evening spent with your friends in front of your SharkCube console, contesting each other in games of ridiculous, stylized combat.", false);
		}
		else {
			//Determine damage - str modified by enemy toughness!
			let damage: number = int((str + weaponAttack) - rand(player.stats.tou) - player.armorDef);
			damage += 5;
			damage = player.takeDamage(damage);
			MainScreen.text("A torrent of heat bursts from between her fingertips as she thrusts her clenched fist forward, the ball of intense flame writhing and burning with a fury unknown to mankind. With one fell swoop, the combined power of her love, anger, and sorrow pushes you backward, launching you out of the swamp and into Marble's pillowy chest. \"<i>Ara ara,</i>\" she begins, but you've already pushed yourself away from the milky hell-prison as you run back towards ");
			if (!game.kihaFollower.followerKiha()) MainScreen.text("the swamp");
			else MainScreen.text("the fight");
			MainScreen.text(". (" + damage + ")\n", false);
			if (player.HP >= 1) MainScreen.text("You follow the shrill cry of \"<i>B-BAKA!</i>\" in the distance until you reach the exact location you were in a few seconds earlier, prepared to fight again.", false);
		}
		combatRoundOver();
	}

	private kihaFirePunch(): void {
		game.spriteSelect(72);
		MainScreen.text("The draconic girl throws her trusty weapon into the sodden ground, using the distraction to build up balls of flame around her fists.  She runs towards you, launching herself in your direction with a flurry of punches.\n", false);

		//Dodged
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			MainScreen.text("You manage to jump to the side, intense heat rushing past you as you narrowly avoid her advance.  You twist around, finding that she's reunited with her axe and angrier than before.", false);
		}
		//Determine if evaded
		else if (player.perks.has("Evade") && rand(100) < 10) {
			MainScreen.text("Using your skills at evasion, you manage to jump to the side, intense heat rushing past you as you narrowly avoid her advance.  You twist around, finding that she's reunited with her axe and angrier than before.", false);
		}
		//("Misdirection"
		else if (player.perks.has("Misdirection") && rand(100) < 10 && player.inventory.armor.displayName == "red, high-society bodysuit") {
			MainScreen.text("Using your skills at misdirection, you manage to make Kiha think you're going to dodge one way before stepping in the other direction.  You turn back, finding she has her axe in hand and looks rather steamed.", false);
		}
		//Determine if cat'ed
		else if (player.perks.has("Flexibility") && rand(100) < 6) {
			MainScreen.text("Using your cat-like reflexes, you manage to jump to the side, intense heat rushing past you as you narrowly avoid her advance.  You twist around, finding that she's reunited with her axe and angrier than before.", false);
		}
		//HIT!
		else {
			let damage: number = int((str) - (player.armorDef));
			damage = player.takeDamage(damage);
			MainScreen.text("Before you can react, you're struck by the power of her blows, feeling an intense pain in your chest as each fist makes contact.  With a final thrust, you're pushed backwards onto the ground; the dragoness smiles as she pulls her axe out of the ground, her hands still steaming from the fingertips. (" + damage + ")\n", false);
		}
		combatRoundOver();
	}


	//Fire breath
	private kihaFireBreath(): void {
		game.spriteSelect(72);
		MainScreen.text("Kiha throws her arms back and roars, exhaling a swirling tornado of fire directly at you!\n", false);
		//Miss:
		//Determine if evaded
		if (player.perks.has("Evade") && rand(100) < 10) {
			MainScreen.text("Using your talent for evasion, you manage to sidestep the flames in the nick of time; much to the dragoness' displeasure.", false);
		}
		//("Misdirection"
		else if (player.perks.has("Misdirection") && rand(100) < 10 && player.inventory.armor.displayName == "red, high-society bodysuit") {
			MainScreen.text("Using your talent for misdirection, you manage to sidestep the flames in the nick of time; much to the dragoness' displeasure.", false);
		}
		//Determine if cat'ed
		else if (player.perks.has("Flexibility") && rand(100) < 6) {
			MainScreen.text("Using your cat-like flexibility, you manage to sidestep the flames in the nick of time; much to the dragoness' displeasure.", false);
		}
		else {
			let damage: number = Math.round(90 + rand(10));
			damage = player.takeDamage(damage);
			MainScreen.text("You try to avoid the flames, but you're too slow!  The inferno slams into you, setting you alight!  You drop and roll on the ground, putting out the fires as fast as you can.  As soon as the flames are out, you climb back up, smelling of smoke and soot. (" + damage + ")\n", false);
		}
		combatRoundOver();
	}
	/*
	Special 2: Kiha lifts her axe overhead and then hurls it at you in a surprising feat of speed and strength. Not keen on getting cleaved in two, you sidestep the jagged metal.
	Hit: But when your attention refocuses on the dragoness, you realize she's right in front of you! She hits you in the face with a vicious straight punch, knocking you on your back.
	Miss: When your gaze returns to the dragoness, you realize she's right in front of you! Luckily your reflexes are good enough that you manage to duck under the incoming punch. By the time you've recovered, Kiha is already standing, battle-ready and axe in hand. (uh, no? in the time it takes the PC to unbend from a simple duck, she's already disentangled herself from close quarters, run over to where the axe landed on the opposite side of him, extracted it from whatever it may be stuck in, and toted it back to the player? do it again with sense; she should be stunned or disarmed for at least a turn if she misses -Z)

	Special 3: Kiha suddenly lets out a roar, swings her axe down and then charges headlong at you!
	Hit: Like a runaway boulder, the dragoness slams into you, brutally propelling you to the ground, jarring bone and leaving you dazed. //Stun effect applies for 2 rounds//
	Miss: You nimbly turn aside and roll her off your shoulder at the last moment, leaving her ploughing on uncontrollably until she (catches her foot in a sinkhole and twists her ankle painfully, faceplanting in the bog)/(slams headfirst into a half-rotten tree with a shower of mouldering splinters). She quickly rights herself and turns to face you, but it clearly took its toll on her. //Kiha takes damage//
	*/
	override protected handleFear(): boolean {
		statusAffects.remove("Fear");
		MainScreen.text("Kiha shudders for a moment, then looks your way with a clear head.  \"<i>Fear was the first thing the demons taught us to overcome.  Do you think it would stay my blade?</i>\"\n", false);
		return true;
	}

	override protected handleBlind(): boolean {
		return true;
	}


	override protected postAttack(damage: number): void {
		super.postAttack(damage);
		let flame: number = 15 + rand(6);
		flame = player.takeDamage(flame);
		MainScreen.text("\nAn afterwash of flames trails behind her blow, immolating you! (" + flame + ")", false);
	}

	override protected performCombatAction(): void {
		let select: number = rand(5);
		if (select <= 1) eAttack();
		else if (select == 2) {
			if (game.silly()) sillyModeKihaAttack();
			else kihaFirePunch();
		}
		else if (select == 3) kihaFireBreath();
		else kihaTimeWaster();
	}

	public defeated(hpVictory: boolean): void {
		if (statusAffects.has("spiderfight"))
			game.kihaFollower.playerBeatsUpKihaPreSpiderFight();
		else if (statusAffects.has("DomFight"))
			game.kihaFollower.pcWinsDomFight();
		else if (statusAffects.has("Spar"))
			game.kihaFollower.winSparWithKiha();
		else game.kihaScene.kihaVictoryIntroduction();
	}


	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (statusAffects.has("spiderfight"))
			game.kihaFollower.loseKihaPreSpiderFight();
		else if (statusAffects.has("DomFight"))
			game.kihaFollower.pcLosesDomFight();
		else if (statusAffects.has("Spar"))
			game.kihaFollower.sparWithFriendlyKihaLose();
		else if (pcCameWorms) {
			MainScreen.text("\n\nKiha seems visibly disturbed by your infection, enough that she turns to leave.");
			doNext(game.endLustLoss);
		} else {
			game.kihaScene.kihaLossIntro();
		}
	}

	public Kiha() {
		this.a = "";
		this.short = "Kiha";
		this.imageName = "kiha";
		this.long = "Kiha is standing across from you, holding a double-bladed axe that's nearly as big as she is.  She's six feet tall, and her leathery wings span nearly twelve feet extended.  Her eyes are pure crimson, save for a black slit in the center, and a pair of thick draconic horns sprout from her forehead, arcing over her ruby-colored hair to point behind her.  Dim red scales cover her arms, legs, back, and strong-looking tail, providing what protection they might to large areas of her body.  The few glimpses of exposed skin are dark, almost chocolate in color, broken only by a few stray scales on the underside of her bosom and on her cheekbones.  Her vagina constantly glistens with moisture, regardless of her state of arousal.  Despite her nudity, Kiha stands with the confidence and poise of a trained fighter.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.DROOLING, VaginaLooseness.NORMAL);
		this.statusAffects.add(new StatusAffect("BonusVCapacity", 40, 0, 0, 0)));
		createBreastRow(Appearance.breastCupInverse("D"));
		this.lowerBody.butt.analLooseness = ButtLooseness.LOOSE;
		this.lowerBody.butt.analWetness = ButtWetness.DRY;
		this.statusAffects.add(new StatusAffect("BonusACapacity", 40, 0, 0, 0)));
		this.tallness = 6 * 12 + 1;
		this.lowerBody.hipRating = HipRating.AMPLE;
		this.lowerBody.butt.buttRating = ButtRating.AVERAGE + 1;
		this.lowerBody = LowerBodyType.HOOFED;
		this.skinTone = "dark";
		this.skinType = SkinType.SCALES;
		this.skinDesc = "skin and scales";
		this.upperBody.head.hairColor = "red";
		this.upperBody.head.hairLength = 3;
		initStrTouSpeInte(65, 60, 85, 60);
		initLibSensCor(50, 45, 66);
		this.weaponName = "double-bladed axe";
		this.weaponVerb = "fiery cleave";
		this.weaponAttack = 25;
		this.armorName = "thick scales";
		this.armorDef = 30;
		this.bonusHP = 430;
		this.lust = 10;
		this.lustVuln = 0.4;
		this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
		this.level = 16;
		this.gems = rand(15) + 95;
		this.drop = NO_DROP;
		this.wingType = WingType.IMP;
		this.wingDesc = "huge";
		this.tailType = TailType.LIZARD;
		checkMonster();
	}

}
