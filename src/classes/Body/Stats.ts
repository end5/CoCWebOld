import ISerializable from '../Utilities/ISerializable';

export default class Stats implements ISerializable<Stats> {
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

    // Level Stats
    public XP: number;
    public level: number;
    public additionalXP: number;

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

        // Level Stats
        this.XP = 0;
        this.level = 0;
        this.additionalXP = 0;
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
            XP: this.XP,
            level: this.level,
            additionalXP: this.additionalXP
        });
    }

    public deserialize(saveObject: Stats): Stats {
        const newStats = new Stats();
        newStats.str = saveObject.str;
        newStats.tou = saveObject.tou;
        newStats.spe = saveObject.spe;
        newStats.int = saveObject.int;
        newStats.lib = saveObject.lib;
        newStats.sens = saveObject.sens;
        newStats.cor = saveObject.cor;
        newStats.fatigue = saveObject.fatigue;
        newStats.HP = saveObject.HP;
        newStats.bonusHP = saveObject.bonusHP;
        newStats.lust = saveObject.lust;
        newStats.lustVuln = saveObject.lustVuln;
        newStats.XP = saveObject.XP;
        newStats.level = saveObject.level;
        newStats.additionalXP = saveObject.additionalXP;
        return newStats;
    }
}
