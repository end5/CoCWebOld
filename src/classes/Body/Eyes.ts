import SerializeInterface from '../SerializeInterface';

export enum EyeType {
    HUMAN, FOUR_SPIDER_EYES, BLACK_EYES_SAND_TRAP
}

export default class Eyes implements SerializeInterface {
    public type: EyeType = EyeType.HUMAN;

    public serialize(): string {
        return JSON.stringify({
            type: this.type
        });
    }

    public deserialize(saveObject: Eyes) {
        this.type = saveObject.type;
    }
}