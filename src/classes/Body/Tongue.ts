import Piercing from './Piercing';
import ISerializable from '../Utilities/ISerializable';
import SerializableList from '../Utilities/SerializableList';

export enum TongueType {
    HUMAN, SNAKE, DEMONIC, DRACONIC
}

export default class Tongue implements ISerializable<Tongue> {
    public type: TongueType = TongueType.HUMAN;
    public readonly piercings: SerializableList<Piercing> = new SerializableList<Piercing>(new Piercing().deserialize);

    public serialize(): string {
        return JSON.stringify({
            type: this.type,
            piercings: this.piercings.serialize()
        });
    }

    public deserialize(saveObject: Tongue): Tongue {
        const newTongue = new Tongue();
        newTongue.type = saveObject.type;
        newTongue.piercings.deserialize(saveObject.piercings);
        return newTongue;
    }
}
