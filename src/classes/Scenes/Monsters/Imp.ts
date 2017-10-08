export default class Imp extends Monster {
	public defeated(hpVictory: boolean): void {
		if (statusAffects.has("KitsuneFight")) {
			game.forest.kitsuneScene.winKitsuneImpFight();
		} else {
			game.impScene.impVictory();
		}
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (statusAffects.has("KitsuneFight")) {
			game.forest.kitsuneScene.loseKitsuneImpFight();
		} else if (pcCameWorms) {
			MainScreen.text("\n\nThe imp grins at your already corrupted state...", false);
			player.stats.lust = 100;
			doNext(game.impScene.impRapesYou);
		} else {
			game.impScene.impRapesYou();
		}
	}

	protected lustMagicAttack(): void {
		MainScreen.text("You see " + a + short + " make sudden arcane gestures at you!\n\n");
		game.dynStats("lus", player.stats.lib / 10 + player.stats.cor / 10 + 10);
		if (player.stats.lust < 30) MainScreen.text("You feel strangely warm.  ");
		if (player.stats.lust >= 30 && player.stats.lust < 60) MainScreen.text("Blood rushes to your groin as a surge of arousal hits you, making your knees weak.  ");
		if (player.stats.lust >= 60) MainScreen.text("Images of yourself fellating and fucking the imp assault your mind, unnaturally arousing you.  ");
		if (player.lowerBody.cockSpot.count() > 0) {
			if (player.stats.lust >= 60)
				MainScreen.text("You feel your " + player.CockDescriptor.describeMultiCockShort(player) + " dribble pre-cum.");
			else if (player.stats.lust >= 30 && player.lowerBody.cockSpot.count() == 1)
				MainScreen.text("Your " + player.CockDescriptor.describeCock(player, 0) + " hardens, distracting you further.");
			else if (player.stats.lust >= 30 && player.lowerBody.cockSpot.count() > 1)
				MainScreen.text("Your " + player.CockDescriptor.describeMultiCockShort(player) + " harden uncomfortably.");
			if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("  ");
		}
		if (player.stats.lust >= 60 && player.lowerBody.vaginaSpot.hasVagina()) {
			switch (player.lowerBody.vaginaSpot.get(0).vaginalWetness) {
				case VaginaWetness.NORMAL:
					MainScreen.text("Your " + game.allVaginaDescript() + " dampen" + (player.lowerBody.vaginaSpot.count() > 1 ? "" : "s") + " perceptibly.");
					break;
				case VaginaWetness.WET:
					MainScreen.text("Your crotch becomes sticky with girl-lust.");
					break;
				case VaginaWetness.SLICK:
					MainScreen.text("Your " + game.allVaginaDescript() + " become" + (player.lowerBody.vaginaSpot.count() > 1 ? "" : "s") + " sloppy and wet.");
					break;
				case VaginaWetness.DROOLING:
					MainScreen.text("Thick runners of girl-lube stream down the insides of your thighs.");
					break;
				case VaginaWetness.SLAVERING:
					MainScreen.text("Your " + game.allVaginaDescript() + " instantly soak" + (player.lowerBody.vaginaSpot.count() > 1 ? "" : "s") + " your groin.");
				default: //Dry vaginas are unaffected

			}
		}
		MainScreen.text("\n");
		if (player.stats.lust > 99)
			doNext(game.endLustLoss);
		else doNext(game.playerMenu);
	}

	public Imp(noInit: boolean = false) {
		if (noInit) return;
		trace("Imp Constructor!");
		this.a = "the ";
		this.short = "imp";
		this.imageName = "imp";
		this.long = "An imp is short, only a few feet tall.  An unkempt mane of shaggy black hair hangs from his head, parted by two short curved horns.  His eyes are solid black, save for tiny red irises which glow with evil intent.  His skin is bright red, and unencumbered by clothing or armor, save for a small loincloth at his belt.  His feet are covered by tiny wooden sandals, and his hands tipped with sharp claws.  A pair of tiny but functional wings occasionally flap from his back.";
		// this.plural = false;
		this.createCock(rand(2) + 11, 2.5, CockType.DEMON);
		this.balls = 2;
		this.ballSize = 1;
		createBreastRow(0);
		this.lowerBody.butt.analLooseness = ButtLooseness.STRETCHED;
		this.lowerBody.butt.analWetness = ButtWetness.NORMAL;
		this.tallness = rand(24) + 25;
		this.lowerBody.hipRating = HipRating.BOYISH;
		this.lowerBody.butt.buttRating = ButtRating.TIGHT;
		this.skinTone = "red";
		this.upperBody.head.hairColor = "black";
		this.upperBody.head.hairLength = 5;
		initStrTouSpeInte(20, 10, 25, 12);
		initLibSensCor(45, 45, 100);
		this.weaponName = "claws";
		this.weaponVerb = "claw-slash";
		this.armorName = "leathery skin";
		this.lust = 40;
		this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
		this.level = 1;
		this.gems = rand(5) + 5;
		this.drop = new WeightedDrop().
			add(consumables.SUCMILK, 3).
			add(consumables.INCUBID, 3).
			add(consumables.IMPFOOD, 4);
		this.special1 = lustMagicAttack;
		this.wingType = WingType.IMP;
		checkMonster();
	}

}
