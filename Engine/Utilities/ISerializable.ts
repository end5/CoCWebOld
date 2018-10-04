export interface ISerializable<T extends object> {
    serialize(): object | void;
    /**
     * If the return is void, then it deserializes to itself and returns a new object.
     */
    deserialize(saveObject: T): void;
}
