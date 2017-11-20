package classes {
	
	import classes.*;
	import classes.GlobalFlags.*;
	
	public class PlayerEvents extends BaseContent implements TimeAwareInterface {
		//Handles all timeChange events for the player. Needed because player is not unique.
		
		public PlayerEvents():void {
			CoC.timeAwareClassAdd(this);
		}
		
		private let checkedTurkey: number; //Make sure we test each of these events just once in timeChangeLarge
		private let checkedDream: number;
		
		//Implementation of TimeAwareInterface
		public timeChange():boolean {
			let needNext:boolean = false;
			checkedTurkey = 0;
			checkedDream = 0;
			if (player.cumMultiplier > 19999) player.cumMultiplier = 19999;
			if (player.lowerBody.ballSize > 400) player.lowerBody.ballSize = 400;
			if (player.perks.has("StrongBack") && !player.itemSlot4.unlocked) player.itemSlot4.unlocked = true;
			if (player.perks.has("StrongBack2") && !player.itemSlot5.unlocked) player.itemSlot5.unlocked = true;
			if (Flags.list[FlagEnum.SOCK_COUNTER] > 0) {
				Flags.list[FlagEnum.SOCK_COUNTER]--;
				if (Flags.list[FlagEnum.SOCK_COUNTER] < 0) Flags.list[FlagEnum.SOCK_COUNTER] = 0;
				if (Flags.list[FlagEnum.SOCK_COUNTER] > 24) Flags.list[FlagEnum.SOCK_COUNTER] = 24;
			}
			player.hoursSinceCum++;
			//Super cumbuilding activate!
			if (player.perks.has("MaraesGiftProfractory")) player.hoursSinceCum += 2;
			if (player.perks.has("FerasBoonAlpha")) player.hoursSinceCum += 2;
			//Normal
			if (!player.perks.has("WellAdjusted")) {
				Game.dynStats("lus", player.stats.lib * 0.04, "resisted", false); //Raise lust
				if (player.perks.has("Lusty")) Game.dynStats("lus", player.stats.lib * 0.02, "resisted", false); //Double lust rise if lusty.
			}
			else { //Well adjusted perk
				Game.dynStats("lus", player.stats.lib * 0.02); //Raise lust
				if (player.perks.has("Lusty")) Game.dynStats("lus", player.stats.lib * 0.01, "resisted", false); //Double lust rise if lusty.
			}
			if (player.lowerBody.tailType == TailType.BEE_ABDOMEN || player.lowerBody.tailType == TailType.SPIDER_ABDOMEN) { //Spider and Bee Sting Recharge
				if (player.lowerBody.tailRecharge < 5) player.lowerBody.tailRecharge = 5;
				player.lowerBody.tailVenom += player.lowerBody.tailRecharge;
				if (player.lowerBody.tailVenom > 100) player.lowerBody.tailVenom = 100;
			}
			if (player.lowerBody.tailType == TailType.CAT && player.lowerBody == LowerBodyType.CAT && player.upperBody.head.earType == EarType.CAT) { //Check for gain of cat agility - requires legs, tail, and ears
				if (!player.perks.has("Flexibility")) {
					Render.text("\nWhile stretching, you notice that you're much more flexible than you were before.  Perhaps this will make it a bit easier to dodge attacks in battle?\n\n(<b>Gained Perk: Flexibility</b>)\n");
					player.perks.add(new Perk("Flexibility", 0, 0, 0, 0));
					needNext = true;
				}
			}
			else if (player.perks.has("Flexibility")) { //Remove flexibility perk if not meeting requirements
				Render.text("\nYou notice that you aren't as flexible as you were when you had a more feline body.  It'll probably be harder to avoid your enemies' attacks now.\n\n(<b>Lost Perk: Flexibility</b>)\n");
				player.perks.remove("Flexibility");
				needNext = true;
			}
			if (Flags.list[FlagEnum.FOX_BAD_END_WARNING] == 1) {
				if (player.upperBody.head.face.faceType != FaceType.FOX || player.lowerBody.tailType != TailType.FOX || player.upperBody.head.earType != EarType.FOX || player.lowerBody != LowerBodyType.FOX || player.skinType != SkinType.FUR) {
					Flags.list[FlagEnum.FOX_BAD_END_WARNING] = 0;
				}
			}
			if (player.perks.has("EnlightenedNinetails") || player.perks.has("CorruptedNinetails")) { //Check ninetails perks!
				if (player.lowerBody.tailType != TailType.FOX || player.lowerBody.tailVenom < 9) {
					Render.text("\n<b>Without your tails, the magic power they once granted withers and dies, vanishing completely.</b>\n");
					player.perks.remove("EnlightenedNinetails");
					player.perks.remove("CorruptedNinetails");
					needNext = true;
				}
			}
			if (player.lowerBody == LowerBodyType.HARPY && player.lowerBody.tailType == TailType.HARPY && player.perks.has("HarpyWomb")) { //Make eggs big if harpied!
				if (player.statusAffects.has("Eggs") && player.statusAffects.get("Eggs").value2 == 0) {
					player.changeStatusValue(StatusAffects.Eggs, 2, 1);
					Render.text("\n<b>A familiar, motherly rumble lets you know that your harpy-like womb is growing your eggs nice and large.</b>\n");
					needNext = true;
				}
			}
			if (player.lowerBody.cockSpot.hasCock() && player.lowerBody.cockSpot.get(0).cockType == CockType.BEE) { //All the hourly bee cock checks except the 'seek out the bee girl' check. That's in timeChangeLarge
				Render.text("\n");
				if (player.lowerBody.cockSpot.count() > 1) {
					Render.text("You feel a stickiness and some stinging from your cocks.  It seems your bee cock has absorbed your new addition, leaving no trace of it.\n");
					while (player.lowerBody.cockSpot.count() > 1) player.lowerBody.cockSpot.remove(1, 1);
				}
				if (player.lowerBody.cockSpot.get(0).cockLength < 25 || player.lowerBody.cockSpot.get(0).cockThickness < 4) {
					Render.text("Your " + CockDescriptor.describeCock(player, 0) + " quivers for a moment before growing slightly ");
					if (player.lowerBody.cockSpot.get(0).cockLength < 25 && player.lowerBody.cockSpot.get(0).cockThickness < 4)
						Render.text("longer and thicker");
					else Render.text(player.lowerBody.cockSpot.get(0).cockLength < 25 ? "longer again" : "wider again");
					Render.text(", a bit of pain passing through you at the same time.  It looks like your bee cock won’t get any smaller.\n");
					player.lowerBody.cockSpot.get(0).cockLength = Math.max(player.lowerBody.cockSpot.get(0).cockLength, 25);
					player.lowerBody.cockSpot.get(0).cockThickness = Math.max(player.lowerBody.cockSpot.get(0).cockThickness, 4);
				}
				Render.text("The desire to find the bee girl that gave you this cursed " + CockDescriptor.describeCock(player, 0) + " and have her spread honey all over it grows with each passing minute\n");
				player.stats.lust += 10; //Always gain 10 lust each hour
				needNext = true;
			}
			if (!player.lowerBody.vaginaSpot.hasVagina() && player.perks.has("Diapause")) { //Lose diapause
				Render.text("\n<b>With the loss of your womb, you lose your kangaroo-like diapause ability.</b>\n");
				player.perks.remove("Diapause");
				needNext = true;
			}
			if (player.lowerBody == LowerBodyType.NAGA) {
				if (player.lowerBody.tailType > TailType.NONE) {
					Render.text("\nYour tail squirms, wriggling against your larger naga tail as the scales part around it, absorbing it.  <b>Your form is completely scaly and smooth from the waist down.</b>\n");
					player.lowerBody.tailType = TailType.NONE;
					needNext = true;
				}
			}
			if (player.perks.has("WetPussy") && player.lowerBody.vaginaSpot.hasVagina()) {
				if (player.lowerBody.vaginaSpot.get(0).vaginalWetness < VaginaWetness.WET) {
					Render.text("\n<b>Your " + player.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " returns to its normal, wet state.</b>\n");
					player.lowerBody.vaginaSpot.get(0).vaginalWetness = VaginaWetness.WET;
					needNext = true;
				}
			}
			if (player.perks.has("MaraesGiftButtslut") && player.lowerBody.butt.analWetness < 2) { //Prevent Buttsluts from getting dry backdoors
				Render.text("\n<b>Your " + Game.ButtDescriptor.describeButthole(player) + " quickly re-moistens.  It looks like Marae's 'gift' can't be removed.</b>\n");
				player.lowerBody.butt.analWetness = 2;
				needNext = true;
			}
			if (player.pregnancyIncubation <= 0 && player.pregnancyType == PregnancyType.OVIELIXIR_EGGS) { //Fixing Egg Preg Preglocked Glitch
				player.knockUpForce(); //Clear Pregnancy
			}
			if (player.statusAffects.has("Uniball") && player.lowerBody.ballSize > 1 && player.lowerBody.balls > 0) { //Testicles Normalise:
				Render.text("\nYou feel a deep sensation of release around your genitals.  You sigh with relief and contentment as your testicles drop downwards and bloom outwards, heat throbbing within them as they split and form a proper ballsack.\n");
				player.statusAffects.remove("Uniball");
				needNext = true;
			}		
			if (!player.perks.has("Androgyny")) { //Fix femininity ratings if out of whack!
				let textHolder:string = player.fixFemininity();
				if (textHolder != "") {
					Render.text(textHolder, false);
					needNext = true;
				}
			}
			if (player.statusAffects.has("LustStickApplied")) { //Lust stick!
				player.statusAffects.get("LustStickApplied").value1 = -1; //Decrement!
				if (player.statusAffects.get("LustStickApplied").value1 <= 0) {
					player.statusAffects.remove("LustStickApplied");
					Render.text("<b>\nYour drugged lipstick fades away, leaving only the faintest residue on your lips.  You'll have to put on more if you want to be able to kiss your foes into submission!</b>\n");
				}
			}
			if (player.statusAffects.has("Luststick")) { //Luststic countdown
				player.statusAffects.get("Luststick").value1 = -1;
				if (rand(2) == 0 && player.lowerBody.cockSpot.hasCock()) { //50% chance to lust spike
					//Display if haven't displayed
					if (player.Flags.list[FlagEnum.PC_CURRENTLY_LUSTSTICK_AFFECTED] == 0) {
						Render.text("\nYour body tingles, practically a slave to the effects of harpy lipstick.  Blood surges to " + CockDescriptor.describeMultiCockSimpleOne(player) + ", making you groan out loud with forced pleasure.  Unasked-for fantasies assault you, and you spend a few moments fantasizing about fucking feathery women before you come to your senses.\n");
						Flags.list[FlagEnum.PC_CURRENTLY_LUSTSTICK_AFFECTED]++;
						needNext = true;
					}
					Game.player.stats.lust += .1;
					player.stats.lust += 20;
					if (player.stats.lust > 100) player.stats.lust = 100;
				}
				if (player.statusAffects.get("Luststick").value1 <= 0) {
					player.statusAffects.remove("Luststick");
					Render.text("\n<b>The lust-increasing effects of harpy lipstick have worn off!\n</b>");
					needNext = true;
				}
			}
			if (player.Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00285] >= 50 && !player.perks.has("LuststickAdapted")) { //Luststick resistance unlock
				Game.sophieBimbo.unlockResistance();
				if (player.statusAffects.has("Luststick")) player.statusAffects.remove("Luststick");
				needNext = true;
			}
			if (Flags.list[FlagEnum.DICK_EGG_INCUBATION] > 0) {
				Flags.list[FlagEnum.DICK_EGG_INCUBATION]--;
				trace("DICK BIRTH TIMER: " + Flags.list[FlagEnum.DICK_EGG_INCUBATION]);
				if (Flags.list[FlagEnum.DICK_EGG_INCUBATION] == 1) {
					Game.masturbation.birthBeeEggsOutYourWang();
					needNext = true;
				}
			}
			if (player.statusAffects.has("Eggchest")) { //Eggs in tits!
				player.statusAffects.get("Eggchest").value1 = -1;
				if (player.statusAffects.get("Eggchest").value1 <= 0) {
					Render.text("\n<b>You feel the rounded eggs within your [fullChest] vanishing, absorbed into your body.  </b>");
					player.growTits(player.statusAffects.get("Eggchest").value2, player.upperBody.chest.count(), true, 2);
					Render.text("\n");	
					player.statusAffects.remove("Eggchest");
					needNext = true;
				}
			}
			if (player.perks.has("SpiderOvipositor") || player.perks.has("BeeOvipositor")) { //Spider and Bee ovipositor updates
				if (player.perks.has("SpiderOvipositor") && (!player.lowerBody.isDrider() || player.lowerBody.tailType != TailType.SPIDER_ABDOMEN)) { //Remove dat shit!
					Render.text("\nYour ovipositor (and eggs) vanish since your body has become less spider-like.</b>\n");
					player.perks.remove("SpiderOvipositor");
					needNext = true;
				}
				else if (player.perks.has("BeeOvipositor") && player.lowerBody.tailType != TailType.BEE_ABDOMEN) { //Remove dat shit!
					Render.text("\nYour ovipositor (and eggs) vanish since your body has become less bee-like.</b>\n");
					player.perks.remove("BeeOvipositor");
					needNext = true;
				}
				else { //Update stuff!
					let prevEggs: number = player.eggs();
					if (prevEggs < 10) {
						player.addEggs(2);
					}
					else if (prevEggs < 20 && Game.model.time.hours % 2 == 0) {
						player.addEggs(1);
					}
					else if (Game.model.time.hours % 4 == 0) {
						player.addEggs(1);
					}
					if (prevEggs < 10 && player.eggs() >= 10) { //Stage 1 egg message
						if (player.perks.has("SpiderOvipositor")) {
							Render.text("\nYou feel a certain fullness building in your spider-half's abdomen.");
						}
						else {
							Render.text("\nYou feel a certain fullness building in your insectile abdomen.  You have some eggs ready... and you feel a strange urge to have them fertilized.");
							if (!player.lowerBody.vaginaSpot.hasVagina()) Render.text("  Wait, how would you even go about that?");
						}
						Render.text("  <b>You have enough eggs to lay!</b>\n");
						needNext = true;
					}
					else if (prevEggs < 20 && player.eggs() >= 20) { //Stage 2 egg message
						if (player.perks.has("SpiderOvipositor")) {
							Render.text("\nYour spider body feels like it's stretched taut, and a heavy warmth has spread throughout it.  The sensation of eggs piling up inside you is enough to drive you to distraction.  It would be a good idea to find somewhere to deposit them - but, oh, how great it would feel to get them fertilized by a nice hard cock first!");
							if (!player.lowerBody.vaginaSpot.hasVagina()) Render.text("  Wait, that's not right...");
						}
						else {
							Render.text("\nYour abdomen feels like it's stretched taut, and a heavy warmth has spread throughout it.  It swings pendulously with every movement you make, and the sensation of eggs piling up inside you is enough to drive you to distraction.");
						}
						Render.text("\n\n<b>Minimum Lust raised!</b>\n");
						needNext = true;
					}
					else if (prevEggs < 40 && player.eggs() >= 40) { //Stage 3 egg message
						if (player.perks.has("SpiderOvipositor")) {
							Render.text("\nYour lower half has become so heavy that it's difficult to move now, the weight of your eggs bearing down on your lust-addled frame.  Your ovipositor pokes from its hiding place, dripping its slick lubrication in anticipation of filling something, anything with its burden.  You're going to have to find someone to help relieve you of your load, and soon...\n\n<b>Minimum Lust raised!</b>\n");
						}
						else {
							Render.text("\nYour bee half has become so heavy that it's difficult to move now, the weight of your eggs bearing down on your lust-addled frame.  Your ovipositor pokes from its hiding place, dripping its sweet, slick lubrication in anticipation of filling something, anything with its burden.  You're going to have to find someone to help relieve you of your load, and soon...\n");
						}
						Game.player.stats.spe += -1;
						needNext = true;
					}
				}
			}
			if (player.perks.has("Oviposition") || player.perks.has("BunnyEggs")) { //Oviposition perk for lizard and bunny folks
				if ((player.nagaScore() + RaceScore.lizardScore(player) < 3) && player.perks.has("Oviposition") && !player.perks.has("BasiliskWomb")) { //--Lose Oviposition perk if lizard score gets below 3.
					Render.text("\nAnother change in your uterus ripples through your reproductive systems.  Somehow you know you've lost a little bit of reptilian reproductive ability.\n(<b>Perk Lost: Oviposition</b>)\n");
					player.perks.remove("Oviposition");
					needNext = true;
				}
				else if (RaceScore.bunnyScore(player) < 3 && player.perks.has("BunnyEggs")) { //--Lose Oviposition perk if bunny score gets below 3.
					Render.text("\nAnother change in your uterus ripples through your reproductive systems.  Somehow you know you've lost your ability to spontaneously lay eggs.\n(<b>Perk Lost: Bunny Eggs</b>)\n");
					player.perks.remove("BunnyEggs");
					needNext = true;
				}
				else if (player.pregnancyIncubation < 1 && player.lowerBody.vaginaSpot.hasVagina() && Game.model.time.hours == 1) { //Otherwise pregger check, once every morning
					if ((player.totalFertility() > 50 && Game.model.time.days % 15 == 0) || Game.model.time.days % 30 == 0) { //every 15 days if high fertility get egg preg
						Render.text("\n<b>Somehow you know that eggs have begun to form inside you.  You wonder how long it will be before they start to show?</b>\n");
						player.knockUp(PregnancyType.OVIELIXIR_EGGS, PregnancyType.INCUBATION_OVIELIXIR_EGGS, 1, 1);
						player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.Eggs, rand(6))), rand(2), (5 + rand(3)), 0); //v1 is type, v2 is size (1 == large) and v3 is quantity
						player.addPerkValue(PerkLib.Oviposition, 1, 1); //Count times eggpregged this way in perk.
						needNext = true;
					}
				}
			}
			if (player.inHeat) { //Heats v1 is bonus fertility, v2 is bonus libido, v3 is hours till it's gone
				if (player.statusAffects.get("$1").value3 <= 1 || player.lowerBody.vaginaSpot.count() == 0) { //Remove bonus libido from heat
					Game.dynStats("lib", -player.statusAffect(player.findStatusAffect(StatusAffects.Heat)).value2, "resisted", false, "noBimbo", true);
					player.statusAffects.remove("Heat"); //remove heat
					if (player.stats.lib < 1) player.stats.lib = 1;
					Game.statScreenRefresh();
					Render.text("\n<b>Your body calms down, at last getting over your heat.</b>\n");
					needNext = true;
				}
				else player.statusAffects.get("Heat").value3 = -1;
			}
			
			if (player.inRut) { //Rut v1 is bonus cum, v2 is bonus libido, v3 is hours till it's gone
				trace("RUT:" + player.statusAffects.get("$1").value3);
				if (player.statusAffects.get("$1").value3 <= 1 || player.lowerBody.cockSpot.count() == 0) { //Remove bonus libido from rut
					Game.dynStats("lib", -player.statusAffects.get("Rut").value2, "resisted", false, "noBimbo", true);
					player.statusAffects.remove("Rut"); //remove heat
					if (player.stats.lib < 10) player.stats.lib = 10;
					Game.statScreenRefresh();
					Render.text("\n<b>Your body calms down, at last getting over your rut.</b>\n");
					needNext = true;
				}
				else player.statusAffects.get("Rut").value3 = -1;
			}
			if (player.statusAffects.has("LustyTongue")) { //Lusty Tongue Check!
				if (rand(5) == 0) {
					Render.text("\nYou keep licking your lips, blushing with the sexual pleasure it brings you.");
					Game.dynStats("lus", 2 + rand(15));
					if (player.stats.lust >= 100) {
						Render.text("  Your knees lock from the pleasure, and you fall back in pleasure, twisting and moaning like a whore as you somehow orgasm from your mouth.  When it finishes, you realize your mouth feels even more sensitive than before.");
						player.orgasm();
						Game.player.stats.sens += 2;
						player.changeStatusValue(StatusAffects.LustyTongue, 1, player.statusAffects.get("LustyTongue").value1 + 10); //Tongue orgasming makes it last longer.
						
					}
					Render.text("\n");			
					needNext = true;
				}
				player.changeStatusValue(StatusAffects.LustyTongue, 1, player.statusAffects.get("LustyTongue").value1 - 1); //Decrement
				if (player.statusAffects.get("LustyTongue").value1 <= 0) {
					player.statusAffects.remove("LustyTongue");
					Render.text("\nYour mouth and tongue return to normal.\n");
					needNext = true;
				}
			}
			if (player.statusAffects.get("Kelt").value2 > 0) player.statusAffects.get("Kelt").value2 = -0.15; //Reduce kelt submissiveness by 1 every 5 hours
			//Mino cum update.
			if (Game.mountain.minotaurScene.minoCumUpdate()) {
				needNext = true;
			}
			else if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] >= 2 && Game.model.time.hours % 13 == 0 && Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00330] == 0) { //Repeated warnings!
				if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] == 2)
					Render.text("\n<b>You shiver, feeling a little cold.  Maybe you ought to get some more minotaur cum?  You just don't feel right without that pleasant buzz in the back of your mind.</b>\n");
				else if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] == 3)
					Render.text("\n<b>The steady fire of lust within you burns hot, making you shiver and grab at your head.  You're STILL in withdrawal after having gone so long without a dose of minotaur love.  You just know you're going to be horny and achy until you get some.</b>\n");
				needNext = true;
			}
			//Decrement mino withdrawal symptoms display cooldown
			//Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00330] prevents PC getting two of the same notices overnite
			else if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00330] > 0) Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00330]--;
			if (player.perks.has("FutaForm")) { //Futa checks
				if (!player.lowerBody.cockSpot.hasCock()) { //(Dick regrowth)
					player.lowerBody.cockSpot.add(new Cock());
					player.lowerBody.cockSpot.get(0).cockLength = 10;
					player.lowerBody.cockSpot.get(0).cockThickness = 2.75;
					Render.text("\n<b>As time passes, your loins grow itchy for a moment.  A split-second later, a column of flesh erupts from your crotch.  Your new, 10-inch cock pulses happily.");
					if (player.lowerBody.balls == 0) {
						Render.text("  A pair of heavy balls drop into place below it, churning to produce cum.");
						player.lowerBody.balls = 2;
						player.lowerBody.ballSize = 3;
					}
					Game.player.stats.int += -1;
player.stats.sens += 5;
player.stats.lust += 15;
					Render.text("</b>\n");
					needNext = true;
				}
				if (player.lowerBody.cockSpot.get(0).cockLength < 8) { //(Dick rebiggening) 
					Render.text("\n<b>As time passes, your cock engorges, flooding with blood and growing until it's at 8 inches long.  You really have no control over your dick.</b>\n");
					player.lowerBody.cockSpot.get(0).cockLength = 8;
					if (player.lowerBody.cockSpot.get(0).cockThickness < 2) player.lowerBody.cockSpot.get(0).cockThickness = 2;
					needNext = true;
				}
				if (player.lowerBody.balls == 0) { //(Balls regrowth)
					Render.text("\n<b>As time passes, a pressure in your loins intensifies to near painful levels.  The skin beneath " + CockDescriptor.describeMultiCockSimpleOne(player) + " grows loose and floppy, and then two testicles roll down to fill your scrotum.</b>\n");
					player.lowerBody.balls = 2;
					player.lowerBody.ballSize = 3;
					needNext = true;
				}
				if (player.upperBody.chest.get(0).breastRating < 5) { //Tits!
					player.upperBody.chest.get(0).breastRating = 5;
					if (player.perks.has("FutaFaculties"))
						Render.text("\n<b>Your tits get nice and full again.  You'll have lots of fun now that your breasts are back to being big, swollen knockers!</b>\n");
					else Render.text("\n<b>Your " + Game.BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + " have regained their former bimbo-like size.  It looks like you'll be stuck with large, sensitive breasts forever, but at least it'll help you tease your enemies into submission!</b>\n");
					Game.player.stats.int += -1;
player.stats.lust += 15;
					needNext = true;
				}
				if (!player.lowerBody.vaginaSpot.hasVagina()) { //Vagoo
					player.createVagina();
					if (player.perks.has("FutaFaculties"))
						Render.text("\n<b>Your crotch is like, all itchy an' stuff.  Damn!  There's a wet little slit opening up, and it's all tingly!  It feels so good, why would you have ever gotten rid of it?</b>\n");
					else Render.text("\n<b>Your crotch tingles for a second, and when you reach down to feel, your " + LowerBodyDescriptor.describeLegs(player) + " fold underneath you, limp.  You've got a vagina - the damned thing won't go away and it feels twice as sensitive this time.  Fucking bimbo liquer.</b>\n");
					Game.player.stats.int += -1;
player.stats.sens += 10;
player.stats.lust += 15;
					needNext = true;
				}
			}
			if (player.perks.has("BimboBody") || player.statusAffects.has("BimboChampagne")) { //Bimbo checks
				if (player.upperBody.chest.get(0).breastRating < 5) { //Tits!
					player.upperBody.chest.get(0).breastRating = 5;
					if (player.perks.has("BimboBrains") || player.statusAffects.has("BimboChampagne"))
						Render.text("\n<b>Your boobies like, get all big an' wobbly again!  You'll have lots of fun now that your tits are back to being big, yummy knockers!</b>\n");
					else Render.text("\n<b>Your " + Game.BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + " have regained their former bimbo-like size.  It looks like you'll be stuck with large, sensitive breasts forever, but at least it'll help you tease your enemies into submission!</b>\n");
					Game.player.stats.int += -1;
player.stats.lust += 15;
					needNext = true;
				}
				if (!player.lowerBody.vaginaSpot.hasVagina()) { //Vagoo
					player.createVagina();
					if (player.perks.has("BimboBrains") || player.statusAffects.has("BimboChampagne"))
						Render.text("\n<b>Your crotch is like, all itchy an' stuff.  Omigawsh!  There's a wet little slit opening up, and it's all tingly!  It feels so good, maybe like, someone could put something inside there!</b>\n");
					else Render.text("\n<b>Your crotch tingles for a second, and when you reach down to feel, your " + LowerBodyDescriptor.describeLegs(player) + " fold underneath you, limp.  You've got a vagina - the damned thing won't go away and it feels twice as sensitive this time.  Fucking bimbo liquer.</b>\n");
					needNext = true;
				}
				if (player.lowerBody.hipRating < 12) {
					if (player.perks.has("BimboBrains") || player.perks.has("FutaFaculties"))
						Render.text("\nWhoah!  As you move, your [hips] sway farther and farther to each side, expanding with every step, soft new flesh filling in as your hips spread into something more appropriate on a tittering bimbo.  You giggle when you realize you can't walk any other way.  At least it makes you look, like, super sexy!\n");
					else Render.text("\nOh, no!  As you move, your [hips] sway farther and farther to each side, expanding with every step, soft new flesh filling in as your hips spread into something more appropriate for a bimbo.  Once you realize that you can't walk any other way, you sigh heavily, your only consolation the fact that your widened hips can be used to tease more effectively.\n");
					Game.player.stats.int += -1;
					player.lowerBody.hipRating = 12;
					needNext = true;
				}
				if (player.lowerBody.butt.buttRating < 12) {
					if (player.perks.has("BimboBrains") || player.perks.has("FutaFaculties"))
						Render.text("\nGradually warming, you find that your [butt] is practically sizzling with erotic energy.  You smile to yourself, imagining how much you wish you had a nice, plump, bimbo-butt again, your hands finding their way to the flesh on their own.  Like, how did they get down there?  You bite your lip when you realize how good your tush feels in your hands, particularly when it starts to get bigger.  Are butts supposed to do that?  Happy pink thoughts wash that concern away - it feels good, and you want a big, sexy butt!  The growth stops eventually, and you pout disconsolately when the lusty warmth's last lingering touches dissipate.  Still, you smile when you move and feel your new booty jiggling along behind you.  This will be fun!\n");
					else Render.text("\nGradually warming, you find that your [butt] is practically sizzling with erotic energy.  Oh, no!  You thought that having a big, bloated bimbo-butt was a thing of the past, but with how it's tingling under your groping fingertips, you have no doubt that you're about to see the second coming of your sexy ass.  Wait, how did your fingers get down there?  You pull your hands away somewhat guiltily as you feel your buttcheeks expanding.  Each time you bounce and shake your new derriere, you moan softly in enjoyment.  Damnit!  You force yourself to stop just as your ass does, but when you set off again, you can feel it bouncing behind you with every step.  At least it'll help you tease your foes a little more effectively...\n");
					Game.player.stats.int += -1;
player.stats.lust += 10;
					player.lowerBody.butt.buttRating = 12;
					needNext = true;
				}
			}
			if (player.perks.has("BroBody")) { //Bro checks
				player.statusAffects.remove("Feeder");
				player.perks.remove("Feeder");
				if (!player.lowerBody.cockSpot.hasCock()) { //(Dick regrowth) 
					player.lowerBody.cockSpot.add(new Cock());
					player.lowerBody.cockSpot.get(0).cockLength = 10;
					player.lowerBody.cockSpot.get(0).cockThickness = 2.75;
					Render.text("\n<b>As time passes, your loins grow itchy for a moment.  A split-second later, a column of flesh erupts from your crotch.  Your new, 10-inch cock pulses happily.");
					if (player.lowerBody.balls == 0) {
						Render.text("  A pair of heavy balls drop into place below it, churning to produce cum.");
						player.lowerBody.balls = 2;
						player.lowerBody.ballSize = 3;
					}
					Render.text("</b>\n");
					needNext = true;
				}
				if (player.lowerBody.cockSpot.get(0).cockLength < 10) { //(Dick rebiggening)
					Render.text("\n<b>As time passes, your cock engorges, flooding with blood and growing until it's at 10 inches long.  ");
					if (player.perks.has("BroBrains")) Render.text("Goddamn, that thing is almost as tough as you!  ");
					Render.text("You really have no control over your dick.</b>\n");
					player.lowerBody.cockSpot.get(0).cockLength = 10;
					if (player.lowerBody.cockSpot.get(0).cockThickness < 2) player.lowerBody.cockSpot.get(0).cockThickness = 2;
					needNext = true;
				}
				if (player.lowerBody.balls == 0) { //(Balls regrowth)
					Render.text("\n<b>As time passes, a pressure in your loins intensifies to near painful levels.  The skin beneath " + CockDescriptor.describeMultiCockSimpleOne(player) + " grows loose and floppy, and then two testicles roll down to fill your scrotum.</b>\n");
					player.lowerBody.balls = 2;
					player.lowerBody.ballSize = 3;
					needNext = true;
				}
			}
			if (player.statusAffects.has("Feeder")) { //Feeder checks
				if (player.stats.cor <= 20) { //Go away if pure
					Render.text("\nThe desire to breastfeed fades into the background.  It must have been associated with the corruption inside you.\n\n(<b>You have lost the 'Feeder' perk.</b>)\n");
					player.statusAffects.remove("Feeder");
					player.perks.remove("Feeder");
					needNext = true;
				}
				else { //Bigga titayz
					if (player.upperBody.chest.get(0).breastRating < 5) {
						Render.text("\nYour " + Game.BreastDescriptor.describeBreastRow(player.upperBody.chest.get(0)) + " start to jiggle and wobble as time passes, seeming to refill with your inexhaustible supply of milk.  It doesn't look like you'll be able to keep them below a DD cup so long as you're so focused on breast-feeding.\n");
						player.upperBody.chest.get(0).breastRating = 5;
						needNext = true;
					}
					player.statusAffects.get("Feeder").value2 = 1; //Increase 'time since breastfed'
					//trace("Feeder status: " + player.statusAffects.get("Feeder").value2 + " (modded " + ((player.statusAffects.get("Feeder").value2) - 70) + ")");
					//After 3 days without feeding someone sensitivity jumps.
					if (player.statusAffects.get("Feeder").value2 >= 72 && Game.model.time.hours == 14) {
						Render.text("\n<b>After having gone so long without feeding your milk to someone, you're starting to feel strange.  Every inch of your skin practically thrums with sensitivity, particularly your sore, dripping nipples.</b>\n");
						Game.dynStats("sen", 2 + (((player.statusAffects.get("Feeder").value2) - 70) / 20));
						needNext = true;
					}
				}
			}
			if (player.statusAffects.has("WormPlugged") && Flags.list[FlagEnum.PLAYER_PREGGO_WITH_WORMS] == 0) { //Update worm drippy-cooch
				if (player.lowerBody.vaginaSpot.hasVagina()) {
					if (rand(5) == 0) {
						Flags.list[FlagEnum.PLAYER_PREGGO_WITH_WORMS] = 1;
						Render.text("\nA sudden gush of semen-coated worms noisily slurps out of your womb.  It runs down your legs as the worms do their damnedest to escape.  The feeling of so many squiggling forms squirting through your cunt-lips turns you on more than you'd like to admit.  You wonder why they stayed as long as they did, and some part of you worries that their stay may have reduced your capacity to bear children, though in a place like this that might be a blessing.\n");
						Game.dynStats("lus", 2 + player.stats.sens / 10);
						if (player.fertility > 5) player.fertility -= (1 + Math.round(player.fertility / 4));
						player.statusAffects.get("WormPlugged").value1 = -1; //Lower chances
						if (player.statusAffects.get("WormPlugged").value1 <= 0) { //Remove if too low
							player.statusAffects.remove("WormPlugged");
							player.knockUpForce(); //Clear worm 'pregnancy'
						}
						needNext = true;
					}
				}
				else { //Non cunts lose worm plugged
					player.statusAffects.remove("WormPlugged");
					player.knockUpForce(); //Clear worm 'pregnancy'
				}
			}				
			if (player.statusAffects.has("Milked")) { //"Milked"
				player.statusAffects.get("Milked").value1 = -1;
				if (player.statusAffects.get("Milked").value1 <= 0) {
					Render.text("\n<b>Your " + Game.BreastDescriptor.describeNipple(0) + "s are no longer sore from the milking.</b>\n");
					player.statusAffects.remove("Milked");
					needNext = true;
				}
			}
			if (player.statusAffects.has("Jizzpants")) {
				Render.text("\nYour " + player.inventory.armorSlot.equipment.displayName + " squishes wetly with all the semen you unloaded into them, arousing you more and more with every movement.\n");
				Game.dynStats("lus", 10 + player.stats.sens / 5);
				player.statusAffects.remove("Jizzpants");
				needNext = true;
			}
			if (player.statusAffects.has("Dysfunction")) {
				if (player.statusAffects.get("Dysfunction").value1 <= 1) {
					player.statusAffects.remove("Dysfunction");
					Render.text("\nYou feel a tingling in your nethers... at last full sensation has returned to your groin.  <b>You can masturbate again!</b>\n");
					needNext = true;
				}
				else player.statusAffects.get("Dysfunction").value1 = -1;
			}
			if (!player.statusAffects.has("LactationReduction")) { //Lactation reduction
				if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier > 0) player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.LactationReduction, 0, 0, 0, 0)));
			}
			else if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier > 0 && !player.statusAffects.has("Feeder") && player.pregnancyIncubation == 0) {
				player.statusAffects.get("LactationReduction").value1 = 1;
				if (player.statusAffects.get("LactationReduction").value1 >= 48) {
					if (!player.statusAffects.has("LactationReduc0")) {
						player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.LactationReduc0, 0, 0, 0, 0)));
						if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier >= 1) Render.text("\n<b>Your " + Game.BreastDescriptor.describeNipple(0) + "s feel swollen and bloated, needing to be milked.</b>\n");
						if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier <= 2) player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.LactationReduc1, 0, 0, 0, 0)));
						if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier <= 1) player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.LactationReduc2, 0, 0, 0, 0)));
						needNext = true;
					}
					player.boostLactation(-0.5 * player.upperBody.chest.count() / 24);
					if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier <= 2.5 && !player.statusAffects.has("LactationReduc1")) {
						Render.text("\n<b>Your breasts feel lighter as your body's milk production winds down.</b>\n");
						player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.LactationReduc1, 0, 0, 0, 0)));
						needNext = true;
					}
					else if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier <= 1.5 && !player.statusAffects.has("LactationReduc2")) {
						Render.text("\n<b>Your body's milk output drops down to what would be considered 'normal' for a pregnant woman.</b>\n");
						player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.LactationReduc2, 0, 0, 0, 0)));
						needNext = true;
					}
					if (player.upperBody.chest.LactationMultipierLargest[0].lactationMultiplier < 1 && !player.statusAffects.has("LactationReduc3")) {
						player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.LactationReduc3, 0, 0, 0, 0)));
						Render.text("\n<b>Your body no longer produces any milk.</b>\n");
						player.statusAffects.remove("LactationReduction");
						needNext = true;
					}
				}
			}
			if (player.statusAffects.has("CuntStretched")) { //Cunt stretching stuff
				player.statusAffects.get("CuntStretched").value1 = 1;
				if (player.lowerBody.vaginaSpot.count() > 0) {
					if (!player.perks.has("FerasBoonWideOpen")) {
						if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness == VaginaLooseness.LOOSE && player.statusAffects.get("CuntStretched").value1 >= 200) {
							Render.text("\nYour " + Game.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " recovers from your ordeals, tightening up a bit.\n");
							player.lowerBody.vaginaSpot.get(0).vaginalLooseness--;
							player.changeStatusValue(StatusAffects.CuntStretched, 1, 0);
							needNext = true;
						}
						if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness == VaginaLooseness.GAPING && player.statusAffects.get("CuntStretched").value1 >= 100) {
							Render.text("\nYour " + Game.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " recovers from your ordeals, tightening up a bit.\n");
							player.lowerBody.vaginaSpot.get(0).vaginalLooseness--;
							player.changeStatusValue(StatusAffects.CuntStretched, 1, 0);
							needNext = true;
						}
						if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness == VaginaLooseness.GAPING_WIDE && player.statusAffects.get("CuntStretched").value1 >= 70) {
							Render.text("\nYour " + Game.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " recovers from your ordeals and becomes tighter.\n");
							player.lowerBody.vaginaSpot.get(0).vaginalLooseness--;
							player.changeStatusValue(StatusAffects.CuntStretched, 1, 0);
							needNext = true;
						}
					}
					if (player.lowerBody.vaginaSpot.get(0).vaginalLooseness == VaginaLooseness.LEVEL_CLOWN_CAR && player.statusAffects.get("CuntStretched").value1 >= 50) {
						Render.text("\nYour " + Game.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " recovers from the brutal stretching it has received and tightens up a little bit, but not much.\n");
						player.lowerBody.vaginaSpot.get(0).vaginalLooseness--;
						player.changeStatusValue(StatusAffects.CuntStretched, 1, 0);
						needNext = true;
					}
				}
			}
			if (player.statusAffects.has("ButtStretched")) { //Butt stretching stuff
				player.statusAffects.get("ButtStretched").value1 = 1;
				if (player.lowerBody.butt.analLooseness == 2 && player.statusAffects.get("ButtStretched").value1 >= 72) {
					Render.text("\n<b>Your " + Game.ButtDescriptor.describeButthole(player) + " recovers from your ordeals, tightening up a bit.</b>\n");
					player.lowerBody.butt.analLooseness--;
					player.changeStatusValue(StatusAffects.ButtStretched, 1, 0);
					needNext = true;
				}
				if (player.lowerBody.butt.analLooseness == 3 && player.statusAffects.get("ButtStretched").value1 >= 48) {
					Render.text("\n<b>Your " + Game.ButtDescriptor.describeButthole(player) + " recovers from your ordeals, tightening up a bit.</b>\n");
					player.lowerBody.butt.analLooseness--;
					player.changeStatusValue(StatusAffects.ButtStretched, 1, 0);
					needNext = true;
				}
				if (player.lowerBody.butt.analLooseness == 4 && player.statusAffects.get("ButtStretched").value1 >= 24) {
					Render.text("\n<b>Your " + Game.ButtDescriptor.describeButthole(player) + " recovers from your ordeals and becomes tighter.</b>\n");
					player.lowerBody.butt.analLooseness--;
					player.changeStatusValue(StatusAffects.ButtStretched, 1, 0);
					needNext = true;
				}
				if (player.lowerBody.butt.analLooseness == 5 && player.statusAffects.get("ButtStretched").value1 >= 12) {
					Render.text("\n<b>Your " + Game.ButtDescriptor.describeButthole(player) + " recovers from the brutal stretching it has received and tightens up.</b>\n");
					player.lowerBody.butt.analLooseness--;
					player.changeStatusValue(StatusAffects.ButtStretched, 1, 0);
					needNext = true;
				}
			}
			if (player.perks.has("SlimeCore")) { //Lose slime core perk
				if (player.vaginalCapacity() < 9000 || player.skinAdj != "slimy" || player.skinDesc != "skin" || player.lowerBody != LowerBodyType.GOO) {
					Render.text("\nYour form ripples, as if uncertain at the changes your body is undergoing.  The goo of your flesh cools, its sensitive, responsive membrane thickening into " + player.skin() + " while bones and muscles knit themselves into a cohesive torso, chest and hips gaining definition.  Translucent ooze clouds and the gushing puddle at your feet melts together, splitting into solid trunks as you regain your legs.  Before long, you can no longer see through your own body and, with an unsteady shiver, you pat yourself down, readjusting to solidity.  A lurching heat in your chest suddenly reminds you of the slime core that used to float inside you.  Gingerly touching your " + Game.BreastDescriptor.describeChest(player) + ", you can feel a small, second heartbeat under your ribs that gradually seems to be sinking, past your belly. A lurching wave of warmth sparks through you, knocking you off your fresh legs and onto your " + Game.ButtDescriptor.describeButt(player) + ".  A delicious pressure pulses in your abdomen and you loosen your " + player.inventory.armorSlot.equipment.displayName + " as sweat beads down your neck.  You clench your eyes, tongue lolling in your mouth, and the pressure builds and builds until, in ecstatic release, your body arches in an orgasmic release.\n\n");
	
					Render.text("\nPanting, you open your eyes and see that, for once, the source of your climax wasn't your loins.  Feeling a warm, wetness on your abs, you investigate and find the small, heart-shaped nucleus that used to be inside your body has somehow managed to pass through your belly button. Exposed to the open air, the crimson organ slowly crystallizes, shrinking and hardening into a tiny ruby.  Rubbing the stone with your thumb, you're surprised to find that you can still feel a pulse within its glittering facets.  You stow the ruby heart, in case you need it again.\n");
					player.createKeyItem("Ruby Heart", 0, 0, 0, 0); //[Add 'Ruby Heart' to key items. Player regains slime core if returning to goo body]
					player.perks.remove("SlimeCore");
					needNext = true;
				}
			}
			if (player.hasKeyItem("Ruby Heart") >= 0) { //Regain slime core
				if (player.statusAffects.has("SlimeCraving") && !player.perks.has("SlimeCore") && player.lowerBody.isGoo() && player.gooScore() >= 4 && player.vaginalCapacity() >= 9000 && player.skinAdj == "slimy" && player.skinDesc == "skin" && player.lowerBody == LowerBodyType.GOO) {
					Render.text("\nAs you adjust to your new, goo-like body, you remember the ruby heart you expelled so long ago.  As you reach to pick it up, it quivers and pulses with a warm, cheerful light.  Your fingers close on it and the nucleus slides through your palm, into your body!\n\n");
					
					Render.text("There is a momentary pressure in your chest and a few memories that are not your own flicker before your eyes.  The dizzying sight passes and the slime core settles within your body, imprinted with your personality and experiences.  There is a comforting calmness from your new nucleus and you feel as though, with your new memories, you will be better able to manage your body's fluid requirements.\n");
					//(Reduces Fluid Addiction to a 24 hour intake requirement).
					Render.text("(<b>Gained New Perk: Slime Core - Moisture craving builds at a greatly reduced rate.</b>\n)");
					player.perks.add(new Perk("SlimeCore", 0, 0, 0, 0));
					player.removeKeyItem("Ruby Heart");
					needNext = true;
				}
			}
			if (player.statusAffects.has("SlimeCraving")) { //Slime craving stuff
				if (player.vaginalCapacity() < 9000 || player.skinAdj != "slimy" || player.skinDesc != "skin" || player.lowerBody != LowerBodyType.GOO) {
					Render.text("\n<b>You realize you no longer crave fluids like you once did.</b>\n");
					player.statusAffects.remove("SlimeCraving");
					player.statusAffects.remove("SlimeCravingFeed");
					needNext = true;
				}
				else { //Slime core reduces fluid need rate
					if (player.perks.has("SlimeCore"))
						player.statusAffects.get("SlimeCraving").value1 = 0.5;
					else player.statusAffects.get("SlimeCraving").value1 = 1;
					if (player.statusAffects.get("SlimeCraving").value1 >= 18) {
						if (!player.statusAffects.has("SlimeCravingOutput")) { //Protects against this warning appearing multiple times in the output
							player.statusAffects.add(StatusAffectFactory.create(StatusAffectType.SlimeCravingOutput, 0, 0, 0, 0)));
							Render.text("\n<b>Your craving for the 'fluids' of others grows strong, and you feel yourself getting weaker and slower with every passing hour.</b>\n");
							needNext = true;
						}
						if (player.stats.spe > 1) player.statusAffects.get("SlimeCraving").value3 = 0.1; //Keep track of how much has been taken from speed
						Game.dynStats("str", -0.1,"spe", -0.1, "lus", 2);
						player.statusAffects.get("SlimeCraving").value2 = 0.1; //Keep track of how much has been taken from strength
					}
				}
			}
			if (player.statusAffects.has("SlimeCravingFeed")) { //Slime feeding stuff
				Render.text("\n<b>You feel revitalized from your recent intake, but soon you'll need more...</b>\n");
				Game.dynStats("str", player.statusAffects.get("SlimeCraving").value2 * 0.5, "spe", player.statusAffects.get("$1").value3); //Boost speed and restore half the player's lost strength
				player.statusAffects.remove("SlimeCravingFeed"); //Remove feed succuss status so it can be reset
				player.changeStatusValue(StatusAffects.SlimeCraving, 2, 0); //Reset stored hp/toughness values
				needNext = true;
			}
			if (Game.model.time.hours == 6 && player.inventory.armorSlot.equipment.displayName == "bimbo skirt" && rand(10) == 0) {
				Render.text("\n<b>As you wake up, you feel a strange tingling starting in your nipples that extends down into your breasts.  After a minute, the tingling dissipates in a soothing wave.  As you cup your tits, you realize they've gotten larger!</b>");
				player.growTits(1, player.upperBody.chest.count(), false, 2);
				Game.player.stats.lust += 10;
				needNext = true;
			}
			if (Flags.list[FlagEnum.BIKINI_ARMOR_BONUS] > 0) {
				if (player.inventory.armorSlot.equipment.displayName == "lusty maiden's armor") {
					if (Game.model.time.hours == 0) Flags.list[FlagEnum.BIKINI_ARMOR_BONUS]--; //Adjust for inflation
					if (Flags.list[FlagEnum.BIKINI_ARMOR_BONUS] < 0) Flags.list[FlagEnum.BIKINI_ARMOR_BONUS] = 0; //Keep in bounds.
					if (Flags.list[FlagEnum.BIKINI_ARMOR_BONUS] > 8) Flags.list[FlagEnum.BIKINI_ARMOR_BONUS] = 8;
				}
				else Flags.list[FlagEnum.BIKINI_ARMOR_BONUS] = 0;
			}
			
			//No better place for these since the code for the event is part of CoC.as or one of its included files
			if (Flags.list[FlagEnum.TIME_SINCE_VALA_ATTEMPTED_RAPE_PC] > 0) Flags.list[FlagEnum.TIME_SINCE_VALA_ATTEMPTED_RAPE_PC]--; //Vala post-rape countdown
			if (Flags.list[FlagEnum.GATS_ANGEL_TIME_TO_FIND_KEY] > 0 && Flags.list[FlagEnum.GATS_ANGEL_TIME_TO_FIND_KEY] < 500) Flags.list[FlagEnum.GATS_ANGEL_TIME_TO_FIND_KEY]++;
			
			if (Game.model.time.hours > 23) { //Once per day
				Flags.list[FlagEnum.BROOKE_MET_TODAY] = 0;
				if (Game.model.time.days % 2 == 0 && Flags.list[FlagEnum.KAIJU_BAD_END_COUNTER] > 0) {
					Flags.list[FlagEnum.KAIJU_BAD_END_COUNTER]--;
					if (Flags.list[FlagEnum.KAIJU_BAD_END_COUNTER] < 0) Flags.list[FlagEnum.KAIJU_BAD_END_COUNTER] = 0;
				}
				if (Flags.list[FlagEnum.GILDED_JERKED] > 0) Flags.list[FlagEnum.GILDED_JERKED] = 0;
				if (Flags.list[FlagEnum.FED_SCYLLA_TODAY] == 1) Flags.list[FlagEnum.FED_SCYLLA_TODAY] = 0;
				if (Flags.list[FlagEnum.NOT_HELPED_ARIAN_TODAY] != 0) Flags.list[FlagEnum.NOT_HELPED_ARIAN_TODAY] = 0;
				if (Flags.list[FlagEnum.RUBI_PROSTITUTION] > 0) Flags.list[FlagEnum.RUBI_PROFIT] += 2 + rand(4);
				Flags.list[FlagEnum.BENOIT_TALKED_TODAY] = 0;
				Game.bazaar.benoit.updateBenoitInventory();
				Flags.list[FlagEnum.ROGAR_FUCKED_TODAY] = 0;
				if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00285] > 0) Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00285]--; //Reduce lust-stick resistance building
				if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00155] > 0) { //Dominika fellatrix countdown
					Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00155]--;
					if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00155] < 0) Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00155] = 0;
				}
				if (Flags.list[FlagEnum.LOPPE_DENIAL_COUNTER] > 0) { //Loppe denial counter
					Flags.list[FlagEnum.LOPPE_DENIAL_COUNTER]--;
					if (Flags.list[FlagEnum.LOPPE_DENIAL_COUNTER] < 0) Flags.list[FlagEnum.LOPPE_DENIAL_COUNTER] = 0;
				}
				if (Flags.list[FlagEnum.WEEKLY_FAIRY_ORGY_COUNTDOWN] > 0) { //Countdown to next faerie orgy
					Flags.list[FlagEnum.WEEKLY_FAIRY_ORGY_COUNTDOWN]--;
					if (Flags.list[FlagEnum.WEEKLY_FAIRY_ORGY_COUNTDOWN] < 0) Flags.list[FlagEnum.WEEKLY_FAIRY_ORGY_COUNTDOWN] = 0;
				}
				if (Game.model.time.days % 7 == 0) Flags.list[FlagEnum.WHITNEY_GEMS_PAID_THIS_WEEK] = 0; //Clear Whitney's Weekly limit
				if (Flags.list[FlagEnum.USED_MILKER_TODAY] > 0) Flags.list[FlagEnum.USED_MILKER_TODAY] = 0; //Clear 'has fucked milker today'
				if (Game.latexGirl.latexGooFollower()) { //Latex goo follower daily updates
					Game.latexGirl.gooFluid(-2, false);
					if (Game.latexGirl.gooFluid() < 50) Game.latexGirl.gooHappiness(-1, false);
					if (Game.latexGirl.gooFluid() < 25) Game.latexGirl.gooHappiness(-1, false);
					if (Game.latexGirl.gooHappiness() < 75) Game.latexGirl.gooObedience(-1, false);
					if (Game.latexGirl.gooHappiness() >= 90) Game.latexGirl.gooObedience(1, false);
				}
				Game.farm.farmCorruption.updateFarmCorruption(); //Farm Corruption updating
				if (player.statusAffects.has("Contraceptives")) { // Herbal contraceptives countdown
					if (player.statusAffects.get("Contraceptives").value1 == 1) {
						player.statusAffects.get("Contraceptives").value2 = -1;
						if (player.statusAffects.get("Contraceptives").value1 < 0) player.statusAffects.remove("Contraceptives");
					}
				}
				if (player.statusAffects.get("SharkGirl").value1 > 0) player.statusAffects.get("SharkGirl").value1 = -1; //Lower shark girl counter
				if (flags[FlagEnum.INCREASED_HAIR.GROWTH_TIME_REMAINING] > 0) {
					switch (flags[FlagEnum.INCREASED_HAIR.GROWTH_SERUM_TIMES_APPLIED]) {
						case 1:
							if (!needNext) needNext = Game.growHair(0.2);
							else Game.growHair(0.2);
							break;
						case 2:
							if (!needNext) needNext = Game.growHair(0.5);
							else Game.growHair(0.5);
							break;
						case 3:
							if (!needNext) needNext = Game.growHair(1.1);
							else Game.growHair(1.1);
						default:
					}
					flags[FlagEnum.INCREASED_HAIR.GROWTH_TIME_REMAINING]--;
					//reset hair growth multiplier and timer when 
					//expired.
					if (flags[FlagEnum.INCREASED_HAIR.GROWTH_TIME_REMAINING] <= 0) {
						flags[FlagEnum.INCREASED_HAIR.GROWTH_TIME_REMAINING] = 0;
						flags[FlagEnum.INCREASED_HAIR.GROWTH_SERUM_TIMES_APPLIED] = 0;
						Render.text("<b>\nThe tingling on your scalp slowly fades away as the hair extension serum wears off.  Maybe it's time to go back to the salon for more?</b>");
						//Restart hair growth if wuz lizard-stopped
						if (Flags.list[FlagEnum.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] > 0) {
							Flags.list[FlagEnum.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] = 0;
							Render.text("  <b>You hair is now growing normally again.</b>");
						}
						Render.text("\n");
						needNext = true;
					}
				}
				//Hair grows if not disabled by lizardness
				if (Flags.list[FlagEnum.HAIR_GROWTH_STOPPED_BECAUSE_LIZARD] == 0) {
					if (!needNext) needNext = Game.growHair(0.1);
					else Game.growHair(0.1);
				}
				//Clear dragon breath cooldown!
				if (player.statusAffects.has("DragonBreathCooldown")) player.statusAffects.remove("DragonBreathCooldown");
			}
			return needNext;
		}
		
		public timeChangeLarge():boolean {
			if (rand(4) == 0 && Game.isHolidays() && player.gender > 0 && Game.model.time.hours == 6 && Flags.list[FlagEnum.XMAS_CHICKEN_YEAR] < Game.date.fullYear) {
				Game.getAChristmasChicken();
				return true;
			}
			if (Game.model.time.hours == 1 && Game.isHolidays() && Game.date.fullYear > Flags.list[FlagEnum.PC_ENCOUNTERED_CHRISTMAS_ELF_BEFORE]) { //XMAS ELF
				Game.xmasBitchEncounter(); //Set it to remember the last year encountered
				return true;
			}
			if (checkedTurkey++ == 0 && (rand(5) == 0 && (Game.model.time.hours == 18 || Game.model.time.hours == 19)) && (Game.date.fullYear > Flags.list[FlagEnum.TURKEY_FUCK_YEAR_DONE] || Flags.list[FlagEnum.MORE_TURKEY] > 0) && Game.isThanksgiving() && player.gender > 0) {
				Game.datTurkeyRumpMeeting(); //TURKEY SURPRISE
				return true;
			}
			if (checkedDream++ == 0 && Game.model.time.hours == 3) { //You can only have one dream each night
				if (player.gender > 0 && Game.model.time.days == 10) { //Day 10 dream - since this can happen only once it takes priority over all other dreams
					Game.dayTenDreams();
					return true;
				}
				if (player.lowerBody.cockSpot.hasCock() && player.perks.has("BeeOvipositor") && (player.eggs() >= 20 && rand(6) == 0)) { //Bee dreams proc
					//happens at first sleep after hitting stage 3 unfertilized
					//To Wong Foo, Thanks for Everything, Julie Newmar
					Render.text("\nYou sit atop your favorite flower, enjoying the smell of verdure and the sounds of the forest.  The sun is shining brightly and it feels wonderful on your chitin.  Your wings twitch happily in the soft breeze, and it feels good to be alive and doing the colony's work... the only sour note is your heavy, bloated abdomen, so full of unfertilized eggs that it droops, so full it strains your back and pinches your nerves.  Still, it's too nice a day to let that depress you, and you take up your customary song, humming tunelessly but mellifluously as you wait for passers-by.");
					
					Render.text("\n\nYour antennae bob - was that someone?  Peering between the trees from the corner of your eye, you can see the figure of another person, and you intensify your hypnotic buzz, trying to draw it closer.  The figure steps into your clearing and out of the shadow; clad in " + player.inventory.armorSlot.equipment.displayName + ", " + player.mf("he","she") + " is yourself!  Confused, you stop humming and stare into your own face, and the other you takes the opportunity to open " + player.mf("his","her") + " garments, exposing " + player.mf("his","her") + " [cock]!");
					
					Render.text("\n\nStartled, you slip down from your seat and try to run, but the other you has already crossed the clearing and seizes you by the fuzz on your hefty, swollen abdomen; your leg slips, propelling you face-first to the ground.  " + player.mf("He","She") + " pulls you back toward " + player.mf("his","her") + "self and, grabbing one of your chitinous legs, turns you over.  The other you spreads your fuzzed thighs, revealing your soft, wet pussy, and the sweet smell of honey hits your noses.  " + player.mf("His","Her") + " prick hardens intensely and immediately at the aroma of your pheromone-laden nectar, and " + player.mf("he","she") + " pushes it into you without so much as a word of apology, groaning as " + player.mf("he","she") + " begins to rut you mercilessly.  You can feel the sensations of " + player.mf("his","her") + " burning cock as if it were your own, and your legs wrap around your other self instinctively even as your mind recoils in confusion.");
					
					Render.text("\n\nThe other you grunts and locks up as " + player.mf("his","her") + "... your [cock] begins to spurt inside your honey-drooling cunt, and " + player.mf("he","she") + " falls onto you, bottoming out inside; your vagina likewise clenches and squirts your sweet juices.  As " + player.mf("he","she") + " ejaculates, thrusting weakly, you can feel something shifting in you, filling you with pins and needles... it feels like the warm cum " + player.mf("he","she") + "'s filling you with is permeating your entire groin, working its way back toward your abdomen.  It edges up to your massive buildup of eggs, and your body tightens in a second climax at the thought of having your children fertilized-");
					
					Render.text("\n\nYou snap awake, sitting bolt upright.  What in the name of... your " + CockDescriptor.describeMultiCockShort(player) + " is softening rapidly, and as you shift, you can feel your cum sloshing in your [armor].  For fuck's sake.");
					if (player.cumQ() >= 1000) Render.text("  It's completely soaked your bedroll, too... you won't be sleeping on this again until you wash it out.  Grumbling, you roll the soggy, white-stained fabric up and stow it.");
					Render.text("  The sensation of wetness inside your own clothes torments you as you try to return to sleep, driving up your lust and making you half-hard once again... the rumbling of eggs in your abdomen, as if they're ready to be laid, doesn't help either.");
					player.fertilizeEggs(); //convert eggs to fertilized based on player cum output, reduce lust by 100 and then add 20 lust
					player.orgasm(); //reduce lust by 100 and add 20, convert eggs to fertilized depending on cum output
					Game.player.stats.lust += 20;
					Game.doNext(playerMenu);
					//Hey Fenoxo - maybe the unsexed characters get a few \"cock up the ovipositor\" scenes for fertilization with some characters (probably only willing ones)?
					//Hey whoever, maybe you write them? -Z
					return true;
				}
				if (player.lowerBody.cockSpot.hasCock() && player.perks.has("SpiderOvipositor") && (player.eggs() >= 20 && rand(6) == 0)) { //Drider dreams proc
					Render.text("\nIn a moonlit forest, you hang upside down from a thick tree branch suspended by only a string of webbing.  You watch with rising lust as a hapless traveler strolls along below, utterly unaware of the trap you've set.  Your breath catches as " + player.mf("he","she") + " finally encounters your web, flailing against the sticky strands in a futile attempt to free " + player.mf("him","her") + "self.  Once the traveller's struggles slow in fatigue, you descend easily to the forest floor, wrapping " + player.mf("him","her") + " in an elegant silk cocoon before pulling " + player.mf("him","her") + " up into the canopy.  Positioning your catch against the tree's trunk, you sink your fangs through the web and into flesh, feeling " + player.mf("his","her") + " body heat with every drop of venom.  Cutting " + player.mf("his","her") + " crotch free of your webbing, you open " + player.mf("his","her") + " [armor] and release the ");
					if (player.lowerBody.vaginaSpot.hasVagina()) Render.text(Game.VaginaDescriptor.describeVagina(player, player.lowerBody.vaginaSpot.get(0)) + " and ");
					Render.text(Game.CockDescriptor.describeCock(player, 0) + " therein; you lower yourself onto " + player.mf("him","her") + " over and over again, spearing your eager pussy with " + player.mf("him","her") + " prick");
					if (player.lowerBody.vaginaSpot.hasVagina()) Render.text(" while you bend and force your own into her cunt");
					Render.text(".  It's not long until you feel ");
					if (player.lowerBody.vaginaSpot.hasVagina()) Render.text("her pussy clenching around you as you orgasm explosively inside, followed by ");
					Render.text("the sensation of warm wetness in your own vagina.  Your prisoner groans as " + player.mf("his","her") + " cock twitches and spasms inside you, spraying your insides with seed; warm, delicious, sticky seed for your eggs.  You can feel it drawing closer to your unfertilized clutch, and as the gooey heat pushes toward them, your head swims, and you finally look into your prey's [face]...");
					
					Render.text("\n\nYour eyes flutter open.  What a strange dream... aw, dammit.  You can feel your [armor] rubbing against your crotch, sodden with cum.  ");
					if (player.cumQ() > 1000) Render.text("It's all over your bedroll, too...");
					Render.text("  Turning over and trying to find a dry spot, you attempt to return to sleep... the wet pressure against your crotch doesn't make it easy, nor do the rumbles in your abdomen, and you're already partway erect by the time you drift off into another erotic dream.  Another traveler passes under you, and you prepare to snare her with your web; your ovipositor peeks out eagerly and a bead of slime drips from it, running just ahead of the first fertilized egg you'll push into your poor victim...");
					player.fertilizeEggs(); //reduce lust by 100 and add 20, convert eggs to fertilized depending on cum output
					player.orgasm();
					Game.player.stats.lust += 20;
					Game.doNext(playerMenu);
					//Hey Fenoxo - maybe the unsexed characters get a few \"cock up the ovipositor\" scenes for fertilization with some characters (probably only willing ones)?
					//Hey whoever, maybe you write them? -Z
					return true;
				}
				let ceraph: number; //Ceraph's dreams - overlaps normal night-time dreams.
				switch (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00218] + Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00219] + Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00220]) {
					case  0: ceraph =  0; break; //If you've given her no body parts then Ceraph will not cause any dreams
					case  1: ceraph = 10; break; //Once every 10 days if 1, once every 7 days if 2, once every 5 days if 3
					case  2: ceraph =  7; break;
					case  3: ceraph =  5; break;
					case  4: ceraph =  4; break;
					default: ceraph =  3;
				}
				if (ceraph > 0 && Game.model.time.days % ceraph == 0) {
					Game.ceraphScene.ceraphBodyPartDreams();
					return true;
				}
				if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00157] > 0 && Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00157] < 4) { //Dominika Dream
					Render.text("\n<b>Your rest is somewhat troubled with odd dreams...</b>\n");
					Game.telAdre.dominika.fellatrixDream();
					return true;
				}
				if (Game.anemoneScene.kidAXP() >= 40 && Flags.list[FlagEnum.HAD_KID_A_DREAM] == 0 && player.gender > 0) {
					Game.anemoneScene.kidADreams();
					Flags.list[FlagEnum.HAD_KID_A_DREAM] = 1;
					return true;
				}
				if (player.viridianChange()) {
					Game.fuckedUpCockDreamChange();
					return true;
				}
				if (player.stats.lib > 50 || player.stats.lust > 40) { //Randomly generated dreams here
					if (Game.dreamSelect()) return true;
				}
			}
			if (player.statusAffects.get("SlimeCraving").value1 >= 18 && player.stats.str <= 1) { //Bad end!
				Game.lake.gooGirlScene.slimeBadEnd();
				return true;
			}
			if (player.lowerBody.cockSpot.hasCock() && player.lowerBody.cockSpot.get(0).cockType == CockType.BEE && player.stats.lust >= 100) {
				Render.text("\nYou can’t help it anymore, you need to find the bee girl right now.  You rush off to the forest to find the release that you absolutely must have.  Going on instinct you soon find the bee girl's clearing and her in it.\n\n");
				Game.forest.beeGirlScene.beeSexForCocks(false);
				return true;
			}
			return false;
		}
		//End of Interface Implementation
	}
}
