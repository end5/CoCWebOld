import CharacterHolder from './CharacterHolder';
import Character from '../Character/Character';
import { CharacterType } from '../Character/CharacterType';
import { StatusAffectType } from '../Effects/StatusAffectType';
import Flags, { FlagEnum } from '../Game/Flags';

export default class CombatHP extends CharacterHolder {
    private bonusHP: number = 0;
    public constructor(character: Character, bonusHP: number = 0) {
        super(character);
        this.bonusHP = bonusHP;
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
		if (this.char.statusAffects.has(StatusAffectType.Gigafire))
        this.char.statusAffects.get(StatusAffectType.Gigafire).value1 += value;
		const oldHP = this.char.stats.HP;
		this.char.stats.HP -= value;
		return oldHP - this.char.stats.HP;
    }
    
    public HPRatio(): number {
        return this.char.stats.HP / this.maxHP();
    }

    public maxHP(): number {
        return this.char.stats.maxHP() + this.bonusHP;
    }
}