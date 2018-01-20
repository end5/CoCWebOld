export default interface ISerializable<T extends object> {
    serialize(): string;
    /**
     * If the return is void, then it deserializes to itself and returns a new object.
     */
    deserialize(saveObject: T): void;
}
