import Beard from './Beard';
import Eyes from './Eyes';
import Piercing from './Piercing';
import Tongue from './Tongue';
import ISerializable from '../Utilities/ISerializable';
import SerializableList from '../Utilities/SerializableList';

export enum FaceType {
    HUMAN, HORSE, DOG, COW_MINOTAUR, SHARK_TEETH, SNAKE_FANGS,
    CAT, LIZARD, BUNNY, KANGAROO, SPIDER_FANGS, FOX, DRAGON, RACCOON_MASK,
    RACCOON, BUCKTEETH, MOUSE, FERRET_MASK, FERRET
}

export default class Face implements ISerializable<Face>  {
    public type: FaceType = FaceType.HUMAN;
    public readonly eyes: Eyes = new Eyes();
    public readonly tongue: Tongue = new Tongue();
    public readonly beard: Beard = new Beard();
    public readonly piercings: SerializableList<Piercing> = new SerializableList<Piercing>(new Piercing().deserialize);

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

    public serialize(): string {
        return JSON.stringify({
            type: this.type,
            eyes: this.eyes.serialize(),
            tongue: this.tongue.serialize(),
            beard: this.beard.serialize(),
            piercings: this.piercings.serialize()
        });
    }

    public deserialize(saveObject: Face): Face {
        const newFace = new Face();
        newFace.type = saveObject.type;
        newFace.eyes.deserialize(saveObject.eyes);
        newFace.tongue.deserialize(saveObject.tongue);
        newFace.beard.deserialize(saveObject.beard);
        newFace.piercings.deserialize(saveObject.piercings);
        return newFace;
    }
}
