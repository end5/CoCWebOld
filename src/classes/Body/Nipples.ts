import ISerializable from '../Utilities/ISerializable';

export default class Nipples implements ISerializable<Nipples> {
    public count: number = 1;
    public length: number = 0.25;
    public fuckable: boolean = false;

    public serialize(): string {
        return JSON.stringify({
            count: this.count,
            fuckable: this.fuckable,
            length: this.length,
        });
    }

    public deserialize(saveObject: Nipples) {
        this.count = saveObject.count;
        this.length = saveObject.length;
        this.fuckable = saveObject.fuckable;
    }
}
