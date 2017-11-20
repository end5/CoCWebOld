import LibraryEntry from './LibraryEntry';
import { SerializeInterface } from '../SerializeInterface';

export default class ComponentList<Entry extends LibraryEntry, KeyType extends string> implements SerializeInterface {
    private _list: Entry[];

    public constructor() {
        this._list = [];
    }

    public add(item: Entry) {
        this._list.push(item);
    }

    public remove(name: KeyType) {
        let index: number = this.indexOf(name);
        if (index >= 0)
            this._list.splice(index, 1);
    }

    private indexOf(name: KeyType): number {
        for (let index = 0; index < this._list.length; index++) {
            if (this._list[index].uniqueKey == name) {
                return index;
            }
        }
        return -1;
    }

    public has(name: KeyType): boolean {
        for (let index = 0; index < this._list.length; index++) {
            if (this._list[index].uniqueKey == name) {
                return true;
            }
        }
        return false;
    }

    public get(name: KeyType): Entry {
        for (let item of this._list) {
            if (item.uniqueKey == name)
                return item;
        }
        return null;
    }

    public clear() {
        this._list = [];
    }

    public iterate(func: (item: Entry) => void) {
        for (let index = 0; index < this._list.length; index++) {
            func(this._list[index]);
        }
    }

    public serialize(): string {
        return JSON.stringify({
            "list": JSON.stringify(this._list)
        });
    }
    public deserialize(saveObject: object) {
        this._list = JSON.parse(saveObject["list"]);
    }
}