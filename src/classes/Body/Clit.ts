import Piercing from './Piercing';
import ISerializable from '../Utilities/ISerializable';
import SerializableList from '../Utilities/SerializableList';

export default class Clit implements ISerializable<Clit> {
    public length: number = 0.25;
    public readonly piercings: SerializableList<Piercing> = new SerializableList(new Piercing().deserialize);

    public serialize(): string {
        return JSON.stringify({
            length: this.length,
            piercings: this.piercings.serialize()
        });
    }

    public deserialize(saveObject: Clit): Clit {
        const newClit = new Clit();
        newClit.length = saveObject.length;
        newClit.piercings.deserialize(saveObject.piercings);
        return newClit;
    }
}
