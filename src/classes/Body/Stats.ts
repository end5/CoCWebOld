import SerializeInterface from '../SerializeInterface';

export default class Stats implements SerializeInterface {
    //Primary stats
    public str: number;
    public tou: number;
    public spe: number;
    public int: number;
    public lib: number;
    public sens: number;
    public cor: number;
    public fatigue: number;

    //Combat Stats
    public HP: number;
    public bonusHP: number;
    public lust: number;
    public lustVuln: number;

    //Level Stats
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

        //Combat Stats
        this.HP = 0;
        this.bonusHP = 0;
        this.lust = 0;
        this.lustVuln = 0;

        //Level Stats
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
        this.XP = saveObject.XP;
        this.level = saveObject.level;
        this.additionalXP = saveObject.additionalXP;
    }
}