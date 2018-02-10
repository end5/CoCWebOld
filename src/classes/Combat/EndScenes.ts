import CharacterHolder from './CharacterHolder';
import { DefeatType } from './DefeatEvent';
import Character from '../Character/Character';
import { Utils } from '../Utilities/Utils';

export default abstract class EndScenes extends CharacterHolder {
    /**
     * The default number of hours that pass when losing a fight.
     */
    public static defaultLostFightHours = 8;

    /**
     * Used to determine if enemy has escaped.
     * @param enemy The enemy character.
     */
    public abstract hasEscaped(enemy: Character): boolean;

    /**
     * Used to handle special kinds of victory conditions. (ie Basilisk, Sandtrap)
     * @param enemy The enemy character.
     */
    public abstract hasDefeated(enemy: Character): boolean;

    /**
     * Calls when this cahracter defeats an enemy in battle.
     * @param howYouWon How this character defeated to the enemy.
     * @param enemy The enemy character.
     */
    public abstract claimsVictory(howYouWon: DefeatType, enemy: Character): void;

    /**
     * Calls when this character is defeated in battle.
     * @param howYouLost How this character lost to the enemy.
     * @param enemy The enemy character.
     */
    public abstract criesInDefeat(howYouLost: DefeatType, enemy: Character): void;

    /**
     * Triggered before the enemy's victory scene or this character's defeat scene.
     * Used for any logic that needs to be done before the enemy's victory scene or this character's defeat scene. (ie. worm infest)
     * @param howYouLost How this character lost to the enemy.
     * @param enemy The enemy character.
     */
    protected abstract beforeEndingScene(howYouLost: DefeatType, enemy: Character): void;

    /** Used to determine if this character has a victory scene. */
    public abstract readonly hasVictoryScene: boolean;
    /**
     * Calls after combat is over. Displays this character's victory scene.
     * @param howYouWon How this character defeated the enemy.
     * @param enemy The enemy character.
     */
    protected abstract victoryScene(howYouWon: DefeatType, enemy: Character): void;

    /** Used to determine if this character has a defeat scene. */
    public abstract readonly hasDefeatScene: boolean;
    /**
     * Calls after combat is over. Displays this character's defeat scene.
     * @param howYouLost How this character lost to the enemy.
     * @param enemy The enemy character.
     */
    protected abstract defeatScene(howYouLost: DefeatType, enemy: Character): void;

    /**
     * Displays victory scene.
     * If this character has a victory scene and the enemy has a defeat scene, it will random between the scenes.
     * @param howYouWon How this character defeated the enemy.
     * @param enemy The enemy character.
     */
    public victory(howYouWon: DefeatType, enemy: Character): void {
        enemy.combat.endScenes.beforeEndingScene(howYouWon, this.char);
        if (this.hasVictoryScene && enemy.combat.endScenes.hasDefeatScene) {
            if (Utils.rand(2) === 0) {
                this.victoryScene(howYouWon, enemy);
            }
            else {
                enemy.combat.endScenes.defeatScene(howYouWon, this.char);
            }
        }
        else if (this.victoryScene) {
            this.victoryScene(howYouWon, enemy);
        }
        else if (enemy.combat.endScenes.defeatScene) {
            enemy.combat.endScenes.defeatScene(howYouWon, this.char);
        }
    }

    /**
     * Used if you want to describe something happening after enemy victory.
     * @param howYouLost How this character lost to the enemy.
     * @param enemy The enemy character.
     */
    public abstract defeatAftermath(howYouLost: DefeatType, enemy: Character): void;

    /**
     * Used if you want to describe something happening after enemy defeat.
     * @param howYouWon How this character defeated to the enemy.
     * @param enemy The enemy character.
     */
    public abstract victoryAftermath(howYouWon: DefeatType, enemy: Character): void;
}
