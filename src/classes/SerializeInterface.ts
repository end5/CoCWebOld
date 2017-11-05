export interface SerializeInterface {
    serialize(): string;
    deserialize(saveObject: object);
}