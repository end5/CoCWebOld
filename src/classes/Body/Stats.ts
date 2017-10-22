import { SaveInterface } from '../SaveInterface';

export default class Stats implements SaveInterface {
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
        this.lust = 0;
        this.lustVuln = 0;

        //Level Stats
        this.XP = 0;
        this.level = 0;
        this.additionalXP = 0;
    }

    saveKey: string = "Stats";
    save(): object {
        let saveObject: object;
        saveObject["str"] = this.str;
        saveObject["tou"] = this.tou;
        saveObject["spe"] = this.spe;
        saveObject["int"] = this.int;
        saveObject["lib"] = this.lib;
        saveObject["sens"] = this.sens;
        saveObject["cor"] = this.cor;
        saveObject["fatigue"] = this.fatigue;
        saveObject["HP"] = this.HP;
        saveObject["lust"] = this.lust;
        saveObject["lustVuln"] = this.lustVuln;
        saveObject["XP"] = this.XP;
        saveObject["level"] = this.level;
        saveObject["additionalXP"] = this.additionalXP;
        return saveObject;
    }
    load(saveObject: object) {
        this.str = saveObject["str"];
        this.tou = saveObject["tou"];
        this.spe = saveObject["spe"];
        this.int = saveObject["int"];
        this.lib = saveObject["lib"];
        this.sens = saveObject["sens"];
        this.cor = saveObject["cor"];
        this.fatigue = saveObject["fatigue"];
        this.HP = saveObject["HP"];
        this.lust = saveObject["lust"];
        this.lustVuln = saveObject["lustVuln"];
        this.XP = saveObject["XP"];
        this.level = saveObject["level"];
        this.additionalXP = saveObject["additionalXP"];
    }
}