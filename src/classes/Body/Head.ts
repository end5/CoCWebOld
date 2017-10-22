import Face from './Face';
import { SaveInterface } from '../SaveInterface';

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

export default class Head implements SaveInterface{
    public hairType: HairType;
    public hairColor: string;
    public hairLength: number;

    public earType: EarType;
    public earValue: number;

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

        this.hornType = HornType.NONE;
        this.horns = 0;

        this.antennae = AntennaeType.NONE;

        this.face = new Face();
    }

    saveKey: string;
    save(): object {
        let saveObject: object = {};
        saveObject["hairType"] = this.hairType;
        saveObject["hairColor"] = this.hairColor;
        saveObject["hairLength"] = this.hairLength;
        saveObject["earType"] = this.earType;
        saveObject["earValue"] = this.earValue;
        saveObject["hornType"] = this.hornType;
        saveObject["horns"] = this.horns;
        saveObject["antennae"] = this.antennae;
        saveObject[this.face.saveKey] = this.face.save();
        return saveObject;
    }
    load(saveObject: object) {
        this.hairType = saveObject["hairType"];
        this.hairColor = saveObject["hairColor"];
        this.hairLength = saveObject["hairLength"];
        this.earType = saveObject["earType"];
        this.earValue = saveObject["earValue"];
        this.hornType = saveObject["hornType"];
        this.horns = saveObject["horns"];
        this.antennae = saveObject["antennae"];
        this.face.load(saveObject[this.face.saveKey]);
    }

}