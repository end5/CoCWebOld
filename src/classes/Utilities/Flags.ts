import SerializeInterface from '../SerializeInterface';

export default class Flags implements SerializeInterface {
    public readonly list: object;
    private keys: object;

    public constructor(keys: object) {
        this.list = {};
        this.keys = keys;
    }

    public serialize(): string {
        return JSON.stringify(this.list);
    }
    
    public deserialize(saveObject: object) {
        for (let key in Object.keys(this.keys)) {
            this.keys[key] = saveObject[key];
        }
    }
}