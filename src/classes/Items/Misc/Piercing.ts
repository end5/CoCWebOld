import Character from '../../Character/Character';
import ISerializable from '../../Utilities/ISerializable';
import EquipableItem from '../EquipableItem';
import ItemDesc from '../ItemDesc';
import ItemType from '../ItemType';

export enum PiercingType {
    Stud = "Stud",
    Ring = "Ring",
    Ladder = "Ladder",
    Hoop = "Hoop",
    Chain = "Chain"
}

export default class Piercing extends EquipableItem implements ISerializable<Piercing> {
    public shortDesc: string;
    public longDesc: string;

    public constructor(piercingType: PiercingType, shortDesc: string = "", longDesc: string = "") {
        super(piercingType, ItemType.Misc, null);
        this.shortDesc = shortDesc;
        this.longDesc = longDesc;
    }

    public onEquip(character: Character): void { }

    public onUnequip(character: Character): void { }

    public equipText(): void { }

    public unequipText(): void { }

    public canUse(character: Character): boolean {
        return true;
    }

    public use(character: Character) { }

    public useText(character: Character) { }

    public serialize(): string {
        return JSON.stringify({
            shortDesc: this.desc.shortName,
            longDesc: this.desc.longName,
        });
    }

    public deserialize(saveObject: Piercing) {
        this.shortDesc = saveObject.shortDesc;
        this.longDesc = saveObject.longDesc;
    }
}
