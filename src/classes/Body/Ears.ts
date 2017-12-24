import Piercing from './Piercing';
import SerializeInterface from '../SerializeInterface';
import SerializableList from '../Utilities/SerializableList';

export enum EarType {
    HUMAN, HORSE, DOG, COW, ELFIN, CAT, LIZARD, BUNNY, KANGAROO, FOX, DRAGON, RACCOON, MOUSE, FERRET
}

export default class Ears implements SerializeInterface {
    public type: EarType = EarType.HUMAN;
    public value: number = 0;
    public readonly piercings: SerializableList<Piercing> = new SerializableList<Piercing>(Piercing);

    public serialize(): string {
        return JSON.stringify({
            type: this.type,
            value: this.value,
            piercings: this.piercings.serialize()
        });
    }

    public deserialize(saveObject: Ears) {
        this.type = saveObject.type;
        this.value = saveObject.value;
        this.piercings.deserialize(saveObject.piercings);
    }
}
