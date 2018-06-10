export class OmnibusOverseer extends Monster {

	public defeated(hpVictory: boolean): void {
		game.omnibusVictoryEvent();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			DisplayText("\n\nYour foe doesn't seem to care...");
			return { next: game.endLustLoss };
		} else {
			game.omnibusLossRape();
		}
	}

	private lustAura(): void {
		DisplayText("The demoness blinks her eyes closed and knits her eyebrows in concentration.  The red orbs open wide and she smiles, licking her lips.   The air around her grows warmer, and muskier, as if her presence has saturated it with lust.");
		if (statusAffects.has(StatusAffectType.LustAura)) {
			DisplayText("  Your eyes cross with unexpected feelings as the taste of desire in the air worms its way into you.  The intense aura quickly subsides, but it's already done its job.");
			game.dynStats("lus", (8 + int(player.stats.lib / 20 + player.stats.cor / 25)));
		}
		else {
			statusAffects.add(StatusAffectType.LustAura, 0, 0, 0, 0);
		}
		game.combatRoundOver();
	}

	private milkAttack(): void {
		if (randInt(2) === 0)
			DisplayText("The demoness grips her sizable breasts and squeezes, spraying milk at you.\n");
		else DisplayText("Your foe curls up to pinch her nipples, tugging hard and squirting milk towards you.\n");
		if ((player.stats.spe > 50 && randInt(4) === 0) || (player.perks.has(PerkType.Evade) && randInt(3) === 0) || (player.perks.has(PerkType.Misdirection) && randInt(4) === 0 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit")) {
			DisplayText("You sidestep the gushing fluids.");
		}
		//You didn't dodge
		else {
			if (randInt(2) === 0) {
				DisplayText("The milk splatters across your face and chest, soaking you with demonic cream.  Some managed to get into your mouth, and you swallow without thinking.  It makes you tingle with warmth.  ");
			}
			else {
				DisplayText("The milk splashes into your " + player.inventory.equipment.armor.displayName + ", soaking you effectively.  ");
				if (player.torso.cocks.count > 0) {
					DisplayText("Your " + CockDescriptor.describeCock(player, player.torso.cocks.get(0)) + " gets hard as the milk lubricates and stimulates it.  ");
					game.player.stats.lust += 5;
				}
				if (player.torso.vaginas.count > 0) {
					DisplayText("You rub your thighs together as the milk slides between your pussy lips, stimulating you far more than it should.  ");
					game.player.stats.lust += 5;
				}
			}
			game.dynStats("lus", 7 + player.stats.sens / 20);
			if (player.torso.chest.sort(BreastRow.LactationMultipierLargest)[0].lactationMultiplier > 1) DisplayText("Milk dribbles from your " + BreastDescriptor.describeAllBreasts(player) + " in sympathy.");
		}
		game.combatRoundOver();
	}

	public OmnibusOverseer() {
		this.a = "the ";
		this.short = "Omnibus Overseer";
		this.imageName = "omnibusoverseer";
		this.long = "The 'woman' before you is clothed only in a single strip of fabric that wraps around her bountiful chest.  She has striking red eyes that contrast visibly with her blue skin and dark make-up.  Shiny black gloss encapsulates her kissable bubbly black lips.  Her most striking feature is her crotch, which appears neither male nor female.  She has a puffy wet vulva, but a cock-shaped protrusion sprouts from where a clit should be.";
		// this.plural = false;
		this.createCock(10, 1.5);
		this.balls = 0;
		this.ballSize = 0;
		this.cumMultiplier = 3;
		// this.hoursSinceCum = 0;
		this.createVagina(false, VaginaWetness.DROOLING, VaginaLooseness.NORMAL);
		createBreastRow(Appearance.breastCupInverse("DD"));
		this.torso.butt.looseness = ButtLooseness.TIGHT;
		this.torso.butt.wetness = ButtWetness.SLIME_DROOLING;
		this.tallness = randInt(9) + 70;
		this.torso.hipRating = HipRating.AMPLE + 2;
		this.torso.butt.rating = ButtRating.TIGHT;
		this.torso.hips.legs.type = LegType.DEMONIC_HIGH_HEELS;
		this.skin.tone = "light purple";
		this.torso.neck.head.hair.color = "purple";
		this.torso.neck.head.hair.length = 42;
		this.baseStats.str = 65;
this.baseStats.tou = 45;
this.baseStats.spe = 45;
this.baseStats.int = 85;
		initLibSensCor(80, 70, 80);
		this.weaponName = "claws";
		this.weaponVerb = "claw";
		this.weaponAttack = 10;
		this.weaponPerk = "";
		this.weaponValue = 150;
		this.armorName = "demonic skin";
		this.armorDef = 15;
		this.bonusHP = 200;
		this.lust = 20;
		this.lustVuln = 0.75;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 8;
		this.gems = randInt(25) + 10;
		this.drop = new WeightedDrop(null, 1);
		this.special1 = lustAura;
		this.special2 = milkAttack;
		this.wingType = WingType.BAT_LIKE_TINY;
		this.wingDesc = "tiny hidden";
		this.tailType = TailType.DEMONIC;
		checkMonster();
	}

}
