import { CombatAbilityFlag } from './CombatAbilityFlag';
import CombatEffect from './CombatEffect';
import CombatEffects from './CombatEffects';
import { CombatEffectType } from './CombatEffectType';
import Character from '../Character/Character';
import Game from '../Game/Game';
import ConstructorLibrary from '../Utilities/ConstructorLibrary';
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

class CombatEffectConstructorLib extends ConstructorLibrary<CombatEffectConstructor> {
    public constructor() {
        super();
        this.add(CombatEffectType.AcidSlap, CombatEffects.AcidSlap);
        this.add(CombatEffectType.AkbalSpeed, CombatEffects.AkbalSpeed);
        this.add(CombatEffectType.AmilyVenom, CombatEffects.AmilyVenom);
        this.add(CombatEffectType.AnemoneVenom, CombatEffects.AnemoneVenom);
        this.add(CombatEffectType.BasiliskCompulsion, CombatEffects.BasiliskCompulsion);
        this.add(CombatEffectType.BasiliskSlow, CombatEffects.BasiliskSlow);
        this.add(CombatEffectType.Blind, CombatEffects.Blind);
        this.add(CombatEffectType.Bound, CombatEffects.Bound);
        this.add(CombatEffectType.CalledShot, CombatEffects.CalledShot);
        this.add(CombatEffectType.CoonWhip, CombatEffects.CoonWhip);
        this.add(CombatEffectType.DemonSeed, CombatEffects.DemonSeed);
        this.add(CombatEffectType.Disarmed, CombatEffects.Disarmed);
        this.add(CombatEffectType.DriderKiss, CombatEffects.DriderKiss);
        this.add(CombatEffectType.Earthshield, CombatEffects.Earthshield);
        this.add(CombatEffectType.GardenerSapSpeed, CombatEffects.GardenerSapSpeed);
        this.add(CombatEffectType.GnollSpear, CombatEffects.GnollSpear);
        this.add(CombatEffectType.GooArmorBind, CombatEffects.GooArmorBind);
        this.add(CombatEffectType.GooArmorSilence, CombatEffects.GooArmorSilence);
        this.add(CombatEffectType.HarpyBind, CombatEffects.HarpyBind);
        this.add(CombatEffectType.Heat, CombatEffects.Heat);
        this.add(CombatEffectType.HolliConstrict, CombatEffects.HolliConstrict);
        this.add(CombatEffectType.IzmaBleed, CombatEffects.IzmaBleed);
        this.add(CombatEffectType.KissOfDeath, CombatEffects.KissOfDeath);
        this.add(CombatEffectType.LustAura, CombatEffects.LustAura);
        this.add(CombatEffectType.LustStick, CombatEffects.LustStick);
        this.add(CombatEffectType.LustStones, CombatEffects.LustStones);
        this.add(CombatEffectType.Might, CombatEffects.Might);
        this.add(CombatEffectType.MilkyUrta, CombatEffects.MilkyUrta);
        this.add(CombatEffectType.NagaBind, CombatEffects.NagaBind);
        this.add(CombatEffectType.NagaVenom, CombatEffects.NagaVenom);
        this.add(CombatEffectType.PCTailTangle, CombatEffects.PCTailTangle);
        this.add(CombatEffectType.ParalyzeVenom, CombatEffects.ParalyzeVenom);
        this.add(CombatEffectType.Poison, CombatEffects.Poison);
        this.add(CombatEffectType.QueenBind, CombatEffects.QueenBind);
        this.add(CombatEffectType.Rut, CombatEffects.Rut);
        this.add(CombatEffectType.Sandstorm, CombatEffects.Sandstorm);
        this.add(CombatEffectType.Sealed, CombatEffects.Sealed);
        this.add(CombatEffectType.Shell, CombatEffects.Shell);
        this.add(CombatEffectType.StoneLust, CombatEffects.StoneLust);
        this.add(CombatEffectType.Stunned, CombatEffects.Stunned);
        this.add(CombatEffectType.SuccubusAura, CombatEffects.SuccubusAura);
        this.add(CombatEffectType.TemporaryHeat, CombatEffects.TemporaryHeat);
        this.add(CombatEffectType.TentacleBind, CombatEffects.TentacleBind);
        this.add(CombatEffectType.TentacleCoolDown, CombatEffects.TentacleCoolDown);
        this.add(CombatEffectType.ThroatPunch, CombatEffects.ThroatPunch);
        this.add(CombatEffectType.Timer, CombatEffects.Timer);
        this.add(CombatEffectType.UBERWEB, CombatEffects.UBERWEB);
        this.add(CombatEffectType.Web, CombatEffects.Web);
        this.add(CombatEffectType.WebSilence, CombatEffects.WebSilence);

        // Perks
        this.add(CombatEffectType.ArousingAura, CombatEffects.ArousingAura);
    }
}

class AbilityFlagsLib extends Dictionary<CombatAbilityFlag> {
    public constructor() {
        super();
        this.add(CombatEffectType.IsabellaStunned, CombatAbilityFlag.MainAction);
        this.add(CombatEffectType.Stunned, CombatAbilityFlag.MainAction);
        this.add(CombatEffectType.Whispered, CombatAbilityFlag.MainAction);
        this.add(CombatEffectType.Confusion, CombatAbilityFlag.MainAction);
        this.add(CombatEffectType.HarpyBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.add(CombatEffectType.GooBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.add(CombatEffectType.TentacleBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.add(CombatEffectType.NagaBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.add(CombatEffectType.QueenBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.add(CombatEffectType.PCTailTangle, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.add(CombatEffectType.HolliConstrict, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.add(CombatEffectType.GooArmorBind, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.add(CombatEffectType.Constricted, CombatAbilityFlag.MainAction | CombatAbilityFlag.Tease | CombatAbilityFlag.MoveAway);
        this.add(CombatEffectType.Bound, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.add(CombatEffectType.MinotaurEntangled, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.add(CombatEffectType.UBERWEB, CombatAbilityFlag.MainAction | CombatAbilityFlag.MagicSpec);
        this.add(CombatEffectType.Chokeslam, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.add(CombatEffectType.Titsmother, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
        this.add(CombatEffectType.Tentagrappled, CombatAbilityFlag.MainAction | CombatAbilityFlag.Wait);
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