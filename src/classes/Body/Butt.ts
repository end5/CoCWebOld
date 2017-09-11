import Pregnancy from "./Pregnancy";
import { SaveInterface } from "../SaveInterface";

export enum ButtWetness {
    DRY, NORMAL, MOIST, SLIMY, DROOLING, SLIME_DROOLING
}

export enum ButtLooseness {
    VIRGIN, TIGHT, NORMAL, LOOSE, STRETCHED, GAPING
}

export enum ButtRating {
    BUTTLESS            = 0,
    TIGHT               = 2,
    AVERAGE             = 4,
    NOTICEABLE          = 6,
    LARGE               = 8,
    JIGGLY              = 10,
    EXPANSIVE           = 13,
    HUGE                = 16,
    INCONCEIVABLY_BIG   = 20
}

export default class Butt extends Pregnancy implements SaveInterface {
    public analWetness: ButtWetness;
    public analLooseness: ButtLooseness;
    //Used to determine thickness of knot relative to normal thickness
    //Used during sex to determine how full it currently is.  For multi-dick sex.
    public fullness:number;
    public buttRating: ButtRating;

    public constructor() {
        super();
        this.analWetness = ButtWetness.DRY;
        this.analLooseness = ButtLooseness.VIRGIN;
        this.fullness = 0;
        this.buttRating = ButtRating.BUTTLESS;
    }

    saveKey: string = "Butt";
    save(): object {
        let saveObject: object = {};
        saveObject[super.saveKey] = super.save();
        saveObject["analWetness"] = this.analWetness;
        saveObject["analLooseness"] = this.analLooseness;
        saveObject["fullness"] = this.fullness;
        saveObject["buttRating"] = this.buttRating;
        return saveObject;
    }
    load(saveObject: object) {
        super.load(saveObject[super.saveKey]);
        this.analWetness = saveObject["analWetness"];
        this.analLooseness = saveObject["analLooseness"];
        this.fullness = saveObject["fullness"];
        this.buttRating = saveObject["buttRating"];
    }
}