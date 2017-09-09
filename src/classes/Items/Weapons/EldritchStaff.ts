import Weapon from "../Weapon";

export default class EldritchStaff extends Weapon {

    public constructor() {
        super("E.Staff", "E.Staff", "eldritch staff", "an eldritch staff", "thwack", 10, WeaponLib.DEFAULT_VALUE, "This eldritch staff once belonged to the Harpy Queen, who was killed after her defeat at your hands.  It fairly sizzles with magical power.", "Wizard's Focus");
    }

    public playerEquip(): Weapon {
        while (player.perks.has("WizardsFocus"))
            player.perks.remove("WizardsFocus");
        player.createPerk(PerkLib.WizardsFocus, 0.6, 0, 0, 0);
        return super.playerEquip();
    }

    public playerRemove(): Weapon {
        while (player.perks.has("WizardsFocus"))
            player.perks.remove("WizardsFocus");
        return super.playerRemove();
    }
}

