import Cock, { CockType } from './Cock';
import Body from './Creature';
import SerializeInterface from '../SerializeInterface';
import { FilterOption } from '../Utilities/list';
import SerializableList from '../Utilities/SerializableList';

export default class CockSpot extends SerializableList<Cock> {
    public remove(index: number): void {
        if (index >= 0) {
            if (cock.sock == "viridian") {
                body.perks.remove(PerkType.LustyRegeneration);
            }
            else if (cock.sock == "cockring") {
                let numRings: number = 0;
                for (let index: number = 0; index < this.list.length; index++) {
                    if (this.list[index].sock == "cockring")
                        numRings++;
                }

                if (numRings == 0)
                    body.perks.remove(PerkType.PentUp);
                else
                    body.perks.get(PerkType.PentUp).value1 = 5 + (numRings * 5);
            }
            this.list.splice(index, 1);
        }
    }

    // Note: DogCocks/FoxCocks are functionally identical. They actually change back and forth depending on some
    // of the PC's attributes, and this is recaluculated every hour spent at camp.
    // As such, delineating between the two is kind of silly.
    public filterType(type: CockType): Cock[] {
        return this.filter((cock: Cock) => {
            if (cock.type == type) {
                if (cock.type == CockType.DOG || cock.type == CockType.FOX)
                    return cock;
                else
                    return cock;
            }
        })
    }

    public totalCockThickness(): number {
        let totalCockThickness: number = 0;
        for (let cock of this.list)
            totalCockThickness = cock.thickness;
        return totalCockThickness;
    }


    public hasSockRoom(): boolean {
        for (let index = 0; index < this.list.length; index++)
            if (!this.list[index].hasSock)
                return true;
        return false;
    }

    public cockSocks(type: string = ""): Cock[] {
        return this.list.filter((a: Cock) => {
            if (a.sock == type || type == "")
                return a;
        });
    }

    public canAutoFellate(): boolean {
        if (!this.hasCock())
            return false;
        return (this.list[0].length >= 20);
    }

    public averageCockThickness(): number {
        let average: number = 0;
        for (let index = 0; index < this.list.length; index++)
            average += this.list[index].thickness;
        return (average / this.list.length);
    }

    public averageCockLength(): number {
        let average: number = 0;
        for (let index = 0; index < this.list.length; index++)
            average += this.list[index].length;
        return (average / this.list.length);
    }

    public hasSheath(): boolean {
        for (let index = 0; index < this.list.length; index++) {
            switch (this.list[index].type) {
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
        return this.list.length > 0 ? true : false;
    }

    public hasCockType(type: CockType): boolean {
        for (let index = 0; index < this.list.length; index++)
            if (this.list[index].type == type) {
                if (this.list[index].type == CockType.DOG || this.list[index].type == CockType.FOX)
                    return true;
                return true;
            }
        return false;
    }

    public hasKnot(): boolean {
        for (let index = 0; index < this.list.length; index++) {
            switch (this.list[index].type) {
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
            if (cocks[thinnest2].thickness > cocks[temp].thickness && temp != thinnest)
                thinnest2 = temp;
            temp++;
        }
        //If the two thicknesses added together are less than the arg, true, else false
        return cocks[thinnest].thickness + cocks[thinnest2].thickness < width;
    }*/
}