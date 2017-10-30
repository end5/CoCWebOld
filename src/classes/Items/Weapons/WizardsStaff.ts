import Weapon from './Weapon';
import Perk from '../../Effects/Perk';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default class WizardsStaff extends Weapon {
    public constructor() {
        super("W.Staff", new ItemDesc("W. Staff", "a wizard's staff", "This staff is made of very old wood and seems to tingle to the touch.  The top has an odd zig-zag shape to it, and the wood is worn smooth from lots of use.  It probably belonged to a wizard at some point and would aid magic use. (ATK: 3)"), "wizard's staff", "smack", 3, 350, "Wizard's Focus");
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
