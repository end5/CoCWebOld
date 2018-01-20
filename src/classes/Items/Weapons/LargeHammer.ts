import Weapon from './Weapon';
import WeaponName from './WeaponName';
import Character from '../../Character/Character';
import DisplayText from '../../display/DisplayText';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class LargeHammer extends Weapon {
    public constructor() {
        super(WeaponName.LargeHammer, new ItemDesc("L.Hammr", "Marble's large hammer", "This two-handed warhammer looks pretty devastating.  You took it from Marble after she refused your advances."), "large hammer", "smash", 16, 90, "Large");
    }

    public canUse(player: Player): boolean {
        if (player.tallness >= 60)
            return true;
        DisplayText("This hammer is too large for you to wield effectively.  ");
        return false;
    }
}
