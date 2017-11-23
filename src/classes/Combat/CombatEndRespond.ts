import CharacterHolder from './CharacterHolder';
import { CombatEndType } from './CombatManager';
import Character from '../Character/Character';

export default abstract class CombatEndRespond extends CharacterHolder {

    /**
     * The default number of hours that pass when losing a fight.
     */
    public static defaultLostFightHours = 8;

    /**
     * Used to determine if enemy has escaped.
     * @param enemy 
     */
    public abstract hasEscaped(enemy: Character): boolean;

    /**
     * Used to handle special kinds of victory conditions. (ie Basilisk, Sandtrap)
     * @param enemy 
     */
    public abstract hasDefeated(enemy: Character): boolean;

    /**
     * Calls when enemy character HP reaches zero during battle.
     * @param winType 
     * @param enemy 
     */
    public abstract claimsVictory(winType: CombatEndType, enemy: Character): void;

    /**
     * Called before the enemy victory scene function call. Used for any logic that needs to be done before
     * enemy victory scene. (ie. worm infest)
     * @param winType 
     * @param enemy 
     */
    protected abstract beforeEnemyVictoryScene(winType: CombatEndType, enemy: Character): void;

    /**
     * Calls after combat is over. Used for displaying victory text.
     * @param loseType 
     * @param enemy 
     */
    protected abstract victoryScene(loseType: CombatEndType, enemy: Character): void;

    public victory(loseType: CombatEndType, enemy: Character): void {
        enemy.combat.end.beforeEnemyVictoryScene(loseType, this.char);
        this.victoryScene(loseType, enemy);
    }

    /**
     * Used if you want to describe something happening after enemy victory.
     * @param loseType 
     * @param enemy 
     */
    public abstract defeatAftermath(loseType: CombatEndType, enemy: Character): void;

    public abstract victoryAftermath(loseType: CombatEndType, enemy: Character): void;

}