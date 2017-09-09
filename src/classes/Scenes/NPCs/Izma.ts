package classes.Scenes.NPCs
{
	import classes.*;

	/**
	 * ...
	 * @author ...
	 */
	public class Izma extends Monster 
	{

		//[Special Attacks]
		private function IzmaSpecials1():void {
			//Blind dodge change
			if(statusAffects.has("Blind") && rand(3) < 2) {
				Render.text("Izma attempts to close the distance with you, but misses completely because of her blindness.\n", false);
				return;
			}
			//Determine if dodged!
			if(player.stats.spe - spe > 0 && int(Math.random()*(((player.stats.spe-spe)/4)+80)) > 80) {
				Render.text("Izma attempts to get close, but you manage to side-step her before she can lay her gauntleted hands on you.\n", false);
				return;
			}
			//Determine if evaded
			if(player.perks.has("Evade") && rand(100) < 10) {
				Render.text("Izma attempts to get close, but you manage to side-step her before she can lay her gauntleted hands on you.\n", false);
				return;
			}
			//("Misdirection"
			if(player.perks.has("Misdirection") && rand(100) < 10 && player.armorName == "red, high-society bodysuit") {
				Render.text("Izma attempts to get close, but you put Raphael's teachings to use and side-step the sharkgirl, confusing her with your movements.\n", false);
				return;
			}
			//Determine if cat'ed
			if(player.perks.has("Flexibility") && rand(100) < 6) {
				Render.text("Izma attempts to get close, but you manage to side-step her before she can lay her gauntleted hands on you.\n", false);
				return;
			}
			Render.text("Izma rushes you with impressive speed, striking a few precise locations on your joints with her fingertips before leaping back.  It doesn't hurt, but you feel tired and sore. \"<i>Pressure points...</i>\" she laughs, seeing your confused expression.", false);
			//(Fatigue damage)
			game.fatigue(20+rand(20));
		}

		private function IzmaSpecials2():void {
			//Blind dodge change
			if(statusAffects.has("Blind") && rand(3) < 2) {
				Render.text("Izma blindly tries to clinch you, but misses completely.\n", false);
				return;
			}
			//Determine if dodged!
			if(player.stats.spe - spe > 0 && int(Math.random()*(((player.stats.spe-spe)/4)+80)) > 80) {
				Render.text("Izma tries to clinch you, but you use your speed to keep just out of reach.\n", false);
				return;
			}
			//Determine if evaded
			if(player.perks.has("Evade") && rand(100) < 10) {
				Render.text("Izma tries to clinch you, but she didn't count on your skills in evasion.  You manage to sidestep her at the last second.\n", false);
				return;
			}
			//("Misdirection"
			if(player.perks.has("Misdirection") && rand(100) < 10 && player.armorName == "red, high-society bodysuit") {
				Render.text("Izma ducks and weaves forward to clinch you, but thanks to Raphael's teachings, you're easily able to misguide her and avoid the clumsy grab.\n", false);
				return;
			}
			//Determine if cat'ed
			if(player.perks.has("Flexibility") && rand(100) < 6) {
				Render.text("Izma tries to lock you in a clinch, but your cat-like flexibility makes it easy to twist away from her grab.\n", false);
				return;
			}
			let damage:number = 0;
			damage = Math.round(130 - rand(player.tou+player.armorDef));
			if(damage < 0) damage = 0;
			Render.text("Izma ducks and jinks, working to close quarters, and clinches you. Unable to get your weapon into play, you can only ", false);
			if(player.armorDef >= 10 || damage == 0) {
				//(armor-dependent Health damage, fullplate, chain, scale, and bee chitin armor are unaffected, has a chance to inflict 'Bleed' damage which removes 2-5% of health for the next three turns if successful)
				damage = player.takeDamage(damage);
				Render.text("writhe as she painfully drags the blades of her glove down your back", false);
				player.statusAffects.add(new StatusAffect("IzmaBleed",3,0,0,0)));
			}
			else Render.text("laugh as her blades scape uselessly at your armor-clad back", false);
			Render.text(" before breaking her embrace and leaping away. (" + damage + ")", false);
		}
		private function IzmaSpecials3():void {
			Render.text("Rather than move to attack you, Izma grins at you and grabs her breasts, massaging them as she caresses her long penis with one knee. Her tail thrashes and thumps the sand heavily behind her as she simulates an orgasm, moaning loudly into the air. The whole display leaves you more aroused than before.", false);
			//(lust gain)
			game.dynStats("lus", (20 + player.stats.lib/5));
		}

		private function IzmaAI():void {
			let choice:number = rand(5);
			if(choice <= 1) eAttack();
			if(choice == 2) {
				if(player.fatigue >= 80) choice = 3;
				else IzmaSpecials1();
			}
			if(choice == 3) {
				if(player.armorDef >= 10 && rand(3) == 0) IzmaSpecials2();
				else choice = 4;
			}
			if(choice == 4) IzmaSpecials3();
			combatRoundOver();
		}

		public eAttack():void
		{
			Render.text("Izma slides up to you, throws a feint, and then launches a rain of jabs at you!\n", false);
			super.eAttack();
		}

		override protected function performCombatAction():void
		{
			let choice:number = rand(5);
			if (choice <= 1) eAttack();
			if (choice == 2) {
				if (player.fatigue >= 80) choice = 3;
				else IzmaSpecials1();
			}
			if (choice == 3) {
				if (player.armorDef >= 10 && rand(3) == 0) IzmaSpecials2();
				else choice = 4;
			}
			if (choice == 4) IzmaSpecials3();
			combatRoundOver();
		}

		public defeated(hpVictory:boolean):void
		{
			game.izmaScene.defeatIzma();
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			if (pcCameWorms){
				Render.text("\n\n\"<i>Gross!</i>\" Izma cries as she backs away, leaving you to recover alone.");
				game.cleanupAfterCombat();
			} else {
				game.izmaScene.IzmaWins();
			}
		}

		public function Izma()
		{
			this.a = "";
			this.short = "Izma";
			this.imageName = "izma";
			this.long = "Izma the tigershark stands a bit over 6' tall, with orange skin bearing horizontal stripes covering most of her body.  Her silver-white hair cascades past her shoulders, draping over an impressive pair of DD-cup breasts barely restrained by a skimpy black bikini top.  Under the knee-length grass skirt below them rustles her beastly fifteen-inch penis and four-balled sack; you catch occasional glimpses of them as she moves.  She's tucked her usual reading glasses into her locker at the moment.";
			// this.plural = false;
			this.createCock(15,2.2);
			this.balls = 4;
			this.ballSize = 3;
			this.createVagina(false, VAGINA_WETNESS.SLICK, VAGINA_LOOSENESS.LOOSE);
			this.statusAffects.add(new StatusAffect("BonusVCapacity", 45, 0, 0, 0)));
			createBreastRow(Appearance.breastCupInverse("DD"));
			this.ass.analLooseness = ANAL_LOOSENESS.NORMAL;
			this.ass.analWetness = ANAL_WETNESS.DRY;
			this.statusAffects.add(new StatusAffect("BonusACapacity",30,0,0,0)));
			this.tallness = 5*12+5;
			this.hipRating = HIP_RATING.CURVY;
			this.buttRating = BUTT_RATING.NOTICEABLE;
			this.skinTone = "striped orange";
			this.hairColor = "silver";
			this.hairLength = 20;
			initStrTouSpeInte(80, 90, 85, 65);
			initLibSensCor(75, 25, 40);
			this.weaponName = "clawed gauntlets";
			this.weaponVerb="clawed punches";
			this.weaponAttack = 45;
			this.armorName = "bikini and grass skirt";
			this.armorDef = 8;
			this.bonusHP = 330;
			this.lust = 20;
			this.lustVuln = .20;
			this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
			this.level = 15;
			this.gems = rand(5) + 1;
			this.drop = NO_DROP;
			checkMonster();
		}
		
	}

}
