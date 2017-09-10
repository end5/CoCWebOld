package classes.Scenes.NPCs
{
	import classes.*;
	import classes.GlobalFlags.kGAMECLASS;
	import classes.internals.*;

	/**
	 * ...
	 * @author ...
	 */
	public class Shouldra extends Monster 
	{

		private shouldrattack():void {
			let damage:number = 0;
			//return to combat menu when finished
			doNext(game.playerMenu);
			//Determine if dodged!
			if(player.stats.spe - spe > 0 && int(Math.random()*(((player.stats.spe-spe)/4)+80)) > 80) {
				Render.text("The girl wades in for a swing, but you deftly dodge to the side. She recovers quickly, spinning back at you.", false);
				return;
			}
			//("Misdirection"
			if(player.perks.has("Misdirection") && rand(100) < 10 && player.armorName == "red, high-society bodysuit") {
				Render.text("The girl wades in for a swing, but you deftly misdirect her and avoid the attack. She recovers quickly, spinning back at you.", false);
				return;
			}
			//Determine if cat'ed
			if(player.perks.has("Flexibility") && rand(100) < 6) {
				Render.text("The girl wades in for a swing, but you deftly twist your flexible body out of the way. She recovers quickly, spinning back at you.", false);
				return;
			}
			//Determine damage - str modified by enemy toughness!
			damage = int((str + weaponAttack) - rand(player.tou) - player.armorDef);
			if(damage > 0) damage = player.takeDamage(damage);
			if(damage <= 0) {
				damage = 0;
				//Due to toughness or amor...
				if(rand(player.armorDef + player.tou) < player.armorDef) Render.text("You absorb and deflect every " + weaponVerb + " with your " + player.armorName + ".", false);
				else Render.text("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.", false);
			}
			//everyone else
			else {
				let choice:number = rand(3);
				//(regular attack 1)
				if(choice == 0) Render.text("Ducking in close, the girl thunders a punch against your midsection, leaving a painful sting.", false);
				//(regular attack 2)
				else if(choice == 1) Render.text("The girl feints a charge, leans back, and snaps a kick against your " + kGAMECLASS.hipDescript() + ". You stagger, correct your posture, and plunge back into combat.", false);
				//(regular attack 3)
				else if(choice == 2) Render.text("You momentarily drop your guard as the girl appears to stumble. She rights herself as you step forward and lands a one-two combination against your torso.", false);
				Render.text(" (" + damage + ")", false);
			}
			if(damage > 0) {
				if(lustVuln > 0 && player.armorName == "barely-decent bondage straps") {
					Render.text("\n" + capitalA + short + " brushes against your exposed skin and jerks back in surprise, coloring slightly from seeing so much of you revealed.", false);
					lust += 5 * lustVuln;
				}
			}
			statScreenRefresh();
			Render.text("\n", false);
			combatRoundOver();
		}

		//(lust attack 1)
		private shouldraLustAttack():void {
			if(rand(2) == 0) Render.text("The girl spins away from one of your swings, her tunic flaring around her hips. The motion gives you a good view of her firm and moderately large butt. She notices your glance and gives you a little wink.\n", false);
			else Render.text("The girl's feet get tangled on each other and she tumbles to the ground. Before you can capitalize on her slip, she rolls with the impact and comes up smoothly. As she rises, however, you reel back and raise an eyebrow in confusion; are her breasts FILLING the normally-loose tunic? She notices your gaze and smiles, performing a small pirouette on her heel before squaring up to you again. Your confusion only heightens when her torso comes back into view, her breasts back to their normal proportions. A trick of the light, perhaps? You shake your head and try to fall into the rhythm of the fight.\n", false);
			game.dynStats("lus", (8+player.stats.lib/10));
			combatRoundOver();
		}
		//(magic attack)
		private shouldraMagicLazers():void {
			let damage:number = player.takeDamage(20 + rand(10));
			Render.text("Falling back a step, the girl raises a hand and casts a small spell. From her fingertips shoot four magic missiles that slam against your skin and cause a surprising amount of discomfort. (" + damage + ")\n", false);
			combatRoundOver();
		}

		override protected performCombatAction():void
		{
			let attack:number = rand(3);
			if(attack == 0) shouldrattack();
			else if(attack == 1) shouldraLustAttack();
			else shouldraMagicLazers();
		}

		public defeated(hpVictory:boolean):void
		{
			game.shouldraScene.defeatDannyPhantom();
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			game.shouldraScene.loseToShouldra();
		}

		public Shouldra()
		{
			this.a = "the ";
			this.short = "plain girl";
			this.imageName = "shouldra";
			this.long = "Her face has nothing overly attractive about it; a splash of freckles flits across her cheeks, her brows are too strong to be considered feminine, and her jaw is a tad bit square. Regardless, the features come together to make an aesthetically pleasing countenance, framed by a stylish brown-haired bob. Her breasts are obscured by her grey, loose-fitting tunic, flowing down to reach the middle of her thigh. Her legs are clad in snug, form-fitting leather breeches, and a comfortable pair of leather shoes shield her soles from the potentially harmful environment around her.";
			// this.plural = false;
			this.createVagina(false, VAGINA_WETNESS.WET, VAGINA_LOOSENESS.NORMAL);
			this.statusAffects.add(new StatusAffect("BonusVCapacity", 40, 0, 0, 0)));
			createBreastRow(Appearance.breastCupInverse("D"));
			this.ass.analLooseness = ANAL_LOOSENESS.TIGHT;
			this.ass.analWetness = ANAL_WETNESS.DRY;
			this.statusAffects.add(new StatusAffect("BonusACapacity",40,0,0,0)));
			this.tallness = 65;
			this.hipRating = HIP_RATING.AMPLE;
			this.buttRating = BUTT_RATING.AVERAGE+1;
			this.skinTone = "white";
			this.hairColor = "white";
			this.hairLength = 3;
			initStrTouSpeInte(45, 30, 5, 110);
			initLibSensCor(100, 0, 33);
			this.weaponName = "fists";
			this.weaponVerb="punches";
			this.armorName = "comfortable clothes";
			this.bonusHP = 30;
			this.lust = 10;
			this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
			this.level = 4;
			this.gems = 0;
			this.drop = new ChainedDrop().add(consumables.ECTOPLS,1/3);
			checkMonster();
		}
		
	}

}