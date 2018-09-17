import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum SkinType {
    PLAIN, FUR, SCALES, GOO, UNDEFINED
}

export class Skin implements ISerializable<Skin> {
    public type: SkinType = SkinType.PLAIN;
    public tone: string = "albino";
    public desc: string = "skin";
    public adj: string = "";

    public serialize(): object | undefined {
        return {
            type: this.type,
            tone: this.tone,
            desc: this.desc,
            adj: this.adj
        };
    }

    public deserialize(saveObject: Skin) {
        this.type = saveObject.type;
        this.tone = saveObject.tone;
        this.desc = saveObject.desc;
        this.adj = saveObject.adj;
    }
}
