import { ISerializable } from '../../Engine/Utilities/ISerializable';

export class Nipples implements ISerializable<Nipples> {
    public count: number = 1;
    public length: number = 0.25;
    public fuckable: boolean = false;

    public serialize(): object {
        return {
            count: this.count,
            fuckable: this.fuckable,
            length: this.length,
        };
    }

    public deserialize(saveObject: Nipples) {
        this.count = saveObject.count;
        this.length = saveObject.length;
        this.fuckable = saveObject.fuckable;
    }
}
