import SerializeInterface from '../SerializeInterface';

export default class SerializeUtils {
    public static serializeArray<T extends SerializeInterface>(array: Array<T>): string {
        let saveObject: object = {};
        for (let index = 0; index < array.length; index++) {
            saveObject[index] = array[index].serialize();
        }
        return JSON.stringify(saveObject);
    }

    public static deserializeArray<T extends SerializeInterface>(saveObject: object, constructor?: new () => T): Array<T>  {
        let newArray = [];
        for (let index = 0; saveObject[index] != undefined; index++) {
            if (constructor) {
                newArray.push(new constructor());
                newArray[index].deserialize(saveObject[index]);
            }
            else {
                newArray.push(saveObject[index]);
            }
        }
        return newArray;
    }
}