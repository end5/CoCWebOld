import { WeaponName } from './WeaponName';
import { WeaponPerk, WeaponPerkLib, WeaponPerkType } from './WeaponPerk';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { Dictionary } from '../../../Engine/Utilities/Dictionary';
import { List } from '../../../Engine/Utilities/List';
import { Character } from '../../Character/Character';
import { EquipableItem } from '../EquipableItem';
import { ItemDesc } from '../ItemDesc';
import { ItemType } from '../ItemType';

export class Weapon extends EquipableItem {
    public readonly verb: string;
    private attackValue: number;
    public readonly perks: Dictionary<WeaponPerk>;
    public readonly displayname: string;

    public constructor(name: WeaponName, desc: ItemDesc, displayname: string, verb: string, attack: number, value?: number, perks?: WeaponPerkType[]) {
        super(name, ItemType.Weapon, desc, value);
        this.displayname = displayname;
        this.verb = verb;
        this.attackValue = attack;
        this.perks = new Dictionary();
        if (perks)
            for (const perk of perks)
                this.perks.set(perk, WeaponPerkLib.get(perk));
    }

    public get attack(): number {
        return this.attackValue;
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
