import PerformActions from './PerformActions';
import ActionPerform from '../../Combat/ActionPerform';
import CombatAction from '../../Combat/Actions/CombatAction';
import { StatusAffectType } from '../../Effects/StatusAffectType';
import Player from '../Player';

export default class PlayerActionPerform implements ActionPerform {
    public mainAction: CombatAction = new PerformActions.MainAction();
    public approach: CombatAction = new PerformActions.Approach();
    public recover: CombatAction = new PerformActions.Recover();
    public squeeze: CombatAction = new PerformActions.Squeeze();
    public struggle: CombatAction = new PerformActions.Struggle();
    public attack: CombatAction = new PerformActions.Attack();
    public tease: CombatAction = new PerformActions.Tease();
    public spells: CombatAction = new PerformActions.Spells();
    public items: CombatAction = new PerformActions.Items();
    public moveAway: CombatAction = new PerformActions.MoveAway();
    public climb: CombatAction = new PerformActions.Climb();
    public release: CombatAction = new PerformActions.Release();
    public run: CombatAction = new PerformActions.Run();
    public physicalSpecials: CombatAction = new PerformActions.PhysicalSpecials();
    public magicalSpecials: CombatAction = new PerformActions.MagicalSpecials();
    public wait: CombatAction = new PerformActions.Wait();
    public fantasize: CombatAction = new PerformActions.Fantasize();
    public inspect: CombatAction = null;
}
