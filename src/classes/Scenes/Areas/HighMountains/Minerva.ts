package classes.Scenes.Areas.HighMountains
{
	import classes.*;
	import classes.GlobalFlags.FlagEnum;
	import classes.internals.*;

	public class Minerva extends Monster
	{

		//Normal Attacks for all Minerva Types
		//Shark-bite:
		private function minervaBite():void
		{
			Render.text("The siren paces around you in circles, waiting for the right moment to strike.  Unexpectedly quick thanks to her clawed feet, she propels herself toward you at full speed.  Her maw opens wide to chomp on you, showing off multiple rows of glinting, razor-sharp teeth.");
			let damage: number = int((str + 85) - rand(player.tou) - player.armorDef);
			if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) {
				Render.text("  You get out of the way just in time, Minerva making a loud chomping sound as she only catches the air.");
			}
			//[else block]
			else if (damage <= 0) Render.text("  Your hands lash out, knocking her head to the side as she tries to bite you.  With the bite deflected, Minerva makes a loud chomping sound as she only bites the air.");
			//[if attack lands]
			else {
				Render.text("  Her teeth dig right into your arm!  It's a bit of a struggle, but you're able to free yourself.  The damage doesn't look too serious. ");
				damage = player.takeDamage(damage);
				Render.text("(" + damage + ")");
			}
			combatRoundOver();
		}

//Flying kick:
		private function minervaKnowsKungfu():void
		{
			Render.text("The blue beauty flaps her wings and launches herself into the air.  Once she's gained as much altitude as she can, she dive-bombs you, her demon-clawed feet leading the attack.");

			let damage: number = int((str + weaponAttack + 100) - rand(player.tou) - player.armorDef);
			spe -= 70;
			if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) {
				Render.text("  You jump out of the landing zone just in time, piles of dirt exploding in all directions as Minerva slams into the ground.");
			}
			//[else block]
			else if (damage <= 0) Render.text("  Steadying yourself, you reach up, grabbing hold of Minerva as she attempts to land a heavy blow on you.  Grunting hard, you pull against her and toss the siren aside completely, halting her attack.");
			//[if attack lands]
			else {
				Render.text("  She hits you square in the chest, knocking you to the ground as her entire weight lands on you.  The bombshell of a woman jumps off your chest, ready to keep fighting.");
				damage = player.takeDamage(damage);
				Render.text(" (" + damage + ")");
			}
			spe += 70;
			combatRoundOver();
		}

//Tail-whip
		private function tailWhip():void
		{
			let damage: number = int((str + 35) - rand(player.tou) - player.armorDef);

			Render.text("She runs at you, holding the weapon like she's about to chop into your side.  You brace yourself, but when she's only a few feet away, she starts to turn her body.");
			//[else block]
			if (damage <= 0) Render.text("  Lashing out with a fierce kick you intercept the tail-whip, your [foot] impacting against her strong appendage and totally neutralizing its momentum.");

			//[if attack lands]
			else {
				Render.text("  Her shark tail whacks you, knocking you to the ground.  You quickly struggle back into position");
				if (player.armorDef > 0) Render.text(", but your defense has been reduced");
				Render.text("!");
				damage = player.takeDamage(damage);
				Render.text(" (" + damage + ")");
				if (statusAffects.has("TailWhip")) statusAffects.get("TailWhip").value1 = 10;
				else statusAffects.add(new StatusAffect("TailWhip", 10, 0, 0, 0)));
			}
			combatRoundOver();
		}

//Halberd stab:
		private function minervaUsesHalberdStab():void
		{
			Render.text("Minerva charges at you, brandishing her halberd's sharp tip toward you.");
			let damage: number = int((str + weaponAttack) - rand(player.tou));

			if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) Render.text("  You sidestep the attack just as she thrusts the point past your face.");

			//[else block]
			else if (damage < 0) Render.text("  With all your strength, you swing your [weapon], the blow landing on the side of Minerva's halberd and deflecting the goring strike away from you.");

			//[if attack lands]
			else {
				Render.text("  She pierces you right in the shoulder!  You wince in pain and step back, out of her reach again.");
				damage = player.takeDamage(damage);
				Render.text(" (" + damage + ")");
			}
			combatRoundOver();
		}

//Halberd CHOP:
		private function minervaUsesHalberdCHOP():void
		{
			Render.text("She moves in close, practically right in front of you and raises the halberd.");
			let damage: number = int((str + 100) - rand(player.tou) - player.armorDef);

			if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) Render.text("  You get out of the way quickly, her attack chopping deeply into the earth. ");

			//[else block]
			else if (damage < 0) Render.text("  In a mad show of pure skill, you lift your hands, clamping them down on the cheeks of the halberd blade and stop Minerva's attack cold, bewildering the siren in the process.");

			//[if attack lands]
			else {
				Render.text("  You don't have time to avoid the downward chop and the axe head lands right in your shoulder blade!  You cry out in pain, but you can still move your arm despite the brutal blow.");
				damage = player.takeDamage(damage);
				Render.text(" (" + damage + ")");
			}
			combatRoundOver();
		}

//White Fire
		private function kiteFire():void
		{
			Render.text("The siren holds her hand out, flashing you a cunning smirk and snapping her fingers.  Your entire body is engulfed in white-hot flames, searing flesh and burning your [armor].  The sudden flash of heat and fire elicit panic from deep within you, causing you to cry out and roll on the ground to put the fires out.  The burns aren't too severe, but you know you can't keep getting hit like that!");
			let damage: number = int(10 + (inte / 3 + rand(inte / 2)) * 1.5);
			damage = player.takeDamage(damage);
			Render.text(" (" + damage + ")");
			combatRoundOver();
		}

//Lust Attacks for tainted Minerva
//Booty-shorts
		private function bootyShortInYoFaceSon():void
		{
			Render.text("The blue beauty turns around and bends over so far that she uses her halberd like a pole to support herself.  She lifts her shark tail up so you can see her short-shorts hugging perfectly against her ample bottom.  Her tail waves to the left and to the right as she does a little booty shake for you.  The siren gives her big ass a nice, hard slap that echoes off the tower walls, and making it jiggle even more.  She quickly turns around to face you, smirking at what she just did.");
			game.dynStats("lus", 20 + player.stats.lib / 10 + rand(5));
			combatRoundOver();
		}

//Lust Attacks for all Minervas
//Pole licking
		private function lickDatPole():void
		{
			Render.text("Minerva stands, holding her halberd straight up next to her as she looks it over with a seductive stare.  Giving you a suggestive look she rolls out a two-foot long tongue from her mouth, licking a good length of the massive weapon, even wrapping her tongue around it a few times.  Suddenly she sucks her tongue back into her mouth and gives you a little smirk, almost to say \"<i>Yeah, I can do that... and more.</i>\"");
			game.dynStats("lus", 20 + player.stats.lib / 10 + rand(5));
			combatRoundOver();
		}

//Special attack
		private function sirensSong():void
		{
			//The Siren's Song (2-part attack) (Rarely used or when she's desperate aka: Less than 10% hp)
			//[part 1]
			if (findStatusAffect(StatusAffects.SirenSong) < 0) {
				Render.text("Minerva begins to hum a pleasant tune.  It might be better to stand back to see what she's up to!");
				statusAffects.add(new StatusAffect("SirenSong", 0, 0, 0, 0)));
			}
			//[part 2]
			else {
				Render.text("Her hum becomes a song.  A magnificent song without words, a sound that should be impossible for any human, or creature for that matter, to make naturally.");
				//If wait:
				if (flags[FlagEnum.IN_COMBAT_USE_PLAYER_WAITED_FLAG] == 1) Render.text("  You cover your ears before she even opens her lips, wary of its power.  Judging by the dim feeling of pleasure simmering through you with the little sound you're picking up regardless, it probably was for the better.");
				//No wait - insta loss:
				else {
					Render.text("  Your mind clouds over as the song flows through your ears and fills your mind with sweet bliss.  You lower your [weapon] and dreamily walk into the siren's sweet embrace.  You absent-mindedly disrobe yourself as you move in closer, the song getting louder with each step you take, until you finally bury yourself into the siren's soft bosom and she wraps her feathery arms around your body.  She stops singing her beautiful song and whispers into your ear, \"<i>You're all mine now.</i>\"");
					player.lust = 100;
				}
				statusAffects.remove("SirenSong");
			}
			combatRoundOver();
		}

		override protected function performCombatAction():void
		{
			if (statusAffects.has("SirenSong")) sirensSong();
			else if (rand(25) == 0 || (HP < 100 && rand(2) == 0)) sirensSong();
			//Else choose randomly!
			else {
				let choices:Array = [lickDatPole,
					bootyShortInYoFaceSon,
					kiteFire,
					minervaUsesHalberdCHOP,
					minervaUsesHalberdStab,
					tailWhip,
					minervaKnowsKungfu,
					minervaBite];
				choices[rand(choices.length)]();
			}
		}

		public defeated(hpVictory:boolean):void
		{
			game.highMountains.minervaScene.beatUpDatSharpie();
		}

		public won(hpVictory:boolean,pcCameWorms:boolean):void
		{
			game.highMountains.minervaScene.loseToMinerva();
		}

		public function Minerva()
		{
			this.a = "";
			this.short = "Minerva";
			this.imageName = "minerva";
			this.long = "You're fighting the tainted siren, Minerva.  Standing around eight feet and wielding a weapon just as tall, she is a force to be reckoned with.  Her skin is a dark navy blue, though her belly, neck and inner thighs are as white as the clouds in the sky, and a golden piecing decorates her navel.  Orange and white stripes adorn her legs, tail and back.  Two large wings sprout from her back, their feathers an attention-grabbing red and orange mix.  She wears a tube-top that hold back her double d-cups, and short shorts around her wide waist that seem to be holding back a huge bulge.\n\nHer weapon is a halberd, made from a shiny, silvery metal, and seems to have an unnatural glow to it.";
			// this.plural = false;
			this.createCock(16,3);
			this.balls = 2;
			this.ballSize = 3;
			this.cumMultiplier = 3;
			// this.hoursSinceCum = 0;
			this.createVagina(false, VAGINA_WETNESS.SLICK, VAGINA_LOOSENESS.NORMAL);
			createBreastRow(Appearance.breastCupInverse("DD"));
			this.ass.analLooseness = ANAL_LOOSENESS.TIGHT;
			this.ass.analWetness = ANAL_WETNESS.DRY;
			this.tallness = 8*12+4;
			this.hipRating = HIP_RATING.CURVY;
			this.buttRating = BUTT_RATING.LARGE+1;
			this.skinTone = "blue";
			this.hairColor = "red";
			this.hairLength = 25;
			initStrTouSpeInte(50, 65, 95, 75);
			initLibSensCor(30, 25, 45);
			this.weaponName = "halberd";
			this.weaponVerb="slash";
			this.weaponAttack = 30;
			this.weaponPerk = "";
			this.weaponValue = 150;
			this.armorName = "comfortable clothes";
			this.armorDef = 1;
			this.armorPerk = "";
			this.armorValue = 5;
			this.bonusHP = 470;
			this.lust = 20;
			this.lustVuln = .2;
			this.temperment = TEMPERMENT_LOVE_GRAPPLES;
			this.level = 16;
			this.gems = rand(25)+10;
			this.additionalXP = 50;
			this.drop = new WeightedDrop(consumables.PURPEAC, 1);
			this.wingType = WING.HARPY;
			this.wingDesc = "fluffy feathery";
			checkMonster();
		}
		
	}

}