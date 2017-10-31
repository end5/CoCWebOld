import { SerializeInterface } from '../SerializeInterface';
import Utils from '../Utilities/Utils';

export enum CockType {
    HUMAN, HORSE, DOG, DEMON, TENTACLE, CAT, LIZARD, ANEMONE, KANGAROO, DRAGON, DISPLACER, FOX, BEE, UNDEFINED
}

export default class Cock implements SerializeInterface {
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

    public cockArea(): number {
        return this._cockThickness * this._cockLength;
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

    serialKey: string = "Cock";
    serialize(): string {
        return JSON.stringify({
            "_cockLength": this._cockLength,
            "_cockThickness": this._cockThickness,
            "_cockType": this._cockType,
            "_piercings": this._piercings,
            "_knotMultiplier": this._knotMultiplier,
            "_isPierced": this._isPierced,
            "_piercedShortDesc": this._piercedShortDesc,
            "_piercedLongDesc": this._piercedLongDesc,
            "_sock": this._sock
        });
    }
    deserialize(saveObject: object) {
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