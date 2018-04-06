import Weapon from './Weapon';
import WeaponName from './WeaponName';
import DisplayText from '../../../Engine/display/DisplayText';
import Character from '../../Character/Character';
import ItemDesc from '../ItemDesc';

export default class HugeWarhammer extends Weapon {
    public constructor() {
        super(WeaponName.HugeWarhammer, new ItemDesc("Warhammer", "a huge warhammer", "A huge war-hammer made almost entirely of steel that only the strongest warriors could use.  Requires 80 strength to use.  Getting hit with this might stun the victim."), "huge warhammer", "smash", 15, 1600, "Large");
    }

    public canUse(character: Character): boolean {
        if (character.stats.str >= 80)
            return true;
        DisplayText("You aren't strong enough to handle such a heavy weapon!  ");
        return false;
    }
}
