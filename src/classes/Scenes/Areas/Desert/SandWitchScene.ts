﻿package classes.Scenes.Areas.Desert {
	import classes.*;
	import classes.GlobalFlags.FlagEnum;
	import classes.GlobalFlags.kGAMECLASS;

	public class SandWitchScene extends BaseContent implements TimeAwareInterface {

//const EGG_WITCH_TYPE: number = 589;
//const EGG_WITCH_COUNTER: number = 588;

		public let pregnancy:PregnancyType;

		public SandWitchScene()
		{
			pregnancy = new PregnancyType(FlagEnum.EGG_WITCH_TYPE, FlagEnum.EGG_WITCH_COUNTER, 0, 0);
			pregnancy.addPregnancyEventSet(PregnancyType.BEE_EGGS, 96);
												//Event: 0 (= not pregnant), 1, 2 (< 96)
			pregnancy.addPregnancyEventSet(PregnancyType.DRIDER_EGGS, 96);
												//Event: 0 (= not pregnant), 1, 2 (< 96)
			CoC.timeAwareClassAdd(this);
		}

		//Implementation of TimeAwareInterface
		public timeChange():boolean
		{
			pregnancy.pregnancyAdvance();
			trace("\nSand Witch time change: Time is " + model.time.hours + ", incubation: " + pregnancy.incubation + ", event: " + pregnancy.event);
			if (pregnancy.isPregnant && pregnancy.incubation == 0) pregnancy.knockUpForce(); //Silently clear the Sand Witch's pregnancy if the player has not met her in time
			return false;
		}
	
		public timeChangeLarge():boolean {
			return false;
		}
		//End of Interface Implementation
		
		public encounter():void {
			spriteSelect(50);
			clearOutput();
			Render.text("A strange woman seems to appear from the dunes themselves.  She identifies herself as a sand witch, and politely asks if she can cast a spell on you.");
			if (player.statusAffects.get("Exgartuan").value1 == 1 && player.cockArea(0) > 100 && player.statusAffects.get("Exgartuan").value2 == 0) {
				Render.text("\n\nThe " + player.armorName + " covering your lower half hits the ground, as if yanked down by magic.  Your " + cockDescript(0) + " pulsates darkly, growing rigid in seconds as the demon within you takes over.  It barks, \"<i>Fuck, how about I cast my spell on you baby?</i>\"\n\n");
				Render.text("The sandwitch ");
				if (player.stats.cor < 50)
					Render.text("and you both turn crimson", false);
				else Render.text("turns crimson", false);
				Render.text(" as you yank your " + player.armorName + " back into place.  You're in charge here, not some possessed appendage!   Exgartuan yells something snide, but it's muffled too much to understand.  You look up in time to sidestep an attack from the Sand Witch.  It looks like you'll have to fight her!");
				startCombat(new SandWitch());
			}
			else doYesNo(allowSandWitchMagic, refuseSandWitchMagic);
		}
		
		private allowSandWitchMagic():void {
			spriteSelect(50);
			clearOutput();
			if (player.hairColor == "sandy blonde") {
				Render.text("She smiles wickedly and intones, \"<i>Tresed eht retaw llahs klim ruoy.</i>\"\n\n", false);
				if (player.upperBody.chest.count() == 0 || player.upperBody.chest.BreastRatingLargest[0].breastRating == 0) {
					Render.text("You grow a perfectly rounded pair of C-cup breasts!  ", false);
					if (player.upperBody.chest.count() == 0) player.createBreastRow();
					player.upperBody.chest.list[0].breasts = 2;
					player.upperBody.chest.list[0].breastRating = 3;
					if (player.upperBody.chest.list[0].nipplesPerBreast < 1) player.upperBody.chest.list[0].nipplesPerBreast = 1;
					dynStats("sen", 2, "lus", 1);
				}
				if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 1 && player.upperBody.chest.BreastRatingLargest[0].breastRating <= 2) {
					Render.text("Your breasts suddenly balloon outwards, stopping as they reach a perfectly rounded C-cup.  ", false);
					player.upperBody.chest.list[0].breastRating = 3;
					dynStats("sen", 1, "lus", 1);
				}
				if (player.upperBody.chest.list[0].nipplesPerBreast < 1) {
					Render.text("Two dark spots appear on your chest, rapidly forming into sensitive nipples.  ", false);
					player.upperBody.chest.list[0].nipplesPerBreast = 1;
					dynStats("sen", 2, "lus", 1);
				}
				if (player.biggestLactation() > 0) {
					Render.text("A strong pressure builds in your chest, painful in its intensity.  You yank down your top as ", false);
					if (player.biggestLactation() < 2)
						Render.text("powerful jets of milk spray from your nipples, spraying thick streams over the desert sands.  You moan at the sensation and squeeze your tits, hosing down the tainted earth with an offering of your milk.  You blush as the milk ends, quite embarassed with your increased milk production.  ", false);
					if (player.biggestLactation() >= 2 && player.biggestLactation() <= 2.6)
						Render.text("eruptions of milk squirt from your nipples, hosing thick streams everywhere.  The feeling of the constant gush of fluids is very erotic, and you feel yourself getting more and more turned on.  You start squeezing your breasts as the flow diminishes, anxious to continue the pleasure, but eventually all good things come to an end.  ", false);
					if (player.biggestLactation() > 2.6 && player.biggestLactation() < 3)
						Render.text("thick hoses of milk erupt from  your aching nipples, forming puddles in the sand.  You smile at how well you're feeding the desert, your milk coating the sand faster than it can be absorbed.  The constant lactation is pleasurable... in a highly erotic way, and you find yourself moaning and pulling on your nipples, totally outside of your control.  In time you realize the milk has stopped, and even had time to soak into the sands.  You wonder at your strange thoughts and pull your hands from your sensitive nipples.  ", false);
					if (player.biggestLactation() >= 3)
						Render.text("you drop to your knees and grab your nipples.  With a very sexual moan you begin milking yourself, hosing out huge quantities of milk.  You pant and grunt, offering as much of your milk as you can.  It cascades down the dune in a small stream, and you can't help but blush with pride... and lust.  The erotic pleasures build as you do your best to feed the desert of all your milk.  You ride the edge of orgasm for an eternity, milk everywhere.  When you come to, you realize you're kneeling there, tugging your dry nipples.  Embarrassed, you stop, but your arousal remains.  ", false);
					if (player.biggestLactation() < 3) {
						player.boostLactation(.75);
						Render.text("Your breasts feel fuller... riper... like your next milking could be even bigger.  ", false);
					}
					dynStats("lib", 1, "sen", 4, "lus", 15);
				}
				if (player.biggestLactation() == 0) {
					Render.text("A pleasurable release suddenly erupts from your nipples!  Streams of milk are spraying from your breasts, soaking into the sand immediately.  It stops all too soon, though the witch assures you that you can lactate quite often now.  ", false);
					player.boostLactation(1);
					dynStats("lib", .5, "sen", 1, "lus", 10);
				}
				Render.text("The sand-witch smiles and thanks you for your offering.  You notice her dress is damp in four spots on the front.  ", false);
				if (getGame().sand == 0)
					Render.text("You wonder at what her robes conceal as she vanishes into the dunes.", false);
				if (getGame().sand == 1) {
					if (player.stats.cor <= 33)
						Render.text("You are glad to avoid servicing her again as she vanishes into the dunes.", false);
					else if (player.stats.cor <= 66)
						Render.text("You wonder if you should've resisted and tried for some sex as she departs.", false);
					else Render.text("You wish you had said no, so you could fuck with her and her magnificent quartet of breasts some more.", false);
				}
			}
			else
			{
				Render.text("She smiles wickedly and intones, \"<i>nuf erutuf rof riah ydnas, nus tresed eht sa ydnas.</i>\"\n\nYou feel a tingling in your scalp, and realize your hair has become a sandy blonde!", false);
				player.hairColor = "sandy blonde";
			}
			doNext(camp.returnToCampUseOneHour);
		}
		
		private refuseSandWitchMagic():void {
			spriteSelect(50);
			clearOutput();
			Render.text("With an inarticulate scream of rage, the Sand Witch attacks!");
			startCombat(new SandWitch());
		}
		
internal function sandwitchRape():void {
	spriteSelect(50);
	player.clearStatuses(false);
	//LUST DEFEAT
	if(player.lust > 99) {
		//BAD END START
		if(player.upperBody.chest.BreastRatingLargest[0].breastRating >= 9 && player.biggestLactation() >= 3 && player.stats.cor >= 25) {
			Render.text("Overwhelmed by the intense pleasure caused by the vibrating sphere inside your body, you fall to your knees.\n\nYou whimper pathetically, desperate to cum, as the Sand Witch steps nearer to you and gently strokes your face. She smiles cruelly and lets her hands drop down to your chest, then tears your top away, letting your huge breasts bounce free. The mysterious woman firmly rubs and kneads them, making you gasp and writhe, until she starts lightly flicking your painfully hard nipples. You edge closer and closer to orgasm, panting like a whore while the witch teases you with her hands and magic.\n\n", true);
			Render.text("Just before you cum, she leans down to whisper to you, tickling your ear with her warm breath: \"<i>Evals klim ym emoceb llahs uoy.</i>\"\n\nA familiar pressure builds in your chest, but it's far stronger than ever before. You feel your breasts swell rapidly, and milk sprays from your nipples, splattering you and the witch with white droplets. Your eyes roll back and your tongue hangs out as you cum, mind nearly breaking from the world-shattering orgasm that thunders through you.\n\nYou black out.", false);
			doNext(sandWitchBadEnd);
			return;
		}
		player.orgasm();
		Render.text("Your wobbly legs give out underneath you as your body's will to fight evaporates.\n\n", true);
		if(player.hairColor.indexOf("sandy blonde") != -1) {
			Render.text("The Sand Witch smiles wickedly and intones, \"<i>Tresed eht retaw llahs klim ruoy.</i>\"\n\n", false); 
			if(player.upperBody.chest.count() == 0 || player.upperBody.chest.BreastRatingLargest[0].breastRating == 0) {
				Render.text("You grow a perfectly rounded pair of C-cup breasts!  ", false);
				if(player.upperBody.chest.count() == 0) player.createBreastRow();
				player.upperBody.chest.list[0].breasts = 2;
				player.upperBody.chest.list[0].breastRating = 3;
				if(player.upperBody.chest.list[0].nipplesPerBreast < 1) player.upperBody.chest.list[0].nipplesPerBreast = 1;
				dynStats("sen", 2, "lus", 1);
			}
			if(player.upperBody.chest.BreastRatingLargest[0].breastRating > 0 && player.upperBody.chest.BreastRatingLargest[0].breastRating < 3) {
				Render.text("Your breasts suddenly balloon outwards, stopping as they reach a perfectly rounded C-cup.  ", false);
				player.upperBody.chest.list[0].breastRating = 3;
				dynStats("sen", 1, "lus", 1);
			}
			if(player.averageNipplesPerBreast() < 1) {
				Render.text("A dark spot appears on each breast, rapidly forming into a sensitive nipple.  ", false);
				temp = player.upperBody.chest.count();
				while(temp > 0) {
					temp--;
					//If that breast didnt have nipples reset length
					if(player.upperBody.chest.list[0].nipplesPerBreast < 1) player.upperBody.chest.list[0].nippleLength = .2;
					player.upperBody.chest.list[0].nipplesPerBreast = 1;
				}
				dynStats("sen", 2, "lus", 1);
			}
			if(player.biggestLactation() > 0) {
				Render.text("A strong pressure builds in your chest, painful in its intensity.  You yank down your top as ", false);
				if(player.biggestLactation() < 2) Render.text("powerful jets of milk spray from your nipples, spraying thick streams over the desert sands.  You moan at the sensation and squeeze your tits, hosing down the tainted earth with an offering of your milk.  You blush as the milk ends, quite embarassed with your increased milk production.  ", false);
				if(player.biggestLactation() >=2 && player.biggestLactation() <=2.6) Render.text("eruptions of milk squirt from your nipples, hosing thick streams everywhere.  The feeling of the constant gush of fluids is very erotic, and you feel yourself getting more and more turned on.  You start squeezing your breasts as the flow diminishes, anxious to continue the pleasure, but eventually all good things come to an end.  ", false);
				if(player.biggestLactation() > 2.6 && player.biggestLactation() < 3) Render.text("thick hoses of milk erupt from your aching nipples, forming puddles in the sand.  You smile at how well you're feeding the desert, your milk coating the sand faster than it can be absorbed.  The constant lactation is pleasurable... in a highly erotic way, and you find yourself moaning and pulling on your nipples, totally outside of your control.  In time you realize the milk has stopped, and even had time to soak into the sands.  You wonder at your strange thoughts and pull your hands from your sensitive nipples.  ", false);

				if(player.biggestLactation() >= 3) Render.text("you drop to your knees and grab your nipples.  With a very sexual moan you begin milking yourself, hosing out huge quantities of milk.  You pant and grunt, offering as much of your milk as you can.  It cascades down the dune in a small stream, and you can't help but blush with pride... and lust.  The erotic pleasures build as you do your best to feed the desert all of your milk.  You ride the edge of orgasm for an eternity, milk everywhere.  When you come to, you realize you're kneeling there, tugging your dry nipples.  Embarrassed, you stop, but your arousal remains.  ", false);
				if(player.biggestLactation() < 3) {
					player.boostLactation(.7);
					Render.text("Your breasts feel fuller... riper... like your next milking could be even bigger.  ", false);
				}
				dynStats("lib", 1, "sen", 4, "lus", 15);
			}
			if(player.biggestLactation() == 0) {
				Render.text("A pleasurable release suddenly erupts from your nipples!  Twin streams of milk are spraying from your breasts, soaking into the sand immediately.  It stops all too soon, though the witch assures you that you can lactate quite often now.  ", false);
				player.boostLactation(1);
				dynStats("lib", .5, "sen", 1, "lus", 10);
			}
			Render.text("\n\nThe witch whispers into your ear, \"<i>I ALWAYS get what I want, dear...</i>\"", false);
		}
		else {
			Render.text("The Sand Witch smiles wickedly and intones, \"<i>nuf erutuf rof riah ydnas, nus tresed eht sa ydnas.</i>\"\n\nYou feel a tingling in your scalp, and realize your hair has become a sandy blonde!", false);
			player.hairColor = "sandy blonde";
			Render.text("\n\nThe witch whispers into your ear, \"<i>I ALWAYS get what I want, dear...</i>\"", false);
		}
		//RAEP
		Render.text("  You hear the soft impact of her robe upon the sands and cannot resist a peek at your captor.  You turn to behold a curvy, dark-skinned beauty, whose form is dominated by a quartet of lactating breasts.  Somewhere in your lust fogged mind you register the top two as something close to double-D's, and her lower pair to be about C's.  She smiles and leans over you, pushing you to the ground violently.\n\nShe turns over you and drops down, planting her slick honey-pot firmly against your mouth.  Her scent is strong, overpowering in its intensity.  Your tongue darts out for a taste and finds a treasure trove of sticky sweetness.  Instinctively you tongue-fuck her, greedily devouring her cunny-juice, shoving your tongue in as far as possible before suckling at her clit.  Dimly you feel the milk spattering over you, splashing off you and into the warm desert sands.  Everywhere the milk touches feels silky smooth and sensitive, and your hands begin stroking your body, rubbing it in as the witch sprays more and more of it.  You lose track of time, orgasming many times, slick and sticky with sexual fluids.", false);
		player.slimeFeed();
		dynStats("lib", 1, "sen", 5);
		if(kGAMECLASS.sand == 0) kGAMECLASS.sand = 1;
		cleanupAfterCombat();
	}
	//HP DEFEAT
	else { 
		if(player.upperBody.chest.BreastRatingLargest[0].breastRating >= 9 && player.biggestLactation() >= 3 && player.stats.cor >= 25) {
			Render.text("You stagger and fall to one knee, too overcome by pain to keep fighting.\n\nAs your vision wavers with exhaustion, the witch strides towards you, seeming to glide across the sand. Your consciousness starts to fade, and you see the exotic woman lick her lips and smile cruelly, staring at your generous breasts.\n\nThe last thing you hear before passing out is a mysterious spell, murmured right into your ear in a low, throaty whisper: \"<i>Evals klim ym emoceb llahs uoy.</i>\"\n\nYou dream of walking proudly through the desert, enormous rack jiggling shamelessly with every step, and of tempting nubile young champions to wrap their lips around your nipples and drink. Your sleep becomes fevered as your dreams grow more and more corrupt - you dream of using dark magic to lactate succubus milk, and of your former friends from Ingnam greedily drinking your enhanced milk until their bellies strain to contain it all, then going wide-eyed as pound after pound of breast-flesh suddenly swells upon their chests...", true);
			//BAD END.
			doNext(sandWitchBadEnd);
			return;
		}				
		Render.text("\n<b>You fall, defeated by the Sand Witch!</b>\n\n", false);
		cleanupAfterCombat();
	}
}

private sandWitchBadEnd():void {
	clearOutput();
	Render.text("You awaken in a candlelit stone shrine of some sort, resting naked and facedown on some warm, comfortable body pillows. Remembering your fight against the witch, you hurriedly try to get up, only to gasp with surprise when a painful weight pulls on your chest. Glancing down to find the source of the weight, you blink with shock, then fight rising panic – the \"pillows\" that you are lying on are your own breasts, swollen to such a size that you cannot possibly lift them!\n\n");
	Render.text("\"<i>Hello, my beautiful pet,</i>\" says a familiar voice. Looking to your front – and trying not to notice the vast expanse of cleavage that dominates the lower half of your vision – you see the Sand Witch sitting, nude, in a large granite basin set into the floor just in front of you. She smirks when she sees how your eyes avoid resting on your obscenely massive bust.\n\n");
	Render.text("\"<i>What's wrong? Don't you like them?</i>\" The witch leans toward you and roughly tugs on one huge nipple, causing you to yelp with surprise and pleasure. \"<i>I'm afraid that's too bad. You offered yourself to me, and now you are mine, all mine, forever.</i>\" She slowly rubs her hands over your colossal bosom, crooning with approval as you squirm and bite your lip. \"<i>Mmm, yes... first, you will give me a bath.</i>\"\n\nYou hardly have time to wonder what she means before a familiar, hugely intense pressure builds in your chest...");
	doNext(sandWitchBadEndPartTwo);
}

private sandWitchBadEndPartTwo():void {
	clearOutput();
	Render.text("With an audible gurgling noise, your breasts begin to fill with prodigious quantities of milk. Your eyes widen in amazement when you feel your tits swelling, filling, pumping up to their limits. It feels shockingly pleasurable and somehow almost right, like you were meant to have these shamefully huge, milk-filled titties. As you watch the soft flesh stretch taut, your breasts fatten into a very round shape beneath you, and the pleasurable sensation becomes a painful feeling of urgency.\n\n");
	Render.text("For a moment nothing happens, and you are surprised that your nipples are not leaking milk. The Sand Witch smiles at you, leaning to rest her arms and chin on your overstressed tits, and speaks: \"<i>Ask to be milked, slave.</i>\" Appalled, you shake your head, then grit your teeth and moan as you realize that the pressure in your chest is still building up, becoming unbearably painful. The witch patiently repeats herself, staring directly into your eyes, and you are struck by the awful knowledge that you are likely to be trapped here forever.");
	doNext(sandWitchBadEndPartThree);
}

private sandWitchBadEndPartThree():void {
	clearOutput();
	Render.text("Something breaks within your soul, accompanied by a strangled sob. Tears of humiliation trickle down your face as you part your quivering lips. \"<i>Please milk me, Mistress. Your slave needs to be milked.</i>\"\n\n");
	if (player.perks.has("MarblesMilk")) {
		Render.text("No sooner have you spoken before a torrent of milk spurts from each of your nipples, but the effect isn't as pleasurable as it used to be; in fact you're starting to feel very weak.  The Sand Witch looks at you in confusion as the stream of milk from your massive breasts quickly slows and your breasts start to shrivel up.\n\n");
		Render.text("Trying to figure out why you feel so incredibly weak, you think back on what might have caused this.  When was the last time you had some of Marble's milk?  Feeling your body start to wither away, the realization hits you.  You chuckle softly at your captor as the world starts to go dark; looks like you'll be the one to have the last laugh...\n\n");
		Render.text("The last thing you hear is the Sand Witch screaming \"<i>What the hell is going on?  I ALWAYS get what I want!</i>\"");
	}
	else {
		Render.text("No sooner have you spoken than a huge torrent of milk spurts from each of your nipples. Between the sudden alleviation of your pain and the sensitivity of your nipples, you orgasm almost instantly with a huge groan of relief. When you can focus your eyes again, you see that the Sand Witch... your new Mistress... is bathing languidly in the basin, relaxing in a pool of your fresh breastmilk.\n\n");
		Render.text("The dusky-skinned witch catches your eye and smiles, this time more warmly than before. \"<i>See? You'll enjoy yourself more if you obey your Mistress. After all, I <b>ALWAYS</b> get what I want...</i>\"\n\nAs much as you hate to admit it, you realize that she's right. You're trapped here on top of your bloated bust, at the mercy of this perverse spellcaster. She has all the time in the world to train you, and between the pain of overfilled breasts and the orgasmic joy of being drained, it won't take her long to turn you into a perfectly obedient, even eager, milk-slave...");
	}
	getGame().gameOver();
}

//Sandwitch gets raped
private sandwitchRaped():void {
	spriteSelect(50);
	Render.text("", true);
	if(player.lowerBody == LOWER_BODY.CENTAUR) {
		doNext(camp.returnToCampUseOneHour);
		sandwitchCentaurBoning();
		cleanupAfterCombat();
		return;
	}
	Render.text("Even as you rip her sand-colored robes from her body, her eyes hold power and defiance. Her chest holds four large breasts, each leaking milk upon the sands.  ", false); 
	//Malllllleeeee (or has penis)
	if(player.gender == 1 || player.gender == 3) {
		//Not so corrupt
		if(player.stats.cor < 50) {
			Render.text("You smile at the sand witch, trying to seem enticing. A tiny smile plays across her face even though she supports a worried frown. She reaches up to you, and you allow her to gently pull you down to her. You marvel at her multiple breasts, each perfectly rounded. Each has a nipple approximately two inches long, enough to suck if you wanted to.  ", false);
			Render.text("Your attention wanders down to the damp sand underneath her legs, and her musky scent hits your nose. Which do you go after?\n\n", false);
			simpleChoices("Breasts", sandwitchBewbs, "Sex", sandwitchSex, "", null, "", null, "", null);
		}
		//Really corrupt
		else 
		{
			//Single cock
			if(player.lowerBody.cockSpot.count() == 1) {
				//DOGGIES
				if(player.dogCocks() > 0 && player.lowerBody.cockSpot.list[0].knotMultiplier > 1.4) knotSandwitch();
				else {
					Render.text("You place your " + player.foot() + " in the wet sand, pulling her hair and making her look you in the eyes. The sand witch looks shocked at your display of power, only turning you on more. You undo your " + player.armorName + " and grope her nethers, only to find a surprise. She has " + num2Text(player.lowerBody.cockSpot.count() + 1) + " pussies and each seems to be made to fit you exactly. Pushing her to the ground, you bring the seeping head of your " + cockDescript(0) + " to one of her nethers, slowly easing into her depths.  ", false);
					Render.text("Thrusting deep, you hit bottom, and marvel at the sensations as you feel the head of your " + cockDescript(0) + " rub against the end of her slick cunts, only making you lust after her more. As though responding to your will, your " + cockDescript(0) + " grows just a tiny bit more in length and thickness.  ", false);
					Render.text("With a satisfied growl of lust from yourself, and a screech of pain from the sand witch, you break past her cervix and into her womb. Pulling out, you rub yourself against her wet outer lips, bringing yourself closer and closer to your peak as the sand witch struggles, her eyes turning wide with fright as she starts to understand you hold more power than her.  ", false);
					Render.text("With a bestial cry of lust, you shove your shaft deep within one of her vaginas, past her cervix and into her womb where you blast your potent, corrupted, demon-tainted seed.  ", false);
					Render.text("\n\nThe sand witch screams in savage denial as you plant your seed deep within her body, your corruption no doubt making it extra potent. You gaze into her eyes, reveling in her expression of horror. Without uttering a word, you continue to fuck her, making sure your seed is well-entrenched within her womb, feeling it splatter and bubble around your " + cockDescript(0) + ".  You wonder if she will remember the pleasure her body felt today, and if she will be more likely to drop to her knees before you than to fight... ", false);
					Render.text("Finally finished, you pull your " + cockDescript(0) + " from one of her well-used slits, your " + cockDescript(0) + " drooling cum even now. With a grin, you walk away, happy with your little encounter.  ", false);
					player.orgasm();
				}
			}
			//Multiprick
			if(player.lowerBody.cockSpot.count() > 1) {
				player.orgasm();
				if(rand(2) == 0) {
					rapeSandwitchMultis();
					return;
				}
				Render.text("Using the corruption in your blood, you place your " + player.foot() + " upon the budding shoots, and wipe them from existence. The sand witch looks shocked at your display of power, only turning you on more. You undo your loin cloth and grope her nethers, only to find a surprise. She has " + num2Text(player.lowerBody.cockSpot.count() + 1) + " loose wet cunts and each seems to be made to fit you exactly. Pushing her to the ground, you bring the seeping heads of your " + multiCockDescriptLight() + " to her nethers, slowly easing into her depths.  ", false);
				Render.text("Thrusting deep, you hit bottom, and marvel at the sensations as you feel the heads of your " + multiCockDescriptLight() + " rub against the end of her wet pussies, only making your desire to penetrate increase. As though responding to your will, your " + multiCockDescriptLight() + " grow just a tiny bit more in length and thickness.  ", false);
				Render.text("With a satisfied growl of lust from yourself, and a screech of pain from the sand witch, you break past her cervixes and into her wombs. Pulling the heads of your " + multiCockDescriptLight() + " from her wombs, you rub and rut at the outside of her cunts, bringing yourself closer and closer to your peak as the sand witch struggles, her eyes turning wide with fright as she starts to understand you hold more power than her.  ", false);
				Render.text("With a bestial cry of lust, you shove your shafts deep within her vaginas, past her cervices and into her womb where you blast your potent, corrupted, demon-tainted seed.  ", false);
				//A few dicks...
				Render.text("\n\nThe sand witch screams in savage denial as you plant your seed deep within her body, your corruption no doubt making it extra potent. You gaze into her eyes, reveling in her expression of horror. Without uttering a word, you continue to fuck her, making sure your seed is well-entrenched within her wombs, feeling it splatter and bubble around your " + multiCockDescriptLight() + ".  You wonder if she will remember the pleasure her body felt today, and if she will be more likely to drop to her knees before you than to fight... ", false);
				Render.text("Finally finished, you pull your " + multiCockDescriptLight() + " from her well used slits, your " + multiCockDescriptLight() + " drooling cum even now. With a grin, you walk away, happy with your little encounter.  ", false);
			}
			cleanupAfterCombat();
		}
	}
	//Femfem
	else {
		Render.text("You smile at the sand witch, trying to seem enticing. A tiny smile plays across her face even though she supports a worried frown. She reaches up to you, and you allow her to gently pull you down to her. You marvel at her multiple breasts, each perfectly rounded. Each has a nipple approximately two inches long, enough to suck if you wanted to.  ", false);
		Render.text("Your attention wanders down to the damp sand underneath her legs, and her musky scent hits your nose.\n\n", false);
		sandwitchBewbs();
	}
}

private sandwitchBewbs():void {
	spriteSelect(50);
	Render.text("", true);
	Render.text("You move yourself atop the defeated sand witch, and bring your lips to her breasts.  The moment the first drop of milk touches your tongue, you drink, hungrily, needfully, demandingly. You grope and massage her breasts as she leans back and cries out, her eyes wide in surprise. You guzzle and drink her sweet cream, the small seedlings underneath you appearing to rustle and move as you drink the alabaster flow once intended for the desert sands.  ", false);
	Render.text("Warmth fills your gluttonous belly, and the sand witch places a hand to your stomach, rubbing it lightly as you drink from her breasts, moving on when the one you're drinking from is drained.  ", false);
	Render.text("You burp, and flush scarlet, but the sand witch lays a hand against your face, leans close, and kisses your lips sweetly. Her tongue snakes out and dives into your mouth. She pulls your face against hers, grinding her breasts against your chest. You can feel fresh milk dribbling against your " + player.skinDesc + " and the scents are driving you wild with lust.  ", false);
	Render.text("She breaks the kiss and smiles at you, whispering. Your eyes slowly close as you grow drowsy; you realize too late that she's casting a spell. You fall asleep, the sand witch's milk in your stomach churning, gurgling.  ", false);
	Render.text("You wake up in the desert, immediately grabbing at your body to see if anything's changed...", false);
	player.slimeFeed();
	dynStats("lus", 25);
	cleanupAfterCombat();
	Render.text("\n", false);
}
private sandwitchSex():void {
	spriteSelect(50);
	Render.text("", true);
	Render.text("With a charming, disarming smile, you reach between her legs and touch against the slick lips of her pussies. She has ", false);
	if(player.lowerBody.cockSpot.count() > 1) Render.text(num2Text(player.lowerBody.cockSpot.count()), false);
	else Render.text("two", false);
	Render.text(" of them!  The sand witch appears frightened, but as you gently tease her lips with your fingers, she slowly starts to breathe faster, starting to moan as her legs spread themselves against her better judgment. Grinning in satisfaction, you bring your rigid " + cockDescript(0) + " against her lips, and push slowly, gently.  ", false);
	Render.text("The sand witch cries out, her hands grabbing your arms, pressing hard against your " + player.skinDesc + " as you slowly and teasingly ease your " + cockDescript(0) + " into her tight depths. You almost feel like a virgin, your " + cockDescript(0) + " throbbing, the need to cum almost beyond your ability to control.  ", false);
	Render.text("You rest against her chest, her large breasts squirting milk against your own chest as your weight appears to excite her enough to make her lactate, if what you're doing already wasn't enough.  ", false);
	Render.text("You kiss the sand witch, getting accustomed to her unbelievable tightness. You hump backwards and forwards, grinning like a fool with his first girlfriend. Not even a succubus would be able to rival her lush depths.  ", false);
	Render.text("You finally get serious and ease yourself into fucking the sand witch, slowly gaining speed and depth as your groins slap together with such ferocity that a normal person would be bruised upon their next waking. You pound the sand witch, making her scream in ecstasy, her already tight depths turning vice-like as you grunt your lust, cumming and filling her depths. Your ", false);
	if(player.lowerBody.balls >= 2) Render.text("balls ache and your ", false);
	Render.text(cockDescript(0) + " throbs with need, even as you empty your lust into the defeated sand witch.", false);
	Render.text("\n\nWith a satisfied smirk, you lay atop your prize, your " + cockDescript(0) + " still twitching within her depths. One of the sand witch's hands rubs at your head, teasing your " + player.skinDesc + ". Like a fresh youth, you fall asleep, " + cockDescript(0) + " buried deep in the sand witch.  ", false);
	Render.text("With a start you wake up, only to find the sand witch still passed out beside you.  Almost thinking it was a dream, you touch your groin tenderly and rub softly. There's a faint trace of soreness, and you remember the ferocity with which you mashed your pelvises together.  You get up and get ready.  ", false);
	player.orgasm();
	cleanupAfterCombat();
}
/*
Event: Centaur-SWitch: Player Raping
Definition: Tentacle Cock: very long (smallest 2+ feet) */
private sandwitchCentaurBoning():void {
	spriteSelect(50);
	player.orgasm();
	Render.text("The Sand Witch is panting before you, her clothes in disarray ", false);
	//[win via HP]
	if(monster.HP < 1) Render.text("and torn in many places. ", false);
	//[win via lust]
	else Render.text("and her fingers squeezing her nipples as lust overwhelms her. ", false);
	//[has breasts]
	if(player.upperBody.chest.BreastRatingLargest[0].breastRating > 3) {
		Render.text("As you approach, her eyes drift up to your " + player.allBreastsDescript() + " and she ", false);
		//[win via HP]
		if(monster.HP < 1) Render.text("is unable to stop herself from slowly licking her lips. ", false);
		//[win via lust]
		else Render.text("sensually licks her parted lips. ", false);
	}
	//[lactating]
	if(player.biggestLactation() > 1) {
		Render.text("Her eyes widen when she sees the beads of milk already dripping from your " + nippleDescript(0) + "s as her hand drops between her legs and she begins to slowly masturbate.", false);
	}
	Render.text("\n\n", false);
	//[Corruption < 70]
	if(player.stats.cor < 70) {
		Render.text("You smile as you approach", false);
		//[has breasts]
		if(player.upperBody.chest.BreastRatingLargest[0].breastRating > 0) Render.text("; your " + nippleDescript(0) + "s  become stiff", false);
		//[cock only]
		if(player.totalCocks() > 0 && !player.lowerBody.vaginaSpot.hasVagina()) Render.text(" and your " + cockDescript(0) + " hardens.", false);
		//[cunt only]
		if(player.lowerBody.vaginaSpot.hasVagina() && player.totalCocks() == 0) Render.text(" and your " + vaginaDescript(0) + " begins to drip with moisture.", false);
		//[cock and cunt]
		if(player.lowerBody.vaginaSpot.hasVagina() && player.totalCocks() > 0) Render.text(" and your " + cockDescript(0) + " hardens as your " + vaginaDescript(0) + " begins to drip with moisture.", false);
		if(player.gender == 0) Render.text(" her.", false);  
		Render.text(" She seems hesitant at first, but soon approaches and begins to run her hands along your stomach and your " + hipDescript(),false);
		//[has breasts]
		if(player.upperBody.chest.BreastRatingLargest[0].breastRating > 0) Render.text(", eyes fixed on your " + player.allBreastsDescript(), false);
		Render.text(".\n\n", false);
		//[GoTo: SW_3 and return] 
		if(SWCentaurMore(3)) return;
		Render.text("\n\n", false);
		Render.text("Delicate hands reach around to ", false);
		//[has breasts]
		if(player.upperBody.chest.BreastRatingLargest[0].breastRating > 0) Render.text("fondle your " + player.allBreastsDescript() + " and ", false);
		Render.text("tease your " + nippleDescript(0) + "s, and you can feel her grinding herself against your strong shoulders. ", false);
		//[orb penetrated player during combat] 
		Render.text("With a start you realize that the witch's orb is still inside you as it suddenly begins to pulse within your " + player.assholeOrPussy() + ", causing you to cry out and hasten your pace across the dunes. ", false);
		Render.text("You lose track of time and location as you ride, feeling her orgasm over and over against you, her milk pouring down your back and spilling onto the sands. ", false);
		//[has breasts]
		if(player.upperBody.chest.BreastRatingLargest[0].breastRating > 0) {
			//[lactating]
			if(player.biggestLactation() >= 1) {
				Render.text("Your own " + nippleDescript(0) + "s  are leaking as well, ", false);
				//[light-med lactation]
				if(player.biggestLactation() < 3) Render.text("small streams running out ", false);
				//[heavy lactation] 
				else Render.text("torrents gushing out ", false);
				Render.text("under her expert hands. ", false);
			}
		}
		Render.text("You can somehow feel her arousal pouring through her milk and into your skin, filling you with her own sensations and making your entire body vibrate like a sexual tuning fork.  As the sensations grow to be overwhelming, you feel yourself stumbling and slowing until you finally come to a stop. Panting, you listen to the sand witch's voice whispering sweet nothings into your ear... but the nothings seem to be having an effect.\n\n", false);
		//[GoTo: SW-1]
		if(SWCentaurMore(1)) return;
	}
	//[Corruption > 70]
	else {
		Render.text("When she sees the look on your face, the sand witch comes to her senses. Quickly gathering herself up, she tries to run in fear.  You grin and out-pace her easily, galloping around her and steering her in circles, occasionally knocking her over for fun.  When she starts to slow down, you grab her sand-colored robes and ", false);
		//[STR > 50]
		if(player.str >= 50) Render.text("easily tear them off of her. ", false);
		//[STR < 50]
		else Render.text("drag her a bit until they come off. ", false);
		Render.text("Underneath the robes is a beautiful body with a quartet of breasts, even now leaking milk down her chest and stomach.  The streams run over her abs and split as they pour down the cracks of her twin set of pussies.  Realizing she cannot outrun you, she finally turns and stands her ground, staring at you with a mixture of fear and anger that only serves to increase your lust.\n\n", false);
		//[GoTo: SW-2]
		if(SWCentaurMore(2)) return;
	}
}

private SWCentaurMore(argument:number):boolean {
	spriteSelect(50);
	//{ GoTo results }}
	//[SW_1]
	if(argument == 1) {
		Render.text("You realize too late that she has been casting a spell for the past few minutes. Before you can react, everything grows dark.", false);
		//[Whatever effect the witch has if the player wins, rapes her, and she gets to cast a spell] [end]
		//1 change
		player.orgasm();
		//Grow tits
		if(player.upperBody.chest.BreastRatingLargest[0].breastRating == 0) {
			Render.text("\n\n(You grow a perfectly rounded pair of C-cup breasts!)", false);
			if(player.upperBody.chest.count() == 0) player.createBreastRow();
			player.upperBody.chest.list[0].breasts = 2;
			player.upperBody.chest.list[0].breastRating = 3;
			if(player.upperBody.chest.list[0].nipplesPerBreast < 1) player.upperBody.chest.list[0].nipplesPerBreast = 1;
			dynStats("sen", 2, "lus", 1);
			return false;
		}
		//Grow tits bigger
		if(player.upperBody.chest.BreastRatingLargest[0].breastRating < 3) {
			Render.text("\n\n(Your breasts suddenly balloon outwards, stopping as they reach a perfectly rounded C-cup.)", false);
			player.upperBody.chest.list[0].breastRating = 3;
			dynStats("sen", 1, "lus", 1);
			return false;
		}
		if(player.biggestLactation() == 0) {
			Render.text("\n\n(Your breasts now lactate.)", false);
			player.boostLactation(1);
			dynStats("lib", .5, "sen", 1, "lus", 10);
			return false;
		}
		//Make lactation happen
		if(player.biggestLactation() < 3) {
			player.boostLactation(.7);
			Render.text("\n\n(Your breasts feel fuller... riper... milkier...)", false);
			return false;
		}
		//Libido boost if nothing else
		dynStats("lib", 4);
		Render.text("\n\n(Your libido has been boosted significantly by the Sand Witch's magic.)", false);
		return false;
	}
	//[SW_2: Split chances of occurrence between % categories as % are available]
	if(argument == 2) {
		//[% Player has cock(s)]
		if(player.lowerBody.cockSpot.count() > 0 || (player.gender == 3 && rand(2) == 0)) {
			Render.text("Finished with your games, pre-cum starts pooling under your throbbing " + cockDescript(0) + ". ", false);
			//[largest cock is wide]
			if(player.lowerBody.cockSpot.list[0].cockThickness >= 3) {
				if(player.hasKnot(0)) Render.text("Seeing its sheer size combined with your swollen knot causes her to gasp in terror and try to run again.  ", false);
				else Render.text("Seeing its sheer size causes her to gasp in fear and turn to run again.  ", false);
			}
			Render.text("You grab the witch and knock her down into the sand, quickly lowering your " + cockDescript(0) + " to be against her buttocks. ", false);
			//[1 cock, non-tentacle]
			if(player.lowerBody.cockSpot.count() == 1 && player.tentacleCocks() == 0) Render.text("With a single thrust, you push deep into one of her cunts, ", false);
			//[1 cock, tentacle]
			if(player.lowerBody.cockSpot.count() == 1 && player.tentacleCocks() == 1) Render.text("Your " + cockDescript(0) + " caresses her anus teasingly, causing her to whimper in a mixture of arousal and denial.  With a single savage thrust, you push past her clenched muscles, ", false);
			//[two cocks] 
			if(player.lowerBody.cockSpot.count() == 2) Render.text("After aligning your " + multiCockDescriptLight() + " to her twin cunts, you push yourself deeply into her, ", false);
			//[3+ cocks]
			if(player.lowerBody.cockSpot.count() >= 3) Render.text("Lining up two of your cocks to her twin cunts and another to her anus, you thrust into her without pre-amble.  Her anal muscles try to keep you out, but they are no match for the strength of your legs.  You tear into her, ", false);
			Render.text("eliciting a scream as your hind quarters push her forcefully over the sand. ", false);
			//[largest cock is wide] 
			if(player.lowerBody.cockSpot.list[0].cockThickness >= 3) {
				Render.text("It is hard to believe just how tight she is, though if her cries serve as any indication, she will not be after you are through with her.  Turned on even more, you thrust in with increasing vigor and try to widen her as much as possible. ", false);
			}
			//[2+ cocks]
			if(player.lowerBody.cockSpot.count() >= 2) {
				Render.text("The feeling of your " + multiCockDescriptLight() + " touching each other through the narrow layers of her body causes you to grunt in pleasure, experiencing the sensation anew during every thrust. ", false);
			}
			//[largest cock is long, non-tentacle]
			if(player.lowerBody.cockSpot.list[0].cockLength >= 12) {
				if(player.lowerBody.cockSpot.count() == 1) Render.text("Her body surrenders more and more as your " + multiCockDescriptLight() + " presses against her cervix. ", false);
				else Render.text("Her body surrenders more and more as your " + multiCockDescriptLight() + "  press against her cervixes. ", false);
				Render.text("Her mouth opens in a soundless and agonizing cry when you finally push past. ", false);
			}
			//[1 cock, tentacle] 
			if(player.tentacleCocks() == 1 && player.lowerBody.cockSpot.count() == 1) {
				Render.text("Her body surrenders more and more as your " + cockDescript(0) + " pushes deep into her bowels, snaking its way further into her body as it fucks her insides. ", false);
			}
			Render.text("It feels like you have been pushing yourself into her for hours", false);
			//[largest cock is wide and/or long]
			if(player.lowerBody.cockSpot.list[0].cockLength >= 12 || player.lowerBody.cockSpot.list[0].cockThickness >= 3) {
				Render.text("; her cries have long since died down to whimpers. ", false);
			}
			//[largest cock is not wide and/or long]
			else Render.text(", and her cries have long since turned into groans of pleasure. ", false);
			Render.text("You cannot hold off your orgasm any longer. Your " + multiCockDescriptLight() + " explode", false);
			if(player.lowerBody.cockSpot.count() == 1) Render.text("s", false);
			Render.text(", ", false);
			//[large cum production] 
			if(player.cumQ() >= 250) Render.text("gushing massive amounts of your cum ", false);
			//[regular cum production] 
			else Render.text("pushing your sperm ", false);
			Render.text("deep into her ", false);
			//[1 cock, tentacle]
			if(player.lowerBody.cockSpot.count() == 1 && player.tentacleCocks() == 1) Render.text("anus", false);
			else {
				//[largest cock is not wide and/or long]
				if(player.lowerBody.cockSpot.list[0].cockLength >= 12 || player.lowerBody.cockSpot.list[0].cockThickness >= 3) {
					//[1 cock]
					if(player.lowerBody.cockSpot.count() == 1) Render.text("cunt", false);
					//[2+ cocks]
					if(player.lowerBody.cockSpot.count() >= 2) Render.text("cunts", false);
				}
				//[largest cock is wide and/or long]
				else {
					Render.text("womb", false);
					if(player.lowerBody.cockSpot.count() >= 3) Render.text(" and bowels", false);
				}
			}
			Render.text(".  With a satisfied groan, you pull out and let your " + multiCockDescriptLight() + " dribble the last remnants of your cum over the ravished witch. Satisfied, you ride off into the desert.", false);
		}
		//[% no cocks]
		else {
			Render.text("Finished with your games ", false);
			//[has cunt] 
			if(player.lowerBody.vaginaSpot.hasVagina()) Render.text("and your " + vaginaDescript(0) + " dripping with desire", false);
			Render.text(", you push the witch unceremoniously to the ground and deliver a slap to her breasts.  She cries out in pain as milk splashes out onto the sand.  A cruel smile is brought to your face and you start slapping them even harder, alternatively smacking her pair of cunts for good measure.  Surprisingly, her cries of pain begin to turn into moans of pleasure with every slap.  She might even be pushing into the blows slightly, though it is difficult to tell.  After a sizable pool of milk and her juices has drained into the sands beneath her, you reach down and start to drive your fingers hard into one of the sand witch's cunts.  The first few thrusts are enough to violently bring her to orgasm.  You trot forward slowly until you are over her and the witch suddenly hops up. Driving her face into your ", false);
			//[has cunt]
			if(player.lowerBody.vaginaSpot.hasVagina()) {
				Render.text(vaginaDescript(0) + ", she fingers herself even harder than you had been a moment ago.  Her lips lock unto your " + clitDescript() + " and she suckles on it, drawing a pained gasp from you and causing your pussy juices to gush over her face. You feel ", false);
				//[cunt size is small]
				if(player.vaginalCapacity() < 10) Render.text("one of her fingers ", false);
				//[cunt size is normal]
				else if(player.vaginalCapacity() < 20) Render.text("several of her fingers ", false);
				//[cunt size is large] 
				else Render.text("a fist ", false);
				Render.text("pushing deep into your " + vaginaDescript(0) + ", and you're surprised as ", false);
				//[anus size is small]
				if(player.analCapacity() < 10) Render.text("her tongue ", false);
				//[anus size is normal]
				else if(player.analCapacity() < 20) Render.text("two of her fingers ", false);
				//[anus size is large]
				else Render.text("a fist ", false);
				Render.text("penetrates your " + assholeDescript(), false);
				Render.text(".", false);
			}
			//[does not has cunt]
			else {
				Render.text(assholeDescript() + ", she fingers herself even harder than you had been a moment ago.  Her tongue drives into your " + assholeDescript() + ", licking enthusiastically as she squeezes her nipples. ", false);
				//[anus size is small]
				if(player.analCapacity() < 10) Render.text("The sensations are intense, and you could almost swear that her tongue is tracing a pattern as her mouth mutters strange sounds. ", false);
				//[anus size is normal] 
				else if(player.analCapacity() < 20) Render.text("Unsatisfied with just her buffet, you soon feel her fingers thrust hard into you and hear her muttering what sounds like obscene words of depraved lust. ", false);
				//[anus size is large]
				else Render.text("Unsatisfied with just her buffet, the witch grabs one of her breasts and squirts milk into your massive hole.  You realize she was lubricating it even as you feel her entire hand driving into you.  The sensations are too intense, and your screams of pleasure drown out her lustful muttering. ", false);
				Render.text("Her mumbling finishes even as an orgasm overwhelms you.", false); 
				Render.text("\n\n", false);
				//[SW_1]
				SWCentaurMore(1);
				doNext(camp.returnToCampUseTwoHours);
				//Return true to indicate not to continue the scene.
				return true;
			}
		}
		return false;
	}
	//[SW_3]
	if(argument == 3) {
		Render.text("As she begins to seem less skittish, you reach your hands into her robe and push it off of her shoulders, revealing a beautiful body underneath.  A pair of pussies is betraying the sand witch's arousal - her thighs are already dripping wet.  You begin to tease her four breasts as you lower your mouth to her lips for a passionate kiss.  Breaking off the kiss and grinning, you ", false);
		//[STR > 50]
		if(player.str > 50) Render.text("pick her up and toss her onto your back. ", false);
		//[STR < 50]
		else Render.text("offer her your hand and help her onto your back. ", false);
		Render.text("Your strong hooves carry you across the clear desert at a light trot.  Without her robes to protect her, you can feel the witch's bare pussies grinding against your back as she presses her quad of breasts against your shoulders.  Her moans intensify more and more as you pick up the pace.", false);
	}
	return false;
}

//Knot sand witch
private knotSandwitch():void {
	spriteSelect(50);
	Render.text("", true);
	Render.text("You press the tip of your " + cockDescript(0) + " at the entrance of her fragent flower.  It slides in, thanks to the pre already dribbling from your cock, your eyes rolling back in your head from the touch of her slippery folds.  You can't help but suddenly stab the length of your " + cockDescript(0) + " to the hilt within her, moaning as the tip pushes against her cervix.\n\n", false);
	Render.text("As your " + cockDescript(0) + " stirs within her, she begins to push back, her velvet walls gripping you tightly as you get a extra bit inside.  She pulls free and pounds in again, causing her to grunt from the force of your knot stretching her.  Your balls swing back and forth, slapping and bouncing against her ass in a delicious way.  You can feel the beginnings of the orgasm building within your loins, pulsing up through the tip of your " + cockDescript(0) + ". As the pleasure increases, your body readies itself for the spill, and your knot begins to swell.  ", false);
   Render.text("You begin to buck into her at a frenzied pace, your body's need to release your motivation.  At first, your knot swelling is an extra sensation, a tightness that squeezes deliciously as more and more blood is forced inside by sheer stimulation.\n\n", false);
	Render.text("Then it begins to get in the way, preventing your length from going all the way in, causing the pointed tip of your " + cockDescript(0) + " to lust for the unattainable depths of her cunt.  You press in, and get the sensation of the knot being squeezed in, crushing you with warm wet pleasure within her spasming cunt, only to release as you pull free.  As it continues to swell, you can no longer get your dick all the way inside her, your sperm-swollen knot bloated beyond her capacity.  Your desire is almost at its peak; within your grasp, but without that vice-like tightness around your knot it will be hard to cum.  ", false);
	Render.text("You grunt and push hard, desperate to force the bulbous cock-flesh inside, and you're rewarded as it pops in with a wet squelch. The tightening pressure around the base of your " + cockDescript(0) + " pushes you over the edge, and the cum begins to shoot in her tight hole, with your " + cockDescript(0) + " trapped inside!\n\n", false);
  	//ORGAZMO
  	if(player.cumQ() < 25) Render.text("The cum slicks your dick as you continue trying to hump, easing the over-sensation of your dick while you're glued together by the bulbous knot locked in her snatch.", false);
   if(player.cumQ() >= 25 && player.cumQ() < 100) Render.text("Your cum expands her pussy, stretching her out and leaving your " + cockDescript(0) + " swimming in your spunk, trapped within her tight-stretched walls by your massive knot.", false);
   if(player.cumQ() >= 100 && player.cumQ() < 500) Render.text("Your cum begins to pump into her corked body, filling her hole to the brim.  Surely the pressure is piling the jizz deep into her womb, and after what feels like forever, the overfull spunk shoves back on your knot, a little dribbling out around the edges of her taut feminine folds as her pussy reaches its limit.", false);
   if(player.cumQ() >= 500) Render.text("Your cum spurts into her in rapid jets, coating the inside of her walls briefly white as more continues to pour into her. Her cunt begins to fill, and as she strugles to relieve the pressure that continues to pump into her, she only succeeds in spurring your orgasm to a new height.  You continue to blast within her, your knot holding her fast as she squirms, each shot of cum from your prick managing to squirt a tiny bit of jizz from your locked genitals.", false);
	player.orgasm();
}

//Sandwitch multi-cock corrupt rape
private rapeSandwitchMultis():void {
	spriteSelect(50);
	Render.text("With the corruption of this realm comfortably throbbing in your shameless veins, you feel your mind opening to new possibilities.  Despite the slickly perfect fit of the sand witch's multiple pussies as you pound into her, and the way she moans with each thrust of your titanic members, you feel there are still some further alleys of pleasure within her left to explore.  Long inured to carnal pleasure that would have rendered your earlier, purer self unconscious,  your mind wanders back to the witch's weapon of lust, the vibrating stone of pleasure.  You feel it's time to give her a dose of her own medicine.\n\n", true);
	Render.text("You grin wickedly at the humiliated and whimpering witch as you rape her.  Between involuntary gasps of pleasure as you steadily pound into her sopping snatches, she looks afraid, not knowing the source of your mirth.  It soon becomes clear enough. She struggles a little once she hears the low buzzing of her own corrupted pleasure stone and bucks and thrashes as you push the persistent little charm into her tight, but well-cum-lubed ass.  The feel of the stone vibrating within her spreads through to your cocks, enhancing the pleasure as she clenches and spasmes while being violated multiple ways.  All too soon, it brings you to a gushing orgasm.  As you finally withdraw from the troublesome sand witch, you spit on her milk-oozing form and take your leave.", false);
	player.orgasm();
	cleanupAfterCombat();
}

internal function beatSandwitch():void {
	spriteSelect(50);
	if(monster.lust > 99) Render.text("You smile in satisfaction as the " + monster.short + " drops down on all fours and begins masturbating feverishly.  Sadly you realize your own needs have not been met.  Of course you could always fuck the horny witch...\n\nDo you rape her?", true);
	else Render.text("You smile in satisfaction as the " + monster.short + " drops down on all fours and struggles to rise.  Sadly you realize your own needs have not been met.  Of course, you could always fuck the witch...", true);
	Render.text("  Of course, just taunting, teasing, and humiliating her for her arrogance would be equally amusing, <b>but it would give her plenty of time to turn the tables...</b>");
	let temp2:Function = null;
	let temp3:Function = null;
	if(silly()) temp3 = missingoSex;
	if(player.hasKeyItem("Deluxe Dildo") >= 0) temp2 = getGame().sandwitchGetsDildoed;
	let shouldra:Function = null;
	if(kGAMECLASS.shouldraFollower.followerShouldra() && player.gender > 0) shouldra = kGAMECLASS.shouldraFollower.sandWitchGetsGhostly;
	//doYesNo(sandwitchRaped, cleanupAfterCombat);
	let ovi:Function = null;
	if(player.gender > 0 && player.canOviposit()) ovi = ovipositSandWitches;
	
	choices("Yes", sandwitchRaped, "Dildo Rape", temp2, "Use 3i@-", temp3, "Use Shouldra", shouldra, "Lay Eggs", ovi,
		"Taunt Her", sandwitchSpanking, "", null, "", null, "", null, "Leave", cleanupAfterCombat);
}

//This is a bonus scene for those who are playing Corruption of Champions with Silly Mode activated and defeat the Sand Witch by dropping her hit points and have the option of having their way with her. A special third(?) option appears that begins the encounter. The idea is that it breaks the 4th wall and gives the player the impression that they've stumbled upon a glitchy, incomplete scene. As a special note to anyone who does coding: all code tags (anything like \" + cockDescript(0) + \" but not my usual {code brackets} for example) are meant to be printed in game exactly as they were written on this document, pushing the idea that the player \"broke the game\".
//{Player defeats Sand Witch and has enough Lust}
//You smile in satisfaction as the sand-witch drops down on all fours and begins masturbating feverishly.  Sadly you realize your own needs have not been met.  Of course you could always fuck the horny witch...
//Do you rape her?
//[Yes] [Dildo Rape] [Use 3i@-]


//{Player selects [Use 3i@-]}
private missingoSex():void {
	spriteSelect(50);
	Render.text("", true);
	Render.text("You stride proudly towards your latest conquest, the prone witch starting at you with a look of pure and delightful helplessness. She backs away on all fours, but a simple \"Stop.\" uttered from your lips is enough to freeze her in place. You look do/n at her, your \" + multiCockDescript(0) + \" throbbing within your clothes. What clothes? Oh, those clothes th$t you happen to be tearing from your body, much to her dismay.\n\n", false);

	Render.text("Clearly, this bitch needs the dick. And you're just the ^&a*pion to give it to her. You lick your lips and drop to your @nees, taking hold of her le-s and forcibly spreading them apart. Looking down, you see that her body is quite ready for you, her exposed fuckhole pouted and moist. You cannot help but laugh a- the situation, the motions making your \" + multiCockDescript(0) + \" bounce in the open air as you co-vulse with laugh-er. Her res$$tance only serves to arouse you, making you savor that choice ass before you claim it for your own.\n\n", false);

	Render.text("You want to embarrass her further, complete her humiliation upon the sands she once thought to be her domain. You tear her robes into little shreds, exposing her four generously sized breasts. Your eyes follow her dri-^ling nipples, the pupils bouncing as they do. \"Wh-what are you going to do? Rape me?!\" cries the witch, her tone equal parts terrified and wishful. Her thighs attempt to close, though you're sure it's more t$ grind them together than any atte-pt at preserving her modesty. Leaning down, y-u open up to let your tongue lap at her swollen clit. She arches her back and moans, thrusting her hips towa-ds you as bes- she can.\n\n", false);

	Render.text("0)w is t$e time. But no, she won't get the dick. She hasn't EAR*ED the dick. She isn't even wor$h your \" + vaginaDescript(0) + \" yet. No n- no, you need -o warm that ho_ cunt up. You whistle to g-t her attention, and as you do, you present your -i%-s ^a_=e* up to*--h-r. Her eyes wi_en, the wo$an's jaw going slack. \"N-no.. not t-e whole thing.\" you nod _n respo-se to her plea. \"The WHO-E THING?!\"\n\n", false);

	Render.text("Now she begins to panic. She shake- her head rapidly as you draw bac- your %s99=, and thrust them towards her >pen sl1t...", false);
	
	Render.text("\n\n<b>Don't report this as a bug, okay dawg?</b>", false);
	
	simpleChoices("N*xt", missingoSex2, "", null, "", null, "", null, "", null);
}
//{Next Page}
private missingoSex2():void {
	spriteSelect(50);
	Render.text("", true);
	Render.text("Naturally, you %i-+. Hon-stly, her hole can't take such a pounding. You can tell t-is by looking at her prone,',, vulnerable body, #ipe for y-ur abuse. Your *i- isn't ev|n enough to do this! Your-i*))s fall short, landing i( the sand, splashing he- bo^y with a wave of the -tuff. She gasps in su!p!i!e, barely a?le to keep it from getting into h_r mouth. Her tits hardly fare as well, being coated genero_sly, ^er milk mi$ing w--h it. The resulting concocti@n sticks to her chest, leaving it quite the mess.\n\n", false);

	Render.text("\"I can't belie^e you just tried that.\" she says with a )_=f. \"You're goi(g to get and in all s))ts o& uncomfortable places ^& you ke-_p that up.\"\n\n", false);
	
	Render.text("\"Still...\" she says, ##ok%7g at you slyly. \"Why don't you (ull b=c( and try that again....\"", false);
	
	//[N*xt]
	simpleChoices("N*xt", missingoSex3, "", null, "", null, "", null, "", null);
}

//{Next Page}
private missingoSex3():void {
	spriteSelect(50);
	Render.text("", true);
	Render.text("_at_r@_ly, you %i-+. Ho@-@@ly, her h_le c_n't take @_ch _ po_ndi_g. Yo_ can t_ll t-is b_ loo_ing _t her pr_ne,',, v@^@erable b@dy, #ipe _or y-ur a_use. Y_ur *i- isn't ev|n en_ug_ to do this! Y_ur-i*))s fall sho_t, la@d@ng i( the sa_d, sp_as_i_g he- bo^y wit@ a @ave @f the -tuff. She gasps in su!2!i!e, ba_el_ a?le to k_ep it fr_m g_tti_g into h_r m_uth. @er @it@ har_ly fa_e as well, bei@g c@_t_d ge_ero_sl_, ^er milk mi$ing w--h it. T_e re_ult_ng co@cocti@n sti-ks to her c_est, l@a_in@ it q_ite t_e m_s_.\n\n", false);
	
	Render.text("\"@ @a@'t b@lie^e y_u j@st _rie_ th_t.\" s@e sa_s @?th a )_=f. \"Yo_'re @oi(g to g_t a_d in all s))ts o& u_c_mfo_table pla_es ^& yo_ ke-_p t@at u@.\"\n\n", false);
	
	Render.text("\"@_i@_...\" s_e says, ##o@%7g @t yo_ s_@_y. \"W_@ d_n't @o_ (ull b=c( an_ @r_ _h_@ a_@in....\"\n\n", false);

	//[@*xt]
	simpleChoices("@*xt", missingoSex4, "", null, "", null, "", null, "", null);
}

//{Next Page}
private missingoSex4():void {
	spriteSelect(50);
	Render.text("", true);
	Render.text("_oo_o@_oo, ooo %o-+. oo@-@@oo, ooo o_oo o_o'o oooo @_oo _ oo_ooo_o. oo_ oo o_oo o-oo o_ ooo_ooo _o ooo oo_o,',, o@^@oooooo o@oo, #ooo _oo o-oo o_ooo. o_oo oo- ooo'o oo|o oo_oo_ oo oo oooo! o_oo-o*))o oooo ooo_o, oo@o@oo o( ooo oo_o, oo_oo_o_o oo- oo^o ooo@ o @ ooo@o ooo -oooo. ooo ooooo oo oo!2!o!o, oo_oo_ o?oo oo o_oo oo oo_o o_ooo_o oooo o_o o_ooo. @oo @oo@ ooo_oo oo_o oo oooo, ooo@o o@_o_o oo_oo_oo_, ^oo oooo oo$ooo o--o oo. o_o oo_ooo_oo oo@ooooo@o ooo-oo oo ooo o_ooo, l@o_oo@ oo o_ooo o_o o_o_.\n\n", false);
	
	Render.text("\"@ @o@'o o@ooo^o o_o o@oo _ooo_ oo_o.\" o@o oo_o @?oo o )_=o. \"oo_'oo @oo(o oo o_o o_o oo ooo o))oo o& o_o_ooo_ooooo ooo_oo ^& oo_ oo-_o o@oo o@.\"\n\n", false);
	
	Render.text("\"@_o@_...\" o_o oooo, ##o@%7o @o oo_ o_@_o. \"o_@ o_o'o @o_ (ooo o=o( oo_ @o_ _o_@ o_@oo....\"", false);
	//[Fuck this!]
	simpleChoices("Fuck This!", missingoSex5, "", null, "", null, "", null, "", null);
}

//{Next Page}
private missingoSex5():void {
	spriteSelect(50);
	Render.text("", true);
	Render.text("Yeah no, fuck this shit. Seriously. You grip your controller with a barely restrained fury, fighting the urge to throw it across the room in a fit. Taking a moment, you collect yourself, and test the game. Yep, totally unresponsive to your buttons now. Damn thing froze AGAIN.\n\n", false);

	Render.text("You sigh a defeated sigh and cut the power to your Super Fentendo. After removing your Corruption of Champions cartridge and inspecting it for damage, you flip it over and blow into the open end of it a few times. Crisp, clean blowing, from one end to the other. Thorough. Professional. These games should be proud to have you as their owner.\n\n", false);
	
	Render.text("You flip up the little plastic fedora on your Imp-head-shaped Fentendo, exposing the cartridge slot and giving it a looksee. No problems there, it seems. Just to be sure, you huff and puff and blow for dust. It's bad enough that this system only supports one game, AND you have to go out to the store and pick up a new copy of it every time the developer makes one or two tiny little changes to the game. But those crashes and terrible dialogue in the last scene? You'd think that some of the writers just weren't trying anymore.\n\n", false);
	
	Render.text("The system powers up with the usual blips and boops you'd expect from this 8-bit powerhouse. So far so good. The Corruption of Champions title screen pops up, heralded by a little pixelated imp eagerly waving at the player with both hands and something else that protrudes from his body. The CoC theme kicks up, and you smile to yourself. Goddamn if that theme isn't catchy as all getout. You're going to have it stuck in your head for the rest of the day, you wager, but at least you'll have something to hum while you masterbate.\n\n", false);
	
	Render.text("Oh goddammit. You remember that your progress from before was lost, and now you have to start from the beginning. You can't help but roll your eyes and groan, though you're hardly angry enough to put a controller-shaped hole through your TV screen over this. But hey! At least you were smart enough to jot down the Champion Password. Perhaps one day video games will be sophisticated enough to have some internal means of storing progress, but at least with this, you should be able to get all of your old stuff!", false);
	
	//Restore]
	simpleChoices("Restore", missingoSex6, "", null, "", null, "", null, "", null);
}
//{Next Page}
private missingoSex6():void {
	spriteSelect(50);
	player.orgasm();
	cleanupAfterCombat();
	hideUpDown();
	statScreenRefresh();
	Render.text("", true);
	Render.text("You successfully restore your game. Everything's intact. At least, you thought it was. You must have messed up the password somewhere along the line, but oddly enough, the only difference is the clock being set an hour ahead and a few extra gems and EXP in your pocket.\n\n", false);

	Render.text("It is like fucking christmas up in here.", false);
	//{Player gains about as many gems experience points as they would from a Sand Witch encounter, and the Champion is returned to camp.}
	doNext(camp.returnToCampUseOneHour);
}


//Either type on Sandwich: Finished (Radar)(edited)
//Display standard victory dialogue, yadda yadda, etc
//[Sex]----> [sex options here]   [Oviposition] 
private ovipositSandWitches():void {
	clearOutput();
	Render.text("As you glance down at the ");
	if(monster.HP < 1) Render.text("bruised and battered");
	else Render.text("lusty");
	Render.text(" sand witch, you feel the familiar tug of arousal in your loins.  Yet your current... situation offers quite the opportunity to relieve some tension through the use of your 'other' sexual appendage.  Licking your lips in anticipation, you lower yourself down to the obstinate spell caster, who immediately reacts with ");
	if(monster.HP < 1) Render.text("fright as she clamors to get away.");
	else Render.text("an uneasy curiosity to see what exactly you have planned.");
	
	//PC won through HP victory: 
	if(monster.HP < 1) Render.text("\n\nRolling your eyes, you offer a sympathetic hand to the defeated witch, showing her that you don't mean to hurt her any further, that you have something more... pleasurable in mind.  ")
	Render.text("The sand witch slows to a dead stop as she assesses your intentions, which are made all the more clear as you disrobe and toss your [armor] aside, exposing your ");
	if(player.lowerBody.cockSpot.hasCock()) Render.text("hardened  " + multiCockDescriptLight());
	if(player.gender == 3) Render.text(" and ");
	if(player.lowerBody.vaginaSpot.hasVagina()) Render.text(clitDescript());
	Render.text(" for her viewing consumption.  Making quite the persuasive argument of non-hostility as you do, the sand witch finally relents, removing her cloak and exposing her four-breasted, ");
	if(player.totalCocks() > 1) Render.text(num2Text(player.lowerBody.cockSpot.count() + 1));
	else Render.text("two");
	Render.text("-sexed form, allowing the sun to glisten off her bare body.");
	
	Render.text("\n\nDrawing closer to the prone woman, you can see her ardent lust accumulating on her tender sexes; yet you can clearly see the remnants of her wariness, no doubt having heard what ");
	if(player.canOvipositBee()) Render.text("bee-morphs");
	else Render.text("driders");
	Render.text(" can do to their partners and unsure if this is really what she wants.  The poor girl seems to need a little 'encouragement'... of course, you could just skip all that regardless if you really wanted.");
	
	//[Foreplay 1st]    [Get Fucking]
	simpleChoices("Foreplay 1st", eggwitchForeplay, "Get Fucking", getToFuckingWithZeEggsInWitch, "", null, "", null, "", null);
}

//[Foreplay 1st]
private eggwitchForeplay():void {
	clearOutput();
	Render.text("Knowing how the desert witch feels at this moment, you decide to help ease her into receiving your young.  Slowly, you slide your fingers up the uneasy woman's legs, the sensation of your hands along her delicate frame soliciting a pitiful gasp from the sand witch as she receives the caress.  Gradually working upwards, your palms curve and twist along the blonde beauty's thighs, all the while causing her to shudder from the stimulus, her ");
	if(player.totalCocks() > 1) Render.text(num2Text(player.lowerBody.cockSpot.count() + 1));
	else Render.text("two");
	Render.text(" clits all hard from the apparent promise of your carnal attentions.  Positioned between her thighs, your hands rest and you wait for the eager gaze of her eyes, the imploring of your continued progress.  The sand witch doesn't disappoint; her needy eyes beseech you to splay her legs open and get intimately acquainted with her naughty bits.");
	
	Render.text("\n\nGrinning in delight at the desert vixen's willful submission, you oblige her desires and spread her thighs apart; the aroma and heat of her excitement rising to your nostrils is the perfect greeting and welcome for you.  With blood surging to your sex");
	if(player.lowerBody.cockSpot.count() > 1 || player.gender == 3) Render.text("es");
	Render.text(", you descend on her love buttons, the smack of sweet female juices embracing your taste buds with the plunge of tongue.  The once-defiant woman who attacked you for rejecting her offer melts to your whims, cooing and moaning as you press your face against her pelvis and helping to stimulate her other vagina");
	if(player.lowerBody.cockSpot.count() > 1) Render.text("s");
	Render.text(" in step with your tongue.  Each flutter along her sex produces more fluids, more contractions, and more squeezes of her thighs as you soldier on, the sand witch all too willing to keep you pinned right where you are as she cries out to the sky, face flush with ecstatic pleasure and longing to keep this going as long as humanly possible.  But you didn't come here  for 'foreplay' alone; you have a payload of young that needs a host and a lust that needs to be sated.");
	
	Render.text("\n\nHaving warmed this sorceress up ");
	if(player.stats.cor > 50) Render.text("enough ");
	Render.text("to giving your way of breeding a shot, you quickly get into position on top of the sand witch.  ");
	if(player.canOvipositBee()) Render.text("Sitting");
	else Render.text("Laying");
	Render.text(" against your mate, you both take the moment to revel in the anticipation of coitus.");
	dynStats("lus", 25, "cor", -.35);
	doNext(laySomeEggsInThatWitchFinally);
	//go to merge
}

//[Get Fucking]
private getToFuckingWithZeEggsInWitch():void {
	clearOutput();
	//[PC corruption is less than 60: 
	if(player.stats.cor < 66) {
		Render.text("While you understand her reservation about being abruptly turned into a host for your young, you know that the experience can be mutually euphoric.  You descend upon the prone sand witch, taking her into a gentle embrace to soothe her uneasiness, and whisper to her that you understand her concern, but ask her to give this a chance.  Her apprehension evaporates slightly at your soft words, but quickly flares up again when she spots the wavering ovipositor that dangles hungrily behind you.  Hastily, you assure her that she'll enjoy the experience, before planting a passionate kiss on the sand witch's soft lips.");
	
		Render.text("\n\nReluctantly, the sorceress spreads her legs to welcome you into her being.  Between the reciprocation of your caresses you work your alien appendage against her dripping sex, teasing and lathering her clits and anus with your 'special' lust.");
	}
	//[PC corruption is greater than 60:
	else {
		Render.text("The sight of the sand witch's apprehension brings a furious scowl to your face; she was willing to assault you for her own perverted delight, and yet she shakes like a coward at the prospect of a truly unique fuck?  The nerve of this woman!  She wouldn't afford you the courtesy of some 'persuasive' foreplay if the roles were reversed; so why should you?  Dismissing her uncertainty, you tell the sorcerer that you know she craves a good screw like everything else around here and to drop the act, descending upon her and pinning her to the ground in a display of unbridled sexual fury.  Her eyes go wide in fear as your form presses her into the hot sand, rightly concerned that you're going to force her to receive your lusts and unborn young.");
		
		Render.text("\n\nHer labored breathing becomes ever more erratic as the bulbous mass of your ovipositor un-sheaths and presses against her lubricated sex, her whole body tensing up in horror at what is to come.");
		
		Render.text("\n\nBut what would this serve, really? To force yourself on her?  You KNOW the tainted, wanton whore lies just beneath the surface of this woman's form; the whore that begs to be fucked and taken roughly by you.  All she needs is a little persuasion to admit she wants this, to have her accept the slut within.  The sand witch shivers as you whisper into her ear that you know she hungers for your other-worldly appendage in her pussy; that the facade of being apprehensive about this is but an illusion to deny her very nature.  You know deep down she wants nothing more than to lie back and join with you in carnal bliss; and you can make that happen - she just needs to <i>admit it</i>, to stop lying to herself.  Heavy, ponderous breathing and a twitch of the eyes is your response, the sand witch struggling to find meaning in what you say.");
		
		Render.text("\n\n\"<i>No... I...</i>\" the sand witch tries to protest, but her arousal at the sight of your ovipositor gives away the smokescreen she's been putting up.  You bring the final blow to bear as you tell her that there is no shame in admitting her lusts, but there is shame in denying what she's become, in denying what she craves.  The weight of your words seems to lift the world from the woman's shoulders, until she acknowledges the taint that has taken root in just about every living thing in this land.");
		
		Render.text("\n\n\"<i>Please... take me...</i>\"");
	}
	//both go to merge
	doNext(laySomeEggsInThatWitchFinally);
	dynStats("lus", 15);
}

//(Merge)
//choose pussy or anus randomly
private laySomeEggsInThatWitchFinally():void {
	clearOutput();
	let cunt:boolean = (rand(2) == 0);
	Render.text("Before long the intense need to culminate the act grows too lucid to ignore, and with a hum of satisfaction you finally bore your ovipositor through the tight ");
	if(cunt) Render.text("folds of her vulva");
	else Render.text("ring of her anus");
	Render.text(".  Like something out of a fever dream, the bizarre appendage you wield burrows further and further into her ");
	if(cunt) Render.text("sex");
	else Render.text("ass");
	Render.text(", the ");
	if(cunt) Render.text("ribbed contours of her pussy");
	else Render.text("tight fit of her innards");
	Render.text(" enrapturing your egg-tube with every passing inch.  You begin the process of lubricating the antsy witch's ");
	if(cunt) Render.text("love-");
	else Render.text("anal ");
	Render.text("canal for the delivery of your young; the witch barely contains her moans and utter glee at being filled with such a hot, humid substance.  In perverted delight the sand witch coos between kisses, her moans betraying a curiosity to explore just how pleasant mating this way can truly be.");
	
	Render.text("\n\nThe descent into her being inevitably slows down, the need to make room for further insertion all too apparent as it becomes more and more difficult to progress.  In a blissful sense of welcome violation, the sand witch begs you to go further, until your sexes truly intertwine.  After a few groan-filled moments your ovipositor finally reaches its destination, working its way into the ");
	if(cunt) Render.text("opening of your lover's cervix");
	else Render.text("deepest recesses of her sphincter");
	Render.text(".  The joining of oviduct to ");
	if(cunt) Render.text("womb");
	else Render.text("anus");
	Render.text(" now complete, you prepare yourself for the inevitable convulsion of orgasm along your bizarre appendage, grinning down at the sand witch with a smirk that can only convey that the fun's about to begin.  With a sudden, violent quake your ovipositor rumbles with the first of many eggs, squeezing your unborn brood down your shaft and pushing ");
	if(cunt) Render.text("at the waiting lips of the sand witch's vagina");
	else Render.text(" through her rectal walls");
	Render.text(".  With a meticulous push, the forerunner of your young manages to infiltrate her passage, working its way valiantly into her depths with every convulsion.");
	
	Render.text("\n\n\"<i>OH GODS!</i>\" the sorceress cries out, wrapping her legs tightly around you and moaning as the egg makes its journey upwards.  The quiet coos of bliss turn loud as the shell of your brood eases past her inner ring, your mate's muscles clamping down hard on your ovipositor as she seemingly tries to milk your appendage for all it's worth.  With a low grumble, the egg reaches its target and slides ");
	if(cunt) Render.text("into her waiting womb");
	else Render.text("as far as you can safely tuck it");
	Render.text(", nestled and sound until the scramble for life can begin.");
	
	Render.text("\n\n\"<i>More... give me more...</i>\" the sand witch whimpers, caressing your ");
	//(Bee, non-horse:
	if(player.canOvipositBee() && !player.isTaur()) Render.text("torso");
	else Render.text("pelvis");
	Render.text(" to spur you on.  Of course you don't have a problem with fulfilling her wishes; the neglect of your throbbing sex");
	if(player.lowerBody.cockSpot.count() > 1 || player.gender > 2) Render.text("es");
	Render.text(" is the only point of dissatisfaction, a point you make clear when you ");
	if(player.lowerBody.cockSpot.hasCock()) Render.text("take hold of your " + multiCockDescriptLight() + " and bring it");
	else Render.text("bring your " + vaginaDescript(0));
	Render.text(" to her face.  The cute stare of her half-glazed eyes turns to the lunge of lips toward your sex, the sand witch driven like a woman possessed in her efforts to get the next batch going...");
	
	Render.text("\n\nFor what feels like an eternity you sit atop the pliant sorceress, having her tend to your sex");
	if(player.lowerBody.cockSpot.count() > 1 || player.gender == 3) Render.text("es");
	Render.text(" while you slowly pump her full of eggs, her girlish little moans resonating through your body as she orally stimulates your ");
	if(player.lowerBody.cockSpot.hasCock()) Render.text(multiCockDescriptLight());
	if(player.gender == 3) Render.text(" and ");
	if(player.lowerBody.vaginaSpot.hasVagina()) Render.text("your " + vaginaDescript(0));
	Render.text(".  At long last her enthusiastic efforts bring you to a more 'traditional' release, lathering ");
	let facial: number = rand(2);
	if(facial == 0) Render.text("her facial features with proof of your climax");
	else if(facial == 1) Render.text("the interior of her mouth with sweltering streams of your cum");
	Render.text(".  Having finally achieved release, and also having run out of eggs, you pull yourself free of the desert woman with a loud pop, the ");
	if(player.canOvipositBee()) Render.text("honey-like");
	else Render.text("goopy");
	Render.text(" lubricant drooling out of her in the absence of your intimate plug.  Utterly overwhelmed and exhausted, the sand witch resigns herself to gathering strength in the bright, blistering gaze of the desert sun.  Smiling to yourself, you take to re-donning your discarded [armor], remarking as you leave that you look forward to the next encounter; a sentiment the sorceress must agree with as she weakly waves to you, holding her stomach with her arms and filled with motherly delight at the thought of carrying your brood.");
	//Give her ze eggs!
	if (player.fertilizedEggs() > 0) {
		if (player.canOvipositBee())
			pregnancy.knockUpForce(PregnancyType.BEE_EGGS, 192);
		else
			pregnancy.knockUpForce(PregnancyType.DRIDER_EGGS, 192);
	}
	player.dumpEggs();
	player.orgasm();
	cleanupAfterCombat();
}

//Birthing scene: Driders (Radar)(edited)
public sammitchBirthsDriders():void {
	clearOutput();
	//Occurs 8 days (or moar appropriate time) after fertile oviposition, triggered when exploring the Desert
	Render.text("As you struggle with the loose footing of the hot desert sand, a weak howl reaches your ears.  Curiously, you stop and listen, trying to locate the potential source of the sound.  Yet all you can really hear is the wind against the sand-blasted, desolate terrain, giving you cause to shrug it off and continue on your merry way.");
	
	Render.text("\n\nThat is, until another howl reaches your ear; much louder than before.  Upon reflection that howl of wind sounds anything but; you surmise that someone is nearby and probably in distress... or in the throes of sex, because who knows in this place?");
	
	Render.text("\n\nTrying your best to locate the cries amidst the light sand storms, you set out in the general direction that you heard them from.  Struggling to see where you are going as sand blows in your eyes, you happen to stumble upon the prone form of a desert traveller; judging from their shape, the traveller is most definitely female... and apparently with child!  ");
	if(player.stats.cor < 50) Render.text("Intending to help");
	else Render.text("Curious");
	Render.text(", you slide down the dune that you are on and come to a stop next to the distressed woman.  However, upon seeing her face you realize that this is the very sand witch that you had a hot and steamy tumble with!");
	
	Render.text("\n\n\"<i>S-stay away!  I'm in no position to- it's you!  I never figured I would see you again before our little bundle of joy came into the world!</i>\" the weary sorceress admits, relieved to no end to see you.  You nod in greeting, staring at her swollen belly.");
	
	Render.text("\n\n\"<i>I tried to make it back to my coven but... nature had other plans...</i>\" she jokes weakly, before lurching over in obvious pain.  \"<i>...They're coming!  I can't make it somewhere proper to birth our children! Please, help me!</i>\"");
	
	Render.text("\n\nYou can guess that without such help the babies she'll give birth to will wither and die in such a hostile climate.");
	
	//corr < 60 goes to Help her!, else go to Must I really?
	if(player.stats.cor < 60) helpZeWithBirfBabies();
	else reluctantlyHelpZeWitch();
}

//[Help her!] (corr < 60)
//no new PG
private helpZeWithBirfBabies():void {
	Render.text("\n\nFilled with pride that you're going to be a 'father', you quickly rush to the sand witch's side and help her to her feet.  She can barely stand as it is, and groans intensely as she struggles to delay the birth of your children.");
	
	//Body check
	//no, not like in hockey
	//PC has a centaur body, or other body capable of carrying the sand witch:  
	//"W-what the hell did you do to yourself over the last few days?" the sand witch blurts, noticing the 
	//difference in your appearance since the union with wide eyes.  The words are cut off, however, as she doubles over in pain. (transitions to PC is a drider/centaur/whatever scene)
	if(!player.isDrider()) Render.text("\n\n\"<i>W-what the hell did you do to yourself over the last few days?</i>\" the sand witch blurts, noticing the difference in your appearance since your union.  The words that come out of her mouth next are cut off however, as she doubles over in pain.");
	
	//PC is a drider/centaur/whatever:
	if(player.isTaur() || player.isDrider()) {
		Render.text("\n\n\"<i>I-I can't get up; it hurts too much!</i>\" she cries out, despairing of making it somewhere safe in time, and that your children will be born and die out here, all in the same day.  Sternly, you tell her to get on your lower half, sinking to the ground to allow her to hobble up.");
	
		Render.text("\n\n\"<i>Please, not too fast!</i>\" she calls out from behind you, clearly trying her best to not have the labors of your lust right here and now.  Rising to your [feet], you attempt to recall which way to go, only to realize that it doesn't matter.  Concentrating on the camp, you yell at the sand witch to hold on, then ");
		if(player.isDrider()) Render.text("skitter");
		else Render.text("gallop");
		Render.text(" across the dry desert sea...");
	}
	//PC is everything else: 
	else Render.text("\n\nEasing a hand under her armpit, you give her the support she needs to hobble along the hot desert sand.  Which direction to hobble in gives you cause for concern though; you don't really know where you are at this point.  Making the only choice you can, you concentrate on the camp.  With the rough picture in mind you tell the sand witch to hold on, before the two of you slowly make your way across the dry desert sea...");
	doNext(sandwitchBirthsYourMonstrosities);
}

//[Must I really?] (corr >=60)
private reluctantlyHelpZeWitch():void {
	Render.text("\n\nGreat.  Of all the things you could be doing, you get stuck helping this twit out.  Why she couldn't have just stayed home or gone to the swamp is beyond you at this point - you grumble at your misfortune, helping the bearer of your young to rise to her feet.");
	
	//body fork
	//PC has a centaur body, or other body capable of carrying the sand witch: 
	if(!player.isDrider()) Render.text("\n\n\"<i>W-what the hell did you do to yourself over the last few days?</i>\" the sand witch blurts, noticing the difference in your appearance since your union.  The words that come out of her mouth next are cut off however, as she doubles over in pain.  Well, not like you needed any guff from a woman with four tits and multiple cunts.");

	//PC is a drider/centaur/whatever:  
	if(player.isDrider() || player.isTaur()) {
		Render.text("\n\n\"<i>I-I can't get up, it hurts too much!</i>\" she cries out, despairing of making it somewhere safe it in time, and that your children will be born and die out here, all in the same day.  Annoyed at her lack of common sense, you tell her to get on your back, sinking to the ground to allow her to hobble up.");
		Render.text("\n\n\"<i>Please, not too fast!</i>\" she calls out, clearly trying her best to not have the labors of your lust right here and now.  You'll be goddamned furious if she ends up having the kids right here and now; it's a bear to clean parts of you when your arms can't reach them!  Rising to your feet, you attempt to recall which direction to go, only to realize that you're lost.  Even better- well, actually, it doesn't matter.  Concentrating on the camp, you yell at the sand witch to hold on, then ");
		if(player.isDrider()) Render.text("skitter");
		else Render.text("gallop");
		Render.text(" across the dry desert sea...");
	}
	//PC is everything else:  
	else Render.text("\n\nEasing a hand under her armpit, you give her the support she needs to hobble along the hot desert sand.  Which direction to hobble in gives you cause for concern though; you don't really know where you are at this point.  Making the only choice you can, you concentrate on the camp.  With the rough picture in mind you tell the sand witch to hold on, before the two of you slowly make your way across the dry desert sea...");
	doNext(sandwitchBirthsYourMonstrosities);
}


//all shapes and personalities come to:
//prompt with --Next-- button
private sandwitchBirthsYourMonstrosities():void {
	clearOutput();
	Render.text("After what seems like forever, you finally reach the outskirts of camp, stopping just outside of the perimeter to lay the sand witch on the cool dirt.  \"<i>H-here they come!</i>\" she cries out, before wincing in agony.  Splaying her legs, she finally relaxes and allows the birthing process to continue unhindered, the tell-tale signs slowly flowing out of her as green goop.  The pained expression on her face suddenly turns euphoric as the birthing fluids escape from her, acting as an numbing agent and aphrodisiac in the process.  Before long your newly hatched children emerge from their mother's body, covered in all sorts of liquids.  One by one they scurry out, amazed and awestruck by this strange new world they've finally entered into.  That soon gives way to hunger; the children are obviously thirsty and starved from the whole ordeal.  Clamoring up their mother, the fruits of your union quickly ascend to the sand witch's two pairs of breasts, minimizing any infighting for feeding rights.");
	
	Render.text("\n\nRelieved to have finally carried the children to term, the sand witch lies back against the grass and smiles, jubilant that she was able to undergo such a joyous experience.  Humming her happiness to all those within earshot, she relishes this fleeting moment of motherhood as your young drink their fill and skitter shakily off, no doubt heading for the swamp.");
	
	Render.text("\n\nAs you turn to the spellcaster, she shoots you a look of appreciation... even longing.  \"<i>Thank you.  Perhaps... we could try this again sometime?</i>\" she inquires, her voice filled with the hope that she'll see you again.");
	
	Render.text("\n\nYou aren't ruling anything out; it's almost a guarantee that she will run into you one of these days... but perhaps she could just skip the whole spell casting bit next time?  The loud din of snoring cuts through the air in response and elicits a sigh from you.  No doubt her ordeal was exhausting.  You lean down and");
	if(player.stats.cor < 60) Render.text(", with a quick kiss on the lips");
	Render.text(", whisper in her ear that you'll see her again...");
	
	//[(corr >= 60)
	if (player.stats.cor >= 60) Render.text("\n\n\"<i>Just, use your common sense next time.</i>\"");
	pregnancy.knockUpForce(); //Clear Pregnancy
	doNext(camp.returnToCampUseOneHour);
}

//irthing scene: Bees (Radar) (edited)
public witchBirfsSomeBees():void {
	clearOutput();
	//Occurs 8 days (or moar appropriate time) after fertile oviposition; triggered when exploring the Desert
	Render.text("\n\nAs you trudge through the windy desolation of the desert, the familiar hum of buzzing bees can be heard.  You muse to yourself, trying to figure out what a swarm of bees is doing all the way out here.  Then it hits you; that sand witch you mated with must be nearby, and she's probably given birth!");
	
	Render.text("\n\nRushing towards the crescendo of loud buzzing, you stumble upon the haughty sorceress lying in the sand, with the tell-tale aftermath of bee-brand oviposition pooled around her buttocks.  The swarm stays only for a few brief moments");
	if(silly()) Render.text(", echoing tiny little cries of \"<i>@</i>\"");
	Render.text("; likely it was just waiting for someone to find their mother before taking off in the general direction of the forest.  The weak voice of the desert vixen fills the air as she speaks to you.  \"<i>That... was the best.  I can't believe I'm a mother!</i>\"  She gives you a look of appreciation for showing her how pleasurable being a host can be.  Seeing she needs her rest, you give a nod and turn to leave... only to feel a hand grasp at your [leg].  \"<i>I would be disappointed if you didn't come around and 'say hello' more often; keep that in mind " + player.mf("handsome","beautiful") + ".</i>\"  She coos, before drifting off to sleep.  She'll be fine in this shady part of the desert while she rests, the dune currently obstructing the sun and keeping her from being burned from the sun's rays.");
	
	Render.text("\n\nContent with how things turned out, you head back to camp and decide on the next course of action for today.");
	pregnancy.knockUpForce(); //Clear Pregnancy
	doNext(camp.returnToCampUseOneHour);
}

private sandwitchSpanking():void {
	clearOutput();
	Render.text("Feeling euphoric after your clear victory, you lazily circle the panting witch and laugh at her.  \"<i>Look at you,</i>\" you taunt, \"<i>A mighty witch of the sands, laid low by a helpless traveller.");
	if(monster.HP < 1) Render.text("  You can't even stand up!");
	else Render.text("  You can't even stop masturbating, can you?");
	Render.text("</i>\"  You kick her hand away, and she tumbles down into a distraught heap, crying softly");
	if(monster.lust > 99) Render.text(" but still masturbating");
	Render.text(".  It's time for some fun!");
	Render.text("\n\nYou grab the helpless witch and flop her onto her back.  She gasps, glaring defiantly up at you while her arms fold closed over the front of her robe, concealing what looks like four large tits beneath.  None of that!  You tickle her sides in a surprise attack, and she starts to laugh.  Then, you move your scurrying fingertips to her belly and down her thighs.  The spellcaster giggles uproariously and tries to bat your arms away, which gives you the opening you need.  You easily slide past her laughter-addled strikes to the course fabric of her brown robes, and with a quick flex of your muscles, you tear the fabric down the middle, exposing a sea of tanned breast-flesh capped with four prominent nipples.");
	Render.text("\n\n\"<i>Nooo,</i>\" the witch protests once her laughter dies down.  Smirking, you start to pinch and pull at her nipples, tweaking the tender nubs until drops of milk are rolling down all four of her ponderous jugs.  You milk her effortlessly, tugging and tweaking the teats idly while you ply her with questions, asking her if she has anything better to do than try to shove rocks up strangers' assholes.  Her tanned cheeks color in embarrassment, but she stays mute, glowering at you while you play with her nipples.");
	Render.text("\n\nIt's actually kind of fun to play with her milk spouts like this, ");
	if(player.stats.cor < 33) Render.text("and though you feel kind of bad about using her this way, she likely would have done worse to you.");
	else if(player.stats.cor < 66) Render.text("and though you aren't sure you ought to be using her this way, she likely would have done worse to you.");
	else Render.text("and though you used to find things like this distasteful, you don't really give a shit anymore.");
	Render.text("  You tweak and tease with a goofy smile, laughing as you aim one of the tits up into the witch's face, splattering her with her own alabaster juices.  You're so involved in it that you fail to notice the increasingly angry gaze that settles over your captive's face.  Her tits are just so goddamn fun to tease that you don't really waste any time paying attention to her from the neck up.  That's a mistake.");
	Render.text("\n\nToo late, you see the witch's hands glowing, and before you can react, a club of solid stone whomps you upside the head, flinging you wholesale onto your side.  You try to stagger up, but your balance isn't working, and you fall back down, ears ringing.  The witch, seemingly recovered, is towering over you.  She screams, \"<i>My milk is not a toy!</i>\" and throws her arms up over her head.  From below, a torso-sized block of sandstone rumbles up out of the dune, striking you square in the plexus and lifting you up, [legs] and arms dangling uselessly.  A few whispered incantations later and your wrists and [foot] are sucked into the block, binding you into a helpless, restrained pose.");
	Render.text("\n\n\"<i>Now who is laid low?!</i>\" she snaps with magic crackling in the air.  \"<i>You need to be taught a lesson, off-worlder!</i>\"  The witch grabs at the bottom of your [armor] and yanks it down, exposing your [butt] to the hot desert air.  ");
	if(player.lowerBody.cockSpot.hasCock()) Render.text("Worse still, [eachCock] is now unprotected and pressed against the rough stone by your body-weight.  It's less than pleasant.  ");
	else if(player.lowerBody.vaginaSpot.hasVagina()) Render.text("Worse still, your [vagina] is pressed up against the rough stone.  It's less than pleasant.  ");
	Render.text("You bristle at your helplessness");
	if(player.perks.has("FireLord") || player.perks.has("Hellfire") || player.perks.has("Dragonfire")) Render.text(", breathing out a gout of flame in rage, but you can't even direct the blast properly like this.  All it does is melt some of the sand below into glass");
	else Render.text(", but there's nothing you can do");
	Render.text(".  Fingers tickle the " + player.skin() + " of your bottom, and then, without warning, your [butt] is slapped!  The sound of the hit rings out across the desert, hard enough to make moisture bead at the corners of your eyes.");
	Render.text("\n\nThe smirking sorceress laughs, \"<i>You are too prideful for your own good.  Now, I will teach you respect for our order, one spank at a time.</i>\"  She doesn't even wait before hitting you again, bringing her hand down on your unprotected ass without hesitation.  You squirm from pain, trying to escape, to wiggle free, but there's no use - you're tied down with stone restraints that you can't hope to escape.  All you can do is writhe uselessly against your bindings while your [butt] is tanned bright red, tingling with residual pain even when it isn't being hit.");
	Render.text("\n\nThis seems to last forever, and after what feels like hours of pain, you begin to beg for it to stop, whining and whimpering.  As soon as your voice takes on a genuine note of repentance, the blows stop falling.  The witch, having worked her frustrations out of her system, says, \"<i>That is acceptable.  Now, I shall leave you to think on your sins.  Let the sun's baleful gaze bake away the pain and replace it with discipline.</i>\"  ");
	if(player.stats.cor < 50) Render.text("She sounds almost fanatical in her dedication to her order.");
	else Render.text("What the hell is she on about?  Does she actually think her little torture session is going change your attitude?");
	Render.text("\n\nPicking up the pieces of her tattered robe, the sand witch makes to leave.  She stops after a few paces and turns back your way, \"<i>Perhaps this will ease the wait.</i>\"  Your eyes widen in anger when she makes familiar motions, but there's nothing you can do.  Soon, smooth stone orbs are sliding into through your cheeks and into your [butt]");
	if(player.lowerBody.vaginaSpot.hasVagina()) Render.text(" and [vagina]");
	Render.text(".  All of them are vibrating to slightly different tempos, and you get so focused on the oscillating anal symphony, that you miss the enchantress's departure.  You ride the vibrating stones to so many orgasms that you lose count.  Eventually, the magic column fades, receding into the sand.  At the same time, the lifeless stone orbs roll out of your [asshole]");
	if(player.lowerBody.vaginaSpot.hasVagina()) Render.text(" and [vagina]");
	Render.text(".  Bruised and orgasmed into exhaustion, you pass out in the sand with your [armor] around your ankles.  Maybe next time you won't waste your chances gloating.");
	monster.lust = 98;
	monster.HP = 2;
	player.lust = 100;
	flags[FlagEnum.COMBAT_BONUS_XP_VALUE] = monster.XP;
	cleanupAfterCombat();
	player.orgasm();
	dynStats("sen", 5);
}
	}
}
