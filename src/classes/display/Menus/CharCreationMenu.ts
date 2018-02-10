import BreastRow, { BreastCup } from '../../Body/BreastRow';
import { ButtRating } from '../../Body/Butt';
import Cock, { CockType } from '../../Body/Cock';
import { EarType } from '../../Body/Ears';
import { FaceType } from '../../Body/Face';
import { Gender } from '../../Body/GenderIdentity';
import { HipRating } from '../../Body/Hips';
import { LegType } from '../../Body/Legs';
import { SkinType } from '../../Body/Skin';
import { TailType } from '../../Body/Tail';
import { TongueType } from '../../Body/Tongue';
import Vagina, { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import Player from '../../Player/Player';
import DisplayText from '../DisplayText';
import InputTextElement from '../Elements/InputTextElement';
import MainScreen, { TopButton } from '../MainScreen';

export default class CharCreationMenu {
    private nameField: InputTextElement;

    public newGamePlus(): void {
        Flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] = Game.player.stats.XP;
        if (Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP]) Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] = 1;
        while (Game.player.stats.level > 1) {
            Flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] += Game.player.stats.level * 100;
            Game.player.stats.level--;
        }
        Flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS] = Game.player.inventory.gems;
        this.display();
    }

    public display(): void {
        MainScreen.getStatsPanel().hide();
        MainScreen.getTopButton(TopButton.MainMenu).hide();
        MainScreen.getTopButton(TopButton.Data).hide();
        MainScreen.getTopButton(TopButton.Stats).hide();
        MainScreen.getTopButton(TopButton.Perks).hide();
        // If first PC, track status of EZ mode and other such nonsense.
        const silly: number = Flags.list[FlagEnum.SILLY_MODE_ENABLE_FLAG];
        const easy: number = Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG];
        const sprite: number = Flags.list[FlagEnum.SHOW_SPRITES_FLAG];

        // Hold onto old data for NG+
        const oldPlayer = Game.player;

        // Create new Player
        const newPlayer = new Player();
        Game.player = newPlayer;

        this.clearEverything();

        this.enterName(newPlayer);
    }

    private clearEverything() {
        // Clear plot storage array!
        Flags.clear();

        // Remember silly/sprite/etc
        if (sprite) Flags.list[FlagEnum.SHOW_SPRITES_FLAG] = 1;
        if (easy) Flags.list[FlagEnum.EASY_MODE_ENABLE_FLAG] = 1;
        if (silly) Flags.list[FlagEnum.SILLY_MODE_ENABLE_FLAG] = 1;
        // Set that jojo debug doesn't need to run
        Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_00102] = 1;
        Flags.list[FlagEnum.UNKNOWN_FLAG_NUMBER_02999] = 3;
        // Time reset
        Time.days = 0;
        Game.time.hour = 0;

        // Exploration
        Game.player.explored = 0;
        Game.player.exploredForest = 0;
        Game.player.exploredDesert = 0;
        Game.player.exploredMountain = 0;
        Game.player.exploredLake = 0;
        // PLOTZ
        kGAMECLASS.monk = 0;
        kGAMECLASS.whitney = 0;
        kGAMECLASS.sand = 0;
        // Replaced by flag	kGAMECLASS.beeProgress = 0;
        kGAMECLASS.giacomo = 0;
        // Lets get this bitch started
        kGAMECLASS.inCombat = false;
        // NG+ Clothes reset
        if (Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS] !== 0) {
            // Clear Raphael's training variable so it does not effect
            // Weapon strength post-newgame.
            Flags.list[FlagEnum.RAPHAEL_RAPIER_TRANING] = 0;

            // check for goo armor
            if (!(oldPlayer.armor)) {
                Game.player.setArmor(oldPlayer.armor);
            }
            else {
                Game.player.setArmor(armors.C_CLOTH);
            }

            Game.player.setWeapon(oldPlayer.weapon);
        }
        // Clothes clear
        else {
            Game.player.setArmor(armors.C_CLOTH);
            Game.player.setWeapon(WeaponLib.FISTS);
        }

        // Clear old camp slots
        inventory.clearStorage();
        inventory.clearGearStorage();
        // Initialize gearStorage
        inventory.initializeGearStorage();
    }

    private enterName(player: Player) {
        DisplayText().clear();
        DisplayText("You grew up in the small village of Ingnam, a remote village with rich traditions, buried deep in the wilds.  Every year for as long as you can remember, your village has chosen a champion to send to the cursed Demon Realm.  Legend has it that in years Ingnam has failed to produce a champion, chaos has reigned over the countryside.  Children disappear, crops wilt, and disease spreads like wildfire.  This year, <b>you</b> have been selected to be the champion.\n\nWhat is your name?");

        const nameField = new InputTextElement();
        DisplayText().appendElement(nameField);

        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("OK", this.chooseName);
    }

    private chooseName(player: Player): void {
        if (nameField.getText() === "") {
            // If part of newgame+, don't fully wipe.
            if (Game.player.stats.XP > 0 && Game.player.explored === 0) {
                Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] = Game.player.stats.XP;
                if (Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP]) Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] = 1;
                while (Game.player.stats.level > 1) {
                    Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] +=  Game.player.stats.level * 100;
                    Game.player.stats.level--;
                }
                Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS] =  Game.player.inventory.gems;
            }
            this.enterName(player);
            DisplayText("\n\n\n<b>You must select a name.</b>");
            return;
        }
        DisplayText().clear();
        DisplayText.nameBox.visible = false;
        Game.player.short = DisplayText.nameBox.text;
        customPlayerProfile = customName(DisplayText.nameBox.text);
        MainScreen.hideBottomButtons();
        if (customPlayerProfile != null) {
            DisplayText("This name, like you, is special.  Do you live up to your name or continue on, assuming it to be coincidence?");
            MainScreen.getBottomButton(0).modify("SpecialName", useCustomProfile);
            MainScreen.getBottomButton(1).modify("Continue On", noCustomProfile);
        }
        else { // Proceed with normal character creation
            DisplayText("\n\n\n\nAre you a man or a woman?");
            MainScreen.getBottomButton(0).modify("Man", isAMan);
            MainScreen.getBottomButton(1).modify("Woman", isAWoman);
        }
    }

    private useCustomProfile(): void {
        DisplayText().clear();
        if (specialName(DisplayText.nameBox.text) != null) {
            DisplayText().clear();
            DisplayText("Your name defines everything about you, and as such, it is time to wake...\n\n");
            Flags.list[FlagEnum.HISTORY_PERK_SELECTED] = 1;
            completeCharacterCreation(); // Skip character creation, customPlayerProfile will be called in completeCharacterCreation
        }
        else {
            // After character creation the fact that customPlayerProfile is not null will activate a custom Game.player setup
            DisplayText("There is something different about you, but first, what is your basic gender?  An individual such as you may later overcome this, of course...");
            DisplayText("\n\n\n\nAre you a man or a woman?");
            MainScreen.hideBottomButtons();
            MainScreen.getBottomButton(0).modify("Man", isAMan);
            MainScreen.getBottomButton(1).modify("Woman", isAWoman);
        }
    }

    private noCustomProfile(): void {
        DisplayText().clear();
        customPlayerProfile = null;
        DisplayText("Your name carries little significance beyond it being your name.  What is your gender?");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Man", isAMan);
        MainScreen.getBottomButton(1).modify("Woman", isAWoman);
    }

    // Determines if has character creation bonuses
    private customName(arg: string): Character {
        switch (arg) {
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
        return specialName(arg); // Must check against the special name list as well
    }

    // Does PC skip creation?
    private specialName(arg: string): Character {
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

    private isAMan(): void {
        Game.player.stats.str += 3;
        Game.player.stats.tou += 2;

        Game.player.torso.balls.quantity = 2;
        Game.player.torso.balls.size = 1;
        Game.player.fertility = 5;
        Game.player.torso.neck.head.hair.length = 1;
        Game.player.tallness = 71;
        Game.player.tone = 60;

        Game.player.torso.chest.add(new BreastRow());
        const newCock = new Cock();
        newCock.length = 5.5;
        newCock.thickness = 1;
        newCock.type = CockType.HUMAN;
        newCock.knotMultiplier = 1;
        Game.player.torso.cocks.add(newCock);
        Game.player.gender = Gender.MALE;
        DisplayText().clear();
        DisplayText("You are a man.  Your upbringing has provided you an advantage in strength and toughness.\n\nWhat type of build do you have?");
        MainScreen.displayChoices(["Lean", "Average", "Thick", "Girly"], [CharCreationMenu.buildLeanMale, CharCreationMenu.buildAverageMale, CharCreationMenu.buildThickMale, CharCreationMenu.buildGirlyMale]);
    }

    private isAWoman(): void {
        Game.player.stats.spe += 3;
        Game.player.stats.int += 2;

        Game.player.torso.balls.quantity = 0;
        Game.player.torso.balls.size = 0;
        Game.player.fertility = 10;
        Game.player.torso.neck.head.hair.length = 10;
        Game.player.tallness = 67;
        Game.player.tone = 30;

        Game.player.torso.chest.add(new BreastRow());
        Game.player.torso.vaginas.add(new Vagina());
        Game.player.torso.clit.length = 0.5;
        Game.player.gender = Gender.FEMALE;
        DisplayText().clear();
        DisplayText("You are a woman.  Your upbringing has provided you an advantage in speed and intellect.\n\nWhat type of build do you have?");
        MainScreen.displayChoices(["Slender", "Average", "Curvy", "Tomboyish"], [CharCreationMenu.buildSlenderFemale, CharCreationMenu.buildAverageFemale, CharCreationMenu.buildCurvyFemale, CharCreationMenu.buildTomboyishFemale]);
    }

    private buildLeanMale(): void {
        Game.player.stats.str -= 1;
        Game.player.stats.spe += 1;

        Game.player.femininity = 34;
        Game.player.thickness = 30;
        Game.player.tone += 5;

        Game.player.torso.chest.get(0).rating = BreastCup.FLAT;
        Game.player.torso.butt.rating = ButtRating.TIGHT;
        Game.player.torso.hips.rating = HipRating.SLENDER;
        CharCreationMenu.chooseComplexion();
    }

    private buildSlenderFemale(): void {
        Game.player.stats.str -= 1;
        Game.player.stats.spe += 1;

        Game.player.femininity = 66;
        Game.player.thickness = 30;
        Game.player.tone += 5;

        Game.player.torso.chest.get(0).rating = BreastCup.B;
        Game.player.torso.butt.rating = ButtRating.TIGHT;
        Game.player.torso.hips.rating = HipRating.AMPLE;
        CharCreationMenu.chooseComplexion();
    }

    private buildAverageMale(): void {
        Game.player.femininity = 30;
        Game.player.thickness = 50;

        Game.player.torso.chest.get(0).rating = BreastCup.FLAT;
        Game.player.torso.butt.rating = ButtRating.AVERAGE;
        Game.player.torso.hips.rating = HipRating.AVERAGE;
        CharCreationMenu.chooseComplexion();
    }

    private buildAverageFemale(): void {
        Game.player.femininity = 70;
        Game.player.thickness = 50;

        Game.player.torso.chest.get(0).rating = BreastCup.C;
        Game.player.torso.butt.rating = ButtRating.NOTICEABLE;
        Game.player.torso.hips.rating = HipRating.AMPLE;
        CharCreationMenu.chooseComplexion();
    }

    private buildThickMale(): void {
        Game.player.stats.spe -= 4;
        Game.player.stats.str += 2;
        Game.player.stats.tou += 2;

        Game.player.femininity = 29;
        Game.player.thickness = 70;
        Game.player.tone -= 5;

        Game.player.torso.chest.get(0).rating = BreastCup.FLAT;
        Game.player.torso.butt.rating = ButtRating.NOTICEABLE;
        Game.player.torso.hips.rating = HipRating.AVERAGE;
        CharCreationMenu.chooseComplexion();
    }

    private buildCurvyFemale(): void {
        Game.player.stats.spe -= 2;
        Game.player.stats.str += 1;
        Game.player.stats.tou += 1;

        Game.player.femininity = 71;
        Game.player.thickness = 70;

        Game.player.torso.chest.get(0).rating = BreastCup.D;
        Game.player.torso.butt.rating = ButtRating.LARGE;
        Game.player.torso.hips.rating = HipRating.CURVY;
        CharCreationMenu.chooseComplexion();
    }

    private buildGirlyMale(): void {
        Game.player.stats.str -= 2;
        Game.player.stats.spe += 2;

        Game.player.femininity = 50;
        Game.player.thickness = 50;
        Game.player.tone = 26;

        Game.player.torso.chest.get(0).rating = BreastCup.A;
        Game.player.torso.butt.rating = ButtRating.NOTICEABLE;
        Game.player.torso.hips.rating = HipRating.SLENDER;
        CharCreationMenu.chooseComplexion();
    }

    private buildTomboyishFemale(): void {
        Game.player.stats.str += 1;
        Game.player.stats.spe -= 1;

        Game.player.femininity = 56;
        Game.player.thickness = 50;
        Game.player.tone = 50;

        Game.player.torso.chest.get(0).rating = BreastCup.A;
        Game.player.torso.butt.rating = ButtRating.TIGHT;
        Game.player.torso.hips.rating = HipRating.SLENDER;
        CharCreationMenu.chooseComplexion();
    }

    private chooseComplexion(): void {
        DisplayText().clear();
        DisplayText("What is your complexion?");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Light", () => { CharCreationMenu.setComplexion("light"); });
        MainScreen.getBottomButton(1).modify("Olive", () => { CharCreationMenu.setComplexion("olive"); });
        MainScreen.getBottomButton(2).modify("Dark", () => { CharCreationMenu.setComplexion("dark"); });
        MainScreen.getBottomButton(3).modify("Ebony", () => { CharCreationMenu.setComplexion("ebony"); });
    }

    private setComplexion(choice: string): void { // And choose hair
        Game.player.skin.tone = choice;
        DisplayText().clear();
        DisplayText("You selected a " + choice + " complexion.\n\nWhat color is your hair?");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Blonde", () => { CharCreationMenu.setHair("blonde"); });
        MainScreen.getBottomButton(1).modify("Brown", () => { CharCreationMenu.setHair("brown"); });
        MainScreen.getBottomButton(2).modify("Black", () => { CharCreationMenu.setHair("black"); });
        MainScreen.getBottomButton(3).modify("Red", () => { CharCreationMenu.setHair("red"); });
        MainScreen.getBottomButton(4).modify("Gray", () => { CharCreationMenu.setHair("gray"); });
        MainScreen.getBottomButton(5).modify("White", () => { CharCreationMenu.setHair("white"); });
        MainScreen.getBottomButton(6).modify("Auburn", () => { CharCreationMenu.setHair("auburn"); });
    }

    private setHair(choice: string): void {
        Game.player.torso.neck.head.hair.color = choice;
        DisplayText().clear();
        DisplayText("You have " + HeadDescriptor.describeHair(Game.player) + ".");
        CharCreationMenu.chooseEndowment(false);
    }

    private chooseEndowment(clear: boolean): void {
        if (clear) DisplayText().clear();
        DisplayText("Every person is born with a gift.  What's yours?");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Strength", CharCreationMenu.confirmEndowmentStrength);
        MainScreen.getBottomButton(1).modify("Toughness", CharCreationMenu.confirmEndowmentThoughness);
        MainScreen.getBottomButton(2).modify("Speed", CharCreationMenu.confirmEndowmentSpeed);
        MainScreen.getBottomButton(3).modify("Smarts", CharCreationMenu.confirmEndowmentSmarts);
        MainScreen.getBottomButton(4).modify("Libido", CharCreationMenu.confirmEndowmentLibido);
        MainScreen.getBottomButton(5).modify("Touch", CharCreationMenu.confirmEndowmentTouch);
        if (Game.player.torso.cocks.count > 0) {
            MainScreen.getBottomButton(6).modify("Big Cock", CharCreationMenu.confirmEndowmentBigCock);
            MainScreen.getBottomButton(7).modify("Lots of Jizz", CharCreationMenu.confirmEndowmentMessyOrgasms);
        }
        else {
            MainScreen.getBottomButton(6).modify("Big Breasts", CharCreationMenu.confirmEndowmentBigBreasts);
            MainScreen.getBottomButton(7).modify("Big Clit", CharCreationMenu.confirmEndowmentBigClit);
            MainScreen.getBottomButton(8).modify("Fertile", CharCreationMenu.confirmEndowmentFertile);
            MainScreen.getBottomButton(9).modify("Wet Vagina", CharCreationMenu.confirmEndowmentWetVagina);
        }
    }

    private confirmEndowmentStrength(): void {
        DisplayText().clear();
        DisplayText("Are you stronger than normal? (+5 Strength)\n\nStrength increases your combat damage, and your ability to hold on to an enemy or pull yourself away.");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Yes", CharCreationMenu.setEndowmentStrength);
        MainScreen.getBottomButton(1).modify("No", () => { CharCreationMenu.chooseEndowment(true); });
    }

    private confirmEndowmentThoughness(): void {
        DisplayText().clear();
        DisplayText("Are you unusually tough? (+5 Toughness)\n\nToughness gives you more HP and increases the chances an attack against you will fail to wound you.");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Yes", CharCreationMenu.setEndowmentToughness);
        MainScreen.getBottomButton(1).modify("No", () => { CharCreationMenu.chooseEndowment(true); });
    }

    private confirmEndowmentSpeed(): void {
        DisplayText().clear();
        DisplayText("Are you very quick?  (+5 Speed)\n\nSpeed makes it easier to escape combat and grapples.  It also boosts your chances of evading an enemy attack and successfully catching up to enemies who try to run.");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Yes", CharCreationMenu.setEndowmentSpeed);
        MainScreen.getBottomButton(1).modify("No", () => { CharCreationMenu.chooseEndowment(true); });
    }

    private confirmEndowmentSmarts(): void {
        DisplayText().clear();
        DisplayText("Are you a quick learner?  (+5 Intellect)\n\nIntellect can help you avoid dangerous monsters or work with machinery.  It will also boost the power of any spells you may learn in your travels.");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Yes", CharCreationMenu.setEndowmentSmarts);
        MainScreen.getBottomButton(1).modify("No", () => { CharCreationMenu.chooseEndowment(true); });
    }

    private confirmEndowmentLibido(): void {
        DisplayText().clear();
        DisplayText("Do you have an unusually high sex-drive?  (+5 Libido)\n\nLibido affects how quickly your lust builds over time.  You may find a high libido to be more trouble than it's worth...");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Yes", CharCreationMenu.setEndowmentLibido);
        MainScreen.getBottomButton(1).modify("No", () => { CharCreationMenu.chooseEndowment(true); });
    }

    private confirmEndowmentTouch(): void {
        DisplayText().clear();
        DisplayText("Is your skin unusually sensitive?  (+5 Sensitivity)\n\nSensitivity affects how easily touches and certain magics will raise your lust.  Very low sensitivity will make it difficult to orgasm.");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Yes", CharCreationMenu.setEndowmentTouch);
        MainScreen.getBottomButton(1).modify("No", () => { CharCreationMenu.chooseEndowment(true); });
    }

    private confirmEndowmentBigCock(): void {
        DisplayText().clear();
        DisplayText("Do you have a big cock?  (+2\" Cock Length)\n\nA bigger cock will make it easier to get off any sexual partners, but only if they can take your size.");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Yes", CharCreationMenu.setEndowmentBigCock);
        MainScreen.getBottomButton(1).modify("No", () => { CharCreationMenu.chooseEndowment(true); });
    }

    private confirmEndowmentMessyOrgasms(): void {
        DisplayText().clear();
        DisplayText("Are your orgasms particularly messy?  (+50% Cum Multiplier)\n\nA higher cum multiplier will cause your orgasms to be messier.");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Yes", CharCreationMenu.setEndowmentMessyOrgasms);
        MainScreen.getBottomButton(1).modify("No", () => { CharCreationMenu.chooseEndowment(true); });
    }

    private confirmEndowmentBigBreasts(): void {
        DisplayText().clear();
        DisplayText("Are your breasts bigger than average? (DD cups)\n\nLarger breasts will allow you to lactate greater amounts, tit-fuck larger cocks, and generally be a sexy bitch.");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Yes", CharCreationMenu.setEndowmentBigBreasts);
        MainScreen.getBottomButton(1).modify("No", () => { CharCreationMenu.chooseEndowment(true); });
    }

    private confirmEndowmentBigClit(): void {
        DisplayText().clear();
        DisplayText("Do you have a big clit?  (1\" Long)\n\nA large enough clit may eventually become as large as a cock.  It also makes you gain lust much faster during oral or manual stimulation.");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Yes", CharCreationMenu.setEndowmentBigClit);
        MainScreen.getBottomButton(1).modify("No", () => { CharCreationMenu.chooseEndowment(true); });
    }

    private confirmEndowmentFertile(): void {
        DisplayText().clear();
        DisplayText("Is your family particularly fertile?  (+15% Fertility)\n\nA high fertility will cause you to become pregnant much more easily.  Pregnancy may result in: Strange children, larger bust, larger hips, a bigger ass, and other weirdness.");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Yes", CharCreationMenu.setEndowmentFertile);
        MainScreen.getBottomButton(1).modify("No", () => { CharCreationMenu.chooseEndowment(true); });
    }

    private confirmEndowmentWetVagina(): void {
        DisplayText().clear();
        DisplayText("Does your pussy get particularly wet?  (+1 Vaginal Wetness)\n\nVaginal wetness will make it easier to take larger cocks, in turn helping you bring the well-endowed to orgasm quicker.");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Yes", CharCreationMenu.setEndowmentWetVagina);
        MainScreen.getBottomButton(1).modify("No", () => { CharCreationMenu.chooseEndowment(true); });
    }

    private setEndowmentStrength(): void {
        Game.player.stats.str += 5;
        Game.player.tone += 7;
        Game.player.thickness += 3;
        // Add bonus +25% strength gain
        Game.player.perks.add(PerkType.Strong, 0.25, 0, 0, 0);
        CharCreationMenu.chooseHistory();
    }

    private setEndowmentToughness(): void {
        Game.player.stats.tou += 5;
        Game.player.tone += 5;
        Game.player.thickness += 5;
        Game.player.perks.add(PerkType.Tough, 0.25, 0, 0, 0);
        Game.player.stats.HP = kGAMECLASS.maxHP();
        CharCreationMenu.chooseHistory();
    }

    private setEndowmentSpeed(): void {
        Game.player.stats.spe += 5;
        Game.player.tone += 10;
        Game.player.perks.add(PerkType.Fast, 0.25, 0, 0, 0);
        CharCreationMenu.chooseHistory();
    }

    private setEndowmentSmarts(): void {
        Game.player.stats.int += 5;
        Game.player.thickness -= 5;
        Game.player.perks.add(PerkType.Smart, 0.25, 0, 0, 0);
        CharCreationMenu.chooseHistory();
    }

    private setEndowmentLibido(): void {
        Game.player.stats.lib += 5;
        Game.player.perks.add(PerkType.Lusty, 0.25, 0, 0, 0);
        CharCreationMenu.chooseHistory();
    }

    private setEndowmentTouch(): void {
        Game.player.stats.sens += 5;
        Game.player.perks.add(PerkType.Sensitive, 0.25, 0, 0, 0);
        CharCreationMenu.chooseHistory();
    }

    private setEndowmentBigCock(): void {
        Game.player.femininity -= 5;
        Game.player.torso.cocks.get(0).length = 8;
        Game.player.torso.cocks.get(0).thickness = 1.5;
        Game.player.perks.add(PerkType.BigCock, 1.25, 0, 0, 0);
        CharCreationMenu.chooseHistory();
    }

    private setEndowmentMessyOrgasms(): void {
        Game.player.femininity -= 2;
        Game.player.cumMultiplier = 1.5;
        Game.player.perks.add(PerkType.MessyOrgasms, 1.25, 0, 0, 0);
        CharCreationMenu.chooseHistory();
    }

    private setEndowmentBigBreasts(): void {
        Game.player.femininity += 5;
        Game.player.torso.chest.get(0).rating += 2;
        Game.player.perks.add(PerkType.BigTits, 1.5, 0, 0, 0);
        CharCreationMenu.chooseHistory();
    }

    private setEndowmentBigClit(): void {
        Game.player.femininity -= 5;
        Game.player.torso.clit.length = 1;
        Game.player.perks.add(PerkType.BigClit, 1.25, 0, 0, 0);
        CharCreationMenu.chooseHistory();
    }

    private setEndowmentFertile(): void {
        Game.player.femininity += 5;
        Game.player.fertility += 25;
        Game.player.torso.hips.rating += 2;
        Game.player.perks.add(PerkType.Fertile, 1.5, 0, 0, 0);
        CharCreationMenu.chooseHistory();
    }

    private setEndowmentWetVagina(): void {
        Game.player.femininity += 7;
        Game.player.torso.vaginas.get(0).wetness = VaginaWetness.WET;
        Game.player.perks.add(PerkType.WetPussy, 2, 0, 0, 0);
        CharCreationMenu.chooseHistory();
    }

    public chooseHistory(): void {
        DisplayText().clear();
        if (Flags.list[FlagEnum.HISTORY_PERK_SELECTED] !== 0) { // This flag can only be non-zero if chooseHistory is called from camp.as
            DisplayText("<b>New history perks are available during creation.  Since this character was created before they were available, you may choose one now!</b>\n\n");
        }
        DisplayText("Before you became a champion, you had other plans for your life.  What were you doing before?");
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Alchemy", () => { CharCreationMenu.confirmHistory(PerkType.HistoryAlchemist); });
        MainScreen.getBottomButton(1).modify("Fighting", () => { CharCreationMenu.confirmHistory(PerkType.HistoryFighter); });
        MainScreen.getBottomButton(2).modify("Healing", () => { CharCreationMenu.confirmHistory(PerkType.HistoryHealer); });
        MainScreen.getBottomButton(3).modify("Religion", () => { CharCreationMenu.confirmHistory(PerkType.HistoryReligious); });
        MainScreen.getBottomButton(4).modify("Schooling", () => { CharCreationMenu.confirmHistory(PerkType.HistoryScholar); });
        MainScreen.getBottomButton(5).modify("Slacking", () => { CharCreationMenu.confirmHistory(PerkType.HistorySlacker); });
        MainScreen.getBottomButton(6).modify("Slutting", () => { CharCreationMenu.confirmHistory(PerkType.HistorySlut); });
        MainScreen.getBottomButton(7).modify("Smithing", () => { CharCreationMenu.confirmHistory(PerkType.HistorySmith); });
        MainScreen.getBottomButton(8).modify("Whoring", () => { CharCreationMenu.confirmHistory(PerkType.HistoryWhore); });
    }

    private confirmHistory(choice: PerkType): void {
        DisplayText().clear();
        switch (choice) {
            case PerkType.HistoryAlchemist:
                DisplayText("You spent some time as an alchemist's assistant, and alchemical items always seem to be more reactive in your hands.  Is this your history?");
                break;
            case PerkType.HistoryFighter:
                DisplayText("You spent much of your time fighting other children, and you had plans to find work as a guard when you grew up.  You do 10% more damage with physical attacks.  Is this your history?");
                break;
            case PerkType.HistoryHealer:
                DisplayText("You often spent your free time with the village healer, learning how to tend to wounds.  Healing items and effects are 20% more effective.  Is this your history?");
                break;
            case PerkType.HistoryReligious:
                DisplayText("You spent a lot of time at the village temple, and learned how to meditate.  The 'masturbation' option is replaced with 'meditate' when corruption is at or below 66.  Is this your history?");
                break;
            case PerkType.HistoryScholar:
                DisplayText("You spent much of your time in school, and even begged the richest man in town, Mr. Savin, to let you read some of his books.  You are much better at focusing, and spellcasting uses 20% less fatigue.  Is this your history?");
                break;
            case PerkType.HistorySlacker:
                DisplayText("You spent a lot of time slacking, avoiding work, and otherwise making a nuisance of yourself.  Your efforts at slacking have made you quite adept at resting, and your fatigue comes back 20% faster.  Is this your history?");
                break;
            case PerkType.HistorySlut:
                DisplayText("You managed to spend most of your time having sex.  Quite simply, when it came to sex, you were the village bicycle - everyone got a ride.  Because of this, your body is a bit more resistant to penetrative stretching, and has a higher upper limit on what exactly can be inserted.  Is this your history?");
                break;
            case PerkType.HistorySmith:
                DisplayText("You managed to get an apprenticeship with the local blacksmith.  Because of your time spent at the blacksmith's side, you've learned how to fit armor for maximum protection.  Is this your history?");
                break;
            default:
                DisplayText("You managed to find work as a whore.  Because of your time spent trading seduction for profit, you're more effective at teasing (+15% tease damage).  Is this your history?");
        }
        MainScreen.hideBottomButtons();
        MainScreen.getBottomButton(0).modify("Yes", () => { CharCreationMenu.setHistory(choice); });
        MainScreen.getBottomButton(1).modify("No", CharCreationMenu.chooseHistory);
    }

    private setHistory(choice: PerkType): void {
        Game.player.perks.set(choice, PerkFactory.create(choice));
        if (choice === PerkType.HistorySlut || choice === PerkType.HistoryWhore) {
            if (Game.player.torso.vaginas.count > 0) {
                Game.player.torso.vaginas.get(0).virgin = false;
                Game.player.torso.vaginas.get(0).looseness = VaginaLooseness.LOOSE;
            }
            Game.player.torso.butt.looseness = 1;
        }
        if (Flags.list[FlagEnum.HISTORY_PERK_SELECTED]) {
            Flags.list[FlagEnum.HISTORY_PERK_SELECTED] = 1;
            CharCreationMenu.completeCharacterCreation();
        }
        else { // Special escape clause for very old saves that do not have a history perk. This is used to allow them the chance to select a perk at camp on load.
            Flags.list[FlagEnum.HISTORY_PERK_SELECTED] = 1;
            Game.playerMenu();
        }
    }

    private completeCharacterCreation(): void {
        if (customPlayerProfile != null) {
            customPlayerProfile();
            MainScreen.doNext(arrival);
            return;
        }
        arrival();
    }

    private arrival(): void {
        Game.time.hour = 11;
        DisplayText().clear();
        DisplayText("You are prepared for what is to come.  Most of the last year has been spent honing your body and mind to prepare for the challenges ahead.  You are the Champion of Ingnam.  The one who will journey to the demon realm and guarantee the safety of your friends and family, even though you'll never see them again.  You wipe away a tear as you enter the courtyard and see Elder Nomur waiting for you.  You are ready.\n\n");
        DisplayText("The walk to the tainted cave is long and silent.  Elder Nomur does not speak.  There is nothing left to say.  The two of you journey in companionable silence.  Slowly the black rock of Mount Ilgast looms closer and closer, and the temperature of the air drops.   You shiver and glance at the Elder, noticing he doesn't betray any sign of the cold.  Despite his age of nearly 80, he maintains the vigor of a man half his age.  You're glad for his strength, as assisting him across this distance would be draining, and you must save your energy for the trials ahead.\n\n");
        DisplayText("The entrance of the cave gapes open, sharp stalactites hanging over the entrance, giving it the appearance of a monstrous mouth.  Elder Nomur stops and nods to you, gesturing for you to proceed alone.\n\n");
        DisplayText("The cave is unusually warm and damp, ");
        if (Game.player.gender === Gender.FEMALE)
            DisplayText("and your body seems to feel the same way, flushing as you feel a warmth and dampness between your thighs. ");
        else DisplayText("and your body reacts with a sense of growing warmth focusing in your groin, your manhood hardening for no apparent reason. ");
        DisplayText("You were warned of this and press forward, ignoring your body's growing needs.  A glowing purple-pink portal swirls and flares with demonic light along the back wall.  Cringing, you press forward, keenly aware that your body seems to be anticipating coming in contact with the tainted magical construct.  Closing your eyes, you gather your resolve and leap forwards.  Vertigo overwhelms you and you black out...");
        showStats();
        player.stats.lust += 15;
        MainScreen.doNext(arrivalPartTwo);
    }

    private arrivalPartTwo(): void {
        DisplayText().clear();
        hideUpDown();
        player.stats.lust += 40;
        player.stats.cor += 2;
        Game.time.hour = 18;
        DisplayText("You wake with a splitting headache and a body full of burning desire.  A shadow darkens your view momentarily and your training kicks in.  You roll to the side across the bare ground and leap to your feet.  A surprised looking imp stands a few feet away, holding an empty vial.  He's completely naked, an improbably sized pulsing red cock hanging between his spindly legs.  You flush with desire as a wave of lust washes over you, your mind reeling as you fight ");
        if (Game.player.gender === Gender.FEMALE)
            DisplayText("the urge to chase down his rod and impale yourself on it.\n\n");
        else
            DisplayText("the urge to ram your cock down his throat.  The strangeness of the thought surprises you.\n\n");
        DisplayText("The imp says, \"<i>I'm amazed you aren't already chasing down my cock, human.  The last Champion was an eager whore for me by the time she woke up.  This lust draft made sure of it.</i>\"");
        MainScreen.doNext(arrivalPartThree);
    }

    private arrivalPartThree(): void {
        DisplayText().clear();
        hideUpDown();
        player.stats.lust += -30;
        DisplayText("The imp shakes the empty vial to emphasize his point.  You reel in shock at this revelation - you've just entered the demon realm and you've already been drugged!  You tremble with the aching need in your groin, but resist, righteous anger lending you strength.\n\nIn desperation you leap towards the imp, watching with glee as his cocky smile changes to an expression of sheer terror.  The smaller creature is no match for your brute strength as you pummel him mercilessly.  You pick up the diminutive demon and punt him into the air, frowning grimly as he spreads his wings and begins speeding into the distance.\n\n");
        DisplayText("The imp says, \"<i>FOOL!  You could have had pleasure unending... but should we ever cross paths again you will regret humiliating me!  Remember the name Zetaz, as you'll soon face the wrath of my master!</i>\"\n\n");
        DisplayText("Your pleasure at defeating the demon ebbs as you consider how you've already been defiled.  You swear to yourself you will find the demon responsible for doing this to you and the other Champions, and destroy him AND his pet imp.");
        MainScreen.doNext(arrivalPartFour);
    }

    private arrivalPartFour(): void {
        DisplayText().clear();
        hideUpDown();
        DisplayText("You look around, surveying the hellish landscape as you plot your next move.  The portal is a few yards away, nestled between a formation of rocks.  It does not seem to exude the arousing influence it had on the other side.  The ground and sky are both tinted different shades of red, though the earth beneath your feet feels as normal as any other lifeless patch of dirt.   You settle on the idea of making a camp here and fortifying this side of the portal.  No demons will ravage your beloved hometown on your watch.\n\nIt does not take long to set up your tent and a few simple traps.  You'll need to explore and gather more supplies to fortify it any further.  Perhaps you will even manage to track down the demons who have been abducting the other champions!");
        MainScreen.doNext(Game.playerMenu);
    }

    private customMihari(): void {
        // [Values will be listed as if taken from Minerva]
        // I'm kinda going under the assumption you are letting us go hog wild if not, take what's allowed and do what you wish out of what's below
        DisplayText("The portal is not something you fear, not with your imposing armor and inscribed spellblade.  You're much faster and stronger than every champion that came before you, but will it be enough?");
        // Core Stats:
        Game.player.stats.str = 40;
        Game.player.stats.tou = 20;
        Game.player.stats.spe = 100;
        Game.player.stats.int = 80;
        Game.player.stats.lib = 25;
        Game.player.stats.sens = 15;

        // Body Values:
        // breastRows
        Game.player.torso.chest.add(new BreastRow());
        // -rating: 5
        // -breasts: 2
        // -nipplesPerBreast: 1
        Game.player.torso.chest.get(0).rating = 5;
        Game.player.torso.butt.rating = 2;
        Game.player.torso.vaginas.add(new Vagina());
        Game.player.torso.vaginas.get(0).looseness = VaginaLooseness.TIGHT;
        Game.player.torso.vaginas.get(0).wetness = VaginaWetness.SLAVERING;
        Game.player.torso.vaginas.get(0).virgin = true;
        Game.player.torso.clit.length = 0.2;
        Game.player.torso.neck.head.ears.type = EarType.CAT;
        Game.player.torso.neck.head.face.type = FaceType.CAT;
        Game.player.femininity = 100;
        Game.player.fertility = 85;
        Game.player.gender = 2;
        Game.player.torso.neck.head.hair.color = "blonde";
        Game.player.torso.neck.head.hair.length = 24;
        Game.player.torso.hips.rating = 6;
        Game.player.torso.hips.legs.type = LegType.CAT;
        Game.player.torso.chest.sort(BreastRow.BreastRatingLargest)[0].nipples.length = 0.5;
        // perks:
        Game.player.perks.add(PerkType.Agility, 0, 0, 0, 0);
        Game.player.perks.add(PerkType.Evade, 0, 0, 0, 0);
        Game.player.perks.add(PerkType.Runner, 0, 0, 0, 0);
        Game.player.perks.add(PerkType.Fast, 0.25, 0, 0, 0);
        Game.player.perks.add(PerkType.Fertile, 1.5, 0, 0, 0);
        Game.player.perks.add(PerkType.Flexibility, 0, 0, 0, 0);
        Game.player.perks.add(PerkType.HistoryScholar, 0, 0, 0, 0);

        Game.player.skin.desc = "fur";
        Game.player.skin.tone = "ashen";
        Game.player.skin.type = SkinType.FUR;
        Game.player.torso.tailType = TailType.CAT;
        Game.player.tallness = 55;
        Game.player.teaseLevel = 4;
        Game.player.thickness = 10;
        Game.player.tone = 75;
        Game.player.torso.neck.head.face.tongue.type = TongueType.HUMAN;

        // Posted everything above sorry if it wasn't supposed to go there.
        // starting equipment: black leather armor surrounded by voluminous robes
        // starting weapon: Spellblade if not gamebreaking otherwise spear is fine.
        Game.player.setArmor(armors.LTHRROB);
        Game.player.setWeapon(weapons.S_BLADE);
    }













