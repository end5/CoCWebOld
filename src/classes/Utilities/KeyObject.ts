export default class KeyObject {
    private _objectKey: string;

    public constructor(key: string) {
        this._objectKey = key;
    }

    public get objectKey(): string {
        return this._objectKey;
    }
}