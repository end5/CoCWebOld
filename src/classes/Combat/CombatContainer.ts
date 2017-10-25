import { CombatEndEventFunction, CombatEndType } from './CombatEnd';
import Character from '../Character/Character';
import { CharacterType } from '../Character/CharacterType';
import MainScreen from '../display/MainScreen';
import Flags, { FlagEnum } from '../Game/Flags';

export default abstract class CombatContainer {
    public bonusHP: number = 0;
    
    public imageName: string = "";

    private _drop: ChainedDrop = new ChainedDrop();
    public get drop(): ChainedDrop { return this._drop; }
    public set drop(value: ChainedDrop): void {
        this._drop = value;
    }

    protected char: Character;

    public constructor(character: Character) {
        this.char = character;
    }

	public get HP(): number {
		return this.char.stats.HP + this.bonusHP;
	}

	public gainHP(value: number, source: Character): number {
		const oldHP = this.char.stats.HP;
		this.char.stats.HP += value;
		return oldHP - this.char.stats.HP;
	}

	public loseHP(value: number, source: Character): number {
		if (source) {
			//Isabella gets mad
			if (this.char.charType == CharacterType.Isabella && source.charType == CharacterType.Player) {
				Flags.list[FlagEnum.ISABELLA_AFFECTION]--;
				//Keep in bounds
				if (Flags.list[FlagEnum.ISABELLA_AFFECTION] < 0)
					Flags.list[FlagEnum.ISABELLA_AFFECTION] = 0;
			}
		}
		//Interrupt gigaflare if necessary.
		if (this.char.statusAffects.has("Gigafire"))
        this.char.statusAffects.get("Gigafire").value1 += value;
		const oldHP = this.char.stats.HP;
		this.char.stats.HP -= value;
		return oldHP - this.char.stats.HP;
	}

    public onPcRunAttempt: Function = null;
    
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
     * Called before the enemy onVictory function call.
     * @param winType 
     * @param enemy 
     */
    protected abstract onEnemyVictory(winType: CombatEndType, enemy: Character): void;
    
    /**
     * Calls after combat is over. Used for displaying defeated text.
     * @param loseType 
     * @param enemy 
     */
    protected abstract onVictory(loseType: CombatEndType, enemy: Character): void;

    public victory(loseType: CombatEndType, enemy: Character): void {
        enemy.combat.onEnemyVictory(loseType, this.char);
        this.onVictory(loseType, enemy);
    }
    
    /**
     * Used if you want to describe something happening after enemy victory.
     * @param loseType 
     * @param enemy 
     */
    public abstract defeatAftermath(loseType: CombatEndType, enemy: Character): void;

    public abstract victoryAftermath(loseType: CombatEndType, enemy: Character): void;
}