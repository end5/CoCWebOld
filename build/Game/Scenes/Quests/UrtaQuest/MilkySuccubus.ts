export class MilkySuccubus extends AbstractSuccubus {

	override protected performCombatAction(): void {
		if (findStatusAffect(StatusAffects.MilkyUrta) < 0 && randInt(3) === 0) cowCubiMilkSprayAttack();
		else if (HP < 400) drinkMinoCum();
		else if (player.stats.HP < 100) eAttack();
		else if (player.stats.lust >= 90) succubusTease();
		else if (randInt(2) === 0) succubusTease();
		else eAttack();
	}

	private cowCubiMilkSprayAttack(): void {
		//Lasts a couple turns like the goblin lust poison?
		DisplayText("\"<i>How about a taste?</i>\"  The succubus asks, pressing her tits together.  Before you can reply, a veritable jet of milk sprays in your direction!\n");
		//Miss:
		if (randInt(20) + 1 + player.stats.spe / 20 > 17) {
			DisplayText("With your trained reflexes, you manage to duck and roll, narrowly avoiding getting sprayed with milk.");
			DisplayText("\n\n\"<i>Such a waste.</i>\"  The succubus pouts.  \"<i>No worries, I'll just have Fido clean it up later... perhaps I'll even have you do it later, when you become mine.</i>\"  The succubus giggles.");
			kGAMECLASS.player.stats.lust += 6;
		}
		//Hit:
		else {
			DisplayText("All you manage to do is cover your face; the rest of you, however, gets completely soaked in the demon's corrupted milk.  Looking down at yourself, you realize that you are panting, and the places where the milk splashed your fur begin to heat up.  Oh no! <b>You'd better finish off this succubus before you succumb to your lusts!</b>");
			kGAMECLASS.player.stats.lust += 15;
			statusAffects.add(StatusAffectType.MilkyUrta, 3, 0, 0, 0);
		}
		combatRoundOver();
	}

	private drinkMinoCum(): void {
		DisplayText("Smiling wryly and licking her lips, the succubus-cow procures a bottle of her pet's cum with her probing tail.");
		//Success:
		if (findStatusAffect(StatusAffects.DrankMinoCum) < 0 || findStatusAffect(StatusAffects.DrankMinoCum2) < 0) {
			DisplayText("\n\nSmiling triumphantly, she takes the bottle and opens it with a pop, drinking the contents with glee.  When done, she throws the bottle away and smacks her lips.  \"<i>Nothing like a bottle of minotaur cum to get you back on your feet, right?</i>\"  She grins, her pussy dripping with more juices.");
			lust += 25;
			HP += 400;
			if (findStatusAffect(StatusAffects.DrankMinoCum) < 0) statusAffects.add(StatusAffectType.DrankMinoCum, 0, 0, 0, 0);
				else statusAffects.add(StatusAffectType.DrankMinoCum2, 0, 0, 0, 0);
		}
		//Failure:
		else {
			DisplayText("\n\nShe frowns and looks behind her, pouting slightly when she turns to look back at you.  \"<i>Seems like I'm all out of cum.</i>\"  She grins evilly.  \"<i>I'll just have to get more after I'm done with you.</i>\"");
		}
		combatRoundOver();
	}

	private succubusTease(): void {
		if (randInt(4) === 0) DisplayText("Turning around, the succubus begins to bounce her rather round derriere in your direction, the cheeks lewdly clapping together with each change in direction, exposing her dark anal star and juicy snatch, literally gushing forth a stream of lubricants.  Her eyes glow with faint, purple light as she whispers, \"<i>Don't you just want to... slide on in?</i>\"");
		else if (randInt(3) === 0) DisplayText("The succubus squeezes her spotted, sweat-oiled breasts together, squirting out trickles of fresh, creamy, succubi milk.  Bending down, she laps at her own bounty, taking to meet your eyes, her own glowing violet.  You can feel her next words as much as hear them, reaching into your brain and stirring a familiar heat in your loins.  \"<i>Giving in would mean pleasure unending, my dear vixen.</i>\"");
		else if (randInt(2) === 0) DisplayText("The succubus turns slightly and slowly bends over, sliding her hands down the sides of her milk laden jugs. \"<i>Mmm, would you help a poor girl relax? These things need some attention,</i>\" she says with a lust filled moan as her hands reach her multitude of nipples.");
		else DisplayText("The succubus leans forwards holding her tits, while wrapping her fingers around her nipples.  \"<i>My boobs are soo full.  Would you like to help me drain them?</i>\" she says with a husky voice.");
		kGAMECLASS.player.stats.lust += 20;
		combatRoundOver();
	}

	public defeated(hpVictory: boolean): void {
		game.urtaQuest.urtaBeatsUpCowcubi();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		game.urtaQuest.urtaLosesToCowCubi();
	}


	public teased(lustDelta: number): void {
		DisplayText(capitalA + short + " smiles, rubbing her hands across herself as she watches your display.  She does not seem greatly affected by your show - at least in the sense of increasing arousal.  She does seem oddly more... vital, as if she drew strength from the very display you put on.");
		str += 5;
		HP += 50;
		applyTease(lustDelta);
	}

	public MilkySuccubus() {
		this.a = "the ";
		this.short = "milky succubus";
		this.imageName = "milkysuccubus";
		this.long = "You are fighting a milky, cow-like succubus.  She stands about seven feet tall and is hugely voluptuous, with breasts three times the size of her head, tipped with a cluster of four obscenely teat-like nipples.  Her hips flare out into an exaggerated hourglass shape, with a long tail tipped with a fleshy arrow-head spade that waves above her spankable butt.  A small cowbell is tied at the base of the arrow-head with a cute little ribbon.  Wide, cow-like horns, easily appropriate for a minotaur, rise from her head, and she flicks bovine ears about the sides of her head whilst sashaying from side to side on demonic, high-heeled feet.  Her skin is a vibrant purple with splotches of shiny black here and there, including one large spot covering her right eye.  She's using a leather whip as a weapon.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.SLAVERING, VaginaLooseness.NORMAL);
		this.statusAffects.add(StatusAffectType.BonusVCapacity, 300, 0, 0, 0);
		createBreastRow(Appearance.breastCupInverse("G"));
		this.torso.butt.looseness = ButtLooseness.STRETCHED;
		this.torso.butt.wetness = ButtWetness.SLIME_DROOLING;
		this.tallness = randInt(9) + 60;
		this.torso.hipRating = HipRating.CURVY;
		this.torso.butt.rating = ButtRating.LARGE + 1;
		this.torso.hips.legs.type = LegType.DEMONIC_HIGH_HEELS;
		this.skin.tone = "blue";
		this.torso.neck.head.hair.color = "black";
		this.torso.neck.head.hair.length = 13;
		this.baseStats.str = 75;
this.baseStats.tou = 50;
this.baseStats.spe = 125;
this.baseStats.int = 95;
		initLibSensCor(90, 60, 99);
		this.weaponName = "whip";
		this.weaponVerb = "whipping";
		this.weaponAttack = 10;
		this.weaponPerk = "";
		this.weaponValue = 150;
		this.armorName = "demonic skin";
		this.armorDef = 10;
		this.bonusHP = 700;
		this.lust = 40;
		this.lustVuln = .3;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 16;
		this.gems = randInt(25) + 10;
		this.additionalXP = 50;
		this.drop = NO_DROP;
		this.hornType = HornType.DRACONIC_X2;
		this.horns = 2;
		this.wingType = WingType.BAT_LIKE_TINY;
		this.wingDesc = "tiny hidden";
		this.tailType = TailType.DEMONIC;
		this.special1 = kissAttack;
		this.special2 = seduceAttack;
		this.special3 = whipAttack;
		this.drop = NO_DROP;
		checkMonster();
	}

}

