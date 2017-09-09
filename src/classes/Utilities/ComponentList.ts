import KeyObject from "./KeyObject";

export class Component extends KeyObject {

}

export default class ComponentList<T extends Component> {
    private _list: T[];

    public constructor() {
        this._list = [];
    }

    public add(item: T) {
        this._list.push(item);
    }

    public has(name: string): boolean {
        for (let index = 0; index < this._list.length; index++) {
            if (this._list[index].objectKey == name) {
                return true;
            }
        }
        return false;
    }

    public indexOf(name: string): number {
        for (let index = 0; index < this._list.length; index++) {
            if (this._list[index].objectKey == name) {
                return index;
            }
        }
        return -1;
    }

    public remove(name: string) {
        let index: number = this.indexOf(name);
        if (index >= 0)
            this._list.splice(index, 1);
    }

    public get(name: string): T {
        for (let item of this._list) {
            if (item.objectKey == name)
                return item;
        }
        return null;
    }

    public clear() {
        this._list = [];
    }
}