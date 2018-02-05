import ISerializable from '../Utilities/ISerializable';

export default class Clit implements ISerializable<Clit> {
    public length: number = 0.25;

    public serialize(): string {
        return JSON.stringify({
            length: this.length
        });
    }

    public deserialize(saveObject: Clit) {
        this.length = saveObject.length;
    }
}
