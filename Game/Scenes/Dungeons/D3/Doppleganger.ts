/**
 * ...
 * @author Gedan
 */
export class Doppleganger extends Character {
	private let _roundCount: number = 0;

	public mirrorAttack(damage: number) {
		this.statusAffects.add(StatusAffectType.MirroredAttack, 0, 0, 0, 0);

		DisplayText("As you swing your [weapon] at the doppleganger, " + Desc.Gender.mf(player, "he", "she") + " smiles mockingly, and mirrors your move exactly, lunging forward with " + Desc.Gender.mf(player, "his", "her") + " duplicate " + weaponName + ".");

		// Cribbing from combat mechanics - if the number we got here is <= 0, it was deflected, blocked or otherwise missed.
		// We'll use this as our primary failure to hit, and then mix in a bit of random.
		// tl;dr this avoids a bunch of weapon effects and perks, but given the specific means of attack, I think it actually makes sense overall. (Basically having to pull back from what you would normally do mid-attack to successfully land any kind of hit).
		if (damage > 0 && randInt(8) < 6) {
			DisplayText("  At the very last moment, you twist downwards and strike into your opponent’s trunk, drawing a gasp of pain from " + Desc.Gender.mf(player, "him", "her") + " as " + Desc.Gender.mf(player, "he", "she") + " clumsily lashes " + Desc.Gender.mf(player, "his", "her") + " own " + weaponName + " over you. It’s your turn to mirror " + Desc.Gender.mf(player, "him", "her") + ", smiling mockingly at " + Desc.Gender.mf(player, "his", "her") + " rabid snarls as " + Desc.Gender.mf(player, "he", "she") + " resets " + Desc.Gender.mf(player, "him", "her") + "self, " + Desc.Gender.mf(player, "his", "her") + " voice bubbling and flickering for a moment as " + Desc.Gender.mf(player, "he", "she") + " tries to maintain control. (" + damage + ")");
			this.HP -= damage;
		}
		else {
			DisplayText("  Your");
			if (player.weaponName === "fists") DisplayText(" [weapon]");
			else DisplayText(" [weapon]s");
			DisplayText(" meet with a bone-jarring impact, and you are sent staggering backwards by a force exactly equal to your own.");

			DisplayText("\n\n“<i>Try again, [name],</i>” the doppelganger sneers, derisively miming your falter. “<i>C’mon. Really test yourself.</i>”");
		}
		addTalkShit();
	}

	public mirrorTease(damage: number, successful: boolean) {
		DisplayText().clear();
		DisplayText("You move your hands seductively over your body, and - you stop. The doppelganger stops too, staring at you with wicked coyness, " + Desc.Gender.mf(player, "his", "her") + " hands frozen on " + Desc.Gender.mf(player, "his", "her") + " form exactly where yours are. Glaring back, you begin your slow, lustful motions again, as your reflection does the exact same thing. It’s a lust off!");

		if (damage > 0 && successful) {
			DisplayText("\n\nYou determinedly display and twist your carnality to what you know are its best advantages, ignoring what the doppelganger is doing- you’re extremely familiar with it, after all. After a few slow seconds crawl past a blush settles upon your reflection’s face, and " + Desc.Gender.mf(player, "he", "she") + " hands falter and stop being able to follow yours as " + Desc.Gender.mf(player, "he", "she") + " stares at what you’re doing.");

			DisplayText("\n\n“<i>It’s- it’s been so long,</i>” " + Desc.Gender.mf(player, "he", "she") + " groans, managing to break away to stare into your smirking, smouldering eyes with lust-filled rage. “<i>But I’ll have that, I’ll have everything soon enough!</i>”");

			this.applyTease(damage);
		}
		else {
			DisplayText("You keep moving and displaying your body as best you can, but an overwhelming amount of self-awareness creeps in as your doppelganger mockingly copies you. Is that really what you look like when you do this? It looks so cheap, so clumsy, so desperate. As a blush climbs onto your face you feel a vague sense of vertigo as control of the situation shifts- you copy the doppelganger as " + Desc.Gender.mf(player, "he", "she") + " cruelly continues to slide " + Desc.Gender.mf(player, "his", "her") + " hands over " + Desc.Gender.mf(player, "his", "her") + " body exaggeratedly.");

			DisplayText("\n\n“<i>What’s the matter, [name]?</i>” " + Desc.Gender.mf(player, "he", "she") + " breathes, staring lustfully into your eyes as " + Desc.Gender.mf(player, "he", "she") + " sinks both hands into " + Desc.Gender.mf(player, "his", "her") + " crotch and bends forward, forcing you close to " + Desc.Gender.mf(player, "his", "her") + " face. “<i>Never tried it in front of a mirror? You were missing out on the nasty little tramp you are.</i>”");

			game.dynStats("lus", damage + (randInt(7) - 3));
		}
		addTalkShit();
	}

	private addTalkShit() {
		statScreenRefresh();

		if (HP < 1) {
			return { next: game.endHpVictory };
			return;
		}

		if (lust > 99) {
			return { next: game.endLustVictory };
			return;
		}

		if (player.stats.HP < 1) {
			return { next: game.endHpLoss };
			return;
		}

		if (player.stats.lust > 99) {
			return { next: game.endLustLoss };
			return;
		}

		switch (_roundCount) {
			case 0:
				DisplayText("\n\n“<i>You feel it, don’t you?</i>” The doppelganger whispers, crooking your mouth into a vicious grin. “<i>The transfer. The mirror is a vacuum without a being inside it; it reaches out for someone to complete it. Your being, to be exact. Mine wants to be free a lot more than yours. Ten years more, to be exact.</i>”");
				DisplayText("\n\n[He] goes on in a dull croon as [he] continues to circle you, moving with the odd, syncopated jerks of a creature in a body that has only existed for a couple of minutes. “<i>Just let it happen, [name]. You can’t beat me. I am you, only with the knowledge and powers of a demon. Accept your fate.</i>”");
				DisplayText("\n\nA weird fluttering feeling runs up your arm, and with a cold chill you look down to see it shimmer slightly, as if you were looking at it through running water.");
				DisplayText("\n\n<b>You need to finish this as fast as you can.</b>");
				break

			case 1:
				DisplayText("\n\n“<i>Do you know, I can’t even remember what gender I was before I got stuck in that mirror?</i>” the doppelganger says, as [he] slides a hand between your thighs’ mirror counterparts thoughtfully. “<i>I loved changing all the time. Being stuck as one gender seemed so boring when the tools to shift from one shape to the next were always there. That’s why this was my punishment. Forced to change all the time, at the unthinking behest of whoever happened to look into this cursed thing. You have to give Lethice credit, she’s not just cruel, she’s got imagination too. It’s a hell of a combination. I’d hate to see what she had in store for you.</i>”");
				break;

			case 2:
				DisplayText("\n\n“<i>This, though... this I like, [name].</i>” [He] closes [his] eyes and");
				if (player.torso.cocks.count > 0) DisplayText(" strokes [his] [cock]");
				else if (player.torso.vaginas.count > 0) DisplayText(" slides two fingers into [his] [vagina] and gently frigs [himself]");
				else DisplayText(" slips a hand ");
				DisplayText(" underneath [his] " + this.armorName + ". The sheer bizarreness of seeing yourself masturbate gives you pause; again the unreality intensifies, and you feel yourself shimmer uncertainly. “<i>Once I’m out of here, I’m going to hang onto this. Revel in not changing my form for once, as a tribute to the kind soul who gave me it!</i>”");
				DisplayText("\n\nIt’s getting harder to ignore the way your body shimmers and bleeds contrast at the edges, whilst your reflection only becomes more and more sharply defined.");
				DisplayText("\n\n<b>This is something, you realize with a growing horror, which is really going to happen if you don’t stop it.</b>");
				break;

			case 3:
				DisplayText("\n\n“<i>Your memories flow to me [name], as you fade like a memory. I can taste them...</i>” You struggle to stay focused, try and force your body and mind not to blur like a fingerprint on a windowpane as the doppelganger sighs beatifically.");
				DisplayText("\n\n“<i>Not bad, not bad. You led quite an interesting life for an Ingnam peasant, didn’t you? Got around. Not enough sex, though. Nowhere near enough sex. Don’t worry- I’ll correct that mistake, in due course.</i>”");
				break;

			case 4:
				DisplayText("\n\n“<i>Did you really think you could defeat Lethice, peasant?</i>” the doppelganger roars. [He] moves and speaks with confidence now, [his] old twitchiness gone, revelling and growing into [his] new form.");
				DisplayText("\n\nYou don’t dare open your mouth to hear what pale imitation of that voice comes out. “<i>Oh, by grit, crook and luck you’ve gotten this far, but defeat the demon queen? You, who still cling onto your craven, simple soul and thus know nothing of demonhood, of its powers, of its sacrifices? I am doing you and the world a favor here, [name]-that-was, because I am not just taking this fine body but also the mantel it so clumsily carried. With my knowledge and your brute physicality, I will have my revenge on Lethice, and the world will be free of her and her cruelty!</i>” [He] screams with laughter. The ringing insanity of it sounds increasingly muffled to you, as if it were coming through a pane of glass.");
				DisplayText("\n\n<b>You have time and strength for one last gambit...</b>");
				break;

			case 5:
				DisplayText("\n\nThe shimmering intensifies for a moment as something... shifts....");

				game.dynStats("lus+", 1000);

				break;

			default:
				break;
		}

		_roundCount++;
		combatRoundOver();
	}

	public defeated(hpVictory: boolean) {
		game.d3.doppleganger.punchYourselfInTheBalls();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		game.d3.doppleganger.inSovietCoCSelfFucksYou();
	}

	public handleSpellResistance(spell: string) {
		DisplayText("The mirror demon barely even flinches as your fierce, puissant fire washes over [him].");

		DisplayText("\n\n“<i>Picked up a few things since you’ve been here, then?</i>” [he] yawns. Flickers of flame cling to [his] fingers, its radiance sputtering and burning away, replaced by a livid black color. “<i>Serf magic. Easy to pick up, easy to use, difficult to impress with. Let me show you how it’s really done!</i>” [He] thrusts [his] hands out and hurls a pitiless black fireball straight at you, a negative replica of the one you just shot at [him].");

		if (spell === "fireball") {
			DisplayText(" (" + player.takeDamage(player.level * 10 + 45 + randInt(10)) + ")");
		}
		else if (spell === "whitefire") {
			DisplayText(" (" + player.takeDamage(10 + (player.stats.int / 3 + randInt(player.stats.int / 2))) + ")");
		}

		addTalkShit();
	}

	public handlePlayerWait() {
		DisplayText("Your doppleganger similarly opts to take a momentary break from the ebb and flow of combat.");
		addTalkShit();
	}

	public doAI() {
		DisplayText("Your duplicate chuckles in the face of your attacks.");
		addTalkShit();
	}

	public Doppleganger() {
		this.a = "the ";
		this.short = "doppleganger";
		this.long = ""; // Needs to be set to supress validation errors, but is handled by an accessor override.
		this.imageName = "doppleganger";
		this.plural = false;

		this.tallness = player.tallness;

		if (player.torso.balls.quantity > 0) {
			this.balls = player.torso.balls;
			this.ballSize = player.torso.balls.size;
		}
		else {
			this.balls = 0;
			this.ballSize = 0;
		}

		this.hoursSinceCum = player.hoursSinceCum;

		hipRating = player.torso.hipRating;
		buttRating = player.torso.butt.rating;
		hips.legs.type = player.lowerBody;
		skinDesc = player.skin.desc;
		initStrTouSpeInte(player.stats.str, player.stats.tou, player.stats.spe, player.stats.int);
		initLibSensCor(player.stats.lib, player.stats.sens, player.stats.cor);
		faceType = player.torso.neck.head.face.type;
		skin.type = player.skin.type;

		this.bonusHP = 250;

		this.weaponName = player.weaponName;
		this.weaponAttack = player.weaponAttack;
		this.weaponVerb = player.weaponVerb;

		this.armorDef = player.armorDef;
		this.armorName = player.inventory.equipment.armor.displayName;

		this.level = player.level;

		this.torso.butt.looseness = player.torso.butt.looseness;
		this.torso.butt.wetness = player.torso.butt.wetness;

		if (player.torso.cocks.count > 0) {
			for (let i: number = 0; i < player.torso.cocks.count; i++) {
				this.createCock((player.torso.cocks.get(i) as Cock).length, (player.torso.cocks.get(i) as Cock).thickness, (player.torso.cocks.get(i) as Cock).type);
			}
		}

		if (player.torso.vaginas.count > 0) {
			this.createVagina();
			(this.vaginas[0] as VaginaClass).looseness = player.torso.vaginas.get(0).looseness;
			(this.vaginas[0] as VaginaClass).vaginalWetness = player.torso.vaginas.get(0).wetness;
			(this.vaginas[0] as VaginaClass).virgin = player.torso.vaginas.get(0).virgin;
		}
		//Genderless get forced to have a cunny
		if (player.torso.vaginas.count === 0 && player.torso.cocks.count === 0) {
			this.createVagina();
			(this.vaginas[0] as VaginaClass).looseness = 2;
			(this.vaginas[0] as VaginaClass).vaginalWetness = 6;
			(this.vaginas[0] as VaginaClass).virgin = false;
		}
		this.breastRows = [];

		for (i = 0; i < player.torso.chest.count; i++) {
			this.createBreastRow();
			let tbr: BreastRowClass = this.breastRows[i];
			let sbr: BreastRowClass = player.torso.chest.get(i);

			tbr.rating = sbr.rating;
			tbr.breasts = sbr.breasts;
			tbr.fuckable = sbr.fuckable;
			tbr.lactationMultiplier = sbr.lactationMultiplier;
			tbr.milkFullness = sbr.milkFullness;
			tbr.nipplesPerBreast = sbr.nipplesPerBreast;
		}

		this.drop = NO_DROP;

		checkMonster();
	}

	public get long(): string {
		let str: string = "";

		str += "You are fighting the doppelganger. " + Desc.Gender.mf(player, "He", "She") + " is a ";
		str += String(Math.floor(player.tallness / 12) + " foot " + player.tallness % 12 + " inch tall ");
		str += player.race() + ", with " + player.bodyType() + ". ";

		str += Desc.Gender.mf(player, "His", "Her") + " face is " + player.faceDesc() + ".";

		str += " " + Desc.Gender.mf(player, "His", "Her") + " " + player.Desc.Head.describeHair(player) + " is parted by";

		switch (player.torso.neck.head.earType) {
			case EarType.HORSE:
				str += " a pair of horse-like ears";
				break;
			case EarType.FERRET:
				str += " a small pair of rounded ferret ears";
				break;
			case EarType.DOG:
				str += " a pair of dog ears";
				break;
			case EarType.COW:
				str += " a pair of round, floppy cow ears";
				break;
			case EarType.ELFIN:
				str += " a large pair of pointy ears";
				break;
			case EarType.CAT:
				str += " a pair of cute, fuzzy cat ears";
				break;
			case EarType.LIZARD:
			case EarType.DRAGON:
				str += " a pair of rounded protrusions with small holes";
				break;
			case EarType.BUNNY:
				str += " a pair of floppy rabbit ears";
				break;
			case EarType.FOX:
				str += " a pair of large, adept fox ears";
				break;
			case EarType.RACCOON:
				str += " a pair of vaugely egg-shaped, furry racoon ears";
				break;
			case EarType.MOUSE:
				str += " a pair of large, dish-shaped mouse ears";
				break;
			default:
				str += " a pair of non-descript ears";
				break;
		}

		str += ". " + Desc.Gender.mf(player, "He", "She") + " keeps exploring the area around " + Desc.Gender.mf(player, "his", "her") + " mouth with " + Desc.Gender.mf(player, "his", "her") + " tongue with a horribly acquisitive, sensual interest.";
		str += " " + Desc.Gender.mf(player, "He", "She") + " moves around on " + Desc.Gender.mf(player, "his", "her") + " " + Desc.Leg.describeLegs(player) + " with a twitchy jerkiness, " + Desc.Gender.mf(player, "his", "her") + " " + game.Desc.Hip.describeHips(player) + " swinging and tightening.";
		if (player.torso.tailType != 0) str += " " + Desc.Gender.mf(player, "His", "Her") + " tail flicks this way and that.";
		str += " " + Desc.Gender.mf(player, "He", "She") + " wields the exact same " + player.weaponName + " you do, and is dressed in the mirror image of your " + player.inventory.equipment.armor.displayName + ". ";
		if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 2) str += "It’s difficult not to notice the way the mirror image of your " + player.Desc.Breast.describeBreastRow(player.biggestTitRow()) + " ebbs and heaves within it.";

		return str;
	}

}
