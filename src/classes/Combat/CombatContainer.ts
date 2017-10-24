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
     * @param target 
     */
    public abstract hasDefeated(target: Character): boolean;

    /**
     * Calls when target character HP reaches zero during battle.
     * @param winType 
     * @param target 
     */
    public abstract claimsVictory(winType: CombatEndType, target: Character): void;
    
    /**
     * Calls after combat is over. Used for displaying defeated text.
     * @param loseType 
     * @param target 
     */
    public abstract defeated(loseType: CombatEndType, target: Character): void;

    /**
     * Used if you want to describe something happening after enemy victory.
     * @param loseType 
     * @param target 
     */
    public abstract defeatAftermath(loseType: CombatEndType, target: Character): void;
}