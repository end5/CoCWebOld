import ConstantLibrary from './ConstantLibrary';
import LibraryEntry from './LibraryEntry';

export default abstract class ConstructorLibrary<T extends Function> {
    private _library: object;

    public get(key: string): T {
        return this._library[key];
    }

    protected add(key: string, entry: T) {
        this._library[key] = entry;
    }

    public has(key: string) {
        return this._library[key] !== undefined ? true : false;
    }

    public constructor() {
        this._library = {};
    }
}