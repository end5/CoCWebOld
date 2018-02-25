import Character from '../../Character/Character';
import CombatManager from '../../Combat/CombatManager';
import DisplayText from '../DisplayText';
import MainScreen from '../MainScreen';

export default class TargetSelectMenu {
    public static display(character: Character, targetCallback: (character: Character, target: Character) => void) {
        const enemyPartyAbleMembers = CombatManager.getEnemyParty(character).ableMembers;
        if (enemyPartyAbleMembers.length > 1) {
            const nameList = [];
            const targetList = [];
            for (const member of enemyPartyAbleMembers) {
                nameList.push(member.desc.short);
                targetList.push(() => {
                    targetCallback(character, member);
                });
            }
            TargetSelectMenu.displayText();
            MainScreen.displayChoices(nameList, targetList);
        }
        else {
            targetCallback(character, enemyPartyAbleMembers[0]);
        }
    }

    private static displayText() {
        DisplayText("Select your target");
    }
}
