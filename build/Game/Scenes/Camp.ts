import { Scenes } from './Scenes';
import { DisplayImage } from '../../Engine/Display/DisplayImage';
import { DisplaySprite } from '../../Engine/Display/DisplaySprite';
import { DisplayText } from '../../Engine/display/DisplayText';
import { ImageName } from '../../Engine/Display/Images/ImageName';
import { SpriteName } from '../../Engine/Display/Images/SpriteName';
import { MainScreen, TopButton } from '../../Engine/Display/MainScreen';
import { SaveManager } from '../../Engine/Save/SaveManager';
import { Character } from '../Character/Character';
import { PlayerFlags } from '../Character/Player/PlayerFlags';
import { PerkType } from '../Effects/PerkType';
import { StatusAffectType } from '../Effects/StatusAffectType';
import { Menus } from '../Menus/Menus';
import { Mod } from '../Modifiers/Modifiers';
import { generateSave } from '../SaveFile';
import { NextScreenChoices } from '../ScreenDisplay';
import { User } from '../User';
import { numToCardinalCapText, numToCardinalText } from '../Utilities/NumToText';
import { Time } from '../Utilities/Time';

export function returnToCamp(timeUsed: number): NextScreenChoices {
    DisplayText().clear();
    if (timeUsed === 1)
        DisplayText("An hour passes...\n");
    else DisplayText(numToCardinalCapText(timeUsed) + " hour pass...\n");
    // if (!Game.inCombat) DisplaySprite(SpriteName.None);
    MainScreen.hideTopButtons();
    return Scenes.endDay.goNext(timeUsed, false);
}

export function returnToCampUseOneHour(): NextScreenChoices { return returnToCamp(1); } // Replacement for event number 13;

export function returnToCampUseTwoHours(): NextScreenChoices { return returnToCamp(2); } // Replacement for event number 14;

export function returnToCampUseFourHours(): NextScreenChoices { return returnToCamp(4); } // Replacement for event number 15;

export function returnToCampUseEightHours(): NextScreenChoices { return returnToCamp(8); } // Replacement for event number 16;

export function display(character: Character): NextScreenChoices {
    MainScreen.showTopButtons();
    DisplaySprite(SpriteName.None);

    // Level junk
    if (character.stats.XP >= (character.stats.level) * 100 || character.stats.perkPoints > 0) {
        if (character.stats.XP < character.stats.level * 100)
            MainScreen.getTopButton(TopButton.PerkUp).modify("Perk Up", () => Menus.PerkUp(User.char));
        else
            MainScreen.getTopButton(TopButton.PerkUp).modify("Level Up", () => Menus.LevelUp(User.char));
        MainScreen.getLevelUpIcon().show();
    }
    else {
        MainScreen.getTopButton(TopButton.PerkUp).hide();
        MainScreen.getLevelUpIcon().hide();
    }
    // Build main menu
    let exploreEvent = Scenes.exploration.display;
    const masturbate = (character.stats.lust > 30 ? Scenes.masturbation.display : undefined);
    DisplayText().clear();

    DisplayImage(ImageName.camping);
    if (Time.day < 10) DisplayText("Your campsite is fairly simple at the moment.  Your tent and bedroll are set in front of the rocks that lead to the portal.  You have a small fire pit as well.");
    else if (Time.day < 20) DisplayText("Your campsite is starting to get a very 'lived-in' look.  The fire-pit is well defined with some rocks you've arranged around it, and your bedroll and tent have been set up in the area most sheltered by rocks.");
    else DisplayText("Your new home is as comfy as a camp site can be.  The fire-pit and tent are both set up perfectly, and in good repair, and you've even managed to carve some artwork into the rocks around the camp's perimeter.");
    // Clear bee-status
    if (character.statusAffects.has(StatusAffectType.ParalyzeVenom)) {
        character.stats.str += character.statusAffects.get(StatusAffectType.ParalyzeVenom).value1;
        character.stats.spe += character.statusAffects.get(StatusAffectType.ParalyzeVenom).value2;
        character.statusAffects.remove(StatusAffectType.ParalyzeVenom);
        DisplayText("<b>You feel quicker and stronger as the paralyzation venom in your veins wears off.</b>\n\n");
    }
    // The uber horny
    if (character.stats.lust >= 100) {
        if (character.statusAffects.has(StatusAffectType.Dysfunction)) {
            DisplayText("<b>You are debilitatingly aroused, but your sexual organs are so numbed the only way to get off would be to find something tight to fuck or get fucked...</b>\n\n");
        }
        else if ((User.flags.get("Player") as PlayerFlags).UNABLE_TO_MASTURBATE_BECAUSE_CENTAUR > 0 && character.torso.hips.legs.isTaur()) {
            DisplayText("<b>You are delibitatingly aroused, but your sex organs are so difficult to reach that masturbation isn't at the forefront of your mind.</b>\n\n");
        }
        else {
            DisplayText("<b>You are debilitatingly aroused, and can think of doing nothing other than masturbating.</b>\n\n");
            exploreEvent = undefined;
            // This once disabled the ability to rest, sleep or wait, but ir hasn't done that for many many builds
        }
    }
    let baitText: string = "Masturbate";
    if (((character.perks.has(PerkType.HistoryReligious) && character.stats.cor <= 66) || (character.perks.has(PerkType.Enlightened) && character.stats.cor < 10)) && !(character.statusAffects.has(StatusAffectType.Exgartuan) && character.statusAffects.get(StatusAffectType.Exgartuan).value2 === 0)) baitText = "Meditate";
    let restEvent = doWait;
    let restName: string = "Wait";
    // Set up rest stuff
    // Night
    if (Time.hour < 6 || Time.hour > 20) {
        DisplayText("It is dark out, made worse by the lack of stars in the sky.  A blood-red moon hangs in the sky, seeming to watch you, but providing little light.  It's far too dark to leave camp.\n");
        restName = "Sleep";
        restEvent = doSleep;
        exploreEvent = undefined;
    }
    // Day Time!
    else {
        DisplayText("It's light outside, a good time to explore and forage for supplies with which to fortify your camp.\n");
        if (character.stats.fatigue > 40 || character.stats.HP / character.stats.maxHP() <= .9) {
            restName = "Rest";
            restEvent = rest;
        }
    }
    // Menu
    return {
        choices: [["Explore", exploreEvent], ["Places", undefined], ["Inventory", Menus.Inventory], ["Stash", undefined], ["Followers", undefined], ["Lovers", undefined], ["Slaves", undefined], ["", undefined], [baitText, masturbate], [restName, restEvent]]
    };
}

export function hasCompanions(): boolean {
    return companionsCount() > 0;
}

export function companionsCount(): number {
    return followersCount() + slavesCount() + loversCount();
}

export function followersCount(): number {
    const counter: number = 0;
    return counter;
}

export function slavesCount(): number {
    const counter: number = 0;
    return counter;
}

export function loversCount(): number {
    const counter: number = 0;
    return counter;
}

function rest(character: Character): NextScreenChoices {
    let time = 0;
    if (time === 0) {
        DisplayText().clear();
        DisplayText("You lie down to rest for four hour.\n");
        time = 4;
        // Marble withdrawl
        if (character.statusAffects.has(StatusAffectType.MarbleWithdrawl)) {
            DisplayText("\nYour rest is very troubled, and you aren't able to settle down.  You get up feeling tired and unsatisfied, always thinking of Marble's milk.\n");
            Mod.Stat.displayCharacterHPChange(character, time * 5);
            character.stats.tou += -.1;
            character.stats.int += -.1;
            character.stats.fatigue += -2 * time;
            if (character.perks.has(PerkType.SpeedyRecovery)) character.stats.fatigue += -1 * time;
        }
        // REGULAR HP/FATIGUE RECOVERY
        else {
            Mod.Stat.displayCharacterHPChange(character, time * 10);
            character.stats.fatigue += -4 * time;
            if (character.perks.has(PerkType.SpeedyRecovery)) character.stats.fatigue += -2 * time;
        }
    }
    else {
        DisplayText().clear();
        if (time !== 1) DisplayText("You continue to rest for " + numToCardinalText(time) + " more hour.\n");
        else DisplayText("You continue to rest for another hour.\n");
    }
    return Scenes.endDay.goNext(time, true);
}

function doWait(character: Character): NextScreenChoices {
    DisplayText().clear();
    let time = 0;
    if (time === 0) {
        DisplayText("You wait four hour...\n");
        time = 4;
        // Marble withdrawl
        if (character.statusAffects.has(StatusAffectType.MarbleWithdrawl)) {
            DisplayText("\nYour time spent waiting is very troubled, and you aren't able to settle down.  You get up feeling tired and unsatisfied, always thinking of Marble's milk.\n");
            // fatigue
            character.stats.fatigue += -1 * time;
            if (character.perks.has(PerkType.SpeedyRecovery)) character.stats.fatigue += -0.5 * time;
        }
        // REGULAR HP/FATIGUE RECOVERY
        else {
            // fatigue
            character.stats.fatigue += -2 * time;
            if (character.perks.has(PerkType.SpeedyRecovery)) character.stats.fatigue += -1 * time;
        }
    }
    else {
        if (time !== 1) DisplayText("You continue to wait for " + numToCardinalText(time) + " more hour.\n");
        else DisplayText("You continue to wait for another hour.\n");
    }
    return Scenes.endDay.goNext(time, true);
}

export function doSleep(character: Character): NextScreenChoices {
    let time = 0;
    if (time === 0) {
        if (Time.hour === 21) time = 9;
        if (Time.hour === 22) time = 8;
        if (Time.hour >= 23) time = 7;
        if (Time.hour === 0) time = 6;
        if (Time.hour === 1) time = 5;
        if (Time.hour === 2) time = 4;
        if (Time.hour === 3) time = 3;
        if (Time.hour === 4) time = 2;
        if (Time.hour === 5) time = 1;
        // Autosave stuff
        if (SaveManager.autoSave && SaveManager.activeSlot !== undefined /*&& Game.state !== GameState.GameOver*/) {
            console.trace("Autosaving to slot: " + SaveManager.activeSlot);
            SaveManager.saveToSlot(SaveManager.activeSlot(), generateSave());
        }
        DisplayText().clear();
        displaySleepRecovery(character, time);
    }
    else {
        DisplayText().clear();
        if (time !== 1) DisplayText("You lie down to resume sleeping for the remaining " + numToCardinalText(time) + " hour.\n");
        else DisplayText("You lie down to resume sleeping for the remaining hour.\n");
    }
    return Scenes.endDay.goNext(time, true);
}
// For shit that breaks normal sleep processing.
export function sleepWrapper(character: Character): NextScreenChoices {
    let time = 0;
    if (Time.hour === 16) time = 14;
    if (Time.hour === 17) time = 13;
    if (Time.hour === 18) time = 12;
    if (Time.hour === 19) time = 11;
    if (Time.hour === 20) time = 10;
    if (Time.hour === 21) time = 9;
    if (Time.hour === 22) time = 8;
    if (Time.hour >= 23) time = 7;
    if (Time.hour === 0) time = 6;
    if (Time.hour === 1) time = 5;
    if (Time.hour === 2) time = 4;
    if (Time.hour === 3) time = 3;
    if (Time.hour === 4) time = 2;
    if (Time.hour === 5) time = 1;
    DisplayText().clear();
    if (time !== 1) DisplayText("You lie down to resume sleeping for the remaining " + numToCardinalText(time) + " hour.\n");
    else DisplayText("You lie down to resume sleeping for the remaining hour.\n");
    displaySleepRecovery(character, time);
    return Scenes.endDay.goNext(time, true);
}

export function displaySleepRecovery(character: Character, time: number) {
    Mod.Stat.displayCharacterHPChange(character, time * 20);
    character.stats.fatigue -= character.stats.fatigue;
}

export function sleepRecovery(character: Character, time: number): void {
    character.stats.HP += time * 20;
    character.stats.fatigue -= character.stats.fatigue;
}
