import Piercing from './Piercing';
import SerializeInterface from '../SerializeInterface';
import { FilterOption, ReduceOption, SortOption } from '../Utilities/list';
import SerializableList from '../Utilities/SerializableList';

export enum CockType {
    HUMAN, HORSE, DOG, DEMON, TENTACLE, CAT, LIZARD, ANEMONE, KANGAROO, DRAGON, DISPLACER, FOX, BEE, UNDEFINED
}

export default class Cock implements SerializeInterface {
    public length: number = 5.5;
    public thickness: number = 1;
    public type: CockType = CockType.HUMAN;
    public knotMultiplier: number = 1;
    public readonly piercings: SerializableList<Piercing> = new SerializableList(Piercing);
    public sock: string = "";

    public cockArea(): number {
        return this.thickness * this.length;
    }

    public hasSock(): boolean {
        return this.sock != ("");
    }

    public hasSheath(): boolean {
        switch (this.type) {
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

    public hasKnot(): boolean {
        switch (this.type) {
            case CockType.DISPLACER:
            case CockType.DOG:
            case CockType.FOX:
                return true;
            default:
                return false;
        }
    }

    public canAutoFellate(): boolean {
        return this.length >= 20;
    }


    public static readonly HasSock: FilterOption<Cock> = (a: Cock) => {
        if (a.hasSock())
            return a;
    }

    public static readonly HasSheath: FilterOption<Cock> = (a: Cock) => {
        if (a.hasSheath())
            return a;
    }

    public static readonly HasKnot: FilterOption<Cock> = (a: Cock) => {
        if (a.hasKnot())
            return a;
    }

    public static readonly CanAutoFellate: FilterOption<Cock> = (a: Cock) => {
        if (a.canAutoFellate())
            return a;
    }

    public static readonly SmallestCockArea: SortOption<Cock> = (a: Cock, b: Cock) => {
        return a.cockArea() - b.cockArea();
    };

    public static readonly LargestCockArea: SortOption<Cock> = (a: Cock, b: Cock) => {
        return b.cockArea() - a.cockArea();
    };

    public static readonly ShortestCocks: SortOption<Cock> = (a: Cock, b: Cock) => {
        return a.length - b.length;
    };

    public static readonly LongestCocks: SortOption<Cock> = (a: Cock, b: Cock) => {
        return b.length - a.length;
    };

    public static readonly ThinnestCocks: SortOption<Cock> = (a: Cock, b: Cock) => {
        return a.thickness - b.thickness;
    };

    public static readonly ThickestCocks: SortOption<Cock> = (a: Cock, b: Cock) => {
        return b.thickness - a.thickness;
    };

    public static readonly TotalCockThickness: ReduceOption<Cock, number> = (previousValue: number, currentValue: Cock) => {
        return previousValue + currentValue.thickness;
    }

    public static readonly AverageCockThickness: ReduceOption<Cock, number> = (previousValue: number, currentValue: Cock, index: number, array:Cock[]) => {
        if (index >= array.length - 1)
            return previousValue / index;
        return previousValue + currentValue.thickness;
    }

    public static readonly AverageCockLength: ReduceOption<Cock, number> = (previousValue: number, currentValue: Cock, index: number, array:Cock[]) => {
        if (index >= array.length - 1)
            return previousValue / index;
        return previousValue + currentValue.length;
    }

    public serialize(): string {
        return JSON.stringify({
            length: this.length,
            thickness: this.thickness,
            type: this.type,
            knotMultiplier: this.knotMultiplier,
            piercings: this.piercings.serialize(),
            sock: this.sock
        });
    }

    public deserialize(saveObject: Cock) {
        this.length = saveObject.length;
        this.thickness = saveObject.thickness;
        this.type = saveObject.type;
        this.knotMultiplier = saveObject.knotMultiplier;
        this.piercings.deserialize(saveObject.piercings);
        this.sock = saveObject.sock;
    }
}