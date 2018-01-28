import Character from '../../Character/Character';
import CombatManager from '../../Combat/CombatManager';
import Player from '../../Player/Player';
import DisplayText from '../DisplayText';
import MainScreen from '../MainScreen';

export default class TargetSelectMenu {
    public static display(player: Player, targetCallback: (player: Player, target: Character) => void) {
        const enemyPartyAbleMembers = CombatManager.getEnemyParty(player).ableMembers;
        if (enemyPartyAbleMembers.length > 1) {
            const nameList = [];
            const targetList = [];
            for (const member of enemyPartyAbleMembers) {
                nameList.push(member.desc.short);
                targetList.push(() => {
                    targetCallback(player, member);
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
        DisplayText("Select your target");
    }
}
