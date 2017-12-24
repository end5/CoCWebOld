import ISerializable from '../Utilities/ISerializable';

export enum EyeType {
    HUMAN, FOUR_SPIDER_EYES, BLACK_EYES_SAND_TRAP
}

export default class Eyes implements ISerializable<Eyes> {
    public type: EyeType = EyeType.HUMAN;

    public serialize(): string {
        return JSON.stringify({
            type: this.type
        });
    }

    public deserialize(saveObject: Eyes): Eyes {
        const newEyes = new Eyes();
        newEyes.type = saveObject.type;
        return newEyes;
    }
}
