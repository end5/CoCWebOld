import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum HornType {
    NONE, DEMON, COW_MINOTAUR, DRACONIC_X2, DRACONIC_X4_12_INCH_LONG, ANTLERS
}

export class Horns implements ISerializable<Horns> {
    public type: HornType = HornType.NONE;
    public count: number = 0;

    public serialize(): object {
        return {
            type: this.type,
            count: this.count
        };
    }

    public deserialize(saveObject: Horns) {
        this.type = saveObject.type;
        this.count = saveObject.count;
    }
}
