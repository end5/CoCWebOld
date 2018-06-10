
export class SandWitch extends Monster {


	public defeated(hpVictory: boolean): void {
		if (player.findStatusAffect(StatusAffects.StoneLust)) {
			player.statusAffects.remove("StoneLust");
		}

		if (player.stats.lust >= 33) {
			game.desert.sandWitchScene.beatSandwitch();
		} else {
			game.finishCombat();
		}
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		if (pcCameWorms) {
			DisplayText("\n\nThe witch blanches and backs away, leaving you to your fate.");
			game.cleanupAfterCombat();
		} else {
			game.desert.sandWitchScene.sandwitchRape();
		}
	}

	private lustMagicAttack(): void {
		DisplayText("The sand witch points at you, drawing a circle in the air and mouthing strange words.\n\n");
		if (player.statusAffects.has(StatusAffectType.StoneLust)) {
			DisplayText("The orb inside you grows warm, almost hot, suffusing your body with heat and arousal.  ");
			game.dynStats("lus", 8 + int(player.stats.sens) / 10);
		}
		else {
			DisplayText("You feel the sands shift by your " + LowerBodyDescriptor.describeFeet(player) + ", and look down to see something slip out of the sands and into your clothes!  It feels incredibly smooth and circular as it glides upward along your " + LegDescriptor.describeLeg(player) + ", its progress unaffected by your frantic effort to dislodge it.  ");
			if (player.torso.vaginas.count > 0) DisplayText("It glides up your thighs to the entrance of your sex, and its intentions dawn on you!\n\nToo late! You reach to stop it, but it pushes against your lips and slips inside your " + VaginaDescriptor.describeVagina(player, player.torso.vaginas.get(0)) + " in an instant.  You groan in frustration as it begins pulsing and vibrating, sometimes even seeming to change size.");
			else DisplayText("It glides up your thighs, curving around your buttocks, and its intentions dawn on you.\n\nYou desperately grab for it, but are too late!  It pushes firmly against your rectum and slips inside instantaneously.  You groan in frustration as it begins pulsing and vibrating, sometimes even seeming to change size.");
			player.statusAffects.add(StatusAffectType.StoneLust, 0, 0, 0, 0);
			game.dynStats("lus", 4 + int(player.stats.sens) / 10);
		}
		return { next: game.playerMenu };
	}

	public SandWitch() {
		trace("SandWitch Constructor!");
		this.a = "the ";
		if (game.silly()) {
			this.short = "sand witch";
			this.imageName = "sandwidch";
		} else {
			this.short = "sand witch";
			this.imageName = "sandwitch";
		}
		this.long = "A sand witch appears to be totally human, an oddity in this strange land.  She has dirty blonde hair and a very tanned complexion, choosing to cover most of her body with robes of the same color as the desert sands, making her impossible to spot from afar.";
		this.createVagina(false, VaginaWetness.WET, VaginaLooseness.LOOSE);
		this.createBreastRow(Appearance.breastCupInverse("DD"));
		this.createBreastRow(Appearance.breastCupInverse("DD"));
		this.torso.butt.looseness = ButtLooseness.TIGHT;
		this.torso.butt.wetness = ButtWetness.NORMAL;
		this.tallness = randInt(12) + 55;
		this.torso.hipRating = HipRating.CURVY;
		this.torso.butt.rating = ButtRating.LARGE;
		this.skin.tone = "bronzed";
		this.torso.neck.head.hair.color = "sandy-blonde";
		this.torso.neck.head.hair.length = 15;
		this.baseStats.str = 25;
this.baseStats.tou = 25;
this.baseStats.spe = 35;
this.baseStats.int = 45;
		initLibSensCor(55, 40, 30);
		this.weaponName = "kick";
		this.weaponVerb = "kick";
		this.armorName = "robes";
		this.bonusHP = 20;
		this.lust = 30;
		this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
		this.level = 3;
		this.gems = randInt(15) + 5;
		this.drop = new WeightedDrop().addMany(1,
			consumables.TSCROLL,
			consumables.OVIELIX,
			consumables.LACTAID,
			consumables.LABOVA_,
			consumables.W__BOOK,
			consumables.B__BOOK,
			null);
		this.special1 = lustMagicAttack;
		this.special2 = special2;
		this.special3 = special3;
		checkMonster();
	}

}

