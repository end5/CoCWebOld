import { KeyCombination } from './KeyCombination';
import { ISerializable } from '../../Engine/Utilities/ISerializable';

export class KeyPair implements ISerializable<KeyPair> {
    public primaryKey: KeyCombination;
    public secondaryKey: KeyCombination;
    public constructor(primaryKey?: KeyCombination, secondaryKey?: KeyCombination) {
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
