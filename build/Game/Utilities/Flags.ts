import { Dictionary } from '../../Engine/Utilities/Dictionary';

export class Flags extends Dictionary<object> {
    public get<F extends object>(key: string): F {
        if (!this.has(key))
            this.dictionary[key] = {};
        return super.get(key) as F;
    }
}
