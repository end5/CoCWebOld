import SerializeInterface from '../SerializeInterface';

export default class Piercing implements SerializeInterface {
    public shortDesc: string = "";
    public longDesc: string = "";

    public serialize(): string {
        return JSON.stringify({
            piercedShortDesc: this.shortDesc,
            piercedLongDesc: this.longDesc
        });
    }
    
    public deserialize(saveObject: Piercing) {
        this.shortDesc = saveObject.shortDesc;
        this.longDesc = saveObject.longDesc;
    }
}