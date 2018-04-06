import DisplayText from '../../../Engine/display/DisplayText';
import MainScreen from '../../../Engine/Display/MainScreen';
import Character from '../../Character/Character';
import Menus from '../Menus';

export default function display(character: Character) {
    DisplayText().clear();
    MainScreen.hideTopButtons();
    // MainScreen.getTopButton(TopButton.MainMenu).show();
    // Level up
    if (character.stats.XP >= (character.stats.level) * 100) {
        character.stats.level++;
        character.stats.perkPoints++;
        DisplayText("<b>You are now level " + character.stats.level + "!</b>\n\nYou may now apply +5 to one attribute.  Which will you choose?");
        character.stats.XP -= (character.stats.level - 1) * 100;
        MainScreen.displayChoices(
            ["Strength", "Toughness", "Speed", "Intelligence"],
            [this.levelUpStatStrength, this.levelUpStatToughness, this.levelUpStatSpeed, this.levelUpStatIntelligence]
        );
    }
}

function levelUpStatStrength(character: Character) {
    character.stats.str += 5; // Gain +5 Str due to level
    DisplayText().clear();
    DisplayText("Your muscles feel significantly stronger from your time adventuring.");
    MainScreen.doNext(Menus.PerkUp);
}

function levelUpStatToughness(character: Character) {
    character.stats.tou += 5; // Gain +5 Toughness due to level
    DisplayText().clear();
    DisplayText("You feel tougher from all the fights you have endured.");
    MainScreen.doNext(Menus.PerkUp);
}

function levelUpStatSpeed(character: Character) {
    character.stats.spe += 5; // Gain +5 speed due to level
    DisplayText().clear();
    DisplayText("Your time in combat has driven you to move faster.");
    MainScreen.doNext(Menus.PerkUp);
}

function levelUpStatIntelligence(character: Character) {
    character.stats.int += 5; // Gain +5 Intelligence due to level
    DisplayText().clear();
    DisplayText("Your time spent fighting the creatures of this realm has sharpened your wit.");
    MainScreen.doNext(Menus.PerkUp);
}
