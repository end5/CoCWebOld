/**
 * ...
 * @author ...
 */
export default class CorruptedDrider extends AbstractSpiderMorph {

	//Drider kiss!
	public driderKiss(): void {
		let temp: number;
		MainScreen.text("The corrupted drider closes in on your web-bound form, cooing happily at you while you struggle with the sticky fibers.\n\n", false);
		//Blind dodge change
		if (statusAffects.has("Blind") && rand(3) < 2) {
			MainScreen.text("She's too blind to get anywhere near you.\n", false);
		}
		//Dodge
		else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			MainScreen.text("Somehow, you manage to drag yourself out of the way.  She sighs and licks her lips.  \"<i>", false);
			temp = rand(4);
			if (temp == 0) MainScreen.text("I just wanted to give my delicious morsel a kiss...</i>\"\n", false);
			else if (temp == 1) MainScreen.text("Why won't you let me kiss you?</i>\"\n", false);
			else if (temp == 2) MainScreen.text("Mmm, do you have to squirm so much, prey?</i>\"\n", false);
			else MainScreen.text("Just look at my glossy, dripping lips.  Imagine how great it would feel to have them locked against you.  Why resist?</i>\"\n", false);
		}
		//Determine if evaded
		else if (player.perks.has("Evade") && rand(100) < 10) {
			MainScreen.text("Somehow, you manage to evade her lusty attack.  She sighs and licks her lips.  \"<i>", false);
			temp = rand(4);
			if (temp == 0) MainScreen.text("I just wanted to give my delicious morsel a kiss...</i>\"\n", false);
			else if (temp == 1) MainScreen.text("Why won't you let me kiss you?</i>\"\n", false);
			else if (temp == 2) MainScreen.text("Mmm, do you have to squirm so much, prey?</i>\"\n", false);
			else MainScreen.text("Just look at my glossy, dripping lips.  Imagine how great it would feel to have them locked against you.  Why resist?</i>\"\n", false);
		}
		//("Misdirection"
		else if (player.perks.has("Misdirection") && rand(100) < 10 && player.inventory.armor.displayName == "red, high-society bodysuit") {
			MainScreen.text("You manage to misdirect her lusty attack, avoiding it at the last second.  She sighs and licks her lips.  \"<i>", false);
			temp = rand(4);
			if (temp == 0) MainScreen.text("I just wanted to give my delicious morsel a kiss...</i>\"\n", false);
			else if (temp == 1) MainScreen.text("Why won't you let me kiss you?</i>\"\n", false);
			else if (temp == 2) MainScreen.text("Mmm, do you have to squirm so much, prey?</i>\"\n", false);
			else MainScreen.text("Just look at my glossy, dripping lips.  Imagine how great it would feel to have them locked against you.  Why resist?</i>\"\n", false);
		}
		//Determine if cat'ed
		else if (player.perks.has("Flexibility") && rand(100) < 6) {
			MainScreen.text("You manage to twist your cat-like body out of the way at the last second, avoiding it at the last second.  She sighs and licks her lips.  \"<i>", false);
			temp = rand(4);
			if (temp == 0) MainScreen.text("I just wanted to give my delicious morsel a kiss...</i>\"\n", false);
			else if (temp == 1) MainScreen.text("Why won't you let me kiss you?</i>\"\n", false);
			else if (temp == 2) MainScreen.text("Mmm, do you have to squirm so much, prey?</i>\"\n", false);
			else MainScreen.text("Just look at my glossy, dripping lips.  Imagine how great it would feel to have them locked against you.  Why resist?</i>\"\n", false);
		}

		else if (!player.statusAffects.has("DriderKiss")) {
			//(HIT? + 10 lust)
			game.player.stats.lust += 10;
			MainScreen.text("Before you can move, she's right on top of you, leaning ", false);
			if (player.tallness < 72) MainScreen.text("down", false);
			else MainScreen.text("over", false);
			MainScreen.text(" to plant a sloppy, wet kiss upon your lips.  Her glossy lip-venom oozes everywhere, dribbling down your collective chins and sliding into your mouth.  You shudder, trying to resist, but your tongue betrays you.  It slides between her moist, puffy entrance, lapping at her venom and making love to her tongue.", false);
			if (player.stats.lust <= 99) MainScreen.text("  Somehow, you work up the willpower to back away, but your body slowly begins to burn hotter and harder, afflicted with a slowly-building lust.", false);
			player.statusAffects.add(new StatusAffect("DriderKiss", 0, 0, 0, 0)));
		}
		//Get hit 2nd time) 
		else {
			player.addStatusValue(StatusAffects.DriderKiss, 1, 1);
			if (player.statusAffects.get("DriderKiss").value1 == 1) {
				//(HIT? + 15 lust)
				game.player.stats.lust += 15;
				MainScreen.text("Again, the drider ties your mouth up in her syrupy lip-lock, seeming to bind your mouth as effectively as her webs bind your body.  Her sweet venom bubbles and froths at the corners of the oral embrace, dripping over her many-breasted bosom and your " + player.chestDesc() + ".", false);
				if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("  " + CockDescriptor.describeMultiCockSimpleOne(player, true) + " spews a rope of pre-cum into your " + player.inventory.armor.displayName + ", desperate to get out and fuck.", false);
				if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("  Fem-cum dribbles down your " + LowerBodyDescriptor.describeLegs(player) + " while your " + player.VaginaDescriptor.describeClit(player, player.lowerBody.vaginaSpot.get(0)) + " gets so hard you think it'll explode.", false);
				MainScreen.text("  This time, the drider is the one to break the kiss.  She asks, \"<i>Are you ready, my horny little morsel?</i>\"\n", false);
				if (player.stats.lust <= 99) MainScreen.text("You shake your head 'no' and stand your ground!\n", false);
			}
			//(Get hit 3rd+ time)
			else {
				MainScreen.text("This time you barely move.  Your body is too entranced by the idea of another venom-laced kiss to resist.  Glorious purple goo washes into your mouth as her lips meet yours, sealing tight but letting your tongue enter her mouth to swirl around and feel the venom drip from her fangs.  It's heavenly!  Your " + player.skin() + " grows hot and tingly, and you ache to be touched so badly.  Your " + BreastDescriptor.describeNipple(0) + "s feel hard enough to cut glass, and a growing part of you admits that you'd love to feel the drider's chitinous fingers pulling on them.", false);
				//(HIT? + 20 lust)
				game.player.stats.lust += 20;
				if (player.lowerBody.cockSpot.hasCock() || player.lowerBody.vaginaSpot.hasVagina()) {
					MainScreen.text("  The moisture in your crotch only gets worse.  At this point, a ", false);
					if (player.lowerBody.vaginaSpot.get(0).vaginalWetness < 3 && player.cumQ() < 200) MainScreen.text("small", false);
					else if (player.lowerBody.vaginaSpot.get(0).vaginalWetness < 5 && player.cumQ() < 500) MainScreen.text("large", false);
					else MainScreen.text("massive", false);
					MainScreen.text(" wet stain that reeks of your sheer sexual ache has formed in your " + player.inventory.armor.displayName + ".", false);
					if (player.stats.lust <= 99) MainScreen.text("  Amazingly, you resist her and pull back, panting for breath.", false);
				}
			}
		}
		combatRoundOver();
	}

	public driderMasturbate(): void {
		//-Masturbate - (Lowers lust by 50, raises PC lust)
		lust -= 30;
		game.dynStats("lus", (10 + player.stats.lib / 20));
		MainScreen.text("The spider-woman skitters back and gives you a lusty, hungry expression.  She shudders and moans, \"<i>Mmm, just watch what you're missing out on...</i>\"\n\n", false);
		MainScreen.text("As soon as she finishes, her large clit puffs up, balloon-like.  A second later, it slides forward, revealing nine inches of glossy, girl-spunk-soaked shaft.  Nodules ring the corrupted penis' surface, while the tiny cum-slit perched atop the tip dribbles heavy flows of pre-cum.  She pumps at the fleshy organ while her other hand paws at her jiggling breasts, tugging on the hard ", false);
		if (nipplesPierced > 0) MainScreen.text("pierced ", false);
		MainScreen.text("nipple-flesh.  Arching her back in a lurid pose, she cries out in high-pitched bliss, her cock pulsing in her hand and erupting out a stream of seed that lands in front of her.\n\n", false);

		MainScreen.text("The display utterly distracts you until it finishes, and as you adopt your combat pose once more, you find your own needs harder to ignore, while hers seem to be sated, for now.\n", false);
		combatRoundOver();
	}

	override protected performCombatAction(): void {
		game.spriteSelect(77);
		if (lust > 70 && rand(4) == 0) driderMasturbate();
		//1/4 chance of silence if pc knows spells
		else if (game.hasSpells() && !player.statusAffects.has("WebSilence") && rand(4) == 0) {
			spiderSilence();
		}
		//1/4 chance of disarm
		else if (!player.statusAffects.has("Disarmed") && player.weaponName != "fists" && rand(4) == 0) {
			spiderDisarm();
		}
		//Always web unless already webbed
		else if (player.stats.spe >= 2 && (!player.statusAffects.has("Web") || rand(2) == 0)) {
			spiderMorphWebAttack();
		}
		//Kiss!
		else driderKiss();
	}

	public defeated(hpVictory: boolean): void {
		game.swamp.corruptedDriderScene.defeatDriderIntro();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			MainScreen.text("\n\nThe drider licks her lips in anticipation...");
			doNext(game.endLustLoss);
		} else {
			game.swamp.corruptedDriderScene.loseToDrider();
		}
	}

	public CorruptedDrider() {

		let hairColor: string = randomChoice("red", "orange", "green");
		let skinTone: string = randomChoice("yellow", "purple", "red", "turquoise");

		let pierced: boolean = rand(2) == 0;
		this.a = "the ";
		this.short = "corrupted drider";
		this.imageName = "corrupteddrider";
		this.long = "This particular spider-woman is a drider - a creature with a humanoid top half and the lower body of a giant arachnid.  From a quick glance, you can tell that this one has fallen deeply to corruption.  She is utterly nude, exposing her four well-rounded, D-cup breasts with their shiny black nipples.  " + (pierced ? "Gold piercings and chains link the curvy tits together, crossing in front of her four mounds in an 'x' pattern.  " : "") + "On her face and forehead, a quartet of lust-filled, " + skinTone + " eyes gaze back at you.  Behind her, the monster-girl's " + hairColor + " hair drapes down her back like a cloak.  The drider's lips seem to shine with a light all their own, and a steady trickle of purple, reflective fluid beads and drips from them.  At her waist, there's a juicy looking snatch with a large, highly visible clit.  From time to time it pulsates and grows, turning part-way into a demon-dick.  Her spider-half has eight spindly legs with black and " + hairColor + " stripes - a menacing display if ever you've seen one.";
		// this.plural = false;
		this.createCock(9, 2, CockType.DEMON);
		this.createVagina(false, VaginaWetness.DROOLING, VaginaLooseness.GAPING);
		this.statusAffects.add(new StatusAffect("BonusVCapacity", 70, 0, 0, 0)));
		createBreastRow(Appearance.breastCupInverse("DD"));
		this.lowerBody.butt.analLooseness = ButtLooseness.TIGHT;
		this.lowerBody.butt.analWetness = ButtWetness.DRY;
		this.statusAffects.add(new StatusAffect("BonusACapacity", 70, 0, 0, 0)));
		this.tallness = 10 * 12;
		this.lowerBody.hipRating = HipRating.CURVY + 2;
		this.lowerBody.butt.buttRating = ButtRating.LARGE + 1;
		this.lowerBody = LowerBodyType.DRIDER_LOWER_BODY;
		this.skinTone = skinTone;
		this.skinType = SkinType.PLAIN;
		//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SkinType.PLAIN];
		this.upperBody.head.hairColor = hairColor;
		this.upperBody.head.hairLength = 24;
		initStrTouSpeInte(100, 50, 70, 100);
		initLibSensCor(80, 50, 90);
		this.weaponName = "claws";
		this.weaponVerb = "claw";
		this.weaponAttack = 30;
		this.armorName = "carapace";
		this.armorDef = 55;
		this.armorPerk = "";
		this.armorValue = 70;
		if (pierced) {
			this.nipplesPierced = 1;
			this.bonusHP = 325;
			this.lust = 35;
			this.lustVuln = .25;
			this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
			this.level = 15;
			this.gems = rand(10) + 30;
		} else {
			this.bonusHP = 250;
			this.lust = 30;
			this.lustVuln = .4;
			this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
			this.level = 14;
			this.gems = rand(10) + 20;
		}
		this.drop = new WeightedDrop().add(consumables.B_GOSSR, 5)
			.add(useables.T_SSILK, 1)
			.add(null, 4);
		checkMonster();
	}

}
