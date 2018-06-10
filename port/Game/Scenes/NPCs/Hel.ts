
	export class Hel extends Monster
	{

		private helAttack():void {
			var damage: number;
			//return to combat menu when finished
			doNext(game.playerMenu);
			//Blind dodge change
			if (findStatusAffect(StatusAffects.Blind) >= 0 && rand(3) < 1) {
				outputText(capitalA + short + " completely misses you with a blind attack!\n", false);
			}
			//Determine if dodged!
			else if (player.spe - spe > 0 && Math.floor(Math.random() * (((player.spe-spe) / 4) + 80)) > 80) {
				outputText("You nimbly dodge the salamander's massive sword thrust!", false);
			}
			//Determine if evaded
			else if (player.findPerk(PerkLib.Evade) >= 0 && rand(100) < 10) {
				outputText("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.\n", false);
			}
			//("Misdirection"
			else if (player.findPerk(PerkLib.Misdirection) >= 0 && rand(100) < 10 && player.armorName == "red, high-society bodysuit") {
				outputText("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' attacks.\n", false);
			}
			//Determine if cat'ed
			else if (player.findPerk(PerkLib.Flexibility) >= 0 && rand(100) < 6) {
				outputText("With your incredible flexibility, you squeeze out of the way of " + a + short + "", false);
			}
			//Determine damage - str modified by enemy toughness!
			else
			{
				damage = Math.floor((str + weaponAttack) - rand(player.tou/2) - player.armorDef/2);
				if(damage > 0) damage = player.takeDamage(damage);
				//No damage
				if(damage <= 0) {
					damage = 0;
					//Due to toughness or amor...
					if(rand(player.armorDef + player.tou) < player.armorDef) outputText("You absorb and deflect every " + weaponVerb + " with your " + player.armorName + ".", false);
					else outputText("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.", false);
				}
				//Take Damage
				else outputText("The salamander lunges at you, sword swinging in a high, savage arc.  You attempt to duck her attack, but she suddenly spins about mid-swing, bringing the sword around on a completely different path.  It bites deep into your flesh, sending you stumbling back. (" + damage + ")", false);
				if(damage > 0) {
					if(lustVuln > 0 && player.armorName == "barely-decent bondage straps") {
						outputText("\n" + capitalA + short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.", false);
						lust += 5 * lustVuln;
					}
				}
			}
			
			statScreenRefresh();
			outputText("\n", false);
			combatRoundOver();
		}

		//Attack 2 – Tail Slap (Hit)
		//low dodge chance, lower damage
		private helAttack2():void {
			var damage: number;
			//return to combat menu when finished
			doNext(game.playerMenu);
			//Blind dodge change
			if(findStatusAffect(StatusAffects.Blind) >= 0 && rand(3) < 1) {
				outputText(capitalA + short + " completely misses you with a blind attack!\n", false);
				return;
			}
			//Determine if dodged!
			if(player.spe - spe > 0 && Math.floor(Math.random()*(((player.spe-spe)/4)+80)) > 83) {
				outputText("The salamander rushes at you, knocking aside your defensive feint and trying to close the distance between you.  She lashes out at your feet with her tail, and you're only just able to dodge the surprise attack.", false);
				return;
			}
			//Determine if evaded
			if(player.findPerk(PerkLib.Evade) >= 0 && rand(100) < 5) {
				outputText("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s tail-swipe.\n", false);
				return;
			}
			//("Misdirection"
			if(player.findPerk(PerkLib.Misdirection) >= 0 && rand(100) < 5 && player.armorName == "red, high-society bodysuit") {
				outputText("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' tail-swipe.\n", false);
				return;
			}
			//Determine if cat'ed
			if(player.findPerk(PerkLib.Flexibility) >= 0 && rand(100) < 3) {
				outputText("With your incredible flexibility, you squeeze out of the way of a tail-swipe!", false);
				return;
			}
			//Determine damage - str modified by enemy toughness!
			damage = Math.floor((str) - rand(player.tou) - player.armorDef);
			if(damage > 0) damage = player.takeDamage(damage);
			//No damage
			if(damage <= 0) {
				damage = 0;
				//Due to toughness or amor...
				if(rand(player.armorDef + player.tou) < player.armorDef) outputText("The salamander's tail-swipe harmlessly deflects off your armor!", false);
				else outputText("The salamander's tail-swipe hits you but fails to move or damage you.", false);
			}
			//Take Damage
			else outputText("The salamander rushes at you, knocking aside your defensive feint and sliding in past your guard.  She lashes out at your feet with her tail, and you can feel the heated wake of the fiery appendage on your ensuing fall toward the now-smouldering grass. (" + damage + ")", false);
			if(damage > 0) {
				if(lustVuln > 0 && player.armorName == "barely-decent bondage straps") {
					outputText("\n" + capitalA + short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.", false);
					lust += 5 * lustVuln;
				}
			}
			statScreenRefresh();
			outputText("\n", false);
			combatRoundOver();
		}

		private helCleavage():void {
			//FAIL
			if((player.findPerk(PerkLib.Flexibility) >= 0 && rand(100) < 6) || (player.findPerk(PerkLib.Evade) >= 0 && rand(100) < 10) || (player.spe - spe > 0 && Math.floor(Math.random()*(((player.spe-spe)/4)+80)) > 80)) {
				outputText("To your surprise, the salamander suddenly pulls up her top, letting her hefty breasts hang free in the air; her small, bright pink nipples quickly harden from either arousal or temperature.  Before you can take your eyes off her impressive rack, she jumps at you.  One of her scaled arms reaches around your waist, and the other toward your head, but you roll away from her grip and push her bodily away.  She staggers a moment, but then quickly yanks the jangling bikini top back down with a glare.\n", false);
			}
			//Attack 3 – Lust – Cleavage (Failure)
			else {
				outputText("To your surprise, the salamander suddenly yanks up her top, letting her hefty breasts hang free in the air; her small, bright pink nipples quickly harden from either arousal or temperature.  Before you can take your eyes off her impressive rack, she jumps at you.  One of her scaled arms encircles your waist, and the other forcefully shoves your face into her cleavage.  She jiggles her tits around your face for a moment before you're able to break free, though you can feel a distinct heat rising in your loins.  As quickly as they were revealed, the breasts are concealed again and your opponent is ready for more combat!", false);
				var lust: number = 20 + rand(10) + player.sens/10 + rand(player.lib/20);
				game.dynStats("lus", lust);
				//Apply resistance
				lust *= game.lustPercent()/100;
				//Clean up
				lust = Math.round(lust * 10)/10;
				outputText(" (+" + lust + " lust)\n", false);
			}
			combatRoundOver();
		}
		override protected function performCombatAction():void
		{
			trace("Hel Perform Combat Action Called");
			var select: number = rand(3);
			trace("Selected: " + select);
			switch(select) {
				case 0:
					helAttack();
					break;
				case 1:
					helAttack2();
					break;
				default:
					helCleavage();
					break;
			}
		}

		override public defeated(hpVictory: boolean):void
		{
			if(findStatusAffect(StatusAffects.Sparring) >= 0) game.helFollower.PCBeatsUpSalamanderSparring();
			else game.helScene.beatUpHel();
		}

		override public won(hpVictory: boolean, pcCameWorms: boolean):void
		{
			if (pcCameWorms){
				outputText("\n\nHelia waits it out in stoic silence...");
				doNext(game.endLustLoss);
			} else {
				if(findStatusAffect(StatusAffects.Sparring) >= 0) game.helFollower.loseToSparringHeliaLikeAButtRapedChump();
				else game.helScene.loseToSalamander();
			}
		}

		public Hel()
		{
			if (game.flags[kFLAGS.HEL_TALKED_ABOUT_HER] == 1) {
				this.a = "";
				this.short = "Hel";
			} else {
				this.a = "the ";
				this.short = "salamander";
			}
			this.imageName = "hel";
			this.long = "You are fighting a (literally) smoking hot salamander – a seven foot tall woman with crimson scales covering her legs, back, and forearms, with a tail swishing menacingly behind her, ablaze with a red-hot fire.  Her red hair whips wildly around her slender shoulders, occasionally flitting over her hefty E-cup breasts, only just concealed within a scale-covered bikini top.  Bright red eyes focus on you from an almost-human face as she circles you, ready to close in for the kill.  Her brutal, curved sword is raised to her side, feinting at you between genuine attacks.";
			createVagina(true,VAGINA_WETNESS_NORMAL,VAGINA_LOOSENESS_NORMAL);
			createStatusAffect(StatusAffects.BonusVCapacity,85,0,0,0);
			createBreastRow(Appearance.breastCupInverse("E+"));
			this.ass.analLooseness = ANAL_LOOSENESS_VIRGIN;
			this.ass.analWetness = ANAL_WETNESS_DRY;
			this.createStatusAffect(StatusAffects.BonusACapacity,85,0,0,0);
			this.tallness = 90;
			this.hipRating = HIP_RATING_CURVY+2;
			this.buttRating = BUTT_RATING_LARGE+1;
			this.skinTone = "dusky";
			this.hairColor = "red";
			this.hairLength = 13;
			initStrTouSpeInte(80, 70, 75, 60);
			initLibSensCor(65, 25, 30);
			this.weaponName = "sword";
			this.weaponVerb="slashing blade";
			this.weaponAttack = 20;
			this.armorName = "scales";
			this.armorDef = 14;
			this.armorPerk = "";
			this.armorValue = 50;
			this.bonusHP = 275;
			this.lust = 30;
			this.lustVuln = .35;
			this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
			this.level = 16;
			this.gems = 10 + rand(5);
			this.drop = new ChainedDrop().
					add(armors.CHBIKNI,1/20).
					add(consumables.REPTLUM,0.7);
			this.tailType = TAIL_TYPE_LIZARD;
			this.tailRecharge = 0;
			this.createStatusAffect(StatusAffects.Keen,0,0,0,0);
			checkMonster();
		}
		
	}

}