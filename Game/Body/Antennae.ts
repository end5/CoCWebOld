import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum AntennaeType {
    NONE, BEE
}

export class Antennae implements ISerializable<Antennae> {
    public type: AntennaeType = AntennaeType.NONE;

    public serialize(): object {
        return {
            type: this.type,
        };
    }

    public deserialize(saveObject: Antennae) {
        this.type = saveObject.type;
    }
}
