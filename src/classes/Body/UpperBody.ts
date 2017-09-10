import Head from "./Head";
import Chest from "./Chest";

export enum ArmType {
    HUMAN, HARPY, SPIDER
}

export enum WingType {
    NONE, BEE_LIKE_SMALL, BEE_LIKE_LARGE, HARPY, IMP, BAT_LIKE_TINY, BAT_LIKE_LARGE, SHARK_FIN, FEATHERED_LARGE, DRACONIC_SMALL, DRACONIC_LARGE, GIANT_DRAGONFLY
}

export default class UpperBody {
    public head: Head;
    public gills: boolean;
    public armType: ArmType;
    public chest: Chest;
    public wingType: WingType;
    public wingDesc: string;

    public constructor() {
        this.head = new Head();
        this.gills = false;
        this.armType = ArmType.HUMAN;
        this.chest = new Chest();
        this.wingType = WingType.NONE;
        this.wingDesc = "non-existant";
    }
}