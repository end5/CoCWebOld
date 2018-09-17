import { Weapon } from './Weapon';
import { WeaponName } from './WeaponName';
import { WeaponPerkType } from './WeaponPerk';
import { DisplayText } from '../../../Engine/display/DisplayText';
import { Character } from '../../Character/Character';
import { User } from '../../User';
import { ItemDesc } from '../ItemDesc';

export class BeautifulSword extends Weapon {
    public constructor() {
        super(WeaponName.BeautifulSword, new ItemDesc("B.Sword", "a beautiful shining sword", "This beautiful sword shines brilliantly in the light, showing the flawless craftsmanship of its blade.  The pommel and guard are heavily decorated in gold and brass.  Some craftsman clearly poured his heart and soul into this blade."), "beautiful sword", "slash", 7, 400, [WeaponPerkType.HolySword]);
    }

    public get attack(): number {
        return 7 + Math.floor(10 - User.char.stats.cor / 3);
    }

    public canUse(character: Character): boolean {
        if (character.stats.cor < 35)
            return true;
        DisplayText("You grab hold of the handle of the sword only to have it grow burning hot.  You're forced to let it go lest you burn yourself.  Something within the sword must be displeased.  ");
        return false;
    }
}
