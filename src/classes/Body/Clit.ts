import Piercing from './Piercing';
import SerializeInterface from '../SerializeInterface';
import SerializableList from '../Utilities/SerializableList';

export default class Clit implements SerializeInterface {
    public readonly piercings: SerializableList<Piercing> = new SerializableList(Piercing);
    public length: number = 0.25;

    public serialize(): string {
        return JSON.stringify({
            length: this.length,
            piercings: this.piercings.serialize()
        });
    }

    public deserialize(saveObject: Clit) {
        this.length = saveObject.length;
        this.piercings.deserialize(saveObject.piercings);
    }
}
