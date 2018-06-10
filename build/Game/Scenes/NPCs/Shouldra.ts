/**
 * ...
 * @author ...
 */
export class Shouldra extends Monster {

	private shouldrattack(): void {
		let damage: number = 0;
		//return to combat menu when finished
		return { next: game.playerMenu };
		//Determine if dodged!
		if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
			DisplayText("The girl wades in for a swing, but you deftly dodge to the side. She recovers quickly, spinning back at you.");
			return;
		}
		//("Misdirection"
		if (player.perks.has(PerkType.Misdirection) && randInt(100) < 10 && player.inventory.equipment.armor.displayName === "red, high-society bodysuit") {
			DisplayText("The girl wades in for a swing, but you deftly misdirect her and avoid the attack. She recovers quickly, spinning back at you.");
			return;
		}
		//Determine if cat'ed
		if (player.perks.has(PerkType.Flexibility) && randInt(100) < 6) {
			DisplayText("The girl wades in for a swing, but you deftly twist your flexible body out of the way. She recovers quickly, spinning back at you.");
			return;
		}
		//Determine damage - str modified by enemy toughness!
		damage = int((str + weaponAttack) - randInt(player.stats.tou) - player.armorDef);
		if (damage > 0) damage = player.takeDamage(damage);
		if (damage <= 0) {
			damage = 0;
			//Due to toughness or amor...
			if (randInt(player.armorDef + player.stats.tou) < player.armorDef) DisplayText("You absorb and deflect every " + weaponVerb + " with your " + player.inventory.equipment.armor.displayName + ".");
			else DisplayText("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.");
		}
		//everyone else
		else {
			let choice: number = randInt(3);
			//(regular attack 1)
			if (choice === 0) DisplayText("Ducking in close, the girl thunders a punch against your midsection, leaving a painful sting.");
			//(regular attack 2)
			else if (choice === 1) DisplayText("The girl feints a charge, leans back, and snaps a kick against your " + kGAMECLASS.LowerBodyDescriptor.describeHips(player) + ". You stagger, correct your posture, and plunge back into combat.");
			//(regular attack 3)
			else if (choice === 2) DisplayText("You momentarily drop your guard as the girl appears to stumble. She rights herself as you step forward and lands a one-two combination against your torso.");
			DisplayText(" (" + damage + ")");
		}
		if (damage > 0) {
			if (lustVuln > 0 && player.inventory.equipment.armor.displayName === "barely-decent bondage straps") {
				DisplayText("\n" + capitalA + short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.");
				lust += 5 * lustVuln;
			}
		}
		statScreenRefresh();
		DisplayText("\n");
		combatRoundOver();
	}

	//(lust attack 1)
	private shouldraLustAttack(): void {
		if (randInt(2) === 0) DisplayText("The girl spins away from one of your swings, her tunic flaring around her hips. The motion gives you a good view of her firm and moderately large butt. She notices your glance and gives you a little wink.\n");
		else DisplayText("The girl's feet get tangled on each other and she tumbles to the ground. Before you can capitalize on her slip, she rolls with the impact and comes up smoothly. As she rises, however, you reel back and raise an eyebrow in confusion; are her breasts FILLING the normally-loose tunic? She notices your gaze and smiles, performing a small pirouette on her heel before squaring up to you again. Your confusion only heightens when her torso comes back into view, her breasts back to their normal proportions. A trick of the light, perhaps? You shake your head and try to fall into the rhythm of the fight.\n");
		game.dynStats("lus", (8 + player.stats.lib / 10));
		combatRoundOver();
	}
	//(magic attack)
	private shouldraMagicLazers(): void {
		let damage: number = player.takeDamage(20 + randInt(10));
		DisplayText("Falling back a step, the girl raises a hand and casts a small spell. From her fingertips shoot four magic missiles that slam against your skin and cause a surprising amount of discomfort. (" + damage + ")\n");
		combatRoundOver();
	}

	override protected performCombatAction(): void {
		let attack: number = randInt(3);
		if (attack === 0) shouldrattack();
		else if (attack === 1) shouldraLustAttack();
		else shouldraMagicLazers();
	}

	public defeated(hpVictory: boolean): void {
		game.shouldraScene.defeatDannyPhantom();
	}

	public won(hpVictory: boolean, pcCameWorms: boolean): void {
		game.shouldraScene.loseToShouldra();
	}

	public Shouldra() {
		this.a = "the ";
		this.short = "plain girl";
		this.imageName = "shouldra";
		this.long = "Her face has nothing overly attractive about it; a splash of freckles flits across her cheeks, her brows are too strong to be considered feminine, and her jaw is a tad bit square. Regardless, the features come together to make an aesthetically pleasing countenance, framed by a stylish brown-haired bob. Her breasts are obscured by her grey, loose-fitting tunic, flowing down to reach the middle of her thigh. Her legs are clad in snug, form-fitting leather breeches, and a comfortable pair of leather shoes shield her soles from the potentially harmful environment around her.";
		// this.plural = false;
		this.createVagina(false, VaginaWetness.WET, VaginaLooseness.NORMAL);
		this.statusAffects.add(StatusAffectType.BonusVCapacity, 40, 0, 0, 0));
		createBreastRow(Appearance.breastCupInverse("D"));
		this.torso.butt.looseness = ButtLooseness.TIGHT;
		this.torso.butt.wetness = ButtWetness.DRY;
		this.statusAffects.add(StatusAffectType.BonusACapacity, 40, 0, 0, 0));
		this.tallness = 65;
		this.torso.hips.rating = HipRating.AMPLE;
		this.torso.butt.rating = ButtRating.AVERAGE + 1;
		this.skin.tone = "white";
		this.torso.neck.head.hair.color = "white";
		this.torso.neck.head.hair.length = 3;
		this.baseStats.str = 45;
this.baseStats.tou = 30;
this.baseStats.spe = 5;
this.baseStats.int = 110;
		this.baseStats.lib = 100;
this.baseStats.sens = 0;
this.baseStats.cor = 33;
		this.weaponName = "fists";
		this.weaponVerb = "punches";
		this.armorName = "comfortable clothes";
		this.bonusHP = 30;
		this.lust = 10;
		this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
		this.level = 4;
		this.gems = 0;
		this.drop = new ChainedDrop().add(consumables.ECTOPLS, 1 / 3);
		checkMonster();
	}

}

