import { Ears } from './Ears';
import { Face } from './Face';
import { Hair } from './Hair';
import { Horns } from './Horns';
import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum AntennaeType {
    NONE, BEE
}

export class Head implements ISerializable<Head> {
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

    public deserialize(saveObject: Head) {
        this.hair.deserialize(saveObject.hair);
        this.ears.deserialize(saveObject.ears);
        this.horns.deserialize(saveObject.horns);
        this.antennae = saveObject.antennae;
        this.face.deserialize(saveObject.face);
    }
}
