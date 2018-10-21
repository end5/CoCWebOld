import { ISerializable } from '../../Engine/Utilities/ISerializable';

export class Neck implements ISerializable<Neck> {
    public gills: boolean = false;

    public serialize(): object {
        return {
            gilles: this.gills,
        };
    }

    public deserialize(saveObject: Neck) {
        this.gills = saveObject.gills;
    }
}
