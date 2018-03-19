import Menu from './Menu';
import Menus from './Menus';
import BreastRow, { BreastCup } from '../../Body/BreastRow';
import { ButtRating } from '../../Body/Butt';
import Cock, { CockType } from '../../Body/Cock';
import { Gender } from '../../Body/GenderIdentity';
import { HipRating } from '../../Body/Hips';
import Vagina, { VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import Custom from '../../Character/Custom';
import HeadDescriptor from '../../Descriptors/HeadDescriptor';
import PerkFactory from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import LocationName from '../../Game/LocationName';
import Player from '../../Player/Player';
import DisplayText from '../DisplayText';
import InputTextElement from '../Elements/InputTextElement';
import MainScreen, { TopButton } from '../MainScreen';

export default class CharCreationMenu implements Menu {
    private nameField: InputTextElement;

    public newGamePlus() {
        Flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] = Game.player.stats.XP;
        if (Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP]) Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] = 1;
        while (Game.player.stats.level > 1) {
            Flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] += Game.player.stats.level * 100;
            Game.player.stats.level--;
        }
        Flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS] = Game.player.inventory.gems;
        this.display();
    }

    public display() {
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
        Game.time.day = 0;
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
        MainScreen.displayChoices(["OK"], [() => { this.chooseName(player, nameField); }]);
    }

    private chooseName(player: Player, nameField: InputTextElement) {
        if (nameField.getText() === "") {
            // If part of newgame+, don't fully wipe.
            if (player.stats.XP > 0 && !player.locations.get(LocationName.BeyondCamp).visited) {
                Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] = player.stats.XP;
                if (Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP]) Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] = 1;
                while (player.stats.level > 1) {
                    Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] += player.stats.level * 100;
                    player.stats.level--;
                }
                Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS] = player.inventory.gems;
            }
            this.enterName(player);
            DisplayText("\n\n\n<b>You must select a name.</b>");
            return;
        }
        player.desc.name = nameField.getText();
        DisplayText().clear();
        if (this.customName(player.desc.name) !== undefined) {
            DisplayText("This name, like you, is special.  Do you live up to your name or continue on, assuming it to be coincidence?");
            MainScreen.displayChoices(["SpecialName", "Continue On"], [this.useCustomProfile, this.noCustomProfile]);
        }
        else { // Proceed with normal character creation
            DisplayText("\n\n\n\nAre you a man or a woman?");
            MainScreen.displayChoices(["Man", "Woman"], [this.isAMan, this.isAWoman]);
        }
    }

    private useCustomProfile(player: Player) {
        DisplayText().clear();
        if (this.customNameWithHistory(player.desc.name) !== undefined) {
            DisplayText().clear();
            DisplayText("Your name defines everything about you, and as such, it is time to wake...\n\n");
            Flags.list[FlagEnum.HISTORY_PERK_SELECTED] = 1;
            this.completeCharacterCreation(player);
        }
        else {
            this.chooseHistory();
            /*
            DisplayText("There is something different about you, but first, what is your basic gender?  An individual such as you may later overcome this, of course...");
            DisplayText("\n\n\n\nAre you a man or a woman?");
            MainScreen.displayChoices(["Man", "Woman"], [this.isAMan, this.isAWoman]);
            */
        }
    }

    private noCustomProfile() {
        DisplayText().clear();
        DisplayText("Your name carries little significance beyond it being your name.  What is your gender?");
        MainScreen.displayChoices(["Man", "Woman"], [this.isAMan, this.isAWoman]);
    }

    // Determines if has character creation bonuses
    private customName(arg: string): (player: Player) => void {
        switch (arg) {
            case "Aria": return Custom.Aria;
            case "Betram": return Custom.Betram;
            case "Charaun": return Custom.Charaun;
            case "Cody": return Custom.Cody;
            case "Galatea": return Custom.Galatea;
            case "Gundam": return Custom.Gundam;
            case "Hikari": return Custom.Hikari;
            case "Katti": return Custom.Katti;
            case "Lucina": return Custom.Lucina;
            case "Navorn": return Custom.Navorn;
            case "Rope": return Custom.Rope;
            case "Sora": return Custom.Sora;
            default:
                return this.customNameWithHistory(arg); // Must check against the special name list as well
        }
    }

    // Does PC skip creation?
    private customNameWithHistory(arg: string): (player: Player) => void {
        switch (arg) {
            case "Annetta": return Custom.Annetta;
            case "Ceveo": return Custom.Ceveo;
            case "Charlie": return Custom.Charlie;
            case "Isaac": return Custom.Isaac;
            case "Leah": return Custom.Leah;
            case "Lukaz": return Custom.Lukaz;
            case "Mara": return Custom.Mara;
            case "Mihari": return Custom.Mihari;
            case "Mirvanna": return Custom.Mirvanna;
            case "Nami": return Custom.Nami;
            case "Nixi": return Custom.Nixi;
            case "Prismere": return Custom.Prismere;
            case "Rann Rayla": return Custom.RannRayla;
            case "Sera": return Custom.Sera;
            case "Siveen": return Custom.Siveen;
            // case "TestChar": return Custom.TestChar;
            case "Tyriana": return Custom.Tyriana;
            case "Vahdunbrii": return Custom.Vahdunbrii;
            default:
                return undefined;
        }
    }

    private isAMan(player: Player) {
        player.stats.str += 3;
        player.stats.tou += 2;

        player.torso.balls.quantity = 2;
        player.torso.balls.size = 1;
        player.fertility = 5;
        player.torso.neck.head.hair.length = 1;
        player.tallness = 71;
        player.tone = 60;

        player.torso.chest.add(new BreastRow());
        const newCock = new Cock();
        newCock.length = 5.5;
        newCock.thickness = 1;
        newCock.type = CockType.HUMAN;
        newCock.knotMultiplier = 1;
        player.torso.cocks.add(newCock);
        player.gender = Gender.MALE;
        DisplayText().clear();
        DisplayText("You are a man.  Your upbringing has provided you an advantage in strength and toughness.\n\nWhat type of build do you have?");
        MainScreen.displayChoices(["Lean", "Average", "Thick", "Girly"], [this.buildLeanMale, this.buildAverageMale, this.buildThickMale, this.buildGirlyMale]);
    }

    private isAWoman(player: Player) {
        player.stats.spe += 3;
        player.stats.int += 2;

        player.torso.balls.quantity = 0;
        player.torso.balls.size = 0;
        player.fertility = 10;
        player.torso.neck.head.hair.length = 10;
        player.tallness = 67;
        player.tone = 30;

        player.torso.chest.add(new BreastRow());
        player.torso.vaginas.add(new Vagina());
        player.torso.clit.length = 0.5;
        player.gender = Gender.FEMALE;
        DisplayText().clear();
        DisplayText("You are a woman.  Your upbringing has provided you an advantage in speed and intellect.\n\nWhat type of build do you have?");
        MainScreen.displayChoices(["Slender", "Average", "Curvy", "Tomboyish"], [this.buildSlenderFemale, this.buildAverageFemale, this.buildCurvyFemale, this.buildTomboyishFemale]);
    }

    private buildLeanMale(player: Player) {
        Game.player.stats.str -= 1;
        Game.player.stats.spe += 1;

        Game.player.femininity = 34;
        Game.player.thickness = 30;
        Game.player.tone += 5;

        Game.player.torso.chest.get(0).rating = BreastCup.FLAT;
        Game.player.torso.butt.rating = ButtRating.TIGHT;
        Game.player.torso.hips.rating = HipRating.SLENDER;
        this.chooseComplexion();
    }

    private buildSlenderFemale(player: Player) {
        Game.player.stats.str -= 1;
        Game.player.stats.spe += 1;

        Game.player.femininity = 66;
        Game.player.thickness = 30;
        Game.player.tone += 5;

        Game.player.torso.chest.get(0).rating = BreastCup.B;
        Game.player.torso.butt.rating = ButtRating.TIGHT;
        Game.player.torso.hips.rating = HipRating.AMPLE;
        this.chooseComplexion();
    }

    private buildAverageMale(player: Player) {
        Game.player.femininity = 30;
        Game.player.thickness = 50;

        Game.player.torso.chest.get(0).rating = BreastCup.FLAT;
        Game.player.torso.butt.rating = ButtRating.AVERAGE;
        Game.player.torso.hips.rating = HipRating.AVERAGE;
        this.chooseComplexion();
    }

    private buildAverageFemale(player: Player) {
        Game.player.femininity = 70;
        Game.player.thickness = 50;

        Game.player.torso.chest.get(0).rating = BreastCup.C;
        Game.player.torso.butt.rating = ButtRating.NOTICEABLE;
        Game.player.torso.hips.rating = HipRating.AMPLE;
        this.chooseComplexion();
    }

    private buildThickMale(player: Player) {
        Game.player.stats.spe -= 4;
        Game.player.stats.str += 2;
        Game.player.stats.tou += 2;

        Game.player.femininity = 29;
        Game.player.thickness = 70;
        Game.player.tone -= 5;

        Game.player.torso.chest.get(0).rating = BreastCup.FLAT;
        Game.player.torso.butt.rating = ButtRating.NOTICEABLE;
        Game.player.torso.hips.rating = HipRating.AVERAGE;
        this.chooseComplexion();
    }

    private buildCurvyFemale(player: Player) {
        Game.player.stats.spe -= 2;
        Game.player.stats.str += 1;
        Game.player.stats.tou += 1;

        Game.player.femininity = 71;
        Game.player.thickness = 70;

        Game.player.torso.chest.get(0).rating = BreastCup.D;
        Game.player.torso.butt.rating = ButtRating.LARGE;
        Game.player.torso.hips.rating = HipRating.CURVY;
        this.chooseComplexion();
    }

    private buildGirlyMale(player: Player) {
        Game.player.stats.str -= 2;
        Game.player.stats.spe += 2;

        Game.player.femininity = 50;
        Game.player.thickness = 50;
        Game.player.tone = 26;

        Game.player.torso.chest.get(0).rating = BreastCup.A;
        Game.player.torso.butt.rating = ButtRating.NOTICEABLE;
        Game.player.torso.hips.rating = HipRating.SLENDER;
        this.chooseComplexion();
    }

    private buildTomboyishFemale(player: Player) {
        Game.player.stats.str += 1;
        Game.player.stats.spe -= 1;

        Game.player.femininity = 56;
        Game.player.thickness = 50;
        Game.player.tone = 50;

        Game.player.torso.chest.get(0).rating = BreastCup.A;
        Game.player.torso.butt.rating = ButtRating.TIGHT;
        Game.player.torso.hips.rating = HipRating.SLENDER;
        this.chooseComplexion();
    }

    private chooseComplexion() {
        DisplayText().clear();
        DisplayText("What is your complexion?");
        MainScreen.displayChoices(["Light", "Olive", "Dark", "Ebony"], [
            (player: Player) => { this.setComplexion(player, "light"); },
            (player: Player) => { this.setComplexion(player, "olive"); },
            (player: Player) => { this.setComplexion(player, "dark"); },
            (player: Player) => { this.setComplexion(player, "ebony"); }
        ]);
    }

    private setComplexion(player: Player, choice: string) { // And choose hair
        player.skin.tone = choice;
        DisplayText().clear();
        DisplayText("You selected a " + choice + " complexion.\n\nWhat color is your hair?");
        MainScreen.displayChoices(["Blonde", "Brown", "Black", "Red", "Gray", "White", "Auburn"], [
            () => { this.setHair(player, "blonde"); },
            () => { this.setHair(player, "brown"); },
            () => { this.setHair(player, "black"); },
            () => { this.setHair(player, "red"); },
            () => { this.setHair(player, "gray"); },
            () => { this.setHair(player, "white"); },
            () => { this.setHair(player, "auburn"); }
        ]);
    }

    private setHair(player: Player, choice: string) {
        player.torso.neck.head.hair.color = choice;
        DisplayText().clear();
        DisplayText("You have " + HeadDescriptor.describeHair(Game.player) + ".");
        MainScreen.doNext(this.chooseEndowment);
    }

    private chooseEndowment() {
        DisplayText().clear();
        DisplayText("Every person is born with a gift.  What's yours?");
        let text = ["Strength", "Toughness", "Speed", "Smarts", "Libido", "Touch"];
        let func = [
            this.confirmEndowmentStrength,
            this.confirmEndowmentThoughness,
            this.confirmEndowmentSpeed,
            this.confirmEndowmentSmarts,
            this.confirmEndowmentLibido,
            this.confirmEndowmentTouch
        ];
        if (Game.player.torso.cocks.count > 0) {
            text = text.concat("Big Cock", "Lots of Jizz");
            func = func.concat(this.confirmEndowmentBigCock, this.confirmEndowmentMessyOrgasms);
        }
        else {
            text = text.concat("Big Breasts", "Big Clit", "Fertile", "Wet Vagina");
            func = func.concat(this.confirmEndowmentBigBreasts, this.confirmEndowmentBigClit, this.confirmEndowmentFertile, this.confirmEndowmentWetVagina);
        }
        MainScreen.displayChoices(text, func);
    }

    private confirmEndowmentStrength() {
        DisplayText().clear();
        DisplayText("Are you stronger than normal? (+5 Strength)\n\nStrength increases your combat damage, and your ability to hold on to an enemy or pull yourself away.");
        MainScreen.doYesNo(this.setEndowmentStrength, this.chooseEndowment);
    }

    private confirmEndowmentThoughness() {
        DisplayText().clear();
        DisplayText("Are you unusually tough? (+5 Toughness)\n\nToughness gives you more HP and increases the chances an attack against you will fail to wound you.");
        MainScreen.doYesNo(this.setEndowmentToughness, this.chooseEndowment);
    }

    private confirmEndowmentSpeed() {
        DisplayText().clear();
        DisplayText("Are you very quick?  (+5 Speed)\n\nSpeed makes it easier to escape combat and grapples.  It also boosts your chances of evading an enemy attack and successfully catching up to enemies who try to run.");
        MainScreen.doYesNo(this.setEndowmentSpeed, this.chooseEndowment);
    }

    private confirmEndowmentSmarts() {
        DisplayText().clear();
        DisplayText("Are you a quick learner?  (+5 Intellect)\n\nIntellect can help you avoid dangerous monsters or work with machinery.  It will also boost the power of any spells you may learn in your travels.");
        MainScreen.doYesNo(this.setEndowmentSmarts, this.chooseEndowment);
    }

    private confirmEndowmentLibido() {
        DisplayText().clear();
        DisplayText("Do you have an unusually high sex-drive?  (+5 Libido)\n\nLibido affects how quickly your lust builds over time.  You may find a high libido to be more trouble than it's worth...");
        MainScreen.doYesNo(this.setEndowmentLibido, this.chooseEndowment);
    }

    private confirmEndowmentTouch() {
        DisplayText().clear();
        DisplayText("Is your skin unusually sensitive?  (+5 Sensitivity)\n\nSensitivity affects how easily touches and certain magics will raise your lust.  Very low sensitivity will make it difficult to orgasm.");
        MainScreen.doYesNo(this.setEndowmentTouch, this.chooseEndowment);
    }

    private confirmEndowmentBigCock() {
        DisplayText().clear();
        DisplayText("Do you have a big cock?  (+2\" Cock Length)\n\nA bigger cock will make it easier to get off any sexual partners, but only if they can take your size.");
        MainScreen.doYesNo(this.setEndowmentBigCock, this.chooseEndowment);
    }

    private confirmEndowmentMessyOrgasms() {
        DisplayText().clear();
        DisplayText("Are your orgasms particularly messy?  (+50% Cum Multiplier)\n\nA higher cum multiplier will cause your orgasms to be messier.");
        MainScreen.doYesNo(this.setEndowmentMessyOrgasms, this.chooseEndowment);
    }

    private confirmEndowmentBigBreasts() {
        DisplayText().clear();
        DisplayText("Are your breasts bigger than average? (DD cups)\n\nLarger breasts will allow you to lactate greater amounts, tit-fuck larger cocks, and generally be a sexy bitch.");
        MainScreen.doYesNo(this.setEndowmentBigBreasts, this.chooseEndowment);
    }

    private confirmEndowmentBigClit() {
        DisplayText().clear();
        DisplayText("Do you have a big clit?  (1\" Long)\n\nA large enough clit may eventually become as large as a cock.  It also makes you gain lust much faster during oral or manual stimulation.");
        MainScreen.doYesNo(this.setEndowmentBigClit, this.chooseEndowment);
    }

    private confirmEndowmentFertile() {
        DisplayText().clear();
        DisplayText("Is your family particularly fertile?  (+15% Fertility)\n\nA high fertility will cause you to become pregnant much more easily.  Pregnancy may result in: Strange children, larger bust, larger hips, a bigger ass, and other weirdness.");
        MainScreen.doYesNo(this.setEndowmentFertile, this.chooseEndowment);
    }

    private confirmEndowmentWetVagina() {
        DisplayText().clear();
        DisplayText("Does your pussy get particularly wet?  (+1 Vaginal Wetness)\n\nVaginal wetness will make it easier to take larger cocks, in turn helping you bring the well-endowed to orgasm quicker.");
        MainScreen.doYesNo(this.setEndowmentWetVagina, this.chooseEndowment);
    }

    private setEndowmentStrength(player: Player) {
        player.stats.str += 5;
        player.tone += 7;
        player.thickness += 3;
        // Add bonus +25% strength gain
        player.perks.add(PerkType.Strong, 0.25, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentToughness(player: Player) {
        player.stats.tou += 5;
        player.tone += 5;
        player.thickness += 5;
        player.perks.add(PerkType.Tough, 0.25, 0, 0, 0);
        player.stats.HP = player.stats.maxHP();
        this.chooseHistory();
    }

    private setEndowmentSpeed(player: Player) {
        player.stats.spe += 5;
        player.tone += 10;
        player.perks.add(PerkType.Fast, 0.25, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentSmarts(player: Player) {
        player.stats.int += 5;
        player.thickness -= 5;
        player.perks.add(PerkType.Smart, 0.25, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentLibido(player: Player) {
        player.stats.lib += 5;
        player.perks.add(PerkType.Lusty, 0.25, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentTouch(player: Player) {
        player.stats.sens += 5;
        player.perks.add(PerkType.Sensitive, 0.25, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentBigCock(player: Player) {
        player.femininity -= 5;
        player.torso.cocks.get(0).length = 8;
        player.torso.cocks.get(0).thickness = 1.5;
        player.perks.add(PerkType.BigCock, 1.25, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentMessyOrgasms(player: Player) {
        player.femininity -= 2;
        player.cumMultiplier = 1.5;
        player.perks.add(PerkType.MessyOrgasms, 1.25, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentBigBreasts(player: Player) {
        player.femininity += 5;
        player.torso.chest.get(0).rating += 2;
        player.perks.add(PerkType.BigTits, 1.5, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentBigClit(player: Player) {
        player.femininity -= 5;
        player.torso.clit.length = 1;
        player.perks.add(PerkType.BigClit, 1.25, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentFertile(player: Player) {
        player.femininity += 5;
        player.fertility += 25;
        player.torso.hips.rating += 2;
        player.perks.add(PerkType.Fertile, 1.5, 0, 0, 0);
        this.chooseHistory();
    }

    private setEndowmentWetVagina(player: Player) {
        player.femininity += 7;
        player.torso.vaginas.get(0).wetness = VaginaWetness.WET;
        player.perks.add(PerkType.WetPussy, 2, 0, 0, 0);
        this.chooseHistory();
    }

    public chooseHistory() {
        DisplayText().clear();
        if (Flags.list[FlagEnum.HISTORY_PERK_SELECTED] !== 0) { // This flag can only be non-zero if chooseHistory is called from camp.as
            DisplayText("<b>New history perks are available during creation.  Since this character was created before they were available, you may choose one now!</b>\n\n");
        }
        DisplayText("Before you became a champion, you had other plans for your life.  What were you doing before?");
        MainScreen.displayChoices(
            ["Alchemy", "Fighting", "Healing", "Religion", "Schooling", "Slacking", "Slutting", "Smithing", "Whoring"],
            [
                () => { this.confirmHistory(PerkType.HistoryAlchemist); },
                () => { this.confirmHistory(PerkType.HistoryFighter); },
                () => { this.confirmHistory(PerkType.HistoryHealer); },
                () => { this.confirmHistory(PerkType.HistoryReligious); },
                () => { this.confirmHistory(PerkType.HistoryScholar); },
                () => { this.confirmHistory(PerkType.HistorySlacker); },
                () => { this.confirmHistory(PerkType.HistorySlut); },
                () => { this.confirmHistory(PerkType.HistorySmith); },
                () => { this.confirmHistory(PerkType.HistoryWhore); }
            ]);
    }

    private confirmHistory(choice: PerkType) {
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
        MainScreen.doYesNo((player: Player) => { this.setHistory(player, choice); }, this.chooseHistory);
    }

    private setHistory(player: Player, choice: PerkType) {
        player.perks.set(choice, PerkFactory.create(choice));
        if (choice === PerkType.HistorySlut || choice === PerkType.HistoryWhore) {
            if (player.torso.vaginas.count > 0) {
                player.torso.vaginas.get(0).virgin = false;
                player.torso.vaginas.get(0).looseness = VaginaLooseness.LOOSE;
            }
            player.torso.butt.looseness = 1;
        }
        if (Flags.list[FlagEnum.HISTORY_PERK_SELECTED]) {
            Flags.list[FlagEnum.HISTORY_PERK_SELECTED] = 1;
            this.completeCharacterCreation(player);
        }
        else { // Special escape clause for very old saves that do not have a history perk. This is used to allow them the chance to select a perk at camp on load.
            Flags.list[FlagEnum.HISTORY_PERK_SELECTED] = 1;
            Menus.Player.display(player);
        }
    }

    private completeCharacterCreation(player: Player, customProile?: (player: Player) => void) {
        if (customProile !== undefined) {
            customProile(player);
            MainScreen.doNext(this.arrival);
            return;
        }
        this.arrival(player);
    }

    private arrival(player: Player) {
        Game.time.hour = 11;
        DisplayText().clear();
        DisplayText("You are prepared for what is to come.  Most of the last year has been spent honing your body and mind to prepare for the challenges ahead.  You are the Champion of Ingnam.  The one who will journey to the demon realm and guarantee the safety of your friends and family, even though you'll never see them again.  You wipe away a tear as you enter the courtyard and see Elder Nomur waiting for you.  You are ready.\n\n");
        DisplayText("The walk to the tainted cave is long and silent.  Elder Nomur does not speak.  There is nothing left to say.  The two of you journey in companionable silence.  Slowly the black rock of Mount Ilgast looms closer and closer, and the temperature of the air drops.   You shiver and glance at the Elder, noticing he doesn't betray any sign of the cold.  Despite his age of nearly 80, he maintains the vigor of a man half his age.  You're glad for his strength, as assisting him across this distance would be draining, and you must save your energy for the trials ahead.\n\n");
        DisplayText("The entrance of the cave gapes open, sharp stalactites hanging over the entrance, giving it the appearance of a monstrous mouth.  Elder Nomur stops and nods to you, gesturing for you to proceed alone.\n\n");
        DisplayText("The cave is unusually warm and damp, ");
        if (player.gender === Gender.FEMALE)
            DisplayText("and your body seems to feel the same way, flushing as you feel a warmth and dampness between your thighs. ");
        else DisplayText("and your body reacts with a sense of growing warmth focusing in your groin, your manhood hardening for no apparent reason. ");
        DisplayText("You were warned of this and press forward, ignoring your body's growing needs.  A glowing purple-pink portal swirls and flares with demonic light along the back wall.  Cringing, you press forward, keenly aware that your body seems to be anticipating coming in contact with the tainted magical construct.  Closing your eyes, you gather your resolve and leap forwards.  Vertigo overwhelms you and you black out...");
        MainScreen.getStatsPanel().show();
        player.stats.lust += 15;
        MainScreen.doNext(this.arrivalPartTwo);
    }

    private arrivalPartTwo(player: Player) {
        DisplayText().clear();
        player.stats.lust += 40;
        player.stats.cor += 2;
        Game.time.hour = 18;
        DisplayText("You wake with a splitting headache and a body full of burning desire.  A shadow darkens your view momentarily and your training kicks in.  You roll to the side across the bare ground and leap to your feet.  A surprised looking imp stands a few feet away, holding an empty vial.  He's completely naked, an improbably sized pulsing red cock hanging between his spindly legs.  You flush with desire as a wave of lust washes over you, your mind reeling as you fight ");
        if (player.gender === Gender.FEMALE)
            DisplayText("the urge to chase down his rod and impale yourself on it.\n\n");
        else
            DisplayText("the urge to ram your cock down his throat.  The strangeness of the thought surprises you.\n\n");
        DisplayText("The imp says, \"<i>I'm amazed you aren't already chasing down my cock, human.  The last Champion was an eager whore for me by the time she woke up.  This lust draft made sure of it.</i>\"");
        MainScreen.doNext(this.arrivalPartThree);
    }

    private arrivalPartThree(player: Player) {
        DisplayText().clear();
        player.stats.lust += -30;
        DisplayText("The imp shakes the empty vial to emphasize his point.  You reel in shock at this revelation - you've just entered the demon realm and you've already been drugged!  You tremble with the aching need in your groin, but resist, righteous anger lending you strength.\n\nIn desperation you leap towards the imp, watching with glee as his cocky smile changes to an expression of sheer terror.  The smaller creature is no match for your brute strength as you pummel him mercilessly.  You pick up the diminutive demon and punt him into the air, frowning grimly as he spreads his wings and begins speeding into the distance.\n\n");
        DisplayText("The imp says, \"<i>FOOL!  You could have had pleasure unending... but should we ever cross paths again you will regret humiliating me!  Remember the name Zetaz, as you'll soon face the wrath of my master!</i>\"\n\n");
        DisplayText("Your pleasure at defeating the demon ebbs as you consider how you've already been defiled.  You swear to yourself you will find the demon responsible for doing this to you and the other Champions, and destroy him AND his pet imp.");
        MainScreen.doNext(this.arrivalPartFour);
    }

    private arrivalPartFour() {
        DisplayText().clear();
        DisplayText("You look around, surveying the hellish landscape as you plot your next move.  The portal is a few yards away, nestled between a formation of rocks.  It does not seem to exude the arousing influence it had on the other side.  The ground and sky are both tinted different shades of red, though the earth beneath your feet feels as normal as any other lifeless patch of dirt.   You settle on the idea of making a camp here and fortifying this side of the portal.  No demons will ravage your beloved hometown on your watch.\n\nIt does not take long to set up your tent and a few simple traps.  You'll need to explore and gather more supplies to fortify it any further.  Perhaps you will even manage to track down the demons who have been abducting the other champions!");
        MainScreen.doNext(Menus.Player.display);
    }
}
