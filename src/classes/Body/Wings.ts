import SerializeInterface from '../SerializeInterface';

export enum WingType {
    BEE_LIKE_SMALL, BEE_LIKE_LARGE, HARPY, IMP, BAT_LIKE_TINY, BAT_LIKE_LARGE, SHARK_FIN, FEATHERED_LARGE, DRACONIC_SMALL, DRACONIC_LARGE, GIANT_DRAGONFLY
}

export default class Wings implements SerializeInterface {
    public type: WingType = WingType.BEE_LIKE_SMALL;

    public serialize(): string {
        return JSON.stringify({
            desc: this.desc,
            type: this.type
        })
    }

    public deserialize(saveObject: Wings) {
        this.desc = saveObject.desc;
        this.type = saveObject.type;
    }
}