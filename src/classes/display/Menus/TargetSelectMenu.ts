import Character from '../../Character/Character';
import CombatManager from '../../Combat/CombatManager';
import Player from '../../Player/Player';
import DisplayText from '../DisplayText';
import MainScreen from '../MainScreen';

export default class TargetSelectMenu {
    public static display(player: Player, targetCallback: (player: Player, target: Character) => void) {
        let enemyPartyAbleMembers = CombatManager.getEnemyParty(player).ableMembers;
        if (enemyPartyAbleMembers.length > 1) {
            let nameList = [];
            let targetList = [];
            for (let index: number = 0; index < enemyPartyAbleMembers.length; index++) {
                nameList.push(enemyPartyAbleMembers[index].desc.short);
                targetList.push(function () {
                    targetCallback(player, enemyPartyAbleMembers[index])
                });
            }
            TargetSelectMenu.displayText();
            MainScreen.displayChoices(nameList, targetList);
        }
        else {
            targetCallback(player, enemyPartyAbleMembers[0]);
        }
    }

    private static displayText() {
        DisplayText.text("Select your target");
    }
}