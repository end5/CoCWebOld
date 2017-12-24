import SerializeInterface from '../SerializeInterface';

export enum HornType {
    NONE, DEMON, COW_MINOTAUR, DRACONIC_X2, DRACONIC_X4_12_INCH_LONG, ANTLERS
}

export default class Horns implements SerializeInterface {
    public type: HornType = HornType.NONE;
    public amount: number = 0;

    public serialize(): string {
        return JSON.stringify({
            type: this.type,
            amount: this.amount
        });
    }

    public deserialize(saveObject: Horns) {
        this.type = saveObject.type;
        this.amount = saveObject.amount;
    }
}
