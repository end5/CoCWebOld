class Maddie {
    //VARS
    // 240- first time meeting procced? 1 yes
    // 241- mino explained what he needs yet?
    // 242- baking happaned?  1 = yes, -1 = snuck out, -2 = seen her escorted out
    //, 3 =stayed, 4 = epilogue'ed
    //[Bakery One Off – Madeleine's Creation]
    internal function procMaddieOneIntro(): void {
        DisplayText().clear();
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00240] === 0) {
            DisplayText("You enter the bakery, savoring the sweet smells of sugar and baked goods.  A burly, hairy figure steps up beside you and places a strong hand on your shoulder.   The gravelly voice of the stranger says, \"<i>You ain't from around here.  Come.  I need your help.  Show you something.</i>\"  You turn to look, and are quite surprised when you see the horned visage of a minotaur ");
            if (player.tallness < 72) DisplayText("looking down at");
            else if (player.tallness < 100) DisplayText("staring levelly at");
            else DisplayText("glaring up at");
            DisplayText(" you. It releases your shoulder and starts walking towards an 'employees only' door.  Do you follow?\n\n");
            Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00240] = 1;
        }
        //(REPEAT) 
        else {
            DisplayText("You walk into the bakery and a burly, hair-covered arm grabs your shoulder.  The familiar voice of a minotaur barks, \"<i>You.  You can help.  Come.</i>\"  You turn, but he's already walking towards an 'employees only' door.  Do you follow?");
        }
        MainScreen.doYesNo(followMinotaurIntoBackroom, telAdre.bakeryScene.bakeryuuuuuu);
    }
    //[Follow] 
    private followMinotaurIntoBackroom(): void {
        DisplayText().clear();
        //	(Not yet explained) 
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00241] === 0) {
            DisplayText("You follow the burly beast through the door, turning several times as he leads you through the blisteringly hot ovens.  The minotaur is sweating heavily by the time you reach his destination, and for that matter so are you.  With all the musk boiling off of him, you find yourself wondering if he was just setting up an elaborate ruse to lure you into a sexual situation.  He grabs a white, fluffy hat and drops it on his head, firmly dispelling that notion as he tries to explain in as few words as possible, \"<i>I am cook.  I make great éclairs, but making masterpiece now.  Need special ingredients.  You get to leave city.  Bring me lust draft and honey.  Not pure stuff, too strong. Go.</i>\"\n\n");
            DisplayText("You get a chance to look over his work station, noting the many bowls of batter, hundreds of massive eclairs, and the largest onahole you've ever seen.  ");
            if (player.perks.has(PerkType.MinotaurCumAddict)) DisplayText("You lick your lips when you realize you're meeting the source of the 'special' éclairs.");
            else DisplayText("You blush when you realize what he must be using for cream filling.");
            //[Give Them] [Leave]
            if (player.inventory.items.has(consumables.BEEHONY) && player.inventory.items.has(consumables.L_DRAFT))
                MainScreen.simpleChoices(["Give Them", "", "", "", "Leave"], [handOverIngredientsItBeBakingTimeYo, null, null, null, nopeAintGotNoneODemSpeculIngredimathings]);
            else simpleChoices("", null, "", null, "", null, "", null, "Leave", Scenes.camp.returnToCampUseOneHour);
            Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00241] = 1;
        }
        //(Explained) 
        else {
            DisplayText("You follow the burly chef through the door, winding through the familiar ovens.  By the time you reach his work area, you're both covered in a fine sheen of sweat and you find yourself responding to the minotaur musk unconsciously.  The strange chef turns to ask, \"<i>You have special ingredients now, yes?</i>\"");
            //[Yes] [Lie – No/Not Yet]
            if (player.inventory.items.has(consumables.BEEHONY) && player.inventory.items.has(consumables.L_DRAFT))
                simpleChoices("Yes", handOverIngredientsItBeBakingTimeYo, "Lie - No", nopeAintGotNoneODemSpeculIngredimathings, "", null, "", null, "", null);
            else MainScreen.simpleChoices(["No", "", "", "", ""], [nopeAintGotNoneODemSpeculIngredimathings, null, null, null, null]);
        }
    }

    //[Not Yet/No]
    public nopeAintGotNoneODemSpeculIngredimathings(): void {
        DisplayText().clear();
        DisplayText("The chef sighs and slams a fist into the counter hard enough to dent the metal and throw the bowls full of dough inches into the air.  A number of empty éclairs bounce and roll everywhere.  The minotaur looks back at you and snorts, \"<i>Best you go.  Don't come without ingredients.</i>\"\n\n");

        DisplayText("Well, no point in ");
        if (player.stats.cor > 50) DisplayText("starting a fight inside Tel'Adre");
        else DisplayText("overstaying your welcome");
        DisplayText(" – you depart.");
        return { next: telAdre.bakeryScene.bakeryuuuuuu };
    }
    //[Yes – baking]
    public handOverIngredientsItBeBakingTimeYo(): void {
        DisplayText().clear();
        player.inventory.items.consumeItem(consumables.BEEHONY);
        player.inventory.items.consumeItem(consumables.L_DRAFT);
        DisplayText("You hand the lust draft and bottled honey to the minotaur, doing your best to ignore his potent, lust-inducing pheromones as you watch him work.  He grabs the batch of dough he had been kneading and pours in the lust draft, snorting aggressively once the bubbling drug's smell reaches his bovine nostrils.  Next, the bull-like chef reaches over to grab a bottle marked 'P.S.M.', uncorking and pouring it in one practiced motion.   The white fluid froths dangerously on contact with the pink lust draft, and a second later the honey is in there too.  Finally, he flips up his loincloth and reaches for the onahole.\n\n");

        DisplayText("The sex-toy drips with lubricant and twists in the minotaur's hands, indicating magical enhancement or goblin manufacture.  He slides in, sighing as his four, basketball-sized testes pull close to his body, twitching.  Two quick pumps later, he's howling, hips twitching as spurts of white leak from the onahole into the bowl.  With remarkable restraint, he stops himself after adding a cup of spunk, even though his balls are still huge and quivering.");
        if (player.perks.has(PerkType.MinotaurCumAddict)) DisplayText("  You lurch forward involuntarily, craving the rest of his jism, but he pushes you into the wall and grunts, \"<i>No,</i>\" in a tone that brooks no disagreement.  It actually shocks you out of your addicted haze.");
        DisplayText("\n\n");

        DisplayText("Grabbing a whisk, the bull-man starts stirring the sex-filled dough with vigor, mixing the thickening blend hard enough to make his biceps ripple.  A moment later, he lifts the bowl one-handed and pulls out a giant, novelty cupcake mold from the counter. After filling the mold, the chef throws it onto his burly shoulder and grabs a sack of actual icing.  A terse grunt instructs, \"<i>Wait at tables.  You can try some when done.</i>\"  ");
        if (player.perks.has(PerkType.MinotaurCumAddict)) DisplayText("  Your mouth salivates at the thought.");
        else DisplayText("You aren't sure you want to.");
        DisplayText("\n\n");
        if (player.perks.has(PerkType.MinotaurCumAddict)) return { next: waitForSlutCake };
        //[Wait] [Sneak Out]
        else MainScreen.simpleChoices(["Wait", "Sneak Out", "", "", ""], [waitForSlutCake, sneakAwayFromMaddie, null, null, null]);
    }

    //[Sneak Out]
    private sneakAwayFromMaddie(): void {
        DisplayText().clear();
        DisplayText("You get out before he can find you again.  Whatever he's making is nothing you ever want to taste.");
        //(No more mino chef)
        Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00242] = -2;
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    //[Wait/Next]
    private waitForSlutCake(): void {
        DisplaySprite(39);
        DisplayText().clear();
        DisplayText("You walk back into the bakery proper, feeling more than a little ");
        if (player.stats.cor < 33) DisplayText("antsy");
        else if (player.stats.cor < 66) DisplayText("nervous about this whole thing");
        else DisplayText("intrigued by this whole thing");
        DisplayText(".  One of the waitresses brings you a glass of milk, and ");
        if (player.stats.cor < 50) DisplayText("it smells normal enough, so you go ahead and sip on it");
        else DisplayText("you sip on it while you wait");
        DisplayText(".  After what feels like an eternity, you get sick of waiting and push through the door into the bakery's backrooms to see what the hold-up is.  The minotaur isn't at his usual workstation, and doesn't look to have been there in quite some time.\n\n");

        DisplayText("Where could he have gone?  You backtrack through the ovens, looking down side-paths and searching through the labyrinthine storage rooms.  Just when you're about to give up, you hear an airy, light-headed giggle from the next room.  You peek around the corner and gasp in absolute shock.  The minotaur is pinned to the wall, his wrists stuck in place by what looks like hardened, white icing.   On top of him is the strangest - no, ONLY, cupcake-woman you've ever seen.\n\n");

        DisplayText("She's taller than the imprisoned minotaur, and wider too.  The pastry-girl's skin is slightly porous, colored light chocolate and gleaming in the dim light where it isn't covered by shining, blue-iced 'clothes'.  Her hair is white as whipped cream, and tied back with a cinnamon bun.  Her curvaceous form turns, jiggling ever so slightly as she takes you in with her green, gum-drop eyes and revealing her whipped-cream bra.  The novelty cup-cake mold is balanced atop her head, worn like a comparatively tiny fez.\n\n");

        DisplayText("The minotaur chef is still wearing his poofy hat, but he's pinned completely and irrevocably under this baked behemoth as she bounces and grinds on his convulsing member.  While you watch, his balls shrink smaller and smaller, emptying their pent up, steamy cargo directly into the cupcake's soft, cushiony center.  She grows larger from the sudden intake of fresh jism, giggling as she drains every drop from her creator.  \"<i>Tee-hee!  Mmm, you're like, delicious and stuff, creat- cr... dad!  So sticky and yummy, just like me!</i>\" exclaims the fluffy slut-cake.\n\n");

        DisplayText("Utterly shocked and drained, the chef-o-taur's eyes roll back in his sockets.  He slumps weakly under his creation as she bounces a few last times, futilely trying to squeeze more cum from the slumping minotaur-dick.  The cupcake-girl rises at last, not with yeast, but with a new-found purpose.  The reflective, alien surface of her eyes locks against your groin as she takes one lumbering step after another in your direction.  Her massive, spongy tits wobble dangerously close to you, nearly entrancing you with their beautiful, unnatural curves.\n\n");

        DisplayText("Running seems like a very good idea.  Who knows what she has planned for you?");
        //[RUN] [TRY TO TALK]
        MainScreen.simpleChoices(["Run Away", "TryToTalk", "", "", ""], [runAwayFromMaddiiiieee, talkToMaddie, null, null, null]);
    }
    //[RUN DAFUQ AWAY]
    private runAwayFromMaddiiiieee(): void {
        DisplaySprite(39);
        DisplayText().clear();
        DisplayText("You turn tail to run, evacuating the room before that culinary catastrophe can have her way with you.  A high-pitched whine chases you away as the cupcake-girl cries, \"<i>Nooooo... come back!  I'm making so much filling for you!</i>\"  Her words lend you even greater speed, and you vacate the city in record time.\n\n");
        Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00242] = -1;
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
    //[Followup to run away]
    public runAwayMaddieFollowup(): void {
        DisplaySprite(39);
        DisplayText().clear();
        Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00242] = -2;
        DisplayText("You return to a strange sight indeed.  Urta and Edryn are leading a procession of over thirty city guards, arranged in a loose circle around the cupcake-girl.  Her comparatively tiny, tin-foil fez is gone, along with most of her blue-iced 'armor'.  She looks weak, pathetic, and beaten as she's prodded with spears and escorted from the city, never to return again.  Vanilla-scented tears stain the pavement behind her, leaving a trail the whole way back to the bakery.\n\n");
        return { next: telAdre.telAdreMenu };
    }

    //[TRY TO TALK]
    private talkToMaddie(): void {
        DisplaySprite(39);
        DisplayText("", true);
        DisplayText("You try to speak as calmly as you can in the face of a giant, jiggling sex-pastry, but she ignores your demands to 'wait', 'listen', or 'stop'.  Sponge-cake-soft fists envelop your arms, lifting you from the ground to pin you against some flour sacks.   The cherries covering the cupcake-girl's whipped-cream bra drop off, pushed away by two candy-pink nipples the size of water bottles.  As one, they discharge thick splorts of thick, gooey icing to splatter over the length of your exposed arms.  It hardens nigh-instantaneously in the comparatively cool air, and you're helpless to do anything but squirm as she applies the same treatment to your " + LegDescriptor.describeLegs(player) + ", immobilizing you completely.\n\n");
        DisplayText("The cock-crazed confection looks down at you and nods, a satisfied smile spreading over glistening, pale blue lips.  She breathlessly exclaims, \"<i>My creat- cr... Dad ");
        if (player.torso.cocks.count > 0) DisplayText("is like, all out of icing mix!  So I'm going to borrow a few cups from you, 'kay?");
        else DisplayText("gave me so much icing mix, and you like, would look soooo much better with some vanil- van... yummy frosting!");
        DisplayText("</i>\"  She's... what!?\n\n");
        //(FORK BETWEEN MALE/NONMALE)
        //(MALE)
        if (player.torso.cocks.count > 0) {
            let x: number = player.cockThatFits(60);
            if (x < 0) x = 0;
            DisplayText("\"<i>Dad said my name is Madeleine, but that's no fun.  Just call me Maddie.  You've got lots of icing like Dad, right?  I-I... need more icing.  It's in my recipe,</i>\" says Maddie.  The baked broad strips your " + player.inventory.equipment.armor.displayName + " to expose your " + CockDescriptor.describeMultiCockShort(player) + ".  Cooing with excitement, she examines your ");
            if (player.stats.lust >= 75) DisplayText("rock-hard");
            else DisplayText("hardening");
            DisplayText(" shaft");
            if (player.torso.cocks.count > 1) DisplayText("s");
            DisplayText(", running a sponge-soft hand over the love-muscle.  You rock your hips, trying to squirm away.  Maddie laughs, breathily chortling while her well-rounded breasts slide to either side of you and pin you to the wall.\n\n");

            DisplayText("\"<i>So is this like, where the icing spouts out right?</i>\" asks the confectionery cutey, squeezing you softly.  \"<i>Awww, how sad – yours is stuck, just like Daddy's!  I'll have to squeeze and rub it until it'll let out the icing.</i>\"\n\n");

            if (player.stats.cor < 33) DisplayText("You muster as much authority as you can in such a compromising position and explain to Maddie that what comes out of there is NOT icing.");
            else if (player.stats.cor < 66) DisplayText("You offhandedly mention that you don't actually make icing.");
            else DisplayText("You smirk and mention that what you squirt isn't quite icing.");
            DisplayText("  \"<i>Liar!  If that wasn't icing, then why would Daddy have put his in all those eclairs and me?</i>\" retorts the busty cupcake, continuing on to say, \"<i>I know, I can suck it out!</i>\"  She purses her jelly-like lips and plunges forward, slurping all " + num2Text(Math.floor(player.torso.cocks.get(x).length)) + " inches into her oven-warmed esophagus.  Your protests are cut off by the tightness squeezing around your " + CockDescriptor.describeCock(player, x) + ".  It milks you in rippling motions, buttery-slick and pulsing hungrily.\n\n");

            DisplayText("A half-melted tongue ");
            if (!player.torso.cocks.hasSheath()) DisplayText("encircles the base");
            else DisplayText("pokes and prods into your sheath");
            DisplayText(", leaving a syrupy residue trailing over your " + CockDescriptor.describeCock(player, x) + ".  You groan, sagging into the sugary suspension.  The strength is completely gone from your limbs, stolen by the pastry's prick-devouring maw.  Her shining eyes look up to gloat once she realizes how completely you've submitted to her ministrations, and in no time, her cake-soft hands catch and squeeze your " + CockDescriptor.describeCock(player, x) + " into the gargantuan swell of her spongy breasts.  A smile crosses your face as you get pleasured by the motherly mounds and the familiar, sweet smell that Maddie exudes.\n\n");

            DisplayText("Suction starts, hollowing the cupcake-girl's plush cheeks into a concave, cock-slurping form.  The constant squeezing of your " + CockDescriptor.describeCock(player, x) + " combines with the sucking to make you swell larger inside Maddie's gullet while she kisses your groin.  The confection's oral charms show no signs of stopping as she noisily slurps away at her treat, and her pillowy breasts are so spongy-soft and calming that you're happy to let her sample your 'icing' if it means you can feel like this.  Your " + LowerBodyDescriptor.describeHips(player) + " push back into the baby blue lips, pumping and thrusting as your instinct to fuck and breed takes over, working your " + CockDescriptor.describeCock(player, x) + " in and out of the pastry's puckered mouth.\n\n");

            DisplayText("Maddie pushes further forward, her bosom crushing you against the wall to hold your hips immobile while she sucks harder and harder.  Your cock balloons from the suction, thickening inside her neck and beginning to twitch from the irresistible fellative pleasure. An orgasm grows in your " + BallsDescriptor.describeBalls(true, true, player));
            if (player.torso.balls.quantity > 0) DisplayText(", the cum-heavy spheres bouncing in your twitching sack as they get ready to explode");
            DisplayText(".  Maddie squeezes her puckered cock-suckers tight around the turgid shaft while she whips her melty tongue in circles around it.  Your climax hits like a hammer-blow to the temple, knocking the thoughts from your head while you pump rope after rope of 'icing' down the cupcake's dick-gripping neck-hole.  The suction relaxes as you fill the ravenous pastry with your seed and let your head limply sink deeper against the cushion of her sponge-cake-soft breast.\n\n");

            DisplayText("Maddie milks you for what seems like ages");
            if (player.torso.cocks.count === 1) DisplayText(", your " + CockDescriptor.describeCock(player, x) + " emptying every drop of jizz into the baked cum-tank.");
            else {
                DisplayText(" while her skin absorbs the generous donation of your other member");
                if (player.torso.cocks.count > 2) DisplayText("s");
                DisplayText(".");
            }
            DisplayText("  When the jizz-guzzling pastry-girl pulls back at last to free your empty member, it's coated from top to bottom in gooey blue jelly, though it's tinged white in places.  The milked-out member slowly softens");
            if (player.torso.cocks.count > 1) {
                if (player.torso.cocks.count === 2) DisplayText(" along with your other penis");
                else DisplayText(" along with your other dicks");
            }
            DisplayText(".  Satisfied, your body goes limp and sags against the wall while your face leans on the cupcake-girl's departing breast.\n\n");

            DisplayText("The cream-filled creation leans back and squirts some more icing onto the straps holding you, but instead of reinforcing the bonds, it eats through the hardened confection to release you into her waiting bosom.  She catches you in the pillowy chest-embrace, stroking your hair while she says in a sing-song voice, \"<i>Thanks for all the icing " + player.mf("mister", "miss") + "!  I think I have enough for now.  I think I'll go like, check on my Dad and stuff.  Maybe he wants to add some icing to the recipe?</i>\"\n\n");

            DisplayText("Oven-warmed tiles kiss your exposed " + ButtDescriptor.describeButt(player) + " as you're gently placed on the floor next to your discarded equipment.  Exhausted and satiated as you are, your eyes drift closed, lulling you into slumber.\n\n");

            DisplayText("<b>Later...</b>\n");
            DisplayText("You're woken by a furry hand squeezing your shoulder and violently shaking you around.  With such rough treatment, you snap to full alertness in no time.  The minotaur chef is smiling down at you, the expression looking quite strange on his bestial muzzle as he says, \"<i>Sorry.  Experiment backfired.  Glad you gave her what she needed.  Much calmer now.  Will make great assistant.</i>\"\n\n");
            DisplayText("Once the beast-man has finished talking you realize the cupcake-girl, Madeleine, is standing behind him.  Her blue-iced 'clothes' have been remade, shaped into a form-fitting apron that accentuates her massive, otherworldly curves.  The minotaur chef utters, \"<i>We go now.  Get dressed.  Maybe sometime can visit Maddie.</i>\"  Maddie claps her hands, bouncing and jiggling with excitement as the two of them leave you there to get dressed.");
        }
        //(FEMALE/Genderpoots) 
        else {
            DisplayText("\"<i>Dad said my name is Madeleine, but that's no fun.  Just call me Maddie!</i>\" exclaims the airheaded pastry.  You briefly wonder if the yeast is to blame for her state, but you stifle the involuntarily giggle that rises with the stray thought.  Now is hardly the time for such frivolous rambling!  You shout with equal parts terror and rage, demanding she remove her sugary bondage from you immediately.  She looks at you with her alien eyes full of confusion, as if she doesn't comprehend a word you're saying.\n\n");

            DisplayText("A nipple is forced between your still-protesting lips, plugging your noise-hole before you can complain further.  Maddie gleefully cheers, \"<i>There we go... now we just need to get some magic icing in you so you'll feel nice and yummy and like, relaxed!</i>\"  Oh no – you don't know what she means by magic icing, but whatever it is, it can't be good.  First, you try to spit the spongy areola out.  It pushes back with incessant pressure, flooding your mouth with cake-like sweetness immediately.  You try to bite down.  Maybe pain will make her draw back?  It doesn't work, and if anything, it just starts the flow of icing.\n\n");

            DisplayText("It's delicious – creamy, gooey, and sugary-sweet while at the same time as fluid as mother's milk. You swallow the first mouthful reflexively before you remember you were trying to avoid this exact fate.  The thick icing coats your esophagus with the cupcake's warm secretion. It radiates gentle, oven-like heat throughout you, clouding your mind and dulling your vision with its hazy warmth.  You relax against your saccharine bonds nervelessly and begin to drink of your own volition.\n\n");

            DisplayText("\"<i>Shhh, shhh... that's a good " + player.mf("boy", "girl") + ".  Isn't my icing the absolute best?</i>\" she verbally gushes, just like the nipple between your teeth.  \"<i>Drink up");
            if (player.thickness < 60) DisplayText(", you're looking awful thin");
            else if (player.tone >= 70) DisplayText(", you look like you're carved from stone.  A little softness would do you good");
            else DisplayText(", you look like you'd better eat to keep up your gorgeous figure");
            DisplayText(".  Mmm, don't let it like, spill or nothing!  I'm making this icing special and yummy so you'll feel super good and stop struggling an' stuff.</i>\"  Her voice is as candy-sweet as the milk you're guzzling.  The sound of messy slurps and noisy, gulping swallows fills the air of the small back room.\n\n");

            DisplayText("The weighty breast and its spongy nipple retreat, popping from your questing lips.  You whine weakly in disappointment at the sudden disappearance of your treat, licking and smearing the white cream over your already icing-smeared mouth.  Maddie grabs her other tit with a two handed grip and struggles with the wobbling mass while she aims her unused nipple your way.  The areola heaves, bulging out like an overfilled balloon.  The nipple wiggles in place from the pressure, stretching out around the sides until it looks ready to rupture.  Creamy confection beads at the tip, slowly forming a fat, sticky drop that hangs down and threatens to fall to the floor.  Before it falls, the nipple pulses one last time and opens up a flow of icing.  It's like watching a dam burst – awe-inspiring for the first few seconds until the torrent of fluid begins to drown you.\n\n");

            DisplayText("You rock back as the gushing stream impacts your solar plexus, splattering the frosty white stuff into a spray of rain.  Goop rains and explodes all around, and Maddie just giggles and moans while she guides the flow over every inch of your form, drenching you in sugary sweetness.  You swallow nearly as much as you spit and sputter.  After a few moments you just kind of open wide and sigh, hoping she'll hold it in your mouth and hit you with enough force to pump it into your gurgling gut.\n\n");

            DisplayText("\"<i>Ohhh, you look good enough to eat!</i>\" exclaims Maddie.  Meanwhile, your restraints slowly liquify under the warm, sugary strikes.  They stretch lower and lower, letting you sink into the soft, half-melted pile of icing.  At last the icing-based bindings snap, letting you sink into the sweetened mass as if it was a giant cushion.  Maddie sighs, giving a few last, fickle squirts that splatter in your hair before her flow completely stops.\n\n");

            DisplayText("\"<i>Ooooh look at you!  You're all sticky-sweet and soft!  Gosh, I bet all the horny boys and girls would love to lick you right up!</i>\" exclaims the excited cupcake-girl.  She licks a drop of stray icing from one of her plump digits before she utters with a voice full of worry, \"<i>I'm all out of icing.  N- no one will like me if I don't have icing!  Thanks for playing, but I'd better go get some more cream filling from daddy.  You stay still and don't go anywhere until you've eaten all the icing, 'kay?</i>\"\n\n");

            DisplayText("The pudgy pastry flounces off, leaving you to wallow in the pile of syrupy cream she leaves behind.  You're so placid and relaxed from her drugged icing that you obey thoughtlessly, shoveling heaping handfuls into your mouth.  Handful after handful, you devour the creamy, drugged topping that's piled up around you.  Somehow it doesn't burst your belly with its sheer volume, but it does make your tummy rumble and protrude slightly ");
            if (player.thickness < 60 || player.tone >= 50) DisplayText("forward");
            else DisplayText("more forward than normal");
            DisplayText(".  After a time it overwhelms you and you fall into a fitful slumber.\n\n");

            DisplayText("<b>Later...</b>\n");
            DisplayText("You're woken by a furry hand squeezing your shoulder and violently shaking you around.  With such rough treatment, you snap to full alertness in no time.  The minotaur chef is smiling down at you, the expression looking quite strange on his bestial muzzle as he says, \"<i>Sorry.  Experiment backfired.  Glad you okay.  Gave her more filling and all calm now.  Will make great assistant.</i>\"\n\n");

            DisplayText("Once the beast-man has finished talking you realize the cupcake-girl, Madeleine, is standing behind him.  Her blue-iced 'clothes' have been remade, shaped into a form-fitting apron that accentuates her massive, otherworldly curves.  The minotaur chef utters, \"<i>We go now.  Get dressed.  Maybe sometime can visit Maddie.</i>\"  Maddie claps her hands, bouncing and jiggling with excitement as the two of them leave you there to get dressed.");
            DisplayText(player.modThickness(100, 10));
            DisplayText(player.modTone(0, 10));
        }
        Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00242] = 3;
        return { next: Scenes.camp.returnToCampUseOneHour };
    }

    //[Next visit to the bakery...]
    internal function bakeryEpilogue(): void {
        DisplayText().clear();
        DisplayText("As soon as you enter the bakery, one of the waitresses pulls you aside.  She positively beams as she hands you a note and says, \"<i>One of our chefs wanted me to give you this.  I didn't even know he could write!  I mean, where does a minotaur learn to handle a pen?</i>\"  You smirk, waving her away before you open up the minotaur's note.\n\n");
        DisplayText("\"<i>Thanks.  Figured out what went wrong with Maddie's help.  Made masterpiece.  Buy giant cupcake sometime.  Delicious!  Promise it's safe and non-addictive.  Expensive though.  Ingredients rare.\n\n");
        DisplayText("-X</i>\"");
        Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00242] = 4;
        return { next: telAdre.bakeryScene.bakeryuuuuuu };
    }
}
}
