import SerializeInterface from '../SerializeInterface';

export default class Balls implements SerializeInterface {
    public quantity: number = 0;
    public size: number = 0;

    public serialize(): string {
        return JSON.stringify({
            amount: this.quantity,
            size: this.size
        });
    }

    public deserialize(saveObject: Balls) {
        this.quantity = saveObject.quantity;
        this.size = saveObject.size;
    }
}
