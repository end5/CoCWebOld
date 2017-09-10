import Cock, { CockType as CockType } from "./Cock";

export default class CockSpot {
    private _cocks: Cock[];

    public constructor() {
        this._cocks = [];
    }

    public add(cock: Cock) {
        this._cocks.push(cock);
    }


    // Need event handler
    public remove(cock: Cock): void {
        let index = this._cocks.indexOf(cock);
        if (index >= 0) {
            if (cock.sock == "viridian") {
                removePerk(PerkLib.LustyRegeneration);
            }
            else if (cock.sock == "cockring") {
                let numRings: number = 0;
                for (let i: number = 0; i < cocks.length; i++) {
                    if (cocks[i].sock == "cockring")
                        numRings++;
                }

                if (numRings == 0)
                    removePerk(PerkLib.PentUp);
                else
                    setPerkValue(PerkLib.PentUp, 1, 5 + (numRings * 5));
            }
            this._cocks.splice(index, 1);
        }
    }

    public get list(): Cock[] {
        return this._cocks.slice();
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
        if (!hasCock())
            return false;
        return (this._cocks[0].cockLength >= 20);
    }

    public get smallestCocks(): Cock[] {
        return this._cocks.slice().sort((a: Cock, b: Cock) => {
            return a.cockArea - b.cockArea;
        });
    }

    public get biggestCocks(): Cock[] {
        return this._cocks.slice().sort((a: Cock, b: Cock) => {
            return b.cockArea - a.cockArea;
        });
    }

    public get shortestCock(): Cock[] {
        return this._cocks.slice().sort((a: Cock, b: Cock) => {
            return a.cockLength - b.cockLength;
        });
    }

    public get longestCock(): Cock[] {
        return this._cocks.slice().sort((a: Cock, b: Cock) => {
            return b.cockLength - a.cockLength;
        });
    }

    public get thinnestCockIndex(): Cock[] {
        return this._cocks.slice().sort((a: Cock, b: Cock) => {
            return a.cockThickness - b.cockThickness;
        });
    }

    public get thickestCock(): Cock[] {
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

    public biggestCocksThatFit(area: number = 0): Cock[] {
        return this.biggestCocks.filter((cock: Cock) => {
            if (cock.cockArea >= area)
                return cock;
        });
    }

    public longestCocksThatFit(length: number = 0): Cock[] {
        return this.biggestCocks.filter((cock: Cock) => {
            if (cock.cockLength >= length)
                return cock;
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