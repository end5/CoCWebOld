import Piercing from './Piercing';
import ISerializable from '../Utilities/ISerializable';
import SerializableList from '../Utilities/SerializableList';

export default class Labia implements ISerializable<Labia> {
    public readonly piercings: SerializableList<Piercing> = new SerializableList(new Piercing().deserialize);

    public serialize(): string {
        return JSON.stringify({
            piercings: this.piercings.serialize()
        });
    }

    public deserialize(saveObject: Labia): Labia {
        const newLabia = new Labia();
        newLabia.piercings.deserialize(saveObject.piercings);
        return newLabia;
    }
}
