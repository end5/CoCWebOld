import Menu from './Menu';
import Menus from './Menus';
import Player from '../../Player/Player';
import DisplayText from '../DisplayText';
import { ClickFunction } from '../Elements/ButtonElement';
import MainScreen, { TopButton } from '../MainScreen';

export default class LevelUpMenu implements Menu {
    public display(player?: Player, prevMenu?: ClickFunction) {
        DisplayText.clear();
        MainScreen.hideTopButtons();
        //MainScreen.getTopButton(TopButton.MainMenu).show();
        //Level up
        if (player.stats.XP >= (player.stats.level) * 100) {
            player.stats.level++;
            player.perkPoints++;
            DisplayText.text("<b>You are now level " + player.stats.level + "!</b>\n\nYou may now apply +5 to one attribute.  Which will you choose?");
            player.stats.XP -= (player.stats.level - 1) * 100;
            MainScreen.hideBottomButtons();
            MainScreen.getBottomButton(0).modify("Strength", this.levelUpStatStrength);
            MainScreen.getBottomButton(1).modify("Toughness", this.levelUpStatToughness);
            MainScreen.getBottomButton(2).modify("Speed", this.levelUpStatSpeed);
            MainScreen.getBottomButton(3).modify("Intelligence", this.levelUpStatIntelligence);
        }
    }

    private levelUpStatStrength(player: Player) {
        player.stats.str += 5; //Gain +5 Str due to level
        DisplayText.clear();
        DisplayText.text("Your muscles feel significantly stronger from your time adventuring.");
        MainScreen.doNext(Menus.PerkUp.display);
    }

    private levelUpStatToughness(player: Player) {
        player.stats.tou += 5; //Gain +5 Toughness due to level
        console.trace("HP: " + player.stats.HP + " MAX HP: " + player.stats.maxHP());
        DisplayText.clear();
        DisplayText.text("You feel tougher from all the fights you have endured.");
        MainScreen.doNext(Menus.PerkUp.display);
    }

    private levelUpStatSpeed(player: Player) {
        player.stats.spe += 5; //Gain +5 speed due to level
        DisplayText.clear();
        DisplayText.text("Your time in combat has driven you to move faster.");
        MainScreen.doNext(Menus.PerkUp.display);
    }

    private levelUpStatIntelligence(player: Player) {
        player.stats.int += 5; //Gain +5 Intelligence due to level
        DisplayText.clear();
        DisplayText.text("Your time spent fighting the creatures of this realm has sharpened your wit.");
        MainScreen.doNext(Menus.PerkUp.display);
    }
}