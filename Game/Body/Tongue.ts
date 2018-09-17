import { ISerializable } from '../../Engine/Utilities/ISerializable';

export enum TongueType {
    HUMAN, SNAKE, DEMONIC, DRACONIC
}

export class Tongue implements ISerializable<Tongue> {
    public type: TongueType = TongueType.HUMAN;

    public serialize(): object | undefined {
        return {
            type: this.type
        };
    }

    public deserialize(saveObject: Tongue) {
        this.type = saveObject.type;
    }
}
