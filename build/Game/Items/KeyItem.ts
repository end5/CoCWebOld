import ValueContainer from '../Utilities/ValueContainer';

export interface KeyItemSaveObject extends ValueContainer {
    name: string;
    values: ValueContainer;
}

export default class KeyItem extends ValueContainer {
    private key: string;
    public constructor(name: string = "Generic KeyItem", value1: number = 0, value2: number = 0, value3: number = 0, value4: number = 0) {
        super(value1, value2, value3, value4);
        this.key = name;
    }

    public get name(): string {
        return this.key;
    }

    public serialize(): string {
        return JSON.stringify({
            name: this.key,
            values: super.serialize()
        });
    }

    public deserialize(saveObject: KeyItemSaveObject) {
        this.key = saveObject.name;
        super.deserialize(saveObject.values);
    }
}
