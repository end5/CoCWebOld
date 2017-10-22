import Armor, { ArmorClass } from './Armor';
import Perk from '../../Effects/Perk';
import Player from '../../Player';

export default class ArmorWithPerk extends Armor {
    public readonly perk: Perk;
    public readonly perkDesc: string

    public constructor(key: string, shortName: string, name: string, longName: string, defense: number, value: number, description: string, armorClass: ArmorClass, perk: Perk, perkDesc: string = "", supportsBulge: boolean = false) {
        super(key, shortName, name, longName, defense, value, description, armorClass, supportsBulge);
        this.perk = perk;
        this.perkDesc = perkDesc;
    }

    public equip(player: Player): Armor { //This item is being equipped by the player. Add any perks, etc.
        while (player.perks.has(this.perk.objectKey))
            player.perks.remove(this.perk.objectKey);
        player.perks.add(this.perk.clone());
        return super.equip(player);
    }

    public unequip(player: Player): Armor { //This item is being removed by the player. Remove any perks, etc.
        while (player.perks.has(this.perk.objectKey))
            player.perks.remove(this.perk.objectKey);
        return super.unequip(player);
    }
}

