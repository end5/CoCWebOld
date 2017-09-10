package classes.Scenes.Areas.Swamp
{
	import classes.*;
	import classes.internals.*;

	/**
	 * ...
	 * @author ...
	 */
	public class CorruptedDrider extends AbstractSpiderMorph
	{

		//Drider kiss!
		public driderKiss():void {
			let temp: number;
			Render.text("The corrupted drider closes in on your web-bound form, cooing happily at you while you struggle with the sticky fibers.\n\n", false);
			//Blind dodge change
			if(statusAffects.has("Blind") && rand(3) < 2) {
				Render.text("She's too blind to get anywhere near you.\n", false);
			}
			//Dodge
			else if(player.stats.spe - spe > 0 && int(Math.random()*(((player.stats.spe-spe)/4)+80)) > 80) {
				Render.text("Somehow, you manage to drag yourself out of the way.  She sighs and licks her lips.  \"<i>", false);
				temp = rand(4);
				if(temp == 0) Render.text("I just wanted to give my delicious morsel a kiss...</i>\"\n", false);
				else if(temp == 1) Render.text("Why won't you let me kiss you?</i>\"\n", false);
				else if(temp == 2) Render.text("Mmm, do you have to squirm so much, prey?</i>\"\n", false);
				else Render.text("Just look at my glossy, dripping lips.  Imagine how great it would feel to have them locked against you.  Why resist?</i>\"\n", false);
			}
			//Determine if evaded
			else if(player.perks.has("Evade") && rand(100) < 10) {
				Render.text("Somehow, you manage to evade her lusty attack.  She sighs and licks her lips.  \"<i>", false);
				temp = rand(4);
				if(temp == 0) Render.text("I just wanted to give my delicious morsel a kiss...</i>\"\n", false);
				else if(temp == 1) Render.text("Why won't you let me kiss you?</i>\"\n", false);
				else if(temp == 2) Render.text("Mmm, do you have to squirm so much, prey?</i>\"\n", false);
				else Render.text("Just look at my glossy, dripping lips.  Imagine how great it would feel to have them locked against you.  Why resist?</i>\"\n", false);
			}
			//("Misdirection"
			else if(player.perks.has("Misdirection") && rand(100) < 10 && player.armorName == "red, high-society bodysuit") {
				Render.text("You manage to misdirect her lusty attack, avoiding it at the last second.  She sighs and licks her lips.  \"<i>", false);
				temp = rand(4);
				if(temp == 0) Render.text("I just wanted to give my delicious morsel a kiss...</i>\"\n", false);
				else if(temp == 1) Render.text("Why won't you let me kiss you?</i>\"\n", false);
				else if(temp == 2) Render.text("Mmm, do you have to squirm so much, prey?</i>\"\n", false);
				else Render.text("Just look at my glossy, dripping lips.  Imagine how great it would feel to have them locked against you.  Why resist?</i>\"\n", false);
			}
			//Determine if cat'ed
			else if(player.perks.has("Flexibility") && rand(100) < 6) {
				Render.text("You manage to twist your cat-like body out of the way at the last second, avoiding it at the last second.  She sighs and licks her lips.  \"<i>", false);
				temp = rand(4);
				if(temp == 0) Render.text("I just wanted to give my delicious morsel a kiss...</i>\"\n", false);
				else if(temp == 1) Render.text("Why won't you let me kiss you?</i>\"\n", false);
				else if(temp == 2) Render.text("Mmm, do you have to squirm so much, prey?</i>\"\n", false);
				else Render.text("Just look at my glossy, dripping lips.  Imagine how great it would feel to have them locked against you.  Why resist?</i>\"\n", false);
			}
			
			else if(player.findStatusAffect(StatusAffects.DriderKiss) < 0) {
				//(HIT? + 10 lust)
				game.dynStats("lus", 10);
				Render.text("Before you can move, she's right on top of you, leaning ", false);
				if(player.tallness < 72) Render.text("down", false);
				else Render.text("over", false);
				Render.text(" to plant a sloppy, wet kiss upon your lips.  Her glossy lip-venom oozes everywhere, dribbling down your collective chins and sliding into your mouth.  You shudder, trying to resist, but your tongue betrays you.  It slides between her moist, puffy entrance, lapping at her venom and making love to her tongue.", false);
				if(player.lust <= 99) Render.text("  Somehow, you work up the willpower to back away, but your body slowly begins to burn hotter and harder, afflicted with a slowly-building lust.", false);
				player.statusAffects.add(new StatusAffect("DriderKiss",0,0,0,0)));
			}
			//Get hit 2nd time) 
			else {
				player.addStatusValue(StatusAffects.DriderKiss,1,1);
				if(player.statusAffects.get("DriderKiss").value1 == 1) {
					//(HIT? + 15 lust)
					game.dynStats("lus", 15);
					Render.text("Again, the drider ties your mouth up in her syrupy lip-lock, seeming to bind your mouth as effectively as her webs bind your body.  Her sweet venom bubbles and froths at the corners of the oral embrace, dripping over her many-breasted bosom and your " + player.chestDesc() + ".", false);
					if(player.lowerBody.cockSpot.hasCock()) Render.text("  " + SMultiCockDesc() + " spews a rope of pre-cum into your " + player.armorName + ", desperate to get out and fuck.", false);
					if(player.lowerBody.vaginaSpot.hasVagina()) Render.text("  Fem-cum dribbles down your " + player.legs() + " while your " + player.clitDescript() + " gets so hard you think it'll explode.", false);
					Render.text("  This time, the drider is the one to break the kiss.  She asks, \"<i>Are you ready, my horny little morsel?</i>\"\n", false);
					if(player.lust <= 99) Render.text("You shake your head 'no' and stand your ground!\n", false);
				}
				//(Get hit 3rd+ time)
				else {
					Render.text("This time you barely move.  Your body is too entranced by the idea of another venom-laced kiss to resist.  Glorious purple goo washes into your mouth as her lips meet yours, sealing tight but letting your tongue enter her mouth to swirl around and feel the venom drip from her fangs.  It's heavenly!  Your " + player.skin() + " grows hot and tingly, and you ache to be touched so badly.  Your " + nippleDescript(0) + "s feel hard enough to cut glass, and a growing part of you admits that you'd love to feel the drider's chitinous fingers pulling on them.", false);
					//(HIT? + 20 lust)
					game.dynStats("lus", 20);
					if(player.lowerBody.cockSpot.hasCock() || player.lowerBody.vaginaSpot.hasVagina()) {
						Render.text("  The moisture in your crotch only gets worse.  At this point, a ", false);
						if(player.wetness() < 3 && player.cumQ() < 200) Render.text("small", false);
						else if(player.wetness() < 5 && player.cumQ() < 500) Render.text("large", false);
						else Render.text("massive", false);
						Render.text(" wet stain that reeks of your sheer sexual ache has formed in your " + player.armorName + ".", false);
						if(player.lust <= 99) Render.text("  Amazingly, you resist her and pull back, panting for breath.", false);
					}
				}
			}
			combatRoundOver();
		}
		
		public driderMasturbate():void {
			//-Masturbate - (Lowers lust by 50, raises PC lust)
			lust -= 30;
			game.dynStats("lus", (10+player.stats.lib/20));
			Render.text("The spider-woman skitters back and gives you a lusty, hungry expression.  She shudders and moans, \"<i>Mmm, just watch what you're missing out on...</i>\"\n\n", false);
			Render.text("As soon as she finishes, her large clit puffs up, balloon-like.  A second later, it slides forward, revealing nine inches of glossy, girl-spunk-soaked shaft.  Nodules ring the corrupted penis' surface, while the tiny cum-slit perched atop the tip dribbles heavy flows of pre-cum.  She pumps at the fleshy organ while her other hand paws at her jiggling breasts, tugging on the hard ", false);
			if(nipplesPierced > 0) Render.text("pierced ", false);
			Render.text("nipple-flesh.  Arching her back in a lurid pose, she cries out in high-pitched bliss, her cock pulsing in her hand and erupting out a stream of seed that lands in front of her.\n\n", false);
			
			Render.text("The display utterly distracts you until it finishes, and as you adopt your combat pose once more, you find your own needs harder to ignore, while hers seem to be sated, for now.\n", false);
			combatRoundOver();
		}

		override protected performCombatAction():void
		{
			game.spriteSelect(77);
			if (lust > 70 && rand(4) == 0) driderMasturbate();
			//1/4 chance of silence if pc knows spells
			else if (game.hasSpells() && player.findStatusAffect(StatusAffects.WebSilence) < 0 && rand(4) == 0) {
				spiderSilence();
			}
			//1/4 chance of disarm
			else if (player.findStatusAffect(StatusAffects.Disarmed) < 0 && player.weaponName != "fists" && rand(4) == 0) {
				spiderDisarm();
			}
			//Always web unless already webbed
			else if (player.stats.spe >= 2 && (player.findStatusAffect(StatusAffects.Web) < 0 || rand(2) == 0)) {
				spiderMorphWebAttack();
			}
			//Kiss!
			else driderKiss();
		}

		public defeated(hpVictory:boolean):void
		{
			game.swamp.corruptedDriderScene.defeatDriderIntro();
		}

		public won(hpVictory:boolean, pcCameWorms:boolean):void
		{
			if (pcCameWorms){
				Render.text("\n\nThe drider licks her lips in anticipation...");
				doNext(game.endLustLoss);
			} else {
				game.swamp.corruptedDriderScene.loseToDrider();
			}
		}

		public CorruptedDrider()
		{

			let hairColor:string = randomChoice("red", "orange", "green");
			let skinTone:string = randomChoice("yellow", "purple", "red", "turquoise");

			let pierced:boolean = rand(2)==0;
			this.a = "the ";
			this.short = "corrupted drider";
			this.imageName = "corrupteddrider";
			this.long = "This particular spider-woman is a drider - a creature with a humanoid top half and the lower body of a giant arachnid.  From a quick glance, you can tell that this one has fallen deeply to corruption.  She is utterly nude, exposing her four well-rounded, D-cup breasts with their shiny black nipples.  "+(pierced?"Gold piercings and chains link the curvy tits together, crossing in front of her four mounds in an 'x' pattern.  ":"")+"On her face and forehead, a quartet of lust-filled, " + skinTone + " eyes gaze back at you.  Behind her, the monster-girl's " + hairColor + " hair drapes down her back like a cloak.  The drider's lips seem to shine with a light all their own, and a steady trickle of purple, reflective fluid beads and drips from them.  At her waist, there's a juicy looking snatch with a large, highly visible clit.  From time to time it pulsates and grows, turning part-way into a demon-dick.  Her spider-half has eight spindly legs with black and " + hairColor + " stripes - a menacing display if ever you've seen one.";
			// this.plural = false;
			this.createCock(9,2,CockType.DEMON);
			this.createVagina(false, VAGINA_WETNESS.DROOLING, VAGINA_LOOSENESS.GAPING);
			this.statusAffects.add(new StatusAffect("BonusVCapacity", 70, 0, 0, 0)));
			createBreastRow(Appearance.breastCupInverse("DD"));
			this.ass.analLooseness = ANAL_LOOSENESS.TIGHT;
			this.ass.analWetness = ANAL_WETNESS.DRY;
			this.statusAffects.add(new StatusAffect("BonusACapacity",70,0,0,0)));
			this.tallness = 10*12;
			this.hipRating = HIP_RATING.CURVY+2;
			this.buttRating = BUTT_RATING.LARGE+1;
			this.lowerBody = LOWER_BODY.DRIDER_LOWER_BODY;
			this.skinTone = skinTone;
			this.skinType = SKIN.PLAIN;
			//this.skinDesc = Appearance.Appearance.DEFAULT_SKIN.DESCS[SKIN.PLAIN];
			this.hairColor = hairColor;
			this.hairLength = 24;
			initStrTouSpeInte(100, 50, 70, 100);
			initLibSensCor(80, 50, 90);
			this.weaponName = "claws";
			this.weaponVerb="claw";
			this.weaponAttack = 30;
			this.armorName = "carapace";
			this.armorDef = 55;
			this.armorPerk = "";
			this.armorValue = 70;
			if (pierced) {
				this.nipplesPierced = 1;
				this.bonusHP = 325;
				this.lust = 35;
				this.lustVuln = .25;
				this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
				this.level = 15;
				this.gems = rand(10) + 30;
			} else {
				this.bonusHP = 250;
				this.lust = 30;
				this.lustVuln = .4;
				this.temperment = TEMPERMENT_RANDOM_GRAPPLES;
				this.level = 14;
				this.gems = rand(10) + 20;
			}
			this.drop = new WeightedDrop().add(consumables.B_GOSSR,5)
					.add(useables.T_SSILK,1)
					.add(null,4);
			checkMonster();
		}

	}

}