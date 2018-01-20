import ISerializable from '../Utilities/ISerializable';

export default class Beard implements ISerializable<Beard> {
    public style: string = "";
    public length: number = 0;

    public serialize(): string {
        return JSON.stringify({
            style: this.style,
            length: this.length
        });
    }

    public deserialize(saveObject: Beard) {
        this.style = saveObject.style;
        this.length = saveObject.length;
    }
}
