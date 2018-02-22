import ISerializable from './ISerializable';
import List from './List';

export default class ListSerializer {
    public static serialize(list: List<any>): string {
        const saveObject: object = {};
        for (let index = 0; index < list.count; index++) {
            const entry = list.get(index);
            if ((entry as ISerializable<object>).serialize !== undefined)
                saveObject[index] = entry.serialize();
            else
                saveObject[index] = entry;
        }
        return JSON.stringify(saveObject);
    }

    public static deserialize(saveObject: object, list: List<any>, entryConstructor?: new (...args) => any, ...args): void {
        const deserList = [];
        for (let index = 0; saveObject[index] !== undefined; index++) {
            let entry = saveObject[index];
            if (entryConstructor) {
                entry = new entryConstructor(args);
                if ((entry as ISerializable<object>).deserialize !== undefined)
                    entry.deserialize(saveObject[index]);
            }
            deserList[index] = entry;
        }
        list.clear();
        for (const entry of deserList) {
            list.add(entry);
        }
    }
}
