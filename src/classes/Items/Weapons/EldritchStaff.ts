import Weapon from './Weapon';
import WeaponName from './WeaponName';
import { PerkType } from '../../Effects/PerkType';
import Player from '../../Player/Player';
import ItemDesc from '../ItemDesc';

export default class EldritchStaff extends Weapon {
    public constructor() {
        super(WeaponName.EldritchStaff, new ItemDesc("E.Staff", "an eldritch staff", "This eldritch staff once belonged to the Harpy Queen, who was killed after her defeat at your hands.  It fairly sizzles with magical power."), "eldritch staff", "thwack", 10, EldritchStaff.DefaultValue, "Wizard's Focus");
    }

    public onEquip(player: Player): void {
        while (player.perks.has(PerkType.WizardsFocus))
            player.perks.remove(PerkType.WizardsFocus);
        player.perks.add(PerkType.WizardsFocus, 0.6, 0, 0, 0);
    }

    public onUnequip(player: Player): void {
        while (player.perks.has(PerkType.WizardsFocus))
            player.perks.remove(PerkType.WizardsFocus);
    }
}
