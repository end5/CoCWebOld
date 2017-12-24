import ISerializable from '../Utilities/ISerializable';

export enum SkinType {
    PLAIN, FUR, SCALES, GOO, UNDEFINED
}

export default class Skin implements ISerializable<Skin> {
    public type: SkinType = SkinType.PLAIN;
    public tone: string = "albino";
    public desc: string = "skin";
    public adj: string = "";

    public serialize(): string {
        return JSON.stringify({
            type: this.type,
            tone: this.tone,
            desc: this.desc,
            adj: this.adj
        });
    }

    public deserialize(saveObject: Skin): Skin {
        const newSkin = new Skin();
        newSkin.type = saveObject.type;
        newSkin.tone = saveObject.tone;
        newSkin.desc = saveObject.desc;
        newSkin.adj = saveObject.adj;
        return newSkin;
    }
}
