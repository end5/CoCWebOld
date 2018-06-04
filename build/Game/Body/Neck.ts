import { Head } from './Head';
import { ISerializable } from '../../Engine/Utilities/ISerializable';

export class Neck implements ISerializable<Neck> {
    public gills: boolean = false;
    public readonly head: Head = new Head();

    public serialize(): object | undefined {
        return {
            gilles: this.gills,
            head: this.head.serialize()
        };
    }

    public deserialize(saveObject: Neck) {
        this.gills = saveObject.gills;
        this.head.deserialize(saveObject.head);
    }
}
