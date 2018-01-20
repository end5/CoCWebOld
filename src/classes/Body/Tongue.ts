import ISerializable from '../Utilities/ISerializable';
import SerializableList from '../Utilities/SerializableList';

export enum TongueType {
    HUMAN, SNAKE, DEMONIC, DRACONIC
}

export default class Tongue implements ISerializable<Tongue> {
    public type: TongueType = TongueType.HUMAN;

    public serialize(): string {
        return JSON.stringify({
            type: this.type
        });
    }

    public deserialize(saveObject: Tongue) {
        this.type = saveObject.type;
    }
}
