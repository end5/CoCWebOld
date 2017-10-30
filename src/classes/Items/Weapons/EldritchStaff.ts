import Weapon from './Weapon';
import Perk from '../../Effects/Perk';
import Player from '../../Player';
import ItemDesc from '../ItemDesc';

export default class EldritchStaff extends Weapon {
    public constructor() {
        super("E.Staff", new ItemDesc("E.Staff", "an eldritch staff", "This eldritch staff once belonged to the Harpy Queen, who was killed after her defeat at your hands.  It fairly sizzles with magical power."), "eldritch staff", "thwack", 10, EldritchStaff.DefaultValue, "Wizard's Focus");
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

