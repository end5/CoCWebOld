package classes.Scenes.Areas.Forest
{
	import classes.*;
	import classes.GlobalFlags.FlagEnum;
	import classes.Scenes.Monsters.Goblin;
	import classes.internals.*;

	public class Tamani extends Goblin
	{

		override protected goblinTeaseAttack():void
		{
			if(flags[FlagEnum.TAMANI_TIMES_HYPNOTISED] > 0) {
				tamaniHypnoTease();
				return;
			}
			super.goblinTeaseAttack();
		}

//New Tease option:
		public tamaniHypnoTease():void {
			let selector:number = rand(3);
			//Choose 1 of 3 variations
			if(selector == 0) Render.text("Tamani smiles and shifts her leather straps, pulling one into the puffy gash that is her vagina.  She groans out loud, sliding the studded leather band into her outer lips and sawing it along her clit.  Her whole body blushes as she pulls it free, running a fingertip up the now wet strip of leather, \"<i>Mmm, can't you see how much my pussy needs a man inside it?  Be a good husband and fuck Tamani full!  You know you want to.</i>\"\n\n", false);
			if(selector == 1) Render.text("Tamani saunters up to you, sliding her fingers down to each side of her pussy and spreading them.  Your eyes are drawn to her honeyed tunnel, unable to look away she gets closer.  She whispers, \"<i>Your cock knows what it needs.  Just be a good husband and obey your dick, it KNOWS how badly you need mistress's pussy.</i>\"\n\n", false);
			if(selector == 2) Render.text("Tamani turns around and bends down, pressing her hands into the dirt as she kicks her legs apart.  Your stare open-mouthed at her bouncy ass-cheeks and the tantalizingly wet entrance of her slit.  She smirks and offers, \"<i>You've cum so many times inside me, why resist when you can give in and feel that pleasure again today?  Come on husband, don't make Tamani beg...</i>\"\n\n", false);

			//REACTIONS
			//LOW HYPNO VALUE:
			if(flags[FlagEnum.TAMANI_TIMES_HYPNOTISED] < 5) {
				selector = rand(3);
				if(selector == 0) Render.text("You reluctantly pull your stare away from the heavenly entrance between her legs.  There's an urge to walk over to her and plunge yourself inside her over and over, but you dismiss it.", false);
				if(selector == 1) Render.text("You find it hard to pull your gaze from her inviting twat, but you manage.  You shake your head, clearing away thoughts of fertilizing your wife.  Her rhetoric must be getting to you.", false);
				if(selector == 2) Render.text("No matter the case, her actions shifted a fair bit of your blood-flow to your groin.", false);
			}
			//MEDIUM HYPNO VALUE:
			else if(flags[FlagEnum.TAMANI_TIMES_HYPNOTISED] < 10) {
				selector = rand(2);
				if(selector == 0) {
					Render.text("With effort you manage to wrench your eyes away from the inviting folds of Tamani's vagina.  ", false);
					if(player.totalCocks() > 1) Render.text("Each of y", false);
					else Render.text("Y", false);
					Render.text("our " + multiCockDescriptLight(), false);
					if(player.lust > 80) Render.text(" drips pre-cum", false);
					else if(player.lust > 40) Render.text(" grows harder", false);
					else Render.text(" hardens", false);
					Render.text(" from the sexual sight, and you feel a compulsion to rush to your wife and take her on the spot.  Obviously she's not really your wife, but after so many fuckings it kind of makes sense to think of her that way.", false);
					if(player.lust < 70) Render.text("  Still, you don't want to fuck her right now!", false);
				}
				else {
					Render.text("Struggling, you pull your eyes back into your head and away from Tamani's gorgeous slit.  You shudder, feeling ", false);
					if(player.totalCocks () > 1) Render.text("each of ", false);
					Render.text("your " + player.multiCockDescriptLight(), false);
					if(player.lust <= 41) Render.text(" thicken perceptibly", false);
					else if(player.lust <= 81) Render.text(" twitch eagerly", false);
					else Render.text("drip pre-cum", false);
					Render.text(", responding to the overly sensual goblin's body.  You start to approach her, but stop yourself, realizing you were about to pick up your wife and fuck her on the spot.  You know she's not really your wife, but you have a hard time thinking of her as anything else, save for maybe your mistress.", false);
					if(player.lust < 70) Render.text("  Regardless, you're resolute in your desire not to fuck her right now!", false);
				}
			}
			//HIGH HYPNO VALUE
			else {
				selector = rand(2);
				if(selector == 0) {
					Render.text("You barely manage to step yourself from lunging forward to bury your mouth between your mistress's legs.  Hard and trembling between your legs, ", false);
					if(player.totalCocks() > 1) Render.text("each of ", false);
					Render.text("your " + player.multiCockDescriptLight() + " aches with need.  You battle with the compulsion to kneel before your short, stacked mistress and perform your duties as her breeder husband.", false);
				}
				else {
					Render.text("You wrench your gaze from the juicy mound before you with great difficulty.  The desire to submit to your wife and fuck her on the spot rages through your body, melting your resistance into liquid lust and pooling it in your groin.  ", false);
					if(player.totalCocks() > 1) Render.text("Each of y", false);
					else Render.text("Y", false);
					Render.text("our " + player.multiCockDescriptLight() + " pulses and dribbles pre-cum, aching to do its duty and fire load after load into Tamani's perfect pussy.", false);
				}
			}
			game.dynStats("lus", (rand(player.stats.lib/5)+3+(flags[FlagEnum.TAMANI_TIMES_HYPNOTISED])));
			combatRoundOver();
		}

		public defeated(hpVictory:boolean):void
		{
			if (hpVictory) {
				Render.text("Tamani is defeated!", true);
			} else {
				Render.text("Tamani gives up on defeating you and starts masturbating!", true);
			}
			if(player.lust >= 33 && player.totalCocks() > 0) {
				Render.text("  You could fuck her, but if that's the case why did you bother fighting her?\n\nWhat do you do to her?", false);
				let temp:Function = null;
				let temp2:Function = null;
				if(player.lowerBody.cockSpot.hasCock() && player.cockThatFits(analCapacity()) >= 0) temp = game.forest.tamaniScene.tamaniAnalShits;
				//NOT PREGGERS
				if (!game.forest.tamaniScene.pregnancy.isPregnant && player.canOvipositSpider()) {
					temp2 = game.forest.tamaniScene.tamaniBeaten;
				}
				game.simpleChoices("Fuck", game.forest.tamaniScene.tamaniSexWon, "Buttfuck", temp, "", null, "Lay Eggs", temp2, "Leave", game.cleanupAfterCombat);
			}
			else game.cleanupAfterCombat();
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			if (hpVictory){
				if(player.totalCocks() > 0) {
					if(rand(2) == 0) game.forest.tamaniScene.tamaniSexLost();
					else game.forest.tamaniScene.tamaniSexLetHer();
				}else {
					Render.text("Tamani sighs as you begin to lose conscious, \"<i>You dummy, why'd you get rid of the fun parts?</i>\"", true);
					game.cleanupAfterCombat();
				}
			} else {
				if(player.totalCocks() > 0) {
				//hypnoslut loss scene
				if(game.flags[FlagEnum.TAMANI_TIMES_HYPNOTISED] > 19 && rand(2) == 0) {
					game.forest.tamaniScene.getRapedByTamaniYouHypnoSlut();
				} else if(rand(2) == 0) game.forest.tamaniScene.tamaniSexLost();
				else game.forest.tamaniScene.tamaniSexLetHer();
				} else {
					Render.text("You give into your lusts and masturbate, but Tamani doesn't seem to care.  She kicks and punches you over and over, screaming, \"<i>You dummy, why'd you get rid of the fun parts?</i>\"", true);
					game.takeDamage(10000);
					game.cleanupAfterCombat();
				}
			}
		}

		public Tamani()
		{
			super(false);
			this.a = "";
			this.short = "Tamani";
			this.imageName = "tamani";
			this.long = "She keeps her arms folded across her " + game.forest.tamaniScene.tamaniChest() + " and glares at you.  The little thing is only about four feet tall, with pink and black dyed hair cut into a cute little 'do.  The greenish-gray skin of her breasts bulges out around her arms, supported by a few leather straps, amplifying her cleavage.  Her cunt lips are pierced multiple times, inflamed, and slightly parted.  There really isn't any clothing on her to hide them, just more of the ever-present straps wrapping around her thighs.";
			// this.plural = false;
			this.createVagina(false, VAGINA_WETNESS.DROOLING, VAGINA_LOOSENESS.NORMAL);
			this.statusAffects.add(new StatusAffect("BonusVCapacity", 55, 0, 0, 0)));
			createBreastRow(Appearance.breastCupInverse("E"));
			this.ass.analLooseness = ANAL_LOOSENESS.TIGHT;
			this.ass.analWetness = ANAL_WETNESS.DRY;
			this.statusAffects.add(new StatusAffect("BonusACapacity",40,0,0,0)));
			this.tallness = 40;
			this.hipRating = HIP_RATING.AMPLE+2;
			this.buttRating = BUTT_RATING.LARGE;
			this.skinTone = "greenish gray";
			this.hairColor = "pink and black";
			this.hairLength = 16;
			initStrTouSpeInte(32, 43, 55, 62);
			initLibSensCor(65, 65, 50);
			this.weaponName = "fists";
			this.weaponVerb="tiny punch";
			this.armorName = "leather straps";
			this.bonusHP = 40;
			this.lust = 40;
			this.lustVuln = 0.9;
			this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
			this.level = 4;
			this.gems = rand(25) + 5;
			this.drop = new WeightedDrop().add(consumables.GOB_ALE,4)
					.addMany(1,
							consumables.L_DRAFT,
							consumables.PINKDYE,
							consumables.BLUEDYE,
							consumables.ORANGDY,
							consumables.PURPDYE,
							consumables.INCUBID,
							consumables.REDUCTO,
							consumables.L_BLUEG,
							null);
			this.special1 = goblinDrugAttack;
			this.special2 = goblinTeaseAttack;
			checkMonster();
		}
		
	}

}