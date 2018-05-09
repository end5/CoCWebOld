import { ISerializable } from './ISerializable';

export class Flags implements ISerializable<Flags> {
    public readonly list: object;
    private keys: object;

    public constructor(keys: object) {
        this.list = {};
        this.keys = keys;
    }

    public serialize(): string {
        return JSON.stringify(this.list);
    }

    public deserialize(saveObject: object): Flags {
        for (const key in Object.keys(this.keys)) {
            if (key in Object.keys(this.keys))
                this.keys[key] = saveObject[key];
        }
        return this;
    }
}
