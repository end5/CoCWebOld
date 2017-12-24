import Piercing from './Piercing';
import ISerializable from '../Utilities/ISerializable';
import SerializableList from '../Utilities/SerializableList';

export enum EarType {
    HUMAN, HORSE, DOG, COW, ELFIN, CAT, LIZARD, BUNNY, KANGAROO, FOX, DRAGON, RACCOON, MOUSE, FERRET
}

export default class Ears implements ISerializable<Ears> {
    public type: EarType;
    public value: number;
    public readonly piercings: SerializableList<Piercing>;

    public constructor(type: EarType = EarType.HUMAN) {
        this.type = type;
        this.value = 0;
        this.piercings = new SerializableList<Piercing>(new Piercing().deserialize);
    }

    public serialize(): string {
        return JSON.stringify({
            type: this.type,
            value: this.value,
            piercings: this.piercings.serialize()
        });
    }

    public deserialize(saveObject: Ears): Ears {
        const newEars = new Ears();
        newEars.type = saveObject.type;
        newEars.value = saveObject.value;
        newEars.piercings.deserialize(saveObject.piercings);
        return newEars;
    }
}
