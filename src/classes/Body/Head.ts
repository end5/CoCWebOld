import Face from './Face';
import { SerializeInterface } from '../SerializeInterface';

export enum HairType {
    NORMAL, FEATHER, GHOST, GOO, ANEMONE
}

export enum EarType {
    HUMAN, HORSE, DOG, COW, ELFIN, CAT, LIZARD, BUNNY, KANGAROO, FOX, DRAGON, RACCOON, MOUSE, FERRET
}

export enum HornType {
    NONE, DEMON, COW_MINOTAUR, DRACONIC_X2, DRACONIC_X4_12_INCH_LONG, ANTLERS
}

export enum AntennaeType {
    NONE, BEE
}

export default class Head implements SerializeInterface {
    public hairType: HairType;
    public hairColor: string;
    public hairLength: number;

    public earType: EarType;
    public earValue: number;
    public earsPierced: number;
    public earsPShort: string;
    public earsPLong: string;

    public hornType: HornType;
    public horns: number;

    public antennae: AntennaeType;

    public face: Face;

    public constructor() {
        this.hairType = HairType.NORMAL;
        this.hairColor = "no";
        this.hairLength = 0;

        this.earType = EarType.HUMAN;
        this.earValue = 0;
        this.earsPierced = 0;
        this.earsPShort = "";
        this.earsPLong = "";

        this.hornType = HornType.NONE;
        this.horns = 0;

        this.antennae = AntennaeType.NONE;

        this.face = new Face();
    }

    serialKey: string = "Head";
    serialize(): string {
        let saveObject: object = {};
        saveObject["hairType"] = this.hairType;
        saveObject["hairColor"] = this.hairColor;
        saveObject["hairLength"] = this.hairLength;
        saveObject["earType"] = this.earType;
        saveObject["earValue"] = this.earValue;
        saveObject["earsPierced"] = this.earsPierced;
        saveObject["earsPShort"] = this.earsPShort;
        saveObject["earsPLong"] = this.earsPLong;
        saveObject["hornType"] = this.hornType;
        saveObject["horns"] = this.horns;
        saveObject["antennae"] = this.antennae;
        saveObject["face"] = this.face.serialize();
        return JSON.stringify(saveObject);
    }
    deserialize(saveObject: object) {
        this.hairType = saveObject["hairType"];
        this.hairColor = saveObject["hairColor"];
        this.hairLength = saveObject["hairLength"];
        this.earType = saveObject["earType"];
        this.earValue = saveObject["earValue"];
        this.earsPierced = saveObject["earsPierced"];
        this.earsPShort = saveObject["earsPShort"];
        this.earsPLong = saveObject["earsPLong"];
        this.hornType = saveObject["hornType"];
        this.horns = saveObject["horns"];
        this.antennae = saveObject["antennae"];
        this.face.deserialize(saveObject["face"]);
    }

}