﻿package classes.Scenes.Areas.Lake
{
	import classes.*;
	import classes.internals.*;

	public class GreenSlime extends Monster
	{


		public defeated(hpVictory:boolean):void
		{
			Render.text("You smile in satisfaction as the " + short + " collapses, unable to continue fighting.", true);
			//Boobfeed.
			if(player.statusAffects.has("Feeder")) {
				//Eligable to rape
				if(player.lust >= 33 && player.gender > 0) {
					Render.text("\n\nYou're horny enough to try and rape it, though you'd rather see how much milk you can squirt into it.  What do you do?", false);
					game.simpleChoices("B.Feed",game.lake.greenSlimeScene.rapeOozeWithMilk,"Rape",game.lake.greenSlimeScene.slimeVictoryRape,"",null,"",null,"Leave",game.cleanupAfterCombat);
				}
				//Rapes not on the table.
				else {
					Render.text("\n\nYour nipples ache with the desire to forcibly breastfeed the gelatinous beast.  Do you?", false);
					game.doYesNo(game.lake.greenSlimeScene.rapeOozeWithMilk,game.cleanupAfterCombat);
				}
			}
			//Not a breastfeeder
			else if(player.lust >= 33 && player.gender > 0) {
				Render.text("  Sadly you realize your own needs have not been met.  Of course, you could always play with the poor thing... Do you rape it?", false);
				game.doYesNo(game.lake.greenSlimeScene.slimeVictoryRape, game.cleanupAfterCombat);
			}
			else game.cleanupAfterCombat();
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			if (pcCameWorms) {
				Render.text("\n\nThe slime doesn't even seem to notice.\n\n");
			}
			doNext(game.lake.greenSlimeScene.slimeLoss);
		}
		
		private function lustAttack():void {
			Render.text("The creature surges forward slowly with a swing that you easily manage to avoid.  You notice traces of green liquid spurt from the creature as it does, forming a thin mist that makes your skin tingle with excitement when you inhale it.");
			game.dynStats("lus", player.stats.lib / 10 + 8);
			doNext(game.playerMenu);
		}
		
		private function lustReduction():void {
			Render.text("The creature collapses backwards as its cohesion begins to give out, and the faint outline of eyes and a mouth form on its face.  Its chest heaves as if it were gasping, and the bolt upright erection it sports visibly quivers and pulses before relaxing slightly.");
			lust -= 13;
			doNext(game.playerMenu);
		}
		
		public function GreenSlime()
		{
			trace("GreenSlime Constructor!");
			this.a = "a ";
			this.short = "green slime";
			this.imageName = "greenslime";
			this.long = "The green slime has a normally featureless face that sits on top of wide shoulders that sprout into thick, strong arms.  Its torso fades into an indistinct column that melds into the lump of ooze on the ground that serves as a makeshift form of locomotion.";
			// this.plural = false;
			this.createCock(18, 2, CockType.HUMAN);
			this.cumMultiplier = 3;
			this.hoursSinceCum = 20;
			this.pronoun1 = "it";
			this.pronoun2 = "it";
			this.pronoun3 = "its";
			createBreastRow(0);
			this.ass.analLooseness = ANAL_LOOSENESS.STRETCHED;
			this.ass.analWetness = ANAL_WETNESS.SLIME_DROOLING;
			this.tallness = rand(8) + 80;
			this.hipRating = HIP_RATING.AMPLE;
			this.buttRating = BUTT_RATING.LARGE;
			this.lowerBody = LOWER_BODY.GOO;
			this.skinTone = "green";
			initStrTouSpeInte(25, 20, 10, 5);
			initLibSensCor(50, 60, 20);
			this.weaponName = "hands";
			this.weaponVerb="slap";
			this.armorName = "gelatinous skin";
			this.bonusHP = 30;
			this.lust = 30;
			this.temperment = TEMPERMENT_LOVE_GRAPPLES;
			this.level = 2;
			this.gems = rand(5) + 1;
			this.drop = new ChainedDrop().add(weapons.PIPE, 1 / 10)
					.add(consumables.WETCLTH, 1 / 2)
					.elseDrop(useables.GREENGL);
			this.special1 = lustReduction;
			this.special2 = lustAttack;
			this.special3 = lustAttack;
			checkMonster();
		}

	}

}