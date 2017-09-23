import Flags, { FlagEnum } from "../Game/Flags";
import MainScreen, { TopButton } from "./MainScreen";
import Game from "../Game/Game";
import Player from "../Player";
import SaveManager from "../SaveManager";

export default class CharCreationMenu {

    private static customPlayerProfile: Function;

    public static newGamePlus(): void {
        Flags.set(FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP, Game.player.XP);
        if (Flags.get(FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP)) Flags.set(FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP, 1);
        while (Game.player.level > 1) {
            Flags.increase(FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP, Game.player.level * 100);;
            Game.player.level--;
        }
        Flags.set(FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS, Game.player.stats.gems);
        CharCreationMenu.display();
    }

    public static display(): void {
        MainScreen.hideStatsPanel();
        MainScreen.hideTopButton(TopButton.MainMenu);
        MainScreen.hideTopButton(TopButton.Data);
        MainScreen.hideTopButton(TopButton.Stats);
        MainScreen.hideTopButton(TopButton.Perks);
        //If first PC, track status of EZ mode and other such nonsense.
        let silly: number = Flags.get(FlagEnum.SILLY_MODE_ENABLE_FLAG);
        let easy: number = Flags.get(FlagEnum.EASY_MODE_ENABLE_FLAG);
        let sprite: number = Flags.get(FlagEnum.SHOW_SPRITES_FLAG);

        MainScreen.clearText();
        MainScreen.text("You grew up in the small village of Ingnam, a remote village with rich traditions, buried deep in the wilds.  Every year for as long as you can remember, your village has chosen a champion to send to the cursed Demon Realm.  Legend has it that in years Ingnam has failed to produce a champion, chaos has reigned over the countryside.  Children disappear, crops wilt, and disease spreads like wildfire.  This year, <b>you</b> have been selected to be the champion.\n\nWhat is your name?");

        //
        //
        // This is bad and should be fixed later
        //
        //
        MainScreen.html("<input id='charname'></input>");
        //
        //
        //
        //
        //

        MainScreen.hideButtons();
        MainScreen.addButton(0, "OK", CharCreationMenu.chooseName);

        // Reset autosave
        //SaveManager.slotName = "VOID";
        //SaveManager.autoSave = false;

        // RESET DUNGEOn
        //kGAMECLASS.dungeonLoc = 0;
        //kGAMECLASS.inRoomedDungeon = false;
        //kGAMECLASS.inRoomedDungeonResume = null;

        // Hold onto old data for NG+
        let oldPlayer: Player = Game.player;

        //Clear plot storage array!
        Flags.clear();

        //Remember silly/sprite/etc
        if (sprite) Flags.set(FlagEnum.SHOW_SPRITES_FLAG, 1);
        if (easy) Flags.set(FlagEnum.EASY_MODE_ENABLE_FLAG, 1);
        if (silly) Flags.set(FlagEnum.SILLY_MODE_ENABLE_FLAG, 1);
        //Set that jojo debug doesn't need to run
        Flags.set(FlagEnum.UNKNOWN_FLAG_NUMBER_00102, 1);
        Flags.set(FlagEnum.UNKNOWN_FLAG_NUMBER_02999, 3);
        //Time reset
        Time.days = 0;
        model.time.hours = 0;


        //Exploration
        Game.player.explored = 0;
        Game.player.exploredForest = 0;
        Game.player.exploredDesert = 0;
        Game.player.exploredMountain = 0;
        Game.player.exploredLake = 0;
        //PLOTZ
        kGAMECLASS.monk = 0;
        kGAMECLASS.whitney = 0;
        kGAMECLASS.sand = 0;
        //Replaced by flag	kGAMECLASS.beeProgress = 0;
        kGAMECLASS.giacomo = 0;
        //Lets get this bitch started
        kGAMECLASS.inCombat = false;
        //NG+ Clothes reset
        if (Flags.get(FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS) != 0) {
            //Clear Raphael's training variable so it does not effect
            //Weapon strength post-newgame.
            Flags.set(FlagEnum.RAPHAEL_RAPIER_TRANING, 0);

            // check for goo armor
            if (!(oldPlayer.armor)) {
                Game.player.setArmor(oldPlayer.armor);
            }
            else {
                Game.player.setArmor(armors.C_CLOTH);
            }

            Game.player.setWeapon(oldPlayer.weapon);
        }
        //Clothes clear
        else {
            Game.player.setArmor(armors.C_CLOTH);
            Game.player.setWeapon(WeaponLib.FISTS);
        }

        //Clear cocks
        while (Game.player.lowerBody.cockSpot.count() > 0) {
            Game.player.lowerBody.cockSpot.remove(0, 1);
            trace("1 cock purged.");
        }
        //Clear vaginas
        while (Game.player.lowerBody.vaginaSpot.count() > 0) {
            Game.player.removeVagina(0, 1);
            trace("1 vagina purged.");
        }
        //Clear breasts
        Game.player.breastRows = [];

        //Clear Statuses
        while (Game.player.statusAffects.length > 0) {
            Game.player.removeStatuses();
        }
        //Clear old camp slots
        inventory.clearStorage();
        inventory.clearGearStorage();
        //Initialize gearStorage
        inventory.initializeGearStorage();
    }

    private static chooseName(): void {
        if (kGAMECLASS.testingBlockExiting) {
            // We're running under the testing script.
            // Stuff a name in the box and go go go
            MainScreen.nameBox.text = "Derpy";
            return;
        }
        if (MainScreen.nameBox.text == "") {
            //If part of newgame+, don't fully wipe.
            if (Game.player.XP > 0 && Game.player.explored == 0) {
                Flags.set(FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP, Game.player.XP);
                if (Flags.get(FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP)) Flags.set(FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP, 1);
                while (Game.player.level > 1) {
                    Flags.increase(FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP, Game.player.level * 100);;
                    Game.player.level--;
                }
                Flags.set(FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS, Game.player.stats.gems);
            }
            CharCreationMenu.display();
            MainScreen.text("\n\n\n<b>You must select a name.</b>");
            return;
        }
        MainScreen.clearText();
        MainScreen.nameBox.visible = false;
        Game.player.short = MainScreen.nameBox.text;
        customPlayerProfile = customName(MainScreen.nameBox.text);
        MainScreen.hideButtons();
        if (customPlayerProfile != null) {
            MainScreen.text("This name, like you, is special.  Do you live up to your name or continue on, assuming it to be coincidence?");
            MainScreen.addButton(0, "SpecialName", useCustomProfile);
            MainScreen.addButton(1, "Continue On", noCustomProfile);
        }
        else { //Proceed with normal character creation
            MainScreen.text("\n\n\n\nAre you a man or a woman?");
            MainScreen.addButton(0, "Man", isAMan);
            MainScreen.addButton(1, "Woman", isAWoman);
        }
    }

    private static useCustomProfile(): void {
        MainScreen.clearText();
        if (specialName(MainScreen.nameBox.text) != null) {
            MainScreen.clearText();
            MainScreen.text("Your name defines everything about you, and as such, it is time to wake...\n\n");
            Flags.set(FlagEnum.HISTORY_PERK_SELECTED, 1);
            completeCharacterCreation(); //Skip character creation, customPlayerProfile will be called in completeCharacterCreation
        }
        else {
            //After character creation the fact that customPlayerProfile is not null will activate a custom Game.player setup 
            MainScreen.text("There is something different about you, but first, what is your basic gender?  An individual such as you may later overcome this, of course...");
            MainScreen.text("\n\n\n\nAre you a man or a woman?");
            MainScreen.hideButtons();
            MainScreen.addButton(0, "Man", isAMan);
            MainScreen.addButton(1, "Woman", isAWoman);
        }
    }

    private static noCustomProfile(): void {
        MainScreen.clearText();
        customPlayerProfile = null;
        MainScreen.text("Your name carries little significance beyond it being your name.  What is your gender?");
        MainScreen.hideButtons();
        MainScreen.addButton(0, "Man", isAMan);
        MainScreen.addButton(1, "Woman", isAWoman);
    }

    //Determines if has character creation bonuses
    private static customName(arg: string): {
        switch(arg) {
        case "Aria": return customAria;
        case "Betram": return customBetram;
        case "Charaun": return customCharaun;
        case "Cody": return customCody;
        case "Galatea": return customGalatea;
        case "Gundam": return customGundam;
        case "Hikari": return customHikari;
        case "Katti": return customKatti;
        case "Lucina": return customLucina;
        case "Navorn": return customNavorn;
        case "Rope": return customRope;
        case "Sora": return customSora;
        default:
    }
return specialName(arg); //Must check against the special name list as well
}

	//Does PC skip creation?
	private static specialName(arg: string): Character {
    switch (arg) {
        case "Annetta": return customAnnetta;
        case "Ceveo": return customCeveo;
        case "Charlie": return customCharlie;
        case "Isaac": return customIsaac;
        case "Leah": return customLeah;
        case "Lukaz": return customLukaz;
        case "Mara": return customMara;
        case "Mihari": return customMihari;
        case "Mirvanna": return customMirvanna;
        case "Nami": return customNami;
        case "Nixi": return customNixi;
        case "Prismere": return customPrismere;
        case "Rann Rayla": return customRannRayla;
        case "Sera": return customSera;
        case "Siveen": return customSiveen;
        case "TestChar": return customTestChar;
        case "Tyriana": return customTyriana;
        case "Vahdunbrii": return customVahdunbrii;
        default:
    }
    return null;
}
		
	private static isAMan():void {
    Game.player.str += 3;
    Game.player.tou += 2;
			
    Game.player.lowerBody.balls = 2;
    Game.player.lowerBody.ballSize = 1;
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0;
    Game.player.fertility = 5;
    Game.player.hairLength = 1;
    Game.player.tallness = 71;
    Game.player.tone = 60;
			
    Game.player.createBreastRow();
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.lowerBody.cockSpot.list[0].cockLength = 5.5;
    Game.player.lowerBody.cockSpot.list[0].cockThickness = 1;
    Game.player.lowerBody.cockSpot.list[0].cockType = CockType.HUMAN;
    Game.player.lowerBody.cockSpot.list[0].knotMultiplier = 1;
    Game.player.gender = GENDER.MALE;
    MainScreen.clearText();
    MainScreen.text("You are a man.  Your upbringing has provided you an advantage in strength and toughness.\n\nWhat type of build do you have?");
    simpleChoices("Lean", buildLeanMale, "Average", buildAverageMale, "Thick", buildThickMale, "Girly", buildGirlyMale, "", null);
}

	private static isAWoman():void {
    Game.player.stats.spe += 3;
    Game.player.stats.int += 2;
			
    Game.player.lowerBody.balls = 0;
    Game.player.lowerBody.ballSize = 0;
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0.5;
    Game.player.fertility = 10;
    Game.player.hairLength = 10;
    Game.player.tallness = 67;
    Game.player.tone = 30;
			
    Game.player.createBreastRow();
    Game.player.createVagina();
    Game.player.gender = GENDER.FEMALE;
    MainScreen.clearText();
    MainScreen.text("You are a woman.  Your upbringing has provided you an advantage in speed and intellect.\n\nWhat type of build do you have?");
    simpleChoices("Slender", buildSlenderFemale, "Average", buildAverageFemale, "Curvy", buildCurvyFemale, "Tomboyish", buildTomboyishFemale, "", null);
}

	private static buildLeanMale():void {
    Game.player.str -= 1;
    Game.player.stats.spe += 1;
			
    Game.player.femininity = 34;
    Game.player.thickness = 30;
    Game.player.tone += 5;
			
    Game.player.upperBody.chest.list[0].breastRating = BREAST_CUP.FLAT;
    Game.player.lowerBody.butt.buttRating = BUTT_RATING.TIGHT;
    Game.player.lowerBody.hipRating = HIP_RATING.SLENDER;
    chooseComplexion();
}

	private static buildSlenderFemale():void {
    Game.player.str -= 1;
    Game.player.stats.spe += 1;
			
    Game.player.femininity = 66;
    Game.player.thickness = 30;
    Game.player.tone += 5;
			
    Game.player.upperBody.chest.list[0].breastRating = BREAST_CUP.B;
    Game.player.lowerBody.butt.buttRating = BUTT_RATING.TIGHT;
    Game.player.lowerBody.hipRating = HIP_RATING.AMPLE;
    chooseComplexion();
}

	private static buildAverageMale():void {
    Game.player.femininity = 30;
    Game.player.thickness = 50;
			
    Game.player.upperBody.chest.list[0].breastRating = BREAST_CUP.FLAT;
    Game.player.lowerBody.butt.buttRating = BUTT_RATING.AVERAGE;
    Game.player.lowerBody.hipRating = HIP_RATING.AVERAGE;
    chooseComplexion();
}

	private static buildAverageFemale():void {
    Game.player.femininity = 70;
    Game.player.thickness = 50;
			
    Game.player.upperBody.chest.list[0].breastRating = BREAST_CUP.C;
    Game.player.lowerBody.butt.buttRating = BUTT_RATING.NOTICEABLE;
    Game.player.lowerBody.hipRating = HIP_RATING.AMPLE;
    chooseComplexion();
}

	private static buildThickMale():void {
    Game.player.stats.spe -= 4;
    Game.player.str += 2;
    Game.player.tou += 2;
			
    Game.player.femininity = 29;
    Game.player.thickness = 70;
    Game.player.tone -= 5;
			
    Game.player.upperBody.chest.list[0].breastRating = BREAST_CUP.FLAT;
    Game.player.lowerBody.butt.buttRating = BUTT_RATING.NOTICEABLE;
    Game.player.lowerBody.hipRating = HIP_RATING.AVERAGE;
    chooseComplexion();
}

	private static buildCurvyFemale():void {
    Game.player.stats.spe -= 2;
    Game.player.str += 1;
    Game.player.tou += 1;
			
    Game.player.femininity = 71;
    Game.player.thickness = 70;
			
    Game.player.upperBody.chest.list[0].breastRating = BREAST_CUP.D;
    Game.player.lowerBody.butt.buttRating = BUTT_RATING.LARGE;
    Game.player.lowerBody.hipRating = HIP_RATING.CURVY;
    chooseComplexion();
}

	private static buildGirlyMale():void {
    Game.player.str -= 2;
    Game.player.stats.spe += 2;
			
    Game.player.femininity = 50;
    Game.player.thickness = 50;
    Game.player.tone = 26;
			
    Game.player.upperBody.chest.list[0].breastRating = BREAST_CUP.A;
    Game.player.lowerBody.butt.buttRating = BUTT_RATING.NOTICEABLE;
    Game.player.lowerBody.hipRating = HIP_RATING.SLENDER;
    chooseComplexion();
}

	private static buildTomboyishFemale():void {
    Game.player.str += 1;
    Game.player.stats.spe -= 1;
			
    Game.player.femininity = 56;
    Game.player.thickness = 50;
    Game.player.tone = 50;
			
    Game.player.upperBody.chest.list[0].breastRating = BREAST_CUP.A;
    Game.player.lowerBody.butt.buttRating = BUTT_RATING.TIGHT;
    Game.player.lowerBody.hipRating = HIP_RATING.SLENDER;
    chooseComplexion();
}

	private static chooseComplexion():void {
    MainScreen.clearText();
    MainScreen.text("What is your complexion?");
    MainScreen.hideButtons();
		MainScreen.addButton(0, "Light", setComplexion, "light");
    MainScreen.addButton(1, "Olive", setComplexion, "olive");
    MainScreen.addButton(2, "Dark", setComplexion, "dark");
    MainScreen.addButton(3, "Ebony", setComplexion, "ebony");
}

	private static setComplexion(choice:string):void { //And choose hair
    Game.player.skinTone = choice;
    MainScreen.clearText();
    MainScreen.text("You selected a " + choice + " complexion.\n\nWhat color is your hair?");
    MainScreen.hideButtons();
		MainScreen.addButton(0, "Blonde", setHair, "blonde");
    MainScreen.addButton(1, "Brown", setHair, "brown");
    MainScreen.addButton(2, "Black", setHair, "black");
    MainScreen.addButton(3, "Red", setHair, "red");
    MainScreen.addButton(4, "Gray", setHair, "gray");
    MainScreen.addButton(5, "White", setHair, "white");
    MainScreen.addButton(6, "Auburn", setHair, "auburn");
}

	private static setHair(choice:string):void {
    Game.player.hairColor = choice;
    MainScreen.clearText();
    MainScreen.text("You have " + hairDescript() + ".");
    chooseEndowment(false);
}

	private static chooseEndowment(clear:boolean):void {
    if(clear) MainScreen.clearText();
    MainScreen.text("Every person is born with a gift.  What's yours?");
    MainScreen.hideButtons();
		MainScreen.addButton(0, "Strength", confirmEndowmentStrength);
    MainScreen.addButton(1, "Toughness", confirmEndowmentThoughness);
    MainScreen.addButton(2, "Speed", confirmEndowmentSpeed);
    MainScreen.addButton(3, "Smarts", confirmEndowmentSmarts);
    MainScreen.addButton(4, "Libido", confirmEndowmentLibido);
    MainScreen.addButton(5, "Touch", confirmEndowmentTouch);
    if(Game.player.lowerBody.cockSpot.hasCock()) {
        MainScreen.addButton(6, "Big Cock", confirmEndowmentBigCock);
        MainScreen.addButton(7, "Lots of Jizz", confirmEndowmentMessyOrgasms);
    }
		else {
        MainScreen.addButton(6, "Big Breasts", confirmEndowmentBigBreasts);
        MainScreen.addButton(7, "Big Clit", confirmEndowmentBigClit);
        MainScreen.addButton(8, "Fertile", confirmEndowmentFertile);
        MainScreen.addButton(9, "Wet Vagina", confirmEndowmentWetVagina);
    }
}

	private static confirmEndowmentStrength():void {
    MainScreen.clearText();
    MainScreen.text("Are you stronger than normal? (+5 Strength)\n\nStrength increases your combat damage, and your ability to hold on to an enemy or pull yourself away.");
    MainScreen.hideButtons();
		MainScreen.addButton(0, "Yes", setEndowmentStrength);
    MainScreen.addButton(1, "No", chooseEndowment, true);
}

	private static confirmEndowmentThoughness():void {
    MainScreen.clearText();
    MainScreen.text("Are you unusually tough? (+5 Toughness)\n\nToughness gives you more HP and increases the chances an attack against you will fail to wound you.");
    MainScreen.hideButtons();
		MainScreen.addButton(0, "Yes", setEndowmentToughness);
    MainScreen.addButton(1, "No", chooseEndowment, true);
}

	private static confirmEndowmentSpeed():void {
    MainScreen.clearText();
    MainScreen.text("Are you very quick?  (+5 Speed)\n\nSpeed makes it easier to escape combat and grapples.  It also boosts your chances of evading an enemy attack and successfully catching up to enemies who try to run.");
    MainScreen.hideButtons();
		MainScreen.addButton(0, "Yes", setEndowmentSpeed);
    MainScreen.addButton(1, "No", chooseEndowment, true);
}

	private static confirmEndowmentSmarts():void {
    MainScreen.clearText();
    MainScreen.text("Are you a quick learner?  (+5 Intellect)\n\nIntellect can help you avoid dangerous monsters or work with machinery.  It will also boost the power of any spells you may learn in your travels.");
    MainScreen.hideButtons();
		MainScreen.addButton(0, "Yes", setEndowmentSmarts);
    MainScreen.addButton(1, "No", chooseEndowment, true);
}

	private static confirmEndowmentLibido():void {
    MainScreen.clearText();
    MainScreen.text("Do you have an unusually high sex-drive?  (+5 Libido)\n\nLibido affects how quickly your lust builds over time.  You may find a high libido to be more trouble than it's worth...");
    MainScreen.hideButtons();
		MainScreen.addButton(0, "Yes", setEndowmentLibido);
    MainScreen.addButton(1, "No", chooseEndowment, true);
}

	private static confirmEndowmentTouch():void {
    MainScreen.clearText();
    MainScreen.text("Is your skin unusually sensitive?  (+5 Sensitivity)\n\nSensitivity affects how easily touches and certain magics will raise your lust.  Very low sensitivity will make it difficult to orgasm.");
    MainScreen.hideButtons();
		MainScreen.addButton(0, "Yes", setEndowmentTouch);
    MainScreen.addButton(1, "No", chooseEndowment, true);
}

	private static confirmEndowmentBigCock():void {
    MainScreen.clearText();
    MainScreen.text("Do you have a big cock?  (+2\" Cock Length)\n\nA bigger cock will make it easier to get off any sexual partners, but only if they can take your size.");
    MainScreen.hideButtons();
		MainScreen.addButton(0, "Yes", setEndowmentBigCock);
    MainScreen.addButton(1, "No", chooseEndowment, true);
}

	private static confirmEndowmentMessyOrgasms():void {
    MainScreen.clearText();
    MainScreen.text("Are your orgasms particularly messy?  (+50% Cum Multiplier)\n\nA higher cum multiplier will cause your orgasms to be messier.");
    MainScreen.hideButtons();
		MainScreen.addButton(0, "Yes", setEndowmentMessyOrgasms);
    MainScreen.addButton(1, "No", chooseEndowment, true);
}

	private static confirmEndowmentBigBreasts():void {
    MainScreen.clearText();
    MainScreen.text("Are your breasts bigger than average? (DD cups)\n\nLarger breasts will allow you to lactate greater amounts, tit-fuck larger cocks, and generally be a sexy bitch.");
    MainScreen.hideButtons();
		MainScreen.addButton(0, "Yes", setEndowmentBigBreasts);
    MainScreen.addButton(1, "No", chooseEndowment, true);
}

	private static confirmEndowmentBigClit():void {
    MainScreen.clearText();
    MainScreen.text("Do you have a big clit?  (1\" Long)\n\nA large enough clit may eventually become as large as a cock.  It also makes you gain lust much faster during oral or manual stimulation.");
    MainScreen.hideButtons();
		MainScreen.addButton(0, "Yes", setEndowmentBigClit);
    MainScreen.addButton(1, "No", chooseEndowment, true);
}

	private static confirmEndowmentFertile():void {
    MainScreen.clearText();
    MainScreen.text("Is your family particularly fertile?  (+15% Fertility)\n\nA high fertility will cause you to become pregnant much more easily.  Pregnancy may result in: Strange children, larger bust, larger hips, a bigger ass, and other weirdness.");
    MainScreen.hideButtons();
		MainScreen.addButton(0, "Yes", setEndowmentFertile);
    MainScreen.addButton(1, "No", chooseEndowment, true);
}

	private static confirmEndowmentWetVagina():void {
    MainScreen.clearText();
    MainScreen.text("Does your pussy get particularly wet?  (+1 Vaginal Wetness)\n\nVaginal wetness will make it easier to take larger cocks, in turn helping you bring the well-endowed to orgasm quicker.");
    MainScreen.hideButtons();
		MainScreen.addButton(0, "Yes", setEndowmentWetVagina);
    MainScreen.addButton(1, "No", chooseEndowment, true);
}

	private static setEndowmentStrength():void {
    Game.player.str += 5;
    Game.player.tone += 7;
    Game.player.thickness += 3;
    //Add bonus +25% strength gain
    Game.player.createPerk(PerkLib.Strong, 0.25, 0, 0, 0);
    chooseHistory();
}
		
	private static setEndowmentToughness():void {
    Game.player.tou += 5;
    Game.player.tone += 5;
    Game.player.thickness += 5;
    Game.player.createPerk(PerkLib.Tough, 0.25, 0, 0, 0);
    Game.player.HP = kGAMECLASS.maxHP();
    chooseHistory();
}
		
	private static setEndowmentSpeed():void {
    Game.player.stats.spe += 5;
    Game.player.tone += 10;
    Game.player.createPerk(PerkLib.Fast, 0.25, 0, 0, 0);
    chooseHistory();
}
		
	private static setEndowmentSmarts():void {
    Game.player.stats.int += 5;
    Game.player.thickness -= 5;
    Game.player.createPerk(PerkLib.Smart, 0.25, 0, 0, 0);
    chooseHistory();
}
		
	private static setEndowmentLibido():void {
    Game.player.stats.lib += 5;
    Game.player.createPerk(PerkLib.Lusty, 0.25, 0, 0, 0);
    chooseHistory();
}
		
	private static setEndowmentTouch():void {
    Game.player.stats.sens += 5;
    Game.player.createPerk(PerkLib.Sensitive, 0.25, 0, 0, 0);
    chooseHistory();
}
		
	private static setEndowmentBigCock():void {
    Game.player.femininity -= 5;
    Game.player.lowerBody.cockSpot.list[0].cockLength = 8;
    Game.player.lowerBody.cockSpot.list[0].cockThickness = 1.5;
    trace("Creation - cock modded to 8inches");
		Game.player.createPerk(PerkLib.BigCock, 1.25, 0, 0, 0);
    chooseHistory();
}
		
	private static setEndowmentMessyOrgasms():void {
    Game.player.femininity -= 2;
    Game.player.cumMultiplier = 1.5;
    Game.player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
    chooseHistory();
}
		
	private static setEndowmentBigBreasts():void {
    Game.player.femininity += 5;
    Game.player.upperBody.chest.list[0].breastRating += 2;
    Game.player.createPerk(PerkLib.BigTits, 1.5, 0, 0, 0);
    chooseHistory();
}
		
	private static setEndowmentBigClit():void {
    Game.player.femininity -= 5;
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 1;
    Game.player.createPerk(PerkLib.BigClit, 1.25, 0, 0, 0);
    chooseHistory();
}
		
	private static setEndowmentFertile():void {
    Game.player.femininity += 5;
    Game.player.fertility += 25;
    Game.player.lowerBody.hipRating += 2;
    Game.player.createPerk(PerkLib.Fertile, 1.5, 0, 0, 0);
    chooseHistory();
}
		
	private static setEndowmentWetVagina():void {
    Game.player.femininity += 7;
    Game.player.vaginas[0].vaginalWetness = VAGINA_WETNESS.WET;
    Game.player.createPerk(PerkLib.WetPussy, 2, 0, 0, 0);
    chooseHistory();
}
		
	public static chooseHistory():void {
    MainScreen.clearText();
    if(Flags.get(FlagEnum.HISTORY_PERK_SELECTED) != 0) { //This flag can only be non-zero if chooseHistory is called from camp.as
        MainScreen.text("<b>New history perks are available during creation.  Since this character was created before they were available, you may choose one now!</b>\n\n");
    }
		MainScreen.text("Before you became a champion, you had other plans for your life.  What were you doing before?");
    MainScreen.hideButtons();
		MainScreen.addButton(0, "Alchemy", confirmHistory, PerkLib.HistoryAlchemist);
    MainScreen.addButton(1, "Fighting", confirmHistory, PerkLib.HistoryFighter);
    MainScreen.addButton(2, "Healing", confirmHistory, PerkLib.HistoryHealer);
    MainScreen.addButton(3, "Religion", confirmHistory, PerkLib.HistoryReligious);
    MainScreen.addButton(4, "Schooling", confirmHistory, PerkLib.HistoryScholar);
    MainScreen.addButton(5, "Slacking", confirmHistory, PerkLib.HistorySlacker);
    MainScreen.addButton(6, "Slutting", confirmHistory, PerkLib.HistorySlut);
    MainScreen.addButton(7, "Smithing", confirmHistory, PerkLib.HistorySmith);
    MainScreen.addButton(8, "Whoring", confirmHistory, PerkLib.HistoryWhore);
}
		
	private static confirmHistory(choice:PerkType):void {
    MainScreen.clearText();
    switch(choice) {
			case PerkLib.HistoryAlchemist:
    MainScreen.text("You spent some time as an alchemist's assistant, and alchemical items always seem to be more reactive in your hands.  Is this your history?");
    break;
    case PerkLib.HistoryFighter:
    MainScreen.text("You spent much of your time fighting other children, and you had plans to find work as a guard when you grew up.  You do 10% more damage with physical attacks.  Is this your history?");
    break;
    case PerkLib.HistoryHealer:
    MainScreen.text("You often spent your free time with the village healer, learning how to tend to wounds.  Healing items and effects are 20% more effective.  Is this your history?");
    break;
    case PerkLib.HistoryReligious:
    MainScreen.text("You spent a lot of time at the village temple, and learned how to meditate.  The 'masturbation' option is replaced with 'meditate' when corruption is at or below 66.  Is this your history?");
    break;
    case PerkLib.HistoryScholar:
    MainScreen.text("You spent much of your time in school, and even begged the richest man in town, Mr. Savin, to let you read some of his books.  You are much better at focusing, and spellcasting uses 20% less fatigue.  Is this your history?");
    break;
    case PerkLib.HistorySlacker:
    MainScreen.text("You spent a lot of time slacking, avoiding work, and otherwise making a nuisance of yourself.  Your efforts at slacking have made you quite adept at resting, and your fatigue comes back 20% faster.  Is this your history?");
    break;
    case PerkLib.HistorySlut:
    MainScreen.text("You managed to spend most of your time having sex.  Quite simply, when it came to sex, you were the village bicycle - everyone got a ride.  Because of this, your body is a bit more resistant to penetrative stretching, and has a higher upper limit on what exactly can be inserted.  Is this your history?");
    break;
    case PerkLib.HistorySmith:
    MainScreen.text("You managed to get an apprenticeship with the local blacksmith.  Because of your time spent at the blacksmith's side, you've learned how to fit armor for maximum protection.  Is this your history?");
    break;
    default:
    MainScreen.text("You managed to find work as a whore.  Because of your time spent trading seduction for profit, you're more effective at teasing (+15% tease damage).  Is this your history?");
}
MainScreen.hideButtons();
MainScreen.addButton(0, "Yes", setHistory, choice);
MainScreen.addButton(1, "No", chooseHistory);
	}

	private static setHistory(choice:PerkType):void {
    Game.player.createPerk(choice, 0, 0, 0, 0);
    if(choice == PerkLib.HistorySlut || choice == PerkLib.HistoryWhore) {
        if (Game.player.lowerBody.vaginaSpot.hasVagina()) {
            Game.player.vaginas[0].virgin = false;
            Game.player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.LOOSE;
        }
        Game.player.ass.analLooseness = 1;
    }
		if (Flags.get(FlagEnum.HISTORY_PERK_SELECTED)) {
        Flags.set(FlagEnum.HISTORY_PERK_SELECTED, 1);
        completeCharacterCreation();
    }
		else { //Special escape clause for very old saves that do not have a history perk. This is used to allow them the chance to select a perk at camp on load.
        Flags.set(FlagEnum.HISTORY_PERK_SELECTED, 1);
        Game.playerMenu();
    }

}
		
	private static completeCharacterCreation():void {
    if(customPlayerProfile != null) {
        customPlayerProfile();
        MainScreen.doNext(arrival);
        return;
    }
		arrival();
}
			
	private static arrival():void {
    statScreenRefresh();
		model.time.hours = 11;
    MainScreen.clearText();
    MainScreen.text("You are prepared for what is to come.  Most of the last year has been spent honing your body and mind to prepare for the challenges ahead.  You are the Champion of Ingnam.  The one who will journey to the demon realm and guarantee the safety of your friends and family, even though you'll never see them again.  You wipe away a tear as you enter the courtyard and see Elder Nomur waiting for you.  You are ready.\n\n");
    MainScreen.text("The walk to the tainted cave is long and silent.  Elder Nomur does not speak.  There is nothing left to say.  The two of you journey in companionable silence.  Slowly the black rock of Mount Ilgast looms closer and closer, and the temperature of the air drops.   You shiver and glance at the Elder, noticing he doesn't betray any sign of the cold.  Despite his age of nearly 80, he maintains the vigor of a man half his age.  You're glad for his strength, as assisting him across this distance would be draining, and you must save your energy for the trials ahead.\n\n");
    MainScreen.text("The entrance of the cave gapes open, sharp stalactites hanging over the entrance, giving it the appearance of a monstrous mouth.  Elder Nomur stops and nods to you, gesturing for you to proceed alone.\n\n");
    MainScreen.text("The cave is unusually warm and damp, ");
    if(Game.player.gender == GENDER.FEMALE)
			MainScreen.text("and your body seems to feel the same way, flushing as you feel a warmth and dampness between your thighs. ");
    else MainScreen.text("and your body reacts with a sense of growing warmth focusing in your groin, your manhood hardening for no apparent reason. ");
    MainScreen.text("You were warned of this and press forward, ignoring your body's growing needs.  A glowing purple-pink portal swirls and flares with demonic light along the back wall.  Cringing, you press forward, keenly aware that your body seems to be anticipating coming in contact with the tainted magical construct.  Closing your eyes, you gather your resolve and leap forwards.  Vertigo overwhelms you and you black out...");
    showStats();
		dynStats("lus", 15);
		MainScreen.doNext(arrivalPartTwo);
}
		
	private static arrivalPartTwo():void {
    MainScreen.clearText();
    hideUpDown();
		dynStats("lus", 40, "cor", 2);
		model.time.hours = 18;
    MainScreen.text("You wake with a splitting headache and a body full of burning desire.  A shadow darkens your view momentarily and your training kicks in.  You roll to the side across the bare ground and leap to your feet.  A surprised looking imp stands a few feet away, holding an empty vial.  He's completely naked, an improbably sized pulsing red cock hanging between his spindly legs.  You flush with desire as a wave of lust washes over you, your mind reeling as you fight ");
    if(Game.player.gender == GENDER.FEMALE)
			MainScreen.text("the urge to chase down his rod and impale yourself on it.\n\n");
    else
			MainScreen.text("the urge to ram your cock down his throat.  The strangeness of the thought surprises you.\n\n");
    MainScreen.text("The imp says, \"<i>I'm amazed you aren't already chasing down my cock, human.  The last Champion was an eager whore for me by the time she woke up.  This lust draft made sure of it.</i>\"");
    MainScreen.doNext(arrivalPartThree);
}
		
	private static arrivalPartThree():void {
    MainScreen.clearText();
    hideUpDown();
		dynStats("lus", -30);
		MainScreen.text("The imp shakes the empty vial to emphasize his point.  You reel in shock at this revelation - you've just entered the demon realm and you've already been drugged!  You tremble with the aching need in your groin, but resist, righteous anger lending you strength.\n\nIn desperation you leap towards the imp, watching with glee as his cocky smile changes to an expression of sheer terror.  The smaller creature is no match for your brute strength as you pummel him mercilessly.  You pick up the diminutive demon and punt him into the air, frowning grimly as he spreads his wings and begins speeding into the distance.\n\n");
    MainScreen.text("The imp says, \"<i>FOOL!  You could have had pleasure unending... but should we ever cross paths again you will regret humiliating me!  Remember the name Zetaz, as you'll soon face the wrath of my master!</i>\"\n\n");
    MainScreen.text("Your pleasure at defeating the demon ebbs as you consider how you've already been defiled.  You swear to yourself you will find the demon responsible for doing this to you and the other Champions, and destroy him AND his pet imp.");
    MainScreen.doNext(arrivalPartFour);
}
		
	private static arrivalPartFour():void {
    MainScreen.clearText();
    hideUpDown();
		MainScreen.text("You look around, surveying the hellish landscape as you plot your next move.  The portal is a few yards away, nestled between a formation of rocks.  It does not seem to exude the arousing influence it had on the other side.  The ground and sky are both tinted different shades of red, though the earth beneath your feet feels as normal as any other lifeless patch of dirt.   You settle on the idea of making a camp here and fortifying this side of the portal.  No demons will ravage your beloved hometown on your watch.\n\nIt does not take long to set up your tent and a few simple traps.  You'll need to explore and gather more supplies to fortify it any further.  Perhaps you will even manage to track down the demons who have been abducting the other champions!");
    MainScreen.doNext(Game.playerMenu);
}
		
	private static customAnnetta():void {
    MainScreen.text("You're a rather well-endowed hermaphrodite that sports a thick, dog-knotted cock, an unused pussy, and a nice, stretchy butt-hole.  You've also got horns and demonic high-heels on your feet.  It makes you wonder why you would ever get chosen to be champion!");
    //Specific Character	"Gender: Herm
    //Penis: 13 inch long 3 inch wide penis, dog shaped, 6.5 inch knot
    //Balls: Four 5 inch wide
    //Vagina: Tight, virgin, 0.5 inch clitoris
    Game.player.createVagina();
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.createBreastRow();
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0.5;
    Game.player.tallness = 67;
    Game.player.femininity = 90;
    Game.player.lowerBody.balls = 2;
    Game.player.lowerBody.ballSize = 5;
    Game.player.lowerBody.cockSpot.list[0].cockLength = 13;
    Game.player.lowerBody.cockSpot.list[0].cockThickness = 3;
    Game.player.lowerBody.cockSpot.list[0].knotMultiplier = 2.2;
    //Butt: Loose"	"Skin: Purple
    Game.player.ass.analLooseness = 3;
    Game.player.skinTone = "purple";
    //Hair: Back length orange
    Game.player.hairLength = 30;
    Game.player.hairColor = "orange";
    //Face: Elf ears, 4x demonic horns
    Game.player.upperBody.head.earType = EARS.ELFIN;
    Game.player.horns = 4;
    Game.player.hornType = HORNS.DEMON;
    //Body: Plump, no muscle tone, wide thighs, badonkulous ass, demon tail, demonic high heels
    Game.player.thickness = 75;
    Game.player.tone = 0;
    Game.player.lowerBody.hipRating = 17;
    Game.player.lowerBody.butt.buttRating = 17;
    Game.player.tailType = TAIL.DEMONIC;
    Game.player.lowerBody = LOWER_BODY.DEMONIC_HIGH_HEELS;
    //Breasts: J-cups with 5 inch fuckable nipples, leaking milk
    Game.player.upperBody.chest.list[0].breastRating = 28;
    Game.player.upperBody.chest.BreastRatingLargest[0].nippleLength = 5;
    Game.player.upperBody.chest.list[0].lactationMultiplier += 20;
			
    //Equipment: Starts with spiked fist
    Game.player.setWeapon(weapons.S_GAUNT);
    //Perks: Fighter and Lotsa Jizz"	Annetta
    Game.player.createPerk(PerkLib.HistoryFighter, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
    Game.player.cumMultiplier = 20;
    Game.player.gender = 3;
}
		
	private static customAria():void {
    MainScreen.text("It's really no surprise that you were sent through the portal to deal with the demons - you look enough like one as-is.  Your numerous fetish-inducing piercings, magical fox-tails, and bimbo-licious personality were all the motivation the elders needed to keep you from corrupting the village youth.");
    //2/26/2013 8:18:21	rdolave@gmail.com	Character Creation	"female DD breasts feminity 100 butt size 5 hip size 5 body thickness 10 clit I would like her nipples pierced with Ceraphs piercing
    //(on a side note how much do you think it would cost to add bell nipple,labia and clit piercings as well as an option for belly button piercings would like to see belly button piecings with a few different options as well.  Also would love to have handcuff ear piercings.)"	Would like the bimbo brain and bimbo body perks as well as the nine tail PerkLib.  demonic high heels, pink skin, obscenely long pink hair  would like her to be a kitsune with the nine tails.  pink fur.  starting equipment would like to be the succubus whip and nurse's outfit.  Also would like the xmas perk and all three Vday perks	Aria
    if(!Game.player.lowerBody.vaginaSpot.hasVagina()) Game.player.createVagina();
if (Game.player.femininity < 80) Game.player.femininity = 80;
Game.player.createPerk(PerkLib.BimboBody, 0, 0, 0, 0);
Game.player.createPerk(PerkLib.BimboBrains, 0, 0, 0, 0);
Game.player.tailType = TAIL.FOX;
Game.player.lowerBody.tailVenom = 9;
Game.player.createPerk(PerkLib.EnlightenedNinetails, 0, 0, 0, 0);
Game.player.upperBody.chest.list[0].breastRating = 5;
Game.player.femininity = 100;
Game.player.lowerBody = LOWER_BODY.DEMONIC_HIGH_HEELS;
Game.player.skinTone = "pink";
Game.player.skinType = SKIN.FUR;
Game.player.skinDesc = "fur";
Game.player.hairColor = "pink";
Game.player.hairLength = 50;
Game.player.lowerBody.hipRating = 5;
Game.player.lowerBody.butt.buttRating = 5;
Game.player.thickness = 10;
Flags.set(FlagEnum.PC_FETISH, 2);
Game.player.earsPierced = 1;
Game.player.earsPShort = "green gem-stone handcuffs";
Game.player.earsPLong = "Green gem-stone handcuffs";
Game.player.nipplesPierced = 1;
Game.player.nipplesPShort = "seamless black nipple-studs";
Game.player.nipplesPLong = "Seamless black nipple-studs";
Flags.set(FlagEnum.PC_FETISH, 2);
Game.player.vaginas[0].clitPierced = 1;
Game.player.vaginas[0].clitPShort = "emerald clit-stud";
Game.player.vaginas[0].clitPLong = "Emerald clit-stud";
Game.player.vaginas[0].labiaPierced = 2;
Game.player.vaginas[0].labiaPShort = "ruby labia-rings";
Game.player.vaginas[0].labiaPLong = "Ruby labia-rings";
Game.player.createPerk(PerkLib.ElvenBounty, 0, 15, 0, 0);
Game.player.createPerk(PerkLib.PureAndLoving, 0, 0, 0, 0);
Game.player.createPerk(PerkLib.SensualLover, 0, 0, 0, 0);
Game.player.createPerk(PerkLib.OneTrackMind, 0, 0, 0, 0);
Game.player.setWeapon(weapons.SUCWHIP);
Game.player.setArmor(armors.NURSECL);
	}
		
	private static customBetram():void {
    //Character Creation	
    //herm, canine cock - 8", virgin, tight, wet	
    //fox ears, tails, A cup breasts with normal nipples	Betram															
    Game.player.upperBody.head.earType = EARS.FOX;
    Game.player.tailType = TAIL.FOX;
    Game.player.lowerBody.tailVenom = 1;
    if(Game.player.upperBody.chest.BreastRatingLargest[0].breastRating > 1) Game.player.upperBody.chest.list[0].breastRating = 1;
    if(!Game.player.lowerBody.cockSpot.hasCock()) {
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
    Game.player.lowerBody.cockSpot.list[0].cockLength = 8;
    Game.player.lowerBody.cockSpot.list[0].cockThickness = 1;
    Game.player.lowerBody.cockSpot.list[0].knotMultiplier = 1.4;
}
if (!Game.player.lowerBody.vaginaSpot.hasVagina()) {
    Game.player.createVagina();
    Game.player.vaginas[0].vaginalWetness = VAGINA_WETNESS.WET;
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0.25;
}
Game.player.gender = 3;
MainScreen.text("You're quite the foxy herm, and as different as you were compared to the rest of Ingnam, it's no suprise you were sent through first.");
	}
		
	private static customCeveo():void {
    //Male. 2 cock. 5.5 average thickness and 12 in with excessive thickness both pierced with silver rings. Balls, large, about the size of a billiard ball, four of them. All humanish, more details on the character.
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.lowerBody.balls = 4;
    Game.player.lowerBody.ballSize = 3;
    Game.player.lowerBody.cockSpot.list[0].cockThickness = 5.5;
    Game.player.lowerBody.cockSpot.list[1].cockThickness = 5.5;
    Game.player.lowerBody.cockSpot.list[0].cockLength = 12;
    Game.player.lowerBody.cockSpot.list[1].cockLength = 12;
    Game.player.lowerBody.cockSpot.list[0].pierced = 2;
    Game.player.lowerBody.cockSpot.list[1].pierced = 2;
    Game.player.lowerBody.cockSpot.list[0].pShortDesc = "silver cock-ring";
    Game.player.lowerBody.cockSpot.list[1].pShortDesc = "silver cock-ring";
    Game.player.lowerBody.cockSpot.list[0].pLongDesc = "Silver cock-ring";
    Game.player.lowerBody.cockSpot.list[1].pLongDesc = "Silver cock-ring";
    //"Androgynous face, large brown eyes, long black hair down to about ass level, full lips, pirced with one silver ring ass itself is round and thick, chest is flat, only two nipples, about nickle sized pierced with silver studs, skin of a pale ghostly transparent complexion, rest of the body is not notably muscular or chubby in any definite way, feet seem to taper off into full transparency. Full body housed in the lewd Inquisitor Armor, wielding a Wizard Staff. Starting at level 5 with tank, regeneration, healing, smarts, channeling, mage and incorperability perks, a full knowledge of 
    Game.player.gender = 1;
    Game.player.tallness = 72;
    Game.player.femininity = 50;
    Game.player.hairLength = 35;
    Game.player.hairColor = "black";
    Game.player.lipPierced = 2;
    Game.player.lipPShort = "silver lip-ring";
    Game.player.lipPLong = "Silver lip-ring";
    Game.player.lowerBody.butt.buttRating = 8;
    Game.player.lowerBody.hipRating = 8;
    Game.player.createBreastRow();
    Game.player.nipplesPierced = 1;
    Game.player.nipplesPShort = "silver studs";
    Game.player.nipplesPLong = "Silver studs";
				
    Game.player.skinTone = "ghostly pale";
    Game.player.createPerk(PerkLib.Incorporeality, 0, 0, 0, 0);
    Game.player.setArmor(armors.I_CORST);
    Game.player.level = 5;
    Game.player.setWeapon(weapons.W_STAFF);
	
    Game.player.createPerk(PerkLib.Regeneration, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Smart, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Channeling, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Mage, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.HistoryHealer, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Tank, 0, 0, 0, 0);
    Game.player.statusAffects.add(new StatusAffect("KnowsArouse", 0, 0, 0, 0)));
    Game.player.statusAffects.add(new StatusAffect("KnowsHeal", 0, 0, 0, 0)));
    Game.player.statusAffects.add(new StatusAffect("KnowsMight", 0, 0, 0, 0)));
    Game.player.statusAffects.add(new StatusAffect("KnowsCharge", 0, 0, 0, 0)));
    Game.player.statusAffects.add(new StatusAffect("KnowsBlind", 0, 0, 0, 0)));
    Game.player.statusAffects.add(new StatusAffect("KnowsWhitefire", 0, 0, 0, 0)));
    //magic, 50 Int, 50 tough, Speed 15, Str 10, 30 corruption, 30 libido, 10 sensitivity.
    Game.player.stats.int = 50;
    Game.player.tou = 50;
    Game.player.stats.spe = 15;
    Game.player.str = 10;
    Game.player.stats.cor = 30;
    Game.player.stats.lib = 30;
    Game.player.stats.sens = 10;
    MainScreen.text("As a wandering mage you had found your way into no small amount of trouble in the search for knowledge.  A strange tome here, a ritual there, most people found your pale form unsettling. They would be further troubled if they could see your feet!  Lets not even begin on the blood magic.  Yes, your interest in examining every aspect of magic has run you down a strange path, so when you wandered into Ingram and began to hear of the exile of the Champion, and the superstitions that surrounded it you were intrigued, as every little rumor and ritual often had a grain of truth.  You snuck into the cave prior to the ritual, where the old man supposedly led every Champion, and there you found a strange portal that emanated a certain degree of spacial transparency -  more than the portal's own.  Within it must have been a whole new world!  Throwing caution to the wind, your curiosities engulfing you, you dove in with nary a thought for the consequences.");
}
		
	private static customCharaun():void {
    MainScreen.text("As a gifted fox with a juicy, thick knot, a wet cunt, and magical powers, you have no problems with being chosen as champion.");
    //Herm, Fox Cock: (27"l x 1.4"w, knot multiplier 3.6), No Balls, Cum Multiplier: 7,500, Vaginal Wetness: 5, Clit length: 0.5, Virgin, Fertility: 15	9-tailed "enlightened" kitsune( a pure-blooded kitsune with the "Enlightened Nine-tails" perk and magic specials) 
    if(!Game.player.lowerBody.cockSpot.hasCock()) Game.player.lowerBody.cockSpot.add(new Cock());
if (!Game.player.lowerBody.vaginaSpot.hasVagina()) Game.player.createVagina();
Game.player.gender = 3;
Game.player.lowerBody.cockSpot.list[0].cockLength = 27;
Game.player.lowerBody.cockSpot.list[0].cockThickness = 1.4;
Game.player.lowerBody.cockSpot.list[0].knotMultiplier = 3.6;
Game.player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
Game.player.lowerBody.balls = 0;
Game.player.lowerBody.ballSize = 2;
Game.player.cumMultiplier = 7500;
Game.player.vaginas[0].vaginalWetness = VAGINA_WETNESS.SLAVERING;
Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0.5;
Game.player.fertility = 15;
Game.player.tailType = TAIL.FOX;
Game.player.lowerBody.tailVenom = 9;
Game.player.createPerk(PerkLib.EnlightenedNinetails, 0, 0, 0, 0);
//if possible with fur, Hair color: "midnight black", Skin/Fur color: "ashen grayish-blue",  Height: 65", Tone: 100, Thickness: 0, Hip rating: 6, Butt rating: 3,Feminimity: 50,  ( 4 rows of breasts (Descending from the top ones: D,C,B,A), nipple length: 0.1", Fuckable, 1 nipple per breast, Tongue type: demon
Game.player.hairColor = "midnight black";
Game.player.skinType = SKIN.FUR;
Game.player.skinDesc = "fur";
Game.player.skinTone = "ashen grayish-blue";
Game.player.tallness = 65;
Game.player.tone = 100;
Game.player.thickness = 0;
Game.player.lowerBody.hipRating = 6;
Game.player.lowerBody.butt.buttRating = 3;
Game.player.femininity = 50;
Game.player.createBreastRow();
Game.player.createBreastRow();
Game.player.createBreastRow();
Game.player.upperBody.chest.list[0].breastRating = 4;
Game.player.upperBody.chest.list[0].fuckable = true;
Game.player.upperBody.chest.list[1].breastRating = 3;
Game.player.upperBody.chest.list[1].fuckable = true;
Game.player.upperBody.chest.list[2].breastRating = 2;
Game.player.upperBody.chest.list[2].fuckable = true;
Game.player.upperBody.chest.list[3].breastRating = 1;
Game.player.upperBody.chest.list[3].fuckable = true;
Game.player.tongueType = TONUGE.DEMONIC;
Game.player.upperBody.chest.BreastRatingLargest[0].nippleLength = 0.1;
//Starting with an Inscribed Spellblade and Bondage Straps.	Charaun
Game.player.setArmor(armors.BONSTRP);
Game.player.setWeapon(weapons.S_BLADE);
	}
		
	private static customCharlie():void {
    MainScreen.text("You're strong, smart, fast, and tough.  It also helps that you've got four dongs well beyond what others have lurking in their trousers.  With your wings, bow, weapon, and tough armor, you're a natural for protecting the town.");
    Game.player.gender = 1;
    Game.player.tou += 2;
    Game.player.str += 3;
    Game.player.fertility = 5;
    Game.player.hairLength = 26;
    Game.player.hairColor = "blond";
    Game.player.skinTone = "light";
    Game.player.upperBody.chest.BreastRatingLargest[0].nippleLength = 0.2;
    Game.player.createBreastRow();
    Game.player.upperBody.chest.list[0].breastRating = 0;
    Game.player.lowerBody.balls = 2;
    Game.player.lowerBody.ballSize = 3;
    Game.player.tallness = 113;
    Game.player.tone = 50;
    Game.player.thickness = 50;
    Game.player.femininity = 50;
    Game.player.lowerBody.hipRating = 5;
    Game.player.lowerBody.butt.buttRating = 5;
    Game.player.teaseLevel = 1;
    //Large feathered wings (Any chance in heck I could get 'angel' as the race descriptor? Just asking. I'm fine if the answer is 'no')
    Game.player.upperBody.wingType = WING.FEATHERED_LARGE;
    Game.player.upperBody.wingDesc = "large, feathered";
			
    //While we're on the subject, would glowing eyes be possible? I'll take normal eyes if not.
    //Beautiful Sword
    Game.player.setWeapon(weapons.B_SWORD);
    Game.player.setArmor(armors.SSARMOR);
    //Beautiful Armor (Or just Spider Silk Armor)
    //Pure Pearl
    //Tallness 84 (8 feet 0 inches)
    Game.player.tallness = 84;
    //Femininity 10
    Game.player.femininity = 10;
    //Thickness 50
    Game.player.thickness = 50;
    //Tone 90
    Game.player.tone = 90;
    //Int 50 (if possible)
    Game.player.stats.int = 50;
    //Str/Tou/Spd 25 (if possible)
    Game.player.str = 25;
    Game.player.tou = 25;
    Game.player.stats.spe = 25;
    //Bow
    Game.player.createKeyItem("Bow", 0, 0, 0, 0);
    //Bow skill 100 (Sorry Kelt, I can't hear your insults over my mad Robin Hood skillz)
    Game.player.statusAffects.add(new StatusAffect("Kelt", 100, 0, 0, 0)));
    //Is it possible to get extra starting perks added? If so, I'd like History: Religious added to whatever is selected on creation. If not, please ignore this line.
    //Freckled skinAdj
    Game.player.skinAdj = "freckled";
    //10 Perk Points (if possible, feel free to make it less if you feel it necessary)
    Game.player.perkPoints = 10;
    //Male
    Game.player.gender = 1;
    //Would it be possible to code a cock type that morphs into different cock types? (i.e. it loads a different cock type description each sex scene) If so, I'd like him to have a pair of them, one 24 inches long and 3 inches wide and the second 12-inches long and 2 inches wide. If not, I'll take a dragon and horse cock at 24/3 each as well as a dog and cat cock at 12/2 each.
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.lowerBody.cockSpot.list[0].cockLength = 24;
    Game.player.lowerBody.cockSpot.list[0].cockThickness = 3;
    Game.player.lowerBody.cockSpot.list[0].cockType = CockType.HORSE;
    Game.player.lowerBody.cockSpot.list[1].cockLength = 24;
    Game.player.lowerBody.cockSpot.list[1].cockThickness = 3;
    Game.player.lowerBody.cockSpot.list[1].cockType = CockType.DRAGON;
    Game.player.lowerBody.cockSpot.list[2].cockLength = 12;
    Game.player.lowerBody.cockSpot.list[2].cockThickness = 2;
    Game.player.lowerBody.cockSpot.list[2].cockType = CockType.DOG;
    Game.player.lowerBody.cockSpot.list[3].cockLength = 12;
    Game.player.lowerBody.cockSpot.list[3].cockThickness = 2;
    Game.player.lowerBody.cockSpot.list[3].cockType = CockType.CAT;
	
    //A pair of 8-inch balls
    Game.player.lowerBody.balls = 2;
    Game.player.lowerBody.ballSize = 8;
    //A virility boost would be nice too if possible.
    Game.player.cumMultiplier = 50;
}
		
	private static customCody():void {
    MainScreen.text("Your orange and black tiger stripes make you cut a more imposing visage than normal, and with your great strength, armor, and claymore, you're a natural pick for champion.");
    //well to start off the name would be Cody
    //-Cat with (black and orange tiger fur if possible) if not just Orange fur
    Game.player.hairColor = "black and orange";
    Game.player.skinType = SKIN.FUR;
    Game.player.skinDesc = "fur";
    //-Chainmail armor
    Game.player.setArmor(armors.FULLCHN);
    //-Large Claymore (i understand 40 Strength is need so if he could start with that would be great if not hit the gyms)"
    Game.player.str = 41;
    Game.player.setWeapon(weapons.CLAYMOR);
}
		
	private static customGalatea():void {
    //"(Dangit Fenoxo!  Stop adding sexy must-have things to the game!  If it's not too late to update it I've added in that sexy new armor.  Thanks!)		
    //Other:
    if(!Game.player.lowerBody.vaginaSpot.hasVagina()) {
    Game.player.createVagina();
    if (Game.player.lowerBody.vaginaSpot.list[0].clitLength == 0) Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0.25;
}
kGAMECLASS.genderCheck();
//Hair length: Very long
Game.player.hairLength = 22;
//Breast size: HH
Game.player.upperBody.chest.list[0].breastRating = 21;
//Femininity/Beauty: Very high
Game.player.femininity = 90;
// Height: 5'4
Game.player.tallness = 64;

//Perks: Feeder, Strong Back, Strong Back 2
Game.player.statusAffects.add(new StatusAffect("Feeder", 0, 0, 0, 0)));
Game.player.createPerk(PerkLib.Feeder, 0, 0, 0, 0);

Game.player.createPerk(PerkLib.StrongBack, 0, 0, 0, 0);
Game.player.createPerk(PerkLib.StrongBack2, 0, 0, 0, 0);

//Equipment: 
//Weapon: Warhammer
Game.player.setWeapon(weapons.WARHAMR);
//Armor: Lusty shit
Game.player.setArmor(armors.LMARMOR);
//Game.player.createPerk(PerkLib.SluttySeduction, 10 + Flags.get(FlagEnum.BIKINI_ARMOR_BONUS), 0, 0, 0);

//Stats: (if possible)
//Strength: 90
Game.player.str = 90;
//Fertility: 100
Game.player.fertility = 100;
Game.player.stats.cor = 25;
//Inventory: Lactaid, GroPlus, BimboLq
Game.player.itemSlot1.setItemAndQty(consumables.LACTAID, 5);
Game.player.itemSlot2.setItemAndQty(consumables.GROPLUS, 5);
Game.player.itemSlot3.setItemAndQty(consumables.BIMBOLQ, 1);
Game.player.itemSlot4.unlocked = true;
Game.player.itemSlot4.setItemAndQty(armors.BIMBOSK, 1);
Game.player.itemSlot5.unlocked = true;
MainScreen.text("You've got large breasts prone to lactation.  You aren't sure WHY you got chosen as a champion, but with your considerable strength, you're sure you'll do a good job protecting Ingnam.");
	}
		
	private static customGundam():void {
    MainScreen.text("You're fabulously rich, thanks to a rather well-placed bet on who would be the champion.  Hopefully you can buy yourself out of any trouble you might get in.");
    Game.player.stats.gems = 1500 + Utils.rand(1000);
    //for my custom character profile i want the name to be gundam all i want is to start out with around 1000-2500 gems like as a gift from the elder or something to help me out.
}
		
	private static customHikari():void {
    //Character Creation	If possible I would like a herm with a cat cock that is 10 inches by 4 inches. Anything else is up to you.	I would like a herm catmorph with two large d breasts and shoulder length hair. Also if possible I would like to start with some gel armor. Everything else is fair game.	Hikari
    MainScreen.text("As a herm with a super-thick cat-cock, D-cup breasts, and out-of-this-world armor, you're a natural pick for champion.");
    if(!Game.player.lowerBody.cockSpot.hasCock()) Game.player.lowerBody.cockSpot.add(new Cock());
Game.player.lowerBody.cockSpot.list[0].cockType = CockType.CAT;
Game.player.lowerBody.cockSpot.list[0].cockLength = 10;
Game.player.lowerBody.cockSpot.list[0].cockThickness = 4;
if (!Game.player.lowerBody.vaginaSpot.hasVagina()) Game.player.createVagina();
Game.player.upperBody.chest.list[0].breastRating = 4;
Game.player.hairLength = 10;
Game.player.setArmor(armors.GELARMR);
Game.player.gender = 3;
	}
		
	private static customIsaac():void {
    MainScreen.text("Born of a disgraced priestess, Isaac was raised alone until she was taken by illness.  He worked a number of odd jobs until he was eventually chosen as champion.");
    //- gift: fast
    Game.player.stats.spe += 5;
    Game.player.tone += 10;
    Game.player.createPerk(PerkLib.Fast, 0.25, 0, 0, 0);
    //- history: religion 
    Game.player.createPerk(PerkLib.HistoryReligious, 0, 0, 0, 0);
    //(and if possible)
    //- history: fighter
    Game.player.createPerk(PerkLib.HistoryFighter, 0, 0, 0, 0);
    //- history: smith
    Game.player.createPerk(PerkLib.HistorySmith, 0, 0, 0, 0);
    //in my ar, Issac was born to a disgraced priestess (she was raped by marauders) and raised by her alone until she died from an illness and was pretty much left to fend for and earn a living for himself (hence the fighter and smith background's too) until, years later he was chosen as 'champion'~
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //sex - male
    Game.player.gender = 1;
    Game.player.lowerBody.balls = 2;
    //- a pair of apple sized balls each measuring three inches across
    Game.player.lowerBody.ballSize = 3;
    //anatomy - twin dicks
    //the first, a vulpine dick (12 in. long, 2.8 in. thick with a knot roughly 4.5 in. at full size) with a Fertite jacob's ladder piercing
    //and the second, a barbed feline dick (10 in. long and 2.5 in thick) with an Emerald jacob's ladder
    //heh, ribbed for their pleasure ;d lol
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.lowerBody.cockSpot.list[0].cockLength = 12;
    Game.player.lowerBody.cockSpot.list[0].cockThickness = 2.8;
    Game.player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
    Game.player.lowerBody.cockSpot.list[0].knotMultiplier = 1.8;
    Game.player.lowerBody.cockSpot.list[1].cockLength = 10;
    Game.player.lowerBody.cockSpot.list[1].cockThickness = 2.5;
    Game.player.lowerBody.cockSpot.list[1].cockType = CockType.TENTACLE;
    Game.player.lowerBody.cockSpot.list[0].pierced = 3;
    Game.player.lowerBody.cockSpot.list[0].pShortDesc = "fertite cock-jacob's ladder";
    Game.player.lowerBody.cockSpot.list[0].pLongDesc = "Fertite cock-jacob's ladder";
    Game.player.createPerk(PerkLib.PiercedFertite, 5, 0, 0, 0);
    //- and one tight asshole
    Game.player.ass.analLooseness = 0;
    //- kitsune
    //- moderately long white hair (9 inches)
    Game.player.hairLength = 9;
    Game.player.hairColor = "silver-white";
    //- human face
    //- fox ears 
    Game.player.upperBody.head.earType = EARS.FOX;
    //- olive complexion
    Game.player.skinTone = "olive";
    //- demon tongue (oral fetish ;d)
    Game.player.tongueType = TONUGE.DEMONIC;
    //- 5 foot 9 inch tall
    Game.player.tallness = 69;
    //- average build
    Game.player.thickness = 50;
    //- body thickness of  around 50
    Game.player.tone = 70;
    //- 'tone of about 70  
    //- two flat breasts each supporting one 0.2-inch nipple
    Game.player.upperBody.chest.BreastRatingLargest[0].nippleLength = 0.2;
    Game.player.createBreastRow();
    //- three fox tails
    Game.player.tailType = TAIL.FOX;
    Game.player.lowerBody.tailVenom = 3;
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //equipment;
    //- katana (don't suppose you could rename the katana 'Zon'ith' could you? ~.^)
    //Items: Katana, Leather Armor
    Game.player.setWeapon(weapons.KATANA);
    //- robes
    Game.player.setArmor(armors.M_ROBES);
}
		
	private static customKatti():void {
    MainScreen.text("You have big breasts with big, fuckable nipples on them, and no matter what, your vagina always seems to be there to keep you company.");
    //Gender: Female	
    if(!Game.player.lowerBody.vaginaSpot.hasVagina()) {
    Game.player.createVagina();
    kGAMECLASS.genderCheck();
}
//"Ears: Bunny
Game.player.upperBody.head.earType = EARS.BUNNY;
//Tail: Bunny
Game.player.tailType = TAIL.RABBIT;
//Face: Human
//Breasts: H-cup with 4.5 inch fuckable nipples"
Game.player.upperBody.chest.list[0].breastRating = 19;
Game.player.upperBody.chest.BreastRatingLargest[0].nippleLength = 4.5;
Game.player.upperBody.chest.list[0].fuckable = true;
	}
		
	private static customLeah():void {
    Game.player.setArmor(armors.LEATHRA);
    //		if(!Game.player.perks.has("WizardsEndurance")) Game.player.createPerk(PerkLib.WizardsEndurance,30,0,0,0);
    Game.player.setWeapon(weapons.W_STAFF);
    Game.player.itemSlot1.setItemAndQty(consumables.B__BOOK, 1);
    Game.player.itemSlot2.setItemAndQty(consumables.W__BOOK, 2);
	
    Game.player.createBreastRow();
    Game.player.createVagina();
    Game.player.upperBody.chest.list[0].breastRating = 4;
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = .5;
    Game.player.fertility = 10;
    Game.player.gender = 2;
    Game.player.lowerBody.hipRating = 8;
    Game.player.lowerBody.butt.buttRating = 8;
    Game.player.str = 15;
    Game.player.tou = 15;
    Game.player.stats.spe = 18;
    Game.player.stats.int = 17;
    Game.player.stats.sens = 15;
    Game.player.stats.lib = 15;
    Game.player.stats.cor = 0;
    kGAMECLASS.notes = "No Notes Available.";
    Game.player.HP = kGAMECLASS.maxHP();
    Game.player.hairLength = 13;
    Game.player.skinType = SKIN.PLAIN;
    Game.player.faceType = FACE.HUMAN;
    Game.player.tailType = TAIL.NONE;
    Game.player.tongueType = TONUGE.HUMAN;
    Game.player.femininity = 85;
    Game.player.beardLength = 0;
    Game.player.beardStyle = 0;
    Game.player.tone = 30;
    Game.player.thickness = 50;
    Game.player.skinDesc = "skin";
    Game.player.skinTone = "olive";
    Game.player.hairColor = "black";
    Game.player.lowerBody.balls = 0;
    Game.player.cumMultiplier = 1;
    Game.player.lowerBody.ballSize = 0;
    Game.player.hoursSinceCum = 0;
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0;
    Game.player.ass.analLooseness = 0;
    Game.player.ass.analWetness = 0;
    Game.player.ass.fullness = 0;
    Game.player.fertility = 5;
    Game.player.fatigue = 0;
    Game.player.horns = 0;
    Game.player.tallness = 67;
    Game.player.lowerBody.tailVenom = 0;
    Game.player.lowerBody.tailRecharge = 0;
    Game.player.upperBody.wingType = WING.NONE;
    Game.player.upperBody.wingDesc = "non-existant";
    Game.player.tone = 30;
    Game.player.thickness = 65;
}
		
	private static customLucina():void {
    //428347355782040	Character Creation	Female,wetness=wet, Looseness=normal,not a virgin, Fertility high i guess i dont really care can be up to you.	for her face normal human, ears i want Elvin, no tails, just normal skin, body thickness i want to be slender, body tone kinda athletic but not too much, hair i want really long i think like a 30 on the codex number i think and her hair color light blonde, i want her to have normal D size breast with you can choose how you want them really though i dont think i really care, nipple size i dont care, her skin color a fair light light color but not too pale, for her starting equipment i want im not sure what i want her to wear but basically i want a Elvin archer with a bow. so maybe you can do something about the clothing. i just want a Elvin character in the game since theres goblins plus another archer besides kelt a female one add to that.	Lucina
    MainScreen.text("You're a blond, fair-skinned lass with a well-made bow and the skills to use it.  You have D-cup breasts and a very moist cunt that's seen a little action.  You're fit and trim, but not too thin, nor too well-muscled.  All in all, you're a good fit for championing your village's cause.");
    if(!Game.player.lowerBody.vaginaSpot.hasVagina()) Game.player.createVagina();
Game.player.vaginas[0].vaginalWetness = VAGINA_WETNESS.SLICK;
Game.player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.LOOSE;
Game.player.vaginas[0].virgin = false;
if (Game.player.femininity < 80) Game.player.femininity = 80;
Game.player.fertility = 40;
Game.player.upperBody.head.earType = EARS.ELFIN;
Game.player.thickness = 25;
Game.player.tone = 60;
Game.player.hairLength = 30;
Game.player.hairColor = "light blonde";
Game.player.upperBody.chest.list[0].breastRating = 4;
Game.player.skinTone = "light";
//Bow skill 100 (Sorry Kelt, I can't hear your insults over my mad Robin Hood skillz)
Game.player.statusAffects.add(new StatusAffect("Kelt", 100, 0, 0, 0)));
Game.player.createKeyItem("Bow", 0, 0, 0, 0);
	}
		
	private static customLukaz():void {
    //Specific Character	
    //Male. 11.5 inch dog dick, 4 balls, 2 inches in diameter.	
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.lowerBody.cockSpot.list[0].cockLength = 11.5;
    Game.player.lowerBody.cockSpot.list[0].cockThickness = 2;
    Game.player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
    Game.player.lowerBody.cockSpot.list[0].knotMultiplier = 1.5;
    Game.player.createBreastRow();
    Game.player.upperBody.chest.list[0].breastRating = 0;
    Game.player.gender = 1;
    Game.player.tallness = 71;
    Game.player.lowerBody.hipRating = 4;
    Game.player.lowerBody.butt.buttRating = 4;
    Game.player.femininity = 30;
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.lowerBody.balls = 4;
    Game.player.cumMultiplier = 4;
    Game.player.lowerBody.ballSize = 2;
    Game.player.str = 18;
    Game.player.tou = 17;
    Game.player.stats.spe = 15;
    Game.player.stats.int = 15;
    Game.player.stats.sens = 15;
    Game.player.stats.lib = 15;
    Game.player.stats.cor = 0;
    kGAMECLASS.notes = "No Notes Available.";
    Game.player.HP = kGAMECLASS.maxHP();
    Game.player.hairLength = 1;
    Game.player.skinType = SKIN.PLAIN;
    Game.player.skinTone = "light";
    Game.player.hairColor = "brown";
    Game.player.faceType = FACE.HUMAN;
    Game.player.tailType = TAIL.NONE;
    Game.player.tongueType = TONUGE.HUMAN;
    Game.player.femininity = 50;
    Game.player.beardLength = 0;
    Game.player.beardStyle = 0;
    Game.player.thickness = 50;
    Game.player.skinDesc = "skin";
    Game.player.hoursSinceCum = 0;
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0;
    Game.player.ass.analLooseness = 0;
    Game.player.ass.analWetness = 0;
    Game.player.ass.fullness = 0;
    Game.player.fertility = 5;
    Game.player.fatigue = 0;
    Game.player.horns = 0;
    Game.player.lowerBody.tailVenom = 0;
    Game.player.lowerBody.tailRecharge = 0;
    Game.player.upperBody.wingType = WING.NONE;
    Game.player.upperBody.wingDesc = "non-existant";
    //"dog face, dog ears, draconic tail, blue fur.
    Game.player.faceType = FACE.DOG;
    Game.player.upperBody.head.earType = EARS.DOG;
    Game.player.tailType = TAIL.DRACONIC;
    Game.player.skinType = SKIN.FUR;
    Game.player.hairColor = "blue";
    Game.player.skinDesc = "fur";
    Game.player.tone = 88;
    Game.player.tongueType = TONUGE.DRACONIC;
    //gel plate armor, warhammer, 88 body tone, 1 breast row, flat manly breasts, 0.2 inch nipples, 1 on each breast, draconic tongue, short hair-blue, light skin."	Lukaz
    Game.player.createPerk(PerkLib.HistoryFighter, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
}
		
	private static customMara():void {
    //#226096893686530
    //For the custom PC Profile can you make a Bimbo Bunny girl (no bunny feet) (named Mara) dont really care about clothes i can get what i want pretty quickly and I change from time to time.
    MainScreen.text("You're a bunny-girl with bimbo-tier curves, jiggly and soft, a curvy, wet girl with a bit of a flirty past.");
    Game.player.gender = 2;
    Game.player.stats.spe += 3;
    Game.player.stats.int += 2;
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = .5;
    Game.player.tone = 30;
    Game.player.fertility = 10;
    Game.player.hairLength = 15;
    Game.player.createBreastRow();
    Game.player.createVagina();
    Game.player.tallness = 67;
    Game.player.upperBody.chest.list[0].breastRating = 7;
    Game.player.vaginas[0].vaginalWetness = VAGINA_WETNESS.SLICK;
    Game.player.vaginas[0].virgin = false;
    Game.player.tone = 20;
    Game.player.lowerBody.hipRating = 12;
    Game.player.lowerBody.butt.buttRating = 12;
    Game.player.femininity = 100;
    Game.player.thickness = 33;
    Game.player.createPerk(PerkLib.HistorySlut, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.BimboBody, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.BimboBrains, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.BigTits, 1.5, 0, 0, 0);
    Game.player.upperBody.head.earType = EARS.BUNNY;
    Game.player.tailType = TAIL.RABBIT;
    Game.player.skinTone = "tan";
    Game.player.hairColor = "platinum blonde";
    Game.player.teaseLevel = 3;
}
		
	private static customMihari():void {
    //[Values will be listed as if taken from Minerva]
    //I'm kinda going under the assumption you are letting us go hog wild if not, take what's allowed and do what you wish out of what's below
    MainScreen.text("The portal is not something you fear, not with your imposing armor and inscribed spellblade.  You're much faster and stronger than every champion that came before you, but will it be enough?");
    //Core Stats:
    Game.player.str = 40;
    Game.player.tou = 20;
    Game.player.stats.spe = 100;
    Game.player.stats.int = 80;
    Game.player.stats.lib = 25;
    Game.player.stats.sens = 15;
			
    //Body Values:
    //breastRows
    Game.player.createBreastRow();
    //-breastRating: 5
    //-breasts: 2
    //-nipplesPerBreast: 1
    Game.player.upperBody.chest.list[0].breastRating = 5;
    Game.player.lowerBody.butt.buttRating = 2;
    Game.player.createVagina();
    Game.player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.TIGHT;
    Game.player.vaginas[0].vaginalWetness = VAGINA_WETNESS.SLAVERING;
    Game.player.vaginas[0].virgin = true;
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0.2;
    Game.player.upperBody.head.earType = EARS.CAT;
    Game.player.faceType = FACE.CAT;
    Game.player.femininity = 100;
    Game.player.fertility = 85;
    Game.player.gender = 2;
    Game.player.hairColor = "blonde";
    Game.player.hairLength = 24;
    Game.player.lowerBody.hipRating = 6;
    Game.player.lowerBody = LOWER_BODY.CAT;
    Game.player.upperBody.chest.BreastRatingLargest[0].nippleLength = 0.5;
    //perks:
    Game.player.createPerk(PerkLib.Agility, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Evade, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Runner, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Fast, 0.25, 0, 0, 0);
    Game.player.createPerk(PerkLib.Fertile, 1.5, 0, 0, 0);
    Game.player.createPerk(PerkLib.Flexibility, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.HistoryScholar, 0, 0, 0, 0);
	
    Game.player.skinDesc = "fur";
    Game.player.skinTone = "ashen";
    Game.player.skinType = SKIN.FUR;
    Game.player.tailType = TAIL.CAT;
    Game.player.tallness = 55;
    Game.player.teaseLevel = 4;
    Game.player.thickness = 10;
    Game.player.tone = 75;
    Game.player.tongueType = TONUGE.HUMAN;
			
    //Posted everything above sorry if it wasn't supposed to go there.
    //starting equipment: black leather armor surrounded by voluminous robes
    //starting weapon: Spellblade if not gamebreaking otherwise spear is fine.
    Game.player.setArmor(armors.LTHRROB);
    Game.player.setWeapon(weapons.S_BLADE);
}
		
	private static customMirvanna():void {
    //Any equine or dragonny attributes accompanying it a big plus! As I'm a dragon-unicorn furry (Qilin~). Bonus points if you add a horn type for unicorn horn. 
    MainScreen.text("You're an equine dragon-herm with a rather well-proportioned body.  Ingnam is certainly going to miss having you whoring yourself out around town.  You don't think they'll miss cleaning up all the messy sex, though.");
    Game.player.gender = 3;
    Game.player.stats.spe += 3;
    Game.player.stats.int += 2;
    Game.player.str += 3;
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = .5;
    Game.player.fertility = 20;
    Game.player.hairLength = 15;
    Game.player.createBreastRow();
    Game.player.createVagina();
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.tallness = 73;
    Game.player.upperBody.chest.list[0].breastRating = 5;
    Game.player.vaginas[0].vaginalWetness = VAGINA_WETNESS.SLICK;
    Game.player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.LOOSE;
    Game.player.vaginas[0].virgin = false;
    Game.player.tone = 20;
    Game.player.lowerBody.hipRating = 8;
    Game.player.lowerBody.butt.buttRating = 8;
    Game.player.femininity = 75;
    Game.player.thickness = 33;
    Game.player.hairColor = "platinum blonde";
    Game.player.teaseLevel = 1;
    //Mirvanna;
    //Gender = Herm
    //Ears = Horse
    Game.player.upperBody.head.earType = EARS.HORSE;
    //Horns = Dragon
    Game.player.hornType = HORNS.DRACONIC_X4_12_INCH_LONG;
    Game.player.horns = 12;
    //Face = Horse
    Game.player.faceType = FACE.HORSE;
    //Skin type = Black Fur
    Game.player.skinTone = "brown";
    Game.player.skinType = SKIN.FUR;
    Game.player.hairColor = "black";
    Game.player.skinDesc = "fur";
    //Legs/Feet = Digigrade hooved 
    Game.player.lowerBody = LOWER_BODY.HOOFED;
    //Wing type = Dragon
    Game.player.upperBody.wingType = WING.DRACONIC_LARGE;
    Game.player.upperBody.wingDesc = "large, draconic";
    //Tail type = Dragon
    Game.player.tailType = TAIL.DRACONIC;
    //Cock type = Equine
    Game.player.lowerBody.cockSpot.list[0].cockType = CockType.HORSE;
    Game.player.lowerBody.cockSpot.list[0].cockLength = 14;
    Game.player.lowerBody.cockSpot.list[0].cockThickness = 2.5;
    //Vulva Type = Equine

    //Beautiful Sword & Wizard Robe
    Game.player.setWeapon(weapons.B_SWORD);
    Game.player.setArmor(armors.W_ROBES);
    //Herm, lots of jizz.
    Game.player.femininity -= 2;
    Game.player.cumMultiplier = 5.5;
    Game.player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
    Game.player.createPerk(PerkLib.HistoryWhore, 0, 0, 0, 0);
}
		
	private static customNami():void {
    //Female with the sand-trap black pussy
    //Non-Virgin
    //Fertility- Normal Starting Value
    //Wetness- Above Average
    //Looseness- Normal Starting Value
    //Clit-size- Normal Value"
    Game.player.createVagina();
    Game.player.vaginas[0].vaginalWetness = VAGINA_WETNESS.SLICK;
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0.25;
    Game.player.vaginas[0].type = 5;
    Game.player.vaginas[0].virgin = false;
    Game.player.ass.analLooseness = 1;
    //Face- Canine
    Game.player.faceType = FACE.DOG;
    //Ears- Canine
    Game.player.upperBody.head.earType = EARS.DOG;
    //Tail- Canine
    Game.player.tailType = TAIL.DOG;
    //Lower body- Canine
    Game.player.lowerBody = LOWER_BODY.DOG;
    //White Fur (if possible)
    Game.player.skinType = SKIN.FUR;
    Game.player.hairColor = "white";
    Game.player.skinDesc = "fur";
    //Body Thickness/breastsize/- As if I had selected the ""Average"" body type from the start.
    Game.player.createBreastRow();
    Game.player.upperBody.chest.list[0].breastRating = 3;
    //Muscle Tone- A bit above average enough to trigger a mention of it in the desc.
    Game.player.tone = 55;
    //Nipples-  As above on size but the black sand trap nipples.
    Game.player.statusAffects.add(new StatusAffect("BlackNipples", 0, 0, 0, 0)));
    //Hair Length- Long
    Game.player.hairLength = 16;
    //Hair Color- Black
    //Skin Color- Light
    Game.player.skinTone = "light";
    //Starting Equipment: Wizard's Robe, Wizards Staff, and one White and one Black book in inventory.
    //equipArmor("inquisitor's corset",false);
    Game.player.setArmor(armors.W_ROBES);
	
    Game.player.setWeapon(weapons.W_STAFF);
    //Gift Perk- Smarts
    Game.player.createPerk(PerkLib.Smart, 0, 0, 0, 0);
    //History- Schooling
    Game.player.createPerk(PerkLib.HistoryScholar, 0, 0, 0, 0);
    Game.player.itemSlot1.setItemAndQty(consumables.W__BOOK, 1);
    Game.player.itemSlot2.setItemAndQty(consumables.B__BOOK, 1);
				
    Game.player.gender = 2;
    Game.player.tallness = 64;
    Game.player.femininity = 75;
    Game.player.lowerBody.butt.buttRating = 7;
    Game.player.lowerBody.hipRating = 7;
    Game.player.stats.int = 40;
    Game.player.str = 20;
    Game.player.stats.spe = 25;
    Game.player.tou = 15;
			
    MainScreen.clearText();
    MainScreen.text("Your exotic appearance caused you some trouble growing up, but you buried your nose in books until it came time to go through the portal.");
}
		
	private static customNavorn():void {
    MainScreen.text("There's been something special about you since day one, whether it's your numerous sexual endowments or your supernatural abilities.  You're a natural pick for champion.");
    //Character Creation	"Herm same number and types of cocks from email sent earlier. 
    //Special abilities: Fire breath, fox fire?
    Game.player.createPerk(PerkLib.Dragonfire, 0, 0, 0, 0);
    //equipment: Large claymore, and platemail
    //-Chainmail armor
    Game.player.setArmor(armors.FULLPLT);
    //-Large Claymore (i understand 40 Strength is need so if he could start with that would be great if not hit the gyms)"
    Game.player.setWeapon(weapons.CLAYMOR);
	
    Game.player.str = 41;
    //femininity: 95
    Game.player.femininity = 95;
    //(0 lust cum production: 10000)
    Game.player.cumMultiplier += 500;
    //(base fertility 20 if possible?)
    Game.player.fertility = 20;
    //Appearence: 7ft 9in tall covered in thick shining silver fur, has a vulpine head and ears, eight breast all the same size at DD, dragon like wings, tail, and legs. With a large mare like pussy, 6 dicks, two equine, two dragon, two vulpine, all 15in long and 3 in wide, and four nuts 5 in across
    Game.player.tallness = 93;
    Game.player.skinTone = "black";
    Game.player.skinType = SKIN.FUR;
    Game.player.skinDesc = "fur";
    Game.player.hairColor = "silver";
    Game.player.faceType = FACE.FOX;
    Game.player.upperBody.head.earType = EARS.FOX;
    Game.player.createBreastRow();
    Game.player.createBreastRow();
    Game.player.createBreastRow();
    Game.player.upperBody.chest.list[0].breastRating = 5;
    Game.player.upperBody.chest.list[0].nipplesPerBreast = 4;
    Game.player.upperBody.chest.list[0].fuckable = true;
    Game.player.upperBody.chest.list[1].breastRating = 5;
    Game.player.upperBody.chest.list[1].nipplesPerBreast = 4;
    Game.player.upperBody.chest.list[1].fuckable = true;
    Game.player.upperBody.chest.list[2].breastRating = 5;
    Game.player.upperBody.chest.list[2].nipplesPerBreast = 4;
    Game.player.upperBody.chest.list[2].fuckable = true;
    Game.player.upperBody.chest.list[3].breastRating = 5;
    Game.player.upperBody.chest.list[3].nipplesPerBreast = 4;
    Game.player.upperBody.chest.list[3].fuckable = true;
    if(!Game.player.lowerBody.cockSpot.hasCock()) Game.player.lowerBody.cockSpot.add(new Cock());
Game.player.lowerBody.cockSpot.add(new Cock());
Game.player.lowerBody.cockSpot.add(new Cock());
Game.player.lowerBody.cockSpot.add(new Cock());
Game.player.lowerBody.cockSpot.add(new Cock());
Game.player.lowerBody.cockSpot.add(new Cock());
Game.player.lowerBody.cockSpot.list[0].cockType = CockType.HORSE;
Game.player.lowerBody.cockSpot.list[0].cockLength = 15;
Game.player.lowerBody.cockSpot.list[0].cockThickness = 3;
Game.player.lowerBody.cockSpot.list[1].cockType = CockType.HORSE;
Game.player.lowerBody.cockSpot.list[1].cockLength = 15;
Game.player.lowerBody.cockSpot.list[1].cockThickness = 3;
Game.player.lowerBody.cockSpot.list[2].cockType = CockType.DOG;
Game.player.lowerBody.cockSpot.list[2].cockLength = 15;
Game.player.lowerBody.cockSpot.list[2].cockThickness = 3;
Game.player.lowerBody.cockSpot.list[2].knotMultiplier = 2;
Game.player.lowerBody.cockSpot.list[3].cockType = CockType.DOG;
Game.player.lowerBody.cockSpot.list[3].cockLength = 15;
Game.player.lowerBody.cockSpot.list[3].cockThickness = 3;
Game.player.lowerBody.cockSpot.list[3].knotMultiplier = 2;
Game.player.lowerBody.cockSpot.list[4].cockType = CockType.DRAGON;
Game.player.lowerBody.cockSpot.list[4].cockLength = 15;
Game.player.lowerBody.cockSpot.list[4].cockThickness = 3;
Game.player.lowerBody.cockSpot.list[5].cockType = CockType.DRAGON;
Game.player.lowerBody.cockSpot.list[5].cockLength = 15;
Game.player.lowerBody.cockSpot.list[5].cockThickness = 3;
Game.player.lowerBody.balls = 4;
Game.player.lowerBody.ballSize = 5;
//hair length: 15 in
Game.player.hairLength = 15;
//hip size: 15/20
Game.player.lowerBody.hipRating = 15;
//butt size: 15/20
Game.player.lowerBody.butt.buttRating = 15;
//body thickness: 50/100
Game.player.thickness = 50;
//Muscle: 75/100"
Game.player.tone = 75;
//for wetness a squirter, looseness a 2 and capacity at 140.
if (!Game.player.lowerBody.vaginaSpot.hasVagina()) Game.player.createVagina();
Game.player.vaginas[0].vaginalWetness = VAGINA_WETNESS.SLAVERING;
Game.player.statusAffects.add(new StatusAffect("BonusVCapacity", 132, 0, 0, 0)));
//Virgin, high fertility like in the email I sent before.  dragon wings, nine fox tails,  dragon legs, eight DD breasts with four fuckable nipples each, dragon tongue, waist length hair, large dragon wings.
Game.player.upperBody.wingType = WING.DRACONIC_LARGE;
Game.player.upperBody.wingDesc = "large, draconic";
Game.player.tailType = TAIL.FOX;
Game.player.lowerBody.tailVenom = 9;
Game.player.lowerBody = LOWER_BODY.DRAGON;
Game.player.tongueType = TONUGE.DRACONIC;
Game.player.hairLength = 45;
Game.player.createPerk(PerkLib.EnlightenedNinetails, 0, 0, 0, 0);
Game.player.gender = 3;
	}
		
	private static customNixi():void {
    //-Perks
    //fertility AND messy orgasm (hope that's not pushing it)
    Game.player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
    Game.player.createPerk(PerkLib.Fertile, 1.5, 0, 0, 0);
    //fighting history
    Game.player.createPerk(PerkLib.HistoryFighter, 0, 0, 0, 0);
    //3 starting perk points
    Game.player.perkPoints = 3;
    //some starting gems (just go ahead and surprise me on the amount)
    Game.player.stats.gems = Utils.rand(800);
    //Specific Character
    //-Female... with a dog cock
    //11"" long, 2"" wide, 2.4"" knot
    //no balls
    //virgin pussy, 0.2"" clit
    //wetness 2
    //fertility 30 
    //virgin bum
    //anal wetness 1
    Game.player.ass.analWetness = 2;
    Game.player.gender = 3;
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.lowerBody.cockSpot.list[0].cockLength = 11;
    Game.player.lowerBody.cockSpot.list[0].cockThickness = 2;
    Game.player.lowerBody.cockSpot.list[0].knotMultiplier = 1.2;
    Game.player.lowerBody.cockSpot.list[0].cockType = CockType.DOG;
    Game.player.lowerBody.balls = 0;
    Game.player.createBreastRow();
    Game.player.createVagina();
    Game.player.vaginas[0].vaginalWetness = VAGINA_WETNESS.WET;
    //1 pair DD's, 0.5"" nipples"
    Game.player.upperBody.chest.list[0].breastRating = 5;
    Game.player.upperBody.chest.BreastRatingLargest[0].nippleLength = 0.5;
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = .5;
    Game.player.fertility = 30;
    Game.player.lowerBody.hipRating = 6;
    Game.player.lowerBody.butt.buttRating = 6;
    Game.player.str = 15;
    Game.player.tou = 15;
    Game.player.stats.spe = 18;
    Game.player.stats.int = 17;
    Game.player.stats.sens = 15;
    Game.player.stats.lib = 15;
    Game.player.stats.cor = 0;
    kGAMECLASS.notes = "No Notes Available.";
    Game.player.HP = kGAMECLASS.maxHP();
			
    Game.player.skinType = SKIN.PLAIN;
    Game.player.faceType = FACE.HUMAN;
    Game.player.tailType = TAIL.NONE;
    Game.player.tongueType = TONUGE.HUMAN;
    Game.player.femininity = 85;
    Game.player.beardLength = 0;
    Game.player.beardStyle = 0;
    //75 muscle tone
    Game.player.tone = 75;
    //25 thickness
    Game.player.thickness = 25;
    Game.player.skinDesc = "fur";
    Game.player.skinType = SKIN.FUR;
    Game.player.skinTone = "light";
    Game.player.hairColor = "silver";
    Game.player.hairLength = 10;
    //shoulder length silver hair

    Game.player.lowerBody.balls = 0;
    Game.player.cumMultiplier = 1;
    Game.player.lowerBody.ballSize = 0;
    Game.player.hoursSinceCum = 0;
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0;
    Game.player.ass.analLooseness = 0;
    Game.player.ass.analWetness = 0;
    Game.player.ass.fullness = 0;
    Game.player.fertility = 5;
    Game.player.fatigue = 0;
    Game.player.horns = 0;
    Game.player.tallness = 82;
    Game.player.lowerBody.tailVenom = 0;
    Game.player.lowerBody.tailRecharge = 0;
    Game.player.upperBody.wingType = WING.NONE;
    Game.player.upperBody.wingDesc = "non-existant";
    //6' 10"" german-shepherd morph, face ears hands feet tail, the whole nine yards
    Game.player.faceType = FACE.DOG;
    Game.player.lowerBody = LOWER_BODY.DOG;
    Game.player.tailType = TAIL.DOG;
    Game.player.upperBody.head.earType = EARS.DOG;
    ////"	"I'm picturing a tall, feminine German-Shepherd morph, solid white and gorgeous. She has both sets of genitals, with no balls, and a large set of breasts. She wields a large claymore and is dressed in a full chain vest and pants. 
    //large claymore (and the strength to use it)
    Game.player.setWeapon(weapons.CLAYMOR);
    Game.player.str = 40;
    //full chain
    Game.player.setArmor(armors.FULLCHN);
    MainScreen.text("As a German-Shepherd morph, the rest of the village never really knew what to do with you... until they sent you through the portal to face whatever's on the other side...");
}
		
	private static customPrismere():void {
    //Specific Character	Female, virgin, high fertility, tight with standard wetness and clit.
    Game.player.createVagina();
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0.25;
    Game.player.fertility = 4;
    Game.player.stats.spe += 20;
    MainScreen.text("You're more of a scout than a fighter, but you still feel confident you can handle your responsibilities as champion.  After all, what's to worry about when you can outrun everything you encounter?  You have olive skin, deep red hair, and a demonic tail and wings to blend in with the locals.");
    //Perk is speed, she was a scout, and it'd be neat (if possible) to give her something akin to the Runner perk. She might not start out very strong or tough, but at least she's fast.
    Game.player.createPerk(PerkLib.Fast, 0.25, 0, 0, 0);
    Game.player.createPerk(PerkLib.Runner, 0, 0, 0, 0);
    //In the human world, Prismere began as a scout, helping patrol areas with portals to make sure demonspawn and corruption didn't reach the human homeland. She's gotten herself into a few tight spots because of it, but she's hard to keep pinned down. She has a fiance back in her village whom she fully intends to get back to, so her libido isn't especially high. 
    //As of the time the PC takes her on, she has some signs of demonic taint, so Corruption might start at 5 to 10 points."	"Breasts at E, height at 5'0, a curvy build with a more narrow waist and substantial hips and butt. Skin is olive, like a mocha, hair is long and wildly wavy, a deep red, and eyes are a stormy blue. Muscles are barely visible; what muscle she has is the lean build of a runner, not a fighter. Nipples aren't especially long, but more soft. 
    Game.player.stats.cor = 5;
    Game.player.createBreastRow();
    Game.player.upperBody.chest.list[0].breastRating = 7;
    Game.player.tallness = 60;
    Game.player.lowerBody.hipRating = 8;
    Game.player.lowerBody.butt.buttRating = 8;
    Game.player.thickness = 25;
    Game.player.tone = 40;
    Game.player.skinTone = "olive";
    Game.player.hairLength = 30;
    Game.player.hairColor = "deep red";
    Game.player.femininity = 90;
    //She has a demonic tail and small demonic wings thanks to some encounters early on with succubus milk (that stuff is delicious!) but is otherwise still human.
    Game.player.upperBody.wingType = WING.BAT_LIKE_LARGE;
    Game.player.upperBody.wingDesc = "large, bat-like";
    Game.player.tailType = TAIL.DEMONIC;
    //I feel really weird talking about all this, so if there's anything you need to change or can't do, or if I totally misinterpreted this, just shoot me an email! jordie.wierenga@gmail.com . Thanks in advance... I'm a big fan. "	Prismere
}
		
	private static customRannRayla():void {
    //Specific Character	Virgin female.	Max femininity. Thin with a little muscle. Size C breasts. Long red hair. Light colored skin. 5'5" tall. 	Rann Rayla
    MainScreen.text("You're a young, fiery redhead who\'s utterly feminine.  You've got C-cup breasts and long red hair.  Being a champion can\'t be that bad, right?");
    Game.player.createVagina();
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0.25;
    Game.player.createBreastRow();
    Game.player.upperBody.chest.list[0].breastRating = 3;
    Game.player.upperBody.chest.BreastRatingLargest[0].nippleLength = 0.5;
    Game.player.hairLength = 22;
    Game.player.hairColor = "red";
    Game.player.skinTone = "light";
    Game.player.skinDesc = "skin";
    Game.player.skinType = SKIN.PLAIN;
    Game.player.femininity = 100;
    Game.player.thickness = 25;
    Game.player.tone = 65;
    Game.player.tallness = 65;
}
		
	private static customRope():void {
    //529315025394020	Character Creation	Neuter (no genitals) "50-50 masculine-feminine ratio. Shark teeth."	Rope
    MainScreen.text("Despite outward appearances, you're actually something of a neuter, with shark-like teeth, an androgynous face, and a complete lack of genitalia.");
    if(Game.player.lowerBody.cockSpot.hasCock()) Game.player.lowerBody.cockSpot.remove(0, 1);
    if(Game.player.lowerBody.vaginaSpot.hasVagina()) Game.player.removeVagina();
    Game.player.gender = 0;
    Game.player.femininity = 50;
    Game.player.faceType = FACE.SHARK_TEETH;
}
		
	private static customSera():void {
    MainScreen.text("You're something of a shemale - three rows of C-cup breasts matched with three, plump, juicy cocks.  Some decent sized balls, bat wings, and cat-like ears round out the package.");
    Game.player.gender = 1;
    Game.player.tou += 2;
    Game.player.str += 3;
    Game.player.fertility = 5;
    Game.player.hairLength = 26;
    Game.player.hairColor = "white";
    Game.player.skinTone = "light";
    Game.player.upperBody.chest.BreastRatingLargest[0].nippleLength = 0.2;
    Game.player.createBreastRow();
    Game.player.createBreastRow();
    Game.player.createBreastRow();
    Game.player.upperBody.chest.list[0].breastRating = 3;
    Game.player.upperBody.chest.list[1].breastRating = 3;
    Game.player.upperBody.chest.list[2].breastRating = 3;
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.lowerBody.cockSpot.add(new Cock());
    Game.player.lowerBody.cockSpot.list[0].cockLength = 8;
    Game.player.lowerBody.cockSpot.list[0].cockThickness = 1.6;
    Game.player.lowerBody.cockSpot.list[1].cockLength = 8;
    Game.player.lowerBody.cockSpot.list[1].cockThickness = 1.6;
    Game.player.lowerBody.cockSpot.list[2].cockLength = 8;
    Game.player.lowerBody.cockSpot.list[2].cockThickness = 1.6;
    Game.player.lowerBody.balls = 2;
    Game.player.lowerBody.ballSize = 3;
    Game.player.tallness = 113;
    Game.player.tone = 50;
    Game.player.thickness = 50;
    Game.player.femininity = 50;
    Game.player.lowerBody.hipRating = 5;
    Game.player.lowerBody.butt.buttRating = 5;
    Game.player.teaseLevel = 1;
    //Build: average
    //Complexion: light
    //9 foot 5 inches tall
    //Hair: very long white
    //Gift: Lotz of Jizz
    //History: Schooling
    Game.player.cumMultiplier = 5.5;
	
    Game.player.createPerk(PerkLib.MessyOrgasms, 1.25, 0, 0, 0);
    Game.player.createPerk(PerkLib.HistoryScholar, 0, 0, 0, 0);
    //Apperance: Cat Ears, Large Bat Like Wings, 3 Rows of breasts (C cub, 0,2 nipples)
    Game.player.upperBody.head.earType = EARS.CAT;
    Game.player.upperBody.wingType = WING.BAT_LIKE_LARGE;
    Game.player.upperBody.wingDesc = "large, bat-like";
    //Items: Katana, Leather Armor
    Game.player.setWeapon(weapons.KATANA);
    Game.player.setArmor(armors.URTALTA);
    //Key Item: Deluxe Dildo
    Game.player.createKeyItem("Deluxe Dildo", 0, 0, 0, 0);
}
		
	private static customSiveen():void {
    //Female
    //Virgin
    Game.player.gender = 2;
    Game.player.createVagina();
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0.25;
    //has a self-repairing hymen in her cunt"	"Angel
    //(means feathered wings on her back)
    Game.player.upperBody.wingType = WING.HARPY;
    //Halo (Flaming)
    //D-cups
    Game.player.createBreastRow();
    Game.player.upperBody.chest.list[0].breastRating = 4;
    //human skin
    //heart-shaped ass
    Game.player.lowerBody.butt.buttRating = 9;
    Game.player.lowerBody.hipRating = 6;
    //Ass-length white and black hair
    Game.player.hairLength = 30;
    Game.player.hairColor = "white and black";
    //heterochromia (one blue eye one red eye)
    //7"" nips
    Game.player.upperBody.chest.BreastRatingLargest[0].nippleLength = 7;
    //waif thin body
    Game.player.thickness = 0;
    //Fallen Angel gear (complete with flaming sword and light arrows)
    //dark skin tone
    Game.player.skinTone = "dark";
    Game.player.setWeapon(weapons.S_BLADE);
	
    //Elfin ears
    Game.player.upperBody.head.earType = EARS.ELFIN;
    //tight asshole
    //human tongue
    //human face
    //no tail, fur, or scales"
    Flags.set(FlagEnum.HISTORY_PERK_SELECTED, 0);
    Game.player.str = 25;
    Game.player.tou = 25;
    Game.player.stats.int = 25;
    Game.player.stats.spe = 25;
    MainScreen.text("You are a literal angel from beyond, and you take the place of a vilage's champion for your own reasons...");
}
		
	private static customSora():void {
    //Character Creation	Female,virgin	A kitsune with a snake-like tongue	Sora
    if(Game.player.lowerBody.vaginaSpot.hasVagina()) Game.player.vaginas[0].virgin = true;
    Game.player.tongueType = TONUGE.SNAKE;
    Game.player.upperBody.head.earType = EARS.FOX;
    Game.player.tailType = TAIL.FOX;
    Game.player.lowerBody.tailVenom = 2;
    Game.player.stats.int = 30;
    if(Game.player.findStatusAffect(StatusAffects.BonusVCapacity) < 0) Game.player.statusAffects.add(new StatusAffect("BonusVCapacity", 0, 0, 0, 0)));
    else Game.player.addStatusValue(StatusAffects.BonusVCapacity, 1, 5 + Utils.rand(10));
    MainScreen.text("As a Kitsune, you always got weird looks, but none could doubt your affinity for magic...");
}
		
	private static customTestChar():void {
    Game.player.XP = 500000;
    Game.player.level = 20;
    Game.player.createBreastRow();
    Game.player.createVagina();
    Game.player.upperBody.chest.list[0].breastRating = 5;
    Game.player.upperBody.chest.list[0].lactationMultiplier = 2;
		
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0.5;
    Game.player.fertility = 50;
    Game.player.gender = 2;
    Game.player.lowerBody.hipRating = 6;
    Game.player.lowerBody.butt.buttRating = 6;
    Game.player.str = 100;
    Game.player.tou = 100;
    Game.player.stats.spe = 100;
    Game.player.stats.int = 100;
    Game.player.stats.sens = 100;
    Game.player.stats.lib = 30;
    Game.player.stats.cor = 71;
    kGAMECLASS.notes = "Cheater!";
    Game.player.HP = kGAMECLASS.maxHP();
    Game.player.hairLength = 10;
    Game.player.skinType = SKIN.PLAIN;
    Game.player.faceType = FACE.HUMAN;
    Game.player.tailType = TAIL.FOX;
    Game.player.lowerBody.tailVenom = 4;
    Game.player.tongueType = TONUGE.HUMAN;
    Game.player.femininity = 90;
    Game.player.beardLength = 0;
    Game.player.beardStyle = 0;
    Game.player.tone = 0;
    Game.player.thickness = 100;
    Game.player.skinDesc = "skin";
    Game.player.skinTone = "pale";
    Game.player.hairColor = "black";
    Game.player.lowerBody.balls = 2;
    Game.player.cumMultiplier = 1;
    Game.player.lowerBody.ballSize = 3;
    Game.player.hoursSinceCum = 0;
    Game.player.ass.analLooseness = 0;
    Game.player.ass.analWetness = 0;
    Game.player.ass.fullness = 0;
    Game.player.fertility = 50;
    Game.player.fatigue = 0;
    Game.player.horns = 0;
    Game.player.hornType = HORNS.NONE;
    Game.player.tallness = 109;
    Game.player.lowerBody.tailVenom = 0;
    Game.player.lowerBody.tailRecharge = 0;
    Game.player.upperBody.wingType = WING.DRACONIC_LARGE;
    Game.player.upperBody.wingDesc = "non-existant";
    Game.player.upperBody.head.earType = EARS.HUMAN;
    Game.player.lowerBody = LOWER_BODY.HUMAN;
    Game.player.armType = ARM.HUMAN;
    Game.player.hairLength = 69.2;
    Game.player.upperBody.head.hairType = 4;
    //Bow skill 100 (Sorry Kelt, I can't hear your insults over my mad Robin Hood skillz)
    Game.player.statusAffects.add(new StatusAffect("Kelt", 100, 0, 0, 0)));
    Game.player.createKeyItem("Bow", 0, 0, 0, 0);
			
    Game.player.createKeyItem("Zetaz's Map", 0, 0, 0, 0);
			
    inventory.createStorage();
    inventory.createStorage();
    inventory.createStorage();
    inventory.createStorage();
    inventory.createStorage();
    inventory.createStorage();
    Game.player.createKeyItem("Camp - Chest", 0, 0, 0, 0);
    Game.player.createKeyItem("Equipment Rack - Weapons", 0, 0, 0, 0);
    Flags.set(FlagEnum.UNKNOWN_FLAG_NUMBER_00254, 1);
    Game.player.createKeyItem("Equipment Rack - Armor", 0, 0, 0, 0);
    Flags.set(FlagEnum.UNKNOWN_FLAG_NUMBER_00255, 1);
		
    Game.player.statusAffects.add(new StatusAffect("KnowsWhitefire", 0, 0, 0, 0)));
			
    Game.player.createPerk(PerkLib.HistoryFighter, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Acclimation, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Berzerker, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.BrutalBlows, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.DoubleAttack, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.ImmovableObject, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.LightningStrikes, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.LungingAttacks, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Precision, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Regeneration, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Regeneration2, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Resistance, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Resolute, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.SpeedyRecovery, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Tactician, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Tank, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Tank2, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.ThunderousStrikes, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.WeaponMastery, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.WellAdjusted, 0, 0, 0, 0);
			
    Game.player.createPerk(PerkLib.SensualLover, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.SensualLover, 0, 0, 0, 0);
			
    Flags.set(FlagEnum.VALARIA_AT_CAMP, 1);
			
    Game.player.stats.gems += 30000;
    MainScreen.text("You're something of a powerhouse, and you wager that between your odd mutations, power strong enough to threaten the village order, and talents, you're the natural choice to send through the portal.");
			
    Game.player.itemSlot4.unlocked = true;
    Game.player.itemSlot5.unlocked = true;
    Game.player.itemSlot1.setItemAndQty(consumables.P_LBOVA, 5);
    Game.player.itemSlot2.setItemAndQty(consumables.L_PNKEG, 1);
    Game.player.itemSlot3.setItemAndQty(consumables.OVIELIX, 1);
    Game.player.itemSlot4.setItemAndQty(consumables.REPTLUM, 1);
			
    Game.player.statusAffects.add(new StatusAffect("TelAdre", 1, 0, 0, 0)));
    //Game.player.statusAffects.add(new StatusAffect("MetWhitney", 2, 0, 0, 0)));

    // Izma
    Flags.set(FlagEnum.UNKNOWN_FLAG_NUMBER_00238, 1);
			
    // Vapula
    Flags.set(FlagEnum.VAPULA_FOLLOWER, 1);
			
    // Amily
    Flags.set(FlagEnum.AMILY_FOLLOWER, 2);
			
    // Jojo
    kGAMECLASS.monk = 5;
			
    // Bimbo Sophie
    Flags.set(FlagEnum.UNKNOWN_FLAG_NUMBER_00282, 1);
			
    // Isabella
    Flags.set(FlagEnum.ISABELLA_FOLLOWER_ACCEPTED, 1);
			
    // Latexy
    Flags.set(FlagEnum.GOO_SLAVE_RECRUITED, 1);
    Flags.set(FlagEnum.GOO_NAME, "Latexy");
    Flags.set(FlagEnum.GOO_FLUID_AMOUNT, 100);
    Flags.set(FlagEnum.GOO_HAPPINESS, 100);
    Flags.set(FlagEnum.GOO_OBEDIENCE, 100);
			
    // Ceraph
    Flags.set(FlagEnum.UNKNOWN_FLAG_NUMBER_00286, 1);
			
    // Holli
    Flags.set(FlagEnum.FUCK_FLOWER_LEVEL, 4);
			
    // Milky
    Flags.set(FlagEnum.MILK_NAME, "Milky");
    Flags.set(FlagEnum.MILK_SIZE, 2);
			
    // Rubi Testing
    //Flags.set(FlagEnum.RUBI_SUITCLOTHES, 1);
    //Flags.set(FlagEnum.RUBI_FETISH_CLOTHES, 1);
    //Flags.set(FlagEnum.RUBI_GREEN_ADVENTURER, 1);
    //Flags.set(FlagEnum.RUBI_TUBE_TOP, 1);
    //Flags.set(FlagEnum.RUBI_BODYSUIT, 1);
    //Flags.set(FlagEnum.RUBI_LONGDRESS, 1);
    //Flags.set(FlagEnum.RUBI_TIGHT_PANTS, 1);
    //Flags.set(FlagEnum.RUBI_NURSE_CLOTHES, 1);
    //Flags.set(FlagEnum.RUBI_SWIMWEAR, 1);
    //Flags.set(FlagEnum.RUBI_BIMBO_MINIDRESS, 1);
    //Flags.set(FlagEnum.RUBI_BONDAGE_STRAPS, 1);
    //Flags.set(FlagEnum.RUBI_INQUISITORS_CORSET, 1);
    Flags.set(FlagEnum.RUBI_AFFECTION, 75);
    Flags.set(FlagEnum.RUBI_INTRODUCED, 1);
			
    // Bazaar
    Flags.set(FlagEnum.BAZAAR_ENTERED, 1);
}
		
	private static customTyriana():void {
    MainScreen.text("Your many, posh tits, incredible fertility, and well-used cunt made you more popular than the village bicycle.  With your cat-like ears, paws, and tail, you certainly had a feline appeal.  It's time to see how you fare in the next chapter of your life.");
    //"Gender: Female
    Game.player.gender = 2;
    //Vagina: Ridiculously loose, 3 inch clitoris, dripping constantly, fertile like a bunny on steroids and non-virgin
    Game.player.createVagina();
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 3;
    Game.player.vaginas[0].vaginalWetness = VAGINA_WETNESS.DROOLING;
    Game.player.vaginas[0].vaginalLooseness = VAGINA_LOOSENESS.LEVEL_CLOWN_CAR;
    Game.player.vaginas[0].virgin = false;
    Game.player.fertility = 50;
    //Butt: Just as loose
    Game.player.ass.analLooseness = 5;
    //"Skin: Tanned
    Game.player.skinTone = "tan";
    //Hair: Ridiculously long red
    Game.player.hairLength = 80;
    Game.player.hairColor = "red";
    //Face: Gorgeous Feminine, long demonic tongue, cat ears
    Game.player.femininity = 100;
    Game.player.tongueType = TONUGE.DEMONIC;
    Game.player.upperBody.head.earType = EARS.CAT;
    //Body: Very muscular, average weight, plump ass, above average thighs, cat tail and cat paws
    Game.player.tone = 80;
    Game.player.thickness = 50;
    Game.player.lowerBody.butt.buttRating = 12;
    Game.player.lowerBody.hipRating = 10;
    Game.player.tailType = TAIL.CAT;
    Game.player.lowerBody = LOWER_BODY.CAT;
    //Breasts: 2 E-cups on top, 2 DD-cups mid, 2 D-cups bottom, 3.5 inch nipples
    Game.player.createBreastRow();
    Game.player.createBreastRow();
    Game.player.createBreastRow();
    Game.player.tallness = 67;
    Game.player.upperBody.chest.list[0].breastRating = 7;
    Game.player.upperBody.chest.list[1].breastRating = 5;
    Game.player.upperBody.chest.list[2].breastRating = 4;
    Game.player.upperBody.chest.BreastRatingLargest[0].nippleLength = 3.5;
    //Perks: Slut and Fertile"	

    Game.player.stats.spe += 3;
    Game.player.stats.int += 2;
	
    Game.player.createPerk(PerkLib.HistorySlut, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Fertile, 1.5, 0, 0, 0);
    Game.player.teaseLevel = 3;
}
		
	private static customVahdunbrii():void {
    Game.player.createBreastRow();
    Game.player.createVagina();
    Game.player.upperBody.chest.list[0].breastRating = 3;
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = .5;
    Game.player.fertility = 10;
    Game.player.gender = 2;
    Game.player.lowerBody.hipRating = 6;
    Game.player.lowerBody.butt.buttRating = 6;
    Game.player.str = 15;
    Game.player.tou = 15;
    Game.player.stats.spe = 18;
    Game.player.stats.int = 17;
    Game.player.stats.sens = 15;
    Game.player.stats.lib = 15;
    Game.player.stats.cor = 0;
    kGAMECLASS.notes = "No Notes Available.";
    Game.player.HP = kGAMECLASS.maxHP();
    Game.player.hairLength = 10;
    Game.player.skinType = SKIN.PLAIN;
    Game.player.faceType = FACE.HUMAN;
    Game.player.tailType = TAIL.NONE;
    Game.player.tongueType = TONUGE.HUMAN;
    Game.player.femininity = 70;
    Game.player.beardLength = 0;
    Game.player.beardStyle = 0;
    Game.player.tone = 30;
    Game.player.thickness = 50;
    Game.player.skinDesc = "skin";
    Game.player.skinTone = "light";
    Game.player.hairColor = "brown";
    Game.player.lowerBody.balls = 0;
    Game.player.cumMultiplier = 1;
    Game.player.lowerBody.ballSize = 0;
    Game.player.hoursSinceCum = 0;
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0;
    Game.player.ass.analLooseness = 0;
    Game.player.ass.analWetness = 0;
    Game.player.ass.fullness = 0;
    Game.player.fertility = 5;
    Game.player.fatigue = 0;
    Game.player.horns = 0;
    Game.player.tallness = 67;
    Game.player.lowerBody.tailVenom = 0;
    Game.player.lowerBody.tailRecharge = 0;
    Game.player.upperBody.wingType = WING.NONE;
    Game.player.upperBody.wingDesc = "non-existant";
    Game.player.upperBody.head.earType = EARS.CAT;
    Game.player.lowerBody = LOWER_BODY.CAT;
    Game.player.tailType = TAIL.CAT;
    Game.player.createPerk(PerkLib.Incorporeality, 0, 0, 0, 0);
    Game.player.upperBody.wingType = WING.FEATHERED_LARGE;
    Game.player.armType = ARM.HARPY;
    Game.player.hornType = HORNS.DRACONIC_X2;
    Game.player.horns = 4;
    Game.player.faceType = FACE.SPIDER_FANGS;
    Game.player.hairLength = 69.2;
    Game.player.hairColor = "dark blue";
    Game.player.upperBody.head.hairType = 2;
    Game.player.skinAdj = "smooth";
    Game.player.skinTone = "sanguine";
    Game.player.tallness = 68;
    Game.player.lowerBody.hipRating = 7;
    Game.player.lowerBody.butt.buttRating = 6;
    Game.player.thickness = 4;
    Game.player.tone = 98;
    Game.player.upperBody.chest.list[0].breastRating = 3;
    Game.player.lowerBody.vaginaSpot.list[0].clitLength = 0.2;
    Game.player.femininity = 85;
    //Beautiful Sword
    Game.player.setWeapon(weapons.B_SWORD);
    Game.player.setArmor(armors.SSARMOR);
    //Bow skill 100 (Sorry Kelt, I can't hear your insults over my mad Robin Hood skillz)
    Game.player.statusAffects.add(new StatusAffect("Kelt", 100, 0, 0, 0)));
    Game.player.createKeyItem("Bow", 0, 0, 0, 0);
    inventory.createStorage();
    inventory.createStorage();
    inventory.createStorage();
    inventory.createStorage();
    inventory.createStorage();
    inventory.createStorage();
    Game.player.createKeyItem("Camp - Chest", 0, 0, 0, 0);
    Game.player.createKeyItem("Equipment Rack - Weapons", 0, 0, 0, 0);
    Flags.set(FlagEnum.UNKNOWN_FLAG_NUMBER_00254, 1);
    Game.player.createKeyItem("Equipment Rack - Armor", 0, 0, 0, 0);
    Flags.set(FlagEnum.UNKNOWN_FLAG_NUMBER_00255, 1);
    //(Flexibility), (Incorporeality), History: Religious, Dragonfire, Brood Mother, Magical Fertility, Wet Pussy, Tough, Strong, Fast, Smart, History: Scholar, History: Slacker, Strong Back, Strong Back 2: Stronger Harder
    Game.player.createPerk(PerkLib.Flexibility, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.HistoryReligious, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Dragonfire, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.BroodMother, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.Fertile, 1.5, 0, 0, 0);
    Game.player.vaginas[0].vaginalWetness = VAGINA_WETNESS.WET;
    Game.player.createPerk(PerkLib.WetPussy, 2, 0, 0, 0);
    Game.player.createPerk(PerkLib.Tough, 0.25, 0, 0, 0);
    Game.player.createPerk(PerkLib.Strong, 0.25, 0, 0, 0);
    Game.player.createPerk(PerkLib.Fast, 0.25, 0, 0, 0);
    Game.player.createPerk(PerkLib.Smart, 0.25, 0, 0, 0);
    Game.player.createPerk(PerkLib.HistoryScholar, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.StrongBack, 0, 0, 0, 0);
    Game.player.itemSlot4.unlocked = true;
    Game.player.itemSlot5.unlocked = true;
    Game.player.createPerk(PerkLib.StrongBack2, 0, 0, 0, 0);
    Game.player.createPerk(PerkLib.HistorySlacker, 0, 0, 0, 0);
    Game.player.str += 4;
    Game.player.tou += 4;
    Game.player.stats.int += 2;
    Game.player.stats.spe += 2;
    Game.player.stats.gems += 300;
    MainScreen.text("You're something of a powerhouse, and you wager that between your odd mutations, power strong enough to threaten the village order, and talents, you're the natural choice to send through the portal.");
}
}
