import StatusAffect from './StatusAffect';
import StatusAffectDesc from './StatusAffectDesc';
import StatusAffectDescLib from './StatusAffectDescLib';
import StatusAffects from './StatusAffects/StatusAffects';
import { StatusAffectType } from './StatusAffectType';
import Character from '../Character/Character';
import Game from '../Game/Game';
import ConstructorLibrary from '../Utilities/ConstructorLibrary';

interface StatusAffectConstructor {
    new(statusAffectType: StatusAffectType, desc: StatusAffectDesc, value1: number, value2: number, value3: number, value4: number): StatusAffect;
}

class StatusAffectLib extends ConstructorLibrary<StatusAffectConstructor> {
    public constructor() {
        super();
        this.add(StatusAffectType.AcidSlap, StatusAffects.AcidSlap);
        this.add(StatusAffectType.AkbalSpeed, StatusAffects.AkbalSpeed);
        this.add(StatusAffectType.AmilyVenom, StatusAffects.AmilyVenom);
        this.add(StatusAffectType.AnemoneVenom, StatusAffects.AnemoneVenom);
        this.add(StatusAffectType.BasiliskCompulsion, StatusAffects.BasiliskCompulsion);
        this.add(StatusAffectType.BasiliskSlow, StatusAffects.BasiliskSlow);
        this.add(StatusAffectType.Blind, StatusAffects.Blind);
        this.add(StatusAffectType.Bound, StatusAffects.Bound);
        this.add(StatusAffectType.CalledShot, StatusAffects.CalledShot);
        this.add(StatusAffectType.CalledShot, StatusAffects.CalledShot);
        this.add(StatusAffectType.CoonWhip, StatusAffects.CoonWhip);
        this.add(StatusAffectType.DemonSeed, StatusAffects.DemonSeed);
        this.add(StatusAffectType.Disarmed, StatusAffects.Disarmed);
        this.add(StatusAffectType.DriderKiss, StatusAffects.DriderKiss);
        this.add(StatusAffectType.Earthshield, StatusAffects.Earthshield);
        this.add(StatusAffectType.GardenerSapSpeed, StatusAffects.GardenerSapSpeed);
        this.add(StatusAffectType.GnollSpear, StatusAffects.GnollSpear);
        this.add(StatusAffectType.GooArmorBind, StatusAffects.GooArmorBind);
        this.add(StatusAffectType.GooArmorSilence, StatusAffects.GooArmorSilence);
        this.add(StatusAffectType.HarpyBind, StatusAffects.HarpyBind);
        this.add(StatusAffectType.Heat, StatusAffects.Heat);
        this.add(StatusAffectType.HolliConstrict, StatusAffects.HolliConstrict);
        this.add(StatusAffectType.IzmaBleed, StatusAffects.IzmaBleed);
        this.add(StatusAffectType.KissOfDeath, StatusAffects.KissOfDeath);
        this.add(StatusAffectType.LustAura, StatusAffects.LustAura);
        this.add(StatusAffectType.LustStick, StatusAffects.LustStick);
        this.add(StatusAffectType.LustStones, StatusAffects.LustStones);
        this.add(StatusAffectType.Might, StatusAffects.Might);
        this.add(StatusAffectType.MilkyUrta, StatusAffects.MilkyUrta);
        this.add(StatusAffectType.NagaBind, StatusAffects.NagaBind);
        this.add(StatusAffectType.NagaVenom, StatusAffects.NagaVenom);
        this.add(StatusAffectType.PCTailTangle, StatusAffects.PCTailTangle);
        this.add(StatusAffectType.ParalyzeVenom, StatusAffects.ParalyzeVenom);
        this.add(StatusAffectType.Poison, StatusAffects.Poison);
        this.add(StatusAffectType.QueenBind, StatusAffects.QueenBind);
        this.add(StatusAffectType.Rut, StatusAffects.Rut);
        this.add(StatusAffectType.Sandstorm, StatusAffects.Sandstorm);
        this.add(StatusAffectType.Sealed, StatusAffects.Sealed);
        this.add(StatusAffectType.Shell, StatusAffects.Shell);
        this.add(StatusAffectType.StoneLust, StatusAffects.StoneLust);
        this.add(StatusAffectType.Stunned, StatusAffects.Stunned);
        this.add(StatusAffectType.SuccubusAura, StatusAffects.SuccubusAura);
        this.add(StatusAffectType.TemporaryHeat, StatusAffects.TemporaryHeat);
        this.add(StatusAffectType.TentacleBind, StatusAffects.TentacleBind);
        this.add(StatusAffectType.TentacleCoolDown, StatusAffects.TentacleCoolDown);
        this.add(StatusAffectType.ThroatPunch, StatusAffects.ThroatPunch);
        this.add(StatusAffectType.Timer, StatusAffects.Timer);
        this.add(StatusAffectType.UBERWEB, StatusAffects.UBERWEB);
        this.add(StatusAffectType.Web, StatusAffects.Web);
        this.add(StatusAffectType.WebSilence, StatusAffects.WebSilence);
    }
}

class GenericStatusAffect extends StatusAffect {
    combatUpdate(character: Character, enemy: Character) { }
}

export default class StatusAffectFactory {
    private static statusAffectLib: StatusAffectLib;
    private static statusAffectDescLib: StatusAffectDescLib;

    public constructor() {
        if (!StatusAffectFactory.statusAffectLib)
            StatusAffectFactory.statusAffectLib = StatusAffectFactory.createLib();
        if (!StatusAffectFactory.statusAffectDescLib)
            StatusAffectFactory.statusAffectDescLib = StatusAffectFactory.createDescLib();
    }

    public static create(type: StatusAffectType, value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0): StatusAffect {
        const desc = StatusAffectFactory.statusAffectDescLib.get(type);
        if (StatusAffectFactory.statusAffectLib.has(type)) {
            return new (StatusAffectFactory.statusAffectLib.get(type))(type, desc, value1, value2, value3, value4);
        }
        return new GenericStatusAffect(type, desc, value1, value2, value3, value4);
    }

    public static copy(statusAffect: StatusAffect): StatusAffect {
        return StatusAffectFactory.create(statusAffect.type, statusAffect.value1, statusAffect.value2, statusAffect.value3, statusAffect.value4);
    }
}