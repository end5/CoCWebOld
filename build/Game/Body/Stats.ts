import { ISerializable } from '../../Engine/Utilities/ISerializable';

export class Stats implements ISerializable<Stats> {
    // Primary stats
    public str: number;
    public tou: number;
    public spe: number;
    public int: number;
    public lib: number;
    public sens: number;
    public cor: number;
    public fatigue: number;

    // Combat Stats
    public HP: number;
    public bonusHP: number;
    public lust: number;
    public lustVuln: number;
    public minLust: number;

    // Level Stats
    public XP: number;
    public level: number;
    public additionalXP: number;
    public perkPoints: number;
    public teaseXP: number;
    public teaseLevel: number;

    public constructor() {
        this.str = 0;
        this.tou = 0;
        this.spe = 0;
        this.int = 0;
        this.lib = 0;
        this.sens = 0;
        this.cor = 0;
        this.fatigue = 0;

        // Combat Stats
        this.HP = 0;
        this.bonusHP = 0;
        this.lust = 0;
        this.lustVuln = 0;
        this.minLust = 0;

        // Level Stats
        this.XP = 0;
        this.level = 0;
        this.additionalXP = 0;
        this.perkPoints = 0;
        this.teaseXP = 0;
        this.teaseLevel = 0;
    }

    public serialize(): string {
        return JSON.stringify({
            str: this.str,
            tou: this.tou,
            spe: this.spe,
            int: this.int,
            lib: this.lib,
            sens: this.sens,
            cor: this.cor,
            fatigue: this.fatigue,
            HP: this.HP,
            bonusHP: this.bonusHP,
            lust: this.lust,
            lustVuln: this.lustVuln,
            minLust: this.minLust,
            XP: this.XP,
            level: this.level,
            additionalXP: this.additionalXP,
            perkPoints: this.perkPoints,
            teaseXP: this.teaseXP,
            teaseLevel: this.teaseLevel
        });
    }

    public deserialize(saveObject: Stats) {
        this.str = saveObject.str;
        this.tou = saveObject.tou;
        this.spe = saveObject.spe;
        this.int = saveObject.int;
        this.lib = saveObject.lib;
        this.sens = saveObject.sens;
        this.cor = saveObject.cor;
        this.fatigue = saveObject.fatigue;
        this.HP = saveObject.HP;
        this.bonusHP = saveObject.bonusHP;
        this.lust = saveObject.lust;
        this.lustVuln = saveObject.lustVuln;
        this.minLust = saveObject.minLust;
        this.XP = saveObject.XP;
        this.level = saveObject.level;
        this.additionalXP = saveObject.additionalXP;
        this.perkPoints = saveObject.perkPoints;
        this.teaseXP = saveObject.teaseXP;
        this.teaseLevel = saveObject.teaseLevel;
    }
}
