import Weapon from './Weapon';
import WeaponName from './WeaponName';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import Game from '../../Game/Game';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class BeautifulSword extends Weapon {
    public constructor() {
        super(WeaponName.BeautifulSword, new ItemDesc("B.Sword", "a beautiful shining sword", "This beautiful sword shines brilliantly in the light, showing the flawless craftsmanship of its blade.  The pommel and guard are heavily decorated in gold and brass.  Some craftsman clearly poured his heart and soul into this blade."), "beautiful sword", "slash", 7, 400, "holySword");
    }

    public get attack(): number {
        return 7 + Math.floor(10 - Game.player.stats.cor / 3);
    }

    public canUse(player: Player): boolean {
        if (player.stats.cor < 35)
            return true;
        DisplayText.text("You grab hold of the handle of the sword only to have it grow burning hot.  You're forced to let it go lest you burn yourself.  Something within the sword must be displeased.  ");
        return false;
    }

    public equip(character: Character): void {}
    public unequip(character: Character): void {}
    public equipText(): void {}
    public unequipText(): void {}
    public use(player: Player) {}
}