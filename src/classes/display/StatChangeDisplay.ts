import Player from "../Player";
import MainScreen from "./MainScreen";

export default class StatChangeDisplay {
    public static displayHPChange(player: Player, changeAmount: number) {
        if (changeAmount == 0) return;
        if (changeAmount > 0) {
            if (player.stats.HP + Math.floor(changeAmount) > player.stats.maxHP()) {
                if (player.stats.HP >= player.stats.maxHP()) {
                    MainScreen.text("You're as healthy as you can be.\n", false);
                    return;
                }
                MainScreen.text("Your HP maxes out at " + player.stats.maxHP() + ".\n", false);
            }
            else {
                MainScreen.text("You gain " + Math.floor(changeAmount) + " HP.\n", false);
                // mainView.statsView.showStatUp('hp');
                // hpUp.visible = true;
            }
        }
        //Negative HP
        else {
            if (player.stats.HP + changeAmount <= 0) {
                MainScreen.text("You take " + Math.floor(changeAmount * -1) + " damage, dropping your HP to 0.\n", false);
            }
            else {
                MainScreen.text("You take " + Math.floor(changeAmount * -1) + " damage.\n", false);
            }
        }
        MainScreen.updateStats(player);
    }
}