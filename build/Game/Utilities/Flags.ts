import Dictionary from '../../Engine/Utilities/Dictionary';

export default class Flags extends Dictionary<object> {
    public get(key: string): object {
        if (!this.has(key))
            this.dictionary[key] = {};
        return super.get(key);
    }
}
