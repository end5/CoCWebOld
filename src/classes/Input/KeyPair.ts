import BindableAction from './BindableAction';
import KeyCombination from './KeyCombination';
import { SerializeInterface } from '../SerializeInterface';

export default class KeyPair implements SerializeInterface {
    public primaryKey: KeyCombination;
    public secondaryKey: KeyCombination;
    public constructor(primaryKey: KeyCombination = null, secondaryKey: KeyCombination = null) {
        this.primaryKey = primaryKey;
        this.secondaryKey = secondaryKey;
    }

    public serialize(): string {
        return JSON.stringify({
            primaryKey: this.primaryKey.serialize(),
            secondaryKey: this.secondaryKey.serialize()
        });
    }

    public deserialize(saveObject: KeyPair) {
        if (saveObject.primaryKey !== undefined) {
            this.primaryKey.deserialize(saveObject.primaryKey);
        }
        else {
            console.error("Error - Deserialize: KeyPair - primaryKey incorrect");
            console.trace();
        }
        if (saveObject.secondaryKey !== undefined) {
            this.secondaryKey.deserialize(saveObject.secondaryKey);
        }
        else {
            console.error("Error - Deserialize: KeyPair - secondaryKey incorrect");
            console.trace();
        }
    }
}