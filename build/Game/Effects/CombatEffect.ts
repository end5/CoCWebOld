import { CombatAbilityFlag } from './CombatAbilityFlag';
import { CombatEffectType } from './CombatEffectType';
import { Effect, EffectSaveObject } from './Effect';
import { EffectDescription } from './EffectDescription';
import { Character } from '../Character/Character';

export interface CombatEffectSaveObject extends EffectSaveObject<CombatEffectType> {
    inflictedByCharId: number;
    effect: EffectSaveObject<CombatEffectType>;
}

export class CombatEffect extends Effect<CombatEffectType, EffectDescription> {
    public readonly abilityFlag: CombatAbilityFlag;
    public readonly inflictedBy: Character;

    public constructor(
        type: CombatEffectType,
        value1: number = 0,
        value2: number = 0,
        value3: number = 0,
        value4: number = 0,
        abilityFlag: CombatAbilityFlag = CombatAbilityFlag.All,
        inflictedBy?: Character
    ) {
        super(type, new EffectDescription(type, type, ""), value1, value2, value3, value4);
        this.abilityFlag = abilityFlag;
        this.inflictedBy = inflictedBy;
    }

    public onAdd(character: Character): void { }
    public update(character: Character, ...enemy: Character[]): void { }
    public onRemove(character: Character): void { }
}
