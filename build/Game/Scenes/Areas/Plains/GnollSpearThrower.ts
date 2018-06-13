/**
 * ...
 * @author ...
 */
export class GnollSpearThrower extends Monster {
	private hyenaPhysicalAttack() {
		let damage: number = 0;
		//return to combat menu when finished
		return { next: game.playerMenu };
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText(capitalA + short + " completely misses you with a blind attack!\n");
			//See below, removes the attack count once it hits rock bottom.
			if (statusAffects.get(StatusAffectType.Attacks).value1 === 0) statusAffects.remove("Attacks");
			//Count down 1 attack then recursively call the function, chipping away at it.
			if (statusAffects.get(StatusAffectType.Attacks).value1 - 1 >= 0) {
				addStatusValue(StatusAffects.Attacks, 1, -1);
				eAttack();
			}
			return;
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("You see the gnoll's black lips pull back ever so slightly and the powerful muscles in her shapely thighs tense moments before she charges.  With a leap you throw yourself to the side, feeling the wind and fury pass through where you had just been standing.  You gracefully turn to face the hyena as she does the same, knowing that could have been very bad.");
			return;
		}
		//Determine if evaded
		if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
			DisplayText("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.\n");
			//See below, removes the attack count once it hits rock bottom.
			if (statusAffects.get(StatusAffectType.Attacks).value1 === 0) statusAffects.remove("Attacks");
			//Count down 1 attack then recursively call the function, chipping away at it.
			if (statusAffects.get(StatusAffectType.Attacks).value1 - 1 >= 0) {
				addStatusValue(StatusAffects.Attacks, 1, -1);
				eAttack();
			}
			return;
		}
		//("Misdirection"
		if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' attacks.\n");
			//See below, removes the attack count once it hits rock bottom.
			if (statusAffects.get(StatusAffectType.Attacks).value1 === 0) statusAffects.remove("Attacks");
			//Count down 1 attack then recursively call the function, chipping away at it.
			if (statusAffects.get(StatusAffectType.Attacks).value1 - 1 >= 0) {
				addStatusValue(StatusAffects.Attacks, 1, -1);
				eAttack();
			}
			return;
		}
		//Determine if cat'ed
		if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("With your incredible flexibility, you squeeze out of the way of " + a + short + "");
			if (plural) DisplayText("' attacks.\n");
			else DisplayText("'s attack.\n");
			//See below, removes the attack count once it hits rock bottom.
			if (statusAffects.get(StatusAffectType.Attacks).value1 === 0) statusAffects.remove("Attacks");
			//Count down 1 attack then recursively call the function, chipping away at it.
			if (statusAffects.get(StatusAffectType.Attacks).value1 - 1 >= 0) {
				addStatusValue(StatusAffects.Attacks, 1, -1);
				eAttack();
			}
			return;
		}
		//Determine damage - str modified by enemy toughness!
		damage = int((str + weaponAttack) - Math.random() * (player.stats.tou) - player.armorDef);
		if (damage > 0) damage = player.takeDamage(damage);
		if (damage <= 0) {
			damage = 0;
			//Due to toughness or amor...
			if (randInt(player.armorDef + player.stats.tou) < player.armorDef) DisplayText("The gnoll before you suddenly charges, almost too fast to see.  Twin fists slam into your " + player.inventory.equipment.armor.displayName + " with enough force to stagger you, but the force is absorbed without doing any real damage.  As jaws powerful enough to crush bone flash at your neck, you are able to twist to the side, letting the furious hyena slip by you.");
			else DisplayText("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.");
		}
		else {
			if (damage < 10) DisplayText("The gnoll runs forward, fury in her dark eyes as twin fists glance off your chest.  The glancing blow sends her off balance and the flashing ivory jaws barely miss your throat.  You push back, stumbling away from the furious hyena. (" + damage + ")");
			else DisplayText("The gnoll rushes forward, almost too fast to detect before twin fists slam into your torso.  Before you can recover, ivory jaws flash before your eyes and you feel the sharp teeth start to clamp onto the " + player.skin.desc + " of your neck.  Blinding pain causes you to fling yourself backwards, away from the teeth and drawing angry scrapes as you escape the jaws.  You roll away before picking yourself up, the hyena moving confidently towards you as you try to shake off the pain from the blow. (" + damage + ")");
		}
		if (damage > 0) {
			if (short === "fetish zealot") {
				DisplayText("\nYou notice that some kind of unnatural heat is flowing into your body from the wound");
				if (player.stats.int > 50) DisplayText(", was there some kind of aphrodisiac on the knife?");
				else DisplayText(".");
				game.dynStats("lus", (player.stats.lib / 20 + randInt(4) + 1));
			}
			if (lustVuln > 0 && player.inventory.equipment.armor.displayName === "barely-decent bondage straps") {
				if (!plural) DisplayText("\n" + capitalA + short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.");
				else DisplayText("\n" + capitalA + short + " brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.");
				lust += 5 * lustVuln;
			}
		}
		statScreenRefresh();
		DisplayText("\n");
		combatRoundOver();
	}

	//<Writers note: I recommend that the javelin have a chance to greatly decrease speed for the remaining battle.  I am writing the flavor text for this event if you choose to include it>
	private hyenaJavelinAttack() {
		let damage: number = 0;
		let slow: number = 0;
		//<Hyena Attack 2 – Javelin – Unsuccessful – Dodged>
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText("The gnoll pulls a javelin from behind her and throws it at you, but blind as she is, it goes wide.");
		}
		//Determine if dodged!
		else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("The gnoll pulls a long, dark wooden javelin from over her shoulder.  Her spotted arm strikes forward, launching the missile through the air.  The spear flashes through the distance towards your vulnerable form.  Even as you see doom sailing towards you, a primal instinct to duck pulls you down, and you feel the wind from the massive missile as it passes close to your ear.");
		}
		//Determine if evaded
		else if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
			DisplayText("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s thrown spear.\n");
		}
		//("Misdirection"
		else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' thrown spear.\n");
		}
		//Determine if cat'ed
		else if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("With your incredible flexibility, you squeeze out of the way of " + a + short + "'s thrown spear.");
		}
		//<Hyena Attack 2 – Javelin – Unsuccessful – Absorbed>
		else if (player.armorDef > 10 && randInt(2) === 0) {
			DisplayText("The gnoll pulls a long, dark wooden javelin from over her shoulder.  Her spotted arm strikes forward, launching the missile through the air.  The spear flashes through the air but hits at an angle, sliding off your " + player.inventory.equipment.armor.displayName + " without doing any damage.  It disappears into the grass.");
		}
		else if (player.perks.has(PerkType.Resolute) && player.stats.tou >= 75) {
			DisplayText("You resolutely ignore the spear, brushing the blunted tip away when it hits you.\n");
		}
		//<Hyena Attack 2 – Javelin – Successful – Player Entangled>
		else if (randInt(3) >= 1) {
			damage = player.takeDamage(25 + randInt(20));
			DisplayText("The gnoll pulls a long, black javelin from over her shoulder.  Her spotted arm strikes forward, launching the missile through the air.  You attempt to dive to the side, but are too late.  The powerful shaft slams, hard, into your back.  Pain radiates from the powerful impact.  Instead of piercing you, however, the tip seems to explode into a sticky goo that instantly bonds with your " + player.inventory.equipment.armor.displayName + ".  The four foot, heavy shaft pulls down on you awkwardly, catching at things and throwing your balance off.  You try to tug the javelin off of you but find that it has glued itself to you.  It will take time and effort to remove; making it impossible to do while a dominant hyena stalks you. (" + damage + ")");
			if (!player.statusAffects.has(StatusAffectType.GnollSpear)) player.statusAffects.add(StatusAffectType.GnollSpear, 0, 0, 0, 0);
			slow = 15;
			while (slow > 0 && player.stats.spe > 2) {
				slow--;
				player.addStatusValue(StatusAffects.GnollSpear, 1, 1);
				player.stats.spe--;
				showStatDown('spe');
				// speDown.visible = true;
				// speUp.visible = false;
			}
		}
		//<Hyena Attack 2 – Javelin – Successful – Player Not Entangled>
		else {
			damage = player.takeDamage(25 + randInt(20));
			DisplayText("The gnoll pulls a long, dark wooden javelin from over her shoulder.  Her spotted arm strikes forward, launching the missile through the air.  The javelin flashes through the intervening distance, slamming into your chest.  The blunted tip doesn't skewer you, but pain radiates from the bruising impact. (" + damage + ")");
		}
		combatRoundOver();
	}

	//<Writer's Note: With the third attack, I intend that the damage be increased based on the breast size of the player.  Thus, the text will vary if the player is flat-chested as indicated by colored text.>
	private hyenaSnapKicku() {
		let damage: number = 0;
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText("The gnoll tries to catch you with a brutal snap-kick, but blind as she is, she completely misses.");
		}
		//Determine if dodged!
		else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("The gnoll grins at you before striding forward and pivoting.  A spotted leg snaps up and out, flashing through the air towards your " + Desc.Breast.describeChest(character) + ".  You step back just in time, robbing the blow of force.  The paw lightly strikes your torso before the female hyena springs back, glaring at you.");
		}
		//Determine if evaded
		else if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
			DisplayText("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s snap-kick.\n");
		}
		//("Misdirection"
		else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' snap-kick.\n");
		}
		//Determine if cat'ed
		else if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("With your incredible flexibility, you squeeze out of the way of " + a + short + "'s snap-kick.");
		}
		//Determine damage - str modified by enemy toughness!
		else {
			damage = player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating;
			if (damage > 20) damage = 20;
			damage += int(str - Math.random() * (player.stats.tou) - player.armorDef);
			if (damage > 0) damage = player.takeDamage(damage);
			//No damage
			if (damage <= 0) {
				DisplayText("The gnoll tries to catch your " + Desc.Breast.describeChest(character) + " with a snap-kick, but you manage to block the vicious blow.");
			}
			//<Hyena Attack 3 – Snap Kick – Successful>
			else {
				DisplayText("A glint enters the dark eyes of the gnoll before she strides forward and pivots.  A long, spotted leg snaps up and out to slam against your " + Desc.Breast.describeChest(character));
				if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1) DisplayText(", sending a wave of pain through the sensitive flesh");
				DisplayText(".  A small, traitorous part of you can't help but notice a flash of long, dark flesh beneath her loincloth even as you stagger back from the impact. (" + damage + ")");
				game.player.stats.lust += 2;
			}
		}
		combatRoundOver();
	}

	private hyenaArousalAttack() {
		//Success = cor+lib > randInt(150)
		let chance: number = randInt(150);
		//<Hyena Attack 4 – Arousal Attack – Highly Successful>
		if (player.stats.cor + player.stats.lib > chance + 50) {
			DisplayText("A wry grin spreads across the gnoll's face before she sprints towards you.  Too fast to follow, she flies forward, and you desperately brace for an impact that doesn't come.  Instead of striking you, two spotted paws clamp behind your neck and pull your head down, planting your face against her leather loincloth.  A powerful, musky smell burns in your nose and the feel of firm flesh behind the flimsy leather leaves a tingling sensation along your face.  She holds you there, pressed against her groin for several moments, desire growing deep within your body, before you find the strength and will to pull away.  The amazon grins, letting you stumble back as you try to fight off the feel of her body.\n\n");
			game.dynStats("lus", (25 + player.stats.lib / 20 + player.stats.sens / 5));
		}
		//<Hyena Attack 4 – Arousal Attack – Mildly Successful>
		else if (20 + player.stats.cor + player.stats.lib > chance) {
			DisplayText("A lazy grin spreads across the gnoll's face before she sprints towards you.  Too fast to follow, she flies forward, and you desperately brace for an impact that doesn't come.  Instead of striking you, two spotted paws clamp behind your neck and pull your head down, planting your face against her leather loincloth.  A powerful, musky smell burns in your nose and the feel of firm flesh behind the flimsy leather leaves a tingling sensation along your face.  Instinctively, you tear away from the hold, stumbling away from the sensations filling your mind, though some desire remains kindled within you.");
			game.dynStats("lus", (15 + player.stats.lib / 20 + player.stats.sens / 5));
		}
		//<Hyena Attack 4 – Arousal Attack – Unsuccessful>
		else {
			DisplayText("A knowing glint fills the dark eyes of the gnoll before she sprints forward.  Your muscles tense as she reaches you and starts to lock two spotted paws behind your neck.  She pulls you down towards her musky crotch, but just as you brush her loincloth, you twist away.  The hyena snarls in frustration, and you're left wondering if that was her idea of foreplay.");
		}
		combatRoundOver();
	}

	public eAttack() {
		let damage: number = 0;
		//return to combat menu when finished
		return { next: game.playerMenu };
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText(capitalA + short + " completely misses you with a blind attack!\n");
			//See below, removes the attack count once it hits rock bottom.
			if (statusAffects.get(StatusAffectType.Attacks).value1 === 0) statusAffects.remove("Attacks");
			//Count down 1 attack then recursively call the function, chipping away at it.
			if (statusAffects.get(StatusAffectType.Attacks).value1 - 1 >= 0) {
				statusAffects.get(StatusAffectType.Attacks).value1 = -1;
				eAttack();
			}
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("You see the gnoll's black lips pull back ever so slightly and the powerful muscles in her shapely thighs tense moments before she charges.  With a leap you throw yourself to the side, feeling the wind and fury pass through where you had just been standing.  You gracefully turn to face the hyena as she does the same, knowing that could have been very bad.");
		}
		//Determine if evaded
		if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
			DisplayText("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.\n");
			//See below, removes the attack count once it hits rock bottom.
			if (statusAffects.get(StatusAffectType.Attacks).value1 === 0) statusAffects.remove("Attacks");
			//Count down 1 attack then recursively call the function, chipping away at it.
			if (statusAffects.get(StatusAffectType.Attacks).value1 - 1 >= 0) {
				statusAffects.get(StatusAffectType.Attacks).value1 = -1;
				eAttack();
			}
		}
		//("Misdirection"
		if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' attacks.\n");
			//See below, removes the attack count once it hits rock bottom.
			if (statusAffects.get(StatusAffectType.Attacks).value1 === 0) statusAffects.remove("Attacks");
			//Count down 1 attack then recursively call the function, chipping away at it.
			if (statusAffects.get(StatusAffectType.Attacks).value1 - 1 >= 0) {
				statusAffects.get(StatusAffectType.Attacks).value1 = -1;
				eAttack();
			}
		}
		//Determine if cat'ed
		if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("With your incredible flexibility, you squeeze out of the way of " + a + short + "");
			if (plural) DisplayText("' attacks.\n");
			else DisplayText("'s attack.\n");
			//See below, removes the attack count once it hits rock bottom.
			if (statusAffects.get(StatusAffectType.Attacks).value1 === 0) statusAffects.remove("Attacks");
			//Count down 1 attack then recursively call the function, chipping away at it.
			if (statusAffects.get(StatusAffectType.Attacks).value1 - 1 >= 0) {
				statusAffects.get(StatusAffectType.Attacks).value1 = -1;
				eAttack();
			}
		}
		//Determine damage - str modified by enemy toughness!
		damage = int((str + weaponAttack) - Math.random() * (player.stats.tou) - player.armorDef);
		if (damage > 0) damage = player.takeDamage(damage);
		if (damage <= 0) {
			damage = 0;
			//Due to toughness or amor...
			if (randInt(player.armorDef + player.stats.tou) < player.armorDef) DisplayText("The gnoll before you suddenly charges, almost too fast to see.  Twin fists slam into your " + player.inventory.equipment.armor.displayName + " with enough force to stagger you, but the force is absorbed without doing any real damage.  As jaws powerful enough to crush bone flash at your neck, you are able to twist to the side, letting the furious hyena slip by you.");
			else DisplayText("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.");
		}
		else {
			if (damage < 10) DisplayText("The gnoll runs forward, fury in her dark eyes as twin fists glance off your chest.  The glancing blow sends her off balance and the flashing ivory jaws barely miss your throat.  You push back, stumbling away from the furious hyena. (" + damage + ")");
			else DisplayText("The gnoll rushes forward, almost too fast to detect before twin fists slam into your torso.  Before you can recover, ivory jaws flash before your eyes and you feel the sharp teeth start to clamp onto the " + player.skin.desc + " of your neck.  Blinding pain causes you to fling yourself backwards, away from the teeth and drawing angry scrapes as you escape the jaws.  You roll away before picking yourself up, the hyena moving confidently towards you as you try to shake off the pain from the blow. (" + damage + ")");
		}
		if (damage > 0) {
			if (short === "fetish zealot") {
				DisplayText("\nYou notice that some kind of unnatural heat is flowing into your body from the wound");
				if (player.stats.int > 50) DisplayText(", was there some kind of aphrodisiac on the knife?");
				else DisplayText(".");
				game.dynStats("lus", (player.stats.lib / 20 + randInt(4) + 1));
			}
			if (lustVuln > 0 && player.inventory.equipment.armor.displayName === "barely-decent bondage straps") {
				if (!plural) DisplayText("\n" + capitalA + short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.");
				else DisplayText("\n" + capitalA + short + " brush against your exposed skin and jerk back in surprise, coloring slightly from seeing so much of you revealed.");
				lust += 5 * lustVuln;
			}
		}
		statScreenRefresh();
		DisplayText("\n");
		combatRoundOver();
	}

	public defeated(hpVictory: boolean) {
		if (short === "alpha gnoll") {
			game.DisplayText().clear();
			DisplayText("The gnoll alpha is defeated!  You could use her for a quick, willing fuck to sate your lusts before continuing on.  Hell, you could even dose her up with that succubi milk you took from the goblin first - it might make her even hotter.  Do you?");
			game.
			game.addButton(0, "Fuck", game.urtaQuest.winRapeHyenaPrincess);
			game.addButton(1, "Succ Milk", game.urtaQuest.useSuccubiMilkOnGnollPrincesses);
			game.addButton(4, "Leave", game.urtaQuest.urtaNightSleep);
		} else {
			game.plains.gnollSpearThrowerScene.hyenaVictory();
		}
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		if (short === "alpha gnoll") {
			game.urtaQuest.loseToGnollPrincessAndGetGangBanged();
		} else if (pcCameWorms) {
			DisplayText("\n\nYour foe doesn't seem put off enough to leave...");
			return { next: game.endLustLoss };
		} else {
			game.plains.gnollSpearThrowerScene.hyenaSpearLossAnal();
		}
	}

	public GnollSpearThrower() {
		this.a = "the ";
		this.short = "gnoll spear-thrower";
		this.imageName = "gnollspearthrower";
		this.long = "You are fighting a gnoll.  An amalgam of voluptuous, sensual lady and snarly, pissed off hyena, she clearly intends to punish you for trespassing.  Her dark-tan, spotted hide blends into a soft cream-colored fur covering her belly and two D-cup breasts, leaving two black nipples poking through the fur.  A crude loincloth is tied around her waist, obscuring her groin from view.  A leather strap cuts between her heavy breasts, holding a basket of javelins on her back.  Large, dish-shaped ears focus on you, leaving no doubt that she can hear every move you make.  Sharp, dark eyes are locked on your body, filled with aggression and a hint of lust.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.DROOLING, VaginaLooseness.LOOSE);
		createBreastRow(Appearance.breastCupInverse("D"));
		this.torso.butt.looseness = ButtLooseness.STRETCHED;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.statusAffects.add(StatusAffectType.BonusACapacity, 25, 0, 0, 0);
		this.tallness = 72;
		this.torso.hipRating = HipRating.AMPLE;
		this.torso.butt.rating = ButtRating.TIGHT;
		this.skin.tone = "tawny";
		this.skin.type = SkinType.FUR;
		//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SkinType.FUR];
		this.torso.neck.head.hair.color = "black";
		this.torso.neck.head.hair.length = 22;
		this.baseStats.str = 85;
this.baseStats.tou = 60;
this.baseStats.spe = 100;
this.baseStats.int = 50;
		this.baseStats.lib = 65;
this.baseStats.sens = 45;
this.baseStats.cor = 60;
		this.weaponName = "teeth";
		this.weaponVerb = "bite";
		this.weaponAttack = 0;
		this.weaponPerk = "";
		this.weaponValue = 25;
		this.armorName = "skin";
		this.armorDef = 2;
		this.bonusHP = 250;
		this.lust = 30;
		this.lustVuln = .35;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 10;
		this.gems = 10 + randInt(5);
		this.drop = new ChainedDrop().add(consumables.GROPLUS, 1 / 5).add(consumables.INCUBID, 1 / 2).elseDrop(consumables.BROWN_D);
		this.special1 = hyenaJavelinAttack;
		this.special2 = hyenaSnapKicku;
		this.special3 = hyenaArousalAttack;
		checkMonster();
	}
}