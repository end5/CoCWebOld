import { CombatAbilityFlag } from './CombatAbilityFlag';
import { CombatEffect } from './CombatEffect';
import { CombatEffectType } from './CombatEffectType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';
import { Character } from '../Character/Character';
import { Blind } from './CombatEffects/Blind';
import { Disarmed } from './CombatEffects/Disarmed';
import { Heat } from './CombatEffects/Heat';
import { KissOfDeath } from './CombatEffects/KissOfDeath';
import { LustAura } from './CombatEffects/LustAura';
import { Poison } from './CombatEffects/Poison';
import { Rut } from './CombatEffects/Rut';
import { Stunned } from './CombatEffects/Stunned';
import { Might } from './CombatEffects/Might';
import { IEffectValues } from './EffectValues';

interface CombatEffectConstructor {
    new(type: CombatEffectType,
        inabilityFlag: CombatAbilityFlag,
        inflictedBy: Character,
        values?: IEffectValues
    ): CombatEffect;
}
export const CombatEffectConstructorLib = new Dictionary<CombatEffectType, CombatEffectConstructor>();
CombatEffectConstructorLib.set(CombatEffectType.Blind, Blind);
CombatEffectConstructorLib.set(CombatEffectType.Disarmed, Disarmed);
CombatEffectConstructorLib.set(CombatEffectType.Heat, Heat);
CombatEffectConstructorLib.set(CombatEffectType.KissOfDeath, KissOfDeath);
CombatEffectConstructorLib.set(CombatEffectType.LustAura, LustAura);
CombatEffectConstructorLib.set(CombatEffectType.Might, Might);
CombatEffectConstructorLib.set(CombatEffectType.Poison, Poison);
CombatEffectConstructorLib.set(CombatEffectType.Rut, Rut);
CombatEffectConstructorLib.set(CombatEffectType.Stunned, Stunned);

export const AbilityFlagsLib = new Dictionary<CombatEffectType, CombatAbilityFlag>();
AbilityFlagsLib.set(CombatEffectType.IsabellaStunned, CombatAbilityFlag.MainAction);
AbilityFlagsLib.set(CombatEffectType.Stunned, CombatAbilityFlag.MainAction);
AbilityFlagsLib.set(CombatEffectType.Whispered, CombatAbilityFlag.MainAction);
AbilityFlagsLib.set(CombatEffectType.Confusion, CombatAbilityFlag.MainAction);
AbilityFlagsLib.set(CombatEffectType.HarpyBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
AbilityFlagsLib.set(CombatEffectType.GooBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
AbilityFlagsLib.set(CombatEffectType.TentacleBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
AbilityFlagsLib.set(CombatEffectType.NagaBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
AbilityFlagsLib.set(CombatEffectType.QueenBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
AbilityFlagsLib.set(CombatEffectType.PCTailTangle, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
AbilityFlagsLib.set(CombatEffectType.HolliConstrict, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
AbilityFlagsLib.set(CombatEffectType.GooArmorBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
AbilityFlagsLib.set(CombatEffectType.Constricted, CombatAbilityFlag.MainAction | CombatAbilityFlag.Tease | CombatAbilityFlag.MoveAway);
AbilityFlagsLib.set(CombatEffectType.Bound, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
AbilityFlagsLib.set(CombatEffectType.MinotaurEntangled, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
AbilityFlagsLib.set(CombatEffectType.UBERWEB, CombatAbilityFlag.MainAction | CombatAbilityFlag.MagicSpec);
AbilityFlagsLib.set(CombatEffectType.Chokeslam, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
AbilityFlagsLib.set(CombatEffectType.Titsmother, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
AbilityFlagsLib.set(CombatEffectType.Tentagrappled, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
