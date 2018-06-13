export class Sirius extends Naga {

	public eAttack() {
		DisplayText("Sirius readies his hands, undulating his body erratically with quick motions in order to catch you off-guard and strike at you.\n");
		super.eAttack();
	}


	override protected outputPlayerDodged(dodge: number) {
		DisplayText("With your trained eyes, you see through his feints and effectively block his first swipe, then quickly twist your body to kick him away.  He clutches his belly where you kicked him, but recovers quickly, eyes fixated on yours.\n");
	}

	public outputAttack(damage: number) {
		if (damage <= 0) {
			super.outputAttack(damage);
		} else {
			DisplayText("You misjudge his pattern and wind up getting slashed by a series of swipes from his sharpened nails.  He distances himself from you in order to avoid retaliation and glares at you with his piercing yellow eyes, a hint of a smile on his face. (" + damage + ")");
		}
	}

	override protected performCombatAction() {
		let attack: number = randInt(4);
		if (player.statusAffects.has(StatusAffectType.Blind)) attack = randInt(3);
		if (attack === 0) eAttack();
		if (attack === 1) poisonBite();
		if (attack === 2) manNagaTease();
		if (attack === 3) nagaSpitAttack();
	}

	private manNagaTease() {
		DisplayText("The snake-man stares deeply into your eyes, seemingly looking past them, and for a moment your body goes numb.");
		//Miss:
		if (randInt(10) === 0) {
			DisplayText("  You blink and shake yourself free of the effects of the snake-man's penetrating gaze.");
			combatRoundOver();
		}
		//Hit (Blind):
		if (statusAffects.has(StatusAffectType.Blind)) {
			DisplayText("  Though your vision is still blurry, you feel yourself being sucked into the golden depths of those pupils, making you forget all your worries, if only for an instant.  All you can focus on is your growing arousal as you sink deeper into his gaze.  You shake your head, clearing your mind of the hypnotising effects the snake-man's eyes seem to possess, though the arousal remains.");
			kGAMECLASS.dynStats("lus", (5 + player.stats.lib / 10 - player.stats.int / 20));
		}
		//Hit:
		else {
			DisplayText("  Those pools of yellow suck you into their golden depths, making you forget all your worries, if only for an instant.  All you can focus on is your growing arousal as you sink deeper into his gaze.  You shake your head, clearing your mind of the hypnotising effects the snake-man's eyes seem to possess, though the arousal remains.");
			kGAMECLASS.dynStats("lus", (10 + player.stats.lib / 7 - player.stats.int / 20));
		}
		combatRoundOver();
	}

	private nagaSpitAttack() {
		DisplayText("Hissing loudly, Sirius suddenly curls his lips and spits at your eyes!  ");
		//{Hit:
		if (spe / 20 + randInt(20) + 1 > player.stats.spe / 20 + 10) {
			DisplayText("The vile spray hits your eyes and you scream in pain, clawing fiercely at your burning, watering, weeping eyes.  <b>You can't see!  It'll be much harder to fight in this state, but at the same time, his hypnosis won't be so effective...</b>");
			player.statusAffects.add(StatusAffectType.Blind, 3, 0, 0, 0);
		}
		//Miss:
		else DisplayText("You quickly lean to the side, narrowly avoiding being blinded by the snake-man's spit!");
		combatRoundOver();
	}

	private poisonBite() {
		DisplayText("With a loud and vicious hiss, Sirius suddenly lunges at you, mouth distended impossibly wide and revealing four needle-like fangs dripping with venom!  ");
		//Miss:
		if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) {
			DisplayText("You dodge just in the nick of time, and deliver a punishing blow with the butt of your halberd as Sirius soars past, forcing him to slither past you to make himself ready to defend himself again.");
			combatRoundOver();
		}
		//Hit:
		DisplayText("The snake-man moves too quickly for you to evade and he sinks long fangs into your flesh, leaving a wound that burns with horrific pain.");
		let damage: number = 40 + randInt(20);
		damage = player.takeDamage(damage);
		DisplayText(" (" + damage + ")");
		combatRoundOver();
	}

	public defeated(hpVictory: boolean) {
		game.urtaQuest.urtaBeatsUpSiriusRadio();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		game.urtaQuest.urtaLosesToSirriusSnakeRadio();
	}

	public Sirius() {
		super(true);
		this.a = "";
		this.short = "Sirius, a naga hypnotist";
		this.imageName = "sirius";
		this.long = "A strange being with the upper torso of a human man topped with the head of a giant serpent stands before you, hissing in anger and occasionally letting a long, fork-tipped tongue flicker out past his lips.  An imperial-featured masculine human face regards you with an indifferent expression.  A ponytail of deep orange - almost bright red - hair falls down between his shoulders, held together by snake-styled circlets of silver, and matching bracelets of the same material and design adorn his wrists. Scales begin at his lower waist, concealing his manhood from you; he's completely naked otherwise.  His snake body is long and slender, covered in finely meshing scales of a rich orange-red shade, the red broken by a pattern of randomly thick or thin stripes of black.  His burning yellow eyes stare directly into yours, vertical slits of pupils fixated on your own as he undulates and coils in an eerily seductive manner.";
		this.plural = false;
		this.createCock(14, 2);
		createBreastRow(0);
		this.torso.butt.looseness = ButtLooseness.TIGHT;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.statusAffects.add(StatusAffectType.BonusACapacity, 10, 0, 0, 0);
		this.tallness = 5 * 12 + 10;
		this.torso.hipRating = HipRating.AMPLE + 2;
		this.torso.butt.rating = ButtRating.LARGE;
		this.torso.hips.legs.type = LegType.NAGA;
		this.skin.tone = "mediterranean-toned";
		this.torso.neck.head.hair.color = "orange";
		this.torso.neck.head.hair.length = 16;
		this.baseStats.str = 75;
this.baseStats.tou = 70;
this.baseStats.spe = 75;
this.baseStats.int = 92;
		this.baseStats.lib = 45;
this.baseStats.sens = 35;
this.baseStats.cor = 40;
		this.weaponName = "fangs";
		this.weaponVerb = "bite";
		this.weaponAttack = 25;
		this.armorName = "scales";
		this.armorDef = 30;
		this.bonusHP = 400;
		this.lust = 30;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 12;
		this.gems = randInt(5) + 8;
		this.drop = NO_DROP;
		this.special1 = nagaPoisonBiteAttack;
		this.special2 = nagaConstrict;
		this.special3 = nagaTailWhip;
		checkMonster();
	}

}
