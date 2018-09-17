import { ISerializable } from '../../Engine/Utilities/ISerializable';
import { ValueContainer } from '../Utilities/ValueContainer';

export class KeyItem extends ValueContainer implements ISerializable<KeyItem> {
    private key: string;
    public constructor(name: string = "Generic KeyItem", value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        super(value1, value2, value3, value4);
        this.key = name;
    }

    public get name(): string {
        return this.key;
    }

    public serialize(): object | undefined {
        return Object.assign(
            {
                name: this.key,
            },
            super.serialize()
        );

    }

    public deserialize(saveObject: KeyItem) {
        this.key = saveObject.name;
        super.deserialize(saveObject);
    }
}
