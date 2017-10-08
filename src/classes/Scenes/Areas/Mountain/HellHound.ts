export default class HellHound extends Monster {
	protected hellhoundFire(): void {
		//Blind dodge change
		if (statusAffects.has("Blind")) {
			MainScreen.text(capitalA + short + " completely misses you with a wave of dark fire! Thank the gods it's blind!", false);
			combatRoundOver();
			return;
		}
		/*if(player.hasStatusAffect(StatusAffects.Web_dash_Silence) >= 0) {
			MainScreen.text("You reach inside yourself to breathe flames, but as you ready to release a torrent of fire, it backs up in your throat, blocked by the webbing across your mouth.  It causes you to cry out as the sudden, heated force explodes in your own throat.\n", false);
			changeFatigue(10);
			takeDamage(10+rand(20));
			enemyAI();
			return;
		}*/
		if (player.perks.has("Evade") && player.stats.spe >= 35 && rand(3) != 0) {
			MainScreen.text("Both the hellhound's heads breathe in deeply before blasting a wave of dark fire at you.  You easily avoid the wave, diving to the side and making the most of your talents at evasion.", false);
		}
		else if (player.perks.has("Misdirection") && rand(100) < 20 && player.inventory.armor.displayName == "red, high-society bodysuit") {
			MainScreen.text("Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep " + a + short + "'s fire.\n", false);
		}
		else if (player.perks.has("Flexibility") && player.stats.spe > 30 && rand(10) != 0) {
			MainScreen.text("Both the hellhound's heads breathe in deeply before blasting a wave of dark fire at you.  You twist and drop with incredible flexibility, watching the fire blow harmlessly overhead.", false);
		}
		else {
			//Determine the damage to be taken
			let temp: number = 15 + rand(10);
			temp = player.takeDamage(temp);
			MainScreen.text("Both the hellhound's heads breathe in deeply before blasting a wave of dark fire at you. While the flames don't burn much, the unnatural heat fills your body with arousal. (" + temp + " damage)", false);
			game.dynStats("lus", 20 - (player.stats.sens / 10));
			statScreenRefresh();
			if (player.HP <= 0) {
				doNext(game.endHpLoss);
				return;
			}
			if (player.stats.lust >= 100) {
				doNext(game.endLustLoss);
				return;
			}
		}
		doNext(game.playerMenu);
	}
	protected hellhoundScent(): void {
		if (player.statusAffects.has("NoFlee")) {
			if (spe == 100) {
				hellhoundFire();
				return;
			}
			else {
				MainScreen.text("The hellhound sniffs your scent again, seemingly gaining more and more energy as he circles faster around you.", false);
				spe = 100;
			}
		}
		else {
			spe += 40;
			MainScreen.text("The hellhound keeps his four eyes on you as he sniffs the ground where you were moments ago. He raises his heads back up and gives you a fiery grin - he seems to have acquired your scent!  It'll be hard to get away now...", false);
			player.statusAffects.add(new StatusAffect("NoFlee", 0, 0, 0, 0)));
		}
		combatRoundOver();
		/*if(spe >= 80) {
			if(spe == 100) {
				hellhoundFire();
				return;
			}
			else {
				MainScreen.text("The hellhound sniffs your scent again, seemingly gaining more and more energy as he circles faster around you.", false);
				spe = 100;	
			}
		}
		else {
			spe += 40;
			MainScreen.text("The hellhound keeps his four eyes on you as he sniffs the ground where you were moments ago. He raises his heads back up and gives you a firey grin - He seems to have aquired you scent!  Running away will now be much more difficult...", false);
		}
		if(player.HP <= 0) {
			doNext(endHpLoss);
			return;
		}
		if(player.stats.lust > 100) {
			doNext(endLustLoss);
			return;
		}
		doNext(1);*/
	}


	public defeated(hpVictory: boolean): void {
		if (hpVictory) {
			MainScreen.text("The hellhound's flames dim and the heads let out a whine before the creature slumps down, defeated and nearly unconscious.", true);
			//Rape if not naga, turned on, and girl that can fit!
			if (player.lowerBody.vaginaSpot.hasVagina() && player.stats.lust >= 33 && !player.lowerBody.isNaga()) {
				MainScreen.text("  You find yourself musing that you could probably take advantage of the poor 'doggy'.  Do you fuck it?", false);
				game.simpleChoices("Fuck it", game.mountain.hellHoundScene.hellHoundPropahRape, "", null, "", null, "", null, "Leave", game.cleanupAfterCombat);
			} else {
				game.cleanupAfterCombat();
			}
		} else {
			MainScreen.text("Unable to bear hurting you anymore, the hellhound's flames dim as he stops his attack. The two heads look at you, whining plaintively.  The hellhound slowly pads over to you and nudges its noses at your crotch.  It seems he wishes to pleasure you.\n\n", true);
			let temp2: Function = null;
			if (player.gender > 0 && player.stats.lust >= 33) {
				MainScreen.text("You realize your desires aren't quite sated.  You could let it please you", false);
				//Rape if not naga, turned on, and girl that can fit!
				if (player.lowerBody.vaginaSpot.hasVagina() && player.stats.lust >= 33 && !player.lowerBody.isNaga()) {
					MainScreen.text(" or make it fuck you", false);
					temp2 = game.mountain.hellHoundScene.hellHoundPropahRape;
				}
				MainScreen.text(".  What do you do?", false);
				game.simpleChoices("Lick", game.mountain.hellHoundScene.hellHoundGetsRaped, "Fuck", temp2, "", null, "", null, "Leave", game.cleanupAfterCombat);
			}
			else {
				MainScreen.text("You turn away, not really turned on enough to be interested in such an offer.", false);
				game.cleanupAfterCombat();
			}
		}
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			MainScreen.text("\n\nThe hellhound snorts and leaves you to your fate.", false);
			doNext(game.cleanupAfterCombat);
		} else {
			game.mountain.hellHoundScene.hellhoundRapesPlayer();
		}
	}

	public HellHound(noInit: boolean = false) {
		if (noInit) return;
		trace("HellHound Constructor!");
		this.a = "the ";
		this.short = "hellhound";
		this.imageName = "hellhound";
		this.long = "It looks like a large demon on all fours with two heads placed side-by-side. The heads are shaped almost like human heads, but they have dog ears on the top and have a long dog snout coming out where their mouths and noses would be.  Its eyes and mouth are filled with flames and its hind legs capped with dog paws, but its front ones almost look like human hands.  Its limbs end in large, menacing claws. A thick layer of dark fur covers his entire body like armor.  Both heads look at you hungrily as the hellhound circles around you. You get the feeling that reasoning with this beast will be impossible.";
		// this.plural = false;
		this.createCock(8, 2, CockType.DOG);
		this.createCock(8, 2, CockType.DOG);
		this.balls = 2;
		this.ballSize = 4;
		this.cumMultiplier = 5;
		// this.hoursSinceCum = 0;
		this.createBreastRow();
		this.createBreastRow();
		this.createBreastRow();
		this.lowerBody.butt.analLooseness = ButtLooseness.NORMAL;
		this.lowerBody.butt.analWetness = ButtWetness.NORMAL;
		this.tallness = 47;
		this.lowerBody.hipRating = HipRating.AVERAGE;
		this.lowerBody.butt.buttRating = ButtRating.AVERAGE + 1;
		this.lowerBody = LowerBodyType.DOG;
		this.skinTone = "black";
		this.skinType = SkinType.FUR;
		//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SkinType.FUR];
		this.upperBody.head.hairColor = "red";
		this.upperBody.head.hairLength = 3;
		initStrTouSpeInte(55, 60, 40, 1);
		initLibSensCor(95, 20, 100);
		this.weaponName = "claws";
		this.weaponVerb = "claw";
		this.weaponAttack = 10;
		this.armorName = "thick fur";
		this.lust = 25;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 5;
		this.gems = 10 + rand(10);
		this.drop = new WeightedDrop().add(consumables.CANINEP, 3)
			.addMany(1, consumables.BULBYPP,
			consumables.KNOTTYP,
			consumables.BLACKPP,
			consumables.DBLPEPP,
			consumables.LARGEPP);
		this.tailType = TailType.DOG;
		this.special1 = hellhoundFire;
		this.special2 = hellhoundScent;
		checkMonster();
	}

}
