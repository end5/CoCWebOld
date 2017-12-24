import Piercing from './Piercing';
import SerializeInterface from '../SerializeInterface';
import SerializableList from '../Utilities/SerializableList';

export default class Labia implements SerializeInterface {
    public readonly piercings: SerializableList<Piercing> = new SerializableList(Piercing);

    public serialize(): string {
        return JSON.stringify({
            piercings: this.piercings.serialize()
        });
    }

    public deserialize(saveObject: Labia) {
        this.piercings.deserialize(saveObject.piercings);
    }
}
