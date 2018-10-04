import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { ModifiableStat } from './Stat/ModifiableStat';

export class Stats implements ISerializable<Stats> {
    // Primary stats
    // public str: number;
    // public tou: number;
    // public spe: number;
    // public int: number;
    // public lib: number;
    // public sens: number;
    // public cor: number;
    // public fatigue: number;

    public str = new ModifiableStat('str');
    public tou = new ModifiableStat('tou');
    public spe = new ModifiableStat('spe');
    public int = new ModifiableStat('int');
    public lib = new ModifiableStat('lib');
    public sens = new ModifiableStat('sens');
    public cor = new ModifiableStat('cor');
    public fatigue = new ModifiableStat('fatigue');
    // Combat Stats
    // public HP: number;
    public bonusHP: number;
    // public lust: number;
    public lustVuln: number = 0;
    // public minLust: number;

    public HP = new ModifiableStat('str');
    public lust = new ModifiableStat('str');

    // Level Stats
    public XP: number = 0;
    public level: number = 0;
    public additionalXP: number = 0;
    public perkPoints: number = 0;
    public teaseXP: number = 0;
    public teaseLevel: number = 0;

    public serialize(): object {
        return {
            strStat: this.str.serialize(),
            touStat: this.tou.serialize(),
            speStat: this.spe.serialize(),
            intStat: this.int.serialize(),
            libStat: this.lib.serialize(),
            sensStat: this.sens.serialize(),
            corStat: this.cor.serialize(),
            fatigueStat: this.fatigue.serialize(),
            HPStat: this.HP.serialize(),
            lustStat: this.lust.serialize(),

            bonusHP: this.bonusHP,
            lustVuln: this.lustVuln,

            XP: this.XP,
            level: this.level,
            additionalXP: this.additionalXP,
            perkPoints: this.perkPoints,
            teaseXP: this.teaseXP,
            teaseLevel: this.teaseLevel
        };
    }

    public deserialize(saveObject: Stats) {
        this.str.deserialize(saveObject.str);
        this.tou.deserialize(saveObject.tou);
        this.spe.deserialize(saveObject.spe);
        this.int.deserialize(saveObject.int);
        this.lib.deserialize(saveObject.lib);
        this.sens.deserialize(saveObject.sens);
        this.cor.deserialize(saveObject.cor);
        this.fatigue.deserialize(saveObject.fatigue);
        this.HP.deserialize(saveObject.HP);
        this.lust.deserialize(saveObject.lust);

        this.bonusHP = saveObject.bonusHP;
        this.lustVuln = saveObject.lustVuln;

        this.XP = saveObject.XP;
        this.level = saveObject.level;
        this.additionalXP = saveObject.additionalXP;
        this.perkPoints = saveObject.perkPoints;
        this.teaseXP = saveObject.teaseXP;
        this.teaseLevel = saveObject.teaseLevel;
    }
}
