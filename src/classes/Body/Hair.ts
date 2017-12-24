import ISerializable from '../Utilities/ISerializable';

export enum HairType {
    NORMAL, FEATHER, GHOST, GOO, ANEMONE
}

export default class Hair implements ISerializable<Hair> {
    public type: HairType = HairType.NORMAL;
    public color: string = "black";
    public length: number = 0;

    public serialize(): string {
        return JSON.stringify({
            type: this.type,
            color: this.color,
            length: this.length
        });
    }

    public deserialize(saveObject: Hair): Hair {
        const newHair = new Hair();
        newHair.type = saveObject.type;
        newHair.color = saveObject.color;
        newHair.length = saveObject.length;
        return newHair;
    }
}
