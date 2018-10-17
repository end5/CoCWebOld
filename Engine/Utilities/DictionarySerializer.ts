import { Dictionary } from './Dictionary';
import { ISerializable } from './ISerializable';

export class DictionarySerializer {
    public static serialize(dictionary: Dictionary<any>): object {
        const saveObject: { [x: string]: any } = {};
        const keys = dictionary.keys();
        for (const key of keys) {
            const entry = dictionary.get(key);
            if ((entry as ISerializable<object>).serialize)
                saveObject[key] = (entry as ISerializable<object>).serialize() as any;
            else
                saveObject[key] = entry;
        }
        return saveObject;
    }

    public static deserialize(saveObject: { [x: string]: any }, dictionary: Dictionary<any>, objectConstructor?: new (...args: any[]) => any, ...args: any[]) {
        const keys = Object.keys(saveObject);
        dictionary.clear();
        for (const key of keys) {
            let entry: any = saveObject[key];
            if (objectConstructor) {
                entry = new (Function.prototype.bind.apply(objectConstructor, [args]))();
                if ((entry as ISerializable<object>).deserialize)
                    entry.deserialize(saveObject[key]);
            }
            else
                dictionary.set(key, entry);
        }
    }
}
