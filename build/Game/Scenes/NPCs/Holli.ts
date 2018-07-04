
export class Holli extends Character {
	/*Fight -Z
	 Marae's offshoot, [monster] stands rooted in front of you.  Solid black eyes with golden pupils stare out at you.  Her normally-nude body is concealed inside her tree, though occasionally she will flash you the devilish grin of a sadistic temptress and the bark will split to reveal a pale, jiggling bit of flesh.  A pair of gnarled oak horns sprout from her forehead; leaves and flowers alternately bloom and wither on them as her face contorts with emotion.

	 stats:
	 -hella endurance, int, and str
	 -lots o' lust resist
	 -lots o' hp
	 -good armor and regenerates hp/lust every round; but much less so of all three if Jojo is burning her shit
	 -rooted in place, so med-low spd; however, if PC fails a run check he is automatically constricted
	 -not for pussies; this fight should be almost unwinnable without Jojo unless you are wicked lucky or have a super-sploity build
	 -basically requires luck plus any of firebreath level grindan, stun abuse, or blood mage whitefire/arouse abuse
	 */

	//Attack:
	//[monster] whips out at you with branches and roots!

	//attack noun: lash
	//Failing to Escape -Z
	public escapeFailWithHolli() {
		DisplayText().clear();
		DisplayText("You ");
		if (player.canFly()) DisplayText("beat your wings and ");
		DisplayText("try to escape, but " + short + " wraps one of her writhing roots around your [leg], slamming you to the ground and tying you up with several more!  \"<i>And just where do you think you're going, my little meat?</i>\" she hisses.  Her bark splits open, exposing her body, and a green shaft snakes out of her crotch, sprouting thorns and blooming into a rose at the tip.  She holds the drooling blossom over your [face] as she forces your mouth open with her roots!");
		//hp loss, begin lust constrict next round
		let damage: number = 15;
		damage = player.takeDamage(damage);
		DisplayText(" (" + damage + ")\n\n");
		player.statusAffects.add(StatusAffectType.HolliConstrict, 0, 0, 0, 0);
		combatRoundOver();
	}

	//End of Round, if no Jojo Fire -Z
	public holliBonusHealing() {
		//(monster hp < 100%)
		if (findStatusAffect(StatusAffects.HolliBurning) < 0) {
			if (HPRatio() < 1 && HP > 1) {
				DisplayText("\n\nWhat wounds you have inflicted on the tree-demon overflow with sap, and begin to close!  You are left to watch helplessly as she recovers, knotting up her damaged bark until it looks as formidable as before.");
				addHP(25);
			}
			//[(monster lust > 0)]
			if (lust > 20 && lust <= 99) {
				DisplayText("\n\nA single rent forms in the tree's armor-like surface; you can actually see the demon touching her pussy inside, and her eyes roll back as she comes!  It looks like teasing her won't be very effective if you can't distract her from pleasuring herself inside her shell.");
				lust -= 10;
				//repair monster HP and lust by significant amounts
			}
		}
		//End of Round, Round 1 with Jojo Helping - make a little woodpile
		//output anything triggered under no Jojo Fire condition, then output
		if (statusAffects.has(StatusAffectType.JojoIsAssisting)) {
			if (statusAffects.has(StatusAffectType.HolliBurning)) {
				DisplayText("\n\nJojo continues to ferry firewood to stoke the blaze; flames lick at Holli, and her face contorts in anger.  Sap flows from her burn wounds, but much of it boils away before it can do her any good and her iron-hard bark is peeling in places.");
				//much less HP regain, no lust regain, monster armor lowered
				if (armorDef > 20) armorDef = 20;
				if (tou > 50) tou = 50;
				//Reduced Regen
				addHP(5);
				lust -= 2;
				if (lust < 20) lust = 20;
			}
			else if (findStatusAffect(StatusAffects.JojoPyre) < 0) {
				DisplayText("\n\nJojo throws another handful of dry leaves and sticks on the growing pile at the demon's roots, then waves and calls to you.  \"<i>[name]!  I've got enough dry wood at her base and I'm going to try to set it on fire!  Hold on just a bit longer; surcease is coming!</i>\"");
				statusAffects.add(StatusAffectType.JojoPyre, 0, 0, 0, 0);
			}
			//End of Round, Rounds 2 and 3 with Jojo Helping - light a spark
			else if (statusAffects.get(StatusAffectType.JojoPyre).value1 <= 1) {
				//display applicable EOR outputs for fire not lit, then these
				//Round 2:
				if (statusAffects.get(StatusAffectType.JojoPyre).value1 === 0) {
					DisplayText("\n\nJojo scurries toward the woodpile carrying a lit torch, but an eye opens on one of the demon's upper branches and she catches him with a root, sending him tumbling.  For a moment you lose hope, but the plucky monk rolls to the side before she can deliver another lash and from there to his feet.");
					statusAffects.get(StatusAffectType.JojoPyre).value1 = 1;
				}
				//Round 3:
				else {
					DisplayText("\n\nWary of the constant surveillance from above, Jojo serpentines toward the tree at high speed, dodging roots and branches with a burning stick held in his teeth.  Just as he gets close enough to throw, a root sweeps low and sends him sprawling onto his own torch, catching some of his fur alight!  Without hesitation, he rolls toward the tinder pile and shoves a burning hand into the leaf litter.  As the ring of flammable material catches and the demon screams her frustration, he retreats to the woods, beating his arm with his dirt-smeared robe to put it out.");
					statusAffects.add(StatusAffectType.HolliBurning, 0, 0, 0, 0);
				}

			}
		}
		combatRoundOver();
	}

	//if player uses whitefire/firebreath successfully, suppress these, go to 'Fire Lit' EOR events, and output additional line after the attack:
	public lightHolliOnFireMagically() {
		if (statusAffects.has(StatusAffectType.JojoIsAssisting)) {
			if (findStatusAffect(StatusAffects.HolliBurning) < 0) {
				DisplayText("The magical fire effectively ignites a wide swath of Jojo's tinder, and the demon howls in rage.  Seeing this, Jojo drops the burning torch he carries and turns back toward the forest to fetch more tinder.\n\n");
				statusAffects.add(StatusAffectType.HolliBurning, 0, 0, 0, 0);
			}
		}
	}

	//Monster Specials -Z
	//fuckin' Jumanji flower darts -Z
	private fuckinJamanjiFlowerDarts() {
		DisplayText("A blossom opens up on a high branch of the tree, revealing an evil-looking eye surrounded by vicious spines.  With a gesture, " + short + " fires several at you!");

		//Blinded - no hit penalty
		if (statusAffects.has(StatusAffectType.Blind)) DisplayText("  Though the demon herself is blinded, the fresh eye on the flower seems more than capable of aiming for her!");
		if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) {
			DisplayText("  Nimbly, you step aside and let the darts whistle by.");
		}
		//Hit
		else {
			DisplayText("  The darts find flesh, and you feel yourself slowing down drastically; all you want to do as the plant woman's poison takes you is fuck and sleep.  \"<i>Just give up,</i>\" Holli coos.  \"<i>Think how good it would be to fall into my arms and ");
			if (player.torso.cocks.count > 0) DisplayText("come inside me");
			else DisplayText("have me inside you");
			DisplayText(", forever...</i>\"");
			//lust damage, fatigue damage, light HP damage
			game.fatigue(10);
			game.player.stats.lust += 25;
			let damage: number = 20 + randInt(10);
			damage = player.takeDamage(damage);
			DisplayText(" (" + damage + ")");
		}
		combatRoundOver();
	}

	//constrict -Z
	private holliConstrictAttack() {
		DisplayText("A forest of thick roots bursts from the ground and several lash toward your [legs], trying to ensnare you!");
		//Blinded - hit penalty, but not 100%
		if (statusAffects.has(StatusAffectType.Blind) && randInt(6) === 0) {
			DisplayText("  Luckily, the demon's blindness makes it fairly easy to dodge the grasping roots, though there are a few close scrapes.");
		}
		//Miss
		if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) {
			DisplayText("  It's a narrow thing, but you manage to avoid the roots - one of them almost grabs you, but you duck aside and let it find only its neighbor.");
		}
		//Hit
		else {
			DisplayText("  She latches onto you with a painful smack and several more root tentacles join the first; as she pulls you close, her bark opens and a long, phallic stalk extends from her crotch, wrapped in thorns and flowering with a rose!  It caresses your face, then dangles the blossom above your mouth, dripping her sap.  Several of the roots pry your jaws apart, forcing you to drink the tainted fluids from her pseudo-cock!  \"<i>What do you think of my little sap rose?</i>\"");
			//plus med HP damage on turn one, plus med-heavy lust damage every turn while constricted
			//sap rose shitposting
			let damage: number = 10 + randInt(5);
			damage = player.takeDamage(damage);
			game.player.stats.lust += 15;
			player.statusAffects.add(StatusAffectType.HolliConstrict, 0, 0, 0, 0);
		}
		combatRoundOver();
	}

	public struggleOutOfHolli() {
		DisplayText().clear();
		//Boost odds of success. Round 3 guaranteed.
		player.statusAffects.get(StatusAffectType.HolliConstrict).value1 = 9;
		//Struggle Succeed
		//if demon/dragon tongue, automatic success
		if (player.torso.head.face.tongue.type > TongueType.HUMAN) {
			DisplayText("You can't move an arm nor a [leg] to bat the flower away... but she's literally holding your mouth open.  Your long tongue rolls out, gripping and ripping out several of the petals on the end of her stalk!  Holli screams and her roots slacken, allowing you to batter your way out of them.");
			player.statusAffects.remove("HolliConstrict");
		}
		//else if normal str-based success
		else if (player.stats.str / 10 + randInt(20) + 1 + player.statusAffects.get(StatusAffectType.HolliConstrict).value1 > 30) {
			DisplayText("You manage to force the roots open when the distracted Holli begins to stroke her plant-shaft, pulling out of the bindings just as a drop of sap oozes out and falls where you were standing.  You're free!");
			//sap rose pls go
			player.statusAffects.remove("HolliConstrict");
		}
		//Struggle Fail/Wait
		else {
			DisplayText("You try to escape the entangling roots, but cannot break their grip!  ");
			waitForHolliConstrict(false);
			return;
		}
		combatRoundOver();
	}

	public waitForHolliConstrict(newScreen: boolean = true) {
		if (newScreen) DisplayText().clear();
		DisplayText("The ominous roseate shaft hovers over you, and its owner strokes the base lewdly, moaning.  \"<i>Oooh, gonna... cum!</i>\" she shrieks.  As a low moan escapes her, the stalk bloats and begins to spill milky-white sap into your mouth!  Held rigid, you're eventually forced to swallow just to breathe; the sap slides into your stomach and warmth radiates to your midsection and groin, making you feel flushed and hot.  Holli sighs in satisfaction, evidently more relaxed after her climax.");
		//lower monster lust by medium-lots and apply med sens-based lust damage
		lust -= 20;
		if (lust < 20) lust = 20;
		game.dynStats("lus", 15 + player.stats.sens / 5);
		combatRoundOver();
	}

	//heal -Z
	//used if monster HP < some level
	private healHolli() {
		DisplayText().clear();
		DisplayText("The bark splits part way and the woman's mouth suddenly explodes with color, her lips folding out into a rather yonic-looking orchid.  Copious white-tinted sap oozes from the bloom, coating her bark and healing the lesions.  Petals rustle as she speaks wetly through it.  \"<i>Your efforts are nothing!  Throw yourself on my mercy; be my slave and do my bidding!</i>\"");
		//heal some fuckin' hp
		addHP(200);
		combatRoundOver();
	}

	override protected performCombatAction() {
		if (HP < 50 && randInt(2) === 0) healHolli();
		else if (randInt(4) === 0 && !player.statusAffects.has(StatusAffectType.HolliConstrict)) holliConstrictAttack();
		else if (randInt(2) === 0) fuckinJamanjiFlowerDarts();
		else eAttack();
		holliBonusHealing();
	}

	public defeated(hpVictory: boolean) {
		game.holliScene.defeatHolli();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		game.holliScene.enjoyYourBadEndBIYAAAATCH();
	}


	public teased(lustDelta: number) {
		if (statusAffects.has(StatusAffectType.HolliBurning)) {
			DisplayText("Holli doesn't even seem to notice, so concerned is she with defeating you before the mounting bonfire causes her any more pain.");
			lustDelta = 0;
		}
		applyTease(lustDelta);
	}

	public Holli() {
		this.a = "";
		this.short = "Holli";
		this.imageName = "holli";
		this.long = "Marae's offshoot, Holli stands rooted in front of you.  Solid black eyes with golden pupils stare out at you.  Her normally-nude body is concealed inside her tree, though occasionally she will flash you the devilish grin of a sadistic temptress and the bark will split to reveal a pale, jiggling bit of flesh.  A pair of gnarled oak horns sprout from her forehead; leaves and flowers alternately bloom and wither on them as her face contorts with emotion.";
		// this.plural = false;
		this.createCock(12, 2, CockType.HUMAN);
		this.balls = 0;
		this.ballSize = 0;
		this.cumMultiplier = 3;
		this.hoursSinceCum = 20;
		this.createVagina(false, VaginaWetness.WET, VaginaLooseness.LOOSE);
		this.statusAffects.add(StatusAffectType.BonusVCapacity, 20, 0, 0, 0));
		createBreastRow(Appearance.breastCupInverse("E"));
		this.torso.butt.looseness = ButtLooseness.TIGHT;
		this.torso.butt.wetness = ButtWetness.NORMAL;
		this.tallness = randInt(12) + 55;
		this.torso.hips.rating = HipRating.CURVY;
		this.torso.butt.rating = ButtRating.LARGE;
		this.skin.tone = "black";
		this.torso.neck.head.hair.color = "sandy-blonde";
		this.torso.neck.head.hair.length = 15;
		this.baseStats.str = 150;
this.baseStats.tou = 80;
this.baseStats.spe = 80;
this.baseStats.int = 85;
		this.baseStats.lib = 75;
this.baseStats.sens = 40;
this.baseStats.cor = 80;
		this.weaponName = "branches";
		this.weaponVerb = "branchy thwack";
		this.armorName = "bark";
		this.armorDef = 40;
		this.bonusHP = 1000;
		this.lust = 20;
		this.lustVuln = .2;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 20;
		this.gems = 0;
		this.drop = NO_DROP;
		checkMonster();
	}

}

