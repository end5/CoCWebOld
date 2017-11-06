import Chest from './Chest';
import Head from './Head';
import { SerializeInterface } from '../SerializeInterface';

export enum ArmType {
    HUMAN, HARPY, SPIDER
}

export enum WingType {
    NONE, BEE_LIKE_SMALL, BEE_LIKE_LARGE, HARPY, IMP, BAT_LIKE_TINY, BAT_LIKE_LARGE, SHARK_FIN, FEATHERED_LARGE, DRACONIC_SMALL, DRACONIC_LARGE, GIANT_DRAGONFLY
}

export default class UpperBody implements SerializeInterface {
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

    serialize(): string {
        let saveObject: object = {};
        saveObject["head"] = this.head.serialize();
        saveObject["Gills"] = this.gills;
        saveObject["ArmType"] = this.armType;
        saveObject["chest"] = this.chest.serialize();
        saveObject["WingType"] = this.wingType;
        saveObject["WingDesc"] = this.wingDesc;

        return JSON.stringify(saveObject);
    }
    deserialize(saveObject: object) {
        this.head.deserialize(saveObject["head"]);
        this.gills = saveObject["Gills"];
        this.armType = saveObject["ArmType"];
        this.chest.deserialize(saveObject["chest"]);
        this.wingType = saveObject["WingType"];
        this.wingDesc = saveObject["WingDesc"];
    }
}