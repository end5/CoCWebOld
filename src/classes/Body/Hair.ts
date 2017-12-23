import SerializeInterface from '../SerializeInterface';

export enum HairType {
    NORMAL, FEATHER, GHOST, GOO, ANEMONE
}

export default class Hair implements SerializeInterface {
    public type: HairType = HairType.NORMAL;
    public color: string = "";
    public length: number = 0;

    public serialize(): string {
        return JSON.stringify({
            type: this.type,
            color: this.color,
            length: this.length
        });
    }

    public deserialize(saveObject: Hair) {
        this.type = saveObject.type;
        this.color = saveObject.color;
        this.length = saveObject.length;
    }
}