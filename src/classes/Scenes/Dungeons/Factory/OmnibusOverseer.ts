package classes.Scenes.Dungeons.Factory
{
	import classes.*;
	import classes.internals.*;

	public class OmnibusOverseer extends Monster
	{

		public defeated(hpVictory:boolean):void
		{
			game.omnibusVictoryEvent();
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			if (pcCameWorms){
				MainScreen.text("\n\nYour foe doesn't seem to care...");
				doNext(game.endLustLoss);
			} else {
				game.omnibusLossRape();
			}
		}
		
		private lustAura():void {
			MainScreen.text("The demoness blinks her eyes closed and knits her eyebrows in concentration.  The red orbs open wide and she smiles, licking her lips.   The air around her grows warmer, and muskier, as if her presence has saturated it with lust.");
			if (statusAffects.has("LustAura")) {
				MainScreen.text("  Your eyes cross with unexpected feelings as the taste of desire in the air worms its way into you.  The intense aura quickly subsides, but it's already done its job.");
				game.dynStats("lus", (8 + int(player.stats.lib / 20 + player.stats.cor / 25)));
			}
			else {
				statusAffects.add(new StatusAffect("LustAura", 0, 0, 0, 0)));
			}
			game.combatRoundOver();
		}
		
		private milkAttack():void {
			if (rand(2) == 0)
				MainScreen.text("The demoness grips her sizable breasts and squeezes, spraying milk at you.\n");
			else MainScreen.text("Your foe curls up to pinch her nipples, tugging hard and squirting milk towards you.\n");
			if ((player.stats.spe > 50 && rand(4) == 0) || (player.perks.has("Evade") && rand(3) == 0) || (player.perks.has("Misdirection") && rand(4) == 0 && player.armorName == "red, high-society bodysuit")) {
				MainScreen.text("You sidestep the gushing fluids.");
			}
			//You didn't dodge
			else {
				if (rand(2) == 0) {
					MainScreen.text("The milk splatters across your face and chest, soaking you with demonic cream.  Some managed to get into your mouth, and you swallow without thinking.  It makes you tingle with warmth.  ");
				}
				else {
					MainScreen.text("The milk splashes into your " + player.armorName + ", soaking you effectively.  ");
					if (player.lowerBody.cockSpot.count() > 0) {
						MainScreen.text("Your " + cockDescript(0) + " gets hard as the milk lubricates and stimulates it.  ");
						game.dynStats("lus", 5);
					}
					if (player.lowerBody.vaginaSpot.count() > 0) {
						MainScreen.text("You rub your thighs together as the milk slides between your pussy lips, stimulating you far more than it should.  ");
						game.dynStats("lus", 5);
					}
				}
				game.dynStats("lus", 7 + player.stats.sens / 20);
				if (player.biggestLactation() > 1) MainScreen.text("Milk dribbles from your " + allBreastsDescript() + " in sympathy.");
			}
			game.combatRoundOver();
		}
		
		public OmnibusOverseer()
		{
			this.a = "the ";
			this.short = "Omnibus Overseer";
			this.imageName = "omnibusoverseer";
			this.long = "The 'woman' before you is clothed only in a single strip of fabric that wraps around her bountiful chest.  She has striking red eyes that contrast visibly with her blue skin and dark make-up.  Shiny black gloss encapsulates her kissable bubbly black lips.  Her most striking feature is her crotch, which appears neither male nor female.  She has a puffy wet vulva, but a cock-shaped protrusion sprouts from where a clit should be.";
			// this.plural = false;
			this.createCock(10,1.5);
			this.balls = 0;
			this.ballSize = 0;
			this.cumMultiplier = 3;
			// this.hoursSinceCum = 0;
			this.createVagina(false, VAGINA_WETNESS.DROOLING, VAGINA_LOOSENESS.NORMAL);
			createBreastRow(Appearance.breastCupInverse("DD"));
			this.ass.analLooseness = ANAL_LOOSENESS.TIGHT;
			this.ass.analWetness = ANAL_WETNESS.SLIME_DROOLING;
			this.tallness = rand(9) + 70;
			this.hipRating = HIP_RATING.AMPLE+2;
			this.buttRating = BUTT_RATING.TIGHT;
			this.lowerBody = LOWER_BODY.DEMONIC_HIGH_HEELS;
			this.skinTone = "light purple";
			this.hairColor = "purple";
			this.hairLength = 42;
			initStrTouSpeInte(65, 45, 45, 85);
			initLibSensCor(80, 70, 80);
			this.weaponName = "claws";
			this.weaponVerb="claw";
			this.weaponAttack = 10;
			this.weaponPerk = "";
			this.weaponValue = 150;
			this.armorName = "demonic skin";
			this.armorDef = 15;
			this.bonusHP = 200;
			this.lust = 20;
			this.lustVuln = 0.75;
			this.temperment = TEMPERMENT_LOVE_GRAPPLES;
			this.level = 8;
			this.gems = rand(25)+10;
			this.drop = new WeightedDrop(null, 1);
			this.special1 = lustAura;
			this.special2 = milkAttack;
			this.wingType = WING.BAT_LIKE_TINY;
			this.wingDesc = "tiny hidden";
			this.tailType = TAIL.DEMONIC;
			checkMonster();
		}
		
	}

}