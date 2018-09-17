import { Beard } from './Beard';
import { Eyes } from './Eyes';
import { Tongue } from './Tongue';
import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum FaceType {
    HUMAN, HORSE, DOG, COW_MINOTAUR, SHARK_TEETH, SNAKE_FANGS,
    CAT, LIZARD, BUNNY, KANGAROO, SPIDER_FANGS, FOX, DRAGON, RACCOON_MASK,
    RACCOON, BUCKTEETH, MOUSE, FERRET_MASK, FERRET
}

export class Face implements ISerializable<Face>  {
    public type: FaceType = FaceType.HUMAN;
    public readonly eyes: Eyes = new Eyes();
    public readonly tongue: Tongue = new Tongue();
    public readonly beard: Beard = new Beard();

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

    public hasBeard(): boolean {
        return this.beard.length > 0;
    }

    public serialize(): object | undefined {
        return {
            type: this.type,
            eyes: this.eyes.serialize(),
            tongue: this.tongue.serialize(),
            beard: this.beard.serialize()
        };
    }

    public deserialize(saveObject: Face) {
        this.type = saveObject.type;
        this.eyes.deserialize(saveObject.eyes);
        this.tongue.deserialize(saveObject.tongue);
        this.beard.deserialize(saveObject.beard);
    }
}
