import Utils from "../Utilities/Utils";
import { SaveInterface } from "../SaveInterface";

export enum CockType {
    HUMAN, HORSE, DOG, DEMON, TENTACLE, CAT, LIZARD, ANEMONE, KANGAROO, DRAGON, DISPLACER, FOX, BEE, UNDEFINED
}

export default class Cock implements SaveInterface {
    private _cockLength: number;
    private _cockThickness: number;
    private _cockType: CockType;

    //Used to determine thickness of knot relative to normal thickness
    private _knotMultiplier: number;

    //Piercing info
    private _isPierced: boolean;
    private _piercings: number;
    //Not yet, sweet prince. PiercedType current has no uses. But it will, one day.
    // private _pierceType:PiercingTypesEnum;
    private _piercedShortDesc: string;
    private _piercedLongDesc: string;

    //Sock
    private _sock: string;

    public constructor(cockLength: number = 5.5, cockThickness: number = 1, cockType: CockType = CockType.HUMAN) {
        this._cockLength = cockLength;
        this._cockThickness = cockThickness;
        this._cockType = cockType;

        this._piercings = 0;
        this._knotMultiplier = 1;

        this._isPierced = false;
        //this.pierceType = PiercingTypesEnum.NONE;
        this._piercedShortDesc = "";
        this._piercedLongDesc = "";
        this._sock = "";
    }

    public get cockArea(): number {
        return this._cockThickness * this._cockLength;
    }

    public growCock(lengthDelta: number, bigCock: boolean): number {

        if (lengthDelta == 0) {
            ("Whoops! growCock called with 0, aborting...");
            return lengthDelta;
        }

        let threshhold: number = 0;
        console.trace("growcock starting at:" + lengthDelta);

        if (lengthDelta > 0) { // growing
            console.trace("and growing...");
            threshhold = 24;
            // BigCock Perk increases incoming change by 50% and adds 12 to the length before diminishing returns set in
            if (bigCock) {
                console.trace("growCock found BigCock Perk");
                lengthDelta *= 1.5;
                threshhold += 12;
            }
            // Not a human cock? Multiple the length before dimishing returns set in by 3
            if (this._cockType != CockType.HUMAN)
                threshhold *= 2;
            // Modify growth for cock socks
            if (this._sock == "scarlet") {
                console.trace("growCock found Scarlet sock");
                lengthDelta *= 1.5;
            }
            else if (this._sock == "cobalt") {
                console.trace("growCock found Cobalt sock");
                lengthDelta *= .5;
            }
            // Do diminishing returns
            if (this._cockLength > threshhold)
                lengthDelta /= 4;
            else if (this._cockLength > threshhold / 2)
                lengthDelta /= 2;
        }
        else {
            console.trace("and shrinking...");

            threshhold = 0;
            // BigCock Perk doubles the incoming change value and adds 12 to the length before diminishing returns set in
            if (bigCock) {
                console.trace("growCock found BigCock Perk");
                lengthDelta *= 0.5;
                threshhold += 12;
            }
            // Not a human cock? Add 12 to the length before dimishing returns set in
            if (this._cockType != CockType.HUMAN)
                threshhold += 12;
            // Modify growth for cock socks
            if (this._sock == "scarlet") {
                console.trace("growCock found Scarlet sock");
                lengthDelta *= 0.5;
            }
            else if (this._sock == "cobalt") {
                console.trace("growCock found Cobalt sock");
                lengthDelta *= 1.5;
            }
            // Do diminishing returns
            if (this._cockLength > threshhold)
                lengthDelta /= 3;
            else if (this._cockLength > threshhold / 2)
                lengthDelta /= 2;
        }

        console.trace("then changing by: " + lengthDelta);

        this._cockLength += lengthDelta;

        if (this._cockLength < 1)
            this._cockLength = 1;

        if (this._cockThickness > this._cockLength * .33)
            this._cockThickness = this._cockLength * .33;

        return lengthDelta;
    }

    public thickenCock(increase: number): number {
        let amountGrown: number = 0;
        let temp: number = 0;
        if (increase > 0) {
            while (increase > 0) {
                if (increase < 1)
                    temp = increase;
                else
                    temp = 1;
                //Cut thickness growth for huge dicked
                if (this._cockThickness > 1 && this._cockLength < 12) {
                    temp /= 4;
                }
                if (this._cockThickness > 1.5 && this._cockLength < 18)
                    temp /= 5;
                if (this._cockThickness > 2 && this._cockLength < 24)
                    temp /= 5;
                if (this._cockThickness > 3 && this._cockLength < 30)
                    temp /= 5;
                //proportional thickness diminishing returns.
                if (this._cockThickness > this._cockLength * .15)
                    temp /= 3;
                if (this._cockThickness > this._cockLength * .20)
                    temp /= 3;
                if (this._cockThickness > this._cockLength * .30)
                    temp /= 5;
                //massive thickness limiters
                if (this._cockThickness > 4)
                    temp /= 2;
                if (this._cockThickness > 5)
                    temp /= 2;
                if (this._cockThickness > 6)
                    temp /= 2;
                if (this._cockThickness > 7)
                    temp /= 2;
                //Start adding up bonus length
                amountGrown += temp;
                this._cockThickness += temp;
                temp = 0;
                increase--;
            }
            increase = 0;
        }
        else if (increase < 0) {
            while (increase < 0) {
                temp = -1;
                //Cut length growth for huge dicked
                if (this._cockThickness <= 1)
                    temp /= 2;
                if (this._cockThickness < 2 && this._cockLength < 10)
                    temp /= 2;
                //Cut again for massively dicked
                if (this._cockThickness < 3 && this._cockLength < 18)
                    temp /= 2;
                if (this._cockThickness < 4 && this._cockLength < 24)
                    temp /= 2;
                //MINIMUM Thickness of OF .5!
                if (this._cockThickness <= .5)
                    temp = 0;
                //Start adding up bonus length
                amountGrown += temp;
                this._cockThickness += temp;
                temp = 0;
                increase++;
            }
        }
        console.trace("thickenCock called and thickened by: " + amountGrown);
        return amountGrown;
    }

    public get cockLength(): number {
        return this._cockLength;
    }

    public set cockLength(value: number) {
        this._cockLength = value;
    }

    public get cockThickness(): number {
        return this._cockThickness;
    }

    public set cockThickness(value: number) {
        this._cockThickness = value;
    }

    public get cockType(): CockType {
        return this._cockType;
    }

    public set cockType(value: CockType) {
        this._cockType = value;
    }

    public get knotMultiplier(): number {
        return this._knotMultiplier;
    }

    public set knotMultiplier(value: number) {
        this._knotMultiplier = value;
    }

    public get pierced(): boolean {
        return this._isPierced;
    }

    public set pierced(value: boolean) {
        this._isPierced = value;
    }

    public get piercedShortDesc(): string {
        return this._piercedShortDesc;
    }

    public set piercedShortDesc(value: string) {
        this._piercedShortDesc = value;
    }

    public get piercedLongDesc(): string {
        return this._piercedLongDesc;
    }

    public set piercedLongDesc(value: string) {
        this._piercedLongDesc = value;
    }

    public get sock(): string {
        return this._sock;
    }

    public set sock(value: string) {
        this._sock = value;
    }

    public hasSock(): boolean {
        return this._sock != ("");
    }

    public get piercings(): number {
        return this._piercings;
    }

    public set piercings(value: number) {
        this._piercings = value;
    }

    public hasSheath(): boolean {
        switch (this.cockType) {
            case CockType.CAT:
            case CockType.DISPLACER:
            case CockType.DOG:
            case CockType.FOX:
            case CockType.HORSE:
            case CockType.KANGAROO:
                return true;
            default:
                return false;
        }
    }

    saveKey: string = "Cock";
    save(): object {
        return {
            "_cockLength": this._cockLength,
            "_cockThickness": this._cockThickness,
            "_cockType": this._cockType,
            "_piercings": this._piercings,
            "_knotMultiplier": this._knotMultiplier,
            "_isPierced": this._isPierced,
            "_piercedShortDesc": this._piercedShortDesc,
            "_piercedLongDesc": this._piercedLongDesc,
            "_sock": this._sock
        };
    }
    load(saveObject: object) {
        this._cockLength = saveObject["_cockLength"];
        this._cockThickness = saveObject["_cockThickness"];
        this._cockType = saveObject["_cockType"];
        this._piercings = saveObject["_piercings"];
        this._knotMultiplier = saveObject["_knotMultiplier"];
        this._isPierced = saveObject["_isPierced"];
        this._piercedShortDesc = saveObject["_piercedShortDesc"];
        this._piercedLongDesc = saveObject["_piercedLongDesc"];
        this._sock = saveObject["_sock"];
    }

}