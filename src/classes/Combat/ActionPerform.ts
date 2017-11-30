import CombatAction from './Actions/CombatAction';

export default interface ActionPerform {
    mainAction: CombatAction;
    approach: CombatAction;
    recover: CombatAction;
    squeeze: CombatAction;
    struggle: CombatAction;
    attack: CombatAction;

    tease: CombatAction;
    spells: CombatAction;
    items: CombatAction;

    moveAway: CombatAction;
    climb: CombatAction;
    release: CombatAction;
    run: CombatAction;

    physicalSpecials: CombatAction;
    magicalSpecials: CombatAction;
    wait: CombatAction;
    fantasize: CombatAction;
    inspect: CombatAction;
}

/* 
    Old Menu Choice Locations
    0 - Approach, Recover, Struggle, Squeeze, Attack
    1 - Tease
    2 - Spells
    3 - Items
    4 - Run, Release
    5 - Bow, Wait, P. Specials
    6 - M. Specials
    7 - Climb, Wait
    8 - Fantasize
    9 - Inspect
*/

/*
    New Menu Choice Locations
    0 - Main Action
    1 - Tease
    2 - Spells
    3 - Items
    4 - Move Away - Climb, Run, Release
    5 - P. Specials - Bow here
    6 - M. Specials
    7 - Wait
    8 - Fantasize
    9 - Inspect
*/