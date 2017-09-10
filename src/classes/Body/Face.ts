export enum FaceType {
    HUMAN, HORSE, DOG, COW_MINOTAUR, SHARK_TEETH, SNAKE_FANGS,
    CAT, LIZARD, BUNNY, KANGAROO, SPIDER_FANGS, FOX, DRAGON, RACCOON_MASK,
    RACCOON, BUCKTEETH, MOUSE, FERRET_MASK, FERRET
}

export enum TongueType {
    HUMAN, SNAKE, DEMONIC, DRACONIC
}

export enum EyeType {
    HUMAN, FOUR_SPIDER_EYES, BLACK_EYES_SAND_TRAP
}

export default class Face {
    public faceType: FaceType;
    public eyeType: EyeType;
    public tongueType: TongueType;

    public lipPierced: number;
    public lipPShort: string;
    public lipPLong: string;
    public tonguePierced: number;
    public tonguePShort: string;
    public tonguePLong: string;
    public eyebrowPierced: number;
    public eyebrowPShort: string;
    public eyebrowPLong: string;
    public earsPierced: number;
    public earsPShort: string;
    public earsPLong: string;
    public nosePierced: number;
    public nosePShort: string;
    public nosePLong: string;

    public constructor() {
        this.faceType = FaceType.HUMAN;
        this.eyeType = EyeType.HUMAN;
        this.tongueType = TongueType.HUMAN;

        this.lipPierced = 0;
        this.lipPShort = "";
        this.lipPLong = "";
        this.tonguePierced = 0;
        this.tonguePShort = "";
        this.tonguePLong = "";
        this.eyebrowPierced = 0;
        this.eyebrowPShort = "";
        this.eyebrowPLong = "";
        this.earsPierced = 0;
        this.earsPShort = "";
        this.earsPLong = "";
        this.nosePierced = 0;
        this.nosePShort = "";
        this.nosePLong = "";

    }

    public hasMuzzle(): boolean {
        switch (this.faceType) {
            case FaceType.HORSE:
            case FaceType.DOG:
            case FaceType.CAT:
            case FaceType.LIZARD:
            case FaceType.KANGAROO:
            case FaceType.FOX:
            case FaceType.DRAGON:
                return true;
            default:
                return false;
        }
    }

}