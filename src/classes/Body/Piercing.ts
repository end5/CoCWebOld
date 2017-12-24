import ISerializable from '../Utilities/ISerializable';

export default class Piercing implements ISerializable<Piercing> {
    public shortDesc: string = "";
    public longDesc: string = "";

    public serialize(): string {
        return JSON.stringify({
            piercedShortDesc: this.shortDesc,
            piercedLongDesc: this.longDesc
        });
    }

    public deserialize(saveObject: Piercing): Piercing {
        const newPiercing = new Piercing();
        newPiercing.shortDesc = saveObject.shortDesc;
        newPiercing.longDesc = saveObject.longDesc;
        return newPiercing;
    }
}
