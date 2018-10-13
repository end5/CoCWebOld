import { ICombatAction } from './Actions/ICombatAction';
import { CombatManager } from './CombatManager';
import { randInt } from '../../Engine/Utilities/SMath';
import { Character } from '../Character/Character';
import { NextScreenChoices } from '../ScreenDisplay';

export function performActionAI(character: Character): NextScreenChoices {
    const actions: (() => NextScreenChoices)[] = [];

    for (const action of character.combat.action.actions) {
        canPerformAction(actions, character, action);
    }

    return (actions[randInt(actions.length)])();
}

function canPerformAction(actions: (() => NextScreenChoices)[], character: Character, action: ICombatAction) {
    if (action && (character.combat.effects.combatAbilityFlag & action.flags) && action.isPossible(character)) {
        const enemies = CombatManager.getEnemyParty(character);
        for (const enemy of enemies.ableMembers) {
            if (action.canUse(character, enemy)) {
                actions.push(() => {
                    const useResult = action.use(character, enemy);
                    if (useResult)
                        return useResult;
                    else
                        return CombatManager.encounter.performRound();
                });
            }
        }
    }
}
