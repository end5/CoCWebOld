import PerformActions from './PerformActions';
import ActionPerform from '../../Combat/ActionPerform';
import CombatAction from '../../Combat/Actions/CombatAction';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../Player';

export function hasSpells(player: Player): boolean {
    return spellCount(player) > 0;
}

export function spellCount(player: Player): number {
    return [StatusAffectType.KnowsArouse,
        StatusAffectType.KnowsHeal,
        StatusAffectType.KnowsMight,
        StatusAffectType.KnowsCharge,
        StatusAffectType.KnowsBlind,
        StatusAffectType.KnowsWhitefire]
        .filter((name: StatusAffectType) => {
            return player.statusAffects.has(name);
        })
        .length;
}

export default class PlayerActionPerform implements ActionPerform {
    mainAction: CombatAction = new PerformActions.MainAction();
    approach: CombatAction = new PerformActions.Approach();
    recover: CombatAction = new PerformActions.Recover();
    squeeze: CombatAction = new PerformActions.Squeeze();
    struggle: CombatAction = new PerformActions.Struggle();
    attack: CombatAction = new PerformActions.Attack();
    tease: CombatAction = new PerformActions.Tease();
    spells: CombatAction = new PerformActions.Spells();
    items: CombatAction = new PerformActions.Items();
    moveAway: CombatAction = new PerformActions.MoveAway();
    climb: CombatAction = new PerformActions.Climb();
    release: CombatAction = new PerformActions.Release();
    run: CombatAction = new PerformActions.Run();
    physicalSpecials: CombatAction = new PerformActions.PhysicalSpecials();
    magicalSpecials: CombatAction = new PerformActions.MagicalSpecials();
    wait: CombatAction = new PerformActions.Wait();
    fantasize: CombatAction = new PerformActions.Fantasize();
    inspect: CombatAction = null;
}