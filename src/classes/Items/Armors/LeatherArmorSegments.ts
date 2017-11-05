import Armor from './Armor';
import Character from '../../Character/Character';
import MainScreen from '../../display/MainScreen';
import Game from '../../Game/Game';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default class LeatherArmorSegments extends Armor {
    public constructor() {
        super("UrtaLta", new ItemDesc("UrtaLta", "leather armor segments"), "leather armor segments", 5, 76, "Light", true);
    }

    use(player: Player) { }

    equipText(): void {}
    unequipText(): void {
        MainScreen.text("You have your old set of " + this.desc.longName + " left over.  ");
    }

    onEquip(character: Character): void {}
    onUnequip(character: Character): void {
        //return Game.libraries.armor.get("LeathrA");
    }
}

