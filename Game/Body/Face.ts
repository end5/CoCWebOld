import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum FaceType {
    HUMAN, HORSE, DOG, COW_MINOTAUR, SHARK_TEETH, SNAKE_FANGS,
    CAT, LIZARD, BUNNY, KANGAROO, SPIDER_FANGS, FOX, DRAGON, RACCOON_MASK,
    RACCOON, BUCKTEETH, MOUSE, FERRET_MASK, FERRET
}

export class Face implements ISerializable<Face>  {
    public type: FaceType = FaceType.HUMAN;

    public hasMuzzle(): boolean {
        switch (this.type) {
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

    public serialize(): object {
        return {
            type: this.type,
        };
    }

    public deserialize(saveObject: Face) {
        this.type = saveObject.type;
    }
}
