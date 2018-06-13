import { Character } from '../../Character/Character';

export class GoblinAssassin extends Character {
	protected goblinDrugAttack() {
		let temp2: number = randInt(5);
		let color: string = "";
		if (temp2 === 0) color = "red";
		if (temp2 === 1) color = "green";
		if (temp2 === 2) color = "blue";
		if (temp2 === 3) color = "white";
		if (temp2 === 4) color = "black";
		//Throw offensive potions at the player
		if (color != "blue") {
			DisplayText(capitalA + short + " uncorks a glass bottle full of " + color + " fluid and swings her arm, flinging a wave of fluid at you.");
		}
		//Drink blue pots
		else {
			DisplayText(capitalA + short + " pulls out a blue vial and uncaps it, swiftly downing its contents.");
			if (HPRatio() < 1) {
				DisplayText("  She looks to have recovered from some of her wounds!\n");
				addHP(eMaxHP() / 4);
			}
			else DisplayText("  There doesn't seem to be any effect.\n");
		}
		//Dodge chance!
		if ((player.perks.has(PerkType.Evade) && randInt(10) <= 3) || (randInt(100) < player.stats.spe / 5)) {
			DisplayText("\nYou narrowly avoid the gush of alchemic fluids!\n");
		}
		//Get hit!
		//Temporary heat
		if (color === "red") {
			DisplayText("\nThe red fluids hit you and instantly soak into your skin, disappearing.  Your skin flushes and you feel warm.  Oh no...\n");
			if (!player.statusAffects.has(StatusAffectType.TemporaryHeat)) player.statusAffects.add(StatusAffectType.TemporaryHeat, 0, 0, 0, 0);
		}
		//Green poison
		if (color === "green") {
			DisplayText("\nThe greenish fluids splash over you, making you feel slimy and gross.  Nausea plagues you immediately - you have been poisoned!\n");
			if (!player.statusAffects.has(StatusAffectType.Poison)) player.statusAffects.add(StatusAffectType.Poison, 0, 0, 0, 0);
		}
		//sticky flee prevention
		if (color === "white") {
			DisplayText("\nYou try to avoid it, but it splatters the ground around you with very sticky white fluid, making it difficult to run.  You'll have a hard time escaping now!\n");
			if (!player.statusAffects.has(StatusAffectType.NoFlee)) player.statusAffects.add(StatusAffectType.NoFlee, 0, 0, 0, 0);
		}
		//Increase fatigue
		if (color === "black") {
			DisplayText("\nThe black fluid splashes all over you and wicks into your skin near-instantly.  It makes you feel tired and drowsy.\n");
			game.fatigue(10 + randInt(25));
		}
		combatRoundOver();
		return;
	}
	//Lust Needle
	protected lustNeedle() {
		DisplayText("With a swift step, the assassin vanishes, her movements too quick for you to follow. You take a sharp breath as you feel her ample thighs clench your head in between them, her slick cunt in full view as you take in her scent.");
		//Miss
		if (combatMiss() || combatEvade()) {
			//Miss: 
			DisplayText("\nYou’ve already prepared, however, as you hold your breath and grab the goblin by her sides. Unhindered by her advance, you take the opportunity to move backwards, throwing the goblin off balance and leaving you only faintly smelling of her pussy.");
			game.dynStats("lus", randInt(player.stats.lib / 10) + 4);
		}
		//Hit: 
		else {
			DisplayText("\nYou’re far too distracted to notice the needle injected into the back of your neck, but by the time she flips back into her original position you already feel the contents of the syringe beginning to take effect.");
			game.dynStats("lus", randInt(player.stats.lib / 4) + 20);
		}
		combatRoundOver();
	}
	//Dual Shot
	protected dualShot() {
		DisplayText("The assassin throws a syringe onto the ground, shattering it and allowing the dissipating smoke from its contents to distract you long enough for her to slip underneath you. With a quick flick of her wrists two needles are placed into her hands, though you’ve already caught wind of her movements.");
		//Miss: 
		if (combatMiss() || combatEvade() || combatMisdirect() || combatFlexibility()) {
			DisplayText("\nYou jump backwards, far enough to avoid her quick thrust upwards as she attempts to lick the area in which your crotch once stood. Realising her situation, she quickly removes herself from the ground and faces you, more determined than before.");
		}
		//Hit: 
		else {
			DisplayText("\nBefore you can do anything to stop her, she lifts her head and takes a swift lick of your crotch, taking a small moan from you and giving her enough time to stab into the back of your knees. She rolls out of the way just as you pluck the two needles out and throw them back to the ground. They didn’t seem to have anything in them, but the pain is enough to make you stagger.");
			//(Medium HP loss, small lust gain)
			let damage: number = int((str + weaponAttack + 40) - randInt(player.stats.tou) - player.armorDef);
			damage = player.takeDamage(damage);
			DisplayText(" (" + damage + ")");
		}
		combatRoundOver();
	}
	//Explosion
	protected goblinExplosion() {
		DisplayText("Without a second thought, the assassin pulls a thin needle from the belt wrapped around her chest and strikes it against the ground, causing a flame to erupt on the tip. She twirls forward, launching the needle in your direction which subsequently bursts apart and showers you with heat.");
		DisplayText("\nYou shield yourself from the explosion, though the goblin has already lit a second needle which she throws behind you, launching your body forwards as it explodes behind your back. ");
		//(High HP loss, no lust gain)
		let damage: number = 25 + randInt(75);
		damage = player.takeDamage(damage);
		DisplayText(" (" + damage + ")");
		combatRoundOver();
	}
	public defeated(hpVictory: boolean) {
		game.goblinAssassinScene.gobboAssassinRapeIntro();

	}
	public won(hpVictory: boolean, pcCameWorms: boolean) {
		if (player.gender === Gender.NONE) {
			DisplayText("You collapse in front of the goblin, too wounded to fight.  She growls and kicks you in the head, making your vision swim. As your sight fades, you hear her murmur, \"<i>Fucking dicks can't even bother to grow a dick or cunt.</i>\"");
			game.return { next: Scenes.camp.returnToCampUseOneHour };
		}
		else {
			game.goblinAssassinScene.gobboAssassinBeatYaUp();
		}
	}
	public GoblinAssassin(noInit: boolean = false) {
		if (noInit) return;
		this.a = "the ";
		this.short = "goblin assassin";
		this.imageName = "goblinassassin";
		this.long = "Her appearance is that of a regular goblin, curvy and pale green, perhaps slightly taller than the norm. Her wavy, untamed hair is a deep shade of blue, covering her pierced ears and reaching just above her shoulders. Her soft curves are accentuated by her choice of wear, a single belt lined with assorted needles strapped across her full chest and a pair of fishnet stockings reaching up to her thick thighs. She bounces on the spot, preparing to dodge anything you might have in store, though your eyes seem to wander towards her bare slit and jiggling ass. Despite her obvious knowledge in combat, she’s a goblin all the same – a hard cock can go a long way.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.DROOLING, VaginaLooseness.NORMAL);
		this.statusAffects.add(StatusAffectType.BonusVCapacity, 90, 0, 0, 0);
		createBreastRow(Appearance.breastCupInverse("E"));
		this.torso.butt.looseness = ButtLooseness.NORMAL;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.statusAffects.add(StatusAffectType.BonusACapacity, 50, 0, 0, 0);
		this.tallness = 35 + randInt(4);
		this.torso.hipRating = HipRating.AMPLE + 2;
		this.torso.butt.rating = ButtRating.LARGE;
		this.skin.tone = "dark green";
		this.torso.neck.head.hair.color = "blue";
		this.torso.neck.head.hair.length = 7;
		this.baseStats.str = 45;
this.baseStats.tou = 55;
this.baseStats.spe = 110;
this.baseStats.int = 95;
		this.baseStats.lib = 65;
this.baseStats.sens = 35;
this.baseStats.cor = 60;
		this.weaponName = "needles";
		this.weaponVerb = "stabbing needles";
		this.armorName = "leather straps";
		this.bonusHP = 70;
		this.lust = 50;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 10;
		this.gems = randInt(50) + 25;
		this.drop = new WeightedDrop().
			add(consumables.GOB_ALE, 5).
			addMany(1, consumables.L_DRAFT,
			consumables.PINKDYE,
			consumables.BLUEDYE,
			consumables.ORANGDY,
			consumables.PURPDYE);// TODO this is a copy of goblin drop. consider replacement with higher-lever stuff
		checkMonster();
	}

	override protected performCombatAction() {
		let actions: Array = [eAttack, goblinDrugAttack, lustNeedle, dualShot, goblinExplosion];
		actions[randInt(actions.length)]();
	}
}
