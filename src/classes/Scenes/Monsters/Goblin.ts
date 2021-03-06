﻿export default class Goblin extends Monster {
	protected goblinDrugAttack(): void {
		let temp2: number = rand(2);
		if (short == "Tamani") temp2 = rand(5);
		if (short == "Tamani's daughters") temp2 = rand(5);
		let color: string = "";
		if (temp2 == 0) color = "red";
		if (temp2 == 1) color = "green";
		if (temp2 == 2) color = "blue";
		if (temp2 == 3) color = "white";
		if (temp2 == 4) color = "black";
		//Throw offensive potions at the player
		if (color != "blue") {
			if (short == "Tamani's daughters") MainScreen.text("Tamani uncorks a glass bottle full of " + color + " fluid and swings her arm, flinging a wave of fluid at you.", false);
			else MainScreen.text(capitalA + short + " uncorks a glass bottle full of " + color + " fluid and swings her arm, flinging a wave of fluid at you.", false);
		}
		//Drink blue pots
		else {
			if (short == "Tamani's daughters") {
				MainScreen.text("Tamani pulls out a blue vial and uncaps it, then douses the mob with the contents.", false);
				if (HPRatio() < 1) {
					MainScreen.text("  Though less effective than ingesting it, the potion looks to have helped the goblins recover from their wounds!\n", false);
					addHP(80);
				}
				else MainScreen.text("  There doesn't seem to be any effect.\n", false);
				MainScreen.text("\n", false);
			}
			else {
				MainScreen.text(capitalA + short + " pulls out a blue vial and uncaps it, swiftly downing its contents.", false);
				if (HPRatio() < 1) {
					MainScreen.text("  She looks to have recovered from some of her wounds!\n", false);
					addHP(eMaxHP() / 4);
					if (short == "Tamani") addHP(eMaxHP() / 4);
				}
				else MainScreen.text("  There doesn't seem to be any effect.\n", false);
				combatRoundOver();
			}
			return;
		}
		//Dodge chance!
		if ((player.perks.has("Evade") && rand(10) <= 3) || (rand(100) < player.stats.spe / 5)) {
			MainScreen.text("\nYou narrowly avoid the gush of alchemic fluids!\n", false);
		}
		else {
			//Get hit!
			if (color == "red") {
				//Temporary heat
				MainScreen.text("\nThe red fluids hit you and instantly soak into your skin, disappearing.  Your skin flushes and you feel warm.  Oh no...\n", false);
				if (!player.statusAffects.has("TemporaryHeat")) player.statusAffects.add(new StatusAffect("TemporaryHeat", 0, 0, 0, 0)));
			}
			else if (color == "green") {
				//Green poison
				MainScreen.text("\nThe greenish fluids splash over you, making you feel slimy and gross.  Nausea plagues you immediately - you have been poisoned!\n", false);
				if (!player.statusAffects.has("Poison")) player.statusAffects.add(new StatusAffect("Poison", 0, 0, 0, 0)));
			}
			else if (color == "white") {
				//sticky flee prevention
				MainScreen.text("\nYou try to avoid it, but it splatters the ground around you with very sticky white fluid, making it difficult to run.  You'll have a hard time escaping now!\n", false);
				if (!player.statusAffects.has("NoFlee")) player.statusAffects.add(new StatusAffect("NoFlee", 0, 0, 0, 0)));
			}
			else if (color == "black") {
				//Increase fatigue
				MainScreen.text("\nThe black fluid splashes all over you and wicks into your skin near-instantly.  It makes you feel tired and drowsy.\n", false);
				game.fatigue(10 + rand(25));
			}
		}
		if (!plural) combatRoundOver();
		else MainScreen.text("\n", false);
	}
	protected goblinTeaseAttack(): void {
		let det: number = rand(3);
		if (det == 0) MainScreen.text(capitalA + short + " runs her hands along her leather-clad body and blows you a kiss. \"<i>Why not walk on the wild side?</i>\" she asks.", false);
		if (det == 1) MainScreen.text(capitalA + short + " grabs her heel and lifts it to her head in an amazing display of flexibility.  She caresses her snatch and gives you a come hither look.", false);
		if (det == 2) MainScreen.text(capitalA + short + " bends over, putting on a show and jiggling her heart-shaped ass at you.  She looks over her shoulder and sucks on her finger, batting her eyelashes.", false);
		game.dynStats("lus", rand(player.stats.lib / 10) + 8);
		MainScreen.text("  The display distracts you long enough to prevent you from taking advantage of her awkward pose, leaving you more than a little flushed.\n\n", false);
		combatRoundOver();
	}

	public defeated(hpVictory: boolean): void {
		game.goblinScene.gobboRapeIntro();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (player.gender == 0) {
			MainScreen.text("You collapse in front of the goblin, too wounded to fight.  She giggles and takes out a tube of lipstick smearing it whorishly on your face.  You pass into unconsciousness immediately.  It must have been drugged.", false);
			game.cleanupAfterCombat();
		} else if (pcCameWorms) {
			MainScreen.text("\n\nThe goblin's eyes go wide and she turns to leave, no longer interested in you.", false);
			player.orgasm();
			doNext(game.cleanupAfterCombat);
		} else {
			game.goblinScene.goblinRapesPlayer();
		}
	}

	public Goblin(noInit: boolean = false) {
		if (noInit) return;
		this.a = "the ";
		this.short = "goblin";
		this.imageName = "goblin";
		this.long = "The goblin before you is a typical example of her species, with dark green skin, pointed ears, and purple hair that would look more at home on a punk-rocker.  She's only about three feet tall, but makes up for it with her curvy body, sporting hips and breasts that would entice any of the men in your village were she full-size.  There isn't a single scrap of clothing on her, just lewd leather straps and a few clinking pouches.  She does sport quite a lot of piercings – the most noticeable being large studs hanging from her purple nipples.  Her eyes are fiery red, and practically glow with lust.  This one isn't going to be satisfied until she has her way with you.  It shouldn't be too hard to subdue such a little creature, right?";
		this.createVagina(false, VaginaWetness.DROOLING, VaginaLooseness.NORMAL);
		this.statusAffects.add(new StatusAffect("BonusVCapacity", 40, 0, 0, 0)));
		createBreastRow(Appearance.breastCupInverse("E"));
		this.lowerBody.butt.analLooseness = ButtLooseness.TIGHT;
		this.lowerBody.butt.analWetness = ButtWetness.DRY;
		this.statusAffects.add(new StatusAffect("BonusACapacity", 30, 0, 0, 0)));
		this.tallness = 35 + rand(4);
		this.lowerBody.hipRating = HipRating.AMPLE + 2;
		this.lowerBody.butt.buttRating = ButtRating.LARGE;
		this.skinTone = "dark green";
		this.upperBody.head.hairColor = "purple";
		this.upperBody.head.hairLength = 4;
		initStrTouSpeInte(12, 13, 35, 42);
		initLibSensCor(45, 45, 60);
		this.weaponName = "fists";
		this.weaponVerb = "tiny punch";
		this.armorName = "leather straps";
		this.lust = 50;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 1;
		this.gems = rand(5) + 5;
		this.drop = new WeightedDrop().
			add(consumables.GOB_ALE, 5).
			addMany(1, consumables.L_DRAFT,
			consumables.PINKDYE,
			consumables.BLUEDYE,
			consumables.ORANGDY,
			consumables.PURPDYE);
		this.special1 = goblinDrugAttack;
		this.special2 = goblinTeaseAttack;
		checkMonster();
	}

}

