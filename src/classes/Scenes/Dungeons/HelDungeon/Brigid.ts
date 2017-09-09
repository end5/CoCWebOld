package classes.Scenes.Dungeons.HelDungeon
{
	import classes.*;

	public class Brigid extends Monster
	{

		//Attack One: Hot Poker, Right Up Your Ass!
		private function brigidPoke():void {
			Render.text("Brigid stalks forward with confidence, her shield absorbing your defensive blows until she's right on top of you. She bats your [weapon] aside and thrashes you with her hot poker, scalding your " + player.skin() + " and sending you reeling.");
			//(Effect: Heavy Damage)
			let damage:number = Math.round((str + weaponAttack) - rand(player.tou) - player.armorDef);
			if(damage < 30) damage = 30;
			damage = player.takeDamage(damage);
			Render.text(" (" + damage + ")");
			game.combatRoundOver();
		}

		//Attack Two: SHIELD BOP! OOM BOP!
		private function brigidBop():void {
			Render.text("The harpy feints at you with her poker; you dodge the blow, but you leave yourself vulnerable as she spins around and slams her heavy shield into you, knocking you off balance.");
			//(Effect: Stagger/Stun)
			let damage:number = 5;
			damage = player.takeDamage(5);
			Render.text(" (" + damage + ")");
			if(player.perks.has("Resolute")) Render.text("  Of course, your resolute posture prevents her from accomplishing much.");
			else player.statusAffects.add(new StatusAffect("Stunned",0,0,0,0)));
			game.combatRoundOver();
		}

		//Attack Three: Harpy Ass Grind GO!
		private function BrigidAssGrind():void {
			Render.text("Brigid grins as she approaches you.  She handily deflects a few defensive blows and grabs you by the shoulders.  She forces you onto your knees and before you can blink, has turned around and smashed your face into her ass!  \"<i>Mmm, you like that, don'tcha?</i>\" she growls, grinding her huge, soft ass across your face, giving you an up-close and personal feel of her egg-laying hips.");
			game.dynStats("lus", 30);
			game.combatRoundOver();
		}
		override protected function performCombatAction():void
		{
			if(player.statusAffects.has("Stunned")) {
				player.statusAffects.remove("Stunned");
				if(rand(2) == 0) BrigidAssGrind();
				else brigidPoke();
				return;
			}
			if(rand(3) == 0) BrigidAssGrind();
			else if(rand(2) == 0) brigidBop();
			else brigidPoke();
		}


		public defeated(hpVictory:boolean):void
		{
			game.brigidScene.pcDefeatsBrigid();
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			game.brigidScene.pcDefeatedByBrigid();
		}

		public function Brigid()
		{
			this.a = "";
			this.short = "Brigid the Jailer";
			this.imageName = "brigid";
			this.long = "Brigid is a monster of a harpy, standing a foot taller than any other you've seen. She's covered in piercings, and her pink-dyed hair is shaved down to a long mohawk. She's nude, save for the hot poker in her right hand and the shield in her left, which jingles with every step she takes thanks to the cell keys beneath it.";
			// this.plural = false;
			this.createVagina(false, VAGINA_WETNESS.SLAVERING, VAGINA_LOOSENESS.LOOSE);
			if (LOWER_BODY.HARPY > 0) {
				this.statusAffects.add(new StatusAffect("BonusVCapacity", LOWER_BODY.HARPY, 0, 0, 0)));
			}
			createBreastRow(Appearance.breastCupInverse("D"));
			this.ass.analLooseness = ANAL_LOOSENESS.STRETCHED;
			this.ass.analWetness = ANAL_WETNESS.DRY;
			this.tallness = rand(8) + 70;
			this.hipRating = HIP_RATING.AMPLE+2;
			this.buttRating = BUTT_RATING.LARGE;
			this.skinTone = "red";
			this.hairColor = "black";
			this.hairLength = 15;
			initStrTouSpeInte(90, 60, 120, 40);
			initLibSensCor(40, 45, 50);
			this.weaponName = "poker";
			this.weaponVerb="burning stab";
			this.weaponAttack = 30;
			this.armorName = "armor";
			this.armorDef = 20;
			this.bonusHP = 1000;
			this.lust = 20;
			this.lustVuln = .25;
			this.temperment = TEMPERMENT_LOVE_GRAPPLES;
			this.level = 19;
			this.gems = rand(25)+140;
			this.additionalXP = 50;
			this.wingType = WING.FEATHERED_LARGE;
			this.tailType = TAIL.DEMONIC;
			this.hornType = HORNS.DEMON;
			this.horns = 2;
			this.drop = NO_DROP;
			checkMonster();
		}
		
	}

}