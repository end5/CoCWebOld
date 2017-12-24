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

    public deserialize(saveObject: Beard): Beard {
        const newBeard = new Beard();
        newBeard.style = saveObject.style;
        newBeard.length = saveObject.length;
        return newBeard;
    }
}
