package classes.Scenes.Areas.Forest
{
	import classes.*;
	import classes.internals.WeightedDrop;

	public class Akbal extends Monster
	{

		public eAttack():void
		{
			//Chances to miss:
			let damage:number = 0;
			//Blind dodge change
			if (statusAffects.has("Blind")) {
				Render.text(capitalA + short + " seems to have no problem guiding his attacks towards you, despite his blindness.\n", false);
			}
			//Determine if dodged!
			if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
				if (player.stats.spe - spe < 8)
					Render.text("You narrowly avoid " + a + short + "'s " + weaponVerb + "!", false);
				if (player.stats.spe - spe >= 8 && player.stats.spe - spe < 20)
					Render.text("You dodge " + a + short + "'s " + weaponVerb + " with superior quickness!", false);
				if (player.stats.spe - spe >= 20)
					Render.text("You deftly avoid " + a + short + "'s slow " + weaponVerb + ".", false);
				game.combatRoundOver();
				return;
			}
			//Determine if evaded
			if (player.perks.has("Evade") && rand(100) < 10) {
				Render.text("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.", false);
				game.combatRoundOver();
				return;
			}
			//Determine if flexibilitied
			if (player.perks.has("Flexibility") && rand(100) < 10) {
				Render.text("Using your cat-like agility, you twist out of the way of " + a + short + "'s attack.", false);
				game.combatRoundOver();
				return;
			}
			//Determine damage - str modified by enemy toughness!
			//*Normal Attack A - 
			if (rand(2) == 0) {
				//(medium HP damage)
				damage = int((str + weaponAttack) - Math.random() * (player.tou) - player.armorDef);
				if (damage <= 0) {
					Render.text("Akbal lunges forwards but with your toughness", false);
					if (player.armorDef > 0)
						Render.text(" and " + player.armorName + ", he fails to deal any damage.", false);
					else
						Render.text(" he fails to deal any damage.", false);
				}
				else {
					Render.text("Akbal rushes at you, his claws like lightning as they leave four red-hot lines of pain across your stomach.", false);
					player.takeDamage(damage);
				}
			} else { //*Normal Attack B
				//(high HP damage)
				damage = int((str + 25 + weaponAttack) - Math.random() * (player.tou) - player.armorDef);
				if (damage == 0) {
					Render.text("Akbal lunges forwards but between your toughness ", false);
					if (player.armorDef > 0)
						Render.text("and " + player.armorName + ", he fails to deal any damage.", false);
				}
				else {
					Render.text("Akbal snarls as he flies towards you, snapping his ivory teeth on your arm. You scream out in pain as you throw him off.", false);
					player.takeDamage(damage);
				}
			}
			game.combatRoundOver();
		}

		public defeated(hpVictory:boolean):void
		{
			game.forest.akbalScene.akbalDefeated(hpVictory);
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			game.forest.akbalScene.akbalWon(hpVictory,pcCameWorms);
			game.cleanupAfterCombat();
		}
		
		public akbalLustAttack():void
		{
			//*Lust Attack - 
			if (player.findStatusAffect(StatusAffects.Whispered) < 0)
			{
				Render.text("You hear whispering in your head. Akbal begins speaking to you as he circles you, telling all the ways he'll dominate you once he beats the fight out of you.", false);
				//(Lust increase)
				game.dynStats("lus", 7 + (100 - player.stats.int) / 10);
				player.statusAffects.add(new StatusAffect("Whispered",0,0,0,0)));
			}
			//Continuous Lust Attack - 
			else
			{
				Render.text("The whispering in your head grows, many voices of undetermined sex telling you all the things the demon wishes to do to you. You can only blush.", false);
				//(Lust increase)
				game.dynStats("lus", 12 + (100 - player.stats.int) / 10);
			}
			game.combatRoundOver();
		}
		
		public akbalSpecial():void
		{
			//*Special Attack A - 
			if (rand(2) == 0 && player.stats.spe > 20)
			{
				let speedChange:number = player.stats.spe / 5 * -1;
				Render.text("Akbal's eyes fill with light, and a strange sense of fear begins to paralyze your limbs.", false);
				//(Speed decrease)
				game.dynStats("spe", speedChange);
				if (player.statusAffects.has("AkbalSpeed"))
					player.statusAffects.get("AkbalSpeed").value1 = speedChange;
				else
					player.statusAffects.add(new StatusAffect("AkbalSpeed", speedChange, 0, 0, 0)));
			}
			//*Special Attack B - 
			else
			{
				Render.text("Akbal releases an ear-splitting roar, hurling a torrent of emerald green flames towards you.\n", false);
				//(high HP damage)
				//Determine if dodged!
				if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80)
				{
					if (player.stats.spe - spe < 8)
						Render.text("You narrowly avoid " + a + short + "'s fire!", false);
					if (player.stats.spe - spe >= 8 && player.stats.spe - spe < 20)
						Render.text("You dodge " + a + short + "'s fire with superior quickness!", false);
					if (player.stats.spe - spe >= 20)
						Render.text("You deftly avoid " + a + short + "'s slow fire-breath.", false);
					game.combatRoundOver();
					return;
				}
				//Determine if evaded
				if (player.perks.has("Evade") && rand(100) < 20)
				{
					Render.text("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s fire-breath.", false);
					game.combatRoundOver();
					return;
				}
				//Determine if flexibilitied
				if (player.perks.has("Flexibility") && rand(100) < 10)
				{
					Render.text("Using your cat-like agility, you contort your body to avoid " + a + short + "'s fire-breath.", false);
					game.combatRoundOver();
					return;
				}
				Render.text("You are burned badly by the flames! ("+player.takeDamage(40)+")", false);
				;
			}
			game.combatRoundOver();
		}
		
		//*Support ability - 
		public akbalHeal():void
		{
			if (HPRatio() >= 1)
				Render.text("Akbal licks himself, ignoring you for now.", false);
			else
				Render.text("Akbal licks one of his wounds, and you scowl as the injury quickly heals itself.", false);
			addHP(30);
			lust += 10;
			game.combatRoundOver();
		}

		public Akbal()
		{
			trace("Akbal Constructor!");
			this.a = "";
			this.short = "Akbal";
			this.imageName = "akbal";
			this.long = "Akbal, 'God of the Terrestrial Fire', circles around you. His sleek yet muscular body is covered in tan fur, with dark spots that seem to dance around as you look upon them.  His mouth holds two ivory incisors that glint in the sparse sunlight as his lips tremble to the sound of an unending growl.  Each paw conceals lethal claws capable of shredding men and demons to ribbons.  His large and sickeningly alluring bright green eyes promise unbearable agony as you look upon them.";
			// this.plural = false;
			this.createCock(15,2.5,CockType.DOG);
			this.balls = 2;
			this.ballSize = 4;
			this.cumMultiplier = 6;
			this.hoursSinceCum = 400;
			createBreastRow();
			createBreastRow();
			createBreastRow();
			createBreastRow();
			this.ass.analLooseness = ANAL_LOOSENESS.TIGHT;
			this.ass.analWetness = ANAL_WETNESS.NORMAL;
			this.tallness = 4*12;
			this.hipRating = HIP_RATING.SLENDER;
			this.buttRating = BUTT_RATING.TIGHT;
			this.skinTone = "spotted";
			this.skinType = SKIN.FUR;
			//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SKIN.FUR];
			this.hairColor = "black";
			this.hairLength = 5;
			initStrTouSpeInte(55, 53, 50, 75);
			initLibSensCor(50, 50, 100);
			this.weaponName = "claws";
			this.weaponVerb="claw-slash";
			this.weaponAttack = 5;
			this.armorName = "shimmering pelt";
			this.armorDef = 5;
			this.bonusHP = 20;
			this.lust = 30;
			this.lustVuln = 0.8;
			this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
			this.level = 6;
			this.gems = 15;
			this.drop = new WeightedDrop().
					add(consumables.INCUBID,6).
					add(consumables.W_FRUIT,3).
					add(weapons.PIPE,1);
			this.special1 = akbalLustAttack;
			this.special2 = akbalSpecial;
			this.special3 = akbalHeal;
			this.tailType = TAIL.DOG;
			checkMonster();
		}

	}

}