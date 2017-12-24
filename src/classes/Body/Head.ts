import Ears from './Ears';
import Face from './Face';
import Hair from './Hair';
import Horns from './Horns';
import ISerializable from '../Utilities/ISerializable';

export enum AntennaeType {
    NONE, BEE
}

export default class Head implements ISerializable<Head> {
    public readonly hair: Hair = new Hair();
    public readonly ears: Ears = new Ears();
    public readonly horns: Horns = new Horns();
    public antennae: AntennaeType = AntennaeType.NONE;
    public readonly face: Face = new Face();

    public serialize(): string {
        return JSON.stringify({
            hair: this.hair.serialize(),
            ears: this.ears.serialize(),
            horns: this.horns.serialize(),
            antennae: this.antennae,
            face: this.face.serialize()
        });
    }

    public deserialize(saveObject: Head): Head {
        const newHead = new Head();
        newHead.hair.deserialize(saveObject.hair);
        newHead.ears.deserialize(saveObject.ears);
        newHead.horns.deserialize(saveObject.horns);
        newHead.antennae = saveObject.antennae;
        newHead.face.deserialize(saveObject.face);
        return newHead;
    }
}
