import Character from '../Character/Character';

export default interface ActionRespond {
    enemyAttack();
    enemyTease(damage: number, enemy: Character);
    enemyUseItem();
    enemyPhysicalAttack();
    enemyMagicalAttack();

    enemyDodge();
    enemyRun();

    feared();
    stunned();
    constricted();
    blinded();
}
