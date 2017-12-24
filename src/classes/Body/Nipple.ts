import Piercing from './Piercing';
import SerializeInterface from '../SerializeInterface';
import { FilterOption } from '../Utilities/list';
import SerializableList from '../Utilities/SerializableList';
import SerializeUtils from '../Utilities/SerializeUtils';

export default class Nipple implements SerializeInterface {
    public length: number = .25;
    public piercings: SerializableList<Piercing> = new SerializableList(Piercing);
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
        this.length = saveObject.length;
        this.piercings.deserialize(saveObject.piercings);
        this.fuckable = saveObject.fuckable;
    }
}
