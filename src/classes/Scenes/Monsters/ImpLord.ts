package classes.Scenes.Monsters
{
	import classes.*;
	import classes.internals.*;

	public class ImpLord extends Imp
	{
		//Special Attack 1
		protected impFire():void
		{
			Render.text("The imp mutters something to himself. Before you have time to react the demonic creature's hand is filled with a bright red fire that he hurls at you.  The flames lick at your body leaving a painful burn on you torso, as well as an arousing heat in your groin.");
			//[-HP // +Lust(minor)]
			let damage: number = 40 + rand(10);
			player.takeDamage(damage);
			game.dynStats("lus", 20 + player.stats.cor / 10);
			combatRoundOver();
		}
		
		//Heavy Attack
		protected impLordHeavyEncounter():void
		{
			let damage: number = int((str + weaponAttack + 20) - rand(player.tou) - player.armorDef);
			Render.text("The demonic creature slashes a clawed hand towards your stomach,");
			if (combatMiss() || combatEvade() || combatFlexibility() || combatMisdirect()) Render.text(" but you handily avoid it.");
			else if (damage <= 0) Render.text(" but the attack proves ineffectual.");
			else {
				Render.text("leaving a large gash. The attack leaves you slightly stunned, but you recover. ");
				damage = player.takeDamage(damage);
				Render.text("(" + damage + ")");
			}
			combatRoundOver();
		}

		//Lust Attack
		protected impLordLustAttack():void
		{
			Render.text("Lowering his loincloth the imp reveals his inhumanly thick shaft.  He smirks and licks his lips as he gives his cock a squeeze, milking a few beads of clear pre from the tip.  You shake your head and try to ignore your growing need.");
			//[+Lust]
			game.dynStats("lus", 5 + player.stats.lib / 5 + player.stats.cor / 5);
			combatRoundOver();
		}

		//Lust and Light Attack
		protected impLordLustAttack2():void
		{
			Render.text("Reaching into his satchel the devilish creature pulls out a leather riding crop.  He quickly rushes forward, but somehow manages to get behind you.  Before you can react the imp lashes out, striking your [butt] twice with the riding crop.  The strikes leave a slight burning feeling, as well as a strange sense of arousal.");
			let damage: number = 3 + rand(10);
			damage = player.takeDamage(damage);
			Render.text(" (" + damage + ")");
			//[-HP(minor) // +Lust]
			game.dynStats("lus", 5 + player.stats.sens / 4 + player.stats.cor / 10);
			combatRoundOver();
		}
        override protected performCombatAction():void
		{
			let choices:Array = [impFire, impLordLustAttack2, impLordLustAttack, impLordHeavyEncounter, eAttack];
			choices[rand(choices.length)]();
		}


		public defeated(hpVictory:boolean):void
		{
			game.impScene.defeatImpLord();
		}

		public won(hpVictory:boolean,pcCameWorms:boolean):void
		{
			game.impScene.loseToAnImpLord();
		}

		public ImpLord()
		{
			super(true);
			this.a = "the ";
			this.short = "imp lord";
			this.imageName = "implord";
			this.long = "The greater imp has an angular face, complete with curved nose and burnt red skin typical of imps.  He has no hair on his head, leaving his cold, lust-clouded, black eyes unobstructed.  Just above his long pointed ears are two curved bovine horns.  While still short, he's much taller then the average imp, being nearly four feet tall, and extremely well-muscled.  A pair of powerful wings extends out from his shoulders, however, you suspect he wouldn't be able to fly for long due to his extreme bulk.  A thick coating of fur starts at his well toned hips and works its way down his powerful legs.  His legs end in a pair of oddly jointed, demonic hooves.  His demonic figure is completed by a thin tail that has an arrowhead shaped tip.\n\nThe greater imp, like most imps wear very little clothing; only a simple loincloth and satchel hang from his waist.  You also note that the imp has two barbell piercings in his nipples. The creature doesn't seem to have any weapons, aside from his sharp black finger nails.";
			// this.plural = false;
			// Imps now only have demon dicks.
			// Not sure if I agree with this, I can imagine the little fuckers abusing the
			// shit out of any potions they can get their hands on.
			this.createCock(rand(2)+11,2.5,CockType.DEMON);
			this.balls = 2;
			this.ballSize = 1;
			this.cumMultiplier = 3;
			this.hoursSinceCum = 20;
			createBreastRow(0);
			this.ass.analLooseness = ANAL_LOOSENESS.STRETCHED;
			this.ass.analWetness = ANAL_WETNESS.NORMAL;
			this.tallness = rand(14) + 40;
			this.hipRating = HIP_RATING.BOYISH;
			this.buttRating = BUTT_RATING.TIGHT;
			this.lowerBody = LOWER_BODY.HOOFED;
			this.skinTone = "red";
			initStrTouSpeInte(55, 40, 75, 42);
			initLibSensCor(55, 35, 100);
			this.weaponName = "fist";
			this.weaponVerb="punch";
			this.weaponAttack = 10;
			this.armorName = "leathery skin";
			this.armorDef = 5;
			this.bonusHP = 100;
			this.lust = 30;
			this.lustVuln = .65;
			this.temperment = TEMPERMENT_LUSTY_GRAPPLES;
			this.level = 7;
			this.gems = rand(15) + 25;
			this.drop = new WeightedDrop().
					add(consumables.MINOBLO,1).
					add(consumables.LABOVA_,1).
					add(consumables.INCUBID,6).
					add(consumables.SUCMILK,6);
			this.wingType = WING.IMP;
			this.special1 = lustMagicAttack;
			checkMonster();
		}
		
	}

}