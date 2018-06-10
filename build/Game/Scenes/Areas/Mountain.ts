/**
 * Created by aimozg on 06.01.14.
 */
export class Mountain {
	public let hellHoundScene:HellHoundScene = new HellHoundScene();
	public let infestedHellhoundScene:InfestedHellhoundScene = new InfestedHellhoundScene();
	public let minotaurScene:MinotaurScene = new MinotaurScene();
	public let salon:Salon = new Salon();
	//Explore Mountain
	public exploreMountain(): void {
		player.exploredMountain++;
		let chooser: number = randInt(4);
		//Helia monogamy fucks
		if (Flags.list[FlagEnum.PC_PROMISED_HEL_MONOGAMY_FUCKS] === 1 && Flags.list[FlagEnum.HEL_RAPED_TODAY] === 0 && randInt(10) === 0 && player.gender > 0 && !kGAMECLASS.helScene.followerHel()) {
			kGAMECLASS.helScene.helSexualAmbush();
			return;
		}
		//Discover 'high mountain' at level 5 or 40 explores of mountain
		if ((player.level >= 5 || player.exploredMountain >= 40) && Flags.list[FlagEnum.DISCOVERED_HIGH_MOUNTAIN] === 0) {
			DisplayText("While exploring the mountain, you come across a relatively safe way to get at its higher reaches.  You judge that with this route you'll be able to get about two thirds of the way up the mountain.  With your newfound discovery fresh in your mind, you return to camp.\n\n(<b>High Mountain exploration location unlocked!</b>)", true);
			Flags.list[FlagEnum.DISCOVERED_HIGH_MOUNTAIN]++;
			return { next: Scenes.camp.returnToCampUseOneHour };
			return;
		}
		if (isHolidays()) {
			//Gats xmas adventure!
			if (randInt(5) === 0 && player.gender > 0 && isHolidays() && Flags.list[FlagEnum.GATS_ANGEL_DISABLED] === 0 && Flags.list[FlagEnum.GATS_ANGEL_GOOD_ENDED] === 0 && (Flags.list[FlagEnum.GATS_ANGEL_QUEST_BEGAN] > 0 && player.hasKeyItem("North Star Key") < 0)) {
				kGAMECLASS.gatsSpectacularRouter();
				return;
			}
			if (randInt(6) === 0 && Flags.list[FlagEnum.JACK_FROST_YEAR] < date.fullYear && silly()) {
				kGAMECLASS.meetJackFrostInTheMountains();
				return;
			}
		}
		//8% chance of hellhoundsplosions if appropriate
		if (randInt(100) <= 77) {
			if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00141] < 3) {
				trace("CHANCE AT HELLHOUND GAO");
				//Requires canine face, [either two dog dicks, or a vag and pregnant with a hellhound], at least two other hellhound features (black fur, dog legs, dog tail), and corruption >=60.
				if (player.torso.neck.head.face.type === FaceType.DOG && (player.torso.cocks.filter(Cock.FilterType(CockType.DOG) >= 2 || (player.torso.vaginas.count > 0 && player.pregnancyType === PregnancyType.HELL_HOUND)) && player.stats.cor >= 60 && player.torso.tailType === TailType.DOG && (player.hips.legs.type === LegType.DOG || player.torso.neck.head.hair.color === "midnight black"))).length {
					trace("PASS BODYCHECK");
					if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00141] === 0) {
						hellHoundScene.HellHoundMasterEncounter();
						return;
					}
					//Level 2 requires lethecite
					else if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00141] === 1 && player.hasKeyItem("Marae's Lethicite") >= 0 && player.keyItemv2("Marae's Lethicite") < 3) {
						hellHoundScene.HellHoundMasterEncounter();
						return;
					}
				}
			}
		}
		//Rarer 'nice' Ceraph encounter
		//Overlaps half the old encounters once pierced.
		if (!kGAMECLASS.ceraphFollowerScene.ceraphIsFollower() && player.level > 2 && (player.exploredMountain % 30 === 0) && Flags.list[FlagEnum.PC_FETISH] > 0) {
			kGAMECLASS.ceraphScene.friendlyNeighborhoodSpiderManCeraph();
			return;
		}
		//15% chance of Ceraph
		if (!kGAMECLASS.ceraphFollowerScene.ceraphIsFollower() && player.level > 2 && (player.exploredMountain % 15 === 0) && Flags.list[FlagEnum.PC_FETISH] != 1) {
			kGAMECLASS.ceraphScene.encounterCeraph();
			return;
		}
		//10% chance of hairdresser encounter if not found yet
		if (randInt(10) === 0 && !player.statusAffects.has(StatusAffectType.HairdresserMeeting)) chooser = 4;
		if ((randInt(8) === 0 && player.statusAffects.has(StatusAffectType.MetMarae))
			&& !player.statusAffects.has(StatusAffectType.FoundFactory)) {
			kGAMECLASS.enterFactory();
			return;
		}
		//Boosts mino and hellhound rates!
		if (player.perks.has(PerkType.PiercedFurrite) && randInt(3) === 0) {
			if (randInt(2) === 0) chooser = 1;
			else chooser = 3;
		}
		//10% chance to mino encounter rate if addicted
		if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] > 0 && randInt(10) === 0) {
			chooser = 1;
		}
		//10% MORE chance for minos if uber-addicted
		if (player.perks.has(PerkType.MinotaurCumAddict) && randInt(10) === 0) {
			chooser = 1;
		}
		//Every 15 explorations chance at mino bad-end!
		if (player.exploredMountain % 16 === 0 && player.perks.has(PerkType.MinotaurCumAddict)) {
			DisplaySprite(44);
			minotaurScene.minoAddictionBadEndEncounter();
			return;
		}
		if (chooser === 0) {
			//Determines likelyhood of imp/goblins
			//Below - goblin, Equal and up - imp
			let impGob: number = 5;
			if (player.perks.has(PerkType.PiercedLethite)) {
				if (impGob <= 3) impGob += 2;
				else if (impGob < 7) impGob = 7;
			}
			trace("IMP/Gobb");
			//Dicks + lots of cum boosts goblin probability
			//Vags + Fertility boosts imp probability
			if (player.torso.cocks.count > 0) impGob--;
			if (player.torso.vaginas.count > 0) impGob++;
			if (player.totalFertility() >= 30) impGob++;
			if (player.cumQ() >= 200) impGob--;
			//Imptacular Encounter
			if (randInt(10) < impGob) {
				if (player.level >= 8 && randInt(2) === 0) {
					kGAMECLASS.impScene.impLordEncounter();
				}
				else {
					DisplayText("An imp leaps out from behind a rock and attacks!", true);
					startCombat(new Imp());
				}
				DisplaySprite(29);
				return;
			}
			//Encounter Gobbalin!
			else {
				//50% of the time, goblin assassin!
				if (player.level >= 10 && randInt(2) === 0) {
					kGAMECLASS.goblinAssassinScene.goblinAssassinEncounter();
					return;
				}
				if (player.gender > 0) {
					DisplayText("A goblin saunters out of the bushes with a dangerous glint in her eyes.\n\nShe says, \"<i>Time to get fucked, " + player.mf("stud", "slut"), true);
					DisplayText(".</i>\"");
					startCombat(new Goblin());
					DisplaySprite(24);
					return;
				}
				else {
					DisplayText("A goblin saunters out of the bushes with a dangerous glint in her eyes.\n\nShe says, \"<i>Time to get fuc-oh shit, you don't even have anything to play with!  This is for wasting my time!", true);
					DisplayText("</i>\"");
					startCombat(new Goblin());
					DisplaySprite(24);
					return;
				}
			}
		}
		//Minotauuuuur
		if (chooser === 1) {
			DisplaySprite(44);
			if (!player.statusAffects.has(StatusAffectType.TF2) && player.level <= 1 && player.stats.str <= 40) {
				if (silly()) {
					//(Ideally, this should occur the first time the player would normally get an auto-rape encounter with the minotaur. The idea is to give a breather encounter to serve as a warning of how dangerous the mountain is)
					DisplayText("Crossing over the treacherous mountain paths, you walk past an ominous cave.  The bones and the smell of death convince you to hasten your pace.  However, as you walk by, you hear a deep bellow and a snort as a monstrous man with a bull's head steps out.  With hell in his eyes and a giant ax in his hand, he begins to approach you in clear rage.  As he comes out into the light, you see that he is completely naked and sports a monstrous erection as angry as the minotaur himself, freely leaking a steady stream of pre-cum as he stalks you.\n\n", true);
					DisplayText("You stumble in your attempt to escape and realize that you are completely helpless.  The minotaur towers over you and heaves his ax for a <i>coup de grace</i>.  As he readies the blow, a monstrous explosion rocks the entire mountainside, causing the bull-man to stumble before he can finish you off. You look around, bewildered, trying to understand this strange new turn of events, and notice a group of maybe half a dozen people approaching from further up the path.  They appear to be a motley crew clad in blue and carrying monstrous weapons.  The tallest man holds a weapon made of multiple rotating tubes, and begins spinning the barrels.  A second later, while screaming in a language you do not understand, a rain of lead begins shredding the minotaur into a cloud of blood and flesh.\n\n");
					DisplayText("An equally imposing black man with a patch over one eye begins firing canisters at the beast, which explode violently.  \"<i>Ya ragged-arsed beast man!</i>\" he taunts.  \"<i>Ye should pick on someone yer own size, BOY-O! HEHEHE!</i>\"\n\n");
					DisplayText("Coming up the path next is a freak of a person clad in a contained shiny suit with a weapon that burns with flame.  He freely walks into the explosions and gunfire and begins igniting the beast.\n\n");
					DisplayText("\"<i>MRPHHUMFHRUFH!!!!! HUMFHUFMMRUF!</i>\" the freak mumbles through his mask.\n\n");
					DisplayText("\"<i>I like me steak well done, ye crazy bugger!</i>\" yells the black man.\n\n");
					DisplayText("The beast collapses in a charred and bloody heap.   As you stand back up, you hear a strange noise behind you.  You turn around to find a well-dressed man wearing a ski mask and smoking a cigarette.  \"<i>Don't you know ze mountains are dangereuse,</i>\" the man says with a thick accent.  \"<i>You will get FUCKED up here if you are not careful.</i>\"\n\n");
					DisplayText("You thank the man and his team, but they brush off your gratitude.  \"<i>Non, non!</i>\" the man with the accent says.  \"<i>As zey say, everyone gets ONE.</i>\" With that, he touches the watch on his wrist and disappears.  The rest of the group continues on their way.\n\n");
					DisplayText("As they leave, the giant with the chain gun yells in a horribly accented manner, \"<i>YOU LEAVE SANDVICH ALONE! SANDVICH IS MINE!</i>\"\n\n");
					DisplayText("With that, another hail of bullets break the scene as they walk away, leaving you safe from the minotaur, but utterly baffled as to what in hell just happened.");
				}
				else {
					DisplayText("Crossing over the treacherous mountain paths, you walk past an ominous cave.  The bones and the smell of death convince you to hasten your pace.  However, as you walk by, you hear a deep bellow and a snort as a monstrous man with a bull's head steps out.  With hell in his eyes and a giant ax in his hand, he begins to approach you in clear rage.  As he comes out into the light, you see that he is completely naked and sports a monstrous erection as angry as the minotaur himself, freely leaking a steady stream of pre-cum as he stalks you.\n\n", true);
					DisplayText("You stumble in your attempt to escape and realize that you are completely helpless.  The minotaur towers over you and heaves his ax for a <i>coup de grace</i>.  As he readies the blow, another beast-man slams into him from the side.  The two of them begin to fight for the honor of raping you, giving you the opening you need to escape.  You quietly sneak away while they fight – perhaps you should avoid the mountains for now?\n\n");
				}
				player.statusAffects.add(StatusAffectType.TF2, 0, 0, 0, 0);
				return { next: Scenes.camp.returnToCampUseOneHour };
				return;
			}
			//Mino gangbang
			if (!player.statusAffects.has(StatusAffectType.MinoPlusCowgirl) || randInt(10) === 0) {
				if (Flags.list[FlagEnum.HAS_SEEN_MINO_AND_COWGIRL] === 1 && player.torso.neck.head.horns > 0 && player.torso.neck.head.hornType === HornType.COW_MINOTAUR && player.torso.neck.head.earType === EarType.COW && player.torso.tailType === TailType.COW && player.lactationQ() >= 200 && player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 3 && player.minotaurAddicted()) {
					//PC must be a cowmorph (horns, legs, ears, tail, lactating, breasts at least C-cup)
					//Must be addicted to minocum
					DisplayText("As you pass a shadowy cleft in the mountainside, you hear the now-familiar call of a cowgirl echoing from within.  Knowing what's in store, you carefully inch closer and peek around the corner.");
					DisplayText("\n\nTwo humanoid shapes come into view, both with pronounced bovine features - tails, horns and hooves instead of feet.  Their genders are immediately apparent due to their stark nudity.  The first is the epitome of primal femininity, with a pair of massive, udder-like breasts and wide child-bearing hips. The other is the pinnacle of masculinity, with a broad, muscular chest, a huge horse-like penis and a heavy set of balls more appropriate on a breeding stud than a person.  You have once again stumbled upon a cow-girl engaging in a not-so-secret rendezvous with her minotaur lover.");
					DisplayText("\n\nYou settle in behind an outcropping, predicting what comes next.  You see the stark silhouettes of imps and goblins take up similar positions around this makeshift theatre, this circular clearing surrounded on the edge by boulders and nooks where all manner of creatures might hide. You wonder if they're as eager for the upcoming show as you are.  The heady scent of impending sex rises in the air... and with it comes something masculine, something that makes your stomach rumble in anticipation.  The mouth-watering aroma of fresh minotaur cum wafts up to your nose, making your whole body quiver in need.  Your [vagOrAss] immediately ");
					if (player.torso.vaginas.count > 0) DisplayText("dampens");
					else DisplayText("twinges");
					DisplayText(", aching to be filled");
					if (player.torso.cocks.count > 0) DisplayText(", while [eachCock] rises to attention, straining at your [armor]");
					DisplayText(".");

					DisplayText("\n\nYou can barely see it from your vantage point, but you can imagine it: the semi-transparent pre-cum dribbling from the minotaur's cumslit, oozing down onto your tongue.  Your entire body shivers at the thought, whether from disgust or desire you aren't sure.  You imagine your lips wrapping around that large equine cock, milking it for all of its delicious cum.  Your body burns hot like the noonday sun at the thought, hot with need, with envy at the cow-girl, but most of all with arousal.");

					DisplayText("\n\nSnapping out of your imaginative reverie, you turn your attention back to the show. You wonder if you could make your way over there and join them, or if you should simply remain here and watch, as you have in the past.");
					menu();
					//[Join] [Watch]
					MainScreen.addButton(0, "Join", joinBeingAMinoCumSlut);
					MainScreen.addButton(1, "Watch", watchAMinoCumSlut);
					return;
				}
				Flags.list[FlagEnum.HAS_SEEN_MINO_AND_COWGIRL] = 1;
				if (!player.statusAffects.has(StatusAffectType.MinoPlusCowgirl)) player.statusAffects.add(StatusAffectType.MinoPlusCowgirl, 0, 0, 0, 0);
					else player.statusAffects.get(StatusAffectType.MinoPlusCowgirl).value1 = 1;
				DisplayText("As you pass a shadowy cleft in the mountainside, you hear the sounds of a cow coming out from it. Wondering how a cow got up here, but mindful of this land's dangers, you cautiously sneak closer and peek around the corner.\n\n", true);
				DisplayText("What you see is not a cow, but two large human-shaped creatures with pronounced bovine features -- tails, horns, muzzles, and hooves instead of feet. They're still biped, however, and their genders are obvious due to their stark nudity. One has massive, udder-like breasts and wide hips, the other a gigantic, horse-like dong and a heavy set of balls more appropriate to a breeding stud than a person. You've stumbled upon a cow-girl and a minotaur.\n\n");
				DisplayText("A part of your mind registers bits of clothing tossed aside and the heady scent of impending sex in the air, but your attention is riveted on the actions of the pair. The cow-girl turns and places her hands on a low ledge, causing her to bend over, her ample ass facing the minotaur. The minotaur closes the distance between them in a single step.\n\n");
				DisplayText("She bellows, almost moaning, as the minotaur grabs her cushiony ass-cheeks with both massive hands. Her tail raises to expose a glistening wet snatch, its lips already parted with desire. She moos again as his rapidly hardening bull-cock brushes her crotch. You can't tear your eyes away as he positions himself, his flaring, mushroom-like cock-head eliciting another moan as it pushes against her nether lips.\n\n");
				DisplayText("With a hearty thrust, the minotaur plunges into the cow-girl's eager fuck-hole, burying himself past one -- two of his oversized cock's three ridge rings. She screams in half pain, half ecstasy and pushes back, hungry for his full length. After pulling back only slightly, he pushes deeper, driving every inch of his gigantic dick into his willing partner who writhes in pleasure, impaled exactly as she wanted.\n\n");
				DisplayText("The pair quickly settles into a rhythm, punctuated with numerous grunts, groans, and moans of sexual excess. To you it's almost a violent assault sure to leave both of them bruised and sore, but the cow-girl's lolling tongue and expression of overwhelming desire tells you otherwise. She's enjoying every thrust as well as the strokes, gropes, and seemingly painful squeezes the minotaur's powerful hands deliver to her jiggling ass and ponderous tits. He's little better, his eyes glazed over with lust as he continues banging the fuck-hole he found and all but mauling its owner.");
				return { next: continueMinoVoyeurism };
				return;
			}
			//Cum addictus interruptus!  LOL HARRY POTTERFAG
			//Withdrawl auto-fuck!
			if (Flags.list[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] === 3) {
				minotaurScene.minoAddictionFuck();
				return;
			}
			minotaurScene.getRapedByMinotaur(true);
			DisplaySprite(44);
		}
		//Worms
		if (chooser === 2) {
			//If worms are on and not infested.
			if (player.statusAffects.has(StatusAffectType.WormsOn) && !player.statusAffects.has(StatusAffectType.Infested)) {
				if (player.statusAffects.has(StatusAffectType.WormsHalf) && randInt(2) === 0) {
					if (player.stats.cor < 90) {
						DisplayText("Your hike in the mountains, while fruitless, reveals pleasant vistas and provides you with good exercise and relaxation.", true);
						dynStats("tou", .25, "spe", .5, "lus", player.stats.lib / 10 - 15);
					}
					else {
						DisplayText("During your hike into the mountains, your depraved mind keeps replaying your most obcenely warped sexual encounters, always imagining new perverse ways of causing pleasure.\n\nIt is a miracle no predator picked up on the strong sexual scent you are emitting.", true);
						dynStats("tou", .25, "spe", .5, "lib", .25, "lus", player.stats.lib / 10);
					}
					return { next: Scenes.camp.returnToCampUseOneHour };
					return;
				}
				kGAMECLASS.wormEncounter();
			}
			else {
				//If worms are off or the PC is infested, no worms.
				if (player.statusAffects.has(StatusAffectType.WormsOff) || player.statusAffects.has(StatusAffectType.Infested) || (randInt(2) === 0 && player.statusAffects.has(StatusAffectType.WormsHalf))) {
					if (player.stats.cor < 90) {
						DisplayText("Your hike in the mountains, while fruitless, reveals pleasant vistas and provides you with good exercise and relaxation.", true);
						dynStats("tou", .25, "spe", .5, "lus", player.stats.lib / 10 - 15);
					}
					else {
						DisplayText("During your hike into the mountains, your depraved mind keeps replaying your most obcenely warped sexual encounters, always imagining new perverse ways of causing pleasure.\n\nIt is a miracle no predator picked up on the strong sexual scent you are emitting.", true);
						dynStats("tou", .25, "spe", .5, "lib", .25, "lus", player.stats.lib / 10);
					}
					return { next: Scenes.camp.returnToCampUseOneHour };
				}
				else {
					kGAMECLASS.wormToggle();
				}
			}
		}
		//Hellhound
		if (chooser === 3) {
			DisplaySprite(27);
			if (player.statusAffects.has(StatusAffectType.WormsOn) && randInt(2) === 0) {
				//If lowered encounter rate, 25% chance, otherwise 50%.
				if (player.statusAffects.has(StatusAffectType.WormsHalf) && randInt(2) === 0) {
					hellHoundScene.hellhoundEncounter();
					return;
				}
				infestedHellhoundScene.infestedHellhoundEncounter();
				return;
			}
			hellHoundScene.hellhoundEncounter();
		}
		//Hairdresser
		if (chooser === 4) {
			salon.hairDresser();
		}
	}
	private joinBeingAMinoCumSlut(): void {
		DisplayText().clear();
		DisplayText("The prospect of getting a huge dose of that fresh minotaur cum is just too much to bear.  Before you realize what's happening, you're moving out of your rocky hiding spot and making your way down to the two bovine creatures, stripping your [armor] as you go.  By the time you reach the two figures, you're as naked as they are.  You shiver softly, whether due to some chill in the air or desperate anticipation, you can't say.");
		DisplayText("\n\nThe cow-girl is bent over, her hands on a low ledge with the minotaurs hands on either side of her ample ass.  She moans, more like a moo than a human groan, as the minotaur plunges into her quaking depths.  As you step forward, suddenly unsure of yourself, both the bull and the cow turn their sharp gazes on to you.  You feel very small");
		if (player.tallness <= 96) DisplayText(" despite your immense height");
		DisplayText(" as they look you up and down.  The entire area goes silent, even the goblins and the imps that are no doubt watching seem to be holding their breath, wondering what will happen to you.");
		DisplayText("\n\nThe minotaur grunts, finally, as if he finds you acceptable, and turns back to the plush ass before him, plowing into it once more.  The cow-girl, however, motions for you to move forward, and latches onto a [nipple] when you do.  Her soft lips encircle your areola, while her tongue dances over the rapidly hardening flesh of your teat.  Your breasts tingle with the slightest bit of suction, making you gasp as small droplets of milk escape your nipple and roll over the cow-girl's tongue.  She sucks more and more, eagerly gulping down your refreshing lactic beverage.");

		DisplayText("\n\nAll the while the minotaur continues grunting, thrusting his massive member into the woman's hungry cunt.  The two rock back and forth, pushing her face right into your breast before pulling back again.  The cow-girl's legs tremble and you suddenly find her arm grasping your shoulder for support.  Her other hand drifts down between your own naked legs, ");
		if (player.torso.cocks.count > 0) {
			DisplayText("ignoring your cock");
			if (player.torso.cocks.count > 1) DisplayText("s");
			DisplayText(" entirely, ");
		}
		DisplayText("slipping a finger into your moistening ");
		if (player.torso.vaginas.count > 0) DisplayText("pussy");
		else DisplayText("asshole");
		DisplayText(".  A low moan escapes your lips as a second finger slips in while the busty bovine woman's thumb ");
		if (player.torso.vaginas.count > 0) DisplayText("swirls around your clitoris");
		else DisplayText("presses against your perineum");
		DisplayText(".");

		DisplayText("\n\nThe broad-shouldered minotaur urges his mate onto her knees while he does the same, his dick never leaving its temporary home.  The cow-girl pulls you along, bringing you to your knees and then onto your back.  You have a moment of sudden modesty as you fold your legs, trying to block your crotch from view.  The bovine woman simply chuckles in between moans and lightly presses your knees apart.  Your legs spread wide, lewdly showing off your nether region to the cow-girl, and anyone else that's watching.");

		DisplayText("\n\nWithout wasting any time, the girl leans down and");
		if (player.torso.cocks.count > 0) DisplayText(", once again ignoring your manhood completely");
		DisplayText(", dives tongue first into your wet ");
		if (player.torso.vaginas.count > 0) DisplayText("quim");
		else DisplayText("back door");
		DisplayText(".  The movement is so quick that you can't even suppress the sudden, perverted moan that leaves your lips... a moan that sounds shockingly like a cow's moo.  The surprise at your sudden bovine outburst quickly dissipates as the cow-girl's large tongue dips in and out of your ");
		if (player.torso.vaginas.count > 0) DisplayText("sodden box");
		else DisplayText("moist butthole");
		DisplayText(".  Any remaining fears of joining this very public sex show are gone, and you wonder why you didn't join in sooner.");

		DisplayText("\n\nThe tongue lavishes your hole, paying homage to your crotch in the only way it knows how.  Your breath comes shorter while your arms and legs tingle, fingers and toes curling against your will.  The cow-girl laps and licks, her broad mouth muscle slipping in and out, curving in and around to hit every tender part of your insides.  You run your fingers through the woman's long red hair, forcing her head even deeper into your crotch.  With her head down like this, you have an easy view of her ass high up in the air, getting fucked senseless by the minotaur.  Every thrust makes the cow-girl moan into your lap, the added vibrations causing you to squirm even more.");

		DisplayText("\n\nThe bull thrusts in to the hilt, letting out one final bellow of pleasure.  The cow-girl brings her head up, her mouth and chin slick and dripping with your juices.  She lets out a moo-like bellow along with the minotaur, whose balls churn, no doubt depositing a heavy load of that delicious cum directly into her waiting womb.  You lick your lips, wishing you could just wrap them around that cock right now, to get your fix and feel the blissful sensations of relief run across your body.");

		DisplayText("\n\nThe girl gibbers incoherently as she slides off the minotaur's still-rigid cock, a small spurt of pearly white spunk running down her thighs.  The minotaur smirks, smacking the cow's ass and casually pushing her to the side.  A goofy grin is plastered on her face, eyes rolled up into their sockets like she's just experienced the most divine fuck imaginable. He then looks you dead in the eyes and says, in a deep, masculine and very dominant voice, \"<i>You get to ride my cock next, cow.</i>\"");

		DisplayText("\n\nHis rough, strong hands grasp your legs and draw you closer.  You squirm half-heartedly, not really trying to get away.  Though your mind tries to fight it, you know all you really want is that warm, sticky cum inside you one way or another.  You want to be just like the half-unconscious girl beside you, stuffed with cock and turned into this rugged man's breeding bitch.");

		DisplayText("\n\n\"<i>Eager for a fucking, huh slut?</i>\" he taunts, his turgid member resting along your stomach.  You nod slowly.  You feel a deep burning in your core. You want that cock inside you.  You want to be filled to bursting with this bull's seed, to feel it churn ");
		if (player.torso.vaginas.count > 0) DisplayText("within your womb, knocked up by this manly beast");
		else DisplayText("within your bowels");
		DisplayText(".  \"<i>That's a good slut,</i>\" he grunts, pulling his cock off your belly and rubbing the slick, flat head against your awaiting [vagOrAss].  He teases you with the slight contact until you open your mouth to voice your complaints, then he suddenly thrusts inside.  Any words forming on your tongue fly away, replaced by a whine of relief as your hole gets stretched wide by the invading member.");
		if (player.torso.vaginas.count > 0) player.displayStretchVagina(36, true, true, false);
		else player.displayStretchButt(36, true, true, false);

		DisplayText("\n\n\"<i>Ahh, yeah.  That's some good ");
		if (player.torso.vaginas.count > 0) DisplayText("cow-pussy");
		else DisplayText("ass");
		DisplayText(" right there,</i>\" he groans, more of his bombastic cock slipping deep inside you.  The minotaur hooks an arm under each of your knees, lifting up your lower body, pressing even deeper.  Powerful sensations drift up from your ");
		if (player.torso.vaginas.count > 0) DisplayText("g-spot");
		else DisplayText("prostate");
		DisplayText(" as the minotaur's wide flare strokes it through your ");
		if (player.torso.vaginas.count > 0) DisplayText("vaginal");
		else DisplayText("anal");
		DisplayText(" walls.  Biting your lip with barely contained pleasure, you bring your hands to your breasts, playing with your milk-sodden nipples in between each orgasmic thrust of the bull's hips.");

		DisplayText("\n\nA giggle comes from your side, as you see the cow-girl is back up onto her knees, having recovered from her exalted orgasm.  She crawls forward, kneeling just over your head and leaning in to kiss her minotaur lover.  The two whisper sweet nothings to each other, too vague and indistinct to hear, but it doesn't matter.  All you can focus on is the dick lodged firmly inside of you... that, and the soaking cunt of the cow-girl just inches from your face.  Alabaster droplets drip down her legs, one even landing on your lips.  Before you can stop yourself, you lick them clean, savoring the taste of the second-hand cum.");

		DisplayText("\n\nSome part of your mind voices a complaint at what comes next, a voice that's quickly squelched inside the addiction-fueled haze of your brain.  You pull your head upwards and extend your tongue, slurping a large glob of cum from the cow-girl's snatch.  There's a surprised yelp from above you, followed by a coo of pleasure.  To your surprise, the cow-girl actually lowers her cunt down onto your face, giggling madly, filling your nostrils with the scent of her muff, with the scent of recent sex.  Not letting this opportunity go to waste, you repay her actions from earlier, slipping your ");
		if (player.torso.neck.head.face.tongueType === TongueType.SNAKE) DisplayText("serpentine ");
		else if (player.torso.neck.head.face.tongueType === TongueType.DEMONIC) DisplayText("demonic ");
		else if (player.torso.neck.head.face.tongueType === TongueType.DRACONIC) DisplayText("draconic ");
		DisplayText("tongue inside her, eagerly licking out and guzzling down the remnants of the minotaur's present.");

		DisplayText("\n\nThe minotaur, for his part, is in no rush to give you a cream pie of your own. His thrusts are slow and deliberate, with a rhythm that has you writhing with pleasure.  The three of you moan together like some kind of erotic pyramid.  The bull's assault on your ");
		if (player.torso.vaginas.count > 0) DisplayText("womb");
		else DisplayText("back door");
		DisplayText(" increases slowly, and you can feel your limbs tingling at the prospect of your mino-cum-induced orgasm.");

		DisplayText("\n\nIt starts in your fingers, where your nerves seethe, gathering up fistfuls of grass like one might grab a sheet.  The heat continues down your arms and strikes your body like a lightning bolt, your belly suddenly spiking up, back arching as the orgasmic thunderstorm rolls over you.  The flames don't stop there, however.  They travel down into your crotch, suddenly lighting up every nerve in your ");
		if (player.torso.vaginas.count > 0) DisplayText("[vagina]");
		else DisplayText("[asshole]");
		DisplayText(" like a Christmas tree.  You're acutely aware of every single movement, every pulse, every little bit of contact between you and the huge cock living inside you.");

		DisplayText("\n\nYour muscles spasm and clench as the minotaur lets loose a powerful roar.  His own member twitches, suddenly releasing a flood of hot cum into your awaiting ");
		if (player.torso.vaginas.count > 0) DisplayText("womb");
		else DisplayText("bowels");
		DisplayText(".  The moment that long-awaited jism hits your walls, it's like another lightning bolt hits.  It travels up your spine and sets your entire brain aglow.  Ecstasy wrapped in bliss with a side of euphoric rapture consumes your thoughts.  Your vision goes white, pearly white like the seed filling your body, and your lips part as a primal \"<i>moo</i>\" slips out.");

		DisplayText("\n\nFor the longest time, the only thing your cum-addled mind can think about is cocks and cunts, of pregnant bellies and stomachs filled to capacity.  You mind fills itself with visions of yourself on your knees, servicing this minotaur daily, hoping to please him enough that he might grace your ");
		if (player.torso.vaginas.count <= 0) DisplayText("new ");
		DisplayText("womb with his divine dick.");

		DisplayText("\n\nIt takes several minutes for you to come down from this orgasmic high, and when you do, you see your minotaur lover has yet to recover from his.  He lays on his back in the midst of this clearing, his still-rock-hard cock jutting upwards, coating in a mixture of various juices.  The cow-girl sits beside him, carefully licking the towering pillar of cock clean.  You sit up, wobbly and clutch your stomach.  Filled with cum in two ends, you can't help but feel oddly unsatisfied.  Perhaps guzzling down some second-hand cum isn't quite enough to sate your hunger.  Perhaps you need it straight from the tap, as it were.");

		DisplayText("\n\nYou gingerly sit up, your body still quaking with pleasure.  Every movement sends another luxurious aftershock rippling through your body.  You crawl over to the splayed out minotaur, opposite your cow-girl partner, and join her in licking the man's cock clean.  It takes some work, but soon it glistens in the light of the red sky above you.");

		DisplayText("\n\nAs if you both possess some kind of bovine telepathy, you both lean forward, wrapping your ");
		if (player.torso.chest.count > 1) DisplayText("uppermost ");
		DisplayText("breasts around his monolithic shaft.  Your faces meet and her soft lips press against yours, each of you earnestly pressing your tongues into the other's mouths, swapping the juices you've collected over the past hour or so.  The bull beneath you groans, awakening to the feeling of four breasts surrounding his love muscle.");

		DisplayText("\n\nThe two of your pump your breasts up and down, your lips barely leaving each other long enough to give his member the occasional kiss, lick or slurp.  Up and down you go, and this time it's the minotaur's body that's wracked with bliss, writhing on the ground.  Milk dribbles from your breasts, coating you, the cow-girl and the minotaur in a fine white sheen and creating a sweet-smelling aroma that permeates the air.");

		DisplayText("\n\nThe bull groans, biting his lip as a third, and likely final, orgasm rips through him.  His hips buck upwards, his cock flaring up and out of your mammaries.  Ropes of immaculate silver seed jet from his cumslit, arcing up into the air several feet before splattering down on your heads.  Wasting no time, you slip your lips around the flare, gulping down mouthful after mouthful of the sweet man-milk.  Even though it's his third load of the hour, it's just as big as the others, and soon your find you can't swallow any more; your cum-laden belly just won't allow it.");

		DisplayText("\n\nSadly, you relinquish your hold on his cock and sit back, watching the cow-girl opposite you pick up where you left off, slurping up whatever you missed with a dedicated fervor.");

		DisplayText("\n\n<b>Now</b> you feel satisfied.  Filled with that precious, precious minotaur spunk in both ends, fresh from the source.  You slump onto your back and drift off into a hazy, bull-filled dream world.");

		DisplayText("...");

		DisplayText("\n\nYou awaken several hours later.  The minotaur and the cow-girl are nowhere to be seen, but your [armor] is left neatly folded next to you, along with a small bottle filled with some white liquid, most likely a gift from your \"bull\".");

		DisplayText("\n\nYou quickly re-dress and head back to camp, spying the occassional goblin or imp scurrying from its hiding spot, no doubt recovering from their own self-inflicted orgasms.");
		player.orgasm();
		player.stats.lib += .5;
		player.stats.sens += -3;
		player.stats.cor += 1;
		if (Flags.list[FlagEnum.PC_FETISH] > 0) {
			DisplayText("  A thrill runs through you.  Even though you were brought to such a satisfying climax, the whole thought that goblins and imps were watching you and getting off on it... it just makes you hornier than you were before.");
			dynStats("lus=", 100);
		}
		//Chance to impregnate PC, get mino-fix, and maybe relief from feeder perk.
		player.minoCumAddiction(10);
		player.knockUp(PregnancyType.MINOTAUR, PregnancyType.INCUBATION_MINOTAUR);
		if (player.statusAffects.has(StatusAffectType.Feeder)) {
			//You've now been milked, reset the timer for that
			player.statusAffects.get(StatusAffectType.Feeder).value1 = 1;
			player.changeStatusValue(StatusAffects.Feeder, 2, 0);
		}
		//(Acquired minotaur cum!)
		model.time.hours++;
		inventory.takeItem(consumables.MINOCUM, Scenes.camp.returnToCampUseOneHour);
	}

	private watchAMinoCumSlut(): void {
		DisplayText().clear();
		DisplayText("Deciding not to risk it, you settle back into your nook in the rocks and watch on eagerly.  The cow-girl turns and places her hands on a low ledge, causing her to bend over, her ample ass facing the minotaur.  The minotaur closes the distance between them in a single step.");
		DisplayText("\n\nShe bellows, almost moaning, as the minotaur grabs her cushiony ass-cheeks with both massive hands.  Her tail raises to expose a glistening wet snatch, its lips already parted with desire.  She moos again as his rapidly hardening bull-cock brushes her crotch. You can't tear your eyes away as he positions himself, his flaring, mushroom-like cock-head eliciting another moan as it pushes against her nether lips.");
		DisplayText("\n\nWith a hearty thrust, the minotaur plunges into the cow-girl's eager fuck-hole, burying himself past one -- two of his oversized cock's three ridge rings.  She screams in half pain, half ecstasy and pushes back, hungry for his full length.  After pulling back only slightly, he pushes deeper, driving every inch of his gigantic dick into his willing partner who writhes in pleasure, impaled exactly as she wanted.");
		DisplayText("\n\nThe pair quickly settles into a rhythm, punctuated with numerous grunts, groans, and moans of sexual excess.  To you it's almost a violent assault sure to leave both of them bruised and sore, but the cow-girl's lolling tongue and expression of overwhelming desire tells you otherwise.  She's enjoying every thrust as well as the strokes, gropes, and seemingly painful squeezes the minotaur's powerful hands deliver to her jiggling ass and ponderous tits.  He's little better, his eyes glazed over with lust as he continues banging the fuck-hole he found and all but mauling its owner.");
		//[Next]
		player.stats.lust += 10;
		menu();
		MainScreen.addButton(0, "Next", watchMinoCumSlutII);
	}

	private watchMinoCumSlutII(): void {
		DisplayText().clear();
		DisplayText("They go at it for nearly an hour, oblivious to you watching them, before their intensity heightens as they near orgasm.  The results are almost explosive, both of them crying out as they begin twitching uncontrollably.  Clinging desperately to the cow-girl's ass, the minotaur pumps so much cum into her depths that it begins spurting out.  This accidental lubrication releases his grip and the pair collapse to the ground.  Yet the minotaur isn't finished, his man-milk spraying into the air almost like his still-erect dick is a hose and splattering down onto both of them.");
		DisplayText("\n\nAs you look at the two cum-covered creatures laying there in their exhausted sex-induced stupors, the minotaur's thick horse-cock now slowly deflating, you realize that you've been touching yourself.  You make yourself stop in disgust.");
		DisplayText("\n\nOnly now do you notice other faces peeking over ledges and ridges.  You count at least two goblins and one imp who quickly pull back.  From the sounds, they were busy getting themselves off.  Apparently this isn't an uncommon show, and the locals enjoy it immensely.");
		player.stats.lust += 25;
		return { next: Scenes.camp.returnToCampUseOneHour };
	}

	private continueMinoVoyeurism(): void {
		DisplayText("They go at it for nearly an hour, oblivious to you watching them, before their intensity heightens as they near orgasm. The results are almost explosive, both of them crying out as they begin twitching uncontrollably. Clinging desperately to the cow-girl's ass, the minotaur pumps so much cum into her depths that it begins spurting out. This accidental lubrication releases his grip and the pair collapse to the ground. Yet the minotaur isn't finished, his man-milk spraying into the air almost like his still-erect dick is a hose and splattering down onto both of them.\n\n", true);
		DisplayText("As you look at the two cum-covered creatures laying their in their exhausted sex-induced stupors, the minotaur's thick horse-cock now slowly deflating, you realize that you've been touching yourself.  You make yourself stop ");
		//[low corruption]
		if (player.stats.cor < 33)
			DisplayText("in disgust.");
		else if (player.stats.cor < 66)
			DisplayText("in confusion.");
		else
			DisplayText("reluctantly.");
		DisplayText("\n\nOnly now do you notice other faces peeking over ledges and ridges. You count at least two goblins and one imp who quickly pull back. From the sounds, they were busy getting themselves off.");
		//[if first appearance of this event]
		if (player.statusAffects.get(StatusAffectType.MinoPlusCowgirl).value1 === 0)
			DisplayText("  Apparently this isn't an uncommon show, and the locals enjoy it immensely.");
		//Lust!
		dynStats("lus", 5 + player.stats.lib / 20 + player.minoScore() + RaceScore.cowScore(player));
		return { next: Scenes.camp.returnToCampUseOneHour };
	}
}
}
