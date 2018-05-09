import { ISerializable } from '../../Engine/Utilities/ISerializable';

export class Clit implements ISerializable<Clit> {
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
