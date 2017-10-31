import Cock, { CockType } from './Cock';
import Creature from './Creature';
import { SerializeInterface } from '../SerializeInterface';

export default class CockSpot implements SerializeInterface {
    private _cocks: Cock[];

    public constructor() {
        this._cocks = [];
    }

    public add(cock: Cock) {
        this._cocks.push(cock);
    }

    public remove(body: Creature, cock: Cock): void {
        let index = this._cocks.indexOf(cock);
        if (index >= 0) {
            if (cock.sock == "viridian") {
                body.perks.remove("LustyRegeneration");
            }
            else if (cock.sock == "cockring") {
                let numRings: number = 0;
                for (let index: number = 0; index < this._cocks.length; index++) {
                    if (this._cocks[index].sock == "cockring")
                        numRings++;
                }

                if (numRings == 0)
                    body.perks.remove("PentUp");
                else
                    body.perks.get("PentUp").value1 = 5 + (numRings * 5);
            }
            this._cocks.splice(index, 1);
        }
    }

    public get(index: number): Cock {
        return index >= 0 && index < this._cocks.length ? this._cocks[index] : null;
    }

    public count(): number {
        return this._cocks.length;
    }

    // Note: DogCocks/FoxCocks are functionally identical. They actually change back and forth depending on some
    // of the PC's attributes, and this is recaluculated every hour spent at camp.
    // As such, delineating between the two is kind of silly.
    public countType(type: CockType): number {
        let count: number = 0;
        for (let index = 0; index < this._cocks.length; index++)
            if (this._cocks[index].cockType == type) {
                if (this._cocks[index].cockType == CockType.DOG || this._cocks[index].cockType == CockType.FOX)
                    count++;
                else
                    count++;
            }
        return count;
    }


    public hasSockRoom(): boolean {
        for (let index = 0; index < this._cocks.length; index++)
            if (!this._cocks[index].hasSock)
                return true;
        return false;
    }

    public cockSocks(type: string = ""): Cock[] {
        return this._cocks.filter((a: Cock) => {
            if (a.sock == type || type == "")
                return a;
        });
    }

    public canAutoFellate(): boolean {
        if (!this.hasCock())
            return false;
        return (this._cocks[0].cockLength >= 20);
    }

    public get listSmallestCockArea(): Cock[] {
        return this._cocks.slice().sort((a: Cock, b: Cock) => {
            return a.cockArea() - b.cockArea();
        });
    }

    public get listLargestCockArea(): Cock[] {
        return this._cocks.slice().sort((a: Cock, b: Cock) => {
            return b.cockArea() - a.cockArea();
        });
    }

    public get listShortestCocks(): Cock[] {
        return this._cocks.slice().sort((a: Cock, b: Cock) => {
            return a.cockLength - b.cockLength;
        });
    }

    public get listLongestCocks(): Cock[] {
        return this._cocks.slice().sort((a: Cock, b: Cock) => {
            return b.cockLength - a.cockLength;
        });
    }

    public get listThinnestCocks(): Cock[] {
        return this._cocks.slice().sort((a: Cock, b: Cock) => {
            return a.cockThickness - b.cockThickness;
        });
    }

    public get listThickestCocks(): Cock[] {
        return this._cocks.slice().sort((a: Cock, b: Cock) => {
            return b.cockThickness - a.cockThickness;
        });
    }

    public get totalCockThickness(): number {
        let totalCockThickness: number = 0;
        for (let cock of this._cocks)
            totalCockThickness = cock.cockThickness;
        return totalCockThickness;
    }

    public listLargestCocksThatFits(area: number = 0): Cock[] {
        return this.listLargestCockArea.filter((cock: Cock) => {
            if (cock.cockArea() >= area)
                return cock;
        });
    }

    public listLongestCocksThatFits(length: number = 0): Cock[] {
        return this.listLargestCockArea.filter((cock: Cock) => {
            if (cock.cockLength >= length)
                return cock;
        });
    }

    public listCockType(cockType: CockType): Cock[] {
        return this.listLargestCockArea.filter((cock: Cock) => {
            if (cock.cockType == cockType) {
                if (cock.cockType == CockType.DOG || cock.cockType == CockType.FOX)
                    return cock;
                else
                    return cock;
            }

        });
    }

    public listNotCockType(cockType: CockType): Cock[] {
        return this.listLargestCockArea.filter((cock: Cock) => {
            if (cock.cockType != cockType) {
                if (cock.cockType == CockType.DOG || cock.cockType == CockType.FOX)
                    return cock;
                else
                    return cock;
            }

        });
    }

    public averageCockThickness(): number {
        let average: number = 0;
        for (let index = 0; index < this._cocks.length; index++)
            average += this._cocks[index].cockThickness;
        return (average / this._cocks.length);
    }

    public averageCockLength(): number {
        let average: number = 0;
        for (let index = 0; index < this._cocks.length; index++)
            average += this._cocks[index].cockLength;
        return (average / this._cocks.length);
    }

    public hasSheath(): boolean {
        for (let index = 0; index < this._cocks.length; index++) {
            switch (this._cocks[index].cockType) {
                case CockType.CAT:
                case CockType.DISPLACER:
                case CockType.DOG:
                case CockType.FOX:
                case CockType.HORSE:
                case CockType.KANGAROO:
                    return true;
                default:
            }
        }
        return false;
    }

    public hasCock(): boolean {
        return this._cocks.length > 0 ? true : false;
    }

    public hasCockType(type: CockType): boolean {
        for (let index = 0; index < this._cocks.length; index++)
            if (this._cocks[index].cockType == type) {
                if (this._cocks[index].cockType == CockType.DOG || this._cocks[index].cockType == CockType.FOX)
                    return true;
                return true;
            }
        return false;
    }

    public hasKnot(): boolean {
        for (let index = 0; index < this._cocks.length; index++) {
            switch (this._cocks[index].cockType) {
                case CockType.DISPLACER:
                case CockType.DOG:
                case CockType.FOX:
                    return true;
                default:
            }
        }
        return false;
    }

    serialKey: string = "CockSpot";
    serialize(): string {
        let saveObject: object;
        saveObject["length"] = this._cocks.length;
        for (let index = 0; index < this._cocks.length; index++) {
            saveObject[index] = this._cocks[index].serialize();
        }
        return JSON.stringify(saveObject);
    }
    deserialize(saveObject: object) {
        if (!saveObject["length"] || saveObject["length"] < 0) {
            console.error("Cock amount non zero.");
            return;
        }
        this._cocks = [];
        for (let index = 0; index < saveObject["length"]; index++) {
            this._cocks.push(new Cock());
            this._cocks[index].deserialize(saveObject[index]);
        }
    }

    /*   IDK
    public twoDickRadarSpecial(width: number): boolean {
        //No two dicks?  FUCK OFF
        if (cockTotal() < 2)
            return false;

        //Set up vars
        //Get thinnest, work done already
        let thinnest: number = thinnestCockIndex();
        let thinnest2: number = 0;
        //For ze loop
        let temp: number = 0;
        //Make sure they arent the same at initialization
        if (thinnest2 == thinnest)
            thinnest2 = 1;
        //Loop through to find 2nd thinnest
        while (temp < cocks.length) {
            if (cocks[thinnest2].cockThickness > cocks[temp].cockThickness && temp != thinnest)
                thinnest2 = temp;
            temp++;
        }
        //If the two thicknesses added together are less than the arg, true, else false
        return cocks[thinnest].cockThickness + cocks[thinnest2].cockThickness < width;
    }*/
}