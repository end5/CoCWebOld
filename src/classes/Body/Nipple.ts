import ISerializable from '../Utilities/ISerializable';
import { FilterOption } from '../Utilities/list';

export default class Nipple implements ISerializable<Nipple> {
    public length: number = .25;
    public fuckable: boolean = false;

    public static readonly Fuckable: FilterOption<Nipple> = (a: Nipple) => {
        return a.fuckable;
    }

    public static readonly NotFuckable: FilterOption<Nipple> = (a: Nipple) => {
        return !a.fuckable;
    }

    public serialize(): string {
        return JSON.stringify({
            length: this.length,
            fuckable: this.fuckable
        });
    }

    public deserialize(saveObject: Nipple) {
        const newNipple = new Nipple();
        newNipple.length = saveObject.length;
        newNipple.fuckable = saveObject.fuckable;
        return newNipple;
    }
}
