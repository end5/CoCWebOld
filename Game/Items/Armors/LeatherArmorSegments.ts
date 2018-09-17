import { Armor } from './Armor';
import { ArmorName } from './ArmorName';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { Character } from '../../Character/Character';
import { ItemDesc } from '../ItemDesc';

export class LeatherArmorSegments extends Armor {
    public constructor() {
        super(ArmorName.LeatherArmorSegments, new ItemDesc("UrtaLta", "leather armor segments"), "leather armor segments", 5, 76, "Light", true);
    }

    public unequipText(): void {
        DisplayText("You have your old set of " + this.desc.longName + " left over.  ");
    }

    public onUnequip(character: Character): void {
        // return Game.libraries.armor.get("LeathrA");
        super.onUnequip(character);
    }
}
