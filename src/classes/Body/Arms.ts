import SerializeInterface from '../SerializeInterface';

export enum ArmType {
    HUMAN, HARPY, SPIDER
}

export default class Arms implements SerializeInterface {
    public type: ArmType = ArmType.HUMAN;

    public serialize(): string {
        return JSON.stringify({
            type: this.type
        });
    }

    public deserialize(saveObject: Arms) {
        this.type = saveObject.type;
    }
}