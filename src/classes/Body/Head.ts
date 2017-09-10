import Face from "./Face";

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

export default class Head {
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
}