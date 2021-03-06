import { ISerializable } from './ISerializable';
import { List } from './List';

type constr = new (...args) => any;

export class ListSerializer {
    public static serialize(list: List<any>): any[] {
        return list.map((v) => {
            if ((v as ISerializable<object>).serialize)
                return v.serialize();
            else
                return v;
        });
    }

    public static deserialize(saveObject: List<any>, list: List<any>, entryConstructor?: new (...args) => any, ...args): void {
        list.clear();
        saveObject.forEach((entry, index) => {
            if (entryConstructor) {
                list.add(new (Function.prototype.bind.apply(entryConstructor, args))());
                if (entry && (entry as ISerializable<object>).deserialize)
                    list.get(index).deserialize(entry);
            }
            else
                list.add(entry);
        });
    }
}
