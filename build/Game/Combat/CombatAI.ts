import { CombatAction } from './Actions/CombatAction';
import { CombatManager } from './CombatManager';
import { randInt } from '../../Engine/Utilities/SMath';
import { Character } from '../Character/Character';
import { CombatAbilityFlag } from '../Effects/CombatAbilityFlag';
import { NextScreenChoices } from '../SceneDisplay';

export function performActionAI(character: Character): NextScreenChoices {
    const actions: (() => NextScreenChoices)[] = [];

    const performActions = character.combat.perform;
    canPerformAction(actions, character, performActions.mainAction, CombatAbilityFlag.MainAction);
    canPerformAction(actions, character, performActions.tease, CombatAbilityFlag.Tease);
    canPerformAction(actions, character, performActions.spells, CombatAbilityFlag.Spells);
    canPerformAction(actions, character, performActions.items, CombatAbilityFlag.Items);
    canPerformAction(actions, character, performActions.moveAway, CombatAbilityFlag.MoveAway);
    canPerformAction(actions, character, performActions.physicalSpecials, CombatAbilityFlag.PhysSpec);
    canPerformAction(actions, character, performActions.magicalSpecials, CombatAbilityFlag.MagicSpec);
    canPerformAction(actions, character, performActions.wait, CombatAbilityFlag.Wait);
    canPerformAction(actions, character, performActions.fantasize, CombatAbilityFlag.Fantasize);

    return (actions[randInt(actions.length)])();
}

function canPerformAction(actions: (() => void)[], character: Character, action: CombatAction, flag: CombatAbilityFlag) {
    if (character.combat.effects.combatAbilityFlag & flag && action && action.isPossible(character)) {
        const enemies = CombatManager.getEnemyParty(character);
        for (const enemy of enemies.ableMembers) {
            if (action.canUse(character, enemy)) {
                actions.push(() => action.use(character, enemy));
            }
        }
    }
}
