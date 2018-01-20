import { CombatAbilityFlag } from './CombatAbilityFlag';
import CombatEffect from './CombatEffect';
import CombatEffects from './CombatEffects';
import { CombatEffectType } from './CombatEffectType';
import Character from '../Character/Character';
import Game from '../Game/Game';
import Dictionary from '../Utilities/Dictionary';

interface CombatEffectConstructor {
    new(type: CombatEffectType,
        value1: number,
        value2: number,
        value3: number,
        value4: number,
        inabilityFlag: CombatAbilityFlag,
        inflictedBy: Character
    ): CombatEffect;
}

class CombatEffectConstructorLib extends Dictionary<CombatEffectConstructor> {
    public constructor() {
        super();
        this.set(CombatEffectType.AcidSlap, CombatEffects.AcidSlap);
        this.set(CombatEffectType.AkbalSpeed, CombatEffects.AkbalSpeed);
        this.set(CombatEffectType.AmilyVenom, CombatEffects.AmilyVenom);
        this.set(CombatEffectType.AnemoneVenom, CombatEffects.AnemoneVenom);
        this.set(CombatEffectType.BasiliskCompulsion, CombatEffects.BasiliskCompulsion);
        this.set(CombatEffectType.BasiliskSlow, CombatEffects.BasiliskSlow);
        this.set(CombatEffectType.Blind, CombatEffects.Blind);
        this.set(CombatEffectType.Bound, CombatEffects.Bound);
        this.set(CombatEffectType.CalledShot, CombatEffects.CalledShot);
        this.set(CombatEffectType.CoonWhip, CombatEffects.CoonWhip);
        this.set(CombatEffectType.DemonSeed, CombatEffects.DemonSeed);
        this.set(CombatEffectType.Disarmed, CombatEffects.Disarmed);
        this.set(CombatEffectType.DriderKiss, CombatEffects.DriderKiss);
        this.set(CombatEffectType.Earthshield, CombatEffects.Earthshield);
        this.set(CombatEffectType.GardenerSapSpeed, CombatEffects.GardenerSapSpeed);
        this.set(CombatEffectType.GnollSpear, CombatEffects.GnollSpear);
        this.set(CombatEffectType.GooArmorBind, CombatEffects.GooArmorBind);
        this.set(CombatEffectType.GooArmorSilence, CombatEffects.GooArmorSilence);
        this.set(CombatEffectType.HarpyBind, CombatEffects.HarpyBind);
        this.set(CombatEffectType.Heat, CombatEffects.Heat);
        this.set(CombatEffectType.HolliConstrict, CombatEffects.HolliConstrict);
        this.set(CombatEffectType.IzmaBleed, CombatEffects.IzmaBleed);
        this.set(CombatEffectType.KissOfDeath, CombatEffects.KissOfDeath);
        this.set(CombatEffectType.LustAura, CombatEffects.LustAura);
        this.set(CombatEffectType.LustStick, CombatEffects.LustStick);
        this.set(CombatEffectType.LustStones, CombatEffects.LustStones);
        this.set(CombatEffectType.Might, CombatEffects.Might);
        this.set(CombatEffectType.MilkyUrta, CombatEffects.MilkyUrta);
        this.set(CombatEffectType.NagaBind, CombatEffects.NagaBind);
        this.set(CombatEffectType.NagaVenom, CombatEffects.NagaVenom);
        this.set(CombatEffectType.PCTailTangle, CombatEffects.PCTailTangle);
        this.set(CombatEffectType.ParalyzeVenom, CombatEffects.ParalyzeVenom);
        this.set(CombatEffectType.Poison, CombatEffects.Poison);
        this.set(CombatEffectType.QueenBind, CombatEffects.QueenBind);
        this.set(CombatEffectType.Rut, CombatEffects.Rut);
        this.set(CombatEffectType.Sandstorm, CombatEffects.Sandstorm);
        this.set(CombatEffectType.Sealed, CombatEffects.Sealed);
        this.set(CombatEffectType.Shell, CombatEffects.Shell);
        this.set(CombatEffectType.StoneLust, CombatEffects.StoneLust);
        this.set(CombatEffectType.Stunned, CombatEffects.Stunned);
        this.set(CombatEffectType.SuccubusAura, CombatEffects.SuccubusAura);
        this.set(CombatEffectType.TemporaryHeat, CombatEffects.TemporaryHeat);
        this.set(CombatEffectType.TentacleBind, CombatEffects.TentacleBind);
        this.set(CombatEffectType.TentacleCoolDown, CombatEffects.TentacleCoolDown);
        this.set(CombatEffectType.ThroatPunch, CombatEffects.ThroatPunch);
        this.set(CombatEffectType.Timer, CombatEffects.Timer);
        this.set(CombatEffectType.UBERWEB, CombatEffects.UBERWEB);
        this.set(CombatEffectType.Web, CombatEffects.Web);
        this.set(CombatEffectType.WebSilence, CombatEffects.WebSilence);

        // Perks
        this.set(CombatEffectType.ArousingAura, CombatEffects.ArousingAura);
    }
}

class AbilityFlagsLib extends Dictionary<CombatAbilityFlag> {
    public constructor() {
        super();
        this.set(CombatEffectType.IsabellaStunned, CombatAbilityFlag.MainAction);
        this.set(CombatEffectType.Stunned, CombatAbilityFlag.MainAction);
        this.set(CombatEffectType.Whispered, CombatAbilityFlag.MainAction);
        this.set(CombatEffectType.Confusion, CombatAbilityFlag.MainAction);
        this.set(CombatEffectType.HarpyBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.set(CombatEffectType.GooBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.set(CombatEffectType.TentacleBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.set(CombatEffectType.NagaBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.set(CombatEffectType.QueenBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.set(CombatEffectType.PCTailTangle, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.set(CombatEffectType.HolliConstrict, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.set(CombatEffectType.GooArmorBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.set(CombatEffectType.Constricted, CombatAbilityFlag.MainAction | CombatAbilityFlag.Tease | CombatAbilityFlag.MoveAway);
        this.set(CombatEffectType.Bound, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.set(CombatEffectType.MinotaurEntangled, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.set(CombatEffectType.UBERWEB, CombatAbilityFlag.MainAction | CombatAbilityFlag.MagicSpec);
        this.set(CombatEffectType.Chokeslam, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.set(CombatEffectType.Titsmother, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.set(CombatEffectType.Tentagrappled, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
    }
}

export default class CombatEffectFactory {
    private static lib: CombatEffectConstructorLib;
    private static flagslib: AbilityFlagsLib;

    public constructor() {
        if (!CombatEffectFactory.lib)
            CombatEffectFactory.lib = new CombatEffectConstructorLib();
        if (!CombatEffectFactory.flagslib)
            CombatEffectFactory.flagslib = new AbilityFlagsLib();
    }

    public static create(type: CombatEffectType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0, inflictedBy: Character = null): CombatEffect {
        const abilityFlag = CombatEffectFactory.flagslib.has(type) ? CombatAbilityFlag.All : CombatEffectFactory.flagslib[type];
        if (CombatEffectFactory.lib.has(type)) {
            return new (CombatEffectFactory.lib.get(type))(type, value1, value2, value3, value4, abilityFlag, inflictedBy);
        }
        return new CombatEffect(type, value1, value2, value3, value4, abilityFlag, inflictedBy);
    }

    public static copy(combatEffect: CombatEffect): CombatEffect {
        return CombatEffectFactory.create(combatEffect.type, combatEffect.value1, combatEffect.value2, combatEffect.value3, combatEffect.value4, combatEffect.inflictedBy);
    }
}