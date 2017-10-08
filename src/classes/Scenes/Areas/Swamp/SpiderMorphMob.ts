export default class SpiderMorphMob extends Monster {
	//==============================
	// SPOIDAH HORDE COMBAT SHIZZLE HERE!
	//==============================
	private spiderStandardAttack(): void {
		//SPIDER HORDE ATTACK - Miss (guaranteed if turns 1-3 and PC lost to Kiha)
		if (statusAffects.has("MissFirstRound") || combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) {
			statusAffects.remove("MissFirstRound");
			MainScreen.text("A number of spiders rush at you, trying to claw and bite you.  You manage to beat them all back, though, with some literal covering fire from Kiha.", false);
		}
		//SPIDER HORDE ATTACK - Hit
		else {
			MainScreen.text("A number of spiders rush at you, trying to claw and bite you.  You manage to knock most of them away, but a few nasty hits manage to punch through your [armorName].  ", false);
			//Determine damage - str modified by enemy toughness!
			let damage: number = int((str + weaponAttack) - rand(player.stats.tou) - player.armorDef) + 20;
			if (damage > 0) damage = player.takeDamage(damage);
			if (damage <= 0) {
				damage = 0;
				if (rand(player.armorDef + player.stats.tou) < player.armorDef) MainScreen.text("You absorb and deflect every " + weaponVerb + " with your " + player.inventory.armor.displayName + ".", false);
				else MainScreen.text("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.", false);
			}
			else if (damage < 6) MainScreen.text("You are struck a glancing blow by " + a + short + "! (" + damage + ")", false);
			else if (damage < 11) MainScreen.text(capitalA + short + " wounds you! (" + damage + ")", false);
			else if (damage < 21) MainScreen.text(capitalA + short + " staggers you with the force of " + pronoun3 + " " + weaponVerb + "! (" + damage + ")", false);
			else if (damage > 20) {
				MainScreen.text(capitalA + short + " <b>mutilate", false);
				MainScreen.text("</b> you with " + pronoun3 + " powerful " + weaponVerb + "! (" + damage + ")", false);
			}
			if (damage > 0) {
				if (lustVuln > 0 && player.inventory.armor.displayName == "barely-decent bondage straps") {
					if (!plural) MainScreen.text("\n" + capitalA + short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.", false);
					else MainScreen.text("\n" + capitalA + short + " brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.", false);
					lust += 10 * lustVuln;
				}
			}
			statScreenRefresh();
		}
		kihaSPOIDAHAI();
	}

	//SPIDER HORDE WEB - Hit
	private spoidahHordeWebLaunchahs(): void {
		//SPIDER HORDE WEB - Miss (guaranteed if turns 1-3 and PC lost to Kiha)
		if (statusAffects.has("MissFirstRound") || combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) {
			MainScreen.text("One of the driders launches a huge glob of webbing right at you!  Luckily, Kiha manages to burn it out of the air with a well-timed gout of flame!", false);
			combatRoundOver();
		}
		else {
			MainScreen.text("Some of the spiders and driders launch huge globs of wet webbing right at you, hitting you in the torso!  You try to wiggle out, but it's no use; you're stuck like this for now.  Though comfortingly, the driders' open stance and self-satisfaction allow Kiha to blast them in the side with a huge conflagration!", false);
			//(PC cannot attack or use spells for one turn; can use Magical Special and Possess)
			player.statusAffects.add(new StatusAffect("UBERWEB", 0, 0, 0, 0)));
			HP -= 250;
			combatRoundOver();
		}
	}

	private kihaSPOIDAHAI(): void {
		MainScreen.text("[pg]", false);
		game.spriteSelect(72);
		MainScreen.text("While they're tangled up with you, however, Kiha takes the opportunity to get in a few shallow swings with her axe, to the accompaniment of crunching chitin.", false);
		//horde loses HP
		HP -= 50;
		combatRoundOver();
	}

	override protected performCombatAction(): void {
		game.spriteSelect(72);
		if (rand(2) == 0 || player.statusAffects.has("UBERWEB")) spiderStandardAttack();
		else spoidahHordeWebLaunchahs();
	}


	public defeated(hpVictory: boolean): void {
		game.kihaFollower.beatSpiderMob();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			MainScreen.text("\n\nThe spiders smile to one at another as they watch your display, then close in...");
			doNext(game.endLustLoss);
		} else {
			game.kihaFollower.loseToSpiderMob();
		}
	}

	public SpiderMorphMob() {
		this.a = "the ";
		this.short = "mob of spiders-morphs";
		this.imageName = "spidermorphmob";
		this.long = "You are fighting a horde of spider-morphs!  A group of some two-dozen spiders and driders approaches you, all baring their teeth.  A pair of large, powerful driders lead the group, their corrupt, lusty stares sending shivers up your spine.  While " + (player.level <= 13 ? "you'd never face such a large horde on your own" : "you could probably handle them alone") + ", you have a powerful ally in this fight - the dragoness Kiha!";
		this.plural = true;
		this.pronoun1 = "they";
		this.pronoun2 = "them";
		this.pronoun3 = "their";
		this.createCock(9, 2, CockType.HUMAN);
		this.balls = 2;
		this.ballSize = 1;
		this.cumMultiplier = 3;
		// this.hoursSinceCum = 0;
		this.createVagina(false, VaginaWetness.SLICK, VaginaLooseness.LOOSE);
		createBreastRow(0);
		this.lowerBody.butt.analLooseness = ButtLooseness.STRETCHED;
		this.lowerBody.butt.analWetness = ButtWetness.SLIME_DROOLING;
		this.tallness = rand(8) + 70;
		this.lowerBody.hipRating = HipRating.AMPLE + 2;
		this.lowerBody.butt.buttRating = ButtRating.LARGE;
		this.skinTone = "red";
		this.upperBody.head.hairColor = "black";
		this.upperBody.head.hairLength = 15;
		initStrTouSpeInte(60, 50, 99, 99);
		initLibSensCor(35, 35, 20);
		this.weaponName = "claws";
		this.weaponVerb = "claws";
		this.armorName = "chitin";
		this.bonusHP = 1200;
		this.lustVuln = .2;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 18;
		this.gems = rand(25) + 40;
		this.special1 = game.packAttack;
		this.special2 = game.lustAttack;
		this.tailType = TailType.SPIDER_ABDOMEN;
		this.drop = NO_DROP;
		checkMonster();
	}

}
