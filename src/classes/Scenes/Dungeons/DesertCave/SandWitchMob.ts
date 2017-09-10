package classes.Scenes.Dungeons.DesertCave
{
	import classes.*;

	public class SandWitchMob extends Monster
	{

		override protected performCombatAction():void
		{
			game.sandWitchMobAI();
		}

		public defeated(hpVictory:boolean):void
		{
			game.yoYouBeatUpSomeSandWitchesYOUMONSTER();
		}

		public won(hpVictory:boolean,pcCameWorms:boolean):void
		{
			game.loseToSammitchMob();
		}

		public SandWitchMob()
		{
			this.a = "the ";
			this.short = "sand witches";
			this.imageName = "sandwitchmob";
			this.long = "You are surrounded by a veritable tribe of sand witches.  Like the ones that roam the sands, they have simple robes, blond hair, and four big breasts that push at the concealing cloth immodestly.  Glowering at you hatefully, the pack of female spellcasters readies itself to drag you down with sheer numbers.";
			this.plural = true;
			this.pronoun1 = "they";
			this.pronoun2 = "them";
			this.pronoun3 = "their";
			this.createVagina(false, VAGINA_WETNESS.WET, VAGINA_LOOSENESS.LOOSE);
			this.createBreastRow(Appearance.breastCupInverse("DD"));
			this.createBreastRow(Appearance.breastCupInverse("DD"));
			this.ass.analLooseness = ANAL_LOOSENESS.TIGHT;
			this.ass.analWetness = ANAL_WETNESS.NORMAL;
			this.tallness = rand(12) + 55;
			this.hipRating = HIP_RATING.CURVY;
			this.buttRating = BUTT_RATING.LARGE;
			this.skinTone = "bronzed";
			this.hairColor = "sandy-blonde";
			this.hairLength = 15;
			initStrTouSpeInte(25, 25, 35, 45);
			initLibSensCor(55, 40, 30);
			this.weaponName = "fists";
			this.weaponVerb="punches";
			this.weaponAttack = 0;
			this.weaponPerk = "";
			this.weaponValue = 150;
			this.armorName = "robes";
			this.armorDef = 1;
			this.armorPerk = "";
			this.armorValue = 5;
			this.bonusHP = 80;
			this.lust = 30;
			this.lustVuln = .5;
			this.temperment = TEMPERMENT_LOVE_GRAPPLES;
			this.level = 4;
			this.gems = rand(15) + 5;
			this.drop = NO_DROP;
			checkMonster();

		}
		
	}

}