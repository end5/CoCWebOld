import { CombatAbilityFlag } from './CombatAbilityFlag';
import { CombatEffect } from './CombatEffect';
import { CombatEffectType } from './CombatEffectType';
import { Dictionary } from '../../Engine/Utilities/Dictionary';
import { Character } from '../Character/Character';
import { AcidSlap } from './CombatEffects/AcidSlap';
import { AkbalSpeed } from './CombatEffects/AkbalSpeed';
import { AmilyVenom } from './CombatEffects/AmilyVenom';
import { AnemoneVenom } from './CombatEffects/AnemoneVenom';
import { BasiliskCompulsion } from './CombatEffects/BasiliskCompulsion';
import { BasiliskSlow } from './CombatEffects/BasiliskSlow';
import { Blind } from './CombatEffects/Blind';
import { Bound } from './CombatEffects/Bound';
import { CalledShot } from './CombatEffects/CalledShot';
import { CoonWhip } from './CombatEffects/CoonWhip';
import { DemonSeed } from './CombatEffects/DemonSeed';
import { Disarmed } from './CombatEffects/Disarmed';
import { DriderKiss } from './CombatEffects/DriderKiss';
import { Earthshield } from './CombatEffects/Earthshield';
import { GardenerSapSpeed } from './CombatEffects/GardenerSapSpeed';
import { GnollSpear } from './CombatEffects/GnollSpear';
import { GooArmorBind } from './CombatEffects/GooArmorBind';
import { GooArmorSilence } from './CombatEffects/GooArmorSilence';
import { HarpyBind } from './CombatEffects/HarpyBind';
import { Heat } from './CombatEffects/Heat';
import { HolliConstrict } from './CombatEffects/HolliConstrict';
import { IzmaBleed } from './CombatEffects/IzmaBleed';
import { KissOfDeath } from './CombatEffects/KissOfDeath';
import { LustAura } from './CombatEffects/LustAura';
import { LustStick } from './CombatEffects/LustStick';
import { LustStones } from './CombatEffects/LustStones';
import { MilkyUrta } from './CombatEffects/MilkyUrta';
import { NagaBind } from './CombatEffects/NagaBind';
import { NagaVenom } from './CombatEffects/NagaVenom';
import { PCTailTangle } from './CombatEffects/PCTailTangle';
import { ParalyzeVenom } from './CombatEffects/ParalyzeVenom';
import { Poison } from './CombatEffects/Poison';
import { QueenBind } from './CombatEffects/QueenBind';
import { Rut } from './CombatEffects/Rut';
import { Sandstorm } from './CombatEffects/Sandstorm';
import { Sealed } from './CombatEffects/Sealed';
import { Shell } from './CombatEffects/Shell';
import { StoneLust } from './CombatEffects/StoneLust';
import { Stunned } from './CombatEffects/Stunned';
import { SuccubusAura } from './CombatEffects/SuccubusAura';
import { TemporaryHeat } from './CombatEffects/TemporaryHeat';
import { TentacleBind } from './CombatEffects/TentacleBind';
import { TentacleCoolDown } from './CombatEffects/TentacleCoolDown';
import { ThroatPunch } from './CombatEffects/ThroatPunch';
import { Timer } from './CombatEffects/Timer';
import { UBERWEB } from './CombatEffects/UBERWEB';
import { WebSilence } from './CombatEffects/WebSilence';
import { ArousingAura } from './CombatEffects/ArousingAura';
import { Might } from './CombatEffects/Might';
import { Web } from './CombatEffects/Web';

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
        this.set(CombatEffectType.AcidSlap, AcidSlap);
        this.set(CombatEffectType.AkbalSpeed, AkbalSpeed);
        this.set(CombatEffectType.AmilyVenom, AmilyVenom);
        this.set(CombatEffectType.AnemoneVenom, AnemoneVenom);
        this.set(CombatEffectType.BasiliskCompulsion, BasiliskCompulsion);
        this.set(CombatEffectType.BasiliskSlow, BasiliskSlow);
        this.set(CombatEffectType.Blind, Blind);
        this.set(CombatEffectType.Bound, Bound);
        this.set(CombatEffectType.CalledShot, CalledShot);
        this.set(CombatEffectType.CoonWhip, CoonWhip);
        this.set(CombatEffectType.DemonSeed, DemonSeed);
        this.set(CombatEffectType.Disarmed, Disarmed);
        this.set(CombatEffectType.DriderKiss, DriderKiss);
        this.set(CombatEffectType.Earthshield, Earthshield);
        this.set(CombatEffectType.GardenerSapSpeed, GardenerSapSpeed);
        this.set(CombatEffectType.GnollSpear, GnollSpear);
        this.set(CombatEffectType.GooArmorBind, GooArmorBind);
        this.set(CombatEffectType.GooArmorSilence, GooArmorSilence);
        this.set(CombatEffectType.HarpyBind, HarpyBind);
        this.set(CombatEffectType.Heat, Heat);
        this.set(CombatEffectType.HolliConstrict, HolliConstrict);
        this.set(CombatEffectType.IzmaBleed, IzmaBleed);
        this.set(CombatEffectType.KissOfDeath, KissOfDeath);
        this.set(CombatEffectType.LustAura, LustAura);
        this.set(CombatEffectType.LustStick, LustStick);
        this.set(CombatEffectType.LustStones, LustStones);
        this.set(CombatEffectType.Might, Might);
        this.set(CombatEffectType.MilkyUrta, MilkyUrta);
        this.set(CombatEffectType.NagaBind, NagaBind);
        this.set(CombatEffectType.NagaVenom, NagaVenom);
        this.set(CombatEffectType.PCTailTangle, PCTailTangle);
        this.set(CombatEffectType.ParalyzeVenom, ParalyzeVenom);
        this.set(CombatEffectType.Poison, Poison);
        this.set(CombatEffectType.QueenBind, QueenBind);
        this.set(CombatEffectType.Rut, Rut);
        this.set(CombatEffectType.Sandstorm, Sandstorm);
        this.set(CombatEffectType.Sealed, Sealed);
        this.set(CombatEffectType.Shell, Shell);
        this.set(CombatEffectType.StoneLust, StoneLust);
        this.set(CombatEffectType.Stunned, Stunned);
        this.set(CombatEffectType.SuccubusAura, SuccubusAura);
        this.set(CombatEffectType.TemporaryHeat, TemporaryHeat);
        this.set(CombatEffectType.TentacleBind, TentacleBind);
        this.set(CombatEffectType.TentacleCoolDown, TentacleCoolDown);
        this.set(CombatEffectType.ThroatPunch, ThroatPunch);
        this.set(CombatEffectType.Timer, Timer);
        this.set(CombatEffectType.UBERWEB, UBERWEB);
        this.set(CombatEffectType.Web, Web);
        this.set(CombatEffectType.WebSilence, WebSilence);

        // Perks
        this.set(CombatEffectType.ArousingAura, ArousingAura);
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

class CombatEffectFactory {
    private lib: CombatEffectConstructorLib;
    private flagslib: AbilityFlagsLib;

    public constructor() {
        this.lib = new CombatEffectConstructorLib();
        this.flagslib = new AbilityFlagsLib();
    }

    public create(type: CombatEffectType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0, inflictedBy?: Character): CombatEffect {
        const abilityFlag = this.flagslib.has(type) ? CombatAbilityFlag.All : this.flagslib[type];
        if (this.lib.has(type)) {
            return new (this.lib.get(type))(type, value1, value2, value3, value4, abilityFlag, inflictedBy);
        }
        return new CombatEffect(type, value1, value2, value3, value4, abilityFlag, inflictedBy);
    }

    public copy(combatEffect: CombatEffect): CombatEffect {
        return this.create(combatEffect.type, combatEffect.value1, combatEffect.value2, combatEffect.value3, combatEffect.value4, combatEffect.inflictedBy);
    }
}

const combatEffectFactory = new CombatEffectFactory();
export { combatEffectFactory as CombatEffectFactory };
