package classes.Scenes.Areas.Mountain
{
	import classes.*;
	import classes.internals.*;

	/**
	 * ...
	 * @author Fake-Name
	 */


	public class InfestedHellhound extends HellHound
	{
		//[Extra special attack]
		private hellHoundWormCannon():void
		{
			Render.text("The thing rears up onto its hind legs, revealing its more humanoid stature, and allowing it to use its flexible paws to caress its twinned-penises.  It lurches forwards powerfully, its thickness twitching and flaring as it launches a wave of worm-filled canine cum at you.", false);
			Render.text("\n", false);
			if (rand(2) == 0) {
				//Get hit – 10+ lust
				game.dynStats("lus", 5 + player.stats.lib / 20);
				Render.text("Taken off-guard by the unexpected sexual display, you fail to move out of the way, and the wormy jism splatters you from the chest down.", false);
				if (player.statusAffects.has("Infested") && player.totalCocks() > 0) {
					Render.text("  The worms inside you begin moving and squirming. A few of your cum-soaked parasites crawl out from your shivering " + multiCockDescriptLight() + " as if attempting to meet the new arrivals.  You desperately want to brush them away, but the pleasure in your crotch is too good to fight, and you find yourself staying your hand as each and every one of the new worms makes it way into your " + multiCockDescriptLight() + ".", false);
					if (player.lowerBody.balls > 0) Render.text("  Your " + ballsDescriptLight() + " grow weightier as the worms settle into their new home, arousing you beyond measure.", false);
					else Render.text("  You can feel them shifting around inside you as they adjust to their new home, arousing you beyond measure.", false);
					game.dynStats("lus", 10);
				}
				else if (player.totalCocks() > 0) {
					Render.text("  The worms wriggle and squirm all over you, working their way towards your groin.  It tickles pleasantly, but you brush them away before they can get inside you.  The thought of being turned into a worm-dispensing cum fountain is horrifying, but it leaves you hard.", false);
					game.dynStats("lus", (5 + Math.round(player.stats.cor / 20)));
				}
				else if (player.lowerBody.vaginaSpot.hasVagina()) Render.text("  Thankfully, the worms don't seem to want anything to do with you, and rapidly drop down to the ground.", false);
			}
			//Sidestep
			else {
				Render.text("You sidestep the gush of wormy fluid, letting it splatter against the rocks behind you.", false);
				//(If infested +10 lust:  
				if (player.statusAffects.has("Infested")  && player.lowerBody.cockSpot.hasCock()) {
					if (player.lowerBody.cockSpot.hasCock()) {
						Render.text("  Despite avoiding the torrent of infected seed, your own wormy ", false);
						if (player.lowerBody.balls > 0) Render.text(ballsDescriptLight(), false);
						else Render.text(multiCockDescriptLight(), false);
						Render.text(" wriggle", false);
						if (player.lowerBody.balls == 0 && player.lowerBody.cockSpot.count() == 1) Render.text("s", false);
						Render.text(" hotly, expelling a few of your own worms in response along with a dribble of thick pre-cum.   You wonder what it would feel like to let his worms crawl inside you...", false);
						game.dynStats("lus", 10);
					} else {
						CoC_Settings.error("Infested but no cock!");
						game.dynStats("lus", 5);
						Render.text("  The idea of being covered in the beast's infested seed arouses you slightly, but you shake your head violently and clear away the unwelcome thought.", false);
					}
				}
				//if aroused by worms +5 lust:
				else if (player.statusAffects.has("WormsOn") && player.findStatusAffect(StatusAffects.WormsHalf) < 0) {
					game.dynStats("lus", 5);
					Render.text("  The idea of being covered in the beast's infested seed arouses you slightly, but you shake your head violently and clear away the unwelcome thought.", false);
				}
			}
			lust -= 25;
			if (lust < 40) lust = 40;
			combatRoundOver();
		}

		public defeated(hpVictory:boolean):void
		{
			if (hpVictory) {
				Render.text("The hellhound's flames dim and the heads let out a whine before the creature slumps down, defeated, unconscious, and yet still drooling worms.", true);
				game.cleanupAfterCombat();
			} else {
				Render.text("Unable to bear its unnatural arousal, the infested hellhound's flames dim as he stops his attack. The two heads look at you, whining plaintively.  The hellhound slowly pads over to you and nudges its noses at your crotch.  It seems he wishes to pleasure you.\n\n", true);
				if (player.gender > 0 && player.lust >= 33) {
					Render.text("You realize your desires aren't quite sated.  You could let it please you.  Do you?", false);
					game.simpleChoices("Fuck it", game.mountain.hellHoundScene.hellHoundGetsRaped, "", null, "", null, "", null, "Leave", game.cleanupAfterCombat);
				}
				else {
					Render.text("You turn away, not really turned on enough to be interested in such an offer from such a beast.", false);
					game.cleanupAfterCombat();
				}
			}
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			if (pcCameWorms) {
				Render.text("\n\nThe infested hellhound's heads both grin happily as it advances towards you...", false);
				doNext(game.mountain.infestedHellhoundScene.infestedHellhoundLossRape);
			} else if (hpVictory) {
				game.mountain.infestedHellhoundScene.infestedHellhoundLossRape();
			} else {
				game.mountain.infestedHellhoundScene.infestedHellhoundLossRape();
			}
		}

		public InfestedHellhound()
		{
			super(true);
			trace("InfestedHellhound Constructor!");
			this.a = "the ";
			this.short = "infested hellhound";
			this.imageName = "infestedhellhound";
			this.long = "It looks like a large four-legged demon with two heads placed side-by-side. Its eyes and mouth are filled with flames, and covering each of its paws are large and menacing claws. A thick layer of dark fur covers his entire body like armor.  Both heads are looking at you hungrily as the hellhound circles around you.  A pair of black, slightly pointed cocks hang exposed, dripping with cum and worms.  You get the feeling reasoning with this beast will be impossible.";
			// this.plural = false;
			this.createCock(9, 2);
			this.createCock(9, 2);
			this.balls = 2;
			this.ballSize = 5;
			this.cumMultiplier = 8;
			this.createBreastRow();
			this.createBreastRow();
			this.createBreastRow();
			this.ass.analLooseness = ANAL_LOOSENESS.NORMAL;
			this.ass.analWetness = ANAL_WETNESS.NORMAL;
			this.tallness = 47;
			this.hipRating = HIP_RATING.AVERAGE;
			this.buttRating = BUTT_RATING.AVERAGE + 1;
			this.skinTone = "black";
			this.skinType = SKIN.FUR;
			//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SKIN.FUR];
			this.hairColor = "red";
			this.hairLength = 3;
			initStrTouSpeInte(65, 60, 50, 1);
			initLibSensCor(95, 20, 100);
			this.weaponName = "claws";
			this.weaponVerb="claw";
			this.weaponAttack = 5;
			this.armorName = "thick fur";
			this.lust = 50;
			this.lustVuln = 0.87;
			this.temperment = TEMPERMENT_LOVE_GRAPPLES;
			this.level = 5;
			this.gems = 10 + rand(10);
            this.drop = new WeightedDrop().add(consumables.CANINEP, 3)
            					.addMany(1, consumables.BULBYPP,
            							consumables.KNOTTYP,
            							consumables.BLACKPP,
            							consumables.DBLPEPP,
            							consumables.LARGEPP);
			this.special1 = hellhoundFire;
			this.special2 = hellhoundScent;
			this.special3 = hellHoundWormCannon;
			this.tailType = TAIL.DOG;
			checkMonster();
		}

	}

}