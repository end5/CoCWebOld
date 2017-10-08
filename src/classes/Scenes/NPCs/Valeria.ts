﻿export default class Valeria extends NPCAwareContent implements TimeAwareInterface {

	public Valeria() {
		CoC.timeAwareClassAdd(this);
	}

	//Implementation of TimeAwareInterface
	public timeChange(): boolean {
		if (player.statusAffects.get("GooStuffed").value1 > 0) {
			player.addStatusValue(StatusAffects.GooStuffed, 1, -1);
			if (player.statusAffects.get("GooStuffed").value1 <= 0) {
				valeria.birthOutDatGooSlut();
				return true;
			}
		}
		return false;
	}

	public timeChangeLarge(): boolean {
		return false;
	}
	//End of Interface Implementation

	//const VELARIA_FUTA: number = 499;

	//Camp Menu -- [Followers] -- [Valeria]
	public valeriaFollower(): void {
		spriteSelect(79);
		MainScreen.clearText();
		MainScreen.text("You walk over to Valeria.  Seeing you approach, the armor-goo turns a slightly brighter shade of blue beneath her plates and grins.");
		MainScreen.text("\n\n\"<i>Hey there, partner! Need anything while we're safe at camp?</i>\"");
		let sex: Function = null;
		if (player.stats.lust > 33) sex = followersValeriaSex;
		//(Display Options: [Appearance] [Spar] [Sex] [Talk])
		choices("Appearance", valeriaAppearance, "Spar", valeriaSpar, "Sex", sex, "Talk", talkWithValeria, "Take", takeValeria, "", null, "", null, "", null, "", null, "Back", camp.campFollowers);
	}

	//[Valeria] -- [Appearance]
	private valeriaAppearance(): void {
		MainScreen.clearText();
		spriteSelect(79);
		MainScreen.text("Valeria is a 6 foot tall goo-girl composed of a viscous blue goop.  She is currently wearing a suit of plated armor, and wields her gooey greatsword as a weapon.  She has a beautiful feminine face with strong, angular features, and has affected short-cropped gooey hair, hanging just past her cheeks.  Her hips are average, with a muscular, gropable bum.  Unlike most goos, Valeria has formed two normal human legs ending in normal human feet out of her gooey lower body.");
		MainScreen.text("\n\nShe has a pair of C-cup breasts, with a single 0.5 inch nipple on each breast.");
		//[If Valeria is cock'd:]
		if (Flags.list[FlagEnum.VELARIA_FUTA] == 1) MainScreen.text("\n\nWhen you desire it, she's able to form an impressive human-shaped cock above her twat, usually capping out at about 12 inches. Gooey as it is, it constantly dribbles bits of goop, not unlike pre-cum.");
		MainScreen.text("\n\nShe has created an easily stretchable, gooey cunt between her legs, with a tiny 0.2 inch clitoris.");
		MainScreen.text("\n\nShe generally doesn't bother to affect an anus, though you can't imagine it'd be too difficult to penetrate her gooey, gropable behind.");
		doNext(valeriaFollower);
	}
	//Valeria] -- [Spar]
	private valeriaSpar(): void {
		MainScreen.clearText();
		spriteSelect(79);
		MainScreen.text("You ask Valeria if she would be up for a bit of battle practice.");
		MainScreen.text("\n\n\"<i>Hey, that'd be great, partner. Gotta keep our skills sharp if we wanna have a chance against the demons, after all! Let's do it.</i>\"");
		MainScreen.text("\n\nYou take Valeria out to the fringe of camp and ready your [weapon] as she forms a gooey greatsword in her hands.");
		//(Play normal combat scenes, with EXP rewards. No rape options, however; use the following outtros:)
		startCombat(new GooArmor());
		monster.statusAffects.add(new StatusAffect("Spar", 0, 0, 0, 0)));
		monster.gems = 0;
		doNext(playerMenu);
	}

	//[Valeria] -- [Spar] -- PC Victorious
	internal function pcWinsValeriaSpar(): void {
		MainScreen.clearText();
		spriteSelect(79);
		MainScreen.text("\"<i>Oof!</i>\" Valeria grunts, nearly losing her human shape as she tumbles to the hard-packed dirt.  \"<i>All right, all right, you win!  Take it easy, partner,</i>\" she laughs, letting her greatsword dissipate back into her body.");
		MainScreen.text("\n\nYou offer to help her up, but she easily reconstitutes herself into a standing pose, giving you a little wink afterwards.  \"<i>Thanks for the ass-whoopin', [name],</i>\" she laughs.  \"<i>C'mon, let's get back to it.  Demons aren't gonna defeat themselves, after all.</i>\"");
		cleanupAfterCombat();
	}

	//[Valeria] -- [Spar] -- PC Defeated
	public pcWinsValeriaSparDefeat(): void {
		MainScreen.clearText();
		spriteSelect(79);
		MainScreen.text("You collapse, ");
		if (player.HP < 1) MainScreen.text("in too much pain");
		else MainScreen.text("too turned on");
		MainScreen.text(" to fight any longer.  Valeria's on you in a heartbeat, her gooey greatsword pressed to your throat.");
		MainScreen.text("\n\n\"<i>Do you yield?</i>\" she asks, not unlike a knight.");
		MainScreen.text("\n\nYou nod emphatically.");
		MainScreen.text("\n\n\"<i>Tsk,</i>\" she sighs, shaking her head.  \"<i>Only reason I tagged along with you is I thought you might actually have a chance, Champion.  If you can't beat little old me... Oh, whatever am I going to do with you?</i>\" she chuckles");
		//[if PC lost via HP or has no gender: 
		if (player.HP < 1 || player.gender == 0) {
			MainScreen.text(", offering you a hand up.");
			MainScreen.text("\n\n\"<i>C'mon, let's get back to camp.</i>\"");
			//(Return to main Camp menu)
			cleanupAfterCombat();
		}
		//[else; If PC lost via lust & has a gender: 
		else {
			MainScreen.text(".  \"<i>Well, since you're so... eager... I might as well get my daily fluids while we're here.</i>\"");
			//(Go to Valeria's gender-appropriate FemDom sex scenes)
			doNext(valeriaSexDominated);
		}
	}

	//Followers -- [Valeria] -- [Sex]
	private followersValeriaSex(display: boolean = true): void {
		spriteSelect(79);
		if (display) {
			MainScreen.clearText();
			MainScreen.text("With a lusty grin, you ask your gooey friend if ");
			if (player.gender > 0) MainScreen.text("she's interested in a little fluid exchange");
			else MainScreen.text("she wouldn't mind helping you get some release, despite your genderlessness");
			MainScreen.text(".");
			MainScreen.text("\n\n\"<i>Hmm... I suppose that could be arranged. What did you have in mind, partner?</i>\"");
		}
		//(Display Options: \"<i>[Penetrate Her](Cockwielder PC Only)  [Get Fucked]  [Gooflation] 
		//[Get Dominated](Must have a gender)  [Dick/No Dick])
		let penetrate: Function = null;
		if (player.lowerBody.cockSpot.hasCock()) penetrate = penetrateValeria;
		let getFucked: Function = valeriaGetFucked;
		let gooFlation: Function = gooFlation;
		let dominated: Function = null;
		if (player.gender > 0) dominated = valeriaSexDominated;
		let dickToggle: Function = valeriaDickToggle;
		let dickText: string = "Grow Dick";
		if (Flags.list[FlagEnum.VELARIA_FUTA] == 1) {
			dickText = "Lose Dick";
		}
		choices("PenetrateHer", penetrate, "Get Fucked", getFucked, "Gooflation", gooFlation, "GetDominated", dominated, dickText, dickToggle,
			"", null, "", null, "", null, "", null, "Back", valeriaFollower);
	}

	//Valeria -- [Sex] -- [Dick/No Dick]
	private valeriaDickToggle(): void {
		spriteSelect(79);
		MainScreen.clearText();
		//[If Valeria has a dick:] 
		if (Flags.list[FlagEnum.VELARIA_FUTA] == 1) {
			MainScreen.text("Before you do anything, you ask Valeria if she wouldn't mind hiding her facsimile of a dick, at least when you aren't having sex.");
			MainScreen.text("\n\n\"<i>Aww,</i>\" she groans, \"<i>I was starting to get used to my little buddy there, too.  But, if that's what you want... I guess I'll oblige.</i>\"");
			MainScreen.text("\n\nYou're gratified to see her thick gooey dick retract and dissipate into her groin.");
			MainScreen.text("\n\n\"<i>All better now, partner?</i>\"");
			//(PC returns to sex menu)
			Flags.list[FlagEnum.VELARIA_FUTA] = 0;
		}
		//[If Valeria doesn't have a dick:] 
		else {
			Flags.list[FlagEnum.VELARIA_FUTA] = 1;
			MainScreen.text("Struggling to find a less-than-awkward way of phrasing this, you ask Valeria if she wouldn't mind growing a certain extra appendage for you.");
			//(If PC is female/herm/genderless:)
			if (player.gender != 1) {
				MainScreen.text("\n\nShe cocks an eyebrow at you. \"<i>You know, I'm pretty fond of being a girl... But for you, partner, I guess I could manage a little something extra.</i>\"");
				MainScreen.text("\n\nYou watch as, with a grunt of effort, Valeria's crotch expands.  A hefty twelve-inch human-like cock sprouts above her gooey cunt, twitching and dripping gooey pre-cum.  Your armor-goo shudders slightly.");
				MainScreen.text("\n\n\"<i>Well, this is going to be... different. So, what do you say we put this third leg of mine to good use, huh?</i>\"");
			}
			//(PC returns to sex menu)
			//(If PC is Male:) 
			else {
				MainScreen.text("\n\nValeria cocks an eyebrow at you.  \"<i>Dude. What're you, gay?</i>\"");
				MainScreen.text("\n\nYou scowl at her.");
				MainScreen.text("\n\n\"<i>Shit, I'm a giant pile of goop.  Who am I to judge?  One throbbing goo-stick, coming up.</i>\"");
				MainScreen.text("\n\nYou watch as, with a grunt of effort, Valeria's crotch expands.  A hefty twelve-inch human-like cock sprouts above her gooey cunt, twitching and dripping gooey pre-cum.  Your armor-goo shudders slightly.");
				MainScreen.text("\n\n\"<i>Well, this is going to be... different. So, what do you say we put this third leg of mine to good use, huh?</i>\"");
				//(PC returns to sex menu)
			}

		}
		doNext(valeriaFollower);
	}

	//Valeria -- [Sex] -- [Get Fucked]
	private valeriaGetFucked(): void {
		spriteSelect(79);
		MainScreen.clearText();
		MainScreen.text("You disrobe and, ");
		if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("stroking the slick lips of your [vagina], ask Valeria to fuck you.");
		else MainScreen.text("posing seductively, ask Valeria to fuck you.");
		MainScreen.text("\n\nShe grins.  \"<i>You just lie back and let me take care of everything, partner.</i>\"  You do as she asks, flopping onto your back ");
		if (player.isBiped()) MainScreen.text("and spreading your legs ");
		MainScreen.text("as Valeria ");
		if (Flags.list[FlagEnum.VELARIA_FUTA] == 0) MainScreen.text("forms a thick, gooey cock");
		else MainScreen.text("grabs her thick, gooey cock");
		MainScreen.text(" and looms over you.");
		MainScreen.text("\n\nSurprisingly, she kneels over your shoulders and lets her cock flip onto your chin.  \"<i>Well, get it ready.  Come on.</i>\"");
		MainScreen.text("\n\nYou start to remind her that she's already pretty damn moist, but as soon as you open your mouth, she shoves her cock in.  You squirm and grunt, but Valeria just grabs your shoulders and stuffs more of her in your gob until her gooey cock is pouring down your throat.  Figuring it's a useless fight, you start to deepthroat her cock, pumping your head back and forth until your lips press against her groin.  Squishy and malleable as it is, you don't have any problems taking her shaft all the way, and even manage to pierce the bottom of it with your tongue, slurping at the insides of Valeria's dick; your invading tongue tingles at her citrusy taste.");
		MainScreen.text("\n\nValeria lets out a long, low moan as you fellate her goo-cock and runs her hand through your [hair], urging you onwards.  You continue on for a few minutes, slowly working her slick cock in and out of your throat until she eventually pushes your head back and withdraws herself, already panting from the pleasure.  \"<i>That's enough, [name].  Time for the main event, I think.</i>\"");
		MainScreen.text("\n\nThe tip of her goopy cock slips out of your well-used mouth, leaving its sticky, citrusy residue clinging to your lips.  Valeria slides back along your chest, ");
		//[if PC has C-cups or bigger, 
		if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 3) MainScreen.text("bumping over your [chest] and stopping for a brief moment to tickle your sensitive tits with her goopy bottom before ");
		MainScreen.text("coming to a stop over your crotch.  She pours herself into your lap, ");
		//[if PC has cock: \"<i>
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("her gooey ass devouring your " + CockDescriptor.describeCock(player, 0) + " as she slides down your belly");
		if (player.lowerBody.cockSpot.hasCock() && player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" and ");
		if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" letting bits of her goo-body slither into your wet, waiting [vagina], ever so slightly peeling your walls apart");
		//If PC has no gender 
		if (player.gender == 0) MainScreen.text("poking the shaft of her cock gingerly, teasingly against your [asshole]");
		MainScreen.text(".");

		MainScreen.text("\n\nShe rocks back in your lap, sticking her arms to your [legs] for support as she slings her legs over your shoulders.  She grabs her cock, stroking it sensually");
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.text(", as she rhythmically flexes her ass cheeks, shifting her fluidity around your shaft within her with a feeling like lotion-covered hands gently stroking you");
		MainScreen.text(".");

		//(If Female)
		if (!player.lowerBody.cockSpot.hasCock() && player.lowerBody.vaginaSpot.hasVagina()) {
			MainScreen.text("\n\nValeria gives you a little grin and, still grasping her cock, begins to push it downward.  Her shaft slides down her body in a way that only a goo-girl's appendage could, its base traveling down her groin until her rod flops wetly onto the lips of your [vagina].  Though her cock sits neatly atop your entrance, Valeria only gives you a little smirk and pushes down again.  Her gooey prick folds in on itself, slathering your pussylips with slime as she literally pours herself into you, reconstituting her cock to perfectly fill each and every crevase of your eager [vagina].");
			MainScreen.text("\n\nValeria sits in your lap, seemingly motionless, but you can feel her cock pouring in and out of your cunt, fucking you as fast and hard as any solid prick ever could.  Your breath catches in your throat as Valeria utterly fills you, stretching your cunt with her massive, malleable member until she threatens to tear you apart.  Her gooey prick slams through your cervix, battering the entrance to your womb.  Were she solid, you're sure you would be in incredible pain; but being so soft and slippery, all you feel is pleasure as she fills and empties you.");
			MainScreen.text("\n\nGrinning wickedly, Valeria shifts her legs closer to her body, running them over your [chest]. You gasp as her soft, sticky goo slithers across your sensitive flesh.  Her feet stop just atop your [nipples].");
			//(paragraph finishes with the below:)
			//(If PC has normal tits)
			if (!player.upperBody.chest.hasFuckableNipples()) MainScreen.text("  Valeria swirls her heels around your sensitive [nipples], letting the tips slip into her gooey feet.  She rocks her heels back and forth, popping your nips in and out of her gooey body, feeling like little pinches and squeezes on your defenseless flesh.");
			//if PC has nipplecunts)
			else MainScreen.text("  The goo-girl, still grinning, picks her feet up off your chest. You can only watch as both her dainty feet swirl and bend, reconstituting themselves as a pair of massive flared horsecocks.  You barely have time to yelp before she plunges both of her bestial shafts deep into your [chest].  You moan like a whore as the goo-girl triple-penetrates you, ramming her three cocks into your stretched cunt and the holes on your chest.");
			//(end if)
			MainScreen.text("\n\nUnder Valeria's triple attacks on your [vagina] and [nipples], you cannot last very long.  Gasping with pleasure, you feel your climax rising.  But not one to be outdone, your gooey lover lets out her own long, loud moan and rams her cock");
			if (player.upperBody.chest.hasFuckableNipples()) MainScreen.text("s");
			MainScreen.text(" deeper inside you than ever before.  You feel streaks of goo pouring into you as she cums, pouring her essence into your womb ");
			if (player.upperBody.chest.hasFuckableNipples()) MainScreen.text("and [chest] ");
			MainScreen.text("until slime overflows from inside you, pooling under her hips.  Filled beyond your capacity, you scream your pleasure and cum, clamping down on Valeria's cock");
			if (player.upperBody.chest.hasFuckableNipples()) MainScreen.text("s");
			MainScreen.text(" until they literally pop inside you, flowing back out in goopy streaks.");
		}
		//(If Male/Herm)
		else if (player.lowerBody.cockSpot.hasCock()) {
			MainScreen.text("\n\nWith your cock stuffed into Valeria's warm, gooey innards, the goo-girl makes a show of rocking herself back and forth in your lap, using her entire bottom like one sopping-wet cunt riding your cock.  With her own rod in hand, she pushes down, letting the base of her prick shift down her body until it bends around your hips and pops back into form just above your [butt].  Your eyes go wide, but when you try to yelp, Val roughly shoves one of her feet into your mouth.  \"<i>Shh, partner,</i>\" she laughs, flicking your tongue with her soft, citrusy toes, \"<i>just let it happen... It'll be good, I promise.</i>\"");

			MainScreen.text("\n\nResigned, you let the goo-girl have her way.  You try your best to relax as her goo-cock slithers between your ass-cheeks, her prick remaining just hard enough for her to hotdog herself between your cheeks.  But rather than penetrate, she instead seems content for the moment to rock her hips in your lap, riding your " + CockDescriptor.describeCock(player, 0) + " and fucking your butt-cheeks with her own rod.  As she rides you, Valeria slips a little more foot into your mouth, pouring her leg into you until you get the hint and start to suckle her dainty toes, easily slipping your tongue into her soft body to taste her insides.");
			MainScreen.text("\n\nJust as you're getting into the rhythm of things, you feel a sudden pressure against your [asshole].  Oh, shit.  You squirm and try to relax yourself, but surprisingly, you don't feel the hard pinch of a cock's insertion.  Instead, Valeria pours a tiny trickle of herself into your anus, slowly but surely stretching you out as her cock inflates half-way inside you.  You groan in pleasure as she stretches you out and redoubles her pace on your " + CockDescriptor.describeCock(player, 0));
			//(if Herm: [
			if (player.lowerBody.vaginaSpot.hasVagina()) {
				player.cuntChange(10, true, true, false);
				MainScreen.text(", the double-attack's pleasure is so great that you barely even notice her creating a second cock above the first and pouring it into your unused [vagina], filling your last hole up with a firm, gooey cock");
			}
			MainScreen.text(".");
			player.buttChange(10, true, true, false);

			MainScreen.text("\n\nValeria begins to buck her hips in your lap, stuffing your hole");
			if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("s");
			MainScreen.text(" and fucking your " + CockDescriptor.describeCock(player, 0) + " with one fluid, passionate motion.  You're both moaning openly now, nearly overwhelmed by a multitude of pleasures.  You can feel your impending orgasm rising, and by the heightening pitch of Valeria's moans, she seems to be just as close to the edge.");
			MainScreen.text("\n\nYou cum, screaming as you unload into Valeria's depths.  You can see your cum spurting into her, swirling and dancing in her brightly-colored, transparent body.  She echoes your cry as you feel hot goo squirting into you, her cock");
			if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("s");
			MainScreen.text(" literally popping as she climaxes, filling your stretched ass ");
			if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("and vag ");
			MainScreen.text("with warm, sticky goop.");
		}
		//(If PC is Genderless OR [Gooflation])
		else {
			gooFlation(false);
		}
		MainScreen.text("\n\nYou collapse, goop flowing freely from your abused body.  Laughing, Valeria pours out of your lap, ");
		if (player.gender > 0) MainScreen.text("patting her belly full of your juices, ");
		MainScreen.text("and looms over you.  \"<i>That was fun, partner,</i>\" she says, leaning down to give you a wet peck on the cheek. \"<i>Let's do that again soon, all right?</i>\"");

		player.orgasm();
		player.stats.sens += -1;
		HPChange(25, false);
		doNext(camp.returnToCampUseOneHour);
	}

	private gooFlation(clearText: boolean = true): void {
		spriteSelect(79);
		if (clearText) {
			MainScreen.clearText();
			MainScreen.text("\"<i>Just relax, partner,</i>\" she grins, reaching up to run a hand through your [hair].  \"<i>Just let ol' Valeria take care of everything...</i>\"");
			MainScreen.text("\n\nYou bite your lip as you feel Valeria's feet shifting around behind you.  Suddenly there are ten tendrils of warm goo snaking around your [butt], tickling and caressing your sensitive flesh.");
		}
		else {
			MainScreen.text("\n\nValeria wiggles her gooey ass on your barren, genitalia-less lap, finally giving up when she sees that she isn't quite having an effect on you.  She pauses for a moment, thinking to herself, until you can see an idea flicker across her features.  With a grin, the armor-goo wraps her long legs around your [hips], locking her feet together behind your back.");
		}
		MainScreen.text("\n\nValeria, still curled up in your lap, gives you nothing but a cute, innocent little smile as you feel her toes growing and expanding into ten long, slender tentacles prying at your buttcheeks, seeking entrance to your ");
		if (!player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("one lonely ");
		MainScreen.text("hole.  You gulp as the tentacle-fuck begins, her long tendrils pouring one by one into your [asshole], each so small and soft it easily slips inside you.  One piles onto another, tickling and teasing your anal walls as more and more of her slithers into you.");
		player.buttChange(30, true, true, false);
		MainScreen.text("\n\nYou grunt and gasp as the last of her toe-tentacles pierces your sphincter and joins its sisters inside your ass.  As she pours more and more of her cock-toe-tendrils into you, you begin to see Valeria's body shrinking and deflating... Oh, god...");
		MainScreen.text("\n\nHer gut becomes concave, then her face, until she's pouring off your body and around your waist.  You try and struggle, but it's too late.  She surges up your rectum, utterly filling you with herself.  You can only sit and watch as your stomach begins to expand, pushing dangerously out from your ribs as the last little bits of Valeria suck up your ass.");
		MainScreen.text("\n\n\"<i>VALERIA!</i>\" you shout, poking your stomach.  Your flesh quivers, shaking like a great big bowl of goo.");
		MainScreen.text("\n\n\"<i>Hey there, partner,</i>\" you hear a laugh from inside you.  Before you can say anything else to the goo-girl inside you, your stomach rumbles.  You double over, half in pleasure half in pain as something lurches inside you.  You feel a rush going out your colon, and just squat in time for Val to explode out of your ass in one massive thrust.  You cum, an anal orgasm rocking your body as Valeria pops out your bum, pouring out of your well-stretched sphincter.");
		//(All Genders Reconvene) 
		if (clearText) {
			MainScreen.text("\n\nYou collapse, goop flowing freely from your abused body.  Laughing, Valeria pours out of your lap, ");
			if (player.gender > 0) MainScreen.text("patting her belly full of your juices, ");
			MainScreen.text("and looms over you.  \"<i>That was fun, partner,</i>\" she says, leaning down to give you a wet peck on the cheek. \"<i>Let's do that again soon, alright?</i>\"");
			player.orgasm();
			player.stats.sens += 1;
			HPChange(25, false);
			doNext(camp.returnToCampUseOneHour);
		}
	}

	//Valeria -- [Sex] -- [Penetrate Her] (Dickwielders only)
	private penetrateValeria(): void {
		spriteSelect(79);
		MainScreen.clearText();
		MainScreen.text("\"<i>Mmm, that's a tasty-looking cock,</i>\" Valeria says as you disrobe, letting your " + CockDescriptor.describeCock(player, 0) + " flop free.  \"<i>I just might have to get a sample,</i>\" she chuckles, squatting down before you and taking your shaft in hand.  Rather than giving you a simple handy, however, the goo-girl places her palm against the head of your cock and presses forward.");
		MainScreen.text("\n\nYou gasp as her gooey skin parts, letting your " + CockDescriptor.describeCock(player, 0) + " slip inside her.  Her palm and forearms act like a snug, wet cocksleeve, shifting and molding to perfectly fit around your prick as you slide into her up to the hilt.  She grins up at you as she gives you a handy the likes of which only a goo-girl could manage, using her penetrable palm like a cunt.  You groan as she moves her arm, slowly stroking your cock inside of her, occasionally varying her motions, making wide circles around you or moving side to side.");
		MainScreen.text("\n\nBefore you can get too comfortable, however, Valeria sidles forward and moves your " + CockDescriptor.describeCock(player, 0) + " from her arm to her breast with a wet POP.  She squeezes her palmable C-cups together and leans in, letting your cock slip in between them and into her gooey flesh.  You moan as the pleasurable wetness and warmth of her interior returns when the goo-girl begins to titty-fuck you, slipping her wet breasts along the length of your shaft as the head bobs in and out of her cunt-like interior.");
		MainScreen.text("\n\nYou sink your fingers into the goo's shoulders and start to guide her speed, moving her back and forth along your cock at your own pace like a particularly lush onahole.  The normally-dominant Valeria makes a surprised, happy squeal as you seize control.  She redoubles her efforts of tit-fucking your " + CockDescriptor.describeCock(player, 0) + " as you use her as your own personal sex-toy, roughly ramming her back and forth on your shaft until you feel an orgasm bubbling up inside you.");
		MainScreen.text("\n\nValeria seems to sense the coming climax, too; she melts out of your grasp and slithers back, just out of reach.  \"<i>Tsk, tsk. I'm not done with you yet, [name],</i>\" she teases, gliding back as you try to grab her, desperate for release.  She waggles a finger at you, denying you access to her body, but a 'come hither' look spreads across her features.  You pursue her, your raging erection demanding her care, but she deftly eludes you until the threat of orgasm has passed.  Only then does the goo-girl slow, letting you roughly grab her shoulders and throw her to the ground.");
		MainScreen.text("\n\n\"<i>Ohhh, you want it rough, partner?</i>\" she laughs, spreading her gooey legs to reveal the slick tunnel of her cunt.  \"<i>Well, what are you waiting for? Let me have it already!</i>\"");
		MainScreen.text("\n\nYou eagerly oblige her, throwing her legs over your shoulders and plunging in.  Valeria lets out a roar of pleasure as you slide into her, burying yourself up to the hilt as her gooey insides conform to the exact shape of your " + CockDescriptor.describeCock(player, 0) + ", forming the perfect sleeve for you to fuck.  You sink your fingertips into her soft hips and start to pound her, slamming your cock into her until her groin begins to lose its consistency, warping around your hips until she practically swallows you whole.");
		MainScreen.text("\n\nValeria laughs and you cry out as she wraps her legs around your back and pulls you in, burying your face between her tits and sinking your hips and cock deep into her crotch.  She pulls you further in, forcing your face into and through her skin until you're nearly swallowed up by the goo-girl, only your struggling [legs] left outside her.  Valeria giggles and pats her belly, letting you just feel the touch of her hands through the goop around you.");
		MainScreen.text("\n\nYou try to struggle inside Valeria, but you let out a yelp of pleasure as she grabs your cock, her goo jutting from her hips to form a tight sheath around your length.  She merely grins and begins to jerk you off, running her hands easily up and down the length of your gooey cocksleeve.  You writhe inside her, held in place by the tight goo-body surrounding you and the hands firmly grasping your " + CockDescriptor.describeCock(player, 0) + ".  She coos and groans as she masturbates you, obviously enjoying the sensation as much as you are --  and maybe more.");
		MainScreen.text("\n\nSuddenly, you feel the goo constricting around you, threatening to crush you.  Your struggling intensifies, only serving to help Valeria get off even harder.  She throws back her head and screams, jerking both her hands along your shared shafts as she cums, goo exploding out the top of your cocksheath.  Feeling her contract and squeeze down on your " + CockDescriptor.describeCock(player, 0) + ", you're suddenly assaulted with the sensation of inevitable orgasm.");
		MainScreen.text("\n\nWith a sudden surge of strength, you take advantage of Valeria's dazed state to roll onto your knees, freeing your upper body from her so that only your hips and cock are still inside her rapidly-deforming body.  You grab her tits and jackhammer your prick into her, pounding her until you see rivulets of pre squirming through her.  Laughing, you let yourself go and cum, watching thick ropes of your spunk shoot into her depths, turning into a white mist inside her blue body.");
		MainScreen.text("\n\nWith a relieved, exhausted sigh, you collapse backwards, popping out of Valeria's body with a wet squelch.  As you lie on your back, panting from the rough sex, you notice Valeria reconstituting her body into her normal human form, a mist of cum rolling happily in her full belly.  She makes a show of rubbing her tummy before coming over and plopping down on top of you, her gropable bum pressing lightly on your gut.");
		MainScreen.text("\n\n\"<i>That was fun, partner,</i>\" she laughs.  \"<i>Tasty, too,</i>\" she adds, reaching into her belly to pull out a strand of your cum.  She slurps it back down, giving you a little wink.");
		MainScreen.text("\n\nYou run your hand along her curves as she digests her meal, but eventually you know you need to get on with your duties.  You roll Valeria off of you and start to redress.");
		player.orgasm();
		player.stats.sens += 1;
		HPChange(25, false);
		doNext(camp.returnToCampUseOneHour);
	}

	//[Valeria] -- [Sex] -- [Get Dominated]
	private valeriaSexDominated(): void {
		spriteSelect(79);
		MainScreen.clearText();
		MainScreen.text("Making a show of playing hesitant and nervous, you tell Valeria you'd like her to take charge.  A wide grin quickly spreads across her girlish features.  \"<i>Mmm, feeling subby today, partner?  Good, good... You just let Valeria take good care of you, " + player.mf("handsome", "cutie") + ".</i>\"");
		MainScreen.text("\n\nWith a sexual swing of her hips, Valeria closes the distance between you and presses her lips to yours.  One of her arms easily wraps around your neck, pulling you close to her as her other snakes into your clothes, teasing and caressing your inner thighs.  Suddenly, Valeria gives you a rough push, throwing you onto your ass.  She looms over you, licking her lips and placing one of her gooey feet firmly on your chest.  Goop seeps out of her heels, slithering out to bind your arms and [legs] as she encases your torso.");
		MainScreen.text("\n\n\"<i>Just lie back and submit, partner. It'll be better that way...</i>\"");
		//(PC has Vagina)
		if (player.lowerBody.vaginaSpot.hasVagina() && (!player.lowerBody.cockSpot.hasCock() || rand(2) == 0)) {
			MainScreen.text("\n\nValeria begins to use her goo to peel back your clothes, soon revealing your defenseless [vagina].  She makes a show of licking her lips as tendrils of goo seep into your cunt, filling you utterly.  You meekly submit to your gooey captor, letting Valeria have her way with you. Seeing your lack of resistance, she smiles and coos what a good " + player.mf("boy", "girl") + " you are, slowly withdrawing herself from your [vagina].");
			MainScreen.text("\n\nYou have only a moment to figure out what's coming before her goo - now perfectly shaped like the inside of your cunt - slams back into you like a stiff cock.  You can't help yourself as a moan escapes your lips, barely audible through the goop covering your mouth.");
			player.cuntChange(player.vaginalCapacity(), true, true, false);
			MainScreen.text("\n\n\"<i>Oh, you like that, do you?</i>\" the armor-goo asks, smiling evilly.  \"<i>Hmm, maybe if you're a good " + player.mf("boy", "girl") + ", I'll let you get off, too</i>\"  Still grinning, she begins to hammer her cock-like appendage into your pussy, fucking you fast and hard with her goo-dildo.");
			//[If PC has breasts > A-cups: 
			if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 1) {
				MainScreen.text("  As she hammers your cunny, bits of her goo swirl around your [chest], squeezing and massaging your tits. You squirm as she roughly teases your boobs, pinching at your nipples and squeezing your tender flesh roughly.");
				if (player.lactationQ() > 0) MainScreen.text("  To her delight, a spray of warm milk jets out of your sore nipples, milky white mixing into blue goo like oil in water.  \"<i>Mmm, tasty!</i>\" she teases, massaging more and more from you.");
			}
			MainScreen.text("\n\nShe continues to pound your cunt mercilessly, her grin spreading to inhuman width as your juices begin to flow around and into her gooey penetration. She soaks your fem-lube up greedily, enjoying the meal, but her fucking is relentless until you feel orgasm approaching. \"<i>Aw, ");
			if (player.tallness > 60) MainScreen.text("big ");
			else MainScreen.text("little ");
			MainScreen.text(player.mf("boy", "girl") + " ready to cum?</i>\" she withdraws herself from you, leaving you feeling suddenly very, very empty.  \"<i>I didn't say you could cum yet, slut! I'm not done with you yet.</i>\"");
			MainScreen.text("\n\nYou gulp nervously as Valeria withdraws the goo from your entire body, leaving you naked save for the bonds she's placed on your wrists.  Roughly, she grabs your [hips] and rolls you over, forcing you into a kneeling position.  Grinning, she grabs your hair and pushes your face in the dirt, grinding your cheeks into the hard-packed ground as her hips press against your [butt].  You feel a warm, slick shaft plop between your asscheeks, grinding between them; another leaps up, wrapping around you, prodding at the entrance to your [vagina].");

			MainScreen.text("\n\nYou can only grit your teeth as Valeria pushes into you, leaning in as she slides her twin cocks into your cunt and asshole, meeting no resistance thanks to her goopy nature");
			if (player.vaginalCapacity() > 80 || player.analCapacity() > 80) MainScreen.text(" and your own receptibility");
			MainScreen.text(".  Hugging your back, the goo-girl grabs at your [chest], squeezing your tits and pinching at your nipples.  \"<i>Moan for me, bitch,</i>\" Valeria growls into your ear, giving your [nipples] a particularly violent tug.  You let out a lewd, whorish moan.  The goo-girl grins, her tongue lashing out to lick your ear as she rewards you with a single long thrust into your depths, filling and stretching your [vagina] and [asshole] completely before withdrawing.");
			MainScreen.text("\n\n\"<i>Well?</i>\" she demands, her cocks utterly still at the entrances to your holes.  \"<i>Don't stop moaning 'til I let you cum, you hear me?</i>\"");
			MainScreen.text("\n\nYou let out a whimpered moan, and immediately Valeria slams herself back into you.  Your moan turns into a scream of pleasure, but obediently you do as Valeria commanded and moan as she withdraws.  She thrusts right back into you, stretching you out wonderfully.  You fall into a happy pace, moaning and groaning as Valeria fucks you roughly, stuffing both your holes with her goo and savaging your breasts until your mind goes hazy with pleasure.");
			MainScreen.text("\n\n\"<i>Here we go...</i>\" Valeria grunts, \"<i>Now you can cum.  Go ahead, little bitch.  Feed me.</i>\"");
			MainScreen.text("\n\nYou cum at her command, fem-spunk gushing out of your [vagina] and into the goo-cock stuffed up your twat.  Both your holes contract hard on Valeria's dicks.  Laughing, the goo-girl absorbs your cum, growing larger and larger as you feed her, until she towers over you, her massive cocks now painfully stretching your walls.  \"<i>Oh, that's good.  Good, girl, good.  Yes, let it all out, just like that... just like that,</i>\" she coos, soaking your juices up until your orgasm finally passes.  Sated, she withdraws from inside you, leaving a decidedly empty feeling in your gut as she allows you to stand.");
			MainScreen.text("\n\n\"<i>Mmm, not bad, partner</i>\" Valeria says, patting her full belly.  You can see a bit of your cum ");
			if (player.lactationQ() > 0) MainScreen.text("and milk ");
			MainScreen.text("swirling around inside her.  \"<i>We'll do this again sometime,</i>\" she adds, walking off to another part of camp with a wink.");
		}
		//(PC has Dick)
		else {
			MainScreen.text("\n\nValeria begins to use her goo to peel back your clothes, soon revealing your defenseless, half-erect  package.  She makes a show of licking her lips as tendrils of goo wrap tightly around [eachCock] like a warm, wet onahole. You submit to your gooey bonds, and seeing your lack of resistance, Valeria smiles down at you and squeezes your " + CockDescriptor.describeMultiCockShort(player) + " tighter.");
			MainScreen.text("\n\nYou gasp with pleasure as she starts to stroke [eachCock], jerking you off as she looms over you, grinning wickedly.  \"<i>Oh, you like that do you?</i>\" the armor-goo asks.  \"<i>Well then, I might just let you get off, too... If you're a good " + player.mf("boy", "girl") + "</i>\"  She starts to increase her tempo, making you squirm and writhe as she wanks your " + CockDescriptor.describeMultiCockShort(player) + ", licking her lips as little bubbles of pre start to form.");
			MainScreen.text("\n\nHelpless, you can only submit and try to enjoy yourself as the armored goo-girl continues to milk you.  She jerks you off mercilessly, her grin spreading to inhuman width as your pre begins to flow around and into her gooey 'hands.'  She soaks your pre-cum up greedily, enjoying the meal, but her fucking is relentless until you feel orgasm approaching.  \"<i>Aw, ");
			if (player.tallness > 60) MainScreen.text("big");
			else MainScreen.text("little");
			MainScreen.text(" " + player.mf("boy", "girl") + " ready to cum? Well, go on then - we've got time for more.</i>\"");
			MainScreen.text("\n\nYou cum, ropes of thick, white jizz shooting out of your cock and into the goo's waiting body.  Laughing, the goo-girl absorbs your cum, growing larger and larger as you feed her until she towers over you, her expanding breasts and belly now hanging over you.  \"<i>Oh, that's good. Good, " + player.mf("boy", "girl") + ", good.  Yes, let it all out, just like that... just like that,</i>\" she coos, soaking your cum up until your orgasm finally passes.");
			MainScreen.text("\n\nBefore you can think clearly again, though, Valeria drops down onto you, impaling herself on [oneCock].  You yelp as she enwraps your overly-sensitive flesh, stroking and pulling on your cock, forcing it to remain hard after your orgasm.  Straddling your helpless form, Valeria begins to rock her hips, humping your spent cock.");
			MainScreen.text("\n\n\"<i>What, didn't think I'd let such a tasty treat go after just one bite? Oh, no. Not a chance.</i>\"");
			MainScreen.text("\n\nYour eyes go wide as Valeria turns around on your prick, bracing herself on your [feet].  Now riding you reverse-cowgirl style, Valeria grabs your hands and puts them on her bubble butt, commanding you to play with her as she milks you for a second time.  You do as she commands, fingers sinking into her gooey flesh until the girl makes a sharp, pleasured gasp.  But you're only just able to focus on your task, much of your mind locked on your weary cock buried inside Valeria's body.  You can just see your " + CockDescriptor.describeCock(player, 0) + " through her cum-filled body, bobbing limply inside her as she bounces.");
			MainScreen.text("\n\nThe goo-girl rides you hard, bouncing on your cock until your hips and thighs are liberally splattered with stray strands of goo and semen.  You have to give her credit - you can't manage to go limp under her rough ministrations, and before long you're rock hard again.  Valeria grins over her shoulder at you, but doesn't let up for an instant.  You can feel your orgasm rising once again, but as soon as your dick starts to throb, Valeria lifts herself off you in a quick, fluid motion, leaving you weakly thrusting your hips in the air.  With your hands firmly bound by goo, you cannot give yourself release.");
			MainScreen.text("\n\n\"<i>Aw, ready to cum again so soon?</i>\" she coos, looming over you with her hands firmly on her flared hips.  \"<i>But I didn't say you could cum yet, little bitch.  Maybe if you begged,</i>\" she adds, gently tapping your " + CockDescriptor.describeCock(player, 0) + " with her big toe, sending shivers of ecstasy up your spine, \"<i>maybe then I'll let you cum.</i>\"");
			MainScreen.text("\n\nDesperate, you plead with Valeria to let you cum. She grins, but does nothing.  You cry out her name, begging her to help you.  Your lover makes only the slightest of motions, flicking her sole across the bottom of your shaft.  You feel like you could faint.");
			MainScreen.text("\n\n\"<i>One more time, slut,</i>\" she commands, utterly still. \"<i>Beg for it.</i>\"");
			MainScreen.text("\n\nYou beg for it. You want it more than anything in the world.  The demons could take this world if you could only cum!");
			MainScreen.text("\n\nValeria throws her head back and laughs as she submerges your prick into her gooey foot. The tight, wet hole surrounding you is too good to resist.  You yell out in pleasure and cum, watching as thick ropes of your hot white spunk blast into Valeria's leg, mixing with the cocktail of your fluids already wafting around inside her.  Valeria's laugh turns into a rapturous half-cry as the influx of fluids and your sudden penetration of her footgina set her off, sending literal quivers throughout her gooey body.");
			MainScreen.text("\n\n\"<i>Oh, that's good... good, " + player.mf("boy", "girl") + ", good.  Yes, let it all out, just like that... just like that,</i>\" she moans, soaking your juices up until your orgasm finally passes.  Sated, she withdraws around your foot, leaving you a quivering mess on the ground.");
			MainScreen.text("\n\n\"<i>Mmm, not bad, partner</i>\" Valeria says, patting her full belly.  You can see a bit of your cum swirling around inside her.  \"<i>We'll do this again sometime,</i>\" she adds, walking off to another part of camp with a wink.");
		}
		HPChange(25, false);
		player.orgasm();
		player.stats.sens += 1;
		if (!Game.inCombat)
			doNext(camp.returnToCampUseOneHour);
		else cleanupAfterCombat();
	}

	//Followers -- [Valeria] -- [Talk]
	private talkWithValeria(): void {
		spriteSelect(79);
		MainScreen.clearText();
		MainScreen.text("You ask Valeria if she wouldn't mind just talking for a little bit.");
		MainScreen.text("\n\n\"<i>I dunno, partner,</i>\" she teases, sitting down beside you, \"<i>That's asking an awful lot.</i>\"");
		MainScreen.text("\n\nYou roll your eyes and, after a few pleasantries, venture to ask her... well, what the hell she is, exactly.  She's not at all like the average goo-girl wandering around Mareth.  She talks, she walks on two legs...");
		MainScreen.text("\n\nShe laughs girlishly, waving you off like you've said something absurd.  \"<i>I'm not a real goo, you know. At least, I didn't start out this way,</i>\" she adds, indicating her gooey blue form.  \"<i>No, I was a human, like you");
		if (player.race() != "human") MainScreen.text(" were");
		MainScreen.text(".  I just, I dunno, changed, I guess.</i>\"");
		MainScreen.text("\n\nChanged?");
		MainScreen.text("\n\n\"<i>Well, yeah. Back when the demons first came.  One of them took me and... changed me,</i>\" she says quietly, looking quickly away. \"<i>I don't know if there were real goo-girls or slimes back then.  I guess I was something of an experiment - a prototype, maybe.  The magic the demons used on me wasn't quite the same as whatever creates the goos nowadays, though.  I'm as mentally capable as I ever was, can talk, walk on two legs... The whole deal.  Biggest change is that shit like this happens,</i>\" she adds, picking up a nearby rock and poking into her belly. It floats listlessly inside her, darkly visible through her gooey skin.");
		MainScreen.text("\n\nYou quickly remark that, for someone who was the subject of demonic magics, she seems to be remarkably unscathed.  Most demon victims, you'd think, would be raving mad with lust at the very least.");
		MainScreen.text("\n\nValeria chuckles wryly. \"<i>Well, it's not like I'm completely unchanged,</i>\" she whispers huskily, leaning close and looking hungrily at your crotch.  \"<i>After all, I have certain... appetites... now, you know.  I'm not proud of my new needs, but I'm afraid I just can't ignore them...</i>\"");
		//How do you respond to that?
		//(Display Options: [Flirt](PC has Gender) [Accept] [Gross])
		if (player.gender > 0) simpleChoices("Flirt", flirtWithValeria, "Accept", acceptValeriasNeeds, "Gross", declineValeriasNeeds, "", null, "", null);
		else simpleChoices("", null, "Accept", acceptValeriasNeeds, "Gross", declineValeriasNeeds, "", null, "", null);
	}

	//[Flirt]
	private flirtWithValeria(): void {
		spriteSelect(79);
		MainScreen.clearText();
		MainScreen.text("You slip an arm around Valeria's slender shoulders and pull her close.  Patting your crotch, you tell her you're practically a gourmet chef for a girl like her.  She giggles and slips a hand easily into your [armor], ");
		if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("brushing along the length of your rapidly-hardening cock");
		else MainScreen.text("brushing a wet, warm knuckle across your [clit]");
		MainScreen.text(".");

		MainScreen.text("\n\n\"<i>Mmm. I'm sure you are, partner,</i>\" she murmurs into your neck, nuzzling against you.  \"<i>So, what do you say you whip me up a little meal?</i>\"");
		//(Display Sex Options)
		followersValeriaSex(false);
	}

	//[Accept]
	private acceptValeriasNeeds(): void {
		spriteSelect(79);
		MainScreen.clearText();
		MainScreen.text("You smile and tell Valeria that you're perfectly all right with her special needs");
		if (player.statusAffects.has("SlimeCraving")) MainScreen.text(" after all, you have the same ones");
		MainScreen.text(", as long as they don't interfere with your mission as Champion.");
		MainScreen.text("\n\n\"<i>They won't, partner,</i>\" Valeria says with a little wink. \"<i>I give you my word.</i>\"");
		MainScreen.text("\n\nNodding, you ruffle her gooey hair and get back to business.");
		doNext(valeriaFollower);
	}
	//[Gross]
	private declineValeriasNeeds(): void {
		spriteSelect(79);
		MainScreen.clearText();
		MainScreen.text("You grimace and push the goo-girl away.  You've got no interest in her corrupted 'needs,' especially with a look like that on her face.  She gasps as you push her, nearly falling over; she catches herself and glowers angrily.");
		MainScreen.text("\n\n\"<i>Well, fuck you kindly, [name],</i>\" she says with a huff.  \"<i>Pardon me for being... me.</i>\"  She turns up her chin and saunters off to a part of camp about as far away from you as possible.");
		//(Disable Valeria sex for 6 hours)
		doNext(camp.returnToCampUseOneHour);
	}

	private takeValeria(): void {
		spriteSelect(79);
		armors.GOOARMR.useText();
		player.armor.removeText();
		let item: Armor = player.setArmor(armors.GOOARMR); //Item is now the player's old armor
		if (item == null)
			doNext(playerMenu);
		else inventory.takeItem(item, playerMenu);
	}

	public valeriaAndGooThreeStuff(): void {
		MainScreen.clearText();
		MainScreen.text("You cautiously approach with Valeria's voice egging you on, \"<i>We gonna fuck her? We're gonna fuck her, ain't we, [name]?</i>\" She affectionately fondles your ");
		let list: Array = ["[hips]"];
		if (player.lowerBody.balls > 0) list.push("[balls]");
		if (player.lowerBody.cockSpot.count() > 0) list.push("[multiCockDescriptLight]");
		if (player.lowerBody.vaginaSpot.hasVagina()) list.push("[vagina]");
		list.push("[asshole]");
		list.push("[nipples]");
		MainScreen.text(formatStringArray(list) + " with liquid-soft caresses, almost ephemeral and yet still so perfectly all-consuming, filling every tiny imperfection in your [skin] with blue, gooey goodness and teasing whatever entrances she can get at. ");
		/*
			clearList();
			addToList("[hips]");
			if(player.lowerBody.balls > 0) addToList("[balls]");
			if(player.lowerBody.cockSpot.count() > 0) addToList("[multiCockDescriptLight]");
			if(player.lowerBody.vaginaSpot.hasVagina()) addToList("[vagina]");
			addToList("[asshole]");
			addToList("[nipples]");
			MainScreen.text(outputList() + " with liquid-soft caresses, almost ephemeral and yet still so perfectly all-consuming, filling every tiny imperfection in your [skin] with blue, gooey goodness and teasing whatever entrances she can get at. ");
		*/
		if (player.lowerBody.cockSpot.hasCock()) {
			MainScreen.text("You sigh as [eachCock] stands at full erection. Bluish coating");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
			MainScreen.text(" barely thicker than a condom stretch");
			if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("es");
			MainScreen.text(" around ");
			if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("it as it distends");
			else MainScreen.text("them as they distend");
			MainScreen.text(" Valeria's increasingly liquescent form. Dripping off the tip");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
			MainScreen.text(", sapphire slime falls in long gooey stands, yet the whole time you feel as if a dozen hands are dragging lubricant-coated feathers over the whole of your sensitive organ");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
			MainScreen.text(".");
		}
		else if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("You sigh your as [vagina] is tenderly caressed by what feels like dozens of lubricant-soaked feathers, tickling at the skin in a way that makes your entrance grow hot enough to make you wonder why Valeria hasn't been cooked into steam. The airtight seal over your mons is steadily shifting around and about to stimulate you. Sometimes, a narrow band of semi-solid goo slips between your lips like an oh-so-narrow thong, the slime mixing with your own suddenly-copious sexual juices to form a salacious, barely restrained soup of girlish need. She holds herself back from diving into your entrance... for now.");
		else MainScreen.text("You sigh as your [asshole] is tenderly licked and tickled by what feels like dozens of inhumanly long tongues, slathering over it in such wide circles that your cheeks get a thorough lashing as well. Bands as firm and strong as leather straps slip into place around your [butt] to spread you wide open, and one of the slender, slime-crafted organs slithers deeper to taste your rosebud, never quite pushing in.");
		MainScreen.text("\n\nYour gait turns a little stuttery in no time flat, and your hips sway and jerk erratically as you approach the fallen goo, helplessly bound to respond to the sensuous caresses of the body-clinging goo. She somehow keeps it up even after you're looming over your defeated foe, giggling airily as you examine your prize.");

		if (Flags.list[FlagEnum.TIMES_VALERIA_GOO_THREESOMED] == 0) MainScreen.text("\n\nUnfortunately for you, the fuck-hungry goo-slut is intent on taking command here.");
		else MainScreen.text("\n\nJust like last time, the fuck-hungry goo-slut is taking command.");
		MainScreen.text("  She surprises you by contorting your body with pressure from an unexpected angle, tipping you head over heels, right toward the wide-eyed goo-girl you just managed to defeat!");

		MainScreen.text("\n\nYou splash " + HeadDescriptor.describeFace(player) + "-first into a cushiony mass of forgiving slime, but the momentum only carries you partway into the humanoid puddle. A semi-solid lump bumps off your cheek as you come to rest, floating inside a " + (monster as GooGirl).gooColor() + " prison. Shaking your head to clear your vision, you try to determine what you hit, but all you can see is a filmy blur, and you can't breathe either. Your cheeks puff out while you struggle to surface. As always, Valeria has your back. Her unsubtle drawl vibrates, \"<i>I gotcha, partner,</i>\" wetly against your eardrums as you are bodily rotated, slowly pushing your head through the " + (monster as GooGirl).gooColor4() + " surface while your body is thoroughly ensconced in slime.");
		MainScreen.text("\n\nNo matter how you try to move, you can't budge an inch! The liquid weights of the twin, fluid females may as well be composed of iron for all they give; the harder you struggle, the firmer their restraining force grows. At the same time, the torturous touches that helped goad you into this course of action return, only far firmer and more insistent.");
		MainScreen.text("\n\nThe bluish");
		if (monster.skinTone != "blue") MainScreen.text(" " + (monster as GooGirl).gooColor6());
		MainScreen.text(" juices slowly meld together until you cannot tell one from the other, and they firm up into a semi-translucent, flat-bottomed sphere, trapping you there. Your debauched and hopelessly aroused state is visible to any who would wander by, stroked by dark-colored currents that wrap around your ");
		if (player.lowerBody.cockSpot.hasCock() || player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("genitals");
		else MainScreen.text("[asshole]");
		MainScreen.text(" with sinful tightness. An involuntary shiver of excitement traverses up your spine, though your body is held almost completely stock-still in its sloshing vice.");

		MainScreen.text("\n\nA distortion becomes visible on the arced field of blue before you, slowly resolving into the familiar, sloppy visage of Valeria. A second later, another, unfamiliar face follows, coming up beside her, but a blue hand flattens against the top of the newcomer to smush it away into nothing. Valeria says, \"<i>No way, toots. Let momma do the talkin'....</i>\"");
		MainScreen.text("\n\nYou ");
		if (Flags.list[FlagEnum.TIMES_VALERIA_GOO_THREESOMED] == 0) MainScreen.text("demand that she release you");
		else MainScreen.text("playfully comment that she really ought to release you");
		MainScreen.text(", but the troublesome, liquid armor shakes her head negatively.");
		MainScreen.text("\n\n\"<i>You just sit tight, [name]. I'm gonna give my sister a fun new experience and fill you with so much pleasure that you'll feel like you're gonna pop.</i>\" She disappears back into the azure blob before you can respond. The fading ripples almost mock your inability to reply as they smooth into nonexistence.");
		dynStats("lus=", 100);
		menu();
		MainScreen.addButton(0, "Next", valeriaGooRapeII);
	}

	private valeriaGooRapeII(): void {
		MainScreen.clearText();
		MainScreen.text("The lump that bumped you earlier smacks off ");
		if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 3) MainScreen.text("the valley of your cleavage");
		else MainScreen.text("your chest");
		MainScreen.text(" once more, and this time you catch a glimpse of it out of the corner of your eye. It's the goo-girl's core, clasped in a fist of deep-blue. It pulses faintly as it's held there, just before you, while subtle vibrations and temperature fluctuations alert you to some kind of secret communications between the two women. Just what are they planning?");
		MainScreen.text("\n\nYou get your answer in the form of a sudden");
		if (Flags.list[FlagEnum.TIMES_VALERIA_GOO_THREESOMED] == 0) MainScreen.text(", unexpected");
		else MainScreen.text(" but expected");
		MainScreen.text(" pressure at your [asshole]. It's so... so slick that you have to wonder how they can manage to push with such authority at your rearmost orifice, but they manage it all the same. You clench to deny them entrance, squeezing your sphincter shut tighter than locked door. Valeria's giggling voice coos from somewhere below, \"<i>Oh, don't be a spoilsport. Come on, it'll be fun.</i>\"");

		if (Flags.list[FlagEnum.TIMES_VALERIA_GOO_THREESOMED] == 0) MainScreen.text("\n\nYou hold tight anyway, at least until she yanks your cheeks wide-open and twists whatever it is she's trying to force inside you, slowly spreading you open with a soft, organic, anal drilling.");
		else MainScreen.text("You hold tight, keeping up your faux resistance until she yanks your cheeks open and twists her gooey reaming-tool into a sphincter-penetrating drill bit.");
		MainScreen.text(" Spinning faster and faster, the intruding, cylindrical slime dilates your [asshole] to its maximum gape in four or five seconds, hardening its exterior into an butt-stuffing goo-pipe. You can feel it snaking around through your bowels, plumbing deeper inside you than you would have thought possible before stopping what feels like halfway through your large intestine.");
		//{Butt-change: full anal size}
		player.buttChange(player.analCapacity() * .75, true, true, false);
		//Lay pipes in cooch! {reqiores non pregnant}
		if (!player.isPregnant() && player.lowerBody.vaginaSpot.hasVagina()) {
			if (silly()) MainScreen.text("\n\n\"<i>But wait, there's more!</i>\" Billy Mays announces.");
			MainScreen.text("\n\nShortly after, a similar sized blob of semi-liquid matter rubs over your [vagina], brushing aside Valeria's feathery teases to spread your lips around the slick bubble, shooting tingles of pleasure through your body. You try to shift, to grind against the messy intruder, but all restrained as you are, all you can do is quiver against your bindings, vibrating in pleasures that would be plain to any watchers. The penetration doesn't stop Valeria's teases either. The talented woman continues to roll feathery caresses over the exterior of your genitalia while opening you open as wide as any dick you've ever taken, burrowing a tunnel straight to your cervix.");
			//{cuntChange: MAXIMUM}
			player.cuntChange(player.vaginalCapacity() * .75, true, true, false);
			MainScreen.text("\n\nThere, the cerulean shaft batters hard against the restrictive opening to your womb, pushing with firm pressure until some slime rolls into your empty, baby-making chamber. You cannot help but cry out to the sensation of your incredibly thorough doublestuffing. Wincing, you endure the slow stretching of your inner gates, and once the tunneling ooze has established a decent-size path to your uterus, the outside solidifies, much like the one in your ass. A suction starts on your [clit] to distract you from this, and its success is evidenced by the copious fuck-juices your [vagina] feeds the mixed goo-girls.");
		}
		//Fuckable nipples
		if (player.upperBody.chest.hasFuckableNipples() && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 5) {
			MainScreen.text("\n\nYour [fullChest] are roughly squeezed and groped by what feels like Valeria's hands, pressed together and pulled apart. Sometimes they even pull on them, suctioning your tits hard enough to make them appear larger for a time. No matter what, the licentious caresses always come back to your [nipples], squeezing and tugging on them until your lust makes them as wet and free-flowing");
			if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" as your snatch");
			else MainScreen.text(" as the randiest slut's snatch");
			MainScreen.text(". Valeria takes this as an invitation, and " + num2Text(player.upperBody.chest.countNipples()) + " phallic objects greedily push at your cunt-nipples, eagerly sliding themselves inside your welcome chest-pussies. Looking down, you can see the navy-blue outlines of the phallic tendrils waving and writhing as they push their way deep, embedding themselves tit-deep in blissful warmth.");
		}
		//Dick
		if (player.lowerBody.cockSpot.hasCock()) {
			MainScreen.text("\n\nValeria's voice calls out once more, \"<i>You didn't think I'd forget ");
			if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("this little guy");
			else MainScreen.text("these little guys");
			MainScreen.text(", did you? ");
			if (player.lowerBody.cockSpot.biggestCocks[0].cockArea() >= 50) MainScreen.text("...Maybe big guy is a bit more appropriate. Whatever. ");
			MainScreen.text("I was just saving the best for last. Hold on tight, tiger.</i>\"");
			MainScreen.text("\n\nThe sleeve of squishy ecstasy surrounding [eachCock] tightens up a little to hold your twitching, ecstatic boner");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
			MainScreen.text(" in place, and something even warmer than the slippery container");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
			MainScreen.text(" pushes at your head");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
			MainScreen.text(", circling your urethra");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
			MainScreen.text(". You inadvertantly clench your muscles in a way that makes your " + CockDescriptor.describeMultiCockShort(player) + " so very swollen, in turn making it that much easier for the gelatinous fiend to have her way with your cumslit");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
			MainScreen.text(". You feel that warm, wet fluid slowly peel it open and push inside. It doesn't hurt at all, but it is a little weird having your " + CockDescriptor.describeMultiCockShort(player) + " slowly stuffed in such a way. The warmth travels the whole way down your dick");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
			MainScreen.text(" to your middle, where you can feel it travel a bit further before it finally stops at your [balls].");
		}
		//Merge
		MainScreen.text("\n\nGiggling, the sapphire slut does something that makes the body-wrapping sphere jiggle and contract slightly. ");
		if (Flags.list[FlagEnum.TIMES_VALERIA_GOO_THREESOMED] > 0) MainScreen.text("You grin in eager anticipation, waiting to feel the flood of fluid that you know is coming. It won't take long.... You feel it in your butt first.");
		else MainScreen.text("At first, you don't realize what it is. You're floating in a bit of a sexual daze by now and barely cogent of what's going on, but it does feel quite nice, whatever it is. The spreading heat in your posterior is what finally clues you in to what's happening.");
		MainScreen.text(" Pumping deep into your bowels, the hardened protrusion is no longer simply stuffing you. It's pumping something slick and wet and oh so gooey straight into your [asshole], filling you up so strangely that you aren't sure what to make of beyond how... well, good it feels to be stuffed like this.");

		//{Vagina!}
		if (player.lowerBody.vaginaSpot.hasVagina()) {
			MainScreen.text("\n\nYe gods, this is good! You shudder as the tube in your twat follows the anal-obsessed booty-filler, shooting thick globs of gel-like material into your open, receptive womb. You can feel the bulges of ooze making the semi-solid pipe bulge in your channel, massaging your walls and cervix as they pass. They roll out into your rapidly-filling womb in a way that forces a blissful maternal glow to your cheeks and rounds your belly more than a little bit. You swoon, ");
			if (player.lowerBody.vaginaSpot.get(0).vaginalWetness <= 2) MainScreen.text("leaking");
			else if (player.lowerBody.vaginaSpot.get(0).vaginalWetness <= 3) MainScreen.text("dripping");
			else MainScreen.text("squirting");
			MainScreen.text(" your girlcum in feverish releases of ecstasy, repeatedly getting off on this perverse, doubled slime-flation.");
		}
		//{titties}
		if (player.upperBody.chest.hasFuckableNipples() && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 5) {
			MainScreen.text("\n\nYour breasts soon experience something similar as the tentacle-like phalli convulse and squirt, ejaculating thick streamers of something hot straight into your tits. Rather than feeling the copious goo-spoo rolling back out your entrances, you just get fuller and fuller until you see the curve of your ");
			if (player.upperBody.chest.count() > 1) MainScreen.text("top row of breasts");
			else MainScreen.text("breasts");
			MainScreen.text(" pulling away from your body, gaining cup sizes in a span of seconds, your skin stretching taut under the moist deluge. Your tit-twats quiver with delight, feeling nothing but obscene, ever-growing pleasure until they're squeezing down on the sloppy tentacle-cocks, milking them to cum harder and faster, which in turn bloats your ecstatic tits into blissful, bloated orbs.");
		}
		//{cocks!}
		if (player.lowerBody.cockSpot.hasCock()) {
			MainScreen.text("\n\nThe sealed, cock-plugging tube");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
			MainScreen.text(" in [eachCock] ");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("do not");
			else MainScreen.text("does not");
			MainScreen.text(" differ greatly from Valeria's other liquid attentions. ");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("They start");
			else MainScreen.text("It starts");
			MainScreen.text(" by thickening, stretching your cumvein");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
			MainScreen.text(" as wide as ");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("they");
			else MainScreen.text("it");
			MainScreen.text("'ll go without pain and then rolling thick pulses of gelatinous matter into your urethra");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
			MainScreen.text("s");
			MainScreen.text(". The sleeve");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
			MainScreen.text(" squeeze");
			if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("s");
			MainScreen.text(" down on your length");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
			MainScreen.text(" harder, starting to slide around in ways that would be impossible for a vagina, and you find yourself helplessly blowing your load straight into the dick-plug");
			if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
			MainScreen.text(", spurting bliss that can't even hope to escape from your loins. You feel ");
			if (player.lowerBody.balls == 0) MainScreen.text("something expanding as you cum, filling up with spunk or slime or some mixture of the two");
			else MainScreen.text("your [balls] expanding as you cum, filling up with spunk or slime or some mixture of the two, weighing down your sack with ever-increasing heaviness. Tender licks of tongue roll across the surface as you fill beyond completely");
			MainScreen.text(".");
		}
		//Butt fillinggasm
		MainScreen.text("\n\nWhimpering in ecstasy, you groan out with each ass-filling pump, letting your attention focus on the feeling of being filled. The imprisoning orb slowly loses cohesion, freeing you to instinctively rub your bloating belly as it expands");
		if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 5 && player.upperBody.chest.hasFuckableNipples()) MainScreen.text(", pausing to handle your hefty, swelling tits");
		MainScreen.text(", moaning and groaning as Valeria's shape gradually coalesces back around you. The goo-girl's core vanishes from view and reappears down south, pressing against your [asshole] as the \"pipe\" that filled you so full melts into slime. You scream in anal ecstasy as it slips past your ring, lodging firmly in your butt while the jellied mass inside convulses, rubbing against your walls in all the right ways, almost like it's experiencing an orgasm all its own.");
		MainScreen.text("\n\nYou shake and squirm on the ground, writhing in climax until your slime-filling settles enough to allow you to take stock of your situation. Valeria is back in place, forming her usual protective coating.");
		if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 5 && player.upperBody.chest.hasFuckableNipples()) {
			for (let x: number = 0; x < player.upperBody.chest.count(); x++) {
				player.upperBody.chest.get(x).breastRating += 3 + rand(3);
			}
			MainScreen.text(" Your tits have grown much larger, " + BreastDescriptor.breastCup(player.upperBody.chest.get(0)) + "-cups at least.");
		}
		if (player.lowerBody.cockSpot.hasCock() && player.lowerBody.balls > 0) {
			player.lowerBody.ballSize += 3 + rand(2);
			MainScreen.text(" Your balls look positively swollen with libidinous juices.");
		}
		MainScreen.text(" Your belly is stuffed into a parody of a pregnant woman's");
		if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(", so gravid from both holes that a real mother would be shamed by your obscene \"pregnancy.\"");
		else MainScreen.text(".");

		MainScreen.text("\n\nYou stagger up on your [legs] and wobble off back towards camp, wondering how long you're going to be travelling for two...");
		//Increase ball size if has balls and cock
		//Increase breast size by 3-6 steps.
		//Add some faux pregnancy descriptors to the appearance screen
		//Prevent pregnancy if has a vagina when it happens.
		//Be sure to track what holes get filled, as body parts may change before birth!
		Flags.list[FlagEnum.TIMES_VALERIA_GOO_THREESOMED]++;
		player.orgasm();
		//v1 = time till birth.
		//v2 = cock fill = 1, balls fill = 2
		//v3 = cunt fill?
		//v4 = tit fill?
		player.statusAffects.add(new StatusAffect("GooStuffed", 10 + rand(300))), 0, 0, 0);
		player.buttKnockUpForce(PregnancyType.GOO_STUFFED, 500); //Blocks other pregnancies - Way higher than GooStuffed status can last. Cleared when GooStuffed removed
		if (player.lowerBody.vaginaSpot.hasVagina()) {
			player.changeStatusValue(StatusAffects.GooStuffed, 3, 1);
			player.knockUpForce(PregnancyType.GOO_STUFFED, 500); //Blocks other pregnancies - Way higher than GooStuffed status can last. Cleared when GooStuffed removed
		}
		if (player.lowerBody.cockSpot.hasCock()) {
			if (player.lowerBody.balls > 0) player.changeStatusValue(StatusAffects.GooStuffed, 2, 2);
			else player.changeStatusValue(StatusAffects.GooStuffed, 2, 1);
		}
		if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 5 && player.upperBody.chest.hasFuckableNipples()) player.changeStatusValue(StatusAffects.GooStuffed, 4, 1);
		cleanupAfterCombat();
	}

	//Random Goo-girl Cum-Out:
	public birthOutDatGooSlut(): void {
		MainScreen.text("\n<b>Something odd happens...</b>\nA sudden, violent lurch in your gut nearly knocks you off your [feet]! You lower yourself to the ground before the quaking in your middle can upend you and cradle your slime-bloated belly, wondering if you're finally going to get relief from walking around with a gutful of goo.");
		if (player.statusAffects.get("GooStuffed").value4 > 0) MainScreen.text(" Your tits are even wobbling around wildly, shaking and jiggling obscenely inside your [armor] in a way that makes you your [nipples] more than a little leaky.");
		MainScreen.text("\n\nYou get your answer when your [asshole] opens up to expose the goo-girl's slick core, forcing you to shudder with ecstasy as it gradually slips through your stretching anus and unleashes a torrent of slime. You bend down onto your hands, letting it pass, cumming unexpectedly at the way it caresses you as it exits your body and moaning like a some ");
		if (player.skinType == SkinType.FUR) MainScreen.text("furry ");
		MainScreen.text("bitch in heat. Gods, there's so much!");
		if (player.statusAffects.get("GooStuffed").value4 > 0) {
			MainScreen.text("\n\n");
			if (!player.upperBody.chest.hasFuckableNipples()) MainScreen.text("Stiffening up");
			else MainScreen.text("Opening up");
			MainScreen.text(", your [nipples], suddenly disgorge rivers of gelatinous slime, adding to growing puddle below with, odd-colored obscene lactation. You grab one with one hand and squeeze, shooting out huge streamers of milky-goo until your tit is sore and aching. You repeat on the other side");
			if (player.upperBody.chest.count() > 1) MainScreen.text(" and the next row down");
			if (player.upperBody.chest.count() > 2) MainScreen.text(", and so on");
			MainScreen.text(", working out every drop of thick, body-filling slime while your ass is still busy draining. Even after they empty, they don't seem to lose a single bit of the size they've gained....");
		}
		if (player.lowerBody.cockSpot.hasCock() && player.statusAffects.get("GooStuffed").value2 > 0) {
			MainScreen.text("\n\n[EachCock] suddenly fills to twitching tumescence and explodes in a completely untelegraphed orgasm, throwing huge strands of odd-colored cum in ");
			if (player.lowerBody.balls > 0) MainScreen.text("ball-clenching");
			else MainScreen.text("body-clenching");
			MainScreen.text(" quivers of beatific enjoyment. It's so thick, and there's so much that your blissful explosions soon turn into a constantly flowing river of ejaculatory ecstasy. You grab hold with one hand and squeeze to milk out every last drop, throbbing long after you empty. A few trickles of white ooze out after, but that's all the proper spunk you see.");
			if (player.statusAffects.get("GooStuffed").value2 >= 2) MainScreen.text("  Your balls keep their enhanced sized. Odd.");
		}
		if (player.lowerBody.vaginaSpot.hasVagina() && player.statusAffects.get("$1").value3 > 0) {
			MainScreen.text("\n\nBirthing out a geyser of slime, your [vagina] practically glows with the pleasure of releasing its slimy package into the congealing puddle below. Your lips grow so puffy and sensitive from the experience that your pussy looks obscenely bloated, like it's been suckled for hours upon hours, but all it's doing is cumming nonstop while it releases its long-held burden.");
		}
		MainScreen.text("\n\nYou pant to try and catch your breath as the fluid gathers up beside you and grows a friendly, smiling face. It gives you a simple smile and a kiss on your brow before leaving you to recover, heading in the direction of the lake.\n");
		player.statusAffects.remove("GooStuffed");
		player.knockUpForce(); //Clear the false pregnancy
		player.buttKnockUpForce(); //Clear the false pregnancy
	}

	/*MISC. Valeria Interactions
	
	
	[If PC has Valeria unequipped and Isabella is in camp]
	(Play when PC returns to camp from anywhere/anything)
	
	As you make your way back home, you hear an annoyed \"<i>Mooooo!</i>\" from Isabella's section of the camp. Cocking an eyebrow, you wander over to the busy cow-girl. Isabella's arms are currently crossed over her prodigious chest, her shield planted in the ground in front of her. Standing a few feet in front of her is Valeria, snuggly fit into her steel plates, her greatsword held firmly in hand. 
	
	\"<i>I'm just saying, Izzy,</i>\" Valeria groans, nodding to her gooey sword. \"<i>You're fighting style is just... lacking, is all.</i>\"
	
	\"<i>Mein style of combat ist NICHT LACKING!</i>\" Isabella huffs, crossing her arms so tight that a little dollop of milk bubbles out through her corset. 
	
	\"<i>Yes it is! What's the fucking point of packing a big-ass tower shield and then PUNCHING people? Seriously, what's up with that; if you just can't afford a sword, or a hammer, or whatever, I could spot you some gems. I mean...</i>\"
	
	\"<i>SILENCE!</i>\" Isabella snaps, scowling. \"<i>It ist not a matter of gems! I prefer to use mein fists, und that ist that.</i>\"
	
	\"<i>Come oooonnnn, at least try using a sword. Please? You might like it...</i>\"
	
	\"<i>Nein, Isabella vill not degrade her hand vith your goo weapons.</i>\"
	
	Valeria's shoulders slump. \"<i>Fine, fine. Whatever. Get your arm torn off by a demon. See if I care. I'll just go... spar by myself, I guess.</i>\"
	
	\"<i>Vait, I,</i>\" Isabella starts, grabbing Valeria's shoulder as she turns away. \"<i>I suppose I could... try ein svord.</i>\"
	
	Valeria beams, and hands the cow-girl the gooey greatsword, urging her to give it a few swings to get accustomed to it.
	
	Experimentally, Isabella swings the greatsword in long, slow arcs. She seems to be getting the hang of it, swinging faster and harder, adding on simple spins and parries... Until she makes a wide, spinning arc with the sword, and lands it right on Valeria's neck.
	
	You watch in horror as the armor-goo's head tumbles to the ground, chopped right off by Isabella's powerful swing. \"<i>Mein Gott!</i>\" Isabella gasps, dropping the sword and clutching at her breast.
	
	\"<i>Ow.</i>\" Valeria answers, her head reappearing on her neck a moment later. The cow-girl leaps back in fright as the dismembered head decomposes and is absorbed back into Valeria's feet. The goo-girl rolls her lower jaw and makes an exaggerated show of cracking her neck. \"<i>Hey, nice swing, Izzy. Might wanna, uh, look where you're swinging, though.</i>\"
	
	\"<i>I, ah, ja. Ich vill?</i>\"
	
	Valeria chuckles as she re-absorbs her greatsword and, scratching her neck, wanders off into camp, leaving poor Isabella rather startled.*/
}
}
