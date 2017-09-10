﻿package classes.Scenes.Places.TelAdre {
	import classes.*;
	import classes.GlobalFlags.FlagEnum;

	public class Maddie extends TelAdreAbstractContent {
public Maddie(){

}
//VARS
// 240- first time meeting procced? 1 yes
// 241- mino explained what he needs yet?
// 242- baking happaned?  1 = yes, -1 = snuck out, -2 = seen her escorted out
	//, 3 =stayed, 4 = epilogue'ed
//[Bakery One Off – Madeleine's Creation]
internal function procMaddieOneIntro():void {
	Render.text("", true);
	if(flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00240] == 0) {
		Render.text("You enter the bakery, savoring the sweet smells of sugar and baked goods.  A burly, hairy figure steps up beside you and places a strong hand on your shoulder.   The gravelly voice of the stranger says, \"<i>You ain't from around here.  Come.  I need your help.  Show you something.</i>\"  You turn to look, and are quite surprised when you see the horned visage of a minotaur ", false);
		if(player.tallness < 72) Render.text("looking down at", false);
		else if(player.tallness < 100) Render.text("staring levelly at", false);
		else Render.text("glaring up at", false);
		Render.text(" you. It releases your shoulder and starts walking towards an 'employees only' door.  Do you follow?\n\n", false);
		flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00240] = 1;
	}
	//(REPEAT) 
	else {
		Render.text("You walk into the bakery and a burly, hair-covered arm grabs your shoulder.  The familiar voice of a minotaur barks, \"<i>You.  You can help.  Come.</i>\"  You turn, but he's already walking towards an 'employees only' door.  Do you follow?", false);
	}
	doYesNo(followMinotaurIntoBackroom,telAdre.bakeryScene.bakeryuuuuuu);
}
//[Follow] 
private followMinotaurIntoBackroom():void {
	Render.text("", true);
	//	(Not yet explained) 
	if(flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00241] == 0) {
		Render.text("You follow the burly beast through the door, turning several times as he leads you through the blisteringly hot ovens.  The minotaur is sweating heavily by the time you reach his destination, and for that matter so are you.  With all the musk boiling off of him, you find yourself wondering if he was just setting up an elaborate ruse to lure you into a sexual situation.  He grabs a white, fluffy hat and drops it on his head, firmly dispelling that notion as he tries to explain in as few words as possible, \"<i>I am cook.  I make great éclairs, but making masterpiece now.  Need special ingredients.  You get to leave city.  Bring me lust draft and honey.  Not pure stuff, too strong. Go.</i>\"\n\n", false);
		Render.text("You get a chance to look over his work station, noting the many bowls of batter, hundreds of massive eclairs, and the largest onahole you've ever seen.  ", false);
		if(player.perks.has("MinotaurCumAddict")) Render.text("You lick your lips when you realize you're meeting the source of the 'special' éclairs.", false);
		else Render.text("You blush when you realize what he must be using for cream filling.", false);
		//[Give Them] [Leave]
		if (player.hasItem(consumables.BEEHONY) && player.hasItem(consumables.L_DRAFT))
			simpleChoices("Give Them", handOverIngredientsItBeBakingTimeYo, "", null, "", null, "", null, "Leave", nopeAintGotNoneODemSpeculIngredimathings);
		else simpleChoices("", null, "", null, "", null, "", null, "Leave", camp.returnToCampUseOneHour);
		flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00241] = 1;
	}
	//(Explained) 
	else {
		Render.text("You follow the burly chef through the door, winding through the familiar ovens.  By the time you reach his work area, you're both covered in a fine sheen of sweat and you find yourself responding to the minotaur musk unconsciously.  The strange chef turns to ask, \"<i>You have special ingredients now, yes?</i>\"", false);
		//[Yes] [Lie – No/Not Yet]
		if (player.hasItem(consumables.BEEHONY) && player.hasItem(consumables.L_DRAFT))
			simpleChoices("Yes", handOverIngredientsItBeBakingTimeYo, "Lie - No", nopeAintGotNoneODemSpeculIngredimathings, "", null, "", null, "", null);
		else simpleChoices("No", nopeAintGotNoneODemSpeculIngredimathings, "", null, "", null, "", null, "", null);
	}
}

//[Not Yet/No]
public nopeAintGotNoneODemSpeculIngredimathings():void {
	Render.text("", true);
	Render.text("The chef sighs and slams a fist into the counter hard enough to dent the metal and throw the bowls full of dough inches into the air.  A number of empty éclairs bounce and roll everywhere.  The minotaur looks back at you and snorts, \"<i>Best you go.  Don't come without ingredients.</i>\"\n\n", false);
	
	Render.text("Well, no point in ", false);
	if(player.stats.cor > 50) Render.text("starting a fight inside Tel'Adre", false);
	else Render.text("overstaying your welcome", false);
	Render.text(" – you depart.", false);
	doNext(telAdre.bakeryScene.bakeryuuuuuu);
}
//[Yes – baking]
public handOverIngredientsItBeBakingTimeYo():void {
	Render.text("", true);
	player.consumeItem(consumables.BEEHONY);
	player.consumeItem(consumables.L_DRAFT);
	Render.text("You hand the lust draft and bottled honey to the minotaur, doing your best to ignore his potent, lust-inducing pheromones as you watch him work.  He grabs the batch of dough he had been kneading and pours in the lust draft, snorting aggressively once the bubbling drug's smell reaches his bovine nostrils.  Next, the bull-like chef reaches over to grab a bottle marked 'P.S.M.', uncorking and pouring it in one practiced motion.   The white fluid froths dangerously on contact with the pink lust draft, and a second later the honey is in there too.  Finally, he flips up his loincloth and reaches for the onahole.\n\n", false);
	
	Render.text("The sex-toy drips with lubricant and twists in the minotaur's hands, indicating magical enhancement or goblin manufacture.  He slides in, sighing as his four, basketball-sized testes pull close to his body, twitching.  Two quick pumps later, he's howling, hips twitching as spurts of white leak from the onahole into the bowl.  With remarkable restraint, he stops himself after adding a cup of spunk, even though his balls are still huge and quivering.", false);
	if(player.perks.has("MinotaurCumAddict")) Render.text("  You lurch forward involuntarily, craving the rest of his jism, but he pushes you into the wall and grunts, \"<i>No,</i>\" in a tone that brooks no disagreement.  It actually shocks you out of your addicted haze.", false);
	Render.text("\n\n", false);
	
	Render.text("Grabbing a whisk, the bull-man starts stirring the sex-filled dough with vigor, mixing the thickening blend hard enough to make his biceps ripple.  A moment later, he lifts the bowl one-handed and pulls out a giant, novelty cupcake mold from the counter. After filling the mold, the chef throws it onto his burly shoulder and grabs a sack of actual icing.  A terse grunt instructs, \"<i>Wait at tables.  You can try some when done.</i>\"  ", false);
	if(player.perks.has("MinotaurCumAddict")) Render.text("  Your mouth salivates at the thought.", false);
	else Render.text("You aren't sure you want to.", false);
	Render.text("\n\n", false);
	if(player.perks.has("MinotaurCumAddict")) doNext(waitForSlutCake);
	//[Wait] [Sneak Out]
	else simpleChoices("Wait", waitForSlutCake, "Sneak Out", sneakAwayFromMaddie, "", null, "", null, "", null);
}
	
//[Sneak Out]
private sneakAwayFromMaddie():void {
	Render.text("", true);
	Render.text("You get out before he can find you again.  Whatever he's making is nothing you ever want to taste.", false);
	//(No more mino chef)
	flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00242] = -2;
	doNext(camp.returnToCampUseOneHour);
}
//[Wait/Next]
private waitForSlutCake():void {
	spriteSelect(39);
	Render.text("", true);
	Render.text("You walk back into the bakery proper, feeling more than a little ", false);
	if(player.stats.cor < 33) Render.text("antsy", false);
	else if(player.stats.cor < 66) Render.text("nervous about this whole thing", false);
	else Render.text("intrigued by this whole thing", false);
	Render.text(".  One of the waitresses brings you a glass of milk, and ", false);
	if(player.stats.cor < 50) Render.text("it smells normal enough, so you go ahead and sip on it", false);
	else Render.text("you sip on it while you wait", false);
	Render.text(".  After what feels like an eternity, you get sick of waiting and push through the door into the bakery's backrooms to see what the hold-up is.  The minotaur isn't at his usual workstation, and doesn't look to have been there in quite some time.\n\n", false);
	
	Render.text("Where could he have gone?  You backtrack through the ovens, looking down side-paths and searching through the labyrinthine storage rooms.  Just when you're about to give up, you hear an airy, light-headed giggle from the next room.  You peek around the corner and gasp in absolute shock.  The minotaur is pinned to the wall, his wrists stuck in place by what looks like hardened, white icing.   On top of him is the strangest - no, ONLY, cupcake-woman you've ever seen.\n\n", false);
	
	Render.text("She's taller than the imprisoned minotaur, and wider too.  The pastry-girl's skin is slightly porous, colored light chocolate and gleaming in the dim light where it isn't covered by shining, blue-iced 'clothes'.  Her hair is white as whipped cream, and tied back with a cinnamon bun.  Her curvaceous form turns, jiggling ever so slightly as she takes you in with her green, gum-drop eyes and revealing her whipped-cream bra.  The novelty cup-cake mold is balanced atop her head, worn like a comparatively tiny fez.\n\n", false);
	
	Render.text("The minotaur chef is still wearing his poofy hat, but he's pinned completely and irrevocably under this baked behemoth as she bounces and grinds on his convulsing member.  While you watch, his balls shrink smaller and smaller, emptying their pent up, steamy cargo directly into the cupcake's soft, cushiony center.  She grows larger from the sudden intake of fresh jism, giggling as she drains every drop from her creator.  \"<i>Tee-hee!  Mmm, you're like, delicious and stuff, creat- cr... dad!  So sticky and yummy, just like me!</i>\" exclaims the fluffy slut-cake.\n\n", false);
	
	Render.text("Utterly shocked and drained, the chef-o-taur's eyes roll back in his sockets.  He slumps weakly under his creation as she bounces a few last times, futilely trying to squeeze more cum from the slumping minotaur-dick.  The cupcake-girl rises at last, not with yeast, but with a new-found purpose.  The reflective, alien surface of her eyes locks against your groin as she takes one lumbering step after another in your direction.  Her massive, spongy tits wobble dangerously close to you, nearly entrancing you with their beautiful, unnatural curves.\n\n", false);
	
	Render.text("Running seems like a very good idea.  Who knows what she has planned for you?", false);
	//[RUN] [TRY TO TALK]
	simpleChoices("Run Away", runAwayFromMaddiiiieee, "TryToTalk", talkToMaddie, "", null, "", null, "", null);
}
//[RUN DAFUQ AWAY]
private runAwayFromMaddiiiieee():void {
	spriteSelect(39);
	Render.text("", true);
	Render.text("You turn tail to run, evacuating the room before that culinary catastrophe can have her way with you.  A high-pitched whine chases you away as the cupcake-girl cries, \"<i>Nooooo... come back!  I'm making so much filling for you!</i>\"  Her words lend you even greater speed, and you vacate the city in record time.\n\n", false);
	flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00242] = -1;
	doNext(camp.returnToCampUseOneHour);
}
//[Followup to run away]
public runAwayMaddieFollowup():void {
	spriteSelect(39);
	Render.text("", true);
	flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00242] = -2;
	Render.text("You return to a strange sight indeed.  Urta and Edryn are leading a procession of over thirty city guards, arranged in a loose circle around the cupcake-girl.  Her comparatively tiny, tin-foil fez is gone, along with most of her blue-iced 'armor'.  She looks weak, pathetic, and beaten as she's prodded with spears and escorted from the city, never to return again.  Vanilla-scented tears stain the pavement behind her, leaving a trail the whole way back to the bakery.\n\n", false);
	doNext(telAdre.telAdreMenu);
}
	
//[TRY TO TALK]
private talkToMaddie():void {
	spriteSelect(39);
	Render.text("",true);
	Render.text("You try to speak as calmly as you can in the face of a giant, jiggling sex-pastry, but she ignores your demands to 'wait', 'listen', or 'stop'.  Sponge-cake-soft fists envelop your arms, lifting you from the ground to pin you against some flour sacks.   The cherries covering the cupcake-girl's whipped-cream bra drop off, pushed away by two candy-pink nipples the size of water bottles.  As one, they discharge thick splorts of thick, gooey icing to splatter over the length of your exposed arms.  It hardens nigh-instantaneously in the comparatively cool air, and you're helpless to do anything but squirm as she applies the same treatment to your " + player.legs() + ", immobilizing you completely.\n\n", false);
	Render.text("The cock-crazed confection looks down at you and nods, a satisfied smile spreading over glistening, pale blue lips.  She breathlessly exclaims, \"<i>My creat- cr... Dad ", false);
	if(player.lowerBody.cockSpot.hasCock()) Render.text("is like, all out of icing mix!  So I'm going to borrow a few cups from you, 'kay?", false);
	else Render.text("gave me so much icing mix, and you like, would look soooo much better with some vanil- van... yummy frosting!", false);
	Render.text("</i>\"  She's... what!?\n\n", false);
	//(FORK BETWEEN MALE/NONMALE)
	//(MALE)
	if(player.lowerBody.cockSpot.hasCock()) {
		let x:number = player.cockThatFits(60);
		if (x < 0) x = 0;
		Render.text("\"<i>Dad said my name is Madeleine, but that's no fun.  Just call me Maddie.  You've got lots of icing like Dad, right?  I-I... need more icing.  It's in my recipe,</i>\" says Maddie.  The baked broad strips your " + player.armorName + " to expose your " + multiCockDescriptLight() + ".  Cooing with excitement, she examines your ", false);
		if(player.lust >= 75) Render.text("rock-hard", false);
		else Render.text("hardening", false);
		Render.text(" shaft", false);
		if(player.lowerBody.cockSpot.count() > 1) Render.text("s", false);
		Render.text(", running a sponge-soft hand over the love-muscle.  You rock your hips, trying to squirm away.  Maddie laughs, breathily chortling while her well-rounded breasts slide to either side of you and pin you to the wall.\n\n", false);
		
		Render.text("\"<i>So is this like, where the icing spouts out right?</i>\" asks the confectionery cutey, squeezing you softly.  \"<i>Awww, how sad – yours is stuck, just like Daddy's!  I'll have to squeeze and rub it until it'll let out the icing.</i>\"\n\n", false);
		
		if(player.stats.cor < 33) Render.text("You muster as much authority as you can in such a compromising position and explain to Maddie that what comes out of there is NOT icing.", false);
		else if(player.stats.cor < 66) Render.text("You offhandedly mention that you don't actually make icing.", false);
		else Render.text("You smirk and mention that what you squirt isn't quite icing.", false);
		Render.text("  \"<i>Liar!  If that wasn't icing, then why would Daddy have put his in all those eclairs and me?</i>\" retorts the busty cupcake, continuing on to say, \"<i>I know, I can suck it out!</i>\"  She purses her jelly-like lips and plunges forward, slurping all " + num2Text(Math.floor(player.lowerBody.cockSpot.list[x].cockLength)) + " inches into her oven-warmed esophagus.  Your protests are cut off by the tightness squeezing around your " + cockDescript(x) + ".  It milks you in rippling motions, buttery-slick and pulsing hungrily.\n\n", false);
		
		Render.text("A half-melted tongue ", false);
		if(!player.lowerBody.cockSpot.hasSheath()) Render.text("encircles the base", false);
		else Render.text("pokes and prods into your sheath", false);
		Render.text(", leaving a syrupy residue trailing over your " + cockDescript(x) + ".  You groan, sagging into the sugary suspension.  The strength is completely gone from your limbs, stolen by the pastry's prick-devouring maw.  Her shining eyes look up to gloat once she realizes how completely you've submitted to her ministrations, and in no time, her cake-soft hands catch and squeeze your " + cockDescript(x) + " into the gargantuan swell of her spongy breasts.  A smile crosses your face as you get pleasured by the motherly mounds and the familiar, sweet smell that Maddie exudes.\n\n", false);
		
		Render.text("Suction starts, hollowing the cupcake-girl's plush cheeks into a concave, cock-slurping form.  The constant squeezing of your " + cockDescript(x) + " combines with the sucking to make you swell larger inside Maddie's gullet while she kisses your groin.  The confection's oral charms show no signs of stopping as she noisily slurps away at her treat, and her pillowy breasts are so spongy-soft and calming that you're happy to let her sample your 'icing' if it means you can feel like this.  Your " + hipDescript() + " push back into the baby blue lips, pumping and thrusting as your instinct to fuck and breed takes over, working your " + cockDescript(x) + " in and out of the pastry's puckered mouth.\n\n", false);
		
		Render.text("Maddie pushes further forward, her bosom crushing you against the wall to hold your hips immobile while she sucks harder and harder.  Your cock balloons from the suction, thickening inside her neck and beginning to twitch from the irresistible fellative pleasure. An orgasm grows in your " + ballsDescriptLight(), false);
		if(player.lowerBody.balls > 0) Render.text(", the cum-heavy spheres bouncing in your twitching sack as they get ready to explode", false);
		Render.text(".  Maddie squeezes her puckered cock-suckers tight around the turgid shaft while she whips her melty tongue in circles around it.  Your climax hits like a hammer-blow to the temple, knocking the thoughts from your head while you pump rope after rope of 'icing' down the cupcake's dick-gripping neck-hole.  The suction relaxes as you fill the ravenous pastry with your seed and let your head limply sink deeper against the cushion of her sponge-cake-soft breast.\n\n", false);
		
		Render.text("Maddie milks you for what seems like ages", false);
		if(player.lowerBody.cockSpot.count() == 1) Render.text(", your " + cockDescript(x) + " emptying every drop of jizz into the baked cum-tank.", false);
		else {
			Render.text(" while her skin absorbs the generous donation of your other member", false);
			if(player.lowerBody.cockSpot.count() > 2) Render.text("s", false);
			Render.text(".", false);
		}
		Render.text("  When the jizz-guzzling pastry-girl pulls back at last to free your empty member, it's coated from top to bottom in gooey blue jelly, though it's tinged white in places.  The milked-out member slowly softens", false);
		if(player.lowerBody.cockSpot.count() > 1) {
			if(player.lowerBody.cockSpot.count() == 2) Render.text(" along with your other penis", false);
			else Render.text(" along with your other dicks", false);
		}
		Render.text(".  Satisfied, your body goes limp and sags against the wall while your face leans on the cupcake-girl's departing breast.\n\n", false);
		
		Render.text("The cream-filled creation leans back and squirts some more icing onto the straps holding you, but instead of reinforcing the bonds, it eats through the hardened confection to release you into her waiting bosom.  She catches you in the pillowy chest-embrace, stroking your hair while she says in a sing-song voice, \"<i>Thanks for all the icing " + player.mf("mister","miss") + "!  I think I have enough for now.  I think I'll go like, check on my Dad and stuff.  Maybe he wants to add some icing to the recipe?</i>\"\n\n", false);
	
		Render.text("Oven-warmed tiles kiss your exposed " + buttDescript() + " as you're gently placed on the floor next to your discarded equipment.  Exhausted and satiated as you are, your eyes drift closed, lulling you into slumber.\n\n", false);
		
		Render.text("<b>Later...</b>\n", false);
		Render.text("You're woken by a furry hand squeezing your shoulder and violently shaking you around.  With such rough treatment, you snap to full alertness in no time.  The minotaur chef is smiling down at you, the expression looking quite strange on his bestial muzzle as he says, \"<i>Sorry.  Experiment backfired.  Glad you gave her what she needed.  Much calmer now.  Will make great assistant.</i>\"\n\n", false);
		Render.text("Once the beast-man has finished talking you realize the cupcake-girl, Madeleine, is standing behind him.  Her blue-iced 'clothes' have been remade, shaped into a form-fitting apron that accentuates her massive, otherworldly curves.  The minotaur chef utters, \"<i>We go now.  Get dressed.  Maybe sometime can visit Maddie.</i>\"  Maddie claps her hands, bouncing and jiggling with excitement as the two of them leave you there to get dressed.", false);
	}
	//(FEMALE/Genderpoots) 
	else {
		Render.text("\"<i>Dad said my name is Madeleine, but that's no fun.  Just call me Maddie!</i>\" exclaims the airheaded pastry.  You briefly wonder if the yeast is to blame for her state, but you stifle the involuntarily giggle that rises with the stray thought.  Now is hardly the time for such frivolous rambling!  You shout with equal parts terror and rage, demanding she remove her sugary bondage from you immediately.  She looks at you with her alien eyes full of confusion, as if she doesn't comprehend a word you're saying.\n\n", false);
		
		Render.text("A nipple is forced between your still-protesting lips, plugging your noise-hole before you can complain further.  Maddie gleefully cheers, \"<i>There we go... now we just need to get some magic icing in you so you'll feel nice and yummy and like, relaxed!</i>\"  Oh no – you don't know what she means by magic icing, but whatever it is, it can't be good.  First, you try to spit the spongy areola out.  It pushes back with incessant pressure, flooding your mouth with cake-like sweetness immediately.  You try to bite down.  Maybe pain will make her draw back?  It doesn't work, and if anything, it just starts the flow of icing.\n\n", false);
		
		Render.text("It's delicious – creamy, gooey, and sugary-sweet while at the same time as fluid as mother's milk. You swallow the first mouthful reflexively before you remember you were trying to avoid this exact fate.  The thick icing coats your esophagus with the cupcake's warm secretion. It radiates gentle, oven-like heat throughout you, clouding your mind and dulling your vision with its hazy warmth.  You relax against your saccharine bonds nervelessly and begin to drink of your own volition.\n\n", false);
		
		Render.text("\"<i>Shhh, shhh... that's a good " + player.mf("boy","girl") + ".  Isn't my icing the absolute best?</i>\" she verbally gushes, just like the nipple between your teeth.  \"<i>Drink up", false);
		if(player.thickness < 60) Render.text(", you're looking awful thin", false);
		else if(player.tone >= 70) Render.text(", you look like you're carved from stone.  A little softness would do you good", false);
		else Render.text(", you look like you'd better eat to keep up your gorgeous figure", false);
		Render.text(".  Mmm, don't let it like, spill or nothing!  I'm making this icing special and yummy so you'll feel super good and stop struggling an' stuff.</i>\"  Her voice is as candy-sweet as the milk you're guzzling.  The sound of messy slurps and noisy, gulping swallows fills the air of the small back room.\n\n", false);
		
		Render.text("The weighty breast and its spongy nipple retreat, popping from your questing lips.  You whine weakly in disappointment at the sudden disappearance of your treat, licking and smearing the white cream over your already icing-smeared mouth.  Maddie grabs her other tit with a two handed grip and struggles with the wobbling mass while she aims her unused nipple your way.  The areola heaves, bulging out like an overfilled balloon.  The nipple wiggles in place from the pressure, stretching out around the sides until it looks ready to rupture.  Creamy confection beads at the tip, slowly forming a fat, sticky drop that hangs down and threatens to fall to the floor.  Before it falls, the nipple pulses one last time and opens up a flow of icing.  It's like watching a dam burst – awe-inspiring for the first few seconds until the torrent of fluid begins to drown you.\n\n", false);
	
		Render.text("You rock back as the gushing stream impacts your solar plexus, splattering the frosty white stuff into a spray of rain.  Goop rains and explodes all around, and Maddie just giggles and moans while she guides the flow over every inch of your form, drenching you in sugary sweetness.  You swallow nearly as much as you spit and sputter.  After a few moments you just kind of open wide and sigh, hoping she'll hold it in your mouth and hit you with enough force to pump it into your gurgling gut.\n\n", false);
	
		Render.text("\"<i>Ohhh, you look good enough to eat!</i>\" exclaims Maddie.  Meanwhile, your restraints slowly liquify under the warm, sugary strikes.  They stretch lower and lower, letting you sink into the soft, half-melted pile of icing.  At last the icing-based bindings snap, letting you sink into the sweetened mass as if it was a giant cushion.  Maddie sighs, giving a few last, fickle squirts that splatter in your hair before her flow completely stops.\n\n", false);
		
		Render.text("\"<i>Ooooh look at you!  You're all sticky-sweet and soft!  Gosh, I bet all the horny boys and girls would love to lick you right up!</i>\" exclaims the excited cupcake-girl.  She licks a drop of stray icing from one of her plump digits before she utters with a voice full of worry, \"<i>I'm all out of icing.  N- no one will like me if I don't have icing!  Thanks for playing, but I'd better go get some more cream filling from daddy.  You stay still and don't go anywhere until you've eaten all the icing, 'kay?</i>\"\n\n", false);
		
		Render.text("The pudgy pastry flounces off, leaving you to wallow in the pile of syrupy cream she leaves behind.  You're so placid and relaxed from her drugged icing that you obey thoughtlessly, shoveling heaping handfuls into your mouth.  Handful after handful, you devour the creamy, drugged topping that's piled up around you.  Somehow it doesn't burst your belly with its sheer volume, but it does make your tummy rumble and protrude slightly ", false);
		if(player.thickness < 60 || player.tone >= 50) Render.text("forward", false);
		else Render.text("more forward than normal", false);
		Render.text(".  After a time it overwhelms you and you fall into a fitful slumber.\n\n", false);
		
		Render.text("<b>Later...</b>\n", false);
		Render.text("You're woken by a furry hand squeezing your shoulder and violently shaking you around.  With such rough treatment, you snap to full alertness in no time.  The minotaur chef is smiling down at you, the expression looking quite strange on his bestial muzzle as he says, \"<i>Sorry.  Experiment backfired.  Glad you okay.  Gave her more filling and all calm now.  Will make great assistant.</i>\"\n\n", false);
		
		Render.text("Once the beast-man has finished talking you realize the cupcake-girl, Madeleine, is standing behind him.  Her blue-iced 'clothes' have been remade, shaped into a form-fitting apron that accentuates her massive, otherworldly curves.  The minotaur chef utters, \"<i>We go now.  Get dressed.  Maybe sometime can visit Maddie.</i>\"  Maddie claps her hands, bouncing and jiggling with excitement as the two of them leave you there to get dressed.", false);
		Render.text(player.modThickness(100,10), false);
		Render.text(player.modTone(0,10), false);  
	}
	flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00242] = 3;
	doNext(camp.returnToCampUseOneHour);
}

//[Next visit to the bakery...]
internal function bakeryEpilogue():void {
	Render.text("", true);
	Render.text("As soon as you enter the bakery, one of the waitresses pulls you aside.  She positively beams as she hands you a note and says, \"<i>One of our chefs wanted me to give you this.  I didn't even know he could write!  I mean, where does a minotaur learn to handle a pen?</i>\"  You smirk, waving her away before you open up the minotaur's note.\n\n", false);  
	Render.text("\"<i>Thanks.  Figured out what went wrong with Maddie's help.  Made masterpiece.  Buy giant cupcake sometime.  Delicious!  Promise it's safe and non-addictive.  Expensive though.  Ingredients rare.\n\n", false);
	Render.text("-X</i>\"", false);
	flags[FlagEnum.UNKNOWN_FLAG_NUMBER_00242] = 4;
	doNext(telAdre.bakeryScene.bakeryuuuuuu);
}
}
}
