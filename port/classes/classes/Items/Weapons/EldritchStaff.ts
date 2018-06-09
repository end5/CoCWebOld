import { PerkLib } from '../../PerkLib';
import { Weapon } from '../Weapon';

/**
 * Created by aimozg on 10.01.14.
 */
export class EldritchStaff extends Weapon {

    public constructor() {
        super("E.Staff", "E.Staff", "eldritch staff", "an eldritch staff", "thwack", 10, WeaponLib.DEFAULT_VALUE, "This eldritch staff once belonged to the Harpy Queen, who was killed after her defeat at your hands.  It fairly sizzles with magical power.", "Wizard's Focus");
    }

    public playerEquip(): Weapon {
        while (this.game.player.findPerk(PerkLib.WizardsFocus) >= 0) this.game.player.removePerk(PerkLib.WizardsFocus);
        this.game.player.createPerk(PerkLib.WizardsFocus, 0.6, 0, 0, 0);
        return super.playerEquip();
    }

    public playerRemove(): Weapon {
        while (this.game.player.findPerk(PerkLib.WizardsFocus) >= 0) this.game.player.removePerk(PerkLib.WizardsFocus);
        return super.playerRemove();
    }

}
