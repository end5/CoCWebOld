import { Weapon } from '../Weapon';

/**
 * Created by aimozg on 10.01.14.
 */
export class LargeHammer extends Weapon {

    public constructor() {
        super("L.Hammr", "L.Hammr", "large hammer", "Marble's large hammer", "smash", 16, 90, "This two-handed warhammer looks pretty devastating.  You took it from Marble after she refused your advances.", "Large");
    }

    public canUse(): boolean {
        if (this.game.player.tallness >= 60) return true;
        outputText("This hammer is too large for you to wield effectively.  ");
        return false;
    }
}
