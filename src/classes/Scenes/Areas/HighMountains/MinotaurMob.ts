
/**
 * ...
 * @author ...
 */
export default class MinotaurMob extends Monster {
	private precumTease(): void {
		let teased: boolean = false;
		let damage: number = 0;
		let oldLust: number = player.stats.lust;
		game.spriteSelect(94);
		//(Big taur pre-cum tease)
		if (rand(2) == 0) {
			teased = true;
			if (rand(5) > 0) {
				MainScreen.text("The biggest lifts his loincloth, giving you a perfect view of his veiny hardness.  Pre-cum visibly bubbles from his flared tip, splattering wetly on the rocks and filling the air with his bestial musk.  He says, \"<i>See how much I need you?</i>\"\n", false);
				damage = 7 + player.stats.lib / 20;
			}
			//crit)
			else {
				MainScreen.text("The largest bull in the crowd flaps his cum-soaked loincloth up and wraps a massive, muscled hand around his incredible erection.  Shaking it back and forth, he flicks his bubbling pre-cum in your direction, letting it spatter noisily against the rocks around you.  A few droplets even land on your skin, fogging the air with minotaur pheromones.\n", false);
				damage = 13 + player.stats.lib / 20;
			}
		}
		//(Middle Taur pre-cum tease)
		if (rand(2) == 0) {
			teased = true;
			if (rand(5) > 0) {
				MainScreen.text("\"<i>Hey, slut, look at this!</i>\" taunts one of the beast-men.  He shakes his hips lewdly, spinning his thick horse-cock in wide circles and sending his potent pre flying through the air.  Droplets rain down around you, filling the air with even more of that delicious smell.\n", false);
				damage = 3 + player.stats.lib / 30;
			}
			else {
				MainScreen.text("\"<i>Mom, you may as well spread your thighs now, I got a treat for ya!</i>\" announces a well-built minotaur.  He shifts his coverings and pumps on his swollen shaft, tugging hard enough over the iron-hard erection to blast out huge blobs of pre-seed in your direction.  ", false);
				if (player.stats.spe / 5 + rand(20) > 20) {
					MainScreen.text("You avoid most of them, the blobs splattering against the mountain and still getting a little on you.  Regardless, the air stinks of their heavy spunk.", false);
					damage = 6 + player.stats.lib / 20;
				}
				else {
					MainScreen.text("You try to avoid them, but one catches you in the face, a little getting into your mouth.  You swallow it reflexively and salivate some more, your eyes darting to look at the stained rocks around you.  Are you really considering licking it up from the ground?", false);
					damage = 15 + player.stats.lib / 20;
				}
			}
			MainScreen.text("\n", false);
		}
		//(Minitaur pre-cum tease)
		if (!teased || rand(3) == 0) {
			MainScreen.text("The smallest of the beastmen, the minitaur, moans and begs, \"<i>Please Mom, can we please fuck you?  I... I need it so bad.</i>\"  He raises the edge of his loincloth to show exactly what he's talking about.  His member is limp but leaking.  What really catches your eyes sits behind that drizzling shaft - a pair of balls looking swollen and pent up beyond belief.  A sticky web of his leavings hangs between his genitals and his loincloth, showing you just how much he's been leaking at the thought of fucking you.  Fanning the sopping garment, he inadvertently blows a wave of his pheromones your way.\n", false);
			damage = 9 + player.stats.lib / 20;
		}
		game.dynStats("lus", damage);
		damage = player.stats.lust - oldLust;
		//UNIVERSAL pre-cum RESULT:
		//(Low damage taken)
		if (damage <= 8) {
			MainScreen.text("Though your body is tingling from the show the horny beasts are giving you, it doesn't effect you as much as it could have.", false);
			if (player.stats.lust > 99) MainScreen.text("  Still, you're too horny to fight any longer.", false);
		}
		//(Medium damage taken)
		else if (damage <= 14) {
			MainScreen.text("The powerful pheromones and scents hanging in the air around you make your body flush hotly.  Your " + player.BreastDescriptor.describeNipple(0) + "s grow harder", false);
			if (player.stats.lust > 70) MainScreen.text(", though you didn't think such a thing was possible", false);
			else MainScreen.text(", feeling like two bullets scraping along the inside of your " + player.inventory.armor.displayName, false);
			MainScreen.text(", but it... it could have been worse.  You shudder as a little fantasy of letting them dribble it all over your body works through your mind.", false);
			if (player.stats.lust > 99) MainScreen.text("  Fuck it, they smell so good.  You want, no, NEED more.", false);
			else MainScreen.text("  A growing part of you wants to experience that.", false);
		}
		//(high damage taken)
		else {
			MainScreen.text("All that potent pre-ejaculate makes your cunny ", false);
			if (player.lowerBody.vaginaSpot.get(0).vaginalWetness <= 1) MainScreen.text("moisten", false);
			else if (player.lowerBody.vaginaSpot.get(0).vaginalWetness <= 2) MainScreen.text("drip", false);
			else if (player.lowerBody.vaginaSpot.get(0).vaginalWetness <= 3) MainScreen.text("drool", false);
			else MainScreen.text("juice itself", false);
			MainScreen.text(" in need.", false);
			if (player.minotaurNeed()) {
				MainScreen.text("  You need a fix so bad!", false);
				game.player.stats.lust += 5;
			}
			else {
				MainScreen.text("  You can understand firsthand just how potent and addictive that fluid is...", false);
			}
			if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("  " + CockDescriptor.describeMultiCockSimpleOne(player, true) + " twitches and dribbles its own pre-seed, but it doesn't smell anywhere near as good!", false);
			MainScreen.text("  Shuddering and moaning, your body is wracked by ever-increasing arousal.  Fantasies of crawling under the beast-men's soaked legs and lapping at their drooling erections inundate your mind, your body shivering and shaking in response.  ", false);
			if (player.stats.lust <= 99) MainScreen.text("You pull back from the brink with a start.  It'll take more than a little drugged pre-cum to bring you down!", false);
			else MainScreen.text("You sigh and let your tongue loll out.  It wouldn't so bad, would it?", false);
		}
		combatRoundOver();
	}

	//Grope
	private minotaurGangGropeAttack(): void {
		game.spriteSelect(94);
		MainScreen.text("Strong hands come from behind and slide under your equipment to squeeze your " + chestDesc() + ".  The brutish fingers immediately locate and pinch at your " + BreastDescriptor.describeNipple(0) + "s, the sensitive flesh on your chest lighting up with pain and pleasure.  You arch your back in surprise, utterly stunned by the violation of your body.  After a moment you regain your senses and twist away, but the damage is already done.  You're breathing a bit quicker now", false);
		if (player.stats.lust >= 80) MainScreen.text(", and your pussy is absolutely soaking wet", false);
		MainScreen.text(".", false);
		game.dynStats("lus", (5 + player.stats.sens / 10));
		combatRoundOver();
	}
	//Gang Grope
	private minotaurGangGangGropeAttack(): void {
		game.spriteSelect(94);
		MainScreen.text("Before you can react, hands reach out from multiple angles and latch onto your body.  One pair squeezes at your " + game.ButtDescriptor.describeButt(player) + ", the strong grip massaging your cheeks with loving touches.  Another set of hands are sliding along your tummy, reaching down for, but not quite touching, the juicy delta below.  Palms encircle your " + player.chestDesc() + " and caress them, gently squeezing in spite of the brutish hands holding you.  You wriggle and squirm in the collective grip of the many minotaurs for a few moments, growing more and more turned on by the treatment.  At last, you shake out of their hold and stand free, panting hard from exertion and desire.", false);
		game.dynStats("lus", (15 + player.stats.sens / 10));
		combatRoundOver();
	}
	//Waste  a turn
	private minotaurGangWaste(): void {
		Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00329] = 1;
		game.spriteSelect(94);
		MainScreen.text("\"<i>Oh man I can't wait to go hilt-deep in that pussy... I'm going to wreck her,</i>\" promises one bull to his brother.  The other laughs and snorts, telling him how he'll have to do the deed during sloppy seconds.  It quickly escalates, and soon, every single one of the beast-men is taunting the others, bickering over how and when they'll get to have you.  While they're wasting their time, it's your chance to act!", false);
		combatRoundOver();
	}

	public doAI(): void {
		game.spriteSelect(94);
		Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00329] = 0;
		let select: number = rand(7);
		if (select <= 2) precumTease();
		else if (select <= 4) minotaurGangGropeAttack();
		else if (select == 5) minotaurGangGangGropeAttack();
		else minotaurGangWaste();
	}


	public defeated(hpVictory: boolean): void {
		game.highMountains.minotaurMobScene.victoryMinotaurGang();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			MainScreen.text("\n\nThe minutaurs share a laugh while you cum, but their throbbing erections don't subside in the slightest.");
			doNext(game.endLustLoss);
		} else {
			game.highMountains.minotaurMobScene.minotaurDeFeet();
		}
	}

	public MinotaurMob() {
		this.a = "the ";
		if (game.Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00326] < 20)
			this.short = "minotaur gang";
		else
			this.short = "minotaur tribe";
		this.imageName = "minotaurmob";
		this.long = Num2Text(game.Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00326]) + " shaggy beastmen stand around you in a loose circle.  Their postures aren't exactly threatening.  If anything, they seem to be standing protectively around you, as if their presence would somehow shelter you from the rest of the mountain.  All of their features share a brotherly similarity, though there's still a fair bit of differences between your minotaur sons.  One of them is a head above the rest, a massive hulk of muscle so big he seems to dwarf the rest.  In stark contrast, a feminine minitaur keeps his distance in the rear." + (game.Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00326] >= 20 ? "  The tribe constantly makes hoots and cat-calls, fully expecting to be fucking you soon." : "");
		this.plural = true;
		this.pronoun1 = "they";
		this.pronoun2 = "them";
		this.pronoun3 = "their";
		this.createCock(rand(13) + 24, 2 + rand(3), CockType.HORSE);
		this.balls = 2;
		this.ballSize = 2 + rand(13);
		this.cumMultiplier = 1.5;
		this.hoursSinceCum = ballSize * 10;
		createBreastRow(0);
		this.lowerBody.butt.analLooseness = ButtLooseness.STRETCHED;
		this.lowerBody.butt.analWetness = ButtWetness.NORMAL;
		this.statusAffects.add(new StatusAffect("BonusACapacity", 30, 0, 0, 0)));
		this.tallness = rand(37) + 84;
		this.lowerBody.hipRating = HipRating.AVERAGE;
		this.lowerBody.butt.buttRating = ButtRating.AVERAGE + 1;
		this.lowerBody = LowerBodyType.HOOFED;
		this.skinTone = "red";
		this.skinType = SkinType.FUR;
		this.skinDesc = "shaggy fur";
		this.upperBody.head.hairColor = randomChoice("black", "brown");
		this.upperBody.head.hairLength = 3;
		this.faceType = FaceType.COW_MINOTAUR;
		initStrTouSpeInte(65, 60, 30, 20);
		initLibSensCor(40, 15, 35);
		this.weaponName = "fists";
		this.weaponVerb = "punches";
		this.armorName = "thick fur";
		let bonusHP: number = 340 + 50 * (game.Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00326] - 3);
		let lustVuln: number = 0.45;
		if ((game.Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00326] - 3) * 2 > 13) lustVuln = .3;
		else lustVuln -= (game.Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00326] - 3) * 0.02;
		this.bonusHP = bonusHP;
		this.lust = 30;
		this.lustVuln = lustVuln;
		this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
		let level: number = 11 + Math.round((game.Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00326] - 3) / 2);
		if (level > 14) level = 14;
		this.level = level;
		this.gems = rand(15) + 45;
		this.tailType = TailType.COW;
		this.special1 = game.mountain.minotaurScene.minoPheromones;
		this.drop = NO_DROP;
		checkMonster();
	}
}

