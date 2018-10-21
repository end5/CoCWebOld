import { Dictionary } from './Dictionary';
import { ISerializable } from './ISerializable';

export class DictionarySerializer {
    public static serialize<T extends string, U extends (ISerializable<U> | object)>(dictionary: Dictionary<T, U>): object {
        const saveObject: { [x: string]: any } = {};
        const keys = dictionary.keys();
        for (const key of keys) {
            const entry = dictionary.get(key);
            if ((entry as ISerializable<U>).serialize)
                saveObject[key] = (entry as ISerializable<U>).serialize() as any;
            else
                saveObject[key] = entry;
        }
        return saveObject;
    }

    public static deserialize<T extends string, U extends (ISerializable<U> | object)>(saveObject: { [x: string]: any }, dictionary: Dictionary<T, U>, objectConstructor?: new (...args: any[]) => any, ...args: any[]) {
        const keys = Object.keys(saveObject);
        dictionary.clear();
        for (const key of keys) {
            let entry: any = saveObject[key];
            if (objectConstructor) {
                entry = new (Function.prototype.bind.apply(objectConstructor, [args]))();
                if ((entry as ISerializable<U>).deserialize)
                    entry.deserialize(saveObject[key]);
            }
            else
                dictionary.set(key as T, entry);
        }
    }
}
