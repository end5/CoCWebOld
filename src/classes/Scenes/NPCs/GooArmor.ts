package classes.Scenes.NPCs
{
	import classes.*;
	import classes.GlobalFlags.FlagEnum;
	import classes.Scenes.Areas.Lake.GooGirl;
	import classes.internals.*;

	public class GooArmor extends GooGirl
	{

		override protected function performCombatAction():void
		{
			game.gooArmorAI();
		}

		public defeated(hpVictory:boolean):void
		{
			if (statusAffects.has("Spar")) game.valeria.pcWinsValeriaSpar();
			else game.beatUpGooArmor();
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			if (pcCameWorms){
				outputText("\n\nThe armored goo sighs while you exhaust yourself...");
				doNext(game.endLustLoss);
			} else {
				if(statusAffects.has("Spar")) game.valeria.pcWinsValeriaSparDefeat();
				else game.gooArmorBeatsUpPC();
			}
		}

		public function GooArmor()
		{
			super(true);
			this.a = "a ";
			this.short = "Goo Armor";
			this.imageName = "gooarmor";
			this.long = "Before you stands a suit of plated mail armor filled with a bright blue goo, standing perhaps six feet off the ground.  She has a beautiful, feminine face, and her scowl as she stands before you is almost cute.  She has formed a mighty greatsword from her goo, and has assumed the stance of a well-trained warrior.";
			// this.plural = false;
			this.createVagina(false, VAGINA_WETNESS.SLAVERING, VAGINA_LOOSENESS.GAPING_WIDE);
			createBreastRow(Appearance.breastCupInverse("C"));
			this.ass.analLooseness = ANAL_LOOSENESS.STRETCHED;
			this.ass.analWetness = ANAL_WETNESS.SLIME_DROOLING;
			this.tallness = rand(8) + 70;
			this.hipRating = HIP_RATING.AMPLE+2;
			this.buttRating = BUTT_RATING.LARGE;
			this.skinTone = "blue";
			this.skinType = SKIN.GOO;
			//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SKIN.GOO];
			this.skinAdj = "goopey";
			this.hairColor = "black";
			this.hairLength = 15;
			this.hairType = HAIR.GOO;
			initStrTouSpeInte(60, 50, 50, 40);
			initLibSensCor(60, 35, 50);
			this.weaponName = "goo sword";
			this.weaponVerb="slash";
			this.weaponAttack = 60;
			this.armorName = "armor";
			this.armorDef = 50;
			this.bonusHP = 500;
			this.lustVuln = .35;
			this.temperment = TEMPERMENT_LOVE_GRAPPLES;
			this.level = 16;
			this.gems = rand(25)+40;
			this.drop = NO_DROP;
			checkMonster();
		}
		
	}

}