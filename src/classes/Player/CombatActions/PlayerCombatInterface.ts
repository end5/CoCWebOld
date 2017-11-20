import LearnedSpellAction from './LearnedSpellAction';
import Character from '../../Character/Character';
import Player from '../../Player/Player';
import CombatInterface from '../CombatInterface';
import PlayerCombatAction from ../Player/PlayerCombatAction';

export default interface PlayerCombatInterface extends CombatInterface {
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
