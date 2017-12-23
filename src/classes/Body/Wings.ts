import SerializeInterface from '../SerializeInterface';

export enum WingType {
    NONE, BEE_LIKE_SMALL, BEE_LIKE_LARGE, HARPY, IMP, BAT_LIKE_TINY, BAT_LIKE_LARGE, SHARK_FIN, FEATHERED_LARGE, DRACONIC_SMALL, DRACONIC_LARGE, GIANT_DRAGONFLY
}

export default class Wings implements SerializeInterface {
    public type: WingType = WingType.NONE;
    public desc: string = "non-existant";

    public serialize(): string {
        return JSON.stringify({
            type: this.type,
            desc: this.desc
        });
    }

    public deserialize(saveObject: Wings) {
        this.type = saveObject.type;
        this.desc = saveObject.desc;
    }
}