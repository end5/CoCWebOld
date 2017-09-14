package classes.Scenes.NPCs
{
	import classes.*;
	import classes.GlobalFlags.FlagEnum;
	import classes.internals.*;

	public class Ceraph extends Monster
	{

//[IN COMBAT SPECIALS]
//[SPECIAL 1] – Ubercharge!
		private ceraphSpecial1():void
		{
			game.spriteSelect(7);
			if (findStatusAffect(StatusAffects.Uber) < 0) {
				if (rand(2) == 0) {
					MainScreen.text("Ceraph winks and says, \"<i>Have you ever cum without being touched? You will.</i>\"\n\n", false);
				}
				else {
					MainScreen.text("Ceraph titters, \"<i>Let me show you the true power of an Omnibus.</i>\"\n\n", false);
				}
				MainScreen.text("Despite her sultry tease, you can tell she's starting to build up to something big...", false);
				statusAffects.add(new StatusAffect("Uber", 0, 0, 0, 0)));
			}
			else {
				//(Next Round)
				if (statusAffects.get("Uber").value1 == 0) {
					statusAffects.get("Uber").value1 = 1;
					if (rand(2) == 0) MainScreen.text("The demonic hermaphrodite begins forging demonic symbols in the air before her, each glowing brilliant pink before they blur away in a haze.", false);
					else MainScreen.text("The demonette makes obscene motions with her hands, as if masturbating an imaginary cock or vagina while her hands are wreathed in pink flames.", false);
					MainScreen.text("  <b>She's about to unleash something huge!</b>", false);
					if (player.stats.int > 50) MainScreen.text("  You should probably wait so you'll have a chance to avoid whatever's coming.", false);
				}
				//FIRE!
				else {
					statusAffects.remove("Uber");
					//(Avoid!)
					if (flags[FlagEnum.IN_COMBAT_USE_PLAYER_WAITED_FLAG] == 1) {
						MainScreen.text("She throws her hands out, palms facing you, and a rush of pink flame washes towards you.  Thanks to your decision to wait, it's easy to avoid the onrushing flames and her attack.\n\n", false);
						MainScreen.text("Ceraph sighs and asks, \"<i>Why would you move?  It would make you feel soooo good!</i>\"", false);
					}
					//(AUTO-LOSE)
					else {
						MainScreen.text("She throws her hands out, palms facing you, and a rush of pink flame washes towards you.  Too busy with your own attack to effectively dodge, you're hit full on by the pink fire.  Incredibly, it doesn't burn.  The fire actually seems to flow inside you, disappearing into your skin.  You stumble, confused for a second, but then it hits you.  Every inch of your body is buzzing with pleasure, practically squirming and convulsing with sexual delight.  You collapse, twitching and heaving, feeling the constant sensation of sexual release running from your head to your " + player.feet() + ".  Too horny and pleasured to resist, you lie down and tremble, occasionally rubbing yourself to enhance the bliss.", false);
						game.dynStats("lus", 1500);
					}
				}
			}
			combatRoundOver();
		}
//[SPECIAL] – Whip Binding
		private ceraphSpecial2():void
		{
			if (player.findStatusAffect(StatusAffects.Bound) < 0) {
				MainScreen.text("Ceraph snaps her whip at you, lightning fast.  Unable to avoid the blinding speed of her attack, you find yourself wrapped from head to toe in the strong leather of her whip.  Remarkably, the fire dies out everywhere the whip touches you, leaving you bound but unharmed.", false);
				//If player has l2 piercing
				if (flags[FlagEnum.PC_FETISH] >= 2) {
					MainScreen.text("  Gods this turns you on!", false);
					game.dynStats("lus", 5);
				}
				player.statusAffects.add(new StatusAffect("Bound", 2 + rand(5))), 0, 0, 0);
			}
			//[SPECIAL WHILE PC RESTRAINED]
			else {
				if (rand(2) == 0) {
					MainScreen.text("Ceraph cuddles up against you, embracing you tenderly.  Her more-than-ample bosom crushes against your flank, and her demonic prick grinds and rubs against your " + player.skinDesc + ", smearing it with her juices.  Her hands slide over your bound form, sneaking underneath your " + player.armorName + " to caress you more intimately while you're at her mercy.", false);
					game.dynStats("lus", 9 + player.stats.sens / 10);
				}
				//[SPECIAL 2 WHILE PC RESTRAINED]
				else {
					MainScreen.text("Ceraph blows hot kisses in your ear and slides and rubs against you as she slips over to embrace your front.  She holds up a finger, licks it, and wiggles it back and forth.  It begins to glow pink, dimly at first and then with increasing luminosity.  Once it's reached a brilliant intensity, the sparkling digit is roughly inserted into your mouth.  You can feel the dark magic soaking into your body just like water soaks into a sponge.  ", false);
					if (player.lust < 33) MainScreen.text("It makes you feel warm and flushed.", false);
					else if (player.lust < 60) MainScreen.text("It gets inside you and turns you on, stoking the flames of your desire.", false);
					else if (player.lust < 80) MainScreen.text("It makes you very horny, and you begin to wonder if it's worth resisting.", false);
					else MainScreen.text("It makes you ache and tremble with need, practically begging for another touch.", false);
					game.dynStats("lus", 5 + player.stats.cor / 10 + player.stats.lib / 20);
				}
			}
			combatRoundOver();
		}

		//(Struggle)
		public ceraphBindingStruggle():void
		{
			MainScreen.text("", true);
			MainScreen.text("You wriggle in the tight binding, trying your best to escape.  ", false);
			if (player.statusAffects.get("Bound").value1 - 1 <= 0) {
				MainScreen.text("With a mighty twist and stretch, the whip gives and uncurls from you all at once.  You've regained your freedom", false);
				if (flags[FlagEnum.PC_FETISH] >= 2) {
					MainScreen.text(", though you miss the tight leathery embrace", false);
				}
				MainScreen.text("!", false);
				player.statusAffects.remove("Bound");
				combatRoundOver();
				return;
			}
			else {
				MainScreen.text("Despite your frantic struggling, all you manage to do is chafe against her impressively taut leather whip.", false);
				if (flags[FlagEnum.PC_FETISH] >= 2) {
					MainScreen.text("  You get nice and hot from being so effectively restrained, maybe you should just accept it?", false);
				}
				player.statusAffects.get("Bound").value1 = -1;
				//Strong characters break free faster
				if (player.str > 65 && rand(player.str) > 45) {
					MainScreen.text("  Though you didn't break free, it seems like your mighty struggles loosened the whip slightly...", false);
					player.statusAffects.get("Bound").value1 = -1;
				}
			}
			MainScreen.text("\n\n", false);
			doAI();
		}

//(Wait)
		public ceraphBoundWait():void
		{
			MainScreen.text("", true);
			MainScreen.text("Why bother resisting?  The feeling of the leather wrapped tightly around you, digging into your " + player.skinDesc + ", is intoxicating.", false);
			if (flags[FlagEnum.PC_FETISH] >= 2) {
				MainScreen.text("  You squirm inside the bindings as you get more and more turned on, hoping that Ceraph will strip away your armor and force you to parade around as her bound, naked pet.", false);
				game.dynStats("lus", 5);
			}
			game.dynStats("lus", player.stats.lib / 20 + 5 + rand(5));
			MainScreen.text("\n\n", false);
			doAI();
		}


//[Double-Attack]
		private ceraphSpecial3():void
		{
			//[Mini-cum] – takes place of double-attack if very horny
			if (lust >= 75) {
				MainScreen.text("Ceraph spreads her legs and buries three fingers in her sopping twat, her thumb vigorously rubbing against the base of her bumpy prick.  Her other hand wraps around the meaty pole and begins jerking it rapidly.  In one practiced movement she stops jerking long enough to wrap the whip around her nodule-studded demon-cock, using it like a cockring.  The organ swells thanks to the forced blood-flow, and after a few more seconds of intense masturbation, the demoness cums hard.  Her cunny squirts all over her hand, dripping clear feminine drool down her thighs.  Ceraph's masculine endowment pulses and twitches, blasting out two big squirts of jizm before it slows to a trickle.\n", false);
				MainScreen.text("Letting out a throaty sigh, the demon unties her self-induced binding and gives you a wink.  Did you really just stand there and watch the whole thing?  Amazingly Ceraph actually seems stronger after such a crude display...", false);
				//(+10 str/toughness, 1 level, and 10 xp reward.)
				XP += 10;
				level += 1;
				str += 10;
				tou += 10;
				HP += 20;
				lust = 33;
				game.dynStats("lus", 3);
				MainScreen.text("\n", false);
				combatRoundOver();
				return;
			}
			let damage:number = 0;
			MainScreen.text("The demoness weaves her whip in the air until you can practically hear it slithering like a snake, cutting the air as it weaves back and forth, still magically alight with flames.  In a blink she lashes out twice in quick succession!\n", false);
			//First hit!
			doNext(game.playerMenu);
			//Blind dodge change
			if (statusAffects.has("Blind") && rand(10) != 9) {
				MainScreen.text(capitalA + short + " completely misses you with a blind attack!", false);
			}
			//Determine if dodged!
			else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
				if (player.stats.spe - spe < 8) MainScreen.text("You narrowly avoid " + a + short + "'s " + weaponVerb + "!", false);
				if (player.stats.spe - spe >= 8 && player.stats.spe - spe < 20) MainScreen.text("You dodge " + a + short + "'s " + weaponVerb + " with superior quickness!", false);
				if (player.stats.spe - spe >= 20) MainScreen.text("You deftly avoid " + a + short + "'s slow " + weaponVerb + ".", false);
			}
			//Determine if evaded
			else if (player.perks.has("Evade") && rand(100) < 10) {
				MainScreen.text("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.", false);
			}
			else if (player.perks.has("Misdirection") && rand(100) < 15 && player.armorName == "red, high-society bodysuit") {
				MainScreen.text("With Raphael's teachings and the easy movement afforded by your bodysuit, you easily anticipate and sidestep " + a + short + "'s attack.", false);
			}
			//Determine damage - str modified by enemy toughness!
			else {
				damage = int((str + weaponAttack) - Math.random() * (player.tou + player.armorDef));
				if (damage > 0) {
					damage = player.takeDamage(damage);
				}
				if (damage <= 0) {
					damage = 0;
					//Due to toughness or amor...
					if (rand(player.armorDef + player.tou) < player.armorDef) MainScreen.text("Your " + player.armorName + " absorb and deflect every " + weaponVerb + " from " + a + short + ".", false);
					else MainScreen.text("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.", false);
				}
				if (damage > 0 && damage < 6) {
					MainScreen.text("You are struck a glancing blow by " + a + short + "! (" + damage + ")", false);
				}
				if (damage > 5 && damage < 11) {
					MainScreen.text(capitalA + short + " wounds you! (" + damage + ")", false);
				}
				if (damage > 10 && damage < 21) {
					MainScreen.text(capitalA + short + " staggers you with the force of " + pronoun3 + " " + weaponVerb + "! (" + damage + ")", false);
				}
				if (damage > 20) {
					MainScreen.text(capitalA + short + " <b>mutilates</b> you with " + pronoun3 + " powerful " + weaponVerb + "! (" + damage + ")", false);
				}
			}
			game.statScreenRefresh();
			MainScreen.text("\n", false);
			//SECOND ATTACK HERE------
			//Blind dodge change
			if (statusAffects.has("Blind") && rand(10) != 9) {
				MainScreen.text(capitalA + short + " completely misses you with a blind attack!", false);
			}
			//Determine if dodged!
			else if (player.stats.spe - spe > 0 && int(Math.random() * (((player.stats.spe - spe) / 4) + 80)) > 80) {
				if (player.stats.spe - spe < 8) MainScreen.text("You narrowly avoid " + a + short + "'s " + weaponVerb + "!", false);
				if (player.stats.spe - spe >= 8 && player.stats.spe - spe < 20) MainScreen.text("You dodge " + a + short + "'s " + weaponVerb + " with superior quickness!", false);
				if (player.stats.spe - spe >= 20) MainScreen.text("You deftly avoid " + a + short + "'s slow " + weaponVerb + ".", false);
			}
			//Determine if evaded
			else if (player.perks.has("Evade") && rand(100) < 10) {
				MainScreen.text("Using your skills at evading attacks, you anticipate and sidestep " + a + short + "'s attack.", false);
			}
			else if (player.perks.has("Misdirection") && rand(100) < 15 && player.armorName == "red, high-society bodysuit") {
				MainScreen.text("With Raphael's teachings and the easy movement afforded by your bodysuit, you easily anticipate and sidestep " + a + short + "'s attack.", false);
			}
			else {
				//Determine damage - str modified by enemy toughness!
				damage = int((str + weaponAttack) - Math.random() * (player.tou + player.armorDef));
				if (damage > 0) {
					damage = player.takeDamage(damage);
				}
				if (damage <= 0) {
					damage = 0;
					//Due to toughness or amor...
					if (rand(player.armorDef + player.tou) < player.armorDef) MainScreen.text("Your " + player.armorName + " absorb and deflect every " + weaponVerb + " from " + a + short + ".", false);
					else MainScreen.text("You deflect and block every " + weaponVerb + " " + a + short + " throws at you.", false);
				}
				if (damage > 0 && damage < 6) {
					MainScreen.text("You are struck a glancing blow by " + a + short + "! (" + damage + ")", false);
				}
				if (damage > 5 && damage < 11) {
					MainScreen.text(capitalA + short + " wounds you! (" + damage + ")", false);
				}
				if (damage > 10 && damage < 21) {
					MainScreen.text(capitalA + short + " staggers you with the force of " + pronoun3 + " " + weaponVerb + "! (" + damage + ")", false);
				}
				if (damage > 20) {
					MainScreen.text(capitalA + short + " <b>mutilates</b> you with " + pronoun3 + " powerful " + weaponVerb + "! (" + damage + ")", false);
				}

			}
			game.statScreenRefresh();
			MainScreen.text("\n", false);
			combatRoundOver();
		}

		override protected performCombatAction():void
		{
			let choice:number = rand(4);
			if (player.statusAffects.has("Bound")) {
				ceraphSpecial2();
				return;
			}
			if (statusAffects.has("Uber")) {
				ceraphSpecial1();
				return;
			}
			switch (choice) {
				case 0:
					eAttack();
					break;
				case 1:
					ceraphSpecial1();
					break;
				case 2:
					ceraphSpecial2();
					break;
				case 3:
					ceraphSpecial3();
					break;
			}
		}


		public defeated(hpVictory:boolean):void
		{
			game.ceraphScene.winRapeChoices();
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			if(pcCameWorms){
				MainScreen.text("\n\nYour foe doesn't seem disgusted enough to leave...");
				doNext(game.endLustLoss);
			} else {
				game.ceraphScene.loseFUCKME();
			}
		}

		public Ceraph()
		{
			trace("Ceraph Constructor!");
			this.a = "";
			this.short = "Ceraph";
			this.imageName = "ceraph";
			this.long = "Ceraph the Omnibus is totally nude and reveling in it.  Her large yet perky breasts jiggle heavily against her chest as she moves.  The flawless purple skin of her twin mounds glistens with a thin sheen of sweat, inviting you to touch and rub your fingers along their slippery surface.  Her eyes are solid black, but convey a mix of amusement and desire, in spite of their alien appearance.  The demon's crotch is a combination of both genders – a drooling cunt topped with a thick demonic shaft, sprouting from where a clit should be.";
			// this.plural = false;
			this.createCock(10,2,CockType.DEMON);
			this.createVagina(false, VAGINA_WETNESS.SLAVERING, VAGINA_LOOSENESS.GAPING);
			this.statusAffects.add(new StatusAffect("BonusVCapacity", 20, 0, 0, 0)));
			createBreastRow(Appearance.breastCupInverse("E"));
			this.ass.analLooseness = ANAL_LOOSENESS.STRETCHED;
			this.ass.analWetness = ANAL_WETNESS.DRY;
			this.statusAffects.add(new StatusAffect("BonusACapacity",15,0,0,0)));
			this.tallness = 5*12+6;
			this.hipRating = HIP_RATING.CURVY;
			this.buttRating = BUTT_RATING.NOTICEABLE;
			this.lowerBody = LOWER_BODY.DEMONIC_HIGH_HEELS;
			this.skinTone = "purple";
			this.hairColor = "black";
			this.hairLength = 20;
			initStrTouSpeInte(65, 40, 80, 80);
			initLibSensCor(75, 15, 100);
			this.weaponName = "flaming whip";
			this.weaponVerb="flame-whip";
			this.weaponAttack = 15;
			this.armorName = "demon-skin";
			this.bonusHP = 200;
			this.lust = 30;
			this.lustVuln = 0.75;
			this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
			this.level = 9;
			this.gems = rand(5) + 38;
			this.drop = NO_DROP;
			this.special1 = ceraphSpecial1;
			this.special2 = ceraphSpecial2;
			this.special3 = ceraphSpecial3;
			checkMonster();
		}

	}

}