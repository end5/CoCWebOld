import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';
import EquipableItem from '../EquipableItem';
import Item, { ItemType } from '../Item';
import ItemDesc from '../ItemDesc';

export default abstract class Weapon extends EquipableItem {
    public readonly verb: string;
    public readonly attack: number;
    public readonly perk: string;
    public readonly displayname: string;

    public constructor(key: string, itemDesc: ItemDesc, displayname: string, verb: string, attack: number, value?: number, perk: string = "") {
        super(key, ItemType.Weapon, itemDesc, value);
        this.displayname = displayname;
        this.verb = verb;
        this.attack = attack;
        this.perk = perk;
    }

    public canUse(player: Player): boolean {
        return true;
    }

    public useText(player: Player) {
        DisplayText.text("You equip " + this.desc.longName + ".  ");
    }

    public describe(): string {
        return super.describe() + " (ATK: +" + this.attack + ")";
    }
}

export class GenericWeapon extends Weapon {
    use(player: Player) { }

    equip(character: Character): void { }
    unequip(character: Character): void { }
    
    equipText(): void { }
    unequipText(): void { }
}