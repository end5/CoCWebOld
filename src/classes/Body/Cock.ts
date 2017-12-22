import Piercing from './Piercing';
import SerializeInterface from '../SerializeInterface';
import { SortOption } from '../Utilities/list';
import SerializableList from '../Utilities/SerializableList';

export enum CockType {
    HUMAN, HORSE, DOG, DEMON, TENTACLE, CAT, LIZARD, ANEMONE, KANGAROO, DRAGON, DISPLACER, FOX, BEE, UNDEFINED
}

export default class Cock implements SerializeInterface {
    public length: number = 5.5;
    public thickness: number = 1;
    public type: CockType = CockType.HUMAN;
    public knotMultiplier: number = 1;
    public piercings: SerializableList<Piercing> = new SerializableList(Piercing);
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