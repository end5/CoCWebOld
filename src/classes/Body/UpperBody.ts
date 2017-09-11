import Head from "./Head";
import Chest from "./Chest";
import { SaveInterface } from "../SaveInterface";

export enum ArmType {
    HUMAN, HARPY, SPIDER
}

export enum WingType {
    NONE, BEE_LIKE_SMALL, BEE_LIKE_LARGE, HARPY, IMP, BAT_LIKE_TINY, BAT_LIKE_LARGE, SHARK_FIN, FEATHERED_LARGE, DRACONIC_SMALL, DRACONIC_LARGE, GIANT_DRAGONFLY
}

export default class UpperBody implements SaveInterface {
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

    saveKey: string = "UpperBody";
    save(): object {
        let saveObject: object = {};
        saveObject[this.head.saveKey] = this.head.save();
        saveObject["Gills"] = this.gills;
        saveObject["ArmType"] = this.armType;
        saveObject[this.chest.saveKey] = this.chest.save();
        saveObject["WingType"] = this.wingType;
        saveObject["WingDesc"] = this.wingDesc;

        return saveObject;
    }
    load(saveObject: object) {
        this.head.save() = saveObject[this.head.saveKey];
        this.gills = saveObject["Gills"];
        this.armType = saveObject["ArmType"];
        this.chest.save() = saveObject[this.chest.saveKey];
        this.wingType = saveObject["WingType"];
        this.wingDesc = saveObject["WingDesc"];
    }
}