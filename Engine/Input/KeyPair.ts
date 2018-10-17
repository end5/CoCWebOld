import { KeyCombination } from './KeyCombination';
import { ISerializable } from '../../Engine/Utilities/ISerializable';

export class KeyPair implements ISerializable<KeyPair> {
    public primaryKey: KeyCombination | undefined;
    public secondaryKey: KeyCombination | undefined;
    public constructor(primaryKey?: KeyCombination, secondaryKey?: KeyCombination) {
        this.primaryKey = primaryKey;
        this.secondaryKey = secondaryKey;
    }

    public serialize(): object {
        return {
            primaryKey: this.primaryKey ? this.primaryKey.serialize() : undefined,
            secondaryKey: this.secondaryKey ? this.secondaryKey.serialize() : undefined
        };
    }

    public deserialize(saveObject: KeyPair) {
        if (!this.primaryKey)
            this.primaryKey = new KeyCombination();
        if (saveObject.primaryKey)
            this.primaryKey.deserialize(saveObject.primaryKey);

        if (!this.secondaryKey)
            this.secondaryKey = new KeyCombination();
        if (saveObject.secondaryKey)
            this.secondaryKey.deserialize(saveObject.secondaryKey);

    }
}
