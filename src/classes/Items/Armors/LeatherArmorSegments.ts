import Armor from './Armor';
import MainScreen from '../../display/MainScreen';
import Game from '../../Game/Game';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default class LeatherArmorSegments extends Armor {
    public constructor() {
        super("UrtaLta", new ItemDesc("UrtaLta", "leather armor segments"), "leather armor segments", 5, 76, "Light", true);
    }

    public removeText(): void {
        MainScreen.text("You have your old set of " + Game.libraries.armor.get("LeathrA").longName + " left over.  ");
    }

    public unequip(player: Player): Armor {
        super.unequip(player);
        return Game.libraries.armor.get("LeathrA");
    }
}

