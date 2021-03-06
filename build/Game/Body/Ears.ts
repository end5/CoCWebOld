import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum EarType {
    HUMAN, HORSE, DOG, COW, ELFIN, CAT, LIZARD, BUNNY, KANGAROO, FOX, DRAGON, RACCOON, MOUSE, FERRET
}

export class Ears implements ISerializable<Ears> {
    public type: EarType = EarType.HUMAN;
    public value: number = 0;

    public serialize(): object | undefined {
        return {
            type: this.type,
            value: this.value
        };
    }

    public deserialize(saveObject: Ears) {
        this.type = saveObject.type;
        this.value = saveObject.value;
    }
}
