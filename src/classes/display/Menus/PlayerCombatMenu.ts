import Menu from './Menu';
import TargetSelectMenu from './TargetSelectMenu';
import Character from '../../Character/Character';
import CombatAction from '../../Combat/Actions/CombatAction';
import { CombatAbilityFlag } from '../../Effects/CombatAbilityFlag';
import Flags, { FlagEnum } from '../../Game/Flags';
import Game from '../../Game/Game';
import Player from '../../Player/Player';
import DisplayText from '../DisplayText';
import MainScreen, { TopButton } from '../MainScreen';

export default class PlayerCombatMenu implements Menu {
    public display(player: Player) {
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
        const performActions = player.combat.perform;
        this.showAction(MAIN_ACTION, player, performActions.mainAction, CombatAbilityFlag.MainAction);
        this.showAction(TEASE, player, performActions.tease, CombatAbilityFlag.Tease);
        this.showAction(SPELLS, player, performActions.spells, CombatAbilityFlag.Spells);
        this.showAction(ITEMS, player, performActions.items, CombatAbilityFlag.Items);
        this.showAction(MOVE_AWAY, player, performActions.moveAway, CombatAbilityFlag.MoveAway);
        this.showAction(PHYS_SPEC, player, performActions.physicalSpecials, CombatAbilityFlag.PhysSpec);
        this.showAction(MAGIC_SPEC, player, performActions.magicalSpecials, CombatAbilityFlag.MagicSpec);
        this.showAction(WAIT, player, performActions.wait, CombatAbilityFlag.Wait);
        this.showAction(FANTASIZE, player, performActions.fantasize, CombatAbilityFlag.Fantasize);
        // this.showAction(INSPECT, player, performActions.inspect, CombatAbilityFlag.None);
    }

    private showAction(button: number, player: Player, action: CombatAction, flag: CombatAbilityFlag) {
        if (player.combat.effects.combatAbilityFlag & flag) {
            if (action.isPossible(player))
                MainScreen.getBottomButton(button).modify(action.name, () => {
                    action.use(player);
                });
            else {
                MainScreen.getBottomButton(button).modify(action.name, null, true);
            }
        }
    }
}
