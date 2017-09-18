import Weapon from "./Weapon";
import Player from "../../Player";
import Perk from "../../Effects/Perk";

export default class WizardsStaff extends Weapon {
    public constructor() {
        super("W.Staff", "W. Staff", "wizard's staff", "a wizard's staff", "smack", 3, 350, "This staff is made of very old wood and seems to tingle to the touch.  The top has an odd zig-zag shape to it, and the wood is worn smooth from lots of use.  It probably belonged to a wizard at some point and would aid magic use. (ATK: 3)", "Wizard's Focus");
    }

    public equip(player: Player): Weapon {
        while (player.perks.has("WizardsFocus"))
            player.perks.remove("WizardsFocus");
        player.perks.add(new Perk("WizardsFocus", 0.4, 0, 0, 0));
        return super.equip(player);
    }

    public unequip(player: Player): Weapon {
        while (player.perks.has("WizardsFocus"))
            player.perks.remove("WizardsFocus");
        return super.unequip(player);
    }

}
