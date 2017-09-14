package classes.Scenes.Dungeons.D3 
{
	import classes.Items.WeaponLib;
	import classes.Monster;
	import classes.StatusAffects;
	import classes.PerkLib;
	import classes.GlobalFlags.FlagEnum;
	
	
	/**
	 * ...
	 * @author Gedan
	 */
	public class LivingStatue extends Monster
	{
		public defeated(hpVictory:boolean):void
		{
			flags[FlagEnum.D3_STATUE_DEFEATED] = 1;
			game.d3.livingStatue.beatUpDaStatue(hpVictory);
		}
		
		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			game.d3.livingStatue.fuckinMarbleOP(hpVictory, pcCameWorms);
		}
		
		public LivingStatue() 
		{
			this.a = "the ";
			this.short = "living statue";
			this.imageName = "livingstatue";
			this.long = "This animate marble statue shows numerous signs of wear and tear, but remains as strong and stable as the day it was carved. Its pearly, white skin is pockmarked in places from age, yet the alabaster muscles seem to move with almost liquid grace. You get the impression that the statue was hewn in the days before the demons, then brought to life shortly after. It bears a complete lack of genitalia - an immaculately carved leaf is all that occupies its loins. It wields a hammer carved from the same material as the rest of it.";
			
			initStrTouSpeInte(100, 80, 25, 50);
			initLibSensCor(10, 10, 100);
			
			this.lustVuln = 0;
			
			this.tallness = 16 * 12;
			this.createBreastRow(0, 1);
			initGenderless();
			
			this.drop = NO_DROP;
			
			this.level = 22;
			this.bonusHP = 1000;
			
			this.weaponName = "stone greathammer";
			this.weaponVerb = "smash";
			this.weaponAttack = 25;
			this.armorName = "cracked stone";
			
			createPerk(PerkLib.Resolute, 0, 0, 0, 0);
			
			checkMonster();
		}
		
		override protected handleStun():boolean
		{
			MainScreen.text("The stone giant's unforgiving flesh seems incapable of being stunned.");
			return true;
		}
		
		override protected handleFear():boolean
		{
			MainScreen.text("The stone giant cares little for your attempted intimidation.");
			return true;
		}
		
		override protected handleBlind():boolean
		{
			return true;
		}
		
		private concussiveBlow():void
		{
			//Maybe replace this with passive stun? TERRIBLE IDEA
			MainScreen.text("The giant raises his hammer for an obvious downward strike. His marble muscles flex as he swings it downward. You're able to hop out of the way of the clearly telegraphed attack, but nothing could prepare you for the shockwave it emits as it craters the ground.");

			//Light magic-type damage!
			let damage:number = (100 * ((inte/player.stats.int) / 4));
			damage = player.takeDamage(damage);
			
			//Stun success
			if (rand(2) == 0 && player.findStatusAffect(StatusAffects.Stunned) < 0)
			{
				MainScreen.text(" <b>The vibrations leave you rattled and stunned. It'll take you a moment to recover!</b>");
				player.statusAffects.add(new StatusAffect("Stunned", 2, 0, 0, 0)));
			}
			else
			//Fail
			{
				MainScreen.text(" You shake off the vibrations immediately. It'll take more than that to stop you!");
			}
			
			MainScreen.text(" (" + damage + ")");
		}
		
		private dirtKick():void
		{
			MainScreen.text("The animated sculpture brings its right foot around, dragging it through the gardens at a high enough speed to tear a half score of bushes out by the root. A cloud of shrubbery and dirt washes over you!");
			
			//blind
			if (rand(2) == 0 && player.findStatusAffect(StatusAffects.Blind) < 0)
			{
				player.statusAffects.add(new StatusAffect("Blind", 2, 0, 0, 0)));
				MainScreen.text(" <b>You are blinded!</b>");
			}
			else
			{
				//Not blind
				MainScreen.text(" You close your eyes until it passes and resume the fight!");
			}
		}
		
		private backhand():void
		{
			//Knocks you away and forces you to spend a turn running back to do melee attacks.
			MainScreen.text("The marble golem's visage twists into a grimace of irritation, and it swings its hand at you in a vicious backhand.");
	
			let damage:number = int ((str + weaponAttack) - rand(player.tou) - player.armorDef);
			//Dodge
			if (damage <= 0 || (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect())) MainScreen.text(" You slide underneath the surprise swing!");
			else
			{
				//Get hit
				MainScreen.text(" It chits you square in the chest. The momentum sends you flying through the air. You land with a crunch against a wall. <b>You'll have to run back to the giant to engage it in melee once more.</b>");
				
				player.statusAffects.add(new StatusAffect("KnockedBack", 0, 0, 0, 0)));
				this.statusAffects.add(new StatusAffect("KnockedBack", 0, 0, 0, 0))); // Applying to mob as a "used ability" marker
				damage = player.takeDamage(damage);
				
				MainScreen.text(" (" + damage + ")");
			}
		}
		
		private overhandSmash():void
		{
			//High damage, lowish accuracy.
			MainScreen.text("Raising its hammer high overhead, the giant swiftly brings its hammer down in a punishing strike!");
			
			let damage:number = 175 + int((str + weaponAttack) - rand(player.tou) - player.armorDef);
			if (damage <= 0 || rand(100) < 25 || combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) MainScreen.text(" You're able to sidestep it just in time.");
			else
			{
				//Hit
				MainScreen.text(" The concussive strike impacts you with bonecrushing force.");
				damage = player.takeDamage(damage);
				MainScreen.text(" (" + damage + ")");
			}
		}
		
		private disarm():void
		{
			MainScreen.text("The animated statue spins its hammer around, striking at your [weapon] with its haft.");
	
			//Avoid
			if ((combatMiss() && combatMiss()) || combatEvade() || combatFlexibility() || combatMisdirect()) MainScreen.text(" You manage to hold onto your equipment, for now.");
			//Oh noes!
			else
			{
				MainScreen.text(" Your equipment flies off into the bushes! You'll have to fight another way. (" + player.takeDamage(str + weaponAttack) + ")");
				player.statusAffects.add(new StatusAffect("Disarmed", 0, 0, 0, 0)));
				this.statusAffects.add(new StatusAffect("Disarmed", 0, 0, 0, 0)));
				flags[FlagEnum.PLAYER_DISARMED_WEAPON_ID] = player.weapon.id;
				flags[FlagEnum.PLAYER_DISARMED_WEAPON_ATTACK] = player.weaponAttack;
				player.setWeapon(WeaponLib.FISTS);
//				player.weapon.unequip(player,false,true);
			}
		}
		
		private cycloneStrike():void
		{
			//Difficult to avoid, moderate damage.
			MainScreen.text("Twisting back, the giant abruptly launches into a circular spin. Its hammer stays low enough to the ground that its circular path is tearing a swath of destruction through the once pristine garden, and it's coming in your direction!");

			let damage:number = (175 + int((str + weaponAttack) - rand(player.tou) - player.armorDef)) / (rand(3) + 2);
			//Avoid
			if (damage <= 0 || combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) MainScreen.text(" By the grace of the gods, you somehow avoid the spinning hammer.");
			else
			{
				//Hit
				MainScreen.text(" You're squarely struck by the spinning hammer.");
				damage = player.takeDamage(damage);
				MainScreen.text(" (" + damage + ")");
			}
		}
		
		override protected performCombatAction():void
		{
			if (this.HPRatio() < 0.7 && this.findStatusAffect(StatusAffects.KnockedBack) < 0)
			{
				this.backhand();
			}
			else if (this.HPRatio() < 0.4 && this.findStatusAffect(StatusAffects.Disarmed) < 0 && player.weaponName != "fists")
			{
				this.disarm();
			}
			else
			{
				let opts:Array = [];
				
				if (player.findStatusAffect(StatusAffects.Blind) < 0 && player.findStatusAffect(StatusAffects.Stunned) < 0) opts.push(dirtKick);
				if (player.findStatusAffect(StatusAffects.Blind) < 0 && player.findStatusAffect(StatusAffects.Stunned) < 0) opts.push(concussiveBlow);
				opts.push(cycloneStrike);
				opts.push(cycloneStrike);
				opts.push(overhandSmash);
				
				opts[rand(opts.length)]();
			}
			
			combatRoundOver();
		}
		
	}

}