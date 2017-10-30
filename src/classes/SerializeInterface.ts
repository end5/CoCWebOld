export interface SerializeInterface {
    serialKey: string;
    serialize(): string;
    deserialize(saveObject: object);
}