import Butt from "./Butt";
import CockSpot from "./CockSpot";
import Ovipositor from "./Ovipositor";
import { SaveInterface } from "../SaveInterface";
import VaginaSpot from "./VaginaSpot";

export enum LowerBodyType {
    HUMAN, HOOFED, DOG, NAGA, CENTAUR, DEMONIC_HIGH_HEELS, DEMONIC_CLAWS, BEE,
    GOO, CAT, LIZARD, PONY, BUNNY, HARPY, KANGAROO, CHITINOUS_SPIDER_LEGS,
    DRIDER_LOWER_BODY, FOX, DRAGON, RACCOON, FERRET
}

export enum HipRating {
    BOYISH, SLENDER, AVERAGE, AMPLE, CURVY, FERTILE, INHUMANLY_WIDE
}

export enum TailType {
    NONE, HORSE, DOG, DEMONIC, COW, SPIDER_ABDOMEN, BEE_ABDOMEN, SHARK, CAT, LIZARD, BUNNY, HARPY, KANGAROO, FOX, DRACONIC, RACCOON, MOUSE, FERRET
}

export default class LowerBody implements SaveInterface {
    public type: LowerBodyType;
    public hipRating: HipRating;

    public tailType: TailType;

    //Tail venom is a 0-100 slider used for tail attacks. Recharges per hour.
    public tailVenom: number;
    //Tail recharge determines how fast venom/webs comes back per hour.
    public tailRecharge: number;

    private _cocks: CockSpot;
    public balls: number;
    public ballSize: number;

    private _vaginas: VaginaSpot;

    public butt: Butt;

    private _hasOvipositor: boolean;
    private _ovipositor: Ovipositor;

    public constructor() {
        this.type = LowerBodyType.HUMAN;
        this.hipRating = HipRating.BOYISH;

        this.tailType = TailType.NONE;
        this.tailVenom = 0;
        this.tailRecharge = 5;

        this._cocks = new CockSpot();
        this.balls = 0;
        this.ballSize = 0;

        this._vaginas = new VaginaSpot();

        this.butt = new Butt();

        this._ovipositor = new Ovipositor();
        this._hasOvipositor = false;
    }

    public get cockSpot() {
        return this._cocks;
    }
    public get vaginaSpot() {
        return this._vaginas;
    }
    public hasOvipositor(): boolean {
        return this._hasOvipositor;
    }
    public get ovipositor() {
        return this._hasOvipositor ? this._ovipositor : null;
    }

   public isBiped(): boolean {
        //Naga/Centaur
        if (this.type == LowerBodyType.NAGA || this.type == LowerBodyType.CENTAUR)
            return false;
        if (this.type == LowerBodyType.GOO || this.type == LowerBodyType.PONY)
            return false;
        return true;
    }

    public isNaga(): boolean {
        if (this.type == LowerBodyType.NAGA)
            return true;
        return false;
    }

    public isTaur(): boolean {
        if (this.type == LowerBodyType.CENTAUR || this.type == LowerBodyType.PONY)
            return true;
        return false;
    }

    public isDrider(): boolean {
        return (this.type == LowerBodyType.DRIDER_LOWER_BODY);
    }

    public isGoo(): boolean {
        if (this.type == LowerBodyType.GOO)
            return true;
        return false;
    }

    public hasLongTail(): boolean {
        if (this.isNaga())
            return true;
        switch (this.tailType) {
            case TailType.DOG:
            case TailType.DEMONIC:
            case TailType.COW:
            case TailType.SHARK:
            case TailType.CAT:
            case TailType.LIZARD:
            case TailType.KANGAROO:
            case TailType.FOX:
            case TailType.DRACONIC:
                return true;
            default:
                return false;
        }
    }
    saveKey: string = "LowerBody";
    save(): object {
        let saveObject: object = {};
        saveObject["type"] = this.type;
        saveObject["hipRating"] = this.hipRating;
        saveObject["tailType"] = this.tailType;
        saveObject["tailVenom"] = this.tailVenom;
        saveObject["tailRecharge"] = this.tailRecharge;
        saveObject[this._cocks.saveKey] = this._cocks.save();
        saveObject["balls"] = this.balls;
        saveObject["ballSize"] = this.ballSize;
        saveObject[this._vaginas.saveKey] = this._vaginas.save();
        saveObject[this.butt.saveKey] = this.butt.save();
        saveObject[this._ovipositor.saveKey] = this._ovipositor.save();
        saveObject["_hasOvipositor"] = this._hasOvipositor;

        return saveObject;
    }
    load(saveObject: object) {
        this.type = saveObject["type"];
        this.hipRating = saveObject["hipRating"];
        this.tailType = saveObject["tailType"];
        this.tailVenom = saveObject["tailVenom"];
        this.tailRecharge = saveObject["tailRecharge"];
        this._cocks.load(saveObject[this._cocks.saveKey]);
        this.balls = saveObject["balls"];
        this.ballSize = saveObject["ballSize"];
        this._vaginas.load(saveObject[this._vaginas.saveKey]);
        this.butt.load(saveObject[this.butt.saveKey]);
        this._ovipositor.load(saveObject[this._ovipositor.saveKey]);
        this._hasOvipositor = saveObject["_hasOvipositor"];
    }
}