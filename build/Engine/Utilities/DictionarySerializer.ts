import { Dictionary } from './Dictionary';
import { ISerializable } from './ISerializable';

export class DictionarySerializer {
    public static serialize(dictionary: Dictionary<any>): string {
        const saveObject: object = {};
        const keys = dictionary.keys();
        for (const key of keys) {
            const entry = dictionary.get(key);
            if ((entry as ISerializable<object>).serialize !== undefined)
                saveObject[key] = (entry as ISerializable<object>).serialize();
            else
                saveObject[key] = entry;
        }
        return JSON.stringify(saveObject);
    }

    public static deserialize(saveObject: object, dictionary: Dictionary<any>, objectConstructor?: new (...args) => any, ...args) {
        const keys = Object.keys(saveObject);
        dictionary.clear();
        for (const key of keys) {
            let entry = saveObject[key];
            if (objectConstructor) {
                entry = new objectConstructor(args);
                if ((entry as ISerializable<object>).deserialize !== undefined)
                    entry.deserialize(saveObject[key]);
            }
            dictionary.set(key, entry);
        }
    }
}
