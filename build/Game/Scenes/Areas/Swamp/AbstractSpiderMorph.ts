/**
 * Created by aimozg on 03.01.14.
 */

export class AbstractSpiderMorph extends Monster {
	override protected performCombatAction() {
		if (player.stats.spe >= 2 && randInt(2) === 0) {
			spiderMorphWebAttack();
		}
		else if (!player.statusAffects.has(StatusAffectType.WebSilence) && randInt(3) === 0) {
			spiderSilence();
		}
		else if (!player.statusAffects.has(StatusAffectType.Disarmed) && player.weaponName != "fists" && randInt(3) === 0) {
			spiderDisarm();
		}
		else if (randInt(2) === 0 || player.stats.spe < 2) getBitten();
		else eAttack();
	}

	/**
	 * -Web - lowers speed by 25 each application and disables
	 * flight once hit.*/
	public spiderMorphWebAttack() {
		DisplayText("Turning to the side, " + a + short + " raises " + mf("his", "her") + " abdomen and unleashes a spray of webbing in your direction!  ");
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText(capitalA + short + " misses completely due to their blindness.");
		}
		//Determine if dodged!
		else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("You dodge away, avoiding the sticky strands!");
		}
		//Determine if evaded
		else if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
			DisplayText("You evade, avoiding the sticky strands!");
		}
		//("Misdirection"
		else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("Your misleading movements allow you to easily sidestep the sticky strands!");
		}
		//Determine if cat'ed
		else if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("You throw yourself out of the way with cat-like agility at the last moment, avoiding " + mf("his", "her") + " attack.\n");
		}
		//Got hit
		else {
			if (!player.statusAffects.has(StatusAffectType.Web)) {
				DisplayText("The silky strands hit you, webbing around you and making it hard to move with any degree of speed.");
				if (player.canFly()) DisplayText("  Your wings struggle uselessly in the bindings, no longer able to flap fast enough to aid you.");
				DisplayText("\n");
				player.statusAffects.add(StatusAffectType.Web, 0, 0, 0, 0);
			}
			else {
				DisplayText("The silky strands hit you, weighing you down and restricting your movement even further.\n");
			}
			//Only apply as much speed slow as necessary.
			let amount: number = 25;
			if (player.stats.spe - amount < 1) {
				amount = player.stats.spe - 1;
			}
			//Apply changes, display arrows, and track speed lost
			player.stats.spe -= amount;
			showStatDown('spe');
			// speUp.visible = false;
			// speDown.visible = true;
			player.statusAffects.get(StatusAffectType.Web).value1 = amount;

		}
		combatRoundOver();
	}

	/**-Bite - Raises arousal by 30*/
	public getBitten() {
		//-Languid Bite - Inflicted on PC's who have been reduced to 1 speed by webbing, raises arousal by 60.
		if (player.stats.spe < 2 && player.statusAffects.has(StatusAffectType.Web)) {
			DisplayText("The arachnid aggressor slowly saunters forward while you struggle under the heaps of webbing, gently placing " + mf("his", "her") + " arms around your back in a tender hug.  " + mf("His", "Her") + " fangs slide into your neck with agonizing slowness, immediately setting off a burning heat inside you that makes you dizzy and weak.  ");
			if (player.torso.cocks.count > 0) {
				DisplayText(player.Desc.Cock.describeMultiCockSimpleOne(player, true) + " turns rock hard and squirts weakly, suddenly so aroused that it starts soaking your " + player.inventory.equipment.armor.displayName);
				if (player.torso.vaginas.count > 0) DisplayText(" along with your " + player.Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)));
				DisplayText(".  ");
			}
			else if (player.torso.vaginas.count > 0) DisplayText("Your " + player.Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + " grows wet as hell and so sensitive that every step and movement reminds you of the powerful need for something between your sopping nether-lips.  ");
			DisplayText("While " + mf("his", "her") + " venom pours into you, the spider-" + mf("boy", "girl") + " reaches into your gear to play with your " + player.Desc.Breast.describeNipple(character, character.torso.chest.get(0)) + ", and you moan like a whore from the dual stimulation of " + mf("his", "her") + " venom and nipple-play.\n\n");
			if (count > 0) DisplayText("The saucy dominatrix exhausts her supply of aphrodisiac toxin for the moment and finally steps back, admiring her work and giving you a lewd wink.  You ");
			else DisplayText("The confident male exhausts his supply of aphrodisiac toxin for the moment and finally steps back, admiring his work and giving you a lewd wink.  You ");
			game.player.stats.lust += 60;
			if (player.stats.lust > 99) DisplayText("wobble, utterly defeated and about to cave in to your lust.");
			else DisplayText("struggle not to fall down and start masturbating on the spot.");
			DisplayText("\n");
			combatRoundOver();
			return;
		}
		DisplayText("The spider-" + mf("boy", "girl") + " lunges forward with " + mf("his", "her") + " mouth open, " + mf("his", "her") + " two needle-like fangs closing rapidly.  ");
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText(capitalA + short + " misses completely due to their blindness.");
		}
		//Determine if dodged!
		else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("You dodge away, avoiding " + mf("his", "her") + " bite!");
		}
		//Determine if evaded
		else if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
			DisplayText("You evade, avoiding the bite!");
		}
		//("Misdirection"
		else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("Your misleading movements allow you to easily sidestep the spider bite!");
		}
		//Determine if cat'ed
		else if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("You throw yourself out of the way with cat-like agility at the last moment, avoiding " + mf("his", "her") + " attack.\n");
		}
		else {
			if (randInt(5) === 0) {
				DisplayText("You react far too slowly, and before you can even think to dodge, " + mf("he", "she") + "'s bitten deep into you, pumping large squirts of venom deep into your body.  Unnatural heat rolls through you, pooling in your groin until you're lewdly bucking your hips against the spider-morph's thigh.  " + mf("He", "She") + " pulls out and steps back, ");
				if (count > 0) DisplayText("casually cupping her breasts while you watch with venom-dilated eyes, slowly touching yourself.  Once she stops, you shake your head and master yourself, remembering that you're supposed to be fighting this " + mf("boy", "girl") + "!\n");
				else DisplayText("casually tugging on his relatively short, girthy dick as you watch with venom-dilated eyes, slowly touching yourself.  Once he stops, you shake your head and master yourself, remembering that you're supposed to be fighting this " + mf("boy", "girl") + "!\n");
				game.player.stats.lust += 50;
			}
			else {
				DisplayText("You react too slowly, and before you can dodge, " + mf("he", "she") + "'s bitten you, leaving behind a burning venom that warms your blood and stokes your lust.\n");
				game.player.stats.lust += 30;
			}
		}
		combatRoundOver();
	}

	/**-Disarm - hits the PC's weapon with web and sticks it to a
	 nearby tree, reducing PC's attack to 0 for the rest of the fight.*/
	public spiderDisarm() {
		DisplayText(capitalA + short + " shifts and sprays webbing, aiming a tight strand of it at your " + player.weaponName + ".  ");
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText("The blind web-shot goes horribly wide, missing you entirely.");
		}
		//Determine if dodged!
		else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("You pull your weapon back and the webbing goes wide, missing entirely.");
		}
		//Determine if evaded
		else if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
			DisplayText("You pull your weapon back evasively and the webbing goes wide, missing entirely!");
		}
		//("Misdirection"
		else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("Your misleading movements allow you to easily sidestep the webbing!");
		}
		//Determine if cat'ed
		else if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("You throw yourself out of the way with cat-like agility at the last moment, avoiding " + mf("his", "her") + " attack.\n");
		}
		else if (player.weaponName === "spiked gauntlet" || player.weaponName === "hooked gauntlets") {
			DisplayText("The webbing hits your ");
			if (player.weaponName === "spiked gauntlet") DisplayText("gauntlet, but it's so effectively fastened to your hands that the attack fails to disarm you.\n");
			else DisplayText("gauntlets, but they're so effectively fastened to your hands that the attack fails to disarm you.\n");
		}
		else {
			DisplayText("You don't react fast enough and the sticky webbing pulls your " + player.weaponName + " out of your grip, gluing it to a nearby tree.  There's no way to get it back right now, you'll have to fight bare-handed!");
			Flags.list[FlagEnum.PLAYER_DISARMED_WEAPON_ID] = player.weapon.id;
			player.setWeapon(WeaponLib.FISTS);
			//No longer appears to be used				Flags.list[FlagEnum.PLAYER_DISARMED_WEAPON_ATTACK] = player.weaponAttack;
			//				player.weapon.unequip(player,false,true);
			player.statusAffects.add(StatusAffectType.Disarmed, 0, 0, 0, 0);
		}
		combatRoundOver();
	}

	/**-Silence - sprays webs on the PC's mouth, silencing them for 1 to 3 turns.*/
	public spiderSilence() {
		DisplayText(capitalA + short + " squirts a concentrated spray of " + mf("his", "her") + " webs directly at your face!  ");
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText("The blind web-shot goes horribly wide, missing you entirely.");
		}
		//Determine if dodged!
		else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("You lean back and let them pass harmlessly overhead, avoiding the attack.");
		}
		//Determine if evaded
		else if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
			DisplayText("You pull your weapon back evasively and the webbing goes wide, missing entirely.");
		}
		//("Misdirection"
		else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("Your misleading movements allow you to easily sidestep the webbing!");
		}
		//Determine if cat'ed
		else if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("You throw yourself out of the way with cat-like agility at the last moment, avoiding " + mf("his", "her") + " attack.\n");
		}
		else {
			DisplayText("They hit you before you can move, covering most of your nose and mouth and making it hard to breathe.  You'll be unable to use your magic while you're constantly struggling just to draw air!\n");
			player.statusAffects.add(StatusAffectType.WebSilence, 0, 0, 0, 0);
		}
		combatRoundOver();
	}
}
}
