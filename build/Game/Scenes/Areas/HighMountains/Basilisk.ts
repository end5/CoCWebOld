/**
 * ...
 * @author ...
 */
export class Basilisk extends Monster {

	public static function basiliskSpeed(player:Player, amount:number = 0):void {
		if(player.stats.spe - amount < 1) {
			amount = player.stats.spe - 1;
			if (amount < 0) amount = 0;
		}
			player.stats.spe -= amount;
		if(player.statusAffects.has(StatusAffectType.BasiliskSlow)) player.addStatusValue(StatusAffects.BasiliskSlow, 1, amount);
		else player.statusAffects.set(new StatusAffect("BasiliskSlow", amount, 0, 0, 0)));
		showStatDown( 'spe' );
		// speUp.visible = false;
		// speDown.visible = true;
	}

		//special 1: basilisk mental compulsion attack
		//(Check vs. Intelligence/Sensitivity, loss = recurrent speed loss each
		//round, one time lust increase):
		private compulsion():void {
	DisplayText("The basilisk opens its mouth and, staring at you, utters words in its strange, dry, sibilant tongue.  The sounds bore into your mind, working and buzzing at the edges of your resolve, suggesting, compelling, then demanding you look into the basilisk's eyes.  ");
	//Success:
	if(player.stats.int/5 + randInt(20) < 24) {
				DisplayText("You can't help yourself... you glimpse the reptile's grey, slit eyes. You look away quickly, but you can picture them in your mind's eye, staring in at your thoughts, making you feel sluggish and unable to coordinate. Something about the helplessness of it feels so good... you can't banish the feeling that really, you want to look in the basilisk's eyes forever, for it to have total control over you.");
		game.player.stats.lust += 3;
		//apply status here
		basiliskSpeed(player, 20);
		player.statusAffects.add(StatusAffectType.BasiliskCompulsion, 0, 0, 0, 0);
}
			//Failure:
			else {
	DisplayText("You concentrate, focus your mind and resist the basilisk's psychic compulsion.");
}
game.combatRoundOver();
		}



		//Special 3: basilisk tail swipe (Small physical damage):
		private basiliskTailSwipe():void {
	let damage:number = int((str + 20) - Math.random() * (player.stats.tou + player.armorDef));
	damage = player.takeDamage(damage);
	DisplayText("The basilisk suddenly whips its tail at you, swiping your " + Desc.Leg.describeFeet(player) + " from under you!  You quickly stagger upright, being sure to hold the creature's feet in your vision. (" + damage + ")");
	if(damage === 0) DisplayText("  The fall didn't harm you at all.");
	game.combatRoundOver();
}

//basilisk physical attack: With lightning speed, the basilisk slashes you with its index claws!
//Noun: claw

override protected performCombatAction():void
	{
		if(!player.statusAffects.has(StatusAffectType.BasiliskCompulsion) && randInt(3) === 0 && findStatusAffect(StatusAffects.Blind) < 0) compulsion();
			else if (randInt(3) === 0) basiliskTailSwipe();
else eAttack();
		}

		public defeated(hpVictory:boolean):void
	{
		game.highMountains.basiliskScene.defeatBasilisk();
	}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
	{
		if(pcCameWorms) {
			DisplayText("\n\nThe basilisk smirks, but waits for you to finish...");
			return { next: game.endLustLoss };
		} else {
			game.highMountains.basiliskScene.loseToBasilisk();
		}
	}

		public Basilisk()
{
	this.a = "the ";
	this.short = "basilisk";
	this.imageName = "basilisk";
	this.long = "You are fighting a basilisk!  From what you can tell while not looking directly at it, the basilisk is a male reptilian biped standing a bit over 6' tall.  It has a thin but ropy build, its tightly muscled yellow underbelly the only part of its frame not covered in those deceptive, camouflaging grey-green scales.  A long, whip-like tail flits restlessly through the dirt behind its skinny legs, and sharp sickle-shaped index claws decorate each hand and foot.  You don't dare to look at its face, but you have the impression of a cruel jaw, a blunt lizard snout and a crown of dull spines.";
	// this.plural = false;
	this.createCock(6, 2);
	this.balls = 2;
	this.ballSize = 2;
	createBreastRow(0);
	this.torso.butt.looseness = ButtLooseness.TIGHT;
	this.torso.butt.wetness = ButtWetness.DRY;
	this.statusAffects.add(StatusAffectType.BonusACapacity, 30, 0, 0, 0);
	this.tallness = 6 * 12 + 2;
	this.torso.hipRating = HipRating.SLENDER + 1;
	this.torso.butt.rating = ButtRating.AVERAGE;
	this.torso.hips.legs.type = LegType.LIZARD;
	this.skin.tone = "gray";
	this.skin.type = SkinType.SCALES;
	//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SkinType.SCALES];
	this.torso.neck.head.hair.color = "none";
	this.torso.neck.head.hair.length = 0;
	this.baseStats.str = 85;
this.baseStats.tou = 70;
this.baseStats.spe = 35;
this.baseStats.int = 70;
	this.baseStats.lib = 50;
this.baseStats.sens = 35;
this.baseStats.cor = 60;
	this.weaponName = "claws";
	this.weaponVerb = "claw";
	this.weaponAttack = 30;
	this.armorName = "scales";
	this.armorDef = 10;
	this.armorPerk = "";
	this.armorValue = 70;
	this.bonusHP = 200;
	this.lust = 30;
	this.lustVuln = .5;
	this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
	this.level = 12;
	this.gems = randInt(10) + 10;
	this.drop = new ChainedDrop().add(consumables.REPTLUM, 0.9);
	this.tailType = TailType.COW;
	this.tailRecharge = 0;
	checkMonster();
}
		
	}

