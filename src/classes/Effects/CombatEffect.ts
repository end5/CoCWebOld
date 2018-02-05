import { CombatAbilityFlag } from './CombatAbilityFlag';
import { CombatEffectType } from './CombatEffectType';
import Effect, { EffectSaveObject } from './Effect';
import EffectDescription from './EffectDescription';
import Character from '../Character/Character';
import Party from '../Combat/Party';
import Game from '../Game/Game';

export interface CombatEffectSaveObject extends EffectSaveObject<CombatEffectType> {
    inflictedByCharId: number;
    effect: EffectSaveObject<CombatEffectType>;
}

export default class CombatEffect extends Effect<CombatEffectType, EffectDescription> {
    public readonly abilityFlag: CombatAbilityFlag;
    private inflictedByChar: Character;
    private inflictedByCharId: number;

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
        this.inflictedByChar = inflictedBy;
        this.inflictedByCharId = inflictedBy.charID;
    }

    public get inflictedBy(): Character {
        if (this.inflictedByCharId !== 0 && this.inflictedByChar === undefined) {
            this.inflictedByChar = Game.npcs.get(this.inflictedByCharId);
        }
        return this.inflictedByChar;
    }

    public onAdd(character: Character): void { }
    public update(character: Character, ...enemy: Character[]): void { }
    public onRemove(character: Character): void { }

    public serialize(): string {
        return JSON.stringify({
            inflictedByCharId: this.inflictedByCharId,
            effect: super.serialize()
        });
    }

    public deserialize(saveObject: CombatEffectSaveObject) {
        this.inflictedByCharId = saveObject.inflictedByCharId;
        super.deserialize(saveObject.effect);
    }
}
