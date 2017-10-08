export default class Naga extends Monster {

	//2a)  Ability -  Poison Bite - poisons player
	protected nagaPoisonBiteAttack(): void {
		//(Deals damage over 4-5 turns, invariably reducing 
		//your speed. It wears off once combat is over.)
		MainScreen.text("The naga strikes with the speed of a cobra, sinking her fangs into your flesh!  ", false);
		if (!player.statusAffects.has("NagaVenom")) {
			MainScreen.text("The venom's effects are almost instantaneous; your vision begins to blur and it becomes increasingly harder to stand.", false);
			if (player.stats.spe > 4) {
				//stats(0,0,-3,0,0,0,0,0);
				player.stats.spe -= 3;
				showStatDown('spe');
				// speUp.visible = false;
				// speDown.visible = true;
				player.statusAffects.add(new StatusAffect("NagaVenom", 3, 0, 0, 0)));
			}
			else {
				player.statusAffects.add(new StatusAffect("NagaVenom", 0, 0, 0, 0)));
				player.takeDamage(5 + rand(5));
			}
			player.takeDamage(5 + rand(5));
		}
		else {
			MainScreen.text("The venom's effects intensify as your vision begins to blur and it becomes increasingly harder to stand.", false);
			if (player.stats.spe > 3) {
				//stats(0,0,-2,0,0,0,0,0);
				player.stats.spe -= 2;
				showStatDown('spe');
				// speUp.visible = false;
				// speDown.visible = true;
				player.addStatusValue(StatusAffects.NagaVenom, 1, 2);
			}
			else player.takeDamage(5 + rand(5));
			player.takeDamage(5 + rand(5));
		}
		combatRoundOver();
	}

	//2b)  Ability - Constrict - entangles player, raises lust 
	//every turn until you break free
	protected nagaConstrict(): void {
		MainScreen.text("The naga draws close and suddenly wraps herself around you, binding you in place! You can't help but feel strangely aroused by the sensation of her scales rubbing against your body. All you can do is struggle as she begins to squeeze tighter!", false);
		player.statusAffects.add(new StatusAffect("NagaBind", 0, 0, 0, 0)));
		player.takeDamage(2 + rand(4));
		combatRoundOver();
	}

	//2c) Abiliy - Tail Whip - minus ??? HP 
	//(base it on toughness?)
	protected nagaTailWhip(): void {
		MainScreen.text("The naga tenses and twists herself forcefully.  ", false);
		//[if evaded]
		if ((player.findPerk(PerkLib.Evade) && rand(6) == 0)) {
			MainScreen.text("You see her tail whipping toward you and evade it at the last second. You quickly roll back onto your feet.", false);
		}
		else if (player.perks.has("Misdirection") && rand(100) < 10 && player.inventory.armor.displayName == "red, high-society bodysuit") {
			MainScreen.text("Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep " + a + short + "'s tail-whip.", false);
		}
		else if (player.stats.spe > rand(300)) {
			MainScreen.text("You see her tail whipping toward you and jump out of the way at the last second. You quickly roll back onto your feet.", false);
		}
		else {
			MainScreen.text("Before you can even think, you feel a sharp pain at your side as the naga's tail slams into you and shoves you into the sands. You pick yourself up, wincing at the pain in your side.", false);
			let damage: number = 10;
			if (player.armorDef < 10) damage += 10 - player.armorDef;
			damage += rand(3);
			damage = player.takeDamage(damage);
			MainScreen.text(" (" + damage + ")", false);
		}
		combatRoundOver();
	}

	public defeated(hpVictory: boolean): void {
		game.desert.nagaScene.nagaRapeChoice();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			MainScreen.text("\n\nThe naga's eyes go wide and she turns to leave, no longer interested in you.", false);
			player.orgasm();
			doNext(game.cleanupAfterCombat);
		} else {
			game.desert.nagaScene.nagaFUCKSJOOOOOO();
		}
	}

	public Naga(noInit: boolean = false) {
		if (noInit) return;
		trace("Naga Constructor!");
		this.a = "the ";
		this.short = "naga";
		this.imageName = "naga";
		this.long = "You are fighting a naga. She resembles a beautiful and slender woman from the waist up, with dark hair hanging down to her neck. Her upper body is deeply tanned, while her lower body is covered with shiny scales, striped in a pattern reminiscent of the dunes around you. Instead of bifurcating into legs, her hips elongate into a snake's body which stretches far out behind her, leaving a long and curving trail in the sand.  She's completely naked, with her round C-cup breasts showing in plain sight. In her mouth you can see a pair of sharp, poisonous fangs and a long forked tongue moving rapidly as she hisses at you.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.SLAVERING, VaginaLooseness.NORMAL);
		this.statusAffects.add(new StatusAffect("BonusVCapacity", 40, 0, 0, 0)));
		createBreastRow(Appearance.breastCupInverse("C"));
		this.lowerBody.butt.analLooseness = ButtLooseness.TIGHT;
		this.lowerBody.butt.analWetness = ButtWetness.DRY;
		this.statusAffects.add(new StatusAffect("BonusACapacity", 10, 0, 0, 0)));
		this.tallness = 5 * 12 + 10;
		this.lowerBody.hipRating = HipRating.AMPLE + 2;
		this.lowerBody.butt.buttRating = ButtRating.LARGE;
		this.lowerBody = LowerBodyType.NAGA;
		this.skinTone = "mediterranean-toned";
		this.upperBody.head.hairColor = "brown";
		this.upperBody.head.hairLength = 16;
		initStrTouSpeInte(28, 20, 35, 42);
		initLibSensCor(55, 55, 40);
		this.weaponName = "fist";
		this.weaponVerb = "punch";
		this.weaponAttack = 3;
		this.armorName = "scales";
		this.armorDef = 5;
		this.lust = 30;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 2;
		this.gems = rand(5) + 8;
		this.drop = new WeightedDrop().
			add(null, 1).
			add(consumables.REPTLUM, 5).
			add(consumables.SNAKOIL, 4);
		this.special1 = nagaPoisonBiteAttack;
		this.special2 = nagaConstrict;
		this.special3 = nagaTailWhip;
		checkMonster();
	}

}
