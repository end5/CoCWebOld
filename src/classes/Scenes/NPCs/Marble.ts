﻿
export default class Marble extends Monster {
	private marbleSpecialAttackOne(): void {
		//Special1: Heavy overhead swing, high chance of being avoided with evasion, does heavy damage if it hits.
		let damage: number = 0;
		//Blind dodge change
		if (statusAffects.has("Blind")) {
			MainScreen.text("Marble unwisely tries to make a massive swing while blinded, which you are easily able to avoid.", false);
			combatRoundOver();
			return;
		}
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 60) {
			MainScreen.text("You manage to roll out of the way of a massive overhand swing.", false);
			combatRoundOver();
			return;
		}
		//Determine if evaded
		if (player.perks.has("Evade") && rand(100) < 60) {
			MainScreen.text("You easily sidestep as Marble tries to deliver a huge overhand blow.", false);
			combatRoundOver();
			return;
		}
		//Determine damage - str modified by enemy toughness!
		damage = int((str + 20 + weaponAttack) - Math.random() * (player.stats.tou) - player.armorDef);
		if (damage <= 0) {
			damage = 0;
			//Due to toughness or amor...
			MainScreen.text("You somehow manage to deflect and block Marble's massive overhead swing.", false);
		}
		if (damage > 0) damage = player.takeDamage(damage);
		MainScreen.text("You are struck by a two-handed overhead swing from the enraged cow-girl.  (" + damage + " damage).", false);
		statScreenRefresh();
		combatRoundOver();
	}
	private marbleSpecialAttackTwo(): void {
		//Special2: Wide sweep; very high hit chance, does low damage.
		let damage: number = 0;
		//Blind dodge change
		if (statusAffects.has("Blind")) {
			MainScreen.text("Marble makes a wide sweeping attack with her hammer, which is difficult to avoid even from a blinded opponent.\n", false);
		}
		//Determine if evaded
		if (player.perks.has("Evade") && rand(100) < 10) {
			MainScreen.text("You barely manage to avoid a wide sweeping attack from marble by rolling under it.", false);
			combatRoundOver();
			return;
		}
		//Determine damage - str modified by enemy toughness!
		damage = int((str + 40 + weaponAttack) - Math.random() * (player.stats.tou) - player.armorDef);
		damage /= 2;
		if (damage <= 0) {
			damage = 0;
			//Due to toughness or amor...
			MainScreen.text("You easily deflect and block the damage from Marble's wide swing.", false);
		}
		MainScreen.text("Marble easily hits you with a wide, difficult to avoid swing.  (" + damage + " damage).", false);
		if (damage > 0) player.takeDamage(damage);
		statScreenRefresh();
		combatRoundOver();
	}

	public defeated(hpVictory: boolean): void {
		game.marbleScene.marbleFightWin();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		game.marbleScene.marbleFightLose();
	}

	public Marble() {
		trace("Marble Constructor!");
		this.a = "";
		this.short = "Marble";
		this.imageName = "marble";
		this.long = "Before you stands a female humanoid with numerous cow features, such as medium-sized cow horns, cow ears, and a cow tail.  She is very well endowed, with wide hips and a wide ass.  She stands over 6 feet tall.  She is using a large two handed hammer with practiced ease, making it clear she is much stronger than she may appear to be.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.NORMAL, VaginaLooseness.NORMAL);
		createBreastRow(Appearance.breastCupInverse("F"));
		this.lowerBody.butt.analLooseness = ButtLooseness.VIRGIN;
		this.lowerBody.butt.analWetness = ButtWetness.DRY;
		this.tallness = 6 * 12 + 4;
		this.lowerBody.hipRating = HipRating.CURVY;
		this.lowerBody.butt.buttRating = ButtRating.LARGE;
		this.lowerBody = LowerBodyType.HOOFED;
		this.skinTone = "pale";
		this.upperBody.head.hairColor = "brown";
		this.upperBody.head.hairLength = 13;
		initStrTouSpeInte(75, 70, 35, 40);
		initLibSensCor(25, 45, 40);
		this.weaponName = "large hammer";
		this.weaponVerb = "hammer-blow";
		this.weaponAttack = 10;
		this.armorName = "tough hide";
		this.armorDef = 5;
		this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
		this.level = 7;
		this.gems = rand(5) + 25;
		this.drop = new WeightedDrop(weapons.L_HAMMR, 1);
		this.tailType = TailType.COW;
		this.special1 = marbleSpecialAttackOne;
		this.special2 = marbleSpecialAttackTwo;
		checkMonster();
	}

}

