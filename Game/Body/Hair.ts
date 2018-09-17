import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum HairType {
    NORMAL, FEATHER, GHOST, GOO, ANEMONE
}

export class Hair implements ISerializable<Hair> {
    public type: HairType = HairType.NORMAL;
    public color: string = "black";
    public length: number = 0;

    public serialize(): object | undefined {
        return {
            type: this.type,
            color: this.color,
            length: this.length
        };
    }

    public deserialize(saveObject: Hair) {
        this.type = saveObject.type;
        this.color = saveObject.color;
        this.length = saveObject.length;
    }
}
