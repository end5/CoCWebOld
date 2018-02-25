import ISerializable from '../Utilities/ISerializable';
import { FilterOption, ReduceOption, SortOption } from '../Utilities/list';

export enum CockType {
    HUMAN, HORSE, DOG, DEMON, TENTACLE, CAT, LIZARD, ANEMONE, KANGAROO, DRAGON, DISPLACER, FOX, BEE, UNDEFINED
}

export default class Cock implements ISerializable<Cock> {
    public static readonly SmallestCockArea: SortOption<Cock> = (a: Cock, b: Cock) => {
        return a.area - b.area;
    }

    public static readonly LargestCockArea: SortOption<Cock> = (a: Cock, b: Cock) => {
        return b.area - a.area;
    }

    public static readonly ShortestCocks: SortOption<Cock> = (a: Cock, b: Cock) => {
        return a.length - b.length;
    }

    public static readonly LongestCocks: SortOption<Cock> = (a: Cock, b: Cock) => {
        return b.length - a.length;
    }

    public static readonly ThinnestCocks: SortOption<Cock> = (a: Cock, b: Cock) => {
        return a.thickness - b.thickness;
    }

    public static readonly ThickestCocks: SortOption<Cock> = (a: Cock, b: Cock) => {
        return b.thickness - a.thickness;
    }

    public static readonly LargestKnot: SortOption<Cock> = (a: Cock, b: Cock) => {
        return a.knotMultiplier - b.knotMultiplier;
    }

    public static readonly SmallestKnot: SortOption<Cock> = (a: Cock, b: Cock) => {
        return b.knotMultiplier - a.knotMultiplier;
    }

    public static readonly HasSheath: FilterOption<Cock> = (a: Cock) => {
        return a.hasSheath();
    }

    public static readonly HasKnot: FilterOption<Cock> = (a: Cock) => {
        return a.hasKnot();
    }

    public static readonly CanAutoFellate: FilterOption<Cock> = (a: Cock) => {
        return a.canAutoFellate();
    }

    public static readonly TotalCockThickness: ReduceOption<Cock, number> = (previousValue: number, currentValue: Cock) => {
        return previousValue + currentValue.thickness;
    }

    public static readonly TotalCockLength: ReduceOption<Cock, number> = (previousValue: number, currentValue: Cock) => {
        return previousValue + currentValue.thickness;
    }

    public static readonly AverageCockThickness: ReduceOption<Cock, number> = (previousValue: number, currentValue: Cock, index: number, array: Cock[]) => {
        if (index >= array.length - 1)
            return previousValue / index;
        return previousValue + currentValue.thickness;
    }

    public static readonly AverageCockLength: ReduceOption<Cock, number> = (previousValue: number, currentValue: Cock, index: number, array: Cock[]) => {
        if (index >= array.length - 1)
            return previousValue / index;
        return previousValue + currentValue.length;
    }

    // Note: DogCocks/FoxCocks are functionally identical. They actually change back and forth depending on some
    // of the PC's attributes, and this is recaluculated every hour spent at camp.
    // As such, delineating between the two is kind of silly.
    public static FilterType(type: CockType): FilterOption<Cock> {
        return (a: Cock) => {
            return a.type === type && (a.type === CockType.DOG || a.type === CockType.FOX);
        };
    }

    public static CockThatFits(area: number): FilterOption<Cock> {
        return (a: Cock) => {
            return a.area <= area;
        };
    }

    /**
     * Filter selected cock.area >= supplied area.
     * @param area Area
     */
    public static LargerThan(area: number): FilterOption<Cock> {
        return (a: Cock) => {
            return a.area >= area;
        };
    }

    /**
     * Filter selected cock.length >= supplied length.
     * @param length Length
     */
    public static LongerThan(length: number): FilterOption<Cock> {
        return (a: Cock) => {
            return a.length >= length;
        };
    }

    public length: number;
    public thickness: number;
    public type: CockType;
    public knotMultiplier: number;

    public constructor(type: CockType = CockType.HUMAN, length: number = 5.5, thickness: number = 1, knotMultiplier: number = 1) {
        this.type = type;
        this.length = length;
        this.thickness = thickness;
        this.knotMultiplier = knotMultiplier;
    }

    public get area(): number {
        return this.thickness * this.length;
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

    public serialize(): string {
        return JSON.stringify({
            length: this.length,
            thickness: this.thickness,
            type: this.type,
            knotMultiplier: this.knotMultiplier
        });
    }

    public deserialize(saveObject: Cock) {
        this.length = saveObject.length;
        this.thickness = saveObject.thickness;
        this.type = saveObject.type;
        this.knotMultiplier = saveObject.knotMultiplier;
    }
}
