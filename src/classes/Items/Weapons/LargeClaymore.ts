import Weapon from './Weapon';
import WeaponName from './WeaponName';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import ItemDesc from '../ItemDesc';

export default class LargeClaymore extends Weapon {
    public constructor() {
        super(WeaponName.LargeClaymore, new ItemDesc("L.Claymore", "a large claymore", "A massive sword that a very strong warrior might use.  Requires 40 strength to use."), "large claymore", "cleaving sword-slash", 15, 1000, "Large");
    }

    public canUse(character: Character): boolean {
        if (character.stats.str >= 40)
            return true;
        DisplayText("You aren't strong enough to handle such a heavy weapon!  ");
        return false;
    }
}
