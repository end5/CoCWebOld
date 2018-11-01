import { Character } from '../Character/Character';
import { Item } from '../Items/Item';

export interface IActionRespond {
    enemyAttack?(): void;
    enemyTease?(damage: number, self: Character, enemy: Character): void;
    enemyUseItem?(): void;
    enemyPhysicalAttack?(): void;
    enemyMagicalAttack?(): void;

    enemyDodge?(): void;
    enemyRun?(): void;

    attacked?(damage: number, crit: boolean, self: Character, enemy: Character): void;
    didNoDamage?(self: Character, enemy: Character): void;
    didDamage?(damage: number, crit: boolean, self: Character, enemy: Character): void;

    feared?(): void;
    stunned?(): void;
    constricted?(): void;
    blinded?(): void;

    onReward(): void;
    onRewardItem(item: Item): void;
    onRewardGems(gems: number): void;
}