import Armor from './Armor';
import ArmorName from './ArmorName';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import Game from '../../Game/Game';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class LeatherArmorSegments extends Armor {
    public constructor() {
        super(ArmorName.LeatherArmorSegments, new ItemDesc("UrtaLta", "leather armor segments"), "leather armor segments", 5, 76, "Light", true);
    }

    public use(player: Player) { }

    public equipText(): void {}
    public unequipText(): void {
        DisplayText.text("You have your old set of " + this.desc.longName + " left over.  ");
    }

    public onEquip(character: Character): void {}
    public onUnequip(character: Character): void {
        //return Game.libraries.armor.get("LeathrA");
    }
}

