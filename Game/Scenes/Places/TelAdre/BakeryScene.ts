﻿class BakeryScene {

    // LAST_EASTER_YEAR: number = 823;

    //[First time approach]
    public bakeryuuuuuu() {
        if (isEaster() && player.torso.cocks.count > 0 && (Flags.list[FlagEnum.LAST_EASTER_YEAR] < date.fullYear || randInt(20) === 0)) {
            Flags.list[FlagEnum.LAST_EASTER_YEAR] = date.fullYear;
            easterBakeSale();
            return;
        }
        if (randInt(10) <= 1 && kGAMECLASS.shouldraFollower.followerShouldra() && player.gender > 0 && Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00242] === 4) {
            kGAMECLASS.shouldraFollower.shouldraBakeryIntro();
            return;
        }
        Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00243]++;
        Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00243] = Math.round(Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00243]);
        //Chef meetings
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00242] === 0 && Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00243] % 8 === 0) {
            telAdre.maddie.procMaddieOneIntro();
            return;
        }
        //Maddie Epilogue trigger!
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00242] === 3) {
            telAdre.maddie.bakeryEpilogue();
            return;
        }
        DisplayText().clear();
        
        //First time
        if (Flags.list[FlagEnum.TIMES_VISITED_BAKERY] === 0) {
            DisplayText("You approach the bakery, but it appears to be sunk below the street level.  The entrance isn't even a set of doors – it's a double-wide ramp that takes you below ground level.  The passage leads directly into the bakery's interior, allowing unobstructed traffic to flow in and out from the cozy, underground building. The smell of yeasty bread, sweet treats, and fluffy snacks seems to even permeate the bricks of this place.  If it were shut down, you have no doubt it would smell delicious for weeks if not months.  You get in line and look at the menu while you wait.\n\n");
        }
        //[Repeat approach]
        else {
            //Kanga christmas!
            if (kGAMECLASS.nieveHoliday()) {
                kGAMECLASS.encounterKamiTheChristmasRoo();
                if (Flags.list[FlagEnum.KAMI_ENCOUNTER] === 1) MainScreen.addButton(3, "Pudding", kGAMECLASS.getWinterPudding);
            }
            //Normal repeats!
            else DisplayText("You step into the bakery's domed interior and inhale, treated to a symphony of pleasant smells and the cozy warmth that radiates from the baking ovens.  There are plenty of tables and chairs around for one to eat at, and you find yourself stepping into line while you glance at the menu.\n\n");
        }
        //Times visited!
        Flags.list[FlagEnum.TIMES_VISITED_BAKERY]++;
        DisplayText("What do you do?");
        MainScreen.addButton(0, "Check Menu", checkBakeryMenu);
        MainScreen.addButton(1, "Talk", talkBakeryMenu);
        MainScreen.addButton(9, "Leave", telAdre.telAdreMenu);
    }

    private checkBakeryMenu() {
        DisplayText().clear();
        //let used for minotaur cum eclair in the menu
        let minoCum;
        let gcupcake;
        //Turn on cum eclairs if PC is an addict!
        if (player.perks.has(PerkType.MinotaurCumAddict) && Flags.list[FlagEnum.MINOTAUR_CUM_ECLAIR_UNLOCKED] === 0) {
            Flags.list[FlagEnum.MINOTAUR_CUM_ECLAIR_UNLOCKED]++;
            DisplayText("While you're in line, a shaking centauress glances at you and whispers, \"<i>You need some too, don't ya hun?</i>\"  You look on in confusion, not really sure what she's insinuating.  Her eyes widen and she asks, \"<i>Aren't you addicted?</i>\" You nod, dumbly, and she smiles knowingly.  \"<i>There's a minotaur that works here with a bit of a fetish... just order a special eclair and he'll fix you right up.  Just keep it on the hush hush and hope there's some left after I get my dozen.</i>\"  The centaur licks her lips and prances around impatiently.\n\n");
        }
        //(display menu)
        DisplayText("Rich Chocolate Brownies - 3 gems.\n");
        DisplayText("Fig Cookies - 4 gems.\n");
        DisplayText("Berry Cupcakes - 3 gems.\n");
        DisplayText("Doughnuts - 5 gems.\n");
        DisplayText("Pound Cake - 4 gems.\n");
        if (Flags.list[FlagEnum.MINOTAUR_CUM_ECLAIR_UNLOCKED] > 0) {
            DisplayText("\'Special\' Eclair - 10 gems.\n");
            minoCum = createCallBackFunction2(nomnomnom, "eclair", 10);
        }
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00242] >= 4) {
            DisplayText("Giant Chocolate Cupcake - 500 gems.\n");
            gcupcake = buySlutCake;
        }
        DisplayText("\nAlso try our special ingredients in your own baking!\n");
        DisplayText("Fox Berry - 5 gems.\n");
        DisplayText("Ringtail Fig - 5 gems.\n");
        DisplayText("Mouse Co - 10 gems.\n");

        DisplayText("\nWhat will you order?");

        
        //choices("Brownies",createCallBackFunction2(nomnomnom, "brownies", 3),"Cookies",createCallBackFunction2(nomnomnom, "cookies", 4),"Cupcakes",2833,"Doughnuts",createCallBackFunction2(nomnomnom, "doughnuts", 5),"Pound Cake",createCallBackFunction2(nomnomnom, "pound cake", 4),"Fox Berry",buyFoxBerry,"SpecialEclair",minoCum,"GiantCupcake",gcupcake,"",0,"Leave",bakeryuuuuuu);

        MainScreen.addButton(0, "Brownies", createCallBackFunction2(nomnomnom, "brownies", 5));
        MainScreen.addButton(1, "Cookies", createCallBackFunction2(nomnomnom, "cookies", 4));
        MainScreen.addButton(2, "Cupcakes", createCallBackFunction2(nomnomnom, "cupcakes", 3));
        MainScreen.addButton(3, "Doughnuts", createCallBackFunction2(nomnomnom, "doughnuts", 5));
        MainScreen.addButton(4, "Pound Cake", createCallBackFunction2(nomnomnom, "pound cake", 4));
        MainScreen.addButton(5, "SpecialEclair", minoCum);
        MainScreen.addButton(6, "GiantCupcake", gcupcake);
        MainScreen.addButton(8, "Ingredients", ingredientsMenu);
        MainScreen.addButton(9, "Leave", bakeryuuuuuu);
    }

    public ingredientsMenu() {
        DisplayText().clear();
        DisplayText("Also try our special ingredients in your own baking!\n");
        DisplayText("Fox Berry - 5 gems.\n");
        DisplayText("Ringtail Fig - 5 gems.\n");
        DisplayText("Mouse Cocoa - 10 gems.\n");
        DisplayText("Ferret Fruit - 20 gems.\n");
        
        MainScreen.addButton(0, "Fox Berry", buyFoxBerry);
        MainScreen.addButton(1, "Ringtail Fig", buyFig);
        MainScreen.addButton(2, "Mouse Cocoa", buyCocoa);
        MainScreen.addButton(3, "Ferret Fruit", buyFerretFruit);
        MainScreen.addButton(9, "Back", checkBakeryMenu);
    }

    //[Bakery - Talk - Baker]
    private talkToBaker() {
        DisplayText().clear();
        DisplayText("The minotaur snorts as you approach him, but waves you into the kitchen.  \"<i>What?</i>\" he asks, patiently watching you.  \"<i>Want to hear about baking?");
        //(Maddie 1 completed)
        if (Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00242] >= 4) DisplayText("  Or you want special order?");
        DisplayText("</i>\"");
        DisplayText("\n\nDespite his unrefined appearance and poor language ability, he seems eager to talk about his job.");

        //[Brownie][Cookie][Cupcake][Doughnut][Pound Cake][Fox Berry][Ringtail Fig][Mouse Cocoa][Nevermind]
        //[Nevermind] goes back to bakery main menu and is spacebar default
        //all purchases offered after talking should spacebar to [No] and go to normal purchase output if [Yes], returning to bakery main menu afterward 
        
        MainScreen.addButton(0, "Brownie", talkAboutBrownies);
        MainScreen.addButton(1, "Cookie", talkAboutCookies);
        MainScreen.addButton(2, "Cupcake", talkAboutCupcakes);
        MainScreen.addButton(3, "Doughnut", talkAboutDoughnuts);
        MainScreen.addButton(4, "Pound Cake", talkToBakerAboutPoundCake);
        MainScreen.addButton(5, "Fox Berry", talkAboutFoxBerry);
        MainScreen.addButton(6, "Ringtail Fig", talkAFig);
        MainScreen.addButton(7, "Mouse Cocoa", talkAboutMouseCocoa);
        MainScreen.addButton(9, "Nevermind", talkBakeryMenu);
    }

    //[Bakery - Talk - Baker - Brownie]
    private talkAboutBrownies() {
        DisplayText().clear();
        DisplayText("\"<i>Like our brownies?</i>\" the baker asks.  \"<i>Recipe been handed down from chef to chef for years.  Original maker invented it at an inn, for guests to carry in their lunchboxes.</i>\"");

        DisplayText("\n\nHe continues.  \"<i>Won't tell you full recipe.  Made with mouse cocoa, fresh egg, and sugar made from bee honey - heated and strained.  No transformations.  Pinch of salt, mix up, put in pan, bake.  Easy to make lots; popular.  Want one?  Three gems.</i>\"");

        //[Yes][No]
        
        MainScreen.addButton(0, "Yes", createCallBackFunction2(nomnomnom, "brownies", 3));
        MainScreen.addButton(1, "No", talkToBaker);
    }

    //[Bakery - Talk - Baker - Cookie]
    private talkAboutCookies() {
        DisplayText().clear();
        DisplayText("The baker nods at you.  \"<i>Cookies good.  Cookies easy, only need butter, sugar, flour, egg, and fig.  Mix batter and put in little circles, mash up figs, put figs in centers of circles, put other circle on top.  Cook cookie.  Also able to just put whatever into batter and make chocolate cookie or anything else, but fig most popular and cheapest.</i>\"  He smiles proudly and gestures toward the four-gem cookie display.  Do you buy one?");
        //[Yes][No]
        
        MainScreen.addButton(0, "Yes", createCallBackFunction2(nomnomnom, "cookies", 4));
        MainScreen.addButton(1, "No", talkToBaker);
    }

    //[Bakery - Talk - Baker - Cupcake]
    private talkAboutCupcakes() {
        DisplayText().clear();
        DisplayText("\"<i>Cupcakes take work,</i>\" the baker intones, tilting his long face downward.  \"<i>Need butter, sugar, flour, and eggs for batter; gotta mix long time and add stuff slowly.  Candied berries get cut up, put inside batter in little pieces.  Bake batter in a special pan.</i>\"");

        DisplayText("\n\n\"<i>Then,</i>\" he sighs, \"<i>make icing.  Soften butter, add milk and sugar and berry juice, beat mixture.  Beat a long time.  Beat until arm tired.  Spread on cupcakes when they come out.</i>\"");

        DisplayText("\n\n\"<i>Too popular, too cheap.  Always making cupcakes, no time to experiment on recipes.  Want to raise price but cupcakes are best seller and customers get mad.</i>\"  A bell rings.  Sighing again, he walks over to the oven and opens it, then pulls out a tray of un-iced cupcakes.  \"<i>See?  Making now.  You buying one?  Four... no, still three gems I guess.</i>\"");
        //[Yes][No]
        
        MainScreen.addButton(0, "Yes", createCallBackFunction2(nomnomnom, "cupcakes", 3));
        MainScreen.addButton(1, "No", talkToBaker);
    }

    //[Bakery - Talk - Baker - Doughnut]
    private talkAboutDoughnuts() {
        DisplayText().clear();
        DisplayText("\"<i>Doughnuts are fun,</i>\" the gruff baker smiles.  \"<i>Make mix of wet yeast, milk, sugar, eggs, little salt, and shortening.  Sometimes cocoa too.  Pound dough until smooth, work out frustration from making cupcakes all day.  Then let sit in covered bowl to rise.  Roll it small and cut if plain, or make circles if jam doughnut; cover to rise again.</i>\"  He mimes bringing a string's ends together and traces a circle, respectively.");

        DisplayText("\n\n\"<i>Fry in hot oil until brown and delicious, lift out with spatula.  Penetrate jam doughnuts with pastry bag and squirt jam like cum into breeding cow... sorry.</i>\"  He frowns.  \"<i>Take longer to make than other things, even cupcakes.  Can't make batches as big because so many kinds.  So doughnuts cost more - five gems.  Still, lots of fun to pound and fry and stuff.  Sell lots when watch shifts change; watchmen come in and clean out doughnut trays.  Want to buy one before next rush starts?</i>\"");
        //[Yes][No]
        
        MainScreen.addButton(0, "Yes", createCallBackFunction2(nomnomnom, "doughnuts", 5));
        MainScreen.addButton(1, "No", talkToBaker);
    }

    //[Bakery - Talk - Baker - Pound Cake]
    private talkToBakerAboutPoundCake() {
        DisplayText().clear();
        DisplayText("The minotaur snorts again, \"<i>'Baker's Special' pound cake is easy... mix butter and shortening, then sugar and eggs.  Put in little salt and whatever dry stuff needed, like fruits or chocolate.  Add milk too.  Put in narrow pan, bake long time.  Can't make batter in bulk though, got to have lots of varieties since not one is more popular than others.  So costs four gems; not as cheap as batch items.  Want a piece?</i>\"");
        //[Yes][No]
        
        MainScreen.addButton(0, "Yes", createCallBackFunction2(nomnomnom, "pound cake", 4));
        MainScreen.addButton(1, "No", talkToBaker);
    }

    //[Bakery - Talk - Baker - Fox Berry]
    private talkAboutFoxBerry() {
        DisplayText().clear();
        DisplayText("\"<i>Don't even know where these came from,</i>\" the baker admits.  \"<i>Shipper just showed up one day, showed me how to prepare and sell them.  Very fruity, but popular.  Candy or cook them right and eat them all day, never grow anything.  Eat them raw instead, get fox parts, look like guard captain lady and guy at whorehouse.  Still want one for five gems?</i>\"");

        //[Yes][No]
        
        MainScreen.addButton(0, "Yes", buyFoxBerry);
        MainScreen.addButton(1, "No", talkToBaker);
    }

    //[Bakery - Talk - Baker - Ringtail Fig]
    private talkAFig() {
        DisplayText().clear();
        DisplayText("\"<i>Fig tree?  From border of swamp,</i>\" the baker explains.  \"<i>Grows in crevices on other garbage tree, slowly covers it up until other tree is sealed inside and dies.  Bushrangers traded dried figs to us, then we grew our own from seeds when demons attacked and they stopped coming around.  Rocky start, but they stand up to desert now.  Good to eat.  Campfire not good for preparation - cook it in oven long time or you grow stripey tail and sly-looking mask and watchmen will all be suspicious of you and follow you around.  Saw it happen.  Five gems to buy.</i>\"");
        //figjam marker here: once next phase of fig use is written, then if figjam flag <= 1, set figjam flag = 1 at end of this talk
        //[Yes][No]
        //[Yes][No]
        
        MainScreen.addButton(0, "Yes", buyFig);
        MainScreen.addButton(1, "No", talkToBaker);
    }

    //[Bakery - Talk - Baker - Mouse Cocoa]
    private talkAboutMouseCocoa() {
        DisplayText().clear();
        DisplayText("\"<i>Mouse cocoa comes from warm side of the lake, by forest border.  Like the name says, mouse people used to grow and eat a lot of it.  No mice left, though... hard to get now and expensive.  Have to buy it from the farmer at the lake; she sends out gathering parties.  Same one we get milk from.  Less and less every year... going to have to raise prices soon.  Ten gems for one handful, now.</i>\"");
        //[Yes][No]
        
        MainScreen.addButton(0, "Yes", buyCocoa);
        MainScreen.addButton(1, "No", talkToBaker);
    }

    private buyCocoa() {
        DisplayText().clear();
        if (player.inventory.gems < 10) {
            DisplayText("You can't afford one of those!");
            
            MainScreen.addButton(0, "Next", ingredientsMenu);
            return;
        }
        DisplayText("You pay ten gems for some cocoa.  ");
        player.inventory.gems -= 10;
        statScreenRefresh();
        inventory.takeItem(consumables.MOUSECO, ingredientsMenu);
    }

    private buyFerretFruit() {
        DisplayText().clear();
        if (player.inventory.gems < 20) {
            DisplayText("You can't afford one of those!");
            
            MainScreen.addButton(0, "Next", ingredientsMenu);
            return;
        }
        DisplayText("You pay twenty gems for a single ferret fruit.  ");
        player.inventory.gems -= 20;
        statScreenRefresh();
        inventory.takeItem(consumables.FRRTFRT, ingredientsMenu);
    }

    private buyFig() {
        DisplayText().clear();
        if (player.inventory.gems < 5) {
            DisplayText("You can't afford one of those!");
            
            MainScreen.addButton(0, "Next", ingredientsMenu);
            return;
        }
        DisplayText("You pay five gems for a fig.  ");
        player.inventory.gems -= 5;
        statScreenRefresh();
        inventory.takeItem(consumables.RINGFIG, ingredientsMenu);
    }


    private talkBakeryMenu() {
        //choices("Brownies",createCallBackFunction2(nomnomnom, "brownies", 3),"Cookies",2831,"Cupcakes",2833,"Doughnuts",createCallBackFunction2(nomnomnom, "doughnuts", 5),"Pound Cake",createCallBackFunction2(nomnomnom, "pound cake", 4),"Fox Berry",buyFoxBerry,"SpecialEclair",minoCum,"GiantCupcake",gcupcake,rubiT,rubiB,"Leave",telAdreMenu);
        DisplayText().clear();
        DisplayText("Who will you talk to?\n");
        let rubiT: string = "Waitress";
        if (Flags.list[FlagEnum.RUBI_INTRODUCED] > 0) rubiT = "Rubi";
        
        MainScreen.addButton(0, "Baker", talkToBaker);

        // rubiIntros returns 0 if you've driven rubi away
        // I'm actually not sure how this was *supposed* to work, since it would just call eventParser with a event of 0 
        // I guess it just wouldn't do anything?
        // FWIW, the flag that has to be set to get rubiIntros to return zero is set in a function that has the comment:
        //(Will no longer encounter Rubi at the bakery.)
        let rubiB: Function = telAdre.rubi.rubiIntros();
        if (rubiB != null) MainScreen.addButton(1, rubiT, rubiB);

        if (kGAMECLASS.nieveHoliday()) {
            if (Flags.list[FlagEnum.KAMI_ENCOUNTER] > 0) {
                DisplayText("\nYou could 'burn off some steam' with Kami during her lunch break, since you already know how that'll end up!\n");
                MainScreen.addButton(2, "Kami", kGAMECLASS.approachKamiTheChristmasRoo);
            }
            else {
                DisplayText("\nYou could summon the curvaceous kangaroo waitress you ran into earlier - perhaps you can win her over.\n");
                MainScreen.addButton(2, "Kangaroo", kGAMECLASS.approachKamiTheChristmasRoo);
            }
        }
        DisplayText("\nYou see a bubblegum-pink girl at the bakery, walking around and eagerly trying to hand out fliers to people. Her “uniform” is more like a yellow bikini with frills circling the waist of the bottom half. If this didn’t make her stand out from the crowd then her hair certainly would; it’s a big, poofy, curly, dark pink mess that reaches down to her ass with a huge cupcake hat sitting on top.\n");
        if (Flags.list[FlagEnum.MET_FROSTY] != 0) MainScreen.addButton(3, "Frosty", kGAMECLASS.telAdre.frosty.approachFrosty);
        else MainScreen.addButton(3, "PinkGirl", kGAMECLASS.telAdre.frosty.approachFrosty);
        MainScreen.addButton(9, "Leave", bakeryuuuuuu);
    }

    public nomnomnom(name: string, price: number) {
        Flags.list[FlagEnum.TEMP_STORAGE_PASTRY_NAME] = name;
        Flags.list[FlagEnum.TEMP_STORAGE_PASTRY_PRICE] = price;
        DisplayText().clear();
        if (player.inventory.gems < Flags.list[FlagEnum.TEMP_STORAGE_PASTRY_PRICE]) {
            DisplayText("You don't have enough gems to order that!");
            //return { next: bakeryuuuuuu };
            
            MainScreen.addButton(0, "Next", checkBakeryMenu);
            return;
        }
        player.inventory.gems -= Flags.list[FlagEnum.TEMP_STORAGE_PASTRY_PRICE];
        statScreenRefresh();
        if (Flags.list[FlagEnum.TEMP_STORAGE_PASTRY_NAME] === "eclair") {
            DisplayText("You hand over 10 gems and ask for the 'special eclair'.  The centaur working the counter smirks ");
            if (player.tallness <= 52) DisplayText("down ");
            else if (player.tallness >= 84) DisplayText("up ");
            DisplayText("at you gives pulls a cream-filled pastry from a box concealed behind the counter.  It's warm... so very warm, and you try to steady your hands as you walk off to towards a table, sniffing in deep lungfuls of its 'special' scent.  The first bite is heaven, sating a craving you didn't even know you had.  You can't stop yourself from moaning with delight as you drain every drop and finish off the sweet doughnut shell.  The minotaur goo is all over your fingers, but you don't mind licking them all clean.  With the lust now you now feel burning inside you, you even try to make a show of it.  Though you make a few ");
            if (player.femininity >= 75) DisplayText("males fill their pants");
            else if (player.femininity <= 25) DisplayText("females squirm");
            else DisplayText("other patrons squirm and fill out their pants");
            DisplayText(", none of them tries to make a move.  Pity.");
            dynStats("lus", (20 + player.stats.lib / 10));
            player.minoCumAddiction(10);
        }
        else {
            DisplayText("You hand over " + numToCardinalText(Flags.list[FlagEnum.TEMP_STORAGE_PASTRY_PRICE]) + " gems and get your " + Flags.list[FlagEnum.TEMP_STORAGE_PASTRY_NAME] + ".  A moment later you're at a table, licking the sugary residue from your fingertips and wondering just how they make the food so damned good.");
            if (Flags.list[FlagEnum.TEMP_STORAGE_PASTRY_NAME] === "doughnuts") {
                DisplayText(player.modTone(0, 2));
                DisplayText(player.modThickness(100, 1));
                if (randInt(3) === 0 && player.torso.butt.rating < 15) {
                    DisplayText("\n\nWhen you stand back up your " + Desc.Butt.describeButt(player) + " jiggles a little bit more than you'd expect.");
                    player.torso.butt.rating++;
                }
                if (randInt(3) === 0 && player.torso.hipRating < 15) {
                    DisplayText("\n\nAfter finishing, you find your gait has changed.  Did your hips widen?");
                    player.torso.hipRating++;
                }
            }
            else if (Flags.list[FlagEnum.TEMP_STORAGE_PASTRY_NAME] === "cookies") {
                DisplayText(player.modTone(0, 1));
                DisplayText(player.modThickness(100, 2));
                if (randInt(3) === 0 && player.torso.hipRating < 20) {
                    DisplayText("\n\nAfter finishing, you find your gait has changed.  Did your hips widen?");
                    player.torso.hipRating++;
                }
            }
            else if (Flags.list[FlagEnum.TEMP_STORAGE_PASTRY_NAME] === "brownies") {
                DisplayText(player.modThickness(100, 4));
                if (randInt(2) === 0 && player.torso.hipRating < 30) {
                    DisplayText("\n\nAfter finishing, you find your gait has changed.  Your " + Desc.Hip.describeHips(player) + " definitely got wider.");
                    player.torso.hipRating += 2;
                }
            }
            else if (Flags.list[FlagEnum.TEMP_STORAGE_PASTRY_NAME] === "cupcakes") {
                DisplayText(player.modTone(0, 4));
                if (randInt(2) === 0 && player.torso.butt.rating < 30) {
                    DisplayText("\n\nWhen you stand back up your " + Desc.Butt.describeButt(player) + " jiggles with a good bit of extra weight.");
                    player.torso.butt.rating += 2;
                }
            }
            else if (Flags.list[FlagEnum.TEMP_STORAGE_PASTRY_NAME] === "pound cake") {
                DisplayText(player.modTone(0, 2));
                DisplayText(player.modThickness(100, 2));
                if (randInt(3) === 0 && player.torso.butt.rating < 25) {
                    DisplayText("\n\nWhen you stand back up your " + Desc.Butt.describeButt(player) + " jiggles a little bit more than you'd expect.");
                    player.torso.butt.rating++;
                }
                if (randInt(3) === 0 && player.torso.hipRating < 25) {
                    DisplayText("\n\nAfter finishing, you find your gait has changed.  Did your " + Desc.Hip.describeHips(player) + " widen?");
                    player.torso.hipRating++;
                }
            }
        }
        //return { next: bakeryuuuuuu };
        
        MainScreen.addButton(0, "Next", checkBakeryMenu);
    }
    /*[doughnuts] – some thickness, lots of – tone. (+hips and butt!)
    [cookies] – thickness and a little – tone (+hips)
    [brownies] – lots of thickness (chance of +butt)
    [cupcakes] – lots of – tone (chance of +hips)
    [pound cake] – even split of + thickness and – tone.  (+butt)
    [mino cum eclair] – helps your cravings and – tone!, LUST!*/

    public buySlutCake() {
        DisplayText().clear();
        if (player.inventory.gems < 500) {
            DisplayText("You don't have enough gems for one of those!");
            //return { next: bakeryuuuuuu };
            
            MainScreen.addButton(0, "Next", checkBakeryMenu);
            return;
        }
        DisplayText("The minotaur chef emerges from the backroom bearing a box that contains your cupcake.  It's too big to scarf down immediately.\n\n");
        player.inventory.gems -= 500;
        statScreenRefresh();
        inventory.takeItem(consumables.CCUPCAK, bakeryuuuuuu);
    }

    private buyFoxBerry() {
        DisplayText().clear();
        if (player.inventory.gems < 5) {
            DisplayText("You can't afford one of those!");
            
            MainScreen.addButton(0, "Next", ingredientsMenu);
            return;
        }
        DisplayText("You pay five gems for a fox berry.  ");
        player.inventory.gems -= 5;
        statScreenRefresh();
        inventory.takeItem(consumables.FOXBERY, ingredientsMenu);
    }


    private easterBakeSale() {
        DisplayText().clear();
        DisplayText("You make your way to the bakery only to find that it's so full you can barely squeeze inside.  ");
        if (telAdre.rubi.rubiAffection() >= 40) DisplayText("An extremely busy Rubi can only manage a wave in your direction before going back to attending customers.  ");
        DisplayText("Seeing all of the holiday bustle hits you with a pang of homesickness, remembering times from Ingnam.  Shaking these feelings off, you make your way to the front of the queue determined to see what the fuss is about.  The normally absent minotaurus chef greets you, adding fuel to your notion that they are understaffed.");
        DisplayText("\n\n\"<i>Hello.  You come here often?  We busy.  Will try to do good.</i>\"");
        //[Check Menu] [Offer Help]
        
        MainScreen.addButton(3, "Check Menu", checkBakeryMenu);
        MainScreen.addButton(0, "Offer Help", easterBakeSaleHelp);
        MainScreen.addButton(4, "Leave", telAdre.telAdreMenu);
    }

    private easterBakeSaleHelp() {
        DisplayText().clear();
        //[Offer Help]
        DisplayText("Determined to see if there is anything you can help with, you offer your assistance to the chef.  He responds to you in his usual briskness, \"<i>You help.  Go in back.  Make pastries.</i>\"  You ask if he'd rather you help with the chocolate eggs that are flying out of his door, but he declines and almost laughs at you.  \"<i>No.  I make eggs.  No one else.</i>\"");
        DisplayText("\n\nYou head into the back and take a seat while you wait for the chef to come give you directions.  After what seems like an age in the sweltering heat given off by the ovens, the chef finds a moment to pop in to direct you.  Pointing out the equipment you'll need, he lays out some ingredients you recognise.  However, to your horror he doesn't leave out any milk!  Upon questioning this he laughs and points to you, \"<i>You make milk.  Other milk not so good.</i>\"");
        DisplayText("\n\nExasperated but decided on helping out, ideas race through your mind as to how you can get enough milk for the pastries.  Seeing the panic on your face, the minotaur once again laughs.  Among the ingredients he put out for you is a small jar of a blue fluid that seems to be constantly boiling.  He picks this up and hands it to you, evidently expecting you to know what it is because afterwards he turns around and goes back to the front.");
        DisplayText("\n\nStill unsure exactly what to do, you sit where you are in disbelief at your situation before your curiosity gets the better of you, deciding you must examine these eggs for yourself.  Walking over to one of the few that are left in the back, you pick it up to find it is innately warm.  It takes all your composure not to drop it at this, but you press onwards.  Not only does it feel warm, it seems to be taking the heat out of your hands.  A lewd thought passes in your mind, imagining a chocolate person coming out of the egg, tendrils dripping off of them like sticky aftersex.  Surprised at your own audacity, you put the egg down again wondering where the thought came from.  Remembering why you are back here, your dilemma returns to the forefront of your mind with pressing urgency.  You walk over and pick up the jar of blue liquid; it is far more viscous than you imagined.  Taking everything into consideration, you're helping out here.  There would be no reason for the minotaur to give you something with hostile intent, so you decide to trust your gut and to drink the strange elixir.  Not wanting to down the whole thing, you quickly find a measuring cup to use for your drink and pour yourself some.  Bottoms up...");
        DisplayText("\n\nA euphoric wave passes through you, emanating from the drink slowly filling your stomach.  The drink fills you with, if nothing else, the newfound fury of a madman for solving your problem.  Lurching forward, you are certain that if nothing else, the solution to your impasse must be contained within.  ");
        //(If the player has tits)
        if (player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].rating >= 1) DisplayText("Your [fullChest] bounce at the vigor of your movement.  ");
        DisplayText("Going over the egg like an elaborate puzzle with its secrets only limited by your ability to unlock them, you are delighted to feel a stir of movement from within.  The heat is leaving not only your hands, but the entire room now, bringing the bristling heat down until you're sure it's cooler in here than outside with the swarm of customers.");
        DisplayText("\n\nThe egg you've been holding in your hands begins to almost shake; you set it down to avoid the risk of you dropping it.  It turns out you put it down just in time, as a chocolate eruption sprays out of the egg towards the ceiling with more force than a geyser.  Climbing from the remains of the egg, a voluptuously bodied chocolate herm emerges, intents obvious from the equipment already erect and slavering.  You can't help but size her up, noting her full DD cup breasts and a dick you judge to be about 14 inches.  Her sensual gait as she makes her way over to you is nothing short of evil in the way it brings heat to your crotch, ");
        //(if the pc is male)
        if (player.gender === Gender.MALE) DisplayText("[eachCock] jumps to full hardness.");
        //(if the pc is female)
        else if (player.torso.vaginas.count > 0) DisplayText("your nipples stiffening noticeably, while your [vagina] prepares for what's to come.");
        //(if the pc is a herm)
        else DisplayText("[eachCock jumping to full hardness, your nipples and [vagina] not far behind in getting ready for your encounter.");
        DisplayText("\n\nThe euphoria from your earlier drink fades, replaced by a more animalistic need.");
        
        MainScreen.addButton(0, "Next", malesHelpOutWithEaster);
    }

    //[Male]
    private malesHelpOutWithEaster() {
        DisplayText().clear();
        DisplayText("A idea crosses your mind; why not have the molten girl help you with your problem?  As if reading your mind, the girl continues her way to you, making her way with her eyes locked on your [cock biggest].  She is upon you now, flaccid streams drooling off her hand as she makes to grab your cock.  A heated pressure envelopes your shaft");
        if (player.torso.balls.quantity > 0) DisplayText(", sticky drops of chocolate trailing down your [balls]");
        DisplayText(", each movement a not unpleasant sensation as the warmth infuses you.  The center of the pressure loosens, and your chocolate partner takes it upon herself to pin you to the floor, her warmness surrounding you.  Almost immediately you feel a similar pressure to the previous upon your groin, pulsating now as if stroking your cock in earnest.  You work out that she has enveloped your rod in what you assume is a vagina.  As if to confirm your suspicions, your captor lets out a small moan, increasing the fervor with which she rings out your dong.");
        DisplayText("\n\nUnable now to contain your own lust, you start idly pumping into her velvety depths, the extreme warmth of which does nothing to discourage you.  Delighted by your newfound vigor, the mass riding you lets a sound out halfway between a squeal and a moan, increasing the vehemence of her own ministrations.  You pull your hand free from its prison only to thrust it higher up, gripping the highly malleable breast of the buxom girl.  Increasing the intensity of your pelvic endeavor, you elicit another moan from the bodacious vixen's lips, only adding fuel to your frenzied motions.  Jamming into her depths, intense heat assaults your body.  As if setting a spark to kindling, a torrid wave sweeps through you before you realize you are towards your limit.");
        DisplayText("\n\nDecided on making your mate peak before you, your attention turns to bringing pleasure from your awkward thrusts into her depths.  Finding your current position lacking the dominance you need for your vision, you struggle out from beneath the heated woman, leaving her confused with her ass in the air.  Satisfied with your new arrangement, you take up position behind her and push your hand into her pussy, testing its plasticity.  Wasting no more time, you line up your [cock biggest] with the woman's opening and administer your entire length in a quick thrust.  The woman openly moans from your treatment of her depths.  Still remembering your goal, you bring your hand down and find a harder globule of chocolate that must be her clitoris.  While passively administering jabs into her pussy, you concentrate your fingers on her love button, rubbing with both tenderness and vigor.  Moaning openly now, the girl lets out a keening wail that puts you dangerously close to the edge yourself.  With a final burst of energy you aren't sure you can afford, you begin plunging into her silky breach with near desperation.");

        DisplayText("\n\nYour chocolate counterpart is now screaming with a passion unmatched by even yourself, while you ram as fast as your [legs] will allow.  The girl's other equipment is also reaching its limit, convulsing as if about to burst.  The shriek the woman emits is nothing short of ear-shattering as she cums, chocolate raining down on you.  ");
        //[SILLYMODE]
        if (User.settings.silly()) DisplayText("You regret not bringing your umbrella for this Chocolate Rain, so that you could be like those that stay dry rather than those who feel the pain.  ");
        DisplayText("Her rod is only seconds behind, emitting a stream of what appears to be white chocolate at least three feet into the air, sputtering three or four strands before calming down.  The girl collapses in a heap, bringing your conjoined genitals down as well.  You are not quite done, your own rod deep into her folds, quickly bringing yourself to your own orgasm.");
        //(small cum vol)
        if (player.cumQ() < 250) DisplayText("\n\nYour cock spits out a few streams into her expanse, thick cords of aftersex connecting you and your partner even as you pull away.");
        //(med cum vol)
        else if (player.cumQ() < 500) DisplayText("\n\nYour cock shoots out several significant streams of seed, filling your partner's deepness while a small amount dribbles out.");
        //(large cum vol)
        else if (player.cumQ() < 1000) DisplayText("Your cock spews out a significant amount of seed, filling your partners deepness quickly while a small volume shoots out with some force.  You are happy to see that she seems to have gained a little weight from your baby-batter.");
        //(very large cum vol)
        else if (player.cumQ() < 5000) DisplayText("Your cock spews into your partner's deepness, filling it almost instantly while a significant volume splatters out.  You are happy to see she seems to have gained a little weight from your baby-batter.");
        else DisplayText("Your cock opens like a river, streaming into your partner with such force that her belly distends.  A spew begins to erupt from her vagina, empting the significant amount she could not take on to the floor.  You are happy to see she has gained some weight from your baby-batter.");
        DisplayText("  It's about all you can do to get to the floor before passing out.  So much for helping.  In the back of your mind you picture the minotaur with a smug grin as your consciousness fades.");
        DisplayText("\n\n<b>Later...</b>");
        DisplayText("\nYou stumble back to camp, still somewhat out of it from your experience.");
        player.orgasm();
        player.stats.lib += 1;
        player.cumMultiplier += 2;
        return { next: Scenes.camp.returnToCampUseOneHour };
    }
}
}