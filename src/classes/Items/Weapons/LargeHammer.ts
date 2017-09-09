import Weapon from "../Weapon";
export default class LargeHammer extends Weapon {

    public constructor() {
        super("L.Hammr", "L.Hammr", "large hammer", "Marble's large hammer", "smash", 16, 90, "This two-handed warhammer looks pretty devastating.  You took it from Marble after she refused your advances.", "Large");
    }

    public canUse(): boolean {
        if (player.tallness >= 60) return true;
        Render.text("This hammer is too large for you to wield effectively.  ");
        return false;
    }

}
