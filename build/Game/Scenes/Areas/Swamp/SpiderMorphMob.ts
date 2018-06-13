export class SpiderMorphMob extends Monster {
	//==============================
	// SPOIDAH HORDE COMBAT SHIZZLE HERE!
	//==============================
	private spiderStandardAttack() {
		//SPIDER HORDE ATTACK - Miss (guaranteed if turns 1-3 and PC lost to Kiha)
		if (statusAffects.has(StatusAffectType.MissFirstRound) || combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) {
			statusAffects.remove("MissFirstRound");
			DisplayText("A number of spiders rush at you, trying to claw and bite you.  You manage to beat them all back, though, with some literal covering fire from Kiha.");
		}
		//SPIDER HORDE ATTACK - Hit
		else {
			DisplayText("A number of spiders rush at you, trying to claw and bite you.  You manage to knock most of them away, but a few nasty hits manage to punch through your [armorName].  ");
			//Determine damage - str modified by enemy toughness!
			let damage: number = int((str + weaponAttack) - randInt(player.stats.tou) - player.armorDef) + 20;
			if (damage > 0) damage = player.takeDamage(damage);
			if (damage <= 0) {
				damage = 0;
				if (randInt(player.armorDef + player.stats.tou) < player.armorDef) DisplayText("You absorb and deflect every " + weaponVerb + " with your " + player.inventory.equipment.armor.displayName + ".");
				else DisplayText("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.");
			}
			else if (damage < 6) DisplayText("You are struck a glancing blow by " + a + short + "! (" + damage + ")");
			else if (damage < 11) DisplayText(capitalA + short + " wounds you! (" + damage + ")");
			else if (damage < 21) DisplayText(capitalA + short + " staggers you with the force of " + pronoun3 + " " + weaponVerb + "! (" + damage + ")");
			else if (damage > 20) {
				DisplayText(capitalA + short + " <b>mutilate");
				DisplayText("</b> you with " + pronoun3 + " powerful " + weaponVerb + "! (" + damage + ")");
			}
			if (damage > 0) {
				if (lustVuln > 0 && player.inventory.equipment.armor.displayName === "barely-decent bondage straps") {
					if (!plural) DisplayText("\n" + capitalA + short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.");
					else DisplayText("\n" + capitalA + short + " brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.");
					lust += 10 * lustVuln;
				}
			}
			statScreenRefresh();
		}
		kihaSPOIDAHAI();
	}

	//SPIDER HORDE WEB - Hit
	private spoidahHordeWebLaunchahs() {
		//SPIDER HORDE WEB - Miss (guaranteed if turns 1-3 and PC lost to Kiha)
		if (statusAffects.has(StatusAffectType.MissFirstRound) || combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) {
			DisplayText("One of the driders launches a huge glob of webbing right at you!  Luckily, Kiha manages to burn it out of the air with a well-timed gout of flame!");
			combatRoundOver();
		}
		else {
			DisplayText("Some of the spiders and driders launch huge globs of wet webbing right at you, hitting you in the torso!  You try to wiggle out, but it's no use; you're stuck like this for now.  Though comfortingly, the driders' open stance and self-satisfaction allow Kiha to blast them in the side with a huge conflagration!");
			//(PC cannot attack or use spells for one turn; can use Magical Special and Possess)
			player.statusAffects.add(StatusAffectType.UBERWEB, 0, 0, 0, 0);
			HP -= 250;
			combatRoundOver();
		}
	}

	private kihaSPOIDAHAI() {
		DisplayText("[pg]");
		game.DisplaySprite(72);
		DisplayText("While they're tangled up with you, however, Kiha takes the opportunity to get in a few shallow swings with her axe, to the accompaniment of crunching chitin.");
		//horde loses HP
		HP -= 50;
		combatRoundOver();
	}

	override protected performCombatAction() {
		game.DisplaySprite(72);
		if (randInt(2) === 0 || player.statusAffects.has(StatusAffectType.UBERWEB)) spiderStandardAttack();
		else spoidahHordeWebLaunchahs();
	}


	public defeated(hpVictory: boolean) {
		game.kihaFollower.beatSpiderMob();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		if (pcCameWorms) {
			DisplayText("\n\nThe spiders smile to one at another as they watch your display, then close in...");
			return { next: game.endLustLoss };
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
		this.torso.butt.looseness = ButtLooseness.STRETCHED;
		this.torso.butt.wetness = ButtWetness.SLIME_DROOLING;
		this.tallness = randInt(8) + 70;
		this.torso.hipRating = HipRating.AMPLE + 2;
		this.torso.butt.rating = ButtRating.LARGE;
		this.skin.tone = "red";
		this.torso.neck.head.hair.color = "black";
		this.torso.neck.head.hair.length = 15;
		this.baseStats.str = 60;
this.baseStats.tou = 50;
this.baseStats.spe = 99;
this.baseStats.int = 99;
		this.baseStats.lib = 35;
this.baseStats.sens = 35;
this.baseStats.cor = 20;
		this.weaponName = "claws";
		this.weaponVerb = "claws";
		this.armorName = "chitin";
		this.bonusHP = 1200;
		this.lustVuln = .2;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 18;
		this.gems = randInt(25) + 40;
		this.special1 = game.packAttack;
		this.special2 = game.lustAttack;
		this.tailType = TailType.SPIDER_ABDOMEN;
		this.drop = NO_DROP;
		checkMonster();
	}

}
