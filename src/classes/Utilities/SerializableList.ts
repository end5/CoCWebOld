import List from './List';
import SerializeInterface from '../SerializeInterface';

export default class SerializableList<T extends SerializeInterface> extends List<T> implements SerializeInterface {
    private objectConstructor: new () => T;

    public constructor(objectConstructor?: new () => T) {
        super();
        this.objectConstructor = objectConstructor;
    }

    public serialize(): string {
        let saveObject: object = {};
        if (this.objectConstructor)
            for (let index = 0; index < this.list.length; index++) {
                saveObject[index] = this.list[index].serialize();
            }
        else
            for (let index = 0; index < this.list.length; index++) {
                saveObject[index] = this.list[index];
            }

        return JSON.stringify(saveObject);
    }

    public deserialize(saveObject: object) {
        let newArray = [];
        for (let index = 0; saveObject[index] != undefined; index++) {
            if (this.constructor) {
                newArray.push(new this.objectConstructor());
                newArray[index].deserialize(saveObject[index]);
            }
        }
        return newArray;
    }
}