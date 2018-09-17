import { DisplayText } from '../../../Engine/display/DisplayText';
import { MainScreen } from '../../../Engine/Display/MainScreen';
import { Character } from '../../Character/Character';
import { NextScreenChoices } from '../../ScreenDisplay';
import { Menus } from '../Menus';

export function display(character: Character): NextScreenChoices {
    DisplayText().clear();
    MainScreen.hideTopButtons();
    // MainScreen.getTopButton(TopButton.MainMenu).show();
    // Level up
    if (character.stats.XP >= (character.stats.level) * 100) {
        character.stats.level++;
        character.stats.perkPoints++;
        DisplayText("<b>You are now level " + character.stats.level + "!</b>\n\nYou may now apply +5 to one attribute.  Which will you choose?");
        character.stats.XP -= (character.stats.level - 1) * 100;
        return {
            choices: [
                ["Strength", levelUpStatStrength], ["Toughness", levelUpStatToughness], ["Speed", levelUpStatSpeed], ["Intelligence", levelUpStatIntelligence],
            ]
        };
    }
}

function levelUpStatStrength(character: Character): NextScreenChoices {
    character.stats.str += 5; // Gain +5 Str due to level
    DisplayText().clear();
    DisplayText("Your muscles feel significantly stronger from your time adventuring.");
    return { next: Menus.PerkUp };
}

function levelUpStatToughness(character: Character): NextScreenChoices {
    character.stats.tou += 5; // Gain +5 Toughness due to level
    DisplayText().clear();
    DisplayText("You feel tougher from all the fights you have endured.");
    return { next: Menus.PerkUp };
}

function levelUpStatSpeed(character: Character): NextScreenChoices {
    character.stats.spe += 5; // Gain +5 speed due to level
    DisplayText().clear();
    DisplayText("Your time in combat has driven you to move faster.");
    return { next: Menus.PerkUp };
}

function levelUpStatIntelligence(character: Character): NextScreenChoices {
    character.stats.int += 5; // Gain +5 Intelligence due to level
    DisplayText().clear();
    DisplayText("Your time spent fighting the creatures of this realm has sharpened your wit.");
    return { next: Menus.PerkUp };
}
