export class Brigid extends Character {

	//Attack One: Hot Poker, Right Up Your Ass!
	private brigidPoke() {
		DisplayText("Brigid stalks forward with confidence, her shield absorbing your defensive blows until she's right on top of you. She bats your [weapon] aside and thrashes you with her hot poker, scalding your " + Desc.Skin.skin(character) + " and sending you reeling.");
		//(Effect: Heavy Damage)
		let damage: number = Math.round((str + weaponAttack) - randInt(player.stats.tou) - player.armorDef);
		if (damage < 30) damage = 30;
		damage = player.takeDamage(damage);
		DisplayText(" (" + damage + ")");
		game.combatRoundOver();
	}

	//Attack Two: SHIELD BOP! OOM BOP!
	private brigidBop() {
		DisplayText("The harpy feints at you with her poker; you dodge the blow, but you leave yourself vulnerable as she spins around and slams her heavy shield into you, knocking you off balance.");
		//(Effect: Stagger/Stun)
		let damage: number = 5;
		damage = player.takeDamage(5);
		DisplayText(" (" + damage + ")");
		if (player.perks.has(PerkType.Resolute)) DisplayText("  Of course, your resolute posture prevents her from accomplishing much.");
		else player.statusAffects.add(StatusAffectType.Stunned, 0, 0, 0, 0);
		game.combatRoundOver();
	}

	//Attack Three: Harpy Ass Grind GO!
	private BrigidAssGrind() {
		DisplayText("Brigid grins as she approaches you.  She handily deflects a few defensive blows and grabs you by the shoulders.  She forces you onto your knees and before you can blink, has turned around and smashed your face into her ass!  \"<i>Mmm, you like that, don'tcha?</i>\" she growls, grinding her huge, soft ass across your face, giving you an up-close and personal feel of her egg-laying hips.");
		game.player.stats.lust += 30;
		game.combatRoundOver();
	}
	override protected performCombatAction() {
		if (player.statusAffects.has(StatusAffectType.Stunned)) {
			player.statusAffects.remove("Stunned");
			if (randInt(2) === 0) BrigidAssGrind();
			else brigidPoke();
			return;
		}
		if (randInt(3) === 0) BrigidAssGrind();
		else if (randInt(2) === 0) brigidBop();
		else brigidPoke();
	}


	public defeated(hpVictory: boolean) {
		game.brigidScene.pcDefeatsBrigid();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		game.brigidScene.pcDefeatedByBrigid();
	}

	public Brigid() {
		this.a = "";
		this.short = "Brigid the Jailer";
		this.imageName = "brigid";
		this.long = "Brigid is a monster of a harpy, standing a foot taller than any other you've seen. She's covered in piercings, and her pink-dyed hair is shaved down to a long mohawk. She's nude, save for the hot poker in her right hand and the shield in her left, which jingles with every step she takes thanks to the cell keys beneath it.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.SLAVERING, VaginaLooseness.LOOSE);
		if (LegType.HARPY > 0) {
			this.statusAffects.set(new StatusAffect("BonusVCapacity", LegType.HARPY, 0, 0, 0)));
		}
		createBreastRow(Appearance.breastCupInverse("D"));
		this.torso.butt.looseness = ButtLooseness.STRETCHED;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.tallness = randInt(8) + 70;
		this.torso.hipRating = HipRating.AMPLE + 2;
		this.torso.butt.rating = ButtRating.LARGE;
		this.skin.tone = "red";
		this.torso.neck.head.hair.color = "black";
		this.torso.neck.head.hair.length = 15;
		this.baseStats.str = 90;
this.baseStats.tou = 60;
this.baseStats.spe = 120;
this.baseStats.int = 40;
		this.baseStats.lib = 40;
this.baseStats.sens = 45;
this.baseStats.cor = 50;
		this.weaponName = "poker";
		this.weaponVerb = "burning stab";
		this.weaponAttack = 30;
		this.armorName = "armor";
		this.armorDef = 20;
		this.bonusHP = 1000;
		this.lust = 20;
		this.lustVuln = .25;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 19;
		this.gems = randInt(25) + 140;
		this.additionalXP = 50;
		this.wingType = WingType.FEATHERED_LARGE;
		this.tailType = TailType.DEMONIC;
		this.hornType = HornType.DEMON;
		this.horns = 2;
		this.drop = NO_DROP;
		checkMonster();
	}

}

