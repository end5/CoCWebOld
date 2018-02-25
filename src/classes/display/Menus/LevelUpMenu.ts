import Menu from './Menu';
import Menus from './Menus';
import Character from '../../Character/Character';
import DisplayText from '../DisplayText';
import { ClickFunction } from '../Elements/ButtonElement';
import MainScreen from '../MainScreen';

export default class LevelUpMenu implements Menu {
    public display(character?: Character, prevMenu?: ClickFunction) {
        DisplayText().clear();
        MainScreen.hideTopButtons();
        // MainScreen.getTopButton(TopButton.MainMenu).show();
        // Level up
        if (character.stats.XP >= (character.stats.level) * 100) {
            character.stats.level++;
            character.perkPoints++;
            DisplayText("<b>You are now level " + character.stats.level + "!</b>\n\nYou may now apply +5 to one attribute.  Which will you choose?");
            character.stats.XP -= (character.stats.level - 1) * 100;
            MainScreen.hideBottomButtons();
            MainScreen.getBottomButton(0).modify("Strength", this.levelUpStatStrength);
            MainScreen.getBottomButton(1).modify("Toughness", this.levelUpStatToughness);
            MainScreen.getBottomButton(2).modify("Speed", this.levelUpStatSpeed);
            MainScreen.getBottomButton(3).modify("Intelligence", this.levelUpStatIntelligence);
        }
    }

    private levelUpStatStrength(character: Character) {
        character.stats.str += 5; // Gain +5 Str due to level
        DisplayText().clear();
        DisplayText("Your muscles feel significantly stronger from your time adventuring.");
        MainScreen.doNext(Menus.PerkUp.display);
    }

    private levelUpStatToughness(character: Character) {
        character.stats.tou += 5; // Gain +5 Toughness due to level
        DisplayText().clear();
        DisplayText("You feel tougher from all the fights you have endured.");
        MainScreen.doNext(Menus.PerkUp.display);
    }

    private levelUpStatSpeed(character: Character) {
        character.stats.spe += 5; // Gain +5 speed due to level
        DisplayText().clear();
        DisplayText("Your time in combat has driven you to move faster.");
        MainScreen.doNext(Menus.PerkUp.display);
    }

    private levelUpStatIntelligence(character: Character) {
        character.stats.int += 5; // Gain +5 Intelligence due to level
        DisplayText().clear();
        DisplayText("Your time spent fighting the creatures of this realm has sharpened your wit.");
        MainScreen.doNext(Menus.PerkUp.display);
    }
}
