import ObservableList from './ObserverableList';
import ISerializable from '../Utilities/ISerializable';

export default class SerializableList<Entry extends ISerializable<Entry>> extends ObservableList<Entry> implements ISerializable<SerializableList<Entry>> {
    protected entryConstructor: new () => Entry;

    public constructor(entryConstructor?: new () => Entry) {
        super();
        this.entryConstructor = entryConstructor;
    }

    public serialize(): string {
        const saveObject: object = {};
        if (this.entryConstructor)
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
        const newList = [];
        for (let index = 0; saveObject[index] !== undefined; index++) {
            if (this.entryConstructor) {
                const newEntry = new this.entryConstructor();
                newEntry.deserialize(saveObject[index]);
                newList[index] = newEntry;
            }
            else {
                newList[index] = saveObject[index];
            }
        }
        this.list = newList;
    }
}
