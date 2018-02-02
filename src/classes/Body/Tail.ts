import ISerializable from '../Utilities/ISerializable';
import { FilterOption, ReduceOption, SortOption } from '../Utilities/list';

export enum TailType {
    HORSE, DOG, DEMONIC, COW, SPIDER_ABDOMEN, BEE_ABDOMEN, SHARK, CAT, LIZARD, BUNNY, HARPY, KANGAROO, FOX, DRACONIC, RACCOON, MOUSE, FERRET
}

export default class Tail implements ISerializable<Tail> {
    public static VenomMost: SortOption<Tail> = (a: Tail, b: Tail) => {
        return a.vemon - b.vemon;
    }

    public static VenomLeast: SortOption<Tail> = (a: Tail, b: Tail) => {
        return b.vemon - a.vemon;
    }

    public static RechargeMost: SortOption<Tail> = (a: Tail, b: Tail) => {
        return a.recharge - b.recharge;
    }

    public static RechargeLeast: SortOption<Tail> = (a: Tail, b: Tail) => {
        return b.recharge - a.recharge;
    }

    public static Type(type: TailType): FilterOption<Tail> {
        return (tail: Tail) => {
            return tail.type === type;
        };
    }

    public static HasType(type: TailType): ReduceOption<Tail, boolean> {
        return (previousValue: boolean, currentValue: Tail) => {
            return previousValue || currentValue.type === type;
        };
    }

    public type: TailType;
    // Tail venom is a 0-100 slider used for tail attacks. Recharges per hour.
    public vemon: number = 0;
    // Tail recharge determines how fast venom/webs comes back per hour.
    public recharge: number = 0;

    public constructor(type: TailType = TailType.HORSE) {
        this.type = type;
    }

    // commented out for reminder that isNaga can no longer be checked here
    /*public hasLongTail(): boolean {
        switch (this.type) {
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
    }*/

    public static readonly HasLongTail: FilterOption<Tail> = (a: Tail) => {
        return a.hasLongTail();
    }

    public static readonly HasOvipositor: FilterOption<Tail> = (a: Tail) => {
        return a.type === TailType.BEE_ABDOMEN || a.type === TailType.SPIDER_ABDOMEN;
    }

    public serialize(): string {
        return JSON.stringify({
            type: this.type,
            vemon: this.vemon,
            recharge: this.recharge
        });
    }

    public deserialize(saveObject: Tail) {
        this.type = saveObject.type;
        this.vemon = saveObject.vemon;
        this.recharge = saveObject.recharge;
    }
}
