import Weapon from './Weapon';
import MainScreen from '../../display/MainScreen';
import Game from '../../Game/Game';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default class BeautifulSword extends Weapon {
    public constructor() {
        super("B.Sword", new ItemDesc("B.Sword", "a beautiful shining sword", "This beautiful sword shines brilliantly in the light, showing the flawless craftsmanship of its blade.  The pommel and guard are heavily decorated in gold and brass.  Some craftsman clearly poured his heart and soul into this blade.  (ATK: +Varies) (Cost: 400)"), "beautiful sword", "slash", 7, 400, "holySword");
    }

    public get attack(): number {
        return 7 + Math.floor(10 - Game.player.stats.cor / 3);
    }

    public canUse(player: Player): boolean {
        if (player.stats.cor < 35)
            return true;
        MainScreen.text("You grab hold of the handle of the sword only to have it grow burning hot.  You're forced to let it go lest you burn yourself.  Something within the sword must be displeased.  ");
        return false;
    }

}