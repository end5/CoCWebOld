import Armor, { ArmorClass } from './Armor';
import ArmorName from './ArmorName';
import Character from '../../Character/Character';
import Perk from '../../Effects/Perk';
import ItemDesc from '../ItemDesc';

export default class ArmorWithPerk extends Armor {
    public readonly perk: Perk;

    public constructor(name: ArmorName, desc: ItemDesc, displayName: string, defense: number, value: number, armorClass: ArmorClass, perk: Perk, perkDesc: string = "", supportsBulge: boolean = false) {
        super(name, desc, displayName, defense, value, armorClass, supportsBulge);
        this.perk = perk;
    }

    public onEquip(character: Character): void {
        while (character.perks.has(this.perk.type))
            character.perks.remove(this.perk.type);
        character.perks.add(this.perk.type, this.perk.value1, this.perk.value2, this.perk.value3, this.perk.value4);
    }

    public onUnequip(character: Character): void {
        while (character.perks.has(this.perk.type))
            character.perks.remove(this.perk.type);
        super.onUnequip(character);
    }
}
