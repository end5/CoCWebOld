import Piercing from './Piercing';
import ISerializable from '../Utilities/ISerializable';
import { FilterOption } from '../Utilities/list';
import SerializableList from '../Utilities/SerializableList';
import SerializeUtils from '../Utilities/SerializeUtils';

export default class Nipple implements ISerializable<Nipple> {
    public length: number = .25;
    public piercings: SerializableList<Piercing> = new SerializableList(new Piercing().deserialize);
    public fuckable: boolean = false;

    public static readonly Fuckable: FilterOption<Nipple> = (a: Nipple) => {
        if (a.fuckable)
            return a;
    }

    public static readonly NotFuckable: FilterOption<Nipple> = (a: Nipple) => {
        if (!a.fuckable)
            return a;
    }

    public static readonly PiercedNipples: FilterOption<Nipple> = (a: Nipple) => {
        if (a.piercings.count > 0)
            return a;
    }

    public static readonly NotPiercedNipples: FilterOption<Nipple> = (a: Nipple) => {
        if (a.piercings.count <= 0)
            return a;
    }

    public serialize(): string {
        return JSON.stringify({
            length: this.length,
            piercings: this.piercings.serialize(),
            fuckable: this.fuckable
        });
    }

    public deserialize(saveObject: Nipple) {
        const newNipple = new Nipple();
        newNipple.length = saveObject.length;
        newNipple.piercings.deserialize(saveObject.piercings);
        newNipple.fuckable = saveObject.fuckable;
        return newNipple;
    }
}
