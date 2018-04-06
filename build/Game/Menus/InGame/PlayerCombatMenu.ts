import MainScreen from '../../../Engine/Display/MainScreen';
import Character from '../../Character/Character';
import CombatAction from '../../Combat/Actions/CombatAction';
import { CombatAbilityFlag } from '../../Effects/CombatAbilityFlag';

export default function display(character: Character) {
    const MAIN_ACTION = 0;
    const TEASE = 1;
    const SPELLS = 2;
    const ITEMS = 3;
    const MOVE_AWAY = 4;
    const PHYS_SPEC = 5;
    const MAGIC_SPEC = 6;
    const WAIT = 7;
    const FANTASIZE = 8;
    const INSPECT = 9;
    const performActions = character.combat.perform;
    this.showAction(MAIN_ACTION, character, performActions.mainAction, CombatAbilityFlag.MainAction);
    this.showAction(TEASE, character, performActions.tease, CombatAbilityFlag.Tease);
    this.showAction(SPELLS, character, performActions.spells, CombatAbilityFlag.Spells);
    this.showAction(ITEMS, character, performActions.items, CombatAbilityFlag.Items);
    this.showAction(MOVE_AWAY, character, performActions.moveAway, CombatAbilityFlag.MoveAway);
    this.showAction(PHYS_SPEC, character, performActions.physicalSpecials, CombatAbilityFlag.PhysSpec);
    this.showAction(MAGIC_SPEC, character, performActions.magicalSpecials, CombatAbilityFlag.MagicSpec);
    this.showAction(WAIT, character, performActions.wait, CombatAbilityFlag.Wait);
    this.showAction(FANTASIZE, character, performActions.fantasize, CombatAbilityFlag.Fantasize);
    // this.showAction(INSPECT, character, performActions.inspect, CombatAbilityFlag.None);
}

function showAction(button: number, character: Character, action: CombatAction, flag: CombatAbilityFlag) {
    if (character.combat.effects.combatAbilityFlag & flag) {
        if (action.isPossible(character))
            MainScreen.getBottomButton(button).modify(action.name, () => {
                action.use(character);
            });
        else {
            MainScreen.getBottomButton(button).modify(action.name, null, true);
        }
    }
}
