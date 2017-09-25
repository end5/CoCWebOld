import Player from "../Player";
import MainScreen from "./MainScreen";

export default class StatChangeDisplay {
    public static HPChange(player: Player, changeAmount: number) {
        if (changeAmount == 0) return;
        if (changeAmount > 0) {
            //Increase by 20%!
            if (player.perks.has("HistoryHealer"))
                changeAmount *= 1.2;
            if (player.stats.HP + Math.floor(changeAmount) > player.stats.maxHP()) {
                if (player.stats.HP >= player.stats.maxHP()) {
                    MainScreen.text("You're as healthy as you can be.\n", false);
                    return;
                }
                MainScreen.text("Your HP maxes out at " + player.stats.maxHP() + ".\n", false);
                player.stats.HP = player.stats.maxHP();
            }
            else {
                MainScreen.text("You gain " + Math.floor(changeAmount) + " HP.\n", false);
                player.stats.HP += Math.floor(changeAmount);
                // mainView.statsView.showStatUp('hp');
                // hpUp.visible = true;
            }
        }
        //Negative HP
        else {
            if (player.stats.HP + changeAmount <= 0) {
                MainScreen.text("You take " + Math.floor(changeAmount * -1) + " damage, dropping your HP to 0.\n", false);
                player.stats.HP = 0;
            }
            else {
                MainScreen.text("You take " + Math.floor(changeAmount * -1) + " damage.\n", false);
                player.stats.HP += changeAmount;
            }
        }
        MainScreen.updateStats(player);
    }
}