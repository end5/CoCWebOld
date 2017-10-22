import { SaveInterface } from '../SaveInterface';
import Utils from '../Utilities/Utils';

export enum VaginaType {
    HUMAN, BLACK_SAND_TRAP
}

export enum VaginaWetness {
    DRY, NORMAL, WET, SLICK, DROOLING, SLAVERING
}

export enum VaginaLooseness {
    TIGHT, NORMAL, LOOSE, GAPING, GAPING_WIDE, LEVEL_CLOWN_CAR
}

export default class Vagina implements SaveInterface {
    public vaginaType: VaginaType = VaginaType.HUMAN;
    public virgin: boolean = true;

    public vaginalWetness: VaginaWetness = VaginaWetness.NORMAL;
    public vaginalLooseness: VaginaLooseness = VaginaLooseness.NORMAL;

    //Used during sex to determine how full it currently is.  For multi-dick sex.
    public fullness: number;
    public labiaPierced: number;
    public labiaPShort: string;
    public labiaPLong: string;
    public clitLength: number;
    public clitPierced: number;
    public clitPShort: string;
    public clitPLong: string;

    public constructor(vaginalWetness: VaginaWetness = VaginaWetness.NORMAL, vaginalLooseness: VaginaLooseness = VaginaLooseness.TIGHT, virgin: boolean = false) {
        this.vaginaType = VaginaType.HUMAN;
        this.virgin = virgin;
        this.vaginalWetness = vaginalWetness;
        this.vaginalLooseness = vaginalLooseness;
        this.fullness = 0;
        this.labiaPierced = 0;
        this.labiaPShort = "";
        this.labiaPLong = "";
        this.clitLength = .5;
        this.clitPierced = 0;
        this.clitPShort = "";
        this.clitPLong = "";
    }
    public validate(): string {
        let error: string = "";
        error += Utils.validateNonNegativeNumberFields(this, "VaginaClass.validate", [
            "vaginalWetness", "vaginalLooseness", "type",
            "fullness", "labiaPierced", "clitPierced"
        ]);
        if (this.labiaPierced) {
            if (this.labiaPShort == "") error += "Labia pierced but labiaPShort = ''. ";
            if (this.labiaPLong == "") error += "Labia pierced but labiaPLong = ''. ";
        } else {
            if (this.labiaPShort != "") error += "Labia not pierced but labiaPShort = '" + this.labiaPShort + "'. ";
            if (this.labiaPLong != "") error += "Labia not pierced but labiaPLong = '" + this.labiaPShort + "'. ";
        }
        if (this.clitPierced) {
            if (this.clitPShort == "") error += "Clit pierced but labiaPShort = ''. ";
            if (this.clitPLong == "") error += "Clit pierced but labiaPLong = ''. ";
        } else {
            if (this.clitPShort != "") error += "Clit not pierced but labiaPShort = '" + this.labiaPShort + "'. ";
            if (this.clitPLong != "") error += "Clit not pierced but labiaPLong = '" + this.labiaPShort + "'. ";
        }
        return error;
    }

    public wetnessFactor(): number {
        if (this.vaginalWetness == VaginaWetness.DRY) return 1.25;
        if (this.vaginalWetness == VaginaWetness.NORMAL) return 1;
        if (this.vaginalWetness == VaginaWetness.WET) return 0.8;
        if (this.vaginalWetness == VaginaWetness.SLICK) return 0.7;
        if (this.vaginalWetness == VaginaWetness.DROOLING) return 0.6;
        if (this.vaginalWetness == VaginaWetness.SLAVERING) return 0.5;
        return .5;
    }

    public capacity(): number {
        if (this.vaginalLooseness == VaginaLooseness.TIGHT) return 8;
        if (this.vaginalLooseness == VaginaLooseness.NORMAL) return 16;
        if (this.vaginalLooseness == VaginaLooseness.LOOSE) return 24;
        if (this.vaginalLooseness == VaginaLooseness.GAPING) return 36;
        if (this.vaginalLooseness == VaginaLooseness.GAPING_WIDE) return 56;
        if (this.vaginalLooseness == VaginaLooseness.LEVEL_CLOWN_CAR) return 100;
        return 10000;
    }

    saveKey: string = "Vagina";
    save(): object {
        return {
            "vaginaType": this.vaginaType,
            "virgin": this.virgin,
            "vaginalWetness": this.vaginalWetness,
            "vaginalLooseness": this.vaginalLooseness,
            "fullness": this.fullness,
            "labiaPierced": this.labiaPierced,
            "labiaPShort": this.labiaPShort,
            "labiaPLong": this.labiaPLong,
            "clitLength": this.clitLength,
            "clitPierced": this.clitPierced,
            "clitPShort": this.clitPShort,
            "clitPLong": this.clitPLong
        };
    }
    load(saveObject: object) {
        this.vaginaType = saveObject["vaginaType"];
        this.virgin = saveObject["virgin"];
        this.vaginalWetness = saveObject["vaginalWetness"];
        this.vaginalLooseness = saveObject["vaginalLooseness"];
        this.fullness = saveObject["fullness"];
        this.labiaPierced = saveObject["labiaPierced"];
        this.labiaPShort = saveObject["labiaPShort"];
        this.labiaPLong = saveObject["labiaPLong"];
        this.clitLength = saveObject["clitLength"];
        this.clitPierced = saveObject["clitPierced"];
        this.clitPShort = saveObject["clitPShort"];
        this.clitPLong = saveObject["clitPLong"];
    }

}
