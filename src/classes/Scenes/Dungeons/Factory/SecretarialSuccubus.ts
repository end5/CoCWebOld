package classes.Scenes.Dungeons.Factory
{
	import classes.*;
	import classes.Scenes.Monsters.AbstractSuccubus;
	import classes.internals.*;

	public class SecretarialSuccubus extends AbstractSuccubus {
		public defeated(hpVictory:boolean):void
		{
			if (player.gender > 0) {
				let dildo:Function = (player.hasKeyItem("Deluxe Dildo") >= 0 ? game.succubusGetsDildoed : null);
				
				if (hpVictory) {
					Render.text("You smile in satisfaction as the " + short + " collapses, unable to continue fighting.  Now would be the perfect opportunity to taste the fruits of her sex-ready form...\n\nDo you rape her?", true);
					game.dynStats("lus", 1);
					game.simpleChoices("Yes", game.succubusVictoryRape, "Dildo Rape", dildo, "", null, "", null, "No", game.cleanupAfterCombat);
				} else if (player.lust >= 33){
					Render.text("You smile in satisfaction as the " + short + " gives up on fighting you and starts masturbating, begging for you to fuck her.  Now would be the perfect opportunity to taste the fruits of her sex-ready form...\n\nDo you fuck her?", true);
					game.dynStats("lus", 1);
					game.simpleChoices("Yes", game.succubusVictoryRape, "Dildo Rape", dildo, "", null, "", null, "No", game.cleanupAfterCombat);
				} else {
					game.finishCombat();
				}
			} else {
				game.finishCombat();
			}
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			if(pcCameWorms){
				Render.text("\n\nYour foe doesn't seem to care...");
				doNext(game.endLustLoss);
			} else {
				game.succubusLossRape();
			}
		}

		public SecretarialSuccubus() {
			this.a = "the ";
			this.short = "secretarial succubus";
			this.imageName = "secretarialsuccubus";
			this.long = "The succubus across from you balances gracefully on her spiked heels, twirling and moving unpredictably.  Sexy dark stockings hug every curve of her perfectly shaped flesh until they disappear into her tiny miniskirt.  Her impressive breasts wobble delightfully as she moves, despite the inadequate efforts of her straining vest.  A pair of foot-long horns curve up from her otherwise perfect face and forehead, wreathed in lustrous blonde hair.  The very air around her is filled with an unidentifiable fragrance that makes you tingle and shiver.";
			// this.plural = false;
			this.createVagina(false, VAGINA_WETNESS.SLAVERING, VAGINA_LOOSENESS.NORMAL);
			this.statusAffects.add(new StatusAffect("BonusVCapacity", 30, 0, 0, 0)));
			createBreastRow(Appearance.breastCupInverse("DD"));
			this.ass.analLooseness = ANAL_LOOSENESS.STRETCHED;
			this.ass.analWetness = ANAL_WETNESS.SLIME_DROOLING;
			this.tallness = rand(9) + 60;
			this.hipRating = HIP_RATING.CURVY;
			this.buttRating = BUTT_RATING.LARGE+1;
			this.lowerBody = LOWER_BODY.DEMONIC_HIGH_HEELS;
			this.skinTone = "blue";
			this.hairColor = "blond";
			this.hairLength = 13;
			initStrTouSpeInte(50, 40, 75, 35);
			initLibSensCor(80, 70, 80);
			this.weaponName = "claws";
			this.weaponVerb="slap";
			this.weaponAttack = 10;
			this.weaponPerk = "";
			this.weaponValue = 150;
			this.armorName = "demonic skin";
			this.armorDef = 4;
			this.bonusHP = 100;
			this.lust = 30;
			this.temperment = TEMPERMENT_LOVE_GRAPPLES;
			this.level = 7;
			this.gems = rand(25)+10;
			this.additionalXP = 50;
			this.drop = new WeightedDrop(consumables.LACTAID, 1);
			this.wingType = WING.BAT_LIKE_TINY;
			this.wingDesc = "tiny hidden";
			this.tailType = TAIL.DEMONIC;
			this.special1 = kissAttack;
			this.special2 = seduceAttack;
			this.special3 = whipAttack;
			checkMonster();
		}

	}

}