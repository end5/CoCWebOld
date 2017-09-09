package classes.Scenes.Dungeons.HelDungeon
{
	import classes.*;

	public class HarpyMob extends Monster
	{

		override protected function performCombatAction():void
		{
			game.harpyHordeAI();
		}

		public defeated(hpVictory:boolean):void
		{
			game.pcDefeatsHarpyHorde();
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			game.pcLosesToHarpyHorde();
		}

		public function HarpyMob()
		{
			this.a = "the ";
			this.short = "harpy horde";
			this.imageName = "harpymob";
			this.long = "You are surrounded by a wing of particularly large and muscular harpies, perhaps a dozen of them in total.  All of them are clad in simple brown shifts that give them good camouflage in the mountains, and are using their talon-like claws as weapons against you. While not a great threat to a champion of your ability individually, a whole brood of them together is... something else entirely.";
			this.plural = true;
			this.pronoun1 = "they";
			this.pronoun2 = "them";
			this.pronoun3 = "their";
			this.createVagina(false, VAGINA_WETNESS.SLAVERING, VAGINA_LOOSENESS.GAPING_WIDE);
			createBreastRow(Appearance.breastCupInverse("B"));
			this.ass.analLooseness = ANAL_LOOSENESS.STRETCHED;
			this.ass.analWetness = ANAL_WETNESS.SLIME_DROOLING;
			this.tallness = rand(8) + 70;
			this.hipRating = HIP_RATING.CURVY+2;
			this.buttRating = BUTT_RATING.LARGE;
			this.lowerBody = LOWER_BODY.HARPY;
			this.skinTone = "red";
			this.skinType = SKIN.PLAIN;
			this.skinDesc = "feathers";
			this.hairColor = "black";
			this.hairLength = 15;
			initStrTouSpeInte(50, 50, 120, 40);
			initLibSensCor(60, 45, 50);
			this.weaponName = "claw";
			this.weaponVerb="claw";
			this.weaponAttack = 10;
			this.armorName = "armor";
			this.armorDef = 20;
			this.bonusHP = 1000;
			this.lust = 20;
			this.lustVuln = .2;
			this.temperment = TEMPERMENT_LOVE_GRAPPLES;
			this.level = 18;
			this.gems = rand(25)+140;
			this.additionalXP = 50;
			this.tailType = TAIL.HARPY;
			this.drop = NO_DROP;
			checkMonster();
		}
		
	}

}