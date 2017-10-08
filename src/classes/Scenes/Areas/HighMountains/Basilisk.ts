/**
 * ...
 * @author ...
 */
export default class Basilisk extends Monster {

	public static function basiliskSpeed(player:Player, amount:number = 0):void {
		if(player.stats.spe - amount < 1) {
			amount = player.stats.spe - 1;
			if (amount < 0) amount = 0;
		}
			player.stats.spe -= amount;
		if(player.statusAffects.has("BasiliskSlow")) player.addStatusValue(StatusAffects.BasiliskSlow, 1, amount);
		else player.statusAffects.add(new StatusAffect("BasiliskSlow", amount, 0, 0, 0)));
		showStatDown( 'spe' );
		// speUp.visible = false;
		// speDown.visible = true;
	}

		//special 1: basilisk mental compulsion attack
		//(Check vs. Intelligence/Sensitivity, loss = recurrent speed loss each
		//round, one time lust increase):
		private compulsion():void {
	MainScreen.text("The basilisk opens its mouth and, staring at you, utters words in its strange, dry, sibilant tongue.  The sounds bore into your mind, working and buzzing at the edges of your resolve, suggesting, compelling, then demanding you look into the basilisk's eyes.  ", false);
	//Success:
	if(player.stats.int/5 + rand(20) < 24) {
				MainScreen.text("You can't help yourself... you glimpse the reptile's grey, slit eyes. You look away quickly, but you can picture them in your mind's eye, staring in at your thoughts, making you feel sluggish and unable to coordinate. Something about the helplessness of it feels so good... you can't banish the feeling that really, you want to look in the basilisk's eyes forever, for it to have total control over you.", false);
		game.player.stats.lust += 3;
		//apply status here
		basiliskSpeed(player, 20);
		player.statusAffects.add(new StatusAffect("BasiliskCompulsion", 0, 0, 0, 0)));
}
			//Failure:
			else {
	MainScreen.text("You concentrate, focus your mind and resist the basilisk's psychic compulsion.", false);
}
game.combatRoundOver();
		}



		//Special 3: basilisk tail swipe (Small physical damage):
		private basiliskTailSwipe():void {
	let damage:number = int((str + 20) - Math.random() * (player.stats.tou + player.armorDef));
	damage = player.takeDamage(damage);
	MainScreen.text("The basilisk suddenly whips its tail at you, swiping your " + LowerBodyDescriptor.describeFeet(player) + " from under you!  You quickly stagger upright, being sure to hold the creature's feet in your vision. (" + damage + ")", false);
	if(damage == 0) MainScreen.text("  The fall didn't harm you at all.", false);
	game.combatRoundOver();
}

//basilisk physical attack: With lightning speed, the basilisk slashes you with its index claws!
//Noun: claw

override protected performCombatAction():void
	{
		if(!player.statusAffects.has("BasiliskCompulsion") && rand(3) == 0 && findStatusAffect(StatusAffects.Blind) < 0) compulsion();
			else if (rand(3) == 0) basiliskTailSwipe();
else eAttack();
		}

		public defeated(hpVictory:boolean):void
	{
		game.highMountains.basiliskScene.defeatBasilisk();
	}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
	{
		if(pcCameWorms) {
			MainScreen.text("\n\nThe basilisk smirks, but waits for you to finish...");
			doNext(game.endLustLoss);
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
	this.lowerBody.butt.analLooseness = ButtLooseness.TIGHT;
	this.lowerBody.butt.analWetness = ButtWetness.DRY;
	this.statusAffects.add(new StatusAffect("BonusACapacity", 30, 0, 0, 0)));
	this.tallness = 6 * 12 + 2;
	this.lowerBody.hipRating = HipRating.SLENDER + 1;
	this.lowerBody.butt.buttRating = ButtRating.AVERAGE;
	this.lowerBody = LowerBodyType.LIZARD;
	this.skinTone = "gray";
	this.skinType = SkinType.SCALES;
	//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SkinType.SCALES];
	this.upperBody.head.hairColor = "none";
	this.upperBody.head.hairLength = 0;
	initStrTouSpeInte(85, 70, 35, 70);
	initLibSensCor(50, 35, 60);
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
	this.gems = rand(10) + 10;
	this.drop = new ChainedDrop().add(consumables.REPTLUM, 0.9);
	this.tailType = TailType.COW;
	this.tailRecharge = 0;
	checkMonster();
}
		
	}

