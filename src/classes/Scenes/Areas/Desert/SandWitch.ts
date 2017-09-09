﻿package classes.Scenes.Areas.Desert
{
	import classes.*;
	import classes.internals.*;

	public class SandWitch extends Monster
	{


		public defeated(hpVictory:boolean):void
		{
			if (player.findStatusAffect(StatusAffects.StoneLust))
			{
				player.statusAffects.remove("StoneLust");
			}
			
			if (player.lust >= 33){
				game.desert.sandWitchScene.beatSandwitch();
			} else {
				game.finishCombat();
			}
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			if (pcCameWorms){
				Render.text("\n\nThe witch blanches and backs away, leaving you to your fate.");
				game.cleanupAfterCombat();
			} else {
				game.desert.sandWitchScene.sandwitchRape();
			}
		}
		
		private function lustMagicAttack():void {
			Render.text("The sand witch points at you, drawing a circle in the air and mouthing strange words.\n\n");
			if (player.statusAffects.has("StoneLust")) {
				Render.text("The orb inside you grows warm, almost hot, suffusing your body with heat and arousal.  ");
				game.dynStats("lus", 8 + int(player.stats.sens) / 10);
			}
			else {
				Render.text("You feel the sands shift by your " + player.feet() + ", and look down to see something slip out of the sands and into your clothes!  It feels incredibly smooth and circular as it glides upward along your " + player.leg() + ", its progress unaffected by your frantic effort to dislodge it.  ");
				if (player.lowerBody.vaginaSpot.count() > 0) Render.text("It glides up your thighs to the entrance of your sex, and its intentions dawn on you!\n\nToo late! You reach to stop it, but it pushes against your lips and slips inside your " + vaginaDescript(0) + " in an instant.  You groan in frustration as it begins pulsing and vibrating, sometimes even seeming to change size.");
				else Render.text("It glides up your thighs, curving around your buttocks, and its intentions dawn on you.\n\nYou desperately grab for it, but are too late!  It pushes firmly against your rectum and slips inside instantaneously.  You groan in frustration as it begins pulsing and vibrating, sometimes even seeming to change size.");
				player.statusAffects.add(new StatusAffect("StoneLust", 0, 0, 0, 0)));
				game.dynStats("lus", 4 + int(player.stats.sens) / 10);
			}
			doNext(game.playerMenu);
		}
		
		public function SandWitch()
		{
			trace("SandWitch Constructor!");
			this.a = "the ";
			if(game.silly()){
				this.short = "sand witch";
				this.imageName = "sandwidch";
			} else {
				this.short = "sand witch";
				this.imageName = "sandwitch";
			}
			this.long = "A sand witch appears to be totally human, an oddity in this strange land.  She has dirty blonde hair and a very tanned complexion, choosing to cover most of her body with robes of the same color as the desert sands, making her impossible to spot from afar.";
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
			this.weaponName = "kick";
			this.weaponVerb="kick";
			this.armorName = "robes";
			this.bonusHP = 20;
			this.lust = 30;
			this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
			this.level = 3;
			this.gems = rand(15) + 5;
			this.drop = new WeightedDrop().addMany(1,
					consumables.TSCROLL,
					consumables.OVIELIX,
					consumables.LACTAID,
					consumables.LABOVA_,
					consumables.W__BOOK,
					consumables.B__BOOK,
					null);
			this.special1 = lustMagicAttack;
			this.special2 = special2;
			this.special3 = special3;
			checkMonster();
		}

	}

}