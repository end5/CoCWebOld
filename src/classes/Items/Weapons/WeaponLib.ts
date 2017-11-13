import BeautifulSword from './BeautifulSword';
import DragonShellShield from './DragonShellShield';
import EldritchStaff from './EldritchStaff';
import Fists from './Fists';
import HugeWarhammer from './HugeWarhammer';
import JeweledRapier from './JeweledRapier';
import LargeClaymore from './LargeClaymore';
import LargeHammer from './LargeHammer';
import RaphaelsRapier from './RaphaelsRapier';
import Spellblade from './Spellblade';
import Weapon, { GenericWeapon } from './Weapon';
import WizardsStaff from './WizardsStaff';
import KeyedLibrary from '../../Utilities/Library';
import ItemDesc from '../ItemDesc';
// key: string, shortName: string, displayname: string, longName: string, verb: string, attack: number, value: number = 0, description: string = null, perk: string = ""
export default class WeaponLib extends KeyedLibrary<Weapon> {
    public constructor() {
        super();
        this.add(new GenericWeapon("Fists  ", new ItemDesc("Fists", "fists"), "fists", "punch", 0));
        this.add(new BeautifulSword());
        this.add(new LargeClaymore());
        this.add(new DragonShellShield());
        this.add(new EldritchStaff());
        this.add(new GenericWeapon("UrtaHlb", new ItemDesc("UrtaHlb", "a halberd"), "halberd", "slash", 11, 10, "Large"));
        this.add(new GenericWeapon("H.Gaunt", new ItemDesc("H.Gaunt", "a set of hooked gauntlets", "These metal gauntlets are covered in nasty looking hooks that are sure to tear at your foes flesh and cause them harm."), "hooked gauntlets", "clawing punch", 8, 300));
        this.add(new JeweledRapier());
        this.add(new GenericWeapon("Katana ", new ItemDesc("Katana", "a katana", "A curved bladed weapon that cuts through flesh with the greatest of ease. (ATK: 10) (Cost: 500)"), "katana", "keen cut", 10, 500));
        this.add(new GenericWeapon("L. Axe ", new ItemDesc("L. Axe ", "an axe large enough for a minotaur", "This massive axe once belonged to a minotaur.  It'd be hard for anyone smaller than a giant to wield effectively.  The axe is double-bladed and deadly-looking.  (ATK: +15) (Cost: 100)"), "large axe", "cleave", 15, 100, "Large"));
        this.add(new GenericWeapon("L.Daggr", new ItemDesc("L.Daggr", "an aphrodisiac-coated dagger", "A dagger with a short blade in a wavy pattern.  Its edge seems to have been enchanted to always be covered in a light aphrodisiac to arouse anything cut with it."), "lust-enchanted dagger", "stab", 3, 150, "Aphrodisiac Weapon"));
        this.add(new LargeHammer());
        this.add(new GenericWeapon("Pipe   ", new ItemDesc("Pipe", "a pipe", "This is a simple rusted pipe of unknown origins.  It's hefty and could probably be used as an effective bludgeoning tool. (ATK: +5) (Cost: 25)"), "pipe", "smash", 5, 25));
        this.add(new GenericWeapon("RidingC", new ItemDesc("RidingC", "a riding crop", "This riding crop appears to be made of black leather, and could be quite a painful (or exciting) weapon.  (ATK: +5) (Cost: 50)"), "riding crop", "whip-crack", 5, 50));
        this.add(new RaphaelsRapier());
        this.add(new Spellblade());
        this.add(new GenericWeapon("S.Gaunt", new ItemDesc("S.Gauntlet", "a spiked gauntlet", "This single metal gauntlet has the knuckles tipped with metal spikes.  Though it lacks the damaging potential of other weapons, the sheer pain of its wounds has a chance of stunning your opponent. (ATK: 5) (Cost: 400)"), "spiked gauntlet", "spiked punch", 5, 400));
        this.add(new GenericWeapon("Spear  ", new ItemDesc("Spear", "a deadly spear", "A staff with a sharp blade at the tip designed to pierce through the toughest armor.  This would ignore most armors.  (ATK: 8) (Cost: 450)"), "deadly spear", "piercing stab", 8, 450));
        this.add(new GenericWeapon("SucWhip", new ItemDesc("SucWhip", "a succubi whip", "This coiled length of midnight-black leather practically exudes lust.  Though it looks like it could do a lot of damage, the feel of that slick leather impacting flesh is sure to inspire lust."), "succubi whip", "sexy whipping", 10, 400));
        this.add(new WizardsStaff());
        this.add(new HugeWarhammer());
        this.add(new GenericWeapon("Whip   ", new ItemDesc("Whip", "a coiled whip", "A coiled length of leather designed to lash your foes into submission.  There's a chance the bondage inclined might enjoy it! (ATK: 5) (Cost: 500)"), "coiled whip", "whip-crack", 5, 500));
    }
}
