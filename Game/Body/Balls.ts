import { ISerializable } from '../../Engine/Utilities/ISerializable';

export class Balls implements ISerializable<Balls> {
    public count: number = 0;
    public size: number = 0;

    public serialize(): object {
        return {
            count: this.count,
            size: this.size
        };
    }

    public deserialize(saveObject: Balls) {
        this.count = saveObject.count;
        this.size = saveObject.size;
    }
}
