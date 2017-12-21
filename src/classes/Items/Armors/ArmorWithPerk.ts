import Armor, { ArmorClass } from './Armor';
import ArmorName from './ArmorName';
import Character from '../../Character/Character';
import Perk from '../../Effects/Perk';
import PerkFactory from '../../Effects/PerkFactory';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default abstract class ArmorWithPerk extends Armor {
    public readonly perk: Perk;

    public constructor(name: ArmorName, desc: ItemDesc, displayName: string, defense: number, value: number, armorClass: ArmorClass, perk: Perk, perkDesc: string = "", supportsBulge: boolean = false) {
        super(name, desc, displayName, defense, value, armorClass, supportsBulge);
        this.perk = perk;
    }

    public equip(character: Character): void {
        while (character.perks.has(this.perk.type))
            character.perks.remove(this.perk.type);
        character.perks.add(PerkFactory.copy(this.perk));
        super.equip(character);
    }

    public unequip(character: Character): void {
        while (character.perks.has(this.perk.type))
            character.perks.remove(this.perk.type);
        super.unequip(character);
    }
}

export class GenericArmorWithPerk extends ArmorWithPerk {
    use(player: Player) { }
    
    equipText(): void { }
    unequipText(): void { }

    onEquip(character: Character) { }
    onUnequip(character: Character) { }
}
