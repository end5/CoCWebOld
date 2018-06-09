import { PerkLib } from '../../PerkLib';
import { Weapon } from '../Weapon';

/**
 * Created by aimozg on 10.01.14.
 */
export class WizardsStaff extends Weapon {

    public constructor() {
        super("W.Staff", "W. Staff", "wizard's staff", "a wizard's staff", "smack", 3, 350, "This staff is made of very old wood and seems to tingle to the touch.  The top has an odd zig-zag shape to it, and the wood is worn smooth from lots of use.  It probably belonged to a wizard at some point and would aid magic use. (ATK: 3)", "Wizard's Focus");
    }

    public playerEquip(): Weapon {
        while (this.game.player.findPerk(PerkLib.WizardsFocus) >= 0) this.game.player.removePerk(PerkLib.WizardsFocus);
        this.game.player.createPerk(PerkLib.WizardsFocus, 0.4, 0, 0, 0);
        return super.playerEquip();
    }

    public playerRemove(): Weapon {
        while (this.game.player.findPerk(PerkLib.WizardsFocus) >= 0) this.game.player.removePerk(PerkLib.WizardsFocus);
        return super.playerRemove();
    }
}
