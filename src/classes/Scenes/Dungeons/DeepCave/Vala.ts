export default class Vala extends Monster {
	//Vala AI

	//Blood magic?
	public valaSpecial1(): void {
		MainScreen.text("Vala dabs at one of her wounds and swoons.  Is she actually getting off from the wounds?  Damn she's damaged!  Vala licks the blood from her fingers, winks, and blows pink mist from her mouth.", false);
		//Lightly wounded.
		if (HPRatio() > .7) {
			MainScreen.text("  The sweet-smelling cloud rapidly fills the room, but the volume of mist is low enough that you don't end up breathing in that much of it.  It does make your pulse quicken in the most pleasant way though...", false);
			game.dynStats("lus", 5 + player.stats.lib / 20);
		}
		else if (HPRatio() > .4) {
			MainScreen.text("  The rose-colored vapor spreads throughout the room, forcing you to breathe it in or pass out from lack of air.  It smells sweet and makes your head swim with sensual promises and your crotch tingle with desire.  Panicked by the knowledge that you're being drugged, you gasp, but it only draws more of the rapidly disappating cloud into your lungs, fueling your lust.", false);
			game.dynStats("lus", 10 + player.stats.lib / 20);
		}
		else {
			MainScreen.text("  The cloying, thick cloud of pink spools out from her mouth and fills the room with a haze of bubblegum-pink sweetness.  Even the shallowest, most experimental breath makes your heart pound and your crotch thrum with excitement.  You gasp in another quick breath and sway back and forth on your feet, already on the edge of giving in to the faerie.", false);
			game.dynStats("lus", 30 + player.stats.lib / 10);
		}
		combatRoundOver();
	}
	//Milk magic
	public valaSpecial2(): void {
		MainScreen.text("With a look of ecstasy on her face, Vala throws back her head and squeezes her pillowy chest with her hands, firing gouts of thick faerie milk from her over-sized bosom!  You try to dodge, but she's squirting so much it's impossible to dodge it all, and in no time you're drenched with a thick coating of Vala's milk.", false);
		MainScreen.text("  She releases her breasts, shaking them back and forth for your benefit, and flutters her wings, blowing shiny, glitter-like flakes at you.  They stick to the milk on your skin, leaving you coated in milk and faerie-dust.", false);
		MainScreen.text("\nVala says, \"<i>Now you can be sexy like Vala!</i>\"\n", false);

		if (statusAffects.has("Milk")) {
			addStatusValue(StatusAffects.Milk, 1, 5);
			MainScreen.text("Your " + player.skinDesc + " tingles pleasantly, making you feel sexy and exposed.  Oh no!  It seems each coating of milk and glitter is stronger than the last!", false);
		}
		else {
			statusAffects.add(new StatusAffect("Milk", 5, 0, 0, 0)));
			MainScreen.text("You aren't sure if there's something in her milk, the dust, or just watching her squirt and shake for you, but it's turning you on.", false);
		}
		game.dynStats("lus", statusAffects.get("Milk").value1 + player.stats.lib / 20);
		combatRoundOver();
	}
	//Masturbation
	public valaMasturbate(): void {
		MainScreen.text("The mind-fucked faerie spreads her alabaster thighs and dips a finger into the glistening slit between her legs, sliding in and out, only pausing to circle her clit.  She brazenly masturbates, putting on quite the show.  Vala slides another two fingers inside herself and finger-fucks herself hard, moaning and panting lewdly.  Then she pulls them out and asks, \"<i>Did you like that?  Will you fuck Vala now?</i>\"", false);
		game.dynStats("lus", 4 + player.stats.cor / 10);
		combatRoundOver();
	}


	//[Fight dialog]
	public valaCombatDialogue(): void {
		if (findStatusAffect(StatusAffects.Vala) < 0) {
			MainScreen.text("\"<i>Sluts needs to service the masters!</i>\" the fairy wails, flying high. \"<i>If they are not pleased, Bitch doesn't get any cum!</i>\"", false);
			statusAffects.add(new StatusAffect("Vala", 0, 0, 0, 0)));
		}
		else {
			addStatusValue(StatusAffects.Vala, 1, 1);
			if (statusAffects.get("Vala").value1 == 1) MainScreen.text("\"<i>If you won't fuck Bitch, you must not be a master,</i>\" she realizes, the fight invigorating her lust-deadened brain. \"<i>You get to be a pet for the masters, too!</i>\"", false);
			else if (statusAffects.get("Vala").value1 == 2) MainScreen.text("\"<i>If the masters like you, maybe they will let Bitch keep you for herself! Won't you like that?</i>\"", false);
			else if (statusAffects.get("Vala").value1 == 3) MainScreen.text("\"<i>We obey the masters. They fed Bitch until she became big enough to please them. The masters love their pets so much, you'll see.</i>\"", false);
			else if (statusAffects.get("Vala").value1 == 4) MainScreen.text("\"<i>Thoughts are so hard. Much easier to be a toy slut. Won't you like being a toy? All that nasty memory fucked out of your head.</i>\"", false);
			else if (statusAffects.get("Vala").value1 == 5) MainScreen.text("\"<i>Bitch has given birth to many of the masters' children. She will teach you to please the masters. Maybe you can birth more masters for us to fuck?</i>\"", false);
			else MainScreen.text("\"<i>Bitch loves when her children use her as their fathers did. Sluts belong to them. Slut love them. You will love them too!</i>\"", false);
		}
	}

	override protected performCombatAction(): void {
		//VALA SPEAKS!
		valaCombatDialogue();
		MainScreen.text("\n\n", false);
		//Select Attack
		//BLood magic special
		if (HPRatio() < .85 && rand(3) == 0) valaSpecial1();
		//25% chance of milksquirt.
		else if (rand(4) == 0) valaSpecial2();
		else valaMasturbate();
	}


	public defeated(hpVictory: boolean): void {
		game.fightValaVictory();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			MainScreen.text("\n\nYour foe doesn't seem put off enough to leave...");
			doNext(game.endLustLoss);
		} else {
			game.loseToVala();
		}
	}

	public Vala() {
		this.a = "";
		this.short = "Vala";
		this.imageName = "vala";
		this.long = "While the fey girl is whip-thin, her breasts are disproportionately huge. They'd be at least a DD-cup on a normal human, but for her height and body type, they're practically as large as her head. They jiggle at her slow, uneven breathing, tiny drops of milk bubbling at her nipples with every heartbeat.  She seems fixated on mating with you, and won't take no for an answer.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.SLICK, VaginaLooseness.GAPING_WIDE);
		this.statusAffects.add(new StatusAffect("BonusVCapacity", 25, 0, 0, 0)));
		createBreastRow(Appearance.breastCupInverse("E"));
		this.lowerBody.butt.analLooseness = ButtLooseness.STRETCHED;
		this.lowerBody.butt.analWetness = ButtWetness.DRY;
		this.statusAffects.add(new StatusAffect("BonusACapacity", 10, 0, 0, 0)));
		this.tallness = 4 * 12;
		this.lowerBody.hipRating = HipRating.CURVY;
		this.lowerBody.butt.buttRating = ButtRating.LARGE;
		this.skinTone = "fair";
		this.upperBody.head.hairColor = "purple";
		this.upperBody.head.hairLength = 22;
		initStrTouSpeInte(40, 50, 50, 60);
		initLibSensCor(55, 35, 50);
		this.weaponName = "fists";
		this.weaponVerb = "caresses";
		this.armorName = "skin";
		let lustVuln: number = .5;
		if (game.Flags.list[FlagEnum.TIMES_PC_DEFEATED_VALA] > 0) lustVuln += .25;
		if (game.Flags.list[FlagEnum.TIMES_PC_DEFEATED_VALA] > 2) lustVuln += .5;
		let lust: number = 30 + game.Flags.list[FlagEnum.TIMES_PC_DEFEATED_VALA] * 10;
		if (lust > 80) lust = 80;
		this.bonusHP = 350;
		this.lust = lust;
		this.lustVuln = lustVuln;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 11;
		this.gems = 1;
		this.additionalXP = 50;
		if (game.Flags.list[FlagEnum.TIMES_PC_DEFEATED_VALA] > 0) this.XP = 5;
		if (game.Flags.list[FlagEnum.TIMES_PC_DEFEATED_VALA] > 2) this.XP = 1;
		this.special1 = special1;
		this.special2 = special2;
		this.special3 = special3;
		let wingDesc: string = "shimmering wings";
		if (Flags.list[FlagEnum.TIMES_PC_DEFEATED_VALA] == 0) this.drop = new WeightedDrop(consumables.NUMBROX);
		else this.drop = NO_DROP;
		this.wingType = WingType.BEE_LIKE_LARGE;
		this.wingDesc = wingDesc;
		checkMonster();
	}

}
