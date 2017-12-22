import SerializeInterface from '../SerializeInterface';

export enum SkinType {
    PLAIN, FUR, SCALES, GOO, UNDEFINED
}

export default class Skin implements SerializeInterface {
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

    public deserialize(saveObject: Skin) {
        this.type = saveObject.type;
        this.tone = saveObject.tone;
        this.desc = saveObject.desc;
        this.adj = saveObject.adj;
    }
}