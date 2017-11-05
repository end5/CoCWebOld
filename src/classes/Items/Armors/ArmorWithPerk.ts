import Armor, { ArmorClass } from './Armor';
import Character from '../../Character/Character';
import Perk from '../../Effects/Perk';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default abstract class ArmorWithPerk extends Armor {
    public readonly perk: Perk;
    public readonly perkDesc: string

    public constructor(key: string, itemDesc: ItemDesc, displayName: string, defense: number, value: number, armorClass: ArmorClass, perk: Perk, perkDesc: string = "", supportsBulge: boolean = false) {
        super(key, itemDesc, displayName, defense, value, armorClass, supportsBulge);
        this.perk = perk;
        this.perkDesc = perkDesc;
    }

    public equip(character: Character): void {
        while (character.perks.has(this.perk.uniqueKey))
            character.perks.remove(this.perk.uniqueKey);
        character.perks.add(this.perk.clone());
        super.equip(character);
    }

    public unequip(character: Character): void {
        while (character.perks.has(this.perk.uniqueKey))
            character.perks.remove(this.perk.uniqueKey);
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
