import ISerializable from '../Utilities/ISerializable';
import SerializableList from '../Utilities/SerializableList';

export enum EarType {
    HUMAN, HORSE, DOG, COW, ELFIN, CAT, LIZARD, BUNNY, KANGAROO, FOX, DRAGON, RACCOON, MOUSE, FERRET
}

export default class Ears implements ISerializable<Ears> {
    public type: EarType = EarType.HUMAN;
    public value: number = 0;

    public serialize(): string {
        return JSON.stringify({
            type: this.type,
            value: this.value
        });
    }

    public deserialize(saveObject: Ears): Ears {
        const newEars = new Ears();
        newEars.type = saveObject.type;
        newEars.value = saveObject.value;
        return newEars;
    }
}
