import Weapon, { GenericWeapon } from './Weapon';
import WeaponName from './WeaponName';
import ConstantLibrary from '../../Utilities/ConstantLibrary';
import ItemDesc from '../ItemDesc';
import Weapons from '.';

// key: string, shortName: string, displayname: string, longName: string, verb: string, attack: number, value: number = 0, description: string = null, perk: string = ""
export default class WeaponLib extends ConstantLibrary<Weapon> {
    public constructor() {
        super();
        this.add(WeaponName.Fists, new GenericWeapon(WeaponName.Fists, new ItemDesc("Fists", "fists"), "fists", "punch", 0));
        this.add(WeaponName.BeautifulSword, new Weapons.BeautifulSword());
        this.add(WeaponName.LargeClaymore, new Weapons.LargeClaymore());
        this.add(WeaponName.DragonShellShield, new Weapons.DragonShellShield());
        this.add(WeaponName.EldritchStaff, new Weapons.EldritchStaff());
        this.add(WeaponName.UrtaHalberd, new GenericWeapon(WeaponName.UrtaHalberd, new ItemDesc("UrtaHlb", "a halberd"), "halberd", "slash", 11, 10, "Large"));
        this.add(WeaponName.HookedGauntlet, new GenericWeapon(WeaponName.HookedGauntlet, new ItemDesc("H.Gaunt", "a set of hooked gauntlets", "These metal gauntlets are covered in nasty looking hooks that are sure to tear at your foes flesh and cause them harm."), "hooked gauntlets", "clawing punch", 8, 300));
        this.add(WeaponName.JeweledRapier, new Weapons.JeweledRapier());
        this.add(WeaponName.Katana, new GenericWeapon(WeaponName.Katana, new ItemDesc("Katana", "a katana", "A curved bladed weapon that cuts through flesh with the greatest of ease."), "katana", "keen cut", 10, 500));
        this.add(WeaponName.LargeAxe, new GenericWeapon(WeaponName.LargeAxe, new ItemDesc("L. Axe ", "an axe large enough for a minotaur", "This massive axe once belonged to a minotaur.  It'd be hard for anyone smaller than a giant to wield effectively.  The axe is double-bladed and deadly-looking."), "large axe", "cleave", 15, 100, "Large"));
        this.add(WeaponName.AphroDagger, new GenericWeapon(WeaponName.AphroDagger, new ItemDesc("L.Daggr", "an aphrodisiac-coated dagger", "A dagger with a short blade in a wavy pattern.  Its edge seems to have been enchanted to always be covered in a light aphrodisiac to arouse anything cut with it."), "lust-enchanted dagger", "stab", 3, 150, "Aphrodisiac Weapon"));
        this.add(WeaponName.LargeHammer, new Weapons.LargeHammer());
        this.add(WeaponName.Pipe, new GenericWeapon(WeaponName.Pipe, new ItemDesc("Pipe", "a pipe", "This is a simple rusted pipe of unknown origins.  It's hefty and could probably be used as an effective bludgeoning tool."), "pipe", "smash", 5, 25));
        this.add(WeaponName.RidingCrop, new GenericWeapon(WeaponName.RidingCrop, new ItemDesc("RidingC", "a riding crop", "This riding crop appears to be made of black leather, and could be quite a painful (or exciting) weapon."), "riding crop", "whip-crack", 5, 50));
        this.add(WeaponName.RaphaelsRapier, new Weapons.RaphaelsRapier());
        this.add(WeaponName.Spellblade, new Weapons.Spellblade());
        this.add(WeaponName.SpikedGauntlet, new GenericWeapon(WeaponName.SpikedGauntlet, new ItemDesc("S.Gauntlet", "a spiked gauntlet", "This single metal gauntlet has the knuckles tipped with metal spikes.  Though it lacks the damaging potential of other weapons, the sheer pain of its wounds has a chance of stunning your opponent."), "spiked gauntlet", "spiked punch", 5, 400));
        this.add(WeaponName.Spear, new GenericWeapon(WeaponName.Spear, new ItemDesc("Spear", "a deadly spear", "A staff with a sharp blade at the tip designed to pierce through the toughest armor.  This would ignore most armors."), "deadly spear", "piercing stab", 8, 450));
        this.add(WeaponName.SuccubiWhip, new GenericWeapon(WeaponName.SuccubiWhip, new ItemDesc("SucWhip", "a succubi whip", "This coiled length of midnight-black leather practically exudes lust.  Though it looks like it could do a lot of damage, the feel of that slick leather impacting flesh is sure to inspire lust."), "succubi whip", "sexy whipping", 10, 400));
        this.add(WeaponName.WizardsStaff, new Weapons.WizardsStaff());
        this.add(WeaponName.HugeWarhammer, new Weapons.HugeWarhammer());
        this.add(WeaponName.Whip, new GenericWeapon(WeaponName.Whip, new ItemDesc("Whip", "a coiled whip", "A coiled length of leather designed to lash your foes into submission.  There's a chance the bondage inclined might enjoy it!"), "coiled whip", "whip-crack", 5, 500));
    }
}
