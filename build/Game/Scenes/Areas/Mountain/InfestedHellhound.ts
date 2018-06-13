/**
 * ...
 * @author Fake-Name
 */


export class InfestedHellhound extends HellHound {
	//[Extra special attack]
	private hellHoundWormCannon() {
		DisplayText("The thing rears up onto its hind legs, revealing its more humanoid stature, and allowing it to use its flexible paws to caress its twinned-penises.  It lurches forwards powerfully, its thickness twitching and flaring as it launches a wave of worm-filled canine cum at you.");
		DisplayText("\n");
		if (randInt(2) === 0) {
			//Get hit – 10+ lust
			game.dynStats("lus", 5 + player.stats.lib / 20);
			DisplayText("Taken off-guard by the unexpected sexual display, you fail to move out of the way, and the wormy jism splatters you from the chest down.");
			if (player.statusAffects.has(StatusAffectType.Infested) && player.torso.cocks.count > 0) {
				DisplayText("  The worms inside you begin moving and squirming. A few of your cum-soaked parasites crawl out from your shivering " + Desc.Cock.describeMultiCockShort(player) + " as if attempting to meet the new arrivals.  You desperately want to brush them away, but the pleasure in your crotch is too good to fight, and you find yourself staying your hand as each and every one of the new worms makes it way into your " + Desc.Cock.describeMultiCockShort(player) + ".");
				if (player.torso.balls.quantity > 0) DisplayText("  Your " + Desc.Balls.describeBalls(true, true, player) + " grow weightier as the worms settle into their new home, arousing you beyond measure.");
				else DisplayText("  You can feel them shifting around inside you as they adjust to their new home, arousing you beyond measure.");
				game.player.stats.lust += 10;
			}
			else if (player.torso.cocks.count > 0) {
				DisplayText("  The worms wriggle and squirm all over you, working their way towards your groin.  It tickles pleasantly, but you brush them away before they can get inside you.  The thought of being turned into a worm-dispensing cum fountain is horrifying, but it leaves you hard.");
				game.dynStats("lus", (5 + Math.round(player.stats.cor / 20)));
			}
			else if (player.torso.vaginas.count > 0) DisplayText("  Thankfully, the worms don't seem to want anything to do with you, and rapidly drop down to the ground.");
		}
		//Sidestep
		else {
			DisplayText("You sidestep the gush of wormy fluid, letting it splatter against the rocks behind you.");
			//(If infested +10 lust:  
			if (player.statusAffects.has(StatusAffectType.Infested) && player.torso.cocks.count > 0) {
				if (player.torso.cocks.count > 0) {
					DisplayText("  Despite avoiding the torrent of infected seed, your own wormy ");
					if (player.torso.balls.quantity > 0) DisplayText(Desc.Balls.describeBalls(true, true, player));
					else DisplayText(Desc.Cock.describeMultiCockShort(player));
					DisplayText(" wriggle");
					if (player.torso.balls.quantity === 0 && player.torso.cocks.count === 1) DisplayText("s");
					DisplayText(" hotly, expelling a few of your own worms in response along with a dribble of thick pre-cum.   You wonder what it would feel like to let his worms crawl inside you...");
					game.player.stats.lust += 10;
				} else {
					CoC_Settings.error("Infested but no cock!");
					game.player.stats.lust += 5;
					DisplayText("  The idea of being covered in the beast's infested seed arouses you slightly, but you shake your head violently and clear away the unwelcome thought.");
				}
			}
			//if aroused by worms +5 lust:
			else if (player.statusAffects.has(StatusAffectType.WormsOn) && !player.statusAffects.has(StatusAffectType.WormsHalf)) {
				game.player.stats.lust += 5;
				DisplayText("  The idea of being covered in the beast's infested seed arouses you slightly, but you shake your head violently and clear away the unwelcome thought.");
			}
		}
		lust -= 25;
		if (lust < 40) lust = 40;
		combatRoundOver();
	}

	public defeated(hpVictory: boolean) {
		if (hpVictory) {
			DisplayText("The hellhound's flames dim and the heads let out a whine before the creature slumps down, defeated, unconscious, and yet still drooling worms.", true);
			game.return { next: Scenes.camp.returnToCampUseOneHour };
		} else {
			DisplayText("Unable to bear its unnatural arousal, the infested hellhound's flames dim as he stops his attack. The two heads look at you, whining plaintively.  The hellhound slowly pads over to you and nudges its noses at your crotch.  It seems he wishes to pleasure you.\n\n", true);
			if (player.gender > 0 && player.stats.lust >= 33) {
				DisplayText("You realize your desires aren't quite sated.  You could let it please you.  Do you?");
				game.simpleChoices("Fuck it", game.mountain.hellHoundScene.hellHoundGetsRaped, "", null, "", null, "", null, "Leave", game.cleanupAfterCombat);
			}
			else {
				DisplayText("You turn away, not really turned on enough to be interested in such an offer from such a beast.");
				game.return { next: Scenes.camp.returnToCampUseOneHour };
			}
		}
	}

	public won(hpVictory: boolean, pcCameWorms: boolean) {
		if (pcCameWorms) {
			DisplayText("\n\nThe infested hellhound's heads both grin happily as it advances towards you...");
			return { next: game.mountain.infestedHellhoundScene.infestedHellhoundLossRape };
		} else if (hpVictory) {
			game.mountain.infestedHellhoundScene.infestedHellhoundLossRape();
		} else {
			game.mountain.infestedHellhoundScene.infestedHellhoundLossRape();
		}
	}

	public InfestedHellhound() {
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
		this.torso.butt.looseness = ButtLooseness.NORMAL;
		this.torso.butt.wetness = ButtWetness.NORMAL;
		this.tallness = 47;
		this.torso.hipRating = HipRating.AVERAGE;
		this.torso.butt.rating = ButtRating.AVERAGE + 1;
		this.skin.tone = "black";
		this.skin.type = SkinType.FUR;
		//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SkinType.FUR];
		this.torso.neck.head.hair.color = "red";
		this.torso.neck.head.hair.length = 3;
		this.baseStats.str = 65;
this.baseStats.tou = 60;
this.baseStats.spe = 50;
this.baseStats.int = 1;
		this.baseStats.lib = 95;
this.baseStats.sens = 20;
this.baseStats.cor = 100;
		this.weaponName = "claws";
		this.weaponVerb = "claw";
		this.weaponAttack = 5;
		this.armorName = "thick fur";
		this.lust = 50;
		this.lustVuln = 0.87;
		this.temperment = TEMPERMENT_LOVE_GRAPPLES;
		this.level = 5;
		this.gems = 10 + randInt(10);
		this.drop = new WeightedDrop().add(consumables.CANINEP, 3)
			.addMany(1, consumables.BULBYPP,
			consumables.KNOTTYP,
			consumables.BLACKPP,
			consumables.DBLPEPP,
			consumables.LARGEPP);
		this.special1 = hellhoundFire;
		this.special2 = hellhoundScent;
		this.special3 = hellHoundWormCannon;
		this.tailType = TailType.DOG;
		checkMonster();
	}

}
