import Armor, { ArmorClass } from './Armor';
import Perk from '../../Effects/Perk';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default class ArmorWithPerk extends Armor {
    public readonly perk: Perk;
    public readonly perkDesc: string

    public constructor(key: string, itemDesc: ItemDesc, displayName: string, defense: number, value: number, armorClass: ArmorClass, perk: Perk, perkDesc: string = "", supportsBulge: boolean = false) {
        super(key, itemDesc, displayName, defense, value, armorClass, supportsBulge);
        this.perk = perk;
        this.perkDesc = perkDesc;
    }

    public equip(player: Player): Armor { //This item is being equipped by the player. Add any perks, etc.
        while (player.perks.has(this.perk.uniqueKey))
            player.perks.remove(this.perk.uniqueKey);
        player.perks.add(this.perk.clone());
        return super.equip(player);
    }

    public unequip(player: Player): Armor { //This item is being removed by the player. Remove any perks, etc.
        while (player.perks.has(this.perk.uniqueKey))
            player.perks.remove(this.perk.uniqueKey);
        return super.unequip(player);
    }
}

