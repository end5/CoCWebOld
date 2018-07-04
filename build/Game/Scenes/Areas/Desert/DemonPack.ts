export class DemonPack extends Character {


	override protected performCombatAction() {
		//Demon pack has different AI
		if (randInt(2) === 0)
			special1();
		else special2();
	}

	public defeated(hpVictory: boolean) {
		if (hpVictory) {
			DisplayText("You strike out and the last of the demons tumbles to the ground with a thud. You stand there for a second surrounded by dead or unconscious demons feeling like a god of battle. Then you realize that if a god of battle does exist he lives on a demonic plane like this, so to avoid insulting him you take your hands off your hips and your " + Desc.Leg.describeLegs(player) + " off the head of the demon leader before you start to search the bodies.", true);
			game.player.stats.lust += 1;
		} else {
			DisplayText("The demons stop attacking, and reach out to touch your body. Some are already masturbating like it's the only thing in the world and you know that right now, if you wanted to, you could make each and every one of them fuck you.");
		}
		if (statusAffects.has(StatusAffectType.phyllafight)) {
			return { next: game.desert.antsScene.consolePhylla };
		} else if (hpVictory) {
			game.return { next: Scenes.camp.returnToCampUseOneHour };
		} else {
			DisplayText("  Do you rape them?", true);
			game.doYesNo(rapeDemons, game.Scenes.camp.returnToCampUseOneHour);
		}
	}

	private rapeDemons() {
		DisplayText("You open your arms and step into the throng of eager demons. They jump eagerly to touch you, becoming more and more lust-frenzied every second. You take the nearest demon and throw it to the ground and without a moment's thought the rest of the group leap to join you in a thoughtless madness of lust...", true);
		return { next: game.desert.oasis.oasisSexing };
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		if (player.gender === Gender.NONE) {
			if (hpVictory) {
				DisplayText("You collapse before the demons, who laugh at your utter lack of male or female endowments, beating you until you pass out.", true);
			} else {
				DisplayText("You offer yourself to the demons, who promptly begin laughing at your lack of endowments.  They fall on you as one, beating you into unconsciousness.", true);
			}
			game.return { next: Scenes.camp.returnToCampUseOneHour };
		} else if (hpVictory) {
			DisplayText("The demons finally beat you down and you collapse onto the sand of the oasis. Almost immediately you feel demonic hands pressing and probing your prone form. You hear the leader of the group say something in a strange tongue but you have a feeling you know what it means. The demons dive onto your inert body with intent and begin to press themselves against you...", true);
			return { next: game.desert.oasis.oasisSexing };
		} else {
			DisplayText("You struggle to keep your mind on the fight and fail to do so. ", true);
			if (pcCameWorms) {
				DisplayText("\n\nThe demons joke and smile, obviously unconcerned with your state.\n\n");
			}
			if (player.torso.cocks.count > 0) {
				if (player.torso.cocks.count > 1) DisplayText("Each of y");
				else DisplayText("Y");
				DisplayText("our " + player.Desc.Cock.describeMultiCockShort(player) + " throbs ");
				if (player.torso.vaginas.count > 0) DisplayText(" and your ");
			}
			if (player.torso.vaginas.count > 0) {
				if (player.torso.cocks.count <= 0) DisplayText("Your ");
				DisplayText(game.Desc.Vagina.describeVagina(player, player.torso.vaginas.get(0)) + " burns ");
			}
			DisplayText("with arousal.  You make a grab for the nearest demon and catch a handful of jiggly breast. You try desperately to use your other arm to pull her closer to slake your thirst but you both go tumbling to the ground. The demonic leader laughs out loud and the rest of the tribe falls on you, grabbing for anything it can find.");
			return { next: game.desert.oasis.oasisSexing };
		}
	}


	public teased(lustDelta: number) {
		DisplayText("\n");
		if (lustDelta === 0) DisplayText("\n" + capitalA + short + " seems unimpressed.");
		else if (lustDelta > 0 && lustDelta < 5) DisplayText("The demons lessen somewhat in the intensity of their attack, and some even eye up your assets as they strike at you.");
		else if (lustDelta >= 5 && lustDelta < 10) DisplayText("The demons are obviously steering clear from damaging anything you might use to fuck and they're starting to leave their hands on you just a little longer after each blow. Some are starting to cop quick feels with their other hands and you can smell the demonic lust of a dozen bodies on the air.");
		else if (lustDelta >= 10) DisplayText("The demons are less and less willing to hit you and more and more willing to just stroke their hands sensuously over you. The smell of demonic lust is thick on the air and part of the group just stands there stroking themselves openly.");
		applyTease(lustDelta);
	}

	public DemonPack() {
		trace("DemonPack Constructor!");
		this.a = "the ";
		this.short = "demons";
		this.imageName = "demonmob";
		this.long = "The group is composed of roughly twenty tan-skinned demons, mostly humanoid in shape with many and varied corruptions across the mob. You see demonic high heels, twisting horns and swinging cocks of all shapes and sizes. There even seems to be a bull head in there somewhere. You also make out plenty of breasts ranging from tiny ones to a pair that requires a second person to carry them, and with those breasts a wide range of pussies, dripping and dry, sometimes nestled below some form of demonic dick.  The small tribe carries no weapons and what little clothing they wear is well-shredded, except for one hefty male wearing a cloak of what appears to be snakeskin across his broad shoulders." + (game.silly() ? "  You spot an odd patch that reads, \"<i>41st Engineer Company: Vaginal Clearance</i>\" on his shoulder." : "");
		this.plural = true;
		this.pronoun1 = "they";
		this.pronoun2 = "them";
		this.pronoun3 = "their";
		this.createCock(18, 2);
		this.createCock(18, 2, CockType.DEMON);
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
		this.baseStats.str = 80;
this.baseStats.tou = 10;
this.baseStats.spe = 10;
this.baseStats.int = 5;
		this.baseStats.lib = 50;
this.baseStats.sens = 60;
this.baseStats.cor = 80;
		this.weaponName = "claws";
		this.weaponVerb = "claw";
		this.armorName = "demonic skin";
		this.bonusHP = 200;
		this.lust = 30;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 6;
		this.gems = randInt(25) + 10;
		this.drop = new WeightedDrop().addMany(1,
			consumables.SUCMILK,
			consumables.INCUBID,
			consumables.OVIELIX,
			consumables.B__BOOK);
		this.special1 = game.packAttack;
		this.special2 = game.lustAttack;
		this.tailType = TailType.DEMONIC;
		this.hornType = HornType.DEMON;
		this.horns = 2;
		checkMonster();
	}

}

