import SpecialAction from './SpecialAction';

export default interface CombatActions {
    attack(): number;
    tease();
    spells();
    useItem();
    run(success: boolean);
    physicalAttacks(): SpecialAction[];
    magicAttacks(): SpecialAction[];
    wait();
    fantasize();
}