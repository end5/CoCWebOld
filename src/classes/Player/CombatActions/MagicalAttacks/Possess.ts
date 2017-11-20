import Character from '../../../Character/Character';
import { CharacterType } from '../../../Character/CharacterType';
import DisplayText from '../../../display/DisplayText';
import Player from '../../../Player/Player';
import Utils from '../../../Utilities/Utils';
import PlayerCombatAction from '../Player/PlayerCombatAction';

export default class Possess implements PlayerCombatAction {
    public isPossible(player: Player): boolean {
        return player.perks.has("Incorporeality");
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public reasonCannotUse(): string {
        return "";
    }

    public use(player: Player, monster: Character) {
        DisplayText.clear();
        if (monster.desc.short == "plain girl" || monster.perks.has("Incorporeality")) {
            DisplayText.text("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself toward the opponent's frame.  Sadly, it was doomed to fail, as you bounce right off your foe's ghostly form.");
        }
        else if (monster.charType == CharacterType.LivingStatue) {
            DisplayText.text("There is nothing to possess inside the golem.");
        }
        //Sample possession text (>79 int, perhaps?):
        else if ((!monster.lowerBody.cockSpot.hasCock() && !monster.lowerBody.vaginaSpot.hasVagina()) || monster.stats.lustVuln == 0 || monster.stats.int == 0 || monster.stats.int > 100) {
            DisplayText.text("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into the opponent's frame.  Unfortunately, it seems ");
            if (monster.stats.int > 100)
                DisplayText.text("they were FAR more mentally prepared than anything you can handle, and you're summarily thrown out of their body before you're even able to have fun with them.  Darn, you muse.\n\n");
            else
                DisplayText.text("they have a body that's incompatible with any kind of possession.\n\n");
        }
        //Success!
        else if (player.stats.int >= (monster.stats.int - 10) + Utils.rand(21)) {
            DisplayText.text("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into your opponent's frame. Before they can regain the initiative, you take control of one of their arms, vigorously masturbating for several seconds before you're finally thrown out. Recorporealizing, you notice your enemy's blush, and know your efforts were somewhat successful.\n\n");
            let damage: number = Math.round(player.stats.int / 5) + Utils.rand(player.stats.level) + player.stats.level;
            monster.stats.lust += monster.stats.lustVuln * damage;
        }
        //Fail
        else {
            DisplayText.text("With a smile and a wink, your form becomes completely intangible, and you waste no time in throwing yourself into the opponent's frame. Unfortunately, it seems they were more mentally prepared than you hoped, and you're summarily thrown out of their body before you're even able to have fun with them. Darn, you muse. Gotta get smarter.\n\n");
        }
    }
}
