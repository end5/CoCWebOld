import Character from '../../Character/Character';
import ISerializable from '../../Utilities/ISerializable';
import EquipableItem from '../EquipableItem';
import ItemDesc from '../ItemDesc';
import ItemType from '../ItemType';

export default class Piercing extends EquipableItem implements ISerializable<Piercing> {
    public readonly shortDesc;
    public readonly longDesc;

    public constructor(shortDesc: string, longDesc: string) {
        super("Piercing", ItemType.Misc, null);
        this.shortDesc = shortDesc;
        this.longDesc = longDesc;
    }

    public onEquip(character: Character): void {

    }

    public onUnequip(character: Character): void {

    }

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

    public deserialize(saveObject: Piercing): Piercing {
        const newPiercing = new Piercing(saveObject.shortDesc, saveObject.longDesc);
        return newPiercing;
    }
}
