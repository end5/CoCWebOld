import ISerializable from '../../Engine/Utilities/ISerializable';

export default class Balls implements ISerializable<Balls> {
    public quantity: number = 0;
    public size: number = 0;

    public serialize(): string {
        return JSON.stringify({
            quantity: this.quantity,
            size: this.size
        });
    }

    public deserialize(saveObject: Balls) {
        this.quantity = saveObject.quantity;
        this.size = saveObject.size;
    }
}
