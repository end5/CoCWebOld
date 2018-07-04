
/**
 * ...
 * @author ...
 */
export class Izma extends Character {

	//[Special Attacks]
	private IzmaSpecials1() {
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText("Izma attempts to close the distance with you, but misses completely because of her blindness.\n");
			return;
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("Izma attempts to get close, but you manage to side-step her before she can lay her gauntleted hands on you.\n");
			return;
		}
		//Determine if evaded
		if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
			DisplayText("Izma attempts to get close, but you manage to side-step her before she can lay her gauntleted hands on you.\n");
			return;
		}
		//("Misdirection"
		if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("Izma attempts to get close, but you put Raphael's teachings to use and side-step the sharkgirl, confusing her with your movements.\n");
			return;
		}
		//Determine if cat'ed
		if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("Izma attempts to get close, but you manage to side-step her before she can lay her gauntleted hands on you.\n");
			return;
		}
		DisplayText("Izma rushes you with impressive speed, striking a few precise locations on your joints with her fingertips before leaping back.  It doesn't hurt, but you feel tired and sore. \"<i>Pressure points...</i>\" she laughs, seeing your confused expression.");
		//(Fatigue damage)
		game.fatigue(20 + randInt(20));
	}

	private IzmaSpecials2() {
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText("Izma blindly tries to clinch you, but misses completely.\n");
			return;
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("Izma tries to clinch you, but you use your speed to keep just out of reach.\n");
			return;
		}
		//Determine if evaded
		if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
			DisplayText("Izma tries to clinch you, but she didn't count on your skills in evasion.  You manage to sidestep her at the last second.\n");
			return;
		}
		//("Misdirection"
		if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("Izma ducks and weaves forward to clinch you, but thanks to Raphael's teachings, you're easily able to misguide her and avoid the clumsy grab.\n");
			return;
		}
		//Determine if cat'ed
		if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("Izma tries to lock you in a clinch, but your cat-like flexibility makes it easy to twist away from her grab.\n");
			return;
		}
		let damage: number = 0;
		damage = Math.round(130 - randInt(player.stats.tou + player.armorDef));
		if (damage < 0) damage = 0;
		DisplayText("Izma ducks and jinks, working to close quarters, and clinches you. Unable to get your weapon into play, you can only ");
		if (player.armorDef >= 10 || damage === 0) {
			//(armor-dependent Health damage, fullplate, chain, scale, and bee chitin armor are unaffected, has a chance to inflict 'Bleed' damage which removes 2-5% of health for the next three turns if successful)
			damage = player.takeDamage(damage);
			DisplayText("writhe as she painfully drags the blades of her glove down your back");
			player.statusAffects.add(StatusAffectType.IzmaBleed, 3, 0, 0, 0);
		}
		else DisplayText("laugh as her blades scape uselessly at your armor-clad back");
		DisplayText(" before breaking her embrace and leaping away. (" + damage + ")");
	}
	private IzmaSpecials3() {
		DisplayText("Rather than move to attack you, Izma grins at you and grabs her breasts, massaging them as she caresses her long penis with one knee. Her tail thrashes and thumps the sand heavily behind her as she simulates an orgasm, moaning loudly into the air. The whole display leaves you more aroused than before.");
		//(lust gain)
		game.dynStats("lus", (20 + player.stats.lib / 5));
	}

	private IzmaAI() {
		let choice: number = randInt(5);
		if (choice <= 1) eAttack();
		if (choice === 2) {
			if (player.fatigue >= 80) choice = 3;
			else IzmaSpecials1();
		}
		if (choice === 3) {
			if (player.armorDef >= 10 && randInt(3) === 0) IzmaSpecials2();
			else choice = 4;
		}
		if (choice === 4) IzmaSpecials3();
		combatRoundOver();
	}

	public eAttack() {
		DisplayText("Izma slides up to you, throws a feint, and then launches a rain of jabs at you!\n");
		super.eAttack();
	}

	override protected performCombatAction() {
		let choice: number = randInt(5);
		if (choice <= 1) eAttack();
		if (choice === 2) {
			if (player.fatigue >= 80) choice = 3;
			else IzmaSpecials1();
		}
		if (choice === 3) {
			if (player.armorDef >= 10 && randInt(3) === 0) IzmaSpecials2();
			else choice = 4;
		}
		if (choice === 4) IzmaSpecials3();
		combatRoundOver();
	}

	public defeated(hpVictory: boolean) {
		game.izmaScene.defeatIzma();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		if (pcCameWorms) {
			DisplayText("\n\n\"<i>Gross!</i>\" Izma cries as she backs away, leaving you to recover alone.");
			game.return { next: Scenes.camp.returnToCampUseOneHour };
		} else {
			game.izmaScene.IzmaWins();
		}
	}

	public Izma() {
		this.a = "";
		this.short = "Izma";
		this.imageName = "izma";
		this.long = "Izma the tigershark stands a bit over 6' tall, with orange skin bearing horizontal stripes covering most of her body.  Her silver-white hair cascades past her shoulders, draping over an impressive pair of DD-cup breasts barely restrained by a skimpy black bikini top.  Under the knee-length grass skirt below them rustles her beastly fifteen-inch penis and four-balled sack; you catch occasional glimpses of them as she moves.  She's tucked her usual reading glasses into her locker at the moment.";
		// this.plural = false;
		this.createCock(15, 2.2);
		this.balls = 4;
		this.ballSize = 3;
		this.createVagina(false, VaginaWetness.SLICK, VaginaLooseness.LOOSE);
		this.statusAffects.add(StatusAffectType.BonusVCapacity, 45, 0, 0, 0));
		createBreastRow(Appearance.breastCupInverse("DD"));
		this.torso.butt.looseness = ButtLooseness.NORMAL;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.statusAffects.add(StatusAffectType.BonusACapacity, 30, 0, 0, 0));
		this.tallness = 5 * 12 + 5;
		this.torso.hips.rating = HipRating.CURVY;
		this.torso.butt.rating = ButtRating.NOTICEABLE;
		this.skin.tone = "striped orange";
		this.torso.neck.head.hair.color = "silver";
		this.torso.neck.head.hair.length = 20;
		this.baseStats.str = 80;
this.baseStats.tou = 90;
this.baseStats.spe = 85;
this.baseStats.int = 65;
		this.baseStats.lib = 75;
this.baseStats.sens = 25;
this.baseStats.cor = 40;
		this.weaponName = "clawed gauntlets";
		this.weaponVerb = "clawed punches";
		this.weaponAttack = 45;
		this.armorName = "bikini and grass skirt";
		this.armorDef = 8;
		this.bonusHP = 330;
		this.lust = 20;
		this.lustVuln = .20;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 15;
		this.gems = randInt(5) + 1;
		this.drop = NO_DROP;
		checkMonster();
	}

}

