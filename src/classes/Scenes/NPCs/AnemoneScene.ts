/**
 * Created by aimozg on 02.01.14.
 */
package classes.Scenes.NPCs
{
	import classes.*;
	import classes.GlobalFlags.FlagEnum;
	import classes.GlobalFlags.kGAMECLASS;
	import classes.Items.Armors.LustyMaidensArmor;
	import classes.Items.Weapon;

	public class AnemoneScene extends BaseContent implements TimeAwareInterface
	{

		//Encountered via Boat (unless a new Under-Lake area is
		//unlocked)

		//NPC details (proto-codex): Giant, colorful freshwater
		//anemones; mutated by factory runoff into hermaphroditic
		//humanoid creatures that feed off of sexual fluids instead
		//of fish. They have dark blue-black skin while idle but get
		//lighter as they become active. Anemones have a svelte,
		//feminine body shape with B-cup breasts and a smooth face
		//with opaque eyes of a lighter cast than their usual skin
		//tone. A pair of pale gills drape over their breasts.
		//Simple-minded, their most common expression is a facile,
		//open-mouthed grin which they assume when presented with
		//any creature capable of giving them the fluids they
		//cherish. They have a great mass of long tentacles atop
		//their head that stretches instinctively toward whatever
		//they're currently trying to capture, a cock-like branch on
		//their base near the 'groin' with a head flanged by
		//diminutive writhing tentacles, and a deep-blue vagina
		//underneath with small feelers ringing the entrance.

		//game content:
		//initial encounter:
		//anemone combat:
		//-fights through lust
		//-raises lust at initial encounter
		//-main attack is a sweep of tentacles that inflicts lust and temp loss of speed/str if it connects
		//-similar to tentacle monsters but more genteel; 100% chance of escaping from combat as long as PC is not distracted by lust > 60
		//-very high HP but very low speed means they do not dodge or hit often; however, see below
		//-direct attacks cause PC to touch tentacles with a high probability, getting a shock of venom that lowers speed/str and inflames lust
		//-drops [TF item] and maybe some other lake- or factory-related item

		//  TIMES_MET_ANEMONE: number = 453;
		//  ANEMONE_KID: number = 454;
		//  KID_ITEM_FIND_HOURS: number = 455;
		//  ANEMONE_WATCH: number = 456;
		//  ANEMONE_WEAPON: number = 457;
		//  KID_A_XP: number = 756;
		//  KID_SITTER: number = 757; //0 = no sitter, 1 = possible, 2 = doing dat shit
		//  HAD_KID_A_DREAM: number = 758;

		public AnemoneScene()
		{
			CoC.timeAwareClassAdd(this);
		}
		
		//Implementation of TimeAwareInterface
		public timeChange():boolean
		{
			let needNext:boolean = false;
			if (flags[FlagEnum.ANEMONE_KID] > 0) {
				if (flags[FlagEnum.KID_ITEM_FIND_HOURS] < 20) flags[FlagEnum.KID_ITEM_FIND_HOURS]++;
				if (flags[FlagEnum.KID_SITTER] == 0 && flags[FlagEnum.MARBLE_KIDS] >= 5 && model.time.hours > 10 && model.time.hours < 18 && rand(4) == 0) {
					kidABabysitsCows();
					needNext = true;
				}
				if (flags[FlagEnum.KID_SITTER] == 1 && model.time.hours > 10 && model.time.hours < 18 && rand(4) == 0) {
					flags[FlagEnum.KID_SITTER] = 2;
				}
				else if (flags[FlagEnum.KID_SITTER] == 2) flags[FlagEnum.KID_SITTER] = 1;
			}
			if (player.statusAffects.has("AnemoneArousal")) {
				if (player.pregnancyIncubation > 1) {
					player.statusAffects.remove("AnemoneArousal");
					MainScreen.text("\n<b>The nigh-constant arousal forced upon you by the anemone-like creature in your body finally fades.  You stick a finger inside yourself and marvel in wonder - it's gone!  You aren't sure if it slipped out or your body somehow consumed it, but it's nice to have a clearer head.</b>\n", false);
				}
				else if(!player.lowerBody.vaginaSpot.hasVagina()) {
					player.statusAffects.remove("AnemoneArousal");
					MainScreen.text("\n<b>The nigh-constant arousal forced upon you by the anemone-like creature in your body finally fades.  You aren't sure if it was somehow consumed by the removal of your vagina or if it escaped during the process, but it's nice to have a clear head for a change.</b>\n", false);
				}
				needNext = true;
			}
			return needNext;
		}
	
		public timeChangeLarge():boolean {
			return false;
		}
		//End of Interface Implementation

		private anemonePreg():void
		{
			player.knockUp(PregnancyType.ANEMONE, PregnancyType.INCUBATION_ANEMONE, 101);
		}

		public kidAXP(diff:number = 0):number
		{
			if (diff == 0) return flags[FlagEnum.KID_A_XP];
			flags[FlagEnum.KID_A_XP] += diff;
			if (flags[FlagEnum.KID_A_XP] < 0) flags[FlagEnum.KID_A_XP] = 0;
			if (flags[FlagEnum.KID_A_XP] > 100) flags[FlagEnum.KID_A_XP] = 100;
			return flags[FlagEnum.KID_A_XP];
		}


		public mortalAnemoneeeeee():void
		{
			spriteSelect(4);
			MainScreen.text("", true);
			if (flags[FlagEnum.TIMES_MET_ANEMONE] == 0 || player.hasItem(consumables.MINOCUM)) {
				flags[FlagEnum.TIMES_MET_ANEMONE]++;
				MainScreen.text("You step into the boat and begin to slip off the mooring rope when you are distracted by a swirl of bright colors under the surface of the lake.  As you peer over the side to get a better look at the oscillating mass of greens and purples, the swirl begins drawing closer to the boat as if reciprocating your interest; it grows larger and brighter as it closes the distance.  The cloud parts to reveal an attractive feminine face cast in a deep blue shade.  It lightens responsively as its gaze takes you in from the depths of two opaque eyes.  The confusing mass of colors resolves itself into tresses of two-inch-thick anemone tentacles sprouting from the head in place of hair!\n\n", false);

				MainScreen.text("The anemone girl smiles at you flirtatiously as she bobs up to the surface.  More out of politeness than anything you smile back, not sure of what to make of her and unused to such unaggressive approaches by the denizens of this place.  A bloom of vibrant color offset by the blue outline of her body causes you to lean farther out as your attention refocuses below her waist, where you perceive a smaller ring of tentacles waving at you from behind the head of a hardening penis!  Turned on by the attention, the anemone grabs onto the saxboard in an attempt to pull herself up to you, but her added weight on the side overbalances you and pitches you overboard into her waiting tentacles!\n\n", false);

				if (player.hasItem(consumables.MINOCUM)) {
					minoCumForAnemonieeeeez();
					return;
				}
				MainScreen.text("The initial surprise subsides to wooly-headedness and a feeling of mild arousal as the stingers in her tentacles find exposed flesh.  In panic of drowning you pull free of the ropy mass and backpaddle away from the girl until your " + player.feet() + " reassuringly touch the shallows of the lakebed once again and you're far enough above water to be able to fight.\n\n", false);
			} else {
				flags[FlagEnum.TIMES_MET_ANEMONE]++;
				//new anemone repeat combat encounter, once player has met one:
				MainScreen.text("As you unmoor the boat and cast off, you hear a soft bubbling sound coming from amidships.  You look around only to see several green tentacles slip over the saxboard and pull down suddenly, pitching the boat and sending you overside into the welcoming embrace of a grinning anemone!  She swims alongside and gives you several playful caresses as you struggle back toward shore, already woozy and aroused from the venomous contact.\n\n");
				//(typical lust gain and temporary stat damage, start combat)
			}
			MainScreen.text("You are fighting an anemone!", false);
			let anemone:Anemone = new Anemone();
			startCombat(anemone);
			//(gain lust, temp lose spd/str)
			dynStats("lus", 4);
			anemone.applyVenom(1);
		}



		//victory:
		public defeatAnemone():void
		{
			MainScreen.text("", true);
			//Win by HP:
			if (monster.HP < 1) MainScreen.text("The anemone's knees buckle and she collapses, planting her hands behind her with a splash.  You stand over her, victorious.\n\n", false);
			//win by lust:
			else MainScreen.text("The anemone slumps down and begins masturbating, stroking her cock furiously.  You think you can detect something like desperation in her opaque eyes.  It doesn't look like she'll trouble you anymore.\n\n", false);
			if (player.lust >= 33) {
				MainScreen.text("You could always have your way with her.  If you do, which parts do you use to do the deed?", false);
				//victory sex choice for males with cock fit 48 or females with clit >7": "her anus"
				//(change "If you do, which of your parts" to "If you do, which part" in pre-sex choice menu)
				let cockRape:Function =null;
				let vaginaRape:Function =null;
				let anal:Function =null;
				let eggs:Function =null;
				if (player.canOviposit()) eggs = anemoneGetsLayedByBeePositor;
				if (player.lowerBody.vaginaSpot.hasVagina() && player.lowerBody.vaginaSpot.list[0].clitLength >= 4) anal = anemoneButtPlugginz;
				else if (player.lowerBody.cockSpot.hasCock() && player.cockThatFits(48) >= 0) anal = anemoneButtPlugginz;
				//Normal male: -requires dick of area < 36
				if (player.lowerBody.cockSpot.count() > 0) cockRape = rapeAnemoneWithDick;
				if (player.lowerBody.vaginaSpot.hasVagina()) vaginaRape = rapeAnemoneWithPussy;
				let bikiniTits:Function =null;
				if (player.lowerBody.vaginaSpot.hasVagina() && player.upperBody.chest.BreastRatingLargest[0].breastRating >= 4 && player.armor is LustyMaidensArmor) bikiniTits = (player.armor as LustyMaidensArmor).lustyMaidenPaizuri;
				choices("Your Ass", victoryButtholeRape, "Your Cock", cockRape, "Your Vagina", vaginaRape, "Her Butt", anal, "Lay Egg", eggs,
					"", null, "", null, "", null, "B.Titfuck", bikiniTits, "Leave", cleanupAfterCombat);
			}
			else cleanupAfterCombat();
		}

//anal: -requires butthole
		private victoryButtholeRape():void
		{
			spriteSelect(4);
			MainScreen.text("", true);
			MainScreen.text(images.showImage("anemone-getanal"), false);
			MainScreen.text("You look over the anemone in front of you.  Your attention focuses on her blue shaft; those smaller tentacles should have plenty of pleasing venom in them as well.  Stripping off your " + player.armorName + ", you approach her and push her backwards.  Her gills slide off her breasts and float at her sides. revealing a pair of cute nipples.  You take the opportunity to stroke the shaft of her penis and rub her vagina a bit, soaking up some venom and making your hands tingle.\n\n", false);

			MainScreen.text("Quite soon you can hardly stand your own arousal and your lover's cock is nice and hard.  Straddling the anemone, you position your " + assholeDescript() + " over her colorful shaft and gradually lower yourself towards it.  The florid crown slips into your hole, delivering the expected shock, and a gasp from behind you is accompanied by the anemone's hands moving to your hips.", false);
			//[butt hymen removal]
			if (!player.buttChange(monster.cockArea(0), true)) MainScreen.text("  ", false);
			MainScreen.text("Despite your anticipatory stiffening you find yourself trembling and your muscles weakening, but by a superb effort you manage to concentrate and lower yourself gently, savoring the slow crawl of the warmth up your " + assholeDescript() + ".  You reach the base of the anemone's short shaft soon, and pause for a minute; looking over your shoulder at the anemone, you notice her biting her lower lip impatiently.  Making a mental note of her cute expression to fuel your imagination, you turn forward and, putting your hands down for support, you begin to rise and fall on her erect penis.\n\n", false);

			MainScreen.text("With your " + assholeDescript() + " heated up from the aphrodisiac already, the friction is enough to warm it to fever pitch.  Over and over you impale yourself on the girl's rod, dragging trails of venom and heat up and down your rectum.", false);
			if (player.lowerBody.cockSpot.count() > 0) {
				MainScreen.text("  One hand involuntarily moves to your " + cockDescript(0) + " and begins stroking, smearing the copious pre-cum forced out by the prostate stimulation over " + sMultiCockDesc() + ".", false);
			}
			//[(if vag and nococks)
			else if (player.lowerBody.vaginaSpot.hasVagina()) {
				MainScreen.text("  You lift one hand up to your " + vaginaDescript(0) + " and begin jilling yourself off.  This works to satisfy you for a while, but eventually you want more and grab a brace of tentacles floating in the water beside you, shoving them into your greedy pussy and smearing them around. This provokes a lusty moan from you and a giggle from your lover.", false);
			}
			MainScreen.text("  As you work your " + assholeDescript() + " on the tool, something happens to push your peak closer at a startling pace...\n\n", false);

			MainScreen.text("Your blue lover, restless now and uncontent to simply lie there anymore, begins to use her own hands and hips to pump in time with you, doubling the pace of the fuck.  The fervid intensity of her strokes doesn't leave any time for the venom to disperse before the next thrust arrives, making it feel as though your " + assholeDescript() + " is filled with one huge, hot cock that nevertheless slides in and out even as it remains motionless.  The sensation pushes you to orgasm quickly, your " + assholeDescript() + " clamping down on the anemone's penis", false);
			if (player.lowerBody.cockSpot.count() > 0) {
				MainScreen.text(" as " + sMultiCockDesc() + " twitches and ejaculates in a ", false);
				if (player.cumQ() < 50) MainScreen.text("squirt", false);
				else if (player.cumQ() < 250) MainScreen.text("spray", false);
				else MainScreen.text("torrent", false);
				MainScreen.text(" of semen", false);
				//[(if vag and cox)
				if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" and your pussy spasms", false);
			}
			else if (player.lowerBody.vaginaSpot.hasVagina()) {
				MainScreen.text(" and your " + vaginaDescript(0) + " spasms around the tentacles and your fingers", false);
			}
			MainScreen.text(".  The anemone must have been right on the edge with you, because after a few more thrusts in your hungry asshole she achieves her own climax and shoots several strings of cool, thick semen into you.  You collapse backward against your partner and she idly caresses your " + nippleDescript(0) + ".  After several minutes of relaxing in the warm water, you sit up and push yourself off of the anemone's limp penis, which drags a string of semen out of your " + assholeDescript() + " and prompts ", false);
			//[(dix)
			if (player.totalCocks() > 0 || player.gender == 0) MainScreen.text("a ", false);
			else if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("another ", false);
			MainScreen.text(" giggle from the blue girl.  Standing up, you gather your gear and blow her a kiss before you leave.  She darkens in color, her camouflage reflex causing her to 'blush' in discomfort at this display of affection.", false);
			//(pass 1 hour, reduce lust to min)
			player.orgasm();
			cleanupAfterCombat();
		}


		private rapeAnemoneWithDick():void
		{
			spriteSelect(4);
			MainScreen.text("", true);
			MainScreen.text(images.showImage("anemone-male-fuck"), false);
			if (player.cockThatFits(36) >= 0) {
				let x:number = player.cockThatFits(36);
				MainScreen.text("Rubbing yourself through your " + player.armorName + ", you look over the anemone; your attention wanders down her torso to the blue slit between her legs", false);
				//[(lust victory)
				if (monster.lust > 99) MainScreen.text(", which she's currently diddling with the hand she's not using to stroke her cock", false);
				MainScreen.text(".  Unfastening your garments, you stroke " + sMultiCockDesc() + " to full hardness and approach her.  The anemone looks up at you, still somewhat befogged; then, as you stand over her, she leans forward and opens her mouth invitingly.\n\n", false);

				MainScreen.text("You smile at how eager she is for you, but shake your head.  The anemone closes her mouth and looks at you quizzically.  <i>\"No?\"</i> she asks.  Only then does she follow your gaze down to her pussy.  The skin on her face darkens a bit as she realizes your intention... which turns out to be a blush, by the looks of the shy glance she gives you next!  <i>\"Umm.\"</i>  The anemone's fingers", false);
				//[(HP defeat)
				if (monster.HP < 1) MainScreen.text(" move to the lips of her vagina and", false);
				MainScreen.text(" pull apart her feathery labia, showing a velvety interior.  <i>\"Ok...\"</i> she says haltingly.  You accept the invitation in a hurry, kneeling down and holding onto her hips, then guiding your " + cockDescript(x) + " into her.\n\n", false);

				MainScreen.text("After a moment of savoring the sensation, you push all of the way in, provoking a moan and a widening of the eyes from your partner.  ", false);
				//[(multicox)
				if (player.lowerBody.cockSpot.count() > 1) {
					MainScreen.text("As you push all the way into her, your other dick", false);
					if (player.lowerBody.cockSpot.count() > 2) MainScreen.text("s", false);
					MainScreen.text(" rub", false);
					if (player.lowerBody.cockSpot.count() == 2) MainScreen.text("s", false);
					MainScreen.text(" up against the feelers lining her pussy.  Unexpectedly, they also contain the venomous nematocysts of her tentacles and in that single stroke " + sMultiCockDesc() + " is throbbing hard and squeezing pre-cum all over her groin.  She reaches down and plays with it", false);
					if (player.lowerBody.cockSpot.count() > 2) MainScreen.text(", and them,", false);
					MainScreen.text(" as you start pumping.  ", false);
				}
				MainScreen.text("The fuck begins in earnest as you demonstrate all the techniques you know or can imagine; the anemone seems to be more impressed as you go on, cooing and moaning to goad you further while wrapping her hands and hair around your hips for chemical encouragement.  Her small tits bounce a little", false);
				//[(if PC boobs > A)
				if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 1) MainScreen.text(" in time with your own", false);
				MainScreen.text("; here and there one of the bounces brush her gills away, giving you a tantalizing view of nipple.", false);
				//[(if balls)
				if (player.lowerBody.balls > 0) MainScreen.text("  As your thrusts get faster your " + sackDescript() + " starts to slap into the tickly and quite-venomous feelers fringing her pussy, getting hotter and hotter as the aphrodisiac builds in your " + ballsDescriptLight() + ".  Your body answers with swelling, causing your sack to feel bigger and tighter with every slap.", false);
				//[(if noballs and clit > 6")
				else if (player.lowerBody.vaginaSpot.list[0].clitLength >= 6) MainScreen.text("  As your thrusts into the blue girl arouse you, your " + clitDescript() + " begins to swell with blood.  Pretty soon it's so erect that a particularly violent thrust mashes it into the feelers at the base of her labia, delivering a shock that almost makes you collapse.  The anemone, her reverie interrupted as you temporarily stop pumping, looks down.  Noticing the massive girl-cock sticking out of your " + vaginaDescript(0) + ", she reaches between her legs and gives the tip a flick, grinning with sadistic playfulness.  Your eyes cross at that, sending her into a spasm of giggling.  Irritated but aroused by the abuse of your " + clitDescript() + ", you move your thumb over her own tiny blue button and begin flicking it in revenge as you renew your pumping.", false);
				MainScreen.text("\n\n", false);

				MainScreen.text("The anemone's eyes roll back in her head as she reaches her climax first, hips shaking and penis squirting a glob of semen that drools down the side.  ", false);
				//[(Flexibility cat perk)
				if (player.perks.has("Flexibility")) MainScreen.text("You lean down and take the anemone's cock in your own mouth as she continues orgasming, swallowing the cool, slippery jism -- it tastes not salty and fishy as you'd hoped but somewhat faintly like algae.  The anemone, recovering her wits a bit, looks at you blankly, as though she can't fathom why anyone would want to drink <i>her</i> ejaculate instead of the other way around.  Your eyes twinkle mirthfully in response as you suck and swallow the last of her jizz.  ", false);
				MainScreen.text("Your own orgasm takes a bit longer, but the convulsing walls of her pussy do their best to help you arrive and the feelers along her labia writhe against your " + multiCockDescriptLight() + " in the same tempo, injecting the last of their venom.  With a deep, final thrust, " + sMultiCockDesc() + " erupts in her pussy.  ", false);
				//[(big skeet)
				if (player.cumQ() > 500) {
					MainScreen.text("You continue to pour into her even after her convulsions stop, stretching her belly", false);
					//[(super skeet)
					if (player.cumQ() > 2000) MainScreen.text(" to enormous dimensions.  <i>\"Ohh...\"</i> she moans, as her waist distends to over four times its former slender diameter", false);
					MainScreen.text(".  She looks ", false);
					if (player.cumQ() < 2000) MainScreen.text("thoroughly", false);
					else MainScreen.text("monstrously", false);
					MainScreen.text(" pregnant when you've finished, her little blue dick poking out below a swollen stomach... not a bad look, actually.  You get a little turned on at the idea.  ", false);
				}
				MainScreen.text("After the last of your cum has been squeezed out, you pull your " + cockDescript(0) + " out and rinse it off in the lakewater.  You gather your gear while the anemone holds her belly and smiles placidly, staring into the sky.", false);
				//(pass 1 hour, reset lust to min or min+10 if big or greater skeet)
				player.orgasm();
				cleanupAfterCombat();
			}
			//Too-big male: -requires cockarea > 36
			else {
				MainScreen.text("Rubbing yourself through your " + player.armorName + ", you look over the anemone; your attention wanders down her torso to the blue slit between her legs", false);
				//[(lust victory)
				if (player.lust > 99) MainScreen.text(", which she's currently diddling with the hand she's not using to stroke her cock", false);
				MainScreen.text(".  Unfastening your garments, you stroke " + sMultiCockDesc() + " to full hardness and approach her.  The anemone looks up at you, still somewhat befogged; then, as you stand ", false);
				if (player.tallness > 48) MainScreen.text("over", false);
				else MainScreen.text("before", false);
				MainScreen.text(" her, her eyes widen as she beholds the sheer amount of cock you have.\n\n", false);

				MainScreen.text("You smile at how stunned she is by you, and waggle your erect " + multiCockDescriptLight() + " from side-to-side.  The anemone obediently watches it swing, like a hypnotist's pendulum; her mouth reflexively opens as all her conscious thought is temporarily sidetracked.  You push on the shaft with one hand and move the tip down relative to her body, watching bemused as the girl tries to keep her mouth in line with it until it goes too low for her neck and snaps her out of her daze.  She closes her mouth and looks at you quizzically.  <i>\"No?\"</i> she asks.  You answer by pushing forward slightly, bumping the head of your " + cockDescript(0) + " against her <i>mons pubis</i>.  The skin on her face darkens a bit as she realizes your intention... which turns out to be a blush, by the looks of the shy glance she gives you next!  <i>\"Umm.\"</i>  She gives it a moment of concerned study before her natural instincts take over and the anemone's fingers", false);
				//[(HP defeat)
				if (monster.HP < 1) MainScreen.text(" move to the lips of her vagina and", false);
				MainScreen.text(" pull apart her feathery labia, showing a velvety interior.  <i>\"Ok...\"</i> she says, clearly unsure of the wisdom of this.  You motion for her to lay back and lift her pussy as high as possible to reduce the angle, then attempt to guide your " + cockDescript(0) + " into her.", false);
				//[(PC height > 7' and non-centaur)
				if (player.tallness > 84) MainScreen.text("  Finally, after having gone so far as to kneel down to bring yourself in line, you begin pushing your way in.", false);
				MainScreen.text("\n\n", false);

				MainScreen.text("The first few inches are slow going, as you try to stretch the blue girl's roughly human-sized pussy around your superhuman girth.  She sports a worried expression as you struggle to push the crown of your " + Appearance.cockNoun(CockType.HUMAN) + " in without bending your shaft.  The girl's body proves more elastic than you'd expected, though; with each shove her cunt takes more width without suffering any obvious ill effect.  Eventually you get the head of your " + cockDescript(0) + " into her, and you give an experimental thrust to test her depths. You slide surprisingly far into her, your huge " + Appearance.cockNoun(CockType.HUMAN) + " making a bump in her pelvis; the anemone has abandoned her worry and is blissfully tweaking her nipples.  Taking the anemone's legs under your arms, you begin pumping at her, savoring the sensation of having at least part of your unwieldy tool inside someone.  Your blue partner gives out cute moans as you fuck her, prompting a grin from you, but most of your attention is focused on maintaining the angle of your " + cockDescript(0) + ".  As you focus on the thrusts, you gradually notice the bump sliding further up her pelvis on each push... it's nearly up to her stomach now!  You quickly make up your mind to test her unusual biology, choking up on your grip of her legs and pushing hard with each thrust in.  The anemone is now tracking the progress of the bump representing your " + Appearance.cockNoun(CockType.HUMAN) + " as intently as you are; as your head pushes up her chest between her breasts she presses them together against the ridge, massaging them against the shaft through her skin.", false);
				//[(cocklength > 60")
				if (player.lowerBody.cockSpot.list[0].cockLength > 60) MainScreen.text("  The imagery and the stimulation inspire you to increase your efforts, and you push even harder into her until your " + cockDescript(0) + " slides its way into her throat, expanding her slender neck to twice the normal width.  The anemone's mouth gapes open reflexively as if to gag as the pressure forces her head back, but she doesn't stop moaning or rubbing herself against you.  This seems to be as deep as you can get; the tip of your cock is now right up against the base of her chin.", false);
				MainScreen.text("\n\n", false);

				MainScreen.text("Inordinately pleased at having gotten your " + cockDescript(0) + " so far in, you begin thrusting grandly, alternating huge back-and-forth pumps with hip gyrations that press you against the sides of your partner.  The anemone", false);
				//[(dick > 60")
				if (player.lowerBody.cockSpot.list[0].cockLength > 60) MainScreen.text(", despite being unable to look anywhere except over her head thanks to the giant ridge running up the front of her body,", false);
				MainScreen.text(" has clearly been enjoying the treatment; soon she begins twitching in orgasm and her pussy spasms against the base of your " + Appearance.cockNoun(CockType.HUMAN) + ", flicking its venomous feelers into it, as she kneads her breasts in her hands.  Her body attempts to convulse, bending your " + cockDescript(0) + " slightly, while her neglected dick gives a little squirt of pearly semen which lands on the raised line in the center of her body and makes a little trail as it rolls down.  The pressure of her twisting and the sensation of her pussy lapping at your shaft with aphrodisiac is enough to send you over the edge as well.  Your " + cockDescript(0) + " twitches as you unload into your blue partner", false);
				//[(big skeet)
				if (player.cumQ() > 500) MainScreen.text(" until it puffs out her cheeks", false);
				MainScreen.text(".", false);
				//[(mega skeet)
				if (player.cumQ() > 1500) MainScreen.text("  Eventually she can't hold in the sheer volume of your ejaculate, and it erupts from her mouth in a white spray.  Spurt after spurt goes into and then out of her, dribbling out of her slack mouth and down her face until her hair is covered with seed.", false);
				MainScreen.text("  She takes the opportunity to squeeze along the length of your cock, pushing out as much semen as you have to offer as she moans in orgiastic delight at the fluid injection.", false);
				MainScreen.text("\n\n", false);

				MainScreen.text("Eventually both you and she are spent and limp, and you draw your " + cockDescript(0) + " out of her, making an extended, wet sucking noise.  As you pull up your gear and make your way up the beach, ", false);
				//[(normal/big skeet)
				if (player.cumQ() < 500) MainScreen.text("her hands are still dazedly playing with the space between her breasts where your cock used to rest.", false);
				//[(mega skeet)
				else MainScreen.text("she continues to sputter and cough up bubbles of your spunk.", false);
				//(pass 1 hour, reset lust to min or min+10 if big or greater skeet)
				player.orgasm();
				cleanupAfterCombat();
			}
		}


//using pussy:
		private rapeAnemoneWithPussy():void
		{
			spriteSelect(4);
			MainScreen.text("", true);
			MainScreen.text(images.showImage("anemone-female-fuck"), false);
			MainScreen.text("As you review your handiwork, the stirrings in your feminine side focus your attention on the anemone's penis.  Those smaller tentacles on it should have plenty of pleasing venom in them as well.  You make up your mind to put them to use for you.\n\n", false);

			MainScreen.text("The anemone looks vacantly up at you as you approach.  Reaching forward, you take her cock in your hand", false);
			//[(lust victory)
			if (monster.lust > 99) MainScreen.text(" after brushing hers aside", false);
			MainScreen.text(" and begin to fondle the crown, with its slippery tentacles.  As expected, her venom flows into your hand, imparting a sensation of heat that slides up your arm and diffuses into a gentle warmth.  After a few rubs, you lean down and carefully take her penis into your mouth.  It tastes of the lakewater and heats your mouth as it did your hand; ", false);
			//[(HP victory)
			if (monster.HP < 1) MainScreen.text("you can feel it harden as ", false);
			MainScreen.text("you caress it with your tongue before pulling it out and giving it a squeeze.  The blue girl shivers as a drop of pre-cum is forced out.\n\n", false);

			MainScreen.text("Next, you take the time to strip off your " + player.armorName + ", making sure to give a good show; the anemone entertains herself by stroking her erect prick and smearing around the pre-cum, grinning as she watches you.", false);
			//[(breastrow0>C-cup)
			if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 2) MainScreen.text("  You give special attention to the presentation of your " + breastDescript(0) + ", removing your top with tantalizing slowness, letting each breast slip out and hang between you like fruit ripe to be taken, then making sure to rub them seductively to arouse the both of you further.", false);
			//(hipsize=girly or better)
			if (player.lowerBody.hipRating > 6) MainScreen.text("  You make good use of your " + hipDescript() + ", too, giving a little shimmy to show off your pronounced curves.", false);
			MainScreen.text("  By the time you're finished, the anemone's crotch glistens with fluid from both her sexes; it's probably as wet as it was when she was underwater.  You lean into the anemone and give her a deep kiss, ", false);
			//[(breast0>C)
			if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 2) MainScreen.text("making sure to let your " + player.allBreastsDescript() + " rub up against hers, ", false);
			MainScreen.text("then pull apart from her and ", false);
			//[(goddamn centaur)
			if (player.lowerBody == LOWER_BODY.CENTAUR) MainScreen.text("turn away, kneeling down to display your animalistic, musky pussy readily.", false);
			else MainScreen.text("recline back on your " + player.legs() + ". Spreading your thighs, you reach down with two fingers and pull apart your " + vaginaDescript(0) + " welcomingly; it's the last act in your sexual performance.", false);
			MainScreen.text("\n\n", false);

			MainScreen.text("The anemone wastes no time in assessing your intention and crawls forward onto you, returning your kiss with equal passion.  ", false);
			//[(no centaur)
			if (player.lowerBody != LOWER_BODY.CENTAUR) MainScreen.text("You take her by the upper arms and pull her on top of you as you lie back in the sun-warmed shallows.  ", false);
			MainScreen.text("Her hair drapes over you as she lines her penis up with your " + vaginaDescript(0) + ", delivering heat to your body, but this is dwarfed by the sensation of her entry as she pushes her cock in for the first time.  ", false);
			player.cuntChange(monster.cockArea(0), true);
			MainScreen.text("The penetration combines with the aphrodisiac being injected straight into your hungry pussy to produce a feeling like euphoria.  Unable to focus your thoughts any longer, you allow the anemone to take the lead as she begins pumping into you, coating your labia with a mixture of her pre-cum and your own secretion.  Soon you're moaning lustily with complete disregard for anything except the pleasure between you as your lover ups the pace; ", false);
			//[(biped)
			if (player.lowerBody != LOWER_BODY.CENTAUR) {
				MainScreen.text("as she thrusts hard and fast, her hair whips back and forth over your ", false);
				//[(breasts>manly)
				if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 1) MainScreen.text(breastDescript(0) + " and ", false);
				MainScreen.text(nippleDescript(0) + "s,", false);
			}
			//(centaur)
			else {
				MainScreen.text("as she pushes deeply into your cunt, her hair flies forward past your upper body, brushing along your skin.  On one pass you grab some and use it as a pleasure tool, rubbing it vigorously on your ", false);
				//[(breasts>manly)
				if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 1) MainScreen.text(breastDescript(0) + " and ", false);
				MainScreen.text(nippleDescript(0) + "s,", false);
			}
			MainScreen.text(" spreading heat along your chest to nearly match your vagina's.\n\n", false);

			MainScreen.text("The overwhelming sensations drive you over the edge and your " + vaginaDescript(0) + " contracts hungrily around the heat radiating from the anemone's cock.  As your orgasming pussy ", false);
			//(squirter)
			if (player.vaginas[0].vaginalWetness >= VAGINA_WETNESS.DROOLING) MainScreen.text("soaks her crotch with juice and ", false);
			MainScreen.text("wrings her penis, the blue shaft responds enthusiastically; she pushes deeply into you as it begins spasming and squirting its load.  Your partner's mouth hangs open as you squeeze the cum out of her; with all her muscle control taken away, her head hangs limply", false);
			if (player.lowerBody == LOWER_BODY.CENTAUR) MainScreen.text(" on your back", false);
			//[(notits)
			else if (player.upperBody.chest.BreastRatingLargest[0].breastRating < 1) MainScreen.text(" on your chest", false);
			else MainScreen.text(" between your breasts", false);
			MainScreen.text(" as she gives up several streams of semen into your womb.  Finally, her cock empties out with a few last spurts; she came quite a lot and your womanhood feels pleasantly filled.  The two of you lie there for some time before she can recover enough to slip out of you.  When she does, a string of semen drips out of your abused pussy and mixes with the water below.\n\n", false);

			MainScreen.text("Having scratched your itch, you give her another kiss, catching her by surprise.  She smiles shyly at you as you gather up your clothes, then slips into the water as you start to dress again.", false);
			anemonePreg();
			//(reduce lust to min, pregnancy check)
			//(pass 1 hour, reset lust to min or min+10 if big or greater skeet)
			player.orgasm();
			cleanupAfterCombat();
		}

//loss rapes:
		public loseToAnemone():void
		{
			spriteSelect(4);
			let x:number = player.cockThatFits(36);
			MainScreen.text("", true);
			//loss via hp (only possible if PC engages her while already being at zero or kills himself with Akbal powers):
			if (player.HP < 1) {
				MainScreen.text("You collapse face-first into the lake, weakened by your damage.  The last thing you hear before passing out is a faint <i>\"What?\"</i>\n\n", false);

				MainScreen.text("Several minutes later you awake to feel yourself washed onto the sand and hurting all over.  <i>\"You... dead?\"</i> The anemone is still with you; she must have found a stick from somewhere and is sitting next to you, judiciously poking you with it.  As you force your eyes open in answer she drops the stick with a startled yelp and hugs her knees to her chest.  Too beat-up to say anything, you can only stare at her, which unnerves her further. <i>\"Umm... bye,\"</i> she says, getting to her feet.  She heads for the water again, leaving you alone to recover.", false);
				cleanupAfterCombat();
				return;
			}
			//loss, pre-sex worm shot reaction:
			//(wormshot blurb)
			//The anemone, having reached out to try and catch some of the load but missing the grab, sets her face in an irate scowl and approaches you.
			//loss, neuter:
			if (player.gender == 0) {
				MainScreen.text("Shivering, you slump before the anemone and begin trying to remove your " + player.armorName + ".  She claps and peals happily, splashing over to you.  Pushing your trembling hands out of the way, she unfastens your garments and pulls them free of you... and then stops.  You look the girl in the face uncomprehendingly and she answers your gaze with a look of equal confusion.  Your head turns to follow her as she looks you up and down and even makes a circle around you, inspecting every inch and chewing her lip anxiously.", false);
				//[(lactating)
				if (player.biggestLactation() > 1) MainScreen.text("  For a moment the examination stops at the dribble of milk leaking from your " + nippleDescript(0) + "s.  With one finger she collects a bit and tastes it, only to grimace and stick her tongue out.", false);
				MainScreen.text("  Back at the front, the anemone motions questioningly toward your ornament-free groin with open palms.  You follow her gesture down to your spartan nethers, then look back up.  Her bottom lip is quivering and -- yes, it looks like water is beginning to well up in her eyes.\n\n", false);

				MainScreen.text("Hurriedly you begin to compose an explanation for your anatomy, and you get as far as telling her that you have no genitalia thanks to events since your arrival before she bursts into tears.  ", false);
				//[(low cor)
				if (player.stats.cor < 33) MainScreen.text("You reach out instinctively to comfort her, but ", false);
				//(high cor)
				else MainScreen.text("You smirk, amused by the turnabout, until ", false);
				MainScreen.text("the anemone lashes out with a slap that knocks the expression off your face and makes your eardrums sing.  <i>\"Dumb!\"</i> she shouts, turning sharply; her tentacles lash past you as she about-faces.  She dives down below the surface and kicks water into your face spitefully as she swims away.  You sputter and rub your jaw a bit, then stand up and walk dizzily back to camp.", false);
				//(1 hour pass, lose 1/10th of max hp from current hp, lose 20 lust)
				player.takeDamage(10);
				dynStats("lus", -20);
				cleanupAfterCombat();
				return;
			}
			//loss, male:
			if (player.lowerBody.cockSpot.count() > 0) {
				MainScreen.text(images.showImage("anemone-male-fuck"), false);
				if (player.cockThatFits(36) >= 0) {
					MainScreen.text("Shivering, you slump before the anemone and begin trying to remove your " + player.armorName + ".  She claps and peals happily, splashing over to you.  Pushing your trembling hands out of the way, she unfastens your garments and pulls them free of you, taking the opportunity to run a hand up your " + cockDescript(x) + ".  ", false);
					if (player.cumQ() < 50) MainScreen.text("A droplet", false);
					else if (player.cumQ() < 250) MainScreen.text("A squirt", false);
					else MainScreen.text("A steady flow", false);
					MainScreen.text(" of pre-cum follows up the inside in the wake of her stroke.  She touches her finger to the tip of your sensitive urethra and draws it away, stretching a string of your fluid through the air.  Putting the finger in her mouth, she savors the taste of you; the string manages to transfer to her bottom lip before she breaks it with a flick of her tongue.\n\n", false);

					MainScreen.text("She pushes you back on your haunches and leans over your groin.  Her hair-tentacles slither forward over her shoulders and drop", false);
					//[(normal)
					if (player.lowerBody != LOWER_BODY.CENTAUR) MainScreen.text(" into your lap,", false);
					//(shitty taur)
					else MainScreen.text(" downwards, onto your hams,", false);
					MainScreen.text(" delivering lances of venom into your lower body.  The tingle warms your groin and more pre-cum leaks out of " + sMultiCockDesc() + ".  Her eyes lock onto a glistening dollop and she drops down quickly, enfolding the head of your " + cockDescript(x) + " in her cool mouth.  Her tongue dances around the crown of your " + Appearance.cockNoun(CockType.HUMAN) + ", relieving it of the sticky pre.  Looking ", false);
					if (player.tallness > 48) MainScreen.text("up", false);
					else MainScreen.text("down", false);
					MainScreen.text(" at you, you can see a smile in the lines around her eyes even though her mouth is locked around your " + Appearance.cockNoun(CockType.HUMAN) + ".  ", false);
					//[(if dual/multi-cox)
					if (player.lowerBody.cockSpot.count() > 1) {
						//[(cock2 doesn't exist)
						if (player.lowerBody.cockSpot.count() == 2) MainScreen.text("Your other dick rubs", false);
						//(cock2 exists)
						else MainScreen.text("The rest of your " + multiCockDescriptLight() + " rub", false);
						MainScreen.text(" against her cheek, smearing slick wetness on her blue face.", false);
					}
					MainScreen.text("\n\n", false);

					MainScreen.text("Her hands come up from the water and push two sheaves of her long, dangling hair into your " + multiCockDescriptLight() + ".  Wrapping these bundles of tentacles around your " + cockDescript(x) + ", she clasps them in place with one hand and begins sliding them up and down your length.  Your " + Appearance.cockNoun(CockType.HUMAN) + " begins feeling hotter and hotter from the injections and the friction of her hair, secreting more pre-cum into her obliging mouth.", false);
					//[(if vag)
					if (player.lowerBody.vaginaSpot.hasVagina()) {
						MainScreen.text("  Her other hand slips", false);
						if (player.vaginalCapacity() < 15) MainScreen.text(" a few fingers", false);
						else if (player.vaginalCapacity() < 30) MainScreen.text(" partway", false);
						else MainScreen.text(" all the way", false);
						MainScreen.text(" into your " + vaginaDescript(0) + ", sending a tingle through your lower lips and exposing your clitoris.", false);
						//[(if clit > 5")
						if (player.lowerBody.vaginaSpot.list[0].clitLength > 5) MainScreen.text("  Having achieved this, she pulls her hand out and wraps another bundle of tentacles around your " + clitDescript() + ", then begins jerking it off in time to her efforts on your " + Appearance.cockNoun(CockType.HUMAN) + ".  Your eyes roll back in your head and your mouth gapes involuntarily at the rough stimulation of your swollen chick-stick.", false);
					}
					MainScreen.text("\n\n", false);

					MainScreen.text("The heat rubbing on your cock", false);
					if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(" and clit", false);
					MainScreen.text(" quickly gets to you, and the first orgasm begins to work its way up your " + multiCockDescriptLight() + ".  Your " + cockDescript(x) + " lets fly into the anemone girl's mouth", false);
					//[(big skeet)
					if (player.cumQ() > 500) MainScreen.text(", bowing out her cheeks", false);
					//[(cray-cray skeet)
					if (player.cumQ() > 2000) MainScreen.text(" and squirting out her nose in thick ribbons", false);
					//[(multi-dix)
					if (player.totalCocks() > 1) {
						MainScreen.text(" as ", false);
						//[(dick2 = no)
						if (player.totalCocks() == 2) MainScreen.text("your cocks shoot", false);
						else MainScreen.text("the rest of your " + multiCockDescriptLight() + " shoot", false);
						MainScreen.text(" all over her face and hair, ", false);
						//[(small skeet)
						if (player.cumQ() < 500) MainScreen.text("drawing a pattern like a musical score on her blue skin", false);
						//(big skeet)
						else if (player.cumQ() < 2000) MainScreen.text("painting her skin white as she flinches and shuts her eyes tightly", false);
						//(cray-cray skeet)
						else MainScreen.text("whitewashing her entire upper body and running off until a fan of milky color spreads through the water around you", false);
					}
					MainScreen.text(".  The anemone swallows greedily as she pumps each stroke into her mouth", false);
					//[(big or > skeet)
					if (player.cumQ() >= 500) MainScreen.text(", her taut blue belly distending as it fills", false);
					MainScreen.text(".\n\n", false);

					MainScreen.text("After a grateful moment of rest as the anemone swallows your issue, her hands begin pumping once again.  Oh god!  Your " + Appearance.cockNoun(CockType.HUMAN) + " quickly returns to erectness under the renewed siege of aphrodisiac", false);
					//[(multi)
					if (player.lowerBody.cockSpot.count() > 1) {
						if (player.lowerBody.cockSpot.count() == 2) MainScreen.text(" and your other " + cockDescript(1) + " follows suit", false);
						else MainScreen.text(" and your other pricks follow suit", false);
					}
					MainScreen.text(".  The blue girl continues to stroke your privates with her tentacle hair, flicking your urethra with her tongue, until you've come twice more.  Nor does she display any intention of stopping there, but mercifully you black out and collapse into the water.  Half-frowning, the anemone shrugs and pushes your insensible form up onto the sandy shore.", false);
					//(pass 8 hours, reset lust to min)
					player.orgasm();
					cleanupAfterCombat();
				}
				//loss, too-big male (cock > 5" width or > 48" length):
				else {
					MainScreen.text("Shivering, you slump before the anemone and begin trying to remove your " + player.armorName + ".  She claps and peals happily, splashing over to you.  Pushing your trembling hands out of the way, she unfastens your garments and begins to pull them free of you, but your " + multiCockDescriptLight() + " flops out and bops her in the nose!  As you fumble the rest of the fastenings and finish removing your gear, the blue girl watches mesmerized at the bobbing flesh in front of her, slick pre-cum leaking from the tip", false);
					//[(big skeet)
					if (player.cumQ() > 500) MainScreen.text(" in a steady stream", false);
					MainScreen.text(".\n\n", false);

					MainScreen.text("Almost reverently, she caresses the shaft of your " + cockDescript(0) + ", stroking lightly up its enormous length.  She pulls it down to her eye level, inspecting the head from several angles.  Tentatively, she opens her mouth and pulls your " + Appearance.cockNoun(CockType.HUMAN) + " into it, trying to fit your expansive dickflesh into a hole that even to your lust-crazed mind looks much too small.  Despite her best efforts, she can't get more than the crown past her lips, though the reflexive motions of her tongue poking around and inside the opening make you shiver and push out more pre-cum.  The anemone eventually pops your " + cockDescript(0) + " out of her mouth and frowns in frustration.  After a few seconds, she seems to reach a decision.  Moving your shaft out of the way, she walks around behind you.  She places one hand on your ", false);
					if (player.lowerBody != LOWER_BODY.CENTAUR) MainScreen.text("waist", false);
					else MainScreen.text("flank", false);
					//[(not centaur)
					if (player.lowerBody != LOWER_BODY.CENTAUR) MainScreen.text(" and pushes your shoulders down with the other", false);
					MainScreen.text(".  As she draws you backwards, you're forced to put your own ", false);
					if (player.lowerBody != LOWER_BODY.CENTAUR) MainScreen.text("hands ", false);
					else MainScreen.text("forelegs knee-", false);
					MainScreen.text("down in front of you to keep from falling face-first.  ", false);
					//[(if non-centaur)
					if (player.lowerBody != LOWER_BODY.CENTAUR) MainScreen.text("The head of your " + cockDescript(0) + " dips into the lukewarm lakewater, sending a tingle down the shaft.  ", false);
					MainScreen.text("Behind you, the anemone has taken her blue, tentacled penis into her hand and is stroking it and fondling the tip, forcing her own pre-cum out and smearing it along her length.  Satisfied with its slipperiness, she edges forward until her cock is resting on your " + buttDescript() + ".  Drawing her hips back, she lines it up with your " + assholeDescript() + ", then thrusts forward while pulling back on your waist.  The wriggly feelers slip past your butthole and light up your insides with her potent venom.", false);
					player.buttChange(monster.cockArea(0), true);
					MainScreen.text("\n\n", false);

					MainScreen.text("Taking a moment to transfer her now-free hand to your other hip, the anemone girl then begins to pump her stiff pecker into your " + assholeDescript() + ", pausing after every few strokes to gyrate her hips a bit, massaging your prostate with her feelers and smearing venom into it.  The stimulation brings you to your limit in minutes; your dick twitches spastically", false);
					//[(if balls)
					if (player.lowerBody.balls > 0) MainScreen.text(" and your " + sackDescript() + " tightens up", false);
					MainScreen.text(".  This doesn't escape your blue lover's notice, and she quickly stops pumping.  Left at the edge of orgasm, you panic and look over your shoulder at her.  Judging by her grinning demeanour, she seems to be up to something diabolical.  You stare at her confusedly until you feel a new heat at the base of your " + multiCockDescriptLight() + ". Glancing down, you see that her tentacle-hair has wrapped around " + sMultiCockDesc() + " and is squeezing tightly!  Pleased with the arrangement, the anemone begins pumping and rubbing your prostate again, spreading new warmth through your " + assholeDescript() + ".  Your delayed climax finally arrives, but the <i>de facto</i> cockring", false);
					if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s", false);
					MainScreen.text(" prevent");
					if (player.lowerBody.cockSpot.count() == 1) MainScreen.text("s");
					MainScreen.text(" any semen from escaping!  The sensations swell and fade as your orgasm passes fruitlessly, your blue partner fucking away as merrily as ever.\n\n", false);

					MainScreen.text("For nearly an hour the anemone continues her performance, even going so far as to caress your swollen " + multiCockDescriptLight() + " with her unoccupied tentacles.  Several more orgasms arrive and desert you without bringing any relief from the pressure on your ", false);
					//[(if balls)
					if (player.lowerBody.balls > 0) MainScreen.text(ballsDescriptLight() + " and ", false);
					MainScreen.text(multiCockDescriptLight() + ".  Eventually you get to the point where you can't take it anymore, and when you feel the next orgasm drawing close you straighten up and begin ", false);
					//[(man)
					if (player.lowerBody != LOWER_BODY.CENTAUR) MainScreen.text("clawing at your tormentor's tentacles, trying to pry them from " + sMultiCockDesc() + " by main force.", false);
					//(horse)
					else MainScreen.text("bucking and stamping the ground, wanting to shake the tentacles loose but unable to reach them with your hands.", false);
					MainScreen.text("  Looking a bit irritated that you want to bring her fun to an end, the anemone nevertheless relents and releases her visegrip on your " + multiCockDescriptLight() + ".  As the joy of seeing the way to your release cleared overtakes you, the anemone avails herself of your distraction to grab your arms and pull you toward her while pushing your " + player.legs() + " out from under you.  The two of you fall backward into the shallow water as " + sMultiCockDesc() + " begins unloading its immense backup of semen in a high arc.  The ", false);
					//[(skeet amount)
					if (player.cumQ() < 500) MainScreen.text("strings", false);
					else if (player.cumQ() < 2000) MainScreen.text("streams", false);
					else MainScreen.text("gouts", false);
					MainScreen.text(" of jism ", false);
					//[(height <4' and non-horse)
					if (player.tallness < 48 && player.lowerBody != LOWER_BODY.CENTAUR) MainScreen.text("fly over your head, and turning behind you, you see the anemone trying to catch them with an open mouth and her tongue out.", false);
					else if (player.tallness < 84 && player.lowerBody != LOWER_BODY.CENTAUR) MainScreen.text("catch the air and rain down on both your faces, splashing quietly where they hit water.", false);
					else {
						MainScreen.text(" land right on your", false);
						//[(if breasts)
						if (player.upperBody.chest.BreastRatingLargest[0].breastRating >= 1) MainScreen.text(" breasts and", false);
						MainScreen.text(" face.  You hear the anemone giggling as you flinch from the white shower.", false);
					}
					MainScreen.text("  After several minutes of climax with you shooting more jism than you thought possible and the anemone banging out an accompaniment on your " + assholeDescript() + ", you finally begin to wind down.  The anemone, clearly turned on by the impressive amount of ejaculate, unloads her own blue cock into your asshole.  Her semen, lower in temperature than yours, forms a little pocket of cool inside your " + buttDescript() + ".  She idly swishes her tentacles in the", false);
					//[(big skeet)
					if (player.cumQ() >= 500) MainScreen.text(" semen-colored", false);
					MainScreen.text(" water around her as you push out your last load and slip into a doze.\n\n", false);

					MainScreen.text("Pushing your inert form off of her dick, she slips out from under you and sits up beside.  ", false);
					//[(height <4' non-centaur)
					if (player.tallness < 48 && player.lowerBody != LOWER_BODY.CENTAUR) MainScreen.text("She looks you over, then bends down and drinks up as much of the semen floating in the water as she can find nearby.", false);
					else MainScreen.text("She leans over you and begins licking the semen off your body, not stopping until you're clean (if slightly sticky).", false);
					MainScreen.text("  Having fed, she grins mischievously and grabs your " + cockDescript(0) + ", then tows your floating body to the shoreline with it.  She rolls you onto the sand and then swims for deep water, vanishing.", false);
					//(pass 8 hours, minus libido, reset lust to min)
					player.orgasm();
					dynStats("lib", -1);
					cleanupAfterCombat();
				}
			}
			//loss rape, vaginal (only full females):
			else {
				MainScreen.text(images.showImage("anemone-female-fuck"), false);
				MainScreen.text("Shivering, you fall to your knees before the anemone and begin trying to remove your " + player.armorName + ".  She claps and peals happily, splashing over to you.  Pushing your trembling hands out of the way, she unfastens your garments and pulls them free of you, but her bright expression dims a bit when she sees only your " + vaginaDescript(0) + ".", false);
				//[(lactation)
				if (player.biggestLactation() > 1) MainScreen.text("  For a moment it brightens again when she notices the dribble of milk leaking from your " + nippleDescript(0) + "s. With one finger she collects a bit and tastes it, only to grimace and stick her tongue out.", false);
				MainScreen.text("  <i>\"No food...\"</i> she muses, disappointment playing smally over her face.  You look up at her, frowning sympathetically.  She thinks for a minute, staring at your crotch, and then assumes a rakish smile", false);
				if (player.tallness < 48) MainScreen.text(", pulling you upright", false);
				MainScreen.text(".\n\n", false);

				MainScreen.text("Sitting down in the shallow water with her face toward yours, she takes your hand and pulls you forward until you're over her lap.  Her long tentacles settle into neat, straight rows and drape down her back and over one eye, giving her a sly, debonair look.  She rolls her gaze down your torso, and her free hand follows in short order as she caresses your", false);
				//[(if breasts)
				if (player.upperBody.chest.BreastRatingLargest[0].breastRating > 1) MainScreen.text(" " + breastDescript(0) + " and", false);
				MainScreen.text(" " + nippleDescript(0) + "s and drifts down past your navel.  It makes a stop at your vulva, tickling your most sensitive area and causing your " + clitDescript() + " to swell with proof of your pleasure.  The hand begins its return trip, delivering one upward stroke to your now-engorged button and shooting a spark up your spine.  It comes to rest on your hip, and the anemone presses you downward, slowly but insistently, until your " + vaginaDescript(0) + " comes to rest above her hard, blue shaft.  Two of her longer tentacles reach up from the water and touch themselves to your lower lips, pulling them apart and delivering jolts of aphrodisiac that make your " + vaginaDescript(0) + " clench and release convulsively.  Her hand resumes downward pressure, guiding your twitching pussy toward her erect blue shaft; its small tentacles bend upward in the manner of a flower turning to face the sun.  In a breathless moment the head and then the shaft push past the boundary of your open lips, the first intrusion sending home its own venom and tipping you over the teetering precipice of your control.  ", false);
				//[hymen removal]
				player.cuntChange(monster.cockArea(0), true);
				MainScreen.text("<i>\"O-oh!\"</i> the anemone exclaims as the intensifying contractions in your orgasming vagina cause the walls to lap at her penis.\n\n", false);

				MainScreen.text("The anemone releases your hand and transfers hers to your other hip just as the last of your willpower evaporates; you begin bucking your hips up and down her twitching blue shaft, painting the walls of your pussy with her venom like a mad virtuoso.  As the spasms in your " + vaginaDescript(0) + " ebb and flow with each new orgasm, the anemone's cool affectation changes to a mask of faltering determination, matching her attempt to hold out as long as possible while your demented pussy does its best to wring her dry.  From the looks on your faces it's unclear now who was intending to ravish whom!  Eventually the poor girl can take no more of it and her pulsing dick, swollen almost an inch more than when it went in with frenzied tentacles whipping this way and that, twitches and unleashes the first jet of her semen.  Her ejaculate is actually colder than your venom-teased cunt by a significant amount, creating a sharply-felt contrast as she shoots several more strings against the walls of your " + vaginaDescript(0) + " and the mouth of your womb.  The dichotomy couples with the satisfaction of finally getting what your pussy wanted to trigger the biggest orgasm yet and the gobsmacked anemone's jaw practically falls off her face as your " + vaginaDescript(0) + " squeezes faster than ever on her sensitive dick right after her own climax.\n\n", false);

				MainScreen.text("After several minutes of this final orgasm you fall backwards into the shallow water with a splash and pass out with a look of bliss, floating on a surface made choppy by your hectic ride.  The poor anemone takes a while longer to collect herself, then slowly pulls her limp dick out of your " + vaginaDescript(0) + " and tugs you up the beach past the tideline so you won't roll facedown in the water while you're unconscious.  She bends down and kisses you, tracing your " + nippleDescript(0) + "; too spent to hold up her hair, it drapes over your prone form as she leans and releases a last shot of her drug to ensure that your dreams will be of her.", false);
				anemonePreg();
				//(reduce lust to min, add 10 lust, pregnancy check)
				player.orgasm();
				dynStats("lib", 1, "lus", 10);
				cleanupAfterCombat();
			}
		}

//Minotaur Cum combat circumvention:
//(if PC has 1 or more Mino Cum, replaces last paragraph of initial encounter)
		private minoCumForAnemonieeeeez():void
		{
			spriteSelect(4);
			MainScreen.text("The initial surprise subsides to wooly-headedness and a feeling of mild arousal as the stingers in her tentacles find exposed flesh.  In panic of drowning you pull free of the ropy mass and backpaddle away from the girl until your " + player.feet() + " reassuringly touch the shallows of the lakebed.  As you shake your head to clear the haze, you notice a few of your items have fallen out of your pouches and are floating in the water.  The anemone has picked one in particular up and is examining it; a bottle of minotaur cum.  Her eyes light up in recognition as the fluid sloshes back and forth and she looks beseechingly at you, cradling it next to her cheek.  \"<i>Gimme?</i>\" she asks, trying to look as sweet as possible.\n\n", false);

			//[(PC not addicted)
			if (flags[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] == 0) {
				MainScreen.text("Do you want to make a present of the bottle?", false);
			}
			//(PC addicted but sated)
			else if (flags[FlagEnum.MINOTAUR_CUM_ADDICTION_STATE] == 1) {
				MainScreen.text("You're still riding high from your last dose; do you want to share your buzz with the girl? It might lead to something fun...", false);
			}
			//(PC addicted but in withdrawal)
			else {
				MainScreen.text("Oh hell no, you're not going to give that bottle away when you haven't even gotten your own fix yet! You raise your " + player.weaponName + " and advance on the girl with a wild look in your eyes. She shivers a bit at your expression and drops the bottle with a splash, then recovers her composure and backs up a few steps. You grab the floating bottle, and the rest of your stuff, quickly.", false);
				//(gain lust, temp lose spd/str; if in withdrawal then proceed to fight, otherwise present choices 'Give' and 'Don't Give')
				let anemone:Anemone = new Anemone();
				startCombat(anemone);
				//(gain lust, temp lose spd/str)
				dynStats("lus", 4);
				anemone.applyVenom(1);
				return;
			}
			simpleChoices("Give", giveMino, "Don't Give", dontGiveMino, "", null, "", null, "", null);
		}

//'Don't Give':
		private dontGiveMino():void
		{
			spriteSelect(4);
			MainScreen.text("", true);
			MainScreen.text("You look sternly at the blue girl and hold out your hand.  As she realizes you don't intend to let her have the bottle, her face changes to a half-pout, half-frown.  When you don't react, she throws the bottle at your feet and shouts, \"<i>Mean!</i>\"  You bend down to pick it, and the other items, up, and when you straighten back up, she looks quite angry and her tentacles are waving all over the place.  Uh-oh.  You raise your weapon as the anemone giggles sadistically and attacks!\n\n", false);
			//(proceed to combat)
			let anemone:Anemone = new Anemone();
			startCombat(anemone);
			//(gain lust, temp lose spd/str)
			dynStats("lus", 4);
			anemone.applyVenom(1);
		}

//'Give':
		private giveMino():void
		{
			spriteSelect(4);
			MainScreen.text("", true);
			player.consumeItem(consumables.MINOCUM);
			MainScreen.text("You nod at the girl and she smiles and responds with a very quiet \"<i>Yay.</i>\"  As you pick up the rest of your stuff, she takes the top off of the bottle and chugs it like a champ, without even stopping to breathe.  Her eyes widen a bit as the drug hits her system, then narrow into a heavy-lidded stare.  Dropping the bottle with a splash, she falls to her knees with another.  She looks at you and licks her lips as she begins playing with her nipples. Obviously, she's feelin' good.  ", false);
			//[(lust<30)
			if (player.lust < 30) {
				MainScreen.text("Watching as her fondling devolves into outright masturbation, your own ", false);
				if (player.lowerBody.cockSpot.count() > 0) MainScreen.text(cockDescript(0) + " becomes a little erect", false);
				else if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(vaginaDescript(0) + " aches a bit with need", false);
				else MainScreen.text(assholeDescript() + " begins to tingle with want", false);
				MainScreen.text(".  You shake off the feeling and head back to camp, leaving her to her fun.", false);
			}
			//(lust>30)
			else {
				//(decrement MinoCum by 1, opens victory sex menu, uses win-by-lust context in ensuing scenes, increment corruption by 2 for getting a girl high just to fuck her)
				MainScreen.text("As her fondling devolves into genuine masturbation you realize this would be a good opportunity to take care of your own lusts.  If you do, how will you do it?", false);
				let cockRape:Function =null;
				let vaginaRape:Function =null;
				//Normal male: -requires dick of area < 36
				if (player.lowerBody.cockSpot.count() > 0) cockRape = rapeAnemoneWithDick;
				if (player.lowerBody.vaginaSpot.hasVagina()) vaginaRape = rapeAnemoneWithPussy;
				simpleChoices("Your ass", victoryButtholeRape, "Your Cock", cockRape, "Your Vagina", vaginaRape, "", null, "Leave", camp.returnToCampUseOneHour);
				return;
			}
			doNext(camp.returnToCampUseOneHour);
		}

//anal
		private anemoneButtPlugginz():void
		{
			MainScreen.clearText();
			//victory sex choice for males with cock fit 48 or females with clit >7": "her anus"
			//(change "If you do, which of your parts" to "If you do, which part" in pre-sex choice menu)
			MainScreen.text("Imagining your climax already, you look over the anemone.  Your gaze lingers on her breasts; she sticks them out enticingly, trying to catch your interest");
			if (monster.lust > 99) MainScreen.text(" as she plays with herself");
			MainScreen.text(".  Nice, but not what you're looking for...  ");
			if (!player.isTaur()) {
				MainScreen.text("Opening your [armor] a bit, you stroke ");
				if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("[oneCock]");
				else MainScreen.text("your " + vaginaDescript(0));
				MainScreen.text(" as y");
			}
			else MainScreen.text("Y");
			MainScreen.text("ou circle around behind her.  The anemone looks over her shoulder at you as you size her up.  There... that's what you wanted to see.  Tilting the girl forward with a hand on her shoulder, you lower yourself to get a better look at her backside.");

			MainScreen.text("\n\nThe rounded blue cheeks stick out as you slide your hand up her back and press gently to lean her over further.  You rub your other hand over them, giving a squeeze and, eventually, a smack.  She lets out a cute yelp at the blow and shakes her backside at you, as if to tempt you further.  It works; ");
			if (player.lowerBody.cockSpot.hasCock() && player.cockThatFits(48) >= 0) {
				if (!player.isTaur()) MainScreen.text("you fish your [cockFit 48] out of your garments and rub it");
				else MainScreen.text("you rub your [cockFit 48]");
				MainScreen.text(" between the smooth blue curves");
			}
			else {
				if (!player.isTaur()) MainScreen.text("you finger your pussy");
				else MainScreen.text("you imagine the tightness of her hole");
				MainScreen.text(" until your " + clitDescript() + " starts to fill with blood and peeks from its hood");
			}
			MainScreen.text(", prompting a giggle from her");
			if (player.lowerBody.cockSpot.hasCock() && player.cockThatFits(48) >= 0) MainScreen.text(" as you smear a dribble of pre-cum into the crack of her ass");
			MainScreen.text(".  Putting her hands down, she tries to angle her rear up to bring you in line with her pussy; you give her a harder smack and force her back down, much to her confusion.  The blue profile appears over her shoulder again, this time with a worried expression.  Squeezing her ass once with open palms, you lean down and plant a kiss on it. A nervous titter issues from the blue girl as you pull open her cheeks.");

			MainScreen.text("\n\nYou find... nothing.  There's no asshole, none at all.  Just a pair of smooth blue curves with nothing between them!  It's like a children's cartoon back here!  \"<i>What the hell...?</i>\" you blurt.");

			MainScreen.text("\n\nAlarmed by the noise and the sudden stillness, she shivers under you, even more at a loss for words than usual.  \"<i>Hey!</i>\" you bark, your half-deflated ");
			if (player.lowerBody.cockSpot.hasCock() && player.cockThatFits(48) >= 0) MainScreen.text("cock");
			else MainScreen.text("clit");
			MainScreen.text(" already drooping indolently toward the water.  She turns and looks at you out of the corner of her eye, her face a rictus of suspense.");

			MainScreen.text("\n\n\"<i>Where's the hole?</i>\" you demand, pointing at your own " + buttDescript() + " for an example.");

			MainScreen.text("\n\nShe lights up as she understands your meaning, then lapses back into confusion when she remembers you're asking about hers, not your own.  Finally, she raises her shoulders a bit as if to shrug and shakes her head.");

			MainScreen.text("\n\n\"<i>Dammit, you have to have one!</i>\" you retort.  \"<i>Where does... where does your food come back out once you're done with it?</i>\"");

			MainScreen.text("\n\nAt this, she looks thoughtful for a few seconds, then points at her mouth.");

			MainScreen.text("\n\n\"<i>No... where does it come </i>out<i>?  You know, </i>after<i> you've eaten!</i>\"");

			MainScreen.text("\n\nShe blushes blue, then points at her mouth again and spits into the water by way of explanation.  Your jaw slackens as you take in her meaning.");

			MainScreen.text("\n\nWell, you've located her anus... what do you do now?");

			let hotdog:Function =null;
			if (!player.isTaur()) hotdog = hotdogTheAnemone;

			simpleChoices("FUCK IT", anemoneQuoteUnquoteAnal, "Hotdog", hotdog, "", null, "", null, "Fuck Off", fuckingAssholelessAnemoneeeez);
		}

//[FUCK IT] (if cock fit 48, use cock; else use clit scenes)
		private anemoneQuoteUnquoteAnal():void
		{
			MainScreen.clearText();
			let dick:boolean = (player.cockThatFits(48) >= 0 && player.lowerBody.cockSpot.hasCock());
			let x: number = 0;
			MainScreen.text(images.showImage("anemone-bj"), false);
			if (dick) x = player.cockThatFits(48);
			MainScreen.text("You're in the mood for anal and anal you shall have.  ");

			if (!player.isTaur()) {
				MainScreen.text("Ever a purist, you stroke your ");
				if (dick) MainScreen.text(cockDescript(x));
				else MainScreen.text(clitDescript());
				MainScreen.text(" until it protrudes from the hole in your " + player.armorName + ", returned to full erectness.  ");
			}
			MainScreen.text("The anemone regards you intently as you approach her and ");
			if (!player.isTaur()) MainScreen.text("seize her head");
			else {
				MainScreen.text("mount her head");
				if (!dick) MainScreen.text(", angling your clit forward along your stomach by pinning it against the anemone's forehead");
			}
			MainScreen.text("; her hair delivers tingles of venom where it brushes your skin even as her own hands dawdle playfully along your " + player.skin() + ".  Without another word, you force her head into your groin as you ram your distended ");
			if (!dick) MainScreen.text("chick-");
			MainScreen.text("prick into her eager face.");

			MainScreen.text("\n\nHer moist mouth welcomes the rapid advent your ");
			if (dick) MainScreen.text("dick");
			else MainScreen.text("clit");
			MainScreen.text(" first with surprise, then with relish.  As you slide past her lips, your ");
			if (dick) MainScreen.text("[cockHead " + (x + 1) + "]");
			else MainScreen.text("tip");
			MainScreen.text(" is embraced by the rippling walls of her throat, already trying to milk you for spunk");
			if (!dick) MainScreen.text(" that won't come");
			MainScreen.text(".  The tightness seems to adjust to the ");
			if (dick) MainScreen.text("girth of your prick");
			else MainScreen.text("girl-th of your swollen button");
			MainScreen.text("; the anemone looks up at you with ");
			if (player.isTaur()) MainScreen.text("unseen ");
			MainScreen.text("eyes a-twinkle");
			if (player.lowerBody.balls > 0) {
				MainScreen.text(", and her hair reaches forward to caress your [sack], delivering lancets of venom through the thin skin that send your arousal, and your production, into overdrive");
				if (!player.lowerBody.cockSpot.hasCock()) MainScreen.text(".  As your [balls] swell with blood and seed, you can't help but groan; there'll be nowhere for the largess to go, and it will be with you until your body reabsorbs it - or you make an outlet");
			}
			MainScreen.text(".  Your hips take over, thrusting into her brutally and knocking her head back and forth.  Her tentacles fly wildly, brushing all along your stomach and hips as you pound her mouth, leaving little stripes of heat on your " + player.skin() + " that seep into your body and only make you want to come even more.");

			MainScreen.text("\n\nIt doesn't take long for the accommodating, self-adjusting passage to bring you to climax, aided by the touch of her stingers... you try to reduce the pace of your hips, to prolong the fun, but your lover is having none of it.  As you pull out slowly to ease yourself in again, her hair wraps around the shaft of your ");
			if (dick) MainScreen.text("dick");
			else MainScreen.text("clit");
			MainScreen.text(" suddenly, stroking vigorously even as it smears a burning wave of arousal along your length.  \"<i>F-fuck,</i>\" you moan, pushed beyond your control by the coup.");
			if (dick) {
				MainScreen.text("  Your [cockFit 48] begins to ejaculate, filling the blue girl's mouth with your seed; she sucks it down greedily, swallowing every drop.");
				if (player.cumQ() >= 1000) MainScreen.text("  You push so much cum into her that her belly actually rounds from the volume, transforming from a sleek, flat midriff into a barely-contained ball of sloshing liquid");
				if (player.cumQ() >= 2000) MainScreen.text("; even when her stomach skin can stretch no further, your body won't stop filling her, and the bulge expands up her esophagus, pushing out her chest and throat until she's full to the brim and rather reminiscent of a big, blue pear");
				if (player.cumQ() >= 1000) MainScreen.text(".");

				MainScreen.text("\n\nSatisfied, you pull out of the anemone's throat, dragging a line of semen with you that drools from the corner of her mouth.  She hiccups and giggles drunkenly, then wipes it away and licks it off of her hand.  \"<i>Thanks!</i>\" she chirps; she purses her lips for a kiss, but you push her away.");

				MainScreen.text("\n\n\"<i>Don't mention it...</i>\"  You leave her there, ");
				if (player.cumQ() >= 1000) MainScreen.text("bobbing roundly in the water as she tries to make her way from the shallows, ");
				MainScreen.text("and head back to camp.");
			}
			else {
				MainScreen.text("  Your clit, packed with nerves, shivers and sets off your orgasm as she strokes, and you bury it into her throat as your head rolls back.  The anemone flinches, unnoticed by you, as your vagina ");
				if (player.wetness() < 4) MainScreen.text("drools its lube along your length.  ");
				else MainScreen.text("squirts obscenely, coating your length and her face with your female orgasm.  ");
				MainScreen.text("Your body shivers as near-painful sensations wrack you, engulfed in the anemone's questing passage");
				if (player.lowerBody.balls > 0) MainScreen.text(".  Your lover, hopeful, watches and waits for your testicles to rise into your groin and unload their cargo");
				if (player.lowerBody.cockSpot.count() == 0) MainScreen.text("; she even tries to push them up herself with her hands, as if that would make your clit produce the semen inside them");
				MainScreen.text(".");
				if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("  Your clit remains unproductive; your male orgasm squirts out uselessly around her head, mingling with the lake water.  The girl's expression upon seeing this is pained, and she tries but fails to get free to follow the arcing white ropes, sending further spasms of pleasure through your sensitive distaff staff.");
				MainScreen.text("  Eventually your body calms enough to respond to your impulses, and you carefully draw your [clit] out of your lover's throat.");

				MainScreen.text("\n\n\"<i>No food,</i>\" she whines, pouting.  Negligent and uncaring, you shake your head");
				if (player.lowerBody.cockSpot.hasCock()) MainScreen.text(", pointing to the squiggles of your seed floating lazily in the lakewater,");
				MainScreen.text(" and leave her.");
			}
			//end scene, reset hours since cum and lust, reduce libido and sens a little
			player.orgasm();
			dynStats("lib", -.5, "sen", -.5);
			cleanupAfterCombat();
		}

//[Hotdog!]
		private hotdogTheAnemone():void
		{
			MainScreen.clearText();
			MainScreen.text(images.showImage("anemone-doggy"), false);
			let dick:boolean = (player.cockThatFits(48) >= 0 && player.lowerBody.cockSpot.hasCock());
			let x: number = 0;
			if (dick) x = player.cockThatFits(48);
			//horses eat hay, not hotdogs
			MainScreen.text("Well... it's the spirit of the thing that counts, right?  That blue butt still does look pretty tempting.  You force the anemone forward again and squeeze them together; she giggles and tries once more to push her vagina toward you, but you push it down again and jam your ");
			if (dick) MainScreen.text("[cockFit 48]");
			else MainScreen.text("[clit]");
			MainScreen.text(" between her small, round cheeks, seizing one in each hand and forcing them to sleeve as much of your length as possible.  The girl looks back at you, her face a picture of confusion, but you do not even care.  Her cool ass feels otherworldly as you thrust through it, poking your tip out of the crack and then pulling back again; ");
			if (dick) MainScreen.text("pre-cum");
			else MainScreen.text("your juice");
			MainScreen.text(" drools onto her at one end of your motion, filling your little canyon of fun with a river of hot lubrication that you smear liberally throughout.");
			MainScreen.text("\n\n\"<i>Hey,</i>\" you call, \"<i>you could be helping.  Use your tentacles or something.</i>\"");

			MainScreen.text("\n\nThe anemone, ");
			if (dick) MainScreen.text("excited by the feel and sight of your pre-cum");
			else MainScreen.text("looking almost bored");
			MainScreen.text(", obliges and snakes several toward you; they stop just inside the range of your furthest stroke, flitting tantalizingly as if begging you to push into them.  Wary at first, you do so and they gently caress ");
			if (dick) MainScreen.text("your [cockHead " + (x + 1) + "]");
			else MainScreen.text("the nerve-packed end of your [clit]");
			MainScreen.text(", responding almost autonomously to wrap around it.  The grip is not enough to keep you from pulling back out, though, and they relinquish your shaft, leaving the tip covered in a warm lattice of venom that soaks through you.  A shudder wracks you, and you eagerly push in again, sliding first into her cheeks, then down the slick passageway made by your lube, and finally into the body-heating embrace of her tentacles.  As your ");
			if (dick) MainScreen.text("now-throbbing prick");
			else MainScreen.text("swollen, red clit");
			MainScreen.text(" wicks more of her venom into you, your hips begin to disobey your will, thrusting faster with each dose and pushing the anemone's face into the lakebed; elbows crooked and fingers splayed, she still can't raise her head against the vigor of your onslaught.");

			MainScreen.text("\n\nBefore you can rub the very skin off your ");
			if (dick) MainScreen.text("cock");
			else MainScreen.text("clit");
			MainScreen.text(", you come.  Your body shakes and you nearly fall atop your lover; ");
			if (dick) {
				MainScreen.text("your swollen, painfully hard prick fountains with cum, coating the anemone's back and hair in white.  The venom in your system draws out your orgasm to incredible lengths, and " + sMultiCockDesc() + " ejaculates over and over until you feel lightheaded and woozy.");
				if (player.cumQ() >= 500) MainScreen.text("  When you've finished, not a single place on the anemone's backside is still blue; the giddy girl is shoving your semen into her mouth with her tentacles and hands, swallowing almost as much lakewater as jizz.");
			}
			else {
				MainScreen.text("your pussy clamps down, trying and failing to find something to squeeze and ");
				if (player.wetness() < 4) MainScreen.text("drooling its lube down your thighs.");
				else MainScreen.text("squirting cum behind you to rain onto your partner's calves and the surface of the lake.");
				MainScreen.text("  The anemone sighs impatiently as you twitch atop her, waiting for you to finish.");
			}

			MainScreen.text("\n\nYou slip from between the blue girl's asscheeks, tucking your still-sensitive length away with a flinch, and leave her behind.  The anemone ");
			if (dick) MainScreen.text("dares not move from her knees, balancing your freshly-shot load on her back as she tries to push it toward her face with her tentacles.");
			else MainScreen.text("looks indolently at you as you go.");

			//end scene, reset hours since cum and lust, reduce libido and sens a bit
			player.orgasm();
			dynStats("lib", -.5, "sen", -.5);
			cleanupAfterCombat();
		}

//[Fuck Off]
		private fuckingAssholelessAnemoneeeez():void
		{
			MainScreen.clearText();
			MainScreen.text("Dammit all.  Your fun is completely ruined and you're limp as toast in milk now.  You abruptly pull yourself upright, tucking away your goodies.");

			MainScreen.text("\n\n\"<i>No food?</i>\" she says, turning around and fixing a pout on you.");

			MainScreen.text("\n\n\"<i>Don't worry, I've got something for you.</i>\"  You place a hand behind your back and watch her face light up, then pull it out with the middle finger extended skyward.  \"<i>Eat it.</i>\"  As the rejection sinks in, you kick wet sand from the lakebed into her stricken face and stomp off, mad as hell.");

			//-30 lust)
			dynStats("lus", -20);
			cleanupAfterCombat();
		}

//Bee on Anemone: Finished (Zeik)
//madzeikfried@gmail.com
//[Ovipositor] option in rape menu
		private anemoneGetsLayedByBeePositor():void
		{
			if (player.canOvipositSpider()) {
				spiderOvipositAnAnemone();
				return;
			}
			MainScreen.clearText();
			MainScreen.text(images.showImage("anemone-egg"), false);
			MainScreen.text("The tentacles on this girl sing a siren song and beg you to sample their venomous, greedy caresses as you plunge your egg-layer into her... even the small, blue feelers around the ");
			if (monster.HP < 1) MainScreen.text("reclining");
			else MainScreen.text("vigorously masturbating");
			MainScreen.text(" girl's pussy call to you.  Your insectile abdomen pulses as eggs shift, lining up for deposition, and your long, black ovipositor slides out, pulsing in time with your heartbeat.  The idea of having those feelers stroke your strange organ while you unload your pent-up eggs sounds so good that a drop of honey oozes out, filling the air with a sweet scent that makes your");
			if (player.antennae > ANTENNAE.NONE) MainScreen.text(" antennae");
			else MainScreen.text("nose");
			MainScreen.text(" tingle.  The anemone's eyes light up as your black shaft drools, and she leans forward, catching the nectar on a finger and raising it to her lips.");

			MainScreen.text("\n\nYou watch with mounting arousal as she rolls your nectar on her tongue; her eyes widen at the taste and she smiles ingratiatingly at you.  \"<i>Sweet... more?</i>\" she coos, pursing her lips at you.");

			MainScreen.text("\n\n\"<i>As long as you stop making that stupid ");
			if (silly()) MainScreen.text("duck ");
			MainScreen.text("face,</i>\" you reply.");

			MainScreen.text("\n\nThe anemone looks quizzical, but wraps a hand around your egg-laying organ, pulling it closer.  You allow her to draw you in and press the black, wet tip to her mouth, and she raises her other hand to it and begins to stroke.  You shiver in pleasure as another gob of honey forms, and the anemone, watching your reaction, smiles slyly.  She slides two of her tentacles into each palm, adding the caressing, sticky sensation of her stingers to the handjob!  Your [legs] wobble as your blood vessels loosen and your ovipositor fills with warm, fluttering heat; it feels so fuzzy that you don\'t even notice when it begins oozing your nectar constantly.  You do notice, however, when she lifts your prong to her lips and brashly sticks her tongue right down the hole!");

			MainScreen.text("\n\nA wordless groan drops from your mouth as the girl's small, cool muscle probes the inside of your ovipositor.  She strokes the base eagerly, forcing more of your honey to the end to be lapped up; every time a glob rises to the top, her tongue greedily scoops it up, tracking a tingling, ticklish trail along the nerves on the inside of your black bee-prick.  Fuck, there's no way you can hold back... the first of your eggs is pushed from you, forcing the anemone's lips apart as it enters her mouth.");

			MainScreen.text("\n\n\"<i>Lumpy... ?</i>\"  Your intended receptacle pulls away grimacing as several more spurt from your organ, and deposits the one from her mouth into the lakewater alongside them.  The ovipositor in her grip squirms, wrapped in hands and tentacles, dropping spheres slowly and unsatisfyingly into the water as she decides what to do.");

			//[(sens>=50 or horse)
			if (player.stats.sens >= 50 || player.isTaur()) {
				MainScreen.text("\n\n\"<i>Weird,</i>\" she says tersely, and starts jerking your ovipositor off with both hands once again; you shudder and try to will your arms to stop her onslaught of pleasure, but they can't.  As she smears her tentacles along the length of your black pseudo-cock, your resolve evaporates, and soon your tube is forcing out eggs into the open air, lulled by the enveloping warmth of anemone venom.  The brazen girl continues to stroke with four tentacles and one hand as she cherry-picks choice globs of your honey from your flow, spitting out any of the eggs she gets with them.  Your body does not even care, adding sphere after sphere to the spreading film floating on the choppy water.");
				//[(cock)
				if (player.lowerBody.cockSpot.hasCock()) {
					MainScreen.text("\n\nYou hurriedly open your armor as your ");
					if (player.totalCocks() == 1) MainScreen.text("male part erupts");
					else MainScreen.text("male parts erupt");
					MainScreen.text(" in sympathy, lancing semen over your partner.  Surprisingly, the anemone doesn't even notice, so absorbed is she in experimenting with your modified stinger.");
				}
				//[(Lev3 eggs)
				if (player.eggs() > 40) {
					MainScreen.text("  Eventually there are so many eggs ");
					if (player.lowerBody.cockSpot.hasCock() && player.cumQ() > 1000) MainScreen.text("and so much cum ");
					MainScreen.text("that they begin to collect around her, clumping and layering around her midriff like white, slimy algae on a pier post.");
				}
				MainScreen.text("  As the last rolls from you, the anemone raises your wilting ovipositor to her lips once again, eagerly drinking the final sweet secretions that fall out in long, slimy strings.");

				MainScreen.text("\n\n\"<i>Weird,</i>\" she repeats, tugging at the shriveling organ as it tries to recede into your slit.");
				MainScreen.text("\"<i>Ugh...</i>\" you respond, weak in the [legs].  With a jerk, you pull your abdomen away from her grasp, flinching as her skin rubs your sensitive slit, then turn to leave.  She catches your hand, looking almost concerned.");

				MainScreen.text("\n\n\"<i>Chunks...</i>\" the anemone says, gesturing to your wasted eggs.  \"<i>See... doctor?</i>\"");
			}
			else {
				MainScreen.text("\n\nYou have no such vacillations; you're gonna violate her.  As good as the tongue felt, your body wants to put these eggs in something.  Boneless, you'll never make it to her pussy, but... any hole's a goal.  Grabbing the anemone's face in both hands, you stuff your black organ into her mouth, right to the hilt.");

				MainScreen.text("\n\n\"<i>Mmmf!</i>\"  The blue girl struggles and tries to pull away as the next batch of eggs slides into her; her hands dart to yours, trying to pry fingers loose, but your grip is vice-like with renewed intensity as you focus on your release.  The slippery spheres barrel down her throat like marbles as the madness washes over you and settle heavily on her stomach.  ");
				if (player.eggs() < 20) MainScreen.text("It doesn't take long before you finish, pushing your cargo down her passageway in a neat, orderly line.");
				else {
					MainScreen.text("So many come that you can see them under her skin, a myriad of tiny bumps");
					if (player.eggs() >= 40) MainScreen.text("; these same bumps multiply upward as your long-suffering abdomen pushes out line upon line of eggs, and soon you can feel them pressing back against the tip of your ovipositor.  You squeeze the girl's head in your hands, holding her against the base, and concentrate; slowly, the deposited eggs give way to their siblings, stretching her elastic stomach and chest wide");
					MainScreen.text(".");
				}

				MainScreen.text("\n\nRelieved, you pull your shrinking tube from the wet mouth; a few straggling eggs fall from it, dropping into the water.  The anemone looks plainly queasy as she rubs her stomach.");

				MainScreen.text("\n\n\"<i>Hard...</i>\" she moans, pressing down on her midriff and frowning.  \"<i>Yucky...</i>\"");

				MainScreen.text("\n\nThat's too bad.");
				//[(silly mode and fert eggs)
				if (silly() && player.fertilizedEggs() > 1) MainScreen.text("  You briefly amuse yourself imagining her carrying your eggs to term and having them hatch in her mouth, so that when she talks, she shoots bees.  Nicholas Cage would be proud.");
				MainScreen.text("  Gathering your things, you " + player.mf("laugh", "giggle") + " at her and depart.");
			}
			player.dumpEggs();
			player.orgasm();
			cleanupAfterCombat();
		}

//Drider on Anemone: Finished (Zeik)
//[Ovipositor] option with spiderbutts
		private spiderOvipositAnAnemone():void
		{
			MainScreen.clearText();
			MainScreen.text(images.showImage("anemone-egg"), false);
			MainScreen.text("As the girl's resistance ebbs, ");
			if (player.HP < 1) MainScreen.text("eyes unfocused with fatigue");
			else MainScreen.text("two fingers plunging eagerly into her pussy");
			MainScreen.text(", you advance on her.  Your abdomen bends forward and your egg-laying organ slides out, dripping slime into the water with little 'plit' noises; the girl, fascinated despite the strangeness of it, sits up and creeps forward to touch it.");

			MainScreen.text("\n\nWhen her cool, wet fingers connect with the sensitive end of your ovipositor, you can't help but push out a heady glob of lubrication.  Curious, she catches it on her palm, then raises it to her lips, nipping at it with her tongue.  Her face pinches into a grimace, and the little periwinkle triangle sticks out of her mouth as she childishly shakes her head back and forth and cries, \"<i>Eww!</i>\"");

			MainScreen.text("\n\nNot really the answer you wanted to hear.  As you tilt your drooling tube toward her, she tries to get away, turning over and splashing on hands and knees.  Not having any of that, you reach down and grab her foot.  She shrieks and lashes at you with her tentacles, catching your arm with one tingling swipe of venom - the rest land harmlessly on hard chitin.  However, they'll be trouble when you pull in close to actually deposit your eggs... there's little to do about it but get the hard part out of the way.");

			MainScreen.text("\n\nGrasping the nettle, you gather her squirming, writhing hair in your hands and pull it taut, then lasso it with a spray of silk, directing it with your foremost legs.  The feeling of your spinnerets weaving long criss-crossing strands down her hair to restrain it - of spewing white, sticky strings all over it - becomes increasingly sexual as her venom suffuses your bloodstream through your hands");
			//[(cock)
			if (player.lowerBody.cockSpot.hasCock()) MainScreen.text(", and your [armor] tightens as [eachCock] swells");
			else if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(", and the inside of your [armor] dampens with the lube your [vagina] leaves as it clenches around empty air");
			MainScreen.text("; you have to push yourself to finish working before you can lose yourself to it.  Completing your restraints, you release her tentacles.  They bob behind her in one mass like a long, cute ponytail, and only the ends are free to wiggle.  When she realizes this, her behavior changes dramatically.");

			MainScreen.text("\n\n\"<i>Off,</i>\" whimpers the anemone, thrashing the water, turning her head and trying reach the silk tie.  \"<i>Off!</i>\"");

			MainScreen.text("\n\nEven with her arms and legs free, having her hair tied seems to be traumatic for the anemone... experimentally, you restrain her hands and she looks at you with wet eyes; a tear actually falls from one, rolling down her cheek.  \"<i>Off...</i>\" she begs, pouting.  \"<i>Please?</i>\"");

			MainScreen.text("\n\n\"<i>Soon,</i>\" you answer.  The first order of business is to clear out the uncomfortable pressure in your abdomen unhindered");
			if (player.stats.cor < 60) MainScreen.text(", even though her adorable and slightly surreal puppy dog eyes implore you otherwise");
			MainScreen.text(".  \"<i>Let me just finish what I need to do first.</i>\"");

			MainScreen.text("\n\nFrowning, the girl shakes her head.  \"<i>No...</i>\" she insists, \"<i>off first!</i>\"  Well, that's definitely not happening; she'll just overwhelm you with venom and ");
			if (player.gender > 0) {
				MainScreen.text("go for your ");
				if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("cock");
				else MainScreen.text("cunt");
				MainScreen.text(", leaving");
			}
			else MainScreen.text("leave");
			MainScreen.text(" you holding the bag... of eggs, as it were.  Your steel your resolve and stride atop her, pinning the loose, wiggling end of her ponytail harmlessly against your chitinous underside and forcing her hands underneath her by lowering some of your weight onto her back.");

			MainScreen.text("\n\n\"<i>Be just a minute,</i>\" you grunt, searching out her pussy with your egg-laying tool.  A caress and a tingle of venom from its feelers tell you that you've found it, and you thrust forward, impaling the blue girl's cunt.");

			MainScreen.text("\n\nShe starts in surprise at this, moaning, and you reach down to wrap your hands under her chin, pulling her face up to look at you.  \"<i>Not so bad, eh?</i>\" you tease her.  The anemone's mouth hangs open wordlessly as you thrust your ovipositor against her entrance, and the nubby blue feelers of her vulva bend inward toward it, tracing lines as you draw out and sending shivers through your twined bodies.");

			MainScreen.text("\n\n\"<i>Oooh...</i>\" she sighs, relaxing under you.  \"<i>M-more...</i>\"  The girl has completely forgotten about her hair now, consumed by arousal.  Her pussy clings wetly to your egg-laying tube as you pump her; not strong enough to clamp the slime-slicked organ in place, her squeezes only serve to tighten the passage you thrust through and tickle the tip as you rub it against her insides.  The sensation is beyond you, and the first of your eggs pushes into position, sliding smoothly down your oviduct and into her snatch.");

			MainScreen.text("\n\n\"<i>Ah-ahh!</i>\" she cries, as it enters her.  The anemone's passageway ripples around you in climax, and below her body, unseen by you, her little blue cock drools its seed into the lake.  Her elbows buckle as your egg-bloated prong plugs her tight vagina, but your grip on her chin prevents her from falling facefirst into the water; she looks up at you adoringly, eyes alight with affection.");

			MainScreen.text("\n\n\"<i>Don't worry,</i>\" you murmur, ");
			//[(sexed)
			if (player.gender > 0) MainScreen.text("while unfastening your [armor] with one hand, ");
			MainScreen.text("\"<i>there is definitely more.</i>\"  The next two eggs slip into her as you speak, sending convulsions through her body.  Her pussy spasms again and enfolds your ovipositor even more tightly; you're ready for the sensation this time, and allow it to resonate through you, forcing out your own wet orgasm.  You hold her face as you unburden yourself");
			if (player.lowerBody.cockSpot.hasCock()) {
				MainScreen.text(" and cover her hair with yet more white strings from your twitching manhood");
				if (player.lowerBody.cockSpot.count() > 1) MainScreen.text("s");
			}
			//(egg level 3)
			if (player.eggs() >= 40) MainScreen.text("; so many eggs pump into her that she gives a little start when her distended belly touches the lukewarm water below");
			MainScreen.text("... finally you let her go when you're completely empty, pulling your stalk from her with a lewd sucking noise.  A little bit of green goo drools from her pussy as she slumps over on her side, and you make ready to leave her there - bloated and pregnant, with a squiggle of her semen floating in the water next to her.");

			MainScreen.text("\n\n\"<i>W-wait,</i>\" she pants, and you turn back.  \"<i>Off...</i>\"  The begging anemone fixes you with a desperate, pleading gaze, trying to reach around her body to her hair.");

			//[(corr < 75)
			if (player.stats.cor < 75) {
				MainScreen.text("\n\nWell, you did say you would.  Bending over her, you cut the string tying her tentacles with one pointed leg, allowing them free play once again.");

				MainScreen.text("\n\n\"<i>Thank... you...</i>\" she pants, and closes her eyes in sleep.");
			}
			//(else corr >=75)
			else {
				MainScreen.text("\n\n\"<i>Oh, that?  I lied,</i>\" you say.  \"<i>But really, it's a good look for you.  Very cute.  Just keep it.</i>\"");
				MainScreen.text("\n\nThe girl graces your retreating back with a look of horror, struggling to pull her suddenly-heavy body upright and reach her hair, and you can hear her plaintive whines for quite a while as you walk.");
			}
			//ponytailed anemone with Lisa Loeb glasses WHEN
			player.dumpEggs();
			player.orgasm();
			cleanupAfterCombat();
		}


		public anemoneKidBirthPtII():void
		{
			MainScreen.clearText();
			spriteSelect(71);
			MainScreen.text("You awake and look skyward to the sun for a hint at the time.  What greets you is more of an eclipse; a shape impedes your view.  As your eyes adjust to the light, it resolves into an upside-down blue-eyed, blue-skinned face wreathed with snubby, shoulder-length tentacles of purple and green hue.  The silence continues as you stare into it, until you move to push yourself off the hard ground.  At the first sign of activity, the head disappears into the water barrel with a sloshing sound.  You push yourself to your " + player.feet() + " and look back toward it; the eyes, now right side-up, peek over the rim bashfully atop a set of blue fingers.");
			MainScreen.text("\n\n\"<i>Um... hi,</i>\" you venture.");
			MainScreen.text("\n\nThe eyes raise up and a smile appears beneath.  \"<i>Um... hi!</i>\"");
			MainScreen.text("\n\nYou cross the few steps over to the barrel and its occupant; the beaming smile persists");
			if (player.tallness > 48) MainScreen.text(" even as the face angles up to maintain eye contact");
			MainScreen.text(".  Peering into the barrel, you can make out a little, though most of her décolletage is obscured by a pair of gangly knees.  The previously-noted head sits atop a pair of narrow, thin shoulders bearing equally wiry-looking arms.  She raises one hand and gives you a little finger wave.");
			MainScreen.text("\n\n\"<i>Excuse me... could you get out of there?</i>\" you ask.  Prompted by her subsequent failure to react, you add, \"<i>I drink out of that.</i>\"");
			MainScreen.text("\n\nStill she stays put.  Right, well... you grab the dipper hung on the side of the barrel and mime dipping it - pointing at the container after you do - then tilting it to your lips and taking a deep swallow.  Her eyes light up, and she nods at you eagerly.  Taking the dipper from you, she stands.");
			MainScreen.text("\n\nNow exposed above the calf, you can make out more of her details.  The theme of gawky angularity suggested by her bust holds force throughout; though she's about as tall as her race gets, her pair of small tits - they can't be bigger than an A-cup - is nearly concealed by drooping gills almost comically oversized for her chest.  Her torso is slender, while her hips are somewhat more curvy by contrast, sloping out gently below the waist to descend into narrow, long legs and form a general feminine structure, albeit one from underfunded builders.  A blue wiener hangs from her pelvis, dangling in the open space between her thighs.  This girl is skinny, no matter how you look at her.");
			MainScreen.text("\n\nAnd... she's plunging the dipper into the barrel around her ankles.  You can hear it scraping the sides and bottom as she swishes it around to fill it up.  Politely and carefully handing it back to you, she resumes her seat and the water level rises slightly to cover her legs.  You stare at the dipper and then at her; she returns your gaze unflinchingly, splashing some liquid on her exposed gills with an idle hand.");
			MainScreen.text("\n\nDoes she expect you to drink this?  And does she plan to live in your camp?  Won't it be absurdly toilsome to evict someone from your water barrel without speaking a word of their language or using physical force?  Your mind, unwilling to fathom answers to these questions - which is just as well since they're all variations on 'yes' - latches onto the trivial like a lifeline.  The water level was definitely lower than you left it before your nap.  Maybe she absorbed it through her skin as she grew to adulthood?  This might explain why her hips and thighs are better developed than her chest and 'hair'.");
			MainScreen.text("\n\nChanging tack to work your hesitant brain around to the real issue, you address her again; assisted by clumsy pantomime, you ask her if she intends to stay in your barrel forever.  She smiles widely, her eyes lighting up, then makes a show of bowing her head graciously several times.  Oh... she thought it was an invitation.  The wind spills out of your sails and your shoulders slump in the face of her cheerful imperturbability.  Looks like words won't work; you'll have to reach her with your fists.  Do you eject the anemone from your camp?");
			simpleChoices("Keep It", keepAnemoneKid, "Eject", getRidOfAnemone, "", null, "", null, "", null);
			//[yesno]
		}

//[yes, i am allergic to fun. sweep the leg, johnny! get 'em a body bag!]
		private getRidOfAnemone():void
		{
			MainScreen.clearText();
			spriteSelect(71);
			MainScreen.text("Enough of this.  Summoning your backbone, you grasp the anemone's upper arm and pull her to her feet; she's light as a decorative feather and twice as blue once she grasps your intention and her camouflage reflex takes over.  Putting one arm under her, you carry her legs out from underneath and lift her bodily out of the barrel, then set her down on the hard ground.  She turns a teary pout on you, but you look away.  Picking up the nearly-empty container and setting it atop your shoulder, you begin the walk to the stream.  The girl stumbles along behind you, unsteady on her feet.");
			MainScreen.text("\n\nUpon reaching your destination, you dump the contents of the anemone's erstwhile apartment into the babbling brook, then point down-current toward the lake and set your jaw.  Glancing at your stony demeanor, the blue girl steps into the water, moistens her gills, and then begins the long trek to her ancestral home.");
			//(set Kidswag to -1)
			flags[FlagEnum.ANEMONE_KID] = -1;
			doNext(playerMenu);
		}

//[no, bonsai anemone is awesome and fuck the haters]
		private keepAnemoneKid():void
		{
			MainScreen.clearText();
			spriteSelect(71);
			MainScreen.text("You frown as you stare into the opaque eyes.  You can't think of any way to get her out of the barrel, short of manhandling her into the wilderness where she'll flourish or expire depending on fate, and you haven't the heart for such endeavors.  Ah... she looks so happy sitting there with her head resting on her hands, too.  Well, worse things could happen - but probably not stranger.");
			MainScreen.text("\n\n\"<i>So... what do I call you, then?</i>\" you ask; she looks at you quizzically.  You continue to muse, wondering aloud what you would even name a kid anemone.");
			MainScreen.text("\n\n\"<i>Kid... ?</i>\" starts the girl, attempting to duplicate your speech.  You try to clarify, but, seeming not to hear, she continues to sound out the words and get the shape of them.");
			MainScreen.text("\n\nWaving your hand, you break in on her thoughts.  Once you're born, you explain, then you get a name; girls become Sarahs or Victorias, while boys become Bonecrushers or Teardrinkers.  She can't just be 'kid'.");
			MainScreen.text("\n\n\"<i>Then,</i>\" she rejoins, tilting her head in thought to absorb the conversation she's still several lines behind in, \"<i>Kid... Aeh?</i>\"");
			MainScreen.text("\n\n\"<i>Really? 'Kid A'?</i>\"");
			MainScreen.text("\n\n\"<i>Sarahs you're born!</i>\"");
			MainScreen.text("\n\nYe gods and little fishes, you've taught her how to pun.  You make a mental note to look for another water barrel, preferably sans occupant, and keep it stashed out of sight.  Briefly and halfheartedly you play with the idea of searching this world for species to comprise Kids B through Z, but put it aside.");
			MainScreen.text("\n\n(<b>Kid A can be found in your \"Stash\"!</b>)");
			//set Kidswag flag to 1
			flags[FlagEnum.ANEMONE_KID] = 1;
			doNext(playerMenu);
		}


//KID A FOLLOWER STUFF
		public anemoneBarrelDescription():void {
			if (model.time.hours < 6) //(morning)
				MainScreen.text("Kid A is sleeping in her barrel right now.");
			else if (model.time.hours <= 10)
				MainScreen.text("Kid A stands next to her barrel, refilling it from one of your waterskins.  A second full skin is slung over her shoulder.  She gives you a grin.\n\n");
			else if (flags[FlagEnum.KID_SITTER] > 1)
				MainScreen.text("Kid A is absent from her barrel right now, dragooned into babysitting again.\n\n");
			else if (model.time.hours < 16) //(midday)
				MainScreen.text("Kid A is deep in her barrel with the lid on top, hiding from the midday sun.\n\n");
			else if (model.time.hours < 22) //(night hours)
				MainScreen.text("Kid A is peeking out of her barrel.  Whenever you make eye contact she breaks into a smile; otherwise she just stares off into the distance, relaxing.\n\n");
			else MainScreen.text("Kid A is here, seated demurely on the rim of her barrel and looking somewhat more purple under the red moon.  She glances slyly at you from time to time.\n\n");
		}

//[Barrel] button in [Stash] menu (appears whenever Kidswag flag >= 1)
		public approachAnemoneBarrel():void
		{
			let item:Function =null;
			let weaponT:string = "Give Weapon";
			let weaponB:Function = giveAnemoneWeapon;
			MainScreen.clearText();
			spriteSelect(71);
			MainScreen.text("You walk over to the barrel.  ");
			//[(display if hourssinceKiditem >= 16)
			if (flags[FlagEnum.KID_ITEM_FIND_HOURS] >= 16) {
				MainScreen.text("An item sits next to it, left there by the anemone as a present to you.  Or 'rent', if you choose to think of it that way.  ");
				item = getAnemoneItem;
			}
			//[(if Kid A has been given a weapon)
			if (flags[FlagEnum.ANEMONE_WEAPON_ID] != 0) {
				MainScreen.text("She has " + ItemType.lookupItem(flags[FlagEnum.ANEMONE_WEAPON_ID]).longName + " sitting next to it.  ");
				//MainScreen.text("Kid A pokes her head out and smiles at you.  What do you need from her?");
				weaponT = "Take Weapon";
				weaponB = takeOutOfAnemone;
			}
			//(if babysitting)
			if (flags[FlagEnum.KID_SITTER] > 1) MainScreen.text("Kid A is away right now, helping season some of Marble's children.  If you wanted to leave or take an item, she would discover it when she got back.  ");
			else if (kidAXP() < 25) MainScreen.text("Kid A sinks below the rim, peering nervously at you.  ");
			else if (kidAXP() < 75) MainScreen.text("Kid A pokes her head out and smiles at you.  ");
			else MainScreen.text("Kid A leans her head and shoulders out of the barrel and puts her elbows on the rim, staring unabashedly at you as she rests her chin on her hands.  ");
			MainScreen.text("What do you need from her?");
			//[(if N.Watch is toggled on)
			if (flags[FlagEnum.ANEMONE_WATCH] > 0) MainScreen.text("\n\n<b>Kid A is currently watching for enemies at night.</b>");

			//Tutor, N.Watch, and Evict require the anemone to be present
			menu();
			MainScreen.addButton(0, "Item", item);
			MainScreen.addButton(1, weaponT, weaponB);
			if (flags[FlagEnum.KID_SITTER] <= 1) {
				if (flags[FlagEnum.ANEMONE_WEAPON_ID] != 0 && player.fatigue <= 90) MainScreen.addButton(3, "Tutor", tutorAnemoneKid);
				else if (player.fatigue > 90) MainScreen.text("\n\nYou're too tired to tutor Kid A.");
				MainScreen.addButton(4, "Watch", anemoneWatchToggle);
				MainScreen.addButton(8, "Evict", evictANemone);
				let sex:boolean = false;
				if (flags[FlagEnum.HAD_KID_A_DREAM] > 0 && flags[FlagEnum.ANEMONE_KID] >= 2) {
					if (kidAXP() >= 40) {
						if (player.lust >= 33) {
							if (player.lowerBody.cockSpot.hasCock()) {
								if (player.cockThatFits(60) >= 0) sex = true;
								else MainScreen.text("\n\nYour dick is too big for Kid A to do anything with.");
							}
							if (player.lowerBody.vaginaSpot.hasVagina()) sex = true;
							if (sex == true) MainScreen.addButton(2, "Sex", kidASex, false);
						}
						else MainScreen.text("\n\nYou aren't aroused enough to have sex with her right now.");
					}
					else MainScreen.text("\n\nKid A isn't self-confident enough to have sex with right now...  Perhaps if you could tutor her with a weapon she seems to agree with?");
				}

			}
			MainScreen.addButton(9, "Back", inventory.stash);
		}

//[Item](only appears if hourssinceKiditem flag >= 16)
		private getAnemoneItem():void
		{
			MainScreen.clearText();
			spriteSelect(71);
			let choice:number;
			let itype:ItemType;
			MainScreen.text("You reach down and pick up her present.  Today, she's left you ");
			if (kidAXP() == 0) itype = consumables.DRYTENT;
			else if (kidAXP() < 50) {
				///[IncubusDraft/SuccubusMilk/ImpFood/MinoBlood/LargeAxe]
				choice = rand(8);
				if (choice == 0) itype = consumables.INCUBID;
				else if (choice == 1) itype = consumables.SUCMILK;
				else if (choice == 2) itype = consumables.IMPFOOD;
				else if (choice == 3) itype = consumables.GOB_ALE;
				else if (choice == 4) itype = consumables.WETCLTH;
				else if (choice == 5) itype = consumables.L_DRAFT;
				else if (choice == 6) itype = consumables.W_FRUIT;
				else itype = consumables.EQUINUM;
			}
			else if (kidAXP() < 75) {
				//White Book/Bee Honey/Ovi Elixir/Shark Tooth/S. Swimwear/Lust Draft/Bimbo Liqueur(same odds as player drop)
				choice = rand(6);
				if (choice == 0) itype = consumables.W__BOOK;
				else if (choice == 1) itype = consumables.BEEHONY;
				else if (choice == 2) itype = consumables.OVIELIX;
				else if (choice == 3) itype = consumables.SHARK_T;
				else if (choice == 4) itype = armors.S_SWMWR;
				else if (choice == 5) itype = consumables.L_DRAFT;
				if (rand(100) == 0) itype = consumables.BIMBOLQ;
			}
			else if (kidAXP() < 100) {
				//Mino Blood/Large Axe/Comfortable Clothes/Lust Draft/Lust Dagger/Bro Brew(same odds as player drop)
				choice = rand(5);
				if (choice == 0) itype = consumables.MINOBLO;
				else if (choice == 1) itype = weapons.L__AXE;
				else if (choice == 2) itype = armors.C_CLOTH;
				else if (choice == 3) itype = consumables.L_DRAFT;
				else if (choice == 4) itype = weapons.L_DAGGR;
				if (rand(100) == 0) itype = consumables.BROBREW;
			}
			else {
				//T.Shark Tooth/Pink Gossamer/Black Gossamer/Reptilum
				choice = rand(4);
				if (choice == 0) itype = consumables.TSTOOTH;
				else if (choice == 1) itype = consumables.S_GOSSR;
				else if (choice == 2) itype = consumables.B_GOSSR;
				else if (choice == 3) itype = consumables.REPTLUM;
				if (rand(100) == 0) itype = consumables.BROBREW;
				if (rand(100) == 0) itype = consumables.BIMBOLQ;
			}
			MainScreen.text(itype.longName + ".");
			if (itype == weapons.L__AXE) MainScreen.text("  Holy... how did she drag this thing home!?");
			MainScreen.text("\n\n");
			inventory.takeItem(itype, playerMenu);
			//(set hourssinceKiditem = 0)
			flags[FlagEnum.KID_ITEM_FIND_HOURS] = 0;
		}

//[Give Weapon]
		private giveAnemoneWeapon():void {
			MainScreen.clearText();
			spriteSelect(71);
			MainScreen.text("What do you want to give her?");
			function giveableToAnemone(item:ItemType):boolean {
				return item == consumables.W__BOOK || item == consumables.B__BOOK || item == consumables.W_STICK || item is Weapon;
			}
			menu();
			kGAMECLASS.hideUpDown();
			let foundItem:boolean = false;
			for (let x: number = 0; x < 5; x++) {
				if (player.itemSlots[x].quantity > 0 && giveableToAnemone(player.itemSlots[x].itype)) {
					MainScreen.addButton(x, player.itemSlots[x].itype.shortName + " x" + player.itemSlots[x].quantity, placeInAnemone, x);
					foundItem = true;
				}
			}
			if (!foundItem) MainScreen.text("\n<b>You have no appropriate items to have your offspring hold.</b>");
			MainScreen.addButton(9, "Back", inventory.stash);
		}

		private placeInAnemone(slot: number):void {
			MainScreen.clearText();
			MainScreen.text("You leave the item by her barrel.");
			spriteSelect(71);
			//(set Kidweapon to item name, remove from inventory)
			flags[FlagEnum.ANEMONE_WEAPON_ID] = player.itemSlots[slot].itype.id;
			player.itemSlots[slot].removeOneItem();
			doNext(approachAnemoneBarrel);
		}

//[Take Weapon]
		private takeOutOfAnemone():void
		{
			MainScreen.clearText();
			spriteSelect(71);
			MainScreen.text("You take the item back.  ");
			let itype:ItemType = ItemType.lookupItem(flags[FlagEnum.ANEMONE_WEAPON_ID]);
			if (flags[FlagEnum.ANEMONE_WATCH] > 0) {
				MainScreen.text("Your anemone daughter will not be able to guard you at night without a weapon.  If you want her to guard, you'll need to give her a new weapon and tell her to watch at night again.  ");
				flags[FlagEnum.ANEMONE_WATCH] = 0;
			}
			inventory.takeItem(itype, playerMenu);
			//(add weapon to inventory, then revert Kidweapon to empty)
			flags[FlagEnum.ANEMONE_WEAPON_ID] = 0;
		}

//[N.Watch]
		private anemoneWatchToggle():void
		{
			MainScreen.clearText();
			spriteSelect(71);
			//toggles Kid A's night watch; unusuable unless she's armed
			//if Kid A is unarmed when PC tries to turn on, output:
			if (flags[FlagEnum.ANEMONE_WATCH] > 0) {
				MainScreen.text("You tell Kid A not to worry about guarding at night.  She nods in your direction.");
				flags[FlagEnum.ANEMONE_WATCH] = 0;
			}
			else {
				if (flags[FlagEnum.ANEMONE_WEAPON_ID] == 0) {
					MainScreen.text("You're not really going to set this featherweight against the night barehanded, are you?!  Her hair hasn't even grown out!  You'd better hand her some kind of weapon.");
				}
				else {
					MainScreen.text("Kid A smiles and cheers, \"<i>Guard!</i>\"");
					flags[FlagEnum.ANEMONE_WATCH] = 1;
				}
			}
			doNext(approachAnemoneBarrel);
		}

//[Tutor](only appears if Kid A is armed and present)
		private tutorAnemoneKid():void
		{
			MainScreen.clearText();
			//(if lust > 99, output)
			if (player.lust > 99) {
				MainScreen.text("You're way too horny to focus on any sort of weapon instruction right now, and the anemone can see it in your expression as your gaze wanders over her body; she blushes a deep blue and shrinks into her barrel with a shy glance.");
				doNext(camp.returnToCampUseOneHour);
				return;
			}
			MainScreen.text("The anemone obediently climbs out of her barrel, ");
			//[(KidXP < 33)]
			if (kidAXP() < 33) {
				MainScreen.text("holding " + ItemType.lookupItem(flags[FlagEnum.ANEMONE_WEAPON_ID]).longName + " protectively across her chest.");
			}
			else MainScreen.text("taking up an attentive stance with " + ItemType.lookupItem(flags[FlagEnum.ANEMONE_WEAPON_ID]).longName + " in her hands.");

			MainScreen.text("  You spend some time instructing Kid A in the finer points of the equipment you've provided her with, and then finish up with a practice duel.");

			//duel effects by weapon, output in new PG
			//[Pipe] or [Wizard Staff] or [Eldritch Staff]
			if (flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.PIPE.id ||
					flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.W_STAFF.id ||
					flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.E_STAFF.id) {
				MainScreen.text("\n\nThough she acts like she's not serious and pulls her swings more often than not, the heft of the ");
				if (flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.PIPE.id) MainScreen.text("pipe");
				else MainScreen.text("stick");
				MainScreen.text(" is still enough to bruise you a bit.");
			}
			//(HP - 5, KidXP + 1)
			//[Riding Crop]
			else if (flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.RIDINGC.id) {
				MainScreen.text("\n\nShe seems to enjoy smacking you with the riding crop, making sultry eyes at you and pursing her lips whenever she lands a crack on your [butt] or [chest].  So much so, in fact, that her own penis is betraying her arousal, bobbing in time as she swishes the weapon around.  The humiliation ");
				if (player.stats.lib < 50) MainScreen.text("is");
				else MainScreen.text("isn't");
				MainScreen.text(" enough to keep you from thinking dirty thoughts about grabbing her naughty, teasing face and mashing it into your crotch.");
				//(HP - 5, lust +5 if lib>=50, KidXP + 2)
				HPChange(-5, false);
				if (player.stats.lib >= 50) dynStats("lus", 5, "resisted", false);
				kidAXP(6);
			}
			//[Lust Dagger]
			else if (flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.L_DAGGR.id) {
				MainScreen.text("\n\nThe enchanted dagger is light enough for the anemone to use one-handed, and she makes a good practice of turning aside your mock blows with it while reaching in to stimulate you with her other hand.  For good measure, she nicks you with the blade itself whenever her caress elicits a distracted flush.");
				//(HP -5, lust +10, KidXP + 3)
				HPChange(-5, false);
				dynStats("lus", 10, "resisted", false);
				kidAXP(5);
			}
			//[Beautiful Sword]
			else if (flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.B_SWORD.id) {
				MainScreen.text("\n\nThe sword seems to dance in the air, as though it were the perfect weight and balance for your daughter.  She delivers several playful thrusts at you and though you deflect all but the last, that one slips by your guard.  The girl's eyes widen as the point lunges at your breast, but it delivers barely a scratch before twisting away.");
				MainScreen.text("\n\nPerhaps anemones are a bit too corrupt to use the sword effectively?");
				//(HP -1, KidXP - 2)
				HPChange(-1, false);
				kidAXP(-2);
			}
			//[Jeweled Rapier] or [Raphael's Rapier]
			else if (flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.RRAPIER.id ||
					flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.JRAPIER.id) {
				MainScreen.text("\n\nThe rapier is light enough for the girl, but it takes a multitude of reminders before she handles the slender blade with the care and style it deserves.  She seems to regard it as little more than a tool for thwacking you in the butt that, coincidentally, has a pointy end.");
				//(no effect, señorita)
			}
			//[Large Axe], [Large Hammer], [Large Claymore], or [Huge Warhammer]
			else if (flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.L__AXE.id ||
					flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.L_HAMMR.id ||
					flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.WARHAMR.id ||
					flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.L__AXE.id) {
				MainScreen.text("\n\nShe can barely lift the weapon you've given her, although for a while she does manage to support one end with the ground and tilt it by the haft to ward off your blows with cleverness.  Distracting her by way of a feint, you part her from it and advance with a smile full of playful menace... whereupon she shrieks and pushes you backwards, causing you to trip over the weapon and fall with a crash.");
				//(HP - 5, KidXP - 4)
				kidAXP(-4);
				HPChange(-5, false);
			}
			//[Katana] or [Spellsword]
			else if (flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.KATANA.id ||
					flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.S_BLADE.id) {
				MainScreen.text("\n\nThe light sword and the light anemone seem to be a good match, and she actually manages to make several deft moves with it after your instruction.  One is a bit too deft, as she fails to rein in her swing and delivers a long, drawing cut that connects with your [leg].");
				//(HP - 20, KidXP + 2)
				kidAXP(4);
				HPChange(-20, false);
			}
			//[Spear]
			else if (flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.SPEAR.id) {
				MainScreen.text("\n\nThe natural length of the spear and the anemone racial mindset to get close and communicate by touch don't mesh well; she chokes up well past halfway on the haft despite your repeated instruction and pokes at you from close range with very little force, the idle end of the weapon waggling through the air behind her.");
				//(HP -5, KidXP - 1)
				kidAXP(-1);
				HPChange(-5, false);
			}
			//[Whip] or [Succubi's Whip]
			else if (flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.WHIP.id ||
					flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.SUCWHIP.id) {
				MainScreen.text("\n\nThe whip seems almost like an extension of her hand once she decides its purpose is to tangle things up as opposed to lashing and lacerating flesh.  One of her overzealous swings finds you <i>both</i> tied in its coils; her petite body presses against yours as she colors in embarrassment.  Her distracted struggles to loosen the bonds accomplish little except to rub her sensitive parts along yours.");
				if (flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.SUCWHIP.id) MainScreen.text("  The demonic enchantment chooses then to activate, and her color deepens as her lust peaks, as does your own.");
				MainScreen.text("  You feel a point digging into your groin as her prick hardens and her struggles cease; she begins to moan openly in arousal.  As she relaxes, the coils of the whip finally loosen enough for you to extricate yourself.");
				//(HP -0, lust +10 if normal whip or +20 if succubus, KidXP + 3)
				dynStats("lus", 10, "resisted", false);
				if (flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.SUCWHIP.id) dynStats("lus", 10, "resisted", false);
				kidAXP(6);
			}
			//[Spiked Gauntlets] or [Hooked Gauntlets]
			else if (flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.S_GAUNT.id ||
					flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.H_GAUNT.id) {
				MainScreen.text("\n\nThe anemone wears the gauntlets easily and comfortably, but doesn't seem to understand that to attack she needs to ball up her fists and swing them, no matter how many times you tell her.  The most she manages is to deflect a few of your mock lunges by batting them aside with the metal atop her knuckles.");
				//(no tigereffect)
			}
			//[Wingstick]
			else if (flags[FlagEnum.ANEMONE_WEAPON_ID] == consumables.W_STICK.id) {
				MainScreen.text("\n\nThe girl stares at the stick, still uncomprehending how you intend her to use it.  One last time, you take the weapon from her and make a throwing motion, then return it.  She looks from it back to you once more, then tosses it at your head.  As it impacts with a clunk and your vision jars, she clutches her stomach in laughter.");
				//(HP - 10, set Kidweapon to empty, KidXP + 1)
				HPChange(-10, false);
				flags[FlagEnum.ANEMONE_WEAPON_ID] = 0;
				kidAXP(5);
			}
			//[Dragonshell Shield]
			else if (flags[FlagEnum.ANEMONE_WEAPON_ID] == weapons.DRGNSHL.id) {
				MainScreen.text("\n\nYour protégé takes to the shield quite well, hiding behind it like... well, like a portable water barrel.  Even the way she peeks over the top is reminiscent.  She makes effective use of her cover, pushing forward relentlessly and delivering soft headbutts to spread venom to unprotected areas.");
				//(lust + 5, temp str/spd down, KidXP + 5)
				//str/spd loss reverts after clicking Next button
				kidAXP(5);
				dynStats("lus", 10, "resisted", false);
			}
			//[White Book]
			else if (flags[FlagEnum.ANEMONE_WEAPON_ID] == consumables.W__BOOK.id) {
				MainScreen.text("\n\nPart literacy training and part magic instruction, your progress through the book is painstakingly slow.  After almost an hour of trying to get the anemone to concentrate on the words, she finally manages to cause a small flash of white light on the page in front of her - whereupon she shrieks and drops the book, covering her head with her arms and backing away.");
				//(KidXP - 5)
				kidAXP(-5);
			}
			//[Black Book]
			else if (flags[FlagEnum.ANEMONE_WEAPON_ID] == consumables.B__BOOK.id) {
				MainScreen.text("\n\nThe girl sits attentively with you, resting her head against your arm, as you teach her the words needed to evoke the formulae in the book.  When you suggest she try one out, however, she shakes her head with wide eyes.  Insisting, you stand apart from her and fold your arms.  Blushing a deep blue, the anemone resigns herself to focusing on your crotch as she mouths quiet syllables.  After a few moments, you actually feel a small glow of lust where she's staring.  The girl giggles nervously and looks away as you flush and your garments ");
				if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("tighten");
				else if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text("dampen");
				else MainScreen.text("become a hindrance");
				MainScreen.text("... though the part between her own legs is still pointed at you.");
				//(lust + 10, KidXP + 2)
				dynStats("lus", 20);
				kidAXP(4);
			}
			//[Scarred Blade](NYI)
			else if (9999 == 0) {
				MainScreen.text("\n\nThe anemone attempts to draw the bloodthirsty saber at your insistence, but as she pulls it free of the scabbard, it jerks from her hands, lashing across her thigh before clattering noisily to the ground and spinning away.  Her shock grows as thick, clear fluid seeps from the cut, and she covers her mouth with her hands, looking up at you with piteous, wet eyes.");
				//[(if corr <=70)
				if (player.stats.cor <= 70) MainScreen.text("  The blade's edge flashes toward you as well, when you try to pick it up.  After a few frustrated attempts, it becomes clear that you'll have to abandon it for now.");
				//empty Kidweapon, KidXP - 5; if corr <=70, set sheilacite = 5, else add Scarred Blade to inventory)
				flags[FlagEnum.ANEMONE_WEAPON_ID] = 0;
				kidAXP(-5);
				if (player.stats.cor <= 70) {
					//9999
					//9999
				}
			}
			//[Any new weapon added without text written for it, or any custom item name set by a save editor]
			else {
				MainScreen.text("\n\nFor the life of her, Kid A can't seem to grasp how to use the " + ItemType.lookupItem(flags[FlagEnum.ANEMONE_WEAPON_ID]).longName + " you've provided her with.  You have to interrupt the practice for explanations so many times that you don't actually get to do any sparring.");
				//(no effect, but you can just save edit the values you want anyway)
			}
			//if hp = 0 after tutor, override any other result and output new PG:
			if (player.HP < 1) {
				MainScreen.text("\n\nWith a groan, you fall flat on your back and close your eyes.  As if from far away, you hear ");
				if (flags[FlagEnum.ANEMONE_WEAPON_ID] != weapons.S_GAUNT.id &&
						flags[FlagEnum.ANEMONE_WEAPON_ID] != weapons.H_GAUNT.id) MainScreen.text("the thump of something hitting the ground and ");
				MainScreen.text("the anemone gasp, and then the world slips away from you.");

				MainScreen.text("\n\n<b>Eight hours later...</b>");
				MainScreen.text("\nYour bleary eyes open to a familiar-looking upside-down blue face.  It takes a minute before your brain can reconstruct the events preceding your lapse in consciousness; as soon as your expression gives a hint of understanding, Kid A sheepishly greets you.");
				MainScreen.text("\n\n\"<i>Um... hi.</i>\"");
				//(lose 8 hours, restore HP amount consonant with 8hrs rest)
				doNext(camp.returnToCampUseEightHours);
				player.statusAffects.add(new StatusAffect("PostAnemoneBeatdown", 0, 0, 0, 0)));
				return;
			}
			//Sex scenes, post dream
			if (flags[FlagEnum.HAD_KID_A_DREAM] > 0 && kidAXP() >= 40 && player.lust > 99) {
				if (kidASex()) return;
				//nothing fits
				//if KidXP >= 40 and lust > 99 after tutor and PC has only huge dicks of area >= 60 or hasn't got shit
				else if (kidAXP() >= 40 && player.lust > 99) {
					MainScreen.text("\n\nYou collapse onto your back, panting your arousal into the dry air.  Shyly at first but with increasing confidence as you fail to react, the girl slips a hand into your clothes and down to your crotch.  She stops, wide-eyed, as her fingers initially locate ");
					if (player.lowerBody.cockSpot.hasCock()) MainScreen.text("something too enormous");
					else MainScreen.text("nothing useful");
					MainScreen.text(" to relieve your burden with, then resumes the search with a hint of desperation.  Finally and after exhaustive prodding, she withdraws her hand and chews her lip in consternation.");

					MainScreen.text("\n\nAppearing to reach a decision, she reaches out and pats you apologetically on the head, then stands up and heads back to her barrel.");
					//no effect on lust, pass 1 hour
					doNext(camp.returnToCampUseOneHour);
				}
			}
			//else if no HP or lust outcome triggered: pass 1 hour, gain 40 xp, increment fatigue by 10
			else {
				if (player.level < 10) player.XP += 30;
				fatigue(10);
				doNext(camp.returnToCampUseOneHour);
			}
		}

		private kidASex(cont:boolean = true):boolean
		{
			if (!cont) {
				MainScreen.clearText();
				MainScreen.text("Smiling lustily at Kid A, you run your hand through her hair, inhaling deep breaths as you allow her venom to affect you more and more.  She blushes, but watches eagerly.  Soon, the tingling lust has you overwhelmed...");
			}
			let x: number;
			let y: number;
			//pseudo-virgin vaginal, one time only
			//if KidXP >= 40 and lust > 99 after tutor and PC has wang of area <36 and Kidswag = 2
			if (flags[FlagEnum.ANEMONE_KID] == 2 && player.lowerBody.cockSpot.hasCock() && player.cockThatFits(36) >= 0) {
				x = player.cockThatFits(36);
				MainScreen.text("\n\n");
				MainScreen.text(images.showImage("anemone-kid-male-vagfuck"), false);
				MainScreen.text("You collapse onto your back, panting your arousal into the dry air.  Shyly at first but with increasing confidence as you fail to react, your daughter slips a hand into your clothes and down to your crotch.  She bites her lip and blushes as her hand reaches the neck of your " + Appearance.cockNoun(player.lowerBody.cockSpot.list[x].cockType) + ", then her resolve appears to crystallize as she yanks it free from your " + player.armorName + ". At first, nothing happens and your erect cock just bobs through the empty air, but then you feel soft fingertips guiding it and a warm, tight squeeze at the end of your dick.  Raising your head in surprise, you see the anemone has mounted you!  She blushes and looks away at the eye contact, but her mouth opens in a sly grin as she begins to shift her hips, sliding your " + cockDescript(x) + " deeper into herself.");


				MainScreen.text("\n\nShe flushes and winces as you sink into her, breathing heavily as her pussy stretches and her small cock hardens over you.  Gods, it's so tight; as you look your amazement at her, her eyes twinkle.  She takes in the last of your shaft laboriously and then, relaxing, leans forward and plants a kiss on your chest to answer your unspoken question.  The girl was actually saving her first time for you?  You prop yourself up on your elbow and pull her face into yours, giving her a short kiss; she smiles bashfully and then pulls out of your grip to sit upright with her hands on your stomach.");

				MainScreen.text("\n\nBeginning to move her hips, she stirs herself with your " + Appearance.cockNoun(player.lowerBody.cockSpot.list[x].cockType) + " as she gyrates, loosening herself slightly; you take the opportunity to pull off the top of your " + player.armorName + " eagerly and she answers you by pushing her cock down onto your skin with a hand, smearing its tentacled crown around with her movement and spreading venomous heat to your torso even as she moans and the tip drools on your stomach.  After two minutes of this teasing, she grins again and raises up, pulling your cock partway out; you tense and shut your eyes in expectation of what's to come, but she just hovers there.  Curiously, you open your eyes again and look at her - which seems to be what she was waiting for.  At the first sign of your guard dropping, her eyes glint suspiciously and she begins riding you in earnest, plunging up and down your cock with her incredibly tight pussy; your sensation-swamped body carries you away and you begin pushing back against her as she descends, so that your groins meet each other in the air.  She gasps and smiles open-mouthed with her head back, removing the hand still on your stomach to fondle her breasts as she fucks you senseless.  At the nadir of every bounce, the feelers on her cock and vagina rub against your exposed skin, delivering a fresh load of anemone venom that pushes you closer to orgasm by leaps and bounds.");

				MainScreen.text("\n\nThe girl herself doesn't seem to be faring much better; her left hand is furiously jerking her cock and her right is squeezing her small breasts as she rides, while her mouth hangs open and she makes tiny grunts of pleasure at each stroke.  Predictably, she twitches and sinks down one last time as her pecker spasms and she cries out.  She pushes her little blue shaft down onto your stomach again and rubs it back and forth as she ejaculates on your [chest]; her clenching pussy meanwhile wrings your dick vigorously, sending a shiver down your spine to spark the venom-induced climax that pours from you.  Your hands grasp her hips as your dick empties into the slender blue girl's womb, spitting semen with a furor enhanced by the continuing dose of aphrodisiac from the vaginal feelers stroking its base as she twitches.");
				//[(big skeet)]
				if (player.cumQ() >= 1000) MainScreen.text("  As you pour into her, the sensation of being stuffed with semen sets off a second orgasm in the quivering girl, and her own prick drools weakly onto your stomach");
				if (player.cumQ() >= 2000) MainScreen.text("; even a second orgasm from your daughter isn't enough to match one of yours in length.  Your magnificently productive " + Appearance.cockNoun(player.lowerBody.cockSpot.list[x].cockType) + " fills her until her belly is inflated so far that she can't contain more, and it begins to breach the seal her pussy makes around you, even as tight as it is, to squirt out in lazy globs as you deposit the last of your spunk");
				if (player.cumQ() >= 1000) MainScreen.text(".");
				//[(multi)]
				if (player.lowerBody.cockSpot.count() > 1) {
					MainScreen.text("  The loads from your other shaft");
					if (player.lowerBody.cockSpot.count() > 2) MainScreen.text("s");
					MainScreen.text(" ooze down your [legs], directed there by her weight.");
				}
				MainScreen.text("\n\nSpent, your blue girl slumps down onto your chest, not even bothering to avoid the puddle of her own spunk or pull your cock out, and is quickly asleep.  Your eyes close as sleep overtakes you as well, though the venom trickling into your chest as she rests her head on it ensures the scene will play over and over in your dreams...");
				//pass 2 hr, remove 100 lust and add 30 base lust before resistance, set Kidswag = 3
				player.orgasm();
				dynStats("lus", 30);
				if (flags[FlagEnum.ANEMONE_KID] < 3) flags[FlagEnum.ANEMONE_KID] = 3;
				doNext(camp.returnToCampUseTwoHours);
				return true;
			}
			//sex revisited, for when KidXP >= 40 and confidence is mounting
			//fellatio
			//if KidXP >= 40 and lust > 99 after tutor and PC has wang of area <60, set that cock to x variable, also set biggest cock not yet used to y variable if multicocked
			else if (player.lowerBody.cockSpot.hasCock() && player.cockThatFits(60) >= 0) {
				x = player.cockThatFits(60);
				y = -1;
				temp = 0;
				while (temp < player.lowerBody.cockSpot.count()) {
					if (temp != x) {
						y = temp;
						break;
					}
					temp++;
				}
				MainScreen.text("\n\n");
				MainScreen.text(images.showImage("anemone-kid-male-bj"), false);
				MainScreen.text("You collapse onto your back, panting your arousal into the dry air.  Shyly at first but with increasing confidence as you fail to react, your daughter slips a hand into your clothes and down to your crotch.  She bites her lip and blushes as her hand reaches the neck of your " + Appearance.cockNoun(player.lowerBody.cockSpot.list[x].cockType) + ", then her resolve appears to crystallize as she yanks it free from your " + player.armorName + ".  A sudden wetness at the end of your dick raises your head in surprise; the mop-topped girl is kneeling over you with the crown in her mouth and, as you make eye contact, turns the deepest shade of blue you've ever seen on her.");

				MainScreen.text("\n\nHer embarrassment evidently can't brake her instinct, though, because her mouth continues to work on your " + cockDescript(x) + " even as she casts down her gaze to avoid meeting your own.  As if to conceal herself, her shoulder-length tentacles shift forward to drape over her face, scraping along the end of your dick, right behind the head.  A dose of venom lances through your skin; your eyes roll back and your hips begin to buck gently into her mouth as your reason deserts.");

				//(if multicock, balls, or vag, in order of priority)
				if (y >= 0 || player.lowerBody.balls > 0 || player.lowerBody.vaginaSpot.hasVagina()) {
					MainScreen.text("\n\nYou feel her bashful fingers sneak into your " + player.armorName + " again, and they quickly locate your ");
					if (y >= 0) MainScreen.text(cockDescript(y));
					else if (player.lowerBody.balls > 0) MainScreen.text(sackDescript());
					else if (player.lowerBody.vaginaSpot.hasVagina()) MainScreen.text(vaginaDescript(0));
					//[(if cock or sack)]
					if (y >= 0 || player.lowerBody.balls > 0) MainScreen.text(", pulling it free from your armor as well");
					MainScreen.text(".  Her dextrous digits are emboldened as your head lolls in the dirt, staring skyward, and quickly begin to caress their find.");
					//[(cock)
					if (y >= 0) {
						MainScreen.text("  Another hand quickly joins the first, stroking the length of your second shaft as it ");
						if (player.lowerBody.cockSpot.list[y].cockLength >= 36) MainScreen.text("towers over her head");
						else MainScreen.text("quivers and twitches into her venomous locks");
						MainScreen.text(".  Every time it brushes her hair, another jolt shoots to the base of your spine and both of your cocks force out another glob of precum which is quickly slurped up.");
					}
					//[(sac)
					else if (player.lowerBody.balls > 0) MainScreen.text("  One hand cups below your " + ballsDescript() + " and lifts them up to her chin, where the other, formerly tracing gentle circles along your shaft, grabs a tentacle from her head and begins to tickle.");
					//[(vag)
					else if (player.lowerBody.vaginaSpot.hasVagina()) {
						MainScreen.text("  Her fingers part your labia and reveal your " + clitDescript() + ", ");
						if (player.lowerBody.vaginaSpot.list[0].clitLength >= 6) MainScreen.text("working it free as well and allowing her to tease and stroke it, cock-like, with her hands and hair.");
						else MainScreen.text("in order to give the sensitive button their attention.");
						MainScreen.text("  Her other hand slips into your garments after the first, following it down to your groin and slipping into your pussy to pump back and forth gently.");
					}
				}
				MainScreen.text("\n\nHer attentions on your groin reach a peak as ");
				if (player.lowerBody.balls > 0) MainScreen.text("your balls tighten up");
				else MainScreen.text("your body tenses");
				MainScreen.text("; seeing this, she dives down onto your shaft, forcing the head past the ginger care of lips and tongue into her welcoming throat.  Her hair drapes all around your groin, touching exposed flesh as she shakes her head and undulates her throat to coax out your climax.  Your body reacts before you can, and your hips thrust up into her face as your ejaculate erupts.");
				//[(if multicock or sac)]
				if (player.lowerBody.balls > 0 || y >= 0) {
					MainScreen.text("  As her eyes twinkle, the hands on your ");
					if (y >= 0) MainScreen.text(cockDescript(y));
					else MainScreen.text(sackDescript());
					MainScreen.text(" renew their efforts, squeezing out squirts of semen with measured strokes and squeezes.");
				}
				//[(vag)
				else if (player.lowerBody.vaginaSpot.hasVagina()) {
					MainScreen.text("  As her eyes twinkle, a hand plunges all the way into your pussy, and your lonely muscles clamp down reflexively on the invader, attempting to wring her fingers.");
				}
				MainScreen.text("  She swallows greedily as you unload into her throat");
				if (y >= 0) MainScreen.text(" and onto her hair");
				MainScreen.text(", the oral contractions squeezing the head of your penis and setting your body to shivering.");
				//[(big cum)
				if (player.cumQ() >= 500) {
					MainScreen.text("  Squirt after huge squirt disappears into the starveling's esophagus, sliding without fail down into her belly, until ");
					if (player.cumQ() < 1000) MainScreen.text("your climax is spent.");
					//(mega skeet)
					else MainScreen.text("she can hold no more and it begins to drool from her mouth; still she tries her best to swallow more and more, despite the limits of her body.  Obligingly, you grab her head and hold it to you, venom tingling in your fingertips, as the last half of your orgasm empties into her.  With her face mashed into your crotch and escape cut off, the semen has nowhere to go except down the throat, expanding her taut stomach and pushing her skinny butt into the air as she balloons against your legs.  Her eyes widen and look up at you as the pressure increases, and a hum travels down your prick as she attempts to protest.");
				}
				MainScreen.text("\n\nFinally, you spend the last of your load and go limp; you feel her throat close around your glans as she pulls away, and a small aftershock squirts from the tip.  She licks this away with relish, ");
				if (player.cumQ() < 1000) MainScreen.text("then gets to her feet and returns to her barrel to digest the meal.");
				else MainScreen.text("but can barely move from the spot thanks to the incredible distension of her belly.  She manages to drag herself over to the barrel with a great shuffling of arms and legs but cannot by any means get into it, and settles for slumping beside it to occasionally sprinkle water on herself while she deflates.");
				MainScreen.text("\n\nAs you wearily raise your head to look at her, she blushes again but doesn't avert her eyes; instead they glint salaciously and she answers you with a small grin.");

				MainScreen.text("\n\nYou lay back, spent, and slip from consciousness.");
				//lose 100 lust, pass 2 hr, if Kidswag = 1, set Kidswag = 2
				player.orgasm();
				if (flags[FlagEnum.ANEMONE_KID] == 1) flags[FlagEnum.ANEMONE_KID] = 2;
				doNext(camp.returnToCampUseTwoHours);
				return true;
			}
			//femsex
			//if KidXP >= 40 and lust > 99 after tutor and PC has vag and no cox
			else if (player.lowerBody.vaginaSpot.hasVagina()) {
				MainScreen.text("\n\n");
				MainScreen.text(images.showImage("anemone-kid-female-sex"), false);
				MainScreen.text("You collapse onto your back, panting your arousal into the dry air.  Shyly at first but with increasing confidence as you fail to react, your daughter slips a hand into your clothes and down to your crotch.  She stops, vexed, as her fingers find nothing but your " + vaginaDescript(0) + ", then appears to reach a decision and pulls down the bottoms of your " + player.armorName + ".  Gently, she caresses the labia, eliciting a soft moan from you, then looks up nervously at the sound to check your response.  When you continue staring into the empty sky, she pulls away and you feel hands pushing your legs apart.  Even this isn't enough to stir you from your lust-induced haze, nor is the feeling of having your backside lifted by those same hands.  However, when you feel a persistent, wriggling pressure at the entrance to your inflamed pussy, you begin to return to reality.  Lifting your head to look at the anemone, you see her holding your thighs in the air as she attempts to orient herself to you, utmost concentration lining her features.  She succeeds and slides into you, then looks up to check your face again... and drops your body into her lap as she pulls her hands in front of herself defensively at the sudden scrutiny.");

				MainScreen.text("\n\nLaughable as her reaction is, the venom now coursing through your " + vaginaDescript(0) + " ensures not a giggle escapes you; your hips begin writhing in her lap, trying to find purchase on the blue girl to better pump her shaft for its seed.");
				//[(if pc is loose)
				if (player.vaginas[0].vaginalLooseness >= VAGINA_LOOSENESS.GAPING) MainScreen.text("  You can barely feel her little shaft in your stretched cunt, but the chemical stimulation from the tentacles stroking your insides goes a long way toward making up for that.");
				MainScreen.text("  Emboldened, she picks up your legs haltingly, then begins to work herself in and out of your depths.");

				MainScreen.text("\n\nWith all the grace of a first-timer, the girl clumsily leans down to kiss you, but falls short and can only plant a smooch on your still-clad [chest].  Still, she continues pumping enthusiastically, worry and shame evaporating from her brow as you moan lustily instead of rebuking her temerity.  Pausing to support you with one hand as she spreads your lips wider with her fingers, she exposes your " + clitDescript() + " to the air.");
				//[(clitsize<6)]
				if (player.lowerBody.vaginaSpot.list[0].clitLength < 6) MainScreen.text("  The little button gets rubbed by her probing hand even as she resumes thrusting, accelerating your imminent peaking.");
				else if (player.lowerBody.vaginaSpot.list[0].clitLength < 36) MainScreen.text("  The monstrous chick-stick bobs in the air as she pounds you harder; the breeze alone would be enough to arouse you further, but the anemone grabs it and begins jacking the nerve-laden stalk off like a dick, which sends your back into spasms.");
				else MainScreen.text("  The incredible length of your clitoris is such that the pace of the fuck slows to a crawl as the anemone puzzles out what to do with it; finally falling back on her racial instinct, she pops it into her mouth and begins to caress the tip gently with her teeth and tongue as her short hair reaches around to tickle the shaft.  Your body flops weakly, too wracked by the sensation from your clit to allow conscious control.");

				MainScreen.text("\n\nThough her technique is still nothing to sing praises about, the constant smears of venom coating your pussy with heat do their work industriously, and your orgasm is pried from you by force rather than skill.  Gasping and moaning, you clench down on her rod and your climaxing pussy wrings it for all its worth - which it soon delivers.  She moans in a high-pitched voice as she reclines on her hands and knees, and first one and then a second squirt of cool fluid lands in your overheating cunt.  Her cock continues drooling and trickling her seed even as her elbows fail and she lands on her back.");

				MainScreen.text("\n\nYou pull away from her and stagger to your feet, then redress.  Kid A lies on the ground, already asleep from her exertion; you step over her with a grin.");
				//anemone preg chance, slimefeed, reduce lust by 100, if Kidswag = 1 set Kidswag = 2
				anemonePreg();
				player.slimeFeed();
				player.orgasm();
				if (flags[FlagEnum.ANEMONE_KID] == 1) flags[FlagEnum.ANEMONE_KID] = 2;
				doNext(camp.returnToCampUseEightHours);
				return true;
			}
			return false;
		}

//[Evict]
		private evictANemone():void
		{
			MainScreen.clearText();
			MainScreen.text("Really evict the anemone?");
			spriteSelect(71);
			//[Yes][No]
			doYesNo(reallyEvictDaAnemone, approachAnemoneBarrel);
		}

//Yes]
		private reallyEvictDaAnemone():void
		{
			MainScreen.clearText();
			spriteSelect(71);
			MainScreen.text("Time to reclaim your barrel.  Gesturing to get her attention, you grab the anemone by her upper arm and lift her to her feet.  She looks at you in confusion, but you set your face and drag her along with you as you make your way to the lake.");
			MainScreen.text("\n\nReaching the shore, you push Kid A into the water and point out toward the center of the lake as she falls to her knees in the surf.  She looks absolutely miserable... until a green and purple swirl bobs to the surface next to her.  The new arrival greets your former tenant with cheer, squeezing her waist from behind and eliciting a gasp of surprise.");
			MainScreen.text("\n\nKid A turns her head to face the stranger.  \"<i>Um... hi?</i>\" she offers, hesitantly.");
			MainScreen.text("\n\n\"<i>Um... hi!</i>\" the other parrots, a grin splitting her face wide open.");
			MainScreen.text("\"<i>Um... hi!</i>\" your anemone returns, enthusiastically this time, as she answers the physical contact by tugging one of the newcomer's tentacles.");
			MainScreen.text("\n\nThe two girls continue to greet each other in this fashion as their attention shifts away from you, and you wonder exactly what kind of pernicious meme you've inflicted on the anemone community.");
			//set Kidswag to -1, pass 1 hour
			flags[FlagEnum.ANEMONE_KID] = -1;
			doNext(camp.returnToCampUseOneHour);
		}

//dreams: possible once KidXP >= 40; function as visible notice of sex-readiness
//if KidXP drops below threshold for sex due to bad training, no more dreams and no more sex
		public kidADreams():void
		{
			MainScreen.text("\n<b><u>In the middle of the night...</u></b>");
			//if male:
			if (player.lowerBody.cockSpot.hasCock() && (!player.lowerBody.vaginaSpot.hasVagina() || player.femininity < 50)) {
				MainScreen.text(images.showImage("anemone-kid-male-masti"), false);
				MainScreen.text("\nThe church bell chimes overhead as you regard the figure opposite you.  Your family chose this woman and arranged this marriage, true, but it's not fair to say you're not at least a little interested in the svelte, veiled form inhabiting the wedding dress your mother handed down to her.");
				MainScreen.text("\n\nThe pastor coughs politely.  \"<i>Well... do you?  Take this woman?</i>\"");

				MainScreen.text("\n\nYou nod absently, still staring at your bride.  The pastor repeats his question to her and she nods as well, staring at you in like fashion.");

				MainScreen.text("\n\n\"<i>In that case, I pronounce you man and wife.  You may kiss the bride.</i>\"");

				MainScreen.text("\n\nYou raise your hands to lift the veil but your bride captures them shyly, tracing little circles on your palms with her gloved thumbs, and begins to pull you down the aisle toward the doors, provoking a giggle from the assembled witnesses.  She drags you eagerly through the archway and through the streets to the little cottage your parents helped you build in preparation for your new life, only stopping outside.  With one hand on her veil and the other in yours, she pulls close and allows you to lift her in your arms; she is amazingly light as she wraps her arms around your neck, nuzzling your chest happily.  You carry your queer spouse through the house and into the bedroom; as you set her carefully on the bed, running your hands along her body, a small bulge begins to form in her crotch, poking up the folds of the white dress.  Clambering atop her to lift the veil unobstructed, she grinds her crotch into yours and begins moaning softly - you can feel your cock hardening as your affectionate stranger pushes her sex into yours, depositing little smears of her precum that seep through your mother's wedding dress into a growing dark spot.  Taking hold of the veil, you hold your breath and raise it...");

				MainScreen.text("\n\nA sapphire face looks back at you.  Through opaque eyes she somehow still manages to express more adoration than you've known most of your life.  Placing a hand alongside your ");
				if (player.isTaur()) MainScreen.text("thigh");
				else MainScreen.text("cheek");
				MainScreen.text(", she leans in to kiss you, softly whispering your name over and over.  \"<i>[name]... [name]...</i>\"");

				MainScreen.text("\n\nYour eyes snap open suddenly to see the ubiquitous red moon overhead.  A ");
				if (!player.isTaur()) MainScreen.text("soft hand strokes your face and a ");
				MainScreen.text("slight weight rests against your crotch; as you look down, your anemone is there with her pussy pressed to the erection bulging under your gear, frozen in mid-rub and blushing to the point that you can barely make her out.");

				MainScreen.text("\n\n\"<i>Um... hi?</i>\"  She slowly backs away into the night, leaving you to try to sleep with your awakened libido.");
			}
			//if female:
			else {
				MainScreen.text(images.showImage("anemone-kid-female-masti"), false);
				MainScreen.text("\nThe elder's son must be behind the schoolhouse again.  You've noticed him going back there several days this week.  Quietly, you slip from behind your desk and exit the little two-room school.  Sure, he might be old enough to be working the fields by now, but that's no excuse to slack off during his final studies.");
				MainScreen.text("\n\nAs you draw up to the corner, you can hear his voice raised in soft, girlish gasps.  Peering around carefully, you find him sitting on the ground with his shoulder to the wall, turned away from you; over that shoulder, the little blue head of his cock is clearly visible above his clenched fist.  He continues jerking off, unaware of your presence, and as you look on, you marvel at how much thinner and more feminine this hunched figure compared to the dashing, popular boy from your memory.");
				MainScreen.text("\n\n\"<i>[name]!</i>\" he peals suddenly, stroking with vigor at his thoughts of you.  Startled and perhaps a bit flattered, you take a half-step back, and the noise brings his attention around.  In surprise, he half-turns and half-falls to face you, wide opaque eyes looking out of an alarmingly blue face in shock as his little dick twitches and spurts a string of goo toward your lap.");
				MainScreen.text("\n\nThe bizarre sight of your classmate turned sapphire wakes you, and you sit up suddenly.  Blinking twice, you look to your left to discover your anemone, weakly stroking her deflating cock and sighing in satisfaction.  As her eyes catch yours, she freezes up; a wet smell draws your attention downward to where a line of semen decorates your thigh.  The blue girl blushes furiously");
				if (player.stats.cor >= 66) MainScreen.text(" and, with a sigh, you grab her head and force it down to the mess, compelling her to lick it up.");
				else MainScreen.text(" and neither of you says a word as she backs away slowly on her knees.");
				MainScreen.text("  Sighing, you turn over and attempt to return to sleep despite the pervading smell of semen.");
			}
			dynStats("lus", 50 + player.stats.sens / 2, "resisted", false);
			doNext(playerMenu);
		}

//Kid-and-kid interaction scenes:
//Cows one-time scene(plays the first time Kidswag > 0, Kidweapon is populated, and PC has 5+ delicious well-Marbled steak children)
//set Kidsitter flag = 1; 'unlocks' repeat babysitting, making Kid A unavailable with a 25% chance during daylight hours
		public kidABabysitsCows():void
		{
			MainScreen.text("\n<b>\"<i>Come on, get out of your little hole and help!</i>\"</b>");
			MainScreen.text("\n\nThe sound of a voice being raised in frustration turns your head.  Marble is standing in front of your occupied water barrel with several of your rambunctious children in tow, berating the anemone cornered inside.  You advance a few feet and the blue girl turns toward you beseechingly, but Marble starts talking again before you're close enough to say anything.");

			MainScreen.text("\n\n\"<i>...no idea why you're so shy and immature,</i>\" the cow-girl continues, no less insistent for her quieter tone.  \"<i>You're almost two feet taller than any of these kids, so why don't you stop acting like one and behave like an adult?  There's work to be done around here and not enough hands to do it!</i>\"");

			MainScreen.text("\n\nMarble takes a horse-stance, awaiting an answer; the anemone considers unhappily for several minutes, then climbs out of the barrel.  Satisfied, Marble turns and herds her children off.  Kid A initially plods along in her wake, but after a moment's consideration, returns to the barrel and grabs her " + ItemType.lookupItem(flags[FlagEnum.ANEMONE_WEAPON_ID]).longName + " before reluctantly joining the others in the open pasture.");

			MainScreen.text("\n\n\"<i>Alright,</i>\" Marble says, as the anemone draws up to her from the rear.  The larger woman turns to face the blue girl.  \"<i>You're going to watch these kids while I sit here and patch some holes in their... why did you bring that to babysit?!</i>\"");

			MainScreen.text("\n\nThe anemone holds her armament closer to her chest and points at the cow-girl's ever-present hammer.");

			MainScreen.text("\n\n\"<i>That's different!  I need my weapon if some horde of monsters invades my home and accosts me!</i>\" Marble exclaims.  Kid A pauses in thought, glances at the unruly brood, then nods in careful agreement.");

			MainScreen.text("\n\nHuffing, Marble seats herself on a flat stone and removes some torn childrens' clothing from a pouch, along with a crude needle and some sinew.  \"<i>Whatever.  Don't bring it next time.</i>\"  She turns to her assembled rabble as the anemone absorbs the implications of 'next time'.");

			MainScreen.text("\n\n\"<i>The blue barbarian here will take care of you while I sew up your overalls.  You behave, now.</i>\"  No sooner is the admonition out than one cow kid grabs the anemone by the hand and pulls her away, good behavior clearly the furthest thing from mind.\n");
			flags[FlagEnum.KID_SITTER] = 1;
		}

//Cow repeat
//triggered when PC selects the Kids option in Marble menu while Kid A is babysitting
		public repeatCowSitting():void
		{
			MainScreen.text("Marble looks up from her work and regards you warmly.  \"<i>I appreciate the offer, [name].  I've already got someone on it, but if you want to go help, I'm sure there's something you could do.</i>\"  She gestures in a direction over your shoulder.");

			MainScreen.text("\n\nTurning that way, you walk along her line of sight to discover your brood, who are currently tormenting your anemone.  Kid A is trying to keep one from throwing small rocks at another, while a third is following her, tugging on her hand and constantly begging her to read a tattered book aloud.  Seeing the most obvious way to help out the nearly-mute anemone, you intercept this last kid, taking her hand and steering her away.  Kid A manages a glance at you before her attention is pulled back to the hellion with the stones.");

			MainScreen.text("\n\nThe picture book is old and, judging by the little canid hero in the faded illustrations, probably belonged to Whitney once before it was graciously donated to your family.  You go through the tale, mustering suspense and amazement where appropriate; judging by the not-quite-shocked reaction from your daughter, she's heard this story several times already.  Nonetheless, she demands you read it again when you finish, and you do so, doubling the emotion you put into the words; your daughter giggles and shrieks when you pretend to be the storybook monster and flip her upside-down, blowing a raspberry on her tummy under the pretext of taking a bite out of her with your 'gnashing fangs'.");

			MainScreen.text("\n\nIt's not long before Marble comes to find you.  \"<i>I'm all done with my chores.  Have you been behaving for [name]?</i>\"");

			MainScreen.text("\n\n\"<i>Yes, mummy,</i>\" your daughter answers.  \"<i>I let " + player.mf("him", "her") + " eat me right up.</i>\"  Laughing, Marble leads the little girl off and you make your way back.  Kid A is dragging herself to her water barrel, looking at the ground in a frazzle.  As you pass by, she makes unblinking eye contact for a long time, then eventually acknowledges you with a curt nod.");

			MainScreen.text("\n\n\"<i>...Sweetie.</i>\"");
		}


//Sharks (get the fuck in the boat)
//repeatable, trigger possible when visiting 2+ Izma kids
		public kidAWatchesSharks():void
		{
			MainScreen.clearText();
			MainScreen.text("As you look over your shark family playing in the shallow stream, a soft, wet footstep sounds behind you.  Kid A is there when you turn around, holding empty waterskins and looking desperately at the running water.");
			//[(KidXP < 40 or Kidweapon is empty)
			if (kidAXP() < 40 || flags[FlagEnum.ANEMONE_WEAPON_ID] == 0) MainScreen.text("\n\nThe sharks notice as well and stand up, baring their teeth in wide, unwelcoming smiles.  Kid A whimpers and shuffles behind you, placing her hands on your back and attempting to push you in front of her.  Your shark-daughters watch in amusement as she tries to maneuver close enough to fill her waterskins while still using you as cover.  Awkwardly, she manages to cap them off and then departs as fast as she can.");

			//(else KidXP < 75 and Kidweapon = White Book or Black Book)
			else if (kidAXP() < 40 && (flags[FlagEnum.ANEMONE_WEAPON_ID] == consumables.B__BOOK.id || flags[FlagEnum.ANEMONE_WEAPON_ID] == consumables.W__BOOK.id)) {
				MainScreen.text("\n\nThe anemone watches carefully for a bit, then hangs the skins over her shoulders and opens her book.  Focusing on the few words she can understand, she gestures toward the shark family and ");
				if (flags[FlagEnum.ANEMONE_WEAPON_ID] == consumables.W__BOOK.id) MainScreen.text("blinds them with a sudden flash of white light");
				else MainScreen.text("turns deep blue as the various shark-girls clap their thighs together and look away from one another in embarrassment");
				MainScreen.text(".  Before any of them can react, she dives into the water and fills the waterskins, then hightails it away.");
			}
			//(else KidXP < 75)
			else if (kidAXP() < 75) {
				MainScreen.text("\n\nThe sharks look up from their play, baring teeth at the anemone.  She steels herself, then holds her " + ItemType.lookupItem(flags[FlagEnum.ANEMONE_WEAPON_ID]).longName + " menacingly in front of her as best she can while she steps into the stream and fills her waterskins.  Occasionally one of the shark-girls will feint at the anemone, who accordingly turns the weapon toward the aggressor until she retreats.  Once the skins are filled, Kid A hangs them over her shoulders and backs away, still facing the sharks with her weapon out.");
			}
			//(else)
			else MainScreen.text("\n\nThe anemone doesn't hesitate, but bursts into the middle of the shark-girls like a bomb, shrieking and making huge splashes, scattering them in multiple directions.  She quickly scoops up both skins' worth of water and then runs, giggling giddily with the shark-girls dogging her heels until she's halfway back to camp.");
			doNext(camp.returnToCampUseOneHour);
		}


//goblins at night:
//req PC cocks > 0, Kid A watch on, and Tamani daughters encounter unlocked
//repeatable for now, but semi-rare
		public goblinNightAnemone():void
		{
			MainScreen.text("\n<b>That night...</b>");
			MainScreen.text("\nA noisy clump of gabbling green in the distance awakens you and attracts your attention.  As it draws closer to your camp, you can make out tufts of shockingly-colored hair atop it, and then distinct shapes.  The blot on the landscape resolves into a glob of goblins, clearly intent on reaching your camp's perimeter.  Your anemone notices as well, and, attempting to fulfill the terms of her lease, picks up her " + ItemType.lookupItem(flags[FlagEnum.ANEMONE_WEAPON_ID]).longName + " and moves to intercept them.  You follow at a good distance and tuck yourself behind some cover, already suspecting the identities of the invaders.");

			MainScreen.text("\n\nThe goblins slow up and then stop as the anemone plants herself in their way.  The two sides size one another up for a minute, and then the glob parts to reveal its largest member.");

			MainScreen.text("\n\n\"<i>Move it, blue bitch,</i>\" she demands.  \"<i>Tammi said to keep watch for a ");
			if (player.tallness > 48) MainScreen.text("tall");
			else MainScreen.text("short");
			MainScreen.text(", " + player.mf("studly", "gorgeous") + " " + player.race() + "; told us that " + player.mf("he", "she") + "'d be able to knock us all up like " + player.mf("he", "she") + " did her, and a few of the little goblin tramps outside the family have seen one in this camp.  We're going to get our babies.</i>\"  Kid A remains silent, but shakes her head uncertainly, holding her equipment closer to her chest.");

			MainScreen.text("\n\nThe goblin looks a little surprised.  \"<i>What do you mean, getting in our way?  I'll warn you once; step aside and let us search that camp for baby batter, or I will make you regret it.</i>\"  She considers the anemone irately, then gestures to her entourage and adds, \"<i>I'd have these cunts ride your sad little willy silly to punish you for being such a slag, but we can't get goblins out of you people - only more blue bitches.</i>\"");

			MainScreen.text("\n\nThough you can't see Kid A's expression from behind, she's probably steeling her face into as stern a mask as she's capable of, judging by the way she assumes an aggressive stance - albeit one that's still trying to protect her body as much as possible with " + ItemType.lookupItem(flags[FlagEnum.ANEMONE_WEAPON_ID]).longName + ".  As the anemone takes a step forward, the goblins all take a step back, except for the leader.  The two are now staring at each other; one looking up, the other down.");

			MainScreen.text("\n\n\"<i>Well, we got a blue badass here,</i>\" the goblin says, raising her hands in a gesture of mock wariness.  Before anyone can react, she reaches behind her back and grabs a phial fastened there, throwing it overhand at the anemone with a grunt.  It crashes into Kid A's shoulder and shatters, dousing one gill and the side of her chest in green liquid.  The blue girl glances down at it as the goblin laughs in triumph.");

			MainScreen.text("\n\n\"<i>How do you like that, you... you... you don't feel sick?  Like, at all?</i>\"  The goblin spokeswoman is taken briefly aback as the anemone carefully brushes the glass shards from her skin, apparently none the worse for her poisoning.  Kid A looks up again, resuming her staring match with the goblin, and the glob fans out into a wary half-circle behind her, giving the two a wide berth.");

			MainScreen.text("\n\n\"<i>Listen, missy,</i>\" the lone goblin continues, visibly shaken.  \"<i>Get out of the way now or... or I'll... f-fuckin' punch your shit!</i>\"  The goblin draws back an obvious haymaker and, when her opponent doesn't move, lets fly right into Kid A, who takes it in the stomach with what is probably wide-eyed curiosity.  The goblin's fist pulls back and her eyes bug out as the anemone's elastic cuticle rebounds into shape; almost in unison, the glob takes another step backward.  Kid A looks up again and the spokesgoblin stammers as she backpedals.");

			MainScreen.text("\n\n\"<i>Don't think this is over, you blue freak!</i>\" she shouts, turning away.  \"<i>We'll be back!  Let's go, you greedy bitches.</i>\"  With much grumbling, the glob forms up around her and begins to move off.  Kid A watches them go for a while, then turns back to you, her face the picture of confusion.  You smile gratefully and head back to bed.\n");
		}


		/*
		 TF item - shriveled tentacle
		 tooltip: A dried tentacle from one of the lake anemones.  It's probably edible, but the stingers are still a little active.

		 use effects: toughness up 1 and speed/str down 1 when consumed; corruption increases by 1 up to low threshold (~20); always increases lust by a function of sensitivity; may cause physical change

		 physical changes:
		 - may randomly remove bee abdomen, if present; always checks and does so when any changes to hair might happen
		 "As the gentle tingling of the tentacle's remaining venom spreads through your body, it begins to collect and intensify above the crack of your butt.  Looking back, you notice your abdomen shivering and contracting; with a snap, the chitinous appendage parts smoothly from your backside and falls to the ground.  <b>You no longer have a bee abdomen!</b>

		 -may randomly remove bee wings:
		 "Your wings twitch and flap involuntarily.  You crane your neck to look at them as best you are able; from what you can see, they seem to be shriveling and curling up.  They're starting to look a lot like they did when they first popped out, wet and new.  <b>As you watch, they shrivel all the way, then recede back into your body.</b>"

		 -[aphotic] skin tone (blue-black)
		 "You absently bite down on the last of the tentacle, then pull your hand away, wincing in pain.  How did you bite your finger so hard?  Looking down, the answer becomes obvious; <b>your hand, along with the rest of your skin, is now the same aphotic color as the dormant tentacle was!</b>"

		 -feathery gills sprout from chest and drape sensually over nipples (cumulative swimming power boost with fin, if swimming is implemented)
		 "You feel a pressure in your lower esophageal region and pull your garments down to check the area.  <b>Before your eyes a pair of feathery gills start to push out of the center of your chest, just below your neckline, parting sideways and draping over your " + nippleDescript(0) + "s.</b>  They feel a bit uncomfortable in the open air at first, but soon a thin film of mucus covers them and you hardly notice anything at all.  You redress carefully."
		 Appearance Screen: "A pair of feathery gills is growing out just below your neck, spreading out horizontally and draping down your chest.  They allow you to stay in the water for quite a long time."

		 -hair morphs to anemone tentacles, retains color, hair shrinks back to med-short('shaggy') and stops growing, lengthening treatments don't work and goblins won't cut it, but more anemone items can lengthen it one level at a time
		 "Your balance slides way off and you plop down on the ground as mass concentrates on your head.  Reaching up, you give a little shriek as you feel a disturbingly thick, squirming thing where your hair should be.  Pulling it down in front of your eyes, you notice it's still attached to your head; what's more it's the same color as your hair used to be.  <b>You now have squirming tentacles in place of hair!</b>  As you gaze at it a gentle heat starts to suffuse your hand.  The tentacles must be developing their characteristic stingers!  You quickly let go; you'll have to take care to keep them from rubbing on your skin at all hours.  On the other hand, they're quite short and you find you can now flex and extend them as you would any other muscle, so that shouldn't be too hard.  You settle on a daring, windswept look for now.

		 (Your hair has stopped growing.)"
		 (reset hair to 'shaggy', add tentacle hair status, stop hair growth)

		 -asking for a lengthening treatment with tentacle hair:
		 Lynnette looks dubiously at you when you ask for a lengthening treatment.  <i>"No offense hon, but that stuff is basically like an arm or an organ, not hair.  I'm not a goblin chirurgeon, and I wouldn't try to lengthen it even if one of my disobedient daughters were here to donate some parts.  Sorry to make you shoot and scoot, but I can't help you.  Try checking with whoever you caught it from."</i>

		 -trying to get a goblin to cut tentacle hair:
		 Lynnette stares at you when you ask for a cut.  <i>"Nothing doing, hon; that stuff looks alive and I don't want blood all over my nice floor.  Thanks for the contributing to the white file, though; maybe we can do something nice for you next time?"</i>

		 -eat more, grow more 'hair':
		 As you laboriously chew the rubbery dried anemone, your head begins to feel heavier.  Using your newfound control, you snake one of your own tentacles forward; holding it out where you can see it, the first thing you notice is that it appears quite a bit longer.  <b>Your hair is now [old length + 1 level]!</b>
		 (add one level of hairlength)

		 -sting with hair (combines both bee-sting effects, but weaker than either one separately):
		 "You rush " + monster.short + ", whipping your hair around like a genie, and manage to land a few swipes with your tentacles.  As the venom infiltrates " + monster.pronoun3 + " body, " + monster.pronoun1 + " twitches and begins to move more slowly, hampered half by paralysis and half by arousal."
		 (decrease speed/str, increase lust)

		 -miss a sting
		 "You rush " + monster.short + ", whipping your hair around to catch it with your tentacles, but " + monster.pronoun1 + " easily dodges.  Oy, you hope you didn't just give yourself whiplash."

		 -venom capacity determined by hair length, 2-3 stings per level of length

		 -generic hp boost if no other consumption effect


		 bee item corrolary:
		 -insert anemone hair removal into them under whatever criteria you like, though hair removal should precede abdomen growth; here's some sample text:
		 "As you down the sticky-sweet honey, your head begins to feel heavier.  Reaching up, you notice your tentacles becoming soft and somewhat fibrous.  Pulling one down reveals that it feels and smells like the honey you just ate; you watch as it dissolves into many thin strands coated in the sugary syrup.  <b>Your hair is back to normal (well, once you wash the honey out)!</b>"
		 (removes tentacle hair status, restarts hair growth if not prevented by reptile status)


		 to do, if interest merits:
		 -scene where anemones and slimes are established as natural opponents, with slimes feeding off anemones they can catch by surprise and vice versa
		 -may eventually unlock hairjob scenes with the PC using the venom in sex/masturbation; very long hair allowing hairjob and regular sex at same time
		 -minor cosmetic changes to vag one day if code allows

		 */

	}
}
