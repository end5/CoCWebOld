export default class MainMenu {
    //MainMenu - kicks player out to the main menu
    public static display() {

        hideStats();
        //Reset newgame buttons
        mainView.setMenuButton(MainView.MENU_NEW_MAIN, "New Game", charCreation.newGameGo);
        mainView.hideAllMenuButtons();
        mainView.showMenuButton(MainView.MENU_NEW_MAIN);
        mainView.showMenuButton(MainView.MENU_DATA);
        //Sets game state to 3, used for determining back functionality of save/load menu.
        gameState = 3;


        MainScreen.text("<b>Corruption of Champions (" + version + ")</b>", true);

        if (CoC_Settings.debugBuild)
            MainScreen.text(" Debug Build.");
        else
            MainScreen.text(" Release Build");

        //doThatTestingThang();

        startupScreenBody();

        let resume: Function = null;
        if (player.str > 0)  //we're in a game, allow resume.
            resume = playerMenu;


        // I really wanted to only have the "imageCreditsScreen" button if images were found, but it turns out
        // that if you check if any images were found immediately when this screen is shown, you get 0
        // since the images haven't loaded yet.
        // Therefore, the imageCreditScreen will just have to say "No image pack" if you don't have any images

        choices("", null,
            "Image Credits", imageCreditsScreen,
            "Credits", creditsScreen,
            "", null,
            "Instructions", howToPlay,
            "Debug Info", debugPane,
            "", null,
            "", null,
            "Settings", settingsScreen,
            "Resume", resume);

        if (false)  // Conditionally jump into chaosmonkey IMMEDIATELY
        {
            this.monkey.throwOnSyntaxError = true;
            this.monkey.excludeMenuKeys = true;			// Syntax checking monkey should ignore the menu keys (they're irrelevant to it's functions)
            this.initiateTheMonkey()
        }
    }

    public startupScreenBody(): void {

        // NO FUCKING DECENT MULTI-LINE STRING LITERALS BECAUSE FUCKING STUPID
        // WTF ACTIONSCRIPT YOUR DEV'S ARE ON CRACK

        MainScreen.text(`<![CDATA[
        <br>(Formerly Unnamed Text Game)  
        <u>Created by: Fenoxo</u>

        Edited By:<br>
        &nbsp; &nbsp; &nbsp; Ashi, SoS, Prisoner416, Zeikfried, et al

        Open-source contributions by:<br>
        &nbsp; &nbsp; &nbsp; aimozg, Amygdala, Cmacleod42, Enterprise2001, Fake-Name, Gedan, Yoffy, et al

        Source Code: <u><a href='https://github.com/herp-a-derp/Corruption-of-Champions'>https://github.com/herp-a-derp/Corruption-of-Champions</a></u>

        Bug Tracker: <u><a href='https://github.com/herp-a-derp/Corruption-of-Champions/issues'>https://github.com/herp-a-derp/Corruption-of-Champions/issues</a></u>  
        (requires an account, unfortunately)

        **<u>DISCLAIMER</u>**
        <br>- **There are many strange and odd fetishes contained in this flash.  Peruse at own risk.**
        <br>- **Please be 18 or the legal age to view porn before playing.**
        <br>- **Try to keep your keyboard clean.  Think of the children!**


        For more information see Fenoxo's Blog at <b><u><a href='http://www.fenoxo.com/'>fenoxo.com</a></u></b>.

        Also go play <u><a href='http://www.furaffinity.net/view/9830293/'>Nimin</a></u> by Xadera on furaffinity.

	`]]>, false, true);

        if (debug)
            MainScreen.text("\n\n<b>DEBUG MODE ENABLED:  ITEMS WILL NOT BE CONSUMED BY USE.</b>");
        if (flags[FlagEnum.SHOW_SPRITES_FLAG])
            MainScreen.text("\n\n<b>Sprites disabled.</b>");
        if (flags[FlagEnum.EASY_MODE_ENABLE_FLAG])
            MainScreen.text("\n\n<b>Easy Mode On:  Bad-ends can be ignored.</b>");
        if (flags[FlagEnum.SILLY_MODE_ENABLE_FLAG])
            MainScreen.text("\n\n<b>SILLY MODE ENGAGED: Crazy, nonsensical, and possibly hilarious things may occur.</b>");
        if (isEaster())
            MainScreen.text("\n\n<b>It's Easter!  Enjoy the eggs!</b>");
        if (isValentine())
            MainScreen.text("\n\n<b>It's Valentine's!</b>");
        if (helFollower.isHeliaBirthday())
            MainScreen.text("\n\n<b>It's Helia's Birthday Month!</b>");


    }

    public settingsScreen(): void {
        mainView.showMenuButton(MainView.MENU_NEW_MAIN);
        mainView.showMenuButton(MainView.MENU_DATA);

        MainScreen.text("<b>Settings toggles:</b>\n", true);

        if (debug)
            MainScreen.text("Debug mode enabled: <b>Yes</b>\n	Items will not be consumed by use, fleeing always succeeds, and bad-ends can be ignored.");
        else
            MainScreen.text("Debug mode enabled: <b>No</b>\n	Items consumption will occur as normal.");

        MainScreen.text("\n\n");

        if (flags[FlagEnum.SHOW_SPRITES_FLAG] == 0)
            MainScreen.text("Sprites enabled: <b>Yes</b>.\n	You like to look at pretty pictures.");
        else
            MainScreen.text("Sprites enabled: <b>No</b>.\n	There are only words. Nothing else.");

        MainScreen.text("\n\n");

        if (flags[FlagEnum.EASY_MODE_ENABLE_FLAG])
            MainScreen.text("Easy Mode <b>On</b>\n	Bad-ends can be ignored and combat is easier.");
        else
            MainScreen.text("Easy Mode <b>Off</b>\n	Bad-ends can ruin your game and combat is challenging.");

        MainScreen.text("\n\n");

        if (flags[FlagEnum.SILLY_MODE_ENABLE_FLAG])
            MainScreen.text("Silly Mode <b>On</b>\n	Crazy, nonsensical, and possibly hilarious things may occur.");
        else
            MainScreen.text("Silly Mode <b>Off</b>\n	You're an incorrigable stick-in-the-mud with no sense of humor.");

        MainScreen.text("\n\n");
        MainScreen.text("<b>The following flags are not fully implemented yet (e.g. they don't apply in <i>all</i> cases where they could be relevant).</b>\n");
        MainScreen.text("Additional note: You <b>must</b> be <i>in a game session</i> (e.g. load your save, hit \"Main Menu\", change the flag settings, and then hit \"Resume\") to change these flags. They're saved into the saveGame file, so if you load a save, it will clear them to the state in that save.");
        MainScreen.text("\n\n");

        if (flags[FlagEnum.LOW_STANDARDS_FOR_ALL]) {
            MainScreen.text("Low standards Mode <b>On</b>\n	NPCs ignore body type preferences.");
            MainScreen.text("\n	(Not gender preferences though. You still need the right hole.)");
        }
        else
            MainScreen.text("Low standards Mode <b>Off</b>\n	NPCs have body-type preferences.");


        MainScreen.text("\n\n");

        if (flags[FlagEnum.HYPER_HAPPY]) {
            MainScreen.text("Hyper Happy mode <b>On</b>\n	Only reducto and humus shrink endowments.");
            MainScreen.text("\n	Incubus draft doesn't affect breasts, and succubi milk doesn't affect cocks.")
        }
        else
            MainScreen.text("Hyper Happy mode <b>Off</b>\n	Male enhancement potions shrink female endowments, and vice versa.");

        choices("Toggle Debug", toggleDebug,
            "Sprite Toggle", toggleSpritesFlag,
            "EZ Mode", toggleEasyModeFlag,
            "Larger Font", incFontSize,
            "Controls", displayControls,
            "Hyper Happy", toggleHyperHappy,
            "Low Standards", toggleStandards,
            "Silly Toggle", toggleSillyFlag,
            "Smaller Font", decFontSize,
            "Back", mainMenu);
    }

    public incFontSize(): void {
        let fmt: TextFormat = mainView.mainText.getTextFormat();

        if (fmt.size == null) fmt.size = 20;

        fmt.size = (fmt.size as Number) + 1;

        if ((fmt.size as Number) > 32) fmt.size = 32;

        trace("Font size set to: " + (fmt.size as Number));
        mainView.mainText.setTextFormat(fmt);
        flags[FlagEnum.CUSTOM_FONT_SIZE] = fmt.size;
    }

    public decFontSize(): void {
        let fmt: TextFormat = mainView.mainText.getTextFormat();

        if (fmt.size == null) fmt.size = 20;

        fmt.size = (fmt.size as Number) - 1;

        if ((fmt.size as Number) < 14) fmt.size = 14;

        trace("Font size set to: " + (fmt.size as Number));
        mainView.mainText.setTextFormat(fmt);
        flags[FlagEnum.CUSTOM_FONT_SIZE] = fmt.size;
    }

    public toggleStandards(): void {
        //toggle debug
        if (flags[FlagEnum.LOW_STANDARDS_FOR_ALL])
            flags[FlagEnum.LOW_STANDARDS_FOR_ALL] = false;
        else
            flags[FlagEnum.LOW_STANDARDS_FOR_ALL] = true;
        settingsScreen();
        return;
    }

    public toggleHyperHappy(): void {
        //toggle debug
        if (flags[FlagEnum.HYPER_HAPPY])
            flags[FlagEnum.HYPER_HAPPY] = false;
        else
            flags[FlagEnum.HYPER_HAPPY] = true;
        settingsScreen();
        return;
    }

    public toggleDebug(): void {
        //toggle debug
        if (debug)
            debug = false;
        else
            debug = true;

        mainView.showMenuButton(MainView.MENU_DATA);
        settingsScreen();
        return;
    }

    public toggleEasyModeFlag(): void {
        if (flags[FlagEnum.EASY_MODE_ENABLE_FLAG] == 0)
            flags[FlagEnum.EASY_MODE_ENABLE_FLAG] = 1;
        else
            flags[FlagEnum.EASY_MODE_ENABLE_FLAG] = 0;
        settingsScreen();
        mainView.showMenuButton(MainView.MENU_DATA);
        settingsScreen();
        return;
    }

    public toggleSpritesFlag(): void {
        if (flags[FlagEnum.SHOW_SPRITES_FLAG])
            flags[FlagEnum.SHOW_SPRITES_FLAG] = false;
        else
            flags[FlagEnum.SHOW_SPRITES_FLAG] = true;
        settingsScreen();
        return;
    }

    public toggleSillyFlag(): void {

        if (flags[FlagEnum.SILLY_MODE_ENABLE_FLAG])
            flags[FlagEnum.SILLY_MODE_ENABLE_FLAG] = false;
        else
            flags[FlagEnum.SILLY_MODE_ENABLE_FLAG] = true;
        settingsScreen();
        return;

    }


    public creditsScreen(): void {
        MainScreen.text("<b>Coding and Main Events:</b>\n", true);
        MainScreen.text("<ul>");
        MainScreen.text("<li> Fenoxo</li>\n");
        MainScreen.text("</ul>");
        MainScreen.text("<b>Typo Reporting</b>\n");
        MainScreen.text("<ul>");
        MainScreen.text("<li> SoS</li>");
        MainScreen.text("<li> Prisoner416</li>");
        MainScreen.text("<li> Chibodee</li>");
        MainScreen.text("</ul>");
        MainScreen.text("");
        MainScreen.text("<b>Graphical Prettiness:</b>")
        MainScreen.text("<ul>");;
        MainScreen.text("<li> Dasutin (Background Images)</li>");
        MainScreen.text("<li> Invader (Button Graphics, Font, and Other Hawtness)</li>");
        MainScreen.text("</ul>");
        MainScreen.text("<b>Supplementary Events:</b>");
        MainScreen.text("<ul>");
        MainScreen.text("<li> Dxasmodeus (Tentacles, Worms, Giacomo)</li>");
        MainScreen.text("<li> Kirbster (Christmas Bunny Trap)</li>");
        MainScreen.text("<li> nRage (Kami the Christmas Roo)</li>");
        MainScreen.text("<li> Abraxas (Alternate Naga Scenes w/Various Monsters, Tamani Anal, Female Shouldra Tongue Licking, Chameleon Girl, Christmas Harpy)</li>");
        MainScreen.text("<li> Astronomy (Fetish Cultist Centaur Footjob Scene)</li>");
        MainScreen.text("<li> Adjatha (Scylla the Cum Addicted Nun, Vala, Goo-girls, Bimbo Sophie Eggs, Ceraph Urta Roleplay, Gnoll with Balls Scene, Kiha futa scene, Goblin Web Fuck Scene, and 69 Bunny Scene)</li>");
        MainScreen.text("<li> ComfyCushion (Muff Wrangler)</li>");
        MainScreen.text("<li> B (Brooke)</li>");
        MainScreen.text("<li> Quiet Browser (Half of Niamh, Ember, Amily The Mouse-girl Breeder, Katherine, Part of Katherine Employment Expansion, Urta's in-bar Dialogue Trees, some of Izma, Loppe)</li>");
        MainScreen.text("<li> Indirect (Alternate Non-Scylla Katherine Recruitment, Part of Katherine Employment Expansion, Phouka, Coding of Bee Girl Expansion)</li>");
        MainScreen.text("<li> Schpadoinkle (Victoria Sex)</li>");
        MainScreen.text("<li> Donto (Ro'gar the Orc, Polar Pete)</li>");
        MainScreen.text("<li> Angel (Additional Amily Scenes)</li>");
        MainScreen.text("<li> Firedragon (Additional Amily Scenes)</li>");
        MainScreen.text("<li> Danaume (Jojo masturbation texts)</li>");
        MainScreen.text("<li> LimitLax (Sand-Witch Bad-End)</li>");
        MainScreen.text("<li> KLN (Equinum Bad-End)</li>");
        MainScreen.text("<li> TheDarkTemplar11111 (Canine Pepper Bad End)</li>");
        MainScreen.text("<li> Silmarion (Canine Pepper Bad End)</li>");
        MainScreen.text("<li> Soretu (Original Minotaur Rape)</li>");
        MainScreen.text("<li> NinjArt (Small Male on Goblin Rape Variant)</li>");
        MainScreen.text("<li> DoubleRedd (\"Too Big\" Corrupt Goblin Fuck)</li>");
        MainScreen.text("<li> Nightshade (Additional Minotaur Rape)</li>");
        MainScreen.text("<li> JCM (Imp Night Gangbang, Addition Minotaur Loss Rape - Oral)</li>");
        MainScreen.text("<li> Xodin (Nipplefucking paragraph of Imp GangBang, Encumbered by Big Genitals Exploration Scene, Big Bits Run Encumbrance, Player Getting Beer Tits, Sand Witch Dungeon Misc Scenes)</li>");
        MainScreen.text("<li> Blusox6 (Original Queen Bee Rape)</li>");
        MainScreen.text("<li> Thrext (Additional Masturbation Code, Faerie, Ivory Succubus)</li>");
        MainScreen.text("<li> XDumort (Genderless Anal Masturbation)</li>");
        MainScreen.text("<li> Uldego (Slime Monster)</li>");
        MainScreen.text("<li> Noogai, Reaper, and Numbers (Nipple-Fucking Victory vs Imp Rape)</li>");
        MainScreen.text("<li> Verse and IAMurow (Bee-Girl MultiCock Rapes)</li>");
        MainScreen.text("<li> Sombrero (Additional Imp Lust Loss Scene (Dick insertion ahoy!)</li>");
        MainScreen.text("<li> The Dark Master (Marble, Fetish Cultist, Fetish Zealot, Hellhound, Lumi, Some Cat Transformations, LaBova, Ceraph's Cat-Slaves, a Cum Witch Scene, Mouse Dreams, Forced Nursing:Imps&Goblins, Bee Girl Expansion)</li>");
        MainScreen.text("<li> Mr. Fleshcage (Cat Transformation/Masturbation)</li>");
        MainScreen.text("<li> Spy (Cat Masturbation, Forced Nursing: Minotaur, Bee, & Cultist)</li>");
        MainScreen.text("<li> PostNuclearMan (Some Cat TF)</li>");
        MainScreen.text("<li> MiscChaos (Forced Nursing: Slime Monster)</li>");
        MainScreen.text("<li> Ourakun (Kelt the Centaur)</li>");
        MainScreen.text("<li> Rika_star25 (Desert Tribe Bad End)</li>");
        MainScreen.text("<li> Versesai (Additional Bee Rape)</li>");
        MainScreen.text("<li> Mallowman (Additional Bee Rape)</li>");
        MainScreen.text("<li> HypnoKitten (Additional Centaur x Imp Rape)</li>");
        MainScreen.text("<li> Ari (Minotaur Gloryhole Scene)</li>");
        MainScreen.text("<li> SpectralTime (Aunt Nancy)</li>");
        MainScreen.text("<li> Foxxling (Akbal)</li>");
        MainScreen.text("<li> Elfensyne (Phylla)</li>");
        MainScreen.text("<li> Radar (Dominating Sand Witches, Some Phylla)</li>");
        MainScreen.text("<li> Jokester (Sharkgirls, Izma, & Additional Amily Scenes)</li>");
        MainScreen.text("<li> Lukadoc (Additional Izma, Ceraph Followers Corrupting Gangbang, Satyrs, Ember)</li>");
        MainScreen.text("<li> IxFa (Dildo Scene, Virgin Scene for Deluxe Dildo, Naga Tail Masturbation)</li>");
        MainScreen.text("<li> Bob (Additional Izma)</li>");
        MainScreen.text("<li> lh84 (Various Typos and Code-Suggestions)</li>");
        MainScreen.text("<li> Dextersinister (Gnoll girl in the plains)</li>");
        MainScreen.text("<li> ElAcechador, Bandichar, TheParanoidOne, Xoeleox (All Things Naga)</li>");
        MainScreen.text("<li> Symphonie (Dominika the Fellatrix, Ceraph RPing as Dominika, Tel'Adre Library)</li>");
        MainScreen.text("<li> Soulsemmer (Ifris)</li>");
        MainScreen.text("<li> WedgeSkyrocket (Zetsuko, Pure Amily Anal, Kitsunes)</li>");
        MainScreen.text("<li> Zeikfried (Anemone, Male Milker Bad End, Kanga TF, Raccoon TF, Minotaur Chef Dialogues, Sheila, and More)</li>");
        MainScreen.text("<li> User21 (Additional Centaur/Naga Scenes)</li>");
        MainScreen.text("<li> ~M~ (Bimbo + Imp loss scene)</li>");
        MainScreen.text("<li> Grype (Raping Hellhounds)</li>");
        MainScreen.text("<li> B-Side (Fentendo Entertainment Center Silly-Mode Scene)</li>");
        MainScreen.text("<li> Not Important (Face-fucking a defeated minotaur)</li>");
        MainScreen.text("<li> Third (Cotton, Rubi, Nieve, Urta Pet-play)</li>");
        MainScreen.text("<li> Gurumash (Parts of Nieve)</li>");
        MainScreen.text("<li> Kinathis (A Nieve Scene, Sophie Daughter Incest, Minerva)</li>");
        MainScreen.text("<li> Jibajabroar (Jasun)</li>");
        MainScreen.text("<li> Merauder (Raphael)</li>");
        MainScreen.text("<li> EdgeofReality (Gym fucking machine)</li>");
        MainScreen.text("<li> Bronycray (Heckel the Hyena)</li>");
        MainScreen.text("<li> Sablegryphon (Gnoll spear-thrower)</li>");
        MainScreen.text("<li> Nonesuch (Basilisk, Sandtraps, assisted with Owca/Vapula, Whitney Farm Corruption)</li>");
        MainScreen.text("<li> Anonymous Individual (Lilium, PC Birthing Driders)</li>");
        MainScreen.text("<li> PKD (Owca, Vapula, Fap Arena, Isabella Tentacle Sex, Lottie Tentacle Sex)</li>");
        MainScreen.text("<li> Shamblesworth (Half of Niamh, Shouldra the Ghost-Girl, Ceraph Roleplaying As Marble, Yara Sex, Shouldra Follow Expansion)</li>");
        MainScreen.text("<li> Kirbu (Exgartuan Expansion, Yara Sex, Shambles's Handler, Shouldra Follow Expansion)</li>");
        MainScreen.text("<li> 05095 (Shouldra Expansion, Tons of Editing)</li>");
        MainScreen.text("<li> Smidgeums (Shouldra + Vala threesome)</li>");
        MainScreen.text("<li> FC (Generic Shouldra talk scene)</li>");
        MainScreen.text("<li> Oak (Bro + Bimbo TF, Isabella's ProBova Burps)</li>");
        MainScreen.text("<li> Space (Victory Anal Sex vs Kiha)</li>");
        MainScreen.text("<li> Venithil (LippleLock w/Scylla & Additional Urta Scenes)</li>");
        MainScreen.text("<li> Butts McGee (Minotaur Hot-dogging PC loss, Tamani Lesbo Face-ride, Bimbo Sophie Mean/Nice Fucks)</li>");
        MainScreen.text("<li> Savin (Hel the Salamander, Valeria, Spanking Drunk Urta, Tower of the Phoenix, Drider Anal Victory, Hel x Isabella 3Some, Centaur Sextoys, Thanksgiving Turkey, Uncorrupt Latexy Recruitment, Assert Path for Direct Feeding Latexy, Sanura the Sphinx)</li>");
        MainScreen.text("<li> Gats (Lottie, Spirit & Soldier Xmas Event, Kiha forced masturbation, Goblin Doggystyle, Chicken Harpy Egg Vendor)</li>");
        MainScreen.text("<li> Aeron the Demoness (Generic Goblin Anal, Disciplining the Eldest Minotaur)</li>");
        MainScreen.text("<li> Gats, Shamblesworth, Symphonie, and Fenoxo (Corrupted Drider)</li>");
        MainScreen.text("<li> Bagpuss (Female Thanksgiving Event, Harpy Scissoring, Drider Bondage Fuck)</li>");
        MainScreen.text("<li> Frogapus (The Wild Hunt)</li>");
        MainScreen.text("<li> Fenoxo (Everything Else)</li>");
        MainScreen.text("</ul>");
        MainScreen.text("<b>Oviposition Update Credits - Names in Order Appearance in Oviposition Document</b>");
        MainScreen.text("<ul>");
        MainScreen.text("<li> DCR (Idea, Drider Transformation, and Drider Impreg of: Goblins, Beegirls, Nagas, Harpies, and Basilisks)</li>");
        MainScreen.text("<li> Fenoxo (Bee Ovipositor Transformation, Bee Oviposition of Nagas and Jojo, Drider Oviposition of Tamani)</li>");
        MainScreen.text("<li> Smokescreen (Bee Oviposition of Basilisks)</li>");
        MainScreen.text("<li> Radar (Oviposition of Sand Witches)</li>");
        MainScreen.text("<li> OutlawVee (Bee Oviposition of Goo-Girls)</li>");
        MainScreen.text("<li> Zeikfried (Editing this mess, Oviposition of Anemones)</li>");
        MainScreen.text("<li> Woodrobin (Oviposition of Minotaurs)</li>");
        MainScreen.text("<li> Posthuman (Oviposition of Ceraph Follower)</li>");
        MainScreen.text("<li> Slywyn (Bee Oviposition of Gigantic PC Dick)</li>");
        MainScreen.text("<li> Shaxarok (Drider Oviposition of Large Breasted Nipplecunts)</li>");
        MainScreen.text("<li> Quiet Browser (Bee Oviposition of Urta)</li>");
        MainScreen.text("<li> Bagpuss (Laying Eggs In Pure Amily)</li>");
        MainScreen.text("<li> Eliria (Bee Laying Eggs in Bunny-Girls)</li>");
        MainScreen.text("<li> Gardeford (Helia x Bimbo Sophie Threesomes)</li>");
        MainScreen.text("</ul>");
        MainScreen.text("\nIf I'm missing anyone, please contact me ASAP!  I have done a terrible job keeping the credits up to date!");
        doNext(mainMenu);
    }

    public imageCreditsScreen(): void {

        if (images.getLoadedImageCount() > 0) {
            MainScreen.text(`<![CDATA[

            **Bundled Image Credits:**

            **Yoh - SL **

            * Bee - Girl Monster Image
            * Goo - Girl Monster Image
            * Ceraph Monster Image
            * Sand - Witch(and sandwich)

            ]]>`, true, true);
        }
        else {
            MainScreen.text("<b>No Image-Pack Found!</b>\n", true);
        }
        doNext(mainMenu);
    }

    public howToPlay(): void {
        MainScreen.text("", true);
        MainScreen.text("<b><u>How To Play:</u></b>\nClick the buttons corresponding to the actions you want to take.  Your 'goal' is to obviously put an end to the demonic corruption around you, but do whatever the hell you want.  There is a story but sometimes it's fun to ignore it.\n\n", false);
        MainScreen.text("<b>Exploration:</b>\nThe lake is a safe zone when you start the game.  It's a good place to explore, and Whitney's farm can offer some nice stat boosts to help get you on your feet. Once you feel comfortable, the forest is probably the next safest area, but beware of tentacle monsters.  The desert is the next toughest area, and the mountains offer further challenges.  There are more areas beyond that, but that's a good way to get started.  You'll uncover plenty of new 'places' exploring, which can be accessed from the <b>Places</b> menu.  You'll also find some interesting characters when you try to discover new explorable locations by choosing <b>Explore</b> twice.\n\n", false);
        MainScreen.text("<b>Combat:</b>\nCombat is won by raising an opponent's lust to 100 or taking their HP to 0.  You lose if your enemy does the same to you.  Loss isn't game over, but some losses will make it harder in the future by lowering your stats.  Beware.  Don't be afraid to spam the <b>Run</b> option when you're in over your head.\n\n", false);
        MainScreen.text("<b>Controls:</b>\nThe game features numerous hot-keys to make playing quicker and easier.\nP key - Perks Menu\nD key - Data Menu\nA key - Appearance Screen\n1 Through 5 - The top row of 'choice' buttons.\n6 Through 0 - The bottom row of 'choice' buttons.\nQ through T - Alternative bottom 'choice' hotkeys.\nSpace Bar - Next/Back/Leave\nHome Key - Toggle text field background.\nS key - Stats Screen\n(Save Hotkeys - May not work in all players)\nF1-F5 - Quicksave to slot 1 through 5.  Only works when Data is visible.\nF6-F0 - Quick Load from slots 1-5.\n\n", false);
        MainScreen.text("<b>Save often using the Data Menu</b> - you never know when your journey will come to an end!", false);
        doNext(mainMenu);
    }


}