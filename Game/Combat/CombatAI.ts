import { ICombatAction } from './Actions/ICombatAction';
import { CombatManager, getEnemies } from './CombatManager';
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
    if (CombatManager.encounter && action && (character.combat.effects.combatAbilityFlag & action.flags) && action.isPossible(character)) {
        const enemies = getEnemies(CombatManager.encounter, character);
        for (const enemy of enemies.ableMembers) {
            if (action.canUse(character, enemy)) {
                actions.push(() => {
                    const useResult = action.use(character, enemy);
                    if (useResult)
                        return useResult;
                    else if (CombatManager.encounter)
                        return CombatManager.encounter.performRound();
                    throw new Error('Not in combat but still in combat');
                });
            }
        }
    }
}
