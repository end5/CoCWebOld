/**
 * ...
 * @author Gedan
 */
export default class Doppleganger extends Monster {
	private let _roundCount: number = 0;

	public mirrorAttack(damage: number): void {
		this.statusAffects.add(new StatusAffect("MirroredAttack", 0, 0, 0, 0)));

		MainScreen.text("As you swing your [weapon] at the doppleganger, " + player.mf("he", "she") + " smiles mockingly, and mirrors your move exactly, lunging forward with " + player.mf("his", "her") + " duplicate " + weaponName + ".");

		// Cribbing from combat mechanics - if the number we got here is <= 0, it was deflected, blocked or otherwise missed.
		// We'll use this as our primary failure to hit, and then mix in a bit of random.
		// tl;dr this avoids a bunch of weapon effects and perks, but given the specific means of attack, I think it actually makes sense overall. (Basically having to pull back from what you would normally do mid-attack to successfully land any kind of hit).
		if (damage > 0 && rand(8) < 6) {
			MainScreen.text("  At the very last moment, you twist downwards and strike into your opponent’s trunk, drawing a gasp of pain from " + player.mf("him", "her") + " as " + player.mf("he", "she") + " clumsily lashes " + player.mf("his", "her") + " own " + weaponName + " over you. It’s your turn to mirror " + player.mf("him", "her") + ", smiling mockingly at " + player.mf("his", "her") + " rabid snarls as " + player.mf("he", "she") + " resets " + player.mf("him", "her") + "self, " + player.mf("his", "her") + " voice bubbling and flickering for a moment as " + player.mf("he", "she") + " tries to maintain control. (" + damage + ")");
			this.HP -= damage;
		}
		else {
			MainScreen.text("  Your");
			if (player.weaponName == "fists") MainScreen.text(" [weapon]");
			else MainScreen.text(" [weapon]s");
			MainScreen.text(" meet with a bone-jarring impact, and you are sent staggering backwards by a force exactly equal to your own.");

			MainScreen.text("\n\n“<i>Try again, [name],</i>” the doppelganger sneers, derisively miming your falter. “<i>C’mon. Really test yourself.</i>”");
		}
		addTalkShit();
	}

	public mirrorTease(damage: number, successful: boolean): void {
		MainScreen.clearText();
		MainScreen.text("You move your hands seductively over your body, and - you stop. The doppelganger stops too, staring at you with wicked coyness, " + player.mf("his", "her") + " hands frozen on " + player.mf("his", "her") + " form exactly where yours are. Glaring back, you begin your slow, lustful motions again, as your reflection does the exact same thing. It’s a lust off!");

		if (damage > 0 && successful) {
			MainScreen.text("\n\nYou determinedly display and twist your carnality to what you know are its best advantages, ignoring what the doppelganger is doing- you’re extremely familiar with it, after all. After a few slow seconds crawl past a blush settles upon your reflection’s face, and " + player.mf("he", "she") + " hands falter and stop being able to follow yours as " + player.mf("he", "she") + " stares at what you’re doing.");

			MainScreen.text("\n\n“<i>It’s- it’s been so long,</i>” " + player.mf("he", "she") + " groans, managing to break away to stare into your smirking, smouldering eyes with lust-filled rage. “<i>But I’ll have that, I’ll have everything soon enough!</i>”");

			this.applyTease(damage);
		}
		else {
			MainScreen.text("You keep moving and displaying your body as best you can, but an overwhelming amount of self-awareness creeps in as your doppelganger mockingly copies you. Is that really what you look like when you do this? It looks so cheap, so clumsy, so desperate. As a blush climbs onto your face you feel a vague sense of vertigo as control of the situation shifts- you copy the doppelganger as " + player.mf("he", "she") + " cruelly continues to slide " + player.mf("his", "her") + " hands over " + player.mf("his", "her") + " body exaggeratedly.");

			MainScreen.text("\n\n“<i>What’s the matter, [name]?</i>” " + player.mf("he", "she") + " breathes, staring lustfully into your eyes as " + player.mf("he", "she") + " sinks both hands into " + player.mf("his", "her") + " crotch and bends forward, forcing you close to " + player.mf("his", "her") + " face. “<i>Never tried it in front of a mirror? You were missing out on the nasty little tramp you are.</i>”");

			game.dynStats("lus", damage + (rand(7) - 3));
		}
		addTalkShit();
	}

	private addTalkShit(): void {
		statScreenRefresh();

		if (HP < 1) {
			doNext(game.endHpVictory);
			return;
		}

		if (lust > 99) {
			doNext(game.endLustVictory);
			return;
		}

		if (player.HP < 1) {
			doNext(game.endHpLoss);
			return;
		}

		if (player.stats.lust > 99) {
			doNext(game.endLustLoss);
			return;
		}

		switch (_roundCount) {
			case 0:
				MainScreen.text("\n\n“<i>You feel it, don’t you?</i>” The doppelganger whispers, crooking your mouth into a vicious grin. “<i>The transfer. The mirror is a vacuum without a being inside it; it reaches out for someone to complete it. Your being, to be exact. Mine wants to be free a lot more than yours. Ten years more, to be exact.</i>”");
				MainScreen.text("\n\n[He] goes on in a dull croon as [he] continues to circle you, moving with the odd, syncopated jerks of a creature in a body that has only existed for a couple of minutes. “<i>Just let it happen, [name]. You can’t beat me. I am you, only with the knowledge and powers of a demon. Accept your fate.</i>”");
				MainScreen.text("\n\nA weird fluttering feeling runs up your arm, and with a cold chill you look down to see it shimmer slightly, as if you were looking at it through running water.");
				MainScreen.text("\n\n<b>You need to finish this as fast as you can.</b>");
				break

			case 1:
				MainScreen.text("\n\n“<i>Do you know, I can’t even remember what gender I was before I got stuck in that mirror?</i>” the doppelganger says, as [he] slides a hand between your thighs’ mirror counterparts thoughtfully. “<i>I loved changing all the time. Being stuck as one gender seemed so boring when the tools to shift from one shape to the next were always there. That’s why this was my punishment. Forced to change all the time, at the unthinking behest of whoever happened to look into this cursed thing. You have to give Lethice credit, she’s not just cruel, she’s got imagination too. It’s a hell of a combination. I’d hate to see what she had in store for you.</i>”");
				break;

			case 2:
				MainScreen.text("\n\n“<i>This, though... this I like, [name].</i>” [He] closes [his] eyes and");
				if (player.lowerBody.cockSpot.hasCock()) MainScreen.text(" strokes [his] [cock]");
				else if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" slides two fingers into [his] [vagina] and gently frigs [himself]");
				else MainScreen.text(" slips a hand ");
				MainScreen.text(" underneath [his] " + this.armorName + ". The sheer bizarreness of seeing yourself masturbate gives you pause; again the unreality intensifies, and you feel yourself shimmer uncertainly. “<i>Once I’m out of here, I’m going to hang onto this. Revel in not changing my form for once, as a tribute to the kind soul who gave me it!</i>”");
				MainScreen.text("\n\nIt’s getting harder to ignore the way your body shimmers and bleeds contrast at the edges, whilst your reflection only becomes more and more sharply defined.");
				MainScreen.text("\n\n<b>This is something, you realize with a growing horror, which is really going to happen if you don’t stop it.</b>");
				break;

			case 3:
				MainScreen.text("\n\n“<i>Your memories flow to me [name], as you fade like a memory. I can taste them...</i>” You struggle to stay focused, try and force your body and mind not to blur like a fingerprint on a windowpane as the doppelganger sighs beatifically.");
				MainScreen.text("\n\n“<i>Not bad, not bad. You led quite an interesting life for an Ingnam peasant, didn’t you? Got around. Not enough sex, though. Nowhere near enough sex. Don’t worry- I’ll correct that mistake, in due course.</i>”");
				break;

			case 4:
				MainScreen.text("\n\n“<i>Did you really think you could defeat Lethice, peasant?</i>” the doppelganger roars. [He] moves and speaks with confidence now, [his] old twitchiness gone, revelling and growing into [his] new form.");
				MainScreen.text("\n\nYou don’t dare open your mouth to hear what pale imitation of that voice comes out. “<i>Oh, by grit, crook and luck you’ve gotten this far, but defeat the demon queen? You, who still cling onto your craven, simple soul and thus know nothing of demonhood, of its powers, of its sacrifices? I am doing you and the world a favor here, [name]-that-was, because I am not just taking this fine body but also the mantel it so clumsily carried. With my knowledge and your brute physicality, I will have my revenge on Lethice, and the world will be free of her and her cruelty!</i>” [He] screams with laughter. The ringing insanity of it sounds increasingly muffled to you, as if it were coming through a pane of glass.");
				MainScreen.text("\n\n<b>You have time and strength for one last gambit...</b>");
				break;

			case 5:
				MainScreen.text("\n\nThe shimmering intensifies for a moment as something... shifts....");

				game.dynStats("lus+", 1000);

				break;

			default:
				break;
		}

		_roundCount++;
		combatRoundOver();
	}

	public defeated(hpVictory: boolean): void {
		game.d3.doppleganger.punchYourselfInTheBalls();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		game.d3.doppleganger.inSovietCoCSelfFucksYou();
	}

	public handleSpellResistance(spell: string): void {
		MainScreen.text("The mirror demon barely even flinches as your fierce, puissant fire washes over [him].");

		MainScreen.text("\n\n“<i>Picked up a few things since you’ve been here, then?</i>” [he] yawns. Flickers of flame cling to [his] fingers, its radiance sputtering and burning away, replaced by a livid black color. “<i>Serf magic. Easy to pick up, easy to use, difficult to impress with. Let me show you how it’s really done!</i>” [He] thrusts [his] hands out and hurls a pitiless black fireball straight at you, a negative replica of the one you just shot at [him].");

		if (spell == "fireball") {
			MainScreen.text(" (" + player.takeDamage(player.level * 10 + 45 + rand(10)) + ")");
		}
		else if (spell == "whitefire") {
			MainScreen.text(" (" + player.takeDamage(10 + (player.stats.int / 3 + rand(player.stats.int / 2))) + ")");
		}

		addTalkShit();
	}

	public handlePlayerWait(): void {
		MainScreen.text("Your doppleganger similarly opts to take a momentary break from the ebb and flow of combat.");
		addTalkShit();
	}

	public doAI(): void {
		MainScreen.text("Your duplicate chuckles in the face of your attacks.");
		addTalkShit();
	}

	public Doppleganger() {
		this.a = "the ";
		this.short = "doppleganger";
		this.long = ""; // Needs to be set to supress validation errors, but is handled by an accessor override.
		this.imageName = "doppleganger";
		this.plural = false;

		this.tallness = player.tallness;

		if (player.lowerBody.balls > 0) {
			this.balls = player.lowerBody.balls;
			this.ballSize = player.lowerBody.ballSize;
		}
		else {
			this.balls = 0;
			this.ballSize = 0;
		}

		this.hoursSinceCum = player.hoursSinceCum;

		hipRating = player.lowerBody.hipRating;
		buttRating = player.lowerBody.butt.buttRating;
		lowerBody = player.lowerBody;
		skinDesc = player.skinDesc;
		initStrTouSpeInte(player.stats.str, player.stats.tou, player.stats.spe, player.stats.int);
		initLibSensCor(player.stats.lib, player.stats.sens, player.stats.cor);
		faceType = player.upperBody.head.face.faceType;
		skinType = player.skinType;

		this.bonusHP = 250;

		this.weaponName = player.weaponName;
		this.weaponAttack = player.weaponAttack;
		this.weaponVerb = player.weaponVerb;

		this.armorDef = player.armorDef;
		this.armorName = player.inventory.armor.displayName;

		this.level = player.level;

		this.lowerBody.butt.analLooseness = player.lowerBody.butt.analLooseness;
		this.lowerBody.butt.analWetness = player.lowerBody.butt.analWetness;

		if (player.lowerBody.cockSpot.count() > 0) {
			for (let i: number = 0; i < player.lowerBody.cockSpot.count(); i++) {
				this.createCock((player.lowerBody.cockSpot.get(i) as Cock).cockLength, (player.lowerBody.cockSpot.get(i) as Cock).cockThickness, (player.lowerBody.cockSpot.get(i) as Cock).cockType);
			}
		}

		if (player.lowerBody.vaginaSpot.count() > 0) {
			this.createVagina();
			(this.vaginas[0] as VaginaClass).vaginalLooseness = player.lowerBody.vaginaSpot.get(0).vaginalLooseness;
			(this.vaginas[0] as VaginaClass).vaginalWetness = player.lowerBody.vaginaSpot.get(0).vaginalWetness;
			(this.vaginas[0] as VaginaClass).virgin = player.lowerBody.vaginaSpot.get(0).virgin;
		}
		//Genderless get forced to have a cunny
		if (player.lowerBody.vaginaSpot.count() == 0 && player.lowerBody.cockSpot.count() == 0) {
			this.createVagina();
			(this.vaginas[0] as VaginaClass).vaginalLooseness = 2;
			(this.vaginas[0] as VaginaClass).vaginalWetness = 6;
			(this.vaginas[0] as VaginaClass).virgin = false;
		}
		this.breastRows = [];

		for (i = 0; i < player.upperBody.chest.count(); i++) {
			this.createBreastRow();
			let tbr: BreastRowClass = this.breastRows[i];
			let sbr: BreastRowClass = player.upperBody.chest.get(i);

			tbr.breastRating = sbr.breastRating;
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

		str += "You are fighting the doppelganger. " + player.mf("He", "She") + " is a ";
		str += String(Math.floor(player.tallness / 12) + " foot " + player.tallness % 12 + " inch tall ");
		str += player.race() + ", with " + player.bodyType() + ". ";

		str += player.mf("His", "Her") + " face is " + player.faceDesc() + ".";

		str += " " + player.mf("His", "Her") + " " + player.HeadDescriptor.describeHair(player) + " is parted by";

		switch (player.upperBody.head.earType) {
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

		str += ". " + player.mf("He", "She") + " keeps exploring the area around " + player.mf("his", "her") + " mouth with " + player.mf("his", "her") + " tongue with a horribly acquisitive, sensual interest.";
		str += " " + player.mf("He", "She") + " moves around on " + player.mf("his", "her") + " " + LowerBodyDescriptor.describeLegs(player) + " with a twitchy jerkiness, " + player.mf("his", "her") + " " + game.LowerBodyDescriptor.describeHips(player) + " swinging and tightening.";
		if (player.lowerBody.tailType != 0) str += " " + player.mf("His", "Her") + " tail flicks this way and that.";
		str += " " + player.mf("He", "She") + " wields the exact same " + player.weaponName + " you do, and is dressed in the mirror image of your " + player.inventory.armor.displayName + ". ";
		if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 2) str += "It’s difficult not to notice the way the mirror image of your " + player.BreastDescriptor.describeBreastRow(player.biggestTitRow()) + " ebbs and heaves within it.";

		return str;
	}

}
