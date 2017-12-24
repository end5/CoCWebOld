import ISerializable from '../Utilities/ISerializable';

export default class Balls implements ISerializable<Balls> {
    public quantity: number = 0;
    public size: number = 0;

    public serialize(): string {
        return JSON.stringify({
            quantity: this.quantity,
            size: this.size
        });
    }

    public deserialize(saveObject: Balls): Balls {
        const newBalls = new Balls();
        newBalls.quantity = saveObject.quantity;
        newBalls.size = saveObject.size;
        return newBalls;
    }
}
