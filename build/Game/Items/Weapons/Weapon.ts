import WeaponName from './WeaponName';
import DisplayText from '../../../Engine/display/DisplayText';
import Character from '../../Character/Character';
import EquipableItem from '../EquipableItem';
import ItemDesc from '../ItemDesc';
import ItemType from '../ItemType';

export default class Weapon extends EquipableItem {
    public readonly verb: string;
    public readonly attack: number;
    public readonly perk: string;
    public readonly displayname: string;

    public constructor(name: WeaponName, desc: ItemDesc, displayname: string, verb: string, attack: number, value?: number, perk: string = "") {
        super(name, ItemType.Weapon, desc, value);
        this.displayname = displayname;
        this.verb = verb;
        this.attack = attack;
        this.perk = perk;
    }

    public use(character: Character) { }
    public canUse(character: Character): boolean {
        return true;
    }

    public useText(character: Character) {
        DisplayText("You equip " + this.desc.longName + ".  ");
    }

    public describe(): string {
        return super.describe() + " (ATK: +" + this.attack + ")";
    }

    public onEquip(character: Character) { }
    public onUnequip(character: Character) { }

    public equipText() { }
    public unequipText() { }
}
