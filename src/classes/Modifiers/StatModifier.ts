import MainScreen from '../display/MainScreen';
import Player from '../Player';

export default class StatModifier {
    public static displayPlayerHPChange(player: Player, changeAmount: number) {
        if (changeAmount > 0 && player.stats.HP == player.stats.maxHP()) {
            MainScreen.text("You're as healthy as you can be.\n", false);
            return;
        }

        const oldHP = player.stats.HP;
        player.stats.HP += changeAmount;
        const diff = player.stats.HP - oldHP;

        if (diff > 0) {
            if (player.stats.HP == player.stats.maxHP())
                MainScreen.text("Your HP maxes out at " + player.stats.maxHP() + ".\n", false);
            else
                MainScreen.text("You gain " + diff + " HP.\n", false);
        }
        //Negative HP
        else if (diff < 0) {
            if (player.stats.HP == 0)
                MainScreen.text("You take " + diff + " damage, dropping your HP to 0.\n", false);
            else
                MainScreen.text("You take " + diff + " damage.\n", false);
        }
    }

}