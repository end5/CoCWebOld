package classes.Scenes.Areas.Plains
{
	import classes.*;
	import classes.internals.*;

	/**
	 * ...
	 * @author ...
	 */
	public class Gnoll extends Monster 
	{

		//Gnoll Description
		private function gnollAttackText():void {
			let damage:number = 0;
			let attack:number = rand(6);
			//return to combat menu when finished
			doNext(game.playerMenu);
			//Blind dodge change
			if(statusAffects.has("Blind") && rand(3) < 2) {
				Render.text(capitalA + short + " completely misses you with a blind attack!\n", false);
			}
			//Determine if dodged!
			else if(player.stats.spe - spe > 0 && int(Math.random()*(((player.stats.spe-spe)/4)+80)) > 80) {
				if(player.stats.spe - spe < 8) Render.text("You narrowly avoid " + a + short + "'s " + weaponVerb + "!\n", false);
				else if(player.stats.spe - spe >= 8 && player.stats.spe-spe < 20) Render.text("You dodge " + a + short + "'s " + weaponVerb + " with superior quickness!\n", false);
				else if(player.stats.spe - spe >= 20) Render.text("You deftly avoid " + a + short + "'s slow " + weaponVerb + ".\n", false);
			}
			//Determine if evaded
			else if(player.perks.has("Evade") && rand(100) < 10) {
				Render.text("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.\n", false);
			}
			//("Misdirection"
			else if(player.perks.has("Misdirection") && rand(100) < 10 && player.armorName == "red, high-society bodysuit") {
				Render.text("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' attacks.\n", false);
			}
			//Determine if cat'ed
			else if(player.perks.has("Flexibility") && rand(100) < 6) {
				Render.text("With your incredible flexibility, you squeeze out of the way of " + a + short + "", false);
				if(plural) Render.text("' attacks.\n", false);
				else Render.text("'s attack.\n", false);
			}
			else {
				//Determine damage - str modified by enemy toughness!
				damage = int((str + weaponAttack) - Math.random()*(player.tou) - player.armorDef);
				if(damage <= 0) {
					damage = 0;
					//hapies have their own shit
					if(short == "harpy") Render.text("The harpy dives at you with her foot-talons, but you deflect the attack, grasp onto her leg, and swing her through the air, tossing her away from you before she has a chance to right herself.", false);
					//Due to toughness or amor...
					else if(rand(player.armorDef + player.tou) < player.armorDef) Render.text("Your " + player.armorName + " absorb and deflect every " + weaponVerb + " from " + a + short + ".", false);
					else Render.text("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.", false);
				}
				//everyone else
				else {
					//Gnoll Attack #1
					if(attack == 0) {
						Render.text("The gnoll leaps forward, her jaws slamming shut across your upper arm.  She twists away before you can touch her, laughing the entire time.", false);
						damage += 10;
					}
					//Gnoll Attack #2
					else if(attack == 1) {
						Render.text("With a shudder and lurch, the gnoll barrels forward into your gut, the claws of her free hand raking across your belly.", false);
						damage += 3;
					}
					//Gnoll Attack #3
					else if(attack == 2) {
						Render.text("The gnoll tumbles to the ground, then comes up with a handful of sand.  The sand goes in your face; the club goes into your cheek.  Ow.", false);
						damage += 13;
					}
					//Gnoll Attack #4
					else if(attack == 3) {
						Render.text("The hyena girl giggles and darts forward, teeth snapping.  Spittle flies everywhere, and the snapping teeth find purchase, drawing red lines across your body.", false);
						damage += 8;
					}
					//Gnoll Attack #5
					else if(attack == 4) {
						Render.text("With a mocking laugh, the gnoll brings her club high and then down in a savage strike that catches you across the temple.", false);
						damage += 25;
					}
					//Gnoll Attack #6
					else {
						Render.text("The gnoll waves her club threateningly, but it's her foot that snaps up from the dusty plain to connect with your gut.", false);
					}
					damage = player.takeDamage(damage);
					Render.text(" (" + damage + ")\n", false);
					
				}
				game.statScreenRefresh();
			}
		}
		
		private function gnollTease():void {
			let tease:number = rand(6);
			let bonus:number = 0;
			//Gnoll Tease #1
			if(tease == 0) {
				Render.text("The gnoll takes a moment to stretch her sleek, athletic body.  Her free hand runs up her side and she leers knowingly at you.", false);
				bonus += 5;
			}
			//Gnoll Tease #2
			else if(tease == 1) {
				Render.text("With one hand, the hyena girl grasps her eight-inch clitoris and strokes it.  \"<i>I know you're curious!</i>\" she laughs.  \"<i>You want to try this.</i>\"", false);
				bonus += 5;
			}
			//Gnoll Tease #3
			else if(tease == 2) {
				Render.text("The gnoll bounds forward, but instead of clobbering you she slides her lithe body against yours.  \"<i>We don't have to fight,</i>\" she titters.  \"<i>It's lots easier if I just fuck you.</i>\"", false);
				bonus += 10;
			}
			//Gnoll Tease #4
		 	else if(tease == 3) {
				Render.text("The gnoll slides her fingers down the length of her pseudo-penis and collects the cream that drips from its end.  With two steps, she's inside your guard, but all she does is wave her hand in front of your nose.  The reek of sex nearly bowls you over.", false);
				bonus += 12;
			}
			//Gnoll Tease #5
			else if(tease == 4) Render.text("\"<i>I love outlanders,</i>\" the gnoll confides in you as she circles.  \"<i>You have such interesting cries when you get fucked in a new way.</i>\"  She laughs, and the sound is far louder than it has any right to be.\n\n", false);
			//Gnoll Tease #6
			else {
				Render.text("The gnoll dances forward, then back, her whole body alive with sensual movement.  She catches the way you watch her and smirks, throwing in a hip-shake just for you.", false);
				bonus += 6;
			}
			game.dynStats("lus", (bonus + 10 + player.stats.lib/20 + rand(player.stats.cor/20)));
			Render.text("\n", false);
		}

		public eAttack():void
		{
			let damage:number = 0;
			let attack:number = rand(6);
//return to combat menu when finished
			doNext(game.playerMenu);
//Blind dodge change
			if (statusAffects.has("Blind") && rand(3) < 2) {
				Render.text(capitalA + short + " completely misses you with a blind attack!\n", false);
			}
			//Determine if dodged!
			else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
				if (player.stats.spe - spe < 8) Render.text("You narrowly avoid " + a + short + "'s " + weaponVerb + "!\n", false);
				else if (player.stats.spe - spe >= 8 && player.stats.spe - spe < 20) Render.text("You dodge " + a + short + "'s " + weaponVerb + " with superior quickness!\n", false);
				else if (player.stats.spe - spe >= 20) Render.text("You deftly avoid " + a + short + "'s slow " + weaponVerb + ".\n", false);
			}
			//Determine if evaded
			else if (player.perks.has("Evade") && rand(100) < 10) {
				Render.text("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.\n", false);
			}
			//("Misdirection"
			else if (player.perks.has("Misdirection") && rand(100) < 10 && player.armorName == "red, high-society bodysuit") {
				Render.text("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' attacks.\n", false);
			}
			//Determine if cat'ed
			else if (player.perks.has("Flexibility") && rand(100) < 6) {
				Render.text("With your incredible flexibility, you squeeze out of the way of " + a + short + "", false);
				if (plural) Render.text("' attacks.\n", false);
				else Render.text("'s attack.\n", false);
			}
			else {
				//Determine damage - str modified by enemy toughness!
				damage = int((str + weaponAttack) - Math.random() * (player.tou) - player.armorDef);
				if (damage <= 0) {
					damage = 0;
					//hapies have their own shit
					if (short == "harpy") Render.text("The harpy dives at you with her foot-talons, but you deflect the attack, grasp onto her leg, and swing her through the air, tossing her away from you before she has a chance to right herself.", false);
					//Due to toughness or amor...
					else if (rand(player.armorDef + player.tou) < player.armorDef) Render.text("Your " + player.armorName + " absorb and deflect every " + weaponVerb + " from " + a + short + ".", false);
					else Render.text("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.", false);
				}
				//everyone else
				else {
					//Gnoll Attack #1
					if (attack == 0) {
						Render.text("The gnoll leaps forward, her jaws slamming shut across your upper arm.  She twists away before you can touch her, laughing the entire time.", false);
						damage += 10;
					}
					//Gnoll Attack #2
					else if (attack == 1) {
						Render.text("With a shudder and lurch, the gnoll barrels forward into your gut, the claws of her free hand raking across your belly.", false);
						damage += 3;
					}
					//Gnoll Attack #3
					else if (attack == 2) {
						Render.text("The gnoll tumbles to the ground, then comes up with a handful of sand.  The sand goes in your face; the club goes into your cheek.  Ow.", false);
						damage += 13;
					}
					//Gnoll Attack #4
					else if (attack == 3) {
						Render.text("The hyena girl giggles and darts forward, teeth snapping.  Spittle flies everywhere, and the snapping teeth find purchase, drawing red lines across your body.", false);
						damage += 8;
					}
					//Gnoll Attack #5
					else if (attack == 4) {
						Render.text("With a mocking laugh, the gnoll brings her club high and then down in a savage strike that catches you across the temple.", false);
						damage += 25;
					}
					//Gnoll Attack #6
					else {
						Render.text("The gnoll waves her club threateningly, but it's her foot that snaps up from the dusty plain to connect with your gut.", false);
					}
					damage = player.takeDamage(damage);
					Render.text(" (" + damage + ")\n", false);
				}
				game.statScreenRefresh();
			}
		}

		override protected function performCombatAction():void
		{
			if (statusAffects.has("Stunned")) {
				if (plural) Render.text("Your foes are too dazed from your last hit to strike back!", false);
				else Render.text("Your foe is too dazed from your last hit to strike back!", false);
				statusAffects.remove("Stunned");
				combatRoundOver();
			}
			if (statusAffects.has("Fear")) {
				if (statusAffects.get("Fear").value1 == 0) {
					if (plural) {
						statusAffects.remove("Fear");
						Render.text("Your foes shake free of their fear and ready themselves for battle.", false);
					}
					else {
						statusAffects.remove("Fear");
						Render.text("Your foe shakes free of its fear and readies itself for battle.", false);
					}
				}
				else {
					statusAffects.get("Fear").value1 = -1;
					if (plural) Render.text(capitalA + short + " are too busy shivering with fear to fight.", false);
					else Render.text(capitalA + short + " is too busy shivering with fear to fight.", false);
				}
				combatRoundOver();
			}
			let select:number = 1;
			let rando:number = 1;
//Exgartuan gets to do stuff!
			if (player.statusAffects.has("Exgartuan") && player.statusAffects.get("Exgartuan").value2 == 0 && rand(3) == 0) {
				game.exgartuan.exgartuanCombatUpdate();
				Render.text("\n\n", false);
			}
			if (statusAffects.has("Constricted")) {
				//Enemy struggles -
				Render.text("Your prey pushes at your tail, twisting and writhing in an effort to escape from your tail's tight bonds.", false);
				if (statusAffects.get("Constricted").value1 <= 0) {
					Render.text("  " + capitalA + short + " proves to be too much for your tail to handle, breaking free of your tightly bound coils.", false);
					statusAffects.remove("Constricted");
				}
				statusAffects.get("Constricted").value1 = -1;
				combatRoundOver();
			}
//If grappling...
/* Grappling was never included
			if (game.gameState == 2) {
				//temperment - used for determining grapple behaviors
				//0 - avoid grapples/break grapple
				//1 - lust determines > 50 grapple
				//2 - random
				//3 - love grapples
				//		if(temperment == 0) eGrappleRetreat();
				if (temperment == 1) {
					//			if(lust < 50) eGrappleRetreat();
					doNext(3);
				}
				Render.text("Lust Placeholder!!", false);
				doNext(3);
			}
*/
			if (rand(2) == 0) gnollTease();
			else {
				let damage:number = 0;
				let attack:number = rand(6);
//return to combat menu when finished
				doNext(game.playerMenu);
//Blind dodge change
				if (statusAffects.has("Blind") && rand(3) < 2) {
					Render.text(capitalA + short + " completely misses you with a blind attack!\n", false);
				}
				//Determine if dodged!
				else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
					if (player.stats.spe - spe < 8) Render.text("You narrowly avoid " + a + short + "'s " + weaponVerb + "!\n", false);
					else if (player.stats.spe - spe >= 8 && player.stats.spe - spe < 20) Render.text("You dodge " + a + short + "'s " + weaponVerb + " with superior quickness!\n", false);
					else if (player.stats.spe - spe >= 20) Render.text("You deftly avoid " + a + short + "'s slow " + weaponVerb + ".\n", false);
				}
				//Determine if evaded
				else if (player.perks.has("Evade") && rand(100) < 10) {
					Render.text("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.\n", false);
				}
				//("Misdirection"
				else if (player.perks.has("Misdirection") && rand(100) < 10 && player.armorName == "red, high-society bodysuit") {
					Render.text("Using Raphael's teachings, you anticipate and sidestep " + a + short + "' attacks.\n", false);
				}
				//Determine if cat'ed
				else if (player.perks.has("Flexibility") && rand(100) < 6) {
					Render.text("With your incredible flexibility, you squeeze out of the way of " + a + short + "", false);
					if (plural) Render.text("' attacks.\n", false);
					else Render.text("'s attack.\n", false);
				}
				else {
					//Determine damage - str modified by enemy toughness!
					damage = int((str + weaponAttack) - Math.random() * (player.tou) - player.armorDef);
					if (damage <= 0) {
						damage = 0;
						//hapies have their own shit
						if (short == "harpy") Render.text("The harpy dives at you with her foot-talons, but you deflect the attack, grasp onto her leg, and swing her through the air, tossing her away from you before she has a chance to right herself.", false);
						//Due to toughness or amor...
						else if (rand(player.armorDef + player.tou) < player.armorDef) Render.text("Your " + player.armorName + " absorb and deflect every " + weaponVerb + " from " + a + short + ".", false);
						else Render.text("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.", false);
					}
					//everyone else
					else {
						//Gnoll Attack #1
						if (attack == 0) {
							Render.text("The gnoll leaps forward, her jaws slamming shut across your upper arm.  She twists away before you can touch her, laughing the entire time.", false);
							damage += 10;
						}
						//Gnoll Attack #2
						else if (attack == 1) {
							Render.text("With a shudder and lurch, the gnoll barrels forward into your gut, the claws of her free hand raking across your belly.", false);
							damage += 3;
						}
						//Gnoll Attack #3
						else if (attack == 2) {
							Render.text("The gnoll tumbles to the ground, then comes up with a handful of sand.  The sand goes in your face; the club goes into your cheek.  Ow.", false);
							damage += 13;
						}
						//Gnoll Attack #4
						else if (attack == 3) {
							Render.text("The hyena girl giggles and darts forward, teeth snapping.  Spittle flies everywhere, and the snapping teeth find purchase, drawing red lines across your body.", false);
							damage += 8;
						}
						//Gnoll Attack #5
						else if (attack == 4) {
							Render.text("With a mocking laugh, the gnoll brings her club high and then down in a savage strike that catches you across the temple.", false);
							damage += 25;
						}
						//Gnoll Attack #6
						else {
							Render.text("The gnoll waves her club threateningly, but it's her foot that snaps up from the dusty plain to connect with your gut.", false);
						}
						damage = player.takeDamage(damage);
						Render.text(" (" + damage + ")\n", false);
					}
					game.statScreenRefresh();
				}
				gnollAttackText();
			}
			combatRoundOver();
		}


		public defeated(hpVictory:boolean):void
		{
			if(statusAffects.has("PhyllaFight")) {
				statusAffects.remove("PhyllaFight");
				game.desert.antsScene.phyllaPCBeatsGnoll();
				return;
			}
			game.plains.gnollScene.defeatHyena();
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			if(statusAffects.has("PhyllaFight")) {
				statusAffects.remove("PhyllaFight");
				game.desert.antsScene.phyllaGnollBeatsPC();
			} else if(pcCameWorms) {
				Render.text("\n\nYour foe doesn't seem put off enough to leave...");
				doNext(game.endLustLoss);
			} else {
				game.plains.gnollScene.getRapedByGnoll();
			}
		}

		public function Gnoll()
		{
			this.a = "the ";
			this.short = "gnoll";
			this.imageName = "gnoll";
			this.long = "This lanky figure is dappled with black spots across rough, tawny fur. Wiry muscle ripples along long legs and arms, all of it seeming in perpetual frenetic motion: every moment half flinching and half lunging.  The head bears a dark muzzle curled in a perpetual leer and bright orange eyes watching with a savage animal cunning.  Between the legs hang what appears at first to be a long, thin dong; however, on closer inspection it is a fused tube of skin composed of elongated pussy lips and clitoris.  The hyena girl is sporting a pseudo-penis, and judging by the way it bobs higher as she jinks back and forth, she's happy to see you!\n\nShe wears torn rags scavenged from some other, somewhat smaller, creature, and in one hand clutches a twisted club.";
			// this.plural = false;
			this.createVagina(false, VAGINA_WETNESS.DROOLING, VAGINA_LOOSENESS.LOOSE);
			createBreastRow(Appearance.breastCupInverse("C"));
			this.ass.analLooseness = ANAL_LOOSENESS.STRETCHED;
			this.ass.analWetness = ANAL_WETNESS.DRY;
			this.statusAffects.add(new StatusAffect("BonusACapacity",25,0,0,0)));
			this.tallness = 6*12;
			this.hipRating = HIP_RATING.AMPLE;
			this.buttRating = BUTT_RATING.TIGHT;
			this.skinTone = "tawny";
			this.skinType = SKIN.FUR;
			//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SKIN.FUR];
			this.hairColor = "black";
			this.hairLength = 22;
			initStrTouSpeInte(80, 70, 75, 60);
			initLibSensCor(65, 25, 60);
			this.weaponName = "twisted club";
			this.weaponVerb="smash";
			this.weaponAttack = 0;
			this.weaponPerk = "";
			this.weaponValue = 25;
			this.armorName = "skin";
			this.armorDef = 2;
			this.bonusHP = 250;
			this.lust = 30;
			this.lustVuln = .35;
			this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
			this.level = 14;
			this.gems = 10 + rand(5);
			this.drop = new ChainedDrop().
					add(consumables.REDUCTO,1/5).
					add(consumables.SUCMILK,1/2).
					elseDrop(consumables.BLACK_D);
			checkMonster();
		}
		
	}

}