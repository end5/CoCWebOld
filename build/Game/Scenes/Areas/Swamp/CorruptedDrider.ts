/**
 * ...
 * @author ...
 */
export class CorruptedDrider extends AbstractSpiderMorph {

	//Drider kiss!
	public driderKiss(): void {
		let temp: number;
		DisplayText("The corrupted drider closes in on your web-bound form, cooing happily at you while you struggle with the sticky fibers.\n\n");
		//Blind dodge change
		if (statusAffects.has(StatusAffectType.Blind) && randInt(3) < 2) {
			DisplayText("She's too blind to get anywhere near you.\n");
		}
		//Dodge
		else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("Somehow, you manage to drag yourself out of the way.  She sighs and licks her lips.  \"<i>");
			temp = randInt(4);
			if (temp === 0) DisplayText("I just wanted to give my delicious morsel a kiss...</i>\"\n");
			else if (temp === 1) DisplayText("Why won't you let me kiss you?</i>\"\n");
			else if (temp === 2) DisplayText("Mmm, do you have to squirm so much, prey?</i>\"\n");
			else DisplayText("Just look at my glossy, dripping lips.  Imagine how great it would feel to have them locked against you.  Why resist?</i>\"\n");
		}
		//Determine if evaded
		else if (player.perks.has(PerkType.Evade) && randInt(100) < 10) {
			DisplayText("Somehow, you manage to evade her lusty attack.  She sighs and licks her lips.  \"<i>");
			temp = randInt(4);
			if (temp === 0) DisplayText("I just wanted to give my delicious morsel a kiss...</i>\"\n");
			else if (temp === 1) DisplayText("Why won't you let me kiss you?</i>\"\n");
			else if (temp === 2) DisplayText("Mmm, do you have to squirm so much, prey?</i>\"\n");
			else DisplayText("Just look at my glossy, dripping lips.  Imagine how great it would feel to have them locked against you.  Why resist?</i>\"\n");
		}
		//("Misdirection"
		else if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("You manage to misdirect her lusty attack, avoiding it at the last second.  She sighs and licks her lips.  \"<i>");
			temp = randInt(4);
			if (temp === 0) DisplayText("I just wanted to give my delicious morsel a kiss...</i>\"\n");
			else if (temp === 1) DisplayText("Why won't you let me kiss you?</i>\"\n");
			else if (temp === 2) DisplayText("Mmm, do you have to squirm so much, prey?</i>\"\n");
			else DisplayText("Just look at my glossy, dripping lips.  Imagine how great it would feel to have them locked against you.  Why resist?</i>\"\n");
		}
		//Determine if cat'ed
		else if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("You manage to twist your cat-like body out of the way at the last second, avoiding it at the last second.  She sighs and licks her lips.  \"<i>");
			temp = randInt(4);
			if (temp === 0) DisplayText("I just wanted to give my delicious morsel a kiss...</i>\"\n");
			else if (temp === 1) DisplayText("Why won't you let me kiss you?</i>\"\n");
			else if (temp === 2) DisplayText("Mmm, do you have to squirm so much, prey?</i>\"\n");
			else DisplayText("Just look at my glossy, dripping lips.  Imagine how great it would feel to have them locked against you.  Why resist?</i>\"\n");
		}

		else if (!player.statusAffects.has(StatusAffectType.DriderKiss)) {
			//(HIT? + 10 lust)
			game.player.stats.lust += 10;
			DisplayText("Before you can move, she's right on top of you, leaning ");
			if (player.tallness < 72) DisplayText("down");
			else DisplayText("over");
			DisplayText(" to plant a sloppy, wet kiss upon your lips.  Her glossy lip-venom oozes everywhere, dribbling down your collective chins and sliding into your mouth.  You shudder, trying to resist, but your tongue betrays you.  It slides between her moist, puffy entrance, lapping at her venom and making love to her tongue.");
			if (player.stats.lust <= 99) DisplayText("  Somehow, you work up the willpower to back away, but your body slowly begins to burn hotter and harder, afflicted with a slowly-building lust.");
			player.statusAffects.add(StatusAffectType.DriderKiss, 0, 0, 0, 0);
		}
		//Get hit 2nd time) 
		else {
			player.addStatusValue(StatusAffects.DriderKiss, 1, 1);
			if (player.statusAffects.get(StatusAffectType.DriderKiss).value1 === 1) {
				//(HIT? + 15 lust)
				game.player.stats.lust += 15;
				DisplayText("Again, the drider ties your mouth up in her syrupy lip-lock, seeming to bind your mouth as effectively as her webs bind your body.  Her sweet venom bubbles and froths at the corners of the oral embrace, dripping over her many-breasted bosom and your " + player.Desc.Breast.describeChest(character) + ".");
				if (player.torso.cocks.count > 0) DisplayText("  " + CockDescriptor.describeMultiCockSimpleOne(player, true) + " spews a rope of pre-cum into your " + player.inventory.equipment.armor.displayName + ", desperate to get out and fuck.");
				if (player.torso.vaginas.count > 0) DisplayText("  Fem-cum dribbles down your " + LegDescriptor.describeLegs(player) + " while your " + player.VaginaDescriptor.describeClit(player) + " gets so hard you think it'll explode.");
				DisplayText("  This time, the drider is the one to break the kiss.  She asks, \"<i>Are you ready, my horny little morsel?</i>\"\n");
				if (player.stats.lust <= 99) DisplayText("You shake your head 'no' and stand your ground!\n");
			}
			//(Get hit 3rd+ time)
			else {
				DisplayText("This time you barely move.  Your body is too entranced by the idea of another venom-laced kiss to resist.  Glorious purple goo washes into your mouth as her lips meet yours, sealing tight but letting your tongue enter her mouth to swirl around and feel the venom drip from her fangs.  It's heavenly!  Your " + SkinDescriptor.skin(character) + " grows hot and tingly, and you ache to be touched so badly.  Your " + BreastDescriptor.describeNipple(character, character.torso.chest.get(0)) + "s feel hard enough to cut glass, and a growing part of you admits that you'd love to feel the drider's chitinous fingers pulling on them.");
				//(HIT? + 20 lust)
				game.player.stats.lust += 20;
				if (player.torso.cocks.count > 0 || player.torso.vaginas.count > 0) {
					DisplayText("  The moisture in your crotch only gets worse.  At this point, a ");
					if (player.torso.vaginas.get(0).wetness < 3 && player.cumQ() < 200) DisplayText("small");
					else if (player.torso.vaginas.get(0).wetness < 5 && player.cumQ() < 500) DisplayText("large");
					else DisplayText("massive");
					DisplayText(" wet stain that reeks of your sheer sexual ache has formed in your " + player.inventory.equipment.armor.displayName + ".");
					if (player.stats.lust <= 99) DisplayText("  Amazingly, you resist her and pull back, panting for breath.");
				}
			}
		}
		combatRoundOver();
	}

	public driderMasturbate(): void {
		//-Masturbate - (Lowers lust by 50, raises PC lust)
		lust -= 30;
		game.dynStats("lus", (10 + player.stats.lib / 20));
		DisplayText("The spider-woman skitters back and gives you a lusty, hungry expression.  She shudders and moans, \"<i>Mmm, just watch what you're missing out on...</i>\"\n\n");
		DisplayText("As soon as she finishes, her large clit puffs up, balloon-like.  A second later, it slides forward, revealing nine inches of glossy, girl-spunk-soaked shaft.  Nodules ring the corrupted penis' surface, while the tiny cum-slit perched atop the tip dribbles heavy flows of pre-cum.  She pumps at the fleshy organ while her other hand paws at her jiggling breasts, tugging on the hard ");
		if (nipplesPierced > 0) DisplayText("pierced ");
		DisplayText("nipple-flesh.  Arching her back in a lurid pose, she cries out in high-pitched bliss, her cock pulsing in her hand and erupting out a stream of seed that lands in front of her.\n\n");

		DisplayText("The display utterly distracts you until it finishes, and as you adopt your combat pose once more, you find your own needs harder to ignore, while hers seem to be sated, for now.\n");
		combatRoundOver();
	}

	override protected performCombatAction(): void {
		game.DisplaySprite(77);
		if (lust > 70 && randInt(4) === 0) driderMasturbate();
		//1/4 chance of silence if pc knows spells
		else if (game.hasSpells() && !player.statusAffects.has(StatusAffectType.WebSilence) && randInt(4) === 0) {
			spiderSilence();
		}
		//1/4 chance of disarm
		else if (!player.statusAffects.has(StatusAffectType.Disarmed) && player.weaponName != "fists" && randInt(4) === 0) {
			spiderDisarm();
		}
		//Always web unless already webbed
		else if (player.stats.spe >= 2 && (!player.statusAffects.has(StatusAffectType.Web) || randInt(2) === 0)) {
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
			DisplayText("\n\nThe drider licks her lips in anticipation...");
			return { next: game.endLustLoss };
		} else {
			game.swamp.corruptedDriderScene.loseToDrider();
		}
	}

	public CorruptedDrider() {

		let hair.color: string = randomChoice("red", "orange", "green");
		let skin.tone: string = randomChoice("yellow", "purple", "red", "turquoise");

		let pierced: boolean = randInt(2) === 0;
		this.a = "the ";
		this.short = "corrupted drider";
		this.imageName = "corrupteddrider";
		this.long = "This particular spider-woman is a drider - a creature with a humanoid top half and the lower body of a giant arachnid.  From a quick glance, you can tell that this one has fallen deeply to corruption.  She is utterly nude, exposing her four well-rounded, D-cup breasts with their shiny black nipples.  " + (pierced ? "Gold piercings and chains link the curvy tits together, crossing in front of her four mounds in an 'x' pattern.  " : "") + "On her face and forehead, a quartet of lust-filled, " + skin.tone + " eyes gaze back at you.  Behind her, the monster-girl's " + hair.color + " hair drapes down her back like a cloak.  The drider's lips seem to shine with a light all their own, and a steady trickle of purple, reflective fluid beads and drips from them.  At her waist, there's a juicy looking snatch with a large, highly visible clit.  From time to time it pulsates and grows, turning part-way into a demon-dick.  Her spider-half has eight spindly legs with black and " + hair.color + " stripes - a menacing display if ever you've seen one.";
		// this.plural = false;
		this.createCock(9, 2, CockType.DEMON);
		this.createVagina(false, VaginaWetness.DROOLING, VaginaLooseness.GAPING);
		this.statusAffects.add(StatusAffectType.BonusVCapacity, 70, 0, 0, 0);
		createBreastRow(Appearance.breastCupInverse("DD"));
		this.torso.butt.looseness = ButtLooseness.TIGHT;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.statusAffects.add(StatusAffectType.BonusACapacity, 70, 0, 0, 0);
		this.tallness = 10 * 12;
		this.torso.hipRating = HipRating.CURVY + 2;
		this.torso.butt.rating = ButtRating.LARGE + 1;
		this.torso.hips.legs.type = LegType.DRIDER_LOWER_BODY;
		this.skin.tone = skin.tone;
		this.skin.type = SkinType.PLAIN;
		//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SkinType.PLAIN];
		this.torso.neck.head.hair.color = hair.color;
		this.torso.neck.head.hair.length = 24;
		this.baseStats.str = 100;
this.baseStats.tou = 50;
this.baseStats.spe = 70;
this.baseStats.int = 100;
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
			this.gems = randInt(10) + 30;
		} else {
			this.bonusHP = 250;
			this.lust = 30;
			this.lustVuln = .4;
			this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
			this.level = 14;
			this.gems = randInt(10) + 20;
		}
		this.drop = new WeightedDrop().add(consumables.B_GOSSR, 5)
			.add(useables.T_SSILK, 1)
			.add(null, 4);
		checkMonster();
	}

}
