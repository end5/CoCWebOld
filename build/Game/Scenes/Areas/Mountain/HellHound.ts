export class HellHound extends Monster {
	protected hellhoundFire() {
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind)) {
			DisplayText(capitalA + short + " completely misses you with a wave of dark fire! Thank the gods it's blind!");
			combatRoundOver();
			return;
		}
		/*if(player.hasStatusAffect(StatusAffects.Web_dash_Silence) >= 0) {
			DisplayText("You reach inside yourself to breathe flames, but as you ready to release a torrent of fire, it backs up in your throat, blocked by the webbing across your mouth.  It causes you to cry out as the sudden, heated force explodes in your own throat.\n");
			changeFatigue(10);
			takeDamage(10+randInt(20));
			enemyAI();
			return;
		}*/
		if (player.perks.has(PerkType.Evade) && player.stats.spe >= 35 && randInt(3) != 0) {
			DisplayText("Both the hellhound's heads breathe in deeply before blasting a wave of dark fire at you.  You easily avoid the wave, diving to the side and making the most of your talents at evasion.");
		}
		else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 20 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("Using Raphael's teachings and the movement afforded by your bodysuit, you anticipate and sidestep " + a + short + "'s fire.\n");
		}
		else if (player.perks.has(PerkType.Flexibility) && player.stats.spe > 30 && randInt(10) != 0) {
			DisplayText("Both the hellhound's heads breathe in deeply before blasting a wave of dark fire at you.  You twist and drop with incredible flexibility, watching the fire blow harmlessly overhead.");
		}
		else {
			//Determine the damage to be taken
			let temp: number = 15 + randInt(10);
			temp = player.takeDamage(temp);
			DisplayText("Both the hellhound's heads breathe in deeply before blasting a wave of dark fire at you. While the flames don't burn much, the unnatural heat fills your body with arousal. (" + temp + " damage)");
			game.dynStats("lus", 20 - (player.stats.sens / 10));
			statScreenRefresh();
			if (player.stats.HP <= 0) {
				return { next: game.endHpLoss };
				return;
			}
			if (player.stats.lust >= 100) {
				return { next: game.endLustLoss };
				return;
			}
		}
		return { next: game.playerMenu };
	}
	protected hellhoundScent() {
		if (player.statusAffects.has(StatusAffectType.NoFlee)) {
			if (spe === 100) {
				hellhoundFire();
				return;
			}
			else {
				DisplayText("The hellhound sniffs your scent again, seemingly gaining more and more energy as he circles faster around you.");
				spe = 100;
			}
		}
		else {
			spe += 40;
			DisplayText("The hellhound keeps his four eyes on you as he sniffs the ground where you were moments ago. He raises his heads back up and gives you a fiery grin - he seems to have acquired your scent!  It'll be hard to get away now...");
			player.statusAffects.add(StatusAffectType.NoFlee, 0, 0, 0, 0);
		}
		combatRoundOver();
		/*if(spe >= 80) {
			if(spe === 100) {
				hellhoundFire();
				return;
			}
			else {
				DisplayText("The hellhound sniffs your scent again, seemingly gaining more and more energy as he circles faster around you.");
				spe = 100;	
			}
		}
		else {
			spe += 40;
			DisplayText("The hellhound keeps his four eyes on you as he sniffs the ground where you were moments ago. He raises his heads back up and gives you a firey grin - He seems to have aquired you scent!  Running away will now be much more difficult...");
		}
		if(player.stats.HP <= 0) {
			return { next: endHpLoss };
			return;
		}
		if(player.stats.lust > 100) {
			return { next: endLustLoss };
			return;
		}
		return { next: 1 };*/
	}


	public defeated(hpVictory: boolean) {
		if (hpVictory) {
			DisplayText("The hellhound's flames dim and the heads let out a whine before the creature slumps down, defeated and nearly unconscious.", true);
			//Rape if not naga, turned on, and girl that can fit!
			if (player.torso.vaginas.count > 0 && player.stats.lust >= 33 && !player.torso.hips.legs.isNaga()) {
				DisplayText("  You find yourself musing that you could probably take advantage of the poor 'doggy'.  Do you fuck it?");
				game.simpleChoices("Fuck it", game.mountain.hellHoundScene.hellHoundPropahRape, "", null, "", null, "", null, "Leave", game.cleanupAfterCombat);
			} else {
				game.return { next: Scenes.camp.returnToCampUseOneHour };
			}
		} else {
			DisplayText("Unable to bear hurting you anymore, the hellhound's flames dim as he stops his attack. The two heads look at you, whining plaintively.  The hellhound slowly pads over to you and nudges its noses at your crotch.  It seems he wishes to pleasure you.\n\n", true);
			let temp2;
			if (player.gender > 0 && player.stats.lust >= 33) {
				DisplayText("You realize your desires aren't quite sated.  You could let it please you");
				//Rape if not naga, turned on, and girl that can fit!
				if (player.torso.vaginas.count > 0 && player.stats.lust >= 33 && !player.torso.hips.legs.isNaga()) {
					DisplayText(" or make it fuck you");
					temp2 = game.mountain.hellHoundScene.hellHoundPropahRape;
				}
				DisplayText(".  What do you do?");
				game.simpleChoices("Lick", game.mountain.hellHoundScene.hellHoundGetsRaped, "Fuck", temp2, "", null, "", null, "Leave", game.cleanupAfterCombat);
			}
			else {
				DisplayText("You turn away, not really turned on enough to be interested in such an offer.");
				game.return { next: Scenes.camp.returnToCampUseOneHour };
			}
		}
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		if (pcCameWorms) {
			DisplayText("\n\nThe hellhound snorts and leaves you to your fate.");
			return { next: game.cleanupAfterCombat };
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
		this.torso.butt.looseness = ButtLooseness.NORMAL;
		this.torso.butt.wetness = ButtWetness.NORMAL;
		this.tallness = 47;
		this.torso.hipRating = HipRating.AVERAGE;
		this.torso.butt.rating = ButtRating.AVERAGE + 1;
		this.torso.hips.legs.type = LegType.DOG;
		this.skin.tone = "black";
		this.skin.type = SkinType.FUR;
		//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SkinType.FUR];
		this.torso.neck.head.hair.color = "red";
		this.torso.neck.head.hair.length = 3;
		this.baseStats.str = 55;
this.baseStats.tou = 60;
this.baseStats.spe = 40;
this.baseStats.int = 1;
		this.baseStats.lib = 95;
this.baseStats.sens = 20;
this.baseStats.cor = 100;
		this.weaponName = "claws";
		this.weaponVerb = "claw";
		this.weaponAttack = 10;
		this.armorName = "thick fur";
		this.lust = 25;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 5;
		this.gems = 10 + randInt(10);
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
