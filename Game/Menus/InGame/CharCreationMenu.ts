import { DisplayText } from '../../../Engine/display/DisplayText';
import { InputTextElement } from '../../../Engine/Display/Elements/InputTextElement';
import { MainScreen, TopButton } from '../../../Engine/Display/MainScreen';
import { BreastCup, BreastRow } from '../../Body/BreastRow';
import { ButtRating } from '../../Body/Butt';
import { Cock, CockType } from '../../Body/Cock';
import { Gender } from '../../Body/GenderIdentity';
import { HipRating } from '../../Body/Hips';
import { Vagina, VaginaLooseness, VaginaWetness } from '../../Body/Vagina';
import { Player } from '../../Character/Player/Player';
import { PerkFactory } from '../../Effects/PerkFactory';
import { PerkType } from '../../Effects/PerkType';
import { NextScreenChoices, ScreenChoice } from '../../ScreenDisplay';
import { User } from '../../User';
import { Time } from '../../Utilities/Time';
import { describeHair } from '../../Descriptors/HairDescriptor';
import { campMenu } from './PlayerMenu';

// public newGamePlus() {
//     Flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] = player.stats.XP;
//     if (Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP]) Flags.list[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] = 1;
//     while (player.stats.level > 1) {
//         Flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_XP] += player.stats.level * 100;
//         player.stats.level--;
//     }
//     Flags[FlagEnum.NEW_GAME_PLUS_BONUS_STORED_ITEMS] = player.inventory.gems;
//     display();
// }

export function charCreationMenu(): NextScreenChoices {
    MainScreen.getStatsPanel().hide();
    MainScreen.getTopButton(TopButton.MainMenu).hide();
    MainScreen.getTopButton(TopButton.Data).hide();
    MainScreen.getTopButton(TopButton.Stats).hide();
    MainScreen.getTopButton(TopButton.Perks).hide();

    const newPlayer = new Player();
    User.char = newPlayer;

    clearEverything();

    return enterName(newPlayer);
}

function clearEverything() {
    Time.day = 0;
    Time.hour = 0;
}

function enterName(player: Player): NextScreenChoices {
    DisplayText().clear();
    DisplayText("You grew up in the small village of Ingnam, a remote village with rich traditions, buried deep in the wilds.  Every year for as long as you can remember, your village has chosen a champion to send to the cursed Demon Realm.  Legend has it that in years Ingnam has failed to produce a champion, chaos has reigned over the countryside.  Children disappear, crops wilt, and disease spreads like wildfire.  This year, <b>you</b> have been selected to be the champion.\n\nWhat is your name?");

    const nameField = new InputTextElement();
    DisplayText().appendElement(nameField);

    return { choices: [["OK", () => chooseName(player, nameField)]] };
}

function chooseName(player: Player, nameField: InputTextElement): NextScreenChoices {
    if (nameField.text === "") {
        enterName(player);
        DisplayText("\n\n\n<b>You must select a name.</b>");
        return;
    }
    player.desc.name = nameField.text;
    DisplayText().clear();
    if (customName(player.desc.name)) {
        DisplayText("This name, like you, is special.  Do you live up to your name or continue on, assuming it to be coincidence?");
        return { choices: [["SpecialName", useCustomProfile], ["Continue On", noCustomProfile]] };
    }
    else { // Proceed with normal character creation
        DisplayText("\n\n\n\nAre you a man or a woman?");
        return { choices: [["Man", isAMan], ["Woman", isAWoman]] };
    }
}

function useCustomProfile(player: Player) {
    DisplayText().clear();
    if (customNameWithHistory(player.desc.name)) {
        DisplayText().clear();
        DisplayText("Your name defines everything about you, and as such, it is time to wake...\n\n");
        // Flags.list[FlagEnum.HISTORY_PERK_SELECTED] = 1;
        return completeCharacterCreation(player);
    }
    else {
        return chooseHistory();
        /*
        DisplayText("There is something different about you, but first, what is your basic gender?  An individual such as you may later overcome this, of course...");
        DisplayText("\n\n\n\nAre you a man or a woman?");
        return { choices: [["Man", isAMan], ["Woman", isAWoman]] };
        */
    }
}

function noCustomProfile(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Your name carries little significance beyond it being your name.  What is your gender?");
    return { choices: [["Man", isAMan], ["Woman", isAWoman]] };
}

// Determines if has character creation bonuses
function customName(arg: string): (player: Player) => void {
    switch (arg) {
        // case "Aria": return Custom.Aria;
        // case "Betram": return Custom.Betram;
        // case "Charaun": return Custom.Charaun;
        // case "Cody": return Custom.Cody;
        // case "Galatea": return Custom.Galatea;
        // case "Gundam": return Custom.Gundam;
        // case "Hikari": return Custom.Hikari;
        // case "Katti": return Custom.Katti;
        // case "Lucina": return Custom.Lucina;
        // case "Navorn": return Custom.Navorn;
        // case "Rope": return Custom.Rope;
        // case "Sora": return Custom.Sora;
        default:
            return customNameWithHistory(arg); // Must check against the special name list as well
    }
}

// Does PC skip creation?
function customNameWithHistory(arg: string): (player: Player) => void {
    switch (arg) {
        // case "Annetta": return Custom.Annetta;
        // case "Ceveo": return Custom.Ceveo;
        // case "Charlie": return Custom.Charlie;
        // case "Isaac": return Custom.Isaac;
        // case "Leah": return Custom.Leah;
        // case "Lukaz": return Custom.Lukaz;
        // case "Mara": return Custom.Mara;
        // case "Mihari": return Custom.Mihari;
        // case "Mirvanna": return Custom.Mirvanna;
        // case "Nami": return Custom.Nami;
        // case "Nixi": return Custom.Nixi;
        // case "Prismere": return Custom.Prismere;
        // case "Rann Rayla": return Custom.RannRayla;
        // case "Sera": return Custom.Sera;
        // case "Siveen": return Custom.Siveen;
        // case "TestChar": return Custom.TestChar;
        // case "Tyriana": return Custom.Tyriana;
        // case "Vahdunbrii": return Custom.Vahdunbrii;
        default:
            return undefined;
    }
}

function isAMan(player: Player): NextScreenChoices {
    player.stats.str += 3;
    player.stats.tou += 2;

    player.body.balls.count = 2;
    player.body.balls.size = 1;
    player.body.fertility = 5;
    player.body.hair.length = 1;
    player.body.tallness = 71;
    player.body.tone = 60;

    player.body.chest.add(new BreastRow());
    const newCock = new Cock();
    newCock.length = 5.5;
    newCock.thickness = 1;
    newCock.type = CockType.HUMAN;
    newCock.knotMultiplier = 1;
    player.body.cocks.add(newCock);
    player.gender = Gender.MALE;
    DisplayText().clear();
    DisplayText("You are a man.  Your upbringing has provided you an advantage in strength and toughness.\n\nWhat type of build do you have?");
    return { choices: [["Lean", buildLeanMale], ["Average", buildAverageMale], ["Thick", buildThickMale], ["Girly", buildGirlyMale]] };
}

function isAWoman(player: Player): NextScreenChoices {
    player.stats.spe += 3;
    player.stats.int += 2;

    player.body.balls.count = 0;
    player.body.balls.size = 0;
    player.body.fertility = 10;
    player.body.hair.length = 10;
    player.body.tallness = 67;
    player.body.tone = 30;

    player.body.chest.add(new BreastRow());
    player.body.vaginas.add(new Vagina());
    player.body.clit.length = 0.5;
    player.gender = Gender.FEMALE;
    DisplayText().clear();
    DisplayText("You are a woman.  Your upbringing has provided you an advantage in speed and intellect.\n\nWhat type of build do you have?");
    return { choices: [["Slender", buildSlenderFemale], ["Average", buildAverageFemale], ["Curvy", buildCurvyFemale], ["Tomboyish", buildTomboyishFemale]] };
}

function buildLeanMale(player: Player): NextScreenChoices {
    player.stats.str -= 1;
    player.stats.spe += 1;

    player.body.femininity = 34;
    player.body.thickness = 30;
    player.body.tone += 5;

    player.body.chest.get(0).rating = BreastCup.FLAT;
    player.body.butt.rating = ButtRating.TIGHT;
    player.body.hips.rating = HipRating.SLENDER;
    return chooseComplexion();
}

function buildSlenderFemale(player: Player): NextScreenChoices {
    player.stats.str -= 1;
    player.stats.spe += 1;

    player.body.femininity = 66;
    player.body.thickness = 30;
    player.body.tone += 5;

    player.body.chest.get(0).rating = BreastCup.B;
    player.body.butt.rating = ButtRating.TIGHT;
    player.body.hips.rating = HipRating.AMPLE;
    return chooseComplexion();
}

function buildAverageMale(player: Player): NextScreenChoices {
    player.body.femininity = 30;
    player.body.thickness = 50;

    player.body.chest.get(0).rating = BreastCup.FLAT;
    player.body.butt.rating = ButtRating.AVERAGE;
    player.body.hips.rating = HipRating.AVERAGE;
    return chooseComplexion();
}

function buildAverageFemale(player: Player): NextScreenChoices {
    player.body.femininity = 70;
    player.body.thickness = 50;

    player.body.chest.get(0).rating = BreastCup.C;
    player.body.butt.rating = ButtRating.NOTICEABLE;
    player.body.hips.rating = HipRating.AMPLE;
    return chooseComplexion();
}

function buildThickMale(player: Player): NextScreenChoices {
    player.stats.spe -= 4;
    player.stats.str += 2;
    player.stats.tou += 2;

    player.body.femininity = 29;
    player.body.thickness = 70;
    player.body.tone -= 5;

    player.body.chest.get(0).rating = BreastCup.FLAT;
    player.body.butt.rating = ButtRating.NOTICEABLE;
    player.body.hips.rating = HipRating.AVERAGE;
    return chooseComplexion();
}

function buildCurvyFemale(player: Player): NextScreenChoices {
    player.stats.spe -= 2;
    player.stats.str += 1;
    player.stats.tou += 1;

    player.body.femininity = 71;
    player.body.thickness = 70;

    player.body.chest.get(0).rating = BreastCup.D;
    player.body.butt.rating = ButtRating.LARGE;
    player.body.hips.rating = HipRating.CURVY;
    return chooseComplexion();
}

function buildGirlyMale(player: Player): NextScreenChoices {
    player.stats.str -= 2;
    player.stats.spe += 2;

    player.body.femininity = 50;
    player.body.thickness = 50;
    player.body.tone = 26;

    player.body.chest.get(0).rating = BreastCup.A;
    player.body.butt.rating = ButtRating.NOTICEABLE;
    player.body.hips.rating = HipRating.SLENDER;
    return chooseComplexion();
}

function buildTomboyishFemale(player: Player): NextScreenChoices {
    player.stats.str += 1;
    player.stats.spe -= 1;

    player.body.femininity = 56;
    player.body.thickness = 50;
    player.body.tone = 50;

    player.body.chest.get(0).rating = BreastCup.A;
    player.body.butt.rating = ButtRating.TIGHT;
    player.body.hips.rating = HipRating.SLENDER;
    return chooseComplexion();
}

function chooseComplexion(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("What is your complexion?");
    return {
        choices: [
            ["Light", (player: Player) => setComplexion(player, "light")],
            ["Olive", (player: Player) => setComplexion(player, "olive")],
            ["Dark", (player: Player) => setComplexion(player, "dark")],
            ["Ebony", (player: Player) => setComplexion(player, "ebony")]
        ]
    };
}

function setComplexion(player: Player, choice: string): NextScreenChoices { // And choose hair
    player.body.skin.tone = choice;
    DisplayText().clear();
    DisplayText("You selected a " + choice + " complexion.\n\nWhat color is your hair?");
    return {
        choices: [
            ["Blonde", () => setHair(player, "blonde")],
            ["Brown", () => setHair(player, "brown")],
            ["Black", () => setHair(player, "black")],
            ["Red", () => setHair(player, "red")],
            ["Gray", () => setHair(player, "gray")],
            ["White", () => setHair(player, "white")],
            ["Auburn", () => setHair(player, "auburn")]
        ]
    };
}

function setHair(player: Player, choice: string): NextScreenChoices {
    player.body.hair.color = choice;
    DisplayText().clear();
    DisplayText("You have " + describeHair(player) + ".");
    return { next: chooseEndowment };
}

function chooseEndowment(player: Player): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Every person is born with a gift.  What's yours?");
    const choices: ScreenChoice[] = [
        ["Strength", confirmEndowmentStrength],
        ["Toughness", confirmEndowmentThoughness],
        ["Speed", confirmEndowmentSpeed],
        ["Smarts", confirmEndowmentSmarts],
        ["Libido", confirmEndowmentLibido],
        ["Touch", confirmEndowmentTouch]
    ];
    if (player.body.cocks.count > 0) {
        choices.push(["Big Cock", confirmEndowmentBigCock], ["Lots of Jizz", confirmEndowmentMessyOrgasms]);
    }
    else {
        choices.push(
            ["Big Breasts", confirmEndowmentBigBreasts],
            ["Big Clit", confirmEndowmentBigClit],
            ["Fertile", confirmEndowmentFertile],
            ["Wet Vagina", confirmEndowmentWetVagina]
        );
    }
    return { choices };
}

function confirmEndowmentStrength(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Are you stronger than normal? (+5 Strength)\n\nStrength increases your combat damage, and your ability to hold on to an enemy or pull yourself away.");
    return { yes: setEndowmentStrength, no: chooseEndowment };
}

function confirmEndowmentThoughness(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Are you unusually tough? (+5 Toughness)\n\nToughness gives you more HP and increases the chances an attack against you will fail to wound you.");
    return { yes: setEndowmentToughness, no: chooseEndowment };
}

function confirmEndowmentSpeed(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Are you very quick?  (+5 Speed)\n\nSpeed makes it easier to escape combat and grapples.  It also boosts your chances of evading an enemy attack and successfully catching up to enemies who try to run.");
    return { yes: setEndowmentSpeed, no: chooseEndowment };
}

function confirmEndowmentSmarts(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Are you a quick learner?  (+5 Intellect)\n\nIntellect can help you avoid dangerous monsters or work with machinery.  It will also boost the power of any spells you may learn in your travels.");
    return { yes: setEndowmentSmarts, no: chooseEndowment };
}

function confirmEndowmentLibido(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Do you have an unusually high sex-drive?  (+5 Libido)\n\nLibido affects how quickly your lust builds over time.  You may find a high libido to be more trouble than it's worth...");
    return { yes: setEndowmentLibido, no: chooseEndowment };
}

function confirmEndowmentTouch(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Is your skin unusually sensitive?  (+5 Sensitivity)\n\nSensitivity affects how easily touches and certain magics will raise your lust.  Very low sensitivity will make it difficult to orgasm.");
    return { yes: setEndowmentTouch, no: chooseEndowment };
}

function confirmEndowmentBigCock(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Do you have a big cock?  (+2\" Cock Length)\n\nA bigger cock will make it easier to get off any sexual partners, but only if they can take your size.");
    return { yes: setEndowmentBigCock, no: chooseEndowment };
}

function confirmEndowmentMessyOrgasms(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Are your orgasms particularly messy?  (+50% Cum Multiplier)\n\nA higher cum multiplier will cause your orgasms to be messier.");
    return { yes: setEndowmentMessyOrgasms, no: chooseEndowment };
}

function confirmEndowmentBigBreasts(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Are your breasts bigger than average? (DD cups)\n\nLarger breasts will allow you to lactate greater amounts, tit-fuck larger cocks, and generally be a sexy bitch.");
    return { yes: setEndowmentBigBreasts, no: chooseEndowment };
}

function confirmEndowmentBigClit(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Do you have a big clit?  (1\" Long)\n\nA large enough clit may eventually become as large as a cock.  It also makes you gain lust much faster during oral or manual stimulation.");
    return { yes: setEndowmentBigClit, no: chooseEndowment };
}

function confirmEndowmentFertile(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Is your family particularly fertile?  (+15% Fertility)\n\nA high fertility will cause you to become pregnant much more easily.  Pregnancy may result in: Strange children, larger bust, larger hips, a bigger ass, and other weirdness.");
    return { yes: setEndowmentFertile, no: chooseEndowment };
}

function confirmEndowmentWetVagina(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Does your pussy get particularly wet?  (+1 Vaginal Wetness)\n\nVaginal wetness will make it easier to take larger cocks, in turn helping you bring the well-endowed to orgasm quicker.");
    return { yes: setEndowmentWetVagina, no: chooseEndowment };
}

function setEndowmentStrength(player: Player): NextScreenChoices {
    player.stats.str += 5;
    player.body.tone += 7;
    player.body.thickness += 3;
    // Add bonus +25% strength gain
    player.perks.add(PerkType.Strong, 0.25, 0, 0, 0);
    return chooseHistory();
}

function setEndowmentToughness(player: Player): NextScreenChoices {
    player.stats.tou += 5;
    player.body.tone += 5;
    player.body.thickness += 5;
    player.perks.add(PerkType.Tough, 0.25, 0, 0, 0);
    player.stats.HP = player.stats.maxHP();
    return chooseHistory();
}

function setEndowmentSpeed(player: Player): NextScreenChoices {
    player.stats.spe += 5;
    player.body.tone += 10;
    player.perks.add(PerkType.Fast, 0.25, 0, 0, 0);
    return chooseHistory();
}

function setEndowmentSmarts(player: Player): NextScreenChoices {
    player.stats.int += 5;
    player.body.thickness -= 5;
    player.perks.add(PerkType.Smart, 0.25, 0, 0, 0);
    return chooseHistory();
}

function setEndowmentLibido(player: Player): NextScreenChoices {
    player.stats.lib += 5;
    player.perks.add(PerkType.Lusty, 0.25, 0, 0, 0);
    return chooseHistory();
}

function setEndowmentTouch(player: Player): NextScreenChoices {
    player.stats.sens += 5;
    player.perks.add(PerkType.Sensitive, 0.25, 0, 0, 0);
    return chooseHistory();
}

function setEndowmentBigCock(player: Player): NextScreenChoices {
    player.body.femininity -= 5;
    player.body.cocks.get(0).length = 8;
    player.body.cocks.get(0).thickness = 1.5;
    player.perks.add(PerkType.BigCock, 1.25, 0, 0, 0);
    return chooseHistory();
}

function setEndowmentMessyOrgasms(player: Player): NextScreenChoices {
    player.body.femininity -= 2;
    player.body.cumMultiplier = 1.5;
    player.perks.add(PerkType.MessyOrgasms, 1.25, 0, 0, 0);
    return chooseHistory();
}

function setEndowmentBigBreasts(player: Player): NextScreenChoices {
    player.body.femininity += 5;
    player.body.chest.get(0).rating += 2;
    player.perks.add(PerkType.BigTits, 1.5, 0, 0, 0);
    return chooseHistory();
}

function setEndowmentBigClit(player: Player): NextScreenChoices {
    player.body.femininity -= 5;
    player.body.clit.length = 1;
    player.perks.add(PerkType.BigClit, 1.25, 0, 0, 0);
    return chooseHistory();
}

function setEndowmentFertile(player: Player): NextScreenChoices {
    player.body.femininity += 5;
    player.body.fertility += 25;
    player.body.hips.rating += 2;
    player.perks.add(PerkType.Fertile, 1.5, 0, 0, 0);
    return chooseHistory();
}

function setEndowmentWetVagina(player: Player): NextScreenChoices {
    player.body.femininity += 7;
    player.body.vaginas.get(0).wetness = VaginaWetness.WET;
    player.perks.add(PerkType.WetPussy, 2, 0, 0, 0);
    return chooseHistory();
}

function chooseHistory(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("Before you became a champion, you had other plans for your life.  What were you doing before?");
    return {
        choices: [
            ["Alchemy", () => confirmHistory(PerkType.HistoryAlchemist)],
            ["Fighting", () => confirmHistory(PerkType.HistoryFighter)],
            ["Healing", () => confirmHistory(PerkType.HistoryHealer)],
            ["Religion", () => confirmHistory(PerkType.HistoryReligious)],
            ["Schooling", () => confirmHistory(PerkType.HistoryScholar)],
            ["Slacking", () => confirmHistory(PerkType.HistorySlacker)],
            ["Slutting", () => confirmHistory(PerkType.HistorySlut)],
            ["Smithing", () => confirmHistory(PerkType.HistorySmith)],
            ["Whoring", () => confirmHistory(PerkType.HistoryWhore)],
        ]
    };
}

function confirmHistory(choice: PerkType): NextScreenChoices {
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
    return { yes: (player: Player) => setHistory(player, choice), no: chooseHistory };
}

function setHistory(player: Player, choice: PerkType): NextScreenChoices {
    player.perks.set(choice, PerkFactory.create(choice));
    if (choice === PerkType.HistorySlut || choice === PerkType.HistoryWhore) {
        if (player.body.vaginas.count > 0) {
            player.body.vaginas.get(0).virgin = false;
            player.body.vaginas.get(0).looseness = VaginaLooseness.LOOSE;
        }
        player.body.butt.looseness = 1;
    }
    return completeCharacterCreation(player);
}

function completeCharacterCreation(player: Player, customProile?: (player: Player) => void): NextScreenChoices {
    if (customProile) {
        customProile(player);
        return { next: arrival };
    }
    return arrival(player);
}

function arrival(player: Player): NextScreenChoices {
    Time.hour = 11;
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
    return { next: arrivalPartTwo };
}

function arrivalPartTwo(player: Player): NextScreenChoices {
    DisplayText().clear();
    player.stats.lust += 40;
    player.stats.cor += 2;
    Time.hour = 18;
    DisplayText("You wake with a splitting headache and a body full of burning desire.  A shadow darkens your view momentarily and your training kicks in.  You roll to the side across the bare ground and leap to your feet.  A surprised looking imp stands a few feet away, holding an empty vial.  He's completely naked, an improbably sized pulsing red cock hanging between his spindly legs.  You flush with desire as a wave of lust washes over you, your mind reeling as you fight ");
    if (player.gender === Gender.FEMALE)
        DisplayText("the urge to chase down his rod and impale yourself on it.\n\n");
    else
        DisplayText("the urge to ram your cock down his throat.  The strangeness of the thought surprises you.\n\n");
    DisplayText("The imp says, \"<i>I'm amazed you aren't already chasing down my cock, human.  The last Champion was an eager whore for me by the time she woke up.  This lust draft made sure of it.</i>\"");
    return { next: arrivalPartThree };
}

function arrivalPartThree(player: Player): NextScreenChoices {
    DisplayText().clear();
    player.stats.lust += -30;
    DisplayText("The imp shakes the empty vial to emphasize his point.  You reel in shock at this revelation - you've just entered the demon realm and you've already been drugged!  You tremble with the aching need in your groin, but resist, righteous anger lending you strength.\n\nIn desperation you leap towards the imp, watching with glee as his cocky smile changes to an expression of sheer terror.  The smaller creature is no match for your brute strength as you pummel him mercilessly.  You pick up the diminutive demon and punt him into the air, frowning grimly as he spreads his wings and begins speeding into the distance.\n\n");
    DisplayText("The imp says, \"<i>FOOL!  You could have had pleasure unending... but should we ever cross paths again you will regret humiliating me!  Remember the name Zetaz, as you'll soon face the wrath of my master!</i>\"\n\n");
    DisplayText("Your pleasure at defeating the demon ebbs as you consider how you've already been defiled.  You swear to yourself you will find the demon responsible for doing this to you and the other Champions, and destroy him AND his pet imp.");
    return { next: arrivalPartFour };
}

function arrivalPartFour(): NextScreenChoices {
    DisplayText().clear();
    DisplayText("You look around, surveying the hellish landscape as you plot your next move.  The portal is a few yards away, nestled between a formation of rocks.  It does not seem to exude the arousing influence it had on the other side.  The ground and sky are both tinted different shades of red, though the earth beneath your feet feels as normal as any other lifeless patch of dirt.   You settle on the idea of making a camp here and fortifying this side of the portal.  No demons will ravage your beloved hometown on your watch.\n\nIt does not take long to set up your tent and a few simple traps.  You'll need to explore and gather more supplies to fortify it any further.  Perhaps you will even manage to track down the demons who have been abducting the other champions!");
    return { next: campMenu };
}
