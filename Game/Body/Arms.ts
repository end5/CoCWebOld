import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum ArmType {
    HUMAN, HARPY, SPIDER
}

export class Arms implements ISerializable<Arms> {
    public type: ArmType = ArmType.HUMAN;

    public serialize(): object {
        return {
            type: this.type
        };
    }

    public deserialize(saveObject: Arms) {
        this.type = saveObject.type;
    }
}
