import ObservableList from './ObserverableList';
import ISerializable from '../Utilities/ISerializable';

export default class SerializableList<Entry extends ISerializable<Entry>> extends ObservableList<Entry> implements ISerializable<SerializableList<Entry>> {
    protected deserializer: (saveObject: object) => Entry;

    public constructor(deserializer?: (saveObject: object) => Entry) {
        super();
        this.deserializer = deserializer;
    }

    public serialize(): string {
        const saveObject: object = {};
        if (this.deserializer)
            for (let index = 0; index < this.list.length; index++) {
                saveObject[index] = this.list[index].serialize();
            }
        else
            for (let index = 0; index < this.list.length; index++) {
                saveObject[index] = this.list[index];
            }

        return JSON.stringify(saveObject);
    }

    public deserialize(saveObject: object): SerializableList<Entry> {
        const newList = [];
        for (let index = 0; saveObject[index] !== undefined; index++) {
            if (this.constructor) {
                newList.push(this.deserializer(saveObject[index]));
            }
            else {
                newList[index] = saveObject[index];
            }
        }
        this.list = newList;
        return this;
    }
}
