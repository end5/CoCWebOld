import Piercing from './Piercing';
import SerializeInterface from '../SerializeInterface';
import SerializableList from '../Utilities/SerializableList';

export enum TongueType {
    HUMAN, SNAKE, DEMONIC, DRACONIC
}

export default class Tongue implements SerializeInterface {
    public type: TongueType = TongueType.HUMAN;
    public readonly piercings: SerializableList<Piercing> = new SerializableList<Piercing>(Piercing);

    public serialize(): string {
        return JSON.stringify({
            type: this.type,
            piercings: this.piercings.serialize()
        });
    }
    
    public deserialize(saveObject: Tongue) {
        this.type = saveObject.type;
        this.piercings.deserialize(saveObject.piercings);
    }
}