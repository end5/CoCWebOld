import ISerializable from '../Utilities/ISerializable';
import SerializableList from '../Utilities/SerializableList';

export default class Clit implements ISerializable<Clit> {
    public length: number = 0.25;

    public serialize(): string {
        return JSON.stringify({
            length: this.length
        });
    }

    public deserialize(saveObject: Clit): Clit {
        const newClit = new Clit();
        newClit.length = saveObject.length;
        return newClit;
    }
}
