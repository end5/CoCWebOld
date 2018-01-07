import Dictionary from './Dictionary';
import ISerializable from '../Utilities/ISerializable';

export default class SerializableDictionary<Entry> extends Dictionary<Entry> implements ISerializable<SerializableDictionary<Entry>> {
    private objectConstructor: new () => Entry;

    public constructor(objectConstructor?: new () => Entry) {
        super();
        this.objectConstructor = objectConstructor;
    }

    public serialize(): string {
        const saveObject: object = {};
        if (this.objectConstructor)
            for (const key of Object.keys(this.dictionary)) {
                saveObject[key] = this.dictionary[key].serialize();
            }
        else
            for (const key of Object.keys(this.dictionary)) {
                saveObject[key] = this.dictionary[key];
            }

        return JSON.stringify(saveObject);
    }

    public deserialize(saveObject: object) {
        const newObject = {};
        for (const key in Object.keys(saveObject)) {
            if (this.constructor) {
                newObject[key] = new this.objectConstructor();
                newObject[key].deserialize(saveObject[key]);
            }
            else {
                newObject[key] = saveObject[key];
            }
        }
    }
}
