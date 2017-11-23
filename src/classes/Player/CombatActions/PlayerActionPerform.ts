import PlayerCombatAction from './PlayerCombatAction';
import ActionPerform from '../../Combat/ActionPerform';

export default interface PlayerActionPerform extends ActionPerform {
    attack(): PlayerCombatAction;
    struggle(): PlayerCombatAction;
    approach(): PlayerCombatAction;
    tease(): PlayerCombatAction;
    useItem(): PlayerCombatAction;

    spells(): PlayerCombatAction[];
    run(): PlayerCombatAction;
    physicalAttacks(): PlayerCombatAction[];
    magicAttacks(): PlayerCombatAction[];
    wait(): PlayerCombatAction;
    fantasize(): PlayerCombatAction; 
}
