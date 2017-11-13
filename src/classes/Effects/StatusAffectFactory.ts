import StatusAffect from './StatusAffect';
import StatusAffectDesc from './StatusAffectDesc';
import StatusAffectDescLib from './StatusAffectDescLib';
import * as StatusAffects from './StatusAffects';
import { StatusAffectType } from './StatusAffectType';
import Game from '../Game/Game';
import ConstructorLibrary from '../Utilities/ConstructorLibrary';

interface StatusAffectConstructor {
    new(statusAffectType: StatusAffectType, desc: StatusAffectDesc, value1: number, value2: number, value3: number, value4: number): StatusAffect;
}

class StatusAffectLib extends ConstructorLibrary<StatusAffectConstructor> {
    public constructor() {
        super();
        this.add(StatusAffectType.AcidSlap, StatusAffects.AcidSlap);
        // this is perk V
        //this.add(StatusAffectType.ArousingAura, StatusAffects.ArousingAura);
        this.add(StatusAffectType.BasiliskCompulsion, StatusAffects.BasiliskCompulsion);
        this.add(StatusAffectType.Blind, StatusAffects.Blind);
        this.add(StatusAffectType.Bound, StatusAffects.Bound);
        this.add(StatusAffectType.DemonSeed, StatusAffects.DemonSeed);
        this.add(StatusAffectType.DriderKiss, StatusAffects.DriderKiss);
        this.add(StatusAffectType.GooArmorBind, StatusAffects.GooArmorBind);
        this.add(StatusAffectType.GooArmorSilence, StatusAffects.GooArmorSilence);
        this.add(StatusAffectType.HarpyBind, StatusAffects.HarpyBind);
        this.add(StatusAffectType.Heat, StatusAffects.Heat);
        this.add(StatusAffectType.HolliConstrict, StatusAffects.HolliConstrict);
        this.add(StatusAffectType.IzmaBleed, StatusAffects.IzmaBleed);
        this.add(StatusAffectType.KissOfDeath, StatusAffects.KissOfDeath);
        this.add(StatusAffectType.Luststick, StatusAffects.Luststick);
        this.add(StatusAffectType.LustStones, StatusAffects.LustStones);
        this.add(StatusAffectType.NagaBind, StatusAffects.NagaBind);
        this.add(StatusAffectType.NagaVenom, StatusAffects.NagaVenom);
        this.add(StatusAffectType.Poison, StatusAffects.Poison);
        this.add(StatusAffectType.Rut, StatusAffects.Rut);
        this.add(StatusAffectType.Sealed, StatusAffects.Sealed);
        this.add(StatusAffectType.StoneLust, StatusAffects.StoneLust);
        this.add(StatusAffectType.TemporaryHeat, StatusAffects.TemporaryHeat);
        this.add(StatusAffectType.TentacleBind, StatusAffects.TentacleBind);
        this.add(StatusAffectType.ThroatPunch, StatusAffects.ThroatPunch);
        this.add(StatusAffectType.UBERWEB, StatusAffects.UBERWEB);
        this.add(StatusAffectType.WebSilence, StatusAffects.WebSilence);

        //new (this.get(StatusAffectType.AcidSlap).constructor)();
    }
}

export default class StatusAffectFactory {
    private static statusAffectLib: StatusAffectLib;
    private static statusAffectDescLib: StatusAffectDescLib;

    public constructor() {
        if (!StatusAffectFactory.statusAffectLib)
            StatusAffectFactory.statusAffectLib = new StatusAffectLib();
        if (!StatusAffectFactory.statusAffectDescLib)
            StatusAffectFactory.statusAffectDescLib = new StatusAffectDescLib();
    }

    public static create(type: StatusAffectType, value1: number, value2: number, value3: number, value4: number): StatusAffect {
        const desc = StatusAffectFactory.statusAffectDescLib.get(type);
        if (StatusAffectFactory.statusAffectLib.has(type)) {
            return new (StatusAffectFactory.statusAffectLib.get(type))(type, desc, value1, value2, value3, value4);
        }
        return new StatusAffect(type, desc, value1, value2, value3, value4);
    }

    public static copy(statusAffect: StatusAffect): StatusAffect {
        return StatusAffectFactory.create(statusAffect.type, statusAffect.value1, statusAffect.value2, statusAffect.value3, statusAffect.value4);
    }
}