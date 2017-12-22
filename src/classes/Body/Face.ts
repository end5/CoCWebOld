import SerializeInterface from '../SerializeInterface';

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

export default class Face implements SerializeInterface {
    public faceType: FaceType;
    public eyeType: EyeType;
    public tongueType: TongueType;
    
    public beardLength: number;
    public beardStyle: number;

    public lipPierced: number;
    public lipPShort: string;
    public lipPLong: string;
    public tonguePierced: number;
    public tonguePShort: string;
    public tonguePLong: string;
    public eyebrowPierced: number;
    public eyebrowPShort: string;
    public eyebrowPLong: string;
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

    public hasBeard(): boolean {
		return this.beardLength > 0;
	}

    serialize(): string {
        return JSON.stringify({
            "faceType": this.faceType,
            "eyeType": this.eyeType,
            "tongueType": this.tongueType,
            "lipPierced": this.lipPierced,
            "lipPShort": this.lipPShort,
            "lipPLong": this.lipPLong,
            "tonguePierced": this.tonguePierced,
            "tonguePShort": this.tonguePShort,
            "tonguePLong": this.tonguePLong,
            "eyebrowPierced": this.eyebrowPierced,
            "eyebrowPShort": this.eyebrowPShort,
            "eyebrowPLong": this.eyebrowPLong,
            "nosePierced": this.nosePierced,
            "nosePShort": this.nosePShort,
            "nosePLong": this.nosePLong
        });
    }
    deserialize(saveObject: object) {
        this.faceType = saveObject["faceType"];
        this.eyeType = saveObject["eyeType"];
        this.tongueType = saveObject["tongueType"];
        this.lipPierced = saveObject["lipPierced"];
        this.lipPShort = saveObject["lipPShort"];
        this.lipPLong = saveObject["lipPLong"];
        this.tonguePierced = saveObject["tonguePierced"];
        this.tonguePShort = saveObject["tonguePShort"];
        this.tonguePLong = saveObject["tonguePLong"];
        this.eyebrowPierced = saveObject["eyebrowPierced"];
        this.eyebrowPShort = saveObject["eyebrowPShort"];
        this.eyebrowPLong = saveObject["eyebrowPLong"];
        this.nosePierced = saveObject["nosePierced"];
        this.nosePShort = saveObject["nosePShort"];
        this.nosePLong = saveObject["nosePLong"];
    }

}