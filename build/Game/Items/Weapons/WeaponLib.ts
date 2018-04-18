import * as Weapons from './';
import Weapon from './Weapon';
import WeaponName from './WeaponName';
import { WeaponPerkType } from './WeaponPerk';
import Dictionary from '../../../Engine/Utilities/Dictionary';
import ItemDesc from '../ItemDesc';

// key: string, shortName: string, displayname: string, longName: string, verb: string, attack: number, value: number = 0, description: string = null, perk: string = ""
export default class WeaponLib extends Dictionary<Weapon> {
    public constructor() {
        super();
        this.set(WeaponName.Fists, new Weapon(WeaponName.Fists, new ItemDesc("Fists", "fists"), "fists", "punch", 0));
        this.set(WeaponName.BeautifulSword, new Weapons.BeautifulSword());
        this.set(WeaponName.LargeClaymore, new Weapons.LargeClaymore());
        this.set(WeaponName.DragonShellShield, new Weapons.DragonShellShield());
        this.set(WeaponName.EldritchStaff, new Weapons.EldritchStaff());
        this.set(WeaponName.UrtaHalberd, new Weapon(WeaponName.UrtaHalberd, new ItemDesc("UrtaHlb", "a halberd"), "halberd", "slash", 11, 10, [WeaponPerkType.Large]));
        this.set(WeaponName.HookedGauntlet, new Weapon(WeaponName.HookedGauntlet, new ItemDesc("H.Gaunt", "a set of hooked gauntlets", "These metal gauntlets are covered in nasty looking hooks that are sure to tear at your foes flesh and cause them harm."), "hooked gauntlets", "clawing punch", 8, 300, [WeaponPerkType.Stunning, WeaponPerkType.Bleeding]));
        this.set(WeaponName.JeweledRapier, new Weapons.JeweledRapier());
        this.set(WeaponName.Katana, new Weapons.Katana());
        this.set(WeaponName.LargeAxe, new Weapon(WeaponName.LargeAxe, new ItemDesc("L. Axe ", "an axe large enough for a minotaur", "This massive axe once belonged to a minotaur.  It'd be hard for anyone smaller than a giant to wield effectively.  The axe is double-bladed and deadly-looking."), "large axe", "cleave", 15, 100, [WeaponPerkType.Large]));
        this.set(WeaponName.AphroDagger, new Weapon(WeaponName.AphroDagger, new ItemDesc("L.Daggr", "an aphrodisiac-coated dagger", "A dagger with a short blade in a wavy pattern.  Its edge seems to have been enchanted to always be covered in a light aphrodisiac to arouse anything cut with it."), "lust-enchanted dagger", "stab", 3, 150, [WeaponPerkType.Aphrodisiac]));
        this.set(WeaponName.LargeHammer, new Weapons.LargeHammer());
        this.set(WeaponName.Pipe, new Weapon(WeaponName.Pipe, new ItemDesc("Pipe", "a pipe", "This is a simple rusted pipe of unknown origins.  It's hefty and could probably be used as an effective bludgeoning tool."), "pipe", "smash", 5, 25));
        this.set(WeaponName.RidingCrop, new Weapon(WeaponName.RidingCrop, new ItemDesc("RidingC", "a riding crop", "This riding crop appears to be made of black leather, and could be quite a painful (or exciting) weapon."), "riding crop", "whip-crack", 5, 50));
        this.set(WeaponName.RaphaelsRapier, new Weapons.RaphaelsRapier());
        this.set(WeaponName.Spellblade, new Weapons.Spellblade());
        this.set(WeaponName.SpikedGauntlet, new Weapon(WeaponName.SpikedGauntlet, new ItemDesc("S.Gauntlet", "a spiked gauntlet", "This single metal gauntlet has the knuckles tipped with metal spikes.  Though it lacks the damaging potential of other weapons, the sheer pain of its wounds has a chance of stunning your opponent."), "spiked gauntlet", "spiked punch", 5, 400, [WeaponPerkType.Stunning]));
        this.set(WeaponName.Spear, new Weapon(WeaponName.Spear, new ItemDesc("Spear", "a deadly spear", "A staff with a sharp blade at the tip designed to pierce through the toughest armor.  This would ignore most armors."), "deadly spear", "piercing stab", 8, 450, [WeaponPerkType.Penetrate]));
        this.set(WeaponName.SuccubiWhip, new Weapon(WeaponName.SuccubiWhip, new ItemDesc("SucWhip", "a succubi whip", "This coiled length of midnight-black leather practically exudes lust.  Though it looks like it could do a lot of damage, the feel of that slick leather impacting flesh is sure to inspire lust."), "succubi whip", "sexy whipping", 10, 400, [WeaponPerkType.SuccubiWhip]));
        this.set(WeaponName.WizardsStaff, new Weapons.WizardsStaff());
        this.set(WeaponName.HugeWarhammer, new Weapons.HugeWarhammer());
        this.set(WeaponName.Whip, new Weapon(WeaponName.Whip, new ItemDesc("Whip", "a coiled whip", "A coiled length of leather designed to lash your foes into submission.  There's a chance the bondage inclined might enjoy it!"), "coiled whip", "whip-crack", 5, 500, [WeaponPerkType.CoiledWhip]));
    }
}
