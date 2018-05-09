import { Character } from '../Character/Character';

export interface ActionRespond {
    enemyAttack();
    enemyTease(damage: number, self: Character, enemy: Character);
    enemyUseItem();
    enemyPhysicalAttack();
    enemyMagicalAttack();

    enemyDodge();
    enemyRun();

    attacked(damage: number, crit: boolean, self: Character, enemy: Character);
    didNoDamage(self: Character, enemy: Character);
    didDamage(damage: number, crit: boolean, self: Character, enemy: Character);

    feared();
    stunned();
    constricted();
    blinded();
}
