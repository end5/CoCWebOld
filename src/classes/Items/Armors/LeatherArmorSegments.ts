import Armor from './Armor';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import Game from '../../Game/Game';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class LeatherArmorSegments extends Armor {
    public constructor() {
        super("UrtaLta", new ItemDesc("UrtaLta", "leather armor segments"), "leather armor segments", 5, 76, "Light", true);
    }

    use(player: Player) { }

    equipText(): void {}
    unequipText(): void {
        DisplayText.text("You have your old set of " + this.desc.longName + " left over.  ");
    }

    onEquip(character: Character): void {}
    onUnequip(character: Character): void {
        //return Game.libraries.armor.get("LeathrA");
    }
}

