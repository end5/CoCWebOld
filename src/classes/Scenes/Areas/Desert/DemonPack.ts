package classes.Scenes.Areas.Desert
{
	import classes.*;
	import classes.internals.WeightedDrop;

	public class DemonPack extends Monster
	{


		override protected performCombatAction():void
		{
			//Demon pack has different AI
			if (rand(2) == 0)
				special1();
			else special2();
		}

		public defeated(hpVictory:boolean):void
		{
			if (hpVictory) {
				MainScreen.text("You strike out and the last of the demons tumbles to the ground with a thud. You stand there for a second surrounded by dead or unconscious demons feeling like a god of battle. Then you realize that if a god of battle does exist he lives on a demonic plane like this, so to avoid insulting him you take your hands off your hips and your " + player.legs() + " off the head of the demon leader before you start to search the bodies.", true);
				game.dynStats("lus", 1);
			} else {
				MainScreen.text("The demons stop attacking, and reach out to touch your body. Some are already masturbating like it's the only thing in the world and you know that right now, if you wanted to, you could make each and every one of them fuck you.");
			}
			if(statusAffects.has("phyllafight")) {
				doNext(game.desert.antsScene.consolePhylla);
			} else if (hpVictory){
				game.cleanupAfterCombat();
			} else {
				MainScreen.text("  Do you rape them?", true);
				game.doYesNo(rapeDemons, game.cleanupAfterCombat);
			}
		}

		private rapeDemons():void{
			MainScreen.text("You open your arms and step into the throng of eager demons. They jump eagerly to touch you, becoming more and more lust-frenzied every second. You take the nearest demon and throw it to the ground and without a moment's thought the rest of the group leap to join you in a thoughtless madness of lust...", true);
			doNext(game.desert.oasis.oasisSexing);
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			if (player.gender == 0){
				if (hpVictory) {
					MainScreen.text("You collapse before the demons, who laugh at your utter lack of male or female endowments, beating you until you pass out.", true);
				} else {
					MainScreen.text("You offer yourself to the demons, who promptly begin laughing at your lack of endowments.  They fall on you as one, beating you into unconsciousness.", true);
				}
				game.cleanupAfterCombat();
			} else if (hpVictory){
				MainScreen.text("The demons finally beat you down and you collapse onto the sand of the oasis. Almost immediately you feel demonic hands pressing and probing your prone form. You hear the leader of the group say something in a strange tongue but you have a feeling you know what it means. The demons dive onto your inert body with intent and begin to press themselves against you...", true);
				doNext(game.desert.oasis.oasisSexing);
			} else {
				MainScreen.text("You struggle to keep your mind on the fight and fail to do so. ", true);
				if (pcCameWorms){
					MainScreen.text("\n\nThe demons joke and smile, obviously unconcerned with your state.\n\n", false);
				}
				if(player.lowerBody.cockSpot.count() > 0) {
					if(player.lowerBody.cockSpot.count() > 1) MainScreen.text("Each of y", false);
					else MainScreen.text("Y", false);
					MainScreen.text("our " + player.multiCockDescriptLight() + " throbs ", false);
					if(player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" and your ", false);
				}
				if(player.lowerBody.vaginaSpot.count() > 0) {
					if(!player.lowerBody.cockSpot.hasCock()) MainScreen.text("Your ", false);
					MainScreen.text(game.vaginaDescript(0) + " burns ", false);
				}
				MainScreen.text("with arousal.  You make a grab for the nearest demon and catch a handful of jiggly breast. You try desperately to use your other arm to pull her closer to slake your thirst but you both go tumbling to the ground. The demonic leader laughs out loud and the rest of the tribe falls on you, grabbing for anything it can find.", false);
				doNext(game.desert.oasis.oasisSexing);
			}
		}


		public teased(lustDelta:number):void
		{
			MainScreen.text("\n", false);
			if(lustDelta == 0) MainScreen.text("\n" + capitalA + short + " seems unimpressed.");
			else if(lustDelta > 0 && lustDelta < 5) MainScreen.text("The demons lessen somewhat in the intensity of their attack, and some even eye up your assets as they strike at you.", false);
			else if(lustDelta >= 5 && lustDelta < 10) MainScreen.text("The demons are obviously steering clear from damaging anything you might use to fuck and they're starting to leave their hands on you just a little longer after each blow. Some are starting to cop quick feels with their other hands and you can smell the demonic lust of a dozen bodies on the air.", false);
			else if(lustDelta >= 10) MainScreen.text("The demons are less and less willing to hit you and more and more willing to just stroke their hands sensuously over you. The smell of demonic lust is thick on the air and part of the group just stands there stroking themselves openly.", false);
			applyTease(lustDelta);
		}

		public DemonPack()
		{
			trace("DemonPack Constructor!");
			this.a = "the ";
			this.short = "demons";
			this.imageName = "demonmob";
			this.long= "The group is composed of roughly twenty tan-skinned demons, mostly humanoid in shape with many and varied corruptions across the mob. You see demonic high heels, twisting horns and swinging cocks of all shapes and sizes. There even seems to be a bull head in there somewhere. You also make out plenty of breasts ranging from tiny ones to a pair that requires a second person to carry them, and with those breasts a wide range of pussies, dripping and dry, sometimes nestled below some form of demonic dick.  The small tribe carries no weapons and what little clothing they wear is well-shredded, except for one hefty male wearing a cloak of what appears to be snakeskin across his broad shoulders." + (game.silly() ? "  You spot an odd patch that reads, \"<i>41st Engineer Company: Vaginal Clearance</i>\" on his shoulder." : "");
			this.plural = true;
			this.pronoun1 = "they";
			this.pronoun2 = "them";
			this.pronoun3 = "their";
			this.createCock(18,2);
			this.createCock(18,2,CockType.DEMON);
			this.balls = 2;
			this.ballSize = 1;
			this.cumMultiplier = 3;
			// this.hoursSinceCum = 0;
			this.createVagina(false, VAGINA_WETNESS.SLICK, VAGINA_LOOSENESS.LOOSE);
			createBreastRow(0);
			this.ass.analLooseness = ANAL_LOOSENESS.STRETCHED;
			this.ass.analWetness = ANAL_WETNESS.SLIME_DROOLING;
			this.tallness = rand(8) + 70;
			this.hipRating = HIP_RATING.AMPLE+2;
			this.buttRating = BUTT_RATING.LARGE;
			this.skinTone = "red";
			this.hairColor = "black";
			this.hairLength = 15;
			initStrTouSpeInte(80, 10, 10, 5);
			initLibSensCor(50, 60, 80);
			this.weaponName = "claws";
			this.weaponVerb="claw";
			this.armorName = "demonic skin";
			this.bonusHP = 200;
			this.lust = 30;
			this.temperment = TEMPERMENT_LOVE_GRAPPLES;
			this.level = 6;
			this.gems = rand(25)+10;
			this.drop = new WeightedDrop().addMany(1,
							consumables.SUCMILK,
							consumables.INCUBID,
							consumables.OVIELIX,
							consumables.B__BOOK);
			this.special1 = game.packAttack;
			this.special2 = game.lustAttack;
			this.tailType = TAIL.DEMONIC;
			this.hornType = HORNS.DEMON;
			this.horns = 2;
			checkMonster();
		}

	}

}