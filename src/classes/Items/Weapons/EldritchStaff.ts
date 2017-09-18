import Weapon from "./Weapon";
import Player from "../../Player";
import Perk from "../../Effects/Perk";

export default class EldritchStaff extends Weapon {
    public constructor() {
        super("E.Staff", "E.Staff", "eldritch staff", "an eldritch staff", "thwack", 10, WeaponLib.DEFAULT_VALUE, "This eldritch staff once belonged to the Harpy Queen, who was killed after her defeat at your hands.  It fairly sizzles with magical power.", "Wizard's Focus");
    }

    public equip(player: Player): Weapon {
        while (player.perks.has("WizardsFocus"))
            player.perks.remove("WizardsFocus");
        player.perks.add(new Perk("WizardsFocus", 0.6, 0, 0, 0));
        return super.equip(player);
    }

    public unequip(player: Player): Weapon {
        while (player.perks.has("WizardsFocus"))
            player.perks.remove("WizardsFocus");
        return super.unequip(player);
    }
}

