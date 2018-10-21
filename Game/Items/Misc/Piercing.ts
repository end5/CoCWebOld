import { ISerializable } from '../../../Engine/Utilities/ISerializable';
import { Character } from '../../Character/Character';
import { EquipableItem } from '../EquipableItem';
import { ItemType } from '../ItemType';
import { ItemDesc } from '../ItemDesc';

export enum PiercingType {
    /** 1 */
    Stud = "Stud",
    /** 2 */
    Ring = "Ring",
    /** 3 */
    Ladder = "Ladder",
    /** 4 */
    Hoop = "Hoop",
    /** 5 */
    Chain = "Chain"
}

export class Piercing extends EquipableItem implements ISerializable<Piercing> {
    public shortDesc: string;
    public longDesc: string;

    public constructor(piercingType: PiercingType, shortDesc: string = "", longDesc: string = "") {
        super(piercingType, ItemType.Misc, new ItemDesc('piercing'));
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

    public serialize(): object | undefined {
        return {
            shortDesc: this.desc.shortName,
            longDesc: this.desc.longName,
        };
    }

    public deserialize(saveObject: Piercing) {
        this.shortDesc = saveObject.shortDesc;
        this.longDesc = saveObject.longDesc;
    }
}
