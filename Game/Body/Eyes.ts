import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum EyeType {
    HUMAN, FOUR_SPIDER_EYES, BLACK_EYES_SAND_TRAP
}

export class Eyes implements ISerializable<Eyes> {
    public type: EyeType = EyeType.HUMAN;

    public serialize(): object | undefined {
        return {
            type: this.type
        };
    }

    public deserialize(saveObject: Eyes) {
        this.type = saveObject.type;
    }
}
