﻿package classes.Scenes.Areas.Lake
{
	import classes.*;
	import classes.internals.*;

	public class FetishCultist extends Monster
	{

		private static const NAUGHTY_NURSES_UNIFORM:string = "naughty nurse's uniform";
		private static const TEACHERS_OUTFIT:string = "teacher's outfit";
		private static const SWIMSUIT:string = "swimsuit";
		private static const NOBLES_CLOTHING:string = "noble's clothing";
		private static const PERVY_NUNS_CLOTHING:string = "pervy nun's clothing";

		public combatRoundUpdate():void
		{
			super.combatRoundUpdate();
			let changed:boolean = false;
			//Fetish Cultist Update
			switch (rand(5)) {
				case 0:
					if (armorName != PERVY_NUNS_CLOTHING) {
						//Religious outfit!
						long = "The woman across from you has her eyes closed, her hands joined, and seems to be chanting under her breath.  She is wearing a religious robe that closely hugs her curvacious shape. There is a specially-placed opening over her pussy lips.";
						this.armorName = PERVY_NUNS_CLOTHING;
						changed = true;
					}
					break;
				case 1:
					if (armorName != NOBLES_CLOTHING) {
						//Noble outfit
						this.armorName = NOBLES_CLOTHING;
						long = "She's wearing a skimpy noble's dress, which lets you get a good look at her well-filled bra through an over-generous cleavage. Her skirt is so short that you clearly see her pussy lips.  She smiles at you in a rather cute way.  She looks like she's coming out of a painting, executed by a rather depraved and lust-filled artist.";
						changed = true;
					}
					break;
				case 2:
					if (armorName != SWIMSUIT) {
						//Swim outfit
						long = "She's currently wearing a swimsuit that's apparently much too small for her, because it stretches across every curve and clearly outlines them for you to see.  Her sizable breasts look like they could burst through the fabric at any moment.  You can even see her erect nipples and her puffy lower lips.";
						this.armorName = SWIMSUIT;
						changed = true;
					}
					break;
				case 3:
					if (armorName != TEACHERS_OUTFIT) {
						//Pervy Teacher
						long = "She's now wearing a teacher's outfit, complete with glasses, make-up, her black hair in a tight bun, and a serious-looking outfit... with no back side at all.  She turns to the side to give you a good look at her rear, smiling mischievously.";
						this.armorName = TEACHERS_OUTFIT;
						changed = true;
					}
					break;
				case 4:
					if (armorName != NAUGHTY_NURSES_UNIFORM) {
						//Naughty Nurse
						long = "The woman is wearing heavy make-up and a whorish nurse's suit, seemingly in white latex with two openings at her breasts and a large one on her crotch and inner thighs. It lets her blood-gorged pussy lips hang freely, which she displays proudly.";
						this.armorName = NAUGHTY_NURSES_UNIFORM;
						changed = true;
					}
					break;
			}
			//Talk abouts it mang!
			if(changed) Render.text("The fetish cultist's clothing shifts and twists, taking on the appearance of a " + armorName + ".\n\n", false);
			lust += lustVuln * 3;
		}

		private static const FETISHY_OUTFIT:string = "fetishy outfit";

		private function cultistRaisePlayerLust():void {
			//Two text variants!
			if(rand(2) == 0) {
				if(armorName == PERVY_NUNS_CLOTHING) Render.text("She suddenly stops chanting and spreads her legs, opening her loose pussy wide with one hand while moaning like a whore.  She toys with her breasts and fondles one of her nipples with her other hand.\n\nDespite yourself,  you can't help but be aroused by the scene.", false);
				if(armorName == NOBLES_CLOTHING) Render.text("She suddenly blushes and start giggling, saying: 'Really my lord!' in a suave, submitting voice while pulling down her skirt.  The movement lets you get an even better look down her cleavage, and her breasts appear even fuller than before.\n\nDespite yourself, you can't help but be aroused by the scene.", false);
				if(armorName == SWIMSUIT) Render.text("She does a series of lewd stretches, showing off her tightly-clad, sexy body in every possible detail.  In particular, her excited, blood-gorged pussy lips, clearly outlined, seem to be begging for you to come and grope them... and that's just for a start.  Despite yourself, you can't help but be aroused by the scene.", false);
				if(armorName == TEACHERS_OUTFIT) Render.text("Obviously very flexible, she arches her back with one hand on her hip, displaying her firm round ass while looking at you with a lascivious expression.  She says in a sexy voice, \"<i>Maybe we should have a... private talk after class...</i>\"  Despite yourself, you can't help but be aroused by the scene.", false);
				if(armorName == NAUGHTY_NURSES_UNIFORM) Render.text("Still displaying her figure in her tight suit, she asks with a lewd smile, \"<i>Is there one of your needs I could satisfy, my dear?</i>\"  She grabs one of her firm, full breasts, \"<i>Are you thirsty, maybe?</i>\"  Despite yourself, you can't help but be aroused by the scene.", false);
				if(armorName == FETISHY_OUTFIT) Render.text("She suddenly starts posing in sexy outfits.  Despite yourself, you can't help but be aroused by it.", false);
			}
			else {
				Render.text("She suddenly starts mauling her shapely breasts, her fingers nearly disappearing briefly in the soft, full flesh, while fingering herself eagerly, emitting a variety of lewd noises.  You are entranced by the scene, the sexual excitement she's experiencing penetrating your body in warm waves coming from your groin.", false);
			}
			game.dynStats("lus", (player.stats.lib/10 + player.stats.cor/20)+4);
			if (player.lust >= 100)
				doNext(game.endLustLoss);
			else doNext(game.combatMenu);
		}
		private function cultistLustTransfer():void {
			if(lust <= 30 || rand(2) == 0) {
				Render.text("Her eyes glaze over, ", false);
				if(player.stats.cor < 40) Render.text("and you're almost afraid to know ", false);
				else Render.text("and you wish you knew ", false);
				Render.text("what she is thinking of since you can almost feel her own lust building.", false);
				lust += 10;
			}
			else {
				Render.text("Her eyes glaze over and you feel your mind suddenly becoming filled with a blur of every sexual perversion you could possibly think of, and then some.", false);
				if(player.lowerBody.vaginaSpot.count() > 0) {
					Render.text("  You feel your " + vaginaDescript(0) + " soaking itself in a sudden burst", false);
					if(player.lowerBody.cockSpot.count() > 0)  Render.text(", while a sudden influx of pre-cum blurts out and streams down your " + player.multiCockDescriptLight() + ", painfully hardened by a vast amount of blood rushing to your groin", false);
					Render.text(".", false);
				}
				else if(player.lowerBody.cockSpot.count() > 0) Render.text("  A sudden influx of pre-cum blurts out and streams down your " + player.multiCockDescriptLight() + ", painfully hardened by a vast amount of blood rushing to your groin.", false);
				if(player.gender == 0) Render.text("  Your genderless body is suddenly filled by a perverted warmth.", false);
				Render.text("\n\nYou notice that the young woman seems to have calmed down some.", false);
				game.dynStats("lus", (lust/3 * (1 + player.stats.cor/300)));
				lust -= 50;
				if(lust < 0) lust = 10;
			}
			if (player.lust >= 100)
				doNext(game.endLustLoss);
			else doNext(game.combatMenu);
		}
		

		public defeated(hpVictory:boolean):void
		{
			let temp2:Function =null;
			if(player.statusAffects.has("Feeder")) temp2 = game.lake.fetishCultistScene.fetishCultistHasAMilkFetish;
			if (hpVictory) {
				Render.text("Hurt too much to continue controlling her powers, the cultist collapses helplessly.", true);
			} else {
				Render.text("Overwhelmed by her lusts, the cultist loses the ability to control herself and collapses.", true);
			}
			if(player.lust >= 33 && player.gender > 0) {
				Render.text("  You realize she'd make a perfect receptacle for your lusts.  Do you have your way with her?", false);
				game.simpleChoices("Sex", game.lake.fetishCultistScene.playerRapesCultist, "", null, "", null, "B. Feed", temp2, "Leave", game.cleanupAfterCombat);
			}
			else {
				if(temp2!=null) {
					Render.text("  She looks like she might take some of your milk if you offered it to her.  What do you do?", false);
					game.simpleChoices("B. Feed", temp2, "", null, "", null, "", null, "Leave", game.cleanupAfterCombat);
				}
				else game.cleanupAfterCombat();
			}
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			if (hpVictory){
				super.won(hpVictory,pcCameWorms);
			} else {
				if (pcCameWorms){
					Render.text("\n\nThe cultist giggles as she watches you struggling.\n\n", false);
				}
				game.lake.fetishCultistScene.cultistRapesYou();
			}
		}

		override protected function performCombatAction():void
		{
			randomChoice(special1, special2)();
		}

		public function FetishCultist()
		{
			trace("FetishCultist Constructor!");
			this.a = "the ";
			this.short = "fetish cultist";
			this.imageName = "fetishcultist";
			this.long = "The woman across from you has her eyes closed, her hands joined, and seems to be chanting under her breath. She is wearing a religious outfit that closely hugs her curvacious shape, with a skirt so short that you can clearly see her pussy's lips.\n\nShe has clealy lost her grasp on sanity, and filled the void with pure perversion.";
			// this.plural = false;
			this.createVagina(false, VAGINA_LOOSENESS.GAPING, VAGINA_WETNESS.WET);
			createBreastRow(Appearance.breastCupInverse("DD"));
			this.ass.analLooseness = ANAL_LOOSENESS.NORMAL;
			this.ass.analWetness = ANAL_WETNESS.NORMAL;
			this.tallness = 5*12+7;
			this.hipRating = HIP_RATING.AMPLE;
			this.buttRating = BUTT_RATING.LARGE;
			this.skinTone = "pale";
			this.hairColor = "black";
			this.hairLength = 15;
			initStrTouSpeInte(35, 25, 30, 1);
			initLibSensCor(75, 80, 90);
			this.weaponName = "whip";
			this.weaponVerb="whip-crack";
			this.armorName = FETISHY_OUTFIT;
			this.lust = 25;
			this.temperment = TEMPERMENT_LOVE_GRAPPLES;
			this.level = 2;
			this.gems = 5+rand(10);
			this.drop = new WeightedDrop().add(consumables.LABOVA_,1)
					.add(weapons.RIDINGC,1)
					.add(consumables.OVIELIX,2)
					.add(consumables.L_DRAFT,6);
			this.special1 = cultistRaisePlayerLust;
			this.special2 = cultistLustTransfer;
			checkMonster();
		}

	}

}