import DisplayText from '../display/DisplayText';
import Player from '../Player/Player';

export default class StatModifier {
    public static displayPlayerHPChange(player: Player, changeAmount: number) {
        if (changeAmount > 0 && player.stats.HP == player.stats.maxHP()) {
            DisplayText.text("You're as healthy as you can be.\n");
            return;
        }

        const oldHP = player.stats.HP;
        player.stats.HP += changeAmount;
        const diff = player.stats.HP - oldHP;

        if (diff > 0) {
            if (player.stats.HP == player.stats.maxHP())
                DisplayText.text("Your HP maxes out at " + player.stats.maxHP() + ".\n");
            else
                DisplayText.text("You gain " + diff + " HP.\n");
        }
        //Negative HP
        else if (diff < 0) {
            if (player.stats.HP == 0)
                DisplayText.text("You take " + diff + " damage, dropping your HP to 0.\n");
            else
                DisplayText.text("You take " + diff + " damage.\n");
        }
    }

}