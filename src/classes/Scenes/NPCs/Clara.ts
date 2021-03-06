﻿export default class Clara extends Monster {
	private notMurbleEnjoysTheLacticAcid(): void {
		//Clara drinks her own milk to recover health and give a minor lust gain to the PC
		MainScreen.text("Clara suddenly starts roughly manhandling her tit, noisily stuffing it into her mouth and starting to suck and slobber. Frothy milk quickly stains her mouth and she releases her breast, letting it fall back down. She belches and takes a stance to defend herself again; you can see the injuries you’ve inflicted actually fading as the healing power of her milk fills her.");
		HP += 45;
		lust += 5;
		game.dynStats("lus", (5 + player.stats.lib / 5));
		combatRoundOver();
	}
	//Clara throws a goblin potion, she has the web potion, the lust potion, and the weakening potion
	//should she try to drug them instead?
	protected claraDrugAttack(): void {
		let temp2: number = rand(2);
		let color: string = "";
		if (temp2 == 0) color = "red";
		if (temp2 == 1) color = "black";
		//Throw offensive potions at the player
		MainScreen.text("Clara suddenly snatches something from a pouch at her belt. \"<i>Try this, little cutie!</i>\" She snarls, and throws a vial of potion at you.", false);
		//Dodge chance!
		if ((player.perks.has("Evade") && rand(10) <= 3) || (rand(100) < player.stats.spe / 5)) {
			MainScreen.text("\nYou narrowly avoid the gush of alchemic fluids!\n", false);
		}
		else {
			//Get hit!
			//Temporary heat
			if (color == "red") {
				MainScreen.text("\nThe red fluids hit you and instantly soak into your skin, disappearing.  Your skin flushes and you feel warm.  Oh no...\n", false);
				if (!player.statusAffects.has("TemporaryHeat")) player.statusAffects.add(new StatusAffect("TemporaryHeat", 0, 0, 0, 0)));
			}
			//Increase fatigue
			if (color == "black") {
				MainScreen.text("\nThe black fluid splashes all over you and wicks into your skin near-instantly.  It makes you feel tired and drowsy.\n", false);
				game.fatigue(10 + rand(25));
			}
		}
		combatRoundOver();
		return;
	}
	//Clara teases the PC, and tries to get them to give up
	protected claraTeaseAttack(): void {
		//[cocked PCs only] 
		if (rand(3) == 0) MainScreen.text("Clara hesitates, then lifts up her dress and shows you her womanhood.  Then she slowly utters, \"<i>You know, I’m still a virgin.  You’d be the first thing to ever enter inside this hole, something that Marble never could have offered you.</i>\"  What would it be like, you wonder for a moment, before catching yourself and trying to focus back on the fight.");
		else if (rand(2) == 0) MainScreen.text("Clara seems to relax for a moment and bounces her breasts in her hands.  \"<i>Come on, you know how good it is to drink cow-girl milk, just give up!</i>\" she coos.  Despite yourself, you can’t help but remember what it was like, and find yourself becoming aroused.");
		else MainScreen.text("Instead of attacking, Clara runs her hands up and down her body, emphasizing all the curves it has.  \"<i>You were made to be the milk slave of this, stop fighting it!</i>\" she says almost exasperated.  Even so, you find your gaze lingering on those curves against your will.");
		MainScreen.text("\n");
		game.dynStats("lus", 5 + player.stats.lib / 20);
		combatRoundOver();
	}

	//Once Clara is at half health or lower, she'll cast blind.
	public claraCastsBlind(): void {
		MainScreen.text("Clara glares at you, clearly being worn down.  Then strange lights start dancing around her hand and she points it in your direction.");
		//Successful: 
		if (player.stats.int / 5 + rand(20) + 1 < 14) {
			MainScreen.text("\nA bright flash of light erupts in your face, blinding you!  You desperately blink and rub your eyes while Clara cackles with glee.");
			player.statusAffects.add(new StatusAffect("Blind", 1, 0, 0, 0)));
		}
		else MainScreen.text("\nYou manage to close your eyes just in time to avoid being blinded by the bright flash of light that erupts in your face!  Clara curses when she see's you're unaffected by her magic.");
		combatRoundOver();
	}
	public claraGropesBlindPCs(): void {
		//Clara gropes the PC while they're blinded.  Damage is based on corruption + sensitivity.
		if (player.lowerBody.cockSpot.hasCock() && (!player.lowerBody.vaginaSpot.hasVagina() || rand(2) == 0)) MainScreen.text("Suddenly Clara wraps an arm around you, and sticks a hand into your " + player.inventory.armor.displayName + "!  She is able to give your " + multiCockDescriptLight + " a good fondle before you can push her away.  \"<i>Admit it - I make you soo hard, don't I?</i>\" she taunts you behind your dazzled vision.");
		//Vagina: 
		else if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("A sudden rush of Clara's hoofs clopping is the only warning you get before her attack comes, and you try to bring up your guard, only for her to deftly move past your defense and stick a hand into your " + player.inventory.armor.displayName + "!  She manages to worm her way to your [vagina] and pinches your [clit] before you can push her back out!  \"<i>Hmm, yeah, you're soo wet for me.</i>\" she taunts you behind your dazzled vision.");
		//Bum: 
		else MainScreen.text("Thanks to Clara robbing you of your sight, you lose track of her.  She takes advantage of this, and grabs you from behind, and rubs her considerable curvy cans against your undefended back!  You manage to get her off you after a moment, but not before she gives your [ass] a smack.  \"<i>Everyone will be soo much happier when yoou finally stop fighting me!</i>\" she taunts you behind your dazzled vision.");
		game.dynStats("lus", 7 + player.stats.lib / 15);
		combatRoundOver();
	}
	//Every round if you're in Clara’s base; the PC’s lust is raised slightly.
	protected claraBonusBaseLustDamage(): void {
		MainScreen.text("\nThe early effects of your addiction are making it harder and harder to continue the fight.  You need to end it soon or you’ll give in to those urges.");
		game.dynStats("lus", 2 + player.stats.lib / 20);
		combatRoundOver();
	}
	override protected performCombatAction(): void {
		if (player.statusAffects.has("ClaraFoughtInCamp") && player.statusAffects.get("ClaraCombatRounds").value1 >= 10) {
			HP = 0;
			combatRoundOver();
		}
		if (HP < 50 && rand(2) == 0) {
			notMurbleEnjoysTheLacticAcid();
		}
		else if (player.statusAffects.has("Blind")) {
			claraGropesBlindPCs();
		}
		else {
			let actions: Array = [eAttack, claraDrugAttack, claraTeaseAttack, claraCastsBlind];
			let action: number = rand(actions.length);
			trace("ACTION SELECTED: " + action);
			actions[action]();
		}
		if (!player.statusAffects.has("ClaraCombatRounds")) player.statusAffects.add(new StatusAffect("ClaraCombatRounds", 1, 0, 0, 0)));
			else player.addStatusValue(StatusAffects.ClaraCombatRounds, 1, 1);

		//Bonus damage if not in camp
		if (HP > 0 && lust < 100 && !player.statusAffects.has("ClaraFoughtInCamp")) claraBonusBaseLustDamage();
	}
	public defeated(hpVictory: boolean): void {
		//PC wins via turn count
		if (player.statusAffects.has("ClaraFoughtInCamp") && player.statusAffects.get("ClaraCombatRounds").value1 >= 10) { }
		else {
			MainScreen.clearText();
			//PC wins via health
			if (HP <= 0) MainScreen.text("The pissed off cowgirl finally collapses to the ground.  She tries to stand up again, but finds that she can’t.  \"<i>Noo!</i>\" she cries out in frustration, \"<i>You were the perfect slave!  We were meant to be toogether!</i>\"\n\n");
			//PC wins via lust
			else MainScreen.text("The fury and anger finally give out to the overwhelming lust that you’ve help Clara feel.  She can’t fight anymore, and falls onto her backside.  She starts feeling herself up, and desperately asks you to fuck her.\n\n");
		}
		game.marblePurification.defeatClaraCuntInAFight();
	}
	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		game.marblePurification.loseToClara();
	}

	public Clara() {
		trace("Clara Constructor!");
		this.a = "";
		this.short = "Clara";
		this.imageName = "marble";
		this.long = "You are fighting Marble’s little sister Clara!  The cow-girl looks spitting mad, determined to steal you from her sister and make you into her milk slave, with her breasts hanging out for all to see.  Fortunately, she doesn’t look as big or strong as her sister, and you don’t think she’s been trained to fight like Marble has either.  Still, there is no telling what tricks she has up her sleeves, and she is holding a very angry looking heavy mace.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.NORMAL, VaginaLooseness.NORMAL);
		createBreastRow(Appearance.breastCupInverse("F"));
		this.lowerBody.butt.analLooseness = ButtLooseness.VIRGIN;
		this.lowerBody.butt.analWetness = ButtWetness.DRY;
		this.tallness = 6 * 12 + 4;
		this.lowerBody.hipRating = HipRating.CURVY;
		this.lowerBody.butt.buttRating = ButtRating.LARGE;
		this.lowerBody = LowerBodyType.HOOFED;
		this.skinTone = "pale";
		this.upperBody.head.hairColor = "brown";
		this.upperBody.head.hairLength = 13;
		initStrTouSpeInte(37, 55, 35, 60);
		initLibSensCor(25, 45, 40);
		this.weaponName = "mace";
		this.weaponVerb = "smack";
		this.weaponAttack = 10;
		this.armorName = "tough hide";
		this.armorDef = 5;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 5;
		this.bonusHP = 30;
		this.gems = rand(5) + 25;
		this.drop = NO_DROP;
		this.tailType = TailType.COW;
		//this.special1 = marbleSpecialAttackOne;
		//this.special2 = marbleSpecialAttackTwo;
		checkMonster();
	}

}
